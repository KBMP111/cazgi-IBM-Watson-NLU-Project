const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = new express();
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
function analyze(text,res) {
    let naturalLanguageUnderstanding = getNLUInstance();
/// find the true parameter format
    const analyzeParams = {
      'url': text,
      'features': {
        'entities': {
          'emotion': true,
          'sentiment': true,
          'limit': 2,
        },
        'keywords': {
          'emotion': true,
          'sentiment': true,
          'limit': 2,
        },
      },
    };
///remember to swap out the true parameter format
    naturalLanguageUnderstanding.analyze(analyzeParams)
      .then(analysisResults => {
            console.log(JSON.stringify(analysisResults.result.entities[0].emotion, null, 2));
            res.send(analysisResults.result.entities[0].emotion);
              })
              .catch(err => {
                console.log('error:', err);
                res.send(err.toString());
              });

}

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let text = req.query.url;
    analyze(text,res)
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


app.get("/translate", (req,res) => {
    let textToTranslate = req.query.textToTranslate;
    translate(textToTranslate,res);
});

app.get("/translators", (req,res) => {
  getLanguages(res);
});

let server = app.listen(8080, () => {
    console.log(`Listening at http://localhost:8080`);
    console.log('Listening', server.address().port)
})
