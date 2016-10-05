$(document).ready(function() {
  $("button[type='submit']").prop( "disabled", true);
  var validation;
  $("#contact-form").on('keyup',function() {
    validation = $('#contact_name').hasClass('valid') && $('#contact_email').hasClass('valid') && $('#contact_message').hasClass('valid');
    if (validation) {
      $("button[type='submit']").prop( "disabled", false);
    } else {
      $("button[type='submit']").prop( "disabled", true);
    }
  })

  $('#contact_name').on('input', function() {
    var value = $(this).val();
  	var input = $(this);
    var re = /^[A-Z][a-zA-Z']+[ ]+[A-Z][a-zA-Z'\- ]*$/;
  	var is_name = re.test(input.val());
  	if(is_name){
      input.removeClass("invalid").addClass("valid");
      $('#contact_name ~ span').removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
      $('#contact_name ~ span').removeClass("valid").addClass("invalid");
    }
    if (value.length == 0) {
      $('#contact_name ~ span').removeClass("invalid").addClass("valid");
      $("#contact_name").parent().after("<span class='validation'>This field is required</span>");
    } else {
      $("#contact_name").parent().next(".validation").remove();
    }
  });

  $('#contact_email').on('input', function() {
    var value = $(this).val();
  	var input = $(this);
  	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	var is_email = re.test(input.val());
  	if(is_email){
      input.removeClass("invalid").addClass("valid");
      $('#contact_email ~ span').removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
      $('#contact_email ~ span').removeClass("valid").addClass("invalid");
    }
    if (value.length == 0) {
      $('#contact_email ~ span').removeClass("invalid").addClass("valid");
      $("#contact_email").parent().after("<span class='validation'>This field is required</span>");
    } else {
      $("#contact_email").parent().next(".validation").remove();
    }
  });

  $('#contact_message').on('input', function() {
    var value = $(this).val();
    var input = $(this);
    var re = /([A-Za-z])\w+/;
    var is_message = re.test(input.val());
    if(is_message){
      input.removeClass("invalid").addClass("valid");
      $('#contact_message ~ span').removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
      $('#contact_message ~ span').removeClass("valid").addClass("invalid");
    }
    if (value.length == 0) {
      $('#contact_message ~ span').removeClass("invalid").addClass("valid");
      $("#contact_message").parent().after("<span class='validation'>This field is required</span>");
    } else {
      $("#contact_message").parent().next(".validation").remove();
    }
  });

  $("#contact-form").submit(function sendDataForm() {
    event.preventDefault();
    $("button[type='submit']").prop( "disabled", true);
    var data = $('#contact-form').serializeArray();
    $.ajax({
      type: 'POST',
      url: '/contacts',
      data: data,
      success: function(data) {
        $('#contact-form').trigger("reset");
        $('#loginprogress').html('Message sent successfully').css('color','green');
        $('#loginprogress').delay(2000).fadeOut();
      },
      error: function(xhr, str){
        $('#contact-form').trigger("reset");
        $('#loginprogress').html('Error while sending').css('color','red');
        $('#loginprogress').delay(2000).fadeOut();
      }
    });
  });
});
