"use client";

import { useState } from "react";

export function QuestionForm() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Answer submitted:", answer);
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        What is the capital of the Philippines?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          rows={4}
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button
          type="submit"
          className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/80"
        >
          Submit
        </button>
      </form>
      {submitted && (
        <p className="mt-4 text-green-600">Thank you for your answer!</p>
      )}
    </div>
  );
}
