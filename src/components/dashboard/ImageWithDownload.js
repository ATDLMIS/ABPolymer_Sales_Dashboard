import Image from 'next/image';

const ImageWithDownload = ({ imageUrl, altText }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <Image
          src={imageUrl}
          alt={altText}
          width={256}
          height={256}
          className="object-cover rounded-lg border border-gray-300"
        />
      </div>
      <a
        href={imageUrl}
        download
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        target="_blank"
      >
        Download Image
      </a>
    </div>
  );
};

export default ImageWithDownload;
