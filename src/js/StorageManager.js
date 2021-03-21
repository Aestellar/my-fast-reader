class StorageManager {

    static defaultSelectorName = "FR-default-selector";

    // static saveLastWord(wordIndex) {
    //     // let path = window.location.pathname;
    //     // window.localStorage.setItem(path,wordIndex);
    //     StorageManager.save(wordIndex, '');
    // }

    // static loadLastWord() {

    //     let lastWordIndex = StorageManager.load('');


    //     // let path = window.location.pathname;
    //     // let lastWordIndex = window.localStorage.getItem(path);
    //     if (lastWordIndex) {
    //         return lastWordIndex;
    //     }
    //     return 0;
    // }

    // static saveWastedTime(wastedTime) {
    //     StorageManager.save(wastedTime, 'wasted-time')
    // }

    // static loadWastedTime() {
    //     let wastedTime = StorageManager.load('wasted-time');
    //     console.log('Wasted time load', wastedTime);
    //     if (wastedTime) {
    //         return wastedTime;
    //     }
    //     return 0;
    // }

    static saveLoopInfo(info) {
        // let jsonMap = {};
        // json['lastWordIndex'] = lastWordIndex;
        // json['wastedTime'] = wastedTime;
        let json = JSON.stringify(info);
        StorageManager.save(json, 'loopInfo');
    }

    static loadLoopInfo() {
        let json = StorageManager.load('loopInfo');
        let info = JSON.parse(json);
        return info;
    }


    static save(value, suffix) {
        let path = window.location.pathname;
        window.localStorage.setItem(path + '|fr|' + suffix, value);
    }

    static load(suffix) {
        let path = window.location.pathname;
        let result = window.localStorage.getItem(path + '|fr|' + suffix);
        return result;
    }
    // static putLastWord(wordIndex){

    // }



    static saveDefaultSelector(selector) {
        window.localStorage.setItem(StorageManager.defaultSelectorName, selector);
    }

    static loadDefaultSelector() {
        return window.localStorage.getItem(StorageManager.defaultSelectorName);

    }



}