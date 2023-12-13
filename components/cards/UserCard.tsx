'use client';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import {
  insertControlByModel,
  deleteUserByUsername,
} from '@/lib/actions/user.actions';

interface UserCardProps {
  username: string;
  name: string;
  image: string;
}
function UserCard({ username, name, image }: UserCardProps) {
  const [deleteUser, setDeleteUser] = useState(false);
  return (
    <article className='user-card h-64 justify-between gap-6 pt-3'>
      <div className='user-card_avatar w-24 items-center justify-center'>
        <div className='relative items-center justify-center'>
          <Image
            src={image}
            alt='user_logo'
            className='rounded-full'
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className='flex text-ellipsis flex-col items-center gap-2'>
        <h4 className='text-base-semibold text-light-1'>{name}</h4>
        <p className='text-small-medium text-gray-1'>username: {username}</p>
      </div>
      <div className='flex gap-2'>
        <CldUploadWidget
          options={{
            maxFiles: 20,
            folder: 'train/' + username,
            resourceType: 'image',
            multiple: true,
            showAdvancedOptions: true,
            tags: [username, name],
            theme: 'minimal',
            showPoweredBy: false,
          }}
          uploadPreset='face_recognition'
          onSuccess={(res) => {
            const clock = new Date();
            const dataControl = {
              time:
                clock.getHours() +
                ':' +
                clock.getMinutes() +
                ':' +
                clock.getSeconds(),
              date: clock.toLocaleDateString(),
              username: username,
              type: 'AddPhotos',
              executed: false,
            };
            console.log(insertControlByModel(dataControl));
          }}
        >
          {({ open }) => {
            function handleOnClick(e: any) {
              e.preventDefault();
              open();
            }
            return (
              <button
                className='user-card_btn mb-3 w-24 p-1'
                onClick={handleOnClick}
              >
                Add Photos
              </button>
            );
          }}
        </CldUploadWidget>
        <button
          className='user-card_btn mb-3 w-24 p-1'
          onClick={() => {
            setDeleteUser(true);
          }}
        >
          Delete
        </button>
      </div>
      <div>
        {deleteUser && (
          <div className='w-screen h-screen fixed top-0 left-0 z-10 flex justify-center items-center overflow-hidden  bg-opacity-50 bg-slate-950 backdrop-blur-sm'>
            <div className='flex flex-col w-3/5 max-w-sm bg-slate-700 h-2/5 max-h-40 items-center justify-center rounded-lg'>
              <p className='text-light-1 text-center'>
                Are you sure you want to delete {name}? This action cannot be
                undone.
              </p>
              <div className='flex gap-4 mt-2 h-fit'>
                <button
                  className='user-card_btn !h-10'
                  onClick={() => {
                    setDeleteUser(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className='user-card_btn !h-10'
                  onClick={() => {
                    const clock = new Date();
                    const dataControl = {
                      time:
                        clock.getHours() +
                        ':' +
                        clock.getMinutes() +
                        ':' +
                        clock.getSeconds(),
                      date: clock.toLocaleDateString(),
                      username: username,
                      type: 'DeleteUser',
                      executed: false,
                    };
                    console.log(deleteUserByUsername(username));
                    const status = insertControlByModel(dataControl);
                    status.then((res) => {
                      if (res) {
                        window.location.reload();
                      }
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default UserCard;
