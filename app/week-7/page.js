import ItemList from "@/app/week-7/item-list";
import NewItem from "@/app/week-7/new-item";

export default function Page() {

  return (
    <section className="flex flex-col p-4">
      <h1 className="font-bold md:text-nowrap">Shopping List Manager</h1>
      <div className="flex flex-col md:flex-row justify-between align-middle gap-8">
        <div className={`flex-1`}>
          <NewItem />
        </div>
        <div className={`flex-1`}>
          <ItemList />
        </div>
      </div>
    </section>
  );
}