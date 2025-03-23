import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post("https://e-learning-server-12s9.vercel.app/api/v1/getVdoCipherOTP", { videoId: videoUrl })
      .then((res) => {
        console.log('API Response:', res.data);
        setVideoData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching video OTP:", err);
        alert("Failed to load video. Please try again later.");
      });
  }, [videoUrl]);

  return (
    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
      {videoData.otp && videoData.playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=xn0GSR0BDIXkGeYU`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allowFullScreen
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
