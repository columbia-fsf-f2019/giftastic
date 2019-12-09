$(function() {
  buttonZone(houndArr, "clickButton", "#buttons-here");
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

function buttonZone(houndArr, classToAdd, addHere) {
  $(addHere).empty();
  for (var i = 0; i < houndArr.length; i++) {
    var dog = $("<button>");
    dog.addClass(classToAdd);
    dog.attr("data-type", houndArr[i]);
    dog.text(houndArr[i]);
    $(addHere).append(dog);
  }
}

$(document).on("click", ".clickButton", function() {
  var type = $(this).data("type");
  console.log(type);
  var queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    type +
    "&api_key=Fgt66xFtfUxFToAkOR3jZQ59AxAMJXzl&limit=10";

  $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
    console.log(response);
    for (var i = 0; i < response.data.length; i++) {
      var gifDiv = $('<div class="search-item">');
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
      image.addClass("image");
      // referrence paragraph tag with rating
      gifDiv.append(p);
      gifDiv.append(image);
      $("#search-field").append(gifDiv);
    }
  });
});

// write some function that will make images go from still to animate to still upon click

$(document).on("click", ".image", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).data("animated"));
    $(this).attr("data-state", "animated");
  } else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  }
});

// SUBMIT BUTTON BUG! tried several fixes, clears page of images, won't load new buttons
// type in field and click in field will render new buttons
$("#search-input").on("click", function() {
  // .eq grabs 1st input in html w/ text (not submit)
  var newFind = $("input")
    .eq(0)
    .val();

  houndArr.push(newFind);

  buttonZone(houndArr, "clickButton", "#buttons-here");

  buttonZone(houndArr, "clickButton", "#buttons-here");
  return true;
});
