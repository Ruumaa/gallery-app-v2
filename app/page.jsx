'use client';

import { displayImages } from '@/lib/fetch';
import LightboxOpen from './components/Lightbox/LightboxOpen';
import Loading from './loading';
import NoPhotos from './components/NoPhotos/NoPhotos';

export default function Home() {
  const { useImages } = displayImages();
  const { images, isLoading } = useImages();

  return (
    <>
      <div className="w-full h-full">
        <div className="xl:w-3/4 my-10">
          <h1 className="text-4xl xl:text-6xl font-semibold tracking-tight xl:tracking-normal">
            Explore the Beauty, Discover a World of Captivating{' '}
            <span className="text-primary font-bold underline">Images</span>
          </h1>
          <p className="text-sm lg:text-lg mt-5 lg:text-justify">
            Discover the allure of visual art. Immerse yourself in a captivating
            collection of stunning images, showcasing the wonders of nature,
            life&apos;s extraordinary moments, and pixelated masterpieces.
          </p>
        </div>
        <div className="divider mb-12"></div>
        {images?.data?.length === 0 ? (
          <NoPhotos />
        ) : isLoading ? (
          <Loading />
        ) : (
          <LightboxOpen images={images} />
        )}
      </div>
    </>
  );
}
