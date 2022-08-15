import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('eventData')
export class eventData {
    static GAME_OVER_EVENT = 'GAME_OVER';
    static CLEAN_BLOCK_EVENT = 'CLEAN_BLOCK';
}

