function tima (container, endDate) {
  const display = num => num != 0 ? num : ''
  let $container = document.querySelector(container)
  if(!$container) throw new Error(`Container doesn't exists.`)
  let days, hours, minutes, seconds

  endDate = new Date(endDate).getTime()

  if (isNaN(endDate)) throw new Error('Invalid end date.')

  calculate()
  let timer = setInterval(calculate, 1000)

  function calculate() {
    const basicElem = document.getElementById('seconds')
    !basicElem && init($container)

    let startDate = new Date()
    startDate = startDate.getTime()
    let timeRemaining = parseInt((endDate - startDate) / 1000)
    
    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400)
      timeRemaining = (timeRemaining % 86400)
      hours = parseInt(timeRemaining / 3600)
      timeRemaining = (timeRemaining % 3600)
      minutes = parseInt(timeRemaining / 60)
      timeRemaining = (timeRemaining % 60)
      seconds = parseInt(timeRemaining)

      document.getElementById("days").innerHTML = display(days)
      document.getElementById("hours").innerHTML = display(hours)
      document.getElementById("minutes").innerHTML = display(minutes)
      document.getElementById("seconds").innerHTML = display(seconds)

    } else {
      $container.parentNode.removeChild($container)
      clearInterval(timer)
    }
  }

  function init (container) {
    ['days', 'hours', 'minutes', 'seconds'].forEach(time => {
      let el = document.createElement('h1')
      el.setAttribute('id', time)
      container.appendChild(el)
    })
  }
}