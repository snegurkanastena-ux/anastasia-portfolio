import Link from "next/link";
import { StubHeading } from "@/components/layout/StubHeading";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <StubHeading pageKey="pages.notFound" />
      <p className="mt-6 text-sm text-muted">
        <Link
          href="/"
          className="text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          ← Home
        </Link>
      </p>
    </div>
  );
}
