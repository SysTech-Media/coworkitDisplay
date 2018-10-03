$.StartScreen = function(){
    var plugin = this;
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    plugin.init = function(){
        setTilesAreaSize();
        if (width > Metro.media_sizes.LD) addMouseWheel();
    };

    var setTilesAreaSize = function(){
        var groups = $(".tiles-group");
        var tileAreaWidth = 80;
        $.each(groups, function(i, t){
            if (width <= Metro.media_sizes.LD) {
                tileAreaWidth = width;
            } else {
                tileAreaWidth += $(t).outerWidth() + 80;
            }
        });
        $(".tiles-area").css({
            width: tileAreaWidth
        });
    };

    var addMouseWheel = function (){
        $("body").mousewheel(function(event, delta, deltaX, deltaY){
            var page = $(".start-screen");
            var scroll_value = delta * 50;
            page.scrollLeft(page.scrollLeft() - scroll_value);
            return false;
        });
    };

    plugin.init();
};

$.StartScreen();

$.each($('[class*=tile-]'), function(){
    var tile = $(this);
    setTimeout(function(){
        tile.css({
            opacity: 1,
            "transform": "scale(1)",
            "transition": ".3s"
        }).css("transform", false);

    }, Math.floor(Math.random()*500));
});

$(".tiles-group").animate({
    left: 0
});

$(window).on(Metro.events.resize + "-start-screen-resize", function(){
    $.StartScreen();
});

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
    "<h1>" + h + ":" + m +"</h1>";
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
