class shoppingCardItens {
    constructor (name, unityPrice, qty) {
        this.name = name;
        this.unityPrice = unityPrice;
        this.qty = qty;
    }

    totalItem() {
        return this.unityPrice * this.qty
    }

    lineTable() {
        return `<tr>
                <th>${this.name}</th>
                <td>${this.unityPrice}</td>
                <td><span>QTY</span><input type='number' value='${this.qty}'></input></td>
                <td><button>Cancel</button></td>
                <td>${this.totalItem()}</td>
                <tr>`
    }
}

let itensDefault = [new shoppingCardItens("Salmon" , 60 , 2),
                    new shoppingCardItens("Tuna" , 50, 3),
                    new shoppingCardItens("Carp" , 40, 2),
                    new shoppingCardItens("Pork" , 50, 2),
                    new shoppingCardItens("Beef" , 40, 4) ];

let loadDefaultData = function() {
    itensDefault.forEach( (itemDefault) => { 
        $('#main-table').append( itemDefault.lineTable() );
    }) 
}

let includeItem = function (event) {
    event.preventDefault();
    let newName = $(this).children('[name = name-item]').val();
    let newUnitaryPice = $(this).children('[name = unity-price]').val();
    let newQty = $(this).children('[name = qty]').val();
    //console.log(newName, newUnitaryPice, newQty);
    let myNewItem = new shoppingCardItens(newName, newUnitaryPice, newQty);
    $('#main-table').append( myNewItem.lineTable() );
    console.log(myNewItem);
}

let afterLoad = function() {
    loadDefaultData();
    $('#add-item').on('submit' , includeItem);
}

//------------------MAIN-----------------------

$(document).ready(afterLoad);

