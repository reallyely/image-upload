import { Gallery, Top } from "@/components/layout";
import { Image, ImageOption } from "../modules/gallery/domain/Image.entity";
import React, { ChangeEventHandler, PropsWithChildren, useState } from "react";

import ImageGrid from "@/components/ImageGrid";
import ImageSearch from "@/components/ImageSearch";
import ImageUpload from "@/components/ImageUpload";
import { getImages } from "modules/gallery/infrastructure/getImages";

interface HomeData {
  images: Array<Image>;
}
type UploadHandler = ChangeEventHandler<HTMLInputElement>;
export default function Home(props: PropsWithChildren<HomeData>) {
  const initialImages = JSON.parse(props.images).map((i: Image) =>
    Image.create(i)
  );
  const [images, setImages] = useState(initialImages);
  const [filteredImages, setFilteredImages] = useState(images);

  const handleFilter = async (event, values: Array<ImageOption>) => {
    if (values.length > 0) {
      const things = images.filter((image) => {
        return values.some(({ label }) => image.name.includes(label));
      });
      return setFilteredImages(things);
    }
    setFilteredImages(images);
  };
  const handleUpload: UploadHandler = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const thisImage = event.target.files[0];
      const body = new FormData();
      body.append("file", thisImage);
      await fetch("/api/gallery", {
        method: "POST",
        body,
      });
      const imagesFromFs = await fetch("/api/gallery", {
        method: "GET",
      }).then(async (a) => {
        const jsn = await a.json();
        return jsn.map(Image.create);
      });
      setImages(imagesFromFs);
      setFilteredImages(imagesFromFs);
    }
  };

  return (
    <Gallery
      TopContent={
        <Top
          left={<ImageSearch handleFilter={handleFilter} images={images} />}
          right={<ImageUpload handleUpload={handleUpload} />}
        ></Top>
      }
      MainContent={<ImageGrid images={filteredImages}></ImageGrid>}
    />
  );
}
export async function getServerSideProps() {
  const images = getImages();
  if (images.length === 0) {
    return { props: { images: [] } };
  } else {
    return { props: { images: JSON.stringify(images) } };
  }
}
