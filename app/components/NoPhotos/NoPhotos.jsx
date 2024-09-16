const NoPhotos = () => {
  return (
    <div className="flex flex-col items-center justify-center  gap-5 my-40">
      <div className="justify-center flex w-full">
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
      </div>
      <h1 className="text-2xl xl:text-4xl font-mono text-primary text-center font-semibold">
        No photos found, Let&apos;s upload some!
      </h1>
    </div>
  );
};

export default NoPhotos;
