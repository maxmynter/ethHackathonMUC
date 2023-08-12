import Link from "next/link";
import { HeaderButtonObject } from "../types/global";
import React from "react";

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
  return <Link href={buttonInfo.linkTo}>{buttonInfo.text}</Link>;
};

const Header = () => {
  return (
    <div className="p-6">
      {allButtons.map((buttonInfo) => (
        <HeaderButton key={buttonInfo.linkTo} buttonInfo={buttonInfo} />
      ))}
    </div>
  );
};

export default Header;
