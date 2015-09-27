/**
 * @license ngModuleIntrospector
 * (c) 2014 Emil van Galen. https://github.com/evangalen/ng-module-introspector
 * License: MIT
 */
(function() { 'use strict';

angular.module('ngModuleIntrospector', []);

/**
 * @typedef {(Function|Array.<(string|Function)>)} PossiblyAnnotatedFn
 */
/**
 * @typedef {({$get: Function|Array.<(string|Function)>}|Function|Array.<(string|Function)>)} RawProviderDeclaration
 */
/**
 * @typedef {({$get: Function|Array.<(string|Function)>}|Function)} StrippedProviderDeclaration
 */


function assertTruthy(value, message) {
    if (!value) {
        throw new Error(message);
    }
}


/**
 * @ngdoc type
 * @param {Array.<(string|Function|Object)>} modules
 * @param {boolean} [includeNgMock = false]
 * @constructor
 */
function ModuleIntrospector(modules, includeNgMock) {
    includeNgMock = includeNgMock || false;

    /**
     * @param {object} providerInstance
     * @param {string} methodName
     * @param {function(string, *)} afterMethodLogic
     */
    function afterProviderMethodExecution(providerInstance, methodName, afterMethodLogic) {
        return afterExecution(providerInstance, methodName, supportObject(afterMethodLogic));
    }

    /**
     * @param {function(string, *)} delegate
     * @returns {function((object|string), *=)}
     */
    function supportObject(delegate) {
        return function(key, value) {
            if (angular.isObject(key)) {
                angular.forEach(arguments[0], function(rawDeclaration, componentName) {
                    delegate(componentName, rawDeclaration);
                });
            } else {
                return delegate(key, value);
            }
        };
    }

    /**
     * @param {object} object
     * @param {string} methodName
     * @param {Function} afterMethodLogic
     */
    function afterExecution(object, methodName, afterMethodLogic) {
        var originalMethod = object[methodName];

        object[methodName] = function() {
            var result = originalMethod.apply(this, arguments);

            afterMethodLogic.apply(this, arguments);

            return result;
        };
    }

    /**
     * @param {PossiblyAnnotatedFn} possiblyAnnotatedFn
     * @returns {Function}
     */
    function stripAnnotations(possiblyAnnotatedFn) {
        if (angular.isFunction(possiblyAnnotatedFn)) {
            return possiblyAnnotatedFn;
        } else {
            return possiblyAnnotatedFn[possiblyAnnotatedFn.length - 1];
        }
    }

    /**
     * @param {PossiblyAnnotatedFn} possiblyAnnotatedFn
     * @returns {string[]}
     */
    function determineDependencies(possiblyAnnotatedFn) {
        return emptyInjector.annotate(possiblyAnnotatedFn);
    }

    /**
     * @param {string} providerName
     * @param {string} providerMethod
     * @param {string} componentName
     * @param {*} rawDeclaration
     * @param {*} strippedDeclaration
     * @param {string[]} injectedServices
     */
    function registerComponentDeclaration(
            providerName, providerMethod, componentName, rawDeclaration, strippedDeclaration, injectedServices) {
        if (forgetFutureRegisteredComponents) {
            return;
        }

        var allComponentDeclarationsOfProvider = componentDeclarationsPerComponentNamePerProviderName[providerName];
        if (!allComponentDeclarationsOfProvider) {
            allComponentDeclarationsOfProvider = {};
            componentDeclarationsPerComponentNamePerProviderName[providerName] = allComponentDeclarationsOfProvider;
        }

        var componentDeclarations = allComponentDeclarationsOfProvider[componentName];
        if (!componentDeclarations) {
            componentDeclarations = [];

            allComponentDeclarationsOfProvider[componentName] = componentDeclarations;
        }

        var registeredComponentDeclaration = {
            providerMethod: providerMethod,
            componentName: componentName,
            rawDeclaration: rawDeclaration,
            strippedDeclaration: strippedDeclaration,
            injectedServices: injectedServices,
            builtIn: processingBuiltInComponents
        };

        if (metadataPerProvider[providerName].overridesEarlierRegistrations) {
            componentDeclarations.length = 0;
        }

        componentDeclarations.push(registeredComponentDeclaration);
    }

    /**
     * @param {string} serviceName
     * @returns {boolean}
     */
    function existingConstantService(serviceName) {
        var serviceDeclarationsPerServiceName = componentDeclarationsPerComponentNamePerProviderName.$provide;
        if (!serviceDeclarationsPerServiceName) {
            return false;
        }

        var serviceDeclarations = serviceDeclarationsPerServiceName[serviceName];
        assertTruthy(!serviceDeclarations || serviceDeclarations.length <= 1,
                'Only one service declaration should exist for a service name: ' + serviceName);

        return !!serviceDeclarations && serviceDeclarations.length === 1 &&
                serviceDeclarations[0].providerMethod === 'constant';
    }

    /**
     * @param {string} providerName
     * @param {RawProviderDeclaration} rawDeclaration
     * @param {StrippedProviderDeclaration} strippedDeclaration
     * @param {string[]} injectedProviders
     */
    function registerProviderDeclaration(providerName, rawDeclaration, strippedDeclaration, injectedProviders) {
        if (forgetFutureRegisteredComponents) {
            return;
        }

        providerDeclarationPerProviderName[providerName] = {
                rawDeclaration: rawDeclaration,
                strippedDeclaration: strippedDeclaration,
                injectedProviders: injectedProviders,
                builtIn: processingBuiltInComponents
            };
    }

    function registerBuiltInFilters($FilterProvider) {
        var $provideCapturingFactoryInvocations = {
            factory: function(name, getFn) {
                var suffix = 'Filter';

                var endsWithFilterSuffix = name.indexOf(suffix, name.length - suffix.length) !== -1;
                assertTruthy(endsWithFilterSuffix, 'Unexpected registered factory: ' + name);

                var filterProviderRegistrationMethodName = metadataPerProvider.$filterProvider.providerMethods[0];
                var nameWithoutSuffix = name.substring(0, name.length - suffix.length);

                registerComponentDeclaration('$filterProvider', filterProviderRegistrationMethodName, nameWithoutSuffix, getFn,
                    stripAnnotations(getFn), determineDependencies(getFn));
            }
        };


        emptyInjector.instantiate($FilterProvider, {$provide: $provideCapturingFactoryInvocations});
    }


    /**
     * @type {Object.<
     *      Object.<
     *          Array.<{
     *              providerMethod: string,
     *              componentName: string,
     *              rawDeclaration: *,
     *              strippedDeclaration: *,
     *              injectedServices: string[],
     *              builtIn: boolean
     *          }>
     *      >
     *  >}
     */
    var componentDeclarationsPerComponentNamePerProviderName = {};

    /**
      * @type {Object.<{
      *     rawDeclaration: RawProviderDeclaration,
      *     strippedDeclaration: StrippedProviderDeclaration,
      *     injectedProviders: string[],
      *     builtIn: boolean
      *  }>}
      */
    var providerDeclarationPerProviderName = {};

    var metadataPerProvider = {
        $provide: {
            providerMethods: ['constant', 'value', 'service', 'factory', 'provider'],
            overridesEarlierRegistrations: true
        },
        $filterProvider: {
            providerMethods: ['register'],
            overridesEarlierRegistrations: true
        },
        $controllerProvider: {
            providerMethods: ['register'],
            overridesEarlierRegistrations: true
        },
        $compileProvider: {
            providerMethods: ['directive'],
            overridesEarlierRegistrations: false
        },
        $animateProvider: {
            providerMethods: ['register'],
            overridesEarlierRegistrations: true
        }
    };

    var emptyInjector = angular.injector([]);

    var providerInjector = null;

    var processingBuiltInComponents = false;

    var forgetFutureRegisteredComponents = false;

    /** @ngInject */
    var providerInjectorCapturingConfigFn = function ($injector) {
        providerInjector = $injector;
    };
    providerInjectorCapturingConfigFn.$inject = ["$injector"];

    /** @ngInject */
    var $provideMethodsHookConfigFn = function($provide) {

        var registerService = angular.bind(undefined, registerComponentDeclaration, '$provide');


        afterProviderMethodExecution($provide, 'constant', function(/** string */ name, value) {
            registerService('constant', name, value, value, []);
        });

        afterProviderMethodExecution($provide, 'value', function(/** string */ name, value) {
            if (!existingConstantService(name)) {
                registerService('value', name, value, value, []);
            }
        });

        afterProviderMethodExecution($provide, 'service', function(/** string */ name, /** PossiblyAnnotatedFn */ service) {
            if (!existingConstantService(name)) {
                registerService('service', name,
                    service, stripAnnotations(service), determineDependencies(service));
            }
        });

        afterProviderMethodExecution($provide, 'factory', function(/** string */ name, /** PossiblyAnnotatedFn */ getFn) {
            if (!existingConstantService(name)) {
                registerService('factory', name,
                    getFn, stripAnnotations(getFn), determineDependencies(getFn));
            }
        });

        afterProviderMethodExecution($provide, 'provider', function(/** string */ name, /** RawProviderDeclaration */ provider) {
            if (existingConstantService(name)) {
                return;
            }

            var providerName = name + 'Provider';

            var isProviderObject = angular.isObject(provider) && !angular.isArray(provider);
            var strippedProviderDeclaration = !isProviderObject ? stripAnnotations(provider) : provider;
            var injectedProviders = !isProviderObject ? determineDependencies(provider) : [];
            registerProviderDeclaration(providerName, provider, strippedProviderDeclaration, injectedProviders);

            var providerInstance = providerInjector.get(providerName);

            registerService('provider', name, providerInstance.$get,
                    stripAnnotations(providerInstance.$get), determineDependencies(providerInstance.$get));

            if (name === '$filter') {
                registerBuiltInFilters(provider);
            }


            var providerMetadata = metadataPerProvider[providerName];
            var providerMethodsOfProvider = providerMetadata && providerMetadata.providerMethods;
            if (providerMethodsOfProvider) {
                angular.forEach(providerMethodsOfProvider, function(providerMethodOfProvider) {
                    afterProviderMethodExecution(providerInstance, providerMethodOfProvider, function(
                        /** string */ name, /** PossiblyAnnotatedFn */ rawDeclaration) {
                        registerComponentDeclaration(providerName, providerMethodOfProvider, name, rawDeclaration,
                            stripAnnotations(rawDeclaration), determineDependencies(rawDeclaration));
                    });
                });
            }
        });
    };
    $provideMethodsHookConfigFn.$inject = ["$provide"];

    /**
     * @param {boolean} b
     * @returns {function()}
     */
    var setProcessingBuiltInComponentsTo = function(b) {
        return function() {
            processingBuiltInComponents = b;
        };
    };

    /**
     * @param {boolean} b
     * @returns {function()}
     */
    var setForgetFutureRegisteredComponents = function(b) {
        return function() {
            forgetFutureRegisteredComponents = b;
        };
    };

    var injectorModules = [];

    angular.forEach(modules, function(currentModule) {
        if (angular.isObject(currentModule) && !angular.isArray(currentModule)) {
            injectorModules.push(function($provide) {
                angular.forEach(currentModule, function(value, key) {
                    $provide.value(key, value);
                });
            });
        } else {
            injectorModules.push(currentModule);
        }
    });

    // create an injector that first captures the "providerInjector", then hooks the $provide methods,
    // after that loads the ng module and finally loads the modules of moduleNames.
    angular.injector([providerInjectorCapturingConfigFn, $provideMethodsHookConfigFn,
            setProcessingBuiltInComponentsTo(true), 'ng',
            setForgetFutureRegisteredComponents(!includeNgMock), 'ngMock', setForgetFutureRegisteredComponents(false),
            setProcessingBuiltInComponentsTo(false)].concat(injectorModules));


    /**
     * @param {string} providerName
     * @param {string} componentName
     * @returns {Array.<{
     *      providerMethod: string,
     *      componentName: string,
     *      rawDeclaration: *,
     *      strippedDeclaration: *,
     *      injectedServices: string[],
     *      builtIn: boolean
     *  }>}
     */
    this.getProviderComponentDeclarations = function(providerName, componentName) {
        var allComponentDeclarationsForProvider = componentDeclarationsPerComponentNamePerProviderName[providerName];

        var result = allComponentDeclarationsForProvider && allComponentDeclarationsForProvider[componentName];
        if (!result) {
            throw 'Could not find registered component "' + componentName + '" for provider: ' + providerName;
        }

        return result;
    };


    /**
     * @param {string} providerName
     * @returns {{
     *      rawDeclaration: RawProviderDeclaration,
     *      strippedDeclaration: StrippedProviderDeclaration,
     *      injectedProviders: string[],
     *      builtIn: boolean
     *  }}
     */
    this.getProviderDeclaration = function(providerName) {
        var result = providerDeclarationPerProviderName[providerName];
        if (!result) {
            throw 'Could not find provider: ' + providerName;
        }

        //noinspection JSValidateTypes
        return result; //TODO: investigate with WebStorm complains about incompatible types
    };

    /**
     * @returns {string[]}
     */
    this.getBuiltInProviderNames = function() {
        var result = [];

        for (var providerName in providerDeclarationPerProviderName) {
            if (providerDeclarationPerProviderName.hasOwnProperty(providerName) &&
                    providerDeclarationPerProviderName[providerName].builtIn) {
                result.push(providerName);
            }
        }

        return result;
    };

    /**
     * @param {string} providerName
     * @returns {?{providerMethods: string[], overridesEarlierRegistrations: boolean}}
     */
    this.getProviderMetadata = function(providerName) {
        return metadataPerProvider[providerName] || null;
    };
}


angular.module('ngModuleIntrospector')
    .factory('moduleIntrospector', function() {

        /**
         * @ngdoc service
         * @name moduleIntrospector
         * @param {Array.<(string|Function|Object)>} modules
         * @params {boolean} includeNgMock
         * @returns {ModuleIntrospector}
         * @function
         */
        return function moduleIntrospector(modules, includeNgMock) {
            return new ModuleIntrospector(modules, includeNgMock);
        };
    });

}());