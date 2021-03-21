class Statistics {
    constructor(viewManager,statElt){
        this.vm = viewManager;
        this.statElt = statElt;
        this.speed = Constants.SPEED;
        this.wordsPerSelection = 5;
        this.symbolsCount = 0;
        this.remainingSymbols = 0;
        this.wastedTime = 0;
        this.init();
    }

    init(){
        DOMHelper.attachClickEventS('[data-fr-speed-up]',this.increaseSpeed.bind(this),this.statElt);
        DOMHelper.attachClickEventS('[data-fr-speed-down]',this.decreaseSpeed.bind(this),this.statElt);
        DOMHelper.attachClickEventS('[data-fr-words-speed-up]',this.increaseWordsPerSelection.bind(this),this.statElt);
        DOMHelper.attachClickEventS('[data-fr-words-speed-down]',this.decreaseWordsPerSelection.bind(this),this.statElt);

        // let speedUp = this.statElt.querySelector('[data-fr-speed-up]');
        // let speedDown = this.statElt.querySelector('[data-fr-speed-down]');
        // speedUp.addEventListener('click',this.increaseSpeed.bind(this));
        // speedDown.addEventListener('click',this.decreaseSpeed.bind(this));

        this.updateView();
    }

    updateView(){
        let speedElt = this.statElt.querySelector('[data-fr-speed-counter]');
        speedElt.textContent = 'Reading speed:'+this.speed;
        let wordsPerSelection = this.statElt.querySelector('[data-fr-words-per-selection]');
        wordsPerSelection.textContent = 'Words per selection:'+this.wordsPerSelection;
        let totalTimeElt = this.statElt.querySelector('[data-fr-time-to-read-total]');
        let totalTime = this.symbolsCount*60/this.speed;

        totalTimeElt.textContent = 'Time to read:' + this.getFormattedTime(totalTime);
        let remainingTimeElt = this.statElt.querySelector('[data-fr-time-to-read-remaining]')
        let remainingTime = this.remainingSymbols*60/this.speed;
        remainingTimeElt.textContent = 'Remaining time:'+this.getFormattedTime(remainingTime);
        
        let totalCharactersCountElt = this.statElt.querySelector('[data-fr-total-characters-count]');
        totalCharactersCountElt.textContent = "Total characters: "+this.symbolsCount;


        let wastedTimeElt = this.statElt.querySelector('[data-fr-wasted-time]');
        wastedTimeElt.textContent = "Time: " + this.getFormattedTime(this.wastedTime/1000);
        

//TODO Change calculation
        let percentage = 100*(totalTime-remainingTime)/totalTime;
        let percentageElt = this.statElt.querySelector('[data-fr-percentage-of-completion]');
        percentageElt.textContent = "Completion: "+percentage.toPrecision(3)+'%';

        //return this.statElt;
    }

    increaseSpeed(e){
        let value = Constants.BASESPEEDCHANGE;
        if(e.shiftKey) value = Constants.SHIFTSPEEDCHANGE;
        this.speed+=value;
        this.updateView();
    }

    decreaseSpeed(e){
        let value = Constants.BASESPEEDCHANGE;
        if(e.shiftKey) value = Constants.SHIFTSPEEDCHANGE;
        this.speed-=value;

        if(this.speed<0){
            this.speed=0;
        }

        this.updateView();
    }

    increaseWordsPerSelection(value){
        value?value:1;
        this.wordsPerSelection+=1;
        this.updateView();
    }

    decreaseWordsPerSelection(value){
        value = value?value:1;
        this.wordsPerSelection-=1;
        if(this.wordsPerSelection< 1){
            this.wordsPerSelection=1;
        }
        this.updateView();
    }

    getSpeed(length){
        return parseInt(length/this.speed * 60000);
    }

    getFormattedTime(time){
        let formattedTime = time+'';
        
        return formattedTime.toHHMMSS();
    }

    updateTotalCharactersCount(count){
        this.symbolsCount = count;
        this.updateView();
    }

    updateRemainingCharactersCount(count){
        this.remainingSymbols = count;
        this.updateView();
    }   

    updateWastedTime(time){
        this.wastedTime = time;
        this.updateView();       
    }

    formatTime(time){
        
    }

}