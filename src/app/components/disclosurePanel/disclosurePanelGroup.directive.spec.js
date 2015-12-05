/* global inject */
/* global ModuleBuilder */
describe('directive disclosure panel group', function() {
  let $compile;
  let $rootScope;

  beforeEach(function start() {
    ModuleBuilder.forModules('disclosurePanel').build()
    inject(function(_$compile_, _$rootScope_) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  });

  it('register should add container to directive', inject(function() {
    let element = $compile(`<div dp-group></div>`)($rootScope);
    $rootScope.$apply();
    let disclosurePanelCtrl = { isOpen: true };
    let controller = element.controller('dpGroup')
    controller.register(disclosurePanelCtrl);

    expect(controller._disclosurePanelContainers.length).toBe(1);
    expect(controller._disclosurePanelContainers[0]).toBe(disclosurePanelCtrl);
  }));

  it('register should return deregistration function', inject(function() {
    let element = $compile(`<div dp-group></div>`)($rootScope);
    $rootScope.$apply();
    let disclosurePanelCtrl = { isOpen: true };
    let controller = element.controller('dpGroup')
    let deregister = controller.register(disclosurePanelCtrl);

    expect(controller._disclosurePanelContainers.length).toBe(1);
    expect(controller._disclosurePanelContainers[0]).toBe(disclosurePanelCtrl);

    deregister();

    expect(controller._disclosurePanelContainers.length).toBe(0);
  }));

  it('register should ensure only one panel is open when type is accordion', inject(function() {
    let element = $compile(`<div dp-group dp-type="accordion"></div>`)($rootScope);
    $rootScope.$apply();
    let disclosurePanelCtrlOne = { isOpen: true };
    let disclosurePanelCtrlTwo = { isOpen: true };
    let controller = element.controller('dpGroup')
    controller.register(disclosurePanelCtrlOne);
    controller.register(disclosurePanelCtrlTwo);

    expect(disclosurePanelCtrlOne.isOpen).toBeFalsy();
    expect(disclosurePanelCtrlTwo.isOpen).toBeTruthy();
  }));

  it('allOpen should return true when all disclosure panels initially open', inject(function() {
    let element = $compile(`<div dp-group></div>`)($rootScope);
    $rootScope.$apply();
    let controller = element.controller('dpGroup')
    controller.register({ isOpen: true });
    controller.register({ isOpen: true });
    $rootScope.$apply();

    expect(controller.isAllOpen).toBe(true);
  }));

  it('allOpen should return false when all disclosure panels not initially open', inject(function() {
    let element = $compile(`<div dp-group></div>`)($rootScope);
    $rootScope.$apply();
    let controller = element.controller('dpGroup')
    controller.register({ isOpen: false });
    controller.register({ isOpen: false });
    $rootScope.$apply();

    expect(controller.isAllOpen).toBe(false);
  }));

  it('allOpen should return true when all disclosure panels becomes open', inject(function() {
    let element = $compile(`<div dp-group></div>`)($rootScope);
    $rootScope.$apply();
    let controller = element.controller('dpGroup')
    let initiallyClosed = { isOpen: false };

    controller.register({ isOpen: true });
    controller.register(initiallyClosed);
    expect(controller.isAllOpen).toBe(false);
    $rootScope.$apply();

    initiallyClosed.isOpen = true;
    $rootScope.$apply();
    expect(controller.isAllOpen).toBe(true);
  }));

  it('allOpen should return false when all disclosure panels becomes not open', inject(function() {
    let element = $compile(`<div dp-group></div>`)($rootScope);
    $rootScope.$apply();
    let controller = element.controller('dpGroup')
    let initiallyOpen = { isOpen: true };

    controller.register({ isOpen: true });
    controller.register(initiallyOpen);
    $rootScope.$apply();
    expect(controller.isAllOpen).toBe(true);

    initiallyOpen.isOpen = false;
    $rootScope.$apply();
    expect(controller.isAllOpen).toBe(false)
  }));

  it('registerChange on accoridon should close other dpContainers when the controller is registered as opened',
  inject(function() {
    let element = $compile(`<div dp-group dp-type="accordion">
                            </div>`)($rootScope);
    $rootScope.$apply();
    let controller = element.controller('dpGroup')
    let initiallyOpen = { isOpen: true };
    let initiallyClosed = { isOpen: false };
    controller.register(initiallyClosed);
    controller.register(initiallyOpen);
    $rootScope.$apply();
    initiallyClosed.isOpen = true;
    controller.registerChange(initiallyClosed);

    expect(initiallyOpen.isOpen).toBeFalsy();
    expect(initiallyClosed.isOpen).toBeTruthy();
  }));

  it('registerChange on not accoridon should not close other dpContainers when the controller is registered as opened',
  inject(function() {
    let element = $compile(`<div dp-group>
                            </div>`)($rootScope);
    $rootScope.$apply();
    let controller = element.controller('dpGroup')
    let initiallyOpen = { isOpen: true };
    let initiallyClosed = { isOpen: false };
    controller.register(initiallyClosed);
    controller.register(initiallyOpen);
    $rootScope.$apply();
    initiallyClosed.isOpen = true;
    controller.registerChange(initiallyClosed);

    expect(initiallyOpen.isOpen).toBeTruthy();
    expect(initiallyClosed.isOpen).toBeTruthy();
  }));

  it('registerChange on accordion should not change other dpContainers when controller is registered as closed',
  inject(function() {
    let element = $compile(`<div dp-group dp-type="accordion">
                            </div>`)($rootScope);
    $rootScope.$apply();
    let controller = element.controller('dpGroup')
    let initiallyOpen = { isOpen: true };
    let initiallyClosed = { isOpen: false };
    controller.register(initiallyClosed);
    controller.register(initiallyOpen);
    $rootScope.$apply();
    initiallyOpen.isOpen = false;
    controller.registerChange(initiallyOpen);

    expect(initiallyOpen.isOpen).toBeFalsy();
    expect(initiallyClosed.isOpen).toBeFalsy();
  }));
});
