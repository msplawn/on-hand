var results = $("#results");

var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

function mapNumberedKeys(item, field) {
    var count = 1;
    var array = [];
    while (item[`str${field}${count}`]) {
        array.push(item[`str${field}${count}`].toLowerCase());
        count++;
    }
    return array;


}

function updatePage(allDrinks) {
    //console.log(allDrinks);

    allDrinks.map((drink) => {
        //need to connect elements to semantic elements - jess

        var drinkCard = $('<div class ="ui card">');

        var $drinkImg = $('<div class="image">');
        $("<img src=" + drink.img + ">").appendTo($drinkImg);
        $drinkImg.appendTo(drinkCard);

        var cardBody = $('<div class ="content">')
        $("<h2>").text(drink.name).appendTo(cardBody);
        $("<h4>").text(drink.ingredient).appendTo(cardBody);
        $("<h4>").text(drink.measure).appendTo(cardBody);
        $("<h4>").text(drink.instructions).appendTo(cardBody);

        cardBody.appendTo(drinkCard);
        drinkCard.appendTo("#results");

    })



}




$("#searchCocktails").on('click', function (event) {
    event.preventDefault();
    var ingredientName = $('#userInput').val().trim();
    results.empty();
  
   queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (response.drinks === null){
            alert("No");
        }
    
        // console.log(response);
        // console.log(response.drinks);


        let allDrinks = [];
        //loop through length of drinks 
        

        for (var i = 0; i < response.drinks.length; i++) {
            var drink = response.drinks[i];



            let drinkResult = {};


            let count = 1;
            var ingredients = mapNumberedKeys(drink, "Ingredient");
            var measurements = mapNumberedKeys(drink, "Measure");
            var strDrink = (drink.strDrink);
            var strDrinkThumb = (drink.strDrinkThumb);
            var strInstructions = (drink.strInstructions);

            // if (ingredients.includes(!ingredientName === null)){
            //     alert("No")
            //             }
            // console.log("Ingredient:", ingredients);


            if (ingredients.includes(ingredientName.toLowerCase())) {

                drinkResult.name = strDrink;
                drinkResult.img = strDrinkThumb;
                //console.log(strDrinkThumb);
                drinkResult.ingredient = ingredients;
                drinkResult.measure = measurements;
                drinkResult.instructions = strInstructions;
                allDrinks.push(drinkResult);

                // console.log(ingredients);



                // console.log("Drink Name:", strDrink);
                // console.log("Drink Image:", strDrinkThumb);

                // console.log("Measure:", measurements);
                // console.log("Instructions:", strInstructions);


            }

            function noIngredient() {
                if (ingredients === 0) {
                    alert("No")
                }
            }


        }


        updatePage(allDrinks);



    });

    
    //.on("click") function associated with the clear button
    // $("#clear-all").on("click", clear);


});

