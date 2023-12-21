const sunriseText = $(".sunrise-data").text();
$("#sunrise").hover(
    function () {
        $(".fa-sun").toggleClass("fa-spin");
    }
)

$("#sunset").hover(
    function () {
        $(".fa-moon").toggleClass("fa-beat-fade");
    }
)

$("#daylength").hover(
    function () {
        $(".fa-calendar-day").toggleClass("fa-flip");
    }
)

$(".mode-buttons").on("click",
    function () {
        $(this).toggleClass("pressed");

        if (!$("#sunrise").hasClass("pressed") && !$("#sunset").hasClass("pressed") && !$("#daylength").hasClass("pressed")) {

            $(".sunset-data").hide();

            $(".daylength-data").hide();

            $(".sunrise-data").text("Please choose a mode");

            $(".sunrise-data").show(50);
        } else {

            if (!$("#sunrise").hasClass("pressed")) {
                $(".sunrise-data").hide(50);
            }

            if ($("#sunrise").hasClass("pressed")) {
                $(".sunrise-data").text(sunriseText);
                $(".sunrise-data").show(50)
            }

            if (!$("#sunset").hasClass("pressed")) {
                $(".sunset-data").hide(50)
            }

            if ($("#sunset").hasClass("pressed")) {
                $(".sunset-data").show(50)
            }

            if (!$("#daylength").hasClass("pressed")) {
                $(".daylength-data").hide(50)
            }

            if ($("#daylength").hasClass("pressed")) {
                $(".daylength-data").show(50)
            }
        }
    }
)