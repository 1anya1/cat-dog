
let player = 0;
let turns = 0;
let width = 7; 
let depth = 6;
let board = document.getElementById('board')
let reset = document.getElementById('reset')

let turn = document.getElementById('players-turn')
turn.innerHTML = 'Red Turn'

createBoard(width, depth, board)

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
function clickEvent(event){
    turns++;
    let turn = document.getElementById('players-turn')
    event.preventDefault();
    let rowId = event.srcElement.id.split('')[0]
    for(let i=0; i<depth; i++){
       let box = document.getElementById(rowId+'_'+i);
    //    console.log(box)
       if(box.className === 'box'){
           if(player===1){
            // AI_Play()
            turn.innerHTML = 'Red Turn'
            box.className='yellow box';
            player=0;
           } else{
           
            box.className='red box';
            turn.innerHTML = 'Yellow Turn'
            player=1;
           }
           vertical(rowId, i, box.className, turn, event)
           horizontal(rowId, i, box.id, turn, event)
           diagonal(rowId, i, box.id, turn, event)
           diagonalReverse(rowId, i, box.id, turn, event)
           break;
       } 
        
    }
}

document.getElementById('board').addEventListener('click', clickEvent)
document.getElementById('reset').addEventListener('click', resetBoard)

function vertical(row,depth, box, turn, event ){
    let winningArr =[]
    if(depth>=3){
        for(let i=depth; i>=0; i--){
            let boxy = document.getElementById(row+'_'+i);
            winningArr.push(boxy.className)
        }
        let val;
        for(let i=0; i<3; i++){
            if(winningArr[i] === winningArr[i+1] && winningArr[i] === winningArr[i+2] && winningArr[i] === winningArr[i+3] ){
                val= true; 
               
            }
        }
        if(val===true){
            document.getElementById('board').removeEventListener('click',clickEvent)
            turn.innerHTML=`is the winner`
        }
   
    }
}
function horizontal(row,depth, box, turn, event){
    let determine = false 
    let arr=[]
    let currentPlay = document.getElementById(row+'_'+depth).className
    if(turns >=4){
        for(let i=0; i<width; i++){
           arr.push(document.getElementById(i+'_'+depth).className)  
        }  
    }
    for(i=0 ; i < arr.length ; i++ ){
        if(arr[i] === currentPlay && arr[i]=== arr[i+1] && arr[i+1] === arr[i+2] && arr[i+2]===arr[i+3]){
            console.log(arr[i])
             determine=true
            }
        }
    if(determine===true){
        document.getElementById('board').removeEventListener('click',clickEvent)
       turn.innerHTML=`is the winner`

    } 
}

function diagonal(row,depth, box, turn, event){
let currentPlay = document.getElementById(row+'_'+depth).className
let determine = false;
row = parseInt(row)
depth = parseInt(depth)
let arr=[];
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
    // console.log(document.getElementById(i+'_'+j))
   arr.push(document.getElementById(i+'_'+j).className)  
}  
if(arr.length>=4){
    for(i=0 ; i < arr.length ; i++ ){
        if(arr[i] === currentPlay && arr[i]=== arr[i+1] && arr[i+1] === arr[i+2] && arr[i+2]===arr[i+3]){
            // console.log(arr[i])
             determine=true
            }
        }
    if(determine===true){
        document.getElementById('board').removeEventListener('click',clickEvent)
       turn.innerHTML=`is the winner`

    } 

}


}

function diagonalReverse(row,depth, box, turn, event){
    let currentPlay = document.getElementById(row+'_'+depth).className
    let determine = false;
    row = parseInt(row)
    depth = parseInt(depth)
    let arr=[];
    let widthDistance = width-row-1;
    let distance = 0;
    let sum = row+depth
    let start = 0;
    let finish = 0;
    let myJ=0;
    console.log(sum)
    console.log(row)
    if(sum > 6){
        myJ = sum-6;
        start= 6;
        finish = 6-myJ
    } else if( sum===6){
        myJ=0;
        start = 6;
        finish = 6;

    } else{
        console.log('THIS LOOP')
        myJ = 0;
        start= row+depth;
        finish = row+depth+1
        console.log('finish'+finish)

    }
    for(let i=start ,j=myJ, k=0; k<finish; i--, j++, k++){
        console.log(document.getElementById(i+'_'+j))
       arr.push(document.getElementById(i+'_'+j).className)  
    }  
    // // console.log(widthDistance)
    // if(widthDistance<depth){
    //     console.log(depth-widthDistance)
    //     distance = depth-widthDistance
        
    // }
  
    // if(turns >=4){
    //     for(let i=row ,j=depth; j>=distance; i++, j--){
    //         // console.log(document.getElementById(i+'_'+j))
    //        arr.push(document.getElementById(i+'_'+j).className)  
    //     }  
    // }
    console.log(arr)
    if(arr.length>=4){
        for(i=0 ; i < arr.length ; i++ ){
            if(arr[i] === currentPlay && arr[i]=== arr[i+1] && arr[i+1] === arr[i+2] && arr[i+2]===arr[i+3]){
                // console.log(arr[i])
                 determine=true
                }
            }
        if(determine===true){
            document.getElementById('board').removeEventListener('click',clickEvent)
           turn.innerHTML=`is the winner`
    
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
    allPlay[i].classList.remove('red')
  }
  document.getElementById('board').addEventListener('click', clickEvent)
  player = 0;
  turns = 0;
  turn.innerHTML = 'Red Turn'
}
