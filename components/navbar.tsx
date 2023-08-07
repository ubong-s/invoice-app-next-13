'use client';

import Link from 'next/link';
import { Landmark } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/user-menu';

import { useModal } from '@/hooks/use-modal';

export const Navbar = () => {
  const modal = useModal();
  const session = useSession();

  return (
    <header className='absolute inset-x-0 top-0 z-50'>
      <Container>
        <nav
          className='flex items-center justify-between py-6 lg:py-8'
          aria-label='Global'
        >
          <div className='flex lg:flex-1'>
            <Link
              href='/'
              className='flex gap-2 items-center font-bold text-2xl'
            >
              <Landmark size={30} className='text-indigo-600' />
              Invoicify
            </Link>
          </div>
          <div className='lg:flex lg:flex-1 lg:justify-end'>
            {session.data?.user ? (
              <div className='flex items-center gap-4 '>
                <Link href='/dashboard' className='font-bold text-xl'>
                  Dashboard
                </Link>
                <UserMenu
                  image={session.data.user.image}
                  name={session.data.user.name!}
                />
              </div>
            ) : (
              <Button
                onClick={() => modal.onOpen('login')}
                className='bg-indigo-600 text-sm font-semibold leading-6 text-white flex items-center gap-2 hover:bg-indigo-500 lg:text-lg lg:p-6'
              >
                Log in <span aria-hidden='true'>&rarr;</span>
              </Button>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};
