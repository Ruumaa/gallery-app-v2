import Image from 'next/image';
import NoPhotos from '../components/NoPhotos/NoPhotos';
import { getImageNative, getImageSupa } from '@/lib/ssr';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async () => {
  const images = await getImageNative();
  return (
    <div>
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
            {`${images.data[0].imageUrl}`}
          </p>
        </div>
        <div className="divider mb-12 mt-10"></div>
        {images.data.length < 1 ? (
          <NoPhotos />
        ) : (
          <div className="w-full grid grid-cols-3 gap-4 mb-20 ">
            {images.data.map((image) => (
              <div className="container" key={image.id}>
                <Image
                  src={image.imageUrl}
                  alt="pics"
                  width={500}
                  height={500}
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-xl h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
