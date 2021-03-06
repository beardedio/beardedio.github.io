"use strict";

// Wait till jquery is ready
jQuery(document).ready(function($) {
    function validEmail(email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
        return email.length > 0 && emailReg.test(email);
    }

    $("#msg-send").click(function(event) {
        var name = $("#msg-name").val();
        var email = $("#msg-email").val();
        var message = $("#msg-text").val();
        var inerror = false;

        // Check for valid email
        if (!validEmail(email)) {
            $("#msg-email").addClass("inputerror");
            inerror = true;
        } else {
            $("#msg-email").removeClass("inputerror");
        }

        // Check for message
        if (message.length < 5) {
            $("#msg-text").addClass("inputerror");
            inerror = true;
        } else {
            $("#msg-text").removeClass("inputerror");
        }

        if (inerror) {
            return false;
        }

        // Send message
        $("#msg-form").hide();
        $("#msg-processing").show();
        var url = "https://gxmkmugvrk.execute-api.us-west-2.amazonaws.com/default/sendMail";
        $.ajax({
            type: "POST",
            url: url,
            headers: {
                "X-Api-Key": "none"
            },
            data: JSON.stringify({
                "to_id": "qcJNO7in8U", // brandon.bearded.io
                "email": email,
                "name": name,
                "message": message
            }),
            crossDomain: true,
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                //success stuff. data here is the response, not your original data
                $("#msg-processing").hide();
                $("#msg-success").show();
            },
            error: function(xhr, ajaxOptions, thrownError) {
                //error handling stuff
                $("#msg-processing").hide();
                $("#msg-error").show();
            }
        });
    });

});
