$(()=> {


var animeBtn;
var anime;
var animes = ["Naruto", "DragonBall", "Kimi No Na Wa", "One Piece", "Cowboy Bebop"];

var initialBtns = animes.map(value => {
   return $("<button>").addClass("anime").text(value).click((e)=> {
        anime = e.target.innerHTML;
        onBtnClick();
        
    });
    
});

$("#btnsHere").append(initialBtns);

function onBtnClick() {
    
    
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=cIHSqwOmX0ajlsyyyBBeIyJLB35AdXTP&limit=5";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then((response)=> {
        console.log(response);
        var results = response.data;
        for (i = 0; i < results.length; i++) {
          
          var animeDiv = $("<div>");
          

          var p = $("<p>").text("Rating: " + results[i].rating);

          var animeImage = $("<img>");

          
          
          animeImage.attr("src", results[i].images.fixed_height.url);
          animeDiv.append(p);
          animeDiv.append(animeImage);
          $("#gifsHere").prepend(animeDiv);
          
        }
    });    

}

$("#submitBtn").on("click", (e) => {
    e.preventDefault();
    anime = $("input").val().trim();
    onBtnClick(); 
    animeBtn = $("<button>").addClass("anime").text(anime).click((e)=> {
        anime = e.target.innerHTML;
        onBtnClick();
    });
    $("#btnsHere").prepend(animeBtn);
   
});



});




