import notion, { createText, createHeading, createList, createOrderList, createImage } from '../src';
import {
  createTextBlock,
  createImageBlock,
  createHeadingBlock,
  createListBlock,
  createOrderListBlock,
} from './factory';

describe('notion-markdown', () => {
  test('notion', () => {
    const blocks = [
      createTextBlock('p'),
      createTextBlock('a'),
      createTextBlock('b'),
      createImageBlock(true),
      createListBlock(),
      createListBlock(),
    ];

    expect(notion(blocks)).toEqual(
      `text\n[link](https://example.com)\n**text**\n![caption](image.png)\n- list\n- list\n`,
    );
  });

  // text
  test.each([
    [createText(createTextBlock('p')), 'text\n'],
    [createText(createTextBlock('br')), '\n\n'],
    [createText(createTextBlock('a')), '[link](https://example.com)\n'],
    [createText(createTextBlock('i')), '__text__\n'],
    [createText(createTextBlock('b')), '**text**\n'],
  ])('createText %p', (value, expected) => {
    expect(value).toEqual(expected);
  });

  // heading
  test.each([
    [createHeading(createHeadingBlock(1)), '# text\n'],
    [createHeading(createHeadingBlock(2)), '## text\n'],
    [createHeading(createHeadingBlock(3)), '### text\n'],
  ])('createText %p', (value, expected) => {
    expect(value).toEqual(expected);
  });

  // list
  test.each([
    [createList(createListBlock()), '- list\n'],
    [createOrderList(createOrderListBlock()), '1. order-list\n'],
    [createOrderList(createOrderListBlock()), '2. order-list\n'],
  ])('createText %p', (value, expected) => {
    expect(value).toEqual(expected);
  });

  // image
  test.each([
    [createImage(createImageBlock(false)), '![](image.png)\n'],
    [createImage(createImageBlock(true)), '![caption](image.png)\n'],
  ])('createText %p', (value, expected) => {
    expect(value).toEqual(expected);
  });
});
