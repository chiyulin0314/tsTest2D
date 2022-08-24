import { _decorator, Component, Node, UITransform, KeyCode, game, Sprite, SpriteFrame, resources, Layers } from 'cc';
import { eventData } from '../data/eventData';
import { globalData } from '../data/globalData';
import { tetris } from '../tetris';
import { AudioManager } from '../tools/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('tetrisP2')
export class tetrisP2 extends Component {

    @property({type: Node})
    tetrisNode1: Node = null;
    private tetrisTrans1: UITransform = null;
    private tetrisComp1: tetris = null;

    @property({type: Node})
    tetrisNode2: Node = null;
    private tetrisTrans2: UITransform = null;
    private tetrisComp2: tetris = null;

    onLoad () {
        if(this.tetrisNode1 != null){
            this.tetrisTrans1 = this.tetrisNode1.getComponent(UITransform);
            this.tetrisComp1 = this.tetrisNode1.getComponent(tetris);
            if(this.tetrisComp1 != null){
                this.tetrisComp1.leftKeyCode = KeyCode.KEY_A;
                this.tetrisComp1.rightKeyCode = KeyCode.KEY_D;
                this.tetrisComp1.downKeyCode = KeyCode.KEY_S;
                this.tetrisComp1.rotateKeyCode1 = KeyCode.KEY_W;
                this.tetrisComp1.rotateKeyCode2 = KeyCode.SPACE;
            }
        }

        if(this.tetrisNode2 != null){
            this.tetrisTrans2 = this.tetrisNode2.getComponent(UITransform);
            this.tetrisComp2 = this.tetrisNode2.getComponent(tetris);
            if(this.tetrisComp2 != null){
                this.tetrisComp2.leftKeyCode = KeyCode.ARROW_LEFT;
                this.tetrisComp2.rightKeyCode = KeyCode.ARROW_RIGHT;
                this.tetrisComp2.downKeyCode = KeyCode.ARROW_DOWN;
                this.tetrisComp2.rotateKeyCode1 = KeyCode.ARROW_UP;
                this.tetrisComp2.rotateKeyCode2 = KeyCode.ENTER;
            }
        }
        game.on(eventData.GAME_OVER_EVENT, this.onGameOverEvent, this);
        game.on(eventData.CLEAN_BLOCK_EVENT, this.onCleanBlockEvent, this);

        AudioManager.instance.init(this.node);
    }

    onDestroy () {
        this.tetrisComp2 = null;
        this.tetrisTrans2 = null;
        this.tetrisComp1 = null;
        this.tetrisTrans1 = null;
        game.off(eventData.GAME_OVER_EVENT, this.onGameOverEvent, this);
        game.off(eventData.CLEAN_BLOCK_EVENT, this.onCleanBlockEvent, this);
    }

    start() {
        AudioManager.instance.playFromResource('Get Over');
        var key1 = AudioManager.instance.loadFromResource('star_a');
        this.tetrisComp1.cleanEffectKey = key1;
        var key2 = AudioManager.instance.loadFromResource('star_b');
        this.tetrisComp2.cleanEffectKey = key2;
    }

    update(deltaTime: number) {
        
    }

    onGameOverEvent(name = ''){
        console.log(`[tetrisP2]onGameOverEvent => name: ${name}`);

        var loseTetrisNode: Node = null;
        var winTetrisNode: Node = null;
        var loseTetrisTrans: UITransform = null;
        var winTetrisTrans: UITransform = null;
        if(this.tetrisComp1.tetrisName == name){
            loseTetrisNode = this.tetrisNode1;
            loseTetrisTrans = this.tetrisTrans1;
            winTetrisNode = this.tetrisNode2;
            winTetrisTrans = this.tetrisTrans2;
            this.tetrisComp2.isGamePause = true;
        }else{
            loseTetrisNode = this.tetrisNode2;
            loseTetrisTrans = this.tetrisTrans2;
            winTetrisNode = this.tetrisNode1;
            winTetrisTrans = this.tetrisTrans1;
            this.tetrisComp1.isGamePause = true;
        }

        //create lose
        var nodeLose = new Node();
        this.node.addChild(nodeLose);
        nodeLose.setPosition(loseTetrisNode.position.x,loseTetrisNode.position.y,0);
        nodeLose.layer = Layers.Enum.UI_2D;
        var size = Math.min(loseTetrisTrans.width+100, loseTetrisTrans.height+100);
        var transLose = nodeLose.addComponent(UITransform);
        transLose.width = size;
        transLose.height = size;
        var nSpriteLose = nodeLose.addComponent(Sprite);
        if(nSpriteLose != null){
            nSpriteLose.sizeMode = Sprite.SizeMode.CUSTOM;
            resources.load("lose/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                //console.log(`onGameOverEvent => err: ${err}`);
                nSpriteLose.spriteFrame = spriteFrame;
            });
        }

        //create win
        var nodeWin = new Node();
        this.node.addChild(nodeWin);
        nodeWin.setPosition(winTetrisNode.position.x,winTetrisNode.position.y,0);
        nodeWin.layer = Layers.Enum.UI_2D;
        var size = Math.min(winTetrisTrans.width+100, winTetrisTrans.height+100);
        var transWin = nodeWin.addComponent(UITransform);
        transWin.width = size;
        transWin.height = size;
        var nSpriteWin = nodeWin.addComponent(Sprite);
        if(nSpriteWin != null){
            nSpriteWin.sizeMode = Sprite.SizeMode.CUSTOM;
            resources.load("win/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                //console.log(`onGameOverEvent => err: ${err}`);
                nSpriteWin.spriteFrame = spriteFrame;
            });
        }
    }

    onCleanBlockEvent(name = '', data = null){
        console.log(`[tetrisP2]onCleanBlockEvent => name: ${name}, data: ${data}`);
        if(globalData.IS_HINDER == false) return;

        var targetTetrisComp: tetris = null;
        if(this.tetrisComp1.tetrisName == name){
            targetTetrisComp = this.tetrisComp2;
        }else{
            targetTetrisComp = this.tetrisComp1;
        }

        var needSend = false;
        if(data != null && Array.isArray(data)){
            for(var i = 0;i < data.length;i++){
                if(data[i] != null && data[i] != ''){
                    needSend = true;
                    break;
                }
            }

            if(needSend){
                targetTetrisComp.addToBottom(data);
            }else{
                console.warn(`[tetrisP2]onCleanBlockEvent => not need to send`);
            }
        }
    }
}

