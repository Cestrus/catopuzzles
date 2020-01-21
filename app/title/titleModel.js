export class titleModel{    
    randValue(){
        return Math.floor(Math.random()*256);
    }
    randColor(){
        return `rgb(${this.randValue()}, ${this.randValue()}, ${this.randValue()})`;
    }    
}