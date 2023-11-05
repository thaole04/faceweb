'use client';
import Image from 'next/image';

interface UserCardProps {
  id: number;
  name: string;
  image: string;
}

function UserCard({ id, name, image }: UserCardProps) {
  return (
    <article className='user-card'>
      <div className='user-card_avatar'>
        <div className='relative h-12 w-12'>
          <Image
            src={image}
            alt='user_logo'
            className='rounded-full object-cover'
            width={48}
            height={48}
          />
        </div>

        <div className='flex-1 text-ellipsis'>
          <h4 className='text-base-semibold text-light-1'>{name}</h4>
          <p className='text-small-medium text-gray-1'>ID: {id}</p>
        </div>
      </div>
    </article>
  );
}

export default UserCard;
