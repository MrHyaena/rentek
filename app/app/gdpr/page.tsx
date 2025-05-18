import React from "react";
import PageHeading from "../_components/Headings/PageHeading";

export default function page() {
  return (
    <>
      <PageHeading
        image="/contract.jpg"
        heading="Podmínky ochrany osobních údajů"
        text="Na bezpečí vašich dat nám záleží!"
        datepickerExists={false}
      />
      <div className="flex w-full justify-center py-15 p-5">
        <div className="w-full max-w-wrapper flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h5>1. Správce osobních údajů</h5>
            <div className=" text-textPrimary">
              <p className="font-semibold">
                Grasston – půjčovna zahradní techniky
              </p>
              <p>
                Správcem osobních údajů je Martin Doležal, IČO: 10796509, sídlo:
                Víta Nejedlého 666/18, Praha 3, PSČ 130 00, E-mail:
                info@grasston.cz (dále jen „správce“ nebo „my“)
              </p>
              <p>Platné od: 5.5.2024</p>
            </div>
            <p>
              Tento dokument popisuje, jakým způsobem zpracováváme osobní údaje
              zákazníků a návštěvníků webu www.grasston.cz (dále jen „web“), a
              jak chráníme jejich soukromí v souladu s nařízením Evropského
              parlamentu a Rady (EU) 2016/679, obecně známým jako GDPR.
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>
          <div className="flex flex-col gap-5">
            <h5>2. Jaké osobní údaje zpracováváme</h5>

            <p>
              Při využívání našich služeb zpracováváme následující osobní údaje:
            </p>
            <p>
              Nájemce si vybírá techniku přes webový formulář, e-mailem nebo
              telefonicky.
            </p>
            <ul className="list-disc ml-5">
              <li>jméno a příjmení</li>
              <li>e-mailová adresa</li>
              <li>telefonní číslo</li>
              <li>fakturační a doručovací adresa</li>
              <li>informace o rezervacích a výpůjčkách</li>
              <li>
                platební údaje (prostřednictvím Stripe – nedisponujeme číslem
                karty)
              </li>
              <li>
                IP adresa, zařízení, prohlížeč, jazyk, chování na webu (v rámci
                analytiky a cookies)
              </li>
            </ul>
            <p>
              Tyto údaje zpracováváme buď přímo od vás (např. přes rezervační
              formulář), nebo automatizovaně pomocí technologií třetích stran.
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>3. Účely a právní základy zpracování</h5>

            <p>
              Vaše údaje zpracováváme na základě následujících právních důvodů:
            </p>
            <table className="max-w-[500px] ">
              <tbody>
                <tr className="border border-zinc-300 font-semibold">
                  <td className="p-2 border-r border-zinc-300">
                    Účel zpracování
                  </td>
                  <td className="p-2"> Právní základ</td>
                </tr>
                <tr className="border border-zinc-300">
                  <td className="p-2 border-r border-zinc-300">
                    Vyřízení rezervace a výpůjčky
                  </td>
                  <td className="p-2"> Plnění smlouvy</td>
                </tr>
                <tr className="border border-zinc-300">
                  <td className="p-2 border-r border-zinc-300">
                    Fakturace, účetnictví
                  </td>
                  <td className="p-2"> Plnění právní povinnosti</td>
                </tr>
                <tr className="border border-zinc-300">
                  <td className="p-2 border-r border-zinc-300">
                    Komunikace se zákazníky
                  </td>
                  <td className="p-2">Oprávněný zájem</td>
                </tr>
                <tr className="border border-zinc-300">
                  <td className="p-2 border-r border-zinc-300">
                    Odesílání marketingových sdělení
                  </td>
                  <td className="p-2">Souhlas (udělený samostatně)</td>
                </tr>
                <tr className="border border-zinc-300">
                  <td className="p-2 border-r border-zinc-300">
                    Analýza návštěvnosti a vylepšení webu
                  </td>
                  <td className="p-2">Oprávněný zájem / souhlas (cookies)</td>
                </tr>
              </tbody>
            </table>
            <p>
              Souhlas pro marketing lze kdykoliv odvolat kliknutím na odkaz v
              e-mailu nebo kontaktováním správce.
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>4. Příjemci a zpracovatelé údajů</h5>

            <p>
              Vaše údaje mohou být zpřístupněny následujícím důvěryhodným
              partnerům:
            </p>
            <ul className="list-disc ml-5">
              <li>
                <p>
                  <span className="font-semibold">
                    Stripe Payments Europe Ltd.{" "}
                  </span>
                  - zpracování plateb (Irsko)
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold">Vercel Inc.</span>- hosting
                  webového rozhraní (EU servery)
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold">Heroku</span>- hosting
                  serverové části a databáze (EU servery)
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold">Pipedrive OÜ</span>– CRM
                  systém pro správu zákaznických vztahů (Estonsko)
                </p>
              </li>
              <li>
                <p>
                  <span className="font-semibold">
                    Marketingový nástroj pro newsletter{" "}
                  </span>
                  - (např. MailerLite, pokud bude použit)
                </p>
              </li>
            </ul>
            <p>
              Všichni tito partneři zpracovávají údaje dle našich pokynů a v
              souladu s GDPR.
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>5. Doba uchovávání údajů</h5>

            <p>Osobní údaje uchováváme pouze po nezbytnou dobu:</p>
            <ul className="list-disc ml-5">
              <li>
                <p>
                  údaje k rezervacím: po dobu trvání smluvního vztahu a následně
                  10 let dle zákonných požadavků (např. účetnictví)
                </p>
              </li>
              <li>
                <p>
                  marketingové údaje (e-mail, jméno): do odvolání souhlasu nebo
                  odhlášení odběru
                </p>
              </li>
              <li>
                <p>
                  analytické a technické údaje: max. 14 měsíců, dle nastavení
                  nástroje
                </p>
              </li>
            </ul>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>6. Cookies</h5>

            <p>Web využívá soubory cookies pro:</p>
            <ul className="list-disc ml-5">
              <li>
                <p>funkční provoz (např. uložení jazyka nebo obsahu košíku)</p>
              </li>
              <li>
                <p>měření návštěvnosti (např. Google Analytics)</p>
              </li>
              <li>
                <p>marketing (např. Facebook Pixel, remarketing)</p>
              </li>
            </ul>
            <p>
              Podrobnosti a možnost odmítnutí jsou uvedeny v samostatném
              dokumentu Zásady používání cookies (doplň na web).
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>7. Vaše práva</h5>

            <p>Jako subjekt údajů máte tato práva:</p>
            <ul className="list-disc ml-5">
              <li>
                <p>právo na přístup k údajům</p>
              </li>
              <li>
                <p>právo na opravu nepřesných údajů</p>
              </li>
              <li>
                <p>právo na výmaz („právo být zapomenut“)</p>
              </li>
              <li>
                <p>právo na omezení zpracování</p>
              </li>
              <li>
                <p>právo na přenositelnost údajů</p>
              </li>
              <li>
                <p>právo vznést námitku proti zpracování</p>
              </li>
              <li>
                <p>právo kdykoliv odvolat souhlas (např. s marketingem)</p>
              </li>
            </ul>
            <p>
              Pro uplatnění svých práv nás kontaktujte na e-mailu uvedeném výše.
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>8. Zabezpečení údajů</h5>

            <p>
              Vaše údaje chráníme pomocí moderních technických a organizačních
              opatření:
            </p>
            <ul className="list-disc ml-5">
              <li>
                <p>zabezpečený přenos dat přes HTTPS</p>
              </li>
              <li>
                <p>přístup pouze oprávněným osobám</p>
              </li>
              <li>
                <p>pravidelné zálohování a aktualizace systému</p>
              </li>
              <li>
                <p>hesla vytvořená podle nejlepších praktik</p>
              </li>
            </ul>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>9. Změny zásad</h5>

            <p>
              Vyhrazujeme si právo tyto zásady upravit, pokud dojde ke změně
              zpracování nebo právních požadavků. O zásadních změnách vás budeme
              informovat e-mailem nebo oznámením na webu.
            </p>
          </div>
          <div className="h-[1px] bg-borderGray"></div>

          <div className="flex flex-col gap-5">
            <h5>10. Kontakt</h5>

            <p>Máte dotazy nebo chcete uplatnit svá práva?</p>
            <p>Napište nám na: info@grasston.cz</p>
          </div>
        </div>
      </div>
    </>
  );
}
