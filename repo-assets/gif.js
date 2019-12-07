// alert("I'm working!!");

$(document).ready(function() {
  // create function that will populate page with buttons

  // Create an array of hound breeds - Do I do this by creating the actual
  // array? Or is there a method w/js that will add them to an array as ppl search?

  var topicsArr = ["Basenji", "Beagle", "Rhodesian Ridgeback"];

  function createButtons(topicsArr) {
    // this function creates buttons to be displayed
    // need for loop to loop through topics array
    // inside loop need to create a new button for each -add text of the topics to buttons
    // append button to the page on a specific div
  }

  //   $(function() {
  //     // console.log("I'm working!");
  //     placeButtons(addToArray, "searchButtons");
  //   });

  function buildQueryURL(topic) {
    var queryURL =
      "https://api.giphy.com/v1/gifs/random?api_key=Fgt66xFtfUxFToAkOR3jZQ59AxAMJXzl&tag=" +
      topic;

    return queryURL;
  }
  function getImageGif(hound) {
    var queryURL = buildQueryURL(hound);

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      // After the data from the AJAX request comes back
      .then(function(response) {
        // Saving the image_original_url property
        var imageUrl = response.data.image_original_url;

        // Creating and storing an image tag
        var dogImage = $("<img>");

        // Setting the dogImage src attribute to imageUrl
        dogImage.attr("src", imageUrl);
        dogImage.attr("alt", "dog image");

        // Prepending the dogImage to the images div
        $("#searches").prepend(dogImage);
      });
  }

  function buttonHandler() {
    // grab the text, call getImageGif - pass in the text from the button (actual dog name)
    // get's passed into api alerts Gif as to which one to return
    var dogBreed = $(this).text();
    getImageGif(dogBreed);
  }

  $(".breed").on("click", buttonHandler);
});
