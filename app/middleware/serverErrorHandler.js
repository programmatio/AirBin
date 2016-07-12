'use strict';

module.exports = function (err, req, res, next) {
    if (err) {
        if (process.env.NODE_ENV !== 'test') {
            res.status(500).render(
                '500', {
                    url: req
                        .originalUrl,
                    error: 'Not found',
                    title: '500'
                });
        } else {
            res.status(500).render(
                '500', {
                    url: req
                        .originalUrl,
                    error: err,
                    title: err.message
                });
        }
    }
    next();
};
