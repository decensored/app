const plugins = {
  // private
  _debug: false,
  _registered: [],
  _disabled: {},

  _debugLog: function (...params) {
    if (!this._debug) return;
    console.log(...params);
  },

  // public
  setDebug: function (debug = true) {
    this._debugLog(`plugins.setDebug(${debug})`);
    this._debug = debug;
  },

  register: function (plugin = { name: "<plugin-name>", ...functions }) {
    this._debugLog(`plugins.register("${plugin.name}", ${Object.keys(plugin).filter(k => k !== 'name')})`);
    this._registered.push(plugin);
  },

  disable: function (name = "<plugin-name>", isDisabled = true) {
    this._debugLog(`plugins.disable("${name}", ${isDisabled})`);
    this._disabled[name] = isDisabled;
  },

  call: function (functionName = "<function-name>", functionParam = undefined) {
    this._debugLog(`plugins.call("${functionName}", ${functionParam})`);
  
    for (const plugin of this._registered) {
      if (this._disabled[plugin.name] || !plugin[functionName]) continue;
      this._debugLog(`plugins.call("${plugin.name}.${functionName}", ${functionParam})`);
      functionParam = plugin[functionName](functionParam);
      this._debugLog(`plugins.call("${plugin.name}.${functionName}") returned ${functionParam}`);
    }
  
    return functionParam;
  }
};
