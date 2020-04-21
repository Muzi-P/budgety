// Budget controller
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage
    }

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(element => {
            sum += element.value
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };


    return {
        addItem: function (type, des, val) {
            var newItem, id;

            // Create new ID
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }


            // create new item
            if (type === 'inc') {
                newItem = new Income(id, des, val);
            } else if (type === 'exp') {
                newItem = new Expense(id, des, val);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },

        deleteItem: function (type, id) {
            var ids, index;

            ids = data.allItems[type].map(element => {
                return element.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function () {
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget

            data.budget = data.totals.inc - data.totals.exp;
            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: function () {
            data.allItems.exp.forEach(element => {
                element.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function () {
            var allPerc = data.allItems.exp.map(element => {
                return element.getPercentage();
            })

            return allPerc
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function () {
            return data;
        }

    }

})();



// UI controller
var UIController = (function () {
    // some code

    var DomStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    var formatNumber = function (num, type) {
        /*
        + or - before number, exactly two decimal points
        and comma separating thousands
        */
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1];


        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec
    };

    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DomStrings.inputType).value,
                description: document.querySelector(DomStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DomStrings.inputValue).value)
            }
        },

        addListItem: function (obj, type) {
            var html, element;
            // create HTML string with placeholder text
            if (type === 'inc') {
                element = DomStrings.incomeContainer;
                html = `
                <div class="item clearfix" id="inc-${obj.id}">
                    <div class="item__description">${obj.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${formatNumber(obj.value, type)}</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>
    `
            } else if (type === 'exp') {
                element = DomStrings.expenseContainer;
                html = `
                <div class="item clearfix" id = "exp-${obj.id}" >
                    <div class="item__description">${obj.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${formatNumber(obj.value, type)}</div>
                        <div class="item__percentage">21%</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div >
                `
            }

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', html)

        },

        getDOMstrings: function () {
            return DomStrings
        },
        displayBudget: function (obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DomStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DomStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DomStrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
            if (obj.percentage > 0) {
                document.querySelector(DomStrings.percentageLabel).textContent = obj.percentage + '%';

            } else {
                document.querySelector(DomStrings.percentageLabel).textContent = '--';

            }
        },

        displayPercentages: function (percentages) {
            var fields;
            fields = document.querySelectorAll(DomStrings.expensesPercLabel);
            nodeListForEach(fields, function (current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%'
                } else {
                    current.textContent = '---'
                }
            });
        },

        deleteListItem: function (selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el)
        },

        clearFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DomStrings.inputDescription + ',' + DomStrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(element => {
                element.value = "";
            });

            fieldsArr[0].focus()

        },

        displayMonth: function () {
            var now, year, month, months;
            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
            document.querySelector(DomStrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changedType: function () {
            var fields;

            fields = document.querySelectorAll(
                `${DomStrings.inputType},${DomStrings.inputDescription},${DomStrings.inputValue}`
            );

            nodeListForEach(fields, function (current) {
                current.classList.toggle('red-focus')
            });

            document.querySelector(DomStrings.inputBtn).classList.toggle('red');
        }



    }
})();



//  Global App Controller
var controller = (function (budgetCrl, UICrl) {

    var setupEventListeners = function () {
        var DomStrings = UICrl.getDOMstrings();
        document.querySelector(DomStrings.inputBtn).addEventListener('click', ctrlAddItem)

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        })


        document.querySelector(DomStrings.container).addEventListener('click', ctrDeleteItem)
        document.querySelector(DomStrings.inputType).addEventListener('change', UICrl.changedType)
    }

    var updateBudget = function () {
        var budget;
        // 1. Calculate the bidget
        budgetController.calculateBudget();
        // 2. Return the budget
        budget = budgetCrl.getBudget();
        // 3. Display the budget on the UI
        UICrl.displayBudget(budget);

    }

    var updatePercentages = function () {

        // 1. Calculate percentage
        budgetCrl.calculatePercentages();
        // 2. Read percentages from the budget controller
        var percentage = budgetCrl.getPercentages();
        // 3. Update the UI with the new percentages
        UICrl.displayPercentages(percentage);

    }

    var ctrlAddItem = function () {
        var input, newItem;
        // 1. Get the filed input data
        input = UICrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCrl.addItem(input.type, input.description, input.value);
            // 3. Add the item to the UI
            UICrl.addListItem(newItem, input.type)
            // 4. Clear fields 
            UICrl.clearFields()
            // 5. Calculate and update budget
            updateBudget()

            // 6. Update percentages
            updatePercentages()
        }
    };

    var ctrDeleteItem = function (event) {
        var itemID, splitID, type, id;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-')
            type = splitID[0];
            id = parseInt(splitID[1]);

            // 1. delete the item from the data structure
            budgetCrl.deleteItem(type, id);
            // 2. delete the item form the UI
            UICrl.deleteListItem(itemID);
            // 3. update and show in the UI
            updateBudget();
            // 4. Update percentages
            updatePercentages()
        }
    }
    return {
        init: function () {
            console.log('Application has started');
            UICrl.displayMonth();
            UICrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
            setupEventListeners();
        }
    }



})(budgetController, UIController);



controller.init();