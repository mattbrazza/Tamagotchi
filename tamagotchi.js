class Tamagotchi extends Animations {
  constructor(canvas, initialX = 0, initialY = 0) {
    super(canvas);

    const idleSheet = new Spritesheet(_IDLE_PNG, 3, 1);
    const eatSheet = new Spritesheet(_EAT_PNG, 4, 2);
    const otherSheet = new Spritesheet(_OTHER_PNG, 2, 3);

    this.animations = {
      bounce: idleSheet.getAnimationRow(),
      burger: eatSheet.getAnimationRow(2),
      candy: eatSheet.getAnimationRow(1),
      dislike: otherSheet.getAnimationRow(3),
    };

    this.stats = {
      hunger: 2,
      maxHunger: 5,
    };

    this.initX = initialX;
    this.initY = (canvas.height - idleSheet.spriteData.height) - initialY;
    this.posX = this.initX;
    this.posY = this.initY;
  }

  idle() {
    const animation = function*() {
      yield* this.bounce();
      yield* this.move(100, 0, 75);
      yield* this.move(-200, 0, 75);
      yield* this.bounce();
      yield* this.move(100, 0, 75);
      return;
    };

    return animation.call(this);
  }

  bounce() {
    const getFrame = Spritesheet.getAnimationFrames.call(this, this.animations.bounce);

    const animation = function*() {
      yield* getFrame(1);
      yield* getFrame(2);
      yield* getFrame(3);
      yield* getFrame(2);
      yield* getFrame(1);
      return;
    };

    return animation.call(this);
  }

  feed(food) {
    if (this.animations[food] == null) {
      throw new Error('This food does not exist');
      return;
    }

    const animation = function*() {
      //console.log('Current hunger is:', this.stats.hunger);
      if (this.stats.hunger <= 0) {
        yield* this.dislike();
      } else {
        this.stats.hunger--;
        this.resetPosition();
        yield* this.eat(food);
      }
      return;
    };

    return animation.call(this);
  }

  eat(food) {
    const getFrame = Spritesheet.getAnimationFrames.call(this, this.animations[food]);

    const animation = function*() {
      yield* getFrame(1);
      yield* getFrame(2);
      yield* getFrame(3);
      yield* getFrame(4);
      return;
    };

    return animation.call(this);
  }

  dislike() {
    const getFrame = Spritesheet.getAnimationFrames.call(this, this.animations.dislike);

    const animation = function*(){
      yield* getFrame(1);
      yield* getFrame(2);
      yield* getFrame(1);
      return;
    };

    return animation.call(this);
  }

}

