import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useToasts } from "react-toast-notifications";
import Input from "../components/Input";
import useInputState from "../hooks/useInputState";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const NAMES = ["Rello", "Focult", "Tab Zero", "Sillico"];

const Home: NextPage = () => {
  const { addToast } = useToasts();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Name Poll</title>
        <meta name="description" content="Help us choose a name" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <aside className="left">
          <h1>Help us choose a name</h1>
          {NAMES.map((name) => (
            <div key={name.toLowerCase()} className="select">
              {name}
            </div>
          ))}
        </aside>
        <aside className="right">
          <Image
            className="img"
            src="/vote.svg"
            height={500}
            width={500}
            alt="Woman voting"
          />
        </aside>
      </main>
    </>
  );
};

export default Home;
