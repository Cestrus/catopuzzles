export class gameView{
    constructor(nextIMG, preIMG){

        // choose and time Panel 
        this.choosePanel = document.querySelector('.choosePanel');
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
        this.sec = 1;
        this.min = 0; 
        this.timer;


    }
    renderTimePanel(str){
        this.timeCounter.innerHTML = `<p>${str}</p>`;
    }
    renderIMG(obj){        
        if(!obj.numberArr) this.btnPre.classList.add('hide');
        this.plate.style.backgroundImage = `url(${obj.url})`;
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
        // this.animationStart().then(()=>{
            this.controlPanel.classList.remove('hide');
            this.choosePanel.classList.add('hide');
            this.timeCounter.classList.remove('hide');
            if(!this.timer)this.timeCount();
        // });
    }
    //TODO
    animationStart(){
        return new Promis(function(revolve, reject){
            revolve(()=>{

            })
        })
    }
    timeCount(){       
        this.timer = setInterval(()=>{        
            this.renderTimePanel(`${this.min}:${this.sec}`);
            if(this.sec == 59){
                this.sec = 0;
                this.min++;
            }
            else this.sec++;             
        }, 1000);
    }
    clickControlPaused(ev){
        if(ev.target.classList.contains('control_pause')){
            clearInterval(this.timer);
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
        clearInterval(this.timer);
        this.timer = null;
        this.puzzlesBox.innerHTML = '';        
        this.controlPanel.classList.add('hide');
        this.choosePanel.classList.remove('hide');
        this.timeCounter.classList.add('hide');
        this.controlPaused.classList.add('control_pause');
        this.controlPaused.classList.remove('control_play');
        this.renderTimePanel('0:0');
        this.sec = 1;
        this.min = 0;
    }
    pressBtnEndGameDown(){
        this.controlEndGame.classList.add('control_endGame-press');
    }
    pressBtnEndGameUp(){
        this.controlEndGame.classList.remove('control_endGame-press');
    }
}