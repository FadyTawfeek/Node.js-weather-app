console.log('client side javascript file is loaded')



const weatherForm = document.querySelector('form') //this selects items from where the app.js file is called, it can select by input name or class or id etc
const searchLocation = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => { //listener has 2 params, first is type of listener like submit or hover etc, second is the callback function
    e.preventDefault() //this prevents the browser from reloading and causing to refresh and delete everything on the page

    const searchLocationValue = searchLocation.value //takes the value from the input item in the form
    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch('/weather?address=' + searchLocationValue).then((response) => { //all the response coming from this link will be stored in data variable, which has error, address_entered, location etc
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = 'Sorry'
                return msg2.textContent = data.error
            }
            const locationToShow = 'Location is: ' + data.location
            msg1.textContent = locationToShow

            const forecastToShow = 'Summary is: ' + data.summary + ' Temperature is:  ' + data.temperature + ', and rain probability is: '+ data.rainProbability + '%'
            msg2.textContent = forecastToShow

        })
    })


})