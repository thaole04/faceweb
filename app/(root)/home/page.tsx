'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HomePage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = true; // Thay thế bằng cách kiểm tra trạng thái đăng nhập của người dùng

    if (!userLoggedIn) {
      router.push('/login'); // Chuyển hướng đến trang đăng nhập
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <h1>Trang chủ</h1>
      {isLoggedIn && (
        // Hiển thị nội dung của trang chủ
        <div>
          <p>Nội dung trang chủ...</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
