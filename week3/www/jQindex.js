/* global $*/

$( document ).ready(function() {
    console.log( "ready!" );
    init_load()
});


function init_load(){
    $.get( `/get_data`,)
        .done(function( data ) {
        console.log( "Data Loaded: " + data.data );
    });
    
    $.ajax({ 
     url:"start.html"})
        .done(function(data) {
            $("#content").html(data);
            console.log("got the page", data)
            $.get('footer.html', function(dat){
                $('body').append(dat)
            })
    });
}


function send_login(){
    var user = $('#username').val()
    var pass = $('#password').val()
    var dat = {user: user, pass: pass}
    $.post(`/login`, dat, function(data){
        console.log(data)
        if(data.ok == true){
            $.get('login.html', function(dat){
                $('#content').html(dat)
            })
        }
        else{
            $.get('test.html', function(dat){
                $('#content').html(dat)
            })
        }
    })
}