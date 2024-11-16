import { createContext, useContext } from "react";

import { Player } from "../models/Player";

interface QuizContextProps {
  player: Player;
  setPlayer: React.Dispatch<React.SetStateAction<Player>>;
}

export const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export function usePlayerContext() {
  const player = useContext(QuizContext);
  if (player === undefined) {
    throw new Error("The player is not initialized");
  }

  return player;
}
