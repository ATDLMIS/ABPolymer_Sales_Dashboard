const getFileTypeFromUrl = (fileUrl) => {
    const extension = fileUrl.split('.').pop().toLowerCase();
  
    if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension)) {
      return "image";
    }
    if (extension === "pdf") {
      return "pdf";
    }
    if (["doc", "docx"].includes(extension)) {
      return "word";
    }
    if (["txt"].includes(extension)) {
      return "text";
    }
    // Add other file types as needed
    return "unknown";
  };

  export default getFileTypeFromUrl