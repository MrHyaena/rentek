import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import CartButton from "../Cart/CartButton";
import { CartContextProvider } from "../../_context/CartContext";
import Link from "next/link";
import ScrollToKontakt from "./ScrollToKontakt";

export default function Header() {
  return (
    <>
      <div className=" w-full border-b border-borderGray fixed top-0 bg-white lg:block hidden">
        <div className="h-[40px] w-full bg-zinc-50 flex justify-center px-10">
          <div className="max-w-wrapper w-full h-full flex justify-between items-center">
            <p className="">
              Získejte 5% slevu s kódem{" "}
              <span className="font-semibold">GT2025</span> na celou zápůjčku
            </p>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="text-zinc-700" />
              <p>
                Zvedneme to vždy:{" "}
                <a href="tel:602606331" className="font-semibold">
                  +420 602 606 331
                </a>
              </p>
            </div>
            <div>
              <p className="font-semibold">
                Dovážíme a vyzvedáváme v pracovních dnech od 8:00 do 20:00 hod.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xl">
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faFacebook} />
            </div>
          </div>
        </div>
        <div className="h-[110px] w-full flex items-center justify-center px-10">
          <div className="max-w-wrapper h-full w-full flex items-center justify-between">
            <div className="flex gap-10 items-center">
              <Link href={"/"}>
                <Image
                  src={"/logo.png"}
                  alt="logo"
                  width={300}
                  height={300}
                  className="h-17 w-auto"
                />
              </Link>
              <Link
                href="/katalog"
                className="buttonSmall uppercase flex items-center gap-4"
              >
                <FontAwesomeIcon icon={faBars} className="text-2xl" />
                Katalog
              </Link>
            </div>
            <div className="p-2 border border-borderGray rounded-md hidden">
              <input type="text" className="w-[400px] mr-5" />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <div className="flex items-center gap-8">
              <ul className="flex gap-5 text-lg text-textSecondary">
                <Link href={"/"}>Domů</Link>
                <ScrollToKontakt />
              </ul>

              <CartButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
