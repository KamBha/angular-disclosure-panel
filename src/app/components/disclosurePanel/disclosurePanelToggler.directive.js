export function DisclosurePanelTogglerDirective($log, disclosurePanelDefaults) {
  'ngInject';

  let directive = {
    restrict: 'A',
    link: link,
    require: '^dpContainer'
  };

  return directive;
  
  function link(scope, element, attrs, disclosurePanelController) {
    var isDisabled = scope.$eval(attrs['dpTogglerDisabled']);
    scope.containerCtrl = disclosurePanelController;
    scope.$watch(attrs['dpTogglerDisabled'], isDisabledObserver); 
    element.on('click', clickHandler);
    
    scope.$on('destroy', destroy);
    disclosurePanelController.updateClass(element);
    scope.$watch('containerCtrl.isDisabled', updateDisableClass);
    updateDisableClass();

    function clickHandler() {
      if (!isDisabled && !disclosurePanelController.isDisabled) {
        disclosurePanelController.toggle();
        disclosurePanelController.updateClass(element);        
      }
    }
    
    function isDisabledObserver(interpolatedValue) {
      isDisabled = interpolatedValue;
      updateDisableClass();
    }
    
    function updateDisableClass() {
      if (isDisabled || disclosurePanelController.isDisabled) {
        element.addClass(disclosurePanelDefaults.disabledClass);
      }
      else {
        element.removeClass(disclosurePanelDefaults.disabledClass);
      }
    }
    
    function destroy() {
      $log.debug("destroying disclosure panel toggler");
      element.off('click', clickHandler);
    }
  }
}
