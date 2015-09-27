  // I shamelessly copied this code from ngIf.
 export function disclosurePanelRevealLinkGeneratorService($animate) {
   'ngInject';
   return {
     generateLinkFunction: generateLinkFunction
   }  
     
   function generateLinkFunction(conditionToDisplay, directiveName) {
    return link;
    
    function link(scope, $element, $attr, disclosurePanelContainerCtrl, $transclude) {
      let block;
      let childScope;
      let previousElements;
      scope.disclosurePanelCtrl = disclosurePanelContainerCtrl;
      
      scope.$watch('disclosurePanelCtrl.isOpen', watchActionGeneratorForDisclosurePanelReveal(conditionToDisplay, 'dpRevealOnOpen'))
      
      function watchActionGeneratorForDisclosurePanelReveal() {
        return watchAction;
        
        function watchAction(value) {
          if (conditionToDisplay(value)) {
            if (!childScope) {
              $transclude(function(clone, newScope) {
                childScope = newScope;
                clone[clone.length++] = document.createComment(' end ' + directiveName);
                // Note: We only need the first/last node of the cloned nodes.
                // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                // by a directive with templateUrl when its template arrives.
                block = {
                  clone: clone
                };
                $animate.enter(clone, $element.parent(), $element);
              });
            }
          } 
          else {
            if (previousElements) {
              previousElements.remove();
              previousElements = null;
            }
            if (childScope) {
              childScope.$destroy();
              childScope = null;
            }
            if (block) {
              previousElements = getBlockNodes(block.clone);
              $animate.leave(previousElements).then(function() {
                previousElements = null;
              });
              block = null;
            }
          }
        }      
      }
    
      function getBlockNodes(nodes) {
        let node = nodes[0];
        let endNode = nodes[nodes.length - 1];
        let blockNodes;
  
        for (let i = 1; node !== endNode && (node = node.nextSibling); i++) {
          if (blockNodes || nodes[i] !== node) {
            if (!blockNodes) {
              blockNodes = [].slice.call(nodes, 0, i);
            }
            blockNodes.push(node);
          }
        }
  
        return blockNodes || nodes;
      }
    }
  }   
 }
