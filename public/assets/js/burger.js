// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-eaten").on("click", function(event) {
    var id = $(this).data("id");
    var newEaten = $(this).data("lunch");

    var newLunch = {
      eaten: newEaten
    };

    // Send the PUT request.
    $.ajax("/api/food/" + id, {
      type: "PUT",
      data: newLunch
    }).then(
      function() {
        console.log("changed eaten state to", newLunch);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newburger = {
      name: $("#burger-name").val().trim(),
      eaten: 0
    };

    console.log(newburger)

    // Send the POST request.
    $.ajax("/api/food", {
      type: "POST",
      data: newburger
    }).then(
      function() {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/food/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
