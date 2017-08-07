import React, { Component } from 'react';

//every step snake move 20px in game board
var MOVE_PX = 20;

//every 120 miliseconds snake positions are updated and screen is refreshed
var THREAD_SLEEP = 120;

//game canvas sizes, you can change easly
var SCREEN_WIDTH = 480;
var SCREEN_HEIGHT = 640;

var BG_COLOR = "#24AE5E";

var snakeArray = [];

var snakeImage = {};

var snakeDirection = "right";

var apple = [];
var applePoint = 10;

var score = 0;

var isGameOver = false;
var restartCommand = false;
var isKeyApplied = false;


class Canvas extends Component {
    constructor(props) {
        super(props);

        //Snake textures for different parts of snake body
        snakeImage["headright"] = document.getElementById("headright");
        snakeImage["headup"] = document.getElementById("headup");
        snakeImage["headdown"] = document.getElementById("headdown");
        snakeImage["headleft"] = document.getElementById("headleft");
        snakeImage["bodyx"] = document.getElementById("bodyx");
        snakeImage["bodyy"] = document.getElementById("bodyy");
        snakeImage["corner1"] = document.getElementById("corner1");
        snakeImage["corner2"] = document.getElementById("corner2");
        snakeImage["corner3"] = document.getElementById("corner3");
        snakeImage["corner4"] = document.getElementById("corner4");
        snakeImage["taildown"] = document.getElementById("taildown");
        snakeImage["tailup"] = document.getElementById("tailup");
        snakeImage["tailleft"] = document.getElementById("tailleft");
        snakeImage["tailright"] = document.getElementById("tailright");

        apple.image = document.getElementById("apple");

        this.init();

    }

    componentDidMount() {
        this.timer = setInterval(this.snakeThread, THREAD_SLEEP);
    }

    shouldComponentUpdate() {

    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    //this function initialize all variables and snake position
    init = () => {
        snakeArray = [];
        snakeArray[0] = {x:260, y:400, style:"headright"};
        snakeArray[1] = {x:240, y:400, style:"bodyx"};
        snakeArray[2] = {x:220, y:400, style:"bodyx"};
        snakeArray[3] = {x:200, y:400, style:"tailright"};

        snakeDirection = "right";

        score = 0;

        isGameOver = false;
        restartCommand = false;
        isKeyApplied = false;

        this.setNewApple();
    }

    //get random point from game board
    getRandomPoint = () => {
        var x = Math.floor((Math.random() * (SCREEN_WIDTH / MOVE_PX))) * MOVE_PX;
        var y = Math.floor((Math.random() * (SCREEN_HEIGHT / MOVE_PX))) * MOVE_PX;
        return {x, y};
    }

    //check if random point on the snake or not
    isPointOnSnake = (randomPoint) => {
        for(var i=0;i<snakeArray.length;i++) {
            if(snakeArray[i].x === randomPoint.x && snakeArray[i].y === randomPoint.y) {
                return true;
            }
        }
        return false;
    }

    //get a valid random point for apple
    setNewApple = () => {
        var randomPoint = this.getRandomPoint();
        while(this.isPointOnSnake(randomPoint)) {
            randomPoint = this.getRandomPoint();
        }
        apple.x = randomPoint.x;
        apple.y = randomPoint.y;
    }

    snakeThread = () => {
        //check if game is over, if user presses 'R' restart the game
        if(isGameOver) {
            if(restartCommand) {
                this.init();
            }
            return;
        }

        //update snake position
        var x_tmp = snakeArray[0].x;
        var y_tmp = snakeArray[0].y;
        if(snakeDirection === "left") {
            snakeArray.unshift({x:x_tmp - MOVE_PX, y:y_tmp, style:"headleft"});
        }
        else if (snakeDirection === "up") {
            snakeArray.unshift({x:x_tmp, y:y_tmp - MOVE_PX, style:"headup"});
        }
        else if (snakeDirection === "right") {
            snakeArray.unshift({x:x_tmp + MOVE_PX, y:y_tmp, style:"headright"});
        }
        else if (snakeDirection === "down") {
            snakeArray.unshift({x:x_tmp, y:y_tmp + MOVE_PX, style:"headdown"});
        }

        var tmpItem = snakeArray.pop();

        //snake can move with mirror effect, that it can go other side if it touches
        //to bounds
        if(snakeArray[0].x < 0 && snakeDirection === "left")
            snakeArray[0].x = SCREEN_WIDTH - MOVE_PX;
        else if(snakeArray[0].x >= SCREEN_WIDTH && snakeDirection === "right")
            snakeArray[0].x = 0;
        else if(snakeArray[0].y < 0 && snakeDirection === "up")
            snakeArray[0].y = SCREEN_HEIGHT- MOVE_PX;
        else if(snakeArray[0].y >= SCREEN_HEIGHT && snakeDirection === "down")
            snakeArray[0].y = 0;


        isKeyApplied = true;


        //if snake eats apple, make snake bigger and request new apple on the map
        if(snakeArray[0].x === apple.x && snakeArray[0].y === apple.y) {
            snakeArray.push(tmpItem);
            this.setNewApple();
            score += applePoint;
        }


        //if snake touches itself game is over
        for(var i=1;i<snakeArray.length;i++) {
            if(snakeArray[0].x === snakeArray[i].x && snakeArray[0].y === snakeArray[i].y){
                isGameOver = true;
            }
        }


        for(i=1;i<snakeArray.length-1;i++) {
            if(snakeArray[i].y === snakeArray[i - 1].y && snakeArray[i].y === snakeArray[i + 1].y)
                snakeArray[i].style = "bodyx";
            else if(snakeArray[i].x === snakeArray[i - 1].x && snakeArray[i].x === snakeArray[i + 1].x)
                snakeArray[i].style = "bodyy";
            else
            {
                if(snakeArray[i].x === SCREEN_WIDTH - MOVE_PX && (snakeArray[i + 1].x === 0 || snakeArray[i - 1].x === 0) )
                {
                    if(snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x < snakeArray[i].x && snakeArray[i + 1].y > snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
                        snakeArray[i].style = "corner1";
                    else if(snakeArray[i + 1].x < snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y > snakeArray[i].y)
                        snakeArray[i].style = "corner1";
                    else if(snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x < snakeArray[i].x && snakeArray[i + 1].y < snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
                        snakeArray[i].style = "corner4";
                    else if(snakeArray[i + 1].x < snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y < snakeArray[i].y)
                        snakeArray[i].style = "corner4";
                }
                else if(snakeArray[i].x === 0 && (snakeArray[i + 1].x === SCREEN_WIDTH - MOVE_PX || snakeArray[i - 1].x === SCREEN_WIDTH - MOVE_PX) )
                {
                    if(snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x > snakeArray[i].x && snakeArray[i + 1].y > snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
                        snakeArray[i].style = "corner2";
                    else if(snakeArray[i + 1].x > snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y > snakeArray[i].y)
                        snakeArray[i].style = "corner2";
                    else if(snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x > snakeArray[i].x && snakeArray[i + 1].y < snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
                        snakeArray[i].style = "corner3";
                    else if(snakeArray[i + 1].x > snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y < snakeArray[i].y)
                        snakeArray[i].style = "corner3";
                }
                else if(snakeArray[i].y === 0 && (snakeArray[i + 1].y === SCREEN_HEIGHT - MOVE_PX|| snakeArray[i - 1].y === SCREEN_HEIGHT - MOVE_PX) )
                {
                    if(snakeArray[i + 1].x < snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y > snakeArray[i].y)
                        snakeArray[i].style = "corner3";
                    else if(snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x < snakeArray[i].x && snakeArray[i + 1].y > snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
                        snakeArray[i].style = "corner3";
                    else if(snakeArray[i + 1].x > snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y > snakeArray[i].y)
                        snakeArray[i].style = "corner4";
                    else if(snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x > snakeArray[i].x && snakeArray[i + 1].y > snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
                        snakeArray[i].style = "corner4";
                }
                else if(snakeArray[i].y === SCREEN_HEIGHT - MOVE_PX && (snakeArray[i + 1].y === 0 || snakeArray[i - 1].y === 0) )
                {
                    if(snakeArray[i + 1].x < snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y < snakeArray[i].y)
                        snakeArray[i].style = "corner2";
                    else if(snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x < snakeArray[i].x && snakeArray[i + 1].y < snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
                        snakeArray[i].style = "corner2";
                    else if(snakeArray[i + 1].x > snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y < snakeArray[i].y)
                        snakeArray[i].style = "corner1";
                    else if(snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x > snakeArray[i].x && snakeArray[i + 1].y < snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
                        snakeArray[i].style = "corner1";
                }
                else
                {
                    if(snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x > snakeArray[i].x && snakeArray[i + 1].y > snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
                        snakeArray[i].style = "corner1";
                    else if(snakeArray[i + 1].x < snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y > snakeArray[i].y)
                        snakeArray[i].style = "corner2";
                    else if(snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x < snakeArray[i].x && snakeArray[i + 1].y < snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
                        snakeArray[i].style = "corner3";
                    else if(snakeArray[i + 1].x > snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y < snakeArray[i].y)
                        snakeArray[i].style = "corner4";
                    else if(snakeArray[i + 1].x > snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y > snakeArray[i].y)
                        snakeArray[i].style = "corner1";
                    else if(snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x < snakeArray[i].x && snakeArray[i + 1].y > snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
                        snakeArray[i].style = "corner2";
                    else if(snakeArray[i + 1].x < snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y < snakeArray[i].y)
                        snakeArray[i].style = "corner3";
                    else if(snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x > snakeArray[i].x && snakeArray[i + 1].y < snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
                        snakeArray[i].style = "corner4";
                }
            }
        }

        //determine the tail shape
        if(snakeArray[snakeArray.length - 1].x === SCREEN_WIDTH - MOVE_PX && snakeArray[snakeArray.length - 2].x === 0)
            snakeArray[snakeArray.length - 1].style = "tailright";
        else if(snakeArray[snakeArray.length - 1].y === SCREEN_HEIGHT - MOVE_PX && snakeArray[snakeArray.length - 2].y === 0)
            snakeArray[snakeArray.length - 1].style = "taildown";
        else if(snakeArray[snakeArray.length - 1].x === 0 && snakeArray[snakeArray.length - 2].x === SCREEN_WIDTH - MOVE_PX)
            snakeArray[snakeArray.length - 1].style = "tailleft";
        else if(snakeArray[snakeArray.length - 1].y === 0 && snakeArray[snakeArray.length - 2].y === SCREEN_HEIGHT - MOVE_PX)
            snakeArray[snakeArray.length - 1].style = "tailup";
        else if(snakeArray[snakeArray.length - 2].x > snakeArray[snakeArray.length - 1].x && snakeArray[snakeArray.length - 2].y === snakeArray[snakeArray.length - 1].y)
            snakeArray[snakeArray.length - 1].style = "tailright";
        else if(snakeArray[snakeArray.length - 2].x === snakeArray[snakeArray.length - 1].x && snakeArray[snakeArray.length - 2].y > snakeArray[snakeArray.length - 1].y)
            snakeArray[snakeArray.length - 1].style = "taildown";
        else if(snakeArray[snakeArray.length - 2].x < snakeArray[snakeArray.length - 1].x && snakeArray[snakeArray.length - 2].y === snakeArray[snakeArray.length - 1].y)
            snakeArray[snakeArray.length - 1].style = "tailleft";
        else if(snakeArray[snakeArray.length - 2].x === snakeArray[snakeArray.length - 1].x && snakeArray[snakeArray.length - 2].y < snakeArray[snakeArray.length - 1].y)
            snakeArray[snakeArray.length - 1].style = "tailup";

        this.updateCanvas();
    }


    //this function draws the game on canvas
    updateCanvas = () => {
        var ctx = this.refs.canvas.getContext('2d');

        //clean the screen
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0,0, SCREEN_WIDTH, SCREEN_HEIGHT);

        //draw snake
        for(var i=0;i<snakeArray.length;i++){
            ctx.drawImage(snakeImage[snakeArray[i].style], snakeArray[i].x, snakeArray[i].y);
        }

        //draw apple
        ctx.drawImage(apple.image, apple.x, apple.y);

        //draw score
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.fillStyle = "white";
        ctx.fillText("Score: " + score, 30, 30);


        //show game over title
        if(isGameOver) {
            ctx.font = "50px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
            ctx.font = "25px Arial";
            ctx.fillText("Your Score: " + score, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 80);
            ctx.fillText("Press 'R' to restart the game", SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 120);
        }

    }

    render() {
        return (
            <canvas ref="canvas" width={SCREEN_WIDTH} height={SCREEN_HEIGHT}/>
        );
    }
}

//key listener
document.addEventListener("keydown", onKeyDown, false);
function onKeyDown(e) {
    /*
    ASCII codes
    37 - left
    38 - up
    39 - right
    40 - down
    13 - enter
    114 - r
    82 - R
    */
    var keyCode = e.keyCode;
    //prevent wrong movement, if it goes right can not go left directly
    if(snakeDirection === "right" && keyCode === 37){
        return;
    }

    if(snakeDirection === "left" && keyCode === 39){
        return;
    }

    if(snakeDirection === "up" && keyCode === 40){
        return;
    }

    if(snakeDirection === "down" && keyCode === 38){
        return;
    }

    if(isGameOver && (keyCode === 114 || keyCode === 82)) {
        restartCommand = true;
    }


    if(!isKeyApplied) {
        return;
    }

    isKeyApplied = false;


    if(keyCode === 37) {
        snakeDirection = "left";
    }
    else if (keyCode === 38) {
        snakeDirection = "up";
    }
    else if (keyCode === 39) {
        snakeDirection = "right";
    }
    else if (keyCode === 40) {
        snakeDirection = "down";
    }
}


export default Canvas;
