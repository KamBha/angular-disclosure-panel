export function DisclosurePanelRevealOnOpenDirective(disclosurePanelRevealLinkGeneratorService) {
  'ngInject';

  let directive = {
    restrict: 'A',
    link: disclosurePanelRevealLinkGeneratorService.generateLinkFunction('disclosurePanelCtrl.isOpen', function(value) { return value; }, 'dpRevealOnOpen'),
    scope: true,
    transclude: 'element',
    require: '^dpContainer'
  };

  return directive;
}
