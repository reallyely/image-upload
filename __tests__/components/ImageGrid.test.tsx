import { render, screen } from "@testing-library/react";

import { Image } from "../../modules/gallery/domain/Image.entity";
import ImageGrid from "@/components/ImageGrid";

const anImage = Image.create({
  name: "Cool image",
  id: "new id",
  content: "https://avatars.githubusercontent.com/u/1640588?v=4",
});

describe("ImageGrid", () => {
  it("Doesnt explode", () => {
    render(<ImageGrid />);
  });

  it("Renders when no images provided", () => {
    render(<ImageGrid />);
    expect(screen.getByText("There's nothing here")).toBeVisible();
  });
  it("Renders a provided image", () => {
    render(<ImageGrid filteredImages={[anImage]} />);
    expect(screen.getAllByRole("img").length).toBe(1);
  });
  it("Renders all images in the list", () => {
    const elevenImages = new Array(11).fill(anImage);
    render(<ImageGrid filteredImages={elevenImages} />);
    expect(screen.getAllByRole("img").length).toBe(11);
  });
});
