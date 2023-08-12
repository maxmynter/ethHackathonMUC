import React from "react";
import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header";

const HeroBox = ({
  linkTo = "/applicant",
  text,
  footer,
  colorOverlay,
  colorUnderlay,
  emoji,
}: {
  linkTo: string;
  text: string;
  footer: string;
  colorOverlay: string;
  colorUnderlay: string;
  emoji: string;
}) => {
  return (
    <Link href={linkTo}>
      <div
        className={`w-72 h-72 ${colorUnderlay} rounded-xl drop-shadow-xl p-8 flex flex-col justify-center items-center m-10 hover:scale-105 transform transition-transform`}
      >
        <div
          className={`w-64 h-64 p-4 flex justify-center rounded-xl items-center ${colorOverlay} flex-col`}
        >
          <p className="text-6xl">{emoji}</p>
          <p className="text-base pt-2">{text}</p>
        </div>
        <div className="flex flex-col justify-end align-bottom mt-7">
          <h2 className="text-xl font-semibold mb-2 text-white">{footer}</h2>
        </div>
      </div>
    </Link>
  );
};

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen  w-full">
      <Head>
        <title>LinkedUp</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className="w-screen">
        <Header />
        <div className="h-full flex flex-col align-middle pt-11">
          <div className="flex flex-row justify-center items-center p-7">
            <HeroBox
              linkTo="/company"
              emoji="💁"
              colorOverlay="bg-green-300"
              colorUnderlay="bg-green-700"
              text="Crowdsource the Pre-Selection of High-Potential Job Seekers and Save Days of Work."
              footer="I want to fill a position"
            />
            <HeroBox
              linkTo="/linkmatch"
              colorOverlay="bg-blue-300"
              colorUnderlay="bg-blue-700"
              emoji="🤑"
              text="Earn flexible Income on your Terms by Successfully Matching Open Positions with Job Seekers"
              footer="Make Money Now"
            />
            <HeroBox
              linkTo="/applicant"
              emoji="🧑‍💻"
              colorOverlay="bg-red-300"
              colorUnderlay="bg-red-700"
              text="Your Perfect Position. In Autopilot. Be matched by a Human - with Skin in the Game"
              footer="I want a Job"
            />
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
