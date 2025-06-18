import React from "react";
import DatepickerBig from "../../Datepickers/_components/DatepickerBig";
import DatepickerSmall from "../../Datepickers/_components/DatepickerSmall";

type Props = {
  image: string;
  heading: string;
  text: string;
  datepickerExists: boolean;
};

//Functional component
export default function PageHeading({
  image,
  heading,
  text,
  datepickerExists,
}: Props) {
  return (
    <div className="md:p-10 p-5 flex justify-center mt-[110px]">
      <div
        data-testid="image"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="min-h-[300px] w-full bg-green-300 max-w-wrapper rounded-xl"
      >
        <div className="rounded-xl flex flex-col justify-center items-center h-full bg-overlay/70 text-textLight gap-5 py-10 px-5 text-center">
          <h3>{heading}</h3>
          <p className="md:text-xl text-lg font-semibold">{text}</p>
          <div></div>
          {datepickerExists && (
            <>
              <div
                data-testid="datepickers"
                className="w-[60%] text-textPrimary hidden lg:block"
              >
                <DatepickerBig />
              </div>
              <div className=" text-textPrimary lg:hidden">
                <DatepickerSmall />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
