import type { Character } from "../types/Character";

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

function CharacterModal({
  character,
  onClose,
}: CharacterModalProps) {
  if (!character) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "12px",
          width: "400px",
        }}
      >
        <h2>{character.name}</h2>

        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default CharacterModal;