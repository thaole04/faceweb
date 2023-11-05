'use client';

import { connectToDB } from '@/lib/mongoose';
export default function Home() {
  connectToDB();
  return (
    <div>
      <h1 className='text-light-1'>Home</h1>
    </div>
  );
}
