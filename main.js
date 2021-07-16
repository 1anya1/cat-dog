
let player = 0; let turns = 0;
let width = 7; let depth = 6;
let board = document.getElementById('board')
let reset = document.getElementById('reset')
let clicker = document.getElementById('clicker')
let turn = document.getElementById('update-turn')
turn.innerHTML= "Player <img id='players-turn'> Turn";
let turnImage = document.getElementById('players-turn')
turnImage.src='image/catred.png'
createClick(width, clicker)
createBoard(width, depth, board)
document.getElementById('clicker').addEventListener('click', clickEvent)
document.getElementById('reset').addEventListener('click', resetBoard)
document.getElementById('clicker').addEventListener('mouseover', mouseEvent)
document.getElementById('clicker').addEventListener('mouseout', mouseOut)


//Creating Clicker for Pawns
function createClick(width,clicker){
    for(let i=0; i<width; i++){
        let row = document.createElement('div')
        row.id='row_'+i
        row.className = 'click';
        clicker.appendChild(row)
    }
}
//Creating Playing Board
function createBoard(width, depth, board){
for(let i=0; i<width; i++){
    let row = document.createElement('div')
    row.id = i;
    row.className='row'
    for(let j=depth-1; 0<=j ; j--){
        const newBlock = document.createElement('div')
        newBlock.id = i +'_'+j
        newBlock.className = 'box'
        newBlock.textContent= '';
        row.appendChild(newBlock)
        board.appendChild(row)
        }
    }
}

//Click Event
function clickEvent(event){
    turns++;
    let turn = document.getElementById('players-turn')
    event.preventDefault();
    let end = event.srcElement.id.split('')
    let start = end[end.length-1]
    for(let i=0; i<depth; i++){
       let box = document.getElementById(start+'_'+i);
       if(box.className === 'box'){
           if(player===1){
            // AI_Play()
            turn.src = "image/catred.png";
            box.className='yellow box';
            player=0;
           } else{
            box.className='red box';
            turn.src = "image/dog-yellow.png";
            player=1;
           }
           vertical(start, i, box.className, turn, event)
           horizontal(start, i, box.id, turn, event)
           diagonal(start, i, box.id, turn, event)
           diagonalReverse(start, i, box.id, turn, event)
           break;
        }    
    }
}

//Mouse Over event
function mouseEvent(event){
    event.preventDefault();
    let end = event.srcElement.id.split('')
    let start = end[end.length-1]
    let box = document.getElementById(start);
    if(box === null){
        return;
    } else{
        box.style.backgroundColor='#5EBE47' 
    } 
}
function mouseOut(event){
    event.preventDefault();
    if(event.srcElement.id !== 'clicker'){
        let end = event.srcElement.id.split('')
        let start = end[end.length-1]
        let box = document.getElementById(start);
        box.style.backgroundColor='#68599D'
    }
}

//Checking Winning Category
function determineWinner(winningRow){
    let updateTurn = document.getElementById('update-turn')
    for(i=0; i<winningRow.length; i++){
        // document.getElementById(winningRow[i]).style.backgroundBlendMode='luminosity';
        // document.getElementById(winningRow[i]).style.boxShadow='inset 0 0 0 2000px rgba(225,225,225, 0.6)';
        document.getElementById(winningRow[i]).style.filter='hue-rotate(220deg)';
        
    }
    if(player ===1){
        updateTurn.innerHTML='Player <img id="players-turn"> Won';
        let turnImage = document.getElementById('players-turn');
        turnImage.src = "image/catred.png";
        let player = document.querySelector('.p1w')
        let val = parseInt(player.innerText)+1
        player.innerText=val;
    } else{
        updateTurn.innerHTML='Player <img id="players-turn"> Won';
        let turnImage = document.getElementById('players-turn');
        turnImage.src = "image/dog-yellow.png";
        let player = document.querySelector('.p2w')
        let val = parseInt(player.innerText)+1
        player.innerText=val;  
    }
}
function removeListners(){
    document.getElementById('board').removeEventListener('click',clickEvent)
    document.getElementById('clicker').removeEventListener('click', clickEvent)
    document.getElementById('clicker').removeEventListener('mouseover', mouseEvent)
   
}

function vertical(row,depth){
    let winningArr =[]
    let slots=[]
    let winningRow =[]
    if(depth>=3){
        for(let i=depth; i>=0; i--){
            let boxy = document.getElementById(row+'_'+i);
            winningArr.push(boxy.className)
            slots.push(boxy.id)
        }
        let val;
        for(let i=0; i<3; i++){
            if(winningArr[i] === winningArr[i+1] && winningArr[i] === winningArr[i+2] && winningArr[i] === winningArr[i+3] ){
                winningRow.push(slots[i], slots[i+1], slots[i+2], slots[i+3])
                val= true;   
            }
        }
        if(val===true){
            removeListners()
            determineWinner(winningRow)
        }
    }
}

function horizontal(row,depth){
    let determine = false 
    let arr=[];let slots=[];let winningRow =[];
    let currentPlay = document.getElementById(row+'_'+depth).className
    if(turns >=4){
        for(let i=0; i<width; i++){
            let boxy = document.getElementById(i+'_'+depth)
           arr.push(boxy.className)  
           slots.push(boxy.id)
        }  
    }
    for(i=0 ; i < arr.length ; i++ ){
        if(arr[i] === currentPlay && arr[i]=== arr[i+1] && arr[i+1] === arr[i+2] && arr[i+2]===arr[i+3]){
            winningRow.push(slots[i], slots[i+1], slots[i+2], slots[i+3])
             determine=true
            }
        }
    if(determine===true){
        removeListners()
        determineWinner(winningRow)

    } 
}

function diagonal(row,depth){
let currentPlay = document.getElementById(row+'_'+depth).className
let determine = false;
row = parseInt(row)
depth = parseInt(depth)
let arr=[];let slots=[];let winningRow =[];
let difference = row-depth
let start = 0;
let finish = 0;
let myJ=0;
if(difference==0){
    start=0;
    finish=6;
}else if(difference > 0){
    start=difference;
    finish=width-difference
    myJ=0;
} else {
    start=0;
    myJ = Math.abs(difference);
    finish = width + difference
}

for(let i=start ,j=myJ; j<finish; i++, j++){
   arr.push(document.getElementById(i+'_'+j).className)  
   slots.push(document.getElementById(i+'_'+j).id)
}  
if(arr.length>=4){
    for(i=0 ; i < arr.length ; i++ ){
        if(arr[i] === currentPlay && arr[i]=== arr[i+1] && arr[i+1] === arr[i+2] && arr[i+2]===arr[i+3]){
            winningRow.push(slots[i], slots[i+1], slots[i+2], slots[i+3])
             determine=true
            }
        }
    if(determine===true){
        removeListners()
        determineWinner(winningRow)

    } 

}


}

function diagonalReverse(row,depth, box, turn, event){
    let currentPlay = document.getElementById(row+'_'+depth).className
    let determine = false;
    row = parseInt(row)
    depth = parseInt(depth)
    let arr=[];let slots=[];let winningRow =[];
    let sum = row+depth
    let start = 0;
    let finish = 0;
    let myJ=0;
    if(sum > 6){
        myJ = sum-6;
        start= 6;
        finish = 6-myJ
    } else if( sum===6){
        myJ=0;
        start = 6;
        finish = 6;

    } else{
        myJ = 0;
        start= row+depth;
        finish = row+depth+1
    }
    for(let i=start ,j=myJ, k=0; k<finish; i--, j++, k++){
       arr.push(document.getElementById(i+'_'+j).className)  
       slots.push(document.getElementById(i+'_'+j).id)  
    }  
    if(arr.length>=4){
        for(i=0 ; i < arr.length ; i++ ){
            if(arr[i] === currentPlay && arr[i]=== arr[i+1] && arr[i+1] === arr[i+2] && arr[i+2]===arr[i+3]){
                winningRow.push(slots[i], slots[i+1], slots[i+2], slots[i+3])
                 determine=true
                }
            }
        if(determine===true){
            removeListners()
            determineWinner(winningRow)
        } 
    
    }
    
    
}
function AI_Play(){

    let randomNumber = Math.floor(Math.random()*7)
    console.log(randomNumber)
    var cell = document.getElementById(randomNumber+'_0')
    console.log(cell)
    
    cell.click()
}
function resetBoard(){
 let allPlay = document.getElementsByClassName('box')
 for (var i = 0; i < allPlay.length; i++) {
    allPlay[i].classList.remove('yellow')
    // allPlay[i].style.boxShadow = null;
    allPlay[i].style.filter=null;
    allPlay[i].classList.remove('red')
  }
  document.getElementById('clicker').addEventListener('click', clickEvent)
  document.getElementById('clicker').addEventListener('mouseover', mouseEvent)
  
  player = 0;
  turns = 0;
  turn.innerHTML= "Player <img id='players-turn'> Turn";
  let turnImage = document.getElementById('players-turn')
  turnImage.src='image/catred.png'

}
let gameRules = document.querySelector('.plus')
gameRules.addEventListener('click', openRules)

function openRules(){
    if(document.querySelector('.one').className === 'bar one'){
        document.querySelector('.one').classList.add('one-transform')
        document.querySelector('.two').classList.add('two-transform')
        document.querySelector('.game-instructions').classList.add('show')
    } else {
        document.querySelector('.one').classList.remove('one-transform')
        document.querySelector('.two').classList.remove('two-transform')
        document.querySelector('.game-instructions').classList.remove('show')
    }
   
    
}
    

