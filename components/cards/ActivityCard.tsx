'use client';
import Image from 'next/image';
import { useState } from 'react';
interface ActivityProps {
  time: string;
  date: string;
  name: string;
  image: string;
  secured?: boolean;
}

function ActivityCard({ time, date, name, image, secured }: ActivityProps) {
  const [display, setDisplay] = useState(false);
  return (
    <div className='activity-card'>
      {display && (
        <div
          className='w-full h-full flex items-center justify-center fixed top-0 left-0 z-10 bg-opacity-70 bg-slate-900 cursor-pointer'
          onClick={() => {
            setDisplay(!display);
          }}
        >
          <Image
            src={image}
            alt='user_logo'
            className='object-cover'
            width={500}
            height={500}
          />
        </div>
      )}
      <div className='activity-card_avatar'>
        <div className='relative h-24 w-24'>
          <Image
            src={image}
            alt='user_logo'
            fill
            sizes='(min-width: 1024px) 200px, 100px'
            className='rounded-full object-cover cursor-pointer'
            onClick={() => {
              setDisplay(!display);
            }}
          />
        </div>
      </div>
      <div className='flex-1 text-ellipsis flex-col'>
        <h4 className='text-base-semibold text-light-1 mb-2'>Name: {name}</h4>
        <p className='text-small-medium text-gray-1'>
          Time: {time.replaceAll('-', ':')}
        </p>
        <p className='text-small-medium text-gray-1'>Date: {date}</p>
      </div>
      <div>
        {secured ? (
          <Image
            src='/check.svg'
            alt='true'
            className='rounded-full'
            width={36}
            height={36}
          />
        ) : (
          <Image
            src='/denied.svg'
            alt='false'
            className='rounded-full'
            width={36}
            height={36}
          />
        )}
      </div>
    </div>
  );
}

export default ActivityCard;
