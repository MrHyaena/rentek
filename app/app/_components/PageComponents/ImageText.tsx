import React from "react";

type Props = {
  subheading: string;
  heading: string;
  textOne: string;
  textTwo: string;
  textThree: string;
  image: string;
  colStart: number;
};

export default function ImageText({
  subheading,
  heading,
  textOne,
  textTwo,
  textThree,
  image,
  colStart,
}: Props) {
  let textRow = 2;

  if (colStart == 2) {
    textRow = 1;
  }
  return (
    <>
      <div className="w-full grid grid-cols-2 max-w-wrapper gap-10">
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            gridColumnStart: colStart,
          }}
          className="rounded-xl h-[400px] col-span-1"
        ></div>
        <div
          className="col-span-1 row-start-1 flex flex-col justify-center items-start"
          style={{ gridColumnStart: textRow, gridColumnEnd: textRow + 1 }}
        >
          <p className="text-2xl uppercase text-primary">{subheading}</p>
          <h2 className="text-textPrimary">{heading}</h2>
          <p className="text-xl">{textOne}</p>
          <p className="text-xl">{textTwo}</p>
        </div>
      </div>
    </>
  );
}
