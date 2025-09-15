import Link from "next/link";

export default function StudentInfo() {
  const githubRepo = "https://github.com/jayco01";

  return (
    <section>
      <h2>Jay Layco</h2>
      <Link href={githubRepo}>https://github.com/jayco01</Link>
    </section>
  );
}