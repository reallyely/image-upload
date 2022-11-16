import React, { PropsWithChildren } from 'react'
import { Gallery, Top } from '@/components/layout';
import ImageGrid from '@/components/ImageGrid';
import ImageUpload from '@/components/ImageUpload';
import ImageSearch from '@/components/ImageSearch';
import { Image, ImageDisplay } from "modules/gallery/domain/Image.entity";

interface HomeData {
  images: Array<ImageDisplay>
}

export default function Home(props: PropsWithChildren<HomeData>) {
  return (
    <Gallery
      TopContent={
        <Top
          left={<ImageSearch />}
          right={<ImageUpload />}
        >
        </Top>

      }
      MainContent={<ImageGrid images={props.images} ></ImageGrid >}
    />)
}


Home.getInitialProps = async () => {
  const anImage = ImageDisplay.create(Image.create({
    name: "Cool image",
    id: "new id",
    content: "https://avatars.githubusercontent.com/u/1640588?v=4"
  }))
  const elevenImages = new Array(11).fill(anImage)

  return { images: elevenImages }
}


