// import {modalWindow} from '/app/modal.js';

export class gameView{
    constructor(nextIMG, preIMG){

        // choose and time Panel 
        this.timeCounter = document.querySelector('.timeCounter');
        this.myBtns = document.querySelectorAll('.myBtn');
        this.btnPre = document.querySelector('.btnPre');
        this.btnNext = document.querySelector('.btnNext');

        this.btnPre.addEventListener('click', this.clickBtnArrow.bind(this));
        this.btnNext.addEventListener('click', this.clickBtnArrow.bind(this));
        this.myBtns.forEach(el=>{el.addEventListener('mousedown', this.pressBtnArrowDown.bind(this))});
        this.myBtns.forEach(el=>{el.addEventListener('mouseup', this.pressBtnArrowUp.bind(this))});

        //Plate
        this.plate = document.querySelector('.plate');
        this.plate.addEventListener('click', this.clickIMG.bind(this));

        //control Panel
        this.controlPanel = document.querySelector('.controlMain');
        this.controlPaused = document.querySelector('.control');
        this.controlEndGame = document.querySelector('.control_endGame');

        this.controlPaused.addEventListener('click', this.clickControlPaused.bind(this));
        this.controlEndGame.addEventListener('click', this.pressBtnEndGame.bind(this));
        this.controlEndGame.addEventListener('mousedown', this.pressBtnEndGameDown.bind(this));
        this.controlEndGame.addEventListener('mouseup', this.pressBtnEndGameUp.bind(this));
            
        //Puzzles box
        this.puzzlesBox = document.querySelector('.puzzlesBox');

        //Choose level modal
        // this.cooseLevel = document.querySelector('.chooseLevel');
        // document.querySelector('.btnLevel').addEventListener('click',()=>this.level = this.inpLevel.value);

        this.nextIMG = nextIMG;
        this.preIMG = preIMG; 
        this.isGameStarted = false;   
        this.timer = {
            sec: 1,
            min: 0,
            id: null 
        };
        this.img = {
            url: '',
            width: 0,
            height: 400,
            widthPiece: 0,
            heightPiece: 0
        }

    }
    renderTimer(str){
        this.timeCounter.innerText = `${str}`;
    }
    renderIMG(obj){        
        if(!obj.numberArr) this.btnPre.classList.add('hide');
        this.img.url = obj.url;
        this.plate.style.width = null;
        this.plate.innerHTML = ` <img src="${this.img.url}" alt="" height="400" class="img">`;  
    }
    clickBtnArrow(ev){
        if(ev.target.parentNode.classList.contains('btnNext')){
            this.nextIMG();
            this.btnPre.classList.remove('hide');
        }
        if(ev.target.parentNode.classList.contains('btnPre')){
            this.preIMG();
        }
    }
    pressBtnArrowDown(ev){
       ev.target.parentNode.classList.add('myBtn__press');
    }
    pressBtnArrowUp(ev){
        ev.target.parentNode.classList.remove('myBtn__press')
    }
    clickIMG(){
        if(!this.isGameStarted){  
            this.modalChooseLevel().
                    then((level) => {
                        if(level){
                            this.isGameStarted = true;
                            this.img.width = this.plate.offsetWidth;
                            this.btnPre.classList.add('hide');
                            this.btnNext.classList.add('hide');
                            this.renderPuzzlePlate(level);
                            this.animationStart().
                                    then(()=>{
                                        this.controlPanel.classList.remove('hide');
                                        // TODO здесь ф-ция заполнения нижнего бокса кусочками 
                                        if(!this.timer.id)this.timeCount();
                                    });
                        }
                    });
        }
               
        
    }
    modalChooseLevel(){
        return new Promise(function(resolve){
            $('#chooseLevelModal').modal(); // bootstrap function
            document.querySelectorAll('.btnLvl').forEach(el=>{
                el.addEventListener('click', (ev)=>{
                    if(ev.target.classList.contains('btnLvl-4')) return resolve(4);
                    if(ev.target.classList.contains('btnLvl-5')) return resolve(5);
                    if(ev.target.classList.contains('btnLvl-6')) return resolve(6);
                });
            })
        })
    }
    animationStart(){
        return new Promise(function(resolve){          
            let arr = [...document.querySelectorAll('.puzzlePiece')];
            let time = 0;
            for(let i=0; i<arr.length; i++){
                setTimeout(()=>{
                    arr[i].classList.add('puzzlePiece-animation');
                }, time+=100);
            }
            setTimeout(()=>resolve(), (arr.length*100)+100);
        })
    }
    timeCount(){       
        this.timer.id = setInterval(()=>{        
            this.renderTimer(`${this.timer.min}:${this.timer.sec}`);
            if(this.timer.sec == 59){
                this.timer.sec = 0;
                this.timer.min++;
            }
            else this.timer.sec++;             
        }, 1000);
    }
    clickControlPaused(ev){
        if(ev.target.classList.contains('control_pause')){
            clearInterval(this.timer.id);
            this.puzzlesBox.classList.add('hide');
        }
        if(ev.target.classList.contains('control_play')){
            this.timeCount();
            this.puzzlesBox.classList.remove('hide');
        }
        ev.target.classList.toggle('control_pause');
        ev.target.classList.toggle('control_play');
    }
    pressBtnEndGame(){
        clearInterval(this.timer.id);
        this.timer.id = null;
        this.puzzlesBox.innerHTML = '';        
        this.controlPanel.classList.add('hide');
        this.btnPre.classList.remove('hide');
        this.btnNext.classList.remove('hide');
        this.renderTimer('for start click on image');
        this.controlPaused.classList.add('control_pause');
        this.controlPaused.classList.remove('control_play');
        this.timer.sec = 1;
        this.timer.min = 0;
        this.isGameStarted = false;
        this.nextIMG();
    }
    pressBtnEndGameDown(){
        this.controlEndGame.classList.add('control_endGame-press');
    }
    pressBtnEndGameUp(){
        this.controlEndGame.classList.remove('control_endGame-press');
    }
    makePuzzlePiece(widthPiece, heigthPiece, url, width, left=0, top=0){
        return ` <div class="puzzlePiece" style=" width: ${widthPiece}px;
                                        height: ${heigthPiece}px;
                                        background-image: url(${url});
                                        background-size: ${width};
                                        background-position: -${left}px -${top}px;">`;
    }

    renderPuzzlePlate(level=4){              
        this.plate.innerHTML='';
        this.plate.style.width = this.img.width +'px';
        this.img.widthPiece = Math.floor(this.img.width / level);
        this.img.heightPiece = Math.floor(this.img.height / level);
        console.log(this.img);
        let left = 0, 
            top = 0;
        for(let i=0; i<level; i++){
            for(let j=0; j<level; j++){
                this.plate.innerHTML += `<div class="puzzlePieceBorder" style=" width: ${this.img.widthPiece}px;
                                                                                height: ${this.img.heightPiece}px;">
                                                ${this.makePuzzlePiece(this.img.widthPiece, this.img.heightPiece, this.img.url, this.plate.style.width, left, top)}
                                        </div>`;    
                left+=(this.img.widthPiece + 1);
            }
            left=0;
            top+=this.img.heightPiece+1;
        }
    }
    renderPuzzlesBox(widthPuzzlePiece){
        for(let i=0; i<16; i++){
            this.puzzlesBox.innerHTML += `<div class="" style="width: ${widthPuzzlePiece}">`
        }
        
    }

        
  
}