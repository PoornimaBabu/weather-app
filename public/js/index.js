const weather = document.querySelector('form')
const address = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weather.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchLocation  = address.value

    const url = '/weather?location=' + searchLocation

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = ""
                messageTwo.textContent = data.error
            } else {
                console.log(data.forecast)
                messageOne.textContent = "Weather forecast for " + data.location
                messageTwo.textContent = data.forecast
            }
            
        })
    })

})

