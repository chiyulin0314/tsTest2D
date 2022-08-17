import { _decorator, Component, Node, director, loader, assetManager, resources, Prefab, instantiate, Scene, Vec2, Vec3 } from 'cc';
import { autoDestroy } from '../autoDestroy';
import { globalData } from '../data/globalData';
const { ccclass, property } = _decorator;

@ccclass('prefabBtn')
export class prefabBtn extends Component {

    canvas: Scene = null;
    resList: Node[] = null;
    maxRes: number = 5;
    
    onLoad(){
        console.log(`prefabBtn => onLoad`);
        // this.uiOpacity = this.getComponent(UIOpacity);
        this.resList = new Array();
        this.canvas = director.getScene().getChildByName('Canvas');
        this.node.on(Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
        this.node.on(Node.EventType.MOUSE_ENTER,this.onMouseEnter,this);
        this.node.on(Node.EventType.MOUSE_LEAVE,this.onMouseLeave,this);
    }

    onDestroy(){
        console.log(`prefabBtn => onDestroy`);
        // this.uiOpacity = null;
        this.resList = null;
        this.canvas = null;
        this.node.off(Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
        this.node.off(Node.EventType.MOUSE_ENTER,this.onMouseEnter,this);
        this.node.off(Node.EventType.MOUSE_LEAVE,this.onMouseLeave,this);
    }
    
    start() {

    }

    update(deltaTime: number) {
        
    }

    onMouseEnter(){
        // console.log(`prefabBtn => onMouseEnter`);
        // if(this.uiOpacity != null){
        //     this.uiOpacity.opacity = 200;
        // }
    }

    onMouseLeave(){
        // console.log(`prefabBtn => onMouseLeave`);
        // if(this.uiOpacity != null){
        //     this.uiOpacity.opacity = 255;
        // }
    }

    onMouseDown(){
        console.log(`prefabBtn => onMouseDown`);

        //loader.loadRes();
        //assetManager.loadBundle

        this.loadPrefabFromResource();
    }

    loadPrefabFromResource(){
        resources.load("prefab/cocos-prefab", Prefab, (err, prefab) => {
            if(err != null && err.message.length > 0){
                console.error(`resources load error => message: ${err.message}`);
            }
            if(prefab != null){
                var node = instantiate(prefab);
                this.canvas.addChild(node);

                var v2 = this.getRandomPos();
                node.setPosition(v2.x, v2.y, 0);

                if(this.resList.length >= this.maxRes){
                    var delNode = this.resList.shift();
                    delNode.destroy();
                }
                this.resList.push(node);
            }else{
                console.error(`onMouseDown => unknow error`);
            }
        });
    }

    loadPrefabFromOther(){
        console.log(`prefabBtn => loadPrefabFromOther`);

        assetManager.loadBundle('testPrefab', (err, bundle) => {
            if(err != null && err.message.length > 0){
                console.error(`asset load error => message: ${err.message}`);
            }
            if(bundle != null){
                bundle.load('star-4G1L', Prefab, (err, prefab) => {
                    if(err != null && err.message.length > 0){
                        console.error(`prefab load error => message: ${err.message}`);
                    }
                    if(prefab != null){
                        var node = instantiate(prefab);
                        this.canvas.addChild(node);
                        node.addComponent(autoDestroy).second = 2.5;
        
                        var v2 = this.getRandomPos();
                        node.setPosition(v2.x, v2.y, 0);
                    }else{
                        console.error(`onMouseDown prefab => unknow error`);
                    }
                });
            }else{
                console.error(`onMouseDown asset => unknow error`);
            }
        });
    }

    getRandomPos(){
        var x = Math.random() * globalData.MAX_WIDTH - globalData.MAX_WIDTH/2;
        var y = Math.random() * globalData.MAX_HEIGHT - globalData.MAX_HEIGHT/2;
        return new Vec2(x,y);
    }
}
