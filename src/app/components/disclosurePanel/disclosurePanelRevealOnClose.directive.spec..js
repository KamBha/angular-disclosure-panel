/* global inject */
/* global ModuleBuilder */
describe('directive disclosure reveal on close', function() {
  let $compile;
  let $rootScope;
  
  beforeEach(ModuleBuilder.forModules('disclosurePanel').build());

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should reveal on close panel when initially closed', inject(function() {
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler>Toggle</p>
                              <header dp-reveal-on-close>Howdy</header>
                           </div>`)($rootScope);
    $rootScope.$apply();

    expect(element.find('header').length).toBe(1);
  }));
  
  it('should not reveal on close panel when initially open', inject(function() {
    $rootScope.isInitiallyOpen = true;
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler>Toggle</p>
                              <header dp-reveal-on-close>Howdy</header>
                           </div>`)($rootScope);
    $rootScope.$apply();

    expect(element.find('header').length).toBe(0);
  }));

  it('should reveal on close panel when toggled close', inject(function() {
    $rootScope.isInitiallyOpen = true;
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler>Toggle</p>
                              <header dp-reveal-on-close>Howdy</header>
                           </div>`)($rootScope);
    var trigger = element.find('p');
    $rootScope.$apply();                        
    expect(element.find('header').length).toBe(0);
    trigger.triggerHandler('click');

    expect(element.find('header').length).toBe(1);
  }));
  
  it('should not reveal on close panel when toggled open', inject(function() {
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler>Toggle</p>
                              <header dp-reveal-on-close>Howdy</header>
                           </div>`)($rootScope);
    var trigger = element.find('p');
    $rootScope.$apply();                        
    expect(element.find('header').length).toBe(1);
    trigger.triggerHandler('click');

    expect(element.find('header').length).toBe(0);
  }));
});
