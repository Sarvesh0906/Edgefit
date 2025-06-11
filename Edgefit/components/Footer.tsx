import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t mt-auto bg-brand-dark text-white">
      <div className="container flex flex-col gap-2 sm:flex-row py-6 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <Dumbbell className="h-6 w-6" />
          <span className="text-xl">EdgeFit-AI </span>
        </div>

        {/* divider */}
        <div className="bg-brand-light h-[1px] w-[80%] mx-auto sm:hidden">
          <div className="border-b border-white"></div>
        </div>

        <div className="italic">
        &copy; {new Date().getFullYear()} - All Rights Reserved
        </div>
      </div>
    </footer>
  )
}