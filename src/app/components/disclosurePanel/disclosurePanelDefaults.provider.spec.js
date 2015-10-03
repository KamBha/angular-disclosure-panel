/* global inject */
/* global ModuleBuilder */
describe('provider disclosure panel defaults', function() {
  let provider;

  beforeEach(angular.mock.module('disclosurePanel'));

  beforeEach(function() {
    angular.mock.module(function(disclosurePanelDefaultsProvider) {
      provider = disclosurePanelDefaultsProvider;
    });
  });
  beforeEach(inject(function() {
  }));

  it('should replace close class when overridden', inject(function() {
    provider.overrideDefaults({ 'closeClass' : 'newClass' });
    
    let defaults = provider.$get();

    expect(defaults.openClass).toBe('dp-open');
    expect(defaults.closeClass).toBe('newClass');
  }));

  it('should replace open class when overridden', inject(function() {
    provider.overrideDefaults({ 'openClass' : 'newClass' });
    
    let defaults = provider.$get();

    expect(defaults.openClass).toBe('newClass');
    expect(defaults.closeClass).toBe('dp-close');
  }));
});
