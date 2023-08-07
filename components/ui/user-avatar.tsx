import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface UserAvatarProps {
  image?: string | null;
  name: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ image, name }) => {
  const [first, second] = name.split(' ');
  const abbr = `${first[0]}${second[0]}`;

  return (
    <Avatar>
      {image && <AvatarImage src={image} alt={name} />}
      <AvatarFallback>{abbr}</AvatarFallback>
    </Avatar>
  );
};
