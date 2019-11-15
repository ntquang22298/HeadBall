cc.Class({
    extends: cc.Component,

    properties: {
        accel: 0,
        maxMoveSpeed: 0,
        shoe: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0;
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown (event) {
        console.log(event);
        
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                this.actionShoeRunLeft();
                this.accLeft = true;
                break;
            case cc.macro.KEY.right:
                this.actionShoeRunRight();
                this.accRight = true;
                break;
        }

        
    },

    onKeyUp (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.left:
                this.accLeft = false;
                break;
            case cc.macro.KEY.right:
                this.accRight = false;
                break;
        }

        
    },

    actionShoeRunRight(){
        this.shoe.runAction(cc.rotateBy.create(0.5,20))
    }

    start () {

    },

    update: function (dt) {
        
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        this.node.x += this.xSpeed * dt;
    },
});
