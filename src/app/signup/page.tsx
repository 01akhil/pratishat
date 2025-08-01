'use client';

import React, { useState } from 'react';
import PersonalSignUp from '@/components/PersonalSignUp';
import OrganizationSignUp from '@/components/OrganizationSignUp';

const SignUp = () => {
  const [signupType, setSignupType] = useState<'personal' | 'organization'>('personal');

  return (
    <div className="w-full bg-gradient-to-br from-[#777EFF]/40 via-white to-[#CF31F6]/40 flex flex-col items-center justify-center min-h-screen relative p-4">

      {/* Toggle Switch */}
      <div className="absolute top-10 right-10">
        <div className="relative w-64 bg-gray-100 rounded-full border border-gray-200 p-1">
          <div className="flex relative">
            {/* Sliding Indicator */}
            <div
              className={`absolute top-0 left-0 h-full w-1/2 bg-white rounded-full shadow transition-transform duration-300 ${
                signupType === 'organization' ? 'translate-x-full' : ''
              }`}
            />

            {/* Personal Button */}
            <button
              type="button"
              onClick={() => setSignupType('personal')}
              className="w-1/2 text-center py-2 text-sm font-medium relative z-10 transition-colors duration-300 rounded-full"
            >
              <span className={signupType === 'personal' ? 'text-black' : 'text-gray-500'}>
                Personal
              </span>
            </button>

            {/* Organization Button */}
            <button
              type="button"
              onClick={() => setSignupType('organization')}
              className="w-1/2 text-center py-2 text-sm font-medium relative z-10 transition-colors duration-300 rounded-full"
            >
              <span className={signupType === 'organization' ? 'text-black' : 'text-gray-500'}>
                Organization
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Render Selected Form */}
      <div className="w-full  mt-20">
        {signupType === 'personal' ? (
          <PersonalSignUp onToggle={() => setSignupType('organization')} />
        ) : (
          <OrganizationSignUp onToggle={() => setSignupType('personal')} />
        )}
      </div>
    </div>
  );
};

export default SignUp;
