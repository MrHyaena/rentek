import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = { [key: string]: any };

export default function Footer({}: Props) {
  return (
    <div className="min-h-[400px] w-full bg-white border-t border-borderGray flex justify-center py-12 px-5">
      <div className="max-w-wrapper w-full grid md:grid-cols-3 gap-20">
        <div className="flex flex-col gap-5">
          <Image
            src={"/logo.png"}
            width={300}
            height={300}
            alt="logo"
            className="w-20"
          />
          <p className="text-textSecondary text-sm">
            Půjčujeme kvalitní zahradní stroje a nářadí na krátkodobé i
            dlouhodobé použití. Dovezeme Vám techniku až k domu, vysvětlíme
            obsluhu a po skončení zápůjčky vše opět vyzvedneme. Férové jednání a
            prvotřídní zákaznický servis jsou pro nás základ.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-primary">Navigace</p>
          <ul className="flex flex-col gap-2 text-textSecondary">
            <li>
              <Link href={"/"}>Domů</Link>
            </li>
            <li>
              <Link href={"/katalog"}>Katalog</Link>
            </li>

            <li>
              <Link href={"/obchodni-podminky"}>Obchodní podmínky</Link>
            </li>
            <li>
              <Link href={"/gdpr"}>Podmínky ochrany osobních údajů</Link>
            </li>
            <li>
              <Link href={"/najemni-smlouva"}>Příklad nájemní smlouvy</Link>
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
              <a href="mailto:info@rentek.cz">Email: info@rentek.cz</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
