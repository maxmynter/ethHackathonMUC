import React from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header";

import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>LinkedUp</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="text-center">
        <Header />

        <div className="mt-[200px]">
          <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center mt-10">
            Match resumes with jobs for 🤑
          </h1>
          <h3 className="mt-6 text-lg text-slate-500 text-center max-w-3xl mx-auto ">
            Think you'd make a good matchmaker? Help companies save time by
            matching great candidates with their open positions. Pick well and
            win big!
          </h3>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
