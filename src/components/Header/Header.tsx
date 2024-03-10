import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut, SignOutParams } from "next-auth/react";
import React, { FC, useCallback, useRef, useState } from "react";

import {
  useAppDispatch,
  useFetchProfile,
  useOnClickOutsideElement,
} from "@/hooks";

import { AUTHENTICATED_PAGE_URL } from "@/constants/pageUrl";

import { actions } from "@/redux/utils";

import { logoutAPI } from "@/services/authentication";

import Input from "../Input";

const Header: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: profile } = useFetchProfile();

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClickOutside = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  useOnClickOutsideElement(dropdownRef, handleClickOutside);

  const signOutOptions: SignOutParams = {
    callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
  };

  const handleProfile = () => {
    setIsDropdownOpen(false);
    router.push(AUTHENTICATED_PAGE_URL.PROFILE);
  };

  const handleHome = () => {
    setIsDropdownOpen(false);
    router.push(AUTHENTICATED_PAGE_URL.HOME);
  };

  const handleLogout = async () => {
    await logoutAPI();
    signOut(signOutOptions);
    dispatch(actions.callSetAccessToken(""));
    setIsDropdownOpen(false);
  };

  return (
    <div className="navbar z-30 bg-base-100 shadow-md">
      <div className="flex-1 items-center">
        <button className="btn btn-ghost text-xl" onClick={handleHome}>
          <Image
            src="/svg/TravelLogo.svg"
            alt="travel-logo-svg"
            height={48}
            width={48}
          />
        </button>
      </div>
      <div className="flex gap-2">
        <div className="form-control">
          <Input placeholder="Search" inputClassname="w-24 md:w-auto" />
        </div>
        <div
          ref={dropdownRef}
          className={clsx(
            "dropdown-end dropdown",
            isDropdownOpen ? "dropdown-open" : ""
          )}
        >
          <label tabIndex={0}>
            <button
              type="button"
              className="avatar btn btn-circle btn-ghost m-1"
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                setIsDropdownOpen((prev) => !prev);
              }}
            >
              <div className="w-10 rounded-full">
                <Image
                  src={profile?.data?.profilePhoto || "/images/mock-avatar.jpg"}
                  alt="User Avatar"
                  height={40}
                  width={40}
                  layout="fixed"
                />
              </div>
            </button>
          </label>

          {isDropdownOpen && (
            <ul
              className="menu dropdown-content z-50 w-52 rounded-box bg-base-100 p-2 shadow"
              tabIndex={0}
              role="menu"
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
