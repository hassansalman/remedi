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





//create firebase reference
var dbRef = new Firebase("https://remedibrand.firebaseio.com/");
var clientsRef = dbRef.child('clients')

//load older conatcts as well as any newly added one...
clientsRef.on("child_added", function(snap) {
  console.log("added", snap.key(), snap.val());
  $('#clients').append(contactHtmlFromObject(snap.val()));
});

//save contact
$('.addValue').on("click", function( event ) {
    event.preventDefault();
    if( $('#name').val() != '' || $('#email').val() != '' ){
      clientsRef
        .push({
          first: $('#first').val(),
          last: $('#last').val(),
          email: $('#email').val(),
          phone: $('#phone').val()
          }
        })
        registerForm.reset();
    } else {
      alert('Please fill at least name or email!');
    }
  });

  $("#login-btn").on('click', function()
  {
          var email = $("#login-email").val();
          var password = $("#login-password").val();
          dbRef.authWithPassword({
              email: email,
              password: password
          },
          function(error, authData) {
              if (error) {
                  console.log("Login Failed!", error);
              } else {
                  console.log("Authenticated successfully with payload:", authData);
              }
          });
  });


//prepare conatct object's HTML
function contactHtmlFromObject(client){
  console.log( client );
  var html = '';
  html += '<li class="list-group-item client">';
    html += '<div>';
      html += '<p class="lead">'+client.name+'</p>';
      html += '<p>'+client.email+'</p>';
      html += '<p><small title="'
                +client.location.zip+'">'
                +client.location.city
                +', '
                +client.location.state
                +'</small></p>';
    html += '</div>';
  html += '</li>';
  return html;
}
