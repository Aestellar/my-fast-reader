class Book {

    constructor(textElt) {
        this.textElt = textElt;
    }

    init() {
        TextProcessor.formatText(this.textElt);
        let wordsElementList = DOMHelper.getOrderedElementListByClass(this.textElt, 'fr-word');
        let indexedWordList = DOMHelper.getIndexedElementList(wordsElementList, 'data-fr-word-index');

        let sentencesElementList = DOMHelper.getOrderedElementListByClass(this.textElt, 'fr-sentence');
        this.indexedSentenceList = DOMHelper.getIndexedElementList(sentencesElementList, 'data-fr-sentence-index');
        // debugger;
        this.wordList = Word.buildWordList(indexedWordList);
        this.chapterList = Chapter.buildChapterList(this.textElt, this);
        console.log(this.chapterList);
    }


    getChapterList() {
        return this.chapterList;
    }

    getChapter(index) {
        return this.chapterList[index];
    }

    getTotalCharactersCount() {
        // return this.book.getTotalCharactersCount();

        let lastWord = this.wordList[this.wordList.length - 1];
        console.assert(lastWord);
        const count = lastWord.getPreviousLength() + lastWord.getLength();
        return count;
    }

    getWord(index) {
        return this.wordList[index];
    }

    nextWord(index) {
        return this.wordList[index + 1];
    }



}