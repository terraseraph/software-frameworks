/* global $*/

$( document ).ready(function() {
    console.log( "ready!" );
    init_load()
});


function init_load(){
    $.get( `/get_data`,)
        .done(function( data ) {
        alert( "Data Loaded: " + data.data );
    });
}

