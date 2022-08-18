import { _decorator, Component, Node, director } from 'cc';
import { autoDestroy } from '../autoDestroy';
import { globalData } from '../data/globalData';
const { ccclass, property } = _decorator;

@ccclass('testScene')
export class testScene extends Component {
    start() {

    }

    update(deltaTime: number) {
        var comps = this.node.getComponentsInChildren(autoDestroy);
        if(comps == null || comps.length <= 0){
            director.loadScene(globalData.MAIN_SCENE);
        }
    }
}

