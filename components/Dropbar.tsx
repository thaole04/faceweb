'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  routeType: string;
  options: any;
}

function DropBar({ routeType, options }: Props) {
  const router = useRouter();
  const userSelected = options;
  // if options does not have unknown, add it
  if (!userSelected.find((option: any) => option.username === 'unknown')) {
    userSelected.unshift({ username: 'unknown', name: '' });
  }
  const [search, setSearch] = useState('');

  // query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=` + search);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  return (
    <div className='searchbar'>
      <Image
        src='/archive.svg'
        alt='search'
        className='object-contain'
        style={{ width: '24px', height: 'auto' }}
        width={0}
        height={0}
      />
      <select
        className='no-focus searchbar_input'
        onChange={(e) => setSearch(e.target.value)}
      >
        <option value=''>All activities</option>
        {userSelected.map((option: any) => (
          <option
            key={option.username}
            value={option.username}
          >
            {option.name + ' (' + option.username + ')'}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropBar;
