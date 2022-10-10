/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Element.js":
/*!************************!*\
  !*** ./src/Element.js ***!
  \************************/
/***/ ((module) => {

eval("//创建虚拟dom 类\r\nclass Element {\r\n    constructor(tagName, props, children) {\r\n        this.tagName = tagName\r\n        this.props = props\r\n        this.children = children\r\n    }\r\n\r\n}\r\n// 设置虚拟dom\r\nfunction createElement(tagName, props, children) {\r\n    return new Element(tagName,props,children)\r\n}\r\n// 渲染成真实节点\r\nfunction render(eleInfo) {\r\n    // 1、渲染\r\n    let el = document.createElement(eleInfo.tagName)\r\n    // 2、渲染完成后设置属性\r\n    // 属性设置  深度优先遍历\r\n    for (let key in eleInfo.props) {\r\n        setInfo(el, key, eleInfo.props[key])\r\n    }\r\n    //设置完父节点后需要设置子节点\r\n    eleInfo.children.forEach(child => {\r\n        // 如果是真实节点 进行递归（让子节点也设置属性），如果不是真实节点创建成真实节点\r\n        let childE = (child instanceof Element)?render(child):document.createTextNode(child)\r\n        // 返回给父节点\r\n        el.appendChild(childE)\r\n    });\r\n    return el\r\n}\r\n// 属性设置实现方法\r\nfunction setInfo(node, attr, value) {\r\n    switch (attr) {\r\n        case 'value':\r\n            if (node.tagName.toUpperCase() == 'INPUT' || node.tagName.toUpperCase() == 'TEXTAREA') {\r\n                node.value = value\r\n            } else {\r\n                node.setAttribute(attr, value)\r\n            }\r\n            break;\r\n        case 'style':\r\n            node.style.cssText = value\r\n            break;\r\n        default:\r\n            node.setAttribute(attr, value)\r\n            break;\r\n    }\r\n}\r\nmodule.exports = {\r\n    createElement,\r\n    render,\r\n    setInfo,\r\n    Element\r\n}\n\n//# sourceURL=webpack://diff/./src/Element.js?");

/***/ }),

/***/ "./src/diff2.js":
/*!**********************!*\
  !*** ./src/diff2.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"diff\": () => (/* binding */ diff)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);\n// 第一个写的有问题，重新梳理了一下\n\nlet patchs = {}\nlet globalIndex = 0\nfunction diff (oldTree, newTree) {\n  walk(oldTree, newTree, globalIndex)\n  return patchs\n}\n\nfunction walk (oldTree, newTree, index) {\n  let currentPatchs = []\n  if (!newTree) {\n    currentPatchs.push({\n      type: \"REMOVE\",\n      index\n    })\n  } else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isString)(oldTree)) {\n    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isString)(newTree) && oldTree !== newTree) {\n      currentPatchs.push({\n        type: \"TEXT\",\n        text: newTree\n      })\n    }\n    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isString)(newTree)) {\n      currentPatchs.push({\n        type: \"REPLACE\",\n        newNode: newTree\n      })\n    }\n  } else if (oldTree.name === newTree.name) {\n    let patchAttrs = diffProps(oldTree.props, newTree.props)\n    if (Object.keys(patchAttrs).length > 0) {\n      currentPatchs.push({\n        type: \"ATTR\",\n        attr: patchAttrs\n      })\n    }\n    diffChildren(oldTree.children, newTree.children)\n    \n  } else {\n    currentPatchs.push({\n      type: \"REPLACE\",\n      newNode: newTree\n    })\n  }\n  if (currentPatchs.length > 0) {\n    patchs[index] = currentPatchs\n  }\n}\nfunction diffProps (oldProps, newProps) {\n  let patchProps = {}\n  for (let key in oldProps) {\n    if (oldProps[key] !== newProps[key]) {\n      patchProps[key] = newProps[key]\n    }\n  }\n  for (let key in newProps) {\n    if (newProps[key] !== oldProps[key]) {\n      patchProps[key] = newProps[key]\n    }\n  }\n  return patchProps\n}\nfunction diffChildren (oldChildrens, newChildrens) {\n  oldChildrens.forEach((child, idx) => {\n    walk(child, newChildrens[idx], ++globalIndex)\n  })\n}\n\n\n//# sourceURL=webpack://diff/./src/diff2.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\r\n    createElement,\r\n    render\r\n} = __webpack_require__(/*! ./Element */ \"./src/Element.js\")\r\n// const {diff}= require('./diff')\r\nconst {diff}= __webpack_require__(/*! ./diff2 */ \"./src/diff2.js\")\r\nconst {patch}= __webpack_require__(/*! ./patch */ \"./src/patch.js\")\r\n//创建对应的虚拟dom\r\nlet virtualDom = createElement('ul', {class: 'list'}, [\r\n    createElement('li', {class: 'item'}, ['a']),\r\n    createElement('li', {class: 'item'}, ['b']),\r\n    createElement('li', {class: 'item'}, ['c']),\r\n    createElement('li', {class: 'item'}, ['d']),\r\n    createElement('input', {value: '12222'}, ['d'])\r\n  ])\r\n  \r\n  let virtualDom2 = createElement('ul', {class: 'lists'}, [\r\n    createElement('li', {class: 'item'}, [\r\n      createElement('div', {class: 'item'}, ['o']),\r\n    ]),\r\n    createElement('li', {class: 'blue'}, ['v']),\r\n    createElement('li', {class: 'item'}, ['9']),\r\n    createElement('p', {}, ['pppppp'])\r\n  ])\r\n//渲染对应的虚拟dom为真实dom\r\nlet el = render(virtualDom);\r\nconsole.log(el)\r\nlet diffNode = document.getElementById(\"diff\")\r\ndiffNode.appendChild(el)\r\n// diff算法\r\nlet pathches = diff(virtualDom,virtualDom2)\r\nconsole.log('补丁包：', pathches)\r\n// 开始打补丁 更新视图\r\npatch(el, pathches)\n\n//# sourceURL=webpack://diff/./src/index.js?");

/***/ }),

/***/ "./src/patch.js":
/*!**********************!*\
  !*** ./src/patch.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"patch\": () => (/* binding */ patch)\n/* harmony export */ });\n/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Element */ \"./src/Element.js\");\n/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Element__WEBPACK_IMPORTED_MODULE_0__);\n \r\n\r\nlet index = 0\r\nlet allPatchs = {}\r\nfunction patch (node,patchs) {\r\n  allPatchs = patchs\r\n  walk(node)\r\n}\r\n\r\nfunction walk(node) {\r\n  let currentPatch = allPatchs[index++]\r\n  let childNodes = node.childNodes\r\n  childNodes.forEach(child => walk(child))\r\n  if (currentPatch) {\r\n    doPatch(node, currentPatch)\r\n  }\r\n}\r\n\r\nfunction doPatch(node, patchs) {\r\n  patchs.forEach(patch => {\r\n    patch2dom(node, patch)\r\n  })\r\n}\r\n\r\nfunction patch2dom (node, patch) {\r\n  switch (patch.type) {\r\n    case 'ATTR':\r\n      for (let key in patch.attr) {\r\n        (0,_Element__WEBPACK_IMPORTED_MODULE_0__.setInfo)(node, key, patch.attr[key])\r\n      }\r\n      break\r\n    case 'REMOVE':\r\n      node.parentNode.removeChild(node)\r\n      break\r\n    case 'REPLACE':\r\n      let newNode = patch.newNode instanceof _Element__WEBPACK_IMPORTED_MODULE_0__.Element ?\r\n        (0,_Element__WEBPACK_IMPORTED_MODULE_0__.render)(patch.newNode) :\r\n        document.createTextNode(patch.newNode)\r\n      node.parentNode.replaceChild(newNode, node)\r\n      break\r\n    case 'TEXT':\r\n      node.textContent = patch.text\r\n      break\r\n    default:\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://diff/./src/patch.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("// const isString=(node)=>{\r\n//   return  Object.prototype.toString.call(node)=='[object,String]';\r\n// }\r\nfunction isString (node) {\r\n  return typeof node === 'string'\r\n}\r\nmodule.exports={\r\n    isString\r\n}\n\n//# sourceURL=webpack://diff/./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;