export function DisclosurePanelRevealOnCloseDirective(disclosurePanelRevealLinkGeneratorService) {
  'ngInject';

  let directive = {
    restrict: 'A',
    link: disclosurePanelRevealLinkGeneratorService.generateLinkFunction(function(value) { return !value; }, 'dpRevealOnClose'),
    transclude: 'element',
    $$tlb: true,
    require: '^dpDisclosurePanelContainer'
  };

  return directive;
}
