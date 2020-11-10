var styleCSS = `.launch_button{
    position:fixed;
    top:70px;
    right:30px;
    z-index: 100000;
    opacity: .5;
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
    opacity: 1;
    
    }
    .launch_button:active{
    background-image: linear-gradient(to bottom, #ffffff, #939393);
    }
    

    
    .fr-main-container{
    display:block;
    width:100%;
    min-height: 100vh;
    background: #EEE;
    overflow: auto;
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
    min-height: 50px;
    width:100%;
    background:#c4c4c4;
    z-index: 200000;
    font-size: 16px;
    }

    .fr-menu{
    color:black;
    font-family: Arial, Helvetica, sans-serif;
    width:800px;
    margin-left: auto;
    margin-right: auto;
    line-height: normal;
    }

    .fr-menu button{
        color:black;
        background-color: rgb(240,240,240);
        height: 100%;
        vertical-align: top;
        font-size:16px;
        font-family: Arial, Helvetica, sans-serif;
        border:solid gray 1px;
        padding: 1px 6px 1px 6px;
    }

    .fr-menu button:active{
        border: solid white 1px;
    }

    .fr-menu .fr-pause-button{
        padding: 1px 24px;
        /* font-size: 24px; */
        /* height: 55px; */
    }


    .fr-speed-block{
        display: inline-block;
        vertical-align: top;
    }

    .fr-speed-buttons-container{
        display: inline-block;
        vertical-align: top;
    }

    .fr-speed-counter{
    display:inline-block;
    vertical-align: top;
    /* width:300px; */
    }

    .fr-speed-block button{
        display: block;
    }


    .fr-statistics{
    display:inline-block;
    /* width:250px; */
    }
    /* .fr-pause-button{
        vertical-align: top;
        height: 100%;
    } */

    .fr-words-per-selection{
        display: inline-block;
        vertical-align: top;
    }




    .fr-sentence{
        color:gray; 
    }

    .fr-focus-word{
        font-size: 150%;
        color: black;
        font-weight: bold;
    } 

    .fr-overlay{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        -webkit-user-select: none;
    }

    .color1{
    background:#EEE;
    }

    .no_scroll_hide{
        display: none !important;
        overflow: hidden;
    }`;