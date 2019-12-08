//create an array of moods
var moods = ["happy", "sad", "excited", "chill", "worried", "scared"];
//create a button element for each array item
moods.forEach(mood => {
  $("#moodbtns").append(
    `<button class="btn btn-info" id="${mood}">${mood}</button>`
  );
  //add event listner to each mood button
  $(`#${mood}`).click(function() {
    //on button click search gifphy api for the mood
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=aNwhcv4oH9jBS3tvywdTqyJ5KTnpHVuS&q=${mood}&limit=10&offset=0&rating=G&lang=en`;
    $.ajax(queryURL).then(function(response) {
      clearGifs();
      //return 10 gifs on the DOM for the selected mood
      var gifNumber;
      for (i = 0; i < response.data.length; i++) {
        gifNumber = i;
        getNewGif();
      }
      function getNewGif() {
        var gifURL = response.data[gifNumber].images.fixed_height.url;
        var imageTag = $("<img>");
        imageTag.attr("src", gifURL);
        imageTag.attr("alt", `${mood} giphy`);
        $(".col-sm-7").append(imageTag);
      }
      //clear the gif field everytime a new mod is clicked
      function clearGifs() {
        $(".col-sm-7").html("");
      }
    });
  });
});
var newmood;
$("#newmood").click(function() {
  newmood = $("input")
    .val()
    .trim();
  moods.push(newmood);
  $("#moodbtns").append(
    `<button class="btn btn-info" id="${newmood}">${newmood}</button>`
  );
});
//listen for
