import { HeaderButtonObject } from "../types/global";
import React from "react";
import HeaderButton from "./headerButton";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

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
    <div className="flex justify-center mt-10">
      <Image
        src="./linkedup.svg"
        width={200}
        height={300}
        alt="LinkedUp"
        className="margin-0"
      />

      <div className="flex flex-row p-1 justify-between">
        {buttonArray.map((buttonInfo) => (
          <HeaderButton
            key={buttonInfo.linkTo}
            buttonInfo={buttonInfo}
            size={String(size)}
          />
        ))}
      </div>

      <ConnectButton />
    </div>
  );
};

export default Header;
