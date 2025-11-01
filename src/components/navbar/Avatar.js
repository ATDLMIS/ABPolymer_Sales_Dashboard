'use client';
import { RxAvatar } from 'react-icons/rx';
import Image from 'next/image';

const Avatar = ({ userAvatar }) => {
  if (userAvatar) {
    return (
      <Image
        src={userAvatar}
        width={48}
        height={48}
        className="rounded-full"
        alt="Profile avatar"
      />
    );
  }
  return <RxAvatar className="text-5xl" />;
};

export default Avatar;
