const form = document.querySelector('form');
const expenseTitle = document.querySelector('#title');
const exepenseCategory = document.querySelector('#category');
const expenseValue = document.querySelector('#value');
const refundList = document.querySelector('.refund-list');
const counterExpenses = document.querySelector('.count');
const valueTotalExpenses = document.querySelector('.expense-total strong');
const msgToastContainer = document.querySelector('.msg-toast');
const btnToast = document.querySelector('.close-toast');

let listExpenses = localStorage.getItem('listExpenses');
if (listExpenses) {
    getListExpenses();
} else {
    listExpenses = [];
}

// --------------- att section refund-request -------------------
attLista();
attCounterExpenses();
attValueTotalExpenses();

function attLista() {
    listExpenses.forEach(item => addItemUl(createExpense(item)));
}

// ----------------- evento submit -------------------------
form.onsubmit = (event) => {
    event.preventDefault();
    
    newExpense = {
        id: Date.now(),
        title: expenseTitle.value.trim(),
        category: exepenseCategory.value,
        value: expenseValue.value.replace(/\D+/g, '') / 100
    }
    if (!(newExpense.title)) {
        toastMsg('Insira o título da despesa', true)
        return
    }
    if (!(newExpense.category)) {
        toastMsg('Escolha a categoria da despesa', true)
        return
    }
    if (!(newExpense.value)) {
        toastMsg('Informe o valor da despesa', true)
        return
    }
        
    

    addItemUl(createExpense(newExpense));
    listExpenses.push(newExpense);
    saveLocalStorage();
    attCounterExpenses();
    attValueTotalExpenses();
    form.reset()
    toastMsg('Despesa adicionada', false)
};

function createExpense(expense) {
    const li = document.createElement('li');
    const divL = document.createElement('div');
    const divR = document.createElement('div');
    const img = document.createElement('img');
    const subDivL = document.createElement('div');
    const h3 = document.createElement('h3');
    const pL = document.createElement('p');
    const pR = document.createElement('p');
    const btn = document.createElement('button');
    const strong = document.createElement('strong');
    const imgBtn = document.createElement('img');

    li.classList.add('refund-item');
    li.setAttribute('data-item-id', expense.id);
    img.src = getValueSRC(expense.category);
    h3.innerText = expense.title;
    pL.innerText = getTextCategory(expense.category);
    pR.innerText = 'R$ ';
    strong.innerText = expense.value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    btn.classList.add('btn-close');
    imgBtn.src = 'assets/close.svg';

    subDivL.append(h3, pL);
    divL.append(img, subDivL);
    btn.append(imgBtn);
    pR.append(strong);
    divR.append(pR, btn);
    li.append(divL, divR);

    return li;
};

function addItemUl(li) {
    refundList.append(li);
};

function getValueSRC(category) {
    switch (category) {
        case 'food':
            return 'assets/ForkKnife.svg';
            break;
        case 'hosting':
            return 'assets/Bed.svg';
            break;
        case 'transport':
            return 'assets/PoliceCar.svg';
            break;
        case 'services':
            return 'assets/Wrench.svg';
            break
        case 'others':
            return 'assets/Receipt.svg';
            break

    }
}
function getTextCategory(category) {
    switch (category) {
        case 'food':
            return 'Alimentação';
            break;
        case 'hosting':
            return 'Hospedagem';
            break;
        case 'transport':
            return 'Transporte';
            break;
        case 'services':
            return 'Serviços';
            break
        case 'others':
            return 'Outros';
            break

    }
}


// ------------------------ remover expense -------------------------------
refundList.addEventListener('click', (event) => {
    const btn = event.target.closest('button');
    if(btn) {
        const itemExpense = btn.closest('li');
        itemExpense.remove();
        console.log(listExpenses)
        listExpenses = listExpenses.filter(item => item.id != itemExpense.dataset.itemId);
        console.log(listExpenses)
        attCounterExpenses();
        attValueTotalExpenses();
        saveLocalStorage();
        toastMsg('Despesa excluída', true)
    }
});

// ------------------ Configuração o input VALOR -------------------------------
expenseValue.oninput = (event) => {
    event.target.value = formatToBRL(validation(event.target.value));
};

function validation(value) {
    let validatedValue = value.replace(/\D+/g, '');
    return validatedValue;
};

function formatToBRL(value) {
    let formated = formatCurrency(value / 100);
    return formated;
};

function formatCurrency(value) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}


// --------------------- configurar o "placeholder" do select --------
// exepenseCategory.onchange = (event) => {
//     if (event.target.value != 'Selecionar') {
//         event.target.style.color = 'var(--gray-100)';
//         console.log('evento disparado, alvo:', event.target)
//     }
// }

//  ------------- localStorage ------------------------------
function saveLocalStorage() {
    localStorage.setItem('listExpenses', JSON.stringify(listExpenses));
}
function getListExpenses() {
    listExpenses = JSON.parse(listExpenses);
}

//  --------------- atualizar refund-reqquest-header --------------
function attCounterExpenses() {
    const count = listExpenses.length;
    counterExpenses.innerText = count > 1 ? `${count} despesas` : `${count} despesa`
}

function attValueTotalExpenses() {
    const valueTotal = listExpenses.reduce((total,item) => total += item.value, 0);
    valueTotalExpenses.innerText = formatCurrency(valueTotal).replace('R$', '').trim();
}

// -------------------- toast msg -----------------
let toastTimeout;

function toastMsg(msg, warning) {
    btnToast.closest('aside').style.display = 'flex';
    msgToastContainer.innerText = msg;
    const toastContainer = msgToastContainer.closest('.toast-notification');
    if (warning) {
        toastContainer.style.backgroundColor = '#C93847';
    } else {
        toastContainer.style.backgroundColor = '#2E7D32';
    }
    toastContainer.classList.remove('toast-off');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout( () => {
        toastContainer.classList.add('toast-off');
    }, 4000);
}

// --------------- button close of toast ----------------
btnToast.addEventListener('click', () => {
    btnToast.closest('aside').style.display = 'none'
})