"use client"; // Add this line to make it a client component

import { useState } from "react";
import ClientMap from "@/component/ClientMap";
import { Input } from "@/component/components/ui/input";
import { Button } from "@/component/components/ui/button";
import { Search } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    console.log("Input updated:", newValue);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search button pressed");
    console.log("Performing operations on:", searchQuery);
    // Add your search logic here
    // For example:
    // searchMap(searchQuery);
    // or
    // fetchDataForLocation(searchQuery);
  };

  return (
    <div className="h-screen w-full relative">
      <ClientMap />
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-[400px]">
        <form onSubmit={handleSearch} className="flex shadow-lg overflow-hidden bg-white rounded-lg w-full">
          <Input 
            type="search" 
            placeholder="Search..." 
            className="flex-grow border-none rounded-l-lg focus:ring-0 h-12 text-lg px-4"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <Button 
            type="submit" 
            className="bg-[#4779EC] px-5 rounded-r-lg h-12 flex items-center justify-center"
          >
            <Search className="h-6 w-6 text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
}
