import { _decorator, Component, Node, director, assetManager } from 'cc';
import { globalData } from '../data/globalData';
const { ccclass, property } = _decorator;

@ccclass('iconBtn')
export class iconBtn extends Component {

    onLoad(){
        this.node.on(Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
    }

    onDestroy(){
        this.node.off(Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    onMouseDown(){
        //console.log(`iconBtn => onMouseDown`);
        
        var url = 'http://192.168.0.98/cocos/testPrefab';
        var loadRes = globalData.LOAD_FROM_URL ? url : 'testPrefab';
        assetManager.loadBundle(loadRes, (err, bundle) => {
            if (globalData.LOAD_FROM_URL) console.warn(`loadPrefabFromOther => url: ${url}, scene: ${globalData.TEST_SCENE}`);
            if(err != null && err.message.length > 0){
                console.error(`asset load error => message: ${err.message}`);
            }
            if(bundle != null){
                bundle.loadScene(globalData.TEST_SCENE, (err, scene) => {
                    if(err != null && err.message.length > 0){
                        console.error(`scene load error => message: ${err.message}`);
                    }else{
                        director.runScene(scene);
                    }
                });
            }else{
                console.error(`onMouseDown asset => unknow error`);
            }
        });
    }
}

