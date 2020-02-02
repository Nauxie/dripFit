const Article = require(_base + 'models/Article');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const path = 'uploads/';

module.exports = {
  '/sendData': {
    methods: ['post'],
    // middleware: [upload.single('attachment')],
    fn: function(req, res, next) {
      let articleClassification = req.body.articleClassification,
        color = req.body.color,
        colorGoesWith = req.body.colorGoesWith,
        type = req.body.type,
        tags = req.body.tags,
        filename = req.body.filename;
      // attachment = req.file;

      // console.log(attachment);

      let article = new Article({
        articleClassification: articleClassification,
        color: color,
        colorGoesWith: colorGoesWith,
        type: type,
        tags: tags,
        filename: filename
      });

      // let target_path;
      // if (attachment) {
      //     target_path = path + attachment.filename + "." + attachment.originalname.split('.').pop();
      //     article.attachment_path = target_path;
      //     article.attachment_name = attachment.originalname;
      // }

      article.save(function(err) {
        if (err) {
          return next(err);
        }

        res.json({ article });
      });
    }
  }
};
