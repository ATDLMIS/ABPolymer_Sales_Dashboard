'use client';
import { signOut } from 'next-auth/react';

const Logout = () => {
  return (
    <div>
      <button
        className="bg-surface2 text-black py-1.5 px-4 rounded-md ml-4"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
