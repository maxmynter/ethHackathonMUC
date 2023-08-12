import { HeaderButtonObject } from "../types/global";
import React from "react";
import HeaderButton from "./headerButton";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const toIndex: HeaderButtonObject = {
  text: "Home",
  linkTo: "/",
};
const toCompany: HeaderButtonObject = {
  text: "🔍 Search Candidates",
  linkTo: "/company",
};
const toMatchmaking: HeaderButtonObject = {
  text: "💫 Matchmake!",
  linkTo: "/linkmatch",
};
const toApply: HeaderButtonObject = {
  text: "😬 I want a new job!",
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
    <div className="pl-2 pr-2 mx-auto py-2 w-full  flex flex-col justify-between bg-stone-200">
      <div className="flex flex-row justify-center w-full h-12">
        <div>
          <Link href="/">
            <Image
              src="./linkedup.svg"
              width={150}
              height={80}
              alt="LinkedUp"
            />
          </Link>
        </div>

        <div className="flex ml-12 mr-12 flex-row border-l-2 border-r-2 border-gray-400 flex-1 text-center  justify-between mx-auto px-20">
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
