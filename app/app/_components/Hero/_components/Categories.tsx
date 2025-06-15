import React from "react";
import Link from "next/link";
import SectionHeading from "../../Headings/_components/SectionHeading";
import CTAHorizontal from "../../CTA/_components/CTAHorizontal";

type Props = {
  image: string;
  heading: string;
  buttonText: string;
  link: string;
};

//CategoryTab functional component
function CategoryTab({ image, heading, buttonText, link }: Props) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-[300px] rounded-xl"
    >
      <div className="bg-linear-180 from-overlay/80 to-transparent h-full w-full rounded-xl px-15 flex flex-col md:items-start items-center text-center md:text-start justify-center gap-8">
        <h4 className="text-textLight">{heading}</h4>
        <Link href={link}>
          <button className="buttonMid">{buttonText}</button>
        </Link>
      </div>
    </div>
  );
}

//Categories functional component - shown in homepage
export default function Categories() {
  return (
    <>
      <div className="max-w-wrapper w-full flex flex-col gap-10">
        <SectionHeading
          subheading="Kategorie"
          heading="Prohlédněte si naši nabídku"
          firstText="Půjčujeme nářadí a stroje, se kterými snadno zvládnete péči o celý váš pozemek."
          secondText="Všechna technika je pravidelně servisovaná a podrží Vás v jakémkoliv terénu."
        />
        <div className="grid md:grid-cols-2 w-full gap-10">
          <CategoryTab
            image={"/lawnmower.jpg"}
            heading={"Úprava trávníku, porostů a zeminy"}
            buttonText={"Ukázat techniku"}
            link={"/katalog"}
          />
          <CategoryTab
            image={"/shears.webp"}
            heading={"Úprava keřů"}
            buttonText={"Ukázat techniku"}
            link={"/katalog"}
          />
          <CategoryTab
            image={"/saw.jpg"}
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
          image={"/grass.jpg"}
          heading="DOPRAVA PO CELÉ PRAZE A OKOLÍ ZDARMA"
          text="Techniku k Vám zdarma dovezeme, vysvětlíme a po skončení se zase o vše postaráme."
          buttonText=""
          link="/"
        />
      </div>
    </>
  );
}
