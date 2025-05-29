import React from "react";
import PageHeading from "../_components/Headings/PageHeading";

export default function page() {
  return (
    <>
      <PageHeading
        image="/contract.jpg"
        heading="Příklad nájemní smlouvy"
        text="Takto vypadá naše nájemní smlouva."
        datepickerExists={false}
      />
      <div className="flex w-full justify-center py-15 p-5">
        <div className="w-full max-w-wrapper flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <p className="">
              Uzavřená dle § 2201 a násl. zákona č. 89/2012 Sb., občanský
              zákoník
            </p>

            <p>Mezi smluvními stranami:</p>
            <div>
              <p className="font-semibold">1. Pronajímatel:</p>
              <p>Martin Doležal</p>
              <p>IČ: 10796509</p>
              <p>Sídlo: Víta Nejedlého 666/18, Praha 3, PSČ 130 00</p>
              <p>E-mail: info@grasston.cz</p>
              <p>(dále jen „pronajímatel“)</p>
            </div>
            <div>
              <p className="font-semibold">2. Nájemce:</p>
              <p>Jméno a příjmení: [doplnit]</p>
              <p>Adresa: [doplnit]</p>
              <p>Telefon: [doplnit]</p>
              <p>E-mail: [doplnit]</p>
              <p>(dále jen „nájemce“)</p>
            </div>
          </div>
          <div className="h-[1px] bg-borderGray"></div>
          <div className="flex flex-col gap-5">
            <h5>1. Předmět nájmu</h5>
            <p className="">
              Pronajímatel přenechává nájemci do dočasného užívání následující
              věci (dále jen „předmět nájmu“):
            </p>
            <ul className="list-disc ml-5">
              <li>
                [např. motorová sekačka, značka, typ, inventární číslo, stav,
                příslušenství]
              </li>
              <li>[další položky dle výpůjčky]</li>
            </ul>
            <p className="">
              Součástí jsou/nejsou i věci jednorázového prodeje. Tyto věci si
              nájemce po skončení nájmu nechává a nevztahují se na ně podmínky
              této smlouvy.
            </p>
            <p>
              Stav předmětu nájmu byl nájemcem zkontrolován při převzetí a
              potvrzen podpisem.
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>
          <div className="flex flex-col gap-5">
            <h5>2. Doba nájmu</h5>

            <p>Nájemní smlouva se uzavírá:</p>

            <ul className="list-disc ml-5">
              <li>od: [datum a čas]</li>
              <li>do: [datum a čas]</li>
            </ul>
            <p>
              Předmět nájmu je nutné vrátit včas a ve stavu odpovídajícím
              běžnému opotřebení.
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>3. Nájemné a vratná kauce</h5>

            <ul className="list-disc ml-5">
              <li>
                <p>
                  Celková cena za nájemné za výše uvedenou dobu a zbylé
                  jednorázové položky činí: [___] Kč
                </p>
              </li>
              <li>
                <p>Vratná kauce činí: [___] Kč</p>
              </li>
              <li>
                <p>
                  Kauce bude vrácena po předání kompletního, nepoškozeného
                  vybavení určeného k nájmu.
                </p>
              </li>
              <li>
                <p>
                  V případě poškození nebo ztráty může být použita k úhradě
                  škody.
                </p>
              </li>
            </ul>
            <p>Nájemné i kauce se platí předem, hotově nebo platební kartou.</p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>4. Práva a povinnosti smluvních stran</h5>

            <p className="font-semibold">Nájemce se zavazuje: </p>
            <ul className="list-disc ml-5">
              <li>
                používat předmět nájmu pouze k účelu, ke kterému je určen, a
                podle pokynů pronajímatele
              </li>
              <li>
                vrátit vybavení ve sjednaném termínu, vyčištěné a v původním
                stavu
              </li>
              <li>nahradit škodu vzniklou nedbalým zacházením nebo ztrátou,</li>
              <li>
                nepůjčovat předmět nájmu třetím osobám bez souhlasu
                pronajímatele
              </li>
            </ul>
            <p className="font-semibold">Pronajímatel se zavazuje:</p>
            <ul className="list-disc ml-5">
              <li>
                předat nájemci předmět nájmu ve funkčním a bezpečném stavu
              </li>
              <li>poskytnout základní instrukce k použití</li>
              <li>
                po vrácení vybavení bez závad vrátit kauci do 3 pracovních dnů
              </li>
            </ul>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>5. Odpovědnost za škodu</h5>

            <p>
              Nájemce odpovídá za škodu způsobenou nesprávným použitím, ztrátou
              či poškozením. V případě nevrácení v termínu může pronajímatel
              účtovat smluvní pokutu ve výši ceny jednoho dne výpůjčky (konrétně
              [___] Kč) za každý další den prodlení.
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>6. Závěrečná ustanovení</h5>

            <ul className="list-disc ml-5">
              <li>
                <p>Tato smlouva nabývá účinnosti podpisem obou stran.</p>
              </li>
              <li>
                <p>
                  Smlouva je vyhotovena ve dvou stejnopisech, každá strana
                  obdrží jeden.
                </p>
              </li>
              <li>
                <p>
                  Nájemce podpisem stvrzuje, že byl seznámen s provozními
                  podmínkami a pravidly bezpečného používání.
                </p>
              </li>
            </ul>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <p>V [místo], dne [datum]</p>
            <p className="font-semibold">Pronajímatel:</p>
            <p>.....................................................</p>
            <p>(podpis a jméno)</p>
            <p className="font-semibold">Nájemce:</p>
            <p>.....................................................</p>
            <p>(podpis a jméno)</p>
          </div>
        </div>
      </div>
    </>
  );
}
