import { titleModel } from "./titleModel.js";
import { titleView } from "./titleView.js";

export class titleController{
    constructor() {
        this.model = new titleModel();
        this.view = new titleView(this.model.randColor.bind(this.model));
    }
}