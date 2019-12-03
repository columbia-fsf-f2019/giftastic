// giphy API key 6Ws2L6DO87tHU6XxSqZP6gyxoQaWgVn2
var animals = [
  "dog",
  "cat",
  "rabbit",
  "hamster",
  "skunk",
  "goldfish",
  "bird",
  "ferret",
  "turtle",
  "sugar glider",
  "chinchilla",
  "hedgehog",
  "hermit crab",
  "gerbil",
  "pygmy goat",
  "chicken",
  "capybara",
  "teacup pig",
  "serval",
  "salamander",
  "frog"
];
var button;
// render buttons
function renderButtons() {
  // clear previous contents in area for buttons and gifs
  $(".buttons").empty();
  $(".gifs").empty();
  for (var i = 0; i < animals.length; i++) {
    button = animals[i];
    var animalButton = $("<button>")
      .text(button)
      .attr("animal", button);
    $(".buttons").append(animalButton);
  }
}
// When user enter an animal, check if it is in the array, if not, add it to the buttons.
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  var newAnimal = $("#animal-input")
    .val()
    .trim();
  if (animals.indexOf(newAnimal) === -1) {
    animals.push(newAnimal);
    $("#animal-input").val("");
    renderButtons();
  }
});
renderButtons();
// When any button is clicked, get gif from GIPHY
$("button").on("click", function(event) {
  $(".gifs").empty();
  var animal = $(this).attr("animal");
  var queryURL = `https://api.giphy.com/v1/gifs/search?q=${animal}&api_key=6Ws2L6DO87tHU6XxSqZP6gyxoQaWgVn2&limit=10`;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.data;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      var gifURL = results[i].images.fixed_height.url;
      var gif = $("<img>").attr("src", gifURL);
      $(".gifs").prepend(gif);
    }
  });
});
