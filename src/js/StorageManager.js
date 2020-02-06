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