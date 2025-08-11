"use client";

import React from "react";
import { Routes, Route } from "react-router-dom";
import WorkflowsSearch from "./pages/WorkflowsSearch";
// ... other imports

function App() {
  return (
    <Routes>
      {/* ... other routes */}
      <Route path="/workflows/search" element={<WorkflowsSearch />} />
    </Routes>
  );
}

export default App;