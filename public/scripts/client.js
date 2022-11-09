// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};


const createTweetElement = function(data) {
  const newTweet = `
    <article class="tweets">
      <header>
        <div class="top-left">
          <img src="${data.user.avatars}" />
          <h3>${data.user.name}</h3>
        </div>
        <h4>${data.user.handle}</h4>
      </header>
      <div class="tweet-text">
        <p>
          ${data.content.text}
        </p>
      </div>
      <footer>
        <p>${data.created_at}</p>
        <div class="icons">
        <button>
          <i class="fa-solid fa-flag fa-xs"></i>
        </button>
        <button>
          <i class="fa-sharp fa-solid fa-retweet fa-xs"></i>
        </button>
        <button>
          <i class="fa-sharp fa-solid fa-heart fa-xs"></i>
        </button>
        </div>
      </footer>
    </article>
    `;

  return newTweet;
};

// Test / driver code (temporary)
const $tweet = createTweetElement(tweetData);


$(document).ready(function() {
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
