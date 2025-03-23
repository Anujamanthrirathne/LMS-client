import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { styles } from "../../../../app/styles/style";
import React, { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[90%] sm:w-[80%] lg:w-[70%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN stack LMS platform with Next.js 13"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            cols={30}
            rows={8}
            placeholder="Write something amazing..."
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex flex-wrap sm:flex-nowrap gap-4">
          {/* Course Price */}
          <div className="w-full sm:w-[45%]">
            <label className={`${styles.label}`}>Course Price</label>
            <input
              type="number"
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="29"
              className={`${styles.input}`}
            />
          </div>

          {/* Estimated Price */}
          <div className="w-full sm:w-[50%]">
            <label className={`${styles.label}`}>
              Estimated Price (optional)
            </label>
            <input
              type="number"
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({
                  ...courseInfo,
                  estimatedPrice: e.target.value,
                })
              }
              id="estimated-price"
              placeholder="79"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full flex flex-wrap sm:flex-nowrap gap-4">
          {/* Course Level */}
          <div className="w-full sm:w-[45%]">
            <label className={`${styles.label}`} htmlFor="tags">
              Course Tags
            </label>
            <input
              type="text"
              required
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="MERN, Next.js 13, Socket.io, Tailwind CSS, LMS"
              className={`${styles.input}`}
            />
          </div>
          {/* Demo URL */}
          <div className="w-full sm:w-[50%]">
  <label className={`${styles.label}`}>Course Categories</label>
  <select
    className={`${styles.input} bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 appearance-none p-2`}
    value={courseInfo.categories || ""} // Bind the value to categories field
    onChange={(e: any) => {
      setCourseInfo({ ...courseInfo, categories: e.target.value }); // Update state with selected category
    }}
  >
    <option value="" disabled>
      Select Category
    </option>
    {categories && categories.length > 0 ? (
      categories.map((item: any) => (
        <option value={item.title} key={item._id}>
          {item.title}
        </option>
      ))
    ) : (
      <option value="">No categories available</option> // Handle case when there are no categories
    )}
  </select>
</div>

        </div>

        <br />
        <div className="w-full flex flex-wrap sm:flex-nowrap gap-4">
          {/* Course Level */}
          <div className="w-full sm:w-[45%]">
            <label className={`${styles.label}`}>Course Level</label>
            <input
              type="text"
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input}`}
            />
          </div>
          {/* Demo URL */}
          <div className="w-full sm:w-[50%]">
            <label className={`${styles.label}`}>Demo URL</label>
            <input
              type="text"
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="Demo URL"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[250px] max-h-[400px] dark:border-white border-[#00000026] p-3 border flex items-center justify-center overflow-hidden ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt="Thumbnail"
                className="w-full h-full object-contain" // Ensure the image maintains its aspect ratio
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>

        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full sm:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
