const Article = require(_base + 'models/Article');

module.exports = {
    '/getData': {
        methods: ['get'],
        fn: function(req, res, next) {

            Article.find({}, function(err, results) {
                if (err) {
                    return next(err);
                }

                res.json({ result: results });
            });
        }
    }
};