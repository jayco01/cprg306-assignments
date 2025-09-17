export default function Item({ name, quantity, category }) {
  return (
    <>
      <li>name: {name}</li>
      <li>quantity: {quantity}</li>
      <li>category: {category}</li>
    </>
  );
}