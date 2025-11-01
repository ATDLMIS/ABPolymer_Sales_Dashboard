"use client";

import Link from 'next/link';

export default function Custom500() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
      <p className="text-xl mb-6">Something went wrong on our end.</p>
      <Link href="/dashboard" className="text-blue-600 hover:underline">
        Go back home
      </Link>
    </div>
  );
}
