console.log('client side javascript file is loaded!')
const wform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
wform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    message1.textContent = 'loading'
    const l = 'http://localhost:3000/weather?address=' + location
    fetch(l).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error
                message2.textContent = ''
            }
            else{
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})