import Link from "next/link";


export default function Home() {
  const heading = "CPRG 306: Web Development 2 - Assignments";
  return(
    <section>
      <h1 className="text-font-size-fluid-1">{heading}</h1>
      <Link href="week-2" className="text-font-size-fluid-0">week-2</Link>
    </section>
  );
}