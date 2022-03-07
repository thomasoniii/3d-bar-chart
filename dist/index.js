'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React$1 = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default$1 = /*#__PURE__*/_interopDefaultLegacy(React$1);

var deg2rad = function deg2rad(angle) {
  return angle * Math.PI / 180;
};

var h = function h(width, angle) {
  return width * Math.cos(deg2rad(angle));
};
var t = function t(height, angle) {
  return height * Math.tan(deg2rad(angle));
};

var PlaneDataContext = /*#__PURE__*/React$1.createContext({
  rows: 10,
  cols: 10,
  width: 125,
  height: 125,
  angle: 0
});
var usePlaneDataContext = function usePlaneDataContext() {
  return React$1.useContext(PlaneDataContext);
};

var Grid = function Grid() {
  var _usePlaneDataContext = usePlaneDataContext(),
      rows = _usePlaneDataContext.rows,
      cols = _usePlaneDataContext.cols,
      width = _usePlaneDataContext.width,
      height = _usePlaneDataContext.height,
      angle = _usePlaneDataContext.angle,
      transform = _usePlaneDataContext.transform;

  var horizontalLines = [];
  var horizontal = h(width, angle);
  var vertical = t(horizontal, angle);

  for (var y = 1; y < rows; y++) {
    horizontalLines.push( /*#__PURE__*/React__default$1["default"].createElement("line", {
      key: "h".concat(y),
      x1: 0,
      y1: y / rows * height,
      x2: horizontal,
      y2: y / rows * height + vertical,
      className: "grid-line"
    }));
  }

  var verticalLines = [];

  for (var x = 1; x < cols; x++) {
    var xCoord = x / cols * horizontal;
    var vOffset = t(xCoord, angle);
    horizontalLines.push( /*#__PURE__*/React__default$1["default"].createElement("line", {
      key: "v".concat(x),
      x1: xCoord,
      y1: vOffset,
      x2: xCoord,
      y2: vOffset + height,
      className: "grid-line"
    }));
  }

  var box = "\n    M0,0\n    L".concat(horizontal, ",").concat(vertical, "\n    L").concat(horizontal, ",").concat(vertical + height, "\n    L", 0, ", ").concat(height, "\n    Z");
  return /*#__PURE__*/React__default$1["default"].createElement("g", {
    className: "grid-box-group",
    transform: transform
  }, /*#__PURE__*/React__default$1["default"].createElement("path", {
    d: box,
    className: "grid-box"
  }), horizontalLines, verticalLines);
};

var dist = {};

Object.defineProperty(dist, '__esModule', { value: true });

var React = React__default$1["default"];

function _interopDefaultLegacy$1 (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy$1(React);

/*
  This is the meat of the library.
  Set it up in your component like this:

  const SomeReactComponent( { someValue } ) => {

    // make a local copy of the variable that you're going to interpolate.
    const [interpolatedSomeValue, setInterpolatedSomeValue] = useState(someValue);

    // and then actually interpolate it.
    useInterpolate(someValue, setInterpolatedSomeValue)

    // later, when you would have done this:
    // <div width = {someValue}>Some DIV element</div>
    // instead do this:
    <div width={interpolatedSomeValue}>Some DIV element</div>

    // And you are done.
  }

  There is a third argument - an options object which you can pass along:

    getDelta - should be a function which accepts a single object, which contains
      three values - { to, from, percent }
      from is the value at the start of the interpolation
      to is the value at the end of the interpolation
      percent is a float from 0->1 showing how far along the animation we are.
      Pass this arg to change easing speed or animation effects, such as to use
      a quadratic ease function or animate text typing.

    duration - length of the animation in ms

    getHasChanges - a function to determine if there are changes to the values.
      should accept an object with two keys - current and previous
      current is an object with key/value mapping at the end of the interpolation.
      previous is an object with key/value mapping when the interpolation started.

    initial - sometimes you want an interpolation to start from a different value
      than the one initially set on the component when it is first mounted.
      You can pass in a set of initial values to use here.

    loop - repeat the animation from the beginning the specified number of times.
      e.g., 5 repeats 5x, 10 repeats 10x.
      0 is the default where it will not repeat.
      -1 repeats infinite times.

      Again, rememeber, it loops from the beginning.

*/

/*
  The default delta easing. Given percent, from, and to.
  Returns a value between from and to, at a given percentage, with linear easing.

  e.g.,
  animatorDefaultEasing({from : 50, to : 100, percent : .5})
  // returns 75, since it's halfway between 50 and 100.

  You can use this function if it is useful to you, and otherwise provide your own.
*/

var animatorDefaultEasing = function animatorDefaultEasing(_ref) {
  var percent = _ref.percent,
      from = _ref.from,
      to = _ref.to;
  return from + Math.min(1, percent) * (to - from);
};
/*
  By default, if we have no previous values, we have no changes.
  otherwise, if the two objects are not identical, we have changes.
*/

var defaultHasChanges = function defaultHasChanges(current, previous) {
  return previous !== undefined && current !== previous;
};

var useInterpolate = function useInterpolate(current, setter) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$getDelta = _ref2.getDelta,
      getDelta = _ref2$getDelta === void 0 ? animatorDefaultEasing : _ref2$getDelta,
      _ref2$duration = _ref2.duration,
      duration = _ref2$duration === void 0 ? 500 : _ref2$duration,
      _ref2$getHasChanges = _ref2.getHasChanges,
      getHasChanges = _ref2$getHasChanges === void 0 ? defaultHasChanges : _ref2$getHasChanges,
      initial = _ref2.initial,
      _ref2$loop = _ref2.loop,
      loop = _ref2$loop === void 0 ? 0 : _ref2$loop,
      _ref2$onCompleteCallb = _ref2.onCompleteCallback,
      onCompleteCallback = _ref2$onCompleteCallb === void 0 ? function () {} : _ref2$onCompleteCallb;

  // requestAnimationFrame starts ticking as soon as the page is loaded. We'll need
  // to do conversions between absolute page load time vs relative interpolation time.
  var startTime = React.useRef(performance.now()); // keep track of the last set of values at the start of the interpolation, defaulting
  // to the initial values.

  var previous = React.useRef(initial); // keep track of the last frame of animation, in case we want to cancel it.

  var lastFrame = React.useRef({}); // and further key each animation so we won't accidentally re-run something.
  // const renderKey = useRef(1)

  var hasChanges = getHasChanges(current, previous.current); // if we have changes and are re-interpolating AND an animation frame is pending,
  // then cancel it out and set our "last" values to wherever the interpolation had
  // moved us to at that point. Then wipe out our lastFrame.

  if (hasChanges && lastFrame.current.frame) {
    cancelAnimationFrame(lastFrame.current.frame);
    previous.current = lastFrame.current.delta;
    lastFrame.current = {};
  } // we enter the effect when hasChanges has changed.


  React.useEffect(function () {
    // blank out our last startTime, since we'll rewrite it in the animation frame.
    startTime.current = undefined; // keep a ref to our previous values.

    var prevVals = previous.current; // and increment our renderKey.
    // const myKey = renderKey.current++
    // the effect fires if hasChanges has changed. But we don't actually want to
    // fire the animation unless hasChanges is actually true.

    if (hasChanges) {
      // request an animation frame and save it.
      lastFrame.current.frame = requestAnimationFrame(function animate(time) {
        // this is disabled for now for more testing.

        /*
        if (myKey !== renderKey.current) {
          return;
        }
        //*/
        // save the startTime on the first frame if we need to.
        startTime.current = startTime.current || time; // and convert from absolute page time to relative interpolation time.

        time -= startTime.current; // if our current time < duration, we're still interpolating.
        // get newDelta values, call the setter with them, and save them along
        // with requesting a new frame.

        if (time < duration || loop--) {
          // if (time < duration) {
          var newDelta = getDelta({
            from: prevVals,
            to: current,
            percent: time / duration
          });
          setter(function () {
            return newDelta;
          });
          lastFrame.current.delta = newDelta;
          lastFrame.current.frame = requestAnimationFrame(animate);

          if (loop && time >= duration) {
            previous.current = prevVals;
            startTime.current = undefined;
          }
        } else {
          // otherwise, we've the duration. So we just call the setter with our final
          // values, update our previous value, and wipe out the last frame.
          setter(function () {
            return current;
          });
          previous.current = current;
          lastFrame.current = {};
          onCompleteCallback({
            from: prevVals,
            to: current
          });
        }
      });
    } // always save the new current values as the previous ones whenever we enter.


    previous.current = current; // eslint-disable-next-line
  }, [hasChanges]);
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var DEFAULT_DURATION = 500;

/*
  I'm playing around with how I want to structure this code.
  For now, an Animation is identical to an AnimationGroup, except it only accepts
  one component via a render prop instead of a list of children.

  You probably don't want to use this directly and probably want to import Animator
  instead.

  In fact, go look at the more thorough documentation over in Animator.
*/

var ANIMATOR_INITIAL = "animator-initial";

var Animation = function Animation(_ref) {
  var _ref$values = _ref.values,
      values = _ref$values === void 0 ? [] : _ref$values,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? DEFAULT_DURATION : _ref$duration,
      child = _ref.child,
      _ref$easing = _ref.easing,
      easing = _ref$easing === void 0 ? {} : _ref$easing,
      _ref$defaultEasing = _ref.defaultEasing,
      defaultEasing = _ref$defaultEasing === void 0 ? animatorDefaultEasing : _ref$defaultEasing,
      _ref$initial = _ref.initial,
      initial = _ref$initial === void 0 ? {} : _ref$initial,
      _ref$loop = _ref.loop,
      loop = _ref$loop === void 0 ? 0 : _ref$loop,
      onCompleteCallback = _ref.onCompleteCallback;
  // given our values array, look to the child to figure out our current values.
  var current = values.reduce(function (bucket, v) {
    return _objectSpread2(_objectSpread2({}, bucket), {}, _defineProperty({}, v, child.props[v]));
  }, {}); // we're going to build a new initial object

  var fullInitial = {}; // pull out any initial values set on the child

  var childInit = child.props[ANIMATOR_INITIAL] || {}; // now iterate over our values (which is a list of keys)
  // and set the initial value to the child's init value, our component init value, or the
  // child's current prop value.

  values.forEach(function (v) {
    var _ref2, _childInit$v;

    fullInitial[v] = (_ref2 = (_childInit$v = childInit[v]) !== null && _childInit$v !== void 0 ? _childInit$v : initial[v]) !== null && _ref2 !== void 0 ? _ref2 : current[v];
  }); // standard useInterpolate call - save localValues to hand through to the child.

  var _useState = React.useState(fullInitial),
      _useState2 = _slicedToArray(_useState, 2),
      localValues = _useState2[0],
      setLocalValues = _useState2[1];

  useInterpolate(current, setLocalValues, {
    // here we have changes if any key in our current set of values has changed from
    // our last set of values.
    //
    // remember - this is not all props on the child, this is just the props in our
    // values array.
    getHasChanges: function getHasChanges(c, previous) {
      return Boolean(Object.keys(c).find(function (key) {
        return previous && c[key] !== previous[key];
      }));
    },
    duration: duration,
    initial: fullInitial,
    loop: loop,
    // our getDelta function needs to construct a new object with each value interpolated
    // along the way.
    getDelta: function getDelta(_ref3) {
      var percent = _ref3.percent,
          from = _ref3.from,
          to = _ref3.to;
      return Object.keys(to).reduce(function (bucket, v) {
        var easingFunc = easing[v] || defaultEasing;
        var newValue = easingFunc({
          from: from[v],
          to: to[v],
          percent: percent,
          value: v
        });
        return _objectSpread2(_objectSpread2({}, bucket), {}, _defineProperty({}, v, newValue));
      }, {});
    },
    onCompleteCallback: onCompleteCallback
  }); // finally, we're going to clone the child with the new props
  // but toss out the animator-initial value: we don't need it any more and don't
  // want it writing to the DOM.

  return /*#__PURE__*/React__default['default'].cloneElement(child, _objectSpread2(_objectSpread2({}, localValues), {}, _defineProperty({}, ANIMATOR_INITIAL, undefined)));
};

var AnimationGroup = function AnimationGroup(props) {
  var args = _objectSpread2({}, props);

  delete args.children;
  return React__default['default'].Children.map(props.children, function (child) {
    return /*#__PURE__*/React__default['default'].createElement(Animation, Object.assign({}, args, {
      child: child
    }));
  });
};

/*
  I'm playing around with how I want to structure this code.
  For now, just use Animator and it'll work with as many children as you pass it,
  deferring the actual work to an Animation or AnimationGroup component.

  Say you have this element in an SVG graphic:
  <rect x = {0} y = {10} width = {width} height = {10} fill = "blue" />

  And you want to animate that width value, so when you change the value, the bar
  animates to the new size. All you need to do is wrapper it with an Animator.

  <Animator values = {["width"]}>
    <rect x = {x} y = {y} width = {width} height = {10} fill = "blue" />
  </Animator>

  If you want to animate all of those variables:
  <Animator values = {["width", "x", "y"]}>
    <rect x = {x} y = {y} width = {width} height = {10} fill = "blue" />
  </Animator>

  Now if any (or all!) of x, y, or width change, it'll animate to the new position.

  Animator (and the other verions it wrappers) accepts several props:

    values - an array of strings to watch for changes. These props MUST be named
      on the child components for them to be handed through.
    duration - length of the interpolation duration in ms. Defaults to 500
    easing - an object of { [value] : easingFunction }
      the easingFunction is the same as the getDelta function in useInterpolate.
      Accepts an arg of a single object of {from, to, percent}
    defaultEasing - change the default easing used if a specific easing for a given
      value is not provided.
    initial - an object containing { [value] : initialValue } This is optional.
      The initial object is used if you want to start from a different position.

      For example:
        <Animator values = {["x"]}>
          <rect x = {x} y = {0} width = {50} height = {50} />
        </Animator>

      Let's say the first time you mount the component, x = 50. It will draw immediately
      at x ={50} w/o animation.

      initial is used to provide that first transition into the DOM.
        <Animator values = {["x"]} initial = {{x : 0}}>
          <rect x = {x} y = {0} width = {50} height = {50} />
        </Animator>
      This will mount the component with an x value of 0 and then interpolate it until it
      reaches 50.

      This is to keep your data value (which is x = 50) separate from a sugared animation value
      (have it fly in from 0)

    It's possible that child components should animate starting at different positions.
    Animator looks for a prop on its children called `animator-initial`. If present, initial
    values in there will be used.

    The precedence for an intial value is:
      child.animator-initial[value]
      Animator.initial[value]
      child.props[value]

*/

var Animator = function Animator(props) {
  var args = _objectSpread2({
    duration: DEFAULT_DURATION
  }, props);

  return React__default['default'].Children.count(args.children) > 1 ? /*#__PURE__*/React__default['default'].createElement(AnimationGroup, args) : /*#__PURE__*/React__default['default'].createElement(Animation, Object.assign({}, args, {
    child: React__default['default'].Children.only(args.children)
  }));
};

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var _excluded = ["render"];

/*
  very simple component, just around as a reflector. Takes a render prop, then hands
  all props it was given through to that render prop.

  This is useful for cases where you want to provide an interpolated value to a child
  component, but NOT as a prop of that component.

  Or just roll your own flavor of this, I'm not your dad.
*/
var AnimationConsumer = function AnimationConsumer(_ref) {
  var render = _ref.render,
      props = _objectWithoutProperties(_ref, _excluded);

  return render(props);
};

dist.Animation = Animation;
var AnimationConsumer_1 = dist.AnimationConsumer = AnimationConsumer;
dist.AnimationGroup = AnimationGroup;
var Animator_1 = dist.Animator = Animator;
dist.DEFAULT_DURATION = DEFAULT_DURATION;
dist.animatorDefaultEasing = animatorDefaultEasing;
dist.useInterpolate = useInterpolate;

var Plane = function Plane(_ref) {
  var transform = _ref.transform,
      children = _ref.children;
  return /*#__PURE__*/React__default$1["default"].createElement("g", {
    "transform-origin": "center",
    transform: transform,
    className: "plane"
  }, children);
};

var ChartDataContext = /*#__PURE__*/React$1.createContext({});
var useChartDataContext = function useChartDataContext() {
  return React$1.useContext(ChartDataContext);
};

var ChartDataProvider = function ChartDataProvider(_ref) {
  var children = _ref.children,
      data = _ref.data;
  return /*#__PURE__*/React__default$1["default"].createElement(ChartDataContext.Provider, {
    value: data
  }, children);
};

var PlaneDataProvider = function PlaneDataProvider(_ref) {
  var children = _ref.children,
      value = _ref.value;
  return /*#__PURE__*/React__default$1["default"].createElement(PlaneDataContext.Provider, {
    value: value
  }, children);
};

var XPlane = function XPlane(_ref) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === void 0 ? 0 : _ref$offset,
      children = _ref.children;

  var _useChartDataContext = useChartDataContext(),
      chartWidth = _useChartDataContext.chartWidth,
      chartHeight = _useChartDataContext.chartHeight,
      xBoxes = _useChartDataContext.xBoxes,
      yBoxes = _useChartDataContext.yBoxes,
      boxSize = _useChartDataContext.boxSize,
      angle = _useChartDataContext.angle;

  var width = xBoxes * boxSize.xzw;
  var height = yBoxes * boxSize.xyh;
  var calculatedHeightOffset = boxSize.ywzh * offset / 2;
  var calculatedWidthOffset = h(yBoxes * boxSize.ywzh, angle) / yBoxes * offset;
  return /*#__PURE__*/React__default$1["default"].createElement(Plane, {
    transform: "\n        translate(-".concat(calculatedWidthOffset, ",").concat(calculatedHeightOffset, ")\n        translate(").concat(chartWidth / 2, ",0)\n\n      ")
  }, /*#__PURE__*/React__default$1["default"].createElement(PlaneDataProvider, {
    value: {
      rows: yBoxes,
      cols: xBoxes,
      width: width,
      height: height,
      angle: angle,
      transform: "translate(0,".concat(chartHeight / 2 - height, ")")
    }
  }, children));
};

var YPlane = function YPlane(_ref) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === void 0 ? 0 : _ref$offset,
      children = _ref.children;

  var _useChartDataContext = useChartDataContext(),
      chartWidth = _useChartDataContext.chartWidth,
      chartHeight = _useChartDataContext.chartHeight,
      yBoxes = _useChartDataContext.yBoxes,
      zBoxes = _useChartDataContext.zBoxes,
      boxSize = _useChartDataContext.boxSize,
      angle = _useChartDataContext.angle;

  var width = zBoxes * boxSize.ywzh;
  var height = yBoxes * boxSize.xyh;
  var calculatedHeightOffset = boxSize.xzw * offset / 2;
  var calculatedWidthOffset = h(zBoxes * boxSize.xzw, angle) / zBoxes * offset;
  return /*#__PURE__*/React__default$1["default"].createElement(Plane, {
    transform: "\n        translate(".concat(calculatedWidthOffset, ",").concat(calculatedHeightOffset, ")\n        scale(-1,1)\n        translate(").concat(chartWidth / 2, ",0)\n      ")
  }, /*#__PURE__*/React__default$1["default"].createElement(PlaneDataProvider, {
    value: {
      rows: yBoxes,
      cols: zBoxes,
      width: width,
      height: height,
      angle: angle,
      transform: "translate(0,".concat(chartHeight / 2 - height, ")")
    }
  }, children));
};

var ZPlane = function ZPlane(_ref) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === void 0 ? 0 : _ref$offset,
      children = _ref.children;

  var _useChartDataContext = useChartDataContext(),
      chartWidth = _useChartDataContext.chartWidth,
      chartHeight = _useChartDataContext.chartHeight,
      xBoxes = _useChartDataContext.xBoxes,
      zBoxes = _useChartDataContext.zBoxes,
      boxSize = _useChartDataContext.boxSize,
      angle = _useChartDataContext.angle;

  var width = xBoxes * boxSize.xzw;
  var height = zBoxes * boxSize.ywzh;
  var calculatedOffset = boxSize.xyh * offset;
  return /*#__PURE__*/React__default$1["default"].createElement(Plane, {
    transform: "\n        translate(0,-".concat(calculatedOffset, ")\n        rotate(").concat(angle * 2, ")\n        translate(").concat(chartWidth / 2, ",").concat(chartHeight / 2, ")\n      ")
  }, /*#__PURE__*/React__default$1["default"].createElement(PlaneDataProvider, {
    value: {
      rows: zBoxes,
      cols: xBoxes,
      width: width,
      height: height,
      angle: -angle
    }
  }, children));
};

var Box = function Box(_ref) {
  var _ref$x = _ref.x,
      x = _ref$x === void 0 ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? 0 : _ref$y,
      style = _ref.style,
      _ref$flipVertical = _ref.flipVertical,
      flipVertical = _ref$flipVertical === void 0 ? false : _ref$flipVertical,
      measure = _ref.measure;

  var _usePlaneDataContext = usePlaneDataContext(),
      width = _usePlaneDataContext.width,
      height = _usePlaneDataContext.height,
      rows = _usePlaneDataContext.rows,
      cols = _usePlaneDataContext.cols,
      angle = _usePlaneDataContext.angle,
      transform = _usePlaneDataContext.transform;

  var horizontal = h(width, angle);
  var boxWidth = horizontal / cols;
  var boxHeight = height / rows;
  var barHeight = measure ? height * measure : boxHeight;
  var xCoord = x * boxWidth;
  var lvOffset = t(xCoord, angle) - barHeight + boxHeight;
  var vOffset = t(xCoord + boxWidth, angle) - barHeight + boxHeight;
  var yCoord = (flipVertical ? rows - 1 - y : y) * boxHeight;
  var box = "\n    M".concat(xCoord, ",").concat(yCoord + lvOffset, "\n    L").concat(xCoord + boxWidth, ",").concat(yCoord + vOffset, "\n    L").concat(xCoord + boxWidth, ",").concat(yCoord + barHeight + vOffset, "\n    L").concat(xCoord, ", ").concat(yCoord + barHeight + lvOffset, "\n    Z");
  return /*#__PURE__*/React__default$1["default"].createElement("path", {
    d: box,
    style: style,
    className: "box",
    transform: transform
  });
};

var Bar = function Bar(_ref) {
  var box = _ref.box;

  var _useChartDataContext = useChartDataContext(),
      yBoxes = _useChartDataContext.yBoxes;

  var d = 500;
  return /*#__PURE__*/React__default$1["default"].createElement(Animator_1, {
    values: ["measure"],
    initial: {
      measure: 0
    },
    duration: d
  }, /*#__PURE__*/React__default$1["default"].createElement(AnimationConsumer_1, {
    measure: box.height,
    render: function render(_ref2) {
      var m = _ref2.measure;
      return /*#__PURE__*/React__default$1["default"].createElement(React__default$1["default"].Fragment, null, m && /*#__PURE__*/React__default$1["default"].createElement(XPlane, {
        offset: box.z + 1
      }, /*#__PURE__*/React__default$1["default"].createElement(Box, {
        x: box.x,
        y: box.y,
        measure: m,
        style: box.styleX || box.style,
        flipVertical: true
      })), m && /*#__PURE__*/React__default$1["default"].createElement(YPlane, {
        offset: box.x + 1
      }, /*#__PURE__*/React__default$1["default"].createElement(Box, {
        x: box.z,
        y: box.y,
        measure: m,
        style: box.styleY || box.style,
        flipVertical: true
      })), /*#__PURE__*/React__default$1["default"].createElement(ZPlane, {
        offset: m * yBoxes
      }, /*#__PURE__*/React__default$1["default"].createElement(Box, {
        x: box.x,
        y: box.z,
        style: box.styleZ || box.style
      })));
    }
  }));
};

var RightLabel = function RightLabel(_ref) {
  var label = _ref.label,
      index = _ref.index,
      _onMouseOver = _ref.onMouseOver,
      _onMouseOut = _ref.onMouseOut,
      _onClick = _ref.onClick;

  var _useChartDataContext = useChartDataContext(),
      angle = _useChartDataContext.angle,
      xBoxes = _useChartDataContext.xBoxes,
      boxSize = _useChartDataContext.boxSize;

  var xCoord = boxSize.xzw / 2 + boxSize.xzw * index;
  return /*#__PURE__*/React__default$1["default"].createElement("g", {
    transform: "rotate(-".concat(angle * 2, ", ").concat(xCoord, ", 0)")
  }, /*#__PURE__*/React__default$1["default"].createElement("text", {
    x: xBoxes * boxSize.xzw + 5,
    y: 0,
    className: "left-label label",
    textAnchor: "start",
    alignmentBaseline: "middle",
    onMouseOver: function onMouseOver() {
      return _onMouseOver("right", index);
    },
    onMouseOut: function onMouseOut() {
      return _onMouseOut("right", index);
    },
    onClick: function onClick() {
      return _onClick("right", index);
    }
  }, label), /*#__PURE__*/React__default$1["default"].createElement("line", {
    x1: xBoxes * boxSize.ywzh + 5,
    y1: 0,
    x2: xBoxes * boxSize.ywzh,
    y2: 0,
    stroke: "black"
  }));
};
var LeftLabel = function LeftLabel(_ref2) {
  var label = _ref2.label,
      index = _ref2.index,
      _onMouseOver2 = _ref2.onMouseOver,
      _onMouseOut2 = _ref2.onMouseOut,
      _onClick2 = _ref2.onClick;

  var _useChartDataContext2 = useChartDataContext(),
      angle = _useChartDataContext2.angle,
      zBoxes = _useChartDataContext2.zBoxes,
      boxSize = _useChartDataContext2.boxSize;

  var xCoord = boxSize.xzw / 2 + boxSize.xzw * index;
  return /*#__PURE__*/React__default$1["default"].createElement("g", {
    transform: "rotate(-".concat(angle * 2, ", ").concat(xCoord, ", 0)")
  }, /*#__PURE__*/React__default$1["default"].createElement("text", {
    x: -zBoxes * boxSize.ywzh + xCoord - 5,
    y: 0,
    className: "left-label label",
    textAnchor: "end",
    alignmentBaseline: "middle",
    onMouseOver: function onMouseOver() {
      return _onMouseOver2("left", index);
    },
    onMouseOut: function onMouseOut() {
      return _onMouseOut2("right", index);
    },
    onClick: function onClick() {
      return _onClick2("left", index);
    }
  }, label), /*#__PURE__*/React__default$1["default"].createElement("line", {
    x1: -zBoxes * boxSize.ywzh + xCoord - 5,
    y1: 0,
    x2: -zBoxes * boxSize.ywzh + xCoord,
    y2: 0,
    stroke: "black"
  }));
};

var Labels = function Labels(_ref) {
  var labels = _ref.labels,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? "left" : _ref$type,
      _ref$onMouseOver = _ref.onMouseOver,
      onMouseOver = _ref$onMouseOver === void 0 ? function () {} : _ref$onMouseOver,
      _ref$onMouseOut = _ref.onMouseOut,
      onMouseOut = _ref$onMouseOut === void 0 ? function () {} : _ref$onMouseOut,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick;

  var _useChartDataContext = useChartDataContext(),
      angle = _useChartDataContext.angle;

  var typeMultiplier = type === "left" ? -1 : 1;
  var Label = type === "left" ? LeftLabel : RightLabel;
  return /*#__PURE__*/React__default$1["default"].createElement(ZPlane, null, /*#__PURE__*/React__default$1["default"].createElement("g", {
    transform: "rotate(".concat(typeMultiplier * angle, ")")
  }, labels.map(function (label, i) {
    return /*#__PURE__*/React__default$1["default"].createElement(Label, {
      label: label,
      index: i,
      key: i,
      onMouseOver: onMouseOver,
      onMouseOut: onMouseOut,
      onClick: onClick
    });
  })));
};

var CHART_WIDTH = 250;
var CHART_HEIGHT = 250;

var ThreeDBarChart = function ThreeDBarChart(_ref) {
  var _ref$xBoxes = _ref.xBoxes,
      xBoxes = _ref$xBoxes === void 0 ? 10 : _ref$xBoxes,
      _ref$yBoxes = _ref.yBoxes,
      yBoxes = _ref$yBoxes === void 0 ? 10 : _ref$yBoxes,
      _ref$zBoxes = _ref.zBoxes,
      zBoxes = _ref$zBoxes === void 0 ? 10 : _ref$zBoxes,
      boxes = _ref.boxes,
      leftLabels = _ref.leftLabels,
      rightLabels = _ref.rightLabels,
      _ref$boxSize = _ref.boxSize,
      boxSize = _ref$boxSize === void 0 ? {
    xyh: 12.5,
    // CHART_HEIGHT / 20,
    xzw: 12.5,
    // CHART_WIDTH / 20,
    ywzh: 12.5 // CHART_WIDTH / 20

  } : _ref$boxSize,
      onLabelClick = _ref.onLabelClick,
      onLabelMouseOver = _ref.onLabelMouseOver,
      onLabelMouseOut = _ref.onLabelMouseOut;
  var angle = 30;
  var SCALER = 0.8;
  return /*#__PURE__*/React__default$1["default"].createElement("svg", {
    viewBox: "0 0 ".concat(CHART_WIDTH, " ").concat(CHART_HEIGHT),
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      width: "100%",
      height: "100%"
    },
    className: "3d-bar-chart"
  }, /*#__PURE__*/React__default$1["default"].createElement("g", {
    transform: "scale(".concat(SCALER, ") translate(").concat(CHART_WIDTH * (1 - SCALER) - 25, ", ").concat(CHART_HEIGHT * (1 - SCALER) / 2 - 25, ")  ")
  }, /*#__PURE__*/React__default$1["default"].createElement(ChartDataProvider, {
    data: {
      chartWidth: CHART_WIDTH,
      chartHeight: CHART_HEIGHT,
      xBoxes: xBoxes,
      yBoxes: yBoxes,
      zBoxes: zBoxes,
      boxSize: boxSize,
      angle: angle
    }
  }, /*#__PURE__*/React__default$1["default"].createElement(XPlane, null, /*#__PURE__*/React__default$1["default"].createElement(Grid, null)), /*#__PURE__*/React__default$1["default"].createElement(YPlane, {
    offset: 0.0
  }, /*#__PURE__*/React__default$1["default"].createElement(Grid, null)), /*#__PURE__*/React__default$1["default"].createElement(ZPlane, null, /*#__PURE__*/React__default$1["default"].createElement(Grid, null)), boxes.map(function (b, i) {
    return /*#__PURE__*/React__default$1["default"].createElement(Bar, {
      key: i,
      box: b
    });
  }), /*#__PURE__*/React__default$1["default"].createElement(Labels, {
    type: "right",
    labels: rightLabels,
    onMouseOver: onLabelMouseOver,
    onMouseOut: onLabelMouseOut,
    onClick: onLabelClick
  }), /*#__PURE__*/React__default$1["default"].createElement(Labels, {
    type: "left",
    labels: leftLabels,
    onMouseOver: onLabelMouseOver,
    onMouseOut: onLabelMouseOut,
    onClick: onLabelClick
  }))));
};

exports.ThreeDBarChart = ThreeDBarChart;
//# sourceMappingURL=index.js.map
