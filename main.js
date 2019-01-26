import { on } from "cluster";

// Problem: Retrieve content from the NYT Top Stories API and add it to our site.
// If we dont get a successful response, let the user know.


// 1a. Listen for the select menu to change (watching value)
// 1b. If select value is "" do nothing and return from the function immediately!
// 1c. Show a loader and clear out old stories
// 2. Send a request to the NYT API for data based on hte value of the select menu.
// 3. If successful, parse the data and decide what part we want to append to our DOM.
// 4. Append the stuff to our DOM
// 5. If unsuccessful, append and show a helpful error message to the user in the UI.
// 6. Hide the loader again

// the same as document ready
$(function() {
  $("#sections").on("change", function() {
    const section = $(this).val();
    // console.log(section);

    // If section is empty, return

  
    // show loader
    
    // clear stories

    //

    // make our ajax request
    $.ajax({
      method: "GET",
      url: "file:///Users/macuser/Work/project-02/index.html" + section + ".json?api-key=sB8YhnPoN2AgiBOZ3eLPbcGi9E2OGLzn",
      dataType: "json"
    })
      .done(function(response) {
          console.log(response); // is an object
          console.log(response.results);
          // append all the things!!


          // 1. filter the data in response.results to only include 12 articles with images

      let filteredData = data.results.filter(info => {
        return info.multimedia[4];
        }).slice(0, 12);


          // 2. create .each to run a function for each article
          // 2. check the article has an image
          // 3. for each article - create constants for each image URL, title and link
          // 4. make a HTML string for the article, using the constants we just created
          // 5. append string to stories section

    
      })
      .fail(function() {
        // Do stuff here if it doesn't work out
        $results.empty();
        $results.append('<p>Sorry, were having troubles loading the site right now....</p>');

      })
      .always(function() {
        // hide the loader
        $('').hide();

        $r
      });
  });
});
