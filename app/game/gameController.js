import {gameModel} from "/app/game/gameModel.js";
import {gameView} from "/app/game/gameView.js";

export class gameController{
    constructor(){
        this.model = new gameModel(this.renderIMG.bind(this));
        this.view = new gameView(this.model.nextIMG.bind(this.model), 
                                this.model.preIMG.bind(this.model), 
                                this.model.timeCount.bind(this.model));

    }
    renderIMG(obj){
        this.view.renderIMG(obj);
    }
}