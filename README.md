# Image Gallery React App

This includes Next.js' built-in support for Global CSS, CSS Modules and TypeScript. Unit testing with Jest and testing-library. E2E with Playwright.

## How to Use

Quickly get started using [Create Next App](https://github.com/vercel/next.js/tree/canary/packages/create-next-app#readme)!

In your terminal, run the following command:

```bash
npx create-next-app --example with-jest with-jest-app
```

```bash
yarn create next-app --example with-jest with-jest-app
```

```bash
pnpm create next-app --example with-jest with-jest-app
```

## Run Jest Tests

```bash
npm test
```


## Use Cases

- (ONLY) Upload images and store them using an API
- Search for images by name using an input box and the API
- List all uploaded images

## General Architecture

### UI

A single page application for interacting with image contributing workflows.

A user can
- view a gallery of images
  - show a placeholder for an empty gallery
  - Show the total number of images
  - Organized in two columns and up to 5 rows
    - paginate if images > 10
- upload an image
  - with name
  - persistent storage?
- search for a specific image by name
  - ?client side filter or server side search?
### API

A REST service which:
  - accepts image uploads
    - Must have a `name`
  - List all images in the repository
    - paginated
  - Can retrieve a single image by `name`
- Use an opinionated framework to deliver more quickly and follow common paterns