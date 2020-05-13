import { Block } from '../src';

export function createBlock(properties: Partial<Block>): Block {
  return {
    role: '',
    value: {
      id: '',
      type: '',
      properties: {},
    },
    ...properties,
  };
}

export function createTextBlock(type: 'br' | 'p' | 'a' | 'i' | 'b'): Block {
  switch (type) {
    case 'br':
      return createBlock({
        value: {
          id: type,
          type: 'text',
        },
      });

    case 'p':
      return createBlock({
        value: {
          id: type,
          type: 'text',
          properties: {
            title: [['text']],
          },
        },
      });

    case 'a':
      return createBlock({
        value: {
          id: type,
          type: 'text',
          properties: {
            title: [['link'], ['a'], ['https://example.com']],
          },
        },
      });

    case 'i':
    case 'b':
      return createBlock({
        value: {
          id: type,
          type: 'text',
          properties: {
            title: [['text'], [type]],
          },
        },
      });
  }
}

export function createHeadingBlock(type: 1 | 2 | 3): Block {
  const headingCount = type - 1;

  return createBlock({
    value: {
      id: 'heading',
      type: `${'sub_'.repeat(headingCount)}header`,
      properties: {
        title: [['text']],
      },
    },
  });
}

export function createListBlock(): Block {
  return createBlock({
    value: {
      id: 'list-block',
      type: 'bulleted_list',
      properties: {
        title: [['list']],
      },
    },
  });
}

export function createOrderListBlock(): Block {
  return createBlock({
    value: {
      id: 'order-list-block',
      type: 'numbered_list',
      properties: {
        title: [['order-list']],
      },
    },
  });
}

export function createImageBlock(withCaption: boolean): Block {
  let properties: any = {
    source: [['image.png']],
  };

  if (withCaption) {
    properties = { ...properties, caption: [['caption']] };
  }

  return createBlock({
    value: {
      id: 'image',
      type: 'image',
      properties,
    },
  });
}
