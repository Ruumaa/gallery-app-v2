'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const HandleLogin = () => {
  const router = useRouter();
  return (
    <div>
      <button
        className="btn btn-base-100 btn-sm"
        onClick={() => router.push('/auth/sign-in')}
      >
        Login
      </button>
    </div>
  );
};

export default HandleLogin;
