// ==UserScript==
// @name         My Fast Reader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tl.rulate.ru/*
// @match https://ranobes.com/*
// @match        *://*/*
// @grant        none
// @run-at document-idle
// ==/UserScript==

//clipboard test

(function() {
    'use strict';
class Constants{
    static get SPEED (){ return 3600}; 
}
class DOMHelper {

    static c = {
        FRAttribute:"data-fast-reader-attribute"
    };


    static createFRElement(type, className, selfName, text) {
        let el = this.createElement(type, className, selfName, text);
        el.setAttribute(DOMHelper.c.FRAttribute, "true");
        return el;
    }

    static createElement(type, className, selfName, text) {
        let el = document.createElement(type);
        el.className += className;
        el.setAttribute(selfName, selfName);
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
        let list = document.querySelectorAll("[" + DOMHelper.c.FRAttribute + "]");
        console.log(list);
        list = Array.from(list);
        list.forEach((e) => e.remove());

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

   static getIndexedElementList(orderedList,indexName){
       let indexedList = orderedList.map((el,index)=>{
        el.setAttribute(indexName,index);
        return el;
       });
    //    orderedList.forEach((el,index)=>{
    //     el.setAttribute(indexName,index);
    //    });
       return indexedList;
   }

static getOrderedElementListByClass(containerElt, className){
    let orderedNodeList = DOMHelper.getOrderedNodeList(containerElt);
    console.log(orderedNodeList, 'orderedNodeList');
    let orderedElementList = orderedNodeList.filter((node)=>{
        if(node.nodeType===1&&node.classList.contains(className)){
            return true;
        }
        return false;
    });
    return orderedElementList;
}

static hideSentences(textElt,firstPos){
    let sList = textElt.querySelectorAll('.fr-sentence');
    sList.forEach((el,index)=>{
        if(index>firstPos){
            // el.style.display = "none";
        }
    });
}

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
            let excludesFlag = false;

            if(cNode.nodeType ===1 && excludesList.length>0){
                excludesFlag = excludesList.includes(cNode.nodeName);
            }

            excludesList.includes(cNode.nodeName);
            if (cNode.childNodes.length > 0 && !excludesFlag) {
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


    static launch(event){
        event.stopPropagation();
        let vm = new ViewManager();
        vm.createView();
        console.log('static launch');
        // document.removeEventListener('click',FastReaderMain.launch);
    }

    static init(){
        console.log("Init FastReaderMain");
        this.applyStyle(styleCSS);
        let viewCreator = new ViewCreator();
        let launchBtn = viewCreator.createLaunchButton(FastReaderMain.launch);
        document.body.appendChild(launchBtn);
        FastReaderMain.expandStringPrototype();
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


    static applyStyle(styleCSS){
        let styleElt = document.createElement("style");
        styleElt.innerHTML = styleCSS;
        document.head.appendChild(styleElt);
    }
}

// Сначала FastReaderMain загружается, применяет css и создаёт кнопку запуска. В коллбеке этой кнопки создаётся DomHelper, вспомогательный класс с внедрением текстовых констант. 
// Затем создаётся объект контроллёра со всякими изменяющими функциями. А потом создаётся ViewManager который создаёт через ViewCreator нужный набор dom элементов. 
// К этим элементам ViewManager привязывает коллбеки контроллёра. И вообще весь менеджмент идёт через него. 
class FRController{

    constructor(viewManager){
        this.vm = viewManager;
    }

    getClickExitCallback(){
        return this.exitReadingMode.bind(this);
    }

    getEscapeExitCallback(){
        return this.onEscape.bind(this);
    }

     getlaunchCallback(){
        return this.launch;
    }

     launch(){
        console.log("Reading mode enabled");
        TextPicker.pickTextFromPage(this.launchReadingMode.bind(this));
    }

     launchReadingMode(el){
        //console.log(self,this);
        this.vm.start(el);

    }

     exitReadingMode(){
        console.log('exit reading mode');
        this.vm.clean();
        this.vm.showPage();
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

        let chapters = document.querySelectorAll('.fr-chapter');
        console.log(chapters);

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
        speedElt.innerHTML = 'Reading speed:'+this.speed;
        let wordsPerSelection = this.statElt.querySelector('[data-fr-words-per-selection]');
        wordsPerSelection.innerHTML = 'Words per selection:'+this.wordsPerSelection;
        let totalTimeElt = this.statElt.querySelector('[fr-time-to-read-total]');
        let totalTime = this.symbolsCount*60/this.speed;

        totalTimeElt.innerHTML = 'Time to read:' + this.getFormattedTime(totalTime);
        let remainingTimeElt = this.statElt.querySelector('[fr-time-to-read-remaining]')
        let remainingTime = this.remainingSymbols*60/this.speed;
        remainingTimeElt.innerHTML = 'Remaining time:'+this.getFormattedTime(remainingTime);
        
        let totalCharactersCountElt = this.statElt.querySelector('[fr-total-characters-count]');
        totalCharactersCountElt.innerHTML = "Total characters: "+this.symbolsCount;
        //return this.statElt;
    }

    increaseSpeed(e){
        let value = 10;
        if(e.shiftKey) value = 100;
        this.speed+=value;
        this.updateView();
    }

    decreaseSpeed(e){
        let value = 10;
        if(e.shiftKey) value = 100;
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

        if(validSelection){
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

    static processText(el) {
        let newElt = el.cloneNode(true);
        newElt.classList.remove('no_scroll_hide');
        // let textContainer = document.querySelector("[data-fr-text-container]");
        return newElt;
        //textContainer.appendChild(newElt);
    }

    static encapsulateBodyText() {
        console.log("Encapsulate started");
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

    static embraceWords(wordList) {
        wordList.forEach((word, i, array) => {
            array[i] = `<span class="fr-word"> ${word}</span>`;
        });
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
        TextProcessor.embraceWords(wordList);

        let newString = wordList.join(' ');
        let newSpan = document.createElement("span");
        newSpan.classList.add('fr-sentence');
        if(newString.search("Глава")!=-1){
            newSpan.classList.add('fr-chapter');
        }
        newSpan.innerHTML = newString;
        return newSpan;
    }

    static splitByChapters(textElt){

    }


    // static splitToPages(textElt){
    //     let count = 0;
    //     let page = null;
    //     paragraphList = this.splitToParagraphs(textElt);
    //     paragraphList.forEach((el, index)=>{
    //         if(!page){
    //             page = document.createElement('div');
    //         }
    //         let sentencesCount = el.querySelectorAll('.fr-sentence').length;
    //         count+=sentencesCount;
    //         page.appendChild(el);
    //         if(count>100){

    //         }

    //     });
    // }

    // static splitToParagraphs(textElt){
    //     let index = 0;
    //     let sentencesList = Array.from(textElt.querySelectorAll('.fr-sentence'));
    //     let parentList = sentencesList.map((el)=>{return el.parentElement});
    //     parentList = Array.from(new Set(parentList));
    //     // parentList.forEach()
    //     console.log(parentList);
    //     return parentList;
    //     // console.log('Total pages',index);
    // }

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
        DOMHelper.hideSentences(textElt, 1000);
    }
}


class ViewCreator{

    // constructor(){
    // }

    createLaunchButton(launchCallback){
        let b = DOMHelper.createElement("div","launch_button",'data-fr-reader-button',"Start");
        console.log(b);
        b.addEventListener("click",launchCallback);
        return b;
    }

    createMenu(){
        let menuContainer = DOMHelper.createFRElement("div","fr-menu-container","data-fr-menu-container");
        let menu = DOMHelper.createElement("div","fr-menu","data-fr-menu");
        menuContainer.appendChild(menu);
        let speedBlock = DOMHelper.createElement("div","fr-speed-block","data-fr-speed-block");
        menu.appendChild(speedBlock);
        let speedCounter = DOMHelper.createElement("div","fr-speed-counter","data-fr-speed-counter", "Reading speed:2000wpm");
        speedBlock.appendChild(speedCounter);
        let upSpeed = DOMHelper.createElement('button','fr-speed-up','data-fr-speed-up','up');
        let downSpeed = DOMHelper.createElement('button','fr-speed-down','data-fr-speed-down','down');
        speedBlock.appendChild(upSpeed);
        speedBlock.appendChild(downSpeed);

        let wordsPerSelection = DOMHelper.createElement('div','fr-words-per-selection','data-fr-words-per-selection','Words per selection:5');
        speedBlock.appendChild(wordsPerSelection);
        let wordsUp = DOMHelper.createElement('button','fr-words-speed-up','data-fr-words-speed-up','up');
        let wordsDown = DOMHelper.createElement('button','fr-words-speed-down','data-fr-words-speed-down','down');
        speedBlock.appendChild(wordsUp);
        speedBlock.appendChild(wordsDown);
 
        let pauseBtn = DOMHelper.createElement('button','fr-pause-button','data-fr-pause-button','Play');
        menu.appendChild(pauseBtn);
        let statistics = DOMHelper.createElement("div","fr-statistics","data-fr-statistics");
        menu.appendChild(statistics);



        let timeToReadTotal = DOMHelper.createElement('div','fr-time-to-read-total','fr-time-to-read-total');
        statistics.appendChild(timeToReadTotal);

        let timeToReadRemaiming = DOMHelper.createElement('div','fr-time-to-read-remaining','fr-time-to-read-remaining','Remaining time');
        statistics.appendChild(timeToReadRemaiming);

        let totalCharatersCount = DOMHelper.createElement('div','fr-total-characters-count','fr-total-characters-count','Total characters: 00');
        statistics.appendChild(totalCharatersCount);

        let exitBtn = DOMHelper.createElement("button","fr-exit-btn","data-fr-exitBtn","exit");
        menu.appendChild(exitBtn);

        // // exitBtn.addEventListener("click",controller.getClickExitCallback(),{"once":"true"});
        // document.addEventListener("keydown",controller.getescapeExitCallback(),{"once":"true"});
        return menuContainer;
    }

    createMainContainer(){
        let mainContainer = DOMHelper.createFRElement("div","fr-main-container","data-fr-main-container");
        let textContainer = DOMHelper.createFRElement("div","fr-text-container","data-fr-text-container");
        mainContainer.appendChild(textContainer);
        let menu = this.createMenu();
        mainContainer.appendChild(menu);
        return mainContainer;
    }
}
class ViewManager{

    constructor(){
        this.vc = new ViewCreator(this.dh);        
        this.controller = new FRController(this);
        this.mainContainerElt;
        this.statBlock;
        this.reader;
    }

    createView(){
        const mainContainerElt = this.vc.createMainContainer();
        this.mainContainerElt = mainContainerElt;
        
        this.attachEventListeners(this.controller);
        this.createStatBlock();
        this.controller.launch();

         console.log('View created');

    }

    attachEventListeners(cntr){
        const exitBtn = this.mainContainerElt.querySelector('[data-fr-exitBtn]');
        console.log(this.mainContainerElt);
        exitBtn.addEventListener('click',cntr.getClickExitCallback());
        document.addEventListener('keydown',cntr.getEscapeExitCallback());
    }

    createStatBlock(){
        let statElt = this.mainContainerElt.querySelector('[data-fr-menu]');
        this.statBlock = new Statistics(this, statElt);
    }

    createReader(){
        this.reader = new Reader(this,this.statBlock,this.mainContainerElt.querySelector('[data-fr-text-container]'));
        this.reader.test();
    }

    start(textElement){
        DOMHelper.hidePage();
        let textElt = TextProcessor.processText(textElement);
        this.setTextElement(textElt);
        this.showReadingScreen();
        this.createReader();
        this.reader.init();
    }







    clean(){
        this.reader.clean();       
        DOMHelper.removeFRElements();
        DOMHelper.showPage();
    }

    showReadingScreen(){
        document.body.appendChild(this.mainContainerElt);
        // this.statBlock.updateText();
    }

    setTextElement(textElt){
        let textContainer = this.mainContainerElt.querySelector('[data-fr-text-container]');

        textContainer.appendChild(textElt);
    }

}
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
        let rect = this.wordElement.getBoundingClientRect();
        this.boundingRect = rect;
        this.createMirrorElement();
        this.wordElement.style.visibility ="hidden";  
        this.scrollIntoView();
        // const parentElt = this.wordElement.parentElement;


        // if(parentElt.style.display=="none"){
        //     parentElt.style.display="inline";
        // }
    }

    createMirrorElement(){
         let mirror = this.wordElement.cloneNode(true);
        this.mirrorElement = mirror;
        console.assert(!!mirror,"Mirror element must be not null");       
        mirror.style.position = "absolute";

        mirror.style.top = this.boundingRect.top - this.boundingRect.height/2 + window.scrollY +'px';
        mirror.style.left = this.boundingRect.left - this.boundingRect.width/2 + window.scrollX +'px';
        mirror.style.zIndex = 120000;
        mirror.style.background = "#EEE";
        mirror.classList.add('fr-focus-word');
        mirror.setAttribute(DOMHelper.c.FRAttribute,'1');
        
        document.body.appendChild(mirror);
    }

    unmark(){
        this.wordElement.style.visibility ="";
        document.body.removeChild(this.mirrorElement);
    }

    scrollIntoView(){
        let inView = DOMHelper.isInViewportRect(this.boundingRect);
        if(!inView){
            //console.log('scroll');
            this.wordElement.scrollIntoView();
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
var styleCSS = `.launch_button{
    position:fixed;
    top:70px;
    left:1750px;
    z-index: 100000;
    
    font-size:18px;
    background-color:#f5f5f5;
    background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
    border:1px solid #bbbbbb;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.35);
    border-radius: 10px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05);
    cursor: pointer;
    padding: 14px 28px;
    }
    
    .launch_button:hover{
    
    text-decoration: none;
    background-image: linear-gradient(to bottom, #ffffff, #b8b8b8);
    background-color: #b8b8b8 ;
    
    }
    .launch_button:active{
    background-image: linear-gradient(to bottom, #ffffff, #939393);
    }
    

    
    .fr-main-container{
    display:block;
    width:100%;
    min-height: 100vh;
    background: #EEE;
    }
    
    .fr-text-container{
    width:600px;
    padding-top:100px;
    background:#efefef;
    margin-left: auto;
    margin-right: auto;
    }
    .fr-menu-container{
    position:fixed;
    top: 0;
    height:50px;
    width:100%;
    background:#c4c4c4;
    }
    .fr-menu{
    width:800px;
    margin-left: auto;
    margin-right: auto;
    }

    .fr-speed-block{
        display: inline-block;
    }

    .fr-speed-counter{
    display:inline-block;
    /* width:300px; */
    }


    .fr-statistics{
    display:inline-block;
    width:250px;
    }
    .fr-words-per-selection{
        display: inline-block;
    }

    .fr-sentence{
        color:gray; 
    }

    .fr-focus-word{
        font-size: 150%;
        color: black;
    };

    .color1{
    background:#EEE;
    }

    .no_scroll_hide{
        display: none !important;
        overflow: hidden;
    }`;
FastReaderMain.init();

})();