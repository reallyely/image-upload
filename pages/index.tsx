import React from 'react'
import { Gallery } from '@/components/layout';
import ImageGrid from '@/components/ImageGrid';

export default function Home() {
  return (
    <Gallery
      HeadContent={<div> hello from _app</div>}
      FooterContent={<div> hello from _app</div>}
      MainContent={<ImageGrid images={[{ src: "https://avatars.githubusercontent.com/u/1640588?v=4" }, { src: "https://avatars.githubusercontent.com/u/1640588?v=4" }]} ></ImageGrid >}
    >
    </Gallery >)
}
