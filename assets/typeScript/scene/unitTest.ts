import { _decorator, Component, Node, Button, Label, EventHandler, resources, AudioSource, AudioClip, assert, Slider, Skeleton, sp, Texture2D } from 'cc';
import { globalData } from '../data/globalData';
import { AudioManager } from '../../references/testUtils/AudioManager';
import { SpineUtils } from '../../references/testUtils/SpineUtils';
const { ccclass, property } = _decorator;

@ccclass('unitTest')
class unitTest extends Component {

    private audioMusicKey1 = '';
    private audioMusicKey2 = '';
    private audioEffectKey1 = '';

    private girlSkinId: number = 0;
    private girlActId: number = 0;
    private riderSke: sp.Skeleton = null;

    start() {
        this.audioUnitTest();
        this.spineUnitTest();
    }

    update(deltaTime: number) {
        
    }

//#region //========== audioUnitTest ==========
    audioUnitTest() {
        console.log(`========== [unitTest] audioUnitTest start ==========`);
        AudioManager.instance.init(this.node);
        AudioManager.instance.setLoop(true);

        this.audioMusicKey1 = AudioManager.instance.loadFromResource('Get Over');
        var nameOrUrl = globalData.LOAD_FROM_URL ? globalData.COMMON_BUNDLE_URL : globalData.COMMON_BUNDLE_NAME;
        var name = 'Share the World';
        this.audioMusicKey2 = AudioManager.instance.loadFromBundle(nameOrUrl, name);
        this.audioEffectKey1 = AudioManager.instance.loadFromResource('effectStarA');
        
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

        var sliderNode = this.node.getChildByPath('audio/Slider');
        var slider = sliderNode?.getComponent(Slider);
        slider?.slideEvents.push(this.getEventHandler('onAudioClick', 'slider'));
        
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
                //AudioManager.instance.playOnceFromResource('effectStarA');
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
            case 'slider':
                var slider: Slider = e as Slider;
                //console.log(`onAudioClick => slider: ${slider != null}, progress: ${slider.progress}`);
                if(slider.progress != null){
                    AudioManager.instance.setVolume(slider.progress);
                }
                break;
            default:
                console.log(`onAudioClick => no handle with data: ${data}`);
                break;
        }
    }
//#endregion

//#region //========== spineUnitTest ==========
    spineUnitTest(){
        console.log(`========== [unitTest] spineUnitTest start ==========`);

        var activeGirlNode = this.node.getChildByPath('spine/activeGirl');
        var activeGirlButton = activeGirlNode?.getComponent(Button);
        activeGirlButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'activeGirl'));

        var loadBoyNode = this.node.getChildByPath('spine/loadBoy');
        var loadBoyButton = loadBoyNode?.getComponent(Button);
        loadBoyButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'loadBoy'));

        var loadRiderNode = this.node.getChildByPath('spine/loadRider');
        var loadRiderButton = loadRiderNode?.getComponent(Button);
        loadRiderButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'loadRider'));

        var loadRiderBundleNode = this.node.getChildByPath('spine/loadRider-bundle');
        var loadRiderBundleButton = loadRiderBundleNode?.getComponent(Button);
        loadRiderBundleButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'loadRider-bundle'));

        var changeNode = this.node.getChildByPath('spine/instance/girl/change');
        var changeButton = changeNode?.getComponent(Button);
        changeButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'girl-change'));
        var actionNode = this.node.getChildByPath('spine/instance/girl/action');
        var actionButton = actionNode?.getComponent(Button);
        actionButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'girl-action'));
        var gWalkNode = this.node.getChildByPath('spine/instance/girl/addWalk');
        var gWalkButton = gWalkNode?.getComponent(Button);
        gWalkButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'girl-addWalk'));
        var gDanceNode = this.node.getChildByPath('spine/instance/girl/addDance');
        var gDanceButton = gDanceNode?.getComponent(Button);
        gDanceButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'girl-addDance'));
        var gIdleNode = this.node.getChildByPath('spine/instance/girl/addIdle');
        var gIdleButton = gIdleNode?.getComponent(Button);
        gIdleButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'girl-addIdle'));

        var bChangeNode = this.node.getChildByPath('spine/instance/boy/changeWeapon');
        var bChangeButton = bChangeNode?.getComponent(Button);
        bChangeButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'boy-changeWeapon'));
        var bDestroyNode = this.node.getChildByPath('spine/instance/boy/destoryHero');
        var bDestroyButton = bDestroyNode?.getComponent(Button);
        bDestroyButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'boy-destoryHero'));

        var rJumpNode = this.node.getChildByPath('spine/instance/rider/jump');
        var rJumpButton = rJumpNode?.getComponent(Button);
        rJumpButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'rider-jump'));
        var rWalkNode = this.node.getChildByPath('spine/instance/rider/walk');
        var rWalkButton = rWalkNode?.getComponent(Button);
        rWalkButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'rider-walk'));
        var rRoarNode = this.node.getChildByPath('spine/instance/rider/roar');
        var rRoarButton = rRoarNode?.getComponent(Button);
        rRoarButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'rider-roar'));
        var rWGNode = this.node.getChildByPath('spine/instance/rider/walk+grab');
        var rWGButton = rWGNode?.getComponent(Button);
        rWGButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'rider-walk+grab'));
        var rWHNode = this.node.getChildByPath('spine/instance/rider/walk+holster');
        var rWHButton = rWHNode?.getComponent(Button);
        rWHButton?.clickEvents.push(this.getEventHandler('onSpineClick', 'rider-walk+holster'));

        var node = this.node.getChildByPath('spine/instance/girl');
        var ske = node.getComponentInChildren(sp.Skeleton);
        ske.setCompleteListener(this.onGirlAnimComplete);
        ske.setStartListener(this.onGirlAnimStart);
        ske.setEndListener(this.onGirlAnimEnd);

        //var actArr = SpineUtils.getSpineActions(ske);
        //actArr.forEach(element => { console.log(element); });

        //var url = `http://192.168.0.98/cocos/boy/spineboy-pro`;
        //SpineUtils.loadFromRemote(url, this.node);

        console.log(`========== [unitTest] spineUnitTest finish ==========`);
    }

    onSpineClick(e, data){
        console.log(`onSpineClick => e: ${e.target}, data: ${data}`);
        switch(data){
            case 'activeGirl':
                var node = this.node.getChildByPath('spine/instance/girl');
                if(node != null){
                    node.active = !node.active;
                }
                break;
            case 'loadBoy':
                var node = this.node.getChildByPath('spine/instance/boy');
                if(node != null){
                    node.active = true;
                }

                node.getChildByName('boy-skeleton')?.destroy();
                SpineUtils.loadFromResource('spine/spineboy-pro', node, (ske: sp.Skeleton) => {
                    ske?.setAnimation(0, 'walk', true);
                    ske?.node?.setScale(0.5, 0.5);
                    ske.node.name = 'boy-skeleton';
                });
                break;
            case 'loadRider':
                var node = this.node.getChildByPath('spine/instance/rider');
                if(node != null){
                    node.active = true;
                }

                node.getChildByName('skeleton')?.destroy();
                SpineUtils.loadFromPrefab('prefab/rider', node, (ske: sp.Skeleton) => {
                    if(ske != null){
                        this.riderSke = ske;
                        ske.setAnimation(0, 'roar', true);
                        ske.node.name = 'skeleton';
                    }
                });
                break;
            case 'loadRider-bundle':
                var node = this.node.getChildByPath('spine/instance/rider');
                if(node != null){
                    node.active = true;
                }

                node.getChildByName('skeleton')?.destroy();
                var nameOrUrl = globalData.LOAD_FROM_URL ? globalData.COMMON_BUNDLE_URL : globalData.COMMON_BUNDLE_NAME;
                SpineUtils.loadFromBundle(nameOrUrl, 'rider2', node, (ske: sp.Skeleton) => {
                    if(ske != null){
                        this.riderSke = ske;
                        ske.setAnimation(0, 'roar', true);
                        ske.node.name = 'skeleton';

                        this.riderSke.setMix('walk', 'jump', 0.5);
                        this.riderSke.setMix('jump', 'walk', 0.5);
                        this.riderSke.setMix('walk', 'roar', 0.5);
                        this.riderSke.setMix('roar', 'walk', 0.5);
                        this.riderSke.setMix('jump', 'roar', 0.5);
                        this.riderSke.setMix('roar', 'jump', 0.5);
                        this.riderSke.setMix('jump', 'jump', 0.5);
                        this.riderSke.setMix('walk', 'walk', 0.5);
                    }
                });
                break;
            case 'girl-change':
                const skins = ['girl', 'girl-blue-cape', 'girl-spring-dress'].map(x => `full-skins/${x}`);
                this.girlSkinId = (this.girlSkinId + 1) % skins.length;
                var ske = this.node.getChildByPath('spine/instance/girl/skeleton')?.getComponent(sp.Skeleton);
                ske?.setSkin(skins[this.girlSkinId]);
                break;
            case 'girl-action':
                const actions = ['dance', 'dress-up', 'idle', 'walk', 'aware', 'blink'];
                this.girlActId = (this.girlActId + 1) % actions.length;
                var ske = this.node.getChildByPath('spine/instance/girl/skeleton')?.getComponent(sp.Skeleton);
                ske?.setAnimation(0, actions[this.girlActId], true);
                break;
            case 'girl-addWalk':
                var ske = this.node.getChildByPath('spine/instance/girl/skeleton')?.getComponent(sp.Skeleton);
                ske?.addAnimation(0, 'walk', true);
                break;
            case 'girl-addDance':
                var ske = this.node.getChildByPath('spine/instance/girl/skeleton')?.getComponent(sp.Skeleton);
                ske?.addAnimation(0, 'dance', true);
                break;
            case 'girl-addIdle':
                var ske = this.node.getChildByPath('spine/instance/girl/skeleton')?.getComponent(sp.Skeleton);
                ske?.addAnimation(0, 'idle', true);
                break;
            case 'boy-changeWeapon':
                var node = this.node.getChildByPath('spine/instance/boy');
                SpineUtils.loadFromResource('spine/hero-pro', node, (heroSke: sp.Skeleton) => {
                    if(heroSke != null){
                        heroSke.setAnimation(0, 'idle', true);
                        heroSke.node.setScale(0.5, 0.5);
                        heroSke.node.setPosition(-200, 0);
                        heroSke.node.name = 'hero-skeleton';

                        var boySke = node.getChildByName('boy-skeleton')?.getComponent(sp.Skeleton);
                        let slot1 = boySke.findSlot("gun");
                        let slot2 = heroSke.findSlot("weapon");
                        let attachment = slot2.getAttachment();
                        slot1.setAttachment(attachment);
                    }
                });
                break;
            case 'boy-destoryHero':
                var node = this.node.getChildByPath('spine/instance/boy');
                node.getChildByName('hero-skeleton')?.destroy();
                break;
            case 'rider-jump':
                this.riderSke?.setAnimation(0, 'jump', true);
                break;
            case 'rider-walk':
                this.riderSke?.setAnimation(0, 'walk', true);
                break;
            case 'rider-roar':
                this.riderSke?.setAnimation(0, 'roar', true);
                break;
            case 'rider-walk+grab':
                this.riderSke?.setAnimation(0, 'walk', true);
                this.riderSke?.setAnimation(1, 'gun-grab', false);
                break;
            case 'rider-walk+holster':
                this.riderSke?.setAnimation(0, 'walk', true);
                this.riderSke?.setAnimation(1, 'gun-holster', false);
                break;
            default:
                console.log(`onSpineClick => no handle with data: ${data}`);
                break;
        }
    }

    onGirlAnimComplete(trackEntry){
        let name = trackEntry.animation.name;
        console.log(`onGirlAnimComplete => Complete name: ${name}`);
    }
    onGirlAnimStart(trackEntry){
        let name = trackEntry.animation.name;
        console.log(`onGirlAnimStart => Start name: ${name}`);
    }
    onGirlAnimEnd(trackEntry){
        let name = trackEntry.animation.name;
        console.log(`onGirlAnimEnd => End name: ${name}`);
    }
//#endregion

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
