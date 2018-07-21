/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _payments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./payments */ \"./src/payments.js\");\n/* harmony import */ var _sampledata_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sampledata.json */ \"./src/sampledata.json\");\nvar _sampledata_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./sampledata.json */ \"./src/sampledata.json\", 1);\n\n\n\nconst labels = { \"cardDetails.cvc\" : \"Security Code\" };\n\nlet payments = Object(_payments__WEBPACK_IMPORTED_MODULE_0__[\"loadPayments\"])(_sampledata_json__WEBPACK_IMPORTED_MODULE_1__, labels);\n\nwindow.payments = payments;\n\n/*\nconsole.log(`Loaded ${ payments.length } payments`);\nconsole.log(payments); \nlet selectedPayment = payments[0]; \nconsole.log('selection', selectedPayment); \nconsole.log('schema', selectedPayment.schema); \nselectedPayment.setValue( { 'cardDetails.cvc' : 'ABCD'} ); \nconsole.log('value', selectedPayment.getValue()); \nconsole.log('schema', selectedPayment.schema);\n*/\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/payments.js":
/*!*************************!*\
  !*** ./src/payments.js ***!
  \*************************/
/*! exports provided: loadPayments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadPayments\", function() { return loadPayments; });\nlet __options = [];\nlet __labels = {};\n\nconst configure = (options) => {\n    options.forEach(o => {\n        o.schema = getSchema(o) || {};\n        o.getValue = function() {\n            return getValue(this);\n        };\n        o.setValue = function(data) { \n            setValue(this, data);\n        };\n        __options.push(o);\n    });\n\n    return __options;\n}\n\nconst getSchema = (method) => {\n    if (method && method.fields ) {\n        let data = {};\n        method.fields.forEach(field => {\n            if (field && field.key) {\n                data[field.key] = { \n                    label: __labels[field.key] || field.key,\n                    type: field.type, \n                    value: field.value, \n                    options: field.items || [],\n                    optional: field.optional };\n            }     \n        });\n        return data;\n\t}\n}\n\nconst getValue = (method) => {\n    if (method && method.fields ) {\n        let data = {};\n        method.fields.forEach(field => {\n            if (field && field.key) {\n                data[field.key] = field.value || getValueRecursive(field);\n            }\n        });\n        return data;\n\t}\n}\n\nconst getValueRecursive = (o) => {\n    let source = o.details || [];\n    let data = {};\n    let hasData = false;\n\n    source.forEach(item => {\n        if (item && item.key) {\n            data[item.key] = item.value || getValue(item);\n            hasData = true;\n        }        \n    });\n\n    if (hasData) return data;\n\n    switch (o.type)\n    {\n        case 'boolean' : return false;\n        case 'number' : return 0;\n    }\n\n    return '';\n};\n\nconst setValue = (option, data) => {\n    \n    option.fields.forEach(f => {\n        const val = data[f.key];\n        if (f.type !== 'hidden') {\n            f.value = val;\n        }\n    });\n\n    option.schema = getSchema(option);\n};\n\nconst loadPayments = (options, labels) => {\n    if (labels) __labels = labels;\n    return configure(options);\n}\n\n//# sourceURL=webpack:///./src/payments.js?");

/***/ }),

/***/ "./src/sampledata.json":
/*!*****************************!*\
  !*** ./src/sampledata.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, default */
/***/ (function(module) {

eval("module.exports = [{\"optionType\":\"savedCreditOrDebitCard\",\"description\":\"MasterCard\",\"key\":\"mc\",\"fields\":[{\"key\":\"cardDetails.cvc\",\"type\":\"cardToken\",\"optional\":false},{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"scheme\"},{\"key\":\"recurringDetailReference\",\"type\":\"hidden\",\"optional\":false,\"value\":\"8415295796478187\"},{\"key\":\"storedDetails\",\"type\":\"hidden\",\"optional\":true,\"value\":{\"card\":{\"expiryMonth\":\"10\",\"expiryYear\":\"2020\",\"holderName\":\"Checkout Shopper PlaceHolder\",\"number\":\"1111\"}}}]},{\"optionType\":\"creditOrDebitCard\",\"description\":\"Credit Card\",\"key\":\"scheme\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"scheme\"},{\"key\":\"encryptedCardNumber\",\"type\":\"cardToken\",\"optional\":false},{\"key\":\"encryptedSecurityCode\",\"type\":\"cardToken\",\"optional\":false},{\"key\":\"encryptedExpiryMonth\",\"type\":\"cardToken\",\"optional\":false},{\"key\":\"encryptedExpiryYear\",\"type\":\"cardToken\",\"optional\":false},{\"key\":\"holderName\",\"type\":\"text\",\"optional\":true},{\"key\":\"storeDetails\",\"type\":\"boolean\",\"optional\":true}]},{\"optionType\":\"creditOrDebitCard\",\"description\":\"Credit Card\",\"key\":\"scheme\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"scheme\"},{\"key\":\"additionalData.card.encrypted.json\",\"type\":\"cardToken\",\"optional\":false}]},{\"optionType\":\"localPayments\",\"description\":\"SEPA Bank Transfer\",\"key\":\"bankTransfer_IBAN\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"bankTransfer_IBAN\"}]},{\"optionType\":\"localPayments\",\"description\":\"Bancontact card\",\"key\":\"bcmc\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"bcmc\"},{\"key\":\"additionalData.card.encrypted.json\",\"type\":\"cardToken\",\"optional\":false}]},{\"optionType\":\"localPayments\",\"description\":\"Bancontact app\",\"key\":\"bcmc_mobile\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"bcmc_mobile\"}]},{\"optionType\":\"localPayments\",\"description\":\"Boleto\",\"key\":\"boleto\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"boleto\"}]},{\"optionType\":\"localPayments\",\"description\":\"Boleto Bancario via Santander\",\"key\":\"boletobancario_santander\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"boletobancario_santander\"}]},{\"optionType\":\"localPayments\",\"description\":\"Local Polish Payment Methods\",\"key\":\"dotpay\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"dotpay\"},{\"items\":[{\"id\":\"92\",\"name\":\"Bank Sp�?dzielczy w Brodnicy\"},{\"id\":\"11\",\"name\":\"Bank transfer / postal\"},{\"id\":\"74\",\"name\":\"Banki Sp�?dzielcze\"},{\"id\":\"90\",\"name\":\"BG? BNP Paribas PBL\"},{\"id\":\"73\",\"name\":\"BLIK\"},{\"id\":\"87\",\"name\":\"Credit Agricole PBL\"},{\"id\":\"83\",\"name\":\"EnveloBank\"},{\"id\":\"55\",\"name\":\"erata - dotpay installment\"},{\"id\":\"93\",\"name\":\"eSKOK\"},{\"id\":\"56\",\"name\":\"eurobank p?atno?ci online\"},{\"id\":\"76\",\"name\":\"Getin Bank PBL\"},{\"id\":\"81\",\"name\":\"Idea Cloud\"},{\"id\":\"7\",\"name\":\"ING Corporate customers\"},{\"id\":\"35\",\"name\":\"Kantor Polski\"},{\"id\":\"44\",\"name\":\"Millennium - P?atno?ci Internetowe\"},{\"id\":\"10\",\"name\":\"Millennium Corporate customers\"},{\"id\":\"68\",\"name\":\"mRaty\"},{\"id\":\"1\",\"name\":\"mTransfer\"},{\"id\":\"91\",\"name\":\"Nest Bank\"},{\"id\":\"80\",\"name\":\"Noble Pay\"},{\"id\":\"50\",\"name\":\"Pay Way Toyota Bank\"},{\"id\":\"45\",\"name\":\"Pay with Alior Bank\"},{\"id\":\"65\",\"name\":\"Paylink Idea Bank\"},{\"id\":\"36\",\"name\":\"Pekao24Przelew\"},{\"id\":\"70\",\"name\":\"Pocztowy24\"},{\"id\":\"6\",\"name\":\"Przelew24\"},{\"id\":\"46\",\"name\":\"P?ac? z Citi Handlowy\"},{\"id\":\"38\",\"name\":\"P?ac? z ING\"},{\"id\":\"2\",\"name\":\"P?ac? z Inteligo\"},{\"id\":\"4\",\"name\":\"P?ac? z iPKO\"},{\"id\":\"72\",\"name\":\"P?ac? z Orange\"},{\"id\":\"66\",\"name\":\"P?ac? z PBS\"},{\"id\":\"75\",\"name\":\"P?ac? z Plus Bank\"},{\"id\":\"51\",\"name\":\"P?a? z BO?\"},{\"id\":\"48\",\"name\":\"R-Przelew\"},{\"id\":\"88\",\"name\":\"Raiffeisen\"},{\"id\":\"52\",\"name\":\"SkyCash\"},{\"id\":\"58\",\"name\":\"Szybkie Platnosci Internetowe z Deutsche Bank PBC\"},{\"id\":\"60\",\"name\":\"T-Mobile us?ugi bankowe\"},{\"id\":\"21\",\"name\":\"VIA - Moje Rachunki\"},{\"id\":\"84\",\"name\":\"Volkswagen Bank direct\"},{\"id\":\"31\",\"name\":\"Zaplac w Zabce i we Freshmarket\"},{\"id\":\"24\",\"name\":\"mPay\"}],\"key\":\"issuer\",\"type\":\"select\",\"optional\":false}]},{\"optionType\":\"localPayments\",\"description\":\"GiroPay\",\"key\":\"giropay\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"giropay\"},{\"key\":\"bic\",\"type\":\"text\",\"optional\":false}]},{\"optionType\":\"localPayments\",\"description\":\"iDEAL\",\"key\":\"ideal\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"ideal\"},{\"items\":[{\"id\":\"1121\",\"name\":\"Test Issuer\"},{\"id\":\"1154\",\"name\":\"Test Issuer 5\"},{\"id\":\"1153\",\"name\":\"Test Issuer 4\"},{\"id\":\"1152\",\"name\":\"Test Issuer 3\"},{\"id\":\"1151\",\"name\":\"Test Issuer 2\"},{\"id\":\"1162\",\"name\":\"Test Issuer Cancelled\"},{\"id\":\"1161\",\"name\":\"Test Issuer Pending\"},{\"id\":\"1160\",\"name\":\"Test Issuer Refused\"},{\"id\":\"1159\",\"name\":\"Test Issuer 10\"},{\"id\":\"1158\",\"name\":\"Test Issuer 9\"},{\"id\":\"1157\",\"name\":\"Test Issuer 8\"},{\"id\":\"1156\",\"name\":\"Test Issuer 7\"},{\"id\":\"1155\",\"name\":\"Test Issuer 6\"}],\"key\":\"idealIssuer\",\"type\":\"select\",\"optional\":false}]},{\"optionType\":\"localPayments\",\"description\":\"Pay later with Klarna.\",\"key\":\"klarna\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"klarna\"},{\"key\":\"personalDetails\",\"type\":\"fieldSet\",\"optional\":false,\"details\":[{\"key\":\"firstName\",\"type\":\"text\",\"optional\":false},{\"key\":\"infix\",\"type\":\"text\",\"optional\":true},{\"key\":\"lastName\",\"type\":\"text\",\"optional\":false},{\"items\":[{\"id\":\"M\",\"name\":\"MALE\"},{\"id\":\"F\",\"name\":\"FEMALE\"}],\"key\":\"gender\",\"type\":\"radio\",\"optional\":false},{\"key\":\"dateOfBirth\",\"type\":\"date\",\"optional\":false},{\"key\":\"telephoneNumber\",\"type\":\"tel\",\"optional\":false},{\"key\":\"socialSecurityNumber\",\"type\":\"text\",\"optional\":true},{\"key\":\"shopperEmail\",\"type\":\"emailAddress\",\"optional\":false}]},{\"key\":\"billingAddress\",\"type\":\"address\",\"optional\":false,\"details\":[{\"key\":\"street\",\"type\":\"text\",\"optional\":false},{\"key\":\"houseNumberOrName\",\"type\":\"text\",\"optional\":false},{\"key\":\"city\",\"type\":\"text\",\"optional\":false},{\"key\":\"postalCode\",\"type\":\"text\",\"optional\":false},{\"key\":\"stateOrProvince\",\"type\":\"text\",\"optional\":true},{\"items\":[{\"id\":\"SE\",\"name\":\"Sweden\"},{\"id\":\"NO\",\"name\":\"Norway\"},{\"id\":\"FI\",\"name\":\"Finland\"},{\"id\":\"DK\",\"name\":\"Denmark\"},{\"id\":\"AT\",\"name\":\"Austria\"},{\"id\":\"DE\",\"name\":\"Germany\"},{\"id\":\"NL\",\"name\":\"Netherlands\"}],\"key\":\"country\",\"type\":\"select\",\"optional\":false}]},{\"key\":\"separateDeliveryAddress\",\"type\":\"boolean\",\"optional\":true,\"value\":\"false\"},{\"key\":\"deliveryAddress\",\"type\":\"address\",\"optional\":true,\"details\":[{\"key\":\"street\",\"type\":\"text\",\"optional\":false},{\"key\":\"houseNumberOrName\",\"type\":\"text\",\"optional\":false},{\"key\":\"city\",\"type\":\"text\",\"optional\":false},{\"key\":\"postalCode\",\"type\":\"text\",\"optional\":false},{\"key\":\"stateOrProvince\",\"type\":\"text\",\"optional\":true},{\"items\":[{\"id\":\"SE\",\"name\":\"Sweden\"},{\"id\":\"NO\",\"name\":\"Norway\"},{\"id\":\"FI\",\"name\":\"Finland\"},{\"id\":\"DK\",\"name\":\"Denmark\"},{\"id\":\"AT\",\"name\":\"Austria\"},{\"id\":\"DE\",\"name\":\"Germany\"},{\"id\":\"NL\",\"name\":\"Netherlands\"}],\"key\":\"country\",\"type\":\"select\",\"optional\":false}]}]},{\"optionType\":\"localPayments\",\"description\":\"Malaysia E-Banking\",\"key\":\"molpay_ebanking_fpx_MY\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"molpay_ebanking_fpx_MY\"},{\"items\":[{\"id\":\"fpx_bimb\",\"name\":\"Bank Islam\"},{\"id\":\"fpx_amb\",\"name\":\"Am Online\"},{\"id\":\"fpx_uob\",\"name\":\"UOB Bank\"},{\"id\":\"fpx_ocbc\",\"name\":\"OCBC Bank\"},{\"id\":\"fpx_abb\",\"name\":\"Affin Bank\"},{\"id\":\"fpx_cimbclicks\",\"name\":\"CIMB Clicks\"},{\"id\":\"fpx_scb\",\"name\":\"Standard Chartered Bank\"},{\"id\":\"fpx_pbb\",\"name\":\"Public Bank\"},{\"id\":\"fpx_hlb\",\"name\":\"Hong Leong Connect\"},{\"id\":\"fpx_mb2u\",\"name\":\"Maybank2u\"},{\"id\":\"fpx_rhb\",\"name\":\"RHB Now\"},{\"id\":\"fpx_abmb\",\"name\":\"Alliance Bank\"},{\"id\":\"fpx_bkrm\",\"name\":\"Bank Rakyat\"}],\"key\":\"issuer\",\"type\":\"select\",\"optional\":false}]},{\"optionType\":\"localPayments\",\"description\":\"Multibanco\",\"key\":\"multibanco\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"multibanco\"}]},{\"optionType\":\"localPayments\",\"description\":\"SEPA Direct Debit\",\"key\":\"sepadirectdebit\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"sepadirectdebit\"},{\"key\":\"sepa.ownerName\",\"type\":\"text\",\"optional\":false},{\"key\":\"sepa.ibanNumber\",\"type\":\"text\",\"optional\":false}]},{\"optionType\":\"localPayments\",\"description\":\"UnionPay\",\"key\":\"unionpay\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"unionpay\"}]},{\"optionType\":\"onAccount\",\"description\":\"On Account\",\"key\":\"onaccount\",\"fields\":[{\"key\":\"type\",\"type\":\"hidden\",\"optional\":false,\"value\":\"onaccount\"}]}];\n\n//# sourceURL=webpack:///./src/sampledata.json?");

/***/ })

/******/ });