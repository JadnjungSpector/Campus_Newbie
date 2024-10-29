module.exports = function override(config, env) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      timers: require.resolve("timers-browserify"),
      stream: require.resolve("stream-browserify"),
      net: false,
      querystring: false, // Ensure this is included
    };
    return config;
  };
  