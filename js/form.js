
$(function () {
    $('#contactForm').validator().on('submit', function (e) {
        if (e.isDefaultPrevented()) {
            // handle the invalid form...
            console.log("invalid form")
        } else {
            e.preventDefault();
            // remove the error class
            $('.form-group').removeClass('has-error');
            $('.help-block').remove();
            $('#loading').show();

            var $form = $("#contactForm");
            // process the form
            $.ajax({
                type: 'POST',
                url: 'php/contact.php',
                data: $form.serialize(),
                dataType: 'json',
                encode: true
            }).done(function (data) {
                $('html,body').animate({scrollTop: 0}, 'slow'); //navigate to body
                if (data.debug) {
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

                } else if (data) {
                    // display success message

                    $('#successModalContent').html('<span>' + data.message + '</span>');
                    $('#confirmationModal').modal('toggle');
                }
            }).fail(function (data) {
                if (data && data.errors && !data.success) {
                    if (data.errors.exception) {
                        console.log(data.errors.exception);
                        $('html,body').animate({scrollTop: 0}, 'slow'); //navigate to body
                        $('#error').html('<div class="alert alert-danger">' + data.errors.exception + '</div>');
                    }
                } else {
                    $('#errorModalContent').html('<span>Une error est survenue, l\'mail ne peut pas être envoyé!<br> Contactez-nous à partir de votre boîte mail personnel ou par téléphone svp</span>');
                    $('#errorModal').modal('toggle')
                }
                // for debug
                //console.log(data)
            }).always(function () {
                $('#loading').hide();
            });
        }
    });

    $('#confirmationModal').on('hidden.bs.modal', function (e) {
        //redirect to index
        window.location.href = "http://bosdeco.be";
    });


});
