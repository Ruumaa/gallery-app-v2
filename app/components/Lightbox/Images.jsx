'use client';
import Image from 'next/image';
import { useState } from 'react';

const Images = (props) => {
  const { images, onClick } = props;
  const [loadingStates, setLoadingStates] = useState({});

  const handleClickImage = (index) => {
    onClick(index);
  };

  const handleLoadingComplete = (index) => {
    setLoadingStates((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  return (
    <div className="max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-5xl m-8 grid grid-rows-1 xl:grid-cols-4 gap-4">
      {images?.data.map((image, index) => (
        <div
          key={index}
          className="w-full h-80 cursor-pointer"
          onClick={() => handleClickImage(index)}
        >
          <Image
            key={image.id}
            alt="gallery"
            src={image.imageUrl}
            sizes="100vw"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            className={`rounded-lg border shadow-lg transition-all duration-200 ${
              loadingStates[index] !== false ? 'blur-sm' : ''
            }`}
            priority={index === 0}
            width={500}
            height={300}
            onLoad={() => handleLoadingComplete(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default Images;
