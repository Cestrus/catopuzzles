//import {generator} from'/app/generator.js';

export class gameModel{
    constructor(){
        this.arrIMG = [];
        this.ifNotValidImg = {
            url: 'https://img.novosti-n.org/upload/ukraine/415345.jpg',
            width: 365,
            height: 470
        };
        this.pointerIMG;
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
                return {img: this.arrIMG[this.pointerIMG], numberArr: this.pointerIMG};
            }
            else return {img: this.ifNotValidImg, numberArr: this.pointerIMG}; 
        })
    }
    nextIMG(){
        if(!this.arrIMG.length || this.pointerIMG === this.arrIMG.length-1){
            return this.getIMG();
        }        
        else {
            // let obj =  {url: this.arrIMG[++this.pointerIMG].url, numberArr: this.pointerIMG};
            return new Promise((resolve)=>{
               resolve({img:this.arrIMG[++this.pointerIMG], numberArr: this.pointerIMG});
            });
        } 
    }
    preIMG(){
        if(this.pointerIMG) return {img: this.arrIMG[--this.pointerIMG], numberArr: this.pointerIMG};
        return false;
    }

}