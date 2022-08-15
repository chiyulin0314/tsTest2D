import { _decorator, Component, Node, UITransform, Graphics, Color, Input, input, KeyCode } from 'cc';
import { drawTools } from './drawTools';
import { globalData } from './globalData';
const { ccclass, property } = _decorator;

@ccclass('tetris')
export class tetris extends Component {
    //基本設定
    @property
    tetrisName = '';
    @property
    column = 20;
    @property
    row = 10;

    //圖畫設定
    @property
    lineColor = new Color(0, 0, 0, 255);
    @property
    fillColor = new Color(255, 255, 255, 200);
    @property
    lineWidth = 5;

    //按鍵設定
    leftKeyCode = KeyCode.KEY_A;
    rightKeyCode = KeyCode.KEY_D;
    downKeyCode = KeyCode.KEY_S;
    rotateKeyCode1 = KeyCode.KEY_W;
    rotateKeyCode2 = KeyCode.SPACE;

    trans: UITransform = null;
    graphics: Graphics = null;

    onLoad () {
        this.trans = this.getComponent(UITransform);
        this.graphics = this.node.addComponent(Graphics);
        input.on(Input.EventType.KEY_DOWN,this.onKeyDown,this);
        input.on(Input.EventType.KEY_UP,this.onKeyUp,this);
        input.on(Input.EventType.KEY_PRESSING,this.onKeyPressing,this);
    }

    onDestroy () {
        this.trans = null;
        this.graphics = null;
        input.off(Input.EventType.KEY_DOWN,this.onKeyDown,this);
        input.off(Input.EventType.KEY_UP,this.onKeyUp,this);
        input.off(Input.EventType.KEY_PRESSING,this.onKeyPressing,this);
    }

    start() {
        var res = this.setContainerSize();
        if(res === true){
            this.drawContainer();
            /*
            this.initKeys();
            this.initCells();
            this.initBlock();

            this.setBlock();
            this.drawBlock();
            */
        }
    }

    update(deltaTime: number) {
        
    }

    onKeyDown (e) {
        // if(this.blockPos == null) return;
        // if(this.isGameOver || this.isGamePause) return;
        var needUpdate = false;
        switch(e.keyCode){
            case this.leftKeyCode:
                console.log(`onKeyDown => leftKeyCode: ${this.leftKeyCode}`);
                break;
            case this.rightKeyCode:
                console.log(`onKeyDown => rightKeyCode: ${this.rightKeyCode}`);
                break;
            case this.downKeyCode:
                console.log(`onKeyDown => downKeyCode: ${this.downKeyCode}`);
                break;
        }
    }

    onKeyUp (e) {
        // if(this.isGameOver || this.isGamePause) return;
        
        var needUpdate = false;
        switch(e.keyCode){
            case this.rotateKeyCode1:
                console.log(`onKeyUp => rotateKeyCode1: ${this.rotateKeyCode1}`);
                break;
            case this.rotateKeyCode2:
                console.log(`onKeyUp => rotateKeyCode2: ${this.rotateKeyCode2}`);
                break;

            case this.leftKeyCode:
                console.log(`onKeyUp => leftKeyCode: ${this.leftKeyCode}`);
                break;
            case this.rightKeyCode:
                console.log(`onKeyUp => rightKeyCode: ${this.rightKeyCode}`);
                break;
            case this.downKeyCode:
                console.log(`onKeyUp => downKeyCode: ${this.downKeyCode}`);
                break;
        }
    }

    onKeyPressing (e) {
        // if(this.isGameOver || this.isGamePause) return;
        
        var needUpdate = false;
        switch(e.keyCode){
            case this.leftKeyCode:
                console.log(`onKeyPressing => leftKeyCode: ${this.leftKeyCode}`);
                break;
            case this.rightKeyCode:
                console.log(`onKeyPressing => rightKeyCode: ${this.rightKeyCode}`);
                break;
            case this.downKeyCode:
                console.log(`onKeyPressing => downKeyCode: ${this.downKeyCode}`);
                break;
        }
    }

    setContainerSize(){
        var maxW = this.row * globalData.CELL_WH;
        var maxH = this.column * globalData.CELL_WH;
        if(maxW > globalData.MAX_WIDTH || maxH > globalData.MAX_HEIGHT){
            return false;
        }else if(this.row < 4 || this.column < 4){
            return false;
        }

        this.trans.width = maxW;
        this.trans.height = maxH;
        return true;
    }

    drawContainer(){
        this.graphics.clear();
        this.graphics.lineWidth = this.lineWidth;
        this.graphics.fillColor = this.fillColor;
        this.graphics.strokeColor = this.lineColor;
        drawTools.fillRect(this.graphics,-this.trans.width/2 - this.lineWidth/2 + 1, -this.trans.height/2 - this.lineWidth/2 + 1, this.trans.width + this.lineWidth - 2, this.trans.height + this.lineWidth - 2);
        drawTools.stroke(this.graphics,-this.trans.width/2 - this.lineWidth/2 + 1, -this.trans.height/2 - this.lineWidth/2 + 1, this.trans.width + this.lineWidth - 2, this.trans.height + this.lineWidth - 2);
    }
}
