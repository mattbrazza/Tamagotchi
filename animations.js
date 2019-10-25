class Animations {
  constructor(canvas, limitedWidth, limitedHeight) {
    if (limitedWidth <= 0 || limitedHeight <= 0) {
      throw new Error('The field width and height must be at least 1px');
    }
    if (limitedWidth > canvas.width || limitedHeight > canvas.height) {
      throw new Error('The field width and height cannot be greater than the canvas');
    }

    const context = canvas.getContext('2d');
    const width = limitedWidth || canvas.width;
    const height = limitedHeight || canvas.height;

    this.clear = this.clear.bind(this, context, width, height);
    this.drawFrame = this.drawFrame.bind(this, context);
  }

  clear(context, width, height) {
    context.clearRect(0, 0, width, height);
    return;
  }

  delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        return;
      }, ms);
      return;
    });
  }

  drawFrame(context, image, frame, width, height, x = this.posX, y = this.posY, ms = 350) {
    const clear = this.clear;
    const draw = () => {
      requestAnimationFrame(() => {
        context.drawImage(image, ...frame, width, height, x, y, width, height);
        return;
      });
      return;
    };

    const animation = function*() {
      yield clear;
      yield draw;
      yield this.delay(ms);
    };

    return animation.call(this);
  }

  move(deltaX, deltaY, ms, action = 'bounce', frame = 1) {
    const getFrame = Spritesheet.getAnimationFrames.call(this, this.animations[action]);

    const incrementXBy = (deltaX > 0) ? 5 : -5;
    const incrementYBy = (deltaY > 0) ? 5 : -5;
    const desX = this.posX + deltaX;
    const desY = this.posY + deltaY;
    let newX = this.posX;
    let newY = this.posY;
    let doneX = (incrementXBy > 0 && newX > desX) || (incrementXBy < 0 && newX < desX)
    let doneY = (incrementYBy > 0 && newY > desY) || (incrementYBy < 0 && newY < desY)

    const animation = function*() {
      while (true) {

        newX = this.posX + incrementXBy;
        if (newX < 0) {
          newX = 0;
          doneX = true;
        } else if ((incrementXBy > 0 && newX > desX) || (incrementXBy < 0 && newX < desX)){
          newX = desX;
          doneX = true;
        }

        newY = this.posY + incrementYBy;
        if (newY < 0) {
          newY = 0;
          doneY = true;
        } else if ((incrementYBy > 0 && newY > desY) || (incrementYBy < 0 && newY < desY)) {
          newY = desY;
          doneY = true;
        }

        if (doneX && doneY) {
          return;
        } else {
          yield* getFrame(frame, this.posX, this.posY, ms);
        }

        if (!doneX) { this.posX = newX; }
        if (!doneY) { this.posY = newY; }
      }
      return;
    };

    return animation.call(this);
  }

  resetPosition() {
    this.posX = this.initX;
    this.posY = this.initY;
    return;
  }

}

