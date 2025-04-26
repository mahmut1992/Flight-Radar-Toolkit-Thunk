import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Map from "./pages/Map";
import List from "./pages/List";
import { useDispatch } from "react-redux";
import { getFlights } from "./redux/actions";
import Modal from "./components/Modal";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFlights());
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/list" element={<List />} />
        </Routes>
        <Modal />
      </main>
    </BrowserRouter>
  );
};

export default App;
