export function DisclosurePanelTogglerDirective($log) {
  'ngInject';

  let directive = {
    restrict: 'A',
    link: link,
    require: '^dpContainer'
  };

  return directive;
  
  function link(scope, element, attrs, disclosurePanelController) {
    element.on('click', clickHandler);
    
    scope.$on('destroy', destroy);
    disclosurePanelController.updateClass(element);

    function clickHandler() {
      disclosurePanelController.toggle();
      disclosurePanelController.updateClass(element);
    }
    
    function destroy() {
      $log.debug("destroying disclosure panel toggler");
      element.off('click', clickHandler);
    }
  }
}
