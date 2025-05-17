"use client";

import Link from "next/link";
import React from "react";

type Props = {};

export default function HowDoesItWorkButton({}: Props) {
  function scrollToElement() {
    const element: any = document.getElementById("jaktofunguje");
    const height = element.getBoundingClientRect();
    const elementHeightFromTop = height.top + window.scrollY;
    window.scrollTo({ top: elementHeightFromTop - 200, behavior: "smooth" });
  }

  return (
    <button
      onClick={() => {
        scrollToElement();
      }}
      className="bg-transparent border-2 px-5 py-3 md:text-lg text-base font-semibold rounded-md text-textLight cursor-pointer hover:bg-zinc-500/40 transition-all ease-in-out"
    >
      Jak to funguje
    </button>
  );
}
