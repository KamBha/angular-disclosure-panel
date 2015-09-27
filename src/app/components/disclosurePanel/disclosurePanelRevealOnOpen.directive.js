export function DisclosurePanelRevealOnOpenDirective(disclosurePanelRevealLinkGeneratorService) {
  'ngInject';

  let directive = {
    restrict: 'A',
    link: disclosurePanelRevealLinkGeneratorService.generateLinkFunction(function(value) { return value; }, 'dpRevealOnOpen'),
    transclude: 'element',
    $$tlb: true,
    require: '^dpDisclosurePanelContainer'
  };

  return directive;
}
