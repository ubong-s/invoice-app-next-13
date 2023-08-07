'use client';

import { signIn } from 'next-auth/react';
import * as z from 'zod';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

import { useModal } from '@/hooks/use-modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Field cannot be empty' })
    .email({ message: 'Please provide a valid email' }),
});

type FormValues = z.infer<typeof formSchema>;

export const AuthModal = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose } = useModal();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  const signInWithEmail = async (values: FormValues) => {
    let toastID;
    try {
      toastID = toast.loading('Loading......');
      setLoading(true);

      const response = await signIn('email', {
        redirect: false,
        callbackUrl: window.location.href,
        email: values.email,
      });

      if (response && response.error) {
        throw new Error();
      }
      setConfirm(true);
      toast.dismiss(toastID);
    } catch (error) {
      console.log(error);

      toast.error('Unable to sign in', { id: toastID });
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = () => {
    toast.loading('Redirecting.....');
    setLoading(true);
    // Perform sign in
    signIn('google', {
      callbackUrl: window.location.href,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      title={!showRegister ? 'Welcome Back!' : 'Please create an account'}
      onClose={onClose}
    >
      {/* Google Login */}
      <Button
        disabled={loading}
        onClick={signInWithGoogle}
        variant='outline'
        className='w-full border-indigo-600 text-sm font-semibold leading-6 text-indigo-600 flex items-center gap-2 hover:border-indigo-500 lg:text-base lg:p-6 disabled:opacity-50'
      >
        {!showRegister ? 'Login' : 'Register'} with Google
      </Button>

      {/* <div className='py-2 mt-4'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(signInWithEmail)}
            className='flex flex-col gap-2'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Email'
                        {...field}
                        className='p-6'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button
              type='submit'
              disabled={loading}
              className='w-full bg-indigo-600 text-sm font-semibold leading-6 text-white flex items-center gap-2 hover:bg-indigo-500 lg:text-base lg:p-6 disabled:opacity-50'
            >
              {!showRegister ? 'Login' : 'Register'}
            </Button>
            {confirm && (
              <p className='mt-4 text-center'>
                Please check{' '}
                <span className='text-indigo-600'>
                  {form.getValues('email')}
                </span>{' '}
                for link
              </p>
            )}
          </form>
        </Form>

        <p className='text-center text-sm text-gray-500 mt-4'>
          {!showRegister ? (
            <>
              Don&apos;t have an account yet?{' '}
              <button
                type='button'
                disabled={loading}
                onClick={() => {
                  setShowRegister(true);
                }}
                className='font-semibold text-indigo-500 hover:text-indigo-600 disabled:hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Register
              </button>
              .
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type='button'
                disabled={loading}
                onClick={() => {
                  setShowRegister(false);
                }}
                className='font-semibold text-indigo-500 hover:text-indigo-600 disabled:hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Log in
              </button>
              .
            </>
          )}
        </p>
      </div> */}
    </Modal>
  );
};
