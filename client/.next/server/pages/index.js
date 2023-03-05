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

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_1__]);\naxios__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// import buildClient from \"../api/build-client\"\n// const LandingPage =  ({ currentUser }) => {\n//   return currentUser ? <h1>You are signed in</h1> : <h1>You are Not signed in</h1>\n// }\n// LandingPage.getInitialProps = async (context) => {\n//   const client = buildClient(context)\n//   const { data } = await client.get('/api/users/currentuser')\n//   return data\n// }\n// export default LandingPage\n\n\nconst LandingPage = ()=>{\n    (0,axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n        method: \"post\",\n        url: \"https://ticketing.dev/api/users/signin\",\n        data: {\n            email: \"test@test.com\",\n            password: \"123456\"\n        },\n        withCredentials: true\n    }).then((res)=>{\n        console.log(res);\n        (0,axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            method: \"get\",\n            url: \"https://ticketing.dev/api/orders\",\n            withCredentials: true\n        }).then((res)=>{\n            console.log(res);\n            (0,axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n                method: \"post\",\n                url: \"https://ticketing.dev/api/users/signout\",\n                withCredentials: true\n            }).then((res)=>{\n                console.log(res);\n                (0,axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n                    method: \"get\",\n                    url: \"https://ticketing.dev/api/orders\",\n                    withCredentials: true\n                }).then((res)=>{\n                    console.log(res);\n                });\n            });\n        });\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n        children: \"LandingPage\"\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\zhai\\\\Desktop\\\\实验项目\\\\Ticketing\\\\client\\\\pages\\\\index.js\",\n        lineNumber: 52,\n        columnNumber: 10\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LandingPage);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsZ0RBQWdEO0FBRWhELDhDQUE4QztBQUM5QyxxRkFBcUY7QUFDckYsSUFBSTtBQUVKLHFEQUFxRDtBQUNyRCx3Q0FBd0M7QUFDeEMsZ0VBQWdFO0FBRWhFLGdCQUFnQjtBQUNoQixJQUFJO0FBRUosNkJBQTZCOztBQUNKO0FBRXpCLE1BQU1DLGNBQWMsSUFBTTtJQUV4QkQsaURBQUtBLENBQUM7UUFDSkUsUUFBUTtRQUNSQyxLQUFLO1FBQ0xDLE1BQU07WUFDSkMsT0FBTztZQUNQQyxVQUFVO1FBQ1o7UUFDQUMsaUJBQWlCLElBQUk7SUFDdkIsR0FBR0MsSUFBSSxDQUFDQyxDQUFBQSxNQUFPO1FBQ2JDLFFBQVFDLEdBQUcsQ0FBQ0Y7UUFDWlQsaURBQUtBLENBQUM7WUFDSkUsUUFBUTtZQUNSQyxLQUFLO1lBQ0xJLGlCQUFpQixJQUFJO1FBQ3ZCLEdBQUdDLElBQUksQ0FBQ0MsQ0FBQUEsTUFBTztZQUNiQyxRQUFRQyxHQUFHLENBQUNGO1lBQ1pULGlEQUFLQSxDQUFDO2dCQUNKRSxRQUFRO2dCQUNSQyxLQUFLO2dCQUNMSSxpQkFBaUIsSUFBSTtZQUN2QixHQUFHQyxJQUFJLENBQUNDLENBQUFBLE1BQU87Z0JBQ2JDLFFBQVFDLEdBQUcsQ0FBQ0Y7Z0JBQ1pULGlEQUFLQSxDQUFDO29CQUNKRSxRQUFRO29CQUNSQyxLQUFLO29CQUNMSSxpQkFBaUIsSUFBSTtnQkFDdkIsR0FBR0MsSUFBSSxDQUFDQyxDQUFBQSxNQUFPO29CQUNiQyxRQUFRQyxHQUFHLENBQUNGO2dCQUNkO1lBQ0Y7UUFDRjtJQUNGO0lBRUEscUJBQU8sOERBQUNHO2tCQUFHOzs7Ozs7QUFDYjtBQUVBLGlFQUFlWCxXQUFXQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vcGFnZXMvaW5kZXguanM/YmVlNyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgYnVpbGRDbGllbnQgZnJvbSBcIi4uL2FwaS9idWlsZC1jbGllbnRcIlxyXG5cclxuLy8gY29uc3QgTGFuZGluZ1BhZ2UgPSAgKHsgY3VycmVudFVzZXIgfSkgPT4ge1xyXG4vLyAgIHJldHVybiBjdXJyZW50VXNlciA/IDxoMT5Zb3UgYXJlIHNpZ25lZCBpbjwvaDE+IDogPGgxPllvdSBhcmUgTm90IHNpZ25lZCBpbjwvaDE+XHJcbi8vIH1cclxuXHJcbi8vIExhbmRpbmdQYWdlLmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIChjb250ZXh0KSA9PiB7XHJcbi8vICAgY29uc3QgY2xpZW50ID0gYnVpbGRDbGllbnQoY29udGV4dClcclxuLy8gICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGNsaWVudC5nZXQoJy9hcGkvdXNlcnMvY3VycmVudHVzZXInKVxyXG5cclxuLy8gICByZXR1cm4gZGF0YVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBMYW5kaW5nUGFnZVxyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXHJcblxyXG5jb25zdCBMYW5kaW5nUGFnZSA9ICgpID0+IHtcclxuXHJcbiAgYXhpb3Moe1xyXG4gICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICB1cmw6ICdodHRwczovL3RpY2tldGluZy5kZXYvYXBpL3VzZXJzL3NpZ25pbicsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGVtYWlsOiAndGVzdEB0ZXN0LmNvbScsXHJcbiAgICAgIHBhc3N3b3JkOiAnMTIzNDU2J1xyXG4gICAgfSxcclxuICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxyXG4gIH0pLnRoZW4ocmVzID0+IHtcclxuICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgIGF4aW9zKHtcclxuICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgdXJsOiAnaHR0cHM6Ly90aWNrZXRpbmcuZGV2L2FwaS9vcmRlcnMnLFxyXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICBheGlvcyh7XHJcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly90aWNrZXRpbmcuZGV2L2FwaS91c2Vycy9zaWdub3V0JyxcclxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcclxuICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICBheGlvcyh7XHJcbiAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly90aWNrZXRpbmcuZGV2L2FwaS9vcmRlcnMnLFxyXG4gICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0pXHJcblxyXG4gIHJldHVybiA8aDE+TGFuZGluZ1BhZ2U8L2gxPlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMYW5kaW5nUGFnZSJdLCJuYW1lcyI6WyJheGlvcyIsIkxhbmRpbmdQYWdlIiwibWV0aG9kIiwidXJsIiwiZGF0YSIsImVtYWlsIiwicGFzc3dvcmQiLCJ3aXRoQ3JlZGVudGlhbHMiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImgxIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n");

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