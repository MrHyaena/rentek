import React from "react";

type Props = {
  image: string;
  heading: string;
  text: string;
  buttonText: string;
  link: string;
};

export default function CTAVertical({
  heading,
  image,
  text,
  buttonText,
  link,
}: Props) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-[250px] rounded-xl"
    >
      <div className="bg-overlay/70 to-transparent min-h-[250px] rounded-xl px-15 py-20 flex flex-col items-center justify-center gap-10">
        <div className="text-center flex flex-col items-center justify-center gap-5">
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
