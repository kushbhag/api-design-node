// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for lions
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server
var tigerRouter = require('express').Router();
const _ = require('lodash');

var tigers = [];
var id = 0;

var updateId = function(req, res, next) {
    if (!req.body.id) {
      id++;
      req.body.id = id + '';
    }
    next();
};

tigerRouter.param('id', function(req, res, next, id) {
    var todo = _.find(tigers, {id: id});
    console.log(todo);
    if (todo) {
      req.body.tiger = todo;
      next();
    } else {
      res.status(400).send('Bad Request');
    }
});


tigerRouter.get('/', function(req, res){
    res.json(tigers);
});
  
tigerRouter.get('/:id', function(req, res){
    var tiger = req.body.tiger;
    res.json(tiger || {});
});
  
tigerRouter.post('/', updateId, function(req, res) {
    var tiger = req.body;
  
    tigers.push(tiger);
  
    res.json(tiger);
});
  
  
tigerRouter.put('/:id', function(req, res) {
    var update = req.body;
    if (update.id) {
      delete update.id
    }
  
    var tiger = _.findIndex(tigers, {id: req.params.id});
    if (!tigers[tiger]) {
      res.send();
    } else {
      var updatedTiger = _.assign(tiger[tiger], update);
      res.json(updatedTiger);
    }
 });

module.exports = tigerRouter;
