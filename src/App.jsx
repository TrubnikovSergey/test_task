import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import Content from "./components/content/content";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path=":category/:endpoint" element={<Content />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
