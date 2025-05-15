"use client";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import { Sellers } from "./(components)/sellers";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SellerPage() {
  const {
    delayedSearch: search,
    handleSearchChange,
    searchValue,
  } = useDebouncedSearch();
  return (
    <div className=" mx-auto p-6 sm:px-16 xl:px-32">
      <h1 className="text-4xl font-bold mb-8">Our Trusted Sellers</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Browse through our verified sellers and discover quality products from
        businesses you can trust. Each seller is rated based on customer
        satisfaction and sales performance.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-between my-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search sellers..."
            className="pl-8"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>
      <Sellers search={search} />
    </div>
  );
}
