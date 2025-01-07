import React, { useState } from "react";
import { ChevronFirst, ChevronLast, CirclePlus } from "lucide-react";

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-screen">
      <nav
        className={`h-full flex flex-col  border-r shadow-sm ${expanded ? "bg-[#171717]" : "border-none bg-[#212121]"
          }`}
      >
        {/* Logo Section */}
        <div className="p-4 pb-2 flex justify-between items-center">
          {/* <img
            src={Logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="Logo"
          /> */}

          <div title="New Chat" >
            <CirclePlus className={`bg-gray-300 rounded-lg hover:bg-gray-100 ${expanded ? "block" : "hidden"} hover:cursor-pointer`} />
          </div>
          

          <div title = {`${expanded ? "Close Sidebar" : "Open Sidebar"}`}>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-300"
            aria-label="Toggle Sidebar"
            aria-expanded={expanded}
            >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
          </div>
        </div>

        {/* Navigation List */}
        <ul className="flex-1 px-3">{children}</ul>

        {/* User Profile Section */}
        <div
          className={`flex p-3 items-center ${expanded ? "border-t" : "border-none"
            }`}
        >
          <div
            className={`flex justify-between items-center overflow-hidden transition-all duration-200 ${expanded ? "w-52 ml-3" : "w-0"
              }`}
          >
            <div className="leading-4 text-white">
              <h4 className="font-semibold ">Zesty Gorilla</h4>
              <span className="text-xs">
                ZestyGorilla@gmail.com
              </span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
