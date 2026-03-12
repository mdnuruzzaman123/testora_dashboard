import Link from "next/link";
import { ROUTES } from "@/constants";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-950">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Testora Dashboard</h1>
      <p className="mt-4 text-gray-500 dark:text-gray-400">Welcome to the Testora admin panel.</p>
      <div className="mt-8">
        <Link
          href={ROUTES.LOGIN}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          Admin Sign in
        </Link>
      </div>
    </main>
  );
}
