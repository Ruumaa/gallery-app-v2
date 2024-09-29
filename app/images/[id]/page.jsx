'use client';

import NoPhotos from '@/app/components/NoPhotos/NoPhotos';
import UserImages from '@/app/components/UserImages/UserImages';
import Loading from '@/app/loading';
import { displayImages } from '@/lib/fetch';
import SessionChecker from '@/lib/SessionChecker';

const Page = ({ params }) => {
  const userId = params.id;
  const { useImageById } = displayImages();
  const { images, isLoading } = useImageById(userId);
  return (
    <SessionChecker>
      <div className="w-full h-full">
        <div className="xl:w-3/4 my-10">
          <h1 className="text-4xl xl:text-6xl font-semibold tracking-tight xl:tracking-normal">
            Explore Your Memories with Our{' '}
            <span className="text-primary font-bold underline">
              Gallery App
            </span>
          </h1>
          <p className="text-sm lg:text-lg mt-5 lg:text-justify">
            Explore and manage your memories effortlessly with our Gallery App.
            Swipe through, relive, and delete photos seamlessly. Enjoy
            clutter-free organization for your digital gallery, putting your
            memories in your control. Simple, intuitive, and personalized photo
            management at your fingertips.
          </p>
        </div>
        <div className="divider mb-12"></div>
        {images?.data?.length === 0 ? (
          <NoPhotos />
        ) : isLoading ? (
          <Loading />
        ) : (
          <UserImages images={images} userId={userId} />
        )}
      </div>
    </SessionChecker>
  );
};

export default Page;
