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
        isInitiallyOpen: '=',
        fireEventOnOpen: '@',
        fireEventOnClose: '@',
        openOnEvent: '@',
        closeOnEvent: '@'
    },
    controller: DisclosurePanelController,
    bindToController: true,
    controllerAs: 'disclosurePanelController'
  };

  return directive;
}

class DisclosurePanelController {
  constructor ($scope, $element, disclosurePanelDefaults, $rootScope) {
    'ngInject';
    this._isOpen = $scope.disclosurePanelController.isInitiallyOpen;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.fireEventOnOpen = $scope.disclosurePanelController.fireEventOnOpen;
    this.fireEventOnClose = $scope.disclosurePanelController.fireEventOnClose;
    this.openOnEvent = $scope.disclosurePanelController.openOnEvent;
    this.closeOnEvent = $scope.disclosurePanelController.closeOnEvent;
    this.$element = $element;
    this.disclosurePanelDefaults = disclosurePanelDefaults;
    this._init();
  }
  
  _init() {
    let isOpenWatcher = () => {
      this.updateClass(this.$element);
    }
    
    let closeOnEventRegistration;
    let openOnEventRegistration;

    let onDestroy = () => {
      this.removeWatcher();
    }

    if (this.closeOnEvent) {
      closeOnEventRegistration = () => {
        this.isOpen = false;
        this.$scope.$apply();
      }
      this.$rootScope.$on(this.closeOnEvent, closeOnEventRegistration);
    }
    
    if (this.openOnEvent) {
      openOnEventRegistration = () => {
        this.isOpen = true;
        this.$scope.$apply();
      }
      this.$rootScope.$on(this.openOnEvent, openOnEventRegistration);
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
    
    if (this.fireEventOnOpen && newIsOpen) {
      this.$rootScope.$emit(this.fireEventOnOpen);
    }
    
    if (this.fireEventOnClose && !newIsOpen) {
      this.$rootScope.$emit(this.fireEventOnClose);
    }
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
