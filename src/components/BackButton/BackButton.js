import { useRouter } from 'next/router';
import React from 'react'
import { FiChevronLeft } from 'react-icons/fi';
export default function BackButton({router,title}) {
  return (
      <div className="flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <FiChevronLeft className="text-2xl" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          </div>
  )
}
