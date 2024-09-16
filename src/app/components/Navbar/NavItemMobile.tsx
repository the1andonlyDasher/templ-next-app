import React from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};
export const NavItem = ({ href, name, toggle, secondary, icon }: any) => {
  return (
    <>
      <motion.li
        className={secondary ? "nav-item-secondary" : "nav-item"}
        variants={variants}
      >
        <Link scroll={false} data-name={name} onClick={toggle} aria-label={name} className={secondary ? "nav-link-secondary" : "nav-link black"} href={`${href}`}>{name}{icon && <FontAwesomeIcon
          className='ml-2 text-sm' icon={icon} />}</Link>
      </motion.li>
    </>
  );
};

