/* global */
import { DisclosurePanelContainerDirective } from '../app/components/disclosurePanel/disclosurePanelContainer.directive';
import { DisclosurePanelTogglerDirective } from '../app/components/disclosurePanel/disclosurePanelToggler.directive';
import { DisclosurePanelRevealOnOpenDirective } from '../app/components/disclosurePanel/disclosurePanelRevealOnOpen.directive';
import { DisclosurePanelRevealOnCloseDirective } from '../app/components/disclosurePanel/disclosurePanelRevealOnClose.directive';
import { DisclosurePanelRevealOnDisabledDirective } from '../app/components/disclosurePanel/disclosurePanelRevealOnDisabled.directive';
import { DisclosurePanelRevealOnEnabledDirective } from '../app/components/disclosurePanel/disclosurePanelRevealOnEnabled.directive';

import { disclosurePanelRevealLinkGeneratorService } from '../app/components/disclosurePanel/disclosurePanelRevealLinkGenerator.service';

import { DisclosurePanelDefaultsProvider } from '../app/components/disclosurePanel/disclosurePanelDefaults.provider';
import { DisclosurePanelOnOpenClassDirective } from '../app/components/disclosurePanel/disclosurePanelOnOpenClass.directive';


angular.module('disclosurePanel', ['ngAnimate'])
  .directive('dpContainer', DisclosurePanelContainerDirective)
  .directive('dpToggler', DisclosurePanelTogglerDirective)
  .directive('dpRevealOnOpen', DisclosurePanelRevealOnOpenDirective)
  .directive('dpRevealOnClose', DisclosurePanelRevealOnCloseDirective)
  .directive('dpRevealOnDisabled', DisclosurePanelRevealOnDisabledDirective)
  .directive('dpRevealOnEnabled', DisclosurePanelRevealOnEnabledDirective)
  .directive('dpOnOpenClass', DisclosurePanelOnOpenClassDirective)
  .provider('disclosurePanelDefaults', DisclosurePanelDefaultsProvider)
  .factory('disclosurePanelRevealLinkGeneratorService', disclosurePanelRevealLinkGeneratorService)
;
