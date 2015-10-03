/* global */
import { DisclosurePanelContainerDirective } from '../app/components/disclosurePanel/disclosurePanelContainer.directive';
import { DisclosurePanelTogglerDirective } from '../app/components/disclosurePanel/disclosurePanelToggler.directive';
import { DisclosurePanelRevealOnOpenDirective } from '../app/components/disclosurePanel/disclosurePanelRevealOnOpen.directive';
import { DisclosurePanelRevealOnCloseDirective } from '../app/components/disclosurePanel/disclosurePanelRevealOnClose.directive';

import { disclosurePanelRevealLinkGeneratorService } from '../app/components/disclosurePanel/disclosurePanelRevealLinkGenerator.service';

import { DisclosurePanelDefaultsProvider } from '../app/components/disclosurePanel/disclosurePanelDefaults.provider';

angular.module('disclosurePanel', ['ngAnimate'])
  .directive('dpContainer', DisclosurePanelContainerDirective)
  .directive('dpToggler', DisclosurePanelTogglerDirective)
  .directive('dpRevealOnOpen', DisclosurePanelRevealOnOpenDirective)
  .directive('dpRevealOnClose', DisclosurePanelRevealOnCloseDirective)
  .provider('disclosurePanelDefaults', DisclosurePanelDefaultsProvider)
  .factory('disclosurePanelRevealLinkGeneratorService', disclosurePanelRevealLinkGeneratorService)
;
