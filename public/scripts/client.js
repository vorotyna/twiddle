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
        <p>${timeago.format(data.created_at)}</p>
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
  $('#tweets-container').empty();
  for (let tweet of data) {
    const newTweetElement = createTweetElement(tweet);
    $('#tweets-container').append(newTweetElement);
  }
};

// Form submission using JQuery
$(document).ready(function() {
  console.log("The document is ready!");

  $("#submit-tweet").on("submit", function(event) {
    event.preventDefault();
    if (!$.trim($("#tweet-text").val())) {
      alert("Tweet cannot be empty!");
    } else if ($("#tweet-text").val().length > 140) {
      alert("Tweets exceeds 140 characters!");
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $("#submit-tweet").serialize(),
      })
        .then(function(newResult) {
          $("#tweet-text").val('');
          $(".counter").val('140');

          loadTweets();
        })
        .catch(function(error) {
          console.log("error", error);
        });
    }

  });
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
      .then(function(newResult) {
        $("#tweet-text").html(renderTweets(newResult));
      })
      .catch(function(error) {
        console.log("error", error);
      });
  };

  loadTweets();
});




