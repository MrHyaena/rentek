import React from "react";
import DatepickerBig from "../Datepickers/DatepickerBig";

type Props = {
  image: string;
  heading: string;
  text: string;
  datepickerExists: boolean;
};

export default function PageHeading({
  image,
  heading,
  text,
  datepickerExists,
}: Props) {
  return (
    <div className="p-10 flex justify-center">
      <div
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
        className="min-h-[300px] w-full bg-green-300 max-w-wrapper rounded-xl"
      >
        <div className="rounded-xl flex flex-col justify-center items-center h-full bg-linear-180 from-overlay/90 from-40% to-transparent text-textLight gap-5 py-20">
          <h3>{heading}</h3>
          <h5>{text}</h5>
          <div></div>
          {datepickerExists && (
            <>
              <div className="w-[60%]">
                <DatepickerBig />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
