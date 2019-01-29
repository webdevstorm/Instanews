// Problem: Retrieve content from the NYT Top Stories API and add it to our site.
// If we dont get a successful response, let the user know.
// 1a. Listen for the select menu to change (watching value)

$(function() {
  console.log("we are connected");
  $("#sections").on("change", function() {
    const section = $(this).val();
    console.log(section);

    // 1b. If select value is "" do nothing and return from the function immediately!

    // 1c. Show a loader and clear out old stories

    // $("#ajax-loader.gif")
    //   .bind("ajaxStart", function() {
    //     $(this).show();
    //   })
    //   .bind("ajaxStop", function() {
    //     $(this).hide();
    //   });

    // 2. Send a request to the NYT API for data based on the value of the select menu.

    $.ajax({
      method: "GET",
      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        section +
        ".json?api-key=sB8YhnPoN2AgiBOZ3eLPbcGi9E2OGLzn",
      dataType: "json"
    }).done(function(data) {
      // 3. If successful, parse the data and decide what part we want to append to our DOM.

      // 3b. filter the data in response.results to only include 12 articles with images//check

      let filteredData = data.results
        .filter(info => {
          return info.multimedia[4];
        })
        .slice(0, 12);
      console.log(data);

      // 3c. create .each to run a function for each article//check?

      $.each(data.results, function(key, value) {
        $(".articles").append(
          "<li> <img src='" +
            value.multimedia[4].url +
            "'>" +
            value.title +
            "</li>"
        );
        // console.log(value);
      });

      // 3d. check the article has an image
      $.get(image_url)
        .done(function() {
          // Do something now you know the image exists.
          // 4. for each article - create constants for each image URL, title and link
          // 4a. make a HTML string for the article, using the constants we just created
          // 4b. append string to stories section
          // 5. If unsuccessful, append and show a helpful error message to the user in the UI.
          // (Image doesn't exist - do something else.)
        })
        .fail(function() {
          $results.empty();
          $results.append(
            "<p>Sorry, were having troubles loading the site right now....</p>"
          );
        });
    });
    // 6. Hide the loader again
    // $.always(function() {
    //   $("loader").hide();
    // }
  });
});
