$(document).ready(function(){

	// Function for displaying animal data
    function renderButtons() {
    // Initial array of animals
    var animals = ["Dogs","Cats","Pigs", "Rooster", "Fish", "Zebra", "Lion", "Tiger", "Elephants", "Rhinocerous"];
  
    	$("#animals-view").empty();
    	for (var i = 0; i < animals.length; i++) {
    	 	renderButton(animals[i]);
    	}
    }

    function renderButton(animalText) {
      var b = $("<button>");
      b.addClass("animal");
      b.attr("data-name", animalText);
      b.text(animalText);
      $("#animals-view").append(b);
    }

    $("#add-animals").on("click", function(event) {
    	event.preventDefault();
    	var animal = $("#animals-input").val().trim();
    	renderButton(animal);
    	
    });
    renderButtons();
   
    // Adding click event listen listener to all buttons
    $(document).on("click", ".animal", function(event) {

      var animalName = $(this).attr("data-name");
      console.log(animalName);

      var authKey = "4qkKoj8RJIwGvZPFpcpRPgFC2VxmyuNK";
      console.log(authKey);

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animalName + "&api_key=" +  authKey + "&limit=10";


      $("#gifs-appear-here").empty();

       $.ajax({
          url: queryURL,
          method: "GET"    
          })
        .done(function(response) {
          console.log(response);
          var results = response.data;  

          for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div>");
            var animatedSrc = results[i].images.fixed_height.url;
            var stillSrc = results[i].images.fixed_height_still.url;
            var showImage = $("<img>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            showImage.attr("src", results[i].images.fixed_height.url);

            showImage.addClass("animate");
            showImage.attr("data-state", "animate");
            showImage.attr("data-still", stillSrc);
            showImage.attr("data-animate", animatedSrc);
            animalDiv.append(p);
            animalDiv.append(showImage);
            $("#gifs-appear-here").prepend(animalDiv);
          }

        });
    
    });

    $("#gifs-appear-here").on("click", ".animate", function(event) {

        var state = $(this).attr("data-state");
        console.log(state);
        if(state==="still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state","animate");
        } else {
          $(this).attr("src",$(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      
      });

});
