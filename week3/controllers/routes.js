"use strict"


exports.test_route = function(req, res){
    res.sendfile('www/test.html')
}

exports.get_data = function(req, res){
    var data = {data: "Loaded.."}
    res.send(data)
}

exports.send_login = function(req, res){
    console.log("======",req.body)
    var user = req.body.user
    var pass = req.body.pass
    if (user == 'admin' && pass == '123'){
        // res.sendfile('www/login.html')
        res.send({'ok':true})
    }
    else{
        // res.sendfile('www/test.html', {'ok':false})
        res.send({'ok':false})
    }
}