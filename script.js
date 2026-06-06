const form = document.querySelector('form');
const expenseTitle = document.querySelector('#title');
const exepenseCategory = document.querySelector('#category');
const expenseValue = document.querySelector('#value');
const refundList = document.querySelector('.refund-list');

form.onsubmit = (event) => {
    event.preventDefault();
    
    const newExpense = new Expense(
        expenseTitle.value,
        exepenseCategory.value,
        expenseValue.value
    )
    console.log(newExpense)
    newExpense.createExpense();
    
};


// ---------------------- Configuração o input VALOR -------------------------------
expenseValue.oninput = (event) => {
    event.target.value = formatToBRL(validation(event.target.value));
};

function validation(value) {
    let validatedValue = value.replace(/\D+/g, '');
    return validatedValue;
};

function formatToBRL(value) {
    let formated = (value / 100).toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL"
    });
    return formated;
};

// ------------------------ Class Expense ------------------------------------------
class Expense {
    constructor(title, category, value) {
        this.id = Date.now();
        this.title = title;
        this.category = category;
        this.value = value;
    };
    createExpense() {
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
        img.src = getValueSRC(this.category);
        h3.innerText = this.title;
        pL.innerText = getTextCategory(this.category);
        pR.innerText = 'R$ ';
        strong.innerText = `${this.value.replace('R$', '').trim()}`;
        imgBtn.src = 'assets/close.svg'

        subDivL.append(h3, pL);
        divL.append(img, subDivL);
        btn.append(imgBtn);
        pR.append(strong);
        divR.append(pR, btn);
        li.append(divL, divR);
        refundList.append(li)
        return li;
    }
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
            return 'assets/Receipti.svg';
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