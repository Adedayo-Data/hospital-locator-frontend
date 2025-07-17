import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    // For now, just log it. Later we'll route to search or update map.
    console.log("Searching for:", query)
  }

  return (
    <section className="bg-white py-10 px-4 md:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
          Search for Hospitals Near You
        </h2>
        <p className="text-gray-600 mb-6">
          Enter a hospital name, city, or location to begin.
        </p>

        <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-md max-w-xl mx-auto border border-gray-200">
          <Search className="text-green-600 ml-3" />
          <input
            type="text"
            placeholder="Search by hospital or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-3 rounded-full focus:outline-none text-sm"
          />
          <Button
            className="bg-green-600 text-white rounded-full px-6 py-2 hover:bg-green-700"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </section>
  )
}
