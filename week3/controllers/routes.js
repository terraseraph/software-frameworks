"use strict"


exports.test_route = function(req, res){
    res.sendfile('www/test.html')
}

exports.get_data = function(req, res){
    var data = {data: "Loaded.."}
    res.send(data)
}