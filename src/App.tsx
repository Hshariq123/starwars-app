import { useEffect, useState } from "react";
import api from "./services/api";
import type { Character } from "./types/Character";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

      {characters.map((character) => (
        <p key={character.url}>{character.name}</p>
      ))}
    </div>
  );
}

export default App;
