const player = document.querySelector(".player");
const boxes = document.querySelectorAll(".box");
const btn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

//all winning posibility
let winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//initializing function
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    //After every game we have to emty the UI also
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        //to remove the green background from winning boxes 
        box.classList.remove("win");
    })
    player.innerText = `Current Player -${currentPlayer}`;
    btn.classList.remove("active");

    console.log("init Working")
}

//initializing the website
initGame();

//to swap Turn
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer="O";
    }
    else{
        currentPlayer = "X"
    }

    player.innerText = `Current Player -${currentPlayer}`;

}

//function to check the winner
function checkWinner(){
    let answer = ""
    winningPosition.forEach((position) => {
        //to see that all winning position is non-empty and equal
        if(  (gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "")  && 
             (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])) {

                if(gameGrid[position[0]] === "X"){
                    answer = "X";
                }
                else{
                    answer = "O";
                }

                //To add green background in winning position boxes
                boxes.forEach((box) => {
                    boxes[position[0]].classList.add("win");
                    boxes[position[1]].classList.add("win");
                    boxes[position[2]].classList.add("win");
                    box.style.pointerEvents = "none";

                });


             }
    });

    //we have the winner
    if(answer !== ""){
        player.innerText = `Winner is ${answer} `;
        btn.classList.add("active");
        return;
    }

    //For game tied probability
    //check that each boxes is filled and we have not a winner
    let fillCount=0;
    for(let i=0; i<9; i++){
        if(gameGrid[i] !== "") {
            fillCount++;
        }
    }

    if(fillCount === 9){
        player.innerText = `Game Tied`;
        btn.classList.add("active");
    }
}

//after filling each box, swap the turn and checkwinner
function handleClick(index){
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";

    swapTurn();
    checkWinner();
}

//appliying event listener to each box
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
    
})


//to restart the game
btn.addEventListener("click", () => {
    initGame();
    console.log("btn working");
});