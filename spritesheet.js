class Spritesheet {
  constructor(img, columns, rows) {
    if (columns <= 0 || rows <= 0) {
      throw new Error('The number of rows/columns must be greater than zero');
    }

    const image = new Image();
    if (typeof img === 'string') {
      image.src = img;
    } else {
      image.src = img.src;
    }

    const width = image.width / columns;
    const height = image.height / rows;
    const frames = [];
    for (let j=0; j<rows; j++) {
      frames.push([]);
      for (let i=0; i<columns; i++) {
        frames[j][i] = [i * width, j * height];
      }
    }

    this.spriteData = {
      image,
      width, height,
      frames
    };
  }

  getAnimationRow(row = 1) {
    return { ...this.spriteData, frames: this.spriteData.frames[row - 1] };
  }

  static getAnimationFrames(animation) {
    const { image, width, height, frames } = animation;

    const drawAnimationFunc = (frame, ...args) => {
      return this.drawFrame(image, frames[frame - 1], width, height, ...args);
    };

    return drawAnimationFunc;
  }

}

