'use client';
import Image from 'next/image';

interface UserCardProps {
  username: string;
  name: string;
  image: string;
}

function UserCard({ username, name, image }: UserCardProps) {
  return (
    <article className='user-card h-64 justify-between gap-6'>
      <div className='user-card_avatar w-24 items-center justify-center'>
        <div className='relative items-center justify-center'>
          <Image
            src={image}
            alt='user_logo'
            className='rounded-full'
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className='flex text-ellipsis flex-col items-center gap-2'>
        <h4 className='text-base-semibold text-light-1'>{name}</h4>
        <p className='text-small-medium text-gray-1'>username: {username}</p>
      </div>
      <button className='user-card_btn mb-3 w-24'>More</button>
    </article>
  );
}

export default UserCard;
