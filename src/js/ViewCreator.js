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
        return mainContainer;
    }
}