export const id = 82;
export const ids = [82];
export const modules = {

/***/ 49378:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.declare = declare;
exports.declarePreset = void 0;
const apiPolyfills = {
  assertVersion: api => range => {
    throwVersionError(range, api.version);
  }
};
{
  Object.assign(apiPolyfills, {
    targets: () => () => {
      return {};
    },
    assumption: () => () => {
      return undefined;
    },
    addExternalDependency: () => () => {}
  });
}
function declare(builder) {
  return (api, options, dirname) => {
    var _clonedApi2;
    let clonedApi;
    for (const name of Object.keys(apiPolyfills)) {
      var _clonedApi;
      if (api[name]) continue;
      (_clonedApi = clonedApi) != null ? _clonedApi : clonedApi = copyApiObject(api);
      clonedApi[name] = apiPolyfills[name](clonedApi);
    }
    return builder((_clonedApi2 = clonedApi) != null ? _clonedApi2 : api, options || {}, dirname);
  };
}
const declarePreset = exports.declarePreset = declare;
function copyApiObject(api) {
  let proto = null;
  if (typeof api.version === "string" && /^7\./.test(api.version)) {
    proto = Object.getPrototypeOf(api);
    if (proto && (!hasOwnProperty.call(proto, "version") || !hasOwnProperty.call(proto, "transform") || !hasOwnProperty.call(proto, "template") || !hasOwnProperty.call(proto, "types"))) {
      proto = null;
    }
  }
  return Object.assign({}, proto, api);
}
function throwVersionError(range, version) {
  if (typeof range === "number") {
    if (!Number.isInteger(range)) {
      throw new Error("Expected string or integer value.");
    }
    range = `^${range}.0.0-0`;
  }
  if (typeof range !== "string") {
    throw new Error("Expected string or integer value.");
  }
  const limit = Error.stackTraceLimit;
  if (typeof limit === "number" && limit < 25) {
    Error.stackTraceLimit = 25;
  }
  let err;
  if (version.slice(0, 2) === "7.") {
    err = new Error(`Requires Babel "^7.0.0-beta.41", but was loaded with "${version}". ` + `You'll need to update your @babel/core version.`);
  } else {
    err = new Error(`Requires Babel "${range}", but was loaded with "${version}". ` + `If you are sure you have a compatible version of @babel/core, ` + `it is likely that something in your build process is loading the ` + `wrong version. Inspect the stack trace of this error to look for ` + `the first entry that doesn't mention "@babel/core" or "babel-core" ` + `to see what is calling Babel.`);
  }
  if (typeof limit === "number") {
    Error.stackTraceLimit = limit;
  }
  throw Object.assign(err, {
    code: "BABEL_VERSION_UNSUPPORTED",
    version,
    range
  });
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ 27082:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _helperPluginUtils = __webpack_require__(49378);
var _default = exports["default"] = (0, _helperPluginUtils.declare)((api, {
  deprecatedAssertSyntax
}) => {
  api.assertVersion("^7.22.0 || >8.0.0-alpha <8.0.0-beta");
  if (deprecatedAssertSyntax != null && typeof deprecatedAssertSyntax !== "boolean") {
    throw new Error("'deprecatedAssertSyntax' must be a boolean, if specified.");
  }
  return {
    name: "syntax-import-attributes",
    manipulateOptions({
      parserOpts,
      generatorOpts
    }) {
      var _generatorOpts$import;
      (_generatorOpts$import = generatorOpts.importAttributesKeyword) != null ? _generatorOpts$import : generatorOpts.importAttributesKeyword = "with";
      const importAssertionsPluginIndex = parserOpts.plugins.indexOf("importAssertions");
      if (importAssertionsPluginIndex !== -1) {
        parserOpts.plugins.splice(importAssertionsPluginIndex, 1);
        deprecatedAssertSyntax = true;
      }
      if (deprecatedAssertSyntax) {
        parserOpts.plugins.push("deprecatedImportAssert", ["importAttributes", {
          deprecatedAssertSyntax: true
        }]);
      } else {
        parserOpts.plugins.push("importAttributes");
      }
    }
  };
});

//# sourceMappingURL=index.js.map


/***/ })

};
