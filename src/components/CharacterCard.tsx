import type { Character } from "../types/Character";

interface CharacterCardProps {
  character: Character;
}

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div>
      <img
        src={`https://picsum.photos/200/300?random=${encodeURIComponent(
          character.name
        )}`}
        alt={character.name}
      />

      <h3>{character.name}</h3>
    </div>
  );
}

export default CharacterCard;