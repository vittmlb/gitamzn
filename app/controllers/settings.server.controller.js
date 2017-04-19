/**
 * Created by Vittorio on 13/04/2017.
 */
let Settings = require('mongoose').model('Setting');

exports.create = function(req, res) {
    let setting = new Settings(req.body);
    setting.save(function (err) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(setting);
        }
    });
};

exports.list = function(req, res) {
    Settings.find().exec(function (err, settings) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(settings);
        }
    });

};

exports.read = function(req, res) {
    res.json(req.setting);
};

exports.findById = function(req, res, next, id) {
    Settings.findById(id).exec(function (err, setting) {
        if(err) return next(err);
        if(!setting) return next(new Error(`Faild to load setting id: ${id}`));
        req.setting = setting;
        next();
    });
};

exports.update = function(req, res) {
    let setting = req.setting;
    setting.amazon = req.body.amazon;
    setting.save(function (err) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(setting);
        }
    });
};

exports.delete = function(req, res) {
    let setting = req.setting;
    setting.remove(function (err) {
        if(err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(setting);
        }
    });
};