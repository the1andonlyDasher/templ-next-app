

import ContactForm from '../components/ContactForm';


export default async function Home() {


    return (

        <section>
            <ContactForm props={{
                title: "Kontakt",
                subtitle: "Haben Sie eine Frage? Lassen Sie uns wissen wie wir Ihnen behilflich sein können:",
                sectionName: "contact",
                id: undefined
            }} />
        </section>


    );
}

