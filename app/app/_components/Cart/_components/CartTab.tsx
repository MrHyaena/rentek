import { DaterangeContext } from "@/app/_context/DaterangeContext";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

import { CartContext } from "@/app/_context/CartContext";
import { AvailabilityData } from "../../Availability/_functions/availabilityDataFunction";
import {
  addToCartFunction,
  removeFromCartFunction,
} from "../_functions/cartFunction";
import Availability from "../../Products/_components/Availability";

//Cart Item tab functional component
export function CartTab({
  product,
  timeslots,
}: {
  product: any;
  timeslots: any;
}) {
  const { daterange, numberOfDays, setNumberOfDays, saleIndex } =
    useContext(DaterangeContext);
  const { cart, setCart } = useContext(CartContext);
  const item = product.item;
  const price: any = Number(item.basePrice);
  const groupPrice = product.count * price;

  const { realAmount } = AvailabilityData(timeslots, item, daterange, cart);

  function isValid() {
    if (daterange.endIsValid == true && daterange.startIsValid == true) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <div className="flex flex-col border overflow-hidden rounded-lg border-borderGray">
        <div className="flex items-center gap-5 p-2 border-b border-borderGray">
          <div className="md:w-16 md:h-16 w-14 h-14 flex items-center justify-center p-1">
            <Image
              src={item.coverImage.formats.thumbnail.url}
              width={200}
              height={300}
              alt={"thumbnail-" + item.name}
              className=""
            />
          </div>
          <Link
            href={`/produkt/${item.documentId}`}
            className="md:text-base font-semibold"
            data-testid="productName"
          >
            {item.name}
          </Link>
        </div>
        <div className="flex gap-3 justify-between w-full bg-zinc-100 p-2">
          <div className="flex sm:flex-row flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <FaChevronDown
                onClick={() => {
                  removeFromCartFunction(cart, setCart, item);
                }}
                className="cursor-pointer bg-white p-1 rounded-full text-2xl text-textSecondary select-none"
              />
              <p data-testid="productCount" className="text-lg">
                {product.count}
              </p>
              <FaChevronUp
                className="cursor-pointer bg-white p-1 rounded-full text-2xl text-textSecondary select-none"
                onClick={() => {
                  if (realAmount > product.count) {
                    addToCartFunction(cart, setCart, item);
                  }
                }}
              />
            </div>
            <Availability timeslots={timeslots} item={item} />
          </div>
          {isValid() ? (
            <div className=" items-center gap-5 justify-self-end hidden md:flex">
              <p className="flex items-end flex-col font-semibold text-textSecondary">
                <span className="text-sm font-semibold text-textSecondary">
                  Před slevou{" "}
                  <span className="text-primaryHover">{groupPrice}</span> Kč
                </span>{" "}
                <span className="text-lg font-semibold text-textSecondary">
                  Po slevě{" "}
                  <span
                    className="text-primary"
                    data-testid="groupPriceAfterSale"
                  >
                    {groupPrice * saleIndex * numberOfDays}
                  </span>{" "}
                  Kč
                </span>{" "}
              </p>
            </div>
          ) : (
            <div className=" items-center gap-5 justify-self-end hidden md:flex">
              <p className="text-base font-semibold text-textSecondary">
                Od{" "}
                <span className=" font-semibold text-primary">
                  {groupPrice} Kč
                </span>{" "}
                za den {"(vč. DPH)"}
              </p>
            </div>
          )}
          <div className="flex items-center gap-5 justify-self-end md:hidden">
            <p className="flex gap-1 items-end font-semibold text-textSecondary">
              <span className="text-primary">{groupPrice * saleIndex}</span> Kč
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
