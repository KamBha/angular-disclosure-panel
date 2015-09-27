/* global inject */
/* global ModuleBuilder */
describe('directive disclosure panel', function() {
  let $compile;
  let $rootScope;
  
  beforeEach(ModuleBuilder.forModules('disclosurePanel').build());

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should set class to open when attribute specifies it is currently open', inject(function() {
    var element = $compile(`<div dp-disclosure-panel-container is-initially-open="true"></div>`)($rootScope);
    $rootScope.$apply();

    expect(element.hasClass('dp-open')).toBe(true);
    expect(element.hasClass('dp-close')).toBe(false);
  }));

  it('should set class to closed when attribute specified it is currently closed', inject(function() {
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-disclosure-panel-container is-initially-open="isInitiallyOpen"></div>`)($rootScope);
    $rootScope.$apply();

    expect(element.hasClass('dp-open')).toBe(false);
    expect(element.hasClass('dp-close')).toBe(true);
  }));
  
  it('should not change class when is initially open is changed', inject(function() {
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-disclosure-panel-container is-initially-open="isInitiallyOpen"></div>`)($rootScope);
    
    $rootScope.$apply();
    $rootScope.isInitiallyOpen = true;
    
    expect(element.hasClass('dp-open')).toBe(false);
    expect(element.hasClass('dp-close')).toBe(true);
  }));
  
  it('should change class when toggle is called', inject(function() {
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-disclosure-panel-container is-initially-open="isInitiallyOpen"></div>`)($rootScope);
    $rootScope.$apply();
    element.controller('dpDisclosurePanelContainer').toggle();
    
    expect(element.hasClass('dp-open')).toBe(true);
    expect(element.hasClass('dp-close')).toBe(false);
  }));
});
