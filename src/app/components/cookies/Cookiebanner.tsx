"use client"

import Link from 'next/link'
import Cookies from 'js-cookie'
import { MouseEvent, useCallback, useEffect, useState } from 'react'
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons/faCheckSquare'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion, useAnimation, useCycle } from "framer-motion"


const USER_CONSENT_COOKIE_KEY = 'cookie_consent_is_true'
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365


const cookieWrapper__variants = {
    hidden: { width: "0%", height: "0%", transition: { staggerChildren: 0.1, when: "afterChildren", ease: "easeOut", staggerDirection: -1 } },
    open: { width: "100%", height: "100%", transition: { staggerChildren: 0.2, when: "beforeChildren", ease: "easeIn" } }
}

const modal__variants = {
    hidden: { opacity: 0, scaleX: 0, transition: { staggerChildren: 0.1, when: "afterChildren", ease: "easeOut", staggerDirection: -1 } },
    open: { opacity: 1, scaleX: 1, transition: { staggerChildren: 0.2, when: "beforeChildren", ease: "easeIn" } }
}

const element__variants = {
    hidden: { opacity: 0, x: -10, transition: { ease: "easeOut" } },
    open: { opacity: 1, x: 0, transition: { ease: "easeIn" } }
}

export function CookieConsent() {
    const [closed, setClosed] = useState(true)
    const controls = useAnimation()
    const [check, setCheck] = useState(false);
    const [consent, setConsent] = useState(false)

    useEffect(() => { handleCookieOpen() }, [])

    useEffect(() => {
        check && controls.start(closed ? "hidden" : "open")
        // const get = getShopifyCookies(document.cookie)
        // console.log(closed, get, document.cookie)
    }, [closed])

    const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(Cookies.get(USER_CONSENT_COOKIE_KEY) === 'true')



    useEffect(() => {

        Cookies.set(USER_CONSENT_COOKIE_KEY, cookieConsentIsTrue ? 'true' : 'false', {
            expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
        })

    }, [cookieConsentIsTrue]);

    const handleCookieClose = () => setClosed(true)
    const handleCookieOpen = () => {

        if (cookieConsentIsTrue) {
            //if cookie = present, hide banner
            setClosed(true)
        } else {
            setClosed(false)
        }
        setCheck(true)
    }

    const handleCookieAccepted = () => {
        setCookieConsentIsTrue(true)
        setClosed(true)
    }
    const handleCookieDeclined = () => {
        setCookieConsentIsTrue(false)
        setClosed(true)
    }
    return (<>
        <motion.div initial="hidden" animate={controls} variants={cookieWrapper__variants} className='origin-bottom-left flex justify-center text-[#000000] items-center fixed bottom-0 left-0 w-full h-full overflow-hidden backdrop-blur-lg z-30'>
            <motion.div variants={modal__variants} className='p-6 flex flex-col justify-center shadow-md items-center w-full h-full max-h-[700px] max-w-[500px] bg-[#ffffff]'>
                <motion.p variants={element__variants} className='m-0'>Wir verwenden</motion.p>
                <motion.h2 variants={element__variants} className='my-0 text-center font-bold'>Cookies</motion.h2>
                <motion.p className='text-base py-4 overflow-y-auto' variants={element__variants}>
                    Wir nutzen EmailJS, um das Versenden von E-Mails von unserer Anwendung zu erleichtern. Wenn Sie ein Formular auf unserer Website absenden, werden die folgenden Daten von EmailJS erfasst und verarbeitet:<br />

                    - Name<br />
                    - E-Mail-Adresse<br />
                    - Nachrichteninhalt<br />


                    Diese Daten werden ausschließlich zum Zwecke des Versendens von E-Mails gemäß Ihrer Anfrage verwendet. Wir teilen diese Daten nicht mit anderen Dritten.

                    EmailJS erfüllt die Anforderungen der DSGVO und stellt ein Datenverarbeitungsabkommen (DPA) zur Verfügung, um sicherzustellen, dass Ihre Daten sicher und in Übereinstimmung mit den Datenschutzgesetzen verarbeitet werden. Sie können deren Datenschutzerklärung <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">hier</a> einsehen.

                    Durch das Absenden eines Formulars auf unserer Website stimmen Sie der Verarbeitung Ihrer Daten durch EmailJS zu den oben genannten Zwecken zu.

                </motion.p>
                <motion.div variants={modal__variants} className='mt-auto flex flex-wrap gap-4 justify-between w-full my-4'>
                    <motion.button variants={element__variants} type='button' aria-label='Accept cookies' className='border border-[#000000] p-4 cursor-pointer bg-[#000000] text-white font-bold rounded flex-auto' onClick={handleCookieAccepted}>Zustimmen</motion.button>
                    <motion.button variants={element__variants} type='button' aria-label='Decline cookies' className='border border-[#000000] p-4 cursor-pointer bg-none text-[#000000] font-bold rounded flex-auto' onClick={handleCookieDeclined}>Ablehnen</motion.button>
                </motion.div>
                <motion.ul variants={modal__variants} className='flex flex-wrap gap-4 justify-between w-full my-4'>
                    <motion.li onClick={() => setClosed(!closed)}><Link className='underline-offset-1' href="/impressum">Impressum</Link></motion.li>
                    <motion.li onClick={() => setClosed(!closed)}><Link className='underline-offset-1' href="/datenschutz">Datenschutz</Link></motion.li>
                </motion.ul>
            </motion.div>
        </motion.div>
        <motion.div
            onClick={() => setClosed(!closed)}
            className='z-40 flex text-white flex-row justify-center m-2 rounded bg-[#060a16] items-center cursor-pointer w-auto h-12 fixed bottom-0 left-0'>
            <FontAwesomeIcon className='w-12 max-h-6' icon={faCheckSquare

            } />
        </motion.div>
    </>
    )
}




