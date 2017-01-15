/**
 * A fork of Simon Fokaults original project.
 * Created by 090392 on 15/11/2016.
 */
(function ($) {
    var icons = document.querySelectorAll('.icon__img'),
        blurb = document.querySelector('#blurb'),
        blurbHeader = document.querySelector('#blurb__h3'),
        blurbText = document.querySelector('#blurb__p'),
        blurbButton = document.querySelector('#blurb__button'),
        mouseoverCover = document.querySelector('#mouseover-cover'),
        imperative = document.querySelector('#landing__imperative'),
        mq1080 = window.matchMedia("(min-width: 1080px)"),
        flights;

    /**
     * Initialise the UI.
     */
    function init() {
        $.getJSON("json/flights.json", function (json) {
            flights = json.flights;
            refreshFlights(icons[0].id);
            blurb.classList.remove('hide');
        });
    }

    //function to replace icon with blue on hover
    function hoverOn(evt) {
        evt.target.src = 'images/' + evt.target.id.slice(0, -4) + '-icon-blue.png';
        refreshFlights(evt.target.id);
        blurb.classList.remove('hide');
    }

    function hoverOff(evt) {
        evt.target.src = 'images/' + evt.target.id.slice(0, -4) + '-icon.png';
    }

    //function to hide blurb on hoveroff of icon strip
    function hoverOffStrip(evt) {
        if (window.matchMedia("(min-width: 530px)").matches) {
            evt.stopPropagation();
            blurb.classList.add('hide');
        }
        draw();
    }

    //draw lines
    function draw(points) {
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        //clear canvas
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
        //set stroke and start path
        ctx.strokeStyle = '#FFFFFF';
        ctx.moveTo(points[0][0], points[0][1]);
        for (var i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
            ctx.stroke();
        }
    }


    function refreshFlights(id) {
        var flight = null;
        for (var i = 0; i < flights.length; i++) {
            if (flights[i].id == id) {
                flight = flights[i];
                break;
            }
        }
        if (flight) {
            draw(flight.points);
            //condition that adjusts hide area based on browser size. If too small, stretch most of the page.
            if (mq1080.matches) {
                mouseoverCover.style.width = flight.widthLrg;
            } else {
                mouseoverCover.style.width = flight.widthSm;
            }
            imperative.innerHTML = flight.imperative;
            blurbHeader.innerHTML = flight.name;
            blurbText.innerHTML = flight.blurbHTML;
        }
    }

    init();
    //add listeners to icons
    for (var i = 0; i < icons.length; i++) {
        icons[i].addEventListener('mouseover', hoverOn);
        icons[i].addEventListener('mouseout', hoverOff);
    }

})(jQuery);