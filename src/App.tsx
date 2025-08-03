import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import Book from "./pages/book";
import Favorites from "./pages/favorites";
import Home from "./pages/home";
import { persistor, store } from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/book/:id"} element={<Book />} />
            <Route path={"/favorites"} element={<Favorites />} />
          </Routes>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
