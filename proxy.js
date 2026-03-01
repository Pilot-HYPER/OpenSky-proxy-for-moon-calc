// proxy.js (ES module)
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

// OpenSky credentials
const username = process.env.OPENSKY_USER || 'Pilot HYPER';
const password = process.env.OPENSKY_PASS || 'naxgAk-0wedby-bogqir';

// CORS headers
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods","GET");
  next();
});

app.get('/opensky', async (req,res)=>{
  try {
    const response = await fetch('https://opensky-network.org/api/states/all', {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(username+':'+password).toString('base64')
      }
    });
    const data = await response.json();
    res.json(data);
  } catch(err){
    res.status(500).json({error: err.toString()});
  }
});

app.listen(port, ()=>console.log(`OpenSky proxy running on port ${port}`));
