

import NewItem from "@/app/week-7/new-item";
import ItemList from "@/app/week-7/item-list";

export default function Page() {

  return (
    <section className="flex flex-col p-4">
      <h1 className="font-bold md:text-nowrap text-center">Shopping List Manager</h1>
          <ItemList/>

    </section>
  );
}