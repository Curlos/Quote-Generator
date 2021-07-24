let quoteContainer = document.getElementById("quote-container");
let quote = document.getElementById("quote");
let author = document.getElementById("author");
let twitterButton = document.getElementById("twitter");
let newQuoteButton = document.getElementById("new-quote");
let copyClipboardButton = document.getElementById("copyClipboard");

let apiQuotes = [];
let fetchQuoteErrorCounter = 0;

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const removeLoadingSpinner = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

const showNewQuote = () => {
    removeLoadingSpinner();

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

const getQuotesFromAPI = async () => {
    showLoadingSpinner();

    try {
        const apiUrl = 'https://type.fit/api/quotes';
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        showNewQuote();
    } catch(error) {
        // Catch Error Here
        console.log(error);
    }
}

const tweetQuote = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
    window.open(twitterURL, '_blank');
}

const copyQuoteToClipboard = () => {
    navigator.clipboard.writeText(`${quote.textContent} - ${author.textContent}`);
}

newQuoteButton.addEventListener("click", getQuotesFromAPI);
twitterButton.addEventListener("click", tweetQuote);
copyClipboardButton.addEventListener("click", copyQuoteToClipboard);

getQuotesFromAPI();