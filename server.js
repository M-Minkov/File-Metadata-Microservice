var express = require('express');
var cors = require('cors');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());


app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});



function recieveFile(req, res) {
  try {
    let name_of_file = req.file.originalname;
    let type_of_file = req.file.mimetype;
    let size_of_file = req.file.size;

    res.json({
      name: name_of_file,
      type: type_of_file,
      size: size_of_file
    })
  }
  catch {
    res.status(400).json({"error":"error"});
  }
}

app.post("/api/fileanalyse", upload.single("upfile"), recieveFile);




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
