const Responses = require("newsfeed-web-models").Responses;
const BaseController = require("../BaseController");
const filesService = require("newsfeed-services").filesService;
const { RoutePrefix, Route } = require("newsfeed-routing");
const IncomingForm = require("formidable").IncomingForm;
const AWS = require("aws-sdk");
const fs = require("fs");
const mime = require("mime-types");
const uuid = require("uuid");

@RoutePrefix("/api/fileupload")
class FilesController extends BaseController {
  constructor() {
    super("FilesController");

    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
  }

  @Route("POST", "")
  function(req, res) {
    const promises = [];
    const form = new IncomingForm();
    form.multiples = true;

    form.on("file", (field, file) => {
      let fileName = "";
      let buffer = null;

      buffer = fs.readFileSync(file.path);
      fileName = file.name;

      let upload = {};
      upload.userId = req.user.id;
      upload.fileName = fileName;

      const type = mime.contentType(fileName);
      upload.fileType = type;

      let key = `outlayr/` + uuid.v4() + `-` + fileName;
      upload.fileUrl = key;

      const uploadPromise = filesService
        .uploadFile(fileName, buffer, key)
        .then(() => filesService.storeFile(upload))
        .catch(err => {
          console.log(err);
        });

      promises.push(uploadPromise);
    });

    form.on("end", () => {
      Promise.all(promises).then(function(values) {
        let urls = [];
        for (let i = 0; i < values.length; i++) {
          urls.push(process.env.AWS_DOMAIN + values[i].file.fileUrl);
        }
        const sResponse = new Responses.ItemsResponse(urls);
        res.json(sResponse);
      });
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
      }
    });
  }

  storeFile(req, res) {
    console.log(req);
    filesService
      .storeFile(req.body)
      .then(data => {
        const sResponse = new Responses.ItemResponse(data);
        res.json(sResponse);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  }
}

module.exports = { controller: FilesController };
