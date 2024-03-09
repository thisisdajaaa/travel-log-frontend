import Link from "next/link";
import React, { FC } from "react";

import { AUTHENTICATED_PAGE_URL } from "@/constants/pageUrl";

const Sidebar: FC = () => {
  return (
    <div className="drawer-side">
      <ul className="menu min-h-full w-80 bg-base-200 p-4">
        <li>
          <Link href={AUTHENTICATED_PAGE_URL.TRAVEL_LOG}>Travel Log</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
