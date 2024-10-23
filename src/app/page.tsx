"use client"; // Add this line to make it a client component
import { useState } from "react";
import ClientMap from "@/component/ClientMap";
import { Input } from "@/component/components/ui/input";
import { Button } from "@/component/components/ui/button";
import { Search } from "lucide-react";
import { genAI } from "@/utils/geminiconfig";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");
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
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Generate coordinates of the location: ${searchQuery}. Return only the numbers separated by a comma.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const [lat, lng] = text.split(",").map(Number);
      if (!isNaN(lat) && !isNaN(lng)) {
        setCoordinates([lat, lng]);
        setGeminiResponse(`Coordinates: ${lat}, ${lng}`);
      } else {
        throw new Error("Invalid coordinates received");
      }
    } catch (error) {
      console.error("Error fetching data from Gemini:", error);
      setGeminiResponse("An error occurred while fetching data.");
      setCoordinates(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative">
      <ClientMap coordinates={coordinates} />
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
      {geminiResponse && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[9999] w-[400px] bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">Gemini Response:</h2>
          <p>{geminiResponse}</p>
        </div>
      )}
    </div>
  );
}
