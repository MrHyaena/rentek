import React from "react";

type Props = {
  image: string;
  heading: string;
  text: string;
  buttonText: string;
  link: string;
};

export default function CTAHorizontal({
  heading,
  image,
  text,
  buttonText,
  link,
}: Props) {
  return (
    <div
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
      className="min-h-[250px] rounded-xl"
    >
      <div className=" bg-linear-90 from-overlay to-transparent min-h-[250px] rounded-xl px-15 flex items-center justify-between">
        <div className="flex flex-col items-start justify-center gap-5">
          <h3 className="text-textLight">{heading}</h3>
          <p className="text-textLight text-2xl">{text}</p>
        </div>
        <a href={link}>
          <button className="buttonMid">{buttonText}</button>
        </a>
      </div>
    </div>
  );
}
