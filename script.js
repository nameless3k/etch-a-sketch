

const gridArea = document.querySelector('#grid');


let gridBox = [];
let boxes = []
let numberRows = 16;
let totalBoxes = numberRows * numberRows;
let borderOn = true
let mode = 'sketch'
let currentColor = '0, 0, 255'
let currentColorPosition = 0
let colorChoice = ['255, 0, 0','255, 128, 0', '255, 255, 0', '128, 255, 0','0, 255, 0','0, 255, 128','0, 255, 255', '0, 0, 255',,]

function createGrid() {
//set number of columns 
gridArea.style.cssText = `grid-template-columns: repeat(${numberRows},1fr);`;

//build da div containers
for (let i=0;i<totalBoxes;i++){

    gridBox[i] = document.createElement('div');
    gridBox[i].classList.add('gridbox');
    gridBox[i].textContent = '';
    gridArea.appendChild(gridBox[i])
    
    
}

//create an variable to select the gridboxes
const boxes = document.getElementsByClassName('gridbox')

//boxes.addEventListener('hover',onHover)
for (let i=0;i<totalBoxes;i++) {

    boxes[i].addEventListener("mouseover", onHover);
}
}

createGrid();

function clearGrid() {
     boxes = document.getElementsByClassName('gridbox')
    
    for (let i=0;i<totalBoxes;i++){
        console.log(boxes[i]);
        gridArea.removeChild(boxes[0])

}
}



function onHover(event) {
    if (mode=='standard') {
    event.target.style.backgroundColor= `rgb(${currentColor})`
    }
    else if (mode=='sketch') {
        //get current opacity of target
             
            let currentShade = event.target.style.backgroundColor.slice(-2,-1)
                        //check if first run will not be a RGBA value so set 0
            if (currentShade == '' || isNaN(currentShade)) {currentShade=0}  ;
            //convert to number
            currentShade = Number(currentShade);
            // final run just make it black
            if (currentShade == 9) { event.target.style.backgroundColor = `rgba(${currentColor}, .99)` }
            //else just add 0.1 to transparancy setting
        else event.target.style.backgroundColor = `rgba(${currentColor}, 0.${+ (currentShade + 1)}`
      
    }
}


const resetBtn = document.querySelector('#reset');

resetBtn.addEventListener('click', function (e) {
    clearGrid();
    numberRows = prompt('How many Rows?');
    totalBoxes = numberRows * numberRows;
    createGrid();
  });


const borderBtn = document.querySelector('#border');

borderBtn.addEventListener('click', function (e) {
    
    const boxes =   document.getElementsByClassName('gridbox')
    if (borderOn) {
        for (let i=0;i<totalBoxes;i++){
            boxes[i].style.borderStyle='none'
            borderOn = false
        }
    }
    else {
        for (let i=0;i<totalBoxes;i++){
            boxes[i].style.borderStyle='solid'
            borderOn = true
            }
        }
    


  });


  const modeBtn = document.querySelector('#mode');
  modeBtn.innerText = `Mode: ${mode}`


  modeBtn.addEventListener('click',function(e){
      
    if (mode == 'standard') {
          mode = 'sketch'
      }
      else mode = 'standard';
      modeBtn.innerText = `Mode: ${mode}`
  })

  const colorPreview = document.querySelector('#colorDemo')
  colorPreview.style.backgroundColor = `rgb(${currentColor})`
  
  
  
  
  const colorBtn = document.querySelector('#color')
  colorBtn.addEventListener('click', function (e){
      currentColorPosition += 1
      if (currentColorPosition == colorChoice.length) {currentColorPosition = 0}
      currentColor = colorChoice[currentColorPosition]
      colorPreview.style.backgroundColor = `rgb(${currentColor})`
  })