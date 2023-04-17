input.onButtonPressed(Button.A, function () {
    if (mode == 1) {
        if (left_paddle.get(LedSpriteProperty.Y) == 0) {
        	
        } else {
            left_paddle.change(LedSpriteProperty.Y, -1)
        }
    } else {
        if (player == 0) {
            if (left_paddle.get(LedSpriteProperty.Y) == 0) {
            	
            } else {
                right_paddle.change(LedSpriteProperty.Y, -1)
            }
        } else {
            if (left_paddle.get(LedSpriteProperty.Y) == 0) {
            	
            } else {
                left_paddle.change(LedSpriteProperty.Y, -1)
            }
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (mode == 1) {
        if (left_paddle.get(LedSpriteProperty.Y) == 4) {
        	
        } else {
            left_paddle.change(LedSpriteProperty.Y, 1)
        }
    } else {
        if (player == 0) {
            if (left_paddle.get(LedSpriteProperty.Y) == 4) {
            	
            } else {
                right_paddle.change(LedSpriteProperty.Y, 1)
            }
        } else {
            if (left_paddle.get(LedSpriteProperty.Y) == 4) {
            	
            } else {
                left_paddle.change(LedSpriteProperty.Y, 1)
            }
        }
    }
})
input.onGesture(Gesture.Shake, function () {
    if (player == 0) {
        player += 1
    } else {
        player = 0
    }
})
function ball_move () {
    while (keeplooping == true) {
        if (mode == 2) {
            ball.move(1)
            basic.pause(500)
            if (ball.isTouching(left_paddle) || ball.isTouching(right_paddle)) {
                ball.ifOnEdgeBounce()
                music.playTone(659, music.beat(BeatFraction.Whole))
            } else if (ball.isTouchingEdge() && ball.get(LedSpriteProperty.X) == 0) {
                ball.delete()
                music.playMelody("G F E E D D C C ", 555)
                basic.showString("left side lost")
                break;
            } else if (ball.isTouchingEdge() && ball.get(LedSpriteProperty.X) == 4) {
                ball.delete()
                music.playMelody("G F E E D D C C ", 555)
                basic.showString("right side lost")
                break;
            } else if (ball.isTouchingEdge()) {
                music.playTone(523, music.beat(BeatFraction.Whole))
                ball.turn(Direction.Right, randint(160, 200))
            }
        } else {
            ball.move(1)
            basic.pause(500)
            if (ball.isTouching(left_paddle)) {
                ball.ifOnEdgeBounce()
                music.playTone(659, music.beat(BeatFraction.Whole))
                count += 1
            } else if (ball.isTouchingEdge() && ball.get(LedSpriteProperty.X) == 0) {
                ball.delete()
                music.playMelody("G F E E D D C C ", 555)
                basic.showString("you lost")
                break;
            } else if (ball.isTouchingEdge()) {
                if (ball.get(LedSpriteProperty.Direction) > 67 && ball.get(LedSpriteProperty.Direction) < 113 || ball.get(LedSpriteProperty.Direction) > 256 && ball.get(LedSpriteProperty.Direction) < 293) {
                    if (ball.get(LedSpriteProperty.X) == 0) {
                        ball.turn(Direction.Right, ball.get(LedSpriteProperty.Direction) - 10)
                    } else {
                        ball.turn(Direction.Left, ball.get(LedSpriteProperty.Direction) - 10)
                    }
                }
                music.playTone(523, music.beat(BeatFraction.Whole))
                ball.turn(Direction.Right, randint(160, 200))
            }
            if (count == 10) {
                basic.showString("you won")
                break;
            }
        }
    }
}
let count = 0
let player = 0
let keeplooping = false
let right_paddle: game.LedSprite = null
let left_paddle: game.LedSprite = null
let ball: game.LedSprite = null
let mode = 0
mode = 0
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
basic.showLeds(`
    . . . . .
    . . # . .
    . # # # .
    . . # . .
    . . . . .
    `)
basic.showLeds(`
    . . # . .
    . # # # .
    # # # # #
    . # # # .
    . . # . .
    `)
basic.showLeds(`
    . # # # .
    # # # # #
    # # # # #
    # # # # #
    . # # # .
    `)
basic.showLeds(`
    . . # . .
    . # # # .
    # # # # #
    . # # # .
    . . # . .
    `)
basic.showLeds(`
    . . . . .
    . . # . .
    . # # # .
    . . # . .
    . . . . .
    `)
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
ball = game.createSprite(2, 2)
ball.turn(Direction.Right, randint(0, 360))
ball.move(1)
basic.pause(100)
for (let index = 0; index < randint(5, 10); index++) {
    ball.move(1)
    basic.pause(100)
    if (ball.isTouchingEdge()) {
        ball.turn(Direction.Right, randint(160, 200))
    }
}
while (ball.get(LedSpriteProperty.X) != 2 || ball.get(LedSpriteProperty.Y) != 2) {
    ball.move(1)
    basic.pause(100)
    if (ball.isTouchingEdge()) {
        ball.turn(Direction.Right, randint(160, 200))
    }
}
basic.showString("pong")
ball.delete()
while (mode == 0) {
    if (input.buttonIsPressed(Button.A)) {
        mode = 1
        left_paddle = game.createSprite(0, 2)
    } else if (input.buttonIsPressed(Button.B)) {
        mode = 2
        right_paddle = game.createSprite(4, 2)
        left_paddle = game.createSprite(4, 2)
    }
}
keeplooping = true
ball = game.createSprite(2, 2)
ball.turn(Direction.Right, randint(0, 360))
player = 0
count = 0
basic.pause(500)
ball_move()
