import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaFire, FaLightbulb, FaInfoCircle } from 'react-icons/fa';
import useSound from 'use-sound';
import AnimatedCharacter from './AnimatedCharacter';

const FeedbackCard = ({ type, message, consecutiveScore, explanation }) => {
  const [playSuccess] = useSound('/sounds/success.mp3', { volume: 0.7 });
  const [playError] = useSound('/sounds/brass-fail-8-c.mp3', { volume: 0.7 });
  const [playStreak] = useSound('/sounds/winning.mp3', { volume: 0.7 });
  const [playCoin] = useSound('/sounds/coin-recieved.mp3', { volume: 0.7 });

  useEffect(() => {
    // Play sounds with a slight delay to ensure they don't overlap
    const playSounds = async () => {
      if (type === 'success') {
        await playSuccess();
        if (consecutiveScore >= 3) {
          setTimeout(() => playStreak(), 500);
        } else {
          setTimeout(() => playCoin(), 500);
        }
      } else if (type === 'error') {
        await playError();
      }
    };

    playSounds();
  }, [type, consecutiveScore, playSuccess, playError, playStreak, playCoin]);

  const variants = {
    initial: { 
      opacity: 0,
      scale: 0.95
    },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`absolute inset-0 z-50 flex items-center justify-center
          ${type === 'success' 
            ? 'bg-gradient-to-br from-green-500/95 to-emerald-600/95' 
            : 'bg-gradient-to-br from-red-500/95 to-rose-600/95'
          } 
          backdrop-blur-sm rounded-2xl`}
      >
        <div className="w-full max-w-lg p-8 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-full"
            >
              <AnimatedCharacter type={type} />
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white text-center"
            >
              {message}
            </motion.h3>

            {consecutiveScore >= 3 && type === 'success' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 bg-yellow-500/20 px-6 py-3 rounded-full"
              >
                <FaFire className="text-yellow-300 text-xl animate-pulse" />
                <span className="text-yellow-100 font-medium text-lg">
                  {consecutiveScore} in a row!
                </span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`w-full p-6 rounded-xl ${
                type === 'success' 
                  ? 'bg-white/10' 
                  : 'bg-white/10'
              }`}
            >
              <div className="flex items-start gap-4">
                {type === 'success' ? (
                  <FaLightbulb className="text-yellow-300 text-2xl mt-1 flex-shrink-0" />
                ) : (
                  <FaInfoCircle className="text-red-200 text-2xl mt-1 flex-shrink-0" />
                )}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {type === 'success' ? 'Did you know?' : 'Explanation:'}
                  </h4>
                  <p className="text-white/90 text-base leading-relaxed">
                    {explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedbackCard; 