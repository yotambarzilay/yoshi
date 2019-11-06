module.exports = class StatsWriterPlugin {
  constructor(filename = 'stats.json') {
    this.filename = filename;
  }
  apply(compiler) {
    compiler.hooks.emit.tapPromise(
      'stats-writer-plugin',
      this.emitStats.bind(this),
    );
  }

  emitStats(curCompiler, callback) {
    const stats = curCompiler.getStats().toJson();

    let err;
    return (
      Promise.resolve()
        // Transform.
        .then(() => JSON.stringify(stats, null, 2))
        .catch(e => {
          err = e;
        })

        // Finish up.
        .then(statsStr => {
          // Handle errors.
          if (err) {
            curCompiler.errors.push(err);
            if (callback) {
              return void callback(err);
            }
            throw err;
          }

          // Add to assets.
          curCompiler.assets[this.filename] = {
            source() {
              return statsStr;
            },
            size() {
              return statsStr.length;
            },
          };

          if (callback) {
            return void callback();
          }
        })
    );
  }
};
