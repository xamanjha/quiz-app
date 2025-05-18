import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFire } from 'react-icons/fa';
import useSound from 'use-sound';

const QuestionCard = ({ question, options, onAnswer, consecutiveScore }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [playCorrect] = useSound('/sounds/correct.mp3', { volume: 0.5 });
  const [playStreak] = useSound('/sounds/streak.mp3', { volume: 0.5 });

  useEffect(() => {
    if (consecutiveScore > 0 && consecutiveScore % 3 === 0) {
      playStreak();
    }
  }, [consecutiveScore, playStreak]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === question.correct) {
      playCorrect();
    }
    onAnswer(answer);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{question}</h2>
        {consecutiveScore > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full"
          >
            <FaFire className="text-yellow-500" />
            <span className="text-yellow-700 font-medium">
              {consecutiveScore} in a row!
            </span>
          </motion.div>
        )}
      </div>
      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={`w-full p-4 text-left rounded-xl transition-all duration-200
              ${selectedAnswer === null
                ? 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                : selectedAnswer === option
                  ? option === question.correct
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                  : option === question.correct
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-50 text-gray-400'
              }`}
        >
            {option}
          </motion.button>
      ))}
    </div>
    </motion.div>
);
};

export default QuestionCard;
