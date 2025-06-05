import styles from './Layout.module.css';

const Footer = () => {

    const quotes: { quote: string; author: string }[] = [
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "The only place where success comes before work is in the dictionary.",
    author: "Vidal Sassoon",
  },
  {
    quote: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
  },
  {
    quote: "I find that the harder I work, the more luck I seem to have.",
    author: "Thomas Jefferson",
  },
  {
    quote: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
  },
  {
    quote: "Opportunities don't happen. You create them.",
    author: "Chris Grosser",
  },
  {
    quote: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    quote: "Success seems to be connected with action. Successful people keep moving.",
    author: "Conrad Hilton",
  },
  {
    quote: "If you really look closely, most overnight successes took a long time.",
    author: "Steve Jobs",
  }
];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <>
        <div className={styles.footer} style={{ zIndex: 1000 }}>
            {randomQuote && (
                <div>
                    <p>"{randomQuote.quote}"</p>
                    <p className="mb-0">- {randomQuote.author}</p>
                </div>
            )}
        </div>
        </>
    )
}

export default Footer;