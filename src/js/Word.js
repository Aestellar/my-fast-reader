class Word {

    constructor(wordElement) {
        this.wordElement = wordElement;
        this.mirrorElement;
        this.boundingRect;
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

    mark(){
        let mirror = this.wordElement.cloneNode(true);
        this.mirrorElement = mirror;
        console.assert(!!mirror,"Mirror element must be not null");

  
        let rect = this.wordElement.getBoundingClientRect();
        this.boundingRect = rect;
        mirror.style.position = "absolute";
        //Fix this fix
        mirror.style.top = rect.top + window.scrollY +'px';
        mirror.style.left = rect.left + window.scrollX +'px';
        mirror.style.zIndex = 120000;
        // this.wordElement.classList.add('fr-focus-word');
        mirror.classList.add('fr-focus-word');
        this.wordElement.parentElement.appendChild(mirror);

        this.wordElement.style.visibility ="hidden";
        
        // console.log(this.wordElement.getBoundingClientRect(),"Word rect");
        // console.log(this.mirrorElement.getBoundingClientRect(),"Mirror word rect");
        // console.log(window.screenX, window.screenY, 'window scrools');
    }

    unmark(){
        // this.wordElement.classList.remove('fr-focus-word');
        this.wordElement.style.visibility ="";
        this.wordElement.parentElement.removeChild(this.mirrorElement);
    }

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