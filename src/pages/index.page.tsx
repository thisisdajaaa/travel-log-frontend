import type { NextPage } from "next";

import { withAuth } from "@/utils/withAuth";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <section>
      <div className=" bg-slate-100">
        <div className="w-full bg-slate-100">
          <div className="mx-auto my-1 max-w-4xl overflow-hidden rounded-lg bg-white p-4 shadow-xl">
            <div className="border-box border-line card border bg-base-100">
              <figure>
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
              </figure>
              <div className="card ml-3 justify-center">
                <div className="absolute left-0 top-5 mb-2 flex-1">
                  <img
                    src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    className="h-8 w-8 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-md card-title mt-3 ml-10">
                    Titlesss ss- Travel to USA
                  </div>
                  <div className="mb-2 ml-10 text-sm">15h</div>
                </div>
                <div className="m-2">
                  The BAAA celebrated International Women’s Day organized by
                  Women in Leadership Network (WiLN). WiLN in Bhutan is a
                  practice group formed by Australia Alumni Ass… See more
                </div>
              </div>
            </div>

            <div className="m-3 flex justify-center">
              <div className="flex w-1/3 flex-col items-center justify-center">
               <Link href={''}>Like </Link>
              </div>
              <div className="flex w-1/3 flex-col items-center justify-center">
                <Link href={''}>Comment </Link>
              </div>
              <div className="flex w-1/3 flex-col items-center justify-center">
              <Link href={''}>Share </Link>
                
              </div>
            </div>
            <div className="border-b border-gray-200"></div>
          </div>
        </div>

        <div className="m-5"></div>

        <div className="w-full bg-slate-100">
          <div className="mx-auto my-1 max-w-4xl overflow-hidden rounded-lg bg-white p-4 shadow-xl">
            <div className="border-box border-line card border bg-base-100">
              <figure>
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
              </figure>
              <div className="card ml-3 justify-center">
                <div className="absolute left-0 top-5 mb-2 flex-1">
                  <img
                    src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    className="h-8 w-8 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-md card-title mt-3 ml-10">
                    Titlesss ss- Travel to USA
                  </div>
                  <div className="mb-2 ml-10 text-sm">15h</div>
                </div>
                <div className="m-2">
                  Thwwe BAAA celebrated International Women’s Day organized by
                  Women in Leadership Network (WiLN). WiLN in Bhutan is a
                  practice group formed by Australia Alumni Ass… See more
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-center">
              <div className="flex w-1/3 flex-col items-center justify-center">
                Like
              </div>
              <div className="flex w-1/3 flex-col items-center justify-center">
                Comment
              </div>
              <div className="flex w-1/3 flex-col items-center justify-center">
                Share
              </div>
            </div>
            <div className="border-b border-gray-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withAuth(Home);
