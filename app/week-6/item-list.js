'use client'

import Item from "@/app/week-6/item";
import {useState} from "react";

export default function ItemList() {

  const [sortBy, setSortBy] = useState("name");
  const btnStyle = `flex-1 font-extrabold text-font-size-fluid-0 cursor-pointer border-2 border-custom-offWhite rounded-lg`;
  const [isCategorized, setIsCategorized] = useState(false);
  const [isSortByNameDisabled, setIsSortByNameDisabled] = useState(true);
  const [isSortByCategoryDisabled, setIsSortByCategoryDisabled] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [displayCategoryBtnError, setDisplayCategoryBtnError] = useState("hidden");

  const items = [
    {
      "id": "1h2GJKH12gkHG31h1H",
      "name": "milk, 4 L 🥛",
      "quantity": 1,
      "category": "dairy"
    },
    {
      "id": "2KJH3k2j3H1k2J3K1H",
      "name": "bread 🍞",
      "quantity": 2,
      "category": "bakery"
    },
    {
      "id": "3h2KJH3k2j3H1k2J3",
      "name": "eggs, dozen 🥚",
      "quantity": 2,
      "category": "dairy"
    },
    {
      "id": "4k2J3K1H2GJKH12gk",
      "name": "bananas 🍌",
      "quantity": 6,
      "category": "produce"
    },
    {
      "id": "5H1h1H2KJH3k2j3H",
      "name": "broccoli 🥦",
      "quantity": 3,
      "category": "produce"
    },
    {
      "id": "6H1k2J3K1H2GJKH1",
      "name": "chicken breasts, 1 kg 🍗",
      "quantity": 1,
      "category": "meat"
    },
    {
      "id": "7gkHG31h1H2KJH3k",
      "name": "pasta sauce 🍝",
      "quantity": 3,
      "category": "canned goods"
    },
    {
      "id": "8j3H1k2J3K1H2GJK",
      "name": "spaghetti, 454 g 🍝",
      "quantity": 2,
      "category": "dry goods"
    },
    {
      "id": "9H12gkHG31h1H2KJ",
      "name": "toilet paper, 12 pack 🧻",
      "quantity": 1,
      "category": "household"
    },
    {
      "id": "10H3k2j3H1k2J3K1",
      "name": "paper towels, 6 pack",
      "quantity": 1,
      "category": "household"
    },
    {
      "id": "11k2J3K1H2GJKH12",
      "name": "dish soap 🍽️",
      "quantity": 1,
      "category": "household"
    },
    {
      "id": "12GJKH12gkHG31h1",
      "name": "hand soap 🧼",
      "quantity": 4,
      "category": "household"
    }
  ];

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const categories = [...items].reduce((acc, item) => {
    if (!acc.includes(item.category)) {
      acc.push(item.category);
    }
    return acc;
  }, []);
  // console.log("Available categories: " +categories);

  const categorizedItems = categories.map(category => {
    return {
      category,
      items: sortedItems.filter(item => item.category === category)
    };
  });
  // console.log("Categorized items: ", categorizedItems);


  const handleCategorizedDisplay = () => {
    setIsCategorized(!isCategorized);

    if (!isCategorized) {
      setSortBy("name");
    } else {
        if(displayCategoryBtnError === "") {
          setDisplayCategoryBtnError("hidden");
        }
      setIsSortByNameDisabled(true);
      setIsSortByCategoryDisabled(false);
    }
  }

  const handleSortChange = (e) => {
    handleCategoryBtnError();
    if(isCategorized) {
      console.log("Disable categorize checkbox")
      return;
    }

    setSortBy(e.target.value);
    if (e.target.value === "name") {
      setIsSortByNameDisabled(true);
      setIsSortByCategoryDisabled(false);
    } else {
      setIsSortByNameDisabled(false);
      setIsSortByCategoryDisabled(true);
    }
  };

  const handleItemCheck = (itemId) => {
    setCheckedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const handleCategoryBtnError = () => {
    if(isCategorized) {
      setDisplayCategoryBtnError("");
    } else {
      setDisplayCategoryBtnError("hidden");
    }
  }



  return (
    <div className=" bg-custom-green rounded-lg flex flex-col p-8">

      {/* **** Buttons Section *** */}
      <div className="flex flex-col gap-4 bg-custom-darkest-green p-4 rounded-t-lg">

        <div className="flex flex-col md:flex-row gap-2 w-full">
          <h3 className="font-extrabold">Sort by:</h3>
          <button
            className={`${btnStyle} ${sortBy === 'name' ? 'bg-custom-green' : 'bg-transparent'}`}
            onClick={ handleSortChange }
            disabled={isSortByNameDisabled}
            value="name">
            name
          </button>
          <button
            className={`${btnStyle} ${sortBy === 'category' ? 'bg-custom-green' : 'bg-transparent'}`}
            onClick={!isCategorized ? handleSortChange : handleCategoryBtnError}
            disabled={isSortByCategoryDisabled}
            value="category">
            category
          </button>
        </div>

        <div className="min-h-1 w-full">
          <p className={`${displayCategoryBtnError} text-red-700`}> Uncheck &#34;Display items by Categories&#34;</p>
        </div>

        <div className="flex flex-row gap-2 w-full font-semibold align-middle">
          <p className="text-font-size-fluid-0">Display items by Categories: </p>
          <label className="px-2 flex flex-row align-middle">
            <input
              type="checkbox"
              onChange={handleCategorizedDisplay}/>
          </label>
        </div>

      </div>

      {/* ****List section*** */}
      {(!isCategorized) ?
        <ul className="flex flex-col gap-4 font-semibold bg-custom-darker-green rounded-b-lg p-4">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              isChecked={checkedItems.includes(item.id)}
              onCheck={handleItemCheck}>
            </Item>
          ))}
        </ul> :
        <div className="flex flex-col gap-4 font-semibold bg-custom-darker-green rounded-b-lg p-4">
          {categorizedItems.map((catItem) => (
            <div key={catItem.category}>
              <h3
                className="font-semibold capitalize"
              >
                {catItem.category}
              </h3>
              <ul>
                {catItem.items.map((item) => (
                  <Item
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                    isChecked={checkedItems.includes(item.id)}
                    onCheck={handleItemCheck}>
                  </Item>
                ))}
              </ul>
            </div>
          ))
          }
        </div>
      }
    </div>
  );
}