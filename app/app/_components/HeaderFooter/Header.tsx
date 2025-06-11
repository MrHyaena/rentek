"use client";

import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import CartButton from "../Cart/CartButton";
import { CartContextProvider } from "../../_context/CartContext";
import Link from "next/link";
import ScrollToKontakt from "./ScrollToKontakt";
import { FiMenu } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

function DesktopHeader() {
  return (
    <>
      <div className=" w-full border-b border-borderGray fixed top-0 bg-white lg:block z-20 hidden">
        <div className="h-[40px] w-full border-b border-borderGray bg-zinc-50 flex justify-center px-10">
          <div className="max-w-wrapper w-full h-full  justify-between items-center hidden lg:flex lg:text-sm py-1">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="text-zinc-700" />
              <p>
                Zvedneme Vám to vždy:{" "}
                <a href="tel:602606331" className="font-semibold">
                  +420 602 606 331
                </a>
              </p>
            </div>
            <div>
              <p className="font-semibold">
                Fungujeme v pracovních dnech od 8:00 do 20:00
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xl">
              <FaInstagram />
              <FaFacebookSquare className="hidden" />
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
                  className="h-11 w-auto"
                />
              </Link>
              <Link
                href={"/katalog"}
                className="buttonSmall flex items-center gap-3"
              >
                <BsFillGrid1X2Fill />
                Katalog
              </Link>
            </div>
            <div className="p-2 border border-borderGray rounded-md hidden">
              <input type="text" className="w-[400px] mr-5" />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <div className="flex items-center gap-8">
              <ul className="flex gap-5 text-lg text-textSecondary">
                <li>
                  <Link href={"/"}>Domů</Link>
                </li>
                <li>
                  <ScrollToKontakt />
                </li>
              </ul>

              <CartButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MobileHeader() {
  const [menuToggle, setMenuToggle] = useState<boolean>(false);

  return (
    <>
      <div className=" w-full border-b border-borderGray fixed top-0 z-20 lg:hidden">
        <div className="h-[40px] w-full border-b border-borderGray bg-zinc-50 flex justify-center px-5">
          <div className="max-w-wrapper w-full h-full flex justify-between items-center text-sm">
            <div>
              <p className="font-semibold">Od 8:00 do 20:00</p>
            </div>
          </div>
        </div>
        <div className=" w-full flex items-center justify-between px-5 py-4 bg-white">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="logo"
              width={300}
              height={300}
              className="h-5 w-auto"
            />
          </Link>
          <div className="flex gap-4">
            <CartButton />

            <button
              onClick={() => {
                setMenuToggle(!menuToggle);
              }}
              className="cursor-pointer"
            >
              <HiMenuAlt2 className="text-3xl text-textPrimary" />
            </button>
          </div>
        </div>
        {menuToggle && (
          <>
            {" "}
            <div className=" w-full flex items-center justify-between px-5 py-3 border-y border-borderGray bg-white">
              <ul className="flex flex-col gap-5 text-lg text-textSecondary">
                <li>
                  <Link href={"/"}>Domů</Link>
                </li>

                <li>
                  <Link href={"/katalog"}>Katalog</Link>
                </li>
                <li>
                  <ScrollToKontakt />
                </li>
              </ul>
            </div>
            <div
              onClick={() => {
                setMenuToggle(false);
              }}
              className="h-screen bg-transparent"
            ></div>
          </>
        )}
      </div>
    </>
  );
}

export default function Header() {
  return (
    <>
      <MobileHeader />
      <DesktopHeader />
    </>
  );
}
