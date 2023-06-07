import React from "react";

export const PlaceHolder = () => {
  return (
    <div
      role="status"
      className="w-1/2 p-4 border border-gray-200 rounded shadow animate-pulse md:p-6"
    >
      <div className="flex items-center justify-center h-72 mb-4 bg-gray-300 rounded "></div>

      <div className="h-10 bg-gray-200 rounded-lg w-full mb-4"></div>
      <div className="h-10 bg-gray-200 rounded-lg w-full mb-4"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
