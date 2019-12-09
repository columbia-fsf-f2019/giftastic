$(()=> {


var animeBtn;
var anime;
var animes = ["Naruto", "DragonBall", "Attack On Titan", "Bleach", "Cowboy Bebop"];

var initialBtns = animes.map(value => {
   return $("<button>").addClass("btn-primary").text(value).click((e)=> {
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

          var animeImg = $("<img>");

          
          
          var animeImage = animeImg.attr("src", results[i].images.fixed_height.url).addClass("gif").attr("still", results[i].images.fixed_height_still.url).attr("animated", results[i].images.fixed_height.url);
          animeImage.click(()=> {
          
            var state = $(animeImage).attr("src");
            var still = $(animeImage).attr("still");
            var animated = $(animeImage).attr("animated");
            console.log(state, still, animated);
            if (state === animated) {
              $(animeImage).attr("src", still);
              
            } else {
              $(animeImage).attr("src", animated);
             
            }
          });
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
    animeBtn = $("<button>").addClass("btn-success").text(anime).click((e)=> {
        anime = e.target.innerHTML;
        onBtnClick();
    });
    $("#btnsHere").append(animeBtn);
   
});




});




