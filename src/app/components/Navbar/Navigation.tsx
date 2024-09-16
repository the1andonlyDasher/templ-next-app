import React from "react";
import { motion } from "framer-motion";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};





const Navigation = ({ children }: any) => {
  return (
    <>
      <motion.ul className="nav-items-desktop" variants={variants}>
        {children}
      </motion.ul>
    </>
  );
};

export default Navigation;
