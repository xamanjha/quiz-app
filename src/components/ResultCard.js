import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaLightbulb, FaFire, FaStar } from 'react-icons/fa';
import useSound from 'use-sound';

const ResultCard = ({ score, total, onRetry, streak, perfectScore }) => {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 60;
  
  const [playCelebration] = useSound('/sounds/celebration.mp3', { volume: 0.5 });
  const [playEncouragement] = useSound('/sounds/encouragement.mp3', { volume: 0.5 });

  useEffect(() => {
    if (perfectScore) {
      playCelebration();
    } else if (!passed) {
      playEncouragement();
    }
  }, [perfectScore, passed, playCelebration, playEncouragement]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center space-y-6"
    >
      <motion.div variants={itemVariants} className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="text-6xl mb-6"
        >
          {perfectScore ? (
            <div className="relative">
              <FaTrophy className="text-yellow-500 mx-auto" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-2 -right-2"
              >
                <FaStar className="text-yellow-400 text-2xl" />
              </motion.div>
      </div>
          ) : passed ? (
            <FaTrophy className="text-yellow-500 mx-auto" />
          ) : (
            <FaLightbulb className="text-indigo-500 mx-auto" />
          )}
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-6 py-2 rounded-full shadow-lg"
        >
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            {percentage}%
          </span>
        </motion.div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="space-y-3">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          {perfectScore ? "Perfect Score! 🎉" :
           passed ? "Congratulations!" : "Keep Learning!"}
      </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          You scored {score} out of {total} questions correctly
        </p>
        {streak > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center justify-center gap-2 text-orange-500"
          >
            <FaFire className="text-xl" />
            <span className="text-base font-medium">
              Final Streak: {streak}
            </span>
          </motion.div>
        )}
        {!passed && (
          <p className="text-base text-indigo-600 dark:text-indigo-400">
            Don't worry! UX is a journey of continuous learning.
          </p>
        )}
      </motion.div>

      <motion.div variants={itemVariants}>
      <button
        onClick={onRetry}
          className="group relative inline-flex items-center justify-center px-8 py-3 font-medium tracking-wide text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
      >
          <FaStar className="mr-3 text-xl group-hover:rotate-180 transition-transform duration-300" />
          <span className="text-base">Try Again</span>
      </button>
      </motion.div>
    </motion.div>
  );
};

export default ResultCard;
