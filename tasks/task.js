function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

module.exports = function(name, fn) {
  return new Promise(function(resolve, reject) {
      const start = new Date();
      console.log(`[${format(start)}] Starting '${name}'...`);

      const onFinish = function() {
          const end = new Date();
          const time = end.getTime() - start.getTime();
          console.log(`[${format(end)}] Finished '${name}' after ${time} ms`);
          resolve();
      };

      const onReject = function(msg) {
          const end = new Date();
          console.log(`[${format(end)}] Failed '${name}'. ` + (msg ? `Message: ${msg}` : ''));
          process.exit(1);
      };

      try {
          const result = fn();

          if (result instanceof Promise) {
              result.then(onFinish, onReject)
          } else {
              onFinish();
          }
      } catch(e) {
          onReject(e);
      }

  });
};
