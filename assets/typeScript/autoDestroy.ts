import { _decorator, Component, Node, CCInteger, CCFloat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('autoDestroy')
export class autoDestroy extends Component {

    @property({type: CCFloat, min: 0.5, step: 0.5})
    second: number = 3;

    onDestroy(){
        console.log(`autoDestroy => onDestroy`);
    }

    start() {
        setTimeout(()=>{
            if(this.node != null){
                this.node.destroy();
            }
        }, this.second*1000);
    }

    update(deltaTime: number) {
        
    }
}

