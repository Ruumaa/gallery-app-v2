'use client';

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SessionChecker = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const session = async () => {
      const user = await getSession();

      if (!user) {
        router.push('/auth/sign-in');
      }
    };
    session();
  }, [router]);
  return <>{children}</>;
};

export default SessionChecker;
