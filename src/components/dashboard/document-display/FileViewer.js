'use client'
import dynamic from "next/dynamic";
import Image from "next/image";
import getFileTypeFromUrl from "@/utils/getFileTypeFromUrl";

const PDFViewer = dynamic(() => import("@react-pdf-viewer/core").then((mod) => mod.Worker), { ssr: false });

const FileViewer = ({ fileUrl }) => {
    const fileType = getFileTypeFromUrl(fileUrl);
  
    return (
      <div>
        {fileType === "image" && (
          <div>
            <Image
              src={fileUrl}
              alt="File"
              width={500} // Adjust dimensions as needed
              height={500}
              layout="responsive"
            />
          </div>
        )}
        {fileType === "pdf" && (
          <div>
            <PDFViewer fileUrl={fileUrl} />
          </div>
        )}
        {fileType === "word" && (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
            width="100%"
            height="500px"
            frameBorder="0"
            title="Word Viewer"
          ></iframe>
        )}
        {fileType === "unknown" && <p>Unsupported file type</p>}
      </div>
    );
  };


  export default FileViewer