import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('globalData')
export class globalData {

    static MAX_WIDTH = 1920;
    static MAX_HEIGHT = 1080;
    static MAIN_SCENE = 'main';
    static PLAYER1_SCENE = 'p1Scene';
    static PLAYER2_SCENE = 'p2Scene';
    static CELL_WH = 50;

    static USE_SPRITE = false;
    static COLOR_LIST = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    
    static DROP_TIME = 1.0;
    static MOVE_TIME = 0.12;
    static IS_HINDER = true;
}

