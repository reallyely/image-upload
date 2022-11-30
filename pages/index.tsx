import { Gallery, Top } from "@/components/layout";
import { Image, ImageOption } from "../modules/gallery/domain/Image.entity";
import React, {
  ChangeEventHandler,
  PropsWithChildren,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

import ImageGrid from "@/components/ImageGrid";
import ImageSearch from "@/components/ImageSearch";
import ImageUpload from "@/components/ImageUpload";

interface HomeData {}
type UploadHandler = ChangeEventHandler<HTMLInputElement>;
export default function Home(props: PropsWithChildren<HomeData>) {
  const [images, setImages] = useState<Image[]>([]);
  const [filteredImages, setFilteredImages] = useState(images);
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
  const handleFilter = async (
    _event: SyntheticEvent,
    values: Array<ImageOption>
  ) => {
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
      const imagesFromFs = await getImages();
      setImages(imagesFromFs);
      setFilteredImages(imagesFromFs);
    }
  };

  return (
    <Gallery
      TopContent={
        <Top
          left={
            <ImageSearch
              handleFilter={handleFilter}
              images={images.map((i) => i?.toImageOption())}
            />
          }
          right={<ImageUpload handleUpload={handleUpload} />}
        ></Top>
      }
      MainContent={<ImageGrid images={filteredImages}></ImageGrid>}
    />
  );
}
