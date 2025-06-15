import React from "react";

type Props = {
  heading: string;
  subheading: string;
  firstText: string;
  secondText: string;
};

//Functional component
export default function SectionHeading({
  heading,
  firstText,
  secondText,
  subheading,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-5 pb-14 text-center">
      <p className="md:text-2xl text-xl uppercase text-primary">{subheading}</p>
      <h2 className="text-textPrimary">{heading}</h2>
      <p className="text-xl">{firstText}</p>
      <p className="text-xl">{secondText}</p>
    </div>
  );
}
