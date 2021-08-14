const calculator = document.querySelector('.calculator');
const buttons = document.querySelector('.calculator__buttons');
const display = document.querySelector('.calculator__display');


// 변화되는 operator에 따라 n1 과 n2 를 계산하는 함수 

function calculate(n1, operator, n2) {
    let result = 0;
    if(operator === '+'){
        result = Number(n1) + Number(n2);
    }
    if(operator === '-'){
        result = Number(n1) - Number(n2);
    }
    if(operator === '*'){
        result = Number(n1) * Number(n2);
    }
    if(operator === '/'){
        result = Number(n1) / Number(n2);
    }
    return String(result);
}

// 버튼을 눌렀을때 작동하는 함수

let firstNum, operatorForAdvanced, previousKey, previousNum;

buttons.addEventListener('click', (event) => {
    const target = event.target; 
  const action = target.classList[0]; 
  const buttonContent = target.textContent;
  const buttonContainerArray = buttons.children;

  if (target.matches('button')) {
    for (let i = 0; i < buttonContainerArray.length; i++) {
      const childrenArray = buttonContainerArray[i].children;
      for (let j = 0; j < childrenArray.length; j++) {
        childrenArray[j].classList.remove('isPressed');
      }
    }

    if (action === 'number') {
      if (display.textContent === '0' || previousKey === 'operator' || previousKey === 'calculate') {
        display.textContent = buttonContent;
      } else {
        display.textContent = display.textContent + buttonContent;
      }
      previousKey = 'number';
    }

    if (action === 'operator') {
      target.classList.add('isPressed');
      if (firstNum && operatorForAdvanced && previousKey !== 'operator' && previousKey !== 'calculate') {
        display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent);
      }
      firstNum = display.textContent;
      operatorForAdvanced = buttonContent;
      previousKey = 'operator';
    }

    if (action === 'decimal') {
      if (!display.textContent.includes('.') && previousKey !== 'operator') {
        display.textContent = display.textContent + '.';
      } else if (previousKey === 'operator') {
        display.textContent = '0.';
      }
      previousKey = 'decimal';
    }

    if (action === 'clear') {
      firstNum = undefined;
      operatorForAdvanced = undefined;
      previousNum = undefined;
      previousKey = 'clear';
      display.textContent = '0';
    }

    if (action === 'calculate') {
      if (firstNum) {
        if (previousKey === 'calculate') {
          display.textContent = calculate(display.textContent, operatorForAdvanced, previousNum);
        } else {
          previousNum = display.textContent;
          display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent);
        }
      }
      previousKey = 'calculate';
    }
  }
})