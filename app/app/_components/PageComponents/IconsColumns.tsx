import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

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
        <p className="text-xl text-textSecondary">{text}</p>
      </div>
    </>
  );
}

export default function IconsColumns() {
  return (
    <div className="flex items-center justify-between w-full max-w-wrapper">
      <IconCard
        icon={faPhone}
        heading={"Vždy se nám dovoláte"}
        text={"Nejsme korporát s robotem na telefonu"}
      />
      <IconCard
        icon={faPhone}
        heading={"Vždy se nám dovoláte"}
        text={"Nejsme korporát s robotem na telefonu"}
      />
      <IconCard
        icon={faPhone}
        heading={"Vždy se nám dovoláte"}
        text={"Nejsme korporát s robotem na telefonu"}
      />
      <IconCard
        icon={faPhone}
        heading={"Vždy se nám dovoláte"}
        text={"Nejsme korporát s robotem na telefonu"}
      />
    </div>
  );
}
