const expenseModal = document.getElementById('addExpenseBtn');
const categoryModal = document.getElementById('addCategoryBtn');
const simCategoryModal = document.getElementById('addSimCategoryBtn');

const showExpense = document.getElementById('showExpense');
const showCat = document.getElementById('showCat');
const showSimCat = document.getElementById('showSimCat');


const addExpenseImage = document.getElementById('addExpenseImage');
// const deleteExpenseImage = document.getElementById('deleteExpenseImage');
const addCategoryImage = document.getElementById('addCategoryImage');
const addSimCategoryImage = document.getElementById('addSimCategoryImage');

const expenseForm = document.getElementById('expenseForm');
const categoryForm = document.getElementById('categoryForm');
const simCategoryForm = document.getElementById('simCategoryForm');

const switched = document.getElementById('switch');

const actualBudgetDiv = document.querySelectorAll("#ActualBudget");
const simulatedBudgetDiv = document.getElementById("simulatedBudget");

let switchInterval = 1;

function showExpenseModal() {
    showExpense.classList.remove('hide');
    // showdiv.classList.add('modal');
}

function showCategoryModal() {
    showCat.classList.remove('hide');
}
function showSimCategoryModal() {
    showSimCat.classList.remove('hide');
}

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

expenseModal.addEventListener('click', showExpenseModal);
categoryModal.addEventListener('click', showCategoryModal);
simCategoryModal.addEventListener('click', showSimCategoryModal);

switched.addEventListener('click', switchBudget);

addExpenseImage.addEventListener('click', function(event) {
    console.log('here 20202020');
    event.preventDefault(); 
    expenseForm.submit();
});
addCategoryImage.addEventListener('click', function(event) {
    event.preventDefault(); 
    categoryForm.submit();
});
addSimCategoryImage.addEventListener('click', function(event) {
    event.preventDefault(); 
    simCategoryForm.submit();
});
