'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import {
  Fullscreen,
  Thumbnails,
  Download,
} from 'yet-another-react-lightbox/plugins';
import NextJsImage from './NextJsImage';
import Images from './Images';

const LightboxOpen = ({ images }) => {
  const [index, setIndex] = useState(-1);
  const sources = images.data?.map((image) => image.imageUrl);
  const slides = sources?.map((src) => ({
    src: src,
  }));

  return (
    <div>
      <Images
        images={images}
        onClick={(currentIndex) => setIndex(currentIndex)}
      />
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        render={{ slide: NextJsImage, thumbnail: NextJsImage }}
        plugins={[Thumbnails, Download, Fullscreen]}
      />
    </div>
  );
};

export default LightboxOpen;
