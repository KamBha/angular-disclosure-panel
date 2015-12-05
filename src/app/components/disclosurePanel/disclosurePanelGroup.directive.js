/**
 * @ngdoc directive
 * @name dpGroup
 *
 * @description
 */
export function DisclosurePanelGroupDirective() {
  'ngInject';

  let directive = {
    restrict: 'A',
    scope: {
      dpType: "@"
    },
    controller: DisclosurePanelGroupController,
    bindToController: true,
    controllerAs: 'disclosurePanelGroupController'
  };

  return directive;
}

class DisclosurePanelGroupController {
  constructor ($scope, $element, disclosurePanelDefaults, $rootScope) {
    'ngInject';
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$element = $element;
    this.disclosurePanelDefaults = disclosurePanelDefaults;
    this._disclosurePanelContainers = [];
    this.type = $scope.disclosurePanelGroupController.dpType;
  }

  register(disclosurePanelCtrl) {
    this._disclosurePanelContainers.push(disclosurePanelCtrl);
    this.registerChange(disclosurePanelCtrl);

    return () => {
      this._disclosurePanelContainers.splice(this._disclosurePanelContainers.length - 1, 1);
    }
  }

  registerChange(disclosurePanelCtrl) {
    if (this.type !== 'accordion' || !disclosurePanelCtrl.isOpen) {
      return;
    }
    let length = this._disclosurePanelContainers.length;
    for (let idx = 0; idx < length; idx++) {
      var disclosurePanel = this._disclosurePanelContainers[idx];
      if (disclosurePanel !== disclosurePanelCtrl) {
        disclosurePanel.isOpen = false;
      }
    }
  }

  get isAllOpen() {
    return this._numberOfOpenPanels ==  this._disclosurePanelContainers.length;
  }

  get _numberOfOpenPanels() {
    return this._disclosurePanelContainers.filter((item) => { return item.isOpen }).length;
  }
}
