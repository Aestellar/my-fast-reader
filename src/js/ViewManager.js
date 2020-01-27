class ViewManager{

    constructor(){
        this.vc = new ViewCreator(this.dh);        
        this.controller = new FRController(this);
        this.mainContainerElt;
        this.statBlock;
        this.reader;
    }

    createView(){
        const mainContainerElt = this.vc.createMainContainer();
        this.mainContainerElt = mainContainerElt;
        
        this.attachEventListeners(this.controller);
        this.createStatBlock();
        this.controller.launch();

         console.log('View created');

    }

    attachEventListeners(cntr){
        const exitBtn = this.mainContainerElt.querySelector('[data-fr-exitBtn]');
        console.log(this.mainContainerElt);
        exitBtn.addEventListener('click',cntr.getClickExitCallback());
        document.addEventListener('keydown',cntr.getEscapeExitCallback());
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
        DOMHelper.hidePage();
        let textElt = TextProcessor.processText(textElement);
        this.setTextElement(textElt);
        this.showReadingScreen();
        this.createReader();
        this.reader.init();
    }







    clean(){
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