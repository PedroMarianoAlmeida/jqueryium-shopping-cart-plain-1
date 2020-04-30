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
                <td><span>QTY</span><input class="input-qty" type='number' value='${this.qty}'></input></td>
                <td><button class="delete-item">Cancel</button></td>
                <td>${this.totalItem()}</td>
                </tr>`
    }

    includeToMainTable() {
        $('#main-table').append( this.lineTable() );
    }
}

let itensDefault = [new shoppingCardItens("Salmon" , 60 , 2),
                    new shoppingCardItens("Tuna" , 50, 3),
                    new shoppingCardItens("Carp" , 40, 2),
                    new shoppingCardItens("Pork" , 50, 2),
                    new shoppingCardItens("Beef" , 40, 4) ];

let loadDefaultData = function() {
    itensDefault.forEach( function(itemDefault) { 
       itemDefault.includeToMainTable( itemDefault.lineTable() );
    }) 
}

let includeItem = function (event) {
    event.preventDefault();
    let newName = $(this).children('[name = name-item]').val();
    let newUnitaryPice = $(this).children('[name = unity-price]').val();
    let newQty = $(this).children('[name = qty]').val();
    let myNewItem = new shoppingCardItens(newName, newUnitaryPice, newQty);
    myNewItem.includeToMainTable( myNewItem.lineTable() );
}

var timeOut;
let updateQty = function() {
    clearTimeout(timeOut);
    
    //This need to be outside because of this reference
    let currentRow = $(this).closest('tr');
    let qty = $(this).val();
    if(qty <= 1) {
        $(this).val(1);
    }

    timeOut = setTimeout( function() {        
        let name = currentRow.children('th').html();
        let unityPrice = currentRow.children('td').html();           
        let modifyItem = new shoppingCardItens(name, unityPrice, qty);    
        currentRow.replaceWith( modifyItem.lineTable() );
    } , 500);   
}

let deleteItem = function () {
    $(this).closest('tr').remove();
}

//------------------MAIN-----------------------


$(document).ready( function(){
    loadDefaultData();
    $('#add-item').on('submit' , includeItem);
    $('.input-qty').on('input' , updateQty);
    $('.delete-item').on('click' , deleteItem);
});

