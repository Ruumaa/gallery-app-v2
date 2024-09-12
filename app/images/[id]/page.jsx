'use client';
import UserImages from '@/app/components/UserImages/UserImages';
import { getUserImages } from '@/lib/fetch';
import { useEffect } from 'react';
const Page = ({ params }) => {
  const userId = params.id;
  // const images = await getUserImages(userId);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/images/${userId}`, {
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

    if (userId) {
      fetchImages();
    }
  }, [userId]);

  if (images?.length === 0) {
    return (
      <div className="flex gap-4 items-center justify-center h-screen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-28 h-w-28"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        <h1 className="text-5xl font-mono text-primary font-semibold">
          No photos found, Let&apos;s upload some!
        </h1>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
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
        <UserImages images={images} />
      </div>
    </div>
  );
};

export default Page;
