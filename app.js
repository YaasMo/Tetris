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

    //draw the first rotation of the first tetrimono
    function draw() {
        current.forEach(index => {
            squares[currentPos + index].classList.add('tetromino')
        })
    }

    draw()
})