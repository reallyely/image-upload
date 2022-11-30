import { Gallery, Top } from "@/components/layout";
import { Image, ImageOption } from "../modules/gallery/domain/Image.entity";
import ImageSearch, {
  onChangeHandler as imageSearchOnChangeHandler,
} from "@/components/ImageSearch";
import React, {
  ChangeEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import ImageGrid from "@/components/ImageGrid";
import ImageUpload from "@/components/ImageUpload";

interface HomeData {}
type UploadHandler = ChangeEventHandler<HTMLInputElement>;
export default function Home(props: PropsWithChildren<HomeData>) {
  const [images, setImages] = useState<Image[]>([]);
  const [filteredImages, setFilteredImages] = useState(images);
  const [filterValues, setFilterValues] = useState<ImageOption[]>([]);
  const getImages = async () =>
    await fetch("/api/gallery", {
      method: "GET",
    }).then(async (a) => {
      const jsn = await a.json();
      return jsn.map(Image.create);
    });

  useEffect(() => {
    getImages().then((images) => {
      setImages(images);
      setFilteredImages(images);
    });
  }, []);
  const handleFilter: imageSearchOnChangeHandler = async (_event, values) => {
    if (values.length > 0) {
      const things = images.filter((image) => {
        return values.some(({ label }) => image.name.includes(label));
      });
      setFilterValues(values);
      return setFilteredImages(things);
    }
    setFilterValues([]);
    setFilteredImages(images);
  };
  const handleUpload: UploadHandler = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const body = new FormData();
      Array.from(event.target.files).forEach((file) =>
        body.append("file", file)
      );
      await fetch("/api/gallery", {
        method: "POST",
        body,
      });
      const imagesFromFs = await getImages();
      setImages(imagesFromFs);
      setFilteredImages(imagesFromFs);
      setFilterValues([]);
    }
  };

  return (
    <Gallery
      TopContent={
        <Top
          left={
            <ImageSearch
              values={filterValues}
              handleFilter={handleFilter}
              images={images.map((i) => i?.toImageOption())}
            />
          }
          right={<ImageUpload handleUpload={handleUpload} />}
        ></Top>
      }
      MainContent={
        <ImageGrid
          allImages={images}
          filteredImages={filteredImages}
        ></ImageGrid>
      }
    />
  );
}
