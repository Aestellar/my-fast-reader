class Reader {


    constructor(viewManager, statistics, textElt) {
        this.vm = viewManager;
        this.statistics = statistics;
        this.textElt = textElt;
        this.playBtn;
        this.playFlag = false;
        this.currentWord;
        this.timeout;
        this.pauseCallbackBinded = this.pauseCallback.bind(this);
        this.selectWordCallbackBinded = this.selectWordCallback.bind(this);
        this.startWordIndex = 0;
    }


    init() {
        this.playBtn = document.querySelector('[data-fr-pause-button]');
        DOMHelper.attachClickEventS('[data-fr-pause-button]', this.pauseCallbackBinded);
        DOMHelper.attachClickEventS('[data-fr-text-container]',this.selectWordCallbackBinded);

        TextProcessor.formatText(this.textElt);

        // TextProcessor.splitToPages(this.textElt);
        let wordsElementList = DOMHelper.getOrderedElementListByClass(this.textElt, 'fr-word');
        let indexedWordList = DOMHelper.getIndexedElementList(wordsElementList, 'data-fr-word-index');
        this.wordList = Word.createWordList(indexedWordList);

        const count = this.getTotalCharactersCount();
        this.updateTotalTimeStatistics(count);

        this.spaceCallback = this.spaceCallbackFunction.bind(this);
        document.addEventListener('keyup', this.spaceCallback, true);
        this.load();
    }

    getTotalCharactersCount() {
        let lastWord = this.wordList[this.wordList.length - 1];
        console.assert(lastWord);
        const count = lastWord.getPreviousLength() + lastWord.getLength();
        return count;
    }

    updateTotalTimeStatistics(count) {
        this.statistics.updateTotalCharactersCount(count);
    }

    updateRemainigTimeStatistics(count) {
        this.statistics.updateRemainingCharactersCount(count);
    }

    selectWordCallback(e) {
        let el = e.target;
        if (el.hasAttribute('data-fr-word-index'))
        {
            let index = el.getAttribute('data-fr-word-index');
            index = parseInt(index);
            if (index === index) {
                this.currentWord.unmark();
                this.currentWord = this.wordList[index];
                this.currentWord.mark();
                console.log(this.currentWord);
            }
        }
    }

    spaceCallbackFunction(e) {
        console.log('Pressed key:' + e.key);

        if (e.key === " ") {
            this.playBtn.click();
            e.preventDefault();
        }


    }
// TODO Remove event binding with Play Button
    pauseCallback(e) {
        if (this.isPlaying()) {
            console.log('Paused');
            this.pause();
            if (e) { e.target.innerHTML = 'Play' };
        }
        else {
            console.log('Playing');
            this.play();
            this.updatePlaying();
            if (e) { e.target.innerHTML = 'Pause' };
        }
    }

    isPlaying() {
        return this.playFlag;
    }

    pause() {
        this.playFlag = false;
        clearTimeout(this.timeout);
        this.save();
    }

    play() {
        if (this.playFlag === true) {
            console.error('SetTimeout bug');
            return;
        }
        this.playFlag = true;
    }

    clean() {
        DOMHelper.removeClickEventS('[data-fr-pause-button]', this.pauseCallbackBinded);
        DOMHelper.removeClickEventS('[data-fr-text-container]',this.selectWordCallbackBinded);
        document.removeEventListener('keydown', this.spaceCallback, true);
        this.playFlag = false;
    }

    updatePlaying() {
        let playingFlag = this.isPlaying();
        let speed = 300;
        if (this.currentWord) {
            speed = this.calculateSpeed();
        }

        if (playingFlag) {
            if (!this.timeout) {
                this.timeout = setTimeout(this.loop.bind(this), speed);
            }
            else {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(this.loop.bind(this), speed);
            }


        }
    }

    loop() {
        console.log('Reading');
        let loopWord = this.currentWord;
        if (loopWord) {
            loopWord.unmark();
        }
        // let loopElement = this.currentElt;

        loopWord = this.nextWord(loopWord);
        this.currentWord = loopWord;
        if (!loopWord) {
            this.pause();
            console.log('No next word');
        }
        else {
            loopWord.mark();
            loopWord.scrollIntoView();
            this.updateRemainigTimeStatistics(loopWord.getNextLength());
            // console.log(loopWord);
            this.updatePlaying();
        }
    }

    nextWord(loopWord) {
        let nextWord;
        let index = 0;
        if (loopWord == null) {
            nextWord = this.wordList[index];
        }
        else {
            //console.log("loop Element",loopElement,loopElement.getAttribute('data-fr-word-index'));
            index = loopWord.extractIndex();
            nextWord = this.wordList[index + 1];
        }
        return nextWord;
    }

    calculateSpeed() {
        const speed = this.statistics.getSpeed(this.currentWord.getLength());
        // console.log("Timeout for word", this.currentWord, speed);
        return speed;
    }

    test() {
        console.assert(this.vm != undefined);
        console.assert(this.statistics != undefined);
        console.assert(this.textElt != undefined);
    }

    save(){
        const currentIndex = this.currentWord.extractIndex();
        StorageManager.saveLastWord(currentIndex);
    }

    load(){
        let index = StorageManager.loadLastWord();
        this.currentWord = this.wordList[index];
        this.currentWord.mark();
    }

}