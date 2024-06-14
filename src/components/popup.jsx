// PopupMessage.js
import React from 'react';
import { motion } from 'framer-motion';

const popupVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
};

const PopupMessage = ({ message, onClose, type }) => {
  const borderColor = type === 'success' ? 'border-green-500' : 'border-red-500';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={popupVariants}
      transition={{ duration: 0.5 }}
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 bg-white ${textColor} border-2 ${borderColor} rounded-lg p-4 shadow-lg z-50`}
    >
      <p>{message}</p>
      <button onClick={onClose} className={`mt-2 underline ${textColor}`}>
        Close
      </button>
    </motion.div>
  );
};

export default PopupMessage;
