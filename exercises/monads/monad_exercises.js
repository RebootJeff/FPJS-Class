require('lambdajs').expose(global);
require('pointfree-fantasy').expose(global);
var Maybe = require('pointfree-fantasy/instances/maybe');
var IO = require('../../lib/io');
var Future = require('data.future');
var _ = require('ramda');
IO.extendFn();

// Exercise 1
// ==========
// Use safeGet and map/mjoin or chain to safetly get the street name when given a user

var safeGet = _.curry(function (x, o) { return Maybe(o[x]); });
var user = {
  id: 2,
  name: "albert",
  address: {
    street: {
      number: 22,
      name: 'Walnut St'
    }
  }
};

var ex1 = undefined;

ex1 = _.compose(mjoin, map(safeGet('name')), mjoin, map(safeGet('street')), safeGet('address'));

ex1 = _.compose(chain(safeGet('name')), chain(safeGet('street')), safeGet('address'));

// Exercise 2
// ==========
// Use monads to get the dir, then purely log it.

var getFile = function() { return __filename; }.toIO();

var pureLog = function(x) {
  console.log(x);
  return x;
}.toIO();

var ex2 = undefined;

ex2 = _.compose(mjoin, map(pureLog), getFile);

ex2 = _.compose(chain(pureLog), getFile);

// Exercise 3
// ==========
// Use monads to first get the Post with getPost(), then pass it's id in to getComments().

var ex3 = undefined;

ex3 = _.compose(mjoin, map(getComments), map(_.get('id')), getPost);


// Exercise 4
// ==========
// Use safeGet to retrieve the user's name, then upperCase it, then safeGet the first char: safeGet(0). The signature should be: User -> Maybe(String)
var ex4 = undefined

ex4 = _.compose(mjoin, map(safeGet(0)), map(toUpperCase), safeGet('name'));

var convertFirstToUpperCase = _.compose(safeGet(0), toUpperCase);
ex4 = _.compose(mjoin, map(convertFirstToUpperCase), safeGet('name'));
ex4 = _.compose(chain(convertFirstToUpperCase), safeGet('name'));

// HELPERS
// =====================

function getPost(i) {
  return new Future(function (rej, res) {
    setTimeout(function () {
      res({
        id: i,
        title: 'Love them futures'
      });
    }, 300);
  });
}

function getComments(i) {
  return new Future(function (rej, res) {
    setTimeout(function () {
      res([{post_id: i, body: "This class should be illegal"}, {post_id: i, body:"Monads are like space burritos"}]);
    }, 300);
  });
}

module.exports = {ex1: ex1, ex2: ex2, ex3: ex3, ex4: ex4, user: user}
