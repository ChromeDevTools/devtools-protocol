

## Roll protocol to r587766
###### _2018-08-30 14:16:04_ | Diff: [41333c5...e191211](https://github.com/ChromeDevTools/devtools-protocol/compare/41333c5...e191211)
#### `Console`: modified event
* [`Console.messageAdded`](https://chromedevtools.github.io/devtools-protocol/tot/Console/#event-messageAdded) - The parameters's `type` _added_. 
#### `Debugger`: modified commands
* [`Debugger.continueToLocation`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-continueToLocation) - The parameters's `type` _added_. 
* [`Debugger.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-enable) - The return value's `type` _added_. 
* [`Debugger.evaluateOnCallFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-evaluateOnCallFrame) - The parameters's `type` _added_ (2 times). The return value's `type` _added_ (2 times). 
* [`Debugger.getPossibleBreakpoints`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getPossibleBreakpoints) - The parameters's `type` _added_ (2 times). The `0` in the return value had `type` _added_. 
* [`Debugger.getScriptSource`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getScriptSource) - The parameters's `type` _added_. 
* [`Debugger.getStackTrace`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getStackTrace) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`Debugger.pauseOnAsyncCall`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-pauseOnAsyncCall) - The parameters's `type` _added_. 
* [`Debugger.removeBreakpoint`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-removeBreakpoint) - The parameters's `type` _added_. 
* [`Debugger.restartFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-restartFrame) - The parameters's `type` _added_. The `0` in the return value had `type` _added_. The return value's `type` _added_ (2 times). 
* [`Debugger.searchInContent`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-searchInContent) - The parameters's `type` _added_. The `0` in the return value had `type` _added_. 
* [`Debugger.setBlackboxedRanges`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setBlackboxedRanges) - The parameters's `type` _added_. The `1` in the parameters had `type` _added_. 
* [`Debugger.setBreakpoint`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setBreakpoint) - The parameters's `type` _added_. The return value's `type` _added_ (2 times). 
* [`Debugger.setBreakpointByUrl`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setBreakpointByUrl) - The return value's `type` _added_. The `1` in the return value had `type` _added_. 
* [`Debugger.setBreakpointOnFunctionCall`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setBreakpointOnFunctionCall) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`Debugger.setReturnValue`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setReturnValue) - The parameters's `type` _added_. 
* [`Debugger.setScriptSource`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setScriptSource) - The parameters's `type` _added_. The `0` in the return value had `type` _added_. The return value's `type` _added_ (3 times). 
* [`Debugger.setVariableValue`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setVariableValue) - The parameters's `type` _added_ (2 times). 
#### `Debugger`: modified events
* [`Debugger.breakpointResolved`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-breakpointResolved) - The parameters's `type` _added_ (2 times). 
* [`Debugger.paused`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-paused) - The `0` in the parameters had `type` _added_. The parameters's `type` _added_ (3 times). 
* [`Debugger.scriptFailedToParse`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-scriptFailedToParse) - The parameters's `type` _added_ (3 times). 
* [`Debugger.scriptParsed`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-scriptParsed) - The parameters's `type` _added_ (3 times). 
#### `Debugger`: modified types
* [`Debugger.Location`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-Location) - The properties's `type` _added_. 
* [`Debugger.CallFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-CallFrame) - The properties's `type` _added_ (5 times). The `5` in the properties had `type` _added_. 
* [`Debugger.Scope`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-Scope) - The properties's `type` _added_ (3 times). 
* [`Debugger.BreakLocation`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-BreakLocation) - The properties's `type` _added_. 
#### `HeapProfiler`: modified commands
* [`HeapProfiler.addInspectedHeapObject`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#method-addInspectedHeapObject) - The parameters's `type` _added_. 
* [`HeapProfiler.getHeapObjectId`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#method-getHeapObjectId) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`HeapProfiler.getObjectByHeapObjectId`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#method-getObjectByHeapObjectId) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`HeapProfiler.getSamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#method-getSamplingProfile) - The return value's `type` _added_. 
* [`HeapProfiler.stopSampling`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#method-stopSampling) - The return value's `type` _added_. 
#### `HeapProfiler`: modified types
* [`HeapProfiler.SamplingHeapProfileNode`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#type-SamplingHeapProfileNode) - The properties's `type` _added_. The `2` in the properties had `type` _added_. 
* [`HeapProfiler.SamplingHeapProfile`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#type-SamplingHeapProfile) - The properties's `type` _added_. 
#### `Profiler`: modified commands
* [`Profiler.getBestEffortCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-getBestEffortCoverage) - The `0` in the return value had `type` _added_. 
* [`Profiler.stop`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-stop) - The return value's `type` _added_. 
* [`Profiler.takePreciseCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-takePreciseCoverage) - The `0` in the return value had `type` _added_. 
* [`Profiler.takeTypeProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-takeTypeProfile) - The `0` in the return value had `type` _added_. 
#### `Profiler`: modified events
* [`Profiler.consoleProfileFinished`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#event-consoleProfileFinished) - The parameters's `type` _added_ (2 times). 
* [`Profiler.consoleProfileStarted`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#event-consoleProfileStarted) - The parameters's `type` _added_. 
#### `Profiler`: modified types
* [`Profiler.ProfileNode`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-ProfileNode) - The properties's `type` _added_. The `5` in the properties had `type` _added_. 
* [`Profiler.Profile`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-Profile) - The `0` in the properties had `type` _added_. 
* [`Profiler.FunctionCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-FunctionCoverage) - The `1` in the properties had `type` _added_. 
* [`Profiler.ScriptCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-ScriptCoverage) - The properties's `type` _added_. The `2` in the properties had `type` _added_. 
* [`Profiler.TypeProfileEntry`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-TypeProfileEntry) - The `1` in the properties had `type` _added_. 
* [`Profiler.ScriptTypeProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-ScriptTypeProfile) - The properties's `type` _added_. The `2` in the properties had `type` _added_. 
#### `Runtime`: modified commands
* [`Runtime.awaitPromise`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-awaitPromise) - The parameters's `type` _added_. The return value's `type` _added_ (2 times). 
* [`Runtime.callFunctionOn`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-callFunctionOn) - The parameters's `type` _added_ (2 times). The `2` in the parameters had `type` _added_. The return value's `type` _added_ (2 times). 
* [`Runtime.compileScript`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-compileScript) - The parameters's `type` _added_. The return value's `type` _added_ (2 times). 
* [`Runtime.evaluate`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate) - The parameters's `type` _added_ (2 times). The return value's `type` _added_ (2 times). 
* [`Runtime.getProperties`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-getProperties) - The parameters's `type` _added_. The `0` in the return value had `type` _added_. The `1` in the return value had `type` _added_. The return value's `type` _added_. 
* [`Runtime.globalLexicalScopeNames`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-globalLexicalScopeNames) - The parameters's `type` _added_. 
* [`Runtime.queryObjects`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-queryObjects) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`Runtime.releaseObject`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-releaseObject) - The parameters's `type` _added_. 
* [`Runtime.runScript`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-runScript) - The parameters's `type` _added_ (2 times). The return value's `type` _added_ (2 times). 
* [`Runtime.addBinding`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-addBinding) - The parameters's `type` _added_. 
#### `Runtime`: modified events
* [`Runtime.bindingCalled`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-bindingCalled) - The parameters's `type` _added_. 
* [`Runtime.consoleAPICalled`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-consoleAPICalled) - The `1` in the parameters had `type` _added_. The parameters's `type` _added_ (3 times). 
* [`Runtime.exceptionThrown`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-exceptionThrown) - The parameters's `type` _added_ (2 times). 
* [`Runtime.executionContextCreated`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-executionContextCreated) - The parameters's `type` _added_. 
* [`Runtime.executionContextDestroyed`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-executionContextDestroyed) - The parameters's `type` _added_. 
* [`Runtime.inspectRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-inspectRequested) - The parameters's `type` _added_. 
#### `Runtime`: modified types
* [`Runtime.RemoteObject`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-RemoteObject) - The properties's `type` _added_ (4 times). 
* [`Runtime.CustomPreview`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-CustomPreview) - The properties's `type` _added_ (3 times). 
* [`Runtime.ObjectPreview`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-ObjectPreview) - The `4` in the properties had `type` _added_. The `5` in the properties had `type` _added_. 
* [`Runtime.PropertyPreview`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-PropertyPreview) - The properties's `type` _added_. 
* [`Runtime.EntryPreview`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-EntryPreview) - The properties's `type` _added_ (2 times). 
* [`Runtime.PropertyDescriptor`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-PropertyDescriptor) - The properties's `type` _added_ (4 times). 
* [`Runtime.InternalPropertyDescriptor`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-InternalPropertyDescriptor) - The properties's `type` _added_. 
* [`Runtime.CallArgument`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-CallArgument) - The properties's `type` _added_ (2 times). 
* [`Runtime.ExecutionContextDescription`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-ExecutionContextDescription) - The properties's `type` _added_. 
* [`Runtime.ExceptionDetails`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-ExceptionDetails) - The properties's `type` _added_ (4 times). 
* [`Runtime.CallFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-CallFrame) - The properties's `type` _added_. 
* [`Runtime.StackTrace`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-StackTrace) - The `1` in the properties had `type` _added_. The properties's `type` _added_ (2 times). 
* [`Runtime.StackTraceId`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-StackTraceId) - The properties's `type` _added_. 
#### `Schema`: modified command
* [`Schema.getDomains`](https://chromedevtools.github.io/devtools-protocol/tot/Schema/#method-getDomains) - The `0` in the return value had `type` _added_. 
#### `Accessibility`: modified command
* [`Accessibility.getPartialAXTree`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#method-getPartialAXTree) - The parameters's `type` _added_ (3 times). The `0` in the return value had `type` _added_. 
#### `Accessibility`: modified types
* [`Accessibility.AXValueSource`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXValueSource) - The properties's `type` _added_ (5 times). 
* [`Accessibility.AXRelatedNode`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXRelatedNode) - The properties's `type` _added_. 
* [`Accessibility.AXProperty`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXProperty) - The properties's `type` _added_ (2 times). 
* [`Accessibility.AXValue`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXValue) - The properties's `type` _added_. The `2` in the properties had `type` _added_. The `3` in the properties had `type` _added_. 
* [`Accessibility.AXNode`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXNode) - The properties's `type` _added_ (6 times). The `2` in the properties had `type` _added_. The `7` in the properties had `type` _added_. The `8` in the properties had `type` _added_. 
#### `Animation`: modified command
* [`Animation.resolveAnimation`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#method-resolveAnimation) - The return value's `type` _added_. 
#### `Animation`: modified event
* [`Animation.animationStarted`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#event-animationStarted) - The parameters's `type` _added_. 
#### `Animation`: modified types
* [`Animation.Animation`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-Animation) - The properties's `type` _added_. 
* [`Animation.AnimationEffect`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-AnimationEffect) - The properties's `type` _added_ (2 times). 
* [`Animation.KeyframesRule`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-KeyframesRule) - The `1` in the properties had `type` _added_. 
#### `ApplicationCache`: modified commands
* [`ApplicationCache.getApplicationCacheForFrame`](https://chromedevtools.github.io/devtools-protocol/tot/ApplicationCache/#method-getApplicationCacheForFrame) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`ApplicationCache.getFramesWithManifests`](https://chromedevtools.github.io/devtools-protocol/tot/ApplicationCache/#method-getFramesWithManifests) - The `0` in the return value had `type` _added_. 
* [`ApplicationCache.getManifestForFrame`](https://chromedevtools.github.io/devtools-protocol/tot/ApplicationCache/#method-getManifestForFrame) - The parameters's `type` _added_. 
#### `ApplicationCache`: modified event
* [`ApplicationCache.applicationCacheStatusUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/ApplicationCache/#event-applicationCacheStatusUpdated) - The parameters's `type` _added_. 
#### `ApplicationCache`: modified types
* [`ApplicationCache.ApplicationCache`](https://chromedevtools.github.io/devtools-protocol/tot/ApplicationCache/#type-ApplicationCache) - The `4` in the properties had `type` _added_. 
* [`ApplicationCache.FrameWithManifest`](https://chromedevtools.github.io/devtools-protocol/tot/ApplicationCache/#type-FrameWithManifest) - The properties's `type` _added_. 
#### `Audits`: modified command
* [`Audits.getEncodedResponse`](https://chromedevtools.github.io/devtools-protocol/tot/Audits/#method-getEncodedResponse) - The parameters's `type` _added_. 
#### `Browser`: modified commands
* [`Browser.grantPermissions`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-grantPermissions) - The `1` in the parameters had `type` _added_. The parameters's `type` _added_. 
* [`Browser.resetPermissions`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-resetPermissions) - The parameters's `type` _added_. 
* [`Browser.getHistograms`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getHistograms) - The `0` in the return value had `type` _added_. 
* [`Browser.getHistogram`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getHistogram) - The return value's `type` _added_. 
* [`Browser.getWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowBounds) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`Browser.getWindowForTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowForTarget) - The parameters's `type` _added_. The return value's `type` _added_ (2 times). 
* [`Browser.setWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-setWindowBounds) - The parameters's `type` _added_ (2 times). 
#### `Browser`: modified types
* [`Browser.Bounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-Bounds) - The properties's `type` _added_. 
* [`Browser.Histogram`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-Histogram) - The `3` in the properties had `type` _added_. 
#### `CSS`: modified commands
* [`CSS.addRule`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-addRule) - The parameters's `type` _added_ (2 times). The return value's `type` _added_. 
* [`CSS.collectClassNames`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-collectClassNames) - The parameters's `type` _added_. 
* [`CSS.createStyleSheet`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-createStyleSheet) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`CSS.forcePseudoState`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-forcePseudoState) - The parameters's `type` _added_. 
* [`CSS.getBackgroundColors`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getBackgroundColors) - The parameters's `type` _added_. 
* [`CSS.getComputedStyleForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getComputedStyleForNode) - The parameters's `type` _added_. The `0` in the return value had `type` _added_. 
* [`CSS.getInlineStylesForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getInlineStylesForNode) - The parameters's `type` _added_. The return value's `type` _added_ (2 times). 
* [`CSS.getMatchedStylesForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getMatchedStylesForNode) - The parameters's `type` _added_. The return value's `type` _added_ (2 times). The `2` in the return value had `type` _added_. The `3` in the return value had `type` _added_. The `4` in the return value had `type` _added_. The `5` in the return value had `type` _added_. 
* [`CSS.getMediaQueries`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getMediaQueries) - The `0` in the return value had `type` _added_. 
* [`CSS.getPlatformFontsForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getPlatformFontsForNode) - The parameters's `type` _added_. The `0` in the return value had `type` _added_. 
* [`CSS.getStyleSheetText`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getStyleSheetText) - The parameters's `type` _added_. 
* [`CSS.setEffectivePropertyValueForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-setEffectivePropertyValueForNode) - The parameters's `type` _added_. 
* [`CSS.setKeyframeKey`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-setKeyframeKey) - The parameters's `type` _added_ (2 times). The return value's `type` _added_. 
* [`CSS.setMediaText`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-setMediaText) - The parameters's `type` _added_ (2 times). The return value's `type` _added_. 
* [`CSS.setRuleSelector`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-setRuleSelector) - The parameters's `type` _added_ (2 times). The return value's `type` _added_. 
* [`CSS.setStyleSheetText`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-setStyleSheetText) - The parameters's `type` _added_. 
* [`CSS.setStyleTexts`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-setStyleTexts) - The `0` in the parameters had `type` _added_. The `0` in the return value had `type` _added_. 
* [`CSS.stopRuleUsageTracking`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-stopRuleUsageTracking) - The `0` in the return value had `type` _added_. 
* [`CSS.takeCoverageDelta`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-takeCoverageDelta) - The `0` in the return value had `type` _added_. 
#### `CSS`: modified events
* [`CSS.fontsUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#event-fontsUpdated) - The parameters's `type` _added_. 
* [`CSS.styleSheetAdded`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#event-styleSheetAdded) - The parameters's `type` _added_. 
* [`CSS.styleSheetChanged`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#event-styleSheetChanged) - The parameters's `type` _added_. 
* [`CSS.styleSheetRemoved`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#event-styleSheetRemoved) - The parameters's `type` _added_. 
#### `CSS`: modified types
* [`CSS.PseudoElementMatches`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-PseudoElementMatches) - The properties's `type` _added_. The `1` in the properties had `type` _added_. 
* [`CSS.InheritedStyleEntry`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-InheritedStyleEntry) - The properties's `type` _added_. The `1` in the properties had `type` _added_. 
* [`CSS.RuleMatch`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-RuleMatch) - The properties's `type` _added_. 
* [`CSS.Value`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-Value) - The properties's `type` _added_. 
* [`CSS.SelectorList`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-SelectorList) - The `0` in the properties had `type` _added_. 
* [`CSS.CSSStyleSheetHeader`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSStyleSheetHeader) - The properties's `type` _added_ (4 times). 
* [`CSS.CSSRule`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSRule) - The properties's `type` _added_ (4 times). The `4` in the properties had `type` _added_. 
* [`CSS.RuleUsage`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-RuleUsage) - The properties's `type` _added_. 
* [`CSS.CSSStyle`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSStyle) - The properties's `type` _added_ (2 times). The `1` in the properties had `type` _added_. The `2` in the properties had `type` _added_. 
* [`CSS.CSSProperty`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSProperty) - The properties's `type` _added_. 
* [`CSS.CSSMedia`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSMedia) - The properties's `type` _added_ (2 times). The `5` in the properties had `type` _added_. 
* [`CSS.MediaQuery`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-MediaQuery) - The `0` in the properties had `type` _added_. 
* [`CSS.MediaQueryExpression`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-MediaQueryExpression) - The properties's `type` _added_. 
* [`CSS.CSSKeyframesRule`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSKeyframesRule) - The properties's `type` _added_. The `1` in the properties had `type` _added_. 
* [`CSS.CSSKeyframeRule`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSKeyframeRule) - The properties's `type` _added_ (4 times). 
* [`CSS.StyleDeclarationEdit`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-StyleDeclarationEdit) - The properties's `type` _added_ (2 times). 
#### `CacheStorage`: modified commands
* [`CacheStorage.deleteCache`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#method-deleteCache) - The parameters's `type` _added_. 
* [`CacheStorage.deleteEntry`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#method-deleteEntry) - The parameters's `type` _added_. 
* [`CacheStorage.requestCacheNames`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#method-requestCacheNames) - The `0` in the return value had `type` _added_. 
* [`CacheStorage.requestCachedResponse`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#method-requestCachedResponse) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`CacheStorage.requestEntries`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#method-requestEntries) - The parameters's `type` _added_. The `0` in the return value had `type` _added_. 
#### `CacheStorage`: modified types
* [`CacheStorage.DataEntry`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#type-DataEntry) - The `2` in the properties had `type` _added_. The `6` in the properties had `type` _added_. 
* [`CacheStorage.Cache`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#type-Cache) - The properties's `type` _added_. 
#### `DOM`: modified commands
* [`DOM.collectClassNamesFromSubtree`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-collectClassNamesFromSubtree) - The parameters's `type` _added_. 
* [`DOM.copyTo`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-copyTo) - The parameters's `type` _added_ (3 times). The return value's `type` _added_. 
* [`DOM.describeNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-describeNode) - The parameters's `type` _added_ (3 times). The return value's `type` _added_. 
* [`DOM.focus`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-focus) - The parameters's `type` _added_ (3 times). 
* [`DOM.getAttributes`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getAttributes) - The parameters's `type` _added_. 
* [`DOM.getBoxModel`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getBoxModel) - The parameters's `type` _added_ (3 times). The return value's `type` _added_. 
* [`DOM.getContentQuads`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getContentQuads) - The parameters's `type` _added_ (3 times). The `0` in the return value had `type` _added_. 
* [`DOM.getDocument`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getDocument) - The return value's `type` _added_. 
* [`DOM.getFlattenedDocument`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getFlattenedDocument) - The `0` in the return value had `type` _added_. 
* [`DOM.getNodeForLocation`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getNodeForLocation) - The return value's `type` _added_. 
* [`DOM.getOuterHTML`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getOuterHTML) - The parameters's `type` _added_ (3 times). 
* [`DOM.getRelayoutBoundary`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getRelayoutBoundary) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`DOM.getSearchResults`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getSearchResults) - The `0` in the return value had `type` _added_. 
* [`DOM.moveTo`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-moveTo) - The parameters's `type` _added_ (3 times). The return value's `type` _added_. 
* [`DOM.pushNodeByPathToFrontend`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-pushNodeByPathToFrontend) - The return value's `type` _added_. 
* [`DOM.pushNodesByBackendIdsToFrontend`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-pushNodesByBackendIdsToFrontend) - The `0` in the parameters had `type` _added_. The `0` in the return value had `type` _added_. 
* [`DOM.querySelector`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-querySelector) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`DOM.querySelectorAll`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-querySelectorAll) - The parameters's `type` _added_. The `0` in the return value had `type` _added_. 
* [`DOM.removeAttribute`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-removeAttribute) - The parameters's `type` _added_. 
* [`DOM.removeNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-removeNode) - The parameters's `type` _added_. 
* [`DOM.requestChildNodes`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-requestChildNodes) - The parameters's `type` _added_. 
* [`DOM.requestNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-requestNode) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`DOM.resolveNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-resolveNode) - The parameters's `type` _added_ (2 times). The return value's `type` _added_. 
* [`DOM.setAttributeValue`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setAttributeValue) - The parameters's `type` _added_. 
* [`DOM.setAttributesAsText`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setAttributesAsText) - The parameters's `type` _added_. 
* [`DOM.setFileInputFiles`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setFileInputFiles) - The parameters's `type` _added_ (3 times). 
* [`DOM.setInspectedNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setInspectedNode) - The parameters's `type` _added_. 
* [`DOM.setNodeName`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setNodeName) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`DOM.setNodeValue`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setNodeValue) - The parameters's `type` _added_. 
* [`DOM.setOuterHTML`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setOuterHTML) - The parameters's `type` _added_. 
* [`DOM.getFrameOwner`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getFrameOwner) - The parameters's `type` _added_. The return value's `type` _added_. 
#### `DOM`: modified events
* [`DOM.attributeModified`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-attributeModified) - The parameters's `type` _added_. 
* [`DOM.attributeRemoved`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-attributeRemoved) - The parameters's `type` _added_. 
* [`DOM.characterDataModified`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-characterDataModified) - The parameters's `type` _added_. 
* [`DOM.childNodeCountUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-childNodeCountUpdated) - The parameters's `type` _added_. 
* [`DOM.childNodeInserted`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-childNodeInserted) - The parameters's `type` _added_ (3 times). 
* [`DOM.childNodeRemoved`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-childNodeRemoved) - The parameters's `type` _added_ (2 times). 
* [`DOM.distributedNodesUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-distributedNodesUpdated) - The parameters's `type` _added_. The `1` in the parameters had `type` _added_. 
* [`DOM.inlineStyleInvalidated`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-inlineStyleInvalidated) - The `0` in the parameters had `type` _added_. 
* [`DOM.pseudoElementAdded`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-pseudoElementAdded) - The parameters's `type` _added_ (2 times). 
* [`DOM.pseudoElementRemoved`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-pseudoElementRemoved) - The parameters's `type` _added_ (2 times). 
* [`DOM.setChildNodes`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-setChildNodes) - The parameters's `type` _added_. The `1` in the parameters had `type` _added_. 
* [`DOM.shadowRootPopped`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-shadowRootPopped) - The parameters's `type` _added_ (2 times). 
* [`DOM.shadowRootPushed`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-shadowRootPushed) - The parameters's `type` _added_ (2 times). 
#### `DOM`: modified types
* [`DOM.BackendNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-BackendNode) - The properties's `type` _added_. 
* [`DOM.Node`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-Node) - The properties's `type` _added_ (9 times). The `8` in the properties had `type` _added_. The `22` in the properties had `type` _added_. The `24` in the properties had `type` _added_. The `26` in the properties had `type` _added_. 
* [`DOM.BoxModel`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-BoxModel) - The properties's `type` _added_ (5 times). 
* [`DOM.ShapeOutsideInfo`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-ShapeOutsideInfo) - The properties's `type` _added_. 
#### `DOMDebugger`: modified commands
* [`DOMDebugger.getEventListeners`](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger/#method-getEventListeners) - The parameters's `type` _added_. The `0` in the return value had `type` _added_. 
* [`DOMDebugger.removeDOMBreakpoint`](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger/#method-removeDOMBreakpoint) - The parameters's `type` _added_ (2 times). 
* [`DOMDebugger.setDOMBreakpoint`](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger/#method-setDOMBreakpoint) - The parameters's `type` _added_ (2 times). 
#### `DOMDebugger`: modified type
* [`DOMDebugger.EventListener`](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger/#type-EventListener) - The properties's `type` _added_ (4 times). 
#### `DOMSnapshot`: modified commands
* [`DOMSnapshot.getSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#method-getSnapshot) - The `0` in the return value had `type` _added_. The `1` in the return value had `type` _added_. The `2` in the return value had `type` _added_. 
* [`DOMSnapshot.captureSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#method-captureSnapshot) - The `0` in the return value had `type` _added_. 
#### `DOMSnapshot`: modified types
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode) - The properties's `type` _added_ (4 times). The `9` in the properties had `type` _added_. The `23` in the properties had `type` _added_. 
* [`DOMSnapshot.InlineTextBox`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-InlineTextBox) - The properties's `type` _added_. 
* [`DOMSnapshot.LayoutTreeNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-LayoutTreeNode) - The properties's `type` _added_. The `3` in the properties had `type` _added_. 
* [`DOMSnapshot.ComputedStyle`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-ComputedStyle) - The `0` in the properties had `type` _added_. 
* [`DOMSnapshot.ArrayOfStrings`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-ArrayOfStrings) - The items's `type` _added_. 
* [`DOMSnapshot.RareStringData`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-RareStringData) - The `1` in the properties had `type` _added_. 
* [`DOMSnapshot.DocumentSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DocumentSnapshot) - The properties's `type` _added_ (10 times). 
* [`DOMSnapshot.NodeTreeSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-NodeTreeSnapshot) - The `2` in the properties had `type` _added_. The `3` in the properties had `type` _added_. The `4` in the properties had `type` _added_. The `5` in the properties had `type` _added_. The properties's `type` _added_ (9 times). 
* [`DOMSnapshot.LayoutTreeSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-LayoutTreeSnapshot) - The `1` in the properties had `type` _added_. The `2` in the properties had `type` _added_. The `3` in the properties had `type` _added_. The properties's `type` _added_. 
* [`DOMSnapshot.TextBoxSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-TextBoxSnapshot) - The `1` in the properties had `type` _added_. 
#### `DOMStorage`: modified commands
* [`DOMStorage.clear`](https://chromedevtools.github.io/devtools-protocol/tot/DOMStorage/#method-clear) - The parameters's `type` _added_. 
* [`DOMStorage.getDOMStorageItems`](https://chromedevtools.github.io/devtools-protocol/tot/DOMStorage/#method-getDOMStorageItems) - The parameters's `type` _added_. The `0` in the return value had `type` _added_. 
* [`DOMStorage.removeDOMStorageItem`](https://chromedevtools.github.io/devtools-protocol/tot/DOMStorage/#method-removeDOMStorageItem) - The parameters's `type` _added_. 
* [`DOMStorage.setDOMStorageItem`](https://chromedevtools.github.io/devtools-protocol/tot/DOMStorage/#method-setDOMStorageItem) - The parameters's `type` _added_. 
#### `DOMStorage`: modified events
* [`DOMStorage.domStorageItemAdded`](https://chromedevtools.github.io/devtools-protocol/tot/DOMStorage/#event-domStorageItemAdded) - The parameters's `type` _added_. 
* [`DOMStorage.domStorageItemRemoved`](https://chromedevtools.github.io/devtools-protocol/tot/DOMStorage/#event-domStorageItemRemoved) - The parameters's `type` _added_. 
* [`DOMStorage.domStorageItemUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/DOMStorage/#event-domStorageItemUpdated) - The parameters's `type` _added_. 
* [`DOMStorage.domStorageItemsCleared`](https://chromedevtools.github.io/devtools-protocol/tot/DOMStorage/#event-domStorageItemsCleared) - The parameters's `type` _added_. 
#### `Database`: modified commands
* [`Database.executeSQL`](https://chromedevtools.github.io/devtools-protocol/tot/Database/#method-executeSQL) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`Database.getDatabaseTableNames`](https://chromedevtools.github.io/devtools-protocol/tot/Database/#method-getDatabaseTableNames) - The parameters's `type` _added_. 
#### `Database`: modified event
* [`Database.addDatabase`](https://chromedevtools.github.io/devtools-protocol/tot/Database/#event-addDatabase) - The parameters's `type` _added_. 
#### `Database`: modified type
* [`Database.Database`](https://chromedevtools.github.io/devtools-protocol/tot/Database/#type-Database) - The properties's `type` _added_. 
#### `Emulation`: modified commands
* [`Emulation.setDefaultBackgroundColorOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDefaultBackgroundColorOverride) - The parameters's `type` _added_. 
* [`Emulation.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDeviceMetricsOverride) - The parameters's `type` _added_ (2 times). 
* [`Emulation.setVirtualTimePolicy`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVirtualTimePolicy) - The parameters's `type` _added_ (2 times). 
#### `HeadlessExperimental`: modified command
* [`HeadlessExperimental.beginFrame`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#method-beginFrame) - The parameters's `type` _added_. 
#### `IO`: modified commands
* [`IO.close`](https://chromedevtools.github.io/devtools-protocol/tot/IO/#method-close) - The parameters's `type` _added_. 
* [`IO.read`](https://chromedevtools.github.io/devtools-protocol/tot/IO/#method-read) - The parameters's `type` _added_. 
* [`IO.resolveBlob`](https://chromedevtools.github.io/devtools-protocol/tot/IO/#method-resolveBlob) - The parameters's `type` _added_. 
#### `IndexedDB`: modified commands
* [`IndexedDB.deleteObjectStoreEntries`](https://chromedevtools.github.io/devtools-protocol/tot/IndexedDB/#method-deleteObjectStoreEntries) - The parameters's `type` _added_. 
* [`IndexedDB.requestData`](https://chromedevtools.github.io/devtools-protocol/tot/IndexedDB/#method-requestData) - The parameters's `type` _added_. The `0` in the return value had `type` _added_. 
* [`IndexedDB.requestDatabase`](https://chromedevtools.github.io/devtools-protocol/tot/IndexedDB/#method-requestDatabase) - The return value's `type` _added_. 
#### `IndexedDB`: modified types
* [`IndexedDB.DatabaseWithObjectStores`](https://chromedevtools.github.io/devtools-protocol/tot/IndexedDB/#type-DatabaseWithObjectStores) - The `2` in the properties had `type` _added_. 
* [`IndexedDB.ObjectStore`](https://chromedevtools.github.io/devtools-protocol/tot/IndexedDB/#type-ObjectStore) - The properties's `type` _added_. The `3` in the properties had `type` _added_. 
* [`IndexedDB.ObjectStoreIndex`](https://chromedevtools.github.io/devtools-protocol/tot/IndexedDB/#type-ObjectStoreIndex) - The properties's `type` _added_. 
* [`IndexedDB.Key`](https://chromedevtools.github.io/devtools-protocol/tot/IndexedDB/#type-Key) - The `4` in the properties had `type` _added_. 
* [`IndexedDB.KeyRange`](https://chromedevtools.github.io/devtools-protocol/tot/IndexedDB/#type-KeyRange) - The properties's `type` _added_ (2 times). 
* [`IndexedDB.DataEntry`](https://chromedevtools.github.io/devtools-protocol/tot/IndexedDB/#type-DataEntry) - The properties's `type` _added_ (3 times). 
#### `Input`: modified commands
* [`Input.dispatchKeyEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchKeyEvent) - The parameters's `type` _added_. 
* [`Input.dispatchMouseEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchMouseEvent) - The parameters's `type` _added_. 
* [`Input.dispatchTouchEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchTouchEvent) - The `1` in the parameters had `type` _added_. The parameters's `type` _added_. 
* [`Input.emulateTouchFromMouseEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-emulateTouchFromMouseEvent) - The parameters's `type` _added_. 
* [`Input.synthesizePinchGesture`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-synthesizePinchGesture) - The parameters's `type` _added_. 
* [`Input.synthesizeScrollGesture`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-synthesizeScrollGesture) - The parameters's `type` _added_. 
* [`Input.synthesizeTapGesture`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-synthesizeTapGesture) - The parameters's `type` _added_. 
#### `LayerTree`: modified commands
* [`LayerTree.compositingReasons`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#method-compositingReasons) - The parameters's `type` _added_. 
* [`LayerTree.loadSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#method-loadSnapshot) - The `0` in the parameters had `type` _added_. The return value's `type` _added_. 
* [`LayerTree.makeSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#method-makeSnapshot) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`LayerTree.profileSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#method-profileSnapshot) - The parameters's `type` _added_ (2 times). The `0` in the return value had `type` _added_. 
* [`LayerTree.releaseSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#method-releaseSnapshot) - The parameters's `type` _added_. 
* [`LayerTree.replaySnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#method-replaySnapshot) - The parameters's `type` _added_. 
* [`LayerTree.snapshotCommandLog`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#method-snapshotCommandLog) - The parameters's `type` _added_. 
#### `LayerTree`: modified events
* [`LayerTree.layerPainted`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#event-layerPainted) - The parameters's `type` _added_ (2 times). 
* [`LayerTree.layerTreeDidChange`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#event-layerTreeDidChange) - The `0` in the parameters had `type` _added_. 
#### `LayerTree`: modified types
* [`LayerTree.ScrollRect`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#type-ScrollRect) - The properties's `type` _added_. 
* [`LayerTree.StickyPositionConstraint`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#type-StickyPositionConstraint) - The properties's `type` _added_ (4 times). 
* [`LayerTree.Layer`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#type-Layer) - The properties's `type` _added_ (4 times). The `14` in the properties had `type` _added_. 
#### `Log`: modified command
* [`Log.startViolationsReport`](https://chromedevtools.github.io/devtools-protocol/tot/Log/#method-startViolationsReport) - The `0` in the parameters had `type` _added_. 
#### `Log`: modified event
* [`Log.entryAdded`](https://chromedevtools.github.io/devtools-protocol/tot/Log/#event-entryAdded) - The parameters's `type` _added_. 
#### `Log`: modified type
* [`Log.LogEntry`](https://chromedevtools.github.io/devtools-protocol/tot/Log/#type-LogEntry) - The properties's `type` _added_ (3 times). The `9` in the properties had `type` _added_. 
#### `Memory`: modified commands
* [`Memory.simulatePressureNotification`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-simulatePressureNotification) - The parameters's `type` _added_. 
* [`Memory.getAllTimeSamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-getAllTimeSamplingProfile) - The return value's `type` _added_. 
* [`Memory.getBrowserSamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-getBrowserSamplingProfile) - The return value's `type` _added_. 
* [`Memory.getSamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-getSamplingProfile) - The return value's `type` _added_. 
#### `Memory`: modified type
* [`Memory.SamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#type-SamplingProfile) - The `0` in the properties had `type` _added_. The `1` in the properties had `type` _added_. 
#### `Network`: modified commands
* [`Network.continueInterceptedRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-continueInterceptedRequest) - The parameters's `type` _added_ (4 times). 
* [`Network.emulateNetworkConditions`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-emulateNetworkConditions) - The parameters's `type` _added_. 
* [`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getAllCookies) - The `0` in the return value had `type` _added_. 
* [`Network.getCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getCookies) - The `0` in the return value had `type` _added_. 
* [`Network.getResponseBody`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getResponseBody) - The parameters's `type` _added_. 
* [`Network.getRequestPostData`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getRequestPostData) - The parameters's `type` _added_. 
* [`Network.getResponseBodyForInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getResponseBodyForInterception) - The parameters's `type` _added_. 
* [`Network.takeResponseBodyForInterceptionAsStream`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-takeResponseBodyForInterceptionAsStream) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`Network.replayXHR`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-replayXHR) - The parameters's `type` _added_. 
* [`Network.searchInResponseBody`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-searchInResponseBody) - The parameters's `type` _added_. The `0` in the return value had `type` _added_. 
* [`Network.setCookie`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCookie) - The parameters's `type` _added_ (2 times). 
* [`Network.setCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCookies) - The `0` in the parameters had `type` _added_. 
* [`Network.setExtraHTTPHeaders`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setExtraHTTPHeaders) - The parameters's `type` _added_. 
* [`Network.setRequestInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setRequestInterception) - The `0` in the parameters had `type` _added_. 
#### `Network`: modified events
* [`Network.dataReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-dataReceived) - The parameters's `type` _added_ (2 times). 
* [`Network.eventSourceMessageReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-eventSourceMessageReceived) - The parameters's `type` _added_ (2 times). 
* [`Network.loadingFailed`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-loadingFailed) - The parameters's `type` _added_ (4 times). 
* [`Network.loadingFinished`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-loadingFinished) - The parameters's `type` _added_ (2 times). 
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted) - The parameters's `type` _added_ (7 times). 
* [`Network.requestServedFromCache`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestServedFromCache) - The parameters's `type` _added_. 
* [`Network.requestWillBeSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestWillBeSent) - The parameters's `type` _added_ (9 times). 
* [`Network.resourceChangedPriority`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-resourceChangedPriority) - The parameters's `type` _added_ (3 times). 
* [`Network.signedExchangeReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-signedExchangeReceived) - The parameters's `type` _added_ (2 times). 
* [`Network.responseReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-responseReceived) - The parameters's `type` _added_ (6 times). 
* [`Network.webSocketClosed`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketClosed) - The parameters's `type` _added_ (2 times). 
* [`Network.webSocketCreated`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketCreated) - The parameters's `type` _added_ (2 times). 
* [`Network.webSocketFrameError`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameError) - The parameters's `type` _added_ (2 times). 
* [`Network.webSocketFrameReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameReceived) - The parameters's `type` _added_ (3 times). 
* [`Network.webSocketFrameSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameSent) - The parameters's `type` _added_ (3 times). 
* [`Network.webSocketHandshakeResponseReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketHandshakeResponseReceived) - The parameters's `type` _added_ (3 times). 
* [`Network.webSocketWillSendHandshakeRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketWillSendHandshakeRequest) - The parameters's `type` _added_ (4 times). 
#### `Network`: modified types
* [`Network.Request`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Request) - The properties's `type` _added_ (3 times). 
* [`Network.SignedCertificateTimestamp`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SignedCertificateTimestamp) - The properties's `type` _added_. 
* [`Network.SecurityDetails`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SecurityDetails) - The properties's `type` _added_ (4 times). The `11` in the properties had `type` _added_. 
* [`Network.Response`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Response) - The properties's `type` _added_ (5 times). 
* [`Network.WebSocketRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-WebSocketRequest) - The properties's `type` _added_. 
* [`Network.WebSocketResponse`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-WebSocketResponse) - The properties's `type` _added_ (2 times). 
* [`Network.CachedResource`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-CachedResource) - The properties's `type` _added_ (2 times). 
* [`Network.Initiator`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Initiator) - The properties's `type` _added_. 
* [`Network.Cookie`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Cookie) - The properties's `type` _added_. 
* [`Network.CookieParam`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-CookieParam) - The properties's `type` _added_ (2 times). 
* [`Network.RequestPattern`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-RequestPattern) - The properties's `type` _added_ (2 times). 
* [`Network.SignedExchangeHeader`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SignedExchangeHeader) - The properties's `type` _added_. The `4` in the properties had `type` _added_. 
* [`Network.SignedExchangeError`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SignedExchangeError) - The properties's `type` _added_. 
* [`Network.SignedExchangeInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SignedExchangeInfo) - The properties's `type` _added_ (3 times). The `3` in the properties had `type` _added_. 
#### `Overlay`: modified commands
* [`Overlay.getHighlightObjectForTest`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-getHighlightObjectForTest) - The parameters's `type` _added_. 
* [`Overlay.highlightFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightFrame) - The parameters's `type` _added_ (3 times). 
* [`Overlay.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightNode) - The parameters's `type` _added_ (4 times). 
* [`Overlay.highlightQuad`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightQuad) - The parameters's `type` _added_ (3 times). 
* [`Overlay.highlightRect`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightRect) - The parameters's `type` _added_ (2 times). 
* [`Overlay.setInspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setInspectMode) - The parameters's `type` _added_ (2 times). 
#### `Overlay`: modified events
* [`Overlay.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#event-inspectNodeRequested) - The parameters's `type` _added_. 
* [`Overlay.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#event-nodeHighlightRequested) - The parameters's `type` _added_. 
* [`Overlay.screenshotRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#event-screenshotRequested) - The parameters's `type` _added_. 
#### `Overlay`: modified type
* [`Overlay.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#type-HighlightConfig) - The properties's `type` _added_ (8 times). 
#### `Page`: modified commands
* [`Page.addScriptToEvaluateOnLoad`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-addScriptToEvaluateOnLoad) - The return value's `type` _added_. 
* [`Page.addScriptToEvaluateOnNewDocument`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-addScriptToEvaluateOnNewDocument) - The return value's `type` _added_. 
* [`Page.captureScreenshot`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot) - The parameters's `type` _added_. 
* [`Page.createIsolatedWorld`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-createIsolatedWorld) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`Page.getAppManifest`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getAppManifest) - The `1` in the return value had `type` _added_. 
* [`Page.getCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getCookies) - The `0` in the return value had `type` _added_. 
* [`Page.getFrameTree`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getFrameTree) - The return value's `type` _added_. 
* [`Page.getLayoutMetrics`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getLayoutMetrics) - The return value's `type` _added_ (3 times). 
* [`Page.getNavigationHistory`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getNavigationHistory) - The `1` in the return value had `type` _added_. 
* [`Page.getResourceContent`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getResourceContent) - The parameters's `type` _added_. 
* [`Page.getResourceTree`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getResourceTree) - The return value's `type` _added_. 
* [`Page.navigate`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigate) - The parameters's `type` _added_ (2 times). The return value's `type` _added_ (2 times). 
* [`Page.removeScriptToEvaluateOnLoad`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-removeScriptToEvaluateOnLoad) - The parameters's `type` _added_. 
* [`Page.removeScriptToEvaluateOnNewDocument`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-removeScriptToEvaluateOnNewDocument) - The parameters's `type` _added_. 
* [`Page.searchInResource`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-searchInResource) - The parameters's `type` _added_. The `0` in the return value had `type` _added_. 
* [`Page.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDeviceMetricsOverride) - The parameters's `type` _added_ (2 times). 
* [`Page.setFontFamilies`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setFontFamilies) - The parameters's `type` _added_. 
* [`Page.setFontSizes`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setFontSizes) - The parameters's `type` _added_. 
* [`Page.setDocumentContent`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDocumentContent) - The parameters's `type` _added_. 
#### `Page`: modified events
* [`Page.domContentEventFired`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-domContentEventFired) - The parameters's `type` _added_. 
* [`Page.frameAttached`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameAttached) - The parameters's `type` _added_ (3 times). 
* [`Page.frameClearedScheduledNavigation`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameClearedScheduledNavigation) - The parameters's `type` _added_. 
* [`Page.frameDetached`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameDetached) - The parameters's `type` _added_. 
* [`Page.frameNavigated`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameNavigated) - The parameters's `type` _added_. 
* [`Page.frameScheduledNavigation`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameScheduledNavigation) - The parameters's `type` _added_. 
* [`Page.frameStartedLoading`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameStartedLoading) - The parameters's `type` _added_. 
* [`Page.frameStoppedLoading`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameStoppedLoading) - The parameters's `type` _added_. 
* [`Page.javascriptDialogOpening`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-javascriptDialogOpening) - The parameters's `type` _added_. 
* [`Page.lifecycleEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-lifecycleEvent) - The parameters's `type` _added_ (3 times). 
* [`Page.loadEventFired`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-loadEventFired) - The parameters's `type` _added_. 
* [`Page.navigatedWithinDocument`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-navigatedWithinDocument) - The parameters's `type` _added_. 
* [`Page.screencastFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-screencastFrame) - The parameters's `type` _added_. 
#### `Page`: modified types
* [`Page.Frame`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-Frame) - The properties's `type` _added_. 
* [`Page.FrameResource`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-FrameResource) - The properties's `type` _added_ (2 times). 
* [`Page.FrameResourceTree`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-FrameResourceTree) - The properties's `type` _added_. The `1` in the properties had `type` _added_. The `2` in the properties had `type` _added_. 
* [`Page.FrameTree`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-FrameTree) - The properties's `type` _added_. The `1` in the properties had `type` _added_. 
* [`Page.NavigationEntry`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-NavigationEntry) - The properties's `type` _added_. 
* [`Page.ScreencastFrameMetadata`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-ScreencastFrameMetadata) - The properties's `type` _added_. 
#### `Performance`: modified command
* [`Performance.getMetrics`](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#method-getMetrics) - The `0` in the return value had `type` _added_. 
#### `Performance`: modified event
* [`Performance.metrics`](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#event-metrics) - The `0` in the parameters had `type` _added_. 
#### `Security`: modified command
* [`Security.handleCertificateError`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#method-handleCertificateError) - The parameters's `type` _added_. 
#### `Security`: modified event
* [`Security.securityStateChanged`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#event-securityStateChanged) - The parameters's `type` _added_ (2 times). The `2` in the parameters had `type` _added_. 
#### `Security`: modified types
* [`Security.SecurityStateExplanation`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#type-SecurityStateExplanation) - The properties's `type` _added_ (2 times). 
* [`Security.InsecureContentStatus`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#type-InsecureContentStatus) - The properties's `type` _added_ (2 times). 
#### `ServiceWorker`: modified events
* [`ServiceWorker.workerErrorReported`](https://chromedevtools.github.io/devtools-protocol/tot/ServiceWorker/#event-workerErrorReported) - The parameters's `type` _added_. 
* [`ServiceWorker.workerRegistrationUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/ServiceWorker/#event-workerRegistrationUpdated) - The `0` in the parameters had `type` _added_. 
* [`ServiceWorker.workerVersionUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/ServiceWorker/#event-workerVersionUpdated) - The `0` in the parameters had `type` _added_. 
#### `ServiceWorker`: modified type
* [`ServiceWorker.ServiceWorkerVersion`](https://chromedevtools.github.io/devtools-protocol/tot/ServiceWorker/#type-ServiceWorkerVersion) - The properties's `type` _added_ (3 times). The `7` in the properties had `type` _added_. 
#### `Storage`: modified command
* [`Storage.getUsageAndQuota`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-getUsageAndQuota) - The `2` in the return value had `type` _added_. 
#### `Storage`: modified type
* [`Storage.UsageForType`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#type-UsageForType) - The properties's `type` _added_. 
#### `SystemInfo`: modified command
* [`SystemInfo.getInfo`](https://chromedevtools.github.io/devtools-protocol/tot/SystemInfo/#method-getInfo) - The return value's `type` _added_. 
#### `SystemInfo`: modified type
* [`SystemInfo.GPUInfo`](https://chromedevtools.github.io/devtools-protocol/tot/SystemInfo/#type-GPUInfo) - The `0` in the properties had `type` _added_. 
#### `Target`: modified commands
* [`Target.activateTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-activateTarget) - The parameters's `type` _added_. 
* [`Target.attachToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`Target.attachToBrowserTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToBrowserTarget) - The return value's `type` _added_. 
* [`Target.closeTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-closeTarget) - The parameters's `type` _added_. 
* [`Target.exposeDevToolsProtocol`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-exposeDevToolsProtocol) - The parameters's `type` _added_. 
* [`Target.createBrowserContext`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-createBrowserContext) - The return value's `type` _added_. 
* [`Target.getBrowserContexts`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-getBrowserContexts) - The `0` in the return value had `type` _added_. 
* [`Target.createTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-createTarget) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`Target.detachFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-detachFromTarget) - The parameters's `type` _added_ (2 times). 
* [`Target.disposeBrowserContext`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-disposeBrowserContext) - The parameters's `type` _added_. 
* [`Target.getTargetInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-getTargetInfo) - The parameters's `type` _added_. The return value's `type` _added_. 
* [`Target.getTargets`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-getTargets) - The `0` in the return value had `type` _added_. 
* [`Target.sendMessageToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-sendMessageToTarget) - The parameters's `type` _added_ (2 times). 
* [`Target.setRemoteLocations`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setRemoteLocations) - The `0` in the parameters had `type` _added_. 
#### `Target`: modified events
* [`Target.attachedToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-attachedToTarget) - The parameters's `type` _added_ (2 times). 
* [`Target.detachedFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-detachedFromTarget) - The parameters's `type` _added_ (2 times). 
* [`Target.receivedMessageFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-receivedMessageFromTarget) - The parameters's `type` _added_ (2 times). 
* [`Target.targetCreated`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-targetCreated) - The parameters's `type` _added_. 
* [`Target.targetDestroyed`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-targetDestroyed) - The parameters's `type` _added_. 
* [`Target.targetCrashed`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-targetCrashed) - The parameters's `type` _added_. 
* [`Target.targetInfoChanged`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-targetInfoChanged) - The parameters's `type` _added_. 
#### `Target`: modified type
* [`Target.TargetInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#type-TargetInfo) - The properties's `type` _added_ (3 times). 
#### `Tracing`: modified command
* [`Tracing.start`](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#method-start) - The parameters's `type` _added_ (2 times). 
#### `Tracing`: modified event
* [`Tracing.tracingComplete`](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#event-tracingComplete) - The parameters's `type` _added_ (2 times). 
#### `Tracing`: modified type
* [`Tracing.TraceConfig`](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#type-TraceConfig) - The properties's `type` _added_. 


## Roll protocol to r586443
###### _2018-08-27 15:15:57_ | Diff: [cafc591...41333c5](https://github.com/ChromeDevTools/devtools-protocol/compare/cafc591...41333c5)
#### `Testing`: new domain
* [`Testing.Testing`](https://chromedevtools.github.io/devtools-protocol/tot/Testing/#domain-Testing)
#### `Testing`: new command
* [`Testing.generateTestReport`](https://chromedevtools.github.io/devtools-protocol/tot/Testing/#method-generateTestReport)


## Roll protocol to r586417
###### _2018-08-27 14:15:56_ | Diff: [fbe2ce1...cafc591](https://github.com/ChromeDevTools/devtools-protocol/compare/fbe2ce1...cafc591)
#### `Page`: new command
* [`Page.generateTestReport`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-generateTestReport)


## Roll protocol to r585632
###### _2018-08-23 15:15:44_ | Diff: [d4361d7...fbe2ce1](https://github.com/ChromeDevTools/devtools-protocol/compare/d4361d7...fbe2ce1)
#### `Browser`: new commands
* [`Browser.grantPermissions`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-grantPermissions)
* [`Browser.resetPermissions`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-resetPermissions)
#### `Browser`: new type
* [`Browser.PermissionType`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-PermissionType)


## Roll protocol to r584873
###### _2018-08-21 12:15:50_ | Diff: [5fd6859...d4361d7](https://github.com/ChromeDevTools/devtools-protocol/compare/5fd6859...d4361d7)
#### `DOMSnapshot`: modified types
* [`DOMSnapshot.LayoutTreeNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-LayoutTreeNode) - The properties's `isStackingContext` _added_. 
* [`DOMSnapshot.LayoutTreeSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-LayoutTreeSnapshot) - The properties's `stackingContexts` _added_. 


## Roll protocol to r581326
###### _2018-08-07 13:15:57_ | Diff: [45146f8...5fd6859](https://github.com/ChromeDevTools/devtools-protocol/compare/45146f8...5fd6859)
#### `Memory`: new type
* [`Memory.Module`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#type-Module)
#### `Memory`: modified type
* [`Memory.SamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#type-SamplingProfile) - The properties's `modules` _added_. 


## Roll protocol to r579242
###### _2018-07-30 17:16:01_ | Diff: [501e985...45146f8](https://github.com/ChromeDevTools/devtools-protocol/compare/501e985...45146f8)
#### `Target`: modified command
* [`Target.setAutoAttach`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setAutoAttach) - The parameters's `flatten` _added_. 


## Roll protocol to r578934
###### _2018-07-28 13:15:43_ | Diff: [5c95923...501e985](https://github.com/ChromeDevTools/devtools-protocol/compare/5c95923...501e985)
#### `Input`: new command
* [`Input.insertText`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-insertText)


## Roll protocol to r576560
###### _2018-07-19 11:16:22_ | Diff: [05a3c0e...5c95923](https://github.com/ChromeDevTools/devtools-protocol/compare/05a3c0e...5c95923)
#### `Page`: new commands
* [`Page.setProduceCompilationCache`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setProduceCompilationCache)
* [`Page.addCompilationCache`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-addCompilationCache)
* [`Page.clearCompilationCache`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-clearCompilationCache)
#### `Page`: new event
* [`Page.compilationCacheProduced`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-compilationCacheProduced)


## Roll protocol to r575147
###### _2018-07-13 21:15:43_ | Diff: [090126c...05a3c0e](https://github.com/ChromeDevTools/devtools-protocol/compare/090126c...05a3c0e)
#### `Target`: new command
* [`Target.attachToBrowserTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToBrowserTarget)


## Roll protocol to r574367
###### _2018-07-11 15:15:44_ | Diff: [26e4e07...090126c](https://github.com/ChromeDevTools/devtools-protocol/compare/26e4e07...090126c)
#### `DOMSnapshot`: new type
* [`DOMSnapshot.NodeTreeSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-NodeTreeSnapshot)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DocumentSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DocumentSnapshot) - The properties's `documentURL` _removed_. The properties's `baseURL` _removed_. The properties's `contentLanguage` _removed_. The properties's `documentEncoding` _removed_. The properties's `publicId` _removed_. The properties's `systemId` _removed_. The properties's `frameId` _removed_. The properties's `contentDocumentIndex` _removed_. The properties's `pseudoType` _removed_. The properties's `isClickable` _removed_. The properties's `currentSourceURL` _removed_. The properties's `originURL` _removed_. The properties's `layoutSnapshot` _removed_. The properties's `textBoxSnapshot` _removed_. The `parentIndex` in the properties had `optional` _removed_. The `parentIndex` in the properties had `type` _removed_. The `parentIndex` in the properties had `items` _removed_. The `nodeType` in the properties had `optional` _removed_. The `nodeType` in the properties had `type` _removed_. The `nodeType` in the properties had `items` _removed_. The `nodeName` in the properties had `optional` _removed_. The `nodeName` in the properties had `type` _removed_. The `nodeName` in the properties had `items` _removed_. The `nodeValue` in the properties had `optional` _removed_. The `nodeValue` in the properties had `type` _removed_. The `nodeValue` in the properties had `items` _removed_. The `backendNodeId` in the properties had `optional` _removed_. The `backendNodeId` in the properties had `type` _removed_. The `backendNodeId` in the properties had `items` _removed_. The `attributes` in the properties had `optional` _removed_. The `attributes` in the properties had `type` _removed_. The `attributes` in the properties had `items` _removed_. The `textValue` in the properties had `optional` _removed_. The `inputValue` in the properties had `optional` _removed_. The `inputChecked` in the properties had `optional` _removed_. The `optionSelected` in the properties had `optional` _removed_. `description` updated. The `parentIndex` in the properties had `name` _updated_. The `parentIndex` in the properties had `description` _updated_. The `nodeType` in the properties had `name` _updated_. The `nodeType` in the properties had `description` _updated_. The `nodeName` in the properties had `name` _updated_. The `nodeName` in the properties had `description` _updated_. The `nodeValue` in the properties had `name` _updated_. The `nodeValue` in the properties had `description` _updated_. The `backendNodeId` in the properties had `name` _updated_. The `backendNodeId` in the properties had `description` _updated_. The `attributes` in the properties had `name` _updated_. The `attributes` in the properties had `description` _updated_. The `textValue` in the properties had `name` _updated_. The `textValue` in the properties had `description` _updated_. The `textValue` in the properties had `$ref` _updated_. The `inputValue` in the properties had `name` _updated_. The `inputValue` in the properties had `description` _updated_. The `inputValue` in the properties had `$ref` _updated_. The `inputChecked` in the properties had `name` _updated_. The `inputChecked` in the properties had `description` _updated_. The `inputChecked` in the properties had `$ref` _updated_. The `optionSelected` in the properties had `name` _updated_. The `optionSelected` in the properties had `description` _updated_. The `optionSelected` in the properties had `$ref` _updated_. The properties's `$ref` _added_ (6 times). 


## Roll protocol to r574025
###### _2018-07-10 18:15:41_ | Diff: [1aa7b31...26e4e07](https://github.com/ChromeDevTools/devtools-protocol/compare/1aa7b31...26e4e07)
#### `DOMSnapshot`: modified command
* [`DOMSnapshot.captureSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#method-captureSnapshot) - The return value's `strings` _removed_. The `nodes` in the return value had `$ref` _removed_. The `layout` in the return value had `$ref` _removed_. The `nodes` in the return value had `name` _updated_. The `layout` in the return value had `name` _updated_. The `layout` in the return value had `description` _updated_. The return value's `type` _added_ (2 times). The return value's `items` _added_ (2 times). 
#### `DOMSnapshot`: new type
* [`DOMSnapshot.DocumentSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DocumentSnapshot)
#### `DOMSnapshot`: removed types
* [`DOMSnapshot.DOMTreeSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMTreeSnapshot)
* [`DOMSnapshot.StylesSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-StylesSnapshot)
#### `DOMSnapshot`: modified types
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode) - The properties's `currentSourceURL` _removed_. The properties's `originURL` _removed_. The `importedDocumentIndex` in the properties had `type` _removed_. The `templateContentIndex` in the properties had `type` _removed_. The `pseudoType` in the properties had `$ref` _removed_. The `shadowRootType` in the properties had `$ref` _removed_. The `eventListeners` in the properties had `items` _removed_. The `importedDocumentIndex` in the properties had `name` _updated_. The `importedDocumentIndex` in the properties had `description` _updated_. The `templateContentIndex` in the properties had `name` _updated_. The `templateContentIndex` in the properties had `description` _updated_. The `pseudoType` in the properties had `name` _updated_. The `pseudoType` in the properties had `description` _updated_. The `shadowRootType` in the properties had `name` _updated_. The `shadowRootType` in the properties had `description` _updated_. The `isClickable` in the properties had `name` _updated_. The `isClickable` in the properties had `description` _updated_. The `isClickable` in the properties had `type` _updated_. The `eventListeners` in the properties had `name` _updated_. The `eventListeners` in the properties had `description` _updated_. The `eventListeners` in the properties had `type` _updated_. The properties's `$ref` _added_ (2 times). The properties's `type` _added_ (2 times). The properties's `items` _added_. 
* [`DOMSnapshot.LayoutTreeSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-LayoutTreeSnapshot) - The properties's `textBoxes` _removed_. 


## Roll protocol to r572598
###### _2018-07-04 09:15:41_ | Diff: [19fb3d2...1aa7b31](https://github.com/ChromeDevTools/devtools-protocol/compare/19fb3d2...1aa7b31)
#### `Target`: modified command
* [`Target.attachToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget) - The parameters's `flatten` _added_. 


## Roll protocol to r572401
###### _2018-07-03 17:15:50_ | Diff: [be1ed43...19fb3d2](https://github.com/ChromeDevTools/devtools-protocol/compare/be1ed43...19fb3d2)
#### `Target`: modified command
* [`Target.getTargetInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-getTargetInfo) - The parameters's `optional` _added_. 


## Roll protocol to r572389
###### _2018-07-03 16:15:52_ | Diff: [7388b4b...be1ed43](https://github.com/ChromeDevTools/devtools-protocol/compare/7388b4b...be1ed43)
#### `Browser`: modified commands
* [`Browser.getHistograms`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getHistograms) - The parameters's `delta` _added_. 
* [`Browser.getHistogram`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getHistogram) - The parameters's `delta` _added_. 


## Roll protocol to r572315
###### _2018-07-03 12:15:46_ | Diff: [a63ed5b...7388b4b](https://github.com/ChromeDevTools/devtools-protocol/compare/a63ed5b...7388b4b)
#### `DOMSnapshot`: new command
* [`DOMSnapshot.captureSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#method-captureSnapshot)
#### `DOMSnapshot`: modified command
* [`DOMSnapshot.getSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#method-getSnapshot) - `deprecated` added. 
#### `DOMSnapshot`: new types
* [`DOMSnapshot.StringIndex`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-StringIndex)
* [`DOMSnapshot.ArrayOfStrings`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-ArrayOfStrings)
* [`DOMSnapshot.RareStringData`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-RareStringData)
* [`DOMSnapshot.RareBooleanData`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-RareBooleanData)
* [`DOMSnapshot.RareIntegerData`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-RareIntegerData)
* [`DOMSnapshot.Rectangle`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-Rectangle)
* [`DOMSnapshot.DOMTreeSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMTreeSnapshot)
* [`DOMSnapshot.TextBoxSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-TextBoxSnapshot)
* [`DOMSnapshot.LayoutTreeSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-LayoutTreeSnapshot)
* [`DOMSnapshot.StylesSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-StylesSnapshot)


## Roll protocol to r571238
###### _2018-06-28 13:16:10_ | Diff: [ca7022c...a63ed5b](https://github.com/ChromeDevTools/devtools-protocol/compare/ca7022c...a63ed5b)
#### `DOM`: new command
* [`DOM.getContentQuads`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getContentQuads)


## Roll protocol to r568337
###### _2018-06-18 21:15:42_ | Diff: [6e2dac6...0905e28](https://github.com/ChromeDevTools/devtools-protocol/compare/6e2dac6...0905e28)
#### `Network`: modified type
* [`Network.BlockedReason`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-BlockedReason) - The enum's `collapsed-by-client` _added_. 


## Roll protocol to r567107
###### _2018-06-13 20:15:40_ | Diff: [b8a5362...6e2dac6](https://github.com/ChromeDevTools/devtools-protocol/compare/b8a5362...6e2dac6)
#### `Target`: new command
* [`Target.exposeDevToolsProtocol`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-exposeDevToolsProtocol)


## Roll protocol to r565882
###### _2018-06-09 08:15:49_ | Diff: [034b051...b8a5362](https://github.com/ChromeDevTools/devtools-protocol/compare/034b051...b8a5362)
#### `Page`: modified type
* [`Page.ResourceType`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-ResourceType) - The enum's `Other` _updated_. The enum's `CSPViolationReport` _added_. The enum's `Other` _added_. 


## Roll protocol to r565873
###### _2018-06-09 01:15:38_ | Diff: [ef21b44...034b051](https://github.com/ChromeDevTools/devtools-protocol/compare/ef21b44...034b051)
#### `Network`: modified type
* [`Network.Request`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Request) - The `headers` in the properties had `$ref` _removed_. The `postData` in the properties had `optional` _removed_. The `postData` in the properties had `type` _removed_. The `mixedContentType` in the properties had `$ref` _removed_. The `referrerPolicy` in the properties had `type` _removed_. The `referrerPolicy` in the properties had `enum` _removed_. The `isLinkPreload` in the properties had `optional` _removed_. The `url` in the properties had `description` _updated_. The `method` in the properties had `name` _updated_. The `method` in the properties had `description` _updated_. The `headers` in the properties had `name` _updated_. The `headers` in the properties had `description` _updated_. The `postData` in the properties had `name` _updated_. The `postData` in the properties had `description` _updated_. The `hasPostData` in the properties had `name` _updated_. The `hasPostData` in the properties had `description` _updated_. The `hasPostData` in the properties had `type` _updated_. The `mixedContentType` in the properties had `name` _updated_. The `mixedContentType` in the properties had `description` _updated_. The `initialPriority` in the properties had `name` _updated_. The `initialPriority` in the properties had `description` _updated_. The `initialPriority` in the properties had `$ref` _updated_. The `referrerPolicy` in the properties had `name` _updated_. The `referrerPolicy` in the properties had `description` _updated_. The `isLinkPreload` in the properties had `name` _updated_. The `isLinkPreload` in the properties had `description` _updated_. The `isLinkPreload` in the properties had `type` _updated_. The properties's `optional` _added_ (2 times). The properties's `type` _added_ (2 times). The properties's `$ref` _added_ (2 times). The properties's `enum` _added_. The properties's `isLinkPreload` _added_. 


## Roll protocol to r565161
###### _2018-06-06 20:15:42_ | Diff: [e6b9650...ef21b44](https://github.com/ChromeDevTools/devtools-protocol/compare/e6b9650...ef21b44)
#### `Page`: new command
* [`Page.setFontSizes`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setFontSizes)
#### `Page`: modified command
* [`Page.setFontFamilies`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setFontFamilies) - `description` updated. The `fontFamilies` in the parameters had `description` _updated_. 
#### `Page`: new type
* [`Page.FontSizes`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-FontSizes)


## Roll protocol to r564968
###### _2018-06-06 11:15:47_ | Diff: [78ab8c3...e6b9650](https://github.com/ChromeDevTools/devtools-protocol/compare/78ab8c3...e6b9650)
#### `Network`: modified event
* [`Network.loadingFinished`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-loadingFinished) - The `blockedCrossSiteDocument` in the parameters had `name` _updated_. The `blockedCrossSiteDocument` in the parameters had `description` _updated_. 


## Roll protocol to r564939
###### _2018-06-06 10:16:18_ | Diff: [8cc61c7...78ab8c3](https://github.com/ChromeDevTools/devtools-protocol/compare/8cc61c7...78ab8c3)
#### `Page`: new command
* [`Page.setFontFamilies`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setFontFamilies)
#### `Page`: new type
* [`Page.FontFamilies`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-FontFamilies)


## Roll protocol to r564874
###### _2018-06-06 07:16:13_ | Diff: [3bb6299...8cc61c7](https://github.com/ChromeDevTools/devtools-protocol/compare/3bb6299...8cc61c7)
#### `Runtime`: modified command
* [`Runtime.addBinding`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-addBinding) - `description` updated. The parameters's `executionContextId` _added_. 


## Roll protocol to r564725
###### _2018-06-05 17:15:41_ | Diff: [2c9e648...3bb6299](https://github.com/ChromeDevTools/devtools-protocol/compare/2c9e648...3bb6299)
#### `Emulation`: new command
* [`Emulation.setDocumentCookieDisabled`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDocumentCookieDisabled)


## Roll protocol to r564347
###### _2018-06-04 19:15:53_ | Diff: [e5023ab...2c9e648](https://github.com/ChromeDevTools/devtools-protocol/compare/e5023ab...2c9e648)
#### `Runtime`: new command
* [`Runtime.setMaxCallStackSizeToCapture`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-setMaxCallStackSizeToCapture)


## Roll protocol to r563930 554653 554626
###### _2018-06-01 22:15:40_ | Diff: [92b6b49...170e987](https://github.com/ChromeDevTools/devtools-protocol/compare/92b6b49...170e987)
#### `Runtime`: new commands
* [`Runtime.addBinding`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-addBinding)
* [`Runtime.removeBinding`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-removeBinding)
#### `Runtime`: new event
* [`Runtime.bindingCalled`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-bindingCalled)


## Roll protocol to r563694
###### _2018-06-01 10:15:46_ | Diff: [686864e...38129ec](https://github.com/ChromeDevTools/devtools-protocol/compare/686864e...38129ec)
#### `Runtime`: new command
* [`Runtime.setAsyncCallStackDepth`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-setAsyncCallStackDepth)


## Roll protocol to r563547
###### _2018-05-31 23:15:35_ | Diff: [8490a4e...686864e](https://github.com/ChromeDevTools/devtools-protocol/compare/8490a4e...686864e)
#### `Target`: new event
* [`Target.targetCrashed`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-targetCrashed)


## Roll protocol to r563180
###### _2018-05-31 01:15:44_ | Diff: [a53449b...8490a4e](https://github.com/ChromeDevTools/devtools-protocol/compare/a53449b...8490a4e)
#### `Network`: new types
* [`Network.SignedExchangeErrorField`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SignedExchangeErrorField)
* [`Network.SignedExchangeError`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SignedExchangeError)
#### `Network`: modified type
* [`Network.SignedExchangeInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SignedExchangeInfo) - The `errors` in the properties had `type` _removed_. The `3` in the properties had `$ref` _added_. 


## Roll protocol to r562716
###### _2018-05-29 20:15:40_ | Diff: [1c585c3...a53449b](https://github.com/ChromeDevTools/devtools-protocol/compare/1c585c3...a53449b)
#### `Emulation`: new command
* [`Emulation.setScrollbarsHidden`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setScrollbarsHidden)


## Roll protocol to r562010
###### _2018-05-25 14:17:24_ | Diff: [05729d1...1c585c3](https://github.com/ChromeDevTools/devtools-protocol/compare/05729d1...1c585c3)
#### `Emulation`: new command
* [`Emulation.setUserAgentOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setUserAgentOverride)
#### `Emulation`: modified command
* [`Emulation.setNavigatorOverrides`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setNavigatorOverrides) - `deprecated` added. 
#### `Network`: modified command
* [`Network.setUserAgentOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setUserAgentOverride) - `redirect` added. The parameters's `acceptLanguage` _added_. The parameters's `platform` _added_. 


## Roll protocol to r561764
###### _2018-05-24 21:16:41_ | Diff: [7369468...05729d1](https://github.com/ChromeDevTools/devtools-protocol/compare/7369468...05729d1)
#### `Network`: modified type
* [`Network.SignedExchangeSignature`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SignedExchangeSignature) - The `integrity` in the properties had `name` _updated_. The `integrity` in the properties had `description` _updated_. The `certUrl` in the properties had `name` _updated_. The `certUrl` in the properties had `description` _updated_. The `validityUrl` in the properties had `name` _updated_. The `validityUrl` in the properties had `description` _updated_. The `date` in the properties had `name` _updated_. The `date` in the properties had `description` _updated_. The `date` in the properties had `type` _updated_. The `expires` in the properties had `name` _updated_. The `expires` in the properties had `description` _updated_. The `expires` in the properties had `type` _updated_. The properties's `optional` _added_ (2 times). The properties's `date` _added_. The properties's `expires` _added_. The properties's `certificates` _added_. 


## Roll protocol to r560325
###### _2018-05-21 12:16:45_ | Diff: [375788c...7369468](https://github.com/ChromeDevTools/devtools-protocol/compare/375788c...7369468)
#### `DOMSnapshot`: new commands
* [`DOMSnapshot.disable`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#method-disable)
* [`DOMSnapshot.enable`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#method-enable)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode) - The properties's `originURL` _added_. 


## Roll protocol to r560288
###### _2018-05-21 10:16:32_ | Diff: [9ba7e8e...375788c](https://github.com/ChromeDevTools/devtools-protocol/compare/9ba7e8e...375788c)
#### `Network`: modified type
* [`Network.Initiator`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Initiator) - The `type` in the properties had `other` _updated_. The `url` in the properties had `description` _updated_. The `0` in the properties had `other` _added_. 


## Roll protocol to r559758
###### _2018-05-17 18:17:25_ | Diff: [f1dbfcc...9ba7e8e](https://github.com/ChromeDevTools/devtools-protocol/compare/f1dbfcc...9ba7e8e)
#### `Emulation`: modified command
* [`Emulation.setVirtualTimePolicy`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVirtualTimePolicy) - The return value's `virtualTimeTicksBase` _removed_. The `virtualTimeBase` in the return value had `$ref` _removed_. The `virtualTimeBase` in the return value had `name` _updated_. The `virtualTimeBase` in the return value had `description` _updated_. The return value's `type` _added_. 
#### `HeadlessExperimental`: modified command
* [`HeadlessExperimental.beginFrame`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#method-beginFrame) - The parameters's `interval` _removed_. The parameters's `noDisplayUpdates` _removed_. The parameters's `screenshot` _removed_. The `frameTime` in the parameters had `$ref` _removed_. The `deadline` in the parameters had `$ref` _removed_. The `deadlineTicks` in the parameters had `type` _removed_. The `frameTime` in the parameters had `name` _updated_. The `frameTime` in the parameters had `description` _updated_. The `frameTimeTicks` in the parameters had `name` _updated_. The `frameTimeTicks` in the parameters had `description` _updated_. The `deadline` in the parameters had `name` _updated_. The `deadline` in the parameters had `description` _updated_. The `deadlineTicks` in the parameters had `name` _updated_. The `deadlineTicks` in the parameters had `description` _updated_. The parameters's `type` _added_ (2 times). The parameters's `$ref` _added_. 


## Roll protocol to r559378
###### _2018-05-16 18:17:29_ | Diff: [fbaebb8...f1dbfcc](https://github.com/ChromeDevTools/devtools-protocol/compare/fbaebb8...f1dbfcc)
#### `Network`: new types
* [`Network.SignedExchangeSignature`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SignedExchangeSignature)
* [`Network.SignedExchangeHeader`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SignedExchangeHeader)
#### `Network`: modified type
* [`Network.SignedExchangeInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SignedExchangeInfo) - The properties's `header` _added_. The properties's `securityDetails` _added_. The properties's `errors` _added_. 


## Roll protocol to r558951
###### _2018-05-15 20:17:16_ | Diff: [089aa20...fbaebb8](https://github.com/ChromeDevTools/devtools-protocol/compare/089aa20...fbaebb8)
#### `Network`: modified type
* [`Network.ErrorReason`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-ErrorReason) - The enum's `BlockedByClient` _added_. The enum's `BlockedByResponse` _added_. 


## Roll protocol to r558587
###### _2018-05-14 19:17:03_ | Diff: [981276a...089aa20](https://github.com/ChromeDevTools/devtools-protocol/compare/981276a...089aa20)
#### `HeadlessExperimental`: removed command
* [`HeadlessExperimental.enterDeterministicMode`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#method-enterDeterministicMode)


## Roll protocol to r558111
###### _2018-05-11 21:17:36_ | Diff: [50de366...981276a](https://github.com/ChromeDevTools/devtools-protocol/compare/50de366...981276a)
#### `Network`: modified type
* [`Network.BlockedReason`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-BlockedReason) - The enum's `csp` _updated_. The enum's `mixed-content` _updated_. The enum's `origin` _updated_. The enum's `inspector` _updated_. The enum's `subresource-filter` _updated_. The enum's `content-type` _updated_. The enum's `other` _updated_. 


## Roll protocol to r557426
###### _2018-05-09 19:16:30_ | Diff: [2dd2129...50de366](https://github.com/ChromeDevTools/devtools-protocol/compare/2dd2129...50de366)
#### `Page`: modified type
* [`Page.ResourceType`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-ResourceType) - The enum's `Other` _updated_. The enum's `Other` _added_. 


## Roll protocol to r557245
###### _2018-05-09 11:16:32_ | Diff: [fe1ebc7...2dd2129](https://github.com/ChromeDevTools/devtools-protocol/compare/fe1ebc7...2dd2129)
#### `Network`: new event
* [`Network.signedExchangeReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-signedExchangeReceived)
#### `Network`: new type
* [`Network.SignedExchangeInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SignedExchangeInfo)


## Roll protocol to r556981
###### _2018-05-08 15:17:35_ | Diff: [eef9084...fe1ebc7](https://github.com/ChromeDevTools/devtools-protocol/compare/eef9084...fe1ebc7)
#### `Target`: new command
* [`Target.getBrowserContexts`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-getBrowserContexts)


## Roll protocol to r556911
###### _2018-05-08 12:17:45_ | Diff: [c3f4857...eef9084](https://github.com/ChromeDevTools/devtools-protocol/compare/c3f4857...eef9084)
#### `Target`: modified commands
* [`Target.createTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-createTarget) - The `browserContextId` in the parameters had `description` _updated_. 
* [`Target.disposeBrowserContext`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-disposeBrowserContext) - `description` updated. 


## Roll protocol to r556284
###### _2018-05-04 18:16:12_ | Diff: [e638d2b...c3f4857](https://github.com/ChromeDevTools/devtools-protocol/compare/e638d2b...c3f4857)
#### `Target`: modified commands
* [`Target.createTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-createTarget) - The `browserContextId` in the parameters had `description` _updated_. 
* [`Target.disposeBrowserContext`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-disposeBrowserContext) - `description` updated. 


## Roll protocol to r555991
###### _2018-05-03 22:17:28_ | Diff: [7fff91e...e638d2b](https://github.com/ChromeDevTools/devtools-protocol/compare/7fff91e...e638d2b)
#### `Network`: modified type
* [`Network.BlockedReason`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-BlockedReason) - The enum's `other` _updated_. The enum's `other` _added_. 


## Roll protocol to r555920
###### _2018-05-03 17:17:33_ | Diff: [71093c0...7fff91e](https://github.com/ChromeDevTools/devtools-protocol/compare/71093c0...7fff91e)
#### `Accessibility`: modified type
* [`Accessibility.AXPropertyName`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXPropertyName) - The enum's `haspopup` _updated_. 


## Roll protocol to r555642
###### _2018-05-02 18:17:15_ | Diff: [1bac408...71093c0](https://github.com/ChromeDevTools/devtools-protocol/compare/1bac408...71093c0)
#### `Target`: modified commands
* [`Target.createTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-createTarget) - The `browserContextId` in the parameters had `description` _updated_. 
* [`Target.disposeBrowserContext`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-disposeBrowserContext) - `description` updated. 


## Roll protocol to r555444
###### _2018-05-02 10:16:49_ | Diff: [3db7418...847cc8f](https://github.com/ChromeDevTools/devtools-protocol/compare/3db7418...847cc8f)
#### `Emulation`: modified command
* [`Emulation.setVirtualTimePolicy`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVirtualTimePolicy) - The parameters's `initialVirtualTime` _added_. 


## Roll protocol to r555290
###### _2018-05-01 19:36:15_ | Diff: [a4e1551...3f3afae](https://github.com/ChromeDevTools/devtools-protocol/compare/a4e1551...3f3afae)
#### `Debugger`: modified command
* [`Debugger.evaluateOnCallFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-evaluateOnCallFrame) - The parameters's `timeout` _added_. 
#### `IO`: modified command
* [`IO.read`](https://chromedevtools.github.io/devtools-protocol/tot/IO/#method-read) - The `offset` in the parameters had `description` _updated_. 
#### `Network`: new command
* [`Network.takeResponseBodyForInterceptionAsStream`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-takeResponseBodyForInterceptionAsStream)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted) - The `authChallenge` in the parameters had `$ref` _removed_. The `responseStatusCode` in the parameters had `type` _removed_. The `responseHeaders` in the parameters had `$ref` _removed_. The `redirectUrl` in the parameters had `name` _updated_. The `redirectUrl` in the parameters had `description` _updated_. The `redirectUrl` in the parameters had `type` _updated_. The `authChallenge` in the parameters had `name` _updated_. The `authChallenge` in the parameters had `description` _updated_. The `responseErrorReason` in the parameters had `name` _updated_. The `responseErrorReason` in the parameters had `description` _updated_. The `responseErrorReason` in the parameters had `$ref` _updated_. The `responseStatusCode` in the parameters had `name` _updated_. The `responseStatusCode` in the parameters had `description` _updated_. The `responseHeaders` in the parameters had `name` _updated_. The `responseHeaders` in the parameters had `description` _updated_. The parameters's `type` _added_ (2 times). The parameters's `$ref` _added_. The parameters's `responseHeaders` _added_. 
#### `Page`: new commands
* [`Page.close`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-close)
* [`Page.setWebLifecycleState`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setWebLifecycleState)
#### `Target`: modified type
* [`Target.TargetInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#type-TargetInfo) - The properties's `browserContextId` _added_. 


## Roll protocol to r552984
###### _2018-04-23 20:15:56_ | Diff: [be9625a...f92b9bc](https://github.com/ChromeDevTools/devtools-protocol/compare/be9625a...f92b9bc)
#### `Debugger`: new command
* [`Debugger.setBreakpointOnFunctionCall`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setBreakpointOnFunctionCall)


## Roll protocol to r551066
###### _2018-04-16 12:16:51_ | Diff: [fcfcf97...be9625a](https://github.com/ChromeDevTools/devtools-protocol/compare/fcfcf97...be9625a)
#### `DOMSnapshot`: modified command
* [`DOMSnapshot.getSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#method-getSnapshot) - The parameters's `includeUserAgentShadowTree` _added_. 


## Roll protocol to r550912
###### _2018-04-14 21:15:26_ | Diff: [3d34c50...fcfcf97](https://github.com/ChromeDevTools/devtools-protocol/compare/3d34c50...fcfcf97)
#### `CSS`: modified command
* [`CSS.getStyleSheetText`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getStyleSheetText) - `description` updated. 


## Roll protocol to r550912
###### _2018-04-14 20:16:17_ | Diff: [82883de...4e76695](https://github.com/ChromeDevTools/devtools-protocol/compare/82883de...4e76695)
#### `Runtime`: modified command
* [`Runtime.evaluate`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate) - The parameters's `timeout` _added_. 
#### `Runtime`: new type
* [`Runtime.TimeDelta`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-TimeDelta)


## Roll protocol to r549285
###### _2018-04-09 14:42:08_ | Diff: [269e3b9...d3103cb](https://github.com/ChromeDevTools/devtools-protocol/compare/269e3b9...d3103cb)
#### `Accessibility`: modified command
* [`Accessibility.getPartialAXTree`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#method-getPartialAXTree) - The `fetchRelatives` in the parameters had `type` _removed_. The `nodeId` in the parameters had `description` _updated_. The `fetchRelatives` in the parameters had `name` _updated_. The `fetchRelatives` in the parameters had `description` _updated_. The parameters's `optional` _added_. The parameters's `$ref` _added_. The parameters's `objectId` _added_. The parameters's `fetchRelatives` _added_. 


## Roll protocol to r548694 546310
###### _2018-04-05 23:16:18_ | Diff: [8dcb075...b4e9799](https://github.com/ChromeDevTools/devtools-protocol/compare/8dcb075...b4e9799)
#### `Page`: new event
* [`Page.navigatedWithinDocument`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-navigatedWithinDocument)


## Roll protocol to r548678
###### _2018-04-05 22:16:22_ | Diff: [1c8a690...8dcb075](https://github.com/ChromeDevTools/devtools-protocol/compare/1c8a690...8dcb075)
#### `Network`: new type
* [`Network.CertificateTransparencyCompliance`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-CertificateTransparencyCompliance)
#### `Network`: modified type
* [`Network.SecurityDetails`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SecurityDetails) - The properties's `certificateTransparencyCompliance` _added_. 


## Roll protocol to r548607
###### _2018-04-05 16:16:34_ | Diff: [9ce98fd...1c8a690](https://github.com/ChromeDevTools/devtools-protocol/compare/9ce98fd...1c8a690)
#### `Page`: new command
* [`Page.setBypassCSP`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setBypassCSP)


## Roll protocol to r548385
###### _2018-04-05 04:15:56_ | Diff: [028a567...9ce98fd](https://github.com/ChromeDevTools/devtools-protocol/compare/028a567...9ce98fd)
#### `Emulation`: modified command
* [`Emulation.setVirtualTimePolicy`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVirtualTimePolicy) - The return value's `virtualTimeTicksBase` _added_. 
#### `HeadlessExperimental`: modified command
* [`HeadlessExperimental.beginFrame`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#method-beginFrame) - The `deadline` in the parameters had `$ref` _removed_. The `interval` in the parameters had `type` _removed_. The `screenshot` in the parameters had `$ref` _removed_. The `frameTime` in the parameters had `description` _updated_. The `deadline` in the parameters had `name` _updated_. The `deadline` in the parameters had `description` _updated_. The `interval` in the parameters had `name` _updated_. The `interval` in the parameters had `description` _updated_. The `noDisplayUpdates` in the parameters had `name` _updated_. The `noDisplayUpdates` in the parameters had `description` _updated_. The `noDisplayUpdates` in the parameters had `type` _updated_. The `screenshot` in the parameters had `name` _updated_. The `screenshot` in the parameters had `description` _updated_. The parameters's `type` _added_ (2 times). The parameters's `$ref` _added_. The parameters's `noDisplayUpdates` _added_. The parameters's `screenshot` _added_. 


## Roll protocol to r548216
###### _2018-04-04 15:17:24_ | Diff: [20d9703...86650dd](https://github.com/ChromeDevTools/devtools-protocol/compare/20d9703...86650dd)
#### `Page`: modified event
* [`Page.javascriptDialogOpening`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-javascriptDialogOpening) - The `defaultPrompt` in the parameters had `optional` _removed_. The `defaultPrompt` in the parameters had `name` _updated_. The `defaultPrompt` in the parameters had `description` _updated_. The `defaultPrompt` in the parameters had `type` _updated_. The parameters's `defaultPrompt` _added_. 


## Roll protocol to r547073
###### _2018-03-29 19:17:03_ | Diff: [e367b98...914920e](https://github.com/ChromeDevTools/devtools-protocol/compare/e367b98...914920e)
#### `Page`: modified command
* [`Page.printToPDF`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF) - The `headerTemplate` in the parameters had `description` _updated_. 
#### `Security`: modified command
* [`Security.setOverrideCertificateErrors`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#method-setOverrideCertificateErrors) - `description` updated. 
#### `Security`: modified event
* [`Security.certificateError`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#event-certificateError) - `description` updated. 


## Roll protocol to r544660
###### _2018-03-21 03:16:20_ | Diff: [e4fc001...f5b1e8d](https://github.com/ChromeDevTools/devtools-protocol/compare/e4fc001...f5b1e8d)
#### `Runtime`: new commands
* [`Runtime.getIsolateId`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-getIsolateId)
* [`Runtime.getHeapUsage`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-getHeapUsage)


## Roll protocol to r544006
###### _2018-03-19 04:16:53_ | Diff: [250bac6...e4fc001](https://github.com/ChromeDevTools/devtools-protocol/compare/250bac6...e4fc001)
#### `Runtime`: new command
* [`Runtime.terminateExecution`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-terminateExecution)


## Roll protocol to r543304
###### _2018-03-14 21:16:19_ | Diff: [792ac23...250bac6](https://github.com/ChromeDevTools/devtools-protocol/compare/792ac23...250bac6)
#### `Runtime`: modified command
* [`Runtime.queryObjects`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-queryObjects) - The parameters's `objectGroup` _added_. 


## Roll protocol to r542783
###### _2018-03-13 06:16:56_ | Diff: [73a2c13...792ac23](https://github.com/ChromeDevTools/devtools-protocol/compare/73a2c13...792ac23)
#### `DOMSnapshot`: modified command
* [`DOMSnapshot.getSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#method-getSnapshot) - The parameters's `includePaintOrder` _added_. 
#### `DOMSnapshot`: modified types
* [`DOMSnapshot.InlineTextBox`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-InlineTextBox) - The `startCharacterIndex` in the properties had `description` _updated_. The `numCharacters` in the properties had `description` _updated_. 
* [`DOMSnapshot.LayoutTreeNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-LayoutTreeNode) - The properties's `paintOrder` _added_. 


## Roll protocol to r542397
###### _2018-03-11 03:15:46_ | Diff: [551a1eb...73a2c13](https://github.com/ChromeDevTools/devtools-protocol/compare/551a1eb...73a2c13)
#### `Runtime`: modified types
* [`Runtime.UnserializableValue`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-UnserializableValue) - `description` updated. 
* [`Runtime.RemoteObject`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-RemoteObject) - The `0` in the properties had `bigint` _added_. 
* [`Runtime.ObjectPreview`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-ObjectPreview) - The `0` in the properties had `bigint` _added_. 
* [`Runtime.PropertyPreview`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-PropertyPreview) - The `1` in the properties had `bigint` _added_. 


## Roll protocol to r541521
###### _2018-03-07 11:15:56 -0800_ | Diff: [6ddf2d1...551a1eb](https://github.com/ChromeDevTools/devtools-protocol/compare/6ddf2d1...551a1eb)
#### `Network`: modified event
* [`Network.requestWillBeSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestWillBeSent) - The parameters's `hasUserGesture` _added_. 


## Roll protocol to r541407
###### _2018-03-07 03:17:31 -0800_ | Diff: [3941055...6ddf2d1](https://github.com/ChromeDevTools/devtools-protocol/compare/3941055...6ddf2d1)
#### `Browser`: new command
* [`Browser.getBrowserCommandLine`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getBrowserCommandLine)
#### `Browser`: removed command
* [`Browser.getCommandLine`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getCommandLine)


## Roll protocol to r540852
###### _2018-03-05 09:16:30 -0800_ | Diff: [9aebc2d...7fc80c6](https://github.com/ChromeDevTools/devtools-protocol/compare/9aebc2d...7fc80c6)
#### `Runtime`: modified command
* [`Runtime.evaluate`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate) - The parameters's `throwOnSideEffect` _added_. 


## Roll protocol to r540814
###### _2018-03-05 06:16:48 -0800_ | Diff: [3834095...9aebc2d](https://github.com/ChromeDevTools/devtools-protocol/compare/3834095...9aebc2d)
#### `Runtime`: modified command
* [`Runtime.evaluate`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate) - The parameters's `throwOnSideEffect` _removed_. 


## Roll protocol to r540805
###### _2018-03-05 04:16:24 -0800_ | Diff: [e392c1f...3834095](https://github.com/ChromeDevTools/devtools-protocol/compare/e392c1f...3834095)
#### `HeadlessExperimental`: new command
* [`HeadlessExperimental.enterDeterministicMode`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#method-enterDeterministicMode)


## Roll protocol to r540693
###### _2018-03-02 16:16:14 -0800_ | Diff: [0a8b4ea...e392c1f](https://github.com/ChromeDevTools/devtools-protocol/compare/0a8b4ea...e392c1f)
#### `Runtime`: modified command
* [`Runtime.evaluate`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate) - The parameters's `throwOnSideEffect` _added_. 


## Roll protocol to r540265
###### _2018-03-01 12:17:20 -0800_ | Diff: [dd5f03d...0a8b4ea](https://github.com/ChromeDevTools/devtools-protocol/compare/dd5f03d...0a8b4ea)
#### `Memory`: modified type
* [`Memory.SamplingProfileNode`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#type-SamplingProfileNode) - The `count` in the properties had `name` _updated_. The `count` in the properties had `description` _updated_. 


## Roll protocol to r540157
###### _2018-03-01 07:16:55 -0800_ | Diff: [392d86b...dd5f03d](https://github.com/ChromeDevTools/devtools-protocol/compare/392d86b...dd5f03d)
#### `Runtime`: modified command
* [`Runtime.evaluate`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate) - The parameters's `throwOnSideEffect` _removed_. 


## Roll protocol to r540149
###### _2018-03-01 06:17:13 -0800_ | Diff: [7b87f78...392d86b](https://github.com/ChromeDevTools/devtools-protocol/compare/7b87f78...392d86b)
#### `CSS`: modified event
* [`CSS.fontsUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#event-fontsUpdated) - `description` updated. 
#### `CSS`: new type
* [`CSS.FontFace`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-FontFace)


## Roll protocol to r540130
###### _2018-03-01 04:16:43 -0800_ | Diff: [215f116...7b87f78](https://github.com/ChromeDevTools/devtools-protocol/compare/215f116...7b87f78)
#### `HeadlessExperimental`: modified command
* [`HeadlessExperimental.beginFrame`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#method-beginFrame) - The return value's `screenshotData` _removed_. `description` updated. The `screenshot` in the parameters had `description` _updated_. The `hasDamage` in the return value had `description` _updated_. The `mainFrameContentUpdated` in the return value had `name` _updated_. The `mainFrameContentUpdated` in the return value had `description` _updated_. The `mainFrameContentUpdated` in the return value had `type` _updated_. The return value's `optional` _added_. 
#### `HeadlessExperimental`: removed event
* [`HeadlessExperimental.mainFrameReadyForScreenshots`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#event-mainFrameReadyForScreenshots)


## Roll protocol to r540125
###### _2018-03-01 03:17:08 -0800_ | Diff: [5ef5fe2...215f116](https://github.com/ChromeDevTools/devtools-protocol/compare/5ef5fe2...215f116)
#### `Browser`: new command
* [`Browser.getCommandLine`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getCommandLine)


## Roll protocol to r540081
###### _2018-02-28 23:16:47 -0800_ | Diff: [6d37388...5ef5fe2](https://github.com/ChromeDevTools/devtools-protocol/compare/6d37388...5ef5fe2)
#### `Runtime`: modified command
* [`Runtime.evaluate`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate) - The parameters's `throwOnSideEffect` _added_. 


## Roll protocol to r539359
###### _2018-02-26 17:17:01 -0800_ | Diff: [c1c234c...6d37388](https://github.com/ChromeDevTools/devtools-protocol/compare/c1c234c...6d37388)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode) - The `isClickable` in the properties had `type` _removed_. The `eventListeners` in the properties had `items` _removed_. The `isClickable` in the properties had `name` _updated_. The `isClickable` in the properties had `description` _updated_. The `eventListeners` in the properties had `name` _updated_. The `eventListeners` in the properties had `description` _updated_. The `eventListeners` in the properties had `type` _updated_. The `currentSourceURL` in the properties had `name` _updated_. The `currentSourceURL` in the properties had `description` _updated_. The `currentSourceURL` in the properties had `type` _updated_. The properties's `$ref` _added_. The properties's `items` _added_. The properties's `currentSourceURL` _added_. 


## Roll protocol to r536902
###### _2018-02-14 16:16:08 -0800_ | Diff: [28c2256...4bb1064](https://github.com/ChromeDevTools/devtools-protocol/compare/28c2256...4bb1064)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.InlineTextBox`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-InlineTextBox) - The `startCharacterIndex` in the properties had `description` _updated_. The `numCharacters` in the properties had `description` _updated_. 


## Roll protocol to r535969
###### _2018-02-10 00:15:46 -0800_ | Diff: [33149ca...28c2256](https://github.com/ChromeDevTools/devtools-protocol/compare/33149ca...28c2256)
#### `Memory`: new command
* [`Memory.getBrowserSamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-getBrowserSamplingProfile)
#### `Memory`: modified command
* [`Memory.getAllTimeSamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-getAllTimeSamplingProfile) - `description` updated. 


## Roll protocol to r533104
###### _2018-01-30 16:16:07 -0800_ | Diff: [50ba84b...a1f43fb](https://github.com/ChromeDevTools/devtools-protocol/compare/50ba84b...a1f43fb)
#### `Target`: removed command
* [`Target.setAttachToFrames`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setAttachToFrames)


## Roll protocol to r532981
###### _2018-01-30 11:15:57 -0800_ | Diff: [449767c...1a3a261](https://github.com/ChromeDevTools/devtools-protocol/compare/449767c...1a3a261)
#### `Page`: modified command
* [`Page.printToPDF`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF) - The parameters's `preferCSSPageSize` _added_. 


## Roll protocol to r532683
###### _2018-01-29 16:16:05 -0800_ | Diff: [e3e1778...449767c](https://github.com/ChromeDevTools/devtools-protocol/compare/e3e1778...449767c)
#### `CSS`: modified command
* [`CSS.stopRuleUsageTracking`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-stopRuleUsageTracking) - `description` updated. 


## Roll protocol to r532239
###### _2018-01-27 10:15:37 -0800_ | Diff: [c80303f...e3e1778](https://github.com/ChromeDevTools/devtools-protocol/compare/c80303f...e3e1778)
#### `Memory`: new command
* [`Memory.getAllTimeSamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-getAllTimeSamplingProfile)
#### `Memory`: modified command
* [`Memory.getSamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-getSamplingProfile) - `description` updated. 


## Roll protocol to r532143
###### _2018-01-26 19:15:57 -0800_ | Diff: [38926f7...c80303f](https://github.com/ChromeDevTools/devtools-protocol/compare/38926f7...c80303f)
#### `Page`: modified command
* [`Page.navigate`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigate) - The parameters's `frameId` _added_. 


## Roll protocol to r531658
###### _2018-01-24 12:15:46 -0800_ | Diff: [dfe55cf...38926f7](https://github.com/ChromeDevTools/devtools-protocol/compare/dfe55cf...38926f7)
#### `Inspector`: new event
* [`Inspector.targetReloadedAfterCrash`](https://chromedevtools.github.io/devtools-protocol/tot/Inspector/#event-targetReloadedAfterCrash)


## Roll protocol to r531129
###### _2018-01-22 18:16:00 -0800_ | Diff: [77a647f...dfe55cf](https://github.com/ChromeDevTools/devtools-protocol/compare/77a647f...dfe55cf)
#### `Input`: modified command
* [`Input.emulateTouchFromMouseEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-emulateTouchFromMouseEvent) - The `timestamp` in the parameters had `description` _updated_. 


## Roll protocol to r530993
###### _2018-01-22 13:15:56 -0800_ | Diff: [1ecb1dc...77a647f](https://github.com/ChromeDevTools/devtools-protocol/compare/1ecb1dc...77a647f)
#### `Memory`: new commands
* [`Memory.startSampling`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-startSampling)
* [`Memory.stopSampling`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-stopSampling)
* [`Memory.getSamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-getSamplingProfile)
#### `Memory`: new types
* [`Memory.SamplingProfileNode`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#type-SamplingProfileNode)
* [`Memory.SamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#type-SamplingProfile)


## Roll protocol to r530967
###### _2018-01-22 12:15:52 -0800_ | Diff: [bf24ee4...1ecb1dc](https://github.com/ChromeDevTools/devtools-protocol/compare/bf24ee4...1ecb1dc)
#### `Input`: modified command
* [`Input.emulateTouchFromMouseEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-emulateTouchFromMouseEvent) - The `timestamp` in the parameters had `$ref` _removed_. The `button` in the parameters had `type` _removed_. The `button` in the parameters had `enum` _removed_. The `timestamp` in the parameters had `name` _updated_. The `timestamp` in the parameters had `description` _updated_. The `button` in the parameters had `name` _updated_. The `button` in the parameters had `description` _updated_. The parameters's `type` _added_. The parameters's `enum` _added_. The parameters's `optional` _added_. The parameters's `$ref` _added_. 


## Roll protocol to r530836
###### _2018-01-22 03:16:04 -0800_ | Diff: [8f8d2e4...bf24ee4](https://github.com/ChromeDevTools/devtools-protocol/compare/8f8d2e4...bf24ee4)
#### `Memory`: removed commands
* [`Memory.startSampling`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-startSampling)
* [`Memory.stopSampling`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-stopSampling)
* [`Memory.getSamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-getSamplingProfile)
#### `Memory`: removed types
* [`Memory.SamplingProfileNode`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#type-SamplingProfileNode)
* [`Memory.SamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#type-SamplingProfile)


## Roll protocol to r530755
###### _2018-01-19 21:15:46 -0800_ | Diff: [e813152...8f8d2e4](https://github.com/ChromeDevTools/devtools-protocol/compare/e813152...8f8d2e4)
#### `DOM`: new command
* [`DOM.getFrameOwner`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getFrameOwner)
#### `Memory`: new commands
* [`Memory.startSampling`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-startSampling)
* [`Memory.stopSampling`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-stopSampling)
* [`Memory.getSamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-getSamplingProfile)
#### `Memory`: new types
* [`Memory.SamplingProfileNode`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#type-SamplingProfileNode)
* [`Memory.SamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#type-SamplingProfile)


## Roll protocol to r530611
###### _2018-01-19 13:15:39 -0800_ | Diff: [f46e9df...e813152](https://github.com/ChromeDevTools/devtools-protocol/compare/f46e9df...e813152)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode) - The properties's `currentSourceURL` _added_. 


## Roll protocol to r529963
###### _2018-01-17 16:16:10 -0800_ | Diff: [d388c24...f46e9df](https://github.com/ChromeDevTools/devtools-protocol/compare/d388c24...f46e9df)
#### `HeadlessExperimental`: modified command
* [`HeadlessExperimental.beginFrame`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#method-beginFrame) - The `screenshot` in the parameters had `$ref` _removed_. The `screenshot` in the parameters had `name` _updated_. The `screenshot` in the parameters had `description` _updated_. The parameters's `type` _added_. The parameters's `screenshot` _added_. 


## Roll protocol to r528753
###### _2018-01-11 13:15:46 -0800_ | Diff: [ffcb5e6...252a483](https://github.com/ChromeDevTools/devtools-protocol/compare/ffcb5e6...252a483)
#### `Network`: new command
* [`Network.getRequestPostData`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getRequestPostData)
#### `Network`: modified command
* [`Network.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-enable) - The parameters's `maxPostDataSize` _added_. 
#### `Network`: modified type
* [`Network.Request`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Request) - The `mixedContentType` in the properties had `$ref` _removed_. The `referrerPolicy` in the properties had `type` _removed_. The `referrerPolicy` in the properties had `enum` _removed_. The `isLinkPreload` in the properties had `optional` _removed_. The `mixedContentType` in the properties had `name` _updated_. The `mixedContentType` in the properties had `description` _updated_. The `initialPriority` in the properties had `name` _updated_. The `initialPriority` in the properties had `description` _updated_. The `initialPriority` in the properties had `$ref` _updated_. The `referrerPolicy` in the properties had `name` _updated_. The `referrerPolicy` in the properties had `description` _updated_. The `isLinkPreload` in the properties had `name` _updated_. The `isLinkPreload` in the properties had `description` _updated_. The `isLinkPreload` in the properties had `type` _updated_. The properties's `type` _added_. The properties's `optional` _added_. The properties's `$ref` _added_. The properties's `enum` _added_. The properties's `isLinkPreload` _added_. 


## Roll protocol to r528498
###### _2018-01-10 16:15:41 -0800_ | Diff: [75a38f8...ffcb5e6](https://github.com/ChromeDevTools/devtools-protocol/compare/75a38f8...ffcb5e6)
#### `Browser`: new commands
* [`Browser.getHistograms`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getHistograms)
* [`Browser.getHistogram`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getHistogram)
#### `Browser`: new types
* [`Browser.Bucket`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-Bucket)
* [`Browser.Histogram`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-Histogram)


## Roll protocol to r528271
###### _2018-01-10 02:15:56 -0800_ | Diff: [ba5cbc1...75a38f8](https://github.com/ChromeDevTools/devtools-protocol/compare/ba5cbc1...75a38f8)
#### `Emulation`: modified command
* [`Emulation.setVirtualTimePolicy`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVirtualTimePolicy) - The parameters's `waitForNavigation` _added_. 


## Roll protocol to r528237
###### _2018-01-09 20:15:50 -0800_ | Diff: [978dbaa...ba5cbc1](https://github.com/ChromeDevTools/devtools-protocol/compare/978dbaa...ba5cbc1)
#### `Page`: new command
* [`Page.crash`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-crash)


## Roll protocol to r527612
###### _2018-01-08 04:15:43 -0800_ | Diff: [0f2584d...978dbaa](https://github.com/ChromeDevTools/devtools-protocol/compare/0f2584d...978dbaa)
#### `DOMSnapshot`: modified command
* [`DOMSnapshot.getSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#method-getSnapshot) - The parameters's `includeEventListeners` _added_. 
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode) - The properties's `eventListeners` _added_. 


## Roll protocol to r526633
###### _2018-01-02 22:15:35 -0800_ | Diff: [cc1c2f4...0f2584d](https://github.com/ChromeDevTools/devtools-protocol/compare/cc1c2f4...0f2584d)
#### `Network`: modified event
* [`Network.loadingFinished`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-loadingFinished) - The parameters's `blockedCrossSiteDocument` _added_. 


## Roll protocol to r526584
###### _2018-01-02 18:15:45 -0800_ | Diff: [5f10915...cc1c2f4](https://github.com/ChromeDevTools/devtools-protocol/compare/5f10915...cc1c2f4)
#### `Page`: removed command
* [`Page.setAutoAttachToCreatedPages`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setAutoAttachToCreatedPages)


## Roll protocol to r525305
###### _2017-12-20 03:16:10 -0800_ | Diff: [5325d5e...5f10915](https://github.com/ChromeDevTools/devtools-protocol/compare/5325d5e...5f10915)
#### `Security`: new command
* [`Security.setIgnoreCertificateErrors`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#method-setIgnoreCertificateErrors)
#### `Security`: modified commands
* [`Security.handleCertificateError`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#method-handleCertificateError) - `deprecated` added. 
* [`Security.setOverrideCertificateErrors`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#method-setOverrideCertificateErrors) - `deprecated` added. 
#### `Security`: modified event
* [`Security.certificateError`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#event-certificateError) - `description` updated. `deprecated` added. 


## Roll protocol to r524155
###### _2017-12-14 12:15:45 -0800_ | Diff: [0956b7c...5325d5e](https://github.com/ChromeDevTools/devtools-protocol/compare/0956b7c...5325d5e)
#### `Page`: modified command
* [`Page.reload`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-reload) - The `scriptToEvaluateOnLoad` in the parameters had `description` _updated_. 


## Roll protocol to r524136
###### _2017-12-14 11:16:05 -0800_ | Diff: [1cdc73b...0956b7c](https://github.com/ChromeDevTools/devtools-protocol/compare/1cdc73b...0956b7c)
#### `Security`: modified type
* [`Security.SecurityStateExplanation`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#type-SecurityStateExplanation) - The `mixedContentType` in the properties had `$ref` _removed_. The `certificate` in the properties had `type` _removed_. The `certificate` in the properties had `items` _removed_. The `summary` in the properties had `name` _updated_. The `summary` in the properties had `description` _updated_. The `description` in the properties had `name` _updated_. The `description` in the properties had `description` _updated_. The `mixedContentType` in the properties had `name` _updated_. The `mixedContentType` in the properties had `description` _updated_. The `certificate` in the properties had `name` _updated_. The `certificate` in the properties had `description` _updated_. The properties's `type` _added_. The properties's `$ref` _added_. The properties's `certificate` _added_. 


## Roll protocol to r523966
###### _2017-12-13 17:15:41 -0800_ | Diff: [d620873...1cdc73b](https://github.com/ChromeDevTools/devtools-protocol/compare/d620873...1cdc73b)
#### `Page`: modified command
* [`Page.printToPDF`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF) - The parameters's `headerTemplate` _added_. The parameters's `footerTemplate` _added_. 


## Roll protocol to r522771 520620
###### _2017-12-08 05:15:43 -0800_ | Diff: [e755d8d...257859e](https://github.com/ChromeDevTools/devtools-protocol/compare/e755d8d...257859e)
#### `Console`: modified command
* [`Console.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Console/#method-enable) - `description` updated. 
#### `Debugger`: modified commands
* [`Debugger.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-enable) - `description` updated. 
* [`Debugger.evaluateOnCallFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-evaluateOnCallFrame) - The `objectGroup` in the parameters had `description` _updated_. The `includeCommandLineAPI` in the parameters had `description` _updated_. The `silent` in the parameters had `description` _updated_. 
* [`Debugger.getPossibleBreakpoints`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getPossibleBreakpoints) - `description` updated. The `end` in the parameters had `description` _updated_. 
* [`Debugger.scheduleStepIntoAsync`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-scheduleStepIntoAsync) - `description` updated. 
* [`Debugger.setAsyncCallStackDepth`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setAsyncCallStackDepth) - The `maxDepth` in the parameters had `description` _updated_. 
* [`Debugger.setBlackboxPatterns`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setBlackboxPatterns) - `description` updated. 
* [`Debugger.setBlackboxedRanges`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setBlackboxedRanges) - `description` updated. 
* [`Debugger.setBreakpoint`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setBreakpoint) - The `condition` in the parameters had `description` _updated_. 
* [`Debugger.setBreakpointByUrl`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setBreakpointByUrl) - `description` updated. The `urlRegex` in the parameters had `description` _updated_. The `condition` in the parameters had `description` _updated_. 
* [`Debugger.setPauseOnExceptions`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setPauseOnExceptions) - `description` updated. 
* [`Debugger.setScriptSource`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setScriptSource) - The `dryRun` in the parameters had `description` _updated_. 
* [`Debugger.setVariableValue`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setVariableValue) - `description` updated. The `scopeNumber` in the parameters had `description` _updated_. 
* [`Debugger.stepInto`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-stepInto) - The `breakOnAsyncCall` in the parameters had `description` _updated_. 
#### `Debugger`: modified events
* [`Debugger.paused`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-paused) - The `asyncCallStackTraceId` in the parameters had `description` _updated_. 
* [`Debugger.scriptParsed`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-scriptParsed) - `description` updated. 
#### `Debugger`: modified type
* [`Debugger.Scope`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-Scope) - The `object` in the properties had `description` _updated_. 
#### `HeapProfiler`: modified commands
* [`HeapProfiler.addInspectedHeapObject`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#method-addInspectedHeapObject) - `description` updated. 
* [`HeapProfiler.startSampling`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#method-startSampling) - The `samplingInterval` in the parameters had `description` _updated_. 
* [`HeapProfiler.stopTrackingHeapObjects`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#method-stopTrackingHeapObjects) - The `reportProgress` in the parameters had `description` _updated_. 
#### `HeapProfiler`: modified events
* [`HeapProfiler.heapStatsUpdate`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#event-heapStatsUpdate) - The `statsUpdate` in the parameters had `description` _updated_. 
* [`HeapProfiler.lastSeenObjectId`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#event-lastSeenObjectId) - `description` updated. 
#### `Profiler`: modified commands
* [`Profiler.getBestEffortCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-getBestEffortCoverage) - `description` updated. 
* [`Profiler.startPreciseCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-startPreciseCoverage) - `description` updated. 
* [`Profiler.stopPreciseCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-stopPreciseCoverage) - `description` updated. 
* [`Profiler.takePreciseCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-takePreciseCoverage) - `description` updated. 
#### `Profiler`: modified types
* [`Profiler.ProfileNode`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-ProfileNode) - The `deoptReason` in the properties had `description` _updated_. 
* [`Profiler.Profile`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-Profile) - The `timeDeltas` in the properties had `description` _updated_. 
#### `Runtime`: modified commands
* [`Runtime.callFunctionOn`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-callFunctionOn) - `description` updated. The `objectId` in the parameters had `description` _updated_. The `arguments` in the parameters had `description` _updated_. The `silent` in the parameters had `description` _updated_. The `awaitPromise` in the parameters had `description` _updated_. The `executionContextId` in the parameters had `description` _updated_. The `objectGroup` in the parameters had `description` _updated_. 
* [`Runtime.compileScript`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-compileScript) - The `executionContextId` in the parameters had `description` _updated_. 
* [`Runtime.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-enable) - `description` updated. 
* [`Runtime.evaluate`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate) - The `silent` in the parameters had `description` _updated_. The `contextId` in the parameters had `description` _updated_. The `awaitPromise` in the parameters had `description` _updated_. 
* [`Runtime.getProperties`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-getProperties) - `description` updated. The `ownProperties` in the parameters had `description` _updated_. The `accessorPropertiesOnly` in the parameters had `description` _updated_. 
* [`Runtime.runScript`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-runScript) - The `executionContextId` in the parameters had `description` _updated_. The `silent` in the parameters had `description` _updated_. The `awaitPromise` in the parameters had `description` _updated_. 
#### `Runtime`: modified events
* [`Runtime.consoleAPICalled`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-consoleAPICalled) - The `context` in the parameters had `description` _updated_. 
* [`Runtime.inspectRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-inspectRequested) - `description` updated. 
#### `Runtime`: modified types
* [`Runtime.RemoteObject`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-RemoteObject) - The `unserializableValue` in the properties had `description` _updated_. 
* [`Runtime.PropertyDescriptor`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-PropertyDescriptor) - The `get` in the properties had `description` _updated_. The `set` in the properties had `description` _updated_. The `configurable` in the properties had `description` _updated_. The `enumerable` in the properties had `description` _updated_. 
* [`Runtime.CallArgument`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-CallArgument) - `description` updated. 
* [`Runtime.ExecutionContextDescription`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-ExecutionContextDescription) - The `id` in the properties had `description` _updated_. 
* [`Runtime.ExceptionDetails`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-ExceptionDetails) - `description` updated. 
* [`Runtime.StackTrace`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-StackTrace) - The `description` in the properties had `description` _updated_. 
* [`Runtime.StackTraceId`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-StackTraceId) - `description` updated. 


## Roll protocol to r522695
###### _2017-12-07 19:16:02 -0800_ | Diff: [5cf9fe1...e755d8d](https://github.com/ChromeDevTools/devtools-protocol/compare/5cf9fe1...e755d8d)
#### `IndexedDB`: new command
* [`IndexedDB.deleteObjectStoreEntries`](https://chromedevtools.github.io/devtools-protocol/tot/IndexedDB/#method-deleteObjectStoreEntries)


## Roll protocol to r522024
###### _2017-12-05 22:15:31 -0800_ | Diff: [d7f4617...5cf9fe1](https://github.com/ChromeDevTools/devtools-protocol/compare/d7f4617...5cf9fe1)
#### `Tracing`: modified command
* [`Tracing.start`](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#method-start) - The `streamCompression` in the parameters had `description` _updated_. 


## Roll protocol to r521951
###### _2017-12-05 18:15:33 -0800_ | Diff: [ddbd496...d7f4617](https://github.com/ChromeDevTools/devtools-protocol/compare/ddbd496...d7f4617)
#### `Tracing`: modified command
* [`Tracing.start`](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#method-start) - The `traceConfig` in the parameters had `name` _updated_. The `traceConfig` in the parameters had `$ref` _updated_. The parameters's `description` _added_. The parameters's `traceConfig` _added_. 
#### `Tracing`: modified event
* [`Tracing.tracingComplete`](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#event-tracingComplete) - The parameters's `streamCompression` _added_. 
#### `Tracing`: new type
* [`Tracing.StreamCompression`](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#type-StreamCompression)


## Roll protocol to r521854
###### _2017-12-05 14:15:34 -0800_ | Diff: [5e7327e...ddbd496](https://github.com/ChromeDevTools/devtools-protocol/compare/5e7327e...ddbd496)
#### `Accessibility`: modified command
* [`Accessibility.getPartialAXTree`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#method-getPartialAXTree) - The `nodes` in the return value had `description` _updated_. 
#### `Accessibility`: modified type
* [`Accessibility.AXPropertyName`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXPropertyName) - `description` updated. 
#### `Animation`: modified type
* [`Animation.Animation`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-Animation) - The `cssId` in the properties had `description` _updated_. 
#### `ApplicationCache`: modified command
* [`ApplicationCache.getFramesWithManifests`](https://chromedevtools.github.io/devtools-protocol/tot/ApplicationCache/#method-getFramesWithManifests) - `description` updated. The `frameIds` in the return value had `description` _updated_. 
#### `Audits`: modified command
* [`Audits.getEncodedResponse`](https://chromedevtools.github.io/devtools-protocol/tot/Audits/#method-getEncodedResponse) - `description` updated. 
#### `Browser`: modified commands
* [`Browser.getWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowBounds) - The `bounds` in the return value had `description` _updated_. 
* [`Browser.getWindowForTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowForTarget) - The `bounds` in the return value had `description` _updated_. 
* [`Browser.setWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-setWindowBounds) - The `bounds` in the parameters had `description` _updated_. 
#### `CSS`: modified commands
* [`CSS.addRule`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-addRule) - `description` updated. 
* [`CSS.enable`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-enable) - `description` updated. 
* [`CSS.forcePseudoState`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-forcePseudoState) - `description` updated. 
* [`CSS.getBackgroundColors`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getBackgroundColors) - The `backgroundColors` in the return value had `description` _updated_. The `computedFontWeight` in the return value had `description` _updated_. 
* [`CSS.getInlineStylesForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getInlineStylesForNode) - `description` updated. 
* [`CSS.getPlatformFontsForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getPlatformFontsForNode) - `description` updated. 
* [`CSS.setEffectivePropertyValueForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-setEffectivePropertyValueForNode) - `description` updated. 
* [`CSS.takeCoverageDelta`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-takeCoverageDelta) - `description` updated. 
#### `CSS`: modified event
* [`CSS.mediaQueryResultChanged`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#event-mediaQueryResultChanged) - `description` updated. 
#### `CSS`: modified types
* [`CSS.StyleSheetOrigin`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-StyleSheetOrigin) - `description` updated. 
* [`CSS.CSSStyleSheetHeader`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSStyleSheetHeader) - The `isInline` in the properties had `description` _updated_. 
* [`CSS.CSSRule`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSRule) - The `styleSheetId` in the properties had `description` _updated_. The `media` in the properties had `description` _updated_. 
* [`CSS.RuleUsage`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-RuleUsage) - The `styleSheetId` in the properties had `description` _updated_. 
* [`CSS.CSSStyle`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSStyle) - The `styleSheetId` in the properties had `description` _updated_. 
* [`CSS.CSSMedia`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSMedia) - The `source` in the properties had `description` _updated_. The `range` in the properties had `description` _updated_. 
* [`CSS.CSSKeyframeRule`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSKeyframeRule) - The `styleSheetId` in the properties had `description` _updated_. 
#### `DOM`: modified commands
* [`DOM.copyTo`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-copyTo) - `description` updated. The `insertBeforeNodeId` in the parameters had `description` _updated_. 
* [`DOM.describeNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-describeNode) - `description` updated. The `depth` in the parameters had `description` _updated_. The `pierce` in the parameters had `description` _updated_. 
* [`DOM.discardSearchResults`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-discardSearchResults) - `description` updated. 
* [`DOM.getDocument`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getDocument) - The `depth` in the parameters had `description` _updated_. The `pierce` in the parameters had `description` _updated_. 
* [`DOM.getFlattenedDocument`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getFlattenedDocument) - The `depth` in the parameters had `description` _updated_. The `pierce` in the parameters had `description` _updated_. 
* [`DOM.getSearchResults`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getSearchResults) - `description` updated. 
* [`DOM.moveTo`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-moveTo) - The `insertBeforeNodeId` in the parameters had `description` _updated_. 
* [`DOM.performSearch`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-performSearch) - `description` updated. 
* [`DOM.pushNodesByBackendIdsToFrontend`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-pushNodesByBackendIdsToFrontend) - The `nodeIds` in the return value had `description` _updated_. 
* [`DOM.requestChildNodes`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-requestChildNodes) - `description` updated. The `depth` in the parameters had `description` _updated_. The `pierce` in the parameters had `description` _updated_. 
* [`DOM.requestNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-requestNode) - `description` updated. 
* [`DOM.setAttributesAsText`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setAttributesAsText) - `description` updated. The `name` in the parameters had `description` _updated_. 
* [`DOM.setInspectedNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setInspectedNode) - `description` updated. 
#### `DOM`: modified event
* [`DOM.setChildNodes`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-setChildNodes) - `description` updated. 
#### `DOM`: modified types
* [`DOM.BackendNodeId`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-BackendNodeId) - `description` updated. 
* [`DOM.Node`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-Node) - `description` updated. The `nodeId` in the properties had `description` _updated_. 
#### `DOMDebugger`: modified commands
* [`DOMDebugger.getEventListeners`](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger/#method-getEventListeners) - The `depth` in the parameters had `description` _updated_. The `pierce` in the parameters had `description` _updated_. 
* [`DOMDebugger.setEventListenerBreakpoint`](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger/#method-setEventListenerBreakpoint) - The `targetName` in the parameters had `description` _updated_. 
#### `DOMSnapshot`: modified command
* [`DOMSnapshot.getSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#method-getSnapshot) - `description` updated. 
#### `DOMSnapshot`: modified types
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode) - The `childNodeIndexes` in the properties had `description` _updated_. The `pseudoElementIndexes` in the properties had `description` _updated_. The `layoutNodeIndex` in the properties had `description` _updated_. The `contentDocumentIndex` in the properties had `description` _updated_. The `importedDocumentIndex` in the properties had `description` _updated_. The `templateContentIndex` in the properties had `description` _updated_. The `isClickable` in the properties had `description` _updated_. 
* [`DOMSnapshot.InlineTextBox`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-InlineTextBox) - `description` updated. 
#### `Emulation`: modified commands
* [`Emulation.setDefaultBackgroundColorOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDefaultBackgroundColorOverride) - `description` updated. The `color` in the parameters had `description` _updated_. 
* [`Emulation.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDeviceMetricsOverride) - `description` updated. The `mobile` in the parameters had `description` _updated_. The `viewport` in the parameters had `description` _updated_. 
* [`Emulation.setGeolocationOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setGeolocationOverride) - `description` updated. 
* [`Emulation.setVirtualTimePolicy`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVirtualTimePolicy) - `description` updated. The `budget` in the parameters had `description` _updated_. The `maxVirtualTimeTaskStarvationCount` in the parameters had `description` _updated_. 
* [`Emulation.setVisibleSize`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVisibleSize) - `description` updated. 
#### `Emulation`: modified events
* [`Emulation.virtualTimeAdvanced`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeAdvanced) - The `virtualTimeElapsed` in the parameters had `description` _updated_. 
* [`Emulation.virtualTimePaused`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimePaused) - The `virtualTimeElapsed` in the parameters had `description` _updated_. 
#### `Emulation`: modified type
* [`Emulation.VirtualTimePolicy`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#type-VirtualTimePolicy) - `description` updated. 
#### `HeadlessExperimental`: modified command
* [`HeadlessExperimental.beginFrame`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#method-beginFrame) - `description` updated. The `frameTime` in the parameters had `description` _updated_. The `deadline` in the parameters had `description` _updated_. The `interval` in the parameters had `description` _updated_. The `screenshot` in the parameters had `description` _updated_. The `hasDamage` in the return value had `description` _updated_. 
#### `HeadlessExperimental`: modified event
* [`HeadlessExperimental.mainFrameReadyForScreenshots`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#event-mainFrameReadyForScreenshots) - `description` updated. 
#### `IO`: modified command
* [`IO.read`](https://chromedevtools.github.io/devtools-protocol/tot/IO/#method-read) - The `offset` in the parameters had `description` _updated_. 
#### `IO`: modified type
* [`IO.StreamHandle`](https://chromedevtools.github.io/devtools-protocol/tot/IO/#type-StreamHandle) - `description` updated. 
#### `Input`: modified commands
* [`Input.dispatchKeyEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchKeyEvent) - The `modifiers` in the parameters had `description` _updated_. The `text` in the parameters had `description` _updated_. The `unmodifiedText` in the parameters had `description` _updated_. The `key` in the parameters had `description` _updated_. The `location` in the parameters had `description` _updated_. 
* [`Input.dispatchMouseEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchMouseEvent) - The `y` in the parameters had `description` _updated_. The `modifiers` in the parameters had `description` _updated_. 
* [`Input.dispatchTouchEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchTouchEvent) - The `type` in the parameters had `description` _updated_. The `touchPoints` in the parameters had `description` _updated_. The `modifiers` in the parameters had `description` _updated_. 
* [`Input.emulateTouchFromMouseEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-emulateTouchFromMouseEvent) - The `modifiers` in the parameters had `description` _updated_. 
* [`Input.synthesizePinchGesture`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-synthesizePinchGesture) - The `gestureSourceType` in the parameters had `description` _updated_. 
* [`Input.synthesizeScrollGesture`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-synthesizeScrollGesture) - The `xOverscroll` in the parameters had `description` _updated_. The `yOverscroll` in the parameters had `description` _updated_. The `gestureSourceType` in the parameters had `description` _updated_. 
* [`Input.synthesizeTapGesture`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-synthesizeTapGesture) - The `gestureSourceType` in the parameters had `description` _updated_. 
#### `Input`: modified type
* [`Input.TouchPoint`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#type-TouchPoint) - The `y` in the properties had `description` _updated_. 
#### `LayerTree`: modified type
* [`LayerTree.Layer`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#type-Layer) - The `drawsContent` in the properties had `description` _updated_. 
#### `Log`: modified command
* [`Log.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Log/#method-enable) - `description` updated. 
#### `Network`: modified commands
* [`Network.continueInterceptedRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-continueInterceptedRequest) - `description` updated. The `errorReason` in the parameters had `description` _updated_. The `rawResponse` in the parameters had `description` _updated_. The `url` in the parameters had `description` _updated_. The `method` in the parameters had `description` _updated_. The `headers` in the parameters had `description` _updated_. 
* [`Network.deleteCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-deleteCookies) - The `url` in the parameters had `description` _updated_. 
* [`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getAllCookies) - `description` updated. 
* [`Network.getCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getCookies) - `description` updated. 
* [`Network.replayXHR`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-replayXHR) - `description` updated. 
* [`Network.setCookie`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCookie) - The `url` in the parameters had `description` _updated_. 
* [`Network.setRequestInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setRequestInterception) - The `patterns` in the parameters had `description` _updated_. 
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted) - `description` updated. The `interceptionId` in the parameters had `description` _updated_. The `authChallenge` in the parameters had `description` _updated_. The `responseErrorReason` in the parameters had `description` _updated_. The `responseStatusCode` in the parameters had `description` _updated_. The `responseHeaders` in the parameters had `description` _updated_. 
#### `Network`: modified types
* [`Network.CookieSameSite`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-CookieSameSite) - `description` updated. 
* [`Network.ResourceTiming`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-ResourceTiming) - The `requestTime` in the properties had `description` _updated_. 
* [`Network.Initiator`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Initiator) - The `lineNumber` in the properties had `description` _updated_. 
* [`Network.CookieParam`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-CookieParam) - The `url` in the properties had `description` _updated_. 
* [`Network.AuthChallengeResponse`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-AuthChallengeResponse) - The `response` in the properties had `description` _updated_. The `username` in the properties had `description` _updated_. The `password` in the properties had `description` _updated_. 
* [`Network.InterceptionStage`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-InterceptionStage) - `description` updated. 
* [`Network.RequestPattern`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-RequestPattern) - The `urlPattern` in the properties had `description` _updated_. 
#### `Overlay`: modified commands
* [`Overlay.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightNode) - `description` updated. 
* [`Overlay.setInspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setInspectMode) - `description` updated. The `highlightConfig` in the parameters had `description` _updated_. 
#### `Overlay`: modified event
* [`Overlay.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#event-inspectNodeRequested) - `description` updated. 
#### `Page`: modified commands
* [`Page.createIsolatedWorld`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-createIsolatedWorld) - The `grantUniveralAccess` in the parameters had `description` _updated_. 
* [`Page.getCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getCookies) - `description` updated. 
* [`Page.handleJavaScriptDialog`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-handleJavaScriptDialog) - The `promptText` in the parameters had `description` _updated_. 
* [`Page.printToPDF`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF) - The `pageRanges` in the parameters had `description` _updated_. The `ignoreInvalidPageRanges` in the parameters had `description` _updated_. 
* [`Page.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDeviceMetricsOverride) - `description` updated. The `mobile` in the parameters had `description` _updated_. 
* [`Page.setDownloadBehavior`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDownloadBehavior) - The `behavior` in the parameters had `description` _updated_. 
* [`Page.setGeolocationOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setGeolocationOverride) - `description` updated. 
#### `Page`: modified events
* [`Page.frameScheduledNavigation`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameScheduledNavigation) - The `delay` in the parameters had `description` _updated_. 
* [`Page.javascriptDialogClosed`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-javascriptDialogClosed) - `description` updated. 
* [`Page.javascriptDialogOpening`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-javascriptDialogOpening) - `description` updated. 
* [`Page.windowOpen`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-windowOpen) - `description` updated. 
#### `Security`: modified command
* [`Security.setOverrideCertificateErrors`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#method-setOverrideCertificateErrors) - `description` updated. 
#### `Security`: modified events
* [`Security.certificateError`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#event-certificateError) - `description` updated. 
* [`Security.securityStateChanged`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#event-securityStateChanged) - The `explanations` in the parameters had `description` _updated_. 
#### `Security`: modified types
* [`Security.MixedContentType`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#type-MixedContentType) - `description` updated. 
* [`Security.InsecureContentStatus`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#type-InsecureContentStatus) - The `ranContentWithCertErrors` in the properties had `description` _updated_. The `displayedContentWithCertErrors` in the properties had `description` _updated_. 
* [`Security.CertificateErrorAction`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#type-CertificateErrorAction) - `description` updated. 
#### `ServiceWorker`: modified type
* [`ServiceWorker.ServiceWorkerVersion`](https://chromedevtools.github.io/devtools-protocol/tot/ServiceWorker/#type-ServiceWorkerVersion) - The `scriptResponseTime` in the properties had `description` _updated_. 
#### `SystemInfo`: modified command
* [`SystemInfo.getInfo`](https://chromedevtools.github.io/devtools-protocol/tot/SystemInfo/#method-getInfo) - The `modelName` in the return value had `description` _updated_. The `modelVersion` in the return value had `description` _updated_. The `commandLine` in the return value had `description` _updated_. 
#### `Target`: modified commands
* [`Target.createBrowserContext`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-createBrowserContext) - `description` updated. 
* [`Target.createTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-createTarget) - The `enableBeginFrameControl` in the parameters had `description` _updated_. 
* [`Target.setAutoAttach`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setAutoAttach) - `description` updated. The `waitForDebuggerOnStart` in the parameters had `description` _updated_. 
* [`Target.setDiscoverTargets`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setDiscoverTargets) - `description` updated. 
* [`Target.setRemoteLocations`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setRemoteLocations) - `description` updated. 
#### `Target`: modified events
* [`Target.detachedFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-detachedFromTarget) - `description` updated. 
* [`Target.receivedMessageFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-receivedMessageFromTarget) - `description` updated. 
* [`Target.targetInfoChanged`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-targetInfoChanged) - `description` updated. 
#### `Tracing`: modified command
* [`Tracing.start`](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#method-start) - The `transferMode` in the parameters had `description` _updated_. 
#### `Tracing`: modified events
* [`Tracing.bufferUsage`](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#event-bufferUsage) - The `percentFull` in the parameters had `description` _updated_. The `value` in the parameters had `description` _updated_. 
* [`Tracing.dataCollected`](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#event-dataCollected) - `description` updated. 
* [`Tracing.tracingComplete`](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#event-tracingComplete) - `description` updated. 


## Roll protocol to r521293
###### _2017-12-04 01:15:42 -0800_ | Diff: [80a4bf5...8f8623b](https://github.com/ChromeDevTools/devtools-protocol/compare/80a4bf5...8f8623b)
#### `Console`: modified command
* [`Console.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Console/#method-enable) - `description` updated. 
#### `Debugger`: modified commands
* [`Debugger.evaluateOnCallFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-evaluateOnCallFrame) - The `objectGroup` in the parameters had `description` _updated_. The `silent` in the parameters had `description` _updated_. 
* [`Debugger.getStackTrace`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getStackTrace) - `description` updated. 
* [`Debugger.setAsyncCallStackDepth`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setAsyncCallStackDepth) - The `maxDepth` in the parameters had `description` _updated_. 
* [`Debugger.setBreakpointByUrl`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setBreakpointByUrl) - `description` updated. The `urlRegex` in the parameters had `description` _updated_. 
* [`Debugger.setPauseOnExceptions`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setPauseOnExceptions) - `description` updated. 
* [`Debugger.setScriptSource`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setScriptSource) - The `dryRun` in the parameters had `description` _updated_. 
#### `Debugger`: modified event
* [`Debugger.paused`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-paused) - The `asyncCallStackTraceId` in the parameters had `description` _updated_. 
#### `Debugger`: modified types
* [`Debugger.Location`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-Location) - The `scriptId` in the properties had `description` _updated_. 
* [`Debugger.CallFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-CallFrame) - The `this` in the properties had `description` _updated_. 
* [`Debugger.Scope`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-Scope) - The `object` in the properties had `description` _updated_. 
* [`Debugger.BreakLocation`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-BreakLocation) - The `scriptId` in the properties had `description` _updated_. 
#### `Runtime`: modified commands
* [`Runtime.callFunctionOn`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-callFunctionOn) - The `arguments` in the parameters had `description` _removed_. The `silent` in the parameters had `description` _updated_. The `awaitPromise` in the parameters had `description` _updated_. 
* [`Runtime.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-enable) - `description` updated. 
* [`Runtime.evaluate`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate) - The `silent` in the parameters had `description` _updated_. The `awaitPromise` in the parameters had `description` _updated_. 
* [`Runtime.runScript`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-runScript) - The `silent` in the parameters had `description` _updated_. The `awaitPromise` in the parameters had `description` _updated_. 
#### `Runtime`: modified event
* [`Runtime.exceptionRevoked`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-exceptionRevoked) - The `exceptionId` in the parameters had `description` _updated_. 
#### `Runtime`: modified types
* [`Runtime.RemoteObject`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-RemoteObject) - The `subtype` in the properties had `description` _updated_. The `className` in the properties had `description` _updated_. The `unserializableValue` in the properties had `description` _updated_. The `preview` in the properties had `description` _updated_. 
* [`Runtime.ObjectPreview`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-ObjectPreview) - The `subtype` in the properties had `description` _updated_. The `entries` in the properties had `description` _updated_. 
* [`Runtime.PropertyPreview`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-PropertyPreview) - The `subtype` in the properties had `description` _updated_. 
* [`Runtime.PropertyDescriptor`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-PropertyDescriptor) - The `get` in the properties had `description` _updated_. The `set` in the properties had `description` _updated_. The `symbol` in the properties had `description` _updated_. 
* [`Runtime.CallArgument`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-CallArgument) - `description` updated. 
* [`Runtime.StackTraceId`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-StackTraceId) - `description` updated. 
#### `Schema`: modified command
* [`Schema.getDomains`](https://chromedevtools.github.io/devtools-protocol/tot/Schema/#method-getDomains) - `handlers` removed. 


## Roll protocol to r520165
###### _2017-11-29 10:15:43 -0800_ | Diff: [e1e5c6b...0741c94](https://github.com/ChromeDevTools/devtools-protocol/compare/e1e5c6b...0741c94)
#### `Accessibility`: modified command
* [`Accessibility.getPartialAXTree`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#method-getPartialAXTree) - The `nodes` in the return value had `description` _updated_. 
#### `Accessibility`: modified type
* [`Accessibility.AXNode`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXNode) - The `role` in the properties had `description` _updated_. The `name` in the properties had `description` _updated_. The `description` in the properties had `description` _updated_. The `value` in the properties had `description` _updated_. 
#### `Animation`: modified types
* [`Animation.Animation`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-Animation) - The `id` in the properties had `description` _updated_. The `name` in the properties had `description` _updated_. The `pausedState` in the properties had `description` _updated_. The `playState` in the properties had `description` _updated_. The `playbackRate` in the properties had `description` _updated_. The `startTime` in the properties had `description` _updated_. The `currentTime` in the properties had `description` _updated_. The `type` in the properties had `description` _updated_. The `source` in the properties had `description` _updated_. The `cssId` in the properties had `description` _updated_. 
* [`Animation.AnimationEffect`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-AnimationEffect) - The `delay` in the properties had `description` _updated_. The `endDelay` in the properties had `description` _updated_. The `iterationStart` in the properties had `description` _updated_. The `iterations` in the properties had `description` _updated_. The `duration` in the properties had `description` _updated_. The `direction` in the properties had `description` _updated_. The `fill` in the properties had `description` _updated_. The `backendNodeId` in the properties had `description` _updated_. The `keyframesRule` in the properties had `description` _updated_. The `easing` in the properties had `description` _updated_. 
* [`Animation.KeyframeStyle`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-KeyframeStyle) - The `easing` in the properties had `description` _updated_. 
#### `CSS`: modified commands
* [`CSS.addRule`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-addRule) - `description` updated. 
* [`CSS.createStyleSheet`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-createStyleSheet) - `description` updated. 
* [`CSS.forcePseudoState`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-forcePseudoState) - The `forcedPseudoClasses` in the parameters had `enum` _removed_. 
* [`CSS.getComputedStyleForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getComputedStyleForNode) - `description` updated. 
* [`CSS.getInlineStylesForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getInlineStylesForNode) - `description` updated. 
* [`CSS.getMatchedStylesForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getMatchedStylesForNode) - `description` updated. 
#### `CSS`: modified types
* [`CSS.ShorthandEntry`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-ShorthandEntry) - The `important` in the properties had `description` _updated_. 
* [`CSS.CSSProperty`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSProperty) - The `important` in the properties had `description` _updated_. The `implicit` in the properties had `description` _updated_. The `parsedOk` in the properties had `description` _updated_. 
#### `DOM`: modified commands
* [`DOM.copyTo`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-copyTo) - The `insertBeforeNodeId` in the parameters had `description` _updated_. 
* [`DOM.discardSearchResults`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-discardSearchResults) - `description` updated. 
* [`DOM.getSearchResults`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getSearchResults) - `description` updated. 
* [`DOM.moveTo`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-moveTo) - The `insertBeforeNodeId` in the parameters had `description` _updated_. 
* [`DOM.performSearch`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-performSearch) - `description` updated. 
* [`DOM.querySelector`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-querySelector) - `description` updated. 
* [`DOM.querySelectorAll`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-querySelectorAll) - `description` updated. 
* [`DOM.requestChildNodes`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-requestChildNodes) - `description` updated. 
* [`DOM.requestNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-requestNode) - `description` updated. 
#### `DOM`: modified events
* [`DOM.attributeModified`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-attributeModified) - `description` updated. 
* [`DOM.attributeRemoved`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-attributeRemoved) - `description` updated. 
* [`DOM.characterDataModified`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-characterDataModified) - `description` updated. 
* [`DOM.childNodeCountUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-childNodeCountUpdated) - `description` updated. 
* [`DOM.childNodeInserted`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-childNodeInserted) - `description` updated. 
* [`DOM.childNodeRemoved`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-childNodeRemoved) - `description` updated. 
* [`DOM.documentUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-documentUpdated) - `description` updated. 
* [`DOM.inlineStyleInvalidated`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-inlineStyleInvalidated) - `description` updated. 
#### `DOM`: modified types
* [`DOM.BackendNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-BackendNode) - The `nodeType` in the properties had `description` _updated_. The `nodeName` in the properties had `description` _updated_. 
* [`DOM.Node`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-Node) - The `nodeId` in the properties had `description` _updated_. The `nodeType` in the properties had `description` _updated_. The `nodeName` in the properties had `description` _updated_. The `localName` in the properties had `description` _updated_. The `nodeValue` in the properties had `description` _updated_. The `childNodeCount` in the properties had `description` _updated_. The `attributes` in the properties had `description` _updated_. The `documentURL` in the properties had `description` _updated_. The `baseURL` in the properties had `description` _updated_. The `publicId` in the properties had `description` _updated_. The `systemId` in the properties had `description` _updated_. The `internalSubset` in the properties had `description` _updated_. The `xmlVersion` in the properties had `description` _updated_. The `name` in the properties had `description` _updated_. The `value` in the properties had `description` _updated_. 
* [`DOM.Quad`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-Quad) - `minItems` removed. `maxItems` removed. 
#### `DOMDebugger`: modified commands
* [`DOMDebugger.removeDOMBreakpoint`](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger/#method-removeDOMBreakpoint) - `description` updated. 
* [`DOMDebugger.setEventListenerBreakpoint`](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger/#method-setEventListenerBreakpoint) - The `targetName` in the parameters had `description` _updated_. 
#### `DOMDebugger`: modified type
* [`DOMDebugger.EventListener`](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger/#type-EventListener) - The `type` in the properties had `description` _updated_. The `useCapture` in the properties had `description` _updated_. The `passive` in the properties had `description` _updated_. The `once` in the properties had `description` _updated_. 
#### `DOMSnapshot`: modified command
* [`DOMSnapshot.getSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#method-getSnapshot) - `description` updated. 
#### `DOMSnapshot`: modified types
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode) - The `nodeType` in the properties had `description` _updated_. The `nodeName` in the properties had `description` _updated_. The `nodeValue` in the properties had `description` _updated_. The `backendNodeId` in the properties had `description` _updated_. The `childNodeIndexes` in the properties had `description` _updated_. The `attributes` in the properties had `description` _updated_. The `pseudoElementIndexes` in the properties had `description` _updated_. The `layoutNodeIndex` in the properties had `description` _updated_. The `documentURL` in the properties had `description` _updated_. The `baseURL` in the properties had `description` _updated_. The `publicId` in the properties had `description` _updated_. The `systemId` in the properties had `description` _updated_. The `contentDocumentIndex` in the properties had `description` _updated_. The `importedDocumentIndex` in the properties had `description` _updated_. The `templateContentIndex` in the properties had `description` _updated_. 
* [`DOMSnapshot.LayoutTreeNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-LayoutTreeNode) - The `domNodeIndex` in the properties had `description` _updated_. The `styleIndex` in the properties had `description` _updated_. 
#### `IO`: modified type
* [`IO.StreamHandle`](https://chromedevtools.github.io/devtools-protocol/tot/IO/#type-StreamHandle) - `description` updated. 
#### `IndexedDB`: modified commands
* [`IndexedDB.clearObjectStore`](https://chromedevtools.github.io/devtools-protocol/tot/IndexedDB/#method-clearObjectStore)
* [`IndexedDB.deleteDatabase`](https://chromedevtools.github.io/devtools-protocol/tot/IndexedDB/#method-deleteDatabase)
#### `Input`: modified command
* [`Input.dispatchKeyEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchKeyEvent) - The `text` in the parameters had `description` _updated_. 
#### `LayerTree`: modified command
* [`LayerTree.loadSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#method-loadSnapshot) - The `tiles` in the parameters had `minItems` _removed_. 
#### `LayerTree`: modified types
* [`LayerTree.Layer`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#type-Layer) - The `transform` in the properties had `minItems` _removed_. The `transform` in the properties had `maxItems` _removed_. 
* [`LayerTree.PaintProfile`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#type-PaintProfile) - The items's `description` _removed_. 
#### `Log`: modified command
* [`Log.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Log/#method-enable) - `description` updated. 
#### `Network`: modified commands
* [`Network.continueInterceptedRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-continueInterceptedRequest) - The `errorReason` in the parameters had `description` _updated_. 
* [`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getAllCookies) - `description` updated. 
* [`Network.getCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getCookies) - `description` updated. 
* [`Network.setCacheDisabled`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCacheDisabled) - `description` updated. 
#### `Network`: modified type
* [`Network.Response`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Response) - The `encodedDataLength` in the properties had `optional` _removed_. 
#### `Overlay`: modified command
* [`Overlay.setInspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setInspectMode) - The `highlightConfig` in the parameters had `description` _updated_. 
#### `Overlay`: modified events
* [`Overlay.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#event-inspectNodeRequested) - `description` updated. 
* [`Overlay.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#event-nodeHighlightRequested) - `description` updated. 
#### `Page`: modified commands
* [`Page.getCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getCookies) - `description` updated. 
* [`Page.startScreencast`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-startScreencast) - `description` updated. 
* [`Page.stopScreencast`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-stopScreencast) - `description` updated. 
#### `Page`: modified events
* [`Page.screencastFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-screencastFrame) - `description` updated. 
* [`Page.screencastVisibilityChanged`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-screencastVisibilityChanged) - `description` updated. 
#### `ServiceWorker`: modified type
* [`ServiceWorker.ServiceWorkerVersion`](https://chromedevtools.github.io/devtools-protocol/tot/ServiceWorker/#type-ServiceWorkerVersion) - The `scriptResponseTime` in the properties had `description` _updated_. 
#### `Target`: modified commands
* [`Target.setAutoAttach`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setAutoAttach) - The `waitForDebuggerOnStart` in the parameters had `description` _updated_. 
* [`Target.setDiscoverTargets`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setDiscoverTargets) - `description` updated. 
* [`Target.setRemoteLocations`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setRemoteLocations) - `description` updated. 
#### `Target`: modified events
* [`Target.attachedToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-attachedToTarget) - `description` updated. 
* [`Target.detachedFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-detachedFromTarget) - `description` updated. 
* [`Target.receivedMessageFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-receivedMessageFromTarget) - `description` updated. 
* [`Target.targetInfoChanged`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-targetInfoChanged) - `description` updated. 
#### `Tracing`: modified command
* [`Tracing.start`](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#method-start) - The `traceConfig` in the parameters had `description` _removed_. The `transferMode` in the parameters had `description` _updated_. 


## Roll protocol to r518882
###### _2017-11-23 02:15:33 -0800_ | Diff: [a86a78e...e1e5c6b](https://github.com/ChromeDevTools/devtools-protocol/compare/a86a78e...e1e5c6b)
#### `Runtime`: modified commands
* [`Runtime.evaluate`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate) - The `userGesture` in the parameters had `experimental` _removed_. 
* [`Runtime.callFunctionOn`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-callFunctionOn) - The `userGesture` in the parameters had `experimental` _removed_. 
* [`Runtime.queryObjects`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-queryObjects) - `experimental` removed. 
* [`Runtime.globalLexicalScopeNames`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-globalLexicalScopeNames) - `experimental` removed. 
#### `Runtime`: removed type
* [`Runtime.AsyncTaskId`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-AsyncTaskId)
#### `Runtime`: modified type
* [`Runtime.StackTraceId`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-StackTraceId) - `description` updated. The properties's `optional` _added_. 
#### `Debugger`: new command
* [`Debugger.pauseOnAsyncCall`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-pauseOnAsyncCall)
#### `Debugger`: removed command
* [`Debugger.pauseOnAsyncTask`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-pauseOnAsyncTask)
#### `Debugger`: modified commands
* [`Debugger.setBreakpointByUrl`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setBreakpointByUrl) - The `scriptHash` in the parameters had `experimental` _removed_. 
* [`Debugger.getPossibleBreakpoints`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getPossibleBreakpoints) - `experimental` removed. 
* [`Debugger.continueToLocation`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-continueToLocation) - The `targetCallFrames` in the parameters had `experimental` _removed_. 
* [`Debugger.searchInContent`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-searchInContent) - `experimental` removed. 
* [`Debugger.evaluateOnCallFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-evaluateOnCallFrame) - The `throwOnSideEffect` in the parameters had `experimental` _removed_. 
#### `Debugger`: modified events
* [`Debugger.scriptParsed`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-scriptParsed) - The `hasSourceURL` in the parameters had `experimental` _removed_. The `isModule` in the parameters had `experimental` _removed_. The `length` in the parameters had `experimental` _removed_. 
* [`Debugger.scriptFailedToParse`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-scriptFailedToParse) - The `hasSourceURL` in the parameters had `experimental` _removed_. The `isModule` in the parameters had `experimental` _removed_. The `length` in the parameters had `experimental` _removed_. 
* [`Debugger.paused`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-paused) - The `scheduledAsyncTaskId` in the parameters had `name` _updated_. The `scheduledAsyncTaskId` in the parameters had `$ref` _updated_. The `scheduledAsyncTaskId` in the parameters had `description` _updated_. 
#### `Debugger`: modified types
* [`Debugger.CallFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-CallFrame) - The `functionLocation` in the properties had `experimental` _removed_. 
* [`Debugger.SearchMatch`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-SearchMatch) - `experimental` removed. 
* [`Debugger.BreakLocation`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-BreakLocation) - `experimental` removed. 
#### `Profiler`: modified commands
* [`Profiler.startPreciseCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-startPreciseCoverage) - `experimental` removed. 
* [`Profiler.stopPreciseCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-stopPreciseCoverage) - `experimental` removed. 
* [`Profiler.takePreciseCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-takePreciseCoverage) - `experimental` removed. 
* [`Profiler.getBestEffortCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-getBestEffortCoverage) - `experimental` removed. 
#### `Profiler`: modified types
* [`Profiler.ProfileNode`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-ProfileNode) - The `hitCount` in the properties had `experimental` _removed_. The `positionTicks` in the properties had `experimental` _removed_. 
* [`Profiler.PositionTickInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-PositionTickInfo) - `experimental` removed. 
* [`Profiler.CoverageRange`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-CoverageRange) - `experimental` removed. 
* [`Profiler.FunctionCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-FunctionCoverage) - `experimental` removed. 
* [`Profiler.ScriptCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-ScriptCoverage) - `experimental` removed. 


## Roll protocol to r518863
###### _2017-11-22 22:15:28 -0800_ | Diff: [764cee6...a86a78e](https://github.com/ChromeDevTools/devtools-protocol/compare/764cee6...a86a78e)
#### `Runtime`: new types
* [`Runtime.UniqueDebuggerId`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-UniqueDebuggerId)
* [`Runtime.StackTraceId`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-StackTraceId)
#### `Runtime`: modified type
* [`Runtime.StackTrace`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-StackTrace) - The properties's `parentId` _added_. 
#### `Debugger`: new command
* [`Debugger.getStackTrace`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getStackTrace)
#### `Debugger`: modified commands
* [`Debugger.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-enable)
* [`Debugger.setScriptSource`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setScriptSource) - The `exceptionDetails` in the return value had `name` _updated_. The `exceptionDetails` in the return value had `$ref` _updated_. The `exceptionDetails` in the return value had `description` _updated_. The return value's `experimental` _added_. The return value's `exceptionDetails` _added_. 
* [`Debugger.restartFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-restartFrame) - The return value's `asyncStackTraceId` _added_. 
#### `Debugger`: modified event
* [`Debugger.paused`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-paused) - The `scheduledAsyncTaskId` in the parameters had `name` _updated_. The `scheduledAsyncTaskId` in the parameters had `$ref` _updated_. The `scheduledAsyncTaskId` in the parameters had `description` _updated_. The parameters's `scheduledAsyncTaskId` _added_. 


## Roll protocol to r518700 517208
###### _2017-11-22 11:16:19 -0800_ | Diff: [4105e8d...3a092a2](https://github.com/ChromeDevTools/devtools-protocol/compare/4105e8d...3a092a2)
#### `Runtime`: modified type
* [`Runtime.StackTrace`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-StackTrace) - The properties's `promiseCreationFrame` _removed_. 


## Roll protocol to r518504
###### _2017-11-21 18:16:11 -0800_ | Diff: [4d81be2...4105e8d](https://github.com/ChromeDevTools/devtools-protocol/compare/4d81be2...4105e8d)
#### `Page`: modified commands
* [`Page.navigate`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigate) - The `loaderId` in the return value had `experimental` _removed_. 
* [`Page.setDocumentContent`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDocumentContent) - `experimental` removed. 
#### `Page`: modified type
* [`Page.ScreencastFrameMetadata`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-ScreencastFrameMetadata) - The `offsetTop` in the properties had `experimental` _removed_. The `pageScaleFactor` in the properties had `experimental` _removed_. The `deviceWidth` in the properties had `experimental` _removed_. The `deviceHeight` in the properties had `experimental` _removed_. The `scrollOffsetX` in the properties had `experimental` _removed_. The `scrollOffsetY` in the properties had `experimental` _removed_. The `timestamp` in the properties had `experimental` _removed_. 
#### `Emulation`: modified command
* [`Emulation.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDeviceMetricsOverride) - The parameters's `experimental` _added_. 
#### `Network`: modified commands
* [`Network.canClearBrowserCache`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-canClearBrowserCache) - `deprecated` added. 
* [`Network.canClearBrowserCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-canClearBrowserCookies) - `deprecated` added. 
* [`Network.canEmulateNetworkConditions`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-canEmulateNetworkConditions) - `deprecated` added. 
#### `Database`: modified types
* [`Database.DatabaseId`](https://chromedevtools.github.io/devtools-protocol/tot/Database/#type-DatabaseId) - `experimental` removed. 
* [`Database.Database`](https://chromedevtools.github.io/devtools-protocol/tot/Database/#type-Database) - `experimental` removed. 
#### `DOMStorage`: modified types
* [`DOMStorage.StorageId`](https://chromedevtools.github.io/devtools-protocol/tot/DOMStorage/#type-StorageId) - `experimental` removed. 
* [`DOMStorage.Item`](https://chromedevtools.github.io/devtools-protocol/tot/DOMStorage/#type-Item) - `experimental` removed. 
#### `Target`: modified commands
* [`Target.setAutoAttach`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setAutoAttach) - `experimental` added. 
* [`Target.getTargetInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-getTargetInfo) - `experimental` added. 
#### `Target`: modified events
* [`Target.attachedToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-attachedToTarget) - `experimental` added. 
* [`Target.detachedFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-detachedFromTarget) - `experimental` added. 
#### `Animation`: modified types
* [`Animation.Animation`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-Animation) - `experimental` removed. The `pausedState` in the properties had `experimental` _removed_. 
* [`Animation.AnimationEffect`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-AnimationEffect) - `experimental` removed. 


## Roll protocol to r517901
###### _2017-11-20 12:15:46 -0800_ | Diff: [05920a2...4d81be2](https://github.com/ChromeDevTools/devtools-protocol/compare/05920a2...4d81be2)
#### `Page`: modified command
* [`Page.navigate`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigate) - The `errorText` in the return value had `type` _removed_. The `errorText` in the return value had `name` _updated_. The `errorText` in the return value had `description` _updated_. The return value's `$ref` _added_. The return value's `experimental` _added_. The return value's `errorText` _added_. 


## Roll protocol to r517530
###### _2017-11-17 12:15:35 -0800_ | Diff: [29d3c99...05920a2](https://github.com/ChromeDevTools/devtools-protocol/compare/29d3c99...05920a2)
#### `Accessibility`: new type
* [`Accessibility.AXPropertyName`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXPropertyName)
#### `Accessibility`: removed types
* [`Accessibility.AXGlobalStates`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXGlobalStates)
* [`Accessibility.AXLiveRegionAttributes`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXLiveRegionAttributes)
* [`Accessibility.AXWidgetAttributes`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXWidgetAttributes)
* [`Accessibility.AXWidgetStates`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXWidgetStates)
* [`Accessibility.AXRelationshipAttributes`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXRelationshipAttributes)
#### `Accessibility`: modified type
* [`Accessibility.AXProperty`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXProperty) - The `name` in the properties had `type` _removed_. The properties's `$ref` _added_. 


## Roll protocol to r517415
###### _2017-11-17 08:15:51 -0800_ | Diff: [9451957...29d3c99](https://github.com/ChromeDevTools/devtools-protocol/compare/9451957...29d3c99)
#### `Emulation`: modified command
* [`Emulation.setVirtualTimePolicy`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVirtualTimePolicy) - The `budget` in the parameters had `type` _updated_. 
#### `Emulation`: modified events
* [`Emulation.virtualTimeAdvanced`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeAdvanced) - The `virtualTimeElapsed` in the parameters had `type` _updated_. 
* [`Emulation.virtualTimePaused`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimePaused) - The `virtualTimeElapsed` in the parameters had `type` _updated_. 


## Roll protocol to r517348
###### _2017-11-17 01:15:46 -0800_ | Diff: [24d697a...9451957](https://github.com/ChromeDevTools/devtools-protocol/compare/24d697a...9451957)
#### `Network`: new command
* [`Network.searchInResponseBody`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-searchInResponseBody)


## Roll protocol to r516944
###### _2017-11-15 17:35:11 -0800_ | Diff: [efb204b...24d697a](https://github.com/ChromeDevTools/devtools-protocol/compare/efb204b...24d697a)
#### `Network`: new command
* [`Network.getResponseBodyForInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getResponseBodyForInterception)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted) - The `redirectHeaders` in the parameters had `$ref` _removed_. The `redirectStatusCode` in the parameters had `type` _removed_. The `redirectUrl` in the parameters had `type` _removed_. The `authChallenge` in the parameters had `$ref` _removed_. The `redirectHeaders` in the parameters had `name` _updated_. The `redirectHeaders` in the parameters had `description` _updated_. The `redirectStatusCode` in the parameters had `name` _updated_. The `redirectStatusCode` in the parameters had `description` _updated_. The `redirectUrl` in the parameters had `name` _updated_. The `redirectUrl` in the parameters had `description` _updated_. The `authChallenge` in the parameters had `name` _updated_. The `authChallenge` in the parameters had `description` _updated_. The parameters's `type` _added_ (2 times). The parameters's `$ref` _added_ (2 times). The parameters's `responseHeaders` _added_. 
#### `Network`: new type
* [`Network.InterceptionStage`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-InterceptionStage)
#### `Network`: modified type
* [`Network.RequestPattern`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-RequestPattern) - The properties's `interceptionStage` _added_. 


## Roll protocol to r516591
###### _2017-11-14 20:15:32 -0800_ | Diff: [c0d3ebf...efb204b](https://github.com/ChromeDevTools/devtools-protocol/compare/c0d3ebf...efb204b)
#### `Network`: removed command
* [`Network.getResponseBodyForInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getResponseBodyForInterception)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted) - The parameters's `responseHeaders` _removed_. The `redirectUrl` in the parameters had `type` _removed_. The `authChallenge` in the parameters had `$ref` _removed_. The `responseErrorReason` in the parameters had `$ref` _removed_. The `responseStatusCode` in the parameters had `type` _removed_. The `redirectUrl` in the parameters had `name` _updated_. The `redirectUrl` in the parameters had `description` _updated_. The `authChallenge` in the parameters had `name` _updated_. The `authChallenge` in the parameters had `description` _updated_. The `responseErrorReason` in the parameters had `name` _updated_. The `responseErrorReason` in the parameters had `description` _updated_. The `responseStatusCode` in the parameters had `name` _updated_. The `responseStatusCode` in the parameters had `description` _updated_. The parameters's `$ref` _added_ (2 times). The parameters's `type` _added_ (2 times). 
#### `Network`: removed type
* [`Network.InterceptionStage`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-InterceptionStage)
#### `Network`: modified type
* [`Network.RequestPattern`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-RequestPattern) - The properties's `interceptionStage` _removed_. 


## Roll protocol to r516563 516429
###### _2017-11-14 18:15:47 -0800_ | Diff: [d3257bc...a1b4645](https://github.com/ChromeDevTools/devtools-protocol/compare/d3257bc...a1b4645)
#### `Network`: new command
* [`Network.getResponseBodyForInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getResponseBodyForInterception)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted) - The `redirectHeaders` in the parameters had `$ref` _removed_. The `redirectStatusCode` in the parameters had `type` _removed_. The `redirectUrl` in the parameters had `type` _removed_. The `authChallenge` in the parameters had `$ref` _removed_. The `redirectHeaders` in the parameters had `name` _updated_. The `redirectHeaders` in the parameters had `description` _updated_. The `redirectStatusCode` in the parameters had `name` _updated_. The `redirectStatusCode` in the parameters had `description` _updated_. The `redirectUrl` in the parameters had `name` _updated_. The `redirectUrl` in the parameters had `description` _updated_. The `authChallenge` in the parameters had `name` _updated_. The `authChallenge` in the parameters had `description` _updated_. The parameters's `type` _added_ (2 times). The parameters's `$ref` _added_ (2 times). The parameters's `responseHeaders` _added_. 
#### `Network`: new type
* [`Network.InterceptionStage`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-InterceptionStage)
#### `Network`: modified type
* [`Network.RequestPattern`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-RequestPattern) - The properties's `interceptionStage` _added_. 


## Roll protocol to r515398
###### _2017-11-09 17:16:13 -0800_ | Diff: [abb8c6c...d3257bc](https://github.com/ChromeDevTools/devtools-protocol/compare/abb8c6c...d3257bc)
#### `Page`: modified command
* [`Page.navigate`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigate) - The `loaderId` in the return value had `$ref` _removed_. The `loaderId` in the return value had `experimental` _removed_. The `frameId` in the return value had `description` _updated_. The `loaderId` in the return value had `name` _updated_. The `loaderId` in the return value had `description` _updated_. The return value's `type` _added_. The return value's `optional` _added_. 


## Roll protocol to r514369
###### _2017-11-06 19:15:46 -0800_ | Diff: [2cda62b...abb8c6c](https://github.com/ChromeDevTools/devtools-protocol/compare/2cda62b...abb8c6c)
#### `HeapProfiler`: new command
* [`HeapProfiler.getSamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#method-getSamplingProfile)


## Roll protocol to r514112
###### _2017-11-06 04:15:45 -0800_ | Diff: [d9a7169...2cda62b](https://github.com/ChromeDevTools/devtools-protocol/compare/d9a7169...2cda62b)
#### `Runtime`: new type
* [`Runtime.AsyncTaskId`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-AsyncTaskId)
#### `Debugger`: new command
* [`Debugger.pauseOnAsyncTask`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-pauseOnAsyncTask)
#### `Debugger`: modified commands
* [`Debugger.stepInto`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-stepInto)
* [`Debugger.scheduleStepIntoAsync`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-scheduleStepIntoAsync) - `description` updated. 
#### `Debugger`: modified event
* [`Debugger.paused`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-paused) - The parameters's `scheduledAsyncTaskId` _added_. 


## Roll protocol to r514053
###### _2017-11-04 11:15:40_ | Diff: [e310fa1...d9a7169](https://github.com/ChromeDevTools/devtools-protocol/compare/e310fa1...d9a7169)
#### `Debugger`: new command
* [`Debugger.setReturnValue`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setReturnValue)


## Roll protocol to r513425
###### _2017-11-02 01:15:48_ | Diff: [4ea1613...e310fa1](https://github.com/ChromeDevTools/devtools-protocol/compare/4ea1613...e310fa1)
#### `Page`: new command
* [`Page.setLifecycleEventsEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setLifecycleEventsEnabled)
#### `Page`: modified command
* [`Page.navigate`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigate) - The return value's `loaderId` _added_. 


## Roll protocol to r513411
###### _2017-11-01 22:15:48_ | Diff: [dcd904a...4ea1613](https://github.com/ChromeDevTools/devtools-protocol/compare/dcd904a...4ea1613)
#### `Page`: modified event
* [`Page.windowOpen`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-windowOpen) - `description` updated. The `windowName` in the parameters had `description` _updated_. The `windowFeatures` in the parameters had `type` _updated_. The `windowFeatures` in the parameters had `description` _updated_. The `userGesture` in the parameters had `description` _updated_. The parameters's `items` _added_. 


## Roll protocol to r513373
###### _2017-11-01 19:15:47_ | Diff: [a1e4422...dcd904a](https://github.com/ChromeDevTools/devtools-protocol/compare/a1e4422...dcd904a)
#### `Page`: modified event
* [`Page.lifecycleEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-lifecycleEvent) - The `name` in the parameters had `type` _removed_. The `timestamp` in the parameters had `$ref` _removed_. The `name` in the parameters had `name` _updated_. The `timestamp` in the parameters had `name` _updated_. The parameters's `$ref` _added_. The parameters's `description` _added_. The parameters's `type` _added_. The parameters's `timestamp` _added_. 
#### `Network`: modified events
* [`Network.requestWillBeSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestWillBeSent) - The `loaderId` in the parameters had `description` _updated_. 
* [`Network.responseReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-responseReceived) - The `loaderId` in the parameters had `description` _updated_. 


## Roll protocol to r513327 513317
###### _2017-11-01 17:15:44_ | Diff: [171f927...916de95](https://github.com/ChromeDevTools/devtools-protocol/compare/171f927...916de95)
#### `Page`: modified commands
* [`Page.addScriptToEvaluateOnNewDocument`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-addScriptToEvaluateOnNewDocument) - `experimental` removed. 
* [`Page.removeScriptToEvaluateOnNewDocument`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-removeScriptToEvaluateOnNewDocument) - `experimental` removed. 
* [`Page.navigate`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigate) - The `referrer` in the parameters had `experimental` _removed_. The `transitionType` in the parameters had `experimental` _removed_. The `frameId` in the return value had `experimental` _removed_. 
* [`Page.stopLoading`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-stopLoading) - `experimental` removed. 
* [`Page.getNavigationHistory`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getNavigationHistory) - `experimental` removed. 
* [`Page.navigateToHistoryEntry`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigateToHistoryEntry) - `experimental` removed. 
* [`Page.getCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getCookies) - `deprecated` added. 
* [`Page.deleteCookie`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-deleteCookie) - `deprecated` added. 
* [`Page.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDeviceMetricsOverride) - `deprecated` added. 
* [`Page.clearDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-clearDeviceMetricsOverride) - `deprecated` added. 
* [`Page.setGeolocationOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setGeolocationOverride) - `deprecated` added. 
* [`Page.clearGeolocationOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-clearGeolocationOverride) - `deprecated` added. 
* [`Page.setDeviceOrientationOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDeviceOrientationOverride) - `deprecated` added. 
* [`Page.clearDeviceOrientationOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-clearDeviceOrientationOverride) - `deprecated` added. 
* [`Page.setTouchEmulationEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setTouchEmulationEnabled) - `deprecated` added. 
* [`Page.captureScreenshot`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot) - `experimental` removed. The `clip` in the parameters had `experimental` _removed_. 
* [`Page.printToPDF`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF) - `experimental` removed. 
* [`Page.getAppManifest`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getAppManifest) - `experimental` removed. 
* [`Page.getLayoutMetrics`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getLayoutMetrics) - `experimental` removed. 
* [`Page.createIsolatedWorld`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-createIsolatedWorld) - `experimental` removed. 
#### `Page`: modified events
* [`Page.frameAttached`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameAttached) - The `stack` in the parameters had `experimental` _removed_. 
* [`Page.frameScheduledNavigation`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameScheduledNavigation) - The `reason` in the parameters had `experimental` _removed_. The `url` in the parameters had `experimental` _removed_. 
* [`Page.windowOpen`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-windowOpen) - `experimental` removed. 
#### `Page`: removed type
* [`Page.NavigationResponse`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-NavigationResponse)
#### `Page`: modified types
* [`Page.ScriptIdentifier`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-ScriptIdentifier) - `experimental` removed. 
* [`Page.TransitionType`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-TransitionType) - `experimental` removed. 
* [`Page.NavigationEntry`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-NavigationEntry) - `experimental` removed. 
* [`Page.DialogType`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-DialogType) - `experimental` removed. 
* [`Page.AppManifestError`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-AppManifestError) - `experimental` removed. 
* [`Page.LayoutViewport`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-LayoutViewport) - `experimental` removed. 
* [`Page.VisualViewport`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-VisualViewport) - `experimental` removed. 
* [`Page.Viewport`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-Viewport) - `experimental` removed. 
#### `Emulation`: modified commands
* [`Emulation.setScriptExecutionDisabled`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setScriptExecutionDisabled) - `experimental` removed. 
* [`Emulation.setGeolocationOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setGeolocationOverride) - `experimental` removed. 
* [`Emulation.clearGeolocationOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-clearGeolocationOverride) - `experimental` removed. 
* [`Emulation.canEmulate`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-canEmulate) - `experimental` removed. 
* [`Emulation.setDefaultBackgroundColorOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDefaultBackgroundColorOverride) - `experimental` removed. 
#### `Network`: modified commands
* [`Network.getCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getCookies) - `experimental` removed. 
* [`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getAllCookies) - `experimental` removed. 
* [`Network.deleteCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-deleteCookies) - `experimental` removed. 
* [`Network.setCookie`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCookie) - `experimental` removed. 
* [`Network.setCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCookies) - `experimental` removed. 
* [`Network.canEmulateNetworkConditions`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-canEmulateNetworkConditions) - `experimental` removed. 
#### `Network`: modified events
* [`Network.requestWillBeSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestWillBeSent) - The `wallTime` in the parameters had `experimental` _removed_. The `type` in the parameters had `experimental` _removed_. The `frameId` in the parameters had `experimental` _removed_. 
* [`Network.responseReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-responseReceived) - The `frameId` in the parameters had `experimental` _removed_. 
* [`Network.loadingFailed`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-loadingFailed) - The `blockedReason` in the parameters had `experimental` _removed_. 
* [`Network.webSocketWillSendHandshakeRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketWillSendHandshakeRequest) - `experimental` removed. The `wallTime` in the parameters had `experimental` _removed_. 
* [`Network.webSocketHandshakeResponseReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketHandshakeResponseReceived) - `experimental` removed. 
* [`Network.webSocketCreated`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketCreated) - `experimental` removed. 
* [`Network.webSocketClosed`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketClosed) - `experimental` removed. 
* [`Network.webSocketFrameReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameReceived) - `experimental` removed. 
* [`Network.webSocketFrameError`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameError) - `experimental` removed. 
* [`Network.webSocketFrameSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameSent) - `experimental` removed. 
* [`Network.eventSourceMessageReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-eventSourceMessageReceived) - `experimental` removed. 
#### `Network`: modified types
* [`Network.BlockedReason`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-BlockedReason) - `experimental` removed. 
* [`Network.Response`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Response) - The `remoteIPAddress` in the properties had `experimental` _removed_. The `remotePort` in the properties had `experimental` _removed_. 
* [`Network.WebSocketRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-WebSocketRequest) - `experimental` removed. 
* [`Network.WebSocketResponse`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-WebSocketResponse) - `experimental` removed. 
* [`Network.WebSocketFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-WebSocketFrame) - `experimental` removed. 
* [`Network.Cookie`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Cookie) - `experimental` removed. 
* [`Network.CookieParam`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-CookieParam) - `experimental` removed. 
#### `DOM`: modified commands
* [`DOM.getDocument`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getDocument) - The `depth` in the parameters had `experimental` _removed_. The `pierce` in the parameters had `experimental` _removed_. 
* [`DOM.getFlattenedDocument`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getFlattenedDocument) - The `depth` in the parameters had `experimental` _removed_. The `pierce` in the parameters had `experimental` _removed_. 
* [`DOM.requestChildNodes`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-requestChildNodes) - The `depth` in the parameters had `experimental` _removed_. The `pierce` in the parameters had `experimental` _removed_. 
* [`DOM.performSearch`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-performSearch) - The `includeUserAgentShadowDOM` in the parameters had `experimental` _removed_. 
* [`DOM.focus`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-focus) - `experimental` removed. 
* [`DOM.setFileInputFiles`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setFileInputFiles) - `experimental` removed. 
* [`DOM.getBoxModel`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getBoxModel) - `experimental` removed. `description` updated. 
* [`DOM.describeNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-describeNode) - The `depth` in the parameters had `experimental` _removed_. The `pierce` in the parameters had `experimental` _removed_. 
#### `DOM`: modified types
* [`DOM.BackendNodeId`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-BackendNodeId) - `experimental` removed. 
* [`DOM.BackendNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-BackendNode) - `experimental` removed. 
* [`DOM.Node`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-Node) - The `parentId` in the properties had `experimental` _removed_. The `backendNodeId` in the properties had `experimental` _removed_. The `baseURL` in the properties had `experimental` _removed_. The `frameId` in the properties had `experimental` _removed_. The `shadowRoots` in the properties had `experimental` _removed_. The `templateContent` in the properties had `experimental` _removed_. The `pseudoElements` in the properties had `experimental` _removed_. The `distributedNodes` in the properties had `experimental` _removed_. The `isSVG` in the properties had `experimental` _removed_. 
* [`DOM.Quad`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-Quad) - `experimental` removed. 
* [`DOM.BoxModel`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-BoxModel) - `experimental` removed. 
* [`DOM.ShapeOutsideInfo`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-ShapeOutsideInfo) - `experimental` removed. 
* [`DOM.Rect`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-Rect) - `experimental` removed. 
#### `CSS`: modified commands
* [`CSS.getPlatformFontsForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getPlatformFontsForNode) - `experimental` removed. 
* [`CSS.collectClassNames`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-collectClassNames) - `experimental` removed. 
* [`CSS.getMediaQueries`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getMediaQueries) - `experimental` removed. 
* [`CSS.setEffectivePropertyValueForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-setEffectivePropertyValueForNode) - `experimental` removed. 
* [`CSS.getBackgroundColors`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getBackgroundColors) - `experimental` removed. 
* [`CSS.startRuleUsageTracking`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-startRuleUsageTracking) - `experimental` removed. 
* [`CSS.takeCoverageDelta`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-takeCoverageDelta) - `experimental` removed. 
* [`CSS.stopRuleUsageTracking`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-stopRuleUsageTracking) - `experimental` removed. 
#### `CSS`: removed type
* [`CSS.InlineTextBox`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-InlineTextBox)
#### `CSS`: modified types
* [`CSS.CSSStyleSheetHeader`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSStyleSheetHeader) - The `length` in the properties had `experimental` _removed_. 
* [`CSS.RuleUsage`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-RuleUsage) - `experimental` removed. 
* [`CSS.CSSMedia`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSMedia) - The `mediaList` in the properties had `experimental` _removed_. 
* [`CSS.MediaQuery`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-MediaQuery) - `experimental` removed. 
* [`CSS.MediaQueryExpression`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-MediaQueryExpression) - `experimental` removed. 
* [`CSS.PlatformFontUsage`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-PlatformFontUsage) - `experimental` removed. 
#### `DOMSnapshot`: new type
* [`DOMSnapshot.InlineTextBox`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-InlineTextBox)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.LayoutTreeNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-LayoutTreeNode) - The `inlineTextNodes` in the properties had `$ref` _updated_. 
#### `DOMDebugger`: modified command
* [`DOMDebugger.getEventListeners`](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger/#method-getEventListeners) - `experimental` removed. The `depth` in the parameters had `experimental` _removed_. The `pierce` in the parameters had `experimental` _removed_. 
#### `DOMDebugger`: modified type
* [`DOMDebugger.EventListener`](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger/#type-EventListener) - `experimental` removed. 
#### `Target`: modified commands
* [`Target.setAttachToFrames`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setAttachToFrames) - `experimental` added. 
* [`Target.setRemoteLocations`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setRemoteLocations) - `experimental` added. 
* [`Target.createBrowserContext`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-createBrowserContext) - `experimental` added. 
* [`Target.disposeBrowserContext`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-disposeBrowserContext) - `experimental` added. 
#### `Target`: modified types
* [`Target.BrowserContextID`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#type-BrowserContextID) - `experimental` added. 
* [`Target.RemoteLocation`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#type-RemoteLocation) - `experimental` added. 
#### `Input`: modified commands
* [`Input.dispatchKeyEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchKeyEvent) - The `location` in the parameters had `experimental` _removed_. 
* [`Input.dispatchTouchEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchTouchEvent) - `experimental` removed. 
#### `Input`: modified type
* [`Input.TouchPoint`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#type-TouchPoint) - `experimental` removed. 
#### `Browser`: modified commands
* [`Browser.getWindowForTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowForTarget) - `experimental` added. 
* [`Browser.setWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-setWindowBounds) - `experimental` added. 
* [`Browser.getWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowBounds) - `experimental` added. 
#### `Browser`: modified types
* [`Browser.WindowID`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-WindowID) - `experimental` added. 
* [`Browser.WindowState`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-WindowState) - `experimental` added. 
* [`Browser.Bounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-Bounds) - `experimental` added. 


## Roll protocol to r512925
###### _2017-10-31 13:15:51_ | Diff: [d7f1734...171f927](https://github.com/ChromeDevTools/devtools-protocol/compare/d7f1734...171f927)
#### `Page`: new command
* [`Page.getFrameTree`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getFrameTree)
#### `Page`: new type
* [`Page.FrameTree`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-FrameTree)


## Roll protocol to r511679
###### _2017-10-25 18:15:34_ | Diff: [704cc11...d7f1734](https://github.com/ChromeDevTools/devtools-protocol/compare/704cc11...d7f1734)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted) - The `isNavigationRequest` in the parameters had `type` _removed_. The `redirectHeaders` in the parameters had `$ref` _removed_. The `redirectHeaders` in the parameters had `optional` _removed_. The `redirectStatusCode` in the parameters had `type` _removed_. The `authChallenge` in the parameters had `$ref` _removed_. The `resourceType` in the parameters had `name` _updated_. The `resourceType` in the parameters had `$ref` _updated_. The `resourceType` in the parameters had `description` _updated_. The `isNavigationRequest` in the parameters had `name` _updated_. The `isNavigationRequest` in the parameters had `description` _updated_. The `redirectHeaders` in the parameters had `name` _updated_. The `redirectHeaders` in the parameters had `description` _updated_. The `redirectStatusCode` in the parameters had `name` _updated_. The `redirectStatusCode` in the parameters had `description` _updated_. The `redirectUrl` in the parameters had `name` _updated_. The `redirectUrl` in the parameters had `type` _updated_. The `redirectUrl` in the parameters had `description` _updated_. The `authChallenge` in the parameters had `name` _updated_. The `authChallenge` in the parameters had `description` _updated_. The parameters's `$ref` _added_ (2 times). The parameters's `type` _added_ (2 times). The parameters's `authChallenge` _added_. 


## Roll protocol to r510771
###### _2017-10-23 05:16:00_ | Diff: [228b292...745052e](https://github.com/ChromeDevTools/devtools-protocol/compare/228b292...745052e)
#### `HeadlessExperimental`: modified command
* [`HeadlessExperimental.beginFrame`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#method-beginFrame) - The `screenshotData` in the return value had `optional` _removed_. The `screenshotData` in the return value had `name` _updated_. The `screenshotData` in the return value had `type` _updated_. The `screenshotData` in the return value had `description` _updated_. The return value's `screenshotData` _added_. 


## Roll protocol to r510657
###### _2017-10-20 21:15:50_ | Diff: [5df6a06...cb1d580](https://github.com/ChromeDevTools/devtools-protocol/compare/5df6a06...cb1d580)
#### `Network`: new command
* [`Network.setRequestInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setRequestInterception)
#### `Network`: removed command
* [`Network.setRequestInterceptionEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setRequestInterceptionEnabled)
#### `Network`: new type
* [`Network.RequestPattern`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-RequestPattern)


## Roll protocol to r509994
###### _2017-10-18 21:15:50_ | Diff: [06db515...5df6a06](https://github.com/ChromeDevTools/devtools-protocol/compare/06db515...5df6a06)
#### `Input`: modified command
* [`Input.dispatchKeyEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchKeyEvent) - The parameters's `location` _added_. 


## Roll protocol to r509917
###### _2017-10-18 16:15:52_ | Diff: [2249014...06db515](https://github.com/ChromeDevTools/devtools-protocol/compare/2249014...06db515)
#### `Emulation`: modified command
* [`Emulation.setVirtualTimePolicy`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVirtualTimePolicy) - The parameters's `maxVirtualTimeTaskStarvationCount` _added_. 


## Roll protocol to r509331
###### _2017-10-17 02:15:55_ | Diff: [c623810...2249014](https://github.com/ChromeDevTools/devtools-protocol/compare/c623810...2249014)
#### `Runtime`: new command
* [`Runtime.globalLexicalScopeNames`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-globalLexicalScopeNames)


## Roll protocol to r508301
###### _2017-10-12 03:16:09_ | Diff: [e95be51...4eaa4f7](https://github.com/ChromeDevTools/devtools-protocol/compare/e95be51...4eaa4f7)
#### `Browser`: new command
* [`Browser.close`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-close)


## Roll protocol to r508087
###### _2017-10-11 13:15:51_ | Diff: [4856f10...2988a57](https://github.com/ChromeDevTools/devtools-protocol/compare/4856f10...2988a57)
#### `Target`: modified type
* [`Target.TargetInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#type-TargetInfo) - The properties's `openerId` _added_. 


## Roll protocol to r507818
###### _2017-10-10 16:15:50_ | Diff: [662fafd...4856f10](https://github.com/ChromeDevTools/devtools-protocol/compare/662fafd...4856f10)
#### `HeadlessExperimental`: new domain
* [`HeadlessExperimental.HeadlessExperimental`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#domain-HeadlessExperimental)
#### `Page`: modified command
* [`Page.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDeviceMetricsOverride) - The parameters's `viewport` _added_. 
#### `Emulation`: modified command
* [`Emulation.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDeviceMetricsOverride) - The parameters's `viewport` _added_. 
#### `Target`: modified command
* [`Target.createTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-createTarget) - The parameters's `enableBeginFrameControl` _added_. 
#### `HeadlessExperimental`: new commands
* [`HeadlessExperimental.enable`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#method-enable)
* [`HeadlessExperimental.disable`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#method-disable)
* [`HeadlessExperimental.beginFrame`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#method-beginFrame)
#### `HeadlessExperimental`: new events
* [`HeadlessExperimental.needsBeginFramesChanged`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#event-needsBeginFramesChanged)
* [`HeadlessExperimental.mainFrameReadyForScreenshots`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#event-mainFrameReadyForScreenshots)
#### `HeadlessExperimental`: new type
* [`HeadlessExperimental.ScreenshotParams`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#type-ScreenshotParams)


## Roll protocol to r507615
###### _2017-10-10 01:15:40_ | Diff: [a63b5fa...662fafd](https://github.com/ChromeDevTools/devtools-protocol/compare/a63b5fa...662fafd)
#### `Page`: new event
* [`Page.windowOpen`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-windowOpen)


## Roll protocol to r507488
###### _2017-10-09 14:16:01_ | Diff: [11ca8ba...a63b5fa](https://github.com/ChromeDevTools/devtools-protocol/compare/11ca8ba...a63b5fa)
#### `Page`: modified event
* [`Page.lifecycleEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-lifecycleEvent) - The `name` in the parameters had `type` _removed_. The `timestamp` in the parameters had `$ref` _removed_. The `name` in the parameters had `name` _updated_. The `timestamp` in the parameters had `name` _updated_. The parameters's `$ref` _added_. The parameters's `description` _added_. The parameters's `type` _added_. The parameters's `timestamp` _added_. 


## Roll protocol to r507347
###### _2017-10-09 03:16:03_ | Diff: [2189599...11ca8ba](https://github.com/ChromeDevTools/devtools-protocol/compare/2189599...11ca8ba)
#### `Network`: modified command
* [`Network.setRequestInterceptionEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setRequestInterceptionEnabled) - `description` updated. The parameters's `resourceTypes` _added_. 


## Roll protocol to r507305
###### _2017-10-08 01:15:50_ | Diff: [555aaea...2189599](https://github.com/ChromeDevTools/devtools-protocol/compare/555aaea...2189599)
#### `Debugger`: modified command
* [`Debugger.setBreakpointByUrl`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setBreakpointByUrl) - The `columnNumber` in the parameters had `name` _updated_. The `columnNumber` in the parameters had `type` _updated_. The `columnNumber` in the parameters had `description` _updated_. The `condition` in the parameters had `name` _updated_. The `condition` in the parameters had `type` _updated_. The `condition` in the parameters had `description` _updated_. The parameters's `experimental` _added_. The parameters's `condition` _added_. 


## Roll protocol to r507040
###### _2017-10-06 06:15:53_ | Diff: [1fd8f9d...555aaea](https://github.com/ChromeDevTools/devtools-protocol/compare/1fd8f9d...555aaea)
#### `Emulation`: new event
* [`Emulation.virtualTimeAdvanced`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeAdvanced)


## Roll protocol to r506815
###### _2017-10-05 12:15:34_ | Diff: [53e8611...7931842](https://github.com/ChromeDevTools/devtools-protocol/compare/53e8611...7931842)
#### `Emulation`: removed event
* [`Emulation.virtualTimeAdvanced`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeAdvanced)


## Roll protocol to r506789
###### _2017-10-05 11:15:33_ | Diff: [d9b6389...53e8611](https://github.com/ChromeDevTools/devtools-protocol/compare/d9b6389...53e8611)
#### `Page`: modified event
* [`Page.frameScheduledNavigation`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameScheduledNavigation) - The `reason` in the parameters had `formSubmission` _updated_. The `reason` in the parameters had `httpHeaderRefresh` _updated_. The `reason` in the parameters had `scriptInitiated` _updated_. The `reason` in the parameters had `metaTagRefresh` _updated_. The `reason` in the parameters had `pageBlockInterstitial` _updated_. The `reason` in the parameters had `reload` _updated_. The `2` in the parameters had `reload` _added_. 
#### `Emulation`: new event
* [`Emulation.virtualTimeAdvanced`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeAdvanced)


## Roll protocol to r505811
###### _2017-10-02 15:15:35_ | Diff: [ae7b452...e81a47d](https://github.com/ChromeDevTools/devtools-protocol/compare/ae7b452...e81a47d)
#### `Animation`: modified types
* [`Animation.Animation`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-Animation) - The `source` in the properties had `$ref` _removed_. The `type` in the properties had `type` _removed_. The `type` in the properties had `enum` _removed_. The `source` in the properties had `name` _updated_. The `source` in the properties had `description` _updated_. The `type` in the properties had `name` _updated_. The `type` in the properties had `description` _updated_. The properties's `type` _added_. The properties's `enum` _added_. The properties's `$ref` _added_. The properties's `optional` _added_. 
* [`Animation.AnimationEffect`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-AnimationEffect) - The properties's `optional` _added_. 


## Roll protocol to r505461
###### _2017-09-29 15:15:43_ | Diff: [80f8dac...ae7b452](https://github.com/ChromeDevTools/devtools-protocol/compare/80f8dac...ae7b452)
#### `Log`: modified type
* [`Log.LogEntry`](https://chromedevtools.github.io/devtools-protocol/tot/Log/#type-LogEntry) - The `source` in the properties had `other` _updated_. The `0` in the properties had `other` _added_. The properties's `args` _added_. 


## Roll protocol to r505240
###### _2017-09-28 18:15:42_ | Diff: [406b6a8...80f8dac](https://github.com/ChromeDevTools/devtools-protocol/compare/406b6a8...80f8dac)
#### `Storage`: new commands
* [`Storage.trackIndexedDBForOrigin`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-trackIndexedDBForOrigin)
* [`Storage.untrackIndexedDBForOrigin`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-untrackIndexedDBForOrigin)
#### `Storage`: new events
* [`Storage.indexedDBListUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#event-indexedDBListUpdated)
* [`Storage.indexedDBContentUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#event-indexedDBContentUpdated)


## Roll protocol to r504912
###### _2017-09-27 22:15:34_ | Diff: [c690a27...406b6a8](https://github.com/ChromeDevTools/devtools-protocol/compare/c690a27...406b6a8)
#### `Runtime`: modified event
* [`Runtime.exceptionRevoked`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-exceptionRevoked) - The `exceptionId` in the parameters had `description` _updated_. 


## Roll protocol to r504880
###### _2017-09-27 20:15:26_ | Diff: [6ab68c9...c690a27](https://github.com/ChromeDevTools/devtools-protocol/compare/6ab68c9...c690a27)
#### `DOM`: modified command
* [`DOM.getSearchResults`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getSearchResults) - `description` updated. 


## Roll protocol to r504262
###### _2017-09-25 19:15:28_ | Diff: [6c8cab7...6ab68c9](https://github.com/ChromeDevTools/devtools-protocol/compare/6c8cab7...6ab68c9)
#### `Network`: modified types
* [`Network.Response`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Response) - The `status` in the properties had `type` _updated_. 
* [`Network.WebSocketResponse`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-WebSocketResponse) - The `status` in the properties had `type` _updated_. 


## Roll protocol to r502201
###### _2017-09-15 01:15:32_ | Diff: [f2d4460...6c8cab7](https://github.com/ChromeDevTools/devtools-protocol/compare/f2d4460...6c8cab7)
#### `ServiceWorker`: new command
* [`ServiceWorker.stopAllWorkers`](https://chromedevtools.github.io/devtools-protocol/tot/ServiceWorker/#method-stopAllWorkers)


## Roll protocol to r501229
###### _2017-09-12 03:15:42_ | Diff: [fee6891...f2d4460](https://github.com/ChromeDevTools/devtools-protocol/compare/fee6891...f2d4460)
#### `Emulation`: new command
* [`Emulation.setNavigatorOverrides`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setNavigatorOverrides)


## Roll protocol to r500703
###### _2017-09-08 15:15:55_ | Diff: [adb2948...fee6891](https://github.com/ChromeDevTools/devtools-protocol/compare/adb2948...fee6891)
#### `Profiler`: new commands
* [`Profiler.startTypeProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-startTypeProfile)
* [`Profiler.stopTypeProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-stopTypeProfile)
* [`Profiler.takeTypeProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-takeTypeProfile)
#### `Profiler`: new types
* [`Profiler.TypeObject`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-TypeObject)
* [`Profiler.TypeProfileEntry`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-TypeProfileEntry)
* [`Profiler.ScriptTypeProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-ScriptTypeProfile)


## Roll protocol to r500564
###### _2017-09-08 04:15:36_ | Diff: [7794931...adb2948](https://github.com/ChromeDevTools/devtools-protocol/compare/7794931...adb2948)
#### `Debugger`: modified type
* [`Debugger.CallFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-CallFrame) - The `scopeChain` in the properties had `items` _removed_. The `this` in the properties had `$ref` _removed_. The `returnValue` in the properties had `optional` _removed_. The `scopeChain` in the properties had `name` _updated_. The `scopeChain` in the properties had `type` _updated_. The `scopeChain` in the properties had `description` _updated_. The `this` in the properties had `name` _updated_. The `this` in the properties had `description` _updated_. The `returnValue` in the properties had `name` _updated_. The `returnValue` in the properties had `description` _updated_. The properties's `type` _added_. The properties's `items` _added_. The properties's `returnValue` _added_. 


## Roll protocol to r500445
###### _2017-09-07 17:15:41_ | Diff: [ce22a9f...7794931](https://github.com/ChromeDevTools/devtools-protocol/compare/ce22a9f...7794931)
#### `Input`: modified type
* [`Input.TouchPoint`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#type-TouchPoint) - The `x` in the properties had `type` _updated_. The `y` in the properties had `type` _updated_. The `radiusX` in the properties had `type` _updated_. The `radiusX` in the properties had `description` _updated_. The `radiusY` in the properties had `type` _updated_. The `radiusY` in the properties had `description` _updated_. 


## Roll protocol to r500221
###### _2017-09-06 22:15:25_ | Diff: [a0d1c79...ce22a9f](https://github.com/ChromeDevTools/devtools-protocol/compare/a0d1c79...ce22a9f)
#### `Network`: modified command
* [`Network.emulateNetworkConditions`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-emulateNetworkConditions) - The `latency` in the parameters had `description` _updated_. The `downloadThroughput` in the parameters had `description` _updated_. The `uploadThroughput` in the parameters had `description` _updated_. 
#### `Network`: modified type
* [`Network.ConnectionType`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-ConnectionType) - `description` updated. 


## Roll protocol to r499605
###### _2017-09-05 05:16:01_ | Diff: [96c09fd...a0d1c79](https://github.com/ChromeDevTools/devtools-protocol/compare/96c09fd...a0d1c79)
#### `Emulation`: new event
* [`Emulation.virtualTimePaused`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimePaused)
#### `Emulation`: modified event
* [`Emulation.virtualTimeBudgetExpired`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeBudgetExpired) - `description` updated. 


## Roll protocol to r499541
###### _2017-09-04 19:15:31_ | Diff: [a7c9118...96c09fd](https://github.com/ChromeDevTools/devtools-protocol/compare/a7c9118...96c09fd)
#### `Page`: modified command
* [`Page.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDeviceMetricsOverride) - The `scale` in the parameters had `description` _updated_. The `screenWidth` in the parameters had `description` _updated_. The `screenHeight` in the parameters had `description` _updated_. The `positionX` in the parameters had `description` _updated_. The `positionY` in the parameters had `description` _updated_. 
#### `Emulation`: modified command
* [`Emulation.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDeviceMetricsOverride) - The `scale` in the parameters had `description` _updated_. The `screenWidth` in the parameters had `description` _updated_. The `screenHeight` in the parameters had `description` _updated_. The `positionX` in the parameters had `description` _updated_. The `positionY` in the parameters had `description` _updated_. 


## Roll protocol to r499413
###### _2017-09-03 02:15:28_ | Diff: [78d5984...a7c9118](https://github.com/ChromeDevTools/devtools-protocol/compare/78d5984...a7c9118)
#### `Emulation`: removed event
* [`Emulation.virtualTimePaused`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimePaused)
#### `Emulation`: modified event
* [`Emulation.virtualTimeBudgetExpired`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeBudgetExpired) - `description` updated. 


## Roll protocol to r499273
###### _2017-09-01 13:15:31_ | Diff: [95fdb0b...78d5984](https://github.com/ChromeDevTools/devtools-protocol/compare/95fdb0b...78d5984)
#### `Runtime`: modified command
* [`Runtime.callFunctionOn`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-callFunctionOn) - The `objectId` in the parameters had `$ref` _removed_. The `functionDeclaration` in the parameters had `type` _removed_. The `objectId` in the parameters had `name` _updated_. The `objectId` in the parameters had `description` _updated_. The `functionDeclaration` in the parameters had `name` _updated_. The `functionDeclaration` in the parameters had `description` _updated_. The parameters's `type` _added_. The parameters's `$ref` _added_. The parameters's `optional` _added_. The parameters's `executionContextId` _added_. The parameters's `objectGroup` _added_. 


## Roll protocol to r498841
###### _2017-08-31 06:16:26_ | Diff: [44bc1f3...95fdb0b](https://github.com/ChromeDevTools/devtools-protocol/compare/44bc1f3...95fdb0b)
#### `Runtime`: modified command
* [`Runtime.callFunctionOn`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-callFunctionOn) - The parameters's `executionContextId` _removed_. The parameters's `objectGroup` _removed_. The `functionDeclaration` in the parameters had `type` _removed_. The `objectId` in the parameters had `$ref` _removed_. The `objectId` in the parameters had `optional` _removed_. The `functionDeclaration` in the parameters had `name` _updated_. The `functionDeclaration` in the parameters had `description` _updated_. The `objectId` in the parameters had `name` _updated_. The `objectId` in the parameters had `description` _updated_. The parameters's `$ref` _added_. The parameters's `type` _added_. 
#### `Emulation`: new event
* [`Emulation.virtualTimePaused`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimePaused)
#### `Emulation`: modified event
* [`Emulation.virtualTimeBudgetExpired`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeBudgetExpired) - `description` updated. 


## Roll protocol to r498768
###### _2017-08-30 23:15:32_ | Diff: [7d46741...44bc1f3](https://github.com/ChromeDevTools/devtools-protocol/compare/7d46741...44bc1f3)
#### `Runtime`: modified command
* [`Runtime.callFunctionOn`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-callFunctionOn) - The `objectId` in the parameters had `$ref` _removed_. The `functionDeclaration` in the parameters had `type` _removed_. The `objectId` in the parameters had `name` _updated_. The `objectId` in the parameters had `description` _updated_. The `functionDeclaration` in the parameters had `name` _updated_. The `functionDeclaration` in the parameters had `description` _updated_. The parameters's `type` _added_. The parameters's `$ref` _added_. The parameters's `optional` _added_. The parameters's `executionContextId` _added_. The parameters's `objectGroup` _added_. 


## Roll protocol to r498659
###### _2017-08-30 16:15:32_ | Diff: [4c6535a...7d46741](https://github.com/ChromeDevTools/devtools-protocol/compare/4c6535a...7d46741)
#### `CacheStorage`: modified type
* [`CacheStorage.DataEntry`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#type-DataEntry) - The `responseTime` in the properties had `name` _updated_. The `responseTime` in the properties had `type` _updated_. The `responseTime` in the properties had `description` _updated_. The `responseHeaders` in the properties had `name` _updated_. The `responseHeaders` in the properties had `description` _updated_. The properties's `responseTime` _added_. The properties's `responseStatus` _added_. The properties's `responseStatusText` _added_. The properties's `responseHeaders` _added_. 


## Roll protocol to r498251
###### _2017-08-29 15:15:42_ | Diff: [a5dfd5d...4c6535a](https://github.com/ChromeDevTools/devtools-protocol/compare/a5dfd5d...4c6535a)
#### `CacheStorage`: new type
* [`CacheStorage.Header`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#type-Header)
#### `CacheStorage`: modified types
* [`CacheStorage.DataEntry`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#type-DataEntry) - The `request` in the properties had `name` _updated_. The `request` in the properties had `description` _updated_. The `response` in the properties had `name` _updated_. The `response` in the properties had `type` _updated_. The `response` in the properties had `description` _updated_. The `responseTime` in the properties had `name` _updated_. The `responseTime` in the properties had `type` _updated_. The `responseTime` in the properties had `description` _updated_. The properties's `items` _added_. 
* [`CacheStorage.CachedResponse`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#type-CachedResponse) - The properties's `body` _removed_. The `headers` in the properties had `name` _updated_. The `headers` in the properties had `type` _updated_. The `headers` in the properties had `description` _updated_. 


## Roll protocol to r497858
###### _2017-08-28 13:15:33_ | Diff: [afb185e...a5dfd5d](https://github.com/ChromeDevTools/devtools-protocol/compare/afb185e...a5dfd5d)
#### `Runtime`: modified type
* [`Runtime.CallArgument`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-CallArgument) - The `value` in the properties had `description` _updated_. 


## Roll protocol to r497762
###### _2017-08-28 08:15:29_ | Diff: [03d4f5f...afb185e](https://github.com/ChromeDevTools/devtools-protocol/compare/03d4f5f...afb185e)
#### `Runtime`: modified type
* [`Runtime.CallArgument`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-CallArgument) - The `value` in the properties had `description` _updated_. 


## Roll protocol to r497708
###### _2017-08-28 01:15:30_ | Diff: [0958f69...03d4f5f](https://github.com/ChromeDevTools/devtools-protocol/compare/0958f69...03d4f5f)
#### `Memory`: new command
* [`Memory.prepareForLeakDetection`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-prepareForLeakDetection)


## Roll protocol to r497654
###### _2017-08-25 22:15:24_ | Diff: [7f086f5...0958f69](https://github.com/ChromeDevTools/devtools-protocol/compare/7f086f5...0958f69)
#### `Runtime`: modified type
* [`Runtime.CallArgument`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-CallArgument) - The `value` in the properties had `description` _updated_. 


## Roll protocol to r497463
###### _2017-08-25 11:15:26_ | Diff: [57e8992...7f086f5](https://github.com/ChromeDevTools/devtools-protocol/compare/57e8992...7f086f5)
#### `Security`: modified type
* [`Security.SecurityState`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#type-SecurityState) - The enum's `info` _removed_. The enum's `warning` _updated_. The enum's `secure` _updated_. 


## Roll protocol to r497428
###### _2017-08-25 09:15:25_ | Diff: [dd57a17...57e8992](https://github.com/ChromeDevTools/devtools-protocol/compare/dd57a17...57e8992)
#### `Network`: modified command
* [`Network.setRequestInterceptionEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setRequestInterceptionEnabled) - The `enabled` in the parameters had `description` _updated_. `description` added. The parameters's `patterns` _added_. 


## Roll protocol to r496905
###### _2017-08-23 18:15:33_ | Diff: [3789a0d...dd57a17](https://github.com/ChromeDevTools/devtools-protocol/compare/3789a0d...dd57a17)
#### `Runtime`: modified command
* [`Runtime.queryObjects`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-queryObjects) - The `constructorObjectId` in the parameters had `name` _updated_. The `constructorObjectId` in the parameters had `description` _updated_. 


## Roll protocol to r496688
###### _2017-08-23 08:15:29_ | Diff: [326cc31...3789a0d](https://github.com/ChromeDevTools/devtools-protocol/compare/326cc31...3789a0d)
#### `Profiler`: modified command
* [`Profiler.startPreciseCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-startPreciseCoverage) - The parameters's `detailed` _added_. 


## Roll protocol to r496607
###### _2017-08-23 00:15:24_ | Diff: [a223c0c...326cc31](https://github.com/ChromeDevTools/devtools-protocol/compare/a223c0c...326cc31)
#### `Page`: new event
* [`Page.lifecycleEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-lifecycleEvent)


## Roll protocol to r496585
###### _2017-08-22 21:15:27_ | Diff: [f1b621f...a223c0c](https://github.com/ChromeDevTools/devtools-protocol/compare/f1b621f...a223c0c)
#### `Page`: new command
* [`Page.setDownloadBehavior`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDownloadBehavior)


## Roll protocol to r496160
###### _2017-08-21 18:15:31_ | Diff: [7109da3...f1b621f](https://github.com/ChromeDevTools/devtools-protocol/compare/7109da3...f1b621f)
#### `DOM`: new command
* [`DOM.describeNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-describeNode)


## Roll protocol to r496061
###### _2017-08-21 14:15:32_ | Diff: [1da2f21...7109da3](https://github.com/ChromeDevTools/devtools-protocol/compare/1da2f21...7109da3)
#### `Runtime`: new command
* [`Runtime.queryObjects`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-queryObjects)


## Roll protocol to r495853
###### _2017-08-20 15:15:25_ | Diff: [40a1403...1da2f21](https://github.com/ChromeDevTools/devtools-protocol/compare/40a1403...1da2f21)
#### `DOM`: modified command
* [`DOM.getOuterHTML`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getOuterHTML) - The `nodeId` in the parameters had `description` _updated_. The parameters's `optional` _added_. The parameters's `backendNodeId` _added_. The parameters's `objectId` _added_. 


## Roll protocol to r495828
###### _2017-08-19 15:15:24_ | Diff: [f253796...40a1403](https://github.com/ChromeDevTools/devtools-protocol/compare/f253796...40a1403)
#### `Audits`: new domain
* [`Audits.Audits`](https://chromedevtools.github.io/devtools-protocol/tot/Audits/#domain-Audits)
#### `Audits`: new command
* [`Audits.getEncodedResponse`](https://chromedevtools.github.io/devtools-protocol/tot/Audits/#method-getEncodedResponse)


## Roll protocol to r495269
###### _2017-08-17 12:15:44_ | Diff: [c10facc...f253796](https://github.com/ChromeDevTools/devtools-protocol/compare/c10facc...f253796)
#### `Network`: new command
* [`Network.deleteCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-deleteCookies)
#### `Network`: removed command
* [`Network.deleteCookie`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-deleteCookie)


## Roll protocol to r495009
###### _2017-08-16 17:15:31_ | Diff: [c10e566...c10facc](https://github.com/ChromeDevTools/devtools-protocol/compare/c10e566...c10facc)
#### `Input`: modified command
* [`Input.dispatchTouchEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchTouchEvent) - The `type` in the parameters had `description` _updated_. The `touchPoints` in the parameters had `description` _updated_. The `0` in the parameters had `touchCancel` _added_. 
#### `Input`: modified type
* [`Input.TouchPoint`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#type-TouchPoint) - The properties's `id` _removed_. The `state` in the properties had `enum` _removed_. The `state` in the properties had `name` _updated_. The `state` in the properties had `type` _updated_. The `state` in the properties had `description` _updated_. The `x` in the properties had `name` _updated_. The `x` in the properties had `description` _updated_. The `y` in the properties had `name` _updated_. The `y` in the properties had `description` _updated_. The `radiusX` in the properties had `name` _updated_. The `radiusX` in the properties had `description` _updated_. The `radiusY` in the properties had `name` _updated_. The `radiusY` in the properties had `type` _updated_. The `radiusY` in the properties had `description` _updated_. The `rotationAngle` in the properties had `name` _updated_. The `rotationAngle` in the properties had `description` _updated_. The `force` in the properties had `name` _updated_. The `force` in the properties had `description` _updated_. The properties's `optional` _added_. 


## Roll protocol to r494622
###### _2017-08-15 17:15:31_ | Diff: [2090c47...c10e566](https://github.com/ChromeDevTools/devtools-protocol/compare/2090c47...c10e566)
#### `Network`: new command
* [`Network.setCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCookies)
#### `Network`: modified command
* [`Network.setCookie`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCookie) - The `url` in the parameters had `name` _updated_. The `url` in the parameters had `description` _updated_. The `name` in the parameters had `name` _updated_. The `name` in the parameters had `description` _updated_. The `value` in the parameters had `name` _updated_. The `value` in the parameters had `description` _updated_. The `domain` in the parameters had `description` _updated_. The `path` in the parameters had `description` _updated_. The `secure` in the parameters had `description` _updated_. The `httpOnly` in the parameters had `description` _updated_. The `sameSite` in the parameters had `description` _updated_. The `expirationDate` in the parameters had `name` _updated_. The `expirationDate` in the parameters had `description` _updated_. The parameters's `optional` _added_. 
#### `Network`: new type
* [`Network.CookieParam`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-CookieParam)
#### `Input`: modified command
* [`Input.dispatchMouseEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchMouseEvent) - The `0` in the parameters had `mouseWheel` _added_. The parameters's `deltaX` _added_. The parameters's `deltaY` _added_. 


## Roll protocol to r494333
###### _2017-08-14 23:15:20_ | Diff: [993dd10...2090c47](https://github.com/ChromeDevTools/devtools-protocol/compare/993dd10...2090c47)
#### `Runtime`: modified commands
* [`Runtime.evaluate`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate) - The `awaitPromise` in the parameters had `description` _updated_. 
* [`Runtime.callFunctionOn`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-callFunctionOn) - The `awaitPromise` in the parameters had `description` _updated_. 
* [`Runtime.runScript`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-runScript) - The `awaitPromise` in the parameters had `description` _updated_. 


## Roll protocol to r494302
###### _2017-08-14 19:15:35_ | Diff: [e71b448...993dd10](https://github.com/ChromeDevTools/devtools-protocol/compare/e71b448...993dd10)
#### `Overlay`: modified type
* [`Overlay.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#type-HighlightConfig) - The properties's `cssGridColor` _added_. 


## Roll protocol to r494191
###### _2017-08-14 14:15:39_ | Diff: [f1217c8...e71b448](https://github.com/ChromeDevTools/devtools-protocol/compare/f1217c8...e71b448)
#### `Performance`: new event
* [`Performance.metrics`](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#event-metrics)
#### `Storage`: new commands
* [`Storage.trackCacheStorageForOrigin`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-trackCacheStorageForOrigin)
* [`Storage.untrackCacheStorageForOrigin`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-untrackCacheStorageForOrigin)
#### `Storage`: new events
* [`Storage.cacheStorageListUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#event-cacheStorageListUpdated)
* [`Storage.cacheStorageContentUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#event-cacheStorageContentUpdated)


## Roll protocol to r493957
###### _2017-08-11 22:15:29_ | Diff: [c314a8c...f1217c8](https://github.com/ChromeDevTools/devtools-protocol/compare/c314a8c...f1217c8)
#### `Browser`: new command
* [`Browser.getVersion`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getVersion)


## Roll protocol to r493949
###### _2017-08-11 20:15:31_ | Diff: [f1415d2...c314a8c](https://github.com/ChromeDevTools/devtools-protocol/compare/f1415d2...c314a8c)
#### `Security`: removed command
* [`Security.showCertificateViewer`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#method-showCertificateViewer)
#### `Security`: modified type
* [`Security.SecurityStateExplanation`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#type-SecurityStateExplanation) - The `hasCertificate` in the properties had `type` _removed_. The `mixedContentType` in the properties had `$ref` _removed_. The `hasCertificate` in the properties had `name` _updated_. The `hasCertificate` in the properties had `description` _updated_. The `mixedContentType` in the properties had `name` _updated_. The `mixedContentType` in the properties had `description` _updated_. The properties's `$ref` _added_. The properties's `type` _added_. The properties's `items` _added_. 


## Roll protocol to r493629
###### _2017-08-10 18:15:28_ | Diff: [97e6602...f1415d2](https://github.com/ChromeDevTools/devtools-protocol/compare/97e6602...f1415d2)
#### `Performance`: new domain
* [`Performance.Performance`](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#domain-Performance)
#### `Performance`: new commands
* [`Performance.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#method-enable)
* [`Performance.disable`](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#method-disable)
* [`Performance.getMetrics`](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#method-getMetrics)
#### `Performance`: new type
* [`Performance.Metric`](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#type-Metric)


## Roll protocol to r493463
###### _2017-08-10 11:15:27_ | Diff: [6a97ff4...97e6602](https://github.com/ChromeDevTools/devtools-protocol/compare/6a97ff4...97e6602)
#### `Emulation`: new command
* [`Emulation.setEmitTouchEventsForMouse`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setEmitTouchEventsForMouse)
#### `Emulation`: modified command
* [`Emulation.setTouchEmulationEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setTouchEmulationEnabled) - The `configuration` in the parameters had `enum` _removed_. The `configuration` in the parameters had `name` _updated_. The `configuration` in the parameters had `type` _updated_. The `configuration` in the parameters had `description` _updated_. `description` updated. 


## Roll protocol to r492915
###### _2017-08-09 02:15:29_ | Diff: [34e6ca8...6a97ff4](https://github.com/ChromeDevTools/devtools-protocol/compare/34e6ca8...6a97ff4)
#### `CSS`: modified command
* [`CSS.getBackgroundColors`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getBackgroundColors) - The return value's `computedFontSize` _added_. The return value's `computedFontWeight` _added_. The return value's `computedBodyFontSize` _added_. 


## Roll protocol to r491719
###### _2017-08-03 06:15:23_ | Diff: [ff44833...34e6ca8](https://github.com/ChromeDevTools/devtools-protocol/compare/ff44833...34e6ca8)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode) - The `frameId` in the properties had `description` _updated_. 


## Roll protocol to r491274
###### _2017-08-01 22:15:27_ | Diff: [80d4068...ff44833](https://github.com/ChromeDevTools/devtools-protocol/compare/80d4068...ff44833)
#### `Page`: modified events
* [`Page.javascriptDialogOpening`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-javascriptDialogOpening) - The `type` in the parameters had `$ref` _removed_. The `message` in the parameters had `name` _updated_. The `message` in the parameters had `description` _updated_. The `type` in the parameters had `name` _updated_. The `type` in the parameters had `description` _updated_. The parameters's `type` _added_ (2 times). The parameters's `defaultPrompt` _added_. 
* [`Page.javascriptDialogClosed`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-javascriptDialogClosed) - The parameters's `userInput` _added_. 


## Roll protocol to r491147
###### _2017-08-01 16:15:38_ | Diff: [598f59e...80d4068](https://github.com/ChromeDevTools/devtools-protocol/compare/598f59e...80d4068)
#### `Accessibility`: modified types
* [`Accessibility.AXGlobalStates`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXGlobalStates) - The enum's `disabled` _updated_. The enum's `hidden` _updated_. The enum's `hiddenRoot` _updated_. The enum's `invalid` _updated_. The enum's `keyshortcuts` _updated_. The enum's `roledescription` _updated_. The enum's `roledescription` _added_. 
* [`Accessibility.AXLiveRegionAttributes`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXLiveRegionAttributes) - The enum's `root` _removed_. The enum's `busy` _updated_. 


## Roll protocol to r490913
###### _2017-08-01 01:15:27_ | Diff: [6dbc46a...598f59e](https://github.com/ChromeDevTools/devtools-protocol/compare/6dbc46a...598f59e)
#### `Page`: removed commands
* [`Page.setControlNavigations`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setControlNavigations)
* [`Page.processNavigation`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-processNavigation)
#### `Page`: removed event
* [`Page.navigationRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-navigationRequested)
#### `Network`: modified command
* [`Network.continueInterceptedRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-continueInterceptedRequest) - The `errorReason` in the parameters had `description` _updated_. 
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted) - The `redirectHeaders` in the parameters had `$ref` _removed_. The `redirectHeaders` in the parameters had `optional` _removed_. The `redirectStatusCode` in the parameters had `type` _removed_. The `authChallenge` in the parameters had `$ref` _removed_. The `redirectHeaders` in the parameters had `name` _updated_. The `redirectHeaders` in the parameters had `description` _updated_. The `redirectStatusCode` in the parameters had `name` _updated_. The `redirectStatusCode` in the parameters had `description` _updated_. The `redirectUrl` in the parameters had `name` _updated_. The `redirectUrl` in the parameters had `type` _updated_. The `redirectUrl` in the parameters had `description` _updated_. The `authChallenge` in the parameters had `name` _updated_. The `authChallenge` in the parameters had `description` _updated_. The parameters's `type` _added_ (2 times). The parameters's `$ref` _added_. The parameters's `authChallenge` _added_. 


## Roll protocol to r490738
###### _2017-07-31 03:15:36_ | Diff: [815efee...6dbc46a](https://github.com/ChromeDevTools/devtools-protocol/compare/815efee...6dbc46a)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode) - The `frameId` in the properties had `$ref` _removed_. The `contentDocumentIndex` in the properties had `type` _removed_. The `pseudoType` in the properties had `$ref` _removed_. The `isClickable` in the properties had `type` _removed_. The `publicId` in the properties had `name` _updated_. The `publicId` in the properties had `description` _updated_. The `systemId` in the properties had `name` _updated_. The `systemId` in the properties had `description` _updated_. The `frameId` in the properties had `name` _updated_. The `frameId` in the properties had `description` _updated_. The `contentDocumentIndex` in the properties had `name` _updated_. The `contentDocumentIndex` in the properties had `description` _updated_. The `importedDocumentIndex` in the properties had `name` _updated_. The `importedDocumentIndex` in the properties had `description` _updated_. The `templateContentIndex` in the properties had `name` _updated_. The `templateContentIndex` in the properties had `description` _updated_. The `pseudoType` in the properties had `name` _updated_. The `pseudoType` in the properties had `description` _updated_. The `isClickable` in the properties had `name` _updated_. The `isClickable` in the properties had `description` _updated_. The properties's `type` _added_ (2 times). The properties's `$ref` _added_ (2 times). The properties's `isClickable` _added_. 


## Roll protocol to r490636
###### _2017-07-28 23:15:20_ | Diff: [d1125b4...815efee](https://github.com/ChromeDevTools/devtools-protocol/compare/d1125b4...815efee)
#### `Page`: new command
* [`Page.setAdBlockingEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setAdBlockingEnabled)


## Roll protocol to r490621
###### _2017-07-28 21:15:20_ | Diff: [44c6002...d1125b4](https://github.com/ChromeDevTools/devtools-protocol/compare/44c6002...d1125b4)
#### `Overlay`: new event
* [`Overlay.screenshotRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#event-screenshotRequested)


## Roll protocol to r489908
###### _2017-07-27 06:15:23_ | Diff: [057127c...44c6002](https://github.com/ChromeDevTools/devtools-protocol/compare/057127c...44c6002)
#### `LayerTree`: new type
* [`LayerTree.StickyPositionConstraint`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#type-StickyPositionConstraint)
#### `LayerTree`: modified type
* [`LayerTree.Layer`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#type-Layer) - The properties's `stickyPositionConstraint` _added_. 


## Roll protocol to r489613
###### _2017-07-26 05:15:21_ | Diff: [fe85a1b...057127c](https://github.com/ChromeDevTools/devtools-protocol/compare/fe85a1b...057127c)
#### `Page`: modified event
* [`Page.frameScheduledNavigation`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameScheduledNavigation) - The parameters's `url` _added_. 


## Roll protocol to r489413
###### _2017-07-25 13:15:27_ | Diff: [9433945...fe85a1b](https://github.com/ChromeDevTools/devtools-protocol/compare/9433945...fe85a1b)
#### `Page`: new command
* [`Page.bringToFront`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-bringToFront)


## Roll protocol to r489024
###### _2017-07-24 11:15:50_ | Diff: [07508bb...9433945](https://github.com/ChromeDevTools/devtools-protocol/compare/07508bb...9433945)
#### `Page`: modified event
* [`Page.frameScheduledNavigation`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameScheduledNavigation) - The parameters's `reason` _added_. 
#### `IO`: modified command
* [`IO.read`](https://chromedevtools.github.io/devtools-protocol/tot/IO/#method-read) - The `data` in the return value had `name` _updated_. The `data` in the return value had `type` _updated_. The `data` in the return value had `description` _updated_. The `eof` in the return value had `name` _updated_. The `eof` in the return value had `type` _updated_. The `eof` in the return value had `description` _updated_. The return value's `optional` _added_. The return value's `eof` _added_. 
#### `IO`: modified type
* [`IO.StreamHandle`](https://chromedevtools.github.io/devtools-protocol/tot/IO/#type-StreamHandle) - `description` added. 


## Roll protocol to r488771
###### _2017-07-21 15:15:36_ | Diff: [a156198...07508bb](https://github.com/ChromeDevTools/devtools-protocol/compare/a156198...07508bb)
#### `IO`: new command
* [`IO.resolveBlob`](https://chromedevtools.github.io/devtools-protocol/tot/IO/#method-resolveBlob)


## Roll protocol to r488639
###### _2017-07-21 06:15:18_ | Diff: [3f4dbfa...a156198](https://github.com/ChromeDevTools/devtools-protocol/compare/3f4dbfa...a156198)
#### `Page`: modified type
* [`Page.Frame`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-Frame) - The `unreachableUrl` in the properties had `optional` _updated_. The `unreachableUrl` in the properties had `experimental` _updated_. 


## Roll protocol to r488555
###### _2017-07-20 19:15:23_ | Diff: [6a7416a...3f4dbfa](https://github.com/ChromeDevTools/devtools-protocol/compare/6a7416a...3f4dbfa)
#### `CacheStorage`: new command
* [`CacheStorage.requestCachedResponse`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#method-requestCachedResponse)
#### `CacheStorage`: new type
* [`CacheStorage.CachedResponse`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#type-CachedResponse)


## Roll protocol to r488475
###### _2017-07-20 16:15:20_ | Diff: [24063d5...6a7416a](https://github.com/ChromeDevTools/devtools-protocol/compare/24063d5...6a7416a)
#### `Page`: modified command
* [`Page.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDeviceMetricsOverride) - The parameters's `positionY` _removed_. The parameters's `screenOrientation` _removed_. The `positionX` in the parameters had `type` _removed_. The `fitWindow` in the parameters had `name` _updated_. The `fitWindow` in the parameters had `type` _updated_. The `fitWindow` in the parameters had `description` _updated_. The `scale` in the parameters had `name` _updated_. The `scale` in the parameters had `type` _updated_. The `scale` in the parameters had `description` _updated_. The `offsetX` in the parameters had `name` _updated_. The `offsetX` in the parameters had `type` _updated_. The `offsetX` in the parameters had `description` _updated_. The `offsetY` in the parameters had `name` _updated_. The `offsetY` in the parameters had `type` _updated_. The `offsetY` in the parameters had `description` _updated_. The `screenWidth` in the parameters had `name` _updated_. The `screenWidth` in the parameters had `description` _updated_. The `screenHeight` in the parameters had `name` _updated_. The `screenHeight` in the parameters had `type` _updated_. The `screenHeight` in the parameters had `description` _updated_. The `positionX` in the parameters had `name` _updated_. The `positionX` in the parameters had `description` _updated_. The parameters's `$ref` _added_. 
#### `Emulation`: modified commands
* [`Emulation.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDeviceMetricsOverride) - The parameters's `positionY` _removed_. The parameters's `screenOrientation` _removed_. The `offsetX` in the parameters had `deprecated` _removed_. The `offsetY` in the parameters had `deprecated` _removed_. The `positionX` in the parameters had `type` _removed_. The `positionX` in the parameters had `experimental` _removed_. The `fitWindow` in the parameters had `name` _updated_. The `fitWindow` in the parameters had `type` _updated_. The `fitWindow` in the parameters had `description` _updated_. The `scale` in the parameters had `name` _updated_. The `scale` in the parameters had `type` _updated_. The `scale` in the parameters had `description` _updated_. The `offsetX` in the parameters had `name` _updated_. The `offsetX` in the parameters had `type` _updated_. The `offsetX` in the parameters had `description` _updated_. The `offsetY` in the parameters had `name` _updated_. The `offsetY` in the parameters had `type` _updated_. The `offsetY` in the parameters had `description` _updated_. The `screenWidth` in the parameters had `name` _updated_. The `screenWidth` in the parameters had `description` _updated_. The `screenHeight` in the parameters had `name` _updated_. The `screenHeight` in the parameters had `type` _updated_. The `screenHeight` in the parameters had `description` _updated_. The `positionX` in the parameters had `name` _updated_. The `positionX` in the parameters had `description` _updated_. The parameters's `$ref` _added_. 
* [`Emulation.setVisibleSize`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVisibleSize) - `description` updated. 


## Roll protocol to r488407
###### _2017-07-20 14:15:34_ | Diff: [0247171...24063d5](https://github.com/ChromeDevTools/devtools-protocol/compare/0247171...24063d5)
#### `Target`: modified commands
* [`Target.sendMessageToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-sendMessageToTarget) - The `targetId` in the parameters had `$ref` _removed_. The `message` in the parameters had `type` _removed_. `description` updated. The `targetId` in the parameters had `name` _updated_. The `message` in the parameters had `name` _updated_. The parameters's `type` _added_. The parameters's `$ref` _added_. The parameters's `optional` _added_. The parameters's `description` _added_. The parameters's `targetId` _added_. 
* [`Target.attachToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget) - The `success` in the return value had `type` _removed_. The `success` in the return value had `name` _updated_. The `success` in the return value had `description` _updated_. The return value's `$ref` _added_. 
* [`Target.detachFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-detachFromTarget) - `description` updated. The `targetId` in the parameters had `name` _updated_. The `targetId` in the parameters had `$ref` _updated_. The parameters's `optional` _added_. The parameters's `description` _added_. The parameters's `targetId` _added_. 
#### `Target`: modified events
* [`Target.attachedToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-attachedToTarget) - The `waitingForDebugger` in the parameters had `type` _removed_. The `targetInfo` in the parameters had `name` _updated_. The `targetInfo` in the parameters had `$ref` _updated_. The `waitingForDebugger` in the parameters had `name` _updated_. The parameters's `description` _added_. The parameters's `$ref` _added_. The parameters's `waitingForDebugger` _added_. 
* [`Target.detachedFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-detachedFromTarget) - `description` updated. The `targetId` in the parameters had `name` _updated_. The `targetId` in the parameters had `$ref` _updated_. The parameters's `description` _added_. The parameters's `targetId` _added_. 
* [`Target.receivedMessageFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-receivedMessageFromTarget) - `description` updated. The `targetId` in the parameters had `name` _updated_. The `targetId` in the parameters had `$ref` _updated_. The parameters's `description` _added_. The parameters's `targetId` _added_. 
#### `Target`: new type
* [`Target.SessionID`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#type-SessionID)


## Roll protocol to r487821
###### _2017-07-19 04:15:25_ | Diff: [1d10caf...0247171](https://github.com/ChromeDevTools/devtools-protocol/compare/1d10caf...0247171)
#### `Page`: modified command
* [`Page.printToPDF`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF) - The parameters's `ignoreInvalidPageRanges` _added_. 
#### `Page`: modified type
* [`Page.Frame`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-Frame) - The properties's `unreachableUrl` _added_. 


## Roll protocol to r486590
###### _2017-07-13 18:15:23_ | Diff: [9612949...1d10caf](https://github.com/ChromeDevTools/devtools-protocol/compare/9612949...1d10caf)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode) - The `backendNodeId` in the properties had `$ref` _removed_. The `childNodeIndexes` in the properties had `items` _removed_. The `attributes` in the properties had `items` _removed_. The `pseudoElementIndexes` in the properties had `items` _removed_. The `layoutNodeIndex` in the properties had `type` _removed_. The `layoutNodeIndex` in the properties had `optional` _removed_. The `frameId` in the properties had `$ref` _removed_. The `backendNodeId` in the properties had `name` _updated_. The `backendNodeId` in the properties had `description` _updated_. The `childNodeIndexes` in the properties had `name` _updated_. The `childNodeIndexes` in the properties had `type` _updated_. The `childNodeIndexes` in the properties had `description` _updated_. The `attributes` in the properties had `name` _updated_. The `attributes` in the properties had `type` _updated_. The `attributes` in the properties had `description` _updated_. The `pseudoElementIndexes` in the properties had `name` _updated_. The `pseudoElementIndexes` in the properties had `type` _updated_. The `pseudoElementIndexes` in the properties had `description` _updated_. The `layoutNodeIndex` in the properties had `name` _updated_. The `layoutNodeIndex` in the properties had `description` _updated_. The `documentURL` in the properties had `name` _updated_. The `documentURL` in the properties had `type` _updated_. The `documentURL` in the properties had `description` _updated_. The `baseURL` in the properties had `name` _updated_. The `baseURL` in the properties had `type` _updated_. The `baseURL` in the properties had `description` _updated_. The `contentLanguage` in the properties had `name` _updated_. The `contentLanguage` in the properties had `type` _updated_. The `contentLanguage` in the properties had `description` _updated_. The `publicId` in the properties had `name` _updated_. The `publicId` in the properties had `type` _updated_. The `publicId` in the properties had `description` _updated_. The `systemId` in the properties had `name` _updated_. The `systemId` in the properties had `description` _updated_. The `frameId` in the properties had `name` _updated_. The `frameId` in the properties had `description` _updated_. The `contentDocumentIndex` in the properties had `name` _updated_. The `contentDocumentIndex` in the properties had `type` _updated_. The `contentDocumentIndex` in the properties had `description` _updated_. The `importedDocumentIndex` in the properties had `name` _updated_. The `importedDocumentIndex` in the properties had `type` _updated_. The `importedDocumentIndex` in the properties had `description` _updated_. The `templateContentIndex` in the properties had `name` _updated_. The `templateContentIndex` in the properties had `type` _updated_. The `templateContentIndex` in the properties had `description` _updated_. The `pseudoType` in the properties had `name` _updated_. The `pseudoType` in the properties had `$ref` _updated_. The `pseudoType` in the properties had `description` _updated_. The `isClickable` in the properties had `name` _updated_. The `isClickable` in the properties had `type` _updated_. The `isClickable` in the properties had `description` _updated_. The properties's `type` _added_ (2 times). The properties's `optional` _added_. The properties's `$ref` _added_. The properties's `items` _added_ (3 times). The properties's `importedDocumentIndex` _added_. The properties's `templateContentIndex` _added_. The properties's `pseudoType` _added_. The properties's `isClickable` _added_. 


## Roll protocol to r486216
###### _2017-07-12 18:55:05_ | Diff: [361ec60...1329e26](https://github.com/ChromeDevTools/devtools-protocol/compare/361ec60...1329e26)
#### `DOM`: modified commands
* [`DOM.focus`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-focus) - The `nodeId` in the parameters had `description` _updated_. The parameters's `optional` _added_. The parameters's `backendNodeId` _added_. The parameters's `objectId` _added_. 
* [`DOM.setFileInputFiles`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setFileInputFiles) - The `nodeId` in the parameters had `$ref` _removed_. The `files` in the parameters had `type` _removed_. The `files` in the parameters had `items` _removed_. The `nodeId` in the parameters had `name` _updated_. The `nodeId` in the parameters had `description` _updated_. The `files` in the parameters had `name` _updated_. The `files` in the parameters had `description` _updated_. The parameters's `type` _added_. The parameters's `items` _added_. The parameters's `$ref` _added_. The parameters's `optional` _added_. The parameters's `backendNodeId` _added_. The parameters's `objectId` _added_. 
* [`DOM.getBoxModel`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getBoxModel) - The `nodeId` in the parameters had `description` _updated_. The parameters's `optional` _added_. The parameters's `backendNodeId` _added_. The parameters's `objectId` _added_. 


## Roll protocol to r486175
###### _2017-07-12 17:15:26_ | Diff: [ea90b21...361ec60](https://github.com/ChromeDevTools/devtools-protocol/compare/ea90b21...361ec60)
#### `Input`: modified commands
* [`Input.dispatchMouseEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchMouseEvent) - The `x` in the parameters had `type` _updated_. The `x` in the parameters had `description` _updated_. The `y` in the parameters had `type` _updated_. The `y` in the parameters had `description` _updated_. 
* [`Input.synthesizePinchGesture`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-synthesizePinchGesture) - The `x` in the parameters had `type` _updated_. The `y` in the parameters had `type` _updated_. 
* [`Input.synthesizeScrollGesture`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-synthesizeScrollGesture) - The `x` in the parameters had `type` _updated_. The `y` in the parameters had `type` _updated_. The `xDistance` in the parameters had `type` _updated_. The `yDistance` in the parameters had `type` _updated_. The `xOverscroll` in the parameters had `type` _updated_. The `yOverscroll` in the parameters had `type` _updated_. 
* [`Input.synthesizeTapGesture`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-synthesizeTapGesture) - The `x` in the parameters had `type` _updated_. The `y` in the parameters had `type` _updated_. 


## Roll protocol to r485940 485678
###### _2017-07-12 07:15:22_ | Diff: [3553411...9edfb70](https://github.com/ChromeDevTools/devtools-protocol/compare/3553411...9edfb70)
#### `Page`: modified command
* [`Page.captureScreenshot`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot) - The `fromSurface` in the parameters had `type` _removed_. The `fromSurface` in the parameters had `name` _updated_. The `fromSurface` in the parameters had `description` _updated_. The parameters's `$ref` _added_. The parameters's `fromSurface` _added_. 
#### `Page`: new type
* [`Page.Viewport`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-Viewport)


## Roll protocol to r485689 485314
###### _2017-07-11 12:15:29_ | Diff: [837a781...3553411](https://github.com/ChromeDevTools/devtools-protocol/compare/837a781...3553411)
#### `Page`: modified command
* [`Page.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDeviceMetricsOverride) - The parameters's `optional` _added_. 
#### `Emulation`: removed commands
* [`Emulation.forceViewport`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-forceViewport)
* [`Emulation.resetViewport`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-resetViewport)
#### `Emulation`: modified commands
* [`Emulation.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDeviceMetricsOverride) - The parameters's `optional` _added_. 
* [`Emulation.setVisibleSize`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVisibleSize) - `description` updated. `deprecated` added. 


## Roll protocol to r485250
###### _2017-07-10 06:15:19_ | Diff: [25c87f6...837a781](https://github.com/ChromeDevTools/devtools-protocol/compare/25c87f6...837a781)
#### `DOM`: modified command
* [`DOM.resolveNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-resolveNode) - The `objectGroup` in the parameters had `type` _removed_. The `objectGroup` in the parameters had `name` _updated_. The `objectGroup` in the parameters had `description` _updated_. `description` updated. The parameters's `optional` _added_. The parameters's `$ref` _added_. The parameters's `objectGroup` _added_. 


## Roll protocol to r485002
###### _2017-07-07 12:15:19_ | Diff: [0589169...25c87f6](https://github.com/ChromeDevTools/devtools-protocol/compare/0589169...25c87f6)
#### `Network`: new command
* [`Network.setRequestInterceptionEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setRequestInterceptionEnabled)
#### `Network`: removed command
* [`Network.enableRequestInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-enableRequestInterception)


## Roll protocol to r484724
###### _2017-07-06 13:15:20_ | Diff: [40987ca...0589169](https://github.com/ChromeDevTools/devtools-protocol/compare/40987ca...0589169)
#### `Page`: new commands
* [`Page.addScriptToEvaluateOnNewDocument`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-addScriptToEvaluateOnNewDocument)
* [`Page.removeScriptToEvaluateOnNewDocument`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-removeScriptToEvaluateOnNewDocument)
#### `Page`: modified commands
* [`Page.addScriptToEvaluateOnLoad`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-addScriptToEvaluateOnLoad) - `deprecated` added. `description` added. 
* [`Page.removeScriptToEvaluateOnLoad`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-removeScriptToEvaluateOnLoad) - `deprecated` added. `description` added. 


## Roll protocol to r484463
###### _2017-07-05 21:15:19_ | Diff: [3cca818...40987ca](https://github.com/ChromeDevTools/devtools-protocol/compare/3cca818...40987ca)
#### `Security`: new type
* [`Security.MixedContentType`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#type-MixedContentType)
#### `Security`: modified type
* [`Security.SecurityStateExplanation`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#type-SecurityStateExplanation) - The properties's `mixedContentType` _added_. 
#### `Network`: modified type
* [`Network.Request`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Request) - The `mixedContentType` in the properties had `type` _removed_. The `mixedContentType` in the properties had `enum` _removed_. The `mixedContentType` in the properties had `description` _updated_. The properties's `$ref` _added_. 


## Roll protocol to r484434
###### _2017-07-05 18:15:34_ | Diff: [81ccf3f...3cca818](https://github.com/ChromeDevTools/devtools-protocol/compare/81ccf3f...3cca818)
#### `Page`: modified events
* [`Page.domContentEventFired`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-domContentEventFired) - The `timestamp` in the parameters had `type` _removed_. The parameters's `$ref` _added_. 
* [`Page.loadEventFired`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-loadEventFired) - The `timestamp` in the parameters had `type` _removed_. The parameters's `$ref` _added_. 
#### `Page`: modified types
* [`Page.FrameResource`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-FrameResource) - The `lastModified` in the properties had `$ref` _updated_. 
* [`Page.ScreencastFrameMetadata`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-ScreencastFrameMetadata) - The `timestamp` in the properties had `type` _removed_. The properties's `$ref` _added_. 
#### `Network`: modified command
* [`Network.setCookie`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCookie) - The `expirationDate` in the parameters had `$ref` _updated_. 
#### `Network`: modified events
* [`Network.resourceChangedPriority`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-resourceChangedPriority) - The `timestamp` in the parameters had `$ref` _updated_. 
* [`Network.requestWillBeSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestWillBeSent) - The `timestamp` in the parameters had `$ref` _updated_. The `wallTime` in the parameters had `$ref` _updated_. The `wallTime` in the parameters had `description` _updated_. 
* [`Network.responseReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-responseReceived) - The `timestamp` in the parameters had `$ref` _updated_. 
* [`Network.dataReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-dataReceived) - The `timestamp` in the parameters had `$ref` _updated_. 
* [`Network.loadingFinished`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-loadingFinished) - The `timestamp` in the parameters had `$ref` _updated_. 
* [`Network.loadingFailed`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-loadingFailed) - The `timestamp` in the parameters had `$ref` _updated_. 
* [`Network.webSocketWillSendHandshakeRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketWillSendHandshakeRequest) - The `timestamp` in the parameters had `$ref` _updated_. The `wallTime` in the parameters had `$ref` _updated_. 
* [`Network.webSocketHandshakeResponseReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketHandshakeResponseReceived) - The `timestamp` in the parameters had `$ref` _updated_. 
* [`Network.webSocketClosed`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketClosed) - The `timestamp` in the parameters had `$ref` _updated_. 
* [`Network.webSocketFrameReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameReceived) - The `timestamp` in the parameters had `$ref` _updated_. 
* [`Network.webSocketFrameError`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameError) - The `timestamp` in the parameters had `$ref` _updated_. 
* [`Network.webSocketFrameSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameSent) - The `timestamp` in the parameters had `$ref` _updated_. 
* [`Network.eventSourceMessageReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-eventSourceMessageReceived) - The `timestamp` in the parameters had `$ref` _updated_. 
#### `Network`: new types
* [`Network.TimeSinceEpoch`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-TimeSinceEpoch)
* [`Network.MonotonicTime`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-MonotonicTime)
#### `Network`: removed type
* [`Network.Timestamp`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Timestamp)
#### `Network`: modified types
* [`Network.SignedCertificateTimestamp`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SignedCertificateTimestamp) - The `timestamp` in the properties had `$ref` _updated_. 
* [`Network.SecurityDetails`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SecurityDetails) - The `validFrom` in the properties had `$ref` _updated_. The `validTo` in the properties had `$ref` _updated_. 
#### `Input`: modified commands
* [`Input.dispatchKeyEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchKeyEvent) - The `timestamp` in the parameters had `type` _removed_. The `timestamp` in the parameters had `description` _updated_. The parameters's `$ref` _added_. 
* [`Input.dispatchMouseEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchMouseEvent) - The `timestamp` in the parameters had `type` _removed_. The `timestamp` in the parameters had `description` _updated_. The parameters's `$ref` _added_. 
* [`Input.dispatchTouchEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchTouchEvent) - The `timestamp` in the parameters had `type` _removed_. The `timestamp` in the parameters had `description` _updated_. The parameters's `$ref` _added_. 
* [`Input.emulateTouchFromMouseEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-emulateTouchFromMouseEvent) - The `timestamp` in the parameters had `type` _removed_. The `timestamp` in the parameters had `description` _updated_. The parameters's `$ref` _added_. 
#### `Input`: new type
* [`Input.TimeSinceEpoch`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#type-TimeSinceEpoch)


## Roll protocol to r484012
###### _2017-07-03 09:15:18_ | Diff: [e2e55ea...81ccf3f](https://github.com/ChromeDevTools/devtools-protocol/compare/e2e55ea...81ccf3f)
#### `Network`: modified events
* [`Network.requestWillBeSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestWillBeSent) - The `frameId` in the parameters had `experimental` _removed_. The `loaderId` in the parameters had `$ref` _removed_. The `documentURL` in the parameters had `type` _removed_. The `wallTime` in the parameters had `experimental` _removed_. The `frameId` in the parameters had `name` _updated_. The `frameId` in the parameters had `$ref` _updated_. The `frameId` in the parameters had `description` _updated_. The `loaderId` in the parameters had `name` _updated_. The `loaderId` in the parameters had `description` _updated_. The `documentURL` in the parameters had `name` _updated_. The `documentURL` in the parameters had `description` _updated_. The `request` in the parameters had `name` _updated_. The `request` in the parameters had `$ref` _updated_. The `request` in the parameters had `description` _updated_. The `timestamp` in the parameters had `name` _updated_. The `timestamp` in the parameters had `description` _updated_. The `wallTime` in the parameters had `name` _updated_. The `wallTime` in the parameters had `$ref` _updated_. The `wallTime` in the parameters had `description` _updated_. The `initiator` in the parameters had `name` _updated_. The `initiator` in the parameters had `$ref` _updated_. The `initiator` in the parameters had `description` _updated_. The `redirectResponse` in the parameters had `name` _updated_. The `redirectResponse` in the parameters had `$ref` _updated_. The `redirectResponse` in the parameters had `description` _updated_. The `type` in the parameters had `name` _updated_. The `type` in the parameters had `$ref` _updated_. The `type` in the parameters had `description` _updated_. The parameters's `type` _added_. The parameters's `$ref` _added_. The parameters's `experimental` _added_ (2 times). The parameters's `optional` _added_. 
* [`Network.responseReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-responseReceived) - The `frameId` in the parameters had `experimental` _removed_. The `frameId` in the parameters had `name` _updated_. The `frameId` in the parameters had `$ref` _updated_. The `frameId` in the parameters had `description` _updated_. The `loaderId` in the parameters had `name` _updated_. The `loaderId` in the parameters had `$ref` _updated_. The `loaderId` in the parameters had `description` _updated_. The `timestamp` in the parameters had `name` _updated_. The `timestamp` in the parameters had `$ref` _updated_. The `timestamp` in the parameters had `description` _updated_. The `type` in the parameters had `name` _updated_. The `type` in the parameters had `$ref` _updated_. The `type` in the parameters had `description` _updated_. The `response` in the parameters had `name` _updated_. The `response` in the parameters had `$ref` _updated_. The `response` in the parameters had `description` _updated_. The parameters's `optional` _added_. The parameters's `experimental` _added_. 


## Roll protocol to r483799
###### _2017-06-30 13:15:20_ | Diff: [8fad5bb...e2e55ea](https://github.com/ChromeDevTools/devtools-protocol/compare/8fad5bb...e2e55ea)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode) - The `frameId` in the properties had `$ref` _removed_. The `contentDocumentIndex` in the properties had `type` _removed_. The `pseudoType` in the properties had `$ref` _removed_. The `isClickable` in the properties had `type` _removed_. The `publicId` in the properties had `name` _updated_. The `publicId` in the properties had `description` _updated_. The `systemId` in the properties had `name` _updated_. The `systemId` in the properties had `description` _updated_. The `frameId` in the properties had `name` _updated_. The `frameId` in the properties had `description` _updated_. The `contentDocumentIndex` in the properties had `name` _updated_. The `contentDocumentIndex` in the properties had `description` _updated_. The `importedDocumentIndex` in the properties had `name` _updated_. The `importedDocumentIndex` in the properties had `description` _updated_. The `templateContentIndex` in the properties had `name` _updated_. The `templateContentIndex` in the properties had `description` _updated_. The `pseudoType` in the properties had `name` _updated_. The `pseudoType` in the properties had `description` _updated_. The `isClickable` in the properties had `name` _updated_. The `isClickable` in the properties had `description` _updated_. The properties's `type` _added_ (2 times). The properties's `$ref` _added_ (2 times). The properties's `isClickable` _added_. 


## Roll protocol to r483706
###### _2017-06-30 08:15:16_ | Diff: [d5a2d43...8fad5bb](https://github.com/ChromeDevTools/devtools-protocol/compare/d5a2d43...8fad5bb)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode) - The properties's `isClickable` _added_. 


## Roll protocol to r483512
###### _2017-06-29 15:15:18_ | Diff: [cbd3167...d5a2d43](https://github.com/ChromeDevTools/devtools-protocol/compare/cbd3167...d5a2d43)
#### `Target`: modified command
* [`Target.setDiscoverTargets`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setDiscoverTargets) - `description` updated. 
#### `Target`: new event
* [`Target.targetInfoChanged`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-targetInfoChanged)
#### `Target`: modified type
* [`Target.TargetInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#type-TargetInfo) - The properties's `attached` _added_. 


## Roll protocol to r482373
###### _2017-06-26 13:15:23_ | Diff: [7462a7d...31bb33b](https://github.com/ChromeDevTools/devtools-protocol/compare/7462a7d...31bb33b)
#### `Network`: modified type
* [`Network.Initiator`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Initiator) - The `url` in the properties had `description` _updated_. The `lineNumber` in the properties had `description` _updated_. 


## Roll protocol to r481914
###### _2017-06-23 09:15:23_ | Diff: [6d93eed...7462a7d](https://github.com/ChromeDevTools/devtools-protocol/compare/6d93eed...7462a7d)
#### `Page`: modified command
* [`Page.createIsolatedWorld`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-createIsolatedWorld)


## Roll protocol to r481860
###### _2017-06-23 05:15:20_ | Diff: [6463d0e...6d93eed](https://github.com/ChromeDevTools/devtools-protocol/compare/6463d0e...6d93eed)
#### `Profiler`: modified type
* [`Profiler.FunctionCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-FunctionCoverage) - The properties's `isBlockCoverage` _added_. 


## Roll protocol to r481735
###### _2017-06-22 17:15:19_ | Diff: [ccabc09...6463d0e](https://github.com/ChromeDevTools/devtools-protocol/compare/ccabc09...6463d0e)
#### `Storage`: modified command
* [`Storage.getUsageAndQuota`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-getUsageAndQuota) - The return value's `usageBreakdown` _added_. 
#### `Storage`: new type
* [`Storage.UsageForType`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#type-UsageForType)
#### `Storage`: modified type
* [`Storage.StorageType`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#type-StorageType) - The enum's `other` _added_. 


## Roll protocol to r480235
###### _2017-06-16 17:15:36_ | Diff: [cdb002c...ccabc09](https://github.com/ChromeDevTools/devtools-protocol/compare/cdb002c...ccabc09)
#### `Storage`: new command
* [`Storage.getUsageAndQuota`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-getUsageAndQuota)


## Roll protocol to r480007
###### _2017-06-16 03:15:26_ | Diff: [34511ab...cdb002c](https://github.com/ChromeDevTools/devtools-protocol/compare/34511ab...cdb002c)
#### `Network`: modified command
* [`Network.continueInterceptedRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-continueInterceptedRequest) - The `errorReason` in the parameters had `description` _updated_. The `rawResponse` in the parameters had `description` _updated_. The `url` in the parameters had `description` _updated_. The `method` in the parameters had `description` _updated_. The `postData` in the parameters had `description` _updated_. The `headers` in the parameters had `description` _updated_. The parameters's `authChallengeResponse` _added_. 
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted) - The `interceptionId` in the parameters had `description` _updated_. The parameters's `authChallenge` _added_. 
#### `Network`: new types
* [`Network.AuthChallenge`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-AuthChallenge)
* [`Network.AuthChallengeResponse`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-AuthChallengeResponse)


## Roll protocol to r479728
###### _2017-06-15 09:15:20_ | Diff: [0fa531a...34511ab](https://github.com/ChromeDevTools/devtools-protocol/compare/0fa531a...34511ab)
#### `CSS`: removed command
* [`CSS.getLayoutTreeAndStyles`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getLayoutTreeAndStyles)
#### `CSS`: removed types
* [`CSS.LayoutTreeNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-LayoutTreeNode)
* [`CSS.ComputedStyle`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-ComputedStyle)


## Roll protocol to r479333
###### _2017-06-14 02:15:15_ | Diff: [d21a0f2...0fa531a](https://github.com/ChromeDevTools/devtools-protocol/compare/d21a0f2...0fa531a)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted) - The `InterceptionId` in the parameters had `name` _updated_. 


## Roll protocol to r479198
###### _2017-06-13 16:15:25_ | Diff: [0dc9f1b...d21a0f2](https://github.com/ChromeDevTools/devtools-protocol/compare/0dc9f1b...d21a0f2)
#### `Network`: modified type
* [`Network.Request`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Request) - The `referrerPolicy` in the properties had `no-referrer-when-downgrade-origin-when-cross-origin` _updated_. The `6` in the properties had `strict-origin` _added_. The `6` in the properties had `strict-origin-when-cross-origin` _added_. 


## Roll protocol to r478853
###### _2017-06-12 18:15:17_ | Diff: [17022a7...0dc9f1b](https://github.com/ChromeDevTools/devtools-protocol/compare/17022a7...0dc9f1b)
#### `Runtime`: modified event
* [`Runtime.consoleAPICalled`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-consoleAPICalled) - The parameters's `context` _added_. 


## Roll protocol to r478813
###### _2017-06-12 16:15:23_ | Diff: [abcbcb5...17022a7](https://github.com/ChromeDevTools/devtools-protocol/compare/abcbcb5...17022a7)
#### `CacheStorage`: modified type
* [`CacheStorage.DataEntry`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#type-DataEntry) - The `response` in the properties had `description` _updated_. The properties's `responseTime` _added_. 


## Roll protocol to r478513
###### _2017-06-10 03:15:26_ | Diff: [3ac23d7...abcbcb5](https://github.com/ChromeDevTools/devtools-protocol/compare/3ac23d7...abcbcb5)
#### `DOMSnapshot`: new domain
* [`DOMSnapshot.DOMSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#domain-DOMSnapshot)
#### `DOMSnapshot`: new command
* [`DOMSnapshot.getSnapshot`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#method-getSnapshot)
#### `DOMSnapshot`: new types
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode)
* [`DOMSnapshot.LayoutTreeNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-LayoutTreeNode)
* [`DOMSnapshot.ComputedStyle`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-ComputedStyle)
* [`DOMSnapshot.NameValue`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-NameValue)


## Roll protocol to r477611
###### _2017-06-07 04:15:16_ | Diff: [ffd3dba...3ac23d7](https://github.com/ChromeDevTools/devtools-protocol/compare/ffd3dba...3ac23d7)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted) - The `redirectHeaders` in the parameters had `optional` _removed_. The `redirectStatusCode` in the parameters had `type` _removed_. The `redirectHeaders` in the parameters had `name` _updated_. The `redirectHeaders` in the parameters had `$ref` _updated_. The `redirectHeaders` in the parameters had `description` _updated_. The `redirectStatusCode` in the parameters had `name` _updated_. The `redirectStatusCode` in the parameters had `description` _updated_. The `redirectUrl` in the parameters had `name` _updated_. The `redirectUrl` in the parameters had `type` _updated_. The `redirectUrl` in the parameters had `description` _updated_. The parameters's `$ref` _added_. The parameters's `redirectUrl` _added_. 


## Roll protocol to r477501
###### _2017-06-06 18:15:18_ | Diff: [579f232...ffd3dba](https://github.com/ChromeDevTools/devtools-protocol/compare/579f232...ffd3dba)
#### `Storage`: removed command
* [`Storage.getUsageAndQuota`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-getUsageAndQuota)
#### `Storage`: removed type
* [`Storage.QuotaAndUsage`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#type-QuotaAndUsage)


## Roll protocol to r477431
###### _2017-06-06 15:15:24_ | Diff: [6d50df6...579f232](https://github.com/ChromeDevTools/devtools-protocol/compare/6d50df6...579f232)
#### `Storage`: new command
* [`Storage.getUsageAndQuota`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-getUsageAndQuota)
#### `Storage`: new type
* [`Storage.QuotaAndUsage`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#type-QuotaAndUsage)


## Roll protocol to r476654
###### _2017-06-02 08:15:15_ | Diff: [5f36401...b0a59a9](https://github.com/ChromeDevTools/devtools-protocol/compare/5f36401...b0a59a9)
#### `Network`: new commands
* [`Network.enableRequestInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-enableRequestInterception)
* [`Network.continueInterceptedRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-continueInterceptedRequest)
#### `Network`: new event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted)
#### `Network`: new types
* [`Network.InterceptionId`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-InterceptionId)
* [`Network.ErrorReason`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-ErrorReason)


## Roll protocol to r474209
###### _2017-05-24 01:15:13_ | Diff: [408d0e6...f492fba](https://github.com/ChromeDevTools/devtools-protocol/compare/408d0e6...f492fba)
#### `Page`: modified command
* [`Page.captureScreenshot`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot) - The `fromSurface` in the parameters had `description` _updated_. 


## Roll protocol to r474080
###### _2017-05-23 15:15:33_ | Diff: [bb2b187...eca5adc](https://github.com/ChromeDevTools/devtools-protocol/compare/bb2b187...eca5adc)
#### `Input`: new command
* [`Input.setIgnoreInputEvents`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-setIgnoreInputEvents)


## Roll protocol to r474054 466964
###### _2017-05-23 14:15:15_ | Diff: [e599527...bb2b187](https://github.com/ChromeDevTools/devtools-protocol/compare/e599527...bb2b187)
#### `Page`: modified command
* [`Page.navigate`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigate) - The parameters's `transitionType` _added_. 
#### `Page`: new type
* [`Page.TransitionType`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-TransitionType)
#### `Page`: modified type
* [`Page.NavigationEntry`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-NavigationEntry) - The `title` in the properties had `name` _updated_. The `title` in the properties had `description` _updated_. The properties's `title` _added_. The properties's `transitionType` _added_. 


## Roll protocol to r472421
###### _2017-05-17 04:15:14_ | Diff: [c7253c2...e599527](https://github.com/ChromeDevTools/devtools-protocol/compare/c7253c2...e599527)
#### `SystemInfo`: modified command
* [`SystemInfo.getInfo`](https://chromedevtools.github.io/devtools-protocol/tot/SystemInfo/#method-getInfo) - The return value's `commandLine` _added_. 


## Roll protocol to r472381
###### _2017-05-17 01:15:16_ | Diff: [42e9444...c7253c2](https://github.com/ChromeDevTools/devtools-protocol/compare/42e9444...c7253c2)
#### `Debugger`: modified command
* [`Debugger.continueToLocation`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-continueToLocation) - The parameters's `targetCallFrames` _added_. 


## Roll protocol to r470873
###### _2017-05-11 01:15:18_ | Diff: [a03b9bf...42e9444](https://github.com/ChromeDevTools/devtools-protocol/compare/a03b9bf...42e9444)
#### `Page`: new command
* [`Page.createIsolatedWorld`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-createIsolatedWorld)


## Roll protocol to r470190
###### _2017-05-08 21:15:15_ | Diff: [7060d50...a03b9bf](https://github.com/ChromeDevTools/devtools-protocol/compare/7060d50...a03b9bf)
#### `Page`: modified command
* [`Page.printToPDF`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF) - `description` updated. 


## Roll protocol to r467326
###### _2017-04-26 08:15:16_ | Diff: [d7b68bb...c656485](https://github.com/ChromeDevTools/devtools-protocol/compare/d7b68bb...c656485)
#### `Runtime`: modified event
* [`Runtime.executionContextCreated`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-executionContextCreated) - The `context` in the parameters had `description` _updated_. 
#### `Debugger`: modified command
* [`Debugger.getPossibleBreakpoints`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getPossibleBreakpoints) - The `end` in the parameters had `description` _updated_. 
#### `Profiler`: modified event
* [`Profiler.consoleProfileStarted`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#event-consoleProfileStarted) - `description` updated. 
#### `HeapProfiler`: modified event
* [`HeapProfiler.lastSeenObjectId`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#event-lastSeenObjectId) - `description` updated. 


## Roll protocol to r467252
###### _2017-04-25 23:15:14_ | Diff: [94e4a6a...d7b68bb](https://github.com/ChromeDevTools/devtools-protocol/compare/94e4a6a...d7b68bb)
#### `Runtime`: modified event
* [`Runtime.executionContextCreated`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-executionContextCreated) - The `context` in the parameters had `description` _updated_. 
#### `Debugger`: modified command
* [`Debugger.getPossibleBreakpoints`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getPossibleBreakpoints) - The `end` in the parameters had `description` _updated_. 
#### `Profiler`: modified event
* [`Profiler.consoleProfileStarted`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#event-consoleProfileStarted) - `description` updated. 
#### `HeapProfiler`: modified event
* [`HeapProfiler.lastSeenObjectId`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#event-lastSeenObjectId) - `description` updated. 


## Roll protocol to r466832
###### _2017-04-24 17:15:24_ | Diff: [95a5c47...94e4a6a](https://github.com/ChromeDevTools/devtools-protocol/compare/95a5c47...94e4a6a)
#### `Overlay`: new domain
* [`Overlay.Overlay`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#domain-Overlay)
#### `Overlay`: removed domain
* [`Overlay.Rendering`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#domain-Rendering)
#### `Page`: removed command
* [`Page.configureOverlay`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-configureOverlay)
#### `Overlay`: new commands
* [`Overlay.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-enable)
* [`Overlay.disable`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-disable)
* [`Overlay.setShowPaintRects`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowPaintRects)
* [`Overlay.setShowDebugBorders`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowDebugBorders)
* [`Overlay.setShowFPSCounter`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowFPSCounter)
* [`Overlay.setShowScrollBottleneckRects`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowScrollBottleneckRects)
* [`Overlay.setShowViewportSizeOnResize`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowViewportSizeOnResize)
* [`Overlay.setPausedInDebuggerMessage`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setPausedInDebuggerMessage)
* [`Overlay.setSuspended`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setSuspended)
* [`Overlay.setInspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setInspectMode)
* [`Overlay.highlightRect`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightRect)
* [`Overlay.highlightQuad`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightQuad)
* [`Overlay.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightNode)
* [`Overlay.highlightFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightFrame)
* [`Overlay.hideHighlight`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-hideHighlight)
* [`Overlay.getHighlightObjectForTest`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-getHighlightObjectForTest)
#### `Overlay`: new events
* [`Overlay.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#event-nodeHighlightRequested)
* [`Overlay.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#event-inspectNodeRequested)
#### `Overlay`: new types
* [`Overlay.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#type-HighlightConfig)
* [`Overlay.InspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#type-InspectMode)
#### `DOM`: removed commands
* [`DOM.setInspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setInspectMode)
* [`DOM.highlightQuad`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightQuad)
* [`DOM.highlightFrame`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightFrame)
* [`DOM.getHighlightObjectForTest`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getHighlightObjectForTest)
#### `DOM`: modified commands
* [`DOM.highlightRect`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightRect) - `description` updated. `redirect` added. 
* [`DOM.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightNode) - `description` updated. `redirect` added. 
* [`DOM.hideHighlight`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-hideHighlight) - `description` updated. `redirect` added. 
#### `DOM`: removed events
* [`DOM.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-inspectNodeRequested)
* [`DOM.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-nodeHighlightRequested)
#### `DOM`: removed types
* [`DOM.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-HighlightConfig)
* [`DOM.InspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-InspectMode)


## Roll protocol to r466815
###### _2017-04-24 16:15:14_ | Diff: [e5adaae...95a5c47](https://github.com/ChromeDevTools/devtools-protocol/compare/e5adaae...95a5c47)
#### `Runtime`: modified event
* [`Runtime.executionContextCreated`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-executionContextCreated) - The `context` in the parameters had `description` _updated_. 
#### `Debugger`: modified command
* [`Debugger.getPossibleBreakpoints`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getPossibleBreakpoints) - The `end` in the parameters had `description` _updated_. 
#### `Profiler`: modified event
* [`Profiler.consoleProfileStarted`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#event-consoleProfileStarted) - `description` updated. 
#### `HeapProfiler`: modified event
* [`HeapProfiler.lastSeenObjectId`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#event-lastSeenObjectId) - `description` updated. 


## Roll protocol to r466559
###### _2017-04-23 00:15:13_ | Diff: [6653c3f...e5adaae](https://github.com/ChromeDevTools/devtools-protocol/compare/6653c3f...e5adaae)
#### `Rendering`: new domain
* [`Rendering.Rendering`](https://chromedevtools.github.io/devtools-protocol/tot/Rendering/#domain-Rendering)
#### `Rendering`: removed domain
* [`Rendering.Overlay`](https://chromedevtools.github.io/devtools-protocol/tot/Rendering/#domain-Overlay)
#### `Page`: new command
* [`Page.configureOverlay`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-configureOverlay)
#### `Rendering`: new commands
* [`Rendering.setShowPaintRects`](https://chromedevtools.github.io/devtools-protocol/tot/Rendering/#method-setShowPaintRects)
* [`Rendering.setShowDebugBorders`](https://chromedevtools.github.io/devtools-protocol/tot/Rendering/#method-setShowDebugBorders)
* [`Rendering.setShowFPSCounter`](https://chromedevtools.github.io/devtools-protocol/tot/Rendering/#method-setShowFPSCounter)
* [`Rendering.setShowScrollBottleneckRects`](https://chromedevtools.github.io/devtools-protocol/tot/Rendering/#method-setShowScrollBottleneckRects)
* [`Rendering.setShowViewportSizeOnResize`](https://chromedevtools.github.io/devtools-protocol/tot/Rendering/#method-setShowViewportSizeOnResize)
#### `DOM`: new commands
* [`DOM.setInspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setInspectMode)
* [`DOM.highlightQuad`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightQuad)
* [`DOM.highlightFrame`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightFrame)
* [`DOM.getHighlightObjectForTest`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getHighlightObjectForTest)
#### `DOM`: modified commands
* [`DOM.highlightRect`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightRect) - `redirect` removed. `description` updated. 
* [`DOM.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightNode) - `redirect` removed. `description` updated. 
* [`DOM.hideHighlight`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-hideHighlight) - `redirect` removed. `description` updated. 
#### `DOM`: new events
* [`DOM.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-inspectNodeRequested)
* [`DOM.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-nodeHighlightRequested)
#### `DOM`: new types
* [`DOM.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-HighlightConfig)
* [`DOM.InspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-InspectMode)


## Roll protocol to r466506
###### _2017-04-21 17:15:18_ | Diff: [afbaab8...495acc6](https://github.com/ChromeDevTools/devtools-protocol/compare/afbaab8...495acc6)
#### `Overlay`: new domain
* [`Overlay.Overlay`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#domain-Overlay)
#### `Overlay`: removed domain
* [`Overlay.Rendering`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#domain-Rendering)
#### `Page`: removed command
* [`Page.configureOverlay`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-configureOverlay)
#### `Overlay`: new commands
* [`Overlay.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-enable)
* [`Overlay.disable`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-disable)
* [`Overlay.setShowPaintRects`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowPaintRects)
* [`Overlay.setShowDebugBorders`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowDebugBorders)
* [`Overlay.setShowFPSCounter`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowFPSCounter)
* [`Overlay.setShowScrollBottleneckRects`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowScrollBottleneckRects)
* [`Overlay.setShowViewportSizeOnResize`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowViewportSizeOnResize)
* [`Overlay.setPausedInDebuggerMessage`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setPausedInDebuggerMessage)
* [`Overlay.setSuspended`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setSuspended)
* [`Overlay.setInspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setInspectMode)
* [`Overlay.highlightRect`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightRect)
* [`Overlay.highlightQuad`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightQuad)
* [`Overlay.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightNode)
* [`Overlay.highlightFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightFrame)
* [`Overlay.hideHighlight`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-hideHighlight)
* [`Overlay.getHighlightObjectForTest`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-getHighlightObjectForTest)
#### `Overlay`: new events
* [`Overlay.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#event-nodeHighlightRequested)
* [`Overlay.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#event-inspectNodeRequested)
#### `Overlay`: new types
* [`Overlay.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#type-HighlightConfig)
* [`Overlay.InspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#type-InspectMode)
#### `DOM`: removed commands
* [`DOM.setInspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setInspectMode)
* [`DOM.highlightQuad`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightQuad)
* [`DOM.highlightFrame`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightFrame)
* [`DOM.getHighlightObjectForTest`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getHighlightObjectForTest)
#### `DOM`: modified commands
* [`DOM.highlightRect`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightRect) - `description` updated. `redirect` added. 
* [`DOM.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightNode) - `description` updated. `redirect` added. 
* [`DOM.hideHighlight`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-hideHighlight) - `description` updated. `redirect` added. 
#### `DOM`: removed events
* [`DOM.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-inspectNodeRequested)
* [`DOM.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-nodeHighlightRequested)
#### `DOM`: removed types
* [`DOM.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-HighlightConfig)
* [`DOM.InspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-InspectMode)


## Roll protocol to r465861
###### _2017-04-19 19:15:14_ | Diff: [3dd613f...2621a84](https://github.com/ChromeDevTools/devtools-protocol/compare/3dd613f...2621a84)
#### `Rendering`: new domain
* [`Rendering.Rendering`](https://chromedevtools.github.io/devtools-protocol/tot/Rendering/#domain-Rendering)
#### `Rendering`: removed domain
* [`Rendering.Overlay`](https://chromedevtools.github.io/devtools-protocol/tot/Rendering/#domain-Overlay)
#### `Page`: new command
* [`Page.configureOverlay`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-configureOverlay)
#### `Rendering`: new commands
* [`Rendering.setShowPaintRects`](https://chromedevtools.github.io/devtools-protocol/tot/Rendering/#method-setShowPaintRects)
* [`Rendering.setShowDebugBorders`](https://chromedevtools.github.io/devtools-protocol/tot/Rendering/#method-setShowDebugBorders)
* [`Rendering.setShowFPSCounter`](https://chromedevtools.github.io/devtools-protocol/tot/Rendering/#method-setShowFPSCounter)
* [`Rendering.setShowScrollBottleneckRects`](https://chromedevtools.github.io/devtools-protocol/tot/Rendering/#method-setShowScrollBottleneckRects)
* [`Rendering.setShowViewportSizeOnResize`](https://chromedevtools.github.io/devtools-protocol/tot/Rendering/#method-setShowViewportSizeOnResize)
#### `DOM`: new commands
* [`DOM.setInspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setInspectMode)
* [`DOM.highlightQuad`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightQuad)
* [`DOM.highlightFrame`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightFrame)
* [`DOM.getHighlightObjectForTest`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getHighlightObjectForTest)
#### `DOM`: modified commands
* [`DOM.highlightRect`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightRect) - `redirect` removed. `description` updated. 
* [`DOM.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightNode) - `redirect` removed. `description` updated. 
* [`DOM.hideHighlight`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-hideHighlight) - `redirect` removed. `description` updated. 
#### `DOM`: new events
* [`DOM.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-inspectNodeRequested)
* [`DOM.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-nodeHighlightRequested)
#### `DOM`: new types
* [`DOM.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-HighlightConfig)
* [`DOM.InspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-InspectMode)


## Roll protocol to r465817
###### _2017-04-19 17:15:19_ | Diff: [af95ade...3dd613f](https://github.com/ChromeDevTools/devtools-protocol/compare/af95ade...3dd613f)
#### `Overlay`: new domain
* [`Overlay.Overlay`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#domain-Overlay)
#### `Overlay`: removed domain
* [`Overlay.Rendering`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#domain-Rendering)
#### `Page`: removed command
* [`Page.configureOverlay`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-configureOverlay)
#### `Overlay`: new commands
* [`Overlay.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-enable)
* [`Overlay.disable`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-disable)
* [`Overlay.setShowPaintRects`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowPaintRects)
* [`Overlay.setShowDebugBorders`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowDebugBorders)
* [`Overlay.setShowFPSCounter`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowFPSCounter)
* [`Overlay.setShowScrollBottleneckRects`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowScrollBottleneckRects)
* [`Overlay.setShowViewportSizeOnResize`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setShowViewportSizeOnResize)
* [`Overlay.setPausedInDebuggerMessage`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setPausedInDebuggerMessage)
* [`Overlay.setSuspended`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setSuspended)
* [`Overlay.setInspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-setInspectMode)
* [`Overlay.highlightRect`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightRect)
* [`Overlay.highlightQuad`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightQuad)
* [`Overlay.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightNode)
* [`Overlay.highlightFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-highlightFrame)
* [`Overlay.hideHighlight`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-hideHighlight)
* [`Overlay.getHighlightObjectForTest`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#method-getHighlightObjectForTest)
#### `Overlay`: new events
* [`Overlay.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#event-nodeHighlightRequested)
* [`Overlay.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#event-inspectNodeRequested)
#### `Overlay`: new types
* [`Overlay.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#type-HighlightConfig)
* [`Overlay.InspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#type-InspectMode)
#### `DOM`: removed commands
* [`DOM.setInspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setInspectMode)
* [`DOM.highlightQuad`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightQuad)
* [`DOM.highlightFrame`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightFrame)
* [`DOM.getHighlightObjectForTest`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getHighlightObjectForTest)
#### `DOM`: modified commands
* [`DOM.highlightRect`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightRect) - `description` updated. `redirect` added. 
* [`DOM.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightNode) - `description` updated. `redirect` added. 
* [`DOM.hideHighlight`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-hideHighlight) - `description` updated. `redirect` added. 
#### `DOM`: removed events
* [`DOM.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-inspectNodeRequested)
* [`DOM.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-nodeHighlightRequested)
#### `DOM`: removed types
* [`DOM.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-HighlightConfig)
* [`DOM.InspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-InspectMode)


## Roll protocol to r464996
###### _2017-04-17 13:15:14_ | Diff: [b37b8df...af95ade](https://github.com/ChromeDevTools/devtools-protocol/compare/b37b8df...af95ade)
#### `Page`: removed command
* [`Page.setColorPickerEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setColorPickerEnabled)
#### `Page`: removed event
* [`Page.colorPicked`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-colorPicked)


## Roll protocol to r464752
###### _2017-04-14 11:15:26_ | Diff: [a087d6e...b37b8df](https://github.com/ChromeDevTools/devtools-protocol/compare/a087d6e...b37b8df)
#### `Network`: removed command
* [`Network.setMonitoringXHREnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setMonitoringXHREnabled)


## Roll protocol to r464268
###### _2017-04-12 20:15:15_ | Diff: [389442a...a087d6e](https://github.com/ChromeDevTools/devtools-protocol/compare/389442a...a087d6e)
#### `Browser`: new domain
* [`Browser.Browser`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#domain-Browser)
#### `Target`: modified command
* [`Target.sendMessageToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-sendMessageToTarget) - The `targetId` in the parameters had `type` _removed_. The parameters's `$ref` _added_. 
#### `Browser`: new commands
* [`Browser.getWindowForTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowForTarget)
* [`Browser.setWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-setWindowBounds)
* [`Browser.getWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowBounds)
#### `Browser`: new types
* [`Browser.WindowID`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-WindowID)
* [`Browser.WindowState`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-WindowState)
* [`Browser.Bounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-Bounds)


## Roll protocol to r463392
###### _2017-04-10 14:16:03_ | Diff: [bced713...6839ff5](https://github.com/ChromeDevTools/devtools-protocol/compare/bced713...6839ff5)
#### `Browser`: removed domain
* [`Browser.Browser`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#domain-Browser)
#### `Target`: modified command
* [`Target.sendMessageToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-sendMessageToTarget) - The `targetId` in the parameters had `$ref` _removed_. The parameters's `type` _added_. 


## Roll protocol to r463120
###### _2017-04-07 20:15:13_ | Diff: [e6757c1...bced713](https://github.com/ChromeDevTools/devtools-protocol/compare/e6757c1...bced713)
#### `Browser`: new domain
* [`Browser.Browser`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#domain-Browser)
#### `Target`: modified command
* [`Target.sendMessageToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-sendMessageToTarget) - The `targetId` in the parameters had `type` _removed_. The parameters's `$ref` _added_. 
#### `Browser`: new commands
* [`Browser.getWindowForTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowForTarget)
* [`Browser.setWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-setWindowBounds)
* [`Browser.getWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowBounds)
#### `Browser`: new types
* [`Browser.WindowID`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-WindowID)
* [`Browser.WindowState`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-WindowState)
* [`Browser.Bounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-Bounds)


## Roll protocol to r460846
###### _2017-03-30 12:15:27_ | Diff: [bb10d9a...07e8fce](https://github.com/ChromeDevTools/devtools-protocol/compare/bb10d9a...07e8fce)
#### `Network`: modified command
* [`Network.setBlockedURLs`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setBlockedURLs) - `description` updated. The `urls` in the parameters had `description` _updated_. 
