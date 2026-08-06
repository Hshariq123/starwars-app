import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import api from "../services/api";

import type { Character } from "../types/Character";

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

interface Species {
  name: string;
}

const SPECIES_COLORS: Record<string, string> = {
  Human: "#BFDBFE",
  Droid: "#E5E7EB",
  Wookiee: "#E7C9A9",
  Rodian: "#D9F99D",
  Hutt: "#FDE68A",
  Ewok: "#BBF7D0",
};

function CharacterCard({ character, onClick }: CharacterCardProps) {
  const [speciesName, setSpeciesName] = useState("Unknown");

  useEffect(() => {
    const fetchSpecies = async () => {
      if (character.species.length === 0) {
        setSpeciesName("Human");
        return;
      }

      try {
        const response = await api.get<Species>(character.species[0]);
        setSpeciesName(response.data.name);
      } catch {
        setSpeciesName("Unknown");
      }
    };

    fetchSpecies();
  }, [character.species]);

  const cardColor = SPECIES_COLORS[speciesName] ?? "#E9D5FF";

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -8,
      }}
      transition={{
        duration: 0.3,
      }}
      onClick={() => onClick(character)}
      style={{
        backgroundColor: cardColor,
        padding: "16px",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        border: "1px solid rgba(255,255,255,0.5)",
        overflow: "hidden",
        cursor: "pointer",
        maxWidth: "300px",
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
      >
        {character.name}
      </h3>
    </motion.div>
  );
}

export default CharacterCard;