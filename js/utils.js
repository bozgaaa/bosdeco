

 /*
 * btn go up
 * ===============================================================
 */
$(function(){
    $('#btntop').click(function() {
        $('html,body').animate({scrollTop: 0}, 'slow');
    });

    $(window).scroll(function(){
        if($(window).scrollTop()<900){
            $('#btntop').fadeOut();
        }else{
            $('#btntop').fadeIn();
        }
    });
});


/*
 * testimonial => text slider
 * ===============================================================
 */
//setCarouselHeight('#carousel-testimonial');

function setCarouselHeight(id)
{
    var slideHeight = [];
    $(id+' .item').each(function()
    {
        // add all slide heights to an array
        slideHeight.push($(this).height());
    });

    // find the tallest item
    max = Math.max.apply(null, slideHeight);

    // set the slide's height
    $(id+' .carousel-content').each(function()
    {
        $(this).css('height',max+'px');
    });
}
    

 /*
 * google maps
 * ===============================================================
 */
if(window.google && document.getElementById("map-container")){
    function init_map() {
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
            rotateControl: true,
        };

        var var_marker = new google.maps.Marker({
            position: var_location,
            map: var_map,
            title:"Bos Deco"});

        var var_map = new google.maps.Map(document.getElementById("map-container"),
            var_mapoptions);

        var_marker.setMap(var_map);	

      }

    google.maps.event.addDomListener(window, 'load', init_map);
}
  


/*
 * google analytics
 * ===============================================================
 */
 var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-21762857-4']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
