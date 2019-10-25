class App {
  constructor(pal) {
    this.pal = pal;
    this.userEvents = [];
    this.isRunning = false;
    this.birthdate = Date.now();
    this.timestamps = {
      userInput: new Date(Date.now() + 900000),
    };
    this.sleepDelay = 1000 * 60 * 15;
  }

  start() {
    if (this.isRunning) {
      throw new Error('The App is already running');
    }
    this.isRunning = true;
    this.birthdate = Date.now();
    coroutine(this.createForeverGenerator());
    return;
  }

  createForeverGenerator() {
    const foreverGenerator = function* () {
      let done = false;
      let action = this.pal.idle();

      while(this.isRunning) {
        if (this.userEvents.length > 0) {
          const event = this.userEvents.shift();
//console.log('EVENT::', event);
          action.return();
          yield* event();
          this.timestamps.userInput = Date.now();
        }

        if ((Date.now() - this.timestamps.userInput) > this.sleepDelay) {
          action.return();
          action = this.pal.sleep();
        }

        while (!done && !(this.userEvents.length > 0)) {
//console.log(action);
          const next = action.next();
          done = next.done;
          yield next.value;
        }

        action = this.pal.idle();
        done = false;
      }

      console.log('Forever Generator is ending...');
      return;
    };

    return foreverGenerator.bind(this);
  }
}

