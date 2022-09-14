import { _decorator, Component, Node, UIOpacity, resources, SpriteFrame, Sprite, director, Scene, UITransform, Layers, Enum, v2 } from 'cc';
import { AudioManager } from '../../references/testUtils/AudioManager';
import { autoDestroy } from '../autoDestroy';
import { globalData } from '../data/globalData';
const { ccclass, property } = _decorator;

@ccclass('normalBtn')
export class normalBtn extends Component {

    uiOpacity: UIOpacity = null;
    sprite: Sprite = null;
    canvas: Scene = null;
    private effectKey = '';

    onLoad(){
        console.log(`normalBtn => onLoad`);
        this.uiOpacity = this.getComponent(UIOpacity);
        //this.sprite = this.getComponent(Sprite);
        this.canvas = director.getScene().getChildByName('Canvas');
        this.node.on(Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
        this.node.on(Node.EventType.MOUSE_ENTER,this.onMouseEnter,this);
        this.node.on(Node.EventType.MOUSE_LEAVE,this.onMouseLeave,this);

        if(AudioManager.instance.isValid == false){
            AudioManager.instance.init(this.canvas);
        }
    }

    onDestroy(){
        console.log(`normalBtn => onDestroy`);
        this.uiOpacity = null;
        this.canvas = null;
        this.node.off(Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
        this.node.off(Node.EventType.MOUSE_ENTER,this.onMouseEnter,this);
        this.node.off(Node.EventType.MOUSE_LEAVE,this.onMouseLeave,this);
    }

    start() {
        this.effectKey = AudioManager.instance.loadFromResource('effectStarB');
    }

    update(deltaTime: number) {
        
    }

    onMouseEnter(){
        console.log(`normalBtn => onMouseEnter`);
        if(this.uiOpacity != null){
            this.uiOpacity.opacity = 200;
        }
    }

    onMouseLeave(){
        console.log(`normalBtn => onMouseLeave`);
        if(this.uiOpacity != null){
            this.uiOpacity.opacity = 255;
        }
    }

    onMouseDown(){
        console.log(`normalBtn => onMouseDown`);
        /*
        resources.load("start/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            console.log(`onMouseDown => err: ${err}, this.sprite: ${this.sprite}`);
            //this.node.getComponent(Sprite).spriteFrame = spriteFrame;
            if(this.sprite != null){
                this.sprite.spriteFrame = spriteFrame;
            }
        });*/

        var count = this.canvas.children.length;
        console.log(`onMouseDown => canvas children count: ${count}`);

        var node = new Node("testNode");
        this.canvas.addChild(node);

        var v2 = this.getRandomPos();
        node.setPosition(v2.x,v2.y,0);
        //node.setScale(1,1);
        node.layer = Layers.Enum.UI_2D; //1 << Layers.nameToLayer("UI_2D");
        
        //node.addComponent(UITransform).setContentSize(500,500);
        var nSprite = node.addComponent(Sprite);
        //console.log(`onMouseDown node => active: ${node.active}, position: ${node.position}, rotation: ${node.rotation}, scale: ${node.scale}, layer: ${node.layer}`);
        if(nSprite != null){
            resources.load("star_b/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                console.log(`onMouseDown => err: ${err}`);
                nSprite.spriteFrame = spriteFrame;
                nSprite.node.addComponent(autoDestroy).second = 1;

                //play effect
                AudioManager.instance.playOnceFromKey(this.effectKey);
            });
        }
    }

    getRandomPos(){
        var x = Math.random() * globalData.MAX_WIDTH - globalData.MAX_WIDTH/2;
        var y = Math.random() * globalData.MAX_HEIGHT - globalData.MAX_HEIGHT/2;
        return v2(x,y);
    }
}

