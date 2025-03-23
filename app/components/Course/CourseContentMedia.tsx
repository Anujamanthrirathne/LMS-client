import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import {
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
  useAddReplyInReviewMutation,
} from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";
import socketIO from "socket.io-client";
const ENDPOINT =
  process.env.NEXT_PUBLIC_SOCKET_SERVER_URI ||
  "https://e-learning-server-three.vercel.app";
const isSecure = ENDPOINT.startsWith("https");
const socketId = socketIO(ENDPOINT, {
  transports: ["websocket"],
  secure: isSecure,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, SetReview] = useState("");
  const [rating, setRating] = useState(1);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation({});

  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );

  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();
  const course = courseData?.course;
  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question cant't be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("question added successfully!");
      socketId.emit("Notification", {
        title: `New Question Received`,
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully!");
      if (user.role !== "admin") {
        socketId.emit("Notification", {
          title: `New Reply Received`,
          message: `You have a new question in Reply ${data[activeVideo].title}`,
          userId: user._id,
        });
      }
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error.data as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (reviewSuccess) {
      SetReview("");
      setRating(1);
      courseRefetch();
      toast.success("Review added successfully");
      socketId.emit("Notification", {
        title: `New Question Received`,
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }

    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (replySuccess) {
      setReply("");
      courseRefetch();
      toast.success("Reply added successfully");
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
  ]);

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };

  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply can't be empty");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId });
      }
    }
  };
  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer text-black dark:text-white ${
              activeBar === index && "!text-red-500"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      <div className="w-full">
        {activeBar === 0 && (
          <div className="text-[18px] whitespace-pre-line mb-3 text-black dark:text-white overflow-y-auto max-h-[300px] p-2">
            {data[activeVideo]?.description}
          </div>
        )}
        {activeBar === 1 && (
          <div className="w-full max-h-[400px] overflow-y-auto p-4">
            {data[activeVideo]?.links.map((item: any, index: number) => (
              <div key={index} className="mb-5">
                {item.title && (
                  <h2 className="800px:text-[20px] inline-block font-semibold text-black dark:text-white">
                    {item.title}:
                  </h2>
                )}
                <a
                  className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2 hover:underline"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        )}
        {activeBar === 2 && (
          <>
            <div className="flex w-full">
              <Image
                src={
                  user.avatar
                    ? user.avatar.url
                    : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                }
                width={50}
                height={50}
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <textarea
                name=""
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                id=""
                cols={40}
                rows={5}
                placeholder="Write your question..."
                className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins dark:text-white text-black"
              ></textarea>
            </div>
            <div className="w-full flex justify-end">
              <div
                className={`${
                  styles.button
                } !w-[100px] !h-[30px] text-[14px] mt-5 flex items-center justify-center ${
                  questionCreationLoading && "cursor-not-allowed"
                }`}
                onClick={questionCreationLoading ? () => {} : handleQuestion}
              >
                Submit
              </div>
            </div>

            <br />
            <br />
            {/* Adding a parent container for comment replies */}
            <div className="w-full h-[1px] bg-[#ffffff3b] my-5" />

            {/* Wrapping CommentReply in a container with overflow handling */}
            <div className="w-full max-h-[300px] overflow-y-auto">
              <CommentReply
                data={data}
                activeVideo={activeVideo}
                answer={answer}
                setAnswer={setAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
                user={user}
                setQuestionId={setQuestionId}
                answerCreationLoading={answerCreationLoading}
              />
            </div>
          </>
        )}

        {activeBar === 3 && (
          <div className="w-full">
            {!isReviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    src={
                      user.avatar
                        ? user.avatar.url
                        : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => SetReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Write your comment..."
                      className="outline-none bg-transparent 800px:ml-3 border border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins dark:text-white text-black"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${
                      styles.button
                    } !w-[100px] !h-[30px] text-[14px] mt-5 flex items-center justify-center ${
                      reviewCreationLoading && "cursor-no-drop"
                    }`}
                    onClick={
                      reviewCreationLoading ? () => {} : handleReviewSubmit
                    }
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]" />
            <div className="w-full max-h-[400px] overflow-y-auto">
              {course?.reviews && course.reviews.length > 0 ? (
                // Sort reviews by createdAt in descending order before mapping
                [...course.reviews]
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((item: any, index: number) => (
                    <div key={index} className="w-full my-5">
                      <div className="w-full flex">
                        <div>
                          <Image
                            src={
                              item?.user.avatar
                                ? item.user.avatar.url
                                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>
                        <div className="ml-2">
                          <h1 className="text-[18px] dark:text-white text-black">
                            {item?.user.name}
                          </h1>
                          <Ratings rating={item.rating} />
                          <p className="dark:text-white text-black">
                            {item.comment}
                          </p>
                          <small className="dark:text-[#ffffff83] text-black">
                            {format(item.createdAt)} •
                          </small>
                        </div>
                      </div>
                      {user.role === "admin" &&
                        item.commentReplies.length === 0 && (
                          <span
                            className={`${styles.label} !ml-10 cursor-pointer`}
                            onClick={() => {
                              setIsReviewReply(true); // Show the reply input
                              setReviewId(item._id); // Set the current review ID to reply to
                            }}
                          >
                            Add Reply
                          </span>
                        )}
                      {isReviewReply && reviewId === item._id && (
                        <>
                          <div className="w-full flex relative">
                            <input
                              type="text"
                              placeholder="Enter your reply..."
                              value={reply}
                              onChange={(e: any) => setReply(e.target.value)}
                              className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b dark:border-[#fff] border-[#000] p-[5px] w-[95%] text-black dark:text-white"
                            />
                            <button
                              type="submit"
                              className="absolute right-0 bottom-1 text-black dark:text-white"
                              onClick={handleReviewReplySubmit}
                            >
                              Submit
                            </button>
                          </div>
                        </>
                      )}
                      {item.commentReplies.map((i: any, index: number) => (
                        <div
                          className="w-full flex 800px:ml-16 my-5"
                          key={index}
                        >
                          <div className="w-[50px] h-[50px]">
                            <Image
                              src={
                                i.user.avatar
                                  ? i.user.avatar.url
                                  : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                              }
                              width={50}
                              height={50}
                              alt=""
                              className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                          </div>
                          <div className="pl-2">
                            <div className="flex items-center">
                              <h5 className="text-[20px] dark:text-white text-black">
                                {i.user.name}
                              </h5>{" "}
                              {i.user.role === "admin" && (
                                <VscVerifiedFilled className="text-[#0b0b9ce5] ml-2 text-[20px]" />
                              )}
                            </div>
                            <p className="dark:text-white text-black">
                              {i.comment}
                            </p>
                            <small className="dark:text-[#ffffff83] text-black">
                              {format(i.createdAt)} •
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
              ) : (
                <p className="text-black dark:text-white">
                  No reviews available.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  // Ensure questions are sorted in descending order of creation time
  const sortedQuestions = [...data[activeVideo].questions].sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="w-full my-3">
      {sortedQuestions.map((item: any, index: any) => (
        <CommentItem
          key={index}
          data={data}
          activeVideo={activeVideo}
          item={item}
          answer={answer}
          setAnswer={setAnswer}
          answerCreationLoading={answerCreationLoading}
          setQuestionId={setQuestionId}
          handleAnswerSubmit={handleAnswerSubmit}
        />
      ))}
    </div>
  );
};

const CommentItem = ({
  data,
  setQuestionId,
  questionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-1 mb-4">
        <div className="flex mb-0">
          <div className="w-[50px] h-[50px]">
            <Image
              src={
                item.user.avatar
                  ? item.user.avatar.url
                  : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
              }
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>
          <div className="pl-2">
            <h5 className="text-[20px] dark:text-white text-black">
              {item?.user.name}
            </h5>
            <p className="dark:text-white text-black">{item?.question} </p>
            <small className="text-[#ffffff83]">
              {!item.createdAt ? "" : format(item?.createdAt)}•
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-black dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>

          <span className="pl-1 mt-[-4px] cursor-pointer  text-black dark:text-[#ffffff83]">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((item: any, index: number) => (
              <div
                className="w-full flex 800px:ml-16 my-5  text-black dark:text-[#ffffff83] "
                key={index}
              >
                <div>
                  <Image
                    src={
                      item.user.avatar
                        ? item.user.avatar.url
                        : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{item.user.name}</h5>{" "}
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled className="text-[#0b0b9ce5] ml-2 text-[20px]" />
                    )}
                  </div>
                  <p>{item.answer}</p>
                  <small className="text-[#ffffff83]">
                    {format(item.createdAt)} •
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:border-[#fff] p-[5px] w-[95%] dark:text-white text-black ${
                    answer === "" ||
                    (answerCreationLoading && "cursor-not-allowed")
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-2 bottom-1 dark:text-white text-black"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerCreationLoading}
                >
                  Submit
                </button>
              </div>
              <br />
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
