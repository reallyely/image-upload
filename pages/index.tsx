import { AnimatePresence, motion } from "framer-motion";
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
  const [isReady, setIsReady] = useState<Boolean>(false);
  const getImages = async () => {
    setIsReady(false);
    const images = await fetch("/api/gallery", {
      method: "GET",
    }).then(async (a) => {
      const jsn = await a.json();
      return jsn.map(Image.create);
    });
    return images;
  };

  useEffect(() => {
    getImages().then((images) => {
      setImages(images);
      setFilteredImages(images);
      setIsReady(true);
    });
  }, []);
  const handleFilter: imageSearchOnChangeHandler = async (_event, values) => {
    if (values.length > 0) {
      setIsReady(false);
      const things = images.filter((image) => {
        return values.some(({ label }) => image.name.includes(label));
      });
      setFilterValues(values);
      setFilteredImages(things);
      setIsReady(true);
      return;
    }
    setFilterValues([]);
    setFilteredImages(images);
    setIsReady(true);
  };
  const handleUpload: UploadHandler = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setIsReady(false);
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
      setIsReady(true);
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
        <AnimatePresence>
          {isReady && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ImageGrid allImages={images} filteredImages={filteredImages} />
            </motion.div>
          )}
        </AnimatePresence>
      }
    />
  );
}
