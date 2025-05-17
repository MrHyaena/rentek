import React from "react";

type Props = {
  subheading: string;
  heading: string;
  textOne: string;
  textTwo: string;
  textThree: string;
  image: string;
  colStart: number;
  id: string;
};

export default function ImageText({
  subheading,
  heading,
  textOne,
  textTwo,
  textThree,
  image,
  colStart,
  id,
}: Props) {
  let textRow = 2;

  if (colStart == 2) {
    textRow = 1;
  }
  return (
    <>
      <div
        id={id}
        className="w-full md:grid grid-cols-2 max-w-wrapper gap-15 flex flex-col-reverse"
      >
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            gridColumnStart: colStart,
            backgroundPosition: "center",
          }}
          className="rounded-xl h-[400px] col-span-1"
        ></div>
        <div
          className="col-span-1 row-start-1 flex flex-col justify-center items-start gap-5"
          style={{ gridColumnStart: textRow, gridColumnEnd: textRow + 1 }}
        >
          <div>
            <p className="text-xl uppercase text-primary mb-2">{subheading}</p>
            <h2 className="text-textPrimary">{heading}</h2>
          </div>
          <p className="text-xl">{textOne}</p>
          <p className="text-xl">{textTwo}</p>
        </div>
      </div>
    </>
  );
}
