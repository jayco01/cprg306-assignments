import Link from "next/link";

export default function StudentInfo() {
  const githubRepo = "https://github.com/jayco01/cprg306-assignments.git";

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h2>Jay Layco</h2>
      <Link className="text-font-size-fluid-0" href={githubRepo}>https://github.com/jayco01/cprg306-assignments.git</Link>
    </div>
  );
}
