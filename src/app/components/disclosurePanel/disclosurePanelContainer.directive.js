export function DisclosurePanelContainerDirective() {
  'ngInject';

  let directive = {
    restrict: 'A',
    scope: {
        isInitiallyOpen: "="
    },
    controller: DisclosurePanelController,
    bindToController: true,
    controllerAs: 'disclosurePanelController'
  };

  return directive;
}

class DisclosurePanelController {
  constructor ($scope, $element) {
    'ngInject';

    this.isOpen = $scope.disclosurePanelController.isInitiallyOpen;
    this.$scope = $scope;
    this.$element = $element;
    this._init();
  }
  
  _init() {
    let isOpenWatcher = () => {
      this.updateClass(this.$element);
    }

    let onDestroy = () => {
      this.removeWatcher();
    }
    isOpenWatcher(this.isOpen);
    this.removeWatcher = this.$scope.$watch('disclosurePanelController.isOpen', isOpenWatcher);
    this.$scope.$on('$destroy', onDestroy);
  }

  updateClass(elem) {
    if (this.isOpen) {
      elem.addClass('dp-open');
      elem.removeClass('dp-close');
    }
    else {
      elem.removeClass('dp-open');
      elem.addClass('dp-close');
    }
  }
  
  toggle() {
    this.isOpen = !this.isOpen;
    this.$scope.$apply();
  }
}
