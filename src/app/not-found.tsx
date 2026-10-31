import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-x mx-auto max-w-[1328px] py-32">
      <h1 className="h-display m-0 text-5xl">Page not found</h1>
      <p className="mb-8 mt-6 text-xl text-muted">That page doesn’t exist. Head back to the portfolio.</p>
      <Link href="/" className="btn btn-solid">Back to home</Link>
    </section>
  );
}
