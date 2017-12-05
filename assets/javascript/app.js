$(document).ready(function(){

	// Function for displaying animals button data
    function renderButtons() {

      // Initial array of animals
      var $animals = ["Dogs","Cats","Pigs", "Rooster", "Fish", "Zebra", "Lion", "Tiger", "Elephants", "Rhinocerous"];
    
        //initial load, set the id animals-view to empty
      	$("#animals-view").empty();

        //loop through all the animals in the array variable
      	for (var i = 0; i < $animals.length; i++) {

          //call renderButton 
         	renderButton($animals[i]);
      	}
      }

    // generate each buttton while in the for loop
    function renderButton(animalText) {

      //created button object elements
      //added a class animal 
      //set value of animalText argument to the data-name attr
      //append value of b to id animals-view in the html page
        $("<button>", {
          class: "animal",
          "data-name": animalText,
          text: animalText
        }).appendTo("#animals-view");
      }

    //on.click() event function to the id add-animals in the html page(form)
    $("#add-animals").on("click", function(event) {

      //prevent the default event to load
    	event.preventDefault(); 

      //get id animal-input value without the white spaces and set it to var animal
    	var $animal = $("#animals-input").val().trim();

      //check if $animal has a valid value
      // debugger;
      if ( $animal.length !== 0 ) {
        //call renderButton and pass an argument animal
        renderButton($animal);      
      }
     	
    });

    renderButtons();
   
    // Adding click event listener to animal class and html page
    $(document).on("click", ".animal", function(event) {

      //store data-name attr to var animalName
      var $animalName = $(this).attr("data-name");
      
      //store giphy keys to var authKey
      var $authKey = "4qkKoj8RJIwGvZPFpcpRPgFC2VxmyuNK";
    
      //set query path to var queryURL    
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      $animalName + "&api_key=" +  $authKey + "&limit=10";

      //clear id gifs-appear-here before calling query .ajax() before populating new set of images
      $("#gifs-appear-here").empty();

       $.ajax({
          url: queryURL,
          method: "GET"    
          })
        .done(function(response) {

          //
          var $results = response.data;  

          //
          for (var i = 0; i < $results.length; i++) {

            //created new div tag and store it in a new var animalDiv
            var $animalDiv = $("<div>");

            //store response data results[] image fixed height to a new var animatedSrc
            var $animatedSrc = $results[i].images.fixed_height.url;

            //store response data results[] image fixed height_still to a new var stillSrc
            var $stillSrc = $results[i].images.fixed_height_still.url;

            //var for results[].rating
            var $rating = $results[i].rating;

            //created new p tag and get the rating and store it in a new var p
            var $p = $("<p>").text("Rating: " + $rating);

            //append p to animalDiv
            $p.appendTo($animalDiv);
            
            //set img object 
            //set results[i].images.fixed_height.url to src attributes and store it in img object
            //add class animate
            //set animate data to data-state attribute
            //set stillSrc value to data-still attr
            //set animatedSrc value to data-animate
            //append img to animalDiv
            $("<img>", {
                "src": $results[i].images.fixed_height.url,
                class: "animate",
                "data-state": "animate",
                "data-still": $stillSrc,
                "data-animate": $animatedSrc
            }).appendTo($animalDiv);

            //prepend animalDiv value(image) to id gifs-appear-here in HTML page
            $("#gifs-appear-here").prepend($animalDiv);
          }

        });
    
    });

    //events for still-animate of the images using id gifs-appear-here in html page
    $("#gifs-appear-here").on("click", ".animate", function(event) {

        //storing the data-state attr to var state
        var $state = $(this).attr("data-state");
        
        //Checks state condition to still or animate then change the state  
        if($state==="still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state","animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      
      });

});
