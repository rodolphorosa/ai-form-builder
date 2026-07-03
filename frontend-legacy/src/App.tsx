import React from "react";
import { Builder } from "./pages/builder";

const App: React.FC = () => {
  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>AI Form Builder</h1>
      <Builder/>
    </div>
  );
};

export default App;
