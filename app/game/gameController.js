import {gameModel} from "/app/game/gameModel.js";
import {gameView} from "/app/game/gameView.js";

export class gameController{
    constructor(){
        this.model = new gameModel();
        this.view = new gameView(this.renderNextIMG.bind(this), 
                                this.renderPreIMG.bind(this), 
                                this.model.timeCount.bind(this.model));

        this.renderNextIMG();
    }
    renderNextIMG(){
        this.model.nextIMG().then(obj=>{
            this.view.renderIMG(obj);
        })        
    }
    renderPreIMG(){
        this.view.renderIMG(this.model.preIMG());
    }
}