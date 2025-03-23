import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import Loader from "../../Loader/Loader";
import { useCreateResourceMutation } from "@/redux/features/resources/resourceApi";
import Image from "next/image";
const CreateResource = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    category: "",
    pdfFile: null, // Store File object
    thumbnailFile: null, // Store File object
    links: [] as string[], // Store links array
  });

  const [preview, setPreview] = useState<string | null>(null); // For thumbnail preview

  const [createResource, { isLoading, isSuccess, isError, error }] =
    useCreateResourceMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Resource created successfully!");
      redirect("/admin/resources");
    }
    if (isError) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(
          errorMessage.data.message ||
            "An error occurred while creating the resource."
        );
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  }, [isSuccess, isError, error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));

      // Preview thumbnail image
      if (name === "thumbnailFile") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const updatedLinks = [...formData.links];
    updatedLinks[index] = value;
    setFormData((prev) => ({ ...prev, links: updatedLinks }));
  };

  const handleAddLink = () => {
    setFormData((prev) => ({ ...prev, links: [...prev.links, ""] }));
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = formData.links.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, links: updatedLinks }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.pdfFile || !formData.thumbnailFile) {
      toast.error("Please upload both PDF and Thumbnail.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("pdfFile", formData.pdfFile); // PDF File
    formDataToSend.append("thumbnailFile", formData.thumbnailFile); // Thumbnail File
    formDataToSend.append("links", JSON.stringify(formData.links)); // Links as JSON string

    try {
      const response = await createResource(formDataToSend).unwrap();
      toast.success("Resource created successfully!");
      redirect("/admin/resources");
    } catch (error) {
      console.error("Error creating resource:", error);
      toast.error("Failed to create resource.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-lg">
      {isLoading ? (
        <Loader /> // Show the loader if isLoading is true
      ) : (
        <>
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
            Create a New <span className="text-gradient">Resource</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resource Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter resource name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all ease-in-out duration-300 hover:shadow-lg focus:ring-opacity-75"
                required
              />
            </div>
            {/* Title */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all ease-in-out duration-300 hover:shadow-lg focus:ring-opacity-75"
                required
              />
            </div>
            {/* Description */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Write a brief description"
                value={formData.description}
                onChange={handleTextareaChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all ease-in-out duration-300 hover:shadow-lg focus:ring-opacity-75"
                rows={5}
                required
              ></textarea>
            </div>
            {/* Category */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all ease-in-out duration-300 hover:shadow-lg focus:ring-opacity-75"
                required
              />
            </div>
            {/* PDF Upload */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload PDF
              </label>
              <input
                type="file"
                name="pdfFile"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
            </div>
            {/* Thumbnail Upload */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Thumbnail
              </label>
              <input
                type="file"
                name="thumbnailFile"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              {preview && (
                <div className="mt-4">
                  <Image
                    src={preview}
                    alt="Thumbnail Preview"
                    width={128} // Set appropriate width
                    height={128} // Set appropriate height
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            {/* Links */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                External Links
              </label>
              {formData.links.map((link, index) => (
                <div key={index} className="flex items-center mb-3">
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => handleLinkChange(e, index)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all ease-in-out duration-300 hover:shadow-lg focus:ring-opacity-75"
                    placeholder="Enter an external link"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddLink}
                className="w-full py-2 text-lg bg-[#37a39a] text-white font-medium rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg"
              >
                Add Link
              </button>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`w-full py-3 text-lg bg-[#37a39a] text-white font-medium rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-lg ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Resource"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateResource;
