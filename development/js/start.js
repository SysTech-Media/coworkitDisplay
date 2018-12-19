$.StartScreen = function () {
	var plugin = this;
	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

	plugin.init = function () {
		setTilesAreaSize();
		if (width > Metro.media_sizes.LD) addMouseWheel();
	};

	var setTilesAreaSize = function () {
		var groups = $(".tiles-group");
		var tileAreaWidth = 80;
		$.each(groups, function (i, t) {
			if (width <= Metro.media_sizes.LD) {
				tileAreaWidth = width;
			} else {
				tileAreaWidth += $(t).outerWidth() + 80;
			}
		});
		$(".tiles-area").css({
			width: 1080 //tileAreaWidth
		});
	};

	var addMouseWheel = function () {
		$("body").mousewheel(function (event, delta, deltaX, deltaY) {
			var page = $(".start-screen");
			var scroll_value = delta * 50;
			page.scrollLeft(page.scrollLeft() - scroll_value);
			return false;
		});
	};

	plugin.init();
};

$.StartScreen();

$.each($('[class*=tile-]'), function () {
	var tile = $(this);
	setTimeout(function () {
		tile.css({
			opacity: 1,
			"transform": "scale(1)",
			"transition": ".3s"
		}).css("transform", false);

	}, Math.floor(Math.random() * 500));
});

$(".tiles-group").animate({
	left: 0
});

$(window).on(Metro.events.resize + "-start-screen-resize", function () {
	$.StartScreen();
});

function pageLoad() {
	startTime()
	getCalendarData()
	var t = setTimeout(gotoIndex, 300000);
}

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();

	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('time').innerHTML =
		"<h1>" + h + ":" + m + "</h1>";
	var t = setTimeout(startTime, 500);
}

function checkTime(i) {
	if (i < 10) {
		i = "0" + i
	}; // add zero in front of numbers < 10
	return i;
}

function gotoIndex() {
	window.location.href = './index.html';
}

function getCalendarData() {
	$.getJSON('https://coworkit.de/wp-json/tribe/events/v1/events/', function (data) {

		var monat = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September',
			'Oktober', 'November', 'Dezember'
		]
		var text = ""

		if (data.events.length > 4) {
			maxItems = 4
		} else {
			maxItems = data.events.length
		}

		console.log(data.events.length)
		console.log(maxItems)

		for (i = 0; i < maxItems; i++) {
			var monatszahl = parseInt(data.events[i].start_date_details.month) - 1
			var monatsname = monat[monatszahl]
			console.log(i)
			text += `<a href="javascript:void(0)" onclick="openInfo(${i});">
         	<div class="cal-card-wrapper">
         			<span class="cal-card-day">${data.events[i].start_date_details.day}</span>
         			<span class="cal-card-month">${monatsname}</span>
         			<span class="cal-card-shortline"></span>
         			<span class="cal-card-name">${data.events[i].title}</span>
         			<span class="cal-card-longline"></span>
         			<span class="cal-card-time">${data.events[i].start_date_details.hour}:${data.events[i].start_date_details.minutes} - ${data.events[i].end_date_details.hour}:${data.events[i].end_date_details.minutes}</span>
				 </div>
         	</a>`
		}
		document.getElementById("events").innerHTML = text;
		document.getElementById("badge-calendar").innerHTML = data.events.length
		var t = setTimeout(startTime, 60000);
	});
}

function openInfo(id) {
	$.getJSON('https://coworkit.de/wp-json/tribe/events/v1/events/', function (data) {

		var html_content =
			`<h3>${data.events[id].title}</h3>
         <p>${data.events[id].description}.</p>`;
		Metro.infobox.create(html_content);
	});
}

function playGame() {
	var html_content = `<iframe src="https://itch.io/embed/346797" height="167" width="552" frameborder="0"></iframe>`;
	Metro.infobox.create(html_content);
}