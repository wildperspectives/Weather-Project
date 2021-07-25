//jshint esversion:6

const express = require("express");
const https = require("https");
const app = express();

app.use(express.urlencoded({extended : true}));

app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/index.html");
}
);

app.post("/",function(req,res)
{
    const query= req.body.cityName;
    const apiKey = "191b4bfee5c15bae930adfb186c8834f";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" + apiKey+ "&units=" + units;

    https.get(url,function(response)
  {
    console.log(response.statusCode);

    response.on("data",function(data)
    {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

      res.write("<p>The Weather is currently " + weatherDesription + "</p>");
      res.write("<h1>The temperature in" + query +" is "  + temp + " degree Celsius</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});


app.listen(3000,function(req,res)
{
  console.log("Server is running on port 3000");
});
