export function DisclosurePanelRevealOnDisabledDirective(disclosurePanelRevealLinkGeneratorService) {
  'ngInject';

  let directive = {
    restrict: 'A',
    link: disclosurePanelRevealLinkGeneratorService.generateLinkFunction('disclosurePanelCtrl.isDisabled', function(value) { return value; }, 'dpRevealOnDisabled'),
    scope: true,
    transclude: 'element',
    require: '^dpContainer'
  };

  return directive;
}
