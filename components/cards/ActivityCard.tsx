'use client';
import Image from 'next/image';

interface ActivityProps {
  time: string;
  date: string;
  name: string;
  image: string;
}

function ActivityCard({ time, date, name, image }: ActivityProps) {
  return (
    <article className='user-card'>
      <div className='user-card_avatar'>
        <div className='relative h-12 w-12'>
          <Image
            src='https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX25634105.jpg'
            alt='user_logo'
            className='rounded-full object-cover'
            width={48}
            height={48}
          />
        </div>

        <div className='flex-1 text-ellipsis'>
          <h4 className='text-base-semibold text-light-1'>{name}</h4>
          <p className='text-small-medium text-gray-1'>Time: {time}</p>
          <p className='text-small-medium text-gray-1'>Date: {date}</p>
        </div>
      </div>
    </article>
  );
}

export default ActivityCard;
