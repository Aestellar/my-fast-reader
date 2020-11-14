class ViewManager{

    constructor(){ 
        this.controller = new FRController(this);
        this.mainContainerElt;
        this.statBlock;
        this.reader;
    }

    createView(quickStart){
        let vc = new ViewCreator();  
        const mainContainerElt = vc.createMainContainer();
        this.mainContainerElt = mainContainerElt;
        
        this.attachEventListeners();
        this.createStatBlock();
        this.controller.launch(quickStart);

         console.log('View created');

    }

    start(textElement){
        DOMHelper.activeFlag = true;
        DOMHelper.hidePage();
    
        let textElt = DOMHelper.cloneMainTextElt(textElement);
        this.setTextElement(textElt);
        this.showReadingScreen();
        DOMHelper.createOverlay();   

        let book = new Book(this.mainContainerElt.querySelector(DOMHelper.nameToSelector(Constants.textContainerName)));
        book.init();
        //this.reader = new Reader(this, this.statBlock,this.mainContainerElt.querySelector(DOMHelper.nameToSelector(Constants.textContainerName)), book);
        this.reader = new Reader(this, this.statBlock, book);
        this.reader.init();
    }
    
    attachEventListeners(){
        const exitBtn = this.mainContainerElt.querySelector(DOMHelper.nameToSelector(Constants.exitButtonName));
        console.log(this.mainContainerElt);
        exitBtn.addEventListener('click',this.controller.getClickExitCallback());
        document.addEventListener('keydown',this.controller.getEscapeExitCallback());
    }

    createStatBlock(){
        let statElt = this.mainContainerElt.querySelector(DOMHelper.nameToSelector(Constants.menuName));
        this.statBlock = new Statistics(this, statElt);
    }









    clean(){
        DOMHelper.activeFlag = false;
        const exitBtn = this.mainContainerElt.querySelector(DOMHelper.nameToSelector(Constants.exitButtonName));
        exitBtn.removeEventListener('click',this.controller.getClickExitCallback());
        document.removeEventListener('keydown',this.controller.getEscapeExitCallback());
        this.reader.clean();       
        DOMHelper.removeFRElements();
        DOMHelper.showPage();
    }

    showReadingScreen(){
        document.body.appendChild(this.mainContainerElt);
        // this.statBlock.updateText();
    }

    setTextElement(textElt){
        let textContainer = this.mainContainerElt.querySelector(DOMHelper.nameToSelector(Constants.textContainerName));

        textContainer.appendChild(textElt);
    }

}