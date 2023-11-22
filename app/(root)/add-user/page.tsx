'use client';
import { useState, useEffect } from 'react';
import { getUsersByModelForCheck } from '@/lib/actions/user.actions';
import { CldUploadWidget } from 'next-cloudinary';
import {
  insertUserByModel,
  insertControlByModel,
} from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';
function Page() {
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [validUpload, setValidUpload] = useState(false);
  const [userPhoto, setUserPhoto] = useState('');
  const [userPhotos, setUserPhotos] = useState(false);
  const userNameRegex = /^[a-zA-Z0-9]+$/;

  const route = useRouter();
  useEffect(() => {
    validateInput();
  }, [userName, name]);
  const validateInput = () => {
    if (!name) {
      setNameError('Name is required');
    } else {
      setNameError('Name is valid');
    }
    if (!userName) {
      setUserNameError('Username is required');
    } else if (!userNameRegex.test(userName)) {
      setUserNameError('Username is invalid');
    } else {
      setUserNameError('Username is valid');
    }
  };
  const handleSubmit = (e: any) => {
    if (
      userNameError === 'Username is valid' &&
      nameError === 'Name is valid'
    ) {
      const usersdb = getUsersByModelForCheck();
      usersdb.then((res) => {
        if (res) {
          const users = res.map((user: any) => user.username);
          if (users.includes(userName)) {
            alert('Username already exists');
            setValidUpload(false);
            return;
          } else {
            setValidUpload(true);
          }
        }
      });
    } else {
      alert('Invalid input');
      return;
    }
  };

  const handleSendData = () => {
    const data = {
      username: userName,
      name: name,
      image:
        'https://res.cloudinary.com/dkjd1omoz/image/upload/c_crop,g_auto,h_500,w_500/' +
        userPhoto +
        '.jpg',
    };
    const clock = new Date();
    const control = {
      time:
        clock.getHours() + ':' + clock.getMinutes() + ':' + clock.getSeconds(),
      date: clock.toLocaleDateString(),
      username: userName,
      type: 'AddUser',
      executed: false,
    };
    console.log(insertControlByModel(control));
    console.log(insertUserByModel(data));
    route.push('/users');
  };

  return (
    <div className='flex flex-col bg-slate-700 rounded-lg w-4/5 min-h-fit m-auto'>
      <label
        htmlFor=''
        className='text-light-1 mt-2 ml-2'
      >
        Name
      </label>
      <input
        type='text'
        value={name}
        className='mx-2 rounded-sm h-8 p-2'
        onChange={(e) => setName(e.target.value)}
      />
      {(nameError !== 'Name is valid' && (
        <p className='text-red-500 text-sm ml-2'>{nameError}</p>
      )) || <p className='text-green-500 text-sm ml-2'>{nameError}</p>}
      <label
        htmlFor=''
        className='text-light-1 mt-2 ml-2'
      >
        Username
      </label>
      <input
        type='text'
        value={userName}
        className='mx-2 rounded-sm h-8 p-2'
        onChange={(e) => setUserName(e.target.value)}
      />
      {(userNameError !== 'Username is valid' && (
        <p className='text-red-500 text-sm ml-2'>{userNameError}</p>
      )) || <p className='text-green-500 text-sm ml-2'>{userNameError}</p>}
      <button
        onClick={handleSubmit}
        className='text-light-1  bg-dark-4 w-1/4 h-10 rounded-md self-center mt-4 mb-2 min-w-fit p-2'
      >
        Upload Photos
      </button>
      {validUpload && (
        <CldUploadWidget
          options={{
            maxFiles: 20,
            folder: 'train/' + userName,
            resourceType: 'image',
            multiple: true,
            showAdvancedOptions: true,
            tags: [userName, name],
            theme: 'minimal',
            showPoweredBy: false,
          }}
          uploadPreset='face_recognition'
          onSuccess={(res) => {
            setUserPhotos(true);
          }}
          onOpen={() => console.log('train/' + userName)}
        >
          {({ open }) => {
            function handleOnClick(e: any) {
              e.preventDefault();
              open();
            }
            return (
              <button
                className='button text-light-1 bg-slate-900 w-fit h-12 rounded-sm self-center p-2 m-2'
                onClick={handleOnClick}
              >
                Upload Training Photos
              </button>
            );
          }}
        </CldUploadWidget>
      )}
      {validUpload && (
        <CldUploadWidget
          options={{
            maxFiles: 1,
            folder: 'users/' + userName,
            resourceType: 'image',
            multiple: false,
            showAdvancedOptions: true,
            tags: [userName, name],
            theme: 'minimal',
            showPoweredBy: false,
          }}
          uploadPreset='face_recognition'
          onSuccess={(res) => {
            const data = res.info;
            if (typeof data !== 'undefined' && typeof data !== 'string') {
              if (typeof data === 'object') {
                const publicId = (data as { public_id: string }).public_id;
                // Use the publicId variable here
                setUserPhoto(publicId);
              }
            }
          }}
        >
          {({ open }) => {
            function handleOnClick(e: any) {
              e.preventDefault();
              open();
            }
            return (
              <button
                className='button text-light-1 bg-slate-900 w-fit h-12 rounded-sm self-center p-2 m-2'
                onClick={handleOnClick}
              >
                Upload User's Photos
              </button>
            );
          }}
        </CldUploadWidget>
      )}
      {userPhoto != '' && userPhotos && (
        <button
          className='text-light-1 w-fit rounded-md bg-green-800 p-4 self-center mb-4'
          onClick={handleSendData}
        >
          Add User
        </button>
      )}
    </div>
  );
}
export default Page;
