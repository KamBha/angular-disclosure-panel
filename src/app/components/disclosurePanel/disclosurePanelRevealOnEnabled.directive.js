export function DisclosurePanelRevealOnEnabledDirective(disclosurePanelRevealLinkGeneratorService) {
  'ngInject';

  let directive = {
    restrict: 'A',
    link: disclosurePanelRevealLinkGeneratorService.generateLinkFunction('disclosurePanelCtrl.isDisabled', function(value) { return !value; }, 'dpRevealOnEnabled'),
    scope: true,
    transclude: 'element',
    require: '^dpContainer'
  };

  return directive;
}
