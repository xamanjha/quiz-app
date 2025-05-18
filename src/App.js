import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';
import ProgressBar from './components/ProgressBar';
import FeedbackCard from './components/FeedbackCard';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    question: "What does UX stand for?",
    options: ["User Experience", "Ultimate Experience", "User Experiment", "Unified Experience"],
    correct: "User Experience",
    explanation: "UX focuses on how users interact with and experience products"
  },
  {
    question: "Which law says users prefer familiar patterns?",
    options: ["Fitts's Law", "Jakob's Law", "Miller's Law", "Hick's Law"],
    correct: "Jakob's Law",
    explanation: "Users spend most of their time on other sites, so they prefer familiar patterns"
  },
  {
    question: "Fitts's Law relates to?",
    options: ["Time & memory", "Choices & cognition", "Size & distance", "Color & font"],
    correct: "Size & distance",
    explanation: "Fitts's Law states that the time to acquire a target is a function of the distance to and size of the target"
  }
];

function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [consecutiveScore, setConsecutiveScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '', explanation: '' });
  const [perfectScore, setPerfectScore] = useState(false);
  const [showCard, setShowCard] = useState(null);

  const handleAnswer = (answer) => {
    if (answer === questions[index].correct) {
      setScore(score + 1);
      setConsecutiveScore(consecutiveScore + 1);
      setFeedback({
        type: 'success',
        message: consecutiveScore >= 2 ? `Amazing! ${consecutiveScore + 1} in a row!` : 'Correct!',
        explanation: questions[index].explanation
      });
    } else {
      setConsecutiveScore(0);
      setFeedback({
        type: 'error',
        message: 'Not quite right. Keep learning!',
        explanation: questions[index].explanation
      });
    }
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
    const next = index + 1;
    if (next < questions.length) {
      setIndex(next);
    } else {
        setPerfectScore(score + 1 === questions.length);
      setShowScore(true);
    }
    }, 2500);
  };

  const retry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Quizora Logo" className="h-10 w-auto" />
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                  Quizora
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Where Learning Meets Fun!
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 mb-3">
            UX Design Quiz
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Test your knowledge of UX principles
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
          >
        {!showScore ? (
          <>
                <ProgressBar 
                  current={index + 1} 
                  total={questions.length} 
                  consecutiveScore={consecutiveScore}
                  score={score}
                />
                <div className="mt-8">
            <QuestionCard
              question={questions[index].question}
              options={questions[index].options}
              onAnswer={handleAnswer}
                    consecutiveScore={consecutiveScore}
                  />
                </div>
                <AnimatePresence>
                  {showFeedback && (
                    <FeedbackCard
                      type={feedback.type}
                      message={feedback.message}
                      consecutiveScore={consecutiveScore}
                      explanation={feedback.explanation}
                    />
                  )}
                </AnimatePresence>
          </>
        ) : (
              <ResultCard 
                score={score} 
                total={questions.length} 
                onRetry={retry} 
                consecutiveScore={consecutiveScore}
                perfectScore={perfectScore}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Quizora Logo" className="h-8 w-auto" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2024 Quizora. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6 relative">
              {/* Privacy Policy Card */}
              <div className="relative">
                <button
                  className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 focus:outline-none"
                  onMouseEnter={() => setShowCard('privacy')}
                  onMouseLeave={() => setShowCard(null)}
                  onFocus={() => setShowCard('privacy')}
                  onBlur={() => setShowCard(null)}
                  onClick={() => setShowCard(showCard === 'privacy' ? null : 'privacy')}
                  aria-haspopup="true"
                  aria-expanded={showCard === 'privacy'}
                  type="button"
                >
                  Privacy Policy
                </button>
                {showCard === 'privacy' && (
                  <div
                    className="absolute bottom-10 right-0 w-80 bg-white dark:bg-gray-900 shadow-xl rounded-xl p-5 z-50 border border-gray-200 dark:border-gray-700 animate-fade-in"
                    onMouseEnter={() => setShowCard('privacy')}
                    onMouseLeave={() => setShowCard(null)}
                  >
                    <h4 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Privacy Policy</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      We respect your privacy. No personal data is collected or stored. All quiz progress is local to your device.
                    </p>
                  </div>
                )}
              </div>
              {/* Terms of Service Card */}
              <div className="relative">
                <button
                  className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 focus:outline-none"
                  onMouseEnter={() => setShowCard('terms')}
                  onMouseLeave={() => setShowCard(null)}
                  onFocus={() => setShowCard('terms')}
                  onBlur={() => setShowCard(null)}
                  onClick={() => setShowCard(showCard === 'terms' ? null : 'terms')}
                  aria-haspopup="true"
                  aria-expanded={showCard === 'terms'}
                  type="button"
                >
                  Terms of Service
                </button>
                {showCard === 'terms' && (
                  <div
                    className="absolute bottom-10 right-0 w-80 bg-white dark:bg-gray-900 shadow-xl rounded-xl p-5 z-50 border border-gray-200 dark:border-gray-700 animate-fade-in"
                    onMouseEnter={() => setShowCard('terms')}
                    onMouseLeave={() => setShowCard(null)}
                  >
                    <h4 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Terms of Service</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      By using Quizora, you agree to use the app for educational and entertainment purposes only. No warranties are provided.
                    </p>
                  </div>
        )}
      </div>
              {/* Contact Us Card */}
              <div className="relative group">
                <a
                  href="mailto:support@quizora.fun"
                  className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 focus:outline-none"
                  onMouseEnter={() => setShowCard('contact')}
                  onMouseLeave={() => setShowCard(null)}
                >
                  Contact Us
                </a>

                {showCard === 'contact' && (
                  <div
                    className="absolute bottom-10 right-0 w-80 bg-white dark:bg-gray-900 shadow-xl rounded-xl p-5 z-50 border border-gray-200 dark:border-gray-700 animate-fade-in"
                    onMouseEnter={() => setShowCard('contact')}
                    onMouseLeave={() => setShowCard(null)}
                  >
                    <h4 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Contact Us</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">
                      Have questions or feedback? We'd love to hear from you!
                    </p>
                    <a
                      href="mailto:support@quizora.fun"
                      className="inline-block text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Email us at support@quizora.fun
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
