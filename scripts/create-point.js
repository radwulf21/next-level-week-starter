function populateUFs() {
    const ufSelect = document.querySelector( "select[name=uf]" )

    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

    fetch( url )
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUFs()

function getCities( event ) {
    const citySelect = document.querySelector( "select[name=city]" )
    const stateInput = document.querySelector( "input[name=state]" )

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch( url )
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}

document
    .querySelector( "select[name=uf]" )
    .addEventListener( "change", getCities )

//Itens de Coleta

const itemstoCollect = document.querySelectorAll( ".items-grid li" )

for( const item of itemstoCollect ) {

    item.addEventListener( "click", handleSelectedItem )
}

const collectedItems = document.querySelector( "input[name=items]" )

let SelectedItems = []

function handleSelectedItem( event ) {

    const itemLi = event.target

    itemLi.classList.toggle( "selected" ) //Adicionar ou remover classe do html com JS

    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados

    const alreadySelected = SelectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    } )

    //se estiver selecionado (-1 não está selecionado / 0 está selecionado)

    if( alreadySelected >= 0 ) {
        //tirar da selecao
        const filteredItems = SelectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        } )

        SelectedItems = filteredItems
    } 
    else {
        //se nao, adicionar a selecao
        SelectedItems.push( itemId )   
    }

    //atualizar o input tipo hidden escondido com os itens selecionado
    collectedItems.value = SelectedItems
}
