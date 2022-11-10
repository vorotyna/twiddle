// Function to escape malicious injections
const escape = function(str) {
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
};

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
          ${escape(data.content.text)}
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
  data.sort((a, b) => {
    if (a.created_at > b.created_at) {
      return -1;
    }
    if (a.created_at < b.created_at) {
      return 500;
    }
    return 0;
  });

  $('#tweets-container').empty();
  for (let tweet of data) {
    const newTweetElement = createTweetElement(tweet);
    $('#tweets-container').append(newTweetElement);
  }
};

// Form submission using JQuery
$(document).ready(function() {
  console.log("The document is ready!");
  $("#error-class").hide();
  $("#submit-tweet").on("submit", function(event) {
    event.preventDefault();
    if (!$.trim($("#tweet-text").val())) {
      $("#error-class").text("Tweet cannot be empty!").slideDown();
      $("#error-class").show();
    } else if ($("#tweet-text").val().length > 140) {
      $("#error-class").text("Tweet cannot be longer than 140 characters!").slideDown();
      $("#error-class").show();
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $("#submit-tweet").serialize(),
      })
        .then(function(newResult) {
          $("#error-class").hide();
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
        $("#tweet-text").text(renderTweets(newResult));
      })
      .catch(function(error) {
        console.log("error", error);
      });
  };

  loadTweets();
});




