'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Facebook from '../assets/Facebook.png';
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

const Login = () => {
  const router = useRouter();
  const { user } = useUser();
  
  useEffect(() => {
    if (user) {
      const chatId = user?.id;
      console.log(chatId);
      router.push(`/dashboard`);
    }
  }, [user, router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) setEmail(savedEmail);
  }, []);

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  }, [rememberMe, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        router.push('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 md:p-8">
      <div className="bg-transparent bg-opacity-30 backdrop-blur-sm p-6 sm:p-8 border border-[#b8b8ba] shadow-2xl min-h-[60vh]">
        <h2 className="text-md font-semibold text-indigo-700 mb-6 text-center sm:text-left">
          Welcome back! Please login to your account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 w-1 bg-indigo-600" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pt-[18px] p-[14.5px] pl-4 border border-[#c1bbbb] rounded focus:outline-none bg-white text-sm text-indigo-600"
                required
              />
              <label
                htmlFor="email"
                className={`absolute left-4 transition-all duration-200 ${
                  email
                    ? 'top-1 mb-2 text-xs text-gray-400'
                    : 'top-[26px] transform -translate-y-1/2 text-sm text-gray-500'
                }`}
              >
                Email Address
              </label>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pt-4 pl-4 text-sm p-[14.5px] border border-[#c1bbbb] bg-white focus:outline-none rounded text-indigo-600"
                required
              />
              <label
                htmlFor="password"
                className={`absolute left-4 transition-all duration-200 ${
                  password
                    ? 'top-1 text-xs text-gray-500'
                    : 'top-[26px] transform -translate-y-1/2 text-sm text-gray-500'
                }`}
              >
                Password
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2 sm:gap-0">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3 w-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember Me
              </label>
            </div>
            <div>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
                Forgot Password?
              </a>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4 text-center sm:text-left">{error}</p>}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-[120px] px-4 py-2 bg-indigo-600 text-white h-[48px] rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm flex items-center justify-center"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Login'
                )}
              </button>

              <Link
                href="/signup"
                className="w-full h-[48px] sm:w-[120px] px-4 py-2 bg-white text-indigo-600 font-medium rounded border border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-center text-sm flex items-center justify-center"
              >
                Sign Up
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4">
              {/* <SignedOut>
                <Link href="/sign-in" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  <img
                    className='cursor-pointer hover:scale-110 transition-transform'
                    src="https://png.pngtree.com/png-vector/20230817/ourmid/pngtree-google-internet-icon-vector-png-image_9183287.png"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                </Link>
              </SignedOut>  */}
              
              <Image
                className="w-[22px] cursor-pointer hover:scale-110 transition-transform"
                src={Facebook}
                alt="Facebook"
                width={22}
                height={22}
              />
              <img 
                className='w-[22px] cursor-pointer hover:scale-110 transition-transform' 
                src='https://img.freepik.com/premium-vector/x-new-social-network-black-app-icon-twitter-rebranded-as-x-twitter-s-logo-was-changed_277909-568.jpg?semt=ais_hybrid' 
                alt="Twitter" 
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;