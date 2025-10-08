'use client'

import {useState} from "react";

export default function Item({ id, name, quantity, category, isChecked, onCheck }) {
    // const [isChecked, setChecked] = useState(false);

    const htmlString = `${name} ${quantity} ${category} `;

    const activeList = "bg-custom-darkest-green line-through";
    const inactiveList = "bg-transparent"

  return (
    <label className="cursor-pointer">
      <li className={`${isChecked ? activeList : inactiveList} rounded-sm border-2 border-custom-offWhite p-2 hover:bg-custom-green`}>
          <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheck(id)}
          className="mr-2"
          />

        {htmlString}
      </li>
    </label>
  );
}