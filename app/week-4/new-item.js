'use client';

import {useState} from "react";

export default function NewItem() {

  const [quantity, setQuantity] = useState(1);

  const increment = (quantity) => {
    console.log(quantity + "test increment");
    if (quantity <= 20) {
      setQuantity(quantity + 1);
    }
  }
  const decrement = (quantity) => {
    console.log(quantity + "test decrement");
    if (quantity >= 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <section>
      <h2>
        Quantity: <span>{quantity}</span>
      </h2>
      <div>

        <button
          disabled={quantity >= 20 }
          onClick={() => increment(quantity)}>
          +
        </button>

        <button
          disabled={ quantity <= 1 }
          onClick={() => decrement(quantity)}>
          -
        </button>

      </div>
    </section>
  )
}


