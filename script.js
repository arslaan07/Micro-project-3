document.addEventListener("DOMContentLoaded", () => {

    const display = document.querySelector('.display')
    const buttons = document.querySelectorAll('button')    
    const operators = ['+', '-', 'x', '/']
    let lastPressed = ''
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent
            if(lastPressed === '=') {
                display.textContent = ''
                lastPressed = ''
            }
            if(value === 'DEL')
                display.textContent = display.textContent.slice(0, -1)
            else if(value === 'RESET')
                display.textContent = ''
            else if(value >= '0' && value <= '9' || value === '.') {
                if(value === '.') {
                    if(display.textContent === '') display.textContent = `0${value}`
                    else if(!display.textContent.includes('.')) display.textContent += value
                    return
                }
                display.textContent += value
                   console.log(display.textContent)
                }    
                
            else if(operators.includes(value)) {
                if(display.textContent === '' || display.textContent === '-') {
                    if(value === '-') {
                        display.textContent = value
                    }
                    else {
                        display.textContent = `0${value}`
                    }    
                    return
                }
                let endsWithOperator = operators.some(op => display.textContent.endsWith(op))
                if(endsWithOperator) {
                    display.textContent = display.textContent.slice(0, -1) + value
                }
                else {
                    display.textContent += value
                }
                console.log(display.textContent)
            }
            else if(value === '=') {
                try {
                    const formattedString = display.textContent.replace(/\x/g, '*')
                    let result = eval(formattedString)
                    result = parseFloat(result.toFixed(3)) 
                    display.textContent = result

                } catch (error) {
                    display.textContent = 'Error'
                }
                lastPressed = '='
            }
        })
    })
})