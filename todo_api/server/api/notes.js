const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');
require('../../models/noteModel');
const Notes = mongoose.model('notes');
var routes = function () {
    router.route("/save").post(function (req, res) {
        try {
            const newNote = new Notes({
                textNote: req.body.textNote.trim(),
                color: req.body.color.trim(),
                isActive:1
            })
            newNote.save().then(success => {
                res.status(200).send({
                    message: "Record insert successfully."
                })
            }).catch(err => {
                res.status(500).send({
                    message: "something went wrong."
                })
            })
        } catch (err) {
            res.status(500).send({
                message: "something went wrong."
            })
        }
    });
    router.route("/get").get(function (req, res) {
        try {
            Notes.find({isActive:1}).then(Data => {
                res.status(200).send({
                    message: "Record get successfully.",
                    Data: Data

                })
            }).catch(err => {
                res.status(500).send({
                    message: "something went wrong."
                    
                })
            })
        } catch (err) {
            res.status(500).send({
                message: "something went wrong."
                
            })
        }
    });
    router.route("/edit").put(function (req, res) {
       try{
        Notes.findOneAndUpdate({ _id: req.body._id }, {
            $currentDate: {
                lastupdatedate: true,
             },
            $set: {
                textNote: req.body.textNote.trim(),
                color: req.body.color.trim()
                
            }
        }).then(succ => {
            res.status(200).send({
                message: "Record update successfully."
            })
        }).catch(err => {
            res.status(500).send({
                message: "something went wrong."
            })
        })
       }catch(err){
        res.status(500).send({
            message: "something went wrong.",
        })
       }       
    });
    router.route("/remove").delete(function (req, res) {
        try{
            Notes.findOneAndUpdate({ _id: req.body._id },{
                $currentDate: {
                    lastupdatedate: true,
                 },
                $set: {
                    isActive: 0
                }
            }
                ).then(succ => {
                    res.status(200).send({
                        message: "Record remove successfully.",
                    })
                }).catch(err => {
                    res.status(500).send({
                        message: "something went wrong.",
                    })
                })
        }catch(err){
            res.status(500).send({
                message: "something went wrong.",
            })
        }      
    });
    return router;
}
module.exports = routes;