import React, { ChangeEventHandler, PropsWithChildren, useState } from 'react'
import { Gallery, Top } from '@/components/layout';
import ImageGrid from '@/components/ImageGrid';
import ImageUpload from '@/components/ImageUpload';
import ImageSearch from '@/components/ImageSearch';
import { Image } from "../modules/gallery/domain/Image.entity";
interface HomeData {
  images: Array<Image>
}
type UploadHandler = ChangeEventHandler<HTMLInputElement>
export default function Home(props: PropsWithChildren<HomeData>) {
  const [images, setImages] = useState(props.images);

  const handleUpload: UploadHandler = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const thisImage = event.target.files[0]
      const body = new FormData();
      body.append("file", thisImage);
      await fetch("/api/gallery", {
        method: "POST",
        body
      });
      setImages([...images, Image.fromFile(thisImage)]);
    }


  }

  return <Gallery
    TopContent={
      <Top
        left={<ImageSearch images={images} />}
        right={<ImageUpload handleUpload={handleUpload} />}
      >
      </Top>

    }
    MainContent={<ImageGrid images={images} ></ImageGrid >}
  />
}


Home.getInitialProps = async () => {
  const imagesResponse = await (await fetch("http://localhost:3000/api/gallery", { method: "GET" })).json()
  if (imagesResponse.length === 0) {
    return { images: [] }
  } else {
    const images: Array<Image> = imagesResponse.map(Image.create)
    return { images: images }

  }
}

