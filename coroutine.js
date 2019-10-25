function coroutine(foreverGenerator) {
  const generator = foreverGenerator();
  handleGenerator();

  function handleGenerator(value, isError) {
    let response = null;
    if (isError) {
      console.error('Calling throw() on Forever Generator');
      response = generator.throw(value);
    } else {
      response = generator.next(value);

if (__DEBUGGING) {
  if (value === undefined) { console.log(`FG-Debug: Value is ${value}`);
  } else { console.log(`FG-Debug: Value is ${value} got resp:`, response); }
}

    }

    handleResponse(response.value);
    return;
  }

  function handleResponse(response) {

if (__DEBUGGING && response) console.log('RESPONSE::', response);

    if (response === undefined) { // nothing to do, re-add function to task queue
      setTimeout(handleGenerator, 0);
    } else if (typeof response === 'function') { // do action returned
      let value = response();
      handleGenerator(value);
    } else if (response && response.then) { // it is a promise, so handle it
      response.then(handleGenerator, (err) => { handleGenerator(err, true); });
      // INFO: not using .then().catch(), so that errors do not get swallowed ??
    } else {
      handleGenerator(new Error(`Invalid yield with ${response}`), true);
    }
    return;
  }

  return;
}

