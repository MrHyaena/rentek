import Image from "next/image";
import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="min-h-[400px] w-full bg-white border-t border-borderGray flex justify-center py-12 px-5">
      <div className="max-w-wrapper w-full grid grid-cols-4 gap-20">
        <div className="flex flex-col gap-5">
          <Image
            src={"/logo.png"}
            width={300}
            height={300}
            alt="logo"
            className="w-20"
          />
          <p className="text-textSecondary text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident,
            necessitatibus? Fugiat accusamus accusantium facere eos doloremque
            hic dolorum labore.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-primary">Navigace</p>
          <ul className="flex flex-col gap-2 text-textSecondary">
            <li>
              <a>Domů</a>
            </li>
            <li>
              <a>Katalog</a>
            </li>
            <li>
              <a>Kontakty</a>
            </li>
            <li>
              <a>Obchodní podmínky</a>
            </li>
            <li>
              <a>Podmínky ochrany osobních údajů</a>
            </li>
            <li>
              <a>Příklad nájemní smlouvy</a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-primary">Kategorie</p>
          <ul className="flex flex-col gap-2 text-textSecondary">
            <li>
              <a>Všechny nástroje</a>
            </li>
            <li>
              <a>Úprava trávníku, porostů a zeminy</a>
            </li>
            <li>
              <a>Úprava keřů</a>
            </li>
            <li>
              <a>Úprava stromů a dřevin</a>
            </li>
            <li>
              <a>Manuální nářadí a příslušenství</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-primary">Kontakt</p>
          <ul className="flex flex-col gap-2 text-textSecondary">
            <li>
              <p>IČO: 10796509</p>
            </li>
            <li>
              <a href="tel:602606331">Telefon: 602606331</a>
            </li>
            <li>
              <a href="mailto:info@grasston.cz">Email: info@grasston.cz</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
