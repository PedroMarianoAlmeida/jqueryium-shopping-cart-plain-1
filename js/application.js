//Convert a nuber to currency USD format. Found in https://flaviocopes.com/how-to-format-number-as-currency-javascript/
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
//-----------------------------------------------------------

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
                <td>${formatter.format( this.totalItem() ) }</td>
                <td class='total-item' style='display:none;'>${this.totalItem()}</td>
                </tr>`
    }

    includeToMainTable() {
        $('#main-table').append( this.lineTable() );
    }
}

let updatingTotalValue = function() {
    let sum = 0;
    $('.total-item').each( function(){
        sum += Number( $(this).text() );
    })

    $('#total-price').text( formatter.format(sum) );
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

    updatingTotalValue();
}

let includeItem = function (event) {
    event.preventDefault();
    let newName = $(this).children('[name = name-item]').val();
    let newUnitaryPice = $(this).children('[name = unity-price]').val();
    let newQty = $(this).children('[name = qty]').val();
    let myNewItem = new shoppingCardItens(newName, newUnitaryPice, newQty);
    myNewItem.includeToMainTable( myNewItem.lineTable() );
    updatingTotalValue();
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
        updatingTotalValue();
    } , 500);   
}

let deleteItem = function () {
    $(this).closest('tr').remove();
    updatingTotalValue();
}

//------------------MAIN-----------------------
$(document).ready( function(){
    loadDefaultData();
    $('#add-item').on('submit' , includeItem);
    $(document).on('input', '.input-qty', updateQty);
    $(document).on('click' , '.delete-item' , deleteItem);
});

