import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import HandleLogout from './HandleLogout';
import HandleLogin from './HandleLogin';
import HandleUpload from './HandleUpload';

const Nav = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="navbar bg-stone-950 items-center text-white px-3 sm:px-0">
      <div className="max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-5xl mx-auto w-full flex justify-between">
        <Link href="/">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 hover:text-slate-300"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          </div>
        </Link>
        <HandleUpload session={session} />

        {session && (
          <Link href={`/images/${session.user.id}`}>
            <div className="font-medium font-mono hover:text-slate-300 mr-5 ">
              My images
            </div>
          </Link>
        )}

        {!session ? <HandleLogin /> : <HandleLogout />}
      </div>
    </div>
  );
};

export default Nav;
