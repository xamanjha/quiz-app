import React from 'react';
import { motion } from 'framer-motion';
import { FaFire, FaStar } from 'react-icons/fa';

const ProgressBar = ({ current, total, consecutiveScore, score }) => {
  const progress = (current / total) * 100;
  const getMessage = () => {
    if (consecutiveScore >= 3) return "You're on fire! 🔥";
    if (consecutiveScore >= 2) return "Great streak! Keep going!";
    if (current === 1) return "Let's begin!";
    if (current === total) return "Final question!";
    return "You're doing great!";
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            Question {current} of {total}
          </motion.div>
          {consecutiveScore > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              <FaFire className="text-yellow-500" />
              {consecutiveScore} in a row
            </motion.div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            <FaStar className="text-green-500" />
            Score: {score}/{total}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500"
          >
            {Math.round(progress)}% Complete
          </motion.div>
        </div>
      </div>

      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-gray-500 text-center"
      >
        {getMessage()}
      </motion.p>
    </div>
  );
};

export default ProgressBar;
