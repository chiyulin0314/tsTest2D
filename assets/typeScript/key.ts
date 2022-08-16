import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum KEY_STATUS {
    UP = 0,
    DOWN = 1,
}

@ccclass('key')
export class key {
    private _keyCode: number = 0;
    get keyCode(): number {
        return this._keyCode;
    };
    get isValid(): boolean {
        return this._keyCode > 0;
    };
    private _preState: KEY_STATUS = KEY_STATUS.UP;
    private _nowState: KEY_STATUS = KEY_STATUS.UP;
    keyDownTime: number = 0;
    keyDownEvent = null;
    keyUpEvent = null;

    constructor(keyCode: number){
        this._keyCode = keyCode;
        if(this.isValid == false){
            console.error(`[key]ctor failed => keyCode: ${keyCode}`);
        }
    }

    onKeyDown(){
        if(this.isValid == false) return;

        this._preState = this._nowState;
        this._nowState = KEY_STATUS.DOWN;

        if(this.isKeyDown()){
            this.keyDownTime = new Date().getTime();
            //console.log(`[key]onKeyDown => keyDownTime: ${this.keyDownTime}`);
            if(typeof this.keyDownEvent === 'function'){
                this.keyDownEvent(this._keyCode);
            }
        }
    }

    onKeyUp(){
        if(this.isValid == false) return;

        this._preState = this._nowState;
        this._nowState = 0;

        if(this.isKeyUp()){
            this.keyDownTime = 0;
            //console.log(`[key]onKeyUp`);
            if(typeof this.keyUpEvent === 'function'){
                this.keyUpEvent(this._keyCode);
            }
        }
    }

    //按下的一瞬間
    isKeyDown(){
        return this._preState == 0 && this._nowState == 1;
    }

    //放開的一瞬間
    isKeyUp(){
        return this._preState == 1 && this._nowState == 0;
    }

    //按住
    isKeyPress(){
        return this._nowState == 1;
    }
}

