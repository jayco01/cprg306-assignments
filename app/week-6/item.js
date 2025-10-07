'use client'

import {useState} from "react";

export default function Item({ name, quantity, category }) {
    const [isChecked, setChecked] = useState(false);

    const htmlString = `${name} ${quantity} ${category} `;

    const activeList = "bg-custom-darkest-green line-through";
    const inactiveList = "bg-transparent"

  return (
    <li className={`${isChecked ? activeList : inactiveList} rounded-sm border-2 border-custom-offWhite m-2 p-2 hover:bg-custom-green`}>
      <label className="cursor-pointer p-2">
        <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setChecked(!isChecked)}
        className="mr-2"
        />
      </label>
      {htmlString}
    </li>
  );
}