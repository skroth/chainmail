goog.provide('cljs.core');
goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.string.format');
goog.require('goog.string.StringBuffer');
goog.require('goog.string');
cljs.core._STAR_unchecked_if_STAR_ = false;
/**
* Each runtime environment provides a diffenent way to print output.
* Whatever function *print-fn* is bound to will be passed any
* Strings which should be printed.
*/
cljs.core._STAR_print_fn_STAR_ = (function _STAR_print_fn_STAR_(_){
throw (new Error("No *print-fn* fn set for evaluation environment"));
});
/**
* Internal - do not use!
*/
cljs.core.truth_ = (function truth_(x){
return (x != null && x !== false);
});
/**
* Tests if 2 arguments are the same object
*/
cljs.core.identical_QMARK_ = (function identical_QMARK_(x,y){
return (x === y);
});
/**
* Returns true if x is nil, false otherwise.
*/
cljs.core.nil_QMARK_ = (function nil_QMARK_(x){
return (x == null);
});
/**
* Returns true if x is logical false, false otherwise.
*/
cljs.core.not = (function not(x){
if(cljs.core.truth_(x))
{return false;
} else
{return true;
}
});
/**
* Internal - do not use!
*/
cljs.core.type_satisfies_ = (function type_satisfies_(p,x){
var x__6194 = (((x == null))?null:x);
if((p[goog.typeOf(x__6194)]))
{return true;
} else
{if((p["_"]))
{return true;
} else
{if("\uFDD0'else")
{return false;
} else
{return null;
}
}
}
});
cljs.core.is_proto_ = (function is_proto_(x){
return (x.constructor.prototype === x);
});
/**
* When compiled for a command-line target, whatever
* function *main-fn* is set to will be called with the command-line
* argv as arguments
*/
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = (function missing_protocol(proto,obj){
return Error(["No protocol method ",proto," defined for type ",goog.typeOf(obj),": ",obj].join(""));
});
/**
* Returns a javascript array, cloned from the passed in array
*/
cljs.core.aclone = (function aclone(array_like){
return array_like.slice();
});
/**
* Creates a new javascript array.
* @param {...*} var_args
*/
cljs.core.array = (function array(var_args){
return Array.prototype.slice.call(arguments);
});
cljs.core.make_array = (function() {
var make_array = null;
var make_array__1 = (function (size){
return (new Array(size));
});
var make_array__2 = (function (type,size){
return make_array.call(null,size);
});
make_array = function(type,size){
switch(arguments.length){
case 1:
return make_array__1.call(this,type);
case 2:
return make_array__2.call(this,type,size);
}
throw('Invalid arity: ' + arguments.length);
};
make_array.cljs$lang$arity$1 = make_array__1;
make_array.cljs$lang$arity$2 = make_array__2;
return make_array;
})()
;
/**
* Returns the value at the index.
* @param {...*} var_args
*/
cljs.core.aget = (function() {
var aget = null;
var aget__2 = (function (array,i){
return (array[i]);
});
var aget__3 = (function() { 
var G__6195__delegate = function (array,i,idxs){
return cljs.core.apply.call(null,aget,aget.call(null,array,i),idxs);
};
var G__6195 = function (array,i,var_args){
var idxs = null;
if (goog.isDef(var_args)) {
  idxs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__6195__delegate.call(this, array, i, idxs);
};
G__6195.cljs$lang$maxFixedArity = 2;
G__6195.cljs$lang$applyTo = (function (arglist__6196){
var array = cljs.core.first(arglist__6196);
var i = cljs.core.first(cljs.core.next(arglist__6196));
var idxs = cljs.core.rest(cljs.core.next(arglist__6196));
return G__6195__delegate(array, i, idxs);
});
G__6195.cljs$lang$arity$variadic = G__6195__delegate;
return G__6195;
})()
;
aget = function(array,i,var_args){
var idxs = var_args;
switch(arguments.length){
case 2:
return aget__2.call(this,array,i);
default:
return aget__3.cljs$lang$arity$variadic(array,i, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
aget.cljs$lang$maxFixedArity = 2;
aget.cljs$lang$applyTo = aget__3.cljs$lang$applyTo;
aget.cljs$lang$arity$2 = aget__2;
aget.cljs$lang$arity$variadic = aget__3.cljs$lang$arity$variadic;
return aget;
})()
;
/**
* Sets the value at the index.
*/
cljs.core.aset = (function aset(array,i,val){
return (array[i] = val);
});
/**
* Returns the length of the array. Works on arrays of all types.
*/
cljs.core.alength = (function alength(array){
return array.length;
});
cljs.core.into_array = (function() {
var into_array = null;
var into_array__1 = (function (aseq){
return into_array.call(null,null,aseq);
});
var into_array__2 = (function (type,aseq){
return cljs.core.reduce.call(null,(function (a,x){
a.push(x);
return a;
}),[],aseq);
});
into_array = function(type,aseq){
switch(arguments.length){
case 1:
return into_array__1.call(this,type);
case 2:
return into_array__2.call(this,type,aseq);
}
throw('Invalid arity: ' + arguments.length);
};
into_array.cljs$lang$arity$1 = into_array__1;
into_array.cljs$lang$arity$2 = into_array__2;
return into_array;
})()
;
cljs.core.IFn = {};
cljs.core._invoke = (function() {
var _invoke = null;
var _invoke__1 = (function (this$){
if((function (){var and__3941__auto____6281 = this$;
if(and__3941__auto____6281)
{return this$.cljs$core$IFn$_invoke$arity$1;
} else
{return and__3941__auto____6281;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$1(this$);
} else
{var x__2450__auto____6282 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6283 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6282)]);
if(or__3943__auto____6283)
{return or__3943__auto____6283;
} else
{var or__3943__auto____6284 = (cljs.core._invoke["_"]);
if(or__3943__auto____6284)
{return or__3943__auto____6284;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$);
}
});
var _invoke__2 = (function (this$,a){
if((function (){var and__3941__auto____6285 = this$;
if(and__3941__auto____6285)
{return this$.cljs$core$IFn$_invoke$arity$2;
} else
{return and__3941__auto____6285;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$2(this$,a);
} else
{var x__2450__auto____6286 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6287 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6286)]);
if(or__3943__auto____6287)
{return or__3943__auto____6287;
} else
{var or__3943__auto____6288 = (cljs.core._invoke["_"]);
if(or__3943__auto____6288)
{return or__3943__auto____6288;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a);
}
});
var _invoke__3 = (function (this$,a,b){
if((function (){var and__3941__auto____6289 = this$;
if(and__3941__auto____6289)
{return this$.cljs$core$IFn$_invoke$arity$3;
} else
{return and__3941__auto____6289;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$3(this$,a,b);
} else
{var x__2450__auto____6290 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6291 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6290)]);
if(or__3943__auto____6291)
{return or__3943__auto____6291;
} else
{var or__3943__auto____6292 = (cljs.core._invoke["_"]);
if(or__3943__auto____6292)
{return or__3943__auto____6292;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b);
}
});
var _invoke__4 = (function (this$,a,b,c){
if((function (){var and__3941__auto____6293 = this$;
if(and__3941__auto____6293)
{return this$.cljs$core$IFn$_invoke$arity$4;
} else
{return and__3941__auto____6293;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$4(this$,a,b,c);
} else
{var x__2450__auto____6294 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6295 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6294)]);
if(or__3943__auto____6295)
{return or__3943__auto____6295;
} else
{var or__3943__auto____6296 = (cljs.core._invoke["_"]);
if(or__3943__auto____6296)
{return or__3943__auto____6296;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c);
}
});
var _invoke__5 = (function (this$,a,b,c,d){
if((function (){var and__3941__auto____6297 = this$;
if(and__3941__auto____6297)
{return this$.cljs$core$IFn$_invoke$arity$5;
} else
{return and__3941__auto____6297;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$5(this$,a,b,c,d);
} else
{var x__2450__auto____6298 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6299 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6298)]);
if(or__3943__auto____6299)
{return or__3943__auto____6299;
} else
{var or__3943__auto____6300 = (cljs.core._invoke["_"]);
if(or__3943__auto____6300)
{return or__3943__auto____6300;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d);
}
});
var _invoke__6 = (function (this$,a,b,c,d,e){
if((function (){var and__3941__auto____6301 = this$;
if(and__3941__auto____6301)
{return this$.cljs$core$IFn$_invoke$arity$6;
} else
{return and__3941__auto____6301;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$6(this$,a,b,c,d,e);
} else
{var x__2450__auto____6302 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6303 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6302)]);
if(or__3943__auto____6303)
{return or__3943__auto____6303;
} else
{var or__3943__auto____6304 = (cljs.core._invoke["_"]);
if(or__3943__auto____6304)
{return or__3943__auto____6304;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e);
}
});
var _invoke__7 = (function (this$,a,b,c,d,e,f){
if((function (){var and__3941__auto____6305 = this$;
if(and__3941__auto____6305)
{return this$.cljs$core$IFn$_invoke$arity$7;
} else
{return and__3941__auto____6305;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$7(this$,a,b,c,d,e,f);
} else
{var x__2450__auto____6306 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6307 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6306)]);
if(or__3943__auto____6307)
{return or__3943__auto____6307;
} else
{var or__3943__auto____6308 = (cljs.core._invoke["_"]);
if(or__3943__auto____6308)
{return or__3943__auto____6308;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f);
}
});
var _invoke__8 = (function (this$,a,b,c,d,e,f,g){
if((function (){var and__3941__auto____6309 = this$;
if(and__3941__auto____6309)
{return this$.cljs$core$IFn$_invoke$arity$8;
} else
{return and__3941__auto____6309;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$8(this$,a,b,c,d,e,f,g);
} else
{var x__2450__auto____6310 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6311 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6310)]);
if(or__3943__auto____6311)
{return or__3943__auto____6311;
} else
{var or__3943__auto____6312 = (cljs.core._invoke["_"]);
if(or__3943__auto____6312)
{return or__3943__auto____6312;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g);
}
});
var _invoke__9 = (function (this$,a,b,c,d,e,f,g,h){
if((function (){var and__3941__auto____6313 = this$;
if(and__3941__auto____6313)
{return this$.cljs$core$IFn$_invoke$arity$9;
} else
{return and__3941__auto____6313;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$9(this$,a,b,c,d,e,f,g,h);
} else
{var x__2450__auto____6314 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6315 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6314)]);
if(or__3943__auto____6315)
{return or__3943__auto____6315;
} else
{var or__3943__auto____6316 = (cljs.core._invoke["_"]);
if(or__3943__auto____6316)
{return or__3943__auto____6316;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h);
}
});
var _invoke__10 = (function (this$,a,b,c,d,e,f,g,h,i){
if((function (){var and__3941__auto____6317 = this$;
if(and__3941__auto____6317)
{return this$.cljs$core$IFn$_invoke$arity$10;
} else
{return and__3941__auto____6317;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$10(this$,a,b,c,d,e,f,g,h,i);
} else
{var x__2450__auto____6318 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6319 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6318)]);
if(or__3943__auto____6319)
{return or__3943__auto____6319;
} else
{var or__3943__auto____6320 = (cljs.core._invoke["_"]);
if(or__3943__auto____6320)
{return or__3943__auto____6320;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i);
}
});
var _invoke__11 = (function (this$,a,b,c,d,e,f,g,h,i,j){
if((function (){var and__3941__auto____6321 = this$;
if(and__3941__auto____6321)
{return this$.cljs$core$IFn$_invoke$arity$11;
} else
{return and__3941__auto____6321;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$11(this$,a,b,c,d,e,f,g,h,i,j);
} else
{var x__2450__auto____6322 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6323 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6322)]);
if(or__3943__auto____6323)
{return or__3943__auto____6323;
} else
{var or__3943__auto____6324 = (cljs.core._invoke["_"]);
if(or__3943__auto____6324)
{return or__3943__auto____6324;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j);
}
});
var _invoke__12 = (function (this$,a,b,c,d,e,f,g,h,i,j,k){
if((function (){var and__3941__auto____6325 = this$;
if(and__3941__auto____6325)
{return this$.cljs$core$IFn$_invoke$arity$12;
} else
{return and__3941__auto____6325;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$12(this$,a,b,c,d,e,f,g,h,i,j,k);
} else
{var x__2450__auto____6326 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6327 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6326)]);
if(or__3943__auto____6327)
{return or__3943__auto____6327;
} else
{var or__3943__auto____6328 = (cljs.core._invoke["_"]);
if(or__3943__auto____6328)
{return or__3943__auto____6328;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k);
}
});
var _invoke__13 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l){
if((function (){var and__3941__auto____6329 = this$;
if(and__3941__auto____6329)
{return this$.cljs$core$IFn$_invoke$arity$13;
} else
{return and__3941__auto____6329;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$13(this$,a,b,c,d,e,f,g,h,i,j,k,l);
} else
{var x__2450__auto____6330 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6331 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6330)]);
if(or__3943__auto____6331)
{return or__3943__auto____6331;
} else
{var or__3943__auto____6332 = (cljs.core._invoke["_"]);
if(or__3943__auto____6332)
{return or__3943__auto____6332;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l);
}
});
var _invoke__14 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m){
if((function (){var and__3941__auto____6333 = this$;
if(and__3941__auto____6333)
{return this$.cljs$core$IFn$_invoke$arity$14;
} else
{return and__3941__auto____6333;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$14(this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
} else
{var x__2450__auto____6334 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6335 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6334)]);
if(or__3943__auto____6335)
{return or__3943__auto____6335;
} else
{var or__3943__auto____6336 = (cljs.core._invoke["_"]);
if(or__3943__auto____6336)
{return or__3943__auto____6336;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
}
});
var _invoke__15 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n){
if((function (){var and__3941__auto____6337 = this$;
if(and__3941__auto____6337)
{return this$.cljs$core$IFn$_invoke$arity$15;
} else
{return and__3941__auto____6337;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$15(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
} else
{var x__2450__auto____6338 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6339 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6338)]);
if(or__3943__auto____6339)
{return or__3943__auto____6339;
} else
{var or__3943__auto____6340 = (cljs.core._invoke["_"]);
if(or__3943__auto____6340)
{return or__3943__auto____6340;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
}
});
var _invoke__16 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){
if((function (){var and__3941__auto____6341 = this$;
if(and__3941__auto____6341)
{return this$.cljs$core$IFn$_invoke$arity$16;
} else
{return and__3941__auto____6341;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$16(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
} else
{var x__2450__auto____6342 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6343 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6342)]);
if(or__3943__auto____6343)
{return or__3943__auto____6343;
} else
{var or__3943__auto____6344 = (cljs.core._invoke["_"]);
if(or__3943__auto____6344)
{return or__3943__auto____6344;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
}
});
var _invoke__17 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){
if((function (){var and__3941__auto____6345 = this$;
if(and__3941__auto____6345)
{return this$.cljs$core$IFn$_invoke$arity$17;
} else
{return and__3941__auto____6345;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$17(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
} else
{var x__2450__auto____6346 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6347 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6346)]);
if(or__3943__auto____6347)
{return or__3943__auto____6347;
} else
{var or__3943__auto____6348 = (cljs.core._invoke["_"]);
if(or__3943__auto____6348)
{return or__3943__auto____6348;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
}
});
var _invoke__18 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){
if((function (){var and__3941__auto____6349 = this$;
if(and__3941__auto____6349)
{return this$.cljs$core$IFn$_invoke$arity$18;
} else
{return and__3941__auto____6349;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$18(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
} else
{var x__2450__auto____6350 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6351 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6350)]);
if(or__3943__auto____6351)
{return or__3943__auto____6351;
} else
{var or__3943__auto____6352 = (cljs.core._invoke["_"]);
if(or__3943__auto____6352)
{return or__3943__auto____6352;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
}
});
var _invoke__19 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s){
if((function (){var and__3941__auto____6353 = this$;
if(and__3941__auto____6353)
{return this$.cljs$core$IFn$_invoke$arity$19;
} else
{return and__3941__auto____6353;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$19(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
} else
{var x__2450__auto____6354 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6355 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6354)]);
if(or__3943__auto____6355)
{return or__3943__auto____6355;
} else
{var or__3943__auto____6356 = (cljs.core._invoke["_"]);
if(or__3943__auto____6356)
{return or__3943__auto____6356;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
}
});
var _invoke__20 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t){
if((function (){var and__3941__auto____6357 = this$;
if(and__3941__auto____6357)
{return this$.cljs$core$IFn$_invoke$arity$20;
} else
{return and__3941__auto____6357;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$20(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
} else
{var x__2450__auto____6358 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6359 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6358)]);
if(or__3943__auto____6359)
{return or__3943__auto____6359;
} else
{var or__3943__auto____6360 = (cljs.core._invoke["_"]);
if(or__3943__auto____6360)
{return or__3943__auto____6360;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
}
});
var _invoke__21 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest){
if((function (){var and__3941__auto____6361 = this$;
if(and__3941__auto____6361)
{return this$.cljs$core$IFn$_invoke$arity$21;
} else
{return and__3941__auto____6361;
}
})())
{return this$.cljs$core$IFn$_invoke$arity$21(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
} else
{var x__2450__auto____6362 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6363 = (cljs.core._invoke[goog.typeOf(x__2450__auto____6362)]);
if(or__3943__auto____6363)
{return or__3943__auto____6363;
} else
{var or__3943__auto____6364 = (cljs.core._invoke["_"]);
if(or__3943__auto____6364)
{return or__3943__auto____6364;
} else
{throw cljs.core.missing_protocol.call(null,"IFn.-invoke",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
}
});
_invoke = function(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest){
switch(arguments.length){
case 1:
return _invoke__1.call(this,this$);
case 2:
return _invoke__2.call(this,this$,a);
case 3:
return _invoke__3.call(this,this$,a,b);
case 4:
return _invoke__4.call(this,this$,a,b,c);
case 5:
return _invoke__5.call(this,this$,a,b,c,d);
case 6:
return _invoke__6.call(this,this$,a,b,c,d,e);
case 7:
return _invoke__7.call(this,this$,a,b,c,d,e,f);
case 8:
return _invoke__8.call(this,this$,a,b,c,d,e,f,g);
case 9:
return _invoke__9.call(this,this$,a,b,c,d,e,f,g,h);
case 10:
return _invoke__10.call(this,this$,a,b,c,d,e,f,g,h,i);
case 11:
return _invoke__11.call(this,this$,a,b,c,d,e,f,g,h,i,j);
case 12:
return _invoke__12.call(this,this$,a,b,c,d,e,f,g,h,i,j,k);
case 13:
return _invoke__13.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l);
case 14:
return _invoke__14.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
case 15:
return _invoke__15.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
case 16:
return _invoke__16.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
case 17:
return _invoke__17.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
case 18:
return _invoke__18.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
case 19:
return _invoke__19.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
case 20:
return _invoke__20.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
case 21:
return _invoke__21.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
}
throw('Invalid arity: ' + arguments.length);
};
_invoke.cljs$lang$arity$1 = _invoke__1;
_invoke.cljs$lang$arity$2 = _invoke__2;
_invoke.cljs$lang$arity$3 = _invoke__3;
_invoke.cljs$lang$arity$4 = _invoke__4;
_invoke.cljs$lang$arity$5 = _invoke__5;
_invoke.cljs$lang$arity$6 = _invoke__6;
_invoke.cljs$lang$arity$7 = _invoke__7;
_invoke.cljs$lang$arity$8 = _invoke__8;
_invoke.cljs$lang$arity$9 = _invoke__9;
_invoke.cljs$lang$arity$10 = _invoke__10;
_invoke.cljs$lang$arity$11 = _invoke__11;
_invoke.cljs$lang$arity$12 = _invoke__12;
_invoke.cljs$lang$arity$13 = _invoke__13;
_invoke.cljs$lang$arity$14 = _invoke__14;
_invoke.cljs$lang$arity$15 = _invoke__15;
_invoke.cljs$lang$arity$16 = _invoke__16;
_invoke.cljs$lang$arity$17 = _invoke__17;
_invoke.cljs$lang$arity$18 = _invoke__18;
_invoke.cljs$lang$arity$19 = _invoke__19;
_invoke.cljs$lang$arity$20 = _invoke__20;
_invoke.cljs$lang$arity$21 = _invoke__21;
return _invoke;
})()
;
cljs.core.ICounted = {};
cljs.core._count = (function _count(coll){
if((function (){var and__3941__auto____6369 = coll;
if(and__3941__auto____6369)
{return coll.cljs$core$ICounted$_count$arity$1;
} else
{return and__3941__auto____6369;
}
})())
{return coll.cljs$core$ICounted$_count$arity$1(coll);
} else
{var x__2450__auto____6370 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6371 = (cljs.core._count[goog.typeOf(x__2450__auto____6370)]);
if(or__3943__auto____6371)
{return or__3943__auto____6371;
} else
{var or__3943__auto____6372 = (cljs.core._count["_"]);
if(or__3943__auto____6372)
{return or__3943__auto____6372;
} else
{throw cljs.core.missing_protocol.call(null,"ICounted.-count",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IEmptyableCollection = {};
cljs.core._empty = (function _empty(coll){
if((function (){var and__3941__auto____6377 = coll;
if(and__3941__auto____6377)
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1;
} else
{return and__3941__auto____6377;
}
})())
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll);
} else
{var x__2450__auto____6378 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6379 = (cljs.core._empty[goog.typeOf(x__2450__auto____6378)]);
if(or__3943__auto____6379)
{return or__3943__auto____6379;
} else
{var or__3943__auto____6380 = (cljs.core._empty["_"]);
if(or__3943__auto____6380)
{return or__3943__auto____6380;
} else
{throw cljs.core.missing_protocol.call(null,"IEmptyableCollection.-empty",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ICollection = {};
cljs.core._conj = (function _conj(coll,o){
if((function (){var and__3941__auto____6385 = coll;
if(and__3941__auto____6385)
{return coll.cljs$core$ICollection$_conj$arity$2;
} else
{return and__3941__auto____6385;
}
})())
{return coll.cljs$core$ICollection$_conj$arity$2(coll,o);
} else
{var x__2450__auto____6386 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6387 = (cljs.core._conj[goog.typeOf(x__2450__auto____6386)]);
if(or__3943__auto____6387)
{return or__3943__auto____6387;
} else
{var or__3943__auto____6388 = (cljs.core._conj["_"]);
if(or__3943__auto____6388)
{return or__3943__auto____6388;
} else
{throw cljs.core.missing_protocol.call(null,"ICollection.-conj",coll);
}
}
})().call(null,coll,o);
}
});
cljs.core.IIndexed = {};
cljs.core._nth = (function() {
var _nth = null;
var _nth__2 = (function (coll,n){
if((function (){var and__3941__auto____6397 = coll;
if(and__3941__auto____6397)
{return coll.cljs$core$IIndexed$_nth$arity$2;
} else
{return and__3941__auto____6397;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,n);
} else
{var x__2450__auto____6398 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6399 = (cljs.core._nth[goog.typeOf(x__2450__auto____6398)]);
if(or__3943__auto____6399)
{return or__3943__auto____6399;
} else
{var or__3943__auto____6400 = (cljs.core._nth["_"]);
if(or__3943__auto____6400)
{return or__3943__auto____6400;
} else
{throw cljs.core.missing_protocol.call(null,"IIndexed.-nth",coll);
}
}
})().call(null,coll,n);
}
});
var _nth__3 = (function (coll,n,not_found){
if((function (){var and__3941__auto____6401 = coll;
if(and__3941__auto____6401)
{return coll.cljs$core$IIndexed$_nth$arity$3;
} else
{return and__3941__auto____6401;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$3(coll,n,not_found);
} else
{var x__2450__auto____6402 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6403 = (cljs.core._nth[goog.typeOf(x__2450__auto____6402)]);
if(or__3943__auto____6403)
{return or__3943__auto____6403;
} else
{var or__3943__auto____6404 = (cljs.core._nth["_"]);
if(or__3943__auto____6404)
{return or__3943__auto____6404;
} else
{throw cljs.core.missing_protocol.call(null,"IIndexed.-nth",coll);
}
}
})().call(null,coll,n,not_found);
}
});
_nth = function(coll,n,not_found){
switch(arguments.length){
case 2:
return _nth__2.call(this,coll,n);
case 3:
return _nth__3.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
_nth.cljs$lang$arity$2 = _nth__2;
_nth.cljs$lang$arity$3 = _nth__3;
return _nth;
})()
;
cljs.core.ASeq = {};
cljs.core.ISeq = {};
cljs.core._first = (function _first(coll){
if((function (){var and__3941__auto____6409 = coll;
if(and__3941__auto____6409)
{return coll.cljs$core$ISeq$_first$arity$1;
} else
{return and__3941__auto____6409;
}
})())
{return coll.cljs$core$ISeq$_first$arity$1(coll);
} else
{var x__2450__auto____6410 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6411 = (cljs.core._first[goog.typeOf(x__2450__auto____6410)]);
if(or__3943__auto____6411)
{return or__3943__auto____6411;
} else
{var or__3943__auto____6412 = (cljs.core._first["_"]);
if(or__3943__auto____6412)
{return or__3943__auto____6412;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core._rest = (function _rest(coll){
if((function (){var and__3941__auto____6417 = coll;
if(and__3941__auto____6417)
{return coll.cljs$core$ISeq$_rest$arity$1;
} else
{return and__3941__auto____6417;
}
})())
{return coll.cljs$core$ISeq$_rest$arity$1(coll);
} else
{var x__2450__auto____6418 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6419 = (cljs.core._rest[goog.typeOf(x__2450__auto____6418)]);
if(or__3943__auto____6419)
{return or__3943__auto____6419;
} else
{var or__3943__auto____6420 = (cljs.core._rest["_"]);
if(or__3943__auto____6420)
{return or__3943__auto____6420;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-rest",coll);
}
}
})().call(null,coll);
}
});
cljs.core.INext = {};
cljs.core._next = (function _next(coll){
if((function (){var and__3941__auto____6425 = coll;
if(and__3941__auto____6425)
{return coll.cljs$core$INext$_next$arity$1;
} else
{return and__3941__auto____6425;
}
})())
{return coll.cljs$core$INext$_next$arity$1(coll);
} else
{var x__2450__auto____6426 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6427 = (cljs.core._next[goog.typeOf(x__2450__auto____6426)]);
if(or__3943__auto____6427)
{return or__3943__auto____6427;
} else
{var or__3943__auto____6428 = (cljs.core._next["_"]);
if(or__3943__auto____6428)
{return or__3943__auto____6428;
} else
{throw cljs.core.missing_protocol.call(null,"INext.-next",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ILookup = {};
cljs.core._lookup = (function() {
var _lookup = null;
var _lookup__2 = (function (o,k){
if((function (){var and__3941__auto____6437 = o;
if(and__3941__auto____6437)
{return o.cljs$core$ILookup$_lookup$arity$2;
} else
{return and__3941__auto____6437;
}
})())
{return o.cljs$core$ILookup$_lookup$arity$2(o,k);
} else
{var x__2450__auto____6438 = (((o == null))?null:o);
return (function (){var or__3943__auto____6439 = (cljs.core._lookup[goog.typeOf(x__2450__auto____6438)]);
if(or__3943__auto____6439)
{return or__3943__auto____6439;
} else
{var or__3943__auto____6440 = (cljs.core._lookup["_"]);
if(or__3943__auto____6440)
{return or__3943__auto____6440;
} else
{throw cljs.core.missing_protocol.call(null,"ILookup.-lookup",o);
}
}
})().call(null,o,k);
}
});
var _lookup__3 = (function (o,k,not_found){
if((function (){var and__3941__auto____6441 = o;
if(and__3941__auto____6441)
{return o.cljs$core$ILookup$_lookup$arity$3;
} else
{return and__3941__auto____6441;
}
})())
{return o.cljs$core$ILookup$_lookup$arity$3(o,k,not_found);
} else
{var x__2450__auto____6442 = (((o == null))?null:o);
return (function (){var or__3943__auto____6443 = (cljs.core._lookup[goog.typeOf(x__2450__auto____6442)]);
if(or__3943__auto____6443)
{return or__3943__auto____6443;
} else
{var or__3943__auto____6444 = (cljs.core._lookup["_"]);
if(or__3943__auto____6444)
{return or__3943__auto____6444;
} else
{throw cljs.core.missing_protocol.call(null,"ILookup.-lookup",o);
}
}
})().call(null,o,k,not_found);
}
});
_lookup = function(o,k,not_found){
switch(arguments.length){
case 2:
return _lookup__2.call(this,o,k);
case 3:
return _lookup__3.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
_lookup.cljs$lang$arity$2 = _lookup__2;
_lookup.cljs$lang$arity$3 = _lookup__3;
return _lookup;
})()
;
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = (function _contains_key_QMARK_(coll,k){
if((function (){var and__3941__auto____6449 = coll;
if(and__3941__auto____6449)
{return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2;
} else
{return and__3941__auto____6449;
}
})())
{return coll.cljs$core$IAssociative$_contains_key_QMARK_$arity$2(coll,k);
} else
{var x__2450__auto____6450 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6451 = (cljs.core._contains_key_QMARK_[goog.typeOf(x__2450__auto____6450)]);
if(or__3943__auto____6451)
{return or__3943__auto____6451;
} else
{var or__3943__auto____6452 = (cljs.core._contains_key_QMARK_["_"]);
if(or__3943__auto____6452)
{return or__3943__auto____6452;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-contains-key?",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core._assoc = (function _assoc(coll,k,v){
if((function (){var and__3941__auto____6457 = coll;
if(and__3941__auto____6457)
{return coll.cljs$core$IAssociative$_assoc$arity$3;
} else
{return and__3941__auto____6457;
}
})())
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,k,v);
} else
{var x__2450__auto____6458 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6459 = (cljs.core._assoc[goog.typeOf(x__2450__auto____6458)]);
if(or__3943__auto____6459)
{return or__3943__auto____6459;
} else
{var or__3943__auto____6460 = (cljs.core._assoc["_"]);
if(or__3943__auto____6460)
{return or__3943__auto____6460;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-assoc",coll);
}
}
})().call(null,coll,k,v);
}
});
cljs.core.IMap = {};
cljs.core._dissoc = (function _dissoc(coll,k){
if((function (){var and__3941__auto____6465 = coll;
if(and__3941__auto____6465)
{return coll.cljs$core$IMap$_dissoc$arity$2;
} else
{return and__3941__auto____6465;
}
})())
{return coll.cljs$core$IMap$_dissoc$arity$2(coll,k);
} else
{var x__2450__auto____6466 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6467 = (cljs.core._dissoc[goog.typeOf(x__2450__auto____6466)]);
if(or__3943__auto____6467)
{return or__3943__auto____6467;
} else
{var or__3943__auto____6468 = (cljs.core._dissoc["_"]);
if(or__3943__auto____6468)
{return or__3943__auto____6468;
} else
{throw cljs.core.missing_protocol.call(null,"IMap.-dissoc",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core.IMapEntry = {};
cljs.core._key = (function _key(coll){
if((function (){var and__3941__auto____6473 = coll;
if(and__3941__auto____6473)
{return coll.cljs$core$IMapEntry$_key$arity$1;
} else
{return and__3941__auto____6473;
}
})())
{return coll.cljs$core$IMapEntry$_key$arity$1(coll);
} else
{var x__2450__auto____6474 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6475 = (cljs.core._key[goog.typeOf(x__2450__auto____6474)]);
if(or__3943__auto____6475)
{return or__3943__auto____6475;
} else
{var or__3943__auto____6476 = (cljs.core._key["_"]);
if(or__3943__auto____6476)
{return or__3943__auto____6476;
} else
{throw cljs.core.missing_protocol.call(null,"IMapEntry.-key",coll);
}
}
})().call(null,coll);
}
});
cljs.core._val = (function _val(coll){
if((function (){var and__3941__auto____6481 = coll;
if(and__3941__auto____6481)
{return coll.cljs$core$IMapEntry$_val$arity$1;
} else
{return and__3941__auto____6481;
}
})())
{return coll.cljs$core$IMapEntry$_val$arity$1(coll);
} else
{var x__2450__auto____6482 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6483 = (cljs.core._val[goog.typeOf(x__2450__auto____6482)]);
if(or__3943__auto____6483)
{return or__3943__auto____6483;
} else
{var or__3943__auto____6484 = (cljs.core._val["_"]);
if(or__3943__auto____6484)
{return or__3943__auto____6484;
} else
{throw cljs.core.missing_protocol.call(null,"IMapEntry.-val",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ISet = {};
cljs.core._disjoin = (function _disjoin(coll,v){
if((function (){var and__3941__auto____6489 = coll;
if(and__3941__auto____6489)
{return coll.cljs$core$ISet$_disjoin$arity$2;
} else
{return and__3941__auto____6489;
}
})())
{return coll.cljs$core$ISet$_disjoin$arity$2(coll,v);
} else
{var x__2450__auto____6490 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6491 = (cljs.core._disjoin[goog.typeOf(x__2450__auto____6490)]);
if(or__3943__auto____6491)
{return or__3943__auto____6491;
} else
{var or__3943__auto____6492 = (cljs.core._disjoin["_"]);
if(or__3943__auto____6492)
{return or__3943__auto____6492;
} else
{throw cljs.core.missing_protocol.call(null,"ISet.-disjoin",coll);
}
}
})().call(null,coll,v);
}
});
cljs.core.IStack = {};
cljs.core._peek = (function _peek(coll){
if((function (){var and__3941__auto____6497 = coll;
if(and__3941__auto____6497)
{return coll.cljs$core$IStack$_peek$arity$1;
} else
{return and__3941__auto____6497;
}
})())
{return coll.cljs$core$IStack$_peek$arity$1(coll);
} else
{var x__2450__auto____6498 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6499 = (cljs.core._peek[goog.typeOf(x__2450__auto____6498)]);
if(or__3943__auto____6499)
{return or__3943__auto____6499;
} else
{var or__3943__auto____6500 = (cljs.core._peek["_"]);
if(or__3943__auto____6500)
{return or__3943__auto____6500;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-peek",coll);
}
}
})().call(null,coll);
}
});
cljs.core._pop = (function _pop(coll){
if((function (){var and__3941__auto____6505 = coll;
if(and__3941__auto____6505)
{return coll.cljs$core$IStack$_pop$arity$1;
} else
{return and__3941__auto____6505;
}
})())
{return coll.cljs$core$IStack$_pop$arity$1(coll);
} else
{var x__2450__auto____6506 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6507 = (cljs.core._pop[goog.typeOf(x__2450__auto____6506)]);
if(or__3943__auto____6507)
{return or__3943__auto____6507;
} else
{var or__3943__auto____6508 = (cljs.core._pop["_"]);
if(or__3943__auto____6508)
{return or__3943__auto____6508;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-pop",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IVector = {};
cljs.core._assoc_n = (function _assoc_n(coll,n,val){
if((function (){var and__3941__auto____6513 = coll;
if(and__3941__auto____6513)
{return coll.cljs$core$IVector$_assoc_n$arity$3;
} else
{return and__3941__auto____6513;
}
})())
{return coll.cljs$core$IVector$_assoc_n$arity$3(coll,n,val);
} else
{var x__2450__auto____6514 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6515 = (cljs.core._assoc_n[goog.typeOf(x__2450__auto____6514)]);
if(or__3943__auto____6515)
{return or__3943__auto____6515;
} else
{var or__3943__auto____6516 = (cljs.core._assoc_n["_"]);
if(or__3943__auto____6516)
{return or__3943__auto____6516;
} else
{throw cljs.core.missing_protocol.call(null,"IVector.-assoc-n",coll);
}
}
})().call(null,coll,n,val);
}
});
cljs.core.IDeref = {};
cljs.core._deref = (function _deref(o){
if((function (){var and__3941__auto____6521 = o;
if(and__3941__auto____6521)
{return o.cljs$core$IDeref$_deref$arity$1;
} else
{return and__3941__auto____6521;
}
})())
{return o.cljs$core$IDeref$_deref$arity$1(o);
} else
{var x__2450__auto____6522 = (((o == null))?null:o);
return (function (){var or__3943__auto____6523 = (cljs.core._deref[goog.typeOf(x__2450__auto____6522)]);
if(or__3943__auto____6523)
{return or__3943__auto____6523;
} else
{var or__3943__auto____6524 = (cljs.core._deref["_"]);
if(or__3943__auto____6524)
{return or__3943__auto____6524;
} else
{throw cljs.core.missing_protocol.call(null,"IDeref.-deref",o);
}
}
})().call(null,o);
}
});
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = (function _deref_with_timeout(o,msec,timeout_val){
if((function (){var and__3941__auto____6529 = o;
if(and__3941__auto____6529)
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3;
} else
{return and__3941__auto____6529;
}
})())
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3(o,msec,timeout_val);
} else
{var x__2450__auto____6530 = (((o == null))?null:o);
return (function (){var or__3943__auto____6531 = (cljs.core._deref_with_timeout[goog.typeOf(x__2450__auto____6530)]);
if(or__3943__auto____6531)
{return or__3943__auto____6531;
} else
{var or__3943__auto____6532 = (cljs.core._deref_with_timeout["_"]);
if(or__3943__auto____6532)
{return or__3943__auto____6532;
} else
{throw cljs.core.missing_protocol.call(null,"IDerefWithTimeout.-deref-with-timeout",o);
}
}
})().call(null,o,msec,timeout_val);
}
});
cljs.core.IMeta = {};
cljs.core._meta = (function _meta(o){
if((function (){var and__3941__auto____6537 = o;
if(and__3941__auto____6537)
{return o.cljs$core$IMeta$_meta$arity$1;
} else
{return and__3941__auto____6537;
}
})())
{return o.cljs$core$IMeta$_meta$arity$1(o);
} else
{var x__2450__auto____6538 = (((o == null))?null:o);
return (function (){var or__3943__auto____6539 = (cljs.core._meta[goog.typeOf(x__2450__auto____6538)]);
if(or__3943__auto____6539)
{return or__3943__auto____6539;
} else
{var or__3943__auto____6540 = (cljs.core._meta["_"]);
if(or__3943__auto____6540)
{return or__3943__auto____6540;
} else
{throw cljs.core.missing_protocol.call(null,"IMeta.-meta",o);
}
}
})().call(null,o);
}
});
cljs.core.IWithMeta = {};
cljs.core._with_meta = (function _with_meta(o,meta){
if((function (){var and__3941__auto____6545 = o;
if(and__3941__auto____6545)
{return o.cljs$core$IWithMeta$_with_meta$arity$2;
} else
{return and__3941__auto____6545;
}
})())
{return o.cljs$core$IWithMeta$_with_meta$arity$2(o,meta);
} else
{var x__2450__auto____6546 = (((o == null))?null:o);
return (function (){var or__3943__auto____6547 = (cljs.core._with_meta[goog.typeOf(x__2450__auto____6546)]);
if(or__3943__auto____6547)
{return or__3943__auto____6547;
} else
{var or__3943__auto____6548 = (cljs.core._with_meta["_"]);
if(or__3943__auto____6548)
{return or__3943__auto____6548;
} else
{throw cljs.core.missing_protocol.call(null,"IWithMeta.-with-meta",o);
}
}
})().call(null,o,meta);
}
});
cljs.core.IReduce = {};
cljs.core._reduce = (function() {
var _reduce = null;
var _reduce__2 = (function (coll,f){
if((function (){var and__3941__auto____6557 = coll;
if(and__3941__auto____6557)
{return coll.cljs$core$IReduce$_reduce$arity$2;
} else
{return and__3941__auto____6557;
}
})())
{return coll.cljs$core$IReduce$_reduce$arity$2(coll,f);
} else
{var x__2450__auto____6558 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6559 = (cljs.core._reduce[goog.typeOf(x__2450__auto____6558)]);
if(or__3943__auto____6559)
{return or__3943__auto____6559;
} else
{var or__3943__auto____6560 = (cljs.core._reduce["_"]);
if(or__3943__auto____6560)
{return or__3943__auto____6560;
} else
{throw cljs.core.missing_protocol.call(null,"IReduce.-reduce",coll);
}
}
})().call(null,coll,f);
}
});
var _reduce__3 = (function (coll,f,start){
if((function (){var and__3941__auto____6561 = coll;
if(and__3941__auto____6561)
{return coll.cljs$core$IReduce$_reduce$arity$3;
} else
{return and__3941__auto____6561;
}
})())
{return coll.cljs$core$IReduce$_reduce$arity$3(coll,f,start);
} else
{var x__2450__auto____6562 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6563 = (cljs.core._reduce[goog.typeOf(x__2450__auto____6562)]);
if(or__3943__auto____6563)
{return or__3943__auto____6563;
} else
{var or__3943__auto____6564 = (cljs.core._reduce["_"]);
if(or__3943__auto____6564)
{return or__3943__auto____6564;
} else
{throw cljs.core.missing_protocol.call(null,"IReduce.-reduce",coll);
}
}
})().call(null,coll,f,start);
}
});
_reduce = function(coll,f,start){
switch(arguments.length){
case 2:
return _reduce__2.call(this,coll,f);
case 3:
return _reduce__3.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
_reduce.cljs$lang$arity$2 = _reduce__2;
_reduce.cljs$lang$arity$3 = _reduce__3;
return _reduce;
})()
;
cljs.core.IKVReduce = {};
cljs.core._kv_reduce = (function _kv_reduce(coll,f,init){
if((function (){var and__3941__auto____6569 = coll;
if(and__3941__auto____6569)
{return coll.cljs$core$IKVReduce$_kv_reduce$arity$3;
} else
{return and__3941__auto____6569;
}
})())
{return coll.cljs$core$IKVReduce$_kv_reduce$arity$3(coll,f,init);
} else
{var x__2450__auto____6570 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6571 = (cljs.core._kv_reduce[goog.typeOf(x__2450__auto____6570)]);
if(or__3943__auto____6571)
{return or__3943__auto____6571;
} else
{var or__3943__auto____6572 = (cljs.core._kv_reduce["_"]);
if(or__3943__auto____6572)
{return or__3943__auto____6572;
} else
{throw cljs.core.missing_protocol.call(null,"IKVReduce.-kv-reduce",coll);
}
}
})().call(null,coll,f,init);
}
});
cljs.core.IEquiv = {};
cljs.core._equiv = (function _equiv(o,other){
if((function (){var and__3941__auto____6577 = o;
if(and__3941__auto____6577)
{return o.cljs$core$IEquiv$_equiv$arity$2;
} else
{return and__3941__auto____6577;
}
})())
{return o.cljs$core$IEquiv$_equiv$arity$2(o,other);
} else
{var x__2450__auto____6578 = (((o == null))?null:o);
return (function (){var or__3943__auto____6579 = (cljs.core._equiv[goog.typeOf(x__2450__auto____6578)]);
if(or__3943__auto____6579)
{return or__3943__auto____6579;
} else
{var or__3943__auto____6580 = (cljs.core._equiv["_"]);
if(or__3943__auto____6580)
{return or__3943__auto____6580;
} else
{throw cljs.core.missing_protocol.call(null,"IEquiv.-equiv",o);
}
}
})().call(null,o,other);
}
});
cljs.core.IHash = {};
cljs.core._hash = (function _hash(o){
if((function (){var and__3941__auto____6585 = o;
if(and__3941__auto____6585)
{return o.cljs$core$IHash$_hash$arity$1;
} else
{return and__3941__auto____6585;
}
})())
{return o.cljs$core$IHash$_hash$arity$1(o);
} else
{var x__2450__auto____6586 = (((o == null))?null:o);
return (function (){var or__3943__auto____6587 = (cljs.core._hash[goog.typeOf(x__2450__auto____6586)]);
if(or__3943__auto____6587)
{return or__3943__auto____6587;
} else
{var or__3943__auto____6588 = (cljs.core._hash["_"]);
if(or__3943__auto____6588)
{return or__3943__auto____6588;
} else
{throw cljs.core.missing_protocol.call(null,"IHash.-hash",o);
}
}
})().call(null,o);
}
});
cljs.core.ISeqable = {};
cljs.core._seq = (function _seq(o){
if((function (){var and__3941__auto____6593 = o;
if(and__3941__auto____6593)
{return o.cljs$core$ISeqable$_seq$arity$1;
} else
{return and__3941__auto____6593;
}
})())
{return o.cljs$core$ISeqable$_seq$arity$1(o);
} else
{var x__2450__auto____6594 = (((o == null))?null:o);
return (function (){var or__3943__auto____6595 = (cljs.core._seq[goog.typeOf(x__2450__auto____6594)]);
if(or__3943__auto____6595)
{return or__3943__auto____6595;
} else
{var or__3943__auto____6596 = (cljs.core._seq["_"]);
if(or__3943__auto____6596)
{return or__3943__auto____6596;
} else
{throw cljs.core.missing_protocol.call(null,"ISeqable.-seq",o);
}
}
})().call(null,o);
}
});
cljs.core.ISequential = {};
cljs.core.IList = {};
cljs.core.IRecord = {};
cljs.core.IReversible = {};
cljs.core._rseq = (function _rseq(coll){
if((function (){var and__3941__auto____6601 = coll;
if(and__3941__auto____6601)
{return coll.cljs$core$IReversible$_rseq$arity$1;
} else
{return and__3941__auto____6601;
}
})())
{return coll.cljs$core$IReversible$_rseq$arity$1(coll);
} else
{var x__2450__auto____6602 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6603 = (cljs.core._rseq[goog.typeOf(x__2450__auto____6602)]);
if(or__3943__auto____6603)
{return or__3943__auto____6603;
} else
{var or__3943__auto____6604 = (cljs.core._rseq["_"]);
if(or__3943__auto____6604)
{return or__3943__auto____6604;
} else
{throw cljs.core.missing_protocol.call(null,"IReversible.-rseq",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ISorted = {};
cljs.core._sorted_seq = (function _sorted_seq(coll,ascending_QMARK_){
if((function (){var and__3941__auto____6609 = coll;
if(and__3941__auto____6609)
{return coll.cljs$core$ISorted$_sorted_seq$arity$2;
} else
{return and__3941__auto____6609;
}
})())
{return coll.cljs$core$ISorted$_sorted_seq$arity$2(coll,ascending_QMARK_);
} else
{var x__2450__auto____6610 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6611 = (cljs.core._sorted_seq[goog.typeOf(x__2450__auto____6610)]);
if(or__3943__auto____6611)
{return or__3943__auto____6611;
} else
{var or__3943__auto____6612 = (cljs.core._sorted_seq["_"]);
if(or__3943__auto____6612)
{return or__3943__auto____6612;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-sorted-seq",coll);
}
}
})().call(null,coll,ascending_QMARK_);
}
});
cljs.core._sorted_seq_from = (function _sorted_seq_from(coll,k,ascending_QMARK_){
if((function (){var and__3941__auto____6617 = coll;
if(and__3941__auto____6617)
{return coll.cljs$core$ISorted$_sorted_seq_from$arity$3;
} else
{return and__3941__auto____6617;
}
})())
{return coll.cljs$core$ISorted$_sorted_seq_from$arity$3(coll,k,ascending_QMARK_);
} else
{var x__2450__auto____6618 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6619 = (cljs.core._sorted_seq_from[goog.typeOf(x__2450__auto____6618)]);
if(or__3943__auto____6619)
{return or__3943__auto____6619;
} else
{var or__3943__auto____6620 = (cljs.core._sorted_seq_from["_"]);
if(or__3943__auto____6620)
{return or__3943__auto____6620;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-sorted-seq-from",coll);
}
}
})().call(null,coll,k,ascending_QMARK_);
}
});
cljs.core._entry_key = (function _entry_key(coll,entry){
if((function (){var and__3941__auto____6625 = coll;
if(and__3941__auto____6625)
{return coll.cljs$core$ISorted$_entry_key$arity$2;
} else
{return and__3941__auto____6625;
}
})())
{return coll.cljs$core$ISorted$_entry_key$arity$2(coll,entry);
} else
{var x__2450__auto____6626 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6627 = (cljs.core._entry_key[goog.typeOf(x__2450__auto____6626)]);
if(or__3943__auto____6627)
{return or__3943__auto____6627;
} else
{var or__3943__auto____6628 = (cljs.core._entry_key["_"]);
if(or__3943__auto____6628)
{return or__3943__auto____6628;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-entry-key",coll);
}
}
})().call(null,coll,entry);
}
});
cljs.core._comparator = (function _comparator(coll){
if((function (){var and__3941__auto____6633 = coll;
if(and__3941__auto____6633)
{return coll.cljs$core$ISorted$_comparator$arity$1;
} else
{return and__3941__auto____6633;
}
})())
{return coll.cljs$core$ISorted$_comparator$arity$1(coll);
} else
{var x__2450__auto____6634 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6635 = (cljs.core._comparator[goog.typeOf(x__2450__auto____6634)]);
if(or__3943__auto____6635)
{return or__3943__auto____6635;
} else
{var or__3943__auto____6636 = (cljs.core._comparator["_"]);
if(or__3943__auto____6636)
{return or__3943__auto____6636;
} else
{throw cljs.core.missing_protocol.call(null,"ISorted.-comparator",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IPrintable = {};
cljs.core._pr_seq = (function _pr_seq(o,opts){
if((function (){var and__3941__auto____6641 = o;
if(and__3941__auto____6641)
{return o.cljs$core$IPrintable$_pr_seq$arity$2;
} else
{return and__3941__auto____6641;
}
})())
{return o.cljs$core$IPrintable$_pr_seq$arity$2(o,opts);
} else
{var x__2450__auto____6642 = (((o == null))?null:o);
return (function (){var or__3943__auto____6643 = (cljs.core._pr_seq[goog.typeOf(x__2450__auto____6642)]);
if(or__3943__auto____6643)
{return or__3943__auto____6643;
} else
{var or__3943__auto____6644 = (cljs.core._pr_seq["_"]);
if(or__3943__auto____6644)
{return or__3943__auto____6644;
} else
{throw cljs.core.missing_protocol.call(null,"IPrintable.-pr-seq",o);
}
}
})().call(null,o,opts);
}
});
cljs.core.IWriter = {};
cljs.core._write = (function _write(writer,s){
if((function (){var and__3941__auto____6649 = writer;
if(and__3941__auto____6649)
{return writer.cljs$core$IWriter$_write$arity$2;
} else
{return and__3941__auto____6649;
}
})())
{return writer.cljs$core$IWriter$_write$arity$2(writer,s);
} else
{var x__2450__auto____6650 = (((writer == null))?null:writer);
return (function (){var or__3943__auto____6651 = (cljs.core._write[goog.typeOf(x__2450__auto____6650)]);
if(or__3943__auto____6651)
{return or__3943__auto____6651;
} else
{var or__3943__auto____6652 = (cljs.core._write["_"]);
if(or__3943__auto____6652)
{return or__3943__auto____6652;
} else
{throw cljs.core.missing_protocol.call(null,"IWriter.-write",writer);
}
}
})().call(null,writer,s);
}
});
cljs.core._flush = (function _flush(writer){
if((function (){var and__3941__auto____6657 = writer;
if(and__3941__auto____6657)
{return writer.cljs$core$IWriter$_flush$arity$1;
} else
{return and__3941__auto____6657;
}
})())
{return writer.cljs$core$IWriter$_flush$arity$1(writer);
} else
{var x__2450__auto____6658 = (((writer == null))?null:writer);
return (function (){var or__3943__auto____6659 = (cljs.core._flush[goog.typeOf(x__2450__auto____6658)]);
if(or__3943__auto____6659)
{return or__3943__auto____6659;
} else
{var or__3943__auto____6660 = (cljs.core._flush["_"]);
if(or__3943__auto____6660)
{return or__3943__auto____6660;
} else
{throw cljs.core.missing_protocol.call(null,"IWriter.-flush",writer);
}
}
})().call(null,writer);
}
});
cljs.core.IPrintWithWriter = {};
cljs.core._pr_writer = (function _pr_writer(o,writer,opts){
if((function (){var and__3941__auto____6665 = o;
if(and__3941__auto____6665)
{return o.cljs$core$IPrintWithWriter$_pr_writer$arity$3;
} else
{return and__3941__auto____6665;
}
})())
{return o.cljs$core$IPrintWithWriter$_pr_writer$arity$3(o,writer,opts);
} else
{var x__2450__auto____6666 = (((o == null))?null:o);
return (function (){var or__3943__auto____6667 = (cljs.core._pr_writer[goog.typeOf(x__2450__auto____6666)]);
if(or__3943__auto____6667)
{return or__3943__auto____6667;
} else
{var or__3943__auto____6668 = (cljs.core._pr_writer["_"]);
if(or__3943__auto____6668)
{return or__3943__auto____6668;
} else
{throw cljs.core.missing_protocol.call(null,"IPrintWithWriter.-pr-writer",o);
}
}
})().call(null,o,writer,opts);
}
});
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = (function _realized_QMARK_(d){
if((function (){var and__3941__auto____6673 = d;
if(and__3941__auto____6673)
{return d.cljs$core$IPending$_realized_QMARK_$arity$1;
} else
{return and__3941__auto____6673;
}
})())
{return d.cljs$core$IPending$_realized_QMARK_$arity$1(d);
} else
{var x__2450__auto____6674 = (((d == null))?null:d);
return (function (){var or__3943__auto____6675 = (cljs.core._realized_QMARK_[goog.typeOf(x__2450__auto____6674)]);
if(or__3943__auto____6675)
{return or__3943__auto____6675;
} else
{var or__3943__auto____6676 = (cljs.core._realized_QMARK_["_"]);
if(or__3943__auto____6676)
{return or__3943__auto____6676;
} else
{throw cljs.core.missing_protocol.call(null,"IPending.-realized?",d);
}
}
})().call(null,d);
}
});
cljs.core.IWatchable = {};
cljs.core._notify_watches = (function _notify_watches(this$,oldval,newval){
if((function (){var and__3941__auto____6681 = this$;
if(and__3941__auto____6681)
{return this$.cljs$core$IWatchable$_notify_watches$arity$3;
} else
{return and__3941__auto____6681;
}
})())
{return this$.cljs$core$IWatchable$_notify_watches$arity$3(this$,oldval,newval);
} else
{var x__2450__auto____6682 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6683 = (cljs.core._notify_watches[goog.typeOf(x__2450__auto____6682)]);
if(or__3943__auto____6683)
{return or__3943__auto____6683;
} else
{var or__3943__auto____6684 = (cljs.core._notify_watches["_"]);
if(or__3943__auto____6684)
{return or__3943__auto____6684;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-notify-watches",this$);
}
}
})().call(null,this$,oldval,newval);
}
});
cljs.core._add_watch = (function _add_watch(this$,key,f){
if((function (){var and__3941__auto____6689 = this$;
if(and__3941__auto____6689)
{return this$.cljs$core$IWatchable$_add_watch$arity$3;
} else
{return and__3941__auto____6689;
}
})())
{return this$.cljs$core$IWatchable$_add_watch$arity$3(this$,key,f);
} else
{var x__2450__auto____6690 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6691 = (cljs.core._add_watch[goog.typeOf(x__2450__auto____6690)]);
if(or__3943__auto____6691)
{return or__3943__auto____6691;
} else
{var or__3943__auto____6692 = (cljs.core._add_watch["_"]);
if(or__3943__auto____6692)
{return or__3943__auto____6692;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-add-watch",this$);
}
}
})().call(null,this$,key,f);
}
});
cljs.core._remove_watch = (function _remove_watch(this$,key){
if((function (){var and__3941__auto____6697 = this$;
if(and__3941__auto____6697)
{return this$.cljs$core$IWatchable$_remove_watch$arity$2;
} else
{return and__3941__auto____6697;
}
})())
{return this$.cljs$core$IWatchable$_remove_watch$arity$2(this$,key);
} else
{var x__2450__auto____6698 = (((this$ == null))?null:this$);
return (function (){var or__3943__auto____6699 = (cljs.core._remove_watch[goog.typeOf(x__2450__auto____6698)]);
if(or__3943__auto____6699)
{return or__3943__auto____6699;
} else
{var or__3943__auto____6700 = (cljs.core._remove_watch["_"]);
if(or__3943__auto____6700)
{return or__3943__auto____6700;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-remove-watch",this$);
}
}
})().call(null,this$,key);
}
});
cljs.core.IEditableCollection = {};
cljs.core._as_transient = (function _as_transient(coll){
if((function (){var and__3941__auto____6705 = coll;
if(and__3941__auto____6705)
{return coll.cljs$core$IEditableCollection$_as_transient$arity$1;
} else
{return and__3941__auto____6705;
}
})())
{return coll.cljs$core$IEditableCollection$_as_transient$arity$1(coll);
} else
{var x__2450__auto____6706 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6707 = (cljs.core._as_transient[goog.typeOf(x__2450__auto____6706)]);
if(or__3943__auto____6707)
{return or__3943__auto____6707;
} else
{var or__3943__auto____6708 = (cljs.core._as_transient["_"]);
if(or__3943__auto____6708)
{return or__3943__auto____6708;
} else
{throw cljs.core.missing_protocol.call(null,"IEditableCollection.-as-transient",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ITransientCollection = {};
cljs.core._conj_BANG_ = (function _conj_BANG_(tcoll,val){
if((function (){var and__3941__auto____6713 = tcoll;
if(and__3941__auto____6713)
{return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2;
} else
{return and__3941__auto____6713;
}
})())
{return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll,val);
} else
{var x__2450__auto____6714 = (((tcoll == null))?null:tcoll);
return (function (){var or__3943__auto____6715 = (cljs.core._conj_BANG_[goog.typeOf(x__2450__auto____6714)]);
if(or__3943__auto____6715)
{return or__3943__auto____6715;
} else
{var or__3943__auto____6716 = (cljs.core._conj_BANG_["_"]);
if(or__3943__auto____6716)
{return or__3943__auto____6716;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientCollection.-conj!",tcoll);
}
}
})().call(null,tcoll,val);
}
});
cljs.core._persistent_BANG_ = (function _persistent_BANG_(tcoll){
if((function (){var and__3941__auto____6721 = tcoll;
if(and__3941__auto____6721)
{return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1;
} else
{return and__3941__auto____6721;
}
})())
{return tcoll.cljs$core$ITransientCollection$_persistent_BANG_$arity$1(tcoll);
} else
{var x__2450__auto____6722 = (((tcoll == null))?null:tcoll);
return (function (){var or__3943__auto____6723 = (cljs.core._persistent_BANG_[goog.typeOf(x__2450__auto____6722)]);
if(or__3943__auto____6723)
{return or__3943__auto____6723;
} else
{var or__3943__auto____6724 = (cljs.core._persistent_BANG_["_"]);
if(or__3943__auto____6724)
{return or__3943__auto____6724;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientCollection.-persistent!",tcoll);
}
}
})().call(null,tcoll);
}
});
cljs.core.ITransientAssociative = {};
cljs.core._assoc_BANG_ = (function _assoc_BANG_(tcoll,key,val){
if((function (){var and__3941__auto____6729 = tcoll;
if(and__3941__auto____6729)
{return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3;
} else
{return and__3941__auto____6729;
}
})())
{return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll,key,val);
} else
{var x__2450__auto____6730 = (((tcoll == null))?null:tcoll);
return (function (){var or__3943__auto____6731 = (cljs.core._assoc_BANG_[goog.typeOf(x__2450__auto____6730)]);
if(or__3943__auto____6731)
{return or__3943__auto____6731;
} else
{var or__3943__auto____6732 = (cljs.core._assoc_BANG_["_"]);
if(or__3943__auto____6732)
{return or__3943__auto____6732;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientAssociative.-assoc!",tcoll);
}
}
})().call(null,tcoll,key,val);
}
});
cljs.core.ITransientMap = {};
cljs.core._dissoc_BANG_ = (function _dissoc_BANG_(tcoll,key){
if((function (){var and__3941__auto____6737 = tcoll;
if(and__3941__auto____6737)
{return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2;
} else
{return and__3941__auto____6737;
}
})())
{return tcoll.cljs$core$ITransientMap$_dissoc_BANG_$arity$2(tcoll,key);
} else
{var x__2450__auto____6738 = (((tcoll == null))?null:tcoll);
return (function (){var or__3943__auto____6739 = (cljs.core._dissoc_BANG_[goog.typeOf(x__2450__auto____6738)]);
if(or__3943__auto____6739)
{return or__3943__auto____6739;
} else
{var or__3943__auto____6740 = (cljs.core._dissoc_BANG_["_"]);
if(or__3943__auto____6740)
{return or__3943__auto____6740;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientMap.-dissoc!",tcoll);
}
}
})().call(null,tcoll,key);
}
});
cljs.core.ITransientVector = {};
cljs.core._assoc_n_BANG_ = (function _assoc_n_BANG_(tcoll,n,val){
if((function (){var and__3941__auto____6745 = tcoll;
if(and__3941__auto____6745)
{return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3;
} else
{return and__3941__auto____6745;
}
})())
{return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll,n,val);
} else
{var x__2450__auto____6746 = (((tcoll == null))?null:tcoll);
return (function (){var or__3943__auto____6747 = (cljs.core._assoc_n_BANG_[goog.typeOf(x__2450__auto____6746)]);
if(or__3943__auto____6747)
{return or__3943__auto____6747;
} else
{var or__3943__auto____6748 = (cljs.core._assoc_n_BANG_["_"]);
if(or__3943__auto____6748)
{return or__3943__auto____6748;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientVector.-assoc-n!",tcoll);
}
}
})().call(null,tcoll,n,val);
}
});
cljs.core._pop_BANG_ = (function _pop_BANG_(tcoll){
if((function (){var and__3941__auto____6753 = tcoll;
if(and__3941__auto____6753)
{return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1;
} else
{return and__3941__auto____6753;
}
})())
{return tcoll.cljs$core$ITransientVector$_pop_BANG_$arity$1(tcoll);
} else
{var x__2450__auto____6754 = (((tcoll == null))?null:tcoll);
return (function (){var or__3943__auto____6755 = (cljs.core._pop_BANG_[goog.typeOf(x__2450__auto____6754)]);
if(or__3943__auto____6755)
{return or__3943__auto____6755;
} else
{var or__3943__auto____6756 = (cljs.core._pop_BANG_["_"]);
if(or__3943__auto____6756)
{return or__3943__auto____6756;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientVector.-pop!",tcoll);
}
}
})().call(null,tcoll);
}
});
cljs.core.ITransientSet = {};
cljs.core._disjoin_BANG_ = (function _disjoin_BANG_(tcoll,v){
if((function (){var and__3941__auto____6761 = tcoll;
if(and__3941__auto____6761)
{return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2;
} else
{return and__3941__auto____6761;
}
})())
{return tcoll.cljs$core$ITransientSet$_disjoin_BANG_$arity$2(tcoll,v);
} else
{var x__2450__auto____6762 = (((tcoll == null))?null:tcoll);
return (function (){var or__3943__auto____6763 = (cljs.core._disjoin_BANG_[goog.typeOf(x__2450__auto____6762)]);
if(or__3943__auto____6763)
{return or__3943__auto____6763;
} else
{var or__3943__auto____6764 = (cljs.core._disjoin_BANG_["_"]);
if(or__3943__auto____6764)
{return or__3943__auto____6764;
} else
{throw cljs.core.missing_protocol.call(null,"ITransientSet.-disjoin!",tcoll);
}
}
})().call(null,tcoll,v);
}
});
cljs.core.IComparable = {};
cljs.core._compare = (function _compare(x,y){
if((function (){var and__3941__auto____6769 = x;
if(and__3941__auto____6769)
{return x.cljs$core$IComparable$_compare$arity$2;
} else
{return and__3941__auto____6769;
}
})())
{return x.cljs$core$IComparable$_compare$arity$2(x,y);
} else
{var x__2450__auto____6770 = (((x == null))?null:x);
return (function (){var or__3943__auto____6771 = (cljs.core._compare[goog.typeOf(x__2450__auto____6770)]);
if(or__3943__auto____6771)
{return or__3943__auto____6771;
} else
{var or__3943__auto____6772 = (cljs.core._compare["_"]);
if(or__3943__auto____6772)
{return or__3943__auto____6772;
} else
{throw cljs.core.missing_protocol.call(null,"IComparable.-compare",x);
}
}
})().call(null,x,y);
}
});
cljs.core.IChunk = {};
cljs.core._drop_first = (function _drop_first(coll){
if((function (){var and__3941__auto____6777 = coll;
if(and__3941__auto____6777)
{return coll.cljs$core$IChunk$_drop_first$arity$1;
} else
{return and__3941__auto____6777;
}
})())
{return coll.cljs$core$IChunk$_drop_first$arity$1(coll);
} else
{var x__2450__auto____6778 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6779 = (cljs.core._drop_first[goog.typeOf(x__2450__auto____6778)]);
if(or__3943__auto____6779)
{return or__3943__auto____6779;
} else
{var or__3943__auto____6780 = (cljs.core._drop_first["_"]);
if(or__3943__auto____6780)
{return or__3943__auto____6780;
} else
{throw cljs.core.missing_protocol.call(null,"IChunk.-drop-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IChunkedSeq = {};
cljs.core._chunked_first = (function _chunked_first(coll){
if((function (){var and__3941__auto____6785 = coll;
if(and__3941__auto____6785)
{return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1;
} else
{return and__3941__auto____6785;
}
})())
{return coll.cljs$core$IChunkedSeq$_chunked_first$arity$1(coll);
} else
{var x__2450__auto____6786 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6787 = (cljs.core._chunked_first[goog.typeOf(x__2450__auto____6786)]);
if(or__3943__auto____6787)
{return or__3943__auto____6787;
} else
{var or__3943__auto____6788 = (cljs.core._chunked_first["_"]);
if(or__3943__auto____6788)
{return or__3943__auto____6788;
} else
{throw cljs.core.missing_protocol.call(null,"IChunkedSeq.-chunked-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core._chunked_rest = (function _chunked_rest(coll){
if((function (){var and__3941__auto____6793 = coll;
if(and__3941__auto____6793)
{return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1;
} else
{return and__3941__auto____6793;
}
})())
{return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll);
} else
{var x__2450__auto____6794 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6795 = (cljs.core._chunked_rest[goog.typeOf(x__2450__auto____6794)]);
if(or__3943__auto____6795)
{return or__3943__auto____6795;
} else
{var or__3943__auto____6796 = (cljs.core._chunked_rest["_"]);
if(or__3943__auto____6796)
{return or__3943__auto____6796;
} else
{throw cljs.core.missing_protocol.call(null,"IChunkedSeq.-chunked-rest",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IChunkedNext = {};
cljs.core._chunked_next = (function _chunked_next(coll){
if((function (){var and__3941__auto____6801 = coll;
if(and__3941__auto____6801)
{return coll.cljs$core$IChunkedNext$_chunked_next$arity$1;
} else
{return and__3941__auto____6801;
}
})())
{return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll);
} else
{var x__2450__auto____6802 = (((coll == null))?null:coll);
return (function (){var or__3943__auto____6803 = (cljs.core._chunked_next[goog.typeOf(x__2450__auto____6802)]);
if(or__3943__auto____6803)
{return or__3943__auto____6803;
} else
{var or__3943__auto____6804 = (cljs.core._chunked_next["_"]);
if(or__3943__auto____6804)
{return or__3943__auto____6804;
} else
{throw cljs.core.missing_protocol.call(null,"IChunkedNext.-chunked-next",coll);
}
}
})().call(null,coll);
}
});
/**
* Returns a seq on the collection. If the collection is
* empty, returns nil.  (seq nil) returns nil. seq also works on
* Strings.
*/
cljs.core.seq = (function seq(coll){
if((coll == null))
{return null;
} else
{if((function (){var G__6808__6809 = coll;
if(G__6808__6809)
{if((function (){var or__3943__auto____6810 = (G__6808__6809.cljs$lang$protocol_mask$partition0$ & 32);
if(or__3943__auto____6810)
{return or__3943__auto____6810;
} else
{return G__6808__6809.cljs$core$ASeq$;
}
})())
{return true;
} else
{if((!G__6808__6809.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ASeq,G__6808__6809);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ASeq,G__6808__6809);
}
})())
{return coll;
} else
{return cljs.core._seq.call(null,coll);
}
}
});
/**
* Returns the first item in the collection. Calls seq on its
* argument. If coll is nil, returns nil.
*/
cljs.core.first = (function first(coll){
if((coll == null))
{return null;
} else
{if((function (){var G__6815__6816 = coll;
if(G__6815__6816)
{if((function (){var or__3943__auto____6817 = (G__6815__6816.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3943__auto____6817)
{return or__3943__auto____6817;
} else
{return G__6815__6816.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__6815__6816.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__6815__6816);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__6815__6816);
}
})())
{return cljs.core._first.call(null,coll);
} else
{var s__6818 = cljs.core.seq.call(null,coll);
if((s__6818 == null))
{return null;
} else
{return cljs.core._first.call(null,s__6818);
}
}
}
});
/**
* Returns a possibly empty seq of the items after the first. Calls seq on its
* argument.
*/
cljs.core.rest = (function rest(coll){
if(!((coll == null)))
{if((function (){var G__6823__6824 = coll;
if(G__6823__6824)
{if((function (){var or__3943__auto____6825 = (G__6823__6824.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3943__auto____6825)
{return or__3943__auto____6825;
} else
{return G__6823__6824.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__6823__6824.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__6823__6824);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__6823__6824);
}
})())
{return cljs.core._rest.call(null,coll);
} else
{var s__6826 = cljs.core.seq.call(null,coll);
if(!((s__6826 == null)))
{return cljs.core._rest.call(null,s__6826);
} else
{return cljs.core.List.EMPTY;
}
}
} else
{return cljs.core.List.EMPTY;
}
});
/**
* Returns a seq of the items after the first. Calls seq on its
* argument.  If there are no more items, returns nil
*/
cljs.core.next = (function next(coll){
if((coll == null))
{return null;
} else
{if((function (){var G__6830__6831 = coll;
if(G__6830__6831)
{if((function (){var or__3943__auto____6832 = (G__6830__6831.cljs$lang$protocol_mask$partition0$ & 128);
if(or__3943__auto____6832)
{return or__3943__auto____6832;
} else
{return G__6830__6831.cljs$core$INext$;
}
})())
{return true;
} else
{if((!G__6830__6831.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.INext,G__6830__6831);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.INext,G__6830__6831);
}
})())
{return cljs.core._next.call(null,coll);
} else
{return cljs.core.seq.call(null,cljs.core.rest.call(null,coll));
}
}
});
/**
* Equality. Returns true if x equals y, false if not. Compares
* numbers and collections in a type-independent manner.  Clojure's immutable data
* structures define -equiv (and thus =) as a value, not an identity,
* comparison.
* @param {...*} var_args
*/
cljs.core._EQ_ = (function() {
var _EQ_ = null;
var _EQ___1 = (function (x){
return true;
});
var _EQ___2 = (function (x,y){
var or__3943__auto____6834 = (x === y);
if(or__3943__auto____6834)
{return or__3943__auto____6834;
} else
{return cljs.core._equiv.call(null,x,y);
}
});
var _EQ___3 = (function() { 
var G__6835__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_EQ_.call(null,x,y)))
{if(cljs.core.next.call(null,more))
{{
var G__6836 = y;
var G__6837 = cljs.core.first.call(null,more);
var G__6838 = cljs.core.next.call(null,more);
x = G__6836;
y = G__6837;
more = G__6838;
continue;
}
} else
{return _EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__6835 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__6835__delegate.call(this, x, y, more);
};
G__6835.cljs$lang$maxFixedArity = 2;
G__6835.cljs$lang$applyTo = (function (arglist__6839){
var x = cljs.core.first(arglist__6839);
var y = cljs.core.first(cljs.core.next(arglist__6839));
var more = cljs.core.rest(cljs.core.next(arglist__6839));
return G__6835__delegate(x, y, more);
});
G__6835.cljs$lang$arity$variadic = G__6835__delegate;
return G__6835;
})()
;
_EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _EQ___1.call(this,x);
case 2:
return _EQ___2.call(this,x,y);
default:
return _EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_EQ_.cljs$lang$maxFixedArity = 2;
_EQ_.cljs$lang$applyTo = _EQ___3.cljs$lang$applyTo;
_EQ_.cljs$lang$arity$1 = _EQ___1;
_EQ_.cljs$lang$arity$2 = _EQ___2;
_EQ_.cljs$lang$arity$variadic = _EQ___3.cljs$lang$arity$variadic;
return _EQ_;
})()
;
cljs.core.type = (function type(x){
if((x == null))
{return null;
} else
{return x.constructor;
}
});
cljs.core.instance_QMARK_ = (function instance_QMARK_(t,o){
return (o instanceof t);
});
(cljs.core.IHash["null"] = true);
(cljs.core._hash["null"] = (function (o){
return 0;
}));
(cljs.core.ILookup["null"] = true);
(cljs.core._lookup["null"] = (function() {
var G__6840 = null;
var G__6840__2 = (function (o,k){
return null;
});
var G__6840__3 = (function (o,k,not_found){
return not_found;
});
G__6840 = function(o,k,not_found){
switch(arguments.length){
case 2:
return G__6840__2.call(this,o,k);
case 3:
return G__6840__3.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__6840;
})()
);
(cljs.core.IAssociative["null"] = true);
(cljs.core._assoc["null"] = (function (_,k,v){
return cljs.core.hash_map.call(null,k,v);
}));
(cljs.core.INext["null"] = true);
(cljs.core._next["null"] = (function (_){
return null;
}));
(cljs.core.IPrintWithWriter["null"] = true);
(cljs.core._pr_writer["null"] = (function (o,writer,_){
return cljs.core._write.call(null,writer,"nil");
}));
(cljs.core.ICollection["null"] = true);
(cljs.core._conj["null"] = (function (_,o){
return cljs.core.list.call(null,o);
}));
(cljs.core.IReduce["null"] = true);
(cljs.core._reduce["null"] = (function() {
var G__6841 = null;
var G__6841__2 = (function (_,f){
return f.call(null);
});
var G__6841__3 = (function (_,f,start){
return start;
});
G__6841 = function(_,f,start){
switch(arguments.length){
case 2:
return G__6841__2.call(this,_,f);
case 3:
return G__6841__3.call(this,_,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__6841;
})()
);
(cljs.core.IPrintable["null"] = true);
(cljs.core._pr_seq["null"] = (function (o){
return cljs.core.list.call(null,"nil");
}));
(cljs.core.ISet["null"] = true);
(cljs.core._disjoin["null"] = (function (_,v){
return null;
}));
(cljs.core.ICounted["null"] = true);
(cljs.core._count["null"] = (function (_){
return 0;
}));
(cljs.core.IStack["null"] = true);
(cljs.core._peek["null"] = (function (_){
return null;
}));
(cljs.core._pop["null"] = (function (_){
return null;
}));
(cljs.core.ISeq["null"] = true);
(cljs.core._first["null"] = (function (_){
return null;
}));
(cljs.core._rest["null"] = (function (_){
return cljs.core.list.call(null);
}));
(cljs.core.IEquiv["null"] = true);
(cljs.core._equiv["null"] = (function (_,o){
return (o == null);
}));
(cljs.core.IWithMeta["null"] = true);
(cljs.core._with_meta["null"] = (function (_,meta){
return null;
}));
(cljs.core.IMeta["null"] = true);
(cljs.core._meta["null"] = (function (_){
return null;
}));
(cljs.core.IIndexed["null"] = true);
(cljs.core._nth["null"] = (function() {
var G__6842 = null;
var G__6842__2 = (function (_,n){
return null;
});
var G__6842__3 = (function (_,n,not_found){
return not_found;
});
G__6842 = function(_,n,not_found){
switch(arguments.length){
case 2:
return G__6842__2.call(this,_,n);
case 3:
return G__6842__3.call(this,_,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__6842;
})()
);
(cljs.core.IEmptyableCollection["null"] = true);
(cljs.core._empty["null"] = (function (_){
return null;
}));
(cljs.core.IMap["null"] = true);
(cljs.core._dissoc["null"] = (function (_,k){
return null;
}));
Date.prototype.cljs$core$IEquiv$ = true;
Date.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var and__3941__auto____6843 = cljs.core.instance_QMARK_.call(null,Date,other);
if(and__3941__auto____6843)
{return (o.toString() === other.toString());
} else
{return and__3941__auto____6843;
}
});
(cljs.core.IHash["number"] = true);
(cljs.core._hash["number"] = (function (o){
return o;
}));
(cljs.core.IEquiv["number"] = true);
(cljs.core._equiv["number"] = (function (x,o){
return (x === o);
}));
(cljs.core.IHash["boolean"] = true);
(cljs.core._hash["boolean"] = (function (o){
if((o === true))
{return 1;
} else
{return 0;
}
}));
(cljs.core.IHash["_"] = true);
(cljs.core._hash["_"] = (function (o){
return goog.getUid(o);
}));
/**
* Returns a number one greater than num.
*/
cljs.core.inc = (function inc(x){
return (x + 1);
});

goog.provide('cljs.core.Reduced');

/**
* @constructor
*/
cljs.core.Reduced = (function (val){
this.val = val;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32768;
})
cljs.core.Reduced.cljs$lang$type = true;
cljs.core.Reduced.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/Reduced");
});
cljs.core.Reduced.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/Reduced");
});
cljs.core.Reduced.prototype.cljs$core$IDeref$_deref$arity$1 = (function (o){
var this__6844 = this;
return this__6844.val;
});
cljs.core.Reduced;
/**
* Wraps x in a way such that a reduce will terminate with the value x
*/
cljs.core.reduced = (function reduced(x){
return (new cljs.core.Reduced(x));
});
/**
* Returns true if x is the result of a call to reduced
*/
cljs.core.reduced_QMARK_ = (function reduced_QMARK_(r){
return cljs.core.instance_QMARK_.call(null,cljs.core.Reduced,r);
});
/**
* Accepts any collection which satisfies the ICount and IIndexed protocols and
* reduces them without incurring seq initialization
*/
cljs.core.ci_reduce = (function() {
var ci_reduce = null;
var ci_reduce__2 = (function (cicoll,f){
var cnt__6857 = cljs.core._count.call(null,cicoll);
if((cnt__6857 === 0))
{return f.call(null);
} else
{var val__6858 = cljs.core._nth.call(null,cicoll,0);
var n__6859 = 1;
while(true){
if((n__6859 < cnt__6857))
{var nval__6860 = f.call(null,val__6858,cljs.core._nth.call(null,cicoll,n__6859));
if(cljs.core.reduced_QMARK_.call(null,nval__6860))
{return cljs.core.deref.call(null,nval__6860);
} else
{{
var G__6869 = nval__6860;
var G__6870 = (n__6859 + 1);
val__6858 = G__6869;
n__6859 = G__6870;
continue;
}
}
} else
{return val__6858;
}
break;
}
}
});
var ci_reduce__3 = (function (cicoll,f,val){
var cnt__6861 = cljs.core._count.call(null,cicoll);
var val__6862 = val;
var n__6863 = 0;
while(true){
if((n__6863 < cnt__6861))
{var nval__6864 = f.call(null,val__6862,cljs.core._nth.call(null,cicoll,n__6863));
if(cljs.core.reduced_QMARK_.call(null,nval__6864))
{return cljs.core.deref.call(null,nval__6864);
} else
{{
var G__6871 = nval__6864;
var G__6872 = (n__6863 + 1);
val__6862 = G__6871;
n__6863 = G__6872;
continue;
}
}
} else
{return val__6862;
}
break;
}
});
var ci_reduce__4 = (function (cicoll,f,val,idx){
var cnt__6865 = cljs.core._count.call(null,cicoll);
var val__6866 = val;
var n__6867 = idx;
while(true){
if((n__6867 < cnt__6865))
{var nval__6868 = f.call(null,val__6866,cljs.core._nth.call(null,cicoll,n__6867));
if(cljs.core.reduced_QMARK_.call(null,nval__6868))
{return cljs.core.deref.call(null,nval__6868);
} else
{{
var G__6873 = nval__6868;
var G__6874 = (n__6867 + 1);
val__6866 = G__6873;
n__6867 = G__6874;
continue;
}
}
} else
{return val__6866;
}
break;
}
});
ci_reduce = function(cicoll,f,val,idx){
switch(arguments.length){
case 2:
return ci_reduce__2.call(this,cicoll,f);
case 3:
return ci_reduce__3.call(this,cicoll,f,val);
case 4:
return ci_reduce__4.call(this,cicoll,f,val,idx);
}
throw('Invalid arity: ' + arguments.length);
};
ci_reduce.cljs$lang$arity$2 = ci_reduce__2;
ci_reduce.cljs$lang$arity$3 = ci_reduce__3;
ci_reduce.cljs$lang$arity$4 = ci_reduce__4;
return ci_reduce;
})()
;
cljs.core.array_reduce = (function() {
var array_reduce = null;
var array_reduce__2 = (function (arr,f){
var cnt__6887 = arr.length;
if((arr.length === 0))
{return f.call(null);
} else
{var val__6888 = (arr[0]);
var n__6889 = 1;
while(true){
if((n__6889 < cnt__6887))
{var nval__6890 = f.call(null,val__6888,(arr[n__6889]));
if(cljs.core.reduced_QMARK_.call(null,nval__6890))
{return cljs.core.deref.call(null,nval__6890);
} else
{{
var G__6899 = nval__6890;
var G__6900 = (n__6889 + 1);
val__6888 = G__6899;
n__6889 = G__6900;
continue;
}
}
} else
{return val__6888;
}
break;
}
}
});
var array_reduce__3 = (function (arr,f,val){
var cnt__6891 = arr.length;
var val__6892 = val;
var n__6893 = 0;
while(true){
if((n__6893 < cnt__6891))
{var nval__6894 = f.call(null,val__6892,(arr[n__6893]));
if(cljs.core.reduced_QMARK_.call(null,nval__6894))
{return cljs.core.deref.call(null,nval__6894);
} else
{{
var G__6901 = nval__6894;
var G__6902 = (n__6893 + 1);
val__6892 = G__6901;
n__6893 = G__6902;
continue;
}
}
} else
{return val__6892;
}
break;
}
});
var array_reduce__4 = (function (arr,f,val,idx){
var cnt__6895 = arr.length;
var val__6896 = val;
var n__6897 = idx;
while(true){
if((n__6897 < cnt__6895))
{var nval__6898 = f.call(null,val__6896,(arr[n__6897]));
if(cljs.core.reduced_QMARK_.call(null,nval__6898))
{return cljs.core.deref.call(null,nval__6898);
} else
{{
var G__6903 = nval__6898;
var G__6904 = (n__6897 + 1);
val__6896 = G__6903;
n__6897 = G__6904;
continue;
}
}
} else
{return val__6896;
}
break;
}
});
array_reduce = function(arr,f,val,idx){
switch(arguments.length){
case 2:
return array_reduce__2.call(this,arr,f);
case 3:
return array_reduce__3.call(this,arr,f,val);
case 4:
return array_reduce__4.call(this,arr,f,val,idx);
}
throw('Invalid arity: ' + arguments.length);
};
array_reduce.cljs$lang$arity$2 = array_reduce__2;
array_reduce.cljs$lang$arity$3 = array_reduce__3;
array_reduce.cljs$lang$arity$4 = array_reduce__4;
return array_reduce;
})()
;
/**
* Returns true if coll implements count in constant time
*/
cljs.core.counted_QMARK_ = (function counted_QMARK_(x){
var G__6908__6909 = x;
if(G__6908__6909)
{if((function (){var or__3943__auto____6910 = (G__6908__6909.cljs$lang$protocol_mask$partition0$ & 2);
if(or__3943__auto____6910)
{return or__3943__auto____6910;
} else
{return G__6908__6909.cljs$core$ICounted$;
}
})())
{return true;
} else
{if((!G__6908__6909.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ICounted,G__6908__6909);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICounted,G__6908__6909);
}
});
/**
* Returns true if coll implements nth in constant time
*/
cljs.core.indexed_QMARK_ = (function indexed_QMARK_(x){
var G__6914__6915 = x;
if(G__6914__6915)
{if((function (){var or__3943__auto____6916 = (G__6914__6915.cljs$lang$protocol_mask$partition0$ & 16);
if(or__3943__auto____6916)
{return or__3943__auto____6916;
} else
{return G__6914__6915.cljs$core$IIndexed$;
}
})())
{return true;
} else
{if((!G__6914__6915.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__6914__6915);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__6914__6915);
}
});

goog.provide('cljs.core.IndexedSeq');

/**
* @constructor
*/
cljs.core.IndexedSeq = (function (a,i){
this.a = a;
this.i = i;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 166199550;
})
cljs.core.IndexedSeq.cljs$lang$type = true;
cljs.core.IndexedSeq.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/IndexedSeq");
});
cljs.core.IndexedSeq.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/IndexedSeq");
});
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__6917 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$INext$_next$arity$1 = (function (_){
var this__6918 = this;
if(((this__6918.i + 1) < this__6918.a.length))
{return (new cljs.core.IndexedSeq(this__6918.a,(this__6918.i + 1)));
} else
{return null;
}
});
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__6919 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__6920 = this;
var c__6921 = coll.cljs$core$ICounted$_count$arity$1(coll);
if((c__6921 > 0))
{return (new cljs.core.RSeq(coll,(c__6921 - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.IndexedSeq.prototype.toString = (function (){
var this__6922 = this;
var this__6923 = this;
return cljs.core.pr_str.call(null,this__6923);
});
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var this__6924 = this;
if(cljs.core.counted_QMARK_.call(null,this__6924.a))
{return cljs.core.ci_reduce.call(null,this__6924.a,f,(this__6924.a[this__6924.i]),(this__6924.i + 1));
} else
{return cljs.core.ci_reduce.call(null,coll,f,(this__6924.a[this__6924.i]),0);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var this__6925 = this;
if(cljs.core.counted_QMARK_.call(null,this__6925.a))
{return cljs.core.ci_reduce.call(null,this__6925.a,f,start,this__6925.i);
} else
{return cljs.core.ci_reduce.call(null,coll,f,start,0);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__6926 = this;
return this$;
});
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var this__6927 = this;
return (this__6927.a.length - this__6927.i);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (_){
var this__6928 = this;
return (this__6928.a[this__6928.i]);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (_){
var this__6929 = this;
if(((this__6929.i + 1) < this__6929.a.length))
{return (new cljs.core.IndexedSeq(this__6929.a,(this__6929.i + 1)));
} else
{return cljs.core.list.call(null);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__6930 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__6931 = this;
var i__6932 = (n + this__6931.i);
if((i__6932 < this__6931.a.length))
{return (this__6931.a[i__6932]);
} else
{return null;
}
});
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__6933 = this;
var i__6934 = (n + this__6933.i);
if((i__6934 < this__6933.a.length))
{return (this__6933.a[i__6934]);
} else
{return not_found;
}
});
cljs.core.IndexedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__6935 = this;
return cljs.core.List.EMPTY;
});
cljs.core.IndexedSeq;
cljs.core.prim_seq = (function() {
var prim_seq = null;
var prim_seq__1 = (function (prim){
return prim_seq.call(null,prim,0);
});
var prim_seq__2 = (function (prim,i){
if((prim.length === 0))
{return null;
} else
{return (new cljs.core.IndexedSeq(prim,i));
}
});
prim_seq = function(prim,i){
switch(arguments.length){
case 1:
return prim_seq__1.call(this,prim);
case 2:
return prim_seq__2.call(this,prim,i);
}
throw('Invalid arity: ' + arguments.length);
};
prim_seq.cljs$lang$arity$1 = prim_seq__1;
prim_seq.cljs$lang$arity$2 = prim_seq__2;
return prim_seq;
})()
;
cljs.core.array_seq = (function() {
var array_seq = null;
var array_seq__1 = (function (array){
return cljs.core.prim_seq.call(null,array,0);
});
var array_seq__2 = (function (array,i){
return cljs.core.prim_seq.call(null,array,i);
});
array_seq = function(array,i){
switch(arguments.length){
case 1:
return array_seq__1.call(this,array);
case 2:
return array_seq__2.call(this,array,i);
}
throw('Invalid arity: ' + arguments.length);
};
array_seq.cljs$lang$arity$1 = array_seq__1;
array_seq.cljs$lang$arity$2 = array_seq__2;
return array_seq;
})()
;
(cljs.core.IReduce["array"] = true);
(cljs.core._reduce["array"] = (function() {
var G__6936 = null;
var G__6936__2 = (function (array,f){
return cljs.core.ci_reduce.call(null,array,f);
});
var G__6936__3 = (function (array,f,start){
return cljs.core.ci_reduce.call(null,array,f,start);
});
G__6936 = function(array,f,start){
switch(arguments.length){
case 2:
return G__6936__2.call(this,array,f);
case 3:
return G__6936__3.call(this,array,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__6936;
})()
);
(cljs.core.ILookup["array"] = true);
(cljs.core._lookup["array"] = (function() {
var G__6937 = null;
var G__6937__2 = (function (array,k){
return (array[k]);
});
var G__6937__3 = (function (array,k,not_found){
return cljs.core._nth.call(null,array,k,not_found);
});
G__6937 = function(array,k,not_found){
switch(arguments.length){
case 2:
return G__6937__2.call(this,array,k);
case 3:
return G__6937__3.call(this,array,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__6937;
})()
);
(cljs.core.IIndexed["array"] = true);
(cljs.core._nth["array"] = (function() {
var G__6938 = null;
var G__6938__2 = (function (array,n){
if((n < array.length))
{return (array[n]);
} else
{return null;
}
});
var G__6938__3 = (function (array,n,not_found){
if((n < array.length))
{return (array[n]);
} else
{return not_found;
}
});
G__6938 = function(array,n,not_found){
switch(arguments.length){
case 2:
return G__6938__2.call(this,array,n);
case 3:
return G__6938__3.call(this,array,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__6938;
})()
);
(cljs.core.ICounted["array"] = true);
(cljs.core._count["array"] = (function (a){
return a.length;
}));
(cljs.core.ISeqable["array"] = true);
(cljs.core._seq["array"] = (function (array){
return cljs.core.array_seq.call(null,array,0);
}));

goog.provide('cljs.core.RSeq');

/**
* @constructor
*/
cljs.core.RSeq = (function (ci,i,meta){
this.ci = ci;
this.i = i;
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850574;
})
cljs.core.RSeq.cljs$lang$type = true;
cljs.core.RSeq.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/RSeq");
});
cljs.core.RSeq.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/RSeq");
});
cljs.core.RSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__6939 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.RSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__6940 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.RSeq.prototype.toString = (function (){
var this__6941 = this;
var this__6942 = this;
return cljs.core.pr_str.call(null,this__6942);
});
cljs.core.RSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__6943 = this;
return coll;
});
cljs.core.RSeq.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__6944 = this;
return (this__6944.i + 1);
});
cljs.core.RSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__6945 = this;
return cljs.core._nth.call(null,this__6945.ci,this__6945.i);
});
cljs.core.RSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__6946 = this;
if((this__6946.i > 0))
{return (new cljs.core.RSeq(this__6946.ci,(this__6946.i - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.RSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__6947 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.RSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,new_meta){
var this__6948 = this;
return (new cljs.core.RSeq(this__6948.ci,this__6948.i,new_meta));
});
cljs.core.RSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__6949 = this;
return this__6949.meta;
});
cljs.core.RSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__6950 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__6950.meta);
});
cljs.core.RSeq;
/**
* Same as (first (next x))
*/
cljs.core.second = (function second(coll){
return cljs.core.first.call(null,cljs.core.next.call(null,coll));
});
/**
* Same as (first (first x))
*/
cljs.core.ffirst = (function ffirst(coll){
return cljs.core.first.call(null,cljs.core.first.call(null,coll));
});
/**
* Same as (next (first x))
*/
cljs.core.nfirst = (function nfirst(coll){
return cljs.core.next.call(null,cljs.core.first.call(null,coll));
});
/**
* Same as (first (next x))
*/
cljs.core.fnext = (function fnext(coll){
return cljs.core.first.call(null,cljs.core.next.call(null,coll));
});
/**
* Same as (next (next x))
*/
cljs.core.nnext = (function nnext(coll){
return cljs.core.next.call(null,cljs.core.next.call(null,coll));
});
/**
* Return the last item in coll, in linear time
*/
cljs.core.last = (function last(s){
while(true){
var sn__6952 = cljs.core.next.call(null,s);
if(!((sn__6952 == null)))
{{
var G__6953 = sn__6952;
s = G__6953;
continue;
}
} else
{return cljs.core.first.call(null,s);
}
break;
}
});
(cljs.core.IEquiv["_"] = true);
(cljs.core._equiv["_"] = (function (x,o){
return (x === o);
}));
/**
* conj[oin]. Returns a new collection with the xs
* 'added'. (conj nil item) returns (item).  The 'addition' may
* happen at different 'places' depending on the concrete type.
* @param {...*} var_args
*/
cljs.core.conj = (function() {
var conj = null;
var conj__2 = (function (coll,x){
return cljs.core._conj.call(null,coll,x);
});
var conj__3 = (function() { 
var G__6954__delegate = function (coll,x,xs){
while(true){
if(cljs.core.truth_(xs))
{{
var G__6955 = conj.call(null,coll,x);
var G__6956 = cljs.core.first.call(null,xs);
var G__6957 = cljs.core.next.call(null,xs);
coll = G__6955;
x = G__6956;
xs = G__6957;
continue;
}
} else
{return conj.call(null,coll,x);
}
break;
}
};
var G__6954 = function (coll,x,var_args){
var xs = null;
if (goog.isDef(var_args)) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__6954__delegate.call(this, coll, x, xs);
};
G__6954.cljs$lang$maxFixedArity = 2;
G__6954.cljs$lang$applyTo = (function (arglist__6958){
var coll = cljs.core.first(arglist__6958);
var x = cljs.core.first(cljs.core.next(arglist__6958));
var xs = cljs.core.rest(cljs.core.next(arglist__6958));
return G__6954__delegate(coll, x, xs);
});
G__6954.cljs$lang$arity$variadic = G__6954__delegate;
return G__6954;
})()
;
conj = function(coll,x,var_args){
var xs = var_args;
switch(arguments.length){
case 2:
return conj__2.call(this,coll,x);
default:
return conj__3.cljs$lang$arity$variadic(coll,x, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
conj.cljs$lang$maxFixedArity = 2;
conj.cljs$lang$applyTo = conj__3.cljs$lang$applyTo;
conj.cljs$lang$arity$2 = conj__2;
conj.cljs$lang$arity$variadic = conj__3.cljs$lang$arity$variadic;
return conj;
})()
;
/**
* Returns an empty collection of the same category as coll, or nil
*/
cljs.core.empty = (function empty(coll){
return cljs.core._empty.call(null,coll);
});
cljs.core.accumulating_seq_count = (function accumulating_seq_count(coll){
var s__6961 = cljs.core.seq.call(null,coll);
var acc__6962 = 0;
while(true){
if(cljs.core.counted_QMARK_.call(null,s__6961))
{return (acc__6962 + cljs.core._count.call(null,s__6961));
} else
{{
var G__6963 = cljs.core.next.call(null,s__6961);
var G__6964 = (acc__6962 + 1);
s__6961 = G__6963;
acc__6962 = G__6964;
continue;
}
}
break;
}
});
/**
* Returns the number of items in the collection. (count nil) returns
* 0.  Also works on strings, arrays, and Maps
*/
cljs.core.count = (function count(coll){
if(cljs.core.counted_QMARK_.call(null,coll))
{return cljs.core._count.call(null,coll);
} else
{return cljs.core.accumulating_seq_count.call(null,coll);
}
});
cljs.core.linear_traversal_nth = (function() {
var linear_traversal_nth = null;
var linear_traversal_nth__2 = (function (coll,n){
while(true){
if((coll == null))
{throw (new Error("Index out of bounds"));
} else
{if((n === 0))
{if(cljs.core.seq.call(null,coll))
{return cljs.core.first.call(null,coll);
} else
{throw (new Error("Index out of bounds"));
}
} else
{if(cljs.core.indexed_QMARK_.call(null,coll))
{return cljs.core._nth.call(null,coll,n);
} else
{if(cljs.core.seq.call(null,coll))
{{
var G__6965 = cljs.core.next.call(null,coll);
var G__6966 = (n - 1);
coll = G__6965;
n = G__6966;
continue;
}
} else
{if("\uFDD0'else")
{throw (new Error("Index out of bounds"));
} else
{return null;
}
}
}
}
}
break;
}
});
var linear_traversal_nth__3 = (function (coll,n,not_found){
while(true){
if((coll == null))
{return not_found;
} else
{if((n === 0))
{if(cljs.core.seq.call(null,coll))
{return cljs.core.first.call(null,coll);
} else
{return not_found;
}
} else
{if(cljs.core.indexed_QMARK_.call(null,coll))
{return cljs.core._nth.call(null,coll,n,not_found);
} else
{if(cljs.core.seq.call(null,coll))
{{
var G__6967 = cljs.core.next.call(null,coll);
var G__6968 = (n - 1);
var G__6969 = not_found;
coll = G__6967;
n = G__6968;
not_found = G__6969;
continue;
}
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
}
}
break;
}
});
linear_traversal_nth = function(coll,n,not_found){
switch(arguments.length){
case 2:
return linear_traversal_nth__2.call(this,coll,n);
case 3:
return linear_traversal_nth__3.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
linear_traversal_nth.cljs$lang$arity$2 = linear_traversal_nth__2;
linear_traversal_nth.cljs$lang$arity$3 = linear_traversal_nth__3;
return linear_traversal_nth;
})()
;
/**
* Returns the value at the index. get returns nil if index out of
* bounds, nth throws an exception unless not-found is supplied.  nth
* also works for strings, arrays, regex Matchers and Lists, and,
* in O(n) time, for sequences.
*/
cljs.core.nth = (function() {
var nth = null;
var nth__2 = (function (coll,n){
if((coll == null))
{return null;
} else
{if((function (){var G__6976__6977 = coll;
if(G__6976__6977)
{if((function (){var or__3943__auto____6978 = (G__6976__6977.cljs$lang$protocol_mask$partition0$ & 16);
if(or__3943__auto____6978)
{return or__3943__auto____6978;
} else
{return G__6976__6977.cljs$core$IIndexed$;
}
})())
{return true;
} else
{if((!G__6976__6977.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__6976__6977);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__6976__6977);
}
})())
{return cljs.core._nth.call(null,coll,Math.floor(n));
} else
{return cljs.core.linear_traversal_nth.call(null,coll,Math.floor(n));
}
}
});
var nth__3 = (function (coll,n,not_found){
if(!((coll == null)))
{if((function (){var G__6979__6980 = coll;
if(G__6979__6980)
{if((function (){var or__3943__auto____6981 = (G__6979__6980.cljs$lang$protocol_mask$partition0$ & 16);
if(or__3943__auto____6981)
{return or__3943__auto____6981;
} else
{return G__6979__6980.cljs$core$IIndexed$;
}
})())
{return true;
} else
{if((!G__6979__6980.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__6979__6980);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IIndexed,G__6979__6980);
}
})())
{return cljs.core._nth.call(null,coll,Math.floor(n),not_found);
} else
{return cljs.core.linear_traversal_nth.call(null,coll,Math.floor(n),not_found);
}
} else
{return not_found;
}
});
nth = function(coll,n,not_found){
switch(arguments.length){
case 2:
return nth__2.call(this,coll,n);
case 3:
return nth__3.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
nth.cljs$lang$arity$2 = nth__2;
nth.cljs$lang$arity$3 = nth__3;
return nth;
})()
;
/**
* Returns the value mapped to key, not-found or nil if key not present.
*/
cljs.core.get = (function() {
var get = null;
var get__2 = (function (o,k){
return cljs.core._lookup.call(null,o,k);
});
var get__3 = (function (o,k,not_found){
return cljs.core._lookup.call(null,o,k,not_found);
});
get = function(o,k,not_found){
switch(arguments.length){
case 2:
return get__2.call(this,o,k);
case 3:
return get__3.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
get.cljs$lang$arity$2 = get__2;
get.cljs$lang$arity$3 = get__3;
return get;
})()
;
/**
* assoc[iate]. When applied to a map, returns a new map of the
* same (hashed/sorted) type, that contains the mapping of key(s) to
* val(s). When applied to a vector, returns a new vector that
* contains val at index.
* @param {...*} var_args
*/
cljs.core.assoc = (function() {
var assoc = null;
var assoc__3 = (function (coll,k,v){
return cljs.core._assoc.call(null,coll,k,v);
});
var assoc__4 = (function() { 
var G__6984__delegate = function (coll,k,v,kvs){
while(true){
var ret__6983 = assoc.call(null,coll,k,v);
if(cljs.core.truth_(kvs))
{{
var G__6985 = ret__6983;
var G__6986 = cljs.core.first.call(null,kvs);
var G__6987 = cljs.core.second.call(null,kvs);
var G__6988 = cljs.core.nnext.call(null,kvs);
coll = G__6985;
k = G__6986;
v = G__6987;
kvs = G__6988;
continue;
}
} else
{return ret__6983;
}
break;
}
};
var G__6984 = function (coll,k,v,var_args){
var kvs = null;
if (goog.isDef(var_args)) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__6984__delegate.call(this, coll, k, v, kvs);
};
G__6984.cljs$lang$maxFixedArity = 3;
G__6984.cljs$lang$applyTo = (function (arglist__6989){
var coll = cljs.core.first(arglist__6989);
var k = cljs.core.first(cljs.core.next(arglist__6989));
var v = cljs.core.first(cljs.core.next(cljs.core.next(arglist__6989)));
var kvs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__6989)));
return G__6984__delegate(coll, k, v, kvs);
});
G__6984.cljs$lang$arity$variadic = G__6984__delegate;
return G__6984;
})()
;
assoc = function(coll,k,v,var_args){
var kvs = var_args;
switch(arguments.length){
case 3:
return assoc__3.call(this,coll,k,v);
default:
return assoc__4.cljs$lang$arity$variadic(coll,k,v, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
assoc.cljs$lang$maxFixedArity = 3;
assoc.cljs$lang$applyTo = assoc__4.cljs$lang$applyTo;
assoc.cljs$lang$arity$3 = assoc__3;
assoc.cljs$lang$arity$variadic = assoc__4.cljs$lang$arity$variadic;
return assoc;
})()
;
/**
* dissoc[iate]. Returns a new map of the same (hashed/sorted) type,
* that does not contain a mapping for key(s).
* @param {...*} var_args
*/
cljs.core.dissoc = (function() {
var dissoc = null;
var dissoc__1 = (function (coll){
return coll;
});
var dissoc__2 = (function (coll,k){
return cljs.core._dissoc.call(null,coll,k);
});
var dissoc__3 = (function() { 
var G__6992__delegate = function (coll,k,ks){
while(true){
var ret__6991 = dissoc.call(null,coll,k);
if(cljs.core.truth_(ks))
{{
var G__6993 = ret__6991;
var G__6994 = cljs.core.first.call(null,ks);
var G__6995 = cljs.core.next.call(null,ks);
coll = G__6993;
k = G__6994;
ks = G__6995;
continue;
}
} else
{return ret__6991;
}
break;
}
};
var G__6992 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__6992__delegate.call(this, coll, k, ks);
};
G__6992.cljs$lang$maxFixedArity = 2;
G__6992.cljs$lang$applyTo = (function (arglist__6996){
var coll = cljs.core.first(arglist__6996);
var k = cljs.core.first(cljs.core.next(arglist__6996));
var ks = cljs.core.rest(cljs.core.next(arglist__6996));
return G__6992__delegate(coll, k, ks);
});
G__6992.cljs$lang$arity$variadic = G__6992__delegate;
return G__6992;
})()
;
dissoc = function(coll,k,var_args){
var ks = var_args;
switch(arguments.length){
case 1:
return dissoc__1.call(this,coll);
case 2:
return dissoc__2.call(this,coll,k);
default:
return dissoc__3.cljs$lang$arity$variadic(coll,k, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
dissoc.cljs$lang$maxFixedArity = 2;
dissoc.cljs$lang$applyTo = dissoc__3.cljs$lang$applyTo;
dissoc.cljs$lang$arity$1 = dissoc__1;
dissoc.cljs$lang$arity$2 = dissoc__2;
dissoc.cljs$lang$arity$variadic = dissoc__3.cljs$lang$arity$variadic;
return dissoc;
})()
;
/**
* Returns an object of the same type and value as obj, with
* map m as its metadata.
*/
cljs.core.with_meta = (function with_meta(o,meta){
return cljs.core._with_meta.call(null,o,meta);
});
/**
* Returns the metadata of obj, returns nil if there is no metadata.
*/
cljs.core.meta = (function meta(o){
if((function (){var G__7000__7001 = o;
if(G__7000__7001)
{if((function (){var or__3943__auto____7002 = (G__7000__7001.cljs$lang$protocol_mask$partition0$ & 131072);
if(or__3943__auto____7002)
{return or__3943__auto____7002;
} else
{return G__7000__7001.cljs$core$IMeta$;
}
})())
{return true;
} else
{if((!G__7000__7001.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__7000__7001);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__7000__7001);
}
})())
{return cljs.core._meta.call(null,o);
} else
{return null;
}
});
/**
* For a list or queue, same as first, for a vector, same as, but much
* more efficient than, last. If the collection is empty, returns nil.
*/
cljs.core.peek = (function peek(coll){
return cljs.core._peek.call(null,coll);
});
/**
* For a list or queue, returns a new list/queue without the first
* item, for a vector, returns a new vector without the last item.
* Note - not the same as next/butlast.
*/
cljs.core.pop = (function pop(coll){
return cljs.core._pop.call(null,coll);
});
/**
* disj[oin]. Returns a new set of the same (hashed/sorted) type, that
* does not contain key(s).
* @param {...*} var_args
*/
cljs.core.disj = (function() {
var disj = null;
var disj__1 = (function (coll){
return coll;
});
var disj__2 = (function (coll,k){
return cljs.core._disjoin.call(null,coll,k);
});
var disj__3 = (function() { 
var G__7005__delegate = function (coll,k,ks){
while(true){
var ret__7004 = disj.call(null,coll,k);
if(cljs.core.truth_(ks))
{{
var G__7006 = ret__7004;
var G__7007 = cljs.core.first.call(null,ks);
var G__7008 = cljs.core.next.call(null,ks);
coll = G__7006;
k = G__7007;
ks = G__7008;
continue;
}
} else
{return ret__7004;
}
break;
}
};
var G__7005 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7005__delegate.call(this, coll, k, ks);
};
G__7005.cljs$lang$maxFixedArity = 2;
G__7005.cljs$lang$applyTo = (function (arglist__7009){
var coll = cljs.core.first(arglist__7009);
var k = cljs.core.first(cljs.core.next(arglist__7009));
var ks = cljs.core.rest(cljs.core.next(arglist__7009));
return G__7005__delegate(coll, k, ks);
});
G__7005.cljs$lang$arity$variadic = G__7005__delegate;
return G__7005;
})()
;
disj = function(coll,k,var_args){
var ks = var_args;
switch(arguments.length){
case 1:
return disj__1.call(this,coll);
case 2:
return disj__2.call(this,coll,k);
default:
return disj__3.cljs$lang$arity$variadic(coll,k, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
disj.cljs$lang$maxFixedArity = 2;
disj.cljs$lang$applyTo = disj__3.cljs$lang$applyTo;
disj.cljs$lang$arity$1 = disj__1;
disj.cljs$lang$arity$2 = disj__2;
disj.cljs$lang$arity$variadic = disj__3.cljs$lang$arity$variadic;
return disj;
})()
;
cljs.core.string_hash_cache = {};
cljs.core.string_hash_cache_count = 0;
cljs.core.add_to_string_hash_cache = (function add_to_string_hash_cache(k){
var h__7011 = goog.string.hashCode(k);
(cljs.core.string_hash_cache[k] = h__7011);
cljs.core.string_hash_cache_count = (cljs.core.string_hash_cache_count + 1);
return h__7011;
});
cljs.core.check_string_hash_cache = (function check_string_hash_cache(k){
if((cljs.core.string_hash_cache_count > 255))
{cljs.core.string_hash_cache = {};
cljs.core.string_hash_cache_count = 0;
} else
{}
var h__7013 = (cljs.core.string_hash_cache[k]);
if(!((h__7013 == null)))
{return h__7013;
} else
{return cljs.core.add_to_string_hash_cache.call(null,k);
}
});
cljs.core.hash = (function() {
var hash = null;
var hash__1 = (function (o){
return hash.call(null,o,true);
});
var hash__2 = (function (o,check_cache){
if((function (){var and__3941__auto____7015 = goog.isString(o);
if(and__3941__auto____7015)
{return check_cache;
} else
{return and__3941__auto____7015;
}
})())
{return cljs.core.check_string_hash_cache.call(null,o);
} else
{return cljs.core._hash.call(null,o);
}
});
hash = function(o,check_cache){
switch(arguments.length){
case 1:
return hash__1.call(this,o);
case 2:
return hash__2.call(this,o,check_cache);
}
throw('Invalid arity: ' + arguments.length);
};
hash.cljs$lang$arity$1 = hash__1;
hash.cljs$lang$arity$2 = hash__2;
return hash;
})()
;
/**
* Returns true if coll has no items - same as (not (seq coll)).
* Please use the idiom (seq x) rather than (not (empty? x))
*/
cljs.core.empty_QMARK_ = (function empty_QMARK_(coll){
return cljs.core.not.call(null,cljs.core.seq.call(null,coll));
});
/**
* Returns true if x satisfies ICollection
*/
cljs.core.coll_QMARK_ = (function coll_QMARK_(x){
if((x == null))
{return false;
} else
{var G__7019__7020 = x;
if(G__7019__7020)
{if((function (){var or__3943__auto____7021 = (G__7019__7020.cljs$lang$protocol_mask$partition0$ & 8);
if(or__3943__auto____7021)
{return or__3943__auto____7021;
} else
{return G__7019__7020.cljs$core$ICollection$;
}
})())
{return true;
} else
{if((!G__7019__7020.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,G__7019__7020);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,G__7019__7020);
}
}
});
/**
* Returns true if x satisfies ISet
*/
cljs.core.set_QMARK_ = (function set_QMARK_(x){
if((x == null))
{return false;
} else
{var G__7025__7026 = x;
if(G__7025__7026)
{if((function (){var or__3943__auto____7027 = (G__7025__7026.cljs$lang$protocol_mask$partition0$ & 4096);
if(or__3943__auto____7027)
{return or__3943__auto____7027;
} else
{return G__7025__7026.cljs$core$ISet$;
}
})())
{return true;
} else
{if((!G__7025__7026.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,G__7025__7026);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,G__7025__7026);
}
}
});
/**
* Returns true if coll implements Associative
*/
cljs.core.associative_QMARK_ = (function associative_QMARK_(x){
var G__7031__7032 = x;
if(G__7031__7032)
{if((function (){var or__3943__auto____7033 = (G__7031__7032.cljs$lang$protocol_mask$partition0$ & 512);
if(or__3943__auto____7033)
{return or__3943__auto____7033;
} else
{return G__7031__7032.cljs$core$IAssociative$;
}
})())
{return true;
} else
{if((!G__7031__7032.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IAssociative,G__7031__7032);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IAssociative,G__7031__7032);
}
});
/**
* Returns true if coll satisfies ISequential
*/
cljs.core.sequential_QMARK_ = (function sequential_QMARK_(x){
var G__7037__7038 = x;
if(G__7037__7038)
{if((function (){var or__3943__auto____7039 = (G__7037__7038.cljs$lang$protocol_mask$partition0$ & 16777216);
if(or__3943__auto____7039)
{return or__3943__auto____7039;
} else
{return G__7037__7038.cljs$core$ISequential$;
}
})())
{return true;
} else
{if((!G__7037__7038.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISequential,G__7037__7038);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISequential,G__7037__7038);
}
});
/**
* Returns true if coll satisfies IReduce
*/
cljs.core.reduceable_QMARK_ = (function reduceable_QMARK_(x){
var G__7043__7044 = x;
if(G__7043__7044)
{if((function (){var or__3943__auto____7045 = (G__7043__7044.cljs$lang$protocol_mask$partition0$ & 524288);
if(or__3943__auto____7045)
{return or__3943__auto____7045;
} else
{return G__7043__7044.cljs$core$IReduce$;
}
})())
{return true;
} else
{if((!G__7043__7044.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7043__7044);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7043__7044);
}
});
/**
* Return true if x satisfies IMap
*/
cljs.core.map_QMARK_ = (function map_QMARK_(x){
if((x == null))
{return false;
} else
{var G__7049__7050 = x;
if(G__7049__7050)
{if((function (){var or__3943__auto____7051 = (G__7049__7050.cljs$lang$protocol_mask$partition0$ & 1024);
if(or__3943__auto____7051)
{return or__3943__auto____7051;
} else
{return G__7049__7050.cljs$core$IMap$;
}
})())
{return true;
} else
{if((!G__7049__7050.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,G__7049__7050);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,G__7049__7050);
}
}
});
/**
* Return true if x satisfies IVector
*/
cljs.core.vector_QMARK_ = (function vector_QMARK_(x){
var G__7055__7056 = x;
if(G__7055__7056)
{if((function (){var or__3943__auto____7057 = (G__7055__7056.cljs$lang$protocol_mask$partition0$ & 16384);
if(or__3943__auto____7057)
{return or__3943__auto____7057;
} else
{return G__7055__7056.cljs$core$IVector$;
}
})())
{return true;
} else
{if((!G__7055__7056.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,G__7055__7056);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,G__7055__7056);
}
});
cljs.core.chunked_seq_QMARK_ = (function chunked_seq_QMARK_(x){
var G__7061__7062 = x;
if(G__7061__7062)
{if((function (){var or__3943__auto____7063 = (G__7061__7062.cljs$lang$protocol_mask$partition1$ & 512);
if(or__3943__auto____7063)
{return or__3943__auto____7063;
} else
{return G__7061__7062.cljs$core$IChunkedSeq$;
}
})())
{return true;
} else
{if((!G__7061__7062.cljs$lang$protocol_mask$partition1$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedSeq,G__7061__7062);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedSeq,G__7061__7062);
}
});
/**
* @param {...*} var_args
*/
cljs.core.js_obj = (function() {
var js_obj = null;
var js_obj__0 = (function (){
return {};
});
var js_obj__1 = (function() { 
var G__7064__delegate = function (keyvals){
return cljs.core.apply.call(null,goog.object.create,keyvals);
};
var G__7064 = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7064__delegate.call(this, keyvals);
};
G__7064.cljs$lang$maxFixedArity = 0;
G__7064.cljs$lang$applyTo = (function (arglist__7065){
var keyvals = cljs.core.seq(arglist__7065);;
return G__7064__delegate(keyvals);
});
G__7064.cljs$lang$arity$variadic = G__7064__delegate;
return G__7064;
})()
;
js_obj = function(var_args){
var keyvals = var_args;
switch(arguments.length){
case 0:
return js_obj__0.call(this);
default:
return js_obj__1.cljs$lang$arity$variadic(cljs.core.array_seq(arguments, 0));
}
throw('Invalid arity: ' + arguments.length);
};
js_obj.cljs$lang$maxFixedArity = 0;
js_obj.cljs$lang$applyTo = js_obj__1.cljs$lang$applyTo;
js_obj.cljs$lang$arity$0 = js_obj__0;
js_obj.cljs$lang$arity$variadic = js_obj__1.cljs$lang$arity$variadic;
return js_obj;
})()
;
cljs.core.js_keys = (function js_keys(obj){
var keys__7067 = [];
goog.object.forEach(obj,(function (val,key,obj){
return keys__7067.push(key);
}));
return keys__7067;
});
cljs.core.js_delete = (function js_delete(obj,key){
return delete obj[key];
});
cljs.core.array_copy = (function array_copy(from,i,to,j,len){
var i__7071 = i;
var j__7072 = j;
var len__7073 = len;
while(true){
if((len__7073 === 0))
{return to;
} else
{(to[j__7072] = (from[i__7071]));
{
var G__7074 = (i__7071 + 1);
var G__7075 = (j__7072 + 1);
var G__7076 = (len__7073 - 1);
i__7071 = G__7074;
j__7072 = G__7075;
len__7073 = G__7076;
continue;
}
}
break;
}
});
cljs.core.array_copy_downward = (function array_copy_downward(from,i,to,j,len){
var i__7080 = (i + (len - 1));
var j__7081 = (j + (len - 1));
var len__7082 = len;
while(true){
if((len__7082 === 0))
{return to;
} else
{(to[j__7081] = (from[i__7080]));
{
var G__7083 = (i__7080 - 1);
var G__7084 = (j__7081 - 1);
var G__7085 = (len__7082 - 1);
i__7080 = G__7083;
j__7081 = G__7084;
len__7082 = G__7085;
continue;
}
}
break;
}
});
cljs.core.lookup_sentinel = {};
/**
* Returns true if x is the value false, false otherwise.
*/
cljs.core.false_QMARK_ = (function false_QMARK_(x){
return x === false;
});
/**
* Returns true if x is the value true, false otherwise.
*/
cljs.core.true_QMARK_ = (function true_QMARK_(x){
return x === true;
});
cljs.core.undefined_QMARK_ = (function undefined_QMARK_(x){
return (void 0 === x);
});
/**
* Return true if s satisfies ISeq
*/
cljs.core.seq_QMARK_ = (function seq_QMARK_(s){
if((s == null))
{return false;
} else
{var G__7089__7090 = s;
if(G__7089__7090)
{if((function (){var or__3943__auto____7091 = (G__7089__7090.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3943__auto____7091)
{return or__3943__auto____7091;
} else
{return G__7089__7090.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__7089__7090.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7089__7090);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7089__7090);
}
}
});
/**
* Return true if s satisfies ISeqable
*/
cljs.core.seqable_QMARK_ = (function seqable_QMARK_(s){
var G__7095__7096 = s;
if(G__7095__7096)
{if((function (){var or__3943__auto____7097 = (G__7095__7096.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto____7097)
{return or__3943__auto____7097;
} else
{return G__7095__7096.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__7095__7096.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__7095__7096);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__7095__7096);
}
});
cljs.core.boolean$ = (function boolean$(x){
if(cljs.core.truth_(x))
{return true;
} else
{return false;
}
});
cljs.core.string_QMARK_ = (function string_QMARK_(x){
var and__3941__auto____7100 = goog.isString(x);
if(and__3941__auto____7100)
{return !((function (){var or__3943__auto____7101 = (x.charAt(0) === "\uFDD0");
if(or__3943__auto____7101)
{return or__3943__auto____7101;
} else
{return (x.charAt(0) === "\uFDD1");
}
})());
} else
{return and__3941__auto____7100;
}
});
cljs.core.keyword_QMARK_ = (function keyword_QMARK_(x){
var and__3941__auto____7103 = goog.isString(x);
if(and__3941__auto____7103)
{return (x.charAt(0) === "\uFDD0");
} else
{return and__3941__auto____7103;
}
});
cljs.core.symbol_QMARK_ = (function symbol_QMARK_(x){
var and__3941__auto____7105 = goog.isString(x);
if(and__3941__auto____7105)
{return (x.charAt(0) === "\uFDD1");
} else
{return and__3941__auto____7105;
}
});
cljs.core.number_QMARK_ = (function number_QMARK_(n){
return goog.isNumber(n);
});
cljs.core.fn_QMARK_ = (function fn_QMARK_(f){
return goog.isFunction(f);
});
cljs.core.ifn_QMARK_ = (function ifn_QMARK_(f){
var or__3943__auto____7110 = cljs.core.fn_QMARK_.call(null,f);
if(or__3943__auto____7110)
{return or__3943__auto____7110;
} else
{var G__7111__7112 = f;
if(G__7111__7112)
{if((function (){var or__3943__auto____7113 = (G__7111__7112.cljs$lang$protocol_mask$partition0$ & 1);
if(or__3943__auto____7113)
{return or__3943__auto____7113;
} else
{return G__7111__7112.cljs$core$IFn$;
}
})())
{return true;
} else
{if((!G__7111__7112.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IFn,G__7111__7112);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IFn,G__7111__7112);
}
}
});
/**
* Returns true if n is an integer.
*/
cljs.core.integer_QMARK_ = (function integer_QMARK_(n){
var and__3941__auto____7117 = cljs.core.number_QMARK_.call(null,n);
if(and__3941__auto____7117)
{var and__3941__auto____7118 = !(isNaN(n));
if(and__3941__auto____7118)
{var and__3941__auto____7119 = !((n === Infinity));
if(and__3941__auto____7119)
{return (parseFloat(n) === parseInt(n,10));
} else
{return and__3941__auto____7119;
}
} else
{return and__3941__auto____7118;
}
} else
{return and__3941__auto____7117;
}
});
/**
* Returns true if key is present in the given collection, otherwise
* returns false.  Note that for numerically indexed collections like
* vectors and arrays, this tests if the numeric key is within the
* range of indexes. 'contains?' operates constant or logarithmic time;
* it will not perform a linear search for a value.  See also 'some'.
*/
cljs.core.contains_QMARK_ = (function contains_QMARK_(coll,v){
if((cljs.core._lookup.call(null,coll,v,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return false;
} else
{return true;
}
});
/**
* Returns the map entry for key, or nil if key not present.
*/
cljs.core.find = (function find(coll,k){
if((function (){var and__3941__auto____7122 = !((coll == null));
if(and__3941__auto____7122)
{var and__3941__auto____7123 = cljs.core.associative_QMARK_.call(null,coll);
if(and__3941__auto____7123)
{return cljs.core.contains_QMARK_.call(null,coll,k);
} else
{return and__3941__auto____7123;
}
} else
{return and__3941__auto____7122;
}
})())
{return cljs.core.PersistentVector.fromArray([k,cljs.core._lookup.call(null,coll,k)], true);
} else
{return null;
}
});
/**
* Returns true if no two of the arguments are =
* @param {...*} var_args
*/
cljs.core.distinct_QMARK_ = (function() {
var distinct_QMARK_ = null;
var distinct_QMARK___1 = (function (x){
return true;
});
var distinct_QMARK___2 = (function (x,y){
return !(cljs.core._EQ_.call(null,x,y));
});
var distinct_QMARK___3 = (function() { 
var G__7132__delegate = function (x,y,more){
if(!(cljs.core._EQ_.call(null,x,y)))
{var s__7128 = cljs.core.PersistentHashSet.fromArray([y,x]);
var xs__7129 = more;
while(true){
var x__7130 = cljs.core.first.call(null,xs__7129);
var etc__7131 = cljs.core.next.call(null,xs__7129);
if(cljs.core.truth_(xs__7129))
{if(cljs.core.contains_QMARK_.call(null,s__7128,x__7130))
{return false;
} else
{{
var G__7133 = cljs.core.conj.call(null,s__7128,x__7130);
var G__7134 = etc__7131;
s__7128 = G__7133;
xs__7129 = G__7134;
continue;
}
}
} else
{return true;
}
break;
}
} else
{return false;
}
};
var G__7132 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7132__delegate.call(this, x, y, more);
};
G__7132.cljs$lang$maxFixedArity = 2;
G__7132.cljs$lang$applyTo = (function (arglist__7135){
var x = cljs.core.first(arglist__7135);
var y = cljs.core.first(cljs.core.next(arglist__7135));
var more = cljs.core.rest(cljs.core.next(arglist__7135));
return G__7132__delegate(x, y, more);
});
G__7132.cljs$lang$arity$variadic = G__7132__delegate;
return G__7132;
})()
;
distinct_QMARK_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return distinct_QMARK___1.call(this,x);
case 2:
return distinct_QMARK___2.call(this,x,y);
default:
return distinct_QMARK___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
distinct_QMARK_.cljs$lang$maxFixedArity = 2;
distinct_QMARK_.cljs$lang$applyTo = distinct_QMARK___3.cljs$lang$applyTo;
distinct_QMARK_.cljs$lang$arity$1 = distinct_QMARK___1;
distinct_QMARK_.cljs$lang$arity$2 = distinct_QMARK___2;
distinct_QMARK_.cljs$lang$arity$variadic = distinct_QMARK___3.cljs$lang$arity$variadic;
return distinct_QMARK_;
})()
;
/**
* Comparator. Returns a negative number, zero, or a positive number
* when x is logically 'less than', 'equal to', or 'greater than'
* y. Uses IComparable if available and google.array.defaultCompare for objects
* of the same type and special-cases nil to be less than any other object.
*/
cljs.core.compare = (function compare(x,y){
if((x === y))
{return 0;
} else
{if((x == null))
{return -1;
} else
{if((y == null))
{return 1;
} else
{if((cljs.core.type.call(null,x) === cljs.core.type.call(null,y)))
{if((function (){var G__7139__7140 = x;
if(G__7139__7140)
{if((function (){var or__3943__auto____7141 = (G__7139__7140.cljs$lang$protocol_mask$partition1$ & 2048);
if(or__3943__auto____7141)
{return or__3943__auto____7141;
} else
{return G__7139__7140.cljs$core$IComparable$;
}
})())
{return true;
} else
{if((!G__7139__7140.cljs$lang$protocol_mask$partition1$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IComparable,G__7139__7140);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IComparable,G__7139__7140);
}
})())
{return cljs.core._compare.call(null,x,y);
} else
{return goog.array.defaultCompare(x,y);
}
} else
{if("\uFDD0'else")
{throw (new Error("compare on non-nil objects of different types"));
} else
{return null;
}
}
}
}
}
});
/**
* Compare indexed collection.
*/
cljs.core.compare_indexed = (function() {
var compare_indexed = null;
var compare_indexed__2 = (function (xs,ys){
var xl__7146 = cljs.core.count.call(null,xs);
var yl__7147 = cljs.core.count.call(null,ys);
if((xl__7146 < yl__7147))
{return -1;
} else
{if((xl__7146 > yl__7147))
{return 1;
} else
{if("\uFDD0'else")
{return compare_indexed.call(null,xs,ys,xl__7146,0);
} else
{return null;
}
}
}
});
var compare_indexed__4 = (function (xs,ys,len,n){
while(true){
var d__7148 = cljs.core.compare.call(null,cljs.core.nth.call(null,xs,n),cljs.core.nth.call(null,ys,n));
if((function (){var and__3941__auto____7149 = (d__7148 === 0);
if(and__3941__auto____7149)
{return ((n + 1) < len);
} else
{return and__3941__auto____7149;
}
})())
{{
var G__7150 = xs;
var G__7151 = ys;
var G__7152 = len;
var G__7153 = (n + 1);
xs = G__7150;
ys = G__7151;
len = G__7152;
n = G__7153;
continue;
}
} else
{return d__7148;
}
break;
}
});
compare_indexed = function(xs,ys,len,n){
switch(arguments.length){
case 2:
return compare_indexed__2.call(this,xs,ys);
case 4:
return compare_indexed__4.call(this,xs,ys,len,n);
}
throw('Invalid arity: ' + arguments.length);
};
compare_indexed.cljs$lang$arity$2 = compare_indexed__2;
compare_indexed.cljs$lang$arity$4 = compare_indexed__4;
return compare_indexed;
})()
;
/**
* Given a fn that might be boolean valued or a comparator,
* return a fn that is a comparator.
*/
cljs.core.fn__GT_comparator = (function fn__GT_comparator(f){
if(cljs.core._EQ_.call(null,f,cljs.core.compare))
{return cljs.core.compare;
} else
{return (function (x,y){
var r__7155 = f.call(null,x,y);
if(cljs.core.number_QMARK_.call(null,r__7155))
{return r__7155;
} else
{if(cljs.core.truth_(r__7155))
{return -1;
} else
{if(cljs.core.truth_(f.call(null,y,x)))
{return 1;
} else
{return 0;
}
}
}
});
}
});
/**
* Returns a sorted sequence of the items in coll. Comp can be
* boolean-valued comparison funcion, or a -/0/+ valued comparator.
* Comp defaults to compare.
*/
cljs.core.sort = (function() {
var sort = null;
var sort__1 = (function (coll){
return sort.call(null,cljs.core.compare,coll);
});
var sort__2 = (function (comp,coll){
if(cljs.core.seq.call(null,coll))
{var a__7157 = cljs.core.to_array.call(null,coll);
goog.array.stableSort(a__7157,cljs.core.fn__GT_comparator.call(null,comp));
return cljs.core.seq.call(null,a__7157);
} else
{return cljs.core.List.EMPTY;
}
});
sort = function(comp,coll){
switch(arguments.length){
case 1:
return sort__1.call(this,comp);
case 2:
return sort__2.call(this,comp,coll);
}
throw('Invalid arity: ' + arguments.length);
};
sort.cljs$lang$arity$1 = sort__1;
sort.cljs$lang$arity$2 = sort__2;
return sort;
})()
;
/**
* Returns a sorted sequence of the items in coll, where the sort
* order is determined by comparing (keyfn item).  Comp can be
* boolean-valued comparison funcion, or a -/0/+ valued comparator.
* Comp defaults to compare.
*/
cljs.core.sort_by = (function() {
var sort_by = null;
var sort_by__2 = (function (keyfn,coll){
return sort_by.call(null,keyfn,cljs.core.compare,coll);
});
var sort_by__3 = (function (keyfn,comp,coll){
return cljs.core.sort.call(null,(function (x,y){
return cljs.core.fn__GT_comparator.call(null,comp).call(null,keyfn.call(null,x),keyfn.call(null,y));
}),coll);
});
sort_by = function(keyfn,comp,coll){
switch(arguments.length){
case 2:
return sort_by__2.call(this,keyfn,comp);
case 3:
return sort_by__3.call(this,keyfn,comp,coll);
}
throw('Invalid arity: ' + arguments.length);
};
sort_by.cljs$lang$arity$2 = sort_by__2;
sort_by.cljs$lang$arity$3 = sort_by__3;
return sort_by;
})()
;
cljs.core.seq_reduce = (function() {
var seq_reduce = null;
var seq_reduce__2 = (function (f,coll){
var temp__4090__auto____7163 = cljs.core.seq.call(null,coll);
if(temp__4090__auto____7163)
{var s__7164 = temp__4090__auto____7163;
return cljs.core.reduce.call(null,f,cljs.core.first.call(null,s__7164),cljs.core.next.call(null,s__7164));
} else
{return f.call(null);
}
});
var seq_reduce__3 = (function (f,val,coll){
var val__7165 = val;
var coll__7166 = cljs.core.seq.call(null,coll);
while(true){
if(coll__7166)
{var nval__7167 = f.call(null,val__7165,cljs.core.first.call(null,coll__7166));
if(cljs.core.reduced_QMARK_.call(null,nval__7167))
{return cljs.core.deref.call(null,nval__7167);
} else
{{
var G__7168 = nval__7167;
var G__7169 = cljs.core.next.call(null,coll__7166);
val__7165 = G__7168;
coll__7166 = G__7169;
continue;
}
}
} else
{return val__7165;
}
break;
}
});
seq_reduce = function(f,val,coll){
switch(arguments.length){
case 2:
return seq_reduce__2.call(this,f,val);
case 3:
return seq_reduce__3.call(this,f,val,coll);
}
throw('Invalid arity: ' + arguments.length);
};
seq_reduce.cljs$lang$arity$2 = seq_reduce__2;
seq_reduce.cljs$lang$arity$3 = seq_reduce__3;
return seq_reduce;
})()
;
/**
* Return a random permutation of coll
*/
cljs.core.shuffle = (function shuffle(coll){
var a__7171 = cljs.core.to_array.call(null,coll);
goog.array.shuffle(a__7171);
return cljs.core.vec.call(null,a__7171);
});
/**
* f should be a function of 2 arguments. If val is not supplied,
* returns the result of applying f to the first 2 items in coll, then
* applying f to that result and the 3rd item, etc. If coll contains no
* items, f must accept no arguments as well, and reduce returns the
* result of calling f with no arguments.  If coll has only 1 item, it
* is returned and f is not called.  If val is supplied, returns the
* result of applying f to val and the first item in coll, then
* applying f to that result and the 2nd item, etc. If coll contains no
* items, returns val and f is not called.
*/
cljs.core.reduce = (function() {
var reduce = null;
var reduce__2 = (function (f,coll){
if((function (){var G__7178__7179 = coll;
if(G__7178__7179)
{if((function (){var or__3943__auto____7180 = (G__7178__7179.cljs$lang$protocol_mask$partition0$ & 524288);
if(or__3943__auto____7180)
{return or__3943__auto____7180;
} else
{return G__7178__7179.cljs$core$IReduce$;
}
})())
{return true;
} else
{if((!G__7178__7179.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7178__7179);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7178__7179);
}
})())
{return cljs.core._reduce.call(null,coll,f);
} else
{return cljs.core.seq_reduce.call(null,f,coll);
}
});
var reduce__3 = (function (f,val,coll){
if((function (){var G__7181__7182 = coll;
if(G__7181__7182)
{if((function (){var or__3943__auto____7183 = (G__7181__7182.cljs$lang$protocol_mask$partition0$ & 524288);
if(or__3943__auto____7183)
{return or__3943__auto____7183;
} else
{return G__7181__7182.cljs$core$IReduce$;
}
})())
{return true;
} else
{if((!G__7181__7182.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7181__7182);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReduce,G__7181__7182);
}
})())
{return cljs.core._reduce.call(null,coll,f,val);
} else
{return cljs.core.seq_reduce.call(null,f,val,coll);
}
});
reduce = function(f,val,coll){
switch(arguments.length){
case 2:
return reduce__2.call(this,f,val);
case 3:
return reduce__3.call(this,f,val,coll);
}
throw('Invalid arity: ' + arguments.length);
};
reduce.cljs$lang$arity$2 = reduce__2;
reduce.cljs$lang$arity$3 = reduce__3;
return reduce;
})()
;
/**
* Reduces an associative collection. f should be a function of 3
* arguments. Returns the result of applying f to init, the first key
* and the first value in coll, then applying f to that result and the
* 2nd key and value, etc. If coll contains no entries, returns init
* and f is not called. Note that reduce-kv is supported on vectors,
* where the keys will be the ordinals.
*/
cljs.core.reduce_kv = (function reduce_kv(f,init,coll){
return cljs.core._kv_reduce.call(null,coll,f,init);
});
/**
* Returns the sum of nums. (+) returns 0.
* @param {...*} var_args
*/
cljs.core._PLUS_ = (function() {
var _PLUS_ = null;
var _PLUS___0 = (function (){
return 0;
});
var _PLUS___1 = (function (x){
return x;
});
var _PLUS___2 = (function (x,y){
return (x + y);
});
var _PLUS___3 = (function() { 
var G__7184__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_PLUS_,(x + y),more);
};
var G__7184 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7184__delegate.call(this, x, y, more);
};
G__7184.cljs$lang$maxFixedArity = 2;
G__7184.cljs$lang$applyTo = (function (arglist__7185){
var x = cljs.core.first(arglist__7185);
var y = cljs.core.first(cljs.core.next(arglist__7185));
var more = cljs.core.rest(cljs.core.next(arglist__7185));
return G__7184__delegate(x, y, more);
});
G__7184.cljs$lang$arity$variadic = G__7184__delegate;
return G__7184;
})()
;
_PLUS_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 0:
return _PLUS___0.call(this);
case 1:
return _PLUS___1.call(this,x);
case 2:
return _PLUS___2.call(this,x,y);
default:
return _PLUS___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_PLUS_.cljs$lang$maxFixedArity = 2;
_PLUS_.cljs$lang$applyTo = _PLUS___3.cljs$lang$applyTo;
_PLUS_.cljs$lang$arity$0 = _PLUS___0;
_PLUS_.cljs$lang$arity$1 = _PLUS___1;
_PLUS_.cljs$lang$arity$2 = _PLUS___2;
_PLUS_.cljs$lang$arity$variadic = _PLUS___3.cljs$lang$arity$variadic;
return _PLUS_;
})()
;
/**
* If no ys are supplied, returns the negation of x, else subtracts
* the ys from x and returns the result.
* @param {...*} var_args
*/
cljs.core._ = (function() {
var _ = null;
var ___1 = (function (x){
return (- x);
});
var ___2 = (function (x,y){
return (x - y);
});
var ___3 = (function() { 
var G__7186__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_,(x - y),more);
};
var G__7186 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7186__delegate.call(this, x, y, more);
};
G__7186.cljs$lang$maxFixedArity = 2;
G__7186.cljs$lang$applyTo = (function (arglist__7187){
var x = cljs.core.first(arglist__7187);
var y = cljs.core.first(cljs.core.next(arglist__7187));
var more = cljs.core.rest(cljs.core.next(arglist__7187));
return G__7186__delegate(x, y, more);
});
G__7186.cljs$lang$arity$variadic = G__7186__delegate;
return G__7186;
})()
;
_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return ___1.call(this,x);
case 2:
return ___2.call(this,x,y);
default:
return ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_.cljs$lang$maxFixedArity = 2;
_.cljs$lang$applyTo = ___3.cljs$lang$applyTo;
_.cljs$lang$arity$1 = ___1;
_.cljs$lang$arity$2 = ___2;
_.cljs$lang$arity$variadic = ___3.cljs$lang$arity$variadic;
return _;
})()
;
/**
* Returns the product of nums. (*) returns 1.
* @param {...*} var_args
*/
cljs.core._STAR_ = (function() {
var _STAR_ = null;
var _STAR___0 = (function (){
return 1;
});
var _STAR___1 = (function (x){
return x;
});
var _STAR___2 = (function (x,y){
return (x * y);
});
var _STAR___3 = (function() { 
var G__7188__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_STAR_,(x * y),more);
};
var G__7188 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7188__delegate.call(this, x, y, more);
};
G__7188.cljs$lang$maxFixedArity = 2;
G__7188.cljs$lang$applyTo = (function (arglist__7189){
var x = cljs.core.first(arglist__7189);
var y = cljs.core.first(cljs.core.next(arglist__7189));
var more = cljs.core.rest(cljs.core.next(arglist__7189));
return G__7188__delegate(x, y, more);
});
G__7188.cljs$lang$arity$variadic = G__7188__delegate;
return G__7188;
})()
;
_STAR_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 0:
return _STAR___0.call(this);
case 1:
return _STAR___1.call(this,x);
case 2:
return _STAR___2.call(this,x,y);
default:
return _STAR___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_STAR_.cljs$lang$maxFixedArity = 2;
_STAR_.cljs$lang$applyTo = _STAR___3.cljs$lang$applyTo;
_STAR_.cljs$lang$arity$0 = _STAR___0;
_STAR_.cljs$lang$arity$1 = _STAR___1;
_STAR_.cljs$lang$arity$2 = _STAR___2;
_STAR_.cljs$lang$arity$variadic = _STAR___3.cljs$lang$arity$variadic;
return _STAR_;
})()
;
/**
* If no denominators are supplied, returns 1/numerator,
* else returns numerator divided by all of the denominators.
* @param {...*} var_args
*/
cljs.core._SLASH_ = (function() {
var _SLASH_ = null;
var _SLASH___1 = (function (x){
return _SLASH_.call(null,1,x);
});
var _SLASH___2 = (function (x,y){
return (x / y);
});
var _SLASH___3 = (function() { 
var G__7190__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_SLASH_,_SLASH_.call(null,x,y),more);
};
var G__7190 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7190__delegate.call(this, x, y, more);
};
G__7190.cljs$lang$maxFixedArity = 2;
G__7190.cljs$lang$applyTo = (function (arglist__7191){
var x = cljs.core.first(arglist__7191);
var y = cljs.core.first(cljs.core.next(arglist__7191));
var more = cljs.core.rest(cljs.core.next(arglist__7191));
return G__7190__delegate(x, y, more);
});
G__7190.cljs$lang$arity$variadic = G__7190__delegate;
return G__7190;
})()
;
_SLASH_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _SLASH___1.call(this,x);
case 2:
return _SLASH___2.call(this,x,y);
default:
return _SLASH___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_SLASH_.cljs$lang$maxFixedArity = 2;
_SLASH_.cljs$lang$applyTo = _SLASH___3.cljs$lang$applyTo;
_SLASH_.cljs$lang$arity$1 = _SLASH___1;
_SLASH_.cljs$lang$arity$2 = _SLASH___2;
_SLASH_.cljs$lang$arity$variadic = _SLASH___3.cljs$lang$arity$variadic;
return _SLASH_;
})()
;
/**
* Returns non-nil if nums are in monotonically increasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._LT_ = (function() {
var _LT_ = null;
var _LT___1 = (function (x){
return true;
});
var _LT___2 = (function (x,y){
return (x < y);
});
var _LT___3 = (function() { 
var G__7192__delegate = function (x,y,more){
while(true){
if((x < y))
{if(cljs.core.next.call(null,more))
{{
var G__7193 = y;
var G__7194 = cljs.core.first.call(null,more);
var G__7195 = cljs.core.next.call(null,more);
x = G__7193;
y = G__7194;
more = G__7195;
continue;
}
} else
{return (y < cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__7192 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7192__delegate.call(this, x, y, more);
};
G__7192.cljs$lang$maxFixedArity = 2;
G__7192.cljs$lang$applyTo = (function (arglist__7196){
var x = cljs.core.first(arglist__7196);
var y = cljs.core.first(cljs.core.next(arglist__7196));
var more = cljs.core.rest(cljs.core.next(arglist__7196));
return G__7192__delegate(x, y, more);
});
G__7192.cljs$lang$arity$variadic = G__7192__delegate;
return G__7192;
})()
;
_LT_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _LT___1.call(this,x);
case 2:
return _LT___2.call(this,x,y);
default:
return _LT___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_LT_.cljs$lang$maxFixedArity = 2;
_LT_.cljs$lang$applyTo = _LT___3.cljs$lang$applyTo;
_LT_.cljs$lang$arity$1 = _LT___1;
_LT_.cljs$lang$arity$2 = _LT___2;
_LT_.cljs$lang$arity$variadic = _LT___3.cljs$lang$arity$variadic;
return _LT_;
})()
;
/**
* Returns non-nil if nums are in monotonically non-decreasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._LT__EQ_ = (function() {
var _LT__EQ_ = null;
var _LT__EQ___1 = (function (x){
return true;
});
var _LT__EQ___2 = (function (x,y){
return (x <= y);
});
var _LT__EQ___3 = (function() { 
var G__7197__delegate = function (x,y,more){
while(true){
if((x <= y))
{if(cljs.core.next.call(null,more))
{{
var G__7198 = y;
var G__7199 = cljs.core.first.call(null,more);
var G__7200 = cljs.core.next.call(null,more);
x = G__7198;
y = G__7199;
more = G__7200;
continue;
}
} else
{return (y <= cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__7197 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7197__delegate.call(this, x, y, more);
};
G__7197.cljs$lang$maxFixedArity = 2;
G__7197.cljs$lang$applyTo = (function (arglist__7201){
var x = cljs.core.first(arglist__7201);
var y = cljs.core.first(cljs.core.next(arglist__7201));
var more = cljs.core.rest(cljs.core.next(arglist__7201));
return G__7197__delegate(x, y, more);
});
G__7197.cljs$lang$arity$variadic = G__7197__delegate;
return G__7197;
})()
;
_LT__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _LT__EQ___1.call(this,x);
case 2:
return _LT__EQ___2.call(this,x,y);
default:
return _LT__EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_LT__EQ_.cljs$lang$maxFixedArity = 2;
_LT__EQ_.cljs$lang$applyTo = _LT__EQ___3.cljs$lang$applyTo;
_LT__EQ_.cljs$lang$arity$1 = _LT__EQ___1;
_LT__EQ_.cljs$lang$arity$2 = _LT__EQ___2;
_LT__EQ_.cljs$lang$arity$variadic = _LT__EQ___3.cljs$lang$arity$variadic;
return _LT__EQ_;
})()
;
/**
* Returns non-nil if nums are in monotonically decreasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._GT_ = (function() {
var _GT_ = null;
var _GT___1 = (function (x){
return true;
});
var _GT___2 = (function (x,y){
return (x > y);
});
var _GT___3 = (function() { 
var G__7202__delegate = function (x,y,more){
while(true){
if((x > y))
{if(cljs.core.next.call(null,more))
{{
var G__7203 = y;
var G__7204 = cljs.core.first.call(null,more);
var G__7205 = cljs.core.next.call(null,more);
x = G__7203;
y = G__7204;
more = G__7205;
continue;
}
} else
{return (y > cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__7202 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7202__delegate.call(this, x, y, more);
};
G__7202.cljs$lang$maxFixedArity = 2;
G__7202.cljs$lang$applyTo = (function (arglist__7206){
var x = cljs.core.first(arglist__7206);
var y = cljs.core.first(cljs.core.next(arglist__7206));
var more = cljs.core.rest(cljs.core.next(arglist__7206));
return G__7202__delegate(x, y, more);
});
G__7202.cljs$lang$arity$variadic = G__7202__delegate;
return G__7202;
})()
;
_GT_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _GT___1.call(this,x);
case 2:
return _GT___2.call(this,x,y);
default:
return _GT___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_GT_.cljs$lang$maxFixedArity = 2;
_GT_.cljs$lang$applyTo = _GT___3.cljs$lang$applyTo;
_GT_.cljs$lang$arity$1 = _GT___1;
_GT_.cljs$lang$arity$2 = _GT___2;
_GT_.cljs$lang$arity$variadic = _GT___3.cljs$lang$arity$variadic;
return _GT_;
})()
;
/**
* Returns non-nil if nums are in monotonically non-increasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._GT__EQ_ = (function() {
var _GT__EQ_ = null;
var _GT__EQ___1 = (function (x){
return true;
});
var _GT__EQ___2 = (function (x,y){
return (x >= y);
});
var _GT__EQ___3 = (function() { 
var G__7207__delegate = function (x,y,more){
while(true){
if((x >= y))
{if(cljs.core.next.call(null,more))
{{
var G__7208 = y;
var G__7209 = cljs.core.first.call(null,more);
var G__7210 = cljs.core.next.call(null,more);
x = G__7208;
y = G__7209;
more = G__7210;
continue;
}
} else
{return (y >= cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__7207 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7207__delegate.call(this, x, y, more);
};
G__7207.cljs$lang$maxFixedArity = 2;
G__7207.cljs$lang$applyTo = (function (arglist__7211){
var x = cljs.core.first(arglist__7211);
var y = cljs.core.first(cljs.core.next(arglist__7211));
var more = cljs.core.rest(cljs.core.next(arglist__7211));
return G__7207__delegate(x, y, more);
});
G__7207.cljs$lang$arity$variadic = G__7207__delegate;
return G__7207;
})()
;
_GT__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _GT__EQ___1.call(this,x);
case 2:
return _GT__EQ___2.call(this,x,y);
default:
return _GT__EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_GT__EQ_.cljs$lang$maxFixedArity = 2;
_GT__EQ_.cljs$lang$applyTo = _GT__EQ___3.cljs$lang$applyTo;
_GT__EQ_.cljs$lang$arity$1 = _GT__EQ___1;
_GT__EQ_.cljs$lang$arity$2 = _GT__EQ___2;
_GT__EQ_.cljs$lang$arity$variadic = _GT__EQ___3.cljs$lang$arity$variadic;
return _GT__EQ_;
})()
;
/**
* Returns a number one less than num.
*/
cljs.core.dec = (function dec(x){
return (x - 1);
});
/**
* Returns the greatest of the nums.
* @param {...*} var_args
*/
cljs.core.max = (function() {
var max = null;
var max__1 = (function (x){
return x;
});
var max__2 = (function (x,y){
return ((x > y) ? x : y);
});
var max__3 = (function() { 
var G__7212__delegate = function (x,y,more){
return cljs.core.reduce.call(null,max,((x > y) ? x : y),more);
};
var G__7212 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7212__delegate.call(this, x, y, more);
};
G__7212.cljs$lang$maxFixedArity = 2;
G__7212.cljs$lang$applyTo = (function (arglist__7213){
var x = cljs.core.first(arglist__7213);
var y = cljs.core.first(cljs.core.next(arglist__7213));
var more = cljs.core.rest(cljs.core.next(arglist__7213));
return G__7212__delegate(x, y, more);
});
G__7212.cljs$lang$arity$variadic = G__7212__delegate;
return G__7212;
})()
;
max = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return max__1.call(this,x);
case 2:
return max__2.call(this,x,y);
default:
return max__3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
max.cljs$lang$maxFixedArity = 2;
max.cljs$lang$applyTo = max__3.cljs$lang$applyTo;
max.cljs$lang$arity$1 = max__1;
max.cljs$lang$arity$2 = max__2;
max.cljs$lang$arity$variadic = max__3.cljs$lang$arity$variadic;
return max;
})()
;
/**
* Returns the least of the nums.
* @param {...*} var_args
*/
cljs.core.min = (function() {
var min = null;
var min__1 = (function (x){
return x;
});
var min__2 = (function (x,y){
return ((x < y) ? x : y);
});
var min__3 = (function() { 
var G__7214__delegate = function (x,y,more){
return cljs.core.reduce.call(null,min,((x < y) ? x : y),more);
};
var G__7214 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7214__delegate.call(this, x, y, more);
};
G__7214.cljs$lang$maxFixedArity = 2;
G__7214.cljs$lang$applyTo = (function (arglist__7215){
var x = cljs.core.first(arglist__7215);
var y = cljs.core.first(cljs.core.next(arglist__7215));
var more = cljs.core.rest(cljs.core.next(arglist__7215));
return G__7214__delegate(x, y, more);
});
G__7214.cljs$lang$arity$variadic = G__7214__delegate;
return G__7214;
})()
;
min = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return min__1.call(this,x);
case 2:
return min__2.call(this,x,y);
default:
return min__3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
min.cljs$lang$maxFixedArity = 2;
min.cljs$lang$applyTo = min__3.cljs$lang$applyTo;
min.cljs$lang$arity$1 = min__1;
min.cljs$lang$arity$2 = min__2;
min.cljs$lang$arity$variadic = min__3.cljs$lang$arity$variadic;
return min;
})()
;
cljs.core.fix = (function fix(q){
if((q >= 0))
{return Math.floor.call(null,q);
} else
{return Math.ceil.call(null,q);
}
});
/**
* Coerce to int by stripping decimal places.
*/
cljs.core.int$ = (function int$(x){
return cljs.core.fix.call(null,x);
});
/**
* Coerce to long by stripping decimal places. Identical to `int'.
*/
cljs.core.long$ = (function long$(x){
return cljs.core.fix.call(null,x);
});
/**
* Modulus of num and div. Truncates toward negative infinity.
*/
cljs.core.mod = (function mod(n,d){
return (n % d);
});
/**
* quot[ient] of dividing numerator by denominator.
*/
cljs.core.quot = (function quot(n,d){
var rem__7217 = (n % d);
return cljs.core.fix.call(null,((n - rem__7217) / d));
});
/**
* remainder of dividing numerator by denominator.
*/
cljs.core.rem = (function rem(n,d){
var q__7219 = cljs.core.quot.call(null,n,d);
return (n - (d * q__7219));
});
/**
* Returns a random floating point number between 0 (inclusive) and n (default 1) (exclusive).
*/
cljs.core.rand = (function() {
var rand = null;
var rand__0 = (function (){
return Math.random.call(null);
});
var rand__1 = (function (n){
return (n * rand.call(null));
});
rand = function(n){
switch(arguments.length){
case 0:
return rand__0.call(this);
case 1:
return rand__1.call(this,n);
}
throw('Invalid arity: ' + arguments.length);
};
rand.cljs$lang$arity$0 = rand__0;
rand.cljs$lang$arity$1 = rand__1;
return rand;
})()
;
/**
* Returns a random integer between 0 (inclusive) and n (exclusive).
*/
cljs.core.rand_int = (function rand_int(n){
return cljs.core.fix.call(null,cljs.core.rand.call(null,n));
});
/**
* Bitwise exclusive or
*/
cljs.core.bit_xor = (function bit_xor(x,y){
return (x ^ y);
});
/**
* Bitwise and
*/
cljs.core.bit_and = (function bit_and(x,y){
return (x & y);
});
/**
* Bitwise or
*/
cljs.core.bit_or = (function bit_or(x,y){
return (x | y);
});
/**
* Bitwise and
*/
cljs.core.bit_and_not = (function bit_and_not(x,y){
return (x & ~y);
});
/**
* Clear bit at index n
*/
cljs.core.bit_clear = (function bit_clear(x,n){
return (x & ~(1 << n));
});
/**
* Flip bit at index n
*/
cljs.core.bit_flip = (function bit_flip(x,n){
return (x ^ (1 << n));
});
/**
* Bitwise complement
*/
cljs.core.bit_not = (function bit_not(x){
return (~ x);
});
/**
* Set bit at index n
*/
cljs.core.bit_set = (function bit_set(x,n){
return (x | (1 << n));
});
/**
* Test bit at index n
*/
cljs.core.bit_test = (function bit_test(x,n){
return ((x & (1 << n)) != 0);
});
/**
* Bitwise shift left
*/
cljs.core.bit_shift_left = (function bit_shift_left(x,n){
return (x << n);
});
/**
* Bitwise shift right
*/
cljs.core.bit_shift_right = (function bit_shift_right(x,n){
return (x >> n);
});
/**
* Bitwise shift right with zero fill
*/
cljs.core.bit_shift_right_zero_fill = (function bit_shift_right_zero_fill(x,n){
return (x >>> n);
});
/**
* Counts the number of bits set in n
*/
cljs.core.bit_count = (function bit_count(v){
var v__7222 = (v - ((v >> 1) & 1431655765));
var v__7223 = ((v__7222 & 858993459) + ((v__7222 >> 2) & 858993459));
return ((((v__7223 + (v__7223 >> 4)) & 252645135) * 16843009) >> 24);
});
/**
* Returns non-nil if nums all have the equivalent
* value, otherwise false. Behavior on non nums is
* undefined.
* @param {...*} var_args
*/
cljs.core._EQ__EQ_ = (function() {
var _EQ__EQ_ = null;
var _EQ__EQ___1 = (function (x){
return true;
});
var _EQ__EQ___2 = (function (x,y){
return cljs.core._equiv.call(null,x,y);
});
var _EQ__EQ___3 = (function() { 
var G__7224__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_EQ__EQ_.call(null,x,y)))
{if(cljs.core.next.call(null,more))
{{
var G__7225 = y;
var G__7226 = cljs.core.first.call(null,more);
var G__7227 = cljs.core.next.call(null,more);
x = G__7225;
y = G__7226;
more = G__7227;
continue;
}
} else
{return _EQ__EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__7224 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7224__delegate.call(this, x, y, more);
};
G__7224.cljs$lang$maxFixedArity = 2;
G__7224.cljs$lang$applyTo = (function (arglist__7228){
var x = cljs.core.first(arglist__7228);
var y = cljs.core.first(cljs.core.next(arglist__7228));
var more = cljs.core.rest(cljs.core.next(arglist__7228));
return G__7224__delegate(x, y, more);
});
G__7224.cljs$lang$arity$variadic = G__7224__delegate;
return G__7224;
})()
;
_EQ__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return _EQ__EQ___1.call(this,x);
case 2:
return _EQ__EQ___2.call(this,x,y);
default:
return _EQ__EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
_EQ__EQ_.cljs$lang$maxFixedArity = 2;
_EQ__EQ_.cljs$lang$applyTo = _EQ__EQ___3.cljs$lang$applyTo;
_EQ__EQ_.cljs$lang$arity$1 = _EQ__EQ___1;
_EQ__EQ_.cljs$lang$arity$2 = _EQ__EQ___2;
_EQ__EQ_.cljs$lang$arity$variadic = _EQ__EQ___3.cljs$lang$arity$variadic;
return _EQ__EQ_;
})()
;
/**
* Returns true if num is greater than zero, else false
*/
cljs.core.pos_QMARK_ = (function pos_QMARK_(n){
return (n > 0);
});
cljs.core.zero_QMARK_ = (function zero_QMARK_(n){
return (n === 0);
});
/**
* Returns true if num is less than zero, else false
*/
cljs.core.neg_QMARK_ = (function neg_QMARK_(x){
return (x < 0);
});
/**
* Returns the nth next of coll, (seq coll) when n is 0.
*/
cljs.core.nthnext = (function nthnext(coll,n){
var n__7232 = n;
var xs__7233 = cljs.core.seq.call(null,coll);
while(true){
if(cljs.core.truth_((function (){var and__3941__auto____7234 = xs__7233;
if(and__3941__auto____7234)
{return (n__7232 > 0);
} else
{return and__3941__auto____7234;
}
})()))
{{
var G__7235 = (n__7232 - 1);
var G__7236 = cljs.core.next.call(null,xs__7233);
n__7232 = G__7235;
xs__7233 = G__7236;
continue;
}
} else
{return xs__7233;
}
break;
}
});
/**
* Internal - do not use!
* @param {...*} var_args
*/
cljs.core.str_STAR_ = (function() {
var str_STAR_ = null;
var str_STAR___0 = (function (){
return "";
});
var str_STAR___1 = (function (x){
if((x == null))
{return "";
} else
{if("\uFDD0'else")
{return x.toString();
} else
{return null;
}
}
});
var str_STAR___2 = (function() { 
var G__7237__delegate = function (x,ys){
return (function (sb,more){
while(true){
if(cljs.core.truth_(more))
{{
var G__7238 = sb.append(str_STAR_.call(null,cljs.core.first.call(null,more)));
var G__7239 = cljs.core.next.call(null,more);
sb = G__7238;
more = G__7239;
continue;
}
} else
{return str_STAR_.call(null,sb);
}
break;
}
}).call(null,(new goog.string.StringBuffer(str_STAR_.call(null,x))),ys);
};
var G__7237 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__7237__delegate.call(this, x, ys);
};
G__7237.cljs$lang$maxFixedArity = 1;
G__7237.cljs$lang$applyTo = (function (arglist__7240){
var x = cljs.core.first(arglist__7240);
var ys = cljs.core.rest(arglist__7240);
return G__7237__delegate(x, ys);
});
G__7237.cljs$lang$arity$variadic = G__7237__delegate;
return G__7237;
})()
;
str_STAR_ = function(x,var_args){
var ys = var_args;
switch(arguments.length){
case 0:
return str_STAR___0.call(this);
case 1:
return str_STAR___1.call(this,x);
default:
return str_STAR___2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1));
}
throw('Invalid arity: ' + arguments.length);
};
str_STAR_.cljs$lang$maxFixedArity = 1;
str_STAR_.cljs$lang$applyTo = str_STAR___2.cljs$lang$applyTo;
str_STAR_.cljs$lang$arity$0 = str_STAR___0;
str_STAR_.cljs$lang$arity$1 = str_STAR___1;
str_STAR_.cljs$lang$arity$variadic = str_STAR___2.cljs$lang$arity$variadic;
return str_STAR_;
})()
;
/**
* With no args, returns the empty string. With one arg x, returns
* x.toString().  (str nil) returns the empty string. With more than
* one arg, returns the concatenation of the str values of the args.
* @param {...*} var_args
*/
cljs.core.str = (function() {
var str = null;
var str__0 = (function (){
return "";
});
var str__1 = (function (x){
if(cljs.core.symbol_QMARK_.call(null,x))
{return x.substring(2,x.length);
} else
{if(cljs.core.keyword_QMARK_.call(null,x))
{return cljs.core.str_STAR_.call(null,":",x.substring(2,x.length));
} else
{if((x == null))
{return "";
} else
{if("\uFDD0'else")
{return x.toString();
} else
{return null;
}
}
}
}
});
var str__2 = (function() { 
var G__7241__delegate = function (x,ys){
return (function (sb,more){
while(true){
if(cljs.core.truth_(more))
{{
var G__7242 = sb.append(str.call(null,cljs.core.first.call(null,more)));
var G__7243 = cljs.core.next.call(null,more);
sb = G__7242;
more = G__7243;
continue;
}
} else
{return cljs.core.str_STAR_.call(null,sb);
}
break;
}
}).call(null,(new goog.string.StringBuffer(str.call(null,x))),ys);
};
var G__7241 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__7241__delegate.call(this, x, ys);
};
G__7241.cljs$lang$maxFixedArity = 1;
G__7241.cljs$lang$applyTo = (function (arglist__7244){
var x = cljs.core.first(arglist__7244);
var ys = cljs.core.rest(arglist__7244);
return G__7241__delegate(x, ys);
});
G__7241.cljs$lang$arity$variadic = G__7241__delegate;
return G__7241;
})()
;
str = function(x,var_args){
var ys = var_args;
switch(arguments.length){
case 0:
return str__0.call(this);
case 1:
return str__1.call(this,x);
default:
return str__2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1));
}
throw('Invalid arity: ' + arguments.length);
};
str.cljs$lang$maxFixedArity = 1;
str.cljs$lang$applyTo = str__2.cljs$lang$applyTo;
str.cljs$lang$arity$0 = str__0;
str.cljs$lang$arity$1 = str__1;
str.cljs$lang$arity$variadic = str__2.cljs$lang$arity$variadic;
return str;
})()
;
/**
* Returns the substring of s beginning at start inclusive, and ending
* at end (defaults to length of string), exclusive.
*/
cljs.core.subs = (function() {
var subs = null;
var subs__2 = (function (s,start){
return s.substring(start);
});
var subs__3 = (function (s,start,end){
return s.substring(start,end);
});
subs = function(s,start,end){
switch(arguments.length){
case 2:
return subs__2.call(this,s,start);
case 3:
return subs__3.call(this,s,start,end);
}
throw('Invalid arity: ' + arguments.length);
};
subs.cljs$lang$arity$2 = subs__2;
subs.cljs$lang$arity$3 = subs__3;
return subs;
})()
;
/**
* Formats a string using goog.string.format.
* @param {...*} var_args
*/
cljs.core.format = (function() { 
var format__delegate = function (fmt,args){
var args__7248 = cljs.core.map.call(null,(function (x){
if((function (){var or__3943__auto____7247 = cljs.core.keyword_QMARK_.call(null,x);
if(or__3943__auto____7247)
{return or__3943__auto____7247;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})())
{return [cljs.core.str(x)].join('');
} else
{return x;
}
}),args);
return cljs.core.apply.call(null,goog.string.format,fmt,args__7248);
};
var format = function (fmt,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return format__delegate.call(this, fmt, args);
};
format.cljs$lang$maxFixedArity = 1;
format.cljs$lang$applyTo = (function (arglist__7249){
var fmt = cljs.core.first(arglist__7249);
var args = cljs.core.rest(arglist__7249);
return format__delegate(fmt, args);
});
format.cljs$lang$arity$variadic = format__delegate;
return format;
})()
;
/**
* Returns a Symbol with the given namespace and name.
*/
cljs.core.symbol = (function() {
var symbol = null;
var symbol__1 = (function (name){
if(cljs.core.symbol_QMARK_.call(null,name))
{return name;
} else
{if(cljs.core.keyword_QMARK_.call(null,name))
{return cljs.core.str_STAR_.call(null,"\uFDD1","'",cljs.core.subs.call(null,name,2));
} else
{if("\uFDD0'else")
{return cljs.core.str_STAR_.call(null,"\uFDD1","'",name);
} else
{return null;
}
}
}
});
var symbol__2 = (function (ns,name){
return symbol.call(null,cljs.core.str_STAR_.call(null,ns,"/",name));
});
symbol = function(ns,name){
switch(arguments.length){
case 1:
return symbol__1.call(this,ns);
case 2:
return symbol__2.call(this,ns,name);
}
throw('Invalid arity: ' + arguments.length);
};
symbol.cljs$lang$arity$1 = symbol__1;
symbol.cljs$lang$arity$2 = symbol__2;
return symbol;
})()
;
/**
* Returns a Keyword with the given namespace and name.  Do not use :
* in the keyword strings, it will be added automatically.
*/
cljs.core.keyword = (function() {
var keyword = null;
var keyword__1 = (function (name){
if(cljs.core.keyword_QMARK_.call(null,name))
{return name;
} else
{if(cljs.core.symbol_QMARK_.call(null,name))
{return cljs.core.str_STAR_.call(null,"\uFDD0","'",cljs.core.subs.call(null,name,2));
} else
{if("\uFDD0'else")
{return cljs.core.str_STAR_.call(null,"\uFDD0","'",name);
} else
{return null;
}
}
}
});
var keyword__2 = (function (ns,name){
return keyword.call(null,cljs.core.str_STAR_.call(null,ns,"/",name));
});
keyword = function(ns,name){
switch(arguments.length){
case 1:
return keyword__1.call(this,ns);
case 2:
return keyword__2.call(this,ns,name);
}
throw('Invalid arity: ' + arguments.length);
};
keyword.cljs$lang$arity$1 = keyword__1;
keyword.cljs$lang$arity$2 = keyword__2;
return keyword;
})()
;
/**
* Assumes x is sequential. Returns true if x equals y, otherwise
* returns false.
*/
cljs.core.equiv_sequential = (function equiv_sequential(x,y){
return cljs.core.boolean$.call(null,((cljs.core.sequential_QMARK_.call(null,y))?(function (){var xs__7252 = cljs.core.seq.call(null,x);
var ys__7253 = cljs.core.seq.call(null,y);
while(true){
if((xs__7252 == null))
{return (ys__7253 == null);
} else
{if((ys__7253 == null))
{return false;
} else
{if(cljs.core._EQ_.call(null,cljs.core.first.call(null,xs__7252),cljs.core.first.call(null,ys__7253)))
{{
var G__7254 = cljs.core.next.call(null,xs__7252);
var G__7255 = cljs.core.next.call(null,ys__7253);
xs__7252 = G__7254;
ys__7253 = G__7255;
continue;
}
} else
{if("\uFDD0'else")
{return false;
} else
{return null;
}
}
}
}
break;
}
})():null));
});
cljs.core.hash_combine = (function hash_combine(seed,hash){
return (seed ^ (((hash + 2654435769) + (seed << 6)) + (seed >> 2)));
});
cljs.core.hash_coll = (function hash_coll(coll){
return cljs.core.reduce.call(null,(function (p1__7256_SHARP_,p2__7257_SHARP_){
return cljs.core.hash_combine.call(null,p1__7256_SHARP_,cljs.core.hash.call(null,p2__7257_SHARP_,false));
}),cljs.core.hash.call(null,cljs.core.first.call(null,coll),false),cljs.core.next.call(null,coll));
});
cljs.core.hash_imap = (function hash_imap(m){
var h__7261 = 0;
var s__7262 = cljs.core.seq.call(null,m);
while(true){
if(s__7262)
{var e__7263 = cljs.core.first.call(null,s__7262);
{
var G__7264 = ((h__7261 + (cljs.core.hash.call(null,cljs.core.key.call(null,e__7263)) ^ cljs.core.hash.call(null,cljs.core.val.call(null,e__7263)))) % 4503599627370496);
var G__7265 = cljs.core.next.call(null,s__7262);
h__7261 = G__7264;
s__7262 = G__7265;
continue;
}
} else
{return h__7261;
}
break;
}
});
cljs.core.hash_iset = (function hash_iset(s){
var h__7269 = 0;
var s__7270 = cljs.core.seq.call(null,s);
while(true){
if(s__7270)
{var e__7271 = cljs.core.first.call(null,s__7270);
{
var G__7272 = ((h__7269 + cljs.core.hash.call(null,e__7271)) % 4503599627370496);
var G__7273 = cljs.core.next.call(null,s__7270);
h__7269 = G__7272;
s__7270 = G__7273;
continue;
}
} else
{return h__7269;
}
break;
}
});
/**
* Takes a JavaScript object and a map of names to functions and
* attaches said functions as methods on the object.  Any references to
* JavaScript's implict this (via the this-as macro) will resolve to the
* object that the function is attached.
*/
cljs.core.extend_object_BANG_ = (function extend_object_BANG_(obj,fn_map){
var G__7281__7282 = cljs.core.seq.call(null,fn_map);
while(true){
if(G__7281__7282)
{var vec__7283__7284 = cljs.core.first.call(null,G__7281__7282);
var key_name__7285 = cljs.core.nth.call(null,vec__7283__7284,0,null);
var f__7286 = cljs.core.nth.call(null,vec__7283__7284,1,null);
var str_name__7287 = cljs.core.name.call(null,key_name__7285);
(obj[str_name__7287] = f__7286);
{
var G__7288 = cljs.core.next.call(null,G__7281__7282);
G__7281__7282 = G__7288;
continue;
}
} else
{}
break;
}
return obj;
});

goog.provide('cljs.core.List');

/**
* @constructor
*/
cljs.core.List = (function (meta,first,rest,count,__hash){
this.meta = meta;
this.first = first;
this.rest = rest;
this.count = count;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 65413358;
})
cljs.core.List.cljs$lang$type = true;
cljs.core.List.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/List");
});
cljs.core.List.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/List");
});
cljs.core.List.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__7289 = this;
var h__2266__auto____7290 = this__7289.__hash;
if(!((h__2266__auto____7290 == null)))
{return h__2266__auto____7290;
} else
{var h__2266__auto____7291 = cljs.core.hash_coll.call(null,coll);
this__7289.__hash = h__2266__auto____7291;
return h__2266__auto____7291;
}
});
cljs.core.List.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__7292 = this;
if((this__7292.count === 1))
{return null;
} else
{return this__7292.rest;
}
});
cljs.core.List.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__7293 = this;
return (new cljs.core.List(this__7293.meta,o,coll,(this__7293.count + 1),null));
});
cljs.core.List.prototype.toString = (function (){
var this__7294 = this;
var this__7295 = this;
return cljs.core.pr_str.call(null,this__7295);
});
cljs.core.List.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__7296 = this;
return coll;
});
cljs.core.List.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__7297 = this;
return this__7297.count;
});
cljs.core.List.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__7298 = this;
return this__7298.first;
});
cljs.core.List.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__7299 = this;
return coll.cljs$core$ISeq$_rest$arity$1(coll);
});
cljs.core.List.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__7300 = this;
return this__7300.first;
});
cljs.core.List.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__7301 = this;
if((this__7301.count === 1))
{return cljs.core.List.EMPTY;
} else
{return this__7301.rest;
}
});
cljs.core.List.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__7302 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__7303 = this;
return (new cljs.core.List(meta,this__7303.first,this__7303.rest,this__7303.count,this__7303.__hash));
});
cljs.core.List.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__7304 = this;
return this__7304.meta;
});
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__7305 = this;
return cljs.core.List.EMPTY;
});
cljs.core.List;

goog.provide('cljs.core.EmptyList');

/**
* @constructor
*/
cljs.core.EmptyList = (function (meta){
this.meta = meta;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 65413326;
})
cljs.core.EmptyList.cljs$lang$type = true;
cljs.core.EmptyList.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/EmptyList");
});
cljs.core.EmptyList.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/EmptyList");
});
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__7306 = this;
return 0;
});
cljs.core.EmptyList.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__7307 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__7308 = this;
return (new cljs.core.List(this__7308.meta,o,null,1,null));
});
cljs.core.EmptyList.prototype.toString = (function (){
var this__7309 = this;
var this__7310 = this;
return cljs.core.pr_str.call(null,this__7310);
});
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__7311 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__7312 = this;
return 0;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__7313 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__7314 = this;
throw (new Error("Can't pop empty list"));
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__7315 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__7316 = this;
return cljs.core.List.EMPTY;
});
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__7317 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__7318 = this;
return (new cljs.core.EmptyList(meta));
});
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__7319 = this;
return this__7319.meta;
});
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__7320 = this;
return coll;
});
cljs.core.EmptyList;
cljs.core.List.EMPTY = (new cljs.core.EmptyList(null));
cljs.core.reversible_QMARK_ = (function reversible_QMARK_(coll){
var G__7324__7325 = coll;
if(G__7324__7325)
{if((function (){var or__3943__auto____7326 = (G__7324__7325.cljs$lang$protocol_mask$partition0$ & 134217728);
if(or__3943__auto____7326)
{return or__3943__auto____7326;
} else
{return G__7324__7325.cljs$core$IReversible$;
}
})())
{return true;
} else
{if((!G__7324__7325.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IReversible,G__7324__7325);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IReversible,G__7324__7325);
}
});
cljs.core.rseq = (function rseq(coll){
return cljs.core._rseq.call(null,coll);
});
/**
* Returns a seq of the items in coll in reverse order. Not lazy.
*/
cljs.core.reverse = (function reverse(coll){
if(cljs.core.reversible_QMARK_.call(null,coll))
{return cljs.core.rseq.call(null,coll);
} else
{return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.List.EMPTY,coll);
}
});
/**
* @param {...*} var_args
*/
cljs.core.list = (function() {
var list = null;
var list__0 = (function (){
return cljs.core.List.EMPTY;
});
var list__1 = (function (x){
return cljs.core.conj.call(null,cljs.core.List.EMPTY,x);
});
var list__2 = (function (x,y){
return cljs.core.conj.call(null,list.call(null,y),x);
});
var list__3 = (function (x,y,z){
return cljs.core.conj.call(null,list.call(null,y,z),x);
});
var list__4 = (function() { 
var G__7327__delegate = function (x,y,z,items){
return cljs.core.conj.call(null,cljs.core.conj.call(null,cljs.core.conj.call(null,cljs.core.reduce.call(null,cljs.core.conj,cljs.core.List.EMPTY,cljs.core.reverse.call(null,items)),z),y),x);
};
var G__7327 = function (x,y,z,var_args){
var items = null;
if (goog.isDef(var_args)) {
  items = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7327__delegate.call(this, x, y, z, items);
};
G__7327.cljs$lang$maxFixedArity = 3;
G__7327.cljs$lang$applyTo = (function (arglist__7328){
var x = cljs.core.first(arglist__7328);
var y = cljs.core.first(cljs.core.next(arglist__7328));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7328)));
var items = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7328)));
return G__7327__delegate(x, y, z, items);
});
G__7327.cljs$lang$arity$variadic = G__7327__delegate;
return G__7327;
})()
;
list = function(x,y,z,var_args){
var items = var_args;
switch(arguments.length){
case 0:
return list__0.call(this);
case 1:
return list__1.call(this,x);
case 2:
return list__2.call(this,x,y);
case 3:
return list__3.call(this,x,y,z);
default:
return list__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
list.cljs$lang$maxFixedArity = 3;
list.cljs$lang$applyTo = list__4.cljs$lang$applyTo;
list.cljs$lang$arity$0 = list__0;
list.cljs$lang$arity$1 = list__1;
list.cljs$lang$arity$2 = list__2;
list.cljs$lang$arity$3 = list__3;
list.cljs$lang$arity$variadic = list__4.cljs$lang$arity$variadic;
return list;
})()
;

goog.provide('cljs.core.Cons');

/**
* @constructor
*/
cljs.core.Cons = (function (meta,first,rest,__hash){
this.meta = meta;
this.first = first;
this.rest = rest;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 65405164;
})
cljs.core.Cons.cljs$lang$type = true;
cljs.core.Cons.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/Cons");
});
cljs.core.Cons.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/Cons");
});
cljs.core.Cons.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__7329 = this;
var h__2266__auto____7330 = this__7329.__hash;
if(!((h__2266__auto____7330 == null)))
{return h__2266__auto____7330;
} else
{var h__2266__auto____7331 = cljs.core.hash_coll.call(null,coll);
this__7329.__hash = h__2266__auto____7331;
return h__2266__auto____7331;
}
});
cljs.core.Cons.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__7332 = this;
if((this__7332.rest == null))
{return null;
} else
{return cljs.core._seq.call(null,this__7332.rest);
}
});
cljs.core.Cons.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__7333 = this;
return (new cljs.core.Cons(null,o,coll,this__7333.__hash));
});
cljs.core.Cons.prototype.toString = (function (){
var this__7334 = this;
var this__7335 = this;
return cljs.core.pr_str.call(null,this__7335);
});
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__7336 = this;
return coll;
});
cljs.core.Cons.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__7337 = this;
return this__7337.first;
});
cljs.core.Cons.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__7338 = this;
if((this__7338.rest == null))
{return cljs.core.List.EMPTY;
} else
{return this__7338.rest;
}
});
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__7339 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__7340 = this;
return (new cljs.core.Cons(meta,this__7340.first,this__7340.rest,this__7340.__hash));
});
cljs.core.Cons.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__7341 = this;
return this__7341.meta;
});
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__7342 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__7342.meta);
});
cljs.core.Cons;
/**
* Returns a new seq where x is the first element and seq is the rest.
*/
cljs.core.cons = (function cons(x,coll){
if((function (){var or__3943__auto____7347 = (coll == null);
if(or__3943__auto____7347)
{return or__3943__auto____7347;
} else
{var G__7348__7349 = coll;
if(G__7348__7349)
{if((function (){var or__3943__auto____7350 = (G__7348__7349.cljs$lang$protocol_mask$partition0$ & 64);
if(or__3943__auto____7350)
{return or__3943__auto____7350;
} else
{return G__7348__7349.cljs$core$ISeq$;
}
})())
{return true;
} else
{if((!G__7348__7349.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7348__7349);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,G__7348__7349);
}
}
})())
{return (new cljs.core.Cons(null,x,coll,null));
} else
{return (new cljs.core.Cons(null,x,cljs.core.seq.call(null,coll),null));
}
});
cljs.core.list_QMARK_ = (function list_QMARK_(x){
var G__7354__7355 = x;
if(G__7354__7355)
{if((function (){var or__3943__auto____7356 = (G__7354__7355.cljs$lang$protocol_mask$partition0$ & 33554432);
if(or__3943__auto____7356)
{return or__3943__auto____7356;
} else
{return G__7354__7355.cljs$core$IList$;
}
})())
{return true;
} else
{if((!G__7354__7355.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IList,G__7354__7355);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IList,G__7354__7355);
}
});
(cljs.core.IReduce["string"] = true);
(cljs.core._reduce["string"] = (function() {
var G__7357 = null;
var G__7357__2 = (function (string,f){
return cljs.core.ci_reduce.call(null,string,f);
});
var G__7357__3 = (function (string,f,start){
return cljs.core.ci_reduce.call(null,string,f,start);
});
G__7357 = function(string,f,start){
switch(arguments.length){
case 2:
return G__7357__2.call(this,string,f);
case 3:
return G__7357__3.call(this,string,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7357;
})()
);
(cljs.core.ILookup["string"] = true);
(cljs.core._lookup["string"] = (function() {
var G__7358 = null;
var G__7358__2 = (function (string,k){
return cljs.core._nth.call(null,string,k);
});
var G__7358__3 = (function (string,k,not_found){
return cljs.core._nth.call(null,string,k,not_found);
});
G__7358 = function(string,k,not_found){
switch(arguments.length){
case 2:
return G__7358__2.call(this,string,k);
case 3:
return G__7358__3.call(this,string,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7358;
})()
);
(cljs.core.IIndexed["string"] = true);
(cljs.core._nth["string"] = (function() {
var G__7359 = null;
var G__7359__2 = (function (string,n){
if((n < cljs.core._count.call(null,string)))
{return string.charAt(n);
} else
{return null;
}
});
var G__7359__3 = (function (string,n,not_found){
if((n < cljs.core._count.call(null,string)))
{return string.charAt(n);
} else
{return not_found;
}
});
G__7359 = function(string,n,not_found){
switch(arguments.length){
case 2:
return G__7359__2.call(this,string,n);
case 3:
return G__7359__3.call(this,string,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7359;
})()
);
(cljs.core.ICounted["string"] = true);
(cljs.core._count["string"] = (function (s){
return s.length;
}));
(cljs.core.ISeqable["string"] = true);
(cljs.core._seq["string"] = (function (string){
return cljs.core.prim_seq.call(null,string,0);
}));
(cljs.core.IHash["string"] = true);
(cljs.core._hash["string"] = (function (o){
return goog.string.hashCode(o);
}));

goog.provide('cljs.core.Keyword');

/**
* @constructor
*/
cljs.core.Keyword = (function (k){
this.k = k;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 1;
})
cljs.core.Keyword.cljs$lang$type = true;
cljs.core.Keyword.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/Keyword");
});
cljs.core.Keyword.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/Keyword");
});
cljs.core.Keyword.prototype.call = (function() {
var G__7371 = null;
var G__7371__2 = (function (this_sym7362,coll){
var this__7364 = this;
var this_sym7362__7365 = this;
var ___7366 = this_sym7362__7365;
if((coll == null))
{return null;
} else
{var strobj__7367 = coll.strobj;
if((strobj__7367 == null))
{return cljs.core._lookup.call(null,coll,this__7364.k,null);
} else
{return (strobj__7367[this__7364.k]);
}
}
});
var G__7371__3 = (function (this_sym7363,coll,not_found){
var this__7364 = this;
var this_sym7363__7368 = this;
var ___7369 = this_sym7363__7368;
if((coll == null))
{return not_found;
} else
{return cljs.core._lookup.call(null,coll,this__7364.k,not_found);
}
});
G__7371 = function(this_sym7363,coll,not_found){
switch(arguments.length){
case 2:
return G__7371__2.call(this,this_sym7363,coll);
case 3:
return G__7371__3.call(this,this_sym7363,coll,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7371;
})()
;
cljs.core.Keyword.prototype.apply = (function (this_sym7360,args7361){
var this__7370 = this;
return this_sym7360.call.apply(this_sym7360,[this_sym7360].concat(args7361.slice()));
});
cljs.core.Keyword;
String.prototype.cljs$core$IFn$ = true;
String.prototype.call = (function() {
var G__7380 = null;
var G__7380__2 = (function (this_sym7374,coll){
var this_sym7374__7376 = this;
var this__7377 = this_sym7374__7376;
return cljs.core._lookup.call(null,coll,this__7377.toString(),null);
});
var G__7380__3 = (function (this_sym7375,coll,not_found){
var this_sym7375__7378 = this;
var this__7379 = this_sym7375__7378;
return cljs.core._lookup.call(null,coll,this__7379.toString(),not_found);
});
G__7380 = function(this_sym7375,coll,not_found){
switch(arguments.length){
case 2:
return G__7380__2.call(this,this_sym7375,coll);
case 3:
return G__7380__3.call(this,this_sym7375,coll,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__7380;
})()
;
String.prototype.apply = (function (this_sym7372,args7373){
return this_sym7372.call.apply(this_sym7372,[this_sym7372].concat(args7373.slice()));
});
String.prototype.apply = (function (s,args){
if((cljs.core.count.call(null,args) < 2))
{return cljs.core._lookup.call(null,(args[0]),s,null);
} else
{return cljs.core._lookup.call(null,(args[0]),s,(args[1]));
}
});
cljs.core.lazy_seq_value = (function lazy_seq_value(lazy_seq){
var x__7382 = lazy_seq.x;
if(lazy_seq.realized)
{return x__7382;
} else
{lazy_seq.x = x__7382.call(null);
lazy_seq.realized = true;
return lazy_seq.x;
}
});

goog.provide('cljs.core.LazySeq');

/**
* @constructor
*/
cljs.core.LazySeq = (function (meta,realized,x,__hash){
this.meta = meta;
this.realized = realized;
this.x = x;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850700;
})
cljs.core.LazySeq.cljs$lang$type = true;
cljs.core.LazySeq.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/LazySeq");
});
cljs.core.LazySeq.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/LazySeq");
});
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__7383 = this;
var h__2266__auto____7384 = this__7383.__hash;
if(!((h__2266__auto____7384 == null)))
{return h__2266__auto____7384;
} else
{var h__2266__auto____7385 = cljs.core.hash_coll.call(null,coll);
this__7383.__hash = h__2266__auto____7385;
return h__2266__auto____7385;
}
});
cljs.core.LazySeq.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__7386 = this;
return cljs.core._seq.call(null,coll.cljs$core$ISeq$_rest$arity$1(coll));
});
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__7387 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.LazySeq.prototype.toString = (function (){
var this__7388 = this;
var this__7389 = this;
return cljs.core.pr_str.call(null,this__7389);
});
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__7390 = this;
return cljs.core.seq.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__7391 = this;
return cljs.core.first.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__7392 = this;
return cljs.core.rest.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__7393 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__7394 = this;
return (new cljs.core.LazySeq(meta,this__7394.realized,this__7394.x,this__7394.__hash));
});
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__7395 = this;
return this__7395.meta;
});
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__7396 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__7396.meta);
});
cljs.core.LazySeq;

goog.provide('cljs.core.ChunkBuffer');

/**
* @constructor
*/
cljs.core.ChunkBuffer = (function (buf,end){
this.buf = buf;
this.end = end;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2;
})
cljs.core.ChunkBuffer.cljs$lang$type = true;
cljs.core.ChunkBuffer.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/ChunkBuffer");
});
cljs.core.ChunkBuffer.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/ChunkBuffer");
});
cljs.core.ChunkBuffer.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var this__7397 = this;
return this__7397.end;
});
cljs.core.ChunkBuffer.prototype.add = (function (o){
var this__7398 = this;
var ___7399 = this;
(this__7398.buf[this__7398.end] = o);
return this__7398.end = (this__7398.end + 1);
});
cljs.core.ChunkBuffer.prototype.chunk = (function (o){
var this__7400 = this;
var ___7401 = this;
var ret__7402 = (new cljs.core.ArrayChunk(this__7400.buf,0,this__7400.end));
this__7400.buf = null;
return ret__7402;
});
cljs.core.ChunkBuffer;
cljs.core.chunk_buffer = (function chunk_buffer(capacity){
return (new cljs.core.ChunkBuffer(cljs.core.make_array.call(null,capacity),0));
});

goog.provide('cljs.core.ArrayChunk');

/**
* @constructor
*/
cljs.core.ArrayChunk = (function (arr,off,end){
this.arr = arr;
this.off = off;
this.end = end;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 524306;
})
cljs.core.ArrayChunk.cljs$lang$type = true;
cljs.core.ArrayChunk.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/ArrayChunk");
});
cljs.core.ArrayChunk.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/ArrayChunk");
});
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var this__7403 = this;
return cljs.core.array_reduce.call(null,this__7403.arr,f,(this__7403.arr[this__7403.off]),(this__7403.off + 1));
});
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var this__7404 = this;
return cljs.core.array_reduce.call(null,this__7404.arr,f,start,this__7404.off);
});
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$ = true;
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$_drop_first$arity$1 = (function (coll){
var this__7405 = this;
if((this__7405.off === this__7405.end))
{throw (new Error("-drop-first of empty chunk"));
} else
{return (new cljs.core.ArrayChunk(this__7405.arr,(this__7405.off + 1),this__7405.end));
}
});
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,i){
var this__7406 = this;
return (this__7406.arr[(this__7406.off + i)]);
});
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,i,not_found){
var this__7407 = this;
if((function (){var and__3941__auto____7408 = (i >= 0);
if(and__3941__auto____7408)
{return (i < (this__7407.end - this__7407.off));
} else
{return and__3941__auto____7408;
}
})())
{return (this__7407.arr[(this__7407.off + i)]);
} else
{return not_found;
}
});
cljs.core.ArrayChunk.prototype.cljs$core$ICounted$_count$arity$1 = (function (_){
var this__7409 = this;
return (this__7409.end - this__7409.off);
});
cljs.core.ArrayChunk;
cljs.core.array_chunk = (function() {
var array_chunk = null;
var array_chunk__1 = (function (arr){
return array_chunk.call(null,arr,0,arr.length);
});
var array_chunk__2 = (function (arr,off){
return array_chunk.call(null,arr,off,arr.length);
});
var array_chunk__3 = (function (arr,off,end){
return (new cljs.core.ArrayChunk(arr,off,end));
});
array_chunk = function(arr,off,end){
switch(arguments.length){
case 1:
return array_chunk__1.call(this,arr);
case 2:
return array_chunk__2.call(this,arr,off);
case 3:
return array_chunk__3.call(this,arr,off,end);
}
throw('Invalid arity: ' + arguments.length);
};
array_chunk.cljs$lang$arity$1 = array_chunk__1;
array_chunk.cljs$lang$arity$2 = array_chunk__2;
array_chunk.cljs$lang$arity$3 = array_chunk__3;
return array_chunk;
})()
;

goog.provide('cljs.core.ChunkedCons');

/**
* @constructor
*/
cljs.core.ChunkedCons = (function (chunk,more,meta,__hash){
this.chunk = chunk;
this.more = more;
this.meta = meta;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 31850604;
this.cljs$lang$protocol_mask$partition1$ = 1536;
})
cljs.core.ChunkedCons.cljs$lang$type = true;
cljs.core.ChunkedCons.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/ChunkedCons");
});
cljs.core.ChunkedCons.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/ChunkedCons");
});
cljs.core.ChunkedCons.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__7410 = this;
var h__2266__auto____7411 = this__7410.__hash;
if(!((h__2266__auto____7411 == null)))
{return h__2266__auto____7411;
} else
{var h__2266__auto____7412 = cljs.core.hash_coll.call(null,coll);
this__7410.__hash = h__2266__auto____7412;
return h__2266__auto____7412;
}
});
cljs.core.ChunkedCons.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this$,o){
var this__7413 = this;
return cljs.core.cons.call(null,o,this$);
});
cljs.core.ChunkedCons.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__7414 = this;
return coll;
});
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__7415 = this;
return cljs.core._nth.call(null,this__7415.chunk,0);
});
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__7416 = this;
if((cljs.core._count.call(null,this__7416.chunk) > 1))
{return (new cljs.core.ChunkedCons(cljs.core._drop_first.call(null,this__7416.chunk),this__7416.more,this__7416.meta,null));
} else
{if((this__7416.more == null))
{return cljs.core.List.EMPTY;
} else
{return this__7416.more;
}
}
});
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = (function (coll){
var this__7417 = this;
if((this__7417.more == null))
{return null;
} else
{return this__7417.more;
}
});
cljs.core.ChunkedCons.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__7418 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.ChunkedCons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,m){
var this__7419 = this;
return (new cljs.core.ChunkedCons(this__7419.chunk,this__7419.more,m,this__7419.__hash));
});
cljs.core.ChunkedCons.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__7420 = this;
return this__7420.meta;
});
cljs.core.ChunkedCons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__7421 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__7421.meta);
});
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = (function (coll){
var this__7422 = this;
return this__7422.chunk;
});
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = (function (coll){
var this__7423 = this;
if((this__7423.more == null))
{return cljs.core.List.EMPTY;
} else
{return this__7423.more;
}
});
cljs.core.ChunkedCons;
cljs.core.chunk_cons = (function chunk_cons(chunk,rest){
if((cljs.core._count.call(null,chunk) === 0))
{return rest;
} else
{return (new cljs.core.ChunkedCons(chunk,rest,null,null));
}
});
cljs.core.chunk_append = (function chunk_append(b,x){
return b.add(x);
});
cljs.core.chunk = (function chunk(b){
return b.chunk();
});
cljs.core.chunk_first = (function chunk_first(s){
return cljs.core._chunked_first.call(null,s);
});
cljs.core.chunk_rest = (function chunk_rest(s){
return cljs.core._chunked_rest.call(null,s);
});
cljs.core.chunk_next = (function chunk_next(s){
if((function (){var G__7427__7428 = s;
if(G__7427__7428)
{if((function (){var or__3943__auto____7429 = (G__7427__7428.cljs$lang$protocol_mask$partition1$ & 1024);
if(or__3943__auto____7429)
{return or__3943__auto____7429;
} else
{return G__7427__7428.cljs$core$IChunkedNext$;
}
})())
{return true;
} else
{if((!G__7427__7428.cljs$lang$protocol_mask$partition1$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedNext,G__7427__7428);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IChunkedNext,G__7427__7428);
}
})())
{return cljs.core._chunked_next.call(null,s);
} else
{return cljs.core.seq.call(null,cljs.core._chunked_rest.call(null,s));
}
});
/**
* Naive impl of to-array as a start.
*/
cljs.core.to_array = (function to_array(s){
var ary__7432 = [];
var s__7433 = s;
while(true){
if(cljs.core.seq.call(null,s__7433))
{ary__7432.push(cljs.core.first.call(null,s__7433));
{
var G__7434 = cljs.core.next.call(null,s__7433);
s__7433 = G__7434;
continue;
}
} else
{return ary__7432;
}
break;
}
});
/**
* Returns a (potentially-ragged) 2-dimensional array
* containing the contents of coll.
*/
cljs.core.to_array_2d = (function to_array_2d(coll){
var ret__7438 = cljs.core.make_array.call(null,cljs.core.count.call(null,coll));
var i__7439 = 0;
var xs__7440 = cljs.core.seq.call(null,coll);
while(true){
if(xs__7440)
{(ret__7438[i__7439] = cljs.core.to_array.call(null,cljs.core.first.call(null,xs__7440)));
{
var G__7441 = (i__7439 + 1);
var G__7442 = cljs.core.next.call(null,xs__7440);
i__7439 = G__7441;
xs__7440 = G__7442;
continue;
}
} else
{}
break;
}
return ret__7438;
});
cljs.core.long_array = (function() {
var long_array = null;
var long_array__1 = (function (size_or_seq){
if(cljs.core.number_QMARK_.call(null,size_or_seq))
{return long_array.call(null,size_or_seq,null);
} else
{if(cljs.core.seq_QMARK_.call(null,size_or_seq))
{return cljs.core.into_array.call(null,size_or_seq);
} else
{if("\uFDD0'else")
{throw (new Error("long-array called with something other than size or ISeq"));
} else
{return null;
}
}
}
});
var long_array__2 = (function (size,init_val_or_seq){
var a__7450 = cljs.core.make_array.call(null,size);
if(cljs.core.seq_QMARK_.call(null,init_val_or_seq))
{var s__7451 = cljs.core.seq.call(null,init_val_or_seq);
var i__7452 = 0;
var s__7453 = s__7451;
while(true){
if(cljs.core.truth_((function (){var and__3941__auto____7454 = s__7453;
if(and__3941__auto____7454)
{return (i__7452 < size);
} else
{return and__3941__auto____7454;
}
})()))
{(a__7450[i__7452] = cljs.core.first.call(null,s__7453));
{
var G__7457 = (i__7452 + 1);
var G__7458 = cljs.core.next.call(null,s__7453);
i__7452 = G__7457;
s__7453 = G__7458;
continue;
}
} else
{return a__7450;
}
break;
}
} else
{var n__2612__auto____7455 = size;
var i__7456 = 0;
while(true){
if((i__7456 < n__2612__auto____7455))
{(a__7450[i__7456] = init_val_or_seq);
{
var G__7459 = (i__7456 + 1);
i__7456 = G__7459;
continue;
}
} else
{}
break;
}
return a__7450;
}
});
long_array = function(size,init_val_or_seq){
switch(arguments.length){
case 1:
return long_array__1.call(this,size);
case 2:
return long_array__2.call(this,size,init_val_or_seq);
}
throw('Invalid arity: ' + arguments.length);
};
long_array.cljs$lang$arity$1 = long_array__1;
long_array.cljs$lang$arity$2 = long_array__2;
return long_array;
})()
;
cljs.core.double_array = (function() {
var double_array = null;
var double_array__1 = (function (size_or_seq){
if(cljs.core.number_QMARK_.call(null,size_or_seq))
{return double_array.call(null,size_or_seq,null);
} else
{if(cljs.core.seq_QMARK_.call(null,size_or_seq))
{return cljs.core.into_array.call(null,size_or_seq);
} else
{if("\uFDD0'else")
{throw (new Error("double-array called with something other than size or ISeq"));
} else
{return null;
}
}
}
});
var double_array__2 = (function (size,init_val_or_seq){
var a__7467 = cljs.core.make_array.call(null,size);
if(cljs.core.seq_QMARK_.call(null,init_val_or_seq))
{var s__7468 = cljs.core.seq.call(null,init_val_or_seq);
var i__7469 = 0;
var s__7470 = s__7468;
while(true){
if(cljs.core.truth_((function (){var and__3941__auto____7471 = s__7470;
if(and__3941__auto____7471)
{return (i__7469 < size);
} else
{return and__3941__auto____7471;
}
})()))
{(a__7467[i__7469] = cljs.core.first.call(null,s__7470));
{
var G__7474 = (i__7469 + 1);
var G__7475 = cljs.core.next.call(null,s__7470);
i__7469 = G__7474;
s__7470 = G__7475;
continue;
}
} else
{return a__7467;
}
break;
}
} else
{var n__2612__auto____7472 = size;
var i__7473 = 0;
while(true){
if((i__7473 < n__2612__auto____7472))
{(a__7467[i__7473] = init_val_or_seq);
{
var G__7476 = (i__7473 + 1);
i__7473 = G__7476;
continue;
}
} else
{}
break;
}
return a__7467;
}
});
double_array = function(size,init_val_or_seq){
switch(arguments.length){
case 1:
return double_array__1.call(this,size);
case 2:
return double_array__2.call(this,size,init_val_or_seq);
}
throw('Invalid arity: ' + arguments.length);
};
double_array.cljs$lang$arity$1 = double_array__1;
double_array.cljs$lang$arity$2 = double_array__2;
return double_array;
})()
;
cljs.core.object_array = (function() {
var object_array = null;
var object_array__1 = (function (size_or_seq){
if(cljs.core.number_QMARK_.call(null,size_or_seq))
{return object_array.call(null,size_or_seq,null);
} else
{if(cljs.core.seq_QMARK_.call(null,size_or_seq))
{return cljs.core.into_array.call(null,size_or_seq);
} else
{if("\uFDD0'else")
{throw (new Error("object-array called with something other than size or ISeq"));
} else
{return null;
}
}
}
});
var object_array__2 = (function (size,init_val_or_seq){
var a__7484 = cljs.core.make_array.call(null,size);
if(cljs.core.seq_QMARK_.call(null,init_val_or_seq))
{var s__7485 = cljs.core.seq.call(null,init_val_or_seq);
var i__7486 = 0;
var s__7487 = s__7485;
while(true){
if(cljs.core.truth_((function (){var and__3941__auto____7488 = s__7487;
if(and__3941__auto____7488)
{return (i__7486 < size);
} else
{return and__3941__auto____7488;
}
})()))
{(a__7484[i__7486] = cljs.core.first.call(null,s__7487));
{
var G__7491 = (i__7486 + 1);
var G__7492 = cljs.core.next.call(null,s__7487);
i__7486 = G__7491;
s__7487 = G__7492;
continue;
}
} else
{return a__7484;
}
break;
}
} else
{var n__2612__auto____7489 = size;
var i__7490 = 0;
while(true){
if((i__7490 < n__2612__auto____7489))
{(a__7484[i__7490] = init_val_or_seq);
{
var G__7493 = (i__7490 + 1);
i__7490 = G__7493;
continue;
}
} else
{}
break;
}
return a__7484;
}
});
object_array = function(size,init_val_or_seq){
switch(arguments.length){
case 1:
return object_array__1.call(this,size);
case 2:
return object_array__2.call(this,size,init_val_or_seq);
}
throw('Invalid arity: ' + arguments.length);
};
object_array.cljs$lang$arity$1 = object_array__1;
object_array.cljs$lang$arity$2 = object_array__2;
return object_array;
})()
;
cljs.core.bounded_count = (function bounded_count(s,n){
if(cljs.core.counted_QMARK_.call(null,s))
{return cljs.core.count.call(null,s);
} else
{var s__7498 = s;
var i__7499 = n;
var sum__7500 = 0;
while(true){
if(cljs.core.truth_((function (){var and__3941__auto____7501 = (i__7499 > 0);
if(and__3941__auto____7501)
{return cljs.core.seq.call(null,s__7498);
} else
{return and__3941__auto____7501;
}
})()))
{{
var G__7502 = cljs.core.next.call(null,s__7498);
var G__7503 = (i__7499 - 1);
var G__7504 = (sum__7500 + 1);
s__7498 = G__7502;
i__7499 = G__7503;
sum__7500 = G__7504;
continue;
}
} else
{return sum__7500;
}
break;
}
}
});
cljs.core.spread = (function spread(arglist){
if((arglist == null))
{return null;
} else
{if((cljs.core.next.call(null,arglist) == null))
{return cljs.core.seq.call(null,cljs.core.first.call(null,arglist));
} else
{if("\uFDD0'else")
{return cljs.core.cons.call(null,cljs.core.first.call(null,arglist),spread.call(null,cljs.core.next.call(null,arglist)));
} else
{return null;
}
}
}
});
/**
* Returns a lazy seq representing the concatenation of the elements in the supplied colls.
* @param {...*} var_args
*/
cljs.core.concat = (function() {
var concat = null;
var concat__0 = (function (){
return (new cljs.core.LazySeq(null,false,(function (){
return null;
}),null));
});
var concat__1 = (function (x){
return (new cljs.core.LazySeq(null,false,(function (){
return x;
}),null));
});
var concat__2 = (function (x,y){
return (new cljs.core.LazySeq(null,false,(function (){
var s__7509 = cljs.core.seq.call(null,x);
if(s__7509)
{if(cljs.core.chunked_seq_QMARK_.call(null,s__7509))
{return cljs.core.chunk_cons.call(null,cljs.core.chunk_first.call(null,s__7509),concat.call(null,cljs.core.chunk_rest.call(null,s__7509),y));
} else
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__7509),concat.call(null,cljs.core.rest.call(null,s__7509),y));
}
} else
{return y;
}
}),null));
});
var concat__3 = (function() { 
var G__7513__delegate = function (x,y,zs){
var cat__7512 = (function cat(xys,zs){
return (new cljs.core.LazySeq(null,false,(function (){
var xys__7511 = cljs.core.seq.call(null,xys);
if(xys__7511)
{if(cljs.core.chunked_seq_QMARK_.call(null,xys__7511))
{return cljs.core.chunk_cons.call(null,cljs.core.chunk_first.call(null,xys__7511),cat.call(null,cljs.core.chunk_rest.call(null,xys__7511),zs));
} else
{return cljs.core.cons.call(null,cljs.core.first.call(null,xys__7511),cat.call(null,cljs.core.rest.call(null,xys__7511),zs));
}
} else
{if(cljs.core.truth_(zs))
{return cat.call(null,cljs.core.first.call(null,zs),cljs.core.next.call(null,zs));
} else
{return null;
}
}
}),null));
});
return cat__7512.call(null,concat.call(null,x,y),zs);
};
var G__7513 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7513__delegate.call(this, x, y, zs);
};
G__7513.cljs$lang$maxFixedArity = 2;
G__7513.cljs$lang$applyTo = (function (arglist__7514){
var x = cljs.core.first(arglist__7514);
var y = cljs.core.first(cljs.core.next(arglist__7514));
var zs = cljs.core.rest(cljs.core.next(arglist__7514));
return G__7513__delegate(x, y, zs);
});
G__7513.cljs$lang$arity$variadic = G__7513__delegate;
return G__7513;
})()
;
concat = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case 0:
return concat__0.call(this);
case 1:
return concat__1.call(this,x);
case 2:
return concat__2.call(this,x,y);
default:
return concat__3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
concat.cljs$lang$maxFixedArity = 2;
concat.cljs$lang$applyTo = concat__3.cljs$lang$applyTo;
concat.cljs$lang$arity$0 = concat__0;
concat.cljs$lang$arity$1 = concat__1;
concat.cljs$lang$arity$2 = concat__2;
concat.cljs$lang$arity$variadic = concat__3.cljs$lang$arity$variadic;
return concat;
})()
;
/**
* Creates a new list containing the items prepended to the rest, the
* last of which will be treated as a sequence.
* @param {...*} var_args
*/
cljs.core.list_STAR_ = (function() {
var list_STAR_ = null;
var list_STAR___1 = (function (args){
return cljs.core.seq.call(null,args);
});
var list_STAR___2 = (function (a,args){
return cljs.core.cons.call(null,a,args);
});
var list_STAR___3 = (function (a,b,args){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,args));
});
var list_STAR___4 = (function (a,b,c,args){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,args)));
});
var list_STAR___5 = (function() { 
var G__7515__delegate = function (a,b,c,d,more){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,more)))));
};
var G__7515 = function (a,b,c,d,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__7515__delegate.call(this, a, b, c, d, more);
};
G__7515.cljs$lang$maxFixedArity = 4;
G__7515.cljs$lang$applyTo = (function (arglist__7516){
var a = cljs.core.first(arglist__7516);
var b = cljs.core.first(cljs.core.next(arglist__7516));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7516)));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7516))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7516))));
return G__7515__delegate(a, b, c, d, more);
});
G__7515.cljs$lang$arity$variadic = G__7515__delegate;
return G__7515;
})()
;
list_STAR_ = function(a,b,c,d,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return list_STAR___1.call(this,a);
case 2:
return list_STAR___2.call(this,a,b);
case 3:
return list_STAR___3.call(this,a,b,c);
case 4:
return list_STAR___4.call(this,a,b,c,d);
default:
return list_STAR___5.cljs$lang$arity$variadic(a,b,c,d, cljs.core.array_seq(arguments, 4));
}
throw('Invalid arity: ' + arguments.length);
};
list_STAR_.cljs$lang$maxFixedArity = 4;
list_STAR_.cljs$lang$applyTo = list_STAR___5.cljs$lang$applyTo;
list_STAR_.cljs$lang$arity$1 = list_STAR___1;
list_STAR_.cljs$lang$arity$2 = list_STAR___2;
list_STAR_.cljs$lang$arity$3 = list_STAR___3;
list_STAR_.cljs$lang$arity$4 = list_STAR___4;
list_STAR_.cljs$lang$arity$variadic = list_STAR___5.cljs$lang$arity$variadic;
return list_STAR_;
})()
;
cljs.core.transient$ = (function transient$(coll){
return cljs.core._as_transient.call(null,coll);
});
cljs.core.persistent_BANG_ = (function persistent_BANG_(tcoll){
return cljs.core._persistent_BANG_.call(null,tcoll);
});
cljs.core.conj_BANG_ = (function conj_BANG_(tcoll,val){
return cljs.core._conj_BANG_.call(null,tcoll,val);
});
cljs.core.assoc_BANG_ = (function assoc_BANG_(tcoll,key,val){
return cljs.core._assoc_BANG_.call(null,tcoll,key,val);
});
cljs.core.dissoc_BANG_ = (function dissoc_BANG_(tcoll,key){
return cljs.core._dissoc_BANG_.call(null,tcoll,key);
});
cljs.core.pop_BANG_ = (function pop_BANG_(tcoll){
return cljs.core._pop_BANG_.call(null,tcoll);
});
cljs.core.disj_BANG_ = (function disj_BANG_(tcoll,val){
return cljs.core._disjoin_BANG_.call(null,tcoll,val);
});
cljs.core.apply_to = (function apply_to(f,argc,args){
var args__7558 = cljs.core.seq.call(null,args);
if((argc === 0))
{return f.call(null);
} else
{var a__7559 = cljs.core._first.call(null,args__7558);
var args__7560 = cljs.core._rest.call(null,args__7558);
if((argc === 1))
{if(f.cljs$lang$arity$1)
{return f.cljs$lang$arity$1(a__7559);
} else
{return f.call(null,a__7559);
}
} else
{var b__7561 = cljs.core._first.call(null,args__7560);
var args__7562 = cljs.core._rest.call(null,args__7560);
if((argc === 2))
{if(f.cljs$lang$arity$2)
{return f.cljs$lang$arity$2(a__7559,b__7561);
} else
{return f.call(null,a__7559,b__7561);
}
} else
{var c__7563 = cljs.core._first.call(null,args__7562);
var args__7564 = cljs.core._rest.call(null,args__7562);
if((argc === 3))
{if(f.cljs$lang$arity$3)
{return f.cljs$lang$arity$3(a__7559,b__7561,c__7563);
} else
{return f.call(null,a__7559,b__7561,c__7563);
}
} else
{var d__7565 = cljs.core._first.call(null,args__7564);
var args__7566 = cljs.core._rest.call(null,args__7564);
if((argc === 4))
{if(f.cljs$lang$arity$4)
{return f.cljs$lang$arity$4(a__7559,b__7561,c__7563,d__7565);
} else
{return f.call(null,a__7559,b__7561,c__7563,d__7565);
}
} else
{var e__7567 = cljs.core._first.call(null,args__7566);
var args__7568 = cljs.core._rest.call(null,args__7566);
if((argc === 5))
{if(f.cljs$lang$arity$5)
{return f.cljs$lang$arity$5(a__7559,b__7561,c__7563,d__7565,e__7567);
} else
{return f.call(null,a__7559,b__7561,c__7563,d__7565,e__7567);
}
} else
{var f__7569 = cljs.core._first.call(null,args__7568);
var args__7570 = cljs.core._rest.call(null,args__7568);
if((argc === 6))
{if(f__7569.cljs$lang$arity$6)
{return f__7569.cljs$lang$arity$6(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569);
}
} else
{var g__7571 = cljs.core._first.call(null,args__7570);
var args__7572 = cljs.core._rest.call(null,args__7570);
if((argc === 7))
{if(f__7569.cljs$lang$arity$7)
{return f__7569.cljs$lang$arity$7(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571);
}
} else
{var h__7573 = cljs.core._first.call(null,args__7572);
var args__7574 = cljs.core._rest.call(null,args__7572);
if((argc === 8))
{if(f__7569.cljs$lang$arity$8)
{return f__7569.cljs$lang$arity$8(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573);
}
} else
{var i__7575 = cljs.core._first.call(null,args__7574);
var args__7576 = cljs.core._rest.call(null,args__7574);
if((argc === 9))
{if(f__7569.cljs$lang$arity$9)
{return f__7569.cljs$lang$arity$9(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575);
}
} else
{var j__7577 = cljs.core._first.call(null,args__7576);
var args__7578 = cljs.core._rest.call(null,args__7576);
if((argc === 10))
{if(f__7569.cljs$lang$arity$10)
{return f__7569.cljs$lang$arity$10(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577);
}
} else
{var k__7579 = cljs.core._first.call(null,args__7578);
var args__7580 = cljs.core._rest.call(null,args__7578);
if((argc === 11))
{if(f__7569.cljs$lang$arity$11)
{return f__7569.cljs$lang$arity$11(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579);
}
} else
{var l__7581 = cljs.core._first.call(null,args__7580);
var args__7582 = cljs.core._rest.call(null,args__7580);
if((argc === 12))
{if(f__7569.cljs$lang$arity$12)
{return f__7569.cljs$lang$arity$12(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581);
}
} else
{var m__7583 = cljs.core._first.call(null,args__7582);
var args__7584 = cljs.core._rest.call(null,args__7582);
if((argc === 13))
{if(f__7569.cljs$lang$arity$13)
{return f__7569.cljs$lang$arity$13(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583);
}
} else
{var n__7585 = cljs.core._first.call(null,args__7584);
var args__7586 = cljs.core._rest.call(null,args__7584);
if((argc === 14))
{if(f__7569.cljs$lang$arity$14)
{return f__7569.cljs$lang$arity$14(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583,n__7585);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583,n__7585);
}
} else
{var o__7587 = cljs.core._first.call(null,args__7586);
var args__7588 = cljs.core._rest.call(null,args__7586);
if((argc === 15))
{if(f__7569.cljs$lang$arity$15)
{return f__7569.cljs$lang$arity$15(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583,n__7585,o__7587);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583,n__7585,o__7587);
}
} else
{var p__7589 = cljs.core._first.call(null,args__7588);
var args__7590 = cljs.core._rest.call(null,args__7588);
if((argc === 16))
{if(f__7569.cljs$lang$arity$16)
{return f__7569.cljs$lang$arity$16(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583,n__7585,o__7587,p__7589);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583,n__7585,o__7587,p__7589);
}
} else
{var q__7591 = cljs.core._first.call(null,args__7590);
var args__7592 = cljs.core._rest.call(null,args__7590);
if((argc === 17))
{if(f__7569.cljs$lang$arity$17)
{return f__7569.cljs$lang$arity$17(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583,n__7585,o__7587,p__7589,q__7591);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583,n__7585,o__7587,p__7589,q__7591);
}
} else
{var r__7593 = cljs.core._first.call(null,args__7592);
var args__7594 = cljs.core._rest.call(null,args__7592);
if((argc === 18))
{if(f__7569.cljs$lang$arity$18)
{return f__7569.cljs$lang$arity$18(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583,n__7585,o__7587,p__7589,q__7591,r__7593);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583,n__7585,o__7587,p__7589,q__7591,r__7593);
}
} else
{var s__7595 = cljs.core._first.call(null,args__7594);
var args__7596 = cljs.core._rest.call(null,args__7594);
if((argc === 19))
{if(f__7569.cljs$lang$arity$19)
{return f__7569.cljs$lang$arity$19(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583,n__7585,o__7587,p__7589,q__7591,r__7593,s__7595);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583,n__7585,o__7587,p__7589,q__7591,r__7593,s__7595);
}
} else
{var t__7597 = cljs.core._first.call(null,args__7596);
var args__7598 = cljs.core._rest.call(null,args__7596);
if((argc === 20))
{if(f__7569.cljs$lang$arity$20)
{return f__7569.cljs$lang$arity$20(a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583,n__7585,o__7587,p__7589,q__7591,r__7593,s__7595,t__7597);
} else
{return f__7569.call(null,a__7559,b__7561,c__7563,d__7565,e__7567,f__7569,g__7571,h__7573,i__7575,j__7577,k__7579,l__7581,m__7583,n__7585,o__7587,p__7589,q__7591,r__7593,s__7595,t__7597);
}
} else
{throw (new Error("Only up to 20 arguments supported on functions"));
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
/**
* Applies fn f to the argument list formed by prepending intervening arguments to args.
* First cut.  Not lazy.  Needs to use emitted toApply.
* @param {...*} var_args
*/
cljs.core.apply = (function() {
var apply = null;
var apply__2 = (function (f,args){
var fixed_arity__7613 = f.cljs$lang$maxFixedArity;
if(f.cljs$lang$applyTo)
{var bc__7614 = cljs.core.bounded_count.call(null,args,(fixed_arity__7613 + 1));
if((bc__7614 <= fixed_arity__7613))
{return cljs.core.apply_to.call(null,f,bc__7614,args);
} else
{return f.cljs$lang$applyTo(args);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,args));
}
});
var apply__3 = (function (f,x,args){
var arglist__7615 = cljs.core.list_STAR_.call(null,x,args);
var fixed_arity__7616 = f.cljs$lang$maxFixedArity;
if(f.cljs$lang$applyTo)
{var bc__7617 = cljs.core.bounded_count.call(null,arglist__7615,(fixed_arity__7616 + 1));
if((bc__7617 <= fixed_arity__7616))
{return cljs.core.apply_to.call(null,f,bc__7617,arglist__7615);
} else
{return f.cljs$lang$applyTo(arglist__7615);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__7615));
}
});
var apply__4 = (function (f,x,y,args){
var arglist__7618 = cljs.core.list_STAR_.call(null,x,y,args);
var fixed_arity__7619 = f.cljs$lang$maxFixedArity;
if(f.cljs$lang$applyTo)
{var bc__7620 = cljs.core.bounded_count.call(null,arglist__7618,(fixed_arity__7619 + 1));
if((bc__7620 <= fixed_arity__7619))
{return cljs.core.apply_to.call(null,f,bc__7620,arglist__7618);
} else
{return f.cljs$lang$applyTo(arglist__7618);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__7618));
}
});
var apply__5 = (function (f,x,y,z,args){
var arglist__7621 = cljs.core.list_STAR_.call(null,x,y,z,args);
var fixed_arity__7622 = f.cljs$lang$maxFixedArity;
if(f.cljs$lang$applyTo)
{var bc__7623 = cljs.core.bounded_count.call(null,arglist__7621,(fixed_arity__7622 + 1));
if((bc__7623 <= fixed_arity__7622))
{return cljs.core.apply_to.call(null,f,bc__7623,arglist__7621);
} else
{return f.cljs$lang$applyTo(arglist__7621);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__7621));
}
});
var apply__6 = (function() { 
var G__7627__delegate = function (f,a,b,c,d,args){
var arglist__7624 = cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,args)))));
var fixed_arity__7625 = f.cljs$lang$maxFixedArity;
if(f.cljs$lang$applyTo)
{var bc__7626 = cljs.core.bounded_count.call(null,arglist__7624,(fixed_arity__7625 + 1));
if((bc__7626 <= fixed_arity__7625))
{return cljs.core.apply_to.call(null,f,bc__7626,arglist__7624);
} else
{return f.cljs$lang$applyTo(arglist__7624);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__7624));
}
};
var G__7627 = function (f,a,b,c,d,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__7627__delegate.call(this, f, a, b, c, d, args);
};
G__7627.cljs$lang$maxFixedArity = 5;
G__7627.cljs$lang$applyTo = (function (arglist__7628){
var f = cljs.core.first(arglist__7628);
var a = cljs.core.first(cljs.core.next(arglist__7628));
var b = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7628)));
var c = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7628))));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7628)))));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7628)))));
return G__7627__delegate(f, a, b, c, d, args);
});
G__7627.cljs$lang$arity$variadic = G__7627__delegate;
return G__7627;
})()
;
apply = function(f,a,b,c,d,var_args){
var args = var_args;
switch(arguments.length){
case 2:
return apply__2.call(this,f,a);
case 3:
return apply__3.call(this,f,a,b);
case 4:
return apply__4.call(this,f,a,b,c);
case 5:
return apply__5.call(this,f,a,b,c,d);
default:
return apply__6.cljs$lang$arity$variadic(f,a,b,c,d, cljs.core.array_seq(arguments, 5));
}
throw('Invalid arity: ' + arguments.length);
};
apply.cljs$lang$maxFixedArity = 5;
apply.cljs$lang$applyTo = apply__6.cljs$lang$applyTo;
apply.cljs$lang$arity$2 = apply__2;
apply.cljs$lang$arity$3 = apply__3;
apply.cljs$lang$arity$4 = apply__4;
apply.cljs$lang$arity$5 = apply__5;
apply.cljs$lang$arity$variadic = apply__6.cljs$lang$arity$variadic;
return apply;
})()
;
/**
* Returns an object of the same type and value as obj, with
* (apply f (meta obj) args) as its metadata.
* @param {...*} var_args
*/
cljs.core.vary_meta = (function() { 
var vary_meta__delegate = function (obj,f,args){
return cljs.core.with_meta.call(null,obj,cljs.core.apply.call(null,f,cljs.core.meta.call(null,obj),args));
};
var vary_meta = function (obj,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return vary_meta__delegate.call(this, obj, f, args);
};
vary_meta.cljs$lang$maxFixedArity = 2;
vary_meta.cljs$lang$applyTo = (function (arglist__7629){
var obj = cljs.core.first(arglist__7629);
var f = cljs.core.first(cljs.core.next(arglist__7629));
var args = cljs.core.rest(cljs.core.next(arglist__7629));
return vary_meta__delegate(obj, f, args);
});
vary_meta.cljs$lang$arity$variadic = vary_meta__delegate;
return vary_meta;
})()
;
/**
* Same as (not (= obj1 obj2))
* @param {...*} var_args
*/
cljs.core.not_EQ_ = (function() {
var not_EQ_ = null;
var not_EQ___1 = (function (x){
return false;
});
var not_EQ___2 = (function (x,y){
return !(cljs.core._EQ_.call(null,x,y));
});
var not_EQ___3 = (function() { 
var G__7630__delegate = function (x,y,more){
return cljs.core.not.call(null,cljs.core.apply.call(null,cljs.core._EQ_,x,y,more));
};
var G__7630 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7630__delegate.call(this, x, y, more);
};
G__7630.cljs$lang$maxFixedArity = 2;
G__7630.cljs$lang$applyTo = (function (arglist__7631){
var x = cljs.core.first(arglist__7631);
var y = cljs.core.first(cljs.core.next(arglist__7631));
var more = cljs.core.rest(cljs.core.next(arglist__7631));
return G__7630__delegate(x, y, more);
});
G__7630.cljs$lang$arity$variadic = G__7630__delegate;
return G__7630;
})()
;
not_EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case 1:
return not_EQ___1.call(this,x);
case 2:
return not_EQ___2.call(this,x,y);
default:
return not_EQ___3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
not_EQ_.cljs$lang$maxFixedArity = 2;
not_EQ_.cljs$lang$applyTo = not_EQ___3.cljs$lang$applyTo;
not_EQ_.cljs$lang$arity$1 = not_EQ___1;
not_EQ_.cljs$lang$arity$2 = not_EQ___2;
not_EQ_.cljs$lang$arity$variadic = not_EQ___3.cljs$lang$arity$variadic;
return not_EQ_;
})()
;
/**
* If coll is empty, returns nil, else coll
*/
cljs.core.not_empty = (function not_empty(coll){
if(cljs.core.seq.call(null,coll))
{return coll;
} else
{return null;
}
});
/**
* Returns true if (pred x) is logical true for every x in coll, else
* false.
*/
cljs.core.every_QMARK_ = (function every_QMARK_(pred,coll){
while(true){
if((cljs.core.seq.call(null,coll) == null))
{return true;
} else
{if(cljs.core.truth_(pred.call(null,cljs.core.first.call(null,coll))))
{{
var G__7632 = pred;
var G__7633 = cljs.core.next.call(null,coll);
pred = G__7632;
coll = G__7633;
continue;
}
} else
{if("\uFDD0'else")
{return false;
} else
{return null;
}
}
}
break;
}
});
/**
* Returns false if (pred x) is logical true for every x in
* coll, else true.
*/
cljs.core.not_every_QMARK_ = (function not_every_QMARK_(pred,coll){
return !(cljs.core.every_QMARK_.call(null,pred,coll));
});
/**
* Returns the first logical true value of (pred x) for any x in coll,
* else nil.  One common idiom is to use a set as pred, for example
* this will return :fred if :fred is in the sequence, otherwise nil:
* (some #{:fred} coll)
*/
cljs.core.some = (function some(pred,coll){
while(true){
if(cljs.core.seq.call(null,coll))
{var or__3943__auto____7635 = pred.call(null,cljs.core.first.call(null,coll));
if(cljs.core.truth_(or__3943__auto____7635))
{return or__3943__auto____7635;
} else
{{
var G__7636 = pred;
var G__7637 = cljs.core.next.call(null,coll);
pred = G__7636;
coll = G__7637;
continue;
}
}
} else
{return null;
}
break;
}
});
/**
* Returns false if (pred x) is logical true for any x in coll,
* else true.
*/
cljs.core.not_any_QMARK_ = (function not_any_QMARK_(pred,coll){
return cljs.core.not.call(null,cljs.core.some.call(null,pred,coll));
});
/**
* Returns true if n is even, throws an exception if n is not an integer
*/
cljs.core.even_QMARK_ = (function even_QMARK_(n){
if(cljs.core.integer_QMARK_.call(null,n))
{return ((n & 1) === 0);
} else
{throw (new Error([cljs.core.str("Argument must be an integer: "),cljs.core.str(n)].join('')));
}
});
/**
* Returns true if n is odd, throws an exception if n is not an integer
*/
cljs.core.odd_QMARK_ = (function odd_QMARK_(n){
return !(cljs.core.even_QMARK_.call(null,n));
});
cljs.core.identity = (function identity(x){
return x;
});
/**
* Takes a fn f and returns a fn that takes the same arguments as f,
* has the same effects, if any, and returns the opposite truth value.
*/
cljs.core.complement = (function complement(f){
return (function() {
var G__7638 = null;
var G__7638__0 = (function (){
return cljs.core.not.call(null,f.call(null));
});
var G__7638__1 = (function (x){
return cljs.core.not.call(null,f.call(null,x));
});
var G__7638__2 = (function (x,y){
return cljs.core.not.call(null,f.call(null,x,y));
});
var G__7638__3 = (function() { 
var G__7639__delegate = function (x,y,zs){
return cljs.core.not.call(null,cljs.core.apply.call(null,f,x,y,zs));
};
var G__7639 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__7639__delegate.call(this, x, y, zs);
};
G__7639.cljs$lang$maxFixedArity = 2;
G__7639.cljs$lang$applyTo = (function (arglist__7640){
var x = cljs.core.first(arglist__7640);
var y = cljs.core.first(cljs.core.next(arglist__7640));
var zs = cljs.core.rest(cljs.core.next(arglist__7640));
return G__7639__delegate(x, y, zs);
});
G__7639.cljs$lang$arity$variadic = G__7639__delegate;
return G__7639;
})()
;
G__7638 = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case 0:
return G__7638__0.call(this);
case 1:
return G__7638__1.call(this,x);
case 2:
return G__7638__2.call(this,x,y);
default:
return G__7638__3.cljs$lang$arity$variadic(x,y, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
G__7638.cljs$lang$maxFixedArity = 2;
G__7638.cljs$lang$applyTo = G__7638__3.cljs$lang$applyTo;
return G__7638;
})()
});
/**
* Returns a function that takes any number of arguments and returns x.
*/
cljs.core.constantly = (function constantly(x){
return (function() { 
var G__7641__delegate = function (args){
return x;
};
var G__7641 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7641__delegate.call(this, args);
};
G__7641.cljs$lang$maxFixedArity = 0;
G__7641.cljs$lang$applyTo = (function (arglist__7642){
var args = cljs.core.seq(arglist__7642);;
return G__7641__delegate(args);
});
G__7641.cljs$lang$arity$variadic = G__7641__delegate;
return G__7641;
})()
;
});
/**
* Takes a set of functions and returns a fn that is the composition
* of those fns.  The returned fn takes a variable number of args,
* applies the rightmost of fns to the args, the next
* fn (right-to-left) to the result, etc.
* @param {...*} var_args
*/
cljs.core.comp = (function() {
var comp = null;
var comp__0 = (function (){
return cljs.core.identity;
});
var comp__1 = (function (f){
return f;
});
var comp__2 = (function (f,g){
return (function() {
var G__7649 = null;
var G__7649__0 = (function (){
return f.call(null,g.call(null));
});
var G__7649__1 = (function (x){
return f.call(null,g.call(null,x));
});
var G__7649__2 = (function (x,y){
return f.call(null,g.call(null,x,y));
});
var G__7649__3 = (function (x,y,z){
return f.call(null,g.call(null,x,y,z));
});
var G__7649__4 = (function() { 
var G__7650__delegate = function (x,y,z,args){
return f.call(null,cljs.core.apply.call(null,g,x,y,z,args));
};
var G__7650 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7650__delegate.call(this, x, y, z, args);
};
G__7650.cljs$lang$maxFixedArity = 3;
G__7650.cljs$lang$applyTo = (function (arglist__7651){
var x = cljs.core.first(arglist__7651);
var y = cljs.core.first(cljs.core.next(arglist__7651));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7651)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7651)));
return G__7650__delegate(x, y, z, args);
});
G__7650.cljs$lang$arity$variadic = G__7650__delegate;
return G__7650;
})()
;
G__7649 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__7649__0.call(this);
case 1:
return G__7649__1.call(this,x);
case 2:
return G__7649__2.call(this,x,y);
case 3:
return G__7649__3.call(this,x,y,z);
default:
return G__7649__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__7649.cljs$lang$maxFixedArity = 3;
G__7649.cljs$lang$applyTo = G__7649__4.cljs$lang$applyTo;
return G__7649;
})()
});
var comp__3 = (function (f,g,h){
return (function() {
var G__7652 = null;
var G__7652__0 = (function (){
return f.call(null,g.call(null,h.call(null)));
});
var G__7652__1 = (function (x){
return f.call(null,g.call(null,h.call(null,x)));
});
var G__7652__2 = (function (x,y){
return f.call(null,g.call(null,h.call(null,x,y)));
});
var G__7652__3 = (function (x,y,z){
return f.call(null,g.call(null,h.call(null,x,y,z)));
});
var G__7652__4 = (function() { 
var G__7653__delegate = function (x,y,z,args){
return f.call(null,g.call(null,cljs.core.apply.call(null,h,x,y,z,args)));
};
var G__7653 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7653__delegate.call(this, x, y, z, args);
};
G__7653.cljs$lang$maxFixedArity = 3;
G__7653.cljs$lang$applyTo = (function (arglist__7654){
var x = cljs.core.first(arglist__7654);
var y = cljs.core.first(cljs.core.next(arglist__7654));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7654)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7654)));
return G__7653__delegate(x, y, z, args);
});
G__7653.cljs$lang$arity$variadic = G__7653__delegate;
return G__7653;
})()
;
G__7652 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__7652__0.call(this);
case 1:
return G__7652__1.call(this,x);
case 2:
return G__7652__2.call(this,x,y);
case 3:
return G__7652__3.call(this,x,y,z);
default:
return G__7652__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__7652.cljs$lang$maxFixedArity = 3;
G__7652.cljs$lang$applyTo = G__7652__4.cljs$lang$applyTo;
return G__7652;
})()
});
var comp__4 = (function() { 
var G__7655__delegate = function (f1,f2,f3,fs){
var fs__7646 = cljs.core.reverse.call(null,cljs.core.list_STAR_.call(null,f1,f2,f3,fs));
return (function() { 
var G__7656__delegate = function (args){
var ret__7647 = cljs.core.apply.call(null,cljs.core.first.call(null,fs__7646),args);
var fs__7648 = cljs.core.next.call(null,fs__7646);
while(true){
if(fs__7648)
{{
var G__7657 = cljs.core.first.call(null,fs__7648).call(null,ret__7647);
var G__7658 = cljs.core.next.call(null,fs__7648);
ret__7647 = G__7657;
fs__7648 = G__7658;
continue;
}
} else
{return ret__7647;
}
break;
}
};
var G__7656 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7656__delegate.call(this, args);
};
G__7656.cljs$lang$maxFixedArity = 0;
G__7656.cljs$lang$applyTo = (function (arglist__7659){
var args = cljs.core.seq(arglist__7659);;
return G__7656__delegate(args);
});
G__7656.cljs$lang$arity$variadic = G__7656__delegate;
return G__7656;
})()
;
};
var G__7655 = function (f1,f2,f3,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7655__delegate.call(this, f1, f2, f3, fs);
};
G__7655.cljs$lang$maxFixedArity = 3;
G__7655.cljs$lang$applyTo = (function (arglist__7660){
var f1 = cljs.core.first(arglist__7660);
var f2 = cljs.core.first(cljs.core.next(arglist__7660));
var f3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7660)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7660)));
return G__7655__delegate(f1, f2, f3, fs);
});
G__7655.cljs$lang$arity$variadic = G__7655__delegate;
return G__7655;
})()
;
comp = function(f1,f2,f3,var_args){
var fs = var_args;
switch(arguments.length){
case 0:
return comp__0.call(this);
case 1:
return comp__1.call(this,f1);
case 2:
return comp__2.call(this,f1,f2);
case 3:
return comp__3.call(this,f1,f2,f3);
default:
return comp__4.cljs$lang$arity$variadic(f1,f2,f3, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
comp.cljs$lang$maxFixedArity = 3;
comp.cljs$lang$applyTo = comp__4.cljs$lang$applyTo;
comp.cljs$lang$arity$0 = comp__0;
comp.cljs$lang$arity$1 = comp__1;
comp.cljs$lang$arity$2 = comp__2;
comp.cljs$lang$arity$3 = comp__3;
comp.cljs$lang$arity$variadic = comp__4.cljs$lang$arity$variadic;
return comp;
})()
;
/**
* Takes a function f and fewer than the normal arguments to f, and
* returns a fn that takes a variable number of additional args. When
* called, the returned function calls f with args + additional args.
* @param {...*} var_args
*/
cljs.core.partial = (function() {
var partial = null;
var partial__2 = (function (f,arg1){
return (function() { 
var G__7661__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,args);
};
var G__7661 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7661__delegate.call(this, args);
};
G__7661.cljs$lang$maxFixedArity = 0;
G__7661.cljs$lang$applyTo = (function (arglist__7662){
var args = cljs.core.seq(arglist__7662);;
return G__7661__delegate(args);
});
G__7661.cljs$lang$arity$variadic = G__7661__delegate;
return G__7661;
})()
;
});
var partial__3 = (function (f,arg1,arg2){
return (function() { 
var G__7663__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,args);
};
var G__7663 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7663__delegate.call(this, args);
};
G__7663.cljs$lang$maxFixedArity = 0;
G__7663.cljs$lang$applyTo = (function (arglist__7664){
var args = cljs.core.seq(arglist__7664);;
return G__7663__delegate(args);
});
G__7663.cljs$lang$arity$variadic = G__7663__delegate;
return G__7663;
})()
;
});
var partial__4 = (function (f,arg1,arg2,arg3){
return (function() { 
var G__7665__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,args);
};
var G__7665 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7665__delegate.call(this, args);
};
G__7665.cljs$lang$maxFixedArity = 0;
G__7665.cljs$lang$applyTo = (function (arglist__7666){
var args = cljs.core.seq(arglist__7666);;
return G__7665__delegate(args);
});
G__7665.cljs$lang$arity$variadic = G__7665__delegate;
return G__7665;
})()
;
});
var partial__5 = (function() { 
var G__7667__delegate = function (f,arg1,arg2,arg3,more){
return (function() { 
var G__7668__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,cljs.core.concat.call(null,more,args));
};
var G__7668 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__7668__delegate.call(this, args);
};
G__7668.cljs$lang$maxFixedArity = 0;
G__7668.cljs$lang$applyTo = (function (arglist__7669){
var args = cljs.core.seq(arglist__7669);;
return G__7668__delegate(args);
});
G__7668.cljs$lang$arity$variadic = G__7668__delegate;
return G__7668;
})()
;
};
var G__7667 = function (f,arg1,arg2,arg3,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__7667__delegate.call(this, f, arg1, arg2, arg3, more);
};
G__7667.cljs$lang$maxFixedArity = 4;
G__7667.cljs$lang$applyTo = (function (arglist__7670){
var f = cljs.core.first(arglist__7670);
var arg1 = cljs.core.first(cljs.core.next(arglist__7670));
var arg2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7670)));
var arg3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7670))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__7670))));
return G__7667__delegate(f, arg1, arg2, arg3, more);
});
G__7667.cljs$lang$arity$variadic = G__7667__delegate;
return G__7667;
})()
;
partial = function(f,arg1,arg2,arg3,var_args){
var more = var_args;
switch(arguments.length){
case 2:
return partial__2.call(this,f,arg1);
case 3:
return partial__3.call(this,f,arg1,arg2);
case 4:
return partial__4.call(this,f,arg1,arg2,arg3);
default:
return partial__5.cljs$lang$arity$variadic(f,arg1,arg2,arg3, cljs.core.array_seq(arguments, 4));
}
throw('Invalid arity: ' + arguments.length);
};
partial.cljs$lang$maxFixedArity = 4;
partial.cljs$lang$applyTo = partial__5.cljs$lang$applyTo;
partial.cljs$lang$arity$2 = partial__2;
partial.cljs$lang$arity$3 = partial__3;
partial.cljs$lang$arity$4 = partial__4;
partial.cljs$lang$arity$variadic = partial__5.cljs$lang$arity$variadic;
return partial;
})()
;
/**
* Takes a function f, and returns a function that calls f, replacing
* a nil first argument to f with the supplied value x. Higher arity
* versions can replace arguments in the second and third
* positions (y, z). Note that the function f can take any number of
* arguments, not just the one(s) being nil-patched.
*/
cljs.core.fnil = (function() {
var fnil = null;
var fnil__2 = (function (f,x){
return (function() {
var G__7671 = null;
var G__7671__1 = (function (a){
return f.call(null,(((a == null))?x:a));
});
var G__7671__2 = (function (a,b){
return f.call(null,(((a == null))?x:a),b);
});
var G__7671__3 = (function (a,b,c){
return f.call(null,(((a == null))?x:a),b,c);
});
var G__7671__4 = (function() { 
var G__7672__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(((a == null))?x:a),b,c,ds);
};
var G__7672 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7672__delegate.call(this, a, b, c, ds);
};
G__7672.cljs$lang$maxFixedArity = 3;
G__7672.cljs$lang$applyTo = (function (arglist__7673){
var a = cljs.core.first(arglist__7673);
var b = cljs.core.first(cljs.core.next(arglist__7673));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7673)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7673)));
return G__7672__delegate(a, b, c, ds);
});
G__7672.cljs$lang$arity$variadic = G__7672__delegate;
return G__7672;
})()
;
G__7671 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case 1:
return G__7671__1.call(this,a);
case 2:
return G__7671__2.call(this,a,b);
case 3:
return G__7671__3.call(this,a,b,c);
default:
return G__7671__4.cljs$lang$arity$variadic(a,b,c, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__7671.cljs$lang$maxFixedArity = 3;
G__7671.cljs$lang$applyTo = G__7671__4.cljs$lang$applyTo;
return G__7671;
})()
});
var fnil__3 = (function (f,x,y){
return (function() {
var G__7674 = null;
var G__7674__2 = (function (a,b){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b));
});
var G__7674__3 = (function (a,b,c){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b),c);
});
var G__7674__4 = (function() { 
var G__7675__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(((a == null))?x:a),(((b == null))?y:b),c,ds);
};
var G__7675 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7675__delegate.call(this, a, b, c, ds);
};
G__7675.cljs$lang$maxFixedArity = 3;
G__7675.cljs$lang$applyTo = (function (arglist__7676){
var a = cljs.core.first(arglist__7676);
var b = cljs.core.first(cljs.core.next(arglist__7676));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7676)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7676)));
return G__7675__delegate(a, b, c, ds);
});
G__7675.cljs$lang$arity$variadic = G__7675__delegate;
return G__7675;
})()
;
G__7674 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case 2:
return G__7674__2.call(this,a,b);
case 3:
return G__7674__3.call(this,a,b,c);
default:
return G__7674__4.cljs$lang$arity$variadic(a,b,c, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__7674.cljs$lang$maxFixedArity = 3;
G__7674.cljs$lang$applyTo = G__7674__4.cljs$lang$applyTo;
return G__7674;
})()
});
var fnil__4 = (function (f,x,y,z){
return (function() {
var G__7677 = null;
var G__7677__2 = (function (a,b){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b));
});
var G__7677__3 = (function (a,b,c){
return f.call(null,(((a == null))?x:a),(((b == null))?y:b),(((c == null))?z:c));
});
var G__7677__4 = (function() { 
var G__7678__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(((a == null))?x:a),(((b == null))?y:b),(((c == null))?z:c),ds);
};
var G__7678 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7678__delegate.call(this, a, b, c, ds);
};
G__7678.cljs$lang$maxFixedArity = 3;
G__7678.cljs$lang$applyTo = (function (arglist__7679){
var a = cljs.core.first(arglist__7679);
var b = cljs.core.first(cljs.core.next(arglist__7679));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7679)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7679)));
return G__7678__delegate(a, b, c, ds);
});
G__7678.cljs$lang$arity$variadic = G__7678__delegate;
return G__7678;
})()
;
G__7677 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case 2:
return G__7677__2.call(this,a,b);
case 3:
return G__7677__3.call(this,a,b,c);
default:
return G__7677__4.cljs$lang$arity$variadic(a,b,c, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__7677.cljs$lang$maxFixedArity = 3;
G__7677.cljs$lang$applyTo = G__7677__4.cljs$lang$applyTo;
return G__7677;
})()
});
fnil = function(f,x,y,z){
switch(arguments.length){
case 2:
return fnil__2.call(this,f,x);
case 3:
return fnil__3.call(this,f,x,y);
case 4:
return fnil__4.call(this,f,x,y,z);
}
throw('Invalid arity: ' + arguments.length);
};
fnil.cljs$lang$arity$2 = fnil__2;
fnil.cljs$lang$arity$3 = fnil__3;
fnil.cljs$lang$arity$4 = fnil__4;
return fnil;
})()
;
/**
* Returns a lazy sequence consisting of the result of applying f to 0
* and the first item of coll, followed by applying f to 1 and the second
* item in coll, etc, until coll is exhausted. Thus function f should
* accept 2 arguments, index and item.
*/
cljs.core.map_indexed = (function map_indexed(f,coll){
var mapi__7695 = (function mapi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__4092__auto____7703 = cljs.core.seq.call(null,coll);
if(temp__4092__auto____7703)
{var s__7704 = temp__4092__auto____7703;
if(cljs.core.chunked_seq_QMARK_.call(null,s__7704))
{var c__7705 = cljs.core.chunk_first.call(null,s__7704);
var size__7706 = cljs.core.count.call(null,c__7705);
var b__7707 = cljs.core.chunk_buffer.call(null,size__7706);
var n__2612__auto____7708 = size__7706;
var i__7709 = 0;
while(true){
if((i__7709 < n__2612__auto____7708))
{cljs.core.chunk_append.call(null,b__7707,f.call(null,(idx + i__7709),cljs.core._nth.call(null,c__7705,i__7709)));
{
var G__7710 = (i__7709 + 1);
i__7709 = G__7710;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7707),mapi.call(null,(idx + size__7706),cljs.core.chunk_rest.call(null,s__7704)));
} else
{return cljs.core.cons.call(null,f.call(null,idx,cljs.core.first.call(null,s__7704)),mapi.call(null,(idx + 1),cljs.core.rest.call(null,s__7704)));
}
} else
{return null;
}
}),null));
});
return mapi__7695.call(null,0,coll);
});
/**
* Returns a lazy sequence of the non-nil results of (f item). Note,
* this means false return values will be included.  f must be free of
* side-effects.
*/
cljs.core.keep = (function keep(f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__4092__auto____7720 = cljs.core.seq.call(null,coll);
if(temp__4092__auto____7720)
{var s__7721 = temp__4092__auto____7720;
if(cljs.core.chunked_seq_QMARK_.call(null,s__7721))
{var c__7722 = cljs.core.chunk_first.call(null,s__7721);
var size__7723 = cljs.core.count.call(null,c__7722);
var b__7724 = cljs.core.chunk_buffer.call(null,size__7723);
var n__2612__auto____7725 = size__7723;
var i__7726 = 0;
while(true){
if((i__7726 < n__2612__auto____7725))
{var x__7727 = f.call(null,cljs.core._nth.call(null,c__7722,i__7726));
if((x__7727 == null))
{} else
{cljs.core.chunk_append.call(null,b__7724,x__7727);
}
{
var G__7729 = (i__7726 + 1);
i__7726 = G__7729;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7724),keep.call(null,f,cljs.core.chunk_rest.call(null,s__7721)));
} else
{var x__7728 = f.call(null,cljs.core.first.call(null,s__7721));
if((x__7728 == null))
{return keep.call(null,f,cljs.core.rest.call(null,s__7721));
} else
{return cljs.core.cons.call(null,x__7728,keep.call(null,f,cljs.core.rest.call(null,s__7721)));
}
}
} else
{return null;
}
}),null));
});
/**
* Returns a lazy sequence of the non-nil results of (f index item). Note,
* this means false return values will be included.  f must be free of
* side-effects.
*/
cljs.core.keep_indexed = (function keep_indexed(f,coll){
var keepi__7755 = (function keepi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__4092__auto____7765 = cljs.core.seq.call(null,coll);
if(temp__4092__auto____7765)
{var s__7766 = temp__4092__auto____7765;
if(cljs.core.chunked_seq_QMARK_.call(null,s__7766))
{var c__7767 = cljs.core.chunk_first.call(null,s__7766);
var size__7768 = cljs.core.count.call(null,c__7767);
var b__7769 = cljs.core.chunk_buffer.call(null,size__7768);
var n__2612__auto____7770 = size__7768;
var i__7771 = 0;
while(true){
if((i__7771 < n__2612__auto____7770))
{var x__7772 = f.call(null,(idx + i__7771),cljs.core._nth.call(null,c__7767,i__7771));
if((x__7772 == null))
{} else
{cljs.core.chunk_append.call(null,b__7769,x__7772);
}
{
var G__7774 = (i__7771 + 1);
i__7771 = G__7774;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7769),keepi.call(null,(idx + size__7768),cljs.core.chunk_rest.call(null,s__7766)));
} else
{var x__7773 = f.call(null,idx,cljs.core.first.call(null,s__7766));
if((x__7773 == null))
{return keepi.call(null,(idx + 1),cljs.core.rest.call(null,s__7766));
} else
{return cljs.core.cons.call(null,x__7773,keepi.call(null,(idx + 1),cljs.core.rest.call(null,s__7766)));
}
}
} else
{return null;
}
}),null));
});
return keepi__7755.call(null,0,coll);
});
/**
* Takes a set of predicates and returns a function f that returns true if all of its
* composing predicates return a logical true value against all of its arguments, else it returns
* false. Note that f is short-circuiting in that it will stop execution on the first
* argument that triggers a logical false result against the original predicates.
* @param {...*} var_args
*/
cljs.core.every_pred = (function() {
var every_pred = null;
var every_pred__1 = (function (p){
return (function() {
var ep1 = null;
var ep1__0 = (function (){
return true;
});
var ep1__1 = (function (x){
return cljs.core.boolean$.call(null,p.call(null,x));
});
var ep1__2 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3941__auto____7860 = p.call(null,x);
if(cljs.core.truth_(and__3941__auto____7860))
{return p.call(null,y);
} else
{return and__3941__auto____7860;
}
})());
});
var ep1__3 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3941__auto____7861 = p.call(null,x);
if(cljs.core.truth_(and__3941__auto____7861))
{var and__3941__auto____7862 = p.call(null,y);
if(cljs.core.truth_(and__3941__auto____7862))
{return p.call(null,z);
} else
{return and__3941__auto____7862;
}
} else
{return and__3941__auto____7861;
}
})());
});
var ep1__4 = (function() { 
var G__7931__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3941__auto____7863 = ep1.call(null,x,y,z);
if(cljs.core.truth_(and__3941__auto____7863))
{return cljs.core.every_QMARK_.call(null,p,args);
} else
{return and__3941__auto____7863;
}
})());
};
var G__7931 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7931__delegate.call(this, x, y, z, args);
};
G__7931.cljs$lang$maxFixedArity = 3;
G__7931.cljs$lang$applyTo = (function (arglist__7932){
var x = cljs.core.first(arglist__7932);
var y = cljs.core.first(cljs.core.next(arglist__7932));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7932)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7932)));
return G__7931__delegate(x, y, z, args);
});
G__7931.cljs$lang$arity$variadic = G__7931__delegate;
return G__7931;
})()
;
ep1 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return ep1__0.call(this);
case 1:
return ep1__1.call(this,x);
case 2:
return ep1__2.call(this,x,y);
case 3:
return ep1__3.call(this,x,y,z);
default:
return ep1__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
ep1.cljs$lang$maxFixedArity = 3;
ep1.cljs$lang$applyTo = ep1__4.cljs$lang$applyTo;
ep1.cljs$lang$arity$0 = ep1__0;
ep1.cljs$lang$arity$1 = ep1__1;
ep1.cljs$lang$arity$2 = ep1__2;
ep1.cljs$lang$arity$3 = ep1__3;
ep1.cljs$lang$arity$variadic = ep1__4.cljs$lang$arity$variadic;
return ep1;
})()
});
var every_pred__2 = (function (p1,p2){
return (function() {
var ep2 = null;
var ep2__0 = (function (){
return true;
});
var ep2__1 = (function (x){
return cljs.core.boolean$.call(null,(function (){var and__3941__auto____7875 = p1.call(null,x);
if(cljs.core.truth_(and__3941__auto____7875))
{return p2.call(null,x);
} else
{return and__3941__auto____7875;
}
})());
});
var ep2__2 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3941__auto____7876 = p1.call(null,x);
if(cljs.core.truth_(and__3941__auto____7876))
{var and__3941__auto____7877 = p1.call(null,y);
if(cljs.core.truth_(and__3941__auto____7877))
{var and__3941__auto____7878 = p2.call(null,x);
if(cljs.core.truth_(and__3941__auto____7878))
{return p2.call(null,y);
} else
{return and__3941__auto____7878;
}
} else
{return and__3941__auto____7877;
}
} else
{return and__3941__auto____7876;
}
})());
});
var ep2__3 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3941__auto____7879 = p1.call(null,x);
if(cljs.core.truth_(and__3941__auto____7879))
{var and__3941__auto____7880 = p1.call(null,y);
if(cljs.core.truth_(and__3941__auto____7880))
{var and__3941__auto____7881 = p1.call(null,z);
if(cljs.core.truth_(and__3941__auto____7881))
{var and__3941__auto____7882 = p2.call(null,x);
if(cljs.core.truth_(and__3941__auto____7882))
{var and__3941__auto____7883 = p2.call(null,y);
if(cljs.core.truth_(and__3941__auto____7883))
{return p2.call(null,z);
} else
{return and__3941__auto____7883;
}
} else
{return and__3941__auto____7882;
}
} else
{return and__3941__auto____7881;
}
} else
{return and__3941__auto____7880;
}
} else
{return and__3941__auto____7879;
}
})());
});
var ep2__4 = (function() { 
var G__7933__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3941__auto____7884 = ep2.call(null,x,y,z);
if(cljs.core.truth_(and__3941__auto____7884))
{return cljs.core.every_QMARK_.call(null,(function (p1__7730_SHARP_){
var and__3941__auto____7885 = p1.call(null,p1__7730_SHARP_);
if(cljs.core.truth_(and__3941__auto____7885))
{return p2.call(null,p1__7730_SHARP_);
} else
{return and__3941__auto____7885;
}
}),args);
} else
{return and__3941__auto____7884;
}
})());
};
var G__7933 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7933__delegate.call(this, x, y, z, args);
};
G__7933.cljs$lang$maxFixedArity = 3;
G__7933.cljs$lang$applyTo = (function (arglist__7934){
var x = cljs.core.first(arglist__7934);
var y = cljs.core.first(cljs.core.next(arglist__7934));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7934)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7934)));
return G__7933__delegate(x, y, z, args);
});
G__7933.cljs$lang$arity$variadic = G__7933__delegate;
return G__7933;
})()
;
ep2 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return ep2__0.call(this);
case 1:
return ep2__1.call(this,x);
case 2:
return ep2__2.call(this,x,y);
case 3:
return ep2__3.call(this,x,y,z);
default:
return ep2__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
ep2.cljs$lang$maxFixedArity = 3;
ep2.cljs$lang$applyTo = ep2__4.cljs$lang$applyTo;
ep2.cljs$lang$arity$0 = ep2__0;
ep2.cljs$lang$arity$1 = ep2__1;
ep2.cljs$lang$arity$2 = ep2__2;
ep2.cljs$lang$arity$3 = ep2__3;
ep2.cljs$lang$arity$variadic = ep2__4.cljs$lang$arity$variadic;
return ep2;
})()
});
var every_pred__3 = (function (p1,p2,p3){
return (function() {
var ep3 = null;
var ep3__0 = (function (){
return true;
});
var ep3__1 = (function (x){
return cljs.core.boolean$.call(null,(function (){var and__3941__auto____7904 = p1.call(null,x);
if(cljs.core.truth_(and__3941__auto____7904))
{var and__3941__auto____7905 = p2.call(null,x);
if(cljs.core.truth_(and__3941__auto____7905))
{return p3.call(null,x);
} else
{return and__3941__auto____7905;
}
} else
{return and__3941__auto____7904;
}
})());
});
var ep3__2 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3941__auto____7906 = p1.call(null,x);
if(cljs.core.truth_(and__3941__auto____7906))
{var and__3941__auto____7907 = p2.call(null,x);
if(cljs.core.truth_(and__3941__auto____7907))
{var and__3941__auto____7908 = p3.call(null,x);
if(cljs.core.truth_(and__3941__auto____7908))
{var and__3941__auto____7909 = p1.call(null,y);
if(cljs.core.truth_(and__3941__auto____7909))
{var and__3941__auto____7910 = p2.call(null,y);
if(cljs.core.truth_(and__3941__auto____7910))
{return p3.call(null,y);
} else
{return and__3941__auto____7910;
}
} else
{return and__3941__auto____7909;
}
} else
{return and__3941__auto____7908;
}
} else
{return and__3941__auto____7907;
}
} else
{return and__3941__auto____7906;
}
})());
});
var ep3__3 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3941__auto____7911 = p1.call(null,x);
if(cljs.core.truth_(and__3941__auto____7911))
{var and__3941__auto____7912 = p2.call(null,x);
if(cljs.core.truth_(and__3941__auto____7912))
{var and__3941__auto____7913 = p3.call(null,x);
if(cljs.core.truth_(and__3941__auto____7913))
{var and__3941__auto____7914 = p1.call(null,y);
if(cljs.core.truth_(and__3941__auto____7914))
{var and__3941__auto____7915 = p2.call(null,y);
if(cljs.core.truth_(and__3941__auto____7915))
{var and__3941__auto____7916 = p3.call(null,y);
if(cljs.core.truth_(and__3941__auto____7916))
{var and__3941__auto____7917 = p1.call(null,z);
if(cljs.core.truth_(and__3941__auto____7917))
{var and__3941__auto____7918 = p2.call(null,z);
if(cljs.core.truth_(and__3941__auto____7918))
{return p3.call(null,z);
} else
{return and__3941__auto____7918;
}
} else
{return and__3941__auto____7917;
}
} else
{return and__3941__auto____7916;
}
} else
{return and__3941__auto____7915;
}
} else
{return and__3941__auto____7914;
}
} else
{return and__3941__auto____7913;
}
} else
{return and__3941__auto____7912;
}
} else
{return and__3941__auto____7911;
}
})());
});
var ep3__4 = (function() { 
var G__7935__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3941__auto____7919 = ep3.call(null,x,y,z);
if(cljs.core.truth_(and__3941__auto____7919))
{return cljs.core.every_QMARK_.call(null,(function (p1__7731_SHARP_){
var and__3941__auto____7920 = p1.call(null,p1__7731_SHARP_);
if(cljs.core.truth_(and__3941__auto____7920))
{var and__3941__auto____7921 = p2.call(null,p1__7731_SHARP_);
if(cljs.core.truth_(and__3941__auto____7921))
{return p3.call(null,p1__7731_SHARP_);
} else
{return and__3941__auto____7921;
}
} else
{return and__3941__auto____7920;
}
}),args);
} else
{return and__3941__auto____7919;
}
})());
};
var G__7935 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7935__delegate.call(this, x, y, z, args);
};
G__7935.cljs$lang$maxFixedArity = 3;
G__7935.cljs$lang$applyTo = (function (arglist__7936){
var x = cljs.core.first(arglist__7936);
var y = cljs.core.first(cljs.core.next(arglist__7936));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7936)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7936)));
return G__7935__delegate(x, y, z, args);
});
G__7935.cljs$lang$arity$variadic = G__7935__delegate;
return G__7935;
})()
;
ep3 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return ep3__0.call(this);
case 1:
return ep3__1.call(this,x);
case 2:
return ep3__2.call(this,x,y);
case 3:
return ep3__3.call(this,x,y,z);
default:
return ep3__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
ep3.cljs$lang$maxFixedArity = 3;
ep3.cljs$lang$applyTo = ep3__4.cljs$lang$applyTo;
ep3.cljs$lang$arity$0 = ep3__0;
ep3.cljs$lang$arity$1 = ep3__1;
ep3.cljs$lang$arity$2 = ep3__2;
ep3.cljs$lang$arity$3 = ep3__3;
ep3.cljs$lang$arity$variadic = ep3__4.cljs$lang$arity$variadic;
return ep3;
})()
});
var every_pred__4 = (function() { 
var G__7937__delegate = function (p1,p2,p3,ps){
var ps__7922 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);
return (function() {
var epn = null;
var epn__0 = (function (){
return true;
});
var epn__1 = (function (x){
return cljs.core.every_QMARK_.call(null,(function (p1__7732_SHARP_){
return p1__7732_SHARP_.call(null,x);
}),ps__7922);
});
var epn__2 = (function (x,y){
return cljs.core.every_QMARK_.call(null,(function (p1__7733_SHARP_){
var and__3941__auto____7927 = p1__7733_SHARP_.call(null,x);
if(cljs.core.truth_(and__3941__auto____7927))
{return p1__7733_SHARP_.call(null,y);
} else
{return and__3941__auto____7927;
}
}),ps__7922);
});
var epn__3 = (function (x,y,z){
return cljs.core.every_QMARK_.call(null,(function (p1__7734_SHARP_){
var and__3941__auto____7928 = p1__7734_SHARP_.call(null,x);
if(cljs.core.truth_(and__3941__auto____7928))
{var and__3941__auto____7929 = p1__7734_SHARP_.call(null,y);
if(cljs.core.truth_(and__3941__auto____7929))
{return p1__7734_SHARP_.call(null,z);
} else
{return and__3941__auto____7929;
}
} else
{return and__3941__auto____7928;
}
}),ps__7922);
});
var epn__4 = (function() { 
var G__7938__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3941__auto____7930 = epn.call(null,x,y,z);
if(cljs.core.truth_(and__3941__auto____7930))
{return cljs.core.every_QMARK_.call(null,(function (p1__7735_SHARP_){
return cljs.core.every_QMARK_.call(null,p1__7735_SHARP_,args);
}),ps__7922);
} else
{return and__3941__auto____7930;
}
})());
};
var G__7938 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7938__delegate.call(this, x, y, z, args);
};
G__7938.cljs$lang$maxFixedArity = 3;
G__7938.cljs$lang$applyTo = (function (arglist__7939){
var x = cljs.core.first(arglist__7939);
var y = cljs.core.first(cljs.core.next(arglist__7939));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7939)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7939)));
return G__7938__delegate(x, y, z, args);
});
G__7938.cljs$lang$arity$variadic = G__7938__delegate;
return G__7938;
})()
;
epn = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return epn__0.call(this);
case 1:
return epn__1.call(this,x);
case 2:
return epn__2.call(this,x,y);
case 3:
return epn__3.call(this,x,y,z);
default:
return epn__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
epn.cljs$lang$maxFixedArity = 3;
epn.cljs$lang$applyTo = epn__4.cljs$lang$applyTo;
epn.cljs$lang$arity$0 = epn__0;
epn.cljs$lang$arity$1 = epn__1;
epn.cljs$lang$arity$2 = epn__2;
epn.cljs$lang$arity$3 = epn__3;
epn.cljs$lang$arity$variadic = epn__4.cljs$lang$arity$variadic;
return epn;
})()
};
var G__7937 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__7937__delegate.call(this, p1, p2, p3, ps);
};
G__7937.cljs$lang$maxFixedArity = 3;
G__7937.cljs$lang$applyTo = (function (arglist__7940){
var p1 = cljs.core.first(arglist__7940);
var p2 = cljs.core.first(cljs.core.next(arglist__7940));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__7940)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__7940)));
return G__7937__delegate(p1, p2, p3, ps);
});
G__7937.cljs$lang$arity$variadic = G__7937__delegate;
return G__7937;
})()
;
every_pred = function(p1,p2,p3,var_args){
var ps = var_args;
switch(arguments.length){
case 1:
return every_pred__1.call(this,p1);
case 2:
return every_pred__2.call(this,p1,p2);
case 3:
return every_pred__3.call(this,p1,p2,p3);
default:
return every_pred__4.cljs$lang$arity$variadic(p1,p2,p3, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
every_pred.cljs$lang$maxFixedArity = 3;
every_pred.cljs$lang$applyTo = every_pred__4.cljs$lang$applyTo;
every_pred.cljs$lang$arity$1 = every_pred__1;
every_pred.cljs$lang$arity$2 = every_pred__2;
every_pred.cljs$lang$arity$3 = every_pred__3;
every_pred.cljs$lang$arity$variadic = every_pred__4.cljs$lang$arity$variadic;
return every_pred;
})()
;
/**
* Takes a set of predicates and returns a function f that returns the first logical true value
* returned by one of its composing predicates against any of its arguments, else it returns
* logical false. Note that f is short-circuiting in that it will stop execution on the first
* argument that triggers a logical true result against the original predicates.
* @param {...*} var_args
*/
cljs.core.some_fn = (function() {
var some_fn = null;
var some_fn__1 = (function (p){
return (function() {
var sp1 = null;
var sp1__0 = (function (){
return null;
});
var sp1__1 = (function (x){
return p.call(null,x);
});
var sp1__2 = (function (x,y){
var or__3943__auto____8021 = p.call(null,x);
if(cljs.core.truth_(or__3943__auto____8021))
{return or__3943__auto____8021;
} else
{return p.call(null,y);
}
});
var sp1__3 = (function (x,y,z){
var or__3943__auto____8022 = p.call(null,x);
if(cljs.core.truth_(or__3943__auto____8022))
{return or__3943__auto____8022;
} else
{var or__3943__auto____8023 = p.call(null,y);
if(cljs.core.truth_(or__3943__auto____8023))
{return or__3943__auto____8023;
} else
{return p.call(null,z);
}
}
});
var sp1__4 = (function() { 
var G__8092__delegate = function (x,y,z,args){
var or__3943__auto____8024 = sp1.call(null,x,y,z);
if(cljs.core.truth_(or__3943__auto____8024))
{return or__3943__auto____8024;
} else
{return cljs.core.some.call(null,p,args);
}
};
var G__8092 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8092__delegate.call(this, x, y, z, args);
};
G__8092.cljs$lang$maxFixedArity = 3;
G__8092.cljs$lang$applyTo = (function (arglist__8093){
var x = cljs.core.first(arglist__8093);
var y = cljs.core.first(cljs.core.next(arglist__8093));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8093)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8093)));
return G__8092__delegate(x, y, z, args);
});
G__8092.cljs$lang$arity$variadic = G__8092__delegate;
return G__8092;
})()
;
sp1 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return sp1__0.call(this);
case 1:
return sp1__1.call(this,x);
case 2:
return sp1__2.call(this,x,y);
case 3:
return sp1__3.call(this,x,y,z);
default:
return sp1__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
sp1.cljs$lang$maxFixedArity = 3;
sp1.cljs$lang$applyTo = sp1__4.cljs$lang$applyTo;
sp1.cljs$lang$arity$0 = sp1__0;
sp1.cljs$lang$arity$1 = sp1__1;
sp1.cljs$lang$arity$2 = sp1__2;
sp1.cljs$lang$arity$3 = sp1__3;
sp1.cljs$lang$arity$variadic = sp1__4.cljs$lang$arity$variadic;
return sp1;
})()
});
var some_fn__2 = (function (p1,p2){
return (function() {
var sp2 = null;
var sp2__0 = (function (){
return null;
});
var sp2__1 = (function (x){
var or__3943__auto____8036 = p1.call(null,x);
if(cljs.core.truth_(or__3943__auto____8036))
{return or__3943__auto____8036;
} else
{return p2.call(null,x);
}
});
var sp2__2 = (function (x,y){
var or__3943__auto____8037 = p1.call(null,x);
if(cljs.core.truth_(or__3943__auto____8037))
{return or__3943__auto____8037;
} else
{var or__3943__auto____8038 = p1.call(null,y);
if(cljs.core.truth_(or__3943__auto____8038))
{return or__3943__auto____8038;
} else
{var or__3943__auto____8039 = p2.call(null,x);
if(cljs.core.truth_(or__3943__auto____8039))
{return or__3943__auto____8039;
} else
{return p2.call(null,y);
}
}
}
});
var sp2__3 = (function (x,y,z){
var or__3943__auto____8040 = p1.call(null,x);
if(cljs.core.truth_(or__3943__auto____8040))
{return or__3943__auto____8040;
} else
{var or__3943__auto____8041 = p1.call(null,y);
if(cljs.core.truth_(or__3943__auto____8041))
{return or__3943__auto____8041;
} else
{var or__3943__auto____8042 = p1.call(null,z);
if(cljs.core.truth_(or__3943__auto____8042))
{return or__3943__auto____8042;
} else
{var or__3943__auto____8043 = p2.call(null,x);
if(cljs.core.truth_(or__3943__auto____8043))
{return or__3943__auto____8043;
} else
{var or__3943__auto____8044 = p2.call(null,y);
if(cljs.core.truth_(or__3943__auto____8044))
{return or__3943__auto____8044;
} else
{return p2.call(null,z);
}
}
}
}
}
});
var sp2__4 = (function() { 
var G__8094__delegate = function (x,y,z,args){
var or__3943__auto____8045 = sp2.call(null,x,y,z);
if(cljs.core.truth_(or__3943__auto____8045))
{return or__3943__auto____8045;
} else
{return cljs.core.some.call(null,(function (p1__7775_SHARP_){
var or__3943__auto____8046 = p1.call(null,p1__7775_SHARP_);
if(cljs.core.truth_(or__3943__auto____8046))
{return or__3943__auto____8046;
} else
{return p2.call(null,p1__7775_SHARP_);
}
}),args);
}
};
var G__8094 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8094__delegate.call(this, x, y, z, args);
};
G__8094.cljs$lang$maxFixedArity = 3;
G__8094.cljs$lang$applyTo = (function (arglist__8095){
var x = cljs.core.first(arglist__8095);
var y = cljs.core.first(cljs.core.next(arglist__8095));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8095)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8095)));
return G__8094__delegate(x, y, z, args);
});
G__8094.cljs$lang$arity$variadic = G__8094__delegate;
return G__8094;
})()
;
sp2 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return sp2__0.call(this);
case 1:
return sp2__1.call(this,x);
case 2:
return sp2__2.call(this,x,y);
case 3:
return sp2__3.call(this,x,y,z);
default:
return sp2__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
sp2.cljs$lang$maxFixedArity = 3;
sp2.cljs$lang$applyTo = sp2__4.cljs$lang$applyTo;
sp2.cljs$lang$arity$0 = sp2__0;
sp2.cljs$lang$arity$1 = sp2__1;
sp2.cljs$lang$arity$2 = sp2__2;
sp2.cljs$lang$arity$3 = sp2__3;
sp2.cljs$lang$arity$variadic = sp2__4.cljs$lang$arity$variadic;
return sp2;
})()
});
var some_fn__3 = (function (p1,p2,p3){
return (function() {
var sp3 = null;
var sp3__0 = (function (){
return null;
});
var sp3__1 = (function (x){
var or__3943__auto____8065 = p1.call(null,x);
if(cljs.core.truth_(or__3943__auto____8065))
{return or__3943__auto____8065;
} else
{var or__3943__auto____8066 = p2.call(null,x);
if(cljs.core.truth_(or__3943__auto____8066))
{return or__3943__auto____8066;
} else
{return p3.call(null,x);
}
}
});
var sp3__2 = (function (x,y){
var or__3943__auto____8067 = p1.call(null,x);
if(cljs.core.truth_(or__3943__auto____8067))
{return or__3943__auto____8067;
} else
{var or__3943__auto____8068 = p2.call(null,x);
if(cljs.core.truth_(or__3943__auto____8068))
{return or__3943__auto____8068;
} else
{var or__3943__auto____8069 = p3.call(null,x);
if(cljs.core.truth_(or__3943__auto____8069))
{return or__3943__auto____8069;
} else
{var or__3943__auto____8070 = p1.call(null,y);
if(cljs.core.truth_(or__3943__auto____8070))
{return or__3943__auto____8070;
} else
{var or__3943__auto____8071 = p2.call(null,y);
if(cljs.core.truth_(or__3943__auto____8071))
{return or__3943__auto____8071;
} else
{return p3.call(null,y);
}
}
}
}
}
});
var sp3__3 = (function (x,y,z){
var or__3943__auto____8072 = p1.call(null,x);
if(cljs.core.truth_(or__3943__auto____8072))
{return or__3943__auto____8072;
} else
{var or__3943__auto____8073 = p2.call(null,x);
if(cljs.core.truth_(or__3943__auto____8073))
{return or__3943__auto____8073;
} else
{var or__3943__auto____8074 = p3.call(null,x);
if(cljs.core.truth_(or__3943__auto____8074))
{return or__3943__auto____8074;
} else
{var or__3943__auto____8075 = p1.call(null,y);
if(cljs.core.truth_(or__3943__auto____8075))
{return or__3943__auto____8075;
} else
{var or__3943__auto____8076 = p2.call(null,y);
if(cljs.core.truth_(or__3943__auto____8076))
{return or__3943__auto____8076;
} else
{var or__3943__auto____8077 = p3.call(null,y);
if(cljs.core.truth_(or__3943__auto____8077))
{return or__3943__auto____8077;
} else
{var or__3943__auto____8078 = p1.call(null,z);
if(cljs.core.truth_(or__3943__auto____8078))
{return or__3943__auto____8078;
} else
{var or__3943__auto____8079 = p2.call(null,z);
if(cljs.core.truth_(or__3943__auto____8079))
{return or__3943__auto____8079;
} else
{return p3.call(null,z);
}
}
}
}
}
}
}
}
});
var sp3__4 = (function() { 
var G__8096__delegate = function (x,y,z,args){
var or__3943__auto____8080 = sp3.call(null,x,y,z);
if(cljs.core.truth_(or__3943__auto____8080))
{return or__3943__auto____8080;
} else
{return cljs.core.some.call(null,(function (p1__7776_SHARP_){
var or__3943__auto____8081 = p1.call(null,p1__7776_SHARP_);
if(cljs.core.truth_(or__3943__auto____8081))
{return or__3943__auto____8081;
} else
{var or__3943__auto____8082 = p2.call(null,p1__7776_SHARP_);
if(cljs.core.truth_(or__3943__auto____8082))
{return or__3943__auto____8082;
} else
{return p3.call(null,p1__7776_SHARP_);
}
}
}),args);
}
};
var G__8096 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8096__delegate.call(this, x, y, z, args);
};
G__8096.cljs$lang$maxFixedArity = 3;
G__8096.cljs$lang$applyTo = (function (arglist__8097){
var x = cljs.core.first(arglist__8097);
var y = cljs.core.first(cljs.core.next(arglist__8097));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8097)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8097)));
return G__8096__delegate(x, y, z, args);
});
G__8096.cljs$lang$arity$variadic = G__8096__delegate;
return G__8096;
})()
;
sp3 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return sp3__0.call(this);
case 1:
return sp3__1.call(this,x);
case 2:
return sp3__2.call(this,x,y);
case 3:
return sp3__3.call(this,x,y,z);
default:
return sp3__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
sp3.cljs$lang$maxFixedArity = 3;
sp3.cljs$lang$applyTo = sp3__4.cljs$lang$applyTo;
sp3.cljs$lang$arity$0 = sp3__0;
sp3.cljs$lang$arity$1 = sp3__1;
sp3.cljs$lang$arity$2 = sp3__2;
sp3.cljs$lang$arity$3 = sp3__3;
sp3.cljs$lang$arity$variadic = sp3__4.cljs$lang$arity$variadic;
return sp3;
})()
});
var some_fn__4 = (function() { 
var G__8098__delegate = function (p1,p2,p3,ps){
var ps__8083 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);
return (function() {
var spn = null;
var spn__0 = (function (){
return null;
});
var spn__1 = (function (x){
return cljs.core.some.call(null,(function (p1__7777_SHARP_){
return p1__7777_SHARP_.call(null,x);
}),ps__8083);
});
var spn__2 = (function (x,y){
return cljs.core.some.call(null,(function (p1__7778_SHARP_){
var or__3943__auto____8088 = p1__7778_SHARP_.call(null,x);
if(cljs.core.truth_(or__3943__auto____8088))
{return or__3943__auto____8088;
} else
{return p1__7778_SHARP_.call(null,y);
}
}),ps__8083);
});
var spn__3 = (function (x,y,z){
return cljs.core.some.call(null,(function (p1__7779_SHARP_){
var or__3943__auto____8089 = p1__7779_SHARP_.call(null,x);
if(cljs.core.truth_(or__3943__auto____8089))
{return or__3943__auto____8089;
} else
{var or__3943__auto____8090 = p1__7779_SHARP_.call(null,y);
if(cljs.core.truth_(or__3943__auto____8090))
{return or__3943__auto____8090;
} else
{return p1__7779_SHARP_.call(null,z);
}
}
}),ps__8083);
});
var spn__4 = (function() { 
var G__8099__delegate = function (x,y,z,args){
var or__3943__auto____8091 = spn.call(null,x,y,z);
if(cljs.core.truth_(or__3943__auto____8091))
{return or__3943__auto____8091;
} else
{return cljs.core.some.call(null,(function (p1__7780_SHARP_){
return cljs.core.some.call(null,p1__7780_SHARP_,args);
}),ps__8083);
}
};
var G__8099 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8099__delegate.call(this, x, y, z, args);
};
G__8099.cljs$lang$maxFixedArity = 3;
G__8099.cljs$lang$applyTo = (function (arglist__8100){
var x = cljs.core.first(arglist__8100);
var y = cljs.core.first(cljs.core.next(arglist__8100));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8100)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8100)));
return G__8099__delegate(x, y, z, args);
});
G__8099.cljs$lang$arity$variadic = G__8099__delegate;
return G__8099;
})()
;
spn = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return spn__0.call(this);
case 1:
return spn__1.call(this,x);
case 2:
return spn__2.call(this,x,y);
case 3:
return spn__3.call(this,x,y,z);
default:
return spn__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
spn.cljs$lang$maxFixedArity = 3;
spn.cljs$lang$applyTo = spn__4.cljs$lang$applyTo;
spn.cljs$lang$arity$0 = spn__0;
spn.cljs$lang$arity$1 = spn__1;
spn.cljs$lang$arity$2 = spn__2;
spn.cljs$lang$arity$3 = spn__3;
spn.cljs$lang$arity$variadic = spn__4.cljs$lang$arity$variadic;
return spn;
})()
};
var G__8098 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__8098__delegate.call(this, p1, p2, p3, ps);
};
G__8098.cljs$lang$maxFixedArity = 3;
G__8098.cljs$lang$applyTo = (function (arglist__8101){
var p1 = cljs.core.first(arglist__8101);
var p2 = cljs.core.first(cljs.core.next(arglist__8101));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8101)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8101)));
return G__8098__delegate(p1, p2, p3, ps);
});
G__8098.cljs$lang$arity$variadic = G__8098__delegate;
return G__8098;
})()
;
some_fn = function(p1,p2,p3,var_args){
var ps = var_args;
switch(arguments.length){
case 1:
return some_fn__1.call(this,p1);
case 2:
return some_fn__2.call(this,p1,p2);
case 3:
return some_fn__3.call(this,p1,p2,p3);
default:
return some_fn__4.cljs$lang$arity$variadic(p1,p2,p3, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
some_fn.cljs$lang$maxFixedArity = 3;
some_fn.cljs$lang$applyTo = some_fn__4.cljs$lang$applyTo;
some_fn.cljs$lang$arity$1 = some_fn__1;
some_fn.cljs$lang$arity$2 = some_fn__2;
some_fn.cljs$lang$arity$3 = some_fn__3;
some_fn.cljs$lang$arity$variadic = some_fn__4.cljs$lang$arity$variadic;
return some_fn;
})()
;
/**
* Returns a lazy sequence consisting of the result of applying f to the
* set of first items of each coll, followed by applying f to the set
* of second items in each coll, until any one of the colls is
* exhausted.  Any remaining items in other colls are ignored. Function
* f should accept number-of-colls arguments.
* @param {...*} var_args
*/
cljs.core.map = (function() {
var map = null;
var map__2 = (function (f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__4092__auto____8120 = cljs.core.seq.call(null,coll);
if(temp__4092__auto____8120)
{var s__8121 = temp__4092__auto____8120;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8121))
{var c__8122 = cljs.core.chunk_first.call(null,s__8121);
var size__8123 = cljs.core.count.call(null,c__8122);
var b__8124 = cljs.core.chunk_buffer.call(null,size__8123);
var n__2612__auto____8125 = size__8123;
var i__8126 = 0;
while(true){
if((i__8126 < n__2612__auto____8125))
{cljs.core.chunk_append.call(null,b__8124,f.call(null,cljs.core._nth.call(null,c__8122,i__8126)));
{
var G__8138 = (i__8126 + 1);
i__8126 = G__8138;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8124),map.call(null,f,cljs.core.chunk_rest.call(null,s__8121)));
} else
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s__8121)),map.call(null,f,cljs.core.rest.call(null,s__8121)));
}
} else
{return null;
}
}),null));
});
var map__3 = (function (f,c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__8127 = cljs.core.seq.call(null,c1);
var s2__8128 = cljs.core.seq.call(null,c2);
if((function (){var and__3941__auto____8129 = s1__8127;
if(and__3941__auto____8129)
{return s2__8128;
} else
{return and__3941__auto____8129;
}
})())
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__8127),cljs.core.first.call(null,s2__8128)),map.call(null,f,cljs.core.rest.call(null,s1__8127),cljs.core.rest.call(null,s2__8128)));
} else
{return null;
}
}),null));
});
var map__4 = (function (f,c1,c2,c3){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__8130 = cljs.core.seq.call(null,c1);
var s2__8131 = cljs.core.seq.call(null,c2);
var s3__8132 = cljs.core.seq.call(null,c3);
if((function (){var and__3941__auto____8133 = s1__8130;
if(and__3941__auto____8133)
{var and__3941__auto____8134 = s2__8131;
if(and__3941__auto____8134)
{return s3__8132;
} else
{return and__3941__auto____8134;
}
} else
{return and__3941__auto____8133;
}
})())
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__8130),cljs.core.first.call(null,s2__8131),cljs.core.first.call(null,s3__8132)),map.call(null,f,cljs.core.rest.call(null,s1__8130),cljs.core.rest.call(null,s2__8131),cljs.core.rest.call(null,s3__8132)));
} else
{return null;
}
}),null));
});
var map__5 = (function() { 
var G__8139__delegate = function (f,c1,c2,c3,colls){
var step__8137 = (function step(cs){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__8136 = map.call(null,cljs.core.seq,cs);
if(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__8136))
{return cljs.core.cons.call(null,map.call(null,cljs.core.first,ss__8136),step.call(null,map.call(null,cljs.core.rest,ss__8136)));
} else
{return null;
}
}),null));
});
return map.call(null,(function (p1__7941_SHARP_){
return cljs.core.apply.call(null,f,p1__7941_SHARP_);
}),step__8137.call(null,cljs.core.conj.call(null,colls,c3,c2,c1)));
};
var G__8139 = function (f,c1,c2,c3,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__8139__delegate.call(this, f, c1, c2, c3, colls);
};
G__8139.cljs$lang$maxFixedArity = 4;
G__8139.cljs$lang$applyTo = (function (arglist__8140){
var f = cljs.core.first(arglist__8140);
var c1 = cljs.core.first(cljs.core.next(arglist__8140));
var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8140)));
var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8140))));
var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8140))));
return G__8139__delegate(f, c1, c2, c3, colls);
});
G__8139.cljs$lang$arity$variadic = G__8139__delegate;
return G__8139;
})()
;
map = function(f,c1,c2,c3,var_args){
var colls = var_args;
switch(arguments.length){
case 2:
return map__2.call(this,f,c1);
case 3:
return map__3.call(this,f,c1,c2);
case 4:
return map__4.call(this,f,c1,c2,c3);
default:
return map__5.cljs$lang$arity$variadic(f,c1,c2,c3, cljs.core.array_seq(arguments, 4));
}
throw('Invalid arity: ' + arguments.length);
};
map.cljs$lang$maxFixedArity = 4;
map.cljs$lang$applyTo = map__5.cljs$lang$applyTo;
map.cljs$lang$arity$2 = map__2;
map.cljs$lang$arity$3 = map__3;
map.cljs$lang$arity$4 = map__4;
map.cljs$lang$arity$variadic = map__5.cljs$lang$arity$variadic;
return map;
})()
;
/**
* Returns a lazy sequence of the first n items in coll, or all items if
* there are fewer than n.
*/
cljs.core.take = (function take(n,coll){
return (new cljs.core.LazySeq(null,false,(function (){
if((n > 0))
{var temp__4092__auto____8143 = cljs.core.seq.call(null,coll);
if(temp__4092__auto____8143)
{var s__8144 = temp__4092__auto____8143;
return cljs.core.cons.call(null,cljs.core.first.call(null,s__8144),take.call(null,(n - 1),cljs.core.rest.call(null,s__8144)));
} else
{return null;
}
} else
{return null;
}
}),null));
});
/**
* Returns a lazy sequence of all but the first n items in coll.
*/
cljs.core.drop = (function drop(n,coll){
var step__8150 = (function (n,coll){
while(true){
var s__8148 = cljs.core.seq.call(null,coll);
if(cljs.core.truth_((function (){var and__3941__auto____8149 = (n > 0);
if(and__3941__auto____8149)
{return s__8148;
} else
{return and__3941__auto____8149;
}
})()))
{{
var G__8151 = (n - 1);
var G__8152 = cljs.core.rest.call(null,s__8148);
n = G__8151;
coll = G__8152;
continue;
}
} else
{return s__8148;
}
break;
}
});
return (new cljs.core.LazySeq(null,false,(function (){
return step__8150.call(null,n,coll);
}),null));
});
/**
* Return a lazy sequence of all but the last n (default 1) items in coll
*/
cljs.core.drop_last = (function() {
var drop_last = null;
var drop_last__1 = (function (s){
return drop_last.call(null,1,s);
});
var drop_last__2 = (function (n,s){
return cljs.core.map.call(null,(function (x,_){
return x;
}),s,cljs.core.drop.call(null,n,s));
});
drop_last = function(n,s){
switch(arguments.length){
case 1:
return drop_last__1.call(this,n);
case 2:
return drop_last__2.call(this,n,s);
}
throw('Invalid arity: ' + arguments.length);
};
drop_last.cljs$lang$arity$1 = drop_last__1;
drop_last.cljs$lang$arity$2 = drop_last__2;
return drop_last;
})()
;
/**
* Returns a seq of the last n items in coll.  Depending on the type
* of coll may be no better than linear time.  For vectors, see also subvec.
*/
cljs.core.take_last = (function take_last(n,coll){
var s__8155 = cljs.core.seq.call(null,coll);
var lead__8156 = cljs.core.seq.call(null,cljs.core.drop.call(null,n,coll));
while(true){
if(lead__8156)
{{
var G__8157 = cljs.core.next.call(null,s__8155);
var G__8158 = cljs.core.next.call(null,lead__8156);
s__8155 = G__8157;
lead__8156 = G__8158;
continue;
}
} else
{return s__8155;
}
break;
}
});
/**
* Returns a lazy sequence of the items in coll starting from the first
* item for which (pred item) returns nil.
*/
cljs.core.drop_while = (function drop_while(pred,coll){
var step__8164 = (function (pred,coll){
while(true){
var s__8162 = cljs.core.seq.call(null,coll);
if(cljs.core.truth_((function (){var and__3941__auto____8163 = s__8162;
if(and__3941__auto____8163)
{return pred.call(null,cljs.core.first.call(null,s__8162));
} else
{return and__3941__auto____8163;
}
})()))
{{
var G__8165 = pred;
var G__8166 = cljs.core.rest.call(null,s__8162);
pred = G__8165;
coll = G__8166;
continue;
}
} else
{return s__8162;
}
break;
}
});
return (new cljs.core.LazySeq(null,false,(function (){
return step__8164.call(null,pred,coll);
}),null));
});
/**
* Returns a lazy (infinite!) sequence of repetitions of the items in coll.
*/
cljs.core.cycle = (function cycle(coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__4092__auto____8169 = cljs.core.seq.call(null,coll);
if(temp__4092__auto____8169)
{var s__8170 = temp__4092__auto____8169;
return cljs.core.concat.call(null,s__8170,cycle.call(null,s__8170));
} else
{return null;
}
}),null));
});
/**
* Returns a vector of [(take n coll) (drop n coll)]
*/
cljs.core.split_at = (function split_at(n,coll){
return cljs.core.PersistentVector.fromArray([cljs.core.take.call(null,n,coll),cljs.core.drop.call(null,n,coll)], true);
});
/**
* Returns a lazy (infinite!, or length n if supplied) sequence of xs.
*/
cljs.core.repeat = (function() {
var repeat = null;
var repeat__1 = (function (x){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,x,repeat.call(null,x));
}),null));
});
var repeat__2 = (function (n,x){
return cljs.core.take.call(null,n,repeat.call(null,x));
});
repeat = function(n,x){
switch(arguments.length){
case 1:
return repeat__1.call(this,n);
case 2:
return repeat__2.call(this,n,x);
}
throw('Invalid arity: ' + arguments.length);
};
repeat.cljs$lang$arity$1 = repeat__1;
repeat.cljs$lang$arity$2 = repeat__2;
return repeat;
})()
;
/**
* Returns a lazy seq of n xs.
*/
cljs.core.replicate = (function replicate(n,x){
return cljs.core.take.call(null,n,cljs.core.repeat.call(null,x));
});
/**
* Takes a function of no args, presumably with side effects, and
* returns an infinite (or length n if supplied) lazy sequence of calls
* to it
*/
cljs.core.repeatedly = (function() {
var repeatedly = null;
var repeatedly__1 = (function (f){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,f.call(null),repeatedly.call(null,f));
}),null));
});
var repeatedly__2 = (function (n,f){
return cljs.core.take.call(null,n,repeatedly.call(null,f));
});
repeatedly = function(n,f){
switch(arguments.length){
case 1:
return repeatedly__1.call(this,n);
case 2:
return repeatedly__2.call(this,n,f);
}
throw('Invalid arity: ' + arguments.length);
};
repeatedly.cljs$lang$arity$1 = repeatedly__1;
repeatedly.cljs$lang$arity$2 = repeatedly__2;
return repeatedly;
})()
;
/**
* Returns a lazy sequence of x, (f x), (f (f x)) etc. f must be free of side-effects
*/
cljs.core.iterate = (function iterate(f,x){
return cljs.core.cons.call(null,x,(new cljs.core.LazySeq(null,false,(function (){
return iterate.call(null,f,f.call(null,x));
}),null)));
});
/**
* Returns a lazy seq of the first item in each coll, then the second etc.
* @param {...*} var_args
*/
cljs.core.interleave = (function() {
var interleave = null;
var interleave__2 = (function (c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__8175 = cljs.core.seq.call(null,c1);
var s2__8176 = cljs.core.seq.call(null,c2);
if((function (){var and__3941__auto____8177 = s1__8175;
if(and__3941__auto____8177)
{return s2__8176;
} else
{return and__3941__auto____8177;
}
})())
{return cljs.core.cons.call(null,cljs.core.first.call(null,s1__8175),cljs.core.cons.call(null,cljs.core.first.call(null,s2__8176),interleave.call(null,cljs.core.rest.call(null,s1__8175),cljs.core.rest.call(null,s2__8176))));
} else
{return null;
}
}),null));
});
var interleave__3 = (function() { 
var G__8179__delegate = function (c1,c2,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__8178 = cljs.core.map.call(null,cljs.core.seq,cljs.core.conj.call(null,colls,c2,c1));
if(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__8178))
{return cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.first,ss__8178),cljs.core.apply.call(null,interleave,cljs.core.map.call(null,cljs.core.rest,ss__8178)));
} else
{return null;
}
}),null));
};
var G__8179 = function (c1,c2,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8179__delegate.call(this, c1, c2, colls);
};
G__8179.cljs$lang$maxFixedArity = 2;
G__8179.cljs$lang$applyTo = (function (arglist__8180){
var c1 = cljs.core.first(arglist__8180);
var c2 = cljs.core.first(cljs.core.next(arglist__8180));
var colls = cljs.core.rest(cljs.core.next(arglist__8180));
return G__8179__delegate(c1, c2, colls);
});
G__8179.cljs$lang$arity$variadic = G__8179__delegate;
return G__8179;
})()
;
interleave = function(c1,c2,var_args){
var colls = var_args;
switch(arguments.length){
case 2:
return interleave__2.call(this,c1,c2);
default:
return interleave__3.cljs$lang$arity$variadic(c1,c2, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
interleave.cljs$lang$maxFixedArity = 2;
interleave.cljs$lang$applyTo = interleave__3.cljs$lang$applyTo;
interleave.cljs$lang$arity$2 = interleave__2;
interleave.cljs$lang$arity$variadic = interleave__3.cljs$lang$arity$variadic;
return interleave;
})()
;
/**
* Returns a lazy seq of the elements of coll separated by sep
*/
cljs.core.interpose = (function interpose(sep,coll){
return cljs.core.drop.call(null,1,cljs.core.interleave.call(null,cljs.core.repeat.call(null,sep),coll));
});
/**
* Take a collection of collections, and return a lazy seq
* of items from the inner collection
*/
cljs.core.flatten1 = (function flatten1(colls){
var cat__8190 = (function cat(coll,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__4090__auto____8188 = cljs.core.seq.call(null,coll);
if(temp__4090__auto____8188)
{var coll__8189 = temp__4090__auto____8188;
return cljs.core.cons.call(null,cljs.core.first.call(null,coll__8189),cat.call(null,cljs.core.rest.call(null,coll__8189),colls));
} else
{if(cljs.core.seq.call(null,colls))
{return cat.call(null,cljs.core.first.call(null,colls),cljs.core.rest.call(null,colls));
} else
{return null;
}
}
}),null));
});
return cat__8190.call(null,null,colls);
});
/**
* Returns the result of applying concat to the result of applying map
* to f and colls.  Thus function f should return a collection.
* @param {...*} var_args
*/
cljs.core.mapcat = (function() {
var mapcat = null;
var mapcat__2 = (function (f,coll){
return cljs.core.flatten1.call(null,cljs.core.map.call(null,f,coll));
});
var mapcat__3 = (function() { 
var G__8191__delegate = function (f,coll,colls){
return cljs.core.flatten1.call(null,cljs.core.apply.call(null,cljs.core.map,f,coll,colls));
};
var G__8191 = function (f,coll,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__8191__delegate.call(this, f, coll, colls);
};
G__8191.cljs$lang$maxFixedArity = 2;
G__8191.cljs$lang$applyTo = (function (arglist__8192){
var f = cljs.core.first(arglist__8192);
var coll = cljs.core.first(cljs.core.next(arglist__8192));
var colls = cljs.core.rest(cljs.core.next(arglist__8192));
return G__8191__delegate(f, coll, colls);
});
G__8191.cljs$lang$arity$variadic = G__8191__delegate;
return G__8191;
})()
;
mapcat = function(f,coll,var_args){
var colls = var_args;
switch(arguments.length){
case 2:
return mapcat__2.call(this,f,coll);
default:
return mapcat__3.cljs$lang$arity$variadic(f,coll, cljs.core.array_seq(arguments, 2));
}
throw('Invalid arity: ' + arguments.length);
};
mapcat.cljs$lang$maxFixedArity = 2;
mapcat.cljs$lang$applyTo = mapcat__3.cljs$lang$applyTo;
mapcat.cljs$lang$arity$2 = mapcat__2;
mapcat.cljs$lang$arity$variadic = mapcat__3.cljs$lang$arity$variadic;
return mapcat;
})()
;
/**
* Returns a lazy sequence of the items in coll for which
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.filter = (function filter(pred,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__4092__auto____8202 = cljs.core.seq.call(null,coll);
if(temp__4092__auto____8202)
{var s__8203 = temp__4092__auto____8202;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8203))
{var c__8204 = cljs.core.chunk_first.call(null,s__8203);
var size__8205 = cljs.core.count.call(null,c__8204);
var b__8206 = cljs.core.chunk_buffer.call(null,size__8205);
var n__2612__auto____8207 = size__8205;
var i__8208 = 0;
while(true){
if((i__8208 < n__2612__auto____8207))
{if(cljs.core.truth_(pred.call(null,cljs.core._nth.call(null,c__8204,i__8208))))
{cljs.core.chunk_append.call(null,b__8206,cljs.core._nth.call(null,c__8204,i__8208));
} else
{}
{
var G__8211 = (i__8208 + 1);
i__8208 = G__8211;
continue;
}
} else
{}
break;
}
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8206),filter.call(null,pred,cljs.core.chunk_rest.call(null,s__8203)));
} else
{var f__8209 = cljs.core.first.call(null,s__8203);
var r__8210 = cljs.core.rest.call(null,s__8203);
if(cljs.core.truth_(pred.call(null,f__8209)))
{return cljs.core.cons.call(null,f__8209,filter.call(null,pred,r__8210));
} else
{return filter.call(null,pred,r__8210);
}
}
} else
{return null;
}
}),null));
});
/**
* Returns a lazy sequence of the items in coll for which
* (pred item) returns false. pred must be free of side-effects.
*/
cljs.core.remove = (function remove(pred,coll){
return cljs.core.filter.call(null,cljs.core.complement.call(null,pred),coll);
});
/**
* Returns a lazy sequence of the nodes in a tree, via a depth-first walk.
* branch? must be a fn of one arg that returns true if passed a node
* that can have children (but may not).  children must be a fn of one
* arg that returns a sequence of the children. Will only be called on
* nodes for which branch? returns true. Root is the root node of the
* tree.
*/
cljs.core.tree_seq = (function tree_seq(branch_QMARK_,children,root){
var walk__8214 = (function walk(node){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,node,(cljs.core.truth_(branch_QMARK_.call(null,node))?cljs.core.mapcat.call(null,walk,children.call(null,node)):null));
}),null));
});
return walk__8214.call(null,root);
});
/**
* Takes any nested combination of sequential things (lists, vectors,
* etc.) and returns their contents as a single, flat sequence.
* (flatten nil) returns nil.
*/
cljs.core.flatten = (function flatten(x){
return cljs.core.filter.call(null,(function (p1__8212_SHARP_){
return !(cljs.core.sequential_QMARK_.call(null,p1__8212_SHARP_));
}),cljs.core.rest.call(null,cljs.core.tree_seq.call(null,cljs.core.sequential_QMARK_,cljs.core.seq,x)));
});
/**
* Returns a new coll consisting of to-coll with all of the items of
* from-coll conjoined.
*/
cljs.core.into = (function into(to,from){
if((function (){var G__8218__8219 = to;
if(G__8218__8219)
{if((function (){var or__3943__auto____8220 = (G__8218__8219.cljs$lang$protocol_mask$partition1$ & 4);
if(or__3943__auto____8220)
{return or__3943__auto____8220;
} else
{return G__8218__8219.cljs$core$IEditableCollection$;
}
})())
{return true;
} else
{if((!G__8218__8219.cljs$lang$protocol_mask$partition1$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IEditableCollection,G__8218__8219);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IEditableCollection,G__8218__8219);
}
})())
{return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,cljs.core._conj_BANG_,cljs.core.transient$.call(null,to),from));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,to,from);
}
});
/**
* Returns a vector consisting of the result of applying f to the
* set of first items of each coll, followed by applying f to the set
* of second items in each coll, until any one of the colls is
* exhausted.  Any remaining items in other colls are ignored. Function
* f should accept number-of-colls arguments.
* @param {...*} var_args
*/
cljs.core.mapv = (function() {
var mapv = null;
var mapv__2 = (function (f,coll){
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,(function (v,o){
return cljs.core.conj_BANG_.call(null,v,f.call(null,o));
}),cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY),coll));
});
var mapv__3 = (function (f,c1,c2){
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.map.call(null,f,c1,c2));
});
var mapv__4 = (function (f,c1,c2,c3){
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.map.call(null,f,c1,c2,c3));
});
var mapv__5 = (function() { 
var G__8221__delegate = function (f,c1,c2,c3,colls){
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.apply.call(null,cljs.core.map,f,c1,c2,c3,colls));
};
var G__8221 = function (f,c1,c2,c3,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__8221__delegate.call(this, f, c1, c2, c3, colls);
};
G__8221.cljs$lang$maxFixedArity = 4;
G__8221.cljs$lang$applyTo = (function (arglist__8222){
var f = cljs.core.first(arglist__8222);
var c1 = cljs.core.first(cljs.core.next(arglist__8222));
var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8222)));
var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8222))));
var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__8222))));
return G__8221__delegate(f, c1, c2, c3, colls);
});
G__8221.cljs$lang$arity$variadic = G__8221__delegate;
return G__8221;
})()
;
mapv = function(f,c1,c2,c3,var_args){
var colls = var_args;
switch(arguments.length){
case 2:
return mapv__2.call(this,f,c1);
case 3:
return mapv__3.call(this,f,c1,c2);
case 4:
return mapv__4.call(this,f,c1,c2,c3);
default:
return mapv__5.cljs$lang$arity$variadic(f,c1,c2,c3, cljs.core.array_seq(arguments, 4));
}
throw('Invalid arity: ' + arguments.length);
};
mapv.cljs$lang$maxFixedArity = 4;
mapv.cljs$lang$applyTo = mapv__5.cljs$lang$applyTo;
mapv.cljs$lang$arity$2 = mapv__2;
mapv.cljs$lang$arity$3 = mapv__3;
mapv.cljs$lang$arity$4 = mapv__4;
mapv.cljs$lang$arity$variadic = mapv__5.cljs$lang$arity$variadic;
return mapv;
})()
;
/**
* Returns a vector of the items in coll for which
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.filterv = (function filterv(pred,coll){
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,(function (v,o){
if(cljs.core.truth_(pred.call(null,o)))
{return cljs.core.conj_BANG_.call(null,v,o);
} else
{return v;
}
}),cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY),coll));
});
/**
* Returns a lazy sequence of lists of n items each, at offsets step
* apart. If step is not supplied, defaults to n, i.e. the partitions
* do not overlap. If a pad collection is supplied, use its elements as
* necessary to complete last partition upto n items. In case there are
* not enough padding elements, return a partition with less than n items.
*/
cljs.core.partition = (function() {
var partition = null;
var partition__2 = (function (n,coll){
return partition.call(null,n,n,coll);
});
var partition__3 = (function (n,step,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__4092__auto____8229 = cljs.core.seq.call(null,coll);
if(temp__4092__auto____8229)
{var s__8230 = temp__4092__auto____8229;
var p__8231 = cljs.core.take.call(null,n,s__8230);
if((n === cljs.core.count.call(null,p__8231)))
{return cljs.core.cons.call(null,p__8231,partition.call(null,n,step,cljs.core.drop.call(null,step,s__8230)));
} else
{return null;
}
} else
{return null;
}
}),null));
});
var partition__4 = (function (n,step,pad,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__4092__auto____8232 = cljs.core.seq.call(null,coll);
if(temp__4092__auto____8232)
{var s__8233 = temp__4092__auto____8232;
var p__8234 = cljs.core.take.call(null,n,s__8233);
if((n === cljs.core.count.call(null,p__8234)))
{return cljs.core.cons.call(null,p__8234,partition.call(null,n,step,pad,cljs.core.drop.call(null,step,s__8233)));
} else
{return cljs.core.list.call(null,cljs.core.take.call(null,n,cljs.core.concat.call(null,p__8234,pad)));
}
} else
{return null;
}
}),null));
});
partition = function(n,step,pad,coll){
switch(arguments.length){
case 2:
return partition__2.call(this,n,step);
case 3:
return partition__3.call(this,n,step,pad);
case 4:
return partition__4.call(this,n,step,pad,coll);
}
throw('Invalid arity: ' + arguments.length);
};
partition.cljs$lang$arity$2 = partition__2;
partition.cljs$lang$arity$3 = partition__3;
partition.cljs$lang$arity$4 = partition__4;
return partition;
})()
;
/**
* Returns the value in a nested associative structure,
* where ks is a sequence of keys. Returns nil if the key is not present,
* or the not-found value if supplied.
*/
cljs.core.get_in = (function() {
var get_in = null;
var get_in__2 = (function (m,ks){
return cljs.core.reduce.call(null,cljs.core.get,m,ks);
});
var get_in__3 = (function (m,ks,not_found){
var sentinel__8239 = cljs.core.lookup_sentinel;
var m__8240 = m;
var ks__8241 = cljs.core.seq.call(null,ks);
while(true){
if(ks__8241)
{var m__8242 = cljs.core._lookup.call(null,m__8240,cljs.core.first.call(null,ks__8241),sentinel__8239);
if((sentinel__8239 === m__8242))
{return not_found;
} else
{{
var G__8243 = sentinel__8239;
var G__8244 = m__8242;
var G__8245 = cljs.core.next.call(null,ks__8241);
sentinel__8239 = G__8243;
m__8240 = G__8244;
ks__8241 = G__8245;
continue;
}
}
} else
{return m__8240;
}
break;
}
});
get_in = function(m,ks,not_found){
switch(arguments.length){
case 2:
return get_in__2.call(this,m,ks);
case 3:
return get_in__3.call(this,m,ks,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
get_in.cljs$lang$arity$2 = get_in__2;
get_in.cljs$lang$arity$3 = get_in__3;
return get_in;
})()
;
/**
* Associates a value in a nested associative structure, where ks is a
* sequence of keys and v is the new value and returns a new nested structure.
* If any levels do not exist, hash-maps will be created.
*/
cljs.core.assoc_in = (function assoc_in(m,p__8246,v){
var vec__8251__8252 = p__8246;
var k__8253 = cljs.core.nth.call(null,vec__8251__8252,0,null);
var ks__8254 = cljs.core.nthnext.call(null,vec__8251__8252,1);
if(cljs.core.truth_(ks__8254))
{return cljs.core.assoc.call(null,m,k__8253,assoc_in.call(null,cljs.core._lookup.call(null,m,k__8253,null),ks__8254,v));
} else
{return cljs.core.assoc.call(null,m,k__8253,v);
}
});
/**
* 'Updates' a value in a nested associative structure, where ks is a
* sequence of keys and f is a function that will take the old value
* and any supplied args and return the new value, and returns a new
* nested structure.  If any levels do not exist, hash-maps will be
* created.
* @param {...*} var_args
*/
cljs.core.update_in = (function() { 
var update_in__delegate = function (m,p__8255,f,args){
var vec__8260__8261 = p__8255;
var k__8262 = cljs.core.nth.call(null,vec__8260__8261,0,null);
var ks__8263 = cljs.core.nthnext.call(null,vec__8260__8261,1);
if(cljs.core.truth_(ks__8263))
{return cljs.core.assoc.call(null,m,k__8262,cljs.core.apply.call(null,update_in,cljs.core._lookup.call(null,m,k__8262,null),ks__8263,f,args));
} else
{return cljs.core.assoc.call(null,m,k__8262,cljs.core.apply.call(null,f,cljs.core._lookup.call(null,m,k__8262,null),args));
}
};
var update_in = function (m,p__8255,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return update_in__delegate.call(this, m, p__8255, f, args);
};
update_in.cljs$lang$maxFixedArity = 3;
update_in.cljs$lang$applyTo = (function (arglist__8264){
var m = cljs.core.first(arglist__8264);
var p__8255 = cljs.core.first(cljs.core.next(arglist__8264));
var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__8264)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__8264)));
return update_in__delegate(m, p__8255, f, args);
});
update_in.cljs$lang$arity$variadic = update_in__delegate;
return update_in;
})()
;

goog.provide('cljs.core.Vector');

/**
* @constructor
*/
cljs.core.Vector = (function (meta,array,__hash){
this.meta = meta;
this.array = array;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32400159;
})
cljs.core.Vector.cljs$lang$type = true;
cljs.core.Vector.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/Vector");
});
cljs.core.Vector.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/Vector");
});
cljs.core.Vector.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8267 = this;
var h__2266__auto____8268 = this__8267.__hash;
if(!((h__2266__auto____8268 == null)))
{return h__2266__auto____8268;
} else
{var h__2266__auto____8269 = cljs.core.hash_coll.call(null,coll);
this__8267.__hash = h__2266__auto____8269;
return h__2266__auto____8269;
}
});
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__8270 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__8271 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__8272 = this;
var new_array__8273 = this__8272.array.slice();
(new_array__8273[k] = v);
return (new cljs.core.Vector(this__8272.meta,new_array__8273,null));
});
cljs.core.Vector.prototype.call = (function() {
var G__8304 = null;
var G__8304__2 = (function (this_sym8274,k){
var this__8276 = this;
var this_sym8274__8277 = this;
var coll__8278 = this_sym8274__8277;
return coll__8278.cljs$core$ILookup$_lookup$arity$2(coll__8278,k);
});
var G__8304__3 = (function (this_sym8275,k,not_found){
var this__8276 = this;
var this_sym8275__8279 = this;
var coll__8280 = this_sym8275__8279;
return coll__8280.cljs$core$ILookup$_lookup$arity$3(coll__8280,k,not_found);
});
G__8304 = function(this_sym8275,k,not_found){
switch(arguments.length){
case 2:
return G__8304__2.call(this,this_sym8275,k);
case 3:
return G__8304__3.call(this,this_sym8275,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8304;
})()
;
cljs.core.Vector.prototype.apply = (function (this_sym8265,args8266){
var this__8281 = this;
return this_sym8265.call.apply(this_sym8265,[this_sym8265].concat(args8266.slice()));
});
cljs.core.Vector.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8282 = this;
var new_array__8283 = this__8282.array.slice();
new_array__8283.push(o);
return (new cljs.core.Vector(this__8282.meta,new_array__8283,null));
});
cljs.core.Vector.prototype.toString = (function (){
var this__8284 = this;
var this__8285 = this;
return cljs.core.pr_str.call(null,this__8285);
});
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (v,f){
var this__8286 = this;
return cljs.core.ci_reduce.call(null,this__8286.array,f);
});
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (v,f,start){
var this__8287 = this;
return cljs.core.ci_reduce.call(null,this__8287.array,f,start);
});
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8288 = this;
if((this__8288.array.length > 0))
{var vector_seq__8289 = (function vector_seq(i){
return (new cljs.core.LazySeq(null,false,(function (){
if((i < this__8288.array.length))
{return cljs.core.cons.call(null,(this__8288.array[i]),vector_seq.call(null,(i + 1)));
} else
{return null;
}
}),null));
});
return vector_seq__8289.call(null,0);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8290 = this;
return this__8290.array.length;
});
cljs.core.Vector.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__8291 = this;
var count__8292 = this__8291.array.length;
if((count__8292 > 0))
{return (this__8291.array[(count__8292 - 1)]);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__8293 = this;
if((this__8293.array.length > 0))
{var new_array__8294 = this__8293.array.slice();
new_array__8294.pop();
return (new cljs.core.Vector(this__8293.meta,new_array__8294,null));
} else
{throw (new Error("Can't pop empty vector"));
}
});
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (coll,n,val){
var this__8295 = this;
return coll.cljs$core$IAssociative$_assoc$arity$3(coll,n,val);
});
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8296 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8297 = this;
return (new cljs.core.Vector(meta,this__8297.array,this__8297.__hash));
});
cljs.core.Vector.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8298 = this;
return this__8298.meta;
});
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__8299 = this;
if((function (){var and__3941__auto____8300 = (0 <= n);
if(and__3941__auto____8300)
{return (n < this__8299.array.length);
} else
{return and__3941__auto____8300;
}
})())
{return (this__8299.array[n]);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__8301 = this;
if((function (){var and__3941__auto____8302 = (0 <= n);
if(and__3941__auto____8302)
{return (n < this__8301.array.length);
} else
{return and__3941__auto____8302;
}
})())
{return (this__8301.array[n]);
} else
{return not_found;
}
});
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8303 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__8303.meta);
});
cljs.core.Vector;
cljs.core.Vector.EMPTY = (new cljs.core.Vector(null,[],0));
cljs.core.Vector.fromArray = (function (xs){
return (new cljs.core.Vector(null,xs,null));
});

goog.provide('cljs.core.VectorNode');

/**
* @constructor
*/
cljs.core.VectorNode = (function (edit,arr){
this.edit = edit;
this.arr = arr;
})
cljs.core.VectorNode.cljs$lang$type = true;
cljs.core.VectorNode.cljs$lang$ctorPrSeq = (function (this__2387__auto__){
return cljs.core.list.call(null,"cljs.core/VectorNode");
});
cljs.core.VectorNode.cljs$lang$ctorPrWriter = (function (this__2387__auto__,writer__2388__auto__){
return cljs.core._write.call(null,writer__2388__auto__,"cljs.core/VectorNode");
});
cljs.core.VectorNode;
cljs.core.pv_fresh_node = (function pv_fresh_node(edit){
return (new cljs.core.VectorNode(edit,cljs.core.make_array.call(null,32)));
});
cljs.core.pv_aget = (function pv_aget(node,idx){
return (node.arr[idx]);
});
cljs.core.pv_aset = (function pv_aset(node,idx,val){
return (node.arr[idx] = val);
});
cljs.core.pv_clone_node = (function pv_clone_node(node){
return (new cljs.core.VectorNode(node.edit,node.arr.slice()));
});
cljs.core.tail_off = (function tail_off(pv){
var cnt__8306 = pv.cnt;
if((cnt__8306 < 32))
{return 0;
} else
{return (((cnt__8306 - 1) >>> 5) << 5);
}
});
cljs.core.new_path = (function new_path(edit,level,node){
var ll__8312 = level;
var ret__8313 = node;
while(true){
if((ll__8312 === 0))
{return ret__8313;
} else
{var embed__8314 = ret__8313;
var r__8315 = cljs.core.pv_fresh_node.call(null,edit);
var ___8316 = cljs.core.pv_aset.call(null,r__8315,0,embed__8314);
{
var G__8317 = (ll__8312 - 5);
var G__8318 = r__8315;
ll__8312 = G__8317;
ret__8313 = G__8318;
continue;
}
}
break;
}
});
cljs.core.push_tail = (function push_tail(pv,level,parent,tailnode){
var ret__8324 = cljs.core.pv_clone_node.call(null,parent);
var subidx__8325 = (((pv.cnt - 1) >>> level) & 31);
if((5 === level))
{cljs.core.pv_aset.call(null,ret__8324,subidx__8325,tailnode);
return ret__8324;
} else
{var child__8326 = cljs.core.pv_aget.call(null,parent,subidx__8325);
if(!((child__8326 == null)))
{var node_to_insert__8327 = push_tail.call(null,pv,(level - 5),child__8326,tailnode);
cljs.core.pv_aset.call(null,ret__8324,subidx__8325,node_to_insert__8327);
return ret__8324;
} else
{var node_to_insert__8328 = cljs.core.new_path.call(null,null,(level - 5),tailnode);
cljs.core.pv_aset.call(null,ret__8324,subidx__8325,node_to_insert__8328);
return ret__8324;
}
}
});
cljs.core.array_for = (function array_for(pv,i){
if((function (){var and__3941__auto____8332 = (0 <= i);
if(and__3941__auto____8332)
{return (i < pv.cnt);
} else
{return and__3941__auto____8332;
}
})())
{if((i >= cljs.core.tail_off.call(null,pv)))
{return pv.tail;
} else
{var node__8333 = pv.root;
var level__8334 = pv.shift;
while(true){
if((level__8334 > 0))
{{
var G__8335 = cljs.core.pv_aget.call(null,node__8333,((i >>> level__8334) & 31));
var G__8336 = (level__8334 - 5);
node__8333 = G__8335;
level__8334 = G__8336;
continue;
}
} else
{return node__8333.arr;
}
break;
}
}
} else
{throw (new Error([cljs.core.str("No item "),cljs.core.str(i),cljs.core.str(" in vector of length "),cljs.core.str(pv.cnt)].join('')));
}
});
cljs.core.do_assoc = (function do_assoc(pv,level,node,i,val){
var ret__8339 = cljs.core.pv_clone_node.call(null,node);
if((level === 0))
{cljs.core.pv_aset.call(null,ret__8339,(i & 31),val);
return ret__8339;
} else
{var subidx__8340 = ((i >>> level) & 31);
cljs.core.pv_aset.call(null,ret__8339,subidx__8340,do_assoc.call(null,pv,(level - 5),cljs.core.pv_aget.call(null,node,subidx__8340),i,val));
return ret__8339;
}
});
cljs.core.pop_tail = (function pop_tail(pv,level,node){
var subidx__8346 = (((pv.cnt - 2) >>> level) & 31);
if((level > 5))
{var new_child__8347 = pop_tail.call(null,pv,(level - 5),cljs.core.pv_aget.call(null,node,subidx__8346));
if((function (){var and__3941__auto____8348 = (new_child__8347 == null);
if(and__3941__auto____8348)
{return (subidx__8346 === 0);
} else
{return and__3941__auto____8348;
}
})())
{return null;
} else
{var ret__8349 = cljs.core.pv_clone_node.call(null,node);
cljs.core.pv_aset.call(null,ret__8349,subidx__8346,new_child__8347);
return ret__8349;
}
} else
{if((subidx__8346 === 0))
{return null;
} else
{if("\uFDD0'else")
{var ret__8350 = cljs.core.pv_clone_node.call(null,node);
cljs.core.pv_aset.call(null,ret__8350,subidx__8346,null);
return ret__8350;
} else
{return null;
}
}
}
});

goog.provide('cljs.core.PersistentVector');

/**
* @constructor
*/
cljs.core.PersistentVector = (function (meta,cnt,shift,root,tail,__hash){
this.meta = meta;
this.cnt = cnt;
this.shift = shift;
this.root = root;
this.tail = tail;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 4;
this.cljs$lang$protocol_mask$partition0$ = 167668511;
})
cljs.core.PersistentVector.cljs$lang$type = true;
cljs.core.PersistentVector.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentVector");
});
cljs.core.PersistentVector.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/PersistentVector");
});
cljs.core.PersistentVector.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__8353 = this;
return (new cljs.core.TransientVector(this__8353.cnt,this__8353.shift,cljs.core.tv_editable_root.call(null,this__8353.root),cljs.core.tv_editable_tail.call(null,this__8353.tail)));
});
cljs.core.PersistentVector.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8354 = this;
var h__2266__auto____8355 = this__8354.__hash;
if(!((h__2266__auto____8355 == null)))
{return h__2266__auto____8355;
} else
{var h__2266__auto____8356 = cljs.core.hash_coll.call(null,coll);
this__8354.__hash = h__2266__auto____8356;
return h__2266__auto____8356;
}
});
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__8357 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__8358 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.PersistentVector.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__8359 = this;
if((function (){var and__3941__auto____8360 = (0 <= k);
if(and__3941__auto____8360)
{return (k < this__8359.cnt);
} else
{return and__3941__auto____8360;
}
})())
{if((cljs.core.tail_off.call(null,coll) <= k))
{var new_tail__8361 = this__8359.tail.slice();
(new_tail__8361[(k & 31)] = v);
return (new cljs.core.PersistentVector(this__8359.meta,this__8359.cnt,this__8359.shift,this__8359.root,new_tail__8361,null));
} else
{return (new cljs.core.PersistentVector(this__8359.meta,this__8359.cnt,this__8359.shift,cljs.core.do_assoc.call(null,coll,this__8359.shift,this__8359.root,k,v),this__8359.tail,null));
}
} else
{if((k === this__8359.cnt))
{return coll.cljs$core$ICollection$_conj$arity$2(coll,v);
} else
{if("\uFDD0'else")
{throw (new Error([cljs.core.str("Index "),cljs.core.str(k),cljs.core.str(" out of bounds  [0,"),cljs.core.str(this__8359.cnt),cljs.core.str("]")].join('')));
} else
{return null;
}
}
}
});
cljs.core.PersistentVector.prototype.call = (function() {
var G__8409 = null;
var G__8409__2 = (function (this_sym8362,k){
var this__8364 = this;
var this_sym8362__8365 = this;
var coll__8366 = this_sym8362__8365;
return coll__8366.cljs$core$ILookup$_lookup$arity$2(coll__8366,k);
});
var G__8409__3 = (function (this_sym8363,k,not_found){
var this__8364 = this;
var this_sym8363__8367 = this;
var coll__8368 = this_sym8363__8367;
return coll__8368.cljs$core$ILookup$_lookup$arity$3(coll__8368,k,not_found);
});
G__8409 = function(this_sym8363,k,not_found){
switch(arguments.length){
case 2:
return G__8409__2.call(this,this_sym8363,k);
case 3:
return G__8409__3.call(this,this_sym8363,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8409;
})()
;
cljs.core.PersistentVector.prototype.apply = (function (this_sym8351,args8352){
var this__8369 = this;
return this_sym8351.call.apply(this_sym8351,[this_sym8351].concat(args8352.slice()));
});
cljs.core.PersistentVector.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (v,f,init){
var this__8370 = this;
var step_init__8371 = [0,init];
var i__8372 = 0;
while(true){
if((i__8372 < this__8370.cnt))
{var arr__8373 = cljs.core.array_for.call(null,v,i__8372);
var len__8374 = arr__8373.length;
var init__8378 = (function (){var j__8375 = 0;
var init__8376 = (step_init__8371[1]);
while(true){
if((j__8375 < len__8374))
{var init__8377 = f.call(null,init__8376,(j__8375 + i__8372),(arr__8373[j__8375]));
if(cljs.core.reduced_QMARK_.call(null,init__8377))
{return init__8377;
} else
{{
var G__8410 = (j__8375 + 1);
var G__8411 = init__8377;
j__8375 = G__8410;
init__8376 = G__8411;
continue;
}
}
} else
{(step_init__8371[0] = len__8374);
(step_init__8371[1] = init__8376);
return init__8376;
}
break;
}
})();
if(cljs.core.reduced_QMARK_.call(null,init__8378))
{return cljs.core.deref.call(null,init__8378);
} else
{{
var G__8412 = (i__8372 + (step_init__8371[0]));
i__8372 = G__8412;
continue;
}
}
} else
{return (step_init__8371[1]);
}
break;
}
});
cljs.core.PersistentVector.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8379 = this;
if(((this__8379.cnt - cljs.core.tail_off.call(null,coll)) < 32))
{var new_tail__8380 = this__8379.tail.slice();
new_tail__8380.push(o);
return (new cljs.core.PersistentVector(this__8379.meta,(this__8379.cnt + 1),this__8379.shift,this__8379.root,new_tail__8380,null));
} else
{var root_overflow_QMARK___8381 = ((this__8379.cnt >>> 5) > (1 << this__8379.shift));
var new_shift__8382 = ((root_overflow_QMARK___8381)?(this__8379.shift + 5):this__8379.shift);
var new_root__8384 = ((root_overflow_QMARK___8381)?(function (){var n_r__8383 = cljs.core.pv_fresh_node.call(null,null);
cljs.core.pv_aset.call(null,n_r__8383,0,this__8379.root);
cljs.core.pv_aset.call(null,n_r__8383,1,cljs.core.new_path.call(null,null,this__8379.shift,(new cljs.core.VectorNode(null,this__8379.tail))));
return n_r__8383;
})():cljs.core.push_tail.call(null,coll,this__8379.shift,this__8379.root,(new cljs.core.VectorNode(null,this__8379.tail))));
return (new cljs.core.PersistentVector(this__8379.meta,(this__8379.cnt + 1),new_shift__8382,new_root__8384,[o],null));
}
});
cljs.core.PersistentVector.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__8385 = this;
if((this__8385.cnt > 0))
{return (new cljs.core.RSeq(coll,(this__8385.cnt - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_key$arity$1 = (function (coll){
var this__8386 = this;
return coll.cljs$core$IIndexed$_nth$arity$2(coll,0);
});
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_val$arity$1 = (function (coll){
var this__8387 = this;
return coll.cljs$core$IIndexed$_nth$arity$2(coll,1);
});
cljs.core.PersistentVector.prototype.toString = (function (){
var this__8388 = this;
var this__8389 = this;
return cljs.core.pr_str.call(null,this__8389);
});
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (v,f){
var this__8390 = this;
return cljs.core.ci_reduce.call(null,v,f);
});
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (v,f,start){
var this__8391 = this;
return cljs.core.ci_reduce.call(null,v,f,start);
});
cljs.core.PersistentVector.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8392 = this;
if((this__8392.cnt === 0))
{return null;
} else
{return cljs.core.chunked_seq.call(null,coll,0,0);
}
});
cljs.core.PersistentVector.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8393 = this;
return this__8393.cnt;
});
cljs.core.PersistentVector.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__8394 = this;
if((this__8394.cnt > 0))
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,(this__8394.cnt - 1));
} else
{return null;
}
});
cljs.core.PersistentVector.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__8395 = this;
if((this__8395.cnt === 0))
{throw (new Error("Can't pop empty vector"));
} else
{if((1 === this__8395.cnt))
{return cljs.core._with_meta.call(null,cljs.core.PersistentVector.EMPTY,this__8395.meta);
} else
{if((1 < (this__8395.cnt - cljs.core.tail_off.call(null,coll))))
{return (new cljs.core.PersistentVector(this__8395.meta,(this__8395.cnt - 1),this__8395.shift,this__8395.root,this__8395.tail.slice(0,-1),null));
} else
{if("\uFDD0'else")
{var new_tail__8396 = cljs.core.array_for.call(null,coll,(this__8395.cnt - 2));
var nr__8397 = cljs.core.pop_tail.call(null,coll,this__8395.shift,this__8395.root);
var new_root__8398 = (((nr__8397 == null))?cljs.core.PersistentVector.EMPTY_NODE:nr__8397);
var cnt_1__8399 = (this__8395.cnt - 1);
if((function (){var and__3941__auto____8400 = (5 < this__8395.shift);
if(and__3941__auto____8400)
{return (cljs.core.pv_aget.call(null,new_root__8398,1) == null);
} else
{return and__3941__auto____8400;
}
})())
{return (new cljs.core.PersistentVector(this__8395.meta,cnt_1__8399,(this__8395.shift - 5),cljs.core.pv_aget.call(null,new_root__8398,0),new_tail__8396,null));
} else
{return (new cljs.core.PersistentVector(this__8395.meta,cnt_1__8399,this__8395.shift,new_root__8398,new_tail__8396,null));
}
} else
{return null;
}
}
}
}
});
cljs.core.PersistentVector.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (coll,n,val){
var this__8401 = this;
return coll.cljs$core$IAssociative$_assoc$arity$3(coll,n,val);
});
cljs.core.PersistentVector.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8402 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentVector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8403 = this;
return (new cljs.core.PersistentVector(meta,this__8403.cnt,this__8403.shift,this__8403.root,this__8403.tail,this__8403.__hash));
});
cljs.core.PersistentVector.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8404 = this;
return this__8404.meta;
});
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__8405 = this;
return (cljs.core.array_for.call(null,coll,n)[(n & 31)]);
});
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__8406 = this;
if((function (){var and__3941__auto____8407 = (0 <= n);
if(and__3941__auto____8407)
{return (n < this__8406.cnt);
} else
{return and__3941__auto____8407;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,n);
} else
{return not_found;
}
});
cljs.core.PersistentVector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8408 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.EMPTY,this__8408.meta);
});
cljs.core.PersistentVector;
cljs.core.PersistentVector.EMPTY_NODE = cljs.core.pv_fresh_node.call(null,null);
cljs.core.PersistentVector.EMPTY = (new cljs.core.PersistentVector(null,0,5,cljs.core.PersistentVector.EMPTY_NODE,[],0));
cljs.core.PersistentVector.fromArray = (function (xs,no_clone){
var l__8413 = xs.length;
var xs__8414 = (((no_clone === true))?xs:xs.slice());
if((l__8413 < 32))
{return (new cljs.core.PersistentVector(null,l__8413,5,cljs.core.PersistentVector.EMPTY_NODE,xs__8414,null));
} else
{var node__8415 = xs__8414.slice(0,32);
var v__8416 = (new cljs.core.PersistentVector(null,32,5,cljs.core.PersistentVector.EMPTY_NODE,node__8415,null));
var i__8417 = 32;
var out__8418 = cljs.core._as_transient.call(null,v__8416);
while(true){
if((i__8417 < l__8413))
{{
var G__8419 = (i__8417 + 1);
var G__8420 = cljs.core.conj_BANG_.call(null,out__8418,(xs__8414[i__8417]));
i__8417 = G__8419;
out__8418 = G__8420;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__8418);
}
break;
}
}
});
cljs.core.vec = (function vec(coll){
return cljs.core._persistent_BANG_.call(null,cljs.core.reduce.call(null,cljs.core._conj_BANG_,cljs.core._as_transient.call(null,cljs.core.PersistentVector.EMPTY),coll));
});
/**
* @param {...*} var_args
*/
cljs.core.vector = (function() { 
var vector__delegate = function (args){
return cljs.core.vec.call(null,args);
};
var vector = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return vector__delegate.call(this, args);
};
vector.cljs$lang$maxFixedArity = 0;
vector.cljs$lang$applyTo = (function (arglist__8421){
var args = cljs.core.seq(arglist__8421);;
return vector__delegate(args);
});
vector.cljs$lang$arity$variadic = vector__delegate;
return vector;
})()
;

goog.provide('cljs.core.ChunkedSeq');

/**
* @constructor
*/
cljs.core.ChunkedSeq = (function (vec,node,i,off,meta,__hash){
this.vec = vec;
this.node = node;
this.i = i;
this.off = off;
this.meta = meta;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 31719660;
this.cljs$lang$protocol_mask$partition1$ = 1536;
})
cljs.core.ChunkedSeq.cljs$lang$type = true;
cljs.core.ChunkedSeq.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/ChunkedSeq");
});
cljs.core.ChunkedSeq.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/ChunkedSeq");
});
cljs.core.ChunkedSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8422 = this;
var h__2266__auto____8423 = this__8422.__hash;
if(!((h__2266__auto____8423 == null)))
{return h__2266__auto____8423;
} else
{var h__2266__auto____8424 = cljs.core.hash_coll.call(null,coll);
this__8422.__hash = h__2266__auto____8424;
return h__2266__auto____8424;
}
});
cljs.core.ChunkedSeq.prototype.cljs$core$INext$_next$arity$1 = (function (coll){
var this__8425 = this;
if(((this__8425.off + 1) < this__8425.node.length))
{var s__8426 = cljs.core.chunked_seq.call(null,this__8425.vec,this__8425.node,this__8425.i,(this__8425.off + 1));
if((s__8426 == null))
{return null;
} else
{return s__8426;
}
} else
{return coll.cljs$core$IChunkedNext$_chunked_next$arity$1(coll);
}
});
cljs.core.ChunkedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8427 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.ChunkedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8428 = this;
return coll;
});
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8429 = this;
return (this__8429.node[this__8429.off]);
});
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8430 = this;
if(((this__8430.off + 1) < this__8430.node.length))
{var s__8431 = cljs.core.chunked_seq.call(null,this__8430.vec,this__8430.node,this__8430.i,(this__8430.off + 1));
if((s__8431 == null))
{return cljs.core.List.EMPTY;
} else
{return s__8431;
}
} else
{return coll.cljs$core$IChunkedSeq$_chunked_rest$arity$1(coll);
}
});
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = (function (coll){
var this__8432 = this;
var l__8433 = this__8432.node.length;
var s__8434 = ((((this__8432.i + l__8433) < cljs.core._count.call(null,this__8432.vec)))?cljs.core.chunked_seq.call(null,this__8432.vec,(this__8432.i + l__8433),0):null);
if((s__8434 == null))
{return null;
} else
{return s__8434;
}
});
cljs.core.ChunkedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8435 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,m){
var this__8436 = this;
return cljs.core.chunked_seq.call(null,this__8436.vec,this__8436.node,this__8436.i,this__8436.off,m);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_meta$arity$1 = (function (coll){
var this__8437 = this;
return this__8437.meta;
});
cljs.core.ChunkedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8438 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.EMPTY,this__8438.meta);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = (function (coll){
var this__8439 = this;
return cljs.core.array_chunk.call(null,this__8439.node,this__8439.off);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = (function (coll){
var this__8440 = this;
var l__8441 = this__8440.node.length;
var s__8442 = ((((this__8440.i + l__8441) < cljs.core._count.call(null,this__8440.vec)))?cljs.core.chunked_seq.call(null,this__8440.vec,(this__8440.i + l__8441),0):null);
if((s__8442 == null))
{return cljs.core.List.EMPTY;
} else
{return s__8442;
}
});
cljs.core.ChunkedSeq;
cljs.core.chunked_seq = (function() {
var chunked_seq = null;
var chunked_seq__3 = (function (vec,i,off){
return chunked_seq.call(null,vec,cljs.core.array_for.call(null,vec,i),i,off,null);
});
var chunked_seq__4 = (function (vec,node,i,off){
return chunked_seq.call(null,vec,node,i,off,null);
});
var chunked_seq__5 = (function (vec,node,i,off,meta){
return (new cljs.core.ChunkedSeq(vec,node,i,off,meta,null));
});
chunked_seq = function(vec,node,i,off,meta){
switch(arguments.length){
case 3:
return chunked_seq__3.call(this,vec,node,i);
case 4:
return chunked_seq__4.call(this,vec,node,i,off);
case 5:
return chunked_seq__5.call(this,vec,node,i,off,meta);
}
throw('Invalid arity: ' + arguments.length);
};
chunked_seq.cljs$lang$arity$3 = chunked_seq__3;
chunked_seq.cljs$lang$arity$4 = chunked_seq__4;
chunked_seq.cljs$lang$arity$5 = chunked_seq__5;
return chunked_seq;
})()
;

goog.provide('cljs.core.Subvec');

/**
* @constructor
*/
cljs.core.Subvec = (function (meta,v,start,end,__hash){
this.meta = meta;
this.v = v;
this.start = start;
this.end = end;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32400159;
})
cljs.core.Subvec.cljs$lang$type = true;
cljs.core.Subvec.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/Subvec");
});
cljs.core.Subvec.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/Subvec");
});
cljs.core.Subvec.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8445 = this;
var h__2266__auto____8446 = this__8445.__hash;
if(!((h__2266__auto____8446 == null)))
{return h__2266__auto____8446;
} else
{var h__2266__auto____8447 = cljs.core.hash_coll.call(null,coll);
this__8445.__hash = h__2266__auto____8447;
return h__2266__auto____8447;
}
});
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__8448 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__8449 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,key,val){
var this__8450 = this;
var v_pos__8451 = (this__8450.start + key);
return (new cljs.core.Subvec(this__8450.meta,cljs.core._assoc.call(null,this__8450.v,v_pos__8451,val),this__8450.start,((this__8450.end > (v_pos__8451 + 1)) ? this__8450.end : (v_pos__8451 + 1)),null));
});
cljs.core.Subvec.prototype.call = (function() {
var G__8477 = null;
var G__8477__2 = (function (this_sym8452,k){
var this__8454 = this;
var this_sym8452__8455 = this;
var coll__8456 = this_sym8452__8455;
return coll__8456.cljs$core$ILookup$_lookup$arity$2(coll__8456,k);
});
var G__8477__3 = (function (this_sym8453,k,not_found){
var this__8454 = this;
var this_sym8453__8457 = this;
var coll__8458 = this_sym8453__8457;
return coll__8458.cljs$core$ILookup$_lookup$arity$3(coll__8458,k,not_found);
});
G__8477 = function(this_sym8453,k,not_found){
switch(arguments.length){
case 2:
return G__8477__2.call(this,this_sym8453,k);
case 3:
return G__8477__3.call(this,this_sym8453,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8477;
})()
;
cljs.core.Subvec.prototype.apply = (function (this_sym8443,args8444){
var this__8459 = this;
return this_sym8443.call.apply(this_sym8443,[this_sym8443].concat(args8444.slice()));
});
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8460 = this;
return (new cljs.core.Subvec(this__8460.meta,cljs.core._assoc_n.call(null,this__8460.v,this__8460.end,o),this__8460.start,(this__8460.end + 1),null));
});
cljs.core.Subvec.prototype.toString = (function (){
var this__8461 = this;
var this__8462 = this;
return cljs.core.pr_str.call(null,this__8462);
});
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
var this__8463 = this;
return cljs.core.ci_reduce.call(null,coll,f);
});
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var this__8464 = this;
return cljs.core.ci_reduce.call(null,coll,f,start);
});
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8465 = this;
var subvec_seq__8466 = (function subvec_seq(i){
if((i === this__8465.end))
{return null;
} else
{return cljs.core.cons.call(null,cljs.core._nth.call(null,this__8465.v,i),(new cljs.core.LazySeq(null,false,(function (){
return subvec_seq.call(null,(i + 1));
}),null)));
}
});
return subvec_seq__8466.call(null,this__8465.start);
});
cljs.core.Subvec.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8467 = this;
return (this__8467.end - this__8467.start);
});
cljs.core.Subvec.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__8468 = this;
return cljs.core._nth.call(null,this__8468.v,(this__8468.end - 1));
});
cljs.core.Subvec.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__8469 = this;
if((this__8469.start === this__8469.end))
{throw (new Error("Can't pop empty vector"));
} else
{return (new cljs.core.Subvec(this__8469.meta,this__8469.v,this__8469.start,(this__8469.end - 1),null));
}
});
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (coll,n,val){
var this__8470 = this;
return coll.cljs$core$IAssociative$_assoc$arity$3(coll,n,val);
});
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8471 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8472 = this;
return (new cljs.core.Subvec(meta,this__8472.v,this__8472.start,this__8472.end,this__8472.__hash));
});
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8473 = this;
return this__8473.meta;
});
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__8474 = this;
return cljs.core._nth.call(null,this__8474.v,(this__8474.start + n));
});
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__8475 = this;
return cljs.core._nth.call(null,this__8475.v,(this__8475.start + n),not_found);
});
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8476 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__8476.meta);
});
cljs.core.Subvec;
/**
* Returns a persistent vector of the items in vector from
* start (inclusive) to end (exclusive).  If end is not supplied,
* defaults to (count vector). This operation is O(1) and very fast, as
* the resulting vector shares structure with the original and no
* trimming is done.
*/
cljs.core.subvec = (function() {
var subvec = null;
var subvec__2 = (function (v,start){
return subvec.call(null,v,start,cljs.core.count.call(null,v));
});
var subvec__3 = (function (v,start,end){
return (new cljs.core.Subvec(null,v,start,end,null));
});
subvec = function(v,start,end){
switch(arguments.length){
case 2:
return subvec__2.call(this,v,start);
case 3:
return subvec__3.call(this,v,start,end);
}
throw('Invalid arity: ' + arguments.length);
};
subvec.cljs$lang$arity$2 = subvec__2;
subvec.cljs$lang$arity$3 = subvec__3;
return subvec;
})()
;
cljs.core.tv_ensure_editable = (function tv_ensure_editable(edit,node){
if((edit === node.edit))
{return node;
} else
{return (new cljs.core.VectorNode(edit,node.arr.slice()));
}
});
cljs.core.tv_editable_root = (function tv_editable_root(node){
return (new cljs.core.VectorNode({},node.arr.slice()));
});
cljs.core.tv_editable_tail = (function tv_editable_tail(tl){
var ret__8479 = cljs.core.make_array.call(null,32);
cljs.core.array_copy.call(null,tl,0,ret__8479,0,tl.length);
return ret__8479;
});
cljs.core.tv_push_tail = (function tv_push_tail(tv,level,parent,tail_node){
var ret__8483 = cljs.core.tv_ensure_editable.call(null,tv.root.edit,parent);
var subidx__8484 = (((tv.cnt - 1) >>> level) & 31);
cljs.core.pv_aset.call(null,ret__8483,subidx__8484,(((level === 5))?tail_node:(function (){var child__8485 = cljs.core.pv_aget.call(null,ret__8483,subidx__8484);
if(!((child__8485 == null)))
{return tv_push_tail.call(null,tv,(level - 5),child__8485,tail_node);
} else
{return cljs.core.new_path.call(null,tv.root.edit,(level - 5),tail_node);
}
})()));
return ret__8483;
});
cljs.core.tv_pop_tail = (function tv_pop_tail(tv,level,node){
var node__8490 = cljs.core.tv_ensure_editable.call(null,tv.root.edit,node);
var subidx__8491 = (((tv.cnt - 2) >>> level) & 31);
if((level > 5))
{var new_child__8492 = tv_pop_tail.call(null,tv,(level - 5),cljs.core.pv_aget.call(null,node__8490,subidx__8491));
if((function (){var and__3941__auto____8493 = (new_child__8492 == null);
if(and__3941__auto____8493)
{return (subidx__8491 === 0);
} else
{return and__3941__auto____8493;
}
})())
{return null;
} else
{cljs.core.pv_aset.call(null,node__8490,subidx__8491,new_child__8492);
return node__8490;
}
} else
{if((subidx__8491 === 0))
{return null;
} else
{if("\uFDD0'else")
{cljs.core.pv_aset.call(null,node__8490,subidx__8491,null);
return node__8490;
} else
{return null;
}
}
}
});
cljs.core.editable_array_for = (function editable_array_for(tv,i){
if((function (){var and__3941__auto____8498 = (0 <= i);
if(and__3941__auto____8498)
{return (i < tv.cnt);
} else
{return and__3941__auto____8498;
}
})())
{if((i >= cljs.core.tail_off.call(null,tv)))
{return tv.tail;
} else
{var root__8499 = tv.root;
var node__8500 = root__8499;
var level__8501 = tv.shift;
while(true){
if((level__8501 > 0))
{{
var G__8502 = cljs.core.tv_ensure_editable.call(null,root__8499.edit,cljs.core.pv_aget.call(null,node__8500,((i >>> level__8501) & 31)));
var G__8503 = (level__8501 - 5);
node__8500 = G__8502;
level__8501 = G__8503;
continue;
}
} else
{return node__8500.arr;
}
break;
}
}
} else
{throw (new Error([cljs.core.str("No item "),cljs.core.str(i),cljs.core.str(" in transient vector of length "),cljs.core.str(tv.cnt)].join('')));
}
});

goog.provide('cljs.core.TransientVector');

/**
* @constructor
*/
cljs.core.TransientVector = (function (cnt,shift,root,tail){
this.cnt = cnt;
this.shift = shift;
this.root = root;
this.tail = tail;
this.cljs$lang$protocol_mask$partition0$ = 275;
this.cljs$lang$protocol_mask$partition1$ = 88;
})
cljs.core.TransientVector.cljs$lang$type = true;
cljs.core.TransientVector.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/TransientVector");
});
cljs.core.TransientVector.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/TransientVector");
});
cljs.core.TransientVector.prototype.call = (function() {
var G__8543 = null;
var G__8543__2 = (function (this_sym8506,k){
var this__8508 = this;
var this_sym8506__8509 = this;
var coll__8510 = this_sym8506__8509;
return coll__8510.cljs$core$ILookup$_lookup$arity$2(coll__8510,k);
});
var G__8543__3 = (function (this_sym8507,k,not_found){
var this__8508 = this;
var this_sym8507__8511 = this;
var coll__8512 = this_sym8507__8511;
return coll__8512.cljs$core$ILookup$_lookup$arity$3(coll__8512,k,not_found);
});
G__8543 = function(this_sym8507,k,not_found){
switch(arguments.length){
case 2:
return G__8543__2.call(this,this_sym8507,k);
case 3:
return G__8543__3.call(this,this_sym8507,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8543;
})()
;
cljs.core.TransientVector.prototype.apply = (function (this_sym8504,args8505){
var this__8513 = this;
return this_sym8504.call.apply(this_sym8504,[this_sym8504].concat(args8505.slice()));
});
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__8514 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,null);
});
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__8515 = this;
return coll.cljs$core$IIndexed$_nth$arity$3(coll,k,not_found);
});
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
var this__8516 = this;
if(this__8516.root.edit)
{return (cljs.core.array_for.call(null,coll,n)[(n & 31)]);
} else
{throw (new Error("nth after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
var this__8517 = this;
if((function (){var and__3941__auto____8518 = (0 <= n);
if(and__3941__auto____8518)
{return (n < this__8517.cnt);
} else
{return and__3941__auto____8518;
}
})())
{return coll.cljs$core$IIndexed$_nth$arity$2(coll,n);
} else
{return not_found;
}
});
cljs.core.TransientVector.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8519 = this;
if(this__8519.root.edit)
{return this__8519.cnt;
} else
{throw (new Error("count after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 = (function (tcoll,n,val){
var this__8520 = this;
if(this__8520.root.edit)
{if((function (){var and__3941__auto____8521 = (0 <= n);
if(and__3941__auto____8521)
{return (n < this__8520.cnt);
} else
{return and__3941__auto____8521;
}
})())
{if((cljs.core.tail_off.call(null,tcoll) <= n))
{(this__8520.tail[(n & 31)] = val);
return tcoll;
} else
{var new_root__8526 = (function go(level,node){
var node__8524 = cljs.core.tv_ensure_editable.call(null,this__8520.root.edit,node);
if((level === 0))
{cljs.core.pv_aset.call(null,node__8524,(n & 31),val);
return node__8524;
} else
{var subidx__8525 = ((n >>> level) & 31);
cljs.core.pv_aset.call(null,node__8524,subidx__8525,go.call(null,(level - 5),cljs.core.pv_aget.call(null,node__8524,subidx__8525)));
return node__8524;
}
}).call(null,this__8520.shift,this__8520.root);
this__8520.root = new_root__8526;
return tcoll;
}
} else
{if((n === this__8520.cnt))
{return tcoll.cljs$core$ITransientCollection$_conj_BANG_$arity$2(tcoll,val);
} else
{if("\uFDD0'else")
{throw (new Error([cljs.core.str("Index "),cljs.core.str(n),cljs.core.str(" out of bounds for TransientVector of length"),cljs.core.str(this__8520.cnt)].join('')));
} else
{return null;
}
}
}
} else
{throw (new Error("assoc! after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_pop_BANG_$arity$1 = (function (tcoll){
var this__8527 = this;
if(this__8527.root.edit)
{if((this__8527.cnt === 0))
{throw (new Error("Can't pop empty vector"));
} else
{if((1 === this__8527.cnt))
{this__8527.cnt = 0;
return tcoll;
} else
{if((((this__8527.cnt - 1) & 31) > 0))
{this__8527.cnt = (this__8527.cnt - 1);
return tcoll;
} else
{if("\uFDD0'else")
{var new_tail__8528 = cljs.core.editable_array_for.call(null,tcoll,(this__8527.cnt - 2));
var new_root__8530 = (function (){var nr__8529 = cljs.core.tv_pop_tail.call(null,tcoll,this__8527.shift,this__8527.root);
if(!((nr__8529 == null)))
{return nr__8529;
} else
{return (new cljs.core.VectorNode(this__8527.root.edit,cljs.core.make_array.call(null,32)));
}
})();
if((function (){var and__3941__auto____8531 = (5 < this__8527.shift);
if(and__3941__auto____8531)
{return (cljs.core.pv_aget.call(null,new_root__8530,1) == null);
} else
{return and__3941__auto____8531;
}
})())
{var new_root__8532 = cljs.core.tv_ensure_editable.call(null,this__8527.root.edit,cljs.core.pv_aget.call(null,new_root__8530,0));
this__8527.root = new_root__8532;
this__8527.shift = (this__8527.shift - 5);
this__8527.cnt = (this__8527.cnt - 1);
this__8527.tail = new_tail__8528;
return tcoll;
} else
{this__8527.root = new_root__8530;
this__8527.cnt = (this__8527.cnt - 1);
this__8527.tail = new_tail__8528;
return tcoll;
}
} else
{return null;
}
}
}
}
} else
{throw (new Error("pop! after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = (function (tcoll,key,val){
var this__8533 = this;
return tcoll.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(tcoll,key,val);
});
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,o){
var this__8534 = this;
if(this__8534.root.edit)
{if(((this__8534.cnt - cljs.core.tail_off.call(null,tcoll)) < 32))
{(this__8534.tail[(this__8534.cnt & 31)] = o);
this__8534.cnt = (this__8534.cnt + 1);
return tcoll;
} else
{var tail_node__8535 = (new cljs.core.VectorNode(this__8534.root.edit,this__8534.tail));
var new_tail__8536 = cljs.core.make_array.call(null,32);
(new_tail__8536[0] = o);
this__8534.tail = new_tail__8536;
if(((this__8534.cnt >>> 5) > (1 << this__8534.shift)))
{var new_root_array__8537 = cljs.core.make_array.call(null,32);
var new_shift__8538 = (this__8534.shift + 5);
(new_root_array__8537[0] = this__8534.root);
(new_root_array__8537[1] = cljs.core.new_path.call(null,this__8534.root.edit,this__8534.shift,tail_node__8535));
this__8534.root = (new cljs.core.VectorNode(this__8534.root.edit,new_root_array__8537));
this__8534.shift = new_shift__8538;
this__8534.cnt = (this__8534.cnt + 1);
return tcoll;
} else
{var new_root__8539 = cljs.core.tv_push_tail.call(null,tcoll,this__8534.shift,this__8534.root,tail_node__8535);
this__8534.root = new_root__8539;
this__8534.cnt = (this__8534.cnt + 1);
return tcoll;
}
}
} else
{throw (new Error("conj! after persistent!"));
}
});
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__8540 = this;
if(this__8540.root.edit)
{this__8540.root.edit = null;
var len__8541 = (this__8540.cnt - cljs.core.tail_off.call(null,tcoll));
var trimmed_tail__8542 = cljs.core.make_array.call(null,len__8541);
cljs.core.array_copy.call(null,this__8540.tail,0,trimmed_tail__8542,0,len__8541);
return (new cljs.core.PersistentVector(null,this__8540.cnt,this__8540.shift,this__8540.root,trimmed_tail__8542,null));
} else
{throw (new Error("persistent! called twice"));
}
});
cljs.core.TransientVector;

goog.provide('cljs.core.PersistentQueueSeq');

/**
* @constructor
*/
cljs.core.PersistentQueueSeq = (function (meta,front,rear,__hash){
this.meta = meta;
this.front = front;
this.rear = rear;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850572;
})
cljs.core.PersistentQueueSeq.cljs$lang$type = true;
cljs.core.PersistentQueueSeq.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentQueueSeq");
});
cljs.core.PersistentQueueSeq.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/PersistentQueueSeq");
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8544 = this;
var h__2266__auto____8545 = this__8544.__hash;
if(!((h__2266__auto____8545 == null)))
{return h__2266__auto____8545;
} else
{var h__2266__auto____8546 = cljs.core.hash_coll.call(null,coll);
this__8544.__hash = h__2266__auto____8546;
return h__2266__auto____8546;
}
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8547 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.PersistentQueueSeq.prototype.toString = (function (){
var this__8548 = this;
var this__8549 = this;
return cljs.core.pr_str.call(null,this__8549);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8550 = this;
return coll;
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8551 = this;
return cljs.core._first.call(null,this__8551.front);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8552 = this;
var temp__4090__auto____8553 = cljs.core.next.call(null,this__8552.front);
if(temp__4090__auto____8553)
{var f1__8554 = temp__4090__auto____8553;
return (new cljs.core.PersistentQueueSeq(this__8552.meta,f1__8554,this__8552.rear,null));
} else
{if((this__8552.rear == null))
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll);
} else
{return (new cljs.core.PersistentQueueSeq(this__8552.meta,this__8552.rear,null,null));
}
}
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8555 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8556 = this;
return (new cljs.core.PersistentQueueSeq(meta,this__8556.front,this__8556.rear,this__8556.__hash));
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8557 = this;
return this__8557.meta;
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8558 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__8558.meta);
});
cljs.core.PersistentQueueSeq;

goog.provide('cljs.core.PersistentQueue');

/**
* @constructor
*/
cljs.core.PersistentQueue = (function (meta,count,front,rear,__hash){
this.meta = meta;
this.count = count;
this.front = front;
this.rear = rear;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31858766;
})
cljs.core.PersistentQueue.cljs$lang$type = true;
cljs.core.PersistentQueue.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentQueue");
});
cljs.core.PersistentQueue.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/PersistentQueue");
});
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8559 = this;
var h__2266__auto____8560 = this__8559.__hash;
if(!((h__2266__auto____8560 == null)))
{return h__2266__auto____8560;
} else
{var h__2266__auto____8561 = cljs.core.hash_coll.call(null,coll);
this__8559.__hash = h__2266__auto____8561;
return h__2266__auto____8561;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__8562 = this;
if(cljs.core.truth_(this__8562.front))
{return (new cljs.core.PersistentQueue(this__8562.meta,(this__8562.count + 1),this__8562.front,cljs.core.conj.call(null,(function (){var or__3943__auto____8563 = this__8562.rear;
if(cljs.core.truth_(or__3943__auto____8563))
{return or__3943__auto____8563;
} else
{return cljs.core.PersistentVector.EMPTY;
}
})(),o),null));
} else
{return (new cljs.core.PersistentQueue(this__8562.meta,(this__8562.count + 1),cljs.core.conj.call(null,this__8562.front,o),cljs.core.PersistentVector.EMPTY,null));
}
});
cljs.core.PersistentQueue.prototype.toString = (function (){
var this__8564 = this;
var this__8565 = this;
return cljs.core.pr_str.call(null,this__8565);
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8566 = this;
var rear__8567 = cljs.core.seq.call(null,this__8566.rear);
if(cljs.core.truth_((function (){var or__3943__auto____8568 = this__8566.front;
if(cljs.core.truth_(or__3943__auto____8568))
{return or__3943__auto____8568;
} else
{return rear__8567;
}
})()))
{return (new cljs.core.PersistentQueueSeq(null,this__8566.front,cljs.core.seq.call(null,rear__8567),null));
} else
{return null;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8569 = this;
return this__8569.count;
});
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek$arity$1 = (function (coll){
var this__8570 = this;
return cljs.core._first.call(null,this__8570.front);
});
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop$arity$1 = (function (coll){
var this__8571 = this;
if(cljs.core.truth_(this__8571.front))
{var temp__4090__auto____8572 = cljs.core.next.call(null,this__8571.front);
if(temp__4090__auto____8572)
{var f1__8573 = temp__4090__auto____8572;
return (new cljs.core.PersistentQueue(this__8571.meta,(this__8571.count - 1),f1__8573,this__8571.rear,null));
} else
{return (new cljs.core.PersistentQueue(this__8571.meta,(this__8571.count - 1),cljs.core.seq.call(null,this__8571.rear),cljs.core.PersistentVector.EMPTY,null));
}
} else
{return coll;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__8574 = this;
return cljs.core.first.call(null,this__8574.front);
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__8575 = this;
return cljs.core.rest.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8576 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8577 = this;
return (new cljs.core.PersistentQueue(meta,this__8577.count,this__8577.front,this__8577.rear,this__8577.__hash));
});
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8578 = this;
return this__8578.meta;
});
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8579 = this;
return cljs.core.PersistentQueue.EMPTY;
});
cljs.core.PersistentQueue;
cljs.core.PersistentQueue.EMPTY = (new cljs.core.PersistentQueue(null,0,null,cljs.core.PersistentVector.EMPTY,0));

goog.provide('cljs.core.NeverEquiv');

/**
* @constructor
*/
cljs.core.NeverEquiv = (function (){
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2097152;
})
cljs.core.NeverEquiv.cljs$lang$type = true;
cljs.core.NeverEquiv.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/NeverEquiv");
});
cljs.core.NeverEquiv.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/NeverEquiv");
});
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var this__8580 = this;
return false;
});
cljs.core.NeverEquiv;
cljs.core.never_equiv = (new cljs.core.NeverEquiv());
/**
* Assumes y is a map. Returns true if x equals y, otherwise returns
* false.
*/
cljs.core.equiv_map = (function equiv_map(x,y){
return cljs.core.boolean$.call(null,((cljs.core.map_QMARK_.call(null,y))?(((cljs.core.count.call(null,x) === cljs.core.count.call(null,y)))?cljs.core.every_QMARK_.call(null,cljs.core.identity,cljs.core.map.call(null,(function (xkv){
return cljs.core._EQ_.call(null,cljs.core._lookup.call(null,y,cljs.core.first.call(null,xkv),cljs.core.never_equiv),cljs.core.second.call(null,xkv));
}),x)):null):null));
});
cljs.core.scan_array = (function scan_array(incr,k,array){
var len__8583 = array.length;
var i__8584 = 0;
while(true){
if((i__8584 < len__8583))
{if((k === (array[i__8584])))
{return i__8584;
} else
{{
var G__8585 = (i__8584 + incr);
i__8584 = G__8585;
continue;
}
}
} else
{return null;
}
break;
}
});
cljs.core.obj_map_compare_keys = (function obj_map_compare_keys(a,b){
var a__8588 = cljs.core.hash.call(null,a);
var b__8589 = cljs.core.hash.call(null,b);
if((a__8588 < b__8589))
{return -1;
} else
{if((a__8588 > b__8589))
{return 1;
} else
{if("\uFDD0'else")
{return 0;
} else
{return null;
}
}
}
});
cljs.core.obj_map__GT_hash_map = (function obj_map__GT_hash_map(m,k,v){
var ks__8597 = m.keys;
var len__8598 = ks__8597.length;
var so__8599 = m.strobj;
var out__8600 = cljs.core.with_meta.call(null,cljs.core.PersistentHashMap.EMPTY,cljs.core.meta.call(null,m));
var i__8601 = 0;
var out__8602 = cljs.core.transient$.call(null,out__8600);
while(true){
if((i__8601 < len__8598))
{var k__8603 = (ks__8597[i__8601]);
{
var G__8604 = (i__8601 + 1);
var G__8605 = cljs.core.assoc_BANG_.call(null,out__8602,k__8603,(so__8599[k__8603]));
i__8601 = G__8604;
out__8602 = G__8605;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,cljs.core.assoc_BANG_.call(null,out__8602,k,v));
}
break;
}
});
cljs.core.obj_clone = (function obj_clone(obj,ks){
var new_obj__8611 = {};
var l__8612 = ks.length;
var i__8613 = 0;
while(true){
if((i__8613 < l__8612))
{var k__8614 = (ks[i__8613]);
(new_obj__8611[k__8614] = (obj[k__8614]));
{
var G__8615 = (i__8613 + 1);
i__8613 = G__8615;
continue;
}
} else
{}
break;
}
return new_obj__8611;
});

goog.provide('cljs.core.ObjMap');

/**
* @constructor
*/
cljs.core.ObjMap = (function (meta,keys,strobj,update_count,__hash){
this.meta = meta;
this.keys = keys;
this.strobj = strobj;
this.update_count = update_count;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 4;
this.cljs$lang$protocol_mask$partition0$ = 15075087;
})
cljs.core.ObjMap.cljs$lang$type = true;
cljs.core.ObjMap.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/ObjMap");
});
cljs.core.ObjMap.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/ObjMap");
});
cljs.core.ObjMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__8618 = this;
return cljs.core.transient$.call(null,cljs.core.into.call(null,cljs.core.hash_map.call(null),coll));
});
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8619 = this;
var h__2266__auto____8620 = this__8619.__hash;
if(!((h__2266__auto____8620 == null)))
{return h__2266__auto____8620;
} else
{var h__2266__auto____8621 = cljs.core.hash_imap.call(null,coll);
this__8619.__hash = h__2266__auto____8621;
return h__2266__auto____8621;
}
});
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__8622 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__8623 = this;
if((function (){var and__3941__auto____8624 = goog.isString(k);
if(and__3941__auto____8624)
{return !((cljs.core.scan_array.call(null,1,k,this__8623.keys) == null));
} else
{return and__3941__auto____8624;
}
})())
{return (this__8623.strobj[k]);
} else
{return not_found;
}
});
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__8625 = this;
if(goog.isString(k))
{if((function (){var or__3943__auto____8626 = (this__8625.update_count > cljs.core.ObjMap.HASHMAP_THRESHOLD);
if(or__3943__auto____8626)
{return or__3943__auto____8626;
} else
{return (this__8625.keys.length >= cljs.core.ObjMap.HASHMAP_THRESHOLD);
}
})())
{return cljs.core.obj_map__GT_hash_map.call(null,coll,k,v);
} else
{if(!((cljs.core.scan_array.call(null,1,k,this__8625.keys) == null)))
{var new_strobj__8627 = cljs.core.obj_clone.call(null,this__8625.strobj,this__8625.keys);
(new_strobj__8627[k] = v);
return (new cljs.core.ObjMap(this__8625.meta,this__8625.keys,new_strobj__8627,(this__8625.update_count + 1),null));
} else
{var new_strobj__8628 = cljs.core.obj_clone.call(null,this__8625.strobj,this__8625.keys);
var new_keys__8629 = this__8625.keys.slice();
(new_strobj__8628[k] = v);
new_keys__8629.push(k);
return (new cljs.core.ObjMap(this__8625.meta,new_keys__8629,new_strobj__8628,(this__8625.update_count + 1),null));
}
}
} else
{return cljs.core.obj_map__GT_hash_map.call(null,coll,k,v);
}
});
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__8630 = this;
if((function (){var and__3941__auto____8631 = goog.isString(k);
if(and__3941__auto____8631)
{return !((cljs.core.scan_array.call(null,1,k,this__8630.keys) == null));
} else
{return and__3941__auto____8631;
}
})())
{return true;
} else
{return false;
}
});
cljs.core.ObjMap.prototype.call = (function() {
var G__8653 = null;
var G__8653__2 = (function (this_sym8632,k){
var this__8634 = this;
var this_sym8632__8635 = this;
var coll__8636 = this_sym8632__8635;
return coll__8636.cljs$core$ILookup$_lookup$arity$2(coll__8636,k);
});
var G__8653__3 = (function (this_sym8633,k,not_found){
var this__8634 = this;
var this_sym8633__8637 = this;
var coll__8638 = this_sym8633__8637;
return coll__8638.cljs$core$ILookup$_lookup$arity$3(coll__8638,k,not_found);
});
G__8653 = function(this_sym8633,k,not_found){
switch(arguments.length){
case 2:
return G__8653__2.call(this,this_sym8633,k);
case 3:
return G__8653__3.call(this,this_sym8633,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8653;
})()
;
cljs.core.ObjMap.prototype.apply = (function (this_sym8616,args8617){
var this__8639 = this;
return this_sym8616.call.apply(this_sym8616,[this_sym8616].concat(args8617.slice()));
});
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__8640 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.ObjMap.prototype.toString = (function (){
var this__8641 = this;
var this__8642 = this;
return cljs.core.pr_str.call(null,this__8642);
});
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8643 = this;
if((this__8643.keys.length > 0))
{return cljs.core.map.call(null,(function (p1__8606_SHARP_){
return cljs.core.vector.call(null,p1__8606_SHARP_,(this__8643.strobj[p1__8606_SHARP_]));
}),this__8643.keys.sort(cljs.core.obj_map_compare_keys));
} else
{return null;
}
});
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8644 = this;
return this__8644.keys.length;
});
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8645 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8646 = this;
return (new cljs.core.ObjMap(meta,this__8646.keys,this__8646.strobj,this__8646.update_count,this__8646.__hash));
});
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8647 = this;
return this__8647.meta;
});
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8648 = this;
return cljs.core.with_meta.call(null,cljs.core.ObjMap.EMPTY,this__8648.meta);
});
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__8649 = this;
if((function (){var and__3941__auto____8650 = goog.isString(k);
if(and__3941__auto____8650)
{return !((cljs.core.scan_array.call(null,1,k,this__8649.keys) == null));
} else
{return and__3941__auto____8650;
}
})())
{var new_keys__8651 = this__8649.keys.slice();
var new_strobj__8652 = cljs.core.obj_clone.call(null,this__8649.strobj,this__8649.keys);
new_keys__8651.splice(cljs.core.scan_array.call(null,1,k,new_keys__8651),1);
cljs.core.js_delete.call(null,new_strobj__8652,k);
return (new cljs.core.ObjMap(this__8649.meta,new_keys__8651,new_strobj__8652,(this__8649.update_count + 1),null));
} else
{return coll;
}
});
cljs.core.ObjMap;
cljs.core.ObjMap.EMPTY = (new cljs.core.ObjMap(null,[],{},0,0));
cljs.core.ObjMap.HASHMAP_THRESHOLD = 32;
cljs.core.ObjMap.fromObject = (function (ks,obj){
return (new cljs.core.ObjMap(null,ks,obj,0,null));
});

goog.provide('cljs.core.HashMap');

/**
* @constructor
*/
cljs.core.HashMap = (function (meta,count,hashobj,__hash){
this.meta = meta;
this.count = count;
this.hashobj = hashobj;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 15075087;
})
cljs.core.HashMap.cljs$lang$type = true;
cljs.core.HashMap.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/HashMap");
});
cljs.core.HashMap.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/HashMap");
});
cljs.core.HashMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8657 = this;
var h__2266__auto____8658 = this__8657.__hash;
if(!((h__2266__auto____8658 == null)))
{return h__2266__auto____8658;
} else
{var h__2266__auto____8659 = cljs.core.hash_imap.call(null,coll);
this__8657.__hash = h__2266__auto____8659;
return h__2266__auto____8659;
}
});
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__8660 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__8661 = this;
var bucket__8662 = (this__8661.hashobj[cljs.core.hash.call(null,k)]);
var i__8663 = (cljs.core.truth_(bucket__8662)?cljs.core.scan_array.call(null,2,k,bucket__8662):null);
if(cljs.core.truth_(i__8663))
{return (bucket__8662[(i__8663 + 1)]);
} else
{return not_found;
}
});
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__8664 = this;
var h__8665 = cljs.core.hash.call(null,k);
var bucket__8666 = (this__8664.hashobj[h__8665]);
if(cljs.core.truth_(bucket__8666))
{var new_bucket__8667 = bucket__8666.slice();
var new_hashobj__8668 = goog.object.clone(this__8664.hashobj);
(new_hashobj__8668[h__8665] = new_bucket__8667);
var temp__4090__auto____8669 = cljs.core.scan_array.call(null,2,k,new_bucket__8667);
if(cljs.core.truth_(temp__4090__auto____8669))
{var i__8670 = temp__4090__auto____8669;
(new_bucket__8667[(i__8670 + 1)] = v);
return (new cljs.core.HashMap(this__8664.meta,this__8664.count,new_hashobj__8668,null));
} else
{new_bucket__8667.push(k,v);
return (new cljs.core.HashMap(this__8664.meta,(this__8664.count + 1),new_hashobj__8668,null));
}
} else
{var new_hashobj__8671 = goog.object.clone(this__8664.hashobj);
(new_hashobj__8671[h__8665] = [k,v]);
return (new cljs.core.HashMap(this__8664.meta,(this__8664.count + 1),new_hashobj__8671,null));
}
});
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__8672 = this;
var bucket__8673 = (this__8672.hashobj[cljs.core.hash.call(null,k)]);
var i__8674 = (cljs.core.truth_(bucket__8673)?cljs.core.scan_array.call(null,2,k,bucket__8673):null);
if(cljs.core.truth_(i__8674))
{return true;
} else
{return false;
}
});
cljs.core.HashMap.prototype.call = (function() {
var G__8699 = null;
var G__8699__2 = (function (this_sym8675,k){
var this__8677 = this;
var this_sym8675__8678 = this;
var coll__8679 = this_sym8675__8678;
return coll__8679.cljs$core$ILookup$_lookup$arity$2(coll__8679,k);
});
var G__8699__3 = (function (this_sym8676,k,not_found){
var this__8677 = this;
var this_sym8676__8680 = this;
var coll__8681 = this_sym8676__8680;
return coll__8681.cljs$core$ILookup$_lookup$arity$3(coll__8681,k,not_found);
});
G__8699 = function(this_sym8676,k,not_found){
switch(arguments.length){
case 2:
return G__8699__2.call(this,this_sym8676,k);
case 3:
return G__8699__3.call(this,this_sym8676,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8699;
})()
;
cljs.core.HashMap.prototype.apply = (function (this_sym8655,args8656){
var this__8682 = this;
return this_sym8655.call.apply(this_sym8655,[this_sym8655].concat(args8656.slice()));
});
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__8683 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.HashMap.prototype.toString = (function (){
var this__8684 = this;
var this__8685 = this;
return cljs.core.pr_str.call(null,this__8685);
});
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8686 = this;
if((this__8686.count > 0))
{var hashes__8687 = cljs.core.js_keys.call(null,this__8686.hashobj).sort();
return cljs.core.mapcat.call(null,(function (p1__8654_SHARP_){
return cljs.core.map.call(null,cljs.core.vec,cljs.core.partition.call(null,2,(this__8686.hashobj[p1__8654_SHARP_])));
}),hashes__8687);
} else
{return null;
}
});
cljs.core.HashMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8688 = this;
return this__8688.count;
});
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8689 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8690 = this;
return (new cljs.core.HashMap(meta,this__8690.count,this__8690.hashobj,this__8690.__hash));
});
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8691 = this;
return this__8691.meta;
});
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8692 = this;
return cljs.core.with_meta.call(null,cljs.core.HashMap.EMPTY,this__8692.meta);
});
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__8693 = this;
var h__8694 = cljs.core.hash.call(null,k);
var bucket__8695 = (this__8693.hashobj[h__8694]);
var i__8696 = (cljs.core.truth_(bucket__8695)?cljs.core.scan_array.call(null,2,k,bucket__8695):null);
if(cljs.core.not.call(null,i__8696))
{return coll;
} else
{var new_hashobj__8697 = goog.object.clone(this__8693.hashobj);
if((3 > bucket__8695.length))
{cljs.core.js_delete.call(null,new_hashobj__8697,h__8694);
} else
{var new_bucket__8698 = bucket__8695.slice();
new_bucket__8698.splice(i__8696,2);
(new_hashobj__8697[h__8694] = new_bucket__8698);
}
return (new cljs.core.HashMap(this__8693.meta,(this__8693.count - 1),new_hashobj__8697,null));
}
});
cljs.core.HashMap;
cljs.core.HashMap.EMPTY = (new cljs.core.HashMap(null,0,{},0));
cljs.core.HashMap.fromArrays = (function (ks,vs){
var len__8700 = ks.length;
var i__8701 = 0;
var out__8702 = cljs.core.HashMap.EMPTY;
while(true){
if((i__8701 < len__8700))
{{
var G__8703 = (i__8701 + 1);
var G__8704 = cljs.core.assoc.call(null,out__8702,(ks[i__8701]),(vs[i__8701]));
i__8701 = G__8703;
out__8702 = G__8704;
continue;
}
} else
{return out__8702;
}
break;
}
});
cljs.core.array_map_index_of = (function array_map_index_of(m,k){
var arr__8708 = m.arr;
var len__8709 = arr__8708.length;
var i__8710 = 0;
while(true){
if((len__8709 <= i__8710))
{return -1;
} else
{if(cljs.core._EQ_.call(null,(arr__8708[i__8710]),k))
{return i__8710;
} else
{if("\uFDD0'else")
{{
var G__8711 = (i__8710 + 2);
i__8710 = G__8711;
continue;
}
} else
{return null;
}
}
}
break;
}
});

goog.provide('cljs.core.PersistentArrayMap');

/**
* @constructor
*/
cljs.core.PersistentArrayMap = (function (meta,cnt,arr,__hash){
this.meta = meta;
this.cnt = cnt;
this.arr = arr;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 4;
this.cljs$lang$protocol_mask$partition0$ = 16123663;
})
cljs.core.PersistentArrayMap.cljs$lang$type = true;
cljs.core.PersistentArrayMap.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentArrayMap");
});
cljs.core.PersistentArrayMap.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/PersistentArrayMap");
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__8714 = this;
return (new cljs.core.TransientArrayMap({},this__8714.arr.length,this__8714.arr.slice()));
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__8715 = this;
var h__2266__auto____8716 = this__8715.__hash;
if(!((h__2266__auto____8716 == null)))
{return h__2266__auto____8716;
} else
{var h__2266__auto____8717 = cljs.core.hash_imap.call(null,coll);
this__8715.__hash = h__2266__auto____8717;
return h__2266__auto____8717;
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__8718 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__8719 = this;
var idx__8720 = cljs.core.array_map_index_of.call(null,coll,k);
if((idx__8720 === -1))
{return not_found;
} else
{return (this__8719.arr[(idx__8720 + 1)]);
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__8721 = this;
var idx__8722 = cljs.core.array_map_index_of.call(null,coll,k);
if((idx__8722 === -1))
{if((this__8721.cnt < cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD))
{return (new cljs.core.PersistentArrayMap(this__8721.meta,(this__8721.cnt + 1),(function (){var G__8723__8724 = this__8721.arr.slice();
G__8723__8724.push(k);
G__8723__8724.push(v);
return G__8723__8724;
})(),null));
} else
{return cljs.core.persistent_BANG_.call(null,cljs.core.assoc_BANG_.call(null,cljs.core.transient$.call(null,cljs.core.into.call(null,cljs.core.PersistentHashMap.EMPTY,coll)),k,v));
}
} else
{if((v === (this__8721.arr[(idx__8722 + 1)])))
{return coll;
} else
{if("\uFDD0'else")
{return (new cljs.core.PersistentArrayMap(this__8721.meta,this__8721.cnt,(function (){var G__8725__8726 = this__8721.arr.slice();
(G__8725__8726[(idx__8722 + 1)] = v);
return G__8725__8726;
})(),null));
} else
{return null;
}
}
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__8727 = this;
return !((cljs.core.array_map_index_of.call(null,coll,k) === -1));
});
cljs.core.PersistentArrayMap.prototype.call = (function() {
var G__8759 = null;
var G__8759__2 = (function (this_sym8728,k){
var this__8730 = this;
var this_sym8728__8731 = this;
var coll__8732 = this_sym8728__8731;
return coll__8732.cljs$core$ILookup$_lookup$arity$2(coll__8732,k);
});
var G__8759__3 = (function (this_sym8729,k,not_found){
var this__8730 = this;
var this_sym8729__8733 = this;
var coll__8734 = this_sym8729__8733;
return coll__8734.cljs$core$ILookup$_lookup$arity$3(coll__8734,k,not_found);
});
G__8759 = function(this_sym8729,k,not_found){
switch(arguments.length){
case 2:
return G__8759__2.call(this,this_sym8729,k);
case 3:
return G__8759__3.call(this,this_sym8729,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__8759;
})()
;
cljs.core.PersistentArrayMap.prototype.apply = (function (this_sym8712,args8713){
var this__8735 = this;
return this_sym8712.call.apply(this_sym8712,[this_sym8712].concat(args8713.slice()));
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (coll,f,init){
var this__8736 = this;
var len__8737 = this__8736.arr.length;
var i__8738 = 0;
var init__8739 = init;
while(true){
if((i__8738 < len__8737))
{var init__8740 = f.call(null,init__8739,(this__8736.arr[i__8738]),(this__8736.arr[(i__8738 + 1)]));
if(cljs.core.reduced_QMARK_.call(null,init__8740))
{return cljs.core.deref.call(null,init__8740);
} else
{{
var G__8760 = (i__8738 + 2);
var G__8761 = init__8740;
i__8738 = G__8760;
init__8739 = G__8761;
continue;
}
}
} else
{return null;
}
break;
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__8741 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.PersistentArrayMap.prototype.toString = (function (){
var this__8742 = this;
var this__8743 = this;
return cljs.core.pr_str.call(null,this__8743);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__8744 = this;
if((this__8744.cnt > 0))
{var len__8745 = this__8744.arr.length;
var array_map_seq__8746 = (function array_map_seq(i){
return (new cljs.core.LazySeq(null,false,(function (){
if((i < len__8745))
{return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([(this__8744.arr[i]),(this__8744.arr[(i + 1)])], true),array_map_seq.call(null,(i + 2)));
} else
{return null;
}
}),null));
});
return array_map_seq__8746.call(null,0);
} else
{return null;
}
});
cljs.core.PersistentArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__8747 = this;
return this__8747.cnt;
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__8748 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__8749 = this;
return (new cljs.core.PersistentArrayMap(meta,this__8749.cnt,this__8749.arr,this__8749.__hash));
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__8750 = this;
return this__8750.meta;
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__8751 = this;
return cljs.core._with_meta.call(null,cljs.core.PersistentArrayMap.EMPTY,this__8751.meta);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__8752 = this;
var idx__8753 = cljs.core.array_map_index_of.call(null,coll,k);
if((idx__8753 >= 0))
{var len__8754 = this__8752.arr.length;
var new_len__8755 = (len__8754 - 2);
if((new_len__8755 === 0))
{return coll.cljs$core$IEmptyableCollection$_empty$arity$1(coll);
} else
{var new_arr__8756 = cljs.core.make_array.call(null,new_len__8755);
var s__8757 = 0;
var d__8758 = 0;
while(true){
if((s__8757 >= len__8754))
{return (new cljs.core.PersistentArrayMap(this__8752.meta,(this__8752.cnt - 1),new_arr__8756,null));
} else
{if(cljs.core._EQ_.call(null,k,(this__8752.arr[s__8757])))
{{
var G__8762 = (s__8757 + 2);
var G__8763 = d__8758;
s__8757 = G__8762;
d__8758 = G__8763;
continue;
}
} else
{if("\uFDD0'else")
{(new_arr__8756[d__8758] = (this__8752.arr[s__8757]));
(new_arr__8756[(d__8758 + 1)] = (this__8752.arr[(s__8757 + 1)]));
{
var G__8764 = (s__8757 + 2);
var G__8765 = (d__8758 + 2);
s__8757 = G__8764;
d__8758 = G__8765;
continue;
}
} else
{return null;
}
}
}
break;
}
}
} else
{return coll;
}
});
cljs.core.PersistentArrayMap;
cljs.core.PersistentArrayMap.EMPTY = (new cljs.core.PersistentArrayMap(null,0,[],null));
cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD = 16;
cljs.core.PersistentArrayMap.fromArrays = (function (ks,vs){
var len__8766 = cljs.core.count.call(null,ks);
var i__8767 = 0;
var out__8768 = cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY);
while(true){
if((i__8767 < len__8766))
{{
var G__8769 = (i__8767 + 1);
var G__8770 = cljs.core.assoc_BANG_.call(null,out__8768,(ks[i__8767]),(vs[i__8767]));
i__8767 = G__8769;
out__8768 = G__8770;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__8768);
}
break;
}
});

goog.provide('cljs.core.TransientArrayMap');

/**
* @constructor
*/
cljs.core.TransientArrayMap = (function (editable_QMARK_,len,arr){
this.editable_QMARK_ = editable_QMARK_;
this.len = len;
this.arr = arr;
this.cljs$lang$protocol_mask$partition1$ = 56;
this.cljs$lang$protocol_mask$partition0$ = 258;
})
cljs.core.TransientArrayMap.cljs$lang$type = true;
cljs.core.TransientArrayMap.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/TransientArrayMap");
});
cljs.core.TransientArrayMap.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/TransientArrayMap");
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = (function (tcoll,key){
var this__8771 = this;
if(cljs.core.truth_(this__8771.editable_QMARK_))
{var idx__8772 = cljs.core.array_map_index_of.call(null,tcoll,key);
if((idx__8772 >= 0))
{(this__8771.arr[idx__8772] = (this__8771.arr[(this__8771.len - 2)]));
(this__8771.arr[(idx__8772 + 1)] = (this__8771.arr[(this__8771.len - 1)]));
var G__8773__8774 = this__8771.arr;
G__8773__8774.pop();
G__8773__8774.pop();
G__8773__8774;
this__8771.len = (this__8771.len - 2);
} else
{}
return tcoll;
} else
{throw (new Error("dissoc! after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = (function (tcoll,key,val){
var this__8775 = this;
if(cljs.core.truth_(this__8775.editable_QMARK_))
{var idx__8776 = cljs.core.array_map_index_of.call(null,tcoll,key);
if((idx__8776 === -1))
{if(((this__8775.len + 2) <= (2 * cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD)))
{this__8775.len = (this__8775.len + 2);
this__8775.arr.push(key);
this__8775.arr.push(val);
return tcoll;
} else
{return cljs.core.assoc_BANG_.call(null,cljs.core.array__GT_transient_hash_map.call(null,this__8775.len,this__8775.arr),key,val);
}
} else
{if((val === (this__8775.arr[(idx__8776 + 1)])))
{return tcoll;
} else
{(this__8775.arr[(idx__8776 + 1)] = val);
return tcoll;
}
}
} else
{throw (new Error("assoc! after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,o){
var this__8777 = this;
if(cljs.core.truth_(this__8777.editable_QMARK_))
{if((function (){var G__8778__8779 = o;
if(G__8778__8779)
{if((function (){var or__3943__auto____8780 = (G__8778__8779.cljs$lang$protocol_mask$partition0$ & 2048);
if(or__3943__auto____8780)
{return or__3943__auto____8780;
} else
{return G__8778__8779.cljs$core$IMapEntry$;
}
})())
{return true;
} else
{if((!G__8778__8779.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__8778__8779);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__8778__8779);
}
})())
{return tcoll.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll,cljs.core.key.call(null,o),cljs.core.val.call(null,o));
} else
{var es__8781 = cljs.core.seq.call(null,o);
var tcoll__8782 = tcoll;
while(true){
var temp__4090__auto____8783 = cljs.core.first.call(null,es__8781);
if(cljs.core.truth_(temp__4090__auto____8783))
{var e__8784 = temp__4090__auto____8783;
{
var G__8790 = cljs.core.next.call(null,es__8781);
var G__8791 = tcoll__8782.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(tcoll__8782,cljs.core.key.call(null,e__8784),cljs.core.val.call(null,e__8784));
es__8781 = G__8790;
tcoll__8782 = G__8791;
continue;
}
} else
{return tcoll__8782;
}
break;
}
}
} else
{throw (new Error("conj! after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__8785 = this;
if(cljs.core.truth_(this__8785.editable_QMARK_))
{this__8785.editable_QMARK_ = false;
return (new cljs.core.PersistentArrayMap(null,cljs.core.quot.call(null,this__8785.len,2),this__8785.arr,null));
} else
{throw (new Error("persistent! called twice"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (tcoll,k){
var this__8786 = this;
return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll,k,null);
});
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (tcoll,k,not_found){
var this__8787 = this;
if(cljs.core.truth_(this__8787.editable_QMARK_))
{var idx__8788 = cljs.core.array_map_index_of.call(null,tcoll,k);
if((idx__8788 === -1))
{return not_found;
} else
{return (this__8787.arr[(idx__8788 + 1)]);
}
} else
{throw (new Error("lookup after persistent!"));
}
});
cljs.core.TransientArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (tcoll){
var this__8789 = this;
if(cljs.core.truth_(this__8789.editable_QMARK_))
{return cljs.core.quot.call(null,this__8789.len,2);
} else
{throw (new Error("count after persistent!"));
}
});
cljs.core.TransientArrayMap;
cljs.core.array__GT_transient_hash_map = (function array__GT_transient_hash_map(len,arr){
var out__8794 = cljs.core.transient$.call(null,cljs.core.ObjMap.EMPTY);
var i__8795 = 0;
while(true){
if((i__8795 < len))
{{
var G__8796 = cljs.core.assoc_BANG_.call(null,out__8794,(arr[i__8795]),(arr[(i__8795 + 1)]));
var G__8797 = (i__8795 + 2);
out__8794 = G__8796;
i__8795 = G__8797;
continue;
}
} else
{return out__8794;
}
break;
}
});

goog.provide('cljs.core.Box');

/**
* @constructor
*/
cljs.core.Box = (function (val){
this.val = val;
})
cljs.core.Box.cljs$lang$type = true;
cljs.core.Box.cljs$lang$ctorPrSeq = (function (this__2387__auto__){
return cljs.core.list.call(null,"cljs.core/Box");
});
cljs.core.Box.cljs$lang$ctorPrWriter = (function (this__2387__auto__,writer__2388__auto__){
return cljs.core._write.call(null,writer__2388__auto__,"cljs.core/Box");
});
cljs.core.Box;
cljs.core.key_test = (function key_test(key,other){
if(goog.isString(key))
{return (key === other);
} else
{return cljs.core._EQ_.call(null,key,other);
}
});
cljs.core.mask = (function mask(hash,shift){
return ((hash >>> shift) & 31);
});
cljs.core.clone_and_set = (function() {
var clone_and_set = null;
var clone_and_set__3 = (function (arr,i,a){
var G__8802__8803 = arr.slice();
(G__8802__8803[i] = a);
return G__8802__8803;
});
var clone_and_set__5 = (function (arr,i,a,j,b){
var G__8804__8805 = arr.slice();
(G__8804__8805[i] = a);
(G__8804__8805[j] = b);
return G__8804__8805;
});
clone_and_set = function(arr,i,a,j,b){
switch(arguments.length){
case 3:
return clone_and_set__3.call(this,arr,i,a);
case 5:
return clone_and_set__5.call(this,arr,i,a,j,b);
}
throw('Invalid arity: ' + arguments.length);
};
clone_and_set.cljs$lang$arity$3 = clone_and_set__3;
clone_and_set.cljs$lang$arity$5 = clone_and_set__5;
return clone_and_set;
})()
;
cljs.core.remove_pair = (function remove_pair(arr,i){
var new_arr__8807 = cljs.core.make_array.call(null,(arr.length - 2));
cljs.core.array_copy.call(null,arr,0,new_arr__8807,0,(2 * i));
cljs.core.array_copy.call(null,arr,(2 * (i + 1)),new_arr__8807,(2 * i),(new_arr__8807.length - (2 * i)));
return new_arr__8807;
});
cljs.core.bitmap_indexed_node_index = (function bitmap_indexed_node_index(bitmap,bit){
return cljs.core.bit_count.call(null,(bitmap & (bit - 1)));
});
cljs.core.bitpos = (function bitpos(hash,shift){
return (1 << ((hash >>> shift) & 0x01f));
});
cljs.core.edit_and_set = (function() {
var edit_and_set = null;
var edit_and_set__4 = (function (inode,edit,i,a){
var editable__8810 = inode.ensure_editable(edit);
(editable__8810.arr[i] = a);
return editable__8810;
});
var edit_and_set__6 = (function (inode,edit,i,a,j,b){
var editable__8811 = inode.ensure_editable(edit);
(editable__8811.arr[i] = a);
(editable__8811.arr[j] = b);
return editable__8811;
});
edit_and_set = function(inode,edit,i,a,j,b){
switch(arguments.length){
case 4:
return edit_and_set__4.call(this,inode,edit,i,a);
case 6:
return edit_and_set__6.call(this,inode,edit,i,a,j,b);
}
throw('Invalid arity: ' + arguments.length);
};
edit_and_set.cljs$lang$arity$4 = edit_and_set__4;
edit_and_set.cljs$lang$arity$6 = edit_and_set__6;
return edit_and_set;
})()
;
cljs.core.inode_kv_reduce = (function inode_kv_reduce(arr,f,init){
var len__8818 = arr.length;
var i__8819 = 0;
var init__8820 = init;
while(true){
if((i__8819 < len__8818))
{var init__8823 = (function (){var k__8821 = (arr[i__8819]);
if(!((k__8821 == null)))
{return f.call(null,init__8820,k__8821,(arr[(i__8819 + 1)]));
} else
{var node__8822 = (arr[(i__8819 + 1)]);
if(!((node__8822 == null)))
{return node__8822.kv_reduce(f,init__8820);
} else
{return init__8820;
}
}
})();
if(cljs.core.reduced_QMARK_.call(null,init__8823))
{return cljs.core.deref.call(null,init__8823);
} else
{{
var G__8824 = (i__8819 + 2);
var G__8825 = init__8823;
i__8819 = G__8824;
init__8820 = G__8825;
continue;
}
}
} else
{return init__8820;
}
break;
}
});

goog.provide('cljs.core.BitmapIndexedNode');

/**
* @constructor
*/
cljs.core.BitmapIndexedNode = (function (edit,bitmap,arr){
this.edit = edit;
this.bitmap = bitmap;
this.arr = arr;
})
cljs.core.BitmapIndexedNode.cljs$lang$type = true;
cljs.core.BitmapIndexedNode.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/BitmapIndexedNode");
});
cljs.core.BitmapIndexedNode.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/BitmapIndexedNode");
});
cljs.core.BitmapIndexedNode.prototype.edit_and_remove_pair = (function (e,bit,i){
var this__8826 = this;
var inode__8827 = this;
if((this__8826.bitmap === bit))
{return null;
} else
{var editable__8828 = inode__8827.ensure_editable(e);
var earr__8829 = editable__8828.arr;
var len__8830 = earr__8829.length;
editable__8828.bitmap = (bit ^ editable__8828.bitmap);
cljs.core.array_copy.call(null,earr__8829,(2 * (i + 1)),earr__8829,(2 * i),(len__8830 - (2 * (i + 1))));
(earr__8829[(len__8830 - 2)] = null);
(earr__8829[(len__8830 - 1)] = null);
return editable__8828;
}
});
cljs.core.BitmapIndexedNode.prototype.inode_assoc_BANG_ = (function (edit,shift,hash,key,val,added_leaf_QMARK_){
var this__8831 = this;
var inode__8832 = this;
var bit__8833 = (1 << ((hash >>> shift) & 0x01f));
var idx__8834 = cljs.core.bitmap_indexed_node_index.call(null,this__8831.bitmap,bit__8833);
if(((this__8831.bitmap & bit__8833) === 0))
{var n__8835 = cljs.core.bit_count.call(null,this__8831.bitmap);
if(((2 * n__8835) < this__8831.arr.length))
{var editable__8836 = inode__8832.ensure_editable(edit);
var earr__8837 = editable__8836.arr;
added_leaf_QMARK_.val = true;
cljs.core.array_copy_downward.call(null,earr__8837,(2 * idx__8834),earr__8837,(2 * (idx__8834 + 1)),(2 * (n__8835 - idx__8834)));
(earr__8837[(2 * idx__8834)] = key);
(earr__8837[((2 * idx__8834) + 1)] = val);
editable__8836.bitmap = (editable__8836.bitmap | bit__8833);
return editable__8836;
} else
{if((n__8835 >= 16))
{var nodes__8838 = cljs.core.make_array.call(null,32);
var jdx__8839 = ((hash >>> shift) & 0x01f);
(nodes__8838[jdx__8839] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_));
var i__8840 = 0;
var j__8841 = 0;
while(true){
if((i__8840 < 32))
{if((((this__8831.bitmap >>> i__8840) & 1) === 0))
{{
var G__8894 = (i__8840 + 1);
var G__8895 = j__8841;
i__8840 = G__8894;
j__8841 = G__8895;
continue;
}
} else
{(nodes__8838[i__8840] = ((!(((this__8831.arr[j__8841]) == null)))?cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,(shift + 5),cljs.core.hash.call(null,(this__8831.arr[j__8841])),(this__8831.arr[j__8841]),(this__8831.arr[(j__8841 + 1)]),added_leaf_QMARK_):(this__8831.arr[(j__8841 + 1)])));
{
var G__8896 = (i__8840 + 1);
var G__8897 = (j__8841 + 2);
i__8840 = G__8896;
j__8841 = G__8897;
continue;
}
}
} else
{}
break;
}
return (new cljs.core.ArrayNode(edit,(n__8835 + 1),nodes__8838));
} else
{if("\uFDD0'else")
{var new_arr__8842 = cljs.core.make_array.call(null,(2 * (n__8835 + 4)));
cljs.core.array_copy.call(null,this__8831.arr,0,new_arr__8842,0,(2 * idx__8834));
(new_arr__8842[(2 * idx__8834)] = key);
(new_arr__8842[((2 * idx__8834) + 1)] = val);
cljs.core.array_copy.call(null,this__8831.arr,(2 * idx__8834),new_arr__8842,(2 * (idx__8834 + 1)),(2 * (n__8835 - idx__8834)));
added_leaf_QMARK_.val = true;
var editable__8843 = inode__8832.ensure_editable(edit);
editable__8843.arr = new_arr__8842;
editable__8843.bitmap = (editable__8843.bitmap | bit__8833);
return editable__8843;
} else
{return null;
}
}
}
} else
{var key_or_nil__8844 = (this__8831.arr[(2 * idx__8834)]);
var val_or_node__8845 = (this__8831.arr[((2 * idx__8834) + 1)]);
if((key_or_nil__8844 == null))
{var n__8846 = val_or_node__8845.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__8846 === val_or_node__8845))
{return inode__8832;
} else
{return cljs.core.edit_and_set.call(null,inode__8832,edit,((2 * idx__8834) + 1),n__8846);
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__8844))
{if((val === val_or_node__8845))
{return inode__8832;
} else
{return cljs.core.edit_and_set.call(null,inode__8832,edit,((2 * idx__8834) + 1),val);
}
} else
{if("\uFDD0'else")
{added_leaf_QMARK_.val = true;
return cljs.core.edit_and_set.call(null,inode__8832,edit,(2 * idx__8834),null,((2 * idx__8834) + 1),cljs.core.create_node.call(null,edit,(shift + 5),key_or_nil__8844,val_or_node__8845,hash,key,val));
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_seq = (function (){
var this__8847 = this;
var inode__8848 = this;
return cljs.core.create_inode_seq.call(null,this__8847.arr);
});
cljs.core.BitmapIndexedNode.prototype.inode_without_BANG_ = (function (edit,shift,hash,key,removed_leaf_QMARK_){
var this__8849 = this;
var inode__8850 = this;
var bit__8851 = (1 << ((hash >>> shift) & 0x01f));
if(((this__8849.bitmap & bit__8851) === 0))
{return inode__8850;
} else
{var idx__8852 = cljs.core.bitmap_indexed_node_index.call(null,this__8849.bitmap,bit__8851);
var key_or_nil__8853 = (this__8849.arr[(2 * idx__8852)]);
var val_or_node__8854 = (this__8849.arr[((2 * idx__8852) + 1)]);
if((key_or_nil__8853 == null))
{var n__8855 = val_or_node__8854.inode_without_BANG_(edit,(shift + 5),hash,key,removed_leaf_QMARK_);
if((n__8855 === val_or_node__8854))
{return inode__8850;
} else
{if(!((n__8855 == null)))
{return cljs.core.edit_and_set.call(null,inode__8850,edit,((2 * idx__8852) + 1),n__8855);
} else
{if((this__8849.bitmap === bit__8851))
{return null;
} else
{if("\uFDD0'else")
{return inode__8850.edit_and_remove_pair(edit,bit__8851,idx__8852);
} else
{return null;
}
}
}
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__8853))
{(removed_leaf_QMARK_[0] = true);
return inode__8850.edit_and_remove_pair(edit,bit__8851,idx__8852);
} else
{if("\uFDD0'else")
{return inode__8850;
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.ensure_editable = (function (e){
var this__8856 = this;
var inode__8857 = this;
if((e === this__8856.edit))
{return inode__8857;
} else
{var n__8858 = cljs.core.bit_count.call(null,this__8856.bitmap);
var new_arr__8859 = cljs.core.make_array.call(null,(((n__8858 < 0))?4:(2 * (n__8858 + 1))));
cljs.core.array_copy.call(null,this__8856.arr,0,new_arr__8859,0,(2 * n__8858));
return (new cljs.core.BitmapIndexedNode(e,this__8856.bitmap,new_arr__8859));
}
});
cljs.core.BitmapIndexedNode.prototype.kv_reduce = (function (f,init){
var this__8860 = this;
var inode__8861 = this;
return cljs.core.inode_kv_reduce.call(null,this__8860.arr,f,init);
});
cljs.core.BitmapIndexedNode.prototype.inode_find = (function (shift,hash,key,not_found){
var this__8862 = this;
var inode__8863 = this;
var bit__8864 = (1 << ((hash >>> shift) & 0x01f));
if(((this__8862.bitmap & bit__8864) === 0))
{return not_found;
} else
{var idx__8865 = cljs.core.bitmap_indexed_node_index.call(null,this__8862.bitmap,bit__8864);
var key_or_nil__8866 = (this__8862.arr[(2 * idx__8865)]);
var val_or_node__8867 = (this__8862.arr[((2 * idx__8865) + 1)]);
if((key_or_nil__8866 == null))
{return val_or_node__8867.inode_find((shift + 5),hash,key,not_found);
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__8866))
{return cljs.core.PersistentVector.fromArray([key_or_nil__8866,val_or_node__8867], true);
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_without = (function (shift,hash,key){
var this__8868 = this;
var inode__8869 = this;
var bit__8870 = (1 << ((hash >>> shift) & 0x01f));
if(((this__8868.bitmap & bit__8870) === 0))
{return inode__8869;
} else
{var idx__8871 = cljs.core.bitmap_indexed_node_index.call(null,this__8868.bitmap,bit__8870);
var key_or_nil__8872 = (this__8868.arr[(2 * idx__8871)]);
var val_or_node__8873 = (this__8868.arr[((2 * idx__8871) + 1)]);
if((key_or_nil__8872 == null))
{var n__8874 = val_or_node__8873.inode_without((shift + 5),hash,key);
if((n__8874 === val_or_node__8873))
{return inode__8869;
} else
{if(!((n__8874 == null)))
{return (new cljs.core.BitmapIndexedNode(null,this__8868.bitmap,cljs.core.clone_and_set.call(null,this__8868.arr,((2 * idx__8871) + 1),n__8874)));
} else
{if((this__8868.bitmap === bit__8870))
{return null;
} else
{if("\uFDD0'else")
{return (new cljs.core.BitmapIndexedNode(null,(this__8868.bitmap ^ bit__8870),cljs.core.remove_pair.call(null,this__8868.arr,idx__8871)));
} else
{return null;
}
}
}
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__8872))
{return (new cljs.core.BitmapIndexedNode(null,(this__8868.bitmap ^ bit__8870),cljs.core.remove_pair.call(null,this__8868.arr,idx__8871)));
} else
{if("\uFDD0'else")
{return inode__8869;
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_assoc = (function (shift,hash,key,val,added_leaf_QMARK_){
var this__8875 = this;
var inode__8876 = this;
var bit__8877 = (1 << ((hash >>> shift) & 0x01f));
var idx__8878 = cljs.core.bitmap_indexed_node_index.call(null,this__8875.bitmap,bit__8877);
if(((this__8875.bitmap & bit__8877) === 0))
{var n__8879 = cljs.core.bit_count.call(null,this__8875.bitmap);
if((n__8879 >= 16))
{var nodes__8880 = cljs.core.make_array.call(null,32);
var jdx__8881 = ((hash >>> shift) & 0x01f);
(nodes__8880[jdx__8881] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_));
var i__8882 = 0;
var j__8883 = 0;
while(true){
if((i__8882 < 32))
{if((((this__8875.bitmap >>> i__8882) & 1) === 0))
{{
var G__8898 = (i__8882 + 1);
var G__8899 = j__8883;
i__8882 = G__8898;
j__8883 = G__8899;
continue;
}
} else
{(nodes__8880[i__8882] = ((!(((this__8875.arr[j__8883]) == null)))?cljs.core.BitmapIndexedNode.EMPTY.inode_assoc((shift + 5),cljs.core.hash.call(null,(this__8875.arr[j__8883])),(this__8875.arr[j__8883]),(this__8875.arr[(j__8883 + 1)]),added_leaf_QMARK_):(this__8875.arr[(j__8883 + 1)])));
{
var G__8900 = (i__8882 + 1);
var G__8901 = (j__8883 + 2);
i__8882 = G__8900;
j__8883 = G__8901;
continue;
}
}
} else
{}
break;
}
return (new cljs.core.ArrayNode(null,(n__8879 + 1),nodes__8880));
} else
{var new_arr__8884 = cljs.core.make_array.call(null,(2 * (n__8879 + 1)));
cljs.core.array_copy.call(null,this__8875.arr,0,new_arr__8884,0,(2 * idx__8878));
(new_arr__8884[(2 * idx__8878)] = key);
(new_arr__8884[((2 * idx__8878) + 1)] = val);
cljs.core.array_copy.call(null,this__8875.arr,(2 * idx__8878),new_arr__8884,(2 * (idx__8878 + 1)),(2 * (n__8879 - idx__8878)));
added_leaf_QMARK_.val = true;
return (new cljs.core.BitmapIndexedNode(null,(this__8875.bitmap | bit__8877),new_arr__8884));
}
} else
{var key_or_nil__8885 = (this__8875.arr[(2 * idx__8878)]);
var val_or_node__8886 = (this__8875.arr[((2 * idx__8878) + 1)]);
if((key_or_nil__8885 == null))
{var n__8887 = val_or_node__8886.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__8887 === val_or_node__8886))
{return inode__8876;
} else
{return (new cljs.core.BitmapIndexedNode(null,this__8875.bitmap,cljs.core.clone_and_set.call(null,this__8875.arr,((2 * idx__8878) + 1),n__8887)));
}
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__8885))
{if((val === val_or_node__8886))
{return inode__8876;
} else
{return (new cljs.core.BitmapIndexedNode(null,this__8875.bitmap,cljs.core.clone_and_set.call(null,this__8875.arr,((2 * idx__8878) + 1),val)));
}
} else
{if("\uFDD0'else")
{added_leaf_QMARK_.val = true;
return (new cljs.core.BitmapIndexedNode(null,this__8875.bitmap,cljs.core.clone_and_set.call(null,this__8875.arr,(2 * idx__8878),null,((2 * idx__8878) + 1),cljs.core.create_node.call(null,(shift + 5),key_or_nil__8885,val_or_node__8886,hash,key,val))));
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode.prototype.inode_lookup = (function (shift,hash,key,not_found){
var this__8888 = this;
var inode__8889 = this;
var bit__8890 = (1 << ((hash >>> shift) & 0x01f));
if(((this__8888.bitmap & bit__8890) === 0))
{return not_found;
} else
{var idx__8891 = cljs.core.bitmap_indexed_node_index.call(null,this__8888.bitmap,bit__8890);
var key_or_nil__8892 = (this__8888.arr[(2 * idx__8891)]);
var val_or_node__8893 = (this__8888.arr[((2 * idx__8891) + 1)]);
if((key_or_nil__8892 == null))
{return val_or_node__8893.inode_lookup((shift + 5),hash,key,not_found);
} else
{if(cljs.core.key_test.call(null,key,key_or_nil__8892))
{return val_or_node__8893;
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
}
});
cljs.core.BitmapIndexedNode;
cljs.core.BitmapIndexedNode.EMPTY = (new cljs.core.BitmapIndexedNode(null,0,cljs.core.make_array.call(null,0)));
cljs.core.pack_array_node = (function pack_array_node(array_node,edit,idx){
var arr__8909 = array_node.arr;
var len__8910 = (2 * (array_node.cnt - 1));
var new_arr__8911 = cljs.core.make_array.call(null,len__8910);
var i__8912 = 0;
var j__8913 = 1;
var bitmap__8914 = 0;
while(true){
if((i__8912 < len__8910))
{if((function (){var and__3941__auto____8915 = !((i__8912 === idx));
if(and__3941__auto____8915)
{return !(((arr__8909[i__8912]) == null));
} else
{return and__3941__auto____8915;
}
})())
{(new_arr__8911[j__8913] = (arr__8909[i__8912]));
{
var G__8916 = (i__8912 + 1);
var G__8917 = (j__8913 + 2);
var G__8918 = (bitmap__8914 | (1 << i__8912));
i__8912 = G__8916;
j__8913 = G__8917;
bitmap__8914 = G__8918;
continue;
}
} else
{{
var G__8919 = (i__8912 + 1);
var G__8920 = j__8913;
var G__8921 = bitmap__8914;
i__8912 = G__8919;
j__8913 = G__8920;
bitmap__8914 = G__8921;
continue;
}
}
} else
{return (new cljs.core.BitmapIndexedNode(edit,bitmap__8914,new_arr__8911));
}
break;
}
});

goog.provide('cljs.core.ArrayNode');

/**
* @constructor
*/
cljs.core.ArrayNode = (function (edit,cnt,arr){
this.edit = edit;
this.cnt = cnt;
this.arr = arr;
})
cljs.core.ArrayNode.cljs$lang$type = true;
cljs.core.ArrayNode.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/ArrayNode");
});
cljs.core.ArrayNode.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/ArrayNode");
});
cljs.core.ArrayNode.prototype.inode_assoc_BANG_ = (function (edit,shift,hash,key,val,added_leaf_QMARK_){
var this__8922 = this;
var inode__8923 = this;
var idx__8924 = ((hash >>> shift) & 0x01f);
var node__8925 = (this__8922.arr[idx__8924]);
if((node__8925 == null))
{var editable__8926 = cljs.core.edit_and_set.call(null,inode__8923,edit,idx__8924,cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_));
editable__8926.cnt = (editable__8926.cnt + 1);
return editable__8926;
} else
{var n__8927 = node__8925.inode_assoc_BANG_(edit,(shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__8927 === node__8925))
{return inode__8923;
} else
{return cljs.core.edit_and_set.call(null,inode__8923,edit,idx__8924,n__8927);
}
}
});
cljs.core.ArrayNode.prototype.inode_seq = (function (){
var this__8928 = this;
var inode__8929 = this;
return cljs.core.create_array_node_seq.call(null,this__8928.arr);
});
cljs.core.ArrayNode.prototype.inode_without_BANG_ = (function (edit,shift,hash,key,removed_leaf_QMARK_){
var this__8930 = this;
var inode__8931 = this;
var idx__8932 = ((hash >>> shift) & 0x01f);
var node__8933 = (this__8930.arr[idx__8932]);
if((node__8933 == null))
{return inode__8931;
} else
{var n__8934 = node__8933.inode_without_BANG_(edit,(shift + 5),hash,key,removed_leaf_QMARK_);
if((n__8934 === node__8933))
{return inode__8931;
} else
{if((n__8934 == null))
{if((this__8930.cnt <= 8))
{return cljs.core.pack_array_node.call(null,inode__8931,edit,idx__8932);
} else
{var editable__8935 = cljs.core.edit_and_set.call(null,inode__8931,edit,idx__8932,n__8934);
editable__8935.cnt = (editable__8935.cnt - 1);
return editable__8935;
}
} else
{if("\uFDD0'else")
{return cljs.core.edit_and_set.call(null,inode__8931,edit,idx__8932,n__8934);
} else
{return null;
}
}
}
}
});
cljs.core.ArrayNode.prototype.ensure_editable = (function (e){
var this__8936 = this;
var inode__8937 = this;
if((e === this__8936.edit))
{return inode__8937;
} else
{return (new cljs.core.ArrayNode(e,this__8936.cnt,this__8936.arr.slice()));
}
});
cljs.core.ArrayNode.prototype.kv_reduce = (function (f,init){
var this__8938 = this;
var inode__8939 = this;
var len__8940 = this__8938.arr.length;
var i__8941 = 0;
var init__8942 = init;
while(true){
if((i__8941 < len__8940))
{var node__8943 = (this__8938.arr[i__8941]);
if(!((node__8943 == null)))
{var init__8944 = node__8943.kv_reduce(f,init__8942);
if(cljs.core.reduced_QMARK_.call(null,init__8944))
{return cljs.core.deref.call(null,init__8944);
} else
{{
var G__8963 = (i__8941 + 1);
var G__8964 = init__8944;
i__8941 = G__8963;
init__8942 = G__8964;
continue;
}
}
} else
{return null;
}
} else
{return init__8942;
}
break;
}
});
cljs.core.ArrayNode.prototype.inode_find = (function (shift,hash,key,not_found){
var this__8945 = this;
var inode__8946 = this;
var idx__8947 = ((hash >>> shift) & 0x01f);
var node__8948 = (this__8945.arr[idx__8947]);
if(!((node__8948 == null)))
{return node__8948.inode_find((shift + 5),hash,key,not_found);
} else
{return not_found;
}
});
cljs.core.ArrayNode.prototype.inode_without = (function (shift,hash,key){
var this__8949 = this;
var inode__8950 = this;
var idx__8951 = ((hash >>> shift) & 0x01f);
var node__8952 = (this__8949.arr[idx__8951]);
if(!((node__8952 == null)))
{var n__8953 = node__8952.inode_without((shift + 5),hash,key);
if((n__8953 === node__8952))
{return inode__8950;
} else
{if((n__8953 == null))
{if((this__8949.cnt <= 8))
{return cljs.core.pack_array_node.call(null,inode__8950,null,idx__8951);
} else
{return (new cljs.core.ArrayNode(null,(this__8949.cnt - 1),cljs.core.clone_and_set.call(null,this__8949.arr,idx__8951,n__8953)));
}
} else
{if("\uFDD0'else")
{return (new cljs.core.ArrayNode(null,this__8949.cnt,cljs.core.clone_and_set.call(null,this__8949.arr,idx__8951,n__8953)));
} else
{return null;
}
}
}
} else
{return inode__8950;
}
});
cljs.core.ArrayNode.prototype.inode_assoc = (function (shift,hash,key,val,added_leaf_QMARK_){
var this__8954 = this;
var inode__8955 = this;
var idx__8956 = ((hash >>> shift) & 0x01f);
var node__8957 = (this__8954.arr[idx__8956]);
if((node__8957 == null))
{return (new cljs.core.ArrayNode(null,(this__8954.cnt + 1),cljs.core.clone_and_set.call(null,this__8954.arr,idx__8956,cljs.core.BitmapIndexedNode.EMPTY.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_))));
} else
{var n__8958 = node__8957.inode_assoc((shift + 5),hash,key,val,added_leaf_QMARK_);
if((n__8958 === node__8957))
{return inode__8955;
} else
{return (new cljs.core.ArrayNode(null,this__8954.cnt,cljs.core.clone_and_set.call(null,this__8954.arr,idx__8956,n__8958)));
}
}
});
cljs.core.ArrayNode.prototype.inode_lookup = (function (shift,hash,key,not_found){
var this__8959 = this;
var inode__8960 = this;
var idx__8961 = ((hash >>> shift) & 0x01f);
var node__8962 = (this__8959.arr[idx__8961]);
if(!((node__8962 == null)))
{return node__8962.inode_lookup((shift + 5),hash,key,not_found);
} else
{return not_found;
}
});
cljs.core.ArrayNode;
cljs.core.hash_collision_node_find_index = (function hash_collision_node_find_index(arr,cnt,key){
var lim__8967 = (2 * cnt);
var i__8968 = 0;
while(true){
if((i__8968 < lim__8967))
{if(cljs.core.key_test.call(null,key,(arr[i__8968])))
{return i__8968;
} else
{{
var G__8969 = (i__8968 + 2);
i__8968 = G__8969;
continue;
}
}
} else
{return -1;
}
break;
}
});

goog.provide('cljs.core.HashCollisionNode');

/**
* @constructor
*/
cljs.core.HashCollisionNode = (function (edit,collision_hash,cnt,arr){
this.edit = edit;
this.collision_hash = collision_hash;
this.cnt = cnt;
this.arr = arr;
})
cljs.core.HashCollisionNode.cljs$lang$type = true;
cljs.core.HashCollisionNode.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/HashCollisionNode");
});
cljs.core.HashCollisionNode.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/HashCollisionNode");
});
cljs.core.HashCollisionNode.prototype.inode_assoc_BANG_ = (function (edit,shift,hash,key,val,added_leaf_QMARK_){
var this__8970 = this;
var inode__8971 = this;
if((hash === this__8970.collision_hash))
{var idx__8972 = cljs.core.hash_collision_node_find_index.call(null,this__8970.arr,this__8970.cnt,key);
if((idx__8972 === -1))
{if((this__8970.arr.length > (2 * this__8970.cnt)))
{var editable__8973 = cljs.core.edit_and_set.call(null,inode__8971,edit,(2 * this__8970.cnt),key,((2 * this__8970.cnt) + 1),val);
added_leaf_QMARK_.val = true;
editable__8973.cnt = (editable__8973.cnt + 1);
return editable__8973;
} else
{var len__8974 = this__8970.arr.length;
var new_arr__8975 = cljs.core.make_array.call(null,(len__8974 + 2));
cljs.core.array_copy.call(null,this__8970.arr,0,new_arr__8975,0,len__8974);
(new_arr__8975[len__8974] = key);
(new_arr__8975[(len__8974 + 1)] = val);
added_leaf_QMARK_.val = true;
return inode__8971.ensure_editable_array(edit,(this__8970.cnt + 1),new_arr__8975);
}
} else
{if(((this__8970.arr[(idx__8972 + 1)]) === val))
{return inode__8971;
} else
{return cljs.core.edit_and_set.call(null,inode__8971,edit,(idx__8972 + 1),val);
}
}
} else
{return (new cljs.core.BitmapIndexedNode(edit,(1 << ((this__8970.collision_hash >>> shift) & 0x01f)),[null,inode__8971,null,null])).inode_assoc_BANG_(edit,shift,hash,key,val,added_leaf_QMARK_);
}
});
cljs.core.HashCollisionNode.prototype.inode_seq = (function (){
var this__8976 = this;
var inode__8977 = this;
return cljs.core.create_inode_seq.call(null,this__8976.arr);
});
cljs.core.HashCollisionNode.prototype.inode_without_BANG_ = (function (edit,shift,hash,key,removed_leaf_QMARK_){
var this__8978 = this;
var inode__8979 = this;
var idx__8980 = cljs.core.hash_collision_node_find_index.call(null,this__8978.arr,this__8978.cnt,key);
if((idx__8980 === -1))
{return inode__8979;
} else
{(removed_leaf_QMARK_[0] = true);
if((this__8978.cnt === 1))
{return null;
} else
{var editable__8981 = inode__8979.ensure_editable(edit);
var earr__8982 = editable__8981.arr;
(earr__8982[idx__8980] = (earr__8982[((2 * this__8978.cnt) - 2)]));
(earr__8982[(idx__8980 + 1)] = (earr__8982[((2 * this__8978.cnt) - 1)]));
(earr__8982[((2 * this__8978.cnt) - 1)] = null);
(earr__8982[((2 * this__8978.cnt) - 2)] = null);
editable__8981.cnt = (editable__8981.cnt - 1);
return editable__8981;
}
}
});
cljs.core.HashCollisionNode.prototype.ensure_editable = (function (e){
var this__8983 = this;
var inode__8984 = this;
if((e === this__8983.edit))
{return inode__8984;
} else
{var new_arr__8985 = cljs.core.make_array.call(null,(2 * (this__8983.cnt + 1)));
cljs.core.array_copy.call(null,this__8983.arr,0,new_arr__8985,0,(2 * this__8983.cnt));
return (new cljs.core.HashCollisionNode(e,this__8983.collision_hash,this__8983.cnt,new_arr__8985));
}
});
cljs.core.HashCollisionNode.prototype.kv_reduce = (function (f,init){
var this__8986 = this;
var inode__8987 = this;
return cljs.core.inode_kv_reduce.call(null,this__8986.arr,f,init);
});
cljs.core.HashCollisionNode.prototype.inode_find = (function (shift,hash,key,not_found){
var this__8988 = this;
var inode__8989 = this;
var idx__8990 = cljs.core.hash_collision_node_find_index.call(null,this__8988.arr,this__8988.cnt,key);
if((idx__8990 < 0))
{return not_found;
} else
{if(cljs.core.key_test.call(null,key,(this__8988.arr[idx__8990])))
{return cljs.core.PersistentVector.fromArray([(this__8988.arr[idx__8990]),(this__8988.arr[(idx__8990 + 1)])], true);
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
});
cljs.core.HashCollisionNode.prototype.inode_without = (function (shift,hash,key){
var this__8991 = this;
var inode__8992 = this;
var idx__8993 = cljs.core.hash_collision_node_find_index.call(null,this__8991.arr,this__8991.cnt,key);
if((idx__8993 === -1))
{return inode__8992;
} else
{if((this__8991.cnt === 1))
{return null;
} else
{if("\uFDD0'else")
{return (new cljs.core.HashCollisionNode(null,this__8991.collision_hash,(this__8991.cnt - 1),cljs.core.remove_pair.call(null,this__8991.arr,cljs.core.quot.call(null,idx__8993,2))));
} else
{return null;
}
}
}
});
cljs.core.HashCollisionNode.prototype.inode_assoc = (function (shift,hash,key,val,added_leaf_QMARK_){
var this__8994 = this;
var inode__8995 = this;
if((hash === this__8994.collision_hash))
{var idx__8996 = cljs.core.hash_collision_node_find_index.call(null,this__8994.arr,this__8994.cnt,key);
if((idx__8996 === -1))
{var len__8997 = this__8994.arr.length;
var new_arr__8998 = cljs.core.make_array.call(null,(len__8997 + 2));
cljs.core.array_copy.call(null,this__8994.arr,0,new_arr__8998,0,len__8997);
(new_arr__8998[len__8997] = key);
(new_arr__8998[(len__8997 + 1)] = val);
added_leaf_QMARK_.val = true;
return (new cljs.core.HashCollisionNode(null,this__8994.collision_hash,(this__8994.cnt + 1),new_arr__8998));
} else
{if(cljs.core._EQ_.call(null,(this__8994.arr[idx__8996]),val))
{return inode__8995;
} else
{return (new cljs.core.HashCollisionNode(null,this__8994.collision_hash,this__8994.cnt,cljs.core.clone_and_set.call(null,this__8994.arr,(idx__8996 + 1),val)));
}
}
} else
{return (new cljs.core.BitmapIndexedNode(null,(1 << ((this__8994.collision_hash >>> shift) & 0x01f)),[null,inode__8995])).inode_assoc(shift,hash,key,val,added_leaf_QMARK_);
}
});
cljs.core.HashCollisionNode.prototype.inode_lookup = (function (shift,hash,key,not_found){
var this__8999 = this;
var inode__9000 = this;
var idx__9001 = cljs.core.hash_collision_node_find_index.call(null,this__8999.arr,this__8999.cnt,key);
if((idx__9001 < 0))
{return not_found;
} else
{if(cljs.core.key_test.call(null,key,(this__8999.arr[idx__9001])))
{return (this__8999.arr[(idx__9001 + 1)]);
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
});
cljs.core.HashCollisionNode.prototype.ensure_editable_array = (function (e,count,array){
var this__9002 = this;
var inode__9003 = this;
if((e === this__9002.edit))
{this__9002.arr = array;
this__9002.cnt = count;
return inode__9003;
} else
{return (new cljs.core.HashCollisionNode(this__9002.edit,this__9002.collision_hash,count,array));
}
});
cljs.core.HashCollisionNode;
cljs.core.create_node = (function() {
var create_node = null;
var create_node__6 = (function (shift,key1,val1,key2hash,key2,val2){
var key1hash__9008 = cljs.core.hash.call(null,key1);
if((key1hash__9008 === key2hash))
{return (new cljs.core.HashCollisionNode(null,key1hash__9008,2,[key1,val1,key2,val2]));
} else
{var added_leaf_QMARK___9009 = (new cljs.core.Box(false));
return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(shift,key1hash__9008,key1,val1,added_leaf_QMARK___9009).inode_assoc(shift,key2hash,key2,val2,added_leaf_QMARK___9009);
}
});
var create_node__7 = (function (edit,shift,key1,val1,key2hash,key2,val2){
var key1hash__9010 = cljs.core.hash.call(null,key1);
if((key1hash__9010 === key2hash))
{return (new cljs.core.HashCollisionNode(null,key1hash__9010,2,[key1,val1,key2,val2]));
} else
{var added_leaf_QMARK___9011 = (new cljs.core.Box(false));
return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(edit,shift,key1hash__9010,key1,val1,added_leaf_QMARK___9011).inode_assoc_BANG_(edit,shift,key2hash,key2,val2,added_leaf_QMARK___9011);
}
});
create_node = function(edit,shift,key1,val1,key2hash,key2,val2){
switch(arguments.length){
case 6:
return create_node__6.call(this,edit,shift,key1,val1,key2hash,key2);
case 7:
return create_node__7.call(this,edit,shift,key1,val1,key2hash,key2,val2);
}
throw('Invalid arity: ' + arguments.length);
};
create_node.cljs$lang$arity$6 = create_node__6;
create_node.cljs$lang$arity$7 = create_node__7;
return create_node;
})()
;

goog.provide('cljs.core.NodeSeq');

/**
* @constructor
*/
cljs.core.NodeSeq = (function (meta,nodes,i,s,__hash){
this.meta = meta;
this.nodes = nodes;
this.i = i;
this.s = s;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850572;
})
cljs.core.NodeSeq.cljs$lang$type = true;
cljs.core.NodeSeq.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/NodeSeq");
});
cljs.core.NodeSeq.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/NodeSeq");
});
cljs.core.NodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9012 = this;
var h__2266__auto____9013 = this__9012.__hash;
if(!((h__2266__auto____9013 == null)))
{return h__2266__auto____9013;
} else
{var h__2266__auto____9014 = cljs.core.hash_coll.call(null,coll);
this__9012.__hash = h__2266__auto____9014;
return h__2266__auto____9014;
}
});
cljs.core.NodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9015 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.NodeSeq.prototype.toString = (function (){
var this__9016 = this;
var this__9017 = this;
return cljs.core.pr_str.call(null,this__9017);
});
cljs.core.NodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__9018 = this;
return this$;
});
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__9019 = this;
if((this__9019.s == null))
{return cljs.core.PersistentVector.fromArray([(this__9019.nodes[this__9019.i]),(this__9019.nodes[(this__9019.i + 1)])], true);
} else
{return cljs.core.first.call(null,this__9019.s);
}
});
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__9020 = this;
if((this__9020.s == null))
{return cljs.core.create_inode_seq.call(null,this__9020.nodes,(this__9020.i + 2),null);
} else
{return cljs.core.create_inode_seq.call(null,this__9020.nodes,this__9020.i,cljs.core.next.call(null,this__9020.s));
}
});
cljs.core.NodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9021 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.NodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9022 = this;
return (new cljs.core.NodeSeq(meta,this__9022.nodes,this__9022.i,this__9022.s,this__9022.__hash));
});
cljs.core.NodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9023 = this;
return this__9023.meta;
});
cljs.core.NodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9024 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__9024.meta);
});
cljs.core.NodeSeq;
cljs.core.create_inode_seq = (function() {
var create_inode_seq = null;
var create_inode_seq__1 = (function (nodes){
return create_inode_seq.call(null,nodes,0,null);
});
var create_inode_seq__3 = (function (nodes,i,s){
if((s == null))
{var len__9031 = nodes.length;
var j__9032 = i;
while(true){
if((j__9032 < len__9031))
{if(!(((nodes[j__9032]) == null)))
{return (new cljs.core.NodeSeq(null,nodes,j__9032,null,null));
} else
{var temp__4090__auto____9033 = (nodes[(j__9032 + 1)]);
if(cljs.core.truth_(temp__4090__auto____9033))
{var node__9034 = temp__4090__auto____9033;
var temp__4090__auto____9035 = node__9034.inode_seq();
if(cljs.core.truth_(temp__4090__auto____9035))
{var node_seq__9036 = temp__4090__auto____9035;
return (new cljs.core.NodeSeq(null,nodes,(j__9032 + 2),node_seq__9036,null));
} else
{{
var G__9037 = (j__9032 + 2);
j__9032 = G__9037;
continue;
}
}
} else
{{
var G__9038 = (j__9032 + 2);
j__9032 = G__9038;
continue;
}
}
}
} else
{return null;
}
break;
}
} else
{return (new cljs.core.NodeSeq(null,nodes,i,s,null));
}
});
create_inode_seq = function(nodes,i,s){
switch(arguments.length){
case 1:
return create_inode_seq__1.call(this,nodes);
case 3:
return create_inode_seq__3.call(this,nodes,i,s);
}
throw('Invalid arity: ' + arguments.length);
};
create_inode_seq.cljs$lang$arity$1 = create_inode_seq__1;
create_inode_seq.cljs$lang$arity$3 = create_inode_seq__3;
return create_inode_seq;
})()
;

goog.provide('cljs.core.ArrayNodeSeq');

/**
* @constructor
*/
cljs.core.ArrayNodeSeq = (function (meta,nodes,i,s,__hash){
this.meta = meta;
this.nodes = nodes;
this.i = i;
this.s = s;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850572;
})
cljs.core.ArrayNodeSeq.cljs$lang$type = true;
cljs.core.ArrayNodeSeq.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/ArrayNodeSeq");
});
cljs.core.ArrayNodeSeq.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/ArrayNodeSeq");
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9039 = this;
var h__2266__auto____9040 = this__9039.__hash;
if(!((h__2266__auto____9040 == null)))
{return h__2266__auto____9040;
} else
{var h__2266__auto____9041 = cljs.core.hash_coll.call(null,coll);
this__9039.__hash = h__2266__auto____9041;
return h__2266__auto____9041;
}
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9042 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.ArrayNodeSeq.prototype.toString = (function (){
var this__9043 = this;
var this__9044 = this;
return cljs.core.pr_str.call(null,this__9044);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__9045 = this;
return this$;
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (coll){
var this__9046 = this;
return cljs.core.first.call(null,this__9046.s);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (coll){
var this__9047 = this;
return cljs.core.create_array_node_seq.call(null,null,this__9047.nodes,this__9047.i,cljs.core.next.call(null,this__9047.s));
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9048 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9049 = this;
return (new cljs.core.ArrayNodeSeq(meta,this__9049.nodes,this__9049.i,this__9049.s,this__9049.__hash));
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9050 = this;
return this__9050.meta;
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9051 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__9051.meta);
});
cljs.core.ArrayNodeSeq;
cljs.core.create_array_node_seq = (function() {
var create_array_node_seq = null;
var create_array_node_seq__1 = (function (nodes){
return create_array_node_seq.call(null,null,nodes,0,null);
});
var create_array_node_seq__4 = (function (meta,nodes,i,s){
if((s == null))
{var len__9058 = nodes.length;
var j__9059 = i;
while(true){
if((j__9059 < len__9058))
{var temp__4090__auto____9060 = (nodes[j__9059]);
if(cljs.core.truth_(temp__4090__auto____9060))
{var nj__9061 = temp__4090__auto____9060;
var temp__4090__auto____9062 = nj__9061.inode_seq();
if(cljs.core.truth_(temp__4090__auto____9062))
{var ns__9063 = temp__4090__auto____9062;
return (new cljs.core.ArrayNodeSeq(meta,nodes,(j__9059 + 1),ns__9063,null));
} else
{{
var G__9064 = (j__9059 + 1);
j__9059 = G__9064;
continue;
}
}
} else
{{
var G__9065 = (j__9059 + 1);
j__9059 = G__9065;
continue;
}
}
} else
{return null;
}
break;
}
} else
{return (new cljs.core.ArrayNodeSeq(meta,nodes,i,s,null));
}
});
create_array_node_seq = function(meta,nodes,i,s){
switch(arguments.length){
case 1:
return create_array_node_seq__1.call(this,meta);
case 4:
return create_array_node_seq__4.call(this,meta,nodes,i,s);
}
throw('Invalid arity: ' + arguments.length);
};
create_array_node_seq.cljs$lang$arity$1 = create_array_node_seq__1;
create_array_node_seq.cljs$lang$arity$4 = create_array_node_seq__4;
return create_array_node_seq;
})()
;

goog.provide('cljs.core.PersistentHashMap');

/**
* @constructor
*/
cljs.core.PersistentHashMap = (function (meta,cnt,root,has_nil_QMARK_,nil_val,__hash){
this.meta = meta;
this.cnt = cnt;
this.root = root;
this.has_nil_QMARK_ = has_nil_QMARK_;
this.nil_val = nil_val;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 4;
this.cljs$lang$protocol_mask$partition0$ = 16123663;
})
cljs.core.PersistentHashMap.cljs$lang$type = true;
cljs.core.PersistentHashMap.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentHashMap");
});
cljs.core.PersistentHashMap.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/PersistentHashMap");
});
cljs.core.PersistentHashMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__9068 = this;
return (new cljs.core.TransientHashMap({},this__9068.root,this__9068.cnt,this__9068.has_nil_QMARK_,this__9068.nil_val));
});
cljs.core.PersistentHashMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9069 = this;
var h__2266__auto____9070 = this__9069.__hash;
if(!((h__2266__auto____9070 == null)))
{return h__2266__auto____9070;
} else
{var h__2266__auto____9071 = cljs.core.hash_imap.call(null,coll);
this__9069.__hash = h__2266__auto____9071;
return h__2266__auto____9071;
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9072 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9073 = this;
if((k == null))
{if(this__9073.has_nil_QMARK_)
{return this__9073.nil_val;
} else
{return not_found;
}
} else
{if((this__9073.root == null))
{return not_found;
} else
{if("\uFDD0'else")
{return this__9073.root.inode_lookup(0,cljs.core.hash.call(null,k),k,not_found);
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9074 = this;
if((k == null))
{if((function (){var and__3941__auto____9075 = this__9074.has_nil_QMARK_;
if(and__3941__auto____9075)
{return (v === this__9074.nil_val);
} else
{return and__3941__auto____9075;
}
})())
{return coll;
} else
{return (new cljs.core.PersistentHashMap(this__9074.meta,((this__9074.has_nil_QMARK_)?this__9074.cnt:(this__9074.cnt + 1)),this__9074.root,true,v,null));
}
} else
{var added_leaf_QMARK___9076 = (new cljs.core.Box(false));
var new_root__9077 = (((this__9074.root == null))?cljs.core.BitmapIndexedNode.EMPTY:this__9074.root).inode_assoc(0,cljs.core.hash.call(null,k),k,v,added_leaf_QMARK___9076);
if((new_root__9077 === this__9074.root))
{return coll;
} else
{return (new cljs.core.PersistentHashMap(this__9074.meta,((added_leaf_QMARK___9076.val)?(this__9074.cnt + 1):this__9074.cnt),new_root__9077,this__9074.has_nil_QMARK_,this__9074.nil_val,null));
}
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__9078 = this;
if((k == null))
{return this__9078.has_nil_QMARK_;
} else
{if((this__9078.root == null))
{return false;
} else
{if("\uFDD0'else")
{return !((this__9078.root.inode_lookup(0,cljs.core.hash.call(null,k),k,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel));
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap.prototype.call = (function() {
var G__9101 = null;
var G__9101__2 = (function (this_sym9079,k){
var this__9081 = this;
var this_sym9079__9082 = this;
var coll__9083 = this_sym9079__9082;
return coll__9083.cljs$core$ILookup$_lookup$arity$2(coll__9083,k);
});
var G__9101__3 = (function (this_sym9080,k,not_found){
var this__9081 = this;
var this_sym9080__9084 = this;
var coll__9085 = this_sym9080__9084;
return coll__9085.cljs$core$ILookup$_lookup$arity$3(coll__9085,k,not_found);
});
G__9101 = function(this_sym9080,k,not_found){
switch(arguments.length){
case 2:
return G__9101__2.call(this,this_sym9080,k);
case 3:
return G__9101__3.call(this,this_sym9080,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9101;
})()
;
cljs.core.PersistentHashMap.prototype.apply = (function (this_sym9066,args9067){
var this__9086 = this;
return this_sym9066.call.apply(this_sym9066,[this_sym9066].concat(args9067.slice()));
});
cljs.core.PersistentHashMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (coll,f,init){
var this__9087 = this;
var init__9088 = ((this__9087.has_nil_QMARK_)?f.call(null,init,null,this__9087.nil_val):init);
if(cljs.core.reduced_QMARK_.call(null,init__9088))
{return cljs.core.deref.call(null,init__9088);
} else
{if(!((this__9087.root == null)))
{return this__9087.root.kv_reduce(f,init__9088);
} else
{if("\uFDD0'else")
{return init__9088;
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__9089 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.PersistentHashMap.prototype.toString = (function (){
var this__9090 = this;
var this__9091 = this;
return cljs.core.pr_str.call(null,this__9091);
});
cljs.core.PersistentHashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9092 = this;
if((this__9092.cnt > 0))
{var s__9093 = ((!((this__9092.root == null)))?this__9092.root.inode_seq():null);
if(this__9092.has_nil_QMARK_)
{return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([null,this__9092.nil_val], true),s__9093);
} else
{return s__9093;
}
} else
{return null;
}
});
cljs.core.PersistentHashMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9094 = this;
return this__9094.cnt;
});
cljs.core.PersistentHashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9095 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.PersistentHashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9096 = this;
return (new cljs.core.PersistentHashMap(meta,this__9096.cnt,this__9096.root,this__9096.has_nil_QMARK_,this__9096.nil_val,this__9096.__hash));
});
cljs.core.PersistentHashMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9097 = this;
return this__9097.meta;
});
cljs.core.PersistentHashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9098 = this;
return cljs.core._with_meta.call(null,cljs.core.PersistentHashMap.EMPTY,this__9098.meta);
});
cljs.core.PersistentHashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__9099 = this;
if((k == null))
{if(this__9099.has_nil_QMARK_)
{return (new cljs.core.PersistentHashMap(this__9099.meta,(this__9099.cnt - 1),this__9099.root,false,null,null));
} else
{return coll;
}
} else
{if((this__9099.root == null))
{return coll;
} else
{if("\uFDD0'else")
{var new_root__9100 = this__9099.root.inode_without(0,cljs.core.hash.call(null,k),k);
if((new_root__9100 === this__9099.root))
{return coll;
} else
{return (new cljs.core.PersistentHashMap(this__9099.meta,(this__9099.cnt - 1),new_root__9100,this__9099.has_nil_QMARK_,this__9099.nil_val,null));
}
} else
{return null;
}
}
}
});
cljs.core.PersistentHashMap;
cljs.core.PersistentHashMap.EMPTY = (new cljs.core.PersistentHashMap(null,0,null,false,null,0));
cljs.core.PersistentHashMap.fromArrays = (function (ks,vs){
var len__9102 = ks.length;
var i__9103 = 0;
var out__9104 = cljs.core.transient$.call(null,cljs.core.PersistentHashMap.EMPTY);
while(true){
if((i__9103 < len__9102))
{{
var G__9105 = (i__9103 + 1);
var G__9106 = cljs.core.assoc_BANG_.call(null,out__9104,(ks[i__9103]),(vs[i__9103]));
i__9103 = G__9105;
out__9104 = G__9106;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__9104);
}
break;
}
});

goog.provide('cljs.core.TransientHashMap');

/**
* @constructor
*/
cljs.core.TransientHashMap = (function (edit,root,count,has_nil_QMARK_,nil_val){
this.edit = edit;
this.root = root;
this.count = count;
this.has_nil_QMARK_ = has_nil_QMARK_;
this.nil_val = nil_val;
this.cljs$lang$protocol_mask$partition1$ = 56;
this.cljs$lang$protocol_mask$partition0$ = 258;
})
cljs.core.TransientHashMap.cljs$lang$type = true;
cljs.core.TransientHashMap.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/TransientHashMap");
});
cljs.core.TransientHashMap.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/TransientHashMap");
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = (function (tcoll,key){
var this__9107 = this;
return tcoll.without_BANG_(key);
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = (function (tcoll,key,val){
var this__9108 = this;
return tcoll.assoc_BANG_(key,val);
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,val){
var this__9109 = this;
return tcoll.conj_BANG_(val);
});
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__9110 = this;
return tcoll.persistent_BANG_();
});
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (tcoll,k){
var this__9111 = this;
if((k == null))
{if(this__9111.has_nil_QMARK_)
{return this__9111.nil_val;
} else
{return null;
}
} else
{if((this__9111.root == null))
{return null;
} else
{return this__9111.root.inode_lookup(0,cljs.core.hash.call(null,k),k);
}
}
});
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (tcoll,k,not_found){
var this__9112 = this;
if((k == null))
{if(this__9112.has_nil_QMARK_)
{return this__9112.nil_val;
} else
{return not_found;
}
} else
{if((this__9112.root == null))
{return not_found;
} else
{return this__9112.root.inode_lookup(0,cljs.core.hash.call(null,k),k,not_found);
}
}
});
cljs.core.TransientHashMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9113 = this;
if(this__9113.edit)
{return this__9113.count;
} else
{throw (new Error("count after persistent!"));
}
});
cljs.core.TransientHashMap.prototype.conj_BANG_ = (function (o){
var this__9114 = this;
var tcoll__9115 = this;
if(this__9114.edit)
{if((function (){var G__9116__9117 = o;
if(G__9116__9117)
{if((function (){var or__3943__auto____9118 = (G__9116__9117.cljs$lang$protocol_mask$partition0$ & 2048);
if(or__3943__auto____9118)
{return or__3943__auto____9118;
} else
{return G__9116__9117.cljs$core$IMapEntry$;
}
})())
{return true;
} else
{if((!G__9116__9117.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__9116__9117);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMapEntry,G__9116__9117);
}
})())
{return tcoll__9115.assoc_BANG_(cljs.core.key.call(null,o),cljs.core.val.call(null,o));
} else
{var es__9119 = cljs.core.seq.call(null,o);
var tcoll__9120 = tcoll__9115;
while(true){
var temp__4090__auto____9121 = cljs.core.first.call(null,es__9119);
if(cljs.core.truth_(temp__4090__auto____9121))
{var e__9122 = temp__4090__auto____9121;
{
var G__9133 = cljs.core.next.call(null,es__9119);
var G__9134 = tcoll__9120.assoc_BANG_(cljs.core.key.call(null,e__9122),cljs.core.val.call(null,e__9122));
es__9119 = G__9133;
tcoll__9120 = G__9134;
continue;
}
} else
{return tcoll__9120;
}
break;
}
}
} else
{throw (new Error("conj! after persistent"));
}
});
cljs.core.TransientHashMap.prototype.assoc_BANG_ = (function (k,v){
var this__9123 = this;
var tcoll__9124 = this;
if(this__9123.edit)
{if((k == null))
{if((this__9123.nil_val === v))
{} else
{this__9123.nil_val = v;
}
if(this__9123.has_nil_QMARK_)
{} else
{this__9123.count = (this__9123.count + 1);
this__9123.has_nil_QMARK_ = true;
}
return tcoll__9124;
} else
{var added_leaf_QMARK___9125 = (new cljs.core.Box(false));
var node__9126 = (((this__9123.root == null))?cljs.core.BitmapIndexedNode.EMPTY:this__9123.root).inode_assoc_BANG_(this__9123.edit,0,cljs.core.hash.call(null,k),k,v,added_leaf_QMARK___9125);
if((node__9126 === this__9123.root))
{} else
{this__9123.root = node__9126;
}
if(added_leaf_QMARK___9125.val)
{this__9123.count = (this__9123.count + 1);
} else
{}
return tcoll__9124;
}
} else
{throw (new Error("assoc! after persistent!"));
}
});
cljs.core.TransientHashMap.prototype.without_BANG_ = (function (k){
var this__9127 = this;
var tcoll__9128 = this;
if(this__9127.edit)
{if((k == null))
{if(this__9127.has_nil_QMARK_)
{this__9127.has_nil_QMARK_ = false;
this__9127.nil_val = null;
this__9127.count = (this__9127.count - 1);
return tcoll__9128;
} else
{return tcoll__9128;
}
} else
{if((this__9127.root == null))
{return tcoll__9128;
} else
{var removed_leaf_QMARK___9129 = (new cljs.core.Box(false));
var node__9130 = this__9127.root.inode_without_BANG_(this__9127.edit,0,cljs.core.hash.call(null,k),k,removed_leaf_QMARK___9129);
if((node__9130 === this__9127.root))
{} else
{this__9127.root = node__9130;
}
if(cljs.core.truth_((removed_leaf_QMARK___9129[0])))
{this__9127.count = (this__9127.count - 1);
} else
{}
return tcoll__9128;
}
}
} else
{throw (new Error("dissoc! after persistent!"));
}
});
cljs.core.TransientHashMap.prototype.persistent_BANG_ = (function (){
var this__9131 = this;
var tcoll__9132 = this;
if(this__9131.edit)
{this__9131.edit = null;
return (new cljs.core.PersistentHashMap(null,this__9131.count,this__9131.root,this__9131.has_nil_QMARK_,this__9131.nil_val,null));
} else
{throw (new Error("persistent! called twice"));
}
});
cljs.core.TransientHashMap;
cljs.core.tree_map_seq_push = (function tree_map_seq_push(node,stack,ascending_QMARK_){
var t__9137 = node;
var stack__9138 = stack;
while(true){
if(!((t__9137 == null)))
{{
var G__9139 = ((ascending_QMARK_)?t__9137.left:t__9137.right);
var G__9140 = cljs.core.conj.call(null,stack__9138,t__9137);
t__9137 = G__9139;
stack__9138 = G__9140;
continue;
}
} else
{return stack__9138;
}
break;
}
});

goog.provide('cljs.core.PersistentTreeMapSeq');

/**
* @constructor
*/
cljs.core.PersistentTreeMapSeq = (function (meta,stack,ascending_QMARK_,cnt,__hash){
this.meta = meta;
this.stack = stack;
this.ascending_QMARK_ = ascending_QMARK_;
this.cnt = cnt;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 31850574;
})
cljs.core.PersistentTreeMapSeq.cljs$lang$type = true;
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentTreeMapSeq");
});
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/PersistentTreeMapSeq");
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9141 = this;
var h__2266__auto____9142 = this__9141.__hash;
if(!((h__2266__auto____9142 == null)))
{return h__2266__auto____9142;
} else
{var h__2266__auto____9143 = cljs.core.hash_coll.call(null,coll);
this__9141.__hash = h__2266__auto____9143;
return h__2266__auto____9143;
}
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9144 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.PersistentTreeMapSeq.prototype.toString = (function (){
var this__9145 = this;
var this__9146 = this;
return cljs.core.pr_str.call(null,this__9146);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this__9147 = this;
return this$;
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9148 = this;
if((this__9148.cnt < 0))
{return (cljs.core.count.call(null,cljs.core.next.call(null,coll)) + 1);
} else
{return this__9148.cnt;
}
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_first$arity$1 = (function (this$){
var this__9149 = this;
return cljs.core.peek.call(null,this__9149.stack);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_rest$arity$1 = (function (this$){
var this__9150 = this;
var t__9151 = cljs.core.first.call(null,this__9150.stack);
var next_stack__9152 = cljs.core.tree_map_seq_push.call(null,((this__9150.ascending_QMARK_)?t__9151.right:t__9151.left),cljs.core.next.call(null,this__9150.stack),this__9150.ascending_QMARK_);
if(!((next_stack__9152 == null)))
{return (new cljs.core.PersistentTreeMapSeq(null,next_stack__9152,this__9150.ascending_QMARK_,(this__9150.cnt - 1),null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9153 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9154 = this;
return (new cljs.core.PersistentTreeMapSeq(meta,this__9154.stack,this__9154.ascending_QMARK_,this__9154.cnt,this__9154.__hash));
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9155 = this;
return this__9155.meta;
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9156 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__9156.meta);
});
cljs.core.PersistentTreeMapSeq;
cljs.core.create_tree_map_seq = (function create_tree_map_seq(tree,ascending_QMARK_,cnt){
return (new cljs.core.PersistentTreeMapSeq(null,cljs.core.tree_map_seq_push.call(null,tree,null,ascending_QMARK_),ascending_QMARK_,cnt,null));
});
cljs.core.balance_left = (function balance_left(key,val,ins,right){
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins))
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins.left))
{return (new cljs.core.RedNode(ins.key,ins.val,ins.left.blacken(),(new cljs.core.BlackNode(key,val,ins.right,right,null)),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins.right))
{return (new cljs.core.RedNode(ins.right.key,ins.right.val,(new cljs.core.BlackNode(ins.key,ins.val,ins.left,ins.right.left,null)),(new cljs.core.BlackNode(key,val,ins.right.right,right,null)),null));
} else
{if("\uFDD0'else")
{return (new cljs.core.BlackNode(key,val,ins,right,null));
} else
{return null;
}
}
}
} else
{return (new cljs.core.BlackNode(key,val,ins,right,null));
}
});
cljs.core.balance_right = (function balance_right(key,val,left,ins){
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins))
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins.right))
{return (new cljs.core.RedNode(ins.key,ins.val,(new cljs.core.BlackNode(key,val,left,ins.left,null)),ins.right.blacken(),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,ins.left))
{return (new cljs.core.RedNode(ins.left.key,ins.left.val,(new cljs.core.BlackNode(key,val,left,ins.left.left,null)),(new cljs.core.BlackNode(ins.key,ins.val,ins.left.right,ins.right,null)),null));
} else
{if("\uFDD0'else")
{return (new cljs.core.BlackNode(key,val,left,ins,null));
} else
{return null;
}
}
}
} else
{return (new cljs.core.BlackNode(key,val,left,ins,null));
}
});
cljs.core.balance_left_del = (function balance_left_del(key,val,del,right){
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,del))
{return (new cljs.core.RedNode(key,val,del.blacken(),right,null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,right))
{return cljs.core.balance_right.call(null,key,val,del,right.redden());
} else
{if((function (){var and__3941__auto____9158 = cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,right);
if(and__3941__auto____9158)
{return cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,right.left);
} else
{return and__3941__auto____9158;
}
})())
{return (new cljs.core.RedNode(right.left.key,right.left.val,(new cljs.core.BlackNode(key,val,del,right.left.left,null)),cljs.core.balance_right.call(null,right.key,right.val,right.left.right,right.right.redden()),null));
} else
{if("\uFDD0'else")
{throw (new Error("red-black tree invariant violation"));
} else
{return null;
}
}
}
}
});
cljs.core.balance_right_del = (function balance_right_del(key,val,left,del){
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,del))
{return (new cljs.core.RedNode(key,val,left,del.blacken(),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,left))
{return cljs.core.balance_left.call(null,key,val,left.redden(),del);
} else
{if((function (){var and__3941__auto____9160 = cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,left);
if(and__3941__auto____9160)
{return cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,left.right);
} else
{return and__3941__auto____9160;
}
})())
{return (new cljs.core.RedNode(left.right.key,left.right.val,cljs.core.balance_left.call(null,left.key,left.val,left.left.redden(),left.right.left),(new cljs.core.BlackNode(key,val,left.right.right,del,null)),null));
} else
{if("\uFDD0'else")
{throw (new Error("red-black tree invariant violation"));
} else
{return null;
}
}
}
}
});
cljs.core.tree_map_kv_reduce = (function tree_map_kv_reduce(node,f,init){
var init__9164 = f.call(null,init,node.key,node.val);
if(cljs.core.reduced_QMARK_.call(null,init__9164))
{return cljs.core.deref.call(null,init__9164);
} else
{var init__9165 = ((!((node.left == null)))?tree_map_kv_reduce.call(null,node.left,f,init__9164):init__9164);
if(cljs.core.reduced_QMARK_.call(null,init__9165))
{return cljs.core.deref.call(null,init__9165);
} else
{var init__9166 = ((!((node.right == null)))?tree_map_kv_reduce.call(null,node.right,f,init__9165):init__9165);
if(cljs.core.reduced_QMARK_.call(null,init__9166))
{return cljs.core.deref.call(null,init__9166);
} else
{return init__9166;
}
}
}
});

goog.provide('cljs.core.BlackNode');

/**
* @constructor
*/
cljs.core.BlackNode = (function (key,val,left,right,__hash){
this.key = key;
this.val = val;
this.left = left;
this.right = right;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32402207;
})
cljs.core.BlackNode.cljs$lang$type = true;
cljs.core.BlackNode.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/BlackNode");
});
cljs.core.BlackNode.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/BlackNode");
});
cljs.core.BlackNode.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9169 = this;
var h__2266__auto____9170 = this__9169.__hash;
if(!((h__2266__auto____9170 == null)))
{return h__2266__auto____9170;
} else
{var h__2266__auto____9171 = cljs.core.hash_coll.call(null,coll);
this__9169.__hash = h__2266__auto____9171;
return h__2266__auto____9171;
}
});
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (node,k){
var this__9172 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,null);
});
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (node,k,not_found){
var this__9173 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,not_found);
});
cljs.core.BlackNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (node,k,v){
var this__9174 = this;
return cljs.core.assoc.call(null,cljs.core.PersistentVector.fromArray([this__9174.key,this__9174.val], true),k,v);
});
cljs.core.BlackNode.prototype.call = (function() {
var G__9222 = null;
var G__9222__2 = (function (this_sym9175,k){
var this__9177 = this;
var this_sym9175__9178 = this;
var node__9179 = this_sym9175__9178;
return node__9179.cljs$core$ILookup$_lookup$arity$2(node__9179,k);
});
var G__9222__3 = (function (this_sym9176,k,not_found){
var this__9177 = this;
var this_sym9176__9180 = this;
var node__9181 = this_sym9176__9180;
return node__9181.cljs$core$ILookup$_lookup$arity$3(node__9181,k,not_found);
});
G__9222 = function(this_sym9176,k,not_found){
switch(arguments.length){
case 2:
return G__9222__2.call(this,this_sym9176,k);
case 3:
return G__9222__3.call(this,this_sym9176,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9222;
})()
;
cljs.core.BlackNode.prototype.apply = (function (this_sym9167,args9168){
var this__9182 = this;
return this_sym9167.call.apply(this_sym9167,[this_sym9167].concat(args9168.slice()));
});
cljs.core.BlackNode.prototype.cljs$core$ICollection$_conj$arity$2 = (function (node,o){
var this__9183 = this;
return cljs.core.PersistentVector.fromArray([this__9183.key,this__9183.val,o], true);
});
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_key$arity$1 = (function (node){
var this__9184 = this;
return this__9184.key;
});
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_val$arity$1 = (function (node){
var this__9185 = this;
return this__9185.val;
});
cljs.core.BlackNode.prototype.add_right = (function (ins){
var this__9186 = this;
var node__9187 = this;
return ins.balance_right(node__9187);
});
cljs.core.BlackNode.prototype.redden = (function (){
var this__9188 = this;
var node__9189 = this;
return (new cljs.core.RedNode(this__9188.key,this__9188.val,this__9188.left,this__9188.right,null));
});
cljs.core.BlackNode.prototype.remove_right = (function (del){
var this__9190 = this;
var node__9191 = this;
return cljs.core.balance_right_del.call(null,this__9190.key,this__9190.val,this__9190.left,del);
});
cljs.core.BlackNode.prototype.replace = (function (key,val,left,right){
var this__9192 = this;
var node__9193 = this;
return (new cljs.core.BlackNode(key,val,left,right,null));
});
cljs.core.BlackNode.prototype.kv_reduce = (function (f,init){
var this__9194 = this;
var node__9195 = this;
return cljs.core.tree_map_kv_reduce.call(null,node__9195,f,init);
});
cljs.core.BlackNode.prototype.remove_left = (function (del){
var this__9196 = this;
var node__9197 = this;
return cljs.core.balance_left_del.call(null,this__9196.key,this__9196.val,del,this__9196.right);
});
cljs.core.BlackNode.prototype.add_left = (function (ins){
var this__9198 = this;
var node__9199 = this;
return ins.balance_left(node__9199);
});
cljs.core.BlackNode.prototype.balance_left = (function (parent){
var this__9200 = this;
var node__9201 = this;
return (new cljs.core.BlackNode(parent.key,parent.val,node__9201,parent.right,null));
});
cljs.core.BlackNode.prototype.toString = (function() {
var G__9223 = null;
var G__9223__0 = (function (){
var this__9202 = this;
var this__9204 = this;
return cljs.core.pr_str.call(null,this__9204);
});
G__9223 = function(){
switch(arguments.length){
case 0:
return G__9223__0.call(this);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9223;
})()
;
cljs.core.BlackNode.prototype.balance_right = (function (parent){
var this__9205 = this;
var node__9206 = this;
return (new cljs.core.BlackNode(parent.key,parent.val,parent.left,node__9206,null));
});
cljs.core.BlackNode.prototype.blacken = (function (){
var this__9207 = this;
var node__9208 = this;
return node__9208;
});
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (node,f){
var this__9209 = this;
return cljs.core.ci_reduce.call(null,node,f);
});
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (node,f,start){
var this__9210 = this;
return cljs.core.ci_reduce.call(null,node,f,start);
});
cljs.core.BlackNode.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (node){
var this__9211 = this;
return cljs.core.list.call(null,this__9211.key,this__9211.val);
});
cljs.core.BlackNode.prototype.cljs$core$ICounted$_count$arity$1 = (function (node){
var this__9212 = this;
return 2;
});
cljs.core.BlackNode.prototype.cljs$core$IStack$_peek$arity$1 = (function (node){
var this__9213 = this;
return this__9213.val;
});
cljs.core.BlackNode.prototype.cljs$core$IStack$_pop$arity$1 = (function (node){
var this__9214 = this;
return cljs.core.PersistentVector.fromArray([this__9214.key], true);
});
cljs.core.BlackNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (node,n,v){
var this__9215 = this;
return cljs.core._assoc_n.call(null,cljs.core.PersistentVector.fromArray([this__9215.key,this__9215.val], true),n,v);
});
cljs.core.BlackNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9216 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.BlackNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (node,meta){
var this__9217 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([this__9217.key,this__9217.val], true),meta);
});
cljs.core.BlackNode.prototype.cljs$core$IMeta$_meta$arity$1 = (function (node){
var this__9218 = this;
return null;
});
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (node,n){
var this__9219 = this;
if((n === 0))
{return this__9219.key;
} else
{if((n === 1))
{return this__9219.val;
} else
{if("\uFDD0'else")
{return null;
} else
{return null;
}
}
}
});
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (node,n,not_found){
var this__9220 = this;
if((n === 0))
{return this__9220.key;
} else
{if((n === 1))
{return this__9220.val;
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
});
cljs.core.BlackNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (node){
var this__9221 = this;
return cljs.core.PersistentVector.EMPTY;
});
cljs.core.BlackNode;

goog.provide('cljs.core.RedNode');

/**
* @constructor
*/
cljs.core.RedNode = (function (key,val,left,right,__hash){
this.key = key;
this.val = val;
this.left = left;
this.right = right;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32402207;
})
cljs.core.RedNode.cljs$lang$type = true;
cljs.core.RedNode.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/RedNode");
});
cljs.core.RedNode.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/RedNode");
});
cljs.core.RedNode.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9226 = this;
var h__2266__auto____9227 = this__9226.__hash;
if(!((h__2266__auto____9227 == null)))
{return h__2266__auto____9227;
} else
{var h__2266__auto____9228 = cljs.core.hash_coll.call(null,coll);
this__9226.__hash = h__2266__auto____9228;
return h__2266__auto____9228;
}
});
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (node,k){
var this__9229 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,null);
});
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (node,k,not_found){
var this__9230 = this;
return node.cljs$core$IIndexed$_nth$arity$3(node,k,not_found);
});
cljs.core.RedNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (node,k,v){
var this__9231 = this;
return cljs.core.assoc.call(null,cljs.core.PersistentVector.fromArray([this__9231.key,this__9231.val], true),k,v);
});
cljs.core.RedNode.prototype.call = (function() {
var G__9279 = null;
var G__9279__2 = (function (this_sym9232,k){
var this__9234 = this;
var this_sym9232__9235 = this;
var node__9236 = this_sym9232__9235;
return node__9236.cljs$core$ILookup$_lookup$arity$2(node__9236,k);
});
var G__9279__3 = (function (this_sym9233,k,not_found){
var this__9234 = this;
var this_sym9233__9237 = this;
var node__9238 = this_sym9233__9237;
return node__9238.cljs$core$ILookup$_lookup$arity$3(node__9238,k,not_found);
});
G__9279 = function(this_sym9233,k,not_found){
switch(arguments.length){
case 2:
return G__9279__2.call(this,this_sym9233,k);
case 3:
return G__9279__3.call(this,this_sym9233,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9279;
})()
;
cljs.core.RedNode.prototype.apply = (function (this_sym9224,args9225){
var this__9239 = this;
return this_sym9224.call.apply(this_sym9224,[this_sym9224].concat(args9225.slice()));
});
cljs.core.RedNode.prototype.cljs$core$ICollection$_conj$arity$2 = (function (node,o){
var this__9240 = this;
return cljs.core.PersistentVector.fromArray([this__9240.key,this__9240.val,o], true);
});
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_key$arity$1 = (function (node){
var this__9241 = this;
return this__9241.key;
});
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_val$arity$1 = (function (node){
var this__9242 = this;
return this__9242.val;
});
cljs.core.RedNode.prototype.add_right = (function (ins){
var this__9243 = this;
var node__9244 = this;
return (new cljs.core.RedNode(this__9243.key,this__9243.val,this__9243.left,ins,null));
});
cljs.core.RedNode.prototype.redden = (function (){
var this__9245 = this;
var node__9246 = this;
throw (new Error("red-black tree invariant violation"));
});
cljs.core.RedNode.prototype.remove_right = (function (del){
var this__9247 = this;
var node__9248 = this;
return (new cljs.core.RedNode(this__9247.key,this__9247.val,this__9247.left,del,null));
});
cljs.core.RedNode.prototype.replace = (function (key,val,left,right){
var this__9249 = this;
var node__9250 = this;
return (new cljs.core.RedNode(key,val,left,right,null));
});
cljs.core.RedNode.prototype.kv_reduce = (function (f,init){
var this__9251 = this;
var node__9252 = this;
return cljs.core.tree_map_kv_reduce.call(null,node__9252,f,init);
});
cljs.core.RedNode.prototype.remove_left = (function (del){
var this__9253 = this;
var node__9254 = this;
return (new cljs.core.RedNode(this__9253.key,this__9253.val,del,this__9253.right,null));
});
cljs.core.RedNode.prototype.add_left = (function (ins){
var this__9255 = this;
var node__9256 = this;
return (new cljs.core.RedNode(this__9255.key,this__9255.val,ins,this__9255.right,null));
});
cljs.core.RedNode.prototype.balance_left = (function (parent){
var this__9257 = this;
var node__9258 = this;
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__9257.left))
{return (new cljs.core.RedNode(this__9257.key,this__9257.val,this__9257.left.blacken(),(new cljs.core.BlackNode(parent.key,parent.val,this__9257.right,parent.right,null)),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__9257.right))
{return (new cljs.core.RedNode(this__9257.right.key,this__9257.right.val,(new cljs.core.BlackNode(this__9257.key,this__9257.val,this__9257.left,this__9257.right.left,null)),(new cljs.core.BlackNode(parent.key,parent.val,this__9257.right.right,parent.right,null)),null));
} else
{if("\uFDD0'else")
{return (new cljs.core.BlackNode(parent.key,parent.val,node__9258,parent.right,null));
} else
{return null;
}
}
}
});
cljs.core.RedNode.prototype.toString = (function() {
var G__9280 = null;
var G__9280__0 = (function (){
var this__9259 = this;
var this__9261 = this;
return cljs.core.pr_str.call(null,this__9261);
});
G__9280 = function(){
switch(arguments.length){
case 0:
return G__9280__0.call(this);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9280;
})()
;
cljs.core.RedNode.prototype.balance_right = (function (parent){
var this__9262 = this;
var node__9263 = this;
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__9262.right))
{return (new cljs.core.RedNode(this__9262.key,this__9262.val,(new cljs.core.BlackNode(parent.key,parent.val,parent.left,this__9262.left,null)),this__9262.right.blacken(),null));
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,this__9262.left))
{return (new cljs.core.RedNode(this__9262.left.key,this__9262.left.val,(new cljs.core.BlackNode(parent.key,parent.val,parent.left,this__9262.left.left,null)),(new cljs.core.BlackNode(this__9262.key,this__9262.val,this__9262.left.right,this__9262.right,null)),null));
} else
{if("\uFDD0'else")
{return (new cljs.core.BlackNode(parent.key,parent.val,parent.left,node__9263,null));
} else
{return null;
}
}
}
});
cljs.core.RedNode.prototype.blacken = (function (){
var this__9264 = this;
var node__9265 = this;
return (new cljs.core.BlackNode(this__9264.key,this__9264.val,this__9264.left,this__9264.right,null));
});
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (node,f){
var this__9266 = this;
return cljs.core.ci_reduce.call(null,node,f);
});
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (node,f,start){
var this__9267 = this;
return cljs.core.ci_reduce.call(null,node,f,start);
});
cljs.core.RedNode.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (node){
var this__9268 = this;
return cljs.core.list.call(null,this__9268.key,this__9268.val);
});
cljs.core.RedNode.prototype.cljs$core$ICounted$_count$arity$1 = (function (node){
var this__9269 = this;
return 2;
});
cljs.core.RedNode.prototype.cljs$core$IStack$_peek$arity$1 = (function (node){
var this__9270 = this;
return this__9270.val;
});
cljs.core.RedNode.prototype.cljs$core$IStack$_pop$arity$1 = (function (node){
var this__9271 = this;
return cljs.core.PersistentVector.fromArray([this__9271.key], true);
});
cljs.core.RedNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = (function (node,n,v){
var this__9272 = this;
return cljs.core._assoc_n.call(null,cljs.core.PersistentVector.fromArray([this__9272.key,this__9272.val], true),n,v);
});
cljs.core.RedNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9273 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.RedNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (node,meta){
var this__9274 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([this__9274.key,this__9274.val], true),meta);
});
cljs.core.RedNode.prototype.cljs$core$IMeta$_meta$arity$1 = (function (node){
var this__9275 = this;
return null;
});
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (node,n){
var this__9276 = this;
if((n === 0))
{return this__9276.key;
} else
{if((n === 1))
{return this__9276.val;
} else
{if("\uFDD0'else")
{return null;
} else
{return null;
}
}
}
});
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (node,n,not_found){
var this__9277 = this;
if((n === 0))
{return this__9277.key;
} else
{if((n === 1))
{return this__9277.val;
} else
{if("\uFDD0'else")
{return not_found;
} else
{return null;
}
}
}
});
cljs.core.RedNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (node){
var this__9278 = this;
return cljs.core.PersistentVector.EMPTY;
});
cljs.core.RedNode;
cljs.core.tree_map_add = (function tree_map_add(comp,tree,k,v,found){
if((tree == null))
{return (new cljs.core.RedNode(k,v,null,null,null));
} else
{var c__9284 = comp.call(null,k,tree.key);
if((c__9284 === 0))
{(found[0] = tree);
return null;
} else
{if((c__9284 < 0))
{var ins__9285 = tree_map_add.call(null,comp,tree.left,k,v,found);
if(!((ins__9285 == null)))
{return tree.add_left(ins__9285);
} else
{return null;
}
} else
{if("\uFDD0'else")
{var ins__9286 = tree_map_add.call(null,comp,tree.right,k,v,found);
if(!((ins__9286 == null)))
{return tree.add_right(ins__9286);
} else
{return null;
}
} else
{return null;
}
}
}
}
});
cljs.core.tree_map_append = (function tree_map_append(left,right){
if((left == null))
{return right;
} else
{if((right == null))
{return left;
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,left))
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,right))
{var app__9289 = tree_map_append.call(null,left.right,right.left);
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,app__9289))
{return (new cljs.core.RedNode(app__9289.key,app__9289.val,(new cljs.core.RedNode(left.key,left.val,left.left,app__9289.left,null)),(new cljs.core.RedNode(right.key,right.val,app__9289.right,right.right,null)),null));
} else
{return (new cljs.core.RedNode(left.key,left.val,left.left,(new cljs.core.RedNode(right.key,right.val,app__9289,right.right,null)),null));
}
} else
{return (new cljs.core.RedNode(left.key,left.val,left.left,tree_map_append.call(null,left.right,right),null));
}
} else
{if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,right))
{return (new cljs.core.RedNode(right.key,right.val,tree_map_append.call(null,left,right.left),right.right,null));
} else
{if("\uFDD0'else")
{var app__9290 = tree_map_append.call(null,left.right,right.left);
if(cljs.core.instance_QMARK_.call(null,cljs.core.RedNode,app__9290))
{return (new cljs.core.RedNode(app__9290.key,app__9290.val,(new cljs.core.BlackNode(left.key,left.val,left.left,app__9290.left,null)),(new cljs.core.BlackNode(right.key,right.val,app__9290.right,right.right,null)),null));
} else
{return cljs.core.balance_left_del.call(null,left.key,left.val,left.left,(new cljs.core.BlackNode(right.key,right.val,app__9290,right.right,null)));
}
} else
{return null;
}
}
}
}
}
});
cljs.core.tree_map_remove = (function tree_map_remove(comp,tree,k,found){
if(!((tree == null)))
{var c__9296 = comp.call(null,k,tree.key);
if((c__9296 === 0))
{(found[0] = tree);
return cljs.core.tree_map_append.call(null,tree.left,tree.right);
} else
{if((c__9296 < 0))
{var del__9297 = tree_map_remove.call(null,comp,tree.left,k,found);
if((function (){var or__3943__auto____9298 = !((del__9297 == null));
if(or__3943__auto____9298)
{return or__3943__auto____9298;
} else
{return !(((found[0]) == null));
}
})())
{if(cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,tree.left))
{return cljs.core.balance_left_del.call(null,tree.key,tree.val,del__9297,tree.right);
} else
{return (new cljs.core.RedNode(tree.key,tree.val,del__9297,tree.right,null));
}
} else
{return null;
}
} else
{if("\uFDD0'else")
{var del__9299 = tree_map_remove.call(null,comp,tree.right,k,found);
if((function (){var or__3943__auto____9300 = !((del__9299 == null));
if(or__3943__auto____9300)
{return or__3943__auto____9300;
} else
{return !(((found[0]) == null));
}
})())
{if(cljs.core.instance_QMARK_.call(null,cljs.core.BlackNode,tree.right))
{return cljs.core.balance_right_del.call(null,tree.key,tree.val,tree.left,del__9299);
} else
{return (new cljs.core.RedNode(tree.key,tree.val,tree.left,del__9299,null));
}
} else
{return null;
}
} else
{return null;
}
}
}
} else
{return null;
}
});
cljs.core.tree_map_replace = (function tree_map_replace(comp,tree,k,v){
var tk__9303 = tree.key;
var c__9304 = comp.call(null,k,tk__9303);
if((c__9304 === 0))
{return tree.replace(tk__9303,v,tree.left,tree.right);
} else
{if((c__9304 < 0))
{return tree.replace(tk__9303,tree.val,tree_map_replace.call(null,comp,tree.left,k,v),tree.right);
} else
{if("\uFDD0'else")
{return tree.replace(tk__9303,tree.val,tree.left,tree_map_replace.call(null,comp,tree.right,k,v));
} else
{return null;
}
}
}
});

goog.provide('cljs.core.PersistentTreeMap');

/**
* @constructor
*/
cljs.core.PersistentTreeMap = (function (comp,tree,cnt,meta,__hash){
this.comp = comp;
this.tree = tree;
this.cnt = cnt;
this.meta = meta;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 418776847;
})
cljs.core.PersistentTreeMap.cljs$lang$type = true;
cljs.core.PersistentTreeMap.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentTreeMap");
});
cljs.core.PersistentTreeMap.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/PersistentTreeMap");
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9307 = this;
var h__2266__auto____9308 = this__9307.__hash;
if(!((h__2266__auto____9308 == null)))
{return h__2266__auto____9308;
} else
{var h__2266__auto____9309 = cljs.core.hash_imap.call(null,coll);
this__9307.__hash = h__2266__auto____9309;
return h__2266__auto____9309;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,k){
var this__9310 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,k,null);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,k,not_found){
var this__9311 = this;
var n__9312 = coll.entry_at(k);
if(!((n__9312 == null)))
{return n__9312.val;
} else
{return not_found;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var this__9313 = this;
var found__9314 = [null];
var t__9315 = cljs.core.tree_map_add.call(null,this__9313.comp,this__9313.tree,k,v,found__9314);
if((t__9315 == null))
{var found_node__9316 = cljs.core.nth.call(null,found__9314,0);
if(cljs.core._EQ_.call(null,v,found_node__9316.val))
{return coll;
} else
{return (new cljs.core.PersistentTreeMap(this__9313.comp,cljs.core.tree_map_replace.call(null,this__9313.comp,this__9313.tree,k,v),this__9313.cnt,this__9313.meta,null));
}
} else
{return (new cljs.core.PersistentTreeMap(this__9313.comp,t__9315.blacken(),(this__9313.cnt + 1),this__9313.meta,null));
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var this__9317 = this;
return !((coll.entry_at(k) == null));
});
cljs.core.PersistentTreeMap.prototype.call = (function() {
var G__9351 = null;
var G__9351__2 = (function (this_sym9318,k){
var this__9320 = this;
var this_sym9318__9321 = this;
var coll__9322 = this_sym9318__9321;
return coll__9322.cljs$core$ILookup$_lookup$arity$2(coll__9322,k);
});
var G__9351__3 = (function (this_sym9319,k,not_found){
var this__9320 = this;
var this_sym9319__9323 = this;
var coll__9324 = this_sym9319__9323;
return coll__9324.cljs$core$ILookup$_lookup$arity$3(coll__9324,k,not_found);
});
G__9351 = function(this_sym9319,k,not_found){
switch(arguments.length){
case 2:
return G__9351__2.call(this,this_sym9319,k);
case 3:
return G__9351__3.call(this,this_sym9319,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9351;
})()
;
cljs.core.PersistentTreeMap.prototype.apply = (function (this_sym9305,args9306){
var this__9325 = this;
return this_sym9305.call.apply(this_sym9305,[this_sym9305].concat(args9306.slice()));
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (coll,f,init){
var this__9326 = this;
if(!((this__9326.tree == null)))
{return cljs.core.tree_map_kv_reduce.call(null,this__9326.tree,f,init);
} else
{return init;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var this__9327 = this;
if(cljs.core.vector_QMARK_.call(null,entry))
{return coll.cljs$core$IAssociative$_assoc$arity$3(coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__9328 = this;
if((this__9328.cnt > 0))
{return cljs.core.create_tree_map_seq.call(null,this__9328.tree,false,this__9328.cnt);
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.toString = (function (){
var this__9329 = this;
var this__9330 = this;
return cljs.core.pr_str.call(null,this__9330);
});
cljs.core.PersistentTreeMap.prototype.entry_at = (function (k){
var this__9331 = this;
var coll__9332 = this;
var t__9333 = this__9331.tree;
while(true){
if(!((t__9333 == null)))
{var c__9334 = this__9331.comp.call(null,k,t__9333.key);
if((c__9334 === 0))
{return t__9333;
} else
{if((c__9334 < 0))
{{
var G__9352 = t__9333.left;
t__9333 = G__9352;
continue;
}
} else
{if("\uFDD0'else")
{{
var G__9353 = t__9333.right;
t__9333 = G__9353;
continue;
}
} else
{return null;
}
}
}
} else
{return null;
}
break;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = (function (coll,ascending_QMARK_){
var this__9335 = this;
if((this__9335.cnt > 0))
{return cljs.core.create_tree_map_seq.call(null,this__9335.tree,ascending_QMARK_,this__9335.cnt);
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = (function (coll,k,ascending_QMARK_){
var this__9336 = this;
if((this__9336.cnt > 0))
{var stack__9337 = null;
var t__9338 = this__9336.tree;
while(true){
if(!((t__9338 == null)))
{var c__9339 = this__9336.comp.call(null,k,t__9338.key);
if((c__9339 === 0))
{return (new cljs.core.PersistentTreeMapSeq(null,cljs.core.conj.call(null,stack__9337,t__9338),ascending_QMARK_,-1,null));
} else
{if(cljs.core.truth_(ascending_QMARK_))
{if((c__9339 < 0))
{{
var G__9354 = cljs.core.conj.call(null,stack__9337,t__9338);
var G__9355 = t__9338.left;
stack__9337 = G__9354;
t__9338 = G__9355;
continue;
}
} else
{{
var G__9356 = stack__9337;
var G__9357 = t__9338.right;
stack__9337 = G__9356;
t__9338 = G__9357;
continue;
}
}
} else
{if("\uFDD0'else")
{if((c__9339 > 0))
{{
var G__9358 = cljs.core.conj.call(null,stack__9337,t__9338);
var G__9359 = t__9338.right;
stack__9337 = G__9358;
t__9338 = G__9359;
continue;
}
} else
{{
var G__9360 = stack__9337;
var G__9361 = t__9338.left;
stack__9337 = G__9360;
t__9338 = G__9361;
continue;
}
}
} else
{return null;
}
}
}
} else
{if((stack__9337 == null))
{return (new cljs.core.PersistentTreeMapSeq(null,stack__9337,ascending_QMARK_,-1,null));
} else
{return null;
}
}
break;
}
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_entry_key$arity$2 = (function (coll,entry){
var this__9340 = this;
return cljs.core.key.call(null,entry);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_comparator$arity$1 = (function (coll){
var this__9341 = this;
return this__9341.comp;
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9342 = this;
if((this__9342.cnt > 0))
{return cljs.core.create_tree_map_seq.call(null,this__9342.tree,true,this__9342.cnt);
} else
{return null;
}
});
cljs.core.PersistentTreeMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9343 = this;
return this__9343.cnt;
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9344 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9345 = this;
return (new cljs.core.PersistentTreeMap(this__9345.comp,this__9345.tree,this__9345.cnt,meta,this__9345.__hash));
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9346 = this;
return this__9346.meta;
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9347 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentTreeMap.EMPTY,this__9347.meta);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var this__9348 = this;
var found__9349 = [null];
var t__9350 = cljs.core.tree_map_remove.call(null,this__9348.comp,this__9348.tree,k,found__9349);
if((t__9350 == null))
{if((cljs.core.nth.call(null,found__9349,0) == null))
{return coll;
} else
{return (new cljs.core.PersistentTreeMap(this__9348.comp,null,0,this__9348.meta,null));
}
} else
{return (new cljs.core.PersistentTreeMap(this__9348.comp,t__9350.blacken(),(this__9348.cnt - 1),this__9348.meta,null));
}
});
cljs.core.PersistentTreeMap;
cljs.core.PersistentTreeMap.EMPTY = (new cljs.core.PersistentTreeMap(cljs.core.compare,null,0,null,0));
/**
* keyval => key val
* Returns a new hash map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.hash_map = (function() { 
var hash_map__delegate = function (keyvals){
var in__9364 = cljs.core.seq.call(null,keyvals);
var out__9365 = cljs.core.transient$.call(null,cljs.core.PersistentHashMap.EMPTY);
while(true){
if(in__9364)
{{
var G__9366 = cljs.core.nnext.call(null,in__9364);
var G__9367 = cljs.core.assoc_BANG_.call(null,out__9365,cljs.core.first.call(null,in__9364),cljs.core.second.call(null,in__9364));
in__9364 = G__9366;
out__9365 = G__9367;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__9365);
}
break;
}
};
var hash_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return hash_map__delegate.call(this, keyvals);
};
hash_map.cljs$lang$maxFixedArity = 0;
hash_map.cljs$lang$applyTo = (function (arglist__9368){
var keyvals = cljs.core.seq(arglist__9368);;
return hash_map__delegate(keyvals);
});
hash_map.cljs$lang$arity$variadic = hash_map__delegate;
return hash_map;
})()
;
/**
* keyval => key val
* Returns a new array map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.array_map = (function() { 
var array_map__delegate = function (keyvals){
return (new cljs.core.PersistentArrayMap(null,cljs.core.quot.call(null,cljs.core.count.call(null,keyvals),2),cljs.core.apply.call(null,cljs.core.array,keyvals),null));
};
var array_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return array_map__delegate.call(this, keyvals);
};
array_map.cljs$lang$maxFixedArity = 0;
array_map.cljs$lang$applyTo = (function (arglist__9369){
var keyvals = cljs.core.seq(arglist__9369);;
return array_map__delegate(keyvals);
});
array_map.cljs$lang$arity$variadic = array_map__delegate;
return array_map;
})()
;
/**
* keyval => key val
* Returns a new object map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.obj_map = (function() { 
var obj_map__delegate = function (keyvals){
var ks__9373 = [];
var obj__9374 = {};
var kvs__9375 = cljs.core.seq.call(null,keyvals);
while(true){
if(kvs__9375)
{ks__9373.push(cljs.core.first.call(null,kvs__9375));
(obj__9374[cljs.core.first.call(null,kvs__9375)] = cljs.core.second.call(null,kvs__9375));
{
var G__9376 = cljs.core.nnext.call(null,kvs__9375);
kvs__9375 = G__9376;
continue;
}
} else
{return cljs.core.ObjMap.fromObject.call(null,ks__9373,obj__9374);
}
break;
}
};
var obj_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return obj_map__delegate.call(this, keyvals);
};
obj_map.cljs$lang$maxFixedArity = 0;
obj_map.cljs$lang$applyTo = (function (arglist__9377){
var keyvals = cljs.core.seq(arglist__9377);;
return obj_map__delegate(keyvals);
});
obj_map.cljs$lang$arity$variadic = obj_map__delegate;
return obj_map;
})()
;
/**
* keyval => key val
* Returns a new sorted map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.sorted_map = (function() { 
var sorted_map__delegate = function (keyvals){
var in__9380 = cljs.core.seq.call(null,keyvals);
var out__9381 = cljs.core.PersistentTreeMap.EMPTY;
while(true){
if(in__9380)
{{
var G__9382 = cljs.core.nnext.call(null,in__9380);
var G__9383 = cljs.core.assoc.call(null,out__9381,cljs.core.first.call(null,in__9380),cljs.core.second.call(null,in__9380));
in__9380 = G__9382;
out__9381 = G__9383;
continue;
}
} else
{return out__9381;
}
break;
}
};
var sorted_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return sorted_map__delegate.call(this, keyvals);
};
sorted_map.cljs$lang$maxFixedArity = 0;
sorted_map.cljs$lang$applyTo = (function (arglist__9384){
var keyvals = cljs.core.seq(arglist__9384);;
return sorted_map__delegate(keyvals);
});
sorted_map.cljs$lang$arity$variadic = sorted_map__delegate;
return sorted_map;
})()
;
/**
* keyval => key val
* Returns a new sorted map with supplied mappings, using the supplied comparator.
* @param {...*} var_args
*/
cljs.core.sorted_map_by = (function() { 
var sorted_map_by__delegate = function (comparator,keyvals){
var in__9387 = cljs.core.seq.call(null,keyvals);
var out__9388 = (new cljs.core.PersistentTreeMap(comparator,null,0,null,0));
while(true){
if(in__9387)
{{
var G__9389 = cljs.core.nnext.call(null,in__9387);
var G__9390 = cljs.core.assoc.call(null,out__9388,cljs.core.first.call(null,in__9387),cljs.core.second.call(null,in__9387));
in__9387 = G__9389;
out__9388 = G__9390;
continue;
}
} else
{return out__9388;
}
break;
}
};
var sorted_map_by = function (comparator,var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return sorted_map_by__delegate.call(this, comparator, keyvals);
};
sorted_map_by.cljs$lang$maxFixedArity = 1;
sorted_map_by.cljs$lang$applyTo = (function (arglist__9391){
var comparator = cljs.core.first(arglist__9391);
var keyvals = cljs.core.rest(arglist__9391);
return sorted_map_by__delegate(comparator, keyvals);
});
sorted_map_by.cljs$lang$arity$variadic = sorted_map_by__delegate;
return sorted_map_by;
})()
;
/**
* Returns a sequence of the map's keys.
*/
cljs.core.keys = (function keys(hash_map){
return cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.first,hash_map));
});
/**
* Returns the key of the map entry.
*/
cljs.core.key = (function key(map_entry){
return cljs.core._key.call(null,map_entry);
});
/**
* Returns a sequence of the map's values.
*/
cljs.core.vals = (function vals(hash_map){
return cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.second,hash_map));
});
/**
* Returns the value in the map entry.
*/
cljs.core.val = (function val(map_entry){
return cljs.core._val.call(null,map_entry);
});
/**
* Returns a map that consists of the rest of the maps conj-ed onto
* the first.  If a key occurs in more than one map, the mapping from
* the latter (left-to-right) will be the mapping in the result.
* @param {...*} var_args
*/
cljs.core.merge = (function() { 
var merge__delegate = function (maps){
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.identity,maps)))
{return cljs.core.reduce.call(null,(function (p1__9392_SHARP_,p2__9393_SHARP_){
return cljs.core.conj.call(null,(function (){var or__3943__auto____9395 = p1__9392_SHARP_;
if(cljs.core.truth_(or__3943__auto____9395))
{return or__3943__auto____9395;
} else
{return cljs.core.ObjMap.EMPTY;
}
})(),p2__9393_SHARP_);
}),maps);
} else
{return null;
}
};
var merge = function (var_args){
var maps = null;
if (goog.isDef(var_args)) {
  maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return merge__delegate.call(this, maps);
};
merge.cljs$lang$maxFixedArity = 0;
merge.cljs$lang$applyTo = (function (arglist__9396){
var maps = cljs.core.seq(arglist__9396);;
return merge__delegate(maps);
});
merge.cljs$lang$arity$variadic = merge__delegate;
return merge;
})()
;
/**
* Returns a map that consists of the rest of the maps conj-ed onto
* the first.  If a key occurs in more than one map, the mapping(s)
* from the latter (left-to-right) will be combined with the mapping in
* the result by calling (f val-in-result val-in-latter).
* @param {...*} var_args
*/
cljs.core.merge_with = (function() { 
var merge_with__delegate = function (f,maps){
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.identity,maps)))
{var merge_entry__9404 = (function (m,e){
var k__9402 = cljs.core.first.call(null,e);
var v__9403 = cljs.core.second.call(null,e);
if(cljs.core.contains_QMARK_.call(null,m,k__9402))
{return cljs.core.assoc.call(null,m,k__9402,f.call(null,cljs.core._lookup.call(null,m,k__9402,null),v__9403));
} else
{return cljs.core.assoc.call(null,m,k__9402,v__9403);
}
});
var merge2__9406 = (function (m1,m2){
return cljs.core.reduce.call(null,merge_entry__9404,(function (){var or__3943__auto____9405 = m1;
if(cljs.core.truth_(or__3943__auto____9405))
{return or__3943__auto____9405;
} else
{return cljs.core.ObjMap.EMPTY;
}
})(),cljs.core.seq.call(null,m2));
});
return cljs.core.reduce.call(null,merge2__9406,maps);
} else
{return null;
}
};
var merge_with = function (f,var_args){
var maps = null;
if (goog.isDef(var_args)) {
  maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return merge_with__delegate.call(this, f, maps);
};
merge_with.cljs$lang$maxFixedArity = 1;
merge_with.cljs$lang$applyTo = (function (arglist__9407){
var f = cljs.core.first(arglist__9407);
var maps = cljs.core.rest(arglist__9407);
return merge_with__delegate(f, maps);
});
merge_with.cljs$lang$arity$variadic = merge_with__delegate;
return merge_with;
})()
;
/**
* Returns a map containing only those entries in map whose key is in keys
*/
cljs.core.select_keys = (function select_keys(map,keyseq){
var ret__9412 = cljs.core.ObjMap.EMPTY;
var keys__9413 = cljs.core.seq.call(null,keyseq);
while(true){
if(keys__9413)
{var key__9414 = cljs.core.first.call(null,keys__9413);
var entry__9415 = cljs.core._lookup.call(null,map,key__9414,"\uFDD0'cljs.core/not-found");
{
var G__9416 = ((cljs.core.not_EQ_.call(null,entry__9415,"\uFDD0'cljs.core/not-found"))?cljs.core.assoc.call(null,ret__9412,key__9414,entry__9415):ret__9412);
var G__9417 = cljs.core.next.call(null,keys__9413);
ret__9412 = G__9416;
keys__9413 = G__9417;
continue;
}
} else
{return ret__9412;
}
break;
}
});

goog.provide('cljs.core.PersistentHashSet');

/**
* @constructor
*/
cljs.core.PersistentHashSet = (function (meta,hash_map,__hash){
this.meta = meta;
this.hash_map = hash_map;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 4;
this.cljs$lang$protocol_mask$partition0$ = 15077647;
})
cljs.core.PersistentHashSet.cljs$lang$type = true;
cljs.core.PersistentHashSet.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentHashSet");
});
cljs.core.PersistentHashSet.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/PersistentHashSet");
});
cljs.core.PersistentHashSet.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = (function (coll){
var this__9421 = this;
return (new cljs.core.TransientHashSet(cljs.core.transient$.call(null,this__9421.hash_map)));
});
cljs.core.PersistentHashSet.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9422 = this;
var h__2266__auto____9423 = this__9422.__hash;
if(!((h__2266__auto____9423 == null)))
{return h__2266__auto____9423;
} else
{var h__2266__auto____9424 = cljs.core.hash_iset.call(null,coll);
this__9422.__hash = h__2266__auto____9424;
return h__2266__auto____9424;
}
});
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,v){
var this__9425 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,v,null);
});
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,v,not_found){
var this__9426 = this;
if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null,this__9426.hash_map,v)))
{return v;
} else
{return not_found;
}
});
cljs.core.PersistentHashSet.prototype.call = (function() {
var G__9447 = null;
var G__9447__2 = (function (this_sym9427,k){
var this__9429 = this;
var this_sym9427__9430 = this;
var coll__9431 = this_sym9427__9430;
return coll__9431.cljs$core$ILookup$_lookup$arity$2(coll__9431,k);
});
var G__9447__3 = (function (this_sym9428,k,not_found){
var this__9429 = this;
var this_sym9428__9432 = this;
var coll__9433 = this_sym9428__9432;
return coll__9433.cljs$core$ILookup$_lookup$arity$3(coll__9433,k,not_found);
});
G__9447 = function(this_sym9428,k,not_found){
switch(arguments.length){
case 2:
return G__9447__2.call(this,this_sym9428,k);
case 3:
return G__9447__3.call(this,this_sym9428,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9447;
})()
;
cljs.core.PersistentHashSet.prototype.apply = (function (this_sym9419,args9420){
var this__9434 = this;
return this_sym9419.call.apply(this_sym9419,[this_sym9419].concat(args9420.slice()));
});
cljs.core.PersistentHashSet.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9435 = this;
return (new cljs.core.PersistentHashSet(this__9435.meta,cljs.core.assoc.call(null,this__9435.hash_map,o,null),null));
});
cljs.core.PersistentHashSet.prototype.toString = (function (){
var this__9436 = this;
var this__9437 = this;
return cljs.core.pr_str.call(null,this__9437);
});
cljs.core.PersistentHashSet.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9438 = this;
return cljs.core.keys.call(null,this__9438.hash_map);
});
cljs.core.PersistentHashSet.prototype.cljs$core$ISet$_disjoin$arity$2 = (function (coll,v){
var this__9439 = this;
return (new cljs.core.PersistentHashSet(this__9439.meta,cljs.core.dissoc.call(null,this__9439.hash_map,v),null));
});
cljs.core.PersistentHashSet.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9440 = this;
return cljs.core.count.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.PersistentHashSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9441 = this;
var and__3941__auto____9442 = cljs.core.set_QMARK_.call(null,other);
if(and__3941__auto____9442)
{var and__3941__auto____9443 = (cljs.core.count.call(null,coll) === cljs.core.count.call(null,other));
if(and__3941__auto____9443)
{return cljs.core.every_QMARK_.call(null,(function (p1__9418_SHARP_){
return cljs.core.contains_QMARK_.call(null,coll,p1__9418_SHARP_);
}),other);
} else
{return and__3941__auto____9443;
}
} else
{return and__3941__auto____9442;
}
});
cljs.core.PersistentHashSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9444 = this;
return (new cljs.core.PersistentHashSet(meta,this__9444.hash_map,this__9444.__hash));
});
cljs.core.PersistentHashSet.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9445 = this;
return this__9445.meta;
});
cljs.core.PersistentHashSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9446 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentHashSet.EMPTY,this__9446.meta);
});
cljs.core.PersistentHashSet;
cljs.core.PersistentHashSet.EMPTY = (new cljs.core.PersistentHashSet(null,cljs.core.hash_map.call(null),0));
cljs.core.PersistentHashSet.fromArray = (function (items){
var len__9448 = cljs.core.count.call(null,items);
var i__9449 = 0;
var out__9450 = cljs.core.transient$.call(null,cljs.core.PersistentHashSet.EMPTY);
while(true){
if((i__9449 < len__9448))
{{
var G__9451 = (i__9449 + 1);
var G__9452 = cljs.core.conj_BANG_.call(null,out__9450,(items[i__9449]));
i__9449 = G__9451;
out__9450 = G__9452;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__9450);
}
break;
}
});

goog.provide('cljs.core.TransientHashSet');

/**
* @constructor
*/
cljs.core.TransientHashSet = (function (transient_map){
this.transient_map = transient_map;
this.cljs$lang$protocol_mask$partition0$ = 259;
this.cljs$lang$protocol_mask$partition1$ = 136;
})
cljs.core.TransientHashSet.cljs$lang$type = true;
cljs.core.TransientHashSet.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/TransientHashSet");
});
cljs.core.TransientHashSet.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/TransientHashSet");
});
cljs.core.TransientHashSet.prototype.call = (function() {
var G__9470 = null;
var G__9470__2 = (function (this_sym9456,k){
var this__9458 = this;
var this_sym9456__9459 = this;
var tcoll__9460 = this_sym9456__9459;
if((cljs.core._lookup.call(null,this__9458.transient_map,k,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return null;
} else
{return k;
}
});
var G__9470__3 = (function (this_sym9457,k,not_found){
var this__9458 = this;
var this_sym9457__9461 = this;
var tcoll__9462 = this_sym9457__9461;
if((cljs.core._lookup.call(null,this__9458.transient_map,k,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return not_found;
} else
{return k;
}
});
G__9470 = function(this_sym9457,k,not_found){
switch(arguments.length){
case 2:
return G__9470__2.call(this,this_sym9457,k);
case 3:
return G__9470__3.call(this,this_sym9457,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9470;
})()
;
cljs.core.TransientHashSet.prototype.apply = (function (this_sym9454,args9455){
var this__9463 = this;
return this_sym9454.call.apply(this_sym9454,[this_sym9454].concat(args9455.slice()));
});
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (tcoll,v){
var this__9464 = this;
return tcoll.cljs$core$ILookup$_lookup$arity$3(tcoll,v,null);
});
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (tcoll,v,not_found){
var this__9465 = this;
if((cljs.core._lookup.call(null,this__9465.transient_map,v,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel))
{return not_found;
} else
{return v;
}
});
cljs.core.TransientHashSet.prototype.cljs$core$ICounted$_count$arity$1 = (function (tcoll){
var this__9466 = this;
return cljs.core.count.call(null,this__9466.transient_map);
});
cljs.core.TransientHashSet.prototype.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 = (function (tcoll,v){
var this__9467 = this;
this__9467.transient_map = cljs.core.dissoc_BANG_.call(null,this__9467.transient_map,v);
return tcoll;
});
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = (function (tcoll,o){
var this__9468 = this;
this__9468.transient_map = cljs.core.assoc_BANG_.call(null,this__9468.transient_map,o,null);
return tcoll;
});
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = (function (tcoll){
var this__9469 = this;
return (new cljs.core.PersistentHashSet(null,cljs.core.persistent_BANG_.call(null,this__9469.transient_map),null));
});
cljs.core.TransientHashSet;

goog.provide('cljs.core.PersistentTreeSet');

/**
* @constructor
*/
cljs.core.PersistentTreeSet = (function (meta,tree_map,__hash){
this.meta = meta;
this.tree_map = tree_map;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 417730831;
})
cljs.core.PersistentTreeSet.cljs$lang$type = true;
cljs.core.PersistentTreeSet.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/PersistentTreeSet");
});
cljs.core.PersistentTreeSet.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/PersistentTreeSet");
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IHash$_hash$arity$1 = (function (coll){
var this__9473 = this;
var h__2266__auto____9474 = this__9473.__hash;
if(!((h__2266__auto____9474 == null)))
{return h__2266__auto____9474;
} else
{var h__2266__auto____9475 = cljs.core.hash_iset.call(null,coll);
this__9473.__hash = h__2266__auto____9475;
return h__2266__auto____9475;
}
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (coll,v){
var this__9476 = this;
return coll.cljs$core$ILookup$_lookup$arity$3(coll,v,null);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,v,not_found){
var this__9477 = this;
if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null,this__9477.tree_map,v)))
{return v;
} else
{return not_found;
}
});
cljs.core.PersistentTreeSet.prototype.call = (function() {
var G__9503 = null;
var G__9503__2 = (function (this_sym9478,k){
var this__9480 = this;
var this_sym9478__9481 = this;
var coll__9482 = this_sym9478__9481;
return coll__9482.cljs$core$ILookup$_lookup$arity$2(coll__9482,k);
});
var G__9503__3 = (function (this_sym9479,k,not_found){
var this__9480 = this;
var this_sym9479__9483 = this;
var coll__9484 = this_sym9479__9483;
return coll__9484.cljs$core$ILookup$_lookup$arity$3(coll__9484,k,not_found);
});
G__9503 = function(this_sym9479,k,not_found){
switch(arguments.length){
case 2:
return G__9503__2.call(this,this_sym9479,k);
case 3:
return G__9503__3.call(this,this_sym9479,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__9503;
})()
;
cljs.core.PersistentTreeSet.prototype.apply = (function (this_sym9471,args9472){
var this__9485 = this;
return this_sym9471.call.apply(this_sym9471,[this_sym9471].concat(args9472.slice()));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,o){
var this__9486 = this;
return (new cljs.core.PersistentTreeSet(this__9486.meta,cljs.core.assoc.call(null,this__9486.tree_map,o,null),null));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var this__9487 = this;
return cljs.core.map.call(null,cljs.core.key,cljs.core.rseq.call(null,this__9487.tree_map));
});
cljs.core.PersistentTreeSet.prototype.toString = (function (){
var this__9488 = this;
var this__9489 = this;
return cljs.core.pr_str.call(null,this__9489);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = (function (coll,ascending_QMARK_){
var this__9490 = this;
return cljs.core.map.call(null,cljs.core.key,cljs.core._sorted_seq.call(null,this__9490.tree_map,ascending_QMARK_));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = (function (coll,k,ascending_QMARK_){
var this__9491 = this;
return cljs.core.map.call(null,cljs.core.key,cljs.core._sorted_seq_from.call(null,this__9491.tree_map,k,ascending_QMARK_));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_entry_key$arity$2 = (function (coll,entry){
var this__9492 = this;
return entry;
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_comparator$arity$1 = (function (coll){
var this__9493 = this;
return cljs.core._comparator.call(null,this__9493.tree_map);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var this__9494 = this;
return cljs.core.keys.call(null,this__9494.tree_map);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ISet$_disjoin$arity$2 = (function (coll,v){
var this__9495 = this;
return (new cljs.core.PersistentTreeSet(this__9495.meta,cljs.core.dissoc.call(null,this__9495.tree_map,v),null));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
var this__9496 = this;
return cljs.core.count.call(null,this__9496.tree_map);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (coll,other){
var this__9497 = this;
var and__3941__auto____9498 = cljs.core.set_QMARK_.call(null,other);
if(and__3941__auto____9498)
{var and__3941__auto____9499 = (cljs.core.count.call(null,coll) === cljs.core.count.call(null,other));
if(and__3941__auto____9499)
{return cljs.core.every_QMARK_.call(null,(function (p1__9453_SHARP_){
return cljs.core.contains_QMARK_.call(null,coll,p1__9453_SHARP_);
}),other);
} else
{return and__3941__auto____9499;
}
} else
{return and__3941__auto____9498;
}
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (coll,meta){
var this__9500 = this;
return (new cljs.core.PersistentTreeSet(meta,this__9500.tree_map,this__9500.__hash));
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IMeta$_meta$arity$1 = (function (coll){
var this__9501 = this;
return this__9501.meta;
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (coll){
var this__9502 = this;
return cljs.core.with_meta.call(null,cljs.core.PersistentTreeSet.EMPTY,this__9502.meta);
});
cljs.core.PersistentTreeSet;
cljs.core.PersistentTreeSet.EMPTY = (new cljs.core.PersistentTreeSet(null,cljs.core.sorted_map.call(null),0));
/**
* @param {...*} var_args
*/
cljs.core.hash_set = (function() {
var hash_set = null;
var hash_set__0 = (function (){
return cljs.core.PersistentHashSet.EMPTY;
});
var hash_set__1 = (function() { 
var G__9508__delegate = function (keys){
var in__9506 = cljs.core.seq.call(null,keys);
var out__9507 = cljs.core.transient$.call(null,cljs.core.PersistentHashSet.EMPTY);
while(true){
if(cljs.core.seq.call(null,in__9506))
{{
var G__9509 = cljs.core.next.call(null,in__9506);
var G__9510 = cljs.core.conj_BANG_.call(null,out__9507,cljs.core.first.call(null,in__9506));
in__9506 = G__9509;
out__9507 = G__9510;
continue;
}
} else
{return cljs.core.persistent_BANG_.call(null,out__9507);
}
break;
}
};
var G__9508 = function (var_args){
var keys = null;
if (goog.isDef(var_args)) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__9508__delegate.call(this, keys);
};
G__9508.cljs$lang$maxFixedArity = 0;
G__9508.cljs$lang$applyTo = (function (arglist__9511){
var keys = cljs.core.seq(arglist__9511);;
return G__9508__delegate(keys);
});
G__9508.cljs$lang$arity$variadic = G__9508__delegate;
return G__9508;
})()
;
hash_set = function(var_args){
var keys = var_args;
switch(arguments.length){
case 0:
return hash_set__0.call(this);
default:
return hash_set__1.cljs$lang$arity$variadic(cljs.core.array_seq(arguments, 0));
}
throw('Invalid arity: ' + arguments.length);
};
hash_set.cljs$lang$maxFixedArity = 0;
hash_set.cljs$lang$applyTo = hash_set__1.cljs$lang$applyTo;
hash_set.cljs$lang$arity$0 = hash_set__0;
hash_set.cljs$lang$arity$variadic = hash_set__1.cljs$lang$arity$variadic;
return hash_set;
})()
;
/**
* Returns a set of the distinct elements of coll.
*/
cljs.core.set = (function set(coll){
return cljs.core.apply.call(null,cljs.core.hash_set,coll);
});
/**
* Returns a new sorted set with supplied keys.
* @param {...*} var_args
*/
cljs.core.sorted_set = (function() { 
var sorted_set__delegate = function (keys){
return cljs.core.reduce.call(null,cljs.core._conj,cljs.core.PersistentTreeSet.EMPTY,keys);
};
var sorted_set = function (var_args){
var keys = null;
if (goog.isDef(var_args)) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return sorted_set__delegate.call(this, keys);
};
sorted_set.cljs$lang$maxFixedArity = 0;
sorted_set.cljs$lang$applyTo = (function (arglist__9512){
var keys = cljs.core.seq(arglist__9512);;
return sorted_set__delegate(keys);
});
sorted_set.cljs$lang$arity$variadic = sorted_set__delegate;
return sorted_set;
})()
;
/**
* Returns a new sorted set with supplied keys, using the supplied comparator.
* @param {...*} var_args
*/
cljs.core.sorted_set_by = (function() { 
var sorted_set_by__delegate = function (comparator,keys){
return cljs.core.reduce.call(null,cljs.core._conj,(new cljs.core.PersistentTreeSet(null,cljs.core.sorted_map_by.call(null,comparator),0)),keys);
};
var sorted_set_by = function (comparator,var_args){
var keys = null;
if (goog.isDef(var_args)) {
  keys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return sorted_set_by__delegate.call(this, comparator, keys);
};
sorted_set_by.cljs$lang$maxFixedArity = 1;
sorted_set_by.cljs$lang$applyTo = (function (arglist__9514){
var comparator = cljs.core.first(arglist__9514);
var keys = cljs.core.rest(arglist__9514);
return sorted_set_by__delegate(comparator, keys);
});
sorted_set_by.cljs$lang$arity$variadic = sorted_set_by__delegate;
return sorted_set_by;
})()
;
/**
* Given a map of replacement pairs and a vector/collection, returns a
* vector/seq with any elements = a key in smap replaced with the
* corresponding val in smap
*/
cljs.core.replace = (function replace(smap,coll){
if(cljs.core.vector_QMARK_.call(null,coll))
{var n__9520 = cljs.core.count.call(null,coll);
return cljs.core.reduce.call(null,(function (v,i){
var temp__4090__auto____9521 = cljs.core.find.call(null,smap,cljs.core.nth.call(null,v,i));
if(cljs.core.truth_(temp__4090__auto____9521))
{var e__9522 = temp__4090__auto____9521;
return cljs.core.assoc.call(null,v,i,cljs.core.second.call(null,e__9522));
} else
{return v;
}
}),coll,cljs.core.take.call(null,n__9520,cljs.core.iterate.call(null,cljs.core.inc,0)));
} else
{return cljs.core.map.call(null,(function (p1__9513_SHARP_){
var temp__4090__auto____9523 = cljs.core.find.call(null,smap,p1__9513_SHARP_);
if(cljs.core.truth_(temp__4090__auto____9523))
{var e__9524 = temp__4090__auto____9523;
return cljs.core.second.call(null,e__9524);
} else
{return p1__9513_SHARP_;
}
}),coll);
}
});
/**
* Returns a lazy sequence of the elements of coll with duplicates removed
*/
cljs.core.distinct = (function distinct(coll){
var step__9554 = (function step(xs,seen){
return (new cljs.core.LazySeq(null,false,(function (){
return (function (p__9547,seen){
while(true){
var vec__9548__9549 = p__9547;
var f__9550 = cljs.core.nth.call(null,vec__9548__9549,0,null);
var xs__9551 = vec__9548__9549;
var temp__4092__auto____9552 = cljs.core.seq.call(null,xs__9551);
if(temp__4092__auto____9552)
{var s__9553 = temp__4092__auto____9552;
if(cljs.core.contains_QMARK_.call(null,seen,f__9550))
{{
var G__9555 = cljs.core.rest.call(null,s__9553);
var G__9556 = seen;
p__9547 = G__9555;
seen = G__9556;
continue;
}
} else
{return cljs.core.cons.call(null,f__9550,step.call(null,cljs.core.rest.call(null,s__9553),cljs.core.conj.call(null,seen,f__9550)));
}
} else
{return null;
}
break;
}
}).call(null,xs,seen);
}),null));
});
return step__9554.call(null,coll,cljs.core.PersistentHashSet.EMPTY);
});
cljs.core.butlast = (function butlast(s){
var ret__9559 = cljs.core.PersistentVector.EMPTY;
var s__9560 = s;
while(true){
if(cljs.core.next.call(null,s__9560))
{{
var G__9561 = cljs.core.conj.call(null,ret__9559,cljs.core.first.call(null,s__9560));
var G__9562 = cljs.core.next.call(null,s__9560);
ret__9559 = G__9561;
s__9560 = G__9562;
continue;
}
} else
{return cljs.core.seq.call(null,ret__9559);
}
break;
}
});
/**
* Returns the name String of a string, symbol or keyword.
*/
cljs.core.name = (function name(x){
if(cljs.core.string_QMARK_.call(null,x))
{return x;
} else
{if((function (){var or__3943__auto____9565 = cljs.core.keyword_QMARK_.call(null,x);
if(or__3943__auto____9565)
{return or__3943__auto____9565;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})())
{var i__9566 = x.lastIndexOf("/");
if((i__9566 < 0))
{return cljs.core.subs.call(null,x,2);
} else
{return cljs.core.subs.call(null,x,(i__9566 + 1));
}
} else
{if("\uFDD0'else")
{throw (new Error([cljs.core.str("Doesn't support name: "),cljs.core.str(x)].join('')));
} else
{return null;
}
}
}
});
/**
* Returns the namespace String of a symbol or keyword, or nil if not present.
*/
cljs.core.namespace = (function namespace(x){
if((function (){var or__3943__auto____9569 = cljs.core.keyword_QMARK_.call(null,x);
if(or__3943__auto____9569)
{return or__3943__auto____9569;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})())
{var i__9570 = x.lastIndexOf("/");
if((i__9570 > -1))
{return cljs.core.subs.call(null,x,2,i__9570);
} else
{return null;
}
} else
{throw (new Error([cljs.core.str("Doesn't support namespace: "),cljs.core.str(x)].join('')));
}
});
/**
* Returns a map with the keys mapped to the corresponding vals.
*/
cljs.core.zipmap = (function zipmap(keys,vals){
var map__9577 = cljs.core.ObjMap.EMPTY;
var ks__9578 = cljs.core.seq.call(null,keys);
var vs__9579 = cljs.core.seq.call(null,vals);
while(true){
if((function (){var and__3941__auto____9580 = ks__9578;
if(and__3941__auto____9580)
{return vs__9579;
} else
{return and__3941__auto____9580;
}
})())
{{
var G__9581 = cljs.core.assoc.call(null,map__9577,cljs.core.first.call(null,ks__9578),cljs.core.first.call(null,vs__9579));
var G__9582 = cljs.core.next.call(null,ks__9578);
var G__9583 = cljs.core.next.call(null,vs__9579);
map__9577 = G__9581;
ks__9578 = G__9582;
vs__9579 = G__9583;
continue;
}
} else
{return map__9577;
}
break;
}
});
/**
* Returns the x for which (k x), a number, is greatest.
* @param {...*} var_args
*/
cljs.core.max_key = (function() {
var max_key = null;
var max_key__2 = (function (k,x){
return x;
});
var max_key__3 = (function (k,x,y){
if((k.call(null,x) > k.call(null,y)))
{return x;
} else
{return y;
}
});
var max_key__4 = (function() { 
var G__9586__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__9571_SHARP_,p2__9572_SHARP_){
return max_key.call(null,k,p1__9571_SHARP_,p2__9572_SHARP_);
}),max_key.call(null,k,x,y),more);
};
var G__9586 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9586__delegate.call(this, k, x, y, more);
};
G__9586.cljs$lang$maxFixedArity = 3;
G__9586.cljs$lang$applyTo = (function (arglist__9587){
var k = cljs.core.first(arglist__9587);
var x = cljs.core.first(cljs.core.next(arglist__9587));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9587)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9587)));
return G__9586__delegate(k, x, y, more);
});
G__9586.cljs$lang$arity$variadic = G__9586__delegate;
return G__9586;
})()
;
max_key = function(k,x,y,var_args){
var more = var_args;
switch(arguments.length){
case 2:
return max_key__2.call(this,k,x);
case 3:
return max_key__3.call(this,k,x,y);
default:
return max_key__4.cljs$lang$arity$variadic(k,x,y, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
max_key.cljs$lang$maxFixedArity = 3;
max_key.cljs$lang$applyTo = max_key__4.cljs$lang$applyTo;
max_key.cljs$lang$arity$2 = max_key__2;
max_key.cljs$lang$arity$3 = max_key__3;
max_key.cljs$lang$arity$variadic = max_key__4.cljs$lang$arity$variadic;
return max_key;
})()
;
/**
* Returns the x for which (k x), a number, is least.
* @param {...*} var_args
*/
cljs.core.min_key = (function() {
var min_key = null;
var min_key__2 = (function (k,x){
return x;
});
var min_key__3 = (function (k,x,y){
if((k.call(null,x) < k.call(null,y)))
{return x;
} else
{return y;
}
});
var min_key__4 = (function() { 
var G__9588__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__9584_SHARP_,p2__9585_SHARP_){
return min_key.call(null,k,p1__9584_SHARP_,p2__9585_SHARP_);
}),min_key.call(null,k,x,y),more);
};
var G__9588 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9588__delegate.call(this, k, x, y, more);
};
G__9588.cljs$lang$maxFixedArity = 3;
G__9588.cljs$lang$applyTo = (function (arglist__9589){
var k = cljs.core.first(arglist__9589);
var x = cljs.core.first(cljs.core.next(arglist__9589));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9589)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9589)));
return G__9588__delegate(k, x, y, more);
});
G__9588.cljs$lang$arity$variadic = G__9588__delegate;
return G__9588;
})()
;
min_key = function(k,x,y,var_args){
var more = var_args;
switch(arguments.length){
case 2:
return min_key__2.call(this,k,x);
case 3:
return min_key__3.call(this,k,x,y);
default:
return min_key__4.cljs$lang$arity$variadic(k,x,y, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
min_key.cljs$lang$maxFixedArity = 3;
min_key.cljs$lang$applyTo = min_key__4.cljs$lang$applyTo;
min_key.cljs$lang$arity$2 = min_key__2;
min_key.cljs$lang$arity$3 = min_key__3;
min_key.cljs$lang$arity$variadic = min_key__4.cljs$lang$arity$variadic;
return min_key;
})()
;
/**
* Returns a lazy sequence of lists like partition, but may include
* partitions with fewer than n items at the end.
*/
cljs.core.partition_all = (function() {
var partition_all = null;
var partition_all__2 = (function (n,coll){
return partition_all.call(null,n,n,coll);
});
var partition_all__3 = (function (n,step,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__4092__auto____9592 = cljs.core.seq.call(null,coll);
if(temp__4092__auto____9592)
{var s__9593 = temp__4092__auto____9592;
return cljs.core.cons.call(null,cljs.core.take.call(null,n,s__9593),partition_all.call(null,n,step,cljs.core.drop.call(null,step,s__9593)));
} else
{return null;
}
}),null));
});
partition_all = function(n,step,coll){
switch(arguments.length){
case 2:
return partition_all__2.call(this,n,step);
case 3:
return partition_all__3.call(this,n,step,coll);
}
throw('Invalid arity: ' + arguments.length);
};
partition_all.cljs$lang$arity$2 = partition_all__2;
partition_all.cljs$lang$arity$3 = partition_all__3;
return partition_all;
})()
;
/**
* Returns a lazy sequence of successive items from coll while
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.take_while = (function take_while(pred,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__4092__auto____9596 = cljs.core.seq.call(null,coll);
if(temp__4092__auto____9596)
{var s__9597 = temp__4092__auto____9596;
if(cljs.core.truth_(pred.call(null,cljs.core.first.call(null,s__9597))))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__9597),take_while.call(null,pred,cljs.core.rest.call(null,s__9597)));
} else
{return null;
}
} else
{return null;
}
}),null));
});
cljs.core.mk_bound_fn = (function mk_bound_fn(sc,test,key){
return (function (e){
var comp__9599 = cljs.core._comparator.call(null,sc);
return test.call(null,comp__9599.call(null,cljs.core._entry_key.call(null,sc,e),key),0);
});
});
/**
* sc must be a sorted collection, test(s) one of <, <=, > or
* >=. Returns a seq of those entries with keys ek for
* which (test (.. sc comparator (compare ek key)) 0) is true
*/
cljs.core.subseq = (function() {
var subseq = null;
var subseq__3 = (function (sc,test,key){
var include__9611 = cljs.core.mk_bound_fn.call(null,sc,test,key);
if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._GT_,cljs.core._GT__EQ_]).call(null,test)))
{var temp__4092__auto____9612 = cljs.core._sorted_seq_from.call(null,sc,key,true);
if(cljs.core.truth_(temp__4092__auto____9612))
{var vec__9613__9614 = temp__4092__auto____9612;
var e__9615 = cljs.core.nth.call(null,vec__9613__9614,0,null);
var s__9616 = vec__9613__9614;
if(cljs.core.truth_(include__9611.call(null,e__9615)))
{return s__9616;
} else
{return cljs.core.next.call(null,s__9616);
}
} else
{return null;
}
} else
{return cljs.core.take_while.call(null,include__9611,cljs.core._sorted_seq.call(null,sc,true));
}
});
var subseq__5 = (function (sc,start_test,start_key,end_test,end_key){
var temp__4092__auto____9617 = cljs.core._sorted_seq_from.call(null,sc,start_key,true);
if(cljs.core.truth_(temp__4092__auto____9617))
{var vec__9618__9619 = temp__4092__auto____9617;
var e__9620 = cljs.core.nth.call(null,vec__9618__9619,0,null);
var s__9621 = vec__9618__9619;
return cljs.core.take_while.call(null,cljs.core.mk_bound_fn.call(null,sc,end_test,end_key),(cljs.core.truth_(cljs.core.mk_bound_fn.call(null,sc,start_test,start_key).call(null,e__9620))?s__9621:cljs.core.next.call(null,s__9621)));
} else
{return null;
}
});
subseq = function(sc,start_test,start_key,end_test,end_key){
switch(arguments.length){
case 3:
return subseq__3.call(this,sc,start_test,start_key);
case 5:
return subseq__5.call(this,sc,start_test,start_key,end_test,end_key);
}
throw('Invalid arity: ' + arguments.length);
};
subseq.cljs$lang$arity$3 = subseq__3;
subseq.cljs$lang$arity$5 = subseq__5;
return subseq;
})()
;
/**
* sc must be a sorted collection, test(s) one of <, <=, > or
* >=. Returns a reverse seq of those entries with keys ek for
* which (test (.. sc comparator (compare ek key)) 0) is true
*/
cljs.core.rsubseq = (function() {
var rsubseq = null;
var rsubseq__3 = (function (sc,test,key){
var include__9633 = cljs.core.mk_bound_fn.call(null,sc,test,key);
if(cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._LT_,cljs.core._LT__EQ_]).call(null,test)))
{var temp__4092__auto____9634 = cljs.core._sorted_seq_from.call(null,sc,key,false);
if(cljs.core.truth_(temp__4092__auto____9634))
{var vec__9635__9636 = temp__4092__auto____9634;
var e__9637 = cljs.core.nth.call(null,vec__9635__9636,0,null);
var s__9638 = vec__9635__9636;
if(cljs.core.truth_(include__9633.call(null,e__9637)))
{return s__9638;
} else
{return cljs.core.next.call(null,s__9638);
}
} else
{return null;
}
} else
{return cljs.core.take_while.call(null,include__9633,cljs.core._sorted_seq.call(null,sc,false));
}
});
var rsubseq__5 = (function (sc,start_test,start_key,end_test,end_key){
var temp__4092__auto____9639 = cljs.core._sorted_seq_from.call(null,sc,end_key,false);
if(cljs.core.truth_(temp__4092__auto____9639))
{var vec__9640__9641 = temp__4092__auto____9639;
var e__9642 = cljs.core.nth.call(null,vec__9640__9641,0,null);
var s__9643 = vec__9640__9641;
return cljs.core.take_while.call(null,cljs.core.mk_bound_fn.call(null,sc,start_test,start_key),(cljs.core.truth_(cljs.core.mk_bound_fn.call(null,sc,end_test,end_key).call(null,e__9642))?s__9643:cljs.core.next.call(null,s__9643)));
} else
{return null;
}
});
rsubseq = function(sc,start_test,start_key,end_test,end_key){
switch(arguments.length){
case 3:
return rsubseq__3.call(this,sc,start_test,start_key);
case 5:
return rsubseq__5.call(this,sc,start_test,start_key,end_test,end_key);
}
throw('Invalid arity: ' + arguments.length);
};
rsubseq.cljs$lang$arity$3 = rsubseq__3;
rsubseq.cljs$lang$arity$5 = rsubseq__5;
return rsubseq;
})()
;

goog.provide('cljs.core.Range');

/**
* @constructor
*/
cljs.core.Range = (function (meta,start,end,step,__hash){
this.meta = meta;
this.start = start;
this.end = end;
this.step = step;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 32375006;
})
cljs.core.Range.cljs$lang$type = true;
cljs.core.Range.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/Range");
});
cljs.core.Range.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/Range");
});
cljs.core.Range.prototype.cljs$core$IHash$_hash$arity$1 = (function (rng){
var this__9644 = this;
var h__2266__auto____9645 = this__9644.__hash;
if(!((h__2266__auto____9645 == null)))
{return h__2266__auto____9645;
} else
{var h__2266__auto____9646 = cljs.core.hash_coll.call(null,rng);
this__9644.__hash = h__2266__auto____9646;
return h__2266__auto____9646;
}
});
cljs.core.Range.prototype.cljs$core$INext$_next$arity$1 = (function (rng){
var this__9647 = this;
if((this__9647.step > 0))
{if(((this__9647.start + this__9647.step) < this__9647.end))
{return (new cljs.core.Range(this__9647.meta,(this__9647.start + this__9647.step),this__9647.end,this__9647.step,null));
} else
{return null;
}
} else
{if(((this__9647.start + this__9647.step) > this__9647.end))
{return (new cljs.core.Range(this__9647.meta,(this__9647.start + this__9647.step),this__9647.end,this__9647.step,null));
} else
{return null;
}
}
});
cljs.core.Range.prototype.cljs$core$ICollection$_conj$arity$2 = (function (rng,o){
var this__9648 = this;
return cljs.core.cons.call(null,o,rng);
});
cljs.core.Range.prototype.toString = (function (){
var this__9649 = this;
var this__9650 = this;
return cljs.core.pr_str.call(null,this__9650);
});
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (rng,f){
var this__9651 = this;
return cljs.core.ci_reduce.call(null,rng,f);
});
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (rng,f,s){
var this__9652 = this;
return cljs.core.ci_reduce.call(null,rng,f,s);
});
cljs.core.Range.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (rng){
var this__9653 = this;
if((this__9653.step > 0))
{if((this__9653.start < this__9653.end))
{return rng;
} else
{return null;
}
} else
{if((this__9653.start > this__9653.end))
{return rng;
} else
{return null;
}
}
});
cljs.core.Range.prototype.cljs$core$ICounted$_count$arity$1 = (function (rng){
var this__9654 = this;
if(cljs.core.not.call(null,rng.cljs$core$ISeqable$_seq$arity$1(rng)))
{return 0;
} else
{return Math.ceil(((this__9654.end - this__9654.start) / this__9654.step));
}
});
cljs.core.Range.prototype.cljs$core$ISeq$_first$arity$1 = (function (rng){
var this__9655 = this;
return this__9655.start;
});
cljs.core.Range.prototype.cljs$core$ISeq$_rest$arity$1 = (function (rng){
var this__9656 = this;
if(!((rng.cljs$core$ISeqable$_seq$arity$1(rng) == null)))
{return (new cljs.core.Range(this__9656.meta,(this__9656.start + this__9656.step),this__9656.end,this__9656.step,null));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (rng,other){
var this__9657 = this;
return cljs.core.equiv_sequential.call(null,rng,other);
});
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (rng,meta){
var this__9658 = this;
return (new cljs.core.Range(meta,this__9658.start,this__9658.end,this__9658.step,this__9658.__hash));
});
cljs.core.Range.prototype.cljs$core$IMeta$_meta$arity$1 = (function (rng){
var this__9659 = this;
return this__9659.meta;
});
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (rng,n){
var this__9660 = this;
if((n < rng.cljs$core$ICounted$_count$arity$1(rng)))
{return (this__9660.start + (n * this__9660.step));
} else
{if((function (){var and__3941__auto____9661 = (this__9660.start > this__9660.end);
if(and__3941__auto____9661)
{return (this__9660.step === 0);
} else
{return and__3941__auto____9661;
}
})())
{return this__9660.start;
} else
{throw (new Error("Index out of bounds"));
}
}
});
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (rng,n,not_found){
var this__9662 = this;
if((n < rng.cljs$core$ICounted$_count$arity$1(rng)))
{return (this__9662.start + (n * this__9662.step));
} else
{if((function (){var and__3941__auto____9663 = (this__9662.start > this__9662.end);
if(and__3941__auto____9663)
{return (this__9662.step === 0);
} else
{return and__3941__auto____9663;
}
})())
{return this__9662.start;
} else
{return not_found;
}
}
});
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (rng){
var this__9664 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__9664.meta);
});
cljs.core.Range;
/**
* Returns a lazy seq of nums from start (inclusive) to end
* (exclusive), by step, where start defaults to 0, step to 1,
* and end to infinity.
*/
cljs.core.range = (function() {
var range = null;
var range__0 = (function (){
return range.call(null,0,Number.MAX_VALUE,1);
});
var range__1 = (function (end){
return range.call(null,0,end,1);
});
var range__2 = (function (start,end){
return range.call(null,start,end,1);
});
var range__3 = (function (start,end,step){
return (new cljs.core.Range(null,start,end,step,null));
});
range = function(start,end,step){
switch(arguments.length){
case 0:
return range__0.call(this);
case 1:
return range__1.call(this,start);
case 2:
return range__2.call(this,start,end);
case 3:
return range__3.call(this,start,end,step);
}
throw('Invalid arity: ' + arguments.length);
};
range.cljs$lang$arity$0 = range__0;
range.cljs$lang$arity$1 = range__1;
range.cljs$lang$arity$2 = range__2;
range.cljs$lang$arity$3 = range__3;
return range;
})()
;
/**
* Returns a lazy seq of every nth item in coll.
*/
cljs.core.take_nth = (function take_nth(n,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__4092__auto____9667 = cljs.core.seq.call(null,coll);
if(temp__4092__auto____9667)
{var s__9668 = temp__4092__auto____9667;
return cljs.core.cons.call(null,cljs.core.first.call(null,s__9668),take_nth.call(null,n,cljs.core.drop.call(null,n,s__9668)));
} else
{return null;
}
}),null));
});
/**
* Returns a vector of [(take-while pred coll) (drop-while pred coll)]
*/
cljs.core.split_with = (function split_with(pred,coll){
return cljs.core.PersistentVector.fromArray([cljs.core.take_while.call(null,pred,coll),cljs.core.drop_while.call(null,pred,coll)], true);
});
/**
* Applies f to each value in coll, splitting it each time f returns
* a new value.  Returns a lazy seq of partitions.
*/
cljs.core.partition_by = (function partition_by(f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__4092__auto____9675 = cljs.core.seq.call(null,coll);
if(temp__4092__auto____9675)
{var s__9676 = temp__4092__auto____9675;
var fst__9677 = cljs.core.first.call(null,s__9676);
var fv__9678 = f.call(null,fst__9677);
var run__9679 = cljs.core.cons.call(null,fst__9677,cljs.core.take_while.call(null,(function (p1__9669_SHARP_){
return cljs.core._EQ_.call(null,fv__9678,f.call(null,p1__9669_SHARP_));
}),cljs.core.next.call(null,s__9676)));
return cljs.core.cons.call(null,run__9679,partition_by.call(null,f,cljs.core.seq.call(null,cljs.core.drop.call(null,cljs.core.count.call(null,run__9679),s__9676))));
} else
{return null;
}
}),null));
});
/**
* Returns a map from distinct items in coll to the number of times
* they appear.
*/
cljs.core.frequencies = (function frequencies(coll){
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,(function (counts,x){
return cljs.core.assoc_BANG_.call(null,counts,x,(cljs.core._lookup.call(null,counts,x,0) + 1));
}),cljs.core.transient$.call(null,cljs.core.ObjMap.EMPTY),coll));
});
/**
* Returns a lazy seq of the intermediate values of the reduction (as
* per reduce) of coll by f, starting with init.
*/
cljs.core.reductions = (function() {
var reductions = null;
var reductions__2 = (function (f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__4090__auto____9694 = cljs.core.seq.call(null,coll);
if(temp__4090__auto____9694)
{var s__9695 = temp__4090__auto____9694;
return reductions.call(null,f,cljs.core.first.call(null,s__9695),cljs.core.rest.call(null,s__9695));
} else
{return cljs.core.list.call(null,f.call(null));
}
}),null));
});
var reductions__3 = (function (f,init,coll){
return cljs.core.cons.call(null,init,(new cljs.core.LazySeq(null,false,(function (){
var temp__4092__auto____9696 = cljs.core.seq.call(null,coll);
if(temp__4092__auto____9696)
{var s__9697 = temp__4092__auto____9696;
return reductions.call(null,f,f.call(null,init,cljs.core.first.call(null,s__9697)),cljs.core.rest.call(null,s__9697));
} else
{return null;
}
}),null)));
});
reductions = function(f,init,coll){
switch(arguments.length){
case 2:
return reductions__2.call(this,f,init);
case 3:
return reductions__3.call(this,f,init,coll);
}
throw('Invalid arity: ' + arguments.length);
};
reductions.cljs$lang$arity$2 = reductions__2;
reductions.cljs$lang$arity$3 = reductions__3;
return reductions;
})()
;
/**
* Takes a set of functions and returns a fn that is the juxtaposition
* of those fns.  The returned fn takes a variable number of args, and
* returns a vector containing the result of applying each fn to the
* args (left-to-right).
* ((juxt a b c) x) => [(a x) (b x) (c x)]
* @param {...*} var_args
*/
cljs.core.juxt = (function() {
var juxt = null;
var juxt__1 = (function (f){
return (function() {
var G__9700 = null;
var G__9700__0 = (function (){
return cljs.core.vector.call(null,f.call(null));
});
var G__9700__1 = (function (x){
return cljs.core.vector.call(null,f.call(null,x));
});
var G__9700__2 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y));
});
var G__9700__3 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z));
});
var G__9700__4 = (function() { 
var G__9701__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args));
};
var G__9701 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9701__delegate.call(this, x, y, z, args);
};
G__9701.cljs$lang$maxFixedArity = 3;
G__9701.cljs$lang$applyTo = (function (arglist__9702){
var x = cljs.core.first(arglist__9702);
var y = cljs.core.first(cljs.core.next(arglist__9702));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9702)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9702)));
return G__9701__delegate(x, y, z, args);
});
G__9701.cljs$lang$arity$variadic = G__9701__delegate;
return G__9701;
})()
;
G__9700 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__9700__0.call(this);
case 1:
return G__9700__1.call(this,x);
case 2:
return G__9700__2.call(this,x,y);
case 3:
return G__9700__3.call(this,x,y,z);
default:
return G__9700__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__9700.cljs$lang$maxFixedArity = 3;
G__9700.cljs$lang$applyTo = G__9700__4.cljs$lang$applyTo;
return G__9700;
})()
});
var juxt__2 = (function (f,g){
return (function() {
var G__9703 = null;
var G__9703__0 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null));
});
var G__9703__1 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x));
});
var G__9703__2 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y));
});
var G__9703__3 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z));
});
var G__9703__4 = (function() { 
var G__9704__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args));
};
var G__9704 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9704__delegate.call(this, x, y, z, args);
};
G__9704.cljs$lang$maxFixedArity = 3;
G__9704.cljs$lang$applyTo = (function (arglist__9705){
var x = cljs.core.first(arglist__9705);
var y = cljs.core.first(cljs.core.next(arglist__9705));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9705)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9705)));
return G__9704__delegate(x, y, z, args);
});
G__9704.cljs$lang$arity$variadic = G__9704__delegate;
return G__9704;
})()
;
G__9703 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__9703__0.call(this);
case 1:
return G__9703__1.call(this,x);
case 2:
return G__9703__2.call(this,x,y);
case 3:
return G__9703__3.call(this,x,y,z);
default:
return G__9703__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__9703.cljs$lang$maxFixedArity = 3;
G__9703.cljs$lang$applyTo = G__9703__4.cljs$lang$applyTo;
return G__9703;
})()
});
var juxt__3 = (function (f,g,h){
return (function() {
var G__9706 = null;
var G__9706__0 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null),h.call(null));
});
var G__9706__1 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x),h.call(null,x));
});
var G__9706__2 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y),h.call(null,x,y));
});
var G__9706__3 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z),h.call(null,x,y,z));
});
var G__9706__4 = (function() { 
var G__9707__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args),cljs.core.apply.call(null,h,x,y,z,args));
};
var G__9707 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9707__delegate.call(this, x, y, z, args);
};
G__9707.cljs$lang$maxFixedArity = 3;
G__9707.cljs$lang$applyTo = (function (arglist__9708){
var x = cljs.core.first(arglist__9708);
var y = cljs.core.first(cljs.core.next(arglist__9708));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9708)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9708)));
return G__9707__delegate(x, y, z, args);
});
G__9707.cljs$lang$arity$variadic = G__9707__delegate;
return G__9707;
})()
;
G__9706 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__9706__0.call(this);
case 1:
return G__9706__1.call(this,x);
case 2:
return G__9706__2.call(this,x,y);
case 3:
return G__9706__3.call(this,x,y,z);
default:
return G__9706__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__9706.cljs$lang$maxFixedArity = 3;
G__9706.cljs$lang$applyTo = G__9706__4.cljs$lang$applyTo;
return G__9706;
})()
});
var juxt__4 = (function() { 
var G__9709__delegate = function (f,g,h,fs){
var fs__9699 = cljs.core.list_STAR_.call(null,f,g,h,fs);
return (function() {
var G__9710 = null;
var G__9710__0 = (function (){
return cljs.core.reduce.call(null,(function (p1__9680_SHARP_,p2__9681_SHARP_){
return cljs.core.conj.call(null,p1__9680_SHARP_,p2__9681_SHARP_.call(null));
}),cljs.core.PersistentVector.EMPTY,fs__9699);
});
var G__9710__1 = (function (x){
return cljs.core.reduce.call(null,(function (p1__9682_SHARP_,p2__9683_SHARP_){
return cljs.core.conj.call(null,p1__9682_SHARP_,p2__9683_SHARP_.call(null,x));
}),cljs.core.PersistentVector.EMPTY,fs__9699);
});
var G__9710__2 = (function (x,y){
return cljs.core.reduce.call(null,(function (p1__9684_SHARP_,p2__9685_SHARP_){
return cljs.core.conj.call(null,p1__9684_SHARP_,p2__9685_SHARP_.call(null,x,y));
}),cljs.core.PersistentVector.EMPTY,fs__9699);
});
var G__9710__3 = (function (x,y,z){
return cljs.core.reduce.call(null,(function (p1__9686_SHARP_,p2__9687_SHARP_){
return cljs.core.conj.call(null,p1__9686_SHARP_,p2__9687_SHARP_.call(null,x,y,z));
}),cljs.core.PersistentVector.EMPTY,fs__9699);
});
var G__9710__4 = (function() { 
var G__9711__delegate = function (x,y,z,args){
return cljs.core.reduce.call(null,(function (p1__9688_SHARP_,p2__9689_SHARP_){
return cljs.core.conj.call(null,p1__9688_SHARP_,cljs.core.apply.call(null,p2__9689_SHARP_,x,y,z,args));
}),cljs.core.PersistentVector.EMPTY,fs__9699);
};
var G__9711 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9711__delegate.call(this, x, y, z, args);
};
G__9711.cljs$lang$maxFixedArity = 3;
G__9711.cljs$lang$applyTo = (function (arglist__9712){
var x = cljs.core.first(arglist__9712);
var y = cljs.core.first(cljs.core.next(arglist__9712));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9712)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9712)));
return G__9711__delegate(x, y, z, args);
});
G__9711.cljs$lang$arity$variadic = G__9711__delegate;
return G__9711;
})()
;
G__9710 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case 0:
return G__9710__0.call(this);
case 1:
return G__9710__1.call(this,x);
case 2:
return G__9710__2.call(this,x,y);
case 3:
return G__9710__3.call(this,x,y,z);
default:
return G__9710__4.cljs$lang$arity$variadic(x,y,z, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
G__9710.cljs$lang$maxFixedArity = 3;
G__9710.cljs$lang$applyTo = G__9710__4.cljs$lang$applyTo;
return G__9710;
})()
};
var G__9709 = function (f,g,h,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__9709__delegate.call(this, f, g, h, fs);
};
G__9709.cljs$lang$maxFixedArity = 3;
G__9709.cljs$lang$applyTo = (function (arglist__9713){
var f = cljs.core.first(arglist__9713);
var g = cljs.core.first(cljs.core.next(arglist__9713));
var h = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9713)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__9713)));
return G__9709__delegate(f, g, h, fs);
});
G__9709.cljs$lang$arity$variadic = G__9709__delegate;
return G__9709;
})()
;
juxt = function(f,g,h,var_args){
var fs = var_args;
switch(arguments.length){
case 1:
return juxt__1.call(this,f);
case 2:
return juxt__2.call(this,f,g);
case 3:
return juxt__3.call(this,f,g,h);
default:
return juxt__4.cljs$lang$arity$variadic(f,g,h, cljs.core.array_seq(arguments, 3));
}
throw('Invalid arity: ' + arguments.length);
};
juxt.cljs$lang$maxFixedArity = 3;
juxt.cljs$lang$applyTo = juxt__4.cljs$lang$applyTo;
juxt.cljs$lang$arity$1 = juxt__1;
juxt.cljs$lang$arity$2 = juxt__2;
juxt.cljs$lang$arity$3 = juxt__3;
juxt.cljs$lang$arity$variadic = juxt__4.cljs$lang$arity$variadic;
return juxt;
})()
;
/**
* When lazy sequences are produced via functions that have side
* effects, any effects other than those needed to produce the first
* element in the seq do not occur until the seq is consumed. dorun can
* be used to force any effects. Walks through the successive nexts of
* the seq, does not retain the head and returns nil.
*/
cljs.core.dorun = (function() {
var dorun = null;
var dorun__1 = (function (coll){
while(true){
if(cljs.core.seq.call(null,coll))
{{
var G__9716 = cljs.core.next.call(null,coll);
coll = G__9716;
continue;
}
} else
{return null;
}
break;
}
});
var dorun__2 = (function (n,coll){
while(true){
if(cljs.core.truth_((function (){var and__3941__auto____9715 = cljs.core.seq.call(null,coll);
if(and__3941__auto____9715)
{return (n > 0);
} else
{return and__3941__auto____9715;
}
})()))
{{
var G__9717 = (n - 1);
var G__9718 = cljs.core.next.call(null,coll);
n = G__9717;
coll = G__9718;
continue;
}
} else
{return null;
}
break;
}
});
dorun = function(n,coll){
switch(arguments.length){
case 1:
return dorun__1.call(this,n);
case 2:
return dorun__2.call(this,n,coll);
}
throw('Invalid arity: ' + arguments.length);
};
dorun.cljs$lang$arity$1 = dorun__1;
dorun.cljs$lang$arity$2 = dorun__2;
return dorun;
})()
;
/**
* When lazy sequences are produced via functions that have side
* effects, any effects other than those needed to produce the first
* element in the seq do not occur until the seq is consumed. doall can
* be used to force any effects. Walks through the successive nexts of
* the seq, retains the head and returns it, thus causing the entire
* seq to reside in memory at one time.
*/
cljs.core.doall = (function() {
var doall = null;
var doall__1 = (function (coll){
cljs.core.dorun.call(null,coll);
return coll;
});
var doall__2 = (function (n,coll){
cljs.core.dorun.call(null,n,coll);
return coll;
});
doall = function(n,coll){
switch(arguments.length){
case 1:
return doall__1.call(this,n);
case 2:
return doall__2.call(this,n,coll);
}
throw('Invalid arity: ' + arguments.length);
};
doall.cljs$lang$arity$1 = doall__1;
doall.cljs$lang$arity$2 = doall__2;
return doall;
})()
;
cljs.core.regexp_QMARK_ = (function regexp_QMARK_(o){
return o instanceof RegExp;
});
/**
* Returns the result of (re-find re s) if re fully matches s.
*/
cljs.core.re_matches = (function re_matches(re,s){
var matches__9720 = re.exec(s);
if(cljs.core._EQ_.call(null,cljs.core.first.call(null,matches__9720),s))
{if((cljs.core.count.call(null,matches__9720) === 1))
{return cljs.core.first.call(null,matches__9720);
} else
{return cljs.core.vec.call(null,matches__9720);
}
} else
{return null;
}
});
/**
* Returns the first regex match, if any, of s to re, using
* re.exec(s). Returns a vector, containing first the matching
* substring, then any capturing groups if the regular expression contains
* capturing groups.
*/
cljs.core.re_find = (function re_find(re,s){
var matches__9722 = re.exec(s);
if((matches__9722 == null))
{return null;
} else
{if((cljs.core.count.call(null,matches__9722) === 1))
{return cljs.core.first.call(null,matches__9722);
} else
{return cljs.core.vec.call(null,matches__9722);
}
}
});
/**
* Returns a lazy sequence of successive matches of re in s.
*/
cljs.core.re_seq = (function re_seq(re,s){
var match_data__9727 = cljs.core.re_find.call(null,re,s);
var match_idx__9728 = s.search(re);
var match_str__9729 = ((cljs.core.coll_QMARK_.call(null,match_data__9727))?cljs.core.first.call(null,match_data__9727):match_data__9727);
var post_match__9730 = cljs.core.subs.call(null,s,(match_idx__9728 + cljs.core.count.call(null,match_str__9729)));
if(cljs.core.truth_(match_data__9727))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,match_data__9727,re_seq.call(null,re,post_match__9730));
}),null));
} else
{return null;
}
});
/**
* Returns an instance of RegExp which has compiled the provided string.
*/
cljs.core.re_pattern = (function re_pattern(s){
var vec__9737__9738 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,s);
var ___9739 = cljs.core.nth.call(null,vec__9737__9738,0,null);
var flags__9740 = cljs.core.nth.call(null,vec__9737__9738,1,null);
var pattern__9741 = cljs.core.nth.call(null,vec__9737__9738,2,null);
return (new RegExp(pattern__9741,flags__9740));
});
/**
* Do not use this.  It is kept for backwards compatibility with the
* old IPrintable protocol.
*/
cljs.core.pr_sequential = (function pr_sequential(print_one,begin,sep,end,opts,coll){
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray([begin], true),cljs.core.flatten1.call(null,cljs.core.interpose.call(null,cljs.core.PersistentVector.fromArray([sep], true),cljs.core.map.call(null,(function (p1__9731_SHARP_){
return print_one.call(null,p1__9731_SHARP_,opts);
}),coll))),cljs.core.PersistentVector.fromArray([end], true));
});
cljs.core.pr_sequential_writer = (function pr_sequential_writer(writer,print_one,begin,sep,end,opts,coll){
cljs.core._write.call(null,writer,begin);
if(cljs.core.seq.call(null,coll))
{print_one.call(null,cljs.core.first.call(null,coll),writer,opts);
} else
{}
var G__9745__9746 = cljs.core.seq.call(null,cljs.core.next.call(null,coll));
while(true){
if(G__9745__9746)
{var o__9747 = cljs.core.first.call(null,G__9745__9746);
cljs.core._write.call(null,writer,sep);
print_one.call(null,o__9747,writer,opts);
{
var G__9748 = cljs.core.next.call(null,G__9745__9746);
G__9745__9746 = G__9748;
continue;
}
} else
{}
break;
}
return cljs.core._write.call(null,writer,end);
});
/**
* @param {...*} var_args
*/
cljs.core.write_all = (function() { 
var write_all__delegate = function (writer,ss){
var G__9752__9753 = cljs.core.seq.call(null,ss);
while(true){
if(G__9752__9753)
{var s__9754 = cljs.core.first.call(null,G__9752__9753);
cljs.core._write.call(null,writer,s__9754);
{
var G__9755 = cljs.core.next.call(null,G__9752__9753);
G__9752__9753 = G__9755;
continue;
}
} else
{return null;
}
break;
}
};
var write_all = function (writer,var_args){
var ss = null;
if (goog.isDef(var_args)) {
  ss = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return write_all__delegate.call(this, writer, ss);
};
write_all.cljs$lang$maxFixedArity = 1;
write_all.cljs$lang$applyTo = (function (arglist__9756){
var writer = cljs.core.first(arglist__9756);
var ss = cljs.core.rest(arglist__9756);
return write_all__delegate(writer, ss);
});
write_all.cljs$lang$arity$variadic = write_all__delegate;
return write_all;
})()
;
cljs.core.string_print = (function string_print(x){
cljs.core._STAR_print_fn_STAR_.call(null,x);
return null;
});
cljs.core.flush = (function flush(){
return null;
});

goog.provide('cljs.core.StringBufferWriter');

/**
* @constructor
*/
cljs.core.StringBufferWriter = (function (sb){
this.sb = sb;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 1073741824;
})
cljs.core.StringBufferWriter.cljs$lang$type = true;
cljs.core.StringBufferWriter.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/StringBufferWriter");
});
cljs.core.StringBufferWriter.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/StringBufferWriter");
});
cljs.core.StringBufferWriter.prototype.cljs$core$IWriter$_write$arity$2 = (function (_,s){
var this__9757 = this;
return this__9757.sb.append(s);
});
cljs.core.StringBufferWriter.prototype.cljs$core$IWriter$_flush$arity$1 = (function (_){
var this__9758 = this;
return null;
});
cljs.core.StringBufferWriter;
/**
* Do not use this.  It is kept for backwards compatibility with the
* old IPrintable protocol.
*/
cljs.core.pr_seq = (function pr_seq(obj,opts){
if((obj == null))
{return cljs.core.list.call(null,"nil");
} else
{if((void 0 === obj))
{return cljs.core.list.call(null,"#<undefined>");
} else
{if("\uFDD0'else")
{return cljs.core.concat.call(null,(cljs.core.truth_((function (){var and__3941__auto____9768 = cljs.core._lookup.call(null,opts,"\uFDD0'meta",null);
if(cljs.core.truth_(and__3941__auto____9768))
{var and__3941__auto____9772 = (function (){var G__9769__9770 = obj;
if(G__9769__9770)
{if((function (){var or__3943__auto____9771 = (G__9769__9770.cljs$lang$protocol_mask$partition0$ & 131072);
if(or__3943__auto____9771)
{return or__3943__auto____9771;
} else
{return G__9769__9770.cljs$core$IMeta$;
}
})())
{return true;
} else
{if((!G__9769__9770.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__9769__9770);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__9769__9770);
}
})();
if(cljs.core.truth_(and__3941__auto____9772))
{return cljs.core.meta.call(null,obj);
} else
{return and__3941__auto____9772;
}
} else
{return and__3941__auto____9768;
}
})())?cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["^"], true),pr_seq.call(null,cljs.core.meta.call(null,obj),opts),cljs.core.PersistentVector.fromArray([" "], true)):null),(((function (){var and__3941__auto____9773 = !((obj == null));
if(and__3941__auto____9773)
{return obj.cljs$lang$type;
} else
{return and__3941__auto____9773;
}
})())?obj.cljs$lang$ctorPrSeq(obj):(((function (){var G__9774__9775 = obj;
if(G__9774__9775)
{if((function (){var or__3943__auto____9776 = (G__9774__9775.cljs$lang$protocol_mask$partition0$ & 536870912);
if(or__3943__auto____9776)
{return or__3943__auto____9776;
} else
{return G__9774__9775.cljs$core$IPrintable$;
}
})())
{return true;
} else
{if((!G__9774__9775.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintable,G__9774__9775);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintable,G__9774__9775);
}
})())?cljs.core._pr_seq.call(null,obj,opts):(cljs.core.truth_(cljs.core.regexp_QMARK_.call(null,obj))?cljs.core.list.call(null,"#\"",obj.source,"\""):(("\uFDD0'else")?cljs.core.list.call(null,"#<",[cljs.core.str(obj)].join(''),">"):null)))));
} else
{return null;
}
}
}
});
/**
* Prefer this to pr-seq, because it makes the printing function
* configurable, allowing efficient implementations such as appending
* to a StringBuffer.
*/
cljs.core.pr_writer = (function pr_writer(obj,writer,opts){
if((obj == null))
{return cljs.core._write.call(null,writer,"nil");
} else
{if((void 0 === obj))
{return cljs.core._write.call(null,writer,"#<undefined>");
} else
{if("\uFDD0'else")
{if(cljs.core.truth_((function (){var and__3941__auto____9789 = cljs.core._lookup.call(null,opts,"\uFDD0'meta",null);
if(cljs.core.truth_(and__3941__auto____9789))
{var and__3941__auto____9793 = (function (){var G__9790__9791 = obj;
if(G__9790__9791)
{if((function (){var or__3943__auto____9792 = (G__9790__9791.cljs$lang$protocol_mask$partition0$ & 131072);
if(or__3943__auto____9792)
{return or__3943__auto____9792;
} else
{return G__9790__9791.cljs$core$IMeta$;
}
})())
{return true;
} else
{if((!G__9790__9791.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__9790__9791);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,G__9790__9791);
}
})();
if(cljs.core.truth_(and__3941__auto____9793))
{return cljs.core.meta.call(null,obj);
} else
{return and__3941__auto____9793;
}
} else
{return and__3941__auto____9789;
}
})()))
{cljs.core._write.call(null,writer,"^");
pr_writer.call(null,cljs.core.meta.call(null,obj),writer,opts);
cljs.core._write.call(null,writer," ");
} else
{}
if((function (){var and__3941__auto____9794 = !((obj == null));
if(and__3941__auto____9794)
{return obj.cljs$lang$type;
} else
{return and__3941__auto____9794;
}
})())
{return obj.cljs$lang$ctorPrWriter(writer,opts);
} else
{if((function (){var G__9795__9796 = obj;
if(G__9795__9796)
{if((function (){var or__3943__auto____9797 = (G__9795__9796.cljs$lang$protocol_mask$partition0$ & 2147483648);
if(or__3943__auto____9797)
{return or__3943__auto____9797;
} else
{return G__9795__9796.cljs$core$IPrintWithWriter$;
}
})())
{return true;
} else
{if((!G__9795__9796.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintWithWriter,G__9795__9796);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintWithWriter,G__9795__9796);
}
})())
{return cljs.core._pr_writer.call(null,obj,writer,opts);
} else
{if((function (){var G__9798__9799 = obj;
if(G__9798__9799)
{if((function (){var or__3943__auto____9800 = (G__9798__9799.cljs$lang$protocol_mask$partition0$ & 536870912);
if(or__3943__auto____9800)
{return or__3943__auto____9800;
} else
{return G__9798__9799.cljs$core$IPrintable$;
}
})())
{return true;
} else
{if((!G__9798__9799.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintable,G__9798__9799);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintable,G__9798__9799);
}
})())
{return cljs.core.apply.call(null,cljs.core.write_all,writer,cljs.core._pr_seq.call(null,obj,opts));
} else
{if(cljs.core.truth_(cljs.core.regexp_QMARK_.call(null,obj)))
{return cljs.core.write_all.call(null,writer,"#\"",obj.source,"\"");
} else
{if("\uFDD0'else")
{return cljs.core.write_all.call(null,writer,"#<",[cljs.core.str(obj)].join(''),">");
} else
{return null;
}
}
}
}
}
} else
{return null;
}
}
}
});
cljs.core.pr_seq_writer = (function pr_seq_writer(objs,writer,opts){
cljs.core.pr_writer.call(null,cljs.core.first.call(null,objs),writer,opts);
var G__9804__9805 = cljs.core.seq.call(null,cljs.core.next.call(null,objs));
while(true){
if(G__9804__9805)
{var obj__9806 = cljs.core.first.call(null,G__9804__9805);
cljs.core._write.call(null,writer," ");
cljs.core.pr_writer.call(null,obj__9806,writer,opts);
{
var G__9807 = cljs.core.next.call(null,G__9804__9805);
G__9804__9805 = G__9807;
continue;
}
} else
{return null;
}
break;
}
});
cljs.core.pr_sb_with_opts = (function pr_sb_with_opts(objs,opts){
var sb__9810 = (new goog.string.StringBuffer());
var writer__9811 = (new cljs.core.StringBufferWriter(sb__9810));
cljs.core.pr_seq_writer.call(null,objs,writer__9811,opts);
cljs.core._flush.call(null,writer__9811);
return sb__9810;
});
/**
* Prints a sequence of objects to a string, observing all the
* options given in opts
*/
cljs.core.pr_str_with_opts = (function pr_str_with_opts(objs,opts){
if(cljs.core.empty_QMARK_.call(null,objs))
{return "";
} else
{return [cljs.core.str(cljs.core.pr_sb_with_opts.call(null,objs,opts))].join('');
}
});
/**
* Same as pr-str-with-opts followed by (newline)
*/
cljs.core.prn_str_with_opts = (function prn_str_with_opts(objs,opts){
if(cljs.core.empty_QMARK_.call(null,objs))
{return "\n";
} else
{var sb__9813 = cljs.core.pr_sb_with_opts.call(null,objs,opts);
sb__9813.append("\n");
return [cljs.core.str(sb__9813)].join('');
}
});
/**
* Prints a sequence of objects using string-print, observing all
* the options given in opts
*/
cljs.core.pr_with_opts = (function pr_with_opts(objs,opts){
return cljs.core.string_print.call(null,cljs.core.pr_str_with_opts.call(null,objs,opts));
});
cljs.core.newline = (function newline(opts){
cljs.core.string_print.call(null,"\n");
if(cljs.core.truth_(cljs.core._lookup.call(null,opts,"\uFDD0'flush-on-newline",null)))
{return cljs.core.flush.call(null);
} else
{return null;
}
});
cljs.core._STAR_flush_on_newline_STAR_ = true;
cljs.core._STAR_print_readably_STAR_ = true;
cljs.core._STAR_print_meta_STAR_ = false;
cljs.core._STAR_print_dup_STAR_ = false;
cljs.core.pr_opts = (function pr_opts(){
return cljs.core.ObjMap.fromObject(["\uFDD0'flush-on-newline","\uFDD0'readably","\uFDD0'meta","\uFDD0'dup"],{"\uFDD0'flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_,"\uFDD0'readably":cljs.core._STAR_print_readably_STAR_,"\uFDD0'meta":cljs.core._STAR_print_meta_STAR_,"\uFDD0'dup":cljs.core._STAR_print_dup_STAR_});
});
/**
* pr to a string, returning it. Fundamental entrypoint to IPrintable.
* @param {...*} var_args
*/
cljs.core.pr_str = (function() { 
var pr_str__delegate = function (objs){
return cljs.core.pr_str_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var pr_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return pr_str__delegate.call(this, objs);
};
pr_str.cljs$lang$maxFixedArity = 0;
pr_str.cljs$lang$applyTo = (function (arglist__9814){
var objs = cljs.core.seq(arglist__9814);;
return pr_str__delegate(objs);
});
pr_str.cljs$lang$arity$variadic = pr_str__delegate;
return pr_str;
})()
;
/**
* Same as pr-str followed by (newline)
* @param {...*} var_args
*/
cljs.core.prn_str = (function() { 
var prn_str__delegate = function (objs){
return cljs.core.prn_str_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var prn_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return prn_str__delegate.call(this, objs);
};
prn_str.cljs$lang$maxFixedArity = 0;
prn_str.cljs$lang$applyTo = (function (arglist__9815){
var objs = cljs.core.seq(arglist__9815);;
return prn_str__delegate(objs);
});
prn_str.cljs$lang$arity$variadic = prn_str__delegate;
return prn_str;
})()
;
/**
* Prints the object(s) using string-print.  Prints the
* object(s), separated by spaces if there is more than one.
* By default, pr and prn print in a way that objects can be
* read by the reader
* @param {...*} var_args
*/
cljs.core.pr = (function() { 
var pr__delegate = function (objs){
return cljs.core.pr_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var pr = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return pr__delegate.call(this, objs);
};
pr.cljs$lang$maxFixedArity = 0;
pr.cljs$lang$applyTo = (function (arglist__9816){
var objs = cljs.core.seq(arglist__9816);;
return pr__delegate(objs);
});
pr.cljs$lang$arity$variadic = pr__delegate;
return pr;
})()
;
/**
* Prints the object(s) using string-print.
* print and println produce output for human consumption.
* @param {...*} var_args
*/
cljs.core.print = (function() { 
var cljs_core_print__delegate = function (objs){
return cljs.core.pr_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"\uFDD0'readably",false));
};
var cljs_core_print = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return cljs_core_print__delegate.call(this, objs);
};
cljs_core_print.cljs$lang$maxFixedArity = 0;
cljs_core_print.cljs$lang$applyTo = (function (arglist__9817){
var objs = cljs.core.seq(arglist__9817);;
return cljs_core_print__delegate(objs);
});
cljs_core_print.cljs$lang$arity$variadic = cljs_core_print__delegate;
return cljs_core_print;
})()
;
/**
* print to a string, returning it
* @param {...*} var_args
*/
cljs.core.print_str = (function() { 
var print_str__delegate = function (objs){
return cljs.core.pr_str_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"\uFDD0'readably",false));
};
var print_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return print_str__delegate.call(this, objs);
};
print_str.cljs$lang$maxFixedArity = 0;
print_str.cljs$lang$applyTo = (function (arglist__9818){
var objs = cljs.core.seq(arglist__9818);;
return print_str__delegate(objs);
});
print_str.cljs$lang$arity$variadic = print_str__delegate;
return print_str;
})()
;
/**
* Same as print followed by (newline)
* @param {...*} var_args
*/
cljs.core.println = (function() { 
var println__delegate = function (objs){
cljs.core.pr_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"\uFDD0'readably",false));
return cljs.core.newline.call(null,cljs.core.pr_opts.call(null));
};
var println = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return println__delegate.call(this, objs);
};
println.cljs$lang$maxFixedArity = 0;
println.cljs$lang$applyTo = (function (arglist__9819){
var objs = cljs.core.seq(arglist__9819);;
return println__delegate(objs);
});
println.cljs$lang$arity$variadic = println__delegate;
return println;
})()
;
/**
* println to a string, returning it
* @param {...*} var_args
*/
cljs.core.println_str = (function() { 
var println_str__delegate = function (objs){
return cljs.core.prn_str_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"\uFDD0'readably",false));
};
var println_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return println_str__delegate.call(this, objs);
};
println_str.cljs$lang$maxFixedArity = 0;
println_str.cljs$lang$applyTo = (function (arglist__9820){
var objs = cljs.core.seq(arglist__9820);;
return println_str__delegate(objs);
});
println_str.cljs$lang$arity$variadic = println_str__delegate;
return println_str;
})()
;
/**
* Same as pr followed by (newline).
* @param {...*} var_args
*/
cljs.core.prn = (function() { 
var prn__delegate = function (objs){
cljs.core.pr_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
return cljs.core.newline.call(null,cljs.core.pr_opts.call(null));
};
var prn = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return prn__delegate.call(this, objs);
};
prn.cljs$lang$maxFixedArity = 0;
prn.cljs$lang$applyTo = (function (arglist__9821){
var objs = cljs.core.seq(arglist__9821);;
return prn__delegate(objs);
});
prn.cljs$lang$arity$variadic = prn__delegate;
return prn;
})()
;
/**
* Prints formatted output, as per format
* @param {...*} var_args
*/
cljs.core.printf = (function() { 
var printf__delegate = function (fmt,args){
return cljs.core.print.call(null,cljs.core.apply.call(null,cljs.core.format,fmt,args));
};
var printf = function (fmt,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return printf__delegate.call(this, fmt, args);
};
printf.cljs$lang$maxFixedArity = 1;
printf.cljs$lang$applyTo = (function (arglist__9822){
var fmt = cljs.core.first(arglist__9822);
var args = cljs.core.rest(arglist__9822);
return printf__delegate(fmt, args);
});
printf.cljs$lang$arity$variadic = printf__delegate;
return printf;
})()
;
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__9823 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__9823,"{",", ","}",opts,coll);
});
(cljs.core.IPrintable["number"] = true);
(cljs.core._pr_seq["number"] = (function (n,opts){
return cljs.core.list.call(null,[cljs.core.str(n)].join(''));
}));
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.Subvec.prototype.cljs$core$IPrintable$ = true;
cljs.core.Subvec.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.ChunkedCons.prototype.cljs$core$IPrintable$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__9824 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__9824,"{",", ","}",opts,coll);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__9825 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__9825,"{",", ","}",opts,coll);
});
cljs.core.PersistentQueue.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#queue ["," ","]",opts,cljs.core.seq.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.RSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.RSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#{"," ","}",opts,coll);
});
(cljs.core.IPrintable["boolean"] = true);
(cljs.core._pr_seq["boolean"] = (function (bool,opts){
return cljs.core.list.call(null,[cljs.core.str(bool)].join(''));
}));
(cljs.core.IPrintable["string"] = true);
(cljs.core._pr_seq["string"] = (function (obj,opts){
if(cljs.core.keyword_QMARK_.call(null,obj))
{return cljs.core.list.call(null,[cljs.core.str(":"),cljs.core.str((function (){var temp__4092__auto____9826 = cljs.core.namespace.call(null,obj);
if(cljs.core.truth_(temp__4092__auto____9826))
{var nspc__9827 = temp__4092__auto____9826;
return [cljs.core.str(nspc__9827),cljs.core.str("/")].join('');
} else
{return null;
}
})()),cljs.core.str(cljs.core.name.call(null,obj))].join(''));
} else
{if(cljs.core.symbol_QMARK_.call(null,obj))
{return cljs.core.list.call(null,[cljs.core.str((function (){var temp__4092__auto____9828 = cljs.core.namespace.call(null,obj);
if(cljs.core.truth_(temp__4092__auto____9828))
{var nspc__9829 = temp__4092__auto____9828;
return [cljs.core.str(nspc__9829),cljs.core.str("/")].join('');
} else
{return null;
}
})()),cljs.core.str(cljs.core.name.call(null,obj))].join(''));
} else
{if("\uFDD0'else")
{return cljs.core.list.call(null,(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'readably")).call(null,opts))?goog.string.quote(obj):obj));
} else
{return null;
}
}
}
}));
cljs.core.NodeSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.NodeSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.RedNode.prototype.cljs$core$IPrintable$ = true;
cljs.core.RedNode.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__9830 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__9830,"{",", ","}",opts,coll);
});
cljs.core.Vector.prototype.cljs$core$IPrintable$ = true;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#{"," ","}",opts,coll);
});
cljs.core.PersistentVector.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentVector.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.List.prototype.cljs$core$IPrintable$ = true;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
(cljs.core.IPrintable["array"] = true);
(cljs.core._pr_seq["array"] = (function (a,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#<Array [",", ","]>",opts,a);
}));
(cljs.core.IPrintable["function"] = true);
(cljs.core._pr_seq["function"] = (function (this$){
return cljs.core.list.call(null,"#<",[cljs.core.str(this$)].join(''),">");
}));
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = true;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.list.call(null,"()");
});
cljs.core.BlackNode.prototype.cljs$core$IPrintable$ = true;
cljs.core.BlackNode.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
Date.prototype.cljs$core$IPrintable$ = true;
Date.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (d,_){
var normalize__9832 = (function (n,len){
var ns__9831 = [cljs.core.str(n)].join('');
while(true){
if((cljs.core.count.call(null,ns__9831) < len))
{{
var G__9834 = [cljs.core.str("0"),cljs.core.str(ns__9831)].join('');
ns__9831 = G__9834;
continue;
}
} else
{return ns__9831;
}
break;
}
});
return cljs.core.list.call(null,[cljs.core.str("#inst \""),cljs.core.str(d.getUTCFullYear()),cljs.core.str("-"),cljs.core.str(normalize__9832.call(null,(d.getUTCMonth() + 1),2)),cljs.core.str("-"),cljs.core.str(normalize__9832.call(null,d.getUTCDate(),2)),cljs.core.str("T"),cljs.core.str(normalize__9832.call(null,d.getUTCHours(),2)),cljs.core.str(":"),cljs.core.str(normalize__9832.call(null,d.getUTCMinutes(),2)),cljs.core.str(":"),cljs.core.str(normalize__9832.call(null,d.getUTCSeconds(),2)),cljs.core.str("."),cljs.core.str(normalize__9832.call(null,d.getUTCMilliseconds(),3)),cljs.core.str("-"),cljs.core.str("00:00\"")].join(''));
});
cljs.core.Cons.prototype.cljs$core$IPrintable$ = true;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.Range.prototype.cljs$core$IPrintable$ = true;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
var pr_pair__9833 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});
return cljs.core.pr_sequential.call(null,pr_pair__9833,"{",", ","}",opts,coll);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.HashMap.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var pr_pair__9835 = (function (keyval){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,""," ","",opts,keyval);
});
return cljs.core.pr_sequential_writer.call(null,writer,pr_pair__9835,"{",", ","}",opts,coll);
});
(cljs.core.IPrintWithWriter["number"] = true);
(cljs.core._pr_writer["number"] = (function (n,writer,opts){
(1 / 0);
return cljs.core._write.call(null,writer,[cljs.core.str(n)].join(''));
}));
cljs.core.IndexedSeq.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"("," ",")",opts,coll);
});
cljs.core.Subvec.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.Subvec.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"["," ","]",opts,coll);
});
cljs.core.ChunkedCons.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.ChunkedCons.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"("," ",")",opts,coll);
});
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var pr_pair__9836 = (function (keyval){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,""," ","",opts,keyval);
});
return cljs.core.pr_sequential_writer.call(null,writer,pr_pair__9836,"{",", ","}",opts,coll);
});
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var pr_pair__9837 = (function (keyval){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,""," ","",opts,keyval);
});
return cljs.core.pr_sequential_writer.call(null,writer,pr_pair__9837,"{",", ","}",opts,coll);
});
cljs.core.PersistentQueue.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"#queue ["," ","]",opts,cljs.core.seq.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.LazySeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"("," ",")",opts,coll);
});
cljs.core.RSeq.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.RSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"("," ",")",opts,coll);
});
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"#{"," ","}",opts,coll);
});
(cljs.core.IPrintWithWriter["boolean"] = true);
(cljs.core._pr_writer["boolean"] = (function (bool,writer,opts){
return cljs.core._write.call(null,writer,[cljs.core.str(bool)].join(''));
}));
(cljs.core.IPrintWithWriter["string"] = true);
(cljs.core._pr_writer["string"] = (function (obj,writer,opts){
if(cljs.core.keyword_QMARK_.call(null,obj))
{cljs.core._write.call(null,writer,":");
var temp__4092__auto____9838 = cljs.core.namespace.call(null,obj);
if(cljs.core.truth_(temp__4092__auto____9838))
{var nspc__9839 = temp__4092__auto____9838;
cljs.core.write_all.call(null,writer,[cljs.core.str(nspc__9839)].join(''),"/");
} else
{}
return cljs.core._write.call(null,writer,cljs.core.name.call(null,obj));
} else
{if(cljs.core.symbol_QMARK_.call(null,obj))
{var temp__4092__auto____9840 = cljs.core.namespace.call(null,obj);
if(cljs.core.truth_(temp__4092__auto____9840))
{var nspc__9841 = temp__4092__auto____9840;
cljs.core.write_all.call(null,writer,[cljs.core.str(nspc__9841)].join(''),"/");
} else
{}
return cljs.core._write.call(null,writer,cljs.core.name.call(null,obj));
} else
{if("\uFDD0'else")
{if(cljs.core.truth_((new cljs.core.Keyword("\uFDD0'readably")).call(null,opts)))
{return cljs.core._write.call(null,writer,goog.string.quote(obj));
} else
{return cljs.core._write.call(null,writer,obj);
}
} else
{return null;
}
}
}
}));
cljs.core.NodeSeq.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.NodeSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"("," ",")",opts,coll);
});
cljs.core.RedNode.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.RedNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"["," ","]",opts,coll);
});
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"("," ",")",opts,coll);
});
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var pr_pair__9842 = (function (keyval){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,""," ","",opts,keyval);
});
return cljs.core.pr_sequential_writer.call(null,writer,pr_pair__9842,"{",", ","}",opts,coll);
});
cljs.core.Vector.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.Vector.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"["," ","]",opts,coll);
});
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"#{"," ","}",opts,coll);
});
cljs.core.PersistentVector.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.PersistentVector.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"["," ","]",opts,coll);
});
cljs.core.List.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.List.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"("," ",")",opts,coll);
});
(cljs.core.IPrintWithWriter["array"] = true);
(cljs.core._pr_writer["array"] = (function (a,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"#<Array [",", ","]>",opts,a);
}));
(cljs.core.IPrintWithWriter["function"] = true);
(cljs.core._pr_writer["function"] = (function (this$,writer,_){
return cljs.core.write_all.call(null,writer,"#<",[cljs.core.str(this$)].join(''),">");
}));
cljs.core.EmptyList.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.EmptyList.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core._write.call(null,writer,"()");
});
cljs.core.BlackNode.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.BlackNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"["," ","]",opts,coll);
});
Date.prototype.cljs$core$IPrintWithWriter$ = true;
Date.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (d,writer,_){
var normalize__9844 = (function (n,len){
var ns__9843 = [cljs.core.str(n)].join('');
while(true){
if((cljs.core.count.call(null,ns__9843) < len))
{{
var G__9846 = [cljs.core.str("0"),cljs.core.str(ns__9843)].join('');
ns__9843 = G__9846;
continue;
}
} else
{return ns__9843;
}
break;
}
});
return cljs.core.write_all.call(null,writer,"#inst \"",[cljs.core.str(d.getUTCFullYear())].join(''),"-",normalize__9844.call(null,(d.getUTCMonth() + 1),2),"-",normalize__9844.call(null,d.getUTCDate(),2),"T",normalize__9844.call(null,d.getUTCHours(),2),":",normalize__9844.call(null,d.getUTCMinutes(),2),":",normalize__9844.call(null,d.getUTCSeconds(),2),".",normalize__9844.call(null,d.getUTCMilliseconds(),3),"-","00:00\"");
});
cljs.core.Cons.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.Cons.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"("," ",")",opts,coll);
});
cljs.core.Range.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.Range.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"("," ",")",opts,coll);
});
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"("," ",")",opts,coll);
});
cljs.core.ObjMap.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.ObjMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var pr_pair__9845 = (function (keyval){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,""," ","",opts,keyval);
});
return cljs.core.pr_sequential_writer.call(null,writer,pr_pair__9845,"{",", ","}",opts,coll);
});
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintWithWriter$ = true;
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
return cljs.core.pr_sequential_writer.call(null,writer,cljs.core.pr_writer,"("," ",")",opts,coll);
});
cljs.core.PersistentVector.prototype.cljs$core$IComparable$ = true;
cljs.core.PersistentVector.prototype.cljs$core$IComparable$_compare$arity$2 = (function (x,y){
return cljs.core.compare_indexed.call(null,x,y);
});

goog.provide('cljs.core.Atom');

/**
* @constructor
*/
cljs.core.Atom = (function (state,meta,validator,watches){
this.state = state;
this.meta = meta;
this.validator = validator;
this.watches = watches;
this.cljs$lang$protocol_mask$partition0$ = 2690809856;
this.cljs$lang$protocol_mask$partition1$ = 2;
})
cljs.core.Atom.cljs$lang$type = true;
cljs.core.Atom.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/Atom");
});
cljs.core.Atom.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/Atom");
});
cljs.core.Atom.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this__9847 = this;
return goog.getUid(this$);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,oldval,newval){
var this__9848 = this;
var G__9849__9850 = cljs.core.seq.call(null,this__9848.watches);
while(true){
if(G__9849__9850)
{var vec__9851__9852 = cljs.core.first.call(null,G__9849__9850);
var key__9853 = cljs.core.nth.call(null,vec__9851__9852,0,null);
var f__9854 = cljs.core.nth.call(null,vec__9851__9852,1,null);
f__9854.call(null,key__9853,this$,oldval,newval);
{
var G__9862 = cljs.core.next.call(null,G__9849__9850);
G__9849__9850 = G__9862;
continue;
}
} else
{return null;
}
break;
}
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f){
var this__9855 = this;
return this$.watches = cljs.core.assoc.call(null,this__9855.watches,key,f);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var this__9856 = this;
return this$.watches = cljs.core.dissoc.call(null,this__9856.watches,key);
});
cljs.core.Atom.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (a,writer,opts){
var this__9857 = this;
cljs.core._write.call(null,writer,"#<Atom: ");
cljs.core._pr_writer.call(null,this__9857.state,writer,opts);
return cljs.core._write.call(null,writer,">");
});
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (a,opts){
var this__9858 = this;
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["#<Atom: "], true),cljs.core._pr_seq.call(null,this__9858.state,opts),">");
});
cljs.core.Atom.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_){
var this__9859 = this;
return this__9859.meta;
});
cljs.core.Atom.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var this__9860 = this;
return this__9860.state;
});
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var this__9861 = this;
return (o === other);
});
cljs.core.Atom;
/**
* Creates and returns an Atom with an initial value of x and zero or
* more options (in any order):
* 
* :meta metadata-map
* 
* :validator validate-fn
* 
* If metadata-map is supplied, it will be come the metadata on the
* atom. validate-fn must be nil or a side-effect-free fn of one
* argument, which will be passed the intended new state on any state
* change. If the new state is unacceptable, the validate-fn should
* return false or throw an Error.  If either of these error conditions
* occur, then the value of the atom will not change.
* @param {...*} var_args
*/
cljs.core.atom = (function() {
var atom = null;
var atom__1 = (function (x){
return (new cljs.core.Atom(x,null,null,null));
});
var atom__2 = (function() { 
var G__9874__delegate = function (x,p__9863){
var map__9869__9870 = p__9863;
var map__9869__9871 = ((cljs.core.seq_QMARK_.call(null,map__9869__9870))?cljs.core.apply.call(null,cljs.core.hash_map,map__9869__9870):map__9869__9870);
var validator__9872 = cljs.core._lookup.call(null,map__9869__9871,"\uFDD0'validator",null);
var meta__9873 = cljs.core._lookup.call(null,map__9869__9871,"\uFDD0'meta",null);
return (new cljs.core.Atom(x,meta__9873,validator__9872,null));
};
var G__9874 = function (x,var_args){
var p__9863 = null;
if (goog.isDef(var_args)) {
  p__9863 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__9874__delegate.call(this, x, p__9863);
};
G__9874.cljs$lang$maxFixedArity = 1;
G__9874.cljs$lang$applyTo = (function (arglist__9875){
var x = cljs.core.first(arglist__9875);
var p__9863 = cljs.core.rest(arglist__9875);
return G__9874__delegate(x, p__9863);
});
G__9874.cljs$lang$arity$variadic = G__9874__delegate;
return G__9874;
})()
;
atom = function(x,var_args){
var p__9863 = var_args;
switch(arguments.length){
case 1:
return atom__1.call(this,x);
default:
return atom__2.cljs$lang$arity$variadic(x, cljs.core.array_seq(arguments, 1));
}
throw('Invalid arity: ' + arguments.length);
};
atom.cljs$lang$maxFixedArity = 1;
atom.cljs$lang$applyTo = atom__2.cljs$lang$applyTo;
atom.cljs$lang$arity$1 = atom__1;
atom.cljs$lang$arity$variadic = atom__2.cljs$lang$arity$variadic;
return atom;
})()
;
/**
* Sets the value of atom to newval without regard for the
* current value. Returns newval.
*/
cljs.core.reset_BANG_ = (function reset_BANG_(a,new_value){
var temp__4092__auto____9879 = a.validator;
if(cljs.core.truth_(temp__4092__auto____9879))
{var validate__9880 = temp__4092__auto____9879;
if(cljs.core.truth_(validate__9880.call(null,new_value)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Validator rejected reference state"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'validate","\uFDD1'new-value"),cljs.core.hash_map("\uFDD0'line",6683,"\uFDD0'column",13))))].join('')));
}
} else
{}
var old_value__9881 = a.state;
a.state = new_value;
cljs.core._notify_watches.call(null,a,old_value__9881,new_value);
return new_value;
});
/**
* Atomically swaps the value of atom to be:
* (apply f current-value-of-atom args). Note that f may be called
* multiple times, and thus should be free of side effects.  Returns
* the value that was swapped in.
* @param {...*} var_args
*/
cljs.core.swap_BANG_ = (function() {
var swap_BANG_ = null;
var swap_BANG___2 = (function (a,f){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state));
});
var swap_BANG___3 = (function (a,f,x){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x));
});
var swap_BANG___4 = (function (a,f,x,y){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x,y));
});
var swap_BANG___5 = (function (a,f,x,y,z){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x,y,z));
});
var swap_BANG___6 = (function() { 
var G__9882__delegate = function (a,f,x,y,z,more){
return cljs.core.reset_BANG_.call(null,a,cljs.core.apply.call(null,f,a.state,x,y,z,more));
};
var G__9882 = function (a,f,x,y,z,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__9882__delegate.call(this, a, f, x, y, z, more);
};
G__9882.cljs$lang$maxFixedArity = 5;
G__9882.cljs$lang$applyTo = (function (arglist__9883){
var a = cljs.core.first(arglist__9883);
var f = cljs.core.first(cljs.core.next(arglist__9883));
var x = cljs.core.first(cljs.core.next(cljs.core.next(arglist__9883)));
var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9883))));
var z = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9883)))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__9883)))));
return G__9882__delegate(a, f, x, y, z, more);
});
G__9882.cljs$lang$arity$variadic = G__9882__delegate;
return G__9882;
})()
;
swap_BANG_ = function(a,f,x,y,z,var_args){
var more = var_args;
switch(arguments.length){
case 2:
return swap_BANG___2.call(this,a,f);
case 3:
return swap_BANG___3.call(this,a,f,x);
case 4:
return swap_BANG___4.call(this,a,f,x,y);
case 5:
return swap_BANG___5.call(this,a,f,x,y,z);
default:
return swap_BANG___6.cljs$lang$arity$variadic(a,f,x,y,z, cljs.core.array_seq(arguments, 5));
}
throw('Invalid arity: ' + arguments.length);
};
swap_BANG_.cljs$lang$maxFixedArity = 5;
swap_BANG_.cljs$lang$applyTo = swap_BANG___6.cljs$lang$applyTo;
swap_BANG_.cljs$lang$arity$2 = swap_BANG___2;
swap_BANG_.cljs$lang$arity$3 = swap_BANG___3;
swap_BANG_.cljs$lang$arity$4 = swap_BANG___4;
swap_BANG_.cljs$lang$arity$5 = swap_BANG___5;
swap_BANG_.cljs$lang$arity$variadic = swap_BANG___6.cljs$lang$arity$variadic;
return swap_BANG_;
})()
;
/**
* Atomically sets the value of atom to newval if and only if the
* current value of the atom is identical to oldval. Returns true if
* set happened, else false.
*/
cljs.core.compare_and_set_BANG_ = (function compare_and_set_BANG_(a,oldval,newval){
if(cljs.core._EQ_.call(null,a.state,oldval))
{cljs.core.reset_BANG_.call(null,a,newval);
return true;
} else
{return false;
}
});
cljs.core.deref = (function deref(o){
return cljs.core._deref.call(null,o);
});
/**
* Sets the validator-fn for an atom. validator-fn must be nil or a
* side-effect-free fn of one argument, which will be passed the intended
* new state on any state change. If the new state is unacceptable, the
* validator-fn should return false or throw an Error. If the current state
* is not acceptable to the new validator, an Error will be thrown and the
* validator will not be changed.
*/
cljs.core.set_validator_BANG_ = (function set_validator_BANG_(iref,val){
return iref.validator = val;
});
/**
* Gets the validator-fn for a var/ref/agent/atom.
*/
cljs.core.get_validator = (function get_validator(iref){
return iref.validator;
});
/**
* Atomically sets the metadata for a namespace/var/ref/agent/atom to be:
* 
* (apply f its-current-meta args)
* 
* f must be free of side-effects
* @param {...*} var_args
*/
cljs.core.alter_meta_BANG_ = (function() { 
var alter_meta_BANG___delegate = function (iref,f,args){
return iref.meta = cljs.core.apply.call(null,f,iref.meta,args);
};
var alter_meta_BANG_ = function (iref,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return alter_meta_BANG___delegate.call(this, iref, f, args);
};
alter_meta_BANG_.cljs$lang$maxFixedArity = 2;
alter_meta_BANG_.cljs$lang$applyTo = (function (arglist__9884){
var iref = cljs.core.first(arglist__9884);
var f = cljs.core.first(cljs.core.next(arglist__9884));
var args = cljs.core.rest(cljs.core.next(arglist__9884));
return alter_meta_BANG___delegate(iref, f, args);
});
alter_meta_BANG_.cljs$lang$arity$variadic = alter_meta_BANG___delegate;
return alter_meta_BANG_;
})()
;
/**
* Atomically resets the metadata for an atom
*/
cljs.core.reset_meta_BANG_ = (function reset_meta_BANG_(iref,m){
return iref.meta = m;
});
/**
* Alpha - subject to change.
* 
* Adds a watch function to an atom reference. The watch fn must be a
* fn of 4 args: a key, the reference, its old-state, its
* new-state. Whenever the reference's state might have been changed,
* any registered watches will have their functions called. The watch
* fn will be called synchronously. Note that an atom's state
* may have changed again prior to the fn call, so use old/new-state
* rather than derefing the reference. Keys must be unique per
* reference, and can be used to remove the watch with remove-watch,
* but are otherwise considered opaque by the watch mechanism.  Bear in
* mind that regardless of the result or action of the watch fns the
* atom's value will change.  Example:
* 
* (def a (atom 0))
* (add-watch a :inc (fn [k r o n] (assert (== 0 n))))
* (swap! a inc)
* ;; Assertion Error
* (deref a)
* ;=> 1
*/
cljs.core.add_watch = (function add_watch(iref,key,f){
return cljs.core._add_watch.call(null,iref,key,f);
});
/**
* Alpha - subject to change.
* 
* Removes a watch (set by add-watch) from a reference
*/
cljs.core.remove_watch = (function remove_watch(iref,key){
return cljs.core._remove_watch.call(null,iref,key);
});
cljs.core.gensym_counter = null;
/**
* Returns a new symbol with a unique name. If a prefix string is
* supplied, the name is prefix# where # is some unique number. If
* prefix is not supplied, the prefix is 'G__'.
*/
cljs.core.gensym = (function() {
var gensym = null;
var gensym__0 = (function (){
return gensym.call(null,"G__");
});
var gensym__1 = (function (prefix_string){
if((cljs.core.gensym_counter == null))
{cljs.core.gensym_counter = cljs.core.atom.call(null,0);
} else
{}
return cljs.core.symbol.call(null,[cljs.core.str(prefix_string),cljs.core.str(cljs.core.swap_BANG_.call(null,cljs.core.gensym_counter,cljs.core.inc))].join(''));
});
gensym = function(prefix_string){
switch(arguments.length){
case 0:
return gensym__0.call(this);
case 1:
return gensym__1.call(this,prefix_string);
}
throw('Invalid arity: ' + arguments.length);
};
gensym.cljs$lang$arity$0 = gensym__0;
gensym.cljs$lang$arity$1 = gensym__1;
return gensym;
})()
;
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;

goog.provide('cljs.core.Delay');

/**
* @constructor
*/
cljs.core.Delay = (function (state,f){
this.state = state;
this.f = f;
this.cljs$lang$protocol_mask$partition1$ = 1;
this.cljs$lang$protocol_mask$partition0$ = 32768;
})
cljs.core.Delay.cljs$lang$type = true;
cljs.core.Delay.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/Delay");
});
cljs.core.Delay.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/Delay");
});
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_$arity$1 = (function (d){
var this__9885 = this;
return (new cljs.core.Keyword("\uFDD0'done")).call(null,cljs.core.deref.call(null,this__9885.state));
});
cljs.core.Delay.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var this__9886 = this;
return (new cljs.core.Keyword("\uFDD0'value")).call(null,cljs.core.swap_BANG_.call(null,this__9886.state,(function (p__9887){
var map__9888__9889 = p__9887;
var map__9888__9890 = ((cljs.core.seq_QMARK_.call(null,map__9888__9889))?cljs.core.apply.call(null,cljs.core.hash_map,map__9888__9889):map__9888__9889);
var curr_state__9891 = map__9888__9890;
var done__9892 = cljs.core._lookup.call(null,map__9888__9890,"\uFDD0'done",null);
if(cljs.core.truth_(done__9892))
{return curr_state__9891;
} else
{return cljs.core.ObjMap.fromObject(["\uFDD0'done","\uFDD0'value"],{"\uFDD0'done":true,"\uFDD0'value":this__9886.f.call(null)});
}
})));
});
cljs.core.Delay;
/**
* returns true if x is a Delay created with delay
*/
cljs.core.delay_QMARK_ = (function delay_QMARK_(x){
return cljs.core.instance_QMARK_.call(null,cljs.core.Delay,x);
});
/**
* If x is a Delay, returns the (possibly cached) value of its expression, else returns x
*/
cljs.core.force = (function force(x){
if(cljs.core.delay_QMARK_.call(null,x))
{return cljs.core.deref.call(null,x);
} else
{return x;
}
});
/**
* Returns true if a value has been produced for a promise, delay, future or lazy sequence.
*/
cljs.core.realized_QMARK_ = (function realized_QMARK_(d){
return cljs.core._realized_QMARK_.call(null,d);
});
/**
* Recursively transforms JavaScript arrays into ClojureScript
* vectors, and JavaScript objects into ClojureScript maps.  With
* option ':keywordize-keys true' will convert object fields from
* strings to keywords.
* @param {...*} var_args
*/
cljs.core.js__GT_clj = (function() { 
var js__GT_clj__delegate = function (x,options){
var map__9921__9922 = options;
var map__9921__9923 = ((cljs.core.seq_QMARK_.call(null,map__9921__9922))?cljs.core.apply.call(null,cljs.core.hash_map,map__9921__9922):map__9921__9922);
var keywordize_keys__9924 = cljs.core._lookup.call(null,map__9921__9923,"\uFDD0'keywordize-keys",null);
var keyfn__9925 = (cljs.core.truth_(keywordize_keys__9924)?cljs.core.keyword:cljs.core.str);
var f__9948 = (function thisfn(x){
if(cljs.core.seq_QMARK_.call(null,x))
{return cljs.core.doall.call(null,cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.coll_QMARK_.call(null,x))
{return cljs.core.into.call(null,cljs.core.empty.call(null,x),cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.truth_(goog.isArray(x)))
{return cljs.core.vec.call(null,cljs.core.map.call(null,thisfn,x));
} else
{if((cljs.core.type.call(null,x) === Object))
{return cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,(function (){var iter__2547__auto____9947 = (function iter__9937(s__9938){
return (new cljs.core.LazySeq(null,false,(function (){
var s__9938__9943 = s__9938;
while(true){
var temp__4092__auto____9944 = cljs.core.seq.call(null,s__9938__9943);
if(temp__4092__auto____9944)
{var xs__4579__auto____9945 = temp__4092__auto____9944;
var k__9946 = cljs.core.first.call(null,xs__4579__auto____9945);
return cljs.core.cons.call(null,cljs.core.PersistentVector.fromArray([keyfn__9925.call(null,k__9946),thisfn.call(null,(x[k__9946]))], true),iter__9937.call(null,cljs.core.rest.call(null,s__9938__9943)));
} else
{return null;
}
break;
}
}),null));
});
return iter__2547__auto____9947.call(null,cljs.core.js_keys.call(null,x));
})());
} else
{if("\uFDD0'else")
{return x;
} else
{return null;
}
}
}
}
}
});
return f__9948.call(null,x);
};
var js__GT_clj = function (x,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return js__GT_clj__delegate.call(this, x, options);
};
js__GT_clj.cljs$lang$maxFixedArity = 1;
js__GT_clj.cljs$lang$applyTo = (function (arglist__9949){
var x = cljs.core.first(arglist__9949);
var options = cljs.core.rest(arglist__9949);
return js__GT_clj__delegate(x, options);
});
js__GT_clj.cljs$lang$arity$variadic = js__GT_clj__delegate;
return js__GT_clj;
})()
;
/**
* Returns a memoized version of a referentially transparent function. The
* memoized version of the function keeps a cache of the mapping from arguments
* to results and, when calls with the same arguments are repeated often, has
* higher performance at the expense of higher memory use.
*/
cljs.core.memoize = (function memoize(f){
var mem__9954 = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
return (function() { 
var G__9958__delegate = function (args){
var temp__4090__auto____9955 = cljs.core._lookup.call(null,cljs.core.deref.call(null,mem__9954),args,null);
if(cljs.core.truth_(temp__4090__auto____9955))
{var v__9956 = temp__4090__auto____9955;
return v__9956;
} else
{var ret__9957 = cljs.core.apply.call(null,f,args);
cljs.core.swap_BANG_.call(null,mem__9954,cljs.core.assoc,args,ret__9957);
return ret__9957;
}
};
var G__9958 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__9958__delegate.call(this, args);
};
G__9958.cljs$lang$maxFixedArity = 0;
G__9958.cljs$lang$applyTo = (function (arglist__9959){
var args = cljs.core.seq(arglist__9959);;
return G__9958__delegate(args);
});
G__9958.cljs$lang$arity$variadic = G__9958__delegate;
return G__9958;
})()
;
});
/**
* trampoline can be used to convert algorithms requiring mutual
* recursion without stack consumption. Calls f with supplied args, if
* any. If f returns a fn, calls that fn with no arguments, and
* continues to repeat, until the return value is not a fn, then
* returns that non-fn value. Note that if you want to return a fn as a
* final value, you must wrap it in some data structure and unpack it
* after trampoline returns.
* @param {...*} var_args
*/
cljs.core.trampoline = (function() {
var trampoline = null;
var trampoline__1 = (function (f){
while(true){
var ret__9961 = f.call(null);
if(cljs.core.fn_QMARK_.call(null,ret__9961))
{{
var G__9962 = ret__9961;
f = G__9962;
continue;
}
} else
{return ret__9961;
}
break;
}
});
var trampoline__2 = (function() { 
var G__9963__delegate = function (f,args){
return trampoline.call(null,(function (){
return cljs.core.apply.call(null,f,args);
}));
};
var G__9963 = function (f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__9963__delegate.call(this, f, args);
};
G__9963.cljs$lang$maxFixedArity = 1;
G__9963.cljs$lang$applyTo = (function (arglist__9964){
var f = cljs.core.first(arglist__9964);
var args = cljs.core.rest(arglist__9964);
return G__9963__delegate(f, args);
});
G__9963.cljs$lang$arity$variadic = G__9963__delegate;
return G__9963;
})()
;
trampoline = function(f,var_args){
var args = var_args;
switch(arguments.length){
case 1:
return trampoline__1.call(this,f);
default:
return trampoline__2.cljs$lang$arity$variadic(f, cljs.core.array_seq(arguments, 1));
}
throw('Invalid arity: ' + arguments.length);
};
trampoline.cljs$lang$maxFixedArity = 1;
trampoline.cljs$lang$applyTo = trampoline__2.cljs$lang$applyTo;
trampoline.cljs$lang$arity$1 = trampoline__1;
trampoline.cljs$lang$arity$variadic = trampoline__2.cljs$lang$arity$variadic;
return trampoline;
})()
;
/**
* Returns a random floating point number between 0 (inclusive) and
* n (default 1) (exclusive).
*/
cljs.core.rand = (function() {
var rand = null;
var rand__0 = (function (){
return rand.call(null,1);
});
var rand__1 = (function (n){
return (Math.random.call(null) * n);
});
rand = function(n){
switch(arguments.length){
case 0:
return rand__0.call(this);
case 1:
return rand__1.call(this,n);
}
throw('Invalid arity: ' + arguments.length);
};
rand.cljs$lang$arity$0 = rand__0;
rand.cljs$lang$arity$1 = rand__1;
return rand;
})()
;
/**
* Returns a random integer between 0 (inclusive) and n (exclusive).
*/
cljs.core.rand_int = (function rand_int(n){
return Math.floor.call(null,(Math.random.call(null) * n));
});
/**
* Return a random element of the (sequential) collection. Will have
* the same performance characteristics as nth for the given
* collection.
*/
cljs.core.rand_nth = (function rand_nth(coll){
return cljs.core.nth.call(null,coll,cljs.core.rand_int.call(null,cljs.core.count.call(null,coll)));
});
/**
* Returns a map of the elements of coll keyed by the result of
* f on each element. The value at each key will be a vector of the
* corresponding elements, in the order they appeared in coll.
*/
cljs.core.group_by = (function group_by(f,coll){
return cljs.core.reduce.call(null,(function (ret,x){
var k__9966 = f.call(null,x);
return cljs.core.assoc.call(null,ret,k__9966,cljs.core.conj.call(null,cljs.core._lookup.call(null,ret,k__9966,cljs.core.PersistentVector.EMPTY),x));
}),cljs.core.ObjMap.EMPTY,coll);
});
/**
* Creates a hierarchy object for use with derive, isa? etc.
*/
cljs.core.make_hierarchy = (function make_hierarchy(){
return cljs.core.ObjMap.fromObject(["\uFDD0'parents","\uFDD0'descendants","\uFDD0'ancestors"],{"\uFDD0'parents":cljs.core.ObjMap.EMPTY,"\uFDD0'descendants":cljs.core.ObjMap.EMPTY,"\uFDD0'ancestors":cljs.core.ObjMap.EMPTY});
});
cljs.core.global_hierarchy = cljs.core.atom.call(null,cljs.core.make_hierarchy.call(null));
/**
* Returns true if (= child parent), or child is directly or indirectly derived from
* parent, either via a JavaScript type inheritance relationship or a
* relationship established via derive. h must be a hierarchy obtained
* from make-hierarchy, if not supplied defaults to the global
* hierarchy
*/
cljs.core.isa_QMARK_ = (function() {
var isa_QMARK_ = null;
var isa_QMARK___2 = (function (child,parent){
return isa_QMARK_.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),child,parent);
});
var isa_QMARK___3 = (function (h,child,parent){
var or__3943__auto____9975 = cljs.core._EQ_.call(null,child,parent);
if(or__3943__auto____9975)
{return or__3943__auto____9975;
} else
{var or__3943__auto____9976 = cljs.core.contains_QMARK_.call(null,(new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h).call(null,child),parent);
if(or__3943__auto____9976)
{return or__3943__auto____9976;
} else
{var and__3941__auto____9977 = cljs.core.vector_QMARK_.call(null,parent);
if(and__3941__auto____9977)
{var and__3941__auto____9978 = cljs.core.vector_QMARK_.call(null,child);
if(and__3941__auto____9978)
{var and__3941__auto____9979 = (cljs.core.count.call(null,parent) === cljs.core.count.call(null,child));
if(and__3941__auto____9979)
{var ret__9980 = true;
var i__9981 = 0;
while(true){
if((function (){var or__3943__auto____9982 = cljs.core.not.call(null,ret__9980);
if(or__3943__auto____9982)
{return or__3943__auto____9982;
} else
{return (i__9981 === cljs.core.count.call(null,parent));
}
})())
{return ret__9980;
} else
{{
var G__9983 = isa_QMARK_.call(null,h,child.call(null,i__9981),parent.call(null,i__9981));
var G__9984 = (i__9981 + 1);
ret__9980 = G__9983;
i__9981 = G__9984;
continue;
}
}
break;
}
} else
{return and__3941__auto____9979;
}
} else
{return and__3941__auto____9978;
}
} else
{return and__3941__auto____9977;
}
}
}
});
isa_QMARK_ = function(h,child,parent){
switch(arguments.length){
case 2:
return isa_QMARK___2.call(this,h,child);
case 3:
return isa_QMARK___3.call(this,h,child,parent);
}
throw('Invalid arity: ' + arguments.length);
};
isa_QMARK_.cljs$lang$arity$2 = isa_QMARK___2;
isa_QMARK_.cljs$lang$arity$3 = isa_QMARK___3;
return isa_QMARK_;
})()
;
/**
* Returns the immediate parents of tag, either via a JavaScript type
* inheritance relationship or a relationship established via derive. h
* must be a hierarchy obtained from make-hierarchy, if not supplied
* defaults to the global hierarchy
*/
cljs.core.parents = (function() {
var parents = null;
var parents__1 = (function (tag){
return parents.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var parents__2 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core._lookup.call(null,(new cljs.core.Keyword("\uFDD0'parents")).call(null,h),tag,null));
});
parents = function(h,tag){
switch(arguments.length){
case 1:
return parents__1.call(this,h);
case 2:
return parents__2.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
parents.cljs$lang$arity$1 = parents__1;
parents.cljs$lang$arity$2 = parents__2;
return parents;
})()
;
/**
* Returns the immediate and indirect parents of tag, either via a JavaScript type
* inheritance relationship or a relationship established via derive. h
* must be a hierarchy obtained from make-hierarchy, if not supplied
* defaults to the global hierarchy
*/
cljs.core.ancestors = (function() {
var ancestors = null;
var ancestors__1 = (function (tag){
return ancestors.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var ancestors__2 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core._lookup.call(null,(new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h),tag,null));
});
ancestors = function(h,tag){
switch(arguments.length){
case 1:
return ancestors__1.call(this,h);
case 2:
return ancestors__2.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
ancestors.cljs$lang$arity$1 = ancestors__1;
ancestors.cljs$lang$arity$2 = ancestors__2;
return ancestors;
})()
;
/**
* Returns the immediate and indirect children of tag, through a
* relationship established via derive. h must be a hierarchy obtained
* from make-hierarchy, if not supplied defaults to the global
* hierarchy. Note: does not work on JavaScript type inheritance
* relationships.
*/
cljs.core.descendants = (function() {
var descendants = null;
var descendants__1 = (function (tag){
return descendants.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var descendants__2 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core._lookup.call(null,(new cljs.core.Keyword("\uFDD0'descendants")).call(null,h),tag,null));
});
descendants = function(h,tag){
switch(arguments.length){
case 1:
return descendants__1.call(this,h);
case 2:
return descendants__2.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
descendants.cljs$lang$arity$1 = descendants__1;
descendants.cljs$lang$arity$2 = descendants__2;
return descendants;
})()
;
/**
* Establishes a parent/child relationship between parent and
* tag. Parent must be a namespace-qualified symbol or keyword and
* child can be either a namespace-qualified symbol or keyword or a
* class. h must be a hierarchy obtained from make-hierarchy, if not
* supplied defaults to, and modifies, the global hierarchy.
*/
cljs.core.derive = (function() {
var derive = null;
var derive__2 = (function (tag,parent){
if(cljs.core.truth_(cljs.core.namespace.call(null,parent)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'namespace","\uFDD1'parent"),cljs.core.hash_map("\uFDD0'line",6967,"\uFDD0'column",12))))].join('')));
}
cljs.core.swap_BANG_.call(null,cljs.core.global_hierarchy,derive,tag,parent);
return null;
});
var derive__3 = (function (h,tag,parent){
if(cljs.core.not_EQ_.call(null,tag,parent))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("\uFDD1'not=","\uFDD1'tag","\uFDD1'parent"),cljs.core.hash_map("\uFDD0'line",6971,"\uFDD0'column",12))))].join('')));
}
var tp__9993 = (new cljs.core.Keyword("\uFDD0'parents")).call(null,h);
var td__9994 = (new cljs.core.Keyword("\uFDD0'descendants")).call(null,h);
var ta__9995 = (new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h);
var tf__9996 = (function (m,source,sources,target,targets){
return cljs.core.reduce.call(null,(function (ret,k){
return cljs.core.assoc.call(null,ret,k,cljs.core.reduce.call(null,cljs.core.conj,cljs.core._lookup.call(null,targets,k,cljs.core.PersistentHashSet.EMPTY),cljs.core.cons.call(null,target,targets.call(null,target))));
}),m,cljs.core.cons.call(null,source,sources.call(null,source)));
});
var or__3943__auto____9997 = ((cljs.core.contains_QMARK_.call(null,tp__9993.call(null,tag),parent))?null:(function (){if(cljs.core.contains_QMARK_.call(null,ta__9995.call(null,tag),parent))
{throw (new Error([cljs.core.str(tag),cljs.core.str("already has"),cljs.core.str(parent),cljs.core.str("as ancestor")].join('')));
} else
{}
if(cljs.core.contains_QMARK_.call(null,ta__9995.call(null,parent),tag))
{throw (new Error([cljs.core.str("Cyclic derivation:"),cljs.core.str(parent),cljs.core.str("has"),cljs.core.str(tag),cljs.core.str("as ancestor")].join('')));
} else
{}
return cljs.core.ObjMap.fromObject(["\uFDD0'parents","\uFDD0'ancestors","\uFDD0'descendants"],{"\uFDD0'parents":cljs.core.assoc.call(null,(new cljs.core.Keyword("\uFDD0'parents")).call(null,h),tag,cljs.core.conj.call(null,cljs.core._lookup.call(null,tp__9993,tag,cljs.core.PersistentHashSet.EMPTY),parent)),"\uFDD0'ancestors":tf__9996.call(null,(new cljs.core.Keyword("\uFDD0'ancestors")).call(null,h),tag,td__9994,parent,ta__9995),"\uFDD0'descendants":tf__9996.call(null,(new cljs.core.Keyword("\uFDD0'descendants")).call(null,h),parent,ta__9995,tag,td__9994)});
})());
if(cljs.core.truth_(or__3943__auto____9997))
{return or__3943__auto____9997;
} else
{return h;
}
});
derive = function(h,tag,parent){
switch(arguments.length){
case 2:
return derive__2.call(this,h,tag);
case 3:
return derive__3.call(this,h,tag,parent);
}
throw('Invalid arity: ' + arguments.length);
};
derive.cljs$lang$arity$2 = derive__2;
derive.cljs$lang$arity$3 = derive__3;
return derive;
})()
;
/**
* Removes a parent/child relationship between parent and
* tag. h must be a hierarchy obtained from make-hierarchy, if not
* supplied defaults to, and modifies, the global hierarchy.
*/
cljs.core.underive = (function() {
var underive = null;
var underive__2 = (function (tag,parent){
cljs.core.swap_BANG_.call(null,cljs.core.global_hierarchy,underive,tag,parent);
return null;
});
var underive__3 = (function (h,tag,parent){
var parentMap__10002 = (new cljs.core.Keyword("\uFDD0'parents")).call(null,h);
var childsParents__10003 = (cljs.core.truth_(parentMap__10002.call(null,tag))?cljs.core.disj.call(null,parentMap__10002.call(null,tag),parent):cljs.core.PersistentHashSet.EMPTY);
var newParents__10004 = (cljs.core.truth_(cljs.core.not_empty.call(null,childsParents__10003))?cljs.core.assoc.call(null,parentMap__10002,tag,childsParents__10003):cljs.core.dissoc.call(null,parentMap__10002,tag));
var deriv_seq__10005 = cljs.core.flatten.call(null,cljs.core.map.call(null,(function (p1__9985_SHARP_){
return cljs.core.cons.call(null,cljs.core.first.call(null,p1__9985_SHARP_),cljs.core.interpose.call(null,cljs.core.first.call(null,p1__9985_SHARP_),cljs.core.second.call(null,p1__9985_SHARP_)));
}),cljs.core.seq.call(null,newParents__10004)));
if(cljs.core.contains_QMARK_.call(null,parentMap__10002.call(null,tag),parent))
{return cljs.core.reduce.call(null,(function (p1__9986_SHARP_,p2__9987_SHARP_){
return cljs.core.apply.call(null,cljs.core.derive,p1__9986_SHARP_,p2__9987_SHARP_);
}),cljs.core.make_hierarchy.call(null),cljs.core.partition.call(null,2,deriv_seq__10005));
} else
{return h;
}
});
underive = function(h,tag,parent){
switch(arguments.length){
case 2:
return underive__2.call(this,h,tag);
case 3:
return underive__3.call(this,h,tag,parent);
}
throw('Invalid arity: ' + arguments.length);
};
underive.cljs$lang$arity$2 = underive__2;
underive.cljs$lang$arity$3 = underive__3;
return underive;
})()
;
cljs.core.reset_cache = (function reset_cache(method_cache,method_table,cached_hierarchy,hierarchy){
cljs.core.swap_BANG_.call(null,method_cache,(function (_){
return cljs.core.deref.call(null,method_table);
}));
return cljs.core.swap_BANG_.call(null,cached_hierarchy,(function (_){
return cljs.core.deref.call(null,hierarchy);
}));
});
cljs.core.prefers_STAR_ = (function prefers_STAR_(x,y,prefer_table){
var xprefs__10013 = cljs.core.deref.call(null,prefer_table).call(null,x);
var or__3943__auto____10015 = (cljs.core.truth_((function (){var and__3941__auto____10014 = xprefs__10013;
if(cljs.core.truth_(and__3941__auto____10014))
{return xprefs__10013.call(null,y);
} else
{return and__3941__auto____10014;
}
})())?true:null);
if(cljs.core.truth_(or__3943__auto____10015))
{return or__3943__auto____10015;
} else
{var or__3943__auto____10017 = (function (){var ps__10016 = cljs.core.parents.call(null,y);
while(true){
if((cljs.core.count.call(null,ps__10016) > 0))
{if(cljs.core.truth_(prefers_STAR_.call(null,x,cljs.core.first.call(null,ps__10016),prefer_table)))
{} else
{}
{
var G__10020 = cljs.core.rest.call(null,ps__10016);
ps__10016 = G__10020;
continue;
}
} else
{return null;
}
break;
}
})();
if(cljs.core.truth_(or__3943__auto____10017))
{return or__3943__auto____10017;
} else
{var or__3943__auto____10019 = (function (){var ps__10018 = cljs.core.parents.call(null,x);
while(true){
if((cljs.core.count.call(null,ps__10018) > 0))
{if(cljs.core.truth_(prefers_STAR_.call(null,cljs.core.first.call(null,ps__10018),y,prefer_table)))
{} else
{}
{
var G__10021 = cljs.core.rest.call(null,ps__10018);
ps__10018 = G__10021;
continue;
}
} else
{return null;
}
break;
}
})();
if(cljs.core.truth_(or__3943__auto____10019))
{return or__3943__auto____10019;
} else
{return false;
}
}
}
});
cljs.core.dominates = (function dominates(x,y,prefer_table){
var or__3943__auto____10023 = cljs.core.prefers_STAR_.call(null,x,y,prefer_table);
if(cljs.core.truth_(or__3943__auto____10023))
{return or__3943__auto____10023;
} else
{return cljs.core.isa_QMARK_.call(null,x,y);
}
});
cljs.core.find_and_cache_best_method = (function find_and_cache_best_method(name,dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy){
var best_entry__10041 = cljs.core.reduce.call(null,(function (be,p__10033){
var vec__10034__10035 = p__10033;
var k__10036 = cljs.core.nth.call(null,vec__10034__10035,0,null);
var ___10037 = cljs.core.nth.call(null,vec__10034__10035,1,null);
var e__10038 = vec__10034__10035;
if(cljs.core.isa_QMARK_.call(null,dispatch_val,k__10036))
{var be2__10040 = (cljs.core.truth_((function (){var or__3943__auto____10039 = (be == null);
if(or__3943__auto____10039)
{return or__3943__auto____10039;
} else
{return cljs.core.dominates.call(null,k__10036,cljs.core.first.call(null,be),prefer_table);
}
})())?e__10038:be);
if(cljs.core.truth_(cljs.core.dominates.call(null,cljs.core.first.call(null,be2__10040),k__10036,prefer_table)))
{} else
{throw (new Error([cljs.core.str("Multiple methods in multimethod '"),cljs.core.str(name),cljs.core.str("' match dispatch value: "),cljs.core.str(dispatch_val),cljs.core.str(" -> "),cljs.core.str(k__10036),cljs.core.str(" and "),cljs.core.str(cljs.core.first.call(null,be2__10040)),cljs.core.str(", and neither is preferred")].join('')));
}
return be2__10040;
} else
{return be;
}
}),null,cljs.core.deref.call(null,method_table));
if(cljs.core.truth_(best_entry__10041))
{if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,cached_hierarchy),cljs.core.deref.call(null,hierarchy)))
{cljs.core.swap_BANG_.call(null,method_cache,cljs.core.assoc,dispatch_val,cljs.core.second.call(null,best_entry__10041));
return cljs.core.second.call(null,best_entry__10041);
} else
{cljs.core.reset_cache.call(null,method_cache,method_table,cached_hierarchy,hierarchy);
return find_and_cache_best_method.call(null,name,dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy);
}
} else
{return null;
}
});
cljs.core.IMultiFn = {};
cljs.core._reset = (function _reset(mf){
if((function (){var and__3941__auto____10046 = mf;
if(and__3941__auto____10046)
{return mf.cljs$core$IMultiFn$_reset$arity$1;
} else
{return and__3941__auto____10046;
}
})())
{return mf.cljs$core$IMultiFn$_reset$arity$1(mf);
} else
{var x__2450__auto____10047 = (((mf == null))?null:mf);
return (function (){var or__3943__auto____10048 = (cljs.core._reset[goog.typeOf(x__2450__auto____10047)]);
if(or__3943__auto____10048)
{return or__3943__auto____10048;
} else
{var or__3943__auto____10049 = (cljs.core._reset["_"]);
if(or__3943__auto____10049)
{return or__3943__auto____10049;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-reset",mf);
}
}
})().call(null,mf);
}
});
cljs.core._add_method = (function _add_method(mf,dispatch_val,method){
if((function (){var and__3941__auto____10054 = mf;
if(and__3941__auto____10054)
{return mf.cljs$core$IMultiFn$_add_method$arity$3;
} else
{return and__3941__auto____10054;
}
})())
{return mf.cljs$core$IMultiFn$_add_method$arity$3(mf,dispatch_val,method);
} else
{var x__2450__auto____10055 = (((mf == null))?null:mf);
return (function (){var or__3943__auto____10056 = (cljs.core._add_method[goog.typeOf(x__2450__auto____10055)]);
if(or__3943__auto____10056)
{return or__3943__auto____10056;
} else
{var or__3943__auto____10057 = (cljs.core._add_method["_"]);
if(or__3943__auto____10057)
{return or__3943__auto____10057;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-add-method",mf);
}
}
})().call(null,mf,dispatch_val,method);
}
});
cljs.core._remove_method = (function _remove_method(mf,dispatch_val){
if((function (){var and__3941__auto____10062 = mf;
if(and__3941__auto____10062)
{return mf.cljs$core$IMultiFn$_remove_method$arity$2;
} else
{return and__3941__auto____10062;
}
})())
{return mf.cljs$core$IMultiFn$_remove_method$arity$2(mf,dispatch_val);
} else
{var x__2450__auto____10063 = (((mf == null))?null:mf);
return (function (){var or__3943__auto____10064 = (cljs.core._remove_method[goog.typeOf(x__2450__auto____10063)]);
if(or__3943__auto____10064)
{return or__3943__auto____10064;
} else
{var or__3943__auto____10065 = (cljs.core._remove_method["_"]);
if(or__3943__auto____10065)
{return or__3943__auto____10065;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-remove-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._prefer_method = (function _prefer_method(mf,dispatch_val,dispatch_val_y){
if((function (){var and__3941__auto____10070 = mf;
if(and__3941__auto____10070)
{return mf.cljs$core$IMultiFn$_prefer_method$arity$3;
} else
{return and__3941__auto____10070;
}
})())
{return mf.cljs$core$IMultiFn$_prefer_method$arity$3(mf,dispatch_val,dispatch_val_y);
} else
{var x__2450__auto____10071 = (((mf == null))?null:mf);
return (function (){var or__3943__auto____10072 = (cljs.core._prefer_method[goog.typeOf(x__2450__auto____10071)]);
if(or__3943__auto____10072)
{return or__3943__auto____10072;
} else
{var or__3943__auto____10073 = (cljs.core._prefer_method["_"]);
if(or__3943__auto____10073)
{return or__3943__auto____10073;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefer-method",mf);
}
}
})().call(null,mf,dispatch_val,dispatch_val_y);
}
});
cljs.core._get_method = (function _get_method(mf,dispatch_val){
if((function (){var and__3941__auto____10078 = mf;
if(and__3941__auto____10078)
{return mf.cljs$core$IMultiFn$_get_method$arity$2;
} else
{return and__3941__auto____10078;
}
})())
{return mf.cljs$core$IMultiFn$_get_method$arity$2(mf,dispatch_val);
} else
{var x__2450__auto____10079 = (((mf == null))?null:mf);
return (function (){var or__3943__auto____10080 = (cljs.core._get_method[goog.typeOf(x__2450__auto____10079)]);
if(or__3943__auto____10080)
{return or__3943__auto____10080;
} else
{var or__3943__auto____10081 = (cljs.core._get_method["_"]);
if(or__3943__auto____10081)
{return or__3943__auto____10081;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-get-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._methods = (function _methods(mf){
if((function (){var and__3941__auto____10086 = mf;
if(and__3941__auto____10086)
{return mf.cljs$core$IMultiFn$_methods$arity$1;
} else
{return and__3941__auto____10086;
}
})())
{return mf.cljs$core$IMultiFn$_methods$arity$1(mf);
} else
{var x__2450__auto____10087 = (((mf == null))?null:mf);
return (function (){var or__3943__auto____10088 = (cljs.core._methods[goog.typeOf(x__2450__auto____10087)]);
if(or__3943__auto____10088)
{return or__3943__auto____10088;
} else
{var or__3943__auto____10089 = (cljs.core._methods["_"]);
if(or__3943__auto____10089)
{return or__3943__auto____10089;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-methods",mf);
}
}
})().call(null,mf);
}
});
cljs.core._prefers = (function _prefers(mf){
if((function (){var and__3941__auto____10094 = mf;
if(and__3941__auto____10094)
{return mf.cljs$core$IMultiFn$_prefers$arity$1;
} else
{return and__3941__auto____10094;
}
})())
{return mf.cljs$core$IMultiFn$_prefers$arity$1(mf);
} else
{var x__2450__auto____10095 = (((mf == null))?null:mf);
return (function (){var or__3943__auto____10096 = (cljs.core._prefers[goog.typeOf(x__2450__auto____10095)]);
if(or__3943__auto____10096)
{return or__3943__auto____10096;
} else
{var or__3943__auto____10097 = (cljs.core._prefers["_"]);
if(or__3943__auto____10097)
{return or__3943__auto____10097;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefers",mf);
}
}
})().call(null,mf);
}
});
cljs.core._dispatch = (function _dispatch(mf,args){
if((function (){var and__3941__auto____10102 = mf;
if(and__3941__auto____10102)
{return mf.cljs$core$IMultiFn$_dispatch$arity$2;
} else
{return and__3941__auto____10102;
}
})())
{return mf.cljs$core$IMultiFn$_dispatch$arity$2(mf,args);
} else
{var x__2450__auto____10103 = (((mf == null))?null:mf);
return (function (){var or__3943__auto____10104 = (cljs.core._dispatch[goog.typeOf(x__2450__auto____10103)]);
if(or__3943__auto____10104)
{return or__3943__auto____10104;
} else
{var or__3943__auto____10105 = (cljs.core._dispatch["_"]);
if(or__3943__auto____10105)
{return or__3943__auto____10105;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-dispatch",mf);
}
}
})().call(null,mf,args);
}
});
cljs.core.do_dispatch = (function do_dispatch(mf,dispatch_fn,args){
var dispatch_val__10108 = cljs.core.apply.call(null,dispatch_fn,args);
var target_fn__10109 = cljs.core._get_method.call(null,mf,dispatch_val__10108);
if(cljs.core.truth_(target_fn__10109))
{} else
{throw (new Error([cljs.core.str("No method in multimethod '"),cljs.core.str(cljs.core.name),cljs.core.str("' for dispatch value: "),cljs.core.str(dispatch_val__10108)].join('')));
}
return cljs.core.apply.call(null,target_fn__10109,args);
});

goog.provide('cljs.core.MultiFn');

/**
* @constructor
*/
cljs.core.MultiFn = (function (name,dispatch_fn,default_dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy){
this.name = name;
this.dispatch_fn = dispatch_fn;
this.default_dispatch_val = default_dispatch_val;
this.hierarchy = hierarchy;
this.method_table = method_table;
this.prefer_table = prefer_table;
this.method_cache = method_cache;
this.cached_hierarchy = cached_hierarchy;
this.cljs$lang$protocol_mask$partition0$ = 4194304;
this.cljs$lang$protocol_mask$partition1$ = 256;
})
cljs.core.MultiFn.cljs$lang$type = true;
cljs.core.MultiFn.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/MultiFn");
});
cljs.core.MultiFn.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/MultiFn");
});
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this__10110 = this;
return goog.getUid(this$);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset$arity$1 = (function (mf){
var this__10111 = this;
cljs.core.swap_BANG_.call(null,this__10111.method_table,(function (mf){
return cljs.core.ObjMap.EMPTY;
}));
cljs.core.swap_BANG_.call(null,this__10111.method_cache,(function (mf){
return cljs.core.ObjMap.EMPTY;
}));
cljs.core.swap_BANG_.call(null,this__10111.prefer_table,(function (mf){
return cljs.core.ObjMap.EMPTY;
}));
cljs.core.swap_BANG_.call(null,this__10111.cached_hierarchy,(function (mf){
return null;
}));
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method$arity$3 = (function (mf,dispatch_val,method){
var this__10112 = this;
cljs.core.swap_BANG_.call(null,this__10112.method_table,cljs.core.assoc,dispatch_val,method);
cljs.core.reset_cache.call(null,this__10112.method_cache,this__10112.method_table,this__10112.cached_hierarchy,this__10112.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method$arity$2 = (function (mf,dispatch_val){
var this__10113 = this;
cljs.core.swap_BANG_.call(null,this__10113.method_table,cljs.core.dissoc,dispatch_val);
cljs.core.reset_cache.call(null,this__10113.method_cache,this__10113.method_table,this__10113.cached_hierarchy,this__10113.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method$arity$2 = (function (mf,dispatch_val){
var this__10114 = this;
if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,this__10114.cached_hierarchy),cljs.core.deref.call(null,this__10114.hierarchy)))
{} else
{cljs.core.reset_cache.call(null,this__10114.method_cache,this__10114.method_table,this__10114.cached_hierarchy,this__10114.hierarchy);
}
var temp__4090__auto____10115 = cljs.core.deref.call(null,this__10114.method_cache).call(null,dispatch_val);
if(cljs.core.truth_(temp__4090__auto____10115))
{var target_fn__10116 = temp__4090__auto____10115;
return target_fn__10116;
} else
{var temp__4090__auto____10117 = cljs.core.find_and_cache_best_method.call(null,this__10114.name,dispatch_val,this__10114.hierarchy,this__10114.method_table,this__10114.prefer_table,this__10114.method_cache,this__10114.cached_hierarchy);
if(cljs.core.truth_(temp__4090__auto____10117))
{var target_fn__10118 = temp__4090__auto____10117;
return target_fn__10118;
} else
{return cljs.core.deref.call(null,this__10114.method_table).call(null,this__10114.default_dispatch_val);
}
}
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method$arity$3 = (function (mf,dispatch_val_x,dispatch_val_y){
var this__10119 = this;
if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null,dispatch_val_x,dispatch_val_y,this__10119.prefer_table)))
{throw (new Error([cljs.core.str("Preference conflict in multimethod '"),cljs.core.str(this__10119.name),cljs.core.str("': "),cljs.core.str(dispatch_val_y),cljs.core.str(" is already preferred to "),cljs.core.str(dispatch_val_x)].join('')));
} else
{}
cljs.core.swap_BANG_.call(null,this__10119.prefer_table,(function (old){
return cljs.core.assoc.call(null,old,dispatch_val_x,cljs.core.conj.call(null,cljs.core._lookup.call(null,old,dispatch_val_x,cljs.core.PersistentHashSet.EMPTY),dispatch_val_y));
}));
return cljs.core.reset_cache.call(null,this__10119.method_cache,this__10119.method_table,this__10119.cached_hierarchy,this__10119.hierarchy);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods$arity$1 = (function (mf){
var this__10120 = this;
return cljs.core.deref.call(null,this__10120.method_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers$arity$1 = (function (mf){
var this__10121 = this;
return cljs.core.deref.call(null,this__10121.prefer_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch$arity$2 = (function (mf,args){
var this__10122 = this;
return cljs.core.do_dispatch.call(null,mf,this__10122.dispatch_fn,args);
});
cljs.core.MultiFn;
cljs.core.MultiFn.prototype.call = (function() { 
var G__10124__delegate = function (_,args){
var self__10123 = this;
return cljs.core._dispatch.call(null,self__10123,args);
};
var G__10124 = function (_,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__10124__delegate.call(this, _, args);
};
G__10124.cljs$lang$maxFixedArity = 1;
G__10124.cljs$lang$applyTo = (function (arglist__10125){
var _ = cljs.core.first(arglist__10125);
var args = cljs.core.rest(arglist__10125);
return G__10124__delegate(_, args);
});
G__10124.cljs$lang$arity$variadic = G__10124__delegate;
return G__10124;
})()
;
cljs.core.MultiFn.prototype.apply = (function (_,args){
var self__10126 = this;
return cljs.core._dispatch.call(null,self__10126,args);
});
/**
* Removes all of the methods of multimethod.
*/
cljs.core.remove_all_methods = (function remove_all_methods(multifn){
return cljs.core._reset.call(null,multifn);
});
/**
* Removes the method of multimethod associated with dispatch-value.
*/
cljs.core.remove_method = (function remove_method(multifn,dispatch_val){
return cljs.core._remove_method.call(null,multifn,dispatch_val);
});
/**
* Causes the multimethod to prefer matches of dispatch-val-x over dispatch-val-y
* when there is a conflict
*/
cljs.core.prefer_method = (function prefer_method(multifn,dispatch_val_x,dispatch_val_y){
return cljs.core._prefer_method.call(null,multifn,dispatch_val_x,dispatch_val_y);
});
/**
* Given a multimethod, returns a map of dispatch values -> dispatch fns
*/
cljs.core.methods$ = (function methods$(multifn){
return cljs.core._methods.call(null,multifn);
});
/**
* Given a multimethod and a dispatch value, returns the dispatch fn
* that would apply to that value, or nil if none apply and no default
*/
cljs.core.get_method = (function get_method(multifn,dispatch_val){
return cljs.core._get_method.call(null,multifn,dispatch_val);
});
/**
* Given a multimethod, returns a map of preferred value -> set of other values
*/
cljs.core.prefers = (function prefers(multifn){
return cljs.core._prefers.call(null,multifn);
});

goog.provide('cljs.core.UUID');

/**
* @constructor
*/
cljs.core.UUID = (function (uuid){
this.uuid = uuid;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2690646016;
})
cljs.core.UUID.cljs$lang$type = true;
cljs.core.UUID.cljs$lang$ctorPrSeq = (function (this__2385__auto__){
return cljs.core.list.call(null,"cljs.core/UUID");
});
cljs.core.UUID.cljs$lang$ctorPrWriter = (function (this__2385__auto__,writer__2386__auto__){
return cljs.core._write.call(null,writer__2386__auto__,"cljs.core/UUID");
});
cljs.core.UUID.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this__10127 = this;
return goog.string.hashCode(cljs.core.pr_str.call(null,this$));
});
cljs.core.UUID.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (_10129,writer,_){
var this__10128 = this;
return cljs.core._write.call(null,writer,[cljs.core.str("#uuid \""),cljs.core.str(this__10128.uuid),cljs.core.str("\"")].join(''));
});
cljs.core.UUID.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = (function (_10131,_){
var this__10130 = this;
return cljs.core.list.call(null,[cljs.core.str("#uuid \""),cljs.core.str(this__10130.uuid),cljs.core.str("\"")].join(''));
});
cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (_,other){
var this__10132 = this;
var and__3941__auto____10133 = cljs.core.instance_QMARK_.call(null,cljs.core.UUID,other);
if(and__3941__auto____10133)
{return (this__10132.uuid === other.uuid);
} else
{return and__3941__auto____10133;
}
});
cljs.core.UUID.prototype.toString = (function (){
var this__10134 = this;
var this__10135 = this;
return cljs.core.pr_str.call(null,this__10135);
});
cljs.core.UUID;
