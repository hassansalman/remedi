// --------------------------------------------------------
// Pretty Photo for Lightbox Image
// --------------------------------------------------------
$(document).ready(function() {
    $("a[data-gal^='prettyPhoto']").prettyPhoto();
});

// --------------------------------------------------------
//	Navigation Bar
// --------------------------------------------------------
$(window).scroll(function(){
	"use strict";
	var scroll = $(window).scrollTop();
	if( scroll > 60 ){
		$(".navbar").addClass("scroll-fixed-navbar");
	} else {
		$(".navbar").removeClass("scroll-fixed-navbar");
	}
});

// --------------------------------------------------------
//	Smooth Scrolling
// --------------------------------------------------------
$(".navbar-nav li a[href^='#']").on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $(this.hash).offset().top
    }, 1000);
});


// --------------------------------------------------------
//	Register Wizard
// --------------------------------------------------------

$(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}


$(function() {
  //Creating the firebase reference.
    var firebaseref = new Firebase("https://remedibrand.firebaseio.com/");

	//Global Variables for userData and the firebase reference to the list.
    var listRef = null;
	var userData = null;

	//timer is used for few animations for the status messages.
	var timer = null;

	//Clear the Status block for showing the Status of Firebase Calls
    $(".status").removeClass('hide').hide();

//Handling Signup process
  $("#signup-btn").on('click', function() {

      var email = $("#email").val();
      var password = $("#password").val();
      var firstName = $("#f_name").val();
      var lastName = $("#l_name").val();
      var phone = $("#phone").val();
      firebaseref.createUser({
          email: email,
          password: password,
          firstName: f_name,
          lastName: l_name,
          phone: phone
      },

      function(error, userData) {
          if (error) {
              console.log("Error creating user:", error);
              $("#signup-btn").parents("#register").find('.status').html("Error creating user:" + error).show();
          } else {
              console.log("Successfully created user account with uid:", userData.uid);
              $("#signup-btn").parents("#register").find('.status').html("Successfully created user account with uid:" + userData.uid).show();
              firebaseref.authWithPassword({
                  email: email,
                  password: password,
              },signupLoginCallback);

          }
      });
  });


});
