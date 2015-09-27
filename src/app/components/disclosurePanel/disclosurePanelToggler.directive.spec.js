/* global inject */
/* global ModuleBuilder */
describe('directive disclosure panel toggler', function() {
  let $compile;
  let $rootScope;
  
  beforeEach(ModuleBuilder.forModules('disclosurePanel').build());

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should update class on disclosure panel', inject(function() {
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-disclosure-panel-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-disclosure-panel-toggler>Toggle</p>
                           </div>`)($rootScope);
    $rootScope.$apply();
    expect(element.hasClass('dp-open')).toBe(false);
    expect(element.hasClass('dp-close')).toBe(true);                           

    var trigger = element.find('p');
    trigger.triggerHandler('click');

    expect(element.hasClass('dp-open')).toBe(true);
    expect(element.hasClass('dp-close')).toBe(false);
  }));

  it('should update class on trigger', inject(function() {
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-disclosure-panel-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-disclosure-panel-toggler>Toggle</p>
                           </div>`)($rootScope);
    var trigger = element.find('p');
    $rootScope.$apply();
    expect(trigger.hasClass('dp-open')).toBe(false);
    expect(trigger.hasClass('dp-close')).toBe(true);                           

    trigger.triggerHandler('click');

    expect(trigger.hasClass('dp-open')).toBe(true);
    expect(trigger.hasClass('dp-close')).toBe(false);
  }));
});
