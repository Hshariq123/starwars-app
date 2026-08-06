import { useEffect, useState } from "react";
import axios from "axios";

import type { Character } from "../types/Character";
import type { Homeworld } from "../types/Homeworld";

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

function CharacterModal({ character, onClose }: CharacterModalProps) {
  const [homeworld, setHomeworld] = useState<Homeworld | null>(null);
  const [loadingHomeworld, setLoadingHomeworld] = useState(false);
  useEffect(() => {

    const fetchHomeworld = async () => {
      setLoadingHomeworld(true);
      setHomeworld(null);

      try {
        const response = await axios.get<Homeworld>(character.homeworld);
        setHomeworld(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingHomeworld(false);
      }
    };

    fetchHomeworld();
  }, [character]);

  //disable scrolling while card is open
useEffect(() => {
  const previousOverflow = document.body.style.overflow;

  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = previousOverflow;
  };
}, []);

  //esc button closes the card:
  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [onClose]);
  
  return (
    <div
    onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}

        style={{
          backgroundColor: "#ffffff",
         width: "min(450px, 95vw)",
          maxWidth: "90%",
          maxHeight:"90vh",
          overflowY:"auto",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        }}
      >
        <h2
          style={{
            color: "#111827",
            textAlign: "center",
            marginTop: 0,
            marginBottom: "24px",
            fontSize: "2rem",
            borderBottom: "2px solid #e5e7eb",
            paddingBottom: "12px",
          }}
        >
          {character.name}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            rowGap: "14px",
            columnGap: "24px",
            color: "#374151",
            fontSize: "1.05rem",
            marginBottom: "30px",
          }}
        >
          <strong>Height</strong>
          <span>{(Number(character.height) / 100).toFixed(2)} m</span>

          <strong>Mass</strong>
          <span>{character.mass} kg</span>

          <strong>Birth Year</strong>
          <span>{character.birth_year}</span>

          <strong>Films</strong>
          <span>{character.films.length}</span>

          <strong>Created</strong>
          <span>
            {new Date(character.created)
              .toLocaleDateString("en-GB")
              .replaceAll("/", "-")}
          </span>
        </div>
        <hr
          style={{
            margin: "24px 0",
            border: "none",
            borderTop: "1px solid #e5e7eb",
          }}
        />

        <h3
          style={{
            color: "#111827",
            marginBottom: "16px",
          }}
        >
          Homeworld
        </h3>

        {loadingHomeworld ? (
          <p
            style={{
              textAlign: "center",
              marginBottom: "24px",
              color: "#6b7280",
            }}
          >
            Loading...
          </p>
        ) : (
          homeworld && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                rowGap: "14px",
                columnGap: "24px",
                color: "#374151",
                fontSize: "1.05rem",
                marginBottom: "30px",
              }}
            >
              <strong>Name</strong>
              <span>{homeworld.name}</span>

              <strong>Terrain</strong>
              <span>{homeworld.terrain}</span>

              <strong>Climate</strong>
              <span>{homeworld.climate}</span>

              <strong>Residents</strong>
              <span>{homeworld.residents.length}</span>
            </div>
          )
        )}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CharacterModal;
