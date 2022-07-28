import "./App.css";
import Header from "./components/Header";
import ImgCard from "./components/ImgCard";
import { Routes, Route } from "react-router-dom";
import Page from "./components/Page";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>

      <div className="app__body">
        <Routes>
          <Route path="/upload" element={<ImgCard />} />
          <Route path="/" element={<Page />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
