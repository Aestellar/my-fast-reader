class Book{

    constructor(textElt){
        this.textElt = textElt;
    }

    init(){
        TextProcessor.formatText(this.textElt);
        let wordsElementList = DOMHelper.getOrderedElementListByClass(this.textElt, 'fr-word');
        let indexedWordList = DOMHelper.getIndexedElementList(wordsElementList, 'data-fr-word-index');
        this.wordList = Word.createWordList(indexedWordList);
        
    }

    getTotalCharactersCount() {
        // return this.book.getTotalCharactersCount();

        let lastWord = this.wordList[this.wordList.length - 1];
        console.assert(lastWord);
        const count = lastWord.getPreviousLength() + lastWord.getLength();
        return count;
    }

    getWord(index){
        return this.wordList[index];
    }
}