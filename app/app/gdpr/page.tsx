import React from "react";
import PageHeading from "../_components/Headings/PageHeading";

export default function page() {
  return (
    <>
      <PageHeading
        image="/hero.webp"
        heading="Podmínky ochrany osobních údajů"
        text="Na bezpečí vašich dat nám záleží!"
        datepickerExists={false}
      />
      <div className="flex w-full justify-center py-15">
        <div className="w-full max-w-wrapper flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h5>1. Úvodní ustanovení</h5>
            <div className=" text-textPrimary">
              <p className="font-semibold">
                Grasston – půjčovna zahradní techniky
              </p>
              <p>
                Provozovatelem je Martin Doležal, IČO: 10796509, sídlo: Víta
                Nejedlého 666/18, Praha 3, PSČ 130 00
              </p>
              <p>Platné od: 5.5.2024</p>
            </div>
            <p>
              Tyto obchodní podmínky upravují vztah mezi provozovatelem služby
              (dále jen „pronajímatel“) a fyzickými nebo právnickými osobami
              (dále jen „nájemce“), které si pronajímají zahradní techniku
              prostřednictvím webu www.grasston.cz nebo jinou cestou
              (telefonicky, e-mailem).
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>
          <div className="flex flex-col gap-5">
            <h5>2. Pronájem techniky</h5>

            <p>
              Pronajímatel poskytuje k dočasnému užívání zahradní techniku za
              úplatu.
            </p>
            <p>
              Nájemce si vybírá techniku přes webový formulář, e-mailem nebo
              telefonicky.
            </p>
            <p>
              Cena pronájmu se určuje podle typu techniky a délky výpůjčky a je
              vždy sdělena před potvrzením objednávky.
            </p>
            <p>Minimální doba pronájmu je 24 hodin, není-li domluveno jinak.</p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>3. Ceník a slevy</h5>

            <p>
              Ceny jsou uvedeny včetně DPH a zahrnují dopravu, plnou nádrž (u
              motorových strojů), základní instruktáž a ochranné pomůcky. Slevy
              za delší výpůjčku se uplatňují automaticky:
            </p>
            <table className="max-w-[500px] ">
              <tbody>
                <tr className="border border-zinc-300">
                  <td className="p-2 border-r border-zinc-300">
                    Doba pronájmu
                  </td>
                  <td className="p-2"> Sleva z denní sazby</td>
                </tr>
                <tr className="border border-zinc-300">
                  <td className="p-2 border-r border-zinc-300">1 den</td>
                  <td className="p-2"> 0 %</td>
                </tr>
                <tr className="border border-zinc-300">
                  <td className="p-2 border-r border-zinc-300">2 - 7 dní</td>
                  <td className="p-2"> 10 %</td>
                </tr>
                <tr className="border border-zinc-300">
                  <td className="p-2 border-r border-zinc-300">8 - 21 dní</td>
                  <td className="p-2"> 15 %</td>
                </tr>
                <tr className="border border-zinc-300">
                  <td className="p-2 border-r border-zinc-300">
                    22 dní a více
                  </td>
                  <td className="p-2"> 20 %</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>4. Kauce</h5>

            <p>
              Před zahájením výpůjčky je nájemce povinen složit vratnou kauci
              (výše je uvedena u každého stroje v katalogu).
            </p>
            <p>
              Kauce se vrací v plné výši při včasném a nepoškozeném vrácení
              zařízení.
            </p>
            <p>
              V případě poškození, ztráty nebo znečištění stroje si pronajímatel
              vyhrazuje právo odečíst z kauce přiměřenou částku na pokrytí
              nákladů.
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>5. Doprava a předání</h5>

            <p>
              Pronajímatel zajišťuje dovoz i odvoz techniky na místo určené
              nájemcem (Praha a okolí).
            </p>
            <p>
              Nájemce je povinen být přítomen při převzetí a vrácení techniky.
            </p>
            <p>
              Při předání proběhne kontrola stavu, instruktáž a podepsání
              předávacího protokolu.
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>6. Povinnosti nájemce</h5>

            <p>
              Nájemce se zavazuje používat techniku řádně, dle návodu a pouze k
              účelu, ke kterému je určena.
            </p>
            <p>
              V případě poškození nebo ztráty zařízení je nájemce povinen
              vzniklou škodu nahradit.
            </p>
            <p>
              Nájemce nesmí techniku půjčovat třetím osobám bez souhlasu
              pronajímatele.
            </p>
            <p>Po skončení výpůjčky vrací zařízení čisté a v původním stavu.</p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>7. Servis a poruchy</h5>

            <p>
              V případě poruchy zařízení během výpůjčky je nájemce povinen
              neprodleně kontaktovat pronajímatel
            </p>
            <p>
              Pronajímatel zajistí výměnu nebo opravu techniky bez zbytečného
              odkladu.
            </p>
            <p>
              Pokud porucha nevznikla zaviněním nájemce, nevzniká mu žádná
              odpovědnost ani dodatečný náklad.
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>8. Platby a storno</h5>

            <p>
              Platba probíhá převodem nebo v hotovosti při převzetí techniky.
            </p>
            <p>Záloha/kauce je splatná při převzetí zařízení.</p>
            <p>
              Zrušení objednávky více než 24 hodin před dohodnutým termínem je
              zdarma.
            </p>
            <p>
              Při pozdějším zrušení si pronajímatel vyhrazuje právo účtovat
              storno poplatek až 50 % z ceny pronájmu.
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>9. Ochrana osobních údajů</h5>

            <p>
              Nájemce souhlasí se zpracováním osobních údajů pro účely
              rezervace, fakturace a komunikace.
            </p>
            <p>Záloha/kauce je splatná při převzetí zařízení.</p>
            <p>
              Údaje nejsou poskytovány třetím stranám a jsou uchovávány v
              souladu s GDPR.
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>10. Závěrečná ustanovení</h5>

            <p>
              Tyto obchodní podmínky jsou platné od 5.5.2024 a mohou být
              upravovány.
            </p>
            <p>
              O změnách bude nájemce informován e-mailem nebo zveřejněním na
              webu.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
