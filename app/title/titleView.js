export class titleView{
    constructor(randColor){
        document.querySelector('.title').innerHTML = '<span>C</span> <span>A</span> <span>T</span> <span>P</span> <span>U</span> <span>Z</span> <span>Z</span> <span>L</span> <span>E</span> <span>S</span> <span>!</span>';
        [...document.querySelectorAll('.title span')].forEach(el=>{
            el.style.color =  randColor();
        });
    }     
}