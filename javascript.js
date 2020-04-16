var giphyBaseUrl = "https://api.giphy.com/v1/gifs/search?api_key=tUDBq2t0Um12TiMkj6ntj9DTo9bNGJrF&q=&limit=25&offset=0&rating=G&lang=en&q="
var returnedImages = [];
var imageContainer = $('#image-container');
var conversationStarters = ["What superpower would you like to have?", "Pretend you could be the teacher: what rules would you have in the classroom?", "If you could be an animal, which one would you be?", "Would you rather go the pool or the beach?", "How does a good friend act?", "What makes you feel happy?", "How can someone tell you’re listening?", "What are some some strategies you can use when you feel overwhelmed?" ]
var conversationRandomArray = [];

imageContainer.on("click", function(event) {
  var element = event.target;

  if (element.matches("img")) {
    $("#modalImage").attr('src', element.getAttribute('data-animate'));
    $("#modalText").text(element.getAttribute('data-text'));

    
    $('#modal1').modal()
  }
});

$("#searchButton").on('click', function(){
  event.preventDefault();
  var giphyQuery = giphyBaseUrl + $("#searchBar").val().trim()+"&offset="+Math.ceil((Math.random()*500));
  apiCall(giphyQuery, loadPictures);
})

$("#searchBar").on('keypress', function (event){
  if (event.keyCode == 13 && $("#searchBar").val() !="" ) {
  event.preventDefault();
  var giphyQuery = giphyBaseUrl + $("#searchBar").val().trim()+"&offset="+Math.ceil((Math.random()*500));
  apiCall(giphyQuery, loadPictures);
  }
})


function loadPictures(response){
  while (conversationRandomArray.length<6) {
    var randomNum = Math.ceil(Math.random()*6);
    var reroll = false;
    for (i=0;i<conversationRandomArray.length;i++){
      console.log(randomNum +" "+conversationRandomArray[i])
      if (randomNum == conversationRandomArray[i]){
        reroll = true;
      }
    }
    if (reroll == false){
      conversationRandomArray.push(randomNum)
    }
  }
  console.log(conversationRandomArray);
  returnedImages = response;
  $("#search-container").attr("style", "display:none");
  $("#image-container").attr("style", "display:block;min-height: 100vh;background-color:lightgrey");
  for(i=0;i<6;i++){
    var selectedImage = $("#image-container").find("img").eq(i); 
    selectedImage.attr("src", returnedImages.data[i].images.fixed_width_still.url);
    selectedImage.attr("data-animate", returnedImages.data[i].images.original.url);
    selectedImage.attr("data-text", conversationStarters[conversationRandomArray[i]]);
  }
}


//Makes an API call and then calls the function in the second argument. Requires a URL as the first argument and function as the second
function apiCall(apiQuery, apiFunction) {
  $.ajax({
      url: apiQuery,
      method: "GET"
  }).then(apiFunction)
}