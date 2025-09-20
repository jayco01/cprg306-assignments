import Link from "next/link";


export default function Home() {
  const heading = "CPRG 306: Web Development 2 - Assignments";
  return(
    <section className="h-screen w-full flex flex-col justify-center items-center">
      <h1>{heading}</h1>

      <Link href="week-2" className="text-font-size-fluid-2 hover:scale-x-105">week-2
      </Link>

      <Link href="week-3" className="text-font-size-fluid-2 hover:scale-x-105">
        week-3
      </Link>

    </section>
  );
}