import React, { MouseEventHandler, PropsWithChildren, useState } from 'react'
import { Gallery, Top } from '@/components/layout';
import ImageGrid from '@/components/ImageGrid';
import ImageUpload from '@/components/ImageUpload';
import ImageSearch from '@/components/ImageSearch';
import { Image, ImageDisplay } from "modules/gallery/domain/Image.entity";
import { randomUUID } from "crypto"
interface HomeData {
  images?: Array<ImageDisplay>
}
type UploadHandler = MouseEventHandler<Element>
export default function Home(props: PropsWithChildren<HomeData>) {

  return <Gallery
    TopContent={
      <Top
        left={<ImageSearch />}
        right={<ImageUpload handleUpload={() => { }} />}
      >
      </Top>

    }
    MainContent={<ImageGrid images={props.images} ></ImageGrid >}
  />
}


Home.getInitialProps = async () => {
  const anImage = () => Image.create({
    id: randomUUID(),
    name: "Cool image",
    content: "https://avatars.githubusercontent.com/u/1640588?v=4"
  }).toDisplay()
  const elevenImages = new Array(11).fill({}).map(anImage)

  return { images: elevenImages }
}


