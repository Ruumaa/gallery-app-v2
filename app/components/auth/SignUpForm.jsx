'use client';
import { BASE_URL } from '@/lib/base_url';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AuthForm from './AuthForm';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleRegister = async (values) => {
    try {
      setLoading(true);
      const { username, password } = await values;
      const response = await fetch(`/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY,
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(`${result.msg}`);
        router.push('/auth/sign-in');
        router.refresh();
      } else {
        toast.error(`${result.msg}`);
      }
    } catch (error) {
      console.error('Error during register:', error);
      toast.error('Error during register');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <AuthForm isRegister={true} submit={handleRegister} loading={loading} />
    </div>
  );
};

export default SignUpForm;
