import { _decorator, Component, Node, UIOpacity, Scene, Layers, v2, Sprite, resources, SpriteFrame, director } from 'cc';
import { autoDestroy } from '../autoDestroy';
import { globalData } from '../data/globalData';
import { AudioManager } from '../../references/testUtils/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('spriteBtn')
export class spriteBtn extends Component {

    uiOpacity: UIOpacity = null;
    canvas: Scene = null;
    private effectKey = '';

    onLoad(){
        console.log(`spriteBtn => onLoad`);
        this.uiOpacity = this.getComponent(UIOpacity);
        this.canvas = director.getScene().getChildByName('Canvas');
        this.node.on(Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
        this.node.on(Node.EventType.MOUSE_ENTER,this.onMouseEnter,this);
        this.node.on(Node.EventType.MOUSE_LEAVE,this.onMouseLeave,this);

        if(AudioManager.instance.isValid == false){
            AudioManager.instance.init(this.canvas);
        }
    }

    onDestroy(){
        console.log(`spriteBtn => onDestroy`);
        this.uiOpacity = null;
        this.canvas = null;
        this.node.off(Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
        this.node.off(Node.EventType.MOUSE_ENTER,this.onMouseEnter,this);
        this.node.off(Node.EventType.MOUSE_LEAVE,this.onMouseLeave,this);
    }

    start() {
        this.effectKey = AudioManager.instance.loadFromResource('effectStarA');
    }

    update(deltaTime: number) {
        
    }

    onMouseEnter(){
        console.log(`spriteBtn => onMouseEnter, this.uiOpacity: ${this.uiOpacity}`);
        if(this.uiOpacity != null){
            this.uiOpacity.opacity = 200;
        }
    }

    onMouseLeave(){
        console.log(`spriteBtn => onMouseLeave`);
        if(this.uiOpacity != null){
            this.uiOpacity.opacity = 255;
        }
    }

    onMouseDown(){
        console.log(`spriteBtn => onMouseDown`);
        
        var node = new Node();
        this.canvas.addChild(node);

        var v2 = this.getRandomPos();
        node.setPosition(v2.x,v2.y,0);
        node.layer = Layers.Enum.UI_2D;

        var nSprite = node.addComponent(Sprite);
        if(nSprite != null){
            resources.load("star_a/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                console.log(`onMouseDown => err: ${err}`);
                nSprite.spriteFrame = spriteFrame;
                nSprite.node.addComponent(autoDestroy).second = 3;

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

