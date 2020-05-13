export type Block = {
  role: string;
  value: {
    id: string;
    type: string;
    properties?: any;
  };
};

class Counter {
  private value = 0;

  public getCount() {
    return this.value;
  }

  public count() {
    this.value += 1;
  }

  public resetCount() {
    this.value = 0;
  }
}

const counter = new Counter();

export function createLine(str: string): string {
  return `${str}\n`;
}

export function createText(block: Block) {
  counter.resetCount();

  // 改行
  if (block.value.properties == null) {
    return createLine('\n');
  }

  const title = block.value.properties.title.flat(Infinity);

  // - text
  if (title.length === 1) {
    return createLine(title[0]);
  }

  // - link
  if (title.length === 3) {
    const text = title[0];
    const link = title[2];

    return createLine(`[${text}](${link})`);
  }

  // - 斜体
  if (title.length === 2 && title[1] === 'i') {
    const text = title[0];

    return createLine(`__${text}__`);
  }

  // - 強調
  if (title.length === 2 && title[1] === 'b') {
    const text = title[0];

    return createLine(`**${text}**`);
  }

  return '';
}

export function createHeading(block: Block) {
  counter.resetCount();

  const title = block.value.properties.title.flat(Infinity);

  // h1
  if (block.value.type === 'header') {
    return createLine(`# ${title[0]}`);
  }

  // h2
  if (block.value.type === 'sub_header') {
    return createLine(`## ${title[0]}`);
  }

  // h3
  if (block.value.type === 'sub_sub_header') {
    return createLine(`### ${title[0]}`);
  }

  return '';
}

export function createList(block: Block) {
  counter.resetCount();
  const title = block.value.properties.title.flat(Infinity);

  // list
  return createLine(`- ${title[0]}`);
}

export function createOrderList(block: Block) {
  const text = block.value.properties.title.flat(Infinity)[0];
  counter.count();

  return createLine(`${counter.getCount()}. ${text}`);
}

export function createImage(block: Block) {
  counter.resetCount();
  const image = block.value.properties.source.flat(Infinity)[0];
  const caption = block.value.properties.caption != null ? block.value.properties.caption.flat(Infinity)[0] : '';

  return createLine(`![${caption}](${image})`);
}

export default function build(blocks: Block[]): string {
  let markdown = ``;

  blocks.map((block) => {
    switch (block.value.type) {
      case 'text':
        markdown += createText(block);
        break;

      case 'header':
      case 'sub_header':
      case 'sub_sub_header':
        markdown += createHeading(block);
        break;

      case 'image':
        markdown += createImage(block);
        break;

      case 'bulleted_list':
        markdown += createList(block);
        break;

      case 'numbered_list':
        markdown += createOrderList(block);
        break;
    }
  });

  return markdown;
}
