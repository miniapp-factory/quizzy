"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const title = "QUIZZY Challenge";
const description = "Tough general knowledge quiz!";

const questions = [
  {
    question: "What is the name of the paradox where a time traveler kills their own grandfather, preventing their birth?",
    options: ["Bootstrap Paradox", "Grandfather Paradox", "Predestination Paradox", "Butterfly Effect"],
    correctIndex: 1,
  },
  {
    question: "In quantum mechanics, what principle states that it's impossible to know both position and momentum precisely?",
    options: ["Bootstrap Principle", "Heisenberg Uncertainty Principle", "Bohr Complementarity Principle", "Schrödinger's Principle"],
    correctIndex: 1,
  },
  {
    question: "Who wrote the philosophical work 'Being and Nothingness'?",
    options: ["Friedrich Nietzsche", "Jean-Paul Sartre", "Albert Camus", "Martin Heidegger"],
    correctIndex: 1,
  },
  {
    question: "What is the capital of Burkina Faso?",
    options: ["Ouagadougou", "Bamako", "Niamey", "Abuja"],
    correctIndex: 0,
  },
  {
    question: "In 'The Brothers Karamazov', who is the eldest brother?",
    options: ["Ivan", "Alyosha", "Dmitri", "Smerdyakov"],
    correctIndex: 2,
  },
  {
    question: "What element has the highest melting point?",
    options: ["Tungsten", "Carbon", "Rhenium", "Osmium"],
    correctIndex: 0,
  },
  {
    question: "Which ancient civilization built the city of Carthage?",
    options: ["Phoenicians", "Romans", "Greeks", "Egyptians"],
    correctIndex: 0,
  },
  {
    question: "What is the term for a word that spells the same backward and forward?",
    options: ["Anagram", "Palindrome", "Homonym", "Synonym"],
    correctIndex: 1,
  },
  {
    question: "Who directed the film 'Inception'?",
    options: ["Christopher Nolan", "Steven Spielberg", "Martin Scorsese", "Quentin Tarantino"],
    correctIndex: 0,
  },
  {
    question: "What is the longest river in South America?",
    options: ["Amazon", "Paraná", "Orinoco", "Magdalena"],
    correctIndex: 0,
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleOption = (index: number) => {
    if (selected !== null) return; // prevent multiple clicks
    setSelected(index);
    const isCorrect = index === questions[current].correctIndex;
    if (isCorrect) setScore((s) => s + 1);
    setFeedback(isCorrect ? "Correct! 🎉" : `Wrong! 😔 Correct: ${questions[current].options[questions[current].correctIndex]}`);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
        setFeedback(null);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFeedback(null);
    setShowResult(false);
  };

  const shareScore = () => {
    const shareText = `I scored ${score}/10 on #quizzy! 🧠 Super hard quiz—try beating it: https://quizzy.miniapp-factory.marketplace.openxai.network #openxai`;
    const url = `https://farcaster.xyz/~/compose?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const copyShareUrl = () => {
    const shareText = `I scored ${score}/10 on #quizzy! 🧠 Super hard quiz—try beating it: https://quizzy.miniapp-factory.marketplace.openxai.network #openxai`;
    navigator.clipboard.writeText(shareText).catch(() => {
      // fallback or error handling if needed
    });
  };

  if (showResult) {
    const getMotivation = () => {
      if (score >= 8) return "Genius Level! 🌟";
      if (score >= 5) return "Solid Effort! 💪";
      return "Keep Learning! 📚";
    };
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="p-6 w-full max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4 title-glow">Quiz Complete! 🧠</h1>
          <p className="text-2xl mb-4">You got {score}/10!</p>
          <p className="text-xl mb-6">{getMotivation()}</p>
          <div className="flex flex-col gap-4">
            <Button onClick={resetQuiz} variant="outline" className="w-full">
              Play Again
            </Button>
            <div className="flex flex-row gap-2 w-full">
              <Button onClick={shareScore} className="w-full bg-primary text-primary-foreground">
                Share Score on Farcaster
              </Button>
            </div>
            <div className="flex justify-center">
              <p
                onClick={copyShareUrl}
                className="text-sm text-muted-foreground cursor-pointer hover:underline"
              >
                Copy link
              </p>
            </div>
          </div>
        </Card>
      </main>
    );
  }

  const currentQuestion = questions[current];
  const progressPercent = ((current + 1) / questions.length) * 100;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="p-6 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 title-glow">QUIZZY! 🧠</h1>
        <p className="text-lg mb-4">{description}</p>
        <div className="w-full mb-4">
          <div className="text-sm text-muted-foreground mb-1">
            Question {current + 1} / {questions.length}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((opt, idx) => (
            <Button
              key={idx}
              onClick={() => handleOption(idx)}
              variant={selected === idx ? (idx === currentQuestion.correctIndex ? "default" : "destructive") : "outline"}
              className="w-full text-xl py-4 rounded-lg"
              disabled={selected !== null}
            >
              {opt}
            </Button>
          ))}
        </div>
        {feedback && (
          <p className={`mt-4 text-xl font-semibold ${feedback.startsWith("Correct") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}
      </Card>
    </main>
  );
}
