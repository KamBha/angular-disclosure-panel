export function DisclosurePanelDefaultsProvider() {
  'ngInject';
  let defaults = { 'openClass' : 'dp-open', 'closeClass' : 'dp-close' };
  this.overrideDefaults = overrideDefaults;
  
  this.$get = function getDefaults() {
      return defaults;
  };
  
  function overrideDefaults(overrides) {
      defaults = angular.extend(defaults, overrides);
  }
}
