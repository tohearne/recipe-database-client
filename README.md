# Recipe Database Client
This is the frontend for my recipe database, a web app that lets users browse and favorite recipes on the site, as well as share their own recipes for others to see and favorite

#### Backend: https://github.com/tohearne/recipe-database-server

## List technologies used
-   html
-   css/scss
-   javascript
-   ajax
-   jquery
-   handlebars
-   bootstrap
-   json

## Document your planning and tell a story about your development process and problem-solving strategy.
For this project I had no idea what I wanted to do at first, I eventually decided to take a basic premise (recipes) and add levels of complexity by having two ways users can have a relationship with a recipe. One being that they published the recipe and the other being that they like one that someone else made.

With very few issue with the backend I was able to spend most of my time working on the api interactions in the front end and how to show/get information from the user

The first thing I did was framework my HTML, I created all the forms and buttons I would need including the ones that I planned to turn into handlebars templates later.
with all of these filled in I was able to get stated on my API interactions, starting with user auth events. I got stuck for a bit unsure as to why my curl scrips were working but my API wasnt, but after looking at it for a bit I realized that I had just named a few things "user" isntead of "credentials" a quick swap fixed it.
Having user auth done I moved on to creating a cook at the same time as a user and then I started working on creating a recipe.
This one was a bit tricky and I had to re-visit it later when I noticed an issue with the ordering of ingredients / steps. After getting the form data I used part of it to create the recipe, if that was successful I would then loop through all the ingredients and send api requests to make those, using the id from the newly created recipe to relate them, I did the same for the steps. What I realized later was that the API requests that I was sending didn't always get received/compleated in the order that I wanted, to fix this I made the function that creates the ingredients/steps an anyncronus one and had each of the requests await so that they would all be done in order.
Now that there were recipes in the database I next worked on the index and show requests so the recipe information would be shown. For this I begain to work on using handlebars templates. I would take the placeholder HTML I made earlier, cut it out of the HTML document and paste it into a handlebars file to use as a base, from there I added in the variables which would carry the returned recipe's data. In the case of indexing them, I had a loop inside of the handlebars template so it would create elements for all of the recipes given to it.
The next big feature I wanted to implement was being able to favorite recipes. For this I added a button to the recipe elements and had a data-id stored on it that matched the recipe's id. This made it easy to create the favorites.
Wanting to have unfavoriting/editing recipes next I realized that I would need to check if the user publised that recipe or if it is already a favorite. Because recipes have users through favorites I was able to loop through those to find a matching ID and I was also able to look at the recipe for a matching cook id. Based on the result an different button template will appear.
Unfavoreting was fairly easy, but editing took a bit.
For the form I set up a template that I would then fill with the recipe's current information, my initial idea was to let the user add and remove ingredients/steps but after realizing how it would require checking to see if the line already existed or to remove the html element and then have it know to send a delete request, I decided it would take too long for the amount of time I had left.
I set up a way to sort the array of recipes based on the newest (reverse the array) or the ones with the most favorites (reverse the array and then sort by favorites.lentgh)
Similar to the sorting, I set up some filters that when clicked would index the recipes and then remove any from the array that didn't match what was being looked for (two for if it is a favorite or one that you own, and another that filters by a string you give it)
I also added some UI events that would hide or show elements based on whether the user is logged in or not.
With all the events and API interactions all set up the CSS took a little extra tweaking (adding/removing/changing class names) but for the most part went as planned. Some extra time could be spent to style it better though...


## List unsolved problems which would be fixed in future iterations.
Not really issues, but more things I would like to do if I had more time
Right now you can't remove ingredients or steps from the create recipe form
Right now you can't add or remove ingredients or steps when updating a recipe

## Link to Wireframes and user stories.
Wireframes: https://imgur.com/a/pjOtY0C

User stories:
-   As a user I want to browse the recipies without needing to sign up/in
-   As a user I want to be able to create an account
-   As a user I want to be able to sign in to my account
-   As a user I want to be able to change my password
-   As a user I want to be able to sign out
-   As a user I want to be able to save recipes as my favorites
-   As a user I want to be able to publish my own recipes
-   As a user I want to be able to view my published or favorited recipes seperately
-   As a user I want to be able to search for recipes by name
-   As a user I want to be able to sort the recipes by popularity or newest
-   As a user I want to be able to edit my recipes
-   As a user I want to be able to remove recipes from my favorites
-   As a user I want to be able to delete a recipe I published
