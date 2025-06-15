import React from "react";
import { FiLoader } from "react-icons/fi";
import { LuLoaderCircle } from "react-icons/lu";

type Props = { shown: boolean };

//Functional component - loader when user does something
export default function Loader({ shown }: Props) {
  return (
    <>
      {shown == true && (
        <div className="fixed w-full h-full top-0 left-0 bg-white/80 z-20 flex items-center justify-center flex-col gap-5">
          <LuLoaderCircle className="text-5xl animate-spin text-primaryHover" />
          <h3>Zpracováváme vaši objednávku</h3>
        </div>
      )}
    </>
  );
}
