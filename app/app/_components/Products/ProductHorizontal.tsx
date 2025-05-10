import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ProductProps = {
  item: {
    image: string;
    name: string;
    description: string;
    link: string;
    price: number;
  };
};

export default function ProductTabHorizontal({ item }: ProductProps) {
  const shortenedDescription = item.description.substring(0, 200) + "...";

  const days: number = 32;

  return (
    <div className="h-full grid grid-cols-[250px_1fr] shrink-0">
      <div
        style={{
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
        }}
        className="min-h-[250px] rounded-l-xl"
      >
        {" "}
      </div>
      <div className="border-y border-r rounded-r-xl p-5 flex flex-col gap-5 border-borderGray">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <p className="text-2xl font-semibold text-textPrimary">
              {item.name}
            </p>
            <p className="bg-primaryHover text-white px-2 py-1 rounded-md font-semibold text-sm">
              Dostupné
            </p>
          </div>
          <p className="text-textSecondary">{shortenedDescription}</p>
        </div>
        <div className="flex flex-col items-stretch gap-2">
          <p className="text-base font-semibold text-zinc-400">
            <span className="text-primary font-semibold text-xl">
              {item.price * days} Kč
            </span>{" "}
            / {days} {days < 2 && "den"}
            {days <= 4 && "dny"}
            {days > 4 && "dní"}
          </p>

          <div className="flex gap-2">
            <button className="bg-primary px-20 py-2 text-lg font-semibold rounded-md text-textLight cursor-pointer hover:bg-primaryHover transition-all ease-in-out col-span-4">
              Otevřít
            </button>
            <button className="col-span-1 px-10 border rounded-lg flex items-center justify-center border-zinc-300 text-textPrimary ease-in-out transition-all hover:bg-zinc-100 cursor-pointer">
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
