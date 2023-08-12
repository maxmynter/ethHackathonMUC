import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>LinkedUp</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <Header />
        <ConnectButton />

        <h1 className="text-3xl font-bold underline">Welcome to LinkedUp!</h1>
      </main>

      <footer>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
