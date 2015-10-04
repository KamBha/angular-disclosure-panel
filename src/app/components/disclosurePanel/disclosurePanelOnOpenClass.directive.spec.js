/* global inject */
/* global ModuleBuilder */
describe('directive disclosure panel on open class', function() {
  let $compile;
  let $rootScope;
  
  beforeEach(ModuleBuilder.forModules('disclosurePanel').build());

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should add class if initially open', inject(function() {
    $rootScope.isInitiallyOpen = true;
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p dp-on-open-class="openClass">Blah</p>
                           </div>`)($rootScope);
    $rootScope.$apply();
    expect(element.find('p').hasClass('openClass')).toBe(true);
  }));


  it('should not add class if initially not open', inject(function() {
    $rootScope.isInitiallyOpen = false;
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p dp-on-open-class="openClass">Blah</p>
                           </div>`)($rootScope);
    $rootScope.$apply();
    expect(element.find('p').hasClass('openClass')).toBe(false);
  }));

  it('should add class if initially closed but triggered open', inject(function() {
    $rootScope.isInitiallyOpen = false;
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <trigger class="toggler" dp-toggler>Toggle</trigger>
                              <p dp-on-open-class="openClass">Blah</p>
                           </div>`)($rootScope);
    $rootScope.$apply();
    expect(element.find('p').hasClass('openClass')).toBe(false);                 

    let trigger = element.find('trigger');
    trigger.triggerHandler('click');

    expect(element.find('p').hasClass('openClass')).toBe(true);
  }));

  it('should remove class if initially open triggered closed', inject(function() {
    $rootScope.isInitiallyOpen = true;
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <trigger class="toggler" dp-toggler>Toggle</trigger>
                              <p dp-on-open-class="openClass">Blah</p>
                           </div>`)($rootScope);
    $rootScope.$apply();
    expect(element.find('p').hasClass('openClass')).toBe(true);                 

    let trigger = element.find('trigger');
    trigger.triggerHandler('click');

    expect(element.find('p').hasClass('openClass')).toBe(false);
  }));
});
