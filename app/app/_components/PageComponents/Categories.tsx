import React from "react";
import SectionHeading from "../Headings/SectionHeading";
import CTATab from "../CTA/CTATab";

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
      <div className="bg-linear-180 from-black/80 to-transparent h-full w-full rounded-xl px-15 flex flex-col items-start justify-center gap-8">
        <h4 className="text-textLight">{heading}</h4>
        <a href={link}>
          <button className="buttonMid">{buttonText}</button>
        </a>
      </div>
    </div>
  );
}

export default function Categories() {
  return (
    <>
      <div className="max-w-wrapper w-full flex flex-col gap-10">
        <SectionHeading
          heading="Prohlédněte si naší nabídku"
          firstText="Půjčujeme nářadí a stroje, se kterými zvládnete pečovat o celý váš pozemek."
          secondText="Všechna technika je samozřejmě neustále servisovaná. Pokud by se i přesto stalo, že něco selže, zboží Vám v rámci hodin zdarma nahradíme."
        />
        <div className="grid grid-cols-2 w-full gap-10">
          <CategoryTab
            image={"/hero.webp"}
            heading={"První"}
            buttonText={"Ukázat zboží"}
            link={"/"}
          />
          <CategoryTab
            image={"/hero.webp"}
            heading={"První"}
            buttonText={"Ukázat zboží"}
            link={"/"}
          />
          <CategoryTab
            image={"/hero.webp"}
            heading={"První"}
            buttonText={"Ukázat zboží"}
            link={"/"}
          />
          <CategoryTab
            image={"/hero.webp"}
            heading={"První"}
            buttonText={"Ukázat zboží"}
            link={"/"}
          />
        </div>
        <CTATab
          image={"/hero.webp"}
          heading="SLEVA 5 % S KÓDEM GT2025"
          text="Slevu pro Vás máme spuštěnou po celou sezónu. Platí na celou objednávku."
          buttonText="Ukázat techniku"
          link="/"
        />
      </div>
    </>
  );
}
