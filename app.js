document.addEventListener('DOMContentLoaded', () => {
  // Cibler les elements du jeu
  const bird = document.querySelector('.bird')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')
  const currentScore = document.querySelector('.currentscore')
  const bestScore = document.querySelector('.bestscore')
  const setupScreen = document.querySelector('.setup-screen')

  // Initialise elements
  let birdLeft = 220
  let birdBottom = 500
  let gravity = 3
  let gamePlaying = false
  let gap = 430

  // Score players
  let printCurrentScore = 0
  let printBestScore = 0

  //SETTUP

  document.addEventListener('click', function () {
    if ((gamePlaying = true)) {
      setupScreen.classList.remove('visible')
      playGame()
    }
  })

  function control(e) {
    if (e.keyCode === 32) {
      jump()
    }
  }

  function jump() {
    if (birdBottom < 650) birdBottom += 70
    bird.style.bottom = birdBottom + 'px'
  }

  document.addEventListener('keyup', control)

  // GAME
  function setupGame() {
    setupScreen.classList.add('visible')
    bird.style.bottom = 320 + 'px'
    bird.style.left = 475 + 'px'
    gamePlaying = true
  }

  function playGame() {
    gamePlaying = true
    function initialise() {
      birdBottom -= gravity
      bird.style.bottom = birdBottom + 'px'
      bird.style.left = birdLeft + 'px'

      currentScore.innerHTML = `Score actuel ${printCurrentScore}`
      bestScore.innerHTML = `Meilleur score ${printBestScore}`
    }

    let gameTimerId = setInterval(initialise, 20)

    function generateObstacle() {
      let obstacleLeft = 700
      let randomHeight = Math.random() * 100

      let obstacleBottom = randomHeight

      const topObstacle = document.createElement('div')
      const bottomObstacle = document.createElement('div')

      if (gamePlaying) {
        topObstacle.classList.add('top_obstacle')
        bottomObstacle.classList.add('bottom_obstacle')
      }

      gameDisplay.appendChild(topObstacle)
      gameDisplay.appendChild(bottomObstacle)

      topObstacle.style.left = obstacleLeft + 'px'
      bottomObstacle.style.left = obstacleLeft + 'px'

      topObstacle.style.bottom = obstacleBottom + 'px'
      bottomObstacle.style.bottom = obstacleBottom + gap + 'px'

      function moveObstacle() {
        obstacleLeft -= 3
        topObstacle.style.left = obstacleLeft + 'px'
        bottomObstacle.style.left = obstacleLeft + 'px'

        if (obstacleLeft === 0) {
          clearInterval(timerId)
          gameDisplay.removeChild(topObstacle)
          gameDisplay.removeChild(bottomObstacle)
          printCurrentScore++
          printBestScore = Math.max(printBestScore, printCurrentScore)
        }
        if (
          (obstacleLeft > 110 &&
            obstacleLeft < 280 &&
            birdLeft === 220 &&
            (birdBottom < obstacleBottom + 180 ||
              birdBottom > obstacleBottom + gap - 50)) ||
          birdBottom <= 0
        ) {
          gameDisplay.removeChild(topObstacle)
          gameDisplay.removeChild(bottomObstacle)
          clearInterval(timerId)
          clearInterval(gameTimerId)
          gameOver()
        }
      }
      let timerId = setInterval(moveObstacle, 20)
      if (gamePlaying) setTimeout(generateObstacle, 4000)
    }
    generateObstacle()
  }

  function gameOver() {
    document.removeEventListener('keyup', control)
    console.log('Fin du jeu')
    setupGame()
  }

  setupGame()
})
