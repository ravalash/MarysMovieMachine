var giphyBaseUrl = "https://api.giphy.com/v1/gifs/search?api_key=tUDBq2t0Um12TiMkj6ntj9DTo9bNGJrF&q=&limit=25&offset=0&rating=G&lang=en&q="
var returnedImages = [];
var imageContainer = $('#image-container');
var conversationStarters = ["What superpower would you like to have?", "Pretend you could be the teacher: what rules would you have in the classroom?", "If you could be an animal, which one would you be?", "Would you rather go the pool or the beach?", "How does a good friend act?", "What makes you feel happy?", "How can someone tell you’re listening?", "What are some some strategies you can use when you feel overwhelmed?", "If you could make up a brand new school subject, what would it be?", "Can you remember a time when you laughed so hard you snorted?", "Make up a new holiday. What would it be?", "What is you favorite letter of the alphabet? Why?", "If someone gave you $50 dollars what would you do with it?", "Would you rather eat your least favorite vegetable or have extra homework?", "When you are sad how do you make yourself feel better?", "Would you rather pack your lunch or buy from the cafeteria?", "What is your favorite day of the week?", "What is the best way to eat an Oreo?", "What do you normally do during recess?", "Which state shape do you like the best?", "Do you have a favorite place in your town?", "Would you rather scream or whisper?", "Would you rather take a picture or be in the picture?", "When you play tic-tac-toe, do you choose to be Xs or Os?", "When you’re waiting for something, how do you pass the time?", "What is your favorite chore?", "If you could do one thing, everyday, for the rest of your life, what would it be?", "Once you lie down in bed, how long does it take you to fall asleep?", "If you had a robot for one day what would you ask it to do?", "What is your favorite thing about yourself?", "How do you make friends?", "What’s your favorite thing to do on a snow day?", "If you could design a zoo, which animal would you have the most of?", "If you could change one thing about your room what would it be?", "Do you like riding in the car?", "When you woke up this morning what was the first thing that you thought about?", "Do you normally do chores and homework right away or do you wait until the last minute?", "Would you rather take a shower or a bath?", "If your parents told you that you could have dessert for breakfast what would you eat?", "What’s the silliest thing you can think to do with a paper plate?", "Do you think it’s important to pay attention every single second when you’re at school?", "What’s the best smell you’ve ever smelled?", "Make up a new sport. What would the rules be?", "Do you have to use your eraser a lot at school?", "Have you ever fallen asleep when you didn’t mean to?", "How many books do you have in your room?", "Would you ever wear your clothes inside-out at school?", "Can you remember a time when you made someone smile?", "How old were you when you learned to tie your shoes?", "Do you think you could go an entire day without talking?", "If you could turn one room of your house into a giant trampoline which one would it be?", "Have you ever told a small fib so as not to hurt someone’s feelings?", "Are you good at tongue twisters?", "Do you have the same first name as anyone else at your school? Do you like that?", "Do you like to look at a clock or do you prefer not knowing what time it is?", "What’s your favorite joke?", "Who do you talk to the most on the phone?", "What’s your favorite radio station?", "Do you prefer animated movies or films with real people?", "Would you rather watch a movie with no sound or listen to a radio program with no image?", "If you had the opportunity to visit the moon for a day, would you?", "If you had the opportunity to visit the moon for a day, would you?", "If you could put frosting on any food in the world what would it be?", "If you became President of the United States, what would you do?", "When was the last time you helped your parents without being asked?", "If your favorite toy could talk, what would it say?", "What would you do if you found the pot of gold at the end of a rainbow?", "Make up a song about your favorite teacher.", "If you could only listen to one song for the rest of your life, which one would you choose?", "What makes someone a good friend?", "When was the last time you received a letter in the mail?", "What is the longest word you know how to spell?", "What are the two largest numbers that you can add together in your head?", "What would you do if it started raining ice cream sundaes?", "When was the last time you gave someone a high-five?", "What is one thing that you don’t know how to do, but you wish you did?", "How would you feel if, for one day, you were the parent and your mom and dad were the kids?", "Do you think that kids should be able to choose what they learn at school?", "Do you prefer games with cards or dice?", "Can you remember the silliest thing you’ve ever said?", "Have you ever played an April Fool’s joke on anyone? How did they react?", "What would you do if you accidentally dropped your ice cream cone on the ground?", "Do you get more excited on your own birthday or on your best friend’s birthday?", "If you could trade places with anyone for one day, who would it be?", "Create a new cereal flavor. What would it taste like?", "Pick one fruit to combine with one vegetable to make a 'fruitable'.", "When you think about your day tomorrow, which part of it makes you the most excited?", "Why is your favorite color your favorite?", "Can you remember a time when you had a really good day?", "Do you think it would be fun to be famous?", "In your town, do you have more sunny days or more rainy days?", "Do you like to visit the library?", "Do you have a favorite word to say?", "Do you think it would be fun to have a hippopotamus living in your house?", "If someone gave you a blank piece of paper, what would you do with it?", "If you design your own playground, what kinds of things would you want to play on?", "If you could have a class pet, what would it be?", "What is the quickest way to make someone smile?", "How did you learn that your least favorite food was your least favorite food?", "If someone wrote an article about you in your school’s newspaper, what would you want them to say?", "What do you think would happen if you had to go to school on Saturdays?", "When was the last time you told someone 'Thank You'?", "Have you ever taught anyone how to do something?", "What is something that you think kids understand, but adults do not?", "Do you like to get your face painted?", "Describe what you see when you look outside your bedroom window at home.", "Do you like how old you are now or do you wish you were older or younger?", "If you were going to bury a time capsule, what would you put in it?", "What is your favorite question to ask your friends?" ]
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
  returnedImages = response;
  if (returnedImages.data.length != 0){
  while (conversationRandomArray.length<6) {
    var randomNum = Math.ceil(Math.random()*conversationStarters.length);
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
  $("#search-container").attr("style", "display:none");
  $("#image-container").attr("style", "display:block;min-height: 100vh;background-color:lightgrey");
  for(i=0;i<6;i++){
    var selectedImage = $("#image-container").find("img").eq(i); 
    selectedImage.attr("src", returnedImages.data[i].images.fixed_width_still.url);
    selectedImage.attr("data-animate", returnedImages.data[i].images.original.url);
    selectedImage.attr("data-text", conversationStarters[conversationRandomArray[i]]);
  }
}
else{
  $('#modal2').modal()
}
}


//Makes an API call and then calls the function in the second argument. Requires a URL as the first argument and function as the second
function apiCall(apiQuery, apiFunction) {
  $.ajax({
      url: apiQuery,
      method: "GET"
  }).then(apiFunction)
}