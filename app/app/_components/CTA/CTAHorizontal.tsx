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
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-[250px] rounded-xl"
    >
      <div className="bg-overlay/70 min-h-[250px] rounded-xl px-15 flex items-center justify-between p-5">
        <div className="flex flex-col items-start justify-center gap-5 text-center md:text-start">
          <h3 className="text-textLight">{heading}</h3>
          <p className="text-textLight md:text-2xl text-xl">{text}</p>
        </div>
        {buttonText && (
          <a href={link}>
            <button className="buttonMid">{buttonText}</button>
          </a>
        )}
      </div>
    </div>
  );
}
