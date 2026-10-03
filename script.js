const bird = document.querySelector(".bird-png")
const game = document.querySelector(".game")

let birdTop = 200
let gravity = 2
let isGameOver = false

function gameOver() {
    if (isGameOver) return
    isGameOver = true
    alert("your game is over")
    location.reload()
}

setInterval(() => {
    if (isGameOver) return
    birdTop += gravity
    bird.style.top = birdTop + "px"
    if (birdTop > game.clientHeight-50 || birdTop < -60) {
        gameOver()
    }
}, 20);

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        birdTop = birdTop - 60
    }
})

function createPipe() {
    if (isGameOver) return

    const pipeTop = document.createElement("div")
    const pipeBottom = document.createElement("div")

    pipeTop.className = "pipe"
    pipeBottom.className = "pipe"
    let gap = 100
    let gameHeight = game.clientHeight
    let maxHeight = gameHeight - gap - 70

    let topPipeHeight = Math.random() * maxHeight + 50
    let bottomPipeHeight = maxHeight - topPipeHeight - gap

    pipeTop.style.height = topPipeHeight + "px"
    pipeBottom.style.height = bottomPipeHeight + "px"

    pipeTop.style.top = 0 + "px"
    pipeBottom.style.bottom = 0 + "px"

    game.append(pipeTop, pipeBottom)

    let pipeLeft = game.clientWidth
    pipeTop.style.left = pipeLeft + "px"
    pipeBottom.style.left = pipeLeft + "px"

    let move = setInterval(() => {
        if (isGameOver) {
            clearInterval(move)
            return
        }

        pipeLeft -= 2
        pipeTop.style.left = pipeLeft + "px"
        pipeBottom.style.left = pipeLeft + "px"

        let birdRect = bird.getBoundingClientRect()
        let topRect = pipeTop.getBoundingClientRect()
        let bottomRect = pipeBottom.getBoundingClientRect()

        let horizontalOverlap = birdRect.right > topRect.left && birdRect.left < topRect.right
        let hitTopPipe = birdRect.top < topRect.bottom
        let hitBottomPipe = birdRect.bottom > bottomRect.top

        if (horizontalOverlap && (hitTopPipe || hitBottomPipe)) {
            gameOver()
            clearInterval(move)
        }

        if (pipeLeft < -40) {
            pipeTop.remove()
            pipeBottom.remove()
            clearInterval(move)
        }
    }, 20);
}

setInterval(() => {
    createPipe()
}, 2000);