$(document).ready(function(){

	// Function for displaying animals button data
    function renderButtons() {

      // Initial array of animals
      var animals = ["Dogs","Cats","Pigs", "Rooster", "Fish", "Zebra", "Lion", "Tiger", "Elephants", "Rhinocerous"];
    
        //initial load, set the id animals-view to empty
      	$("#animals-view").empty();

        //loop through all the animals in the array variable
      	for (var i = 0; i < animals.length; i++) {

          //call renderButton 
      	 	renderButton(animals[i]);
      	}
      }

    // generate each buttton while in the for loop
    function renderButton(animalText) {

      //created a new button tag for each animal array and store it in a new variable b
      var b = $("<button>");

      //added a class animal to the new variable
      b.addClass("animal");

      //set the value of animalText argument to the data-name attr to the b button
      b.attr("data-name", animalText);
      b.text(animalText);

      //append value of b to id animals-view in the html page
      $("#animals-view").append(b);
    }

    //on.click() event function to the id add-animals in the html page(form)
    $("#add-animals").on("click", function(event) {

      //prevent the default event to load
    	event.preventDefault(); 

      //get id animal-input value without the white spaces and set it to var animal
    	var animal = $("#animals-input").val().trim();

      //call renderButton and passing an argument animal
    	renderButton(animal);
    	
    });

    renderButtons();
   
    // Adding click event listener to animal class and html page
    $(document).on("click", ".animal", function(event) {

      //store data-name attr to var animalName
      var animalName = $(this).attr("data-name");
      
      //store giphy keys to var authKey
      var authKey = "4qkKoj8RJIwGvZPFpcpRPgFC2VxmyuNK";
    
      //set query path to var queryURL    
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animalName + "&api_key=" +  authKey + "&limit=10";

      //clears #gifs-appear-here before calling query .ajax()
      $("#gifs-appear-here").empty();


       $.ajax({
          url: queryURL,
          method: "GET"    
          })
        .done(function(response) {

          //
          var results = response.data;  

          //
          for (var i = 0; i < results.length; i++) {

            //created new div tag and store it in a new var animalDiv
            var animalDiv = $("<div>");

            //store response data results[] image fixed height to a new var animatedSrc
            var animatedSrc = results[i].images.fixed_height.url;

            //store response data results[] image fixed height_still to a new var stillSrc
            var stillSrc = results[i].images.fixed_height_still.url;

            //created new img tag and store it in a new var showImage
            var showImage = $("<img>");

            //var for results[].rating
            var rating = results[i].rating;

            //created new p tag and get the rating and store it in a new var p
            var p = $("<p>").text("Rating: " + rating);

            //set results[i].images.fixed_height.url to src attributes and store it in showImage var
            showImage.attr("src", results[i].images.fixed_height.url);

            //add class animate to showImage var
            showImage.addClass("animate");

            //set animate data to data-state attribute and store it in showImage var
            showImage.attr("data-state", "animate");

            //set stillSrc and animatedSrc value to data-still and data animate attribute
            showImage.attr("data-still", stillSrc);
            showImage.attr("data-animate", animatedSrc);

            //append p tag to animalDiv var
            animalDiv.append(p);

            //append showImage value to animalDiv var
            animalDiv.append(showImage);

            //prepend animalDiv value(image) to id gifs-appear-here in HTML page
            $("#gifs-appear-here").prepend(animalDiv);
          }

        });
    
    });

    //events for still-animate of the images using id gifs-appear-here in html page
    $("#gifs-appear-here").on("click", ".animate", function(event) {

        //storing the data-state attr to var state
        var state = $(this).attr("data-state");
        
        //Checks state condition to state or animate then change the state 
        if(state==="still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state","animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      
      });

});
