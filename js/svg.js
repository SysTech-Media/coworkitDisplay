function meldung(id) {
    var id = event.target.id;
    console.log("Clicked Element ID: " + id);

    switch (id) {
        case "1-1":
            alert("Nathalie Hoffmann")
            break;
        case "2-1":
            alert("Sven Wagner")
            break;
        case "2-2":
            alert("Phil Derichs")
            break;
        case "2-3":
            alert("Evgeniy Khavkin")
            break;
        case "8-5":
              var source = "members/" + id + ".html"
            break;
        default:
            alert("FEHLER!")
            break;
    }
//   document.getElementById("members").src=source;
$('#members').fadeOut(500, function() {
    $('members').attr("src", source);
    $('members').fadeIn(500);
});
}