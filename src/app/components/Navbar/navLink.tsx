import React from 'react';
import Link from 'next/link';

const NavLink = ({name, link, hash}:any) => {
    return(
        <li className="navItem">
            <Link 
                href={hash ? hash : link} 
                aria-label={name} 
                data-attribute-page-target={name} 
                scroll={false}
                className="nav-link">
                {name}
            </Link>
        </li>
    )
    }

export default NavLink;
