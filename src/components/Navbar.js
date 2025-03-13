import { UserAuth } from "@/src/utils/auth";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown, MdOutlineNotifications } from "react-icons/md";

const Navbar = () => {
  const { user, signOut } = UserAuth();

  const [display, setDisplay] = useState(false);

  return (
    <header className="p-3 items-center px-16 flex justify-between bg-gray-50 dark:bg-gray-800">
      <h1 className="text-xl font-semibold">VoiceSync</h1>

      <div className="flex gap-3 items-center relative ">
        <div className="w-10 h-10 rounded-full flex items-center justify-center active:bg-purple-100 px-2 py-1 cursor-pointer">
          <MdOutlineNotifications className="text-2xl text-gray-800" />
        </div>
        <button
          onClick={() => setDisplay(!display)}
          className="rounded-full flex items-center justify-center  h-10 bg-purple-100 px-2 py-1 "
        >
          <img
            src="/user.png"
            alt="user.png"
            className="h-8 w-8 rounded-full"
          />
          <span className="w-20 text-ellipsis font-medium text-gray-800 mb-0">
            {user?.user_metadata?.name
              ? user?.user_metadata?.name?.split(" ")[0]
              : "User"}
          </span>
          <MdKeyboardArrowDown />
        </button>
        <div
          className={`${
            display ? "block" : "hidden"
          }  dropdown w-32 px-3 py-2 absolute right-0 top-12 bg-white shadow-lg rounded-md`}
        >
          <button className=" px-4 w-full text-white bg-blue-500 mb-3 py-1 rounded-md">
            Profile
          </button>
          <button
            onClick={signOut}
            className=" px-4 w-full text-white bg-red-600 py-1 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
