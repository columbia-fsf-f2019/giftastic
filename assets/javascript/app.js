var searchInput = $("#gifInput");
var limit = 5;
var callURL = `http://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=1HmF2ApULJrVnZjcuLpVIaVwjx8w6ZCi&limit=${limit}`;
$.ajax(callURL).then(function(response) {
  console.log(response);
});
