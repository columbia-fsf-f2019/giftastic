//create an array of moods
var moods = ["happy", "sad", "excited", "chill", "worried", "scared"];
var newmood;
//listen for new mood input from user and create button for mood
$("#newmood").click(function() {
  newmood = $("input")
    .val()
    .trim();
  moods.push(newmood);
  clearGifBtns();
  giftastic();
});

function giftastic() {
  moods.forEach(mood => {
    //create a button element for each array item
    $("#moodbtns").append(
      `<button class="btn btn-light" id="${mood}">${mood}</button>`
    );
    //add event listner to each mood button
    $(`#${mood}`).click(function() {
      //on button click search gifphy api for the mood
      var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=aNwhcv4oH9jBS3tvywdTqyJ5KTnpHVuS&q=${mood}&limit=10&offset=0&lang=en`;
      $.ajax(queryURL).then(function(response) {
        clearGifs();
        console.log(response);
        //return 10 gifs on the DOM for the selected mood
        var gifNumber;
        for (i = 0; i < response.data.length; i++) {
          gifNumber = i;
          getNewGif();
        }
        function getNewGif() {
          var gifURL = response.data[gifNumber].images.fixed_width.url;
          var rating = response.data[gifNumber].rating;
          var imageTag = $("<img>");
          imageTag.attr("src", gifURL);
          imageTag.attr("alt", `${mood} giphy`);
          $("#giphys").append(
            `<div class="col-sm-4"><h3>Rating: ${rating}</h3>${imageTag[0].outerHTML}</div>`
          );
        }
      });
    });
  });
}

giftastic();

//clear the gif field everytime a new mod is clicked
function clearGifs() {
  $("#giphys").html("");
}

//clear gif btns
function clearGifBtns() {
  $("#moodbtns").html("");
}
