document.addEventListener('DOMContentLoaded', () => { //in order for code to be picked up by html file
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))

    const DisplayScore = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    
    const GRID_WIDTH = 10

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
    timerId = setInterval(moveDown, 1000)

    //assign functions to keyCodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            //rotate()
        } else if (e.keyCode === 39) {
            //moveRight()
        } else if (e.keyCode === 40) {
            //moveDown()
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
            random = Math.floor(Math.random() * allTetrominoes.length)
            current = allTetrominoes[random][currentRotation]
            currentPos = 4
            draw()
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







})