//create an array of moods
var moods = ["happy", "sad", "excited", "chill", "worried", "scared"];
//create a button element for each array item
moods.forEach(mood => {
  $("#moodbtns").append(
    `<button class="btn btn-info" id="${mood}">${mood}</button>`
  );
});
//add event listner to each mood button
//on button click search gifphy api for the mood
//return 10 gifs on the DOM for the selected mood
//clear the gif field everytime a new mod is clicked
//listen for
