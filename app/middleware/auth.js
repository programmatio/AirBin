'use strict';

exports.isAuthorized = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401).render(
        '401', {
            url: req
                .originalUrl,
            error: 'Unauthorized',
            title: '401'
        });
  }
};


exports.logout = function(req, res, next) {
        req.logout();
        res.redirect('/');
};
