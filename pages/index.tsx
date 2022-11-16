import React from 'react'
import { Gallery, Top } from '@/components/layout';
import ImageGrid from '@/components/ImageGrid';
import ImageUpload from '@/components/ImageUpload';
import ImageSearch from '@/components/ImageSearch';

export default function Home() {
  return (
    <Gallery
      TopContent={
        <Top
          left={<ImageSearch />}
          right={<ImageUpload />}
        >
        </Top>

      }
      MainContent={<ImageGrid images={[{ src: "https://avatars.githubusercontent.com/u/1640588?v=4" }, { src: "https://avatars.githubusercontent.com/u/1640588?v=4" }]} ></ImageGrid >}
    />)
}
