'use client';
// import { getImages } from '@/lib/fetch';
import LightboxOpen from './components/Lightbox/LightboxOpen';
import { useEffect, useState } from 'react';

export default function Home() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/images', {
          headers: {
            'x-api-key': process.env.API_SECRET_KEY,
          },
        });
        const data = await res.json();
        setImages(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchImages();
  }, []);

  if (images.data?.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="xl:w-44 xl:h-44 w-28 h-28"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        <h1 className="text-2xl text-center xl:text-left xl:text-5xl font-mono text-primary font-semibold">
          No photos found, Let&apos;s upload some!
        </h1>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        <div className="w-full h-full">
          <div className="xl:w-3/4 my-10">
            <h1 className="text-4xl xl:text-6xl font-semibold tracking-tight xl:tracking-normal">
              Explore the Beauty, Discover a World of Captivating{' '}
              <span className="text-primary font-bold underline">Images</span>
            </h1>
            <p className="text-sm lg:text-lg mt-5 lg:text-justify">
              Discover the allure of visual art. Immerse yourself in a
              captivating collection of stunning images, showcasing the wonders
              of nature, life&apos;s extraordinary moments, and pixelated
              masterpieces.
            </p>
          </div>
          <div className="divider mb-12"></div>

          <LightboxOpen images={images} />
        </div>
      </div>
    </>
  );
}
