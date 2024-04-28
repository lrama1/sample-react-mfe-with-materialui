// index.js
import React, { Suspense } from "react";
import ReactDOM from "react-dom";

const PersonTable = React.lazy(() => import("./PersonTable"));

const persons = [
  { name: "John Doe", age: 30 },
  { name: "Jane Doe", age: 28 },
  { name: "Alice Smith", age: 35 },
  { name: "Bob Johnson", age: 42 },
  { name: "Emily Davis", age: 29 },
  { name: "Michael Wilson", age: 37 },
  { name: "Olivia Brown", age: 31 },
  { name: "William Taylor", age: 39 },
  { name: "Sophia Anderson", age: 27 },
  { name: "James Martinez", age: 33 },
];

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <PersonTable persons={persons} />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
