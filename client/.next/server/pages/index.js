"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_1__]);\naxios__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// import buildClient from \"../api/build-client\"\n// const LandingPage =  ({ currentUser }) => {\n//   return currentUser ? <h1>You are signed in</h1> : <h1>You are Not signed in</h1>\n// }\n// LandingPage.getInitialProps = async (context) => {\n//   const client = buildClient(context)\n//   const { data } = await client.get('/api/users/currentuser')\n//   return data\n// }\n// export default LandingPage\n\n\nconst LandingPage = ()=>{\n    axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get(\"https://ticketing.dev/api/orders\", {\n        withCredentials: true\n    }).then((res)=>{\n        console.log(res);\n    });\n    axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post(\"https://ticketing.dev/api/users/signin\", {\n        email: \"test@test.com\",\n        password: \"123456\"\n    }, {\n        withCredentials: true\n    }).then((res)=>{\n        console.log(res);\n        axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get(\"https://ticketing.dev/api/orders\", {\n            withCredentials: true\n        }).then((res)=>{\n            console.log(res);\n            axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post(\"https://ticketing.dev/api/users/signout\").then((res)=>{\n                axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get(\"https://ticketing.dev/api/orders\", {\n                    withCredentials: true\n                }).then((res)=>{\n                    console.log(res);\n                });\n            });\n        });\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n        children: \"LandingPage\"\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\zhai\\\\Desktop\\\\实验项目\\\\Ticketing\\\\client\\\\pages\\\\index.js\",\n        lineNumber: 49,\n        columnNumber: 10\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LandingPage);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsZ0RBQWdEO0FBRWhELDhDQUE4QztBQUM5QyxxRkFBcUY7QUFDckYsSUFBSTtBQUVKLHFEQUFxRDtBQUNyRCx3Q0FBd0M7QUFDeEMsZ0VBQWdFO0FBRWhFLGdCQUFnQjtBQUNoQixJQUFJO0FBRUosNkJBQTZCOztBQUVKO0FBRXpCLE1BQU1DLGNBQWMsSUFBTTtJQUV4QkQsaURBQVMsQ0FBQyxvQ0FBb0M7UUFDNUNHLGlCQUFpQixJQUFJO0lBQ3ZCLEdBQUdDLElBQUksQ0FBQ0MsQ0FBQUEsTUFBTztRQUNiQyxRQUFRQyxHQUFHLENBQUNGO0lBQ2Q7SUFFQUwsa0RBQVUsQ0FBQywwQ0FBMEM7UUFDbkRTLE9BQU87UUFDUEMsVUFBVTtJQUNaLEdBQUc7UUFDRFAsaUJBQWlCLElBQUk7SUFDdkIsR0FBR0MsSUFBSSxDQUFDQyxDQUFBQSxNQUFPO1FBQ2JDLFFBQVFDLEdBQUcsQ0FBQ0Y7UUFDWkwsaURBQVMsQ0FBQyxvQ0FBb0M7WUFDNUNHLGlCQUFpQixJQUFJO1FBQ3ZCLEdBQUdDLElBQUksQ0FBQ0MsQ0FBQUEsTUFBTztZQUNiQyxRQUFRQyxHQUFHLENBQUNGO1lBQ1pMLGtEQUFVLENBQUMsMkNBQTJDSSxJQUFJLENBQUNDLENBQUFBLE1BQU87Z0JBQ2hFTCxpREFBUyxDQUFDLG9DQUFvQztvQkFDNUNHLGlCQUFpQixJQUFJO2dCQUN2QixHQUFHQyxJQUFJLENBQUNDLENBQUFBLE1BQU87b0JBQ2JDLFFBQVFDLEdBQUcsQ0FBQ0Y7Z0JBQ2Q7WUFDRjtRQUNGO0lBQ0Y7SUFJQSxxQkFBTyw4REFBQ007a0JBQUc7Ozs7OztBQUNiO0FBRUEsaUVBQWVWLFdBQVdBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9wYWdlcy9pbmRleC5qcz9iZWU3Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBidWlsZENsaWVudCBmcm9tIFwiLi4vYXBpL2J1aWxkLWNsaWVudFwiXHJcblxyXG4vLyBjb25zdCBMYW5kaW5nUGFnZSA9ICAoeyBjdXJyZW50VXNlciB9KSA9PiB7XHJcbi8vICAgcmV0dXJuIGN1cnJlbnRVc2VyID8gPGgxPllvdSBhcmUgc2lnbmVkIGluPC9oMT4gOiA8aDE+WW91IGFyZSBOb3Qgc2lnbmVkIGluPC9oMT5cclxuLy8gfVxyXG5cclxuLy8gTGFuZGluZ1BhZ2UuZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgKGNvbnRleHQpID0+IHtcclxuLy8gICBjb25zdCBjbGllbnQgPSBidWlsZENsaWVudChjb250ZXh0KVxyXG4vLyAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgY2xpZW50LmdldCgnL2FwaS91c2Vycy9jdXJyZW50dXNlcicpXHJcblxyXG4vLyAgIHJldHVybiBkYXRhXHJcbi8vIH1cclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IExhbmRpbmdQYWdlXHJcblxyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXHJcblxyXG5jb25zdCBMYW5kaW5nUGFnZSA9ICgpID0+IHtcclxuXHJcbiAgYXhpb3MuZ2V0KCdodHRwczovL3RpY2tldGluZy5kZXYvYXBpL29yZGVycycsIHtcclxuICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxyXG4gIH0pLnRoZW4ocmVzID0+IHtcclxuICAgIGNvbnNvbGUubG9nKHJlcylcclxuICB9KVxyXG4gIFxyXG4gIGF4aW9zLnBvc3QoJ2h0dHBzOi8vdGlja2V0aW5nLmRldi9hcGkvdXNlcnMvc2lnbmluJywge1xyXG4gICAgZW1haWw6ICd0ZXN0QHRlc3QuY29tJyxcclxuICAgIHBhc3N3b3JkOiAnMTIzNDU2J1xyXG4gIH0sIHtcclxuICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxyXG4gIH0pLnRoZW4ocmVzID0+IHtcclxuICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgIGF4aW9zLmdldCgnaHR0cHM6Ly90aWNrZXRpbmcuZGV2L2FwaS9vcmRlcnMnLCB7XHJcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICBheGlvcy5wb3N0KCdodHRwczovL3RpY2tldGluZy5kZXYvYXBpL3VzZXJzL3NpZ25vdXQnKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgYXhpb3MuZ2V0KCdodHRwczovL3RpY2tldGluZy5kZXYvYXBpL29yZGVycycsIHtcclxuICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICBcclxuXHJcbiAgcmV0dXJuIDxoMT5MYW5kaW5nUGFnZTwvaDE+XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhbmRpbmdQYWdlIl0sIm5hbWVzIjpbImF4aW9zIiwiTGFuZGluZ1BhZ2UiLCJnZXQiLCJ3aXRoQ3JlZGVudGlhbHMiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsInBvc3QiLCJlbWFpbCIsInBhc3N3b3JkIiwiaDEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();