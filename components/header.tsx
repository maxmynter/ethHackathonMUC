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
  text: "Matchmake!",
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
    <div className="container mx-auto mt-2 h-20 flex flex-col justify-between">
      <div className="flex flex-row justify-center w-full h-12">
        <div>
          <Image src="./linkedup.svg" width={150} height={80} alt="LinkedUp" />
        </div>

        <div className="flex flex-row p-2 flex-1 text-center  justify-between mx-auto px-10">
          {buttonArray.map((buttonInfo) => (
            <HeaderButton
              key={buttonInfo.linkTo}
              buttonInfo={buttonInfo}
              size={String(size)}
            />
          ))}
        </div>

        <div className="text-right">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
