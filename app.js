$(()=> {






$("button").on("click", (e) => {
    e.preventDefault();
    var anime = $("input").val().trim();
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=cIHSqwOmX0ajlsyyyBBeIyJLB35AdXTP&limit=5";
    $.ajax( {
        url: queryUrl,
        method: "GET"
    }).then((response)=> {
        console.log(response);
        var results = response.data;
        for (i = 0; i < results.length; i++) {
          // Creating and storing a div tag
          var animeDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var animeImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          animeImage.attr("src", results[i].images.fixed_height.url);
          animeDiv.append(p);
          animeDiv.append(animeImage);
          $("#gifsHere").prepend(animeDiv);
        }
    });
});


});

