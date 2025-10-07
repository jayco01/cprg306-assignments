import ItemList from "@/app/week-6/item-list";

export default function Page() {
  return (
    <section className="max-w-lg mx-auto min-h-screen flex flex-col justify-center p-8">
      <h1 className="font-bold">Shopping List</h1>
      <ItemList/>
    </section>
  );
}