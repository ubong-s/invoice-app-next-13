'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar, UserAvatarProps } from '@/components/ui/user-avatar';
import { signOut } from 'next-auth/react';

interface UserMenuProps extends UserAvatarProps {}

export const UserMenu: React.FC<UserMenuProps> = ({ name, image }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='bg-transparent hover:bg-transparent border-none outline-0'>
          <UserAvatar image={image} name={name!} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' side='bottom' align='end'>
        <DropdownMenuItem>Settings</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
