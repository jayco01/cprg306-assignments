'use client';

import {useState} from "react";

import { v4 as uuidv4 } from 'uuid';

export default function NewItem({ handleAddingNewItem, categoryList }) {

  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [hasError, setHasError] = useState(false);

  const categories = categoryList;
  const maxQuantity = 20;
  const minQuantity = 1;

  const btnStyle = `flex-1 font-extrabold text-font-size-fluid-1 cursor-pointer border-2 border-custom-offWhite rounded-lg txt-start max-w-8`;

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!name) {
      alert("Please enter a valid item name.");
      return;
    }

    handleAddingNewItem({
      id: uuidv4(),
      name: name,
      quantity: getQuantityWithConstraint(),
      category: category
    });

    const item = {
      id: uuidv4(),
      name: name,
      quantity: getQuantityWithConstraint(),
      category: category
    }

    console.log(`Item name: ${item.name}, Category: ${item.category}, Quantity: ${item.quantity}, Item Id: ${item.id}`);

    setName(null);
    setCategory(null);
    setQuantity(1);
    setHasError(false);
  }



  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col gap-4 bg-custom-darker-green p-8 rounded-lg"
      >

        <div className="flex justify-between items-start flex-col w-full gap-2 h-min">
          <div className="flex-1 flex justify-start items-center flex-row gap-2 h-full">
            <h3>Name:</h3>
            <label htmlFor="item-name" className="text-font-size-fluid-1">
              <input
                id="item-name"
                type="text"
                value={name}
                onChange={event => setName(event.target.value)}
                className="text-font-size-fluid-1 max-w-3/4 bg-custom-dark-green  border-2 border-transparent  focus:border-custom-offWhite rounded-lg p-2 h-full focus:shadow-custom-dark-green focus:shadow-md"
                required
              />
            </label>
          </div>

          <div>
            <span className="text-font-size-fluid-1">Category: </span>
            <select
              className="flex-1 text-font-size-fluid-1 bg-custom-dark-green p-2 rounded-lg"
              onChange={event => setCategory(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category}
                        value={category}
                        className="text-font-size-fluid-1"
                > {category}</option>
              ))}
            </select>
          </div>
        </div>


        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row w-full gap-4">
            <h3 className="text-start">
              Quantity:

            </h3>
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex items-center flex-row w-full gap-2">
                <button
                  className={`${btnStyle} ${(quantity === maxQuantity ? "bg-custom-green" : "bg-transparent")}`}
                  disabled={quantity > maxQuantity}
                  onClick={() => increment(quantity)}
                  type="button"
                >
                  +
                </button>

                <section>{getQuantityWithConstraint()}</section>

                <button
                  className={`${btnStyle} ${(quantity === minQuantity ? "bg-custom-green" : "bg-transparent")} `}
                  disabled={quantity < minQuantity}
                  onClick={() => decrement(quantity)}
                  type="button"
                >
                  -
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="self-end text-font-size-fluid-1 cursor-pointer border-2 border-custom-offWhite rounded-lg p-2 hover:bg-custom-darkest-green"
          >
            Submit
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

      </form>
    </div>
  )
}


