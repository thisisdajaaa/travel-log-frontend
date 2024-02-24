import { NextPage } from "next";
import React from "react";

import { withAuth } from "@/utils/withAuth";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";

const Profile: NextPage = () => {
  return (
    <>
      <div className="fit-content-element mx-[2.188rem] min-h-[49.875rem] overflow-y-auto rounded-lg p-8">
        <div className="relative">
          <Image
            alt="cover-photo"
            src="/images/mock-cover.jpg"
            className="rounded-md object-cover"
            height={462}
            width={1250}
          />

          <div className="absolute -bottom-24 left-12 h-[168px] w-[168px]  rounded-full border-4">
            <Image
              alt="cover-photo"
              src="/images/mock-avatar.jpg"
              className="rounded-full object-cover transition duration-300 hover:brightness-75"
              height={168}
              width={168}
            />

            <div className="absolute bottom-2 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-slate-400">
              <FaCamera className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Profile);
