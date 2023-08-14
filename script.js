// Variables
let currentInput = document.querySelector('.currentInput');
let answerScreen = document.querySelector('.answerScreen');
let buttons = document.querySelectorAll('button');

function get_phrases_data(phrase, operator) {
    phrases = phrase.split(operator)
    end_of_loop = phrases.length
    if (phrase.endsWith('+')) {
        end_of_loop = phrases.length - 1
    }
    return {
        phrases: phrases,
        end_of_loop: end_of_loop
    }
}

// evaluate
function eval(phrase) {
    result = 0.0
    undefind_condition = /[~!@#$^&()_{}[\]|\\.,;:'"?><]/.test(phrase)
    if (undefind_condition) {
        return 'undefined'
    }
    if (phrase.includes('+')) {
        const phrases_data = get_phrases_data(phrase, '+')
        let phrases = phrases_data.phrases
        let end_of_loop = phrases_data.end_of_loop
        result = parseFloat(eval(phrases[0]))
        for (let i = 1; i < end_of_loop; i++) {
            result += parseFloat(eval(phrases[i]))
        }
        result = result.toString()

    } else if (phrase.includes('-')) {
        const phrases_data = get_phrases_data(phrase, '-')
        let phrases = phrases_data.phrases
        let end_of_loop = phrases_data.end_of_loop
        result = parseFloat(eval(phrases[0]))
        for (let i = 1; i < end_of_loop; i++) {
            result -= parseFloat(eval(phrases[i]))
        }
        result = result.toString()
    } else if (phrase.includes('*')) {
        const phrases_data = get_phrases_data(phrase, '*')
        let phrases = phrases_data.phrases
        let end_of_loop = phrases_data.end_of_loop
        result = parseFloat(eval(phrases[0]))
        for (let i = 1; i < end_of_loop; i++) {
            result *= parseFloat(eval(phrases[i]))
        }
        result = result.toString()
    } else if (phrase.includes('/')) {
        const phrases_data = get_phrases_data(phrase, '/')
        let phrases = phrases_data.phrases
        let end_of_loop = phrases_data.end_of_loop
        result = parseFloat(eval(phrases[0]))
        for (let i = 1; i < end_of_loop; i++) {
            result /= parseFloat(eval(phrases[i]))
        }
        result = result.toString()
    } else if (phrase.includes('%')) {
        const phrases_data = get_phrases_data(phrase, '%')
        let phrases = phrases_data.phrases
        let end_of_loop = phrases_data.end_of_loop
        result = parseFloat(eval(phrases[0]))
        for (let i = 1; i < end_of_loop; i++) {
            result %= parseFloat(eval(phrases[i]))
        }
        result = result.toString()
    } else {
        result = phrase
    }

    return result
}

// Calculator Display
let realTimeScreenValue = []

// Get value of any button clicked and display to the screen
buttons.forEach((btn) => {

    btn.addEventListener("click", () => {
        // when clicked button is not erased button or cleared button
        if (!btn.id.match('erase') && !btn.id.match('clear')) {
            // To display value on btn press
            realTimeScreenValue.push(btn.value)
            currentInput.innerHTML = realTimeScreenValue.join('');

            // To evaluate answer in real time
            if (btn.classList.contains('num_btn')) {
                answerScreen.innerHTML = eval(realTimeScreenValue.join(''));
            }
        }

        // When clear button is clicked
        if (btn.id.match('clear')) {
            realTimeScreenValue = [];
            answerScreen.innerHTML = 0;
            currentInput.className = 'currentInput'
            answerScreen.className = 'answerScreen';
            answerScreen.style.color = " rgba(150, 150, 150, 0.87)";
        }

        // When erase button is clicked
        if (btn.id.match('erase')) {
            realTimeScreenValue.pop();
            currentInput.innerHTML = realTimeScreenValue.join('');
            answerScreen.innerHTML = eval(realTimeScreenValue.join(''));
        }

        // When clicked button is evaluate button
        if (btn.id.match('evaluate')) {
            currentInput.className = 'answerScreen';
            answerScreen.className = 'currentInput';
            answerScreen.style.color = "white";
        }

        // To prevent undefined error in screen
        if (typeof eval(realTimeScreenValue.join('')) == 'undefined') {
            answerScreen.innerHTML = 0
        }
    })
})