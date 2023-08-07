'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Landmark } from 'lucide-react';

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  children,
  onClose,
  isOpen,
}) => {
  const closeModal = () => {
    if (isOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className='lg:p-8 '>
        <DialogHeader>
          <div className='text-center'>
            <div className='flex gap-2 items-center font-bold text-2xl mb-4 justify-center'>
              <Landmark size={30} className='text-indigo-600' />
              Invoicify
            </div>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </div>
        </DialogHeader>
        <div className='mt-4'>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
