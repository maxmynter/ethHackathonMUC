import { HeaderButtonObject } from "../types/global";
import React from "react";
import HeaderButton from "./headerButton";

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

const Header = ({
  buttonArray = allButtons,
  size = 4,
}: {
  buttonArray?: HeaderButtonObject[];
  size?: number;
}) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row p-1 justify-between">
        {buttonArray.map((buttonInfo) => (
          <HeaderButton
            key={buttonInfo.linkTo}
            buttonInfo={buttonInfo}
            size={String(size)}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
