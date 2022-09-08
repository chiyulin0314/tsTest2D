import { _decorator, Component, Node, game, KeyCode, Sprite, SpriteFrame, resources, UITransform, Layers } from 'cc';
import { eventData } from '../data/eventData';
import { tetris } from '../tetris';
import { AudioManager } from '../tools/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('tetrisP1')
export class tetrisP1 extends Component {

    @property({type: Node})
    tetrisNode: Node = null;

    private tetrisTrans: UITransform = null;
    private tetrisComp: tetris = null;

    onLoad () {
        if(this.tetrisNode != null){
            this.tetrisTrans = this.tetrisNode.getComponent(UITransform);
            this.tetrisComp = this.tetrisNode.getComponent(tetris);
            if(this.tetrisComp != null){
                this.tetrisComp.leftKeyCode = KeyCode.KEY_A;
                this.tetrisComp.rightKeyCode = KeyCode.KEY_D;
                this.tetrisComp.downKeyCode = KeyCode.KEY_S;
                this.tetrisComp.rotateKeyCode1 = KeyCode.KEY_W;
                this.tetrisComp.rotateKeyCode2 = KeyCode.SPACE;
            }
            console.log(`tetrisP1 => tetrisComp: ${this.tetrisComp}, column: ${this.tetrisComp.column}`);
        }
        game.on(eventData.GAME_OVER_EVENT, this.onGameOverEvent, this);

        AudioManager.instance.init(this.node);
    }

    onDestroy () {
        this.tetrisComp = null;
        this.tetrisTrans = null;
        game.off(eventData.GAME_OVER_EVENT, this.onGameOverEvent, this);
    }

    start() {
        AudioManager.instance.playFromResource('Get Over');
        var key = AudioManager.instance.loadFromResource('effectStarA');
        this.tetrisComp.cleanEffectKey = key;
    }

    update(deltaTime: number) {
        
    }

    onGameOverEvent(name = ''){
        console.log(`[tetrisP1]onGameOverEvent => name: ${name}`);

        //create gameover
        var node = new Node();
        this.node.addChild(node);
        node.setPosition(this.tetrisNode.position.x,this.tetrisNode.position.y,0);
        node.layer = Layers.Enum.UI_2D;
        var size = Math.min(this.tetrisTrans.width+100, this.tetrisTrans.height+100);
        var nTrans = node.addComponent(UITransform);
        nTrans.width = nTrans.height = size;
        var nSprite = node.addComponent(Sprite);
        if(nSprite != null){
            nSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            resources.load("game-over/spriteFrame", SpriteFrame, (err, spriteFrame) => {
                //console.log(`onGameOverEvent => err: ${err}`);
                nSprite.spriteFrame = spriteFrame;
            });
        }
    }
}

