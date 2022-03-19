import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { increment } from "firebase/firestore";

const NAMES = ["Rello", "Focult", "Tab Zero", "Sillico"];

const Home: NextPage = () => {
  const { addToast } = useToasts();
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const picked = localStorage.getItem("picked");
    if (!picked) return;
    setSelected(parseInt(picked));
  }, []);

  const handleSelect = async (index: number) => {
    if (localStorage.getItem("picked")) return;

    const list = ["rello", "focult", "tabZero", "silico"];

    try {
      const docRef = doc(db, "internship-poll-responses", "doc");
      await updateDoc(docRef, {
        [list[index]]: increment(1),
      });
      setSelected(index);
      addToast(`You picked ${NAMES[index]}`, { appearance: "success" });
      localStorage.setItem("picked", JSON.stringify(index));
    } catch (err) {
      console.log(err);
      setSelected(null);
      addToast(`Something went wrong`, { appearance: "error" });
    }
  };

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
          {NAMES.map((name, index) => (
            <div
              onClick={() => handleSelect(index)}
              key={name.toLowerCase()}
              className={`select ${selected === index && "selected"}`}
            >
              {name}
              {selected === index && (
                <Image src="/tick.png" alt="Tick" height={40} width={40} />
              )}
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
