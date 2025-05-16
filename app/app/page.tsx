import Image from "next/image";
import Hero from "./_components/PageComponents/Hero";
import IconsColumns from "./_components/PageComponents/IconsColumns";
import Categories from "./_components/PageComponents/Categories";
import Products from "./_components/PageComponents/Products";
import ImageText from "./_components/PageComponents/ImageText";
import CTAHorizontal from "./_components/CTA/CTAHorizontal";
import CTAVertical from "./_components/CTA/CTAVertical";

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
          subheading="Služba až ke dveřím"
          heading="Jak to u nás funguje?"
          textOne="Zakládáme si zejména na skvělé zákaznické péči a jednoduchosti. Všechno zboží, které si u nás objednáte, Vám dovezeme až domů. Společně s předáním Vám vše vysvětlíme a nakonci půjčky pro vše zase přijedeme."
          textTwo="Celá objednávka je také plně transparentní, takže předem znáte částku, zálohu a zbylé informace. Nic před Vámi netajíme."
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
        <div className="w-full max-w-wrapper">
          <CTAVertical
            image={"/hero.webp"}
            heading="Hledáte nějakou techniku? Podívejte se do našeho katalogu!"
            text="A pokud byste měli jakýkoliv dotaz, nebojte se nás kontaktovat na telefonu nebo emailové adrese v zápatí."
            buttonText="Ukázat techniku"
            link="/"
          />
        </div>
      </div>
    </>
  );
}
