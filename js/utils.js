/*
 * btn go up
 * ===============================================================
 */
$(function () {
    $('#btntop').click(function () {
        $('html,body').animate({scrollTop: 0}, 'slow');
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() < 900) {
            $('#btntop').fadeOut();
        } else {
            $('#btntop').fadeIn();
        }
    });
});


/*
 * testimonial => text slider
 * ===============================================================
 */
//setCarouselHeight('#carousel-testimonial');

function setCarouselHeight(id) {
    var slideHeight = [];
    $(id + ' .item').each(function () {
        // add all slide heights to an array
        slideHeight.push($(this).height());
    });

    // find the tallest item
    max = Math.max.apply(null, slideHeight);

    // set the slide's height
    $(id + ' .carousel-content').each(function () {
        $(this).css('height', max + 'px');
    });
}

$(function () {
    var testimonialsHtml = "";
    $.map(testimonials, function (value, index) {

        //console.log( "index: " + index + "; value.comment: " + value.comment + "value.signature: " + value.signature );

        var html = '' +
            '<div class="item">' +
            '<div class="carousel-content">' +
            '<div>' +
            '<p>' + value.comment + '</p><br>' +
            '<span class="signatureComment">' + value.signature + '</span>' +
            '</div>' +
            '</div>' +
            '</div>';

        testimonialsHtml = testimonialsHtml + html;
    });

    $("#testimonials").html(testimonialsHtml);
    $("#testimonials div:first-child").addClass('active');
});


/*
 * google maps
 * ===============================================================
 */
function initMap() {
    var var_location = new google.maps.LatLng(50.836899, 4.320567);

    var var_mapoptions = {
        center: var_location,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        scrollwheel: false,
        draggable: true,
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true
    };
    var map = new google.maps.Map(document.getElementById('map-container'), var_mapoptions);

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
        position: var_location,
        map: map,
        title: "Bos Deco"
    });

}


/*
 * google analytics
 * ===============================================================
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-21762857-4']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();


/*
 * JSON data
 * ===============================================================
 */
var testimonials = [
    {
        comment: "Je tenais à vous remercier pour le travail de restauration que vous avez réalisé sur notre fauteuil.",
        signature: "Marie et Alain."
    },
    {
        comment: "J'ai bien reçu les deux fauteuils. Très beau travail! Merci beaucoup!",
        signature: "Fabienne Delogne."
    },
    {
        comment: "Je tenais tout d'abord à vous remercier pour la rapidité et l'excellente qualité de votre travail!",
        signature: "Mark"
    },
    {
        comment: "Mille mercis encore pour le fauteuil que vous m'avez rapporté à Koekelberg.",
        signature: "Bernard"
    },
    {
        comment: "Je vous remercie pour votre excellent travail. Je recommande.",
        signature: "Paul"
    },
    {
        comment: "Une gentillesse extraordinaire et un travail de qualité.",
        signature: "Valerie"
    }

];