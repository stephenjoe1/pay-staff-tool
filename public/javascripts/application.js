$(function(){
    $("form.radio-nav").submit(function(e) {
        e.preventDefault();
        window.location = $(this).find('input[type="radio"]:checked').val();
    });
});