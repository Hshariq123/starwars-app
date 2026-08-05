import { useEffect, useState } from "react";
import api from "./services/api";
import type { Character } from "./types/Character";
import CharacterCard from "./components/CharacterCard";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 10;

  const lastCharacterIndex = currentPage * charactersPerPage;
  const firstCharacterIndex = lastCharacterIndex - charactersPerPage;

  const currentCharacters = characters.slice(
    firstCharacterIndex,
    lastCharacterIndex,
  );
  const totalPages = Math.ceil(characters.length / charactersPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get<Character[]>("/people");
        setCharacters(response.data);
      } catch {
        setError("Failed to fetch characters");
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Star Wars Characters</h1>

     <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    padding: "20px",
  }}
>
  {currentCharacters.map((character) => (
    <CharacterCard
      key={character.url}
      character={character}
    />
  ))}
</div>
      <div>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          style={{ padding: "5px" }}
        >
          Previous
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            style={{
              fontWeight: currentPage === pageNumber ? "bold" : "normal",
              backgroundColor:
                currentPage === pageNumber ? "#2563eb" : "#ffffff",
              color: currentPage === pageNumber ? "#ffffff" : "#000000",
              margin: "10px 4px",
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={lastCharacterIndex >= characters.length}
          style={{ padding: "5px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
