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

        this.nextIMG = nextIMG;
        this.preIMG = preIMG;    
        this.timer = {
            sec: 1,
            min: 0,
            id: null 
        };
        this.urlIMG = '';
        this.widthIMG = 0;

    }
    renderTimer(str){
        this.timeCounter.innerText = `${str}`;
    }
    renderIMG(obj){        
        if(!obj.numberArr) this.btnPre.classList.add('hide');
        this.urlIMG = obj.url;
        this.plate.style.width = null;
        this.plate.innerHTML = ` <img src="${this.urlIMG}" alt="" height="400" class="img">`;  
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
        this.widthIMG = this.plate.offsetWidth;
        this.btnPre.classList.add('hide');
        this.btnNext.classList.add('hide')
        this.renderPuzzlePlate();       
        this.animationStart().then(()=>{
            this.controlPanel.classList.remove('hide');
            if(!this.timer.id)this.timeCount();
        });
    }
    animationStart(){
        return new Promise(function(resolve){          
            let arr = [...document.querySelectorAll('.puzzlePice')];
            let time = 0;
            for(let i=0; i<arr.length; i++){
                setTimeout(()=>{
                    arr[i].classList.add('puzzlePice-animation');
                }, time+=100);
            }
            setTimeout(()=>resolve(), 1700);
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
        this.nextIMG();
    }
    pressBtnEndGameDown(){
        this.controlEndGame.classList.add('control_endGame-press');
    }
    pressBtnEndGameUp(){
        this.controlEndGame.classList.remove('control_endGame-press');
    }
    renderPuzzlePlate(){       
        this.plate.innerHTML='';
        this.plate.style.width = this.widthIMG +'px';
        let puzzlePiceWidth = Math.floor(this.widthIMG / 4),
            left = 0, 
            top = 0;
        for(let i=0; i<4; i++){
            for(let j=0; j<4;j++){
                this.plate.innerHTML +=                                                               
                                    `<div class="puzzlePiceBorder" style=" width: ${puzzlePiceWidth}px;">
                                        <div class="puzzlePice" style=" width: ${puzzlePiceWidth}px;
                                                                         background-image: url(${this.urlIMG});
                                                                         background-size: ${this.plate.style.width};
                                                                         background-position: -${left}px -${top}px;">
                                        </div>;
                                    </div>`;    
                left+=(puzzlePiceWidth + 1);
            }
            left=0;
            top+=100;
        }
    }

        
  
}