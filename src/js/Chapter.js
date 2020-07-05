class Chapter{

    // constructor(firstTitleElement,lastTitleElement,chapterIndex){
    //     this.nextChapter;
    //     this.prevChapter;
    //     this.firstTitleElement = firstTitleElement;
    //     this.lastTitleElement = lastTitleElement;
    //     this.firstTitleWordIndex = parseInt(this.firstTitleElement.getAttribute('data-fr-word-index'));
    //     this.lastTitleWordIndex = parseInt(this.lastTitleElement.getAttribute('data-fr-word-index'));
    //     this.lastWordIndex;
    //     this.wordList = [];
    //     this.chapterElt;
    //     this.chapterIndex = chapterIndex;
    //     this.subchapterList;
    // }

    // init(){ 
    //     this.markAllWord(wordList);
    //     this.hideAllWords();
    // }

    // getIndex(){
    //     return this.chapterIndex;
    // }

    // getFirstTitleWordIndex(){
    //     return this.firstTitleWordIndex;
    // }

    // getLastTitleWordIndex(){
    //     return this.lastTitleWordIndex;
    // }

    // getNextChapter(){

    // }

    // getPrevChapter(){

    // }

    // showChapter(){

    // }

    // hideChapter(){

    // }

    // nextWord(){

    // }

    // setLastWordIndex(i){
    //     this.lastWordIndex = i;
    // }

    // getLastWordIndex(){
    //     return this.lastWordIndex;
    // }

    // isChapterWord(index){
    //     return (index>=this.getFirstTitleWordIndex())&&(index<=this.getLastWordIndex());
    // }

    // hideAllWords(){
    //     // debugger;
    //     for(let word of this.wordList){
    //         word.hide();
    //     }
    // }

    // showAllWords(){
    //     for(let word of this.wordList){
    //         word.show();
    //     }
    // }

    // markAllWord(wordList){
    //     for(let i = this.getFirstTitleWordIndex();i<this.getLastWordIndex();i++){
    //         wordList[i].getElement().setAttribute('fr-chapter-index',this.chapterIndex);
    //         this.wordList.push(wordList[i]);
    //     }
    // }
    
    // wrapWordElements(wordList,titleElement){
    //     let commonAncestorList = DOMHelper.findCommomAncestors(wordList,titleElement);
    //     let wrappedElements = DOMHelper.wrapElements(commonAncestorList,'fr-subchapter');
    //     return wrappedElements;
    // }

    // static splitEltToChapters(textElt, wordList){
    //     let chapterEltList = textElt.querySelectorAll('.fr-chapter'); 
    //     for(let chapterElt of chapterEltList){
    //         Chapter.markChapterTitle(chapterElt);
    //     }
    //     let chapterList = [];
    //     let firstWordIndex;
    //     let lastWordIndex;
    //     let bChapterTitleFlag = false;
    //     let chapterIndex = -1;

        
    //     let firstTitleWordList = textElt.querySelectorAll('[data-fr-chapter-title-first-word]');
    //     let lastTitleWordList = textElt.querySelectorAll('[data-fr-chapter-title-last-word]');
    //     console.assert(firstTitleWordList.length==lastTitleWordList.length);
    //     let prevChapter = null;
    //     for(let i = 0; i<firstTitleWordList.length;++i){
    //         let chapter = new Chapter(firstTitleWordList[i],lastTitleWordList[i],i);
    //         let nextBound= firstTitleWordList[++i];
    //         if (!!nextBound){
    //             chapter.setLastWordIndex(nextBound.getAttribute('[data-fr-word-index]')-1);
    //         }
    //         else{
    //             chapter.setLastWordIndex(wordList.length-1);
    //         }
    //         chapterList.push(chapter);
    //     }

    //     console.log(chapterList,'ChapterList');
    //     return chapterList;

    //     // for(let i = 0;i<wordList.length;++i){
    //     //     let wordElt = wordList[i].getElement();
            

    //     //     if(wordElt.hasAttribute('data-fr-chapter-title-first-word')){
    //     //         bChapterTitleFlag =true;
    //     //         chapterIndex+=1;
    //     //     }
    //     //     if(wordElt.hasAttribute('data-fr-chapter-title-last-word')){
    //     //         bChapterTitleFlag = false;
    //     //         continue;
    //     //     }
    //     //     if(!bChapterTitleFlag){

    //     //     }
    //     // }

        
    // }

    // static markChapterTitle(chapterTitleElt){
    //     let wordList = chapterTitleElt.querySelectorAll('.fr-word');
    //     console.assert(wordList.length>0);
    //     let lastIndex = wordList.length-1;
    //     let firstElement = wordList[0];
    //     let lastElement = wordList[lastIndex];
    //     firstElement.setAttribute('data-fr-chapter-title-first-word','1');
    //     lastElement.setAttribute('data-fr-chapter-title-last-word','1');
    // }

}