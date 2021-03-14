class Reader {

    constructor(viewManager, statistics, book) {
        this.vm = viewManager;
        this.statistics = statistics;
        this.book = book;
        this.playFlag = false;
        this.currentWord;
        this.timeout;
        this.readerController = new ReaderController(this);
        this.wordRunner = new WordRunner(this);
        this.lastWordTime;
        this.wastedTime;

    }

    init() {
        this.readerController.init(this.book.getChapterList());

        const count = this.book.getTotalCharactersCount();
        this.updateTotalTimeStatistics(count);
        this.load();
    }

    updateTotalTimeStatistics(count) {
        this.statistics.updateTotalCharactersCount(count);
    }

    updateRemainingTimeStatistics(count) {
        let d = new Date();
        const afkTimeout = 60000;
        if(!this.lastWordTime){
             this.lastWordTime = d.getTime();
        }

        else{
            let timeDelta = 0;
            if(this.lastWordTime+afkTimeout < d.getTime()){
                this.wastedTime+=timeDelta;
            }
            else{
                timeDelta = d.getTime()-this.lastWordTime;
                this.wastedTime+=timeDelta;
            }
        }
        this.lastWordTime = d.getTime();


         console.log(this.wastedTime);

        this.statistics.updateWastedTime(this.wastedTime);
        this.statistics.updateRemainingCharactersCount(count);
    }





    getWord(index) {
        return this.book.getWord(index);
    }

    selectWord(index) {
        let selectedWord = this.getWord(index);
        this.wordRunner.selectWord(this.currentWord, selectedWord);
        this.currentWord = selectedWord;
        this.updateRemainingTimeStatistics(this.currentWord.getNextLength());
    }

    selectChapter(index){
       let chapter = this.book.getChapter(index);
       let firstTitleWordIndex = chapter.getFirstWordIndex();
       this.selectWord(firstTitleWordIndex);
        console.log('Selected chapter', chapter);
    }


    isPlaying() {
        return this.playFlag;
    }

    pause() {
        this.playFlag = false;
        this.readerController.displayPause(true);
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
        this.readerController.displayPause(false);
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
        if (!this.currentWord) {
            this.selectWord(0);
            this.updateRemainingTimeStatistics(this.currentWord.getNextLength());
            this.updatePlaying();
        }

        else {

            let nextWord = this.book.nextWord(this.currentWord.extractIndex());
            if (!nextWord) {
                this.wordRunner.resetSelection(this.currentWord);
                this.currentWord = null;
                this.pause();
                console.log('No next word');
            }
            else {
                this.selectWord(nextWord.extractIndex());
                this.currentWord = nextWord;
                this.updateRemainingTimeStatistics(nextWord.getNextLength());
                this.updatePlaying();
            }
        }
    }


    calculateSpeed() {
        let speed = this.statistics.getSpeed(this.currentWord.getLength());
        // let now = Date.now();
        // let lastDate = this.lastDate ? this.lastDate : now;
        // let timeDelta = now - lastDate;
        // speed -= timeDelta;
        // if (speed < 0) {
        //     speed = 0;
        // }
        // console.log("Timeout for word", this.currentWord, speed);
        return speed;
    }

    save() {
        if (this.currentWord) {
            const currentIndex = this.currentWord.extractIndex();
            StorageManager.saveLastWord(currentIndex);
        }

        StorageManager.saveWastedTime(this.wastedTime);
    }

    load() {
        this.wastedTime = StorageManager.loadWastedTime();

        let index = StorageManager.loadLastWord();
        this.selectWord(index);

        // this.currentWord = this.getWord(index);
        // this.currentWord.mark();
    }

}