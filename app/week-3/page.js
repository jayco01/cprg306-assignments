import ItemList from "@/app/week-3/item-list";

export default function Page() {
  return (
    <main className="max-w-lg mx-auto min-h-screen flex flex-col justify-center p-8 bg-custom-dark-green">
      <h1 className="font-bold">Shopping List</h1>
      <ItemList/>
    </main>
  );
}