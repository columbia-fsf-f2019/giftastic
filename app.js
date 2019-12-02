var characters = [
  "Friends",
  "Chandler Bing",
  "Joey Tribbiani",
  "Phoebe Buffay",
  "Family Guy",
  "Peter Griffin",
  "Stewie Griffin",
  "Brian Griffin",
  "The Office",
  "Michael Scott",
  "Dwight Schrute",
  "Jim Halpert",
  "New Girl",
  "Jessica Day",
  "Nick Miller",
  "Schmidt",
  "The Simpsons",
  "Homer Simpson",
  "Bart Simpson"
];
//function for creating buttons of characters array
function createButton() {
  characters.forEach(function(character) {
    var newButton = $("<button>");
    newButton.text(character);
    newButton.addClass("char-button");
    newButton.attr("value", character);
    $("#gif-button-container").append(newButton);
  });
}
//when you click submit
//put the value into the character array
$("#submit").on("click", function(event) {
  event.preventDefault();

  var inputVal = $("#input")
    .val()
    .trim();
  characters.push(inputVal);
  //empty the button container and append
  $("#gif-button-container").empty();
  createButton();
});
//click the char button get queryurl
//then get the gif
$("#gif-button-container").on("click", function(event) {
  console.log(event.target.innerText);
  var clickedChar = event.target.innerText;
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    clickedChar +
    "&api_key=Tq9MmaROwC1TU9yfsLoV3faW16cqlg08&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(queryURL);
    console.log(response);
    $("#gif-container").empty();
    var results = response.data;
    //paragraph for rating and img for image
    for (i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");
      gifDiv.addClass("gifDiv");
      var ratingP = $("<p>");
      ratingP.text(`Rating: ${results[i].rating}`);
      ratingP.addClass("rating");
      var gifImg = $("<img>");
      gifImg.attr("src", results[i].images.fixed_height_still.url);
      gifImg.attr("data-still", results[i].images.fixed_height_still.url);
      gifImg.attr("data-animate", results[i].images.fixed_height.url);
      gifImg.attr("data-status", "still");
      gifImg.addClass("gifImg");
      gifDiv.append(gifImg);
      gifDiv.append(ratingP);
      $("#gif-container").append(gifDiv);
    }
  });
});
$("#gif-container").on("click", function(event) {
  var thisImg = event.target;
  var dataStatus = $(thisImg).attr("data-status");
  if (dataStatus === "still") {
    $(thisImg).attr("src", $(thisImg).attr("data-animate"));
    $(thisImg).attr("data-status", "animate");
  } else {
    $(thisImg).attr("src", $(thisImg).attr("data-still"));
    $(thisImg).attr("data-status", "still");
  }
});
createButton();
