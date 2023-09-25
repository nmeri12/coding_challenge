//Task 1
function getSalesTax(item) {
    let taxRate;
    if (item.type === 'book' || item.type === 'food' || item.type === 'medical') {
        taxRate = 0;
    }
    else{
        taxRate = 0.1;
    }

    if (item.imported) {
        taxRate += 0.05;
    }

    return Math.ceil(item.price * taxRate / 0.05) * 0.05;
}


function displayReceipt(items) {
    let totalSalesTax = 0;
    let totalPrice = 0;
    let resultArr = [];

    items.forEach((item)=>{
        let salesTax = getSalesTax(item);
        let itemTotal = item.price + salesTax;
        // let itemTotal = item.quantity*  item.price + salesTax;
        totalSalesTax += salesTax;
        totalPrice += itemTotal;

        resultArr.push(`${item.quantity} ${item.name}: ${itemTotal.toFixed(2)}`);

    });

    resultArr.push(`Sales Taxes: ${totalSalesTax.toFixed(2)}`);
    resultArr.push(`Total: ${totalPrice.toFixed(2)}`);

    return resultArr;
}
