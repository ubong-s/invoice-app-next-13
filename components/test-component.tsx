'use client';

import { useModal } from '@/hooks/use-modal';
import { signIn } from 'next-auth/react';

export const TestComponent = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <button onClick={() => signIn('google')}>Continue with Google</button>
      <button onClick={() => onOpen('login')}>login</button>
      <button
        onClick={() => {
          onOpen('register');
        }}
      >
        register
      </button>
    </div>
  );
};
