console.log('Client side Javascript is loaded!')

const fetchValue = (address) => {
    const url = '/weather?address='+address;
    fetch(url).then((response) => {
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageError.textContent = data.error;
            messageOne.textContent = '';
            messageTwo.textContent = '';
        }else{
            messageOne.textContent = 'Forecast report: ' +'\r\n'+ data.forecast;
            messageTwo.textContent = 'Location is: '+ data.location;
            messageError = '';
            console.log('Forecase: '+data.forecast)
            console.log('Location: '+data.location)
        }
    })
})
}

const inputSelector = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageError = document.querySelector('#message-3')

inputSelector.addEventListener('submit', (e) => {
    messageTwo.textContent = 'Please wait...';
    messageOne.textContent = '';
    messageError.textContent = '';
    e.preventDefault()
    console.log('Fetching forecast for: '+search.value)
    fetchValue(search.value)
    
})