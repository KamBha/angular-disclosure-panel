/* global inject */
/* global ModuleBuilder */
describe('directive disclosure panel with defaults', function() {
  let $compile;
  let $rootScope;
  let disclosurePanelDefaults;
  
  beforeEach(function start() {
    ModuleBuilder.forModules('disclosurePanel').build()
    inject(function(_$compile_, _$rootScope_, _disclosurePanelDefaults_) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      disclosurePanelDefaults = _disclosurePanelDefaults_;
    });
  });


  it('should set class to default open class when attribute specifies it is currently open', inject(function() {
    var element = $compile(`<div dp-container is-initially-open="true"></div>`)($rootScope);
    $rootScope.$apply();

    expect(element.hasClass('dp-open')).toBe(true);
    expect(element.hasClass('dp-close')).toBe(false);
  }));

  it('should set class to disclosure panel default when attribute specifies it is currently open', inject(function() {
    disclosurePanelDefaults.openClass = 'newOpen';
    var element = $compile(`<div dp-container is-initially-open="true"></div>`)($rootScope);
    $rootScope.$apply();

    expect(element.hasClass('newOpen')).toBe(true);
    expect(element.hasClass('dp-close')).toBe(false);
  }));

  it('should set class to default closed when attribute specified it is currently closed', inject(function() {
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen"></div>`)($rootScope);
    $rootScope.$apply();

    expect(element.hasClass('dp-open')).toBe(false);
    expect(element.hasClass('dp-close')).toBe(true);
  }));
  
  it('should set class to disclosure panel default when attribute specified it is currently closed', inject(function() {
    disclosurePanelDefaults.closeClass = 'newClose';
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen"></div>`)($rootScope);
    $rootScope.$apply();

    expect(element.hasClass('dp-open')).toBe(false);
    expect(element.hasClass('newClose')).toBe(true);
  }));
  
  it('should not change class when is initially open is changed', inject(function() {
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen"></div>`)($rootScope);
    
    $rootScope.$apply();
    $rootScope.isInitiallyOpen = true;
    
    expect(element.hasClass('dp-open')).toBe(false);
    expect(element.hasClass('dp-close')).toBe(true);
  }));
  
  it('should change class when toggle is called (with default)', inject(function() {
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen"></div>`)($rootScope);
    $rootScope.$apply();
    element.controller('dpContainer').toggle();
    
    expect(element.hasClass('dp-open')).toBe(true);
    expect(element.hasClass('dp-close')).toBe(false);
  }));
  
  it('should change class when toggle is called (with new values)', inject(function() {
    $rootScope.isInitiallyOpen = false;
    disclosurePanelDefaults.openClass = 'newOpen';
    disclosurePanelDefaults.closeClass = 'newClose';
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen"></div>`)($rootScope);
    $rootScope.$apply();
    element.controller('dpContainer').toggle();
    
    expect(element.hasClass('newOpen')).toBe(true);
    expect(element.hasClass('newClose')).toBe(false);
  }));
});
