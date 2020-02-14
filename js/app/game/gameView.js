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

        //game place
        //center box
        this.centerBox = document.querySelector('.centerBox');
        this.plate = document.querySelector('.plate');
        this.plate.addEventListener('click', this.clickIMG.bind(this));
        
        //pieces box
        this.piecesBox = document.querySelector('.piecesBox');
        this.piecesBoxLeft = document.querySelector('.piecesBox--left');
        this.piecesBoxRight = document.querySelector('.piecesBox--right');

        this.piecesBoxLeft.addEventListener('dragover', this.dragover.bind(this)); 
        this.piecesBoxRight.addEventListener('dragover', this.dragover.bind(this));
        this.piecesBoxLeft.addEventListener('drop', this.dropPiece.bind(this));      
        this.piecesBoxRight.addEventListener('drop', this.dropPiece.bind(this));

        //control Panel
        this.controlPanel = document.querySelector('.controlMain');
        this.controlPaused = document.querySelector('.control');
        this.controlEndGame = document.querySelector('.control_endGame');

        this.controlPaused.addEventListener('click', this.clickControlPaused.bind(this));
        this.controlEndGame.addEventListener('click', this.pressBtnEndGame.bind(this));
        this.controlEndGame.addEventListener('mousedown', this.pressBtnEndGameDown.bind(this));
        this.controlEndGame.addEventListener('mouseup', this.pressBtnEndGameUp.bind(this));
              
        //Other
        this.nextIMG = nextIMG;
        this.preIMG = preIMG; 
        this.isGameStarted = false; 
        this.arrPieces = [];
        this.timer = {
            sec: 1,
            min: 0,
            id: null 
        };
        this.img = {
            url: '',
            width: 0,
            height: 0,
            widthPiece: 0,
            heightPiece: 0
        }
    }
    renderTimer(str){
        this.timeCounter.innerText = `${str}`;
    }
    renderIMG(obj){ //прорисовка картинки
        this.plate.innerHTML = ""; 
        this.plate.classList.remove('final');       
        if(!obj.numberArr) this.btnPre.classList.add('hide');
        this.img.url = obj.img.url;
        this.plate.style.width = null
        this.plate.style.height = null;
        this.plate.innerHTML = (obj.img.height>=obj.img.width)?`<img src="${this.img.url}" alt="" height="${this.centerBox.offsetHeight}" class="img">`:
                                                        `<img src="${this.img.url}" alt="" width="${this.centerBox.offsetWidth}"class="img">`;
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
    clickIMG(){ // клик по картинке
        if(!this.isGameStarted){  
            this.modalChooseLevel().
                then(level => {
                    if(level){
                        this.isGameStarted = true;
                        this.img.width = document.querySelector('img').offsetWidth;
                        this.img.height = document.querySelector('img').offsetHeight;
                        this.btnPre.classList.add('hide');
                        this.btnNext.classList.add('hide');
                        this.arrPieces = [];
                        this.plate.removeAttribute('data-target');
                        this.renderPuzzlePlate(level);
                        this.animationStart().
                            then(()=>{
                                this.controlPanel.classList.remove('hide'); 
                                this.piecesBoxLeft.classList.remove('hide');
                                this.piecesBoxRight.classList.remove('hide');                         
                                this.renderPiecesBox(); 
                                if(!this.timer.id)this.timeCount();
                            });
                    }
                });
        }      
    }
    modalChooseLevel(){ //выбор уровня
        return new Promise(function(resolve){
            document.querySelectorAll('.btnLvl').forEach(el=>{
                el.addEventListener('click', (ev)=>{
                    if(ev.target.classList.contains('btnLvl-3')) resolve(3);
                    if(ev.target.classList.contains('btnLvl-4')) resolve(4);
                    if(ev.target.classList.contains('btnLvl-5')) resolve(5);
                    if(ev.target.classList.contains('btnLvl-6')) resolve(6);
                });
            });
            document.querySelector('.close').addEventListener('click', ()=>resolve(0));
        });
    }
    animationStart(){ //стартовая анимация 
        return new Promise(function(resolve){          
            let arr = [...document.querySelectorAll('.puzzlePiece')];
            let time = 0;
            for(let i=0; i<arr.length; i++){
                setTimeout(()=>{
                    arr[i].classList.add('puzzlePiece-animation');
                    arr[i].remove();
                }, time+=50);
            }
            setTimeout(()=>resolve(), (arr.length*100)+50);
        })
    }
    timeCount(){       
        this.timer.id = setInterval(()=>{        
            this.renderTimer(`${this.timer.min}:${this.timer.sec}`);
            if(this.timer.sec === 59){
                this.timer.sec = 0;
                this.timer.min++;
            }
            else this.timer.sec++;             
        }, 1000);
    }
    clickControlPaused(ev){ // пауза
        if(ev.target.classList.contains('control_pause')){
            clearInterval(this.timer.id);
            this.piecesBoxLeft.classList.add('hide');
            this.piecesBoxRight.classList.add('hide');
        }
        if(ev.target.classList.contains('control_play')){
            this.timeCount();
            this.piecesBoxLeft.classList.remove('hide');
            this.piecesBoxRight.classList.remove('hide');
        }
        ev.target.classList.toggle('control_pause');
        ev.target.classList.toggle('control_play');
    }
    pressBtnEndGame(){ //конец игры
        clearInterval(this.timer.id);
        this.timer.id = null;
        this.piecesBoxLeft.innerHTML = '';  
        this.piecesBoxRight.innerHTML = '';       
        this.controlPanel.classList.add('hide');
        this.btnPre.classList.remove('hide');
        this.btnNext.classList.remove('hide');
        this.renderTimer('for start click on image');
        this.controlPaused.classList.add('control_pause');
        this.controlPaused.classList.remove('control_play');
        this.plate.setAttribute('data-target', '#staticBackdrop');
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
    renderPuzzlePlate(level){  // прорисовка поля игры с разбитием картинки на куски
        this.plate.innerHTML='';
        this.plate.style.width = this.img.width +'px';
        this.plate.style.height = this.img.height +'px';
        this.img.widthPiece = Math.floor(this.img.width / level);
        this.img.heightPiece = Math.floor(this.img.height / level);
        let left = 0, 
            top = 0, 
            id = 0;
        for(let i=0; i<level; i++){
            for(let j=0; j<level; j++){
                this.plate.innerHTML += `<div class="pieceBorder ID_${id++}" style=" width: ${this.img.widthPiece}px;
                                                                                        height: ${this.img.heightPiece}px;">
                                                ${this.makePuzzlePiece(this.img.widthPiece, this.img.heightPiece, this.img.url, this.plate.style.width, left, top)}
                                        </div>`;    
                left+=(this.img.widthPiece + 1);
            }
            left=0;
            top+=this.img.heightPiece+1;
        }
        document.querySelectorAll('.pieceBorder').forEach(el=>{
            el.addEventListener('dragover', this.dragover.bind(this));            
            el.addEventListener('drop', this.dropPiece.bind(this));
        });
    }    
    makePuzzlePiece(widthPiece, heigthPiece, url, width, left=0, top=0){ // прорисовка кусочка пазла, класс pieceID для нумерации кусочка
        let str = ` <div class="puzzlePiece pieceID_${this.arrPieces.length}" draggable=true style=" width: ${widthPiece}px; 
                                        height: ${heigthPiece}px;
                                        background-image: url(${url});
                                        background-size: ${width};
                                        background-position: -${left}px -${top}px;">`;
        this.arrPieces.push(str);
        return str;
    }
    renderPiecesBox(){ //прорисовка боксов для кусочков пазла и их случайное заполнение 
        let arr=[];        
        for (let i = 0; i < this.arrPieces.length; i++) {arr[i] = i;}
        for(let i=0; i<this.arrPieces.length; i++){
            if(i<Math.ceil(this.arrPieces.length/2)){
                this.piecesBoxLeft.innerHTML += `<div class="fant">${this.arrPieces[arr.splice(Math.floor(Math.random()*arr.length), 1)]}</div>`;
            }
            else{
                this.piecesBoxRight.innerHTML += `<div class="fant">${this.arrPieces[arr.splice(Math.floor(Math.random()*arr.length), 1)]}</div>`;
            }
        }
        document.querySelectorAll(`.puzzlePiece`).forEach(el=>{
            el.addEventListener('dragstart', this.dragPiece.bind(this));
        });        
    }
    //Drag and Drop
    dragPiece(ev){
        ev.dataTransfer.setData('piece', ev.target.className.match(/pieceID_\d\d?/));
        ev.target.parentNode.classList.remove('fant');
    }
    dragover(ev){
        ev.preventDefault();
    }
    dropPiece(ev){
        ev.preventDefault();
        let data = ev.dataTransfer.getData('piece');
        if(ev.target.classList.contains('piecesBox')){ 
            if(!ev.target.classList.contains('puzzlePiece')){
                let div = document.createElement('div');// оборачиваем в fant
                div.classList.add('fant');
                div.appendChild(document.querySelector(`.${data}`));
                ev.target.appendChild(div);
            }
        }
        else if(ev.target.classList.contains('pieceBorder')){
            if(!ev.target.classList.contains('puzzlePiece')){
                ev.target.appendChild(document.querySelector(`.${data}`));
            }
        }
        this.check();
    }
    //проверка совпаденя кусочков с их местами
    check(){
       
        let isRight = false;         
        for(let i=0; i<this.arrPieces.length; i++){
            let piece = document.querySelector(`.pieceID_${i}`);
            if(!piece.parentNode.classList.contains(`ID_${i}`)) break;
            if(i == this.arrPieces.length-1 && piece.parentNode.classList.contains(`ID_${i}`)) isRight = true;
        }
        if(isRight) this.animationFinal();
    }
    animationFinal(){ // финальная анимация
        this.plate.innerHTML = '';
        this.plate.innerHTML = ` <img src="${this.img.url}" alt="" height="${this.img.height}" class="img">`;
        this.plate.classList.add('final');
        setTimeout(()=> this.pressBtnEndGame(), 2000);
    }

}