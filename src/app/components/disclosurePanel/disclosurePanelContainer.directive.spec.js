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
      spyOn($rootScope, '$emit').and.callThrough();
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

  it('should register with group', inject(function() {
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-group>
                                <div dp-container is-initially-open="isInitiallyOpen"></div>
                            </div>`)($rootScope);
    $rootScope.$apply();

    var groupCtrl = element.controller('dpGroup');
    expect(groupCtrl._disclosurePanelContainers.length).toBe(1);
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


  it('should remove class disabled class when no longer disabled', inject(function() {
    $rootScope.isInitiallyOpen = false;
    $rootScope.disabled = true;
    disclosurePanelDefaults.openClass = 'newOpen';
    disclosurePanelDefaults.closeClass = 'newClose';
    disclosurePanelDefaults.disabledClass = 'disabledClass';
    var element = $compile(`<div dp-container disabled="true" is-initially-open="isInitiallyOpen"></div>`)($rootScope);
    expect(element.hasClass('disabledClass')).toBe(false);
    $rootScope.disabled = false;
    $rootScope.$apply();

    expect(element.hasClass('disabledClass')).toBe(true);
  }));

  it('should set class to disabled class when disabled', inject(function() {
    $rootScope.isInitiallyOpen = false;
    $rootScope.disabled = false;
    disclosurePanelDefaults.openClass = 'newOpen';
    disclosurePanelDefaults.closeClass = 'newClose';
    disclosurePanelDefaults.disabledClass = 'disabledClass';
    var element = $compile(`<div dp-container disabled="true" is-initially-open="isInitiallyOpen"></div>`)($rootScope);
    expect(element.hasClass('disabledClass')).toBe(false);
    $rootScope.disabled = true;
    $rootScope.$apply();

    expect(element.hasClass('disabledClass')).toBe(true);
  }));

  it('should set class to disabled class when disabled', inject(function() {
    $rootScope.isInitiallyOpen = false;
    $rootScope.disabled = true;
    disclosurePanelDefaults.openClass = 'newOpen';
    disclosurePanelDefaults.closeClass = 'newClose';
    disclosurePanelDefaults.disabledClass = 'disabledClass';
    var element = $compile(`<div dp-container disabled="true" is-initially-open="isInitiallyOpen"></div>`)($rootScope);
    $rootScope.$apply();

    expect(element.hasClass('disabledClass')).toBe(true);
  }));

  it('should ignore toggle when disabled', inject(function() {
    $rootScope.isInitiallyOpen = false;
    $rootScope.disabled = true;
    disclosurePanelDefaults.openClass = 'newOpen';
    disclosurePanelDefaults.closeClass = 'newClose';
    var element = $compile(`<div dp-container disabled="true" is-initially-open="isInitiallyOpen"></div>`)($rootScope);
    $rootScope.$apply();
    element.controller('dpContainer').toggle();

    expect(element.hasClass('newOpen')).toBe(false);
    expect(element.hasClass('newClose')).toBe(true);
  }));

  it('should fire event event when fireEventOnOpen is specified and panel toggled opened', inject(function() {
    $rootScope.isInitiallyOpen = false;
    disclosurePanelDefaults.openClass = 'newOpen';
    disclosurePanelDefaults.closeClass = 'newClose';
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen" fire-event-on-open="event">
                            </div>`)($rootScope);
    $rootScope.$apply();
    element.controller('dpContainer').toggle();

    expect($rootScope.$emit).toHaveBeenCalledWith('event');
  }));

  it('should fire event event when fireEventOnClose is specified and panel toggled closed', inject(function() {
    $rootScope.isInitiallyOpen = true;
    disclosurePanelDefaults.openClass = 'newOpen';
    disclosurePanelDefaults.closeClass = 'newClose';
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen" fire-event-on-close="event">
                            </div>`)($rootScope);
    $rootScope.$apply();
    element.controller('dpContainer').toggle();

    expect($rootScope.$emit).toHaveBeenCalledWith('event');
  }));

  it('should close when closeOnEvent fired', inject(function() {
    $rootScope.isInitiallyOpen = true;
    disclosurePanelDefaults.openClass = 'newOpen';
    disclosurePanelDefaults.closeClass = 'newClose';
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen" close-on-event="event">
                            </div>`)($rootScope);
    $rootScope.$apply();
    expect(element.hasClass('newOpen')).toBe(true);
    expect(element.hasClass('newClose')).toBe(false);
    $rootScope.$emit('event');
    $rootScope.$apply();

    expect(element.hasClass('newOpen')).toBe(false);
    expect(element.hasClass('newClose')).toBe(true);
  }));

  it('should open when openOnEvent fired', inject(function() {
    $rootScope.isInitiallyOpen = false;
    disclosurePanelDefaults.openClass = 'newOpen';
    disclosurePanelDefaults.closeClass = 'newClose';
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen" open-on-event="event">
                            </div>`)($rootScope);
    $rootScope.$apply();
    expect(element.hasClass('newOpen')).toBe(false);
    expect(element.hasClass('newClose')).toBe(true);
    $rootScope.$emit('event');
    $rootScope.$apply();

    expect(element.hasClass('newOpen')).toBe(true);
    expect(element.hasClass('newClose')).toBe(false);
  }));

  it('should ensure only one container is open when group type is accordion', inject(function() {
    $rootScope.isInitiallyOpen = false;
    var element = $compile(`<div dp-group dp-type="accordion">
                                <p dp-container is-initially-open="true"></p>
                                <aside dp-container is-initially-open="false"></aside>
                            </div>`)($rootScope);
    $rootScope.$apply();

    var firstController = element.find('p').controller('dpContainer');
    var secondController = element.find('aside').controller('dpContainer');

    expect(firstController.isOpen).toBeTruthy();
    expect(secondController.isOpen).toBeFalsy();
    secondController.isOpen = true;

    expect(firstController.isOpen).toBeFalsy();
    expect(secondController.isOpen).toBeTruthy();
  }));

  it('should fire event event when fireEventOnClose is specified and panel toggled closed', inject(function() {
    $rootScope.isInitiallyOpen = true;
    disclosurePanelDefaults.openClass = 'newOpen';
    disclosurePanelDefaults.closeClass = 'newClose';
    var element = $compile(`<div dp-container is-initially-open="isInitiallyOpen" fire-event-on-close="event">
                            </div>`)($rootScope);
    $rootScope.$apply();
    element.controller('dpContainer').toggle();

    expect($rootScope.$emit).toHaveBeenCalledWith('event');
  }));


  it('should change class only for toggled container', inject(function() {
    $rootScope.isInitiallyOpen = false;
    disclosurePanelDefaults.openClass = 'newOpen';
    disclosurePanelDefaults.closeClass = 'newClose';
    var element = $compile(`<div>
                              <div dp-container is-initially-open="isInitiallyOpen" id="dp1"></div>
                              <div dp-container is-initially-open="isInitiallyOpen" id="dp2"></div>
                            </div>`)($rootScope);
    var dp1 = element.find('#dp1');
    var dp2 = element.find('#dp2');
    $rootScope.$apply();
    expect(dp1.hasClass('newOpen')).toBe(false);
    expect(dp1.hasClass('newClose')).toBe(true);
    expect(dp2.hasClass('newOpen')).toBe(false);
    expect(dp2.hasClass('newClose')).toBe(true);
    dp1.controller('dpContainer').toggle();

    expect(dp1.hasClass('newOpen')).toBe(true);
    expect(dp1.hasClass('newClose')).toBe(false);
    expect(dp2.hasClass('newOpen')).toBe(false);
    expect(dp2.hasClass('newClose')).toBe(true);
  }));
});
