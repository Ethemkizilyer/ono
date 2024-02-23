import {
  UserGroupIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  ClipboardDocumentIcon,
  BoltIcon,
  Square2StackIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const links = [
    { name: "Dashboard", href: "/dashboard", icon: Squares2X2Icon },
    { name: "Campaign", href: "/campaign", icon: BoltIcon },
    { name: "Audience", href: "/audience", icon: UserGroupIcon },
    { name: "Flows", href: "/flows", icon: Square2StackIcon },
    { name: "Content", href: "/content", icon: ClipboardDocumentIcon },
    { name: "Settings", href: "/settings ", icon: Cog6ToothIcon },
  ];
  return (
    <div className="sidebar border-black-900 mb-3 justify-center border-r px-6 py-4 md:px-6 lg:flex hidden">
      <div className="mb-10">
        <Link
          className="md:h-22 flex h-20 items-center justify-center rounded-md p-4"
          to="/"
        >
          <div className="flex w-32 items-center justify-center text-7xl font-thin text-black md:w-40">
            O<span className="text-sm font-semibold text-[#00bbff]">x</span>N
            <span className="text-xs text-[#00bbff]">&#x25b6;</span>O
          </div>
        </Link>
        <input
          className="w-full py-1 rounded-sm"
          placeholder="Search..."
          type="text"
        />
      </div>
      <div className="ml-4 hidden text-xs text-[#c5c5c5] md:block">Menu</div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <ul className="sidebar-list">
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={clsx(
                  "rounded-mdp-3  flex h-[48px] grow items-center justify-center gap-5 text-xs md:flex-none md:justify-start md:p-2 md:px-3",
                  {
                    "text-[#8241ff]": location.pathname === link.href,
                    "text-[#c5c5c5]": location.pathname !== link.href,
                  }
                )}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </Link>
            );
          })}
        </ul>
        <div className="hidden h-auto w-full grow rounded-md  md:block"></div>
        <form>
          <button className="flex h-[48px] w-full items-center justify-center gap-3 rounded-md bg-[#8241ff] text-sm font-medium text-white md:flex-none md:justify-start md:p-2  md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">
              <div>
                <p>Logout</p>
              </div>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
