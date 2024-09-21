'use client';
import { signIn } from 'next-auth/react';
import AuthForm from './AuthForm';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const { username, password } = await values;
      const signInData = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });
      if (signInData?.error) {
        toast.error('Invalid username or password');
      } else {
        toast.success('Login success');
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Error during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthForm isRegister={false} submit={handleLogin} loading={loading} />
    </div>
  );
};

export default SignInForm;
