goog.provide('hello');
goog.require('cljs.core');
hello.greet = (function greet(n){
return [cljs.core.str("Hello "),cljs.core.str(n)].join('');
});
goog.exportSymbol('hello.greet', hello.greet);
