const express = require('express');
const QRCode = require('qrcode');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Route to display the main page
app.get('/', (req, res) => res.render('index'));

// Route to generate the QR code
app.post('/generate', async (req, res) => {
  const url = req.body.url;
  if (url) {
    const qrCode = await QRCode.toDataURL(url);
    res.render('index', { qrCode });
  } else {
    res.send('Please provide a URL to generate QR code');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
