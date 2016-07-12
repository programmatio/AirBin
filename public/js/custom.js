(function() {

    // Helper functions

    function utcToLocal(date) {
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();

        newDate.setHours(hours - offset);

        return newDate;
    }

    // Tranlate UTC view to local time view 
    var translateToLocalTime = (function() {
        var currentTime = $('.creation').html();
        var expiryTime = $('.expiry').html();
        currentTime = utcToLocal(new Date(currentTime));
        expiryTime = utcToLocal(new Date(expiryTime));
    });

    // Main loop

    var init = (function() {


        $(document).ready(function() {

            // Adjust input field height
            autosize($('.paste-area'));


            // Highlight the code
            hljs.initHighlightingOnLoad();

            // Translate to local time
            translateToLocalTime();

        });

    });

    init();

}());
