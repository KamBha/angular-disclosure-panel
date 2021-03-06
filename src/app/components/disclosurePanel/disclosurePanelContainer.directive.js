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
        closeOnEvent: '@',
        disabled: '='
    },
    controller: DisclosurePanelController,
    bindToController: true,
    link: link,
    controllerAs: 'disclosurePanelController',
    require: '?^dpGroup'
  };

  return directive;
}

function link(scope, element, attrs, disclosurePanelGroup) {
  if (disclosurePanelGroup == null)
    return;
  var deregister = disclosurePanelGroup.register(scope.disclosurePanelController);
  let onDestroy = () => {
    deregister();
  }
  scope.disclosurePanelGroup = disclosurePanelGroup;
  scope.$on('$destroy', onDestroy);
}

class DisclosurePanelController {
  constructor ($scope, $element, disclosurePanelDefaults, $rootScope, $log) {
    'ngInject';
    this._open = $scope.disclosurePanelController.isInitiallyOpen;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.fireEventOnOpen = $scope.disclosurePanelController.fireEventOnOpen;
    this.fireEventOnClose = $scope.disclosurePanelController.fireEventOnClose;
    this.openOnEvent = $scope.disclosurePanelController.openOnEvent;
    this.closeOnEvent = $scope.disclosurePanelController.closeOnEvent;
    this.$element = $element;
    this.disclosurePanelDefaults = disclosurePanelDefaults;
    this._init();
    this.$log = $log;
  }

  _init() {
    let isOpenWatcher = () => {
      this.updateClass(this.$element);
    }

    let isDisabledWatcher = () => {
      this.updateDisabledClass(this.$element);
    }

    let closeOnEventRegistration;
    let openOnEventRegistration;

    let onDestroy = () => {
      this.removeIsOpenWatcher();
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
    this.removeIsOpenWatcher = this.$scope.$watch('disclosurePanelController.isOpen', isOpenWatcher);
    this.removeIsDisabledWatcher = this.$scope.$watch('disclosurePanelController.isDisabled', isDisabledWatcher);
    this.$scope.$on('$destroy', onDestroy);
  }

  get isDisabled() {
    return this.$scope.disclosurePanelController.disabled;
  }

  set isDisabled(isDisabled) {
    this.$scope.disclosurePanelController.disabled = isDisabled;
  }

  get isOpen() {
    return this._open;
  }

  set isOpen(newIsOpen) {
    if (this.isDisabled)
      return;
    this._open = newIsOpen;

    if (this.fireEventOnOpen && newIsOpen) {
      this.$rootScope.$emit(this.fireEventOnOpen);
    }

    if (this.fireEventOnClose && !newIsOpen) {
      this.$rootScope.$emit(this.fireEventOnClose);
    }

    if (this.$scope.disclosurePanelGroup) {
      this.$scope.disclosurePanelGroup.registerChange(this);
    }
  }

  updateDisabledClass(elem) {
    if (this.isDisabled) {
      elem.addClass(this.disclosurePanelDefaults.disabledClass);
    }
    else {
      elem.removeClass(this.disclosurePanelDefaults.disabledClass);
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
