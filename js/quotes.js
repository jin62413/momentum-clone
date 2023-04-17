const quotes = [
    {
        quote: "To fall in love with yourself is the first secret to happiness.",
        author: "Robert Morley",
    },
    {
        quote: "Happiness is a state of activity.",
        author: "Aristotle",
    },
    {
        quote: "Action is the foundational key to all success.",
        author: "Pablo Picasso",
    },
    {
        quote: "Beauty begins the moment you decided to be yourself.",
        author: "Coco Chanel",
    },
    {
        quote: "Loving yourself isn't vanity. It's sanity.",
        author: "Katrina Mayer",
    },
    {
        quote: "Lighten up on yourself. No one is perfect. Gently accept your humanness.",
        author: "Deborah Day",
    },
    {
        quote: "Despite the forecast, live like it's spring.",
        author: "Lilly Pulitzer",
    },
    {
        quote: "The only thing worse than starting something and failing.. is not starting something.",
        author: "Seth Godin",
    },
    {
        quote: "I will prepare and some day my chance will come.",
        author: "Abraham Lincoln",
    },
    {
        quote: "Indolence is a delightful but distressin state.",
        author: "Mahatama Gandhi",
    }
]

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;