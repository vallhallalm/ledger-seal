import React, { useCallback, useRef } from "react";

interface FileDropzoneProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

const FileDropzone = (props: FileDropzoneProps) => {
  const { file, setFile } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
        className={`w-full h-48 flex flex-col items-center justify-center border-4 border-dashed rounded-xl ${
          file ? "border-green-400" : "border-gray-300 hover:border-blue-500"
        } text-gray-500 transition-colors p-4 cursor-pointer`}
      >
        {!file ? (
          <p className="text-center">Click or drag & drop a file here</p>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="max-w-[200px] truncate text-sm font-medium text-gray-700">
              {file.name}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              X
            </button>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
};

export default FileDropzone;
