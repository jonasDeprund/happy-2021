document.addEventListener('DOMContentLoaded', () => {
  // Cibler les elements du jeu
  const bird = document.querySelector('.bird')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')

  // Initialise elements
  let birdLeft = 220
  let birdBottom = 500
  let gravity = 2
  let isGameOver = false
  let gap = 430

  // lancer la fontion du debut du jeu
  function startGame() {
    birdBottom -= gravity
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'
  }

  // lancer la fonction
  let gameTimerId = setInterval(startGame, 20)
  //clearInterval(timerId)

  // Add contols keyboard
  function control(e) {
    if (e.keyCode === 32) {
      jump()
    }
  }

  function jump() {
    if (birdBottom < 650) birdBottom += 50
    bird.style.bottom = birdBottom + 'px'
    console.log(birdBottom)
  }

  document.addEventListener('keyup', control)

  // Create obstacle
  function generateObstacle() {
    // Create random position
    let randomPositionY = Math.random() * 200
    let randomPositionX = Math.random() * 100

    let obstacleLeft = randomPositionY + 500
    let obstacleBottom = randomPositionX

    //mecanisme
    const obstacle = document.createElement('div')
    const topObstacle = document.createElement('div')
    if (!isGameOver) {
      obstacle.classList.add('obstacle')
      topObstacle.classList.add('topObstacle')
    }
    gameDisplay.appendChild(obstacle)
    gameDisplay.appendChild(topObstacle)
    obstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.left = obstacleLeft + randomPositionY + 'px'
    obstacle.style.bottom = obstacleBottom + 'px'
    topObstacle.style.bottom = obstacleBottom + gap + 'px'

    // Move obstacle
    function moveObstacle() {
      obstacleLeft -= 2
      obstacle.style.left = obstacleLeft + 'px'
      topObstacle.style.left = obstacleLeft + 'px'

      if (obstacleLeft === 0) {
        clearInterval(timerId)
        gameDisplay.removeChild(obstacle)
        gameDisplay.removeChild(topObstacle)
      }

      //Si l'oiseau touche le sol
      // Si l'oiseau touche un obstacle
      if (
        (obstacleLeft > 110 &&
          obstacleLeft < 280 &&
          birdLeft === 220 &&
          birdBottom < obstacleBottom + 180) ||
        birdBottom === 0
      ) {
        gameOver()
        clearInterval(timerId)
      }
    }

    let timerId = setInterval(moveObstacle, 20)
    if (!isGameOver) setTimeout(generateObstacle, 4000)
  }

  generateObstacle()

  // Fonction du gameover
  function gameOver() {
    clearInterval(gameTimerId)
    //console.log('game over')
    isGameOver = true
    document.removeEventListener('keyUp', control)
  }
})
