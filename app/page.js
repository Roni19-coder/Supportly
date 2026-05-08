"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();

  const handleSupport = () => {

    if (session) {

      window.location.href =
        `/${session.user.name}`;

    }

    else {

      alert("Please login first");

      window.location.href = "/login";
    }
  };

  return (

    <>

      <div className="flex flex-col items-center justify-center text-white min-h-[80vh] gap-6 px-4 sm:px-6 text-center">

        <div className="flex flex-col items-center gap-4">

          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl">

            Supportly 🤝

          </h1>

          <img
            src="/folded_hands.gif"
            alt="support"
            className="w-40 sm:w-52 md:w-72 rounded-xl"
          />

        </div>

        <p className="max-w-2xl text-slate-400 text-base sm:text-lg leading-7">

          Supportly is a creator-support platform where fans can support
          developers, artists, writers and creators through simple and
          secure online donations.

        </p>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto justify-center">

          <button
            type="button"
            onClick={handleSupport}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl rounded-full text-base sm:text-lg px-6 py-3 font-bold w-full sm:w-auto"
          >

            Support

          </button>

          <Link
            href="/about"
            className="w-full sm:w-auto"
          >

            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl rounded-full text-base sm:text-lg px-6 py-3 font-bold w-full sm:w-auto"
            >

              Read More

            </button>

          </Link>

        </div>

      </div>

    </>
  );
}