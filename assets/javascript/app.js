var buttonArray = [
  "Jason Derulo",
  "Owl City",
  "Flo Rida",
  "Black Eyed Peas",
  "Miley Cyrus",
  "David Guetta",
  "BoB",
  "Ne-Yo",
  "Omarion",
  "Chris Brown",
  "Daddy Yankee",
  "Kevin Rudolph",
  "T Pain"
];
var limit = 10;
var buttonInput;
var buttonResponseArr;
var buttonURL;
var searchInput;
var searchResponseArr;
var searchURL;

for (var i = 0; i < buttonArray.length; i++) {
  var topButtons = $("<button>").text(buttonArray[i]);
  topButtons.addClass("topButton btn btn-primary m-2");
  $(".button-holder").append(topButtons);
}

$(".button-holder").on("click", ".topButton", function() {
  $(".row1").html("");
  $(".row2").html("");
  $(".row3").html("");
  buttonInput = this.textContent;
  buttonURL = `http://api.giphy.com/v1/gifs/search?q=${buttonInput}&api_key=1HmF2ApULJrVnZjcuLpVIaVwjx8w6ZCi&limit=${limit}`;
  $.ajax(buttonURL).then(function(response) {
    buttonResponseArr = response.data;
    console.log(buttonURL);
    console.log(buttonResponseArr);
    renderGifs(buttonResponseArr);
  });
});

$(".search-btn").click(function(event) {
  event.preventDefault();
  $(".row1").html("");
  $(".row2").html("");
  $(".row3").html("");
  searchInput = $("#gifInput")
    .val()
    .trim();
  searchURL = `http://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=1HmF2ApULJrVnZjcuLpVIaVwjx8w6ZCi&limit=${limit}`;
  $.ajax(searchURL).then(function(response) {
    searchResponseArr = response.data;
    renderGifs(searchResponseArr);
  });
});

function renderGifs(array) {
  for (var i = 0; i < limit; i++) {
    if (i < 3) {
      $(
        ".row1"
      )[0].innerHTML += `<div class="col-4"><p>${array[i].title}<img src=${array[i].url}></p></div>`;
    }
    if (i > 3 && i < 7) {
      $(
        ".row2"
      )[0].innerHTML += `<div class="col-4"><p>${array[i].title}<img src=${array[i].url}></p></div>`;
    } else if (i > 7) {
      $(
        ".row3"
      )[0].innerHTML += `<div class="col-4"><p>${array[i].title}<img src=${array[i].url}></p></div>`;
    }
  }
}
