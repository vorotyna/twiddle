$(document).ready(function() {
  console.log('The document is ready!)');

  // Make character counter count characters in textarea
  $('#tweet-text').on('input', function(event) {
    let charCount = $(this).val().length;
    let remainingCharCount = 140 - charCount;

    // Target the counter
    let counter = $(this).parent().children(".bottom-tray").children(".counter");
    counter.text(remainingCharCount);

    // Turn counter red if below 0
    if (remainingCharCount < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '#545149');
    }
  });
});
