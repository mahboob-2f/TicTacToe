

const playerInfo = document.querySelector(".player-info");
const newGameBtn = document.querySelector("[newButton]");
const boxes =   document.querySelectorAll(".box");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//  this function will inititialise this game

function initGame(){
    currentPlayer ="X";
    gameGrid = ["","","","","","","","",""];
    //   we have to remove all from ui also
    boxes.forEach((box,index)=>{
        box.innerHTML="";
        boxes[index].style.pointerEvents="all";
        box.classList.remove("win");
    });
    playerInfo.classList.remove("tie");
    playerInfo.classList.remove("ghostt");

    newGameBtn.classList.remove("active");
    playerInfo.innerHTML = `Current Player - ${currentPlayer}`;
   

}
initGame();

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerHTML= currentPlayer;
        gameGrid[index]= currentPlayer;
        boxes[index].style.pointerEvents ="none" ;           //    this will remove the cursor to pointer when the box is already click
        // swap the turn 
        swapTurn();
        // now check does any one wins or not
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})
function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }else{
        currentPlayer ="X";
    }
    playerInfo.innerHTML = `Current Player - ${currentPlayer}`;

}

function checkGameOver(){
    let answer = "";

    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== ""  )
        &&(  gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) &&  gameGrid[position[2]] === gameGrid[position[0]] ){
            
            //   chech  if winner is x
            if(gameGrid[position[0]] === "X"){
                answer="X";
            }else
                answer="O";
            
            //   if we have a winner then stop further game   //  stop pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            
            //    make the grid green for winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");


        }
    });

        //   if there is a winner

    if(answer !== ""){
        playerInfo.innerText=`winner is ${answer}`;
        playerInfo.classList.add("ghostt");
        newGameBtn.classList.add("active");
        return ;
    }
    //  when there is a tie match

    let emptyCount =0;
    gameGrid.forEach((box)=>{
        if(box === ""){
            emptyCount++;
        }
    });

    if(emptyCount == 0){
        playerInfo.innerHTML =" Game   Tied !! ";
        playerInfo.classList.add("tie");
       
        newGameBtn.classList.add("active");
    }
     
}

newGameBtn.addEventListener("click",initGame);