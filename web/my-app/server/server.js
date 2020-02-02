const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.get('/', cors(), async (req, res) => {
  const vision = require('@google-cloud/vision');
  console.log(req.query);

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  let [result] = await client.labelDetection(
    '/Users/abhinav/Documents/GitHub/dripFit/web/my-app/public/images/' +
      req.query.filename
  );
  let labels = result.labelAnnotations;
  console.log('Labels:');
  let returnArr = [];
  labels.forEach(label => returnArr.push(label.description));
  console.log(returnArr);
  res.send(returnArr);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
