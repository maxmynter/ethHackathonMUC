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

        <div className="mt-[200px] container mx-auto ">
          <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center mt-10">
            Match resumes with jobs for 🤑
          </h1>
          <h3 className="mt-6 text-lg text-slate-500 text-center max-w-3xl mx-auto ">
            Think you'd make a good matchmaker? Help companies save time by
            matching great candidates with their open positions. Pick well and
            win big!
          </h3>
        </div>

        <div className="mt-[200px] bg-slate-800">
          <div className="container mx-auto px-6 py-20">
            <h3 className="text-3xl text-slate-200 mb-4 font-bold">
              Companies are overwhelmed with resumes
            </h3>
            <p className="text-xl text-slate-400 max-w-xl mx-auto">
              We get it. In desperation they turn to AI resume screeners that
              look for keywords and other 'clues' they may be a good candidate.
            </p>

            <br />
            <br />
            <br />
            <br />

            <h3 className="text-3xl text-slate-200 mb-4 font-bold">
              But you know what's better than AI?
            </h3>
            <p className="text-xl text-slate-400 max-w-xl  mx-auto">
              Humans! Humans can spot nuance and think outside the box.
            </p>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
