// cache ADD Btns
const expenseModal = document.getElementById('addExpenseBtn');
const categoryModal = document.getElementById('addCategoryBtn');
const simCategoryModal = document.getElementById('addSimCategoryBtn');
// cache the container of the ADD Btns
const showExpense = document.getElementById('showExpense');
const showCat = document.getElementById('showCat');
const showSimCat = document.getElementById('showSimCat');
const showOverlay = document.getElementById('overlay');
//cache the close buttons for the ADD container
const expCloseBtn = document.getElementById('expenseCloseBtn');
const catAbCloseBtn = document.getElementById('categoryABCloseBtn');
const simCategoryABCloseBtn = document.getElementById('simCategoryABCloseBtn');
// cache forms the ADD Forms
const expenseForm = document.getElementById('expenseForm');
const categoryForm = document.getElementById('categoryForm');
const simCategoryForm = document.getElementById('simCategoryForm');


// cache delete btns that show the delete form
const showDelExpModal = document.querySelectorAll('#showDeleteModal');
// const showDelCategoryForm = document.querySelectorAll('#showSimCatForm');
const showDelSimCategoryForm = document.querySelectorAll('#showDelSimCatForm');
// cache the delete forms
const deleteExpModal = document.querySelectorAll('#deleteExpModal')
// const deleteExpModal = document.getElementById(deleteExpModal)
const deleteSimCatExpModal = document.querySelectorAll(`#deleteSimCatModal`)
// cache the no btn to cancel a delete
const noDeleteExp = document.querySelectorAll(`#closeDelExpModal`)
// const noDelete = document.querySelectorAll(`closeDelSimCatModal`)
const noDeleteSimCat = document.querySelectorAll(`#closeDelSimCatModal`)


// cache update btns that show the update form
const showUpdateExpModal = document.querySelectorAll('#showUpdateModal');
// const showDelCategoryForm = document.querySelectorAll('#showSimCatForm');
const showUpdateSimCatForm = document.querySelectorAll('#showUpdateSimCatForm');
// cache the update forms
const editExpModal = document.querySelectorAll('#editExpModal')
// const deleteExpModal = document.getElementById(deleteExpModal)
const editSimCatModal = document.querySelectorAll(`#editSimCatModal`)
// cache the no btn to cancel a delete
const noEditExp = document.querySelectorAll(`#closeDelExpModal`)
// const noDelete = document.querySelectorAll(`closeDelSimCatModal`)
const noEditSimCat = document.querySelectorAll(`#closeEditSimCatModal`)

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
            input.value = ''; 
        }
    });
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

//Opens the Expense AB Modal
function showExpenseModal() {
    showExpense.classList.remove('hide');
    showExpense.classList.add('popUp');
    showOverlay.classList.add('active');
    setFormFieldsRequired(expenseForm, true);
}
// Closes the Expense AB Modal
function closeExpModal(elem) {
    showExpense.classList.add('hide');
    showExpense.classList.remove('popUp');
    showOverlay.classList.remove('active');
    resetFormInputs(elem);
    setFormFieldsRequired(expenseForm, false);
}
// Opens the Expense Delete Message for the AB Modal
function showExpDelModal(id) {
    console.log(id)
    deleteExpModal.forEach(btn => {

        if(btn.dataset.expenseId === id)
        {
            btn.classList.remove('hide');
            btn.classList.add('popUp');
            showOverlay.classList.add('active');
        }
    });
}
// Opens the Expense Update Message for the AB Modal
function showExpUpdateModal(id) {
    console.log(id)
    editExpModal.forEach(btn => {

        if(btn.dataset.expenseId === id)
        {
            btn.classList.remove('hide');
            btn.classList.add('popUp');
            showOverlay.classList.add('active');
        }
    });
}

//Opens the Category AB Modal
function showCategoryModal() {
    showCat.classList.remove('hide');
    showCat.classList.add('popUp');
    showOverlay.classList.add('active');
    setFormFieldsRequired(categoryForm, true);
}
//Closes the Category AB Modal
function closeCatAbModal(elem) {
    showCat.classList.add('hide');
    showCat.classList.remove('popUp');
    showOverlay.classList.remove('active');
    resetFormInputs(elem);
    setFormFieldsRequired(categoryForm, false);
}

//Opens the Category SB Modal
function showSimCategoryModal() {
    showSimCat.classList.remove('hide');
    showSimCat.classList.add('popUp');
    showOverlay.classList.add('active');
    setFormFieldsRequired(simCategoryForm, true);
}
//Closes the Category SB Modal
function closeSimCatModal(elem) {
    showSimCat.classList.add('hide');
    showSimCat.classList.remove('popUp');
    showOverlay.classList.remove('active');
    resetFormInputs(elem);
    setFormFieldsRequired(simCategoryForm, false);
}

// Opens the Delete Update Message for the AB Modal
function showSimCatDelModal(id) {
    console.log(id)
        deleteSimCatExpModal.forEach(btn => {
        if(btn.dataset.expenseId === id)
        {
            console.log(btn)
            btn.classList.remove('hide');
            btn.classList.add('popUp');
            showOverlay.classList.add('active');
        }
    });
}
// Opens the Update Update Message for the AB Modal
function showSimCatUpdateModal(id) {
    console.log(id)
    editSimCatModal.forEach(btn => {
        if(btn.dataset.expenseId === id)
        {
            console.log(btn)
            btn.classList.remove('hide');
            btn.classList.add('popUp');
            showOverlay.classList.add('active');
        }
    });
}


// Listen to button that activates the modals
expenseModal.addEventListener('click', showExpenseModal);
categoryModal.addEventListener('click', showCategoryModal);
simCategoryModal.addEventListener('click', showSimCategoryModal);

//Listens for the closeBtn inside a modal
expCloseBtn.addEventListener('click', () => closeExpModal(expenseForm))
catAbCloseBtn.addEventListener('click', () => closeCatAbModal(categoryForm))
simCategoryABCloseBtn.addEventListener('click', () => closeSimCatModal(simCategoryForm))

//Switches the Toggle
switched.addEventListener('click', switchBudget);

//Listens for deleteBtns for Expenses
showDelExpModal.forEach(button => {
  button.addEventListener('click', (event) => {
    const expenseId = event.currentTarget.dataset.expenseId;
    // Now you have the expenseId, and you can use it accordingly, for example, pass it to the showDelModal function.
    showExpDelModal(expenseId);
  });
});
//Listens for the closeBtn (Delete)for Expenses
noDeleteExp.forEach(cancel => {
    cancel.addEventListener('click', (event) => {
      const cancelDel = event.currentTarget;
      cancelDel.parentElement.parentElement.parentElement.classList.remove('popUp'); 
      cancelDel.parentElement.parentElement.parentElement.classList.add('hide');
      showOverlay.classList.remove('active');
    });
  });
//Listens for updateBtns for Expenses
showUpdateExpModal.forEach(button => {
    button.addEventListener('click', (event) => {
      const expenseId = event.currentTarget.dataset.expenseId;
      showExpUpdateModal(expenseId);
    });
  });
//Listens for the closeBtn (Update) for Expenses
noEditExp.forEach(cancel => {
    cancel.addEventListener('click', (event) => {
      const cancelEdit = event.currentTarget;
      cancelEdit.parentElement.parentElement.parentElement.classList.remove('popUp'); 
      cancelEdit.parentElement.parentElement.parentElementclassList.add('hide');
      showOverlay.classList.remove('active');
    });
  });

//Listens for the deleteBtns for Simulated Category
showDelSimCategoryForm.forEach(button => {
    button.addEventListener('click', (event) => {
      const expenseId = event.currentTarget.dataset.expenseId;
      showSimCatDelModal(expenseId);
    });
  });

//Listens for the closeBtn (Delete) for Simulated Category
noDeleteSimCat.forEach(cancel => {
    cancel.addEventListener('click', (event) => {
      const cancelDel = event.currentTarget;
      cancelDel.parentElement.classList.remove('popUp'); 
      cancelDel.parentElement.classList.add('hide');
      showOverlay.classList.remove('active');
    });
  });

//Listens for updateBtns for Simulated Category
showUpdateSimCatForm.forEach(button => {
  button.addEventListener('click', (event) => {
    const expenseId = event.currentTarget.dataset.expenseId;
    console.log('we are here 2020202');
    console.log(expenseId);
    showSimCatUpdateModal(expenseId);
  });
});

//Listens for the closeBtn (Update) for Simulated Category
noEditSimCat.forEach(cancel => {
    cancel.addEventListener('click', (event) => {
      const cancelEdit = event.currentTarget;
      cancelEdit.parentElement.classList.remove('popUp'); 
      cancelEdit.parentElement.classList.add('hide');
      showOverlay.classList.remove('active');
    });
  });