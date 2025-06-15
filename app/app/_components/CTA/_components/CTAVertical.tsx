import React from "react";

type Props = {
  image: string;
  heading: string;
  text: string;
  buttonText: string;
  link: string;
};

//Functional component
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
      <div className="bg-overlay/70 to-transparent min-h-[250px] rounded-xl md:px-15 md:py-20 p-10 flex flex-col items-center justify-center gap-10">
        <div className="text-center flex flex-col items-center justify-center gap-5">
          <h3 className="text-textLight">{heading}</h3>
          <p className="text-textLight md:text-2xl text-xl">{text}</p>
        </div>
        <a href={link}>
          <button className="buttonMid">{buttonText}</button>
        </a>
      </div>
    </div>
  );
}
