const express = require("express");
const https = require("https");
// const request = require("request");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data); 
    const url = "https://us14.api.mailchimp.com/3.0/lists/fad5a34175";
    const options = {
        method: "POST",
        auth: "abhishek01:9eed3566cba6baacc8c10de2314b0705-us14"
    }

    const request = https.request(url, options, function(response) {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })

    // request.write(jsonData);
    request.end();
    
})

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on " + port);
})


// api keys
// 9eed3566cba6baacc8c10de2314b0705-us14

// list id
// fad5a34175