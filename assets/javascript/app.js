$(document).ready(function() {

    var topics = ['Joker', 'Loki', 'DeathStroke', 'Magneto', 'Harley Quinn', 'Doctor Doom', 'Catwoman', 'Thanos', 'Mr. Freeze'];
 
    function displayInfo(){
      $('#villain-view').empty();
      var topic = $(this).attr('data-name');
      var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=lo87J3zL8P5eRVJ9ayhcRJHix2zQjY5J&limit=10';
 
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        if (response.pagination.total_count == 0) {
          var itemindex = topics.indexOf(topic);
          if (itemindex > -1) {
            topics.splice(itemindex, 1);
            renderButtons();
            }
        }
        
        var results = response.data;
        for (var j = 0; j < results.length; j++){
          var newTopicDiv = $("<div class='villain-name'>");
          var pRating = $('<p>').text('Rating: ' + results[j].rating.toUpperCase());
          var gifURL = results[j].images.fixed_height_still.url;         
          var gif = $('<img>');
          gif.attr('src', gifURL);
          gif.attr('data-still', results[j].images.fixed_height_still.url);
          gif.attr('data-animate', results[j].images.fixed_height.url);
          gif.attr('data-state', 'still');
          gif.addClass ('animate-gif'); 
          newTopicDiv.append(pRating);
          newTopicDiv.append(gif);
          $('#villain-view').prepend(newTopicDiv);
        } 
      });
    };
    
    function renderButtons() {
      $('.buttons-view').empty();
      for (var i = 0; i < topics.length; i++) {
        var createButtons = $('<button>');
        createButtons.addClass('topic btn btn-info');
        createButtons.attr('data-name', topics[i]);
        createButtons.text(topics[i]);
        $('.buttons-view').append(createButtons);
      }
    }

    function removeButton(){
      $("#villain-view").empty();
      var topic = $(this).attr('data-name');
      var itemindex = topics.indexOf(topic);
      if (itemindex > -1) {
        topics.splice(itemindex, 1);
        renderButtons();
      }
    }

    function playGif () {
      var state = $(this).attr('data-state');
      if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      }
      else {
        $(this).attr('src' , $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }
    }

    $("#add-villain").on("click", function(event) {
      event.preventDefault();
      var villain = $("#villain-input").val().trim();
      if (topics.toString().toLowerCase().indexOf(villain.toLowerCase()) != -1) {
        return;
      }
      else {
        topics.push(villain);
        renderButtons();
      }
    });

    $(document).on("click", ".topic", displayInfo);
    $(document).on("click", ".animate-gif", playGif);
    $(document).on("dblclick", ".topic", removeButton);
    
    renderButtons();
});