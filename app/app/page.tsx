import Image from "next/image";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <>
      <div className="py-15 flex justify-center w-full flex-col items-center gap-50">
        <Hero />
        <Hero />
      </div>
    </>
  );
}
