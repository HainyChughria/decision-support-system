import { useState, useEffect } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");
  const [decisions, setDecisions] = useState([]);

  // fetch decisions
  const fetchDecisions = async () => {
    const res = await fetch("http://localhost:5000/api/decisions");
    const data = await res.json();
    setDecisions(data);
  };

  useEffect(() => {
    fetchDecisions();
  }, []);

  const submitDecision = async () => {
    if (!question) {
      alert("Please enter a question");
      return;
    }

    const response = await fetch("http://localhost:5000/api/decisions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
        options: ["Yes", "No"],
        aiSuggestion: "AI will decide later",
        confidenceScore: 0,
      }),
    });

    if (response.ok) {
      setMessage("Decision submitted successfully!");
      setQuestion("");
      fetchDecisions(); // refresh list
    } else {
      setMessage("Error submitting decision");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>AI Decision Support System</h2>

      <input
        type="text"
        placeholder="Enter your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />

      <br /><br />

      <button onClick={submitDecision}>Submit Decision</button>

      <p>{message}</p>

      <hr />

      <h3>Saved Decisions</h3>

      {decisions.length === 0 ? (
        <p>No decisions found</p>
      ) : (
        decisions.map((d) => (
          <div key={d._id} style={{ marginBottom: "15px" }}>
            <strong>Q:</strong> {d.question} <br />
            <strong>AI Suggestion:</strong> {d.aiSuggestion} <br />
            <strong>Confidence:</strong> {d.confidenceScore}%
          </div>
        ))
      )}
    </div>
  );
}

export default App;
