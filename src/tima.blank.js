export default function tima (option) {
    option.append.insertAdjacentHTML('afterend', getTemplate(option.text))
    if(!option.append) throw new Error(`elem doesn't exists.`)
    
    let days, hours, minutes, seconds
    let endTime = new Date(option.endDate).getTime()

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
        const widget = document.getElementById('countdown-widget')
        widget.parentNode.removeChild(widget)
        clearInterval(timer)
      }
    }
  
    function getTemplate (text) {
      return `<style>
        #countdown-widget {
          padding: 10px 0;
          text-align: center;
        }
    
        #countdown-widget .digit {
          font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif!important;
          font-size: 45px;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 0;
        }
    
        #countdown-widget .text {
          font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif!important;
          text-transform: uppercase;
          margin-bottom: 0;
          font-size: 17px;
        }
    
        #countdown-widget li p {
          margin: 0;
        }
    
        #countdown-widget li {
          display: inline-block;
          margin: 0 8px;
          text-align: center;
          position: relative;
        }
    
        #countdown-widget li:after {
          content: ":";
          position: absolute;
          top: 9px;
          right: -13px;
          font-size: 32px;
          vertical-align: -50%;
        }
    
        #countdown-widget li:last-of-type:after {
          content: "";
        }
  
        #text {
          font-size: 22px;
          font-weight: 500;
          font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif!important;
        }
  
      </style>
      <div id="countdown-widget">
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
      let allElem = document.querySelectorAll('#countdown-widget li')



      if(allElem.length === 4) {
        let firstElem = allElem[0]
        let firstDigit = firstElem.querySelector('p').innerText
        if(!parseInt(firstDigit)) firstElem.parentNode.removeChild(firstElem)
      }
    }
  }
  
