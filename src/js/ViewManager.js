class ViewManager{

    constructor(){
        this.vc = new ViewCreator(this.dh);        
        this.controller = new FRController(this);
        this.mainContainerElt;
        this.statBlock;
        this.reader;
    }

    createView(quickStart){
        const mainContainerElt = this.vc.createMainContainer();
        this.mainContainerElt = mainContainerElt;
        
        this.attachEventListeners();
        this.createStatBlock();
        this.controller.launch(quickStart);

         console.log('View created');

    }

    attachEventListeners(){
        const exitBtn = this.mainContainerElt.querySelector('[data-fr-exitBtn]');
        console.log(this.mainContainerElt);
        exitBtn.addEventListener('click',this.controller.getClickExitCallback());
        document.addEventListener('keydown',this.controller.getEscapeExitCallback());
    }

    createStatBlock(){
        let statElt = this.mainContainerElt.querySelector('[data-fr-menu]');
        this.statBlock = new Statistics(this, statElt);
    }

    createReader(){
        this.reader = new Reader(this,this.statBlock,this.mainContainerElt.querySelector('[data-fr-text-container]'));
        this.reader.test();
    }

    start(textElement){
        DOMHelper.activeFlag = true;
        DOMHelper.hidePage();
        let textElt = TextProcessor.processText(textElement);
        this.setTextElement(textElt);
        this.showReadingScreen();
        this.createReader();
        this.reader.init();
    }







    clean(){
        DOMHelper.activeFlag = false;
        const exitBtn = this.mainContainerElt.querySelector('[data-fr-exitBtn]');
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
        let textContainer = this.mainContainerElt.querySelector('[data-fr-text-container]');

        textContainer.appendChild(textElt);
    }

}