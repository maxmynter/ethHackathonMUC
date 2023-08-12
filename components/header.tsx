import Link from "next/link";
import { HeaderButtonObject } from "../types/global";
import React from "react";
import { usePathname } from "next/navigation";

const toIndex: HeaderButtonObject = {
  text: "Home",
  linkTo: "/",
};
const toCompany: HeaderButtonObject = {
  text: "Search Candidates",
  linkTo: "/company",
};
const toMatchmaking: HeaderButtonObject = {
  text: "Match",
  linkTo: "/linkmatch",
};
const toApply: HeaderButtonObject = {
  text: "Apply for Jobs",
  linkTo: "/applicant",
};

const allButtons = [toIndex, toCompany, toMatchmaking, toApply];

const HeaderButton = ({ buttonInfo }: { buttonInfo: HeaderButtonObject }) => {
  const path = usePathname();
  return (
    <div
      className={`border-4 border-sky-500 m-4 rounded-lg ${
        path === buttonInfo.linkTo ? "text-white bg-sky-500" : ""
      }`}
    >
      <Link href={buttonInfo.linkTo}>
        <p className="font-bold p-2">{buttonInfo.text}</p>
      </Link>
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row p-1 justify-between">
        {allButtons.map((buttonInfo) => (
          <HeaderButton key={buttonInfo.linkTo} buttonInfo={buttonInfo} />
        ))}
      </div>
    </div>
  );
};

export default Header;
