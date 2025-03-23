import { styles } from "../../../../app/styles/style";
import React, { FC } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {

  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisiteChange = (index: number, value: string) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleNextButton = () => {
    // Check if the last item of both benefits and prerequisites has a title
    if (
      benefits[benefits.length - 1]?.title.trim() !== "" &&
      prerequisites[prerequisites.length - 1]?.title.trim() !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill in the fields before proceeding to the next step!");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="benefits">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit, index) => (
          <input
            type="text"
            key={index}
            name="Benefit"
            placeholder="You will be able to build a full stack LMS platform..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          className="dark:text-white text-black"
          onClick={handleAddBenefit}
        />
      </div>

      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="prerequisites">
          What are the prerequisites to start this course?
        </label>
        <br />
        {prerequisites.map((prerequisite, index) => (
          <input
            type="text"
            key={index}
            name="prerequisites"
            placeholder="You need basic knowledge of MERN stack"
            required
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          className="dark:text-white text-black"
          onClick={handleAddPrerequisite}
        />
      </div>

      <div className="w-full flex items-center justify-between mt-8">
        {/* Prev button */}
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer"
          onClick={prevButton}
        >
          Prev
        </div>

        {/* Next button */}
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer"
          onClick={handleNextButton}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
