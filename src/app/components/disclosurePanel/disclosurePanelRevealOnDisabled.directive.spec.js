/* global inject */
/* global ModuleBuilder */
describe('directive disclosure reveal on disabled', function() {
  let $compile;
  let $rootScope;
  
    beforeEach(angular.mock.module('disclosurePanel'));

  beforeEach(function() {
    angular.mock.module(function() {
    });
  });
  beforeEach(inject(function(_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  
  it('should reveal on disabled panel when initially disabled', inject(function() {
    $rootScope.isInitiallyDisabled = true;
    var element = $compile(`<div dp-container disabled="isInitiallyDisabled">
                              <p class="toggler" dp-toggler>Toggle</p>
                              <header dp-reveal-on-disabled>Howdy</header>
                           </div>`)($rootScope);
    $rootScope.$apply();

    expect(element.find('header').length).toBe(1);
  }));
  
  it('should not reveal on disabled panel when initially enabled', inject(function() {
    $rootScope.isInitiallyDisabled = false;
    var element = $compile(`<div dp-container disabled="isInitiallyDisabled">
                              <p class="toggler" dp-toggler>Toggle</p>
                              <header dp-reveal-on-disabled>Howdy</header>
                           </div>`)($rootScope);
    $rootScope.$apply();

    expect(element.find('header').length).toBe(0);
  }));

  it('should reveal on disabled panel when toggled disabled', inject(function() {
    $rootScope.isInitiallyDisabled = false;
    var element = $compile(`<div dp-container disabled="isInitiallyDisabled">
                              <p class="toggler" dp-toggler>Toggle</p>
                              <header dp-reveal-on-disabled>Howdy</header>
                           </div>`)($rootScope);
    $rootScope.$apply();
    expect(element.find('header').length).toBe(0);
    $rootScope.isInitiallyDisabled = true;
    $rootScope.$apply();

    expect(element.find('header').length).toBe(1);
  }));
  
  it('should not reveal on close panel when toggled open', inject(function() {
    $rootScope.isInitiallyDisabled = true;
    var element = $compile(`<div dp-container disabled="isInitiallyDisabled">
                              <p class="toggler" dp-toggler>Toggle</p>
                              <header dp-reveal-on-disabled>Howdy</header>
                           </div>`)($rootScope);
    $rootScope.$apply();                        
    expect(element.find('header').length).toBe(1);
    
    $rootScope.isInitiallyDisabled = false;
    $rootScope.$apply();
    expect(element.find('header').length).toBe(0);
  }));
});
