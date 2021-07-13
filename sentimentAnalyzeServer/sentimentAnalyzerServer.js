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
function analyzeURLemotion(text,res) {
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
/////////////////////
function analyzeURL(text,res) {
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
            console.log(JSON.stringify(analysisResults.result.keywords[0].sentiment.label, null, 2));
            res.send(analysisResults.result.keywords[0].sentiment.label);
              })
              .catch(err => {
                console.log('error:', err);
                res.send(err.toString());
              });

}
/////////////////////
function analyzeText(text,res) {
    let naturalLanguageUnderstanding = getNLUInstance();
/// find the true parameter format
    const analyzeParams = {
      'text': text,
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
            console.log(JSON.stringify(analysisResults.result.keywords[2].label, null, 2));
            res.send(analysisResults.result.keywords[2].label);
              })
              .catch(err => {
                console.log('error:', err);
                res.send(err.toString());
              });

}
///////////////////////
//////function to display URl emotions
function analyzeTextemotion(text,res) {
    let naturalLanguageUnderstanding = getNLUInstance();
/// find the true parameter format
    const analyzeParams = {
      'text': text,
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
            console.log(JSON.stringify(analysisResults.result.keywords[0].emotion, null, 2));
            res.send(analysisResults.result.keywords[0].emotion);
              })
              .catch(err => {
                console.log('error:', err);
                res.send(err.toString());
              });

}

/////////////////////
app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let text = req.query.url;
    analyzeURLemotion(text,res)
});

app.get("/url/sentiment", (req,res) => {
    let text = req.query.url;
    analyzeURL(text,res)
});

app.get("/text/emotion", (req,res) => {
    let text = req.query.text;
    analyzeTextemotion(text,res)
});

app.get("/text/sentiment", (req,res) => {
    let text = req.query.text;
    analyzeText(text,res)
});


let server = app.listen(8080, () => {
    console.log(`Listening at http://localhost:8080`);
    console.log('Listening', server.address().port)
})
