import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='bg-slate-600 w-full h-screen flex items-center justify-center'>
      <SignIn />;
    </div>
  );
}
