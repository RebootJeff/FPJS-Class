require('lambdajs').expose(global);
require('pointfree-fantasy').expose(global);
var _ = require('ramda')
var curry = _.curry
  

// Exercise 1
// split :: String -> String -> [String]
//==============

//+ words :: String -> [String]
var words = function(str) {
  return split(' ', str);
}

words = split(' '); // function that expects a str just like the version on line 12.

// Exercise 1a
// split :: String -> String -> [String]
//==============
//use map to make a new words fn that not only works on 1 string, but on an array of strings.
//+ words :: String -> [String]
//+ sentences :: [String] -> [[String]]
var sentences = undefined;

// sentences = strs.map(function(str) {
//   return words(str);
// });

sentences = map(words);

// Exercise 2
// match :: Regex -> String -> Bool
//==============

//+ filterQs :: [String] -> [String]
var filterQs = function(xs) {
  return filter(function(x){
    return match(/q/i, x);
  }, xs);
}

filterQs = filter(function(x){
  return match(/q/i, x);
});
filterQs = filter(match(/q/i));

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max

//+ _keepHighest :: Number -> Number -> Number
var _keepHighest = function(x,y){ return x >= y ? x : y; }; // <- leave be

//+ max :: [Number] -> Number
var max = function(xs) {
  return reduce(function(acc, x){
    return _keepHighest(acc, x);
  }, 0, xs);
}

max = reduce(function(acc, x){
  return _keepHighest(acc, x);
}, 0);

max = reduce(_keepHighest, 0);

// Bonus 1:
// ============
// wrap array's slice to be funcitonal and curried.
// //[1,2,3].slice(0, 2)
var slice = undefined

slice = function(start) {
  return function(end) {
    return function(arr) {
      return arr.slice(start, end);
    }
  }
}

// Bonus 2:
// ============
// use slice to define a function "take" that takes n elements. make it's curried
var take = undefined

take = function(n) {
  return slice(0)(n);
};


module.exports = { words: words,
                   sentences: sentences,
                   filterQs: filterQs,
                   max: max,
                   slice: slice,
                   take: take
                 } 
