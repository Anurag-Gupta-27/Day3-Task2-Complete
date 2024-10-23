"use client"; // Add this line to make it a client component
import { useState } from "react";
import ClientMap from "@/component/ClientMap";
import { Input } from "@/component/components/ui/input";
import { Button } from "@/component/components/ui/button";
import { Search } from "lucide-react";
import axios from "axios"; // Import Axios
import { genAI } from "utils/geminiconfig";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Geocoding: Get coordinates from LocationIQ
      const locationIQKey = process.env.NEXT_PUBLIC_LOCATIONIQ_KEY; // Replace with your actual API key
      const geocodeUrl = `https://us1.locationiq.com/v1/search.php?key=${locationIQKey}&q=${encodeURIComponent(searchQuery)}&format=json`;
      
      const geocodeResponse = await axios.get(geocodeUrl);
      if (geocodeResponse.data.length > 0) {
        const { lat, lon, display_name } = geocodeResponse.data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);
        setCoordinates([latitude, longitude]);
        setResponseMessage(`Coordinates: ${latitude}, ${longitude}. Address: ${display_name}`);
      } else {
        throw new Error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponseMessage("An error occurred while fetching data.");
      setCoordinates(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative">
      <ClientMap coordinates={coordinates} /> {/* Pass coordinates to ClientMap */}
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
            disabled={isLoading}
          >
            <Search className="h-6 w-6 text-white" />
          </Button>
        </form>
      </div>
      {isLoading && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[9999]">
          Loading...
        </div>
      )}
      {responseMessage && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[9999] w-[400px] bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">Response:</h2>
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
}
