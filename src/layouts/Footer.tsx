import { AuthErrorCodes } from "firebase/auth";

const Footer = () => {
    const date = new Date();
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const quotes = [
        {
            text: "A víz a természet fuvarosa.",
            author: "Leonardo da Vinci"
        },
        {
            text: "Aki a bolondot játssza, annak elmésnek kell lennie.",
            author: "Horváth Imre"
        },
        {
            text: "A világ tökéletes, becsüld meg a részleteket.",
            author: "Antoine de Saint-Exupéry"
        },
        {
            text: "A tudás hatalom.",
            author: "Francis Bacon"
        },
        {
            text: "A szeretet a legnagyobb erő a világon.",
            author: "Mahatma Gandhi"
        },
        {
            text: "Pusztítani sokkal könnyebb, mint építeni.",
            author: "Suzanne Collins"
        }
    ]
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteText = randomQuote.text;

    return (
        <>
        <div className="bg-body-tertiary text-dark text-center fixed-bottom p-3" style={{ zIndex: 1000 }}>
            {quoteText} - {randomQuote.author}
        </div>
        </>
    )
}

export default Footer;