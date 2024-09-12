'use client';

import { signOut } from 'next-auth/react';
const HandleLogout = () => {
  return (
    <div>
      <button
        className="btn btn-base-100 btn-sm"
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/auth/sign-in`,
          })
        }
      >
        <h3 className="font-semibold font-mono">Logout</h3>
      </button>
    </div>
  );
};

export default HandleLogout;
