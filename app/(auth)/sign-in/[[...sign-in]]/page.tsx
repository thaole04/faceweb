import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
export default function Page() {
  return (
    <div className='bg-slate-600 w-full h-screen flex items-center justify-center'>
      <Image
        src='/blue_swirl.png'
        alt='true'
        style={{}}
        layout='fill'
        objectFit='cover'
        quality={100}
      />
      <SignIn />;
    </div>
  );
}
