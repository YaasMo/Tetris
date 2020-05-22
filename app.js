document.addEventListener('DOMContentLoaded', () => { //in order for code to be picked up by html file
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))

    const displayScore = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    
    const GRID_WIDTH = 10
    let nextRandom = 0
    let score = 0
    let timerId

    //defining the tetriminoes
    const lTetromino = [ 
        //defining each rotation of the l shaped tetromino
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2], 
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
      ]

    const zTetromino = [
        //defining each rotation of the z shaped tetromino
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
      ]
    
      const tTetromino = [
        //defining each rotation of the t shaped tetromino
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
      ]
    
      const oTetromino = [
        //defining each rotation of the o shaped tetromino
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
      ]
    
      const iTetromino = [
        //defining each rotation of the i shaped tetromino
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
      ]
    
    const allTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPos = 4
    let currentRotation = 0

    //randomly select a tetromino rotation from all possibilities
    let randomShape = Math.floor(Math.random() * allTetrominoes.length)
    let randomRotation = Math.floor(Math.random() * allTetrominoes[0].length) // unused for now
    let current = allTetrominoes[randomShape][0]

    //draw the current tetromino (selected above)
    function draw() {
        current.forEach(index => {
            squares[currentPos + index].classList.add('tetromino')
        })
    }

    //undraw the current tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPos + index].classList.remove('tetromino')
        })
    }

    //make the tetromino move down the grid every second
    // timerId = setInterval(moveDown, 1000)

    //assign functions to keyCodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control) //attach key listener to HTML doc (index.html)

    //move down function
    function moveDown() {
        undraw()
        currentPos += GRID_WIDTH
        draw()
        freeze()
    }

    //freeze function
    function freeze() {
        if(current.some(index => squares[currentPos + index + GRID_WIDTH].classList.contains('taken'))) {
            current.forEach(index => squares[currentPos + index].classList.add('taken'))
            
            //let a new tetromino fall from the top of the grid
            randomShape = nextRandom
            nextRandom = Math.floor(Math.random() * allTetrominoes.length)
            current = allTetrominoes[randomShape][currentRotation]
            currentPos = 4
            draw()
            displayUpcoming()
            addScore()
            gameOver()
        }
    }

    //move the teromino to the left, accounting for boundaries or conflicting tetrominoes
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPos + index) % GRID_WIDTH === 0)

        if(!isAtLeftEdge) currentPos -= 1

        if(current.some(index => squares[currentPos + index].classList.contains('taken'))) {
            currentPos += 1
        }

        draw()
    }

    //move the teromino to the right, accounting for boundaries or conflicting tetrominoes
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPos + index) % GRID_WIDTH === GRID_WIDTH - 1)

        if(!isAtRightEdge) currentPos += 1

        if(current.some(index => squares[currentPos + index].classList.contains('taken'))) {
            currentPos -= 1
        }

        draw()
    }

    //rotate the tetromino
    function rotate() {
        undraw()
        currentRotation++
        if(currentRotation == current.length) { //wrap around array of rotations
            currentRotation = 0
        }
        current = allTetrominoes[randomShape][currentRotation]
        draw()
    }

    //preview upcoming tetromino in the side-gride
    const displaySquares = document.querySelectorAll('.side-grid div')
    const displayWidth = 4
    let displayIndex = 0

    //the Tetreminoes without rotations
    const upcomingTetreminoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], // lTetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zTetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTetromino
        [0, 1, displayWidth, displayWidth + 1], // oTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] // iTetromino
    ]

    //display the shape in the side-grid display
    function displayUpcoming() {
        //remove any possible existing tetromino from side grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
        upcomingTetreminoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }

    //add functionality to the button
    startBtn.addEventListener('click', () => {
        if(timerId) { // timerId not null
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * allTetrominoes.length)
            displayUpcoming()
        }
    })

    //add a score count
    function addScore() {
        for (let i = 0; i < 199; i += GRID_WIDTH) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                displayScore.innerHTML= score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                })
                const squaresRemoved = squares.splice(i, GRID_WIDTH)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    //end game when no more space for new tetremino
    function gameOver() {
        if(current.some(index => squares[currentPos + index].classList.contains('taken'))) {
            displayScore.innerHTML = 'end'
            clearInterval(timerId)
        }
    }


})