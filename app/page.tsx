'use client';
import { UserButton } from '@clerk/nextjs';
import ButtonBuz from '@/components/ButtonBuz';
export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl='/' />
      <ButtonBuz />
    </div>
  );
}
