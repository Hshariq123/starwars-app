import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
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
      return "#BFDBFE"; // Soft Blue

    case "Droid":
      return "#E5E7EB"; // Light Gray

    case "Wookiee":
      return "#E7C9A9"; // Warm Beige

    case "Rodian":
      return "#D9F99D"; // Soft Lime

    case "Hutt":
      return "#FDE68A"; // Soft Gold

    case "Ewok":
      return "#BBF7D0"; // Mint Green

    default:
      return "#E9D5FF"; // Lavender
  }
};

 return (
  <motion.div
    whileHover={{
    scale: 1.05,
    y: -8,
  }}
  transition={{
    duration: 0.3,
  }}
    style={{
      backgroundColor: getCardColor(),
      padding: "16px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
border: "1px solid rgba(255,255,255,0.5)",
overflow: "hidden",
        cursor: "pointer",

        maxWidth: "300px"
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

    <h3
     style={{
    color: "#111827",
    marginTop: "12px",
    marginBottom: 0,
    fontSize: "1.2rem",
    fontWeight: 700,
  }}
    >{character.name}</h3>
  </motion.div>
);
}

export default CharacterCard;