import { useEffect, useState } from "react";

import CharacterCard from "./components/CharacterCard";
import CharacterModal from "./components/CharacterModal";

import api from "./services/api";

import type { Character } from "./types/Character";

const cardsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, 300px)",
  gap: "50px",
  justifyContent: "center",
  padding: "20px",
} as const;

const paginationStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "8px",
  margin: "30px 0",
} as const;

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] =
    useState<Character | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const charactersPerPage = 10;

  const firstCharacterIndex = (currentPage - 1) * charactersPerPage;
  const lastCharacterIndex = firstCharacterIndex + charactersPerPage;

  const currentCharacters = characters.slice(
    firstCharacterIndex,
    lastCharacterIndex
  );

  const totalPages = Math.ceil(characters.length / charactersPerPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<Character[]>("/people");

        setCharacters(response.data);
      } catch {
        setError("Failed to fetch characters.");
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
      <h1 style={{ marginBottom: "32px" }}>
        Star Wars Characters
      </h1>

      <div style={cardsGridStyle}>
        {currentCharacters.map((character) => (
          <CharacterCard
            key={character.url}
            character={character}
            onClick={setSelectedCharacter}
          />
        ))}
      </div>

      <div style={paginationStyle}>
        <button
          onClick={() => setCurrentPage((page) => page - 1)}
          disabled={currentPage === 1}
          style={{ padding: "6px 12px" }}
        >
          Previous
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            style={{
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight:
                currentPage === pageNumber ? "bold" : "normal",
              backgroundColor:
                currentPage === pageNumber
                  ? "#2563eb"
                  : "#ffffff",
              color:
                currentPage === pageNumber
                  ? "#ffffff"
                  : "#000000",
            }}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((page) => page + 1)}
          disabled={currentPage === totalPages}
          style={{ padding: "6px 12px" }}
        >
          Next
        </button>
      </div>

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
}

export default App;