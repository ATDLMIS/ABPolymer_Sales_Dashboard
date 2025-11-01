const PdfWithDownload = ({ fileUrl }) => {
  return (
    <div className="flex flex-col items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4 text-center">
        Document Not Able To Display But <br /> You Can Download And View
      </div>
      <a
        href={fileUrl}
        download
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        target="_blank"
      >
        Download
      </a>
    </div>
  );
};

export default PdfWithDownload;
