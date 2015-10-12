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
    scope: true,
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
  }
 
  register(disclosurePanelCtrl) {
    this._disclosurePanelContainers.push(disclosurePanelCtrl);

    return () => {
      this._disclosurePanelContainers.splice(this._disclosurePanelContainers.length - 1, 1);
    }
  }
  
 
  get isAllOpen() {
    return this._numberOfOpenPanels ==  this._disclosurePanelContainers.length;
  }

  get _numberOfOpenPanels() {
    return this._disclosurePanelContainers.filter((item) => { return item.isOpen }).length;
  }
}
