import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

//Functional component for creating Additions tabs in cart
export function AdditionsTab({
  product,
  additions,
  setAdditions,
}: {
  product: any;
  additions: any;
  setAdditions: any;
}) {
  const newProduct = product;
  const item = newProduct.item;
  const price = Number(item.basePrice);

  const groupPrice = newProduct.count * price;

  //Functions for adding and removing additions from cart
  function AddToAdditionsCart() {
    const productIndex = additions.findIndex(
      (newItem: any) => newItem.item.name == item.name
    );
    const newProduct = additions[productIndex];
    newProduct.count = newProduct.count + 1;
    const newArray = additions;
    newArray[productIndex] = newProduct;
    setAdditions([...newArray]);
    localStorage.setItem("additionsCart", JSON.stringify(newArray));
  }

  function RemoveFromAdditionsCart() {
    const productIndex = additions.findIndex(
      (newItem: any) => newItem.item.name == item.name
    );
    const newProduct = additions[productIndex];
    if (newProduct.count > 0) {
      newProduct.count = newProduct.count - 1;
    }
    const newArray = additions;
    newArray[productIndex] = newProduct;
    setAdditions([...newArray]);
    localStorage.setItem("additionsCart", JSON.stringify(newArray));
  }

  return (
    <>
      <div className="flex flex-col border overflow-hidden rounded-lg border-borderGray">
        <div className="flex items-center gap-5 p-2 border-b border-borderGray bg-white">
          <div className="md:w-16 md:h-16 w-10 h-10 flex items-center justify-center p-1">
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
          >
            {item.name}
          </Link>
        </div>
        <div className="flex gap-3 justify-between w-full bg-zinc-100 p-2">
          <div className="flex items-center gap-3">
            <FaChevronDown
              onClick={() => {
                RemoveFromAdditionsCart();
              }}
              className="cursor-pointer bg-white p-1 rounded-full text-2xl text-textSecondary select-none"
            />
            <p className="text-lg">{newProduct.count}</p>
            <FaChevronUp
              className="cursor-pointer bg-white p-1 rounded-full text-2xl text-textSecondary select-none"
              onClick={() => {
                AddToAdditionsCart();
              }}
            />
          </div>
          <div className=" items-center gap-5 justify-self-end hidden md:flex">
            <p className="flex items-end flex-col font-semibold text-textSecondary">
              <span className="text-lg font-semibold text-textSecondary">
                <span className="text-primary">{groupPrice}</span> Kč
              </span>{" "}
            </p>
          </div>
          <div className="flex items-center gap-5 justify-self-end md:hidden">
            <p className="flex gap-1 items-end font-semibold text-textSecondary">
              <span className="text-primary">{groupPrice}</span> Kč
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
