# Image Gallery React App

### UI

A single page application for interacting with image contributing workflows.

A user can

- view a gallery of images
  - ~~show a placeholder for an empty gallery~~
  - Show the total number of images
- upload an image
  - with name
  - persistent storage with the local file system
- search for a specific image by name
  - client side filter instead of server-side search

### API

A REST service which:

- accepts image uploads
  - Must have a `name`
- List all images in the repository
  - paginated
- Can retrieve a single image by `name`
- Use an opinionated framework to deliver more quickly and follow common paterns

## Use Cases

- (ONLY) Upload images and store them using an API
- Search for images by name using an input box and the API
- See all uploaded images

## Stephen's notes on the experience

I needed to really timebox my effort on this project and to avoid the tempation to make it 'perfect'. I
fell in those pitfalls several times when attempting to properly model the domain, starting to build out a fully separate backend,
but at some point I came to my senses and realized I couldn't keep going that way.

What's left is a product that meets the bottom line of what the prompt asked for, but with several known problems and lacking polish.

### Overview of choices

MUI for UI components, React 18, Next.js, Typescript, Jest for testing. The API is super basic and follows Next's idioms,
but I found myself frustrated by how they choose to use the folder structure to also create the API paths. I made a few attempts to
smooth some of this out, but abandoned halfway given the time restrictions.

### Compromises

- Use the app's folder structure directly instead of a separate service
  - This is insecure and bad for performance
- Do no custom styling on UI
  - I focused on function over form and accepted Just Good Enough
- Not all types are fully fleshed out, and red squiggles abound
- I wanted to ensure I showed _some_ testing, but it wasn't as much as I'd have liked. I wanted to show some E2E Testing with Playwright

### Bugs:

- ~~When uploading an image, the filter input doesn't clear~~
- ~~There's a mismatch in the values of the filter with the displayed image grid until refresh. The state isn't in sync with the file system~~
- ~~`Error: Hydration failed because the initial UI does not match what was rendered on the server.` when no images are in the repo.~~
  - ~~This was a regression that I just don't have time to patch up. Given I'm new to Next, I figured I had a core misunderstanding of how to write something that would take some time to remedy~~
- It's possible to upload non-image files which will cause some ugliness

## How to Use

From Node 16 `npm install`. Then `npm run dev` or `npm start`

## Run Jest Tests

```bash
npm test
```
