import React, { useState } from "react";
import Image from "next/image";

type Resource = {
  _id: string;
  name: string;
  title: string;
  description: string;
  pdfUrl: string;
  thumbnailUrl: string;
  category: string;
  downloadedCount: number;
  links: string[];
};

type Props = {
  resource: Resource;
};

const ResourceCard: React.FC<Props> = ({ resource }) => {
  const [expanded, setExpanded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="p-4">
      <div className="relative border rounded-lg shadow-md overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-lg bg-white dark:bg-slate-800">
        {/* Badge */}
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-lg shadow">
          {resource.category}
        </div>

        {/* Thumbnail */}
        <div className="relative w-full h-48">
          <Image
            src={resource.thumbnailUrl}
            alt={resource.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>

        {/* Content */}
        <div className="p-4 text-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {resource.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {resource.description.length > 80
              ? `${resource.description.substring(0, 80)}...`
              : resource.description}
          </p>

          {/* Download Count */}
          <span className="block mt-2 text-xs text-gray-500 dark:text-gray-400">
            {resource.downloadedCount} downloads
          </span>

          {/* Buttons */}
          <div className="mt-4 flex flex-col gap-2">
            <button
              className="block text-center bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition"
              onClick={() => setExpanded(true)}
            >
              See More
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setExpanded(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] md:w-[70%] lg:w-[50%] relative flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              onClick={() => setExpanded(false)}
            >
              ✕
            </button>

            {/* Modal Content */}
            <div className="relative w-full h-48">
              <Image
                src={resource.thumbnailUrl}
                alt={resource.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {resource.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {resource.category}
              </p>

              {/* Description */}
              <p
                className="mt-4 text-gray-700 dark:text-gray-200 text-sm"
                style={{
                  display: showFullDescription ? "block" : "-webkit-box",
                  WebkitLineClamp: showFullDescription ? "unset" : "4",
                  WebkitBoxOrient: "vertical",
                  overflow: showFullDescription ? "visible" : "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {resource.description}
              </p>
              <button
                className="mt-2 text-blue-600 dark:text-blue-400 underline"
                onClick={() => setShowFullDescription((prev) => !prev)}
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>

              {/* Download PDF */}
              <a
                href={resource.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition"
              >
                Download PDF
              </a>

              {/* External Links */}
              {Array.isArray(resource.links) && resource.links.length > 0 && (
                <a
                  href={resource.links[0].replace(/["[\]]/g, '')} // Fix stringified array issue
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-blue-600 dark:text-blue-400 underline"
                >
                  Learn More
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceCard;
