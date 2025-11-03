'use client'

import Item from "@/app/week-10/shopping-list/item";
import {useState, useEffect} from "react";
import NewItem from "@/app/week-10/shopping-list/new-item";
import RecipeIdeas from "@/app/week-10/shopping-list/recipe-ideas";
import {getItems, addItem} from "@/app/week-10/_services/shopping-list-service"
import { useUserAuth } from "../_utils/auth-context";

export default function ItemList() {

  const [sortBy, setSortBy] = useState("name");
  const btnStyle = `flex-1 font-extrabold text-font-size-fluid-0 cursor-pointer border-2 border-custom-offWhite rounded-lg`;
  const [isCategorized, setIsCategorized] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [displayCategoryBtnError, setDisplayCategoryBtnError] = useState("hidden");
  const [items, setItems] = useState( []);
  const {user} = useUserAuth();

  const loadItems = async () => {
    if(user) {
      try{
        const itemsFromDB = await getItems(user.id);

        const returnedItemsFromDB = itemsFromDB.map((item) => ({
          id: item.id,
          ...item.data
        }));

        setItems(returnedItemsFromDB);
      } catch (error) {
        console.log("Load item error: ", error);
      }
    }
  }

  useEffect(() => {
    loadItems();
  }, [user]);

  const handleSortingItems = (newSortBy) => {
    if(isCategorized) {
      setDisplayCategoryBtnError("");
      console.log("Disable categorize checkbox")
      return;
    }
    setSortBy(newSortBy);

    setItems([...items].sort((a, b) => {
      if (newSortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (newSortBy === "category") {
        return a.category.localeCompare(b.category);
      }
      return 0;
    }));
  };

  const handleAddingItem = async (newItem) => {
    if(user && newItem !== null) {
      try {
        // remove the client-side 'id'  because Firestore will generate the permanent one.
        const { id, ...itemToSave } = newItem;

        const newItemId = await addItem(user.uid, itemToSave);

        // set state using the given Firestore ID
        setItems([...items, { id: newItemId, ...itemToSave }]);

      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  }

  const categories = [...items].reduce((acc, item) => {
    if (!acc.includes(item.category)) {
      acc.push(item.category);
    }
    return acc;
  }, []);

  const categorizedItems = categories.map(category => {
    return {
      category,
      items: items.filter(item => item.category === category)
    };
  });


  const handleCategorizedDisplay = () => {
    const newIsCategorized = !isCategorized;
    setIsCategorized(newIsCategorized);

    if (newIsCategorized) {
      setSortBy("name");
    } else if (displayCategoryBtnError === "") {
      setDisplayCategoryBtnError("hidden");
    }
  };

  const handleItemCheck = (itemId) => {
    setCheckedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };


  return (
    <div className="flex flex-col md:flex-row justify-center align-middle gap-8">
      <div className=" flex-2 flex flex-col gap-4 h-fit">
          <NewItem
          handleAddingNewItem={handleAddingItem}
          categoryList={categories}
        />
        <RecipeIdeas items={items}/>
      </div>
      <div className="flex-1 bg-custom-darker-green rounded-lg flex flex-col p-8">

        {/* **** Buttons Section *** */}
        <div className="flex flex-col gap-4 bg-custom-darkest-green p-4 rounded-t-lg">

          <div className="flex flex-col lg:flex-row gap-2 w-full ">
            <h3 className="font-extrabold">Sort by:</h3>
            <button
              className={`${btnStyle} ${sortBy === 'name' ? 'bg-custom-green' : 'bg-transparent'} text-font-size-fluid-0`}
              onClick={() => handleSortingItems("name")}
              disabled={sortBy === 'name'}
              value="name">
              name
            </button>
            <button
              className={`${btnStyle} ${sortBy === 'category' ? 'bg-custom-green' : 'bg-transparent'} text-font-size-fluid-0`}
              onClick={() => handleSortingItems("category")}
              disabled={sortBy === 'category' && !isCategorized}
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
          <ul className="flex flex-col gap-4 font-semibold bg-custom-green rounded-b-lg p-4">
            {/* Display regular list */}
            {items.map((item) => (
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

          :

          <div className="flex flex-col gap-4 font-semibold bg-custom-green rounded-b-lg p-4">
            {/* Display List in Sub-categories */}
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
    </div>
  );
}