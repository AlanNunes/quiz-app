import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage.tsx";
import GamePage from "./Pages/GamePage.tsx";
import { QuizContext } from "./Context/QuizContext.ts";
import { useState } from "react";
import { Player } from "./models/Player.ts";

function App() {
  const [player, setPlayer] = useState<Player>(new Player("someone"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage></HomePage>,
    },
    {
      path: "/game",
      element: <GamePage></GamePage>,
    },
  ]);

  return (
    <QuizContext.Provider value={{ player, setPlayer }}>
      <RouterProvider router={router} />
    </QuizContext.Provider>
  );
}

export default App;
