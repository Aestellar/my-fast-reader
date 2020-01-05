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