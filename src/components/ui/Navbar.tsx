"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur text-white">
      <Link href="/" className="text-2xl font-semibold">
        RepairBuddy
      </Link>
      <nav className="flex gap-4">
        <Link href="/">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Home
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Contact Us
          </Button>
        </Link>
        <Link href="/login">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Login
          </Button>
        </Link>
      </nav>
    </header>
  );
}
