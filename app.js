//jshint esversion: 6 
const express = require ('express');

const bodyParser = require('body-parser');

const request = require('request');

const app  = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true})); 
//app.use('*/css',express.static('public/css'));
//app.use('*/js',express.static('public/js'));
//app.use('*/images',express.static('public/images'));


app.get("/",function (req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    var options = {
        url : "https://us5.api.mailchimp.com/3.0/lists/4174b4a7b1",
        method : "POST",
        headers : {
            "Authorization": "min-mg1 cc31884632889fc3394426354421b8e2-us5"
        },
        body:jsonData
    };
    request(options, function (error, response, body){
        if(error){
            res.send("error: "+error);
        }else{
            if(response.statusCode == 200){
                res.sendFile(__dirname+"/success.html");
            }else{
                res.sendFile(__dirname+"/failure.html");
            }
        }
    });
   


});


app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.port || 3000, function (){
    console.log('Server is running on port 3000');
});

//cc31884632889fc3394426354421b8e2-us5

//subscibe unique id  -4174b4a7b1