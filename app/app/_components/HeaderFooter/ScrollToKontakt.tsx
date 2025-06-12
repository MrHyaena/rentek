"use client";

import React from "react";

type Props = { [key: string]: any };

//Scroll to contact in footer
export default function ScrollToKontakt({}: Props) {
  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }}
    >
      Kontakt
    </button>
  );
}
