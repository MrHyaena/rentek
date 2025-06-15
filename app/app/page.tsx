import Image from "next/image";
import Hero from "./_components/PageComponents/Hero";
import IconsColumns from "./_components/PageComponents/IconsColumns";
import Categories from "./_components/PageComponents/Categories";
import Products from "./_components/PageComponents/Products";
import ImageText from "./_components/PageComponents/ImageText";
import CTAHorizontal from "./_components/CTA/_components/CTAHorizontal";
import CTAVertical from "./_components/CTA/_components/CTAVertical";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rentek: Půjčovna zahradní techniky",
  description:
    "Půjčovna zahradní techniky. Kvalitní sekačky, vertikulátory a další nářadí k zapůjčení. Rychlá online rezervace, výhodné ceny, dovoz po Praze a okolí zdarma.",
};

export default async function Home() {
  return (
    <>
      <div className="py-15 lg:pt-15 md:pt-0 pt-15 px-5 flex justify-center w-full flex-col items-center gap-30">
        <Hero />
        <IconsColumns />
        <Categories />
        <Products />
        <ImageText
          image="/handshake.png"
          subheading="Služba až ke dveřím"
          heading="Jak to u nás funguje?"
          textOne="Naše půjčovna si zakládá především na skvělé zákaznické péči a jednoduchosti. Všechno zboží, které si u nás objednáte, Vám dovezeme až domů. Společně s předáním Vám vysvětlíme obsluhu a nakonci půjčky pro vše zase přijedeme."
          textTwo="Celá objednávka je také plně transparentní, takže předem znáte částku, zálohu a zbylé důležité informace."
          textThree=""
          colStart={1}
          id="jaktofunguje"
        />
        <ImageText
          image="/roots.jpg"
          subheading="Seznamte se s námi"
          heading="Kdo jsme?"
          textOne="Jsme rodinná firma, kterou nebaví korporátní fungování. Nohama stojíme pevně na zemi a věříme především ve férové jednání. Na trh jsme vstoupili s tím, že chceme propojit profesionální službu, lidský přístup a technologie."
          textTwo="O všechny naše stroje pečujeme s maximální láskou. Můžete proto očekávat jen prvotřídní vybavení, se kterým zvládnete jakoukoliv práci."
          textThree=""
          colStart={2}
          id="secondImageText"
        />
        <div className="w-full max-w-wrapper">
          <CTAVertical
            image={"/worker.jpg"}
            heading="Hledáte techniku pro svou zahradu? Podívejte se do našeho katalogu!"
            text="A pokud byste měli jakýkoliv dotaz, nebojte se nás kontaktovat na telefonu nebo emailové adrese v zápatí."
            buttonText="Ukázat techniku"
            link="/katalog"
          />
        </div>
      </div>
    </>
  );
}
