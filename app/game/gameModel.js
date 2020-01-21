export class gameModel{
    constructor(renderIMG){
        this.arrIMG = [];
        this.ifNotValidImg = 'https://img.novosti-n.org/upload/ukraine/415345.jpg';
        this.pointerIMG;
        // this.renderIMG = renderIMG;
        this.loadIMG(renderIMG);
    }
    timeCount(){
        let sec = 0, 
            min = 0;
        let timer = setInterval(()=>{
            if(sec == 59) {
                sec = 0;
                min++;
            }
            else sec++;
            return `${min} : ${sec}`;
        }, 1000);
    }
    loadIMG(renderIMG){
        fetch('https://api.thecatapi.com/v1/images/search').
                then(res=>res.json()).
                then(el=>{   
                    let {id, url, width, height} = el[0];
                    this.arrIMG.push({id, url, width, height});
                    this.pointerIMG = this.arrIMG.length-1;
                }).
                then(()=>{
                    if(this.arrIMG[this.pointerIMG].url.match(/.jp/)){  // проверка на jpeg или jpg
                        renderIMG({url: this.arrIMG[this.pointerIMG].url, numberArr: this.pointerIMG});
                    }  
                    else {
                        this.arrIMG.pop();
                        this.pointerIMG--;
                        renderIMG({url: this.ifNotValidImg, numberArr: this.pointerIMG}); 
                    }
                })
    }
    nextIMG(){
        if(!this.arrIMG.length || this.pointerIMG == this.arrIMG.length-1){

        }        
        else return {url: this.arrIMG[++this.pointerIMG].url, numberArr: this.pointerIMG}; 
    }
    preIMG(){
        if(this.pointerIMG) return {url: this.arrIMG[--this.pointerIMG].url, numberArr: this.pointerIMG};
        return false;
    }

}