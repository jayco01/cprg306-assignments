

import ItemList from "@/app/week-8/item-list";
import RecipeIdeas from "@/app/week-8/recipe-ideas";

export default function Page() {

  return (
    <section className="flex flex-col p-4">
      <h1 className="font-bold md:text-nowrap text-center">Shopping List Manager</h1>
          <ItemList/>

    </section>
  );
}