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