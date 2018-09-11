export default function tima (option) {
    option.append.insertAdjacentHTML('afterend', getTemplate(option.text))

    let $container = document.querySelector(option.container)
    if(!$container) throw new Error(`Container doesn't exists.`)
    
    let days, hours, minutes, seconds
    let endTime = new Date(option.endDate).getTime()

    console.log("option.endDate", option.endDate)
    console.log("endTime", endTime)

    if (isNaN(endTime)) throw new Error('Invalid end date.')
  
    calculate()
    let timer = setInterval(calculate, 1000)
  
    function calculate() {
      const basicElem = document.getElementById('seconds')
  
      let startDate = new Date()
      startDate = startDate.getTime()
      let timeRemaining = parseInt((endTime - startDate) / 1000)
      
      if (timeRemaining >= 0) {
        days = parseInt(timeRemaining / 86400)
        timeRemaining = (timeRemaining % 86400)
        hours = parseInt(timeRemaining / 3600)
        timeRemaining = (timeRemaining % 3600)
        minutes = parseInt(timeRemaining / 60)
        timeRemaining = (timeRemaining % 60)
        seconds = parseInt(timeRemaining)
        
        appendNumber(document.getElementById("days"), days)
        appendNumber(document.getElementById("hours"), hours)
        appendNumber(document.getElementById("minutes"), minutes)
        appendNumber(document.getElementById("seconds"), seconds)
        removeZeroDigit()
      } else {
        $container.parentNode.removeChild($container)
        clearInterval(timer)
      }
    }
  
    function getTemplate (text) {
      return `<style>
        #countdown {
          padding: 10px 0;
          text-align: center;
        }
    
        #countdown .digit {
          font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif!important;
          font-size: 45px;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 0;
        }
    
        #countdown .text {
          font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif!important;
          text-transform: uppercase;
          margin-bottom: 0;
          font-size: 17px;
        }
    
        #countdown li p {
          margin: 0;
        }
    
        #countdown li {
          display: inline-block;
          margin: 0 8px;
          text-align: center;
          position: relative;
        }
    
        #countdown li:after {
          content: ":";
          position: absolute;
          top: 22px;
          right: -13px;
          font-size: 32px;
          vertical-align: -50%;
        }
    
        #countdown li:last-of-type:after {
          content: "";
        }
  
        #text {
          padding: 4px 0;
          font-weight: 400;
        }
  
      </style>
      <div id="countdown">
        <h2 id="text">${text}</h2>
        <li>
          <p class="digit" id="days"></p>
          <p class="text">일</p>
        </li>
        <li>
          <p class="digit" id="hours"></p>
          <p class="text">시간</p>
        </li>
        <li>
          <p class="digit" id="minutes"></p>
          <p class="text">분</p>
        </li>
        <li>
          <p class="digit" id="seconds"></p>
          <p class="text">초</p>
        </li>
      </div>
      `
    }
  
    function appendNumber (elem, digits) {
      if (elem) elem.innerHTML = `0${digits}`.slice(-2)
    }
  
    function removeZeroDigit () {
      let allElem = document.querySelectorAll('#countdown li')
  
      if(allElem.length === 4) {
        let firstElem = allElem[0]
        let firstDigit = firstElem.querySelector('p').innerText
        if(!parseInt(firstDigit)) firstElem.parentNode.removeChild(firstElem)
      }
    }
  }
  
