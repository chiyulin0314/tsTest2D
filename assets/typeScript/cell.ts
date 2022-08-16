import { _decorator, Component, Node, Sprite, UITransform, Color, resources, SpriteFrame, Layers } from 'cc';
import { globalData } from './globalData';
import { spriteTools } from './spriteTools';
const { ccclass, property } = _decorator;

@ccclass('cell')
export class cell {
    no: number = 1;
    x: number = 0;
    y: number = 0;
    wh: number = 50;
    data: string = null;
    private node: Node = null;
    private trans: UITransform = null;
    private sprite: Sprite = null;

    create(parent: Node){
        this.node = new Node();
        parent.addChild(this.node);
        this.node.setPosition(this.x,this.y,0);
        this.node.layer = Layers.Enum.UI_2D;
        this.trans = this.node.addComponent(UITransform);
        this.trans.setContentSize(this.wh, this.wh);
        this.sprite = this.node.addComponent(Sprite);
        this.sprite.color = Color.WHITE;
        this.sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        //this.sprite.spriteFrame = spriteTools.getDefaultSpriteFrame(50, 50);
        //spriteTools.setDefaultSpriteFrame(this.sprite, 50, 50);
        this.node.active = false;

        resources.load("default/spriteFrame", SpriteFrame, (err, spriteFrame) => {
            this.sprite.spriteFrame = spriteFrame;
        });
        /*
        console.log(`[cell]create => 
        no: ${this.no}, 
        x: ${this.x}, 
        y: ${this.y}, 
        wh: ${this.wh},
        width: ${this.trans.width},
        height: ${this.trans.height},
        color: ${this.sprite.color},
        sprite: ${this.sprite != null},
        spriteFrame: ${this.sprite.spriteFrame != null},
        `);*/
    }

    update(all = false){
        if(this.node == null) return;
        if(this.sprite == null) return;
        if(all == true){
            this.node.setPosition(this.x,this.y,0);
        }
        if(this.data != null){
            if(globalData.USE_SPRITE){
                this.updateSprite();
            }else{
                this.updateColor();
            }
            this.node.active = true;
        }else{
            this.node.active = false;
        }
    }

    updateSprite(){
        if(this.node == null) return;
        if(this.sprite == null) return;
        if(typeof this.data === 'string' && this.data.length > 0){
            resources.load(this.data, SpriteFrame, (err, spriteFrame) => {
                //console.log(`updateSprite => err: ${err}`);
                this.sprite.spriteFrame = spriteFrame;
                //this.node.width = this.wh;
                //this.node.height = this.wh;
            });
        }else{
            this.sprite.color = Color.WHITE;
        }
    }

    updateColor(){
        if(this.node == null) return;
        if(this.sprite == null) return;
        //console.log(`updateColor => this.data: ${this.data}, typeof: ${typeof this.data === 'string'}, substring: ${this.data.substring(0,1)}`);
        if(typeof this.data === 'string' && this.data.length > 0 && this.data.substring(0,1) == '#'){
            //this.sprite.color = this.sprite.color.fromHEX(this.data);
            this.sprite.color = new Color(this.data);
        }else{
            this.sprite.color = Color.WHITE;
        }
        //console.log(`updateColor => sprite.color: ${this.sprite.color}`);
    }

    showLog(){
        console.log(`[cell]showLog => no: ${this.no}, x: ${this.x}, y: ${this.y}, wh: ${this.wh}`);
    }
}

