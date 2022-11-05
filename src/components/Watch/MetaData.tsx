import { DetailType } from '@/types';
import Link from 'next/link';
import React from 'react';
import Skeleton from '../Shared/Skeleton';

interface MetaDataProps {
  data?: DetailType;
  episodeIndex: number | undefined;
}

const MetaData: React.FunctionComponent<MetaDataProps> = ({ data, episodeIndex }) => {
  return (
    <>
      {
        data ? (
          <div className="flex flex-col gap-[10px]">
            <h1 className="text-3xl mt-5">{data?.name}</h1>

            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <img className="w-4 h-4" src={'/static/images/star.png'} alt="" />
                <p>{data?.score?.toFixed(1)}</p>
              </div>
              <div className="flex items-center gap-1">
                <img className="w-4 h-4" src="/static/images/calendar.png" alt="" />
                <p>{data?.year}</p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              {data.tagList.map((tag) => (
                <Link
                  href={`/category/${tag.id}`}
                  key={tag.id}
                >
                  <a className="bg-dark-lighten rounded-full px-3 py-1 hover:brightness-125 transition duration-300">
                    {tag.name}
                  </a>
                </Link>
              ))}
            </div>

            <p>{data.introduction}</p>

            {data.episodeVo.length > 1 && (
              <>
                <h1 className="text-xl my-3">Episodes</h1>
                <div className="flex gap-3 overflow-auto">
                  {data.episodeVo.map((_, index) => (
                    <Link
                      href={`/tv/${data.id}?episode=${index + 1}`}
                      key={index}
                    >
                      <a className={`px-4 py-[8px] bg-dark-lighten rounded hover:brightness-125 transition duration-300 ${index === episodeIndex ? "!bg-primary text-white" : ""
                        }`}>
                        {index + 1}
                      </a>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <Skeleton className="w-[70%] h-8 mt-6" />
            <Skeleton className="w-[60%] h-8 mt-6" />
          </>
        )
      }
    </>
  );
};

export default MetaData;