$(function() {
  populateButtons(houndArr, "clickButton", "#buttonsArea");
});

var houndArr = [
  "Basenji",
  "Beagle",
  "Dachshund",
  "Greyhound",
  "Whippet",
  "Pharaoh hound",
  "Rhodesian ridgeback",
  "Basset hound",
  "Afghan hound",
  "American foxhound"
];

// function to make buttons and add to page
function populateButtons(houndArr, classToAdd, areaToAddTo) {
  $(areaToAddTo).empty();
  for (var i = 0; i < houndArr.length; i++) {
    var dog = $("<button>");
    dog.addClass(classToAdd);
    dog.attr("data-type", houndArr[i]);
    dog.text(houndArr[i]);
    $(areaToAddTo).append(dog);
  }
}

//

$(document).on("click", ".clickButton", function() {
  var type = $(this).data("type");
  var queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    type +
    "&api_key=Fgt66xFtfUxFToAkOR3jZQ59AxAMJXzl&limit=10";

  // "http://api.giphy.com/v1/gifs/random?api_key=Fgt66xFtfUxFToAkOR3jZQ59AxAMJXzl&tag=";
  $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
    // console.log(response);
    for (var i = 0; i < response.data.length; i++) {
      var searchDiv = $('<div class="search-item">');
      var rating = response.data[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var animated = response.data[i].images.fixed_height.url;
      var still = response.data[i].images.fixed_height_still.url;
      var image = $("<img>");

      // below is the still version upon load, animated upon click
      image.attr("src", still);
      image.attr("data-still", still);
      image.attr("data-animated", animated);
      image.attr("data-state", "still");
      image.addClass("searchImage");
      // referrence paragraph tag with rating
      searchDiv.append(p);
      searchDiv.append(image);
      $("#searches").append(searchDiv);
    }
  });
});

// write some function that will make images go from still to animate

$(document).on("click", ".searchImage", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).data("animated"));
    $(this).attr("data-state", "animated");
  } else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  }
});

$("#search-input").on("click", function() {
  // .eq grabs 1st input in html (not submit)
  var newFind = $("input")
    .eq(0)
    .val();
  houndArr.push(newFind);
  populateButtons(houndArr, "clickButton", "#buttonsArea");
  return false;
});
