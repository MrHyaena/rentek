import React from "react";

type Props = {
  heading: string;
  firstText: string;
  secondText: string;
};

export default function SectionHeading({
  heading,
  firstText,
  secondText,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-5 pb-14">
      <h2 className="text-textPrimary">{heading}</h2>
      <p className="text-xl">{firstText}</p>
      <p className="text-xl">{secondText}</p>
    </div>
  );
}
