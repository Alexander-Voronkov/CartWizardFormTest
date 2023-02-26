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
