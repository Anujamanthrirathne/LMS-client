'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import { ThemeSwitcher } from '../utils/ThemeSwitcher';
import { IoMdNotificationsOutline } from 'react-icons/io';
import socketIO from 'socket.io-client';
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationsStatusMutation,
} from '@/redux/features/notifications/notificationApi';
import { format } from 'timeago.js';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || 'https://e-learning-server-three.vercel.app';
const isSecure = ENDPOINT.startsWith('https');
const socket = socketIO(ENDPOINT, {
  transports: ['websocket'],
  secure: isSecure,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

type Props = {
  sidebarCollapsed?: boolean;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardHeader: FC<Props> = ({
  sidebarCollapsed = false,
  open,
  setOpen,
}) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus] = useUpdateNotificationsStatusMutation();
  const [notification, setNotification] = useState<any>([]);
  const [isMuted, setIsMuted] = useState(false); // Sound toggle state
  const [previousNotificationCount, setPreviousNotificationCount] = useState<number>(0);

  // Use ref for audio object
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(
      'https://res.cloudinary.com/dwviccr1k/video/upload/v1733259503/Default_iPhone_Notification_Sound__Apple_Sound__-_Sound_Effect_for_Editing___YouConvert.net__duq5ei.mp3'
    );
    audioRef.current.load();
  }, []);

  const playNotificationSound = () => {
    if (audioRef.current && !isMuted) {
      audioRef.current
        .play()
        .then(() => console.log('Audio played successfully'))
        .catch((error) => console.error('Error playing audio:', error));
    }
  };

  useEffect(() => {
    if (data) {
      setNotification(
        data.notifications.filter((item: any) => item.status === 'unread')
      );
    }
  }, [data]);

  // Detect changes in the notification count
  useEffect(() => {
    if (notification.length > previousNotificationCount) {
      setTimeout(() => {
        playNotificationSound();
      }, 500); // Delay sound by 500ms
    }
    setPreviousNotificationCount(notification.length); // Update the count
  }, [notification.length]);

  useEffect(() => {
    const handleNotification = (notificationData: any) => {
      console.log('Received notification:', notificationData);

      setNotification((prevNotifications) => [
        notificationData,
        ...prevNotifications,
      ]);
    };

    socket.on('newNotification', handleNotification);

    return () => {
      socket.off('newNotification', handleNotification);
    };
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
    refetch();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div
    className={`w-full flex items-center justify-end px-4 py-3 sm:p-6 fixed top-0 ${sidebarCollapsed ? 'right-[80px]' : 'right-0'} z-[100] bg-transparent transition-all`}
  >
    <ThemeSwitcher />
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="ml-4 sm:ml-6 dark:text-white text-black"
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
    
    {/* Notification Bell Icon */}
    <div
      className="relative cursor-pointer ml-4 sm:ml-4 md:ml-6 lg:ml-6" // Adjusted margins for better positioning
      onClick={() => setOpen && setOpen(!open)}
    >
      <IoMdNotificationsOutline className="text-xl sm:text-2xl dark:text-white text-black" />
      <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-[#3ccba0] rounded-full w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] text-[10px] sm:text-[12px] flex items-center justify-center text-white">
        {notification.length}
      </span>
    </div>
  
    {/* Notification Dropdown */}
    {open && (
      <div
        className={`absolute top-[60px] sm:top-[70px] ${sidebarCollapsed ? 'right-[10px]' : 'right-[20px]'} max-w-[90%] sm:w-[350px] h-[60vh] sm:h-[50vh] dark:bg-[#111C43] bg-white shadow-xl rounded-lg overflow-hidden z-[1050] transition-all`}
      >
        <h5 className="text-center text-[16px] sm:text-[20px] font-Poppins dark:text-white text-black py-3">
          Notifications
        </h5>
        <div className="h-full overflow-y-auto p-3 space-y-4">
          {notification.map((item, index) => (
            <div
              key={index}
              className="dark:bg-[#2d3a4ea1] bg-[#00000013] p-3 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-[14px] sm:text-[16px] dark:text-white text-black font-medium">
                  {item.title}
                </p>
                <p
                  className="text-[12px] sm:text-[14px] dark:text-white text-black cursor-pointer"
                  onClick={() => handleNotificationStatusChange(item._id)}
                >
                  Mark as read
                </p>
              </div>
              <p className="text-[12px] sm:text-[14px] dark:text-white text-black mt-2 break-words whitespace-normal">
                {item.message}
              </p>
              <p className="text-[10px] sm:text-[12px] dark:text-white text-black mt-1">
                {format(item.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  
  
  );
};

export default DashboardHeader;
