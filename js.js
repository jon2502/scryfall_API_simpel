var send = document.getElementById('send')
var print = document.getElementById('print')
var cardsprint = document.getElementById('cardsprint')
const URL1 = 'https://api.scryfall.com/cards/autocomplete?q='
const URL2 = 'https://api.scryfall.com/cards/named?exact='
nameArray = []




print.addEventListener("click", loadDoc);

async function loadDoc() {
    const response = await fetch(`${URL1}${send.value}`);
    const jsonData = await response.json();
    nameArray.push(jsonData)
    console.log(jsonData);
    console.log(nameArray)
    generateimg()
}

async function generateimg(){
    for ( objects of nameArray[0].data) {
    console.log(objects)
    const response = await fetch(`${URL2}${objects}`);
    const cardData = await response.json();
    console.log(cardData)
    if ('card_faces' in cardData){
        const cards = document.createElement('div')
        cards.classList.add('cards')
        cards.innerHTML=`
        <img class="frontFace" src=${cardData.card_faces[0].image_uris.normal}>
        <img class="backSide" src=${cardData.card_faces[1].image_uris.normal}>
        `
        cardsprint.appendChild(cards)
    } else {
        const cards = document.createElement('div')
        cards.classList.add('cards')
        cards.innerHTML=`<img src=${cardData.image_uris.normal}>`
        cardsprint.appendChild(cards)
    }

    }
    clearArray()
}

function clearArray(){
    nameArray.length = 0
  }