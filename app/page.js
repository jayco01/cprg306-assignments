import Link from "next/link";


export default function Home() {
  const heading = "CPRG 306: Web Development 2 - Assignments";
  return(
    <section className="bg-">
      <h1>{heading}</h1>
      <Link href="week-2">week-2</Link>
    </section>
  );
}