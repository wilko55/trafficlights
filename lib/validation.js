'use strict';
module.exports = {
  checkConfig: (configName) => {
    const validConfigurations = [
      'allServices',
      'critical'
    ];

    if (!validConfigurations.includes(configName)) {
      throw 'Invalid configuration';
    }
  }
}
