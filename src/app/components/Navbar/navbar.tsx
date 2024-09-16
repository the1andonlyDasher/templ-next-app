"use client"

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useCycle } from "framer-motion";
import NavbarToggle from "./NavbarToggle";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import MobileNav from "./MobileNav";
import Navigation from "./Navigation";
import { NavItem } from "./NavItemDesktop";
import { NavItem as Mnav } from "./NavItemMobile";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
const variants = {
  closed: {},
  open: {}
};

const image_variants = {
  initial: { scale: 0, opacity: 0 },
  enter: { scale: [0, 1.2, 1], opacity: 1 },
  exit: { scale: 0, opacity: 0 },
}

const Navbar = ({ logo, alt, navbar, legals }: any) => {
  const router = useRouter()
  const navbarMain = useRef<any>(!null);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const supabase = createClientComponentClient();
  const [session, setSession]: any = useState({});

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    // console.log(event, session)

    if (event === 'INITIAL_SESSION') {
      // handle initial session
    } else if (event === 'SIGNED_IN') {
      // handle sign in event
    } else if (event === 'SIGNED_OUT') {
      // handle sign out event
    } else if (event === 'PASSWORD_RECOVERY') {
      // handle password recovery event
    } else if (event === 'TOKEN_REFRESHED') {
      // handle token refreshed event
    } else if (event === 'USER_UPDATED') {
      // handle user updated event
    }
  })




  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data);
    };

    getSession();
    return () =>  // call unsubscribe to remove the callback
      data.subscription.unsubscribe()
  }, [data]);


  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <motion.nav
      className={`navbar content-grid`}
      variants={variants}
      ref={navbarMain}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <div className="navbar__container" aria-haspopup="menu" >
        <motion.div
          className="h-full"
          variants={image_variants} initial="hidden" animate="enter" exit="exit"
        >
          <Link
            aria-label="Home"
            aria-current="page"
            className=" active flex justify-center items-center h-full py-4 gap-2"
            href="/"

          >
            LOGO



          </Link>
        </motion.div>
        <Navigation>
          {session.session?.user && <NavItem href={`/dashboard/${session.session?.user.id}`} />}
          {navbar.map((i: any, index: number) => (
            <NavItem icon={i[1]} clickLink={null} key={i[0]} name={i[0]} href={index === 0 ? "/" : `/${i[2] === true ? "#" : ""}${i[0].toLowerCase()}`} />
          ))}


        </Navigation>
        {!session.session?.user && <Link className="btn__alt ml-10" href="/login">Login</Link>}
        {session.session?.user &&
          <button className="btn__alt ml-10"
            onClick={handleSignOut}>Logout</button>}
        <MobileNav>
          {navbar.map((i: any, index: number) => (
            <Mnav toggle={() => toggleOpen()} icon={i[1]} clickLink={null} key={i[0]} name={i[0]} href={index === 0 ? "/" : `/${i[2] === true ? "#" : ""}${i[0].toLowerCase()}`} />
          ))}
          {legals.map((i: any, index: number) => (
            <Mnav secondary toggle={() => toggleOpen()} key={i} name={i} href={`${i.toLowerCase()}`} />
          ))}
          {session.session?.user &&
            <button className="btn__alt"
              onClick={handleSignOut}>Logout</button>}
        </MobileNav>
        <NavbarToggle toggle={() => toggleOpen()} />
      </div>
    </motion.nav>
  );
};

export default Navbar;

