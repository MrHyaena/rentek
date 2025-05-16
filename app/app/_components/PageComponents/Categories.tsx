import React from "react";
import SectionHeading from "../Headings/SectionHeading";
import CTAHorizontal from "../CTA/CTAHorizontal";
import Link from "next/link";

type Props = {
  image: string;
  heading: string;
  buttonText: string;
  link: string;
};

function CategoryTab({ image, heading, buttonText, link }: Props) {
  return (
    <div
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
      className="min-h-[300px] rounded-xl"
    >
      <div className="bg-linear-180 from-overlay/80 to-transparent h-full w-full rounded-xl px-15 flex flex-col items-start justify-center gap-8">
        <h4 className="text-textLight">{heading}</h4>
        <Link href={link}>
          <button className="buttonMid">{buttonText}</button>
        </Link>
      </div>
    </div>
  );
}

export default function Categories() {
  return (
    <>
      <div className="max-w-wrapper w-full flex flex-col gap-10">
        <SectionHeading
          subheading="Kategorie"
          heading="Prohlédněte si naší nabídku"
          firstText="Půjčujeme nářadí a stroje, se kterými zvládnete pečovat o celý váš pozemek."
          secondText="Všechna technika je samozřejmě neustále servisovaná. Pokud by se i přesto stalo, že něco selže, zboží Vám v rámci hodin zdarma nahradíme."
        />
        <div className="grid grid-cols-2 w-full gap-10">
          <CategoryTab
            image={"/grass.jpg"}
            heading={"Úprava trávníku, porostů a zeminy"}
            buttonText={"Ukázat techniku"}
            link={"/katalog"}
          />
          <CategoryTab
            image={"/shrub.jpg"}
            heading={"Úprava keřů"}
            buttonText={"Ukázat techniku"}
            link={"/katalog"}
          />
          <CategoryTab
            image={"/apple.jpg"}
            heading={"Úprava stromů a dřeva"}
            buttonText={"Ukázat techniku"}
            link={"/katalog"}
          />
          <CategoryTab
            image={"/tools.jpg"}
            heading={"Manuální nářadí a příslušenství"}
            buttonText={"Ukázat techniku"}
            link={"/katalog"}
          />
        </div>
        <CTAHorizontal
          image={"/bosch.jpg"}
          heading="SLEVA 5 % S KÓDEM GT2025"
          text="Slevu pro Vás máme spuštěnou po celou sezónu. Platí na celou objednávku."
          buttonText=""
          link="/"
        />
      </div>
    </>
  );
}
