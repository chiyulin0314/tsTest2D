import { _decorator, Component, Node, Button, Label, EventHandler, resources, AudioSource, AudioClip, assert } from 'cc';
import { globalData } from '../data/globalData';
import { AudioManager } from '../tools/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('unitTest')
class unitTest extends Component {

    private audioMusicKey1 = '';
    private audioMusicKey2 = '';
    private audioEffectKey1 = '';

    start() {
        this.audioUnitTest();
    }

    update(deltaTime: number) {
        
    }

    audioUnitTest() {
        console.log(`========== [unitTest] audioUnitTest start ==========`);
        AudioManager.instance.init(this.node);
        AudioManager.instance.setLoop(true);

        this.audioMusicKey1 = AudioManager.instance.loadFromResource('Get Over');
        var nameOrUrl = globalData.LOAD_FROM_URL ? globalData.COMMON_BUNDLE_URL : globalData.COMMON_BUNDLE_NAME;
        var name = 'Share the World';
        this.audioMusicKey2 = AudioManager.instance.loadFromBundle(nameOrUrl, name);
        this.audioEffectKey1 = AudioManager.instance.loadFromResource('star_a');
        
        var pmNode = this.node.getChildByPath('audio/playMusic');
        var pmButton = pmNode?.getComponent(Button);
        // var playLabel = pmNode?.getComponentInChildren(Label);
        // console.log(`  audioUnitTest => playLabel: ${playLabel != null}`);
        pmButton?.clickEvents.push(this.getEventHandler('onAudioClick', 'playMusic'));

        var pm2Node = this.node.getChildByPath('audio/playMusic2');
        var pm2Button = pm2Node?.getComponent(Button);
        pm2Button?.clickEvents.push(this.getEventHandler('onAudioClick', 'playMusic2'));

        var effectNode = this.node.getChildByPath('audio/playEffect');
        var effectButton = effectNode?.getComponent(Button);
        effectButton?.clickEvents.push(this.getEventHandler('onAudioClick', 'playEffect'));

        var playNode = this.node.getChildByPath('audio/play');
        var playButton = playNode?.getComponent(Button);
        playButton?.clickEvents.push(this.getEventHandler('onAudioClick', 'play'));

        var pauseNode = this.node.getChildByPath('audio/pause');
        var pauseButton = pauseNode?.getComponent(Button);
        pauseButton?.clickEvents.push(this.getEventHandler('onAudioClick', 'pause'));

        var stopNode = this.node.getChildByPath('audio/stop');
        var stopButton = stopNode?.getComponent(Button);
        stopButton?.clickEvents.push(this.getEventHandler('onAudioClick', 'stop'));

        var muteNode = this.node.getChildByPath('audio/mute');
        var muteButton = muteNode?.getComponent(Button);
        muteButton?.clickEvents.push(this.getEventHandler('onAudioClick', 'mute'));

        console.log(`========== [unitTest] audioUnitTest finish ==========`);
    }

    onAudioClick(e, data){
        console.log(`onAudioClick => e: ${e.target}, data: ${data}`);
        switch(data){
            case 'playMusic':
                //AudioManager.instance.playFromResource('Get Over');
                AudioManager.instance.playFromKey(this.audioMusicKey1);
                break;
            case 'playMusic2':
                AudioManager.instance.playFromKey(this.audioMusicKey2);
                break;
            case 'playEffect':
                //AudioManager.instance.playOnceFromResource('star_a');
                AudioManager.instance.playOnceFromKey(this.audioEffectKey1);
                break;
            case 'play':
                AudioManager.instance.play();
                break;
            case 'pause':
                AudioManager.instance.pause();
                break;
            case 'stop':
                AudioManager.instance.stop();
                break;
            case 'mute':
                var isMute = AudioManager.instance.isMute;
                AudioManager.instance.setMute(!isMute);
                break;
            default:
                console.log(`onAudioClick => no handle with data: ${data}`);
                break;
        }
    }

    getEventHandler(funName: string, customData: string = null){
        if(funName == null || funName.length <= 0) return null;

        var eh = new EventHandler();
        eh.target = this.node;
        eh.component = 'unitTest';
        eh.handler = funName;
        if(customData != null && customData.length > 0){
            eh.customEventData = customData;
        }

        return eh;
    }
}
