'use client';
import getFileTypeFromUrl from '@/utils/getFileTypeFromUrl';
import ImageWithDownload from '../ImageWithDownload';
import PdfWithDownload from '../PdfWithDownload';
const PartyDocumentView = ({ partydoc }) => {
  if (partydoc.status === 'pending') {
    return (
      <h1 className="text-xl text-center py-5 font-semibold">Loading...</h1>
    );
  }

  return (
    <div className="py-6">
      <h1 className="text-center py-6 font-semibold text-xl">Documents</h1>
      {partydoc.data.Documents?.length ? (
        <div className="flex gap-3">
          {partydoc.data.Documents.map(item => {
            const extentionType = getFileTypeFromUrl(item.PartyDocsPath);
            if (extentionType === 'image') {
              return (
                <ImageWithDownload
                  imageUrl={item.PartyDocsPath}
                  altText={item.PartyDocName}
                  key={item.PartyDocsID}
                />
              );
            } else {
              return (
                <PdfWithDownload
                  fileUrl={item.PartyDocsPath}
                  key={item.PartyDocsID}
                />
              );
            }
          })}
        </div>
      ) : (
        <h1 className="text-xl text-center py-5 font-semibold">
          No document uploaded
        </h1>
      )}
    </div>
  );
};

export default PartyDocumentView;
