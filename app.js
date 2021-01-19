document.addEventListener('DOMContentLoaded', () => {
  // Cibler les elements du jeu
  const bird = document.querySelector('.bird')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')
  const currentScore = document.querySelector('.currentscore')
  const bestScore = document.querySelector('.bestscore')
  let startText = document.querySelector('.start-text')

  // Initialise elements
  let birdLeft = 220
  let birdBottom = 500
  let gravity = 3
  let isGameOver = true
  let gap = 430

  // Score players
  let printCurrentScore = 0
  let printBestScore = 0

  // SETUP SCREEN
  if (isGameOver === true) {
    bird.style.bottom = 384 + 'px'
    bird.style.left = 512 + 'px'

    startText.innerHTML = `Appuyer sur la barre d'espace pour commencer le jeu`
  }

  if (isGameOver === false) {
    function startGame() {
      birdBottom -= gravity
      bird.style.bottom = birdBottom + 'px'
      bird.style.left = birdLeft + 'px'

      currentScore.innerHTML = `Score actuel ${printCurrentScore}`
      bestScore.innerHTML = `Meilleur score ${printBestScore}`
    }

    // lancer la fonction
    let gameTimerId = setInterval(startGame, 20)

    // Add contols keyboard
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

    function generateObstacle() {
      // Create random position
      let obstacleLeft = 700
      let randomHeight = Math.random() * 100

      let obstacleBottom = randomHeight

      //mecanisme
      const topObstacle = document.createElement('div')
      const bottomObstacle = document.createElement('div')

      if (!isGameOver) {
        topObstacle.classList.add('top_obstacle')
        bottomObstacle.classList.add('bottom_obstacle')
      }

      //Ajout des divs
      gameDisplay.appendChild(topObstacle)
      gameDisplay.appendChild(bottomObstacle)

      //Position des divs
      topObstacle.style.left = obstacleLeft + 'px'
      bottomObstacle.style.left = obstacleLeft + 'px'

      topObstacle.style.bottom = obstacleBottom + 'px'
      bottomObstacle.style.bottom = obstacleBottom + gap + 'px'

      // Move obstacle
      function moveObstacle() {
        obstacleLeft -= 3
        topObstacle.style.left = obstacleLeft + 'px'
        bottomObstacle.style.left = obstacleLeft + 'px'

        if (obstacleLeft <= 0) {
          clearInterval(timerId)
          gameDisplay.removeChild(topObstacle)
          gameDisplay.removeChild(bottomObstacle)
        }

        // Mettre à jour le score actuel
        if (obstacleLeft <= 0) {
          printCurrentScore++

          printBestScore = Math.max(printBestScore, printCurrentScore)
        }

        //Si l'oiseau touche le sol
        // Si l'oiseau touche un obstacle
        if (
          (obstacleLeft > 110 &&
            obstacleLeft < 280 &&
            birdLeft === 220 &&
            (birdBottom < obstacleBottom + 180 ||
              birdBottom > obstacleBottom + gap - 50)) ||
          birdBottom === 0
        ) {
          gameDisplay.removeChild(topObstacle)
          gameDisplay.removeChild(bottomObstacle)
          setup()
          clearInterval(timerId)
        }

        function setup() {
          clearInterval(gameTimerId)
          isGameOver = true
          console.log(isGameOver)
        }
      }

      let timerId = setInterval(moveObstacle, 20)
      if (!isGameOver) setTimeout(generateObstacle, 4000)
    }
    generateObstacle()
  }
})
