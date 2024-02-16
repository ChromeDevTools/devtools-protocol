

## Roll protocol to r938446 — _2021-11-04T20:15:28.000Z_
######  Diff: [`e73ddb9...0fe9d20`](https://github.com/ChromeDevTools/devtools-protocol/compare/e73ddb9...0fe9d20)

```diff
@@ browser_protocol.pdl:4784 @@ domain Network
       string logDescription
       # Log ID.
       string logId
-      # Issuance date.
-      TimeSinceEpoch timestamp
+      # Issuance date. Unlike TimeSinceEpoch, this contains the number of
+      # milliseconds since January 1, 1970, UTC, not the number of seconds.
+      number timestamp
       # Hash algorithm.
       string hashAlgorithm
       # Signature algorithm.
```

## Roll protocol to r937139 — _2021-11-02T00:15:24.000Z_
######  Diff: [`23061aa...e73ddb9`](https://github.com/ChromeDevTools/devtools-protocol/compare/23061aa...e73ddb9)

```diff
@@ browser_protocol.pdl:723 @@ experimental domain Audits
       # around January 2022. Please use Web Storage or Indexed Database
       # instead. This standard was abandoned in January, 1970. See
       # https://www.chromestatus.com/feature/5684870116278272 for more details."
-      optional string message
+      deprecated optional string message
 
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
```

## Roll protocol to r937072 — _2021-11-01T22:15:26.000Z_
######  Diff: [`3a36442...23061aa`](https://github.com/ChromeDevTools/devtools-protocol/compare/3a36442...23061aa)

```diff
@@ browser_protocol.pdl:2842 @@ domain DOMDebugger
       # Resource URL substring. All XHRs having this substring in the URL will get stopped upon.
       string url
 
+# EventBreakpoints permits setting breakpoints on particular operations and
+# events in targets that run JavaScript but do not have a DOM.
+# JavaScript execution will stop on these operations as if there was a regular
+# breakpoint set.
+experimental domain EventBreakpoints
+  # Sets breakpoint on particular native event.
+  command setInstrumentationBreakpoint
+    parameters
+      # Instrumentation name to stop on.
+      string eventName
+
+  # Removes breakpoint on particular native event.
+  command removeInstrumentationBreakpoint
+    parameters
+      # Instrumentation name to stop on.
+      string eventName
+
 # This domain facilitates obtaining document snapshots with DOM, layout, and style information.
 experimental domain DOMSnapshot
   depends on CSS
```

## Roll protocol to r937044 — _2021-11-01T21:15:26.000Z_
######  Diff: [`bc8fa61...3a36442`](https://github.com/ChromeDevTools/devtools-protocol/compare/bc8fa61...3a36442)

```diff
@@ browser_protocol.pdl:709 @@ experimental domain Audits
       GenericIssueErrorType errorType
       optional Page.FrameId frameId
 
+  # This issue tracks information needed to print a deprecation message.
+  # The formatting is inherited from the old console.log version, see more at:
+  # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/deprecation.cc
+  # TODO(crbug.com/1264960): Re-work format to add i18n support per:
+  # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/public/devtools_protocol/README.md
+  type DeprecationIssueDetails extends object
+    properties
+      optional AffectedFrame affectedFrame
+      SourceCodeLocation sourceCodeLocation
+      # The content of the deprecation issue (this won't be translated),
+      # e.g. "window.inefficientLegacyStorageMethod will be removed in M97,
+      # around January 2022. Please use Web Storage or Indexed Database
+      # instead. This standard was abandoned in January, 1970. See
+      # https://www.chromestatus.com/feature/5684870116278272 for more details."
+      optional string message
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -728,6 +744,7 @@ experimental domain Audits
       NavigatorUserAgentIssue
       WasmCrossOriginModuleSharingIssue
       GenericIssue
+      DeprecationIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -748,6 +765,7 @@ experimental domain Audits
       optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
       optional WasmCrossOriginModuleSharingIssueDetails wasmCrossOriginModuleSharingIssue
       optional GenericIssueDetails genericIssueDetails
+      optional DeprecationIssueDetails deprecationIssueDetails
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
```

## Roll protocol to r933220 — _2021-10-19T23:15:31.000Z_
######  Diff: [`ed35fe7...df7c5a3`](https://github.com/ChromeDevTools/devtools-protocol/compare/ed35fe7...df7c5a3)

```diff
@@ browser_protocol.pdl:5729 @@ domain Network
       TimeSinceEpoch wallTime
       # Request initiator.
       Initiator initiator
+      # In the case that redirectResponse is populated, this flag indicates whether
+      # requestWillBeSentExtraInfo and responseReceivedExtraInfo events will be or were emitted
+      # for the request which was just redirected.
+      experimental boolean redirectHasExtraInfo
       # Redirect response data.
       optional Response redirectResponse
       # Type of this resource.
@@ -5769,6 +5773,9 @@ domain Network
       ResourceType type
       # Response data.
       Response response
+      # Indicates whether requestWillBeSentExtraInfo and responseReceivedExtraInfo events will be
+      # or were emitted for this request.
+      experimental boolean hasExtraInfo
       # Frame identifier.
       optional Page.FrameId frameId
```

## Roll protocol to r932485 — _2021-10-18T12:15:24.000Z_
######  Diff: [`204c97a...ed35fe7`](https://github.com/ChromeDevTools/devtools-protocol/compare/204c97a...ed35fe7)

```diff
@@ browser_protocol.pdl:7907 @@ domain Page
       ContentWebUSB
       ContentMediaSession
       ContentMediaSessionService
-      ContentMediaPlay
 
       # See components/back_forward_cache/back_forward_cache_disable.h for explanations.
       EmbedderPopupBlockerTabHelper
```

## Roll protocol to r931720 — _2021-10-14T22:15:25.000Z_
######  Diff: [`5095a49...204c97a`](https://github.com/ChromeDevTools/devtools-protocol/compare/5095a49...204c97a)

```diff
@@ browser_protocol.pdl:8829 @@ domain Target
       # Frame height in DIP (headless chrome only).
       optional integer height
       # The browser context to create the page in.
-      optional Browser.BrowserContextID browserContextId
+      experimental optional Browser.BrowserContextID browserContextId
       # Whether BeginFrames for this target will be controlled via DevTools (headless chrome only,
       # not supported on MacOS yet, false by default).
       experimental optional boolean enableBeginFrameControl
```

## Roll protocol to r931360 — _2021-10-14T03:15:26.000Z_
######  Diff: [`8bbdba3...5095a49`](https://github.com/ChromeDevTools/devtools-protocol/compare/8bbdba3...5095a49)

```diff
@@ browser_protocol.pdl:6720 @@ domain Page
       hid
       idle-detection
       interest-cohort
+      keyboard-map
       magnetometer
       microphone
       midi
```

## Roll protocol to r931234 — _2021-10-13T21:15:26.000Z_
######  Diff: [`76bd05b...8bbdba3`](https://github.com/ChromeDevTools/devtools-protocol/compare/76bd05b...8bbdba3)

```diff
@@ browser_protocol.pdl:579 @@ experimental domain Audits
       kURLViolation
       kTrustedTypesSinkViolation
       kTrustedTypesPolicyViolation
+      kWasmEvalViolation
 
   type SourceCodeLocation extends object
     properties
```

## Roll protocol to r931171 — _2021-10-13T19:15:29.000Z_
######  Diff: [`35e6406...76bd05b`](https://github.com/ChromeDevTools/devtools-protocol/compare/35e6406...76bd05b)

```diff
@@ browser_protocol.pdl:48 @@ experimental domain Accessibility
   # Enum of possible native property sources (as a subtype of a particular AXValueSourceType).
   type AXValueNativeSourceType extends string
     enum
+      description
       figcaption
       label
       labelfor
```

## Roll protocol to r930289 — _2021-10-11T21:15:33.000Z_
######  Diff: [`5f55be2...35e6406`](https://github.com/ChromeDevTools/devtools-protocol/compare/5f55be2...35e6406)

```diff
@@ browser_protocol.pdl:7578 @@ domain Page
   # Stops sending each frame in the `screencastFrame`.
   experimental command stopScreencast
 
-  # Forces compilation cache to be generated for every subresource script.
-  # See also: `Page.produceCompilationCache`.
-  experimental command setProduceCompilationCache
-    parameters
-      boolean enabled
-
   # Requests backend to produce compilation cache for the specified scripts.
-  # Unlike setProduceCompilationCache, this allows client to only produce cache
-  # for specific scripts. `scripts` are appeneded to the list of scripts
-  # for which the cache for would produced. Disabling compilation cache with
-  # `setProduceCompilationCache` would reset all pending cache requests.
-  # The list may also be reset during page navigation.
+  # `scripts` are appeneded to the list of scripts for which the cache
+  # would be produced. The list may be reset during page navigation.
   # When script with a matching URL is encountered, the cache is optionally
   # produced upon backend discretion, based on internal heuristics.
   # See also: `Page.compilationCacheProduced`.
```

## Roll protocol to r928170 — _2021-10-05T16:15:26.000Z_
######  Diff: [`6d3ed49...5f55be2`](https://github.com/ChromeDevTools/devtools-protocol/compare/6d3ed49...5f55be2)

```diff
@@ browser_protocol.pdl:4836 @@ domain Network
       MethodDisallowedByPreflightResponse
       HeaderDisallowedByPreflightResponse
       RedirectContainsCredentials
+      # Request was a private network request initiated by a non-secure context.
       InsecurePrivateNetwork
+      # Request carried a target IP address space property that did not match
+      # the target resource's address space.
       InvalidPrivateNetworkAccess
+      # Request was a private network request yet did not carry a target IP
+      # address space.
+      UnexpectedPrivateNetworkAccess
       NoCorsRedirectModeNotFollow
 
   type CorsErrorStatus extends object
@@ -5867,6 +5873,8 @@ domain Network
       Allow
       BlockFromInsecureToMorePrivate
       WarnFromInsecureToMorePrivate
+      PreflightBlock
+      PreflightWarn
 
   experimental type IPAddressSpace extends string
     enum
```

## Roll protocol to r927854 — _2021-10-04T22:15:31.000Z_
######  Diff: [`d24ecc6...6d3ed49`](https://github.com/ChromeDevTools/devtools-protocol/compare/d24ecc6...6d3ed49)

```diff
@@ browser_protocol.pdl:408 @@ experimental domain Animation
       # Animation that was started.
       Animation animation
 
-# The domain is deprecated as AppCache is being removed (see crbug.com/582750).
-experimental deprecated domain ApplicationCache
-  depends on Page
-
-  # Detailed application cache resource information.
-  type ApplicationCacheResource extends object
-    properties
-      # Resource url.
-      string url
-      # Resource size.
-      integer size
-      # Resource type.
-      string type
-
-  # Detailed application cache information.
-  type ApplicationCache extends object
-    properties
-      # Manifest URL.
-      string manifestURL
-      # Application cache size.
-      number size
-      # Application cache creation time.
-      number creationTime
-      # Application cache update time.
-      number updateTime
-      # Application cache resources.
-      array of ApplicationCacheResource resources
-
-  # Frame identifier - manifest URL pair.
-  type FrameWithManifest extends object
-    properties
-      # Frame identifier.
-      Page.FrameId frameId
-      # Manifest URL.
-      string manifestURL
-      # Application cache status.
-      integer status
-
-  # Enables application cache domain notifications.
-  command enable
-
-  # Returns relevant application cache data for the document in given frame.
-  command getApplicationCacheForFrame
-    parameters
-      # Identifier of the frame containing document whose application cache is retrieved.
-      Page.FrameId frameId
-    returns
-      # Relevant application cache data for the document in given frame.
-      ApplicationCache applicationCache
-
-  # Returns array of frame identifiers with manifest urls for each frame containing a document
-  # associated with some application cache.
-  command getFramesWithManifests
-    returns
-      # Array of frame identifiers with manifest urls for each frame containing a document
-      # associated with some application cache.
-      array of FrameWithManifest frameIds
-
-  # Returns manifest URL for document in the given frame.
-  command getManifestForFrame
-    parameters
-      # Identifier of the frame containing document whose manifest is retrieved.
-      Page.FrameId frameId
-    returns
-      # Manifest URL for document in the given frame.
-      string manifestURL
-
-  event applicationCacheStatusUpdated
-    parameters
-      # Identifier of the frame containing document whose application cache updated status.
-      Page.FrameId frameId
-      # Manifest URL.
-      string manifestURL
-      # Updated application cache status.
-      integer status
-
-  event networkStateUpdated
-    parameters
-      boolean isNowOnline
-
 # Audits domain allows investigation of page violations and possible improvements.
 experimental domain Audits
   depends on Network
```

## Roll protocol to r927104 — _2021-10-01T05:15:28.000Z_
######  Diff: [`75edf97...d24ecc6`](https://github.com/ChromeDevTools/devtools-protocol/compare/75edf97...d24ecc6)

```diff
@@ browser_protocol.pdl:408 @@ experimental domain Animation
       # Animation that was started.
       Animation animation
 
+# The domain is deprecated as AppCache is being removed (see crbug.com/582750).
+experimental deprecated domain ApplicationCache
+  depends on Page
+
+  # Detailed application cache resource information.
+  type ApplicationCacheResource extends object
+    properties
+      # Resource url.
+      string url
+      # Resource size.
+      integer size
+      # Resource type.
+      string type
+
+  # Detailed application cache information.
+  type ApplicationCache extends object
+    properties
+      # Manifest URL.
+      string manifestURL
+      # Application cache size.
+      number size
+      # Application cache creation time.
+      number creationTime
+      # Application cache update time.
+      number updateTime
+      # Application cache resources.
+      array of ApplicationCacheResource resources
+
+  # Frame identifier - manifest URL pair.
+  type FrameWithManifest extends object
+    properties
+      # Frame identifier.
+      Page.FrameId frameId
+      # Manifest URL.
+      string manifestURL
+      # Application cache status.
+      integer status
+
+  # Enables application cache domain notifications.
+  command enable
+
+  # Returns relevant application cache data for the document in given frame.
+  command getApplicationCacheForFrame
+    parameters
+      # Identifier of the frame containing document whose application cache is retrieved.
+      Page.FrameId frameId
+    returns
+      # Relevant application cache data for the document in given frame.
+      ApplicationCache applicationCache
+
+  # Returns array of frame identifiers with manifest urls for each frame containing a document
+  # associated with some application cache.
+  command getFramesWithManifests
+    returns
+      # Array of frame identifiers with manifest urls for each frame containing a document
+      # associated with some application cache.
+      array of FrameWithManifest frameIds
+
+  # Returns manifest URL for document in the given frame.
+  command getManifestForFrame
+    parameters
+      # Identifier of the frame containing document whose manifest is retrieved.
+      Page.FrameId frameId
+    returns
+      # Manifest URL for document in the given frame.
+      string manifestURL
+
+  event applicationCacheStatusUpdated
+    parameters
+      # Identifier of the frame containing document whose application cache updated status.
+      Page.FrameId frameId
+      # Manifest URL.
+      string manifestURL
+      # Updated application cache status.
+      integer status
+
+  event networkStateUpdated
+    parameters
+      boolean isNowOnline
+
 # Audits domain allows investigation of page violations and possible improvements.
 experimental domain Audits
   depends on Network
```

## Roll protocol to r927069 — _2021-10-01T02:15:27.000Z_
######  Diff: [`6b5fb3f...75edf97`](https://github.com/ChromeDevTools/devtools-protocol/compare/6b5fb3f...75edf97)

```diff
@@ browser_protocol.pdl:408 @@ experimental domain Animation
       # Animation that was started.
       Animation animation
 
-# The domain is deprecated as AppCache is being removed (see crbug.com/582750).
-experimental deprecated domain ApplicationCache
-  depends on Page
-
-  # Detailed application cache resource information.
-  type ApplicationCacheResource extends object
-    properties
-      # Resource url.
-      string url
-      # Resource size.
-      integer size
-      # Resource type.
-      string type
-
-  # Detailed application cache information.
-  type ApplicationCache extends object
-    properties
-      # Manifest URL.
-      string manifestURL
-      # Application cache size.
-      number size
-      # Application cache creation time.
-      number creationTime
-      # Application cache update time.
-      number updateTime
-      # Application cache resources.
-      array of ApplicationCacheResource resources
-
-  # Frame identifier - manifest URL pair.
-  type FrameWithManifest extends object
-    properties
-      # Frame identifier.
-      Page.FrameId frameId
-      # Manifest URL.
-      string manifestURL
-      # Application cache status.
-      integer status
-
-  # Enables application cache domain notifications.
-  command enable
-
-  # Returns relevant application cache data for the document in given frame.
-  command getApplicationCacheForFrame
-    parameters
-      # Identifier of the frame containing document whose application cache is retrieved.
-      Page.FrameId frameId
-    returns
-      # Relevant application cache data for the document in given frame.
-      ApplicationCache applicationCache
-
-  # Returns array of frame identifiers with manifest urls for each frame containing a document
-  # associated with some application cache.
-  command getFramesWithManifests
-    returns
-      # Array of frame identifiers with manifest urls for each frame containing a document
-      # associated with some application cache.
-      array of FrameWithManifest frameIds
-
-  # Returns manifest URL for document in the given frame.
-  command getManifestForFrame
-    parameters
-      # Identifier of the frame containing document whose manifest is retrieved.
-      Page.FrameId frameId
-    returns
-      # Manifest URL for document in the given frame.
-      string manifestURL
-
-  event applicationCacheStatusUpdated
-    parameters
-      # Identifier of the frame containing document whose application cache updated status.
-      Page.FrameId frameId
-      # Manifest URL.
-      string manifestURL
-      # Updated application cache status.
-      integer status
-
-  event networkStateUpdated
-    parameters
-      boolean isNowOnline
-
 # Audits domain allows investigation of page violations and possible improvements.
 experimental domain Audits
   depends on Network
```

## Roll protocol to r926768 — _2021-09-30T15:28:28.000Z_
######  Diff: [`2f92c4d...6b5fb3f`](https://github.com/ChromeDevTools/devtools-protocol/compare/2f92c4d...6b5fb3f)

```diff
@@ js_protocol.pdl:175 @@ domain Debugger
   command enable
     parameters
       # The maximum size in bytes of collected scripts (not referenced by other heap objects)
-      # the debugger can hold. Puts no limit if paramter is omitted.
+      # the debugger can hold. Puts no limit if parameter is omitted.
       experimental optional number maxScriptsCacheSize
     returns
       # Unique identifier of the debugger.
@@ -267,7 +267,7 @@ domain Debugger
       BreakpointId breakpointId
 
   # Restarts particular call frame from the beginning.
-  command restartFrame
+  deprecated command restartFrame
     parameters
       # Call frame identifier to evaluate on.
       CallFrameId callFrameId
@@ -707,13 +707,17 @@ experimental domain HeapProfiler
       # when the tracking is stopped.
       optional boolean reportProgress
       optional boolean treatGlobalObjectsAsRoots
+      # If true, numerical values are included in the snapshot
+      optional boolean captureNumericValue
 
   command takeHeapSnapshot
     parameters
       # If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.
       optional boolean reportProgress
-      # If true, a raw snapshot without artifical roots will be generated
+      # If true, a raw snapshot without artificial roots will be generated
       optional boolean treatGlobalObjectsAsRoots
+      # If true, numerical values are included in the snapshot
+      optional boolean captureNumericValue
 
   event addHeapSnapshotChunk
     parameters
@@ -841,24 +845,6 @@ domain Profiler
       # Type profile entries for parameters and return values of the functions in the script.
       array of TypeProfileEntry entries
 
-  # Collected counter information.
-  experimental type CounterInfo extends object
-    properties
-      # Counter name.
-      string name
-      # Counter value.
-      integer value
-
-  # Runtime call counter information.
-  experimental type RuntimeCallCounterInfo extends object
-    properties
-      # Counter name.
-      string name
-      # Counter value.
-      number value
-      # Counter time in seconds.
-      number time
-
   command disable
 
   command enable
@@ -923,30 +909,6 @@ domain Profiler
       # Type profile for all scripts since startTypeProfile() was turned on.
       array of ScriptTypeProfile result
 
-  # Enable counters collection.
-  experimental command enableCounters
-
-  # Disable counters collection.
-  experimental command disableCounters
-
-  # Retrieve counters.
-  experimental command getCounters
-    returns
-      # Collected counters information.
-      array of CounterInfo result
-
-  # Enable run time call stats collection.
-  experimental command enableRuntimeCallStats
-
-  # Disable run time call stats collection.
-  experimental command disableRuntimeCallStats
-
-  # Retrieve run time call stats.
-  experimental command getRuntimeCallStats
-    returns
-      # Collected runtime call counter information.
-      array of RuntimeCallCounterInfo result
-
   event consoleProfileFinished
     parameters
       string id
@@ -968,13 +930,13 @@ domain Profiler
   # Reports coverage delta since the last poll (either from an event like this, or from
   # `takePreciseCoverage` for the current isolate. May only be sent if precise code
   # coverage has been started. This event can be trigged by the embedder to, for example,
-  # trigger collection of coverage data immediatelly at a certain point in time.
+  # trigger collection of coverage data immediately at a certain point in time.
   experimental event preciseCoverageDeltaUpdate
     parameters
       # Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
       number timestamp
       # Identifier for distinguishing coverage events.
-      string occassion
+      string occasion
       # Coverage data for the current isolate.
       array of ScriptCoverage result
 
@@ -1221,7 +1183,7 @@ domain Runtime
       string origin
       # Human readable name describing given context.
       string name
-      # A system-unique execution context identifier. Unlike the id, this is unique accross
+      # A system-unique execution context identifier. Unlike the id, this is unique across
       # multiple processes, so can be reliably used to identify specific context while backend
       # performs a cross-process navigation.
       experimental string uniqueId
@@ -1250,6 +1212,10 @@ domain Runtime
       optional RemoteObject exception
       # Identifier of the context where exception happened.
       optional ExecutionContextId executionContextId
+      # Dictionary with entries of meta data that the client associated
+      # with this exception, such as information about associated network
+      # requests, etc.
+      experimental optional object exceptionMetaData
 
   # Number of milliseconds since epoch.
   type Timestamp extends number
@@ -1339,6 +1305,8 @@ domain Runtime
       # Symbolic group name that can be used to release multiple objects. If objectGroup is not
       # specified and objectId is, objectGroup will be inherited from object.
       optional string objectGroup
+      # Whether to throw an exception if side effect cannot be ruled out during evaluation.
+      experimental optional boolean throwOnSideEffect
     returns
       # Call result.
       RemoteObject result
@@ -1418,9 +1386,9 @@ domain Runtime
       # evaluation and allows unsafe-eval. Defaults to true.
       experimental optional boolean allowUnsafeEvalBlockedByCSP
       # An alternative way to specify the execution context to evaluate in.
-      # Compared to contextId that may be reused accross processes, this is guaranteed to be
+      # Compared to contextId that may be reused across processes, this is guaranteed to be
       # system-unique, so it can be used to prevent accidental evaluation of the expression
-      # in context different than intended (e.g. as a result of navigation accross process
+      # in context different than intended (e.g. as a result of navigation across process
       # boundaries).
       # This is mutually exclusive with `contextId`.
       experimental optional string uniqueContextId
@@ -1459,6 +1427,8 @@ domain Runtime
       experimental optional boolean accessorPropertiesOnly
       # Whether preview should be generated for the results.
       experimental optional boolean generatePreview
+      # If true, returns non-indexed properties only.
+      experimental optional boolean nonIndexedPropertiesOnly
     returns
       # Object properties.
       array of PropertyDescriptor result
@@ -1563,7 +1533,10 @@ domain Runtime
       # execution context. If omitted and `executionContextName` is not set,
       # the binding is exposed to all execution contexts of the target.
       # This parameter is mutually exclusive with `executionContextName`.
-      optional ExecutionContextId executionContextId
+      # Deprecated in favor of `executionContextName` due to an unclear use case
+      # and bugs in implementation (crbug.com/1169639). `executionContextId` will be
+      # removed in the future.
+      deprecated optional ExecutionContextId executionContextId
       # If specified, the binding is exposed to the executionContext with
       # matching name, even for contexts created after the binding is added.
       # See also `ExecutionContext.name` and `worldName` parameter to
@@ -1659,6 +1632,8 @@ domain Runtime
     parameters
       RemoteObject object
       object hints
+      # Identifier of the context where the call was made.
+      experimental optional ExecutionContextId executionContextId
 
 # This domain is deprecated.
 deprecated domain Schema
```

## Roll protocol to r926580 — _2021-09-30T04:15:20.000Z_
######  Diff: [`5cc536e...2f92c4d`](https://github.com/ChromeDevTools/devtools-protocol/compare/5cc536e...2f92c4d)

```diff
@@ browser_protocol.pdl:408 @@ experimental domain Animation
       # Animation that was started.
       Animation animation
 
+# The domain is deprecated as AppCache is being removed (see crbug.com/582750).
+experimental deprecated domain ApplicationCache
+  depends on Page
+
+  # Detailed application cache resource information.
+  type ApplicationCacheResource extends object
+    properties
+      # Resource url.
+      string url
+      # Resource size.
+      integer size
+      # Resource type.
+      string type
+
+  # Detailed application cache information.
+  type ApplicationCache extends object
+    properties
+      # Manifest URL.
+      string manifestURL
+      # Application cache size.
+      number size
+      # Application cache creation time.
+      number creationTime
+      # Application cache update time.
+      number updateTime
+      # Application cache resources.
+      array of ApplicationCacheResource resources
+
+  # Frame identifier - manifest URL pair.
+  type FrameWithManifest extends object
+    properties
+      # Frame identifier.
+      Page.FrameId frameId
+      # Manifest URL.
+      string manifestURL
+      # Application cache status.
+      integer status
+
+  # Enables application cache domain notifications.
+  command enable
+
+  # Returns relevant application cache data for the document in given frame.
+  command getApplicationCacheForFrame
+    parameters
+      # Identifier of the frame containing document whose application cache is retrieved.
+      Page.FrameId frameId
+    returns
+      # Relevant application cache data for the document in given frame.
+      ApplicationCache applicationCache
+
+  # Returns array of frame identifiers with manifest urls for each frame containing a document
+  # associated with some application cache.
+  command getFramesWithManifests
+    returns
+      # Array of frame identifiers with manifest urls for each frame containing a document
+      # associated with some application cache.
+      array of FrameWithManifest frameIds
+
+  # Returns manifest URL for document in the given frame.
+  command getManifestForFrame
+    parameters
+      # Identifier of the frame containing document whose manifest is retrieved.
+      Page.FrameId frameId
+    returns
+      # Manifest URL for document in the given frame.
+      string manifestURL
+
+  event applicationCacheStatusUpdated
+    parameters
+      # Identifier of the frame containing document whose application cache updated status.
+      Page.FrameId frameId
+      # Manifest URL.
+      string manifestURL
+      # Updated application cache status.
+      integer status
+
+  event networkStateUpdated
+    parameters
+      boolean isNowOnline
+
 # Audits domain allows investigation of page violations and possible improvements.
 experimental domain Audits
   depends on Network
```

## Roll protocol to r926578 — _2021-09-30T01:15:25.000Z_
######  Diff: [`5459753...5cc536e`](https://github.com/ChromeDevTools/devtools-protocol/compare/5459753...5cc536e)

```diff
@@ browser_protocol.pdl:408 @@ experimental domain Animation
       # Animation that was started.
       Animation animation
 
-# The domain is deprecated as AppCache is being removed (see crbug.com/582750).
-experimental deprecated domain ApplicationCache
-  depends on Page
-
-  # Detailed application cache resource information.
-  type ApplicationCacheResource extends object
-    properties
-      # Resource url.
-      string url
-      # Resource size.
-      integer size
-      # Resource type.
-      string type
-
-  # Detailed application cache information.
-  type ApplicationCache extends object
-    properties
-      # Manifest URL.
-      string manifestURL
-      # Application cache size.
-      number size
-      # Application cache creation time.
-      number creationTime
-      # Application cache update time.
-      number updateTime
-      # Application cache resources.
-      array of ApplicationCacheResource resources
-
-  # Frame identifier - manifest URL pair.
-  type FrameWithManifest extends object
-    properties
-      # Frame identifier.
-      Page.FrameId frameId
-      # Manifest URL.
-      string manifestURL
-      # Application cache status.
-      integer status
-
-  # Enables application cache domain notifications.
-  command enable
-
-  # Returns relevant application cache data for the document in given frame.
-  command getApplicationCacheForFrame
-    parameters
-      # Identifier of the frame containing document whose application cache is retrieved.
-      Page.FrameId frameId
-    returns
-      # Relevant application cache data for the document in given frame.
-      ApplicationCache applicationCache
-
-  # Returns array of frame identifiers with manifest urls for each frame containing a document
-  # associated with some application cache.
-  command getFramesWithManifests
-    returns
-      # Array of frame identifiers with manifest urls for each frame containing a document
-      # associated with some application cache.
-      array of FrameWithManifest frameIds
-
-  # Returns manifest URL for document in the given frame.
-  command getManifestForFrame
-    parameters
-      # Identifier of the frame containing document whose manifest is retrieved.
-      Page.FrameId frameId
-    returns
-      # Manifest URL for document in the given frame.
-      string manifestURL
-
-  event applicationCacheStatusUpdated
-    parameters
-      # Identifier of the frame containing document whose application cache updated status.
-      Page.FrameId frameId
-      # Manifest URL.
-      string manifestURL
-      # Updated application cache status.
-      integer status
-
-  event networkStateUpdated
-    parameters
-      boolean isNowOnline
-
 # Audits domain allows investigation of page violations and possible improvements.
 experimental domain Audits
   depends on Network
```

## Roll protocol to r926181 — _2021-09-29T09:15:25.000Z_
######  Diff: [`929d048...5459753`](https://github.com/ChromeDevTools/devtools-protocol/compare/929d048...5459753)

```diff
@@ browser_protocol.pdl:6427 @@ experimental domain Overlay
       # The style of the descendants' borders.
       optional LineStyle descendantBorder
 
+  type IsolatedElementHighlightConfig extends object
+    properties
+      # A descriptor for the highlight appearance of an element in isolation mode.
+      IsolationModeHighlightConfig isolationModeHighlightConfig
+      # Identifier of the isolated element to highlight.
+      DOM.NodeId nodeId
+
+  type IsolationModeHighlightConfig extends object
+    properties
+      # The fill color of the resizers (default: transparent).
+      optional DOM.RGBA resizerColor
+      # The fill color for resizer handles (default: transparent).
+      optional DOM.RGBA resizerHandleColor
+      # The fill color for the mask covering non-isolated elements (default: transparent).
+      optional DOM.RGBA maskColor
+
   type InspectMode extends string
     enum
       searchForNode
@@ -6641,6 +6657,12 @@ experimental domain Overlay
       # hinge data, null means hideHinge
       optional HingeConfig hingeConfig
 
+  # Show elements in isolation mode with overlays.
+  command setShowIsolatedElements
+    parameters
+      # An array of node identifiers and descriptors for the highlight appearance.
+      array of IsolatedElementHighlightConfig isolatedElementHighlightConfigs
+
   # Fired when the node should be inspected. This happens after call to `setInspectMode` or when
   # user manually inspects an element.
   event inspectNodeRequested
```

## Roll protocol to r925217 — _2021-09-27T11:15:29.000Z_
######  Diff: [`8157ba0...929d048`](https://github.com/ChromeDevTools/devtools-protocol/compare/8157ba0...929d048)

```diff
@@ browser_protocol.pdl:4917 @@ domain Network
       HeaderDisallowedByPreflightResponse
       RedirectContainsCredentials
       InsecurePrivateNetwork
+      InvalidPrivateNetworkAccess
       NoCorsRedirectModeNotFollow
 
   type CorsErrorStatus extends object
```

## Roll protocol to r924707 — _2021-09-24T10:15:21.000Z_
######  Diff: [`b32cbf9...8157ba0`](https://github.com/ChromeDevTools/devtools-protocol/compare/b32cbf9...8157ba0)

```diff
@@ browser_protocol.pdl:776 @@ experimental domain Audits
       string targetOrigin
       boolean isWarning
 
+  type GenericIssueErrorType extends string
+    enum
+      CrossOriginPortalPostMessageError
+
+  # Depending on the concrete errorType, different properties are set.
+  type GenericIssueDetails extends object
+    properties
+      # Issues with the same errorType are aggregated in the frontend.
+      GenericIssueErrorType errorType
+      optional Page.FrameId frameId
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -794,6 +805,7 @@ experimental domain Audits
       QuirksModeIssue
       NavigatorUserAgentIssue
       WasmCrossOriginModuleSharingIssue
+      GenericIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -813,6 +825,7 @@ experimental domain Audits
       optional QuirksModeIssueDetails quirksModeIssueDetails
       optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
       optional WasmCrossOriginModuleSharingIssueDetails wasmCrossOriginModuleSharingIssue
+      optional GenericIssueDetails genericIssueDetails
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
```

## Roll protocol to r924232 — _2021-09-23T09:15:23.000Z_
######  Diff: [`f300e4d...b32cbf9`](https://github.com/ChromeDevTools/devtools-protocol/compare/f300e4d...b32cbf9)

```diff
@@ browser_protocol.pdl:7241 @@ domain Page
       optional binary primaryIcon
 
   # Returns the unique (PWA) app id.
+  # Only returns values if the feature flag 'WebAppEnableManifestId' is enabled
   experimental command getAppId
     returns
-      # Only returns a value if the feature flag 'WebAppEnableManifestId' is enabled
+      # App id, either from manifest's id attribute or computed from start_url
       optional string appId
+      # Recommendation for manifest's id attribute to match current id computed from start_url
+      optional string recommendedId
 
   # Returns all browser cookies. Depending on the backend support, will return detailed cookie
   # information in the `cookies` field.
```

## Roll protocol to r924041 — _2021-09-22T21:15:29.000Z_
######  Diff: [`3c9570a...f300e4d`](https://github.com/ChromeDevTools/devtools-protocol/compare/3c9570a...f300e4d)

```diff
@@ browser_protocol.pdl:408 @@ experimental domain Animation
       # Animation that was started.
       Animation animation
 
-experimental domain ApplicationCache
+# The domain is deprecated as AppCache is being removed (see crbug.com/582750).
+experimental deprecated domain ApplicationCache
   depends on Page
 
   # Detailed application cache resource information.
```

## Roll protocol to r923714 — _2021-09-22T03:15:27.000Z_
######  Diff: [`d6f4069...3c9570a`](https://github.com/ChromeDevTools/devtools-protocol/compare/d6f4069...3c9570a)

```diff
@@ browser_protocol.pdl:7934 @@ domain Page
       InjectedStyleSheet
       Dummy
       # Disabled for render frame host reasons
+      # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
       ContentWebAuthenticationAPI
       ContentFileChooser
@@ -7944,6 +7945,9 @@ domain Page
       ContentWebUSB
       ContentMediaSession
       ContentMediaSessionService
+      ContentMediaPlay
+
+      # See components/back_forward_cache/back_forward_cache_disable.h for explanations.
       EmbedderPopupBlockerTabHelper
       EmbedderSafeBrowsingTriggeredPopupBlocker
       EmbedderSafeBrowsingThreatDetails
```

## Roll protocol to r923359 — _2021-09-21T13:15:22.000Z_
######  Diff: [`384a24c...d6f4069`](https://github.com/ChromeDevTools/devtools-protocol/compare/384a24c...d6f4069)

```diff
@@ browser_protocol.pdl:5151 @@ domain Network
       # (which is required in order to use "SameParty"); or specified the "SameSite=Strict"
       # attribute (which is forbidden when using "SameParty").
       SamePartyConflictsWithOtherAttributes
+      # The cookie's name/value pair size exceeded the size limit defined in
+      # RFC6265bis.
+      NameValuePairExceedsMaxSize
 
   # Types of reasons why a cookie may not be sent with a request.
   experimental type CookieBlockedReason extends string
@@ -5195,6 +5198,9 @@ domain Network
       SchemefulSameSiteUnspecifiedTreatedAsLax
       # The cookie had the "SameParty" attribute and the request was made from a cross-party context.
       SamePartyFromCrossPartyContext
+      # The cookie's name/value pair size exceeded the size limit defined in
+      # RFC6265bis.
+      NameValuePairExceedsMaxSize
 
   # A cookie which was not stored from a response with the corresponding reason.
   experimental type BlockedSetCookieWithReason extends object
```

## Roll protocol to r923255 — _2021-09-21T06:15:25.000Z_
######  Diff: [`f62186c...384a24c`](https://github.com/ChromeDevTools/devtools-protocol/compare/f62186c...384a24c)

```diff
@@ browser_protocol.pdl:7937 @@ domain Page
       ContentWebBluetooth
       ContentWebUSB
       ContentMediaSession
+      ContentMediaSessionService
       EmbedderPopupBlockerTabHelper
       EmbedderSafeBrowsingTriggeredPopupBlocker
       EmbedderSafeBrowsingThreatDetails
```

## Roll protocol to r922637 — _2021-09-17T20:15:26.000Z_
######  Diff: [`d99de50...b86f904`](https://github.com/ChromeDevTools/devtools-protocol/compare/d99de50...b86f904)

```diff
@@ browser_protocol.pdl:6800 @@ domain Page
       FeatureDisabled
       TokenDisabled
       FeatureDisabledForUser
+      UnknownTrial
 
   # Status for an Origin Trial.
   experimental type OriginTrialStatus extends string
```

## Roll protocol to r921910 — _2021-09-15T23:15:28.000Z_
######  Diff: [`2e2333f...d99de50`](https://github.com/ChromeDevTools/devtools-protocol/compare/2e2333f...d99de50)

```diff
@@ browser_protocol.pdl:6715 @@ domain Page
       ch-device-memory
       ch-downlink
       ch-ect
-      ch-lang
       ch-prefers-color-scheme
       ch-rtt
       ch-ua
```

## Roll protocol to r919640 — _2021-09-09T05:15:45.000Z_
######  Diff: [`a27d92f...2e2333f`](https://github.com/ChromeDevTools/devtools-protocol/compare/a27d92f...2e2333f)

```diff
@@ browser_protocol.pdl:7926 @@ domain Page
       OutstandingNetworkRequestDirectSocket
       InjectedJavascript
       InjectedStyleSheet
+      Dummy
       # Disabled for render frame host reasons
       ContentSecurityHandler
       ContentWebAuthenticationAPI
```

## Roll protocol to r919376 — _2021-09-08T19:15:34.000Z_
######  Diff: [`c80e5d1...a27d92f`](https://github.com/ChromeDevTools/devtools-protocol/compare/c80e5d1...a27d92f)

```diff
@@ browser_protocol.pdl:739 @@ experimental domain Audits
       AttributionSourceUntrustworthyOrigin
       AttributionUntrustworthyOrigin
       AttributionTriggerDataTooLarge
+      AttributionEventSourceTriggerDataTooLarge
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
```

## Roll protocol to r919343 — _2021-09-08T18:15:31.000Z_
######  Diff: [`3caee55...c80e5d1`](https://github.com/ChromeDevTools/devtools-protocol/compare/3caee55...c80e5d1)

```diff
@@ browser_protocol.pdl:7935 @@ domain Page
       ContentWebBluetooth
       ContentWebUSB
       ContentMediaSession
-      ContentMediaSessionService
       EmbedderPopupBlockerTabHelper
       EmbedderSafeBrowsingTriggeredPopupBlocker
       EmbedderSafeBrowsingThreatDetails
```

## Roll protocol to r919243 — _2021-09-08T14:15:32.000Z_
######  Diff: [`2bce709...3caee55`](https://github.com/ChromeDevTools/devtools-protocol/compare/2bce709...3caee55)

```diff
@@ browser_protocol.pdl:7935 @@ domain Page
       ContentWebBluetooth
       ContentWebUSB
       ContentMediaSession
+      ContentMediaSessionService
       EmbedderPopupBlockerTabHelper
       EmbedderSafeBrowsingTriggeredPopupBlocker
       EmbedderSafeBrowsingThreatDetails
```

## Roll protocol to r918852 — _2021-09-07T18:15:30.000Z_
######  Diff: [`8759635...2bce709`](https://github.com/ChromeDevTools/devtools-protocol/compare/8759635...2bce709)

```diff
@@ browser_protocol.pdl:7923 @@ domain Page
       KeyboardLock
       WebOTPService
       OutstandingNetworkRequestDirectSocket
-      IsolatedWorldScript
+      InjectedJavascript
       InjectedStyleSheet
       # Disabled for render frame host reasons
       ContentSecurityHandler
```

## Roll protocol to r918800 — _2021-09-07T15:15:38.000Z_
######  Diff: [`f18b042...8759635`](https://github.com/ChromeDevTools/devtools-protocol/compare/f18b042...8759635)

```diff
@@ browser_protocol.pdl:3412 @@ domain Emulation
       # Whether to enable to disable focus emulation.
       boolean enabled
 
+  # Automatically render all web contents using a dark theme.
+  experimental command setAutoDarkModeOverride
+    parameters
+      # Whether to enable or disable automatic dark mode.
+      # If not specified, any existing override will be cleared.
+      optional boolean enabled
+
   # Enables CPU throttling to emulate slow CPUs.
   experimental command setCPUThrottlingRate
     parameters
```

## Roll protocol to r918755 — _2021-09-07T12:15:26.000Z_
######  Diff: [`841918b...f18b042`](https://github.com/ChromeDevTools/devtools-protocol/compare/841918b...f18b042)

```diff
@@ browser_protocol.pdl:6133 @@ domain Network
       Network.TimeSinceEpoch timestamp
       # How many uploads deep the related request was.
       integer depth
+      # The number of delivery attempts made so far, not including an active attempt.
+      integer completedAttempts
       object body
+      ReportStatus status
 
   # Is sent whenever a new report is added.
   # And after 'enableReportingApi' for all existing reports.
@@ -6141,6 +6144,10 @@ domain Network
     parameters
       ReportingApiReport report
 
+  experimental event reportingApiReportUpdated
+    parameters
+      ReportingApiReport report
+
   # An object providing the result of a network resource load.
   experimental type LoadNetworkResourcePageResult extends object
     properties
```

## Roll protocol to r918695 — _2021-09-07T06:15:26.000Z_
######  Diff: [`69ec1d8...841918b`](https://github.com/ChromeDevTools/devtools-protocol/compare/69ec1d8...841918b)

```diff
@@ browser_protocol.pdl:6105 @@ domain Network
   # The status of a Reporting API report.
   experimental type ReportStatus extends string
     enum
-      # Report has been queued but no attempt has been made to deliver it yet,
+      # Report has been queued and no attempt has been made to deliver it yet,
       # or attempted previous upload failed (impermanently).
       Queued
       # There is an ongoing attempt to upload this report.
       Pending
+      # Deletion of this report was requested while it was pending, so it will
+      # be removed after possibly outstanding upload attempts complete (successful
+      # or not).
+      MarkedForRemoval
+      # Successfully uploaded and MarkedForRemoval.
+      Success
 
   experimental type ReportId extends string
```

## Roll protocol to r918555 — _2021-09-06T11:15:31.000Z_
######  Diff: [`e4f6e30...69ec1d8`](https://github.com/ChromeDevTools/devtools-protocol/compare/e4f6e30...69ec1d8)

```diff
@@ browser_protocol.pdl:6111 @@ domain Network
       # There is an ongoing attempt to upload this report.
       Pending
 
+  experimental type ReportId extends string
+
   # An object representing a report generated by the Reporting API.
   experimental type ReportingApiReport extends object
     properties
+      ReportId id
       # The URL of the document that triggered the report.
       string initiatorUrl
       # The name of the endpoint group that should be used to deliver the report.
```

## Roll protocol to r917689 — _2021-09-02T16:15:35.000Z_
######  Diff: [`3ac2966...e4f6e30`](https://github.com/ChromeDevTools/devtools-protocol/compare/3ac2966...e4f6e30)

```diff
@@ browser_protocol.pdl:7849 @@ domain Page
       BrowsingInstanceNotSwapped
       BackForwardCacheDisabledForDelegate
       OptInUnloadHeaderNotPresent
+      UnloadHandlerExistsInMainFrame
       UnloadHandlerExistsInSubFrame
       ServiceWorkerUnregistration
       CacheControlNoStore
```

## Roll protocol to r915197 — _2021-08-25T15:15:50.000Z_
######  Diff: [`5b380d1...3ac2966`](https://github.com/ChromeDevTools/devtools-protocol/compare/5b380d1...3ac2966)

```diff
@@ browser_protocol.pdl:6848 @@ domain Page
       experimental CrossOriginIsolatedContextType crossOriginIsolatedContextType
       # Indicated which gated APIs / features are available.
       experimental array of GatedAPIFeatures gatedAPIFeatures
-      # Frame document's origin trials with at least one token present.
-      experimental optional array of OriginTrial originTrials
 
   # Information about the Resource on the page.
   experimental type FrameResource extends object
```

## Roll protocol to r914774 — _2021-08-24T17:15:43.000Z_
######  Diff: [`6626782...5b380d1`](https://github.com/ChromeDevTools/devtools-protocol/compare/6626782...5b380d1)

```diff
@@ browser_protocol.pdl:8902 @@ domain Target
 
   # Adds the specified target to the list of targets that will be monitored for any related target
   # creation (such as child frames, child workers and new versions of service worker) and reported
-  # through `attachedToTarget`. This cancel the effect of any previous `setAutoAttach` and is also
-  # cancelled by subsequent `setAutoAttach`. Only available at the Browser target.
+  # through `attachedToTarget`. The specified target is also auto-attached.
+  # This cancels the effect of any previous `setAutoAttach` and is also cancelled by subsequent
+  # `setAutoAttach`. Only available at the Browser target.
   experimental command autoAttachRelated
     parameters
       TargetID targetId
```

## Roll protocol to r914689 — _2021-08-24T11:15:27.000Z_
######  Diff: [`cebcf39...6626782`](https://github.com/ChromeDevTools/devtools-protocol/compare/cebcf39...6626782)

```diff
@@ browser_protocol.pdl:7903 @@ domain Page
       OutstandingNetworkRequestDirectSocket
       IsolatedWorldScript
       InjectedStyleSheet
-      MediaSessionImplOnServiceCreated
       # Disabled for render frame host reasons
-      ContentMediaSessionImplOnServiceCreated
       ContentSecurityHandler
       ContentWebAuthenticationAPI
       ContentFileChooser
```

## Roll protocol to r914246 — _2021-08-23T10:15:24.000Z_
######  Diff: [`e36e630...cebcf39`](https://github.com/ChromeDevTools/devtools-protocol/compare/e36e630...cebcf39)

```diff
@@ browser_protocol.pdl:7211 @@ domain Page
     returns
       optional binary primaryIcon
 
+  # Returns the unique (PWA) app id.
+  experimental command getAppId
+    returns
+      # Only returns a value if the feature flag 'WebAppEnableManifestId' is enabled
+      optional string appId
+
   # Returns all browser cookies. Depending on the backend support, will return detailed cookie
   # information in the `cookies` field.
   experimental deprecated command getCookies
```

## Roll protocol to r914207 — _2021-08-23T07:15:27.000Z_
######  Diff: [`e355d86...e36e630`](https://github.com/ChromeDevTools/devtools-protocol/compare/e355d86...e36e630)

```diff
@@ browser_protocol.pdl:7897 @@ domain Page
       OutstandingNetworkRequestDirectSocket
       IsolatedWorldScript
       InjectedStyleSheet
-      # Disabled for render frame host reasons
       MediaSessionImplOnServiceCreated
-      SecurityHandler
-      WebAuthenticationAPI
-      FileChooser
-      Serial
-      FileSystemAccess
-      MediaDevicesDispatcherHost
-      WebBluetooth
-      WebUSB
-      MediaSession
+      # Disabled for render frame host reasons
+      ContentMediaSessionImplOnServiceCreated
+      ContentSecurityHandler
+      ContentWebAuthenticationAPI
+      ContentFileChooser
+      ContentSerial
+      ContentFileSystemAccess
+      ContentMediaDevicesDispatcherHost
+      ContentWebBluetooth
+      ContentWebUSB
+      ContentMediaSession
+      EmbedderPopupBlockerTabHelper
+      EmbedderSafeBrowsingTriggeredPopupBlocker
+      EmbedderSafeBrowsingThreatDetails
+      EmbedderAppBannerManager
+      EmbedderDomDistillerViewerSource
+      EmbedderDomDistillerSelfDeletingRequestDelegate
+      EmbedderOomInterventionTabHelper
+      EmbedderOfflinePage
+      EmbedderChromePasswordManagerClientBindCredentialManager
+      EmbedderPermissionRequestManager
+      EmbedderModalDialog
+      EmbedderExtensions
+      EmbedderExtensionMessaging
+      EmbedderExtensionMessagingForOpenPort
+      EmbedderExtensionSentMessageToCachedFrame
 
   # Types of not restored reasons for back-forward cache.
   experimental type BackForwardCacheNotRestoredReasonType extends string
```

## Roll protocol to r913948 — _2021-08-20T20:15:44.000Z_
######  Diff: [`a558ebd...e355d86`](https://github.com/ChromeDevTools/devtools-protocol/compare/a558ebd...e355d86)

```diff
@@ browser_protocol.pdl:9230 @@ domain Fetch
       # need to represent some non-UTF8 values that can't be transmitted
       # over the protocol as text.
       optional binary binaryResponseHeaders
-      # A response body.
+      # A response body. If absent, original response body will be used if
+      # the request is intercepted at the response stage and empty body
+      # will be used if the request is intercepted at the request stage.
       optional binary body
       # A textual representation of responseCode.
       # If absent, a standard phrase matching responseCode is used.
@@ -9260,6 +9262,26 @@ domain Fetch
       # Response to  with an authChallenge.
       AuthChallengeResponse authChallengeResponse
 
+  # Continues loading of the paused response, optionally modifying the
+  # response headers. If either responseCode or headers are modified, all of them
+  # must be present.
+  experimental command continueResponse
+    parameters
+      # An id the client received in requestPaused event.
+      RequestId requestId
+      # An HTTP response code. If absent, original response code will be used.
+      optional integer responseCode
+      # A textual representation of responseCode.
+      # If absent, a standard phrase matching responseCode is used.
+      optional string responsePhrase
+      # Response headers. If absent, original response headers will be used.
+      optional array of HeaderEntry responseHeaders
+      # Alternative way of specifying response headers as a \0-separated
+      # series of name: value pairs. Prefer the above method unless you
+      # need to represent some non-UTF8 values that can't be transmitted
+      # over the protocol as text.
+      optional binary binaryResponseHeaders
+
   # Causes the body of the response to be received from the server and
   # returned as a single string. May only be issued for a request that
   # is paused in the Response stage and is mutually exclusive with
```

## Roll protocol to r913327 — _2021-08-19T09:15:31.000Z_
######  Diff: [`d30492e...a558ebd`](https://github.com/ChromeDevTools/devtools-protocol/compare/d30492e...a558ebd)

```diff
@@ browser_protocol.pdl:4451 @@ domain Log
         error
       # Logged text.
       string text
+      optional enum category
+        cors
       # Timestamp when this entry was added.
       Runtime.Timestamp timestamp
       # URL of the resource if known.
```

## Roll protocol to r912925 — _2021-08-18T08:15:25.000Z_
######  Diff: [`ba60fa4...d30492e`](https://github.com/ChromeDevTools/devtools-protocol/compare/ba60fa4...d30492e)

```diff
@@ browser_protocol.pdl:208 @@ experimental domain Accessibility
     parameters
       # The maximum depth at which descendants of the root node should be retrieved.
       # If omitted, the full tree is returned.
-      optional integer max_depth
+      optional integer depth
+      # Deprecated. This parameter has been renamed to `depth`. If depth is not provided, max_depth will be used.
+      deprecated optional integer max_depth
       # The frame for whose document the AX tree should be retrieved.
       # If omited, the root frame is used.
       optional Page.FrameId frameId
```

## Roll protocol to r912603 — _2021-08-17T16:15:25.000Z_
######  Diff: [`9b427a9...ba60fa4`](https://github.com/ChromeDevTools/devtools-protocol/compare/9b427a9...ba60fa4)

```diff
@@ browser_protocol.pdl:6091 @@ domain Network
     returns
       SecurityIsolationStatus status
 
+  # Enables tracking for the Reporting API, events generated by the Reporting API will now be delivered to the client.
+  # Enabling triggers 'reportingApiReportAdded' for all existing reports.
+  experimental command enableReportingApi
+    parameters
+      # Whether to enable or disable events for the Reporting API
+      boolean enable
+
+  # The status of a Reporting API report.
+  experimental type ReportStatus extends string
+    enum
+      # Report has been queued but no attempt has been made to deliver it yet,
+      # or attempted previous upload failed (impermanently).
+      Queued
+      # There is an ongoing attempt to upload this report.
+      Pending
+
+  # An object representing a report generated by the Reporting API.
+  experimental type ReportingApiReport extends object
+    properties
+      # The URL of the document that triggered the report.
+      string initiatorUrl
+      # The name of the endpoint group that should be used to deliver the report.
+      string destination
+      # The type of the report (specifies the set of data that is contained in the report body).
+      string type
+      # When the report was generated.
+      Network.TimeSinceEpoch timestamp
+      # How many uploads deep the related request was.
+      integer depth
+      object body
+
+  # Is sent whenever a new report is added.
+  # And after 'enableReportingApi' for all existing reports.
+  experimental event reportingApiReportAdded
+    parameters
+      ReportingApiReport report
+
   # An object providing the result of a network resource load.
   experimental type LoadNetworkResourcePageResult extends object
     properties
```

## Roll protocol to r912566 — _2021-08-17T14:15:28.000Z_
######  Diff: [`5c0761c...9b427a9`](https://github.com/ChromeDevTools/devtools-protocol/compare/5c0761c...9b427a9)

```diff
@@ browser_protocol.pdl:7840 @@ domain Page
       WebShare
       RequestedStorageAccessGrant
       WebNfc
-      WebFileSystem
       OutstandingNetworkRequestFetch
       OutstandingNetworkRequestXHR
       AppBanner
```

## Roll protocol to r912314 — _2021-08-16T20:16:28.000Z_
######  Diff: [`289585c...5c0761c`](https://github.com/ChromeDevTools/devtools-protocol/compare/289585c...5c0761c)

```diff
@@ browser_protocol.pdl:6091 @@ domain Network
     returns
       SecurityIsolationStatus status
 
-  # Enables tracking for the Reporting API, events generated by the Reporting API will now be delivered to the client.
-  # Enabling triggers 'reportingApiReportAdded' for all existing reports.
-  experimental command enableReportingApi
-    parameters
-      # Whether to enable or disable events for the Reporting API
-      boolean enable
-
-  # The status of a Reporting API report.
-  experimental type ReportStatus extends string
-    enum
-      # Report has been queued but no attempt has been made to deliver it yet,
-      # or attempted previous upload failed (impermanently).
-      Queued
-      # There is an ongoing attempt to upload this report.
-      Pending
-
-  # An object representing a report generated by the Reporting API.
-  experimental type ReportingApiReport extends object
-    properties
-      # The URL of the document that triggered the report.
-      string initiatorUrl
-      # The name of the endpoint group that should be used to deliver the report.
-      string destination
-      # The type of the report (specifies the set of data that is contained in the report body).
-      string type
-      # When the report was generated.
-      Network.TimeSinceEpoch timestamp
-      # How many uploads deep the related request was.
-      integer depth
-      object body
-
-  # Is sent whenever a new report is added.
-  # And after 'enableReportingApi' for all existing reports.
-  experimental event reportingApiReportAdded
-    parameters
-      ReportingApiReport report
-
   # An object providing the result of a network resource load.
   experimental type LoadNetworkResourcePageResult extends object
     properties
@@ -6699,6 +6662,7 @@ domain Page
       ch-ua-full-version
       ch-ua-platform-version
       ch-ua-reduced
+      ch-viewport-height
       ch-viewport-width
       ch-width
       clipboard-read
@@ -9308,6 +9272,8 @@ domain Fetch
       optional Network.ErrorReason responseErrorReason
       # Response code if intercepted at response stage.
       optional integer responseStatusCode
+      # Response status text if intercepted at response stage.
+      optional string responseStatusText
       # Response headers if intercepted at the response stage.
       optional array of HeaderEntry responseHeaders
       # If the intercepted request had a corresponding Network.requestWillBeSent event fired for it,
```

## Roll protocol to r912162 — _2021-08-16T14:16:23.000Z_
######  Diff: [`5000852...289585c`](https://github.com/ChromeDevTools/devtools-protocol/compare/5000852...289585c)

```diff
@@ browser_protocol.pdl:6091 @@ domain Network
     returns
       SecurityIsolationStatus status
 
+  # Enables tracking for the Reporting API, events generated by the Reporting API will now be delivered to the client.
+  # Enabling triggers 'reportingApiReportAdded' for all existing reports.
+  experimental command enableReportingApi
+    parameters
+      # Whether to enable or disable events for the Reporting API
+      boolean enable
+
+  # The status of a Reporting API report.
+  experimental type ReportStatus extends string
+    enum
+      # Report has been queued but no attempt has been made to deliver it yet,
+      # or attempted previous upload failed (impermanently).
+      Queued
+      # There is an ongoing attempt to upload this report.
+      Pending
+
+  # An object representing a report generated by the Reporting API.
+  experimental type ReportingApiReport extends object
+    properties
+      # The URL of the document that triggered the report.
+      string initiatorUrl
+      # The name of the endpoint group that should be used to deliver the report.
+      string destination
+      # The type of the report (specifies the set of data that is contained in the report body).
+      string type
+      # When the report was generated.
+      Network.TimeSinceEpoch timestamp
+      # How many uploads deep the related request was.
+      integer depth
+      object body
+
+  # Is sent whenever a new report is added.
+  # And after 'enableReportingApi' for all existing reports.
+  experimental event reportingApiReportAdded
+    parameters
+      ReportingApiReport report
+
   # An object providing the result of a network resource load.
   experimental type LoadNetworkResourcePageResult extends object
     properties
```

## Roll protocol to r911867 — _2021-08-13T20:16:18.000Z_
######  Diff: [`e811304...b3fb07a`](https://github.com/ChromeDevTools/devtools-protocol/compare/e811304...b3fb07a)

```diff
@@ browser_protocol.pdl:5922 @@ domain Network
       Public
       Unknown
 
+  experimental type ConnectTiming extends object
+    properties
+      # Timing's requestTime is a baseline in seconds, while the other numbers are ticks in
+      # milliseconds relatively to this requestTime. Matches ResourceTiming's requestTime for
+      # the same request (but not for redirected requests).
+      number requestTime
+
   experimental type ClientSecurityState extends object
     properties
       boolean initiatorIsSecureContext
@@ -5941,6 +5948,8 @@ domain Network
       array of BlockedCookieWithReason associatedCookies
       # Raw request headers as they will be sent over the wire.
       Headers headers
+      # Connection timing information for the request.
+      experimental ConnectTiming connectTiming
       # The client security state set for the request.
       optional ClientSecurityState clientSecurityState
```

## Roll protocol to r911675 — _2021-08-13T08:16:24.000Z_
######  Diff: [`85bc00a...e811304`](https://github.com/ChromeDevTools/devtools-protocol/compare/85bc00a...e811304)

```diff
@@ browser_protocol.pdl:736 @@ experimental domain Audits
       InvalidAttributionData
       AttributionSourceUntrustworthyOrigin
       AttributionUntrustworthyOrigin
+      AttributionTriggerDataTooLarge
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
```

## Roll protocol to r911543 — _2021-08-12T23:17:07.000Z_
######  Diff: [`3c9fa3b...85bc00a`](https://github.com/ChromeDevTools/devtools-protocol/compare/3c9fa3b...85bc00a)

```diff
@@ browser_protocol.pdl:8815 @@ domain Target
   # Controls whether to automatically attach to new targets which are considered to be related to
   # this one. When turned on, attaches to all existing related targets as well. When turned off,
   # automatically detaches from all currently attached targets.
+  # This also clears all targets added by `autoAttachRelated` from the list of targets to watch
+  # for creation of related targets.
   experimental command setAutoAttach
     parameters
       # Whether to auto-attach to related targets.
@@ -8827,6 +8829,17 @@ domain Target
       # and eventually retire it. See crbug.com/991325.
       optional boolean flatten
 
+  # Adds the specified target to the list of targets that will be monitored for any related target
+  # creation (such as child frames, child workers and new versions of service worker) and reported
+  # through `attachedToTarget`. This cancel the effect of any previous `setAutoAttach` and is also
+  # cancelled by subsequent `setAutoAttach`. Only available at the Browser target.
+  experimental command autoAttachRelated
+    parameters
+      TargetID targetId
+      # Whether to pause new targets when attaching to them. Use `Runtime.runIfWaitingForDebugger`
+      # to run paused targets.
+      boolean waitForDebuggerOnStart
+
   # Controls whether to discover available targets and notify via
   # `targetCreated/targetInfoChanged/targetDestroyed` events.
   command setDiscoverTargets
```

## Roll protocol to r911116 — _2021-08-12T02:16:24.000Z_
######  Diff: [`2b18125...3c9fa3b`](https://github.com/ChromeDevTools/devtools-protocol/compare/2b18125...3c9fa3b)

```diff
@@ browser_protocol.pdl:7800 @@ domain Page
       CacheControlNoStoreHTTPOnlyCookieModified
       NoResponseHead
       Unknown
+      ActivationNavigationsDisallowedForBug1234857
       #Blocklisted features
       WebSocket
+      WebTransport
       WebRTC
       MainResourceHasCacheControlNoStore
       MainResourceHasCacheControlNoCache
```

## Roll protocol to r910715 — _2021-08-11T08:16:14.000Z_
######  Diff: [`5cff1bc...2b18125`](https://github.com/ChromeDevTools/devtools-protocol/compare/5cff1bc...2b18125)

```diff
@@ browser_protocol.pdl:209 @@ experimental domain Accessibility
       # The maximum depth at which descendants of the root node should be retrieved.
       # If omitted, the full tree is returned.
       optional integer max_depth
+      # The frame for whose document the AX tree should be retrieved.
+      # If omited, the root frame is used.
+      optional Page.FrameId frameId
     returns
       array of AXNode nodes
 
@@ -217,6 +220,9 @@ experimental domain Accessibility
   experimental command getChildAXNodes
     parameters
       AXNodeId id
+      # The frame in whose document the node resides.
+      # If omitted, the root frame is used.
+      optional Page.FrameId frameId
     returns
       array of AXNode nodes
 
@@ -7793,6 +7799,7 @@ domain Page
       CacheControlNoStoreCookieModified
       CacheControlNoStoreHTTPOnlyCookieModified
       NoResponseHead
+      Unknown
       #Blocklisted features
       WebSocket
       WebRTC
@@ -7837,8 +7844,17 @@ domain Page
       OutstandingNetworkRequestDirectSocket
       IsolatedWorldScript
       InjectedStyleSheet
+      # Disabled for render frame host reasons
       MediaSessionImplOnServiceCreated
-      Unknown
+      SecurityHandler
+      WebAuthenticationAPI
+      FileChooser
+      Serial
+      FileSystemAccess
+      MediaDevicesDispatcherHost
+      WebBluetooth
+      WebUSB
+      MediaSession
 
   # Types of not restored reasons for back-forward cache.
   experimental type BackForwardCacheNotRestoredReasonType extends string
```

## Roll protocol to r910293 — _2021-08-10T14:16:40.000Z_
######  Diff: [`caec9d3...5cff1bc`](https://github.com/ChromeDevTools/devtools-protocol/compare/caec9d3...5cff1bc)

```diff
@@ browser_protocol.pdl:6098 @@ domain Network
   # Fetches the resource and returns the content.
   experimental command loadNetworkResource
     parameters
-      # Frame id to get the resource for.
-      Page.FrameId frameId
+      # Frame id to get the resource for. Mandatory for frame targets, and
+      # should be omitted for worker targets.
+      optional Page.FrameId frameId
       # URL of the resource to get content for.
       string url
       # Options for the request.
```

## Roll protocol to r910184 — _2021-08-10T07:16:07.000Z_
######  Diff: [`d1e1cbf...caec9d3`](https://github.com/ChromeDevTools/devtools-protocol/compare/d1e1cbf...caec9d3)

```diff
@@ browser_protocol.pdl:6761 @@ domain Page
       # Frame unique identifier.
       FrameId id
       # Parent frame identifier.
-      optional string parentId
+      optional FrameId parentId
       # Identifier of the loader associated with this frame.
       Network.LoaderId loaderId
       # Frame's name as specified in the tag.
```

## Roll protocol to r909734 — _2021-08-09T09:16:28.000Z_
######  Diff: [`94b504e...d1e1cbf`](https://github.com/ChromeDevTools/devtools-protocol/compare/94b504e...d1e1cbf)

```diff
@@ browser_protocol.pdl:510 @@ experimental domain Audits
       ExcludeSameSiteLax
       ExcludeSameSiteStrict
       ExcludeInvalidSameParty
+      ExcludeSamePartyCrossPartyContext
 
   type SameSiteCookieWarningReason extends string
     enum
```

## Roll protocol to r909375 — _2021-08-06T18:16:33.000Z_
######  Diff: [`8e161fc...94b504e`](https://github.com/ChromeDevTools/devtools-protocol/compare/8e161fc...94b504e)

```diff
@@ browser_protocol.pdl:6318 @@ experimental domain Overlay
 
   type ContainerQueryContainerHighlightConfig extends object
     properties
-      # The style of the container border
+      # The style of the container border.
       optional LineStyle containerBorder
+      # The style of the descendants' borders.
+      optional LineStyle descendantBorder
 
   type InspectMode extends string
     enum
```

## Roll protocol to r908589 — _2021-08-04T20:16:22.000Z_
######  Diff: [`c707d30...8e161fc`](https://github.com/ChromeDevTools/devtools-protocol/compare/c707d30...8e161fc)

```diff
@@ browser_protocol.pdl:7361 @@ domain Page
     returns
       array of PermissionsPolicyFeatureState states
 
+  # Get Origin Trials on given frame.
+  experimental command getOriginTrials
+    parameters
+      FrameId frameId
+    returns
+      array of OriginTrial originTrials
+
   # Overrides the values of device screen dimensions (window.screen.width, window.screen.height,
   # window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media
   # query results).
```

## Roll protocol to r908187 — _2021-08-03T23:16:22.000Z_
######  Diff: [`39a8210...c707d30`](https://github.com/ChromeDevTools/devtools-protocol/compare/39a8210...c707d30)

```diff
@@ browser_protocol.pdl:4935 @@ domain Network
       string statusText
       # HTTP response headers.
       Headers headers
-      # HTTP response headers text.
-      optional string headersText
+      # HTTP response headers text. This has been replaced by the headers in Network.responseReceivedExtraInfo.
+      deprecated optional string headersText
       # Resource mimeType as determined by the browser.
       string mimeType
       # Refined HTTP request headers that were actually transmitted over the network.
       optional Headers requestHeaders
-      # HTTP request headers text.
-      optional string requestHeadersText
+      # HTTP request headers text. This has been replaced by the headers in Network.requestWillBeSentExtraInfo.
+      deprecated optional string requestHeadersText
       # Specifies whether physical connection was actually reused for this request.
       boolean connectionReused
       # Physical connection id that was actually used for this request.
@@ -5953,7 +5953,8 @@ domain Network
       # established the connection, so we can't send it in `requestWillBeSentExtraInfo`.
       IPAddressSpace resourceIPAddressSpace
       # The status code of the response. This is useful in cases the request failed and no responseReceived
-      # event is triggered, which is the case for, e.g., CORS errors.
+      # event is triggered, which is the case for, e.g., CORS errors. This is also the correct status code
+      # for cached requests, where the status in responseReceived is a 200 and this will be 304.
       integer statusCode
       # Raw response header text as it was received over the wire. The raw text may not always be
       # available, such as in the case of HTTP/2 or QUIC.
@@ -9155,6 +9156,8 @@ domain Fetch
       optional binary postData
       # If set, overrides the request headers.
       optional array of HeaderEntry headers
+      # If set, overrides response interception behavior for this request.
+      experimental optional boolean interceptResponse
 
   # Continues a request supplying authChallengeResponse following authRequired event.
   command continueWithAuth
```

## Roll protocol to r907573 — _2021-08-02T16:16:14.000Z_
######  Diff: [`2ae3b1d...39a8210`](https://github.com/ChromeDevTools/devtools-protocol/compare/2ae3b1d...39a8210)

```diff
@@ browser_protocol.pdl:2635 @@ domain DOM
       # The container node for the given node, or null if not found.
       optional NodeId nodeId
 
+  # Returns the descendants of a container query container that have
+  # container queries against this container.
+  experimental command getQueryingDescendantsForContainer
+    parameters
+      # Id of the container node to find querying descendants from.
+      NodeId nodeId
+    returns
+      # Descendant nodes with container queries against the given container.
+      array of NodeId nodeIds
+
   # Fired when `Element`'s attribute is modified.
   event attributeModified
     parameters
```

## Roll protocol to r906795 — _2021-07-29T19:17:01.000Z_
######  Diff: [`1c8cd5c...2ae3b1d`](https://github.com/ChromeDevTools/devtools-protocol/compare/1c8cd5c...2ae3b1d)

```diff
@@ browser_protocol.pdl:4020 @@ domain Input
       # The text to insert.
       string text
 
+  # This method sets the current candidate text for ime.
+  # Use imeCommitComposition to commit the final text.
+  # Use imeSetComposition with empty string as text to cancel composition.
+  experimental command imeSetComposition
+    parameters
+      # The text to insert
+      string text
+      # selection start
+      integer selectionStart
+      # selection end
+      integer selectionEnd
+      # replacement start
+      optional integer replacementStart
+      # replacement end
+      optional integer replacementEnd
+
   # Dispatches a mouse event to the page.
   command dispatchMouseEvent
     parameters
```

## Roll protocol to r906505 — _2021-07-29T01:16:19.000Z_
######  Diff: [`fa458e7...1c8cd5c`](https://github.com/ChromeDevTools/devtools-protocol/compare/fa458e7...1c8cd5c)

```diff
@@ browser_protocol.pdl:6614 @@ domain Page
       ch-ua-mobile
       ch-ua-full-version
       ch-ua-platform-version
+      ch-ua-reduced
       ch-viewport-width
       ch-width
       clipboard-read
```

## Roll protocol to r905680 — _2021-07-27T11:16:20.000Z_
######  Diff: [`52195bf...fa458e7`](https://github.com/ChromeDevTools/devtools-protocol/compare/52195bf...fa458e7)

```diff
@@ browser_protocol.pdl:7753 @@ domain Page
       CacheControlNoStore
       CacheControlNoStoreCookieModified
       CacheControlNoStoreHTTPOnlyCookieModified
+      NoResponseHead
       #Blocklisted features
       WebSocket
       WebRTC
```

## Roll protocol to r905252 — _2021-07-26T15:16:11.000Z_
######  Diff: [`6da1a03...52195bf`](https://github.com/ChromeDevTools/devtools-protocol/compare/6da1a03...52195bf)

```diff
@@ browser_protocol.pdl:5926 @@ domain Network
       # The IP address space of the resource. The address space can only be determined once the transport
       # established the connection, so we can't send it in `requestWillBeSentExtraInfo`.
       IPAddressSpace resourceIPAddressSpace
+      # The status code of the response. This is useful in cases the request failed and no responseReceived
+      # event is triggered, which is the case for, e.g., CORS errors.
+      integer statusCode
       # Raw response header text as it was received over the wire. The raw text may not always be
       # available, such as in the case of HTTP/2 or QUIC.
       optional string headersText
```

## Roll protocol to r905235 — _2021-07-26T14:16:05.000Z_
######  Diff: [`ddfd9ff...6da1a03`](https://github.com/ChromeDevTools/devtools-protocol/compare/ddfd9ff...6da1a03)

```diff
@@ browser_protocol.pdl:3944 @@ domain Input
   experimental type DragData extends object
     properties
       array of DragDataItem items
+      # List of filenames that should be included when dropping
+      optional array of string files
       # Bit field representing allowed drag operations. Copy = 1, Link = 2, Move = 16
       integer dragOperationsMask
```

## Roll protocol to r901419 — _2021-07-14T09:15:57.000Z_
######  Diff: [`f94c0d3...ddfd9ff`](https://github.com/ChromeDevTools/devtools-protocol/compare/f94c0d3...ddfd9ff)

```diff
@@ browser_protocol.pdl:6342 @@ experimental domain Overlay
   command hideHighlight
 
   # Highlights owner element of the frame with given id.
-  command highlightFrame
+  # Deprecated: Doesn't work reliablity and cannot be fixed due to process
+  # separatation (the owner node might be in a different process). Determine
+  # the owner node in the client and use highlightNode.
+  deprecated command highlightFrame
     parameters
       # Identifier of the frame to highlight.
       Page.FrameId frameId
```

## Roll protocol to r901394 — _2021-07-14T07:16:11.000Z_
######  Diff: [`2609869...f94c0d3`](https://github.com/ChromeDevTools/devtools-protocol/compare/2609869...f94c0d3)

```diff
@@ browser_protocol.pdl:7742 @@ domain Page
       OptInUnloadHeaderNotPresent
       UnloadHandlerExistsInSubFrame
       ServiceWorkerUnregistration
+      CacheControlNoStore
+      CacheControlNoStoreCookieModified
+      CacheControlNoStoreHTTPOnlyCookieModified
       #Blocklisted features
       WebSocket
       WebRTC
```

## Roll protocol to r900855 — _2021-07-13T06:16:27.000Z_
######  Diff: [`56bb0ce...2609869`](https://github.com/ChromeDevTools/devtools-protocol/compare/56bb0ce...2609869)

```diff
@@ browser_protocol.pdl:7754 @@ domain Page
       DedicatedWorkerOrWorklet
       OutstandingNetworkRequestOthers
       OutstandingIndexedDBTransaction
-      RequestedGeolocationPermission
       RequestedNotificationsPermission
       RequestedMIDIPermission
       RequestedAudioCapturePermission
```

## Roll protocol to r900357 — _2021-07-12T06:16:08.000Z_
######  Diff: [`db8965f...56bb0ce`](https://github.com/ChromeDevTools/devtools-protocol/compare/db8965f...56bb0ce)

```diff
@@ browser_protocol.pdl:3050 @@ experimental domain DOMSnapshot
       optional array of integer parentIndex
       # `Node`'s nodeType.
       optional array of integer nodeType
+      # Type of the shadow root the `Node` is in. String values are equal to the `ShadowRootType` enum.
+      optional RareStringData shadowRootType
       # `Node`'s nodeName.
       optional array of StringIndex nodeName
       # `Node`'s nodeValue.
```

## Roll protocol to r900033 — _2021-07-09T16:16:22.000Z_
######  Diff: [`cbb20a9...db8965f`](https://github.com/ChromeDevTools/devtools-protocol/compare/cbb20a9...db8965f)

```diff
@@ browser_protocol.pdl:6223 @@ experimental domain Overlay
       optional FlexItemHighlightConfig flexItemHighlightConfig
       # The contrast algorithm to use for the contrast ratio (default: aa).
       optional ContrastAlgorithm contrastAlgorithm
+      # The container query container highlight configuration (default: all transparent).
+      optional ContainerQueryContainerHighlightConfig containerQueryContainerHighlightConfig
 
   type ColorFormat extends string
     enum
@@ -6273,6 +6275,18 @@ experimental domain Overlay
       # The content box highlight outline color (default: transparent).
       optional DOM.RGBA outlineColor
 
+  type ContainerQueryHighlightConfig extends object
+    properties
+      # A descriptor for the highlight appearance of container query containers.
+      ContainerQueryContainerHighlightConfig containerQueryContainerHighlightConfig
+      # Identifier of the container node to highlight.
+      DOM.NodeId nodeId
+
+  type ContainerQueryContainerHighlightConfig extends object
+    properties
+      # The style of the container border
+      optional LineStyle containerBorder
+
   type InspectMode extends string
     enum
       searchForNode
@@ -6438,6 +6452,11 @@ experimental domain Overlay
       # An array of node identifiers and descriptors for the highlight appearance.
       array of ScrollSnapHighlightConfig scrollSnapHighlightConfigs
 
+  command setShowContainerQueryOverlays
+    parameters
+      # An array of node identifiers and descriptors for the highlight appearance.
+      array of ContainerQueryHighlightConfig containerQueryHighlightConfigs
+
   # Requests that backend shows paint rectangles
   command setShowPaintRects
     parameters
```

## Roll protocol to r898382 — _2021-07-02T23:16:12.000Z_
######  Diff: [`b531de2...c935633`](https://github.com/ChromeDevTools/devtools-protocol/compare/b531de2...c935633)

```diff
@@ browser_protocol.pdl:2006 @@ domain DOM
       target-text
       spelling-error
       grammar-error
+      highlight
       first-line-inherited
       scrollbar
       scrollbar-thumb
```

## Roll protocol to r898124 — _2021-07-02T12:16:12.000Z_
######  Diff: [`6814a59...b531de2`](https://github.com/ChromeDevTools/devtools-protocol/compare/6814a59...b531de2)

```diff
@@ browser_protocol.pdl:757 @@ experimental domain Audits
       string url
       optional SourceCodeLocation location
 
+  type WasmCrossOriginModuleSharingIssueDetails extends object
+    properties
+      string wasmModuleUrl
+      string sourceOrigin
+      string targetOrigin
+      boolean isWarning
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -774,6 +781,7 @@ experimental domain Audits
       AttributionReportingIssue
       QuirksModeIssue
       NavigatorUserAgentIssue
+      WasmCrossOriginModuleSharingIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -792,6 +800,7 @@ experimental domain Audits
       optional AttributionReportingIssueDetails attributionReportingIssueDetails
       optional QuirksModeIssueDetails quirksModeIssueDetails
       optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
+      optional WasmCrossOriginModuleSharingIssueDetails wasmCrossOriginModuleSharingIssue
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
```

## Roll protocol to r897295 — _2021-06-30T09:16:16.000Z_
######  Diff: [`65148a9...6814a59`](https://github.com/ChromeDevTools/devtools-protocol/compare/65148a9...6814a59)

```diff
@@ browser_protocol.pdl:4738 @@ domain Network
       # Set for requests when the TrustToken API is used. Contains the parameters
       # passed by the developer (e.g. via "fetch") as understood by the backend.
       experimental optional TrustTokenParams trustTokenParams
+      # True if this resource request is considered to be the 'same site' as the
+      # request correspondinfg to the main frame.
+      experimental optional boolean isSameSite
 
   # Details of a signed certificate timestamp (SCT).
   type SignedCertificateTimestamp extends object
```

## Roll protocol to r896856 — _2021-06-29T11:16:10.000Z_
######  Diff: [`06ee96a...65148a9`](https://github.com/ChromeDevTools/devtools-protocol/compare/06ee96a...65148a9)

```diff
@@ browser_protocol.pdl:1458 @@ experimental domain CSS
       optional SourceRange range
       # Identifier of the stylesheet containing this object (if exists).
       optional StyleSheetId styleSheetId
+      # Optional name for the container.
+      optional string name
 
   # Information about amount of glyphs that were rendered with given font.
   type PlatformFontUsage extends object
@@ -2612,6 +2614,17 @@ domain DOM
       # Id of the node at given coordinates, only when enabled and requested document.
       optional NodeId nodeId
 
+  # Returns the container of the given node based on container query conditions.
+  # If containerName is given, it will find the nearest container with a matching name;
+  # otherwise it will find the nearest container regardless of its container name.
+  experimental command getContainerForNode
+    parameters
+      NodeId nodeId
+      optional string containerName
+    returns
+      # The container node for the given node, or null if not found.
+      optional NodeId nodeId
+
   # Fired when `Element`'s attribute is modified.
   event attributeModified
     parameters
```

## Roll protocol to r896125 — _2021-06-25T18:16:15.000Z_
######  Diff: [`6362220...06ee96a`](https://github.com/ChromeDevTools/devtools-protocol/compare/6362220...06ee96a)

```diff
@@ browser_protocol.pdl:4725 @@ domain Network
       # Set for requests when the TrustToken API is used. Contains the parameters
       # passed by the developer (e.g. via "fetch") as understood by the backend.
       experimental optional TrustTokenParams trustTokenParams
-      # True if this resource request is considered to be the 'same site' as the
-      # request correspondinfg to the main frame.
-      experimental optional boolean isSameSite
 
   # Details of a signed certificate timestamp (SCT).
   type SignedCertificateTimestamp extends object
```

## Roll protocol to r896035 — _2021-06-25T14:16:07.000Z_
######  Diff: [`95234d8...6362220`](https://github.com/ChromeDevTools/devtools-protocol/compare/95234d8...6362220)

```diff
@@ browser_protocol.pdl:4725 @@ domain Network
       # Set for requests when the TrustToken API is used. Contains the parameters
       # passed by the developer (e.g. via "fetch") as understood by the backend.
       experimental optional TrustTokenParams trustTokenParams
+      # True if this resource request is considered to be the 'same site' as the
+      # request correspondinfg to the main frame.
+      experimental optional boolean isSameSite
 
   # Details of a signed certificate timestamp (SCT).
   type SignedCertificateTimestamp extends object
```

## Roll protocol to r895982 — _2021-06-25T10:16:12.000Z_
######  Diff: [`6544760...95234d8`](https://github.com/ChromeDevTools/devtools-protocol/compare/6544760...95234d8)

```diff
@@ browser_protocol.pdl:793 @@ experimental domain Audits
       optional QuirksModeIssueDetails quirksModeIssueDetails
       optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
 
+  # A unique id for a DevTools inspector issue. Allows other entities (e.g.
+  # exceptions, CDP message, console messages, etc.) to reference an issue.
+  type IssueId extends string
+
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
     properties
@@ -800,7 +804,7 @@ experimental domain Audits
       InspectorIssueDetails details
       # A unique id for this issue. May be omitted if no other entity (e.g.
       # exception, CDP message, etc.) is referencing this issue.
-      optional string issueId
+      optional IssueId issueId
 
   # Returns the response body and size if it were re-encoded with the specified settings. Only
   # applies to images.
```

## Roll protocol to r894467 — _2021-06-22T00:16:13.000Z_
######  Diff: [`aaf1569...6544760`](https://github.com/ChromeDevTools/devtools-protocol/compare/aaf1569...6544760)

```diff
@@ browser_protocol.pdl:1265 @@ experimental domain CSS
       StyleSheetId styleSheetId
       # Owner frame identifier.
       Page.FrameId frameId
-      # Stylesheet resource URL.
+      # Stylesheet resource URL. Empty if this is a constructed stylesheet created using
+      # new CSSStyleSheet() (but non-empty if this is a constructed sylesheet imported
+      # as a CSS module script).
       string sourceURL
       # URL of source map associated with the stylesheet (if any).
       optional string sourceMapURL
@@ -1287,7 +1289,8 @@ experimental domain CSS
       # <link> element's stylesheets become mutable only if DevTools modifies them.
       # Constructed stylesheets (new CSSStyleSheet()) are mutable immediately after creation.
       boolean isMutable
-      # Whether this stylesheet is a constructed stylesheet (created using new CSSStyleSheet()).
+      # True if this stylesheet is created through new CSSStyleSheet() or imported as a
+      # CSS module script.
       boolean isConstructed
       # Line offset of the stylesheet within the resource (zero based).
       number startLine
```

## Roll protocol to r894172 — _2021-06-21T08:16:09.000Z_
######  Diff: [`fe543d9...aaf1569`](https://github.com/ChromeDevTools/devtools-protocol/compare/fe543d9...aaf1569)

```diff
@@ browser_protocol.pdl:7686 @@ domain Page
       BrowsingInstanceNotSwapped
       BackForwardCacheDisabledForDelegate
       OptInUnloadHeaderNotPresent
-      UnloadHandlerExistsInMainFrame
       UnloadHandlerExistsInSubFrame
       ServiceWorkerUnregistration
       #Blocklisted features
```

## Roll protocol to r894033 — _2021-06-19T00:16:28.000Z_
######  Diff: [`e7ab713...fe543d9`](https://github.com/ChromeDevTools/devtools-protocol/compare/e7ab713...fe543d9)

```diff
@@ browser_protocol.pdl:6546 @@ domain Page
       ch-rtt
       ch-ua
       ch-ua-arch
+      ch-ua-bitness
       ch-ua-platform
       ch-ua-model
       ch-ua-mobile
```

## Roll protocol to r894020 — _2021-06-18T23:16:01.000Z_
######  Diff: [`6abba71...e7ab713`](https://github.com/ChromeDevTools/devtools-protocol/compare/6abba71...e7ab713)

```diff
@@ browser_protocol.pdl:6971 @@ domain Page
       optional enum format
         jpeg
         png
+        webp
       # Compression quality from range [0..100] (jpeg only).
       optional integer quality
       # Capture the screenshot of a given region only.
```

## Roll protocol to r893712 — _2021-06-18T06:16:15.000Z_
######  Diff: [`7ad22bc...6abba71`](https://github.com/ChromeDevTools/devtools-protocol/compare/7ad22bc...6abba71)

```diff
@@ browser_protocol.pdl:7694 @@ domain Page
       MainResourceHasCacheControlNoCache
       SubresourceHasCacheControlNoStore
       SubresourceHasCacheControlNoCache
-      PageShowEventListener
-      PageHideEventListener
-      BeforeUnloadEventListener
-      UnloadEventListener
-      FreezeEventListener
-      ResumeEventListener
       ContainsPlugins
       DocumentLoaded
       DedicatedWorkerOrWorklet
```

## Roll protocol to r892514 — _2021-06-15T10:16:15.000Z_
######  Diff: [`042399a...7ad22bc`](https://github.com/ChromeDevTools/devtools-protocol/compare/042399a...7ad22bc)

```diff
@@ browser_protocol.pdl:7686 @@ domain Page
       OptInUnloadHeaderNotPresent
       UnloadHandlerExistsInMainFrame
       UnloadHandlerExistsInSubFrame
-      # Blocklisted features
+      ServiceWorkerUnregistration
+      #Blocklisted features
       WebSocket
       WebRTC
       MainResourceHasCacheControlNoStore
```

## Roll protocol to r892366 — _2021-06-15T01:16:09.000Z_
######  Diff: [`6286308...042399a`](https://github.com/ChromeDevTools/devtools-protocol/compare/6286308...042399a)

```diff
@@ browser_protocol.pdl:7713 @@ domain Page
       RequestedBackgroundWorkPermission
       BroadcastChannel
       IndexedDBConnection
-      WebVR
       WebXR
       SharedWorker
       WebLocks
```

## Roll protocol to r892017 — _2021-06-14T10:15:55.000Z_
######  Diff: [`077a282...6286308`](https://github.com/ChromeDevTools/devtools-protocol/compare/077a282...6286308)

```diff
@@ browser_protocol.pdl:6487 @@ domain Page
       # This frame is the root of an ad frame.
       root
 
+  experimental type AdFrameExplanation extends string
+    enum
+      ParentIsAd
+      CreatedByAdScript
+      MatchedBlockingRule
+
+  # Indicates whether a frame has been identified as an ad and why.
+  experimental type AdFrameStatus extends object
+    properties
+      AdFrameType adFrameType
+      optional array of AdFrameExplanation explanations
+
   # Indicates whether the frame is a secure context and why it is the case.
   experimental type SecureContextType extends string
     enum
@@ -6675,8 +6687,8 @@ domain Page
       string mimeType
       # If the frame failed to load, this contains the URL that could not be loaded. Note that unlike url above, this URL may contain a fragment.
       experimental optional string unreachableUrl
-      # Indicates whether this frame was tagged as an ad.
-      experimental optional AdFrameType adFrameType
+      # Indicates whether this frame was tagged as an ad and why.
+      experimental optional AdFrameStatus adFrameStatus
       # Indicates whether the main document is a secure context and explains why that is the case.
       experimental SecureContextType secureContextType
       # Indicates whether this is a cross origin isolated context.
```

## Roll protocol to r891247 — _2021-06-10T16:16:15.000Z_
######  Diff: [`28c241d...077a282`](https://github.com/ChromeDevTools/devtools-protocol/compare/28c241d...077a282)

```diff
@@ browser_protocol.pdl:7625 @@ domain Page
       string name
       Network.MonotonicTime timestamp
 
+  # List of not restored reasons for back-forward cache.
+  experimental type BackForwardCacheNotRestoredReason extends string
+    enum
+      NotMainFrame
+      BackForwardCacheDisabled
+      RelatedActiveContentsExist
+      HTTPStatusNotOK
+      SchemeNotHTTPOrHTTPS
+      Loading
+      WasGrantedMediaAccess
+      DisableForRenderFrameHostCalled
+      DomainNotAllowed
+      HTTPMethodNotGET
+      SubframeIsNavigating
+      Timeout
+      CacheLimit
+      JavaScriptExecution
+      RendererProcessKilled
+      RendererProcessCrashed
+      GrantedMediaStreamAccess
+      SchedulerTrackedFeatureUsed
+      ConflictingBrowsingInstance
+      CacheFlushed
+      ServiceWorkerVersionActivation
+      SessionRestored
+      ServiceWorkerPostMessage
+      EnteredBackForwardCacheBeforeServiceWorkerHostAdded
+      RenderFrameHostReused_SameSite
+      RenderFrameHostReused_CrossSite
+      ServiceWorkerClaim
+      IgnoreEventAndEvict
+      HaveInnerContents
+      TimeoutPuttingInCache
+      BackForwardCacheDisabledByLowMemory
+      BackForwardCacheDisabledByCommandLine
+      NetworkRequestDatapipeDrainedAsBytesConsumer
+      NetworkRequestRedirected
+      NetworkRequestTimeout
+      NetworkExceedsBufferLimit
+      NavigationCancelledWhileRestoring
+      NotMostRecentNavigationEntry
+      BackForwardCacheDisabledForPrerender
+      UserAgentOverrideDiffers
+      ForegroundCacheLimit
+      BrowsingInstanceNotSwapped
+      BackForwardCacheDisabledForDelegate
+      OptInUnloadHeaderNotPresent
+      UnloadHandlerExistsInMainFrame
+      UnloadHandlerExistsInSubFrame
+      # Blocklisted features
+      WebSocket
+      WebRTC
+      MainResourceHasCacheControlNoStore
+      MainResourceHasCacheControlNoCache
+      SubresourceHasCacheControlNoStore
+      SubresourceHasCacheControlNoCache
+      PageShowEventListener
+      PageHideEventListener
+      BeforeUnloadEventListener
+      UnloadEventListener
+      FreezeEventListener
+      ResumeEventListener
+      ContainsPlugins
+      DocumentLoaded
+      DedicatedWorkerOrWorklet
+      OutstandingNetworkRequestOthers
+      OutstandingIndexedDBTransaction
+      RequestedGeolocationPermission
+      RequestedNotificationsPermission
+      RequestedMIDIPermission
+      RequestedAudioCapturePermission
+      RequestedVideoCapturePermission
+      RequestedBackForwardCacheBlockedSensors
+      RequestedBackgroundWorkPermission
+      BroadcastChannel
+      IndexedDBConnection
+      WebVR
+      WebXR
+      SharedWorker
+      WebLocks
+      WebHID
+      WebShare
+      RequestedStorageAccessGrant
+      WebNfc
+      WebFileSystem
+      OutstandingNetworkRequestFetch
+      OutstandingNetworkRequestXHR
+      AppBanner
+      Printing
+      WebDatabase
+      PictureInPicture
+      Portal
+      SpeechRecognizer
+      IdleManager
+      PaymentManager
+      SpeechSynthesis
+      KeyboardLock
+      WebOTPService
+      OutstandingNetworkRequestDirectSocket
+      IsolatedWorldScript
+      InjectedStyleSheet
+      MediaSessionImplOnServiceCreated
+      Unknown
+
+  # Types of not restored reasons for back-forward cache.
+  experimental type BackForwardCacheNotRestoredReasonType extends string
+    enum
+      SupportPending
+      PageSupportNeeded
+      Circumstantial
+
+  experimental type BackForwardCacheNotRestoredExplanation extends object
+    properties
+      # Type of the reason
+      BackForwardCacheNotRestoredReasonType type
+      # Not restored reason
+      BackForwardCacheNotRestoredReason reason
+
   # Fired for failed bfcache history navigations if BackForwardCache feature is enabled. Do
   # not assume any ordering with the Page.frameNavigated event. This event is fired only for
   # main-frame history navigation where the document changes (non-same-document navigations),
@@ -7635,6 +7753,8 @@ domain Page
       Network.LoaderId loaderId
       # The frame id of the associated frame.
       FrameId frameId
+      # Array of reasons why the page could not be cached. This must not be empty.
+      array of BackForwardCacheNotRestoredExplanation notRestoredExplanations
 
   event loadEventFired
     parameters
```

## Roll protocol to r891108 — _2021-06-10T06:16:17.000Z_
######  Diff: [`cbc2ddb...28c241d`](https://github.com/ChromeDevTools/devtools-protocol/compare/cbc2ddb...28c241d)

```diff
@@ browser_protocol.pdl:5546 @@ domain Network
       # Cookies to be set.
       array of CookieParam cookies
 
-  # For testing.
-  experimental command setDataSizeLimitsForTest
-    parameters
-      # Maximum total buffer size.
-      integer maxTotalSize
-      # Maximum per-resource size.
-      integer maxResourceSize
-
   # Specifies whether to always send extra HTTP headers with the requests from this page.
   command setExtraHTTPHeaders
     parameters
```

## Roll protocol to r890975 — _2021-06-09T22:17:50.000Z_
######  Diff: [`bfcd0a3...cbc2ddb`](https://github.com/ChromeDevTools/devtools-protocol/compare/bfcd0a3...cbc2ddb)

```diff
@@ browser_protocol.pdl:1698 @@ experimental domain CSS
       # The resulting CSS media rule after modification.
       CSSMedia media
 
+  # Modifies the expression of a container query.
+  experimental command setContainerQueryText
+    parameters
+      StyleSheetId styleSheetId
+      SourceRange range
+      string text
+    returns
+      # The resulting CSS container query rule after modification.
+      CSSContainerQuery containerQuery
+
   # Modifies the rule selector.
   command setRuleSelector
     parameters
```

## Roll protocol to r888392 — _2021-06-02T11:16:05.000Z_
######  Diff: [`564611d...bfcd0a3`](https://github.com/ChromeDevTools/devtools-protocol/compare/564611d...bfcd0a3)

```diff
@@ browser_protocol.pdl:1315 @@ experimental domain CSS
       # Media list array (for rules involving media queries). The array enumerates media queries
       # starting with the innermost one, going outwards.
       optional array of CSSMedia media
+      # Container query list array (for rules involving container queries).
+      # The array enumerates container queries starting with the innermost one, going outwards.
+      experimental optional array of CSSContainerQuery containerQueries
 
   # CSS coverage information.
   type RuleUsage extends object
@@ -1438,6 +1441,17 @@ experimental domain CSS
       # Computed length of media query expression (if applicable).
       optional number computedLength
 
+  # CSS container query rule descriptor.
+  experimental type CSSContainerQuery extends object
+    properties
+      # Container query text.
+      string text
+      # The associated rule header range in the enclosing stylesheet (if
+      # available).
+      optional SourceRange range
+      # Identifier of the stylesheet containing this object (if exists).
+      optional StyleSheetId styleSheetId
+
   # Information about amount of glyphs that were rendered with given font.
   type PlatformFontUsage extends object
     properties
```

## Roll protocol to r887728 — _2021-05-31T12:16:11.000Z_
######  Diff: [`76e104a...564611d`](https://github.com/ChromeDevTools/devtools-protocol/compare/76e104a...564611d)

```diff
@@ browser_protocol.pdl:5968 @@ domain Network
   experimental type CrossOriginEmbedderPolicyValue extends string
     enum
       None
-      CorsOrCredentialless
+      Credentialless
       RequireCorp
 
   experimental type CrossOriginEmbedderPolicyStatus extends object
```

## Roll protocol to r887710 — _2021-05-31T11:16:13.000Z_
######  Diff: [`d440402...76e104a`](https://github.com/ChromeDevTools/devtools-protocol/compare/d440402...76e104a)

```diff
@@ browser_protocol.pdl:798 @@ experimental domain Audits
     properties
       InspectorIssueCode code
       InspectorIssueDetails details
+      # A unique id for this issue. May be omitted if no other entity (e.g.
+      # exception, CDP message, etc.) is referencing this issue.
+      optional string issueId
 
   # Returns the response body and size if it were re-encoded with the specified settings. Only
   # applies to images.
```

## Roll protocol to r887064 — _2021-05-27T07:16:11.000Z_
######  Diff: [`35ec89b...d440402`](https://github.com/ChromeDevTools/devtools-protocol/compare/35ec89b...d440402)

```diff
@@ browser_protocol.pdl:509 @@ experimental domain Audits
       ExcludeSameSiteNoneInsecure
       ExcludeSameSiteLax
       ExcludeSameSiteStrict
+      ExcludeInvalidSameParty
 
   type SameSiteCookieWarningReason extends string
     enum
@@ -531,7 +532,12 @@ experimental domain Audits
   # information without the cookie.
   type SameSiteCookieIssueDetails extends object
     properties
-      AffectedCookie cookie
+      # If AffectedCookie is not set then rawCookieLine contains the raw
+      # Set-Cookie header string. This hints at a problem where the
+      # cookie line is syntactically or semantically malformed in a way
+      # that no valid cookie could be created.
+      optional AffectedCookie cookie
+      optional string rawCookieLine
       array of SameSiteCookieWarningReason cookieWarningReasons
       array of SameSiteCookieExclusionReason cookieExclusionReasons
       # Optionally identifies the site-for-cookies and the cookie url, which
```

## Roll protocol to r885657 — _2021-05-21T21:16:03.000Z_
######  Diff: [`d9ce37e...35ec89b`](https://github.com/ChromeDevTools/devtools-protocol/compare/d9ce37e...35ec89b)

```diff
@@ browser_protocol.pdl:5898 @@ domain Network
       # The number of obtained Trust Tokens on a successful "Issuance" operation.
       optional integer issuedTokenCount
 
+  # Fired once when parsing the .wbn file has succeeded.
+  # The event contains the information about the web bundle contents.
+  experimental event subresourceWebBundleMetadataReceived
+    parameters
+      # Request identifier. Used to match this information to another event.
+      RequestId requestId
+      # A list of URLs of resources in the subresource Web Bundle.
+      array of string urls
+
+  # Fired once when parsing the .wbn file has failed.
+  experimental event subresourceWebBundleMetadataError
+    parameters
+      # Request identifier. Used to match this information to another event.
+      RequestId requestId
+      # Error message
+      string errorMessage
+
+  # Fired when handling requests for resources within a .wbn file.
+  # Note: this will only be fired for resources that are requested by the webpage.
+  experimental event subresourceWebBundleInnerResponseParsed
+    parameters
+      # Request identifier of the subresource request
+      RequestId innerRequestId
+      # URL of the subresource resource.
+      string innerRequestURL
+      # Bundle request identifier. Used to match this information to another event.
+      # This made be absent in case when the instrumentation was enabled only
+      # after webbundle was parsed.
+      optional RequestId bundleRequestId
+
+  # Fired when request for resources within a .wbn file failed.
+  experimental event subresourceWebBundleInnerResponseError
+    parameters
+      # Request identifier of the subresource request
+      RequestId innerRequestId
+      # URL of the subresource resource.
+      string innerRequestURL
+      # Error message
+      string errorMessage
+      # Bundle request identifier. Used to match this information to another event.
+      # This made be absent in case when the instrumentation was enabled only
+      # after webbundle was parsed.
+      optional RequestId bundleRequestId
+
   experimental type CrossOriginOpenerPolicyValue extends string
     enum
       SameOrigin
```

## Roll protocol to r884712 — _2021-05-19T22:16:10.000Z_
######  Diff: [`dfcf9be...d9ce37e`](https://github.com/ChromeDevTools/devtools-protocol/compare/dfcf9be...d9ce37e)

```diff
@@ browser_protocol.pdl:8758 @@ domain Fetch
 
   # Stages of the request to handle. Request will intercept before the request is
   # sent. Response will intercept after the response is received (but before response
-  # body is received.
+  # body is received).
   type RequestStage extends string
     enum
       Request
```

## Roll protocol to r884484 — _2021-05-19T15:16:15.000Z_
######  Diff: [`f8d7e27...dfcf9be`](https://github.com/ChromeDevTools/devtools-protocol/compare/f8d7e27...dfcf9be)

```diff
@@ browser_protocol.pdl:746 @@ experimental domain Audits
       Page.FrameId frameId
       Network.LoaderId loaderId
 
+  type NavigatorUserAgentIssueDetails extends object
+    properties
+      string url
+      optional SourceCodeLocation location
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -762,6 +767,7 @@ experimental domain Audits
       CorsIssue
       AttributionReportingIssue
       QuirksModeIssue
+      NavigatorUserAgentIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -779,6 +785,7 @@ experimental domain Audits
       optional CorsIssueDetails corsIssueDetails
       optional AttributionReportingIssueDetails attributionReportingIssueDetails
       optional QuirksModeIssueDetails quirksModeIssueDetails
+      optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r884179 — _2021-05-18T22:16:18.000Z_
######  Diff: [`bc63f36...f8d7e27`](https://github.com/ChromeDevTools/devtools-protocol/compare/bc63f36...f8d7e27)

```diff
@@ browser_protocol.pdl:6499 @@ domain Page
       usb
       vertical-scroll
       web-share
+      window-placement
       xr-spatial-tracking
 
   # Reason for a permissions policy feature to be disabled.
```

## Roll protocol to r883894 — _2021-05-18T11:16:08.000Z_
######  Diff: [`56b0f11...bc63f36`](https://github.com/ChromeDevTools/devtools-protocol/compare/56b0f11...bc63f36)

```diff
@@ browser_protocol.pdl:6441 @@ domain Page
       PerformanceProfile
 
   # All Permissions Policy features. This enum should match the one defined
-  # in renderer/core/feature_policy/feature_policy_features.json5.
+  # in third_party/blink/renderer/core/permissions_policy/permissions_policy_features.json5.
   experimental type PermissionsPolicyFeature extends string
     enum
       accelerometer
@@ -6454,6 +6454,7 @@ domain Page
       ch-downlink
       ch-ect
       ch-lang
+      ch-prefers-color-scheme
       ch-rtt
       ch-ua
       ch-ua-arch
```

## Roll protocol to r883449 — _2021-05-17T13:16:08.000Z_
######  Diff: [`ea8402f...56b0f11`](https://github.com/ChromeDevTools/devtools-protocol/compare/ea8402f...56b0f11)

```diff
@@ browser_protocol.pdl:1965 @@ domain DOM
       open
       closed
 
+  # Document compatibility mode.
+  type CompatibilityMode extends string
+    enum
+      QuirksMode
+      LimitedQuirksMode
+      NoQuirksMode
+
   # DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes.
   # DOMNode is a base node mirror type.
   type Node extends object
@@ -2029,6 +2036,7 @@ domain DOM
       optional array of BackendNode distributedNodes
       # Whether the node is SVG.
       optional boolean isSVG
+      optional CompatibilityMode compatibilityMode
 
   # A structure holding an RGBA color.
   type RGBA extends object
```

## Roll protocol to r882987 — _2021-05-14T16:16:22.000Z_
######  Diff: [`96c89c5...ea8402f`](https://github.com/ChromeDevTools/devtools-protocol/compare/96c89c5...ea8402f)

```diff
@@ browser_protocol.pdl:6438 @@ domain Page
     enum
       accelerometer
       ambient-light-sensor
+      attribution-reporting
       autoplay
       camera
       ch-dpr
@@ -6457,7 +6458,6 @@ domain Page
       ch-width
       clipboard-read
       clipboard-write
-      conversion-measurement
       cross-origin-isolated
       direct-sockets
       display-capture
```

## Roll protocol to r882921 — _2021-05-14T09:16:15.000Z_
######  Diff: [`56788fe...96c89c5`](https://github.com/ChromeDevTools/devtools-protocol/compare/56788fe...96c89c5)

```diff
@@ browser_protocol.pdl:711 @@ experimental domain Audits
       Network.CorsErrorStatus corsErrorStatus
       boolean isWarning
       AffectedRequest request
+      optional SourceCodeLocation location
       optional string initiatorOrigin
       optional Network.IPAddressSpace resourceIPAddressSpace
       optional Network.ClientSecurityState clientSecurityState
@@ -4771,6 +4772,7 @@ domain Network
       HeaderDisallowedByPreflightResponse
       RedirectContainsCredentials
       InsecurePrivateNetwork
+      NoCorsRedirectModeNotFollow
 
   type CorsErrorStatus extends object
     properties
```

## Roll protocol to r882324 — _2021-05-12T22:16:51.000Z_
######  Diff: [`9062efe...56788fe`](https://github.com/ChromeDevTools/devtools-protocol/compare/9062efe...56788fe)

```diff
@@ browser_protocol.pdl:733 @@ experimental domain Audits
       optional DOM.BackendNodeId violatingNodeId
       optional string invalidParameter
 
+# Details for issues about documents in Quirks Mode
+# or Limited Quirks Mode that affects page layouting.
+  type QuirksModeIssueDetails extends object
+    properties
+      # If false, it means the document's mode is "quirks"
+      # instead of "limited-quirks".
+      boolean isLimitedQuirksMode
+      DOM.BackendNodeId documentNodeId
+      string url
+      Page.FrameId frameId
+      Network.LoaderId loaderId
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -748,6 +760,7 @@ experimental domain Audits
       LowTextContrastIssue
       CorsIssue
       AttributionReportingIssue
+      QuirksModeIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -764,6 +777,7 @@ experimental domain Audits
       optional LowTextContrastIssueDetails lowTextContrastIssueDetails
       optional CorsIssueDetails corsIssueDetails
       optional AttributionReportingIssueDetails attributionReportingIssueDetails
+      optional QuirksModeIssueDetails quirksModeIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r882098 — _2021-05-12T16:16:24.000Z_
######  Diff: [`8ce157a...9062efe`](https://github.com/ChromeDevTools/devtools-protocol/compare/8ce157a...9062efe)

```diff
@@ browser_protocol.pdl:733 @@ experimental domain Audits
       optional DOM.BackendNodeId violatingNodeId
       optional string invalidParameter
 
-# Details for issues about documents in Quirks Mode
-# or Limited Quirks Mode that affects page layouting.
-  type QuirksModeIssueDetails extends object
-    properties
-      # If false, it means the document's mode is "quirks"
-      # instead of "limited-quirks".
-      boolean isLimitedQuirksMode
-      DOM.BackendNodeId documentNodeId
-      string url
-      Page.FrameId frameId
-      Network.LoaderId loaderId
-
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -760,7 +748,6 @@ experimental domain Audits
       LowTextContrastIssue
       CorsIssue
       AttributionReportingIssue
-      QuirksModeIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -777,7 +764,6 @@ experimental domain Audits
       optional LowTextContrastIssueDetails lowTextContrastIssueDetails
       optional CorsIssueDetails corsIssueDetails
       optional AttributionReportingIssueDetails attributionReportingIssueDetails
-      optional QuirksModeIssueDetails quirksModeIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r881485 — _2021-05-11T11:16:33.000Z_
######  Diff: [`febcae4...8ce157a`](https://github.com/ChromeDevTools/devtools-protocol/compare/febcae4...8ce157a)

```diff
@@ browser_protocol.pdl:733 @@ experimental domain Audits
       optional DOM.BackendNodeId violatingNodeId
       optional string invalidParameter
 
+# Details for issues about documents in Quirks Mode
+# or Limited Quirks Mode that affects page layouting.
+  type QuirksModeIssueDetails extends object
+    properties
+      # If false, it means the document's mode is "quirks"
+      # instead of "limited-quirks".
+      boolean isLimitedQuirksMode
+      DOM.BackendNodeId documentNodeId
+      string url
+      Page.FrameId frameId
+      Network.LoaderId loaderId
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -748,6 +760,7 @@ experimental domain Audits
       LowTextContrastIssue
       CorsIssue
       AttributionReportingIssue
+      QuirksModeIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -764,6 +777,7 @@ experimental domain Audits
       optional LowTextContrastIssueDetails lowTextContrastIssueDetails
       optional CorsIssueDetails corsIssueDetails
       optional AttributionReportingIssueDetails attributionReportingIssueDetails
+      optional QuirksModeIssueDetails quirksModeIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r881010 — _2021-05-10T16:16:13.000Z_
######  Diff: [`a81e89d...febcae4`](https://github.com/ChromeDevTools/devtools-protocol/compare/a81e89d...febcae4)

```diff
@@ browser_protocol.pdl:6495 @@ domain Page
       boolean allowed
       optional PermissionsPolicyBlockLocator locator
 
+  # Origin Trial(https://www.chromium.org/blink/origin-trials) support.
+  # Status for an Origin Trial token.
+  experimental type OriginTrialTokenStatus extends string
+    enum
+      Success
+      NotSupported
+      Insecure
+      Expired
+      WrongOrigin
+      InvalidSignature
+      Malformed
+      WrongVersion
+      FeatureDisabled
+      TokenDisabled
+      FeatureDisabledForUser
+
+  # Status for an Origin Trial.
+  experimental type OriginTrialStatus extends string
+    enum
+      Enabled
+      ValidTokenNotProvided
+      OSNotSupported
+      TrialNotAllowed
+
+  experimental type OriginTrialUsageRestriction extends string
+    enum
+      None
+      Subset
+
+  experimental type OriginTrialToken extends object
+    properties
+      string origin
+      boolean matchSubDomains
+      string trialName
+      Network.TimeSinceEpoch expiryTime
+      boolean isThirdParty
+      OriginTrialUsageRestriction usageRestriction
+
+  experimental type OriginTrialTokenWithStatus extends object
+    properties
+      string rawTokenText
+      # `parsedToken` is present only when the token is extractable and
+      # parsable.
+      optional OriginTrialToken parsedToken
+      OriginTrialTokenStatus status
+
+  experimental type OriginTrial extends object
+    properties
+      string trialName
+      OriginTrialStatus status
+      array of OriginTrialTokenWithStatus tokensWithStatus
+
   # Information about the Frame on the page.
   type Frame extends object
     properties
@@ -6529,6 +6581,8 @@ domain Page
       experimental CrossOriginIsolatedContextType crossOriginIsolatedContextType
       # Indicated which gated APIs / features are available.
       experimental array of GatedAPIFeatures gatedAPIFeatures
+      # Frame document's origin trials with at least one token present.
+      experimental optional array of OriginTrial originTrials
 
   # Information about the Resource on the page.
   experimental type FrameResource extends object
```

## Roll protocol to r880455 — _2021-05-07T17:16:12.000Z_
######  Diff: [`2dd45d5...a81e89d`](https://github.com/ChromeDevTools/devtools-protocol/compare/2dd45d5...a81e89d)

```diff
@@ browser_protocol.pdl:6443 @@ domain Page
       clipboard-write
       conversion-measurement
       cross-origin-isolated
+      direct-sockets
       display-capture
       document-domain
       encrypted-media
```

## Roll protocol to r878340 — _2021-05-03T08:16:03.000Z_
######  Diff: [`08981cb...2dd45d5`](https://github.com/ChromeDevTools/devtools-protocol/compare/08981cb...2dd45d5)

```diff
@@ browser_protocol.pdl:6785 @@ domain Page
       # This world name will be used as the ExecutionContextDescription::name when the corresponding
       # event is emitted.
       experimental optional string worldName
+      # Specifies whether command line API should be available to the script, defaults
+      # to false.
+      experimental optional boolean includeCommandLineAPI
     returns
       # Identifier of the added script.
       ScriptIdentifier identifier
```

## Roll protocol to r878026 — _2021-04-30T19:16:18.000Z_
######  Diff: [`c3a5cc5...08981cb`](https://github.com/ChromeDevTools/devtools-protocol/compare/c3a5cc5...08981cb)

```diff
@@ browser_protocol.pdl:5144 @@ domain Network
   # Request pattern for interception.
   experimental type RequestPattern extends object
     properties
-      # Wildcards ('*' -> zero or more, '?' -> exactly one) are allowed. Escape character is
-      # backslash. Omitting is equivalent to "*".
+      # Wildcards (`'*'` -> zero or more, `'?'` -> exactly one) are allowed. Escape character is
+      # backslash. Omitting is equivalent to `"*"`.
       optional string urlPattern
       # If set, only requests for matching resource types will be intercepted.
       optional ResourceType resourceType
@@ -8675,8 +8675,8 @@ domain Fetch
 
   type RequestPattern extends object
     properties
-      # Wildcards ('*' -> zero or more, '?' -> exactly one) are allowed. Escape character is
-      # backslash. Omitting is equivalent to "*".
+      # Wildcards (`'*'` -> zero or more, `'?'` -> exactly one) are allowed. Escape character is
+      # backslash. Omitting is equivalent to `"*"`.
       optional string urlPattern
       # If set, only requests for matching resource types will be intercepted.
       optional Network.ResourceType resourceType
```

## Roll protocol to r877890 — _2021-04-30T13:16:13.000Z_
######  Diff: [`987bbb1...c3a5cc5`](https://github.com/ChromeDevTools/devtools-protocol/compare/987bbb1...c3a5cc5)

```diff
@@ browser_protocol.pdl:6466 @@ domain Page
       publickey-credentials-get
       screen-wake-lock
       serial
+      shared-autofill
       storage-access-api
       sync-xhr
       trust-token-redemption
```

## Roll protocol to r876958 — _2021-04-28T08:16:04.000Z_
######  Diff: [`7eb19da...987bbb1`](https://github.com/ChromeDevTools/devtools-protocol/compare/7eb19da...987bbb1)

```diff
@@ browser_protocol.pdl:718 @@ experimental domain Audits
   type AttributionReportingIssueType extends string
     enum
       PermissionPolicyDisabled
+      InvalidAttributionSourceEventId
       InvalidAttributionData
       AttributionSourceUntrustworthyOrigin
+      AttributionUntrustworthyOrigin
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
```

## Roll protocol to r876535 — _2021-04-27T11:16:08.000Z_
######  Diff: [`ce4cfab...7eb19da`](https://github.com/ChromeDevTools/devtools-protocol/compare/ce4cfab...7eb19da)

```diff
@@ browser_protocol.pdl:719 @@ experimental domain Audits
     enum
       PermissionPolicyDisabled
       InvalidAttributionData
+      AttributionSourceUntrustworthyOrigin
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
```

## Roll protocol to r876073 — _2021-04-26T08:16:05.000Z_
######  Diff: [`8676f73...ce4cfab`](https://github.com/ChromeDevTools/devtools-protocol/compare/8676f73...ce4cfab)

```diff
@@ browser_protocol.pdl:668 @@ experimental domain Audits
       CreationIssue
 
   # Details for a issue arising from an SAB being instantiated in, or
-  # transfered to a context that is not cross-origin isolated.
+  # transferred to a context that is not cross-origin isolated.
   type SharedArrayBufferIssueDetails extends object
     properties
       SourceCodeLocation sourceCodeLocation
@@ -1001,7 +1001,7 @@ domain Browser
         default
       # BrowserContext to set download behavior. When omitted, default browser context is used.
       optional BrowserContextID browserContextId
-      # The default path to save downloaded files to. This is requred if behavior is set to 'allow'
+      # The default path to save downloaded files to. This is required if behavior is set to 'allow'
       # or 'allowAndName'.
       optional string downloadPath
       # Whether to emit download events (defaults to false).
@@ -2591,10 +2591,10 @@ domain DOM
       # Id of the node that has been removed.
       NodeId nodeId
 
-  # Called when distrubution is changed.
+  # Called when distribution is changed.
   experimental event distributedNodesUpdated
     parameters
-      # Insertion point where distrubuted nodes were updated.
+      # Insertion point where distributed nodes were updated.
       NodeId insertionPointId
       # Distributed nodes for given insertion point.
       array of BackendNode distributedNodes
@@ -3279,10 +3279,10 @@ domain Emulation
       # True if emulation is supported.
       boolean result
 
-  # Clears the overriden device metrics.
+  # Clears the overridden device metrics.
   command clearDeviceMetricsOverride
 
-  # Clears the overriden Geolocation Position and Error.
+  # Clears the overridden Geolocation Position and Error.
   command clearGeolocationOverride
 
   # Requests that page scale factor is reset to initial values.
@@ -3444,7 +3444,7 @@ domain Emulation
       # If set the virtual time policy change should be deferred until any frame starts navigating.
       # Note any previous deferred policy change is superseded.
       optional boolean waitForNavigation
-      # If set, base::Time::Now will be overriden to initially return this value.
+      # If set, base::Time::Now will be overridden to initially return this value.
       optional Network.TimeSinceEpoch initialVirtualTime
     returns
       # Absolute timestamp at which virtual time was first enabled (up time in milliseconds).
@@ -3560,7 +3560,7 @@ experimental domain HeadlessExperimental
 # Input/Output operations for streams produced by DevTools.
 domain IO
 
-  # This is either obtained from another method or specifed as `blob:&lt;uuid&gt;` where
+  # This is either obtained from another method or specified as `blob:&lt;uuid&gt;` where
   # `&lt;uuid&gt` is an UUID of a Blob.
   type StreamHandle extends string
 
@@ -3585,7 +3585,7 @@ domain IO
       optional boolean base64Encoded
       # Data that were read.
       string data
-      # Set if the end-of-file condition occured while reading.
+      # Set if the end-of-file condition occurred while reading.
       boolean eof
 
   # Return UUID of Blob object specified by a remote object id.
@@ -5146,7 +5146,7 @@ domain Network
       optional string urlPattern
       # If set, only requests for matching resource types will be intercepted.
       optional ResourceType resourceType
-      # Stage at wich to begin intercepting requests. Default is Request.
+      # Stage at which to begin intercepting requests. Default is Request.
       optional InterceptionStage interceptionStage
 
   # Information about a signed exchange signature.
@@ -6818,7 +6818,7 @@ domain Page
       # Serialized page data.
       string data
 
-  # Clears the overriden device metrics.
+  # Clears the overridden device metrics.
   experimental deprecated command clearDeviceMetricsOverride
     # Use 'Emulation.clearDeviceMetricsOverride' instead
     redirect Emulation
@@ -6828,7 +6828,7 @@ domain Page
     # Use 'DeviceOrientation.clearDeviceOrientationOverride' instead
     redirect DeviceOrientation
 
-  # Clears the overriden Geolocation Position and Error.
+  # Clears the overridden Geolocation Position and Error.
   deprecated command clearGeolocationOverride
     # Use 'Emulation.clearGeolocationOverride' instead
     redirect Emulation
@@ -7167,7 +7167,7 @@ domain Page
         deny
         allow
         default
-      # The default path to save downloaded files to. This is requred if behavior is set to 'allow'
+      # The default path to save downloaded files to. This is required if behavior is set to 'allow'
       optional string downloadPath
 
   # Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position
@@ -8033,7 +8033,7 @@ experimental domain Storage
       # Security origin.
       string origin
       # The quota size (in bytes) to override the original quota with.
-      # If this is called multiple times, the overriden quota will be equal to
+      # If this is called multiple times, the overridden quota will be equal to
       # the quotaSize provided in the final call. If this is called without
       # specifying a quotaSize, the quota will be reset to the default value for
       # the specified origin. If this is called multiple times with different
@@ -8676,7 +8676,7 @@ domain Fetch
       optional string urlPattern
       # If set, only requests for matching resource types will be intercepted.
       optional Network.ResourceType resourceType
-      # Stage at wich to begin intercepting requests. Default is Request.
+      # Stage at which to begin intercepting requests. Default is Request.
       optional RequestStage requestStage
 
   # Response HTTP header entry
@@ -8906,7 +8906,7 @@ experimental domain WebAudio
     properties
       # The current context time in second in BaseAudioContext.
       number currentTime
-      # The time spent on rendering graph divided by render qunatum duration,
+      # The time spent on rendering graph divided by render quantum duration,
       # and multiplied by 100. 100 means the audio renderer reached the full
       # capacity and glitch may occur.
       number renderCapacity
@@ -9273,8 +9273,8 @@ experimental domain Media
       PlayerId playerId
       array of PlayerError errors
 
-  # Called whenever a player is created, or when a new agent joins and recieves
-  # a list of active players. If an agent is restored, it will recieve the full
+  # Called whenever a player is created, or when a new agent joins and receives
+  # a list of active players. If an agent is restored, it will receive the full
   # list of player ids and all events again.
   event playersCreated
     parameters
```

## Roll protocol to r873728 — _2021-04-19T08:16:10.000Z_
######  Diff: [`3e18e97...8676f73`](https://github.com/ChromeDevTools/devtools-protocol/compare/3e18e97...8676f73)

```diff
@@ browser_protocol.pdl:718 @@ experimental domain Audits
   type AttributionReportingIssueType extends string
     enum
       PermissionPolicyDisabled
+      InvalidAttributionData
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
@@ -727,6 +728,7 @@ experimental domain Audits
       optional AffectedFrame frame
       optional AffectedRequest request
       optional DOM.BackendNodeId violatingNodeId
+      optional string invalidParameter
 
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
```

## Roll protocol to r873348 — _2021-04-16T17:16:32.000Z_
######  Diff: [`143b9aa...3e18e97`](https://github.com/ChromeDevTools/devtools-protocol/compare/143b9aa...3e18e97)

```diff
@@ browser_protocol.pdl:9094 @@ experimental domain WebAuthn
       # https://w3c.github.io/webauthn#largeBlob
       # Defaults to false.
       optional boolean hasLargeBlob
+      # If set to true, the authenticator will support the credBlob extension.
+      # https://fidoalliance.org/specs/fido-v2.1-rd-20201208/fido-client-to-authenticator-protocol-v2.1-rd-20201208.html#sctn-credBlob-extension
+      # Defaults to false.
+      optional boolean hasCredBlob
       # If set to true, tests of user presence will succeed immediately.
       # Otherwise, they will not be resolved. Defaults to true.
       optional boolean automaticPresenceSimulation
```

## Roll protocol to r873231 — _2021-04-16T08:16:19.000Z_
######  Diff: [`1a49020...143b9aa`](https://github.com/ChromeDevTools/devtools-protocol/compare/1a49020...143b9aa)

```diff
@@ browser_protocol.pdl:7459 @@ domain Page
       string name
       Network.MonotonicTime timestamp
 
+  # Fired for failed bfcache history navigations if BackForwardCache feature is enabled. Do
+  # not assume any ordering with the Page.frameNavigated event. This event is fired only for
+  # main-frame history navigation where the document changes (non-same-document navigations),
+  # when bfcache navigation fails.
+  experimental event backForwardCacheNotUsed
+    parameters
+      # The loader id for the associated navgation.
+      Network.LoaderId loaderId
+      # The frame id of the associated frame.
+      FrameId frameId
+
   event loadEventFired
     parameters
       Network.MonotonicTime timestamp
```

## Roll protocol to r872298 — _2021-04-14T06:16:06.000Z_
######  Diff: [`0dacfa7...1a49020`](https://github.com/ChromeDevTools/devtools-protocol/compare/0dacfa7...1a49020)

```diff
@@ browser_protocol.pdl:7329 @@ domain Page
         # A new frame target will be created (see Target.attachedToTarget).
         swap
 
+  # The type of a frameNavigated event.
+  experimental type NavigationType extends string
+    enum
+      Navigation
+      BackForwardCacheRestore
+
   # Fired once navigation of the frame has completed. Frame is now associated with the new loader.
   event frameNavigated
     parameters
       # Frame object.
       Frame frame
+      experimental NavigationType type
 
   # Fired when opening document to write to.
   experimental event documentOpened
```

## Roll protocol to r871838 — _2021-04-13T08:16:03.000Z_
######  Diff: [`a45730c...0dacfa7`](https://github.com/ChromeDevTools/devtools-protocol/compare/a45730c...0dacfa7)

```diff
@@ browser_protocol.pdl:715 @@ experimental domain Audits
       optional Network.IPAddressSpace resourceIPAddressSpace
       optional Network.ClientSecurityState clientSecurityState
 
+  type AttributionReportingIssueType extends string
+    enum
+      PermissionPolicyDisabled
+
+  # Details for issues around "Attribution Reporting API" usage.
+  # Explainer: https://github.com/WICG/conversion-measurement-api
+  type AttributionReportingIssueDetails extends object
+    properties
+      AttributionReportingIssueType violationType
+      optional AffectedFrame frame
+      optional AffectedRequest request
+      optional DOM.BackendNodeId violatingNodeId
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -729,6 +742,7 @@ experimental domain Audits
       TrustedWebActivityIssue
       LowTextContrastIssue
       CorsIssue
+      AttributionReportingIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -744,6 +758,7 @@ experimental domain Audits
       optional TrustedWebActivityIssueDetails twaQualityEnforcementDetails
       optional LowTextContrastIssueDetails lowTextContrastIssueDetails
       optional CorsIssueDetails corsIssueDetails
+      optional AttributionReportingIssueDetails attributionReportingIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r871615 — _2021-04-12T20:16:16.000Z_
######  Diff: [`910add1...a45730c`](https://github.com/ChromeDevTools/devtools-protocol/compare/910add1...a45730c)

```diff
@@ browser_protocol.pdl:1986 @@ domain DOM
       optional Node templateContent
       # Pseudo elements associated with this node.
       optional array of Node pseudoElements
-      # Import document for the HTMLImport links.
-      optional Node importedDocument
+      # Deprecated, as the HTML Imports API has been removed (crbug.com/937746).
+      # This property used to return the imported document for the HTMLImport links.
+      # The property is always undefined now.
+      deprecated optional Node importedDocument
       # Distributed nodes for given insertion point.
       optional array of BackendNode distributedNodes
       # Whether the node is SVG.
```

## Roll protocol to r871496 — _2021-04-12T16:16:00.000Z_
######  Diff: [`ca9d8a4...910add1`](https://github.com/ChromeDevTools/devtools-protocol/compare/ca9d8a4...910add1)

```diff
@@ browser_protocol.pdl:2987 @@ experimental domain DOMSnapshot
       optional array of Rectangle scrollRects
       # The client rect of nodes. Only available when includeDOMRects is set to true
       optional array of Rectangle clientRects
+      # The list of background colors that are blended with colors of overlapping elements.
+      experimental optional array of StringIndex blendedBackgroundColors
+      # The list of computed text opacities.
+      experimental optional array of number textColorOpacities
 
   # Table of details of the post layout rendered text positions. The exact layout should not be regarded as
   # stable and may change between versions.
@@ -3043,6 +3047,14 @@ experimental domain DOMSnapshot
       optional boolean includePaintOrder
       # Whether to include DOM rectangles (offsetRects, clientRects, scrollRects) into the snapshot
       optional boolean includeDOMRects
+      # Whether to include blended background colors in the snapshot (default: false).
+      # Blended background color is achieved by blending background colors of all elements
+      # that overlap with the current element.
+      experimental optional boolean includeBlendedBackgroundColors
+      # Whether to include text color opacity in the snapshot (default: false).
+      # An element might have the opacity property set that affects the text color of the element.
+      # The final text color opacity is computed based on the opacity of all overlapping elements.
+      experimental optional boolean includeTextColorOpacities
     returns
       # The nodes in the DOM tree. The DOMNode at index 0 corresponds to the root document.
       array of DocumentSnapshot documents
```

## Roll protocol to r871249 — _2021-04-10T11:16:12.000Z_
######  Diff: [`7dd7cbb...ca9d8a4`](https://github.com/ChromeDevTools/devtools-protocol/compare/7dd7cbb...ca9d8a4)

```diff
@@ browser_protocol.pdl:3450 @@ domain Emulation
   experimental type DisabledImageType extends string
     enum
       avif
+      jxl
       webp
 
   experimental command setDisabledImageTypes
```

## Roll protocol to r869921 — _2021-04-07T08:16:07.000Z_
######  Diff: [`b2ed548...7dd7cbb`](https://github.com/ChromeDevTools/devtools-protocol/compare/b2ed548...7dd7cbb)

```diff
@@ browser_protocol.pdl:3986 @@ domain Input
       # Ignores input events processing when set to true.
       boolean ignore
 
+  # Prevents default drag and drop behavior and instead emits `Input.dragIntercepted` events.
+  # Drag and drop behavior can be directly controlled via `Input.dispatchDragEvent`.
+  experimental command setInterceptDrags
+    parameters
+      boolean enabled
+
   # Synthesizes a pinch gesture over a time period by issuing appropriate touch events.
   experimental command synthesizePinchGesture
     parameters
@@ -4047,6 +4053,12 @@ domain Input
       # for the preferred input type).
       optional GestureSourceType gestureSourceType
 
+  # Emitted only when `Input.setInterceptDrags` is enabled. Use this data with `Input.dispatchDragEvent` to
+  # restore normal drag and drop behavior.
+  experimental event dragIntercepted
+    parameters
+      DragData data
+
 experimental domain Inspector
 
   # Disables inspector domain notifications.
```

## Roll protocol to r869754 — _2021-04-06T23:16:23.000Z_
######  Diff: [`0210b99...b2ed548`](https://github.com/ChromeDevTools/devtools-protocol/compare/0210b99...b2ed548)

```diff
@@ browser_protocol.pdl:987 @@ domain Browser
       # The default path to save downloaded files to. This is requred if behavior is set to 'allow'
       # or 'allowAndName'.
       optional string downloadPath
+      # Whether to emit download events (defaults to false).
+      optional boolean eventsEnabled
 
   # Cancel a download if in progress
   experimental command cancelDownload
@@ -996,6 +998,33 @@ domain Browser
       # BrowserContext to perform the action in. When omitted, default browser context is used.
       optional BrowserContextID browserContextId
 
+  # Fired when page is about to start a download.
+  experimental event downloadWillBegin
+    parameters
+      # Id of the frame that caused the download to begin.
+      Page.FrameId frameId
+      # Global unique identifier of the download.
+      string guid
+      # URL of the resource being downloaded.
+      string url
+      # Suggested file name of the resource (the actual name of the file saved on disk may differ).
+      string suggestedFilename
+
+  # Fired when download makes progress. Last call has |done| == true.
+  experimental event downloadProgress
+    parameters
+      # Global unique identifier of the download.
+      string guid
+      # Total expected bytes to download.
+      number totalBytes
+      # Total bytes received.
+      number receivedBytes
+      # Download status.
+      enum state
+        inProgress
+        completed
+        canceled
+
   # Close browser gracefully.
   command close
 
@@ -7311,7 +7340,8 @@ domain Page
       FrameId frameId
 
   # Fired when page is about to start a download.
-  experimental event downloadWillBegin
+  # Deprecated. Use Browser.downloadWillBegin instead.
+  experimental deprecated event downloadWillBegin
     parameters
       # Id of the frame that caused download to begin.
       FrameId frameId
@@ -7323,7 +7353,8 @@ domain Page
       string suggestedFilename
 
   # Fired when download makes progress. Last call has |done| == true.
-  experimental event downloadProgress
+  # Deprecated. Use Browser.downloadProgress instead.
+  experimental deprecated event downloadProgress
     parameters
       # Global unique identifier of the download.
       string guid
```

## Roll protocol to r869402 — _2021-04-06T06:16:05.000Z_
######  Diff: [`a3a5f92...0210b99`](https://github.com/ChromeDevTools/devtools-protocol/compare/a3a5f92...0210b99)

```diff
@@ browser_protocol.pdl:3766 @@ domain Input
   # UTC time in seconds, counted from January 1, 1970.
   type TimeSinceEpoch extends number
 
+  experimental type DragDataItem extends object
+    properties
+      # Mime type of the dragged data.
+      string mimeType
+      # Depending of the value of `mimeType`, it contains the dragged link,
+      # text, HTML markup or any other data.
+      string data
+
+      # Title associated with a link. Only valid when `mimeType` == "text/uri-list".
+      optional string title
+
+      # Stores the base URL for the contained markup. Only valid when `mimeType`
+      # == "text/html".
+      optional string baseURL
+
+
+  experimental type DragData extends object
+    properties
+      array of DragDataItem items
+      # Bit field representing allowed drag operations. Copy = 1, Link = 2, Move = 16
+      integer dragOperationsMask
+
+  # Dispatches a drag event into the page.
+  experimental command dispatchDragEvent
+    parameters
+      # Type of the drag event.
+      enum type
+        dragEnter
+        dragOver
+        drop
+        dragCancel
+      # X coordinate of the event relative to the main frame's viewport in CSS pixels.
+      number x
+      # Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to
+      # the top of the viewport and Y increases as it proceeds towards the bottom of the viewport.
+      number y
+      DragData data
+      # Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
+      # (default: 0).
+      optional integer modifiers
+
   # Dispatches a key event to the page.
   command dispatchKeyEvent
     parameters
```

## Roll protocol to r868034 — _2021-03-31T10:16:20.000Z_
######  Diff: [`3948369...a3a5f92`](https://github.com/ChromeDevTools/devtools-protocol/compare/3948369...a3a5f92)

```diff
@@ browser_protocol.pdl:5995 @@ experimental domain Overlay
       # Identifier of the node to highlight.
       DOM.NodeId nodeId
 
+  type ScrollSnapContainerHighlightConfig extends object
+    properties
+      # The style of the snapport border (default: transparent)
+      optional LineStyle snapportBorder
+      # The style of the snap area border (default: transparent)
+      optional LineStyle snapAreaBorder
+      # The margin highlight fill color (default: transparent).
+      optional DOM.RGBA scrollMarginColor
+      # The padding highlight fill color (default: transparent).
+      optional DOM.RGBA scrollPaddingColor
+
+  type ScrollSnapHighlightConfig extends object
+    properties
+      # A descriptor for the highlight appearance of scroll snap containers.
+      ScrollSnapContainerHighlightConfig scrollSnapContainerHighlightConfig
+      # Identifier of the node to highlight.
+      DOM.NodeId nodeId
+
   # Configuration for dual screen hinge
   type HingeConfig extends object
     properties
@@ -6165,6 +6183,11 @@ experimental domain Overlay
       # An array of node identifiers and descriptors for the highlight appearance.
       array of FlexNodeHighlightConfig flexNodeHighlightConfigs
 
+  command setShowScrollSnapOverlays
+    parameters
+      # An array of node identifiers and descriptors for the highlight appearance.
+      array of ScrollSnapHighlightConfig scrollSnapHighlightConfigs
+
   # Requests that backend shows paint rectangles
   command setShowPaintRects
     parameters
```

## Roll protocol to r867593 — _2021-03-30T14:16:08.000Z_
######  Diff: [`154b166...3948369`](https://github.com/ChromeDevTools/devtools-protocol/compare/154b166...3948369)

```diff
@@ browser_protocol.pdl:5995 @@ experimental domain Overlay
       # Identifier of the node to highlight.
       DOM.NodeId nodeId
 
-  type ScrollSnapContainerHighlightConfig extends object
-    properties
-      # The style of the snapport border (default: transparent)
-      optional LineStyle snapportBorder
-      # The style of the snap area border (default: transparent)
-      optional LineStyle snapAreaBorder
-      # The margin highlight fill color (default: transparent).
-      optional DOM.RGBA scrollMarginColor
-      # The padding highlight fill color (default: transparent).
-      optional DOM.RGBA scrollPaddingColor
-
-  type ScrollSnapHighlightConfig extends object
-    properties
-      # A descriptor for the highlight appearance of scroll snap containers.
-      ScrollSnapContainerHighlightConfig scrollSnapContainerHighlightConfig
-      # Identifier of the node to highlight.
-      DOM.NodeId nodeId
-
   # Configuration for dual screen hinge
   type HingeConfig extends object
     properties
@@ -6183,11 +6165,6 @@ experimental domain Overlay
       # An array of node identifiers and descriptors for the highlight appearance.
       array of FlexNodeHighlightConfig flexNodeHighlightConfigs
 
-  command setShowScrollSnapOverlays
-    parameters
-      # An array of node identifiers and descriptors for the highlight appearance.
-      array of ScrollSnapHighlightConfig scrollSnapHighlightConfigs
-
   # Requests that backend shows paint rectangles
   command setShowPaintRects
     parameters
```

## Roll protocol to r867545 — _2021-03-30T10:16:09.000Z_
######  Diff: [`f7c029d...154b166`](https://github.com/ChromeDevTools/devtools-protocol/compare/f7c029d...154b166)

```diff
@@ browser_protocol.pdl:5995 @@ experimental domain Overlay
       # Identifier of the node to highlight.
       DOM.NodeId nodeId
 
+  type ScrollSnapContainerHighlightConfig extends object
+    properties
+      # The style of the snapport border (default: transparent)
+      optional LineStyle snapportBorder
+      # The style of the snap area border (default: transparent)
+      optional LineStyle snapAreaBorder
+      # The margin highlight fill color (default: transparent).
+      optional DOM.RGBA scrollMarginColor
+      # The padding highlight fill color (default: transparent).
+      optional DOM.RGBA scrollPaddingColor
+
+  type ScrollSnapHighlightConfig extends object
+    properties
+      # A descriptor for the highlight appearance of scroll snap containers.
+      ScrollSnapContainerHighlightConfig scrollSnapContainerHighlightConfig
+      # Identifier of the node to highlight.
+      DOM.NodeId nodeId
+
   # Configuration for dual screen hinge
   type HingeConfig extends object
     properties
@@ -6165,6 +6183,11 @@ experimental domain Overlay
       # An array of node identifiers and descriptors for the highlight appearance.
       array of FlexNodeHighlightConfig flexNodeHighlightConfigs
 
+  command setShowScrollSnapOverlays
+    parameters
+      # An array of node identifiers and descriptors for the highlight appearance.
+      array of ScrollSnapHighlightConfig scrollSnapHighlightConfigs
+
   # Requests that backend shows paint rectangles
   command setShowPaintRects
     parameters
```

## Roll protocol to r866556 — _2021-03-25T12:16:07.000Z_
######  Diff: [`70fd1b8...f7c029d`](https://github.com/ChromeDevTools/devtools-protocol/compare/70fd1b8...f7c029d)

```diff
@@ browser_protocol.pdl:711 @@ experimental domain Audits
       Network.CorsErrorStatus corsErrorStatus
       boolean isWarning
       AffectedRequest request
+      optional string initiatorOrigin
       optional Network.IPAddressSpace resourceIPAddressSpace
       optional Network.ClientSecurityState clientSecurityState
```

## Roll protocol to r866105 — _2021-03-24T14:16:09.000Z_
######  Diff: [`6024018...70fd1b8`](https://github.com/ChromeDevTools/devtools-protocol/compare/6024018...70fd1b8)

```diff
@@ browser_protocol.pdl:5104 @@ domain Network
       # Errors occurred while handling the signed exchagne.
       optional array of SignedExchangeError errors
 
+  # List of content encodings supported by the backend.
+  experimental type ContentEncoding extends string
+    enum
+      deflate
+      gzip
+      br
+
+  # Sets a list of content encodings that will be accepted. Empty list means no encoding is accepted.
+  experimental command setAcceptedEncodings
+    parameters
+      # List of accepted content encodings.
+      array of ContentEncoding encodings
+
+  # Clears accepted encodings set by setAcceptedEncodings
+  experimental command clearAcceptedEncodingsOverride
+
   # Tells whether clearing browser cache is supported.
   deprecated command canClearBrowserCache
     returns
```

## Roll protocol to r863986 — _2021-03-17T23:16:09.000Z_
######  Diff: [`576a381...6024018`](https://github.com/ChromeDevTools/devtools-protocol/compare/576a381...6024018)

```diff
@@ browser_protocol.pdl:6745 @@ domain Page
   # Returns metrics relating to the layouting of the page, such as viewport bounds/scale.
   command getLayoutMetrics
     returns
-      # Deprecated metrics relating to the layout viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `normalisedLayoutViewport` instead.
+      # Deprecated metrics relating to the layout viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssLayoutViewport` instead.
       deprecated LayoutViewport layoutViewport
-      # Deprecated metrics relating to the visual viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `normalisedVisualViewport` instead.
+      # Deprecated metrics relating to the visual viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssVisualViewport` instead.
       deprecated VisualViewport visualViewport
-      # Deprecated size of scrollable area. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `normalisedContentSize` instead.
+      # Deprecated size of scrollable area. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssContentSize` instead.
       deprecated DOM.Rect contentSize
       # Metrics relating to the layout viewport in CSS pixels.
       LayoutViewport cssLayoutViewport
```

## Roll protocol to r862770 — _2021-03-15T11:16:04.000Z_
######  Diff: [`c5bd6c3...576a381`](https://github.com/ChromeDevTools/devtools-protocol/compare/c5bd6c3...576a381)

```diff
@@ browser_protocol.pdl:8380 @@ experimental domain Tracing
       light
       detailed
 
+  # Backend type to use for tracing. `chrome` uses the Chrome-integrated
+  # tracing service and is supported on all platforms. `system` is only
+  # supported on Chrome OS and uses the Perfetto system tracing service.
+  # `auto` chooses `system` when the perfettoConfig provided to Tracing.start
+  # specifies at least one non-Chrome data source; otherwise uses `chrome`.
+  type TracingBackend extends string
+    enum
+      auto
+      chrome
+      system
+
   # Stop trace events collection.
   command end
 
@@ -8433,6 +8444,8 @@ experimental domain Tracing
       # When specified, the parameters `categories`, `options`, `traceConfig`
       # are ignored.
       optional binary perfettoConfig
+      # Backend type (defaults to `auto`)
+      optional TracingBackend tracingBackend
 
   event bufferUsage
     parameters
```

## Roll protocol to r862653 — _2021-03-13T04:16:21.000Z_
######  Diff: [`3704a77...c5bd6c3`](https://github.com/ChromeDevTools/devtools-protocol/compare/3704a77...c5bd6c3)

```diff
@@ browser_protocol.pdl:4605 @@ domain Network
       inspector
       subresource-filter
       content-type
-      collapsed-by-client
       coep-frame-resource-needs-coep-header
       coop-sandboxed-iframe-cannot-navigate-to-coop-page
       corp-not-same-origin
```

## Roll protocol to r861504 — _2021-03-10T10:16:14.000Z_
######  Diff: [`7622144...3704a77`](https://github.com/ChromeDevTools/devtools-protocol/compare/7622144...3704a77)

```diff
@@ browser_protocol.pdl:8168 @@ domain Target
   # Creates a new page.
   command createTarget
     parameters
-      # The initial URL the page will be navigated to.
+      # The initial URL the page will be navigated to. An empty string indicates about:blank.
       string url
       # Frame width in DIP (headless chrome only).
       optional integer width
```

## Roll protocol to r861447 — _2021-03-10T06:16:12.000Z_
######  Diff: [`b434e14...7622144`](https://github.com/ChromeDevTools/devtools-protocol/compare/b434e14...7622144)

```diff
@@ browser_protocol.pdl:7299 @@ domain Page
       string name
       Network.MonotonicTime timestamp
 
-  # Fired for all history navigations if BackForwardCache feature is enabled. Do not assume
-  # any ordering with the Page.frameNavigated event. This event is fired only for main-frame
-  # history navigation where the document changes (non-same-document navigations).
-  experimental event historyNavigationOutcomeReported
-    parameters
-      # The request id of the associated navigation.
-      Network.RequestId requestId
-      # The frame id of the associated frame.
-      FrameId frameId
-      # Indicates whether the frame is restored from BackForwardCache.
-      boolean isRestoredFromBackForwardCache
-
   event loadEventFired
     parameters
       Network.MonotonicTime timestamp
```

## Roll protocol to r861373 — _2021-03-10T01:16:11.000Z_
######  Diff: [`1cdf17e...b434e14`](https://github.com/ChromeDevTools/devtools-protocol/compare/1cdf17e...b434e14)

```diff
@@ browser_protocol.pdl:7299 @@ domain Page
       string name
       Network.MonotonicTime timestamp
 
+  # Fired for all history navigations if BackForwardCache feature is enabled. Do not assume
+  # any ordering with the Page.frameNavigated event. This event is fired only for main-frame
+  # history navigation where the document changes (non-same-document navigations).
+  experimental event historyNavigationOutcomeReported
+    parameters
+      # The request id of the associated navigation.
+      Network.RequestId requestId
+      # The frame id of the associated frame.
+      FrameId frameId
+      # Indicates whether the frame is restored from BackForwardCache.
+      boolean isRestoredFromBackForwardCache
+
   event loadEventFired
     parameters
       Network.MonotonicTime timestamp
```

## Roll protocol to r860858 — _2021-03-08T21:16:14.000Z_
######  Diff: [`5fd49a5...1cdf17e`](https://github.com/ChromeDevTools/devtools-protocol/compare/5fd49a5...1cdf17e)

```diff
@@ browser_protocol.pdl:5751 @@ domain Network
   experimental type CrossOriginEmbedderPolicyValue extends string
     enum
       None
+      CorsOrCredentialless
       RequireCorp
 
   experimental type CrossOriginEmbedderPolicyStatus extends object
```

## Roll protocol to r860658 — _2021-03-08T09:16:00.000Z_
######  Diff: [`f3a387f...4d52df1`](https://github.com/ChromeDevTools/devtools-protocol/compare/f3a387f...4d52df1)

```diff
@@ browser_protocol.pdl:7897 @@ experimental domain Storage
     returns
       array of TrustTokens tokens
 
+  # Removes all Trust Tokens issued by the provided issuerOrigin.
+  # Leaves other stored data, including the issuer's Redemption Records, intact.
+  experimental command clearTrustTokens
+    parameters
+      string issuerOrigin
+    returns
+      # True if any tokens were deleted, false otherwise.
+      boolean didDeleteTokens
+
   # A cache's contents have been modified.
   event cacheStorageContentUpdated
     parameters
```

## Roll protocol to r860415 — _2021-03-05T23:16:15.000Z_
######  Diff: [`219a9d6...f3a387f`](https://github.com/ChromeDevTools/devtools-protocol/compare/219a9d6...f3a387f)

```diff
@@ browser_protocol.pdl:6745 @@ domain Page
   # Returns metrics relating to the layouting of the page, such as viewport bounds/scale.
   command getLayoutMetrics
     returns
-      # Metrics relating to the layout viewport.
-      LayoutViewport layoutViewport
-      # Metrics relating to the visual viewport.
-      VisualViewport visualViewport
-      # Size of scrollable area.
-      DOM.Rect contentSize
+      # Deprecated metrics relating to the layout viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `normalisedLayoutViewport` instead.
+      deprecated LayoutViewport layoutViewport
+      # Deprecated metrics relating to the visual viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `normalisedVisualViewport` instead.
+      deprecated VisualViewport visualViewport
+      # Deprecated size of scrollable area. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `normalisedContentSize` instead.
+      deprecated DOM.Rect contentSize
+      # Metrics relating to the layout viewport in CSS pixels.
+      LayoutViewport cssLayoutViewport
+      # Metrics relating to the visual viewport in CSS pixels.
+      VisualViewport cssVisualViewport
+      # Size of scrollable area in CSS pixels.
+      DOM.Rect cssContentSize
 
   # Returns navigation history for the current page.
   command getNavigationHistory
```

## Roll protocol to r859327 — _2021-03-03T12:16:01.000Z_
######  Diff: [`dee574b...219a9d6`](https://github.com/ChromeDevTools/devtools-protocol/compare/dee574b...219a9d6)

```diff
@@ browser_protocol.pdl:987 @@ domain Browser
       # or 'allowAndName'.
       optional string downloadPath
 
+  # Cancel a download if in progress
+  experimental command cancelDownload
+    parameters
+      # Global unique identifier of the download.
+      string guid
+      # BrowserContext to perform the action in. When omitted, default browser context is used.
+      optional BrowserContextID browserContextId
+
   # Close browser gracefully.
   command close
```

## Roll protocol to r858754 — _2021-03-01T23:16:13.000Z_
######  Diff: [`78470ce...dee574b`](https://github.com/ChromeDevTools/devtools-protocol/compare/78470ce...dee574b)

```diff
@@ browser_protocol.pdl:6594 @@ domain Page
       strictOriginWhenCrossOrigin
       unsafeUrl
 
+  # Per-script compilation cache parameters for `Page.produceCompilationCache`
+  experimental type CompilationCacheParams extends object
+    properties
+      # The URL of the script to produce a compilation cache entry for.
+      string url
+      # A hint to the backend whether eager compilation is recommended.
+      # (the actual compilation mode used is upon backend discretion).
+      optional boolean eager
+
   # Deprecated, please use addScriptToEvaluateOnNewDocument instead.
   experimental deprecated command addScriptToEvaluateOnLoad
     parameters
@@ -7063,10 +7072,24 @@ domain Page
   experimental command stopScreencast
 
   # Forces compilation cache to be generated for every subresource script.
+  # See also: `Page.produceCompilationCache`.
   experimental command setProduceCompilationCache
     parameters
       boolean enabled
 
+  # Requests backend to produce compilation cache for the specified scripts.
+  # Unlike setProduceCompilationCache, this allows client to only produce cache
+  # for specific scripts. `scripts` are appeneded to the list of scripts
+  # for which the cache for would produced. Disabling compilation cache with
+  # `setProduceCompilationCache` would reset all pending cache requests.
+  # The list may also be reset during page navigation.
+  # When script with a matching URL is encountered, the cache is optionally
+  # produced upon backend discretion, based on internal heuristics.
+  # See also: `Page.compilationCacheProduced`.
+  experimental command produceCompilationCache
+    parameters
+      array of CompilationCacheParams scripts
+
   # Seeds compilation cache for given url. Compilation cache does not survive
   # cross-process navigation.
   experimental command addCompilationCache
```

## Roll protocol to r856957 — _2021-02-24T02:16:02.000Z_
######  Diff: [`fe49497...b726157`](https://github.com/ChromeDevTools/devtools-protocol/compare/fe49497...b726157)

```diff
@@ js_protocol.pdl:211 @@ domain Debugger
       # Exception details.
       optional Runtime.ExceptionDetails exceptionDetails
 
-  # Execute a Wasm Evaluator module on a given call frame.
-  experimental command executeWasmEvaluator
-    parameters
-      # WebAssembly call frame identifier to evaluate on.
-      CallFrameId callFrameId
-      # Code of the evaluator module.
-      binary evaluator
-      # Terminate execution after timing out (number of milliseconds).
-      experimental optional Runtime.TimeDelta timeout
-    returns
-      # Object wrapper for the evaluation result.
-      Runtime.RemoteObject result
-      # Exception details.
-      optional Runtime.ExceptionDetails exceptionDetails
-
   # Returns possible locations for breakpoint. scriptId in start and end range locations should be
   # the same.
   command getPossibleBreakpoints
@@ -508,6 +493,7 @@ domain Debugger
       enum reason
         ambiguous
         assert
+        CSPViolation
         debugCommand
         DOM
         EventListener
@@ -1022,8 +1008,9 @@ domain Runtime
         boolean
         symbol
         bigint
-        wasm
-      # Object subtype hint. Specified for `object` or `wasm` type values only.
+      # Object subtype hint. Specified for `object` type values only.
+      # NOTE: If you change anything here, make sure to also update
+      # `subtype` in `ObjectPreview` and `PropertyPreview` below.
       optional enum subtype
         array
         null
@@ -1042,12 +1029,8 @@ domain Runtime
         typedarray
         arraybuffer
         dataview
-        i32
-        i64
-        f32
-        f64
-        v128
-        externref
+        webassemblymemory
+        wasmvalue
       # Object class (constructor) name. Specified for `object` type values only.
       optional string className
       # Remote object value in case of primitive values or JSON values (if it was requested).
@@ -1100,6 +1083,13 @@ domain Runtime
         iterator
         generator
         error
+        proxy
+        promise
+        typedarray
+        arraybuffer
+        dataview
+        webassemblymemory
+        wasmvalue
       # String representation of the object.
       optional string description
       # True iff some of the properties or entries of the original object did not fit.
@@ -1142,6 +1132,13 @@ domain Runtime
         iterator
         generator
         error
+        proxy
+        promise
+        typedarray
+        arraybuffer
+        dataview
+        webassemblymemory
+        wasmvalue
 
   experimental type EntryPreview extends object
     properties
@@ -1224,6 +1221,10 @@ domain Runtime
       string origin
       # Human readable name describing given context.
       string name
+      # A system-unique execution context identifier. Unlike the id, this is unique accross
+      # multiple processes, so can be reliably used to identify specific context while backend
+      # performs a cross-process navigation.
+      experimental string uniqueId
       # Embedder-specific auxiliary data.
       optional object auxData
 
@@ -1387,6 +1388,9 @@ domain Runtime
       optional boolean silent
       # Specifies in which execution context to perform evaluation. If the parameter is omitted the
       # evaluation will be performed in the context of the inspected page.
+      # This is mutually exclusive with `uniqueContextId`, which offers an
+      # alternative way to identify the execution context that is more reliable
+      # in a multi-process environment.
       optional ExecutionContextId contextId
       # Whether the result is expected to be a JSON object that should be sent by value.
       optional boolean returnByValue
@@ -1413,6 +1417,13 @@ domain Runtime
       # when called with non-callable arguments. This flag bypasses CSP for this
       # evaluation and allows unsafe-eval. Defaults to true.
       experimental optional boolean allowUnsafeEvalBlockedByCSP
+      # An alternative way to specify the execution context to evaluate in.
+      # Compared to contextId that may be reused accross processes, this is guaranteed to be
+      # system-unique, so it can be used to prevent accidental evaluation of the expression
+      # in context different than intended (e.g. as a result of navigation accross process
+      # boundaries).
+      # This is mutually exclusive with `contextId`.
+      experimental optional string uniqueContextId
     returns
       # Evaluation result.
       RemoteObject result
@@ -1542,15 +1553,23 @@ domain Runtime
   # If executionContextId is empty, adds binding with the given name on the
   # global objects of all inspected contexts, including those created later,
   # bindings survive reloads.
-  # If executionContextId is specified, adds binding only on global object of
-  # given execution context.
   # Binding function takes exactly one argument, this argument should be string,
   # in case of any other input, function throws an exception.
   # Each binding function call produces Runtime.bindingCalled notification.
   experimental command addBinding
     parameters
       string name
+      # If specified, the binding would only be exposed to the specified
+      # execution context. If omitted and `executionContextName` is not set,
+      # the binding is exposed to all execution contexts of the target.
+      # This parameter is mutually exclusive with `executionContextName`.
       optional ExecutionContextId executionContextId
+      # If specified, the binding is exposed to the executionContext with
+      # matching name, even for contexts created after the binding is added.
+      # See also `ExecutionContext.name` and `worldName` parameter to
+      # `Page.addScriptToEvaluateOnNewDocument`.
+      # This parameter is mutually exclusive with `executionContextId`.
+      experimental optional string executionContextName
 
   # This method does not remove binding function from global object but
   # unsubscribes current runtime agent from Runtime.bindingCalled notifications.
```

## Roll protocol to r856702 — _2021-02-23T16:16:10.000Z_
######  Diff: [`498a1e5...fe49497`](https://github.com/ChromeDevTools/devtools-protocol/compare/498a1e5...fe49497)

```diff
@@ browser_protocol.pdl:783 @@ experimental domain Audits
   # Runs the contrast check for the target page. Found issues are reported
   # using Audits.issueAdded event.
   command checkContrast
+    parameters
+      # Whether to report WCAG AAA level issues. Default is false.
+      optional boolean reportAAA
 
   event issueAdded
     parameters
```

## Roll protocol to r854822 — _2021-02-17T17:16:17.000Z_
######  Diff: [`13b10d1...498a1e5`](https://github.com/ChromeDevTools/devtools-protocol/compare/13b10d1...498a1e5)

```diff
@@ browser_protocol.pdl:6248 @@ domain Page
       PerformanceMeasureMemory
       PerformanceProfile
 
+  # All Permissions Policy features. This enum should match the one defined
+  # in renderer/core/feature_policy/feature_policy_features.json5.
+  experimental type PermissionsPolicyFeature extends string
+    enum
+      accelerometer
+      ambient-light-sensor
+      autoplay
+      camera
+      ch-dpr
+      ch-device-memory
+      ch-downlink
+      ch-ect
+      ch-lang
+      ch-rtt
+      ch-ua
+      ch-ua-arch
+      ch-ua-platform
+      ch-ua-model
+      ch-ua-mobile
+      ch-ua-full-version
+      ch-ua-platform-version
+      ch-viewport-width
+      ch-width
+      clipboard-read
+      clipboard-write
+      conversion-measurement
+      cross-origin-isolated
+      display-capture
+      document-domain
+      encrypted-media
+      execution-while-out-of-viewport
+      execution-while-not-rendered
+      focus-without-user-activation
+      fullscreen
+      frobulate
+      gamepad
+      geolocation
+      gyroscope
+      hid
+      idle-detection
+      interest-cohort
+      magnetometer
+      microphone
+      midi
+      otp-credentials
+      payment
+      picture-in-picture
+      publickey-credentials-get
+      screen-wake-lock
+      serial
+      storage-access-api
+      sync-xhr
+      trust-token-redemption
+      usb
+      vertical-scroll
+      web-share
+      xr-spatial-tracking
+
+  # Reason for a permissions policy feature to be disabled.
+  experimental type PermissionsPolicyBlockReason extends string
+    enum
+      # Declaration in HTTP header.
+      Header
+      # Declaration in iframe attribute.
+      IframeAttribute
+
+  experimental type PermissionsPolicyBlockLocator extends object
+    properties
+      FrameId frameId
+      PermissionsPolicyBlockReason blockReason
+
+  experimental type PermissionsPolicyFeatureState extends object
+    properties
+      PermissionsPolicyFeature feature
+      boolean allowed
+      optional PermissionsPolicyBlockLocator locator
+
   # Information about the Frame on the page.
   type Frame extends object
     properties
@@ -6829,6 +6906,13 @@ domain Page
       # Whether to bypass page CSP.
       boolean enabled
 
+  # Get Permissions Policy state on given frame.
+  experimental command getPermissionsPolicyState
+    parameters
+      FrameId frameId
+    returns
+      array of PermissionsPolicyFeatureState states
+
   # Overrides the values of device screen dimensions (window.screen.width, window.screen.height,
   # window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media
   # query results).
```

## Roll protocol to r854538 — _2021-02-17T00:16:05.000Z_
######  Diff: [`014525d...13b10d1`](https://github.com/ChromeDevTools/devtools-protocol/compare/014525d...13b10d1)

```diff
@@ browser_protocol.pdl:4426 @@ domain Network
       Medium
       High
 
+  # Represents the source scheme of the origin that originally set the cookie.
+  # A value of "Unset" allows protocol clients to emulate legacy cookie scope for the scheme.
+  # This is a temporary ability and it will be removed in the future.
+  experimental type CookieSourceScheme extends string
+    enum
+      Unset
+      NonSecure
+      Secure
+
   # Timing information for the request.
   type ResourceTiming extends object
     properties
@@ -4807,6 +4816,12 @@ domain Network
       experimental CookiePriority priority
       # True if cookie is SameParty.
       experimental boolean sameParty
+      # Cookie source scheme type.
+      experimental CookieSourceScheme sourceScheme
+      # Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.
+      # An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
+      # This is a temporary ability and it will be removed in the future.
+      experimental integer sourcePort
 
   # Types of reasons why a cookie may not be stored from a response.
   experimental type SetCookieBlockedReason extends string
@@ -4935,7 +4950,7 @@ domain Network
       # Cookie value.
       string value
       # The request-URI to associate with the setting of the cookie. This value can affect the
-      # default domain and path values of the created cookie.
+      # default domain, path, source port, and source scheme values of the created cookie.
       optional string url
       # Cookie domain.
       optional string domain
@@ -4951,6 +4966,14 @@ domain Network
       optional TimeSinceEpoch expires
       # Cookie Priority.
       experimental optional CookiePriority priority
+      # True if cookie is SameParty.
+      experimental optional boolean sameParty
+      # Cookie source scheme type.
+      experimental optional CookieSourceScheme sourceScheme
+      # Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.
+      # An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
+      # This is a temporary ability and it will be removed in the future.
+      experimental optional integer sourcePort
 
   # Authorization challenge for HTTP status code 401 or 407.
   experimental type AuthChallenge extends object
@@ -5281,7 +5304,7 @@ domain Network
       # Cookie value.
       string value
       # The request-URI to associate with the setting of the cookie. This value can affect the
-      # default domain and path values of the created cookie.
+      # default domain, path, source port, and source scheme values of the created cookie.
       optional string url
       # Cookie domain.
       optional string domain
@@ -5297,6 +5320,14 @@ domain Network
       optional TimeSinceEpoch expires
       # Cookie Priority type.
       experimental optional CookiePriority priority
+      # True if cookie is SameParty.
+      experimental optional boolean sameParty
+      # Cookie source scheme type.
+      experimental optional CookieSourceScheme sourceScheme
+      # Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.
+      # An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
+      # This is a temporary ability and it will be removed in the future.
+      experimental optional integer sourcePort
     returns
       # Always set to true. If an error occurs, the response indicates protocol error.
       deprecated boolean success
```

## Roll protocol to r852555 — _2021-02-10T09:16:01.000Z_
######  Diff: [`5a47400...014525d`](https://github.com/ChromeDevTools/devtools-protocol/compare/5a47400...014525d)

```diff
@@ browser_protocol.pdl:667 @@ experimental domain Audits
       TransferIssue
       CreationIssue
 
-  # Details for a request that has been blocked with the BLOCKED_BY_RESPONSE
-  # code. Currently only used for COEP/COOP, but may be extended to include
-  # some CSP errors in the future.
+  # Details for a issue arising from an SAB being instantiated in, or
+  # transfered to a context that is not cross-origin isolated.
   type SharedArrayBufferIssueDetails extends object
     properties
       SourceCodeLocation sourceCodeLocation
@@ -705,6 +704,16 @@ experimental domain Audits
       string fontSize
       string fontWeight
 
+  # Details for a CORS related issue, e.g. a warning or error related to
+  # CORS RFC1918 enforcement.
+  type CorsIssueDetails extends object
+    properties
+      Network.CorsErrorStatus corsErrorStatus
+      boolean isWarning
+      AffectedRequest request
+      optional Network.IPAddressSpace resourceIPAddressSpace
+      optional Network.ClientSecurityState clientSecurityState
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -718,6 +727,7 @@ experimental domain Audits
       SharedArrayBufferIssue
       TrustedWebActivityIssue
       LowTextContrastIssue
+      CorsIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -732,6 +742,7 @@ experimental domain Audits
       optional SharedArrayBufferIssueDetails sharedArrayBufferIssueDetails
       optional TrustedWebActivityIssueDetails twaQualityEnforcementDetails
       optional LowTextContrastIssueDetails lowTextContrastIssueDetails
+      optional CorsIssueDetails corsIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
@@ -5600,6 +5611,7 @@ domain Network
     enum
       Allow
       BlockFromInsecureToMorePrivate
+      WarnFromInsecureToMorePrivate
 
   experimental type IPAddressSpace extends string
     enum
```

## Roll protocol to r850520 — _2021-02-04T10:16:11.000Z_
######  Diff: [`6393746...5a47400`](https://github.com/ChromeDevTools/devtools-protocol/compare/6393746...5a47400)

```diff
@@ browser_protocol.pdl:5829 @@ experimental domain Overlay
       # Style of the self-alignment line (align-items).
       optional LineStyle crossAlignment
 
+  # Configuration data for the highlighting of Flex item elements.
+  type FlexItemHighlightConfig extends object
+    properties
+      # Style of the box representing the item's base size
+      optional BoxStyle baseSizeBox
+      # Style of the border around the box representing the item's base size
+      optional LineStyle baseSizeBorder
+      # Style of the arrow representing if the item grew or shrank
+      optional LineStyle flexibilityArrow
+
   # Style information for drawing a line.
   type LineStyle extends object
     properties
@@ -5888,6 +5898,8 @@ experimental domain Overlay
       optional GridHighlightConfig gridHighlightConfig
       # The flex container highlight configuration (default: all transparent).
       optional FlexContainerHighlightConfig flexContainerHighlightConfig
+      # The flex item highlight configuration (default: all transparent).
+      optional FlexItemHighlightConfig flexItemHighlightConfig
       # The contrast algorithm to use for the contrast ratio (default: aa).
       optional ContrastAlgorithm contrastAlgorithm
```

## Roll protocol to r849788 — _2021-02-02T22:16:09.000Z_
######  Diff: [`8a7c1b5...6393746`](https://github.com/ChromeDevTools/devtools-protocol/compare/8a7c1b5...6393746)

```diff
@@ browser_protocol.pdl:4844 @@ domain Network
       # value.
       # This is the "Schemeful Same-Site" version of the blocked reason.
       SchemefulSameSiteUnspecifiedTreatedAsLax
+      # The cookie had the "SameParty" attribute but came from a cross-party response.
+      SamePartyFromCrossPartyContext
+      # The cookie had the "SameParty" attribute but did not specify the "Secure" attribute
+      # (which is required in order to use "SameParty"); or specified the "SameSite=Strict"
+      # attribute (which is forbidden when using "SameParty").
+      SamePartyConflictsWithOtherAttributes
 
   # Types of reasons why a cookie may not be sent with a request.
   experimental type CookieBlockedReason extends string
@@ -4886,6 +4892,8 @@ domain Network
       # value.
       # This is the "Schemeful Same-Site" version of the blocked reason.
       SchemefulSameSiteUnspecifiedTreatedAsLax
+      # The cookie had the "SameParty" attribute and the request was made from a cross-party context.
+      SamePartyFromCrossPartyContext
 
   # A cookie which was not stored from a response with the corresponding reason.
   experimental type BlockedSetCookieWithReason extends object
```

## Roll protocol to r849057 — _2021-02-01T11:16:00.000Z_
######  Diff: [`78112b8...8a7c1b5`](https://github.com/ChromeDevTools/devtools-protocol/compare/78112b8...8a7c1b5)

```diff
@@ browser_protocol.pdl:695 @@ experimental domain Audits
       # used when violation type is kDigitalAssetLinks.
       optional string signature
 
+  type LowTextContrastIssueDetails extends object
+    properties
+      DOM.BackendNodeId violatingNodeId
+      string violatingNodeSelector
+      number contrastRatio
+      number thresholdAA
+      number thresholdAAA
+      string fontSize
+      string fontWeight
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -707,6 +717,7 @@ experimental domain Audits
       ContentSecurityPolicyIssue
       SharedArrayBufferIssue
       TrustedWebActivityIssue
+      LowTextContrastIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -720,6 +731,7 @@ experimental domain Audits
       optional ContentSecurityPolicyIssueDetails contentSecurityPolicyIssueDetails
       optional SharedArrayBufferIssueDetails sharedArrayBufferIssueDetails
       optional TrustedWebActivityIssueDetails twaQualityEnforcementDetails
+      optional LowTextContrastIssueDetails lowTextContrastIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
@@ -757,6 +769,10 @@ experimental domain Audits
   # `issueAdded` event.
   command enable
 
+  # Runs the contrast check for the target page. Found issues are reported
+  # using Audits.issueAdded event.
+  command checkContrast
+
   event issueAdded
     parameters
       InspectorIssue issue
```

## Roll protocol to r848227 — _2021-01-28T20:16:06.000Z_
######  Diff: [`51065d6...78112b8`](https://github.com/ChromeDevTools/devtools-protocol/compare/51065d6...78112b8)

```diff
@@ browser_protocol.pdl:3163 @@ domain Emulation
       string version
 
   # Used to specify User Agent Cient Hints to emulate. See https://wicg.github.io/ua-client-hints
+  # Missing optional values will be filled in by the target with what it would normally use.
   experimental type UserAgentMetadata extends object
     properties
-      array of UserAgentBrandVersion brands
-      string fullVersion
+      optional array of UserAgentBrandVersion brands
+      optional string fullVersion
       string platform
       string platformVersion
       string architecture
```

## Roll protocol to r848169 — _2021-01-28T18:16:15.000Z_
######  Diff: [`0284109...51065d6`](https://github.com/ChromeDevTools/devtools-protocol/compare/0284109...51065d6)

```diff
@@ browser_protocol.pdl:5618 @@ domain Network
       array of BlockedSetCookieWithReason blockedCookies
       # Raw response headers as they were received over the wire.
       Headers headers
+      # The IP address space of the resource. The address space can only be determined once the transport
+      # established the connection, so we can't send it in `requestWillBeSentExtraInfo`.
+      IPAddressSpace resourceIPAddressSpace
       # Raw response header text as it was received over the wire. The raw text may not always be
       # available, such as in the case of HTTP/2 or QUIC.
       optional string headersText
```

## Roll protocol to r847576 — _2021-01-27T11:16:08.000Z_
######  Diff: [`769185f...0284109`](https://github.com/ChromeDevTools/devtools-protocol/compare/769185f...0284109)

```diff
@@ browser_protocol.pdl:645 @@ experimental domain Audits
 
   type SourceCodeLocation extends object
     properties
+      optional Runtime.ScriptId scriptId
       string url
       integer lineNumber
       integer columnNumber
```

## Roll protocol to r847122 — _2021-01-26T12:16:07.000Z_
######  Diff: [`181f9b3...769185f`](https://github.com/ChromeDevTools/devtools-protocol/compare/181f9b3...769185f)

```diff
@@ browser_protocol.pdl:661 @@ experimental domain Audits
       optional SourceCodeLocation sourceCodeLocation
       optional DOM.BackendNodeId violatingNodeId
 
+  type SharedArrayBufferIssueType extends string
+    enum
+      TransferIssue
+      CreationIssue
+
   # Details for a request that has been blocked with the BLOCKED_BY_RESPONSE
   # code. Currently only used for COEP/COOP, but may be extended to include
   # some CSP errors in the future.
-  type SharedArrayBufferTransferIssueDetails extends object
+  type SharedArrayBufferIssueDetails extends object
     properties
       SourceCodeLocation sourceCodeLocation
       boolean isWarning
+      SharedArrayBufferIssueType type
 
   type TwaQualityEnforcementViolationType extends string
     enum
@@ -698,7 +704,7 @@ experimental domain Audits
       BlockedByResponseIssue
       HeavyAdIssue
       ContentSecurityPolicyIssue
-      SharedArrayBufferTransferIssue
+      SharedArrayBufferIssue
       TrustedWebActivityIssue
 
   # This struct holds a list of optional fields with additional information
@@ -711,7 +717,7 @@ experimental domain Audits
       optional BlockedByResponseIssueDetails blockedByResponseIssueDetails
       optional HeavyAdIssueDetails heavyAdIssueDetails
       optional ContentSecurityPolicyIssueDetails contentSecurityPolicyIssueDetails
-      optional SharedArrayBufferTransferIssueDetails sharedArrayBufferTransferIssueDetails
+      optional SharedArrayBufferIssueDetails sharedArrayBufferIssueDetails
       optional TrustedWebActivityIssueDetails twaQualityEnforcementDetails
 
   # An inspector issue reported from the back-end.
```

## Roll protocol to r846936 — _2021-01-25T23:16:27.000Z_
######  Diff: [`d88313d...181f9b3`](https://github.com/ChromeDevTools/devtools-protocol/compare/d88313d...181f9b3)

```diff
@@ browser_protocol.pdl:5548 @@ domain Network
       # Request initiator.
       optional Initiator initiator
 
+  # Fired when WebTransport handshake is finished.
+  event webTransportConnectionEstablished
+    parameters
+      # WebTransport identifier.
+      RequestId transportId
+      # Timestamp.
+      MonotonicTime timestamp
+
+  # Fired when WebTransport is disposed.
   event webTransportClosed
     parameters
       # WebTransport identifier.
```

## Roll protocol to r845780 — _2021-01-21T20:16:08.000Z_
######  Diff: [`3941c7e...d88313d`](https://github.com/ChromeDevTools/devtools-protocol/compare/3941c7e...d88313d)

```diff
@@ browser_protocol.pdl:669 @@ experimental domain Audits
       SourceCodeLocation sourceCodeLocation
       boolean isWarning
 
+  type TwaQualityEnforcementViolationType extends string
+    enum
+      kHttpError
+      kUnavailableOffline
+      kDigitalAssetLinks
+
+  type TrustedWebActivityIssueDetails extends object
+    properties
+      # The url that triggers the violation.
+      string url
+      TwaQualityEnforcementViolationType violationType
+      optional integer httpStatusCode
+      # The package name of the Trusted Web Activity client app. This field is
+      # only used when violation type is kDigitalAssetLinks.
+      optional string packageName
+      # The signature of the Trusted Web Activity client app. This field is only
+      # used when violation type is kDigitalAssetLinks.
+      optional string signature
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -680,6 +699,7 @@ experimental domain Audits
       HeavyAdIssue
       ContentSecurityPolicyIssue
       SharedArrayBufferTransferIssue
+      TrustedWebActivityIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -692,6 +712,7 @@ experimental domain Audits
       optional HeavyAdIssueDetails heavyAdIssueDetails
       optional ContentSecurityPolicyIssueDetails contentSecurityPolicyIssueDetails
       optional SharedArrayBufferTransferIssueDetails sharedArrayBufferTransferIssueDetails
+      optional TrustedWebActivityIssueDetails twaQualityEnforcementDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r845564 — _2021-01-21T09:16:18.000Z_
######  Diff: [`47a861d...3941c7e`](https://github.com/ChromeDevTools/devtools-protocol/compare/47a861d...3941c7e)

```diff
@@ browser_protocol.pdl:7556 @@ experimental domain Storage
       # Storage usage (bytes).
       number usage
 
+  # Pair of issuer origin and number of available (signed, but not used) Trust
+  # Tokens from that issuer.
+  experimental type TrustTokens extends object
+    properties
+      string issuerOrigin
+      number count
+
   # Clears storage for origin.
   command clearDataForOrigin
     parameters
@@ -7640,6 +7647,12 @@ experimental domain Storage
       # Security origin.
       string origin
 
+  # Returns the number of stored Trust Tokens per issuer for the
+  # current browsing context.
+  experimental command getTrustTokens
+    returns
+      array of TrustTokens tokens
+
   # A cache's contents have been modified.
   event cacheStorageContentUpdated
     parameters
```

## Roll protocol to r845301 — _2021-01-20T20:16:06.000Z_
######  Diff: [`7f780af...47a861d`](https://github.com/ChromeDevTools/devtools-protocol/compare/7f780af...47a861d)

```diff
@@ browser_protocol.pdl:6041 @@ experimental domain Overlay
       # True for showing hit-test borders
       boolean show
 
+  # Request that backend shows an overlay with web vital metrics.
+  command setShowWebVitals
+    parameters
+      boolean show
+
   # Paints viewport size upon main frame resize.
   command setShowViewportSizeOnResize
     parameters
```

## Roll protocol to r841965 — _2021-01-11T10:16:08.000Z_
######  Diff: [`92c0fc5...529289e`](https://github.com/ChromeDevTools/devtools-protocol/compare/92c0fc5...529289e)

```diff
@@ browser_protocol.pdl:4749 @@ domain Network
       optional CookieSameSite sameSite
       # Cookie Priority
       experimental CookiePriority priority
+      # True if cookie is SameParty.
+      experimental boolean sameParty
 
   # Types of reasons why a cookie may not be stored from a response.
   experimental type SetCookieBlockedReason extends string
```

## Roll protocol to r841450 — _2021-01-08T12:16:13.000Z_
######  Diff: [`0f61a92...92c0fc5`](https://github.com/ChromeDevTools/devtools-protocol/compare/0f61a92...92c0fc5)

```diff
@@ browser_protocol.pdl:1815 @@ domain DOM
       backdrop
       selection
       target-text
+      spelling-error
+      grammar-error
       first-line-inherited
       scrollbar
       scrollbar-thumb
```

## Roll protocol to r840815 — _2021-01-06T23:16:17.000Z_
######  Diff: [`a5b6b3e...0f61a92`](https://github.com/ChromeDevTools/devtools-protocol/compare/a5b6b3e...0f61a92)

```diff
@@ browser_protocol.pdl:7152 @@ experimental domain PerformanceTimeline
   # See https://github.com/WICG/LargestContentfulPaint and largest_contentful_paint.idl
   type LargestContentfulPaint extends object
     properties
-      number renderTime
-      number loadTime
+      Network.TimeSinceEpoch renderTime
+      Network.TimeSinceEpoch loadTime
       # The number of pixels being painted.
       number size
       # The id attribute of the element, if available.
@@ -7162,25 +7162,46 @@ experimental domain PerformanceTimeline
       optional string url
       optional DOM.BackendNodeId nodeId
 
+  type LayoutShiftAttribution extends object
+    properties
+      DOM.Rect previousRect
+      DOM.Rect currentRect
+      optional DOM.BackendNodeId nodeId
+
+  # See https://wicg.github.io/layout-instability/#sec-layout-shift and layout_shift.idl
+  type LayoutShift extends object
+    properties
+      # Score increment produced by this event.
+      number value
+      boolean hadRecentInput
+      Network.TimeSinceEpoch lastInputTime
+      array of LayoutShiftAttribution sources
+
   type TimelineEvent extends object
     properties
       # Identifies the frame that this event is related to. Empty for non-frame targets.
       Page.FrameId frameId
+      # The event type, as specified in https://w3c.github.io/performance-timeline/#dom-performanceentry-entrytype
+      # This determines which of the optional "details" fiedls is present.
       string type
+      # Name may be empty depending on the type.
       string name
       # Time in seconds since Epoch, monotonically increasing within document lifetime.
       Network.TimeSinceEpoch time
       # Event duration, if applicable.
       optional number duration
       optional LargestContentfulPaint lcpDetails
+      optional LayoutShift layoutShiftDetails
 
   # Previously buffered events would be reported before method returns.
-  # The specified filter overrides any previous filters, passing empty
-  # filter disables recording.
-  # Note that not all types exposed to the web platform are currently supported.
   # See also: timelineEventAdded
   command enable
     parameters
+      # The types of event to report, as specified in
+      # https://w3c.github.io/performance-timeline/#dom-performanceentry-entrytype
+      # The specified filter overrides any previous filters, passing empty
+      # filter disables recording.
+      # Note that not all types exposed to the web platform are currently supported.
       array of string eventTypes
 
   # Sent when a performance timeline event is added. See reportPerformanceTimeline method.
```

## Roll protocol to r840500 — _2021-01-06T06:16:00.000Z_
######  Diff: [`e056996...a5b6b3e`](https://github.com/ChromeDevTools/devtools-protocol/compare/e056996...a5b6b3e)

```diff
@@ browser_protocol.pdl:7143 @@ domain Performance
       # Timestamp title.
       string title
 
+# Reporting of performance timeline events, as specified in
+# https://w3c.github.io/performance-timeline/#dom-performanceobserver.
+experimental domain PerformanceTimeline
+  depends on DOM
+  depends on Network
+
+  # See https://github.com/WICG/LargestContentfulPaint and largest_contentful_paint.idl
+  type LargestContentfulPaint extends object
+    properties
+      number renderTime
+      number loadTime
+      # The number of pixels being painted.
+      number size
+      # The id attribute of the element, if available.
+      optional string elementId
+      # The URL of the image (may be trimmed).
+      optional string url
+      optional DOM.BackendNodeId nodeId
+
+  type TimelineEvent extends object
+    properties
+      # Identifies the frame that this event is related to. Empty for non-frame targets.
+      Page.FrameId frameId
+      string type
+      string name
+      # Time in seconds since Epoch, monotonically increasing within document lifetime.
+      Network.TimeSinceEpoch time
+      # Event duration, if applicable.
+      optional number duration
+      optional LargestContentfulPaint lcpDetails
+
+  # Previously buffered events would be reported before method returns.
+  # The specified filter overrides any previous filters, passing empty
+  # filter disables recording.
+  # Note that not all types exposed to the web platform are currently supported.
+  # See also: timelineEventAdded
+  command enable
+    parameters
+      array of string eventTypes
+
+  # Sent when a performance timeline event is added. See reportPerformanceTimeline method.
+  event timelineEventAdded
+    parameters
+      TimelineEvent event
+
 # Security
 domain Security
```

## Roll protocol to r837676 — _2020-12-16T19:16:09.000Z_
######  Diff: [`17b7d75...84b9b60`](https://github.com/ChromeDevTools/devtools-protocol/compare/17b7d75...84b9b60)

```diff
@@ browser_protocol.pdl:661 @@ experimental domain Audits
       optional SourceCodeLocation sourceCodeLocation
       optional DOM.BackendNodeId violatingNodeId
 
+  # Details for a request that has been blocked with the BLOCKED_BY_RESPONSE
+  # code. Currently only used for COEP/COOP, but may be extended to include
+  # some CSP errors in the future.
+  type SharedArrayBufferTransferIssueDetails extends object
+    properties
+      SourceCodeLocation sourceCodeLocation
+      boolean isWarning
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -671,6 +679,7 @@ experimental domain Audits
       BlockedByResponseIssue
       HeavyAdIssue
       ContentSecurityPolicyIssue
+      SharedArrayBufferTransferIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -682,6 +691,7 @@ experimental domain Audits
       optional BlockedByResponseIssueDetails blockedByResponseIssueDetails
       optional HeavyAdIssueDetails heavyAdIssueDetails
       optional ContentSecurityPolicyIssueDetails contentSecurityPolicyIssueDetails
+      optional SharedArrayBufferTransferIssueDetails sharedArrayBufferTransferIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r836089 — _2020-12-11T13:16:22.000Z_
######  Diff: [`d6d3da3...17b7d75`](https://github.com/ChromeDevTools/devtools-protocol/compare/d6d3da3...17b7d75)

```diff
@@ browser_protocol.pdl:8078 @@ experimental domain Tracing
       # transfer mode (defaults to `none`)
       optional StreamCompression streamCompression
       optional TraceConfig traceConfig
+      # Base64-encoded serialized perfetto.protos.TraceConfig protobuf message
+      # When specified, the parameters `categories`, `options`, `traceConfig`
+      # are ignored.
+      optional binary perfettoConfig
 
   event bufferUsage
     parameters
```

## Roll protocol to r835626 — _2020-12-10T12:17:42.000Z_
######  Diff: [`7f3af2e...d6d3da3`](https://github.com/ChromeDevTools/devtools-protocol/compare/7f3af2e...d6d3da3)

```diff
@@ browser_protocol.pdl:828 @@ domain Browser
       backgroundFetch
       clipboardReadWrite
       clipboardSanitizedWrite
+      displayCapture
       durableStorage
       flash
       geolocation
```

## Roll protocol to r834467 — _2020-12-08T00:16:11.000Z_
######  Diff: [`9e09a22...53c89eb`](https://github.com/ChromeDevTools/devtools-protocol/compare/9e09a22...53c89eb)

```diff
@@ browser_protocol.pdl:5507 @@ domain Network
       RequestId transportId
       # WebTransport request URL.
       string url
+      # Timestamp.
+      MonotonicTime timestamp
       # Request initiator.
       optional Initiator initiator
 
@@ -5514,6 +5516,8 @@ domain Network
     parameters
       # WebTransport identifier.
       RequestId transportId
+      # Timestamp.
+      MonotonicTime timestamp
 
   experimental type PrivateNetworkRequestPolicy extends string
     enum
```

## Roll protocol to r832784 — _2020-12-02T13:16:13.000Z_
######  Diff: [`1d63b26...9e09a22`](https://github.com/ChromeDevTools/devtools-protocol/compare/1d63b26...9e09a22)

```diff
@@ browser_protocol.pdl:203 @@ experimental domain Accessibility
       # children, if requested.
       array of AXNode nodes
 
-  # Fetches the entire accessibility tree
+  # Fetches the entire accessibility tree for the root Document
   experimental command getFullAXTree
+    parameters
+      # The maximum depth at which descendants of the root node should be retrieved.
+      # If omitted, the full tree is returned.
+      optional integer max_depth
+    returns
+      array of AXNode nodes
+
+  # Fetches a particular accessibility node by AXNodeId.
+  # Requires `enable()` to have been called previously.
+  experimental command getChildAXNodes
+    parameters
+      AXNodeId id
     returns
       array of AXNode nodes
```

## Roll protocol to r832201 — _2020-12-01T04:16:12.000Z_
######  Diff: [`30c0c44...1d63b26`](https://github.com/ChromeDevTools/devtools-protocol/compare/30c0c44...1d63b26)

```diff
@@ browser_protocol.pdl:53 @@ experimental domain Accessibility
       labelfor
       labelwrapped
       legend
+      rubyannotation
       tablecaption
       title
       other
```

## Roll protocol to r831994 — _2020-11-30T21:16:16.000Z_
######  Diff: [`ebd3663...30c0c44`](https://github.com/ChromeDevTools/devtools-protocol/compare/ebd3663...30c0c44)

```diff
@@ browser_protocol.pdl:5553 @@ domain Network
       # available, such as in the case of HTTP/2 or QUIC.
       optional string headersText
 
+  # Fired exactly once for each Trust Token operation. Depending on
+  # the type of the operation and whether the operation succeeded or
+  # failed, the event is fired before the corresponding request was sent
+  # or after the response was received.
+  experimental event trustTokenOperationDone
+    parameters
+      # Detailed success or error status of the operation.
+      # 'AlreadyExists' also signifies a successful operation, as the result
+      # of the operation already exists und thus, the operation was abort
+      # preemptively (e.g. a cache hit).
+      enum status
+        Ok
+        InvalidArgument
+        FailedPrecondition
+        ResourceExhausted
+        AlreadyExists
+        Unavailable
+        BadResponse
+        InternalError
+        UnknownError
+        FulfilledLocally
+      TrustTokenOperationType type
+      RequestId requestId
+      # Top level origin. The context in which the operation was attempted.
+      optional string topLevelOrigin
+      # Origin of the issuer in case of a "Issuance" or "Redemption" operation.
+      optional string issuerOrigin
+      # The number of obtained Trust Tokens on a successful "Issuance" operation.
+      optional integer issuedTokenCount
+
   experimental type CrossOriginOpenerPolicyValue extends string
     enum
       SameOrigin
```

## Roll protocol to r831461 — _2020-11-27T03:16:01.000Z_
######  Diff: [`bf6d675...ebd3663`](https://github.com/ChromeDevTools/devtools-protocol/compare/bf6d675...ebd3663)

```diff
@@ browser_protocol.pdl:5487 @@ domain Network
       # WebSocket request data.
       WebSocketRequest request
 
+  # Fired upon WebTransport creation.
+  event webTransportCreated
+    parameters
+      # WebTransport identifier.
+      RequestId transportId
+      # WebTransport request URL.
+      string url
+      # Request initiator.
+      optional Initiator initiator
+
+  event webTransportClosed
+    parameters
+      # WebTransport identifier.
+      RequestId transportId
+
   experimental type PrivateNetworkRequestPolicy extends string
     enum
       Allow
```

## Roll protocol to r831315 — _2020-11-26T12:16:14.000Z_
######  Diff: [`4829241...bf6d675`](https://github.com/ChromeDevTools/devtools-protocol/compare/4829241...bf6d675)

```diff
@@ browser_protocol.pdl:4276 @@ domain Network
       SignedExchange
       Ping
       CSPViolationReport
+      Preflight
       Other
 
   # Unique loader identifier.
@@ -4682,6 +4683,7 @@ domain Network
         script
         preload
         SignedExchange
+        preflight
         other
       # Initiator JavaScript stack trace, set for Script only.
       optional Runtime.StackTrace stack
@@ -4693,6 +4695,8 @@ domain Network
       # Initiator column number, set for Parser type or for Script type (when script is importing
       # module) (0-based).
       optional number columnNumber
+      # Set if another request triggered this request (e.g. preflight).
+      optional RequestId requestId
 
   # Cookie object
   type Cookie extends object
```

## Roll protocol to r831300 — _2020-11-26T10:16:17.000Z_
######  Diff: [`e7d16f6...4829241`](https://github.com/ChromeDevTools/devtools-protocol/compare/e7d16f6...4829241)

```diff
@@ browser_protocol.pdl:5680 @@ experimental domain Overlay
       optional BoxStyle rowGapSpace
       # Style of empty space caused by columns gaps (gap/column-gap).
       optional BoxStyle columnGapSpace
+      # Style of the self-alignment line (align-items).
+      optional LineStyle crossAlignment
 
   # Style information for drawing a line.
   type LineStyle extends object
```

## Roll protocol to r829642 — _2020-11-20T14:16:14.000Z_
######  Diff: [`e3d5a68...e7d16f6`](https://github.com/ChromeDevTools/devtools-protocol/compare/e3d5a68...e7d16f6)

```diff
@@ browser_protocol.pdl:6342 @@ domain Page
       optional Viewport clip
       # Capture the screenshot from the surface, rather than the view. Defaults to true.
       experimental optional boolean fromSurface
+      # Capture the screenshot beyond the viewport. Defaults to false.
+      experimental optional boolean captureBeyondViewport
     returns
       # Base64-encoded image data.
       binary data
```

## Roll protocol to r829624 — _2020-11-20T12:16:20.000Z_
######  Diff: [`b9d4d51...e3d5a68`](https://github.com/ChromeDevTools/devtools-protocol/compare/b9d4d51...e3d5a68)

```diff
@@ browser_protocol.pdl:5483 @@ domain Network
       # WebSocket request data.
       WebSocketRequest request
 
+  experimental type PrivateNetworkRequestPolicy extends string
+    enum
+      Allow
+      BlockFromInsecureToMorePrivate
+
+  experimental type IPAddressSpace extends string
+    enum
+      Local
+      Private
+      Public
+      Unknown
+
+  experimental type ClientSecurityState extends object
+    properties
+      boolean initiatorIsSecureContext
+      IPAddressSpace initiatorIPAddressSpace
+      PrivateNetworkRequestPolicy privateNetworkRequestPolicy
+
   # Fired when additional information about a requestWillBeSent event is available from the
   # network stack. Not every requestWillBeSent event will have an additional
   # requestWillBeSentExtraInfo fired for it, and there is no guarantee whether requestWillBeSent
@@ -5496,6 +5514,8 @@ domain Network
       array of BlockedCookieWithReason associatedCookies
       # Raw request headers as they will be sent over the wire.
       Headers headers
+      # The client security state set for the request.
+      optional ClientSecurityState clientSecurityState
 
   # Fired when additional information about a responseReceived event is available from the network
   # stack. Not every responseReceived event will have an additional responseReceivedExtraInfo for
```

## Roll protocol to r829612 — _2020-11-20T11:16:03.000Z_
######  Diff: [`7507a70...b9d4d51`](https://github.com/ChromeDevTools/devtools-protocol/compare/7507a70...b9d4d51)

```diff
@@ browser_protocol.pdl:5679 @@ experimental domain Overlay
       # The hatching color for the box (default: transparent)
       optional DOM.RGBA hatchColor
 
+  type ContrastAlgorithm extends string
+    enum
+      aa
+      aaa
+      apca
+
   # Configuration data for the highlighting of page elements.
   type HighlightConfig extends object
     properties
@@ -5714,6 +5720,8 @@ experimental domain Overlay
       optional GridHighlightConfig gridHighlightConfig
       # The flex container highlight configuration (default: all transparent).
       optional FlexContainerHighlightConfig flexContainerHighlightConfig
+      # The contrast algorithm to use for the contrast ratio (default: aa).
+      optional ContrastAlgorithm contrastAlgorithm
 
   type ColorFormat extends string
     enum
```

## Roll protocol to r829242 — _2020-11-19T16:16:09.000Z_
######  Diff: [`2f03057...7507a70`](https://github.com/ChromeDevTools/devtools-protocol/compare/2f03057...7507a70)

```diff
@@ browser_protocol.pdl:6314 @@ domain Page
       optional Viewport clip
       # Capture the screenshot from the surface, rather than the view. Defaults to true.
       experimental optional boolean fromSurface
-      # Capture the screenshot beyond the viewport. Defaults to false.
-      experimental optional boolean captureBeyondViewport
     returns
       # Base64-encoded image data.
       binary data
@@ -6823,6 +6821,12 @@ domain Page
       # Frame object.
       Frame frame
 
+  # Fired when opening document to write to.
+  experimental event documentOpened
+    parameters
+      # Frame object.
+      Frame frame
+
   experimental event frameResized
 
   # Fired when a renderer-initiated navigation is requested.
```

## Roll protocol to r829162 — _2020-11-19T10:16:16.000Z_
######  Diff: [`84c2cfc...2f03057`](https://github.com/ChromeDevTools/devtools-protocol/compare/84c2cfc...2f03057)

```diff
@@ browser_protocol.pdl:6314 @@ domain Page
       optional Viewport clip
       # Capture the screenshot from the surface, rather than the view. Defaults to true.
       experimental optional boolean fromSurface
+      # Capture the screenshot beyond the viewport. Defaults to false.
+      experimental optional boolean captureBeyondViewport
     returns
       # Base64-encoded image data.
       binary data
```

## Roll protocol to r828856 — _2020-11-18T20:16:13.000Z_
######  Diff: [`ae1d9fd...84c2cfc`](https://github.com/ChromeDevTools/devtools-protocol/compare/ae1d9fd...84c2cfc)

```diff
@@ browser_protocol.pdl:5652 @@ experimental domain Overlay
       optional LineStyle lineSeparator
       # The style of the separator between items
       optional LineStyle itemSeparator
+      # Style of content-distribution space on the main axis (justify-content).
+      optional BoxStyle mainDistributedSpace
+      # Style of content-distribution space on the cross axis (align-content).
+      optional BoxStyle crossDistributedSpace
+      # Style of empty space caused by row gaps (gap/row-gap).
+      optional BoxStyle rowGapSpace
+      # Style of empty space caused by columns gaps (gap/column-gap).
+      optional BoxStyle columnGapSpace
 
   # Style information for drawing a line.
   type LineStyle extends object
@@ -5663,6 +5671,14 @@ experimental domain Overlay
         dashed
         dotted
 
+  # Style information for drawing a box.
+  type BoxStyle extends object
+    properties
+      # The background color for the box (default: transparent)
+      optional DOM.RGBA fillColor
+      # The hatching color for the box (default: transparent)
+      optional DOM.RGBA hatchColor
+
   # Configuration data for the highlighting of page elements.
   type HighlightConfig extends object
     properties
```

## Roll protocol to r828424 — _2020-11-17T22:16:15.000Z_
######  Diff: [`4a38aba...ae1d9fd`](https://github.com/ChromeDevTools/devtools-protocol/compare/4a38aba...ae1d9fd)

```diff
@@ browser_protocol.pdl:6805 @@ domain Page
       # Frame object.
       Frame frame
 
-  # Fired when opening document to write to.
-  experimental event documentOpened
-    parameters
-      # Frame object.
-      Frame frame
-
   experimental event frameResized
 
   # Fired when a renderer-initiated navigation is requested.
```

## Roll protocol to r828217 — _2020-11-17T16:16:16.000Z_
######  Diff: [`0f382c6...4a38aba`](https://github.com/ChromeDevTools/devtools-protocol/compare/0f382c6...4a38aba)

```diff
@@ browser_protocol.pdl:2522 @@ domain DOMDebugger
       attribute-modified
       node-removed
 
+  # CSP Violation type.
+  experimental type CSPViolationType extends string
+    enum
+      trustedtype-sink-violation
+      trustedtype-policy-violation
+
   # Object event listener.
   type EventListener extends object
     properties
@@ -2589,6 +2595,12 @@ domain DOMDebugger
       # Resource URL substring.
       string url
 
+  # Sets breakpoint on particular CSP violations.
+  experimental command setBreakOnCSPViolation
+    parameters
+      # CSP Violations to stop upon.
+      array of CSPViolationType violationTypes
+
   # Sets breakpoint on particular operation with DOM.
   command setDOMBreakpoint
     parameters
```

## Roll protocol to r828143 — _2020-11-17T11:15:46.000Z_
######  Diff: [`fc3a2fd...0f382c6`](https://github.com/ChromeDevTools/devtools-protocol/compare/fc3a2fd...0f382c6)

```diff
@@ browser_protocol.pdl:5701 @@ experimental domain Overlay
       # Identifier of the node to highlight.
       DOM.NodeId nodeId
 
+  type FlexNodeHighlightConfig extends object
+    properties
+      # A descriptor for the highlight appearance of flex containers.
+      FlexContainerHighlightConfig flexContainerHighlightConfig
+      # Identifier of the node to highlight.
+      DOM.NodeId nodeId
+
   # Configuration for dual screen hinge
   type HingeConfig extends object
     properties
@@ -5866,6 +5873,11 @@ experimental domain Overlay
       # An array of node identifiers and descriptors for the highlight appearance.
       array of GridNodeHighlightConfig gridNodeHighlightConfigs
 
+  command setShowFlexOverlays
+    parameters
+      # An array of node identifiers and descriptors for the highlight appearance.
+      array of FlexNodeHighlightConfig flexNodeHighlightConfigs
+
   # Requests that backend shows paint rectangles
   command setShowPaintRects
     parameters
```

## Roll protocol to r828125 — _2020-11-17T09:16:07.000Z_
######  Diff: [`6614ce6...fc3a2fd`](https://github.com/ChromeDevTools/devtools-protocol/compare/6614ce6...fc3a2fd)

```diff
@@ browser_protocol.pdl:6781 @@ domain Page
       # Frame object.
       Frame frame
 
+  # Fired when opening document to write to.
+  experimental event documentOpened
+    parameters
+      # Frame object.
+      Frame frame
+
   experimental event frameResized
 
   # Fired when a renderer-initiated navigation is requested.
```

## Roll protocol to r827510 — _2020-11-14T01:16:11.000Z_
######  Diff: [`7406169...6614ce6`](https://github.com/ChromeDevTools/devtools-protocol/compare/7406169...6614ce6)

```diff
@@ browser_protocol.pdl:6274 @@ domain Page
       optional Viewport clip
       # Capture the screenshot from the surface, rather than the view. Defaults to true.
       experimental optional boolean fromSurface
-      # Capture the screenshot beyond the viewport. Defaults to false.
-      experimental optional boolean captureBeyondViewport
     returns
       # Base64-encoded image data.
       binary data
```

## Roll protocol to r827467 — _2020-11-13T23:16:26.000Z_
######  Diff: [`51e7a7e...7406169`](https://github.com/ChromeDevTools/devtools-protocol/compare/51e7a7e...7406169)

```diff
@@ browser_protocol.pdl:6274 @@ domain Page
       optional Viewport clip
       # Capture the screenshot from the surface, rather than the view. Defaults to true.
       experimental optional boolean fromSurface
+      # Capture the screenshot beyond the viewport. Defaults to false.
+      experimental optional boolean captureBeyondViewport
     returns
       # Base64-encoded image data.
       binary data
```

## Roll protocol to r826646 — _2020-11-12T04:16:12.000Z_
######  Diff: [`433d00b...51e7a7e`](https://github.com/ChromeDevTools/devtools-protocol/compare/433d00b...51e7a7e)

```diff
@@ browser_protocol.pdl:6768 @@ domain Page
     parameters
       # Id of the frame that has been detached.
       FrameId frameId
+      experimental enum reason
+        # The frame is removed from the DOM.
+        remove
+        # The frame is being swapped out in favor of an out-of-process iframe.
+        # A new frame target will be created (see Target.attachedToTarget).
+        swap
 
   # Fired once navigation of the frame has completed. Frame is now associated with the new loader.
   event frameNavigated
```

## Roll protocol to r826264 — _2020-11-11T14:16:49.000Z_
######  Diff: [`0d4d761...433d00b`](https://github.com/ChromeDevTools/devtools-protocol/compare/0d4d761...433d00b)

```diff
@@ browser_protocol.pdl:5636 @@ experimental domain Overlay
     properties
       # The style of the container border
       optional LineStyle containerBorder
+      # The style of the separator between lines
+      optional LineStyle lineSeparator
+      # The style of the separator between items
+      optional LineStyle itemSeparator
 
   # Style information for drawing a line.
   type LineStyle extends object
```

## Roll protocol to r825619 — _2020-11-10T02:16:08.000Z_
######  Diff: [`c2862c9...0d4d761`](https://github.com/ChromeDevTools/devtools-protocol/compare/c2862c9...0d4d761)

```diff
@@ browser_protocol.pdl:4540 @@ domain Network
       network
 
   # Determines what type of Trust Token operation is executed and
-  # depending on the type, some additional parameters.
+  # depending on the type, some additional parameters. The values
+  # are specified in third_party/blink/renderer/core/fetch/trust_token.idl.
   experimental type TrustTokenParams extends object
     properties
       TrustTokenOperationType type
 
-      # Only set for "srr-token-redemption" type and determine whether
+      # Only set for "token-redemption" type and determine whether
       # to request a fresh SRR or use a still valid cached SRR.
       enum refreshPolicy
         UseCached
@@ -4559,9 +4560,9 @@ domain Network
     enum
       # Type "token-request" in the Trust Token API.
       Issuance
-      # Type "srr-token-redemption" in the Trust Token API.
+      # Type "token-redemption" in the Trust Token API.
       Redemption
-      # Type "send-srr" in the Trust Token API.
+      # Type "send-redemption-record" in the Trust Token API.
       Signing
 
   # HTTP response data.
```

## Roll protocol to r825064 — _2020-11-06T22:16:27.000Z_
######  Diff: [`e944f55...c2862c9`](https://github.com/ChromeDevTools/devtools-protocol/compare/e944f55...c2862c9)

```diff
@@ browser_protocol.pdl:859 @@ domain Browser
   experimental type BrowserCommandId extends string
     enum
       openTabSearch
+      closeTabSearch
 
   # Set permission settings for given origin.
   experimental command setPermission
```

## Roll protocol to r824785 — _2020-11-06T09:16:19.000Z_
######  Diff: [`7b37fcd...e944f55`](https://github.com/ChromeDevTools/devtools-protocol/compare/7b37fcd...e944f55)

```diff
@@ browser_protocol.pdl:5528 @@ domain Network
 
   experimental type SecurityIsolationStatus extends object
     properties
-      CrossOriginOpenerPolicyStatus coop
-      CrossOriginEmbedderPolicyStatus coep
+      optional CrossOriginOpenerPolicyStatus coop
+      optional CrossOriginEmbedderPolicyStatus coep
 
   # Returns information about the COEP/COOP isolation status.
   experimental command getSecurityIsolationStatus
```

## Roll protocol to r824362 — _2020-11-05T10:16:30.000Z_
######  Diff: [`8c7ee2c...7b37fcd`](https://github.com/ChromeDevTools/devtools-protocol/compare/8c7ee2c...7b37fcd)

```diff
@@ browser_protocol.pdl:5629 @@ experimental domain Overlay
       # The grid container background color (Default: transparent).
       optional DOM.RGBA gridBackgroundColor
 
+  # Configuration data for the highlighting of Flex container elements.
+  type FlexContainerHighlightConfig extends object
+    properties
+      # The style of the container border
+      optional LineStyle containerBorder
+
+  # Style information for drawing a line.
+  type LineStyle extends object
+    properties
+      # The color of the line (default: transparent)
+      optional DOM.RGBA color
+      # The line pattern (default: solid)
+      optional enum pattern
+        dashed
+        dotted
+
   # Configuration data for the highlighting of page elements.
   type HighlightConfig extends object
     properties
@@ -5662,6 +5678,8 @@ experimental domain Overlay
       optional ColorFormat colorFormat
       # The grid layout highlight configuration (default: all transparent).
       optional GridHighlightConfig gridHighlightConfig
+      # The flex container highlight configuration (default: all transparent).
+      optional FlexContainerHighlightConfig flexContainerHighlightConfig
 
   type ColorFormat extends string
     enum
```

## Roll protocol to r823956 — _2020-11-04T12:16:00.000Z_
######  Diff: [`3f62bad...8c7ee2c`](https://github.com/ChromeDevTools/devtools-protocol/compare/3f62bad...8c7ee2c)

```diff
@@ browser_protocol.pdl:5941 @@ domain Page
       # The cross-origin isolation feature is disabled.
       NotIsolatedFeatureDisabled
 
+  experimental type GatedAPIFeatures extends string
+    enum
+      SharedArrayBuffers
+      SharedArrayBuffersTransferAllowed
+      PerformanceMeasureMemory
+      PerformanceProfile
+
   # Information about the Frame on the page.
   type Frame extends object
     properties
@@ -5973,6 +5980,8 @@ domain Page
       experimental SecureContextType secureContextType
       # Indicates whether this is a cross origin isolated context.
       experimental CrossOriginIsolatedContextType crossOriginIsolatedContextType
+      # Indicated which gated APIs / features are available.
+      experimental array of GatedAPIFeatures gatedAPIFeatures
 
   # Information about the Resource on the page.
   experimental type FrameResource extends object
```

## Roll protocol to r823269 — _2020-11-02T20:16:02.000Z_
######  Diff: [`fcb68d1...3f62bad`](https://github.com/ChromeDevTools/devtools-protocol/compare/fcb68d1...3f62bad)

```diff
@@ browser_protocol.pdl:4523 @@ domain Network
       MethodDisallowedByPreflightResponse
       HeaderDisallowedByPreflightResponse
       RedirectContainsCredentials
+      InsecurePrivateNetwork
 
   type CorsErrorStatus extends object
     properties
```

## Roll protocol to r822788 — _2020-10-30T20:16:09.000Z_
######  Diff: [`b4c97ed...fcb68d1`](https://github.com/ChromeDevTools/devtools-protocol/compare/b4c97ed...fcb68d1)

```diff
@@ browser_protocol.pdl:7835 @@ experimental domain Tracing
       none
       gzip
 
+  # Details exposed when memory request explicitly declared.
+  # Keep consistent with memory_dump_request_args.h and
+  # memory_instrumentation.mojom
+  type MemoryDumpLevelOfDetail extends string
+    enum
+      background
+      light
+      detailed
+
   # Stop trace events collection.
   command end
 
@@ -7855,6 +7864,8 @@ experimental domain Tracing
     parameters
       # Enables more deterministic results by forcing garbage collection
       optional boolean deterministic
+      # Specifies level of details in memory dump. Defaults to "detailed".
+      optional MemoryDumpLevelOfDetail levelOfDetail
     returns
       # GUID of the resulting global memory dump.
       string dumpGuid
```

## Roll protocol to r822651 — _2020-10-30T15:16:03.000Z_
######  Diff: [`260c66a...b4c97ed`](https://github.com/ChromeDevTools/devtools-protocol/compare/260c66a...b4c97ed)

```diff
@@ browser_protocol.pdl:3310 @@ domain Emulation
   # Notification sent after the virtual time budget for the current VirtualTimePolicy has run out.
   experimental event virtualTimeBudgetExpired
 
+  # Enum of image types that can be disabled.
+  experimental type DisabledImageType extends string
+    enum
+      avif
+      webp
+
+  experimental command setDisabledImageTypes
+    parameters
+      # Image types to disable.
+      array of DisabledImageType imageTypes
+
   # Allows overriding user agent with the given string.
   command setUserAgentOverride
     parameters
```

## Roll protocol to r822096 — _2020-10-29T10:16:12.000Z_
######  Diff: [`31947f3...260c66a`](https://github.com/ChromeDevTools/devtools-protocol/compare/31947f3...260c66a)

```diff
@@ browser_protocol.pdl:4485 @@ domain Network
       corp-not-same-origin-after-defaulted-to-same-origin-by-coep
       corp-not-same-site
 
+  # The reason why request was blocked.
+  type CorsError extends string
+    enum
+      DisallowedByMode
+      InvalidResponse
+      WildcardOriginNotAllowed
+      MissingAllowOriginHeader
+      MultipleAllowOriginValues
+      InvalidAllowOriginValue
+      AllowOriginMismatch
+      InvalidAllowCredentials
+      CorsDisabledScheme
+      PreflightInvalidStatus
+      PreflightDisallowedRedirect
+      PreflightWildcardOriginNotAllowed
+      PreflightMissingAllowOriginHeader
+      PreflightMultipleAllowOriginValues
+      PreflightInvalidAllowOriginValue
+      PreflightAllowOriginMismatch
+      PreflightInvalidAllowCredentials
+      PreflightMissingAllowExternal
+      PreflightInvalidAllowExternal
+      InvalidAllowMethodsPreflightResponse
+      InvalidAllowHeadersPreflightResponse
+      MethodDisallowedByPreflightResponse
+      HeaderDisallowedByPreflightResponse
+      RedirectContainsCredentials
+
+  type CorsErrorStatus extends object
+    properties
+      CorsError corsError
+      string failedParameter
+
   # Source of serviceworker response.
   type ServiceWorkerResponseSource extends string
     enum
@@ -5235,6 +5268,8 @@ domain Network
       optional boolean canceled
       # The reason why loading was blocked, if any.
       optional BlockedReason blockedReason
+       # The reason why loading was blocked by CORS, if any.
+      optional CorsErrorStatus corsErrorStatus
 
   # Fired when HTTP request has finished loading.
   event loadingFinished
```

## Roll protocol to r820307 — _2020-10-23T17:16:09.000Z_
######  Diff: [`d246615...31947f3`](https://github.com/ChromeDevTools/devtools-protocol/compare/d246615...31947f3)

```diff
@@ browser_protocol.pdl:5166 @@ domain Network
       # Map with extra HTTP headers.
       Headers headers
 
-  # Specifies whether to sned a debug header to all outgoing requests.
-  experimental command setAttachDebugHeader
+  # Specifies whether to attach a page script stack id in requests
+  experimental command setAttachDebugStack
     parameters
-      # Whether to send a debug header.
+      # Whether to attach a page script stack for debugging purpose.
       boolean enabled
 
   # Sets the requests to intercept that match the provided patterns and optionally resource types.
```

## Roll protocol to r820101 — _2020-10-23T02:16:05.000Z_
######  Diff: [`d0179ab...d246615`](https://github.com/ChromeDevTools/devtools-protocol/compare/d0179ab...d246615)

```diff
@@ browser_protocol.pdl:855 @@ domain Browser
       # For "camera" permission, may specify panTiltZoom.
       optional boolean panTiltZoom
 
+  # Browser command ids used by executeBrowserCommand.
+  experimental type BrowserCommandId extends string
+    enum
+      openTabSearch
+
   # Set permission settings for given origin.
   experimental command setPermission
     parameters
@@ -1014,6 +1019,11 @@ domain Browser
       # Png encoded image.
       optional binary image
 
+  # Invoke custom browser commands used by telemetry.
+  experimental command executeBrowserCommand
+    parameters
+      BrowserCommandId commandId
+
 # This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles)
 # have an associated `id` used in subsequent operations on the related object. Each object type has
 # a specific `id` structure, and those are not interchangeable between objects of different kinds.
```

## Roll protocol to r820081 — _2020-10-23T01:16:08.000Z_
######  Diff: [`109271e...d0179ab`](https://github.com/ChromeDevTools/devtools-protocol/compare/109271e...d0179ab)

```diff
@@ browser_protocol.pdl:3609 @@ domain Input
       optional number rotationAngle
       # Force (default: 1.0).
       optional number force
+      # The normalized tangential pressure, which has a range of [-1,1] (default: 0).
+      experimental optional number tangentialPressure
+      # The plane angle between the Y-Z plane and the plane containing both the stylus axis and the Y axis, in degrees of the range [-90,90], a positive tiltX is to the right (default: 0)
+      experimental optional integer tiltX
+      # The plane angle between the X-Z plane and the plane containing both the stylus axis and the X axis, in degrees of the range [-90,90], a positive tiltY is towards the user (default: 0).
+      experimental optional integer tiltY
+      # The clockwise rotation of a pen stylus around its own major axis, in degrees in the range [0,359] (default: 0).
+      experimental optional integer twist
       # Identifier used to track touch sources between events, must be unique within an event.
       optional number id
 
@@ -3708,6 +3716,16 @@ domain Input
       optional integer buttons
       # Number of times the mouse button was clicked (default: 0).
       optional integer clickCount
+      # The normalized pressure, which has a range of [0,1] (default: 0).
+      experimental optional number force
+      # The normalized tangential pressure, which has a range of [-1,1] (default: 0).
+      experimental optional number tangentialPressure
+      # The plane angle between the Y-Z plane and the plane containing both the stylus axis and the Y axis, in degrees of the range [-90,90], a positive tiltX is to the right (default: 0).
+      experimental optional integer tiltX
+      # The plane angle between the X-Z plane and the plane containing both the stylus axis and the X axis, in degrees of the range [-90,90], a positive tiltY is towards the user (default: 0).
+      experimental optional integer tiltY
+      # The clockwise rotation of a pen stylus around its own major axis, in degrees in the range [0,359] (default: 0).
+      experimental optional integer twist
       # X delta in CSS pixels for mouse wheel event (default: 0).
       optional number deltaX
       # Y delta in CSS pixels for mouse wheel event (default: 0).
```

## Roll protocol to r819498 — _2020-10-21T20:16:11.000Z_
######  Diff: [`89f0fa5...109271e`](https://github.com/ChromeDevTools/devtools-protocol/compare/89f0fa5...109271e)

```diff
@@ browser_protocol.pdl:8255 @@ experimental domain WebAuthn
       # Client To Authenticator Protocol 2.
       ctap2
 
+  type Ctap2Version extends string
+    enum
+      ctap2_0
+      ctap2_1
+
   type AuthenticatorTransport extends string
     enum
       # Cross-Platform authenticator attachments:
@@ -8268,6 +8273,8 @@ experimental domain WebAuthn
   type VirtualAuthenticatorOptions extends object
     properties
       AuthenticatorProtocol protocol
+      # Defaults to ctap2_0. Ignored if |protocol| == u2f.
+      optional Ctap2Version ctap2Version
       AuthenticatorTransport transport
       # Defaults to false.
       optional boolean hasResidentKey
@@ -8300,6 +8307,9 @@ experimental domain WebAuthn
       # assertion.
       # See https://w3c.github.io/webauthn/#signature-counter
       integer signCount
+      # The large blob associated with the credential.
+      # See https://w3c.github.io/webauthn/#sctn-large-blob-extension
+      optional binary largeBlob
 
   # Enable the WebAuthn domain and start intercepting credential storage and
   # retrieval with a virtual authenticator.
```

## Roll protocol to r818974 — _2020-10-20T17:16:05.000Z_
######  Diff: [`1feb204...89f0fa5`](https://github.com/ChromeDevTools/devtools-protocol/compare/1feb204...89f0fa5)

```diff
@@ browser_protocol.pdl:1779 @@ domain DOM
       marker
       backdrop
       selection
+      target-text
       first-line-inherited
       scrollbar
       scrollbar-thumb
```

## Roll protocol to r818844 — _2020-10-20T10:15:54.000Z_
######  Diff: [`e1b8740...1feb204`](https://github.com/ChromeDevTools/devtools-protocol/compare/e1b8740...1feb204)

```diff
@@ browser_protocol.pdl:642 @@ experimental domain Audits
       optional string blockedURL
       # Specific directive that is violated, causing the CSP issue.
       string violatedDirective
+      boolean isReportOnly
       ContentSecurityPolicyViolationType contentSecurityPolicyViolationType
       optional AffectedFrame frameAncestor
       optional SourceCodeLocation sourceCodeLocation
```

## Roll protocol to r818814 — _2020-10-20T07:15:59.000Z_
######  Diff: [`d268e57...e1b8740`](https://github.com/ChromeDevTools/devtools-protocol/compare/d268e57...e1b8740)

```diff
@@ browser_protocol.pdl:4664 @@ domain Network
       InvalidPrefix
       # An unknown error was encountered when trying to store this cookie.
       UnknownError
+      # The cookie had the "SameSite=Strict" attribute but came from a response
+      # with the same registrable domain but a different scheme.
+      # This includes navigation requests intitiated by other origins.
+      # This is the "Schemeful Same-Site" version of the blocked reason.
+      SchemefulSameSiteStrict
+      # The cookie had the "SameSite=Lax" attribute but came from a response
+      # with the same registrable domain but a different scheme.
+      # This is the "Schemeful Same-Site" version of the blocked reason.
+      SchemefulSameSiteLax
+      # The cookie didn't specify a "SameSite" attribute and was defaulted to
+      # "SameSite=Lax" and broke the same rules specified in the SchemefulSameSiteLax
+      # value.
+      # This is the "Schemeful Same-Site" version of the blocked reason.
+      SchemefulSameSiteUnspecifiedTreatedAsLax
 
   # Types of reasons why a cookie may not be sent with a request.
   experimental type CookieBlockedReason extends string
@@ -4692,6 +4706,20 @@ domain Network
       UserPreferences
       # An unknown error was encountered when trying to send this cookie.
       UnknownError
+      # The cookie had the "SameSite=Strict" attribute but came from a response
+      # with the same registrable domain but a different scheme.
+      # This includes navigation requests intitiated by other origins.
+      # This is the "Schemeful Same-Site" version of the blocked reason.
+      SchemefulSameSiteStrict
+      # The cookie had the "SameSite=Lax" attribute but came from a response
+      # with the same registrable domain but a different scheme.
+      # This is the "Schemeful Same-Site" version of the blocked reason.
+      SchemefulSameSiteLax
+      # The cookie didn't specify a "SameSite" attribute and was defaulted to
+      # "SameSite=Lax" and broke the same rules specified in the SchemefulSameSiteLax
+      # value.
+      # This is the "Schemeful Same-Site" version of the blocked reason.
+      SchemefulSameSiteUnspecifiedTreatedAsLax
 
   # A cookie which was not stored from a response with the corresponding reason.
   experimental type BlockedSetCookieWithReason extends object
@@ -7223,9 +7251,25 @@ experimental domain Storage
       number usage
       # Storage quota (bytes).
       number quota
+      # Whether or not the origin has an active storage quota override
+      boolean overrideActive
       # Storage usage per type (bytes).
       array of UsageForType usageBreakdown
 
+  # Override quota for the specified origin
+  experimental command overrideQuotaForOrigin
+    parameters
+      # Security origin.
+      string origin
+      # The quota size (in bytes) to override the original quota with.
+      # If this is called multiple times, the overriden quota will be equal to
+      # the quotaSize provided in the final call. If this is called without
+      # specifying a quotaSize, the quota will be reset to the default value for
+      # the specified origin. If this is called multiple times with different
+      # origins, the override will be maintained for each origin until it is
+      # disabled (called without a quotaSize).
+      optional number quotaSize
+
   # Registers origin to be notified when an update occurs to its cache storage list.
   command trackCacheStorageForOrigin
     parameters
```

## Roll protocol to r816501 — _2020-10-13T10:16:04.000Z_
######  Diff: [`b72ea89...d268e57`](https://github.com/ChromeDevTools/devtools-protocol/compare/b72ea89...d268e57)

```diff
@@ browser_protocol.pdl:826 @@ domain Browser
       protectedMediaIdentifier
       sensors
       videoCapture
+      videoCapturePanTiltZoom
       idleDetection
       wakeLockScreen
       wakeLockSystem
@@ -850,6 +851,8 @@ domain Browser
       optional boolean userVisibleOnly
       # For "clipboard" permission, may specify allowWithoutSanitization.
       optional boolean allowWithoutSanitization
+      # For "camera" permission, may specify panTiltZoom.
+      optional boolean panTiltZoom
 
   # Set permission settings for given origin.
   experimental command setPermission
```

## Roll protocol to r815575 — _2020-10-09T12:16:03.000Z_
######  Diff: [`e736452...b72ea89`](https://github.com/ChromeDevTools/devtools-protocol/compare/e736452...b72ea89)

```diff
@@ browser_protocol.pdl:4374 @@ domain Network
         strict-origin-when-cross-origin
       # Whether is loaded via link preload.
       optional boolean isLinkPreload
+      # Set for requests when the TrustToken API is used. Contains the parameters
+      # passed by the developer (e.g. via "fetch") as understood by the backend.
+      experimental optional TrustTokenParams trustTokenParams
 
   # Details of a signed certificate timestamp (SCT).
   type SignedCertificateTimestamp extends object
@@ -4457,6 +4460,31 @@ domain Network
       fallback-code
       network
 
+  # Determines what type of Trust Token operation is executed and
+  # depending on the type, some additional parameters.
+  experimental type TrustTokenParams extends object
+    properties
+      TrustTokenOperationType type
+
+      # Only set for "srr-token-redemption" type and determine whether
+      # to request a fresh SRR or use a still valid cached SRR.
+      enum refreshPolicy
+        UseCached
+        Refresh
+
+      # Origins of issuers from whom to request tokens or redemption
+      # records.
+      optional array of string issuers
+
+  experimental type TrustTokenOperationType extends string
+    enum
+      # Type "token-request" in the Trust Token API.
+      Issuance
+      # Type "srr-token-redemption" in the Trust Token API.
+      Redemption
+      # Type "send-srr" in the Trust Token API.
+      Signing
+
   # HTTP response data.
   type Response extends object
     properties
```

## Roll protocol to r814141 — _2020-10-06T09:16:18.000Z_
######  Diff: [`46e9147...e736452`](https://github.com/ChromeDevTools/devtools-protocol/compare/46e9147...e736452)

```diff
@@ browser_protocol.pdl:4570 @@ domain Network
       # Initiator line number, set for Parser type or for Script type (when script is importing
       # module) (0-based).
       optional number lineNumber
+      # Initiator column number, set for Parser type or for Script type (when script is importing
+      # module) (0-based).
+      optional number columnNumber
 
   # Cookie object
   type Cookie extends object
```

## Roll protocol to r813281 — _2020-10-02T18:16:02.000Z_
######  Diff: [`81d36b6...e98f67b`](https://github.com/ChromeDevTools/devtools-protocol/compare/81d36b6...e98f67b)

```diff
@@ browser_protocol.pdl:8193 @@ experimental domain WebAuthn
       optional boolean hasResidentKey
       # Defaults to false.
       optional boolean hasUserVerification
+      # If set to true, the authenticator will support the largeBlob extension.
+      # https://w3c.github.io/webauthn#largeBlob
+      # Defaults to false.
+      optional boolean hasLargeBlob
       # If set to true, tests of user presence will succeed immediately.
       # Otherwise, they will not be resolved. Defaults to true.
       optional boolean automaticPresenceSimulation
```

## Roll protocol to r812116 — _2020-09-30T16:16:20.000Z_
######  Diff: [`9f36776...81d36b6`](https://github.com/ChromeDevTools/devtools-protocol/compare/9f36776...81d36b6)

```diff
@@ browser_protocol.pdl:7397 @@ domain Target
       boolean attached
       # Opener target Id
       optional TargetID openerId
-      # Whether the opened window has access to the originating window.
+      # Whether the target has access to the originating window.
       experimental boolean canAccessOpener
+      # Frame id of originating window (is only set if target has an opener).
+      experimental optional Page.FrameId openerFrameId
       experimental optional Browser.BrowserContextID browserContextId
 
   experimental type RemoteLocation extends object
```

## Roll protocol to r810467 — _2020-09-25T04:16:27.000Z_
######  Diff: [`362b549...9f36776`](https://github.com/ChromeDevTools/devtools-protocol/compare/362b549...9f36776)

```diff
@@ browser_protocol.pdl:5051 @@ domain Network
       # Cookie Priority type.
       experimental optional CookiePriority priority
     returns
-      # True if successfully set cookie.
-      boolean success
+      # Always set to true. If an error occurs, the response indicates protocol error.
+      deprecated boolean success
 
   # Sets given cookies.
   command setCookies
@@ -7434,7 +7434,8 @@ domain Target
     parameters
       TargetID targetId
     returns
-      boolean success
+      # Always set to true. If an error occurs, the response indicates protocol error.
+      deprecated boolean success
 
   # Inject object to the target's main frame that provides a communication
   # channel with browser target.
```

## Roll protocol to r810188 — _2020-09-24T14:16:32.000Z_
######  Diff: [`ea0b910...362b549`](https://github.com/ChromeDevTools/devtools-protocol/compare/ea0b910...362b549)

```diff
@@ browser_protocol.pdl:5400 @@ domain Network
     returns
       SecurityIsolationStatus status
 
+  # An object providing the result of a network resource load.
+  experimental type LoadNetworkResourcePageResult extends object
+    properties
+      boolean success
+      # Optional values used for error reporting.
+      optional number netError
+      optional string netErrorName
+      optional number httpStatusCode
+      # If successful, one of the following two fields holds the result.
+      optional IO.StreamHandle stream
+      # Response headers.
+      optional Network.Headers headers
+
+  # An options object that may be extended later to better support CORS,
+  # CORB and streaming.
+  experimental type LoadNetworkResourceOptions extends object
+    properties
+      boolean disableCache
+      boolean includeCredentials
+
+  # Fetches the resource and returns the content.
+  experimental command loadNetworkResource
+    parameters
+      # Frame id to get the resource for.
+      Page.FrameId frameId
+      # URL of the resource to get content for.
+      string url
+      # Options for the request.
+      LoadNetworkResourceOptions options
+    returns
+      LoadNetworkResourcePageResult resource
+
 # This domain provides various functionality related to drawing atop the inspected page.
 experimental domain Overlay
   depends on DOM
```

## Roll protocol to r809251 — _2020-09-22T09:16:18.000Z_
######  Diff: [`01dd54b...ea0b910`](https://github.com/ChromeDevTools/devtools-protocol/compare/01dd54b...ea0b910)

```diff
@@ browser_protocol.pdl:207 @@ experimental domain Accessibility
     returns
       array of AXNode nodes
 
+  # Query a DOM node's accessibility subtree for accessible name and role.
+  # This command computes the name and role for all nodes in the subtree, including those that are
+  # ignored for accessibility, and returns those that mactch the specified name and role. If no DOM
+  # node is specified, or the DOM node does not exist, the command returns an error. If neither
+  # `accessibleName` or `role` is specified, it returns all the accessibility nodes in the subtree.
+  experimental command queryAXTree
+    parameters
+      # Identifier of the node for the root to query.
+      optional DOM.NodeId nodeId
+      # Identifier of the backend node for the root to query.
+      optional DOM.BackendNodeId backendNodeId
+      # JavaScript object id of the node wrapper for the root to query.
+      optional Runtime.RemoteObjectId objectId
+      # Find nodes with this computed name.
+      optional string accessibleName
+      # Find nodes with this computed role.
+      optional string role
+    returns
+      # A list of `Accessibility.AXNode` matching the specified attributes,
+      # including nodes that are ignored for accessibility.
+      array of AXNode nodes
+
 experimental domain Animation
   depends on Runtime
   depends on DOM
```

## Roll protocol to r808307 — _2020-09-18T11:16:16.000Z_
######  Diff: [`9e2e943...01dd54b`](https://github.com/ChromeDevTools/devtools-protocol/compare/9e2e943...01dd54b)

```diff
@@ browser_protocol.pdl:5349 @@ domain Network
   experimental type CrossOriginOpenerPolicyStatus extends object
     properties
       CrossOriginOpenerPolicyValue value
+      CrossOriginOpenerPolicyValue reportOnlyValue
+      optional string reportingEndpoint
+      optional string reportOnlyReportingEndpoint
 
   experimental type CrossOriginEmbedderPolicyValue extends string
     enum
@@ -5358,6 +5361,9 @@ domain Network
   experimental type CrossOriginEmbedderPolicyStatus extends object
     properties
       CrossOriginEmbedderPolicyValue value
+      CrossOriginEmbedderPolicyValue reportOnlyValue
+      optional string reportingEndpoint
+      optional string reportOnlyReportingEndpoint
 
   experimental type SecurityIsolationStatus extends object
     properties
```

## Roll protocol to r806843 — _2020-09-15T02:16:32.000Z_
######  Diff: [`2155b85...9e2e943`](https://github.com/ChromeDevTools/devtools-protocol/compare/2155b85...9e2e943)

```diff
@@ browser_protocol.pdl:7698 @@ experimental domain Tracing
       optional StreamCompression streamCompression
 
 # A domain for letting clients substitute browser's network layer with client code.
-experimental domain Fetch
+domain Fetch
   depends on Network
   depends on IO
   depends on Page
@@ -7709,12 +7709,12 @@ experimental domain Fetch
   # Stages of the request to handle. Request will intercept before the request is
   # sent. Response will intercept after the response is received (but before response
   # body is received.
-  experimental type RequestStage extends string
+  type RequestStage extends string
     enum
       Request
       Response
 
-  experimental type RequestPattern extends object
+  type RequestPattern extends object
     properties
       # Wildcards ('*' -> zero or more, '?' -> exactly one) are allowed. Escape character is
       # backslash. Omitting is equivalent to "*".
@@ -7731,7 +7731,7 @@ experimental domain Fetch
       string value
 
   # Authorization challenge for HTTP status code 401 or 407.
-  experimental type AuthChallenge extends object
+  type AuthChallenge extends object
     properties
       # Source of the authentication challenge.
       optional enum source
@@ -7745,7 +7745,7 @@ experimental domain Fetch
       string realm
 
   # Response to an AuthChallenge.
-  experimental type AuthChallengeResponse extends object
+  type AuthChallengeResponse extends object
     properties
       # The decision on what to do in response to the authorization challenge.  Default means
       # deferring to the default behavior of the net stack, which will likely either the Cancel
```

## Roll protocol to r806611 — _2020-09-14T12:16:27.000Z_
######  Diff: [`176b07f...2155b85`](https://github.com/ChromeDevTools/devtools-protocol/compare/176b07f...2155b85)

```diff
@@ browser_protocol.pdl:5427 @@ experimental domain Overlay
       optional DOM.RGBA columnHatchColor
       # The named grid areas border color (Default: transparent).
       optional DOM.RGBA areaBorderColor
+      # The grid container background color (Default: transparent).
+      optional DOM.RGBA gridBackgroundColor
 
   # Configuration data for the highlighting of page elements.
   type HighlightConfig extends object
```

## Roll protocol to r806105 — _2020-09-11T09:16:20.000Z_
######  Diff: [`23323c5...176b07f`](https://github.com/ChromeDevTools/devtools-protocol/compare/23323c5...176b07f)

```diff
@@ browser_protocol.pdl:1076 @@ experimental domain CSS
       boolean isInline
       # Whether this stylesheet is mutable. Inline stylesheets become mutable
       # after they have been modified via CSSOM API.
-      # <link> element's stylesheets are never mutable. Constructed stylesheets
-      # (new CSSStyleSheet()) are mutable immediately after creation.
+      # <link> element's stylesheets become mutable only if DevTools modifies them.
+      # Constructed stylesheets (new CSSStyleSheet()) are mutable immediately after creation.
       boolean isMutable
+      # Whether this stylesheet is a constructed stylesheet (created using new CSSStyleSheet()).
+      boolean isConstructed
       # Line offset of the stylesheet within the resource (zero based).
       number startLine
       # Column offset of the stylesheet within the resource (zero based).
```

## Roll protocol to r805376 — _2020-09-09T17:16:20.000Z_
######  Diff: [`caa0ede...23323c5`](https://github.com/ChromeDevTools/devtools-protocol/compare/caa0ede...23323c5)

```diff
@@ browser_protocol.pdl:7970 @@ experimental domain WebAudio
       # Context sample rate.
       number sampleRate
 
-# Protocol object for AudioListner
+# Protocol object for AudioListener
   type AudioListener extends object
     properties
       GraphObjectId listenerId
```

## Roll protocol to r805182 — _2020-09-09T02:16:15.000Z_
######  Diff: [`4f48bef...caa0ede`](https://github.com/ChromeDevTools/devtools-protocol/compare/4f48bef...caa0ede)

```diff
@@ js_protocol.pdl:863 @@ domain Profiler
       # Counter value.
       integer value
 
+  # Runtime call counter information.
+  experimental type RuntimeCallCounterInfo extends object
+    properties
+      # Counter name.
+      string name
+      # Counter value.
+      number value
+      # Counter time in seconds.
+      number time
+
   command disable
 
   command enable
@@ -927,6 +937,18 @@ domain Profiler
       # Type profile for all scripts since startTypeProfile() was turned on.
       array of ScriptTypeProfile result
 
+  # Enable counters collection.
+  experimental command enableCounters
+
+  # Disable counters collection.
+  experimental command disableCounters
+
+  # Retrieve counters.
+  experimental command getCounters
+    returns
+      # Collected counters information.
+      array of CounterInfo result
+
   # Enable run time call stats collection.
   experimental command enableRuntimeCallStats
 
@@ -936,8 +958,8 @@ domain Profiler
   # Retrieve run time call stats.
   experimental command getRuntimeCallStats
     returns
-      # Collected counter information.
-      array of CounterInfo result
+      # Collected runtime call counter information.
+      array of RuntimeCallCounterInfo result
 
   event consoleProfileFinished
     parameters
```

## Roll protocol to r802093 — _2020-08-27T03:16:11.000Z_
######  Diff: [`4d26309...4f48bef`](https://github.com/ChromeDevTools/devtools-protocol/compare/4d26309...4f48bef)

```diff
@@ browser_protocol.pdl:5050 @@ domain Network
       # Map with extra HTTP headers.
       Headers headers
 
+  # Specifies whether to sned a debug header to all outgoing requests.
+  experimental command setAttachDebugHeader
+    parameters
+      # Whether to send a debug header.
+      boolean enabled
+
   # Sets the requests to intercept that match the provided patterns and optionally resource types.
   # Deprecated, please use Fetch.enable instead.
   experimental deprecated command setRequestInterception
```

## Roll protocol to r801017 — _2020-08-24T16:16:09.000Z_
######  Diff: [`5ac7d2e...4d26309`](https://github.com/ChromeDevTools/devtools-protocol/compare/5ac7d2e...4d26309)

```diff
@@ browser_protocol.pdl:826 @@ domain Browser
       # For "push" permission, may specify userVisibleOnly.
       # Note that userVisibleOnly = true is the only currently supported type.
       optional boolean userVisibleOnly
-      # For "wake-lock" permission, must specify type as either "screen" or "system".
-      optional string type
       # For "clipboard" permission, may specify allowWithoutSanitization.
       optional boolean allowWithoutSanitization
```

## Roll protocol to r799653 — _2020-08-19T16:16:16.000Z_
######  Diff: [`0e651b0...5ac7d2e`](https://github.com/ChromeDevTools/devtools-protocol/compare/0e651b0...5ac7d2e)

```diff
@@ browser_protocol.pdl:5712 @@ domain Page
       # This frame is the root of an ad frame.
       root
 
+  # Indicates whether the frame is a secure context and why it is the case.
+  experimental type SecureContextType extends string
+    enum
+      # The origin is a secure context.
+      Secure
+      # The host is localhost and hence is considered secure.
+      SecureLocalhost
+      # The origin has an insecure scheme and is not localhost.
+      InsecureScheme
+      # One of the ancestor frames is not a secure context.
+      InsecureAncestor
+
+  # Indicates whether the frame is cross-origin isolated and why it is the case.
+  experimental type CrossOriginIsolatedContextType extends string
+    enum
+      # The origin is cross-origin isolated.
+      Isolated
+      # The origin is not cross-origin isolated.
+      NotIsolated
+      # The cross-origin isolation feature is disabled.
+      NotIsolatedFeatureDisabled
+
   # Information about the Frame on the page.
   type Frame extends object
     properties
@@ -5740,6 +5762,10 @@ domain Page
       experimental optional string unreachableUrl
       # Indicates whether this frame was tagged as an ad.
       experimental optional AdFrameType adFrameType
+      # Indicates whether the main document is a secure context and explains why that is the case.
+      experimental SecureContextType secureContextType
+      # Indicates whether this is a cross origin isolated context.
+      experimental CrossOriginIsolatedContextType crossOriginIsolatedContextType
 
   # Information about the Resource on the page.
   experimental type FrameResource extends object
```

## Roll protocol to r799090 — _2020-08-18T14:16:17.000Z_
######  Diff: [`3c9bb33...0e651b0`](https://github.com/ChromeDevTools/devtools-protocol/compare/3c9bb33...0e651b0)

```diff
@@ browser_protocol.pdl:5333 @@ domain Network
       # available, such as in the case of HTTP/2 or QUIC.
       optional string headersText
 
+  experimental type CrossOriginOpenerPolicyValue extends string
+    enum
+      SameOrigin
+      SameOriginAllowPopups
+      UnsafeNone
+      SameOriginPlusCoep
+
+  experimental type CrossOriginOpenerPolicyStatus extends object
+    properties
+      CrossOriginOpenerPolicyValue value
+
+  experimental type CrossOriginEmbedderPolicyValue extends string
+    enum
+      None
+      RequireCorp
+
+  experimental type CrossOriginEmbedderPolicyStatus extends object
+    properties
+      CrossOriginEmbedderPolicyValue value
+
+  experimental type SecurityIsolationStatus extends object
+    properties
+      CrossOriginOpenerPolicyStatus coop
+      CrossOriginEmbedderPolicyStatus coep
+
+  # Returns information about the COEP/COOP isolation status.
+  experimental command getSecurityIsolationStatus
+    parameters
+      # If no frameId is provided, the status of the target is provided.
+      optional Page.FrameId frameId
+    returns
+      SecurityIsolationStatus status
+
 # This domain provides various functionality related to drawing atop the inspected page.
 experimental domain Overlay
   depends on DOM
```

## Roll protocol to r796752 — _2020-08-11T09:16:15.000Z_
######  Diff: [`6b171b5...3c9bb33`](https://github.com/ChromeDevTools/devtools-protocol/compare/6b171b5...3c9bb33)

```diff
@@ browser_protocol.pdl:1888 @@ domain DOM
       # Rectangle height
       number height
 
+  type CSSComputedStyleProperty extends object
+    properties
+      # Computed style property name.
+      string name
+      # Computed style property value.
+      string value
+
   # Collects class names for the node with given id and all of it's child nodes.
   experimental command collectClassNamesFromSubtree
     parameters
@@ -2034,6 +2041,20 @@ domain DOM
       # Resulting node.
       array of Node nodes
 
+  # Finds nodes with a given computed style in a subtree.
+  experimental command getNodesForSubtreeByStyle
+    parameters
+      # Node ID pointing to the root of a subtree.
+      NodeId nodeId
+      # The style to filter nodes by (includes nodes if any of properties matches).
+      array of CSSComputedStyleProperty computedStyles
+      # Whether or not iframes and shadow roots in the same target should be traversed when returning the
+      # results (default is false).
+      optional boolean pierce
+    returns
+      # Resulting nodes.
+      array of NodeId nodeIds
+
   # Returns node id at given location. Depending on whether DOM domain is enabled, nodeId is
   # either returned or not.
   command getNodeForLocation
```

## Roll protocol to r795450 — _2020-08-06T14:16:06.000Z_
######  Diff: [`c89b1a6...6b171b5`](https://github.com/ChromeDevTools/devtools-protocol/compare/c89b1a6...6b171b5)

```diff
@@ browser_protocol.pdl:623 @@ experimental domain Audits
       ContentSecurityPolicyViolationType contentSecurityPolicyViolationType
       optional AffectedFrame frameAncestor
       optional SourceCodeLocation sourceCodeLocation
-      optional integer violatingNodeId
+      optional DOM.BackendNodeId violatingNodeId
 
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
```

## Roll protocol to r795133 — _2020-08-05T19:16:31.000Z_
######  Diff: [`40517aa...c89b1a6`](https://github.com/ChromeDevTools/devtools-protocol/compare/40517aa...c89b1a6)

```diff
@@ browser_protocol.pdl:2020 @@ domain DOM
       Node root
 
   # Returns the root DOM node (and optionally the subtree) to the caller.
-  command getFlattenedDocument
+  # Deprecated, as it is not designed to work well with the rest of the DOM agent.
+  # Use DOMSnapshot.captureSnapshot instead.
+  deprecated command getFlattenedDocument
     parameters
       # The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the
       # entire subtree or provide an integer larger than 0.
```

## Roll protocol to r795004 — _2020-08-05T14:16:20.000Z_
######  Diff: [`9f93887...40517aa`](https://github.com/ChromeDevTools/devtools-protocol/compare/9f93887...40517aa)

```diff
@@ browser_protocol.pdl:7247 @@ domain Target
       boolean attached
       # Opener target Id
       optional TargetID openerId
+      # Whether the opened window has access to the originating window.
+      experimental boolean canAccessOpener
       experimental optional Browser.BrowserContextID browserContextId
 
   experimental type RemoteLocation extends object
```

## Roll protocol to r794659 — _2020-08-04T19:16:29.000Z_
######  Diff: [`92769fe...9f93887`](https://github.com/ChromeDevTools/devtools-protocol/compare/92769fe...9f93887)

```diff
@@ js_protocol.pdl:85 @@ domain Debugger
       integer lineNumber
       integer columnNumber
 
+  # Location range within one script.
+  experimental type LocationRange extends object
+    properties
+      Runtime.ScriptId scriptId
+      ScriptPosition start
+      ScriptPosition end
+
   # JavaScript call frame. Array of call frames form the call stack.
   type CallFrame extends object
     properties
@@ -472,12 +479,17 @@ domain Debugger
       # Debugger will pause on the execution of the first async task which was scheduled
       # before next pause.
       experimental optional boolean breakOnAsyncCall
+      # The skipList specifies location ranges that should be skipped on step into.
+      experimental optional array of LocationRange skipList
 
   # Steps out of the function call.
   command stepOut
 
   # Steps over the statement.
   command stepOver
+    parameters
+      # The skipList specifies location ranges that should be skipped on step over.
+      experimental optional array of LocationRange skipList
 
   # Fired when breakpoint is resolved to an actual script and location.
   event breakpointResolved
```

## Roll protocol to r794596 — _2020-08-04T17:16:13.000Z_
######  Diff: [`8f538a9...92769fe`](https://github.com/ChromeDevTools/devtools-protocol/compare/8f538a9...92769fe)

```diff
@@ browser_protocol.pdl:623 @@ experimental domain Audits
       ContentSecurityPolicyViolationType contentSecurityPolicyViolationType
       optional AffectedFrame frameAncestor
       optional SourceCodeLocation sourceCodeLocation
+      optional integer violatingNodeId
 
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
```

## Roll protocol to r794471 — _2020-08-04T11:16:10.000Z_
######  Diff: [`6dad424...8f538a9`](https://github.com/ChromeDevTools/devtools-protocol/compare/6dad424...8f538a9)

```diff
@@ browser_protocol.pdl:1430 @@ experimental domain CSS
       # The stylesheet text.
       string text
 
+  # Starts tracking the given computed styles for updates. The specified array of properties
+  # replaces the one previously specified. Pass empty array to disable tracking.
+  # Use takeComputedStyleUpdates to retrieve the list of nodes that had properties modified.
+  # The changes to computed style properties are only tracked for nodes pushed to the front-end
+  # by the DOM agent. If no changes to the tracked properties occur after the node has been pushed
+  # to the front-end, no updates will be issued for the node.
+  experimental command trackComputedStyleUpdates
+    parameters
+      array of CSSComputedStyleProperty propertiesToTrack
+
+  # Polls the next batch of computed style updates.
+  experimental command takeComputedStyleUpdates
+    returns
+      # The list of node Ids that have their tracked computed styles updated
+      array of DOM.NodeId nodeIds
+
   # Find a rule with the given active property for the given node and set the new value for this
   # property
   command setEffectivePropertyValueForNode
```

## Roll protocol to r794453 — _2020-08-04T10:16:08.000Z_
######  Diff: [`efe2c1f...6dad424`](https://github.com/ChromeDevTools/devtools-protocol/compare/efe2c1f...6dad424)

```diff
@@ browser_protocol.pdl:5324 @@ experimental domain Overlay
       optional boolean showTrackSizes
       # The grid container border highlight color (default: transparent).
       optional DOM.RGBA gridBorderColor
-      # The cell border color (default: transparent).
-      optional DOM.RGBA cellBorderColor
+      # The cell border color (default: transparent). Deprecated, please use rowLineColor and columnLineColor instead.
+      deprecated optional DOM.RGBA cellBorderColor
+      # The row line color (default: transparent).
+      optional DOM.RGBA rowLineColor
+      # The column line color (default: transparent).
+      optional DOM.RGBA columnLineColor
       # Whether the grid border is dashed (default: false).
       optional boolean gridBorderDash
-      # Whether the cell border is dashed (default: false).
-      optional boolean cellBorderDash
+      # Whether the cell border is dashed (default: false). Deprecated, please us rowLineDash and columnLineDash instead.
+      deprecated optional boolean cellBorderDash
+      # Whether row lines are dashed (default: false).
+      optional boolean rowLineDash
+      # Whether column lines are dashed (default: false).
+      optional boolean columnLineDash
       # The row gap highlight fill color (default: transparent).
       optional DOM.RGBA rowGapColor
       # The row gap hatching fill color (default: transparent).
```

## Roll protocol to r794398 — _2020-08-04T05:16:06.000Z_
######  Diff: [`979117d...efe2c1f`](https://github.com/ChromeDevTools/devtools-protocol/compare/979117d...efe2c1f)

```diff
@@ browser_protocol.pdl:5646 @@ domain Page
       string url
       # Frame document's URL fragment including the '#'.
       experimental optional string urlFragment
+      # Frame document's registered domain, taking the public suffixes list into account.
+      # Extracted from the Frame's url.
+      # Example URLs: http://www.google.com/file.html -> "google.com"
+      #               http://a.b.co.uk/file.html      -> "b.co.uk"
+      experimental string domainAndRegistry
       # Frame document's security origin.
       string securityOrigin
       # Frame document's mimeType as determined by the browser.
```

## Roll protocol to r793541 — _2020-07-31T08:16:13.000Z_
######  Diff: [`f67ba47...979117d`](https://github.com/ChromeDevTools/devtools-protocol/compare/f67ba47...979117d)

```diff
@@ browser_protocol.pdl:576 @@ experimental domain Audits
   type BlockedByResponseIssueDetails extends object
     properties
       AffectedRequest request
-      optional AffectedFrame frame
+      optional AffectedFrame parentFrame
+      optional AffectedFrame blockedFrame
       BlockedByResponseReason reason
 
   type HeavyAdResolutionStatus extends string
```

## Roll protocol to r792906 — _2020-07-29T22:16:14.000Z_
######  Diff: [`158ed24...f67ba47`](https://github.com/ChromeDevTools/devtools-protocol/compare/158ed24...f67ba47)

```diff
@@ browser_protocol.pdl:5298 @@ experimental domain Overlay
   depends on Page
   depends on Runtime
 
+  # Configuration data for drawing the source order of an elements children.
+  type SourceOrderConfig extends object
+    properties
+      # the color to outline the givent element in.
+      DOM.RGBA parentOutlineColor
+      # the color to outline the child elements in.
+      DOM.RGBA childOutlineColor
+
   # Configuration data for the highlighting of Grid elements.
   type GridHighlightConfig extends object
     properties
@@ -5430,6 +5438,15 @@ experimental domain Overlay
       # Grid Highlight data for the node ids provided.
       object highlights
 
+  # For Source Order Viewer testing.
+  command getSourceOrderHighlightObjectForTest
+    parameters
+      # Id of the node to highlight.
+      DOM.NodeId nodeId
+    returns
+      # Source order highlight data for the node id provided.
+      object highlight
+
   # Hides any highlight.
   command hideHighlight
 
@@ -5484,6 +5501,19 @@ experimental domain Overlay
       # The highlight outline color (default: transparent).
       optional DOM.RGBA outlineColor
 
+  # Highlights the source order of the children of the DOM node with given id or with the given
+  # JavaScript object wrapper. Either nodeId or objectId must be specified.
+  command highlightSourceOrder
+    parameters
+      # A descriptor for the appearance of the overlay drawing.
+      SourceOrderConfig sourceOrderConfig
+      # Identifier of the node to highlight.
+      optional DOM.NodeId nodeId
+      # Identifier of the backend node to highlight.
+      optional DOM.BackendNodeId backendNodeId
+      # JavaScript object id of the node to be highlighted.
+      optional Runtime.RemoteObjectId objectId
+
   # Enters the 'inspect' mode. In this mode, elements that user is hovering over are highlighted.
   # Backend then generates 'inspectNodeRequested' event upon element selection.
   command setInspectMode
```

## Roll protocol to r792754 — _2020-07-29T17:16:33.000Z_
######  Diff: [`25ef76c...158ed24`](https://github.com/ChromeDevTools/devtools-protocol/compare/25ef76c...158ed24)

```diff
@@ browser_protocol.pdl:3148 @@ domain Emulation
       # Mock accuracy
       optional number accuracy
 
+  # Overrides the Idle state.
+  experimental command setIdleOverride
+    parameters
+      # Mock isUserActive
+      boolean isUserActive
+      # Mock isScreenUnlocked
+      boolean isScreenUnlocked
+
+  # Clears Idle state overrides.
+  experimental command clearIdleOverride
+
   # Overrides value returned by the javascript navigator object.
   experimental deprecated command setNavigatorOverrides
     parameters
```

## Roll protocol to r792702 — _2020-07-29T15:16:16.000Z_
######  Diff: [`6404206...25ef76c`](https://github.com/ChromeDevTools/devtools-protocol/compare/6404206...25ef76c)

```diff
@@ browser_protocol.pdl:472 @@ experimental domain Audits
     enum
       ExcludeSameSiteUnspecifiedTreatedAsLax
       ExcludeSameSiteNoneInsecure
+      ExcludeSameSiteLax
+      ExcludeSameSiteStrict
 
   type SameSiteCookieWarningReason extends string
     enum
```

## Roll protocol to r792050 — _2020-07-27T23:16:18.000Z_
######  Diff: [`5b2db53...6404206`](https://github.com/ChromeDevTools/devtools-protocol/compare/5b2db53...6404206)

```diff
@@ js_protocol.pdl:572 @@ domain Debugger
       experimental optional integer codeOffset
       # The language of the script.
       experimental optional Debugger.ScriptLanguage scriptLanguage
+      # The name the embedder supplied for this script.
+      experimental optional string embedderName
 
   # Fired when virtual machine parses script. This event is also fired for all known and uncollected
   # scripts upon enabling debugger.
@@ -613,6 +615,8 @@ domain Debugger
       experimental optional Debugger.ScriptLanguage scriptLanguage
       # If the scriptLanguage is WebASsembly, the source of debug symbols for the module.
       experimental optional Debugger.DebugSymbols debugSymbols
+      # The name the embedder supplied for this script.
+      experimental optional string embedderName
 
 experimental domain HeapProfiler
   depends on Runtime
```

## Roll protocol to r791394 — _2020-07-25T09:16:14.000Z_
######  Diff: [`c5d82e9...5b2db53`](https://github.com/ChromeDevTools/devtools-protocol/compare/c5d82e9...5b2db53)

```diff
@@ browser_protocol.pdl:4860 @@ domain Network
   # detailed cookie information in the `cookies` field.
   command getCookies
     parameters
-      # The list of URLs for which applicable cookies will be fetched
+      # The list of URLs for which applicable cookies will be fetched.
+      # If not specified, it's assumed to be set to the list containing
+      # the URLs of the page and all of its subframes.
       optional array of string urls
     returns
       # Array of cookie objects.
```

## Roll protocol to r791071 — _2020-07-22T23:16:12.000Z_
######  Diff: [`7f76206...c5d82e9`](https://github.com/ChromeDevTools/devtools-protocol/compare/7f76206...c5d82e9)

```diff
@@ browser_protocol.pdl:7646 @@ experimental domain Fetch
       # If set, the request method is overridden.
       optional string method
       # If set, overrides the post data in the request.
-      optional string postData
+      optional binary postData
       # If set, overrides the request headers.
       optional array of HeaderEntry headers
```

## Roll protocol to r790520 — _2020-07-21T20:16:17.000Z_
######  Diff: [`bfd8ad7...7f76206`](https://github.com/ChromeDevTools/devtools-protocol/compare/bfd8ad7...7f76206)

```diff
@@ browser_protocol.pdl:4260 @@ domain Network
       High
       VeryHigh
 
+  # Post data entry for HTTP request
+  type PostDataEntry extends object
+    properties
+      optional binary bytes
+
   # HTTP request data.
   type Request extends object
     properties
@@ -4275,6 +4280,8 @@ domain Network
       optional string postData
       # True when the request has POST data. Note that postData might still be omitted when this flag is true when the data is too long.
       optional boolean hasPostData
+      # Request body elements. This will be converted from base64 to binary
+      experimental optional array of PostDataEntry postDataEntries
       # The mixed content type of the request.
       optional Security.MixedContentType mixedContentType
       # Priority of the resource request at the time request is sent.
```

## Roll protocol to r789877 — _2020-07-20T10:16:15.000Z_
######  Diff: [`2dc3bb9...294ad98`](https://github.com/ChromeDevTools/devtools-protocol/compare/2dc3bb9...294ad98)

```diff
@@ browser_protocol.pdl:5289 @@ experimental domain Overlay
       optional boolean showAreaNames
       # Show line name labels (default: false).
       optional boolean showLineNames
+      # Show track size labels (default: false).
+      optional boolean showTrackSizes
       # The grid container border highlight color (default: transparent).
       optional DOM.RGBA gridBorderColor
       # The cell border color (default: transparent).
```

## Roll protocol to r789773 — _2020-07-18T10:16:27.000Z_
######  Diff: [`ffbd7f9...2dc3bb9`](https://github.com/ChromeDevTools/devtools-protocol/compare/ffbd7f9...2dc3bb9)

```diff
@@ browser_protocol.pdl:5287 @@ experimental domain Overlay
       optional boolean showNegativeLineNumbers
       # Show area name labels (default: false).
       optional boolean showAreaNames
+      # Show line name labels (default: false).
+      optional boolean showLineNames
       # The grid container border highlight color (default: transparent).
       optional DOM.RGBA gridBorderColor
       # The cell border color (default: transparent).
```

## Roll protocol to r788664 — _2020-07-15T16:16:17.000Z_
######  Diff: [`1e13543...ffbd7f9`](https://github.com/ChromeDevTools/devtools-protocol/compare/1e13543...ffbd7f9)

```diff
@@ browser_protocol.pdl:605 @@ experimental domain Audits
       kTrustedTypesSinkViolation
       kTrustedTypesPolicyViolation
 
+  type SourceCodeLocation extends object
+    properties
+      string url
+      integer lineNumber
+      integer columnNumber
+
   type ContentSecurityPolicyIssueDetails extends object
     properties
       # The url not included in allowed sources.
@@ -613,6 +619,7 @@ experimental domain Audits
       string violatedDirective
       ContentSecurityPolicyViolationType contentSecurityPolicyViolationType
       optional AffectedFrame frameAncestor
+      optional SourceCodeLocation sourceCodeLocation
 
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
```

## Roll protocol to r788135 — _2020-07-14T13:16:33.000Z_
######  Diff: [`40acafd...1e13543`](https://github.com/ChromeDevTools/devtools-protocol/compare/40acafd...1e13543)

```diff
@@ browser_protocol.pdl:5558 @@ domain Page
   # Unique frame identifier.
   type FrameId extends string
 
+  # Indicates whether a frame has been identified as an ad.
+  experimental type AdFrameType extends string
+    enum
+      none
+      # This frame is a subframe of an ad frame.
+      child
+      # This frame is the root of an ad frame.
+      root
+
   # Information about the Frame on the page.
   type Frame extends object
     properties
@@ -5579,6 +5588,8 @@ domain Page
       string mimeType
       # If the frame failed to load, this contains the URL that could not be loaded. Note that unlike url above, this URL may contain a fragment.
       experimental optional string unreachableUrl
+      # Indicates whether this frame was tagged as an ad.
+      experimental optional AdFrameType adFrameType
 
   # Information about the Resource on the page.
   experimental type FrameResource extends object
```

## Roll protocol to r787341 — _2020-07-10T20:16:13.000Z_
######  Diff: [`65755e2...370db8f`](https://github.com/ChromeDevTools/devtools-protocol/compare/65755e2...370db8f)

```diff
@@ browser_protocol.pdl:5339 @@ experimental domain Overlay
       hsl
       hex
 
+  # Configurations for Persistent Grid Highlight
+  type GridNodeHighlightConfig extends object
+    properties
+      # A descriptor for the highlight appearance.
+      GridHighlightConfig gridHighlightConfig
+      # Identifier of the node to highlight.
+      DOM.NodeId nodeId
+
   # Configuration for dual screen hinge
   type HingeConfig extends object
     properties
@@ -5380,6 +5388,15 @@ experimental domain Overlay
       # Highlight data for the node.
       object highlight
 
+  # For Persistent Grid testing.
+  command getGridHighlightObjectsForTest
+    parameters
+      # Ids of the node to get highlight object for.
+      array of DOM.NodeId nodeIds
+    returns
+      # Grid Highlight data for the node ids provided.
+      object highlights
+
   # Hides any highlight.
   command hideHighlight
 
@@ -5467,6 +5484,12 @@ experimental domain Overlay
       # True for showing the FPS counter
       boolean show
 
+  # Highlight multiple elements with the CSS Grid overlay.
+  command setShowGridOverlays
+    parameters
+      # An array of node identifiers and descriptors for the highlight appearance.
+      array of GridNodeHighlightConfig gridNodeHighlightConfigs
+
   # Requests that backend shows paint rectangles
   command setShowPaintRects
     parameters
```

## Roll protocol to r787108 — _2020-07-10T06:16:07.000Z_
######  Diff: [`88c2dab...65755e2`](https://github.com/ChromeDevTools/devtools-protocol/compare/88c2dab...65755e2)

```diff
@@ browser_protocol.pdl:1229 @@ experimental domain CSS
       # Amount of glyphs that were rendered with this font.
       number glyphCount
 
+  # Information about font variation axes for variable fonts
+  type FontVariationAxis extends object
+    properties
+      # The font-variation-setting tag (a.k.a. "axis tag").
+      string tag
+      # Human-readable variation name in the default language (normally, "en").
+      string name
+      # The minimum value (inclusive) the font supports for this tag.
+      number minValue
+      # The maximum value (inclusive) the font supports for this tag.
+      number maxValue
+      # The default value.
+      number defaultValue
+
   # Properties of a web font: https://www.w3.org/TR/2008/REC-CSS2-20080411/fonts.html#font-descriptions
+  # and additional information such as platformFontFamily and fontVariationAxes.
   type FontFace extends object
     properties
       # The font-family.
@@ -1248,6 +1263,8 @@ experimental domain CSS
       string src
       # The resolved platform font family
       string platformFontFamily
+      # Available variation settings (a.k.a. "axes").
+      optional array of FontVariationAxis fontVariationAxes
 
   # CSS keyframes rule representation.
   type CSSKeyframesRule extends object
```

## Roll protocol to r786951 — _2020-07-09T22:16:05.000Z_
######  Diff: [`3e005aa...88c2dab`](https://github.com/ChromeDevTools/devtools-protocol/compare/3e005aa...88c2dab)

```diff
@@ browser_protocol.pdl:2956 @@ domain Emulation
       # Orientation angle.
       integer angle
 
+  type DisplayFeature extends object
+    properties
+      # Orientation of a display feature in relation to screen
+      enum orientation
+        vertical
+        horizontal
+      # The offset from the screen origin in either the x (for vertical
+      # orientation) or y (for horizontal orientation) direction.
+      integer offset
+      # A display feature may mask content such that it is not physically
+      # displayed - this length along with the offset describes this area.
+      # A display feature that only splits content will have a 0 mask_length.
+      integer maskLength
+
   type MediaFeature extends object
     properties
       string name
@@ -3054,6 +3068,9 @@ domain Emulation
       # If set, the visible area of the page will be overridden to this viewport. This viewport
       # change is not observed by the page, e.g. viewport-relative elements do not change positions.
       experimental optional Page.Viewport viewport
+      # If set, the display feature of a multi-segment screen. If not set, multi-segment support
+      # is turned-off.
+      experimental optional DisplayFeature displayFeature
 
   experimental command setScrollbarsHidden
     parameters
```

## Roll protocol to r786047 — _2020-07-07T23:16:12.000Z_
######  Diff: [`448edcd...d0d50cd`](https://github.com/ChromeDevTools/devtools-protocol/compare/448edcd...d0d50cd)

```diff
@@ browser_protocol.pdl:5244 @@ experimental domain Overlay
       optional boolean showPositiveLineNumbers
       # Show Negative line number labels (default: false).
       optional boolean showNegativeLineNumbers
+      # Show area name labels (default: false).
+      optional boolean showAreaNames
       # The grid container border highlight color (default: transparent).
       optional DOM.RGBA gridBorderColor
       # The cell border color (default: transparent).
@@ -5260,6 +5262,8 @@ experimental domain Overlay
       optional DOM.RGBA columnGapColor
       # The column gap hatching fill color (default: transparent).
       optional DOM.RGBA columnHatchColor
+      # The named grid areas border color (Default: transparent).
+      optional DOM.RGBA areaBorderColor
 
   # Configuration data for the highlighting of page elements.
   type HighlightConfig extends object
```

## Roll protocol to r785822 — _2020-07-07T17:16:29.000Z_
######  Diff: [`20413fc...448edcd`](https://github.com/ChromeDevTools/devtools-protocol/compare/20413fc...448edcd)

```diff
@@ browser_protocol.pdl:7955 @@ experimental domain WebAuthn
       AuthenticatorId authenticatorId
       boolean isUserVerified
 
+  # Sets whether tests of user presence will succeed immediately (if true) or fail to resolve (if false) for an authenticator.
+  # The default is true.
+  command setAutomaticPresenceSimulation
+    parameters
+      AuthenticatorId authenticatorId
+      boolean enabled
+
 # This domain allows detailed inspection of media elements
 experimental domain Media
```

## Roll protocol to r784747 — _2020-07-02T09:16:05.000Z_
######  Diff: [`f814796...20413fc`](https://github.com/ChromeDevTools/devtools-protocol/compare/f814796...20413fc)

```diff
@@ browser_protocol.pdl:597 @@ experimental domain Audits
       # The frame that was blocked.
       AffectedFrame frame
 
+  type ContentSecurityPolicyViolationType extends string
+    enum
+      kInlineViolation
+      kEvalViolation
+      kURLViolation
+      kTrustedTypesSinkViolation
+      kTrustedTypesPolicyViolation
+
+  type ContentSecurityPolicyIssueDetails extends object
+    properties
+      # The url not included in allowed sources.
+      optional string blockedURL
+      # Specific directive that is violated, causing the CSP issue.
+      string violatedDirective
+      ContentSecurityPolicyViolationType contentSecurityPolicyViolationType
+      optional AffectedFrame frameAncestor
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -606,6 +623,7 @@ experimental domain Audits
       MixedContentIssue
       BlockedByResponseIssue
       HeavyAdIssue
+      ContentSecurityPolicyIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -616,6 +634,7 @@ experimental domain Audits
       optional MixedContentIssueDetails mixedContentIssueDetails
       optional BlockedByResponseIssueDetails blockedByResponseIssueDetails
       optional HeavyAdIssueDetails heavyAdIssueDetails
+      optional ContentSecurityPolicyIssueDetails contentSecurityPolicyIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r783643 — _2020-06-29T20:16:10.000Z_
######  Diff: [`c480f8a...cde4dcd`](https://github.com/ChromeDevTools/devtools-protocol/compare/c480f8a...cde4dcd)

```diff
@@ browser_protocol.pdl:597 @@ experimental domain Audits
       # The frame that was blocked.
       AffectedFrame frame
 
-  type ContentSecurityPolicyViolationType extends string
-    enum
-      kInlineViolation
-      kEvalViolation
-      kURLViolation
-      kTrustedTypesSinkViolation
-      kTrustedTypesPolicyViolation
-
-  type ContentSecurityPolicyIssueDetails extends object
-    properties
-      # The url not included in allowed sources.
-      optional string blockedURL
-      # Specific directive that is violated, causing the CSP issue.
-      string violatedDirective
-      ContentSecurityPolicyViolationType contentSecurityPolicyViolationType
-      optional AffectedFrame frameAncestor
-
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -623,7 +606,6 @@ experimental domain Audits
       MixedContentIssue
       BlockedByResponseIssue
       HeavyAdIssue
-      ContentSecurityPolicyIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -634,7 +616,6 @@ experimental domain Audits
       optional MixedContentIssueDetails mixedContentIssueDetails
       optional BlockedByResponseIssueDetails blockedByResponseIssueDetails
       optional HeavyAdIssueDetails heavyAdIssueDetails
-      optional ContentSecurityPolicyIssueDetails contentSecurityPolicyIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r783602 — _2020-06-29T18:16:09.000Z_
######  Diff: [`38c54b5...c480f8a`](https://github.com/ChromeDevTools/devtools-protocol/compare/38c54b5...c480f8a)

```diff
@@ browser_protocol.pdl:597 @@ experimental domain Audits
       # The frame that was blocked.
       AffectedFrame frame
 
+  type ContentSecurityPolicyViolationType extends string
+    enum
+      kInlineViolation
+      kEvalViolation
+      kURLViolation
+      kTrustedTypesSinkViolation
+      kTrustedTypesPolicyViolation
+
+  type ContentSecurityPolicyIssueDetails extends object
+    properties
+      # The url not included in allowed sources.
+      optional string blockedURL
+      # Specific directive that is violated, causing the CSP issue.
+      string violatedDirective
+      ContentSecurityPolicyViolationType contentSecurityPolicyViolationType
+      optional AffectedFrame frameAncestor
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -606,6 +623,7 @@ experimental domain Audits
       MixedContentIssue
       BlockedByResponseIssue
       HeavyAdIssue
+      ContentSecurityPolicyIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -616,6 +634,7 @@ experimental domain Audits
       optional MixedContentIssueDetails mixedContentIssueDetails
       optional BlockedByResponseIssueDetails blockedByResponseIssueDetails
       optional HeavyAdIssueDetails heavyAdIssueDetails
+      optional ContentSecurityPolicyIssueDetails contentSecurityPolicyIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r783554 — _2020-06-29T16:17:02.000Z_
######  Diff: [`dae56d1...38c54b5`](https://github.com/ChromeDevTools/devtools-protocol/compare/dae56d1...38c54b5)

```diff
@@ browser_protocol.pdl:1457 @@ experimental domain CSS
       # Monotonically increasing time, in seconds.
       number timestamp
 
+  # Enables/disables rendering of local CSS fonts (enabled by default).
+  experimental command setLocalFontsEnabled
+    parameters
+      # Whether rendering of local fonts is enabled.
+      boolean enabled
+
   # Fires whenever a web font is updated.  A non-empty font parameter indicates a successfully loaded
   # web font
   event fontsUpdated
```

## Roll protocol to r780980 — _2020-06-22T21:16:09.000Z_
######  Diff: [`1ec1519...9277d63`](https://github.com/ChromeDevTools/devtools-protocol/compare/1ec1519...9277d63)

```diff
@@ browser_protocol.pdl:577 @@ experimental domain Audits
       optional AffectedFrame frame
       BlockedByResponseReason reason
 
+  type HeavyAdResolutionStatus extends string
+    enum
+      HeavyAdBlocked
+      HeavyAdWarning
+
+  type HeavyAdReason extends string
+    enum
+      NetworkTotalLimit
+      CpuTotalLimit
+      CpuPeakLimit
+
+  type HeavyAdIssueDetails extends object
+    properties
+      # The resolution status, either blocking the content or warning.
+      HeavyAdResolutionStatus resolution
+      # The reason the ad was blocked, total network or cpu or peak cpu.
+      HeavyAdReason reason
+      # The frame that was blocked.
+      AffectedFrame frame
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -585,7 +605,7 @@ experimental domain Audits
       SameSiteCookieIssue
       MixedContentIssue
       BlockedByResponseIssue
-
+      HeavyAdIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -595,6 +615,7 @@ experimental domain Audits
       optional SameSiteCookieIssueDetails sameSiteCookieIssueDetails
       optional MixedContentIssueDetails mixedContentIssueDetails
       optional BlockedByResponseIssueDetails blockedByResponseIssueDetails
+      optional HeavyAdIssueDetails heavyAdIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r780876 — _2020-06-22T18:16:04.000Z_
######  Diff: [`2488f11...1ec1519`](https://github.com/ChromeDevTools/devtools-protocol/compare/2488f11...1ec1519)

```diff
@@ browser_protocol.pdl:3502 @@ domain Input
       # Whether the event was from the left or right side of the keyboard. 1=Left, 2=Right (default:
       # 0).
       optional integer location
+      # Editing commands to send with the key event (e.g., 'selectAll') (default: []).
+      # These are related to but not equal the command names used in `document.execCommand` and NSStandardKeyBindingResponding.
+      # See https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/editing/commands/editor_command_names.h for valid command names.
+      experimental optional array of string commands
 
   # This method emulates inserting text that doesn't come from a key press,
   # for example an emoji keyboard or an IME.
```

## Roll protocol to r780326 — _2020-06-19T16:16:14.000Z_
######  Diff: [`c99e7da...2488f11`](https://github.com/ChromeDevTools/devtools-protocol/compare/c99e7da...2488f11)

```diff
@@ js_protocol.pdl:1370 @@ domain Runtime
       # Note that `let` variables can only be re-declared if they originate from
       # `replMode` themselves.
       experimental optional boolean replMode
+      # The Content Security Policy (CSP) for the target might block 'unsafe-eval'
+      # which includes eval(), Function(), setTimeout() and setInterval()
+      # when called with non-callable arguments. This flag bypasses CSP for this
+      # evaluation and allows unsafe-eval. Defaults to true.
+      experimental optional boolean allowUnsafeEvalBlockedByCSP
     returns
       # Evaluation result.
       RemoteObject result
```

## Roll protocol to r779350 — _2020-06-17T16:16:03.000Z_
######  Diff: [`447fb97...c99e7da`](https://github.com/ChromeDevTools/devtools-protocol/compare/447fb97...c99e7da)

```diff
@@ browser_protocol.pdl:5220 @@ experimental domain Overlay
       optional boolean showStyles
       # Whether the rulers should be shown (default: false).
       optional boolean showRulers
+      # Whether the a11y info should be shown (default: true).
+      optional boolean showAccessibilityInfo
       # Whether the extension lines from node to the rulers should be shown (default: false).
       optional boolean showExtensionLines
       # The content box highlight fill color (default: transparent).
@@ -5282,8 +5284,10 @@ experimental domain Overlay
       optional boolean includeDistance
       # Whether to include style info.
       optional boolean includeStyle
-      # The color format to get config with (default: hex)
+      # The color format to get config with (default: hex).
       optional ColorFormat colorFormat
+      # Whether to show accessibility info (default: true).
+      optional boolean showAccessibilityInfo
     returns
       # Highlight data for the node.
       object highlight
```

## Roll protocol to r778922 — _2020-06-16T19:16:05.000Z_
######  Diff: [`2049521...447fb97`](https://github.com/ChromeDevTools/devtools-protocol/compare/2049521...447fb97)

```diff
@@ browser_protocol.pdl:5220 @@ experimental domain Overlay
       optional boolean showStyles
       # Whether the rulers should be shown (default: false).
       optional boolean showRulers
-      # Whether the a11y info should be shown (default: true).
-      optional boolean showAccessibilityInfo
       # Whether the extension lines from node to the rulers should be shown (default: false).
       optional boolean showExtensionLines
       # The content box highlight fill color (default: transparent).
@@ -5284,10 +5282,8 @@ experimental domain Overlay
       optional boolean includeDistance
       # Whether to include style info.
       optional boolean includeStyle
-      # The color format to get config with (default: hex).
+      # The color format to get config with (default: hex)
       optional ColorFormat colorFormat
-      # Whether to show accessibility info (default: true).
-      optional boolean showAccessibilityInfo
     returns
       # Highlight data for the node.
       object highlight
```

## Roll protocol to r778805 — _2020-06-16T15:16:09.000Z_
######  Diff: [`5894100...2049521`](https://github.com/ChromeDevTools/devtools-protocol/compare/5894100...2049521)

```diff
@@ browser_protocol.pdl:5220 @@ experimental domain Overlay
       optional boolean showStyles
       # Whether the rulers should be shown (default: false).
       optional boolean showRulers
+      # Whether the a11y info should be shown (default: true).
+      optional boolean showAccessibilityInfo
       # Whether the extension lines from node to the rulers should be shown (default: false).
       optional boolean showExtensionLines
       # The content box highlight fill color (default: transparent).
@@ -5282,8 +5284,10 @@ experimental domain Overlay
       optional boolean includeDistance
       # Whether to include style info.
       optional boolean includeStyle
-      # The color format to get config with (default: hex)
+      # The color format to get config with (default: hex).
       optional ColorFormat colorFormat
+      # Whether to show accessibility info (default: true).
+      optional boolean showAccessibilityInfo
     returns
       # Highlight data for the node.
       object highlight
```

## Roll protocol to r778734 — _2020-06-16T11:16:09.000Z_
######  Diff: [`65bf0bb...5894100`](https://github.com/ChromeDevTools/devtools-protocol/compare/65bf0bb...5894100)

```diff
@@ browser_protocol.pdl:5192 @@ experimental domain Overlay
       optional boolean showGridExtensionLines
       # Show Positive line number labels (default: false).
       optional boolean showPositiveLineNumbers
+      # Show Negative line number labels (default: false).
+      optional boolean showNegativeLineNumbers
       # The grid container border highlight color (default: transparent).
       optional DOM.RGBA gridBorderColor
       # The cell border color (default: transparent).
```

## Roll protocol to r777489 — _2020-06-11T21:16:12.000Z_
######  Diff: [`6e822e3...65bf0bb`](https://github.com/ChromeDevTools/devtools-protocol/compare/6e822e3...65bf0bb)

```diff
@@ browser_protocol.pdl:5190 @@ experimental domain Overlay
     properties
       # Whether the extension lines from grid cells to the rulers should be shown (default: false).
       optional boolean showGridExtensionLines
+      # Show Positive line number labels (default: false).
+      optional boolean showPositiveLineNumbers
       # The grid container border highlight color (default: transparent).
       optional DOM.RGBA gridBorderColor
       # The cell border color (default: transparent).
```

## Roll protocol to r776922 — _2020-06-10T13:16:14.000Z_
######  Diff: [`c5f2d31...6e822e3`](https://github.com/ChromeDevTools/devtools-protocol/compare/c5f2d31...6e822e3)

```diff
@@ js_protocol.pdl:1009 @@ domain Runtime
         f32
         f64
         v128
-        anyref
+        externref
       # Object class (constructor) name. Specified for `object` type values only.
       optional string className
       # Remote object value in case of primitive values or JSON values (if it was requested).
```

## Roll protocol to r776422 — _2020-06-09T07:16:08.000Z_
######  Diff: [`bca028b...c5f2d31`](https://github.com/ChromeDevTools/devtools-protocol/compare/bca028b...c5f2d31)

```diff
@@ browser_protocol.pdl:1025 @@ experimental domain CSS
       # Whether this stylesheet is created for STYLE tag by parser. This flag is not set for
       # document.written STYLE tags.
       boolean isInline
+      # Whether this stylesheet is mutable. Inline stylesheets become mutable
+      # after they have been modified via CSSOM API.
+      # <link> element's stylesheets are never mutable. Constructed stylesheets
+      # (new CSSStyleSheet()) are mutable immediately after creation.
+      boolean isMutable
       # Line offset of the stylesheet within the resource (zero based).
       number startLine
       # Column offset of the stylesheet within the resource (zero based).
```

## Roll protocol to r774686 — _2020-06-03T17:15:57.000Z_
######  Diff: [`3386102...8d9fa2d`](https://github.com/ChromeDevTools/devtools-protocol/compare/3386102...8d9fa2d)

```diff
@@ browser_protocol.pdl:7075 @@ domain Target
     parameters
       # If specified, disposes this context when debugging session disconnects.
       optional boolean disposeOnDetach
+      # Proxy server, similar to the one passed to --proxy-server
+      optional string proxyServer
+      # Proxy bypass list, similar to the one passed to --proxy-bypass-list
+      optional string proxyBypassList
+
     returns
       # The id of the context created.
       Browser.BrowserContextID browserContextId
```

## Roll protocol to r772852 — _2020-05-28T20:16:11.000Z_
######  Diff: [`69d3d03...3386102`](https://github.com/ChromeDevTools/devtools-protocol/compare/69d3d03...3386102)

```diff
@@ browser_protocol.pdl:4270 @@ domain Network
       corp-not-same-origin-after-defaulted-to-same-origin-by-coep
       corp-not-same-site
 
+  # Source of serviceworker response.
+  type ServiceWorkerResponseSource extends string
+    enum
+      cache-storage
+      http-cache
+      fallback-code
+      network
+
   # HTTP response data.
   type Response extends object
     properties
@@ -4307,6 +4315,12 @@ domain Network
       number encodedDataLength
       # Timing information for the given request.
       optional ResourceTiming timing
+      # Response source of response from ServiceWorker.
+      optional ServiceWorkerResponseSource serviceWorkerResponseSource
+      # The time at which the returned response was generated.
+      optional TimeSinceEpoch responseTime
+      # Cache Storage Cache Name.
+      optional string cacheStorageCacheName
       # Protocol used to fetch this request.
       optional string protocol
       # Security state of the request resource.
```

## Roll protocol to r770484 — _2020-05-20T07:16:02.000Z_
######  Diff: [`2cb3356...69d3d03`](https://github.com/ChromeDevTools/devtools-protocol/compare/2cb3356...69d3d03)

```diff
@@ browser_protocol.pdl:4140 @@ domain Network
       experimental number workerStart
       # Finished Starting ServiceWorker.
       experimental number workerReady
+      # Started fetch event.
+      experimental number workerFetchStart
+      # Settled fetch event respondWith promise.
+      experimental number workerRespondWithSettled
       # Started sending request.
       number sendStart
       # Finished sending request.
```

## Roll protocol to r770080 — _2020-05-19T12:16:05.000Z_
######  Diff: [`c669e10...2cb3356`](https://github.com/ChromeDevTools/devtools-protocol/compare/c669e10...2cb3356)

```diff
@@ browser_protocol.pdl:558 @@ experimental domain Audits
       # Optional because not every mixed content issue is necessarily linked to a frame.
       optional AffectedFrame frame
 
+  # Enum indicating the reason a response has been blocked. These reasons are
+  # refinements of the net error BLOCKED_BY_RESPONSE.
+  type BlockedByResponseReason extends string
+    enum
+      CoepFrameResourceNeedsCoepHeader
+      CoopSandboxedIFrameCannotNavigateToCoopPage
+      CorpNotSameOrigin
+      CorpNotSameOriginAfterDefaultedToSameOriginByCoep
+      CorpNotSameSite
+
+  # Details for a request that has been blocked with the BLOCKED_BY_RESPONSE
+  # code. Currently only used for COEP/COOP, but may be extended to include
+  # some CSP errors in the future.
+  type BlockedByResponseIssueDetails extends object
+    properties
+      AffectedRequest request
+      optional AffectedFrame frame
+      BlockedByResponseReason reason
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -565,6 +584,8 @@ experimental domain Audits
     enum
       SameSiteCookieIssue
       MixedContentIssue
+      BlockedByResponseIssue
+
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -573,6 +594,7 @@ experimental domain Audits
     properties
       optional SameSiteCookieIssueDetails sameSiteCookieIssueDetails
       optional MixedContentIssueDetails mixedContentIssueDetails
+      optional BlockedByResponseIssueDetails blockedByResponseIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r767361 — _2020-05-11T17:16:19.000Z_
######  Diff: [`76c859e...0a94929`](https://github.com/ChromeDevTools/devtools-protocol/compare/76c859e...0a94929)

```diff
@@ browser_protocol.pdl:478 @@ experimental domain Audits
       WarnSameSiteUnspecifiedCrossSiteContext
       WarnSameSiteNoneInsecure
       WarnSameSiteUnspecifiedLaxAllowUnsafe
-      WarnSameSiteCrossSchemeSecureUrlMethodUnsafe
-      WarnSameSiteCrossSchemeSecureUrlLax
-      WarnSameSiteCrossSchemeSecureUrlStrict
-      WarnSameSiteCrossSchemeInsecureUrlMethodUnsafe
-      WarnSameSiteCrossSchemeInsecureUrlLax
-      WarnSameSiteCrossSchemeInsecureUrlStrict
+      WarnSameSiteStrictLaxDowngradeStrict
+      WarnSameSiteStrictCrossDowngradeStrict
+      WarnSameSiteStrictCrossDowngradeLax
+      WarnSameSiteLaxCrossDowngradeStrict
+      WarnSameSiteLaxCrossDowngradeLax
 
   type SameSiteCookieOperation extends string
     enum
```

## Roll protocol to r767035 — _2020-05-08T23:17:20.000Z_
######  Diff: [`08a3c82...76c859e`](https://github.com/ChromeDevTools/devtools-protocol/compare/08a3c82...76c859e)

```diff
@@ browser_protocol.pdl:6234 @@ domain Page
       string guid
       # URL of the resource being downloaded.
       string url
-      # Filename of the resource (may diverge from the actual filename saved on disk)
-      string filename
+      # Suggested file name of the resource (the actual name of the file saved on disk may differ).
+      string suggestedFilename
 
   # Fired when download makes progress. Last call has |done| == true.
   experimental event downloadProgress
```

## Roll protocol to r766630 — _2020-05-07T23:16:09.000Z_
######  Diff: [`0e007a5...08a3c82`](https://github.com/ChromeDevTools/devtools-protocol/compare/0e007a5...08a3c82)

```diff
@@ browser_protocol.pdl:6234 @@ domain Page
       string guid
       # URL of the resource being downloaded.
       string url
+      # Filename of the resource (may diverge from the actual filename saved on disk)
+      string filename
 
   # Fired when download makes progress. Last call has |done| == true.
   experimental event downloadProgress
```

## Roll protocol to r766603 — _2020-05-07T22:16:08.000Z_
######  Diff: [`795f478...0e007a5`](https://github.com/ChromeDevTools/devtools-protocol/compare/795f478...0e007a5)

```diff
@@ browser_protocol.pdl:5141 @@ experimental domain Overlay
   depends on Page
   depends on Runtime
 
+  # Configuration data for the highlighting of Grid elements.
+  type GridHighlightConfig extends object
+    properties
+      # Whether the extension lines from grid cells to the rulers should be shown (default: false).
+      optional boolean showGridExtensionLines
+      # The grid container border highlight color (default: transparent).
+      optional DOM.RGBA gridBorderColor
+      # The cell border color (default: transparent).
+      optional DOM.RGBA cellBorderColor
+      # Whether the grid border is dashed (default: false).
+      optional boolean gridBorderDash
+      # Whether the cell border is dashed (default: false).
+      optional boolean cellBorderDash
+      # The row gap highlight fill color (default: transparent).
+      optional DOM.RGBA rowGapColor
+      # The row gap hatching fill color (default: transparent).
+      optional DOM.RGBA rowHatchColor
+      # The column gap highlight fill color (default: transparent).
+      optional DOM.RGBA columnGapColor
+      # The column gap hatching fill color (default: transparent).
+      optional DOM.RGBA columnHatchColor
+
   # Configuration data for the highlighting of page elements.
   type HighlightConfig extends object
     properties
@@ -5170,6 +5192,8 @@ experimental domain Overlay
       optional DOM.RGBA cssGridColor
       # The color format used to format color styles (default: hex).
       optional ColorFormat colorFormat
+      # The grid layout highlight configuration (default: all transparent).
+      optional GridHighlightConfig gridHighlightConfig
 
   type ColorFormat extends string
     enum
```

## Roll protocol to r766377 — _2020-05-07T12:15:58.000Z_
######  Diff: [`4577b7f...795f478`](https://github.com/ChromeDevTools/devtools-protocol/compare/4577b7f...795f478)

```diff
@@ browser_protocol.pdl:5112 @@ domain Network
     parameters
       # Request identifier. Used to match this information to an existing requestWillBeSent event.
       RequestId requestId
-      # A list of cookies which will not be sent with this request along with corresponding reasons
-      # for blocking.
-      array of BlockedCookieWithReason blockedCookies
+      # A list of cookies potentially associated to the requested URL. This includes both cookies sent with
+      # the request and the ones not sent; the latter are distinguished by having blockedReason field set.
+      array of BlockedCookieWithReason associatedCookies
       # Raw request headers as they will be sent over the wire.
       Headers headers
```

## Roll protocol to r766017 — _2020-05-06T16:17:41.000Z_
######  Diff: [`90a2227...4577b7f`](https://github.com/ChromeDevTools/devtools-protocol/compare/90a2227...4577b7f)

```diff
@@ js_protocol.pdl:204 @@ domain Debugger
       # Exception details.
       optional Runtime.ExceptionDetails exceptionDetails
 
+  # Execute a Wasm Evaluator module on a given call frame.
+  experimental command executeWasmEvaluator
+    parameters
+      # WebAssembly call frame identifier to evaluate on.
+      CallFrameId callFrameId
+      # Code of the evaluator module.
+      binary evaluator
+      # Terminate execution after timing out (number of milliseconds).
+      experimental optional Runtime.TimeDelta timeout
+    returns
+      # Object wrapper for the evaluation result.
+      Runtime.RemoteObject result
+      # Exception details.
+      optional Runtime.ExceptionDetails exceptionDetails
+
   # Returns possible locations for breakpoint. scriptId in start and end range locations should be
   # the same.
   command getPossibleBreakpoints
@@ -510,6 +525,18 @@ domain Debugger
       JavaScript
       WebAssembly
 
+  # Debug symbols available for a wasm script.
+  type DebugSymbols extends object
+    properties
+      # Type of the debug symbols.
+      enum type
+        None
+        SourceMap
+        EmbeddedDWARF
+        ExternalDWARF
+      # URL of the external symbol source.
+      optional string externalURL
+
   # Fired when virtual machine fails to parse the script.
   event scriptFailedToParse
     parameters
@@ -584,6 +611,8 @@ domain Debugger
       experimental optional integer codeOffset
       # The language of the script.
       experimental optional Debugger.ScriptLanguage scriptLanguage
+      # If the scriptLanguage is WebASsembly, the source of debug symbols for the module.
+      experimental optional Debugger.DebugSymbols debugSymbols
 
 experimental domain HeapProfiler
   depends on Runtime
```

## Roll protocol to r765803 — _2020-05-05T23:16:02.000Z_
######  Diff: [`6b310c4...90a2227`](https://github.com/ChromeDevTools/devtools-protocol/compare/6b310c4...90a2227)

```diff
@@ browser_protocol.pdl:2899 @@ domain Emulation
       pause
       pauseIfNetworkFetchesPending
 
+  # Used to specify User Agent Cient Hints to emulate. See https://wicg.github.io/ua-client-hints
+  experimental type UserAgentBrandVersion extends object
+    properties
+      string brand
+      string version
+
+  # Used to specify User Agent Cient Hints to emulate. See https://wicg.github.io/ua-client-hints
+  experimental type UserAgentMetadata extends object
+    properties
+      array of UserAgentBrandVersion brands
+      string fullVersion
+      string platform
+      string platformVersion
+      string architecture
+      string model
+      boolean mobile
+
   # Tells whether emulation is supported.
   command canEmulate
     returns
@@ -3098,6 +3115,8 @@ domain Emulation
       optional string acceptLanguage
       # The platform navigator.platform should return.
       optional string platform
+      # To be sent in Sec-CH-UA-* headers and returned in navigator.userAgentData
+      experimental optional UserAgentMetadata userAgentMetadata
 
 # This domain provides experimental commands only supported in headless mode.
 experimental domain HeadlessExperimental
@@ -4853,6 +4872,9 @@ domain Network
       optional string acceptLanguage
       # The platform navigator.platform should return.
       optional string platform
+      # To be sent in Sec-CH-UA-* headers and returned in navigator.userAgentData
+      experimental optional Emulation.UserAgentMetadata userAgentMetadata
+
 
   # Fired when data chunk was received over the network.
   event dataReceived
```

## Roll protocol to r765004 — _2020-05-04T08:16:14.000Z_
######  Diff: [`61f90ac...6b310c4`](https://github.com/ChromeDevTools/devtools-protocol/compare/61f90ac...6b310c4)

```diff
@@ browser_protocol.pdl:5146 @@ experimental domain Overlay
       optional DOM.RGBA shapeMarginColor
       # The grid layout color (default: transparent).
       optional DOM.RGBA cssGridColor
+      # The color format used to format color styles (default: hex).
+      optional ColorFormat colorFormat
+
+  type ColorFormat extends string
+    enum
+      rgb
+      hsl
+      hex
 
   # Configuration for dual screen hinge
   type HingeConfig extends object
@@ -5180,6 +5188,8 @@ experimental domain Overlay
       optional boolean includeDistance
       # Whether to include style info.
       optional boolean includeStyle
+      # The color format to get config with (default: hex)
+      optional ColorFormat colorFormat
     returns
       # Highlight data for the node.
       object highlight
```

## Roll protocol to r764791 — _2020-05-01T21:16:14.000Z_
######  Diff: [`fb81f45...61f90ac`](https://github.com/ChromeDevTools/devtools-protocol/compare/fb81f45...61f90ac)

```diff
@@ browser_protocol.pdl:5147 @@ experimental domain Overlay
       # The grid layout color (default: transparent).
       optional DOM.RGBA cssGridColor
 
+  # Configuration for dual screen hinge
+  type HingeConfig extends object
+    properties
+      # A rectangle represent hinge
+      DOM.Rect rect
+      # The content box highlight fill color (default: a dark color).
+      optional DOM.RGBA contentColor
+      # The content box highlight outline color (default: transparent).
+      optional DOM.RGBA outlineColor
+
   type InspectMode extends string
     enum
       searchForNode
@@ -5291,6 +5301,12 @@ experimental domain Overlay
       # Whether to paint size or not.
       boolean show
 
+  # Add a dual screen device hinge
+  command setShowHinge
+    parameters
+      # hinge data, null means hideHinge
+      optional HingeConfig hingeConfig
+
   # Fired when the node should be inspected. This happens after call to `setInspectMode` or when
   # user manually inspects an element.
   event inspectNodeRequested
```

## Roll protocol to r762508 — _2020-04-24T21:16:30.000Z_
######  Diff: [`37db537...fb81f45`](https://github.com/ChromeDevTools/devtools-protocol/compare/37db537...fb81f45)

```diff
@@ browser_protocol.pdl:5542 @@ domain Page
       reload
       anchorClick
 
+  experimental type ClientNavigationDisposition extends string
+    enum
+      currentTab
+      newTab
+      newWindow
+      download
+
   experimental type InstallabilityErrorArgument extends object
     properties
       # Argument name (e.g. name:'minimum-icon-size-in-pixels').
@@ -6118,6 +6125,8 @@ domain Page
       ClientNavigationReason reason
       # The destination URL for the requested navigation.
       string url
+      # The disposition for the navigation.
+      ClientNavigationDisposition disposition
 
   # Fired when frame schedules a potential navigation.
   deprecated event frameScheduledNavigation
```

## Roll protocol to r762397 — _2020-04-24T17:17:12.000Z_
######  Diff: [`a7f028b...37db537`](https://github.com/ChromeDevTools/devtools-protocol/compare/a7f028b...37db537)

```diff
@@ browser_protocol.pdl:7773 @@ experimental domain Media
 
   type Timestamp extends number
 
-  # Player Property type
+  # Have one type per entry in MediaLogRecord::Type
+  # Corresponds to kMessage
+  type PlayerMessage extends object
+    properties
+      # Keep in sync with MediaLogMessageLevel
+      # We are currently keeping the message level 'error' separate from the
+      # PlayerError type because right now they represent different things,
+      # this one being a DVLOG(ERROR) style log message that gets printed
+      # based on what log level is selected in the UI, and the other is a
+      # representation of a media::PipelineStatus object. Soon however we're
+      # going to be moving away from using PipelineStatus for errors and
+      # introducing a new error type which should hopefully let us integrate
+      # the error log level into the PlayerError type.
+      enum level
+        error
+        warning
+        info
+        debug
+      string message
+
+  # Corresponds to kMediaPropertyChange
   type PlayerProperty extends object
     properties
       string name
-      optional string value
-
-  # Break out events into different types
-  type PlayerEventType extends string
-    enum
-      errorEvent
-      triggeredEvent
-      messageEvent
+      string value
 
+  # Corresponds to kMediaEventTriggered
   type PlayerEvent extends object
     properties
-      PlayerEventType type
-      # Events are timestamped relative to the start of the player creation
-      # not relative to the start of playback.
       Timestamp timestamp
-      string name
       string value
 
+  # Corresponds to kMediaError
+  type PlayerError extends object
+    properties
+      enum type
+        # Compatability until we switch to media_error
+        pipeline_error
+        media_error
+      # When this switches to using media::Status instead of PipelineStatus
+      # we can remove "errorCode" and replace it with the fields from
+      # a Status instance. This also seems like a duplicate of the error
+      # level enum - there is a todo bug to have that level removed and
+      # use this instead. (crbug.com/1068454)
+      string errorCode
+
   # This can be called multiple times, and can be used to set / override /
   # remove player properties. A null propValue indicates removal.
   event playerPropertiesChanged
@@ -7809,6 +7833,18 @@ experimental domain Media
       PlayerId playerId
       array of PlayerEvent events
 
+  # Send a list of any messages that need to be delivered.
+  event playerMessagesLogged
+    parameters
+      PlayerId playerId
+      array of PlayerMessage messages
+
+  # Send a list of any errors that need to be delivered.
+  event playerErrorsRaised
+    parameters
+      PlayerId playerId
+      array of PlayerError errors
+
   # Called whenever a player is created, or when a new agent joins and recieves
   # a list of active players. If an agent is restored, it will recieve the full
   # list of player ids and all events again.
```

## Roll protocol to r761827 — _2020-04-23T07:16:09.000Z_
######  Diff: [`65061a8...a7f028b`](https://github.com/ChromeDevTools/devtools-protocol/compare/65061a8...a7f028b)

```diff
@@ browser_protocol.pdl:463 @@ experimental domain Audits
       Network.RequestId requestId
       optional string url
 
+  # Information about the frame affected by an inspector issue.
+  type AffectedFrame extends object
+    properties
+      Page.FrameId frameId
+
   type SameSiteCookieExclusionReason extends string
     enum
       ExcludeSameSiteUnspecifiedTreatedAsLax
@@ -500,12 +505,67 @@ experimental domain Audits
       optional string cookieUrl
       optional AffectedRequest request
 
+  type MixedContentResolutionStatus extends string
+    enum
+      MixedContentBlocked
+      MixedContentAutomaticallyUpgraded
+      MixedContentWarning
+
+  type MixedContentResourceType extends string
+    enum
+      Audio
+      Beacon
+      CSPReport
+      Download
+      EventSource
+      Favicon
+      Font
+      Form
+      Frame
+      Image
+      Import
+      Manifest
+      Ping
+      PluginData
+      PluginResource
+      Prefetch
+      Resource
+      Script
+      ServiceWorker
+      SharedWorker
+      Stylesheet
+      Track
+      Video
+      Worker
+      XMLHttpRequest
+      XSLT
+
+  type MixedContentIssueDetails extends object
+    properties
+      # The type of resource causing the mixed content issue (css, js, iframe,
+      # form,...). Marked as optional because it is mapped to from
+      # blink::mojom::RequestContextType, which will be replaced
+      # by network::mojom::RequestDestination
+      optional MixedContentResourceType resourceType
+      # The way the mixed content issue is being resolved.
+      MixedContentResolutionStatus resolutionStatus
+      # The unsafe http url causing the mixed content issue.
+      string insecureURL
+      # The url responsible for the call to an unsafe url.
+      string mainResourceURL
+      # The mixed content request.
+      # Does not always exist (e.g. for unsafe form submission urls).
+      optional AffectedRequest request
+      # Optional because not every mixed content issue is necessarily linked to a frame.
+      optional AffectedFrame frame
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
   type InspectorIssueCode extends string
     enum
       SameSiteCookieIssue
+      MixedContentIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -513,6 +573,7 @@ experimental domain Audits
   type InspectorIssueDetails extends object
     properties
       optional SameSiteCookieIssueDetails sameSiteCookieIssueDetails
+      optional MixedContentIssueDetails mixedContentIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r760817 — _2020-04-21T04:16:08.000Z_
######  Diff: [`f973935...65061a8`](https://github.com/ChromeDevTools/devtools-protocol/compare/f973935...65061a8)

```diff
@@ js_protocol.pdl:980 @@ domain Runtime
         f32
         f64
         v128
+        anyref
       # Object class (constructor) name. Specified for `object` type values only.
       optional string className
       # Remote object value in case of primitive values or JSON values (if it was requested).
```

## Roll protocol to r760545 — _2020-04-20T17:16:16.000Z_
######  Diff: [`4b02082...f973935`](https://github.com/ChromeDevTools/devtools-protocol/compare/4b02082...f973935)

```diff
@@ browser_protocol.pdl:366 @@ experimental domain Animation
       Animation animation
 
 experimental domain ApplicationCache
+  depends on Page
 
   # Detailed application cache resource information.
   type ApplicationCacheResource extends object
@@ -864,6 +865,7 @@ domain Browser
 # subsequently load the required stylesheet contents using the `getStyleSheet[Text]()` methods.
 experimental domain CSS
   depends on DOM
+  depends on Page
 
   type StyleSheetId extends string
 
@@ -6439,6 +6441,8 @@ domain Security
       optional string summary
 
 experimental domain ServiceWorker
+  depends on Target
+
   type RegistrationID extends string
 
   # ServiceWorker registration.
```

## Roll protocol to r758979 — _2020-04-14T20:16:08.000Z_
######  Diff: [`fc07ba2...4b02082`](https://github.com/ChromeDevTools/devtools-protocol/compare/fc07ba2...4b02082)

```diff
@@ browser_protocol.pdl:700 @@ domain Browser
   # Set permission settings for given origin.
   experimental command setPermission
     parameters
-      # Origin the permission applies to, all origins if not specified.
-      optional string origin
       # Descriptor of permission to override.
       PermissionDescriptor permission
       # Setting of the permission.
       PermissionSetting setting
+      # Origin the permission applies to, all origins if not specified.
+      optional string origin
       # Context to override. When omitted, default browser context is used.
       optional BrowserContextID browserContextId
 
   # Grant specific permissions to the given origin and reject all others.
   experimental command grantPermissions
     parameters
+      array of PermissionType permissions
       # Origin the permission applies to, all origins if not specified.
       optional string origin
-      array of PermissionType permissions
       # BrowserContext to override permissions. When omitted, default browser context is used.
       optional BrowserContextID browserContextId
```

## Merge pull request #209 from ChromeDevTools/bug-report-template — _2020-04-09T10:55:10.000Z_
######  Diff: [`d0bcd8d...b53777c`](https://github.com/ChromeDevTools/devtools-protocol/compare/d0bcd8d...b53777c)

```diff
@@ browser_protocol.pdl:454 @@ experimental domain Audits
       string name
       string path
       string domain
-      # Optionally identifies the site-for-cookies, which may be used by the
-      # front-end as additional context.
-      optional string siteForCookies
+
+  # Information about a request that is affected by an inspector issue.
+  type AffectedRequest extends object
+    properties
+      # The unique request id.
+      Network.RequestId requestId
+      optional string url
 
   type SameSiteCookieExclusionReason extends string
     enum
@@ -475,29 +479,36 @@ experimental domain Audits
       WarnSameSiteCrossSchemeInsecureUrlLax
       WarnSameSiteCrossSchemeInsecureUrlStrict
 
+  type SameSiteCookieOperation extends string
+    enum
+      SetCookie
+      ReadCookie
+
   # This information is currently necessary, as the front-end has a difficult
   # time finding a specific cookie. With this, we can convey specific error
   # information without the cookie.
   type SameSiteCookieIssueDetails extends object
     properties
+      AffectedCookie cookie
       array of SameSiteCookieWarningReason cookieWarningReasons
       array of SameSiteCookieExclusionReason cookieExclusionReasons
-
-  type AffectedResources extends object
-    properties
-      optional array of AffectedCookie cookies
+      # Optionally identifies the site-for-cookies and the cookie url, which
+      # may be used by the front-end as additional context.
+      SameSiteCookieOperation operation
+      optional string siteForCookies
+      optional string cookieUrl
+      optional AffectedRequest request
 
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
-  # information about the kind of issue, and AffectedResources to identify
-  # resources that are affected by this issue.
+  # information about the kind of issue.
   type InspectorIssueCode extends string
     enum
       SameSiteCookieIssue
 
   # This struct holds a list of optional fields with additional information
-  # pertaining to the kind of issue. This is useful if there is a number of
-  # very similar issues that only differ in details.
+  # specific to the kind of issue. When adding a new issue code, please also
+  # add a new optional field to this type.
   type InspectorIssueDetails extends object
     properties
       optional SameSiteCookieIssueDetails sameSiteCookieIssueDetails
@@ -507,7 +518,6 @@ experimental domain Audits
     properties
       InspectorIssueCode code
       InspectorIssueDetails details
-      AffectedResources resources
 
   # Returns the response body and size if it were re-encoded with the specified settings. Only
   # applies to images.
```

## Update bug report guidance to point to CRBug — _2020-04-09T10:51:30.000Z_
######  Diff: [`7f53fbc...d0bcd8d`](https://github.com/ChromeDevTools/devtools-protocol/compare/7f53fbc...d0bcd8d)

```diff
@@ browser_protocol.pdl:454 @@ experimental domain Audits
       string name
       string path
       string domain
-
-  # Information about a request that is affected by an inspector issue.
-  type AffectedRequest extends object
-    properties
-      # The unique request id.
-      Network.RequestId requestId
-      optional string url
+      # Optionally identifies the site-for-cookies, which may be used by the
+      # front-end as additional context.
+      optional string siteForCookies
 
   type SameSiteCookieExclusionReason extends string
     enum
@@ -479,36 +475,29 @@ experimental domain Audits
       WarnSameSiteCrossSchemeInsecureUrlLax
       WarnSameSiteCrossSchemeInsecureUrlStrict
 
-  type SameSiteCookieOperation extends string
-    enum
-      SetCookie
-      ReadCookie
-
   # This information is currently necessary, as the front-end has a difficult
   # time finding a specific cookie. With this, we can convey specific error
   # information without the cookie.
   type SameSiteCookieIssueDetails extends object
     properties
-      AffectedCookie cookie
       array of SameSiteCookieWarningReason cookieWarningReasons
       array of SameSiteCookieExclusionReason cookieExclusionReasons
-      # Optionally identifies the site-for-cookies and the cookie url, which
-      # may be used by the front-end as additional context.
-      SameSiteCookieOperation operation
-      optional string siteForCookies
-      optional string cookieUrl
-      optional AffectedRequest request
+
+  type AffectedResources extends object
+    properties
+      optional array of AffectedCookie cookies
 
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
-  # information about the kind of issue.
+  # information about the kind of issue, and AffectedResources to identify
+  # resources that are affected by this issue.
   type InspectorIssueCode extends string
     enum
       SameSiteCookieIssue
 
   # This struct holds a list of optional fields with additional information
-  # specific to the kind of issue. When adding a new issue code, please also
-  # add a new optional field to this type.
+  # pertaining to the kind of issue. This is useful if there is a number of
+  # very similar issues that only differ in details.
   type InspectorIssueDetails extends object
     properties
       optional SameSiteCookieIssueDetails sameSiteCookieIssueDetails
@@ -518,6 +507,7 @@ experimental domain Audits
     properties
       InspectorIssueCode code
       InspectorIssueDetails details
+      AffectedResources resources
 
   # Returns the response body and size if it were re-encoded with the specified settings. Only
   # applies to images.
```

## Roll protocol to r757450 — _2020-04-08T16:16:24.000Z_
######  Diff: [`93daff4...7f53fbc`](https://github.com/ChromeDevTools/devtools-protocol/compare/93daff4...7f53fbc)

```diff
@@ browser_protocol.pdl:454 @@ experimental domain Audits
       string name
       string path
       string domain
-      # Optionally identifies the site-for-cookies, which may be used by the
-      # front-end as additional context.
-      optional string siteForCookies
+
+  # Information about a request that is affected by an inspector issue.
+  type AffectedRequest extends object
+    properties
+      # The unique request id.
+      Network.RequestId requestId
+      optional string url
 
   type SameSiteCookieExclusionReason extends string
     enum
@@ -475,29 +479,36 @@ experimental domain Audits
       WarnSameSiteCrossSchemeInsecureUrlLax
       WarnSameSiteCrossSchemeInsecureUrlStrict
 
+  type SameSiteCookieOperation extends string
+    enum
+      SetCookie
+      ReadCookie
+
   # This information is currently necessary, as the front-end has a difficult
   # time finding a specific cookie. With this, we can convey specific error
   # information without the cookie.
   type SameSiteCookieIssueDetails extends object
     properties
+      AffectedCookie cookie
       array of SameSiteCookieWarningReason cookieWarningReasons
       array of SameSiteCookieExclusionReason cookieExclusionReasons
-
-  type AffectedResources extends object
-    properties
-      optional array of AffectedCookie cookies
+      # Optionally identifies the site-for-cookies and the cookie url, which
+      # may be used by the front-end as additional context.
+      SameSiteCookieOperation operation
+      optional string siteForCookies
+      optional string cookieUrl
+      optional AffectedRequest request
 
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
-  # information about the kind of issue, and AffectedResources to identify
-  # resources that are affected by this issue.
+  # information about the kind of issue.
   type InspectorIssueCode extends string
     enum
       SameSiteCookieIssue
 
   # This struct holds a list of optional fields with additional information
-  # pertaining to the kind of issue. This is useful if there is a number of
-  # very similar issues that only differ in details.
+  # specific to the kind of issue. When adding a new issue code, please also
+  # add a new optional field to this type.
   type InspectorIssueDetails extends object
     properties
       optional SameSiteCookieIssueDetails sameSiteCookieIssueDetails
@@ -507,7 +518,6 @@ experimental domain Audits
     properties
       InspectorIssueCode code
       InspectorIssueDetails details
-      AffectedResources resources
 
   # Returns the response body and size if it were re-encoded with the specified settings. Only
   # applies to images.
```

## Roll protocol to r754670 — _2020-03-30T22:16:08.000Z_
######  Diff: [`3a31fb9...93daff4`](https://github.com/ChromeDevTools/devtools-protocol/compare/3a31fb9...93daff4)

```diff
@@ browser_protocol.pdl:714 @@ domain Browser
       # BrowserContext to reset permissions. When omitted, default browser context is used.
       optional BrowserContextID browserContextId
 
+  # Set the behavior when downloading a file.
+  experimental command setDownloadBehavior
+    parameters
+      # Whether to allow all or deny all download requests, or use default Chrome behavior if
+      # available (otherwise deny). |allowAndName| allows download and names files according to
+      # their dowmload guids.
+      enum behavior
+        deny
+        allow
+        allowAndName
+        default
+      # BrowserContext to set download behavior. When omitted, default browser context is used.
+      optional BrowserContextID browserContextId
+      # The default path to save downloaded files to. This is requred if behavior is set to 'allow'
+      # or 'allowAndName'.
+      optional string downloadPath
 
   # Close browser gracefully.
   command close
@@ -5859,7 +5875,7 @@ domain Page
       string html
 
   # Set the behavior when downloading a file.
-  experimental command setDownloadBehavior
+  experimental deprecated command setDownloadBehavior
     parameters
       # Whether to allow all or deny all download requests, or use default Chrome behavior if
       # available (otherwise deny).
@@ -6060,9 +6076,26 @@ domain Page
     parameters
       # Id of the frame that caused download to begin.
       FrameId frameId
+      # Global unique identifier of the download.
+      string guid
       # URL of the resource being downloaded.
       string url
 
+  # Fired when download makes progress. Last call has |done| == true.
+  experimental event downloadProgress
+    parameters
+      # Global unique identifier of the download.
+      string guid
+      # Total expected bytes to download.
+      number totalBytes
+      # Total bytes received.
+      number receivedBytes
+      # Download status.
+      enum state
+        inProgress
+        completed
+        canceled
+
   # Fired when interstitial page was hidden
   event interstitialHidden
```

## Roll protocol to r753577 — _2020-03-26T11:16:32.000Z_
######  Diff: [`54331b7...3a31fb9`](https://github.com/ChromeDevTools/devtools-protocol/compare/54331b7...3a31fb9)

```diff
@@ js_protocol.pdl:119 @@ domain Debugger
         script
         eval
         module
+        wasm-expression-stack
       # Object representing the scope. For `global` and `with` scopes it represents the actual
       # object; for the rest of the scopes, it is artificial transient object enumerating scope
       # variables as its properties.
```

## Roll protocol to r753371 — _2020-03-25T21:16:15.000Z_
######  Diff: [`fb19e63...54331b7`](https://github.com/ChromeDevTools/devtools-protocol/compare/fb19e63...54331b7)

```diff
@@ js_protocol.pdl:954 @@ domain Runtime
         boolean
         symbol
         bigint
-      # Object subtype hint. Specified for `object` type values only.
+        wasm
+      # Object subtype hint. Specified for `object` or `wasm` type values only.
       optional enum subtype
         array
         null
@@ -973,6 +974,11 @@ domain Runtime
         typedarray
         arraybuffer
         dataview
+        i32
+        i64
+        f32
+        f64
+        v128
       # Object class (constructor) name. Specified for `object` type values only.
       optional string className
       # Remote object value in case of primitive values or JSON values (if it was requested).
```

## Roll protocol to r753288 — _2020-03-25T18:16:18.000Z_
######  Diff: [`0d94fba...fb19e63`](https://github.com/ChromeDevTools/devtools-protocol/compare/0d94fba...fb19e63)

```diff
@@ browser_protocol.pdl:7259 @@ experimental domain Fetch
       optional string method
       # If set, overrides the post data in the request.
       optional string postData
-      # If set, overrides the request headrts.
+      # If set, overrides the request headers.
       optional array of HeaderEntry headers
 
   # Continues a request supplying authChallengeResponse following authRequired event.
```

## Roll protocol to r752415 — _2020-03-23T12:16:00.000Z_
######  Diff: [`4b21417...0d94fba`](https://github.com/ChromeDevTools/devtools-protocol/compare/4b21417...0d94fba)

```diff
@@ browser_protocol.pdl:447 @@ experimental domain ApplicationCache
 experimental domain Audits
   depends on Network
 
-  type Issue extends object
+  # Information about a cookie that is affected by an inspector issue.
+  type AffectedCookie extends object
     properties
-      string code
+      # The following three properties uniquely identify a cookie
+      string name
+      string path
+      string domain
+      # Optionally identifies the site-for-cookies, which may be used by the
+      # front-end as additional context.
+      optional string siteForCookies
+
+  type SameSiteCookieExclusionReason extends string
+    enum
+      ExcludeSameSiteUnspecifiedTreatedAsLax
+      ExcludeSameSiteNoneInsecure
+
+  type SameSiteCookieWarningReason extends string
+    enum
+      WarnSameSiteUnspecifiedCrossSiteContext
+      WarnSameSiteNoneInsecure
+      WarnSameSiteUnspecifiedLaxAllowUnsafe
+      WarnSameSiteCrossSchemeSecureUrlMethodUnsafe
+      WarnSameSiteCrossSchemeSecureUrlLax
+      WarnSameSiteCrossSchemeSecureUrlStrict
+      WarnSameSiteCrossSchemeInsecureUrlMethodUnsafe
+      WarnSameSiteCrossSchemeInsecureUrlLax
+      WarnSameSiteCrossSchemeInsecureUrlStrict
+
+  # This information is currently necessary, as the front-end has a difficult
+  # time finding a specific cookie. With this, we can convey specific error
+  # information without the cookie.
+  type SameSiteCookieIssueDetails extends object
+    properties
+      array of SameSiteCookieWarningReason cookieWarningReasons
+      array of SameSiteCookieExclusionReason cookieExclusionReasons
+
+  type AffectedResources extends object
+    properties
+      optional array of AffectedCookie cookies
+
+  # A unique identifier for the type of issue. Each type may use one of the
+  # optional fields in InspectorIssueDetails to convey more specific
+  # information about the kind of issue, and AffectedResources to identify
+  # resources that are affected by this issue.
+  type InspectorIssueCode extends string
+    enum
+      SameSiteCookieIssue
+
+  # This struct holds a list of optional fields with additional information
+  # pertaining to the kind of issue. This is useful if there is a number of
+  # very similar issues that only differ in details.
+  type InspectorIssueDetails extends object
+    properties
+      optional SameSiteCookieIssueDetails sameSiteCookieIssueDetails
+
+  # An inspector issue reported from the back-end.
+  type InspectorIssue extends object
+    properties
+      InspectorIssueCode code
+      InspectorIssueDetails details
+      AffectedResources resources
 
   # Returns the response body and size if it were re-encoded with the specified settings. Only
   # applies to images.
@@ -483,7 +541,7 @@ experimental domain Audits
 
   event issueAdded
     parameters
-      Issue issue
+      InspectorIssue issue
 
 # Defines events for background web platform features.
 experimental domain BackgroundService
```

## Roll protocol to r751783 — _2020-03-19T20:16:05.000Z_
######  Diff: [`702b3cd...f8b3800`](https://github.com/ChromeDevTools/devtools-protocol/compare/702b3cd...f8b3800)

```diff
@@ browser_protocol.pdl:2852 @@ domain Emulation
       # Vision deficiency to emulate.
       enum type
         none
-        achromatomaly
         achromatopsia
         blurredVision
-        deuteranomaly
         deuteranopia
-        protanomaly
         protanopia
-        tritanomaly
         tritanopia
 
   # Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position
```

## Roll protocol to r751145 — _2020-03-17T22:16:22.000Z_
######  Diff: [`41bfd0c...702b3cd`](https://github.com/ChromeDevTools/devtools-protocol/compare/41bfd0c...702b3cd)

```diff
@@ js_protocol.pdl:503 @@ domain Debugger
   # Fired when the virtual machine resumed execution.
   event resumed
 
+  # Enum of possible script languages.
+  type ScriptLanguage extends string
+    enum
+      JavaScript
+      WebAssembly
+
   # Fired when virtual machine fails to parse the script.
   event scriptFailedToParse
     parameters
@@ -534,6 +540,10 @@ domain Debugger
       optional integer length
       # JavaScript top stack frame of where the script parsed event was triggered if available.
       experimental optional Runtime.StackTrace stackTrace
+      # If the scriptLanguage is WebAssembly, the code section offset in the module.
+      experimental optional integer codeOffset
+      # The language of the script.
+      experimental optional Debugger.ScriptLanguage scriptLanguage
 
   # Fired when virtual machine parses script. This event is also fired for all known and uncollected
   # scripts upon enabling debugger.
@@ -569,6 +579,10 @@ domain Debugger
       optional integer length
       # JavaScript top stack frame of where the script parsed event was triggered if available.
       experimental optional Runtime.StackTrace stackTrace
+      # If the scriptLanguage is WebAssembly, the code section offset in the module.
+      experimental optional integer codeOffset
+      # The language of the script.
+      experimental optional Debugger.ScriptLanguage scriptLanguage
 
 experimental domain HeapProfiler
   depends on Runtime
```

## Roll protocol to r750324 — _2020-03-13T22:17:35.000Z_
######  Diff: [`2ad8c1b...41bfd0c`](https://github.com/ChromeDevTools/devtools-protocol/compare/2ad8c1b...41bfd0c)

```diff
@@ browser_protocol.pdl:632 @@ domain Browser
   # Set permission settings for given origin.
   experimental command setPermission
     parameters
-      # Origin the permission applies to.
-      string origin
+      # Origin the permission applies to, all origins if not specified.
+      optional string origin
       # Descriptor of permission to override.
       PermissionDescriptor permission
       # Setting of the permission.
@@ -644,7 +644,8 @@ domain Browser
   # Grant specific permissions to the given origin and reject all others.
   experimental command grantPermissions
     parameters
-      string origin
+      # Origin the permission applies to, all origins if not specified.
+      optional string origin
       array of PermissionType permissions
       # BrowserContext to override permissions. When omitted, default browser context is used.
       optional BrowserContextID browserContextId
```

## Roll protocol to r747773 — _2020-03-06T18:15:59.000Z_
######  Diff: [`be5771f...b79c621`](https://github.com/ChromeDevTools/devtools-protocol/compare/be5771f...b79c621)

```diff
@@ browser_protocol.pdl:2845 @@ domain Emulation
       # Media features to emulate.
       optional array of MediaFeature features
 
+  # Emulates the given vision deficiency.
+  experimental command setEmulatedVisionDeficiency
+    parameters
+      # Vision deficiency to emulate.
+      enum type
+        none
+        achromatomaly
+        achromatopsia
+        blurredVision
+        deuteranomaly
+        deuteranopia
+        protanomaly
+        protanopia
+        tritanomaly
+        tritanopia
+
   # Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position
   # unavailable.
   command setGeolocationOverride
```

## Roll protocol to r746878 — _2020-03-04T19:15:58.000Z_
######  Diff: [`951d841...be5771f`](https://github.com/ChromeDevTools/devtools-protocol/compare/951d841...be5771f)

```diff
@@ browser_protocol.pdl:2845 @@ domain Emulation
       # Media features to emulate.
       optional array of MediaFeature features
 
-  # Emulates the given vision deficiency.
-  experimental command setEmulatedVisionDeficiency
-    parameters
-      # Vision deficiency to emulate.
-      enum type
-        none
-        achromatomaly
-        achromatopsia
-        blurredVision
-        deuteranomaly
-        deuteranopia
-        protanomaly
-        protanopia
-        tritanomaly
-        tritanopia
-
   # Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position
   # unavailable.
   command setGeolocationOverride
```

## Roll protocol to r746715 — _2020-03-04T10:15:58.000Z_
######  Diff: [`1226014...951d841`](https://github.com/ChromeDevTools/devtools-protocol/compare/1226014...951d841)

```diff
@@ browser_protocol.pdl:2845 @@ domain Emulation
       # Media features to emulate.
       optional array of MediaFeature features
 
+  # Emulates the given vision deficiency.
+  experimental command setEmulatedVisionDeficiency
+    parameters
+      # Vision deficiency to emulate.
+      enum type
+        none
+        achromatomaly
+        achromatopsia
+        blurredVision
+        deuteranomaly
+        deuteranopia
+        protanomaly
+        protanopia
+        tritanomaly
+        tritanopia
+
   # Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position
   # unavailable.
   command setGeolocationOverride
```

## Roll protocol to r746007 — _2020-03-02T18:15:56.000Z_
######  Diff: [`d446869...1226014`](https://github.com/ChromeDevTools/devtools-protocol/compare/d446869...1226014)

```diff
@@ browser_protocol.pdl:6098 @@ domain Performance
 
   # Enable collecting and reporting metrics.
   command enable
+    parameters
+      # Time domain to use for collecting and reporting duration metrics.
+      optional enum timeDomain
+        # Use monotonically increasing abstract time (default).
+        timeTicks
+        # Use thread running time.
+        threadTicks
 
   # Sets time domain to use for collecting and reporting duration metrics.
   # Note that this must be called before enabling metrics collection. Calling
   # this method while metrics collection is enabled returns an error.
-  experimental command setTimeDomain
+  experimental deprecated command setTimeDomain
     parameters
       # Time domain
       enum timeDomain
```

## Roll protocol to r745916 — _2020-03-02T13:15:52.000Z_
######  Diff: [`2251a98...d446869`](https://github.com/ChromeDevTools/devtools-protocol/compare/2251a98...d446869)

```diff
@@ browser_protocol.pdl:4060 @@ domain Network
       subresource-filter
       content-type
       collapsed-by-client
+      coep-frame-resource-needs-coep-header
+      coop-sandboxed-iframe-cannot-navigate-to-coop-page
+      corp-not-same-origin
+      corp-not-same-origin-after-defaulted-to-same-origin-by-coep
+      corp-not-same-site
 
   # HTTP response data.
   type Response extends object
```

## Roll protocol to r744719 — _2020-02-26T18:16:06.000Z_
######  Diff: [`a54f251...ecd17e2`](https://github.com/ChromeDevTools/devtools-protocol/compare/a54f251...ecd17e2)

```diff
@@ js_protocol.pdl:1315 @@ domain Runtime
       experimental optional TimeDelta timeout
       # Disable breakpoints during execution.
       experimental optional boolean disableBreaks
-      # Reserved flag for future REPL mode support. Setting this flag has currently no effect.
+      # Setting this flag to true enables `let` re-declaration and top-level `await`.
+      # Note that `let` variables can only be re-declared if they originate from
+      # `replMode` themselves.
       experimental optional boolean replMode
     returns
       # Evaluation result.
```

## Roll protocol to r743773 — _2020-02-22T03:15:58.000Z_
######  Diff: [`34b27ba...a54f251`](https://github.com/ChromeDevTools/devtools-protocol/compare/34b27ba...a54f251)

```diff
@@ browser_protocol.pdl:5392 @@ domain Page
       # The list of error arguments (e.g. {name:'minimum-icon-size-in-pixels', value:'64'}).
       array of InstallabilityErrorArgument errorArguments
 
+  # The referring-policy used for the navigation.
+  experimental type ReferrerPolicy extends string
+    enum
+      noReferrer
+      noReferrerWhenDowngrade
+      origin
+      originWhenCrossOrigin
+      sameOrigin
+      strictOrigin
+      strictOriginWhenCrossOrigin
+      unsafeUrl
+
   # Deprecated, please use addScriptToEvaluateOnNewDocument instead.
   experimental deprecated command addScriptToEvaluateOnLoad
     parameters
@@ -5581,6 +5593,8 @@ domain Page
       optional TransitionType transitionType
       # Frame id to navigate, if not specified navigates the top frame.
       optional FrameId frameId
+      # Referrer-policy used for the navigation.
+      experimental optional ReferrerPolicy referrerPolicy
     returns
       # Frame id that has navigated (or failed to navigate)
       FrameId frameId
```

## Roll protocol to r741364 — _2020-02-14T06:15:58.000Z_
######  Diff: [`7b97e49...34b27ba`](https://github.com/ChromeDevTools/devtools-protocol/compare/7b97e49...34b27ba)

```diff
@@ browser_protocol.pdl:6833 @@ domain Target
       # We plan to make this the default, deprecate non-flattened mode,
       # and eventually retire it. See crbug.com/991325.
       optional boolean flatten
-      # Auto-attach to the targets created via window.open from current target.
-      experimental optional boolean windowOpen
 
   # Controls whether to discover available targets and notify via
   # `targetCreated/targetInfoChanged/targetDestroyed` events.
```

## Roll protocol to r740866 — _2020-02-12T23:15:59.000Z_
######  Diff: [`23be539...7b97e49`](https://github.com/ChromeDevTools/devtools-protocol/compare/23be539...7b97e49)

```diff
@@ browser_protocol.pdl:2902 @@ domain Emulation
       # Absolute timestamp at which virtual time was first enabled (up time in milliseconds).
       number virtualTimeTicksBase
 
+  # Overrides default host system locale with the specified one.
+  experimental command setLocaleOverride
+    parameters
+      # ICU style C locale (e.g. "en_US"). If not specified or empty, disables the override and
+      # restores default host system locale.
+      optional string locale
+
   # Overrides default host system timezone with the specified one.
   experimental command setTimezoneOverride
     parameters
```

## Roll protocol to r740745 — _2020-02-12T18:16:48.000Z_
######  Diff: [`2369f6b...23be539`](https://github.com/ChromeDevTools/devtools-protocol/compare/2369f6b...23be539)

```diff
@@ js_protocol.pdl:831 @@ domain Profiler
       optional boolean callCount
       # Collect block-based coverage.
       optional boolean detailed
+      # Allow the backend to send updates on its own initiative
+      optional boolean allowTriggeredUpdates
     returns
       # Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
       number timestamp
```

## Roll protocol to r740289 — _2020-02-11T14:17:02.000Z_
######  Diff: [`395db8b...2369f6b`](https://github.com/ChromeDevTools/devtools-protocol/compare/395db8b...2369f6b)

```diff
@@ browser_protocol.pdl:1668 @@ domain DOM
       # Node description.
       Node node
 
+  # Scrolls the specified rect of the given node into view if not already visible.
+  # Note: exactly one between nodeId, backendNodeId and objectId should be passed
+  # to identify the node.
+  experimental command scrollIntoViewIfNeeded
+    parameters
+      # Identifier of the node.
+      optional NodeId nodeId
+      # Identifier of the backend node.
+      optional BackendNodeId backendNodeId
+      # JavaScript object id of the node wrapper.
+      optional Runtime.RemoteObjectId objectId
+      # The rect to be scrolled into view, relative to the node's border box, in CSS pixels.
+      # When omitted, center of the node will be used, similar to Element.scrollIntoView.
+      optional Rect rect
+
   # Disables DOM agent for the given page.
   command disable
```

## Roll protocol to r739602 — _2020-02-07T23:16:33.000Z_
######  Diff: [`1dfb8a8...00269c7`](https://github.com/ChromeDevTools/devtools-protocol/compare/1dfb8a8...00269c7)

```diff
@@ browser_protocol.pdl:1668 @@ domain DOM
       # Node description.
       Node node
 
-  # Scrolls the specified rect of the given node into view if not already visible.
-  experimental command scrollIntoViewIfNeeded
-    parameters
-      # Identifier of the node.
-      optional NodeId nodeId
-      # Identifier of the backend node.
-      optional BackendNodeId backendNodeId
-      # JavaScript object id of the node wrapper.
-      optional Runtime.RemoteObjectId objectId
-      # The rect to be scrolled into view, relative to the node's border box, in CSS pixels.
-      # When omitted, center of the node will be used, similar to Element.scrollIntoView.
-      optional Rect rect
-
   # Disables DOM agent for the given page.
   command disable
```

## Roll protocol to r739234 — _2020-02-07T02:15:56.000Z_
######  Diff: [`b442932...1dfb8a8`](https://github.com/ChromeDevTools/devtools-protocol/compare/b442932...1dfb8a8)

```diff
@@ browser_protocol.pdl:6736 @@ domain Target
   # Creates a new empty BrowserContext. Similar to an incognito profile but you can have more than
   # one.
   experimental command createBrowserContext
+    parameters
+      # If specified, disposes this context when debugging session disconnects.
+      optional boolean disposeOnDetach
     returns
       # The id of the context created.
       Browser.BrowserContextID browserContextId
```

## Roll protocol to r739180 — _2020-02-07T00:15:54.000Z_
######  Diff: [`13d0d9d...b442932`](https://github.com/ChromeDevTools/devtools-protocol/compare/13d0d9d...b442932)

```diff
@@ browser_protocol.pdl:5491 @@ domain Page
 
   experimental command getInstallabilityErrors
     returns
-      deprecated array of string errors
-      experimental array of InstallabilityError installabilityErrors
+      array of InstallabilityError installabilityErrors
 
   experimental command getManifestIcons
     returns
```

## Roll protocol to r738996 — _2020-02-06T17:16:41.000Z_
######  Diff: [`44116de...4675295`](https://github.com/ChromeDevTools/devtools-protocol/compare/44116de...4675295)

```diff
@@ browser_protocol.pdl:1668 @@ domain DOM
       # Node description.
       Node node
 
+  # Scrolls the specified rect of the given node into view if not already visible.
+  experimental command scrollIntoViewIfNeeded
+    parameters
+      # Identifier of the node.
+      optional NodeId nodeId
+      # Identifier of the backend node.
+      optional BackendNodeId backendNodeId
+      # JavaScript object id of the node wrapper.
+      optional Runtime.RemoteObjectId objectId
+      # The rect to be scrolled into view, relative to the node's border box, in CSS pixels.
+      # When omitted, center of the node will be used, similar to Element.scrollIntoView.
+      optional Rect rect
+
   # Disables DOM agent for the given page.
   command disable
```

## Roll protocol to r738234 — _2020-02-04T18:16:09.000Z_
######  Diff: [`28602ab...c48e06f`](https://github.com/ChromeDevTools/devtools-protocol/compare/28602ab...c48e06f)

```diff
@@ js_protocol.pdl:273 @@ domain Debugger
 
   # Resumes JavaScript execution.
   command resume
+    parameters
+      # Set to true to terminate execution upon resuming execution. In contrast
+      # to Runtime.terminateExecution, this will allows to execute further
+      # JavaScript (i.e. via evaluation) until execution of the paused code
+      # is actually resumed, at which point termination is triggered.
+      # If execution is currently not paused, this parameter has no effect.
+      optional boolean terminateOnResume
 
   # Searches for given string in script content.
   command searchInContent
```

## Roll protocol to r737833 — _2020-02-03T18:16:52.000Z_
######  Diff: [`807de1a...6d0f4a7`](https://github.com/ChromeDevTools/devtools-protocol/compare/807de1a...6d0f4a7)

```diff
@@ browser_protocol.pdl:447 @@ experimental domain ApplicationCache
 experimental domain Audits
   depends on Network
 
+  type Issue extends object
+    properties
+      string code
+
   # Returns the response body and size if it were re-encoded with the specified settings. Only
   # applies to images.
   command getEncodedResponse
@@ -470,6 +474,17 @@ experimental domain Audits
       # Size after re-encoding.
       integer encodedSize
 
+  # Disables issues domain, prevents further issues from being reported to the client.
+  command disable
+
+  # Enables issues domain, sends the issues collected so far to the client by means of the
+  # `issueAdded` event.
+  command enable
+
+  event issueAdded
+    parameters
+      Issue issue
+
 # Defines events for background web platform features.
 experimental domain BackgroundService
   # The Background Service that will be associated with the commands/events.
```

## Roll protocol to r736603 — _2020-01-29T23:15:58.000Z_
######  Diff: [`b9fb38a...807de1a`](https://github.com/ChromeDevTools/devtools-protocol/compare/b9fb38a...807de1a)

```diff
@@ browser_protocol.pdl:3526 @@ experimental domain LayerTree
       LayerId layerId
     returns
       # A list of strings specifying reasons for the given layer to become composited.
-      array of string compositingReasons
+      deprecated array of string compositingReasons
+      # A list of strings specifying reason IDs for the given layer to become composited.
+      array of string compositingReasonIds
 
   # Disables compositing tree inspection.
   command disable
```

## Roll protocol to r734741 — _2020-01-24T00:16:00.000Z_
######  Diff: [`b28dfe5...48ffb48`](https://github.com/ChromeDevTools/devtools-protocol/compare/b28dfe5...48ffb48)

```diff
@@ browser_protocol.pdl:7538 @@ experimental domain Media
   # Break out events into different types
   type PlayerEventType extends string
     enum
-      playbackEvent
-      systemEvent
+      errorEvent
+      triggeredEvent
       messageEvent
 
   type PlayerEvent extends object
```

## Roll protocol to r734342 — _2020-01-23T04:16:01.000Z_
######  Diff: [`887b29e...36518ec`](https://github.com/ChromeDevTools/devtools-protocol/compare/887b29e...36518ec)

```diff
@@ browser_protocol.pdl:5338 @@ domain Page
       reload
       anchorClick
 
+  experimental type InstallabilityErrorArgument extends object
+    properties
+      # Argument name (e.g. name:'minimum-icon-size-in-pixels').
+      string name
+      # Argument value (e.g. value:'64').
+      string value
+
+  # The installability error
+  experimental type InstallabilityError extends object
+    properties
+      # The error id (e.g. 'manifest-missing-suitable-icon').
+      string errorId
+      # The list of error arguments (e.g. {name:'minimum-icon-size-in-pixels', value:'64'}).
+      array of InstallabilityErrorArgument errorArguments
+
   # Deprecated, please use addScriptToEvaluateOnNewDocument instead.
   experimental deprecated command addScriptToEvaluateOnLoad
     parameters
@@ -5446,7 +5461,8 @@ domain Page
 
   experimental command getInstallabilityErrors
     returns
-      array of string errors
+      deprecated array of string errors
+      experimental array of InstallabilityError installabilityErrors
 
   experimental command getManifestIcons
     returns
```

## Roll protocol to r733814 — _2020-01-22T00:16:31.000Z_
######  Diff: [`b801714...34770ad`](https://github.com/ChromeDevTools/devtools-protocol/compare/b801714...34770ad)

```diff
@@ js_protocol.pdl:888 @@ domain Profiler
       # Profile title passed as an argument to console.profile().
       optional string title
 
+  # Reports coverage delta since the last poll (either from an event like this, or from
+  # `takePreciseCoverage` for the current isolate. May only be sent if precise code
+  # coverage has been started. This event can be trigged by the embedder to, for example,
+  # trigger collection of coverage data immediatelly at a certain point in time.
+  experimental event preciseCoverageDeltaUpdate
+    parameters
+      # Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
+      number timestamp
+      # Identifier for distinguishing coverage events.
+      string occassion
+      # Coverage data for the current isolate.
+      array of ScriptCoverage result
+
 # Runtime domain exposes JavaScript runtime by means of remote evaluation and mirror objects.
 # Evaluation results are returned as mirror object that expose object type, string representation
 # and unique identifier that can be used for further object reference. Original objects are
```

## Roll protocol to r733150 — _2020-01-18T07:16:18.000Z_
######  Diff: [`e147044...b801714`](https://github.com/ChromeDevTools/devtools-protocol/compare/e147044...b801714)

```diff
@@ browser_protocol.pdl:5336 @@ domain Page
       metaTagRefresh
       pageBlockInterstitial
       reload
+      anchorClick
 
   # Deprecated, please use addScriptToEvaluateOnNewDocument instead.
   experimental deprecated command addScriptToEvaluateOnLoad
@@ -5894,14 +5895,7 @@ domain Page
       # guaranteed to start.
       number delay
       # The reason for the navigation.
-      enum reason
-        formSubmissionGet
-        formSubmissionPost
-        httpHeaderRefresh
-        scriptInitiated
-        metaTagRefresh
-        pageBlockInterstitial
-        reload
+      ClientNavigationReason reason
       # The destination URL for the scheduled navigation.
       string url
```

## Roll protocol to r731173 — _2020-01-14T09:15:59.000Z_
######  Diff: [`a88e2e8...a8ab994`](https://github.com/ChromeDevTools/devtools-protocol/compare/a88e2e8...a8ab994)

```diff
@@ browser_protocol.pdl:1244 @@ experimental domain CSS
   command takeCoverageDelta
     returns
       array of RuleUsage coverage
+      # Monotonically increasing time, in seconds.
+      number timestamp
 
   # Fires whenever a web font is updated.  A non-empty font parameter indicates a successfully loaded
   # web font
```

## Roll protocol to r730699 — _2020-01-13T19:16:22.000Z_
######  Diff: [`b8266f8...a88e2e8`](https://github.com/ChromeDevTools/devtools-protocol/compare/b8266f8...a88e2e8)

```diff
@@ js_protocol.pdl:825 @@ domain Profiler
       # Collect block-based coverage.
       optional boolean detailed
     returns
-      # The timestamp (in milliseconds) the coverage update was taken in the backend.
+      # Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
       number timestamp
 
   # Enable type profile.
@@ -849,7 +849,7 @@ domain Profiler
     returns
       # Coverage data for the current isolate.
       array of ScriptCoverage result
-      # The timestamp (in milliseconds) the coverage update was taken in the backend.
+      # Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
       number timestamp
 
   # Collect type profile.
```

## Roll protocol to r730280 — _2020-01-10T20:16:05.000Z_
######  Diff: [`e4ef206...b8266f8`](https://github.com/ChromeDevTools/devtools-protocol/compare/e4ef206...b8266f8)

```diff
@@ js_protocol.pdl:824 @@ domain Profiler
       optional boolean callCount
       # Collect block-based coverage.
       optional boolean detailed
+    returns
+      # The timestamp (in milliseconds) the coverage update was taken in the backend.
+      number timestamp
 
   # Enable type profile.
   experimental command startTypeProfile
@@ -846,6 +849,8 @@ domain Profiler
     returns
       # Coverage data for the current isolate.
       array of ScriptCoverage result
+      # The timestamp (in milliseconds) the coverage update was taken in the backend.
+      number timestamp
 
   # Collect type profile.
   experimental command takeTypeProfile
```

## Roll protocol to r726364 — _2019-12-19T14:16:08.000Z_
######  Diff: [`1d614ea...db57660`](https://github.com/ChromeDevTools/devtools-protocol/compare/1d614ea...db57660)

```diff
@@ js_protocol.pdl:653 @@ experimental domain HeapProfiler
       # If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken
       # when the tracking is stopped.
       optional boolean reportProgress
+      optional boolean treatGlobalObjectsAsRoots
 
   command takeHeapSnapshot
     parameters
       # If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.
       optional boolean reportProgress
+      # If true, a raw snapshot without artifical roots will be generated
+      optional boolean treatGlobalObjectsAsRoots
 
   event addHeapSnapshotChunk
     parameters
```

## Roll protocol to r725087 724985 724981 — _2019-12-16T13:16:11.000Z_
######  Diff: [`4e63e49...05cef16`](https://github.com/ChromeDevTools/devtools-protocol/compare/4e63e49...05cef16)

```diff
@@ browser_protocol.pdl:4604 @@ domain Network
       # Cookie expiration date, session cookie if not set
       optional TimeSinceEpoch expires
       # Cookie Priority type.
-      optional CookiePriority priority
+      experimental optional CookiePriority priority
     returns
       # True if successfully set cookie.
       boolean success
```

## Roll protocol to r725056 — _2019-12-16T10:16:13.000Z_
######  Diff: [`7e60474...4e63e49`](https://github.com/ChromeDevTools/devtools-protocol/compare/7e60474...4e63e49)

```diff
@@ browser_protocol.pdl:4260 @@ domain Network
       # Cookie expiration date, session cookie if not set
       optional TimeSinceEpoch expires
       # Cookie Priority.
-      optional CookiePriority priority
+      experimental optional CookiePriority priority
 
   # Authorization challenge for HTTP status code 401 or 407.
   experimental type AuthChallenge extends object
```

## Roll protocol to r724935 — _2019-12-14T09:16:01.000Z_
######  Diff: [`1e81930...7e60474`](https://github.com/ChromeDevTools/devtools-protocol/compare/1e81930...7e60474)

```diff
@@ browser_protocol.pdl:5445 @@ domain Page
     returns
       array of string errors
 
+  experimental command getManifestIcons
+    returns
+      optional binary primaryIcon
+
   # Returns all browser cookies. Depending on the backend support, will return detailed cookie
   # information in the `cookies` field.
   experimental deprecated command getCookies
```

## Roll protocol to r724701 — _2019-12-13T18:16:09.000Z_
######  Diff: [`7c8e4c5...2559025`](https://github.com/ChromeDevTools/devtools-protocol/compare/7c8e4c5...2559025)

```diff
@@ browser_protocol.pdl:5247 @@ domain Page
       # Error column.
       integer column
 
+  # Parsed app manifest properties.
+  experimental type AppManifestParsedProperties extends object
+    properties
+      # Computed scope value
+      string scope
+
   # Layout viewport position and dimensions.
   type LayoutViewport extends object
     properties
@@ -5432,6 +5438,8 @@ domain Page
       array of AppManifestError errors
       # Manifest content.
       optional string data
+      # Parsed manifest properties
+      experimental optional AppManifestParsedProperties parsed
 
   experimental command getInstallabilityErrors
     returns
```

## Roll protocol to r724596 — _2019-12-13T12:15:55.000Z_
######  Diff: [`cc1ba9f...7c8e4c5`](https://github.com/ChromeDevTools/devtools-protocol/compare/cc1ba9f...7c8e4c5)

```diff
@@ browser_protocol.pdl:3865 @@ domain Network
       Lax
       None
 
+  # Represents the cookie's 'Priority' status:
+  # https://tools.ietf.org/html/draft-west-cookie-priority-00
+  experimental type CookiePriority extends string
+    enum
+      Low
+      Medium
+      High
+
   # Timing information for the request.
   type ResourceTiming extends object
     properties
@@ -4143,6 +4151,8 @@ domain Network
       boolean session
       # Cookie SameSite type.
       optional CookieSameSite sameSite
+      # Cookie Priority
+      experimental CookiePriority priority
 
   # Types of reasons why a cookie may not be stored from a response.
   experimental type SetCookieBlockedReason extends string
@@ -4249,6 +4259,8 @@ domain Network
       optional CookieSameSite sameSite
       # Cookie expiration date, session cookie if not set
       optional TimeSinceEpoch expires
+      # Cookie Priority.
+      optional CookiePriority priority
 
   # Authorization challenge for HTTP status code 401 or 407.
   experimental type AuthChallenge extends object
@@ -4591,6 +4603,8 @@ domain Network
       optional CookieSameSite sameSite
       # Cookie expiration date, session cookie if not set
       optional TimeSinceEpoch expires
+      # Cookie Priority type.
+      optional CookiePriority priority
     returns
       # True if successfully set cookie.
       boolean success
```

## Roll protocol to r724568 — _2019-12-13T10:15:57.000Z_
######  Diff: [`5c57d0d...cc1ba9f`](https://github.com/ChromeDevTools/devtools-protocol/compare/5c57d0d...cc1ba9f)

```diff
@@ browser_protocol.pdl:3206 @@ domain Input
       touch
       mouse
 
+  type MouseButton extends string
+    enum
+        none
+        left
+        middle
+        right
+        back
+        forward
+
   # UTC time in seconds, counted from January 1, 1970.
   type TimeSinceEpoch extends number
 
@@ -3277,13 +3286,7 @@ domain Input
       # Time at which the event occurred.
       optional TimeSinceEpoch timestamp
       # Mouse button (default: "none").
-      optional enum button
-        none
-        left
-        middle
-        right
-        back
-        forward
+      optional MouseButton button
       # A number indicating which buttons are pressed on the mouse when a mouse event is triggered.
       # Left=1, Right=2, Middle=4, Back=8, Forward=16, None=0.
       optional integer buttons
@@ -3331,12 +3334,8 @@ domain Input
       integer x
       # Y coordinate of the mouse pointer in DIP.
       integer y
-      # Mouse button.
-      enum button
-        none
-        left
-        middle
-        right
+      # Mouse button. Only "none", "left", "right" are supported.
+      MouseButton button
       # Time at which the event occurred (default: current time).
       optional TimeSinceEpoch timestamp
       # X delta in DIP for mouse wheel event (default: 0).
```

## Roll protocol to r724110 — _2019-12-12T02:15:58.000Z_
######  Diff: [`0ad933c...6130de0`](https://github.com/ChromeDevTools/devtools-protocol/compare/0ad933c...6130de0)

```diff
@@ browser_protocol.pdl:1469 @@ domain DOM
       first-letter
       before
       after
+      marker
       backdrop
       selection
       first-line-inherited
```

## Roll protocol to r723051 — _2019-12-09T20:16:02.000Z_
######  Diff: [`f747da9...0ad933c`](https://github.com/ChromeDevTools/devtools-protocol/compare/f747da9...0ad933c)

```diff
@@ js_protocol.pdl:1073 @@ domain Runtime
       # Private property name.
       string name
       # The value associated with the private property.
-      RemoteObject value
+      optional RemoteObject value
+      # A function which serves as a getter for the private property,
+      # or `undefined` if there is no getter (accessor descriptors only).
+      optional RemoteObject get
+      # A function which serves as a setter for the private property,
+      # or `undefined` if there is no setter (accessor descriptors only).
+      optional RemoteObject set
 
   # Represents function call argument. Either remote object id `objectId`, primitive `value`,
   # unserializable primitive value or neither of (for undefined) them should be specified.
```

## Roll protocol to r722700 — _2019-12-07T00:16:07.000Z_
######  Diff: [`7f775e3...f747da9`](https://github.com/ChromeDevTools/devtools-protocol/compare/7f775e3...f747da9)

```diff
@@ browser_protocol.pdl:573 @@ domain Browser
       audioCapture
       backgroundSync
       backgroundFetch
-      clipboardRead
-      clipboardWrite
+      clipboardReadWrite
+      clipboardSanitizedWrite
       durableStorage
       flash
       geolocation
@@ -611,6 +611,8 @@ domain Browser
       optional boolean userVisibleOnly
       # For "wake-lock" permission, must specify type as either "screen" or "system".
       optional string type
+      # For "clipboard" permission, may specify allowWithoutSanitization.
+      optional boolean allowWithoutSanitization
 
   # Set permission settings for given origin.
   experimental command setPermission
```

## Roll protocol to r719330 — _2019-11-26T21:16:17.000Z_
######  Diff: [`13ccbfe...14ad3ca`](https://github.com/ChromeDevTools/devtools-protocol/compare/13ccbfe...14ad3ca)

```diff
@@ browser_protocol.pdl:5794 @@ domain Page
   # Intercept file chooser requests and transfer control to protocol clients.
   # When file chooser interception is enabled, native file chooser dialog is not shown.
   # Instead, a protocol event `Page.fileChooserOpened` is emitted.
-  # File chooser can be handled with `page.handleFileChooser` command.
   experimental command setInterceptFileChooserDialog
     parameters
       boolean enabled
 
-  # Accepts or cancels an intercepted file chooser dialog.
-  experimental command handleFileChooser
-    parameters
-      enum action
-        accept
-        cancel
-        fallback
-      # Array of absolute file paths to set, only respected with `accept` action.
-      optional array of string files
-
   event domContentEventFired
     parameters
       Network.MonotonicTime timestamp
@@ -5816,6 +5805,11 @@ domain Page
   # Emitted only when `page.interceptFileChooser` is enabled.
   event fileChooserOpened
     parameters
+      # Id of the frame containing input node.
+      experimental FrameId frameId
+      # Input node id.
+      experimental DOM.BackendNodeId backendNodeId
+      # Input mode.
       enum mode
         selectSingle
         selectMultiple
```

## Roll protocol to r717480 — _2019-11-21T04:15:58.000Z_
######  Diff: [`38fbc08...146c682`](https://github.com/ChromeDevTools/devtools-protocol/compare/38fbc08...146c682)

```diff
@@ browser_protocol.pdl:6081 @@ domain Security
       Network.TimeSinceEpoch validFrom
       # Certificate valid to (expiration) date
       Network.TimeSinceEpoch validTo
+      # The highest priority network error code, if the certificate has an error.
+      optional string certificateNetworkError
       # True if the certificate uses a weak signature aglorithm.
-      boolean certifcateHasWeakSignature
+      boolean certificateHasWeakSignature
+      # True if the certificate has a SHA1 signature in the chain.
+      boolean certificateHasSha1Signature
       # True if modern SSL
       boolean modernSSL
       # True if the connection is using an obsolete SSL protocol.
```

## Roll protocol to r717360 — _2019-11-21T00:15:59.000Z_
######  Diff: [`e794044...38fbc08`](https://github.com/ChromeDevTools/devtools-protocol/compare/e794044...38fbc08)

```diff
@@ browser_protocol.pdl:542 @@ experimental domain BackgroundService
 
 # The Browser domain defines methods and events for browser managing.
 domain Browser
-
+  experimental type BrowserContextID extends string
   experimental type WindowID extends integer
 
   # The state of the browser window.
@@ -622,7 +622,7 @@ domain Browser
       # Setting of the permission.
       PermissionSetting setting
       # Context to override. When omitted, default browser context is used.
-      optional Target.TargetID browserContextId
+      optional BrowserContextID browserContextId
 
   # Grant specific permissions to the given origin and reject all others.
   experimental command grantPermissions
@@ -630,13 +630,13 @@ domain Browser
       string origin
       array of PermissionType permissions
       # BrowserContext to override permissions. When omitted, default browser context is used.
-      optional Target.BrowserContextID browserContextId
+      optional BrowserContextID browserContextId
 
   # Reset all permission management for all origins.
   experimental command resetPermissions
     parameters
       # BrowserContext to reset permissions. When omitted, default browser context is used.
-      optional Target.BrowserContextID browserContextId
+      optional BrowserContextID browserContextId
 
 
   # Close browser gracefully.
@@ -6340,6 +6340,8 @@ experimental domain ServiceWorker
       array of ServiceWorkerVersion versions
 
 experimental domain Storage
+  depends on Browser
+  depends on Network
 
   # Enum of possible storage types.
   type StorageType extends string
@@ -6372,6 +6374,29 @@ experimental domain Storage
       # Comma separated list of StorageType to clear.
       string storageTypes
 
+  # Returns all browser cookies.
+  command getCookies
+    parameters
+      # Browser context to use when called on the browser endpoint.
+      optional Browser.BrowserContextID browserContextId
+    returns
+      # Array of cookie objects.
+      array of Network.Cookie cookies
+
+  # Sets given cookies.
+  command setCookies
+    parameters
+      # Cookies to be set.
+      array of Network.CookieParam cookies
+      # Browser context to use when called on the browser endpoint.
+      optional Browser.BrowserContextID browserContextId
+
+  # Clears cookies.
+  command clearCookies
+    parameters
+      # Browser context to use when called on the browser endpoint.
+      optional Browser.BrowserContextID browserContextId
+
   # Returns usage and quota in bytes.
   command getUsageAndQuota
     parameters
@@ -6580,8 +6605,6 @@ domain Target
   # Unique identifier of attached debugging session.
   type SessionID extends string
 
-  experimental type BrowserContextID extends string
-
   type TargetInfo extends object
     properties
       TargetID targetId
@@ -6592,7 +6615,7 @@ domain Target
       boolean attached
       # Opener target Id
       optional TargetID openerId
-      experimental optional BrowserContextID browserContextId
+      experimental optional Browser.BrowserContextID browserContextId
 
   experimental type RemoteLocation extends object
     properties
@@ -6648,13 +6671,13 @@ domain Target
   experimental command createBrowserContext
     returns
       # The id of the context created.
-      BrowserContextID browserContextId
+      Browser.BrowserContextID browserContextId
 
   # Returns all browser contexts created with `Target.createBrowserContext` method.
   experimental command getBrowserContexts
     returns
       # An array of browser context ids.
-      array of BrowserContextID browserContextIds
+      array of Browser.BrowserContextID browserContextIds
 
   # Creates a new page.
   command createTarget
@@ -6666,7 +6689,7 @@ domain Target
       # Frame height in DIP (headless chrome only).
       optional integer height
       # The browser context to create the page in.
-      optional BrowserContextID browserContextId
+      optional Browser.BrowserContextID browserContextId
       # Whether BeginFrames for this target will be controlled via DevTools (headless chrome only,
       # not supported on MacOS yet, false by default).
       experimental optional boolean enableBeginFrameControl
@@ -6691,7 +6714,7 @@ domain Target
   # beforeunload hooks.
   experimental command disposeBrowserContext
     parameters
-      BrowserContextID browserContextId
+      Browser.BrowserContextID browserContextId
 
   # Returns information about a target.
   experimental command getTargetInfo
```

## Roll protocol to r717319 — _2019-11-20T23:15:58.000Z_
######  Diff: [`0da6eeb...e794044`](https://github.com/ChromeDevTools/devtools-protocol/compare/0da6eeb...e794044)

```diff
@@ browser_protocol.pdl:6094 @@ domain Security
       # True if the connection is using an obsolete SSL signature.
       boolean obsoleteSslSignature
 
+  experimental type SafetyTipStatus extends string
+    enum
+      badReputation
+      lookalike
+
+  experimental type SafetyTipInfo extends object
+    properties
+      # Describes whether the page triggers any safety tips or reputation warnings. Default is unknown.
+      SafetyTipStatus safetyTipStatus
+      # The URL the safety tip suggested ("Did you mean?"). Only filled in for lookalike matches.
+      optional string safeUrl
+
   # Security state information about the page.
   experimental type VisibleSecurityState extends object
     properties
@@ -6101,6 +6113,8 @@ domain Security
       SecurityState securityState
       # Security state details about the page certificate.
       optional CertificateSecurityState certificateSecurityState
+      # The type of Safety Tip triggered on the page. Note that this field will be set even if the Safety Tip UI was not actually shown.
+      optional SafetyTipInfo safetyTipInfo
       # Array of security state issues ids.
       array of string securityStateIssueIds
```

## Roll protocol to r715684 — _2019-11-15T15:16:23.000Z_
######  Diff: [`2f6e00a...241adc5`](https://github.com/ChromeDevTools/devtools-protocol/compare/2f6e00a...241adc5)

```diff
@@ js_protocol.pdl:224 @@ domain Debugger
       # Id of the script to get source for.
       Runtime.ScriptId scriptId
     returns
-      # Script source.
+      # Script source (empty in case of Wasm bytecode).
       string scriptSource
+      # Wasm bytecode.
+      optional binary bytecode
 
-  # Returns bytecode for the WebAssembly script with given id.
-  command getWasmBytecode
+  # This command is deprecated. Use getScriptSource instead.
+  deprecated command getWasmBytecode
     parameters
       # Id of the Wasm script to get source for.
       Runtime.ScriptId scriptId
```

## Roll protocol to r712820 — _2019-11-06T00:16:33.000Z_
######  Diff: [`66e3abc...87a8f04`](https://github.com/ChromeDevTools/devtools-protocol/compare/66e3abc...87a8f04)

```diff
@@ js_protocol.pdl:783 @@ domain Profiler
       # Type profile entries for parameters and return values of the functions in the script.
       array of TypeProfileEntry entries
 
+  # Collected counter information.
+  experimental type CounterInfo extends object
+    properties
+      # Counter name.
+      string name
+      # Counter value.
+      integer value
+
   command disable
 
   command enable
@@ -840,6 +848,18 @@ domain Profiler
       # Type profile for all scripts since startTypeProfile() was turned on.
       array of ScriptTypeProfile result
 
+  # Enable run time call stats collection.
+  experimental command enableRuntimeCallStats
+
+  # Disable run time call stats collection.
+  experimental command disableRuntimeCallStats
+
+  # Retrieve run time call stats.
+  experimental command getRuntimeCallStats
+    returns
+      # Collected counter information.
+      array of CounterInfo result
+
   event consoleProfileFinished
     parameters
       string id
```

## Roll protocol to r712476 — _2019-11-05T07:16:15.000Z_
######  Diff: [`7bbe86e...66e3abc`](https://github.com/ChromeDevTools/devtools-protocol/compare/7bbe86e...66e3abc)

```diff
@@ browser_protocol.pdl:580 @@ domain Browser
       geolocation
       midi
       midiSysex
+      nfc
       notifications
       paymentHandler
       periodicBackgroundSync
```

## Roll protocol to r712350 — _2019-11-05T00:16:27.000Z_
######  Diff: [`450eb90...7bbe86e`](https://github.com/ChromeDevTools/devtools-protocol/compare/450eb90...7bbe86e)

```diff
@@ browser_protocol.pdl:4151 @@ domain Network
       SameSiteStrict
       # The cookie had the "SameSite=Lax" attribute but came from a cross-origin response.
       SameSiteLax
-      # The cookie had the "SameSite=Extended" attribute but came from a cross-origin response.
-      SameSiteExtended
       # The cookie didn't specify a "SameSite" attribute and was defaulted to "SameSite=Lax" and
       # broke the same rules specified in the SameSiteLax value.
       SameSiteUnspecifiedTreatedAsLax
@@ -4193,9 +4191,6 @@ domain Network
       # The cookie had the "SameSite=Lax" attribute and the request was made on a different site.
       # This does not include navigation requests initiated by other sites.
       SameSiteLax
-      # The cookie had the "SameSite=Extended" attribute and the request was made on a different
-      # site. The different site is outside of the cookie's trusted first-party set.
-      SameSiteExtended
       # The cookie didn't specify a SameSite attribute when it was stored and was defaulted to
       # "SameSite=Lax" and broke the same rules specified in the SameSiteLax value. The cookie had
       # to have been set with "SameSite=None" to enable third-party usage.
```

## Roll protocol to r710913 — _2019-10-30T19:16:27.000Z_
######  Diff: [`b315ec7...450eb90`](https://github.com/ChromeDevTools/devtools-protocol/compare/b315ec7...450eb90)

```diff
@@ browser_protocol.pdl:3860 @@ domain Network
     enum
       Strict
       Lax
-      Extended
       None
 
   # Timing information for the request.
```