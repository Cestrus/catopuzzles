export class gameModel{
    constructor(){
        this.arrIMG = [];
        this.ifNotValidImg = 'https://img.novosti-n.org/upload/ukraine/415345.jpg';
        this.pointerIMG;
        this.timer = this.timeCount;

    }
    timeCount(){
       return setInterval(()=>{
            let sec=0, min=0;
            if(sec == 59) {
                sec = 0;
                min++;
            }
            else sec++;
            return `${min} : ${sec}`;
        }, 1000);
    }
    timerCountClear(){
        clearInterval(this.timer);
    }
    loadIMG(){        
        return fetch('https://api.thecatapi.com/v1/images/search').
                then(res=>res.json()).
                then(el=>{
                    let {id, url, width, height} = el[0];
                    return {id, url, width, height}
                });
    };
    getIMG(){
        return this.loadIMG().then(obj=>{            
            if(obj.url.match(/.jp/)){  // проверка на jpeg или jpg
                this.arrIMG.push(obj);
                this.pointerIMG = this.arrIMG.length-1;
                return {url: this.arrIMG[this.pointerIMG].url, numberArr: this.pointerIMG};
            }
            else return {url: this.ifNotValidImg, numberArr: this.pointerIMG}; 
        })
    }
    nextIMG(){
        if(!this.arrIMG.length || this.pointerIMG == this.arrIMG.length-1){
            return this.getIMG();
        }        
        else {
            let obj =  {url: this.arrIMG[++this.pointerIMG].url, numberArr: this.pointerIMG};
            return new Promise(function(resolve, reject){
               console.log('in model else', obj);
               resolve(obj);
            });
        } 
    }
    preIMG(){
        if(this.pointerIMG) return {url: this.arrIMG[--this.pointerIMG].url, numberArr: this.pointerIMG};
        return false;
    }

}