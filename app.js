const express=require("express");
const https=require("https");

var key=require("./config");
var KEY=key.MY_KEY;

const bodyParser=require("body-parser");
const { MY_KEY } = require("./config");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(request,response){
    response.sendFile(__dirname+ "/index.html");
    
});

app.post("/",function(request,response){
        const name=request.body.City;
        const url="https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid="+KEY+"&units=metric";
        https.get(url,function(res){
        res.on("data",function(data){
        const x=JSON.parse(data);
        const tt=x.main.temp;
        const t=x.weather[0].description;
        const icon=x.weather[0].icon;
        const url2="https://openweathermap.org/img/wn/"+icon+"@2x.png";
        const iurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
        
        response.write("<h1>Weather in "+name+" is: "+t+"</h1>");
        response.write("<p>Temperatur is: "+tt+"</p>");
        response.write("<img src=" +url2+" >");
        
        
        response.send();
    })
    
    })
})



app.listen(3000,function(){console.log("server is running");});

