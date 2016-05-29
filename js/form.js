(function ($, window, document, undefined) {
    'use strict';

    var $form = $('#contactForm');

    $form.submit(function (e) {
        // remove the error class
        $('.form-group').removeClass('has-error');
        $('.help-block').remove();

        // get the form data
        /*
        var formData = {
            'userName' : $('input[name="userName"]').val(),
            'userEmail' : $('input[name="userEmail"]').val(),
            'userPhone' : $('input[name="userPhone"]').val(),
            'userAddress' : $('input[name="userAddress"]').val(),
            'userMessage' : $('textarea[name="userMessage"]').val(),
            'userPhotos' : $('textarea[name="userPhotos"]').val()
        };
        */
        
        var formdata = (window.FormData) ? new FormData($form[0]) : null;
        var data = (formdata !== null) ? formdata : $form.serialize();
        $('#loading').show();
        // process the form
        $.ajax({
            type : 'POST',
            url  : 'php/contact.php',
            contentType: false, // obligatoire pour de l'upload
            processData: false, // obligatoire pour de l'upload
            data : data,
            dataType : 'json',
            encode : true
        }).done(function (data) {
            $('#loading').hide();
            $('html,body').animate({scrollTop: 0}, 'slow'); //navigate to body
            if(data.debug){
                console.log(data.debug)
            }
            // handle errors
            if (data && data.errors && !data.success) {
                if (data.errors.name) {
                    $('#name-field').removeClass('has-success').addClass('has-error');
                    $('#name-field').find('.form-control-feedback').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                    $('#name-field').find('div.col-xs-12').append('<span class="help-block">' + data.errors.name + '</span>');
                }

                if (data.errors.email) {
                    $('#email-field').removeClass('has-success').addClass('has-error');
                    $('#email-field').find('.form-control-feedback').removeClass('glyphicon-ok').addClass('glyphicon-remove'); 
                    $('#email-field').find('div.col-xs-12').append('<span class="help-block">' + data.errors.email + '</span>');
                }

                if (data.errors.phone) {
                    $('#phone-field').removeClass('has-success').addClass('has-error');
                    $('#phone-field').find('.form-control-feedback').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                    $('#phone-field').find('div.col-xs-12').append('<span class="help-block">' + data.errors.phone + '</span>');
                }
                if (data.errors.exception) {
                    $('#error').html('<div class="alert alert-danger">' + data.errors.exception + '</div>');
                }

            } else if(data) {
                // display success message
                $form.html('<div class="alert alert-success">' + data.message + '</div>');
            }
        }).fail(function (data) {
            $('#loading').hide();
            // for debug
            console.log(data)
        });

        e.preventDefault();
    });
}(jQuery, window, document));