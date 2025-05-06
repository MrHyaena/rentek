import Image from "next/image";
import Hero from "./_components/PageComponents/Hero";
import IconsColumns from "./_components/PageComponents/IconsColumns";
import Categories from "./_components/PageComponents/Categories";

export default function Home() {
  return (
    <>
      <div className="py-15 px-5 flex justify-center w-full flex-col items-center gap-30">
        <Hero />
        <IconsColumns />
        <Categories />
        <Hero />
      </div>
    </>
  );
}
