$(document).ready(function() {
    // Star rating functionality
    let rating = 0;

    window.highlightStars = function(num) {
        for (let i = 1; i <= num; i++) {
            $(`#ratings .star:nth-child(${i})`).addClass('highlighted');
        }
    };

    window.resetStars = function() {
        $('#ratings .star').removeClass('highlighted');
    };

    window.rate = function(num) {
        rating = num;
        resetStars();
        highlightStars(num);

        // Add glowing effect and size increase to all highlighted stars
        //for (let i = 1; i <= num; i++) {
         //   $(`#ratings .star:nth-child(${i})`).addClass('clicked');
        //}

        setTimeout(function() {
            if (num <= 3) {
                $('#pageTitle').text("Tell us more");
                $('#ratings').hide();
                $('#testing').hide();
                $('#feedback').show().addClass('active');
            } else {
                //window.open('https://g.page/r/CSBDce4Rxoo9EBE/review');
                //Paste review link above
                window.location.href = 'https://www.google.com/maps?q=178+Tyrwhitt+Rd,+Wang+Omakase+Sushi+Bar,+Singapore+207577&ftid=0x31da19ba705f2be1:0x12a6b2a8f8d35437&entry=gps&lucs=,94224825,94227247,94227248,47071704,47069508,94218641,94203019,47084304,94208458,94208447&g_ep=CAISDTYuMTI0LjEuNzM0NDAYACCs3wEqWiw5NDIyNDgyNSw5NDIyNzI0Nyw5NDIyNzI0OCw0NzA3MTcwNCw0NzA2OTUwOCw5NDIxODY0MSw5NDIwMzAxOSw0NzA4NDMwNCw5NDIwODQ1OCw5NDIwODQ0N0ICU0c%3D&g_st=com.google.maps.preview.copy';
                //Paste navigator link above such as website
                //Change for specific companies
            }
        }, 600); // 0.5 second delay

        // Remove the glowing effect and size increase after some time
        setTimeout(function() {
            $(`#ratings .star`).removeClass('clicked');
        }, 1500); // 1.5 seconds to remove the effect

        // Set the rating value in the hidden input
        $('#ratingValue').val(rating);
    };

    $('#feedbackForm').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission
        alert("We Have Received Your Feedback!");

        $.ajax({
            type: "POST",
            url: "https://api.web3forms.com/submit",
            data: $(this).serialize(),
            dataType: "json",
            success: function(response) {
                if (response.success) {
                    console.log("Feedback sent successfully!");
                } else {
                    console.error("There was an error sending your feedback: " + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX error: " + status + " - " + error);
            },
            complete: function() {
                $("#feedbackForm")[0].reset();
                $('#feedback').hide();
                $('#ratings').show();
                setTimeout(function() {
                    $('.contact-us-message').show(); // Show the contact us message after 2 seconds
                }, 10);
            }
        });
    });
});