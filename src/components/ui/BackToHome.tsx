import Link from "next/link";

export function BackToHome() {
  return (
    <Link
      href="/"
      className="absolute top-4 left-4 flex items-center gap-1 text-indigo-600 hover:text-indigo-800 z-50 p-2 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9m0 0l9 9m-9-9v18" />
      </svg>
      <span className="hidden sm:inline font-semibold">Home</span>
    </Link>
  );
}
