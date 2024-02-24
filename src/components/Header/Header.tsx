import Image from "next/image";
import { useRouter } from "next/router";
import { signOut, SignOutParams } from "next-auth/react";
import React, { FC, useRef, useState } from "react";

import { useAppDispatch } from "@/hooks";

import { actions } from "@/redux/utils";

import { logoutAPI } from "@/services/authentication";

import Input from "../Input";

const Header: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const signOutOptions: SignOutParams = {
    callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
  };

  const handleProfile = () => {
    setIsDropdownOpen(false);
    router.push("/profile");
  };

  const handleHome = () => {
    setIsDropdownOpen(false);
    router.push("/");
  };

  const handleLogout = async () => {
    await logoutAPI();
    signOut(signOutOptions);
    dispatch(actions.callSetAccessToken(""));
    setIsDropdownOpen(false);
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <button className="btn btn-ghost text-xl" onClick={handleHome}>
          Travel Log
        </button>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <Input placeholder="Search" className="w-24 md:w-auto" />
        </div>
        <div className="dropdown-end dropdown" ref={dropdownRef}>
          <button
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost m-1"
            onClick={(event) => {
              event.stopPropagation();
              setIsDropdownOpen((prev) => !prev);
            }}
          >
            <div className="w-10 rounded-full">
              <Image
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="User Avatar"
                height={40}
                width={40}
                layout="fixed"
              />
            </div>
          </button>
          {isDropdownOpen && (
            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li onClick={handleProfile}>
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
