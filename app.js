const calculator = document.querySelector('.calculator');
const buttons = document.querySelector('.calculator__buttons');
const firstOperend = document.querySelector('.calculator__operend--left');
const operator = document.querySelector('.calculator__operator');
const secondOperend = document.querySelector('.calculator__operend--right');
const calculatedResult = document.querySelector('.calculator__result');


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

buttons.addEventListener('click', (event) => {
    const target = event.target;
    const action = target.classList[0];
    const buttonContent = target.textContent;

    if(target.matches('button')) {
        if(action === 'number') {
            if(firstOperend.textContent !== '0') {
                secondOperend.textContent = buttonContent;
            }else{
                firstOperend.textContent = buttonContent;
            }
            // console.log('우하하');
        }
        if(action === 'operator') {
            operator.textContent = buttonContent;
        }
        if(action === 'clear') {
            firstOperend.textContent = '0';
            operator.textContent = '+';
            secondOperend.textContent = '0';
            calculatedResult.textContent = '0';
        }
        if(action === 'calculate') {
            calculatedResult.textContent = calculate(firstOperend.textContent, operator.textContent, secondOperend.textContent);
        }
    }
})

const display = document.querySelector('.calculator__display--for-advanced');
let firstNum, operatorForAdvanced, previousKey, previousNum;

buttons.addEventListener('click', (event) => {
    const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  const buttonContainerArray = buttons.children;
  // ! 위 코드는 수정하지 마세요.

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