import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <>
      <div className=" w-full border-b border-borderGray fixed top-0 bg-white">
        <div className="h-[40px] w-full bg-light flex justify-center">
          <div className="max-w-wrapper w-full h-full flex justify-between items-center">
            <p className="">
              Získejte 5% slevu s kódem{" "}
              <span className="font-semibold">GT2025</span> na celou zápůjčku
            </p>
            <div>
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
        <div className="h-[110px] w-full flex items-center justify-center">
          <div className="max-w-wrapper h-full w-full flex items-center justify-between">
            <div className="flex gap-10 items-center">
              <Image
                src={"/logo.png"}
                alt="logo"
                width={300}
                height={300}
                className="h-17 w-auto"
              />
              <button className="buttonMid uppercase flex items-center gap-4">
                <FontAwesomeIcon icon={faBars} className="text-2xl" />
                Katalog
              </button>
            </div>
            <div className="p-2 border border-borderGray rounded-md">
              <input type="text" className="w-[400px] mr-5" />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <div className="flex items-center gap-8">
              <ul className="flex gap-5 text-lg text-textSecondary">
                <li>Domů</li>
                <li>Kontakt</li>
              </ul>
              <div className="text-xl relative flex items-center">
                <FontAwesomeIcon icon={faCartShopping} />
                <p className="bg-primary text-white font-semibold text-sm rounded-full flex items-center justify-center w-5 h-5 relative top-[-15px] left-[-5px]">
                  0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
