export function DisclosurePanelRevealOnCloseDirective(disclosurePanelRevealLinkGeneratorService) {
  'ngInject';

  let directive = {
    restrict: 'A',
    link: disclosurePanelRevealLinkGeneratorService.generateLinkFunction(function(value) { return !value; }, 'dpRevealOnClose'),
    scope: true,
    transclude: 'element',
    require: '^dpContainer'
  };

  return directive;
}
