import Image from "next/image";
import React, { FC } from "react";

import Input from "../Input";
import { useRouter } from "next/router";
import { SignOutParams, signOut } from "next-auth/react";
import { logoutAPI } from "@/services/authentication";
import { useAppDispatch } from "@/hooks";
import { actions } from "@/redux/utils";

const Header: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const signOutOptions: SignOutParams = {
    callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
  };

  const handleProfile = () => router.push("/profile");

  const handleLogout = async () => {
    await logoutAPI();
    signOut(signOutOptions);
    dispatch(actions.callSetAccessToken(""));
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Travel Log</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <Input placeholder="Search" className="w-24 md:w-auto" />
        </div>
        <div className="dropdown-end dropdown">
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                height={40}
                width={40}
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li onClick={handleProfile}>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={handleLogout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
