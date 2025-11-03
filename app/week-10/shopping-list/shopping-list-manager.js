import ItemList from "@/app/week-10/shopping-list/item-list";

export default function ShoppingListManager({ children }) {

  return (
    <section className="flex flex-col p-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold md:text-nowrap">Shopping List Manager</h1>
        {children}
      </div>
      <ItemList/>
    </section>
  );
}