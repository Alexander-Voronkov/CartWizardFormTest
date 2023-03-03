let currentStep = 1;

function Product(element)
{
    const children = element.parentNode.childNodes;
    children.forEach(element => {
        if(element.classList?.contains('product-name'))
            this.name = element.innerText;
        if(element.classList?.contains('product-count'))
            this.count = +element.value;
        if(element.classList?.contains('product-cost'))
            this.cost = +element.innerText;
    });
    this.cost = this.count*this.cost;
}

const product_arr = [];
const close_arr = [];

document.querySelectorAll('.add-to-cart').forEach(x=>
    {
        x.addEventListener('click',(e)=>
        {
            const tempProduct = new Product(e.target);
            product_arr.push(tempProduct);
            const cartProduct = document.createElement('div');
            const removeProductBtn = document.createElement('span');
            const headerCartProduct = document.createElement('h2');
            headerCartProduct.innerText = tempProduct.name;
            const overallCostCount = document.createElement('div');
            overallCostCount.classList.add('overall-cost-count');
            overallCostCount.innerText = `${tempProduct.count} pieces for ${tempProduct.cost}$`;
            removeProductBtn.classList.add('remove-product');
            cartProduct.classList.add('cart-product-count-cost');
            cartProduct.append(removeProductBtn, headerCartProduct, overallCostCount);
            const cart = document.querySelector('.cart-products');
            removeProductBtn.addEventListener('click',(e)=>
            {
                cart.removeChild(cartProduct);
                product_arr.splice(product_arr.indexOf(tempProduct),1);
                document.querySelector('.overall-cost').innerText = `${product_arr.reduce((accum, current)=>accum + current.cost, 0)}$`;
                close_arr.splice(close_arr.indexOf(removeProductBtn),1);
            });
            cart.insertBefore(cartProduct, cart.lastChild);
            document.querySelector('.overall-cost').innerText = `${product_arr.reduce((accum, current)=>accum + current.cost, 0)}$`;
            close_arr.push(removeProductBtn);
        });
    });

document.querySelector('.clear-btn').addEventListener('click',(e)=>
{
    for (let index = 0; index < close_arr.length; index++) {
        close_arr[index--].click();
    }
});

document.querySelector('#nextBtn').addEventListener('click', async (e)=>
{
    if(product_arr.length === 0)
    {
        alert('You did\'t order anything yet.');
        return;
    }
    if(currentStep === 1)
    {
        if(document.forms.regForm.firstname.validity.valid === false)
        {
            document.forms.regForm.firstname.reportValidity();
            return;
        }
        if(document.forms.regForm.lastname.checkValidity() === false)
        {
            document.forms.regForm.lastname.reportValidity();
            return;
        }
    }
    else if(currentStep === 2)
    {
        if(document.forms.regForm.phone.validity.valid === false)
        {
            document.forms.regForm.phone.reportValidity();
            return;
        }
        if(document.forms.regForm.email.validity.valid === false)
        {
            document.forms.regForm.email.reportValidity();
            return;
        }
    }
    else if(currentStep === 3)
    {
        if(document.forms.regForm.payment.value.length === 0)
        {
            alert('Choose payment method!');
            return;
        }
    }
    document.querySelector(`.tab${currentStep++}`).style.display = 'none';
    const currtab = document.querySelector(`.tab${currentStep}`);
    const temp = document.querySelector('.step-current').nextElementSibling;
    document.querySelector('.step-current').classList.remove('step-current');
    if(temp !== null)
        temp.classList.add('step-current');
    if(currtab !== null)
        currtab.style.display = 'block';
    if(currentStep === 4)
    {
        const formdata = new FormData(document.forms.regForm);
        formdata.append('cart', JSON.stringify(product_arr));
        const resp = await SendData('post', 'https://keli.com.ua/mail/form.php', formdata);
        if(resp.result === 'ok')
        {
            alert('Thank you for buying!');
        }
        else
        {
            alert('Error!');
        }
        currentStep = 1;
        document.querySelector(`.tab1`).style.display = 'block';
        document.querySelector(`.step:first-child`).classList.add('step-current');
    }
});


async function SendData(method, url, data)
{
    return new Promise((resolve, reject) =>
    {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onloadend = (e)=>
        {
            resolve(JSON.parse(xhr.response));
        }
        try{
        xhr.send(data);
        }
        catch{
            reject();
        }
    });
}


