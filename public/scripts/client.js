// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

// Function turns tweet object into HTML tweet article
const createTweetElement = function(data) {
  let newTweet = `
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

// Function appends array of tweet objects into tweet article
const renderTweets = function(data) {
  for (let tweet of data) {
    const newTweetElement = createTweetElement(tweet);
    $('#tweets-container').append(newTweetElement);
  }
};

// Form submission using JQuery
$(document).ready(function() {
  console.log("The document is ready!");

  $("#submit-tweet").on("submit", function(event) {
    console.log("Tweet submitted");
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $("#submit-tweet").serialize(),
    })
      .then(function(result) {
        console.log("Tweet has been sent to the server");
        $("#tweet-text").val('');
      })
      .catch(function(error) {
        console.log("error", error);
      });
  });
  renderTweets(data);
});