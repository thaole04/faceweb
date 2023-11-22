'use client';
import Image from 'next/image';

function ButtonReload() {
  return (
    <button
      onClick={() => {
        location.reload();
      }}
    >
      <Image
        src='/reload.svg'
        alt='reload'
        width={24}
        height={24}
        className='self-center'
      />
    </button>
  );
}

export default ButtonReload;
