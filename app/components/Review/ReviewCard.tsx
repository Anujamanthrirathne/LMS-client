import Ratings from '@/app/utils/Ratings';
import Image from 'next/image';
import React from 'react';

type Props = {
  item: any;
};

const ReviewCard = (props: Props) => {
  return (
    <div className="w-full h-max pb-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 shadow-lg transition-transform duration-200 hover:scale-105 ease-in-out">
      <div className="flex items-center space-x-4">
        <Image
          src={props.item.avatar}
          alt={props.item.name}
          width={50}
          height={50}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                {props.item.name}
              </h5>
              {/* Use flex here to ensure the profession is in the same line */}
              <h6 className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                {props.item.profession}
              </h6>
            </div>
            <Ratings rating={props.item.ratings} />
          </div>
        </div>
      </div>
      <p className="pt-3 text-sm text-gray-800 dark:text-gray-200 font-medium">
        {props.item.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
