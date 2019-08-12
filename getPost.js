var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout: "main"});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", XXXX);

app.get("/", function(req,res)
{
    var qParams = [];
    for (var q in req.query)
    {
        qParams.push({"name": q, "value": req.query[q]});
    }

    var content = {};
    content.dataList = qParams;
    content.type = "GET";
    res.render("get", content);
});

app.post("/", function(req,res)
{
    var qParams = [];
    for (var q in req.query)
    {
        qParams.push({"name": q, "value": req.query[q]});
    }

    var bParams = [];
    for (var b in req.body)
    {
        qParams.push({"name": b, "value": req.body[b]});
    }
    
    var content = {};
    content.queryList = qParams;
    content.bodyList = bParams;
    content.type = "POST";
    res.render("post", content);

});

app.use(function(req,res)
{
    res.status(404);
    res.render("404");
});

app.use(function(err, req, res, next)
{
    console.error(err.stack);
    res.type("plain/text");
    res.status(500);
    res.render("500");
});

app.listen(app.get("port"), function()
{
    console.log("Express started on port XXXX--press Ctrl-C to terminate.");
});
