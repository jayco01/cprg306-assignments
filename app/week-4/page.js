"use client";

import NewItem from "@/app/week-4/new-item";
import {useState} from "react";

export default function Page() {
  const [quantity, setQuantity] = useState(1);
  return (
    <NewItem/>
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