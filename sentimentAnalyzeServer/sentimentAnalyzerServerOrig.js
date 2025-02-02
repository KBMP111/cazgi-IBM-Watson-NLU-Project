const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
      version: '2021-03-25',
      authenticator: new IamAuthenticator({
        apikey: api_key,
      }),
      serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

///comments

const analyzeParams = {
      'html': '<html><head><title>Fruits</title></head><body><h1>Apples and Oranges</h1><p>I love apples! I don\'t like oranges.</p></body></html>',
      'features': {
        'emotion': {
          'targets': [
            'apples',
            'oranges'
          ]
        }
      }
    };

////Delete for testing purposes only
function analyze(res) {
    let naturalLanguageUnderstanding = getNLUInstance();

    const analyzeParams = {
      'html': '<html><head><title>Fruits</title></head><body><h1>Apples and Oranges</h1><p>I love apples! I don\'t like oranges.</p></body></html>',
      'features': {
        'emotion': {
          'targets': [
            'apples',
            'oranges'
          ]
        }
      }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analyzeResult) => {
            res.send(analyzeResult);
        }).catch(err => {
          res.send(err.toString());
        });
}


////


app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    return res.send(analyze());
});

app.get("/url/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

