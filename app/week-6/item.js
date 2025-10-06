'use client'

import {useState} from "react";

export default function Item({ name, quantity, category }) {
    const htmlString = `${name} ${quantity} ${category} `;
    const [isChecked, setChecked] = useState(false);
    const activeList = "bg-custom-green"
    const inactiveList = "bg-transparent"
  return (
    <li className={`${isChecked ? activeList : inactiveList} rounded-sm border-2 border-custom-offWhite m-2 p-2 hover:scale-x-105`}>
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