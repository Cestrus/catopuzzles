export class gameView{
    constructor(nextIMG, preIMG, timeCount){
        this.chooseAndTimePanel = document.querySelector('.chooseAndTimePanel');
        this.renderChoosePanel();

        this.myBtns = document.querySelectorAll('.myBtn');
        this.btnPre = document.querySelector('.btnPre');
        this.btnNext = document.querySelector('.btnNext');

        this.plate = document.querySelector('.plate');

        this.control = document.querySelector('.control');
        

        this.nextIMG = nextIMG;
        this.preIMG = preIMG;        
        this.timeCount = timeCount;

        // E V E N T S
        //нажатие кнопок пролистывания
        this.btnPre.addEventListener('click', this.clickBtn.bind(this));
        this.btnNext.addEventListener('click', this.clickBtn.bind(this));
        this.myBtns.forEach(el=>{el.addEventListener('mousedown', this.pressBtnDown.bind(this));});
        this.myBtns.forEach(el=>{el.addEventListener('mouseup', this.pressBtnUp.bind(this));});
        this.plate.addEventListener('click', this.startGame.bind(this))
    }
    
    renderChoosePanel(){
        this.chooseAndTimePanel.innerHTML = `
            <div class="col"><div class="myBtn btnPre hide"><div class="preview"></div></div></div>
            <div class="col align-self-center"><p class="message">for start click on image</p></div>
            <div class="col"><div class="myBtn btnNext"><div class="next"></div></div></div>`;
    }
    renderTimePanel(){
        this.chooseAndTimePanel.innerHTML = `
            <div class="timeCounter"><p>${this.timeCount}</p></div>`
    }

    renderIMG(obj){        
        if(!obj.numberArr) this.btnPre.classList.add('hide');
        this.plate.style.backgroundImage = `url(${obj.url})`;
    }
    clickBtn(ev){
        if(ev.target.parentNode.classList.contains('btnNext')){
            this.nextIMG();
            this.btnPre.classList.remove('hide');
        }
        if(ev.target.parentNode.classList.contains('btnPre')){
            this.preIMG();
        }
    }
    pressBtnDown(ev){
       ev.target.parentNode.classList.add('myBtn__press');
    }
    pressBtnUp(ev){
        ev.target.parentNode.classList.remove('myBtn__press')
    }
    startGame(){

    }
}