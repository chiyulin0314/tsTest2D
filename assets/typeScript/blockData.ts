import { _decorator, Component, Node, math, Enum } from 'cc';
const { ccclass, property } = _decorator;

export enum BLOCK_DIR {
    DIR_0 = 0,
    DIR_1 = 1,
    DIR_2 = 2,
    DIR_3 = 3,
    DIR_COUNT = 4,
};

export enum BLOCK_TYPE {
    TYPE_I = 0,
    TYPE_J = 1,
    TYPE_L = 2,
    TYPE_O = 3,
    TYPE_S = 4,
    TYPE_T = 5,
    TYPE_Z = 6,
    TYPE_COUNT = 7,
};

@ccclass('blockData')
export class blockData {
    static blockData = null;

    static initBlock(){
        this.blockData = new Array(BLOCK_TYPE.TYPE_COUNT);
        for(var type = 0;type < BLOCK_TYPE.TYPE_COUNT;type++){
            this.blockData[type] = new Array(BLOCK_DIR.DIR_COUNT);
            for(var dir = 0;dir < BLOCK_DIR.DIR_COUNT; dir++){
                this.blockData[type][dir] = new Array(4);
                for(var x = 0;x < 4;x++){
                    this.blockData[type][dir][x] = new Array(4);
                    for(var y = 0;y < 4;y++){
                        this.blockData[type][dir][x][y] = 0;
                    }
                }
            }
        }

        this.initBlockI();
        this.initBlockJ();
        this.initBlockL();
        this.initBlockO();
        this.initBlockS();
        this.initBlockT();
        this.initBlockZ();
        //this.showLog();
    }

    static initBlockI(){
        var index = BLOCK_TYPE.TYPE_I;
        this.blockData[index][BLOCK_DIR.DIR_0][1][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][3] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][0][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][2][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][3][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][2][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][2][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][2][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][2][3] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][2][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][3][1] = 1;
    }

    static initBlockJ(){
        var index = BLOCK_TYPE.TYPE_J;
        this.blockData[index][BLOCK_DIR.DIR_0][0][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][0][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][2][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][2][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][2][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][2][1] = 1;
    }

    static initBlockL(){
        var index = BLOCK_TYPE.TYPE_L;
        this.blockData[index][BLOCK_DIR.DIR_0][0][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][2][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][2][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][2][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][0][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][2][1] = 1;
    }

    static initBlockO(){
        var index = BLOCK_TYPE.TYPE_O;
        this.blockData[index][BLOCK_DIR.DIR_0][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][0][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][0][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][0][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][0][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][1][2] = 1;
    }

    static initBlockS(){
        var index = BLOCK_TYPE.TYPE_S;
        this.blockData[index][BLOCK_DIR.DIR_0][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][0][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][2][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][2][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][2][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][0][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][1][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][2][1] = 1;
    }

    static initBlockT(){
        var index = BLOCK_TYPE.TYPE_T;
        this.blockData[index][BLOCK_DIR.DIR_0][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][2][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][2][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][1][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][2][1] = 1;
    }

    static initBlockZ(){
        var index = BLOCK_TYPE.TYPE_Z;
        this.blockData[index][BLOCK_DIR.DIR_0][0][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_0][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][0][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][1][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_1][2][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][2][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_2][2][2] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][0][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][1][0] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][1][1] = 1;
        this.blockData[index][BLOCK_DIR.DIR_3][2][0] = 1;
    }

    static getRandomType(curType, canSame = false){
        if(this.blockData == null){
            this.initBlock();
        }

        var type = math.randomRangeInt(0, BLOCK_TYPE.TYPE_COUNT);
        if(curType == type && canSame == false){
            console.log(`[blockData]getRandomType avoid same => type: ${type}, curType: ${curType}`);
            type = (type + math.randomRangeInt(1, BLOCK_TYPE.TYPE_COUNT)) % BLOCK_TYPE.TYPE_COUNT;
        }

        return type;
    }

    static getBlockData(type, dir = BLOCK_DIR.DIR_0){
        if(this.blockData == null){
            this.initBlock();
        }

        if(typeof type !== 'number' || type >= BLOCK_TYPE.TYPE_COUNT){
            type = BLOCK_TYPE.TYPE_I;
        }
        if(typeof dir !== 'number' || dir >= BLOCK_DIR.DIR_COUNT){
            dir = BLOCK_DIR.DIR_0;
        }

        return this.blockData[type][dir];
    }

    static showLog(){
        for(var t = 0;t < this.blockData.length;t++){
            for(var d = 0;d < this.blockData[t].length;d++){
                var str = '';
                for(var x = 0;x < this.blockData[t][d].length;x++){
                    for(var y = 0;y < this.blockData[t][d][x].length;y++){
                        str += this.blockData[t][d][x][y] == 0 ? 'X' : 'O';
                    }
                    str += '\n';
                }
                console.log(str);
            }
        }
    }
}

