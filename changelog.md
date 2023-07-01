

## Roll protocol to r1165014 — _2023-07-01T04:27:51.000Z_
######  Diff: [`f92e635...02dff86`](https://github.com/ChromeDevTools/devtools-protocol/compare/`f92e635...02dff86`)

```diff
@@ browser_protocol.pdl:719 @@ experimental domain Audits
       Page.FrameId frameId
       Network.LoaderId loaderId
 
-  deprecated type NavigatorUserAgentIssueDetails extends object
+  type NavigatorUserAgentIssueDetails extends object
     properties
       string url
       optional SourceCodeLocation location
@@ -737,7 +737,6 @@ experimental domain Audits
       FormLabelHasNeitherForNorNestedInput
       FormLabelForMatchesNonExistingIdError
       FormInputHasWrongButWellIntendedAutocompleteValueError
-      ResponseWasBlockedByORB
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
@@ -747,7 +746,6 @@ experimental domain Audits
       optional Page.FrameId frameId
       optional DOM.BackendNodeId violatingNodeId
       optional string violatingNodeAttribute
-      optional AffectedRequest request
 
   # This issue tracks information needed to print a deprecation message.
   # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/third_party/blink/renderer/core/frame/deprecation/README.md
@@ -886,7 +884,6 @@ experimental domain Audits
       CorsIssue
       AttributionReportingIssue
       QuirksModeIssue
-      # Deprecated
       NavigatorUserAgentIssue
       GenericIssue
       DeprecationIssue
@@ -911,7 +908,7 @@ experimental domain Audits
       optional CorsIssueDetails corsIssueDetails
       optional AttributionReportingIssueDetails attributionReportingIssueDetails
       optional QuirksModeIssueDetails quirksModeIssueDetails
-      deprecated optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
+      optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
       optional GenericIssueDetails genericIssueDetails
       optional DeprecationIssueDetails deprecationIssueDetails
       optional ClientHintIssueDetails clientHintIssueDetails
```

## Roll protocol to r1163380 — _2023-06-28T04:28:21.000Z_
######  Diff: [`67ae7fb...f92e635`](https://github.com/ChromeDevTools/devtools-protocol/compare/`67ae7fb...f92e635`)

```diff
@@ browser_protocol.pdl:9634 @@ experimental domain Storage
     parameters
       string bucketId
 
-  # https://wicg.github.io/attribution-reporting-api/
-  experimental command setAttributionReportingLocalTestingMode
-    parameters
-      # If enabled, noise is suppressed and reports are sent immediately.
-      boolean enabled
-
 # The SystemInfo domain defines methods and events for querying low-level system information.
 experimental domain SystemInfo
```

## Roll protocol to r1162774 — _2023-06-27T04:28:23.000Z_
######  Diff: [`3494f54...67ae7fb`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3494f54...67ae7fb`)

```diff
@@ browser_protocol.pdl:7773 @@ domain Page
       # Specifies whether command line API should be available to the script, defaults
       # to false.
       experimental optional boolean includeCommandLineAPI
-      # If true, runs the script immediately on existing execution contexts or worlds.
-      # Default: false.
-      experimental optional boolean runImmediately
     returns
       # Identifier of the added script.
       ScriptIdentifier identifier
@@ -11167,8 +11164,6 @@ experimental domain Preload
       boolean disabledByPreference
       boolean disabledByDataSaver
       boolean disabledByBatterySaver
-      boolean disabledByHoldbackPrefetchSpeculationRules
-      boolean disabledByHoldbackPrerenderSpeculationRules
 
   # Preloading status values, see also PreloadingTriggeringOutcome. This
   # status is shared by prefetchStatusUpdated and prerenderStatusUpdated.
@@ -11232,7 +11227,6 @@ experimental domain Preload
       string prefetchUrl
       PreloadingStatus status
       PrefetchStatus prefetchStatus
-      Network.RequestId requestId
 
   # Fired when a prerender attempt is updated.
   event prerenderStatusUpdated
@@ -11240,9 +11234,6 @@ experimental domain Preload
       PreloadingAttemptKey key
       PreloadingStatus status
       optional PrerenderFinalStatus prerenderStatus
-      # This is used to give users more information about the name of Mojo interface
-      # that is incompatible with prerender and has caused the cancellation of the attempt.
-      optional string disallowedMojoInterface
 
   # Send a list of sources for all preloading attempts in a document.
   event preloadingAttemptSourcesUpdated
```

## Roll protocol to r1161598 — _2023-06-23T04:28:28.000Z_
######  Diff: [`7b1ec35...3494f54`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7b1ec35...3494f54`)

```diff
@@ browser_protocol.pdl:7336 @@ domain Page
       ch-ua-platform
       ch-ua-model
       ch-ua-mobile
-      ch-ua-form-factor
       ch-ua-full-version
       ch-ua-full-version-list
       ch-ua-platform-version
@@ -8569,12 +8568,14 @@ domain Page
       DocumentLoaded
       DedicatedWorkerOrWorklet
       OutstandingNetworkRequestOthers
+      OutstandingIndexedDBTransaction
       RequestedMIDIPermission
       RequestedAudioCapturePermission
       RequestedVideoCapturePermission
       RequestedBackForwardCacheBlockedSensors
       RequestedBackgroundWorkPermission
       BroadcastChannel
+      IndexedDBConnection
       WebXR
       SharedWorker
       WebLocks
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index ed62263..7a3c772 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -1034,11 +1034,6 @@ domain Runtime
       # Deep serialization depth. Default is full depth. Respected only in `deep` serialization mode.
       optional integer maxDepth
 
-      # Embedder-specific parameters. For example if connected to V8 in Chrome these control DOM
-      # serialization via `maxNodeDepth: integer` and `includeShadowTree: "none" | "open" | "all"`.
-      # Values can be only of type string or integer.
-      optional object additionalParameters
-
   # Represents deep serialized value.
   type DeepSerializedValue extends object
     properties
```

## Roll protocol to r1161029 — _2023-06-22T04:26:26.000Z_
######  Diff: [`6ef566f...7b1ec35`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6ef566f...7b1ec35`)

```diff
@@ browser_protocol.pdl:5368 @@ domain Network
       # address space.
       UnexpectedPrivateNetworkAccess
       NoCorsRedirectModeNotFollow
-      # Request was a private network request and needed user permission yet did
-      # not carry `Private-Network-Access-Id` in the preflight response.
-      # https://github.com/WICG/private-network-access/blob/main/permission_prompt/explainer.md
-      PreflightMissingPrivateNetworkAccessId
-      # Request was a private network request and needed user permission yet did
-      # not carry `Private-Network-Access-Name` in the preflight response.
-      # https://github.com/WICG/private-network-access/blob/main/permission_prompt/explainer.md
-      PreflightMissingPrivateNetworkAccessName
-      # Request was a private network request and needed user permission yet not
-      # able to request for permission.
-      # https://github.com/WICG/private-network-access/blob/main/permission_prompt/explainer.md
-      PrivateNetworkAccessPermissionUnavailable
-      # Request was a private network request and is denied by user permission.
-      # https://github.com/WICG/private-network-access/blob/main/permission_prompt/explainer.md
-      PrivateNetworkAccessPermissionDenied
 
   type CorsErrorStatus extends object
     properties
@@ -8555,7 +8540,6 @@ domain Page
       ErrorDocument
       FencedFramesEmbedder
       CookieDisabled
-      HTTPAuthRequired
       #Blocklisted features
       WebSocket
       WebTransport
```

## Roll protocol to r1159816 — _2023-06-20T04:26:35.000Z_
######  Diff: [`1663e91...6ef566f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1663e91...6ef566f`)

```diff
@@ browser_protocol.pdl:8587 @@ domain Page
       IndexedDBEvent
       Dummy
       JsNetworkRequestReceivedCacheControlNoStoreResource
-      WebRTCSticky
-      WebTransportSticky
-      WebSocketSticky
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
```

## Roll protocol to r1158625 — _2023-06-16T04:26:28.000Z_
######  Diff: [`b8200ca...1663e91`](https://github.com/ChromeDevTools/devtools-protocol/compare/`b8200ca...1663e91`)

```diff
@@ browser_protocol.pdl:992 @@ experimental domain Autofill
       # 3-digit card verification code.
       string cvc
 
-  type AddressField extends object
-    properties
-      # address field name, for example GIVEN_NAME.
-      string name
-      # address field name, for example Jon Doe.
-      string value
-
-  type Address extends object
-    properties
-      # fields and values defining a test address.
-      array of AddressField fields
-
   # Trigger autofill on a form identified by the fieldId.
   # If the field and related form cannot be autofilled, returns an error.
   command trigger
@@ -1015,13 +1003,6 @@ experimental domain Autofill
       # Credit card information to fill out the form. Credit card data is not saved.
       CreditCard card
 
-  # Set addresses so that developers can verify their forms implementation.
-  command setAddresses
-    # Test addresses for the available countries.
-    parameters
-      array of Address addresses
-
-
 # Defines events for background web platform features.
 experimental domain BackgroundService
   # The Background Service that will be associated with the commands/events.
```

## Roll protocol to r1157354 — _2023-06-14T04:26:43.000Z_
######  Diff: [`e4caf5f...b8200ca`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e4caf5f...b8200ca`)

```diff
@@ browser_protocol.pdl:8568 @@ domain Page
       IndexedDBEvent
       Dummy
       JsNetworkRequestReceivedCacheControlNoStoreResource
+      WebSerial
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
```

## Roll protocol to r1156692 — _2023-06-13T04:26:37.000Z_
######  Diff: [`2a2181a...e4caf5f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`2a2181a...e4caf5f`)

```diff
@@ browser_protocol.pdl:852 @@ experimental domain Audits
       string url
       # The failure message for the failed request.
       string failureMessage
-      optional Network.RequestId requestId
 
   type StyleSheetLoadingIssueReason extends string
     enum
@@ -8567,8 +8566,7 @@ domain Page
       KeepaliveRequest
       IndexedDBEvent
       Dummy
-      JsNetworkRequestReceivedCacheControlNoStoreResource
-      WebSerial
+      AuthorizationHeader
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
```

## Roll protocol to r1155872 — _2023-06-10T04:26:19.000Z_
######  Diff: [`7ca37f8...2a2181a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7ca37f8...2a2181a`)

```diff
@@ browser_protocol.pdl:8567 @@ domain Page
       IndexedDBEvent
       Dummy
       AuthorizationHeader
+      WebSerial
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
```

## Roll protocol to r1155343 — _2023-06-09T04:26:30.000Z_
######  Diff: [`0c65644...7ca37f8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`0c65644...7ca37f8`)

```diff
@@ browser_protocol.pdl:820 @@ experimental domain Audits
       SilentMediationFailure
       ThirdPartyCookiesBlocked
 
-  type FederatedAuthUserInfoRequestIssueDetails extends object
-    properties
-      FederatedAuthUserInfoRequestIssueReason federatedAuthUserInfoRequestIssueReason
-
-  # Represents the failure reason when a getUserInfo() call fails.
-  # Should be updated alongside FederatedAuthUserInfoRequestResult in
-  # third_party/blink/public/mojom/devtools/inspector_issue.mojom.
-  type FederatedAuthUserInfoRequestIssueReason extends string
-    enum
-      NotSameOrigin
-      NotIframe
-      NotPotentiallyTrustworthy
-      NoApiPermission
-      NotSignedInWithIdp
-      NoAccountSharingPermission
-      InvalidConfigOrWellKnown
-      InvalidAccountsResponse
-      NoReturningUserFromFetchedAccounts
-
   # This issue tracks client hints related issues. It's used to deprecate old
   # features, encourage the use of new ones, and provide general guidance.
   type ClientHintIssueDetails extends object
@@ -890,7 +871,6 @@ experimental domain Audits
       FederatedAuthRequestIssue
       BounceTrackingIssue
       StylesheetLoadingIssue
-      FederatedAuthUserInfoRequestIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -914,7 +894,6 @@ experimental domain Audits
       optional FederatedAuthRequestIssueDetails federatedAuthRequestIssueDetails
       optional BounceTrackingIssueDetails bounceTrackingIssueDetails
       optional StylesheetLoadingIssueDetails stylesheetLoadingIssueDetails
-      optional FederatedAuthUserInfoRequestIssueDetails federatedAuthUserInfoRequestIssueDetails
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
@@ -6514,7 +6493,6 @@ domain Network
       enum status
         Ok
         InvalidArgument
-        MissingIssuerKeys
         FailedPrecondition
         ResourceExhausted
         AlreadyExists
@@ -7301,9 +7279,11 @@ domain Page
       ch-ua-platform
       ch-ua-model
       ch-ua-mobile
+      ch-ua-full
       ch-ua-full-version
       ch-ua-full-version-list
       ch-ua-platform-version
+      ch-ua-reduced
       ch-ua-wow64
       ch-viewport-height
       ch-viewport-width
@@ -11107,7 +11087,6 @@ experimental domain Preload
       MemoryPressureOnTrigger
       MemoryPressureAfterTriggered
       PrerenderingDisabledByDevTools
-      ResourceLoadBlockedByClient
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
```

## Roll protocol to r1154250 — _2023-06-07T04:26:56.000Z_
######  Diff: [`d9d9e42...0c65644`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d9d9e42...0c65644`)

```diff
@@ browser_protocol.pdl:827 @@ experimental domain Audits
       SourceCodeLocation sourceCodeLocation
       ClientHintIssueReason clientHintIssueReason
 
-  type FailedRequestInfo extends object
-    properties
-      # The URL that failed to load.
-      string url
-      # The failure message for the failed request.
-      string failureMessage
-
-  type StyleSheetLoadingIssueReason extends string
-    enum
-      LateImportRule
-      RequestFailed
-
-  # This issue warns when a referenced stylesheet couldn't be loaded.
-  type StylesheetLoadingIssueDetails extends object
-    properties
-      # Source code position that referenced the failing stylesheet.
-      SourceCodeLocation sourceCodeLocation
-      # Reason why the stylesheet couldn't be loaded.
-      StyleSheetLoadingIssueReason styleSheetLoadingIssueReason
-      # Contains additional info when the failure was due to a request.
-      optional FailedRequestInfo failedRequestInfo
-
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -870,7 +848,6 @@ experimental domain Audits
       ClientHintIssue
       FederatedAuthRequestIssue
       BounceTrackingIssue
-      StylesheetLoadingIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -893,7 +870,6 @@ experimental domain Audits
       optional ClientHintIssueDetails clientHintIssueDetails
       optional FederatedAuthRequestIssueDetails federatedAuthRequestIssueDetails
       optional BounceTrackingIssueDetails bounceTrackingIssueDetails
-      optional StylesheetLoadingIssueDetails stylesheetLoadingIssueDetails
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
```

## Roll protocol to r1152884 — _2023-06-03T04:26:19.000Z_
######  Diff: [`7eaf459...d9d9e42`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7eaf459...d9d9e42`)

```diff
@@ browser_protocol.pdl:6560 @@ domain Network
       optional string reportingEndpoint
       optional string reportOnlyReportingEndpoint
 
-  experimental type ContentSecurityPolicySource extends string
-    enum
-      HTTP
-      Meta
-
-  experimental type ContentSecurityPolicyStatus extends object
-    properties
-      string effectiveDirectives
-      boolean isEnforced
-      ContentSecurityPolicySource source
-
   experimental type SecurityIsolationStatus extends object
     properties
       optional CrossOriginOpenerPolicyStatus coop
       optional CrossOriginEmbedderPolicyStatus coep
-      optional array of ContentSecurityPolicyStatus csp
 
   # Returns information about the COEP/COOP isolation status.
   experimental command getSecurityIsolationStatus
@@ -8523,7 +8511,6 @@ domain Page
       IndexedDBEvent
       Dummy
       AuthorizationHeader
-      WebSerial
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
```

## Roll protocol to r1152352 — _2023-06-02T04:26:31.000Z_
######  Diff: [`11fd654...7eaf459`](https://github.com/ChromeDevTools/devtools-protocol/compare/`11fd654...7eaf459`)

```diff
@@ browser_protocol.pdl:3984 @@ experimental domain HeadlessExperimental
         jpeg
         png
         webp
-      # Compression quality from range [0..100] (jpeg and webp only).
+      # Compression quality from range [0..100] (jpeg only).
       optional integer quality
       # Optimize image encoding for speed, not for resulting size (defaults to false)
       optional boolean optimizeForSpeed
```

## Roll protocol to r1151065 — _2023-05-31T04:26:30.000Z_
######  Diff: [`44ad3c8...11fd654`](https://github.com/ChromeDevTools/devtools-protocol/compare/`44ad3c8...11fd654`)

```diff
@@ browser_protocol.pdl:818 @@ experimental domain Audits
       Canceled
       RpPageNotVisible
       SilentMediationFailure
-      ThirdPartyCookiesBlocked
 
   # This issue tracks client hints related issues. It's used to deprecate old
   # features, encourage the use of new ones, and provide general guidance.
@@ -8463,7 +8462,6 @@ domain Page
       ActivationNavigationsDisallowedForBug1234857
       ErrorDocument
       FencedFramesEmbedder
-      CookieDisabled
       #Blocklisted features
       WebSocket
       WebTransport
```

## Roll protocol to r1149535 — _2023-05-26T04:26:25.000Z_
######  Diff: [`4f898ab...44ad3c8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4f898ab...44ad3c8`)

```diff
@@ browser_protocol.pdl:8631 @@ domain Page
       # Base64-encoded data
       binary data
 
-  # Enable/disable prerendering manually.
-  #
-  # This command is a short-term solution for https://crbug.com/1440085.
-  # See https://docs.google.com/document/d/12HVmFxYj5Jc-eJr5OmWsa2bqTJsbgGLKI6ZIyx0_wpA
-  # for more details.
-  #
-  # TODO(https://crbug.com/1440085): Remove this once Puppeteer supports tab targets.
-  experimental command setPrerenderingAllowed
-    parameters
-      boolean isAllowed
-
 domain Performance
 
   # Run-time execution metric.
@@ -11047,7 +11036,6 @@ experimental domain Preload
       SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation
       MemoryPressureOnTrigger
       MemoryPressureAfterTriggered
-      PrerenderingDisabledByDevTools
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index 7a3c772..0dbdc01 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -1443,7 +1443,7 @@ domain Runtime
       # resulting `objectId` is still provided.
       deprecated optional boolean generateWebDriverValue
       # Specifies the result serialization. If provided, overrides
-      # `generatePreview`, `returnByValue` and `generateWebDriverValue`.
+      # `returnByValue` and `generateWebDriverValue`.
       experimental optional SerializationOptions serializationOptions
 
     returns
@@ -1538,7 +1538,7 @@ domain Runtime
       # resulting `objectId` is still provided.
       deprecated optional boolean generateWebDriverValue
       # Specifies the result serialization. If provided, overrides
-      # `generatePreview`, `returnByValue` and `generateWebDriverValue`.
+      # `returnByValue` and `generateWebDriverValue`.
       experimental optional SerializationOptions serializationOptions
     returns
       # Evaluation result.
```

## Roll protocol to r1148337 — _2023-05-24T04:27:07.000Z_
######  Diff: [`fb80158...4f898ab`](https://github.com/ChromeDevTools/devtools-protocol/compare/`fb80158...4f898ab`)

```diff
@@ browser_protocol.pdl:5121 @@ domain Network
       experimental number pushStart
       # Time the server finished pushing request.
       experimental number pushEnd
-      # Started receiving response headers.
-      experimental number receiveHeadersStart
       # Finished receiving response headers.
       number receiveHeadersEnd
```

## Roll protocol to r1147663 — _2023-05-23T04:26:36.000Z_
######  Diff: [`60a039d...fb80158`](https://github.com/ChromeDevTools/devtools-protocol/compare/`60a039d...fb80158`)

```diff
@@ browser_protocol.pdl:1382 @@ experimental domain CSS
       string text
       # Value range in the underlying resource (if available).
       optional SourceRange range
-      # Specificity of the selector.
-      experimental optional Specificity specificity
-
-  # Specificity:
-  # https://drafts.csswg.org/selectors/#specificity-rules
-  experimental type Specificity extends object
-    properties
-      # The a component, which represents the number of ID selectors.
-      integer a
-      # The b component, which represents the number of class selectors, attributes selectors, and
-      # pseudo-classes.
-      integer b
-      # The c component, which represents the number of type selectors and pseudo-elements.
-      integer c
 
   # Selector list data.
   type SelectorList extends object
```

## Roll protocol to r1146845 — _2023-05-20T04:26:10.000Z_
######  Diff: [`8445d84...60a039d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8445d84...60a039d`)

```diff
@@ browser_protocol.pdl:2047 @@ experimental domain CSS
       StyleSheetId styleSheetId
 
 experimental domain CacheStorage
-  depends on Storage
 
   # Unique identifier of the Cache object.
   type CacheId extends string
@@ -2091,8 +2090,6 @@ experimental domain CacheStorage
       string securityOrigin
       # Storage key of the cache.
       string storageKey
-      # Storage bucket of the cache.
-      optional Storage.StorageBucket storageBucket
       # The name of the cache.
       string cacheName
 
@@ -2124,13 +2121,11 @@ experimental domain CacheStorage
   # Requests cache names.
   command requestCacheNames
     parameters
-      # At least and at most one of securityOrigin, storageKey, storageBucket must be specified.
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
-      # Storage bucket. If not specified, it uses the default bucket.
-      optional Storage.StorageBucket storageBucket
     returns
       # Caches for the security origin.
       array of Cache caches
@@ -9437,8 +9432,6 @@ experimental domain Storage
       string origin
       # Storage key to update.
       string storageKey
-      # Storage bucket to update.
-      string bucketId
       # Name of cache in origin.
       string cacheName
 
@@ -9449,8 +9442,6 @@ experimental domain Storage
       string origin
       # Storage key to update.
       string storageKey
-      # Storage bucket to update.
-      string bucketId
 
   # The origin's IndexedDB object store has been modified.
   event indexedDBContentUpdated
@@ -11033,12 +11024,19 @@ experimental domain Preload
       # that is incompatible with prerender and has caused the cancellation of the attempt
       optional string disallowedApiMethod
 
+  type PreloadEnabledState extends string
+    enum
+      Enabled
+      DisabledByDataSaver
+      DisabledByBatterySaver
+      DisabledByPreference
+      # Service not available.
+      NotSupported
+
   # Fired when a preload enabled state is updated.
   event preloadEnabledStateUpdated
     parameters
-      boolean disabledByPreference
-      boolean disabledByDataSaver
-      boolean disabledByBatterySaver
+      PreloadEnabledState state
 
   # Preloading status values, see also PreloadingTriggeringOutcome. This
   # status is shared by prefetchStatusUpdated and prerenderStatusUpdated.
```

## Roll protocol to r1146363 — _2023-05-19T04:26:26.000Z_
######  Diff: [`d1a5b89...8445d84`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d1a5b89...8445d84`)

```diff
@@ browser_protocol.pdl:817 @@ experimental domain Audits
       ErrorIdToken
       Canceled
       RpPageNotVisible
-      SilentMediationFailure
 
   # This issue tracks client hints related issues. It's used to deprecate old
   # features, encourage the use of new ones, and provide general guidance.
@@ -1315,12 +1314,6 @@ domain Browser
     parameters
       BrowserCommandId commandId
 
-  # Allows a site to use privacy sandbox features that require enrollment
-  # without the site actually being enrolled. Only supported on page targets.
-  command addPrivacySandboxEnrollmentOverride
-    parameters
-      string url
-
 # This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles)
 # have an associated `id` used in subsequent operations on the related object. Each object type has
 # a specific `id` structure, and those are not interchangeable between objects of different kinds.
@@ -11062,7 +11055,6 @@ experimental domain Preload
       PrefetchFailedNetError
       PrefetchFailedNon2XX
       PrefetchFailedPerPageLimitExceeded
-      PrefetchEvicted
       PrefetchHeldback
       # A previous prefetch to the origin got a HTTP 503 response with an
       # Retry-After header that has no elapsed yet.
```

## Roll protocol to r1145810 — _2023-05-18T04:26:32.000Z_
######  Diff: [`467c277...d1a5b89`](https://github.com/ChromeDevTools/devtools-protocol/compare/`467c277...d1a5b89`)

```diff
@@ browser_protocol.pdl:11070 @@ experimental domain Preload
       PrefetchNotEligibleSchemeIsNotHttps
       PrefetchNotEligibleUserHasCookies
       PrefetchNotEligibleUserHasServiceWorker
-      PrefetchNotEligibleBatterySaverEnabled
-      PrefetchNotEligiblePreloadingDisabled
       PrefetchNotFinishedInTime
       PrefetchNotStarted
       PrefetchNotUsedCookiesChanged
@@ -11097,6 +11095,9 @@ experimental domain Preload
   event prerenderStatusUpdated
     parameters
       PreloadingAttemptKey key
+      # The frame id of the frame initiating prerender.
+      Page.FrameId initiatingFrameId
+      string prerenderingUrl
       PreloadingStatus status
       optional PrerenderFinalStatus prerenderStatus
 
@@ -11168,3 +11169,4 @@ experimental domain FedCm
   # Resets the cooldown time, if any, to allow the next FedCM call to show
   # a dialog even if one was recently dismissed by the user.
   command resetCooldown
+
```

## Roll protocol to r1145140 — _2023-05-17T04:26:30.000Z_
######  Diff: [`81e97fb...467c277`](https://github.com/ChromeDevTools/devtools-protocol/compare/`81e97fb...467c277`)

```diff
@@ browser_protocol.pdl:11004 @@ experimental domain Preload
       SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation
       MemoryPressureOnTrigger
       MemoryPressureAfterTriggered
+      SpeculationRuleRemoved
+      TriggerPageNavigated
+      OtherPrerenderedPageActivated
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
@@ -11099,7 +11102,6 @@ experimental domain Preload
       Page.FrameId initiatingFrameId
       string prerenderingUrl
       PreloadingStatus status
-      optional PrerenderFinalStatus prerenderStatus
 
   # Send a list of sources for all preloading attempts in a document.
   event preloadingAttemptSourcesUpdated
```

## Roll protocol to r1144541 — _2023-05-16T04:27:03.000Z_
######  Diff: [`3c6f201...81e97fb`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3c6f201...81e97fb`)

```diff
@@ browser_protocol.pdl:919 @@ experimental domain Audits
       # Whether to report WCAG AAA level issues. Default is false.
       optional boolean reportAAA
 
-  # Runs the form issues check for the target page. Found issues are reported
-  # using Audits.issueAdded event.
-  command checkFormsIssues
-    returns
-      array of GenericIssueDetails formIssues
-
   event issueAdded
     parameters
       InspectorIssue issue
@@ -950,8 +944,6 @@ experimental domain Autofill
     parameters
       # Identifies a field that serves as an anchor for autofill.
       DOM.BackendNodeId fieldId
-      # Identifies the frame that field belongs to.
-      optional Page.FrameId frameId
       # Credit card information to fill out the form. Credit card data is not saved.
       CreditCard card
```

## Roll protocol to r1143632 — _2023-05-13T04:26:23.000Z_
######  Diff: [`53a0f38...3c6f201`](https://github.com/ChromeDevTools/devtools-protocol/compare/`53a0f38...3c6f201`)

```diff
@@ browser_protocol.pdl:10996 @@ experimental domain Preload
       SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation
       MemoryPressureOnTrigger
       MemoryPressureAfterTriggered
-      SpeculationRuleRemoved
-      TriggerPageNavigated
-      OtherPrerenderedPageActivated
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
@@ -11038,44 +11035,6 @@ experimental domain Preload
       # PreloadingTriggeringOutcome which not used by prefetch nor prerender.
       NotSupported
 
-  # TODO(https://crbug.com/1384419): revisit the list of PrefetchStatus and
-  # filter out the ones that aren't necessary to the developers.
-  type PrefetchStatus extends string
-    enum
-      # Prefetch is not disabled by PrefetchHeldback.
-      PrefetchAllowed
-      PrefetchFailedIneligibleRedirect
-      PrefetchFailedInvalidRedirect
-      PrefetchFailedMIMENotSupported
-      PrefetchFailedNetError
-      PrefetchFailedNon2XX
-      PrefetchFailedPerPageLimitExceeded
-      PrefetchHeldback
-      # A previous prefetch to the origin got a HTTP 503 response with an
-      # Retry-After header that has no elapsed yet.
-      PrefetchIneligibleRetryAfter
-      PrefetchIsPrivacyDecoy
-      PrefetchIsStale
-      PrefetchNotEligibleBrowserContextOffTheRecord
-      PrefetchNotEligibleDataSaverEnabled
-      PrefetchNotEligibleExistingProxy
-      PrefetchNotEligibleHostIsNonUnique
-      PrefetchNotEligibleNonDefaultStoragePartition
-      PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy
-      PrefetchNotEligibleSchemeIsNotHttps
-      PrefetchNotEligibleUserHasCookies
-      PrefetchNotEligibleUserHasServiceWorker
-      PrefetchNotFinishedInTime
-      PrefetchNotStarted
-      PrefetchNotUsedCookiesChanged
-      PrefetchProxyNotAvailable
-      # The response of the prefetch is used for the next navigation. This is
-      # the final successful state.
-      PrefetchResponseUsed
-      # The prefetch finished successfully but was never used.
-      PrefetchSuccessfulButNotUsed
-      PrefetchNotUsedProbeFailed
-
   # Fired when a prefetch attempt is updated.
   event prefetchStatusUpdated
     parameters
@@ -11084,7 +11043,6 @@ experimental domain Preload
       Page.FrameId initiatingFrameId
       string prefetchUrl
       PreloadingStatus status
-      PrefetchStatus prefetchStatus
 
   # Fired when a prerender attempt is updated.
   event prerenderStatusUpdated
```

## Roll protocol to r1141857 — _2023-05-10T04:26:34.000Z_
######  Diff: [`1e3d3e0...53a0f38`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1e3d3e0...53a0f38`)

```diff
@@ browser_protocol.pdl:11068 @@ experimental domain FedCm
       SignIn
       SignUp
 
-  # Whether the dialog shown is an account chooser or an auto re-authentication dialog.
-  type DialogType extends string
-    enum
-      AccountChooser
-      AutoReauthn
-
   # Corresponds to IdentityRequestAccount
   type Account extends object
     properties
@@ -11092,7 +11086,6 @@ experimental domain FedCm
   event dialogShown
     parameters
       string dialogId
-      DialogType dialogType
       array of Account accounts
       # These exist primarily so that the caller can verify the
       # RP context was used appropriately.
```

## Roll protocol to r1140464 — _2023-05-06T04:26:18.000Z_
######  Diff: [`8469893...1e3d3e0`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8469893...1e3d3e0`)

```diff
@@ js_protocol.pdl:1014 @@ domain Runtime
   # Unique script identifier.
   type ScriptId extends string
 
-  # Represents options for serialization. Overrides `generatePreview`, `returnByValue` and
-  # `generateWebDriverValue`.
-  type SerializationOptions extends object
-    properties
-      enum serialization
-        # Whether the result should be deep-serialized. The result is put into
-        # `deepSerializedValue` and `ObjectId` is provided.
-        deep
-        # Whether the result is expected to be a JSON object which should be sent by value.
-        # The result is put either into `value` or into `unserializableValue`. Synonym of
-        # `returnByValue: true`. Overrides `returnByValue`.
-        json
-        # Only remote object id is put in the result. Same bahaviour as if no
-        # `serializationOptions`, `generatePreview`, `returnByValue` nor `generateWebDriverValue`
-        # are provided.
-        idOnly
-
-      # Deep serialization depth. Default is full depth. Respected only in `deep` serialization mode.
-      optional integer maxDepth
-
-  # Represents deep serialized value.
+  # Represents the value serialiazed by the WebDriver BiDi specification
+  # https://goo.gle/browser-automation-deepserialization.
   type DeepSerializedValue extends object
     properties
       enum type
@@ -1120,10 +1101,8 @@ domain Runtime
       optional UnserializableValue unserializableValue
       # String representation of the object.
       optional string description
-      # Deprecated. Use `deepSerializedValue` instead. WebDriver BiDi representation of the value.
-      deprecated optional DeepSerializedValue webDriverValue
-      # Deep serialized value.
-      experimental optional DeepSerializedValue deepSerializedValue
+      # WebDriver BiDi representation of the value.
+      experimental optional DeepSerializedValue webDriverValue
       # Unique object identifier (for non-primitive values).
       optional RemoteObjectId objectId
       # Preview containing abbreviated property values. Specified for `object` type values only.
@@ -1413,7 +1392,6 @@ domain Runtime
       # execution. Overrides `setPauseOnException` state.
       optional boolean silent
       # Whether the result is expected to be a JSON object which should be sent by value.
-      # Can be overriden by `serializationOptions`.
       optional boolean returnByValue
       # Whether preview should be generated for the result.
       experimental optional boolean generatePreview
@@ -1437,15 +1415,10 @@ domain Runtime
       # boundaries).
       # This is mutually exclusive with `executionContextId`.
       experimental optional string uniqueContextId
-      # Deprecated. Use `serializationOptions: {serialization:"deep"}` instead.
       # Whether the result should contain `webDriverValue`, serialized according to
-      # https://w3c.github.io/webdriver-bidi. This is mutually exclusive with `returnByValue`, but
-      # resulting `objectId` is still provided.
-      deprecated optional boolean generateWebDriverValue
-      # Specifies the result serialization. If provided, overrides
-      # `returnByValue` and `generateWebDriverValue`.
-      experimental optional SerializationOptions serializationOptions
-
+      # https://goo.gle/browser-automation-deepserialization. This is mutually
+      # exclusive with `returnByValue`, but resulting `objectId` is still provided.
+      experimental optional boolean generateWebDriverValue
     returns
       # Call result.
       RemoteObject result
@@ -1531,15 +1504,8 @@ domain Runtime
       # boundaries).
       # This is mutually exclusive with `contextId`.
       experimental optional string uniqueContextId
-      # Deprecated. Use `serializationOptions: {serialization:"deep"}` instead.
-      # Whether the result should contain `webDriverValue`, serialized
-      # according to
-      # https://w3c.github.io/webdriver-bidi. This is mutually exclusive with `returnByValue`, but
-      # resulting `objectId` is still provided.
-      deprecated optional boolean generateWebDriverValue
-      # Specifies the result serialization. If provided, overrides
-      # `returnByValue` and `generateWebDriverValue`.
-      experimental optional SerializationOptions serializationOptions
+      # Whether the result should be serialized according to https://goo.gle/browser-automation-deepserialization.
+      experimental optional boolean generateWebDriverValue
     returns
       # Evaluation result.
       RemoteObject result
```

## Roll protocol to r1139932 — _2023-05-05T04:26:32.000Z_
######  Diff: [`3a37ac7...8469893`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3a37ac7...8469893`)

```diff
@@ browser_protocol.pdl:658 @@ experimental domain Audits
       boolean isWarning
       SharedArrayBufferIssueType type
 
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
   type LowTextContrastIssueDetails extends object
     properties
       DOM.BackendNodeId violatingNodeId
@@ -836,6 +855,7 @@ experimental domain Audits
       HeavyAdIssue
       ContentSecurityPolicyIssue
       SharedArrayBufferIssue
+      TrustedWebActivityIssue
       LowTextContrastIssue
       CorsIssue
       AttributionReportingIssue
@@ -858,6 +878,7 @@ experimental domain Audits
       optional HeavyAdIssueDetails heavyAdIssueDetails
       optional ContentSecurityPolicyIssueDetails contentSecurityPolicyIssueDetails
       optional SharedArrayBufferIssueDetails sharedArrayBufferIssueDetails
+      optional TrustedWebActivityIssueDetails twaQualityEnforcementDetails
       optional LowTextContrastIssueDetails lowTextContrastIssueDetails
       optional CorsIssueDetails corsIssueDetails
       optional AttributionReportingIssueDetails attributionReportingIssueDetails
```

## Roll protocol to r1139346 — _2023-05-04T04:26:49.000Z_
######  Diff: [`5b4da4d...3a37ac7`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5b4da4d...3a37ac7`)

```diff
@@ browser_protocol.pdl:944 @@ experimental domain Audits
     parameters
       InspectorIssue issue
 
-# Defines commands and events for Autofill.
-experimental domain Autofill
-  type CreditCard extends object
-    properties
-      # 16-digit credit card number.
-      string number
-      # Name of the credit card owner.
-      string name
-      # 2-digit expiry month.
-      string expiryMonth
-      # 4-digit expiry year.
-      string expiryYear
-      # 3-digit card verification code.
-      string cvc
-
-  # Trigger autofill on a form identified by the fieldId.
-  # If the field and related form cannot be autofilled, returns an error.
-  command trigger
-    parameters
-      # Identifies a field that serves as an anchor for autofill.
-      DOM.BackendNodeId fieldId
-      # Credit card information to fill out the form. Credit card data is not saved.
-      CreditCard card
-
 # Defines events for background web platform features.
 experimental domain BackgroundService
   # The Background Service that will be associated with the commands/events.
```

## Roll protocol to r1138800 — _2023-05-03T04:26:34.000Z_
######  Diff: [`fd2e02b...5b4da4d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`fd2e02b...5b4da4d`)

```diff
@@ js_protocol.pdl:1015 @@ domain Runtime
   type ScriptId extends string
 
   # Represents the value serialiazed by the WebDriver BiDi specification
-  # https://goo.gle/browser-automation-deepserialization.
-  type DeepSerializedValue extends object
+  # https://w3c.github.io/webdriver-bidi.
+  type WebDriverValue extends object
     properties
       enum type
         undefined
@@ -1102,7 +1102,7 @@ domain Runtime
       # String representation of the object.
       optional string description
       # WebDriver BiDi representation of the value.
-      experimental optional DeepSerializedValue webDriverValue
+      experimental optional WebDriverValue webDriverValue
       # Unique object identifier (for non-primitive values).
       optional RemoteObjectId objectId
       # Preview containing abbreviated property values. Specified for `object` type values only.
@@ -1416,8 +1416,8 @@ domain Runtime
       # This is mutually exclusive with `executionContextId`.
       experimental optional string uniqueContextId
       # Whether the result should contain `webDriverValue`, serialized according to
-      # https://goo.gle/browser-automation-deepserialization. This is mutually
-      # exclusive with `returnByValue`, but resulting `objectId` is still provided.
+      # https://w3c.github.io/webdriver-bidi. This is mutually exclusive with `returnByValue`, but
+      # resulting `objectId` is still provided.
       experimental optional boolean generateWebDriverValue
     returns
       # Call result.
@@ -1504,7 +1504,7 @@ domain Runtime
       # boundaries).
       # This is mutually exclusive with `contextId`.
       experimental optional string uniqueContextId
-      # Whether the result should be serialized according to https://goo.gle/browser-automation-deepserialization.
+      # Whether the result should be serialized according to https://w3c.github.io/webdriver-bidi.
       experimental optional boolean generateWebDriverValue
     returns
       # Evaluation result.
```

## Roll protocol to r1138159 — _2023-05-02T04:26:48.000Z_
######  Diff: [`fb39cd1...fd2e02b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`fb39cd1...fd2e02b`)

```diff
@@ browser_protocol.pdl:707 @@ experimental domain Audits
       # TODO(apaseltiner): Rename this to InvalidRegisterSourceHeader
       InvalidHeader
       InvalidRegisterTriggerHeader
+      # TODO(apaseltiner): Remove this issue once DevTools stops referencing it.
+      InvalidEligibleHeader
       SourceAndTriggerHeaders
       SourceIgnored
       TriggerIgnored
```

## Roll protocol to r1137730 — _2023-05-01T04:26:59.000Z_
######  Diff: [`a74f8b5...fb39cd1`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a74f8b5...fb39cd1`)

```diff
@@ js_protocol.pdl:1044 @@ domain Runtime
         window
       optional any value
       optional string objectId
-      # Set if value reference met more then once during serialization. In such
-      # case, value is provided only to one of the serialized values. Unique
-      # per value in the scope of one CDP call.
-      optional integer weakLocalObjectReference
 
   # Unique object identifier.
   type RemoteObjectId extends string
```

## Roll protocol to r1137505 — _2023-04-29T04:26:38.000Z_
######  Diff: [`7530c23...a74f8b5`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7530c23...a74f8b5`)

```diff
@@ browser_protocol.pdl:4028 @@ domain IO
 
 experimental domain IndexedDB
   depends on Runtime
-  depends on Storage
 
   # Database with an array of object stores.
   type DatabaseWithObjectStores extends object
@@ -4121,13 +4120,11 @@ experimental domain IndexedDB
   # Clears all entries from an object store.
   command clearObjectStore
     parameters
-      # At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
-      # Storage bucket. If not specified, it uses the default bucket.
-      optional Storage.StorageBucket storageBucket
       # Database name.
       string databaseName
       # Object store name.
@@ -4136,26 +4133,22 @@ experimental domain IndexedDB
   # Deletes a database.
   command deleteDatabase
     parameters
-      # At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
-      # Storage bucket. If not specified, it uses the default bucket.
-      optional Storage.StorageBucket storageBucket
       # Database name.
       string databaseName
 
   # Delete a range of entries from an object store
   command deleteObjectStoreEntries
     parameters
-      # At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
-      # Storage bucket. If not specified, it uses the default bucket.
-      optional Storage.StorageBucket storageBucket
       string databaseName
       string objectStoreName
       # Range of entry keys to delete
@@ -4170,13 +4163,11 @@ experimental domain IndexedDB
   # Requests data from object store or index.
   command requestData
     parameters
-      # At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
-      # Storage bucket. If not specified, it uses the default bucket.
-      optional Storage.StorageBucket storageBucket
       # Database name.
       string databaseName
       # Object store name.
@@ -4198,13 +4189,11 @@ experimental domain IndexedDB
   # Gets metadata of an object store.
   command getMetadata
     parameters
-      # At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
-      # Storage bucket. If not specified, it uses the default bucket.
-      optional Storage.StorageBucket storageBucket
       # Database name.
       string databaseName
       # Object store name.
@@ -4220,13 +4209,11 @@ experimental domain IndexedDB
   # Requests database with given name in given frame.
   command requestDatabase
     parameters
-      # At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
-      # Storage bucket. If not specified, it uses the default bucket.
-      optional Storage.StorageBucket storageBucket
       # Database name.
       string databaseName
     returns
@@ -4236,13 +4223,11 @@ experimental domain IndexedDB
   # Requests database names for given security origin.
   command requestDatabaseNames
     parameters
-      # At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
-      # Storage bucket. If not specified, it uses the default bucket.
-      optional Storage.StorageBucket storageBucket
     returns
       # Database names for origin.
       array of string databaseNames
@@ -9181,16 +9166,12 @@ experimental domain Storage
       relaxed
       strict
 
-  type StorageBucket extends object
-    properties
-      SerializedStorageKey storageKey
-      # If not specified, it is the default bucket of the storageKey.
-      optional string name
-
   type StorageBucketInfo extends object
     properties
-      StorageBucket bucket
+      SerializedStorageKey storageKey
       string id
+      string name
+      boolean isDefault
       Network.TimeSinceEpoch expiration
       # Storage quota (bytes).
       number quota
@@ -9402,7 +9383,8 @@ experimental domain Storage
   # Deletes the Storage Bucket with the given storage key and bucket name.
   experimental command deleteStorageBucket
     parameters
-      StorageBucket bucket
+      string storageKey
+      string bucketName
 
   # Deletes state for sites identified as potential bounce trackers, immediately.
   experimental command runBounceTrackingMitigations
@@ -9434,8 +9416,6 @@ experimental domain Storage
       string origin
       # Storage key to update.
       string storageKey
-      # Storage bucket to update.
-      string bucketId
       # Database to update.
       string databaseName
       # ObjectStore to update.
@@ -9448,8 +9428,6 @@ experimental domain Storage
       string origin
       # Storage key to update.
       string storageKey
-      # Storage bucket to update.
-      string bucketId
 
   # One of the interest groups was accessed by the associated page.
   event interestGroupAccessed
@@ -9477,7 +9455,7 @@ experimental domain Storage
 
   event storageBucketCreatedOrUpdated
     parameters
-      StorageBucketInfo bucketInfo
+      StorageBucketInfo bucket
 
   event storageBucketDeleted
     parameters
@@ -10854,19 +10832,6 @@ experimental domain Preload
       # - https://wicg.github.io/nav-speculation/speculation-rules.html
       # - https://github.com/WICG/nav-speculation/blob/main/triggers.md
       string sourceText
-      # A speculation rule set is either added through an inline
-      # <script> tag or through an external resource via the
-      # 'Speculation-Rules' HTTP header. For the first case, we include
-      # the BackendNodeId of the relevant <script> tag. For the second
-      # case, we include the external URL where the rule set was loaded
-      # from, and also RequestId if Network domain is enabled.
-      #
-      # See also:
-      # - https://wicg.github.io/nav-speculation/speculation-rules.html#speculation-rules-script
-      # - https://wicg.github.io/nav-speculation/speculation-rules.html#speculation-rules-header
-      optional DOM.BackendNodeId backendNodeId
-      optional string url
-      optional Network.RequestId requestId
       # Error information
       # `errorMessage` is null iff `errorType` is null.
       optional RuleSetErrorType errorType
```

## Roll protocol to r1136950 — _2023-04-28T04:26:58.000Z_
######  Diff: [`7a08255...7530c23`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7a08255...7530c23`)

```diff
@@ browser_protocol.pdl:707 @@ experimental domain Audits
       # TODO(apaseltiner): Rename this to InvalidRegisterSourceHeader
       InvalidHeader
       InvalidRegisterTriggerHeader
-      # TODO(apaseltiner): Remove this issue once DevTools stops referencing it.
       InvalidEligibleHeader
       SourceAndTriggerHeaders
       SourceIgnored
```

## Roll protocol to r1135726 — _2023-04-26T04:27:01.000Z_
######  Diff: [`72f4d4e...7a08255`](https://github.com/ChromeDevTools/devtools-protocol/compare/`72f4d4e...7a08255`)

```diff
@@ browser_protocol.pdl:4668 @@ experimental domain LayerTree
       LayerId layerId
     returns
       # A list of strings specifying reasons for the given layer to become composited.
-      array of string compositingReasons
+      deprecated array of string compositingReasons
       # A list of strings specifying reason IDs for the given layer to become composited.
       array of string compositingReasonIds
 
@@ -7228,7 +7228,6 @@ domain Page
       payment
       picture-in-picture
       private-aggregation
-      private-state-token-issuance
       private-state-token-redemption
       publickey-credentials-get
       run-ad-auction
@@ -9385,11 +9384,6 @@ experimental domain Storage
       string storageKey
       string bucketName
 
-  # Deletes state for sites identified as potential bounce trackers, immediately.
-  experimental command runBounceTrackingMitigations
-    returns
-      array of string deletedSites
-
   # A cache's contents have been modified.
   event cacheStorageContentUpdated
     parameters
```

## Roll protocol to r1135028 — _2023-04-25T04:27:09.000Z_
######  Diff: [`4e41c0d...72f4d4e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4e41c0d...72f4d4e`)

```diff
@@ browser_protocol.pdl:716 @@ experimental domain Audits
       InvalidRegisterOsSourceHeader
       InvalidRegisterOsTriggerHeader
       WebAndOsHeaders
-      NoWebOrOsSupport
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
@@ -7228,7 +7227,6 @@ domain Page
       payment
       picture-in-picture
       private-aggregation
-      private-state-token-redemption
       publickey-credentials-get
       run-ad-auction
       screen-wake-lock
@@ -7239,6 +7237,7 @@ domain Page
       smart-card
       storage-access
       sync-xhr
+      trust-token-redemption
       unload
       usb
       vertical-scroll
```

## Roll protocol to r1134390 — _2023-04-24T04:27:12.000Z_
######  Diff: [`4dd6c67...4e41c0d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4dd6c67...4e41c0d`)

```diff
@@ js_protocol.pdl:632 @@ domain Debugger
       Runtime.ExecutionContextId executionContextId
       # Content hash of the script, SHA-256.
       string hash
-      # Embedder-specific auxiliary data likely matching {isDefault: boolean, type: 'default'|'isolated'|'worker', frameId: string}
+      # Embedder-specific auxiliary data.
       optional object executionContextAuxData
       # URL of source map associated with script (if any).
       optional string sourceMapURL
@@ -671,7 +671,7 @@ domain Debugger
       Runtime.ExecutionContextId executionContextId
       # Content hash of the script, SHA-256.
       string hash
-      # Embedder-specific auxiliary data likely matching {isDefault: boolean, type: 'default'|'isolated'|'worker', frameId: string}
+      # Embedder-specific auxiliary data.
       optional object executionContextAuxData
       # True, if this script is generated as a result of the live edit operation.
       experimental optional boolean isLiveEdit
@@ -1284,7 +1284,7 @@ domain Runtime
       # multiple processes, so can be reliably used to identify specific context while backend
       # performs a cross-process navigation.
       experimental string uniqueId
-      # Embedder-specific auxiliary data likely matching {isDefault: boolean, type: 'default'|'isolated'|'worker', frameId: string}
+      # Embedder-specific auxiliary data.
       optional object auxData
 
   # Detailed information about exception (or error) that was thrown during script compilation or
```

## Roll protocol to r1134181 — _2023-04-22T04:26:52.000Z_
######  Diff: [`052cf2f...4dd6c67`](https://github.com/ChromeDevTools/devtools-protocol/compare/`052cf2f...4dd6c67`)

```diff
@@ browser_protocol.pdl:10950 @@ experimental domain Preload
       CrossSiteNavigationInMainFrameNavigation
       SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation
       SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation
-      MemoryPressureOnTrigger
-      MemoryPressureAfterTriggered
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
```

## Roll protocol to r1133601 — _2023-04-21T04:27:13.000Z_
######  Diff: [`84eeee8...052cf2f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`84eeee8...052cf2f`)

```diff
@@ browser_protocol.pdl:777 @@ experimental domain Audits
 
   # This issue warns about sites in the redirect chain of a finished navigation
   # that may be flagged as trackers and have their state cleared if they don't
-  # receive a user interaction. Note that in this context 'site' means eTLD+1.
-  # For example, if the URL `https://example.test:80/bounce` was in the
+  # receive a user interaction. Note that in this context 'site' means eTLD+1. 
+  # For example, if the URL `https://example.test:80/bounce` was in the 
   # redirect chain, the site reported would be `example.test`.
   type BounceTrackingIssueDetails extends object
     properties
@@ -10963,20 +10963,6 @@ experimental domain Preload
       # that is incompatible with prerender and has caused the cancellation of the attempt
       optional string disallowedApiMethod
 
-  type PreloadEnabledState extends string
-    enum
-      Enabled
-      DisabledByDataSaver
-      DisabledByBatterySaver
-      DisabledByPreference
-      # Service not available.
-      NotSupported
-
-  # Fired when a preload enabled state is updated.
-  event preloadEnabledStateUpdated
-    parameters
-      PreloadEnabledState state
-
   # Preloading status values, see also PreloadingTriggeringOutcome. This
   # status is shared by prefetchStatusUpdated and prerenderStatusUpdated.
   type PreloadingStatus extends string
```

## Roll protocol to r1132318 — _2023-04-19T04:27:21.000Z_
######  Diff: [`e60aecf...84eeee8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e60aecf...84eeee8`)

```diff
@@ browser_protocol.pdl:809 @@ experimental domain Audits
       WellKnownNoResponse
       WellKnownInvalidResponse
       WellKnownListEmpty
-      WellKnownInvalidContentType
       ConfigNotInWellKnown
       WellKnownTooBig
       ConfigHttpNotFound
       ConfigNoResponse
       ConfigInvalidResponse
-      ConfigInvalidContentType
       ClientMetadataHttpNotFound
       ClientMetadataNoResponse
       ClientMetadataInvalidResponse
-      ClientMetadataInvalidContentType
       DisabledInSettings
       ErrorFetchingSignin
       InvalidSigninResponse
@@ -827,12 +824,10 @@ experimental domain Audits
       AccountsNoResponse
       AccountsInvalidResponse
       AccountsListEmpty
-      AccountsInvalidContentType
       IdTokenHttpNotFound
       IdTokenNoResponse
       IdTokenInvalidResponse
       IdTokenInvalidRequest
-      IdTokenInvalidContentType
       ErrorIdToken
       Canceled
       RpPageNotVisible
```

## Roll protocol to r1131670 — _2023-04-18T04:26:48.000Z_
######  Diff: [`ad86c64...e60aecf`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ad86c64...e60aecf`)

```diff
@@ browser_protocol.pdl:1412 @@ experimental domain CSS
       number endLine
       # Column offset of the end of the stylesheet within the resource (zero based).
       number endColumn
-      # If the style sheet was loaded from a network resource, this indicates when the resource failed to load
-      experimental optional boolean loadingFailed
 
   # CSS rule representation.
   type CSSRule extends object
```

## Roll protocol to r1130274 — _2023-04-14T04:26:53.000Z_
######  Diff: [`adde591...ad86c64`](https://github.com/ChromeDevTools/devtools-protocol/compare/`adde591...ad86c64`)

```diff
@@ browser_protocol.pdl:775 @@ experimental domain Audits
       # One of the deprecation names from third_party/blink/renderer/core/frame/deprecation/deprecation.json5
       string type
 
-  # This issue warns about sites in the redirect chain of a finished navigation
-  # that may be flagged as trackers and have their state cleared if they don't
-  # receive a user interaction. Note that in this context 'site' means eTLD+1. 
-  # For example, if the URL `https://example.test:80/bounce` was in the 
-  # redirect chain, the site reported would be `example.test`.
-  type BounceTrackingIssueDetails extends object
-    properties
-      array of string trackingSites
-
   type ClientHintIssueReason extends string
     enum
       # Items in the accept-ch meta tag allow list must be valid origins.
@@ -860,7 +851,6 @@ experimental domain Audits
       DeprecationIssue
       ClientHintIssue
       FederatedAuthRequestIssue
-      BounceTrackingIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -883,7 +873,6 @@ experimental domain Audits
       optional DeprecationIssueDetails deprecationIssueDetails
       optional ClientHintIssueDetails clientHintIssueDetails
       optional FederatedAuthRequestIssueDetails federatedAuthRequestIssueDetails
-      optional BounceTrackingIssueDetails bounceTrackingIssueDetails
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
```

## Roll protocol to r1129676 — _2023-04-13T04:27:09.000Z_
######  Diff: [`d7c1808...adde591`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d7c1808...adde591`)

```diff
@@ browser_protocol.pdl:708 @@ experimental domain Audits
       InvalidHeader
       InvalidRegisterTriggerHeader
       InvalidEligibleHeader
+      # TODO(crbug.com/1431942): Remove this issue once DevTools stops
+      # referencing it
+      TooManyConcurrentRequests
       SourceAndTriggerHeaders
       SourceIgnored
       TriggerIgnored
```

## Roll protocol to r1129085 — _2023-04-12T04:26:50.000Z_
######  Diff: [`22ae458...d7c1808`](https://github.com/ChromeDevTools/devtools-protocol/compare/`22ae458...d7c1808`)

```diff
@@ browser_protocol.pdl:708 @@ experimental domain Audits
       InvalidHeader
       InvalidRegisterTriggerHeader
       InvalidEligibleHeader
-      # TODO(crbug.com/1431942): Remove this issue once DevTools stops
-      # referencing it
       TooManyConcurrentRequests
       SourceAndTriggerHeaders
       SourceIgnored
```

## Roll protocol to r1126404 — _2023-04-05T04:27:02.000Z_
######  Diff: [`4cb5368...22ae458`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4cb5368...22ae458`)

```diff
@@ browser_protocol.pdl:1679 @@ experimental domain CSS
       # Parent stylesheet's origin.
       StyleSheetOrigin origin
       # Associated style declaration.
-      CSSStyle style
+      optional CSSStyle style
 
   # CSS position-fallback rule representation.
   type CSSPositionFallbackRule extends object
```

## Roll protocol to r1124027 — _2023-03-30T04:27:29.000Z_
######  Diff: [`bab8b36...4cb5368`](https://github.com/ChromeDevTools/devtools-protocol/compare/`bab8b36...4cb5368`)

```diff
@@ browser_protocol.pdl:765 @@ experimental domain Audits
       GenericIssueErrorType errorType
       optional Page.FrameId frameId
       optional DOM.BackendNodeId violatingNodeId
-      optional string violatingNodeAttribute
 
   # This issue tracks information needed to print a deprecation message.
   # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/third_party/blink/renderer/core/frame/deprecation/README.md
```

## Roll protocol to r1122837 — _2023-03-28T04:27:31.000Z_
######  Diff: [`0b187a3...bab8b36`](https://github.com/ChromeDevTools/devtools-protocol/compare/`0b187a3...bab8b36`)

```diff
@@ browser_protocol.pdl:1669 @@ experimental domain CSS
       # Available variation settings (a.k.a. "axes").
       optional array of FontVariationAxis fontVariationAxes
 
-  # CSS try rule representation.
-  type CSSTryRule extends object
-    properties
-      # The css style sheet identifier (absent for user agent stylesheet and user-specified
-      # stylesheet rules) this rule came from.
-      optional StyleSheetId styleSheetId
-      # Parent stylesheet's origin.
-      StyleSheetOrigin origin
-      # Associated style declaration.
-      optional CSSStyle style
-
-  # CSS position-fallback rule representation.
-  type CSSPositionFallbackRule extends object
-    properties
-      Value name
-      # List of keyframes.
-      array of CSSTryRule tryRules
-
   # CSS keyframes rule representation.
   type CSSKeyframesRule extends object
     properties
@@ -1820,8 +1802,6 @@ experimental domain CSS
       optional array of InheritedPseudoElementMatches inheritedPseudoElements
       # A list of CSS keyframed animations matching this node.
       optional array of CSSKeyframesRule cssKeyframesRules
-      # A list of CSS position fallbacks matching this node.
-      optional array of CSSPositionFallbackRule cssPositionFallbackRules
       # Id of the first parent element that does not have display: contents.
       experimental optional DOM.NodeId parentLayoutNodeId
```

## Roll protocol to r1122063 — _2023-03-25T04:27:16.000Z_
######  Diff: [`4295d0a...0b187a3`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4295d0a...0b187a3`)

```diff
@@ js_protocol.pdl:580 @@ domain Debugger
         other
         promiseRejection
         XHR
-        step
       # Object containing break-specific auxiliary properties.
       optional object data
       # Hit breakpoints IDs
```

## Roll protocol to r1121538 — _2023-03-24T04:27:33.000Z_
######  Diff: [`6a030f2...4295d0a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6a030f2...4295d0a`)

```diff
@@ browser_protocol.pdl:8984 @@ experimental domain Storage
       cache_storage
       interest_groups
       shared_storage
-      storage_buckets
       all
       other
 
@@ -9120,23 +9119,6 @@ experimental domain Storage
       # SharedStorageAccessType.workletSet.
       optional boolean ignoreIfPresent
 
-  type StorageBucketsDurability extends string
-    enum
-      relaxed
-      strict
-
-  type StorageBucketInfo extends object
-    properties
-      SerializedStorageKey storageKey
-      string id
-      string name
-      boolean isDefault
-      Network.TimeSinceEpoch expiration
-      # Storage quota (bytes).
-      number quota
-      boolean persistent
-      StorageBucketsDurability durability
-
   # Returns a storage key given a frame id.
   command getStorageKeyForFrame
     parameters
@@ -9333,18 +9315,6 @@ experimental domain Storage
     parameters
       boolean enable
 
-  # Set tracking for a storage key's buckets.
-  experimental command setStorageBucketTracking
-    parameters
-      string storageKey
-      boolean enable
-
-  # Deletes the Storage Bucket with the given storage key and bucket name.
-  experimental command deleteStorageBucket
-    parameters
-      string storageKey
-      string bucketName
-
   # A cache's contents have been modified.
   event cacheStorageContentUpdated
     parameters
@@ -9407,14 +9377,6 @@ experimental domain Storage
       # presence/absence depends on `type`.
       SharedStorageAccessParams params
 
-  event storageBucketCreatedOrUpdated
-    parameters
-      StorageBucketInfo bucket
-
-  event storageBucketDeleted
-    parameters
-      string bucketId
-
 # The SystemInfo domain defines methods and events for querying low-level system information.
 experimental domain SystemInfo
 
@@ -10786,16 +10748,6 @@ experimental domain Preload
       # - https://wicg.github.io/nav-speculation/speculation-rules.html
       # - https://github.com/WICG/nav-speculation/blob/main/triggers.md
       string sourceText
-      # Error information
-      # `errorMessage` is null iff `errorType` is null.
-      optional RuleSetErrorType errorType
-      # TODO(https://crbug.com/1425354): Replace this property with structured error.
-      deprecated optional string errorMessage
-
-  type RuleSetErrorType extends string
-    enum
-      SourceIsNotJsonObject
-      InvalidRulesSkipped
 
   # The type of preloading attempted. It corresponds to
   # mojom::SpeculationAction (although PrefetchWithSubresources is omitted as it
@@ -10989,10 +10941,6 @@ experimental domain FedCm
     parameters
       string dialogId
       array of Account accounts
-      # These exist primarily so that the caller can verify the
-      # RP context was used appropriately.
-      string title
-      optional string subtitle
 
   command enable
     parameters
@@ -11011,9 +10959,3 @@ experimental domain FedCm
   command dismissDialog
     parameters
       string dialogId
-      optional boolean triggerCooldown
-
-  # Resets the cooldown time, if any, to allow the next FedCM call to show
-  # a dialog even if one was recently dismissed by the user.
-  command resetCooldown
-
```

## Roll protocol to r1120988 — _2023-03-23T04:27:35.000Z_
######  Diff: [`7bd9b6c...6a030f2`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7bd9b6c...6a030f2`)

```diff
@@ browser_protocol.pdl:10868 @@ experimental domain Preload
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
     parameters
-      PreloadingAttemptKey key
       # The frame id of the frame initiating prerendering.
       Page.FrameId initiatingFrameId
       string prerenderingUrl
@@ -10892,7 +10891,6 @@ experimental domain Preload
   # Fired when a prefetch attempt is updated.
   event prefetchStatusUpdated
     parameters
-      PreloadingAttemptKey key
       # The frame id of the frame initiating prefetch.
       Page.FrameId initiatingFrameId
       string prefetchUrl
@@ -10901,7 +10899,6 @@ experimental domain Preload
   # Fired when a prerender attempt is updated.
   event prerenderStatusUpdated
     parameters
-      PreloadingAttemptKey key
       # The frame id of the frame initiating prerender.
       Page.FrameId initiatingFrameId
       string prerenderingUrl
```

## Roll protocol to r1120367 — _2023-03-22T04:27:34.000Z_
######  Diff: [`d451302...7bd9b6c`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d451302...7bd9b6c`)

```diff
@@ browser_protocol.pdl:756 @@ experimental domain Audits
       FormInputAssignedAutocompleteValueToIdOrNameAttributeError
       FormLabelHasNeitherForNorNestedInput
       FormLabelForMatchesNonExistingIdError
-      FormInputHasWrongButWellIntendedAutocompleteValueError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
@@ -10904,10 +10903,9 @@ experimental domain Preload
       string prerenderingUrl
       PreloadingStatus status
 
-  # Send a list of sources for all preloading attempts in a document.
+  # Send a list of sources for all preloading attempts.
   event preloadingAttemptSourcesUpdated
     parameters
-      Network.LoaderId loaderId
       array of PreloadingAttemptSource preloadingAttemptSources
 
 # This domain allows interacting with the FedCM dialog.
```

## Roll protocol to r1119769 — _2023-03-21T04:27:17.000Z_
######  Diff: [`40d0eff...d451302`](https://github.com/ChromeDevTools/devtools-protocol/compare/`40d0eff...d451302`)

```diff
@@ browser_protocol.pdl:10842 @@ experimental domain Preload
       InactivePageRestriction
       StartFailed
       TimeoutBackgrounded
-      CrossSiteRedirectInInitialNavigation
-      CrossSiteNavigationInInitialNavigation
-      SameSiteCrossOriginRedirectNotOptInInInitialNavigation
-      SameSiteCrossOriginNavigationNotOptInInInitialNavigation
+      CrossSiteRedirect
+      CrossSiteNavigation
+      SameSiteCrossOriginRedirect
+      SameSiteCrossOriginRedirectNotOptIn
+      SameSiteCrossOriginNavigationNotOptIn
       ActivationNavigationParameterMismatch
       ActivatedInBackground
       EmbedderHostDisallowed
@@ -10859,10 +10860,6 @@ experimental domain Preload
       BatterySaverEnabled
       ActivatedDuringMainFrameNavigation
       PreloadingUnsupportedByWebContents
-      CrossSiteRedirectInMainFrameNavigation
-      CrossSiteNavigationInMainFrameNavigation
-      SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation
-      SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
@@ -10938,12 +10935,6 @@ experimental domain FedCm
       array of Account accounts
 
   command enable
-    parameters
-      # Allows callers to disable the promise rejection delay that would
-      # normally happen, if this is unimportant to what's being tested.
-      # (step 4 of https://fedidcg.github.io/FedCM/#browser-api-rp-sign-in)
-      optional boolean disableRejectionDelay
-
   command disable
 
   command selectAccount
```

## Roll protocol to r1119014 — _2023-03-18T04:27:47.000Z_
######  Diff: [`4e13b66...40d0eff`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4e13b66...40d0eff`)

```diff
@@ browser_protocol.pdl:1409 @@ experimental domain CSS
       optional StyleSheetId styleSheetId
       # Rule selector data.
       SelectorList selectorList
-      # Array of selectors from ancestor style rules, sorted by distance from the current rule.
-      experimental optional array of string nestingSelectors
       # Parent stylesheet's origin.
       StyleSheetOrigin origin
       # Associated style declaration.
```

## Roll protocol to r1116775 — _2023-03-14T04:28:31.000Z_
######  Diff: [`bc17667...4e13b66`](https://github.com/ChromeDevTools/devtools-protocol/compare/`bc17667...4e13b66`)

```diff
@@ browser_protocol.pdl:712 @@ experimental domain Audits
       SourceAndTriggerHeaders
       SourceIgnored
       TriggerIgnored
-      OsSourceIgnored
-      OsTriggerIgnored
-      InvalidRegisterOsSourceHeader
-      InvalidRegisterOsTriggerHeader
-      WebAndOsHeaders
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
@@ -10905,13 +10900,6 @@ experimental domain Preload
 
 # This domain allows interacting with the FedCM dialog.
 experimental domain FedCm
-  # Whether this is a sign-up or sign-in action for this account, i.e.
-  # whether this account has ever been used to sign in to this RP before.
-  type LoginState extends string
-    enum
-      SignIn
-      SignUp
-
   # Corresponds to IdentityRequestAccount
   type Account extends object
     properties
@@ -10921,25 +10909,10 @@ experimental domain FedCm
       string givenName
       string pictureUrl
       string idpConfigUrl
-      string idpSigninUrl
-      LoginState loginState
-      # These two are only set if the loginState is signUp
-      optional string termsOfServiceUrl
-      optional string privacyPolicyUrl
 
   event dialogShown
     parameters
-      string dialogId
       array of Account accounts
 
   command enable
   command disable
-
-  command selectAccount
-    parameters
-      string dialogId
-      integer accountIndex
-
-  command dismissDialog
-    parameters
-      string dialogId
```

## Roll protocol to r1115542 — _2023-03-10T04:29:00.000Z_
######  Diff: [`3b5916a...bc17667`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3b5916a...bc17667`)

```diff
@@ browser_protocol.pdl:10900 @@ experimental domain Preload
 
 # This domain allows interacting with the FedCM dialog.
 experimental domain FedCm
-  # Corresponds to IdentityRequestAccount
-  type Account extends object
-    properties
-      string accountId
-      string email
-      string name
-      string givenName
-      string pictureUrl
-      string idpConfigUrl
-
   event dialogShown
-    parameters
-      array of Account accounts
 
   command enable
   command disable
```

## Roll protocol to r1114954 — _2023-03-09T04:29:10.000Z_
######  Diff: [`1cd77ce...3b5916a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1cd77ce...3b5916a`)

```diff
@@ browser_protocol.pdl:10838 @@ experimental domain Preload
       CrossSiteRedirect
       CrossSiteNavigation
       SameSiteCrossOriginRedirect
+      SameSiteCrossOriginNavigation
       SameSiteCrossOriginRedirectNotOptIn
       SameSiteCrossOriginNavigationNotOptIn
       ActivationNavigationParameterMismatch
```

## Roll protocol to r1114386 — _2023-03-08T04:28:54.000Z_
######  Diff: [`e4e18e5...1cd77ce`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e4e18e5...1cd77ce`)

```diff
@@ browser_protocol.pdl:702 @@ experimental domain Audits
   type AttributionReportingIssueType extends string
     enum
       PermissionPolicyDisabled
+      PermissionPolicyNotDelegated
       UntrustworthyReportingOrigin
       InsecureContext
       # TODO(apaseltiner): Rename this to InvalidRegisterSourceHeader
```

## Roll protocol to r1113774 — _2023-03-07T04:29:03.000Z_
######  Diff: [`3ca05ae...e4e18e5`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3ca05ae...e4e18e5`)

```diff
@@ browser_protocol.pdl:10742 @@ experimental domain Preload
       # - https://github.com/WICG/nav-speculation/blob/main/triggers.md
       string sourceText
 
-  # The type of preloading attempted. It corresponds to
-  # mojom::SpeculationAction (although PrefetchWithSubresources is omitted as it
-  # isn't being used by clients).
-  type SpeculationAction extends string
-    enum
-      Prefetch
-      Prerender
-
-  # Corresponds to mojom::SpeculationTargetHint.
-  # See https://github.com/WICG/nav-speculation/blob/main/triggers.md#window-name-targeting-hints
-  type SpeculationTargetHint extends string
-    enum
-      Blank
-      Self
-
-  # A key that identifies a preloading attempt.
-  #
-  # The url used is the url specified by the trigger (i.e. the initial URL), and
-  # not the final url that is navigated to. For example, prerendering allows
-  # same-origin main frame navigations during the attempt, but the attempt is
-  # still keyed with the initial URL.
-  type PreloadingAttemptKey extends object
-    properties
-      Network.LoaderId loaderId
-      SpeculationAction action
-      string url
-      optional SpeculationTargetHint targetHint
-
-  # Lists sources for a preloading attempt, specifically the ids of rule sets
-  # that had a speculation rule that triggered the attempt, and the
-  # BackendNodeIds of <a href> or <area href> elements that triggered the
-  # attempt (in the case of attempts triggered by a document rule). It is
-  # possible for mulitple rule sets and links to trigger a single attempt.
-  type PreloadingAttemptSource extends object
-    properties
-      PreloadingAttemptKey key
-      array of RuleSetId ruleSetIds
-      array of DOM.BackendNodeId nodeIds
-
   command enable
 
   command disable
@@ -10895,11 +10856,6 @@ experimental domain Preload
       string prerenderingUrl
       PreloadingStatus status
 
-  # Send a list of sources for all preloading attempts.
-  event preloadingAttemptSourcesUpdated
-    parameters
-      array of PreloadingAttemptSource preloadingAttemptSources
-
 # This domain allows interacting with the FedCM dialog.
 experimental domain FedCm
   event dialogShown
```

## Roll protocol to r1113120 — _2023-03-04T04:28:32.000Z_
######  Diff: [`6aab256...3ca05ae`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6aab256...3ca05ae`)

```diff
@@ browser_protocol.pdl:8482 @@ domain Page
       # Tree structure of reasons why the page could not be cached for each frame.
       optional BackForwardCacheNotRestoredExplanationTree notRestoredExplanationsTree
 
+  # List of FinalStatus reasons for Prerender2.
+  type PrerenderFinalStatus extends string
+    enum
+      Activated
+      Destroyed
+      LowEndDevice
+      InvalidSchemeRedirect
+      InvalidSchemeNavigation
+      InProgressNavigation
+      NavigationRequestBlockedByCsp
+      MainFrameNavigation
+      MojoBinderPolicy
+      RendererProcessCrashed
+      RendererProcessKilled
+      Download
+      TriggerDestroyed
+      NavigationNotCommitted
+      NavigationBadHttpStatus
+      ClientCertRequested
+      NavigationRequestNetworkError
+      MaxNumOfRunningPrerendersExceeded
+      CancelAllHostsForTesting
+      DidFailLoad
+      Stop
+      SslCertificateError
+      LoginAuthRequested
+      UaChangeRequiresReload
+      BlockedByClient
+      AudioOutputDeviceRequested
+      MixedContent
+      TriggerBackgrounded
+      EmbedderTriggeredAndCrossOriginRedirected
+      MemoryLimitExceeded
+      # Prerenders can be cancelled when Chrome uses excessive memory. This is
+      # recorded when it fails to get the memory usage.
+      FailToGetMemoryUsage
+      DataSaverEnabled
+      HasEffectiveUrl
+      ActivatedBeforeStarted
+      InactivePageRestriction
+      StartFailed
+      TimeoutBackgrounded
+      CrossSiteRedirect
+      CrossSiteNavigation
+      SameSiteCrossOriginRedirect
+      SameSiteCrossOriginNavigation
+      SameSiteCrossOriginRedirectNotOptIn
+      SameSiteCrossOriginNavigationNotOptIn
+      ActivationNavigationParameterMismatch
+      ActivatedInBackground
+      EmbedderHostDisallowed
+      ActivationNavigationDestroyedBeforeSuccess
+      TabClosedByUserGesture
+      TabClosedWithoutUserGesture
+      PrimaryMainFrameRendererProcessCrashed
+      PrimaryMainFrameRendererProcessKilled
+      ActivationFramePolicyNotCompatible
+      PreloadingDisabled
+      BatterySaverEnabled
+      ActivatedDuringMainFrameNavigation
+      PreloadingUnsupportedByWebContents
+
+  # Fired when a prerender attempt is completed.
+  experimental event prerenderAttemptCompleted
+    parameters
+      # The frame id of the frame initiating prerendering.
+      FrameId initiatingFrameId
+      string prerenderingUrl
+      PrerenderFinalStatus finalStatus
+      # This is used to give users more information about the name of the API call
+      # that is incompatible with prerender and has caused the cancellation of the attempt
+      optional string disallowedApiMethod
+
+  # Preloading status values, see also PreloadingTriggeringOutcome. This
+  # status is shared by prefetchStatusUpdated and prerenderStatusUpdated.
+  type PreloadingStatus extends string
+    enum
+      Pending
+      Running
+      Ready
+      Success
+      Failure
+      # PreloadingTriggeringOutcome which not used by prefetch nor prerender.
+      NotSupported
+
+  # TODO(crbug/1384419): Create a dedicated domain for preloading.
+  # Fired when a prefetch attempt is updated.
+  experimental event prefetchStatusUpdated
+    parameters
+      # The frame id of the frame initiating prefetch.
+      FrameId initiatingFrameId
+      string prefetchUrl
+      PreloadingStatus status
+
+  # TODO(crbug/1384419): Create a dedicated domain for preloading.
+  # Fired when a prerender attempt is updated.
+  experimental event prerenderStatusUpdated
+    parameters
+      # The frame id of the frame initiating prerender.
+      FrameId initiatingFrameId
+      string prerenderingUrl
+      PreloadingStatus status
+
   event loadEventFired
     parameters
       Network.MonotonicTime timestamp
@@ -10755,107 +10858,6 @@ experimental domain Preload
     parameters
       RuleSetId id
 
-  # List of FinalStatus reasons for Prerender2.
-  type PrerenderFinalStatus extends string
-    enum
-      Activated
-      Destroyed
-      LowEndDevice
-      InvalidSchemeRedirect
-      InvalidSchemeNavigation
-      InProgressNavigation
-      NavigationRequestBlockedByCsp
-      MainFrameNavigation
-      MojoBinderPolicy
-      RendererProcessCrashed
-      RendererProcessKilled
-      Download
-      TriggerDestroyed
-      NavigationNotCommitted
-      NavigationBadHttpStatus
-      ClientCertRequested
-      NavigationRequestNetworkError
-      MaxNumOfRunningPrerendersExceeded
-      CancelAllHostsForTesting
-      DidFailLoad
-      Stop
-      SslCertificateError
-      LoginAuthRequested
-      UaChangeRequiresReload
-      BlockedByClient
-      AudioOutputDeviceRequested
-      MixedContent
-      TriggerBackgrounded
-      EmbedderTriggeredAndCrossOriginRedirected
-      MemoryLimitExceeded
-      # Prerenders can be cancelled when Chrome uses excessive memory. This is
-      # recorded when it fails to get the memory usage.
-      FailToGetMemoryUsage
-      DataSaverEnabled
-      HasEffectiveUrl
-      ActivatedBeforeStarted
-      InactivePageRestriction
-      StartFailed
-      TimeoutBackgrounded
-      CrossSiteRedirect
-      CrossSiteNavigation
-      SameSiteCrossOriginRedirect
-      SameSiteCrossOriginNavigation
-      SameSiteCrossOriginRedirectNotOptIn
-      SameSiteCrossOriginNavigationNotOptIn
-      ActivationNavigationParameterMismatch
-      ActivatedInBackground
-      EmbedderHostDisallowed
-      ActivationNavigationDestroyedBeforeSuccess
-      TabClosedByUserGesture
-      TabClosedWithoutUserGesture
-      PrimaryMainFrameRendererProcessCrashed
-      PrimaryMainFrameRendererProcessKilled
-      ActivationFramePolicyNotCompatible
-      PreloadingDisabled
-      BatterySaverEnabled
-      ActivatedDuringMainFrameNavigation
-      PreloadingUnsupportedByWebContents
-
-  # Fired when a prerender attempt is completed.
-  event prerenderAttemptCompleted
-    parameters
-      # The frame id of the frame initiating prerendering.
-      Page.FrameId initiatingFrameId
-      string prerenderingUrl
-      PrerenderFinalStatus finalStatus
-      # This is used to give users more information about the name of the API call
-      # that is incompatible with prerender and has caused the cancellation of the attempt
-      optional string disallowedApiMethod
-
-  # Preloading status values, see also PreloadingTriggeringOutcome. This
-  # status is shared by prefetchStatusUpdated and prerenderStatusUpdated.
-  type PreloadingStatus extends string
-    enum
-      Pending
-      Running
-      Ready
-      Success
-      Failure
-      # PreloadingTriggeringOutcome which not used by prefetch nor prerender.
-      NotSupported
-
-  # Fired when a prefetch attempt is updated.
-  event prefetchStatusUpdated
-    parameters
-      # The frame id of the frame initiating prefetch.
-      Page.FrameId initiatingFrameId
-      string prefetchUrl
-      PreloadingStatus status
-
-  # Fired when a prerender attempt is updated.
-  event prerenderStatusUpdated
-    parameters
-      # The frame id of the frame initiating prerender.
-      Page.FrameId initiatingFrameId
-      string prerenderingUrl
-      PreloadingStatus status
-
 # This domain allows interacting with the FedCM dialog.
 experimental domain FedCm
   event dialogShown
```

## Roll protocol to r1112051 — _2023-03-02T04:29:08.000Z_
######  Diff: [`b7cc171...6aab256`](https://github.com/ChromeDevTools/devtools-protocol/compare/`b7cc171...6aab256`)

```diff
@@ browser_protocol.pdl:10857 @@ experimental domain Preload
   event ruleSetRemoved
     parameters
       RuleSetId id
-
-# This domain allows interacting with the FedCM dialog.
-experimental domain FedCm
-  event dialogShown
-
-  command enable
-  command disable
```

## Roll protocol to r1111422 — _2023-03-01T04:29:07.000Z_
######  Diff: [`41a0227...b7cc171`](https://github.com/ChromeDevTools/devtools-protocol/compare/`41a0227...b7cc171`)

```diff
@@ browser_protocol.pdl:752 @@ experimental domain Audits
       FormInputAssignedAutocompleteValueToIdOrNameAttributeError
       FormLabelHasNeitherForNorNestedInput
       FormLabelForMatchesNonExistingIdError
+      FormHasPasswordFieldWithoutUsernameFieldError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1109433 — _2023-02-24T04:29:05.000Z_
######  Diff: [`8e5df71...41a0227`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8e5df71...41a0227`)

```diff
@@ browser_protocol.pdl:752 @@ experimental domain Audits
       FormInputAssignedAutocompleteValueToIdOrNameAttributeError
       FormLabelHasNeitherForNorNestedInput
       FormLabelForMatchesNonExistingIdError
-      FormHasPasswordFieldWithoutUsernameFieldError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1107588 — _2023-02-21T04:28:49.000Z_
######  Diff: [`30ceb43...8e5df71`](https://github.com/ChromeDevTools/devtools-protocol/compare/`30ceb43...8e5df71`)

```diff
@@ browser_protocol.pdl:8555 @@ domain Page
       # that is incompatible with prerender and has caused the cancellation of the attempt
       optional string disallowedApiMethod
 
-  # Preloading status values, see also PreloadingTriggeringOutcome. This
-  # status is shared by prefetchStatusUpdated and prerenderStatusUpdated.
-  type PreloadingStatus extends string
+  # List of Prefetch status, which refers to PreloadingTriggeringOutcome.
+  type PrefetchStatus extends string
     enum
-      Pending
       Running
       Ready
       Success
       Failure
-      # PreloadingTriggeringOutcome which not used by prefetch nor prerender.
+      # PreloadingTriggeringOutcome which not used by prefetch.
       NotSupported
 
   # TODO(crbug/1384419): Create a dedicated domain for preloading.
@@ -8574,16 +8572,7 @@ domain Page
       # The frame id of the frame initiating prefetch.
       FrameId initiatingFrameId
       string prefetchUrl
-      PreloadingStatus status
-
-  # TODO(crbug/1384419): Create a dedicated domain for preloading.
-  # Fired when a prerender attempt is updated.
-  experimental event prerenderStatusUpdated
-    parameters
-      # The frame id of the frame initiating prerender.
-      FrameId initiatingFrameId
-      string prerenderingUrl
-      PreloadingStatus status
+      PrefetchStatus status
 
   event loadEventFired
     parameters
```

## Roll protocol to r1105486 — _2023-02-15T04:28:51.000Z_
######  Diff: [`97f8fcb...30ceb43`](https://github.com/ChromeDevTools/devtools-protocol/compare/`97f8fcb...30ceb43`)

```diff
@@ browser_protocol.pdl:10814 @@ experimental domain DeviceAccess
     parameters
       RequestId id
       array of PromptDevice devices
-
-experimental domain Preload
-  # Unique id
-  type RuleSetId extends string
-
-  # Corresponds to SpeculationRuleSet
-  type RuleSet extends object
-    properties
-      RuleSetId id
-      # Identifies a document which the rule set is associated with.
-      Network.LoaderId loaderId
-      # Source text of JSON representing the rule set. If it comes from
-      # <script> tag, it is the textContent of the node. Note that it is
-      # a JSON for valid case.
-      #
-      # See also:
-      # - https://wicg.github.io/nav-speculation/speculation-rules.html
-      # - https://github.com/WICG/nav-speculation/blob/main/triggers.md
-      string sourceText
-
-  command enable
-
-  command disable
-
-  # Upsert. Currently, it is only emitted when a rule set added.
-  event ruleSetUpdated
-    parameters
-      RuleSet ruleSet
-
-  event ruleSetRemoved
-    parameters
-      RuleSetId id
```

## Roll protocol to r1103684 — _2023-02-10T04:28:55.000Z_
######  Diff: [`8cf7384...97f8fcb`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8cf7384...97f8fcb`)

```diff
@@ browser_protocol.pdl:8555 @@ domain Page
       # that is incompatible with prerender and has caused the cancellation of the attempt
       optional string disallowedApiMethod
 
-  # List of Prefetch status, which refers to PreloadingTriggeringOutcome.
-  type PrefetchStatus extends string
-    enum
-      Running
-      Ready
-      Success
-      Failure
-      # PreloadingTriggeringOutcome which not used by prefetch.
-      NotSupported
-
-  # TODO(crbug/1384419): Create a dedicated domain for preloading.
-  # Fired when a prefetch attempt is updated.
-  experimental event prefetchStatusUpdated
-    parameters
-      # The frame id of the frame initiating prefetch.
-      FrameId initiatingFrameId
-      string prefetchUrl
-      PrefetchStatus status
-
   event loadEventFired
     parameters
       Network.MonotonicTime timestamp
@@ -10776,41 +10757,3 @@ experimental domain Media
 
   # Disables the Media domain.
   command disable
-
-experimental domain DeviceAccess
-  # Device request id.
-  type RequestId extends string
-
-  # A device id.
-  type DeviceId extends string
-
-  # Device information displayed in a user prompt to select a device.
-  type PromptDevice extends object
-    properties
-      DeviceId id
-      # Display name as it appears in a device request user prompt.
-      string name
-
-  # Enable events in this domain.
-  command enable
-
-  # Disable events in this domain.
-  command disable
-
-  # Select a device in response to a DeviceAccess.deviceRequestPrompted event.
-  command selectPrompt
-    parameters
-      RequestId id
-      DeviceId deviceId
-
-  # Cancel a prompt in response to a DeviceAccess.deviceRequestPrompted event.
-  command cancelPrompt
-    parameters
-      RequestId id
-
-  # A device request opened a user prompt to select a device. Respond with the
-  # selectPrompt or cancelPrompt command.
-  event deviceRequestPrompted
-    parameters
-      RequestId id
-      array of PromptDevice devices
```

## Roll protocol to r1103117 — _2023-02-09T04:28:18.000Z_
######  Diff: [`db5327b...8cf7384`](https://github.com/ChromeDevTools/devtools-protocol/compare/`db5327b...8cf7384`)

```diff
@@ browser_protocol.pdl:203 @@ experimental domain Accessibility
       optional DOM.BackendNodeId backendNodeId
       # JavaScript object id of the node wrapper to get the partial accessibility tree for.
       optional Runtime.RemoteObjectId objectId
-      # Whether to fetch this node's ancestors, siblings and children. Defaults to true.
+      # Whether to fetch this nodes ancestors, siblings and children. Defaults to true.
       optional boolean fetchRelatives
     returns
       # The `Accessibility.AXNode` for this DOM node, if it exists, plus its ancestors, siblings and
@@ -761,14 +761,73 @@ experimental domain Audits
       optional Page.FrameId frameId
       optional DOM.BackendNodeId violatingNodeId
 
+  type DeprecationIssueType extends string
+    enum
+      AuthorizationCoveredByWildcard
+      CanRequestURLHTTPContainingNewline
+      ChromeLoadTimesConnectionInfo
+      ChromeLoadTimesFirstPaintAfterLoadTime
+      ChromeLoadTimesWasAlternateProtocolAvailable
+      CookieWithTruncatingChar
+      CrossOriginAccessBasedOnDocumentDomain
+      CrossOriginWindowAlert
+      CrossOriginWindowConfirm
+      CSSSelectorInternalMediaControlsOverlayCastButton
+      DeprecationExample
+      DocumentDomainSettingWithoutOriginAgentClusterHeader
+      EventPath
+      ExpectCTHeader
+      GeolocationInsecureOrigin
+      GeolocationInsecureOriginDeprecatedNotRemoved
+      GetUserMediaInsecureOrigin
+      HostCandidateAttributeGetter
+      IdentityInCanMakePaymentEvent
+      InsecurePrivateNetworkSubresourceRequest
+      LocalCSSFileExtensionRejected
+      MediaSourceAbortRemove
+      MediaSourceDurationTruncatingBuffered
+      NoSysexWebMIDIWithoutPermission
+      NotificationInsecureOrigin
+      NotificationPermissionRequestedIframe
+      ObsoleteCreateImageBitmapImageOrientationNone
+      ObsoleteWebRtcCipherSuite
+      OpenWebDatabaseInsecureContext
+      OverflowVisibleOnReplacedElement
+      PaymentInstruments
+      PaymentRequestCSPViolation
+      PersistentQuotaType
+      PictureSourceSrc
+      PrefixedCancelAnimationFrame
+      PrefixedRequestAnimationFrame
+      PrefixedStorageInfo
+      PrefixedVideoDisplayingFullscreen
+      PrefixedVideoEnterFullscreen
+      PrefixedVideoEnterFullScreen
+      PrefixedVideoExitFullscreen
+      PrefixedVideoExitFullScreen
+      PrefixedVideoSupportsFullscreen
+      PrivacySandboxExtensionsAPI
+      RangeExpand
+      RequestedSubresourceWithEmbeddedCredentials
+      RTCConstraintEnableDtlsSrtpFalse
+      RTCConstraintEnableDtlsSrtpTrue
+      RTCPeerConnectionComplexPlanBSdpUsingDefaultSdpSemantics
+      RTCPeerConnectionSdpSemanticsPlanB
+      RtcpMuxPolicyNegotiate
+      SharedArrayBufferConstructedWithoutIsolation
+      TextToSpeech_DisallowedByAutoplay
+      V8SharedArrayBufferConstructedInExtensionWithoutIsolation
+      XHRJSONEncodingDetection
+      XMLHttpRequestSynchronousInNonWorkerOutsideBeforeUnload
+      XRSupportsSession
+
   # This issue tracks information needed to print a deprecation message.
   # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/third_party/blink/renderer/core/frame/deprecation/README.md
   type DeprecationIssueDetails extends object
     properties
       optional AffectedFrame affectedFrame
       SourceCodeLocation sourceCodeLocation
-      # One of the deprecation names from third_party/blink/renderer/core/frame/deprecation/deprecation.json5
-      string type
+      DeprecationIssueType type
 
   type ClientHintIssueReason extends string
     enum
@@ -1843,7 +1902,7 @@ experimental domain CSS
   # Polls the next batch of computed style updates.
   experimental command takeComputedStyleUpdates
     returns
-      # The list of node Ids that have their tracked computed styles updated.
+      # The list of node Ids that have their tracked computed styles updated
       array of DOM.NodeId nodeIds
 
   # Find a rule with the given active property for the given node and set the new value for this
@@ -1936,13 +1995,13 @@ experimental domain CSS
   command startRuleUsageTracking
 
   # Stop tracking rule usage and return the list of rules that were used since last call to
-  # `takeCoverageDelta` (or since start of coverage instrumentation).
+  # `takeCoverageDelta` (or since start of coverage instrumentation)
   command stopRuleUsageTracking
     returns
       array of RuleUsage ruleUsage
 
   # Obtain list of rules that became used since last call to this method (or since start of coverage
-  # instrumentation).
+  # instrumentation)
   command takeCoverageDelta
     returns
       array of RuleUsage coverage
@@ -1956,7 +2015,7 @@ experimental domain CSS
       boolean enabled
 
   # Fires whenever a web font is updated.  A non-empty font parameter indicates a successfully loaded
-  # web font.
+  # web font
   event fontsUpdated
     parameters
       # The web font that has loaded.
@@ -3751,13 +3810,11 @@ domain Emulation
   # Emulates the given vision deficiency.
   experimental command setEmulatedVisionDeficiency
     parameters
-      # Vision deficiency to emulate. Order: best-effort emulations come first, followed by any
-      # physiologically accurate emulations for medically recognized color vision deficiencies.
+      # Vision deficiency to emulate.
       enum type
         none
-        blurredVision
-        reducedContrast
         achromatopsia
+        blurredVision
         deuteranopia
         protanopia
         tritanopia
@@ -4139,7 +4196,7 @@ experimental domain IndexedDB
       # If true, there are more entries to fetch in the given range.
       boolean hasMore
 
-  # Gets metadata of an object store.
+  # Gets metadata of an object store
   command getMetadata
     parameters
       # At least and at most one of securityOrigin, storageKey must be specified.
@@ -9314,15 +9371,6 @@ experimental domain Storage
     returns
       array of TrustTokens tokens
 
-  # Removes all Trust Tokens issued by the provided issuerOrigin.
-  # Leaves other stored data, including the issuer's Redemption Records, intact.
-  experimental command clearTrustTokens
-    parameters
-      string issuerOrigin
-    returns
-      # True if any tokens were deleted, false otherwise.
-      boolean didDeleteTokens
-
   # Gets details for a named interest group.
   experimental command getInterestGroupDetails
     parameters
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index 6285d9b..d4102f5 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -511,7 +511,6 @@ domain Debugger
         CompileError
         BlockedByActiveGenerator
         BlockedByActiveFunction
-        BlockedByTopLevelEsModuleChange
       # Exception details if any. Only present when `status` is `CompileError`.
       optional Runtime.ExceptionDetails exceptionDetails
```

## Roll protocol to r1102555 — _2023-02-08T04:29:03.000Z_
######  Diff: [`e088ea1...db5327b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e088ea1...db5327b`)

```diff
@@ browser_protocol.pdl:2556 @@ domain DOM
       array of Quad quads
 
   # Returns the root DOM node (and optionally the subtree) to the caller.
-  # Implicitly enables the DOM domain events for the current target.
   command getDocument
     parameters
       # The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the
```

## Roll protocol to r1101985 — _2023-02-07T04:28:15.000Z_
######  Diff: [`81bd251...e088ea1`](https://github.com/ChromeDevTools/devtools-protocol/compare/`81bd251...e088ea1`)

```diff
@@ browser_protocol.pdl:7735 @@ domain Page
     returns
       array of InstallabilityError installabilityErrors
 
-  # Deprecated because it's not guaranteed that the returned icon is in fact the one used for PWA installation.
-  experimental deprecated command getManifestIcons
+  experimental command getManifestIcons
     returns
       optional binary primaryIcon
 
@@ -8150,25 +8149,24 @@ domain Page
   # Clears seeded compilation cache.
   experimental command clearCompilationCache
 
-  # Enum of possible auto-reponse for permisison / prompt dialogs.
-  experimental type AutoResponseMode extends string
-    enum
-      none
-      autoAccept
-      autoReject
-      autoOptOut
-
-# Sets the Secure Payment Confirmation transaction mode.
+  # Sets the Secure Payment Confirmation transaction mode.
   # https://w3c.github.io/secure-payment-confirmation/#sctn-automation-set-spc-transaction-mode
   experimental command setSPCTransactionMode
     parameters
-      AutoResponseMode mode
+      enum mode
+        none
+        autoAccept
+        autoReject
+        autoOptOut
 
   # Extensions for Custom Handlers API:
   # https://html.spec.whatwg.org/multipage/system-state.html#rph-automation
   experimental command setRPHRegistrationMode
     parameters
-      AutoResponseMode mode
+      enum mode
+        none
+        autoaccept
+        autoreject
 
   # Generates a report for testing.
   experimental command generateTestReport
```

## Roll protocol to r1101329 — _2023-02-04T04:27:44.000Z_
######  Diff: [`5d7fa4e...81bd251`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5d7fa4e...81bd251`)

```diff
@@ browser_protocol.pdl:8159 @@ domain Page
         autoReject
         autoOptOut
 
-  # Extensions for Custom Handlers API:
-  # https://html.spec.whatwg.org/multipage/system-state.html#rph-automation
-  experimental command setRPHRegistrationMode
-    parameters
-      enum mode
-        none
-        autoaccept
-        autoreject
-
   # Generates a report for testing.
   experimental command generateTestReport
     parameters
@@ -8596,7 +8587,6 @@ domain Page
       PreloadingDisabled
       BatterySaverEnabled
       ActivatedDuringMainFrameNavigation
-      PreloadingUnsupportedByWebContents
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1100832 — _2023-02-03T04:28:21.000Z_
######  Diff: [`41637d7...5d7fa4e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`41637d7...5d7fa4e`)

```diff
@@ browser_protocol.pdl:751 @@ experimental domain Audits
       FormAriaLabelledByToNonExistingId
       FormInputAssignedAutocompleteValueToIdOrNameAttributeError
       FormLabelHasNeitherForNorNestedInput
-      FormLabelForMatchesNonExistingIdError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1100268 — _2023-02-02T04:28:14.000Z_
######  Diff: [`01899e6...41637d7`](https://github.com/ChromeDevTools/devtools-protocol/compare/`01899e6...41637d7`)

```diff
@@ browser_protocol.pdl:750 @@ experimental domain Audits
       FormEmptyIdAndNameAttributesForInputError
       FormAriaLabelledByToNonExistingId
       FormInputAssignedAutocompleteValueToIdOrNameAttributeError
-      FormLabelHasNeitherForNorNestedInput
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
@@ -9357,6 +9356,15 @@ experimental domain Storage
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
   # Gets details for a named interest group.
   experimental command getInterestGroupDetails
     parameters
```

## Roll protocol to r1099658 — _2023-02-01T04:28:12.000Z_
######  Diff: [`2a08589...01899e6`](https://github.com/ChromeDevTools/devtools-protocol/compare/`2a08589...01899e6`)

```diff
@@ browser_protocol.pdl:8584 @@ domain Page
       ActivationFramePolicyNotCompatible
       PreloadingDisabled
       BatterySaverEnabled
-      ActivatedDuringMainFrameNavigation
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1099089 — _2023-01-31T04:27:53.000Z_
######  Diff: [`58bc3b6...2a08589`](https://github.com/ChromeDevTools/devtools-protocol/compare/`58bc3b6...2a08589`)

```diff
@@ browser_protocol.pdl:749 @@ experimental domain Audits
       FormAutocompleteAttributeEmptyError
       FormEmptyIdAndNameAttributesForInputError
       FormAriaLabelledByToNonExistingId
-      FormInputAssignedAutocompleteValueToIdOrNameAttributeError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1098258 — _2023-01-28T04:27:44.000Z_
######  Diff: [`a73bac7...58bc3b6`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a73bac7...58bc3b6`)

```diff
@@ browser_protocol.pdl:748 @@ experimental domain Audits
       FormInputWithNoLabelError
       FormAutocompleteAttributeEmptyError
       FormEmptyIdAndNameAttributesForInputError
-      FormAriaLabelledByToNonExistingId
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1097787 — _2023-01-27T04:28:00.000Z_
######  Diff: [`c72fa9e...a73bac7`](https://github.com/ChromeDevTools/devtools-protocol/compare/`c72fa9e...a73bac7`)

```diff
@@ browser_protocol.pdl:802 @@ experimental domain Audits
       PrefixedVideoExitFullscreen
       PrefixedVideoExitFullScreen
       PrefixedVideoSupportsFullscreen
-      PrivacySandboxExtensionsAPI
       RangeExpand
       RequestedSubresourceWithEmbeddedCredentials
       RTCConstraintEnableDtlsSrtpFalse
@@ -6402,11 +6401,6 @@ domain Network
       # Raw response header text as it was received over the wire. The raw text may not always be
       # available, such as in the case of HTTP/2 or QUIC.
       optional string headersText
-      # The cookie partition key that will be used to store partitioned cookies set in this response.
-      # Only sent when partitioned cookies are enabled.
-      optional string cookiePartitionKey
-      # True if partitioned cookies are enabled, but the partition key is not serializeable to string.
-      optional boolean cookiePartitionKeyOpaque
 
   # Fired exactly once for each Trust Token operation. Depending on
   # the type of the operation and whether the operation succeeded or
@@ -8580,8 +8574,6 @@ domain Page
       PrimaryMainFrameRendererProcessCrashed
       PrimaryMainFrameRendererProcessKilled
       ActivationFramePolicyNotCompatible
-      PreloadingDisabled
-      BatterySaverEnabled
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1097235 — _2023-01-26T04:28:05.000Z_
######  Diff: [`5caaeb9...c72fa9e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5caaeb9...c72fa9e`)

```diff
@@ browser_protocol.pdl:747 @@ experimental domain Audits
       FormDuplicateIdForInputError
       FormInputWithNoLabelError
       FormAutocompleteAttributeEmptyError
-      FormEmptyIdAndNameAttributesForInputError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1096618 — _2023-01-25T04:27:58.000Z_
######  Diff: [`23801b1...5caaeb9`](https://github.com/ChromeDevTools/devtools-protocol/compare/`23801b1...5caaeb9`)

```diff
@@ browser_protocol.pdl:746 @@ experimental domain Audits
       FormLabelForNameError
       FormDuplicateIdForInputError
       FormInputWithNoLabelError
-      FormAutocompleteAttributeEmptyError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1096014 — _2023-01-24T04:28:10.000Z_
######  Diff: [`9b03384...23801b1`](https://github.com/ChromeDevTools/devtools-protocol/compare/`9b03384...23801b1`)

```diff
@@ browser_protocol.pdl:1273 @@ domain Browser
       # substring in their name are extracted. An empty or absent query returns
       # all histograms.
       optional string query
-      # If true, retrieve delta since last delta call.
+      # If true, retrieve delta since last call.
       optional boolean delta
 
     returns
@@ -1285,7 +1285,7 @@ domain Browser
     parameters
       # Requested histogram name.
       string name
-      # If true, retrieve delta since last delta call.
+      # If true, retrieve delta since last call.
       optional boolean delta
     returns
       # Histogram.
```

## Roll protocol to r1094867 — _2023-01-20T04:28:35.000Z_
######  Diff: [`6b557d0...9b03384`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6b557d0...9b03384`)

```diff
@@ browser_protocol.pdl:5271 @@ domain Network
   # are specified in third_party/blink/renderer/core/fetch/trust_token.idl.
   experimental type TrustTokenParams extends object
     properties
-      TrustTokenOperationType operation
+      TrustTokenOperationType type
 
-      # Only set for "token-redemption" operation and determine whether
+      # Only set for "token-redemption" type and determine whether
       # to request a fresh SRR or use a still valid cached SRR.
       enum refreshPolicy
         UseCached
```

## Roll protocol to r1094278 — _2023-01-19T04:28:56.000Z_
######  Diff: [`370c224...6b557d0`](https://github.com/ChromeDevTools/devtools-protocol/compare/`370c224...6b557d0`)

```diff
@@ browser_protocol.pdl:8569 @@ domain Page
       ActivationNavigationDestroyedBeforeSuccess
       TabClosedByUserGesture
       TabClosedWithoutUserGesture
-      PrimaryMainFrameRendererProcessCrashed
-      PrimaryMainFrameRendererProcessKilled
-      ActivationFramePolicyNotCompatible
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1093722 — _2023-01-18T04:28:24.000Z_
######  Diff: [`c03647c...370c224`](https://github.com/ChromeDevTools/devtools-protocol/compare/`c03647c...370c224`)

```diff
@@ browser_protocol.pdl:783 @@ experimental domain Audits
       NoSysexWebMIDIWithoutPermission
       NotificationInsecureOrigin
       NotificationPermissionRequestedIframe
-      ObsoleteCreateImageBitmapImageOrientationNone
       ObsoleteWebRtcCipherSuite
       OpenWebDatabaseInsecureContext
       OverflowVisibleOnReplacedElement
@@ -3682,9 +3681,7 @@ domain Emulation
   # Missing optional values will be filled in by the target with what it would normally use.
   experimental type UserAgentMetadata extends object
     properties
-      # Brands appearing in Sec-CH-UA.
       optional array of UserAgentBrandVersion brands
-      # Brands appearing in Sec-CH-UA-Full-Version-List.
       optional array of UserAgentBrandVersion fullVersionList
       deprecated optional string fullVersion
       string platform
@@ -10553,10 +10550,6 @@ experimental domain WebAuthn
       # https://fidoalliance.org/specs/fido-v2.1-ps-20210615/fido-client-to-authenticator-protocol-v2.1-ps-20210615.html#sctn-minpinlength-extension
       # Defaults to false.
       optional boolean hasMinPinLength
-      # If set to true, the authenticator will support the prf extension.
-      # https://w3c.github.io/webauthn/#prf-extension
-      # Defaults to false.
-      optional boolean hasPrf
       # If set to true, tests of user presence will succeed immediately.
       # Otherwise, they will not be resolved. Defaults to true.
       optional boolean automaticPresenceSimulation
```

## Roll protocol to r1092731 — _2023-01-14T04:27:49.000Z_
######  Diff: [`a9c500f...c03647c`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a9c500f...c03647c`)

```diff
@@ browser_protocol.pdl:745 @@ experimental domain Audits
       CrossOriginPortalPostMessageError
       FormLabelForNameError
       FormDuplicateIdForInputError
-      FormInputWithNoLabelError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1092232 — _2023-01-13T04:28:35.000Z_
######  Diff: [`aef3081...a9c500f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`aef3081...a9c500f`)

```diff
@@ browser_protocol.pdl:744 @@ experimental domain Audits
     enum
       CrossOriginPortalPostMessageError
       FormLabelForNameError
-      FormDuplicateIdForInputError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
@@ -7237,8 +7236,6 @@ domain Page
       usb
       vertical-scroll
       web-share
-      # Alias for 'window-placement' (crbug.com/1328581).
-      window-management
       window-placement
       xr-spatial-tracking
```

## Roll protocol to r1090008 — _2023-01-07T04:27:59.000Z_
######  Diff: [`e97a9e4...aef3081`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e97a9e4...aef3081`)

```diff
@@ browser_protocol.pdl:843 @@ experimental domain Audits
       WellKnownHttpNotFound
       WellKnownNoResponse
       WellKnownInvalidResponse
-      WellKnownListEmpty
       ConfigNotInWellKnown
       WellKnownTooBig
       ConfigHttpNotFound
@@ -858,7 +857,6 @@ experimental domain Audits
       AccountsHttpNotFound
       AccountsNoResponse
       AccountsInvalidResponse
-      AccountsListEmpty
       IdTokenHttpNotFound
       IdTokenNoResponse
       IdTokenInvalidResponse
```

## Roll protocol to r1089613 — _2023-01-06T04:28:04.000Z_
######  Diff: [`6eb86f8...e97a9e4`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6eb86f8...e97a9e4`)

```diff
@@ js_protocol.pdl:1741 @@ domain Runtime
   event executionContextDestroyed
     parameters
       # Id of the destroyed context
-      deprecated ExecutionContextId executionContextId
-      # Unique Id of the destroyed context
-      experimental string executionContextUniqueId
+      ExecutionContextId executionContextId
 
   # Issued when all executionContexts were cleared in browser
   event executionContextsCleared
```

## Roll protocol to r1089107 — _2023-01-05T04:28:22.000Z_
######  Diff: [`253af7d...6eb86f8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`253af7d...6eb86f8`)

```diff
@@ browser_protocol.pdl:7218 @@ domain Page
       otp-credentials
       payment
       picture-in-picture
-      private-aggregation
       publickey-credentials-get
       run-ad-auction
       screen-wake-lock
       serial
       shared-autofill
       shared-storage
-      shared-storage-select-url
       smart-card
       storage-access
       sync-xhr
```

## Roll protocol to r1088570 — _2023-01-04T04:27:47.000Z_
######  Diff: [`0400c45...253af7d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`0400c45...253af7d`)

```diff
@@ browser_protocol.pdl:1092 @@ domain Browser
       protectedMediaIdentifier
       sensors
       storageAccess
-      topLevelStorageAccess
       videoCapture
       videoCapturePanTiltZoom
       wakeLockScreen
```

## Roll protocol to r1087818 — _2022-12-31T04:27:46.000Z_
######  Diff: [`47facb7...0400c45`](https://github.com/ChromeDevTools/devtools-protocol/compare/`47facb7...0400c45`)

```diff
@@ browser_protocol.pdl:8555 @@ domain Page
       ActivatedInBackground
       EmbedderHostDisallowed
       ActivationNavigationDestroyedBeforeSuccess
-      TabClosedByUserGesture
-      TabClosedWithoutUserGesture
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1087713 — _2022-12-30T04:27:43.000Z_
######  Diff: [`1e60c0d...47facb7`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1e60c0d...47facb7`)

```diff
@@ browser_protocol.pdl:5867 @@ domain Network
 
   # Returns all browser cookies. Depending on the backend support, will return detailed cookie
   # information in the `cookies` field.
-  # Deprecated. Use Storage.getCookies instead.
-  deprecated command getAllCookies
+  command getAllCookies
     returns
       # Array of cookie objects.
       array of Cookie cookies
```

## Roll protocol to r1087487 — _2022-12-29T04:28:09.000Z_
######  Diff: [`56c97c0...1e60c0d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`56c97c0...1e60c0d`)

```diff
@@ js_protocol.pdl:1402 @@ domain Runtime
       optional string objectGroup
       # Whether to throw an exception if side effect cannot be ruled out during evaluation.
       experimental optional boolean throwOnSideEffect
-      # An alternative way to specify the execution context to call function on.
-      # Compared to contextId that may be reused across processes, this is guaranteed to be
-      # system-unique, so it can be used to prevent accidental function call
-      # in context different than intended (e.g. as a result of navigation across process
-      # boundaries).
-      # This is mutually exclusive with `executionContextId`.
-      experimental optional string uniqueContextId
       # Whether the result should contain `webDriverValue`, serialized according to
       # https://w3c.github.io/webdriver-bidi. This is mutually exclusive with `returnByValue`, but
       # resulting `objectId` is still provided.
```

## Roll protocol to r1085790 — _2022-12-21T04:28:10.000Z_
######  Diff: [`9e8e363...56c97c0`](https://github.com/ChromeDevTools/devtools-protocol/compare/`9e8e363...56c97c0`)

```diff
@@ browser_protocol.pdl:8553 @@ domain Page
       ActivationNavigationParameterMismatch
       ActivatedInBackground
       EmbedderHostDisallowed
-      ActivationNavigationDestroyedBeforeSuccess
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1085283 — _2022-12-20T04:28:00.000Z_
######  Diff: [`1ff2246...9e8e363`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1ff2246...9e8e363`)

```diff
@@ browser_protocol.pdl:9381 @@ experimental domain Storage
     parameters
       string ownerOrigin
 
-  # Resets the budget for `ownerOrigin` by clearing all budget withdrawals.
-  experimental command resetSharedStorageBudget
-    parameters
-      string ownerOrigin
-
   # Enables/disables issuing of sharedStorageAccessed events.
   experimental command setSharedStorageTracking
     parameters
```

## Roll protocol to r1084670 — _2022-12-17T04:27:45.000Z_
######  Diff: [`8b04aee...1ff2246`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8b04aee...1ff2246`)

```diff
@@ browser_protocol.pdl:9723 @@ domain Target
       # Whether to create the target in background or foreground (chrome-only,
       # false by default).
       optional boolean background
-      # Whether to create the target of type "tab".
-      experimental optional boolean forTab
     returns
       # The id of the page opened.
       TargetID targetId
```

## Roll protocol to r1084174 — _2022-12-16T04:27:47.000Z_
######  Diff: [`1e921af...8b04aee`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1e921af...8b04aee`)

```diff
@@ browser_protocol.pdl:743 @@ experimental domain Audits
   type GenericIssueErrorType extends string
     enum
       CrossOriginPortalPostMessageError
-      FormLabelForNameError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
@@ -751,7 +750,6 @@ experimental domain Audits
       # Issues with the same errorType are aggregated in the frontend.
       GenericIssueErrorType errorType
       optional Page.FrameId frameId
-      optional DOM.BackendNodeId violatingNodeId
 
   type DeprecationIssueType extends string
     enum
@@ -6408,7 +6406,6 @@ domain Network
         ResourceExhausted
         AlreadyExists
         Unavailable
-        Unauthorized
         BadResponse
         InternalError
         UnknownError
@@ -8426,7 +8423,6 @@ domain Page
       InjectedJavascript
       InjectedStyleSheet
       KeepaliveRequest
-      IndexedDBEvent
       Dummy
       AuthorizationHeader
       # Disabled for RenderFrameHost reasons
```

## Roll protocol to r1082910 — _2022-12-14T04:29:01.000Z_
######  Diff: [`5428889...1e921af`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5428889...1e921af`)

```diff
@@ browser_protocol.pdl:8548 @@ domain Page
       SameSiteCrossOriginNavigationNotOptIn
       ActivationNavigationParameterMismatch
       ActivatedInBackground
-      EmbedderHostDisallowed
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1082281 — _2022-12-13T04:28:57.000Z_
######  Diff: [`178dea5...5428889`](https://github.com/ChromeDevTools/devtools-protocol/compare/`178dea5...5428889`)

```diff
@@ browser_protocol.pdl:8547 @@ domain Page
       SameSiteCrossOriginRedirectNotOptIn
       SameSiteCrossOriginNavigationNotOptIn
       ActivationNavigationParameterMismatch
-      ActivatedInBackground
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1081726 — _2022-12-10T04:28:45.000Z_
######  Diff: [`d4cef45...178dea5`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d4cef45...178dea5`)

```diff
@@ browser_protocol.pdl:838 @@ experimental domain Audits
     enum
       ShouldEmbargo
       TooManyRequests
-      WellKnownHttpNotFound
-      WellKnownNoResponse
-      WellKnownInvalidResponse
-      ConfigNotInWellKnown
-      WellKnownTooBig
-      ConfigHttpNotFound
-      ConfigNoResponse
-      ConfigInvalidResponse
+      ManifestListHttpNotFound
+      ManifestListNoResponse
+      ManifestListInvalidResponse
+      ManifestNotInManifestList
+      ManifestListTooBig
+      ManifestHttpNotFound
+      ManifestNoResponse
+      ManifestInvalidResponse
       ClientMetadataHttpNotFound
       ClientMetadataNoResponse
       ClientMetadataInvalidResponse
@@ -3897,6 +3897,7 @@ domain Emulation
   experimental type DisabledImageType extends string
     enum
       avif
+      jxl
       webp
 
   experimental command setDisabledImageTypes
@@ -7219,7 +7220,6 @@ domain Page
       serial
       shared-autofill
       shared-storage
-      smart-card
       storage-access
       sync-xhr
       trust-token-redemption
```

## Roll protocol to r1081314 — _2022-12-09T04:28:47.000Z_
######  Diff: [`c1e172c...d4cef45`](https://github.com/ChromeDevTools/devtools-protocol/compare/`c1e172c...d4cef45`)

```diff
@@ browser_protocol.pdl:9569 @@ experimental domain SystemInfo
       # supported.
       string commandLine
 
-  # Returns information about the feature state.
-  command getFeatureState
-    parameters
-      string featureState
-    returns
-      boolean featureEnabled
-
   # Returns information about all running processes.
   command getProcessInfo
     returns
```

## Roll protocol to r1079624 — _2022-12-06T04:28:29.000Z_
######  Diff: [`8af7bb2...c1e172c`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8af7bb2...c1e172c`)

```diff
@@ browser_protocol.pdl:1100 @@ domain Browser
     enum
       granted
       denied
-      prompt
 
   # Definition of PermissionDescriptor defined in the Permissions API:
   # https://w3c.github.io/permissions/#dictdef-permissiondescriptor.
```

## Roll protocol to r1078443 — _2022-12-02T04:28:44.000Z_
######  Diff: [`23c561a...8af7bb2`](https://github.com/ChromeDevTools/devtools-protocol/compare/`23c561a...8af7bb2`)

```diff
@@ browser_protocol.pdl:10630 @@ experimental domain WebAuthn
       AuthenticatorId authenticatorId
       boolean enabled
 
-  # Triggered when a credential is added to an authenticator.
-  event credentialAdded
-    parameters
-      AuthenticatorId authenticatorId
-      Credential credential
-
-  # Triggered when a credential is used in a webauthn assertion.
-  event credentialAsserted
-    parameters
-      AuthenticatorId authenticatorId
-      Credential credential
-
 # This domain allows detailed inspection of media elements
 experimental domain Media
```

## Roll protocol to r1077862 — _2022-12-01T04:30:06.000Z_
######  Diff: [`151a19b...23c561a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`151a19b...23c561a`)

```diff
@@ browser_protocol.pdl:8423 @@ domain Page
       InjectedStyleSheet
       KeepaliveRequest
       Dummy
-      AuthorizationHeader
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
@@ -9077,7 +9076,6 @@ experimental domain Storage
       join
       leave
       update
-      loaded
       bid
       win
 
@@ -10013,8 +10011,8 @@ experimental domain Tracing
       # total size.
       optional number value
 
-  # Contains a bucket of collected trace events. When tracing is stopped collected events will be
-  # sent as a sequence of dataCollected events followed by tracingComplete event.
+  # Contains an bucket of collected trace events. When tracing is stopped collected events will be
+  # send as a sequence of dataCollected events followed by tracingComplete event.
   event dataCollected
     parameters
       array of object value
```

## Roll protocol to r1075693 — _2022-11-25T04:29:29.000Z_
######  Diff: [`3a71cd0...151a19b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3a71cd0...151a19b`)

```diff
@@ browser_protocol.pdl:1031 @@ experimental domain BackgroundService
       string instanceId
       # A list of event-specific information.
       array of EventMetadata eventMetadata
-      # Storage key this event belongs to.
-      string storageKey
 
   # Called with all existing backgroundServiceEvents when enabled, and all new
   # events afterwards if enabled and recording.
```

## Roll protocol to r1075032 — _2022-11-23T04:29:43.000Z_
######  Diff: [`55143fc...3a71cd0`](https://github.com/ChromeDevTools/devtools-protocol/compare/`55143fc...3a71cd0`)

```diff
@@ browser_protocol.pdl:2099 @@ experimental domain CacheStorage
   # Requests cache names.
   command requestCacheNames
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
-      optional string securityOrigin
-      # Storage key.
-      optional string storageKey
+      string securityOrigin
     returns
       # Caches for the security origin.
       array of Cache caches
```

## Roll protocol to r1074451 — _2022-11-22T04:30:40.000Z_
######  Diff: [`f504866...55143fc`](https://github.com/ChromeDevTools/devtools-protocol/compare/`f504866...55143fc`)

```diff
@@ browser_protocol.pdl:9262 @@ experimental domain Storage
       # Security origin.
       string origin
 
-  # Registers storage key to be notified when an update occurs to its cache storage list.
-  command trackCacheStorageForStorageKey
-    parameters
-      # Storage key.
-      string storageKey
-
   # Registers origin to be notified when an update occurs to its IndexedDB.
   command trackIndexedDBForOrigin
     parameters
@@ -9286,12 +9280,6 @@ experimental domain Storage
       # Security origin.
       string origin
 
-  # Unregisters storage key from receiving notifications for cache storage.
-  command untrackCacheStorageForStorageKey
-    parameters
-      # Storage key.
-      string storageKey
-
   # Unregisters origin from receiving notifications for IndexedDB.
   command untrackIndexedDBForOrigin
     parameters
@@ -9377,8 +9365,6 @@ experimental domain Storage
     parameters
       # Origin to update.
       string origin
-      # Storage key to update.
-      string storageKey
       # Name of cache in origin.
       string cacheName
 
@@ -9387,8 +9373,6 @@ experimental domain Storage
     parameters
       # Origin to update.
       string origin
-      # Storage key to update.
-      string storageKey
 
   # The origin's IndexedDB object store has been modified.
   event indexedDBContentUpdated
```

## Roll protocol to r1073708 — _2022-11-19T04:30:08.000Z_
######  Diff: [`5690c4d...f504866`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5690c4d...f504866`)

```diff
@@ browser_protocol.pdl:8121 @@ domain Page
     parameters
       enum mode
         none
-        autoAccept
-        autoReject
-        autoOptOut
+        autoaccept
+        autoreject
 
   # Generates a report for testing.
   experimental command generateTestReport
```

## Roll protocol to r1072049 — _2022-11-16T04:31:33.000Z_
######  Diff: [`d66082e...5690c4d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d66082e...5690c4d`)

```diff
@@ browser_protocol.pdl:482 @@ experimental domain Audits
       ExcludeInvalidSameParty
       ExcludeSamePartyCrossPartyContext
       ExcludeDomainNonASCII
-      ExcludeThirdPartyCookieBlockedInFirstPartySet
 
   type CookieWarningReason extends string
     enum
@@ -5480,9 +5479,6 @@ domain Network
       SameSiteNoneInsecure
       # The cookie was not stored due to user preferences.
       UserPreferences
-      # The cookie was blocked by third-party cookie blocking between sites in
-      # the same First-Party Set.
-      ThirdPartyBlockedInFirstPartySet
       # The syntax of the Set-Cookie header of the response was invalid.
       SyntaxError
       # The scheme of the connection is not allowed to store cookies.
@@ -5547,9 +5543,6 @@ domain Network
       SameSiteNoneInsecure
       # The cookie was not sent due to user preferences.
       UserPreferences
-      # The cookie was blocked by third-party cookie blocking between sites in
-      # the same First-Party Set.
-      ThirdPartyBlockedInFirstPartySet
       # An unknown error was encountered when trying to send this cookie.
       UnknownError
       # The cookie had the "SameSite=Strict" attribute but came from a response
```

## Roll protocol to r1070637 — _2022-11-12T04:32:08.000Z_
######  Diff: [`6bf5d82...d66082e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6bf5d82...d66082e`)

```diff
@@ browser_protocol.pdl:2065 @@ experimental domain CacheStorage
       CacheId cacheId
       # Security origin of the cache.
       string securityOrigin
-      # Storage key of the cache.
-      string storageKey
       # The name of the cache.
       string cacheName
```

## Roll protocol to r1069585 — _2022-11-10T04:34:05.000Z_
######  Diff: [`bac0463...6bf5d82`](https://github.com/ChromeDevTools/devtools-protocol/compare/`bac0463...6bf5d82`)

```diff
@@ browser_protocol.pdl:1076 @@ domain Browser
       durableStorage
       flash
       geolocation
-      idleDetection
-      localFonts
       midi
       midiSysex
       nfc
@@ -1086,12 +1084,11 @@ domain Browser
       periodicBackgroundSync
       protectedMediaIdentifier
       sensors
-      storageAccess
       videoCapture
       videoCapturePanTiltZoom
+      idleDetection
       wakeLockScreen
       wakeLockSystem
-      windowManagement
 
   experimental type PermissionSetting extends string
     enum
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index 6efcf78..b3b97fa 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -458,14 +458,13 @@ domain Debugger
       # New value for breakpoints active state.
       boolean active
 
-  # Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions,
-  # or caught exceptions, no exceptions. Initial pause on exceptions state is `none`.
+  # Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or
+  # no exceptions. Initial pause on exceptions state is `none`.
   command setPauseOnExceptions
     parameters
       # Pause on exceptions mode.
       enum state
         none
-        caught
         uncaught
         all
```

## Roll protocol to r1068969 — _2022-11-09T04:35:00.000Z_
######  Diff: [`8a54e06...bac0463`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8a54e06...bac0463`)

```diff
@@ browser_protocol.pdl:2237 @@ domain DOM
       scrollbar-corner
       resizer
       input-list-button
-      view-transition
-      view-transition-group
-      view-transition-image-pair
-      view-transition-old
-      view-transition-new
+      page-transition
+      page-transition-container
+      page-transition-image-wrapper
+      page-transition-outgoing-image
+      page-transition-incoming-image
 
   # Shadow root type.
   type ShadowRootType extends string
```

## Roll protocol to r1068494 — _2022-11-08T04:34:24.000Z_
######  Diff: [`f88fa8b...8a54e06`](https://github.com/ChromeDevTools/devtools-protocol/compare/`f88fa8b...8a54e06`)

```diff
@@ browser_protocol.pdl:1599 @@ experimental domain CSS
       optional StyleSheetId styleSheetId
       # Optional name for the container.
       optional string name
-      # Optional physical axes queried for the container.
-      optional DOM.PhysicalAxes physicalAxes
-      # Optional logical axes queried for the container.
-      optional DOM.LogicalAxes logicalAxes
 
   # CSS Supports at-rule descriptor.
   experimental type CSSSupports extends object
@@ -2257,20 +2253,6 @@ domain DOM
       LimitedQuirksMode
       NoQuirksMode
 
-  # ContainerSelector physical axes
-  type PhysicalAxes extends string
-    enum
-      Horizontal
-      Vertical
-      Both
-
-  # ContainerSelector logical axes
-  type LogicalAxes extends string
-    enum
-      Inline
-      Block
-      Both
-
   # DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes.
   # DOMNode is a base node mirror type.
   type Node extends object
@@ -2883,16 +2865,13 @@ domain DOM
       # Id of the node at given coordinates, only when enabled and requested document.
       optional NodeId nodeId
 
-  # Returns the query container of the given node based on container query
-  # conditions: containerName, physical, and logical axes. If no axes are
-  # provided, the style container is returned, which is the direct parent or the
-  # closest element with a matching container-name.
+  # Returns the container of the given node based on container query conditions.
+  # If containerName is given, it will find the nearest container with a matching name;
+  # otherwise it will find the nearest container regardless of its container name.
   experimental command getContainerForNode
     parameters
       NodeId nodeId
       optional string containerName
-      optional PhysicalAxes physicalAxes
-      optional LogicalAxes logicalAxes
     returns
       # The container node for the given node, or null if not found.
       optional NodeId nodeId
@@ -9321,16 +9300,6 @@ experimental domain Storage
     returns
       array of SharedStorageEntry entries
 
-  # Sets entry with `key` and `value` for a given origin's shared storage.
-  experimental command setSharedStorageEntry
-    parameters
-      string ownerOrigin
-      string key
-      string value
-      # If `ignoreIfPresent` is included and true, then only sets the entry if
-      # `key` doesn't already exist.
-      optional boolean ignoreIfPresent
-
   # Deletes entry for `key` (if it exists) for a given origin's shared storage.
   experimental command deleteSharedStorageEntry
     parameters
```

## Roll protocol to r1067399 — _2022-11-04T04:34:35.000Z_
######  Diff: [`62e017d...f88fa8b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`62e017d...f88fa8b`)

```diff
@@ browser_protocol.pdl:1094 @@ domain Browser
     enum
       granted
       denied
+      prompt
 
   # Definition of PermissionDescriptor defined in the Permissions API:
   # https://w3c.github.io/permissions/#dictdef-permissiondescriptor.
@@ -3941,10 +3942,18 @@ experimental domain HeadlessExperimental
       optional binary screenshotData
 
   # Disables headless events for the target.
-  deprecated command disable
+  command disable
 
   # Enables headless events for the target.
-  deprecated command enable
+  command enable
+
+  # Issued when the target starts or stops needing BeginFrames.
+  # Deprecated. Issue beginFrame unconditionally instead and use result from
+  # beginFrame to detect whether the frames were suppressed.
+  deprecated event needsBeginFramesChanged
+    parameters
+      # True if BeginFrames are needed, false otherwise.
+      boolean needsBeginFrames
 
 # Input/Output operations for streams produced by DevTools.
 domain IO
@@ -6324,8 +6333,6 @@ domain Network
       experimental ConnectTiming connectTiming
       # The client security state set for the request.
       optional ClientSecurityState clientSecurityState
-      # Whether the site has partitioned cookies stored in a partition different than the current one.
-      optional boolean siteHasCookieInOtherPartition
 
   # Fired when additional information about a responseReceived event is available from the network
   # stack. Not every responseReceived event will have an additional responseReceivedExtraInfo for
@@ -9300,17 +9307,6 @@ experimental domain Storage
     returns
       array of SharedStorageEntry entries
 
-  # Deletes entry for `key` (if it exists) for a given origin's shared storage.
-  experimental command deleteSharedStorageEntry
-    parameters
-      string ownerOrigin
-      string key
-
-  # Clears all entries for a given origin's shared storage.
-  experimental command clearSharedStorageEntries
-    parameters
-      string ownerOrigin
-
   # Enables/disables issuing of sharedStorageAccessed events.
   experimental command setSharedStorageTracking
     parameters
```

## Roll protocol to r1066334 — _2022-11-02T04:46:36.000Z_
######  Diff: [`a417f5f...62e017d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a417f5f...62e017d`)

```diff
@@ browser_protocol.pdl:10493 @@ experimental domain WebAuthn
     returns
       AuthenticatorId authenticatorId
 
-  # Resets parameters isBogusSignature, isBadUV, isBadUP to false if they are not present.
-  command setResponseOverrideBits
-    parameters
-      AuthenticatorId authenticatorId
-      # If isBogusSignature is set, overrides the signature in the authenticator response to be zero.
-      # Defaults to false.
-      optional boolean isBogusSignature
-      # If isBadUV is set, overrides the UV bit in the flags in the authenticator response to
-      # be zero. Defaults to false.
-      optional boolean isBadUV
-      # If isBadUP is set, overrides the UP bit in the flags in the authenticator response to
-      # be zero. Defaults to false.
-      optional boolean isBadUP
-
   # Removes the given authenticator.
   command removeVirtualAuthenticator
     parameters
```

## Roll protocol to r1065144 — _2022-10-29T04:33:23.000Z_
######  Diff: [`272cd26...a417f5f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`272cd26...a417f5f`)

```diff
@@ browser_protocol.pdl:8359 @@ domain Page
       DedicatedWorkerOrWorklet
       OutstandingNetworkRequestOthers
       OutstandingIndexedDBTransaction
+      RequestedNotificationsPermission
       RequestedMIDIPermission
       RequestedAudioCapturePermission
       RequestedVideoCapturePermission
```

## Roll protocol to r1064701 — _2022-10-28T04:35:09.000Z_
######  Diff: [`9be9b0f...272cd26`](https://github.com/ChromeDevTools/devtools-protocol/compare/`9be9b0f...272cd26`)

```diff
@@ browser_protocol.pdl:9070 @@ experimental domain Storage
       array of InterestGroupAd ads
       array of InterestGroupAd adComponents
 
-  # Enum of shared storage access types.
-  type SharedStorageAccessType extends string
-    enum
-      documentAddModule
-      documentSelectURL
-      documentRun
-      documentSet
-      documentAppend
-      documentDelete
-      documentClear
-      workletSet
-      workletAppend
-      workletDelete
-      workletClear
-      workletGet
-      workletKeys
-      workletEntries
-      workletLength
-      workletRemainingBudget
-
   # Struct for a single key-value pair in an origin's shared storage.
   type SharedStorageEntry extends object
     properties
@@ -9103,58 +9083,6 @@ experimental domain Storage
       integer length
       number remainingBudget
 
-  # Pair of reporting metadata details for a candidate URL for `selectURL()`.
-  type SharedStorageReportingMetadata extends object
-    properties
-      string eventType
-      string reportingUrl
-
-  # Bundles a candidate URL with its reporting metadata.
-  type SharedStorageUrlWithMetadata extends object
-    properties
-      # Spec of candidate URL.
-      string url
-      # Any associated reporting metadata.
-      array of SharedStorageReportingMetadata reportingMetadata
-
-  # Bundles the parameters for shared storage access events whose
-  # presence/absence can vary according to SharedStorageAccessType.
-  type SharedStorageAccessParams extends object
-    properties
-      # Spec of the module script URL.
-      # Present only for SharedStorageAccessType.documentAddModule.
-      optional string scriptSourceUrl
-      # Name of the registered operation to be run.
-      # Present only for SharedStorageAccessType.documentRun and
-      # SharedStorageAccessType.documentSelectURL.
-      optional string operationName
-      # The operation's serialized data in bytes (converted to a string).
-      # Present only for SharedStorageAccessType.documentRun and
-      # SharedStorageAccessType.documentSelectURL.
-      optional string serializedData
-      # Array of candidate URLs' specs, along with any associated metadata.
-      # Present only for SharedStorageAccessType.documentSelectURL.
-      optional array of SharedStorageUrlWithMetadata urlsWithMetadata
-      # Key for a specific entry in an origin's shared storage.
-      # Present only for SharedStorageAccessType.documentSet,
-      # SharedStorageAccessType.documentAppend,
-      # SharedStorageAccessType.documentDelete,
-      # SharedStorageAccessType.workletSet,
-      # SharedStorageAccessType.workletAppend,
-      # SharedStorageAccessType.workletDelete, and
-      # SharedStorageAccessType.workletGet.
-      optional string key
-      # Value for a specific entry in an origin's shared storage.
-      # Present only for SharedStorageAccessType.documentSet,
-      # SharedStorageAccessType.documentAppend,
-      # SharedStorageAccessType.workletSet, and
-      # SharedStorageAccessType.workletAppend.
-      optional string value
-      # Whether or not to set an entry for a key if that key is already present.
-      # Present only for SharedStorageAccessType.documentSet and
-      # SharedStorageAccessType.workletSet.
-      optional boolean ignoreIfPresent
-
   # Returns a storage key given a frame id.
   command getStorageKeyForFrame
     parameters
@@ -9308,11 +9236,6 @@ experimental domain Storage
     returns
       array of SharedStorageEntry entries
 
-  # Enables/disables issuing of sharedStorageAccessed events.
-  experimental command setSharedStorageTracking
-    parameters
-      boolean enable
-
   # A cache's contents have been modified.
   event cacheStorageContentUpdated
     parameters
@@ -9355,22 +9278,6 @@ experimental domain Storage
       string ownerOrigin
       string name
 
-  # Shared storage was accessed by the associated page.
-  # The following parameters are included in all events.
-  event sharedStorageAccessed
-    parameters
-      # Time of the access.
-      Network.TimeSinceEpoch accessTime
-      # Enum value indicating the Shared Storage API method invoked.
-      SharedStorageAccessType type
-      # DevTools Frame Token for the primary frame tree's root.
-      Page.FrameId mainFrameId
-      # Serialized origin for the context that invoked the Shared Storage API.
-      string ownerOrigin
-      # The sub-parameters warapped by `params` are all optional and their
-      # presence/absence depends on `type`.
-      SharedStorageAccessParams params
-
 # The SystemInfo domain defines methods and events for querying low-level system information.
 experimental domain SystemInfo
```

## Roll protocol to r1064177 — _2022-10-27T04:35:18.000Z_
######  Diff: [`c2f8047...9be9b0f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`c2f8047...9be9b0f`)

```diff
@@ browser_protocol.pdl:7155 @@ domain Page
       ch-width
       clipboard-read
       clipboard-write
-      compute-pressure
       cross-origin-isolated
       direct-sockets
       display-capture
```

## Roll protocol to r1063652 — _2022-10-26T04:39:27.000Z_
######  Diff: [`4194c0a...c2f8047`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4194c0a...c2f8047`)

```diff
@@ browser_protocol.pdl:8512 @@ domain Page
       SameSiteCrossOriginNavigation
       SameSiteCrossOriginRedirectNotOptIn
       SameSiteCrossOriginNavigationNotOptIn
-      ActivationNavigationParameterMismatch
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1063155 — _2022-10-25T05:01:53.000Z_
######  Diff: [`c84ff3d...4194c0a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`c84ff3d...4194c0a`)

```diff
@@ browser_protocol.pdl:8470 @@ domain Page
       Activated
       Destroyed
       LowEndDevice
+      CrossOriginRedirect
+      CrossOriginNavigation
       InvalidSchemeRedirect
       InvalidSchemeNavigation
       InProgressNavigation
@@ -8506,12 +8508,6 @@ domain Page
       InactivePageRestriction
       StartFailed
       TimeoutBackgrounded
-      CrossSiteRedirect
-      CrossSiteNavigation
-      SameSiteCrossOriginRedirect
-      SameSiteCrossOriginNavigation
-      SameSiteCrossOriginRedirectNotOptIn
-      SameSiteCrossOriginNavigationNotOptIn
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
@@ -9018,7 +9014,6 @@ experimental domain Storage
       service_workers
       cache_storage
       interest_groups
-      shared_storage
       all
       other
 
@@ -9068,19 +9063,6 @@ experimental domain Storage
       array of InterestGroupAd ads
       array of InterestGroupAd adComponents
 
-  # Struct for a single key-value pair in an origin's shared storage.
-  type SharedStorageEntry extends object
-    properties
-      string key
-      string value
-
-  # Details for an origin's shared storage.
-  type SharedStorageMetadata extends object
-    properties
-      Network.TimeSinceEpoch creationTime
-      integer length
-      number remainingBudget
-
   # Returns a storage key given a frame id.
   command getStorageKeyForFrame
     parameters
@@ -9220,20 +9202,6 @@ experimental domain Storage
     parameters
       boolean enable
 
-  # Gets metadata for an origin's shared storage.
-  experimental command getSharedStorageMetadata
-    parameters
-      string ownerOrigin
-    returns
-      SharedStorageMetadata metadata
-
-  # Gets the entries in an given origin's shared storage.
-  experimental command getSharedStorageEntries
-    parameters
-      string ownerOrigin
-    returns
-      array of SharedStorageEntry entries
-
   # A cache's contents have been modified.
   event cacheStorageContentUpdated
     parameters
```

## Roll protocol to r1061995 — _2022-10-21T04:47:34.000Z_
######  Diff: [`3dde831...c84ff3d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3dde831...c84ff3d`)

```diff
@@ browser_protocol.pdl:3908 @@ experimental domain HeadlessExperimental
       optional enum format
         jpeg
         png
-        webp
       # Compression quality from range [0..100] (jpeg only).
       optional integer quality
-      # Optimize image encoding for speed, not for resulting size (defaults to false)
-      optional boolean optimizeForSpeed
 
   # Sends a BeginFrame to the target and returns when the frame was completed. Optionally captures a
   # screenshot from the resulting frame. Requires that the target was created with enabled
@@ -8391,7 +8388,7 @@ domain Page
       InjectedStyleSheet
       KeepaliveRequest
       Dummy
-      # Disabled for RenderFrameHost reasons
+      # Disabled for render frame host reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
       ContentWebAuthenticationAPI
```

## Roll protocol to r1061415 — _2022-10-20T04:46:58.000Z_
######  Diff: [`d42b588...3dde831`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d42b588...3dde831`)

```diff
@@ browser_protocol.pdl:7595 @@ domain Page
       experimental optional boolean fromSurface
       # Capture the screenshot beyond the viewport. Defaults to false.
       experimental optional boolean captureBeyondViewport
-      # Optimize image encoding for speed, not for resulting size (defaults to false)
-      experimental optional boolean optimizeForSpeed
     returns
       # Base64-encoded image data.
       binary data
@@ -8386,7 +8384,6 @@ domain Page
       OutstandingNetworkRequestDirectSocket
       InjectedJavascript
       InjectedStyleSheet
-      KeepaliveRequest
       Dummy
       # Disabled for render frame host reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
```

## Roll protocol to r1060866 — _2022-10-19T05:00:30.000Z_
######  Diff: [`aca7212...d42b588`](https://github.com/ChromeDevTools/devtools-protocol/compare/`aca7212...d42b588`)

```diff
@@ browser_protocol.pdl:8135 @@ domain Page
       FrameId parentFrameId
       # JavaScript stack trace of when frame was attached, only set if frame initiated from script.
       optional Runtime.StackTrace stack
+      # Identifies the bottom-most script which caused the frame to be labelled
+      # as an ad. Only sent if frame is labelled as an ad and id is available.
+      # Deprecated: use Page.getAdScriptId instead.
+      experimental deprecated optional AdScriptId adScriptId
 
   # Fired when frame no longer has a scheduled navigation.
   deprecated event frameClearedScheduledNavigation
```

## Roll protocol to r1059612 — _2022-10-15T04:53:37.000Z_
######  Diff: [`ddedcee...aca7212`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ddedcee...aca7212`)

```diff
@@ browser_protocol.pdl:7682 @@ domain Page
       # Recommendation for manifest's id attribute to match current id computed from start_url
       optional string recommendedId
 
-  experimental command getAdScriptId
-    parameters
-      FrameId frameId
-    returns
-      # Identifies the bottom-most script which caused the frame to be labelled
-      # as an ad. Only sent if frame is labelled as an ad and id is available.
-      optional AdScriptId adScriptId
-
   # Returns all browser cookies for the page and all of its subframes. Depending
   # on the backend support, will return detailed cookie information in the
   # `cookies` field.
@@ -8137,8 +8129,7 @@ domain Page
       optional Runtime.StackTrace stack
       # Identifies the bottom-most script which caused the frame to be labelled
       # as an ad. Only sent if frame is labelled as an ad and id is available.
-      # Deprecated: use Page.getAdScriptId instead.
-      experimental deprecated optional AdScriptId adScriptId
+      experimental optional AdScriptId adScriptId
 
   # Fired when frame no longer has a scheduled navigation.
   deprecated event frameClearedScheduledNavigation
```

## Roll protocol to r1059094 — _2022-10-14T04:59:20.000Z_
######  Diff: [`366164c...ddedcee`](https://github.com/ChromeDevTools/devtools-protocol/compare/`366164c...ddedcee`)

```diff
@@ browser_protocol.pdl:9945 @@ domain Fetch
       optional string method
       # If set, overrides the post data in the request.
       optional binary postData
-      # If set, overrides the request headers. Note that the overrides do not
-      # extend to subsequent redirect hops, if a redirect happens. Another override
-      # may be applied to a different request produced by a redirect.
+      # If set, overrides the request headers.
       optional array of HeaderEntry headers
       # If set, overrides response interception behavior for this request.
       experimental optional boolean interceptResponse
```

## Roll protocol to r1057312 — _2022-10-11T04:55:46.000Z_
######  Diff: [`02af7d8...366164c`](https://github.com/ChromeDevTools/devtools-protocol/compare/`02af7d8...366164c`)

```diff
@@ js_protocol.pdl:918 @@ domain Profiler
       # Functions contained in the script that has coverage data.
       array of FunctionCoverage functions
 
+  # Describes a type collected during runtime.
+  experimental type TypeObject extends object
+    properties
+      # Name of a type collected with type profiling.
+      string name
+
+  # Source offset and types for a parameter or return value.
+  experimental type TypeProfileEntry extends object
+    properties
+      # Source offset of the parameter or end of function for return values.
+      integer offset
+      # The types for this parameter or return value.
+      array of TypeObject types
+
+  # Type profile data collected during runtime for a JavaScript script.
+  experimental type ScriptTypeProfile extends object
+    properties
+      # JavaScript script id.
+      Runtime.ScriptId scriptId
+      # JavaScript script name or url.
+      string url
+      # Type profile entries for parameters and return values of the functions in the script.
+      array of TypeProfileEntry entries
+
   command disable
 
   command enable
@@ -952,6 +976,9 @@ domain Profiler
       # Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
       number timestamp
 
+  # Enable type profile.
+  experimental command startTypeProfile
+
   command stop
     returns
       # Recorded profile.
@@ -961,6 +988,9 @@ domain Profiler
   # executing optimized code.
   command stopPreciseCoverage
 
+  # Disable type profile. Disabling releases type profile data collected so far.
+  experimental command stopTypeProfile
+
   # Collect coverage data for the current isolate, and resets execution counters. Precise code
   # coverage needs to have started.
   command takePreciseCoverage
@@ -970,6 +1000,12 @@ domain Profiler
       # Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
       number timestamp
 
+  # Collect type profile.
+  experimental command takeTypeProfile
+    returns
+      # Type profile for all scripts since startTypeProfile() was turned on.
+      array of ScriptTypeProfile result
+
   event consoleProfileFinished
     parameters
       string id
```

## Roll protocol to r1056733 — _2022-10-09T04:46:56.000Z_
######  Diff: [`1e2a599...02af7d8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1e2a599...02af7d8`)

```diff
@@ browser_protocol.pdl:5277 @@ domain Network
       # HTTPS DNS protocol upgrade job won a race with a normal connection and
       # an Alternate Protocol job.
       dnsAlpnH3JobWonRace
-      # This value is used when the reason is unknown.
+      # When the reason is unspecified.
       unspecifiedReason
 
   # HTTP response data.
```

## Roll protocol to r1056622 — _2022-10-08T04:34:15.000Z_
######  Diff: [`871805f...1e2a599`](https://github.com/ChromeDevTools/devtools-protocol/compare/`871805f...1e2a599`)

```diff
@@ browser_protocol.pdl:10036 @@ domain Fetch
       optional array of HeaderEntry responseHeaders
       # If the intercepted request had a corresponding Network.requestWillBeSent event fired for it,
       # then this networkId will be the same as the requestId present in the requestWillBeSent event.
-      optional Network.RequestId networkId
-      # If the request is due to a redirect response from the server, the id of the request that
-      # has caused the redirect.
-      experimental optional RequestId redirectedRequestId
+      optional RequestId networkId
 
   # Issued when the domain is enabled with handleAuthRequests set to true.
   # The request is paused until client responds with continueWithAuth.
```

## Roll protocol to r1055599 — _2022-10-06T04:34:37.000Z_
######  Diff: [`221d16f...871805f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`221d16f...871805f`)

```diff
@@ browser_protocol.pdl:7166 @@ domain Page
       geolocation
       gyroscope
       hid
-      identity-credentials-get
+      identity-credential-get
       idle-detection
       interest-cohort
       join-ad-interest-group
@@ -7682,9 +7682,8 @@ domain Page
       # Recommendation for manifest's id attribute to match current id computed from start_url
       optional string recommendedId
 
-  # Returns all browser cookies for the page and all of its subframes. Depending
-  # on the backend support, will return detailed cookie information in the
-  # `cookies` field.
+  # Returns all browser cookies. Depending on the backend support, will return detailed cookie
+  # information in the `cookies` field.
   experimental deprecated command getCookies
     # Use 'Network.getCookies' instead
     redirect Network
```

## Roll protocol to r1055124 — _2022-10-05T04:35:05.000Z_
######  Diff: [`6e37e04...221d16f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6e37e04...221d16f`)

```diff
@@ browser_protocol.pdl:8495 @@ domain Page
       ActivatedBeforeStarted
       InactivePageRestriction
       StartFailed
-      TimeoutBackgrounded
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1052822 — _2022-09-29T04:58:25.000Z_
######  Diff: [`0ce6bcb...6e37e04`](https://github.com/ChromeDevTools/devtools-protocol/compare/`0ce6bcb...6e37e04`)

```diff
@@ browser_protocol.pdl:5256 @@ domain Network
       # Type "send-redemption-record" in the Trust Token API.
       Signing
 
-  # The reason why Chrome uses a specific transport protocol for HTTP semantics.
-  experimental type AlternateProtocolUsage extends string
-    enum
-      # Alternate Protocol was used without racing a normal connection.
-      alternativeJobWonWithoutRace
-      # Alternate Protocol was used by winning a race with a normal connection.
-      alternativeJobWonRace
-      # Alternate Protocol was not used by losing a race with a normal connection.
-      mainJobWonRace
-      # Alternate Protocol was not used because no Alternate-Protocol information
-      # was available when the request was issued, but an Alternate-Protocol header
-      # was present in the response.
-      mappingMissing
-      # Alternate Protocol was not used because it was marked broken.
-      broken
-      # HTTPS DNS protocol upgrade job was used without racing with a normal
-      # connection and an Alternate Protocol job.
-      dnsAlpnH3JobWonWithoutRace
-      # HTTPS DNS protocol upgrade job won a race with a normal connection and
-      # an Alternate Protocol job.
-      dnsAlpnH3JobWonRace
-      # When the reason is unspecified.
-      unspecifiedReason
-
   # HTTP response data.
   type Response extends object
     properties
@@ -5325,8 +5301,6 @@ domain Network
       optional string cacheStorageCacheName
       # Protocol used to fetch this request.
       optional string protocol
-      # The reason why Chrome uses a specific transport protocol for HTTP semantics.
-      experimental optional AlternateProtocolUsage alternateProtocolUsage
       # Security state of the request resource.
       Security.SecurityState securityState
       # Security details for the request.
@@ -7132,7 +7106,6 @@ domain Page
       ch-downlink
       ch-ect
       ch-prefers-color-scheme
-      ch-prefers-reduced-motion
       ch-rtt
       ch-save-data
       ch-ua
@@ -7159,6 +7132,7 @@ domain Page
       encrypted-media
       execution-while-out-of-viewport
       execution-while-not-rendered
+      federated-credentials
       focus-without-user-activation
       fullscreen
       frobulate
@@ -7166,7 +7140,6 @@ domain Page
       geolocation
       gyroscope
       hid
-      identity-credential-get
       idle-detection
       interest-cohort
       join-ad-interest-group
```

## Roll protocol to r1052219 — _2022-09-28T04:58:58.000Z_
######  Diff: [`7688064...0ce6bcb`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7688064...0ce6bcb`)

```diff
@@ browser_protocol.pdl:1 @@ @@ -1,4 +1,4 @@
-# Copyright 2017 The Chromium Authors
+# Copyright 2017 The Chromium Authors. All rights reserved.
 # Use of this source code is governed by a BSD-style license that can be
 # found in the LICENSE file.
 #
@@ -775,6 +775,8 @@ experimental domain Audits
       LocalCSSFileExtensionRejected
       MediaSourceAbortRemove
       MediaSourceDurationTruncatingBuffered
+      NavigateEventRestoreScroll
+      NavigateEventTransitionWhile
       NoSysexWebMIDIWithoutPermission
       NotificationInsecureOrigin
       NotificationPermissionRequestedIframe
@@ -782,7 +784,6 @@ experimental domain Audits
       OpenWebDatabaseInsecureContext
       OverflowVisibleOnReplacedElement
       PaymentInstruments
-      PaymentRequestCSPViolation
       PersistentQuotaType
       PictureSourceSrc
       PrefixedCancelAnimationFrame
@@ -9360,9 +9361,6 @@ domain Target
       # Frame id of originating window (is only set if target has an opener).
       experimental optional Page.FrameId openerFrameId
       experimental optional Browser.BrowserContextID browserContextId
-      # Provides additional details for specific target types. For example, for
-      # the type of "page", this may be set to "portal" or "prerender".
-      experimental optional string subtype
 
   # A filter used by target query/discovery/auto-attach operations.
   experimental type FilterEntry extends object
```

## Roll protocol to r1051614 — _2022-09-27T04:54:05.000Z_
######  Diff: [`32a0581...7688064`](https://github.com/ChromeDevTools/devtools-protocol/compare/`32a0581...7688064`)

```diff
@@ browser_protocol.pdl:783 @@ experimental domain Audits
       ObsoleteWebRtcCipherSuite
       OpenWebDatabaseInsecureContext
       OverflowVisibleOnReplacedElement
-      PaymentInstruments
       PersistentQuotaType
       PictureSourceSrc
       PrefixedCancelAnimationFrame
```

## Roll protocol to r1049481 — _2022-09-21T04:59:07.000Z_
######  Diff: [`8f2c950...32a0581`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8f2c950...32a0581`)

```diff
@@ browser_protocol.pdl:8466 @@ domain Page
       DataSaverEnabled
       HasEffectiveUrl
       ActivatedBeforeStarted
-      InactivePageRestriction
-      StartFailed
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1048947 — _2022-09-20T04:57:57.000Z_
######  Diff: [`8fd85c8...8f2c950`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8fd85c8...8f2c950`)

```diff
@@ browser_protocol.pdl:8458 @@ domain Page
       AudioOutputDeviceRequested
       MixedContent
       TriggerBackgrounded
+      EmbedderTriggeredAndSameOriginRedirected
       EmbedderTriggeredAndCrossOriginRedirected
       MemoryLimitExceeded
       # Prerenders can be cancelled when Chrome uses excessive memory. This is
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index 2d56043..8d8211b 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -766,22 +766,6 @@ experimental domain HeapProfiler
       # Average sample interval in bytes. Poisson distribution is used for the intervals. The
       # default value is 32768 bytes.
       optional number samplingInterval
-      # By default, the sampling heap profiler reports only objects which are
-      # still alive when the profile is returned via getSamplingProfile or
-      # stopSampling, which is useful for determining what functions contribute
-      # the most to steady-state memory usage. This flag instructs the sampling
-      # heap profiler to also include information about objects discarded by
-      # major GC, which will show which functions cause large temporary memory
-      # usage or long GC pauses.
-      optional boolean includeObjectsCollectedByMajorGC
-      # By default, the sampling heap profiler reports only objects which are
-      # still alive when the profile is returned via getSamplingProfile or
-      # stopSampling, which is useful for determining what functions contribute
-      # the most to steady-state memory usage. This flag instructs the sampling
-      # heap profiler to also include information about objects discarded by
-      # minor GC, which is useful when tuning a latency-sensitive application
-      # for minimal GC activity.
-      optional boolean includeObjectsCollectedByMinorGC
 
   command startTrackingHeapObjects
     parameters
```

## Roll protocol to r1048352 — _2022-09-17T04:46:41.000Z_
######  Diff: [`f628653...8fd85c8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`f628653...8fd85c8`)

```diff
@@ browser_protocol.pdl:772 @@ experimental domain Audits
       HostCandidateAttributeGetter
       IdentityInCanMakePaymentEvent
       InsecurePrivateNetworkSubresourceRequest
+      LegacyConstraintGoogIPv6
       LocalCSSFileExtensionRejected
       MediaSourceAbortRemove
       MediaSourceDurationTruncatingBuffered
```

## Roll protocol to r1047822 — _2022-09-16T04:59:17.000Z_
######  Diff: [`3c081bc...f628653`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3c081bc...f628653`)

```diff
@@ browser_protocol.pdl:8467 @@ domain Page
       FailToGetMemoryUsage
       DataSaverEnabled
       HasEffectiveUrl
-      ActivatedBeforeStarted
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1046751 — _2022-09-14T04:56:53.000Z_
######  Diff: [`379658e...3c081bc`](https://github.com/ChromeDevTools/devtools-protocol/compare/`379658e...3c081bc`)

```diff
@@ browser_protocol.pdl:8475 @@ domain Page
       FrameId initiatingFrameId
       string prerenderingUrl
       PrerenderFinalStatus finalStatus
-      # This is used to give users more information about the name of the API call
-      # that is incompatible with prerender and has caused the cancellation of the attempt
-      optional string disallowedApiMethod
+      # This is used to give users more information about the cancellation details,
+      # and this will be formatted for display.
+      optional string reasonDetails
 
   event loadEventFired
     parameters
```

## Roll protocol to r1045489 — _2022-09-10T04:51:55.000Z_
######  Diff: [`08793fb...379658e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`08793fb...379658e`)

```diff
@@ browser_protocol.pdl:701 @@ experimental domain Audits
   type AttributionReportingIssueType extends string
     enum
       PermissionPolicyDisabled
-      PermissionPolicyNotDelegated
       UntrustworthyReportingOrigin
       InsecureContext
       # TODO(apaseltiner): Rename this to InvalidRegisterSourceHeader
```

## Roll protocol to r1044932 — _2022-09-09T04:49:16.000Z_
######  Diff: [`6ea69cb...08793fb`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6ea69cb...08793fb`)

```diff
@@ browser_protocol.pdl:2926 @@ domain DOM
     parameters
       # Id of the node that has changed.
       NodeId parentNodeId
-      # Id of the previous sibling.
+      # If of the previous siblint.
       NodeId previousNodeId
       # Inserted node data.
       Node node
```

## Roll protocol to r1040073 — _2022-08-27T04:44:13.000Z_
######  Diff: [`4561609...6ea69cb`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4561609...6ea69cb`)

```diff
@@ browser_protocol.pdl:835 @@ experimental domain Audits
   # all cases except for success.
   type FederatedAuthRequestIssueReason extends string
     enum
-      ShouldEmbargo
+      ApprovalDeclined
       TooManyRequests
       ManifestListHttpNotFound
       ManifestListNoResponse
@@ -860,7 +860,6 @@ experimental domain Audits
       IdTokenInvalidRequest
       ErrorIdToken
       Canceled
-      RpPageNotVisible
 
   # This issue tracks client hints related issues. It's used to deprecate old
   # features, encourage the use of new ones, and provide general guidance.
```

## Roll protocol to r1039585 — _2022-08-26T04:57:38.000Z_
######  Diff: [`c6dfb99...4561609`](https://github.com/ChromeDevTools/devtools-protocol/compare/`c6dfb99...4561609`)

```diff
@@ browser_protocol.pdl:8464 @@ domain Page
       # recorded when it fails to get the memory usage.
       FailToGetMemoryUsage
       DataSaverEnabled
-      HasEffectiveUrl
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1036444 — _2022-08-18T04:47:13.000Z_
######  Diff: [`5bd2c6a...c6dfb99`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5bd2c6a...c6dfb99`)

```diff
@@ browser_protocol.pdl:7156 @@ domain Page
       serial
       shared-autofill
       shared-storage
-      storage-access
+      storage-access-api
       sync-xhr
       trust-token-redemption
       unload
```

## Roll protocol to r1034970 — _2022-08-15T04:47:01.000Z_
######  Diff: [`c5cb34c...5bd2c6a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`c5cb34c...5bd2c6a`)

```diff
@@ browser_protocol.pdl:8459 @@ domain Page
       TriggerBackgrounded
       EmbedderTriggeredAndSameOriginRedirected
       EmbedderTriggeredAndCrossOriginRedirected
+      EmbedderTriggeredAndDestroyed
       MemoryLimitExceeded
       # Prerenders can be cancelled when Chrome uses excessive memory. This is
       # recorded when it fails to get the memory usage.
       FailToGetMemoryUsage
-      DataSaverEnabled
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1034791 — _2022-08-13T04:31:31.000Z_
######  Diff: [`181b0dd...c5cb34c`](https://github.com/ChromeDevTools/devtools-protocol/compare/`181b0dd...c5cb34c`)

```diff
@@ browser_protocol.pdl:1537 @@ experimental domain CSS
       optional boolean disabled
       # The entire property range in the enclosing style declaration (if available).
       optional SourceRange range
-      # Parsed longhand components of this property if it is a shorthand.
-      # This field will be empty if the given property is not a shorthand.
-      experimental optional array of CSSProperty longhandProperties
 
   # CSS media rule descriptor.
   type CSSMedia extends object
```

## Roll protocol to r1033355 — _2022-08-10T04:31:04.000Z_
######  Diff: [`958f979...181b0dd`](https://github.com/ChromeDevTools/devtools-protocol/compare/`958f979...181b0dd`)

```diff
@@ browser_protocol.pdl:7156 @@ domain Page
       storage-access-api
       sync-xhr
       trust-token-redemption
-      unload
       usb
       vertical-scroll
       web-share
```

## Roll protocol to r1032873 — _2022-08-09T04:34:16.000Z_
######  Diff: [`4f1ab67...958f979`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4f1ab67...958f979`)

```diff
@@ browser_protocol.pdl:709 @@ experimental domain Audits
       InvalidEligibleHeader
       TooManyConcurrentRequests
       SourceAndTriggerHeaders
-      SourceIgnored
-      TriggerIgnored
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
```

## Roll protocol to r1032240 — _2022-08-06T04:31:26.000Z_
######  Diff: [`4b0d166...4f1ab67`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4b0d166...4f1ab67`)

```diff
@@ browser_protocol.pdl:708 @@ experimental domain Audits
       InvalidRegisterTriggerHeader
       InvalidEligibleHeader
       TooManyConcurrentRequests
-      SourceAndTriggerHeaders
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
@@ -8460,15 +8459,12 @@ domain Page
       FailToGetMemoryUsage
 
   # Fired when a prerender attempt is completed.
-  experimental event prerenderAttemptCompleted
+  event prerenderAttemptCompleted
     parameters
       # The frame id of the frame initiating prerendering.
       FrameId initiatingFrameId
       string prerenderingUrl
       PrerenderFinalStatus finalStatus
-      # This is used to give users more information about the cancellation details,
-      # and this will be formatted for display.
-      optional string reasonDetails
 
   event loadEventFired
     parameters
```

## Roll protocol to r1031356 — _2022-08-04T04:34:29.000Z_
######  Diff: [`ced9091...4b0d166`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ced9091...4b0d166`)

```diff
@@ browser_protocol.pdl:845 @@ experimental domain Audits
       ClientMetadataHttpNotFound
       ClientMetadataNoResponse
       ClientMetadataInvalidResponse
+      ClientMetadataMissingPrivacyPolicyUrl
       DisabledInSettings
       ErrorFetchingSignin
       InvalidSigninResponse
```

## Roll protocol to r1030896 — _2022-08-03T04:47:29.000Z_
######  Diff: [`750f434...ced9091`](https://github.com/ChromeDevTools/devtools-protocol/compare/`750f434...ced9091`)

```diff
@@ browser_protocol.pdl:481 @@ experimental domain Audits
       ExcludeSameSiteStrict
       ExcludeInvalidSameParty
       ExcludeSamePartyCrossPartyContext
-      ExcludeDomainNonASCII
 
   type CookieWarningReason extends string
     enum
@@ -494,7 +493,6 @@ experimental domain Audits
       WarnSameSiteLaxCrossDowngradeStrict
       WarnSameSiteLaxCrossDowngradeLax
       WarnAttributeValueExceedsMaxSize
-      WarnDomainNonASCII
 
   type CookieOperation extends string
     enum
@@ -4183,11 +4181,8 @@ experimental domain IndexedDB
   # Requests database names for given security origin.
   command requestDatabaseNames
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
-      optional string securityOrigin
-      # Storage key.
-      optional string storageKey
+      string securityOrigin
     returns
       # Database names for origin.
       array of string databaseNames
```

## Roll protocol to r1030398 — _2022-08-02T04:50:11.000Z_
######  Diff: [`18fb7c3...750f434`](https://github.com/ChromeDevTools/devtools-protocol/compare/`18fb7c3...750f434`)

```diff
@@ browser_protocol.pdl:705 @@ experimental domain Audits
       InvalidHeader
       InvalidRegisterTriggerHeader
       InvalidEligibleHeader
-      TooManyConcurrentRequests
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
```

## Roll protocol to r1030018 — _2022-07-30T04:33:35.000Z_
######  Diff: [`1ad73ad...18fb7c3`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1ad73ad...18fb7c3`)

```diff
@@ browser_protocol.pdl:9091 @@ experimental domain Storage
       # Security origin.
       string origin
 
-  # Registers storage key to be notified when an update occurs to its IndexedDB.
-  command trackIndexedDBForStorageKey
-    parameters
-      # Storage key.
-      string storageKey
-
   # Unregisters origin from receiving notifications for cache storage.
   command untrackCacheStorageForOrigin
     parameters
@@ -9109,12 +9103,6 @@ experimental domain Storage
       # Security origin.
       string origin
 
-  # Unregisters storage key from receiving notifications for IndexedDB.
-  command untrackIndexedDBForStorageKey
-    parameters
-      # Storage key.
-      string storageKey
-
   # Returns the number of stored Trust Tokens per issuer for the
   # current browsing context.
   experimental command getTrustTokens
@@ -9162,8 +9150,6 @@ experimental domain Storage
     parameters
       # Origin to update.
       string origin
-      # Storage key to update.
-      string storageKey
       # Database to update.
       string databaseName
       # ObjectStore to update.
@@ -9174,8 +9160,6 @@ experimental domain Storage
     parameters
       # Origin to update.
       string origin
-      # Storage key to update.
-      string storageKey
 
   # One of the interest groups was accessed by the associated page.
   event interestGroupAccessed
@@ -9346,16 +9330,13 @@ domain Target
   experimental type FilterEntry extends object
     properties
       # If set, causes exclusion of mathcing targets from the list.
+      # The remainder of filter entries in the filter arrat are ignored.
       optional boolean exclude
       # If not present, matches any type.
       optional string type
 
-  # The entries in TargetFilter are matched sequentially against targets and
-  # the first entry that matches determines if the target is included or not,
-  # depending on the value of `exclude` field in the entry.
-  # If filter is not specified, the one assumed is
-  # [{type: "browser", exclude: true}, {type: "tab", exclude: true}, {}]
-  # (i.e. include everything but `browser` and `tab`).
+  # If filter is not specified, the one assumed is [{type: "browser", exclude: true}, {}]
+  # (i.e. include everything but browser).
   experimental type TargetFilter extends array of FilterEntry
 
   experimental type RemoteLocation extends object
```

## Roll protocol to r1029622 — _2022-07-29T04:36:32.000Z_
######  Diff: [`d36a521...1ad73ad`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d36a521...1ad73ad`)

```diff
@@ browser_protocol.pdl:9326 @@ domain Target
       experimental optional Page.FrameId openerFrameId
       experimental optional Browser.BrowserContextID browserContextId
 
-  # A filter used by target query/discovery/auto-attach operations.
-  experimental type FilterEntry extends object
-    properties
-      # If set, causes exclusion of mathcing targets from the list.
-      # The remainder of filter entries in the filter arrat are ignored.
-      optional boolean exclude
-      # If not present, matches any type.
-      optional string type
-
-  # If filter is not specified, the one assumed is [{type: "browser", exclude: true}, {}]
-  # (i.e. include everything but browser).
-  experimental type TargetFilter extends array of FilterEntry
-
   experimental type RemoteLocation extends object
     properties
       string host
@@ -9402,6 +9389,7 @@ domain Target
       # An optional list of origins to grant unlimited cross-origin access to.
       # Parts of the URL other than those constituting origin are ignored.
       optional array of string originsWithUniversalNetworkAccess
+
     returns
       # The id of the context created.
       Browser.BrowserContextID browserContextId
@@ -9458,11 +9446,6 @@ domain Target
 
   # Retrieves a list of available targets.
   command getTargets
-    parameters
-      # Only targets matching filter will be reported. If filter is not specified
-      # and target discovery is currently enabled, a filter used for target discovery
-      # is used for consistency.
-      experimental optional TargetFilter filter
     returns
       # The list of targets.
       array of TargetInfo targetInfos
@@ -9494,8 +9477,6 @@ domain Target
       # We plan to make this the default, deprecate non-flattened mode,
       # and eventually retire it. See crbug.com/991325.
       optional boolean flatten
-      # Only targets matching filter will be attached.
-      experimental optional TargetFilter filter
 
   # Adds the specified target to the list of targets that will be monitored for any related target
   # creation (such as child frames, child workers and new versions of service worker) and reported
@@ -9508,8 +9489,6 @@ domain Target
       # Whether to pause new targets when attaching to them. Use `Runtime.runIfWaitingForDebugger`
       # to run paused targets.
       boolean waitForDebuggerOnStart
-      # Only targets matching filter will be attached.
-      experimental optional TargetFilter filter
 
   # Controls whether to discover available targets and notify via
   # `targetCreated/targetInfoChanged/targetDestroyed` events.
@@ -9517,9 +9496,6 @@ domain Target
     parameters
       # Whether to discover available targets.
       boolean discover
-      # Only targets matching filter will be attached. If `discover` is false,
-      # `filter` must be omitted or empty.
-      experimental optional TargetFilter filter
 
   # Enables target discovery for the specified locations, when `setDiscoverTargets` was set to
   # `true`.
```

## Roll protocol to r1029085 — _2022-07-28T04:34:38.000Z_
######  Diff: [`47224e5...d36a521`](https://github.com/ChromeDevTools/devtools-protocol/compare/`47224e5...d36a521`)

```diff
@@ browser_protocol.pdl:699 @@ experimental domain Audits
   type AttributionReportingIssueType extends string
     enum
       PermissionPolicyDisabled
+      # TODO(apaseltiner): Remove this once it is no longer referenced by the frontend.
+      AttributionSourceUntrustworthyOrigin
+      # TODO(apaseltiner): Remove this once it is no longer referenced by the frontend.
+      AttributionUntrustworthyOrigin
       UntrustworthyReportingOrigin
       InsecureContext
       # TODO(apaseltiner): Rename this to InvalidRegisterSourceHeader
       InvalidHeader
       InvalidRegisterTriggerHeader
-      InvalidEligibleHeader
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
   type AttributionReportingIssueDetails extends object
     properties
       AttributionReportingIssueType violationType
+      # TODO(apaseltiner): Remove this once it is no longer referenced by the frontend.
+      optional AffectedFrame frame
       optional AffectedRequest request
       optional DOM.BackendNodeId violatingNodeId
       optional string invalidParameter
@@ -4120,11 +4125,8 @@ experimental domain IndexedDB
   # Requests data from object store or index.
   command requestData
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
-      optional string securityOrigin
-      # Storage key.
-      optional string storageKey
+      string securityOrigin
       # Database name.
       string databaseName
       # Object store name.
@@ -4166,11 +4168,8 @@ experimental domain IndexedDB
   # Requests database with given name in given frame.
   command requestDatabase
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
-      optional string securityOrigin
-      # Storage key.
-      optional string storageKey
+      string securityOrigin
       # Database name.
       string databaseName
     returns
```

## Roll protocol to r1028580 — _2022-07-27T04:39:00.000Z_
######  Diff: [`51ea7c8...47224e5`](https://github.com/ChromeDevTools/devtools-protocol/compare/`51ea7c8...47224e5`)

```diff
@@ browser_protocol.pdl:782 @@ experimental domain Audits
       ObsoleteWebRtcCipherSuite
       OpenWebDatabaseInsecureContext
       OverflowVisibleOnReplacedElement
-      PersistentQuotaType
       PictureSourceSrc
       PrefixedCancelAnimationFrame
       PrefixedRequestAnimationFrame
@@ -4106,11 +4105,7 @@ experimental domain IndexedDB
   # Delete a range of entries from an object store
   command deleteObjectStoreEntries
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
-      # Security origin.
-      optional string securityOrigin
-      # Storage key.
-      optional string storageKey
+      string securityOrigin
       string databaseName
       string objectStoreName
       # Range of entry keys to delete
@@ -4148,11 +4143,8 @@ experimental domain IndexedDB
   # Gets metadata of an object store
   command getMetadata
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
-      optional string securityOrigin
-      # Storage key.
-      optional string storageKey
+      string securityOrigin
       # Database name.
       string databaseName
       # Object store name.
```

## Roll protocol to r1028116 — _2022-07-26T04:49:26.000Z_
######  Diff: [`5036b2e...2a10dd2`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5036b2e...2a10dd2`)

```diff
@@ browser_protocol.pdl:699 @@ experimental domain Audits
   type AttributionReportingIssueType extends string
     enum
       PermissionPolicyDisabled
-      # TODO(apaseltiner): Remove this once it is no longer referenced by the frontend.
       AttributionSourceUntrustworthyOrigin
-      # TODO(apaseltiner): Remove this once it is no longer referenced by the frontend.
       AttributionUntrustworthyOrigin
-      UntrustworthyReportingOrigin
-      InsecureContext
-      # TODO(apaseltiner): Rename this to InvalidRegisterSourceHeader
       InvalidHeader
-      InvalidRegisterTriggerHeader
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
   type AttributionReportingIssueDetails extends object
     properties
       AttributionReportingIssueType violationType
-      # TODO(apaseltiner): Remove this once it is no longer referenced by the frontend.
       optional AffectedFrame frame
       optional AffectedRequest request
       optional DOM.BackendNodeId violatingNodeId
@@ -4081,11 +4074,8 @@ experimental domain IndexedDB
   # Clears all entries from an object store.
   command clearObjectStore
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
-      optional string securityOrigin
-      # Storage key.
-      optional string storageKey
+      string securityOrigin
       # Database name.
       string databaseName
       # Object store name.
@@ -4094,11 +4084,8 @@ experimental domain IndexedDB
   # Deletes a database.
   command deleteDatabase
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
-      optional string securityOrigin
-      # Storage key.
-      optional string storageKey
+      string securityOrigin
       # Database name.
       string databaseName
 
@@ -8439,10 +8426,6 @@ domain Page
       EmbedderTriggeredAndSameOriginRedirected
       EmbedderTriggeredAndCrossOriginRedirected
       EmbedderTriggeredAndDestroyed
-      MemoryLimitExceeded
-      # Prerenders can be cancelled when Chrome uses excessive memory. This is
-      # recorded when it fails to get the memory usage.
-      FailToGetMemoryUsage
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
```

## Roll protocol to r1027518 — _2022-07-23T04:32:37.000Z_
######  Diff: [`84a4545...5036b2e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`84a4545...5036b2e`)

```diff
@@ js_protocol.pdl:261 @@ domain Debugger
       optional string streamId
       # The total number of lines in the disassembly text.
       integer totalNumberOfLines
-      # The offsets of all function bodies, in the format [start1, end1,
-      # start2, end2, ...] where all ends are exclusive.
+      # The offsets of all function bodies plus one additional entry pointing
+      # one by past the end of the last function.
       array of integer functionBodyOffsets
       # The first chunk of disassembly.
       WasmDisassemblyChunk chunk
```

## Roll protocol to r1027117 — _2022-07-22T04:34:56.000Z_
######  Diff: [`d99c911...84a4545`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d99c911...84a4545`)

```diff
@@ browser_protocol.pdl:168 @@ experimental domain Accessibility
       optional array of AXProperty ignoredReasons
       # This `Node`'s role, whether explicit or implicit.
       optional AXValue role
-      # This `Node`'s Chrome raw role.
-      optional AXValue chromeRole
       # The accessible name for this `Node`.
       optional AXValue name
       # The accessible description for this `Node`.
@@ -774,7 +772,6 @@ experimental domain Audits
       NotificationPermissionRequestedIframe
       ObsoleteWebRtcCipherSuite
       OpenWebDatabaseInsecureContext
-      OverflowVisibleOnReplacedElement
       PictureSourceSrc
       PrefixedCancelAnimationFrame
       PrefixedRequestAnimationFrame
@@ -2685,7 +2682,7 @@ domain DOM
       array of NodeId nodeIds
 
   # Returns NodeIds of current top layer elements.
-  # Top layer is rendered closest to the user within a viewport, therefore its elements always
+  # Top layer is rendered closest to the user within a viewport, therefore its elements always 
   # appear on top of all other content.
   experimental command getTopLayerElements
     returns
@@ -8993,14 +8990,6 @@ experimental domain Storage
       # Comma separated list of StorageType to clear.
       string storageTypes
 
-  # Clears storage for storage key.
-  command clearDataForStorageKey
-    parameters
-      # Storage key.
-      string storageKey
-      # Comma separated list of StorageType to clear.
-      string storageTypes
-
   # Returns all browser cookies.
   command getCookies
     parameters
```

## Roll protocol to r1026613 — _2022-07-21T04:34:49.000Z_
######  Diff: [`523543a...d99c911`](https://github.com/ChromeDevTools/devtools-protocol/compare/`523543a...d99c911`)

```diff
@@ browser_protocol.pdl:765 @@ experimental domain Audits
       LocalCSSFileExtensionRejected
       MediaSourceAbortRemove
       MediaSourceDurationTruncatingBuffered
-      NavigateEventRestoreScroll
-      NavigateEventTransitionWhile
       NoSysexWebMIDIWithoutPermission
       NotificationInsecureOrigin
       NotificationPermissionRequestedIframe
```

## Roll protocol to r1026105 — _2022-07-20T04:34:23.000Z_
######  Diff: [`c9c207e...523543a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`c9c207e...523543a`)

```diff
@@ browser_protocol.pdl:754 @@ experimental domain Audits
       DeprecationExample
       DocumentDomainSettingWithoutOriginAgentClusterHeader
       EventPath
-      ExpectCTHeader
       GeolocationInsecureOrigin
       GeolocationInsecureOriginDeprecatedNotRemoved
       GetUserMediaInsecureOrigin
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index 7fd51df..8e43695 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -244,40 +244,6 @@ domain Debugger
       # Wasm bytecode.
       optional binary bytecode
 
-  experimental type WasmDisassemblyChunk extends object
-    properties
-      # The next chunk of disassembled lines.
-      array of string lines
-      # The bytecode offsets describing the start of each line.
-      array of integer bytecodeOffsets
-
-  experimental command disassembleWasmModule
-    parameters
-      # Id of the script to disassemble
-      Runtime.ScriptId scriptId
-    returns
-      # For large modules, return a stream from which additional chunks of
-      # disassembly can be read successively.
-      optional string streamId
-      # The total number of lines in the disassembly text.
-      integer totalNumberOfLines
-      # The offsets of all function bodies plus one additional entry pointing
-      # one by past the end of the last function.
-      array of integer functionBodyOffsets
-      # The first chunk of disassembly.
-      WasmDisassemblyChunk chunk
-
-  # Disassemble the next chunk of lines for the module corresponding to the
-  # stream. If disassembly is complete, this API will invalidate the streamId
-  # and return an empty chunk. Any subsequent calls for the now invalid stream
-  # will return errors.
-  experimental command nextWasmDisassemblyChunk
-    parameters
-      string streamId
-    returns
-      # The next chunk of disassembly.
-      WasmDisassemblyChunk chunk
-
   # This command is deprecated. Use getScriptSource instead.
   deprecated command getWasmBytecode
     parameters
```

## Roll protocol to r1025565 — _2022-07-19T04:49:30.000Z_
######  Diff: [`4946b04...d27d2d7`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4946b04...d27d2d7`)

```diff
@@ browser_protocol.pdl:754 @@ experimental domain Audits
       DeprecationExample
       DocumentDomainSettingWithoutOriginAgentClusterHeader
       EventPath
+      ExpectCTHeader
       GeolocationInsecureOrigin
       GeolocationInsecureOriginDeprecatedNotRemoved
       GetUserMediaInsecureOrigin
@@ -5104,12 +5105,6 @@ domain Network
       array of SignedCertificateTimestamp signedCertificateTimestampList
       # Whether the request complied with Certificate Transparency policy
       CertificateTransparencyCompliance certificateTransparencyCompliance
-      # The signature algorithm used by the server in the TLS server signature,
-      # represented as a TLS SignatureScheme code point. Omitted if not
-      # applicable or not known.
-      optional integer serverSignatureAlgorithm
-      # Whether the connection used Encrypted ClientHello
-      boolean encryptedClientHello
 
   # Whether the request complied with Certificate Transparency policy.
   type CertificateTransparencyCompliance extends string
```

## Roll protocol to r1025007 — _2022-07-16T04:32:11.000Z_
######  Diff: [`a7636c9...7263e11`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a7636c9...7263e11`)

```diff
@@ browser_protocol.pdl:754 @@ experimental domain Audits
       DeprecationExample
       DocumentDomainSettingWithoutOriginAgentClusterHeader
       EventPath
-      ExpectCTHeader
       GeolocationInsecureOrigin
       GeolocationInsecureOriginDeprecatedNotRemoved
       GetUserMediaInsecureOrigin
@@ -4876,7 +4875,6 @@ domain Network
       TextTrack
       XHR
       Fetch
-      Prefetch
       EventSource
       WebSocket
       Manifest
```

## Roll protocol to r1024111 — _2022-07-14T04:35:31.000Z_
######  Diff: [`ec96605...28ec0d8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ec96605...28ec0d8`)

```diff
@@ browser_protocol.pdl:7109 @@ domain Page
       screen-wake-lock
       serial
       shared-autofill
-      shared-storage
       storage-access-api
       sync-xhr
       trust-token-redemption
@@ -8413,6 +8412,10 @@ domain Page
       EmbedderTriggeredAndSameOriginRedirected
       EmbedderTriggeredAndCrossOriginRedirected
       EmbedderTriggeredAndDestroyed
+      MemoryLimitExceeded
+      # Prerenders can be cancelled when Chrome uses excessive memory. This is
+      # recorded when it fails to get the memory usage.
+      FailToGetMemoryUsage
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
```

## Roll protocol to r1023572 — _2022-07-13T04:33:15.000Z_
######  Diff: [`e4b5ddd...3f04136`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e4b5ddd...3f04136`)

```diff
@@ browser_protocol.pdl:8412 @@ domain Page
       EmbedderTriggeredAndSameOriginRedirected
       EmbedderTriggeredAndCrossOriginRedirected
       EmbedderTriggeredAndDestroyed
-      MemoryLimitExceeded
-      # Prerenders can be cancelled when Chrome uses excessive memory. This is
-      # recorded when it fails to get the memory usage.
-      FailToGetMemoryUsage
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
```

## Roll protocol to r1022601 — _2022-07-11T07:28:20.000Z_
######  Diff: [`5cde748...82bd267`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5cde748...82bd267`)

```diff
@@ browser_protocol.pdl:1811 @@ experimental domain CSS
       optional array of InheritedPseudoElementMatches inheritedPseudoElements
       # A list of CSS keyframed animations matching this node.
       optional array of CSSKeyframesRule cssKeyframesRules
-      # Id of the first parent element that does not have display: contents.
-      experimental optional DOM.NodeId parentLayoutNodeId
 
   # Returns all media queries parsed by the rendering engine.
   command getMediaQueries
```

## Roll protocol to r1019158 — _2022-06-29T15:28:08.000Z_
######  Diff: [`a0e4067...f41d3ce`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a0e4067...f41d3ce`)

```diff
@@ browser_protocol.pdl:758 @@ experimental domain Audits
       GeolocationInsecureOriginDeprecatedNotRemoved
       GetUserMediaInsecureOrigin
       HostCandidateAttributeGetter
-      IdentityInCanMakePaymentEvent
       InsecurePrivateNetworkSubresourceRequest
       LegacyConstraintGoogIPv6
       LocalCSSFileExtensionRejected
@@ -768,7 +767,6 @@ experimental domain Audits
       NotificationInsecureOrigin
       NotificationPermissionRequestedIframe
       ObsoleteWebRtcCipherSuite
-      OpenWebDatabaseInsecureContext
       PictureSourceSrc
       PrefixedCancelAnimationFrame
       PrefixedRequestAnimationFrame
@@ -1332,8 +1330,6 @@ experimental domain CSS
     properties
       # Pseudo element type.
       DOM.PseudoType pseudoType
-      # Pseudo element custom ident.
-      optional string pseudoIdentifier
       # Matches of CSS rules applicable to the pseudo style.
       array of RuleMatch matches
 
@@ -1444,9 +1440,6 @@ experimental domain CSS
       # Cascade layer array. Contains the layer hierarchy that this rule belongs to starting
       # with the innermost layer and going outwards.
       experimental optional array of CSSLayer layers
-      # @scope CSS at-rule array.
-      # The array enumerates @scope at-rules starting with the innermost one, going outwards.
-      experimental optional array of CSSScope scopes
 
   # CSS coverage information.
   type RuleUsage extends object
@@ -1596,17 +1589,6 @@ experimental domain CSS
       # Identifier of the stylesheet containing this object (if exists).
       optional StyleSheetId styleSheetId
 
-  # CSS Scope at-rule descriptor.
-  experimental type CSSScope extends object
-    properties
-      # Scope rule text.
-      string text
-      # The associated rule header range in the enclosing stylesheet (if
-      # available).
-      optional SourceRange range
-      # Identifier of the stylesheet containing this object (if exists).
-      optional StyleSheetId styleSheetId
-
   # CSS Layer at-rule descriptor.
   experimental type CSSLayer extends object
     properties
@@ -1667,8 +1649,6 @@ experimental domain CSS
       string fontWeight
       # The font-stretch.
       string fontStretch
-      # The font-display.
-      string fontDisplay
       # The unicode-range.
       string unicodeRange
       # The src.
@@ -1909,16 +1889,6 @@ experimental domain CSS
       # The resulting CSS Supports rule after modification.
       CSSSupports supports
 
-  # Modifies the expression of a scope at-rule.
-  experimental command setScopeText
-    parameters
-      StyleSheetId styleSheetId
-      SourceRange range
-      string text
-    returns
-      # The resulting CSS Scope rule after modification.
-      CSSScope scope
-
   # Modifies the rule selector.
   command setRuleSelector
     parameters
@@ -2278,9 +2248,6 @@ domain DOM
       optional string value
       # Pseudo element type for this node.
       optional PseudoType pseudoType
-      # Pseudo element identifier for this node. Only present if there is a
-      # valid pseudoType.
-      optional string pseudoIdentifier
       # Shadow root type.
       optional ShadowRootType shadowRootType
       # Frame ID for frame owner elements.
@@ -2676,14 +2643,6 @@ domain DOM
       # Query selector result.
       array of NodeId nodeIds
 
-  # Returns NodeIds of current top layer elements.
-  # Top layer is rendered closest to the user within a viewport, therefore its elements always 
-  # appear on top of all other content.
-  experimental command getTopLayerElements
-    returns
-      # NodeIds of top layer elements
-      array of NodeId nodeIds
-
   # Re-does the last undone action.
   experimental command redo
 
@@ -2944,9 +2903,6 @@ domain DOM
       # The added pseudo element.
       Node pseudoElement
 
-  # Called when top layer elements are changed.
-  experimental event topLayerElementsUpdated
-
   # Called when a pseudo element is removed from an element.
   experimental event pseudoElementRemoved
     parameters
@@ -3324,9 +3280,6 @@ experimental domain DOMSnapshot
       optional RareIntegerData contentDocumentIndex
       # Type of a pseudo element node.
       optional RareStringData pseudoType
-      # Pseudo element identifier for this node. Only present if there is a
-      # valid pseudoType.
-      optional RareStringData pseudoIdentifier
       # Whether this DOM node responds to mouse clicks. This includes nodes that have had click
       # event listeners attached via JavaScript as well as anchor tags that naturally navigate when
       # clicked.
@@ -7083,7 +7036,6 @@ domain Page
       encrypted-media
       execution-while-out-of-viewport
       execution-while-not-rendered
-      federated-credentials
       focus-without-user-activation
       fullscreen
       frobulate
@@ -7125,8 +7077,6 @@ domain Page
       IframeAttribute
       # Inside fenced frame.
       InFencedFrameTree
-      # Inside an Isolated Application.
-      InIsolatedApp
 
   experimental type PermissionsPolicyBlockLocator extends object
     properties
@@ -8032,12 +7982,12 @@ domain Page
     parameters
       # Id of the frame containing input node.
       experimental FrameId frameId
+      # Input node id.
+      experimental DOM.BackendNodeId backendNodeId
       # Input mode.
       enum mode
         selectSingle
         selectMultiple
-      # Input node id. Only present for file choosers opened via an <input type="file"> element.
-      experimental optional DOM.BackendNodeId backendNodeId
 
   # Fired when frame has been attached to its parent.
   event frameAttached
@@ -9543,9 +9493,6 @@ experimental domain Tracing
         recordContinuously
         recordAsMuchAsPossible
         echoToConsole
-      # Size of the trace buffer in kilobytes. If not specified or zero is passed, a default value
-      # of 200 MB would be used.
-      optional number traceBufferSizeInKb
       # Turns on JavaScript stack sampling.
       optional boolean enableSampling
       # Turns on system tracing.
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index 8e43695..18cf0c7 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -441,12 +441,6 @@ domain Debugger
       Runtime.CallArgument newValue
 
   # Edits JavaScript source live.
-  #
-  # In general, functions that are currently on the stack can not be edited with
-  # a single exception: If the edited function is the top-most stack frame and
-  # that is the only activation of that function on the stack. In this case
-  # the live edit will be successful and a `Debugger.restartFrame` for the
-  # top-most function is automatically triggered.
   command setScriptSource
     parameters
       # Id of the script to edit.
@@ -456,27 +450,16 @@ domain Debugger
       #  If true the change will not actually be applied. Dry run may be used to get result
       # description without actually modifying the code.
       optional boolean dryRun
-      # If true, then `scriptSource` is allowed to change the function on top of the stack
-      # as long as the top-most stack frame is the only activation of that function.
-      experimental optional boolean allowTopFrameEditing
     returns
       # New stack trace in case editing has happened while VM was stopped.
-      deprecated optional array of CallFrame callFrames
+      optional array of CallFrame callFrames
       # Whether current call stack  was modified after applying the changes.
-      deprecated optional boolean stackChanged
+      optional boolean stackChanged
       # Async stack trace, if any.
-      deprecated optional Runtime.StackTrace asyncStackTrace
+      optional Runtime.StackTrace asyncStackTrace
       # Async stack trace, if any.
-      deprecated optional Runtime.StackTraceId asyncStackTraceId
-      # Whether the operation was successful or not. Only `Ok` denotes a
-      # successful live edit while the other enum variants denote why
-      # the live edit failed.
-      experimental enum status
-        Ok
-        CompileError
-        BlockedByActiveGenerator
-        BlockedByActiveFunction
-      # Exception details if any. Only present when `status` is `CompileError`.
+      experimental optional Runtime.StackTraceId asyncStackTraceId
+      # Exception details if any.
       optional Runtime.ExceptionDetails exceptionDetails
 
   # Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc).
```

## Roll protocol to r1011700 — _2022-06-07T22:15:32.000Z_
######  Diff: [`1ed415a...44cc592`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1ed415a...44cc592`)

```diff
@@ js_protocol.pdl:273 @@ domain Debugger
     parameters
       BreakpointId breakpointId
 
-  # Restarts particular call frame from the beginning. The old, deprecated
-  # behavior of `restartFrame` is to stay paused and allow further CDP commands
-  # after a restart was scheduled. This can cause problems with restarting, so
-  # we now continue execution immediatly after it has been scheduled until we
-  # reach the beginning of the restarted frame.
-  #
-  # To stay back-wards compatible, `restartFrame` now expects a `mode`
-  # parameter to be present. If the `mode` parameter is missing, `restartFrame`
-  # errors out.
-  #
-  # The various return values are deprecated and `callFrames` is always empty.
-  # Use the call frames from the `Debugger#paused` events instead, that fires
-  # once V8 pauses at the beginning of the restarted function.
-  command restartFrame
+  # Restarts particular call frame from the beginning.
+  deprecated command restartFrame
     parameters
       # Call frame identifier to evaluate on.
       CallFrameId callFrameId
-      # The `mode` parameter must be present and set to 'StepInto', otherwise
-      # `restartFrame` will error out.
-      experimental optional enum mode
-        # Pause at the beginning of the restarted function
-        StepInto
     returns
       # New stack trace.
-      deprecated array of CallFrame callFrames
+      array of CallFrame callFrames
       # Async stack trace, if any.
-      deprecated optional Runtime.StackTrace asyncStackTrace
+      optional Runtime.StackTrace asyncStackTrace
       # Async stack trace, if any.
-      deprecated optional Runtime.StackTraceId asyncStackTraceId
+      experimental optional Runtime.StackTraceId asyncStackTraceId
 
   # Resumes JavaScript execution.
   command resume
@@ -730,24 +713,18 @@ experimental domain HeapProfiler
       # If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken
       # when the tracking is stopped.
       optional boolean reportProgress
-      # Deprecated in favor of `exposeInternals`.
-      deprecated optional boolean treatGlobalObjectsAsRoots
+      optional boolean treatGlobalObjectsAsRoots
       # If true, numerical values are included in the snapshot
       optional boolean captureNumericValue
-      # If true, exposes internals of the snapshot.
-      experimental optional boolean exposeInternals
 
   command takeHeapSnapshot
     parameters
       # If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.
       optional boolean reportProgress
-      # If true, a raw snapshot without artificial roots will be generated.
-      # Deprecated in favor of `exposeInternals`.
-      deprecated optional boolean treatGlobalObjectsAsRoots
+      # If true, a raw snapshot without artificial roots will be generated
+      optional boolean treatGlobalObjectsAsRoots
       # If true, numerical values are included in the snapshot
       optional boolean captureNumericValue
-      # If true, exposes internals of the snapshot.
-      experimental optional boolean exposeInternals
 
   event addHeapSnapshotChunk
     parameters
```

## Roll protocol to r1010518 — _2022-06-03T11:15:25.000Z_
######  Diff: [`b877f90...1ed415a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`b877f90...1ed415a`)

```diff
@@ browser_protocol.pdl:6955 @@ domain Page
       AdFrameType adFrameType
       optional array of AdFrameExplanation explanations
 
-  # Identifies the bottom-most script which caused the frame to be labelled
-  # as an ad.
-  experimental type AdScriptId extends object
-    properties
-      # Script Id of the bottom-most script which caused the frame to be labelled
-      # as an ad.
-      Runtime.ScriptId scriptId
-      # Id of adScriptId's debugger.
-      Runtime.UniqueDebuggerId debuggerId
-
   # Indicates whether the frame is a secure context and why it is the case.
   experimental type SecureContextType extends string
     enum
@@ -7998,9 +7988,6 @@ domain Page
       FrameId parentFrameId
       # JavaScript stack trace of when frame was attached, only set if frame initiated from script.
       optional Runtime.StackTrace stack
-      # Identifies the bottom-most script which caused the frame to be labelled
-      # as an ad. Only sent if frame is labelled as an ad and id is available.
-      experimental optional AdScriptId adScriptId
 
   # Fired when frame no longer has a scheduled navigation.
   deprecated event frameClearedScheduledNavigation
```

## Roll protocol to r1010249 — _2022-06-02T20:15:24.000Z_
######  Diff: [`741c799...4ef6135`](https://github.com/ChromeDevTools/devtools-protocol/compare/`741c799...4ef6135`)

```diff
@@ browser_protocol.pdl:767 @@ experimental domain Audits
       NotificationInsecureOrigin
       NotificationPermissionRequestedIframe
       ObsoleteWebRtcCipherSuite
+      PaymentRequestBasicCard
       PictureSourceSrc
       PrefixedCancelAnimationFrame
       PrefixedRequestAnimationFrame
```

## Roll protocol to r1010123 — _2022-06-02T16:15:31.000Z_
######  Diff: [`a3a4df3...741c799`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a3a4df3...741c799`)

```diff
@@ browser_protocol.pdl:702 @@ experimental domain Audits
       InvalidHeader
 
   # Details for issues around "Attribution Reporting API" usage.
-  # Explainer: https://github.com/WICG/attribution-reporting-api
+  # Explainer: https://github.com/WICG/conversion-measurement-api
   type AttributionReportingIssueDetails extends object
     properties
       AttributionReportingIssueType violationType
```

## Roll protocol to r1009745 — _2022-06-01T19:15:37.000Z_
######  Diff: [`a56eb21...a3a4df3`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a56eb21...a3a4df3`)

```diff
@@ browser_protocol.pdl:6312 @@ domain Network
     enum
       SameOrigin
       SameOriginAllowPopups
-      RestrictProperties
       UnsafeNone
       SameOriginPlusCoep
-      RestrictPropertiesPlusCoep
+      SameOriginAllowPopupsPlusCoep
 
   experimental type CrossOriginOpenerPolicyStatus extends object
     properties
```

## Roll protocol to r1008748 — _2022-05-30T07:15:13.000Z_
######  Diff: [`bc53a73...a56eb21`](https://github.com/ChromeDevTools/devtools-protocol/compare/`bc53a73...a56eb21`)

```diff
@@ browser_protocol.pdl:8248 @@ domain Page
       ContentMediaDevicesDispatcherHost
       ContentWebBluetooth
       ContentWebUSB
+      ContentMediaSession
       ContentMediaSessionService
       ContentScreenReader
```

## Roll protocol to r1007616 — _2022-05-25T23:15:13.000Z_
######  Diff: [`7e4a41a...82c45d0`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7e4a41a...82c45d0`)

```diff
@@ browser_protocol.pdl:6999 @@ domain Page
       ch-device-memory
       ch-downlink
       ch-ect
+      ch-partitioned-cookies
       ch-prefers-color-scheme
       ch-rtt
       ch-save-data
```

## Roll protocol to r1007249 — _2022-05-25T06:15:14.000Z_
######  Diff: [`cb58d1b...7e4a41a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`cb58d1b...7e4a41a`)

```diff
@@ browser_protocol.pdl:6999 @@ domain Page
       ch-device-memory
       ch-downlink
       ch-ect
-      ch-partitioned-cookies
       ch-prefers-color-scheme
       ch-rtt
       ch-save-data
```

## Roll protocol to r1007179 — _2022-05-25T01:15:17.000Z_
######  Diff: [`9b60b54...cb58d1b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`9b60b54...cb58d1b`)

```diff
@@ browser_protocol.pdl:6999 @@ domain Page
       ch-device-memory
       ch-downlink
       ch-ect
+      ch-partitioned-cookies
       ch-prefers-color-scheme
       ch-rtt
       ch-save-data
```

## Roll protocol to r1006825 — _2022-05-24T10:15:23.000Z_
######  Diff: [`fff96f6...09fd7be`](https://github.com/ChromeDevTools/devtools-protocol/compare/`fff96f6...09fd7be`)

```diff
@@ browser_protocol.pdl:785 @@ experimental domain Audits
       RTCPeerConnectionComplexPlanBSdpUsingDefaultSdpSemantics
       RTCPeerConnectionSdpSemanticsPlanB
       RtcpMuxPolicyNegotiate
+      RTPDataChannel
       SharedArrayBufferConstructedWithoutIsolation
       TextToSpeech_DisallowedByAutoplay
       V8SharedArrayBufferConstructedInExtensionWithoutIsolation
```

## Roll protocol to r1005767 — _2022-05-20T14:15:15.000Z_
######  Diff: [`44eb39e...fff96f6`](https://github.com/ChromeDevTools/devtools-protocol/compare/`44eb39e...fff96f6`)

```diff
@@ browser_protocol.pdl:3808 @@ domain Emulation
       # Image types to disable.
       array of DisabledImageType imageTypes
 
-  experimental command setHardwareConcurrencyOverride
-    parameters
-      # Hardware concurrency to report
-      integer hardwareConcurrency
-
   # Allows overriding user agent with the given string.
   command setUserAgentOverride
     parameters
```

## Roll protocol to r1005560 — _2022-05-20T01:15:18.000Z_
######  Diff: [`363a231...44eb39e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`363a231...44eb39e`)

```diff
@@ browser_protocol.pdl:751 @@ experimental domain Audits
       CrossOriginWindowAlert
       CrossOriginWindowConfirm
       CSSSelectorInternalMediaControlsOverlayCastButton
+      CustomCursorIntersectsViewport
       DeprecationExample
       DocumentDomainSettingWithoutOriginAgentClusterHeader
       EventPath
```

## Roll protocol to r1005172 — _2022-05-19T09:15:19.000Z_
######  Diff: [`210ddf8...363a231`](https://github.com/ChromeDevTools/devtools-protocol/compare/`210ddf8...363a231`)

```diff
@@ browser_protocol.pdl:3434 @@ experimental domain DOMStorage
       string key
       string value
 
+  command getStorageKeyForFrame
+    parameters
+      Page.FrameId frameId
+    returns
+      SerializedStorageKey storageKey
+
   event domStorageItemAdded
     parameters
       StorageId storageId
@@ -8898,13 +8904,6 @@ experimental domain Storage
       array of InterestGroupAd ads
       array of InterestGroupAd adComponents
 
-  # Returns a storage key given a frame id.
-  command getStorageKeyForFrame
-    parameters
-      Page.FrameId frameId
-    returns
-      SerializedStorageKey storageKey
-
   # Clears storage for origin.
   command clearDataForOrigin
     parameters
```

## Roll protocol to r1004730 — _2022-05-18T13:15:20.000Z_
######  Diff: [`838223b...210ddf8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`838223b...210ddf8`)

```diff
@@ browser_protocol.pdl:769 @@ experimental domain Audits
       NotificationPermissionRequestedIframe
       ObsoleteWebRtcCipherSuite
       PaymentRequestBasicCard
+      PaymentRequestShowWithoutGesture
       PictureSourceSrc
       PrefixedCancelAnimationFrame
       PrefixedRequestAnimationFrame
```

## Roll protocol to r1004709 — _2022-05-18T12:15:18.000Z_
######  Diff: [`cdd508b...838223b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`cdd508b...838223b`)

```diff
@@ browser_protocol.pdl:762 @@ experimental domain Audits
       InsecurePrivateNetworkSubresourceRequest
       LegacyConstraintGoogIPv6
       LocalCSSFileExtensionRejected
+      MediaElementAudioSourceNode
       MediaSourceAbortRemove
       MediaSourceDurationTruncatingBuffered
       NoSysexWebMIDIWithoutPermission
```

## Roll protocol to r1004164 — _2022-05-17T09:15:39.000Z_
######  Diff: [`218b848...cdd508b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`218b848...cdd508b`)

```diff
@@ browser_protocol.pdl:2274 @@ domain DOM
       # Whether the node is SVG.
       optional boolean isSVG
       optional CompatibilityMode compatibilityMode
-      optional BackendNode assignedSlot
 
   # A structure holding an RGBA color.
   type RGBA extends object
```

## Roll protocol to r1004052 — _2022-05-17T01:15:19.000Z_
######  Diff: [`deb61a0...218b848`](https://github.com/ChromeDevTools/devtools-protocol/compare/`deb61a0...218b848`)

```diff
@@ browser_protocol.pdl:6996 @@ domain Page
       ambient-light-sensor
       attribution-reporting
       autoplay
-      bluetooth
       browsing-topics
       camera
       ch-dpr
```

## Roll protocol to r1003898 — _2022-05-16T20:15:25.000Z_
######  Diff: [`6db5938...deb61a0`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6db5938...deb61a0`)

```diff
@@ browser_protocol.pdl:7634 @@ domain Page
     returns
       # Frame id that has navigated (or failed to navigate)
       FrameId frameId
-      # Loader identifier. This is omitted in case of same-document navigation,
-      # as the previously committed loaderId would not change.
+      # Loader identifier.
       optional Network.LoaderId loaderId
       # User friendly error message, present if and only if navigation has failed.
       optional string errorText
```

## Roll protocol to r1002782 — _2022-05-12T19:15:18.000Z_
######  Diff: [`02d7a84...6db5938`](https://github.com/ChromeDevTools/devtools-protocol/compare/`02d7a84...6db5938`)

```diff
@@ browser_protocol.pdl:10120 @@ experimental domain WebAuthn
   # Enable the WebAuthn domain and start intercepting credential storage and
   # retrieval with a virtual authenticator.
   command enable
-    parameters
-      # Whether to enable the WebAuthn user interface. Enabling the UI is
-      # recommended for debugging and demo purposes, as it is closer to the real
-      # experience. Disabling the UI is recommended for automated testing.
-      # Supported at the embedder's discretion if UI is available.
-      # Defaults to false.
-      optional boolean enableUI
 
   # Disable the WebAuthn domain.
   command disable
```

## Roll protocol to r1001819 — _2022-05-11T00:15:32.000Z_
######  Diff: [`ae07002...02d7a84`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ae07002...02d7a84`)

```diff
@@ browser_protocol.pdl:8319 @@ domain Page
   type PrerenderFinalStatus extends string
     enum
       Activated
-      Destroyed
-      LowEndDevice
-      CrossOriginRedirect
-      CrossOriginNavigation
-      InvalidSchemeRedirect
-      InvalidSchemeNavigation
-      InProgressNavigation
-      NavigationRequestBlockedByCsp
-      MainFrameNavigation
-      MojoBinderPolicy
-      RendererProcessCrashed
-      RendererProcessKilled
-      Download
-      TriggerDestroyed
-      NavigationNotCommitted
-      NavigationBadHttpStatus
-      ClientCertRequested
-      NavigationRequestNetworkError
-      MaxNumOfRunningPrerendersExceeded
-      CancelAllHostsForTesting
-      DidFailLoad
-      Stop
-      SslCertificateError
-      LoginAuthRequested
-      UaChangeRequiresReload
-      BlockedByClient
-      AudioOutputDeviceRequested
-      MixedContent
-      TriggerBackgrounded
-      EmbedderTriggeredAndSameOriginRedirected
-      EmbedderTriggeredAndCrossOriginRedirected
-      EmbedderTriggeredAndDestroyed
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
```

## Roll protocol to r1001785 — _2022-05-10T23:15:25.000Z_
######  Diff: [`6d1c894...ae07002`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6d1c894...ae07002`)

```diff
@@ browser_protocol.pdl:699 @@ experimental domain Audits
       PermissionPolicyDisabled
       AttributionSourceUntrustworthyOrigin
       AttributionUntrustworthyOrigin
-      InvalidHeader
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
```

## Roll protocol to r1001754 — _2022-05-10T22:15:23.000Z_
######  Diff: [`4d9109d...6d1c894`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4d9109d...6d1c894`)

```diff
@@ browser_protocol.pdl:697 @@ experimental domain Audits
   type AttributionReportingIssueType extends string
     enum
       PermissionPolicyDisabled
+      InvalidAttributionSourceEventId
       AttributionSourceUntrustworthyOrigin
       AttributionUntrustworthyOrigin
+      InvalidAttributionSourceExpiry
+      InvalidAttributionSourcePriority
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
```

## Roll protocol to r1001033 — _2022-05-09T16:15:18.000Z_
######  Diff: [`4df4c30...4d9109d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4df4c30...4d9109d`)

```diff
@@ browser_protocol.pdl:788 @@ experimental domain Audits
       RTCConstraintEnableDtlsSrtpFalse
       RTCConstraintEnableDtlsSrtpTrue
       RTCPeerConnectionComplexPlanBSdpUsingDefaultSdpSemantics
+      RTCPeerConnectionLegacyCreateWithMediaConstraints
       RTCPeerConnectionSdpSemanticsPlanB
       RtcpMuxPolicyNegotiate
       RTPDataChannel
```

## Roll protocol to r1001016 — _2022-05-09T15:15:24.000Z_
######  Diff: [`1dd3de6...4df4c30`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1dd3de6...4df4c30`)

```diff
@@ browser_protocol.pdl:762 @@ experimental domain Audits
       GetUserMediaInsecureOrigin
       HostCandidateAttributeGetter
       InsecurePrivateNetworkSubresourceRequest
+      LegacyConstraintGoogCpuOveruseDetection
       LegacyConstraintGoogIPv6
+      LegacyConstraintGoogScreencastMinBitrate
+      LegacyConstraintGoogSuspendBelowMinBitrate
       LocalCSSFileExtensionRejected
       MediaElementAudioSourceNode
       MediaSourceAbortRemove
```

## Roll protocol to r1000974 — _2022-05-09T13:15:16.000Z_
######  Diff: [`a9ad264...1dd3de6`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a9ad264...1dd3de6`)

```diff
@@ browser_protocol.pdl:3399 @@ experimental domain DOMSnapshot
 # Query and modify DOM storage.
 experimental domain DOMStorage
 
-  type SerializedStorageKey extends string
-
   # DOM Storage identifier.
   type StorageId extends object
     properties
       # Security origin for the storage.
-      optional string securityOrigin
-      # Represents a key by which DOM Storage keys its CachedStorageAreas
-      optional SerializedStorageKey storageKey
+      string securityOrigin
       # Whether the storage is local storage (not session storage).
       boolean isLocalStorage
 
@@ -3441,12 +3437,6 @@ experimental domain DOMStorage
       string key
       string value
 
-  command getStorageKeyForFrame
-    parameters
-      Page.FrameId frameId
-    returns
-      SerializedStorageKey storageKey
-
   event domStorageItemAdded
     parameters
       StorageId storageId
@@ -8813,8 +8803,6 @@ experimental domain Storage
   depends on Browser
   depends on Network
 
-  type SerializedStorageKey extends string
-
   # Enum of possible storage types.
   type StorageType extends string
     enum
```

## Roll protocol to r1000917 — _2022-05-09T08:15:16.000Z_
######  Diff: [`93a65bd...a9ad264`](https://github.com/ChromeDevTools/devtools-protocol/compare/`93a65bd...a9ad264`)

```diff
@@ browser_protocol.pdl:795 @@ experimental domain Audits
       RTCPeerConnectionSdpSemanticsPlanB
       RtcpMuxPolicyNegotiate
       RTPDataChannel
+      SelectionAddRangeIntersect
       SharedArrayBufferConstructedWithoutIsolation
       TextToSpeech_DisallowedByAutoplay
       V8SharedArrayBufferConstructedInExtensionWithoutIsolation
```

## Roll protocol to r999451 — _2022-05-04T16:45:22.000Z_
######  Diff: [`3a7051b...93a65bd`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3a7051b...93a65bd`)

```diff
@@ js_protocol.pdl:559 @@ domain Debugger
       integer endColumn
       # Specifies script creation context.
       Runtime.ExecutionContextId executionContextId
-      # Content hash of the script, SHA-256.
+      # Content hash of the script.
       string hash
       # Embedder-specific auxiliary data.
       optional object executionContextAuxData
@@ -598,7 +598,7 @@ domain Debugger
       integer endColumn
       # Specifies script creation context.
       Runtime.ExecutionContextId executionContextId
-      # Content hash of the script, SHA-256.
+      # Content hash of the script.
       string hash
       # Embedder-specific auxiliary data.
       optional object executionContextAuxData
@@ -1347,9 +1347,7 @@ domain Runtime
       optional string objectGroup
       # Whether to throw an exception if side effect cannot be ruled out during evaluation.
       experimental optional boolean throwOnSideEffect
-      # Whether the result should contain `webDriverValue`, serialized according to
-      # https://w3c.github.io/webdriver-bidi. This is mutually exclusive with `returnByValue`, but
-      # resulting `objectId` is still provided.
+      # Whether the result should be serialized according to https://w3c.github.io/webdriver-bidi.
       experimental optional boolean generateWebDriverValue
     returns
       # Call result.
```

## Roll protocol to r998712 — _2022-05-03T03:15:18.000Z_
######  Diff: [`a6daed6...3a7051b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a6daed6...3a7051b`)

```diff
@@ browser_protocol.pdl:799 @@ experimental domain Audits
       SharedArrayBufferConstructedWithoutIsolation
       TextToSpeech_DisallowedByAutoplay
       V8SharedArrayBufferConstructedInExtensionWithoutIsolation
+      WebCodecsVideoFrameDefaultTimestamp
       XHRJSONEncodingDetection
       XMLHttpRequestSynchronousInNonWorkerOutsideBeforeUnload
       XRSupportsSession
```

## Roll protocol to r998277 — _2022-05-02T08:15:16.000Z_
######  Diff: [`10b0375...a6daed6`](https://github.com/ChromeDevTools/devtools-protocol/compare/`10b0375...a6daed6`)

```diff
@@ browser_protocol.pdl:2 @@ @@ -2,7 +2,7 @@
 # Use of this source code is governed by a BSD-style license that can be
 # found in the LICENSE file.
 #
-# Contributing to Chrome DevTools Protocol: https://goo.gle/devtools-contribution-guide-cdp
+# Contributing to Chrome DevTools Protocol: https://docs.google.com/document/d/1c-COD2kaK__5iMM5SEx-PzNA7HFmgttcYfOHHX0HaOM/edit?usp=sharing
 
 version
   major 1
@@ -3850,7 +3850,7 @@ experimental domain HeadlessExperimental
   # Sends a BeginFrame to the target and returns when the frame was completed. Optionally captures a
   # screenshot from the resulting frame. Requires that the target was created with enabled
   # BeginFrameControl. Designed for use with --run-all-compositor-stages-before-draw, see also
-  # https://goo.gle/chrome-headless-rendering for more background.
+  # https://goo.gl/3zHXhB for more background.
   command beginFrame
     parameters
       # Timestamp of this BeginFrame in Renderer TimeTicks (milliseconds of uptime). If not set,
```

## Roll protocol to r997803 — _2022-04-29T18:15:25.000Z_
######  Diff: [`83726e8...10b0375`](https://github.com/ChromeDevTools/devtools-protocol/compare/`83726e8...10b0375`)

```diff
@@ browser_protocol.pdl:744 @@ experimental domain Audits
   type DeprecationIssueType extends string
     enum
       AuthorizationCoveredByWildcard
+      BatteryStatusInsecureOrigin
       CanRequestURLHTTPContainingNewline
       ChromeLoadTimesConnectionInfo
       ChromeLoadTimesFirstPaintAfterLoadTime
```

## Roll protocol to r997149 — _2022-04-28T11:15:16.000Z_
######  Diff: [`477bbc9...83726e8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`477bbc9...83726e8`)

```diff
@@ browser_protocol.pdl:799 @@ experimental domain Audits
       SelectionAddRangeIntersect
       SharedArrayBufferConstructedWithoutIsolation
       TextToSpeech_DisallowedByAutoplay
+      Untranslated
       V8SharedArrayBufferConstructedInExtensionWithoutIsolation
       WebCodecsVideoFrameDefaultTimestamp
       XHRJSONEncodingDetection
@@ -806,11 +807,22 @@ experimental domain Audits
       XRSupportsSession
 
   # This issue tracks information needed to print a deprecation message.
-  # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/third_party/blink/renderer/core/frame/deprecation/README.md
+  # The formatting is inherited from the old console.log version, see more at:
+  # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/deprecation.cc
+  # TODO(crbug.com/1264960): Re-work format to add i18n support per:
+  # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/public/devtools_protocol/README.md
   type DeprecationIssueDetails extends object
     properties
       optional AffectedFrame affectedFrame
       SourceCodeLocation sourceCodeLocation
+      # The content of an untranslated deprecation issue,
+      # e.g. "window.inefficientLegacyStorageMethod will be removed in M97,
+      # around January 2022. Please use Web Storage or Indexed Database
+      # instead. This standard was abandoned in January, 1970. See
+      # https://www.chromestatus.com/feature/5684870116278272 for more details."
+      deprecated optional string message
+      # The id of an untranslated deprecation issue e.g. PrefixedStorageInfo.
+      deprecated optional string deprecationType
       DeprecationIssueType type
 
   type ClientHintIssueReason extends string
```

## Roll protocol to r996622 — _2022-04-27T10:15:18.000Z_
######  Diff: [`61057f3...477bbc9`](https://github.com/ChromeDevTools/devtools-protocol/compare/`61057f3...477bbc9`)

```diff
@@ browser_protocol.pdl:7357 @@ domain Page
       optional string cursive
       # The fantasy font-family.
       optional string fantasy
-      # The math font-family.
-      optional string math
 
   # Font families collection for a script.
   experimental type ScriptFontFamilies extends object
```

## Roll protocol to r996285 — _2022-04-26T18:15:23.000Z_
######  Diff: [`d153258...6a83a61`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d153258...6a83a61`)

```diff
@@ browser_protocol.pdl:744 @@ experimental domain Audits
   type DeprecationIssueType extends string
     enum
       AuthorizationCoveredByWildcard
-      BatteryStatusInsecureOrigin
-      CanRequestURLHTTPContainingNewline
-      ChromeLoadTimesConnectionInfo
-      ChromeLoadTimesFirstPaintAfterLoadTime
-      ChromeLoadTimesWasAlternateProtocolAvailable
       CookieWithTruncatingChar
       CrossOriginAccessBasedOnDocumentDomain
       CrossOriginWindowAlert
       CrossOriginWindowConfirm
-      CSSSelectorInternalMediaControlsOverlayCastButton
-      CustomCursorIntersectsViewport
       DeprecationExample
       DocumentDomainSettingWithoutOriginAgentClusterHeader
-      EventPath
       GeolocationInsecureOrigin
       GeolocationInsecureOriginDeprecatedNotRemoved
       GetUserMediaInsecureOrigin
-      HostCandidateAttributeGetter
-      InsecurePrivateNetworkSubresourceRequest
       LegacyConstraintGoogCpuOveruseDetection
       LegacyConstraintGoogIPv6
       LegacyConstraintGoogScreencastMinBitrate
       LegacyConstraintGoogSuspendBelowMinBitrate
       LocalCSSFileExtensionRejected
-      MediaElementAudioSourceNode
-      MediaSourceAbortRemove
-      MediaSourceDurationTruncatingBuffered
-      NoSysexWebMIDIWithoutPermission
       NotificationInsecureOrigin
-      NotificationPermissionRequestedIframe
       ObsoleteWebRtcCipherSuite
-      PaymentRequestBasicCard
-      PaymentRequestShowWithoutGesture
       PictureSourceSrc
       PrefixedCancelAnimationFrame
       PrefixedRequestAnimationFrame
-      PrefixedStorageInfo
-      PrefixedVideoDisplayingFullscreen
-      PrefixedVideoEnterFullscreen
-      PrefixedVideoEnterFullScreen
-      PrefixedVideoExitFullscreen
-      PrefixedVideoExitFullScreen
-      PrefixedVideoSupportsFullscreen
-      RangeExpand
-      RequestedSubresourceWithEmbeddedCredentials
       RTCConstraintEnableDtlsSrtpFalse
       RTCConstraintEnableDtlsSrtpTrue
       RTCPeerConnectionComplexPlanBSdpUsingDefaultSdpSemantics
       RTCPeerConnectionLegacyCreateWithMediaConstraints
-      RTCPeerConnectionSdpSemanticsPlanB
-      RtcpMuxPolicyNegotiate
       RTPDataChannel
-      SelectionAddRangeIntersect
       SharedArrayBufferConstructedWithoutIsolation
-      TextToSpeech_DisallowedByAutoplay
       Untranslated
       V8SharedArrayBufferConstructedInExtensionWithoutIsolation
       WebCodecsVideoFrameDefaultTimestamp
       XHRJSONEncodingDetection
       XMLHttpRequestSynchronousInNonWorkerOutsideBeforeUnload
-      XRSupportsSession
 
   # This issue tracks information needed to print a deprecation message.
   # The formatting is inherited from the old console.log version, see more at:
```

## Roll protocol to r995853 — _2022-04-25T23:15:20.000Z_
######  Diff: [`5c44be1...d153258`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5c44be1...d153258`)

```diff
@@ browser_protocol.pdl:7021 @@ domain Page
       interest-cohort
       join-ad-interest-group
       keyboard-map
-      local-fonts
       magnetometer
       microphone
       midi
```

## Roll protocol to r995510 — _2022-04-23T16:15:16.000Z_
######  Diff: [`7c8b6ad...5c44be1`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7c8b6ad...5c44be1`)

```diff
@@ browser_protocol.pdl:7645 @@ domain Page
       optional number marginLeft
       # Right margin in inches. Defaults to 1cm (~0.4 inches).
       optional number marginRight
-      # Paper ranges to print, one based, e.g., '1-5, 8, 11-13'. Pages are
-      # printed in the document order, not in the order specified, and no
-      # more than once.
-      # Defaults to empty string, which implies the entire document is printed.
-      # The page numbers are quietly capped to actual page count of the
-      # document, and ranges beyond the end of the document are ignored.
-      # If this results in no pages to print, an error is reported.
-      # It is an error to specify a range with start greater than end.
+      # Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means
+      # print all pages.
       optional string pageRanges
+      # Whether to silently ignore invalid but successfully parsed page ranges, such as '3-2'.
+      # Defaults to false.
+      optional boolean ignoreInvalidPageRanges
       # HTML template for the print header. Should be valid HTML markup with following
       # classes used to inject printing values into them:
       # - `date`: formatted print date
```

## Roll protocol to r995287 — _2022-04-22T18:54:30.000Z_
######  Diff: [`8ac7575...7c8b6ad`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8ac7575...7c8b6ad`)

```diff
@@ browser_protocol.pdl:698 @@ experimental domain Audits
     enum
       PermissionPolicyDisabled
       InvalidAttributionSourceEventId
+      InvalidAttributionData
       AttributionSourceUntrustworthyOrigin
       AttributionUntrustworthyOrigin
+      AttributionTriggerDataTooLarge
+      AttributionEventSourceTriggerDataTooLarge
       InvalidAttributionSourceExpiry
       InvalidAttributionSourcePriority
+      InvalidEventSourceTriggerData
+      InvalidTriggerPriority
+      InvalidTriggerDedupKey
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
@@ -741,40 +747,6 @@ experimental domain Audits
       GenericIssueErrorType errorType
       optional Page.FrameId frameId
 
-  type DeprecationIssueType extends string
-    enum
-      AuthorizationCoveredByWildcard
-      CookieWithTruncatingChar
-      CrossOriginAccessBasedOnDocumentDomain
-      CrossOriginWindowAlert
-      CrossOriginWindowConfirm
-      DeprecationExample
-      DocumentDomainSettingWithoutOriginAgentClusterHeader
-      GeolocationInsecureOrigin
-      GeolocationInsecureOriginDeprecatedNotRemoved
-      GetUserMediaInsecureOrigin
-      LegacyConstraintGoogCpuOveruseDetection
-      LegacyConstraintGoogIPv6
-      LegacyConstraintGoogScreencastMinBitrate
-      LegacyConstraintGoogSuspendBelowMinBitrate
-      LocalCSSFileExtensionRejected
-      NotificationInsecureOrigin
-      ObsoleteWebRtcCipherSuite
-      PictureSourceSrc
-      PrefixedCancelAnimationFrame
-      PrefixedRequestAnimationFrame
-      RTCConstraintEnableDtlsSrtpFalse
-      RTCConstraintEnableDtlsSrtpTrue
-      RTCPeerConnectionComplexPlanBSdpUsingDefaultSdpSemantics
-      RTCPeerConnectionLegacyCreateWithMediaConstraints
-      RTPDataChannel
-      SharedArrayBufferConstructedWithoutIsolation
-      Untranslated
-      V8SharedArrayBufferConstructedInExtensionWithoutIsolation
-      WebCodecsVideoFrameDefaultTimestamp
-      XHRJSONEncodingDetection
-      XMLHttpRequestSynchronousInNonWorkerOutsideBeforeUnload
-
   # This issue tracks information needed to print a deprecation message.
   # The formatting is inherited from the old console.log version, see more at:
   # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/deprecation.cc
@@ -791,8 +763,7 @@ experimental domain Audits
       # https://www.chromestatus.com/feature/5684870116278272 for more details."
       deprecated optional string message
       # The id of an untranslated deprecation issue e.g. PrefixedStorageInfo.
-      deprecated optional string deprecationType
-      DeprecationIssueType type
+      deprecated string deprecationType
 
   type ClientHintIssueReason extends string
     enum
@@ -815,11 +786,6 @@ experimental domain Audits
     enum
       ApprovalDeclined
       TooManyRequests
-      ManifestListHttpNotFound
-      ManifestListNoResponse
-      ManifestListInvalidResponse
-      ManifestNotInManifestList
-      ManifestListTooBig
       ManifestHttpNotFound
       ManifestNoResponse
       ManifestInvalidResponse
@@ -3573,8 +3539,6 @@ domain Emulation
       string architecture
       string model
       boolean mobile
-      optional string bitness
-      optional boolean wow64
 
   # Tells whether emulation is supported.
   command canEmulate
@@ -6982,10 +6946,8 @@ domain Page
       ch-device-memory
       ch-downlink
       ch-ect
-      ch-partitioned-cookies
       ch-prefers-color-scheme
       ch-rtt
-      ch-save-data
       ch-ua
       ch-ua-arch
       ch-ua-bitness
@@ -7001,6 +6963,7 @@ domain Page
       ch-viewport-height
       ch-viewport-width
       ch-width
+      ch-partitioned-cookies
       clipboard-read
       clipboard-write
       cross-origin-isolated
@@ -7325,6 +7288,8 @@ domain Page
       optional string cursive
       # The fantasy font-family.
       optional string fantasy
+      # The pictograph font-family.
+      optional string pictograph
 
   # Font families collection for a script.
   experimental type ScriptFontFamilies extends object
@@ -7543,11 +7508,11 @@ domain Page
   # Returns metrics relating to the layouting of the page, such as viewport bounds/scale.
   command getLayoutMetrics
     returns
-      # Deprecated metrics relating to the layout viewport. Is in device pixels. Use `cssLayoutViewport` instead.
+      # Deprecated metrics relating to the layout viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssLayoutViewport` instead.
       deprecated LayoutViewport layoutViewport
-      # Deprecated metrics relating to the visual viewport. Is in device pixels. Use `cssVisualViewport` instead.
+      # Deprecated metrics relating to the visual viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssVisualViewport` instead.
       deprecated VisualViewport visualViewport
-      # Deprecated size of scrollable area. Is in DP. Use `cssContentSize` instead.
+      # Deprecated size of scrollable area. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssContentSize` instead.
       deprecated DOM.Rect contentSize
       # Metrics relating to the layout viewport in CSS pixels.
       LayoutViewport cssLayoutViewport
@@ -8133,6 +8098,7 @@ domain Page
       JavaScriptExecution
       RendererProcessKilled
       RendererProcessCrashed
+      GrantedMediaStreamAccess
       SchedulerTrackedFeatureUsed
       ConflictingBrowsingInstance
       CacheFlushed
@@ -8159,6 +8125,7 @@ domain Page
       ForegroundCacheLimit
       BrowsingInstanceNotSwapped
       BackForwardCacheDisabledForDelegate
+      OptInUnloadHeaderNotPresent
       UnloadHandlerExistsInMainFrame
       UnloadHandlerExistsInSubFrame
       ServiceWorkerUnregistration
@@ -8169,7 +8136,6 @@ domain Page
       Unknown
       ActivationNavigationsDisallowedForBug1234857
       ErrorDocument
-      FencedFramesEmbedder
       #Blocklisted features
       WebSocket
       WebTransport
@@ -8289,19 +8255,6 @@ domain Page
       # Tree structure of reasons why the page could not be cached for each frame.
       optional BackForwardCacheNotRestoredExplanationTree notRestoredExplanationsTree
 
-  # List of FinalStatus reasons for Prerender2.
-  type PrerenderFinalStatus extends string
-    enum
-      Activated
-
-  # Fired when a prerender attempt is completed.
-  event prerenderAttemptCompleted
-    parameters
-      # The frame id of the frame initiating prerendering.
-      FrameId initiatingFrameId
-      string prerenderingUrl
-      PrerenderFinalStatus finalStatus
-
   event loadEventFired
     parameters
       Network.MonotonicTime timestamp
@@ -10163,27 +10116,19 @@ experimental domain Media
       Timestamp timestamp
       string value
 
-  # Represents logged source line numbers reported in an error.
-  # NOTE: file and line are from chromium c++ implementation code, not js.
-  type PlayerErrorSourceLocation extends object
-    properties
-      string file
-      integer line
-
   # Corresponds to kMediaError
   type PlayerError extends object
     properties
-      string errorType
-      # Code is the numeric enum entry for a specific set of error codes, such
-      # as PipelineStatusCodes in media/base/pipeline_status.h
-      integer code
-      # A trace of where this error was caused / where it passed through.
-      array of PlayerErrorSourceLocation stack
-      # Errors potentially have a root cause error, ie, a DecoderError might be
-      # caused by an WindowsError
-      array of PlayerError cause
-      # Extra data attached to an error, such as an HRESULT, Video Codec, etc.
-      object data
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
 
   # This can be called multiple times, and can be used to set / override /
   # remove player properties. A null propValue indicates removal.
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index bd277eb..09c420e 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -113,11 +113,6 @@ domain Debugger
       Runtime.RemoteObject this
       # The value being returned, if the function is at return point.
       optional Runtime.RemoteObject returnValue
-      # Valid only while the VM is paused and indicates whether this frame
-      # can be restarted or not. Note that a `true` value here does not
-      # guarantee that Debugger#restartFrame with this CallFrameId will be
-      # successful, but it is very likely.
-      experimental optional boolean canBeRestarted
 
   # Scope description.
   type Scope extends object
@@ -957,37 +952,6 @@ domain Runtime
   # Unique script identifier.
   type ScriptId extends string
 
-  # Represents the value serialiazed by the WebDriver BiDi specification
-  # https://w3c.github.io/webdriver-bidi.
-  type WebDriverValue extends object
-    properties
-      enum type
-        undefined
-        null
-        string
-        number
-        boolean
-        bigint
-        regexp
-        date
-        symbol
-        array
-        object
-        function
-        map
-        set
-        weakmap
-        weakset
-        error
-        proxy
-        promise
-        typedarray
-        arraybuffer
-        node
-        window
-      optional any value
-      optional string objectId
-
   # Unique object identifier.
   type RemoteObjectId extends string
 
@@ -1040,8 +1004,6 @@ domain Runtime
       optional UnserializableValue unserializableValue
       # String representation of the object.
       optional string description
-      # WebDriver BiDi representation of the value.
-      experimental optional WebDriverValue webDriverValue
       # Unique object identifier (for non-primitive values).
       optional RemoteObjectId objectId
       # Preview containing abbreviated property values. Specified for `object` type values only.
@@ -1347,8 +1309,6 @@ domain Runtime
       optional string objectGroup
       # Whether to throw an exception if side effect cannot be ruled out during evaluation.
       experimental optional boolean throwOnSideEffect
-      # Whether the result should be serialized according to https://w3c.github.io/webdriver-bidi.
-      experimental optional boolean generateWebDriverValue
     returns
       # Call result.
       RemoteObject result
@@ -1434,8 +1394,6 @@ domain Runtime
       # boundaries).
       # This is mutually exclusive with `contextId`.
       experimental optional string uniqueContextId
-      # Whether the result should be serialized according to https://w3c.github.io/webdriver-bidi.
-      experimental optional boolean generateWebDriverValue
     returns
       # Evaluation result.
       RemoteObject result
```

## Roll protocol to r982567 — _2022-04-22T18:52:45.000Z_
######  Diff: [`6aec757...8ac7575`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6aec757...8ac7575`)

```diff
@@ js_protocol.pdl:104 @@ domain Debugger
       # Location in the source code.
       Location location
       # JavaScript script name or url.
-      # Deprecated in favor of using the `location.scriptId` to resolve the URL via a previously
-      # sent `Debugger.scriptParsed` event.
-      deprecated string url
+      string url
       # Scope chain for this call frame.
       array of Scope scopeChain
       # `this` object for this call frame.
@@ -1552,18 +1550,6 @@ domain Runtime
     parameters
       string name
 
-  # This method tries to lookup and populate exception details for a
-  # JavaScript Error object.
-  # Note that the stackTrace portion of the resulting exceptionDetails will
-  # only be populated if the Runtime domain was enabled at the time when the
-  # Error was thrown.
-  experimental command getExceptionDetails
-    parameters
-      # The error object for which to resolve the exception details.
-      RemoteObjectId errorObjectId
-    returns
-      optional ExceptionDetails exceptionDetails
-
   # Notification is issued every time when binding is called.
   experimental event bindingCalled
     parameters
```

## Roll protocol to r982423 — _2022-03-17T21:15:26.000Z_
######  Diff: [`052c603...6aec757`](https://github.com/ChromeDevTools/devtools-protocol/compare/`052c603...6aec757`)

```diff
@@ browser_protocol.pdl:6940 @@ domain Page
       ambient-light-sensor
       attribution-reporting
       autoplay
-      browsing-topics
       camera
       ch-dpr
       ch-device-memory
@@ -6981,7 +6980,6 @@ domain Page
       gyroscope
       hid
       idle-detection
-      interest-cohort
       join-ad-interest-group
       keyboard-map
       magnetometer
```

## Roll protocol to r982238 — _2022-03-17T16:15:18.000Z_
######  Diff: [`e35b84a...052c603`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e35b84a...052c603`)

```diff
@@ browser_protocol.pdl:1542 @@ experimental domain CSS
     properties
       # Supports rule text.
       string text
-      # Whether the supports condition is satisfied.
-      boolean active
       # The associated rule header range in the enclosing stylesheet (if
       # available).
       optional SourceRange range
```

## Roll protocol to r981034 — _2022-03-15T10:15:13.000Z_
######  Diff: [`5dd0348...65adbf7`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5dd0348...65adbf7`)

```diff
@@ browser_protocol.pdl:8131 @@ domain Page
       NoResponseHead
       Unknown
       ActivationNavigationsDisallowedForBug1234857
-      ErrorDocument
       #Blocklisted features
       WebSocket
       WebTransport
```

## Roll protocol to r979918 — _2022-03-10T20:15:19.000Z_
######  Diff: [`8b70878...5dd0348`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8b70878...5dd0348`)

```diff
@@ browser_protocol.pdl:756 @@ experimental domain Audits
     properties
       optional AffectedFrame affectedFrame
       SourceCodeLocation sourceCodeLocation
-      # The content of an untranslated deprecation issue,
+      # The content of the deprecation issue (this won't be translated),
       # e.g. "window.inefficientLegacyStorageMethod will be removed in M97,
       # around January 2022. Please use Web Storage or Indexed Database
       # instead. This standard was abandoned in January, 1970. See
       # https://www.chromestatus.com/feature/5684870116278272 for more details."
       deprecated optional string message
-      # The id of an untranslated deprecation issue e.g. PrefixedStorageInfo.
-      deprecated string deprecationType
+      string deprecationType
 
   type ClientHintIssueReason extends string
     enum
```

## Roll protocol to r979353 — _2022-03-09T19:15:15.000Z_
######  Diff: [`3084cb9...8b70878`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3084cb9...8b70878`)

```diff
@@ browser_protocol.pdl:792 @@ experimental domain Audits
       ClientMetadataNoResponse
       ClientMetadataInvalidResponse
       ClientMetadataMissingPrivacyPolicyUrl
-      DisabledInSettings
       ErrorFetchingSignin
       InvalidSigninResponse
       AccountsHttpNotFound
```

## Roll protocol to r977795 — _2022-03-04T20:15:28.000Z_
######  Diff: [`2e0912d...a0800ab`](https://github.com/ChromeDevTools/devtools-protocol/compare/`2e0912d...a0800ab`)

```diff
@@ browser_protocol.pdl:1300 @@ experimental domain CSS
       # Matches of CSS rules matching the ancestor node in the style inheritance chain.
       array of RuleMatch matchedCSSRules
 
-  # Inherited pseudo element matches from pseudos of an ancestor node.
-  type InheritedPseudoElementMatches extends object
-    properties
-      # Matches of pseudo styles from the pseudos of an ancestor node.
-      array of PseudoElementMatches pseudoElements
-
   # Match data for a CSS rule.
   type RuleMatch extends object
     properties
@@ -1744,8 +1738,6 @@ experimental domain CSS
       optional array of PseudoElementMatches pseudoElements
       # A chain of inherited styles (from the immediate node parent up to the DOM tree root).
       optional array of InheritedStyleEntry inherited
-      # A chain of inherited pseudo element styles (from the immediate node parent up to the DOM tree root).
-      optional array of InheritedPseudoElementMatches inheritedPseudoElements
       # A list of CSS keyframed animations matching this node.
       optional array of CSSKeyframesRule cssKeyframesRules
```

## Roll protocol to r977469 — _2022-03-04T03:15:12.000Z_
######  Diff: [`d232328...2e0912d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d232328...2e0912d`)

```diff
@@ browser_protocol.pdl:791 @@ experimental domain Audits
       ClientMetadataHttpNotFound
       ClientMetadataNoResponse
       ClientMetadataInvalidResponse
-      ClientMetadataMissingPrivacyPolicyUrl
       ErrorFetchingSignin
       InvalidSigninResponse
       AccountsHttpNotFound
```

## Roll protocol to r975963 — _2022-02-28T22:15:14.000Z_
######  Diff: [`a7bfbac...d232328`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a7bfbac...d232328`)

```diff
@@ browser_protocol.pdl:490 @@ experimental domain Audits
       WarnSameSiteStrictCrossDowngradeLax
       WarnSameSiteLaxCrossDowngradeStrict
       WarnSameSiteLaxCrossDowngradeLax
-      WarnAttributeValueExceedsMaxSize
 
   type CookieOperation extends string
     enum
```

## Roll protocol to r975498 — _2022-02-26T20:15:19.000Z_
######  Diff: [`14c3fe0...a7bfbac`](https://github.com/ChromeDevTools/devtools-protocol/compare/`14c3fe0...a7bfbac`)

```diff
@@ browser_protocol.pdl:6540 @@ experimental domain Overlay
     enum
       rgb
       hsl
-      hwb
       hex
 
   # Configurations for Persistent Grid Highlight
```

## Roll protocol to r975298 — _2022-02-25T22:15:19.000Z_
######  Diff: [`51bf736...14c3fe0`](https://github.com/ChromeDevTools/devtools-protocol/compare/`51bf736...14c3fe0`)

```diff
@@ browser_protocol.pdl:471 @@ experimental domain Audits
     properties
       Page.FrameId frameId
 
-  type CookieExclusionReason extends string
+  type SameSiteCookieExclusionReason extends string
     enum
       ExcludeSameSiteUnspecifiedTreatedAsLax
       ExcludeSameSiteNoneInsecure
@@ -480,7 +480,7 @@ experimental domain Audits
       ExcludeInvalidSameParty
       ExcludeSamePartyCrossPartyContext
 
-  type CookieWarningReason extends string
+  type SameSiteCookieWarningReason extends string
     enum
       WarnSameSiteUnspecifiedCrossSiteContext
       WarnSameSiteNoneInsecure
@@ -491,7 +491,7 @@ experimental domain Audits
       WarnSameSiteLaxCrossDowngradeStrict
       WarnSameSiteLaxCrossDowngradeLax
 
-  type CookieOperation extends string
+  type SameSiteCookieOperation extends string
     enum
       SetCookie
       ReadCookie
@@ -499,7 +499,7 @@ experimental domain Audits
   # This information is currently necessary, as the front-end has a difficult
   # time finding a specific cookie. With this, we can convey specific error
   # information without the cookie.
-  type CookieIssueDetails extends object
+  type SameSiteCookieIssueDetails extends object
     properties
       # If AffectedCookie is not set then rawCookieLine contains the raw
       # Set-Cookie header string. This hints at a problem where the
@@ -507,11 +507,11 @@ experimental domain Audits
       # that no valid cookie could be created.
       optional AffectedCookie cookie
       optional string rawCookieLine
-      array of CookieWarningReason cookieWarningReasons
-      array of CookieExclusionReason cookieExclusionReasons
+      array of SameSiteCookieWarningReason cookieWarningReasons
+      array of SameSiteCookieExclusionReason cookieExclusionReasons
       # Optionally identifies the site-for-cookies and the cookie url, which
       # may be used by the front-end as additional context.
-      CookieOperation operation
+      SameSiteCookieOperation operation
       optional string siteForCookies
       optional string cookieUrl
       optional AffectedRequest request
@@ -814,7 +814,7 @@ experimental domain Audits
   # information about the kind of issue.
   type InspectorIssueCode extends string
     enum
-      CookieIssue
+      SameSiteCookieIssue
       MixedContentIssue
       BlockedByResponseIssue
       HeavyAdIssue
@@ -836,7 +836,7 @@ experimental domain Audits
   # add a new optional field to this type.
   type InspectorIssueDetails extends object
     properties
-      optional CookieIssueDetails cookieIssueDetails
+      optional SameSiteCookieIssueDetails sameSiteCookieIssueDetails
       optional MixedContentIssueDetails mixedContentIssueDetails
       optional BlockedByResponseIssueDetails blockedByResponseIssueDetails
       optional HeavyAdIssueDetails heavyAdIssueDetails
```

## Roll protocol to r974996 — _2022-02-25T04:15:23.000Z_
######  Diff: [`aebe16a...51bf736`](https://github.com/ChromeDevTools/devtools-protocol/compare/`aebe16a...51bf736`)

```diff
@@ browser_protocol.pdl:8207 @@ domain Page
       BackForwardCacheNotRestoredReasonType type
       # Not restored reason
       BackForwardCacheNotRestoredReason reason
-      # Context associated with the reason. The meaning of this context is
-      # dependent on the reason:
-      # - EmbedderExtensionSentMessageToCachedFrame: the extension ID.
-      #
-      optional string context
 
   experimental type BackForwardCacheNotRestoredExplanationTree extends object
     properties
```

## Roll protocol to r974265 — _2022-02-23T19:15:15.000Z_
######  Diff: [`fe82e94...aebe16a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`fe82e94...aebe16a`)

```diff
@@ browser_protocol.pdl:1388 @@ experimental domain CSS
       # @supports CSS at-rule array.
       # The array enumerates @supports at-rules starting with the innermost one, going outwards.
       experimental optional array of CSSSupports supports
-      # Cascade layer array. Contains the layer hierarchy that this rule belongs to starting
-      # with the innermost layer and going outwards.
-      experimental optional array of CSSLayer layers
 
   # CSS coverage information.
   type RuleUsage extends object
@@ -1538,28 +1535,6 @@ experimental domain CSS
       # Identifier of the stylesheet containing this object (if exists).
       optional StyleSheetId styleSheetId
 
-  # CSS Layer at-rule descriptor.
-  experimental type CSSLayer extends object
-    properties
-      # Layer name.
-      string text
-      # The associated rule header range in the enclosing stylesheet (if
-      # available).
-      optional SourceRange range
-      # Identifier of the stylesheet containing this object (if exists).
-      optional StyleSheetId styleSheetId
-
-  # CSS Layer data.
-  experimental type CSSLayerData extends object
-    properties
-      # Layer name.
-      string name
-      # Direct sub-layers
-      optional array of CSSLayerData subLayers
-      # Layer order. The order determines the order of the layer in the cascade order.
-      # A higher number has higher priority in the cascade order.
-      number order
-
   # Information about amount of glyphs that were rendered with given font.
   type PlatformFontUsage extends object
     properties
@@ -1761,16 +1736,6 @@ experimental domain CSS
       # The stylesheet text.
       string text
 
-  # Returns all layers parsed by the rendering engine for the tree scope of a node.
-  # Given a DOM element identified by nodeId, getLayersForNode returns the root
-  # layer for the nearest ancestor document or shadow root. The layer root contains
-  # the full layer tree for the tree scope and their ordering.
-  experimental command getLayersForNode
-    parameters
-      DOM.NodeId nodeId
-    returns
-      CSSLayerData rootLayer
-
   # Starts tracking the given computed styles for updates. The specified array of properties
   # replaces the one previously specified. Pass empty array to disable tracking.
   # Use takeComputedStyleUpdates to retrieve the list of nodes that had properties modified.
```

## Roll protocol to r973690 — _2022-02-22T12:15:13.000Z_
######  Diff: [`df434f1...fe82e94`](https://github.com/ChromeDevTools/devtools-protocol/compare/`df434f1...fe82e94`)

```diff
@@ browser_protocol.pdl:3723 @@ domain Emulation
       # To be sent in Sec-CH-UA-* headers and returned in navigator.userAgentData
       experimental optional UserAgentMetadata userAgentMetadata
 
-  # Allows overriding the automation flag.
-  experimental command setAutomationOverride
-    parameters
-      # Whether the override should be enabled.
-      boolean enabled
-
 # This domain provides experimental commands only supported in headless mode.
 experimental domain HeadlessExperimental
   depends on Page
```

## Roll protocol to r973088 — _2022-02-18T20:15:24.000Z_
######  Diff: [`1c7f0c1...df434f1`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1c7f0c1...df434f1`)

```diff
@@ browser_protocol.pdl:2096 @@ domain DOM
       scrollbar-corner
       resizer
       input-list-button
-      page-transition
-      page-transition-container
-      page-transition-image-wrapper
-      page-transition-outgoing-image
-      page-transition-incoming-image
+      transition
+      transition-container
+      transition-old-content
+      transition-new-content
 
   # Shadow root type.
   type ShadowRootType extends string
```

## Roll protocol to r972883 — _2022-02-18T10:15:14.000Z_
######  Diff: [`474a6e6...1c7f0c1`](https://github.com/ChromeDevTools/devtools-protocol/compare/`474a6e6...1c7f0c1`)

```diff
@@ browser_protocol.pdl:214 @@ experimental domain Accessibility
       # The maximum depth at which descendants of the root node should be retrieved.
       # If omitted, the full tree is returned.
       optional integer depth
+      # Deprecated. This parameter has been renamed to `depth`. If depth is not provided, max_depth will be used.
+      deprecated optional integer max_depth
       # The frame for whose document the AX tree should be retrieved.
       # If omited, the root frame is used.
       optional Page.FrameId frameId
```

## Roll protocol to r972468 — _2022-02-17T16:15:22.000Z_
######  Diff: [`b960aa4...474a6e6`](https://github.com/ChromeDevTools/devtools-protocol/compare/`b960aa4...474a6e6`)

```diff
@@ browser_protocol.pdl:780 @@ experimental domain Audits
 
   # Represents the failure reason when a federated authentication reason fails.
   # Should be updated alongside RequestIdTokenStatus in
-  # third_party/blink/public/mojom/devtools/inspector_issue.mojom to include
+  # third_party/blink/public/mojom/webid/federated_auth_request.mojom to include
   # all cases except for success.
   type FederatedAuthRequestIssueReason extends string
     enum
```

## Roll protocol to r971358 — _2022-02-15T19:15:32.000Z_
######  Diff: [`cfe04f6...b960aa4`](https://github.com/ChromeDevTools/devtools-protocol/compare/`cfe04f6...b960aa4`)

```diff
@@ browser_protocol.pdl:526 @@ experimental domain Audits
 
   type MixedContentResourceType extends string
     enum
-      AttributionSrc
       Audio
       Beacon
       CSPReport
```

## Roll protocol to r971103 — _2022-02-15T08:15:18.000Z_
######  Diff: [`84f7cd0...cfe04f6`](https://github.com/ChromeDevTools/devtools-protocol/compare/`84f7cd0...cfe04f6`)

```diff
@@ browser_protocol.pdl:1792 @@ experimental domain CSS
       # The resulting CSS container query rule after modification.
       CSSContainerQuery containerQuery
 
-  # Modifies the expression of a supports at-rule.
-  experimental command setSupportsText
-    parameters
-      StyleSheetId styleSheetId
-      SourceRange range
-      string text
-    returns
-      # The resulting CSS Supports rule after modification.
-      CSSSupports supports
-
   # Modifies the rule selector.
   command setRuleSelector
     parameters
```

## Roll protocol to r970590 — _2022-02-14T13:15:13.000Z_
######  Diff: [`1b1e643...9a655fe`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1b1e643...9a655fe`)

```diff
@@ browser_protocol.pdl:1792 @@ experimental domain CSS
       # The resulting CSS container query rule after modification.
       CSSContainerQuery containerQuery
 
+  # Modifies the expression of a supports at-rule.
+  experimental command setSupportsText
+    parameters
+      StyleSheetId styleSheetId
+      SourceRange range
+      string text
+    returns
+      # The resulting CSS Supports rule after modification.
+      CSSSupports supports
+
   # Modifies the rule selector.
   command setRuleSelector
     parameters
```

## Roll protocol to r970581 — _2022-02-14T12:15:16.000Z_
######  Diff: [`9f8c559...1b1e643`](https://github.com/ChromeDevTools/devtools-protocol/compare/`9f8c559...1b1e643`)

```diff
@@ browser_protocol.pdl:1792 @@ experimental domain CSS
       # The resulting CSS container query rule after modification.
       CSSContainerQuery containerQuery
 
-  # Modifies the expression of a supports at-rule.
-  experimental command setSupportsText
-    parameters
-      StyleSheetId styleSheetId
-      SourceRange range
-      string text
-    returns
-      # The resulting CSS Supports rule after modification.
-      CSSSupports supports
-
   # Modifies the rule selector.
   command setRuleSelector
     parameters
```

## Roll protocol to r969999 — _2022-02-11T17:15:13.000Z_
######  Diff: [`22b098a...9f8c559`](https://github.com/ChromeDevTools/devtools-protocol/compare/`22b098a...9f8c559`)

```diff
@@ browser_protocol.pdl:785 @@ experimental domain Audits
     enum
       ApprovalDeclined
       TooManyRequests
-      ManifestHttpNotFound
-      ManifestNoResponse
-      ManifestInvalidResponse
+      WellKnownHttpNotFound
+      WellKnownNoResponse
+      WellKnownInvalidResponse
       ClientMetadataHttpNotFound
       ClientMetadataNoResponse
       ClientMetadataInvalidResponse
```

## Roll protocol to r969947 — _2022-02-11T15:15:21.000Z_
######  Diff: [`4562919...22b098a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4562919...22b098a`)

```diff
@@ browser_protocol.pdl:788 @@ experimental domain Audits
       WellKnownHttpNotFound
       WellKnownNoResponse
       WellKnownInvalidResponse
-      ClientMetadataHttpNotFound
-      ClientMetadataNoResponse
-      ClientMetadataInvalidResponse
+      ClientIdMetadataHttpNotFound
+      ClientIdMetadataNoResponse
+      ClientIdMetadataInvalidResponse
       ErrorFetchingSignin
       InvalidSigninResponse
       AccountsHttpNotFound
```

## Roll protocol to r967529 — _2022-02-05T00:15:30.000Z_
######  Diff: [`72f90a8...5b91f46`](https://github.com/ChromeDevTools/devtools-protocol/compare/`72f90a8...5b91f46`)

```diff
@@ browser_protocol.pdl:6914 @@ domain Page
       gyroscope
       hid
       idle-detection
+      interest-cohort
       join-ad-interest-group
       keyboard-map
       magnetometer
```

## Roll protocol to r966979 — _2022-02-03T23:15:30.000Z_
######  Diff: [`d15d202...72f90a8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d15d202...72f90a8`)

```diff
@@ browser_protocol.pdl:3656 @@ domain Emulation
       # If set this specifies the maximum number of tasks that can be run before virtual is forced
       # forwards to prevent deadlock.
       optional integer maxVirtualTimeTaskStarvationCount
+      # If set the virtual time policy change should be deferred until any frame starts navigating.
+      # Note any previous deferred policy change is superseded.
+      optional boolean waitForNavigation
       # If set, base::Time::Now will be overridden to initially return this value.
       optional Network.TimeSinceEpoch initialVirtualTime
     returns
```

## Roll protocol to r966949 — _2022-02-03T22:15:32.000Z_
######  Diff: [`1d22b7b...d15d202`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1d22b7b...d15d202`)

```diff
@@ browser_protocol.pdl:6899 @@ domain Page
       ch-viewport-height
       ch-viewport-width
       ch-width
-      ch-partitioned-cookies
       clipboard-read
       clipboard-write
       cross-origin-isolated
```

## Roll protocol to r966116 — _2022-02-02T10:15:28.000Z_
######  Diff: [`1600334...1d22b7b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1600334...1d22b7b`)

```diff
@@ browser_protocol.pdl:1386 @@ experimental domain CSS
       # Container query list array (for rules involving container queries).
       # The array enumerates container queries starting with the innermost one, going outwards.
       experimental optional array of CSSContainerQuery containerQueries
-      # @supports CSS at-rule array.
-      # The array enumerates @supports at-rules starting with the innermost one, going outwards.
-      experimental optional array of CSSSupports supports
 
   # CSS coverage information.
   type RuleUsage extends object
@@ -1525,17 +1522,6 @@ experimental domain CSS
       # Optional name for the container.
       optional string name
 
-  # CSS Supports at-rule descriptor.
-  experimental type CSSSupports extends object
-    properties
-      # Supports rule text.
-      string text
-      # The associated rule header range in the enclosing stylesheet (if
-      # available).
-      optional SourceRange range
-      # Identifier of the stylesheet containing this object (if exists).
-      optional StyleSheetId styleSheetId
-
   # Information about amount of glyphs that were rendered with given font.
   type PlatformFontUsage extends object
     properties
```

## Roll protocol to r965299 — _2022-01-31T19:15:27.000Z_
######  Diff: [`8c4f892...1600334`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8c4f892...1600334`)

```diff
@@ browser_protocol.pdl:6881 @@ domain Page
       ch-ua-full-version-list
       ch-ua-platform-version
       ch-ua-reduced
-      ch-ua-wow64
       ch-viewport-height
       ch-viewport-width
       ch-width
```

## Roll protocol to r964215 — _2022-01-27T20:15:27.000Z_
######  Diff: [`f559f4a...57a4bb8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`f559f4a...57a4bb8`)

```diff
@@ browser_protocol.pdl:773 @@ experimental domain Audits
       # are respected. Any injected via javascript (or other means) are ignored.
       MetaTagModifiedHTML
 
-  type FederatedAuthRequestIssueDetails extends object
-    properties
-      FederatedAuthRequestIssueReason federatedAuthRequestIssueReason
-
-  # Represents the failure reason when a federated authentication reason fails.
-  # Should be updated alongside RequestIdTokenStatus in
-  # third_party/blink/public/mojom/webid/federated_auth_request.mojom to include
-  # all cases except for success.
-  type FederatedAuthRequestIssueReason extends string
-    enum
-      ApprovalDeclined
-      TooManyRequests
-      WellKnownHttpNotFound
-      WellKnownNoResponse
-      WellKnownInvalidResponse
-      ClientIdMetadataHttpNotFound
-      ClientIdMetadataNoResponse
-      ClientIdMetadataInvalidResponse
-      ErrorFetchingSignin
-      InvalidSigninResponse
-      AccountsHttpNotFound
-      AccountsNoResponse
-      AccountsInvalidResponse
-      IdTokenHttpNotFound
-      IdTokenNoResponse
-      IdTokenInvalidResponse
-      IdTokenInvalidRequest
-      ErrorIdToken
-      Canceled
-
   # This issue tracks client hints related issues. It's used to deprecate old
   # features, encourage the use of new ones, and provide general guidance.
   type ClientHintIssueDetails extends object
@@ -830,7 +800,6 @@ experimental domain Audits
       GenericIssue
       DeprecationIssue
       ClientHintIssue
-      FederatedAuthRequestIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -852,7 +821,6 @@ experimental domain Audits
       optional GenericIssueDetails genericIssueDetails
       optional DeprecationIssueDetails deprecationIssueDetails
       optional ClientHintIssueDetails clientHintIssueDetails
-      optional FederatedAuthRequestIssueDetails federatedAuthRequestIssueDetails
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
```

## Roll protocol to r963632 — _2022-01-26T19:16:12.000Z_
######  Diff: [`f687d75...f559f4a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`f687d75...f559f4a`)

```diff
@@ browser_protocol.pdl:6154 @@ domain Network
       SameOriginAllowPopups
       UnsafeNone
       SameOriginPlusCoep
-      SameOriginAllowPopupsPlusCoep
 
   experimental type CrossOriginOpenerPolicyStatus extends object
     properties
```

## Roll protocol to r963595 — _2022-01-26T18:15:28.000Z_
######  Diff: [`81838df...f687d75`](https://github.com/ChromeDevTools/devtools-protocol/compare/`81838df...f687d75`)

```diff
@@ browser_protocol.pdl:6843 @@ domain Page
       ch-ua-platform
       ch-ua-model
       ch-ua-mobile
-      ch-ua-full
       ch-ua-full-version
       ch-ua-full-version-list
       ch-ua-platform-version
```

## Roll protocol to r963409 — _2022-01-26T06:15:29.000Z_
######  Diff: [`4d3be9f...81838df`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4d3be9f...81838df`)

```diff
@@ browser_protocol.pdl:2259 @@ domain DOM
 
   # Enables DOM agent for the given page.
   command enable
-    parameters
-      # Whether to include whitespaces in the children array of returned Nodes.
-      experimental optional enum includeWhitespace
-        # Strip whitespaces from child arrays (default).
-        none
-        # Return all children including block-level whitespace nodes.
-        all
 
   # Focuses the given element.
   command focus
@@ -7968,7 +7961,7 @@ domain Page
   # List of not restored reasons for back-forward cache.
   experimental type BackForwardCacheNotRestoredReason extends string
     enum
-      NotPrimaryMainFrame
+      NotMainFrame
       BackForwardCacheDisabled
       RelatedActiveContentsExist
       HTTPStatusNotOK
```

## Roll protocol to r963043 — _2022-01-25T17:15:34.000Z_
######  Diff: [`398dc33...4d3be9f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`398dc33...4d3be9f`)

```diff
@@ browser_protocol.pdl:8658 @@ experimental domain Storage
     properties
       string ownerOrigin
       string name
-      Network.TimeSinceEpoch expirationTime
+      number expirationTime
       string joiningOrigin
       optional string biddingUrl
       optional string biddingWasmHelperUrl
@@ -8814,7 +8814,6 @@ experimental domain Storage
   # One of the interest groups was accessed by the associated page.
   event interestGroupAccessed
     parameters
-      Network.TimeSinceEpoch accessTime
       InterestGroupAccessType type
       string ownerOrigin
       string name
```

## Roll protocol to r962425 — _2022-01-24T11:15:20.000Z_
######  Diff: [`0abe20f...398dc33`](https://github.com/ChromeDevTools/devtools-protocol/compare/`0abe20f...398dc33`)

```diff
@@ browser_protocol.pdl:4074 @@ domain Input
       optional integer location
       # Editing commands to send with the key event (e.g., 'selectAll') (default: []).
       # These are related to but not equal the command names used in `document.execCommand` and NSStandardKeyBindingResponding.
-      # See https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/editing/commands/editor_command_names.h for valid command names.
+      # See https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/editing/commands/editor_command_names.h for valid command names.
       experimental optional array of string commands
 
   # This method emulates inserting text that doesn't come from a key press,
```

## Roll protocol to r961891 — _2022-01-21T14:15:27.000Z_
######  Diff: [`dac32a8...0abe20f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`dac32a8...0abe20f`)

```diff
@@ browser_protocol.pdl:736 @@ experimental domain Audits
       string url
       optional SourceCodeLocation location
 
+  type WasmCrossOriginModuleSharingIssueDetails extends object
+    properties
+      string wasmModuleUrl
+      string sourceOrigin
+      string targetOrigin
+      boolean isWarning
+
   type GenericIssueErrorType extends string
     enum
       CrossOriginPortalPostMessageError
@@ -797,6 +804,7 @@ experimental domain Audits
       AttributionReportingIssue
       QuirksModeIssue
       NavigatorUserAgentIssue
+      WasmCrossOriginModuleSharingIssue
       GenericIssue
       DeprecationIssue
       ClientHintIssue
@@ -818,6 +826,7 @@ experimental domain Audits
       optional AttributionReportingIssueDetails attributionReportingIssueDetails
       optional QuirksModeIssueDetails quirksModeIssueDetails
       optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
+      optional WasmCrossOriginModuleSharingIssueDetails wasmCrossOriginModuleSharingIssue
       optional GenericIssueDetails genericIssueDetails
       optional DeprecationIssueDetails deprecationIssueDetails
       optional ClientHintIssueDetails clientHintIssueDetails
```

## Roll protocol to r960912 — _2022-01-19T13:15:30.000Z_
######  Diff: [`3e458bc...53c4a9a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3e458bc...53c4a9a`)

```diff
@@ browser_protocol.pdl:6899 @@ domain Page
       Header
       # Declaration in iframe attribute.
       IframeAttribute
-      # Inside fenced frame.
-      InFencedFrameTree
 
   experimental type PermissionsPolicyBlockLocator extends object
     properties
```

## Roll protocol to r960519 — _2022-01-18T19:15:30.000Z_
######  Diff: [`7572c21...3e458bc`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7572c21...3e458bc`)

```diff
@@ browser_protocol.pdl:8644 @@ experimental domain Storage
     properties
       string issuerOrigin
       number count
-
+  
   # Enum of interest group access types.
   type InterestGroupAccessType extends string
     enum
@@ -8653,7 +8653,7 @@ experimental domain Storage
       update
       bid
       win
-
+  
   # Ad advertising element inside an interest group.
   type InterestGroupAd extends object
     properties
@@ -8817,7 +8817,7 @@ experimental domain Storage
     parameters
       # Origin to update.
       string origin
-
+  
   # One of the interest groups was accessed by the associated page.
   event interestGroupAccessed
     parameters
```

## Roll protocol to r960453 — _2022-01-18T17:15:26.000Z_
######  Diff: [`87addc3...7572c21`](https://github.com/ChromeDevTools/devtools-protocol/compare/`87addc3...7572c21`)

```diff
@@ browser_protocol.pdl:8626 @@ experimental domain Storage
       websql
       service_workers
       cache_storage
-      interest_groups
       all
       other
 
@@ -8644,37 +8643,6 @@ experimental domain Storage
     properties
       string issuerOrigin
       number count
-  
-  # Enum of interest group access types.
-  type InterestGroupAccessType extends string
-    enum
-      join
-      leave
-      update
-      bid
-      win
-  
-  # Ad advertising element inside an interest group.
-  type InterestGroupAd extends object
-    properties
-      string renderUrl
-      optional string metadata
-
-  # The full details of an interest group.
-  type InterestGroupDetails extends object
-    properties
-      string ownerOrigin
-      string name
-      number expirationTime
-      string joiningOrigin
-      optional string biddingUrl
-      optional string biddingWasmHelperUrl
-      optional string updateUrl
-      optional string trustedBiddingSignalsUrl
-      array of string trustedBiddingSignalsKeys
-      optional string userBiddingSignals
-      array of InterestGroupAd ads
-      array of InterestGroupAd adComponents
 
   # Clears storage for origin.
   command clearDataForOrigin
@@ -8775,19 +8743,6 @@ experimental domain Storage
       # True if any tokens were deleted, false otherwise.
       boolean didDeleteTokens
 
-  # Gets details for a named interest group.
-  experimental command getInterestGroupDetails
-    parameters
-      string ownerOrigin
-      string name
-    returns
-      InterestGroupDetails details
-
-  # Enables/Disables issuing of interestGroupAccessed events.
-  experimental command setInterestGroupTracking
-    parameters
-      boolean enable
-
   # A cache's contents have been modified.
   event cacheStorageContentUpdated
     parameters
@@ -8817,13 +8772,6 @@ experimental domain Storage
     parameters
       # Origin to update.
       string origin
-  
-  # One of the interest groups was accessed by the associated page.
-  event interestGroupAccessed
-    parameters
-      InterestGroupAccessType type
-      string ownerOrigin
-      string name
 
 # The SystemInfo domain defines methods and events for querying low-level system information.
 experimental domain SystemInfo
```

## Roll protocol to r959523 — _2022-01-15T04:15:23.000Z_
######  Diff: [`f7a5f38...87addc3`](https://github.com/ChromeDevTools/devtools-protocol/compare/`f7a5f38...87addc3`)

```diff
@@ browser_protocol.pdl:7177 @@ domain Page
       # The pictograph font-family.
       optional string pictograph
 
-  # Font families collection for a script.
-  experimental type ScriptFontFamilies extends object
-    properties
-      # Name of the script which these font families are defined for.
-      string script
-      # Generic font families collection for the script.
-      FontFamilies fontFamilies
-
   # Default font sizes.
   experimental type FontSizes extends object
     properties
@@ -7645,8 +7637,6 @@ domain Page
     parameters
       # Specifies font families to set. If a font family is not specified, it won't be changed.
       FontFamilies fontFamilies
-      # Specifies font families to set for individual scripts.
-      optional array of ScriptFontFamilies forScripts
 
   # Set default font sizes.
   experimental command setFontSizes
```

## Roll protocol to r957544 — _2022-01-11T14:15:23.000Z_
######  Diff: [`4f0ee26...a1608c5`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4f0ee26...a1608c5`)

```diff
@@ browser_protocol.pdl:6713 @@ experimental domain Overlay
       # True for showing scroll bottleneck rects
       boolean show
 
-  # Deprecated, no longer has any effect.
-  deprecated command setShowHitTestBorders
+  # Requests that backend shows hit-test borders on layers
+  command setShowHitTestBorders
     parameters
       # True for showing hit-test borders
       boolean show
```

## Roll protocol to r955664 — _2022-01-05T12:15:53.000Z_
######  Diff: [`90efbcc...d0d815e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`90efbcc...d0d815e`)

```diff
@@ browser_protocol.pdl:769 @@ experimental domain Audits
       # instead. This standard was abandoned in January, 1970. See
       # https://www.chromestatus.com/feature/5684870116278272 for more details."
       deprecated optional string message
-      string deprecationType
 
   type ClientHintIssueReason extends string
     enum
```

## Roll protocol to r953906 — _2021-12-23T19:15:37.000Z_
######  Diff: [`17a9c3e...96ead19`](https://github.com/ChromeDevTools/devtools-protocol/compare/`17a9c3e...96ead19`)

```diff
@@ browser_protocol.pdl:9795 @@ experimental domain WebAuthn
       # https://fidoalliance.org/specs/fido-v2.1-rd-20201208/fido-client-to-authenticator-protocol-v2.1-rd-20201208.html#sctn-credBlob-extension
       # Defaults to false.
       optional boolean hasCredBlob
-      # If set to true, the authenticator will support the minPinLength extension.
-      # https://fidoalliance.org/specs/fido-v2.1-ps-20210615/fido-client-to-authenticator-protocol-v2.1-ps-20210615.html#sctn-minpinlength-extension
-      # Defaults to false.
-      optional boolean hasMinPinLength
       # If set to true, tests of user presence will succeed immediately.
       # Otherwise, they will not be resolved. Defaults to true.
       optional boolean automaticPresenceSimulation
```

## Roll protocol to r953752 — _2021-12-23T05:15:20.000Z_
######  Diff: [`b411e13...17a9c3e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`b411e13...17a9c3e`)

```diff
@@ browser_protocol.pdl:8100 @@ domain Page
       # Not restored reason
       BackForwardCacheNotRestoredReason reason
 
-  experimental type BackForwardCacheNotRestoredExplanationTree extends object
-    properties
-      # URL of each frame
-      string url
-      # Not restored reasons of each frame
-      array of BackForwardCacheNotRestoredExplanation explanations
-      # Array of children frame
-      array of BackForwardCacheNotRestoredExplanationTree children
-
   # Fired for failed bfcache history navigations if BackForwardCache feature is enabled. Do
   # not assume any ordering with the Page.frameNavigated event. This event is fired only for
   # main-frame history navigation where the document changes (non-same-document navigations),
@@ -8121,8 +8112,6 @@ domain Page
       FrameId frameId
       # Array of reasons why the page could not be cached. This must not be empty.
       array of BackForwardCacheNotRestoredExplanation notRestoredExplanations
-      # Tree structure of reasons why the page could not be cached for each frame.
-      optional BackForwardCacheNotRestoredExplanationTree notRestoredExplanationsTree
 
   event loadEventFired
     parameters
```

## Roll protocol to r952438 — _2021-12-16T18:15:30.000Z_
######  Diff: [`12d9e69...b411e13`](https://github.com/ChromeDevTools/devtools-protocol/compare/`12d9e69...b411e13`)

```diff
@@ browser_protocol.pdl:2049 @@ domain DOM
       scrollbar-corner
       resizer
       input-list-button
-      transition
-      transition-container
-      transition-old-content
-      transition-new-content
 
   # Shadow root type.
   type ShadowRootType extends string
```

## Roll protocol to r952091 — _2021-12-15T21:15:35.000Z_
######  Diff: [`e96cb74...12d9e69`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e96cb74...12d9e69`)

```diff
@@ browser_protocol.pdl:770 @@ experimental domain Audits
       # https://www.chromestatus.com/feature/5684870116278272 for more details."
       deprecated optional string message
 
-  type ClientHintIssueReason extends string
-    enum
-      # Items in the accept-ch meta tag allow list must be valid origins.
-      # No special values (e.g. self, none, and *) are permitted.
-      MetaTagAllowListInvalidOrigin
-      # Only accept-ch meta tags in the original HTML sent from the server
-      # are respected. Any injected via javascript (or other means) are ignored.
-      MetaTagModifiedHTML
-
-  # This issue tracks client hints related issues. It's used to deprecate old
-  # features, encourage the use of new ones, and provide general guidance.
-  type ClientHintIssueDetails extends object
-    properties
-      SourceCodeLocation sourceCodeLocation
-      ClientHintIssueReason clientHintIssueReason
-
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -806,7 +790,6 @@ experimental domain Audits
       WasmCrossOriginModuleSharingIssue
       GenericIssue
       DeprecationIssue
-      ClientHintIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -828,7 +811,6 @@ experimental domain Audits
       optional WasmCrossOriginModuleSharingIssueDetails wasmCrossOriginModuleSharingIssue
       optional GenericIssueDetails genericIssueDetails
       optional DeprecationIssueDetails deprecationIssueDetails
-      optional ClientHintIssueDetails clientHintIssueDetails
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
```

## Roll protocol to r948336 — _2021-12-04T17:15:26.000Z_
######  Diff: [`11ea32a...dc1b71a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`11ea32a...dc1b71a`)

```diff
@@ browser_protocol.pdl:705 @@ experimental domain Audits
       AttributionEventSourceTriggerDataTooLarge
       InvalidAttributionSourceExpiry
       InvalidAttributionSourcePriority
-      InvalidEventSourceTriggerData
-      InvalidTriggerPriority
-      InvalidTriggerDedupKey
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
```

## Roll protocol to r947303 — _2021-12-02T01:15:26.000Z_
######  Diff: [`2a18d25...11ea32a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`2a18d25...11ea32a`)

```diff
@@ browser_protocol.pdl:703 @@ experimental domain Audits
       AttributionUntrustworthyOrigin
       AttributionTriggerDataTooLarge
       AttributionEventSourceTriggerDataTooLarge
-      InvalidAttributionSourceExpiry
-      InvalidAttributionSourcePriority
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
```

## Roll protocol to r946693 — _2021-11-30T22:15:35.000Z_
######  Diff: [`baf4231...2a18d25`](https://github.com/ChromeDevTools/devtools-protocol/compare/`baf4231...2a18d25`)

```diff
@@ browser_protocol.pdl:1949 @@ experimental domain Cast
     parameters
       string sinkName
 
-  # Starts mirroring the desktop to the sink.
-  command startDesktopMirroring
-    parameters
-      string sinkName
-
   # Starts mirroring the tab to the sink.
   command startTabMirroring
     parameters
```

## Roll protocol to r946318 — _2021-11-30T04:15:44.000Z_
######  Diff: [`76839dc...baf4231`](https://github.com/ChromeDevTools/devtools-protocol/compare/`76839dc...baf4231`)

```diff
@@ browser_protocol.pdl:8035 @@ domain Page
       ContentWebUSB
       ContentMediaSession
       ContentMediaSessionService
-      ContentScreenReader
 
       # See components/back_forward_cache/back_forward_cache_disable.h for explanations.
       EmbedderPopupBlockerTabHelper
```

## Roll protocol to r945905 — _2021-11-29T11:15:22.000Z_
######  Diff: [`47ce494...76839dc`](https://github.com/ChromeDevTools/devtools-protocol/compare/`47ce494...76839dc`)

```diff
@@ browser_protocol.pdl:4908 @@ domain Network
       PreflightInvalidAllowOriginValue
       PreflightAllowOriginMismatch
       PreflightInvalidAllowCredentials
-      # TODO(https://crbug.com/1263483): Remove this once frontend code does
-      # not reference it anymore.
       PreflightMissingAllowExternal
-      # TODO(https://crbug.com/1263483): Remove this once frontend code does
-      # not reference it anymore.
       PreflightInvalidAllowExternal
-      PreflightMissingAllowPrivateNetwork
-      PreflightInvalidAllowPrivateNetwork
       InvalidAllowMethodsPreflightResponse
       InvalidAllowHeadersPreflightResponse
       MethodDisallowedByPreflightResponse
```

## Roll protocol to r944179 — _2021-11-22T19:15:40.000Z_
######  Diff: [`15f524c...47ce494`](https://github.com/ChromeDevTools/devtools-protocol/compare/`15f524c...47ce494`)

```diff
@@ browser_protocol.pdl:8930 @@ domain Target
       # Proxy bypass list, similar to the one passed to --proxy-bypass-list
       optional string proxyBypassList
       # An optional list of origins to grant unlimited cross-origin access to.
-      # Parts of the URL other than those constituting origin are ignored.
       optional array of string originsWithUniversalNetworkAccess
 
     returns
```

## Roll protocol to r943687 — _2021-11-19T22:15:27.000Z_
######  Diff: [`946136a...15f524c`](https://github.com/ChromeDevTools/devtools-protocol/compare/`946136a...15f524c`)

```diff
@@ browser_protocol.pdl:8929 @@ domain Target
       optional string proxyServer
       # Proxy bypass list, similar to the one passed to --proxy-bypass-list
       optional string proxyBypassList
-      # An optional list of origins to grant unlimited cross-origin access to.
-      optional array of string originsWithUniversalNetworkAccess
 
     returns
       # The id of the context created.
```

## Roll protocol to r943452 — _2021-11-19T09:15:22.000Z_
######  Diff: [`bee0143...946136a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`bee0143...946136a`)

```diff
@@ browser_protocol.pdl:6204 @@ domain Network
     parameters
       ReportingApiReport report
 
-  experimental type ReportingApiEndpoint extends object
-    properties
-      # The URL of the endpoint to which reports may be delivered.
-      string url
-      # Name of the endpoint group.
-      string groupName
-
-  experimental event reportingApiEndpointsChangedForOrigin
-    parameters
-      # Origin of the document(s) which configured the endpoints.
-      string origin
-      array of ReportingApiEndpoint endpoints
-
   # An object providing the result of a network resource load.
   experimental type LoadNetworkResourcePageResult extends object
     properties
```

## Roll protocol to r943026 — _2021-11-18T11:15:23.000Z_
######  Diff: [`22bc316...bee0143`](https://github.com/ChromeDevTools/devtools-protocol/compare/`22bc316...bee0143`)

```diff
@@ browser_protocol.pdl:5117 @@ domain Network
       # An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
       # This is a temporary ability and it will be removed in the future.
       experimental integer sourcePort
-      # Cookie partition key. The site of the top-level URL the browser was visiting at the start
-      # of the request to the endpoint that set the cookie.
-      experimental optional string partitionKey
-      # True if cookie partition key is opaque.
-      experimental optional boolean partitionKeyOpaque
 
   # Types of reasons why a cookie may not be stored from a response.
   experimental type SetCookieBlockedReason extends string
@@ -5280,10 +5275,6 @@ domain Network
       # An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
       # This is a temporary ability and it will be removed in the future.
       experimental optional integer sourcePort
-      # Cookie partition key. The site of the top-level URL the browser was visiting at the start
-      # of the request to the endpoint that set the cookie.
-      # If not set, the cookie will be set as not partitioned.
-      experimental optional string partitionKey
 
   # Authorization challenge for HTTP status code 401 or 407.
   experimental type AuthChallenge extends object
@@ -5654,10 +5645,6 @@ domain Network
       # An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
       # This is a temporary ability and it will be removed in the future.
       experimental optional integer sourcePort
-      # Cookie partition key. The site of the top-level URL the browser was visiting at the start
-      # of the request to the endpoint that set the cookie.
-      # If not set, the cookie will be set as not partitioned.
-      experimental optional string partitionKey
     returns
       # Always set to true. If an error occurs, the response indicates protocol error.
       deprecated boolean success
```

## Roll protocol to r942138 — _2021-11-16T14:15:29.000Z_
######  Diff: [`0308368...22bc316`](https://github.com/ChromeDevTools/devtools-protocol/compare/`0308368...22bc316`)

```diff
@@ browser_protocol.pdl:278 @@ experimental domain Accessibility
       # including nodes that are ignored for accessibility.
       array of AXNode nodes
 
-  # The loadComplete event mirrors the load complete event sent by the browser to assistive
-  # technology when the web page has finished loading.
-  experimental event loadComplete
-    parameters
-      # New document root node.
-      AXNode root
-
-  # The nodesUpdated event is sent every time a previously requested node has changed the in tree.
-  experimental event nodesUpdated
-    parameters
-      # Updated node data.
-      array of AXNode nodes
-
 experimental domain Animation
   depends on Runtime
   depends on DOM
```

## Roll protocol to r940865 — _2021-11-11T19:15:26.000Z_
######  Diff: [`a2c84e8...0308368`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a2c84e8...0308368`)

```diff
@@ browser_protocol.pdl:3383 @@ domain Emulation
   experimental type UserAgentMetadata extends object
     properties
       optional array of UserAgentBrandVersion brands
-      optional array of UserAgentBrandVersion fullVersionList
-      deprecated optional string fullVersion
+      optional string fullVersion
       string platform
       string platformVersion
       string architecture
@@ -6768,7 +6767,6 @@ domain Page
       ch-ua-model
       ch-ua-mobile
       ch-ua-full-version
-      ch-ua-full-version-list
       ch-ua-platform-version
       ch-ua-reduced
       ch-viewport-height
```

## Roll protocol to r939882 — _2021-11-09T17:15:27.000Z_
######  Diff: [`e9d7ebc...ef5e053`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e9d7ebc...ef5e053`)

```diff
@@ browser_protocol.pdl:8374 @@ domain Security
       # Security state information about the page.
       VisibleSecurityState visibleSecurityState
 
-  # The security state of the page changed. No longer being sent.
-  deprecated event securityStateChanged
+  # The security state of the page changed.
+  event securityStateChanged
     parameters
       # Security state.
       SecurityState securityState
```

## Roll protocol to r939725 — _2021-11-09T07:16:13.000Z_
######  Diff: [`ec485f2...e9d7ebc`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ec485f2...e9d7ebc`)

```diff
@@ browser_protocol.pdl:232 @@ experimental domain Accessibility
     returns
       AXNode node
 
-  # Fetches a node and all ancestors up to and including the root.
-  # Requires `enable()` to have been called previously.
-  experimental command getAXNodeAndAncestors
-    parameters
-      # Identifier of the node to get.
-      optional DOM.NodeId nodeId
-      # Identifier of the backend node to get.
-      optional DOM.BackendNodeId backendNodeId
-      # JavaScript object id of the node wrapper to get.
-      optional Runtime.RemoteObjectId objectId
-    returns
-      array of AXNode nodes
-
   # Fetches a particular accessibility node by AXNodeId.
   # Requires `enable()` to have been called previously.
   experimental command getChildAXNodes
```

## Roll protocol to r939404 — _2021-11-08T17:15:45.000Z_
######  Diff: [`8ae67d9...ec485f2`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8ae67d9...ec485f2`)

```diff
@@ browser_protocol.pdl:222 @@ experimental domain Accessibility
     returns
       array of AXNode nodes
 
-  # Fetches the root node.
-  # Requires `enable()` to have been called previously.
-  experimental command getRootAXNode
-    parameters
-      # The frame in whose document the node resides.
-      # If omitted, the root frame is used.
-      optional Page.FrameId frameId
-    returns
-      AXNode node
-
   # Fetches a particular accessibility node by AXNodeId.
   # Requires `enable()` to have been called previously.
   experimental command getChildAXNodes
```

## Roll protocol to r939359 — _2021-11-08T15:15:23.000Z_
######  Diff: [`e42953d...8ae67d9`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e42953d...8ae67d9`)

```diff
@@ browser_protocol.pdl:176 @@ experimental domain Accessibility
       optional AXValue value
       # All other properties
       optional array of AXProperty properties
-      # ID for this node's parent.
-      optional AXNodeId parentId
       # IDs for each of this node's child nodes.
       optional array of AXNodeId childIds
       # The backend ID for the associated DOM node, if any.
       optional DOM.BackendNodeId backendDOMNodeId
-      # The frame ID for the frame associated with this nodes document.
-      optional Page.FrameId frameId
 
   # Disables the accessibility domain.
   command disable
```

## Roll protocol to r938885 — _2021-11-05T19:15:27.000Z_
######  Diff: [`3c2ebcf...790428e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3c2ebcf...790428e`)

```diff
@@ browser_protocol.pdl:6763 @@ domain Page
       hid
       idle-detection
       interest-cohort
-      join-ad-interest-group
       keyboard-map
       magnetometer
       microphone
@@ -6772,7 +6771,6 @@ domain Page
       payment
       picture-in-picture
       publickey-credentials-get
-      run-ad-auction
       screen-wake-lock
       serial
       shared-autofill
```

## Roll protocol to r938546 — _2021-11-04T22:15:26.000Z_
######  Diff: [`4957f55...3c2ebcf`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4957f55...3c2ebcf`)

```diff
@@ browser_protocol.pdl:7645 @@ domain Page
   # Clears seeded compilation cache.
   experimental command clearCompilationCache
 
-  # Sets the Secure Payment Confirmation transaction mode.
-  # https://w3c.github.io/secure-payment-confirmation/#sctn-automation-set-spc-transaction-mode
-  experimental command setSPCTransactionMode
-    parameters
-      enum mode
-        none
-        autoaccept
-        autoreject
-
   # Generates a report for testing.
   experimental command generateTestReport
     parameters
```

## Roll protocol to r938504 — _2021-11-04T21:15:28.000Z_
######  Diff: [`0fe9d20...4957f55`](https://github.com/ChromeDevTools/devtools-protocol/compare/`0fe9d20...4957f55`)

```diff
@@ browser_protocol.pdl:8343 @@ domain Security
       SecurityState securityState
       # True if the page was loaded over cryptographic transport such as HTTPS.
       deprecated boolean schemeIsCryptographic
-      # Previously a list of explanations for the security state. Now always
-      # empty.
-      deprecated array of SecurityStateExplanation explanations
+      # List of explanations for the security state. If the overall security state is `insecure` or
+      # `warning`, at least one corresponding explanation should be included.
+      array of SecurityStateExplanation explanations
       # Information about insecure content on the page.
       deprecated InsecureContentStatus insecureContentStatus
-      # Overrides user-visible description of the state. Always omitted.
-      deprecated optional string summary
+      # Overrides user-visible description of the state.
+      optional string summary
 
 experimental domain ServiceWorker
   depends on Target
```

## Roll protocol to r938446 — _2021-11-04T20:15:28.000Z_
######  Diff: [`e73ddb9...0fe9d20`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e73ddb9...0fe9d20`)

```diff
@@ browser_protocol.pdl:4784 @@ domain Network
       string logDescription
       # Log ID.
       string logId
-      # Issuance date. Unlike TimeSinceEpoch, this contains the number of
-      # milliseconds since January 1, 1970, UTC, not the number of seconds.
-      number timestamp
+      # Issuance date.
+      TimeSinceEpoch timestamp
       # Hash algorithm.
       string hashAlgorithm
       # Signature algorithm.
```

## Roll protocol to r937139 — _2021-11-02T00:15:24.000Z_
######  Diff: [`23061aa...e73ddb9`](https://github.com/ChromeDevTools/devtools-protocol/compare/`23061aa...e73ddb9`)

```diff
@@ browser_protocol.pdl:723 @@ experimental domain Audits
       # around January 2022. Please use Web Storage or Indexed Database
       # instead. This standard was abandoned in January, 1970. See
       # https://www.chromestatus.com/feature/5684870116278272 for more details."
-      deprecated optional string message
+      optional string message
 
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
```

## Roll protocol to r937072 — _2021-11-01T22:15:26.000Z_
######  Diff: [`3a36442...23061aa`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3a36442...23061aa`)

```diff
@@ browser_protocol.pdl:2842 @@ domain DOMDebugger
       # Resource URL substring. All XHRs having this substring in the URL will get stopped upon.
       string url
 
-# EventBreakpoints permits setting breakpoints on particular operations and
-# events in targets that run JavaScript but do not have a DOM.
-# JavaScript execution will stop on these operations as if there was a regular
-# breakpoint set.
-experimental domain EventBreakpoints
-  # Sets breakpoint on particular native event.
-  command setInstrumentationBreakpoint
-    parameters
-      # Instrumentation name to stop on.
-      string eventName
-
-  # Removes breakpoint on particular native event.
-  command removeInstrumentationBreakpoint
-    parameters
-      # Instrumentation name to stop on.
-      string eventName
-
 # This domain facilitates obtaining document snapshots with DOM, layout, and style information.
 experimental domain DOMSnapshot
   depends on CSS
```

## Roll protocol to r937044 — _2021-11-01T21:15:26.000Z_
######  Diff: [`bc8fa61...3a36442`](https://github.com/ChromeDevTools/devtools-protocol/compare/`bc8fa61...3a36442`)

```diff
@@ browser_protocol.pdl:709 @@ experimental domain Audits
       GenericIssueErrorType errorType
       optional Page.FrameId frameId
 
-  # This issue tracks information needed to print a deprecation message.
-  # The formatting is inherited from the old console.log version, see more at:
-  # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/deprecation.cc
-  # TODO(crbug.com/1264960): Re-work format to add i18n support per:
-  # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/public/devtools_protocol/README.md
-  type DeprecationIssueDetails extends object
-    properties
-      optional AffectedFrame affectedFrame
-      SourceCodeLocation sourceCodeLocation
-      # The content of the deprecation issue (this won't be translated),
-      # e.g. "window.inefficientLegacyStorageMethod will be removed in M97,
-      # around January 2022. Please use Web Storage or Indexed Database
-      # instead. This standard was abandoned in January, 1970. See
-      # https://www.chromestatus.com/feature/5684870116278272 for more details."
-      optional string message
-
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -744,7 +728,6 @@ experimental domain Audits
       NavigatorUserAgentIssue
       WasmCrossOriginModuleSharingIssue
       GenericIssue
-      DeprecationIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -765,7 +748,6 @@ experimental domain Audits
       optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
       optional WasmCrossOriginModuleSharingIssueDetails wasmCrossOriginModuleSharingIssue
       optional GenericIssueDetails genericIssueDetails
-      optional DeprecationIssueDetails deprecationIssueDetails
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
```

## Roll protocol to r933220 — _2021-10-19T23:15:31.000Z_
######  Diff: [`ed35fe7...df7c5a3`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ed35fe7...df7c5a3`)

```diff
@@ browser_protocol.pdl:5729 @@ domain Network
       TimeSinceEpoch wallTime
       # Request initiator.
       Initiator initiator
-      # In the case that redirectResponse is populated, this flag indicates whether
-      # requestWillBeSentExtraInfo and responseReceivedExtraInfo events will be or were emitted
-      # for the request which was just redirected.
-      experimental boolean redirectHasExtraInfo
       # Redirect response data.
       optional Response redirectResponse
       # Type of this resource.
@@ -5773,9 +5769,6 @@ domain Network
       ResourceType type
       # Response data.
       Response response
-      # Indicates whether requestWillBeSentExtraInfo and responseReceivedExtraInfo events will be
-      # or were emitted for this request.
-      experimental boolean hasExtraInfo
       # Frame identifier.
       optional Page.FrameId frameId
```

## Roll protocol to r932485 — _2021-10-18T12:15:24.000Z_
######  Diff: [`204c97a...ed35fe7`](https://github.com/ChromeDevTools/devtools-protocol/compare/`204c97a...ed35fe7`)

```diff
@@ browser_protocol.pdl:7907 @@ domain Page
       ContentWebUSB
       ContentMediaSession
       ContentMediaSessionService
+      ContentMediaPlay
 
       # See components/back_forward_cache/back_forward_cache_disable.h for explanations.
       EmbedderPopupBlockerTabHelper
```

## Roll protocol to r931720 — _2021-10-14T22:15:25.000Z_
######  Diff: [`5095a49...204c97a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5095a49...204c97a`)

```diff
@@ browser_protocol.pdl:8829 @@ domain Target
       # Frame height in DIP (headless chrome only).
       optional integer height
       # The browser context to create the page in.
-      experimental optional Browser.BrowserContextID browserContextId
+      optional Browser.BrowserContextID browserContextId
       # Whether BeginFrames for this target will be controlled via DevTools (headless chrome only,
       # not supported on MacOS yet, false by default).
       experimental optional boolean enableBeginFrameControl
```

## Roll protocol to r931360 — _2021-10-14T03:15:26.000Z_
######  Diff: [`8bbdba3...5095a49`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8bbdba3...5095a49`)

```diff
@@ browser_protocol.pdl:6720 @@ domain Page
       hid
       idle-detection
       interest-cohort
-      keyboard-map
       magnetometer
       microphone
       midi
```

## Roll protocol to r931234 — _2021-10-13T21:15:26.000Z_
######  Diff: [`76bd05b...8bbdba3`](https://github.com/ChromeDevTools/devtools-protocol/compare/`76bd05b...8bbdba3`)

```diff
@@ browser_protocol.pdl:579 @@ experimental domain Audits
       kURLViolation
       kTrustedTypesSinkViolation
       kTrustedTypesPolicyViolation
-      kWasmEvalViolation
 
   type SourceCodeLocation extends object
     properties
```

## Roll protocol to r931171 — _2021-10-13T19:15:29.000Z_
######  Diff: [`35e6406...76bd05b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`35e6406...76bd05b`)

```diff
@@ browser_protocol.pdl:48 @@ experimental domain Accessibility
   # Enum of possible native property sources (as a subtype of a particular AXValueSourceType).
   type AXValueNativeSourceType extends string
     enum
-      description
       figcaption
       label
       labelfor
```

## Roll protocol to r930289 — _2021-10-11T21:15:33.000Z_
######  Diff: [`5f55be2...35e6406`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5f55be2...35e6406`)

```diff
@@ browser_protocol.pdl:7578 @@ domain Page
   # Stops sending each frame in the `screencastFrame`.
   experimental command stopScreencast
 
+  # Forces compilation cache to be generated for every subresource script.
+  # See also: `Page.produceCompilationCache`.
+  experimental command setProduceCompilationCache
+    parameters
+      boolean enabled
+
   # Requests backend to produce compilation cache for the specified scripts.
-  # `scripts` are appeneded to the list of scripts for which the cache
-  # would be produced. The list may be reset during page navigation.
+  # Unlike setProduceCompilationCache, this allows client to only produce cache
+  # for specific scripts. `scripts` are appeneded to the list of scripts
+  # for which the cache for would produced. Disabling compilation cache with
+  # `setProduceCompilationCache` would reset all pending cache requests.
+  # The list may also be reset during page navigation.
   # When script with a matching URL is encountered, the cache is optionally
   # produced upon backend discretion, based on internal heuristics.
   # See also: `Page.compilationCacheProduced`.
```

## Roll protocol to r928170 — _2021-10-05T16:15:26.000Z_
######  Diff: [`6d3ed49...5f55be2`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6d3ed49...5f55be2`)

```diff
@@ browser_protocol.pdl:4836 @@ domain Network
       MethodDisallowedByPreflightResponse
       HeaderDisallowedByPreflightResponse
       RedirectContainsCredentials
-      # Request was a private network request initiated by a non-secure context.
       InsecurePrivateNetwork
-      # Request carried a target IP address space property that did not match
-      # the target resource's address space.
       InvalidPrivateNetworkAccess
-      # Request was a private network request yet did not carry a target IP
-      # address space.
-      UnexpectedPrivateNetworkAccess
       NoCorsRedirectModeNotFollow
 
   type CorsErrorStatus extends object
@@ -5873,8 +5867,6 @@ domain Network
       Allow
       BlockFromInsecureToMorePrivate
       WarnFromInsecureToMorePrivate
-      PreflightBlock
-      PreflightWarn
 
   experimental type IPAddressSpace extends string
     enum
```

## Roll protocol to r927854 — _2021-10-04T22:15:31.000Z_
######  Diff: [`d24ecc6...6d3ed49`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d24ecc6...6d3ed49`)

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

## Roll protocol to r927104 — _2021-10-01T05:15:28.000Z_
######  Diff: [`75edf97...d24ecc6`](https://github.com/ChromeDevTools/devtools-protocol/compare/`75edf97...d24ecc6`)

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

## Roll protocol to r927069 — _2021-10-01T02:15:27.000Z_
######  Diff: [`6b5fb3f...75edf97`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6b5fb3f...75edf97`)

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

## Roll protocol to r926768 — _2021-09-30T15:28:28.000Z_
######  Diff: [`2f92c4d...6b5fb3f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`2f92c4d...6b5fb3f`)

```diff
@@ js_protocol.pdl:175 @@ domain Debugger
   command enable
     parameters
       # The maximum size in bytes of collected scripts (not referenced by other heap objects)
-      # the debugger can hold. Puts no limit if parameter is omitted.
+      # the debugger can hold. Puts no limit if paramter is omitted.
       experimental optional number maxScriptsCacheSize
     returns
       # Unique identifier of the debugger.
@@ -267,7 +267,7 @@ domain Debugger
       BreakpointId breakpointId
 
   # Restarts particular call frame from the beginning.
-  deprecated command restartFrame
+  command restartFrame
     parameters
       # Call frame identifier to evaluate on.
       CallFrameId callFrameId
@@ -707,17 +707,13 @@ experimental domain HeapProfiler
       # when the tracking is stopped.
       optional boolean reportProgress
       optional boolean treatGlobalObjectsAsRoots
-      # If true, numerical values are included in the snapshot
-      optional boolean captureNumericValue
 
   command takeHeapSnapshot
     parameters
       # If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.
       optional boolean reportProgress
-      # If true, a raw snapshot without artificial roots will be generated
+      # If true, a raw snapshot without artifical roots will be generated
       optional boolean treatGlobalObjectsAsRoots
-      # If true, numerical values are included in the snapshot
-      optional boolean captureNumericValue
 
   event addHeapSnapshotChunk
     parameters
@@ -845,6 +841,24 @@ domain Profiler
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
@@ -909,6 +923,30 @@ domain Profiler
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
+  # Enable run time call stats collection.
+  experimental command enableRuntimeCallStats
+
+  # Disable run time call stats collection.
+  experimental command disableRuntimeCallStats
+
+  # Retrieve run time call stats.
+  experimental command getRuntimeCallStats
+    returns
+      # Collected runtime call counter information.
+      array of RuntimeCallCounterInfo result
+
   event consoleProfileFinished
     parameters
       string id
@@ -930,13 +968,13 @@ domain Profiler
   # Reports coverage delta since the last poll (either from an event like this, or from
   # `takePreciseCoverage` for the current isolate. May only be sent if precise code
   # coverage has been started. This event can be trigged by the embedder to, for example,
-  # trigger collection of coverage data immediately at a certain point in time.
+  # trigger collection of coverage data immediatelly at a certain point in time.
   experimental event preciseCoverageDeltaUpdate
     parameters
       # Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
       number timestamp
       # Identifier for distinguishing coverage events.
-      string occasion
+      string occassion
       # Coverage data for the current isolate.
       array of ScriptCoverage result
 
@@ -1183,7 +1221,7 @@ domain Runtime
       string origin
       # Human readable name describing given context.
       string name
-      # A system-unique execution context identifier. Unlike the id, this is unique across
+      # A system-unique execution context identifier. Unlike the id, this is unique accross
       # multiple processes, so can be reliably used to identify specific context while backend
       # performs a cross-process navigation.
       experimental string uniqueId
@@ -1212,10 +1250,6 @@ domain Runtime
       optional RemoteObject exception
       # Identifier of the context where exception happened.
       optional ExecutionContextId executionContextId
-      # Dictionary with entries of meta data that the client associated
-      # with this exception, such as information about associated network
-      # requests, etc.
-      experimental optional object exceptionMetaData
 
   # Number of milliseconds since epoch.
   type Timestamp extends number
@@ -1305,8 +1339,6 @@ domain Runtime
       # Symbolic group name that can be used to release multiple objects. If objectGroup is not
       # specified and objectId is, objectGroup will be inherited from object.
       optional string objectGroup
-      # Whether to throw an exception if side effect cannot be ruled out during evaluation.
-      experimental optional boolean throwOnSideEffect
     returns
       # Call result.
       RemoteObject result
@@ -1386,9 +1418,9 @@ domain Runtime
       # evaluation and allows unsafe-eval. Defaults to true.
       experimental optional boolean allowUnsafeEvalBlockedByCSP
       # An alternative way to specify the execution context to evaluate in.
-      # Compared to contextId that may be reused across processes, this is guaranteed to be
+      # Compared to contextId that may be reused accross processes, this is guaranteed to be
       # system-unique, so it can be used to prevent accidental evaluation of the expression
-      # in context different than intended (e.g. as a result of navigation across process
+      # in context different than intended (e.g. as a result of navigation accross process
       # boundaries).
       # This is mutually exclusive with `contextId`.
       experimental optional string uniqueContextId
@@ -1427,8 +1459,6 @@ domain Runtime
       experimental optional boolean accessorPropertiesOnly
       # Whether preview should be generated for the results.
       experimental optional boolean generatePreview
-      # If true, returns non-indexed properties only.
-      experimental optional boolean nonIndexedPropertiesOnly
     returns
       # Object properties.
       array of PropertyDescriptor result
@@ -1533,10 +1563,7 @@ domain Runtime
       # execution context. If omitted and `executionContextName` is not set,
       # the binding is exposed to all execution contexts of the target.
       # This parameter is mutually exclusive with `executionContextName`.
-      # Deprecated in favor of `executionContextName` due to an unclear use case
-      # and bugs in implementation (crbug.com/1169639). `executionContextId` will be
-      # removed in the future.
-      deprecated optional ExecutionContextId executionContextId
+      optional ExecutionContextId executionContextId
       # If specified, the binding is exposed to the executionContext with
       # matching name, even for contexts created after the binding is added.
       # See also `ExecutionContext.name` and `worldName` parameter to
@@ -1632,8 +1659,6 @@ domain Runtime
     parameters
       RemoteObject object
       object hints
-      # Identifier of the context where the call was made.
-      experimental optional ExecutionContextId executionContextId
 
 # This domain is deprecated.
 deprecated domain Schema
```

## Roll protocol to r926580 — _2021-09-30T04:15:20.000Z_
######  Diff: [`5cc536e...2f92c4d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5cc536e...2f92c4d`)

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

## Roll protocol to r926578 — _2021-09-30T01:15:25.000Z_
######  Diff: [`5459753...5cc536e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5459753...5cc536e`)

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

## Roll protocol to r926181 — _2021-09-29T09:15:25.000Z_
######  Diff: [`929d048...5459753`](https://github.com/ChromeDevTools/devtools-protocol/compare/`929d048...5459753`)

```diff
@@ browser_protocol.pdl:6427 @@ experimental domain Overlay
       # The style of the descendants' borders.
       optional LineStyle descendantBorder
 
-  type IsolatedElementHighlightConfig extends object
-    properties
-      # A descriptor for the highlight appearance of an element in isolation mode.
-      IsolationModeHighlightConfig isolationModeHighlightConfig
-      # Identifier of the isolated element to highlight.
-      DOM.NodeId nodeId
-
-  type IsolationModeHighlightConfig extends object
-    properties
-      # The fill color of the resizers (default: transparent).
-      optional DOM.RGBA resizerColor
-      # The fill color for resizer handles (default: transparent).
-      optional DOM.RGBA resizerHandleColor
-      # The fill color for the mask covering non-isolated elements (default: transparent).
-      optional DOM.RGBA maskColor
-
   type InspectMode extends string
     enum
       searchForNode
@@ -6657,12 +6641,6 @@ experimental domain Overlay
       # hinge data, null means hideHinge
       optional HingeConfig hingeConfig
 
-  # Show elements in isolation mode with overlays.
-  command setShowIsolatedElements
-    parameters
-      # An array of node identifiers and descriptors for the highlight appearance.
-      array of IsolatedElementHighlightConfig isolatedElementHighlightConfigs
-
   # Fired when the node should be inspected. This happens after call to `setInspectMode` or when
   # user manually inspects an element.
   event inspectNodeRequested
```

## Roll protocol to r925217 — _2021-09-27T11:15:29.000Z_
######  Diff: [`8157ba0...929d048`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8157ba0...929d048`)

```diff
@@ browser_protocol.pdl:4917 @@ domain Network
       HeaderDisallowedByPreflightResponse
       RedirectContainsCredentials
       InsecurePrivateNetwork
-      InvalidPrivateNetworkAccess
       NoCorsRedirectModeNotFollow
 
   type CorsErrorStatus extends object
```

## Roll protocol to r924707 — _2021-09-24T10:15:21.000Z_
######  Diff: [`b32cbf9...8157ba0`](https://github.com/ChromeDevTools/devtools-protocol/compare/`b32cbf9...8157ba0`)

```diff
@@ browser_protocol.pdl:776 @@ experimental domain Audits
       string targetOrigin
       boolean isWarning
 
-  type GenericIssueErrorType extends string
-    enum
-      CrossOriginPortalPostMessageError
-
-  # Depending on the concrete errorType, different properties are set.
-  type GenericIssueDetails extends object
-    properties
-      # Issues with the same errorType are aggregated in the frontend.
-      GenericIssueErrorType errorType
-      optional Page.FrameId frameId
-
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -805,7 +794,6 @@ experimental domain Audits
       QuirksModeIssue
       NavigatorUserAgentIssue
       WasmCrossOriginModuleSharingIssue
-      GenericIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -825,7 +813,6 @@ experimental domain Audits
       optional QuirksModeIssueDetails quirksModeIssueDetails
       optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
       optional WasmCrossOriginModuleSharingIssueDetails wasmCrossOriginModuleSharingIssue
-      optional GenericIssueDetails genericIssueDetails
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
```

## Roll protocol to r924232 — _2021-09-23T09:15:23.000Z_
######  Diff: [`f300e4d...b32cbf9`](https://github.com/ChromeDevTools/devtools-protocol/compare/`f300e4d...b32cbf9`)

```diff
@@ browser_protocol.pdl:7241 @@ domain Page
       optional binary primaryIcon
 
   # Returns the unique (PWA) app id.
-  # Only returns values if the feature flag 'WebAppEnableManifestId' is enabled
   experimental command getAppId
     returns
-      # App id, either from manifest's id attribute or computed from start_url
+      # Only returns a value if the feature flag 'WebAppEnableManifestId' is enabled
       optional string appId
-      # Recommendation for manifest's id attribute to match current id computed from start_url
-      optional string recommendedId
 
   # Returns all browser cookies. Depending on the backend support, will return detailed cookie
   # information in the `cookies` field.
```

## Roll protocol to r924041 — _2021-09-22T21:15:29.000Z_
######  Diff: [`3c9570a...f300e4d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3c9570a...f300e4d`)

```diff
@@ browser_protocol.pdl:408 @@ experimental domain Animation
       # Animation that was started.
       Animation animation
 
-# The domain is deprecated as AppCache is being removed (see crbug.com/582750).
-experimental deprecated domain ApplicationCache
+experimental domain ApplicationCache
   depends on Page
 
   # Detailed application cache resource information.
```

## Roll protocol to r923714 — _2021-09-22T03:15:27.000Z_
######  Diff: [`d6f4069...3c9570a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d6f4069...3c9570a`)

```diff
@@ browser_protocol.pdl:7934 @@ domain Page
       InjectedStyleSheet
       Dummy
       # Disabled for render frame host reasons
-      # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
       ContentWebAuthenticationAPI
       ContentFileChooser
@@ -7945,9 +7944,6 @@ domain Page
       ContentWebUSB
       ContentMediaSession
       ContentMediaSessionService
-      ContentMediaPlay
-
-      # See components/back_forward_cache/back_forward_cache_disable.h for explanations.
       EmbedderPopupBlockerTabHelper
       EmbedderSafeBrowsingTriggeredPopupBlocker
       EmbedderSafeBrowsingThreatDetails
```

## Roll protocol to r923359 — _2021-09-21T13:15:22.000Z_
######  Diff: [`384a24c...d6f4069`](https://github.com/ChromeDevTools/devtools-protocol/compare/`384a24c...d6f4069`)

```diff
@@ browser_protocol.pdl:5151 @@ domain Network
       # (which is required in order to use "SameParty"); or specified the "SameSite=Strict"
       # attribute (which is forbidden when using "SameParty").
       SamePartyConflictsWithOtherAttributes
-      # The cookie's name/value pair size exceeded the size limit defined in
-      # RFC6265bis.
-      NameValuePairExceedsMaxSize
 
   # Types of reasons why a cookie may not be sent with a request.
   experimental type CookieBlockedReason extends string
@@ -5198,9 +5195,6 @@ domain Network
       SchemefulSameSiteUnspecifiedTreatedAsLax
       # The cookie had the "SameParty" attribute and the request was made from a cross-party context.
       SamePartyFromCrossPartyContext
-      # The cookie's name/value pair size exceeded the size limit defined in
-      # RFC6265bis.
-      NameValuePairExceedsMaxSize
 
   # A cookie which was not stored from a response with the corresponding reason.
   experimental type BlockedSetCookieWithReason extends object
```

## Roll protocol to r923255 — _2021-09-21T06:15:25.000Z_
######  Diff: [`f62186c...384a24c`](https://github.com/ChromeDevTools/devtools-protocol/compare/`f62186c...384a24c`)

```diff
@@ browser_protocol.pdl:7937 @@ domain Page
       ContentWebBluetooth
       ContentWebUSB
       ContentMediaSession
-      ContentMediaSessionService
       EmbedderPopupBlockerTabHelper
       EmbedderSafeBrowsingTriggeredPopupBlocker
       EmbedderSafeBrowsingThreatDetails
```

## Roll protocol to r922637 — _2021-09-17T20:15:26.000Z_
######  Diff: [`d99de50...b86f904`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d99de50...b86f904`)

```diff
@@ browser_protocol.pdl:6800 @@ domain Page
       FeatureDisabled
       TokenDisabled
       FeatureDisabledForUser
-      UnknownTrial
 
   # Status for an Origin Trial.
   experimental type OriginTrialStatus extends string
```

## Roll protocol to r921910 — _2021-09-15T23:15:28.000Z_
######  Diff: [`2e2333f...d99de50`](https://github.com/ChromeDevTools/devtools-protocol/compare/`2e2333f...d99de50`)

```diff
@@ browser_protocol.pdl:6715 @@ domain Page
       ch-device-memory
       ch-downlink
       ch-ect
+      ch-lang
       ch-prefers-color-scheme
       ch-rtt
       ch-ua
```

## Roll protocol to r919640 — _2021-09-09T05:15:45.000Z_
######  Diff: [`a27d92f...2e2333f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a27d92f...2e2333f`)

```diff
@@ browser_protocol.pdl:7926 @@ domain Page
       OutstandingNetworkRequestDirectSocket
       InjectedJavascript
       InjectedStyleSheet
-      Dummy
       # Disabled for render frame host reasons
       ContentSecurityHandler
       ContentWebAuthenticationAPI
```

## Roll protocol to r919376 — _2021-09-08T19:15:34.000Z_
######  Diff: [`c80e5d1...a27d92f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`c80e5d1...a27d92f`)

```diff
@@ browser_protocol.pdl:739 @@ experimental domain Audits
       AttributionSourceUntrustworthyOrigin
       AttributionUntrustworthyOrigin
       AttributionTriggerDataTooLarge
-      AttributionEventSourceTriggerDataTooLarge
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
```

## Roll protocol to r919343 — _2021-09-08T18:15:31.000Z_
######  Diff: [`3caee55...c80e5d1`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3caee55...c80e5d1`)

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

## Roll protocol to r919243 — _2021-09-08T14:15:32.000Z_
######  Diff: [`2bce709...3caee55`](https://github.com/ChromeDevTools/devtools-protocol/compare/`2bce709...3caee55`)

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

## Roll protocol to r918852 — _2021-09-07T18:15:30.000Z_
######  Diff: [`8759635...2bce709`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8759635...2bce709`)

```diff
@@ browser_protocol.pdl:7923 @@ domain Page
       KeyboardLock
       WebOTPService
       OutstandingNetworkRequestDirectSocket
-      InjectedJavascript
+      IsolatedWorldScript
       InjectedStyleSheet
       # Disabled for render frame host reasons
       ContentSecurityHandler
```

## Roll protocol to r918800 — _2021-09-07T15:15:38.000Z_
######  Diff: [`f18b042...8759635`](https://github.com/ChromeDevTools/devtools-protocol/compare/`f18b042...8759635`)

```diff
@@ browser_protocol.pdl:3412 @@ domain Emulation
       # Whether to enable to disable focus emulation.
       boolean enabled
 
-  # Automatically render all web contents using a dark theme.
-  experimental command setAutoDarkModeOverride
-    parameters
-      # Whether to enable or disable automatic dark mode.
-      # If not specified, any existing override will be cleared.
-      optional boolean enabled
-
   # Enables CPU throttling to emulate slow CPUs.
   experimental command setCPUThrottlingRate
     parameters
```

## Roll protocol to r918755 — _2021-09-07T12:15:26.000Z_
######  Diff: [`841918b...f18b042`](https://github.com/ChromeDevTools/devtools-protocol/compare/`841918b...f18b042`)

```diff
@@ browser_protocol.pdl:6133 @@ domain Network
       Network.TimeSinceEpoch timestamp
       # How many uploads deep the related request was.
       integer depth
-      # The number of delivery attempts made so far, not including an active attempt.
-      integer completedAttempts
       object body
-      ReportStatus status
 
   # Is sent whenever a new report is added.
   # And after 'enableReportingApi' for all existing reports.
@@ -6144,10 +6141,6 @@ domain Network
     parameters
       ReportingApiReport report
 
-  experimental event reportingApiReportUpdated
-    parameters
-      ReportingApiReport report
-
   # An object providing the result of a network resource load.
   experimental type LoadNetworkResourcePageResult extends object
     properties
```

## Roll protocol to r918695 — _2021-09-07T06:15:26.000Z_
######  Diff: [`69ec1d8...841918b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`69ec1d8...841918b`)

```diff
@@ browser_protocol.pdl:6105 @@ domain Network
   # The status of a Reporting API report.
   experimental type ReportStatus extends string
     enum
-      # Report has been queued and no attempt has been made to deliver it yet,
+      # Report has been queued but no attempt has been made to deliver it yet,
       # or attempted previous upload failed (impermanently).
       Queued
       # There is an ongoing attempt to upload this report.
       Pending
-      # Deletion of this report was requested while it was pending, so it will
-      # be removed after possibly outstanding upload attempts complete (successful
-      # or not).
-      MarkedForRemoval
-      # Successfully uploaded and MarkedForRemoval.
-      Success
 
   experimental type ReportId extends string
```

## Roll protocol to r918555 — _2021-09-06T11:15:31.000Z_
######  Diff: [`e4f6e30...69ec1d8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e4f6e30...69ec1d8`)

```diff
@@ browser_protocol.pdl:6111 @@ domain Network
       # There is an ongoing attempt to upload this report.
       Pending
 
-  experimental type ReportId extends string
-
   # An object representing a report generated by the Reporting API.
   experimental type ReportingApiReport extends object
     properties
-      ReportId id
       # The URL of the document that triggered the report.
       string initiatorUrl
       # The name of the endpoint group that should be used to deliver the report.
```

## Roll protocol to r917689 — _2021-09-02T16:15:35.000Z_
######  Diff: [`3ac2966...e4f6e30`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3ac2966...e4f6e30`)

```diff
@@ browser_protocol.pdl:7849 @@ domain Page
       BrowsingInstanceNotSwapped
       BackForwardCacheDisabledForDelegate
       OptInUnloadHeaderNotPresent
-      UnloadHandlerExistsInMainFrame
       UnloadHandlerExistsInSubFrame
       ServiceWorkerUnregistration
       CacheControlNoStore
```

## Roll protocol to r915197 — _2021-08-25T15:15:50.000Z_
######  Diff: [`5b380d1...3ac2966`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5b380d1...3ac2966`)

```diff
@@ browser_protocol.pdl:6848 @@ domain Page
       experimental CrossOriginIsolatedContextType crossOriginIsolatedContextType
       # Indicated which gated APIs / features are available.
       experimental array of GatedAPIFeatures gatedAPIFeatures
+      # Frame document's origin trials with at least one token present.
+      experimental optional array of OriginTrial originTrials
 
   # Information about the Resource on the page.
   experimental type FrameResource extends object
```

## Roll protocol to r914774 — _2021-08-24T17:15:43.000Z_
######  Diff: [`6626782...5b380d1`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6626782...5b380d1`)

```diff
@@ browser_protocol.pdl:8902 @@ domain Target
 
   # Adds the specified target to the list of targets that will be monitored for any related target
   # creation (such as child frames, child workers and new versions of service worker) and reported
-  # through `attachedToTarget`. The specified target is also auto-attached.
-  # This cancels the effect of any previous `setAutoAttach` and is also cancelled by subsequent
-  # `setAutoAttach`. Only available at the Browser target.
+  # through `attachedToTarget`. This cancel the effect of any previous `setAutoAttach` and is also
+  # cancelled by subsequent `setAutoAttach`. Only available at the Browser target.
   experimental command autoAttachRelated
     parameters
       TargetID targetId
```

## Roll protocol to r914689 — _2021-08-24T11:15:27.000Z_
######  Diff: [`cebcf39...6626782`](https://github.com/ChromeDevTools/devtools-protocol/compare/`cebcf39...6626782`)

```diff
@@ browser_protocol.pdl:7903 @@ domain Page
       OutstandingNetworkRequestDirectSocket
       IsolatedWorldScript
       InjectedStyleSheet
+      MediaSessionImplOnServiceCreated
       # Disabled for render frame host reasons
+      ContentMediaSessionImplOnServiceCreated
       ContentSecurityHandler
       ContentWebAuthenticationAPI
       ContentFileChooser
```

## Roll protocol to r914246 — _2021-08-23T10:15:24.000Z_
######  Diff: [`e36e630...cebcf39`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e36e630...cebcf39`)

```diff
@@ browser_protocol.pdl:7211 @@ domain Page
     returns
       optional binary primaryIcon
 
-  # Returns the unique (PWA) app id.
-  experimental command getAppId
-    returns
-      # Only returns a value if the feature flag 'WebAppEnableManifestId' is enabled
-      optional string appId
-
   # Returns all browser cookies. Depending on the backend support, will return detailed cookie
   # information in the `cookies` field.
   experimental deprecated command getCookies
```

## Roll protocol to r914207 — _2021-08-23T07:15:27.000Z_
######  Diff: [`e355d86...e36e630`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e355d86...e36e630`)

```diff
@@ browser_protocol.pdl:7897 @@ domain Page
       OutstandingNetworkRequestDirectSocket
       IsolatedWorldScript
       InjectedStyleSheet
-      MediaSessionImplOnServiceCreated
       # Disabled for render frame host reasons
-      ContentMediaSessionImplOnServiceCreated
-      ContentSecurityHandler
-      ContentWebAuthenticationAPI
-      ContentFileChooser
-      ContentSerial
-      ContentFileSystemAccess
-      ContentMediaDevicesDispatcherHost
-      ContentWebBluetooth
-      ContentWebUSB
-      ContentMediaSession
-      EmbedderPopupBlockerTabHelper
-      EmbedderSafeBrowsingTriggeredPopupBlocker
-      EmbedderSafeBrowsingThreatDetails
-      EmbedderAppBannerManager
-      EmbedderDomDistillerViewerSource
-      EmbedderDomDistillerSelfDeletingRequestDelegate
-      EmbedderOomInterventionTabHelper
-      EmbedderOfflinePage
-      EmbedderChromePasswordManagerClientBindCredentialManager
-      EmbedderPermissionRequestManager
-      EmbedderModalDialog
-      EmbedderExtensions
-      EmbedderExtensionMessaging
-      EmbedderExtensionMessagingForOpenPort
-      EmbedderExtensionSentMessageToCachedFrame
+      MediaSessionImplOnServiceCreated
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

## Roll protocol to r913948 — _2021-08-20T20:15:44.000Z_
######  Diff: [`a558ebd...e355d86`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a558ebd...e355d86`)

```diff
@@ browser_protocol.pdl:9230 @@ domain Fetch
       # need to represent some non-UTF8 values that can't be transmitted
       # over the protocol as text.
       optional binary binaryResponseHeaders
-      # A response body. If absent, original response body will be used if
-      # the request is intercepted at the response stage and empty body
-      # will be used if the request is intercepted at the request stage.
+      # A response body.
       optional binary body
       # A textual representation of responseCode.
       # If absent, a standard phrase matching responseCode is used.
@@ -9262,26 +9260,6 @@ domain Fetch
       # Response to  with an authChallenge.
       AuthChallengeResponse authChallengeResponse
 
-  # Continues loading of the paused response, optionally modifying the
-  # response headers. If either responseCode or headers are modified, all of them
-  # must be present.
-  experimental command continueResponse
-    parameters
-      # An id the client received in requestPaused event.
-      RequestId requestId
-      # An HTTP response code. If absent, original response code will be used.
-      optional integer responseCode
-      # A textual representation of responseCode.
-      # If absent, a standard phrase matching responseCode is used.
-      optional string responsePhrase
-      # Response headers. If absent, original response headers will be used.
-      optional array of HeaderEntry responseHeaders
-      # Alternative way of specifying response headers as a \0-separated
-      # series of name: value pairs. Prefer the above method unless you
-      # need to represent some non-UTF8 values that can't be transmitted
-      # over the protocol as text.
-      optional binary binaryResponseHeaders
-
   # Causes the body of the response to be received from the server and
   # returned as a single string. May only be issued for a request that
   # is paused in the Response stage and is mutually exclusive with
```

## Roll protocol to r913327 — _2021-08-19T09:15:31.000Z_
######  Diff: [`d30492e...a558ebd`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d30492e...a558ebd`)

```diff
@@ browser_protocol.pdl:4451 @@ domain Log
         error
       # Logged text.
       string text
-      optional enum category
-        cors
       # Timestamp when this entry was added.
       Runtime.Timestamp timestamp
       # URL of the resource if known.
```

## Roll protocol to r912925 — _2021-08-18T08:15:25.000Z_
######  Diff: [`ba60fa4...d30492e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ba60fa4...d30492e`)

```diff
@@ browser_protocol.pdl:208 @@ experimental domain Accessibility
     parameters
       # The maximum depth at which descendants of the root node should be retrieved.
       # If omitted, the full tree is returned.
-      optional integer depth
-      # Deprecated. This parameter has been renamed to `depth`. If depth is not provided, max_depth will be used.
-      deprecated optional integer max_depth
+      optional integer max_depth
       # The frame for whose document the AX tree should be retrieved.
       # If omited, the root frame is used.
       optional Page.FrameId frameId
```

## Roll protocol to r912603 — _2021-08-17T16:15:25.000Z_
######  Diff: [`9b427a9...ba60fa4`](https://github.com/ChromeDevTools/devtools-protocol/compare/`9b427a9...ba60fa4`)

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
```

## Roll protocol to r912566 — _2021-08-17T14:15:28.000Z_
######  Diff: [`5c0761c...9b427a9`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5c0761c...9b427a9`)

```diff
@@ browser_protocol.pdl:7840 @@ domain Page
       WebShare
       RequestedStorageAccessGrant
       WebNfc
+      WebFileSystem
       OutstandingNetworkRequestFetch
       OutstandingNetworkRequestXHR
       AppBanner
```

## Roll protocol to r912314 — _2021-08-16T20:16:28.000Z_
######  Diff: [`289585c...5c0761c`](https://github.com/ChromeDevTools/devtools-protocol/compare/`289585c...5c0761c`)

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
@@ -6662,7 +6699,6 @@ domain Page
       ch-ua-full-version
       ch-ua-platform-version
       ch-ua-reduced
-      ch-viewport-height
       ch-viewport-width
       ch-width
       clipboard-read
@@ -9272,8 +9308,6 @@ domain Fetch
       optional Network.ErrorReason responseErrorReason
       # Response code if intercepted at response stage.
       optional integer responseStatusCode
-      # Response status text if intercepted at response stage.
-      optional string responseStatusText
       # Response headers if intercepted at the response stage.
       optional array of HeaderEntry responseHeaders
       # If the intercepted request had a corresponding Network.requestWillBeSent event fired for it,
```

## Roll protocol to r912162 — _2021-08-16T14:16:23.000Z_
######  Diff: [`5000852...289585c`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5000852...289585c`)

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
```

## Roll protocol to r911867 — _2021-08-13T20:16:18.000Z_
######  Diff: [`e811304...b3fb07a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e811304...b3fb07a`)

```diff
@@ browser_protocol.pdl:5922 @@ domain Network
       Public
       Unknown
 
-  experimental type ConnectTiming extends object
-    properties
-      # Timing's requestTime is a baseline in seconds, while the other numbers are ticks in
-      # milliseconds relatively to this requestTime. Matches ResourceTiming's requestTime for
-      # the same request (but not for redirected requests).
-      number requestTime
-
   experimental type ClientSecurityState extends object
     properties
       boolean initiatorIsSecureContext
@@ -5948,8 +5941,6 @@ domain Network
       array of BlockedCookieWithReason associatedCookies
       # Raw request headers as they will be sent over the wire.
       Headers headers
-      # Connection timing information for the request.
-      experimental ConnectTiming connectTiming
       # The client security state set for the request.
       optional ClientSecurityState clientSecurityState
```

## Roll protocol to r911675 — _2021-08-13T08:16:24.000Z_
######  Diff: [`85bc00a...e811304`](https://github.com/ChromeDevTools/devtools-protocol/compare/`85bc00a...e811304`)

```diff
@@ browser_protocol.pdl:736 @@ experimental domain Audits
       InvalidAttributionData
       AttributionSourceUntrustworthyOrigin
       AttributionUntrustworthyOrigin
-      AttributionTriggerDataTooLarge
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
```

## Roll protocol to r911543 — _2021-08-12T23:17:07.000Z_
######  Diff: [`3c9fa3b...85bc00a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3c9fa3b...85bc00a`)

```diff
@@ browser_protocol.pdl:8815 @@ domain Target
   # Controls whether to automatically attach to new targets which are considered to be related to
   # this one. When turned on, attaches to all existing related targets as well. When turned off,
   # automatically detaches from all currently attached targets.
-  # This also clears all targets added by `autoAttachRelated` from the list of targets to watch
-  # for creation of related targets.
   experimental command setAutoAttach
     parameters
       # Whether to auto-attach to related targets.
@@ -8829,17 +8827,6 @@ domain Target
       # and eventually retire it. See crbug.com/991325.
       optional boolean flatten
 
-  # Adds the specified target to the list of targets that will be monitored for any related target
-  # creation (such as child frames, child workers and new versions of service worker) and reported
-  # through `attachedToTarget`. This cancel the effect of any previous `setAutoAttach` and is also
-  # cancelled by subsequent `setAutoAttach`. Only available at the Browser target.
-  experimental command autoAttachRelated
-    parameters
-      TargetID targetId
-      # Whether to pause new targets when attaching to them. Use `Runtime.runIfWaitingForDebugger`
-      # to run paused targets.
-      boolean waitForDebuggerOnStart
-
   # Controls whether to discover available targets and notify via
   # `targetCreated/targetInfoChanged/targetDestroyed` events.
   command setDiscoverTargets
```

## Roll protocol to r911116 — _2021-08-12T02:16:24.000Z_
######  Diff: [`2b18125...3c9fa3b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`2b18125...3c9fa3b`)

```diff
@@ browser_protocol.pdl:7800 @@ domain Page
       CacheControlNoStoreHTTPOnlyCookieModified
       NoResponseHead
       Unknown
-      ActivationNavigationsDisallowedForBug1234857
       #Blocklisted features
       WebSocket
-      WebTransport
       WebRTC
       MainResourceHasCacheControlNoStore
       MainResourceHasCacheControlNoCache
```

## Roll protocol to r910715 — _2021-08-11T08:16:14.000Z_
######  Diff: [`5cff1bc...2b18125`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5cff1bc...2b18125`)

```diff
@@ browser_protocol.pdl:209 @@ experimental domain Accessibility
       # The maximum depth at which descendants of the root node should be retrieved.
       # If omitted, the full tree is returned.
       optional integer max_depth
-      # The frame for whose document the AX tree should be retrieved.
-      # If omited, the root frame is used.
-      optional Page.FrameId frameId
     returns
       array of AXNode nodes
 
@@ -220,9 +217,6 @@ experimental domain Accessibility
   experimental command getChildAXNodes
     parameters
       AXNodeId id
-      # The frame in whose document the node resides.
-      # If omitted, the root frame is used.
-      optional Page.FrameId frameId
     returns
       array of AXNode nodes
 
@@ -7799,7 +7793,6 @@ domain Page
       CacheControlNoStoreCookieModified
       CacheControlNoStoreHTTPOnlyCookieModified
       NoResponseHead
-      Unknown
       #Blocklisted features
       WebSocket
       WebRTC
@@ -7844,17 +7837,8 @@ domain Page
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
+      Unknown
 
   # Types of not restored reasons for back-forward cache.
   experimental type BackForwardCacheNotRestoredReasonType extends string
```

## Roll protocol to r910293 — _2021-08-10T14:16:40.000Z_
######  Diff: [`caec9d3...5cff1bc`](https://github.com/ChromeDevTools/devtools-protocol/compare/`caec9d3...5cff1bc`)

```diff
@@ browser_protocol.pdl:6098 @@ domain Network
   # Fetches the resource and returns the content.
   experimental command loadNetworkResource
     parameters
-      # Frame id to get the resource for. Mandatory for frame targets, and
-      # should be omitted for worker targets.
-      optional Page.FrameId frameId
+      # Frame id to get the resource for.
+      Page.FrameId frameId
       # URL of the resource to get content for.
       string url
       # Options for the request.
```

## Roll protocol to r910184 — _2021-08-10T07:16:07.000Z_
######  Diff: [`d1e1cbf...caec9d3`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d1e1cbf...caec9d3`)

```diff
@@ browser_protocol.pdl:6761 @@ domain Page
       # Frame unique identifier.
       FrameId id
       # Parent frame identifier.
-      optional FrameId parentId
+      optional string parentId
       # Identifier of the loader associated with this frame.
       Network.LoaderId loaderId
       # Frame's name as specified in the tag.
```

## Roll protocol to r909734 — _2021-08-09T09:16:28.000Z_
######  Diff: [`94b504e...d1e1cbf`](https://github.com/ChromeDevTools/devtools-protocol/compare/`94b504e...d1e1cbf`)

```diff
@@ browser_protocol.pdl:510 @@ experimental domain Audits
       ExcludeSameSiteLax
       ExcludeSameSiteStrict
       ExcludeInvalidSameParty
-      ExcludeSamePartyCrossPartyContext
 
   type SameSiteCookieWarningReason extends string
     enum
```

## Roll protocol to r909375 — _2021-08-06T18:16:33.000Z_
######  Diff: [`8e161fc...94b504e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8e161fc...94b504e`)

```diff
@@ browser_protocol.pdl:6318 @@ experimental domain Overlay
 
   type ContainerQueryContainerHighlightConfig extends object
     properties
-      # The style of the container border.
+      # The style of the container border
       optional LineStyle containerBorder
-      # The style of the descendants' borders.
-      optional LineStyle descendantBorder
 
   type InspectMode extends string
     enum
```

## Roll protocol to r908589 — _2021-08-04T20:16:22.000Z_
######  Diff: [`c707d30...8e161fc`](https://github.com/ChromeDevTools/devtools-protocol/compare/`c707d30...8e161fc`)

```diff
@@ browser_protocol.pdl:7361 @@ domain Page
     returns
       array of PermissionsPolicyFeatureState states
 
-  # Get Origin Trials on given frame.
-  experimental command getOriginTrials
-    parameters
-      FrameId frameId
-    returns
-      array of OriginTrial originTrials
-
   # Overrides the values of device screen dimensions (window.screen.width, window.screen.height,
   # window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media
   # query results).
```

## Roll protocol to r908187 — _2021-08-03T23:16:22.000Z_
######  Diff: [`39a8210...c707d30`](https://github.com/ChromeDevTools/devtools-protocol/compare/`39a8210...c707d30`)

```diff
@@ browser_protocol.pdl:4935 @@ domain Network
       string statusText
       # HTTP response headers.
       Headers headers
-      # HTTP response headers text. This has been replaced by the headers in Network.responseReceivedExtraInfo.
-      deprecated optional string headersText
+      # HTTP response headers text.
+      optional string headersText
       # Resource mimeType as determined by the browser.
       string mimeType
       # Refined HTTP request headers that were actually transmitted over the network.
       optional Headers requestHeaders
-      # HTTP request headers text. This has been replaced by the headers in Network.requestWillBeSentExtraInfo.
-      deprecated optional string requestHeadersText
+      # HTTP request headers text.
+      optional string requestHeadersText
       # Specifies whether physical connection was actually reused for this request.
       boolean connectionReused
       # Physical connection id that was actually used for this request.
@@ -5953,8 +5953,7 @@ domain Network
       # established the connection, so we can't send it in `requestWillBeSentExtraInfo`.
       IPAddressSpace resourceIPAddressSpace
       # The status code of the response. This is useful in cases the request failed and no responseReceived
-      # event is triggered, which is the case for, e.g., CORS errors. This is also the correct status code
-      # for cached requests, where the status in responseReceived is a 200 and this will be 304.
+      # event is triggered, which is the case for, e.g., CORS errors.
       integer statusCode
       # Raw response header text as it was received over the wire. The raw text may not always be
       # available, such as in the case of HTTP/2 or QUIC.
@@ -9156,8 +9155,6 @@ domain Fetch
       optional binary postData
       # If set, overrides the request headers.
       optional array of HeaderEntry headers
-      # If set, overrides response interception behavior for this request.
-      experimental optional boolean interceptResponse
 
   # Continues a request supplying authChallengeResponse following authRequired event.
   command continueWithAuth
```

## Roll protocol to r907573 — _2021-08-02T16:16:14.000Z_
######  Diff: [`2ae3b1d...39a8210`](https://github.com/ChromeDevTools/devtools-protocol/compare/`2ae3b1d...39a8210`)

```diff
@@ browser_protocol.pdl:2635 @@ domain DOM
       # The container node for the given node, or null if not found.
       optional NodeId nodeId
 
-  # Returns the descendants of a container query container that have
-  # container queries against this container.
-  experimental command getQueryingDescendantsForContainer
-    parameters
-      # Id of the container node to find querying descendants from.
-      NodeId nodeId
-    returns
-      # Descendant nodes with container queries against the given container.
-      array of NodeId nodeIds
-
   # Fired when `Element`'s attribute is modified.
   event attributeModified
     parameters
```

## Roll protocol to r906795 — _2021-07-29T19:17:01.000Z_
######  Diff: [`1c8cd5c...2ae3b1d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1c8cd5c...2ae3b1d`)

```diff
@@ browser_protocol.pdl:4020 @@ domain Input
       # The text to insert.
       string text
 
-  # This method sets the current candidate text for ime.
-  # Use imeCommitComposition to commit the final text.
-  # Use imeSetComposition with empty string as text to cancel composition.
-  experimental command imeSetComposition
-    parameters
-      # The text to insert
-      string text
-      # selection start
-      integer selectionStart
-      # selection end
-      integer selectionEnd
-      # replacement start
-      optional integer replacementStart
-      # replacement end
-      optional integer replacementEnd
-
   # Dispatches a mouse event to the page.
   command dispatchMouseEvent
     parameters
```

## Roll protocol to r906505 — _2021-07-29T01:16:19.000Z_
######  Diff: [`fa458e7...1c8cd5c`](https://github.com/ChromeDevTools/devtools-protocol/compare/`fa458e7...1c8cd5c`)

```diff
@@ browser_protocol.pdl:6614 @@ domain Page
       ch-ua-mobile
       ch-ua-full-version
       ch-ua-platform-version
-      ch-ua-reduced
       ch-viewport-width
       ch-width
       clipboard-read
```

## Roll protocol to r905680 — _2021-07-27T11:16:20.000Z_
######  Diff: [`52195bf...fa458e7`](https://github.com/ChromeDevTools/devtools-protocol/compare/`52195bf...fa458e7`)

```diff
@@ browser_protocol.pdl:7753 @@ domain Page
       CacheControlNoStore
       CacheControlNoStoreCookieModified
       CacheControlNoStoreHTTPOnlyCookieModified
-      NoResponseHead
       #Blocklisted features
       WebSocket
       WebRTC
```

## Roll protocol to r905252 — _2021-07-26T15:16:11.000Z_
######  Diff: [`6da1a03...52195bf`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6da1a03...52195bf`)

```diff
@@ browser_protocol.pdl:5926 @@ domain Network
       # The IP address space of the resource. The address space can only be determined once the transport
       # established the connection, so we can't send it in `requestWillBeSentExtraInfo`.
       IPAddressSpace resourceIPAddressSpace
-      # The status code of the response. This is useful in cases the request failed and no responseReceived
-      # event is triggered, which is the case for, e.g., CORS errors.
-      integer statusCode
       # Raw response header text as it was received over the wire. The raw text may not always be
       # available, such as in the case of HTTP/2 or QUIC.
       optional string headersText
```

## Roll protocol to r905235 — _2021-07-26T14:16:05.000Z_
######  Diff: [`ddfd9ff...6da1a03`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ddfd9ff...6da1a03`)

```diff
@@ browser_protocol.pdl:3944 @@ domain Input
   experimental type DragData extends object
     properties
       array of DragDataItem items
-      # List of filenames that should be included when dropping
-      optional array of string files
       # Bit field representing allowed drag operations. Copy = 1, Link = 2, Move = 16
       integer dragOperationsMask
```

## Roll protocol to r901419 — _2021-07-14T09:15:57.000Z_
######  Diff: [`f94c0d3...ddfd9ff`](https://github.com/ChromeDevTools/devtools-protocol/compare/`f94c0d3...ddfd9ff`)

```diff
@@ browser_protocol.pdl:6342 @@ experimental domain Overlay
   command hideHighlight
 
   # Highlights owner element of the frame with given id.
-  # Deprecated: Doesn't work reliablity and cannot be fixed due to process
-  # separatation (the owner node might be in a different process). Determine
-  # the owner node in the client and use highlightNode.
-  deprecated command highlightFrame
+  command highlightFrame
     parameters
       # Identifier of the frame to highlight.
       Page.FrameId frameId
```

## Roll protocol to r901394 — _2021-07-14T07:16:11.000Z_
######  Diff: [`2609869...f94c0d3`](https://github.com/ChromeDevTools/devtools-protocol/compare/`2609869...f94c0d3`)

```diff
@@ browser_protocol.pdl:7742 @@ domain Page
       OptInUnloadHeaderNotPresent
       UnloadHandlerExistsInSubFrame
       ServiceWorkerUnregistration
-      CacheControlNoStore
-      CacheControlNoStoreCookieModified
-      CacheControlNoStoreHTTPOnlyCookieModified
       #Blocklisted features
       WebSocket
       WebRTC
```

## Roll protocol to r900855 — _2021-07-13T06:16:27.000Z_
######  Diff: [`56bb0ce...2609869`](https://github.com/ChromeDevTools/devtools-protocol/compare/`56bb0ce...2609869`)

```diff
@@ browser_protocol.pdl:7754 @@ domain Page
       DedicatedWorkerOrWorklet
       OutstandingNetworkRequestOthers
       OutstandingIndexedDBTransaction
+      RequestedGeolocationPermission
       RequestedNotificationsPermission
       RequestedMIDIPermission
       RequestedAudioCapturePermission
```

## Roll protocol to r900357 — _2021-07-12T06:16:08.000Z_
######  Diff: [`db8965f...56bb0ce`](https://github.com/ChromeDevTools/devtools-protocol/compare/`db8965f...56bb0ce`)

```diff
@@ browser_protocol.pdl:3050 @@ experimental domain DOMSnapshot
       optional array of integer parentIndex
       # `Node`'s nodeType.
       optional array of integer nodeType
-      # Type of the shadow root the `Node` is in. String values are equal to the `ShadowRootType` enum.
-      optional RareStringData shadowRootType
       # `Node`'s nodeName.
       optional array of StringIndex nodeName
       # `Node`'s nodeValue.
```

## Roll protocol to r900033 — _2021-07-09T16:16:22.000Z_
######  Diff: [`cbb20a9...db8965f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`cbb20a9...db8965f`)

```diff
@@ browser_protocol.pdl:6223 @@ experimental domain Overlay
       optional FlexItemHighlightConfig flexItemHighlightConfig
       # The contrast algorithm to use for the contrast ratio (default: aa).
       optional ContrastAlgorithm contrastAlgorithm
-      # The container query container highlight configuration (default: all transparent).
-      optional ContainerQueryContainerHighlightConfig containerQueryContainerHighlightConfig
 
   type ColorFormat extends string
     enum
@@ -6275,18 +6273,6 @@ experimental domain Overlay
       # The content box highlight outline color (default: transparent).
       optional DOM.RGBA outlineColor
 
-  type ContainerQueryHighlightConfig extends object
-    properties
-      # A descriptor for the highlight appearance of container query containers.
-      ContainerQueryContainerHighlightConfig containerQueryContainerHighlightConfig
-      # Identifier of the container node to highlight.
-      DOM.NodeId nodeId
-
-  type ContainerQueryContainerHighlightConfig extends object
-    properties
-      # The style of the container border
-      optional LineStyle containerBorder
-
   type InspectMode extends string
     enum
       searchForNode
@@ -6452,11 +6438,6 @@ experimental domain Overlay
       # An array of node identifiers and descriptors for the highlight appearance.
       array of ScrollSnapHighlightConfig scrollSnapHighlightConfigs
 
-  command setShowContainerQueryOverlays
-    parameters
-      # An array of node identifiers and descriptors for the highlight appearance.
-      array of ContainerQueryHighlightConfig containerQueryHighlightConfigs
-
   # Requests that backend shows paint rectangles
   command setShowPaintRects
     parameters
```

## Roll protocol to r898382 — _2021-07-02T23:16:12.000Z_
######  Diff: [`b531de2...c935633`](https://github.com/ChromeDevTools/devtools-protocol/compare/`b531de2...c935633`)

```diff
@@ browser_protocol.pdl:2006 @@ domain DOM
       target-text
       spelling-error
       grammar-error
-      highlight
       first-line-inherited
       scrollbar
       scrollbar-thumb
```

## Roll protocol to r898124 — _2021-07-02T12:16:12.000Z_
######  Diff: [`6814a59...b531de2`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6814a59...b531de2`)

```diff
@@ browser_protocol.pdl:757 @@ experimental domain Audits
       string url
       optional SourceCodeLocation location
 
-  type WasmCrossOriginModuleSharingIssueDetails extends object
-    properties
-      string wasmModuleUrl
-      string sourceOrigin
-      string targetOrigin
-      boolean isWarning
-
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -781,7 +774,6 @@ experimental domain Audits
       AttributionReportingIssue
       QuirksModeIssue
       NavigatorUserAgentIssue
-      WasmCrossOriginModuleSharingIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -800,7 +792,6 @@ experimental domain Audits
       optional AttributionReportingIssueDetails attributionReportingIssueDetails
       optional QuirksModeIssueDetails quirksModeIssueDetails
       optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
-      optional WasmCrossOriginModuleSharingIssueDetails wasmCrossOriginModuleSharingIssue
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
```