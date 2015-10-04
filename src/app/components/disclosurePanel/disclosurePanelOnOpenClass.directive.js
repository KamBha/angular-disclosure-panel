export function DisclosurePanelOnOpenClassDirective() {
  'ngInject';

  let directive = {
    restrict: 'A',
    link: link,
    scope: {
      'dpOnOpenClass' : '@'
    },
    require: '^dpContainer'
  };

  return directive;
  
  function link(scope, element, attrs, disclosurePanelContainerCtrl) {
    scope.disclosurePanelCtrl = disclosurePanelContainerCtrl;
      
    scope.$watch('disclosurePanelCtrl.isOpen', watch)

    function watch(value) {
      if (value) {
        element.addClass(scope.dpOnOpenClass);
      }
      else {
        element.removeClass(scope.dpOnOpenClass);
      }
    }
    
  }
}
