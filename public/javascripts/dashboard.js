// cache the Btns
const expenseModal = document.getElementById('addExpenseBtn');
const categoryModal = document.getElementById('addCategoryBtn');
const simCategoryModal = document.getElementById('addSimCategoryBtn');

// cache the container divs
const showExpense = document.getElementById('showExpense');
const showCat = document.getElementById('showCat');
const showSimCat = document.getElementById('showSimCat');
const showOverlay = document.getElementById('overlay');

//cache the closing images
const addSimCategoryImage = document.getElementById('addSimCategoryImage');


//cache close modal buttons
const expCloseBtn = document.getElementById('expenseCloseBtn');
const catAbCloseBtn = document.getElementById('categoryABCloseBtn');
// const addSimCategoryImage = document.getElementById('addSimCategoryImage');

// cache forms
const expenseForm = document.getElementById('expenseForm');
const categoryForm = document.getElementById('categoryForm');
const simCategoryForm = document.getElementById('simCategoryForm');

//cache toggle
const switched = document.getElementById('switch');

// cache the parent divs of Actual Budget and Simulated Budget
const actualBudgetDiv = document.querySelectorAll("#ActualBudget");
const simulatedBudgetDiv = document.getElementById("simulatedBudget");

// switching interval
let switchInterval = 1;

function setFormFieldsRequired(form, isRequired) {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.type === 'text' || input.type === 'number' || input.type === 'date') {
            input.required = isRequired;
        }
    });
}

function resetFormInputs(form) {
    console.log(form);
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.type === 'text' || input.type === 'number' || input.type === 'date') {
            input.value = ''; // Set to empty string to reset
        }
    });
}

//Opens the Expense AB Modal
function showExpenseModal() {
    showExpense.classList.remove('hide');
    showExpense.classList.add('popUp');
    showOverlay.classList.add('active');
    setFormFieldsRequired(expenseForm, true);
}

//Opens the Category AB Modal
function showCategoryModal() {
    showCat.classList.remove('hide');
    showCat.classList.add('popUp');
    showOverlay.classList.add('active');
    setFormFieldsRequired(expenseForm, true);
}

//Opens the Category SB Modal
function showSimCategoryModal() {
    showSimCat.classList.remove('hide');
}

// closeModal function for expense
function closeExpModal(elem) {
    // console.log(elem);
    showExpense.classList.add('hide');
    showExpense.classList.remove('popUp');
    showOverlay.classList.remove('active');
    resetFormInputs(elem);
    setFormFieldsRequired(categoryForm, false);
}

function closeCatAbModal(elem) {
    // console.log(elem);
    showCat.classList.add('hide');
    showCat.classList.remove('popUp');
    showOverlay.classList.remove('active');
    resetFormInputs(elem);
    setFormFieldsRequired(categoryForm, false);
}


//In charge of toggling between AB and SB
function switchBudget() {
    switchInterval *= -1;
    if(switchInterval === -1)
    {
        actualBudgetDiv.forEach(e=>{e.classList.add('hide')});
        simulatedBudgetDiv.classList.remove('hide')
    }
    else
    {
        actualBudgetDiv.forEach(e=>{e.classList.remove('hide')});
        simulatedBudgetDiv.classList.add('hide')
    }
}

// Listen to button that activates the modals
expenseModal.addEventListener('click', showExpenseModal);
categoryModal.addEventListener('click', showCategoryModal);
simCategoryModal.addEventListener('click', showSimCategoryModal);


//Listens for the closeBtn inside a modal
expCloseBtn.addEventListener('click', () => closeExpModal(expenseForm))
catAbCloseBtn.addEventListener('click', () => closeCatAbModal(categoryForm))

//Switches the Toggle
switched.addEventListener('click', switchBudget);

// Sends the request to add expense for AB

// addExpenseImage.addEventListener('click', function(event) {
//     event.preventDefault(); 
//     expenseForm.submit();
// });

//Sends request to add categroy for AB

// addCategoryImage.addEventListener('click', function(event) {
//     event.preventDefault(); 
//     categoryForm.submit();
// });

//Sends request to add category for SB

// addSimCategoryImage.addEventListener('click', function(event) {
//     event.preventDefault(); 
//     simCategoryForm.submit();
// });
