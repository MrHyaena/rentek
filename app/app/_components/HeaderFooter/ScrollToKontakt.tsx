"use client";

import React from "react";

type Props = {};

export default function ScrollToKontakt({}: Props) {
  return (
    <li
      className="cursor-pointer"
      onClick={() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }}
    >
      Kontakt
    </li>
  );
}
