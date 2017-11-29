

## Roll protocol to r518882
###### _2017-11-23 02:15:33 -0800_
Diff: [a86a78e...e1e5c6b](https://github.com/ChromeDevTools/devtools-protocol/compare/a86a78e...e1e5c6b)
#### `Runtime`: modified commands
* [`Runtime.evaluate`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate)
* [`Runtime.callFunctionOn`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-callFunctionOn)
* [`Runtime.queryObjects`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-queryObjects)
* [`Runtime.globalLexicalScopeNames`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-globalLexicalScopeNames)
#### `Runtime`: removed type
* [`Runtime.AsyncTaskId`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-AsyncTaskId)
#### `Runtime`: modified type
* [`Runtime.StackTraceId`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-StackTraceId)
#### `Debugger`: new command
* [`Debugger.pauseOnAsyncCall`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-pauseOnAsyncCall)
#### `Debugger`: removed command
* [`Debugger.pauseOnAsyncTask`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-pauseOnAsyncTask)
#### `Debugger`: modified commands
* [`Debugger.setBreakpointByUrl`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setBreakpointByUrl)
* [`Debugger.getPossibleBreakpoints`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getPossibleBreakpoints)
* [`Debugger.continueToLocation`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-continueToLocation)
* [`Debugger.searchInContent`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-searchInContent)
* [`Debugger.evaluateOnCallFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-evaluateOnCallFrame)
#### `Debugger`: modified events
* [`Debugger.scriptParsed`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-scriptParsed)
* [`Debugger.scriptFailedToParse`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-scriptFailedToParse)
* [`Debugger.paused`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-paused)
#### `Debugger`: modified types
* [`Debugger.CallFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-CallFrame)
* [`Debugger.SearchMatch`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-SearchMatch)
* [`Debugger.BreakLocation`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-BreakLocation)
#### `Profiler`: modified commands
* [`Profiler.startPreciseCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-startPreciseCoverage)
* [`Profiler.stopPreciseCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-stopPreciseCoverage)
* [`Profiler.takePreciseCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-takePreciseCoverage)
* [`Profiler.getBestEffortCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-getBestEffortCoverage)
#### `Profiler`: modified types
* [`Profiler.ProfileNode`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-ProfileNode)
* [`Profiler.PositionTickInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-PositionTickInfo)
* [`Profiler.CoverageRange`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-CoverageRange)
* [`Profiler.FunctionCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-FunctionCoverage)
* [`Profiler.ScriptCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-ScriptCoverage)


## Roll protocol to r518863
###### _2017-11-22 22:15:28 -0800_
Diff: [764cee6...a86a78e](https://github.com/ChromeDevTools/devtools-protocol/compare/764cee6...a86a78e)
#### `Runtime`: new types
* [`Runtime.UniqueDebuggerId`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-UniqueDebuggerId)
* [`Runtime.StackTraceId`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-StackTraceId)
#### `Runtime`: modified type
* [`Runtime.StackTrace`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-StackTrace)
#### `Debugger`: new command
* [`Debugger.getStackTrace`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getStackTrace)
#### `Debugger`: modified commands
* [`Debugger.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-enable)
* [`Debugger.setScriptSource`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setScriptSource)
* [`Debugger.restartFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-restartFrame)
#### `Debugger`: modified event
* [`Debugger.paused`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-paused)


## Roll protocol to r518700 517208
###### _2017-11-22 11:16:19 -0800_
Diff: [4105e8d...3a092a2](https://github.com/ChromeDevTools/devtools-protocol/compare/4105e8d...3a092a2)
#### `Runtime`: modified type
* [`Runtime.StackTrace`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-StackTrace)


## Roll protocol to r518504
###### _2017-11-21 18:16:11 -0800_
Diff: [4d81be2...4105e8d](https://github.com/ChromeDevTools/devtools-protocol/compare/4d81be2...4105e8d)
#### `Page`: modified commands
* [`Page.navigate`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigate)
* [`Page.setDocumentContent`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDocumentContent)
#### `Page`: modified type
* [`Page.ScreencastFrameMetadata`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-ScreencastFrameMetadata)
#### `Emulation`: modified command
* [`Emulation.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDeviceMetricsOverride)
#### `Network`: modified commands
* [`Network.canClearBrowserCache`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-canClearBrowserCache)
* [`Network.canClearBrowserCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-canClearBrowserCookies)
* [`Network.canEmulateNetworkConditions`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-canEmulateNetworkConditions)
#### `Database`: modified types
* [`Database.DatabaseId`](https://chromedevtools.github.io/devtools-protocol/tot/Database/#type-DatabaseId)
* [`Database.Database`](https://chromedevtools.github.io/devtools-protocol/tot/Database/#type-Database)
#### `DOMStorage`: modified types
* [`DOMStorage.StorageId`](https://chromedevtools.github.io/devtools-protocol/tot/DOMStorage/#type-StorageId)
* [`DOMStorage.Item`](https://chromedevtools.github.io/devtools-protocol/tot/DOMStorage/#type-Item)
#### `Target`: modified commands
* [`Target.setAutoAttach`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setAutoAttach)
* [`Target.getTargetInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-getTargetInfo)
#### `Target`: modified events
* [`Target.attachedToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-attachedToTarget)
* [`Target.detachedFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-detachedFromTarget)
#### `Animation`: modified types
* [`Animation.Animation`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-Animation)
* [`Animation.AnimationEffect`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-AnimationEffect)


## Roll protocol to r517901
###### _2017-11-20 12:15:46 -0800_
Diff: [05920a2...4d81be2](https://github.com/ChromeDevTools/devtools-protocol/compare/05920a2...4d81be2)
#### `Page`: modified command
* [`Page.navigate`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigate)


## Roll protocol to r517530
###### _2017-11-17 12:15:35 -0800_
Diff: [29d3c99...05920a2](https://github.com/ChromeDevTools/devtools-protocol/compare/29d3c99...05920a2)
#### `Accessibility`: new type
* [`Accessibility.AXPropertyName`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXPropertyName)
#### `Accessibility`: removed types
* [`Accessibility.AXGlobalStates`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXGlobalStates)
* [`Accessibility.AXLiveRegionAttributes`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXLiveRegionAttributes)
* [`Accessibility.AXWidgetAttributes`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXWidgetAttributes)
* [`Accessibility.AXWidgetStates`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXWidgetStates)
* [`Accessibility.AXRelationshipAttributes`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXRelationshipAttributes)
#### `Accessibility`: modified type
* [`Accessibility.AXProperty`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXProperty)


## Roll protocol to r517415
###### _2017-11-17 08:15:51 -0800_
Diff: [9451957...29d3c99](https://github.com/ChromeDevTools/devtools-protocol/compare/9451957...29d3c99)
#### `Emulation`: modified command
* [`Emulation.setVirtualTimePolicy`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVirtualTimePolicy)
#### `Emulation`: modified events
* [`Emulation.virtualTimeAdvanced`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeAdvanced)
* [`Emulation.virtualTimePaused`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimePaused)


## Roll protocol to r517348
###### _2017-11-17 01:15:46 -0800_
Diff: [24d697a...9451957](https://github.com/ChromeDevTools/devtools-protocol/compare/24d697a...9451957)
#### `Network`: new command
* [`Network.searchInResponseBody`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-searchInResponseBody)


## Roll protocol to r516944
###### _2017-11-15 17:35:11 -0800_
Diff: [efb204b...24d697a](https://github.com/ChromeDevTools/devtools-protocol/compare/efb204b...24d697a)
#### `Network`: new command
* [`Network.getResponseBodyForInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getResponseBodyForInterception)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted)
#### `Network`: new type
* [`Network.InterceptionStage`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-InterceptionStage)
#### `Network`: modified type
* [`Network.RequestPattern`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-RequestPattern)


## Roll protocol to r516591
###### _2017-11-14 20:15:32 -0800_
Diff: [c0d3ebf...efb204b](https://github.com/ChromeDevTools/devtools-protocol/compare/c0d3ebf...efb204b)
#### `Network`: removed command
* [`Network.getResponseBodyForInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getResponseBodyForInterception)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted)
#### `Network`: removed type
* [`Network.InterceptionStage`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-InterceptionStage)
#### `Network`: modified type
* [`Network.RequestPattern`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-RequestPattern)


## Roll protocol to r516563 516429
###### _2017-11-14 18:15:47 -0800_
Diff: [d3257bc...a1b4645](https://github.com/ChromeDevTools/devtools-protocol/compare/d3257bc...a1b4645)
#### `Network`: new command
* [`Network.getResponseBodyForInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getResponseBodyForInterception)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted)
#### `Network`: new type
* [`Network.InterceptionStage`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-InterceptionStage)
#### `Network`: modified type
* [`Network.RequestPattern`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-RequestPattern)


## Roll protocol to r515398
###### _2017-11-09 17:16:13 -0800_
Diff: [abb8c6c...d3257bc](https://github.com/ChromeDevTools/devtools-protocol/compare/abb8c6c...d3257bc)
#### `Page`: modified command
* [`Page.navigate`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigate)


## Roll protocol to r514369
###### _2017-11-06 19:15:46 -0800_
Diff: [2cda62b...abb8c6c](https://github.com/ChromeDevTools/devtools-protocol/compare/2cda62b...abb8c6c)
#### `HeapProfiler`: new command
* [`HeapProfiler.getSamplingProfile`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#method-getSamplingProfile)


## Roll protocol to r514112
###### _2017-11-06 04:15:45 -0800_
Diff: [d9a7169...2cda62b](https://github.com/ChromeDevTools/devtools-protocol/compare/d9a7169...2cda62b)
#### `Runtime`: new type
* [`Runtime.AsyncTaskId`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-AsyncTaskId)
#### `Debugger`: new command
* [`Debugger.pauseOnAsyncTask`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-pauseOnAsyncTask)
#### `Debugger`: modified commands
* [`Debugger.stepInto`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-stepInto)
* [`Debugger.scheduleStepIntoAsync`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-scheduleStepIntoAsync)
#### `Debugger`: modified event
* [`Debugger.paused`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#event-paused)


## Roll protocol to r514053
###### _2017-11-04 11:15:40_
Diff: [e310fa1...d9a7169](https://github.com/ChromeDevTools/devtools-protocol/compare/e310fa1...d9a7169)
#### `Debugger`: new command
* [`Debugger.setReturnValue`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setReturnValue)


## Roll protocol to r513425
###### _2017-11-02 01:15:48_
Diff: [4ea1613...e310fa1](https://github.com/ChromeDevTools/devtools-protocol/compare/4ea1613...e310fa1)
#### `Page`: new command
* [`Page.setLifecycleEventsEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setLifecycleEventsEnabled)
#### `Page`: modified command
* [`Page.navigate`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigate)


## Roll protocol to r513411
###### _2017-11-01 22:15:48_
Diff: [dcd904a...4ea1613](https://github.com/ChromeDevTools/devtools-protocol/compare/dcd904a...4ea1613)
#### `Page`: modified event
* [`Page.windowOpen`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-windowOpen)


## Roll protocol to r513373
###### _2017-11-01 19:15:47_
Diff: [a1e4422...dcd904a](https://github.com/ChromeDevTools/devtools-protocol/compare/a1e4422...dcd904a)
#### `Page`: modified event
* [`Page.lifecycleEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-lifecycleEvent)
#### `Network`: modified events
* [`Network.requestWillBeSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestWillBeSent)
* [`Network.responseReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-responseReceived)


## Roll protocol to r513327 513317
###### _2017-11-01 17:15:44_
Diff: [171f927...916de95](https://github.com/ChromeDevTools/devtools-protocol/compare/171f927...916de95)
#### `Page`: modified commands
* [`Page.addScriptToEvaluateOnNewDocument`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-addScriptToEvaluateOnNewDocument)
* [`Page.removeScriptToEvaluateOnNewDocument`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-removeScriptToEvaluateOnNewDocument)
* [`Page.navigate`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigate)
* [`Page.stopLoading`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-stopLoading)
* [`Page.getNavigationHistory`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getNavigationHistory)
* [`Page.navigateToHistoryEntry`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigateToHistoryEntry)
* [`Page.getCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getCookies)
* [`Page.deleteCookie`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-deleteCookie)
* [`Page.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDeviceMetricsOverride)
* [`Page.clearDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-clearDeviceMetricsOverride)
* [`Page.setGeolocationOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setGeolocationOverride)
* [`Page.clearGeolocationOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-clearGeolocationOverride)
* [`Page.setDeviceOrientationOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDeviceOrientationOverride)
* [`Page.clearDeviceOrientationOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-clearDeviceOrientationOverride)
* [`Page.setTouchEmulationEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setTouchEmulationEnabled)
* [`Page.captureScreenshot`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot)
* [`Page.printToPDF`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF)
* [`Page.getAppManifest`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getAppManifest)
* [`Page.getLayoutMetrics`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getLayoutMetrics)
* [`Page.createIsolatedWorld`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-createIsolatedWorld)
#### `Page`: modified events
* [`Page.frameAttached`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameAttached)
* [`Page.frameScheduledNavigation`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameScheduledNavigation)
* [`Page.windowOpen`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-windowOpen)
#### `Page`: removed type
* [`Page.NavigationResponse`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-NavigationResponse)
#### `Page`: modified types
* [`Page.ScriptIdentifier`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-ScriptIdentifier)
* [`Page.TransitionType`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-TransitionType)
* [`Page.NavigationEntry`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-NavigationEntry)
* [`Page.DialogType`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-DialogType)
* [`Page.AppManifestError`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-AppManifestError)
* [`Page.LayoutViewport`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-LayoutViewport)
* [`Page.VisualViewport`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-VisualViewport)
* [`Page.Viewport`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-Viewport)
#### `Emulation`: modified commands
* [`Emulation.setScriptExecutionDisabled`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setScriptExecutionDisabled)
* [`Emulation.setGeolocationOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setGeolocationOverride)
* [`Emulation.clearGeolocationOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-clearGeolocationOverride)
* [`Emulation.canEmulate`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-canEmulate)
* [`Emulation.setDefaultBackgroundColorOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDefaultBackgroundColorOverride)
#### `Network`: modified commands
* [`Network.getCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getCookies)
* [`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getAllCookies)
* [`Network.deleteCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-deleteCookies)
* [`Network.setCookie`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCookie)
* [`Network.setCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCookies)
* [`Network.canEmulateNetworkConditions`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-canEmulateNetworkConditions)
#### `Network`: modified events
* [`Network.requestWillBeSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestWillBeSent)
* [`Network.responseReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-responseReceived)
* [`Network.loadingFailed`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-loadingFailed)
* [`Network.webSocketWillSendHandshakeRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketWillSendHandshakeRequest)
* [`Network.webSocketHandshakeResponseReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketHandshakeResponseReceived)
* [`Network.webSocketCreated`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketCreated)
* [`Network.webSocketClosed`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketClosed)
* [`Network.webSocketFrameReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameReceived)
* [`Network.webSocketFrameError`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameError)
* [`Network.webSocketFrameSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameSent)
* [`Network.eventSourceMessageReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-eventSourceMessageReceived)
#### `Network`: modified types
* [`Network.BlockedReason`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-BlockedReason)
* [`Network.Response`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Response)
* [`Network.WebSocketRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-WebSocketRequest)
* [`Network.WebSocketResponse`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-WebSocketResponse)
* [`Network.WebSocketFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-WebSocketFrame)
* [`Network.Cookie`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Cookie)
* [`Network.CookieParam`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-CookieParam)
#### `DOM`: modified commands
* [`DOM.getDocument`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getDocument)
* [`DOM.getFlattenedDocument`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getFlattenedDocument)
* [`DOM.requestChildNodes`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-requestChildNodes)
* [`DOM.performSearch`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-performSearch)
* [`DOM.focus`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-focus)
* [`DOM.setFileInputFiles`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setFileInputFiles)
* [`DOM.getBoxModel`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getBoxModel)
* [`DOM.describeNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-describeNode)
#### `DOM`: modified types
* [`DOM.BackendNodeId`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-BackendNodeId)
* [`DOM.BackendNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-BackendNode)
* [`DOM.Node`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-Node)
* [`DOM.Quad`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-Quad)
* [`DOM.BoxModel`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-BoxModel)
* [`DOM.ShapeOutsideInfo`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-ShapeOutsideInfo)
* [`DOM.Rect`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-Rect)
#### `CSS`: modified commands
* [`CSS.getPlatformFontsForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getPlatformFontsForNode)
* [`CSS.collectClassNames`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-collectClassNames)
* [`CSS.getMediaQueries`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getMediaQueries)
* [`CSS.setEffectivePropertyValueForNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-setEffectivePropertyValueForNode)
* [`CSS.getBackgroundColors`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getBackgroundColors)
* [`CSS.startRuleUsageTracking`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-startRuleUsageTracking)
* [`CSS.takeCoverageDelta`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-takeCoverageDelta)
* [`CSS.stopRuleUsageTracking`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-stopRuleUsageTracking)
#### `CSS`: removed type
* [`CSS.InlineTextBox`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-InlineTextBox)
#### `CSS`: modified types
* [`CSS.CSSStyleSheetHeader`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSStyleSheetHeader)
* [`CSS.RuleUsage`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-RuleUsage)
* [`CSS.CSSMedia`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-CSSMedia)
* [`CSS.MediaQuery`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-MediaQuery)
* [`CSS.MediaQueryExpression`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-MediaQueryExpression)
* [`CSS.PlatformFontUsage`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-PlatformFontUsage)
#### `DOMSnapshot`: new type
* [`DOMSnapshot.InlineTextBox`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-InlineTextBox)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.LayoutTreeNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-LayoutTreeNode)
#### `DOMDebugger`: modified command
* [`DOMDebugger.getEventListeners`](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger/#method-getEventListeners)
#### `DOMDebugger`: modified type
* [`DOMDebugger.EventListener`](https://chromedevtools.github.io/devtools-protocol/tot/DOMDebugger/#type-EventListener)
#### `Target`: modified commands
* [`Target.setAttachToFrames`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setAttachToFrames)
* [`Target.setRemoteLocations`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setRemoteLocations)
* [`Target.createBrowserContext`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-createBrowserContext)
* [`Target.disposeBrowserContext`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-disposeBrowserContext)
#### `Target`: modified types
* [`Target.BrowserContextID`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#type-BrowserContextID)
* [`Target.RemoteLocation`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#type-RemoteLocation)
#### `Input`: modified commands
* [`Input.dispatchKeyEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchKeyEvent)
* [`Input.dispatchTouchEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchTouchEvent)
#### `Input`: modified type
* [`Input.TouchPoint`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#type-TouchPoint)
#### `Browser`: modified commands
* [`Browser.getWindowForTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowForTarget)
* [`Browser.setWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-setWindowBounds)
* [`Browser.getWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowBounds)
#### `Browser`: modified types
* [`Browser.WindowID`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-WindowID)
* [`Browser.WindowState`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-WindowState)
* [`Browser.Bounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-Bounds)


## Roll protocol to r512925
###### _2017-10-31 13:15:51_
Diff: [d7f1734...171f927](https://github.com/ChromeDevTools/devtools-protocol/compare/d7f1734...171f927)
#### `Page`: new command
* [`Page.getFrameTree`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-getFrameTree)
#### `Page`: new type
* [`Page.FrameTree`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-FrameTree)


## Roll protocol to r511679
###### _2017-10-25 18:15:34_
Diff: [704cc11...d7f1734](https://github.com/ChromeDevTools/devtools-protocol/compare/704cc11...d7f1734)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted)


## Roll protocol to r510771
###### _2017-10-23 05:16:00_
Diff: [228b292...745052e](https://github.com/ChromeDevTools/devtools-protocol/compare/228b292...745052e)
#### `HeadlessExperimental`: modified command
* [`HeadlessExperimental.beginFrame`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#method-beginFrame)


## Roll protocol to r510657
###### _2017-10-20 21:15:50_
Diff: [5df6a06...cb1d580](https://github.com/ChromeDevTools/devtools-protocol/compare/5df6a06...cb1d580)
#### `Network`: new command
* [`Network.setRequestInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setRequestInterception)
#### `Network`: removed command
* [`Network.setRequestInterceptionEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setRequestInterceptionEnabled)
#### `Network`: new type
* [`Network.RequestPattern`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-RequestPattern)


## Roll protocol to r509994
###### _2017-10-18 21:15:50_
Diff: [06db515...5df6a06](https://github.com/ChromeDevTools/devtools-protocol/compare/06db515...5df6a06)
#### `Input`: modified command
* [`Input.dispatchKeyEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchKeyEvent)


## Roll protocol to r509917
###### _2017-10-18 16:15:52_
Diff: [2249014...06db515](https://github.com/ChromeDevTools/devtools-protocol/compare/2249014...06db515)
#### `Emulation`: modified command
* [`Emulation.setVirtualTimePolicy`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVirtualTimePolicy)


## Roll protocol to r509331
###### _2017-10-17 02:15:55_
Diff: [c623810...2249014](https://github.com/ChromeDevTools/devtools-protocol/compare/c623810...2249014)
#### `Runtime`: new command
* [`Runtime.globalLexicalScopeNames`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-globalLexicalScopeNames)


## Roll protocol to r508301
###### _2017-10-12 03:16:09_
Diff: [e95be51...4eaa4f7](https://github.com/ChromeDevTools/devtools-protocol/compare/e95be51...4eaa4f7)
#### `Browser`: new command
* [`Browser.close`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-close)


## Roll protocol to r508087
###### _2017-10-11 13:15:51_
Diff: [4856f10...2988a57](https://github.com/ChromeDevTools/devtools-protocol/compare/4856f10...2988a57)
#### `Target`: modified type
* [`Target.TargetInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#type-TargetInfo)


## Roll protocol to r507818
###### _2017-10-10 16:15:50_
Diff: [662fafd...4856f10](https://github.com/ChromeDevTools/devtools-protocol/compare/662fafd...4856f10)
#### `HeadlessExperimental`: new domain
* [`HeadlessExperimental.HeadlessExperimental`](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#domain-HeadlessExperimental)
#### `Page`: modified command
* [`Page.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDeviceMetricsOverride)
#### `Emulation`: modified command
* [`Emulation.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDeviceMetricsOverride)
#### `Target`: modified command
* [`Target.createTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-createTarget)
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
###### _2017-10-10 01:15:40_
Diff: [a63b5fa...662fafd](https://github.com/ChromeDevTools/devtools-protocol/compare/a63b5fa...662fafd)
#### `Page`: new event
* [`Page.windowOpen`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-windowOpen)


## Roll protocol to r507488
###### _2017-10-09 14:16:01_
Diff: [11ca8ba...a63b5fa](https://github.com/ChromeDevTools/devtools-protocol/compare/11ca8ba...a63b5fa)
#### `Page`: modified event
* [`Page.lifecycleEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-lifecycleEvent)


## Roll protocol to r507347
###### _2017-10-09 03:16:03_
Diff: [2189599...11ca8ba](https://github.com/ChromeDevTools/devtools-protocol/compare/2189599...11ca8ba)
#### `Network`: modified command
* [`Network.setRequestInterceptionEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setRequestInterceptionEnabled)


## Roll protocol to r507305
###### _2017-10-08 01:15:50_
Diff: [555aaea...2189599](https://github.com/ChromeDevTools/devtools-protocol/compare/555aaea...2189599)
#### `Debugger`: modified command
* [`Debugger.setBreakpointByUrl`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-setBreakpointByUrl)


## Roll protocol to r507040
###### _2017-10-06 06:15:53_
Diff: [1fd8f9d...555aaea](https://github.com/ChromeDevTools/devtools-protocol/compare/1fd8f9d...555aaea)
#### `Emulation`: new event
* [`Emulation.virtualTimeAdvanced`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeAdvanced)


## Roll protocol to r506815
###### _2017-10-05 12:15:34_
Diff: [53e8611...7931842](https://github.com/ChromeDevTools/devtools-protocol/compare/53e8611...7931842)
#### `Emulation`: removed event
* [`Emulation.virtualTimeAdvanced`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeAdvanced)


## Roll protocol to r506789
###### _2017-10-05 11:15:33_
Diff: [d9b6389...53e8611](https://github.com/ChromeDevTools/devtools-protocol/compare/d9b6389...53e8611)
#### `Page`: modified event
* [`Page.frameScheduledNavigation`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameScheduledNavigation)
#### `Emulation`: new event
* [`Emulation.virtualTimeAdvanced`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeAdvanced)


## Roll protocol to r505811
###### _2017-10-02 15:15:35_
Diff: [ae7b452...e81a47d](https://github.com/ChromeDevTools/devtools-protocol/compare/ae7b452...e81a47d)
#### `Animation`: modified types
* [`Animation.Animation`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-Animation)
* [`Animation.AnimationEffect`](https://chromedevtools.github.io/devtools-protocol/tot/Animation/#type-AnimationEffect)


## Roll protocol to r505461
###### _2017-09-29 15:15:43_
Diff: [80f8dac...ae7b452](https://github.com/ChromeDevTools/devtools-protocol/compare/80f8dac...ae7b452)
#### `Log`: modified type
* [`Log.LogEntry`](https://chromedevtools.github.io/devtools-protocol/tot/Log/#type-LogEntry)


## Roll protocol to r505240
###### _2017-09-28 18:15:42_
Diff: [406b6a8...80f8dac](https://github.com/ChromeDevTools/devtools-protocol/compare/406b6a8...80f8dac)
#### `Storage`: new commands
* [`Storage.trackIndexedDBForOrigin`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-trackIndexedDBForOrigin)
* [`Storage.untrackIndexedDBForOrigin`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-untrackIndexedDBForOrigin)
#### `Storage`: new events
* [`Storage.indexedDBListUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#event-indexedDBListUpdated)
* [`Storage.indexedDBContentUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#event-indexedDBContentUpdated)


## Roll protocol to r504912
###### _2017-09-27 22:15:34_
Diff: [c690a27...406b6a8](https://github.com/ChromeDevTools/devtools-protocol/compare/c690a27...406b6a8)
#### `Runtime`: modified event
* [`Runtime.exceptionRevoked`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-exceptionRevoked)


## Roll protocol to r504880
###### _2017-09-27 20:15:26_
Diff: [6ab68c9...c690a27](https://github.com/ChromeDevTools/devtools-protocol/compare/6ab68c9...c690a27)
#### `DOM`: modified command
* [`DOM.getSearchResults`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getSearchResults)


## Roll protocol to r504262
###### _2017-09-25 19:15:28_
Diff: [6c8cab7...6ab68c9](https://github.com/ChromeDevTools/devtools-protocol/compare/6c8cab7...6ab68c9)
#### `Network`: modified types
* [`Network.Response`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Response)
* [`Network.WebSocketResponse`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-WebSocketResponse)


## Roll protocol to r502201
###### _2017-09-15 01:15:32_
Diff: [f2d4460...6c8cab7](https://github.com/ChromeDevTools/devtools-protocol/compare/f2d4460...6c8cab7)
#### `ServiceWorker`: new command
* [`ServiceWorker.stopAllWorkers`](https://chromedevtools.github.io/devtools-protocol/tot/ServiceWorker/#method-stopAllWorkers)


## Roll protocol to r501229
###### _2017-09-12 03:15:42_
Diff: [fee6891...f2d4460](https://github.com/ChromeDevTools/devtools-protocol/compare/fee6891...f2d4460)
#### `Emulation`: new command
* [`Emulation.setNavigatorOverrides`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setNavigatorOverrides)


## Roll protocol to r500703
###### _2017-09-08 15:15:55_
Diff: [adb2948...fee6891](https://github.com/ChromeDevTools/devtools-protocol/compare/adb2948...fee6891)
#### `Profiler`: new commands
* [`Profiler.startTypeProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-startTypeProfile)
* [`Profiler.stopTypeProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-stopTypeProfile)
* [`Profiler.takeTypeProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-takeTypeProfile)
#### `Profiler`: new types
* [`Profiler.TypeObject`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-TypeObject)
* [`Profiler.TypeProfileEntry`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-TypeProfileEntry)
* [`Profiler.ScriptTypeProfile`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-ScriptTypeProfile)


## Roll protocol to r500564
###### _2017-09-08 04:15:36_
Diff: [7794931...adb2948](https://github.com/ChromeDevTools/devtools-protocol/compare/7794931...adb2948)
#### `Debugger`: modified type
* [`Debugger.CallFrame`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#type-CallFrame)


## Roll protocol to r500445
###### _2017-09-07 17:15:41_
Diff: [ce22a9f...7794931](https://github.com/ChromeDevTools/devtools-protocol/compare/ce22a9f...7794931)
#### `Input`: modified type
* [`Input.TouchPoint`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#type-TouchPoint)


## Roll protocol to r500221
###### _2017-09-06 22:15:25_
Diff: [a0d1c79...ce22a9f](https://github.com/ChromeDevTools/devtools-protocol/compare/a0d1c79...ce22a9f)
#### `Network`: modified command
* [`Network.emulateNetworkConditions`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-emulateNetworkConditions)
#### `Network`: modified type
* [`Network.ConnectionType`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-ConnectionType)


## Roll protocol to r499605
###### _2017-09-05 05:16:01_
Diff: [96c09fd...a0d1c79](https://github.com/ChromeDevTools/devtools-protocol/compare/96c09fd...a0d1c79)
#### `Emulation`: new event
* [`Emulation.virtualTimePaused`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimePaused)
#### `Emulation`: modified event
* [`Emulation.virtualTimeBudgetExpired`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeBudgetExpired)


## Roll protocol to r499541
###### _2017-09-04 19:15:31_
Diff: [a7c9118...96c09fd](https://github.com/ChromeDevTools/devtools-protocol/compare/a7c9118...96c09fd)
#### `Page`: modified command
* [`Page.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDeviceMetricsOverride)
#### `Emulation`: modified command
* [`Emulation.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDeviceMetricsOverride)


## Roll protocol to r499413
###### _2017-09-03 02:15:28_
Diff: [78d5984...a7c9118](https://github.com/ChromeDevTools/devtools-protocol/compare/78d5984...a7c9118)
#### `Emulation`: removed event
* [`Emulation.virtualTimePaused`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimePaused)
#### `Emulation`: modified event
* [`Emulation.virtualTimeBudgetExpired`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeBudgetExpired)


## Roll protocol to r499273
###### _2017-09-01 13:15:31_
Diff: [95fdb0b...78d5984](https://github.com/ChromeDevTools/devtools-protocol/compare/95fdb0b...78d5984)
#### `Runtime`: modified command
* [`Runtime.callFunctionOn`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-callFunctionOn)


## Roll protocol to r498841
###### _2017-08-31 06:16:26_
Diff: [44bc1f3...95fdb0b](https://github.com/ChromeDevTools/devtools-protocol/compare/44bc1f3...95fdb0b)
#### `Runtime`: modified command
* [`Runtime.callFunctionOn`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-callFunctionOn)
#### `Emulation`: new event
* [`Emulation.virtualTimePaused`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimePaused)
#### `Emulation`: modified event
* [`Emulation.virtualTimeBudgetExpired`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#event-virtualTimeBudgetExpired)


## Roll protocol to r498768
###### _2017-08-30 23:15:32_
Diff: [7d46741...44bc1f3](https://github.com/ChromeDevTools/devtools-protocol/compare/7d46741...44bc1f3)
#### `Runtime`: modified command
* [`Runtime.callFunctionOn`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-callFunctionOn)


## Roll protocol to r498659
###### _2017-08-30 16:15:32_
Diff: [4c6535a...7d46741](https://github.com/ChromeDevTools/devtools-protocol/compare/4c6535a...7d46741)
#### `CacheStorage`: modified type
* [`CacheStorage.DataEntry`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#type-DataEntry)


## Roll protocol to r498251
###### _2017-08-29 15:15:42_
Diff: [a5dfd5d...4c6535a](https://github.com/ChromeDevTools/devtools-protocol/compare/a5dfd5d...4c6535a)
#### `CacheStorage`: new type
* [`CacheStorage.Header`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#type-Header)
#### `CacheStorage`: modified types
* [`CacheStorage.DataEntry`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#type-DataEntry)
* [`CacheStorage.CachedResponse`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#type-CachedResponse)


## Roll protocol to r497858
###### _2017-08-28 13:15:33_
Diff: [afb185e...a5dfd5d](https://github.com/ChromeDevTools/devtools-protocol/compare/afb185e...a5dfd5d)
#### `Runtime`: modified type
* [`Runtime.CallArgument`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-CallArgument)


## Roll protocol to r497762
###### _2017-08-28 08:15:29_
Diff: [03d4f5f...afb185e](https://github.com/ChromeDevTools/devtools-protocol/compare/03d4f5f...afb185e)
#### `Runtime`: modified type
* [`Runtime.CallArgument`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-CallArgument)


## Roll protocol to r497708
###### _2017-08-28 01:15:30_
Diff: [0958f69...03d4f5f](https://github.com/ChromeDevTools/devtools-protocol/compare/0958f69...03d4f5f)
#### `Memory`: new command
* [`Memory.prepareForLeakDetection`](https://chromedevtools.github.io/devtools-protocol/tot/Memory/#method-prepareForLeakDetection)


## Roll protocol to r497654
###### _2017-08-25 22:15:24_
Diff: [7f086f5...0958f69](https://github.com/ChromeDevTools/devtools-protocol/compare/7f086f5...0958f69)
#### `Runtime`: modified type
* [`Runtime.CallArgument`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-CallArgument)


## Roll protocol to r497463
###### _2017-08-25 11:15:26_
Diff: [57e8992...7f086f5](https://github.com/ChromeDevTools/devtools-protocol/compare/57e8992...7f086f5)
#### `Security`: modified type
* [`Security.SecurityState`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#type-SecurityState)


## Roll protocol to r497428
###### _2017-08-25 09:15:25_
Diff: [dd57a17...57e8992](https://github.com/ChromeDevTools/devtools-protocol/compare/dd57a17...57e8992)
#### `Network`: modified command
* [`Network.setRequestInterceptionEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setRequestInterceptionEnabled)


## Roll protocol to r496905
###### _2017-08-23 18:15:33_
Diff: [3789a0d...dd57a17](https://github.com/ChromeDevTools/devtools-protocol/compare/3789a0d...dd57a17)
#### `Runtime`: modified command
* [`Runtime.queryObjects`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-queryObjects)


## Roll protocol to r496688
###### _2017-08-23 08:15:29_
Diff: [326cc31...3789a0d](https://github.com/ChromeDevTools/devtools-protocol/compare/326cc31...3789a0d)
#### `Profiler`: modified command
* [`Profiler.startPreciseCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-startPreciseCoverage)


## Roll protocol to r496607
###### _2017-08-23 00:15:24_
Diff: [a223c0c...326cc31](https://github.com/ChromeDevTools/devtools-protocol/compare/a223c0c...326cc31)
#### `Page`: new event
* [`Page.lifecycleEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-lifecycleEvent)


## Roll protocol to r496585
###### _2017-08-22 21:15:27_
Diff: [f1b621f...a223c0c](https://github.com/ChromeDevTools/devtools-protocol/compare/f1b621f...a223c0c)
#### `Page`: new command
* [`Page.setDownloadBehavior`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDownloadBehavior)


## Roll protocol to r496160
###### _2017-08-21 18:15:31_
Diff: [7109da3...f1b621f](https://github.com/ChromeDevTools/devtools-protocol/compare/7109da3...f1b621f)
#### `DOM`: new command
* [`DOM.describeNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-describeNode)


## Roll protocol to r496061
###### _2017-08-21 14:15:32_
Diff: [1da2f21...7109da3](https://github.com/ChromeDevTools/devtools-protocol/compare/1da2f21...7109da3)
#### `Runtime`: new command
* [`Runtime.queryObjects`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-queryObjects)


## Roll protocol to r495853
###### _2017-08-20 15:15:25_
Diff: [40a1403...1da2f21](https://github.com/ChromeDevTools/devtools-protocol/compare/40a1403...1da2f21)
#### `DOM`: modified command
* [`DOM.getOuterHTML`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getOuterHTML)


## Roll protocol to r495828
###### _2017-08-19 15:15:24_
Diff: [f253796...40a1403](https://github.com/ChromeDevTools/devtools-protocol/compare/f253796...40a1403)
#### `Audits`: new domain
* [`Audits.Audits`](https://chromedevtools.github.io/devtools-protocol/tot/Audits/#domain-Audits)
#### `Audits`: new command
* [`Audits.getEncodedResponse`](https://chromedevtools.github.io/devtools-protocol/tot/Audits/#method-getEncodedResponse)


## Roll protocol to r495269
###### _2017-08-17 12:15:44_
Diff: [c10facc...f253796](https://github.com/ChromeDevTools/devtools-protocol/compare/c10facc...f253796)
#### `Network`: new command
* [`Network.deleteCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-deleteCookies)
#### `Network`: removed command
* [`Network.deleteCookie`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-deleteCookie)


## Roll protocol to r495009
###### _2017-08-16 17:15:31_
Diff: [c10e566...c10facc](https://github.com/ChromeDevTools/devtools-protocol/compare/c10e566...c10facc)
#### `Input`: modified command
* [`Input.dispatchTouchEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchTouchEvent)
#### `Input`: modified type
* [`Input.TouchPoint`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#type-TouchPoint)


## Roll protocol to r494622
###### _2017-08-15 17:15:31_
Diff: [2090c47...c10e566](https://github.com/ChromeDevTools/devtools-protocol/compare/2090c47...c10e566)
#### `Network`: new command
* [`Network.setCookies`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCookies)
#### `Network`: modified command
* [`Network.setCookie`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCookie)
#### `Network`: new type
* [`Network.CookieParam`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-CookieParam)
#### `Input`: modified command
* [`Input.dispatchMouseEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchMouseEvent)


## Roll protocol to r494333
###### _2017-08-14 23:15:20_
Diff: [993dd10...2090c47](https://github.com/ChromeDevTools/devtools-protocol/compare/993dd10...2090c47)
#### `Runtime`: modified commands
* [`Runtime.evaluate`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate)
* [`Runtime.callFunctionOn`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-callFunctionOn)
* [`Runtime.runScript`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-runScript)


## Roll protocol to r494302
###### _2017-08-14 19:15:35_
Diff: [e71b448...993dd10](https://github.com/ChromeDevTools/devtools-protocol/compare/e71b448...993dd10)
#### `Overlay`: modified type
* [`Overlay.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#type-HighlightConfig)


## Roll protocol to r494191
###### _2017-08-14 14:15:39_
Diff: [f1217c8...e71b448](https://github.com/ChromeDevTools/devtools-protocol/compare/f1217c8...e71b448)
#### `Performance`: new event
* [`Performance.metrics`](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#event-metrics)
#### `Storage`: new commands
* [`Storage.trackCacheStorageForOrigin`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-trackCacheStorageForOrigin)
* [`Storage.untrackCacheStorageForOrigin`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-untrackCacheStorageForOrigin)
#### `Storage`: new events
* [`Storage.cacheStorageListUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#event-cacheStorageListUpdated)
* [`Storage.cacheStorageContentUpdated`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#event-cacheStorageContentUpdated)


## Roll protocol to r493957
###### _2017-08-11 22:15:29_
Diff: [c314a8c...f1217c8](https://github.com/ChromeDevTools/devtools-protocol/compare/c314a8c...f1217c8)
#### `Browser`: new command
* [`Browser.getVersion`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getVersion)


## Roll protocol to r493949
###### _2017-08-11 20:15:31_
Diff: [f1415d2...c314a8c](https://github.com/ChromeDevTools/devtools-protocol/compare/f1415d2...c314a8c)
#### `Security`: removed command
* [`Security.showCertificateViewer`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#method-showCertificateViewer)
#### `Security`: modified type
* [`Security.SecurityStateExplanation`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#type-SecurityStateExplanation)


## Roll protocol to r493629
###### _2017-08-10 18:15:28_
Diff: [97e6602...f1415d2](https://github.com/ChromeDevTools/devtools-protocol/compare/97e6602...f1415d2)
#### `Performance`: new domain
* [`Performance.Performance`](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#domain-Performance)
#### `Performance`: new commands
* [`Performance.enable`](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#method-enable)
* [`Performance.disable`](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#method-disable)
* [`Performance.getMetrics`](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#method-getMetrics)
#### `Performance`: new type
* [`Performance.Metric`](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#type-Metric)


## Roll protocol to r493463
###### _2017-08-10 11:15:27_
Diff: [6a97ff4...97e6602](https://github.com/ChromeDevTools/devtools-protocol/compare/6a97ff4...97e6602)
#### `Emulation`: new command
* [`Emulation.setEmitTouchEventsForMouse`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setEmitTouchEventsForMouse)
#### `Emulation`: modified command
* [`Emulation.setTouchEmulationEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setTouchEmulationEnabled)


## Roll protocol to r492915
###### _2017-08-09 02:15:29_
Diff: [34e6ca8...6a97ff4](https://github.com/ChromeDevTools/devtools-protocol/compare/34e6ca8...6a97ff4)
#### `CSS`: modified command
* [`CSS.getBackgroundColors`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getBackgroundColors)


## Roll protocol to r491719
###### _2017-08-03 06:15:23_
Diff: [ff44833...34e6ca8](https://github.com/ChromeDevTools/devtools-protocol/compare/ff44833...34e6ca8)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode)


## Roll protocol to r491274
###### _2017-08-01 22:15:27_
Diff: [80d4068...ff44833](https://github.com/ChromeDevTools/devtools-protocol/compare/80d4068...ff44833)
#### `Page`: modified events
* [`Page.javascriptDialogOpening`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-javascriptDialogOpening)
* [`Page.javascriptDialogClosed`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-javascriptDialogClosed)


## Roll protocol to r491147
###### _2017-08-01 16:15:38_
Diff: [598f59e...80d4068](https://github.com/ChromeDevTools/devtools-protocol/compare/598f59e...80d4068)
#### `Accessibility`: modified types
* [`Accessibility.AXGlobalStates`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXGlobalStates)
* [`Accessibility.AXLiveRegionAttributes`](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#type-AXLiveRegionAttributes)


## Roll protocol to r490913
###### _2017-08-01 01:15:27_
Diff: [6dbc46a...598f59e](https://github.com/ChromeDevTools/devtools-protocol/compare/6dbc46a...598f59e)
#### `Page`: removed commands
* [`Page.setControlNavigations`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setControlNavigations)
* [`Page.processNavigation`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-processNavigation)
#### `Page`: removed event
* [`Page.navigationRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-navigationRequested)
#### `Network`: modified command
* [`Network.continueInterceptedRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-continueInterceptedRequest)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted)


## Roll protocol to r490738
###### _2017-07-31 03:15:36_
Diff: [815efee...6dbc46a](https://github.com/ChromeDevTools/devtools-protocol/compare/815efee...6dbc46a)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode)


## Roll protocol to r490636
###### _2017-07-28 23:15:20_
Diff: [d1125b4...815efee](https://github.com/ChromeDevTools/devtools-protocol/compare/d1125b4...815efee)
#### `Page`: new command
* [`Page.setAdBlockingEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setAdBlockingEnabled)


## Roll protocol to r490621
###### _2017-07-28 21:15:20_
Diff: [44c6002...d1125b4](https://github.com/ChromeDevTools/devtools-protocol/compare/44c6002...d1125b4)
#### `Overlay`: new event
* [`Overlay.screenshotRequested`](https://chromedevtools.github.io/devtools-protocol/tot/Overlay/#event-screenshotRequested)


## Roll protocol to r489908
###### _2017-07-27 06:15:23_
Diff: [057127c...44c6002](https://github.com/ChromeDevTools/devtools-protocol/compare/057127c...44c6002)
#### `LayerTree`: new type
* [`LayerTree.StickyPositionConstraint`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#type-StickyPositionConstraint)
#### `LayerTree`: modified type
* [`LayerTree.Layer`](https://chromedevtools.github.io/devtools-protocol/tot/LayerTree/#type-Layer)


## Roll protocol to r489613
###### _2017-07-26 05:15:21_
Diff: [fe85a1b...057127c](https://github.com/ChromeDevTools/devtools-protocol/compare/fe85a1b...057127c)
#### `Page`: modified event
* [`Page.frameScheduledNavigation`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameScheduledNavigation)


## Roll protocol to r489413
###### _2017-07-25 13:15:27_
Diff: [9433945...fe85a1b](https://github.com/ChromeDevTools/devtools-protocol/compare/9433945...fe85a1b)
#### `Page`: new command
* [`Page.bringToFront`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-bringToFront)


## Roll protocol to r489024
###### _2017-07-24 11:15:50_
Diff: [07508bb...9433945](https://github.com/ChromeDevTools/devtools-protocol/compare/07508bb...9433945)
#### `Page`: modified event
* [`Page.frameScheduledNavigation`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameScheduledNavigation)
#### `IO`: modified command
* [`IO.read`](https://chromedevtools.github.io/devtools-protocol/tot/IO/#method-read)
#### `IO`: modified type
* [`IO.StreamHandle`](https://chromedevtools.github.io/devtools-protocol/tot/IO/#type-StreamHandle)


## Roll protocol to r488771
###### _2017-07-21 15:15:36_
Diff: [a156198...07508bb](https://github.com/ChromeDevTools/devtools-protocol/compare/a156198...07508bb)
#### `IO`: new command
* [`IO.resolveBlob`](https://chromedevtools.github.io/devtools-protocol/tot/IO/#method-resolveBlob)


## Roll protocol to r488639
###### _2017-07-21 06:15:18_
Diff: [3f4dbfa...a156198](https://github.com/ChromeDevTools/devtools-protocol/compare/3f4dbfa...a156198)
#### `Page`: modified type
* [`Page.Frame`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-Frame)


## Roll protocol to r488555
###### _2017-07-20 19:15:23_
Diff: [6a7416a...3f4dbfa](https://github.com/ChromeDevTools/devtools-protocol/compare/6a7416a...3f4dbfa)
#### `CacheStorage`: new command
* [`CacheStorage.requestCachedResponse`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#method-requestCachedResponse)
#### `CacheStorage`: new type
* [`CacheStorage.CachedResponse`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#type-CachedResponse)


## Roll protocol to r488475
###### _2017-07-20 16:15:20_
Diff: [24063d5...6a7416a](https://github.com/ChromeDevTools/devtools-protocol/compare/24063d5...6a7416a)
#### `Page`: modified command
* [`Page.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDeviceMetricsOverride)
#### `Emulation`: modified commands
* [`Emulation.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDeviceMetricsOverride)
* [`Emulation.setVisibleSize`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVisibleSize)


## Roll protocol to r488407
###### _2017-07-20 14:15:34_
Diff: [0247171...24063d5](https://github.com/ChromeDevTools/devtools-protocol/compare/0247171...24063d5)
#### `Target`: modified commands
* [`Target.sendMessageToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-sendMessageToTarget)
* [`Target.attachToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget)
* [`Target.detachFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-detachFromTarget)
#### `Target`: modified events
* [`Target.attachedToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-attachedToTarget)
* [`Target.detachedFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-detachedFromTarget)
* [`Target.receivedMessageFromTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-receivedMessageFromTarget)
#### `Target`: new type
* [`Target.SessionID`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#type-SessionID)


## Roll protocol to r487821
###### _2017-07-19 04:15:25_
Diff: [1d10caf...0247171](https://github.com/ChromeDevTools/devtools-protocol/compare/1d10caf...0247171)
#### `Page`: modified command
* [`Page.printToPDF`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF)
#### `Page`: modified type
* [`Page.Frame`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-Frame)


## Roll protocol to r486590
###### _2017-07-13 18:15:23_
Diff: [9612949...1d10caf](https://github.com/ChromeDevTools/devtools-protocol/compare/9612949...1d10caf)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode)


## Roll protocol to r486216
###### _2017-07-12 18:55:05_
Diff: [361ec60...1329e26](https://github.com/ChromeDevTools/devtools-protocol/compare/361ec60...1329e26)
#### `DOM`: modified commands
* [`DOM.focus`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-focus)
* [`DOM.setFileInputFiles`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-setFileInputFiles)
* [`DOM.getBoxModel`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-getBoxModel)


## Roll protocol to r486175
###### _2017-07-12 17:15:26_
Diff: [ea90b21...361ec60](https://github.com/ChromeDevTools/devtools-protocol/compare/ea90b21...361ec60)
#### `Input`: modified commands
* [`Input.dispatchMouseEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchMouseEvent)
* [`Input.synthesizePinchGesture`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-synthesizePinchGesture)
* [`Input.synthesizeScrollGesture`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-synthesizeScrollGesture)
* [`Input.synthesizeTapGesture`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-synthesizeTapGesture)


## Roll protocol to r485940 485678
###### _2017-07-12 07:15:22_
Diff: [3553411...9edfb70](https://github.com/ChromeDevTools/devtools-protocol/compare/3553411...9edfb70)
#### `Page`: modified command
* [`Page.captureScreenshot`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot)
#### `Page`: new type
* [`Page.Viewport`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-Viewport)


## Roll protocol to r485689 485314
###### _2017-07-11 12:15:29_
Diff: [837a781...3553411](https://github.com/ChromeDevTools/devtools-protocol/compare/837a781...3553411)
#### `Page`: modified command
* [`Page.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDeviceMetricsOverride)
#### `Emulation`: removed commands
* [`Emulation.forceViewport`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-forceViewport)
* [`Emulation.resetViewport`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-resetViewport)
#### `Emulation`: modified commands
* [`Emulation.setDeviceMetricsOverride`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setDeviceMetricsOverride)
* [`Emulation.setVisibleSize`](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setVisibleSize)


## Roll protocol to r485250
###### _2017-07-10 06:15:19_
Diff: [25c87f6...837a781](https://github.com/ChromeDevTools/devtools-protocol/compare/25c87f6...837a781)
#### `DOM`: modified command
* [`DOM.resolveNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-resolveNode)


## Roll protocol to r485002
###### _2017-07-07 12:15:19_
Diff: [0589169...25c87f6](https://github.com/ChromeDevTools/devtools-protocol/compare/0589169...25c87f6)
#### `Network`: new command
* [`Network.setRequestInterceptionEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setRequestInterceptionEnabled)
#### `Network`: removed command
* [`Network.enableRequestInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-enableRequestInterception)


## Roll protocol to r484724
###### _2017-07-06 13:15:20_
Diff: [40987ca...0589169](https://github.com/ChromeDevTools/devtools-protocol/compare/40987ca...0589169)
#### `Page`: new commands
* [`Page.addScriptToEvaluateOnNewDocument`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-addScriptToEvaluateOnNewDocument)
* [`Page.removeScriptToEvaluateOnNewDocument`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-removeScriptToEvaluateOnNewDocument)
#### `Page`: modified commands
* [`Page.addScriptToEvaluateOnLoad`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-addScriptToEvaluateOnLoad)
* [`Page.removeScriptToEvaluateOnLoad`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-removeScriptToEvaluateOnLoad)


## Roll protocol to r484463
###### _2017-07-05 21:15:19_
Diff: [3cca818...40987ca](https://github.com/ChromeDevTools/devtools-protocol/compare/3cca818...40987ca)
#### `Security`: new type
* [`Security.MixedContentType`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#type-MixedContentType)
#### `Security`: modified type
* [`Security.SecurityStateExplanation`](https://chromedevtools.github.io/devtools-protocol/tot/Security/#type-SecurityStateExplanation)
#### `Network`: modified type
* [`Network.Request`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Request)


## Roll protocol to r484434
###### _2017-07-05 18:15:34_
Diff: [81ccf3f...3cca818](https://github.com/ChromeDevTools/devtools-protocol/compare/81ccf3f...3cca818)
#### `Page`: modified events
* [`Page.domContentEventFired`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-domContentEventFired)
* [`Page.loadEventFired`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-loadEventFired)
#### `Page`: modified types
* [`Page.FrameResource`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-FrameResource)
* [`Page.ScreencastFrameMetadata`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-ScreencastFrameMetadata)
#### `Network`: modified command
* [`Network.setCookie`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setCookie)
#### `Network`: modified events
* [`Network.resourceChangedPriority`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-resourceChangedPriority)
* [`Network.requestWillBeSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestWillBeSent)
* [`Network.responseReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-responseReceived)
* [`Network.dataReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-dataReceived)
* [`Network.loadingFinished`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-loadingFinished)
* [`Network.loadingFailed`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-loadingFailed)
* [`Network.webSocketWillSendHandshakeRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketWillSendHandshakeRequest)
* [`Network.webSocketHandshakeResponseReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketHandshakeResponseReceived)
* [`Network.webSocketClosed`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketClosed)
* [`Network.webSocketFrameReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameReceived)
* [`Network.webSocketFrameError`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameError)
* [`Network.webSocketFrameSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-webSocketFrameSent)
* [`Network.eventSourceMessageReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-eventSourceMessageReceived)
#### `Network`: new types
* [`Network.TimeSinceEpoch`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-TimeSinceEpoch)
* [`Network.MonotonicTime`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-MonotonicTime)
#### `Network`: removed type
* [`Network.Timestamp`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Timestamp)
#### `Network`: modified types
* [`Network.SignedCertificateTimestamp`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SignedCertificateTimestamp)
* [`Network.SecurityDetails`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-SecurityDetails)
#### `Input`: modified commands
* [`Input.dispatchKeyEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchKeyEvent)
* [`Input.dispatchMouseEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchMouseEvent)
* [`Input.dispatchTouchEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchTouchEvent)
* [`Input.emulateTouchFromMouseEvent`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-emulateTouchFromMouseEvent)
#### `Input`: new type
* [`Input.TimeSinceEpoch`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#type-TimeSinceEpoch)


## Roll protocol to r484012
###### _2017-07-03 09:15:18_
Diff: [e2e55ea...81ccf3f](https://github.com/ChromeDevTools/devtools-protocol/compare/e2e55ea...81ccf3f)
#### `Network`: modified events
* [`Network.requestWillBeSent`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestWillBeSent)
* [`Network.responseReceived`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-responseReceived)


## Roll protocol to r483799
###### _2017-06-30 13:15:20_
Diff: [8fad5bb...e2e55ea](https://github.com/ChromeDevTools/devtools-protocol/compare/8fad5bb...e2e55ea)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode)


## Roll protocol to r483706
###### _2017-06-30 08:15:16_
Diff: [d5a2d43...8fad5bb](https://github.com/ChromeDevTools/devtools-protocol/compare/d5a2d43...8fad5bb)
#### `DOMSnapshot`: modified type
* [`DOMSnapshot.DOMNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOMSnapshot/#type-DOMNode)


## Roll protocol to r483512
###### _2017-06-29 15:15:18_
Diff: [cbd3167...d5a2d43](https://github.com/ChromeDevTools/devtools-protocol/compare/cbd3167...d5a2d43)
#### `Target`: modified command
* [`Target.setDiscoverTargets`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-setDiscoverTargets)
#### `Target`: new event
* [`Target.targetInfoChanged`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#event-targetInfoChanged)
#### `Target`: modified type
* [`Target.TargetInfo`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#type-TargetInfo)


## Roll protocol to r482373
###### _2017-06-26 13:15:23_
Diff: [7462a7d...31bb33b](https://github.com/ChromeDevTools/devtools-protocol/compare/7462a7d...31bb33b)
#### `Network`: modified type
* [`Network.Initiator`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Initiator)


## Roll protocol to r481914
###### _2017-06-23 09:15:23_
Diff: [6d93eed...7462a7d](https://github.com/ChromeDevTools/devtools-protocol/compare/6d93eed...7462a7d)
#### `Page`: modified command
* [`Page.createIsolatedWorld`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-createIsolatedWorld)


## Roll protocol to r481860
###### _2017-06-23 05:15:20_
Diff: [6463d0e...6d93eed](https://github.com/ChromeDevTools/devtools-protocol/compare/6463d0e...6d93eed)
#### `Profiler`: modified type
* [`Profiler.FunctionCoverage`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#type-FunctionCoverage)


## Roll protocol to r481735
###### _2017-06-22 17:15:19_
Diff: [ccabc09...6463d0e](https://github.com/ChromeDevTools/devtools-protocol/compare/ccabc09...6463d0e)
#### `Storage`: modified command
* [`Storage.getUsageAndQuota`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-getUsageAndQuota)
#### `Storage`: new type
* [`Storage.UsageForType`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#type-UsageForType)
#### `Storage`: modified type
* [`Storage.StorageType`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#type-StorageType)


## Roll protocol to r480235
###### _2017-06-16 17:15:36_
Diff: [cdb002c...ccabc09](https://github.com/ChromeDevTools/devtools-protocol/compare/cdb002c...ccabc09)
#### `Storage`: new command
* [`Storage.getUsageAndQuota`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-getUsageAndQuota)


## Roll protocol to r480007
###### _2017-06-16 03:15:26_
Diff: [34511ab...cdb002c](https://github.com/ChromeDevTools/devtools-protocol/compare/34511ab...cdb002c)
#### `Network`: modified command
* [`Network.continueInterceptedRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-continueInterceptedRequest)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted)
#### `Network`: new types
* [`Network.AuthChallenge`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-AuthChallenge)
* [`Network.AuthChallengeResponse`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-AuthChallengeResponse)


## Roll protocol to r479728
###### _2017-06-15 09:15:20_
Diff: [0fa531a...34511ab](https://github.com/ChromeDevTools/devtools-protocol/compare/0fa531a...34511ab)
#### `CSS`: removed command
* [`CSS.getLayoutTreeAndStyles`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getLayoutTreeAndStyles)
#### `CSS`: removed types
* [`CSS.LayoutTreeNode`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-LayoutTreeNode)
* [`CSS.ComputedStyle`](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#type-ComputedStyle)


## Roll protocol to r479333
###### _2017-06-14 02:15:15_
Diff: [d21a0f2...0fa531a](https://github.com/ChromeDevTools/devtools-protocol/compare/d21a0f2...0fa531a)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted)


## Roll protocol to r479198
###### _2017-06-13 16:15:25_
Diff: [0dc9f1b...d21a0f2](https://github.com/ChromeDevTools/devtools-protocol/compare/0dc9f1b...d21a0f2)
#### `Network`: modified type
* [`Network.Request`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Request)


## Roll protocol to r478853
###### _2017-06-12 18:15:17_
Diff: [17022a7...0dc9f1b](https://github.com/ChromeDevTools/devtools-protocol/compare/17022a7...0dc9f1b)
#### `Runtime`: modified event
* [`Runtime.consoleAPICalled`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-consoleAPICalled)


## Roll protocol to r478813
###### _2017-06-12 16:15:23_
Diff: [abcbcb5...17022a7](https://github.com/ChromeDevTools/devtools-protocol/compare/abcbcb5...17022a7)
#### `CacheStorage`: modified type
* [`CacheStorage.DataEntry`](https://chromedevtools.github.io/devtools-protocol/tot/CacheStorage/#type-DataEntry)


## Roll protocol to r478513
###### _2017-06-10 03:15:26_
Diff: [3ac23d7...abcbcb5](https://github.com/ChromeDevTools/devtools-protocol/compare/3ac23d7...abcbcb5)
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
###### _2017-06-07 04:15:16_
Diff: [ffd3dba...3ac23d7](https://github.com/ChromeDevTools/devtools-protocol/compare/ffd3dba...3ac23d7)
#### `Network`: modified event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted)


## Roll protocol to r477501
###### _2017-06-06 18:15:18_
Diff: [579f232...ffd3dba](https://github.com/ChromeDevTools/devtools-protocol/compare/579f232...ffd3dba)
#### `Storage`: removed command
* [`Storage.getUsageAndQuota`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-getUsageAndQuota)
#### `Storage`: removed type
* [`Storage.QuotaAndUsage`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#type-QuotaAndUsage)


## Roll protocol to r477431
###### _2017-06-06 15:15:24_
Diff: [6d50df6...579f232](https://github.com/ChromeDevTools/devtools-protocol/compare/6d50df6...579f232)
#### `Storage`: new command
* [`Storage.getUsageAndQuota`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#method-getUsageAndQuota)
#### `Storage`: new type
* [`Storage.QuotaAndUsage`](https://chromedevtools.github.io/devtools-protocol/tot/Storage/#type-QuotaAndUsage)


## Roll protocol to r476654
###### _2017-06-02 08:15:15_
Diff: [5f36401...b0a59a9](https://github.com/ChromeDevTools/devtools-protocol/compare/5f36401...b0a59a9)
#### `Network`: new commands
* [`Network.enableRequestInterception`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-enableRequestInterception)
* [`Network.continueInterceptedRequest`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-continueInterceptedRequest)
#### `Network`: new event
* [`Network.requestIntercepted`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#event-requestIntercepted)
#### `Network`: new types
* [`Network.InterceptionId`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-InterceptionId)
* [`Network.ErrorReason`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-ErrorReason)


## Roll protocol to r474209
###### _2017-05-24 01:15:13_
Diff: [408d0e6...f492fba](https://github.com/ChromeDevTools/devtools-protocol/compare/408d0e6...f492fba)
#### `Page`: modified command
* [`Page.captureScreenshot`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot)


## Roll protocol to r474080
###### _2017-05-23 15:15:33_
Diff: [bb2b187...eca5adc](https://github.com/ChromeDevTools/devtools-protocol/compare/bb2b187...eca5adc)
#### `Input`: new command
* [`Input.setIgnoreInputEvents`](https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-setIgnoreInputEvents)


## Roll protocol to r474054 466964
###### _2017-05-23 14:15:15_
Diff: [e599527...bb2b187](https://github.com/ChromeDevTools/devtools-protocol/compare/e599527...bb2b187)
#### `Page`: modified command
* [`Page.navigate`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-navigate)
#### `Page`: new type
* [`Page.TransitionType`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-TransitionType)
#### `Page`: modified type
* [`Page.NavigationEntry`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-NavigationEntry)


## Roll protocol to r472421
###### _2017-05-17 04:15:14_
Diff: [c7253c2...e599527](https://github.com/ChromeDevTools/devtools-protocol/compare/c7253c2...e599527)
#### `SystemInfo`: modified command
* [`SystemInfo.getInfo`](https://chromedevtools.github.io/devtools-protocol/tot/SystemInfo/#method-getInfo)


## Roll protocol to r472381
###### _2017-05-17 01:15:16_
Diff: [42e9444...c7253c2](https://github.com/ChromeDevTools/devtools-protocol/compare/42e9444...c7253c2)
#### `Debugger`: modified command
* [`Debugger.continueToLocation`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-continueToLocation)


## Roll protocol to r470873
###### _2017-05-11 01:15:18_
Diff: [a03b9bf...42e9444](https://github.com/ChromeDevTools/devtools-protocol/compare/a03b9bf...42e9444)
#### `Page`: new command
* [`Page.createIsolatedWorld`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-createIsolatedWorld)


## Roll protocol to r470190
###### _2017-05-08 21:15:15_
Diff: [7060d50...a03b9bf](https://github.com/ChromeDevTools/devtools-protocol/compare/7060d50...a03b9bf)
#### `Page`: modified command
* [`Page.printToPDF`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF)


## Roll protocol to r467326
###### _2017-04-26 08:15:16_
Diff: [d7b68bb...c656485](https://github.com/ChromeDevTools/devtools-protocol/compare/d7b68bb...c656485)
#### `Runtime`: modified event
* [`Runtime.executionContextCreated`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-executionContextCreated)
#### `Debugger`: modified command
* [`Debugger.getPossibleBreakpoints`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getPossibleBreakpoints)
#### `Profiler`: modified event
* [`Profiler.consoleProfileStarted`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#event-consoleProfileStarted)
#### `HeapProfiler`: modified event
* [`HeapProfiler.lastSeenObjectId`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#event-lastSeenObjectId)


## Roll protocol to r467252
###### _2017-04-25 23:15:14_
Diff: [94e4a6a...d7b68bb](https://github.com/ChromeDevTools/devtools-protocol/compare/94e4a6a...d7b68bb)
#### `Runtime`: modified event
* [`Runtime.executionContextCreated`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-executionContextCreated)
#### `Debugger`: modified command
* [`Debugger.getPossibleBreakpoints`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getPossibleBreakpoints)
#### `Profiler`: modified event
* [`Profiler.consoleProfileStarted`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#event-consoleProfileStarted)
#### `HeapProfiler`: modified event
* [`HeapProfiler.lastSeenObjectId`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#event-lastSeenObjectId)


## Roll protocol to r466832
###### _2017-04-24 17:15:24_
Diff: [95a5c47...94e4a6a](https://github.com/ChromeDevTools/devtools-protocol/compare/95a5c47...94e4a6a)
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
* [`DOM.highlightRect`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightRect)
* [`DOM.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightNode)
* [`DOM.hideHighlight`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-hideHighlight)
#### `DOM`: removed events
* [`DOM.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-inspectNodeRequested)
* [`DOM.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-nodeHighlightRequested)
#### `DOM`: removed types
* [`DOM.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-HighlightConfig)
* [`DOM.InspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-InspectMode)


## Roll protocol to r466815
###### _2017-04-24 16:15:14_
Diff: [e5adaae...95a5c47](https://github.com/ChromeDevTools/devtools-protocol/compare/e5adaae...95a5c47)
#### `Runtime`: modified event
* [`Runtime.executionContextCreated`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#event-executionContextCreated)
#### `Debugger`: modified command
* [`Debugger.getPossibleBreakpoints`](https://chromedevtools.github.io/devtools-protocol/tot/Debugger/#method-getPossibleBreakpoints)
#### `Profiler`: modified event
* [`Profiler.consoleProfileStarted`](https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#event-consoleProfileStarted)
#### `HeapProfiler`: modified event
* [`HeapProfiler.lastSeenObjectId`](https://chromedevtools.github.io/devtools-protocol/tot/HeapProfiler/#event-lastSeenObjectId)


## Roll protocol to r466559
###### _2017-04-23 00:15:13_
Diff: [6653c3f...e5adaae](https://github.com/ChromeDevTools/devtools-protocol/compare/6653c3f...e5adaae)
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
* [`DOM.highlightRect`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightRect)
* [`DOM.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightNode)
* [`DOM.hideHighlight`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-hideHighlight)
#### `DOM`: new events
* [`DOM.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-inspectNodeRequested)
* [`DOM.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-nodeHighlightRequested)
#### `DOM`: new types
* [`DOM.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-HighlightConfig)
* [`DOM.InspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-InspectMode)


## Roll protocol to r466506
###### _2017-04-21 17:15:18_
Diff: [afbaab8...495acc6](https://github.com/ChromeDevTools/devtools-protocol/compare/afbaab8...495acc6)
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
* [`DOM.highlightRect`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightRect)
* [`DOM.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightNode)
* [`DOM.hideHighlight`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-hideHighlight)
#### `DOM`: removed events
* [`DOM.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-inspectNodeRequested)
* [`DOM.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-nodeHighlightRequested)
#### `DOM`: removed types
* [`DOM.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-HighlightConfig)
* [`DOM.InspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-InspectMode)


## Roll protocol to r465861
###### _2017-04-19 19:15:14_
Diff: [3dd613f...2621a84](https://github.com/ChromeDevTools/devtools-protocol/compare/3dd613f...2621a84)
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
* [`DOM.highlightRect`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightRect)
* [`DOM.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightNode)
* [`DOM.hideHighlight`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-hideHighlight)
#### `DOM`: new events
* [`DOM.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-inspectNodeRequested)
* [`DOM.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-nodeHighlightRequested)
#### `DOM`: new types
* [`DOM.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-HighlightConfig)
* [`DOM.InspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-InspectMode)


## Roll protocol to r465817
###### _2017-04-19 17:15:19_
Diff: [af95ade...3dd613f](https://github.com/ChromeDevTools/devtools-protocol/compare/af95ade...3dd613f)
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
* [`DOM.highlightRect`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightRect)
* [`DOM.highlightNode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-highlightNode)
* [`DOM.hideHighlight`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#method-hideHighlight)
#### `DOM`: removed events
* [`DOM.inspectNodeRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-inspectNodeRequested)
* [`DOM.nodeHighlightRequested`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#event-nodeHighlightRequested)
#### `DOM`: removed types
* [`DOM.HighlightConfig`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-HighlightConfig)
* [`DOM.InspectMode`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-InspectMode)


## Roll protocol to r464996
###### _2017-04-17 13:15:14_
Diff: [b37b8df...af95ade](https://github.com/ChromeDevTools/devtools-protocol/compare/b37b8df...af95ade)
#### `Page`: removed command
* [`Page.setColorPickerEnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setColorPickerEnabled)
#### `Page`: removed event
* [`Page.colorPicked`](https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-colorPicked)


## Roll protocol to r464752
###### _2017-04-14 11:15:26_
Diff: [a087d6e...b37b8df](https://github.com/ChromeDevTools/devtools-protocol/compare/a087d6e...b37b8df)
#### `Network`: removed command
* [`Network.setMonitoringXHREnabled`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setMonitoringXHREnabled)


## Roll protocol to r464268
###### _2017-04-12 20:15:15_
Diff: [389442a...a087d6e](https://github.com/ChromeDevTools/devtools-protocol/compare/389442a...a087d6e)
#### `Browser`: new domain
* [`Browser.Browser`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#domain-Browser)
#### `Target`: modified command
* [`Target.sendMessageToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-sendMessageToTarget)
#### `Browser`: new commands
* [`Browser.getWindowForTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowForTarget)
* [`Browser.setWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-setWindowBounds)
* [`Browser.getWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowBounds)
#### `Browser`: new types
* [`Browser.WindowID`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-WindowID)
* [`Browser.WindowState`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-WindowState)
* [`Browser.Bounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-Bounds)


## Roll protocol to r463392
###### _2017-04-10 14:16:03_
Diff: [bced713...6839ff5](https://github.com/ChromeDevTools/devtools-protocol/compare/bced713...6839ff5)
#### `Browser`: removed domain
* [`Browser.Browser`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#domain-Browser)
#### `Target`: modified command
* [`Target.sendMessageToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-sendMessageToTarget)


## Roll protocol to r463120
###### _2017-04-07 20:15:13_
Diff: [e6757c1...bced713](https://github.com/ChromeDevTools/devtools-protocol/compare/e6757c1...bced713)
#### `Browser`: new domain
* [`Browser.Browser`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#domain-Browser)
#### `Target`: modified command
* [`Target.sendMessageToTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-sendMessageToTarget)
#### `Browser`: new commands
* [`Browser.getWindowForTarget`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowForTarget)
* [`Browser.setWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-setWindowBounds)
* [`Browser.getWindowBounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#method-getWindowBounds)
#### `Browser`: new types
* [`Browser.WindowID`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-WindowID)
* [`Browser.WindowState`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-WindowState)
* [`Browser.Bounds`](https://chromedevtools.github.io/devtools-protocol/tot/Browser/#type-Bounds)


## Roll protocol to r460846
###### _2017-03-30 12:15:27_
Diff: [bb10d9a...07e8fce](https://github.com/ChromeDevTools/devtools-protocol/compare/bb10d9a...07e8fce)
#### `Network`: modified command
* [`Network.setBlockedURLs`](https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-setBlockedURLs)
