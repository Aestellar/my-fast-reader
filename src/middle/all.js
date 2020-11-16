class Book{

    constructor(textElt){
        this.textElt = textElt;
    }

    init(){
        TextProcessor.formatText(this.textElt);
        let wordsElementList = DOMHelper.getOrderedElementListByClass(this.textElt, 'fr-word');
        let indexedWordList = DOMHelper.getIndexedElementList(wordsElementList, 'data-fr-word-index');

        let sentencesElementList = DOMHelper.getOrderedElementListByClass(this.textElt, 'fr-sentence');
        this.indexedSentenceList = DOMHelper.getIndexedElementList(sentencesElementList, 'data-fr-sentence-index');
        // debugger;
        this.wordList = Word.buildWordList(indexedWordList);
        this.chapterList = Chapter.buildChapterList(this.textElt);
        console.log(this.chapterList);
    }


    getChapterList(){
        return this.chapterList;
    }

getChapter(index){
    return this.chapterList[index];
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

    nextWord(index){
        return this.wordList[index+1];
    }



}
class Chapter{

    constructor(titleElt, innerNodeList){
        this.titleName = titleElt.textContent;
        this.titleElt = titleElt;
        this.innerNodeList = innerNodeList;
    }

init()
{
    titleWords = this.titleElt.querySelectorAll(".fr-word");

}

    getTitleElement(){
        return this.titleElt;
    }

    getTitleName(){
        return this.titleElt.textContent;
    }

    getFirstWordIndex(){
        let firstWordElt = this.titleElt.querySelector('.fr-word');
        return DOMHelper.getIndexFromWordElement(firstWordElt);
    }
    
    extractIndex(){
        const i = parseInt(this.titleElt.getAttribute('data-fr-chapter-index'));
        return i;
    }


    static buildChapterList(textElt){

        let chapterList = [];
        let titleList = textElt.querySelectorAll(".fr-chapter-title");

        for(let i=0;i<titleList.length;i++){
            let titleElt = titleList[i];
            let nodeList = [];
            // chapterContentMap.set(titleElt.textContent, nodeList);

            let nextSibling = titleElt.nextSibling;
            while(nextSibling&&nextSibling!==titleList[i+1]){
                nodeList.push(nextSibling);
                nextSibling = nextSibling.nextSibling;
            }
            let chapter = new Chapter(titleElt,nodeList);
            chapterList.push(chapter);
        }

        return chapterList;


   
            
            // let chapterContainer = DOMHelper.createFRElement('span','fr-chapter-container');
            // chapterContainer.setAttribute("data-"+'fr-chapter-index', i);
            // titleElt.after(chapterContainer);
            // nodeList.forEach((el)=>{
            //     chapterContainer.appendChild(el)
            // });



    }

}
class Constants{
    static get SPEED (){ return 4000}; 
    static get BASESPEEDCHANGE(){return 100};
    static get SHIFTSPEEDCHANGE(){return 500};
    static get FAST_READER_ATTRIBUTE(){return "data-fast-reader-attribute"};
    static get exitButtonName(){return "data-fr-exit-btn"};
    static get menuName(){return "data-fr-menu"};
    static get textContainerName(){return 'data-fr-text-container'};
}
class DOMHelper {

    static activeFlag = false;

    static isActive(){
        return this.activeFlag;
    }


    static cloneMainTextElt(el) {
        let newElt = el.cloneNode(true);
        newElt.classList.remove('no_scroll_hide');
        // let textContainer = document.querySelector("[data-fr-text-container]");
        return newElt;
        //textContainer.appendChild(newElt);
    }

    static applyStyle(styleCSS){
        let styleElt = document.createElement("style");
        styleElt.innerHTML = styleCSS;
        document.head.appendChild(styleElt);
    }

    static createFRElement(type, className,  text) {
        let el = this.createElement(type, className, text);
        el.setAttribute(Constants.FAST_READER_ATTRIBUTE,1);
        return el;
    }

    static createElement(type, className, text) {
        let el = document.createElement(type);
        el.className += className;
        el.setAttribute("data-"+className, "");
        el.innerHTML = text || "";
        return el;
    }

    static attachClickEventS(selector,callback,parentElement){
        parentElement=parentElement||document;
        const el = parentElement.querySelector(selector);
        console.assert(!!el);
        el.addEventListener('click',callback);
    }

    static removeClickEventS(selector,callback,parentElement){
        parentElement=parentElement||document;
        const el = parentElement.querySelector(selector);
        console.assert(!!el);
        el.removeEventListener('click',callback);
    }

    static removeFRElements() {
        let list = document.querySelectorAll("[" + Constants.FAST_READER_ATTRIBUTE + "]");
        console.log(list);
        list = Array.from(list);
        list.forEach((e) => e.remove());

    }

    static getElementByCoordinates(x, y, className){
       let elementList = document.elementsFromPoint(x,y);
       let results = elementList.filter((el)=>{
           if(el.classList.contains(className))
           return el;
       });
       if(results.length){
           return results[0];
       }
       return null;
    }

    // static findElementByName(element,name){
    //     let selector = "["+name+"]";
    //     return element.querySelector(selector);
    // }

    static nameToSelector(name){
        return"["+name+"]";
    }

    static showPage(){
        let list = document.body.children;
        list = Array.from(list);
        list.forEach(l=>{
            l.classList.remove("no_scroll_hide");
        });
    }

    static hidePage(){
        let list = document.body.children;
        list = Array.from(list);
        list.forEach(l=>{
            l.classList.add("no_scroll_hide");
        });
    }



    static createOverlay(){
        if(document.querySelector(".fr-overlay")){
            return;
        }

        let overlay = DOMHelper.createFRElement("div","fr-overlay","data-fr-overlay");
        
        // = document.createElement("div");
        // overlay.className = "fr-overlay";



        overlay.style.height = document.body.scrollHeight+"px"; 
        document.body.appendChild(overlay);
    }

    static removeOverlay(){
        let overlay = document.querySelector(".fr-overlay");
        if(overlay){
            overlay.remove();
        }
    }

    static showOverlay(){
        let overlay = document.querySelector(".fr-overlay");
        overlay.style.display = "block";
    }

    static hideOverlay(){
        let overlay = document.querySelector(".fr-overlay");
        overlay.style.display = "none";
    }

    static getOverlayElement(){
        let overlay = document.querySelector(".fr-overlay");
        return overlay;
    }


    static cssPath (el) {
        if (!(el instanceof Element)) 
            return;
        var path = [];
        while (el.nodeType === Node.ELEMENT_NODE) {
            var selector = el.nodeName.toLowerCase();
            if (el.id) {
                selector += '#' + el.id;
                path.unshift(selector);
                break;
            } else {
                var sib = el, nth = 1;
                while (sib = sib.previousElementSibling) {
                    if (sib.nodeName.toLowerCase() == selector)
                       nth++;
                }
                if (nth != 1)
                    selector += ":nth-of-type("+nth+")";
            }
            path.unshift(selector);
            el = el.parentNode;
        }
        return path.join(" > ");
     }


    static getIndexFromWordElement(elt){
        if (elt.hasAttribute('data-fr-word-index')) {
            let index = elt.getAttribute('data-fr-word-index');
            index = parseInt(index);
            if (index === index) {
                return index;
            }
        }
        return null;
    }

    static getIndexFromChapterMenuElement(elt){
        if (elt.hasAttribute('fr-chapter-menu-index')) {
            let index = elt.getAttribute('fr-chapter-menu-index');
            index = parseInt(index);
            if (index === index) {
                return index;
            }
        }
        return null;
    }


    static isInViewport = function (elem) {
        var bounding = elem.getBoundingClientRect();
        return DOMHelper.isInViewportRect(bounding);
    };

    static isInViewportRect = function (bounding) {
        // var bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };   

//TODO rename    
   static getIndexedElementList(orderedList,indexName){
       let indexedList = orderedList.map((el,index)=>{
        el.setAttribute(indexName,index);
        return el;
       });

       return indexedList;
   }

static getOrderedElementListByClass(containerElt, className){
    let orderedNodeList = DOMHelper.getOrderedNodeList(containerElt);
    // console.log(orderedNodeList, 'orderedNodeList');
    let orderedElementList = orderedNodeList.filter((node)=>{
        if(node.nodeType===1&&node.classList.contains(className)){
            return true;
        }
        return false;
    });
    return orderedElementList;
}

//Walk in depth
static getOrderedNodeList(element,options) {
    options = options||{};
    const excludesList = options.excludes||[];
    const nodeList = element.childNodes;
    const nodeArray = Array.from(nodeList);
    const pathArray = [];
    const resultNodeList = [];


    let timeout = 0;
    for (let node of nodeArray) {
        let cNode = node;
        let parentNode = node;
        while (cNode != null) {
            // let text = cNode.nodeValue;
            // if(text){
            //     textArray.push(cNode.nodeValue);
            // }
            resultNodeList.push(cNode);
            let excludeFlag = false;

            if(cNode.nodeType ===1 && excludesList.length>0){
                excludeFlag = excludesList.includes(cNode.nodeName);
                excludeFlag = excludeFlag||cNode.parentElement.style.display === "none";
            }

            // excludesList.includes(cNode.nodeName);
            if (cNode.childNodes.length > 0 && !excludeFlag) {
                pathArray.push(cNode);                
                cNode = cNode.childNodes[0];
            }

            else {
                if (cNode.childNodes.length == 0 && cNode == parentNode) {
                    break;
                }
                cNode = cNode.nextSibling;
            }

            while ((cNode == null) && (pathArray.length > 0)) {
                cNode = pathArray.pop().nextSibling;
            }

            timeout += 1;
            if (timeout > 1000000) {
                break;
            }
        }
    }

    return resultNodeList;
}
}

class FastReaderMain{

    static init(){
        console.log("Init FastReaderMain");
        DOMHelper.applyStyle(styleCSS);
        let viewCreator = new ViewCreator();
        let launchBtn = viewCreator.createLaunchButton(FastReaderMain.launch);
        document.body.appendChild(launchBtn);
        FastReaderMain.expandStringPrototype();
        FastReaderMain.addMainListeners();
    }


    static launch(event, quickStart){
        event.stopPropagation();
        let vm = new ViewManager();
        vm.createView(quickStart);
        console.log('static launch');
        // document.removeEventListener('click',FastReaderMain.launch);
    }



    static addMainListeners(){
        document.addEventListener('keydown',(e)=>{
            if(e.code=='KeyQ'&&e.ctrlKey){
                if(!DOMHelper.isActive()){
                    FastReaderMain.launch(e, true);
                }
            }
        });
    }


    static expandStringPrototype(){
        String.prototype.toHHMMSS = function () {
            var sec_num = parseInt(this, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
        
            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            return hours+':'+minutes+':'+seconds;
        }
    }
}

// Сначала FastReaderMain загружается, применяет css и создаёт кнопку запуска. В коллбеке этой кнопки создаётся DomHelper, вспомогательный класс с внедрением текстовых констант. 
// Затем создаётся объект контроллёра со всякими изменяющими функциями. А потом создаётся ViewManager который создаёт через ViewCreator нужный набор dom элементов. 
// К этим элементам ViewManager привязывает коллбеки контроллёра. И вообще весь менеджмент идёт через него. 
class FRController{

    constructor(viewManager){
        this.vm = viewManager;
        this.launchReadingMode = this.launchReadingMode.bind(this);
        this.exitReadingMode = this.exitReadingMode.bind(this);
        this.onEscape = this.onEscape.bind(this);
    }

    getClickExitCallback(){
        return this.exitReadingMode;
    }

    getEscapeExitCallback(){
        return this.onEscape;
    }

     getlaunchCallback(){
        return this.launch;
    }

     launch(quickStart){
        console.log("Reading mode enabled");
        if(quickStart){
            let el = document.querySelector(StorageManager.loadDefaultSelector()); 
            if(el){
                this.launchReadingMode(el);
            }
        }
        else{
            TextPicker.pickTextFromPage(this.launchReadingMode);            
        }

    }

     launchReadingMode(el){
        //console.log(self,this);
        this.vm.start(el);

    }

     exitReadingMode(){
        console.log('exit reading mode');
        this.vm.clean();
    }

     onEscape(e){
        const key = e.key;
        if(key==="Escape"){
            console.log("Pressed Escape button");
            this.exitReadingMode();
        }
    }
 

}
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

    updateRemainigTimeStatistics(count) {
        this.statistics.updateRemainingCharactersCount(count);
    }





    getWord(index) {
        return this.book.getWord(index);
    }

    selectWord(index) {
        let selectedWord = this.getWord(index);
        this.wordRunner.selectWord(this.currentWord, selectedWord);
        this.currentWord = selectedWord;
        this.updateRemainigTimeStatistics(this.currentWord.getNextLength());
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
            this.updateRemainigTimeStatistics(this.currentWord.getNextLength());
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
                this.updateRemainigTimeStatistics(nextWord.getNextLength());
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
    }

    load() {
        let index = StorageManager.loadLastWord();
        this.selectWord(index);
        // this.currentWord = this.getWord(index);
        // this.currentWord.mark();
    }

}
class ReaderController{

constructor(reader){
    this.reader = reader;
    this.playBtn;              
    this.pauseCallbackBinded = this.pauseCallback.bind(this);
    this.selectWordCallbackBinded = this.selectWordCallback.bind(this);
    this.selectWordBehindOverlayCallbackBinded = this.selectWordBehindOverlayCallback.bind(this);
    this.selectChapterCallbackBinded = this.selectChapterCallback.bind(this);
}


init(chaptersList){
    this.playBtn = document.querySelector('[data-fr-pause-button]');
    DOMHelper.attachClickEventS('[data-fr-pause-button]', this.pauseCallbackBinded);
    DOMHelper.attachClickEventS('[data-fr-text-container]', this.selectWordCallbackBinded);
    DOMHelper.attachClickEventS('[data-fr-overlay]', this.selectWordBehindOverlayCallbackBinded);
    this.spaceCallback = this.playCallback.bind(this);
    document.addEventListener('keyup', this.spaceCallback, true);
    this.initChaptersMenu(chaptersList);
    DOMHelper.attachClickEventS('[data-fr-chapters-menu-list]',this.selectChapterCallbackBinded);

}

clean(){
    DOMHelper.removeClickEventS('[data-fr-pause-button]', this.pauseCallbackBinded);
    DOMHelper.removeClickEventS('[data-fr-text-container]', this.selectWordCallbackBinded);
    DOMHelper.removeClickEventS('[data-fr-overlay]',this.selectWordBehindOverlayCallbackBinded);
    DOMHelper.removeClickEventS('[data-fr-chapters-menu-list]',this.selectChapterCallbackBinded);
    document.removeEventListener('keydown', this.spaceCallback, true);

}

initChaptersMenu(chaptersList){
    this.chaptersMenuElt = document.querySelector('.fr-chapters-menu-list');
    chaptersList.forEach((chapter,index)=>{
        let title = chapter.getTitleName();
        let chapterMenuElt = DOMHelper.createElement('div','fr-chapters-menu-chapter',title);
        chapterMenuElt.setAttribute('fr-chapter-menu-index',index);
        this.chaptersMenuElt.appendChild(chapterMenuElt);
    });
}

selectChapterCallback(e){
    let index = DOMHelper.getIndexFromChapterMenuElement(e.target);
    if(Number.isInteger(index)){
        this.reader.selectChapter(index);
    }
}


selectWordCallback(e) {
    let index = DOMHelper.getIndexFromWordElement(e.target);
    if(Number.isInteger(index)){
        this.reader.selectWord(index);
    }
}

selectWordBehindOverlayCallback(e){
    console.log('Overlay callback');
    let wordElt = DOMHelper.getElementByCoordinates(e.clientX, e.clientY,"fr-word");
    if(wordElt){
        let index = DOMHelper.getIndexFromWordElement(wordElt);
        this.reader.selectWord(index);
    }
}

playCallback(e) {
    console.log('Pressed key:' + e.key);

    if (e.key === "Control") {
        this.playBtn.click();
        e.preventDefault();
    }
}

// TODO Remove event binding with Play Button
pauseCallback(e) {
    if (this.reader.isPlaying()) {
        console.log('Paused');
        this.reader.pause();
        this.displayPause(true);
        // if (e) { e.target.innerHTML = 'Play' };
    }
    else {
        console.log('Playing');
        this.reader.play();
        this.reader.updatePlaying();
        this.displayPause(false);
        // if (e) { e.target.innerHTML = 'Pause' };
    }
}

displayPause(pauseFlag){
    if(pauseFlag){
        this.playBtn.innerHTML = "Play";
    }
    else{
        this.playBtn.innerHTML = "Pause";
    }
}

}
class Statistics {
    constructor(viewManager,statElt){
        this.vm = viewManager;
        this.statElt = statElt;
        this.speed = Constants.SPEED;
        this.wordsPerSelection = 5;
        this.symbolsCount = 0;
        this.remainingSymbols = 0;
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

    formatTime(time){
        
    }

}
class StorageManager{

    static defaultSelectorName = "FR-default-selector";
    static loadLastWord(){
        let path = window.location.pathname;
        let lastWordIndex = window.localStorage.getItem(path);
        if (lastWordIndex){
            return lastWordIndex;
        }
        return 0;
    }

    // static putLastWord(wordIndex){

    // }

    static saveLastWord(wordIndex){
        let path = window.location.pathname;
        window.localStorage.setItem(path,wordIndex);
    }

    static saveDefaultSelector(selector){
        window.localStorage.setItem(StorageManager.defaultSelectorName,selector);
    }

    static loadDefaultSelector(){
        return window.localStorage.getItem(StorageManager.defaultSelectorName);

    }

}
class TextPicker {

static readingModecallback;

    static mouseout(e){
        console.log("mouseout",e);
        e.target.classList.remove("color1");
    }

    static mouseenter(e){
        console.log(e.target,this);
        e.target.classList.add("color1");
    }

    static mouseleave(e){
        console.log("mouseleave",e);
        e.target.classList.remove("color1");       
    }

    static click(e){
        e.stopPropagation();
        console.log('click from text picker');

        let validSelection = true;
        //console.warn('Picked element event started',e);
        //console.log("remove listeners");
        // document.removeEventListener("mouseout",TextPicker.mouseout,true);
        document.removeEventListener("mouseleave",TextPicker.mouseleave,true);
        document.removeEventListener("mouseenter",TextPicker.mouseenter,true);
        document.removeEventListener("click",TextPicker.click,{once:true,capture:true});
        let el = e.target;
        let parentElt = e.target.parentElement;
        let el1 = parentElt;
        console.log('target',e.target,'parent Element', parentElt);
        while(el.parentElement){
            el.classList.remove("color1");
            el = el.parentElement;
        }
        
        el1.classList.add("marked");
        console.log(el1);
        // el1 = el1.cloneNode(true);
        //console.log("click",e.target,el,el1);
        // el1.classList.remove('no_scroll_hide');
        console.log("Selected text element",el1);
        const selector = DOMHelper.cssPath(el1);


        if(validSelection){
            StorageManager.saveDefaultSelector(selector);
            TextPicker.readingModecallback(el1);
        }

    }



    static pickTextFromPage(readingModecallback){
        TextPicker.readingModecallback = readingModecallback;
        // document.addEventListener("mouseout", TextPicker.mouseout,true);
        document.addEventListener("mouseleave",TextPicker.mouseleave,true);

        document.addEventListener("mouseenter",TextPicker.mouseenter,true);

        //setTimeout(500,()=>{document.body.addEventListener("click",click);})
        document.addEventListener("click",TextPicker.click,{once:true,capture:true});

    }
}
class TextProcessor {

    static encapsulateBodyText() {
        console.log("Start encapsulating");
        let list = document.body.childNodes;
        let mapTypes = {};
        for (let i = 0; i < list.length; i++) {
            let le = list[i];
            if (mapTypes.hasOwnProperty(le.nodeType)) {
                mapTypes[le.nodeType] += 1;
            }
            else {
                mapTypes[le.nodeType] = 0;
            }
            if (le.nodeType == 3) {
                console.log(le);
                let spanNode = document.createElement("span");
                let newTextNode = document.createTextNode(le.textContent);
                spanNode.appendChild(newTextNode);
                le.parentNode.replaceChild(spanNode, le);
            }
        }
        console.log(mapTypes);
    }

    static countSymbols(textElt) {
        let nodeList = DOMHelper.getOrderedNodeList(textElt);
        let count = nodeList.reduce((previousValue, currentItem) => {
            let nodeValue = currentItem.nodeValue;
            let length = 0;
            if (nodeValue) { length = nodeValue.length }
            return previousValue + length
        }, 0);

        return count;
    }

    static markChapters(textElt){
        let hList = textElt.querySelectorAll("h3");

        for(let i=0;i<hList.length;i++){

            let titleElt = hList[i];
            titleElt.classList.add("fr-chapter-title");
            titleElt.setAttribute("data-"+'fr-chapter-title-index', i); 
        }
    }


    static embraceWords(wordList) {

        let embracedWords = wordList.map((word, i, array) => {
            let newSpan = document.createElement("span");
            newSpan.classList.add('fr-word');
            newSpan.textContent = word + ' ';
            return newSpan;
            //array[i] = `<span class="fr-word"> ${word}</span>`;
        });
        return embracedWords;
    }

    static parseWords(string) {
        let wordList = string.split(' ');
        wordList = wordList.filter((el) => {
            if (el.trim().length > 0) {
                return true;
            }
            // console.log(wordsArr);
            return false;
        });
        // console.log(wordsArr)
        let embracedWordList = TextProcessor.embraceWords(wordList);

        // let newString = wordList.join(' ');
        let sentenceElt = document.createElement("span");
        sentenceElt.classList.add('fr-sentence');
        if (string.search("Глава") != -1) {
            sentenceElt.classList.add('fr-chapter');
        }
        embracedWordList.forEach((elt) => {
            sentenceElt.appendChild(elt);
        });

        // sentenceElt.textContent = newString;
        return sentenceElt;
    }

    static formatText(textElt) {
        let nodeList = DOMHelper.getOrderedNodeList(textElt, { excludes: ['CODE'] });

        nodeList.forEach((node) => {
            let s = node.nodeValue;
            if (s) {
                if (s !== ' ' && s !== '\n' && s !== '') {
                    let newElt = TextProcessor.parseWords(s);
                    if (newElt.textContent.length > 0) {
                        let parentElement = node.parentElement;
                        parentElement.replaceChild(newElt, node);
                    }

                }
            }
        });
        TextProcessor.markChapters(textElt);
    }
}


class ViewCreator{

    // constructor(){
    // }

    createLaunchButton(launchCallback){
        let b = DOMHelper.createElement("div","launch_button","Start");
        console.log(b);
        b.addEventListener("click",launchCallback);
        return b;
    }

    createMenu(){
        let menuContainer = DOMHelper.createFRElement("div","fr-menu-container");
        let menu = DOMHelper.createElement("div","fr-menu");
        menuContainer.appendChild(menu);
        let speedBlock = DOMHelper.createElement("div","fr-speed-block");
        menu.appendChild(speedBlock);

        let speedCounter = DOMHelper.createElement("div","fr-speed-counter","Reading speed:2000wpm");
        speedBlock.appendChild(speedCounter);
        let speedMeterBtnBlock = this.createSpeedButtonsElement("fr-speed");
        speedBlock.appendChild(speedMeterBtnBlock);

        let wordsPerSelection = DOMHelper.createElement('div','fr-words-per-selection','Words per selection:5');
        speedBlock.appendChild(wordsPerSelection);
        let wordsPerSelectionBtnBlock = this.createSpeedButtonsElement("fr-words-speed");
        speedBlock.appendChild(wordsPerSelectionBtnBlock);
        // let wordsUp = DOMHelper.createElement('button','fr-words-speed-up','up');
        // let wordsDown = DOMHelper.createElement('button','fr-words-speed-down','down');
        // speedBlock.appendChild(wordsUp);
        // speedBlock.appendChild(wordsDown);

        let pauseBtn = DOMHelper.createElement('button','fr-pause-button','Play');
        menu.appendChild(pauseBtn);
        let statistics = DOMHelper.createElement("div","fr-statistics");
        menu.appendChild(statistics);



        let timeToReadTotal = DOMHelper.createElement('div','fr-time-to-read-total');
        statistics.appendChild(timeToReadTotal);

        let timeToReadRemaiming = DOMHelper.createElement('div','fr-time-to-read-remaining','Remaining time');
        statistics.appendChild(timeToReadRemaiming);

        let totalCharatersCount = DOMHelper.createElement('div','fr-total-characters-count','Total characters: 00');
        statistics.appendChild(totalCharatersCount);

        let exitBtn = DOMHelper.createElement("button","fr-exit-btn","exit");
        menu.appendChild(exitBtn);

        // // exitBtn.addEventListener("click",controller.getClickExitCallback(),{"once":"true"});
        // document.addEventListener("keydown",controller.getescapeExitCallback(),{"once":"true"});
        return menuContainer;
    }

    createChaptersMenu(){
        let chaptersMenuContainer = DOMHelper.createFRElement('div','fr-chapters-menu-container');
        let chapterList = DOMHelper.createElement('div','fr-chapters-menu-list');
        chaptersMenuContainer.appendChild(chapterList);
        // let dummyChapterName = DOMHelper.createElement('div','fr-chapters-menu-chapter','"Глава 000"');
        // chapterList.appendChild(dummyChapterName);
        return chaptersMenuContainer;

    }


    createSpeedButtonsElement(className){
        let speedButtonsContainer = DOMHelper.createElement("div","fr-speed-buttons-container");
        let up = DOMHelper.createElement('button',className+'-up','&#x2B06');
        let down = DOMHelper.createElement('button',className+'-down','&#x2B07');
        speedButtonsContainer.appendChild(up);
        speedButtonsContainer.appendChild(down);
        return speedButtonsContainer;
    }

    createMainContainer(){
        let mainContainer = DOMHelper.createFRElement("div","fr-main-container");
        let textContainer = DOMHelper.createFRElement("div","fr-text-container");
        mainContainer.appendChild(textContainer);
        let menu = this.createMenu();
        mainContainer.appendChild(menu);
        let chaptersMenu = this.createChaptersMenu();
        mainContainer.appendChild(chaptersMenu);

        return mainContainer;
    }
}
class ViewManager{

    constructor(){ 
        this.controller = new FRController(this);
        this.mainContainerElt;
        this.statBlock;
        this.reader;
    }

    createView(quickStart){
        let vc = new ViewCreator();  
        const mainContainerElt = vc.createMainContainer();
        this.mainContainerElt = mainContainerElt;
        
        this.attachEventListeners();
        this.createStatBlock();
        this.controller.launch(quickStart);

         console.log('View created');

    }

    start(textElement){
        DOMHelper.activeFlag = true;
        DOMHelper.hidePage();
    
        let textElt = DOMHelper.cloneMainTextElt(textElement);
        this.setTextElement(textElt);
        this.showReadingScreen();
        DOMHelper.createOverlay();   

        let book = new Book(this.mainContainerElt.querySelector(DOMHelper.nameToSelector(Constants.textContainerName)));
        book.init();
        //this.reader = new Reader(this, this.statBlock,this.mainContainerElt.querySelector(DOMHelper.nameToSelector(Constants.textContainerName)), book);
        this.reader = new Reader(this, this.statBlock, book);
        this.reader.init();
    }
    
    attachEventListeners(){
        const exitBtn = this.mainContainerElt.querySelector(DOMHelper.nameToSelector(Constants.exitButtonName));
        console.log(this.mainContainerElt);
        exitBtn.addEventListener('click',this.controller.getClickExitCallback());
        document.addEventListener('keydown',this.controller.getEscapeExitCallback());
    }

    createStatBlock(){
        let statElt = this.mainContainerElt.querySelector(DOMHelper.nameToSelector(Constants.menuName));
        this.statBlock = new Statistics(this, statElt);
    }









    clean(){
        DOMHelper.activeFlag = false;
        const exitBtn = this.mainContainerElt.querySelector(DOMHelper.nameToSelector(Constants.exitButtonName));
        exitBtn.removeEventListener('click',this.controller.getClickExitCallback());
        document.removeEventListener('keydown',this.controller.getEscapeExitCallback());
        this.reader.clean();       
        DOMHelper.removeFRElements();
        DOMHelper.showPage();
    }

    showReadingScreen(){
        document.body.appendChild(this.mainContainerElt);
        // this.statBlock.updateText();
    }

    setTextElement(textElt){
        let textContainer = this.mainContainerElt.querySelector(DOMHelper.nameToSelector(Constants.textContainerName));

        textContainer.appendChild(textElt);
    }

}
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












    static buildWordList(orderedElementsList) {
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
        this.runnerElt.style.top = rect.top - rect.height/2 + window.scrollY +'px';
        this.runnerElt.style.left = rect.left - rect.width/2 + window.scrollX +'px'; 
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