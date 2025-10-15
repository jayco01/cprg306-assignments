'use client';

import {useState} from "react";

export default function NewItem() {

  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");
  const [hasError, setHasError] = useState(false);
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

    if(name.trim() === "") {
      alert("Please enter a valid item name.");
      return;
    }

    const item = {
      name: name,
      category: category,
      quantity: getQuantityWithConstraint()
    }

    console.log(`Item name: ${item.name}, Catergory: ${item.category}, Quantity: ${item.quantity}`);
    alert(`Item name: ${item.name}, Catergory: ${item.category}, Quantity: ${item.quantity}`);

    setName("");
    setCategory("Produce");
    setQuantity(1);
    setHasError(false);
  }

  const categories = [
    "Produce", "Dairy", "Bakery", "Meat", "Frozen Foods",
    "Canned Goods", "Dry Goods", "Beverages", "Snacks",
    "Household", "Other"
  ]


  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center flex-col gap-4 bg-custom-darker-green p-8 rounded-lg"
    >

      <div className="flex justify-between items-center flex-row w-full gap-2 max-h-12">
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
          <select className="flex-1 text-font-size-fluid-1 bg-custom-dark-green p-2 rounded-lg">
            {categories.map((category) => (
              <option key={category} value={category} className="text-font-size-fluid-1"> {category}</option>
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
  )
}


