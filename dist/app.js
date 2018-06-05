(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Lezhin"] = factory();
	else
		root["Lezhin"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(29)('wks');
var uid = __webpack_require__(30);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(40);
var toPrimitive = __webpack_require__(41);
var dP = Object.defineProperty;

exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(13)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(21);
var hide = __webpack_require__(7);
var has = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var createDesc = __webpack_require__(14);
module.exports = __webpack_require__(4) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
* 타입 객체
*/
var type = {
    /**
     * 순수 오브젝트 타입 여부를 반환한다.
     */
    isPlainObject: function isPlainObject() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        return v && v.constructor === Object;
    },

    /**
     * 함수 타입 여부를 반환한다.
     */
    isFunction: function isFunction() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        return typeof v === 'function';
    },

    /**
     * null 타입 여부를 반환한다.
     */
    isNull: function isNull(v) {
        return v === null;
    },

    /**
     * 배열 타입 여부를 반환한다.
     */
    isArray: function isArray() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        return Array.isArray(v);
    },

    /**
     * 문자열 타입 여부를 반환한다.
     */
    isString: function isString() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        return typeof v === 'string';
    },

    /**
     * 빈값 여부를 반환한다.
     */
    isEmpty: function isEmpty() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        return v === undefined || v === null || v === false || v === 0 || v === '';
    },

    /**
     * 엘리먼트 노드 여부를 반환한다.
     */
    isElement: function isElement() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        return v && v.nodeType === Node.ELEMENT_NODE;
    }
};

module.exports = type;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(36);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(29)('keys');
var uid = __webpack_require__(30);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(16);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keys = __webpack_require__(65);

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by mohwa on 2018. 4. 21..
 */

var type = __webpack_require__(10);

/**
* 유틸 객체
*/
var util = {
    /**
     * 전달받은 Object/Array 객체를 순회한다.
     */
    map: function map() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};


        if (type.isPlainObject(v)) {
            (0, _keys2.default)(v).map(function (k) {
                return callback(v[k], k);
            });
        } else if (type.isArray(v)) {

            v.map(function (v, index, array) {
                return callback(v, index, array);
            });
        }

        return this;
    },

    /**
     * 전달받은 Object/Array 객체를 얕은 복사한다
     */
    clone: function clone() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


        var ret = null;

        if (type.isPlainObject(v)) {

            ret = {};

            this.map(v, function (vv, k) {
                ret[k] = vv;
            });
        } else if (type.isArray(v)) {

            ret = [];

            this.map(v, function (vv) {
                ret.push(vv);
            });
        }

        return ret;
    },

    /**
     * 전달받은 Object/Array 객체를 깊은 복사한다
     */
    cloneDeep: function cloneDeep() {
        var _this = this;

        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


        var ret = null;

        if (type.isPlainObject(v)) {

            ret = {};

            this.map(v, function (vv, k) {

                if (type.isPlainObject(vv) || type.isArray(vv)) {
                    ret[k] = _this.clone(vv);
                } else {
                    ret[k] = vv;
                }
            });
        } else if (type.isArray(v)) {

            ret = [];

            this.map(v, function (vv) {

                if (type.isPlainObject(vv) || type.isArray(vv)) {
                    ret.push(_this.clone(vv));
                } else {
                    ret.push(vv);
                }
            });
        }

        return ret;
    },

    /**
     * 전달받은 Array 객체를 무작위로 다시 섞는다.
     */
    shuffle: function shuffle() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


        var r = void 0,
            tmp = void 0;

        var length = v.length;

        for (var i = length; --i;) {

            r = Math.floor(Math.random() * i);

            tmp = v[i - 1];
            v[i - 1] = v[r];
            v[r] = tmp;
        }

        return v;
    }
};

module.exports = util;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(39);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toConsumableArray2 = __webpack_require__(42);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var type = __webpack_require__(10);
var util = __webpack_require__(20);

// 엘리먼트 타입
var ELEMENT_NODE = Node.ELEMENT_NODE;

/**
* 돔조작 객체
*/
var domUtil = {

    /**
     * querySelector 래퍼 함수.
     */
    sel: function sel() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

        return el.querySelector(selector);
    },

    /**
     * querySelectorAll 래퍼 함수
     */
    sels: function sels() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

        return el.querySelectorAll(selector);
    },

    /**
     * 새로운 엘리먼트를 생성한다.
     */
    el: function el() {
        var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


        var el = document.createElement(tagName);

        this.prop(el, prop);

        return el;
    },

    /**
     * 전달받은 엘리먼트에 어트리뷰트를 할당한다.
     */
    attr: function attr() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        var _this = this;

        var _attr2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


        var ret = null;

        if (type.isPlainObject(_attr2)) {

            util.map(_attr2, function (v, k) {
                _attr.apply(_this, [target, k, v]);
            });

            ret = target;
        } else if (type.isString(_attr2) && type.isNull(val)) {

            if (this._isStyleMarked(_attr2)) ret = target.style[_attr2.substr(1)];else ret = target.getAttribute(_attr2);
        } else if (type.isString(_attr2)) {
            ret = _attr.apply(this, [target, _attr2, val]);
        }

        return ret;

        /**
         *
         * 어튜리브트를 설정한다.
         *
         * @param target
         * @param k
         * @param v
         * @private
         */
        function _attr(target, k, v) {

            if (this._isStyleMarked(k)) target.style[k.substr(1)] = v;else target.setAttribute(k, v);

            return target;
        }
    },

    /**
     * 전달받은 엘리먼트에 프로퍼티를 할당한다.
     */
    prop: function prop() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        var _this2 = this;

        var _prop2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


        var ret = null;

        if (type.isPlainObject(_prop2)) {

            util.map(_prop2, function (v, k) {
                _prop.apply(_this2, [target, k, v]);
            });

            ret = target;
        } else if (type.isString(_prop2) && type.isNull(val)) {

            if (this._isStyleMarked(_prop2)) {
                // 계산되어 정의된 스타일 정보를 가져온다.
                ret = window.getComputedStyle(target).getPropertyValue(_prop2.substr(1));
            } else {
                ret = target[_prop2];
            }
        } else if (type.isString(_prop2)) {
            ret = _prop.apply(this, [target, _prop2, val]);
        }

        return ret;

        /**
         *
         * 프로퍼티를 설정한다.
         *
         * @param target
         * @param k
         * @param v
         * @private
         */
        function _prop(target, k, v) {

            if (this._isStyleMarked(k)) {
                target.style[k.substr(1)] = v;
            } else {

                // 엘리먼트 속성이 함수인 경우, 네이티브 속성을 원형 그대로 사용한다.(꼭 이벤트만이 아니다)
                if (type.isFunction(target[k])) target[k].apply(target, (0, _toConsumableArray3.default)(type.isArray(v) ? v : [v]));else target[k] = v;
            }

            return target;
        }
    },

    /**
     * 전달받은 부모 엘리먼트의 마지막 자식으로 새로운 엘리먼트를 추가한다.
     */
    append: function append() {
        var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


        el = type.isArray(el) ? el : [el];

        el.forEach(function (v) {
            parent.appendChild(v);
        });

        return this;
    },

    /**
     * 전달받은 부모 엘리먼트의 첫번째 자식으로 새로운 엘리먼트를 추가한다.
     */
    prepend: function prepend() {
        var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


        el = type.isArray(el) ? el : [el];

        // 전달받은 배열 요소를 리버스시킨후, 할당시킨다(사용자에게 전달받은 요소 순서를 그대로 할당시키기위함이다)
        el.reverse().forEach(function (v) {
            parent.insertBefore(v, parent.firstChild);
        });

        return this;
    },

    /**
     * target 엘리먼트의 이전 형제로 새로운 엘리먼트를 추가한다.
     */
    before: function before() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


        el = type.isArray(el) ? el : [el];

        el.reverse().forEach(function (v) {
            target.parentNode.insertBefore(v, target);
        });

        return this;
    },

    /**
     * target 엘리먼트의 다음 형제로 새로운 엘리먼트를 추가한다.
     */
    after: function after() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


        el = type.isArray(el) ? el : [el];

        // 전달받은 target 엘리먼트의, 다음 형제 엘리먼트를 반환한다.
        var next = this.next(target);

        // 반환된 형제 엘리먼트가 있을 경우
        el = next ? el.reverse() : el;

        el.forEach(function (v) {

            // 다음 형제 엘리먼트가 있을 경우, 해당 형제 엘리먼트 이전 위치(target 엘리먼트 다음 위치)에 새로운 엘리먼트를 할당한다.
            if (next) target.parentNode.insertBefore(v, next);else target.parentNode.appendChild(v);
        });

        return this;
    },

    /**
     * 전달받은 엘리먼트를 삭제한다.
     */
    remove: function remove() {
        var _this3 = this;

        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


        if (selector) {

            var elems = this.sels(selector, target);
            elems = this._nodeListToArray(elems);

            elems.forEach(function (v) {

                var parents = _this3.parent(v);

                if (parents.length) parents[0].removeChild(v);
            });
        } else {

            var parents = this.parent(target);
            if (parents.length) parents[0].removeChild(target);
        }

        return this;
    },

    /**
     * 전달받은 엘리먼트의 절대 좌표를 반환한다.
     */
    offset: function offset() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


        // getBoundingClientRect 메서드를 통해, 가져오는 좌표값의 기준은 부모 엘리먼트가 아닌, 절대 좌표가된다.
        return target.getBoundingClientRect();
    },

    /**
     * 전달받은 엘리먼트의 (부모 엘리먼트를 기준으로한)상대 좌표를 반환한다.
     */
    position: function position() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


        var left = 0;
        var top = 0;

        var x = 0;
        var y = 0;

        var parentNode = target.parentNode;

        // 부모 엘리먼트의 position 값이, `static` 이 아닌경우(absolute, relative, fixed 등), 자식 엘리먼트의 좌표는 그 부모 엘리먼트를 기준으로 정해지게된다.
        // 즉 자식 엘리먼트의 offsetTop, offsetLeft 값은 부모 엘리먼트의 상대적 위치를 기준으로 반환된다.

        // 즉 this.offset(target).top - this.offset(parentNode).top <-- 이 공식과 같다.
        if (parentNode === target.offsetParent) {
            x = left = target.offsetLeft;
            y = top = target.offsetTop;
        } else {

            var targetLeft = this.offset(target).left;
            var parentLeft = this.offset(parentNode).left;

            var targetTop = this.offset(target).top;
            var parentTop = this.offset(parentNode).top;

            if (targetLeft > parentLeft) {
                x = left = this.offset(target).left - this.offset(parentNode).left;
            }

            if (targetTop > parentTop) {
                y = top = this.offset(target).top - this.offset(parentNode).top;
            }
        }

        var width = this.outerWidth(target);
        var height = this.outerHeight(target);

        var right = left + width;
        var bottom = top + height;

        return {
            x: x,
            y: y,
            right: right,
            bottom: bottom,
            width: width,
            height: height,
            top: top,
            left: left
        };
    },

    /**
     * target 엘리먼트의 가로 사이즈를 반환한다(padding, border, margin 사이즈가 제외된 값)
     */
    width: function width() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


        var width = parseFloat(this.prop(target, '@width')) || 0;
        var padding = parseFloat(this.prop(target, '@padding-left')) * 2;
        var border = parseFloat(this.prop(target, '@border-width')) * 2;

        return width - (padding + border);
    },

    /**
     * target 엘리먼트의 가로 사이즈를 반환한다(padding, margin 사이즈가 제외된 값)
     */
    innerWidth: function innerWidth() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


        var width = parseFloat(this.prop(target, '@width')) || 0;
        var border = parseFloat(this.prop(target, '@border-width')) * 2;

        return width - border;
    },

    /**
     * target 엘리먼트의 가로 사이즈를 반환한다(기본적으로는 margin 사이즈가 제외된 값)
     *
     * 만약 두 번째 인자값이 true 일 경우, 적용된 margin 값을 포함한다.
     */
    outerWidth: function outerWidth() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var isMargin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


        var width = parseFloat(this.prop(target, '@width')) || 0;
        var margin = parseFloat(this.prop(target, '@margin-left')) * 2;

        var ret = width;

        if (isMargin) ret += margin;

        return ret;
    },

    /**
     * target 엘리먼트의 가로 사이즈를 반환한다(padding, border, margin 사이즈가 제외된 값)
     */
    height: function height() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


        var height = parseFloat(this.prop(target, '@height')) || 0;
        var padding = parseFloat(this.prop(target, '@padding-top')) * 2;
        var border = parseFloat(this.prop(target, '@border-width')) * 2;

        return height - (padding + border);
    },

    /**
     * target 엘리먼트의 가로 사이즈를 반환한다(padding, margin 사이즈가 제외된 값)
     */
    innerHeight: function innerHeight() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


        var height = parseFloat(this.prop(target, '@height')) || 0;
        var border = parseFloat(this.prop(target, '@border-width')) * 2;

        return height - border;
    },

    /**
     * target 엘리먼트의 가로 사이즈를 반환한다(기본적으로는 margin 사이즈가 제외된 값)
     *
     * 만약 두 번째 인자값이 true 일 경우, 적용된 margin 값을 포함한다.
     */
    outerHeight: function outerHeight() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var isMargin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


        var height = parseFloat(this.prop(target, '@height')) || 0;
        var margin = parseFloat(this.prop(target, '@margin-top')) * 2;

        var ret = height;

        if (isMargin) ret += margin;

        return ret;
    },

    /**
     * target 엘리먼트의, 다음 형제 엘리먼트를 반환한다.
     * https://developer.mozilla.org/ko/docs/Web/API/Node/nodeType
     */
    next: function next() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


        var next = target && target.nextSibling ? target.nextSibling : null;

        // <p>, <div> 와 같은 `엘리먼트 노드` 타입이 탐색될 경우, 해당 엘리먼트를 반환한다.
        while (next && next.nodeType !== ELEMENT_NODE) {
            next = next.nextSibling;
        }

        return next;
    },

    /**
     * target 엘리먼트의 이전 형제 엘리먼트를 반환한다.
     */
    prev: function prev() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


        var prev = target && target.previousSibling ? target.previousSibling : null;

        // <p>, <div> 와 같은 `엘리먼트 노드` 타입이 탐색될 경우, 해당 엘리먼트를 반환한다.
        while (prev && prev.nodeType !== ELEMENT_NODE) {
            prev = prev.previousSibling;
        }

        return prev;
    },

    /**
     * target 엘리먼트의 모든 부모 엘리먼트를 반환한다.
     */
    parents: function parents() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


        var ret = [];
        var parent = target;

        // selector 값이 일을 경우, 필터할 엘리먼트 목록을 가져온다.
        var all = selector ? this._nodeListToArray(this.sels(selector)) : [];

        while (parent) {

            parent = parent.parentNode;

            // <p>, <div> 와 같은 엘리먼트가 탐색될 경우, 해당 엘리먼트를 반환한다.
            if (parent && parent.nodeType === ELEMENT_NODE) {

                if (selector) all.indexOf(parent) > -1 && ret.push(parent);else ret.push(parent);
            }
        }

        return ret;
    },

    /**
     * target 엘리먼트의 부모 엘리먼트를 반환한다.
     */
    parent: function parent() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


        var ret = [];
        var parent = target;

        // selector 값이 일을 경우, 필터할 엘리먼트 목록을 가져온다.
        var all = selector ? this._nodeListToArray(this.sels(selector)) : [];

        while (parent) {

            parent = parent.parentNode;

            // <p>, <div> 와 같은 엘리먼트가 탐색될 경우, 해당 엘리먼트를 반환한다.
            if (parent && parent.nodeType === ELEMENT_NODE) {

                if (selector) all.indexOf(parent) > -1 && ret.push(parent);else ret.push(parent);

                break;
            }
        }

        return ret;
    },

    /**
     * target 엘리먼트의 모든 자식 엘리먼트를 반환한다.
     */
    children: function children() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


        var ret = [];

        var child = null;
        var children = target && target.childNodes ? this._nodeListToArray(target.childNodes) : [];

        var all = selector ? this._nodeListToArray(this.sels(selector)) : [];

        // 자식 엘리먼트가 존재할때까지
        while (child = children.shift()) {

            // <p>, <div> 와 같은 엘리먼트가 탐색될 경우, 해당 엘리먼트를 반환한다.
            if (child.nodeType === ELEMENT_NODE) {

                if (selector) all.indexOf(child) > -1 && ret.push(child);else ret.push(child);
            }

            var length = child.childNodes ? child.childNodes.length : 0;

            for (var i = 0; i < length; i++) {
                children.push(child.childNodes[i]);
            }
        }

        return ret;
    },

    /**
     * 노드리스트를 Array 객체로 변환한다.
     */
    _nodeListToArray: function _nodeListToArray() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


        var ret = [];

        var length = v.length;

        for (var i = 0; i < length; i++) {
            ret.push(v[i]);
        }

        return ret;
    },

    /**
     * 스타일 속성값 여부를 반환한다.(@ 문자열은, 내부적으로 지정한 플래그)
     */
    _isStyleMarked: function _isStyleMarked() {
        var k = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        // k 문자열의 0번째 문자가 `@`인 경우(style 속성)
        return k && k[0] === '@';
    }
};

module.exports = domUtil;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(52);
var enumBugKeys = __webpack_require__(31);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(53);
var defined = __webpack_require__(16);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(15);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(24) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 30 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(3).f;
var has = __webpack_require__(9);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by mohwa on 2018. 4. 19..
 */

__webpack_require__(34);

module.exports = {
  Tournament: __webpack_require__(35),
  User: __webpack_require__(75)
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var domUtil = __webpack_require__(23);
var util = __webpack_require__(20);
var type = __webpack_require__(10);

var tournamentTemplate = __webpack_require__(69);
var winnerTemplate = __webpack_require__(70);

var Card = __webpack_require__(71);
var CardViewModel = __webpack_require__(73);

var className = {
    "round": "round",
    "cardItem": "card-item",
    "cardItem1": "card-item1",
    "cardItem2": "card-item2",
    "cardInfo": "card-info",
    "stage": "stage",
    "winner": "winner",
    "btnResult": "btn-result",
    "btnPrevRound": "btn-prev-round",
    "history": "history",
    "stadium": "stadium",
    "childInfo": "child-info",
    "userName": "user-name",
    "roundNum": "round-num"
};

var msg = {
    "notEnoughCardData": "전달받은 데이터가 부족합니다.",
    "possibleUnearnedWin": "설정한 라운드 크기는 부전승이 나올 수 있습니다."
};

var text = {
    "lastWinner": "당신의 이상형 입니다.",
    "resultHistory": "결과 보기"
};

/**
 * 토너먼트 클래스
 */

var Tournament = function () {
    function Tournament() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$user = _ref.user,
            user = _ref$user === undefined ? null : _ref$user,
            _ref$roundNum = _ref.roundNum,
            roundNum = _ref$roundNum === undefined ? 16 : _ref$roundNum;

        (0, _classCallCheck3.default)(this, Tournament);


        // 유저 정보
        this._user = user;

        // 전체 라운드
        this._totalRoundNum = roundNum;

        // board 엘리먼트
        this._tournament = null;

        // round 엘리먼트
        this._round = null;

        // 현재 라운드
        this._currentRoundNum = roundNum;

        var cardViewModel = this._cardViewModel = new CardViewModel();

        // 전달받은 라운드가 부전승이 나올 수 있는지 체크한다.
        if (!this._isPossibleUnearnedWin(roundNum)) {
            throw new Error(msg.possibleUnearnedWin);
        }

        // 토너먼트에서 사용될 전체 카드를 가져온 후, 다시 섞는다.
        var cards = cardViewModel.shuffleCards(this._getFullCards());

        // 카드 모델을 초기화 시킨다.
        cards = cardViewModel.initCards(roundNum, cards).getCards();

        // 라운드 전환을 위해 사용되는 현재 진행중인 카드 수
        this._currentCardCount = cards.length;
    }

    /**
     *
     * 토너먼트를 초기화한다.
     */


    (0, _createClass3.default)(Tournament, [{
        key: 'init',
        value: function init() {

            this._render();

            var cards = this._cardViewModel.getCards(this._totalRoundNum);

            this._addCards(cards[0], cards[1]);
            this._addCardEvent();

            return this;
        }

        /**
         *
         * 토너먼트를 화면에 그린다.
         *
         * @private
         */

    }, {
        key: '_render',
        value: function _render() {

            var tournament = this._tournament = domUtil.el('div', { "innerHTML": tournamentTemplate }).firstChild;
            this._round = domUtil.sel('.' + className.round, tournament);

            domUtil.append(document.body, tournament);

            this._setRoundNumText();
            this._setStadiumTitle();
        }

        /**
         *
         * 토너먼트에서 사용될 전체 카드를 반환한다.
         *
         * @returns {*}
         * @private
         */

    }, {
        key: '_getFullCards',
        value: function _getFullCards() {

            var user = this._user;
            var totalRoundNum = this._totalRoundNum;
            var cardViewModel = this._cardViewModel;

            var cards = user.sex === 'male' ? cardViewModel.getFemaleCards() : cardViewModel.getMaleCards();

            // 카드 데이터가, 설정된 라운드 수보다 작을 경우
            if (cards.length < totalRoundNum) {
                throw new Error(msg.notEnoughCardData);
            }

            return cards.slice(0, totalRoundNum);
        }

        /**
         * 이상형 카드를 화면에 표시한다.
         *
         * @param cardItem1
         * @param cardItem2
         * @private
         */

    }, {
        key: '_addCards',
        value: function _addCards() {
            var cardItem1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var cardItem2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


            var tournament = this._tournament;

            var cardItem1Elem = domUtil.sel('.' + className.cardItem1, tournament);
            var cardItem2Elem = domUtil.sel('.' + className.cardItem2, tournament);

            // 아이템 정보를 엘리먼트에 추가시킨다.
            cardItem1Elem.cardItem = cardItem1;
            cardItem2Elem.cardItem = cardItem2;

            // 이상형 카드를 생성한다.
            new Card(cardItem1).render(cardItem1Elem);
            new Card(cardItem2).render(cardItem2Elem);
        }

        /**
         *
         * 이상형 카드에 이벤트를 추가시킨다.
         *
         * @private
         */

    }, {
        key: '_addCardEvent',
        value: function _addCardEvent() {

            var tournament = this._tournament;
            var cardViewModel = this._cardViewModel;

            var cardItem1Elem = domUtil.sel('.' + className.cardItem1, tournament);
            var cardItem2Elem = domUtil.sel('.' + className.cardItem2, tournament);

            // 이벤트 바인딩
            domUtil.prop(cardItem1Elem, 'addEventListener', ['click', _click.bind(this)]);
            domUtil.prop(cardItem2Elem, 'addEventListener', ['click', _click.bind(this)]);

            function _click(e) {

                var elem = e.target;

                var selectedCardElem = domUtil.parents(elem, '.' + className.cardItem)[0];

                // 첫번째 카드 아이템
                var card1Item = cardItem1Elem.cardItem;

                // 두번째 카드 아이템
                var card2Item = cardItem2Elem.cardItem;

                // 선택된 카드 아이템
                var selectedCardItem = selectedCardElem.cardItem;

                // 현재 라운드 수
                var currentRoundNum = this._currentRoundNum;
                // 다음 라운드 수
                var nextRoundNum = currentRoundNum / 2;

                var cards = [];

                // 저장된 카드 아이템 목록에서, 선택된 카드 아이템을 가져온다.
                var storedCard2Item = cardViewModel.getCards(currentRoundNum, card2Item.id);

                // 선택된 카드 아이템이, 이미 진행이 완료되었을 경우
                if (storedCard2Item.completed) {

                    // 마지막 카드 데이터의 인덱스 번호
                    var lastCardSequence = -1;

                    // 진행중인 카드 수가, 다음 라운드 수와 같을 경우(라운드 전환 시점)
                    if (nextRoundNum === --this._currentCardCount) {

                        currentRoundNum = this._currentRoundNum = this._currentCardCount;

                        this._setRoundNumText();
                        this._createPrevRoundButton();
                    } else {
                        lastCardSequence = storedCard2Item.sequence;
                    }

                    cards = cardViewModel.getCards(currentRoundNum);

                    // 다음 이상형 카드들을 화면에 추가시킨다.
                    this._addCards(cards[++lastCardSequence], cards[++lastCardSequence]);
                } else {

                    // 진행된 카드 아이템을, 모델에 추가시킨다.
                    cardViewModel.addCards(currentRoundNum, selectedCardItem, [card1Item, card2Item]);

                    --this._currentCardCount;

                    if (currentRoundNum > 2) {

                        // 진행중인 카드 수가, 다음 라운드 수와 같을 경우(라운드 전환 시점)
                        if (nextRoundNum === this._currentCardCount) {

                            // 현재 나머지 카드 수가 다음 강이 된다.
                            currentRoundNum = this._currentRoundNum = this._currentCardCount;

                            // 다음 라운드에서 사용할 카드들을 다시 섞기 및 초기 시퀀스 번호도 할당한다.(섞인 카드로 카드 모델이 다시 반영된다)
                            // 조건 "강 전환 시 이상형의 순서는 랜덤으로 섞인다."
                            cardViewModel.shuffleCards(cardViewModel.getCards());
                            this._setRoundNumText();
                        }

                        cards = cardViewModel.getCards(currentRoundNum);

                        var completedCardCount = cardViewModel.completedCardCount(currentRoundNum);

                        // 새로운 카드를 추가한다.
                        this._addCards(cards[completedCardCount], cards[++completedCardCount]);
                        this._createPrevRoundButton();
                    } else {

                        // 라운드를 변경시킨다.
                        this._currentRoundNum = 1;

                        domUtil.prop(this._round, 'innerText', text.lastWinner);

                        // winner 템플릿을 생성한다.
                        this._createWinnerTemplate(selectedCardItem);
                    }
                }
            }
        }
        /**
         *
         * 타이틀 정보를 화면에 표시한다.
         *
         * @private
         */

    }, {
        key: '_setStadiumTitle',
        value: function _setStadiumTitle() {

            var tournament = this._tournament;
            var user = this._user;
            var userName = domUtil.sel('.' + className.userName, tournament);

            domUtil.prop(userName, { innerText: user.name });
        }

        /**
         *
         * 현재 라운드 정보를 화면에 표시한다.
         *
         * @private
         */

    }, {
        key: '_setRoundNumText',
        value: function _setRoundNumText() {
            domUtil.prop(this._round, { innerText: this._currentRoundNum + '\uAC15' });
        }

        /**
         *
         * 이전 라운드로 돌아가는 버튼을 생성한다.
         *
         * @private
         */

    }, {
        key: '_createPrevRoundButton',
        value: function _createPrevRoundButton() {

            var tournament = this._tournament;
            var btnPrevRound = domUtil.sel('.' + className.btnPrevRound, tournament);
            var button = domUtil.sel('button', btnPrevRound);

            var currentRoundNum = this._currentRoundNum;
            var prevRoundNum = currentRoundNum * 2;
            var totalRoundNum = this._totalRoundNum;

            // 진행중인 라운드에 완료된 카드가 존재할 경우
            var hasCompletedCard = this._hasCompletedCard(currentRoundNum);

            // 진행중인 라운드가 전체 라운드 수보다 작으면서, 완료된 카드가 존재할 경우
            if (currentRoundNum < totalRoundNum && hasCompletedCard) {

                domUtil.prop(btnPrevRound, '@display', 'block');

                btnPrevRound.onclick = _returnPrevRound.bind(this);
            } else {
                domUtil.prop(btnPrevRound, '@display', 'none');
            }

            domUtil.prop(button, 'innerText', prevRoundNum + '\uAC15\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30');

            /**
             *
             * 이전 라운드로 돌아간다.
             *
             * @param e
             * @private
             */
            function _returnPrevRound(e) {

                // 이전 라운드
                var prevRoundNum = this._currentRoundNum * 2;

                if (prevRoundNum <= totalRoundNum) {

                    // 현재 라운드 및 진행중인 카드 수를 초기화 시킨다.
                    this._currentRoundNum = prevRoundNum;
                    this._currentCardCount = prevRoundNum;

                    var cards = this._cardViewModel.getCards(prevRoundNum);

                    // 이전 라운드의 첫번째, 두번째 카드로 초기화시킨다.
                    this._addCards(cards[0], cards[1]);
                    this._setRoundNumText();

                    domUtil.prop(button, 'innerText', prevRoundNum * 2 + '\uAC15\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30');

                    if (prevRoundNum === totalRoundNum) {
                        domUtil.prop(btnPrevRound, '@display', 'none');
                    }
                }
            }
        }
        /**
         *
         * 최종 우승자 템플릿을 생성한다.
         *
         * @param cardItem
         * @private
         */

    }, {
        key: '_createWinnerTemplate',
        value: function _createWinnerTemplate() {
            var _this = this;

            var cardItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


            var tournament = this._tournament;
            var selectedCards = this._cardViewModel.getCards();

            var stage = domUtil.sel('.' + className.stage, tournament);

            domUtil.prop(stage, 'innerHTML', winnerTemplate);

            new Card(cardItem).render(domUtil.sel('.' + className.winner, stage));

            domUtil.sel('button', stage).onclick = function (e) {
                _this._createHistoryTemplate(selectedCards);
            };
        }

        /**
         *
         * 히스토리(진행 결과) 템플릿을 생성한다.
         *
         * @param cards
         * @private
         */

    }, {
        key: '_createHistoryTemplate',
        value: function _createHistoryTemplate() {
            var cards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


            var tournament = this._tournament;
            var totalRoundNum = this._totalRoundNum;

            var stadium = domUtil.sel('.' + className.stadium, tournament);
            var stage = domUtil.sel('.' + className.stage, stadium);
            var btnPrevRound = domUtil.sel('.' + className.btnPrevRound, stadium);

            // 엘리먼트를 삭제한다.
            domUtil.remove(stage);
            domUtil.remove(btnPrevRound);

            domUtil.prop(this._round, 'innerText', text.resultHistory);

            var html = this._getTournamentBracketHTML(cards);
            html = '<div class="' + className.history + '">' + html.join('') + '</div>';

            domUtil.append(stadium, domUtil.el('div', { 'innerHTML': html }).firstChild);

            var history = domUtil.sel('.' + className.history, stadium);
            var childInfo = domUtil.sel('.' + className.childInfo, history);
            var historyMinWidth = domUtil.outerWidth(childInfo, true) * totalRoundNum;

            // 뷰포트 가로 사이즈가, 히스토리 가로 사이즈보다 작을 경우
            if (window.innerWidth > historyMinWidth) {
                domUtil.prop(history, 'style', 'min-width:' + historyMinWidth + 'px;');
            } else {

                // 축소할 퍼센트를 구한다.
                var zoomPercent = parseInt((window.innerWidth - 1) / historyMinWidth * 100);

                console.log(parseInt(historyMinWidth * (zoomPercent / 100)));
                domUtil.prop(history, 'style', 'zoom:' + zoomPercent + '%');
            }
        }
        /**
         *
         * 히스토리(진행 결과)를 생성한다.
         *
         * @param cards
         * @param ret
         * @returns {*}
         * @private
         */

    }, {
        key: '_getTournamentBracketHTML',
        value: function _getTournamentBracketHTML() {
            var _this2 = this;

            var cards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var ret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


            ret = ret || [];

            cards.forEach(function (v) {

                var photo = v.photo;
                var name = v.name;

                if (v.children.length) {

                    ret.push('<div class="parent">');
                    ret.push('<div class="parent-info">');
                    ret.push('<img src="' + photo + '" />');
                    ret.push('<div class="card-name">' + name + '</div>');
                    ret.push('</div>');
                    ret.push('<div class="line1"></div>');
                    ret.push('<div class="line2"></div>');

                    ret.push('<div class="child">');
                    ret.push(_this2._getTournamentBracketHTML(v.children, ret));
                    ret.push('</div>');
                    ret.push('</div>');
                } else {

                    ret.push('<div class="child-info">');
                    ret.push('<img src="' + photo + '" />');
                    ret.push('<div class="card-name">' + name + '</div>');
                    ret.push('</div>');
                }
            });

            return ret;
        }

        /**
         *
         * 전달받은 라운드에 완료된 카드가 존재하는지 유무를 반환한다.
         *
         * @param roundNum
         * @returns {boolean}
         * @private
         */

    }, {
        key: '_hasCompletedCard',
        value: function _hasCompletedCard() {
            var roundNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            return this._cardViewModel.completedCardCount(roundNum) ? true : false;
        }

        /**
         *
         * 전달받은 라운드로 부전승이 나올 수 있는지 여부를 반환한다.
         *
         * @param roundNum
         * @returns {boolean}
         * @private
         */

    }, {
        key: '_isPossibleUnearnedWin',
        value: function _isPossibleUnearnedWin() {
            var roundNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;


            var i = roundNum;
            var ret = true;

            while (i > 1) {

                if (i % 2) {
                    ret = false;
                    break;
                }

                i = parseInt(i / 2);
            }

            return ret;
        }
    }]);
    return Tournament;
}();

module.exports = Tournament;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(37), __esModule: true };

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(4), 'Object', { defineProperty: __webpack_require__(3).f });


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(4) && !__webpack_require__(13)(function () {
  return Object.defineProperty(__webpack_require__(22)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(12);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(43);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45);
__webpack_require__(58);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(46)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(47)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(15);
var defined = __webpack_require__(16);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(24);
var $export = __webpack_require__(6);
var redefine = __webpack_require__(48);
var hide = __webpack_require__(7);
var Iterators = __webpack_require__(17);
var $iterCreate = __webpack_require__(49);
var setToStringTag = __webpack_require__(32);
var getPrototypeOf = __webpack_require__(57);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(50);
var descriptor = __webpack_require__(14);
var setToStringTag = __webpack_require__(32);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(8);
var dPs = __webpack_require__(51);
var enumBugKeys = __webpack_require__(31);
var IE_PROTO = __webpack_require__(18)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(22)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(56).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var anObject = __webpack_require__(8);
var getKeys = __webpack_require__(25);

module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIObject = __webpack_require__(26);
var arrayIndexOf = __webpack_require__(54)(false);
var IE_PROTO = __webpack_require__(18)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(27);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(26);
var toLength = __webpack_require__(28);
var toAbsoluteIndex = __webpack_require__(55);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(15);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(9);
var toObject = __webpack_require__(19);
var IE_PROTO = __webpack_require__(18)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(21);
var $export = __webpack_require__(6);
var toObject = __webpack_require__(19);
var call = __webpack_require__(59);
var isArrayIter = __webpack_require__(60);
var toLength = __webpack_require__(28);
var createProperty = __webpack_require__(61);
var getIterFn = __webpack_require__(62);

$export($export.S + $export.F * !__webpack_require__(64)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(8);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(17);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(3);
var createDesc = __webpack_require__(14);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(63);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(17);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(27);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(67);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(19);
var $keys = __webpack_require__(25);

__webpack_require__(68)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(6);
var core = __webpack_require__(0);
var fails = __webpack_require__(13);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = "<div class=\"tournament\">\n\t<div class=\"stadium\">\n\t\t<div class=\"title\">\n\t\t\t<span class=\"user-name\"></span>님의 \"이상형\" 누구인가요?\n\t\t</div>\n\t\t<div class=\"round\"></div>\n\t\t<div class=\"stage\">\n\t\t\t<div class=\"card-item card-item1\"></div>\n\t\t\t<div class=\"versus\">VS</div>\n\t\t\t<div class=\"card-item card-item2\"></div>\n\t\t</div>\n\t\t<div class=\"btn-prev-round\">\n\t\t\t<button></button>\n\t\t</div>\n\t</div>\n</div>";

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = "<div>\n\t<div class=\"winner\"></div>\n\t<div class=\"btn-result\">\n\t\t<button>결과 보기</button>\n\t</div>\n</div>";

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by mohwa on 2018. 5. 29..
 */

var domUtil = __webpack_require__(23);

var cardTemplate = __webpack_require__(72);

var className = {
    "cardName": "card-name"
};

/**
 * Card 클래스
 */

var Card = function () {
    function Card() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$id = _ref.id,
            id = _ref$id === undefined ? '' : _ref$id,
            _ref$name = _ref.name,
            name = _ref$name === undefined ? '' : _ref$name,
            _ref$age = _ref.age,
            age = _ref$age === undefined ? 0 : _ref$age,
            _ref$photo = _ref.photo,
            photo = _ref$photo === undefined ? '' : _ref$photo;

        (0, _classCallCheck3.default)(this, Card);


        this.id = id;
        this.name = name;
        this.age = age;
        this.photo = photo;
    }

    /**
     *
     * 카드를 화면에 그린다.
     *
     * @param elem
     * @returns {Card}
     */


    (0, _createClass3.default)(Card, [{
        key: 'render',
        value: function render() {
            var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


            var id = this.id;
            var name = this.name;
            var age = this.age;
            var photo = this.photo;

            var div = domUtil.el('div', { innerHTML: cardTemplate });

            var cardInfo = div.firstChild;
            var img = domUtil.sel('img', cardInfo);
            var cardName = domUtil.sel('.' + className.cardName, cardInfo);
            var cardNameText = name + '(' + age + ')';

            domUtil.attr(cardInfo, 'title', cardNameText);

            domUtil.attr(img, {
                "src": photo,
                "alt": name + ' \uC0AC\uC9C4 \uC785\uB2C8\uB2E4.'
            });

            domUtil.prop(cardName, 'innerText', cardNameText);

            domUtil.prop(elem, 'innerHTML', domUtil.prop(div, 'innerHTML'));

            return this;
        }
    }]);
    return Card;
}();

module.exports = Card;

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = "<div class=\"card-info\">\n\t<a href=\"#\" onclick=\"return false\">\n\t\t<img />\n\t\t<div class=\"card-name\"></div>\n\t</a>\n</div>\n";

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = __webpack_require__(20);
var type = __webpack_require__(10);

// 카드 데이터
var data = __webpack_require__(74);

/**
 * CardViewModel 클래스
 */

var CardViewModel = function () {
    function CardViewModel() {
        (0, _classCallCheck3.default)(this, CardViewModel);

        this.selectedCards = [];
    }
    /**
     *
     * 성별이 남자인 카드 아이템 집합을 반환한다.
     *
     * @returns {Array}
     */


    (0, _createClass3.default)(CardViewModel, [{
        key: 'getMaleCards',
        value: function getMaleCards() {

            var ret = [];

            util.map(data, function (v) {
                if (v.sex === 'male') {
                    ret.push(v);
                }
            });

            return ret;
        }

        /**
         *
         * 성별이 여자인 카드 아이템 집합을 반환한다.
         *
         * @returns {Array}
         */

    }, {
        key: 'getFemaleCards',
        value: function getFemaleCards() {

            var ret = [];

            util.map(data, function (v) {
                if (v.sex === 'female') {
                    ret.push(v);
                }
            });

            return ret;
        }

        /**
         *
         * 카드 아이템 집합을 초기화한다.
         *
         * @param roundNum
         * @param children
         * @returns {CardViewModel}
         */

    }, {
        key: 'initCards',
        value: function initCards() {
            var _this = this;

            var roundNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


            children = util.cloneDeep(children);

            util.map(children, function (v) {

                v.roundNum = roundNum;

                v.parent = null;
                v.children = [];

                v.completed = false;

                _this.selectedCards.push(v);
            });

            return this;
        }

        /**
         *
         * 전달받은 라운드에, (부모/자식)카드 아이템들을 추가한다.
         *
         * @param roundNum
         * @param parent
         * @param children
         * @returns {CardViewModel}
         */

    }, {
        key: 'addCards',
        value: function addCards() {
            var roundNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


            parent = util.cloneDeep(parent);
            children = util.cloneDeep(children);

            var selectedCards = this.selectedCards;

            // 다음 라운드
            var nextRoundNum = roundNum / 2;

            parent.roundNum = nextRoundNum;
            parent.children = [];

            selectedCards.push(parent);

            // 저장된 카드를, (부모 노드를 통한)계층형 구조로 다시 정리한다.
            util.map(children, function (v) {

                util.map(selectedCards, function (vv, idx) {

                    // 저장된 라운드와 아이디 정보가 동일한 경우
                    if (v.roundNum === vv.roundNum && v.id === vv.id) {

                        selectedCards.splice(idx, 1);

                        vv.parent = parent;
                        vv.completed = true;

                        parent.children.push(vv);
                    }
                });
            });

            return this;
        }

        /**
         *
         * 전달받은 라운드의 카드 아이템을 반환한다.
         *
         * @param roundNum
         * @param cardId
         * @returns {Array}
         */

    }, {
        key: 'getCards',
        value: function getCards() {
            var roundNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var cardId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


            var ret = [];

            var stack = util.cloneDeep(this.selectedCards);
            var card = null;

            if (!type.isEmpty(roundNum)) {

                // 카드 아이디를 전달받았을 경우
                var hasCardId = !type.isEmpty(cardId);

                while (card = stack.shift()) {

                    if (hasCardId) {

                        if (roundNum === card.roundNum && cardId == card.id) {
                            ret = card;
                            break;
                        }
                    } else {
                        if (roundNum === card.roundNum) {
                            ret[card.sequence] = card;
                        }
                    }

                    var length = card.children && card.children.length ? card.children.length : 0;

                    for (var i = 0; i < length; i++) {
                        stack.push(card.children[i]);
                    }
                }
            } else {
                ret = this.selectedCards;
            }

            return ret;
        }

        /**
         *
         * 전달받은 카드들을 섞은 후, 시퀀스 정보를 추가시킨다.
         *
         * @param cards
         * @returns {*}
         */

    }, {
        key: 'shuffleCards',
        value: function shuffleCards() {
            var cards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


            var ret = util.clone(util.shuffle(cards));

            var length = ret.length;

            // 데이터가 새롭게 가공된 이후(계층 구조), 라운드별로 정렬하기위해 미리 "sequence" 속성(배열이 갖는 초기 인덱스 번호)을 추가시켜놓는다.
            for (var i = 0; i < length; i++) {
                ret[i].sequence = i;
            }

            return ret;
        }
        /**
         *
         * 전달받은 라운드에서 선택된 카드 수를 반환한다.
         *
         * @param roundNum
         * @returns {number}
         */

    }, {
        key: 'completedCardCount',
        value: function completedCardCount() {
            var roundNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;


            var ret = 0;

            var stack = util.cloneDeep(this.selectedCards);
            var card = null;

            while (card = stack.shift()) {

                if (roundNum === card.roundNum && card.completed) {
                    ++ret;
                }

                var length = card.children && card.children.length ? card.children.length : 0;

                for (var i = 0; i < length; i++) {
                    stack.push(card.children[i]);
                }
            }

            return ret;
        }
    }]);
    return CardViewModel;
}();

module.exports = CardViewModel;

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = [{"id":"1","name":"최지연","age":28,"sex":"female","photo":"http://cfile29.uf.tistory.com/image/2623B0385409202F2BD8A7"},{"id":"2","name":"임수정","age":35,"sex":"female","photo":"http://cfile24.uf.tistory.com/image/2607113C5409203110A10D"},{"id":"3","name":"소희","age":27,"sex":"female","photo":"http://img.etoday.co.kr/pto_db/2017/08/20170810084001_1110719_468_592.JPG"},{"id":"4","name":"박소담","age":22,"sex":"female","photo":"http://img.etoday.co.kr/pto_db/2017/08/20170810084102_1110722_475_551.JPG"},{"id":"5","name":"슬기","age":24,"sex":"female","photo":"http://img.etoday.co.kr/pto_db/2017/08/20170810084141_1110724_575_576.JPG"},{"id":"6","name":"김고은","age":25,"sex":"female","photo":"http://img.etoday.co.kr/pto_db/2017/08/20170810084228_1110728_467_556.JPG"},{"id":"7","name":"한예리","age":30,"sex":"female","photo":"http://img.etoday.co.kr/pto_db/2017/08/20170810084319_1110731_586_530.JPG"},{"id":"8","name":"이솜","age":28,"sex":"female","photo":"http://img.etoday.co.kr/pto_db/2017/08/20170810084513_1110736_502_572.JPG"},{"id":"9","name":"쯔위","age":21,"sex":"female","photo":"http://img.gqkorea.co.kr/gq/2016/04/style_570624a2751a6.jpg"},{"id":"10","name":"신민아","age":37,"sex":"female","photo":"http://cfile23.uf.tistory.com/image/23639F3A50EE76AD289F67"},{"id":"11","name":"제시카","age":32,"sex":"female","photo":"http://cfile9.uf.tistory.com/image/2008793A50EE76AE0FFFCF"},{"id":"12","name":"한예슬","age":37,"sex":"female","photo":"http://cfile24.uf.tistory.com/image/1544B63850EE76AF0A0ABF"},{"id":"13","name":"유진","age":39,"sex":"female","photo":"http://cfile4.uf.tistory.com/image/141EC83850EE76B02BA34A"},{"id":"14","name":"김연아","age":28,"sex":"female","photo":"http://i.imgur.com/m0ydh8p.jpg"},{"id":"15","name":"송혜교","age":32,"sex":"female","photo":"http://i.imgur.com/dsUJWBh.jpg"},{"id":"16","name":"이연희","age":28,"sex":"female","photo":"http://imgnews.naver.net/image/008/2014/05/21/2014052116424515755_1_99_20140521192703.jpg"},{"id":"17","name":"정우성","age":45,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20151116_190/wnqkfkrlds_1447647439412giCAY_JPEG/20150414101649_rIdo4cxZ_jeongwsng.jpg?type=w2"},{"id":"18","name":"송중기","age":34,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20151116_98/wnqkfkrlds_14476476271101WfXC_JPEG/VLGlv18.jpg?type=w2"},{"id":"19","name":"닉쿤","age":29,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20151116_97/wnqkfkrlds_1447647755196X7w3V_JPEG/1_71.jpg?type=w2"},{"id":"20","name":"소지섭","age":42,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20151116_285/wnqkfkrlds_14476478365045JW2l_JPEG/2011111754707_2011111721581.jpg?type=w2"},{"id":"21","name":"고수","age":40,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20151116_167/wnqkfkrlds_14476480055846yn4W_JPEG/%BB%E7%BA%BB_-_HHHHHHHHH.jpg?type=w2"},{"id":"22","name":"공유","age":41,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20151116_61/wnqkfkrlds_1447648136388yjLIW_JPEG/style_5554844dd8452.jpg?type=w2"},{"id":"23","name":"조인성","age":43,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20151116_65/wnqkfkrlds_1447648266133q9Tlv_JPEG/20130208_1360281107_30510900_1.jpg?type=w2"},{"id":"24","name":"현빈","age":40,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20151116_124/wnqkfkrlds_1447648441671FsasK_JPEG/img_keyvisual.jpg?type=w2"},{"id":"25","name":"강동원","age":40,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20151116_106/wnqkfkrlds_1447648807679gOsDk_JPEG/37488_46270_2049.jpg?type=w2"},{"id":"26","name":"원빈","age":40,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20151116_16/wnqkfkrlds_1447648966214yvXrz_JPEG/d0014374_51a54dd8ccebb.jpg?type=w2"},{"id":"27","name":"지코","age":33,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20160221_238/cindy________1455990567933WVaL8_JPEG/1.jpg?type=w2"},{"id":"28","name":"홍종현","age":32,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20160221_120/cindy________1455990787414QMwEy_JPEG/8.jpg?type=w2"},{"id":"29","name":"류준열","age":27,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20160221_84/cindy________1455991101609MD0Tu_JPEG/20.jpg?type=w2"},{"id":"30","name":"김수현","age":31,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20160221_218/cindy________1455991327708uzyR7_JPEG/30.jpg?type=w2"},{"id":"31","name":"박서준","age":32,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20160221_199/cindy________1455991510519twxPT_JPEG/43.jpg?type=w2"},{"id":"32","name":"유아인","age":30,"sex":"male","photo":"https://mblogthumb-phinf.pstatic.net/20160221_80/cindy________14559921189689MzVE_JPEG/59.jpg?type=w2"}]

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * User 클래스
 */
var User = function User() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$id = _ref.id,
        id = _ref$id === undefined ? 'yanione2@gmail.com' : _ref$id,
        _ref$name = _ref.name,
        name = _ref$name === undefined ? '전성균' : _ref$name,
        _ref$sex = _ref.sex,
        sex = _ref$sex === undefined ? 'male' : _ref$sex;

    (0, _classCallCheck3.default)(this, User);


    this.id = id;
    this.name = name;
    this.sex = sex;
};

module.exports = User;

/***/ })
/******/ ]);
});