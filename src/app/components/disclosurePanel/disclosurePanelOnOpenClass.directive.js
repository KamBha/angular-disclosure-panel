export function DisclosurePanelOnOpenClassDirective() {
  'ngInject';

  let directive = {
    restrict: 'A',
    link: link,
    require: '^dpContainer'
  };

  return directive;
  
  function link(scope, element, attrs, disclosurePanelContainerCtrl) {
    var onOpenClass = attrs['dpOnOpenClass'];
    scope.disclosurePanelCtrl = disclosurePanelContainerCtrl;
      
    scope.$watch('disclosurePanelCtrl.isOpen', watch)

    function watch(value) {
      if (value) {
        element.addClass(onOpenClass);
      }
      else {
        element.removeClass(onOpenClass);
      }
    }
    
  }
}
