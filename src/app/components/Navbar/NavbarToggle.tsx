import React from 'react';
import { motion, useCycle } from 'framer-motion';

const NavbarToggle = ({ toggle, clickLink }: any) => {
  const [click, setClick] = useCycle(true, false);

  return (
    <button
      onClick={toggle}
      id="menu-toggle"
      aria-label="mobile-menu-toggle"
      aria-controls="nav-items-mobile"
      aria-expanded="false"
    >
      Menu
      <motion.div className="bar" variants={{
        closed: { rotate: [45, 0, 0], top: ["50%", "50%", "35%"] },
        open: { rotate: [0, 0, 45], top: ["35%", "50%", "50%"] },
        transition: {
          type: "spring",
        }
      }} ></motion.div>
      <motion.div className="bar" variants={{
        closed: { rotate: [-45, 0, 0], top: ["50%", "50%", "65%"] },
        open: { rotate: [0, 0, -45], top: ["65%", "50%", "50%"] },
        transition: {
          type: "spring",
        }
      }} ></motion.div>
    </button>
  );
}

export default NavbarToggle;
