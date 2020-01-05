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