import React from "react";
import { FaInfo } from "react-icons/fa";

type Props = {
  data: any;
};

//Functional component
export default function ProductSpecsProduct({ data }: Props) {
  return (
    <div className="flex flex-col gap-10">
      {data.additionalInformation != null && (
        <>
          {" "}
          <div className="w-full h-[1px] bg-borderGray"></div>
          <div className="grid md:grid-cols-[1fr_2fr] gap-2">
            <div className="font-semibold  flex items-center gap-2">
              <FaInfo className="text-zinc-800 text-2xl" />
              <p>Doplňující informace:</p>
            </div>{" "}
            <p>{data.additionalInformation}</p>
          </div>
        </>
      )}
    </div>
  );
}
