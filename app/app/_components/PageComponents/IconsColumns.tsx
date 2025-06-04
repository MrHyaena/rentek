import {
  faHandshakeSimple,
  faPhone,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FaHandshake } from "react-icons/fa6";
import { HiViewGrid, HiViewGridAdd } from "react-icons/hi";
import { IoMdPhonePortrait } from "react-icons/io";
import { PiTruckFill } from "react-icons/pi";

type IconCardProps = {
  icon: any;
  heading: string;
  text: string;
};

function IconCard({ icon, heading, text }: IconCardProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-start text-center">
        <FontAwesomeIcon icon={icon} className="text-4xl text-primary mb-4" />
        <h5 className="">{heading}</h5>
        <p className="text-lg text-textSecondary">{text}</p>
      </div>
    </>
  );
}

export default function IconsColumns() {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 items-start justify-between w-full max-w-wrapper">
      <div className="flex flex-col items-center justify-start text-center">
        <PiTruckFill className="text-4xl text-primary mb-4" />
        <h5 className="">Doručení po Praze a okolí zdarma</h5>
        <p className="text-lg text-textSecondary">
          Techniku Vám doručíme klidně až před branku
        </p>
      </div>
      <div className="flex flex-col items-center justify-start text-center">
        <IoMdPhonePortrait className="text-4xl text-primary mb-4" />
        <h5 className="">Vždy se nám dovoláte</h5>
        <p className="text-lg text-textSecondary">
          Nejsme korporát s robotem na telefonu
        </p>
      </div>
      <div className="flex flex-col items-center justify-start text-center">
        <FaHandshake className="text-4xl text-primary mb-4" />
        <h5 className="">Prvotřídní zákaznická péče</h5>
        <p className="text-lg text-textSecondary">
          Každý problém se dá vyřešit lidsky a férově
        </p>
      </div>
      <div className="flex flex-col items-center justify-start text-center">
        <HiViewGridAdd className="text-4xl text-primary mb-4" />
        <h5 className="">Můžete rovnou začít</h5>
        <p className="text-lg text-textSecondary">
          Servisované vybavení, plná nádrž, instruktáž a doplňky zdarma
        </p>
      </div>
    </div>
  );
}
