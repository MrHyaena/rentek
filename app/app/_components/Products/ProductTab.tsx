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

export default function ProductTab({ item }: ProductProps) {
  const shortenedDescription = item.description.substring(0, 120) + "...";

  const days: number = 32;

  return (
    <div className="h-full shrink-0">
      <div
        style={{
          backgroundImage: `url(${item.image})`,
          backgroundSize: "cover",
        }}
        className="min-h-[300px] rounded-t-xl"
      >
        {" "}
      </div>
      <div className="border-x border-b rounded-b-xl p-5 flex flex-col gap-10 border-borderGray">
        <div>
          <h5>{item.name}</h5>
          <p>{shortenedDescription}</p>
        </div>
        <div className="flex flex-col items-stretch gap-2">
          <p className="text-lg text-textSecondary">
            <span className="text-primary">{item.price * days} Kč</span> /{" "}
            {days} {days < 2 && "den"}
            {days <= 4 && "dny"}
            {days > 4 && "dní"}
          </p>

          <div className="grid grid-cols-5 gap-2">
            <button className="buttonSmall col-span-4">Otevřít</button>
            <button className="col-span-1 border rounded-lg flex items-center justify-center border-zinc-300 text-textPrimary ease-in-out transition-all hover:bg-zinc-100 cursor-pointer">
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
          </div>
          <p className="text-lg  self-center px-3 py-[2px] rounded-md text-primary">
            dostupné
          </p>
        </div>
      </div>
    </div>
  );
}
