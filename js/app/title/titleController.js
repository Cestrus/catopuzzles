import { titleModel } from "/js/app/title/titleModel.js";
import { titleView } from "/js/app/title/titleView.js";

export class titleController{
    constructor() {
        this.model = new titleModel();
        this.view = new titleView(this.model.randColor.bind(this.model));
    }
}