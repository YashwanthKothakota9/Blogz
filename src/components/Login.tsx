/* eslint-disable @typescript-eslint/ban-ts-comment */
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import Logo from './Logo';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/authSlice';
import { Bars } from 'react-loader-spinner';

type LoginData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<LoginData>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const loginUser = async (data: LoginData) => {
    setError('');
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );
  }

  return (
    <div className="flex items-center justify-center w-full mt-8">
      <div
        className={`mx-auto w-full max-w-lg bg-apple-200 text-apple-900 rounded-xl p-10 border border-apple-950/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(loginUser)} className="mt-8 text-left">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Email Address"
              type="email"
              {...register('email', {
                required: true,
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
            <Button type="submit" className="w-full">
              Sign in{' '}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
