require('lambdajs').expose(global);
require('pointfree-fantasy').expose(this);
var Maybe = require('pointfree-fantasy/instances/maybe');
var Identity = require('fantasy-identities');
var Future = require('data.future');
var Either = require('data.either');
var _ = require('ramda');
var Left = Either.Left;
var Right = Either.Right;

// Exercise 1
// ==========
// Use _.add(x,y) and map(f,x) to make a function that increments a value inside a functor

var ex1 = undefined

ex1 = map(_.add(1));


//xercise 2
// ==========
// Use _.head to get the first element of the list
var xs = Identity(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);

var ex2 = undefined;

ex2 = map(_.head);


// Exercise 3
// ==========
// Use safeGet and _.head to find the first initial of the user
var safeGet = _.curry(function (x, o) { return Maybe(o[x]); });

var user = { id: 2, name: "Albert" };

var ex3 = undefined

ex3 = _.compose(map(_.head), (safeGet('name')));

// Exercise 4
// ==========
// Use Maybe to rewrite ex4 without an if statement

var ex4 = function (n) {
  if (n) { return parseInt(n); }
};

var ex4 = undefined;

ex4 = function(n) {
  return Maybe(parseInt(n));
};

ex4 = _.compose(Maybe, parseInt);


// Exercise 5
// ==========
// Write a function that will getPost then toUpperCase the post's title

// getPost :: Int -> Future({id: Int, title: String})
var getPost = function (i) {
  return new Future(function(rej, res) {
    setTimeout(function(){
      res({id: i, title: 'Love them futures'})
    }, 300)
  });
}

var ex5 = undefined;

ex5 = _.compose(map(toUpperCase), map(_.get('title')), getPost);

ex5 = _.compose(map(_.compose(toUpperCase, _.get('title'))), getPost);

var getUpperCaseTitle = _.compose(toUpperCase, _.get('title'));
ex5 = _.compose(map(getUpperCaseTitle), getPost);


// Exercise 6
// ==========
// Write a function that uses checkActive() and showWelcome() to grant access or return the error

var showWelcome = compose(_.add( "Welcome "), _.get('name'))

var checkActive = function(user) {
 return user.active ? Right(user) : Left('Your account is not active')
}

var ex6 = undefined

ex6 = _.compose(map(showWelcome), checkActive);

// Exercise 7
// ==========
// Write a validation function that checks for a length > 3. It should return Right(x) if it is greater than 3 and Left("You need > 3") otherwise

var ex7 = function(x) {
  return undefined // <--- write me. (don't be pointfree)
}

ex7 = function(x) {
  return (x.length > 3) ? Right(x) : Left('You need > 3'); // <--- write me. (don't be pointfree)
};

// Exercise 8
// ==========
// Use ex7 above and Either as a functor to save the user if they are valid

var save = function(x){ console.log("SAVED USER!"); return x; }

var ex8 = undefined

// NOTE: When `ex7` is invoked, it "returns" either a Right or a Left (i.e., it returns an "Either").
ex8 = _.compose(map(save), ex7);

module.exports = {ex1: ex1, ex2: ex2, ex3: ex3, ex4: ex4, ex5: ex5, ex6: ex6, ex7: ex7, ex8: ex8}
