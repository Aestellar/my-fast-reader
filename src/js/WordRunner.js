class WordRunner{
    constructor(reader){
        this.reader = reader;
        this.currentWord;
        this.runnerElt = this.createRunnerElement();
        document.body.appendChild(this.runnerElt);
    }

    createRunnerElement(){
        let runnerElt = document.createElement('span');
        runnerElt.style.position = "absolute";
        runnerElt.style.zIndex = 120000;
        runnerElt.style.background = "#EEE";
        runnerElt.classList.add('fr-focus-word');
        runnerElt.setAttribute(Constants.FAST_READER_ATTRIBUTE,'true');
        return runnerElt;
    }

    selectWord(currentWord,selectedWord){
        if(currentWord){
            this.resetSelection(currentWord);
        }
        this.focusWord(selectedWord);
        // console.log(this.currentWord,selectedWord);
    }

    focusWord(word){
        let rect = word.wordElement.getBoundingClientRect();
        word.boundingRect = rect;
        this.runnerElt.style.top = rect.top - rect.height/(2*1.5) + window.scrollY +'px';
        this.runnerElt.style.left = rect.left - rect.width/(2*1.5) + window.scrollX +'px'; 
        this.runnerElt.appendChild(word.wordElement.cloneNode(true));
        this.runnerElt.style.display = "block";
        word.scrollIntoView();
    }



    resetSelection(word){
        this.runnerElt.style.display ='none';
        this.runnerElt.innerHTML = '';
    }

    selectSentence(){

    }
}