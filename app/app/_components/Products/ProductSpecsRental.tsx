import React from "react";
import { FaInfo } from "react-icons/fa";
import {
  FaCircleInfo,
  FaGear,
  FaGears,
  FaHandshakeSimple,
  FaHandshakeSimpleSlash,
} from "react-icons/fa6";
import { GiHighGrass } from "react-icons/gi";
import { PiFlowerTulip, PiFlowerTulipBold } from "react-icons/pi";
import { TbLayoutGrid, TbLayoutGridAdd } from "react-icons/tb";

type Props = {
  data: any;
};

export default function ProductSpecsRental({ data }: Props) {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid md:grid-cols-3 gap-4 justify-items-center md:justify-items-start w-full">
        {data.uses[0] != null && (
          <>
            <div className="flex flex-col md:items-start items-center gap-2">
              <div className="font-semibold flex items-center gap-2">
                <PiFlowerTulipBold className="text-zinc-800 text-2xl" />{" "}
                <p>Určení:</p>
              </div>
              <div className="flex flex-col md:items-start items-center gap-2">
                {data.uses.map((item: { name: string; [key: string]: any }) => {
                  return <p className="">{item.name}</p>;
                })}
              </div>{" "}
            </div>
          </>
        )}
        {data.specifications[0] != null && (
          <div className="flex flex-col md:items-start items-center gap-2">
            <div className="font-semibold flex items-center gap-2">
              <FaGears className="text-zinc-800 text-2xl" /> <p>Specifikace:</p>
            </div>
            <div className="flex flex-col md:items-start items-center gap-2">
              {data.specifications.map(
                (item: { name: string; [key: string]: any }) => {
                  return <p className="">{item.name}</p>;
                }
              )}
            </div>
          </div>
        )}
        {data.accessories[0] != null && (
          <div className="flex flex-col md:items-start items-center gap-2">
            <div className="font-semibold flex items-center gap-2">
              <TbLayoutGridAdd className="text-zinc-800 text-2xl" />{" "}
              <p>Společně s technikou:</p>
            </div>
            <div className="flex flex-col md:items-start items-center gap-2">
              {data.accessories.map(
                (item: { name: string; [key: string]: any }) => {
                  return <p className="">{item.name}</p>;
                }
              )}
            </div>
          </div>
        )}
      </div>
      {data.accessories[0] != null &&
        data.specifications[0] != null &&
        data.uses[0] != null && (
          <div className="w-full h-[1px] bg-borderGray"></div>
        )}{" "}
      <div className="grid md:grid-cols-[1fr_2fr] gap-2">
        <div className="font-semibold  flex items-center gap-2">
          <FaHandshakeSimple className="text-zinc-800 text-2xl" />
          <p>Kauce:</p>
        </div>
        <p>
          {" "}
          Vratná záloha za tuto techniku je{" "}
          <span className="font-semibold">{data.deposit} Kč</span> a odevzdává
          se při převzetí techniky. V případě řádného předání ve stavu
          odpovídajícím běžnému používání a opotřebení je kauce vratná v plné
          výši.
        </p>
      </div>
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
