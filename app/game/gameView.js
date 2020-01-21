export class gameView{
    constructor(nextIMG, preIMG, timeCount){
        this.chooseAndTimePanel = document.querySelector('.chooseAndTimePanel');
        this.renderChoosePanel();

        this.myBtns = document.querySelectorAll('.myBtn');
        this.btnPre = document.querySelector('.btnPre');
        this.btnNext = document.querySelector('.btnNext');

        this.plate = document.querySelector('.plate');

        this.nextIMG = nextIMG;
        this.preIMG = preIMG;        
        this.timeCount = timeCount;

        // E V E N T S
        //нажатие кнопок пролистывания
        this.btnPre.addEventListener('click', this.clickBtn);
        this.btnNext.addEventListener('click', this.clickBtn);
        this.myBtns.forEach(el=>{el.addEventListener('mousedown', this.pressBtnDown);});
        this.myBtns.forEach(el=>{el.addEventListener('mouseup', this.pressBtnUp);});
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
        this.plate.style.backgroundImage = `url(${obj.url})`;
    }
    clickBtn(ev){
        if(ev.target.parentNode.classList.contains('btnNext')){
            console.log('next')
        }
        if(ev.target.parentNode.classList.contains('btnPre')){

        }
    }
    pressBtnDown(ev){
       ev.target.parentNode.classList.add('myBtn__press');
    }
    pressBtnUp(ev){
        ev.target.parentNode.classList.remove('myBtn__press')
    }

}