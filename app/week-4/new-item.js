"use client";

import {useState} from "react";

export default function NewItem() {

  const [quantity, setQuantity] = useState(1);

  return (
    <div></div>
  )
}


const increment = (quantity) => {
  if (quantity >= 20) {
    setQuantity(quantity + 1);
  }
}
const decrement = (quantity) => {
  if (quantity <= 1) {
    setQuantity(quantity - 1);
  }
}