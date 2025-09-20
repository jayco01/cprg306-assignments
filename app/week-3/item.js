'use client'

import {useState} from "react";

export default function Item({ name, quantity, category }) {
    const htmlString = `${name} ${quantity} ${category} `;
    const [isChecked, setChecked] = useState(false);
    const activeList = "m-2 p-2 bg-custom-green rounded-sm border-2 border-custom-offWhite"
    const inactiveList = "m-2 p-2 bg-transparent rounded-sm border-2 border-custom-offWhite"
  return (
    <li className={isChecked ? activeList : inactiveList}>
      <input
      type="checkbox"
      checked={isChecked}
      onChange={() => setChecked(!isChecked)}
      className="mr-2"
      />
      {htmlString}
    </li>
  );
}