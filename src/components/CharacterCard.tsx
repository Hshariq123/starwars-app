import { useEffect, useState } from "react";
import axios from "axios";
import type { Character } from "../types/Character";

interface CharacterCardProps {
  character: Character;
}

function CharacterCard({ character }: CharacterCardProps) {
  const [speciesName, setSpeciesName] = useState("Unknown");

  useEffect(() => {
    const fetchSpecies = async () => {
      if (character.species.length === 0) {
        setSpeciesName("Human");
        return;
      }

      try {
        const response = await axios.get(character.species[0]);
        setSpeciesName(response.data.name);
      } catch {
        setSpeciesName("Unknown");
      }
    };

    fetchSpecies();
  }, [character.species]);

  const getCardColor = () => {
  switch (speciesName) {
    case "Human":
      return "#60a5fa";

    case "Droid":
      return "#9ca3af";

    case "Wookiee":
      return "#b45309";

    case "Rodian":
      return "#65a30d";

    case "Hutt":
      return "#ca8a04";

    case "Ewok":
      return "#16a34a";

    default:
      return "#7c3aed";
  }
};

 return (
  <div
    style={{
      backgroundColor: getCardColor(),
      padding: "16px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      transition: "transform 0.3s ease",
    }}
  >
    <img
      src={`https://picsum.photos/200/300?random=${encodeURIComponent(
        character.name
      )}`}
      alt={character.name}
      style={{
        width: "100%",
        height: "300px",
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />

    <h3>{character.name}</h3>
  </div>
);
}

export default CharacterCard;