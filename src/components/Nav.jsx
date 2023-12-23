import { headerLogo } from "../assets/images";
import { hamburger } from "../assets/icons";
import { navLinks } from "../constants";
import { useState } from "react";
const Nav = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <header className="padding-x py-8 absolute z-20 w-full">
      <nav className="flex justify-between items-center container">
        <a href="/">
          <img src={headerLogo} alt="logo" width={130} height={29} />
        </a>
        <ul className="flex flex-1 items-center gap-16 justify-center max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-montserrat leading-normal text-lg text-slate-gray"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="font-montserrat leading-normal text-lg  font-extrabold">
            <a href="/">login/signup</a>
          </li>
        </ul>
        <div className="hidden max-lg:block cursor-pointer">
          <img
            src={hamburger}
            alt="logo"
            width={25}
            height={25}
            onClick={() => setToggle(!toggle)}
          />
        </div>

        {toggle ? (
          <div className="bg-gray-300 flex flex-col gap-5 items-center justify-center list-none p-6 rounded-lg absolute top-20 right-24">
            {navLinks.map((item) => (
              <li key={item.label} onClick={() => setToggle(!toggle)}>
                <a
                  href={item.href}
                  className="font-montserrat leading-normal text-lg text-slate-gray hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="font-montserrat leading-normal text-lg  font-extrabold">
              <a href="/">login/signup</a>
            </li>
          </div>
        ) : (
          ""
        )}
      </nav>
    </header>
  );
};

export default Nav;
