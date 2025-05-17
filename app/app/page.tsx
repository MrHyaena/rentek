import Image from "next/image";
import Hero from "./_components/PageComponents/Hero";
import IconsColumns from "./_components/PageComponents/IconsColumns";
import Categories from "./_components/PageComponents/Categories";
import Products from "./_components/PageComponents/Products";
import ImageText from "./_components/PageComponents/ImageText";
import CTAHorizontal from "./_components/CTA/CTAHorizontal";
import CTAVertical from "./_components/CTA/CTAVertical";

export default async function Home() {
  async function GetPopularProducts() {
    let response = await fetch(
      process.env.STRAPI + "/api/items/?filters[popular][$eq]=yes&populate=*",
      {
        method: "GET",
        mode: "cors",
      }
    );

    const itemsArray: any[] = [];

    const json = await response.json();

    json.data.map((item: any) => {
      itemsArray.push({
        count: 0,
        item: { ...item },
      });
    });

    return itemsArray;
  }

  const popularProducts = await GetPopularProducts();

  return (
    <>
      <div className="py-15 px-5 flex justify-center w-full flex-col items-center gap-30">
        <Hero />
        <IconsColumns />
        <Categories />
        <Products popularProducts={popularProducts} />
        <ImageText
          image="/handshake.png"
          subheading="Služba až ke dveřím"
          heading="Jak to u nás funguje?"
          textOne="Zakládáme si zejména na skvělé zákaznické péči a jednoduchosti. Všechno zboží, které si u nás objednáte, Vám dovezeme až domů. Společně s předáním Vám vysvětlíme obsluhu a nakonci půjčky pro vše zase přijedeme."
          textTwo="Celá objednávka je také plně transparentní, takže předem znáte částku, zálohu a zbylé důležité informace."
          textThree="Zakládáme si ale také na skvělé zákaznické péči. Ke každé objednávce proto dostanete instruktáž, plnou nádrž, a pro případ s sebou vozíme i ochranné pomůcky, které se vždy hodí."
          colStart={1}
          id="jaktofunguje"
        />
        <ImageText
          image="/roots.jpg"
          subheading="Seznamte se s námi"
          heading="Kdo jsme?"
          textOne="Jsme rodinná firma, kterou nebaví korporátní fungování. Nohama stojíme pevně na zemi a věříme především ve férové jednání. Na trh jsme vstoupili s tím, že chceme propojit profesionální službu, lidský přístup a technologie."
          textTwo="O všechny naše stroje pečujeme s maximální láskou. Můžete proto očekávat jen prvotřídní vybavení, které Vás podrží i v tom nejhorším terénu."
          textThree="Zakládáme si ale také na skvělé zákaznické péči. Ke každé objednávce proto dostanete instruktáž, plnou nádrž, a pro případ s sebou vozíme i ochranné pomůcky, které se vždy hodí."
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
