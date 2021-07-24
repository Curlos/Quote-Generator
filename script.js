let quoteContainer = document.getElementById("quote-container");
let quote = document.getElementById("quote");
let author = document.getElementById("author");
let twitterButton = document.getElementById("twitter");
let newQuoteButton = document.getElementById("new-quote");

let apiQuotes = [];
// Show loading
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const complete = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
// Show New Quote
const newQuote = () => {
    complete();

    const max = apiQuotes.length - 1
    const randomIndex = Math.floor(Math.random() * max);
    const newQuote = apiQuotes[randomIndex]
    
    quote.textContent = newQuote.text;

    if(!newQuote.author) {
        author.textContent = 'Unknown';
    } else {
        author.textContent = newQuote.author;
    }

    if(quote.textContent > 120) {
        quote.classList.add("long-quote");
    } else {
        quote.classList.remove("long-quote");
    }
}

// Get Quotes From API
const getQuotes = async () => {
    loading();

    try {
        const apiUrl = 'https://type.fit/api/quotes';
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        // Catch Error Here
        console.log(error);
    }
}

const tweetQuote = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
    window.open(twitterURL, '_blank');
}

newQuoteButton.addEventListener("click", getQuotes);
twitterButton.addEventListener("click", tweetQuote);

getQuotes()