'use client';
import { BASE_URL } from '@/lib/base_url';
import React from 'react';
import { toast } from 'react-toastify';
import AuthForm from './AuthForm';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
  const router = useRouter();
  const handleRegister = async (values) => {
    const { username, password } = await values;
    const response = await fetch(`${BASE_URL}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_SECRET_KEY,
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
  };
  return (
    <div>
      <AuthForm isRegister={true} submit={handleRegister} />
    </div>
  );
};

export default SignUpForm;
