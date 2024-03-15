/* eslint-disable @typescript-eslint/ban-ts-comment */
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import Logo from './Logo';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<SignUpData>();

  const createUser = async (data: SignUpData) => {
    setError('');
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const user = await authService.getCurrentUser();
        //@ts-expect-error
        //I not able to figure out types
        if (user) dispatch(login({ userData }));
        navigate('/');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-apple-200 text-apple-900 rounded-xl p-10 border border-apple-950/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline hover:underline-offset-4"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(createUser)} className="mt-8 text-left">
          <div className="space-y-5">
            <Input
              {...register('name', { required: true })}
              label="Full Name"
              placeholder="Full Name"
            />
            <Input
              {...register('email', {
                required: true,
              })}
              label="Email"
              placeholder="Email Address"
              type="email"
            />
            <Input
              {...register('password', { required: true })}
              label="Password"
              type="password"
              placeholder="Password"
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
