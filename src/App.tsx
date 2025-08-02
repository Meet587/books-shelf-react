import { Route, Routes } from "react-router";
import "./App.css";
import Book from "./pages/book";
import Favorites from "./pages/favorites";
import Home from "./pages/home";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/book/:id"} element={<Book />} />
        <Route path={"/favorites"} element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
