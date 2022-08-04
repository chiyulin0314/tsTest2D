import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('autoDestroy')
export class autoDestroy extends Component {

    second: number = 3;

    onDestroy(){
        console.log(`autoDestroy => onDestroy`);
    }

    start() {
        setTimeout(()=>{
            this.node.destroy();
        }, this.second*1000);
    }

    update(deltaTime: number) {
        
    }
}

