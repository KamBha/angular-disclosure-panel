/**
 * @ngdoc directive
 * @name dpContainer
 * 
 * @description
 * The directive that stores the disclosure panel.
 */
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
  constructor ($scope, $element, disclosurePanelDefaults) {
    'ngInject';
    this._isOpen = $scope.disclosurePanelController.isInitiallyOpen;
    this.$scope = $scope;
    this.$element = $element;
    this.disclosurePanelDefaults = disclosurePanelDefaults;
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

  get isOpen() {
    return this._isOpen;
  }
  
  set isOpen(newIsOpen) {
    this._isOpen = newIsOpen;
  }

  updateClass(elem) {
    if (this.isOpen) {
      elem.addClass(this.disclosurePanelDefaults.openClass);
      elem.removeClass(this.disclosurePanelDefaults.closeClass);
    }
    else {
      elem.removeClass(this.disclosurePanelDefaults.openClass);
      elem.addClass(this.disclosurePanelDefaults.closeClass);
    }
  }
  
  toggle() {
    this.isOpen = !this.isOpen;
    this.$scope.$apply();
  }
}
