# notion-markdown

Parse the Notion page as a Markdown

## Installation

```bash
$ yarn add notion-markdown
```

## Usage

```js
import notion from 'notion-markdown';
import fetch from 'node-fetch';

fetch('https://www.notion.so/api/v3/loadPageChunk', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    cookie: `token_v2=<your cookie>`,
  },
  body: JSON.stringify({
    pageId: <your blog page id(if the id is 32 characters, it is still not normalized)>,
    limit: 50, // notion default setting,
    cursor: { stack: [] },
    chunkNumber: 0,
    verticalColumns: false,
  })
}).then(res => res.json()).then(res => {
  // Please put the contents of `res.recordMap.block` in the notion function.
  console.log(notion(Object.values(res.recordMap.block)));
});
```

## API

### `notion`

```typescript
function notion(blocks: Block[]): string;
```

The Block has the following structure.

```typescript
type Block = {
  role: string;
  value: {
    id: string;
    type: string;
    properties?: any;
  };
};
```

## CHANGELOG

See [CHANGELOG.md](https://github.com/konojunya/notion-markdown/blob/master/CHANGELOG.md).

## Contributing

welcoming your contribution 👏

1. Fork
2. Create a feature branch
3. Run test suite with the `$ yarn test` command and confirm that it passes
4. Commit your changes
5. Rebase your local changes against the `master` branch
6. Create new Pull Request 🎉

Bugs, feature requests and comments are more than welcome in the [issues](https://github.com/konojunya/notion-markdown/issues).

### Development scripts

#### `yarn test`

Run Unit test with Jest.

```bash
$ yarn test
```

#### `yarn lint`

Run lint with ESLint.

```bash
$ yarn lint
```

#### `yarn format`

Run formatting with ESLint (--fix) and Prettier.

```bash
$ yarn format
```

### License

[MIT](https://github.com/konojunya/notion-markdown/blob/master/LICENSE)
