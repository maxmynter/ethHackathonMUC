import React from "react";
import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header/header";

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
          <p className="pt-3 leading-5 font-weight-600">{text}</p>
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
              colorOverlay="bg-white/50"
              colorUnderlay="bg-gradient-to-b from-fuchsia-300 to-pink-600"
              text="Crowd-source the best matches for each position and save days of work"
              footer="I want to fill a position"
            />
            <HeroBox
              linkTo="/linkmatch"
              colorOverlay="bg-white/50"
              colorUnderlay="bg-gradient-to-b from-blue-300 to-purple-600"
              emoji="🤑"
              text="Earn income on your terms by matching open positions with job seekers"
              footer="Make money now!"
            />
            <HeroBox
              linkTo="/applicant"
              emoji="🧑‍💻"
              colorOverlay="bg-white/50"
              colorUnderlay="bg-gradient-to-b from-green-300 to-green-600"
              text="Find your perfect position. Be matched by a human with skin in the game"
              footer="I want a job"
            />
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
