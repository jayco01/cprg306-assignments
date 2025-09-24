'use client';

import {useState} from "react";

export default function NewItem() {

  const [quantity, setQuantity] = useState(1);
  const [hasError, setHasError] = useState(false);
  const maxQuantity = 20;
  const minQuantity = 1;

  const btnStyle = `flex-1 font-extrabold text-font-size-fluid-2 cursor-pointer border-2 border-custom-offWhite rounded-lg m-4`;

  const increment = (quantity) => {
    console.log(quantity + " test increment");
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
      setHasError(false);
    } else {
      console.log(hasError + " error test");
      setHasError(true);
    }
  }
  const decrement = (quantity) => {
    console.log(quantity + " test decrement");
    if (quantity > minQuantity) {
      setQuantity(quantity - 1);
      setHasError(false);
    } else {
      console.log(hasError + " error test");
      setHasError(true);
    }
  }

  const getQuantityWithConstraint = () => {
    if (quantity < minQuantity) {
      return minQuantity;
    } else if (quantity > maxQuantity) {
      return maxQuantity;
    } else {
      return quantity;
    }
  }



  return (
    <section className="flex justify-center items-center flex-col gap-2 bg-custom-dark-green p-4 rounded-lg">
      <h2>
        Quantity:
        <span>{getQuantityWithConstraint()}</span>
      </h2>
      <div className="flex justify-around items-center flex-row  min-w-xl w-full gap-4">

        <button
          className={`${btnStyle} ${(quantity === maxQuantity ? "bg-custom-green":"bg-transparent") } `}
          disabled={ quantity > maxQuantity }
          onClick={() => increment(quantity)}>
          +
        </button>

        <button
          className={`${btnStyle} ${(quantity === minQuantity ? "bg-custom-green":"bg-transparent") } `}
          disabled={ quantity < minQuantity }
          onClick={() => decrement(quantity)}>
          -
        </button>

      </div>

      <div>

        {hasError ? (
          <p className="text-red-400 font-bold">
            {`Quantity must be between ${minQuantity} and ${maxQuantity}`}
          </p>
        ) : (
          <p className="text-custom-offWhite font-bold">
            Please select a quantity
          </p>
        )}

      </div>
    </section>
  )
}


