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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Budget controller\nvar budgetController = function () {\n  var Expense = function (id, description, value) {\n    this.id = id;\n    this.description = description;\n    this.value = value;\n    this.percentage = -1;\n  };\n\n  var Income = function (id, description, value) {\n    this.id = id;\n    this.description = description;\n    this.value = value;\n  };\n\n  Expense.prototype.calcPercentage = function (totalIncome) {\n    if (totalIncome > 0) {\n      this.percentage = Math.round(this.value / totalIncome * 100);\n    } else {\n      this.percentage = -1;\n    }\n  };\n\n  Expense.prototype.getPercentage = function () {\n    return this.percentage;\n  };\n\n  var calculateTotal = function (type) {\n    var sum = 0;\n    data.allItems[type].forEach(element => {\n      sum += element.value;\n    });\n    data.totals[type] = sum;\n  };\n\n  var data = {\n    allItems: {\n      exp: [],\n      inc: []\n    },\n    totals: {\n      exp: 0,\n      inc: 0\n    },\n    budget: 0,\n    percentage: -1\n  };\n  return {\n    addItem: function (type, des, val) {\n      var newItem, id; // Create new ID\n\n      if (data.allItems[type].length > 0) {\n        id = data.allItems[type][data.allItems[type].length - 1].id + 1;\n      } else {\n        id = 0;\n      } // create new item\n\n\n      if (type === 'inc') {\n        newItem = new Income(id, des, val);\n      } else if (type === 'exp') {\n        newItem = new Expense(id, des, val);\n      } // Push it into our data structure\n\n\n      data.allItems[type].push(newItem); // Return the new element\n\n      return newItem;\n    },\n    deleteItem: function (type, id) {\n      var ids, index;\n      ids = data.allItems[type].map(element => {\n        return element.id;\n      });\n      index = ids.indexOf(id);\n\n      if (index !== -1) {\n        data.allItems[type].splice(index, 1);\n      }\n    },\n    calculateBudget: function () {\n      // calculate total income and expenses\n      calculateTotal('exp');\n      calculateTotal('inc'); // calculate the budget\n\n      data.budget = data.totals.inc - data.totals.exp; // calculate the percentage of income that we spent\n\n      if (data.totals.inc > 0) {\n        data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);\n      } else {\n        data.percentage = -1;\n      }\n    },\n    calculatePercentages: function () {\n      data.allItems.exp.forEach(element => {\n        element.calcPercentage(data.totals.inc);\n      });\n    },\n    getPercentages: function () {\n      var allPerc = data.allItems.exp.map(element => {\n        return element.getPercentage();\n      });\n      return allPerc;\n    },\n    getBudget: function () {\n      return {\n        budget: data.budget,\n        totalInc: data.totals.inc,\n        totalExp: data.totals.exp,\n        percentage: data.percentage\n      };\n    },\n    testing: function () {\n      return data;\n    }\n  };\n}(); // UI controller\n\n\nvar UIController = function () {\n  // some code\n  var DomStrings = {\n    inputType: '.add__type',\n    inputDescription: '.add__description',\n    inputValue: '.add__value',\n    inputBtn: '.add__btn',\n    incomeContainer: '.income__list',\n    expenseContainer: '.expenses__list',\n    budgetLabel: '.budget__value',\n    incomeLabel: '.budget__income--value',\n    expenseLabel: '.budget__expenses--value',\n    percentageLabel: '.budget__expenses--percentage',\n    container: '.container',\n    expensesPercLabel: '.item__percentage',\n    dateLabel: '.budget__title--month'\n  };\n\n  var formatNumber = function (num, type) {\n    /*\n    + or - before number, exactly two decimal points\n    and comma separating thousands\n    */\n    num = Math.abs(num);\n    num = num.toFixed(2);\n    numSplit = num.split('.');\n    int = numSplit[0];\n\n    if (int.length > 3) {\n      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);\n    }\n\n    dec = numSplit[1];\n    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;\n  };\n\n  var nodeListForEach = function (list, callback) {\n    for (var i = 0; i < list.length; i++) {\n      callback(list[i], i);\n    }\n  };\n\n  return {\n    getInput: function () {\n      return {\n        type: document.querySelector(DomStrings.inputType).value,\n        description: document.querySelector(DomStrings.inputDescription).value,\n        value: parseFloat(document.querySelector(DomStrings.inputValue).value)\n      };\n    },\n    addListItem: function (obj, type) {\n      var html, element; // create HTML string with placeholder text\n\n      if (type === 'inc') {\n        element = DomStrings.incomeContainer;\n        html = `\n                <div class=\"item clearfix\" id=\"inc-${obj.id}\">\n                    <div class=\"item__description\">${obj.description}</div>\n                    <div class=\"right clearfix\">\n                        <div class=\"item__value\">${formatNumber(obj.value, type)}</div>\n                        <div class=\"item__delete\">\n                            <button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button>\n                        </div>\n                    </div>\n                </div>\n    `;\n      } else if (type === 'exp') {\n        element = DomStrings.expenseContainer;\n        html = `\n                <div class=\"item clearfix\" id = \"exp-${obj.id}\" >\n                    <div class=\"item__description\">${obj.description}</div>\n                    <div class=\"right clearfix\">\n                        <div class=\"item__value\">${formatNumber(obj.value, type)}</div>\n                        <div class=\"item__percentage\">21%</div>\n                        <div class=\"item__delete\">\n                            <button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button>\n                        </div>\n                    </div>\n                </div >\n                `;\n      } // Insert the HTML into the DOM\n\n\n      document.querySelector(element).insertAdjacentHTML('beforeend', html);\n    },\n    getDOMstrings: function () {\n      return DomStrings;\n    },\n    displayBudget: function (obj) {\n      var type;\n      obj.budget > 0 ? type = 'inc' : type = 'exp';\n      document.querySelector(DomStrings.budgetLabel).textContent = formatNumber(obj.budget, type);\n      document.querySelector(DomStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');\n      document.querySelector(DomStrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');\n\n      if (obj.percentage > 0) {\n        document.querySelector(DomStrings.percentageLabel).textContent = obj.percentage + '%';\n      } else {\n        document.querySelector(DomStrings.percentageLabel).textContent = '--';\n      }\n    },\n    displayPercentages: function (percentages) {\n      var fields;\n      fields = document.querySelectorAll(DomStrings.expensesPercLabel);\n      nodeListForEach(fields, function (current, index) {\n        if (percentages[index] > 0) {\n          current.textContent = percentages[index] + '%';\n        } else {\n          current.textContent = '---';\n        }\n      });\n    },\n    deleteListItem: function (selectorID) {\n      var el = document.getElementById(selectorID);\n      el.parentNode.removeChild(el);\n    },\n    clearFields: function () {\n      var fields, fieldsArr;\n      fields = document.querySelectorAll(DomStrings.inputDescription + ',' + DomStrings.inputValue);\n      fieldsArr = Array.prototype.slice.call(fields);\n      fieldsArr.forEach(element => {\n        element.value = \"\";\n      });\n      fieldsArr[0].focus();\n    },\n    displayMonth: function () {\n      var now, year, month, months;\n      months = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"];\n      now = new Date();\n      year = now.getFullYear();\n      month = now.getMonth();\n      document.querySelector(DomStrings.dateLabel).textContent = months[month] + ' ' + year;\n    },\n    changedType: function () {\n      var fields;\n      fields = document.querySelectorAll(`${DomStrings.inputType},${DomStrings.inputDescription},${DomStrings.inputValue}`);\n      nodeListForEach(fields, function (current) {\n        current.classList.toggle('red-focus');\n      });\n      document.querySelector(DomStrings.inputBtn).classList.toggle('red');\n    }\n  };\n}(); //  Global App Controller\n\n\nvar controller = function (budgetCrl, UICrl) {\n  var setupEventListeners = function () {\n    var DomStrings = UICrl.getDOMstrings();\n    document.querySelector(DomStrings.inputBtn).addEventListener('click', ctrlAddItem);\n    document.addEventListener('keypress', function (event) {\n      if (event.keyCode === 13 || event.which === 13) {\n        ctrlAddItem();\n      }\n    });\n    document.querySelector(DomStrings.container).addEventListener('click', ctrDeleteItem);\n    document.querySelector(DomStrings.inputType).addEventListener('change', UICrl.changedType);\n  };\n\n  var updateBudget = function () {\n    var budget; // 1. Calculate the bidget\n\n    budgetController.calculateBudget(); // 2. Return the budget\n\n    budget = budgetCrl.getBudget(); // 3. Display the budget on the UI\n\n    UICrl.displayBudget(budget);\n  };\n\n  var updatePercentages = function () {\n    // 1. Calculate percentage\n    budgetCrl.calculatePercentages(); // 2. Read percentages from the budget controller\n\n    var percentage = budgetCrl.getPercentages(); // 3. Update the UI with the new percentages\n\n    UICrl.displayPercentages(percentage);\n  };\n\n  var ctrlAddItem = function () {\n    var input, newItem; // 1. Get the filed input data\n\n    input = UICrl.getInput();\n\n    if (input.description !== \"\" && !isNaN(input.value) && input.value > 0) {\n      // 2. Add the item to the budget controller\n      newItem = budgetCrl.addItem(input.type, input.description, input.value); // 3. Add the item to the UI\n\n      UICrl.addListItem(newItem, input.type); // 4. Clear fields \n\n      UICrl.clearFields(); // 5. Calculate and update budget\n\n      updateBudget(); // 6. Update percentages\n\n      updatePercentages();\n    }\n  };\n\n  var ctrDeleteItem = function (event) {\n    var itemID, splitID, type, id;\n    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;\n\n    if (itemID) {\n      splitID = itemID.split('-');\n      type = splitID[0];\n      id = parseInt(splitID[1]); // 1. delete the item from the data structure\n\n      budgetCrl.deleteItem(type, id); // 2. delete the item form the UI\n\n      UICrl.deleteListItem(itemID); // 3. update and show in the UI\n\n      updateBudget(); // 4. Update percentages\n\n      updatePercentages();\n    }\n  };\n\n  return {\n    init: function () {\n      console.log('Application has started');\n      UICrl.displayMonth();\n      UICrl.displayBudget({\n        budget: 0,\n        totalInc: 0,\n        totalExp: 0,\n        percentage: -1\n      });\n      setupEventListeners();\n    }\n  };\n}(budgetController, UIController);\n\ncontroller.init();\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ 0:
/*!*******************************!*\
  !*** multi ./src/js/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/js/index.js */\"./src/js/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/index.js?");

/***/ })

/******/ });