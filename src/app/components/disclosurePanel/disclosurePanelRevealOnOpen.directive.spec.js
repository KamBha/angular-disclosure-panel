/* global inject */
/* global ModuleBuilder */
describe('directive disclosure reveal on open', function() {
  let $compile;
  let $rootScope;
  
  beforeEach(ModuleBuilder.forModules('disclosurePanel').build());

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should reveal on open panel when initially open', inject(function() {
    $rootScope.isInitiallyOpen = true;
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler>Toggle</p>
                              <header dp-reveal-on-open>Howdy</header>
                           </div>`)($rootScope);
    $rootScope.$apply();

    expect(element.find('header').length).toBe(1);
  }));
  
  it('should not reveal on open panel when initially closed', inject(function() {
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler>Toggle</p>
                              <header dp-reveal-on-open>Howdy</header>
                           </div>`)($rootScope);
    $rootScope.$apply();

    expect(element.find('header').length).toBe(0);
  }));

  it('should reveal on open panel when toggled open', inject(function() {
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler>Toggle</p>
                              <header dp-reveal-on-open>Howdy</header>
                           </div>`)($rootScope);
    var trigger = element.find('p');
    $rootScope.$apply();                        
    expect(element.find('header').length).toBe(0);
    trigger.triggerHandler('click');

    expect(element.find('header').length).toBe(1);
  }));
  
  it('should not reveal on open panel when toggled closed', inject(function() {
    $rootScope.isInitiallyOpen = true;
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler>Toggle</p>
                              <header dp-reveal-on-open>Howdy</header>
                           </div>`)($rootScope);
    var trigger = element.find('p');
    $rootScope.$apply();                        
    expect(element.find('header').length).toBe(1);
    trigger.triggerHandler('click');

    expect(element.find('header').length).toBe(0);
  }));
  
  it('should not reveal on open panel when other container is toggled closed', inject(function() {
    $rootScope.isInitiallyOpen = true;
    var element = $compile(`<div>
                              <div id ="dp1" dp-container is-initially-open="isInitiallyOpen">
                                  <p class="toggler" dp-toggler>Toggle</p>
                                  <header dp-reveal-on-open>Howdy</header>
                              </div>
                              <div id ="dp2" dp-container is-initially-open="isInitiallyOpen">
                                  <p class="toggler" dp-toggler>Toggle</p>
                                  <header dp-reveal-on-open>Howdy</header>
                              </div>
                           </div>`)($rootScope);
    var dp1 = element.find('#dp1');
    var dp2 = element.find('#dp2');
    var trigger = dp1.find('p');
    $rootScope.$apply();   
                     
    expect(dp1.find('header').length).toBe(1);
    expect(dp2.find('header').length).toBe(1);
    
    trigger.triggerHandler('click');
    
    dp1 = element.find('#dp1');
    dp2 = element.find('#dp2');

    expect(dp1.find('header').length).toBe(0);
    expect(dp2.find('header').length).toBe(1);
  }));
});
