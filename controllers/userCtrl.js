var userModel = require('./../models/userModel.js');

module.exports = {
    login: function(req, res, next) {
        res.send();
    },
    getMe: function(req, res) {
        if (!req.user) {
            return res.send();
        }
        userModel
            .findById(req.user._id)
            .populate(['items', 'itemsRented'])
            .exec(function(err, result) {
                if (err) {
                    return res.send(err);
                }
                res.send(result);
            });
    },
    logout: function(req, res) {
        console.log(req);
        req.logout();
        console.log(req + " has been logged out");
        res.send();
    },
    update: function(req, res) {
        userModel
            .findByIdAndUpdate(req.params.id, req.body, function(err, result) {
                if (err) {
                    return res.send(err);
                }
                res.send(result);
            });
    },
    delete: function(req, res) {
        userModel
            .findByIdAndRemove(req.params.id, req.body, function(err, result) {
                if (err) {
                    res.send(err);
                }
                res.send(result);
            });
    }

};
