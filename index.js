const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


const PORT = 5001 || process.env.PORT;

function generateCRCResponse(crcToken, consumerSecret) {
    const hmac = crypto.createHmac('sha256', consumerSecret).update(crcToken).digest('base64');
    return `sha256=${hmac}`;
  }

app.get('/webhook', (req, res) => {
    const crcToken = req.query.crc_token;
    if (crcToken) {
      const consumerSecret = 'PCkvNYnYdWN6ewUFjV4nycRye1KzJfB5U08BmWKoNyu90VrHLr';
      const responseToken = generateCRCResponse(crcToken, consumerSecret);
      const responseBody = {
        response_token: responseToken
      };
      res.status(200).send(responseBody);
    } else {
      res.status(500).send({error: 'error'});
    }
});

app.get('/hello', (req,res)=>{
    res.send({status: 'hello'});
});

app.post('/webhook', (req,res)=>{
    console.log(req.body);
});

app.listen(PORT, ()=>{
    console.log('listening');
});
