import { _decorator, Component, Node, UIOpacity, CCInteger, Enum, CCString, director } from 'cc';
const { ccclass, property } = _decorator;

enum EVENT_TYPE {
    NONE = 0,
    LOAD_SCENE = 1,
}
Enum(EVENT_TYPE);

@ccclass('commonButton')
export class commonButton extends Component {

    uiOpacity: UIOpacity = null;
    normalOpacity: number = 255;
    @property({type: CCInteger, min: 0, max: 255})
    hoverOpacity = 200;
    @property({type: CCInteger, min: 0, max: 255})
    clickOpacity = 200;
    @property({type: EVENT_TYPE})
    type: EVENT_TYPE = EVENT_TYPE.NONE;
    @property({
        type: CCString,
        visible: function(this: commonButton) { return this.type == EVENT_TYPE.LOAD_SCENE; },
    })
    sceneName = "";
    
    onLoad(){
        //console.log(`commonButton => onLoad`);
        this.uiOpacity = this.getComponent(UIOpacity);
        this.normalOpacity = this.uiOpacity?.opacity ?? 255;
        this.node.on(Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
        this.node.on(Node.EventType.MOUSE_ENTER,this.onMouseEnter,this);
        this.node.on(Node.EventType.MOUSE_LEAVE,this.onMouseLeave,this);
    }

    onDestroy(){
        //console.log(`commonButton => onDestroy`);
        this.uiOpacity = null;
        this.node.off(Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
        this.node.off(Node.EventType.MOUSE_ENTER,this.onMouseEnter,this);
        this.node.off(Node.EventType.MOUSE_LEAVE,this.onMouseLeave,this);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    onMouseEnter(){
        //console.log(`commonButton => onMouseEnter, this.uiOpacity: ${this.uiOpacity}`);
        if(this.uiOpacity != null){
            this.uiOpacity.opacity = this.hoverOpacity;
        }
    }

    onMouseLeave(){
        //console.log(`commonButton => onMouseLeave`);
        if(this.uiOpacity != null){
            this.uiOpacity.opacity = this.normalOpacity;
        }
    }

    onMouseDown(){
        //console.log(`commonButton => onMouseDown`);
        if(this.uiOpacity != null){
            this.uiOpacity.opacity = this.clickOpacity;
        }

        switch(this.type){
            case EVENT_TYPE.NONE:
                break;
            case EVENT_TYPE.LOAD_SCENE:
                if(this.sceneName != null && this.sceneName.length > 0){
                    director.loadScene(this.sceneName);
                }
                break;
            default:
                break;
        }
    }
}

