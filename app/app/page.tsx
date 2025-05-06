import Image from "next/image";
import Hero from "./_components/PageComponents/Hero";
import IconsColumns from "./_components/PageComponents/IconsColumns";
import Categories from "./_components/PageComponents/Categories";
import Products from "./_components/PageComponents/Products";
import ImageText from "./_components/PageComponents/ImageText";

export default function Home() {
  return (
    <>
      <div className="py-15 px-5 flex justify-center w-full flex-col items-center gap-30">
        <Hero />
        <IconsColumns />
        <Categories />
        <Products />
        <ImageText
          image="/hero.webp"
          subheading="Seznamte se s námi"
          heading="Kdo jsme?"
          textOne="Jsme rodinná firma, kterou nebaví korporátní fungování. Nohama stojíme pevně na zemi a věříme především ve férové jednání. Na trh jsme vstoupili s tím, že chceme propojit profesionální službu, lidský přístup a technologie."
          textTwo="O všechny naše stroje pečujeme s maximální láskou. Můžete proto očekávat jen prvotřídní vybavení, které Vás podrží i v tom nejhorším terénu."
          textThree="Zakládáme si ale také na skvělé zákaznické péči. Ke každé objednávce proto dostanete instruktáž, plnou nádrž, a pro případ s sebou vozíme i ochranné pomůcky, které se vždy hodí."
          colStart={1}
        />
        <ImageText
          image="/hero.webp"
          subheading="Seznamte se s námi"
          heading="Kdo jsme?"
          textOne="Jsme rodinná firma, kterou nebaví korporátní fungování. Nohama stojíme pevně na zemi a věříme především ve férové jednání. Na trh jsme vstoupili s tím, že chceme propojit profesionální službu, lidský přístup a technologie."
          textTwo="O všechny naše stroje pečujeme s maximální láskou. Můžete proto očekávat jen prvotřídní vybavení, které Vás podrží i v tom nejhorším terénu."
          textThree="Zakládáme si ale také na skvělé zákaznické péči. Ke každé objednávce proto dostanete instruktáž, plnou nádrž, a pro případ s sebou vozíme i ochranné pomůcky, které se vždy hodí."
          colStart={2}
        />
      </div>
    </>
  );
}
