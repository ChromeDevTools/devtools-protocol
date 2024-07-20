

## Roll protocol to r1330662 — _2024-07-20T04:28:07.000Z_
######  Diff: [`2d19a4e...72e728b`](https://github.com/ChromeDevTools/devtools-protocol/compare/2d19a4e...72e728b)

```diff
@@ browser_protocol.pdl:4185 @@ domain Emulation
       optional SensorReadingXYZ xyz
       optional SensorReadingQuaternion quaternion
 
+  experimental type PressureSource extends string
+    enum
+      cpu
+
+  experimental type PressureState extends string
+    enum
+      nominal
+      fair
+      serious
+      critical
+
+  experimental type PressureMetadata extends object
+    properties
+      optional boolean available
+
   # Tells whether emulation is supported.
   deprecated command canEmulate
     returns
@@ -4354,6 +4369,24 @@ domain Emulation
       SensorType type
       SensorReading reading
 
+  # Overrides a pressure source of a given type, as used by the Compute
+  # Pressure API, so that updates to PressureObserver.observe() are provided
+  # via setPressureStateOverride instead of being retrieved from
+  # platform-provided telemetry data.
+  experimental command setPressureSourceOverrideEnabled
+    parameters
+      boolean enabled
+      PressureSource source
+      optional PressureMetadata metadata
+
+  # Provides a given pressure state that will be processed and eventually be
+  # delivered to PressureObserver users. |source| must have been previously
+  # overridden by setPressureSourceOverrideEnabled.
+  experimental command setPressureStateOverride
+    parameters
+      PressureSource source
+      PressureState state
+
   # Overrides the Idle state.
   command setIdleOverride
     parameters
```

## Roll protocol to r1327118 — _2024-07-13T04:27:09.000Z_
######  Diff: [`7c6f8b3...2d19a4e`](https://github.com/ChromeDevTools/devtools-protocol/compare/7c6f8b3...2d19a4e)

```diff
@@ browser_protocol.pdl:10523 @@ experimental domain Storage
       exact
       modulus
 
+  experimental type AttributionReportingAggregatableDebugReportingData extends object
+    properties
+      UnsignedInt128AsBase16 keyPiece
+      # number instead of integer because not all uint32 can be represented by
+      # int
+      number value
+      array of string types
+
+  experimental type AttributionReportingAggregatableDebugReportingConfig extends object
+    properties
+      # number instead of integer because not all uint32 can be represented by
+      # int, only present for source registrations
+      optional number budget
+      UnsignedInt128AsBase16 keyPiece
+      array of AttributionReportingAggregatableDebugReportingData debugData
+      optional string aggregationCoordinatorOrigin
+
   experimental type AttributionReportingSourceRegistration extends object
     properties
       Network.TimeSinceEpoch time
@@ -10542,6 +10559,7 @@ experimental domain Storage
       optional UnsignedInt64AsBase10 debugKey
       AttributionReportingTriggerDataMatching triggerDataMatching
       SignedInt64AsBase10 destinationLimitPriority
+      AttributionReportingAggregatableDebugReportingConfig aggregatableDebugReportingConfig
 
   experimental type AttributionReportingSourceRegistrationResult extends string
     enum
@@ -10615,6 +10633,7 @@ experimental domain Storage
       optional string aggregationCoordinatorOrigin
       AttributionReportingSourceRegistrationTimeConfig sourceRegistrationTimeConfig
       optional string triggerContextId
+      AttributionReportingAggregatableDebugReportingConfig aggregatableDebugReportingConfig
 
   experimental type AttributionReportingEventLevelResult extends string
     enum
```

## Roll protocol to r1326544 — _2024-07-12T04:27:03.000Z_
######  Diff: [`09a23aa...7c6f8b3`](https://github.com/ChromeDevTools/devtools-protocol/compare/09a23aa...7c6f8b3)

```diff
@@ browser_protocol.pdl:10541 @@ experimental domain Storage
       array of AttributionReportingAggregationKeysEntry aggregationKeys
       optional UnsignedInt64AsBase10 debugKey
       AttributionReportingTriggerDataMatching triggerDataMatching
+      SignedInt64AsBase10 destinationLimitPriority
 
   experimental type AttributionReportingSourceRegistrationResult extends string
     enum
```

## Roll protocol to r1325906 — _2024-07-11T04:28:25.000Z_
######  Diff: [`8297006...09a23aa`](https://github.com/ChromeDevTools/devtools-protocol/compare/8297006...09a23aa)

```diff
@@ browser_protocol.pdl:2208 @@ experimental domain CSS
       deprecated optional array of CSSPositionFallbackRule cssPositionFallbackRules
       # A list of CSS @position-try rules matching this node, based on the position-try-fallbacks property.
       optional array of CSSPositionTryRule cssPositionTryRules
+      # Index of the active fallback in the applied position-try-fallback property,
+      # will not be set if there is no active position-try fallback.
+      optional integer activePositionFallbackIndex
       # A list of CSS at-property rules matching this node.
       optional array of CSSPropertyRule cssPropertyRules
       # A list of CSS property registrations matching this node.
@@ -7215,6 +7218,7 @@ domain Network
       UnsafeNone
       SameOriginPlusCoep
       RestrictPropertiesPlusCoep
+      NoopenerAllowPopups
 
   experimental type CrossOriginOpenerPolicyStatus extends object
     properties
```

## Roll protocol to r1325288 — _2024-07-10T04:27:56.000Z_
######  Diff: [`5c95bcf...8297006`](https://github.com/ChromeDevTools/devtools-protocol/compare/5c95bcf...8297006)

```diff
@@ browser_protocol.pdl:803 @@ experimental domain Audits
 
   type GenericIssueErrorType extends string
     enum
-      CrossOriginPortalPostMessageError
       FormLabelForNameError
       FormDuplicateIdForInputError
       FormInputWithNoLabelError
@@ -9331,7 +9330,6 @@ domain Page
       Printing
       WebDatabase
       PictureInPicture
-      Portal
       SpeechRecognizer
       IdleManager
       PaymentManager
@@ -10839,7 +10837,7 @@ domain Target
       experimental optional Page.FrameId openerFrameId
       experimental optional Browser.BrowserContextID browserContextId
       # Provides additional details for specific target types. For example, for
-      # the type of "page", this may be set to "portal" or "prerender".
+      # the type of "page", this may be set to "prerender".
       experimental optional string subtype
 
   # A filter used by target query/discovery/auto-attach operations.
@@ -12227,6 +12225,7 @@ experimental domain Preload
       JavaScriptInterfaceAdded
       JavaScriptInterfaceRemoved
       AllPrerenderingCanceled
+      WindowClosed
 
   # Fired when a preload enabled state is updated.
   event preloadEnabledStateUpdated
```

## Roll protocol to r1324661 — _2024-07-09T04:27:20.000Z_
######  Diff: [`f3aca7c...5c95bcf`](https://github.com/ChromeDevTools/devtools-protocol/compare/f3aca7c...5c95bcf)

```diff
@@ browser_protocol.pdl:4560 @@ domain IO
       # UUID of the specified Blob.
       string uuid
 
+experimental domain FileSystem
+  depends on Network
+  depends on Storage
+
+  type File extends object
+    properties
+      string name
+      # Timestamp
+      Network.TimeSinceEpoch lastModified
+      # Size in bytes
+      number size
+      string type
+
+  type Directory extends object
+    properties
+      string name
+      array of string nestedDirectories
+      # Files that are directly nested under this directory.
+      array of File nestedFiles
+
+  type BucketFileSystemLocator extends object
+    properties
+      # Storage key
+      Storage.SerializedStorageKey storageKey
+      # Bucket name. Not passing a `bucketName` will retrieve the default Bucket. (https://developer.mozilla.org/en-US/docs/Web/API/Storage_API#storage_buckets)
+      optional string bucketName
+      # Path to the directory using each path component as an array item.
+      array of string pathComponents
+
+  command getDirectory
+    parameters
+      BucketFileSystemLocator bucketFileSystemLocator
+    returns
+      # Returns the directory object at the path.
+      Directory directory
+
 experimental domain IndexedDB
   depends on Runtime
   depends on Storage
@@ -10537,6 +10573,8 @@ experimental domain Storage
       # number instead of integer because not all uint32 can be represented by
       # int
       number value
+      UnsignedInt64AsBase10 filteringId
+
 
   experimental type AttributionReportingAggregatableValueEntry extends object
     properties
@@ -10569,6 +10607,7 @@ experimental domain Storage
       array of AttributionReportingEventTriggerData eventTriggerData
       array of AttributionReportingAggregatableTriggerData aggregatableTriggerData
       array of AttributionReportingAggregatableValueEntry aggregatableValues
+      integer aggregatableFilteringIdMaxBytes
       boolean debugReporting
       optional string aggregationCoordinatorOrigin
       AttributionReportingSourceRegistrationTimeConfig sourceRegistrationTimeConfig
```

## Roll protocol to r1323829 — _2024-07-06T04:27:22.000Z_
######  Diff: [`e09b046...f3aca7c`](https://github.com/ChromeDevTools/devtools-protocol/compare/e09b046...f3aca7c)

```diff
@@ browser_protocol.pdl:7927 @@ domain Page
       compute-pressure
       cross-origin-isolated
       deferred-fetch
+      digital-credentials-get
       direct-sockets
       display-capture
       document-domain
```

## Roll protocol to r1323532 — _2024-07-05T04:28:00.000Z_
######  Diff: [`f9caf87...e09b046`](https://github.com/ChromeDevTools/devtools-protocol/compare/f9caf87...e09b046)

```diff
@@ browser_protocol.pdl:2207 @@ experimental domain CSS
       optional array of CSSKeyframesRule cssKeyframesRules
       # A list of CSS position fallbacks matching this node.
       deprecated optional array of CSSPositionFallbackRule cssPositionFallbackRules
-      # A list of CSS @position-try rules matching this node, based on the position-try-options property.
+      # A list of CSS @position-try rules matching this node, based on the position-try-fallbacks property.
       optional array of CSSPositionTryRule cssPositionTryRules
       # A list of CSS at-property rules matching this node.
       optional array of CSSPropertyRule cssPropertyRules
```

## Roll protocol to r1323165 — _2024-07-04T04:27:18.000Z_
######  Diff: [`98a6075...f9caf87`](https://github.com/ChromeDevTools/devtools-protocol/compare/98a6075...f9caf87)

```diff
@@ browser_protocol.pdl:2031 @@ experimental domain CSS
       StyleSheetOrigin origin
       # Associated style declaration.
       CSSStyle style
+      boolean active
 
   # CSS keyframes rule representation.
   type CSSKeyframesRule extends object
```

## Roll protocol to r1319565 — _2024-06-26T04:28:01.000Z_
######  Diff: [`549a18a...98a6075`](https://github.com/ChromeDevTools/devtools-protocol/compare/549a18a...98a6075)

```diff
@@ browser_protocol.pdl:12426 @@ experimental domain PWA
       # manifestId.
       optional string installUrlOrBundleUrl
 
-  # Uninstals the given manifest_id and closes any opened app windows.
+  # Uninstalls the given manifest_id and closes any opened app windows.
   command uninstall
     parameters
       string manifestId
@@ -12448,7 +12448,7 @@ experimental domain PWA
   # used to attach to via Target.attachToTarget or similar APIs.
   # If some files in the parameters cannot be handled by the web app, they will
   # be ignored. If none of the files can be handled, this API returns an error.
-  # If no files provided as the parameter, this API also returns an error.
+  # If no files are provided as the parameter, this API also returns an error.
   #
   # According to the definition of the file handlers in the manifest file, one
   # Target.TargetID may represent a page handling one or more files. The order
@@ -12465,7 +12465,39 @@ experimental domain PWA
 
   # Opens the current page in its web app identified by the manifest id, needs
   # to be called on a page target. This function returns immediately without
-  # waiting for the app finishing loading.
+  # waiting for the app to finish loading.
   command openCurrentPageInApp
     parameters
       string manifestId
+
+  # If user prefers opening the app in browser or an app window.
+  type DisplayMode extends string
+    enum
+      standalone
+      browser
+
+  # Changes user settings of the web app identified by its manifestId. If the
+  # app was not installed, this command returns an error. Unset parameters will
+  # be ignored; unrecognized values will cause an error.
+  #
+  # Unlike the ones defined in the manifest files of the web apps, these
+  # settings are provided by the browser and controlled by the users, they
+  # impact the way the browser handling the web apps.
+  #
+  # See the comment of each parameter.
+  command changeAppUserSettings
+    parameters
+      string manifestId
+      # If user allows the links clicked on by the user in the app's scope, or
+      # extended scope if the manifest has scope extensions and the flags
+      # `DesktopPWAsLinkCapturingWithScopeExtensions` and
+      # `WebAppEnableScopeExtensions` are enabled.
+      #
+      # Note, the API does not support resetting the linkCapturing to the
+      # initial value, uninstalling and installing the web app again will reset
+      # it.
+      #
+      # TODO(crbug.com/339453269): Setting this value on ChromeOS is not
+      # supported yet.
+      optional boolean linkCapturing
+      optional DisplayMode displayMode
```

## Roll protocol to r1317765 — _2024-06-21T04:27:31.000Z_
######  Diff: [`6859c96...549a18a`](https://github.com/ChromeDevTools/devtools-protocol/compare/6859c96...549a18a)

```diff
@@ browser_protocol.pdl:892 @@ experimental domain Audits
       ClientMetadataNoResponse
       ClientMetadataInvalidResponse
       ClientMetadataInvalidContentType
+      IdpNotPotentiallyTrustworthy
       DisabledInSettings
+      DisabledInFlags
       ErrorFetchingSignin
       InvalidSigninResponse
       AccountsHttpNotFound
@@ -915,6 +917,7 @@ experimental domain Audits
       NotSignedInWithIdp
       MissingTransientUserActivation
       ReplacedByButtonMode
+      InvalidFieldsSpecified
       RelyingPartyOriginIsOpaque
       TypeNotMatching
 
@@ -7121,6 +7124,9 @@ domain Network
       # The number of obtained Trust Tokens on a successful "Issuance" operation.
       optional integer issuedTokenCount
 
+  # Fired once security policy has been updated.
+  experimental event policyUpdated
+
   # Fired once when parsing the .wbn file has succeeded.
   # The event contains the information about the web bundle contents.
   experimental event subresourceWebBundleMetadataReceived
```

## Roll protocol to r1317198 — _2024-06-20T04:26:46.000Z_
######  Diff: [`210a6c6...6859c96`](https://github.com/ChromeDevTools/devtools-protocol/compare/210a6c6...6859c96)

```diff
@@ browser_protocol.pdl:1367 @@ domain Browser
       optional boolean userVisibleOnly
       # For "clipboard" permission, may specify allowWithoutSanitization.
       optional boolean allowWithoutSanitization
+      # For "fullscreen" permission, must specify allowWithoutGesture:true.
+      optional boolean allowWithoutGesture
       # For "camera" permission, may specify panTiltZoom.
       optional boolean panTiltZoom
 
@@ -7119,9 +7121,6 @@ domain Network
       # The number of obtained Trust Tokens on a successful "Issuance" operation.
       optional integer issuedTokenCount
 
-  # Fired once security policy has been updated.
-  experimental event policyUpdated
-
   # Fired once when parsing the .wbn file has succeeded.
   # The event contains the information about the web bundle contents.
   experimental event subresourceWebBundleMetadataReceived
```

## Roll protocol to r1316850 — _2024-06-19T04:27:32.000Z_
######  Diff: [`1e50e23...210a6c6`](https://github.com/ChromeDevTools/devtools-protocol/compare/1e50e23...210a6c6)

```diff
@@ browser_protocol.pdl:7119 @@ domain Network
       # The number of obtained Trust Tokens on a successful "Issuance" operation.
       optional integer issuedTokenCount
 
+  # Fired once security policy has been updated.
+  experimental event policyUpdated
+
   # Fired once when parsing the .wbn file has succeeded.
   # The event contains the information about the web bundle contents.
   experimental event subresourceWebBundleMetadataReceived
```

## Roll protocol to r1315554 — _2024-06-15T04:28:24.000Z_
######  Diff: [`db710ff...1e50e23`](https://github.com/ChromeDevTools/devtools-protocol/compare/db710ff...1e50e23)

```diff
@@ browser_protocol.pdl:156 @@ experimental domain Accessibility
       flowto
       labelledby
       owns
+      url
 
   # A node in the accessibility tree.
   type AXNode extends object
@@ -10508,6 +10509,7 @@ experimental domain Storage
       reportingOriginsPerSiteLimitReached
       exceedsMaxChannelCapacity
       exceedsMaxTriggerStateCardinality
+      destinationPerDayReportingLimitReached
 
   experimental event attributionReportingSourceRegistered
     parameters
```

## Roll protocol to r1312386 — _2024-06-08T04:27:15.000Z_
######  Diff: [`1db3824...db710ff`](https://github.com/ChromeDevTools/devtools-protocol/compare/1db3824...db710ff)

```diff
@@ browser_protocol.pdl:915 @@ experimental domain Audits
       MissingTransientUserActivation
       ReplacedByButtonMode
       RelyingPartyOriginIsOpaque
+      TypeNotMatching
 
   type FederatedAuthUserInfoRequestIssueDetails extends object
     properties
@@ -6075,7 +6076,7 @@ domain Network
       # An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
       # This is a temporary ability and it will be removed in the future.
       experimental integer sourcePort
-      # Cookie partition key. 
+      # Cookie partition key.
       experimental optional CookiePartitionKey partitionKey
       # True if cookie partition key is opaque.
       experimental optional boolean partitionKeyOpaque
@@ -6496,8 +6497,8 @@ domain Network
       optional string domain
       # If specified, deletes only cookies with the exact path.
       optional string path
-      # If specified, deletes only cookies with the the given name and partitionKey where 
-      # where all partition key attributes match the cookie partition key attribute.
+      # If specified, deletes only cookies with the the given name and partitionKey where
+      # all partition key attributes match the cookie partition key attribute.
       experimental optional CookiePartitionKey partitionKey
 
   # Disables network tracking, prevents network events from being sent to the client.
@@ -9248,6 +9249,11 @@ domain Page
       HTTPAuthRequired
       CookieFlushed
       BroadcastChannelOnMessage
+      WebViewSettingsChanged
+      WebViewJavaScriptObjectChanged
+      WebViewMessageListenerInjected
+      WebViewSafeBrowsingAllowlistChanged
+      WebViewDocumentStartJavascriptChanged
       #Blocklisted features
       WebSocket
       WebTransport
```

## Roll protocol to r1311068 — _2024-06-06T04:27:10.000Z_
######  Diff: [`689e8cb...1db3824`](https://github.com/ChromeDevTools/devtools-protocol/compare/689e8cb...1db3824)

```diff
@@ browser_protocol.pdl:6032 @@ domain Network
       # Set if another request triggered this request (e.g. preflight).
       optional RequestId requestId
 
+  # cookiePartitionKey object
+  # The representation of the components of the key that are created by the cookiePartitionKey class contained in net/cookies/cookie_partition_key.h.
+  experimental type CookiePartitionKey extends object
+    properties
+      # The site of the top-level URL the browser was visiting at the start
+      # of the request to the endpoint that set the cookie.
+      string topLevelSite
+      # Indicates if the cookie has any ancestors that are cross-site to the topLevelSite.
+      boolean hasCrossSiteAncestor
+
   # Cookie object
   type Cookie extends object
     properties
@@ -6065,9 +6075,8 @@ domain Network
       # An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
       # This is a temporary ability and it will be removed in the future.
       experimental integer sourcePort
-      # Cookie partition key. The site of the top-level URL the browser was visiting at the start
-      # of the request to the endpoint that set the cookie.
-      experimental optional string partitionKey
+      # Cookie partition key. 
+      experimental optional CookiePartitionKey partitionKey
       # True if cookie partition key is opaque.
       experimental optional boolean partitionKeyOpaque
 
@@ -6283,10 +6292,8 @@ domain Network
       # An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
       # This is a temporary ability and it will be removed in the future.
       experimental optional integer sourcePort
-      # Cookie partition key. The site of the top-level URL the browser was visiting at the start
-      # of the request to the endpoint that set the cookie.
-      # If not set, the cookie will be set as not partitioned.
-      experimental optional string partitionKey
+      # Cookie partition key. If not set, the cookie will be set as not partitioned.
+      experimental optional CookiePartitionKey partitionKey
 
   # Authorization challenge for HTTP status code 401 or 407.
   experimental type AuthChallenge extends object
@@ -6489,9 +6496,9 @@ domain Network
       optional string domain
       # If specified, deletes only cookies with the exact path.
       optional string path
-      # If specified, deletes only cookies with the the given name and partitionKey where domain
-      # matches provided URL.
-      experimental optional string partitionKey
+      # If specified, deletes only cookies with the the given name and partitionKey where 
+      # where all partition key attributes match the cookie partition key attribute.
+      experimental optional CookiePartitionKey partitionKey
 
   # Disables network tracking, prevents network events from being sent to the client.
   command disable
@@ -6668,10 +6675,8 @@ domain Network
       # An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
       # This is a temporary ability and it will be removed in the future.
       experimental optional integer sourcePort
-      # Cookie partition key. The site of the top-level URL the browser was visiting at the start
-      # of the request to the endpoint that set the cookie.
-      # If not set, the cookie will be set as not partitioned.
-      experimental optional string partitionKey
+      # Cookie partition key. If not set, the cookie will be set as not partitioned.
+      experimental optional CookiePartitionKey partitionKey
     returns
       # Always set to true. If an error occurs, the response indicates protocol error.
       deprecated boolean success
@@ -7063,7 +7068,7 @@ domain Network
       optional string headersText
       # The cookie partition key that will be used to store partitioned cookies set in this response.
       # Only sent when partitioned cookies are enabled.
-      optional string cookiePartitionKey
+      experimental optional CookiePartitionKey cookiePartitionKey
       # True if partitioned cookies are enabled, but the partition key is not serializable to string.
       optional boolean cookiePartitionKeyOpaque
       # A list of cookies which should have been blocked by 3PCD but are exempted and stored from
@@ -7910,6 +7915,7 @@ domain Page
       clipboard-write
       compute-pressure
       cross-origin-isolated
+      deferred-fetch
       direct-sockets
       display-capture
       document-domain
```

## Roll protocol to r1310407 — _2024-06-05T04:28:24.000Z_
######  Diff: [`2064bda...689e8cb`](https://github.com/ChromeDevTools/devtools-protocol/compare/2064bda...689e8cb)

```diff
@@ browser_protocol.pdl:622 @@ experimental domain Audits
       CoopSandboxedIFrameCannotNavigateToCoopPage
       CorpNotSameOrigin
       CorpNotSameOriginAfterDefaultedToSameOriginByCoep
+      CorpNotSameOriginAfterDefaultedToSameOriginByDip
+      CorpNotSameOriginAfterDefaultedToSameOriginByCoepAndDip
       CorpNotSameSite
 
   # Details for a request that has been blocked with the BLOCKED_BY_RESPONSE
@@ -5755,6 +5757,8 @@ domain Network
       coop-sandboxed-iframe-cannot-navigate-to-coop-page
       corp-not-same-origin
       corp-not-same-origin-after-defaulted-to-same-origin-by-coep
+      corp-not-same-origin-after-defaulted-to-same-origin-by-dip
+      corp-not-same-origin-after-defaulted-to-same-origin-by-coep-and-dip
       corp-not-same-site
 
   # The reason why request was blocked.
```

## Roll protocol to r1309774 — _2024-06-04T04:27:00.000Z_
######  Diff: [`24f369f...2064bda`](https://github.com/ChromeDevTools/devtools-protocol/compare/24f369f...2064bda)

```diff
@@ browser_protocol.pdl:12406 @@ experimental domain PWA
       string manifestId
 
   # Launches the installed web app, or an url in the same web app instead of the
-  # default start url if it is provided. Returns a tab / web contents based
-  # Target.TargetID which can be used to attach to via Target.attachToTarget or
-  # similar APIs.
+  # default start url if it is provided. Returns a page Target.TargetID which
+  # can be used to attach to via Target.attachToTarget or similar APIs.
   command launch
     parameters
       string manifestId
@@ -12419,16 +12418,15 @@ experimental domain PWA
 
   # Opens one or more local files from an installed web app identified by its
   # manifestId. The web app needs to have file handlers registered to process
-  # the files. The API returns one or more tabs / web contents' based
-  # Target.TargetIDs which can be used to attach to via Target.attachToTarget or
-  # similar APIs.
+  # the files. The API returns one or more page Target.TargetIDs which can be
+  # used to attach to via Target.attachToTarget or similar APIs.
   # If some files in the parameters cannot be handled by the web app, they will
   # be ignored. If none of the files can be handled, this API returns an error.
   # If no files provided as the parameter, this API also returns an error.
   #
   # According to the definition of the file handlers in the manifest file, one
-  # Target.TargetID may represent a tab handling one or more files. The order of
-  # the returned Target.TargetIDs is also not guaranteed.
+  # Target.TargetID may represent a page handling one or more files. The order
+  # of the returned Target.TargetIDs is not guaranteed.
   #
   # TODO(crbug.com/339454034): Check the existences of the input files.
   command launchFilesInApp
@@ -12438,3 +12436,10 @@ experimental domain PWA
     returns
       # IDs of the tab targets created as the result.
       array of Target.TargetID targetIds
+
+  # Opens the current page in its web app identified by the manifest id, needs
+  # to be called on a page target. This function returns immediately without
+  # waiting for the app finishing loading.
+  command openCurrentPageInApp
+    parameters
+      string manifestId
```

## Roll protocol to r1308459 — _2024-05-31T04:27:42.000Z_
######  Diff: [`24b69f0...24f369f`](https://github.com/ChromeDevTools/devtools-protocol/compare/24b69f0...24f369f)

```diff
@@ browser_protocol.pdl:7093 @@ domain Network
         FailedPrecondition
         ResourceExhausted
         AlreadyExists
-        Unavailable
+        ResourceLimited
         Unauthorized
         BadResponse
         InternalError
```

## Roll protocol to r1306150 — _2024-05-26T04:28:00.000Z_
######  Diff: [`bbd2600...24b69f0`](https://github.com/ChromeDevTools/devtools-protocol/compare/bbd2600...24b69f0)

```diff
@@ browser_protocol.pdl:3337 @@ domain DOM
       # Descendant nodes with container queries against the given container.
       array of NodeId nodeIds
 
+  # Returns the target anchor element of the given anchor query according to
+  # https://www.w3.org/TR/css-anchor-position-1/#target.
+  experimental command getAnchorElement
+    parameters
+      # Id of the positioned element from which to find the anchor.
+      NodeId nodeId
+      # An optional anchor specifier, as defined in
+      # https://www.w3.org/TR/css-anchor-position-1/#anchor-specifier.
+      # If not provided, it will return the implicit anchor element for
+      # the given positioned element.
+      optional string anchorSpecifier
+    returns
+      # The anchor element of the given anchor query.
+      NodeId nodeId
+
   # Fired when `Element`'s attribute is modified.
   event attributeModified
     parameters
```

## Roll protocol to r1305504 — _2024-05-24T04:27:22.000Z_
######  Diff: [`799ae7e...bbd2600`](https://github.com/ChromeDevTools/devtools-protocol/compare/799ae7e...bbd2600)

```diff
@@ browser_protocol.pdl:12401 @@ experimental domain PWA
     returns
       # ID of the tab target created as a result.
       Target.TargetID targetId
+
+  # Opens one or more local files from an installed web app identified by its
+  # manifestId. The web app needs to have file handlers registered to process
+  # the files. The API returns one or more tabs / web contents' based
+  # Target.TargetIDs which can be used to attach to via Target.attachToTarget or
+  # similar APIs.
+  # If some files in the parameters cannot be handled by the web app, they will
+  # be ignored. If none of the files can be handled, this API returns an error.
+  # If no files provided as the parameter, this API also returns an error.
+  #
+  # According to the definition of the file handlers in the manifest file, one
+  # Target.TargetID may represent a tab handling one or more files. The order of
+  # the returned Target.TargetIDs is also not guaranteed.
+  #
+  # TODO(crbug.com/339454034): Check the existences of the input files.
+  command launchFilesInApp
+    parameters
+      string manifestId
+      array of string files
+    returns
+      # IDs of the tab targets created as the result.
+      array of Target.TargetID targetIds
```

## Roll protocol to r1304863 — _2024-05-23T04:26:40.000Z_
######  Diff: [`7c5d5b6...799ae7e`](https://github.com/ChromeDevTools/devtools-protocol/compare/7c5d5b6...799ae7e)

```diff
@@ browser_protocol.pdl:851 @@ experimental domain Audits
       array of string allowedSites
       number optOutPercentage
       boolean isOptOutTopLevel
+      CookieOperation operation
 
   type ClientHintIssueReason extends string
     enum
@@ -5589,6 +5590,10 @@ domain Network
       experimental number workerFetchStart
       # Settled fetch event respondWith promise.
       experimental number workerRespondWithSettled
+      # Started ServiceWorker static routing source evaluation.
+      experimental optional number workerRouterEvaluationStart
+      # Started cache lookup when the source was evaluated to `cache`.
+      experimental optional number workerCacheLookupStart
       # Started sending request.
       number sendStart
       # Finished sending request.
@@ -5874,6 +5879,8 @@ domain Network
       # The router source of the matched rule. If there is a matched rule, this
       # field will be set, otherwise no value will be set.
       optional ServiceWorkerRouterSource matchedSourceType
+      # The actual router source used.
+      optional ServiceWorkerRouterSource actualSourceType
 
   # HTTP response data.
   type Response extends object
```

## Roll protocol to r1304228 — _2024-05-22T04:27:23.000Z_
######  Diff: [`fa8a8ed...7c5d5b6`](https://github.com/ChromeDevTools/devtools-protocol/compare/fa8a8ed...7c5d5b6)

```diff
@@ browser_protocol.pdl:911 @@ experimental domain Audits
       NotSignedInWithIdp
       MissingTransientUserActivation
       ReplacedByButtonMode
+      RelyingPartyOriginIsOpaque
 
   type FederatedAuthUserInfoRequestIssueDetails extends object
     properties
```

## Roll protocol to r1302984 — _2024-05-18T04:26:58.000Z_
######  Diff: [`82ed3df...fa8a8ed`](https://github.com/ChromeDevTools/devtools-protocol/compare/82ed3df...fa8a8ed)

```diff
@@ browser_protocol.pdl:8710 @@ domain Page
       # If set, the script will be injected into all frames of the inspected page after reload.
       # Argument will be ignored if reloading dataURL origin.
       optional string scriptToEvaluateOnLoad
+      # If set, an error will be thrown if the target page's main frame's
+      # loader id does not match the provided id. This prevents accidentally
+      # reloading an unintended target in case there's a racing navigation.
+      experimental optional Network.LoaderId loaderId
 
   # Deprecated, please use removeScriptToEvaluateOnNewDocument instead.
   experimental deprecated command removeScriptToEvaluateOnLoad
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index ee14676..8dad9c9 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -1297,10 +1297,6 @@ domain Runtime
   # Id of an execution context.
   type ExecutionContextId extends integer
 
-  # Id of an execution context that is unique across processes
-  # (unlike ExecutionContextId).
-  type ExecutionContextUniqueId extends string
-
   # Description of an isolated world.
   type ExecutionContextDescription extends object
     properties
@@ -1314,7 +1310,7 @@ domain Runtime
       # A system-unique execution context identifier. Unlike the id, this is unique across
       # multiple processes, so can be reliably used to identify specific context while backend
       # performs a cross-process navigation.
-      experimental ExecutionContextUniqueId uniqueId
+      experimental string uniqueId
       # Embedder-specific auxiliary data likely matching {isDefault: boolean, type: 'default'|'isolated'|'worker', frameId: string}
       optional object auxData
 
@@ -1675,8 +1671,7 @@ domain Runtime
       # If specified, the binding would only be exposed to the specified
       # execution context. If omitted and `executionContextName` is not set,
       # the binding is exposed to all execution contexts of the target.
-      # This parameter is mutually exclusive with `executionContextName`
-      # and `executionContextUniqueId`.
+      # This parameter is mutually exclusive with `executionContextName`.
       # Deprecated in favor of `executionContextName` due to an unclear use case
       # and bugs in implementation (crbug.com/1169639). `executionContextId` will be
       # removed in the future.
@@ -1685,12 +1680,8 @@ domain Runtime
       # matching name, even for contexts created after the binding is added.
       # See also `ExecutionContext.name` and `worldName` parameter to
       # `Page.addScriptToEvaluateOnNewDocument`.
-      # This parameter is mutually exclusive with `executionContextId`
-      # and `executionContextUniqueId`.
+      # This parameter is mutually exclusive with `executionContextId`.
       optional string executionContextName
-      # This parameter is mutually exclusive with `executionContextId`
-      # and `executionContextName`.
-      experimental optional ExecutionContextUniqueId executionContextUniqueId
 
   # This method does not remove binding function from global object but
   # unsubscribes current runtime agent from Runtime.bindingCalled notifications.
@@ -1717,7 +1708,6 @@ domain Runtime
       string payload
       # Identifier of the context where the call was made.
       ExecutionContextId executionContextId
-      experimental ExecutionContextUniqueId executionContextUniqueId
 
   # Issued when console API was called.
   event consoleAPICalled
@@ -1746,7 +1736,6 @@ domain Runtime
       array of RemoteObject args
       # Identifier of the context where the call was made.
       ExecutionContextId executionContextId
-      experimental ExecutionContextUniqueId executionContextUniqueId
       # Call timestamp.
       Timestamp timestamp
       # Stack trace captured when the call was made. The async stack chain is automatically reported for
@@ -1785,7 +1774,7 @@ domain Runtime
       # Id of the destroyed context
       deprecated ExecutionContextId executionContextId
       # Unique Id of the destroyed context
-      experimental ExecutionContextUniqueId executionContextUniqueId
+      experimental string executionContextUniqueId
 
   # Issued when all executionContexts were cleared in browser
   event executionContextsCleared
```

## Roll protocol to r1302401 — _2024-05-17T04:26:51.000Z_
######  Diff: [`f8def09...82ed3df`](https://github.com/ChromeDevTools/devtools-protocol/compare/f8def09...82ed3df)

```diff
@@ browser_protocol.pdl:849 @@ experimental domain Audits
   type CookieDeprecationMetadataIssueDetails extends object
     properties
       array of string allowedSites
+      number optOutPercentage
+      boolean isOptOutTopLevel
 
   type ClientHintIssueReason extends string
     enum
```

## Roll protocol to r1301748 — _2024-05-16T04:24:35.000Z_
######  Diff: [`e200d9e...f8def09`](https://github.com/ChromeDevTools/devtools-protocol/compare/e200d9e...f8def09)

```diff
@@ browser_protocol.pdl:6183 @@ domain Network
       TopLevelStorageAccess
       # The cookie should have been blocked by 3PCD but is exempted by CORS opt-in.
       CorsOptIn
+      # The cookie should have been blocked by 3PCD but is exempted by the first-party URL scheme.
+      Scheme
 
   # A cookie which was not stored from a response with the corresponding reason.
   experimental type BlockedSetCookieWithReason extends object
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index 8dad9c9..ee14676 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -1297,6 +1297,10 @@ domain Runtime
   # Id of an execution context.
   type ExecutionContextId extends integer
 
+  # Id of an execution context that is unique across processes
+  # (unlike ExecutionContextId).
+  type ExecutionContextUniqueId extends string
+
   # Description of an isolated world.
   type ExecutionContextDescription extends object
     properties
@@ -1310,7 +1314,7 @@ domain Runtime
       # A system-unique execution context identifier. Unlike the id, this is unique across
       # multiple processes, so can be reliably used to identify specific context while backend
       # performs a cross-process navigation.
-      experimental string uniqueId
+      experimental ExecutionContextUniqueId uniqueId
       # Embedder-specific auxiliary data likely matching {isDefault: boolean, type: 'default'|'isolated'|'worker', frameId: string}
       optional object auxData
 
@@ -1671,7 +1675,8 @@ domain Runtime
       # If specified, the binding would only be exposed to the specified
       # execution context. If omitted and `executionContextName` is not set,
       # the binding is exposed to all execution contexts of the target.
-      # This parameter is mutually exclusive with `executionContextName`.
+      # This parameter is mutually exclusive with `executionContextName`
+      # and `executionContextUniqueId`.
       # Deprecated in favor of `executionContextName` due to an unclear use case
       # and bugs in implementation (crbug.com/1169639). `executionContextId` will be
       # removed in the future.
@@ -1680,8 +1685,12 @@ domain Runtime
       # matching name, even for contexts created after the binding is added.
       # See also `ExecutionContext.name` and `worldName` parameter to
       # `Page.addScriptToEvaluateOnNewDocument`.
-      # This parameter is mutually exclusive with `executionContextId`.
+      # This parameter is mutually exclusive with `executionContextId`
+      # and `executionContextUniqueId`.
       optional string executionContextName
+      # This parameter is mutually exclusive with `executionContextId`
+      # and `executionContextName`.
+      experimental optional ExecutionContextUniqueId executionContextUniqueId
 
   # This method does not remove binding function from global object but
   # unsubscribes current runtime agent from Runtime.bindingCalled notifications.
@@ -1708,6 +1717,7 @@ domain Runtime
       string payload
       # Identifier of the context where the call was made.
       ExecutionContextId executionContextId
+      experimental ExecutionContextUniqueId executionContextUniqueId
 
   # Issued when console API was called.
   event consoleAPICalled
@@ -1736,6 +1746,7 @@ domain Runtime
       array of RemoteObject args
       # Identifier of the context where the call was made.
       ExecutionContextId executionContextId
+      experimental ExecutionContextUniqueId executionContextUniqueId
       # Call timestamp.
       Timestamp timestamp
       # Stack trace captured when the call was made. The async stack chain is automatically reported for
@@ -1774,7 +1785,7 @@ domain Runtime
       # Id of the destroyed context
       deprecated ExecutionContextId executionContextId
       # Unique Id of the destroyed context
-      experimental string executionContextUniqueId
+      experimental ExecutionContextUniqueId executionContextUniqueId
 
   # Issued when all executionContexts were cleared in browser
   event executionContextsCleared
```

## Roll protocol to r1301093 — _2024-05-15T04:27:06.000Z_
######  Diff: [`2ac7f42...e200d9e`](https://github.com/ChromeDevTools/devtools-protocol/compare/2ac7f42...e200d9e)

```diff
@@ browser_protocol.pdl:2633 @@ domain DOM
       highlight
       first-line-inherited
       scroll-marker
-      scroll-markers
+      scroll-marker-group
       scrollbar
       scrollbar-thumb
       scrollbar-button
```

## Roll protocol to r1300426 — _2024-05-14T04:26:18.000Z_
######  Diff: [`404576f...2ac7f42`](https://github.com/ChromeDevTools/devtools-protocol/compare/404576f...2ac7f42)

```diff
@@ browser_protocol.pdl:2626 @@ domain DOM
       marker
       backdrop
       selection
+      search-text
       target-text
       spelling-error
       grammar-error
```

## Roll protocol to r1299070 — _2024-05-10T04:26:27.000Z_
######  Diff: [`fd7b5be...404576f`](https://github.com/ChromeDevTools/devtools-protocol/compare/fd7b5be...404576f)

```diff
@@ browser_protocol.pdl:12127 @@ experimental domain Preload
       ActivationUrlHasEffectiveUrl
       JavaScriptInterfaceAdded
       JavaScriptInterfaceRemoved
+      AllPrerenderingCanceled
 
   # Fired when a preload enabled state is updated.
   event preloadEnabledStateUpdated
```

## Roll protocol to r1298513 — _2024-05-09T04:28:16.000Z_
######  Diff: [`2e6353a...fd7b5be`](https://github.com/ChromeDevTools/devtools-protocol/compare/2e6353a...fd7b5be)

```diff
@@ browser_protocol.pdl:12371 @@ experimental domain PWA
   command uninstall
     parameters
       string manifestId
+
+  # Launches the installed web app, or an url in the same web app instead of the
+  # default start url if it is provided. Returns a tab / web contents based
+  # Target.TargetID which can be used to attach to via Target.attachToTarget or
+  # similar APIs.
+  command launch
+    parameters
+      string manifestId
+      optional string url
+    returns
+      # ID of the tab target created as a result.
+      Target.TargetID targetId
```

## Roll protocol to r1297943 — _2024-05-08T04:25:54.000Z_
######  Diff: [`be37be1...2e6353a`](https://github.com/ChromeDevTools/devtools-protocol/compare/be37be1...2e6353a)

```diff
@@ browser_protocol.pdl:12125 @@ experimental domain Preload
       PrerenderingUrlHasEffectiveUrl
       RedirectedPrerenderingUrlHasEffectiveUrl
       ActivationUrlHasEffectiveUrl
+      JavaScriptInterfaceAdded
+      JavaScriptInterfaceRemoved
 
   # Fired when a preload enabled state is updated.
   event preloadEnabledStateUpdated
```

## Roll protocol to r1297280 — _2024-05-07T04:27:12.000Z_
######  Diff: [`30f9082...be37be1`](https://github.com/ChromeDevTools/devtools-protocol/compare/30f9082...be37be1)

```diff
@@ browser_protocol.pdl:6459 @@ domain Network
       optional string path
       # If specified, deletes only cookies with the the given name and partitionKey where domain
       # matches provided URL.
-      optional string partitionKey
+      experimental optional string partitionKey
 
   # Disables network tracking, prevents network events from being sent to the client.
   command disable
```

## Roll protocol to r1294763 — _2024-05-01T04:26:34.000Z_
######  Diff: [`b80715b...b717085`](https://github.com/ChromeDevTools/devtools-protocol/compare/b80715b...b717085)

```diff
@@ browser_protocol.pdl:12355 @@ experimental domain PWA
   # requirement.
   # IWA-specific install description: If the manifest_id is isolated-app://,
   # install_url_or_bundle_url is required, and can be either an http(s) URL or
-  # file:// URL pointing to a signed web bundle (.swbn). The .swbn file’s
+  # file:// URL pointing to a signed web bundle (.swbn). The .swbn file's
   # signing key must correspond to manifest_id. If Chrome is not in IWA dev
   # mode, the installation will fail, regardless of the state of the allowlist.
   command install
```

## Roll protocol to r1294156 — _2024-04-30T04:26:41.000Z_
######  Diff: [`551dc5e...b80715b`](https://github.com/ChromeDevTools/devtools-protocol/compare/551dc5e...b80715b)

```diff
@@ browser_protocol.pdl:5864 @@ domain Network
 
   experimental type ServiceWorkerRouterInfo extends object
     properties
-      integer ruleIdMatched
-      ServiceWorkerRouterSource matchedSourceType
+      # ID of the rule matched. If there is a matched rule, this field will
+      # be set, otherwiser no value will be set.
+      optional integer ruleIdMatched
+      # The router source of the matched rule. If there is a matched rule, this
+      # field will be set, otherwise no value will be set.
+      optional ServiceWorkerRouterSource matchedSourceType
 
   # HTTP response data.
   type Response extends object
@@ -5904,7 +5908,10 @@ domain Network
       optional boolean fromPrefetchCache
       # Specifies that the request was served from the prefetch cache.
       optional boolean fromEarlyHints
-      # Information about how Service Worker Static Router was used.
+      # Information about how ServiceWorker Static Router API was used. If this
+      # field is set with `matchedSourceType` field, a matching rule is found.
+      # If this field is set without `matchedSource`, no matching rule is found.
+      # Otherwise, the API is not used.
       experimental optional ServiceWorkerRouterInfo serviceWorkerRouterInfo
       # Total number of bytes received for this request so far.
       number encodedDataLength
@@ -7918,9 +7925,7 @@ domain Page
       vertical-scroll
       web-printing
       web-share
-      # Alias for 'window-placement' (crbug.com/1328581).
       window-management
-      window-placement
       xr-spatial-tracking
 
   # Reason for a permissions policy feature to be disabled.
@@ -12343,3 +12348,24 @@ experimental domain PWA
       integer badgeCount
       array of FileHandler fileHandlers
 
+  # Installs the given manifest identity, optionally using the given install_url
+  # or IWA bundle location.
+  #
+  # TODO(crbug.com/337872319) Support IWA to meet the following specific
+  # requirement.
+  # IWA-specific install description: If the manifest_id is isolated-app://,
+  # install_url_or_bundle_url is required, and can be either an http(s) URL or
+  # file:// URL pointing to a signed web bundle (.swbn). The .swbn file’s
+  # signing key must correspond to manifest_id. If Chrome is not in IWA dev
+  # mode, the installation will fail, regardless of the state of the allowlist.
+  command install
+    parameters
+      string manifestId
+      # The location of the app or bundle overriding the one derived from the
+      # manifestId.
+      optional string installUrlOrBundleUrl
+
+  # Uninstals the given manifest_id and closes any opened app windows.
+  command uninstall
+    parameters
+      string manifestId
```

## Roll protocol to r1292262 — _2024-04-25T04:26:20.000Z_
######  Diff: [`a85be37...551dc5e`](https://github.com/ChromeDevTools/devtools-protocol/compare/a85be37...551dc5e)

```diff
@@ browser_protocol.pdl:3132 @@ domain DOM
       # NodeIds of top layer elements
       array of NodeId nodeIds
 
+  # Returns the NodeId of the matched element according to certain relations.
+  experimental command getElementByRelation
+    parameters
+      # Id of the node from which to query the relation.
+      NodeId nodeId
+      # Type of relation to get.
+      enum relation
+        # Get the popover target for a given element. In this case, this given
+        # element can only be an HTMLFormControlElement (<input>, <button>).
+        PopoverTarget
+    returns
+      # NodeId of the element matching the queried relation.
+      NodeId nodeId
+
   # Re-does the last undone action.
   experimental command redo
 
@@ -9267,6 +9281,7 @@ domain Page
       EmbedderExtensionMessaging
       EmbedderExtensionMessagingForOpenPort
       EmbedderExtensionSentMessageToCachedFrame
+      RequestedByWebViewClient
 
   # Types of not restored reasons for back-forward cache.
   experimental type BackForwardCacheNotRestoredReasonType extends string
```

## Roll protocol to r1291694 — _2024-04-24T04:26:06.000Z_
######  Diff: [`385db00...a85be37`](https://github.com/ChromeDevTools/devtools-protocol/compare/385db00...a85be37)

```diff
@@ browser_protocol.pdl:741 @@ experimental domain Audits
       NoRegisterOsSourceHeader
       NoRegisterOsTriggerHeader
 
+  type SharedDictionaryError extends string
+    enum
+      UseErrorCrossOriginNoCorsRequest
+      UseErrorDictionaryLoadFailure
+      UseErrorMatchingDictionaryNotUsed
+      UseErrorUnexpectedContentDictionaryHeader
+      WriteErrorCossOriginNoCorsRequest
+      WriteErrorDisallowedBySettings
+      WriteErrorExpiredResponse
+      WriteErrorFeatureDisabled
+      WriteErrorInsufficientResources
+      WriteErrorInvalidMatchField
+      WriteErrorInvalidStructuredHeader
+      WriteErrorNavigationRequest
+      WriteErrorNoMatchField
+      WriteErrorNonListMatchDestField
+      WriteErrorNonSecureContext
+      WriteErrorNonStringIdField
+      WriteErrorNonStringInMatchDestList
+      WriteErrorNonStringMatchField
+      WriteErrorNonTokenTypeField
+      WriteErrorRequestAborted
+      WriteErrorShuttingDown
+      WriteErrorTooLongIdField
+      WriteErrorUnsupportedType
+
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
   type AttributionReportingIssueDetails extends object
@@ -767,6 +793,11 @@ experimental domain Audits
       string url
       optional SourceCodeLocation location
 
+  type SharedDictionaryIssueDetails extends object
+    properties
+      SharedDictionaryError sharedDictionaryError
+      AffectedRequest request
+
   type GenericIssueErrorType extends string
     enum
       CrossOriginPortalPostMessageError
@@ -972,6 +1003,7 @@ experimental domain Audits
       StylesheetLoadingIssue
       FederatedAuthUserInfoRequestIssue
       PropertyRuleIssue
+      SharedDictionaryIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -998,6 +1030,7 @@ experimental domain Audits
       optional StylesheetLoadingIssueDetails stylesheetLoadingIssueDetails
       optional PropertyRuleIssueDetails propertyRuleIssueDetails
       optional FederatedAuthUserInfoRequestIssueDetails federatedAuthUserInfoRequestIssueDetails
+      optional SharedDictionaryIssueDetails sharedDictionaryIssueDetails
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
```

## Roll protocol to r1289136 — _2024-04-18T04:26:02.000Z_
######  Diff: [`e52e967...385db00`](https://github.com/ChromeDevTools/devtools-protocol/compare/e52e967...385db00)

```diff
@@ browser_protocol.pdl:1059 @@ experimental domain Audits
     parameters
       InspectorIssue issue
 
+# Defines commands and events for browser extensions. Available if the client
+# is connected using the --remote-debugging-pipe flag and
+# the --enable-unsafe-extension-debugging flag is set.
+experimental domain Extensions
+  # Installs an unpacked extension from the filesystem similar to
+  # --load-extension CLI flags. Returns extension ID once the extension
+  # has been installed.
+  command loadUnpacked
+    parameters
+      # Absolute file path.
+      string path
+    returns
+      # Extension id.
+      string id
+
 # Defines commands and events for Autofill.
 experimental domain Autofill
   type CreditCard extends object
@@ -8440,7 +8455,7 @@ domain Page
   #   This API always waits for the manifest to be loaded.
   #   If manifestId is provided, and it does not match the manifest of the
   #     current document, this API errors out.
-  #   If there isn’t a loaded page, this API errors out immediately.
+  #   If there is not a loaded page, this API errors out immediately.
   command getAppManifest
     parameters
       optional string manifestId
```

## Roll protocol to r1286932 — _2024-04-13T04:24:25.000Z_
######  Diff: [`78bb0d0...e52e967`](https://github.com/ChromeDevTools/devtools-protocol/compare/78bb0d0...e52e967)

```diff
@@ browser_protocol.pdl:876 @@ experimental domain Audits
       SilentMediationFailure
       ThirdPartyCookiesBlocked
       NotSignedInWithIdp
+      MissingTransientUserActivation
+      ReplacedByButtonMode
 
   type FederatedAuthUserInfoRequestIssueDetails extends object
     properties
@@ -8325,15 +8327,132 @@ domain Page
   # Enables page domain notifications.
   command enable
 
+  # The manifest of a webapp, see
+  # https://www.w3.org/TR/appmanifest/#dfn-manifest.
+  # Some fields do not appear in the standard since the API is designed to
+  # expose more browser internal states.
+
+  experimental type FileFilter extends object
+    properties
+      optional string name
+      optional array of string accepts
+
+  experimental type FileHandler extends object
+    properties
+      string action
+      string name
+      optional array of ImageResource icons
+      # Mimic a map, name is the key, accepts is the value.
+      optional array of FileFilter accepts
+      # Won't repeat the enums, using string for easy comparison. Same as the
+      # other enums below.
+      string launchType
+
+  # The image definition used in both icon and screenshot.
+  experimental type ImageResource extends object
+    properties
+      # The src field in the definition, but changing to url in favor of
+      # consistency.
+      string url
+      optional string sizes
+      optional string type
+
+  experimental type LaunchHandler extends object
+    properties
+      string clientMode
+
+  experimental type ProtocolHandler extends object
+    properties
+      string protocol
+      string url
+
+  experimental type RelatedApplication extends object
+    properties
+      optional string id
+      string url
+
+  experimental type ScopeExtension extends object
+    properties
+      # Instead of using tuple, this field always returns the serialized string
+      # for easy understanding and comparison.
+      string origin
+      boolean hasOriginWildcard
+
+  experimental type Screenshot extends object
+    properties
+      ImageResource image
+      string formFactor
+      optional string label
+
+  experimental type ShareTarget extends object
+    properties
+      string action
+      string method
+      string enctype
+      # Embed the ShareTargetParams
+      optional string title
+      optional string text
+      optional string url
+      optional array of FileFilter files
+
+  experimental type Shortcut extends object
+    properties
+      string name
+      string url
+
+  experimental type WebAppManifest extends object
+    properties
+      optional string backgroundColor
+      # The extra description provided by the manifest.
+      optional string description
+      optional string dir
+      optional string display
+      # The overrided display mode controlled by the user.
+      optional array of string displayOverrides
+      # The handlers to open files.
+      optional array of FileHandler fileHandlers
+      optional array of ImageResource icons
+      optional string id
+      optional string lang
+      # TODO(crbug.com/1231886): This field is non-standard and part of a Chrome
+      # experiment. See:
+      # https://github.com/WICG/web-app-launch/blob/main/launch_handler.md
+      optional LaunchHandler launchHandler
+      optional string name
+      optional string orientation
+      optional boolean preferRelatedApplications
+      # The handlers to open protocols.
+      optional array of ProtocolHandler protocolHandlers
+      optional array of RelatedApplication relatedApplications
+      optional string scope
+      # Non-standard, see
+      # https://github.com/WICG/manifest-incubations/blob/gh-pages/scope_extensions-explainer.md
+      optional array of ScopeExtension scopeExtensions
+      # The screenshots used by chromium.
+      optional array of Screenshot screenshots
+      optional ShareTarget shareTarget
+      optional string shortName
+      optional array of Shortcut shortcuts
+      optional string startUrl
+      optional string themeColor
+
+  # Gets the processed manifest for this current document.
+  #   This API always waits for the manifest to be loaded.
+  #   If manifestId is provided, and it does not match the manifest of the
+  #     current document, this API errors out.
+  #   If there isn’t a loaded page, this API errors out immediately.
   command getAppManifest
+    parameters
+      optional string manifestId
     returns
       # Manifest location.
       string url
       array of AppManifestError errors
       # Manifest content.
       optional string data
-      # Parsed manifest properties
-      experimental optional AppManifestParsedProperties parsed
+      # Parsed manifest properties. Deprecated, use manifest instead.
+      experimental deprecated optional AppManifestParsedProperties parsed
+      experimental WebAppManifest manifest
 
   experimental command getInstallabilityErrors
     returns
@@ -12160,3 +12279,4 @@ experimental domain PWA
     returns
       integer badgeCount
       array of FileHandler fileHandlers
+
```

## Roll protocol to r1285609 — _2024-04-11T04:26:18.000Z_
######  Diff: [`adb454e...78bb0d0`](https://github.com/ChromeDevTools/devtools-protocol/compare/adb454e...78bb0d0)

```diff
@@ browser_protocol.pdl:475 @@ experimental domain Animation
       # Animation that was started.
       Animation animation
 
+  # Event for animation that has been updated.
+  event animationUpdated
+    parameters
+      # Animation that was updated.
+      Animation animation
+
 # Audits domain allows investigation of page violations and possible improvements.
 experimental domain Audits
   depends on Network
```

## Roll protocol to r1284279 — _2024-04-09T04:26:29.000Z_
######  Diff: [`85c9096...91c5005`](https://github.com/ChromeDevTools/devtools-protocol/compare/85c9096...91c5005)

```diff
@@ browser_protocol.pdl:2575 @@ domain DOM
       grammar-error
       highlight
       first-line-inherited
+      scroll-marker
+      scroll-markers
       scrollbar
       scrollbar-thumb
       scrollbar-button
```

## Roll protocol to r1282316 — _2024-04-04T04:27:08.000Z_
######  Diff: [`5f4d1e6...85c9096`](https://github.com/ChromeDevTools/devtools-protocol/compare/5f4d1e6...85c9096)

```diff
@@ browser_protocol.pdl:12123 @@ experimental domain FedCm
   # Resets the cooldown time, if any, to allow the next FedCM call to show
   # a dialog even if one was recently dismissed by the user.
   command resetCooldown
+
+# This domain allows interacting with the browser to control PWAs.
+experimental domain PWA
+
+  # The following types are the replica of
+  # https://crsrc.org/c/chrome/browser/web_applications/proto/web_app_os_integration_state.proto;drc=9910d3be894c8f142c977ba1023f30a656bc13fc;l=67
+  type FileHandlerAccept extends object
+    properties
+      # New name of the mimetype according to
+      # https://www.iana.org/assignments/media-types/media-types.xhtml
+      string mediaType
+      array of string fileExtensions
+
+  type FileHandler extends object
+    properties
+      string action
+      array of FileHandlerAccept accepts
+      string displayName
+
+  # Returns the following OS state for the given manifest id.
+  command getOsAppState
+    parameters
+      # The id from the webapp's manifest file, commonly it's the url of the
+      # site installing the webapp. See
+      # https://web.dev/learn/pwa/web-app-manifest.
+      string manifestId
+    returns
+      integer badgeCount
+      array of FileHandler fileHandlers
```

## Roll protocol to r1281655 — _2024-04-03T04:26:30.000Z_
######  Diff: [`a0b1761...5f4d1e6`](https://github.com/ChromeDevTools/devtools-protocol/compare/a0b1761...5f4d1e6)

```diff
@@ browser_protocol.pdl:6123 @@ domain Network
     properties
       # The reason the cookie was exempted.
       CookieExemptionReason exemptionReason
+      # The string representing this individual cookie as it would appear in the header.
+      string cookieLine
       # The cookie object representing the cookie.
       Cookie cookie
 
@@ -6957,6 +6959,16 @@ domain Network
       # the response with the corresponding reason.
       optional array of ExemptedSetCookieWithReason exemptedCookies
 
+  # Fired when 103 Early Hints headers is received in addition to the common response.
+  # Not every responseReceived event will have an responseReceivedEarlyHints fired.
+  # Only one responseReceivedEarlyHints may be fired for eached responseReceived event.
+  experimental event responseReceivedEarlyHints
+    parameters
+      # Request identifier. Used to match this information to another responseReceived event.
+      RequestId requestId
+      # Raw response headers as they were received over the wire.
+      Headers headers
+
   # Fired exactly once for each Trust Token operation. Depending on
   # the type of the operation and whether the operation succeeded or
   # failed, the event is fired before the corresponding request was sent
```

## Roll protocol to r1280070 — _2024-03-29T04:26:49.000Z_
######  Diff: [`dce7d35...a0b1761`](https://github.com/ChromeDevTools/devtools-protocol/compare/dce7d35...a0b1761)

```diff
@@ browser_protocol.pdl:4159 @@ domain Emulation
       experimental optional DisplayFeature displayFeature
       # If set, the posture of a foldable device. If not set the posture is set
       # to continuous.
-      experimental optional DevicePosture devicePosture
+      # Deprecated, use Emulation.setDevicePostureOverride.
+      experimental deprecated optional DevicePosture devicePosture
+
+  # Start reporting the given posture value to the Device Posture API.
+  # This override can also be set in setDeviceMetricsOverride().
+  experimental command setDevicePostureOverride
+    parameters
+      DevicePosture posture
+
+  # Clears a device posture override set with either setDeviceMetricsOverride()
+  # or setDevicePostureOverride() and starts using posture information from the
+  # platform again.
+  # Does nothing if no override is set.
+  experimental command clearDevicePostureOverride
 
   experimental command setScrollbarsHidden
     parameters
@@ -5817,6 +5830,8 @@ domain Network
       optional boolean fromServiceWorker
       # Specifies that the request was served from the prefetch cache.
       optional boolean fromPrefetchCache
+      # Specifies that the request was served from the prefetch cache.
+      optional boolean fromEarlyHints
       # Information about how Service Worker Static Router was used.
       experimental optional ServiceWorkerRouterInfo serviceWorkerRouterInfo
       # Total number of bytes received for this request so far.
```

## Roll protocol to r1279463 — _2024-03-28T04:25:51.000Z_
######  Diff: [`6a229aa...409429c`](https://github.com/ChromeDevTools/devtools-protocol/compare/6a229aa...409429c)

```diff
@@ browser_protocol.pdl:10237 @@ experimental domain Storage
       destinationBothLimitsReached
       reportingOriginsPerSiteLimitReached
       exceedsMaxChannelCapacity
+      exceedsMaxTriggerStateCardinality
 
   experimental event attributionReportingSourceRegistered
     parameters
```

## Roll protocol to r1275388 — _2024-03-20T04:26:38.000Z_
######  Diff: [`8241e6c...6a229aa`](https://github.com/ChromeDevTools/devtools-protocol/compare/8241e6c...6a229aa)

```diff
@@ browser_protocol.pdl:10148 @@ experimental domain Storage
     parameters
       boolean enable
 
+  # Sends all pending Attribution Reports immediately, regardless of their
+  # scheduled report time.
+  experimental command sendPendingAttributionReports
+    returns
+      # The number of reports that were sent.
+      integer numSent
+
   experimental type AttributionReportingSourceType extends string
     enum
       navigation
```

## Roll protocol to r1273771 — _2024-03-16T04:26:55.000Z_
######  Diff: [`4537bcb...8241e6c`](https://github.com/ChromeDevTools/devtools-protocol/compare/4537bcb...8241e6c)

```diff
@@ browser_protocol.pdl:5539 @@ domain Network
       # HTTP request headers.
       Headers headers
       # HTTP POST request data.
-      optional string postData
+      # Use postDataEntries instead.
+      deprecated optional string postData
       # True when the request has POST data. Note that postData might still be omitted when this flag is true when the data is too long.
       optional boolean hasPostData
-      # Request body elements. This will be converted from base64 to binary
+      # Request body elements (post data broken into individual entries).
       experimental optional array of PostDataEntry postDataEntries
       # The mixed content type of the request.
       optional Security.MixedContentType mixedContentType
```

## Roll protocol to r1273222 — _2024-03-15T04:26:20.000Z_
######  Diff: [`c804ef9...4537bcb`](https://github.com/ChromeDevTools/devtools-protocol/compare/c804ef9...4537bcb)

```diff
@@ browser_protocol.pdl:1944 @@ experimental domain CSS
       CSSStyle style
 
   # CSS position-fallback rule representation.
-  type CSSPositionFallbackRule extends object
+  deprecated type CSSPositionFallbackRule extends object
     properties
       Value name
       # List of keyframes.
       array of CSSTryRule tryRules
 
+  # CSS @position-try rule representation.
+  type CSSPositionTryRule extends object
+    properties
+      # The prelude dashed-ident name
+      Value name
+      # The css style sheet identifier (absent for user agent stylesheet and user-specified
+      # stylesheet rules) this rule came from.
+      optional StyleSheetId styleSheetId
+      # Parent stylesheet's origin.
+      StyleSheetOrigin origin
+      # Associated style declaration.
+      CSSStyle style
+
   # CSS keyframes rule representation.
   type CSSKeyframesRule extends object
     properties
@@ -2123,7 +2136,9 @@ experimental domain CSS
       # A list of CSS keyframed animations matching this node.
       optional array of CSSKeyframesRule cssKeyframesRules
       # A list of CSS position fallbacks matching this node.
-      optional array of CSSPositionFallbackRule cssPositionFallbackRules
+      deprecated optional array of CSSPositionFallbackRule cssPositionFallbackRules
+      # A list of CSS @position-try rules matching this node, based on the position-try-options property.
+      optional array of CSSPositionTryRule cssPositionTryRules
       # A list of CSS at-property rules matching this node.
       optional array of CSSPropertyRule cssPropertyRules
       # A list of CSS property registrations matching this node.
@@ -9674,6 +9689,7 @@ experimental domain Storage
       documentAppend
       documentDelete
       documentClear
+      documentGet
       workletSet
       workletAppend
       workletDelete
```

## Roll protocol to r1272579 — _2024-03-14T04:25:42.000Z_
######  Diff: [`1af74d1...c804ef9`](https://github.com/ChromeDevTools/devtools-protocol/compare/1af74d1...c804ef9)

```diff
@@ browser_protocol.pdl:2165 @@ experimental domain CSS
     returns
       CSSLayerData rootLayer
 
+  # Given a CSS selector text and a style sheet ID, getLocationForSelector
+  # returns an array of locations of the CSS selector in the style sheet.
+  experimental command getLocationForSelector
+    parameters
+      StyleSheetId styleSheetId
+      string selectorText
+    returns
+      array of SourceRange ranges
+
   # Starts tracking the given computed styles for updates. The specified array of properties
   # replaces the one previously specified. Pass empty array to disable tracking.
   # Use takeComputedStyleUpdates to retrieve the list of nodes that had properties modified.
@@ -10303,6 +10312,22 @@ experimental domain Storage
       AttributionReportingEventLevelResult eventLevel
       AttributionReportingAggregatableResult aggregatable
 
+  # A single Related Website Set object.
+  experimental type RelatedWebsiteSet extends object
+    properties
+      # The primary site of this set, along with the ccTLDs if there is any.
+      array of string primarySites
+      # The associated sites of this set, along with the ccTLDs if there is any.
+      array of string associatedSites
+      # The service sites of this set, along with the ccTLDs if there is any.
+      array of string serviceSites
+
+  # Returns the effective Related Website Sets in use by this profile for the browser
+  # session. The effective Related Website Sets will not change during a browser session.
+  experimental command getRelatedWebsiteSets
+    returns
+      array of RelatedWebsiteSet sets
+
 # The SystemInfo domain defines methods and events for querying low-level system information.
 experimental domain SystemInfo
```

## Roll protocol to r1271979 — _2024-03-13T04:25:43.000Z_
######  Diff: [`08fa435...1af74d1`](https://github.com/ChromeDevTools/devtools-protocol/compare/08fa435...1af74d1)

```diff
@@ browser_protocol.pdl:7735 @@ domain Page
       ch-ua-platform
       ch-ua-model
       ch-ua-mobile
-      ch-ua-form-factor
+      ch-ua-form-factors
       ch-ua-full-version
       ch-ua-full-version-list
       ch-ua-platform-version
@@ -9655,28 +9655,6 @@ experimental domain Storage
       bidderTrustedSignals
       sellerTrustedSignals
 
-  # Ad advertising element inside an interest group.
-  type InterestGroupAd extends object
-    properties
-      string renderURL
-      optional string metadata
-
-  # The full details of an interest group.
-  type InterestGroupDetails extends object
-    properties
-      string ownerOrigin
-      string name
-      Network.TimeSinceEpoch expirationTime
-      string joiningOrigin
-      optional string biddingLogicURL
-      optional string biddingWasmHelperURL
-      optional string updateURL
-      optional string trustedBiddingSignalsURL
-      array of string trustedBiddingSignalsKeys
-      optional string userBiddingSignals
-      array of InterestGroupAd ads
-      array of InterestGroupAd adComponents
-
   # Enum of shared storage access types.
   type SharedStorageAccessType extends string
     enum
@@ -9696,6 +9674,10 @@ experimental domain Storage
       workletEntries
       workletLength
       workletRemainingBudget
+      headerSet
+      headerAppend
+      headerDelete
+      headerClear
 
   # Struct for a single key-value pair in an origin's shared storage.
   type SharedStorageEntry extends object
@@ -9754,18 +9736,24 @@ experimental domain Storage
       # SharedStorageAccessType.documentDelete,
       # SharedStorageAccessType.workletSet,
       # SharedStorageAccessType.workletAppend,
-      # SharedStorageAccessType.workletDelete, and
-      # SharedStorageAccessType.workletGet.
+      # SharedStorageAccessType.workletDelete,
+      # SharedStorageAccessType.workletGet,
+      # SharedStorageAccessType.headerSet,
+      # SharedStorageAccessType.headerAppend, and
+      # SharedStorageAccessType.headerDelete.
       optional string key
       # Value for a specific entry in an origin's shared storage.
       # Present only for SharedStorageAccessType.documentSet,
       # SharedStorageAccessType.documentAppend,
-      # SharedStorageAccessType.workletSet, and
-      # SharedStorageAccessType.workletAppend.
+      # SharedStorageAccessType.workletSet,
+      # SharedStorageAccessType.workletAppend,
+      # SharedStorageAccessType.headerSet, and
+      # SharedStorageAccessType.headerAppend.
       optional string value
       # Whether or not to set an entry for a key if that key is already present.
-      # Present only for SharedStorageAccessType.documentSet and
-      # SharedStorageAccessType.workletSet.
+      # Present only for SharedStorageAccessType.documentSet,
+      # SharedStorageAccessType.workletSet, and
+      # SharedStorageAccessType.headerSet.
       optional boolean ignoreIfPresent
 
   type StorageBucketsDurability extends string
@@ -9933,7 +9921,11 @@ experimental domain Storage
       string ownerOrigin
       string name
     returns
-      InterestGroupDetails details
+      # This largely corresponds to:
+      # https://wicg.github.io/turtledove/#dictdef-generatebidinterestgroup
+      # but has absolute expirationTime instead of relative lifetimeMs and
+      # also adds joiningOrigin.
+      object details
 
   # Enables/Disables issuing of interestGroupAccessed events.
   experimental command setInterestGroupTracking
```

## Roll protocol to r1271365 — _2024-03-12T04:27:11.000Z_
######  Diff: [`d932e1e...08fa435`](https://github.com/ChromeDevTools/devtools-protocol/compare/d932e1e...08fa435)

```diff
@@ browser_protocol.pdl:6356 @@ domain Network
       number uploadThroughput
       # Connection type if known.
       optional ConnectionType connectionType
+      # WebRTC packet loss (percent, 0-100). 0 disables packet loss emulation, 100 drops all the packets.
+      experimental optional number packetLoss
+      # WebRTC packet queue length (packet). 0 removes any queue length limitations.
+      experimental optional integer packetQueueLength
+      # WebRTC packetReordering feature.
+      experimental optional boolean packetReordering
 
   # Enables network tracking, network events will now be delivered to the client.
   command enable
```

## Roll protocol to r1269399 — _2024-03-07T04:25:11.000Z_
######  Diff: [`61cfdc3...d932e1e`](https://github.com/ChromeDevTools/devtools-protocol/compare/61cfdc3...d932e1e)

```diff
@@ browser_protocol.pdl:8953 @@ domain Page
       CookieDisabled
       HTTPAuthRequired
       CookieFlushed
+      BroadcastChannelOnMessage
       #Blocklisted features
       WebSocket
       WebTransport
```

## Roll protocol to r1266816 — _2024-02-29T04:26:20.000Z_
######  Diff: [`462386a...61cfdc3`](https://github.com/ChromeDevTools/devtools-protocol/compare/462386a...61cfdc3)

```diff
@@ browser_protocol.pdl:9003 @@ domain Page
       SmartCard
       LiveMediaStreamTrack
       UnloadHandler
+      ParserAborted
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
```

## Roll protocol to r1266247 — _2024-02-28T04:26:37.000Z_
######  Diff: [`85cbc8e...462386a`](https://github.com/ChromeDevTools/devtools-protocol/compare/85cbc8e...462386a)

```diff
@@ browser_protocol.pdl:729 @@ experimental domain Audits
       WebAndOsHeaders
       NoWebOrOsSupport
       NavigationRegistrationWithoutTransientUserActivation
+      InvalidInfoHeader
+      NoRegisterSourceHeader
+      NoRegisterTriggerHeader
+      NoRegisterOsSourceHeader
+      NoRegisterOsTriggerHeader
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
```

## Roll protocol to r1263784 — _2024-02-22T04:25:35.000Z_
######  Diff: [`06fb977...85cbc8e`](https://github.com/ChromeDevTools/devtools-protocol/compare/06fb977...85cbc8e)

```diff
@@ browser_protocol.pdl:4053 @@ domain Emulation
       optional SensorReadingQuaternion quaternion
 
   # Tells whether emulation is supported.
-  command canEmulate
+  deprecated command canEmulate
     returns
       # True if emulation is supported.
       boolean result
@@ -4272,7 +4272,7 @@ domain Emulation
   # Overrides default host system timezone with the specified one.
   command setTimezoneOverride
     parameters
-      # The timezone identifier. List of supported timezones: 
+      # The timezone identifier. List of supported timezones:
       # https://source.chromium.org/chromium/chromium/deps/icu.git/+/faee8bc70570192d82d2978a71e2a615788597d1:source/data/misc/metaZones.txt
       # If empty, disables the override and restores default host system timezone.
       string timezoneId
```

## Roll protocol to r1263133 — _2024-02-21T04:25:55.000Z_
######  Diff: [`1291a1c...06fb977`](https://github.com/ChromeDevTools/devtools-protocol/compare/1291a1c...06fb977)

```diff
@@ browser_protocol.pdl:8872 @@ domain Page
       string message
       # Dialog type.
       DialogType type
-      # True if browser is capable showing or acting on the given dialog. When browser has no
+      # True iff browser is capable showing or acting on the given dialog. When browser has no
       # dialog handler for given target, calling alert while Page domain is engaged will stall
       # the page execution. Execution can be resumed via calling Page.handleJavaScriptDialog.
       boolean hasBrowserHandler
@@ -10449,8 +10449,8 @@ domain Target
   type TargetInfo extends object
     properties
       TargetID targetId
-      string type
       # List of types: https://source.chromium.org/chromium/chromium/src/+/main:content/browser/devtools/devtools_agent_host_impl.cc?ss=chromium&q=f:devtools%20-f:out%20%22::kTypeTab%5B%5D%22
+      string type
       string title
       string url
       # Whether the target has an attached client.
@@ -11718,7 +11718,7 @@ experimental domain Preload
       optional string url
       optional Network.RequestId requestId
       # Error information
-      # `errorMessage` is null if `errorType` is null.
+      # `errorMessage` is null iff `errorType` is null.
       optional RuleSetErrorType errorType
       # TODO(https://crbug.com/1425354): Replace this property with structured error.
       deprecated optional string errorMessage
```

## Roll protocol to r1262535 — _2024-02-20T04:27:19.000Z_
######  Diff: [`dda659f...1291a1c`](https://github.com/ChromeDevTools/devtools-protocol/compare/dda659f...1291a1c)

```diff
@@ browser_protocol.pdl:217 @@ experimental domain Accessibility
       # If omitted, the full tree is returned.
       optional integer depth
       # The frame for whose document the AX tree should be retrieved.
-      # If omited, the root frame is used.
+      # If omitted, the root frame is used.
       optional Page.FrameId frameId
     returns
       array of AXNode nodes
@@ -258,7 +258,7 @@ experimental domain Accessibility
 
   # Query a DOM node's accessibility subtree for accessible name and role.
   # This command computes the name and role for all nodes in the subtree, including those that are
-  # ignored for accessibility, and returns those that mactch the specified name and role. If no DOM
+  # ignored for accessibility, and returns those that match the specified name and role. If no DOM
   # node is specified, or the DOM node does not exist, the command returns an error. If neither
   # `accessibleName` or `role` is specified, it returns all the accessibility nodes in the subtree.
   experimental command queryAXTree
@@ -1087,7 +1087,7 @@ experimental domain Autofill
   # Munich 81456
   type AddressUI extends object
     properties
-      # A two dimension array containing the repesentation of values from an address profile.
+      # A two dimension array containing the representation of values from an address profile.
       array of AddressFields addressFields
 
   # Specified whether a filled field was done so by using the html autocomplete attribute or autofill heuristics.
@@ -1339,7 +1339,7 @@ domain Browser
     parameters
       # Whether to allow all or deny all download requests, or use default Chrome behavior if
       # available (otherwise deny). |allowAndName| allows download and names files according to
-      # their dowmload guids.
+      # their download guids.
       enum behavior
         deny
         allow
@@ -1606,7 +1606,7 @@ experimental domain CSS
       # Owner frame identifier.
       Page.FrameId frameId
       # Stylesheet resource URL. Empty if this is a constructed stylesheet created using
-      # new CSSStyleSheet() (but non-empty if this is a constructed sylesheet imported
+      # new CSSStyleSheet() (but non-empty if this is a constructed stylesheet imported
       # as a CSS module script).
       string sourceURL
       # URL of source map associated with the stylesheet (if any).
@@ -2818,7 +2818,7 @@ domain DOM
   # Returns attributes for the specified node.
   command getAttributes
     parameters
-      # Id of the node to retrieve attibutes for.
+      # Id of the node to retrieve attributes for.
       NodeId nodeId
     returns
       # An interleaved array of node attribute names and values.
@@ -3986,13 +3986,13 @@ domain Emulation
       pause
       pauseIfNetworkFetchesPending
 
-  # Used to specify User Agent Cient Hints to emulate. See https://wicg.github.io/ua-client-hints
+  # Used to specify User Agent Client Hints to emulate. See https://wicg.github.io/ua-client-hints
   experimental type UserAgentBrandVersion extends object
     properties
       string brand
       string version
 
-  # Used to specify User Agent Cient Hints to emulate. See https://wicg.github.io/ua-client-hints
+  # Used to specify User Agent Client Hints to emulate. See https://wicg.github.io/ua-client-hints
   # Missing optional values will be filled in by the target with what it would normally use.
   experimental type UserAgentMetadata extends object
     properties
@@ -4201,7 +4201,7 @@ domain Emulation
       SensorType type
       optional SensorMetadata metadata
 
-  # Updates the sensor readings reported by a sensor type previously overriden
+  # Updates the sensor readings reported by a sensor type previously overridden
   # by setSensorOverrideEnabled.
   experimental command setSensorOverrideReadings
     parameters
@@ -4272,8 +4272,9 @@ domain Emulation
   # Overrides default host system timezone with the specified one.
   command setTimezoneOverride
     parameters
-      # The timezone identifier. If empty, disables the override and
-      # restores default host system timezone.
+      # The timezone identifier. List of supported timezones: 
+      # https://source.chromium.org/chromium/chromium/deps/icu.git/+/faee8bc70570192d82d2978a71e2a615788597d1:source/data/misc/metaZones.txt
+      # If empty, disables the override and restores default host system timezone.
       string timezoneId
 
   # Resizes the frame/viewport of the page. Note that this does not affect the frame's container
@@ -4306,6 +4307,7 @@ domain Emulation
       integer hardwareConcurrency
 
   # Allows overriding user agent with the given string.
+  # `userAgentMetadata` must be set for Client Hint headers to be sent.
   command setUserAgentOverride
     parameters
       # User agent to use.
@@ -4392,7 +4394,7 @@ domain IO
     parameters
       # Handle of the stream to read.
       StreamHandle handle
-      # Seek to the specified offset before reading (if not specificed, proceed with offset
+      # Seek to the specified offset before reading (if not specified, proceed with offset
       # following the last read). Some types of streams may only support sequential reads.
       optional integer offset
       # Maximum number of bytes to read (left upon the agent discretion if not specified).
@@ -4776,7 +4778,7 @@ domain Input
       # The text to insert.
       string text
 
-  # This method sets the current candidate text for ime.
+  # This method sets the current candidate text for IME.
   # Use imeCommitComposition to commit the final text.
   # Use imeSetComposition with empty string as text to cancel composition.
   experimental command imeSetComposition
@@ -5156,7 +5158,7 @@ experimental domain LayerTree
 
   event layerTreeDidChange
     parameters
-      # Layer tree, absent if not in the comspositing mode.
+      # Layer tree, absent if not in the compositing mode.
       optional array of Layer layers
 
 # Provides access to log entries.
@@ -5533,7 +5535,7 @@ domain Network
       # passed by the developer (e.g. via "fetch") as understood by the backend.
       experimental optional TrustTokenParams trustTokenParams
       # True if this resource request is considered to be the 'same site' as the
-      # request correspondinfg to the main frame.
+      # request corresponding to the main frame.
       experimental optional boolean isSameSite
 
   # Details of a signed certificate timestamp (SCT).
@@ -5785,7 +5787,7 @@ domain Network
       optional boolean fromServiceWorker
       # Specifies that the request was served from the prefetch cache.
       optional boolean fromPrefetchCache
-      # Infomation about how Service Worker Static Router was used.
+      # Information about how Service Worker Static Router was used.
       experimental optional ServiceWorkerRouterInfo serviceWorkerRouterInfo
       # Total number of bytes received for this request so far.
       number encodedDataLength
@@ -5921,7 +5923,7 @@ domain Network
       # The cookie had the "Secure" attribute but was not received over a secure connection.
       SecureOnly
       # The cookie had the "SameSite=Strict" attribute but came from a cross-origin response.
-      # This includes navigation requests intitiated by other origins.
+      # This includes navigation requests initiated by other origins.
       SameSiteStrict
       # The cookie had the "SameSite=Lax" attribute but came from a cross-origin response.
       SameSiteLax
@@ -5955,7 +5957,7 @@ domain Network
       UnknownError
       # The cookie had the "SameSite=Strict" attribute but came from a response
       # with the same registrable domain but a different scheme.
-      # This includes navigation requests intitiated by other origins.
+      # This includes navigation requests initiated by other origins.
       # This is the "Schemeful Same-Site" version of the blocked reason.
       SchemefulSameSiteStrict
       # The cookie had the "SameSite=Lax" attribute but came from a response
@@ -6017,7 +6019,7 @@ domain Network
       UnknownError
       # The cookie had the "SameSite=Strict" attribute but came from a response
       # with the same registrable domain but a different scheme.
-      # This includes navigation requests intitiated by other origins.
+      # This includes navigation requests initiated by other origins.
       # This is the "Schemeful Same-Site" version of the blocked reason.
       SchemefulSameSiteStrict
       # The cookie had the "SameSite=Lax" attribute but came from a response
@@ -6244,7 +6246,7 @@ domain Network
       optional SignedExchangeHeader header
       # Security details for the signed exchange header.
       optional SecurityDetails securityDetails
-      # Errors occurred while handling the signed exchagne.
+      # Errors occurred while handling the signed exchange.
       optional array of SignedExchangeError errors
 
   # List of content encodings supported by the backend.
@@ -6597,7 +6599,7 @@ domain Network
       MonotonicTime timestamp
       # Resource type.
       ResourceType type
-      # User friendly error message.
+      # Error message. List of network errors: https://cs.chromium.org/chromium/src/net/base/net_error_list.h
       string errorText
       # True if loading was canceled.
       optional boolean canceled
@@ -6898,7 +6900,7 @@ domain Network
       # The cookie partition key that will be used to store partitioned cookies set in this response.
       # Only sent when partitioned cookies are enabled.
       optional string cookiePartitionKey
-      # True if partitioned cookies are enabled, but the partition key is not serializeable to string.
+      # True if partitioned cookies are enabled, but the partition key is not serializable to string.
       optional boolean cookiePartitionKeyOpaque
       # A list of cookies which should have been blocked by 3PCD but are exempted and stored from
       # the response with the corresponding reason.
@@ -7142,7 +7144,7 @@ experimental domain Overlay
   # Configuration data for drawing the source order of an elements children.
   type SourceOrderConfig extends object
     properties
-      # the color to outline the givent element in.
+      # the color to outline the given element in.
       DOM.RGBA parentOutlineColor
       # the color to outline the child elements in.
       DOM.RGBA childOutlineColor
@@ -7342,7 +7344,7 @@ experimental domain Overlay
     properties
       # Whether the title bar CSS should be shown when emulating the Window Controls Overlay.
       boolean showCSS
-      # Seleted platforms to show the overlay.
+      # Selected platforms to show the overlay.
       string selectedPlatform
       # The theme color defined in app manifest.
       string themeColor
@@ -7430,8 +7432,8 @@ experimental domain Overlay
   command hideHighlight
 
   # Highlights owner element of the frame with given id.
-  # Deprecated: Doesn't work reliablity and cannot be fixed due to process
-  # separatation (the owner node might be in a different process). Determine
+  # Deprecated: Doesn't work reliably and cannot be fixed due to process
+  # separation (the owner node might be in a different process). Determine
   # the owner node in the client and use highlightNode.
   deprecated command highlightFrame
     parameters
@@ -7998,7 +8000,7 @@ domain Page
     properties
       # Error message.
       string message
-      # If criticial, this is a non-recoverable parse error.
+      # If critical, this is a non-recoverable parse error.
       integer critical
       # Error line.
       integer line
@@ -8655,7 +8657,7 @@ domain Page
   experimental command stopScreencast
 
   # Requests backend to produce compilation cache for the specified scripts.
-  # `scripts` are appeneded to the list of scripts for which the cache
+  # `scripts` are appended to the list of scripts for which the cache
   # would be produced. The list may be reset during page navigation.
   # When script with a matching URL is encountered, the cache is optionally
   # produced upon backend discretion, based on internal heuristics.
@@ -8675,7 +8677,7 @@ domain Page
   # Clears seeded compilation cache.
   experimental command clearCompilationCache
 
-  # Enum of possible auto-reponse for permisison / prompt dialogs.
+  # Enum of possible auto-response for permission / prompt dialogs.
   experimental type AutoResponseMode extends string
     enum
       none
@@ -8870,7 +8872,7 @@ domain Page
       string message
       # Dialog type.
       DialogType type
-      # True iff browser is capable showing or acting on the given dialog. When browser has no
+      # True if browser is capable showing or acting on the given dialog. When browser has no
       # dialog handler for given target, calling alert while Page domain is engaged will stall
       # the page execution. Execution can be resumed via calling Page.handleJavaScriptDialog.
       boolean hasBrowserHandler
@@ -8956,7 +8958,6 @@ domain Page
       SubresourceHasCacheControlNoCache
       ContainsPlugins
       DocumentLoaded
-      DedicatedWorkerOrWorklet
       OutstandingNetworkRequestOthers
       RequestedMIDIPermission
       RequestedAudioCapturePermission
@@ -9073,7 +9074,7 @@ domain Page
   # when bfcache navigation fails.
   experimental event backForwardCacheNotUsed
     parameters
-      # The loader id for the associated navgation.
+      # The loader id for the associated navigation.
       Network.LoaderId loaderId
       # The frame id of the associated frame.
       FrameId frameId
@@ -9230,7 +9231,7 @@ experimental domain PerformanceTimeline
       # Identifies the frame that this event is related to. Empty for non-frame targets.
       Page.FrameId frameId
       # The event type, as specified in https://w3c.github.io/performance-timeline/#dom-performanceentry-entrytype
-      # This determines which of the optional "details" fiedls is present.
+      # This determines which of the optional "details" fields is present.
       string type
       # Name may be empty depending on the type.
       string name
@@ -9306,7 +9307,7 @@ domain Security
       Network.TimeSinceEpoch validTo
       # The highest priority network error code, if the certificate has an error.
       optional string certificateNetworkError
-      # True if the certificate uses a weak signature aglorithm.
+      # True if the certificate uses a weak signature algorithm.
       boolean certificateHasWeakSignature
       # True if the certificate has a SHA1 signature in the chain.
       boolean certificateHasSha1Signature
@@ -10093,7 +10094,7 @@ experimental domain Storage
       Page.FrameId mainFrameId
       # Serialized origin for the context that invoked the Shared Storage API.
       string ownerOrigin
-      # The sub-parameters warapped by `params` are all optional and their
+      # The sub-parameters wrapped by `params` are all optional and their
       # presence/absence depends on `type`.
       SharedStorageAccessParams params
 
@@ -10449,6 +10450,7 @@ domain Target
     properties
       TargetID targetId
       string type
+      # List of types: https://source.chromium.org/chromium/chromium/src/+/main:content/browser/devtools/devtools_agent_host_impl.cc?ss=chromium&q=f:devtools%20-f:out%20%22::kTypeTab%5B%5D%22
       string title
       string url
       # Whether the target has an attached client.
@@ -10467,7 +10469,7 @@ domain Target
   # A filter used by target query/discovery/auto-attach operations.
   experimental type FilterEntry extends object
     properties
-      # If set, causes exclusion of mathcing targets from the list.
+      # If set, causes exclusion of matching targets from the list.
       optional boolean exclude
       # If not present, matches any type.
       optional string type
@@ -10521,7 +10523,7 @@ domain Target
   #
   # Injected object will be available as `window[bindingName]`.
   #
-  # The object has the follwing API:
+  # The object has the following API:
   # - `binding.send(json)` - a method to send messages over the remote debugging protocol
   # - `binding.onmessage = json => handleMessage(json)` - a callback that will be called for the protocol notifications and command responses.
   experimental command exposeDevToolsProtocol
@@ -11716,7 +11718,7 @@ experimental domain Preload
       optional string url
       optional Network.RequestId requestId
       # Error information
-      # `errorMessage` is null iff `errorType` is null.
+      # `errorMessage` is null if `errorType` is null.
       optional RuleSetErrorType errorType
       # TODO(https://crbug.com/1425354): Replace this property with structured error.
       deprecated optional string errorMessage
@@ -11758,7 +11760,7 @@ experimental domain Preload
   # that had a speculation rule that triggered the attempt, and the
   # BackendNodeIds of <a href> or <area href> elements that triggered the
   # attempt (in the case of attempts triggered by a document rule). It is
-  # possible for mulitple rule sets and links to trigger a single attempt.
+  # possible for multiple rule sets and links to trigger a single attempt.
   type PreloadingAttemptSource extends object
     properties
       PreloadingAttemptKey key
```

## Roll protocol to r1262051 — _2024-02-17T04:27:02.000Z_
######  Diff: [`83fadfa...dda659f`](https://github.com/ChromeDevTools/devtools-protocol/compare/83fadfa...dda659f)

```diff
@@ browser_protocol.pdl:1270 @@ domain Browser
       protectedMediaIdentifier
       sensors
       storageAccess
+      speakerSelection
       topLevelStorageAccess
       videoCapture
       videoCapturePanTiltZoom
@@ -5736,9 +5737,18 @@ domain Network
       # This value is used when the reason is unknown.
       unspecifiedReason
 
+  # Source of service worker router.
+  type ServiceWorkerRouterSource extends string
+    enum
+      network
+      cache
+      fetch-event
+      race-network-and-fetch-handler
+
   experimental type ServiceWorkerRouterInfo extends object
     properties
       integer ruleIdMatched
+      ServiceWorkerRouterSource matchedSourceType
 
   # HTTP response data.
   type Response extends object
@@ -7761,6 +7771,7 @@ domain Page
       shared-storage
       shared-storage-select-url
       smart-card
+      speaker-selection
       storage-access
       sub-apps
       sync-xhr
```

## Roll protocol to r1261483 — _2024-02-16T04:25:37.000Z_
######  Diff: [`f2ae62d...2d101dc`](https://github.com/ChromeDevTools/devtools-protocol/compare/f2ae62d...2d101dc)

```diff
@@ browser_protocol.pdl:10198 @@ experimental domain Storage
       include
       exclude
 
-  experimental type AttributionReportingAggregatableValueEntry extends object
+  experimental type AttributionReportingAggregatableValueDictEntry extends object
     properties
       string key
       # number instead of integer because not all uint32 can be represented by
       # int
       number value
 
+  experimental type AttributionReportingAggregatableValueEntry extends object
+    properties
+      array of AttributionReportingAggregatableValueDictEntry values
+      AttributionReportingFilterPair filters
+
   experimental type AttributionReportingEventTriggerData extends object
     properties
       UnsignedInt64AsBase10 data
```

## Roll protocol to r1260888 — _2024-02-15T04:26:01.000Z_
######  Diff: [`26fa2ea...f2ae62d`](https://github.com/ChromeDevTools/devtools-protocol/compare/26fa2ea...f2ae62d)

```diff
@@ browser_protocol.pdl:1110 @@ experimental domain Autofill
       string autofillType
       # The filling strategy
       FillingStrategy fillingStrategy
+      # The frame the field belongs to
+      Page.FrameId frameId
       # The form field's DOM node
       DOM.BackendNodeId fieldId
```

## Roll protocol to r1260275 — _2024-02-14T04:26:03.000Z_
######  Diff: [`2b2d990...26fa2ea`](https://github.com/ChromeDevTools/devtools-protocol/compare/2b2d990...26fa2ea)

```diff
@@ browser_protocol.pdl:11410 @@ experimental domain WebAuthn
       # The large blob associated with the credential.
       # See https://w3c.github.io/webauthn/#sctn-large-blob-extension
       optional binary largeBlob
+      # Assertions returned by this credential will have the backup eligibility
+      # (BE) flag set to this value. Defaults to the authenticator's
+      # defaultBackupEligibility value.
+      optional boolean backupEligibility
+      # Assertions returned by this credential will have the backup state (BS)
+      # flag set to this value. Defaults to the authenticator's
+      # defaultBackupState value.
+      optional boolean backupState
 
   # Enable the WebAuthn domain and start intercepting credential storage and
   # retrieval with a virtual authenticator.
@@ -11498,6 +11506,15 @@ experimental domain WebAuthn
       AuthenticatorId authenticatorId
       boolean enabled
 
+  # Allows setting credential properties.
+  # https://w3c.github.io/webauthn/#sctn-automation-set-credential-properties
+  command setCredentialProperties
+    parameters
+      AuthenticatorId authenticatorId
+      binary credentialId
+      optional boolean backupEligibility
+      optional boolean backupState
+
   # Triggered when a credential is added to an authenticator.
   event credentialAdded
     parameters
```

## Roll protocol to r1259648 — _2024-02-13T04:25:35.000Z_
######  Diff: [`76bf820...2b2d990`](https://github.com/ChromeDevTools/devtools-protocol/compare/76bf820...2b2d990)

```diff
@@ browser_protocol.pdl:9679 @@ experimental domain Storage
   # Details for an origin's shared storage.
   type SharedStorageMetadata extends object
     properties
+      # Time when the origin's shared storage was last created.
       Network.TimeSinceEpoch creationTime
+      # Number of key-value pairs stored in origin's shared storage.
       integer length
+      # Current amount of bits of entropy remaining in the navigation budget.
       number remainingBudget
+      # Total number of bytes stored as key-value pairs in origin's shared
+      # storage.
+      integer bytesUsed
 
   # Pair of reporting metadata details for a candidate URL for `selectURL()`.
   type SharedStorageReportingMetadata extends object
```

## Roll protocol to r1258865 — _2024-02-10T04:26:45.000Z_
######  Diff: [`726f72d...76bf820`](https://github.com/ChromeDevTools/devtools-protocol/compare/726f72d...76bf820)

```diff
@@ browser_protocol.pdl:309 @@ experimental domain Animation
       # `Animation`'s playback rate.
       number playbackRate
       # `Animation`'s start time.
+      # Milliseconds for time based animations and
+      # percentage [0 - 100] for scroll driven animations
+      # (i.e. when viewOrScrollTimeline exists).
       number startTime
       # `Animation`'s current time.
       number currentTime
@@ -322,6 +325,26 @@ experimental domain Animation
       # A unique ID for `Animation` representing the sources that triggered this CSS
       # animation/transition.
       optional string cssId
+      # View or scroll timeline
+      optional ViewOrScrollTimeline viewOrScrollTimeline
+
+  # Timeline instance
+  type ViewOrScrollTimeline extends object
+    properties
+      # Scroll container node
+      optional DOM.BackendNodeId sourceNodeId
+      # Represents the starting scroll position of the timeline
+      # as a length offset in pixels from scroll origin.
+      optional number startOffset
+      # Represents the ending scroll position of the timeline
+      # as a length offset in pixels from scroll origin.
+      optional number endOffset
+      # The element whose principal box's visibility in the
+      # scrollport defined the progress of the timeline.
+      # Does not exist for animations with ScrollTimeline
+      optional DOM.BackendNodeId subjectNodeId
+      # Orientation of the scroll
+      DOM.ScrollOrientation axis
 
   # AnimationEffect instance
   type AnimationEffect extends object
@@ -335,6 +358,9 @@ experimental domain Animation
       # `AnimationEffect`'s iterations.
       number iterations
       # `AnimationEffect`'s iteration duration.
+      # Milliseconds for time based animations and
+      # percentage [0 - 100] for scroll driven animations
+      # (i.e. when viewOrScrollTimeline exists).
       number duration
       # `AnimationEffect`'s playback direction.
       string direction
@@ -2559,6 +2585,12 @@ domain DOM
       Block
       Both
 
+  # Physical scroll orientation
+  type ScrollOrientation extends string
+    enum
+      horizontal
+      vertical
+
   # DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes.
   # DOMNode is a base node mirror type.
   type Node extends object
```

## Roll protocol to r1255431 — _2024-02-02T04:26:50.000Z_
######  Diff: [`0abedd4...726f72d`](https://github.com/ChromeDevTools/devtools-protocol/compare/0abedd4...726f72d)

```diff
@@ browser_protocol.pdl:6010 @@ domain Network
       StorageAccess
       # The cookie should have been blocked by 3PCD but is exempted by Top-level Storage Access API.
       TopLevelStorageAccess
-      # The cookie should have been blocked by 3PCD but is exempted by browser heuristics.
-      BrowserHeuristics
+      # The cookie should have been blocked by 3PCD but is exempted by CORS opt-in.
+      CorsOptIn
 
   # A cookie which was not stored from a response with the corresponding reason.
   experimental type BlockedSetCookieWithReason extends object
```

## Roll protocol to r1254350 — _2024-01-31T04:26:07.000Z_
######  Diff: [`97a9147...0abedd4`](https://github.com/ChromeDevTools/devtools-protocol/compare/97a9147...0abedd4)

```diff
@@ browser_protocol.pdl:6273 @@ domain Network
       # Response to a requestIntercepted with an authChallenge. Must not be set otherwise.
       optional AuthChallengeResponse authChallengeResponse
 
-  # Deletes browser cookies with matching name and url or domain/path pair.
+  # Deletes browser cookies with matching name and url or domain/path/partitionKey pair.
   command deleteCookies
     parameters
       # Name of the cookies to remove.
@@ -6285,6 +6285,9 @@ domain Network
       optional string domain
       # If specified, deletes only cookies with the exact path.
       optional string path
+      # If specified, deletes only cookies with the the given name and partitionKey where domain
+      # matches provided URL.
+      optional string partitionKey
 
   # Disables network tracking, prevents network events from being sent to the client.
   command disable
```

## Roll protocol to r1253724 — _2024-01-30T04:25:31.000Z_
######  Diff: [`fcda9c0...97a9147`](https://github.com/ChromeDevTools/devtools-protocol/compare/fcda9c0...97a9147)

```diff
@@ browser_protocol.pdl:5991 @@ domain Network
       # RFC6265bis.
       NameValuePairExceedsMaxSize
 
+  # Types of reasons why a cookie should have been blocked by 3PCD but is exempted for the request.
+  experimental type CookieExemptionReason extends string
+    enum
+      # The default value. Cookie with this reason could either be blocked or included.
+      None
+      # The cookie should have been blocked by 3PCD but is exempted by explicit user setting.
+      UserSetting
+      # The cookie should have been blocked by 3PCD but is exempted by metadata mitigation.
+      TPCDMetadata
+      # The cookie should have been blocked by 3PCD but is exempted by Deprecation Trial mitigation.
+      TPCDDeprecationTrial
+      # The cookie should have been blocked by 3PCD but is exempted by heuristics mitigation.
+      TPCDHeuristics
+      # The cookie should have been blocked by 3PCD but is exempted by Enterprise Policy.
+      EnterprisePolicy
+      # The cookie should have been blocked by 3PCD but is exempted by Storage Access API.
+      StorageAccess
+      # The cookie should have been blocked by 3PCD but is exempted by Top-level Storage Access API.
+      TopLevelStorageAccess
+      # The cookie should have been blocked by 3PCD but is exempted by browser heuristics.
+      BrowserHeuristics
+
   # A cookie which was not stored from a response with the corresponding reason.
   experimental type BlockedSetCookieWithReason extends object
     properties
@@ -6004,13 +6026,26 @@ domain Network
       # errors.
       optional Cookie cookie
 
-  # A cookie with was not sent with a request with the corresponding reason.
-  experimental type BlockedCookieWithReason extends object
+  # A cookie should have been blocked by 3PCD but is exempted and stored from a response with the
+  # corresponding reason. A cookie could only have at most one exemption reason.
+  experimental type ExemptedSetCookieWithReason extends object
+    properties
+      # The reason the cookie was exempted.
+      CookieExemptionReason exemptionReason
+      # The cookie object representing the cookie.
+      Cookie cookie
+
+  # A cookie associated with the request which may or may not be sent with it.
+  # Includes the cookies itself and reasons for blocking or exemption.
+  experimental type AssociatedCookie extends object
     properties
-      # The reason(s) the cookie was blocked.
-      array of CookieBlockedReason blockedReasons
       # The cookie object representing the cookie which was not sent.
       Cookie cookie
+      # The reason(s) the cookie was blocked. If empty means the cookie is included.
+      array of CookieBlockedReason blockedReasons
+      # The reason the cookie should have been blocked by 3PCD but is exempted. A cookie could
+      # only have at most one exemption reason.
+      optional CookieExemptionReason exemptionReason
 
   # Cookie parameter object
   type CookieParam extends object
@@ -6779,8 +6814,8 @@ domain Network
       # Request identifier. Used to match this information to an existing requestWillBeSent event.
       RequestId requestId
       # A list of cookies potentially associated to the requested URL. This includes both cookies sent with
-      # the request and the ones not sent; the latter are distinguished by having blockedReason field set.
-      array of BlockedCookieWithReason associatedCookies
+      # the request and the ones not sent; the latter are distinguished by having blockedReasons field set.
+      array of AssociatedCookie associatedCookies
       # Raw request headers as they will be sent over the wire.
       Headers headers
       # Connection timing information for the request.
@@ -6818,6 +6853,9 @@ domain Network
       optional string cookiePartitionKey
       # True if partitioned cookies are enabled, but the partition key is not serializeable to string.
       optional boolean cookiePartitionKeyOpaque
+      # A list of cookies which should have been blocked by 3PCD but are exempted and stored from
+      # the response with the corresponding reason.
+      optional array of ExemptedSetCookieWithReason exemptedCookies
 
   # Fired exactly once for each Trust Token operation. Depending on
   # the type of the operation and whether the operation succeeded or
```

## Roll protocol to r1253004 — _2024-01-27T04:25:19.000Z_
######  Diff: [`b402173...fcda9c0`](https://github.com/ChromeDevTools/devtools-protocol/compare/b402173...fcda9c0)

```diff
@@ browser_protocol.pdl:10649 @@ experimental domain Tethering
       # Connection id to be used.
       string connectionId
 
-experimental domain Tracing
+domain Tracing
   depends on IO
 
   # Configuration for memory dump. Used only when "memory-infra" category is enabled.
-  type MemoryDumpConfig extends object
+  experimental type MemoryDumpConfig extends object
 
   type TraceConfig extends object
     properties
       # Controls how the trace buffer stores data.
-      optional enum recordMode
+      experimental optional enum recordMode
         recordUntilFull
         recordContinuously
         recordAsMuchAsPossible
         echoToConsole
       # Size of the trace buffer in kilobytes. If not specified or zero is passed, a default value
       # of 200 MB would be used.
-      optional number traceBufferSizeInKb
+      experimental optional number traceBufferSizeInKb
       # Turns on JavaScript stack sampling.
-      optional boolean enableSampling
+      experimental optional boolean enableSampling
       # Turns on system tracing.
-      optional boolean enableSystrace
+      experimental optional boolean enableSystrace
       # Turns on argument filter.
-      optional boolean enableArgumentFilter
+      experimental optional boolean enableArgumentFilter
       # Included category filters.
       optional array of string includedCategories
       # Excluded category filters.
       optional array of string excludedCategories
       # Configuration to synthesize the delays in tracing.
-      optional array of string syntheticDelays
+      experimental optional array of string syntheticDelays
       # Configuration for memory dump triggers. Used only when "memory-infra" category is enabled.
-      optional MemoryDumpConfig memoryDumpConfig
+      experimental optional MemoryDumpConfig memoryDumpConfig
 
   # Data format of a trace. Can be either the legacy JSON format or the
   # protocol buffer format. Note that the JSON format will be deprecated soon.
-  type StreamFormat extends string
+  experimental type StreamFormat extends string
     enum
       json
       proto
 
   # Compression type to use for traces returned via streams.
-  type StreamCompression extends string
+  experimental type StreamCompression extends string
     enum
       none
       gzip
@@ -10697,7 +10697,7 @@ experimental domain Tracing
   # Details exposed when memory request explicitly declared.
   # Keep consistent with memory_dump_request_args.h and
   # memory_instrumentation.mojom
-  type MemoryDumpLevelOfDetail extends string
+  experimental type MemoryDumpLevelOfDetail extends string
     enum
       background
       light
@@ -10708,7 +10708,7 @@ experimental domain Tracing
   # supported on Chrome OS and uses the Perfetto system tracing service.
   # `auto` chooses `system` when the perfettoConfig provided to Tracing.start
   # specifies at least one non-Chrome data source; otherwise uses `chrome`.
-  type TracingBackend extends string
+  experimental type TracingBackend extends string
     enum
       auto
       chrome
@@ -10718,19 +10718,19 @@ experimental domain Tracing
   command end
 
   # Gets supported tracing categories.
-  command getCategories
+  experimental command getCategories
     returns
       # A list of supported tracing categories.
       array of string categories
 
   # Record a clock sync marker in the trace.
-  command recordClockSyncMarker
+  experimental command recordClockSyncMarker
     parameters
       # The ID of this clock sync marker
       string syncId
 
   # Request a global memory dump.
-  command requestMemoryDump
+  experimental command requestMemoryDump
     parameters
       # Enables more deterministic results by forcing garbage collection
       optional boolean deterministic
@@ -10746,11 +10746,11 @@ experimental domain Tracing
   command start
     parameters
       # Category/tag filter
-      deprecated optional string categories
+      experimental deprecated optional string categories
       # Tracing options
-      deprecated optional string options
+      experimental deprecated optional string options
       # If set, the agent will issue bufferUsage events at this interval, specified in milliseconds
-      optional number bufferUsageReportingInterval
+      experimental optional number bufferUsageReportingInterval
       # Whether to report trace events as series of dataCollected events or to save trace to a
       # stream (defaults to `ReportEvents`).
       optional enum transferMode
@@ -10761,16 +10761,16 @@ experimental domain Tracing
       optional StreamFormat streamFormat
       # Compression format to use. This only applies when using `ReturnAsStream`
       # transfer mode (defaults to `none`)
-      optional StreamCompression streamCompression
+      experimental optional StreamCompression streamCompression
       optional TraceConfig traceConfig
       # Base64-encoded serialized perfetto.protos.TraceConfig protobuf message
       # When specified, the parameters `categories`, `options`, `traceConfig`
       # are ignored.
-      optional binary perfettoConfig
+      experimental optional binary perfettoConfig
       # Backend type (defaults to `auto`)
-      optional TracingBackend tracingBackend
+      experimental optional TracingBackend tracingBackend
 
-  event bufferUsage
+  experimental event bufferUsage
     parameters
       # A number in range [0..1] that indicates the used size of event buffer as a fraction of its
       # total size.
@@ -10783,7 +10783,7 @@ experimental domain Tracing
 
   # Contains a bucket of collected trace events. When tracing is stopped collected events will be
   # sent as a sequence of dataCollected events followed by tracingComplete event.
-  event dataCollected
+  experimental event dataCollected
     parameters
       array of object value
```

## Roll protocol to r1252439 — _2024-01-26T04:26:56.000Z_
######  Diff: [`45b7b51...b402173`](https://github.com/ChromeDevTools/devtools-protocol/compare/45b7b51...b402173)

```diff
@@ browser_protocol.pdl:9546 @@ experimental domain Storage
       started
       configResolved
 
+  # Enum of network fetches auctions can do.
+  type InterestGroupAuctionFetchType extends string
+    enum
+      bidderJs
+      bidderWasm
+      sellerJs
+      bidderTrustedSignals
+      sellerTrustedSignals
+
   # Ad advertising element inside an interest group.
   type InterestGroupAd extends object
     properties
@@ -9825,7 +9834,8 @@ experimental domain Storage
     parameters
       boolean enable
 
-  # Enables/Disables issuing of interestGroupAuctionEvent events.
+  # Enables/Disables issuing of interestGroupAuctionEventOccurred and
+  # interestGroupAuctionNetworkRequestCreated.
   experimental command setInterestGroupAuctionTracking
     parameters
       boolean enable
@@ -9966,6 +9976,19 @@ experimental domain Storage
       # Set for started and configResolved
       optional object auctionConfig
 
+  # Specifies which auctions a particular network fetch may be related to, and
+  # in what role. Note that it is not ordered with respect to
+  # Network.requestWillBeSent (but will happen before loadingFinished
+  # loadingFailed).
+  event interestGroupAuctionNetworkRequestCreated
+    parameters
+      InterestGroupAuctionFetchType type
+      Network.RequestId requestId
+      # This is the set of the auctions using the worklet that issued this
+      # request.  In the case of trusted signals, it's possible that only some of
+      # them actually care about the keys being queried.
+      array of InterestGroupAuctionId auctions
+
   # Shared storage was accessed by the associated page.
   # The following parameters are included in all events.
   event sharedStorageAccessed
```

## Roll protocol to r1250650 — _2024-01-23T04:27:23.000Z_
######  Diff: [`fbf4551...45b7b51`](https://github.com/ChromeDevTools/devtools-protocol/compare/fbf4551...45b7b51)

```diff
@@ browser_protocol.pdl:9546 @@ experimental domain Storage
       started
       configResolved
 
-  # Enum of network fetches auctions can do.
-  type InterestGroupAuctionFetchType extends string
-    enum
-      bidderJs
-      bidderWasm
-      sellerJs
-      bidderTrustedSignals
-      sellerTrustedSignals
-
   # Ad advertising element inside an interest group.
   type InterestGroupAd extends object
     properties
@@ -9834,8 +9825,7 @@ experimental domain Storage
     parameters
       boolean enable
 
-  # Enables/Disables issuing of interestGroupAuctionEventOccurred and
-  # interestGroupAuctionNetworkRequestCreated.
+  # Enables/Disables issuing of interestGroupAuctionEvent events.
   experimental command setInterestGroupAuctionTracking
     parameters
       boolean enable
@@ -9976,19 +9966,6 @@ experimental domain Storage
       # Set for started and configResolved
       optional object auctionConfig
 
-  # Specifies which auctions a particular network fetch may be related to, and
-  # in what role. Note that it is not ordered with respect to
-  # Network.requestWillBeSent (but will happen before loadingFinished
-  # loadingFailed).
-  event interestGroupAuctionNetworkRequestCreated
-    parameters
-      InterestGroupAuctionFetchType type
-      Network.RequestId requestId
-      # This is the set of the auctions using the worklet that issued this
-      # request.  In the case of trusted signals, it's possible that only some of
-      # them actually care about the keys being queried.
-      array of InterestGroupAuctionId auctions
-
   # Shared storage was accessed by the associated page.
   # The following parameters are included in all events.
   event sharedStorageAccessed
@@ -11855,6 +11832,12 @@ experimental domain FedCm
       ErrorGotIt
       ErrorMoreDetails
 
+  # The URLs that each account has
+  type AccountUrlType extends string
+    enum
+      TermsOfService
+      PrivacyPolicy
+
   # Corresponds to IdentityRequestAccount
   type Account extends object
     properties
@@ -11905,6 +11888,12 @@ experimental domain FedCm
       string dialogId
       DialogButton dialogButton
 
+  command openUrl
+    parameters
+      string dialogId
+      integer accountIndex
+      AccountUrlType accountUrlType
+
   command dismissDialog
     parameters
       string dialogId
```

## Roll protocol to r1249869 — _2024-01-21T04:26:44.000Z_
######  Diff: [`17f79a9...fbf4551`](https://github.com/ChromeDevTools/devtools-protocol/compare/17f79a9...fbf4551)

```diff
@@ browser_protocol.pdl:545 @@ experimental domain Audits
       Frame
       Image
       Import
+      JSON
       Manifest
       Ping
       PluginData
```

## Roll protocol to r1249784 — _2024-01-20T04:27:08.000Z_
######  Diff: [`c65bd7c...17f79a9`](https://github.com/ChromeDevTools/devtools-protocol/compare/c65bd7c...17f79a9)

```diff
@@ browser_protocol.pdl:9521 @@ experimental domain Storage
       string issuerOrigin
       number count
 
+  # Protected audience interest group auction identifier.
+  type InterestGroupAuctionId extends string
+
   # Enum of interest group access types.
   type InterestGroupAccessType extends string
     enum
@@ -9532,8 +9535,25 @@ experimental domain Storage
       win
       additionalBid
       additionalBidWin
+      topLevelBid
+      topLevelAdditionalBid
       clear
 
+  # Enum of auction events.
+  type InterestGroupAuctionEventType extends string
+    enum
+      started
+      configResolved
+
+  # Enum of network fetches auctions can do.
+  type InterestGroupAuctionFetchType extends string
+    enum
+      bidderJs
+      bidderWasm
+      sellerJs
+      bidderTrustedSignals
+      sellerTrustedSignals
+
   # Ad advertising element inside an interest group.
   type InterestGroupAd extends object
     properties
@@ -9813,6 +9833,12 @@ experimental domain Storage
     parameters
       boolean enable
 
+  # Enables/Disables issuing of interestGroupAuctionEventOccurred and
+  # interestGroupAuctionNetworkRequestCreated.
+  experimental command setInterestGroupAuctionTracking
+    parameters
+      boolean enable
+
   # Gets metadata for an origin's shared storage.
   experimental command getSharedStorageMetadata
     parameters
@@ -9920,13 +9946,47 @@ experimental domain Storage
       # Storage bucket to update.
       string bucketId
 
-  # One of the interest groups was accessed by the associated page.
+  # One of the interest groups was accessed. Note that these events are global
+  # to all targets sharing an interest group store.
   event interestGroupAccessed
     parameters
       Network.TimeSinceEpoch accessTime
       InterestGroupAccessType type
       string ownerOrigin
       string name
+      # For topLevelBid/topLevelAdditionalBid, and when appropriate,
+      # win and additionalBidWin
+      optional string componentSellerOrigin
+      # For bid or somethingBid event, if done locally and not on a server.
+      optional number bid
+      optional string bidCurrency
+      # For non-global events --- links to interestGroupAuctionEvent
+      optional InterestGroupAuctionId uniqueAuctionId
+
+  # An auction involving interest groups is taking place. These events are
+  # target-specific.
+  event interestGroupAuctionEventOccurred
+    parameters
+      Network.TimeSinceEpoch eventTime
+      InterestGroupAuctionEventType type
+      InterestGroupAuctionId uniqueAuctionId
+      # Set for child auctions.
+      optional InterestGroupAuctionId parentAuctionId
+      # Set for started and configResolved
+      optional object auctionConfig
+
+  # Specifies which auctions a particular network fetch may be related to, and
+  # in what role. Note that it is not ordered with respect to
+  # Network.requestWillBeSent (but will happen before loadingFinished
+  # loadingFailed).
+  event interestGroupAuctionNetworkRequestCreated
+    parameters
+      InterestGroupAuctionFetchType type
+      Network.RequestId requestId
+      # This is the set of the auctions using the worklet that issued this
+      # request.  In the case of trusted signals, it's possible that only some of
+      # them actually care about the keys being queried.
+      array of InterestGroupAuctionId auctions
 
   # Shared storage was accessed by the associated page.
   # The following parameters are included in all events.
```

## Roll protocol to r1248698 — _2024-01-18T12:05:32.000Z_
######  Diff: [`0693202...6d5e973`](https://github.com/ChromeDevTools/devtools-protocol/compare/0693202...6d5e973)

```diff
@@ browser_protocol.pdl:1299 @@ domain Browser
       optional BrowserContextID browserContextId
 
   # Reset all permission management for all origins.
-  experimental command resetPermissions
+  command resetPermissions
     parameters
       # BrowserContext to reset permissions. When omitted, default browser context is used.
       optional BrowserContextID browserContextId
@@ -2737,7 +2737,7 @@ domain DOM
   # Scrolls the specified rect of the given node into view if not already visible.
   # Note: exactly one between nodeId, backendNodeId and objectId should be passed
   # to identify the node.
-  experimental command scrollIntoViewIfNeeded
+  command scrollIntoViewIfNeeded
     parameters
       # Identifier of the node.
       optional NodeId nodeId
@@ -4045,7 +4045,7 @@ domain Emulation
       optional boolean enabled
 
   # Enables CPU throttling to emulate slow CPUs.
-  experimental command setCPUThrottlingRate
+  command setCPUThrottlingRate
     parameters
       # Throttling rate as a slowdown factor (1 is no throttle, 2 is 2x slowdown, etc).
       number rate
@@ -4124,7 +4124,7 @@ domain Emulation
       optional array of MediaFeature features
 
   # Emulates the given vision deficiency.
-  experimental command setEmulatedVisionDeficiency
+  command setEmulatedVisionDeficiency
     parameters
       # Vision deficiency to emulate. Order: best-effort emulations come first, followed by any
       # physiologically accurate emulations for medically recognized color vision deficiencies.
@@ -4173,7 +4173,7 @@ domain Emulation
       SensorReading reading
 
   # Overrides the Idle state.
-  experimental command setIdleOverride
+  command setIdleOverride
     parameters
       # Mock isUserActive
       boolean isUserActive
@@ -4181,7 +4181,7 @@ domain Emulation
       boolean isScreenUnlocked
 
   # Clears Idle state overrides.
-  experimental command clearIdleOverride
+  command clearIdleOverride
 
   # Overrides value returned by the javascript navigator object.
   experimental deprecated command setNavigatorOverrides
@@ -4234,7 +4234,7 @@ domain Emulation
       optional string locale
 
   # Overrides default host system timezone with the specified one.
-  experimental command setTimezoneOverride
+  command setTimezoneOverride
     parameters
       # The timezone identifier. If empty, disables the override and
       # restores default host system timezone.
@@ -6376,7 +6376,7 @@ domain Network
       array of string urls
 
   # Toggles ignoring of service worker for each request.
-  experimental command setBypassServiceWorker
+  command setBypassServiceWorker
     parameters
       # Bypass service worker and load from network.
       boolean bypass
@@ -8400,7 +8400,7 @@ domain Page
       boolean enabled
 
   # Enable page Content Security Policy by-passing.
-  experimental command setBypassCSP
+  command setBypassCSP
     parameters
       # Whether to bypass page CSP.
       boolean enabled
@@ -8512,7 +8512,7 @@ domain Page
       optional number accuracy
 
   # Controls whether page will emit lifecycle events.
-  experimental command setLifecycleEventsEnabled
+  command setLifecycleEventsEnabled
     parameters
       # If true, starts emitting lifecycle events.
       boolean enabled
@@ -8552,7 +8552,7 @@ domain Page
   experimental command crash
 
   # Tries to close page, running its beforeunload hooks, if any.
-  experimental command close
+  command close
 
   # Tries to update the web lifecycle state of the page.
   # It will transition the page to the given state according to:
@@ -8622,7 +8622,7 @@ domain Page
   # Intercept file chooser requests and transfer control to protocol clients.
   # When file chooser interception is enabled, native file chooser dialog is not shown.
   # Instead, a protocol event `Page.fileChooserOpened` is emitted.
-  experimental command setInterceptFileChooserDialog
+  command setInterceptFileChooserDialog
     parameters
       boolean enabled
 
@@ -9308,7 +9308,7 @@ domain Security
   command enable
 
   # Enable/disable whether all certificate errors should be ignored.
-  experimental command setIgnoreCertificateErrors
+  command setIgnoreCertificateErrors
     parameters
       # If true, all certificate errors will be ignored.
       boolean ignore
@@ -10374,23 +10374,23 @@ domain Target
 
   # Creates a new empty BrowserContext. Similar to an incognito profile but you can have more than
   # one.
-  experimental command createBrowserContext
+  command createBrowserContext
     parameters
       # If specified, disposes this context when debugging session disconnects.
-      optional boolean disposeOnDetach
+      experimental optional boolean disposeOnDetach
       # Proxy server, similar to the one passed to --proxy-server
-      optional string proxyServer
+      experimental optional string proxyServer
       # Proxy bypass list, similar to the one passed to --proxy-bypass-list
-      optional string proxyBypassList
+      experimental optional string proxyBypassList
       # An optional list of origins to grant unlimited cross-origin access to.
       # Parts of the URL other than those constituting origin are ignored.
-      optional array of string originsWithUniversalNetworkAccess
+      experimental optional array of string originsWithUniversalNetworkAccess
     returns
       # The id of the context created.
       Browser.BrowserContextID browserContextId
 
   # Returns all browser contexts created with `Target.createBrowserContext` method.
-  experimental command getBrowserContexts
+  command getBrowserContexts
     returns
       # An array of browser context ids.
       array of Browser.BrowserContextID browserContextIds
@@ -10430,7 +10430,7 @@ domain Target
 
   # Deletes a BrowserContext. All the belonging pages will be closed without calling their
   # beforeunload hooks.
-  experimental command disposeBrowserContext
+  command disposeBrowserContext
     parameters
       Browser.BrowserContextID browserContextId
 
@@ -10468,7 +10468,7 @@ domain Target
   # automatically detaches from all currently attached targets.
   # This also clears all targets added by `autoAttachRelated` from the list of targets to watch
   # for creation of related targets.
-  experimental command setAutoAttach
+  command setAutoAttach
     parameters
       # Whether to auto-attach to related targets.
       boolean autoAttach
@@ -10478,7 +10478,7 @@ domain Target
       # Enables "flat" access to the session via specifying sessionId attribute in the commands.
       # We plan to make this the default, deprecate non-flattened mode,
       # and eventually retire it. See crbug.com/991325.
-      optional boolean flatten
+      experimental optional boolean flatten
       # Only targets matching filter will be attached.
       experimental optional TargetFilter filter
 
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index 4754f17..8dad9c9 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -1665,7 +1665,7 @@ domain Runtime
   # Binding function takes exactly one argument, this argument should be string,
   # in case of any other input, function throws an exception.
   # Each binding function call produces Runtime.bindingCalled notification.
-  experimental command addBinding
+  command addBinding
     parameters
       string name
       # If specified, the binding would only be exposed to the specified
@@ -1675,17 +1675,17 @@ domain Runtime
       # Deprecated in favor of `executionContextName` due to an unclear use case
       # and bugs in implementation (crbug.com/1169639). `executionContextId` will be
       # removed in the future.
-      deprecated optional ExecutionContextId executionContextId
+      experimental deprecated optional ExecutionContextId executionContextId
       # If specified, the binding is exposed to the executionContext with
       # matching name, even for contexts created after the binding is added.
       # See also `ExecutionContext.name` and `worldName` parameter to
       # `Page.addScriptToEvaluateOnNewDocument`.
       # This parameter is mutually exclusive with `executionContextId`.
-      experimental optional string executionContextName
+      optional string executionContextName
 
   # This method does not remove binding function from global object but
   # unsubscribes current runtime agent from Runtime.bindingCalled notifications.
-  experimental command removeBinding
+  command removeBinding
     parameters
       string name
```

## Roll protocol to r1247362 — _2024-01-16T04:27:14.000Z_
######  Diff: [`fcea28f...145ad3b`](https://github.com/ChromeDevTools/devtools-protocol/compare/fcea28f...145ad3b)

```diff
@@ browser_protocol.pdl:5720 @@ domain Network
       deprecated optional string headersText
       # Resource mimeType as determined by the browser.
       string mimeType
+      # Resource charset as determined by the browser (if applicable).
+      string charset
       # Refined HTTP request headers that were actually transmitted over the network.
       optional Headers requestHeaders
       # HTTP request headers text. This has been replaced by the headers in Network.requestWillBeSentExtraInfo.
```

## Roll protocol to r1245094 — _2024-01-10T04:27:17.000Z_
######  Diff: [`91ab8a2...fcea28f`](https://github.com/ChromeDevTools/devtools-protocol/compare/91ab8a2...fcea28f)

```diff
@@ browser_protocol.pdl:8907 @@ domain Page
       WebSocketSticky
       SmartCard
       LiveMediaStreamTrack
+      UnloadHandler
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
```

## Roll protocol to r1239539 — _2023-12-20T04:24:43.000Z_
######  Diff: [`b7323b1...91ab8a2`](https://github.com/ChromeDevTools/devtools-protocol/compare/b7323b1...91ab8a2)

```diff
@@ browser_protocol.pdl:1083 @@ experimental domain Autofill
       string autofillType
       # The filling strategy
       FillingStrategy fillingStrategy
+      # The form field's DOM node
+      DOM.BackendNodeId fieldId
 
   # Emitted when an address form is filled.
   event addressFormFilled
```

## Roll protocol to r1238944 — _2023-12-19T04:26:54.000Z_
######  Diff: [`fe8e9cc...b7323b1`](https://github.com/ChromeDevTools/devtools-protocol/compare/fe8e9cc...b7323b1)

```diff
@@ browser_protocol.pdl:7672 @@ domain Page
       private-aggregation
       private-state-token-issuance
       private-state-token-redemption
+      publickey-credentials-create
       publickey-credentials-get
       run-ad-auction
       screen-wake-lock
@@ -8903,6 +8904,7 @@ domain Page
       WebTransportSticky
       WebSocketSticky
       SmartCard
+      LiveMediaStreamTrack
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
```

## Roll protocol to r1237913 — _2023-12-15T04:26:59.000Z_
######  Diff: [`eacb3c7...fe8e9cc`](https://github.com/ChromeDevTools/devtools-protocol/compare/eacb3c7...fe8e9cc)

```diff
@@ browser_protocol.pdl:7681 @@ domain Page
       shared-storage-select-url
       smart-card
       storage-access
+      sub-apps
       sync-xhr
       unload
       usb
```

## Roll protocol to r1236148 — _2023-12-12T04:26:53.000Z_
######  Diff: [`37c8ee7...eacb3c7`](https://github.com/ChromeDevTools/devtools-protocol/compare/37c8ee7...eacb3c7)

```diff
@@ browser_protocol.pdl:1221 @@ domain Browser
       audioCapture
       backgroundSync
       backgroundFetch
+      capturedSurfaceControl
       clipboardReadWrite
       clipboardSanitizedWrite
       displayCapture
@@ -1988,6 +1989,10 @@ experimental domain CSS
       string ruleText
       # Text position of a new rule in the target style sheet.
       SourceRange location
+      # NodeId for the DOM node in whose context custom property declarations for registered properties should be
+      # validated. If omitted, declarations in the new rule text can only be validated statically, which may produce
+      # incorrect results if the declaration contains a var() for example.
+      experimental optional DOM.NodeId nodeForPropertySyntaxValidation
     returns
       # The newly created rule.
       CSSRule rule
@@ -2231,6 +2236,10 @@ experimental domain CSS
   command setStyleTexts
     parameters
       array of StyleDeclarationEdit edits
+      # NodeId for the DOM node in whose context custom property declarations for registered properties should be
+      # validated. If omitted, declarations in the new rule text can only be validated statically, which may produce
+      # incorrect results if the declaration contains a var() for example.
+      experimental optional DOM.NodeId nodeForPropertySyntaxValidation
     returns
       # The resulting styles after modification.
       array of CSSStyle styles
@@ -7607,6 +7616,7 @@ domain Page
       bluetooth
       browsing-topics
       camera
+      captured-surface-control
       ch-dpr
       ch-device-memory
       ch-downlink
@@ -9959,6 +9969,17 @@ experimental domain Storage
       string key
       array of string values
 
+  experimental type AttributionReportingFilterConfig extends object
+    properties
+      array of AttributionReportingFilterDataEntry filterValues
+      # duration in seconds
+      optional integer lookbackWindow
+
+  experimental type AttributionReportingFilterPair extends object
+    properties
+      array of AttributionReportingFilterConfig filters
+      array of AttributionReportingFilterConfig notFilters
+
   experimental type AttributionReportingAggregationKeysEntry extends object
     properties
       string key
@@ -10017,13 +10038,99 @@ experimental domain Storage
       reportingOriginsPerSiteLimitReached
       exceedsMaxChannelCapacity
 
-  # TODO(crbug.com/1458532): Add other Attribution Reporting events, e.g.
-  # trigger registration.
   experimental event attributionReportingSourceRegistered
     parameters
       AttributionReportingSourceRegistration registration
       AttributionReportingSourceRegistrationResult result
 
+  experimental type AttributionReportingSourceRegistrationTimeConfig extends string
+    enum
+      include
+      exclude
+
+  experimental type AttributionReportingAggregatableValueEntry extends object
+    properties
+      string key
+      # number instead of integer because not all uint32 can be represented by
+      # int
+      number value
+
+  experimental type AttributionReportingEventTriggerData extends object
+    properties
+      UnsignedInt64AsBase10 data
+      SignedInt64AsBase10 priority
+      optional UnsignedInt64AsBase10 dedupKey
+      AttributionReportingFilterPair filters
+
+  experimental type AttributionReportingAggregatableTriggerData extends object
+    properties
+      UnsignedInt128AsBase16 keyPiece
+      array of string sourceKeys
+      AttributionReportingFilterPair filters
+
+  experimental type AttributionReportingAggregatableDedupKey extends object
+    properties
+      optional UnsignedInt64AsBase10 dedupKey
+      AttributionReportingFilterPair filters
+
+  experimental type AttributionReportingTriggerRegistration extends object
+    properties
+      AttributionReportingFilterPair filters
+      optional UnsignedInt64AsBase10 debugKey
+      array of AttributionReportingAggregatableDedupKey aggregatableDedupKeys
+      array of AttributionReportingEventTriggerData eventTriggerData
+      array of AttributionReportingAggregatableTriggerData aggregatableTriggerData
+      array of AttributionReportingAggregatableValueEntry aggregatableValues
+      boolean debugReporting
+      optional string aggregationCoordinatorOrigin
+      AttributionReportingSourceRegistrationTimeConfig sourceRegistrationTimeConfig
+      optional string triggerContextId
+
+  experimental type AttributionReportingEventLevelResult extends string
+    enum
+      success
+      successDroppedLowerPriority
+      internalError
+      noCapacityForAttributionDestination
+      noMatchingSources
+      deduplicated
+      excessiveAttributions
+      priorityTooLow
+      neverAttributedSource
+      excessiveReportingOrigins
+      noMatchingSourceFilterData
+      prohibitedByBrowserPolicy
+      noMatchingConfigurations
+      excessiveReports
+      falselyAttributedSource
+      reportWindowPassed
+      notRegistered
+      reportWindowNotStarted
+      noMatchingTriggerData
+
+  experimental type AttributionReportingAggregatableResult extends string
+    enum
+      success
+      internalError
+      noCapacityForAttributionDestination
+      noMatchingSources
+      excessiveAttributions
+      excessiveReportingOrigins
+      noHistograms
+      insufficientBudget
+      noMatchingSourceFilterData
+      notRegistered
+      prohibitedByBrowserPolicy
+      deduplicated
+      reportWindowPassed
+      excessiveReports
+
+  experimental event attributionReportingTriggerRegistered
+    parameters
+      AttributionReportingTriggerRegistration registration
+      AttributionReportingEventLevelResult eventLevel
+      AttributionReportingAggregatableResult aggregatable
+
 # The SystemInfo domain defines methods and events for querying low-level system information.
 experimental domain SystemInfo
```

## Roll protocol to r1235375 — _2023-12-09T04:26:39.000Z_
######  Diff: [`8f7e4a0...37c8ee7`](https://github.com/ChromeDevTools/devtools-protocol/compare/8f7e4a0...37c8ee7)

```diff
@@ browser_protocol.pdl:8891 @@ domain Page
       WebRTCSticky
       WebTransportSticky
       WebSocketSticky
+      SmartCard
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
```

## Roll protocol to r1234845 — _2023-12-08T04:27:01.000Z_
######  Diff: [`8db4cb9...8f7e4a0`](https://github.com/ChromeDevTools/devtools-protocol/compare/8db4cb9...8f7e4a0)

```diff
@@ browser_protocol.pdl:6465 @@ domain Network
       integer dataLength
       # Actual bytes received (might be less than dataLength for compressed encodings).
       integer encodedDataLength
+      # Data that was received.
+      experimental optional binary data
+
+  # Enables streaming of the response for the given requestId.
+  # If enabled, the dataReceived event contains the data that was received during streaming.
+  experimental command streamResourceContent
+    parameters
+      # Identifier of the request to stream.
+      RequestId requestId
+    returns
+      # Data that has been buffered until streaming is enabled.
+      binary bufferedData
 
   # Fired when EventSource message is received.
   event eventSourceMessageReceived
```

## Roll protocol to r1233758 — _2023-12-06T04:27:12.000Z_
######  Diff: [`accc8b6...8db4cb9`](https://github.com/ChromeDevTools/devtools-protocol/compare/accc8b6...8db4cb9)

```diff
@@ browser_protocol.pdl:11577 @@ experimental domain Preload
       PrefetchFailedNetError
       PrefetchFailedNon2XX
       PrefetchFailedPerPageLimitExceeded
-      PrefetchEvicted
+      PrefetchEvictedAfterCandidateRemoved
+      PrefetchEvictedForNewerPrefetch
       PrefetchHeldback
       # A previous prefetch to the origin got a HTTP 503 response with an
       # Retry-After header that has no elapsed yet.
```

## Roll protocol to r1233178 — _2023-12-05T04:26:58.000Z_
######  Diff: [`c098eb8...accc8b6`](https://github.com/ChromeDevTools/devtools-protocol/compare/c098eb8...accc8b6)

```diff
@@ browser_protocol.pdl:554 @@ experimental domain Audits
       Script
       ServiceWorker
       SharedWorker
+      SpeculationRules
       Stylesheet
       Track
       Video
```

## Roll protocol to r1232444 — _2023-12-03T04:26:26.000Z_
######  Diff: [`c137c7c...c098eb8`](https://github.com/ChromeDevTools/devtools-protocol/compare/c137c7c...c098eb8)

```diff
@@ browser_protocol.pdl:3916 @@ domain Emulation
       # A display feature that only splits content will have a 0 mask_length.
       integer maskLength
 
+  type DevicePosture extends object
+    properties
+      # Current posture of the device
+      enum type
+        continuous
+        folded
+
   type MediaFeature extends object
     properties
       string name
@@ -4073,6 +4080,9 @@ domain Emulation
       # If set, the display feature of a multi-segment screen. If not set, multi-segment support
       # is turned-off.
       experimental optional DisplayFeature displayFeature
+      # If set, the posture of a foldable device. If not set the posture is set
+      # to continuous.
+      experimental optional DevicePosture devicePosture
 
   experimental command setScrollbarsHidden
     parameters
```

## Roll protocol to r1231733 — _2023-12-01T04:27:08.000Z_
######  Diff: [`92cb696...c137c7c`](https://github.com/ChromeDevTools/devtools-protocol/compare/92cb696...c137c7c)

```diff
@@ browser_protocol.pdl:11103 @@ experimental domain WebAuthn
       # Sets whether User Verification succeeds or fails for an authenticator.
       # Defaults to false.
       optional boolean isUserVerified
+      # Credentials created by this authenticator will have the backup
+      # eligibility (BE) flag set to this value. Defaults to false.
+      # https://w3c.github.io/webauthn/#sctn-credential-backup
+      optional boolean defaultBackupEligibility
+      # Credentials created by this authenticator will have the backup state
+      # (BS) flag set to this value. Defaults to false.
+      # https://w3c.github.io/webauthn/#sctn-credential-backup
+      optional boolean defaultBackupState
 
   type Credential extends object
     properties
@@ -11671,6 +11679,12 @@ experimental domain FedCm
       string title
       optional string subtitle
 
+  # Triggered when a dialog is closed, either by user action, JS abort,
+  # or a command below.
+  event dialogClosed
+    parameters
+      string dialogId
+
   command enable
     parameters
       # Allows callers to disable the promise rejection delay that would
```

## Roll protocol to r1231134 — _2023-11-30T04:27:01.000Z_
######  Diff: [`2dcad56...92cb696`](https://github.com/ChromeDevTools/devtools-protocol/compare/2dcad56...92cb696)

```diff
@@ browser_protocol.pdl:7651 @@ domain Page
       sync-xhr
       unload
       usb
+      usb-unrestricted
       vertical-scroll
       web-printing
       web-share
@@ -11636,11 +11637,14 @@ experimental domain FedCm
       AccountChooser
       AutoReauthn
       ConfirmIdpLogin
+      Error
 
   # The buttons on the FedCM dialog.
   type DialogButton extends string
     enum
       ConfirmIdpLoginContinue
+      ErrorGotIt
+      ErrorMoreDetails
 
   # Corresponds to IdentityRequestAccount
   type Account extends object
```

## Roll protocol to r1227788 — _2023-11-22T04:27:05.000Z_
######  Diff: [`60572e5...2dcad56`](https://github.com/ChromeDevTools/devtools-protocol/compare/60572e5...2dcad56)

```diff
@@ browser_protocol.pdl:5679 @@ domain Network
       # This value is used when the reason is unknown.
       unspecifiedReason
 
+  experimental type ServiceWorkerRouterInfo extends object
+    properties
+      integer ruleIdMatched
+
   # HTTP response data.
   type Response extends object
     properties
@@ -5712,6 +5716,8 @@ domain Network
       optional boolean fromServiceWorker
       # Specifies that the request was served from the prefetch cache.
       optional boolean fromPrefetchCache
+      # Infomation about how Service Worker Static Router was used.
+      experimental optional ServiceWorkerRouterInfo serviceWorkerRouterInfo
       # Total number of bytes received for this request so far.
       number encodedDataLength
       # Timing information for the given request.
```

## Roll protocol to r1227218 — _2023-11-21T04:27:08.000Z_
######  Diff: [`9a97892...60572e5`](https://github.com/ChromeDevTools/devtools-protocol/compare/9a97892...60572e5)

```diff
@@ browser_protocol.pdl:5827 @@ domain Network
       # Cookie Priority
       experimental CookiePriority priority
       # True if cookie is SameParty.
-      experimental boolean sameParty
+      experimental deprecated boolean sameParty
       # Cookie source scheme type.
       experimental CookieSourceScheme sourceScheme
       # Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.
@@ -8155,16 +8155,6 @@ domain Page
       # as an ad. Only sent if frame is labelled as an ad and id is available.
       optional AdScriptId adScriptId
 
-  # Returns all browser cookies for the page and all of its subframes. Depending
-  # on the backend support, will return detailed cookie information in the
-  # `cookies` field.
-  experimental deprecated command getCookies
-    # Use 'Network.getCookies' instead
-    redirect Network
-    returns
-      # Array of cookie objects.
-      array of Network.Cookie cookies
-
   # Returns present frame tree structure.
   command getFrameTree
     returns
```

## Roll protocol to r1226504 — _2023-11-18T04:27:17.000Z_
######  Diff: [`a523432...9a97892`](https://github.com/ChromeDevTools/devtools-protocol/compare/a523432...9a97892)

```diff
@@ browser_protocol.pdl:8307 @@ domain Page
         ReturnAsStream
       # Whether or not to generate tagged (accessible) PDF. Defaults to embedder choice.
       experimental optional boolean generateTaggedPDF
+      # Whether or not to embed the document outline into the PDF.
+      experimental optional boolean generateDocumentOutline
     returns
       # Base64-encoded pdf data. Empty if |returnAsStream| is specified.
       binary data
```

## Roll protocol to r1225305 — _2023-11-16T04:27:11.000Z_
######  Diff: [`5d6dd33...a523432`](https://github.com/ChromeDevTools/devtools-protocol/compare/5d6dd33...a523432)

```diff
@@ browser_protocol.pdl:1847 @@ experimental domain CSS
     properties
       # Font's family name reported by platform.
       string familyName
+      # Font's PostScript name reported by platform.
+      string postScriptName
       # Indicates if the font was downloaded or resolved locally.
       boolean isCustomFont
       # Amount of glyphs that were rendered with this font.
```

## Roll protocol to r1224742 — _2023-11-15T04:26:44.000Z_
######  Diff: [`b28b672...5d6dd33`](https://github.com/ChromeDevTools/devtools-protocol/compare/b28b672...5d6dd33)

```diff
@@ browser_protocol.pdl:4250 @@ domain Emulation
     parameters
       # User agent to use.
       string userAgent
-      # Browser langugage to emulate.
+      # Browser language to emulate.
       optional string acceptLanguage
       # The platform navigator.platform should return.
       optional string platform
@@ -6427,7 +6427,7 @@ domain Network
     parameters
       # User agent to use.
       string userAgent
-      # Browser langugage to emulate.
+      # Browser language to emulate.
       optional string acceptLanguage
       # The platform navigator.platform should return.
       optional string platform
```

## Roll protocol to r1224083 — _2023-11-14T04:26:27.000Z_
######  Diff: [`d21da35...b28b672`](https://github.com/ChromeDevTools/devtools-protocol/compare/d21da35...b28b672)

```diff
@@ browser_protocol.pdl:1926 @@ experimental domain CSS
       string syntax
 
 
+  # CSS font-palette-values rule representation.
+  type CSSFontPaletteValuesRule extends object
+    properties
+      # The css style sheet identifier (absent for user agent stylesheet and user-specified
+      # stylesheet rules) this rule came from.
+      optional StyleSheetId styleSheetId
+      # Parent stylesheet's origin.
+      StyleSheetOrigin origin
+      # Associated font palette name.
+      Value fontPaletteName
+      # Associated style declaration.
+      CSSStyle style
+
   # CSS property at-rule representation.
   type CSSPropertyRule extends object
     properties
@@ -2070,6 +2083,8 @@ experimental domain CSS
       optional array of CSSPropertyRule cssPropertyRules
       # A list of CSS property registrations matching this node.
       optional array of CSSPropertyRegistration cssPropertyRegistrations
+      # A font-palette-values rule matching this node.
+      optional CSSFontPaletteValuesRule cssFontPaletteValuesRule
       # Id of the first parent element that does not have display: contents.
       experimental optional DOM.NodeId parentLayoutNodeId
```

## Roll protocol to r1222075 — _2023-11-09T04:26:36.000Z_
######  Diff: [`66e9966...d21da35`](https://github.com/ChromeDevTools/devtools-protocol/compare/66e9966...d21da35)

```diff
@@ browser_protocol.pdl:11615 @@ experimental domain FedCm
       SignIn
       SignUp
 
-  # Whether the dialog shown is an account chooser or an auto re-authentication dialog.
+  # The types of FedCM dialogs.
   type DialogType extends string
     enum
       AccountChooser
       AutoReauthn
       ConfirmIdpLogin
 
+  # The buttons on the FedCM dialog.
+  type DialogButton extends string
+    enum
+      ConfirmIdpLoginContinue
+
   # Corresponds to IdentityRequestAccount
   type Account extends object
     properties
@@ -11661,11 +11666,10 @@ experimental domain FedCm
       string dialogId
       integer accountIndex
 
-  # Only valid if the dialog type is ConfirmIdpLogin. Acts as if the user had
-  # clicked the continue button.
-  command confirmIdpLogin
+  command clickDialogButton
     parameters
       string dialogId
+      DialogButton dialogButton
 
   command dismissDialog
     parameters
```

## Roll protocol to r1220723 — _2023-11-07T04:26:31.000Z_
######  Diff: [`2860a80...66e9966`](https://github.com/ChromeDevTools/devtools-protocol/compare/2860a80...66e9966)

```diff
@@ browser_protocol.pdl:9931 @@ experimental domain Storage
       # duration in seconds
       array of integer ends
 
+  experimental type AttributionReportingTriggerSpec extends object
+    properties
+      # number instead of integer because not all uint32 can be represented by
+      # int
+      array of number triggerData
+      AttributionReportingEventReportWindows eventReportWindows
+
   experimental type AttributionReportingTriggerDataMatching extends string
     enum
       exact
@@ -9941,7 +9948,7 @@ experimental domain Storage
       Network.TimeSinceEpoch time
       # duration in seconds
       integer expiry
-      AttributionReportingEventReportWindows eventReportWindows
+      array of AttributionReportingTriggerSpec triggerSpecs
       # duration in seconds
       integer aggregatableReportWindow
       AttributionReportingSourceType type
```

## Roll protocol to r1219864 — _2023-11-04T04:26:10.000Z_
######  Diff: [`5e6cb44...2860a80`](https://github.com/ChromeDevTools/devtools-protocol/compare/5e6cb44...2860a80)

```diff
@@ browser_protocol.pdl:827 @@ experimental domain Audits
       IdTokenHttpNotFound
       IdTokenNoResponse
       IdTokenInvalidResponse
+      IdTokenIdpErrorResponse
+      IdTokenCrossSiteIdpErrorResponse
       IdTokenInvalidRequest
       IdTokenInvalidContentType
       ErrorIdToken
@@ -1249,7 +1251,7 @@ domain Browser
       prompt
 
   # Definition of PermissionDescriptor defined in the Permissions API:
-  # https://w3c.github.io/permissions/#dictdef-permissiondescriptor.
+  # https://w3c.github.io/permissions/#dom-permissiondescriptor.
   experimental type PermissionDescriptor extends object
     properties
       # Name of permission.
@@ -7627,6 +7629,7 @@ domain Page
       unload
       usb
       vertical-scroll
+      web-printing
       web-share
       # Alias for 'window-placement' (crbug.com/1328581).
       window-management
```

## Roll protocol to r1218079 — _2023-11-01T04:26:32.000Z_
######  Diff: [`fbb8eea...5e6cb44`](https://github.com/ChromeDevTools/devtools-protocol/compare/fbb8eea...5e6cb44)

```diff
@@ browser_protocol.pdl:9344 @@ experimental domain ServiceWorker
       optional number scriptResponseTime
       optional array of Target.TargetID controlledClients
       optional Target.TargetID targetId
+      optional string routerRules
 
   # ServiceWorker error message.
   type ServiceWorkerErrorMessage extends object
@@ -11571,6 +11572,13 @@ experimental domain Preload
       PrefetchStatus prefetchStatus
       Network.RequestId requestId
 
+  # Information of headers to be displayed when the header mismatch occurred.
+  type PrerenderMismatchedHeaders extends object
+    properties
+      string headerName
+      optional string initialValue
+      optional string activationValue
+
   # Fired when a prerender attempt is updated.
   event prerenderStatusUpdated
     parameters
@@ -11580,6 +11588,7 @@ experimental domain Preload
       # This is used to give users more information about the name of Mojo interface
       # that is incompatible with prerender and has caused the cancellation of the attempt.
       optional string disallowedMojoInterface
+      optional array of PrerenderMismatchedHeaders mismatchedHeaders
 
   # Send a list of sources for all preloading attempts in a document.
   event preloadingAttemptSourcesUpdated
```

## Roll protocol to r1213968 — _2023-10-24T04:26:10.000Z_
######  Diff: [`886d013...fbb8eea`](https://github.com/ChromeDevTools/devtools-protocol/compare/886d013...fbb8eea)

```diff
@@ browser_protocol.pdl:9927 @@ experimental domain Storage
       # duration in seconds
       array of integer ends
 
+  experimental type AttributionReportingTriggerDataMatching extends string
+    enum
+      exact
+      modulus
+
   experimental type AttributionReportingSourceRegistration extends object
     properties
       Network.TimeSinceEpoch time
@@ -9944,6 +9949,7 @@ experimental domain Storage
       array of AttributionReportingFilterDataEntry filterData
       array of AttributionReportingAggregationKeysEntry aggregationKeys
       optional UnsignedInt64AsBase10 debugKey
+      AttributionReportingTriggerDataMatching triggerDataMatching
 
   experimental type AttributionReportingSourceRegistrationResult extends string
     enum
```

## Roll protocol to r1212569 — _2023-10-20T04:26:29.000Z_
######  Diff: [`631cf6b...886d013`](https://github.com/ChromeDevTools/devtools-protocol/compare/631cf6b...886d013)

```diff
@@ browser_protocol.pdl:8886 @@ domain Page
       PageSupportNeeded
       Circumstantial
 
+  experimental type BackForwardCacheBlockingDetails extends object
+    properties
+      # Url of the file where blockage happened. Optional because of tests.
+      optional string url
+      # Function name where blockage happened. Optional because of anonymous functions and tests.
+      optional string function
+      # Line number in the script (0-based).
+      integer lineNumber
+      # Column number in the script (0-based).
+      integer columnNumber
+
   experimental type BackForwardCacheNotRestoredExplanation extends object
     properties
       # Type of the reason
@@ -8897,6 +8908,7 @@ domain Page
       # - EmbedderExtensionSentMessageToCachedFrame: the extension ID.
       #
       optional string context
+      optional array of BackForwardCacheBlockingDetails details
 
   experimental type BackForwardCacheNotRestoredExplanationTree extends object
     properties
```

## Roll protocol to r1211954 — _2023-10-19T04:26:27.000Z_
######  Diff: [`a60ce47...631cf6b`](https://github.com/ChromeDevTools/devtools-protocol/compare/a60ce47...631cf6b)

```diff
@@ browser_protocol.pdl:498 @@ experimental domain Audits
       WarnAttributeValueExceedsMaxSize
       WarnDomainNonASCII
       WarnThirdPartyPhaseout
+      WarnCrossSiteRedirectDowngradeChangesInclusion
 
   type CookieOperation extends string
     enum
@@ -770,6 +771,15 @@ experimental domain Audits
     properties
       array of string trackingSites
 
+  # This issue warns about third-party sites that are accessing cookies on the
+  # current page, and have been permitted due to having a global metadata grant.
+  # Note that in this context 'site' means eTLD+1. For example, if the URL
+  # `https://example.test:80/web_page` was accessing cookies, the site reported
+  # would be `example.test`.
+  type CookieDeprecationMetadataIssueDetails extends object
+    properties
+      array of string allowedSites
+
   type ClientHintIssueReason extends string
     enum
       # Items in the accept-ch meta tag allow list must be valid origins.
@@ -915,6 +925,7 @@ experimental domain Audits
       ClientHintIssue
       FederatedAuthRequestIssue
       BounceTrackingIssue
+      CookieDeprecationMetadataIssue
       StylesheetLoadingIssue
       FederatedAuthUserInfoRequestIssue
       PropertyRuleIssue
@@ -940,6 +951,7 @@ experimental domain Audits
       optional ClientHintIssueDetails clientHintIssueDetails
       optional FederatedAuthRequestIssueDetails federatedAuthRequestIssueDetails
       optional BounceTrackingIssueDetails bounceTrackingIssueDetails
+      optional CookieDeprecationMetadataIssueDetails cookieDeprecationMetadataIssueDetails
       optional StylesheetLoadingIssueDetails stylesheetLoadingIssueDetails
       optional PropertyRuleIssueDetails propertyRuleIssueDetails
       optional FederatedAuthUserInfoRequestIssueDetails federatedAuthUserInfoRequestIssueDetails
@@ -3923,6 +3935,49 @@ domain Emulation
       optional string bitness
       optional boolean wow64
 
+  # Used to specify sensor types to emulate.
+  # See https://w3c.github.io/sensors/#automation for more information.
+  experimental type SensorType extends string
+    enum
+      absolute-orientation
+      accelerometer
+      ambient-light
+      gravity
+      gyroscope
+      linear-acceleration
+      magnetometer
+      proximity
+      relative-orientation
+
+  experimental type SensorMetadata extends object
+    properties
+      optional boolean available
+      optional number minimumFrequency
+      optional number maximumFrequency
+
+  experimental type SensorReadingSingle extends object
+    properties
+      number value
+
+  experimental type SensorReadingXYZ extends object
+    properties
+      number x
+      number y
+      number z
+
+  experimental type SensorReadingQuaternion extends object
+    properties
+      number x
+      number y
+      number z
+      number w
+
+  experimental type SensorReading extends object
+    properties
+      optional SensorReadingSingle single
+      optional SensorReadingXYZ xyz
+      optional SensorReadingQuaternion quaternion
+
   # Tells whether emulation is supported.
   command canEmulate
     returns
@@ -4052,6 +4107,30 @@ domain Emulation
       # Mock accuracy
       optional number accuracy
 
+  experimental command getOverriddenSensorInformation
+    parameters
+      SensorType type
+    returns
+      number requestedSamplingFrequency
+
+  # Overrides a platform sensor of a given type. If |enabled| is true, calls to
+  # Sensor.start() will use a virtual sensor as backend rather than fetching
+  # data from a real hardware sensor. Otherwise, existing virtual
+  # sensor-backend Sensor objects will fire an error event and new calls to
+  # Sensor.start() will attempt to use a real sensor instead.
+  experimental command setSensorOverrideEnabled
+    parameters
+      boolean enabled
+      SensorType type
+      optional SensorMetadata metadata
+
+  # Updates the sensor readings reported by a sensor type previously overriden
+  # by setSensorOverrideEnabled.
+  experimental command setSensorOverrideReadings
+    parameters
+      SensorType type
+      SensorReading reading
+
   # Overrides the Idle state.
   experimental command setIdleOverride
     parameters
```

## Roll protocol to r1209236 — _2023-10-13T04:26:43.000Z_
######  Diff: [`25e67ec...a60ce47`](https://github.com/ChromeDevTools/devtools-protocol/compare/25e67ec...a60ce47)

```diff
@@ browser_protocol.pdl:7111 @@ experimental domain Overlay
       # The content box highlight outline color (default: transparent).
       optional DOM.RGBA outlineColor
 
+  # Configuration for Window Controls Overlay
+  type WindowControlsOverlayConfig extends object
+    properties
+      # Whether the title bar CSS should be shown when emulating the Window Controls Overlay.
+      boolean showCSS
+      # Seleted platforms to show the overlay.
+      string selectedPlatform
+      # The theme color defined in app manifest.
+      string themeColor
+
   type ContainerQueryHighlightConfig extends object
     properties
       # A descriptor for the highlight appearance of container query containers.
@@ -7361,6 +7371,12 @@ experimental domain Overlay
       # An array of node identifiers and descriptors for the highlight appearance.
       array of IsolatedElementHighlightConfig isolatedElementHighlightConfigs
 
+  # Show Window Controls Overlay for PWA
+  command setShowWindowControlsOverlay
+    parameters
+      # Window Controls Overlay data, null means hide Window Controls Overlay
+      optional WindowControlsOverlayConfig windowControlsOverlayConfig
+
   # Fired when the node should be inspected. This happens after call to `setInspectMode` or when
   # user manually inspects an element.
   event inspectNodeRequested
```

## Roll protocol to r1208070 — _2023-10-11T04:26:19.000Z_
######  Diff: [`37c2c03...25e67ec`](https://github.com/ChromeDevTools/devtools-protocol/compare/37c2c03...25e67ec)

```diff
@@ browser_protocol.pdl:11376 @@ experimental domain Preload
       MemoryPressureOnTrigger
       MemoryPressureAfterTriggered
       PrerenderingDisabledByDevTools
-      ResourceLoadBlockedByClient
       SpeculationRuleRemoved
       ActivatedWithAuxiliaryBrowsingContexts
       MaxNumOfRunningEagerPrerendersExceeded
```

## Roll protocol to r1207450 — _2023-10-10T04:26:17.000Z_
######  Diff: [`f050ff5...37c2c03`](https://github.com/ChromeDevTools/devtools-protocol/compare/f050ff5...37c2c03)

```diff
@@ browser_protocol.pdl:4499 @@ domain Input
       # The normalized tangential pressure, which has a range of [-1,1] (default: 0).
       experimental optional number tangentialPressure
       # The plane angle between the Y-Z plane and the plane containing both the stylus axis and the Y axis, in degrees of the range [-90,90], a positive tiltX is to the right (default: 0)
-      experimental optional integer tiltX
+      optional number tiltX
       # The plane angle between the X-Z plane and the plane containing both the stylus axis and the X axis, in degrees of the range [-90,90], a positive tiltY is towards the user (default: 0).
-      experimental optional integer tiltY
+      optional number tiltY
       # The clockwise rotation of a pen stylus around its own major axis, in degrees in the range [0,359] (default: 0).
       experimental optional integer twist
       # Identifier used to track touch sources between events, must be unique within an event.
@@ -4667,9 +4667,9 @@ domain Input
       # The normalized tangential pressure, which has a range of [-1,1] (default: 0).
       experimental optional number tangentialPressure
       # The plane angle between the Y-Z plane and the plane containing both the stylus axis and the Y axis, in degrees of the range [-90,90], a positive tiltX is to the right (default: 0).
-      experimental optional integer tiltX
+      optional number tiltX
       # The plane angle between the X-Z plane and the plane containing both the stylus axis and the X axis, in degrees of the range [-90,90], a positive tiltY is towards the user (default: 0).
-      experimental optional integer tiltY
+      optional number tiltY
       # The clockwise rotation of a pen stylus around its own major axis, in degrees in the range [0,359] (default: 0).
       experimental optional integer twist
       # X delta in CSS pixels for mouse wheel event (default: 0).
```

## Roll protocol to r1206220 — _2023-10-06T04:26:22.000Z_
######  Diff: [`40ddf1a...f050ff5`](https://github.com/ChromeDevTools/devtools-protocol/compare/40ddf1a...f050ff5)

```diff
@@ browser_protocol.pdl:9824 @@ experimental domain Storage
     properties
       Network.TimeSinceEpoch time
       # duration in seconds
-      optional integer expiry
-      # eventReportWindow and eventReportWindows are mutually exclusive
+      integer expiry
+      AttributionReportingEventReportWindows eventReportWindows
       # duration in seconds
-      optional integer eventReportWindow
-      optional AttributionReportingEventReportWindows eventReportWindows
-      # duration in seconds
-      optional integer aggregatableReportWindow
+      integer aggregatableReportWindow
       AttributionReportingSourceType type
       string sourceOrigin
       string reportingOrigin
```

## Roll protocol to r1205644 — _2023-10-05T04:26:19.000Z_
######  Diff: [`629de2c...40ddf1a`](https://github.com/ChromeDevTools/devtools-protocol/compare/629de2c...40ddf1a)

```diff
@@ browser_protocol.pdl:824 @@ experimental domain Audits
       RpPageNotVisible
       SilentMediationFailure
       ThirdPartyCookiesBlocked
+      NotSignedInWithIdp
 
   type FederatedAuthUserInfoRequestIssueDetails extends object
     properties
@@ -3268,7 +3269,6 @@ domain DOM
 # execution will stop on these operations as if there was a regular breakpoint set.
 domain DOMDebugger
   depends on DOM
-  depends on Debugger
   depends on Runtime
 
   # DOM breakpoint type.
@@ -3340,7 +3340,8 @@ domain DOMDebugger
       experimental optional string targetName
 
   # Removes breakpoint on particular native event.
-  experimental command removeInstrumentationBreakpoint
+  experimental deprecated command removeInstrumentationBreakpoint
+    redirect EventBreakpoints
     parameters
       # Instrumentation name to stop on.
       string eventName
@@ -3375,7 +3376,8 @@ domain DOMDebugger
       experimental optional string targetName
 
   # Sets breakpoint on particular native event.
-  experimental command setInstrumentationBreakpoint
+  experimental deprecated command setInstrumentationBreakpoint
+    redirect EventBreakpoints
     parameters
       # Instrumentation name to stop on.
       string eventName
@@ -3386,10 +3388,9 @@ domain DOMDebugger
       # Resource URL substring. All XHRs having this substring in the URL will get stopped upon.
       string url
 
-# EventBreakpoints permits setting breakpoints on particular operations and
-# events in targets that run JavaScript but do not have a DOM.
-# JavaScript execution will stop on these operations as if there was a regular
-# breakpoint set.
+# EventBreakpoints permits setting JavaScript breakpoints on operations and events
+# occurring in native code invoked from JavaScript. Once breakpoint is hit, it is
+# reported through Debugger domain, similarly to regular breakpoints being hit.
 experimental domain EventBreakpoints
   # Sets breakpoint on particular native event.
   command setInstrumentationBreakpoint
@@ -3403,6 +3404,9 @@ experimental domain EventBreakpoints
       # Instrumentation name to stop on.
       string eventName
 
+  # Removes all breakpoints
+  command disable
+
 # This domain facilitates obtaining document snapshots with DOM, layout, and style information.
 experimental domain DOMSnapshot
   depends on CSS
```

## Roll protocol to r1204456 — _2023-10-03T04:26:51.000Z_
######  Diff: [`464d58a...629de2c`](https://github.com/ChromeDevTools/devtools-protocol/compare/464d58a...629de2c)

```diff
@@ browser_protocol.pdl:9359 @@ experimental domain Storage
       win
       additionalBid
       additionalBidWin
+      clear
 
   # Ad advertising element inside an interest group.
   type InterestGroupAd extends object
@@ -11487,7 +11488,7 @@ experimental domain FedCm
     enum
       AccountChooser
       AutoReauthn
-      ConfirmIdpSignin
+      ConfirmIdpLogin
 
   # Corresponds to IdentityRequestAccount
   type Account extends object
@@ -11498,7 +11499,7 @@ experimental domain FedCm
       string givenName
       string pictureUrl
       string idpConfigUrl
-      string idpSigninUrl
+      string idpLoginUrl
       LoginState loginState
       # These two are only set if the loginState is signUp
       optional string termsOfServiceUrl
@@ -11528,9 +11529,9 @@ experimental domain FedCm
       string dialogId
       integer accountIndex
 
-  # Only valid if the dialog type is ConfirmIdpSignin. Acts as if the user had
+  # Only valid if the dialog type is ConfirmIdpLogin. Acts as if the user had
   # clicked the continue button.
-  command confirmIdpSignin
+  command confirmIdpLogin
     parameters
       string dialogId
```

## Roll protocol to r1203626 — _2023-09-30T04:26:42.000Z_
######  Diff: [`7cd293f...464d58a`](https://github.com/ChromeDevTools/devtools-protocol/compare/7cd293f...464d58a)

```diff
@@ browser_protocol.pdl:11322 @@ experimental domain Preload
       LowEndDevice
       InvalidSchemeRedirect
       InvalidSchemeNavigation
-      InProgressNavigation
       NavigationRequestBlockedByCsp
       MainFrameNavigation
       MojoBinderPolicy
```

## Roll protocol to r1203060 — _2023-09-29T04:26:12.000Z_
######  Diff: [`e3feaa6...7cd293f`](https://github.com/ChromeDevTools/devtools-protocol/compare/e3feaa6...7cd293f)

```diff
@@ browser_protocol.pdl:9363 @@ experimental domain Storage
   # Ad advertising element inside an interest group.
   type InterestGroupAd extends object
     properties
-      string renderUrl
+      string renderURL
       optional string metadata
 
   # The full details of an interest group.
@@ -9373,10 +9373,10 @@ experimental domain Storage
       string name
       Network.TimeSinceEpoch expirationTime
       string joiningOrigin
-      optional string biddingUrl
-      optional string biddingWasmHelperUrl
-      optional string updateUrl
-      optional string trustedBiddingSignalsUrl
+      optional string biddingLogicURL
+      optional string biddingWasmHelperURL
+      optional string updateURL
+      optional string trustedBiddingSignalsURL
       array of string trustedBiddingSignalsKeys
       optional string userBiddingSignals
       array of InterestGroupAd ads
@@ -11385,18 +11385,6 @@ experimental domain Preload
       RedirectedPrerenderingUrlHasEffectiveUrl
       ActivationUrlHasEffectiveUrl
 
-  # Fired when a prerender attempt is completed.
-  event prerenderAttemptCompleted
-    parameters
-      PreloadingAttemptKey key
-      # The frame id of the frame initiating prerendering.
-      Page.FrameId initiatingFrameId
-      string prerenderingUrl
-      PrerenderFinalStatus finalStatus
-      # This is used to give users more information about the name of the API call
-      # that is incompatible with prerender and has caused the cancellation of the attempt
-      optional string disallowedApiMethod
-
   # Fired when a preload enabled state is updated.
   event preloadEnabledStateUpdated
     parameters
```

## Roll protocol to r1202299 — _2023-09-28T04:26:18.000Z_
######  Diff: [`89ab493...e3feaa6`](https://github.com/ChromeDevTools/devtools-protocol/compare/89ab493...e3feaa6)

```diff
@@ js_protocol.pdl:1014 @@ domain Runtime
   # Unique script identifier.
   type ScriptId extends string
 
-  # Represents options for serialization. Overrides `generatePreview`, `returnByValue` and
-  # `generateWebDriverValue`.
+  # Represents options for serialization. Overrides `generatePreview` and `returnByValue`.
   type SerializationOptions extends object
     properties
       enum serialization
@@ -1027,8 +1026,7 @@ domain Runtime
         # `returnByValue: true`. Overrides `returnByValue`.
         json
         # Only remote object id is put in the result. Same bahaviour as if no
-        # `serializationOptions`, `generatePreview`, `returnByValue` nor `generateWebDriverValue`
-        # are provided.
+        # `serializationOptions`, `generatePreview` nor `returnByValue` are provided.
         idOnly
 
       # Deep serialization depth. Default is full depth. Respected only in `deep` serialization mode.
@@ -1126,8 +1124,6 @@ domain Runtime
       optional UnserializableValue unserializableValue
       # String representation of the object.
       optional string description
-      # Deprecated. Use `deepSerializedValue` instead. WebDriver BiDi representation of the value.
-      deprecated optional DeepSerializedValue webDriverValue
       # Deep serialized value.
       experimental optional DeepSerializedValue deepSerializedValue
       # Unique object identifier (for non-primitive values).
@@ -1443,13 +1439,8 @@ domain Runtime
       # boundaries).
       # This is mutually exclusive with `executionContextId`.
       experimental optional string uniqueContextId
-      # Deprecated. Use `serializationOptions: {serialization:"deep"}` instead.
-      # Whether the result should contain `webDriverValue`, serialized according to
-      # https://w3c.github.io/webdriver-bidi. This is mutually exclusive with `returnByValue`, but
-      # resulting `objectId` is still provided.
-      deprecated optional boolean generateWebDriverValue
       # Specifies the result serialization. If provided, overrides
-      # `generatePreview`, `returnByValue` and `generateWebDriverValue`.
+      # `generatePreview` and `returnByValue`.
       experimental optional SerializationOptions serializationOptions
 
     returns
@@ -1537,14 +1528,8 @@ domain Runtime
       # boundaries).
       # This is mutually exclusive with `contextId`.
       experimental optional string uniqueContextId
-      # Deprecated. Use `serializationOptions: {serialization:"deep"}` instead.
-      # Whether the result should contain `webDriverValue`, serialized
-      # according to
-      # https://w3c.github.io/webdriver-bidi. This is mutually exclusive with `returnByValue`, but
-      # resulting `objectId` is still provided.
-      deprecated optional boolean generateWebDriverValue
       # Specifies the result serialization. If provided, overrides
-      # `generatePreview`, `returnByValue` and `generateWebDriverValue`.
+      # `generatePreview` and `returnByValue`.
       experimental optional SerializationOptions serializationOptions
     returns
       # Evaluation result.
```

## Roll protocol to r1200039 — _2023-09-22T04:26:23.000Z_
######  Diff: [`bef1c5e...89ab493`](https://github.com/ChromeDevTools/devtools-protocol/compare/bef1c5e...89ab493)

```diff
@@ browser_protocol.pdl:874 @@ experimental domain Audits
       # Contains additional info when the failure was due to a request.
       optional FailedRequestInfo failedRequestInfo
 
+  type PropertyRuleIssueReason extends string
+    enum
+      InvalidSyntax
+      InvalidInitialValue
+      InvalidInherits
+      InvalidName
+
+  # This issue warns about errors in property rules that lead to property
+  # registrations being ignored.
+  type PropertyRuleIssueDetails extends object
+    properties
+      # Source code position of the property rule.
+      SourceCodeLocation sourceCodeLocation
+      # Reason why the property rule was discarded.
+      PropertyRuleIssueReason propertyRuleIssueReason
+      # The value of the property rule property that failed to parse
+      optional string propertyValue
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -898,6 +916,7 @@ experimental domain Audits
       BounceTrackingIssue
       StylesheetLoadingIssue
       FederatedAuthUserInfoRequestIssue
+      PropertyRuleIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -921,6 +940,7 @@ experimental domain Audits
       optional FederatedAuthRequestIssueDetails federatedAuthRequestIssueDetails
       optional BounceTrackingIssueDetails bounceTrackingIssueDetails
       optional StylesheetLoadingIssueDetails stylesheetLoadingIssueDetails
+      optional PropertyRuleIssueDetails propertyRuleIssueDetails
       optional FederatedAuthUserInfoRequestIssueDetails federatedAuthUserInfoRequestIssueDetails
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
@@ -9337,6 +9357,8 @@ experimental domain Storage
       loaded
       bid
       win
+      additionalBid
+      additionalBidWin
 
   # Ad advertising element inside an interest group.
   type InterestGroupAd extends object
```

## Roll protocol to r1199410 — _2023-09-21T04:26:11.000Z_
######  Diff: [`4c3c454...bef1c5e`](https://github.com/ChromeDevTools/devtools-protocol/compare/4c3c454...bef1c5e)

```diff
@@ browser_protocol.pdl:11324 @@ experimental domain Preload
       TriggerBackgrounded
       MemoryLimitExceeded
       DataSaverEnabled
-      HasEffectiveUrl
+      TriggerUrlHasEffectiveUrl
       ActivatedBeforeStarted
       InactivePageRestriction
       StartFailed
@@ -11359,6 +11359,9 @@ experimental domain Preload
       MaxNumOfRunningEagerPrerendersExceeded
       MaxNumOfRunningNonEagerPrerendersExceeded
       MaxNumOfRunningEmbedderPrerendersExceeded
+      PrerenderingUrlHasEffectiveUrl
+      RedirectedPrerenderingUrlHasEffectiveUrl
+      ActivationUrlHasEffectiveUrl
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
```

## Roll protocol to r1198794 — _2023-09-20T04:26:33.000Z_
######  Diff: [`042ec44...4c3c454`](https://github.com/ChromeDevTools/devtools-protocol/compare/042ec44...4c3c454)

```diff
@@ browser_protocol.pdl:5736 @@ domain Network
       SameSiteNoneInsecure
       # The cookie was not stored due to user preferences.
       UserPreferences
+      # The cookie was blocked due to third-party cookie phaseout.
+      ThirdPartyPhaseout
       # The cookie was blocked by third-party cookie blocking between sites in
       # the same First-Party Set.
       ThirdPartyBlockedInFirstPartySet
@@ -5781,6 +5783,8 @@ domain Network
       # character if it appears in the middle of the cookie name, value, an
       # attribute name, or an attribute value.
       DisallowedCharacter
+      # Cookie contains no content or only whitespace.
+      NoCookieContent
 
   # Types of reasons why a cookie may not be sent with a request.
   experimental type CookieBlockedReason extends string
@@ -5807,6 +5811,8 @@ domain Network
       SameSiteNoneInsecure
       # The cookie was not sent due to user preferences.
       UserPreferences
+      # The cookie was blocked due to third-party cookie phaseout.
+      ThirdPartyPhaseout
       # The cookie was blocked by third-party cookie blocking between sites in
       # the same First-Party Set.
       ThirdPartyBlockedInFirstPartySet
```

## Roll protocol to r1196408 — _2023-09-14T04:25:59.000Z_
######  Diff: [`2fffccb...042ec44`](https://github.com/ChromeDevTools/devtools-protocol/compare/2fffccb...042ec44)

```diff
@@ browser_protocol.pdl:2095 @@ experimental domain CSS
       string propertyName
       string value
 
+  # Modifies the property rule property name.
+  command setPropertyRulePropertyName
+    parameters
+      StyleSheetId styleSheetId
+      SourceRange range
+      string propertyName
+    returns
+      # The resulting key text after modification.
+      Value propertyName
+
   # Modifies the keyframe rule key text.
   command setKeyframeKey
     parameters
@@ -11296,7 +11306,6 @@ experimental domain Preload
       NavigationBadHttpStatus
       ClientCertRequested
       NavigationRequestNetworkError
-      MaxNumOfRunningPrerendersExceeded
       CancelAllHostsForTesting
       DidFailLoad
       Stop
@@ -11341,6 +11350,9 @@ experimental domain Preload
       ResourceLoadBlockedByClient
       SpeculationRuleRemoved
       ActivatedWithAuxiliaryBrowsingContexts
+      MaxNumOfRunningEagerPrerendersExceeded
+      MaxNumOfRunningNonEagerPrerendersExceeded
+      MaxNumOfRunningEmbedderPrerendersExceeded
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
```

## Roll protocol to r1195796 — _2023-09-13T04:26:23.000Z_
######  Diff: [`c0f98d9...2fffccb`](https://github.com/ChromeDevTools/devtools-protocol/compare/c0f98d9...2fffccb)

```diff
@@ js_protocol.pdl:1066 @@ domain Runtime
         arraybuffer
         node
         window
+        generator
       optional any value
       optional string objectId
       # Set if value reference met more then once during serialization. In such
```

## Roll protocol to r1195207 — _2023-09-12T04:25:54.000Z_
######  Diff: [`322248d...c0f98d9`](https://github.com/ChromeDevTools/devtools-protocol/compare/322248d...c0f98d9)

```diff
@@ browser_protocol.pdl:1015 @@ experimental domain Autofill
       # fields and values defining an address.
       array of AddressField fields
 
-  # Defines how an address can be displayed like in chrome://settings/addresses. 
+  # Defines how an address can be displayed like in chrome://settings/addresses.
   # Address UI is a two dimensional array, each inner array is an "address information line", and when rendered in a UI surface should be displayed as such.
   # The following address UI for instance:
   # [[{name: "GIVE_NAME", value: "Jon"}, {name: "FAMILY_NAME", value: "Doe"}], [{name: "CITY", value: "Munich"}, {name: "ZIP", value: "81456"}]]
@@ -1053,7 +1053,7 @@ experimental domain Autofill
     parameters
       # Information about the fields that were filled
       array of FilledField filledFields
-      # An UI representation of the address used to fill the form. 
+      # An UI representation of the address used to fill the form.
       # Consists of a 2D array where each child represents an address/profile line.
       AddressUI addressUi
```

## Roll protocol to r1193409 — _2023-09-07T04:26:24.000Z_
######  Diff: [`7b181f3...322248d`](https://github.com/ChromeDevTools/devtools-protocol/compare/7b181f3...322248d)

```diff
@@ browser_protocol.pdl:11308 @@ experimental domain Preload
       MixedContent
       TriggerBackgrounded
       MemoryLimitExceeded
-      # Prerenders can be cancelled when Chrome uses excessive memory. This is
-      # recorded when it fails to get the memory usage.
-      FailToGetMemoryUsage
       DataSaverEnabled
       HasEffectiveUrl
       ActivatedBeforeStarted
```

## Roll protocol to r1191157 — _2023-09-01T04:26:11.000Z_
######  Diff: [`c9743b7...7b181f3`](https://github.com/ChromeDevTools/devtools-protocol/compare/c9743b7...7b181f3)

```diff
@@ browser_protocol.pdl:9770 @@ experimental domain Storage
       string key
       UnsignedInt128AsBase16 value
 
+  experimental type AttributionReportingEventReportWindows extends object
+    properties
+      # duration in seconds
+      integer start
+      # duration in seconds
+      array of integer ends
+
   experimental type AttributionReportingSourceRegistration extends object
     properties
       Network.TimeSinceEpoch time
       # duration in seconds
       optional integer expiry
+      # eventReportWindow and eventReportWindows are mutually exclusive
       # duration in seconds
       optional integer eventReportWindow
+      optional AttributionReportingEventReportWindows eventReportWindows
       # duration in seconds
       optional integer aggregatableReportWindow
       AttributionReportingSourceType type
```

## Roll protocol to r1188743 — _2023-08-27T04:25:42.000Z_
######  Diff: [`dad93a5...c9743b7`](https://github.com/ChromeDevTools/devtools-protocol/compare/dad93a5...c9743b7)

```diff
@@ browser_protocol.pdl:7430 @@ domain Page
       ch-ect
       ch-prefers-color-scheme
       ch-prefers-reduced-motion
+      ch-prefers-reduced-transparency
       ch-rtt
       ch-save-data
       ch-ua
```

## Roll protocol to r1188649 — _2023-08-26T04:25:29.000Z_
######  Diff: [`4e97090...dad93a5`](https://github.com/ChromeDevTools/devtools-protocol/compare/4e97090...dad93a5)

```diff
@@ browser_protocol.pdl:1002 @@ experimental domain Autofill
     properties
       # address field name, for example GIVEN_NAME.
       string name
-      # address field name, for example Jon Doe.
+      # address field value, for example Jon Doe.
       string value
 
+  # A list of address fields.
+  type AddressFields extends object
+    properties
+      array of AddressField fields
+
   type Address extends object
     properties
-      # fields and values defining a test address.
+      # fields and values defining an address.
       array of AddressField fields
 
+  # Defines how an address can be displayed like in chrome://settings/addresses. 
+  # Address UI is a two dimensional array, each inner array is an "address information line", and when rendered in a UI surface should be displayed as such.
+  # The following address UI for instance:
+  # [[{name: "GIVE_NAME", value: "Jon"}, {name: "FAMILY_NAME", value: "Doe"}], [{name: "CITY", value: "Munich"}, {name: "ZIP", value: "81456"}]]
+  # should allow the receiver to render:
+  # Jon Doe
+  # Munich 81456
+  type AddressUI extends object
+    properties
+      # A two dimension array containing the repesentation of values from an address profile.
+      array of AddressFields addressFields
+
+  # Specified whether a filled field was done so by using the html autocomplete attribute or autofill heuristics.
+  type FillingStrategy extends string
+    enum
+      autocompleteAttribute
+      autofillInferred
+
+  type FilledField extends object
+    properties
+      # The type of the field, e.g text, password etc.
+      string htmlType
+      # the html id
+      string id
+      # the html name
+      string name
+      # the field value
+      string value
+      # The actual field type, e.g FAMILY_NAME
+      string autofillType
+      # The filling strategy
+      FillingStrategy fillingStrategy
+
+  # Emitted when an address form is filled.
+  event addressFormFilled
+    parameters
+      # Information about the fields that were filled
+      array of FilledField filledFields
+      # An UI representation of the address used to fill the form. 
+      # Consists of a 2D array where each child represents an address/profile line.
+      AddressUI addressUi
+
   # Trigger autofill on a form identified by the fieldId.
   # If the field and related form cannot be autofilled, returns an error.
   command trigger
```

## Roll protocol to r1188167 — _2023-08-25T04:26:40.000Z_
######  Diff: [`b899c22...4e97090`](https://github.com/ChromeDevTools/devtools-protocol/compare/b899c22...4e97090)

```diff
@@ browser_protocol.pdl:1027 @@ experimental domain Autofill
     parameters
       array of Address addresses
 
+  # Disables autofill domain notifications.
+  command disable
+
+  # Enables autofill domain notifications.
+  command enable
 
 # Defines events for background web platform features.
 experimental domain BackgroundService
@@ -11439,6 +11444,12 @@ experimental domain FedCm
       string dialogId
       integer accountIndex
 
+  # Only valid if the dialog type is ConfirmIdpSignin. Acts as if the user had
+  # clicked the continue button.
+  command confirmIdpSignin
+    parameters
+      string dialogId
+
   command dismissDialog
     parameters
       string dialogId
```

## Roll protocol to r1182435 — _2023-08-11T04:25:48.000Z_
######  Diff: [`71df2aa...b899c22`](https://github.com/ChromeDevTools/devtools-protocol/compare/71df2aa...b899c22)

```diff
@@ browser_protocol.pdl:1830 @@ experimental domain CSS
       # List of keyframes.
       array of CSSKeyframeRule keyframes
 
+  # Representation of a custom property registration through CSS.registerProperty
+  type CSSPropertyRegistration extends object
+    properties
+      string propertyName
+      optional Value initialValue
+      boolean inherits
+      string syntax
+
+
+  # CSS property at-rule representation.
+  type CSSPropertyRule extends object
+    properties
+      # The css style sheet identifier (absent for user agent stylesheet and user-specified
+      # stylesheet rules) this rule came from.
+      optional StyleSheetId styleSheetId
+      # Parent stylesheet's origin.
+      StyleSheetOrigin origin
+      # Associated property name.
+      Value propertyName
+      # Associated style declaration.
+      CSSStyle style
+
   # CSS keyframe rule representation.
   type CSSKeyframeRule extends object
     properties
@@ -1957,6 +1979,10 @@ experimental domain CSS
       optional array of CSSKeyframesRule cssKeyframesRules
       # A list of CSS position fallbacks matching this node.
       optional array of CSSPositionFallbackRule cssPositionFallbackRules
+      # A list of CSS at-property rules matching this node.
+      optional array of CSSPropertyRule cssPropertyRules
+      # A list of CSS property registrations matching this node.
+      optional array of CSSPropertyRegistration cssPropertyRegistrations
       # Id of the first parent element that does not have display: contents.
       experimental optional DOM.NodeId parentLayoutNodeId
 
@@ -11372,6 +11398,7 @@ experimental domain FedCm
     enum
       AccountChooser
       AutoReauthn
+      ConfirmIdpSignin
 
   # Corresponds to IdentityRequestAccount
   type Account extends object
```

## Roll protocol to r1181874 — _2023-08-10T04:26:30.000Z_
######  Diff: [`39e3626...71df2aa`](https://github.com/ChromeDevTools/devtools-protocol/compare/39e3626...71df2aa)

```diff
@@ browser_protocol.pdl:483 @@ experimental domain Audits
       ExcludeSamePartyCrossPartyContext
       ExcludeDomainNonASCII
       ExcludeThirdPartyCookieBlockedInFirstPartySet
+      ExcludeThirdPartyPhaseout
 
   type CookieWarningReason extends string
     enum
```

## Roll protocol to r1179426 — _2023-08-04T04:26:28.000Z_
######  Diff: [`0de2384...39e3626`](https://github.com/ChromeDevTools/devtools-protocol/compare/0de2384...39e3626)

```diff
@@ browser_protocol.pdl:8070 @@ domain Page
       experimental optional enum transferMode
         ReturnAsBase64
         ReturnAsStream
+      # Whether or not to generate tagged (accessible) PDF. Defaults to embedder choice.
+      experimental optional boolean generateTaggedPDF
     returns
       # Base64-encoded pdf data. Empty if |returnAsStream| is specified.
       binary data
@@ -9720,6 +9722,7 @@ experimental domain Storage
       destinationGlobalLimitReached
       destinationBothLimitsReached
       reportingOriginsPerSiteLimitReached
+      exceedsMaxChannelCapacity
 
   # TODO(crbug.com/1458532): Add other Attribution Reporting events, e.g.
   # trigger registration.
```

## Roll protocol to r1177611 — _2023-08-01T04:26:34.000Z_
######  Diff: [`e22d6aa...0de2384`](https://github.com/ChromeDevTools/devtools-protocol/compare/e22d6aa...0de2384)

```diff
@@ browser_protocol.pdl:5688 @@ domain Network
       # The cookie's name/value pair size exceeded the size limit defined in
       # RFC6265bis.
       NameValuePairExceedsMaxSize
+      # The cookie contained a forbidden ASCII control character, or the tab
+      # character if it appears in the middle of the cookie name, value, an
+      # attribute name, or an attribute value.
+      DisallowedCharacter
 
   # Types of reasons why a cookie may not be sent with a request.
   experimental type CookieBlockedReason extends string
```

## Roll protocol to r1173815 — _2023-07-22T04:25:56.000Z_
######  Diff: [`57ca382...e22d6aa`](https://github.com/ChromeDevTools/devtools-protocol/compare/57ca382...e22d6aa)

```diff
@@ browser_protocol.pdl:496 @@ experimental domain Audits
       WarnSameSiteLaxCrossDowngradeLax
       WarnAttributeValueExceedsMaxSize
       WarnDomainNonASCII
+      WarnThirdPartyPhaseout
 
   type CookieOperation extends string
     enum
```

## Roll protocol to r1173320 — _2023-07-21T04:26:31.000Z_
######  Diff: [`68de33a...57ca382`](https://github.com/ChromeDevTools/devtools-protocol/compare/68de33a...57ca382)

```diff
@@ browser_protocol.pdl:72 @@ experimental domain Accessibility
       optional AXValue attributeValue
       # Whether this source is superseded by a higher priority source.
       optional boolean superseded
-      # The native markup source for this value, e.g. a <label> element.
+      # The native markup source for this value, e.g. a `<label>` element.
       optional AXValueNativeSourceType nativeSource
       # The value, such as a node or node list, of the native source.
       optional AXValue nativeSourceValue
@@ -1503,7 +1503,7 @@ experimental domain CSS
       boolean isInline
       # Whether this stylesheet is mutable. Inline stylesheets become mutable
       # after they have been modified via CSSOM API.
-      # <link> element's stylesheets become mutable only if DevTools modifies them.
+      # `<link>` element's stylesheets become mutable only if DevTools modifies them.
       # Constructed stylesheets (new CSSStyleSheet()) are mutable immediately after creation.
       boolean isMutable
       # True if this stylesheet is created through new CSSStyleSheet() or imported as a
@@ -2326,8 +2326,8 @@ experimental domain Cast
 # the JavaScript object wrapper, etc. It is important that client receives DOM events only for the
 # nodes that are known to the client. Backend keeps track of the nodes that were sent to the client
 # and never sends the same node twice. It is client's responsibility to collect information about
-# the nodes that were sent to the client.<p>Note that `iframe` owner elements will return
-# corresponding document elements as their child nodes.</p>
+# the nodes that were sent to the client. Note that `iframe` owner elements will return
+# corresponding document elements as their child nodes.
 domain DOM
   depends on Runtime
 
@@ -4107,8 +4107,8 @@ experimental domain HeadlessExperimental
 # Input/Output operations for streams produced by DevTools.
 domain IO
 
-  # This is either obtained from another method or specified as `blob:&lt;uuid&gt;` where
-  # `&lt;uuid&gt` is an UUID of a Blob.
+  # This is either obtained from another method or specified as `blob:<uuid>` where
+  # `<uuid>` is an UUID of a Blob.
   type StreamHandle extends string
 
   # Close the stream, discard any temporary backing storage.
@@ -5880,7 +5880,7 @@ domain Network
       Headers responseHeaders
       # Signed exchange response signature.
       array of SignedExchangeSignature signatures
-      # Signed exchange header integrity hash in the form of "sha256-<base64-hash-value>".
+      # Signed exchange header integrity hash in the form of `sha256-<base64-hash-value>`.
       string headerIntegrity
 
   # Field type for a signed exchange related error.
@@ -8359,7 +8359,7 @@ domain Page
       enum mode
         selectSingle
         selectMultiple
-      # Input node id. Only present for file choosers opened via an <input type="file"> element.
+      # Input node id. Only present for file choosers opened via an `<input type="file">` element.
       experimental optional DOM.BackendNodeId backendNodeId
 
   # Fired when frame has been attached to its parent.
@@ -11096,7 +11096,7 @@ experimental domain Preload
       # Identifies a document which the rule set is associated with.
       Network.LoaderId loaderId
       # Source text of JSON representing the rule set. If it comes from
-      # <script> tag, it is the textContent of the node. Note that it is
+      # `<script>` tag, it is the textContent of the node. Note that it is
       # a JSON for valid case.
       #
       # See also:
@@ -11104,9 +11104,9 @@ experimental domain Preload
       # - https://github.com/WICG/nav-speculation/blob/main/triggers.md
       string sourceText
       # A speculation rule set is either added through an inline
-      # <script> tag or through an external resource via the
+      # `<script>` tag or through an external resource via the
       # 'Speculation-Rules' HTTP header. For the first case, we include
-      # the BackendNodeId of the relevant <script> tag. For the second
+      # the BackendNodeId of the relevant `<script>` tag. For the second
       # case, we include the external URL where the rule set was loaded
       # from, and also RequestId if Network domain is enabled.
       #
@@ -11210,7 +11210,6 @@ experimental domain Preload
       AudioOutputDeviceRequested
       MixedContent
       TriggerBackgrounded
-      EmbedderTriggeredAndCrossOriginRedirected
       MemoryLimitExceeded
       # Prerenders can be cancelled when Chrome uses excessive memory. This is
       # recorded when it fails to get the memory usage.
```

## Roll protocol to r1172767 — _2023-07-20T04:26:30.000Z_
######  Diff: [`5ed816f...68de33a`](https://github.com/ChromeDevTools/devtools-protocol/compare/5ed816f...68de33a)

```diff
@@ browser_protocol.pdl:11247 @@ experimental domain Preload
       PrerenderingDisabledByDevTools
       ResourceLoadBlockedByClient
       SpeculationRuleRemoved
+      ActivatedWithAuxiliaryBrowsingContexts
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
```

## Roll protocol to r1170846 — _2023-07-15T04:27:50.000Z_
######  Diff: [`b1cb882...5ed816f`](https://github.com/ChromeDevTools/devtools-protocol/compare/b1cb882...5ed816f)

```diff
@@ browser_protocol.pdl:10485 @@ domain Fetch
   # takeResponseBodyForInterceptionAsStream. Calling other methods that
   # affect the request or disabling fetch domain before body is received
   # results in an undefined behavior.
+  # Note that the response body is not available for redirects. Requests
+  # paused in the _redirect received_ state may be differentiated by
+  # `responseCode` and presence of `location` response header, see
+  # comments to `requestPaused` for details.
   command getResponseBody
     parameters
       # Identifier for the intercepted request to get body for.
@@ -10517,6 +10521,11 @@ domain Fetch
   # The stage of the request can be determined by presence of responseErrorReason
   # and responseStatusCode -- the request is at the response stage if either
   # of these fields is present and in the request stage otherwise.
+  # Redirect responses and subsequent requests are reported similarly to regular
+  # responses and requests. Redirect responses may be distinguished by the value
+  # of `responseStatusCode` (which is one of 301, 302, 303, 307, 308) along with
+  # presence of the `location` header. Requests resulting from a redirect will
+  # have `redirectedRequestId` field set.
   event requestPaused
     parameters
       # Each request the page makes will have a unique id.
```

## Roll protocol to r1170333 — _2023-07-14T04:28:05.000Z_
######  Diff: [`dd37d9b...b1cb882`](https://github.com/ChromeDevTools/devtools-protocol/compare/dd37d9b...b1cb882)

```diff
@@ browser_protocol.pdl:6268 @@ domain Network
       MonotonicTime timestamp
       # Total number of bytes received for this request.
       number encodedDataLength
-      # Set when 1) response was blocked by Cross-Origin Read Blocking and also
-      # 2) this needs to be reported to the DevTools console.
-      optional boolean shouldReportCorbBlocking
 
   # Details of an intercepted HTTP request, which must be either allowed, blocked, modified or
   # mocked.
```

## Roll protocol to r1169739 — _2023-07-13T04:27:48.000Z_
######  Diff: [`697a922...dd37d9b`](https://github.com/ChromeDevTools/devtools-protocol/compare/697a922...dd37d9b)

```diff
@@ browser_protocol.pdl:8581 @@ domain Page
       FencedFramesEmbedder
       CookieDisabled
       HTTPAuthRequired
+      CookieFlushed
       #Blocklisted features
       WebSocket
       WebTransport
@@ -11239,6 +11240,7 @@ experimental domain Preload
       MemoryPressureAfterTriggered
       PrerenderingDisabledByDevTools
       ResourceLoadBlockedByClient
+      SpeculationRuleRemoved
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
```

## Roll protocol to r1169132 — _2023-07-12T04:28:03.000Z_
######  Diff: [`863ba3f...697a922`](https://github.com/ChromeDevTools/devtools-protocol/compare/863ba3f...697a922)

```diff
@@ browser_protocol.pdl:5921 @@ domain Network
       deflate
       gzip
       br
+      zstd
 
   # Sets a list of content encodings that will be accepted. Empty list means no encoding is accepted.
   experimental command setAcceptedEncodings
```

## Roll protocol to r1168520 — _2023-07-11T04:28:09.000Z_
######  Diff: [`8b56da5...863ba3f`](https://github.com/ChromeDevTools/devtools-protocol/compare/8b56da5...863ba3f)

```diff
@@ browser_protocol.pdl:697 @@ experimental domain Audits
       InvalidRegisterOsTriggerHeader
       WebAndOsHeaders
       NoWebOrOsSupport
+      NavigationRegistrationWithoutTransientUserActivation
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
@@ -4586,6 +4587,9 @@ domain Input
       # Time at which the event occurred.
       optional TimeSinceEpoch timestamp
 
+  # Cancels any active dragging in the page.
+  command cancelDragging
+
   # Emulates touch event from the mouse event parameters.
   experimental command emulateTouchFromMouseEvent
     parameters
```

## Roll protocol to r1167732 — _2023-07-08T04:27:37.000Z_
######  Diff: [`f3b3b51...8b56da5`](https://github.com/ChromeDevTools/devtools-protocol/compare/f3b3b51...8b56da5)

```diff
@@ browser_protocol.pdl:9711 @@ experimental domain Storage
       destinationReportingLimitReached
       destinationGlobalLimitReached
       destinationBothLimitsReached
+      reportingOriginsPerSiteLimitReached
 
   # TODO(crbug.com/1458532): Add other Attribution Reporting events, e.g.
   # trigger registration.
```

## Roll protocol to r1166296 — _2023-07-06T04:28:50.000Z_
######  Diff: [`02fc905...f3b3b51`](https://github.com/ChromeDevTools/devtools-protocol/compare/02fc905...f3b3b51)

```diff
@@ browser_protocol.pdl:1562 @@ experimental domain CSS
       ContainerRule
       LayerRule
       ScopeRule
+      StyleRule
 
   # CSS coverage information.
   type RuleUsage extends object
@@ -9655,6 +9656,69 @@ experimental domain Storage
       # If enabled, noise is suppressed and reports are sent immediately.
       boolean enabled
 
+  # Enables/disables issuing of Attribution Reporting events.
+  experimental command setAttributionReportingTracking
+    parameters
+      boolean enable
+
+  experimental type AttributionReportingSourceType extends string
+    enum
+      navigation
+      event
+
+  experimental type UnsignedInt64AsBase10 extends string
+  experimental type UnsignedInt128AsBase16 extends string
+  experimental type SignedInt64AsBase10 extends string
+
+  experimental type AttributionReportingFilterDataEntry extends object
+    properties
+      string key
+      array of string values
+
+  experimental type AttributionReportingAggregationKeysEntry extends object
+    properties
+      string key
+      UnsignedInt128AsBase16 value
+
+  experimental type AttributionReportingSourceRegistration extends object
+    properties
+      Network.TimeSinceEpoch time
+      # duration in seconds
+      optional integer expiry
+      # duration in seconds
+      optional integer eventReportWindow
+      # duration in seconds
+      optional integer aggregatableReportWindow
+      AttributionReportingSourceType type
+      string sourceOrigin
+      string reportingOrigin
+      array of string destinationSites
+      UnsignedInt64AsBase10 eventId
+      SignedInt64AsBase10 priority
+      array of AttributionReportingFilterDataEntry filterData
+      array of AttributionReportingAggregationKeysEntry aggregationKeys
+      optional UnsignedInt64AsBase10 debugKey
+
+  experimental type AttributionReportingSourceRegistrationResult extends string
+    enum
+      success
+      internalError
+      insufficientSourceCapacity
+      insufficientUniqueDestinationCapacity
+      excessiveReportingOrigins
+      prohibitedByBrowserPolicy
+      successNoised
+      destinationReportingLimitReached
+      destinationGlobalLimitReached
+      destinationBothLimitsReached
+
+  # TODO(crbug.com/1458532): Add other Attribution Reporting events, e.g.
+  # trigger registration.
+  experimental event attributionReportingSourceRegistered
+    parameters
+      AttributionReportingSourceRegistration registration
+      AttributionReportingSourceRegistrationResult result
+
 # The SystemInfo domain defines methods and events for querying low-level system information.
 experimental domain SystemInfo
```

## Roll protocol to r1165779 — _2023-07-05T04:28:56.000Z_
######  Diff: [`a96ac10...02fc905`](https://github.com/ChromeDevTools/devtools-protocol/compare/a96ac10...02fc905)

```diff
@@ browser_protocol.pdl:1550 @@ experimental domain CSS
       # @scope CSS at-rule array.
       # The array enumerates @scope at-rules starting with the innermost one, going outwards.
       experimental optional array of CSSScope scopes
+      # The array keeps the types of ancestor CSSRules from the innermost going outwards.
+      experimental optional array of CSSRuleType ruleTypes
+
+  # Enum indicating the type of a CSS rule, used to represent the order of a style rule's ancestors.
+  # This list only contains rule types that are collected during the ancestor rule collection.
+  experimental type CSSRuleType extends string
+    enum
+      MediaRule
+      SupportsRule
+      ContainerRule
+      LayerRule
+      ScopeRule
 
   # CSS coverage information.
   type RuleUsage extends object
```

## Roll protocol to r1165014 — _2023-07-01T04:27:51.000Z_
######  Diff: [`f92e635...a96ac10`](https://github.com/ChromeDevTools/devtools-protocol/compare/f92e635...a96ac10)

```diff
@@ browser_protocol.pdl:719 @@ experimental domain Audits
       Page.FrameId frameId
       Network.LoaderId loaderId
 
-  type NavigatorUserAgentIssueDetails extends object
+  deprecated type NavigatorUserAgentIssueDetails extends object
     properties
       string url
       optional SourceCodeLocation location
@@ -737,6 +737,7 @@ experimental domain Audits
       FormLabelHasNeitherForNorNestedInput
       FormLabelForMatchesNonExistingIdError
       FormInputHasWrongButWellIntendedAutocompleteValueError
+      ResponseWasBlockedByORB
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
@@ -746,6 +747,7 @@ experimental domain Audits
       optional Page.FrameId frameId
       optional DOM.BackendNodeId violatingNodeId
       optional string violatingNodeAttribute
+      optional AffectedRequest request
 
   # This issue tracks information needed to print a deprecation message.
   # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/third_party/blink/renderer/core/frame/deprecation/README.md
@@ -884,6 +886,7 @@ experimental domain Audits
       CorsIssue
       AttributionReportingIssue
       QuirksModeIssue
+      # Deprecated
       NavigatorUserAgentIssue
       GenericIssue
       DeprecationIssue
@@ -908,7 +911,7 @@ experimental domain Audits
       optional CorsIssueDetails corsIssueDetails
       optional AttributionReportingIssueDetails attributionReportingIssueDetails
       optional QuirksModeIssueDetails quirksModeIssueDetails
-      optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
+      deprecated optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
       optional GenericIssueDetails genericIssueDetails
       optional DeprecationIssueDetails deprecationIssueDetails
       optional ClientHintIssueDetails clientHintIssueDetails
```

## Roll protocol to r1163380 — _2023-06-28T04:28:21.000Z_
######  Diff: [`67ae7fb...f92e635`](https://github.com/ChromeDevTools/devtools-protocol/compare/67ae7fb...f92e635)

```diff
@@ browser_protocol.pdl:9634 @@ experimental domain Storage
     parameters
       string bucketId
 
+  # https://wicg.github.io/attribution-reporting-api/
+  experimental command setAttributionReportingLocalTestingMode
+    parameters
+      # If enabled, noise is suppressed and reports are sent immediately.
+      boolean enabled
+
 # The SystemInfo domain defines methods and events for querying low-level system information.
 experimental domain SystemInfo
```

## Roll protocol to r1162774 — _2023-06-27T04:28:23.000Z_
######  Diff: [`3494f54...67ae7fb`](https://github.com/ChromeDevTools/devtools-protocol/compare/3494f54...67ae7fb)

```diff
@@ browser_protocol.pdl:7773 @@ domain Page
       # Specifies whether command line API should be available to the script, defaults
       # to false.
       experimental optional boolean includeCommandLineAPI
+      # If true, runs the script immediately on existing execution contexts or worlds.
+      # Default: false.
+      experimental optional boolean runImmediately
     returns
       # Identifier of the added script.
       ScriptIdentifier identifier
@@ -11164,6 +11167,8 @@ experimental domain Preload
       boolean disabledByPreference
       boolean disabledByDataSaver
       boolean disabledByBatterySaver
+      boolean disabledByHoldbackPrefetchSpeculationRules
+      boolean disabledByHoldbackPrerenderSpeculationRules
 
   # Preloading status values, see also PreloadingTriggeringOutcome. This
   # status is shared by prefetchStatusUpdated and prerenderStatusUpdated.
@@ -11227,6 +11232,7 @@ experimental domain Preload
       string prefetchUrl
       PreloadingStatus status
       PrefetchStatus prefetchStatus
+      Network.RequestId requestId
 
   # Fired when a prerender attempt is updated.
   event prerenderStatusUpdated
@@ -11234,6 +11240,9 @@ experimental domain Preload
       PreloadingAttemptKey key
       PreloadingStatus status
       optional PrerenderFinalStatus prerenderStatus
+      # This is used to give users more information about the name of Mojo interface
+      # that is incompatible with prerender and has caused the cancellation of the attempt.
+      optional string disallowedMojoInterface
 
   # Send a list of sources for all preloading attempts in a document.
   event preloadingAttemptSourcesUpdated
```

## Roll protocol to r1161598 — _2023-06-23T04:28:28.000Z_
######  Diff: [`7b1ec35...3494f54`](https://github.com/ChromeDevTools/devtools-protocol/compare/7b1ec35...3494f54)

```diff
@@ browser_protocol.pdl:7336 @@ domain Page
       ch-ua-platform
       ch-ua-model
       ch-ua-mobile
+      ch-ua-form-factor
       ch-ua-full-version
       ch-ua-full-version-list
       ch-ua-platform-version
@@ -8568,14 +8569,12 @@ domain Page
       DocumentLoaded
       DedicatedWorkerOrWorklet
       OutstandingNetworkRequestOthers
-      OutstandingIndexedDBTransaction
       RequestedMIDIPermission
       RequestedAudioCapturePermission
       RequestedVideoCapturePermission
       RequestedBackForwardCacheBlockedSensors
       RequestedBackgroundWorkPermission
       BroadcastChannel
-      IndexedDBConnection
       WebXR
       SharedWorker
       WebLocks
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index 7a3c772..ed62263 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -1034,6 +1034,11 @@ domain Runtime
       # Deep serialization depth. Default is full depth. Respected only in `deep` serialization mode.
       optional integer maxDepth
 
+      # Embedder-specific parameters. For example if connected to V8 in Chrome these control DOM
+      # serialization via `maxNodeDepth: integer` and `includeShadowTree: "none" | "open" | "all"`.
+      # Values can be only of type string or integer.
+      optional object additionalParameters
+
   # Represents deep serialized value.
   type DeepSerializedValue extends object
     properties
```

## Roll protocol to r1161029 — _2023-06-22T04:26:26.000Z_
######  Diff: [`6ef566f...7b1ec35`](https://github.com/ChromeDevTools/devtools-protocol/compare/6ef566f...7b1ec35)

```diff
@@ browser_protocol.pdl:5368 @@ domain Network
       # address space.
       UnexpectedPrivateNetworkAccess
       NoCorsRedirectModeNotFollow
+      # Request was a private network request and needed user permission yet did
+      # not carry `Private-Network-Access-Id` in the preflight response.
+      # https://github.com/WICG/private-network-access/blob/main/permission_prompt/explainer.md
+      PreflightMissingPrivateNetworkAccessId
+      # Request was a private network request and needed user permission yet did
+      # not carry `Private-Network-Access-Name` in the preflight response.
+      # https://github.com/WICG/private-network-access/blob/main/permission_prompt/explainer.md
+      PreflightMissingPrivateNetworkAccessName
+      # Request was a private network request and needed user permission yet not
+      # able to request for permission.
+      # https://github.com/WICG/private-network-access/blob/main/permission_prompt/explainer.md
+      PrivateNetworkAccessPermissionUnavailable
+      # Request was a private network request and is denied by user permission.
+      # https://github.com/WICG/private-network-access/blob/main/permission_prompt/explainer.md
+      PrivateNetworkAccessPermissionDenied
 
   type CorsErrorStatus extends object
     properties
@@ -8540,6 +8555,7 @@ domain Page
       ErrorDocument
       FencedFramesEmbedder
       CookieDisabled
+      HTTPAuthRequired
       #Blocklisted features
       WebSocket
       WebTransport
```

## Roll protocol to r1159816 — _2023-06-20T04:26:35.000Z_
######  Diff: [`1663e91...6ef566f`](https://github.com/ChromeDevTools/devtools-protocol/compare/1663e91...6ef566f)

```diff
@@ browser_protocol.pdl:8587 @@ domain Page
       IndexedDBEvent
       Dummy
       JsNetworkRequestReceivedCacheControlNoStoreResource
+      WebRTCSticky
+      WebTransportSticky
+      WebSocketSticky
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
```

## Roll protocol to r1158625 — _2023-06-16T04:26:28.000Z_
######  Diff: [`b8200ca...1663e91`](https://github.com/ChromeDevTools/devtools-protocol/compare/b8200ca...1663e91)

```diff
@@ browser_protocol.pdl:992 @@ experimental domain Autofill
       # 3-digit card verification code.
       string cvc
 
+  type AddressField extends object
+    properties
+      # address field name, for example GIVEN_NAME.
+      string name
+      # address field name, for example Jon Doe.
+      string value
+
+  type Address extends object
+    properties
+      # fields and values defining a test address.
+      array of AddressField fields
+
   # Trigger autofill on a form identified by the fieldId.
   # If the field and related form cannot be autofilled, returns an error.
   command trigger
@@ -1003,6 +1015,13 @@ experimental domain Autofill
       # Credit card information to fill out the form. Credit card data is not saved.
       CreditCard card
 
+  # Set addresses so that developers can verify their forms implementation.
+  command setAddresses
+    # Test addresses for the available countries.
+    parameters
+      array of Address addresses
+
+
 # Defines events for background web platform features.
 experimental domain BackgroundService
   # The Background Service that will be associated with the commands/events.
```

## Roll protocol to r1157354 — _2023-06-14T04:26:43.000Z_
######  Diff: [`e4caf5f...b8200ca`](https://github.com/ChromeDevTools/devtools-protocol/compare/e4caf5f...b8200ca)

```diff
@@ browser_protocol.pdl:8568 @@ domain Page
       IndexedDBEvent
       Dummy
       JsNetworkRequestReceivedCacheControlNoStoreResource
-      WebSerial
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
```

## Roll protocol to r1156692 — _2023-06-13T04:26:37.000Z_
######  Diff: [`2a2181a...e4caf5f`](https://github.com/ChromeDevTools/devtools-protocol/compare/2a2181a...e4caf5f)

```diff
@@ browser_protocol.pdl:852 @@ experimental domain Audits
       string url
       # The failure message for the failed request.
       string failureMessage
+      optional Network.RequestId requestId
 
   type StyleSheetLoadingIssueReason extends string
     enum
@@ -8566,7 +8567,8 @@ domain Page
       KeepaliveRequest
       IndexedDBEvent
       Dummy
-      AuthorizationHeader
+      JsNetworkRequestReceivedCacheControlNoStoreResource
+      WebSerial
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
```

## Roll protocol to r1155872 — _2023-06-10T04:26:19.000Z_
######  Diff: [`7ca37f8...2a2181a`](https://github.com/ChromeDevTools/devtools-protocol/compare/7ca37f8...2a2181a)

```diff
@@ browser_protocol.pdl:8567 @@ domain Page
       IndexedDBEvent
       Dummy
       AuthorizationHeader
-      WebSerial
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
```

## Roll protocol to r1155343 — _2023-06-09T04:26:30.000Z_
######  Diff: [`0c65644...7ca37f8`](https://github.com/ChromeDevTools/devtools-protocol/compare/0c65644...7ca37f8)

```diff
@@ browser_protocol.pdl:820 @@ experimental domain Audits
       SilentMediationFailure
       ThirdPartyCookiesBlocked
 
+  type FederatedAuthUserInfoRequestIssueDetails extends object
+    properties
+      FederatedAuthUserInfoRequestIssueReason federatedAuthUserInfoRequestIssueReason
+
+  # Represents the failure reason when a getUserInfo() call fails.
+  # Should be updated alongside FederatedAuthUserInfoRequestResult in
+  # third_party/blink/public/mojom/devtools/inspector_issue.mojom.
+  type FederatedAuthUserInfoRequestIssueReason extends string
+    enum
+      NotSameOrigin
+      NotIframe
+      NotPotentiallyTrustworthy
+      NoApiPermission
+      NotSignedInWithIdp
+      NoAccountSharingPermission
+      InvalidConfigOrWellKnown
+      InvalidAccountsResponse
+      NoReturningUserFromFetchedAccounts
+
   # This issue tracks client hints related issues. It's used to deprecate old
   # features, encourage the use of new ones, and provide general guidance.
   type ClientHintIssueDetails extends object
@@ -871,6 +890,7 @@ experimental domain Audits
       FederatedAuthRequestIssue
       BounceTrackingIssue
       StylesheetLoadingIssue
+      FederatedAuthUserInfoRequestIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -894,6 +914,7 @@ experimental domain Audits
       optional FederatedAuthRequestIssueDetails federatedAuthRequestIssueDetails
       optional BounceTrackingIssueDetails bounceTrackingIssueDetails
       optional StylesheetLoadingIssueDetails stylesheetLoadingIssueDetails
+      optional FederatedAuthUserInfoRequestIssueDetails federatedAuthUserInfoRequestIssueDetails
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
@@ -6493,6 +6514,7 @@ domain Network
       enum status
         Ok
         InvalidArgument
+        MissingIssuerKeys
         FailedPrecondition
         ResourceExhausted
         AlreadyExists
@@ -7279,11 +7301,9 @@ domain Page
       ch-ua-platform
       ch-ua-model
       ch-ua-mobile
-      ch-ua-full
       ch-ua-full-version
       ch-ua-full-version-list
       ch-ua-platform-version
-      ch-ua-reduced
       ch-ua-wow64
       ch-viewport-height
       ch-viewport-width
@@ -11087,6 +11107,7 @@ experimental domain Preload
       MemoryPressureOnTrigger
       MemoryPressureAfterTriggered
       PrerenderingDisabledByDevTools
+      ResourceLoadBlockedByClient
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
```

## Roll protocol to r1154250 — _2023-06-07T04:26:56.000Z_
######  Diff: [`d9d9e42...0c65644`](https://github.com/ChromeDevTools/devtools-protocol/compare/d9d9e42...0c65644)

```diff
@@ browser_protocol.pdl:827 @@ experimental domain Audits
       SourceCodeLocation sourceCodeLocation
       ClientHintIssueReason clientHintIssueReason
 
+  type FailedRequestInfo extends object
+    properties
+      # The URL that failed to load.
+      string url
+      # The failure message for the failed request.
+      string failureMessage
+
+  type StyleSheetLoadingIssueReason extends string
+    enum
+      LateImportRule
+      RequestFailed
+
+  # This issue warns when a referenced stylesheet couldn't be loaded.
+  type StylesheetLoadingIssueDetails extends object
+    properties
+      # Source code position that referenced the failing stylesheet.
+      SourceCodeLocation sourceCodeLocation
+      # Reason why the stylesheet couldn't be loaded.
+      StyleSheetLoadingIssueReason styleSheetLoadingIssueReason
+      # Contains additional info when the failure was due to a request.
+      optional FailedRequestInfo failedRequestInfo
+
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -848,6 +870,7 @@ experimental domain Audits
       ClientHintIssue
       FederatedAuthRequestIssue
       BounceTrackingIssue
+      StylesheetLoadingIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -870,6 +893,7 @@ experimental domain Audits
       optional ClientHintIssueDetails clientHintIssueDetails
       optional FederatedAuthRequestIssueDetails federatedAuthRequestIssueDetails
       optional BounceTrackingIssueDetails bounceTrackingIssueDetails
+      optional StylesheetLoadingIssueDetails stylesheetLoadingIssueDetails
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
```

## Roll protocol to r1152884 — _2023-06-03T04:26:19.000Z_
######  Diff: [`7eaf459...d9d9e42`](https://github.com/ChromeDevTools/devtools-protocol/compare/7eaf459...d9d9e42)

```diff
@@ browser_protocol.pdl:6560 @@ domain Network
       optional string reportingEndpoint
       optional string reportOnlyReportingEndpoint
 
+  experimental type ContentSecurityPolicySource extends string
+    enum
+      HTTP
+      Meta
+
+  experimental type ContentSecurityPolicyStatus extends object
+    properties
+      string effectiveDirectives
+      boolean isEnforced
+      ContentSecurityPolicySource source
+
   experimental type SecurityIsolationStatus extends object
     properties
       optional CrossOriginOpenerPolicyStatus coop
       optional CrossOriginEmbedderPolicyStatus coep
+      optional array of ContentSecurityPolicyStatus csp
 
   # Returns information about the COEP/COOP isolation status.
   experimental command getSecurityIsolationStatus
@@ -8511,6 +8523,7 @@ domain Page
       IndexedDBEvent
       Dummy
       AuthorizationHeader
+      WebSerial
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
```

## Roll protocol to r1152352 — _2023-06-02T04:26:31.000Z_
######  Diff: [`11fd654...7eaf459`](https://github.com/ChromeDevTools/devtools-protocol/compare/11fd654...7eaf459)

```diff
@@ browser_protocol.pdl:3984 @@ experimental domain HeadlessExperimental
         jpeg
         png
         webp
-      # Compression quality from range [0..100] (jpeg only).
+      # Compression quality from range [0..100] (jpeg and webp only).
       optional integer quality
       # Optimize image encoding for speed, not for resulting size (defaults to false)
       optional boolean optimizeForSpeed
```

## Roll protocol to r1151065 — _2023-05-31T04:26:30.000Z_
######  Diff: [`44ad3c8...11fd654`](https://github.com/ChromeDevTools/devtools-protocol/compare/44ad3c8...11fd654)

```diff
@@ browser_protocol.pdl:818 @@ experimental domain Audits
       Canceled
       RpPageNotVisible
       SilentMediationFailure
+      ThirdPartyCookiesBlocked
 
   # This issue tracks client hints related issues. It's used to deprecate old
   # features, encourage the use of new ones, and provide general guidance.
@@ -8462,6 +8463,7 @@ domain Page
       ActivationNavigationsDisallowedForBug1234857
       ErrorDocument
       FencedFramesEmbedder
+      CookieDisabled
       #Blocklisted features
       WebSocket
       WebTransport
```

## Roll protocol to r1149535 — _2023-05-26T04:26:25.000Z_
######  Diff: [`4f898ab...44ad3c8`](https://github.com/ChromeDevTools/devtools-protocol/compare/4f898ab...44ad3c8)

```diff
@@ browser_protocol.pdl:8631 @@ domain Page
       # Base64-encoded data
       binary data
 
+  # Enable/disable prerendering manually.
+  #
+  # This command is a short-term solution for https://crbug.com/1440085.
+  # See https://docs.google.com/document/d/12HVmFxYj5Jc-eJr5OmWsa2bqTJsbgGLKI6ZIyx0_wpA
+  # for more details.
+  #
+  # TODO(https://crbug.com/1440085): Remove this once Puppeteer supports tab targets.
+  experimental command setPrerenderingAllowed
+    parameters
+      boolean isAllowed
+
 domain Performance
 
   # Run-time execution metric.
@@ -11036,6 +11047,7 @@ experimental domain Preload
       SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation
       MemoryPressureOnTrigger
       MemoryPressureAfterTriggered
+      PrerenderingDisabledByDevTools
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index 0dbdc01..7a3c772 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -1443,7 +1443,7 @@ domain Runtime
       # resulting `objectId` is still provided.
       deprecated optional boolean generateWebDriverValue
       # Specifies the result serialization. If provided, overrides
-      # `returnByValue` and `generateWebDriverValue`.
+      # `generatePreview`, `returnByValue` and `generateWebDriverValue`.
       experimental optional SerializationOptions serializationOptions
 
     returns
@@ -1538,7 +1538,7 @@ domain Runtime
       # resulting `objectId` is still provided.
       deprecated optional boolean generateWebDriverValue
       # Specifies the result serialization. If provided, overrides
-      # `returnByValue` and `generateWebDriverValue`.
+      # `generatePreview`, `returnByValue` and `generateWebDriverValue`.
       experimental optional SerializationOptions serializationOptions
     returns
       # Evaluation result.
```

## Roll protocol to r1148337 — _2023-05-24T04:27:07.000Z_
######  Diff: [`fb80158...4f898ab`](https://github.com/ChromeDevTools/devtools-protocol/compare/fb80158...4f898ab)

```diff
@@ browser_protocol.pdl:5121 @@ domain Network
       experimental number pushStart
       # Time the server finished pushing request.
       experimental number pushEnd
+      # Started receiving response headers.
+      experimental number receiveHeadersStart
       # Finished receiving response headers.
       number receiveHeadersEnd
```

## Roll protocol to r1147663 — _2023-05-23T04:26:36.000Z_
######  Diff: [`60a039d...fb80158`](https://github.com/ChromeDevTools/devtools-protocol/compare/60a039d...fb80158)

```diff
@@ browser_protocol.pdl:1382 @@ experimental domain CSS
       string text
       # Value range in the underlying resource (if available).
       optional SourceRange range
+      # Specificity of the selector.
+      experimental optional Specificity specificity
+
+  # Specificity:
+  # https://drafts.csswg.org/selectors/#specificity-rules
+  experimental type Specificity extends object
+    properties
+      # The a component, which represents the number of ID selectors.
+      integer a
+      # The b component, which represents the number of class selectors, attributes selectors, and
+      # pseudo-classes.
+      integer b
+      # The c component, which represents the number of type selectors and pseudo-elements.
+      integer c
 
   # Selector list data.
   type SelectorList extends object
```

## Roll protocol to r1146845 — _2023-05-20T04:26:10.000Z_
######  Diff: [`8445d84...60a039d`](https://github.com/ChromeDevTools/devtools-protocol/compare/8445d84...60a039d)

```diff
@@ browser_protocol.pdl:2047 @@ experimental domain CSS
       StyleSheetId styleSheetId
 
 experimental domain CacheStorage
+  depends on Storage
 
   # Unique identifier of the Cache object.
   type CacheId extends string
@@ -2090,6 +2091,8 @@ experimental domain CacheStorage
       string securityOrigin
       # Storage key of the cache.
       string storageKey
+      # Storage bucket of the cache.
+      optional Storage.StorageBucket storageBucket
       # The name of the cache.
       string cacheName
 
@@ -2121,11 +2124,13 @@ experimental domain CacheStorage
   # Requests cache names.
   command requestCacheNames
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
+      # At least and at most one of securityOrigin, storageKey, storageBucket must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
+      # Storage bucket. If not specified, it uses the default bucket.
+      optional Storage.StorageBucket storageBucket
     returns
       # Caches for the security origin.
       array of Cache caches
@@ -9432,6 +9437,8 @@ experimental domain Storage
       string origin
       # Storage key to update.
       string storageKey
+      # Storage bucket to update.
+      string bucketId
       # Name of cache in origin.
       string cacheName
 
@@ -9442,6 +9449,8 @@ experimental domain Storage
       string origin
       # Storage key to update.
       string storageKey
+      # Storage bucket to update.
+      string bucketId
 
   # The origin's IndexedDB object store has been modified.
   event indexedDBContentUpdated
@@ -11024,19 +11033,12 @@ experimental domain Preload
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
   # Fired when a preload enabled state is updated.
   event preloadEnabledStateUpdated
     parameters
-      PreloadEnabledState state
+      boolean disabledByPreference
+      boolean disabledByDataSaver
+      boolean disabledByBatterySaver
 
   # Preloading status values, see also PreloadingTriggeringOutcome. This
   # status is shared by prefetchStatusUpdated and prerenderStatusUpdated.
```

## Roll protocol to r1146363 — _2023-05-19T04:26:26.000Z_
######  Diff: [`d1a5b89...8445d84`](https://github.com/ChromeDevTools/devtools-protocol/compare/d1a5b89...8445d84)

```diff
@@ browser_protocol.pdl:817 @@ experimental domain Audits
       ErrorIdToken
       Canceled
       RpPageNotVisible
+      SilentMediationFailure
 
   # This issue tracks client hints related issues. It's used to deprecate old
   # features, encourage the use of new ones, and provide general guidance.
@@ -1314,6 +1315,12 @@ domain Browser
     parameters
       BrowserCommandId commandId
 
+  # Allows a site to use privacy sandbox features that require enrollment
+  # without the site actually being enrolled. Only supported on page targets.
+  command addPrivacySandboxEnrollmentOverride
+    parameters
+      string url
+
 # This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles)
 # have an associated `id` used in subsequent operations on the related object. Each object type has
 # a specific `id` structure, and those are not interchangeable between objects of different kinds.
@@ -11055,6 +11062,7 @@ experimental domain Preload
       PrefetchFailedNetError
       PrefetchFailedNon2XX
       PrefetchFailedPerPageLimitExceeded
+      PrefetchEvicted
       PrefetchHeldback
       # A previous prefetch to the origin got a HTTP 503 response with an
       # Retry-After header that has no elapsed yet.
```

## Roll protocol to r1145810 — _2023-05-18T04:26:32.000Z_
######  Diff: [`467c277...d1a5b89`](https://github.com/ChromeDevTools/devtools-protocol/compare/467c277...d1a5b89)

```diff
@@ browser_protocol.pdl:11070 @@ experimental domain Preload
       PrefetchNotEligibleSchemeIsNotHttps
       PrefetchNotEligibleUserHasCookies
       PrefetchNotEligibleUserHasServiceWorker
+      PrefetchNotEligibleBatterySaverEnabled
+      PrefetchNotEligiblePreloadingDisabled
       PrefetchNotFinishedInTime
       PrefetchNotStarted
       PrefetchNotUsedCookiesChanged
@@ -11095,9 +11097,6 @@ experimental domain Preload
   event prerenderStatusUpdated
     parameters
       PreloadingAttemptKey key
-      # The frame id of the frame initiating prerender.
-      Page.FrameId initiatingFrameId
-      string prerenderingUrl
       PreloadingStatus status
       optional PrerenderFinalStatus prerenderStatus
 
@@ -11169,4 +11168,3 @@ experimental domain FedCm
   # Resets the cooldown time, if any, to allow the next FedCM call to show
   # a dialog even if one was recently dismissed by the user.
   command resetCooldown
-
```

## Roll protocol to r1145140 — _2023-05-17T04:26:30.000Z_
######  Diff: [`81e97fb...467c277`](https://github.com/ChromeDevTools/devtools-protocol/compare/81e97fb...467c277)

```diff
@@ browser_protocol.pdl:11004 @@ experimental domain Preload
       SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation
       MemoryPressureOnTrigger
       MemoryPressureAfterTriggered
-      SpeculationRuleRemoved
-      TriggerPageNavigated
-      OtherPrerenderedPageActivated
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
@@ -11102,6 +11099,7 @@ experimental domain Preload
       Page.FrameId initiatingFrameId
       string prerenderingUrl
       PreloadingStatus status
+      optional PrerenderFinalStatus prerenderStatus
 
   # Send a list of sources for all preloading attempts in a document.
   event preloadingAttemptSourcesUpdated
```

## Roll protocol to r1144541 — _2023-05-16T04:27:03.000Z_
######  Diff: [`3c6f201...81e97fb`](https://github.com/ChromeDevTools/devtools-protocol/compare/3c6f201...81e97fb)

```diff
@@ browser_protocol.pdl:919 @@ experimental domain Audits
       # Whether to report WCAG AAA level issues. Default is false.
       optional boolean reportAAA
 
+  # Runs the form issues check for the target page. Found issues are reported
+  # using Audits.issueAdded event.
+  command checkFormsIssues
+    returns
+      array of GenericIssueDetails formIssues
+
   event issueAdded
     parameters
       InspectorIssue issue
@@ -944,6 +950,8 @@ experimental domain Autofill
     parameters
       # Identifies a field that serves as an anchor for autofill.
       DOM.BackendNodeId fieldId
+      # Identifies the frame that field belongs to.
+      optional Page.FrameId frameId
       # Credit card information to fill out the form. Credit card data is not saved.
       CreditCard card
```

## Roll protocol to r1143632 — _2023-05-13T04:26:23.000Z_
######  Diff: [`53a0f38...3c6f201`](https://github.com/ChromeDevTools/devtools-protocol/compare/53a0f38...3c6f201)

```diff
@@ browser_protocol.pdl:10996 @@ experimental domain Preload
       SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation
       MemoryPressureOnTrigger
       MemoryPressureAfterTriggered
+      SpeculationRuleRemoved
+      TriggerPageNavigated
+      OtherPrerenderedPageActivated
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
@@ -11035,6 +11038,44 @@ experimental domain Preload
       # PreloadingTriggeringOutcome which not used by prefetch nor prerender.
       NotSupported
 
+  # TODO(https://crbug.com/1384419): revisit the list of PrefetchStatus and
+  # filter out the ones that aren't necessary to the developers.
+  type PrefetchStatus extends string
+    enum
+      # Prefetch is not disabled by PrefetchHeldback.
+      PrefetchAllowed
+      PrefetchFailedIneligibleRedirect
+      PrefetchFailedInvalidRedirect
+      PrefetchFailedMIMENotSupported
+      PrefetchFailedNetError
+      PrefetchFailedNon2XX
+      PrefetchFailedPerPageLimitExceeded
+      PrefetchHeldback
+      # A previous prefetch to the origin got a HTTP 503 response with an
+      # Retry-After header that has no elapsed yet.
+      PrefetchIneligibleRetryAfter
+      PrefetchIsPrivacyDecoy
+      PrefetchIsStale
+      PrefetchNotEligibleBrowserContextOffTheRecord
+      PrefetchNotEligibleDataSaverEnabled
+      PrefetchNotEligibleExistingProxy
+      PrefetchNotEligibleHostIsNonUnique
+      PrefetchNotEligibleNonDefaultStoragePartition
+      PrefetchNotEligibleSameSiteCrossOriginPrefetchRequiredProxy
+      PrefetchNotEligibleSchemeIsNotHttps
+      PrefetchNotEligibleUserHasCookies
+      PrefetchNotEligibleUserHasServiceWorker
+      PrefetchNotFinishedInTime
+      PrefetchNotStarted
+      PrefetchNotUsedCookiesChanged
+      PrefetchProxyNotAvailable
+      # The response of the prefetch is used for the next navigation. This is
+      # the final successful state.
+      PrefetchResponseUsed
+      # The prefetch finished successfully but was never used.
+      PrefetchSuccessfulButNotUsed
+      PrefetchNotUsedProbeFailed
+
   # Fired when a prefetch attempt is updated.
   event prefetchStatusUpdated
     parameters
@@ -11043,6 +11084,7 @@ experimental domain Preload
       Page.FrameId initiatingFrameId
       string prefetchUrl
       PreloadingStatus status
+      PrefetchStatus prefetchStatus
 
   # Fired when a prerender attempt is updated.
   event prerenderStatusUpdated
```

## Roll protocol to r1141857 — _2023-05-10T04:26:34.000Z_
######  Diff: [`1e3d3e0...53a0f38`](https://github.com/ChromeDevTools/devtools-protocol/compare/1e3d3e0...53a0f38)

```diff
@@ browser_protocol.pdl:11068 @@ experimental domain FedCm
       SignIn
       SignUp
 
+  # Whether the dialog shown is an account chooser or an auto re-authentication dialog.
+  type DialogType extends string
+    enum
+      AccountChooser
+      AutoReauthn
+
   # Corresponds to IdentityRequestAccount
   type Account extends object
     properties
@@ -11086,6 +11092,7 @@ experimental domain FedCm
   event dialogShown
     parameters
       string dialogId
+      DialogType dialogType
       array of Account accounts
       # These exist primarily so that the caller can verify the
       # RP context was used appropriately.
```

## Roll protocol to r1140464 — _2023-05-06T04:26:18.000Z_
######  Diff: [`8469893...1e3d3e0`](https://github.com/ChromeDevTools/devtools-protocol/compare/8469893...1e3d3e0)

```diff
@@ js_protocol.pdl:1014 @@ domain Runtime
   # Unique script identifier.
   type ScriptId extends string
 
-  # Represents the value serialiazed by the WebDriver BiDi specification
-  # https://goo.gle/browser-automation-deepserialization.
+  # Represents options for serialization. Overrides `generatePreview`, `returnByValue` and
+  # `generateWebDriverValue`.
+  type SerializationOptions extends object
+    properties
+      enum serialization
+        # Whether the result should be deep-serialized. The result is put into
+        # `deepSerializedValue` and `ObjectId` is provided.
+        deep
+        # Whether the result is expected to be a JSON object which should be sent by value.
+        # The result is put either into `value` or into `unserializableValue`. Synonym of
+        # `returnByValue: true`. Overrides `returnByValue`.
+        json
+        # Only remote object id is put in the result. Same bahaviour as if no
+        # `serializationOptions`, `generatePreview`, `returnByValue` nor `generateWebDriverValue`
+        # are provided.
+        idOnly
+
+      # Deep serialization depth. Default is full depth. Respected only in `deep` serialization mode.
+      optional integer maxDepth
+
+  # Represents deep serialized value.
   type DeepSerializedValue extends object
     properties
       enum type
@@ -1101,8 +1120,10 @@ domain Runtime
       optional UnserializableValue unserializableValue
       # String representation of the object.
       optional string description
-      # WebDriver BiDi representation of the value.
-      experimental optional DeepSerializedValue webDriverValue
+      # Deprecated. Use `deepSerializedValue` instead. WebDriver BiDi representation of the value.
+      deprecated optional DeepSerializedValue webDriverValue
+      # Deep serialized value.
+      experimental optional DeepSerializedValue deepSerializedValue
       # Unique object identifier (for non-primitive values).
       optional RemoteObjectId objectId
       # Preview containing abbreviated property values. Specified for `object` type values only.
@@ -1392,6 +1413,7 @@ domain Runtime
       # execution. Overrides `setPauseOnException` state.
       optional boolean silent
       # Whether the result is expected to be a JSON object which should be sent by value.
+      # Can be overriden by `serializationOptions`.
       optional boolean returnByValue
       # Whether preview should be generated for the result.
       experimental optional boolean generatePreview
@@ -1415,10 +1437,15 @@ domain Runtime
       # boundaries).
       # This is mutually exclusive with `executionContextId`.
       experimental optional string uniqueContextId
+      # Deprecated. Use `serializationOptions: {serialization:"deep"}` instead.
       # Whether the result should contain `webDriverValue`, serialized according to
-      # https://goo.gle/browser-automation-deepserialization. This is mutually
-      # exclusive with `returnByValue`, but resulting `objectId` is still provided.
-      experimental optional boolean generateWebDriverValue
+      # https://w3c.github.io/webdriver-bidi. This is mutually exclusive with `returnByValue`, but
+      # resulting `objectId` is still provided.
+      deprecated optional boolean generateWebDriverValue
+      # Specifies the result serialization. If provided, overrides
+      # `returnByValue` and `generateWebDriverValue`.
+      experimental optional SerializationOptions serializationOptions
+
     returns
       # Call result.
       RemoteObject result
@@ -1504,8 +1531,15 @@ domain Runtime
       # boundaries).
       # This is mutually exclusive with `contextId`.
       experimental optional string uniqueContextId
-      # Whether the result should be serialized according to https://goo.gle/browser-automation-deepserialization.
-      experimental optional boolean generateWebDriverValue
+      # Deprecated. Use `serializationOptions: {serialization:"deep"}` instead.
+      # Whether the result should contain `webDriverValue`, serialized
+      # according to
+      # https://w3c.github.io/webdriver-bidi. This is mutually exclusive with `returnByValue`, but
+      # resulting `objectId` is still provided.
+      deprecated optional boolean generateWebDriverValue
+      # Specifies the result serialization. If provided, overrides
+      # `returnByValue` and `generateWebDriverValue`.
+      experimental optional SerializationOptions serializationOptions
     returns
       # Evaluation result.
       RemoteObject result
```

## Roll protocol to r1139932 — _2023-05-05T04:26:32.000Z_
######  Diff: [`3a37ac7...8469893`](https://github.com/ChromeDevTools/devtools-protocol/compare/3a37ac7...8469893)

```diff
@@ browser_protocol.pdl:658 @@ experimental domain Audits
       boolean isWarning
       SharedArrayBufferIssueType type
 
-  type TwaQualityEnforcementViolationType extends string
-    enum
-      kHttpError
-      kUnavailableOffline
-      kDigitalAssetLinks
-
-  type TrustedWebActivityIssueDetails extends object
-    properties
-      # The url that triggers the violation.
-      string url
-      TwaQualityEnforcementViolationType violationType
-      optional integer httpStatusCode
-      # The package name of the Trusted Web Activity client app. This field is
-      # only used when violation type is kDigitalAssetLinks.
-      optional string packageName
-      # The signature of the Trusted Web Activity client app. This field is only
-      # used when violation type is kDigitalAssetLinks.
-      optional string signature
-
   type LowTextContrastIssueDetails extends object
     properties
       DOM.BackendNodeId violatingNodeId
@@ -855,7 +836,6 @@ experimental domain Audits
       HeavyAdIssue
       ContentSecurityPolicyIssue
       SharedArrayBufferIssue
-      TrustedWebActivityIssue
       LowTextContrastIssue
       CorsIssue
       AttributionReportingIssue
@@ -878,7 +858,6 @@ experimental domain Audits
       optional HeavyAdIssueDetails heavyAdIssueDetails
       optional ContentSecurityPolicyIssueDetails contentSecurityPolicyIssueDetails
       optional SharedArrayBufferIssueDetails sharedArrayBufferIssueDetails
-      optional TrustedWebActivityIssueDetails twaQualityEnforcementDetails
       optional LowTextContrastIssueDetails lowTextContrastIssueDetails
       optional CorsIssueDetails corsIssueDetails
       optional AttributionReportingIssueDetails attributionReportingIssueDetails
```

## Roll protocol to r1139346 — _2023-05-04T04:26:49.000Z_
######  Diff: [`5b4da4d...3a37ac7`](https://github.com/ChromeDevTools/devtools-protocol/compare/5b4da4d...3a37ac7)

```diff
@@ browser_protocol.pdl:944 @@ experimental domain Audits
     parameters
       InspectorIssue issue
 
+# Defines commands and events for Autofill.
+experimental domain Autofill
+  type CreditCard extends object
+    properties
+      # 16-digit credit card number.
+      string number
+      # Name of the credit card owner.
+      string name
+      # 2-digit expiry month.
+      string expiryMonth
+      # 4-digit expiry year.
+      string expiryYear
+      # 3-digit card verification code.
+      string cvc
+
+  # Trigger autofill on a form identified by the fieldId.
+  # If the field and related form cannot be autofilled, returns an error.
+  command trigger
+    parameters
+      # Identifies a field that serves as an anchor for autofill.
+      DOM.BackendNodeId fieldId
+      # Credit card information to fill out the form. Credit card data is not saved.
+      CreditCard card
+
 # Defines events for background web platform features.
 experimental domain BackgroundService
   # The Background Service that will be associated with the commands/events.
```

## Roll protocol to r1138800 — _2023-05-03T04:26:34.000Z_
######  Diff: [`fd2e02b...5b4da4d`](https://github.com/ChromeDevTools/devtools-protocol/compare/fd2e02b...5b4da4d)

```diff
@@ js_protocol.pdl:1015 @@ domain Runtime
   type ScriptId extends string
 
   # Represents the value serialiazed by the WebDriver BiDi specification
-  # https://w3c.github.io/webdriver-bidi.
-  type WebDriverValue extends object
+  # https://goo.gle/browser-automation-deepserialization.
+  type DeepSerializedValue extends object
     properties
       enum type
         undefined
@@ -1102,7 +1102,7 @@ domain Runtime
       # String representation of the object.
       optional string description
       # WebDriver BiDi representation of the value.
-      experimental optional WebDriverValue webDriverValue
+      experimental optional DeepSerializedValue webDriverValue
       # Unique object identifier (for non-primitive values).
       optional RemoteObjectId objectId
       # Preview containing abbreviated property values. Specified for `object` type values only.
@@ -1416,8 +1416,8 @@ domain Runtime
       # This is mutually exclusive with `executionContextId`.
       experimental optional string uniqueContextId
       # Whether the result should contain `webDriverValue`, serialized according to
-      # https://w3c.github.io/webdriver-bidi. This is mutually exclusive with `returnByValue`, but
-      # resulting `objectId` is still provided.
+      # https://goo.gle/browser-automation-deepserialization. This is mutually
+      # exclusive with `returnByValue`, but resulting `objectId` is still provided.
       experimental optional boolean generateWebDriverValue
     returns
       # Call result.
@@ -1504,7 +1504,7 @@ domain Runtime
       # boundaries).
       # This is mutually exclusive with `contextId`.
       experimental optional string uniqueContextId
-      # Whether the result should be serialized according to https://w3c.github.io/webdriver-bidi.
+      # Whether the result should be serialized according to https://goo.gle/browser-automation-deepserialization.
       experimental optional boolean generateWebDriverValue
     returns
       # Evaluation result.
```

## Roll protocol to r1138159 — _2023-05-02T04:26:48.000Z_
######  Diff: [`fb39cd1...fd2e02b`](https://github.com/ChromeDevTools/devtools-protocol/compare/fb39cd1...fd2e02b)

```diff
@@ browser_protocol.pdl:707 @@ experimental domain Audits
       # TODO(apaseltiner): Rename this to InvalidRegisterSourceHeader
       InvalidHeader
       InvalidRegisterTriggerHeader
-      # TODO(apaseltiner): Remove this issue once DevTools stops referencing it.
-      InvalidEligibleHeader
       SourceAndTriggerHeaders
       SourceIgnored
       TriggerIgnored
```

## Roll protocol to r1137730 — _2023-05-01T04:26:59.000Z_
######  Diff: [`a74f8b5...fb39cd1`](https://github.com/ChromeDevTools/devtools-protocol/compare/a74f8b5...fb39cd1)

```diff
@@ js_protocol.pdl:1044 @@ domain Runtime
         window
       optional any value
       optional string objectId
+      # Set if value reference met more then once during serialization. In such
+      # case, value is provided only to one of the serialized values. Unique
+      # per value in the scope of one CDP call.
+      optional integer weakLocalObjectReference
 
   # Unique object identifier.
   type RemoteObjectId extends string
```

## Roll protocol to r1137505 — _2023-04-29T04:26:38.000Z_
######  Diff: [`7530c23...a74f8b5`](https://github.com/ChromeDevTools/devtools-protocol/compare/7530c23...a74f8b5)

```diff
@@ browser_protocol.pdl:4028 @@ domain IO
 
 experimental domain IndexedDB
   depends on Runtime
+  depends on Storage
 
   # Database with an array of object stores.
   type DatabaseWithObjectStores extends object
@@ -4120,11 +4121,13 @@ experimental domain IndexedDB
   # Clears all entries from an object store.
   command clearObjectStore
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
+      # At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
+      # Storage bucket. If not specified, it uses the default bucket.
+      optional Storage.StorageBucket storageBucket
       # Database name.
       string databaseName
       # Object store name.
@@ -4133,22 +4136,26 @@ experimental domain IndexedDB
   # Deletes a database.
   command deleteDatabase
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
+      # At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
+      # Storage bucket. If not specified, it uses the default bucket.
+      optional Storage.StorageBucket storageBucket
       # Database name.
       string databaseName
 
   # Delete a range of entries from an object store
   command deleteObjectStoreEntries
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
+      # At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
+      # Storage bucket. If not specified, it uses the default bucket.
+      optional Storage.StorageBucket storageBucket
       string databaseName
       string objectStoreName
       # Range of entry keys to delete
@@ -4163,11 +4170,13 @@ experimental domain IndexedDB
   # Requests data from object store or index.
   command requestData
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
+      # At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
+      # Storage bucket. If not specified, it uses the default bucket.
+      optional Storage.StorageBucket storageBucket
       # Database name.
       string databaseName
       # Object store name.
@@ -4189,11 +4198,13 @@ experimental domain IndexedDB
   # Gets metadata of an object store.
   command getMetadata
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
+      # At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
+      # Storage bucket. If not specified, it uses the default bucket.
+      optional Storage.StorageBucket storageBucket
       # Database name.
       string databaseName
       # Object store name.
@@ -4209,11 +4220,13 @@ experimental domain IndexedDB
   # Requests database with given name in given frame.
   command requestDatabase
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
+      # At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
+      # Storage bucket. If not specified, it uses the default bucket.
+      optional Storage.StorageBucket storageBucket
       # Database name.
       string databaseName
     returns
@@ -4223,11 +4236,13 @@ experimental domain IndexedDB
   # Requests database names for given security origin.
   command requestDatabaseNames
     parameters
-      # At least and at most one of securityOrigin, storageKey must be specified.
+      # At least and at most one of securityOrigin, storageKey, or storageBucket must be specified.
       # Security origin.
       optional string securityOrigin
       # Storage key.
       optional string storageKey
+      # Storage bucket. If not specified, it uses the default bucket.
+      optional Storage.StorageBucket storageBucket
     returns
       # Database names for origin.
       array of string databaseNames
@@ -9166,12 +9181,16 @@ experimental domain Storage
       relaxed
       strict
 
-  type StorageBucketInfo extends object
+  type StorageBucket extends object
     properties
       SerializedStorageKey storageKey
+      # If not specified, it is the default bucket of the storageKey.
+      optional string name
+
+  type StorageBucketInfo extends object
+    properties
+      StorageBucket bucket
       string id
-      string name
-      boolean isDefault
       Network.TimeSinceEpoch expiration
       # Storage quota (bytes).
       number quota
@@ -9383,8 +9402,7 @@ experimental domain Storage
   # Deletes the Storage Bucket with the given storage key and bucket name.
   experimental command deleteStorageBucket
     parameters
-      string storageKey
-      string bucketName
+      StorageBucket bucket
 
   # Deletes state for sites identified as potential bounce trackers, immediately.
   experimental command runBounceTrackingMitigations
@@ -9416,6 +9434,8 @@ experimental domain Storage
       string origin
       # Storage key to update.
       string storageKey
+      # Storage bucket to update.
+      string bucketId
       # Database to update.
       string databaseName
       # ObjectStore to update.
@@ -9428,6 +9448,8 @@ experimental domain Storage
       string origin
       # Storage key to update.
       string storageKey
+      # Storage bucket to update.
+      string bucketId
 
   # One of the interest groups was accessed by the associated page.
   event interestGroupAccessed
@@ -9455,7 +9477,7 @@ experimental domain Storage
 
   event storageBucketCreatedOrUpdated
     parameters
-      StorageBucketInfo bucket
+      StorageBucketInfo bucketInfo
 
   event storageBucketDeleted
     parameters
@@ -10832,6 +10854,19 @@ experimental domain Preload
       # - https://wicg.github.io/nav-speculation/speculation-rules.html
       # - https://github.com/WICG/nav-speculation/blob/main/triggers.md
       string sourceText
+      # A speculation rule set is either added through an inline
+      # <script> tag or through an external resource via the
+      # 'Speculation-Rules' HTTP header. For the first case, we include
+      # the BackendNodeId of the relevant <script> tag. For the second
+      # case, we include the external URL where the rule set was loaded
+      # from, and also RequestId if Network domain is enabled.
+      #
+      # See also:
+      # - https://wicg.github.io/nav-speculation/speculation-rules.html#speculation-rules-script
+      # - https://wicg.github.io/nav-speculation/speculation-rules.html#speculation-rules-header
+      optional DOM.BackendNodeId backendNodeId
+      optional string url
+      optional Network.RequestId requestId
       # Error information
       # `errorMessage` is null iff `errorType` is null.
       optional RuleSetErrorType errorType
```

## Roll protocol to r1136950 — _2023-04-28T04:26:58.000Z_
######  Diff: [`7a08255...7530c23`](https://github.com/ChromeDevTools/devtools-protocol/compare/7a08255...7530c23)

```diff
@@ browser_protocol.pdl:707 @@ experimental domain Audits
       # TODO(apaseltiner): Rename this to InvalidRegisterSourceHeader
       InvalidHeader
       InvalidRegisterTriggerHeader
+      # TODO(apaseltiner): Remove this issue once DevTools stops referencing it.
       InvalidEligibleHeader
       SourceAndTriggerHeaders
       SourceIgnored
```

## Roll protocol to r1135726 — _2023-04-26T04:27:01.000Z_
######  Diff: [`72f4d4e...7a08255`](https://github.com/ChromeDevTools/devtools-protocol/compare/72f4d4e...7a08255)

```diff
@@ browser_protocol.pdl:4668 @@ experimental domain LayerTree
       LayerId layerId
     returns
       # A list of strings specifying reasons for the given layer to become composited.
-      deprecated array of string compositingReasons
+      array of string compositingReasons
       # A list of strings specifying reason IDs for the given layer to become composited.
       array of string compositingReasonIds
 
@@ -7228,6 +7228,7 @@ domain Page
       payment
       picture-in-picture
       private-aggregation
+      private-state-token-issuance
       private-state-token-redemption
       publickey-credentials-get
       run-ad-auction
@@ -9384,6 +9385,11 @@ experimental domain Storage
       string storageKey
       string bucketName
 
+  # Deletes state for sites identified as potential bounce trackers, immediately.
+  experimental command runBounceTrackingMitigations
+    returns
+      array of string deletedSites
+
   # A cache's contents have been modified.
   event cacheStorageContentUpdated
     parameters
```

## Roll protocol to r1135028 — _2023-04-25T04:27:09.000Z_
######  Diff: [`4e41c0d...72f4d4e`](https://github.com/ChromeDevTools/devtools-protocol/compare/4e41c0d...72f4d4e)

```diff
@@ browser_protocol.pdl:716 @@ experimental domain Audits
       InvalidRegisterOsSourceHeader
       InvalidRegisterOsTriggerHeader
       WebAndOsHeaders
+      NoWebOrOsSupport
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
@@ -7227,6 +7228,7 @@ domain Page
       payment
       picture-in-picture
       private-aggregation
+      private-state-token-redemption
       publickey-credentials-get
       run-ad-auction
       screen-wake-lock
@@ -7237,7 +7239,6 @@ domain Page
       smart-card
       storage-access
       sync-xhr
-      trust-token-redemption
       unload
       usb
       vertical-scroll
```

## Roll protocol to r1134390 — _2023-04-24T04:27:12.000Z_
######  Diff: [`4dd6c67...4e41c0d`](https://github.com/ChromeDevTools/devtools-protocol/compare/4dd6c67...4e41c0d)

```diff
@@ js_protocol.pdl:632 @@ domain Debugger
       Runtime.ExecutionContextId executionContextId
       # Content hash of the script, SHA-256.
       string hash
-      # Embedder-specific auxiliary data.
+      # Embedder-specific auxiliary data likely matching {isDefault: boolean, type: 'default'|'isolated'|'worker', frameId: string}
       optional object executionContextAuxData
       # URL of source map associated with script (if any).
       optional string sourceMapURL
@@ -671,7 +671,7 @@ domain Debugger
       Runtime.ExecutionContextId executionContextId
       # Content hash of the script, SHA-256.
       string hash
-      # Embedder-specific auxiliary data.
+      # Embedder-specific auxiliary data likely matching {isDefault: boolean, type: 'default'|'isolated'|'worker', frameId: string}
       optional object executionContextAuxData
       # True, if this script is generated as a result of the live edit operation.
       experimental optional boolean isLiveEdit
@@ -1284,7 +1284,7 @@ domain Runtime
       # multiple processes, so can be reliably used to identify specific context while backend
       # performs a cross-process navigation.
       experimental string uniqueId
-      # Embedder-specific auxiliary data.
+      # Embedder-specific auxiliary data likely matching {isDefault: boolean, type: 'default'|'isolated'|'worker', frameId: string}
       optional object auxData
 
   # Detailed information about exception (or error) that was thrown during script compilation or
```

## Roll protocol to r1134181 — _2023-04-22T04:26:52.000Z_
######  Diff: [`052cf2f...4dd6c67`](https://github.com/ChromeDevTools/devtools-protocol/compare/052cf2f...4dd6c67)

```diff
@@ browser_protocol.pdl:10950 @@ experimental domain Preload
       CrossSiteNavigationInMainFrameNavigation
       SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation
       SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation
+      MemoryPressureOnTrigger
+      MemoryPressureAfterTriggered
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
```

## Roll protocol to r1133601 — _2023-04-21T04:27:13.000Z_
######  Diff: [`84eeee8...052cf2f`](https://github.com/ChromeDevTools/devtools-protocol/compare/84eeee8...052cf2f)

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
@@ -10963,6 +10963,20 @@ experimental domain Preload
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
+  # Fired when a preload enabled state is updated.
+  event preloadEnabledStateUpdated
+    parameters
+      PreloadEnabledState state
+
   # Preloading status values, see also PreloadingTriggeringOutcome. This
   # status is shared by prefetchStatusUpdated and prerenderStatusUpdated.
   type PreloadingStatus extends string
```

## Roll protocol to r1132318 — _2023-04-19T04:27:21.000Z_
######  Diff: [`e60aecf...84eeee8`](https://github.com/ChromeDevTools/devtools-protocol/compare/e60aecf...84eeee8)

```diff
@@ browser_protocol.pdl:809 @@ experimental domain Audits
       WellKnownNoResponse
       WellKnownInvalidResponse
       WellKnownListEmpty
+      WellKnownInvalidContentType
       ConfigNotInWellKnown
       WellKnownTooBig
       ConfigHttpNotFound
       ConfigNoResponse
       ConfigInvalidResponse
+      ConfigInvalidContentType
       ClientMetadataHttpNotFound
       ClientMetadataNoResponse
       ClientMetadataInvalidResponse
+      ClientMetadataInvalidContentType
       DisabledInSettings
       ErrorFetchingSignin
       InvalidSigninResponse
@@ -824,10 +827,12 @@ experimental domain Audits
       AccountsNoResponse
       AccountsInvalidResponse
       AccountsListEmpty
+      AccountsInvalidContentType
       IdTokenHttpNotFound
       IdTokenNoResponse
       IdTokenInvalidResponse
       IdTokenInvalidRequest
+      IdTokenInvalidContentType
       ErrorIdToken
       Canceled
       RpPageNotVisible
```

## Roll protocol to r1131670 — _2023-04-18T04:26:48.000Z_
######  Diff: [`ad86c64...e60aecf`](https://github.com/ChromeDevTools/devtools-protocol/compare/ad86c64...e60aecf)

```diff
@@ browser_protocol.pdl:1412 @@ experimental domain CSS
       number endLine
       # Column offset of the end of the stylesheet within the resource (zero based).
       number endColumn
+      # If the style sheet was loaded from a network resource, this indicates when the resource failed to load
+      experimental optional boolean loadingFailed
 
   # CSS rule representation.
   type CSSRule extends object
```

## Roll protocol to r1130274 — _2023-04-14T04:26:53.000Z_
######  Diff: [`adde591...ad86c64`](https://github.com/ChromeDevTools/devtools-protocol/compare/adde591...ad86c64)

```diff
@@ browser_protocol.pdl:775 @@ experimental domain Audits
       # One of the deprecation names from third_party/blink/renderer/core/frame/deprecation/deprecation.json5
       string type
 
+  # This issue warns about sites in the redirect chain of a finished navigation
+  # that may be flagged as trackers and have their state cleared if they don't
+  # receive a user interaction. Note that in this context 'site' means eTLD+1. 
+  # For example, if the URL `https://example.test:80/bounce` was in the 
+  # redirect chain, the site reported would be `example.test`.
+  type BounceTrackingIssueDetails extends object
+    properties
+      array of string trackingSites
+
   type ClientHintIssueReason extends string
     enum
       # Items in the accept-ch meta tag allow list must be valid origins.
@@ -851,6 +860,7 @@ experimental domain Audits
       DeprecationIssue
       ClientHintIssue
       FederatedAuthRequestIssue
+      BounceTrackingIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -873,6 +883,7 @@ experimental domain Audits
       optional DeprecationIssueDetails deprecationIssueDetails
       optional ClientHintIssueDetails clientHintIssueDetails
       optional FederatedAuthRequestIssueDetails federatedAuthRequestIssueDetails
+      optional BounceTrackingIssueDetails bounceTrackingIssueDetails
 
   # A unique id for a DevTools inspector issue. Allows other entities (e.g.
   # exceptions, CDP message, console messages, etc.) to reference an issue.
```

## Roll protocol to r1129676 — _2023-04-13T04:27:09.000Z_
######  Diff: [`d7c1808...adde591`](https://github.com/ChromeDevTools/devtools-protocol/compare/d7c1808...adde591)

```diff
@@ browser_protocol.pdl:708 @@ experimental domain Audits
       InvalidHeader
       InvalidRegisterTriggerHeader
       InvalidEligibleHeader
-      # TODO(crbug.com/1431942): Remove this issue once DevTools stops
-      # referencing it
-      TooManyConcurrentRequests
       SourceAndTriggerHeaders
       SourceIgnored
       TriggerIgnored
```

## Roll protocol to r1129085 — _2023-04-12T04:26:50.000Z_
######  Diff: [`22ae458...d7c1808`](https://github.com/ChromeDevTools/devtools-protocol/compare/22ae458...d7c1808)

```diff
@@ browser_protocol.pdl:708 @@ experimental domain Audits
       InvalidHeader
       InvalidRegisterTriggerHeader
       InvalidEligibleHeader
+      # TODO(crbug.com/1431942): Remove this issue once DevTools stops
+      # referencing it
       TooManyConcurrentRequests
       SourceAndTriggerHeaders
       SourceIgnored
```

## Roll protocol to r1126404 — _2023-04-05T04:27:02.000Z_
######  Diff: [`4cb5368...22ae458`](https://github.com/ChromeDevTools/devtools-protocol/compare/4cb5368...22ae458)

```diff
@@ browser_protocol.pdl:1679 @@ experimental domain CSS
       # Parent stylesheet's origin.
       StyleSheetOrigin origin
       # Associated style declaration.
-      optional CSSStyle style
+      CSSStyle style
 
   # CSS position-fallback rule representation.
   type CSSPositionFallbackRule extends object
```

## Roll protocol to r1124027 — _2023-03-30T04:27:29.000Z_
######  Diff: [`bab8b36...4cb5368`](https://github.com/ChromeDevTools/devtools-protocol/compare/bab8b36...4cb5368)

```diff
@@ browser_protocol.pdl:765 @@ experimental domain Audits
       GenericIssueErrorType errorType
       optional Page.FrameId frameId
       optional DOM.BackendNodeId violatingNodeId
+      optional string violatingNodeAttribute
 
   # This issue tracks information needed to print a deprecation message.
   # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/third_party/blink/renderer/core/frame/deprecation/README.md
```

## Roll protocol to r1122837 — _2023-03-28T04:27:31.000Z_
######  Diff: [`0b187a3...bab8b36`](https://github.com/ChromeDevTools/devtools-protocol/compare/0b187a3...bab8b36)

```diff
@@ browser_protocol.pdl:1669 @@ experimental domain CSS
       # Available variation settings (a.k.a. "axes").
       optional array of FontVariationAxis fontVariationAxes
 
+  # CSS try rule representation.
+  type CSSTryRule extends object
+    properties
+      # The css style sheet identifier (absent for user agent stylesheet and user-specified
+      # stylesheet rules) this rule came from.
+      optional StyleSheetId styleSheetId
+      # Parent stylesheet's origin.
+      StyleSheetOrigin origin
+      # Associated style declaration.
+      optional CSSStyle style
+
+  # CSS position-fallback rule representation.
+  type CSSPositionFallbackRule extends object
+    properties
+      Value name
+      # List of keyframes.
+      array of CSSTryRule tryRules
+
   # CSS keyframes rule representation.
   type CSSKeyframesRule extends object
     properties
@@ -1802,6 +1820,8 @@ experimental domain CSS
       optional array of InheritedPseudoElementMatches inheritedPseudoElements
       # A list of CSS keyframed animations matching this node.
       optional array of CSSKeyframesRule cssKeyframesRules
+      # A list of CSS position fallbacks matching this node.
+      optional array of CSSPositionFallbackRule cssPositionFallbackRules
       # Id of the first parent element that does not have display: contents.
       experimental optional DOM.NodeId parentLayoutNodeId
```

## Roll protocol to r1122063 — _2023-03-25T04:27:16.000Z_
######  Diff: [`4295d0a...0b187a3`](https://github.com/ChromeDevTools/devtools-protocol/compare/4295d0a...0b187a3)

```diff
@@ js_protocol.pdl:580 @@ domain Debugger
         other
         promiseRejection
         XHR
+        step
       # Object containing break-specific auxiliary properties.
       optional object data
       # Hit breakpoints IDs
```

## Roll protocol to r1121538 — _2023-03-24T04:27:33.000Z_
######  Diff: [`6a030f2...4295d0a`](https://github.com/ChromeDevTools/devtools-protocol/compare/6a030f2...4295d0a)

```diff
@@ browser_protocol.pdl:8984 @@ experimental domain Storage
       cache_storage
       interest_groups
       shared_storage
+      storage_buckets
       all
       other
 
@@ -9119,6 +9120,23 @@ experimental domain Storage
       # SharedStorageAccessType.workletSet.
       optional boolean ignoreIfPresent
 
+  type StorageBucketsDurability extends string
+    enum
+      relaxed
+      strict
+
+  type StorageBucketInfo extends object
+    properties
+      SerializedStorageKey storageKey
+      string id
+      string name
+      boolean isDefault
+      Network.TimeSinceEpoch expiration
+      # Storage quota (bytes).
+      number quota
+      boolean persistent
+      StorageBucketsDurability durability
+
   # Returns a storage key given a frame id.
   command getStorageKeyForFrame
     parameters
@@ -9315,6 +9333,18 @@ experimental domain Storage
     parameters
       boolean enable
 
+  # Set tracking for a storage key's buckets.
+  experimental command setStorageBucketTracking
+    parameters
+      string storageKey
+      boolean enable
+
+  # Deletes the Storage Bucket with the given storage key and bucket name.
+  experimental command deleteStorageBucket
+    parameters
+      string storageKey
+      string bucketName
+
   # A cache's contents have been modified.
   event cacheStorageContentUpdated
     parameters
@@ -9377,6 +9407,14 @@ experimental domain Storage
       # presence/absence depends on `type`.
       SharedStorageAccessParams params
 
+  event storageBucketCreatedOrUpdated
+    parameters
+      StorageBucketInfo bucket
+
+  event storageBucketDeleted
+    parameters
+      string bucketId
+
 # The SystemInfo domain defines methods and events for querying low-level system information.
 experimental domain SystemInfo
 
@@ -10748,6 +10786,16 @@ experimental domain Preload
       # - https://wicg.github.io/nav-speculation/speculation-rules.html
       # - https://github.com/WICG/nav-speculation/blob/main/triggers.md
       string sourceText
+      # Error information
+      # `errorMessage` is null iff `errorType` is null.
+      optional RuleSetErrorType errorType
+      # TODO(https://crbug.com/1425354): Replace this property with structured error.
+      deprecated optional string errorMessage
+
+  type RuleSetErrorType extends string
+    enum
+      SourceIsNotJsonObject
+      InvalidRulesSkipped
 
   # The type of preloading attempted. It corresponds to
   # mojom::SpeculationAction (although PrefetchWithSubresources is omitted as it
@@ -10941,6 +10989,10 @@ experimental domain FedCm
     parameters
       string dialogId
       array of Account accounts
+      # These exist primarily so that the caller can verify the
+      # RP context was used appropriately.
+      string title
+      optional string subtitle
 
   command enable
     parameters
@@ -10959,3 +11011,9 @@ experimental domain FedCm
   command dismissDialog
     parameters
       string dialogId
+      optional boolean triggerCooldown
+
+  # Resets the cooldown time, if any, to allow the next FedCM call to show
+  # a dialog even if one was recently dismissed by the user.
+  command resetCooldown
+
```

## Roll protocol to r1120988 — _2023-03-23T04:27:35.000Z_
######  Diff: [`7bd9b6c...6a030f2`](https://github.com/ChromeDevTools/devtools-protocol/compare/7bd9b6c...6a030f2)

```diff
@@ browser_protocol.pdl:10868 @@ experimental domain Preload
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
     parameters
+      PreloadingAttemptKey key
       # The frame id of the frame initiating prerendering.
       Page.FrameId initiatingFrameId
       string prerenderingUrl
@@ -10891,6 +10892,7 @@ experimental domain Preload
   # Fired when a prefetch attempt is updated.
   event prefetchStatusUpdated
     parameters
+      PreloadingAttemptKey key
       # The frame id of the frame initiating prefetch.
       Page.FrameId initiatingFrameId
       string prefetchUrl
@@ -10899,6 +10901,7 @@ experimental domain Preload
   # Fired when a prerender attempt is updated.
   event prerenderStatusUpdated
     parameters
+      PreloadingAttemptKey key
       # The frame id of the frame initiating prerender.
       Page.FrameId initiatingFrameId
       string prerenderingUrl
```

## Roll protocol to r1120367 — _2023-03-22T04:27:34.000Z_
######  Diff: [`d451302...7bd9b6c`](https://github.com/ChromeDevTools/devtools-protocol/compare/d451302...7bd9b6c)

```diff
@@ browser_protocol.pdl:756 @@ experimental domain Audits
       FormInputAssignedAutocompleteValueToIdOrNameAttributeError
       FormLabelHasNeitherForNorNestedInput
       FormLabelForMatchesNonExistingIdError
+      FormInputHasWrongButWellIntendedAutocompleteValueError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
@@ -10903,9 +10904,10 @@ experimental domain Preload
       string prerenderingUrl
       PreloadingStatus status
 
-  # Send a list of sources for all preloading attempts.
+  # Send a list of sources for all preloading attempts in a document.
   event preloadingAttemptSourcesUpdated
     parameters
+      Network.LoaderId loaderId
       array of PreloadingAttemptSource preloadingAttemptSources
 
 # This domain allows interacting with the FedCM dialog.
```

## Roll protocol to r1119769 — _2023-03-21T04:27:17.000Z_
######  Diff: [`40d0eff...d451302`](https://github.com/ChromeDevTools/devtools-protocol/compare/40d0eff...d451302)

```diff
@@ browser_protocol.pdl:10842 @@ experimental domain Preload
       InactivePageRestriction
       StartFailed
       TimeoutBackgrounded
-      CrossSiteRedirect
-      CrossSiteNavigation
-      SameSiteCrossOriginRedirect
-      SameSiteCrossOriginRedirectNotOptIn
-      SameSiteCrossOriginNavigationNotOptIn
+      CrossSiteRedirectInInitialNavigation
+      CrossSiteNavigationInInitialNavigation
+      SameSiteCrossOriginRedirectNotOptInInInitialNavigation
+      SameSiteCrossOriginNavigationNotOptInInInitialNavigation
       ActivationNavigationParameterMismatch
       ActivatedInBackground
       EmbedderHostDisallowed
@@ -10860,6 +10859,10 @@ experimental domain Preload
       BatterySaverEnabled
       ActivatedDuringMainFrameNavigation
       PreloadingUnsupportedByWebContents
+      CrossSiteRedirectInMainFrameNavigation
+      CrossSiteNavigationInMainFrameNavigation
+      SameSiteCrossOriginRedirectNotOptInInMainFrameNavigation
+      SameSiteCrossOriginNavigationNotOptInInMainFrameNavigation
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
@@ -10935,6 +10938,12 @@ experimental domain FedCm
       array of Account accounts
 
   command enable
+    parameters
+      # Allows callers to disable the promise rejection delay that would
+      # normally happen, if this is unimportant to what's being tested.
+      # (step 4 of https://fedidcg.github.io/FedCM/#browser-api-rp-sign-in)
+      optional boolean disableRejectionDelay
+
   command disable
 
   command selectAccount
```

## Roll protocol to r1119014 — _2023-03-18T04:27:47.000Z_
######  Diff: [`4e13b66...40d0eff`](https://github.com/ChromeDevTools/devtools-protocol/compare/4e13b66...40d0eff)

```diff
@@ browser_protocol.pdl:1409 @@ experimental domain CSS
       optional StyleSheetId styleSheetId
       # Rule selector data.
       SelectorList selectorList
+      # Array of selectors from ancestor style rules, sorted by distance from the current rule.
+      experimental optional array of string nestingSelectors
       # Parent stylesheet's origin.
       StyleSheetOrigin origin
       # Associated style declaration.
```

## Roll protocol to r1116775 — _2023-03-14T04:28:31.000Z_
######  Diff: [`bc17667...4e13b66`](https://github.com/ChromeDevTools/devtools-protocol/compare/bc17667...4e13b66)

```diff
@@ browser_protocol.pdl:712 @@ experimental domain Audits
       SourceAndTriggerHeaders
       SourceIgnored
       TriggerIgnored
+      OsSourceIgnored
+      OsTriggerIgnored
+      InvalidRegisterOsSourceHeader
+      InvalidRegisterOsTriggerHeader
+      WebAndOsHeaders
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
@@ -10900,6 +10905,13 @@ experimental domain Preload
 
 # This domain allows interacting with the FedCM dialog.
 experimental domain FedCm
+  # Whether this is a sign-up or sign-in action for this account, i.e.
+  # whether this account has ever been used to sign in to this RP before.
+  type LoginState extends string
+    enum
+      SignIn
+      SignUp
+
   # Corresponds to IdentityRequestAccount
   type Account extends object
     properties
@@ -10909,10 +10921,25 @@ experimental domain FedCm
       string givenName
       string pictureUrl
       string idpConfigUrl
+      string idpSigninUrl
+      LoginState loginState
+      # These two are only set if the loginState is signUp
+      optional string termsOfServiceUrl
+      optional string privacyPolicyUrl
 
   event dialogShown
     parameters
+      string dialogId
       array of Account accounts
 
   command enable
   command disable
+
+  command selectAccount
+    parameters
+      string dialogId
+      integer accountIndex
+
+  command dismissDialog
+    parameters
+      string dialogId
```

## Roll protocol to r1115542 — _2023-03-10T04:29:00.000Z_
######  Diff: [`3b5916a...bc17667`](https://github.com/ChromeDevTools/devtools-protocol/compare/3b5916a...bc17667)

```diff
@@ browser_protocol.pdl:10900 @@ experimental domain Preload
 
 # This domain allows interacting with the FedCM dialog.
 experimental domain FedCm
+  # Corresponds to IdentityRequestAccount
+  type Account extends object
+    properties
+      string accountId
+      string email
+      string name
+      string givenName
+      string pictureUrl
+      string idpConfigUrl
+
   event dialogShown
+    parameters
+      array of Account accounts
 
   command enable
   command disable
```

## Roll protocol to r1114954 — _2023-03-09T04:29:10.000Z_
######  Diff: [`1cd77ce...3b5916a`](https://github.com/ChromeDevTools/devtools-protocol/compare/1cd77ce...3b5916a)

```diff
@@ browser_protocol.pdl:10838 @@ experimental domain Preload
       CrossSiteRedirect
       CrossSiteNavigation
       SameSiteCrossOriginRedirect
-      SameSiteCrossOriginNavigation
       SameSiteCrossOriginRedirectNotOptIn
       SameSiteCrossOriginNavigationNotOptIn
       ActivationNavigationParameterMismatch
```

## Roll protocol to r1114386 — _2023-03-08T04:28:54.000Z_
######  Diff: [`e4e18e5...1cd77ce`](https://github.com/ChromeDevTools/devtools-protocol/compare/e4e18e5...1cd77ce)

```diff
@@ browser_protocol.pdl:702 @@ experimental domain Audits
   type AttributionReportingIssueType extends string
     enum
       PermissionPolicyDisabled
-      PermissionPolicyNotDelegated
       UntrustworthyReportingOrigin
       InsecureContext
       # TODO(apaseltiner): Rename this to InvalidRegisterSourceHeader
```

## Roll protocol to r1113774 — _2023-03-07T04:29:03.000Z_
######  Diff: [`3ca05ae...e4e18e5`](https://github.com/ChromeDevTools/devtools-protocol/compare/3ca05ae...e4e18e5)

```diff
@@ browser_protocol.pdl:10742 @@ experimental domain Preload
       # - https://github.com/WICG/nav-speculation/blob/main/triggers.md
       string sourceText
 
+  # The type of preloading attempted. It corresponds to
+  # mojom::SpeculationAction (although PrefetchWithSubresources is omitted as it
+  # isn't being used by clients).
+  type SpeculationAction extends string
+    enum
+      Prefetch
+      Prerender
+
+  # Corresponds to mojom::SpeculationTargetHint.
+  # See https://github.com/WICG/nav-speculation/blob/main/triggers.md#window-name-targeting-hints
+  type SpeculationTargetHint extends string
+    enum
+      Blank
+      Self
+
+  # A key that identifies a preloading attempt.
+  #
+  # The url used is the url specified by the trigger (i.e. the initial URL), and
+  # not the final url that is navigated to. For example, prerendering allows
+  # same-origin main frame navigations during the attempt, but the attempt is
+  # still keyed with the initial URL.
+  type PreloadingAttemptKey extends object
+    properties
+      Network.LoaderId loaderId
+      SpeculationAction action
+      string url
+      optional SpeculationTargetHint targetHint
+
+  # Lists sources for a preloading attempt, specifically the ids of rule sets
+  # that had a speculation rule that triggered the attempt, and the
+  # BackendNodeIds of <a href> or <area href> elements that triggered the
+  # attempt (in the case of attempts triggered by a document rule). It is
+  # possible for mulitple rule sets and links to trigger a single attempt.
+  type PreloadingAttemptSource extends object
+    properties
+      PreloadingAttemptKey key
+      array of RuleSetId ruleSetIds
+      array of DOM.BackendNodeId nodeIds
+
   command enable
 
   command disable
@@ -10856,6 +10895,11 @@ experimental domain Preload
       string prerenderingUrl
       PreloadingStatus status
 
+  # Send a list of sources for all preloading attempts.
+  event preloadingAttemptSourcesUpdated
+    parameters
+      array of PreloadingAttemptSource preloadingAttemptSources
+
 # This domain allows interacting with the FedCM dialog.
 experimental domain FedCm
   event dialogShown
```

## Roll protocol to r1113120 — _2023-03-04T04:28:32.000Z_
######  Diff: [`6aab256...3ca05ae`](https://github.com/ChromeDevTools/devtools-protocol/compare/6aab256...3ca05ae)

```diff
@@ browser_protocol.pdl:8482 @@ domain Page
       # Tree structure of reasons why the page could not be cached for each frame.
       optional BackForwardCacheNotRestoredExplanationTree notRestoredExplanationsTree
 
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
-  experimental event prerenderAttemptCompleted
-    parameters
-      # The frame id of the frame initiating prerendering.
-      FrameId initiatingFrameId
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
-  # TODO(crbug/1384419): Create a dedicated domain for preloading.
-  # Fired when a prefetch attempt is updated.
-  experimental event prefetchStatusUpdated
-    parameters
-      # The frame id of the frame initiating prefetch.
-      FrameId initiatingFrameId
-      string prefetchUrl
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
-
   event loadEventFired
     parameters
       Network.MonotonicTime timestamp
@@ -10858,6 +10755,107 @@ experimental domain Preload
     parameters
       RuleSetId id
 
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
+  event prerenderAttemptCompleted
+    parameters
+      # The frame id of the frame initiating prerendering.
+      Page.FrameId initiatingFrameId
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
+  # Fired when a prefetch attempt is updated.
+  event prefetchStatusUpdated
+    parameters
+      # The frame id of the frame initiating prefetch.
+      Page.FrameId initiatingFrameId
+      string prefetchUrl
+      PreloadingStatus status
+
+  # Fired when a prerender attempt is updated.
+  event prerenderStatusUpdated
+    parameters
+      # The frame id of the frame initiating prerender.
+      Page.FrameId initiatingFrameId
+      string prerenderingUrl
+      PreloadingStatus status
+
 # This domain allows interacting with the FedCM dialog.
 experimental domain FedCm
   event dialogShown
```

## Roll protocol to r1112051 — _2023-03-02T04:29:08.000Z_
######  Diff: [`b7cc171...6aab256`](https://github.com/ChromeDevTools/devtools-protocol/compare/b7cc171...6aab256)

```diff
@@ browser_protocol.pdl:10857 @@ experimental domain Preload
   event ruleSetRemoved
     parameters
       RuleSetId id
+
+# This domain allows interacting with the FedCM dialog.
+experimental domain FedCm
+  event dialogShown
+
+  command enable
+  command disable
```

## Roll protocol to r1111422 — _2023-03-01T04:29:07.000Z_
######  Diff: [`41a0227...b7cc171`](https://github.com/ChromeDevTools/devtools-protocol/compare/41a0227...b7cc171)

```diff
@@ browser_protocol.pdl:752 @@ experimental domain Audits
       FormInputAssignedAutocompleteValueToIdOrNameAttributeError
       FormLabelHasNeitherForNorNestedInput
       FormLabelForMatchesNonExistingIdError
-      FormHasPasswordFieldWithoutUsernameFieldError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1109433 — _2023-02-24T04:29:05.000Z_
######  Diff: [`8e5df71...41a0227`](https://github.com/ChromeDevTools/devtools-protocol/compare/8e5df71...41a0227)

```diff
@@ browser_protocol.pdl:752 @@ experimental domain Audits
       FormInputAssignedAutocompleteValueToIdOrNameAttributeError
       FormLabelHasNeitherForNorNestedInput
       FormLabelForMatchesNonExistingIdError
+      FormHasPasswordFieldWithoutUsernameFieldError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1107588 — _2023-02-21T04:28:49.000Z_
######  Diff: [`30ceb43...8e5df71`](https://github.com/ChromeDevTools/devtools-protocol/compare/30ceb43...8e5df71)

```diff
@@ browser_protocol.pdl:8555 @@ domain Page
       # that is incompatible with prerender and has caused the cancellation of the attempt
       optional string disallowedApiMethod
 
-  # List of Prefetch status, which refers to PreloadingTriggeringOutcome.
-  type PrefetchStatus extends string
+  # Preloading status values, see also PreloadingTriggeringOutcome. This
+  # status is shared by prefetchStatusUpdated and prerenderStatusUpdated.
+  type PreloadingStatus extends string
     enum
+      Pending
       Running
       Ready
       Success
       Failure
-      # PreloadingTriggeringOutcome which not used by prefetch.
+      # PreloadingTriggeringOutcome which not used by prefetch nor prerender.
       NotSupported
 
   # TODO(crbug/1384419): Create a dedicated domain for preloading.
@@ -8572,7 +8574,16 @@ domain Page
       # The frame id of the frame initiating prefetch.
       FrameId initiatingFrameId
       string prefetchUrl
-      PrefetchStatus status
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
 
   event loadEventFired
     parameters
```

## Roll protocol to r1105486 — _2023-02-15T04:28:51.000Z_
######  Diff: [`97f8fcb...30ceb43`](https://github.com/ChromeDevTools/devtools-protocol/compare/97f8fcb...30ceb43)

```diff
@@ browser_protocol.pdl:10814 @@ experimental domain DeviceAccess
     parameters
       RequestId id
       array of PromptDevice devices
+
+experimental domain Preload
+  # Unique id
+  type RuleSetId extends string
+
+  # Corresponds to SpeculationRuleSet
+  type RuleSet extends object
+    properties
+      RuleSetId id
+      # Identifies a document which the rule set is associated with.
+      Network.LoaderId loaderId
+      # Source text of JSON representing the rule set. If it comes from
+      # <script> tag, it is the textContent of the node. Note that it is
+      # a JSON for valid case.
+      #
+      # See also:
+      # - https://wicg.github.io/nav-speculation/speculation-rules.html
+      # - https://github.com/WICG/nav-speculation/blob/main/triggers.md
+      string sourceText
+
+  command enable
+
+  command disable
+
+  # Upsert. Currently, it is only emitted when a rule set added.
+  event ruleSetUpdated
+    parameters
+      RuleSet ruleSet
+
+  event ruleSetRemoved
+    parameters
+      RuleSetId id
```

## Roll protocol to r1103684 — _2023-02-10T04:28:55.000Z_
######  Diff: [`8cf7384...97f8fcb`](https://github.com/ChromeDevTools/devtools-protocol/compare/8cf7384...97f8fcb)

```diff
@@ browser_protocol.pdl:8555 @@ domain Page
       # that is incompatible with prerender and has caused the cancellation of the attempt
       optional string disallowedApiMethod
 
+  # List of Prefetch status, which refers to PreloadingTriggeringOutcome.
+  type PrefetchStatus extends string
+    enum
+      Running
+      Ready
+      Success
+      Failure
+      # PreloadingTriggeringOutcome which not used by prefetch.
+      NotSupported
+
+  # TODO(crbug/1384419): Create a dedicated domain for preloading.
+  # Fired when a prefetch attempt is updated.
+  experimental event prefetchStatusUpdated
+    parameters
+      # The frame id of the frame initiating prefetch.
+      FrameId initiatingFrameId
+      string prefetchUrl
+      PrefetchStatus status
+
   event loadEventFired
     parameters
       Network.MonotonicTime timestamp
@@ -10757,3 +10776,41 @@ experimental domain Media
 
   # Disables the Media domain.
   command disable
+
+experimental domain DeviceAccess
+  # Device request id.
+  type RequestId extends string
+
+  # A device id.
+  type DeviceId extends string
+
+  # Device information displayed in a user prompt to select a device.
+  type PromptDevice extends object
+    properties
+      DeviceId id
+      # Display name as it appears in a device request user prompt.
+      string name
+
+  # Enable events in this domain.
+  command enable
+
+  # Disable events in this domain.
+  command disable
+
+  # Select a device in response to a DeviceAccess.deviceRequestPrompted event.
+  command selectPrompt
+    parameters
+      RequestId id
+      DeviceId deviceId
+
+  # Cancel a prompt in response to a DeviceAccess.deviceRequestPrompted event.
+  command cancelPrompt
+    parameters
+      RequestId id
+
+  # A device request opened a user prompt to select a device. Respond with the
+  # selectPrompt or cancelPrompt command.
+  event deviceRequestPrompted
+    parameters
+      RequestId id
+      array of PromptDevice devices
```

## Roll protocol to r1103117 — _2023-02-09T04:28:18.000Z_
######  Diff: [`db5327b...8cf7384`](https://github.com/ChromeDevTools/devtools-protocol/compare/db5327b...8cf7384)

```diff
@@ browser_protocol.pdl:203 @@ experimental domain Accessibility
       optional DOM.BackendNodeId backendNodeId
       # JavaScript object id of the node wrapper to get the partial accessibility tree for.
       optional Runtime.RemoteObjectId objectId
-      # Whether to fetch this nodes ancestors, siblings and children. Defaults to true.
+      # Whether to fetch this node's ancestors, siblings and children. Defaults to true.
       optional boolean fetchRelatives
     returns
       # The `Accessibility.AXNode` for this DOM node, if it exists, plus its ancestors, siblings and
@@ -761,73 +761,14 @@ experimental domain Audits
       optional Page.FrameId frameId
       optional DOM.BackendNodeId violatingNodeId
 
-  type DeprecationIssueType extends string
-    enum
-      AuthorizationCoveredByWildcard
-      CanRequestURLHTTPContainingNewline
-      ChromeLoadTimesConnectionInfo
-      ChromeLoadTimesFirstPaintAfterLoadTime
-      ChromeLoadTimesWasAlternateProtocolAvailable
-      CookieWithTruncatingChar
-      CrossOriginAccessBasedOnDocumentDomain
-      CrossOriginWindowAlert
-      CrossOriginWindowConfirm
-      CSSSelectorInternalMediaControlsOverlayCastButton
-      DeprecationExample
-      DocumentDomainSettingWithoutOriginAgentClusterHeader
-      EventPath
-      ExpectCTHeader
-      GeolocationInsecureOrigin
-      GeolocationInsecureOriginDeprecatedNotRemoved
-      GetUserMediaInsecureOrigin
-      HostCandidateAttributeGetter
-      IdentityInCanMakePaymentEvent
-      InsecurePrivateNetworkSubresourceRequest
-      LocalCSSFileExtensionRejected
-      MediaSourceAbortRemove
-      MediaSourceDurationTruncatingBuffered
-      NoSysexWebMIDIWithoutPermission
-      NotificationInsecureOrigin
-      NotificationPermissionRequestedIframe
-      ObsoleteCreateImageBitmapImageOrientationNone
-      ObsoleteWebRtcCipherSuite
-      OpenWebDatabaseInsecureContext
-      OverflowVisibleOnReplacedElement
-      PaymentInstruments
-      PaymentRequestCSPViolation
-      PersistentQuotaType
-      PictureSourceSrc
-      PrefixedCancelAnimationFrame
-      PrefixedRequestAnimationFrame
-      PrefixedStorageInfo
-      PrefixedVideoDisplayingFullscreen
-      PrefixedVideoEnterFullscreen
-      PrefixedVideoEnterFullScreen
-      PrefixedVideoExitFullscreen
-      PrefixedVideoExitFullScreen
-      PrefixedVideoSupportsFullscreen
-      PrivacySandboxExtensionsAPI
-      RangeExpand
-      RequestedSubresourceWithEmbeddedCredentials
-      RTCConstraintEnableDtlsSrtpFalse
-      RTCConstraintEnableDtlsSrtpTrue
-      RTCPeerConnectionComplexPlanBSdpUsingDefaultSdpSemantics
-      RTCPeerConnectionSdpSemanticsPlanB
-      RtcpMuxPolicyNegotiate
-      SharedArrayBufferConstructedWithoutIsolation
-      TextToSpeech_DisallowedByAutoplay
-      V8SharedArrayBufferConstructedInExtensionWithoutIsolation
-      XHRJSONEncodingDetection
-      XMLHttpRequestSynchronousInNonWorkerOutsideBeforeUnload
-      XRSupportsSession
-
   # This issue tracks information needed to print a deprecation message.
   # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/third_party/blink/renderer/core/frame/deprecation/README.md
   type DeprecationIssueDetails extends object
     properties
       optional AffectedFrame affectedFrame
       SourceCodeLocation sourceCodeLocation
-      DeprecationIssueType type
+      # One of the deprecation names from third_party/blink/renderer/core/frame/deprecation/deprecation.json5
+      string type
 
   type ClientHintIssueReason extends string
     enum
@@ -1902,7 +1843,7 @@ experimental domain CSS
   # Polls the next batch of computed style updates.
   experimental command takeComputedStyleUpdates
     returns
-      # The list of node Ids that have their tracked computed styles updated
+      # The list of node Ids that have their tracked computed styles updated.
       array of DOM.NodeId nodeIds
 
   # Find a rule with the given active property for the given node and set the new value for this
@@ -1995,13 +1936,13 @@ experimental domain CSS
   command startRuleUsageTracking
 
   # Stop tracking rule usage and return the list of rules that were used since last call to
-  # `takeCoverageDelta` (or since start of coverage instrumentation)
+  # `takeCoverageDelta` (or since start of coverage instrumentation).
   command stopRuleUsageTracking
     returns
       array of RuleUsage ruleUsage
 
   # Obtain list of rules that became used since last call to this method (or since start of coverage
-  # instrumentation)
+  # instrumentation).
   command takeCoverageDelta
     returns
       array of RuleUsage coverage
@@ -2015,7 +1956,7 @@ experimental domain CSS
       boolean enabled
 
   # Fires whenever a web font is updated.  A non-empty font parameter indicates a successfully loaded
-  # web font
+  # web font.
   event fontsUpdated
     parameters
       # The web font that has loaded.
@@ -3810,11 +3751,13 @@ domain Emulation
   # Emulates the given vision deficiency.
   experimental command setEmulatedVisionDeficiency
     parameters
-      # Vision deficiency to emulate.
+      # Vision deficiency to emulate. Order: best-effort emulations come first, followed by any
+      # physiologically accurate emulations for medically recognized color vision deficiencies.
       enum type
         none
-        achromatopsia
         blurredVision
+        reducedContrast
+        achromatopsia
         deuteranopia
         protanopia
         tritanopia
@@ -4196,7 +4139,7 @@ experimental domain IndexedDB
       # If true, there are more entries to fetch in the given range.
       boolean hasMore
 
-  # Gets metadata of an object store
+  # Gets metadata of an object store.
   command getMetadata
     parameters
       # At least and at most one of securityOrigin, storageKey must be specified.
@@ -9371,6 +9314,15 @@ experimental domain Storage
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
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index d4102f5..6285d9b 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -511,6 +511,7 @@ domain Debugger
         CompileError
         BlockedByActiveGenerator
         BlockedByActiveFunction
+        BlockedByTopLevelEsModuleChange
       # Exception details if any. Only present when `status` is `CompileError`.
       optional Runtime.ExceptionDetails exceptionDetails
```

## Roll protocol to r1102555 — _2023-02-08T04:29:03.000Z_
######  Diff: [`e088ea1...db5327b`](https://github.com/ChromeDevTools/devtools-protocol/compare/e088ea1...db5327b)

```diff
@@ browser_protocol.pdl:2556 @@ domain DOM
       array of Quad quads
 
   # Returns the root DOM node (and optionally the subtree) to the caller.
+  # Implicitly enables the DOM domain events for the current target.
   command getDocument
     parameters
       # The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the
```

## Roll protocol to r1101985 — _2023-02-07T04:28:15.000Z_
######  Diff: [`81bd251...e088ea1`](https://github.com/ChromeDevTools/devtools-protocol/compare/81bd251...e088ea1)

```diff
@@ browser_protocol.pdl:7735 @@ domain Page
     returns
       array of InstallabilityError installabilityErrors
 
-  experimental command getManifestIcons
+  # Deprecated because it's not guaranteed that the returned icon is in fact the one used for PWA installation.
+  experimental deprecated command getManifestIcons
     returns
       optional binary primaryIcon
 
@@ -8149,24 +8150,25 @@ domain Page
   # Clears seeded compilation cache.
   experimental command clearCompilationCache
 
-  # Sets the Secure Payment Confirmation transaction mode.
+  # Enum of possible auto-reponse for permisison / prompt dialogs.
+  experimental type AutoResponseMode extends string
+    enum
+      none
+      autoAccept
+      autoReject
+      autoOptOut
+
+# Sets the Secure Payment Confirmation transaction mode.
   # https://w3c.github.io/secure-payment-confirmation/#sctn-automation-set-spc-transaction-mode
   experimental command setSPCTransactionMode
     parameters
-      enum mode
-        none
-        autoAccept
-        autoReject
-        autoOptOut
+      AutoResponseMode mode
 
   # Extensions for Custom Handlers API:
   # https://html.spec.whatwg.org/multipage/system-state.html#rph-automation
   experimental command setRPHRegistrationMode
     parameters
-      enum mode
-        none
-        autoaccept
-        autoreject
+      AutoResponseMode mode
 
   # Generates a report for testing.
   experimental command generateTestReport
```

## Roll protocol to r1101329 — _2023-02-04T04:27:44.000Z_
######  Diff: [`5d7fa4e...81bd251`](https://github.com/ChromeDevTools/devtools-protocol/compare/5d7fa4e...81bd251)

```diff
@@ browser_protocol.pdl:8159 @@ domain Page
         autoReject
         autoOptOut
 
+  # Extensions for Custom Handlers API:
+  # https://html.spec.whatwg.org/multipage/system-state.html#rph-automation
+  experimental command setRPHRegistrationMode
+    parameters
+      enum mode
+        none
+        autoaccept
+        autoreject
+
   # Generates a report for testing.
   experimental command generateTestReport
     parameters
@@ -8587,6 +8596,7 @@ domain Page
       PreloadingDisabled
       BatterySaverEnabled
       ActivatedDuringMainFrameNavigation
+      PreloadingUnsupportedByWebContents
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1100832 — _2023-02-03T04:28:21.000Z_
######  Diff: [`41637d7...5d7fa4e`](https://github.com/ChromeDevTools/devtools-protocol/compare/41637d7...5d7fa4e)

```diff
@@ browser_protocol.pdl:751 @@ experimental domain Audits
       FormAriaLabelledByToNonExistingId
       FormInputAssignedAutocompleteValueToIdOrNameAttributeError
       FormLabelHasNeitherForNorNestedInput
+      FormLabelForMatchesNonExistingIdError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1100268 — _2023-02-02T04:28:14.000Z_
######  Diff: [`01899e6...41637d7`](https://github.com/ChromeDevTools/devtools-protocol/compare/01899e6...41637d7)

```diff
@@ browser_protocol.pdl:750 @@ experimental domain Audits
       FormEmptyIdAndNameAttributesForInputError
       FormAriaLabelledByToNonExistingId
       FormInputAssignedAutocompleteValueToIdOrNameAttributeError
+      FormLabelHasNeitherForNorNestedInput
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
@@ -9356,15 +9357,6 @@ experimental domain Storage
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
```

## Roll protocol to r1099658 — _2023-02-01T04:28:12.000Z_
######  Diff: [`2a08589...01899e6`](https://github.com/ChromeDevTools/devtools-protocol/compare/2a08589...01899e6)

```diff
@@ browser_protocol.pdl:8584 @@ domain Page
       ActivationFramePolicyNotCompatible
       PreloadingDisabled
       BatterySaverEnabled
+      ActivatedDuringMainFrameNavigation
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1099089 — _2023-01-31T04:27:53.000Z_
######  Diff: [`58bc3b6...2a08589`](https://github.com/ChromeDevTools/devtools-protocol/compare/58bc3b6...2a08589)

```diff
@@ browser_protocol.pdl:749 @@ experimental domain Audits
       FormAutocompleteAttributeEmptyError
       FormEmptyIdAndNameAttributesForInputError
       FormAriaLabelledByToNonExistingId
+      FormInputAssignedAutocompleteValueToIdOrNameAttributeError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1098258 — _2023-01-28T04:27:44.000Z_
######  Diff: [`a73bac7...58bc3b6`](https://github.com/ChromeDevTools/devtools-protocol/compare/a73bac7...58bc3b6)

```diff
@@ browser_protocol.pdl:748 @@ experimental domain Audits
       FormInputWithNoLabelError
       FormAutocompleteAttributeEmptyError
       FormEmptyIdAndNameAttributesForInputError
+      FormAriaLabelledByToNonExistingId
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1097787 — _2023-01-27T04:28:00.000Z_
######  Diff: [`c72fa9e...a73bac7`](https://github.com/ChromeDevTools/devtools-protocol/compare/c72fa9e...a73bac7)

```diff
@@ browser_protocol.pdl:802 @@ experimental domain Audits
       PrefixedVideoExitFullscreen
       PrefixedVideoExitFullScreen
       PrefixedVideoSupportsFullscreen
+      PrivacySandboxExtensionsAPI
       RangeExpand
       RequestedSubresourceWithEmbeddedCredentials
       RTCConstraintEnableDtlsSrtpFalse
@@ -6401,6 +6402,11 @@ domain Network
       # Raw response header text as it was received over the wire. The raw text may not always be
       # available, such as in the case of HTTP/2 or QUIC.
       optional string headersText
+      # The cookie partition key that will be used to store partitioned cookies set in this response.
+      # Only sent when partitioned cookies are enabled.
+      optional string cookiePartitionKey
+      # True if partitioned cookies are enabled, but the partition key is not serializeable to string.
+      optional boolean cookiePartitionKeyOpaque
 
   # Fired exactly once for each Trust Token operation. Depending on
   # the type of the operation and whether the operation succeeded or
@@ -8574,6 +8580,8 @@ domain Page
       PrimaryMainFrameRendererProcessCrashed
       PrimaryMainFrameRendererProcessKilled
       ActivationFramePolicyNotCompatible
+      PreloadingDisabled
+      BatterySaverEnabled
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1097235 — _2023-01-26T04:28:05.000Z_
######  Diff: [`5caaeb9...c72fa9e`](https://github.com/ChromeDevTools/devtools-protocol/compare/5caaeb9...c72fa9e)

```diff
@@ browser_protocol.pdl:747 @@ experimental domain Audits
       FormDuplicateIdForInputError
       FormInputWithNoLabelError
       FormAutocompleteAttributeEmptyError
+      FormEmptyIdAndNameAttributesForInputError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1096618 — _2023-01-25T04:27:58.000Z_
######  Diff: [`23801b1...5caaeb9`](https://github.com/ChromeDevTools/devtools-protocol/compare/23801b1...5caaeb9)

```diff
@@ browser_protocol.pdl:746 @@ experimental domain Audits
       FormLabelForNameError
       FormDuplicateIdForInputError
       FormInputWithNoLabelError
+      FormAutocompleteAttributeEmptyError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1096014 — _2023-01-24T04:28:10.000Z_
######  Diff: [`9b03384...23801b1`](https://github.com/ChromeDevTools/devtools-protocol/compare/9b03384...23801b1)

```diff
@@ browser_protocol.pdl:1273 @@ domain Browser
       # substring in their name are extracted. An empty or absent query returns
       # all histograms.
       optional string query
-      # If true, retrieve delta since last call.
+      # If true, retrieve delta since last delta call.
       optional boolean delta
 
     returns
@@ -1285,7 +1285,7 @@ domain Browser
     parameters
       # Requested histogram name.
       string name
-      # If true, retrieve delta since last call.
+      # If true, retrieve delta since last delta call.
       optional boolean delta
     returns
       # Histogram.
```

## Roll protocol to r1094867 — _2023-01-20T04:28:35.000Z_
######  Diff: [`6b557d0...9b03384`](https://github.com/ChromeDevTools/devtools-protocol/compare/6b557d0...9b03384)

```diff
@@ browser_protocol.pdl:5271 @@ domain Network
   # are specified in third_party/blink/renderer/core/fetch/trust_token.idl.
   experimental type TrustTokenParams extends object
     properties
-      TrustTokenOperationType type
+      TrustTokenOperationType operation
 
-      # Only set for "token-redemption" type and determine whether
+      # Only set for "token-redemption" operation and determine whether
       # to request a fresh SRR or use a still valid cached SRR.
       enum refreshPolicy
         UseCached
```

## Roll protocol to r1094278 — _2023-01-19T04:28:56.000Z_
######  Diff: [`370c224...6b557d0`](https://github.com/ChromeDevTools/devtools-protocol/compare/370c224...6b557d0)

```diff
@@ browser_protocol.pdl:8569 @@ domain Page
       ActivationNavigationDestroyedBeforeSuccess
       TabClosedByUserGesture
       TabClosedWithoutUserGesture
+      PrimaryMainFrameRendererProcessCrashed
+      PrimaryMainFrameRendererProcessKilled
+      ActivationFramePolicyNotCompatible
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1093722 — _2023-01-18T04:28:24.000Z_
######  Diff: [`c03647c...370c224`](https://github.com/ChromeDevTools/devtools-protocol/compare/c03647c...370c224)

```diff
@@ browser_protocol.pdl:783 @@ experimental domain Audits
       NoSysexWebMIDIWithoutPermission
       NotificationInsecureOrigin
       NotificationPermissionRequestedIframe
+      ObsoleteCreateImageBitmapImageOrientationNone
       ObsoleteWebRtcCipherSuite
       OpenWebDatabaseInsecureContext
       OverflowVisibleOnReplacedElement
@@ -3681,7 +3682,9 @@ domain Emulation
   # Missing optional values will be filled in by the target with what it would normally use.
   experimental type UserAgentMetadata extends object
     properties
+      # Brands appearing in Sec-CH-UA.
       optional array of UserAgentBrandVersion brands
+      # Brands appearing in Sec-CH-UA-Full-Version-List.
       optional array of UserAgentBrandVersion fullVersionList
       deprecated optional string fullVersion
       string platform
@@ -10550,6 +10553,10 @@ experimental domain WebAuthn
       # https://fidoalliance.org/specs/fido-v2.1-ps-20210615/fido-client-to-authenticator-protocol-v2.1-ps-20210615.html#sctn-minpinlength-extension
       # Defaults to false.
       optional boolean hasMinPinLength
+      # If set to true, the authenticator will support the prf extension.
+      # https://w3c.github.io/webauthn/#prf-extension
+      # Defaults to false.
+      optional boolean hasPrf
       # If set to true, tests of user presence will succeed immediately.
       # Otherwise, they will not be resolved. Defaults to true.
       optional boolean automaticPresenceSimulation
```

## Roll protocol to r1092731 — _2023-01-14T04:27:49.000Z_
######  Diff: [`a9c500f...c03647c`](https://github.com/ChromeDevTools/devtools-protocol/compare/a9c500f...c03647c)

```diff
@@ browser_protocol.pdl:745 @@ experimental domain Audits
       CrossOriginPortalPostMessageError
       FormLabelForNameError
       FormDuplicateIdForInputError
+      FormInputWithNoLabelError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
```

## Roll protocol to r1092232 — _2023-01-13T04:28:35.000Z_
######  Diff: [`aef3081...a9c500f`](https://github.com/ChromeDevTools/devtools-protocol/compare/aef3081...a9c500f)

```diff
@@ browser_protocol.pdl:744 @@ experimental domain Audits
     enum
       CrossOriginPortalPostMessageError
       FormLabelForNameError
+      FormDuplicateIdForInputError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
@@ -7236,6 +7237,8 @@ domain Page
       usb
       vertical-scroll
       web-share
+      # Alias for 'window-placement' (crbug.com/1328581).
+      window-management
       window-placement
       xr-spatial-tracking
```

## Roll protocol to r1090008 — _2023-01-07T04:27:59.000Z_
######  Diff: [`e97a9e4...aef3081`](https://github.com/ChromeDevTools/devtools-protocol/compare/e97a9e4...aef3081)

```diff
@@ browser_protocol.pdl:843 @@ experimental domain Audits
       WellKnownHttpNotFound
       WellKnownNoResponse
       WellKnownInvalidResponse
+      WellKnownListEmpty
       ConfigNotInWellKnown
       WellKnownTooBig
       ConfigHttpNotFound
@@ -857,6 +858,7 @@ experimental domain Audits
       AccountsHttpNotFound
       AccountsNoResponse
       AccountsInvalidResponse
+      AccountsListEmpty
       IdTokenHttpNotFound
       IdTokenNoResponse
       IdTokenInvalidResponse
```

## Roll protocol to r1089613 — _2023-01-06T04:28:04.000Z_
######  Diff: [`6eb86f8...e97a9e4`](https://github.com/ChromeDevTools/devtools-protocol/compare/6eb86f8...e97a9e4)

```diff
@@ js_protocol.pdl:1741 @@ domain Runtime
   event executionContextDestroyed
     parameters
       # Id of the destroyed context
-      ExecutionContextId executionContextId
+      deprecated ExecutionContextId executionContextId
+      # Unique Id of the destroyed context
+      experimental string executionContextUniqueId
 
   # Issued when all executionContexts were cleared in browser
   event executionContextsCleared
```

## Roll protocol to r1089107 — _2023-01-05T04:28:22.000Z_
######  Diff: [`253af7d...6eb86f8`](https://github.com/ChromeDevTools/devtools-protocol/compare/253af7d...6eb86f8)

```diff
@@ browser_protocol.pdl:7218 @@ domain Page
       otp-credentials
       payment
       picture-in-picture
+      private-aggregation
       publickey-credentials-get
       run-ad-auction
       screen-wake-lock
       serial
       shared-autofill
       shared-storage
+      shared-storage-select-url
       smart-card
       storage-access
       sync-xhr
```

## Roll protocol to r1088570 — _2023-01-04T04:27:47.000Z_
######  Diff: [`0400c45...253af7d`](https://github.com/ChromeDevTools/devtools-protocol/compare/0400c45...253af7d)

```diff
@@ browser_protocol.pdl:1092 @@ domain Browser
       protectedMediaIdentifier
       sensors
       storageAccess
+      topLevelStorageAccess
       videoCapture
       videoCapturePanTiltZoom
       wakeLockScreen
```

## Roll protocol to r1087818 — _2022-12-31T04:27:46.000Z_
######  Diff: [`47facb7...0400c45`](https://github.com/ChromeDevTools/devtools-protocol/compare/47facb7...0400c45)

```diff
@@ browser_protocol.pdl:8555 @@ domain Page
       ActivatedInBackground
       EmbedderHostDisallowed
       ActivationNavigationDestroyedBeforeSuccess
+      TabClosedByUserGesture
+      TabClosedWithoutUserGesture
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1087713 — _2022-12-30T04:27:43.000Z_
######  Diff: [`1e60c0d...47facb7`](https://github.com/ChromeDevTools/devtools-protocol/compare/1e60c0d...47facb7)

```diff
@@ browser_protocol.pdl:5867 @@ domain Network
 
   # Returns all browser cookies. Depending on the backend support, will return detailed cookie
   # information in the `cookies` field.
-  command getAllCookies
+  # Deprecated. Use Storage.getCookies instead.
+  deprecated command getAllCookies
     returns
       # Array of cookie objects.
       array of Cookie cookies
```

## Roll protocol to r1087487 — _2022-12-29T04:28:09.000Z_
######  Diff: [`56c97c0...1e60c0d`](https://github.com/ChromeDevTools/devtools-protocol/compare/56c97c0...1e60c0d)

```diff
@@ js_protocol.pdl:1402 @@ domain Runtime
       optional string objectGroup
       # Whether to throw an exception if side effect cannot be ruled out during evaluation.
       experimental optional boolean throwOnSideEffect
+      # An alternative way to specify the execution context to call function on.
+      # Compared to contextId that may be reused across processes, this is guaranteed to be
+      # system-unique, so it can be used to prevent accidental function call
+      # in context different than intended (e.g. as a result of navigation across process
+      # boundaries).
+      # This is mutually exclusive with `executionContextId`.
+      experimental optional string uniqueContextId
       # Whether the result should contain `webDriverValue`, serialized according to
       # https://w3c.github.io/webdriver-bidi. This is mutually exclusive with `returnByValue`, but
       # resulting `objectId` is still provided.
```

## Roll protocol to r1085790 — _2022-12-21T04:28:10.000Z_
######  Diff: [`9e8e363...56c97c0`](https://github.com/ChromeDevTools/devtools-protocol/compare/9e8e363...56c97c0)

```diff
@@ browser_protocol.pdl:8553 @@ domain Page
       ActivationNavigationParameterMismatch
       ActivatedInBackground
       EmbedderHostDisallowed
+      ActivationNavigationDestroyedBeforeSuccess
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1085283 — _2022-12-20T04:28:00.000Z_
######  Diff: [`1ff2246...9e8e363`](https://github.com/ChromeDevTools/devtools-protocol/compare/1ff2246...9e8e363)

```diff
@@ browser_protocol.pdl:9381 @@ experimental domain Storage
     parameters
       string ownerOrigin
 
+  # Resets the budget for `ownerOrigin` by clearing all budget withdrawals.
+  experimental command resetSharedStorageBudget
+    parameters
+      string ownerOrigin
+
   # Enables/disables issuing of sharedStorageAccessed events.
   experimental command setSharedStorageTracking
     parameters
```

## Roll protocol to r1084670 — _2022-12-17T04:27:45.000Z_
######  Diff: [`8b04aee...1ff2246`](https://github.com/ChromeDevTools/devtools-protocol/compare/8b04aee...1ff2246)

```diff
@@ browser_protocol.pdl:9723 @@ domain Target
       # Whether to create the target in background or foreground (chrome-only,
       # false by default).
       optional boolean background
+      # Whether to create the target of type "tab".
+      experimental optional boolean forTab
     returns
       # The id of the page opened.
       TargetID targetId
```

## Roll protocol to r1084174 — _2022-12-16T04:27:47.000Z_
######  Diff: [`1e921af...8b04aee`](https://github.com/ChromeDevTools/devtools-protocol/compare/1e921af...8b04aee)

```diff
@@ browser_protocol.pdl:743 @@ experimental domain Audits
   type GenericIssueErrorType extends string
     enum
       CrossOriginPortalPostMessageError
+      FormLabelForNameError
 
   # Depending on the concrete errorType, different properties are set.
   type GenericIssueDetails extends object
@@ -750,6 +751,7 @@ experimental domain Audits
       # Issues with the same errorType are aggregated in the frontend.
       GenericIssueErrorType errorType
       optional Page.FrameId frameId
+      optional DOM.BackendNodeId violatingNodeId
 
   type DeprecationIssueType extends string
     enum
@@ -6406,6 +6408,7 @@ domain Network
         ResourceExhausted
         AlreadyExists
         Unavailable
+        Unauthorized
         BadResponse
         InternalError
         UnknownError
@@ -8423,6 +8426,7 @@ domain Page
       InjectedJavascript
       InjectedStyleSheet
       KeepaliveRequest
+      IndexedDBEvent
       Dummy
       AuthorizationHeader
       # Disabled for RenderFrameHost reasons
```

## Roll protocol to r1082910 — _2022-12-14T04:29:01.000Z_
######  Diff: [`5428889...1e921af`](https://github.com/ChromeDevTools/devtools-protocol/compare/5428889...1e921af)

```diff
@@ browser_protocol.pdl:8548 @@ domain Page
       SameSiteCrossOriginNavigationNotOptIn
       ActivationNavigationParameterMismatch
       ActivatedInBackground
+      EmbedderHostDisallowed
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1082281 — _2022-12-13T04:28:57.000Z_
######  Diff: [`178dea5...5428889`](https://github.com/ChromeDevTools/devtools-protocol/compare/178dea5...5428889)

```diff
@@ browser_protocol.pdl:8547 @@ domain Page
       SameSiteCrossOriginRedirectNotOptIn
       SameSiteCrossOriginNavigationNotOptIn
       ActivationNavigationParameterMismatch
+      ActivatedInBackground
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1081726 — _2022-12-10T04:28:45.000Z_
######  Diff: [`d4cef45...178dea5`](https://github.com/ChromeDevTools/devtools-protocol/compare/d4cef45...178dea5)

```diff
@@ browser_protocol.pdl:838 @@ experimental domain Audits
     enum
       ShouldEmbargo
       TooManyRequests
-      ManifestListHttpNotFound
-      ManifestListNoResponse
-      ManifestListInvalidResponse
-      ManifestNotInManifestList
-      ManifestListTooBig
-      ManifestHttpNotFound
-      ManifestNoResponse
-      ManifestInvalidResponse
+      WellKnownHttpNotFound
+      WellKnownNoResponse
+      WellKnownInvalidResponse
+      ConfigNotInWellKnown
+      WellKnownTooBig
+      ConfigHttpNotFound
+      ConfigNoResponse
+      ConfigInvalidResponse
       ClientMetadataHttpNotFound
       ClientMetadataNoResponse
       ClientMetadataInvalidResponse
@@ -3897,7 +3897,6 @@ domain Emulation
   experimental type DisabledImageType extends string
     enum
       avif
-      jxl
       webp
 
   experimental command setDisabledImageTypes
@@ -7220,6 +7219,7 @@ domain Page
       serial
       shared-autofill
       shared-storage
+      smart-card
       storage-access
       sync-xhr
       trust-token-redemption
```

## Roll protocol to r1081314 — _2022-12-09T04:28:47.000Z_
######  Diff: [`c1e172c...d4cef45`](https://github.com/ChromeDevTools/devtools-protocol/compare/c1e172c...d4cef45)

```diff
@@ browser_protocol.pdl:9569 @@ experimental domain SystemInfo
       # supported.
       string commandLine
 
+  # Returns information about the feature state.
+  command getFeatureState
+    parameters
+      string featureState
+    returns
+      boolean featureEnabled
+
   # Returns information about all running processes.
   command getProcessInfo
     returns
```

## Roll protocol to r1079624 — _2022-12-06T04:28:29.000Z_
######  Diff: [`8af7bb2...c1e172c`](https://github.com/ChromeDevTools/devtools-protocol/compare/8af7bb2...c1e172c)

```diff
@@ browser_protocol.pdl:1100 @@ domain Browser
     enum
       granted
       denied
+      prompt
 
   # Definition of PermissionDescriptor defined in the Permissions API:
   # https://w3c.github.io/permissions/#dictdef-permissiondescriptor.
```

## Roll protocol to r1078443 — _2022-12-02T04:28:44.000Z_
######  Diff: [`23c561a...8af7bb2`](https://github.com/ChromeDevTools/devtools-protocol/compare/23c561a...8af7bb2)

```diff
@@ browser_protocol.pdl:10630 @@ experimental domain WebAuthn
       AuthenticatorId authenticatorId
       boolean enabled
 
+  # Triggered when a credential is added to an authenticator.
+  event credentialAdded
+    parameters
+      AuthenticatorId authenticatorId
+      Credential credential
+
+  # Triggered when a credential is used in a webauthn assertion.
+  event credentialAsserted
+    parameters
+      AuthenticatorId authenticatorId
+      Credential credential
+
 # This domain allows detailed inspection of media elements
 experimental domain Media
```

## Roll protocol to r1077862 — _2022-12-01T04:30:06.000Z_
######  Diff: [`151a19b...23c561a`](https://github.com/ChromeDevTools/devtools-protocol/compare/151a19b...23c561a)

```diff
@@ browser_protocol.pdl:8423 @@ domain Page
       InjectedStyleSheet
       KeepaliveRequest
       Dummy
+      AuthorizationHeader
       # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
@@ -9076,6 +9077,7 @@ experimental domain Storage
       join
       leave
       update
+      loaded
       bid
       win
 
@@ -10011,8 +10013,8 @@ experimental domain Tracing
       # total size.
       optional number value
 
-  # Contains an bucket of collected trace events. When tracing is stopped collected events will be
-  # send as a sequence of dataCollected events followed by tracingComplete event.
+  # Contains a bucket of collected trace events. When tracing is stopped collected events will be
+  # sent as a sequence of dataCollected events followed by tracingComplete event.
   event dataCollected
     parameters
       array of object value
```

## Roll protocol to r1075693 — _2022-11-25T04:29:29.000Z_
######  Diff: [`3a71cd0...151a19b`](https://github.com/ChromeDevTools/devtools-protocol/compare/3a71cd0...151a19b)

```diff
@@ browser_protocol.pdl:1031 @@ experimental domain BackgroundService
       string instanceId
       # A list of event-specific information.
       array of EventMetadata eventMetadata
+      # Storage key this event belongs to.
+      string storageKey
 
   # Called with all existing backgroundServiceEvents when enabled, and all new
   # events afterwards if enabled and recording.
```

## Roll protocol to r1075032 — _2022-11-23T04:29:43.000Z_
######  Diff: [`55143fc...3a71cd0`](https://github.com/ChromeDevTools/devtools-protocol/compare/55143fc...3a71cd0)

```diff
@@ browser_protocol.pdl:2099 @@ experimental domain CacheStorage
   # Requests cache names.
   command requestCacheNames
     parameters
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
-      string securityOrigin
+      optional string securityOrigin
+      # Storage key.
+      optional string storageKey
     returns
       # Caches for the security origin.
       array of Cache caches
```

## Roll protocol to r1074451 — _2022-11-22T04:30:40.000Z_
######  Diff: [`f504866...55143fc`](https://github.com/ChromeDevTools/devtools-protocol/compare/f504866...55143fc)

```diff
@@ browser_protocol.pdl:9262 @@ experimental domain Storage
       # Security origin.
       string origin
 
+  # Registers storage key to be notified when an update occurs to its cache storage list.
+  command trackCacheStorageForStorageKey
+    parameters
+      # Storage key.
+      string storageKey
+
   # Registers origin to be notified when an update occurs to its IndexedDB.
   command trackIndexedDBForOrigin
     parameters
@@ -9280,6 +9286,12 @@ experimental domain Storage
       # Security origin.
       string origin
 
+  # Unregisters storage key from receiving notifications for cache storage.
+  command untrackCacheStorageForStorageKey
+    parameters
+      # Storage key.
+      string storageKey
+
   # Unregisters origin from receiving notifications for IndexedDB.
   command untrackIndexedDBForOrigin
     parameters
@@ -9365,6 +9377,8 @@ experimental domain Storage
     parameters
       # Origin to update.
       string origin
+      # Storage key to update.
+      string storageKey
       # Name of cache in origin.
       string cacheName
 
@@ -9373,6 +9387,8 @@ experimental domain Storage
     parameters
       # Origin to update.
       string origin
+      # Storage key to update.
+      string storageKey
 
   # The origin's IndexedDB object store has been modified.
   event indexedDBContentUpdated
```

## Roll protocol to r1073708 — _2022-11-19T04:30:08.000Z_
######  Diff: [`5690c4d...f504866`](https://github.com/ChromeDevTools/devtools-protocol/compare/5690c4d...f504866)

```diff
@@ browser_protocol.pdl:8121 @@ domain Page
     parameters
       enum mode
         none
-        autoaccept
-        autoreject
+        autoAccept
+        autoReject
+        autoOptOut
 
   # Generates a report for testing.
   experimental command generateTestReport
```

## Roll protocol to r1072049 — _2022-11-16T04:31:33.000Z_
######  Diff: [`d66082e...5690c4d`](https://github.com/ChromeDevTools/devtools-protocol/compare/d66082e...5690c4d)

```diff
@@ browser_protocol.pdl:482 @@ experimental domain Audits
       ExcludeInvalidSameParty
       ExcludeSamePartyCrossPartyContext
       ExcludeDomainNonASCII
+      ExcludeThirdPartyCookieBlockedInFirstPartySet
 
   type CookieWarningReason extends string
     enum
@@ -5479,6 +5480,9 @@ domain Network
       SameSiteNoneInsecure
       # The cookie was not stored due to user preferences.
       UserPreferences
+      # The cookie was blocked by third-party cookie blocking between sites in
+      # the same First-Party Set.
+      ThirdPartyBlockedInFirstPartySet
       # The syntax of the Set-Cookie header of the response was invalid.
       SyntaxError
       # The scheme of the connection is not allowed to store cookies.
@@ -5543,6 +5547,9 @@ domain Network
       SameSiteNoneInsecure
       # The cookie was not sent due to user preferences.
       UserPreferences
+      # The cookie was blocked by third-party cookie blocking between sites in
+      # the same First-Party Set.
+      ThirdPartyBlockedInFirstPartySet
       # An unknown error was encountered when trying to send this cookie.
       UnknownError
       # The cookie had the "SameSite=Strict" attribute but came from a response
```

## Roll protocol to r1070637 — _2022-11-12T04:32:08.000Z_
######  Diff: [`6bf5d82...d66082e`](https://github.com/ChromeDevTools/devtools-protocol/compare/6bf5d82...d66082e)

```diff
@@ browser_protocol.pdl:2065 @@ experimental domain CacheStorage
       CacheId cacheId
       # Security origin of the cache.
       string securityOrigin
+      # Storage key of the cache.
+      string storageKey
       # The name of the cache.
       string cacheName
```

## Roll protocol to r1069585 — _2022-11-10T04:34:05.000Z_
######  Diff: [`bac0463...6bf5d82`](https://github.com/ChromeDevTools/devtools-protocol/compare/bac0463...6bf5d82)

```diff
@@ browser_protocol.pdl:1076 @@ domain Browser
       durableStorage
       flash
       geolocation
+      idleDetection
+      localFonts
       midi
       midiSysex
       nfc
@@ -1084,11 +1086,12 @@ domain Browser
       periodicBackgroundSync
       protectedMediaIdentifier
       sensors
+      storageAccess
       videoCapture
       videoCapturePanTiltZoom
-      idleDetection
       wakeLockScreen
       wakeLockSystem
+      windowManagement
 
   experimental type PermissionSetting extends string
     enum
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index b3b97fa..6efcf78 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -458,13 +458,14 @@ domain Debugger
       # New value for breakpoints active state.
       boolean active
 
-  # Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or
-  # no exceptions. Initial pause on exceptions state is `none`.
+  # Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions,
+  # or caught exceptions, no exceptions. Initial pause on exceptions state is `none`.
   command setPauseOnExceptions
     parameters
       # Pause on exceptions mode.
       enum state
         none
+        caught
         uncaught
         all
```

## Roll protocol to r1068969 — _2022-11-09T04:35:00.000Z_
######  Diff: [`8a54e06...bac0463`](https://github.com/ChromeDevTools/devtools-protocol/compare/8a54e06...bac0463)

```diff
@@ browser_protocol.pdl:2237 @@ domain DOM
       scrollbar-corner
       resizer
       input-list-button
-      page-transition
-      page-transition-container
-      page-transition-image-wrapper
-      page-transition-outgoing-image
-      page-transition-incoming-image
+      view-transition
+      view-transition-group
+      view-transition-image-pair
+      view-transition-old
+      view-transition-new
 
   # Shadow root type.
   type ShadowRootType extends string
```

## Roll protocol to r1068494 — _2022-11-08T04:34:24.000Z_
######  Diff: [`f88fa8b...8a54e06`](https://github.com/ChromeDevTools/devtools-protocol/compare/f88fa8b...8a54e06)

```diff
@@ browser_protocol.pdl:1599 @@ experimental domain CSS
       optional StyleSheetId styleSheetId
       # Optional name for the container.
       optional string name
+      # Optional physical axes queried for the container.
+      optional DOM.PhysicalAxes physicalAxes
+      # Optional logical axes queried for the container.
+      optional DOM.LogicalAxes logicalAxes
 
   # CSS Supports at-rule descriptor.
   experimental type CSSSupports extends object
@@ -2253,6 +2257,20 @@ domain DOM
       LimitedQuirksMode
       NoQuirksMode
 
+  # ContainerSelector physical axes
+  type PhysicalAxes extends string
+    enum
+      Horizontal
+      Vertical
+      Both
+
+  # ContainerSelector logical axes
+  type LogicalAxes extends string
+    enum
+      Inline
+      Block
+      Both
+
   # DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes.
   # DOMNode is a base node mirror type.
   type Node extends object
@@ -2865,13 +2883,16 @@ domain DOM
       # Id of the node at given coordinates, only when enabled and requested document.
       optional NodeId nodeId
 
-  # Returns the container of the given node based on container query conditions.
-  # If containerName is given, it will find the nearest container with a matching name;
-  # otherwise it will find the nearest container regardless of its container name.
+  # Returns the query container of the given node based on container query
+  # conditions: containerName, physical, and logical axes. If no axes are
+  # provided, the style container is returned, which is the direct parent or the
+  # closest element with a matching container-name.
   experimental command getContainerForNode
     parameters
       NodeId nodeId
       optional string containerName
+      optional PhysicalAxes physicalAxes
+      optional LogicalAxes logicalAxes
     returns
       # The container node for the given node, or null if not found.
       optional NodeId nodeId
@@ -9300,6 +9321,16 @@ experimental domain Storage
     returns
       array of SharedStorageEntry entries
 
+  # Sets entry with `key` and `value` for a given origin's shared storage.
+  experimental command setSharedStorageEntry
+    parameters
+      string ownerOrigin
+      string key
+      string value
+      # If `ignoreIfPresent` is included and true, then only sets the entry if
+      # `key` doesn't already exist.
+      optional boolean ignoreIfPresent
+
   # Deletes entry for `key` (if it exists) for a given origin's shared storage.
   experimental command deleteSharedStorageEntry
     parameters
```

## Roll protocol to r1067399 — _2022-11-04T04:34:35.000Z_
######  Diff: [`62e017d...f88fa8b`](https://github.com/ChromeDevTools/devtools-protocol/compare/62e017d...f88fa8b)

```diff
@@ browser_protocol.pdl:1094 @@ domain Browser
     enum
       granted
       denied
-      prompt
 
   # Definition of PermissionDescriptor defined in the Permissions API:
   # https://w3c.github.io/permissions/#dictdef-permissiondescriptor.
@@ -3942,18 +3941,10 @@ experimental domain HeadlessExperimental
       optional binary screenshotData
 
   # Disables headless events for the target.
-  command disable
+  deprecated command disable
 
   # Enables headless events for the target.
-  command enable
-
-  # Issued when the target starts or stops needing BeginFrames.
-  # Deprecated. Issue beginFrame unconditionally instead and use result from
-  # beginFrame to detect whether the frames were suppressed.
-  deprecated event needsBeginFramesChanged
-    parameters
-      # True if BeginFrames are needed, false otherwise.
-      boolean needsBeginFrames
+  deprecated command enable
 
 # Input/Output operations for streams produced by DevTools.
 domain IO
@@ -6333,6 +6324,8 @@ domain Network
       experimental ConnectTiming connectTiming
       # The client security state set for the request.
       optional ClientSecurityState clientSecurityState
+      # Whether the site has partitioned cookies stored in a partition different than the current one.
+      optional boolean siteHasCookieInOtherPartition
 
   # Fired when additional information about a responseReceived event is available from the network
   # stack. Not every responseReceived event will have an additional responseReceivedExtraInfo for
@@ -9307,6 +9300,17 @@ experimental domain Storage
     returns
       array of SharedStorageEntry entries
 
+  # Deletes entry for `key` (if it exists) for a given origin's shared storage.
+  experimental command deleteSharedStorageEntry
+    parameters
+      string ownerOrigin
+      string key
+
+  # Clears all entries for a given origin's shared storage.
+  experimental command clearSharedStorageEntries
+    parameters
+      string ownerOrigin
+
   # Enables/disables issuing of sharedStorageAccessed events.
   experimental command setSharedStorageTracking
     parameters
```

## Roll protocol to r1066334 — _2022-11-02T04:46:36.000Z_
######  Diff: [`a417f5f...62e017d`](https://github.com/ChromeDevTools/devtools-protocol/compare/a417f5f...62e017d)

```diff
@@ browser_protocol.pdl:10493 @@ experimental domain WebAuthn
     returns
       AuthenticatorId authenticatorId
 
+  # Resets parameters isBogusSignature, isBadUV, isBadUP to false if they are not present.
+  command setResponseOverrideBits
+    parameters
+      AuthenticatorId authenticatorId
+      # If isBogusSignature is set, overrides the signature in the authenticator response to be zero.
+      # Defaults to false.
+      optional boolean isBogusSignature
+      # If isBadUV is set, overrides the UV bit in the flags in the authenticator response to
+      # be zero. Defaults to false.
+      optional boolean isBadUV
+      # If isBadUP is set, overrides the UP bit in the flags in the authenticator response to
+      # be zero. Defaults to false.
+      optional boolean isBadUP
+
   # Removes the given authenticator.
   command removeVirtualAuthenticator
     parameters
```

## Roll protocol to r1065144 — _2022-10-29T04:33:23.000Z_
######  Diff: [`272cd26...a417f5f`](https://github.com/ChromeDevTools/devtools-protocol/compare/272cd26...a417f5f)

```diff
@@ browser_protocol.pdl:8359 @@ domain Page
       DedicatedWorkerOrWorklet
       OutstandingNetworkRequestOthers
       OutstandingIndexedDBTransaction
-      RequestedNotificationsPermission
       RequestedMIDIPermission
       RequestedAudioCapturePermission
       RequestedVideoCapturePermission
```

## Roll protocol to r1064701 — _2022-10-28T04:35:09.000Z_
######  Diff: [`9be9b0f...272cd26`](https://github.com/ChromeDevTools/devtools-protocol/compare/9be9b0f...272cd26)

```diff
@@ browser_protocol.pdl:9070 @@ experimental domain Storage
       array of InterestGroupAd ads
       array of InterestGroupAd adComponents
 
+  # Enum of shared storage access types.
+  type SharedStorageAccessType extends string
+    enum
+      documentAddModule
+      documentSelectURL
+      documentRun
+      documentSet
+      documentAppend
+      documentDelete
+      documentClear
+      workletSet
+      workletAppend
+      workletDelete
+      workletClear
+      workletGet
+      workletKeys
+      workletEntries
+      workletLength
+      workletRemainingBudget
+
   # Struct for a single key-value pair in an origin's shared storage.
   type SharedStorageEntry extends object
     properties
@@ -9083,6 +9103,58 @@ experimental domain Storage
       integer length
       number remainingBudget
 
+  # Pair of reporting metadata details for a candidate URL for `selectURL()`.
+  type SharedStorageReportingMetadata extends object
+    properties
+      string eventType
+      string reportingUrl
+
+  # Bundles a candidate URL with its reporting metadata.
+  type SharedStorageUrlWithMetadata extends object
+    properties
+      # Spec of candidate URL.
+      string url
+      # Any associated reporting metadata.
+      array of SharedStorageReportingMetadata reportingMetadata
+
+  # Bundles the parameters for shared storage access events whose
+  # presence/absence can vary according to SharedStorageAccessType.
+  type SharedStorageAccessParams extends object
+    properties
+      # Spec of the module script URL.
+      # Present only for SharedStorageAccessType.documentAddModule.
+      optional string scriptSourceUrl
+      # Name of the registered operation to be run.
+      # Present only for SharedStorageAccessType.documentRun and
+      # SharedStorageAccessType.documentSelectURL.
+      optional string operationName
+      # The operation's serialized data in bytes (converted to a string).
+      # Present only for SharedStorageAccessType.documentRun and
+      # SharedStorageAccessType.documentSelectURL.
+      optional string serializedData
+      # Array of candidate URLs' specs, along with any associated metadata.
+      # Present only for SharedStorageAccessType.documentSelectURL.
+      optional array of SharedStorageUrlWithMetadata urlsWithMetadata
+      # Key for a specific entry in an origin's shared storage.
+      # Present only for SharedStorageAccessType.documentSet,
+      # SharedStorageAccessType.documentAppend,
+      # SharedStorageAccessType.documentDelete,
+      # SharedStorageAccessType.workletSet,
+      # SharedStorageAccessType.workletAppend,
+      # SharedStorageAccessType.workletDelete, and
+      # SharedStorageAccessType.workletGet.
+      optional string key
+      # Value for a specific entry in an origin's shared storage.
+      # Present only for SharedStorageAccessType.documentSet,
+      # SharedStorageAccessType.documentAppend,
+      # SharedStorageAccessType.workletSet, and
+      # SharedStorageAccessType.workletAppend.
+      optional string value
+      # Whether or not to set an entry for a key if that key is already present.
+      # Present only for SharedStorageAccessType.documentSet and
+      # SharedStorageAccessType.workletSet.
+      optional boolean ignoreIfPresent
+
   # Returns a storage key given a frame id.
   command getStorageKeyForFrame
     parameters
@@ -9236,6 +9308,11 @@ experimental domain Storage
     returns
       array of SharedStorageEntry entries
 
+  # Enables/disables issuing of sharedStorageAccessed events.
+  experimental command setSharedStorageTracking
+    parameters
+      boolean enable
+
   # A cache's contents have been modified.
   event cacheStorageContentUpdated
     parameters
@@ -9278,6 +9355,22 @@ experimental domain Storage
       string ownerOrigin
       string name
 
+  # Shared storage was accessed by the associated page.
+  # The following parameters are included in all events.
+  event sharedStorageAccessed
+    parameters
+      # Time of the access.
+      Network.TimeSinceEpoch accessTime
+      # Enum value indicating the Shared Storage API method invoked.
+      SharedStorageAccessType type
+      # DevTools Frame Token for the primary frame tree's root.
+      Page.FrameId mainFrameId
+      # Serialized origin for the context that invoked the Shared Storage API.
+      string ownerOrigin
+      # The sub-parameters warapped by `params` are all optional and their
+      # presence/absence depends on `type`.
+      SharedStorageAccessParams params
+
 # The SystemInfo domain defines methods and events for querying low-level system information.
 experimental domain SystemInfo
```

## Roll protocol to r1064177 — _2022-10-27T04:35:18.000Z_
######  Diff: [`c2f8047...9be9b0f`](https://github.com/ChromeDevTools/devtools-protocol/compare/c2f8047...9be9b0f)

```diff
@@ browser_protocol.pdl:7155 @@ domain Page
       ch-width
       clipboard-read
       clipboard-write
+      compute-pressure
       cross-origin-isolated
       direct-sockets
       display-capture
```

## Roll protocol to r1063652 — _2022-10-26T04:39:27.000Z_
######  Diff: [`4194c0a...c2f8047`](https://github.com/ChromeDevTools/devtools-protocol/compare/4194c0a...c2f8047)

```diff
@@ browser_protocol.pdl:8512 @@ domain Page
       SameSiteCrossOriginNavigation
       SameSiteCrossOriginRedirectNotOptIn
       SameSiteCrossOriginNavigationNotOptIn
+      ActivationNavigationParameterMismatch
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1063155 — _2022-10-25T05:01:53.000Z_
######  Diff: [`c84ff3d...4194c0a`](https://github.com/ChromeDevTools/devtools-protocol/compare/c84ff3d...4194c0a)

```diff
@@ browser_protocol.pdl:8470 @@ domain Page
       Activated
       Destroyed
       LowEndDevice
-      CrossOriginRedirect
-      CrossOriginNavigation
       InvalidSchemeRedirect
       InvalidSchemeNavigation
       InProgressNavigation
@@ -8508,6 +8506,12 @@ domain Page
       InactivePageRestriction
       StartFailed
       TimeoutBackgrounded
+      CrossSiteRedirect
+      CrossSiteNavigation
+      SameSiteCrossOriginRedirect
+      SameSiteCrossOriginNavigation
+      SameSiteCrossOriginRedirectNotOptIn
+      SameSiteCrossOriginNavigationNotOptIn
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
@@ -9014,6 +9018,7 @@ experimental domain Storage
       service_workers
       cache_storage
       interest_groups
+      shared_storage
       all
       other
 
@@ -9063,6 +9068,19 @@ experimental domain Storage
       array of InterestGroupAd ads
       array of InterestGroupAd adComponents
 
+  # Struct for a single key-value pair in an origin's shared storage.
+  type SharedStorageEntry extends object
+    properties
+      string key
+      string value
+
+  # Details for an origin's shared storage.
+  type SharedStorageMetadata extends object
+    properties
+      Network.TimeSinceEpoch creationTime
+      integer length
+      number remainingBudget
+
   # Returns a storage key given a frame id.
   command getStorageKeyForFrame
     parameters
@@ -9202,6 +9220,20 @@ experimental domain Storage
     parameters
       boolean enable
 
+  # Gets metadata for an origin's shared storage.
+  experimental command getSharedStorageMetadata
+    parameters
+      string ownerOrigin
+    returns
+      SharedStorageMetadata metadata
+
+  # Gets the entries in an given origin's shared storage.
+  experimental command getSharedStorageEntries
+    parameters
+      string ownerOrigin
+    returns
+      array of SharedStorageEntry entries
+
   # A cache's contents have been modified.
   event cacheStorageContentUpdated
     parameters
```

## Roll protocol to r1061995 — _2022-10-21T04:47:34.000Z_
######  Diff: [`3dde831...c84ff3d`](https://github.com/ChromeDevTools/devtools-protocol/compare/3dde831...c84ff3d)

```diff
@@ browser_protocol.pdl:3908 @@ experimental domain HeadlessExperimental
       optional enum format
         jpeg
         png
+        webp
       # Compression quality from range [0..100] (jpeg only).
       optional integer quality
+      # Optimize image encoding for speed, not for resulting size (defaults to false)
+      optional boolean optimizeForSpeed
 
   # Sends a BeginFrame to the target and returns when the frame was completed. Optionally captures a
   # screenshot from the resulting frame. Requires that the target was created with enabled
@@ -8388,7 +8391,7 @@ domain Page
       InjectedStyleSheet
       KeepaliveRequest
       Dummy
-      # Disabled for render frame host reasons
+      # Disabled for RenderFrameHost reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
       ContentSecurityHandler
       ContentWebAuthenticationAPI
```

## Roll protocol to r1061415 — _2022-10-20T04:46:58.000Z_
######  Diff: [`d42b588...3dde831`](https://github.com/ChromeDevTools/devtools-protocol/compare/d42b588...3dde831)

```diff
@@ browser_protocol.pdl:7595 @@ domain Page
       experimental optional boolean fromSurface
       # Capture the screenshot beyond the viewport. Defaults to false.
       experimental optional boolean captureBeyondViewport
+      # Optimize image encoding for speed, not for resulting size (defaults to false)
+      experimental optional boolean optimizeForSpeed
     returns
       # Base64-encoded image data.
       binary data
@@ -8384,6 +8386,7 @@ domain Page
       OutstandingNetworkRequestDirectSocket
       InjectedJavascript
       InjectedStyleSheet
+      KeepaliveRequest
       Dummy
       # Disabled for render frame host reasons
       # See content/browser/renderer_host/back_forward_cache_disable.h for explanations.
```

## Roll protocol to r1060866 — _2022-10-19T05:00:30.000Z_
######  Diff: [`aca7212...d42b588`](https://github.com/ChromeDevTools/devtools-protocol/compare/aca7212...d42b588)

```diff
@@ browser_protocol.pdl:8135 @@ domain Page
       FrameId parentFrameId
       # JavaScript stack trace of when frame was attached, only set if frame initiated from script.
       optional Runtime.StackTrace stack
-      # Identifies the bottom-most script which caused the frame to be labelled
-      # as an ad. Only sent if frame is labelled as an ad and id is available.
-      # Deprecated: use Page.getAdScriptId instead.
-      experimental deprecated optional AdScriptId adScriptId
 
   # Fired when frame no longer has a scheduled navigation.
   deprecated event frameClearedScheduledNavigation
```

## Roll protocol to r1059612 — _2022-10-15T04:53:37.000Z_
######  Diff: [`ddedcee...aca7212`](https://github.com/ChromeDevTools/devtools-protocol/compare/ddedcee...aca7212)

```diff
@@ browser_protocol.pdl:7682 @@ domain Page
       # Recommendation for manifest's id attribute to match current id computed from start_url
       optional string recommendedId
 
+  experimental command getAdScriptId
+    parameters
+      FrameId frameId
+    returns
+      # Identifies the bottom-most script which caused the frame to be labelled
+      # as an ad. Only sent if frame is labelled as an ad and id is available.
+      optional AdScriptId adScriptId
+
   # Returns all browser cookies for the page and all of its subframes. Depending
   # on the backend support, will return detailed cookie information in the
   # `cookies` field.
@@ -8129,7 +8137,8 @@ domain Page
       optional Runtime.StackTrace stack
       # Identifies the bottom-most script which caused the frame to be labelled
       # as an ad. Only sent if frame is labelled as an ad and id is available.
-      experimental optional AdScriptId adScriptId
+      # Deprecated: use Page.getAdScriptId instead.
+      experimental deprecated optional AdScriptId adScriptId
 
   # Fired when frame no longer has a scheduled navigation.
   deprecated event frameClearedScheduledNavigation
```

## Roll protocol to r1059094 — _2022-10-14T04:59:20.000Z_
######  Diff: [`366164c...ddedcee`](https://github.com/ChromeDevTools/devtools-protocol/compare/366164c...ddedcee)

```diff
@@ browser_protocol.pdl:9945 @@ domain Fetch
       optional string method
       # If set, overrides the post data in the request.
       optional binary postData
-      # If set, overrides the request headers.
+      # If set, overrides the request headers. Note that the overrides do not
+      # extend to subsequent redirect hops, if a redirect happens. Another override
+      # may be applied to a different request produced by a redirect.
       optional array of HeaderEntry headers
       # If set, overrides response interception behavior for this request.
       experimental optional boolean interceptResponse
```

## Roll protocol to r1057312 — _2022-10-11T04:55:46.000Z_
######  Diff: [`02af7d8...366164c`](https://github.com/ChromeDevTools/devtools-protocol/compare/02af7d8...366164c)

```diff
@@ js_protocol.pdl:918 @@ domain Profiler
       # Functions contained in the script that has coverage data.
       array of FunctionCoverage functions
 
-  # Describes a type collected during runtime.
-  experimental type TypeObject extends object
-    properties
-      # Name of a type collected with type profiling.
-      string name
-
-  # Source offset and types for a parameter or return value.
-  experimental type TypeProfileEntry extends object
-    properties
-      # Source offset of the parameter or end of function for return values.
-      integer offset
-      # The types for this parameter or return value.
-      array of TypeObject types
-
-  # Type profile data collected during runtime for a JavaScript script.
-  experimental type ScriptTypeProfile extends object
-    properties
-      # JavaScript script id.
-      Runtime.ScriptId scriptId
-      # JavaScript script name or url.
-      string url
-      # Type profile entries for parameters and return values of the functions in the script.
-      array of TypeProfileEntry entries
-
   command disable
 
   command enable
@@ -976,9 +952,6 @@ domain Profiler
       # Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
       number timestamp
 
-  # Enable type profile.
-  experimental command startTypeProfile
-
   command stop
     returns
       # Recorded profile.
@@ -988,9 +961,6 @@ domain Profiler
   # executing optimized code.
   command stopPreciseCoverage
 
-  # Disable type profile. Disabling releases type profile data collected so far.
-  experimental command stopTypeProfile
-
   # Collect coverage data for the current isolate, and resets execution counters. Precise code
   # coverage needs to have started.
   command takePreciseCoverage
@@ -1000,12 +970,6 @@ domain Profiler
       # Monotonically increasing time (in seconds) when the coverage update was taken in the backend.
       number timestamp
 
-  # Collect type profile.
-  experimental command takeTypeProfile
-    returns
-      # Type profile for all scripts since startTypeProfile() was turned on.
-      array of ScriptTypeProfile result
-
   event consoleProfileFinished
     parameters
       string id
```

## Roll protocol to r1056733 — _2022-10-09T04:46:56.000Z_
######  Diff: [`1e2a599...02af7d8`](https://github.com/ChromeDevTools/devtools-protocol/compare/1e2a599...02af7d8)

```diff
@@ browser_protocol.pdl:5277 @@ domain Network
       # HTTPS DNS protocol upgrade job won a race with a normal connection and
       # an Alternate Protocol job.
       dnsAlpnH3JobWonRace
-      # When the reason is unspecified.
+      # This value is used when the reason is unknown.
       unspecifiedReason
 
   # HTTP response data.
```

## Roll protocol to r1056622 — _2022-10-08T04:34:15.000Z_
######  Diff: [`871805f...1e2a599`](https://github.com/ChromeDevTools/devtools-protocol/compare/871805f...1e2a599)

```diff
@@ browser_protocol.pdl:10036 @@ domain Fetch
       optional array of HeaderEntry responseHeaders
       # If the intercepted request had a corresponding Network.requestWillBeSent event fired for it,
       # then this networkId will be the same as the requestId present in the requestWillBeSent event.
-      optional RequestId networkId
+      optional Network.RequestId networkId
+      # If the request is due to a redirect response from the server, the id of the request that
+      # has caused the redirect.
+      experimental optional RequestId redirectedRequestId
 
   # Issued when the domain is enabled with handleAuthRequests set to true.
   # The request is paused until client responds with continueWithAuth.
```

## Roll protocol to r1055599 — _2022-10-06T04:34:37.000Z_
######  Diff: [`221d16f...871805f`](https://github.com/ChromeDevTools/devtools-protocol/compare/221d16f...871805f)

```diff
@@ browser_protocol.pdl:7166 @@ domain Page
       geolocation
       gyroscope
       hid
-      identity-credential-get
+      identity-credentials-get
       idle-detection
       interest-cohort
       join-ad-interest-group
@@ -7682,8 +7682,9 @@ domain Page
       # Recommendation for manifest's id attribute to match current id computed from start_url
       optional string recommendedId
 
-  # Returns all browser cookies. Depending on the backend support, will return detailed cookie
-  # information in the `cookies` field.
+  # Returns all browser cookies for the page and all of its subframes. Depending
+  # on the backend support, will return detailed cookie information in the
+  # `cookies` field.
   experimental deprecated command getCookies
     # Use 'Network.getCookies' instead
     redirect Network
```

## Roll protocol to r1055124 — _2022-10-05T04:35:05.000Z_
######  Diff: [`6e37e04...221d16f`](https://github.com/ChromeDevTools/devtools-protocol/compare/6e37e04...221d16f)

```diff
@@ browser_protocol.pdl:8495 @@ domain Page
       ActivatedBeforeStarted
       InactivePageRestriction
       StartFailed
+      TimeoutBackgrounded
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1052822 — _2022-09-29T04:58:25.000Z_
######  Diff: [`0ce6bcb...6e37e04`](https://github.com/ChromeDevTools/devtools-protocol/compare/0ce6bcb...6e37e04)

```diff
@@ browser_protocol.pdl:5256 @@ domain Network
       # Type "send-redemption-record" in the Trust Token API.
       Signing
 
+  # The reason why Chrome uses a specific transport protocol for HTTP semantics.
+  experimental type AlternateProtocolUsage extends string
+    enum
+      # Alternate Protocol was used without racing a normal connection.
+      alternativeJobWonWithoutRace
+      # Alternate Protocol was used by winning a race with a normal connection.
+      alternativeJobWonRace
+      # Alternate Protocol was not used by losing a race with a normal connection.
+      mainJobWonRace
+      # Alternate Protocol was not used because no Alternate-Protocol information
+      # was available when the request was issued, but an Alternate-Protocol header
+      # was present in the response.
+      mappingMissing
+      # Alternate Protocol was not used because it was marked broken.
+      broken
+      # HTTPS DNS protocol upgrade job was used without racing with a normal
+      # connection and an Alternate Protocol job.
+      dnsAlpnH3JobWonWithoutRace
+      # HTTPS DNS protocol upgrade job won a race with a normal connection and
+      # an Alternate Protocol job.
+      dnsAlpnH3JobWonRace
+      # When the reason is unspecified.
+      unspecifiedReason
+
   # HTTP response data.
   type Response extends object
     properties
@@ -5301,6 +5325,8 @@ domain Network
       optional string cacheStorageCacheName
       # Protocol used to fetch this request.
       optional string protocol
+      # The reason why Chrome uses a specific transport protocol for HTTP semantics.
+      experimental optional AlternateProtocolUsage alternateProtocolUsage
       # Security state of the request resource.
       Security.SecurityState securityState
       # Security details for the request.
@@ -7106,6 +7132,7 @@ domain Page
       ch-downlink
       ch-ect
       ch-prefers-color-scheme
+      ch-prefers-reduced-motion
       ch-rtt
       ch-save-data
       ch-ua
@@ -7132,7 +7159,6 @@ domain Page
       encrypted-media
       execution-while-out-of-viewport
       execution-while-not-rendered
-      federated-credentials
       focus-without-user-activation
       fullscreen
       frobulate
@@ -7140,6 +7166,7 @@ domain Page
       geolocation
       gyroscope
       hid
+      identity-credential-get
       idle-detection
       interest-cohort
       join-ad-interest-group
```

## Roll protocol to r1052219 — _2022-09-28T04:58:58.000Z_
######  Diff: [`7688064...0ce6bcb`](https://github.com/ChromeDevTools/devtools-protocol/compare/7688064...0ce6bcb)

```diff
@@ browser_protocol.pdl:1 @@ @@ -1,4 +1,4 @@
-# Copyright 2017 The Chromium Authors. All rights reserved.
+# Copyright 2017 The Chromium Authors
 # Use of this source code is governed by a BSD-style license that can be
 # found in the LICENSE file.
 #
@@ -775,8 +775,6 @@ experimental domain Audits
       LocalCSSFileExtensionRejected
       MediaSourceAbortRemove
       MediaSourceDurationTruncatingBuffered
-      NavigateEventRestoreScroll
-      NavigateEventTransitionWhile
       NoSysexWebMIDIWithoutPermission
       NotificationInsecureOrigin
       NotificationPermissionRequestedIframe
@@ -784,6 +782,7 @@ experimental domain Audits
       OpenWebDatabaseInsecureContext
       OverflowVisibleOnReplacedElement
       PaymentInstruments
+      PaymentRequestCSPViolation
       PersistentQuotaType
       PictureSourceSrc
       PrefixedCancelAnimationFrame
@@ -9361,6 +9360,9 @@ domain Target
       # Frame id of originating window (is only set if target has an opener).
       experimental optional Page.FrameId openerFrameId
       experimental optional Browser.BrowserContextID browserContextId
+      # Provides additional details for specific target types. For example, for
+      # the type of "page", this may be set to "portal" or "prerender".
+      experimental optional string subtype
 
   # A filter used by target query/discovery/auto-attach operations.
   experimental type FilterEntry extends object
```

## Roll protocol to r1051614 — _2022-09-27T04:54:05.000Z_
######  Diff: [`32a0581...7688064`](https://github.com/ChromeDevTools/devtools-protocol/compare/32a0581...7688064)

```diff
@@ browser_protocol.pdl:783 @@ experimental domain Audits
       ObsoleteWebRtcCipherSuite
       OpenWebDatabaseInsecureContext
       OverflowVisibleOnReplacedElement
+      PaymentInstruments
       PersistentQuotaType
       PictureSourceSrc
       PrefixedCancelAnimationFrame
```

## Roll protocol to r1049481 — _2022-09-21T04:59:07.000Z_
######  Diff: [`8f2c950...32a0581`](https://github.com/ChromeDevTools/devtools-protocol/compare/8f2c950...32a0581)

```diff
@@ browser_protocol.pdl:8466 @@ domain Page
       DataSaverEnabled
       HasEffectiveUrl
       ActivatedBeforeStarted
+      InactivePageRestriction
+      StartFailed
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1048947 — _2022-09-20T04:57:57.000Z_
######  Diff: [`8fd85c8...8f2c950`](https://github.com/ChromeDevTools/devtools-protocol/compare/8fd85c8...8f2c950)

```diff
@@ browser_protocol.pdl:8458 @@ domain Page
       AudioOutputDeviceRequested
       MixedContent
       TriggerBackgrounded
-      EmbedderTriggeredAndSameOriginRedirected
       EmbedderTriggeredAndCrossOriginRedirected
       MemoryLimitExceeded
       # Prerenders can be cancelled when Chrome uses excessive memory. This is
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index 8d8211b..2d56043 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -766,6 +766,22 @@ experimental domain HeapProfiler
       # Average sample interval in bytes. Poisson distribution is used for the intervals. The
       # default value is 32768 bytes.
       optional number samplingInterval
+      # By default, the sampling heap profiler reports only objects which are
+      # still alive when the profile is returned via getSamplingProfile or
+      # stopSampling, which is useful for determining what functions contribute
+      # the most to steady-state memory usage. This flag instructs the sampling
+      # heap profiler to also include information about objects discarded by
+      # major GC, which will show which functions cause large temporary memory
+      # usage or long GC pauses.
+      optional boolean includeObjectsCollectedByMajorGC
+      # By default, the sampling heap profiler reports only objects which are
+      # still alive when the profile is returned via getSamplingProfile or
+      # stopSampling, which is useful for determining what functions contribute
+      # the most to steady-state memory usage. This flag instructs the sampling
+      # heap profiler to also include information about objects discarded by
+      # minor GC, which is useful when tuning a latency-sensitive application
+      # for minimal GC activity.
+      optional boolean includeObjectsCollectedByMinorGC
 
   command startTrackingHeapObjects
     parameters
```

## Roll protocol to r1048352 — _2022-09-17T04:46:41.000Z_
######  Diff: [`f628653...8fd85c8`](https://github.com/ChromeDevTools/devtools-protocol/compare/f628653...8fd85c8)

```diff
@@ browser_protocol.pdl:772 @@ experimental domain Audits
       HostCandidateAttributeGetter
       IdentityInCanMakePaymentEvent
       InsecurePrivateNetworkSubresourceRequest
-      LegacyConstraintGoogIPv6
       LocalCSSFileExtensionRejected
       MediaSourceAbortRemove
       MediaSourceDurationTruncatingBuffered
```

## Roll protocol to r1047822 — _2022-09-16T04:59:17.000Z_
######  Diff: [`3c081bc...f628653`](https://github.com/ChromeDevTools/devtools-protocol/compare/3c081bc...f628653)

```diff
@@ browser_protocol.pdl:8467 @@ domain Page
       FailToGetMemoryUsage
       DataSaverEnabled
       HasEffectiveUrl
+      ActivatedBeforeStarted
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1046751 — _2022-09-14T04:56:53.000Z_
######  Diff: [`379658e...3c081bc`](https://github.com/ChromeDevTools/devtools-protocol/compare/379658e...3c081bc)

```diff
@@ browser_protocol.pdl:8475 @@ domain Page
       FrameId initiatingFrameId
       string prerenderingUrl
       PrerenderFinalStatus finalStatus
-      # This is used to give users more information about the cancellation details,
-      # and this will be formatted for display.
-      optional string reasonDetails
+      # This is used to give users more information about the name of the API call
+      # that is incompatible with prerender and has caused the cancellation of the attempt
+      optional string disallowedApiMethod
 
   event loadEventFired
     parameters
```

## Roll protocol to r1045489 — _2022-09-10T04:51:55.000Z_
######  Diff: [`08793fb...379658e`](https://github.com/ChromeDevTools/devtools-protocol/compare/08793fb...379658e)

```diff
@@ browser_protocol.pdl:701 @@ experimental domain Audits
   type AttributionReportingIssueType extends string
     enum
       PermissionPolicyDisabled
+      PermissionPolicyNotDelegated
       UntrustworthyReportingOrigin
       InsecureContext
       # TODO(apaseltiner): Rename this to InvalidRegisterSourceHeader
```

## Roll protocol to r1044932 — _2022-09-09T04:49:16.000Z_
######  Diff: [`6ea69cb...08793fb`](https://github.com/ChromeDevTools/devtools-protocol/compare/6ea69cb...08793fb)

```diff
@@ browser_protocol.pdl:2926 @@ domain DOM
     parameters
       # Id of the node that has changed.
       NodeId parentNodeId
-      # If of the previous siblint.
+      # Id of the previous sibling.
       NodeId previousNodeId
       # Inserted node data.
       Node node
```

## Roll protocol to r1040073 — _2022-08-27T04:44:13.000Z_
######  Diff: [`4561609...6ea69cb`](https://github.com/ChromeDevTools/devtools-protocol/compare/4561609...6ea69cb)

```diff
@@ browser_protocol.pdl:835 @@ experimental domain Audits
   # all cases except for success.
   type FederatedAuthRequestIssueReason extends string
     enum
-      ApprovalDeclined
+      ShouldEmbargo
       TooManyRequests
       ManifestListHttpNotFound
       ManifestListNoResponse
@@ -860,6 +860,7 @@ experimental domain Audits
       IdTokenInvalidRequest
       ErrorIdToken
       Canceled
+      RpPageNotVisible
 
   # This issue tracks client hints related issues. It's used to deprecate old
   # features, encourage the use of new ones, and provide general guidance.
```

## Roll protocol to r1039585 — _2022-08-26T04:57:38.000Z_
######  Diff: [`c6dfb99...4561609`](https://github.com/ChromeDevTools/devtools-protocol/compare/c6dfb99...4561609)

```diff
@@ browser_protocol.pdl:8464 @@ domain Page
       # recorded when it fails to get the memory usage.
       FailToGetMemoryUsage
       DataSaverEnabled
+      HasEffectiveUrl
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1036444 — _2022-08-18T04:47:13.000Z_
######  Diff: [`5bd2c6a...c6dfb99`](https://github.com/ChromeDevTools/devtools-protocol/compare/5bd2c6a...c6dfb99)

```diff
@@ browser_protocol.pdl:7156 @@ domain Page
       serial
       shared-autofill
       shared-storage
-      storage-access-api
+      storage-access
       sync-xhr
       trust-token-redemption
       unload
```

## Roll protocol to r1034970 — _2022-08-15T04:47:01.000Z_
######  Diff: [`c5cb34c...5bd2c6a`](https://github.com/ChromeDevTools/devtools-protocol/compare/c5cb34c...5bd2c6a)

```diff
@@ browser_protocol.pdl:8459 @@ domain Page
       TriggerBackgrounded
       EmbedderTriggeredAndSameOriginRedirected
       EmbedderTriggeredAndCrossOriginRedirected
-      EmbedderTriggeredAndDestroyed
       MemoryLimitExceeded
       # Prerenders can be cancelled when Chrome uses excessive memory. This is
       # recorded when it fails to get the memory usage.
       FailToGetMemoryUsage
+      DataSaverEnabled
 
   # Fired when a prerender attempt is completed.
   experimental event prerenderAttemptCompleted
```

## Roll protocol to r1034791 — _2022-08-13T04:31:31.000Z_
######  Diff: [`181b0dd...c5cb34c`](https://github.com/ChromeDevTools/devtools-protocol/compare/181b0dd...c5cb34c)

```diff
@@ browser_protocol.pdl:1537 @@ experimental domain CSS
       optional boolean disabled
       # The entire property range in the enclosing style declaration (if available).
       optional SourceRange range
+      # Parsed longhand components of this property if it is a shorthand.
+      # This field will be empty if the given property is not a shorthand.
+      experimental optional array of CSSProperty longhandProperties
 
   # CSS media rule descriptor.
   type CSSMedia extends object
```

## Roll protocol to r1033355 — _2022-08-10T04:31:04.000Z_
######  Diff: [`958f979...181b0dd`](https://github.com/ChromeDevTools/devtools-protocol/compare/958f979...181b0dd)

```diff
@@ browser_protocol.pdl:7156 @@ domain Page
       storage-access-api
       sync-xhr
       trust-token-redemption
+      unload
       usb
       vertical-scroll
       web-share
```

## Roll protocol to r1032873 — _2022-08-09T04:34:16.000Z_
######  Diff: [`4f1ab67...958f979`](https://github.com/ChromeDevTools/devtools-protocol/compare/4f1ab67...958f979)

```diff
@@ browser_protocol.pdl:709 @@ experimental domain Audits
       InvalidEligibleHeader
       TooManyConcurrentRequests
       SourceAndTriggerHeaders
+      SourceIgnored
+      TriggerIgnored
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
```

## Roll protocol to r1032240 — _2022-08-06T04:31:26.000Z_
######  Diff: [`4b0d166...4f1ab67`](https://github.com/ChromeDevTools/devtools-protocol/compare/4b0d166...4f1ab67)

```diff
@@ browser_protocol.pdl:708 @@ experimental domain Audits
       InvalidRegisterTriggerHeader
       InvalidEligibleHeader
       TooManyConcurrentRequests
+      SourceAndTriggerHeaders
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
@@ -8459,12 +8460,15 @@ domain Page
       FailToGetMemoryUsage
 
   # Fired when a prerender attempt is completed.
-  event prerenderAttemptCompleted
+  experimental event prerenderAttemptCompleted
     parameters
       # The frame id of the frame initiating prerendering.
       FrameId initiatingFrameId
       string prerenderingUrl
       PrerenderFinalStatus finalStatus
+      # This is used to give users more information about the cancellation details,
+      # and this will be formatted for display.
+      optional string reasonDetails
 
   event loadEventFired
     parameters
```

## Roll protocol to r1031356 — _2022-08-04T04:34:29.000Z_
######  Diff: [`ced9091...4b0d166`](https://github.com/ChromeDevTools/devtools-protocol/compare/ced9091...4b0d166)

```diff
@@ browser_protocol.pdl:845 @@ experimental domain Audits
       ClientMetadataHttpNotFound
       ClientMetadataNoResponse
       ClientMetadataInvalidResponse
-      ClientMetadataMissingPrivacyPolicyUrl
       DisabledInSettings
       ErrorFetchingSignin
       InvalidSigninResponse
```

## Roll protocol to r1030896 — _2022-08-03T04:47:29.000Z_
######  Diff: [`750f434...ced9091`](https://github.com/ChromeDevTools/devtools-protocol/compare/750f434...ced9091)

```diff
@@ browser_protocol.pdl:481 @@ experimental domain Audits
       ExcludeSameSiteStrict
       ExcludeInvalidSameParty
       ExcludeSamePartyCrossPartyContext
+      ExcludeDomainNonASCII
 
   type CookieWarningReason extends string
     enum
@@ -493,6 +494,7 @@ experimental domain Audits
       WarnSameSiteLaxCrossDowngradeStrict
       WarnSameSiteLaxCrossDowngradeLax
       WarnAttributeValueExceedsMaxSize
+      WarnDomainNonASCII
 
   type CookieOperation extends string
     enum
@@ -4181,8 +4183,11 @@ experimental domain IndexedDB
   # Requests database names for given security origin.
   command requestDatabaseNames
     parameters
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
-      string securityOrigin
+      optional string securityOrigin
+      # Storage key.
+      optional string storageKey
     returns
       # Database names for origin.
       array of string databaseNames
```

## Roll protocol to r1030398 — _2022-08-02T04:50:11.000Z_
######  Diff: [`18fb7c3...750f434`](https://github.com/ChromeDevTools/devtools-protocol/compare/18fb7c3...750f434)

```diff
@@ browser_protocol.pdl:705 @@ experimental domain Audits
       InvalidHeader
       InvalidRegisterTriggerHeader
       InvalidEligibleHeader
+      TooManyConcurrentRequests
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
```

## Roll protocol to r1030018 — _2022-07-30T04:33:35.000Z_
######  Diff: [`1ad73ad...18fb7c3`](https://github.com/ChromeDevTools/devtools-protocol/compare/1ad73ad...18fb7c3)

```diff
@@ browser_protocol.pdl:9091 @@ experimental domain Storage
       # Security origin.
       string origin
 
+  # Registers storage key to be notified when an update occurs to its IndexedDB.
+  command trackIndexedDBForStorageKey
+    parameters
+      # Storage key.
+      string storageKey
+
   # Unregisters origin from receiving notifications for cache storage.
   command untrackCacheStorageForOrigin
     parameters
@@ -9103,6 +9109,12 @@ experimental domain Storage
       # Security origin.
       string origin
 
+  # Unregisters storage key from receiving notifications for IndexedDB.
+  command untrackIndexedDBForStorageKey
+    parameters
+      # Storage key.
+      string storageKey
+
   # Returns the number of stored Trust Tokens per issuer for the
   # current browsing context.
   experimental command getTrustTokens
@@ -9150,6 +9162,8 @@ experimental domain Storage
     parameters
       # Origin to update.
       string origin
+      # Storage key to update.
+      string storageKey
       # Database to update.
       string databaseName
       # ObjectStore to update.
@@ -9160,6 +9174,8 @@ experimental domain Storage
     parameters
       # Origin to update.
       string origin
+      # Storage key to update.
+      string storageKey
 
   # One of the interest groups was accessed by the associated page.
   event interestGroupAccessed
@@ -9330,13 +9346,16 @@ domain Target
   experimental type FilterEntry extends object
     properties
       # If set, causes exclusion of mathcing targets from the list.
-      # The remainder of filter entries in the filter arrat are ignored.
       optional boolean exclude
       # If not present, matches any type.
       optional string type
 
-  # If filter is not specified, the one assumed is [{type: "browser", exclude: true}, {}]
-  # (i.e. include everything but browser).
+  # The entries in TargetFilter are matched sequentially against targets and
+  # the first entry that matches determines if the target is included or not,
+  # depending on the value of `exclude` field in the entry.
+  # If filter is not specified, the one assumed is
+  # [{type: "browser", exclude: true}, {type: "tab", exclude: true}, {}]
+  # (i.e. include everything but `browser` and `tab`).
   experimental type TargetFilter extends array of FilterEntry
 
   experimental type RemoteLocation extends object
```

## Roll protocol to r1029622 — _2022-07-29T04:36:32.000Z_
######  Diff: [`d36a521...1ad73ad`](https://github.com/ChromeDevTools/devtools-protocol/compare/d36a521...1ad73ad)

```diff
@@ browser_protocol.pdl:9326 @@ domain Target
       experimental optional Page.FrameId openerFrameId
       experimental optional Browser.BrowserContextID browserContextId
 
+  # A filter used by target query/discovery/auto-attach operations.
+  experimental type FilterEntry extends object
+    properties
+      # If set, causes exclusion of mathcing targets from the list.
+      # The remainder of filter entries in the filter arrat are ignored.
+      optional boolean exclude
+      # If not present, matches any type.
+      optional string type
+
+  # If filter is not specified, the one assumed is [{type: "browser", exclude: true}, {}]
+  # (i.e. include everything but browser).
+  experimental type TargetFilter extends array of FilterEntry
+
   experimental type RemoteLocation extends object
     properties
       string host
@@ -9389,7 +9402,6 @@ domain Target
       # An optional list of origins to grant unlimited cross-origin access to.
       # Parts of the URL other than those constituting origin are ignored.
       optional array of string originsWithUniversalNetworkAccess
-
     returns
       # The id of the context created.
       Browser.BrowserContextID browserContextId
@@ -9446,6 +9458,11 @@ domain Target
 
   # Retrieves a list of available targets.
   command getTargets
+    parameters
+      # Only targets matching filter will be reported. If filter is not specified
+      # and target discovery is currently enabled, a filter used for target discovery
+      # is used for consistency.
+      experimental optional TargetFilter filter
     returns
       # The list of targets.
       array of TargetInfo targetInfos
@@ -9477,6 +9494,8 @@ domain Target
       # We plan to make this the default, deprecate non-flattened mode,
       # and eventually retire it. See crbug.com/991325.
       optional boolean flatten
+      # Only targets matching filter will be attached.
+      experimental optional TargetFilter filter
 
   # Adds the specified target to the list of targets that will be monitored for any related target
   # creation (such as child frames, child workers and new versions of service worker) and reported
@@ -9489,6 +9508,8 @@ domain Target
       # Whether to pause new targets when attaching to them. Use `Runtime.runIfWaitingForDebugger`
       # to run paused targets.
       boolean waitForDebuggerOnStart
+      # Only targets matching filter will be attached.
+      experimental optional TargetFilter filter
 
   # Controls whether to discover available targets and notify via
   # `targetCreated/targetInfoChanged/targetDestroyed` events.
@@ -9496,6 +9517,9 @@ domain Target
     parameters
       # Whether to discover available targets.
       boolean discover
+      # Only targets matching filter will be attached. If `discover` is false,
+      # `filter` must be omitted or empty.
+      experimental optional TargetFilter filter
 
   # Enables target discovery for the specified locations, when `setDiscoverTargets` was set to
   # `true`.
```

## Roll protocol to r1029085 — _2022-07-28T04:34:38.000Z_
######  Diff: [`47224e5...d36a521`](https://github.com/ChromeDevTools/devtools-protocol/compare/47224e5...d36a521)

```diff
@@ browser_protocol.pdl:699 @@ experimental domain Audits
   type AttributionReportingIssueType extends string
     enum
       PermissionPolicyDisabled
-      # TODO(apaseltiner): Remove this once it is no longer referenced by the frontend.
-      AttributionSourceUntrustworthyOrigin
-      # TODO(apaseltiner): Remove this once it is no longer referenced by the frontend.
-      AttributionUntrustworthyOrigin
       UntrustworthyReportingOrigin
       InsecureContext
       # TODO(apaseltiner): Rename this to InvalidRegisterSourceHeader
       InvalidHeader
       InvalidRegisterTriggerHeader
+      InvalidEligibleHeader
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
   type AttributionReportingIssueDetails extends object
     properties
       AttributionReportingIssueType violationType
-      # TODO(apaseltiner): Remove this once it is no longer referenced by the frontend.
-      optional AffectedFrame frame
       optional AffectedRequest request
       optional DOM.BackendNodeId violatingNodeId
       optional string invalidParameter
@@ -4125,8 +4120,11 @@ experimental domain IndexedDB
   # Requests data from object store or index.
   command requestData
     parameters
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
-      string securityOrigin
+      optional string securityOrigin
+      # Storage key.
+      optional string storageKey
       # Database name.
       string databaseName
       # Object store name.
@@ -4168,8 +4166,11 @@ experimental domain IndexedDB
   # Requests database with given name in given frame.
   command requestDatabase
     parameters
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
-      string securityOrigin
+      optional string securityOrigin
+      # Storage key.
+      optional string storageKey
       # Database name.
       string databaseName
     returns
```

## Roll protocol to r1028580 — _2022-07-27T04:39:00.000Z_
######  Diff: [`51ea7c8...47224e5`](https://github.com/ChromeDevTools/devtools-protocol/compare/51ea7c8...47224e5)

```diff
@@ browser_protocol.pdl:782 @@ experimental domain Audits
       ObsoleteWebRtcCipherSuite
       OpenWebDatabaseInsecureContext
       OverflowVisibleOnReplacedElement
+      PersistentQuotaType
       PictureSourceSrc
       PrefixedCancelAnimationFrame
       PrefixedRequestAnimationFrame
@@ -4105,7 +4106,11 @@ experimental domain IndexedDB
   # Delete a range of entries from an object store
   command deleteObjectStoreEntries
     parameters
-      string securityOrigin
+      # At least and at most one of securityOrigin, storageKey must be specified.
+      # Security origin.
+      optional string securityOrigin
+      # Storage key.
+      optional string storageKey
       string databaseName
       string objectStoreName
       # Range of entry keys to delete
@@ -4143,8 +4148,11 @@ experimental domain IndexedDB
   # Gets metadata of an object store
   command getMetadata
     parameters
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
-      string securityOrigin
+      optional string securityOrigin
+      # Storage key.
+      optional string storageKey
       # Database name.
       string databaseName
       # Object store name.
```

## Roll protocol to r1028116 — _2022-07-26T04:49:26.000Z_
######  Diff: [`5036b2e...2a10dd2`](https://github.com/ChromeDevTools/devtools-protocol/compare/5036b2e...2a10dd2)

```diff
@@ browser_protocol.pdl:699 @@ experimental domain Audits
   type AttributionReportingIssueType extends string
     enum
       PermissionPolicyDisabled
+      # TODO(apaseltiner): Remove this once it is no longer referenced by the frontend.
       AttributionSourceUntrustworthyOrigin
+      # TODO(apaseltiner): Remove this once it is no longer referenced by the frontend.
       AttributionUntrustworthyOrigin
+      UntrustworthyReportingOrigin
+      InsecureContext
+      # TODO(apaseltiner): Rename this to InvalidRegisterSourceHeader
       InvalidHeader
+      InvalidRegisterTriggerHeader
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/attribution-reporting-api
   type AttributionReportingIssueDetails extends object
     properties
       AttributionReportingIssueType violationType
+      # TODO(apaseltiner): Remove this once it is no longer referenced by the frontend.
       optional AffectedFrame frame
       optional AffectedRequest request
       optional DOM.BackendNodeId violatingNodeId
@@ -4074,8 +4081,11 @@ experimental domain IndexedDB
   # Clears all entries from an object store.
   command clearObjectStore
     parameters
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
-      string securityOrigin
+      optional string securityOrigin
+      # Storage key.
+      optional string storageKey
       # Database name.
       string databaseName
       # Object store name.
@@ -4084,8 +4094,11 @@ experimental domain IndexedDB
   # Deletes a database.
   command deleteDatabase
     parameters
+      # At least and at most one of securityOrigin, storageKey must be specified.
       # Security origin.
-      string securityOrigin
+      optional string securityOrigin
+      # Storage key.
+      optional string storageKey
       # Database name.
       string databaseName
 
@@ -8426,6 +8439,10 @@ domain Page
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

## Roll protocol to r1027518 — _2022-07-23T04:32:37.000Z_
######  Diff: [`84a4545...5036b2e`](https://github.com/ChromeDevTools/devtools-protocol/compare/84a4545...5036b2e)

```diff
@@ js_protocol.pdl:261 @@ domain Debugger
       optional string streamId
       # The total number of lines in the disassembly text.
       integer totalNumberOfLines
-      # The offsets of all function bodies plus one additional entry pointing
-      # one by past the end of the last function.
+      # The offsets of all function bodies, in the format [start1, end1,
+      # start2, end2, ...] where all ends are exclusive.
       array of integer functionBodyOffsets
       # The first chunk of disassembly.
       WasmDisassemblyChunk chunk
```

## Roll protocol to r1027117 — _2022-07-22T04:34:56.000Z_
######  Diff: [`d99c911...84a4545`](https://github.com/ChromeDevTools/devtools-protocol/compare/d99c911...84a4545)

```diff
@@ browser_protocol.pdl:168 @@ experimental domain Accessibility
       optional array of AXProperty ignoredReasons
       # This `Node`'s role, whether explicit or implicit.
       optional AXValue role
+      # This `Node`'s Chrome raw role.
+      optional AXValue chromeRole
       # The accessible name for this `Node`.
       optional AXValue name
       # The accessible description for this `Node`.
@@ -772,6 +774,7 @@ experimental domain Audits
       NotificationPermissionRequestedIframe
       ObsoleteWebRtcCipherSuite
       OpenWebDatabaseInsecureContext
+      OverflowVisibleOnReplacedElement
       PictureSourceSrc
       PrefixedCancelAnimationFrame
       PrefixedRequestAnimationFrame
@@ -2682,7 +2685,7 @@ domain DOM
       array of NodeId nodeIds
 
   # Returns NodeIds of current top layer elements.
-  # Top layer is rendered closest to the user within a viewport, therefore its elements always 
+  # Top layer is rendered closest to the user within a viewport, therefore its elements always
   # appear on top of all other content.
   experimental command getTopLayerElements
     returns
@@ -8990,6 +8993,14 @@ experimental domain Storage
       # Comma separated list of StorageType to clear.
       string storageTypes
 
+  # Clears storage for storage key.
+  command clearDataForStorageKey
+    parameters
+      # Storage key.
+      string storageKey
+      # Comma separated list of StorageType to clear.
+      string storageTypes
+
   # Returns all browser cookies.
   command getCookies
     parameters
```

## Roll protocol to r1026613 — _2022-07-21T04:34:49.000Z_
######  Diff: [`523543a...d99c911`](https://github.com/ChromeDevTools/devtools-protocol/compare/523543a...d99c911)

```diff
@@ browser_protocol.pdl:765 @@ experimental domain Audits
       LocalCSSFileExtensionRejected
       MediaSourceAbortRemove
       MediaSourceDurationTruncatingBuffered
+      NavigateEventRestoreScroll
+      NavigateEventTransitionWhile
       NoSysexWebMIDIWithoutPermission
       NotificationInsecureOrigin
       NotificationPermissionRequestedIframe
```

## Roll protocol to r1026105 — _2022-07-20T04:34:23.000Z_
######  Diff: [`c9c207e...523543a`](https://github.com/ChromeDevTools/devtools-protocol/compare/c9c207e...523543a)

```diff
@@ browser_protocol.pdl:754 @@ experimental domain Audits
       DeprecationExample
       DocumentDomainSettingWithoutOriginAgentClusterHeader
       EventPath
+      ExpectCTHeader
       GeolocationInsecureOrigin
       GeolocationInsecureOriginDeprecatedNotRemoved
       GetUserMediaInsecureOrigin
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index 8e43695..7fd51df 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -244,6 +244,40 @@ domain Debugger
       # Wasm bytecode.
       optional binary bytecode
 
+  experimental type WasmDisassemblyChunk extends object
+    properties
+      # The next chunk of disassembled lines.
+      array of string lines
+      # The bytecode offsets describing the start of each line.
+      array of integer bytecodeOffsets
+
+  experimental command disassembleWasmModule
+    parameters
+      # Id of the script to disassemble
+      Runtime.ScriptId scriptId
+    returns
+      # For large modules, return a stream from which additional chunks of
+      # disassembly can be read successively.
+      optional string streamId
+      # The total number of lines in the disassembly text.
+      integer totalNumberOfLines
+      # The offsets of all function bodies plus one additional entry pointing
+      # one by past the end of the last function.
+      array of integer functionBodyOffsets
+      # The first chunk of disassembly.
+      WasmDisassemblyChunk chunk
+
+  # Disassemble the next chunk of lines for the module corresponding to the
+  # stream. If disassembly is complete, this API will invalidate the streamId
+  # and return an empty chunk. Any subsequent calls for the now invalid stream
+  # will return errors.
+  experimental command nextWasmDisassemblyChunk
+    parameters
+      string streamId
+    returns
+      # The next chunk of disassembly.
+      WasmDisassemblyChunk chunk
+
   # This command is deprecated. Use getScriptSource instead.
   deprecated command getWasmBytecode
     parameters
```

## Roll protocol to r1025565 — _2022-07-19T04:49:30.000Z_
######  Diff: [`4946b04...d27d2d7`](https://github.com/ChromeDevTools/devtools-protocol/compare/4946b04...d27d2d7)

```diff
@@ browser_protocol.pdl:754 @@ experimental domain Audits
       DeprecationExample
       DocumentDomainSettingWithoutOriginAgentClusterHeader
       EventPath
-      ExpectCTHeader
       GeolocationInsecureOrigin
       GeolocationInsecureOriginDeprecatedNotRemoved
       GetUserMediaInsecureOrigin
@@ -5105,6 +5104,12 @@ domain Network
       array of SignedCertificateTimestamp signedCertificateTimestampList
       # Whether the request complied with Certificate Transparency policy
       CertificateTransparencyCompliance certificateTransparencyCompliance
+      # The signature algorithm used by the server in the TLS server signature,
+      # represented as a TLS SignatureScheme code point. Omitted if not
+      # applicable or not known.
+      optional integer serverSignatureAlgorithm
+      # Whether the connection used Encrypted ClientHello
+      boolean encryptedClientHello
 
   # Whether the request complied with Certificate Transparency policy.
   type CertificateTransparencyCompliance extends string
```

## Roll protocol to r1025007 — _2022-07-16T04:32:11.000Z_
######  Diff: [`a7636c9...7263e11`](https://github.com/ChromeDevTools/devtools-protocol/compare/a7636c9...7263e11)

```diff
@@ browser_protocol.pdl:754 @@ experimental domain Audits
       DeprecationExample
       DocumentDomainSettingWithoutOriginAgentClusterHeader
       EventPath
+      ExpectCTHeader
       GeolocationInsecureOrigin
       GeolocationInsecureOriginDeprecatedNotRemoved
       GetUserMediaInsecureOrigin
@@ -4875,6 +4876,7 @@ domain Network
       TextTrack
       XHR
       Fetch
+      Prefetch
       EventSource
       WebSocket
       Manifest
```

## Roll protocol to r1024111 — _2022-07-14T04:35:31.000Z_
######  Diff: [`ec96605...28ec0d8`](https://github.com/ChromeDevTools/devtools-protocol/compare/ec96605...28ec0d8)

```diff
@@ browser_protocol.pdl:7109 @@ domain Page
       screen-wake-lock
       serial
       shared-autofill
+      shared-storage
       storage-access-api
       sync-xhr
       trust-token-redemption
@@ -8412,10 +8413,6 @@ domain Page
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

## Roll protocol to r1023572 — _2022-07-13T04:33:15.000Z_
######  Diff: [`e4b5ddd...3f04136`](https://github.com/ChromeDevTools/devtools-protocol/compare/e4b5ddd...3f04136)

```diff
@@ browser_protocol.pdl:8412 @@ domain Page
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

## Roll protocol to r1022601 — _2022-07-11T07:28:20.000Z_
######  Diff: [`5cde748...82bd267`](https://github.com/ChromeDevTools/devtools-protocol/compare/5cde748...82bd267)

```diff
@@ browser_protocol.pdl:1811 @@ experimental domain CSS
       optional array of InheritedPseudoElementMatches inheritedPseudoElements
       # A list of CSS keyframed animations matching this node.
       optional array of CSSKeyframesRule cssKeyframesRules
+      # Id of the first parent element that does not have display: contents.
+      experimental optional DOM.NodeId parentLayoutNodeId
 
   # Returns all media queries parsed by the rendering engine.
   command getMediaQueries
```

## Roll protocol to r1019158 — _2022-06-29T15:28:08.000Z_
######  Diff: [`a0e4067...f41d3ce`](https://github.com/ChromeDevTools/devtools-protocol/compare/a0e4067...f41d3ce)

```diff
@@ browser_protocol.pdl:758 @@ experimental domain Audits
       GeolocationInsecureOriginDeprecatedNotRemoved
       GetUserMediaInsecureOrigin
       HostCandidateAttributeGetter
+      IdentityInCanMakePaymentEvent
       InsecurePrivateNetworkSubresourceRequest
       LegacyConstraintGoogIPv6
       LocalCSSFileExtensionRejected
@@ -767,6 +768,7 @@ experimental domain Audits
       NotificationInsecureOrigin
       NotificationPermissionRequestedIframe
       ObsoleteWebRtcCipherSuite
+      OpenWebDatabaseInsecureContext
       PictureSourceSrc
       PrefixedCancelAnimationFrame
       PrefixedRequestAnimationFrame
@@ -1330,6 +1332,8 @@ experimental domain CSS
     properties
       # Pseudo element type.
       DOM.PseudoType pseudoType
+      # Pseudo element custom ident.
+      optional string pseudoIdentifier
       # Matches of CSS rules applicable to the pseudo style.
       array of RuleMatch matches
 
@@ -1440,6 +1444,9 @@ experimental domain CSS
       # Cascade layer array. Contains the layer hierarchy that this rule belongs to starting
       # with the innermost layer and going outwards.
       experimental optional array of CSSLayer layers
+      # @scope CSS at-rule array.
+      # The array enumerates @scope at-rules starting with the innermost one, going outwards.
+      experimental optional array of CSSScope scopes
 
   # CSS coverage information.
   type RuleUsage extends object
@@ -1589,6 +1596,17 @@ experimental domain CSS
       # Identifier of the stylesheet containing this object (if exists).
       optional StyleSheetId styleSheetId
 
+  # CSS Scope at-rule descriptor.
+  experimental type CSSScope extends object
+    properties
+      # Scope rule text.
+      string text
+      # The associated rule header range in the enclosing stylesheet (if
+      # available).
+      optional SourceRange range
+      # Identifier of the stylesheet containing this object (if exists).
+      optional StyleSheetId styleSheetId
+
   # CSS Layer at-rule descriptor.
   experimental type CSSLayer extends object
     properties
@@ -1649,6 +1667,8 @@ experimental domain CSS
       string fontWeight
       # The font-stretch.
       string fontStretch
+      # The font-display.
+      string fontDisplay
       # The unicode-range.
       string unicodeRange
       # The src.
@@ -1889,6 +1909,16 @@ experimental domain CSS
       # The resulting CSS Supports rule after modification.
       CSSSupports supports
 
+  # Modifies the expression of a scope at-rule.
+  experimental command setScopeText
+    parameters
+      StyleSheetId styleSheetId
+      SourceRange range
+      string text
+    returns
+      # The resulting CSS Scope rule after modification.
+      CSSScope scope
+
   # Modifies the rule selector.
   command setRuleSelector
     parameters
@@ -2248,6 +2278,9 @@ domain DOM
       optional string value
       # Pseudo element type for this node.
       optional PseudoType pseudoType
+      # Pseudo element identifier for this node. Only present if there is a
+      # valid pseudoType.
+      optional string pseudoIdentifier
       # Shadow root type.
       optional ShadowRootType shadowRootType
       # Frame ID for frame owner elements.
@@ -2643,6 +2676,14 @@ domain DOM
       # Query selector result.
       array of NodeId nodeIds
 
+  # Returns NodeIds of current top layer elements.
+  # Top layer is rendered closest to the user within a viewport, therefore its elements always 
+  # appear on top of all other content.
+  experimental command getTopLayerElements
+    returns
+      # NodeIds of top layer elements
+      array of NodeId nodeIds
+
   # Re-does the last undone action.
   experimental command redo
 
@@ -2903,6 +2944,9 @@ domain DOM
       # The added pseudo element.
       Node pseudoElement
 
+  # Called when top layer elements are changed.
+  experimental event topLayerElementsUpdated
+
   # Called when a pseudo element is removed from an element.
   experimental event pseudoElementRemoved
     parameters
@@ -3280,6 +3324,9 @@ experimental domain DOMSnapshot
       optional RareIntegerData contentDocumentIndex
       # Type of a pseudo element node.
       optional RareStringData pseudoType
+      # Pseudo element identifier for this node. Only present if there is a
+      # valid pseudoType.
+      optional RareStringData pseudoIdentifier
       # Whether this DOM node responds to mouse clicks. This includes nodes that have had click
       # event listeners attached via JavaScript as well as anchor tags that naturally navigate when
       # clicked.
@@ -7036,6 +7083,7 @@ domain Page
       encrypted-media
       execution-while-out-of-viewport
       execution-while-not-rendered
+      federated-credentials
       focus-without-user-activation
       fullscreen
       frobulate
@@ -7077,6 +7125,8 @@ domain Page
       IframeAttribute
       # Inside fenced frame.
       InFencedFrameTree
+      # Inside an Isolated Application.
+      InIsolatedApp
 
   experimental type PermissionsPolicyBlockLocator extends object
     properties
@@ -7982,12 +8032,12 @@ domain Page
     parameters
       # Id of the frame containing input node.
       experimental FrameId frameId
-      # Input node id.
-      experimental DOM.BackendNodeId backendNodeId
       # Input mode.
       enum mode
         selectSingle
         selectMultiple
+      # Input node id. Only present for file choosers opened via an <input type="file"> element.
+      experimental optional DOM.BackendNodeId backendNodeId
 
   # Fired when frame has been attached to its parent.
   event frameAttached
@@ -9493,6 +9543,9 @@ experimental domain Tracing
         recordContinuously
         recordAsMuchAsPossible
         echoToConsole
+      # Size of the trace buffer in kilobytes. If not specified or zero is passed, a default value
+      # of 200 MB would be used.
+      optional number traceBufferSizeInKb
       # Turns on JavaScript stack sampling.
       optional boolean enableSampling
       # Turns on system tracing.
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index 18cf0c7..8e43695 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -441,6 +441,12 @@ domain Debugger
       Runtime.CallArgument newValue
 
   # Edits JavaScript source live.
+  #
+  # In general, functions that are currently on the stack can not be edited with
+  # a single exception: If the edited function is the top-most stack frame and
+  # that is the only activation of that function on the stack. In this case
+  # the live edit will be successful and a `Debugger.restartFrame` for the
+  # top-most function is automatically triggered.
   command setScriptSource
     parameters
       # Id of the script to edit.
@@ -450,16 +456,27 @@ domain Debugger
       #  If true the change will not actually be applied. Dry run may be used to get result
       # description without actually modifying the code.
       optional boolean dryRun
+      # If true, then `scriptSource` is allowed to change the function on top of the stack
+      # as long as the top-most stack frame is the only activation of that function.
+      experimental optional boolean allowTopFrameEditing
     returns
       # New stack trace in case editing has happened while VM was stopped.
-      optional array of CallFrame callFrames
+      deprecated optional array of CallFrame callFrames
       # Whether current call stack  was modified after applying the changes.
-      optional boolean stackChanged
+      deprecated optional boolean stackChanged
       # Async stack trace, if any.
-      optional Runtime.StackTrace asyncStackTrace
+      deprecated optional Runtime.StackTrace asyncStackTrace
       # Async stack trace, if any.
-      experimental optional Runtime.StackTraceId asyncStackTraceId
-      # Exception details if any.
+      deprecated optional Runtime.StackTraceId asyncStackTraceId
+      # Whether the operation was successful or not. Only `Ok` denotes a
+      # successful live edit while the other enum variants denote why
+      # the live edit failed.
+      experimental enum status
+        Ok
+        CompileError
+        BlockedByActiveGenerator
+        BlockedByActiveFunction
+      # Exception details if any. Only present when `status` is `CompileError`.
       optional Runtime.ExceptionDetails exceptionDetails
 
   # Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc).
```

## Roll protocol to r1011700 — _2022-06-07T22:15:32.000Z_
######  Diff: [`1ed415a...44cc592`](https://github.com/ChromeDevTools/devtools-protocol/compare/1ed415a...44cc592)

```diff
@@ js_protocol.pdl:273 @@ domain Debugger
     parameters
       BreakpointId breakpointId
 
-  # Restarts particular call frame from the beginning.
-  deprecated command restartFrame
+  # Restarts particular call frame from the beginning. The old, deprecated
+  # behavior of `restartFrame` is to stay paused and allow further CDP commands
+  # after a restart was scheduled. This can cause problems with restarting, so
+  # we now continue execution immediatly after it has been scheduled until we
+  # reach the beginning of the restarted frame.
+  #
+  # To stay back-wards compatible, `restartFrame` now expects a `mode`
+  # parameter to be present. If the `mode` parameter is missing, `restartFrame`
+  # errors out.
+  #
+  # The various return values are deprecated and `callFrames` is always empty.
+  # Use the call frames from the `Debugger#paused` events instead, that fires
+  # once V8 pauses at the beginning of the restarted function.
+  command restartFrame
     parameters
       # Call frame identifier to evaluate on.
       CallFrameId callFrameId
+      # The `mode` parameter must be present and set to 'StepInto', otherwise
+      # `restartFrame` will error out.
+      experimental optional enum mode
+        # Pause at the beginning of the restarted function
+        StepInto
     returns
       # New stack trace.
-      array of CallFrame callFrames
+      deprecated array of CallFrame callFrames
       # Async stack trace, if any.
-      optional Runtime.StackTrace asyncStackTrace
+      deprecated optional Runtime.StackTrace asyncStackTrace
       # Async stack trace, if any.
-      experimental optional Runtime.StackTraceId asyncStackTraceId
+      deprecated optional Runtime.StackTraceId asyncStackTraceId
 
   # Resumes JavaScript execution.
   command resume
@@ -713,18 +730,24 @@ experimental domain HeapProfiler
       # If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken
       # when the tracking is stopped.
       optional boolean reportProgress
-      optional boolean treatGlobalObjectsAsRoots
+      # Deprecated in favor of `exposeInternals`.
+      deprecated optional boolean treatGlobalObjectsAsRoots
       # If true, numerical values are included in the snapshot
       optional boolean captureNumericValue
+      # If true, exposes internals of the snapshot.
+      experimental optional boolean exposeInternals
 
   command takeHeapSnapshot
     parameters
       # If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.
       optional boolean reportProgress
-      # If true, a raw snapshot without artificial roots will be generated
-      optional boolean treatGlobalObjectsAsRoots
+      # If true, a raw snapshot without artificial roots will be generated.
+      # Deprecated in favor of `exposeInternals`.
+      deprecated optional boolean treatGlobalObjectsAsRoots
       # If true, numerical values are included in the snapshot
       optional boolean captureNumericValue
+      # If true, exposes internals of the snapshot.
+      experimental optional boolean exposeInternals
 
   event addHeapSnapshotChunk
     parameters
```

## Roll protocol to r1010518 — _2022-06-03T11:15:25.000Z_
######  Diff: [`b877f90...1ed415a`](https://github.com/ChromeDevTools/devtools-protocol/compare/b877f90...1ed415a)

```diff
@@ browser_protocol.pdl:6955 @@ domain Page
       AdFrameType adFrameType
       optional array of AdFrameExplanation explanations
 
+  # Identifies the bottom-most script which caused the frame to be labelled
+  # as an ad.
+  experimental type AdScriptId extends object
+    properties
+      # Script Id of the bottom-most script which caused the frame to be labelled
+      # as an ad.
+      Runtime.ScriptId scriptId
+      # Id of adScriptId's debugger.
+      Runtime.UniqueDebuggerId debuggerId
+
   # Indicates whether the frame is a secure context and why it is the case.
   experimental type SecureContextType extends string
     enum
@@ -7988,6 +7998,9 @@ domain Page
       FrameId parentFrameId
       # JavaScript stack trace of when frame was attached, only set if frame initiated from script.
       optional Runtime.StackTrace stack
+      # Identifies the bottom-most script which caused the frame to be labelled
+      # as an ad. Only sent if frame is labelled as an ad and id is available.
+      experimental optional AdScriptId adScriptId
 
   # Fired when frame no longer has a scheduled navigation.
   deprecated event frameClearedScheduledNavigation
```

## Roll protocol to r1010249 — _2022-06-02T20:15:24.000Z_
######  Diff: [`741c799...4ef6135`](https://github.com/ChromeDevTools/devtools-protocol/compare/741c799...4ef6135)

```diff
@@ browser_protocol.pdl:767 @@ experimental domain Audits
       NotificationInsecureOrigin
       NotificationPermissionRequestedIframe
       ObsoleteWebRtcCipherSuite
-      PaymentRequestBasicCard
       PictureSourceSrc
       PrefixedCancelAnimationFrame
       PrefixedRequestAnimationFrame
```

## Roll protocol to r1010123 — _2022-06-02T16:15:31.000Z_
######  Diff: [`a3a4df3...741c799`](https://github.com/ChromeDevTools/devtools-protocol/compare/a3a4df3...741c799)

```diff
@@ browser_protocol.pdl:702 @@ experimental domain Audits
       InvalidHeader
 
   # Details for issues around "Attribution Reporting API" usage.
-  # Explainer: https://github.com/WICG/conversion-measurement-api
+  # Explainer: https://github.com/WICG/attribution-reporting-api
   type AttributionReportingIssueDetails extends object
     properties
       AttributionReportingIssueType violationType
```

## Roll protocol to r1009745 — _2022-06-01T19:15:37.000Z_
######  Diff: [`a56eb21...a3a4df3`](https://github.com/ChromeDevTools/devtools-protocol/compare/a56eb21...a3a4df3)

```diff
@@ browser_protocol.pdl:6312 @@ domain Network
     enum
       SameOrigin
       SameOriginAllowPopups
+      RestrictProperties
       UnsafeNone
       SameOriginPlusCoep
-      SameOriginAllowPopupsPlusCoep
+      RestrictPropertiesPlusCoep
 
   experimental type CrossOriginOpenerPolicyStatus extends object
     properties
```

## Roll protocol to r1008748 — _2022-05-30T07:15:13.000Z_
######  Diff: [`bc53a73...a56eb21`](https://github.com/ChromeDevTools/devtools-protocol/compare/bc53a73...a56eb21)

```diff
@@ browser_protocol.pdl:8248 @@ domain Page
       ContentMediaDevicesDispatcherHost
       ContentWebBluetooth
       ContentWebUSB
-      ContentMediaSession
       ContentMediaSessionService
       ContentScreenReader
```

## Roll protocol to r1007616 — _2022-05-25T23:15:13.000Z_
######  Diff: [`7e4a41a...82c45d0`](https://github.com/ChromeDevTools/devtools-protocol/compare/7e4a41a...82c45d0)

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

## Roll protocol to r1007249 — _2022-05-25T06:15:14.000Z_
######  Diff: [`cb58d1b...7e4a41a`](https://github.com/ChromeDevTools/devtools-protocol/compare/cb58d1b...7e4a41a)

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

## Roll protocol to r1007179 — _2022-05-25T01:15:17.000Z_
######  Diff: [`9b60b54...cb58d1b`](https://github.com/ChromeDevTools/devtools-protocol/compare/9b60b54...cb58d1b)

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

## Roll protocol to r1006825 — _2022-05-24T10:15:23.000Z_
######  Diff: [`fff96f6...09fd7be`](https://github.com/ChromeDevTools/devtools-protocol/compare/fff96f6...09fd7be)

```diff
@@ browser_protocol.pdl:785 @@ experimental domain Audits
       RTCPeerConnectionComplexPlanBSdpUsingDefaultSdpSemantics
       RTCPeerConnectionSdpSemanticsPlanB
       RtcpMuxPolicyNegotiate
-      RTPDataChannel
       SharedArrayBufferConstructedWithoutIsolation
       TextToSpeech_DisallowedByAutoplay
       V8SharedArrayBufferConstructedInExtensionWithoutIsolation
```

## Roll protocol to r1005767 — _2022-05-20T14:15:15.000Z_
######  Diff: [`44eb39e...fff96f6`](https://github.com/ChromeDevTools/devtools-protocol/compare/44eb39e...fff96f6)

```diff
@@ browser_protocol.pdl:3808 @@ domain Emulation
       # Image types to disable.
       array of DisabledImageType imageTypes
 
+  experimental command setHardwareConcurrencyOverride
+    parameters
+      # Hardware concurrency to report
+      integer hardwareConcurrency
+
   # Allows overriding user agent with the given string.
   command setUserAgentOverride
     parameters
```

## Roll protocol to r1005560 — _2022-05-20T01:15:18.000Z_
######  Diff: [`363a231...44eb39e`](https://github.com/ChromeDevTools/devtools-protocol/compare/363a231...44eb39e)

```diff
@@ browser_protocol.pdl:751 @@ experimental domain Audits
       CrossOriginWindowAlert
       CrossOriginWindowConfirm
       CSSSelectorInternalMediaControlsOverlayCastButton
-      CustomCursorIntersectsViewport
       DeprecationExample
       DocumentDomainSettingWithoutOriginAgentClusterHeader
       EventPath
```

## Roll protocol to r1005172 — _2022-05-19T09:15:19.000Z_
######  Diff: [`210ddf8...363a231`](https://github.com/ChromeDevTools/devtools-protocol/compare/210ddf8...363a231)

```diff
@@ browser_protocol.pdl:3434 @@ experimental domain DOMStorage
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
@@ -8904,6 +8898,13 @@ experimental domain Storage
       array of InterestGroupAd ads
       array of InterestGroupAd adComponents
 
+  # Returns a storage key given a frame id.
+  command getStorageKeyForFrame
+    parameters
+      Page.FrameId frameId
+    returns
+      SerializedStorageKey storageKey
+
   # Clears storage for origin.
   command clearDataForOrigin
     parameters
```

## Roll protocol to r1004730 — _2022-05-18T13:15:20.000Z_
######  Diff: [`838223b...210ddf8`](https://github.com/ChromeDevTools/devtools-protocol/compare/838223b...210ddf8)

```diff
@@ browser_protocol.pdl:769 @@ experimental domain Audits
       NotificationPermissionRequestedIframe
       ObsoleteWebRtcCipherSuite
       PaymentRequestBasicCard
-      PaymentRequestShowWithoutGesture
       PictureSourceSrc
       PrefixedCancelAnimationFrame
       PrefixedRequestAnimationFrame
```

## Roll protocol to r1004709 — _2022-05-18T12:15:18.000Z_
######  Diff: [`cdd508b...838223b`](https://github.com/ChromeDevTools/devtools-protocol/compare/cdd508b...838223b)

```diff
@@ browser_protocol.pdl:762 @@ experimental domain Audits
       InsecurePrivateNetworkSubresourceRequest
       LegacyConstraintGoogIPv6
       LocalCSSFileExtensionRejected
-      MediaElementAudioSourceNode
       MediaSourceAbortRemove
       MediaSourceDurationTruncatingBuffered
       NoSysexWebMIDIWithoutPermission
```

## Roll protocol to r1004164 — _2022-05-17T09:15:39.000Z_
######  Diff: [`218b848...cdd508b`](https://github.com/ChromeDevTools/devtools-protocol/compare/218b848...cdd508b)

```diff
@@ browser_protocol.pdl:2274 @@ domain DOM
       # Whether the node is SVG.
       optional boolean isSVG
       optional CompatibilityMode compatibilityMode
+      optional BackendNode assignedSlot
 
   # A structure holding an RGBA color.
   type RGBA extends object
```

## Roll protocol to r1004052 — _2022-05-17T01:15:19.000Z_
######  Diff: [`deb61a0...218b848`](https://github.com/ChromeDevTools/devtools-protocol/compare/deb61a0...218b848)

```diff
@@ browser_protocol.pdl:6996 @@ domain Page
       ambient-light-sensor
       attribution-reporting
       autoplay
+      bluetooth
       browsing-topics
       camera
       ch-dpr
```

## Roll protocol to r1003898 — _2022-05-16T20:15:25.000Z_
######  Diff: [`6db5938...deb61a0`](https://github.com/ChromeDevTools/devtools-protocol/compare/6db5938...deb61a0)

```diff
@@ browser_protocol.pdl:7634 @@ domain Page
     returns
       # Frame id that has navigated (or failed to navigate)
       FrameId frameId
-      # Loader identifier.
+      # Loader identifier. This is omitted in case of same-document navigation,
+      # as the previously committed loaderId would not change.
       optional Network.LoaderId loaderId
       # User friendly error message, present if and only if navigation has failed.
       optional string errorText
```

## Roll protocol to r1002782 — _2022-05-12T19:15:18.000Z_
######  Diff: [`02d7a84...6db5938`](https://github.com/ChromeDevTools/devtools-protocol/compare/02d7a84...6db5938)

```diff
@@ browser_protocol.pdl:10120 @@ experimental domain WebAuthn
   # Enable the WebAuthn domain and start intercepting credential storage and
   # retrieval with a virtual authenticator.
   command enable
+    parameters
+      # Whether to enable the WebAuthn user interface. Enabling the UI is
+      # recommended for debugging and demo purposes, as it is closer to the real
+      # experience. Disabling the UI is recommended for automated testing.
+      # Supported at the embedder's discretion if UI is available.
+      # Defaults to false.
+      optional boolean enableUI
 
   # Disable the WebAuthn domain.
   command disable
```

## Roll protocol to r1001819 — _2022-05-11T00:15:32.000Z_
######  Diff: [`ae07002...02d7a84`](https://github.com/ChromeDevTools/devtools-protocol/compare/ae07002...02d7a84)

```diff
@@ browser_protocol.pdl:8319 @@ domain Page
   type PrerenderFinalStatus extends string
     enum
       Activated
+      Destroyed
+      LowEndDevice
+      CrossOriginRedirect
+      CrossOriginNavigation
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
+      EmbedderTriggeredAndSameOriginRedirected
+      EmbedderTriggeredAndCrossOriginRedirected
+      EmbedderTriggeredAndDestroyed
 
   # Fired when a prerender attempt is completed.
   event prerenderAttemptCompleted
```

## Roll protocol to r1001785 — _2022-05-10T23:15:25.000Z_
######  Diff: [`6d1c894...ae07002`](https://github.com/ChromeDevTools/devtools-protocol/compare/6d1c894...ae07002)

```diff
@@ browser_protocol.pdl:699 @@ experimental domain Audits
       PermissionPolicyDisabled
       AttributionSourceUntrustworthyOrigin
       AttributionUntrustworthyOrigin
+      InvalidHeader
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
```

## Roll protocol to r1001754 — _2022-05-10T22:15:23.000Z_
######  Diff: [`4d9109d...6d1c894`](https://github.com/ChromeDevTools/devtools-protocol/compare/4d9109d...6d1c894)

```diff
@@ browser_protocol.pdl:697 @@ experimental domain Audits
   type AttributionReportingIssueType extends string
     enum
       PermissionPolicyDisabled
-      InvalidAttributionSourceEventId
       AttributionSourceUntrustworthyOrigin
       AttributionUntrustworthyOrigin
-      InvalidAttributionSourceExpiry
-      InvalidAttributionSourcePriority
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
```

## Roll protocol to r1001033 — _2022-05-09T16:15:18.000Z_
######  Diff: [`4df4c30...4d9109d`](https://github.com/ChromeDevTools/devtools-protocol/compare/4df4c30...4d9109d)

```diff
@@ browser_protocol.pdl:788 @@ experimental domain Audits
       RTCConstraintEnableDtlsSrtpFalse
       RTCConstraintEnableDtlsSrtpTrue
       RTCPeerConnectionComplexPlanBSdpUsingDefaultSdpSemantics
-      RTCPeerConnectionLegacyCreateWithMediaConstraints
       RTCPeerConnectionSdpSemanticsPlanB
       RtcpMuxPolicyNegotiate
       RTPDataChannel
```

## Roll protocol to r1001016 — _2022-05-09T15:15:24.000Z_
######  Diff: [`1dd3de6...4df4c30`](https://github.com/ChromeDevTools/devtools-protocol/compare/1dd3de6...4df4c30)

```diff
@@ browser_protocol.pdl:762 @@ experimental domain Audits
       GetUserMediaInsecureOrigin
       HostCandidateAttributeGetter
       InsecurePrivateNetworkSubresourceRequest
-      LegacyConstraintGoogCpuOveruseDetection
       LegacyConstraintGoogIPv6
-      LegacyConstraintGoogScreencastMinBitrate
-      LegacyConstraintGoogSuspendBelowMinBitrate
       LocalCSSFileExtensionRejected
       MediaElementAudioSourceNode
       MediaSourceAbortRemove
```

## Roll protocol to r1000974 — _2022-05-09T13:15:16.000Z_
######  Diff: [`a9ad264...1dd3de6`](https://github.com/ChromeDevTools/devtools-protocol/compare/a9ad264...1dd3de6)

```diff
@@ browser_protocol.pdl:3399 @@ experimental domain DOMSnapshot
 # Query and modify DOM storage.
 experimental domain DOMStorage
 
+  type SerializedStorageKey extends string
+
   # DOM Storage identifier.
   type StorageId extends object
     properties
       # Security origin for the storage.
-      string securityOrigin
+      optional string securityOrigin
+      # Represents a key by which DOM Storage keys its CachedStorageAreas
+      optional SerializedStorageKey storageKey
       # Whether the storage is local storage (not session storage).
       boolean isLocalStorage
 
@@ -3437,6 +3441,12 @@ experimental domain DOMStorage
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
@@ -8803,6 +8813,8 @@ experimental domain Storage
   depends on Browser
   depends on Network
 
+  type SerializedStorageKey extends string
+
   # Enum of possible storage types.
   type StorageType extends string
     enum
```

## Roll protocol to r1000917 — _2022-05-09T08:15:16.000Z_
######  Diff: [`93a65bd...a9ad264`](https://github.com/ChromeDevTools/devtools-protocol/compare/93a65bd...a9ad264)

```diff
@@ browser_protocol.pdl:795 @@ experimental domain Audits
       RTCPeerConnectionSdpSemanticsPlanB
       RtcpMuxPolicyNegotiate
       RTPDataChannel
-      SelectionAddRangeIntersect
       SharedArrayBufferConstructedWithoutIsolation
       TextToSpeech_DisallowedByAutoplay
       V8SharedArrayBufferConstructedInExtensionWithoutIsolation
```

## Roll protocol to r999451 — _2022-05-04T16:45:22.000Z_
######  Diff: [`3a7051b...93a65bd`](https://github.com/ChromeDevTools/devtools-protocol/compare/3a7051b...93a65bd)

```diff
@@ js_protocol.pdl:559 @@ domain Debugger
       integer endColumn
       # Specifies script creation context.
       Runtime.ExecutionContextId executionContextId
-      # Content hash of the script.
+      # Content hash of the script, SHA-256.
       string hash
       # Embedder-specific auxiliary data.
       optional object executionContextAuxData
@@ -598,7 +598,7 @@ domain Debugger
       integer endColumn
       # Specifies script creation context.
       Runtime.ExecutionContextId executionContextId
-      # Content hash of the script.
+      # Content hash of the script, SHA-256.
       string hash
       # Embedder-specific auxiliary data.
       optional object executionContextAuxData
@@ -1347,7 +1347,9 @@ domain Runtime
       optional string objectGroup
       # Whether to throw an exception if side effect cannot be ruled out during evaluation.
       experimental optional boolean throwOnSideEffect
-      # Whether the result should be serialized according to https://w3c.github.io/webdriver-bidi.
+      # Whether the result should contain `webDriverValue`, serialized according to
+      # https://w3c.github.io/webdriver-bidi. This is mutually exclusive with `returnByValue`, but
+      # resulting `objectId` is still provided.
       experimental optional boolean generateWebDriverValue
     returns
       # Call result.
```

## Roll protocol to r998712 — _2022-05-03T03:15:18.000Z_
######  Diff: [`a6daed6...3a7051b`](https://github.com/ChromeDevTools/devtools-protocol/compare/a6daed6...3a7051b)

```diff
@@ browser_protocol.pdl:799 @@ experimental domain Audits
       SharedArrayBufferConstructedWithoutIsolation
       TextToSpeech_DisallowedByAutoplay
       V8SharedArrayBufferConstructedInExtensionWithoutIsolation
-      WebCodecsVideoFrameDefaultTimestamp
       XHRJSONEncodingDetection
       XMLHttpRequestSynchronousInNonWorkerOutsideBeforeUnload
       XRSupportsSession
```

## Roll protocol to r998277 — _2022-05-02T08:15:16.000Z_
######  Diff: [`10b0375...a6daed6`](https://github.com/ChromeDevTools/devtools-protocol/compare/10b0375...a6daed6)

```diff
@@ browser_protocol.pdl:2 @@ @@ -2,7 +2,7 @@
 # Use of this source code is governed by a BSD-style license that can be
 # found in the LICENSE file.
 #
-# Contributing to Chrome DevTools Protocol: https://docs.google.com/document/d/1c-COD2kaK__5iMM5SEx-PzNA7HFmgttcYfOHHX0HaOM/edit?usp=sharing
+# Contributing to Chrome DevTools Protocol: https://goo.gle/devtools-contribution-guide-cdp
 
 version
   major 1
@@ -3850,7 +3850,7 @@ experimental domain HeadlessExperimental
   # Sends a BeginFrame to the target and returns when the frame was completed. Optionally captures a
   # screenshot from the resulting frame. Requires that the target was created with enabled
   # BeginFrameControl. Designed for use with --run-all-compositor-stages-before-draw, see also
-  # https://goo.gl/3zHXhB for more background.
+  # https://goo.gle/chrome-headless-rendering for more background.
   command beginFrame
     parameters
       # Timestamp of this BeginFrame in Renderer TimeTicks (milliseconds of uptime). If not set,
```

## Roll protocol to r997803 — _2022-04-29T18:15:25.000Z_
######  Diff: [`83726e8...10b0375`](https://github.com/ChromeDevTools/devtools-protocol/compare/83726e8...10b0375)

```diff
@@ browser_protocol.pdl:744 @@ experimental domain Audits
   type DeprecationIssueType extends string
     enum
       AuthorizationCoveredByWildcard
-      BatteryStatusInsecureOrigin
       CanRequestURLHTTPContainingNewline
       ChromeLoadTimesConnectionInfo
       ChromeLoadTimesFirstPaintAfterLoadTime
```

## Roll protocol to r997149 — _2022-04-28T11:15:16.000Z_
######  Diff: [`477bbc9...83726e8`](https://github.com/ChromeDevTools/devtools-protocol/compare/477bbc9...83726e8)

```diff
@@ browser_protocol.pdl:799 @@ experimental domain Audits
       SelectionAddRangeIntersect
       SharedArrayBufferConstructedWithoutIsolation
       TextToSpeech_DisallowedByAutoplay
-      Untranslated
       V8SharedArrayBufferConstructedInExtensionWithoutIsolation
       WebCodecsVideoFrameDefaultTimestamp
       XHRJSONEncodingDetection
@@ -807,22 +806,11 @@ experimental domain Audits
       XRSupportsSession
 
   # This issue tracks information needed to print a deprecation message.
-  # The formatting is inherited from the old console.log version, see more at:
-  # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/deprecation.cc
-  # TODO(crbug.com/1264960): Re-work format to add i18n support per:
-  # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/public/devtools_protocol/README.md
+  # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/third_party/blink/renderer/core/frame/deprecation/README.md
   type DeprecationIssueDetails extends object
     properties
       optional AffectedFrame affectedFrame
       SourceCodeLocation sourceCodeLocation
-      # The content of an untranslated deprecation issue,
-      # e.g. "window.inefficientLegacyStorageMethod will be removed in M97,
-      # around January 2022. Please use Web Storage or Indexed Database
-      # instead. This standard was abandoned in January, 1970. See
-      # https://www.chromestatus.com/feature/5684870116278272 for more details."
-      deprecated optional string message
-      # The id of an untranslated deprecation issue e.g. PrefixedStorageInfo.
-      deprecated optional string deprecationType
       DeprecationIssueType type
 
   type ClientHintIssueReason extends string
```

## Roll protocol to r996622 — _2022-04-27T10:15:18.000Z_
######  Diff: [`61057f3...477bbc9`](https://github.com/ChromeDevTools/devtools-protocol/compare/61057f3...477bbc9)

```diff
@@ browser_protocol.pdl:7357 @@ domain Page
       optional string cursive
       # The fantasy font-family.
       optional string fantasy
+      # The math font-family.
+      optional string math
 
   # Font families collection for a script.
   experimental type ScriptFontFamilies extends object
```

## Roll protocol to r996285 — _2022-04-26T18:15:23.000Z_
######  Diff: [`d153258...6a83a61`](https://github.com/ChromeDevTools/devtools-protocol/compare/d153258...6a83a61)

```diff
@@ browser_protocol.pdl:744 @@ experimental domain Audits
   type DeprecationIssueType extends string
     enum
       AuthorizationCoveredByWildcard
+      BatteryStatusInsecureOrigin
+      CanRequestURLHTTPContainingNewline
+      ChromeLoadTimesConnectionInfo
+      ChromeLoadTimesFirstPaintAfterLoadTime
+      ChromeLoadTimesWasAlternateProtocolAvailable
       CookieWithTruncatingChar
       CrossOriginAccessBasedOnDocumentDomain
       CrossOriginWindowAlert
       CrossOriginWindowConfirm
+      CSSSelectorInternalMediaControlsOverlayCastButton
+      CustomCursorIntersectsViewport
       DeprecationExample
       DocumentDomainSettingWithoutOriginAgentClusterHeader
+      EventPath
       GeolocationInsecureOrigin
       GeolocationInsecureOriginDeprecatedNotRemoved
       GetUserMediaInsecureOrigin
+      HostCandidateAttributeGetter
+      InsecurePrivateNetworkSubresourceRequest
       LegacyConstraintGoogCpuOveruseDetection
       LegacyConstraintGoogIPv6
       LegacyConstraintGoogScreencastMinBitrate
       LegacyConstraintGoogSuspendBelowMinBitrate
       LocalCSSFileExtensionRejected
+      MediaElementAudioSourceNode
+      MediaSourceAbortRemove
+      MediaSourceDurationTruncatingBuffered
+      NoSysexWebMIDIWithoutPermission
       NotificationInsecureOrigin
+      NotificationPermissionRequestedIframe
       ObsoleteWebRtcCipherSuite
+      PaymentRequestBasicCard
+      PaymentRequestShowWithoutGesture
       PictureSourceSrc
       PrefixedCancelAnimationFrame
       PrefixedRequestAnimationFrame
+      PrefixedStorageInfo
+      PrefixedVideoDisplayingFullscreen
+      PrefixedVideoEnterFullscreen
+      PrefixedVideoEnterFullScreen
+      PrefixedVideoExitFullscreen
+      PrefixedVideoExitFullScreen
+      PrefixedVideoSupportsFullscreen
+      RangeExpand
+      RequestedSubresourceWithEmbeddedCredentials
       RTCConstraintEnableDtlsSrtpFalse
       RTCConstraintEnableDtlsSrtpTrue
       RTCPeerConnectionComplexPlanBSdpUsingDefaultSdpSemantics
       RTCPeerConnectionLegacyCreateWithMediaConstraints
+      RTCPeerConnectionSdpSemanticsPlanB
+      RtcpMuxPolicyNegotiate
       RTPDataChannel
+      SelectionAddRangeIntersect
       SharedArrayBufferConstructedWithoutIsolation
+      TextToSpeech_DisallowedByAutoplay
       Untranslated
       V8SharedArrayBufferConstructedInExtensionWithoutIsolation
       WebCodecsVideoFrameDefaultTimestamp
       XHRJSONEncodingDetection
       XMLHttpRequestSynchronousInNonWorkerOutsideBeforeUnload
+      XRSupportsSession
 
   # This issue tracks information needed to print a deprecation message.
   # The formatting is inherited from the old console.log version, see more at:
```

## Roll protocol to r995853 — _2022-04-25T23:15:20.000Z_
######  Diff: [`5c44be1...d153258`](https://github.com/ChromeDevTools/devtools-protocol/compare/5c44be1...d153258)

```diff
@@ browser_protocol.pdl:7021 @@ domain Page
       interest-cohort
       join-ad-interest-group
       keyboard-map
+      local-fonts
       magnetometer
       microphone
       midi
```

## Roll protocol to r995510 — _2022-04-23T16:15:16.000Z_
######  Diff: [`7c8b6ad...5c44be1`](https://github.com/ChromeDevTools/devtools-protocol/compare/7c8b6ad...5c44be1)

```diff
@@ browser_protocol.pdl:7645 @@ domain Page
       optional number marginLeft
       # Right margin in inches. Defaults to 1cm (~0.4 inches).
       optional number marginRight
-      # Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means
-      # print all pages.
+      # Paper ranges to print, one based, e.g., '1-5, 8, 11-13'. Pages are
+      # printed in the document order, not in the order specified, and no
+      # more than once.
+      # Defaults to empty string, which implies the entire document is printed.
+      # The page numbers are quietly capped to actual page count of the
+      # document, and ranges beyond the end of the document are ignored.
+      # If this results in no pages to print, an error is reported.
+      # It is an error to specify a range with start greater than end.
       optional string pageRanges
-      # Whether to silently ignore invalid but successfully parsed page ranges, such as '3-2'.
-      # Defaults to false.
-      optional boolean ignoreInvalidPageRanges
       # HTML template for the print header. Should be valid HTML markup with following
       # classes used to inject printing values into them:
       # - `date`: formatted print date
```

## Roll protocol to r995287 — _2022-04-22T18:54:30.000Z_
######  Diff: [`8ac7575...7c8b6ad`](https://github.com/ChromeDevTools/devtools-protocol/compare/8ac7575...7c8b6ad)

```diff
@@ browser_protocol.pdl:698 @@ experimental domain Audits
     enum
       PermissionPolicyDisabled
       InvalidAttributionSourceEventId
-      InvalidAttributionData
       AttributionSourceUntrustworthyOrigin
       AttributionUntrustworthyOrigin
-      AttributionTriggerDataTooLarge
-      AttributionEventSourceTriggerDataTooLarge
       InvalidAttributionSourceExpiry
       InvalidAttributionSourcePriority
-      InvalidEventSourceTriggerData
-      InvalidTriggerPriority
-      InvalidTriggerDedupKey
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
@@ -747,6 +741,40 @@ experimental domain Audits
       GenericIssueErrorType errorType
       optional Page.FrameId frameId
 
+  type DeprecationIssueType extends string
+    enum
+      AuthorizationCoveredByWildcard
+      CookieWithTruncatingChar
+      CrossOriginAccessBasedOnDocumentDomain
+      CrossOriginWindowAlert
+      CrossOriginWindowConfirm
+      DeprecationExample
+      DocumentDomainSettingWithoutOriginAgentClusterHeader
+      GeolocationInsecureOrigin
+      GeolocationInsecureOriginDeprecatedNotRemoved
+      GetUserMediaInsecureOrigin
+      LegacyConstraintGoogCpuOveruseDetection
+      LegacyConstraintGoogIPv6
+      LegacyConstraintGoogScreencastMinBitrate
+      LegacyConstraintGoogSuspendBelowMinBitrate
+      LocalCSSFileExtensionRejected
+      NotificationInsecureOrigin
+      ObsoleteWebRtcCipherSuite
+      PictureSourceSrc
+      PrefixedCancelAnimationFrame
+      PrefixedRequestAnimationFrame
+      RTCConstraintEnableDtlsSrtpFalse
+      RTCConstraintEnableDtlsSrtpTrue
+      RTCPeerConnectionComplexPlanBSdpUsingDefaultSdpSemantics
+      RTCPeerConnectionLegacyCreateWithMediaConstraints
+      RTPDataChannel
+      SharedArrayBufferConstructedWithoutIsolation
+      Untranslated
+      V8SharedArrayBufferConstructedInExtensionWithoutIsolation
+      WebCodecsVideoFrameDefaultTimestamp
+      XHRJSONEncodingDetection
+      XMLHttpRequestSynchronousInNonWorkerOutsideBeforeUnload
+
   # This issue tracks information needed to print a deprecation message.
   # The formatting is inherited from the old console.log version, see more at:
   # https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/frame/deprecation.cc
@@ -763,7 +791,8 @@ experimental domain Audits
       # https://www.chromestatus.com/feature/5684870116278272 for more details."
       deprecated optional string message
       # The id of an untranslated deprecation issue e.g. PrefixedStorageInfo.
-      deprecated string deprecationType
+      deprecated optional string deprecationType
+      DeprecationIssueType type
 
   type ClientHintIssueReason extends string
     enum
@@ -786,6 +815,11 @@ experimental domain Audits
     enum
       ApprovalDeclined
       TooManyRequests
+      ManifestListHttpNotFound
+      ManifestListNoResponse
+      ManifestListInvalidResponse
+      ManifestNotInManifestList
+      ManifestListTooBig
       ManifestHttpNotFound
       ManifestNoResponse
       ManifestInvalidResponse
@@ -3539,6 +3573,8 @@ domain Emulation
       string architecture
       string model
       boolean mobile
+      optional string bitness
+      optional boolean wow64
 
   # Tells whether emulation is supported.
   command canEmulate
@@ -6946,8 +6982,10 @@ domain Page
       ch-device-memory
       ch-downlink
       ch-ect
+      ch-partitioned-cookies
       ch-prefers-color-scheme
       ch-rtt
+      ch-save-data
       ch-ua
       ch-ua-arch
       ch-ua-bitness
@@ -6963,7 +7001,6 @@ domain Page
       ch-viewport-height
       ch-viewport-width
       ch-width
-      ch-partitioned-cookies
       clipboard-read
       clipboard-write
       cross-origin-isolated
@@ -7288,8 +7325,6 @@ domain Page
       optional string cursive
       # The fantasy font-family.
       optional string fantasy
-      # The pictograph font-family.
-      optional string pictograph
 
   # Font families collection for a script.
   experimental type ScriptFontFamilies extends object
@@ -7508,11 +7543,11 @@ domain Page
   # Returns metrics relating to the layouting of the page, such as viewport bounds/scale.
   command getLayoutMetrics
     returns
-      # Deprecated metrics relating to the layout viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssLayoutViewport` instead.
+      # Deprecated metrics relating to the layout viewport. Is in device pixels. Use `cssLayoutViewport` instead.
       deprecated LayoutViewport layoutViewport
-      # Deprecated metrics relating to the visual viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssVisualViewport` instead.
+      # Deprecated metrics relating to the visual viewport. Is in device pixels. Use `cssVisualViewport` instead.
       deprecated VisualViewport visualViewport
-      # Deprecated size of scrollable area. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssContentSize` instead.
+      # Deprecated size of scrollable area. Is in DP. Use `cssContentSize` instead.
       deprecated DOM.Rect contentSize
       # Metrics relating to the layout viewport in CSS pixels.
       LayoutViewport cssLayoutViewport
@@ -8098,7 +8133,6 @@ domain Page
       JavaScriptExecution
       RendererProcessKilled
       RendererProcessCrashed
-      GrantedMediaStreamAccess
       SchedulerTrackedFeatureUsed
       ConflictingBrowsingInstance
       CacheFlushed
@@ -8125,7 +8159,6 @@ domain Page
       ForegroundCacheLimit
       BrowsingInstanceNotSwapped
       BackForwardCacheDisabledForDelegate
-      OptInUnloadHeaderNotPresent
       UnloadHandlerExistsInMainFrame
       UnloadHandlerExistsInSubFrame
       ServiceWorkerUnregistration
@@ -8136,6 +8169,7 @@ domain Page
       Unknown
       ActivationNavigationsDisallowedForBug1234857
       ErrorDocument
+      FencedFramesEmbedder
       #Blocklisted features
       WebSocket
       WebTransport
@@ -8255,6 +8289,19 @@ domain Page
       # Tree structure of reasons why the page could not be cached for each frame.
       optional BackForwardCacheNotRestoredExplanationTree notRestoredExplanationsTree
 
+  # List of FinalStatus reasons for Prerender2.
+  type PrerenderFinalStatus extends string
+    enum
+      Activated
+
+  # Fired when a prerender attempt is completed.
+  event prerenderAttemptCompleted
+    parameters
+      # The frame id of the frame initiating prerendering.
+      FrameId initiatingFrameId
+      string prerenderingUrl
+      PrerenderFinalStatus finalStatus
+
   event loadEventFired
     parameters
       Network.MonotonicTime timestamp
@@ -10116,19 +10163,27 @@ experimental domain Media
       Timestamp timestamp
       string value
 
+  # Represents logged source line numbers reported in an error.
+  # NOTE: file and line are from chromium c++ implementation code, not js.
+  type PlayerErrorSourceLocation extends object
+    properties
+      string file
+      integer line
+
   # Corresponds to kMediaError
   type PlayerError extends object
     properties
-      enum type
-        # Compatability until we switch to media_error
-        pipeline_error
-        media_error
-      # When this switches to using media::Status instead of PipelineStatus
-      # we can remove "errorCode" and replace it with the fields from
-      # a Status instance. This also seems like a duplicate of the error
-      # level enum - there is a todo bug to have that level removed and
-      # use this instead. (crbug.com/1068454)
-      string errorCode
+      string errorType
+      # Code is the numeric enum entry for a specific set of error codes, such
+      # as PipelineStatusCodes in media/base/pipeline_status.h
+      integer code
+      # A trace of where this error was caused / where it passed through.
+      array of PlayerErrorSourceLocation stack
+      # Errors potentially have a root cause error, ie, a DecoderError might be
+      # caused by an WindowsError
+      array of PlayerError cause
+      # Extra data attached to an error, such as an HRESULT, Video Codec, etc.
+      object data
 
   # This can be called multiple times, and can be used to set / override /
   # remove player properties. A null propValue indicates removal.
diff --git a/pdl/js_protocol.pdl b/pdl/js_protocol.pdl
index 09c420e..bd277eb 100644
--- a/pdl/js_protocol.pdl
+++ b/pdl/js_protocol.pdl
@@ -113,6 +113,11 @@ domain Debugger
       Runtime.RemoteObject this
       # The value being returned, if the function is at return point.
       optional Runtime.RemoteObject returnValue
+      # Valid only while the VM is paused and indicates whether this frame
+      # can be restarted or not. Note that a `true` value here does not
+      # guarantee that Debugger#restartFrame with this CallFrameId will be
+      # successful, but it is very likely.
+      experimental optional boolean canBeRestarted
 
   # Scope description.
   type Scope extends object
@@ -952,6 +957,37 @@ domain Runtime
   # Unique script identifier.
   type ScriptId extends string
 
+  # Represents the value serialiazed by the WebDriver BiDi specification
+  # https://w3c.github.io/webdriver-bidi.
+  type WebDriverValue extends object
+    properties
+      enum type
+        undefined
+        null
+        string
+        number
+        boolean
+        bigint
+        regexp
+        date
+        symbol
+        array
+        object
+        function
+        map
+        set
+        weakmap
+        weakset
+        error
+        proxy
+        promise
+        typedarray
+        arraybuffer
+        node
+        window
+      optional any value
+      optional string objectId
+
   # Unique object identifier.
   type RemoteObjectId extends string
 
@@ -1004,6 +1040,8 @@ domain Runtime
       optional UnserializableValue unserializableValue
       # String representation of the object.
       optional string description
+      # WebDriver BiDi representation of the value.
+      experimental optional WebDriverValue webDriverValue
       # Unique object identifier (for non-primitive values).
       optional RemoteObjectId objectId
       # Preview containing abbreviated property values. Specified for `object` type values only.
@@ -1309,6 +1347,8 @@ domain Runtime
       optional string objectGroup
       # Whether to throw an exception if side effect cannot be ruled out during evaluation.
       experimental optional boolean throwOnSideEffect
+      # Whether the result should be serialized according to https://w3c.github.io/webdriver-bidi.
+      experimental optional boolean generateWebDriverValue
     returns
       # Call result.
       RemoteObject result
@@ -1394,6 +1434,8 @@ domain Runtime
       # boundaries).
       # This is mutually exclusive with `contextId`.
       experimental optional string uniqueContextId
+      # Whether the result should be serialized according to https://w3c.github.io/webdriver-bidi.
+      experimental optional boolean generateWebDriverValue
     returns
       # Evaluation result.
       RemoteObject result
```

## Roll protocol to r982567 — _2022-04-22T18:52:45.000Z_
######  Diff: [`6aec757...8ac7575`](https://github.com/ChromeDevTools/devtools-protocol/compare/6aec757...8ac7575)

```diff
@@ js_protocol.pdl:104 @@ domain Debugger
       # Location in the source code.
       Location location
       # JavaScript script name or url.
-      string url
+      # Deprecated in favor of using the `location.scriptId` to resolve the URL via a previously
+      # sent `Debugger.scriptParsed` event.
+      deprecated string url
       # Scope chain for this call frame.
       array of Scope scopeChain
       # `this` object for this call frame.
@@ -1550,6 +1552,18 @@ domain Runtime
     parameters
       string name
 
+  # This method tries to lookup and populate exception details for a
+  # JavaScript Error object.
+  # Note that the stackTrace portion of the resulting exceptionDetails will
+  # only be populated if the Runtime domain was enabled at the time when the
+  # Error was thrown.
+  experimental command getExceptionDetails
+    parameters
+      # The error object for which to resolve the exception details.
+      RemoteObjectId errorObjectId
+    returns
+      optional ExceptionDetails exceptionDetails
+
   # Notification is issued every time when binding is called.
   experimental event bindingCalled
     parameters
```

## Roll protocol to r982423 — _2022-03-17T21:15:26.000Z_
######  Diff: [`052c603...6aec757`](https://github.com/ChromeDevTools/devtools-protocol/compare/052c603...6aec757)

```diff
@@ browser_protocol.pdl:6940 @@ domain Page
       ambient-light-sensor
       attribution-reporting
       autoplay
+      browsing-topics
       camera
       ch-dpr
       ch-device-memory
@@ -6980,6 +6981,7 @@ domain Page
       gyroscope
       hid
       idle-detection
+      interest-cohort
       join-ad-interest-group
       keyboard-map
       magnetometer
```

## Roll protocol to r982238 — _2022-03-17T16:15:18.000Z_
######  Diff: [`e35b84a...052c603`](https://github.com/ChromeDevTools/devtools-protocol/compare/e35b84a...052c603)

```diff
@@ browser_protocol.pdl:1542 @@ experimental domain CSS
     properties
       # Supports rule text.
       string text
+      # Whether the supports condition is satisfied.
+      boolean active
       # The associated rule header range in the enclosing stylesheet (if
       # available).
       optional SourceRange range
```

## Roll protocol to r981034 — _2022-03-15T10:15:13.000Z_
######  Diff: [`5dd0348...65adbf7`](https://github.com/ChromeDevTools/devtools-protocol/compare/5dd0348...65adbf7)

```diff
@@ browser_protocol.pdl:8131 @@ domain Page
       NoResponseHead
       Unknown
       ActivationNavigationsDisallowedForBug1234857
+      ErrorDocument
       #Blocklisted features
       WebSocket
       WebTransport
```

## Roll protocol to r979918 — _2022-03-10T20:15:19.000Z_
######  Diff: [`8b70878...5dd0348`](https://github.com/ChromeDevTools/devtools-protocol/compare/8b70878...5dd0348)

```diff
@@ browser_protocol.pdl:756 @@ experimental domain Audits
     properties
       optional AffectedFrame affectedFrame
       SourceCodeLocation sourceCodeLocation
-      # The content of the deprecation issue (this won't be translated),
+      # The content of an untranslated deprecation issue,
       # e.g. "window.inefficientLegacyStorageMethod will be removed in M97,
       # around January 2022. Please use Web Storage or Indexed Database
       # instead. This standard was abandoned in January, 1970. See
       # https://www.chromestatus.com/feature/5684870116278272 for more details."
       deprecated optional string message
-      string deprecationType
+      # The id of an untranslated deprecation issue e.g. PrefixedStorageInfo.
+      deprecated string deprecationType
 
   type ClientHintIssueReason extends string
     enum
```

## Roll protocol to r979353 — _2022-03-09T19:15:15.000Z_
######  Diff: [`3084cb9...8b70878`](https://github.com/ChromeDevTools/devtools-protocol/compare/3084cb9...8b70878)

```diff
@@ browser_protocol.pdl:792 @@ experimental domain Audits
       ClientMetadataNoResponse
       ClientMetadataInvalidResponse
       ClientMetadataMissingPrivacyPolicyUrl
+      DisabledInSettings
       ErrorFetchingSignin
       InvalidSigninResponse
       AccountsHttpNotFound
```

## Roll protocol to r977795 — _2022-03-04T20:15:28.000Z_
######  Diff: [`2e0912d...a0800ab`](https://github.com/ChromeDevTools/devtools-protocol/compare/2e0912d...a0800ab)

```diff
@@ browser_protocol.pdl:1300 @@ experimental domain CSS
       # Matches of CSS rules matching the ancestor node in the style inheritance chain.
       array of RuleMatch matchedCSSRules
 
+  # Inherited pseudo element matches from pseudos of an ancestor node.
+  type InheritedPseudoElementMatches extends object
+    properties
+      # Matches of pseudo styles from the pseudos of an ancestor node.
+      array of PseudoElementMatches pseudoElements
+
   # Match data for a CSS rule.
   type RuleMatch extends object
     properties
@@ -1738,6 +1744,8 @@ experimental domain CSS
       optional array of PseudoElementMatches pseudoElements
       # A chain of inherited styles (from the immediate node parent up to the DOM tree root).
       optional array of InheritedStyleEntry inherited
+      # A chain of inherited pseudo element styles (from the immediate node parent up to the DOM tree root).
+      optional array of InheritedPseudoElementMatches inheritedPseudoElements
       # A list of CSS keyframed animations matching this node.
       optional array of CSSKeyframesRule cssKeyframesRules
```

## Roll protocol to r977469 — _2022-03-04T03:15:12.000Z_
######  Diff: [`d232328...2e0912d`](https://github.com/ChromeDevTools/devtools-protocol/compare/d232328...2e0912d)

```diff
@@ browser_protocol.pdl:791 @@ experimental domain Audits
       ClientMetadataHttpNotFound
       ClientMetadataNoResponse
       ClientMetadataInvalidResponse
+      ClientMetadataMissingPrivacyPolicyUrl
       ErrorFetchingSignin
       InvalidSigninResponse
       AccountsHttpNotFound
```

## Roll protocol to r975963 — _2022-02-28T22:15:14.000Z_
######  Diff: [`a7bfbac...d232328`](https://github.com/ChromeDevTools/devtools-protocol/compare/a7bfbac...d232328)

```diff
@@ browser_protocol.pdl:490 @@ experimental domain Audits
       WarnSameSiteStrictCrossDowngradeLax
       WarnSameSiteLaxCrossDowngradeStrict
       WarnSameSiteLaxCrossDowngradeLax
+      WarnAttributeValueExceedsMaxSize
 
   type CookieOperation extends string
     enum
```

## Roll protocol to r975498 — _2022-02-26T20:15:19.000Z_
######  Diff: [`14c3fe0...a7bfbac`](https://github.com/ChromeDevTools/devtools-protocol/compare/14c3fe0...a7bfbac)

```diff
@@ browser_protocol.pdl:6540 @@ experimental domain Overlay
     enum
       rgb
       hsl
+      hwb
       hex
 
   # Configurations for Persistent Grid Highlight
```

## Roll protocol to r975298 — _2022-02-25T22:15:19.000Z_
######  Diff: [`51bf736...14c3fe0`](https://github.com/ChromeDevTools/devtools-protocol/compare/51bf736...14c3fe0)

```diff
@@ browser_protocol.pdl:471 @@ experimental domain Audits
     properties
       Page.FrameId frameId
 
-  type SameSiteCookieExclusionReason extends string
+  type CookieExclusionReason extends string
     enum
       ExcludeSameSiteUnspecifiedTreatedAsLax
       ExcludeSameSiteNoneInsecure
@@ -480,7 +480,7 @@ experimental domain Audits
       ExcludeInvalidSameParty
       ExcludeSamePartyCrossPartyContext
 
-  type SameSiteCookieWarningReason extends string
+  type CookieWarningReason extends string
     enum
       WarnSameSiteUnspecifiedCrossSiteContext
       WarnSameSiteNoneInsecure
@@ -491,7 +491,7 @@ experimental domain Audits
       WarnSameSiteLaxCrossDowngradeStrict
       WarnSameSiteLaxCrossDowngradeLax
 
-  type SameSiteCookieOperation extends string
+  type CookieOperation extends string
     enum
       SetCookie
       ReadCookie
@@ -499,7 +499,7 @@ experimental domain Audits
   # This information is currently necessary, as the front-end has a difficult
   # time finding a specific cookie. With this, we can convey specific error
   # information without the cookie.
-  type SameSiteCookieIssueDetails extends object
+  type CookieIssueDetails extends object
     properties
       # If AffectedCookie is not set then rawCookieLine contains the raw
       # Set-Cookie header string. This hints at a problem where the
@@ -507,11 +507,11 @@ experimental domain Audits
       # that no valid cookie could be created.
       optional AffectedCookie cookie
       optional string rawCookieLine
-      array of SameSiteCookieWarningReason cookieWarningReasons
-      array of SameSiteCookieExclusionReason cookieExclusionReasons
+      array of CookieWarningReason cookieWarningReasons
+      array of CookieExclusionReason cookieExclusionReasons
       # Optionally identifies the site-for-cookies and the cookie url, which
       # may be used by the front-end as additional context.
-      SameSiteCookieOperation operation
+      CookieOperation operation
       optional string siteForCookies
       optional string cookieUrl
       optional AffectedRequest request
@@ -814,7 +814,7 @@ experimental domain Audits
   # information about the kind of issue.
   type InspectorIssueCode extends string
     enum
-      SameSiteCookieIssue
+      CookieIssue
       MixedContentIssue
       BlockedByResponseIssue
       HeavyAdIssue
@@ -836,7 +836,7 @@ experimental domain Audits
   # add a new optional field to this type.
   type InspectorIssueDetails extends object
     properties
-      optional SameSiteCookieIssueDetails sameSiteCookieIssueDetails
+      optional CookieIssueDetails cookieIssueDetails
       optional MixedContentIssueDetails mixedContentIssueDetails
       optional BlockedByResponseIssueDetails blockedByResponseIssueDetails
       optional HeavyAdIssueDetails heavyAdIssueDetails
```

## Roll protocol to r974996 — _2022-02-25T04:15:23.000Z_
######  Diff: [`aebe16a...51bf736`](https://github.com/ChromeDevTools/devtools-protocol/compare/aebe16a...51bf736)

```diff
@@ browser_protocol.pdl:8207 @@ domain Page
       BackForwardCacheNotRestoredReasonType type
       # Not restored reason
       BackForwardCacheNotRestoredReason reason
+      # Context associated with the reason. The meaning of this context is
+      # dependent on the reason:
+      # - EmbedderExtensionSentMessageToCachedFrame: the extension ID.
+      #
+      optional string context
 
   experimental type BackForwardCacheNotRestoredExplanationTree extends object
     properties
```