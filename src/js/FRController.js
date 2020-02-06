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