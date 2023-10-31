import React from 'react';

export default function ButtonBuz() {
  const handleButtonClick = () => {
    const res = fetch('http://192.168.137.85:5000/run', {
      method: 'GET',
    });
  };
  return (
    <button
      onClick={handleButtonClick}
      className='m-4'
    >
      ButtonBuz
    </button>
  );
}
