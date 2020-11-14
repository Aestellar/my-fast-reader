class Reader {

    constructor(viewManager, statistics, book) {
        this.vm = viewManager;
        this.statistics = statistics;
        this.book = book;
        // this.textElt = textElt;
        this.playFlag = false;
        this.currentWord;
        this.timeout;
        this.startWordIndex = 0;
        this.readerController = new ReaderController(this);
    }

    init() {
        this.readerController.init();

        const count = this.book.getTotalCharactersCount();
        this.updateTotalTimeStatistics(count);
        this.load();
    }

    updateTotalTimeStatistics(count) {
        this.statistics.updateTotalCharactersCount(count);
    }

    updateRemainigTimeStatistics(count) {
        this.statistics.updateRemainingCharactersCount(count);
    }

    getWord(index){
        return this.book.getWord(index);
    }

    selectWord(index){
        if(this.currentWord){
            this.currentWord.unmark();
        }
        this.currentWord = this.getWord(index);
        this.currentWord.mark();
        console.log(this.currentWord,index);
    }


    isPlaying() {
        return this.playFlag;
    }

    pause() {
        this.playFlag = false;
        clearTimeout(this.timeout);
        this.save();
        DOMHelper.hideOverlay();
    }

    play() {
        if (this.playFlag === true) {
            console.error('SetTimeout bug');
            return;
        }
        this.playFlag = true;
        DOMHelper.showOverlay();
    }

    clean() {
        this.readerController.clean();
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
        // console.log('Reading');
        let loopWord = this.currentWord;
        if (loopWord) {
            loopWord.unmark();
        }

        loopWord = this.nextWord(loopWord);

        this.currentWord = loopWord;
        if (!loopWord) {
            this.pause();
            console.log('No next word');
        }
        else {
            loopWord.mark();
            this.updateRemainigTimeStatistics(loopWord.getNextLength());
            this.updatePlaying();
        }
    }

    nextWord(loopWord) {
        let nextWord;
        let index = 0;
        if (loopWord == null) {
            nextWord = this.getWord(index);
        }
        else {
            //console.log("loop Element",loopElement,loopElement.getAttribute('data-fr-word-index'));
            index = loopWord.extractIndex();
            nextWord = this.getWord(index + 1);
        }
        return nextWord;
    }

    calculateSpeed() {
        let speed = this.statistics.getSpeed(this.currentWord.getLength());
        let now = Date.now();
        let lastDate = this.lastDate ? this.lastDate : now;
        let timeDelta = now - lastDate;
        speed -= timeDelta;
        if (speed < 0) {
            speed = 0;
        }
        // console.log("Timeout for word", this.currentWord, speed);
        return speed;
    }

    save() {
        if(this.currentWord){
        const currentIndex = this.currentWord.extractIndex();
        StorageManager.saveLastWord(currentIndex);
        }
    }

    load() {
        let index = StorageManager.loadLastWord();
        this.currentWord = this.getWord(index);
        this.currentWord.mark();
    }

}