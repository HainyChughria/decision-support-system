import { useEffect, useState } from "react";

function App() {
  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/decisions")
      .then(res => res.json())
      .then(data => setDecisions(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Decision Support System</h2>

      {decisions.length === 0 ? (
        <p>No decision found</p>
      ) : (
        decisions.map(decision => (
          <div
            key={decision._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <p><b>Question:</b> {decision.question}</p>
            <p><b>AI Suggestion:</b> {decision.aiSuggestion}</p>
            <p><b>Confidence:</b> {decision.confidenceScore}%</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
