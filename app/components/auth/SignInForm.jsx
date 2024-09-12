'use client';
import { signIn } from 'next-auth/react';
import AuthForm from './AuthForm';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
  const router = useRouter();
  const handleLogin = async (values) => {
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
  };

  return (
    <div>
      <AuthForm isRegister={false} submit={handleLogin} />
    </div>
  );
};

export default SignInForm;
