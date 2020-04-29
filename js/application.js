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

let afterLoad = function() {
    loadDefaultData();
}

$(document).ready(afterLoad);