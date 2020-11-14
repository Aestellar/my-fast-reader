class Word {

    constructor(wordElement) {
        this.wordElement = wordElement;
        this.mirrorElement;
        this.boundingRect;
        this.displayInitial = this.wordElement.style.display;
        this.length = 0;
        this.previousLength = 0;
        this.nextLength = 0;
        
        this.update();
    }

    update() {
        this.text = this.wordElement.childNodes[0].nodeValue;
        this.length = this.text.length;
    }

    extractIndex(){
        const i = parseInt(this.wordElement.getAttribute('data-fr-word-index'));
        return i;
    }

    hide(){
        this.getElement().style.display = 'none';
    }

    show(){
        this.getElement().style.display = this.displayInitial;
    }

    getLength() {
        return this.length;
    }

    getPreviousLength() {
        return this.previousLength;
    }

    getNextLength() {
        return this.nextLength;
    }

    setPreviousLength(length) {
        this.previousLength = length;
    }

    setNextLength(length) {
        this.nextLength = length;
    }

    getElement(){
        return this.wordElement;
    }

//     mark(){
//         let rect = this.wordElement.getBoundingClientRect();
//         this.boundingRect = rect;
//         // this.createMirrorElement();
//         this.mirrorElement = this.createMirrorElement();
//         document.body.appendChild(this.mirrorElement);
//         // this.wordElement.style.visibility ="hidden";  
//         this.scrollIntoView();
//     }


// //TODO
//     createMirrorElement(){
//         let mirror = this.wordElement.cloneNode(true);
//         // this.mirrorElement = mirror;
//         console.assert(!!mirror,"Mirror element must not be null");   
//         mirror.style.position = "absolute";
//         mirror.style.zIndex = 120000;
//         mirror.style.background = "#EEE";
//         mirror.classList.add('fr-focus-word');
//         mirror.setAttribute(Constants.FAST_READER_ATTRIBUTE,'true');
              
//         mirror.style.top = this.boundingRect.top - this.boundingRect.height/2 + window.scrollY +'px';
//         mirror.style.left = this.boundingRect.left - this.boundingRect.width/2 + window.scrollX +'px';        


//         return mirror;
//     }

//     unmark(){+
//         // this.wordElement.style.visibility ="";
//         document.body.removeChild(this.mirrorElement);
//     }

    scrollIntoView(){
        let inView = DOMHelper.isInViewportRect(this.boundingRect);
        if(!inView){
            //console.log('scroll');
            this.wordElement.scrollIntoViewIfNeeded();
        }

    }












    static createWordList(orderedElementsList) {
        let wordList;

        wordList = orderedElementsList.map((el, index) => {
            let word = new Word(el);
            return word;
        });
        Word.updateTotalCharactersCount(wordList);
        return wordList;
    }



    static updateTotalCharactersCount(wordList) {
        wordList.reduce((total, word) => {
            word.setPreviousLength(total);
            total += word.getLength();
            return total;
        },0);
        wordList.reduceRight((total, word) => {
            word.setNextLength(total);
            total += word.getLength();
            return total;
        },0);
        return wordList;
    }

}