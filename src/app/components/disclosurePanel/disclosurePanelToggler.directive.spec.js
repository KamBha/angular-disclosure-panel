/* global inject */
/* global ModuleBuilder */
describe('directive disclosure panel toggler', function() {
  let $compile;
  let $rootScope;
  let disclosurePanelDefaults;
  
  beforeEach(ModuleBuilder.forModules('disclosurePanel').build());

  beforeEach(inject(function(_$compile_, _$rootScope_, _disclosurePanelDefaults_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    disclosurePanelDefaults = _disclosurePanelDefaults_;
  }));

  it('should update class on disclosure panel (default value)', inject(function() {
    $rootScope.isInitiallyOpen = false;
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler>Toggle</p>
                           </div>`)($rootScope);
    $rootScope.$apply();
    expect(element.hasClass('dp-open')).toBe(false);
    expect(element.hasClass('dp-close')).toBe(true);                           

    let trigger = element.find('p');
    trigger.triggerHandler('click');

    expect(element.hasClass('dp-open')).toBe(true);
    expect(element.hasClass('dp-close')).toBe(false);
  }));

  it('should update class on disclosure panel (updated value)', inject(function() {
    disclosurePanelDefaults.openClass = 'newOpen';
    disclosurePanelDefaults.closeClass = 'newClose';
    $rootScope.isInitiallyOpen = false;
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler>Toggle</p>
                           </div>`)($rootScope);
    $rootScope.$apply();
    expect(element.hasClass('newOpen')).toBe(false);
    expect(element.hasClass('newClose')).toBe(true);                           

    let trigger = element.find('p');
    trigger.triggerHandler('click');

    expect(element.hasClass('newOpen')).toBe(true);
    expect(element.hasClass('newClose')).toBe(false);
  }));

  it('should update class on trigger (default values)', inject(function() {
    $rootScope.isInitiallyOpen = false;
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler>Toggle</p>
                           </div>`)($rootScope);
    let trigger = element.find('p');
    $rootScope.$apply();
    expect(trigger.hasClass('dp-open')).toBe(false);
    expect(trigger.hasClass('dp-close')).toBe(true);                           

    trigger.triggerHandler('click');

    expect(trigger.hasClass('dp-open')).toBe(true);
    expect(trigger.hasClass('dp-close')).toBe(false);
  }));
  
  it('should not react to click event if disabled', inject(function() {
    $rootScope.isInitiallyOpen = false;
    $rootScope.isDisabled = true;
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler dp-toggler-disabled="isDisabled">Toggle</p>
                           </div>`)($rootScope);
    let trigger = element.find('p');
    $rootScope.$apply();
    expect(trigger.hasClass('dp-open')).toBe(false);
    expect(trigger.hasClass('dp-close')).toBe(true);                           

    trigger.triggerHandler('click');

    expect(trigger.hasClass('dp-open')).toBe(false);
    expect(trigger.hasClass('dp-close')).toBe(true);
  }));

  it('should have disabled class if disabled', inject(function() {
    $rootScope.isInitiallyOpen = false;
    $rootScope.isDisabled = true;
    disclosurePanelDefaults.disabledClass = 'disabledClass';
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler dp-toggler-disabled="isDisabled">Toggle</p>
                           </div>`)($rootScope);
    let trigger = element.find('p');
    $rootScope.$apply();

    expect(trigger.hasClass('disabledClass')).toBe(true);
  }));
  
  it('should not have disabled class if not disabled', inject(function() {
    $rootScope.isInitiallyOpen = false;
    $rootScope.isDisabled = false;
    disclosurePanelDefaults.disabledClass = 'disabledClass';
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler dp-toggler-disabled="isDisabled">Toggle</p>
                           </div>`)($rootScope);
    let trigger = element.find('p');
    $rootScope.$apply();

    expect(trigger.hasClass('disabledClass')).toBe(false);
  }));

  it('should remove disabled class if no longer disabled', inject(function() {
    $rootScope.isInitiallyOpen = false;
    $rootScope.isDisabled = true;
    disclosurePanelDefaults.disabledClass = 'disabledClass';
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler dp-toggler-disabled="isDisabled">Toggle</p>
                           </div>`)($rootScope);
    let trigger = element.find('p');
    $rootScope.$apply();
    expect(trigger.hasClass('disabledClass')).toBe(true);            
    
    $rootScope.isDisabled = false;
    $rootScope.$apply();

    expect(trigger.hasClass('disabledClass')).toBe(false);        
  }));
  
  it('should add disabled class if disabled', inject(function() {
    $rootScope.isInitiallyOpen = false;
    $rootScope.isDisabled = false;
    disclosurePanelDefaults.disabledClass = 'disabledClass';
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler dp-toggler-disabled="isDisabled">Toggle</p>
                           </div>`)($rootScope);
    let trigger = element.find('p');
    $rootScope.$apply();
    expect(trigger.hasClass('disabledClass')).toBe(false);            

    $rootScope.isDisabled = true;
    $rootScope.$apply();

    expect(trigger.hasClass('disabledClass')).toBe(true);        
  }));
  
  it('should accept clicks when react to click event is no longer disabled', inject(function() {
    $rootScope.isInitiallyOpen = false;
    $rootScope.isDisabled = true;
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler dp-toggler-disabled="isDisabled">Toggle</p>
                           </div>`)($rootScope);
    let trigger = element.find('p');
    $rootScope.$apply();
    expect(trigger.hasClass('dp-open')).toBe(false);
    expect(trigger.hasClass('dp-close')).toBe(true);                  
    
    trigger.triggerHandler('click');

    expect(trigger.hasClass('dp-open')).toBe(false);
    expect(trigger.hasClass('dp-close')).toBe(true);
    
    $rootScope.isDisabled = false;
    $rootScope.$apply();
    
    trigger.triggerHandler('click');

    expect(trigger.hasClass('dp-open')).toBe(true);
    expect(trigger.hasClass('dp-close')).toBe(false);         
  }));
  
  it('should no longer accept clicks when react to click event is switched to disabled', inject(function() {
    $rootScope.isInitiallyOpen = false;
    $rootScope.isDisabled = false;
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler dp-toggler-disabled="isDisabled">Toggle</p>
                           </div>`)($rootScope);
    let trigger = element.find('p');
    $rootScope.$apply();
    expect(trigger.hasClass('dp-open')).toBe(false);
    expect(trigger.hasClass('dp-close')).toBe(true);                  

    trigger.triggerHandler('click');

    expect(trigger.hasClass('dp-open')).toBe(true);
    expect(trigger.hasClass('dp-close')).toBe(false);
    
    $rootScope.isDisabled = true;
    $rootScope.$apply();
    
    trigger.triggerHandler('click');

    expect(trigger.hasClass('dp-open')).toBe(true);
    expect(trigger.hasClass('dp-close')).toBe(false);         
  }));
  
  it('should update class on trigger (new values)', inject(function() {
    disclosurePanelDefaults.openClass = 'newOpen';
    disclosurePanelDefaults.closeClass = 'newClose';
    $rootScope.isInitiallyOpen = false;
    let element = $compile(`<div dp-container is-initially-open="isInitiallyOpen">
                              <p class="toggler" dp-toggler>Toggle</p>
                           </div>`)($rootScope);
    let trigger = element.find('p');
    $rootScope.$apply();
    expect(trigger.hasClass('newOpen')).toBe(false);
    expect(trigger.hasClass('newClose')).toBe(true);                           

    trigger.triggerHandler('click');

    expect(trigger.hasClass('newOpen')).toBe(true);
    expect(trigger.hasClass('newClose')).toBe(false);
  }));
});
