import { HeaderButtonObject } from "../../types/global";
import React from "react";
import HeaderButton from "./headerButton";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

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

const allButtons = [toCompany, toMatchmaking, toApply];

const Header = ({
  buttonArray = allButtons,
  size = 4,
}: {
  buttonArray?: HeaderButtonObject[];
  size?: number;
}) => {
  return (
    <div className="container mx-auto">
      <div className="px-0  py-5 mx-auto w-full flex flex-col justify-between">
        <div className="flex flex-row justify-center w-full ">
          <div>
            <Link href="/">
              <Image
                src="./linkedup.svg"
                width={130}
                height={80}
                alt="LinkedUp"
              />
            </Link>
          </div>

          <div className="flex mh-12 flex-row flex-1 text-center mx-auto px-20">
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
    </div>
  );
};

export default Header;
