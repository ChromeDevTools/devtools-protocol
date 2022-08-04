

## Roll protocol to r1031356 — _2022-08-04T04:34:29.000Z_
######  Diff: [`ced9091...7fa58bb`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ced9091...7fa58bb`)

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

## Roll protocol to r897295 — _2021-06-30T09:16:16.000Z_
######  Diff: [`65148a9...6814a59`](https://github.com/ChromeDevTools/devtools-protocol/compare/`65148a9...6814a59`)

```diff
@@ browser_protocol.pdl:4738 @@ domain Network
       # Set for requests when the TrustToken API is used. Contains the parameters
       # passed by the developer (e.g. via "fetch") as understood by the backend.
       experimental optional TrustTokenParams trustTokenParams
-      # True if this resource request is considered to be the 'same site' as the
-      # request correspondinfg to the main frame.
-      experimental optional boolean isSameSite
 
   # Details of a signed certificate timestamp (SCT).
   type SignedCertificateTimestamp extends object
```

## Roll protocol to r896856 — _2021-06-29T11:16:10.000Z_
######  Diff: [`06ee96a...65148a9`](https://github.com/ChromeDevTools/devtools-protocol/compare/`06ee96a...65148a9`)

```diff
@@ browser_protocol.pdl:1458 @@ experimental domain CSS
       optional SourceRange range
       # Identifier of the stylesheet containing this object (if exists).
       optional StyleSheetId styleSheetId
-      # Optional name for the container.
-      optional string name
 
   # Information about amount of glyphs that were rendered with given font.
   type PlatformFontUsage extends object
@@ -2614,17 +2612,6 @@ domain DOM
       # Id of the node at given coordinates, only when enabled and requested document.
       optional NodeId nodeId
 
-  # Returns the container of the given node based on container query conditions.
-  # If containerName is given, it will find the nearest container with a matching name;
-  # otherwise it will find the nearest container regardless of its container name.
-  experimental command getContainerForNode
-    parameters
-      NodeId nodeId
-      optional string containerName
-    returns
-      # The container node for the given node, or null if not found.
-      optional NodeId nodeId
-
   # Fired when `Element`'s attribute is modified.
   event attributeModified
     parameters
```

## Roll protocol to r896125 — _2021-06-25T18:16:15.000Z_
######  Diff: [`6362220...06ee96a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6362220...06ee96a`)

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

## Roll protocol to r896035 — _2021-06-25T14:16:07.000Z_
######  Diff: [`95234d8...6362220`](https://github.com/ChromeDevTools/devtools-protocol/compare/`95234d8...6362220`)

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

## Roll protocol to r895982 — _2021-06-25T10:16:12.000Z_
######  Diff: [`6544760...95234d8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6544760...95234d8`)

```diff
@@ browser_protocol.pdl:793 @@ experimental domain Audits
       optional QuirksModeIssueDetails quirksModeIssueDetails
       optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
 
-  # A unique id for a DevTools inspector issue. Allows other entities (e.g.
-  # exceptions, CDP message, console messages, etc.) to reference an issue.
-  type IssueId extends string
-
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
     properties
@@ -804,7 +800,7 @@ experimental domain Audits
       InspectorIssueDetails details
       # A unique id for this issue. May be omitted if no other entity (e.g.
       # exception, CDP message, etc.) is referencing this issue.
-      optional IssueId issueId
+      optional string issueId
 
   # Returns the response body and size if it were re-encoded with the specified settings. Only
   # applies to images.
```

## Roll protocol to r894467 — _2021-06-22T00:16:13.000Z_
######  Diff: [`aaf1569...6544760`](https://github.com/ChromeDevTools/devtools-protocol/compare/`aaf1569...6544760`)

```diff
@@ browser_protocol.pdl:1265 @@ experimental domain CSS
       StyleSheetId styleSheetId
       # Owner frame identifier.
       Page.FrameId frameId
-      # Stylesheet resource URL. Empty if this is a constructed stylesheet created using
-      # new CSSStyleSheet() (but non-empty if this is a constructed sylesheet imported
-      # as a CSS module script).
+      # Stylesheet resource URL.
       string sourceURL
       # URL of source map associated with the stylesheet (if any).
       optional string sourceMapURL
@@ -1289,8 +1287,7 @@ experimental domain CSS
       # <link> element's stylesheets become mutable only if DevTools modifies them.
       # Constructed stylesheets (new CSSStyleSheet()) are mutable immediately after creation.
       boolean isMutable
-      # True if this stylesheet is created through new CSSStyleSheet() or imported as a
-      # CSS module script.
+      # Whether this stylesheet is a constructed stylesheet (created using new CSSStyleSheet()).
       boolean isConstructed
       # Line offset of the stylesheet within the resource (zero based).
       number startLine
```

## Roll protocol to r894172 — _2021-06-21T08:16:09.000Z_
######  Diff: [`fe543d9...aaf1569`](https://github.com/ChromeDevTools/devtools-protocol/compare/`fe543d9...aaf1569`)

```diff
@@ browser_protocol.pdl:7686 @@ domain Page
       BrowsingInstanceNotSwapped
       BackForwardCacheDisabledForDelegate
       OptInUnloadHeaderNotPresent
+      UnloadHandlerExistsInMainFrame
       UnloadHandlerExistsInSubFrame
       ServiceWorkerUnregistration
       #Blocklisted features
```

## Roll protocol to r894033 — _2021-06-19T00:16:28.000Z_
######  Diff: [`e7ab713...fe543d9`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e7ab713...fe543d9`)

```diff
@@ browser_protocol.pdl:6546 @@ domain Page
       ch-rtt
       ch-ua
       ch-ua-arch
-      ch-ua-bitness
       ch-ua-platform
       ch-ua-model
       ch-ua-mobile
```

## Roll protocol to r894020 — _2021-06-18T23:16:01.000Z_
######  Diff: [`6abba71...e7ab713`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6abba71...e7ab713`)

```diff
@@ browser_protocol.pdl:6971 @@ domain Page
       optional enum format
         jpeg
         png
-        webp
       # Compression quality from range [0..100] (jpeg only).
       optional integer quality
       # Capture the screenshot of a given region only.
```

## Roll protocol to r893712 — _2021-06-18T06:16:15.000Z_
######  Diff: [`7ad22bc...6abba71`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7ad22bc...6abba71`)

```diff
@@ browser_protocol.pdl:7694 @@ domain Page
       MainResourceHasCacheControlNoCache
       SubresourceHasCacheControlNoStore
       SubresourceHasCacheControlNoCache
+      PageShowEventListener
+      PageHideEventListener
+      BeforeUnloadEventListener
+      UnloadEventListener
+      FreezeEventListener
+      ResumeEventListener
       ContainsPlugins
       DocumentLoaded
       DedicatedWorkerOrWorklet
```

## Roll protocol to r892514 — _2021-06-15T10:16:15.000Z_
######  Diff: [`042399a...7ad22bc`](https://github.com/ChromeDevTools/devtools-protocol/compare/`042399a...7ad22bc`)

```diff
@@ browser_protocol.pdl:7686 @@ domain Page
       OptInUnloadHeaderNotPresent
       UnloadHandlerExistsInMainFrame
       UnloadHandlerExistsInSubFrame
-      ServiceWorkerUnregistration
-      #Blocklisted features
+      # Blocklisted features
       WebSocket
       WebRTC
       MainResourceHasCacheControlNoStore
```

## Roll protocol to r892366 — _2021-06-15T01:16:09.000Z_
######  Diff: [`6286308...042399a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6286308...042399a`)

```diff
@@ browser_protocol.pdl:7713 @@ domain Page
       RequestedBackgroundWorkPermission
       BroadcastChannel
       IndexedDBConnection
+      WebVR
       WebXR
       SharedWorker
       WebLocks
```

## Roll protocol to r892017 — _2021-06-14T10:15:55.000Z_
######  Diff: [`077a282...6286308`](https://github.com/ChromeDevTools/devtools-protocol/compare/`077a282...6286308`)

```diff
@@ browser_protocol.pdl:6487 @@ domain Page
       # This frame is the root of an ad frame.
       root
 
-  experimental type AdFrameExplanation extends string
-    enum
-      ParentIsAd
-      CreatedByAdScript
-      MatchedBlockingRule
-
-  # Indicates whether a frame has been identified as an ad and why.
-  experimental type AdFrameStatus extends object
-    properties
-      AdFrameType adFrameType
-      optional array of AdFrameExplanation explanations
-
   # Indicates whether the frame is a secure context and why it is the case.
   experimental type SecureContextType extends string
     enum
@@ -6687,8 +6675,8 @@ domain Page
       string mimeType
       # If the frame failed to load, this contains the URL that could not be loaded. Note that unlike url above, this URL may contain a fragment.
       experimental optional string unreachableUrl
-      # Indicates whether this frame was tagged as an ad and why.
-      experimental optional AdFrameStatus adFrameStatus
+      # Indicates whether this frame was tagged as an ad.
+      experimental optional AdFrameType adFrameType
       # Indicates whether the main document is a secure context and explains why that is the case.
       experimental SecureContextType secureContextType
       # Indicates whether this is a cross origin isolated context.
```

## Roll protocol to r891247 — _2021-06-10T16:16:15.000Z_
######  Diff: [`28c241d...077a282`](https://github.com/ChromeDevTools/devtools-protocol/compare/`28c241d...077a282`)

```diff
@@ browser_protocol.pdl:7625 @@ domain Page
       string name
       Network.MonotonicTime timestamp
 
-  # List of not restored reasons for back-forward cache.
-  experimental type BackForwardCacheNotRestoredReason extends string
-    enum
-      NotMainFrame
-      BackForwardCacheDisabled
-      RelatedActiveContentsExist
-      HTTPStatusNotOK
-      SchemeNotHTTPOrHTTPS
-      Loading
-      WasGrantedMediaAccess
-      DisableForRenderFrameHostCalled
-      DomainNotAllowed
-      HTTPMethodNotGET
-      SubframeIsNavigating
-      Timeout
-      CacheLimit
-      JavaScriptExecution
-      RendererProcessKilled
-      RendererProcessCrashed
-      GrantedMediaStreamAccess
-      SchedulerTrackedFeatureUsed
-      ConflictingBrowsingInstance
-      CacheFlushed
-      ServiceWorkerVersionActivation
-      SessionRestored
-      ServiceWorkerPostMessage
-      EnteredBackForwardCacheBeforeServiceWorkerHostAdded
-      RenderFrameHostReused_SameSite
-      RenderFrameHostReused_CrossSite
-      ServiceWorkerClaim
-      IgnoreEventAndEvict
-      HaveInnerContents
-      TimeoutPuttingInCache
-      BackForwardCacheDisabledByLowMemory
-      BackForwardCacheDisabledByCommandLine
-      NetworkRequestDatapipeDrainedAsBytesConsumer
-      NetworkRequestRedirected
-      NetworkRequestTimeout
-      NetworkExceedsBufferLimit
-      NavigationCancelledWhileRestoring
-      NotMostRecentNavigationEntry
-      BackForwardCacheDisabledForPrerender
-      UserAgentOverrideDiffers
-      ForegroundCacheLimit
-      BrowsingInstanceNotSwapped
-      BackForwardCacheDisabledForDelegate
-      OptInUnloadHeaderNotPresent
-      UnloadHandlerExistsInMainFrame
-      UnloadHandlerExistsInSubFrame
-      # Blocklisted features
-      WebSocket
-      WebRTC
-      MainResourceHasCacheControlNoStore
-      MainResourceHasCacheControlNoCache
-      SubresourceHasCacheControlNoStore
-      SubresourceHasCacheControlNoCache
-      PageShowEventListener
-      PageHideEventListener
-      BeforeUnloadEventListener
-      UnloadEventListener
-      FreezeEventListener
-      ResumeEventListener
-      ContainsPlugins
-      DocumentLoaded
-      DedicatedWorkerOrWorklet
-      OutstandingNetworkRequestOthers
-      OutstandingIndexedDBTransaction
-      RequestedGeolocationPermission
-      RequestedNotificationsPermission
-      RequestedMIDIPermission
-      RequestedAudioCapturePermission
-      RequestedVideoCapturePermission
-      RequestedBackForwardCacheBlockedSensors
-      RequestedBackgroundWorkPermission
-      BroadcastChannel
-      IndexedDBConnection
-      WebVR
-      WebXR
-      SharedWorker
-      WebLocks
-      WebHID
-      WebShare
-      RequestedStorageAccessGrant
-      WebNfc
-      WebFileSystem
-      OutstandingNetworkRequestFetch
-      OutstandingNetworkRequestXHR
-      AppBanner
-      Printing
-      WebDatabase
-      PictureInPicture
-      Portal
-      SpeechRecognizer
-      IdleManager
-      PaymentManager
-      SpeechSynthesis
-      KeyboardLock
-      WebOTPService
-      OutstandingNetworkRequestDirectSocket
-      IsolatedWorldScript
-      InjectedStyleSheet
-      MediaSessionImplOnServiceCreated
-      Unknown
-
-  # Types of not restored reasons for back-forward cache.
-  experimental type BackForwardCacheNotRestoredReasonType extends string
-    enum
-      SupportPending
-      PageSupportNeeded
-      Circumstantial
-
-  experimental type BackForwardCacheNotRestoredExplanation extends object
-    properties
-      # Type of the reason
-      BackForwardCacheNotRestoredReasonType type
-      # Not restored reason
-      BackForwardCacheNotRestoredReason reason
-
   # Fired for failed bfcache history navigations if BackForwardCache feature is enabled. Do
   # not assume any ordering with the Page.frameNavigated event. This event is fired only for
   # main-frame history navigation where the document changes (non-same-document navigations),
@@ -7753,8 +7635,6 @@ domain Page
       Network.LoaderId loaderId
       # The frame id of the associated frame.
       FrameId frameId
-      # Array of reasons why the page could not be cached. This must not be empty.
-      array of BackForwardCacheNotRestoredExplanation notRestoredExplanations
 
   event loadEventFired
     parameters
```

## Roll protocol to r891108 — _2021-06-10T06:16:17.000Z_
######  Diff: [`cbc2ddb...28c241d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`cbc2ddb...28c241d`)

```diff
@@ browser_protocol.pdl:5546 @@ domain Network
       # Cookies to be set.
       array of CookieParam cookies
 
+  # For testing.
+  experimental command setDataSizeLimitsForTest
+    parameters
+      # Maximum total buffer size.
+      integer maxTotalSize
+      # Maximum per-resource size.
+      integer maxResourceSize
+
   # Specifies whether to always send extra HTTP headers with the requests from this page.
   command setExtraHTTPHeaders
     parameters
```

## Roll protocol to r890975 — _2021-06-09T22:17:50.000Z_
######  Diff: [`bfcd0a3...cbc2ddb`](https://github.com/ChromeDevTools/devtools-protocol/compare/`bfcd0a3...cbc2ddb`)

```diff
@@ browser_protocol.pdl:1698 @@ experimental domain CSS
       # The resulting CSS media rule after modification.
       CSSMedia media
 
-  # Modifies the expression of a container query.
-  experimental command setContainerQueryText
-    parameters
-      StyleSheetId styleSheetId
-      SourceRange range
-      string text
-    returns
-      # The resulting CSS container query rule after modification.
-      CSSContainerQuery containerQuery
-
   # Modifies the rule selector.
   command setRuleSelector
     parameters
```

## Roll protocol to r888392 — _2021-06-02T11:16:05.000Z_
######  Diff: [`564611d...bfcd0a3`](https://github.com/ChromeDevTools/devtools-protocol/compare/`564611d...bfcd0a3`)

```diff
@@ browser_protocol.pdl:1315 @@ experimental domain CSS
       # Media list array (for rules involving media queries). The array enumerates media queries
       # starting with the innermost one, going outwards.
       optional array of CSSMedia media
-      # Container query list array (for rules involving container queries).
-      # The array enumerates container queries starting with the innermost one, going outwards.
-      experimental optional array of CSSContainerQuery containerQueries
 
   # CSS coverage information.
   type RuleUsage extends object
@@ -1441,17 +1438,6 @@ experimental domain CSS
       # Computed length of media query expression (if applicable).
       optional number computedLength
 
-  # CSS container query rule descriptor.
-  experimental type CSSContainerQuery extends object
-    properties
-      # Container query text.
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

## Roll protocol to r887728 — _2021-05-31T12:16:11.000Z_
######  Diff: [`76e104a...564611d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`76e104a...564611d`)

```diff
@@ browser_protocol.pdl:5968 @@ domain Network
   experimental type CrossOriginEmbedderPolicyValue extends string
     enum
       None
-      Credentialless
+      CorsOrCredentialless
       RequireCorp
 
   experimental type CrossOriginEmbedderPolicyStatus extends object
```

## Roll protocol to r887710 — _2021-05-31T11:16:13.000Z_
######  Diff: [`d440402...76e104a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d440402...76e104a`)

```diff
@@ browser_protocol.pdl:798 @@ experimental domain Audits
     properties
       InspectorIssueCode code
       InspectorIssueDetails details
-      # A unique id for this issue. May be omitted if no other entity (e.g.
-      # exception, CDP message, etc.) is referencing this issue.
-      optional string issueId
 
   # Returns the response body and size if it were re-encoded with the specified settings. Only
   # applies to images.
```

## Roll protocol to r887064 — _2021-05-27T07:16:11.000Z_
######  Diff: [`35ec89b...d440402`](https://github.com/ChromeDevTools/devtools-protocol/compare/`35ec89b...d440402`)

```diff
@@ browser_protocol.pdl:509 @@ experimental domain Audits
       ExcludeSameSiteNoneInsecure
       ExcludeSameSiteLax
       ExcludeSameSiteStrict
-      ExcludeInvalidSameParty
 
   type SameSiteCookieWarningReason extends string
     enum
@@ -532,12 +531,7 @@ experimental domain Audits
   # information without the cookie.
   type SameSiteCookieIssueDetails extends object
     properties
-      # If AffectedCookie is not set then rawCookieLine contains the raw
-      # Set-Cookie header string. This hints at a problem where the
-      # cookie line is syntactically or semantically malformed in a way
-      # that no valid cookie could be created.
-      optional AffectedCookie cookie
-      optional string rawCookieLine
+      AffectedCookie cookie
       array of SameSiteCookieWarningReason cookieWarningReasons
       array of SameSiteCookieExclusionReason cookieExclusionReasons
       # Optionally identifies the site-for-cookies and the cookie url, which
```

## Roll protocol to r885657 — _2021-05-21T21:16:03.000Z_
######  Diff: [`d9ce37e...35ec89b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d9ce37e...35ec89b`)

```diff
@@ browser_protocol.pdl:5898 @@ domain Network
       # The number of obtained Trust Tokens on a successful "Issuance" operation.
       optional integer issuedTokenCount
 
-  # Fired once when parsing the .wbn file has succeeded.
-  # The event contains the information about the web bundle contents.
-  experimental event subresourceWebBundleMetadataReceived
-    parameters
-      # Request identifier. Used to match this information to another event.
-      RequestId requestId
-      # A list of URLs of resources in the subresource Web Bundle.
-      array of string urls
-
-  # Fired once when parsing the .wbn file has failed.
-  experimental event subresourceWebBundleMetadataError
-    parameters
-      # Request identifier. Used to match this information to another event.
-      RequestId requestId
-      # Error message
-      string errorMessage
-
-  # Fired when handling requests for resources within a .wbn file.
-  # Note: this will only be fired for resources that are requested by the webpage.
-  experimental event subresourceWebBundleInnerResponseParsed
-    parameters
-      # Request identifier of the subresource request
-      RequestId innerRequestId
-      # URL of the subresource resource.
-      string innerRequestURL
-      # Bundle request identifier. Used to match this information to another event.
-      # This made be absent in case when the instrumentation was enabled only
-      # after webbundle was parsed.
-      optional RequestId bundleRequestId
-
-  # Fired when request for resources within a .wbn file failed.
-  experimental event subresourceWebBundleInnerResponseError
-    parameters
-      # Request identifier of the subresource request
-      RequestId innerRequestId
-      # URL of the subresource resource.
-      string innerRequestURL
-      # Error message
-      string errorMessage
-      # Bundle request identifier. Used to match this information to another event.
-      # This made be absent in case when the instrumentation was enabled only
-      # after webbundle was parsed.
-      optional RequestId bundleRequestId
-
   experimental type CrossOriginOpenerPolicyValue extends string
     enum
       SameOrigin
```

## Roll protocol to r884712 — _2021-05-19T22:16:10.000Z_
######  Diff: [`dfcf9be...d9ce37e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`dfcf9be...d9ce37e`)

```diff
@@ browser_protocol.pdl:8758 @@ domain Fetch
 
   # Stages of the request to handle. Request will intercept before the request is
   # sent. Response will intercept after the response is received (but before response
-  # body is received).
+  # body is received.
   type RequestStage extends string
     enum
       Request
```

## Roll protocol to r884484 — _2021-05-19T15:16:15.000Z_
######  Diff: [`f8d7e27...dfcf9be`](https://github.com/ChromeDevTools/devtools-protocol/compare/`f8d7e27...dfcf9be`)

```diff
@@ browser_protocol.pdl:746 @@ experimental domain Audits
       Page.FrameId frameId
       Network.LoaderId loaderId
 
-  type NavigatorUserAgentIssueDetails extends object
-    properties
-      string url
-      optional SourceCodeLocation location
-
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -767,7 +762,6 @@ experimental domain Audits
       CorsIssue
       AttributionReportingIssue
       QuirksModeIssue
-      NavigatorUserAgentIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -785,7 +779,6 @@ experimental domain Audits
       optional CorsIssueDetails corsIssueDetails
       optional AttributionReportingIssueDetails attributionReportingIssueDetails
       optional QuirksModeIssueDetails quirksModeIssueDetails
-      optional NavigatorUserAgentIssueDetails navigatorUserAgentIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r884179 — _2021-05-18T22:16:18.000Z_
######  Diff: [`bc63f36...f8d7e27`](https://github.com/ChromeDevTools/devtools-protocol/compare/`bc63f36...f8d7e27`)

```diff
@@ browser_protocol.pdl:6499 @@ domain Page
       usb
       vertical-scroll
       web-share
-      window-placement
       xr-spatial-tracking
 
   # Reason for a permissions policy feature to be disabled.
```

## Roll protocol to r883894 — _2021-05-18T11:16:08.000Z_
######  Diff: [`56b0f11...bc63f36`](https://github.com/ChromeDevTools/devtools-protocol/compare/`56b0f11...bc63f36`)

```diff
@@ browser_protocol.pdl:6441 @@ domain Page
       PerformanceProfile
 
   # All Permissions Policy features. This enum should match the one defined
-  # in third_party/blink/renderer/core/permissions_policy/permissions_policy_features.json5.
+  # in renderer/core/feature_policy/feature_policy_features.json5.
   experimental type PermissionsPolicyFeature extends string
     enum
       accelerometer
@@ -6454,7 +6454,6 @@ domain Page
       ch-downlink
       ch-ect
       ch-lang
-      ch-prefers-color-scheme
       ch-rtt
       ch-ua
       ch-ua-arch
```

## Roll protocol to r883449 — _2021-05-17T13:16:08.000Z_
######  Diff: [`ea8402f...56b0f11`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ea8402f...56b0f11`)

```diff
@@ browser_protocol.pdl:1965 @@ domain DOM
       open
       closed
 
-  # Document compatibility mode.
-  type CompatibilityMode extends string
-    enum
-      QuirksMode
-      LimitedQuirksMode
-      NoQuirksMode
-
   # DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes.
   # DOMNode is a base node mirror type.
   type Node extends object
@@ -2036,7 +2029,6 @@ domain DOM
       optional array of BackendNode distributedNodes
       # Whether the node is SVG.
       optional boolean isSVG
-      optional CompatibilityMode compatibilityMode
 
   # A structure holding an RGBA color.
   type RGBA extends object
```

## Roll protocol to r882987 — _2021-05-14T16:16:22.000Z_
######  Diff: [`96c89c5...ea8402f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`96c89c5...ea8402f`)

```diff
@@ browser_protocol.pdl:6438 @@ domain Page
     enum
       accelerometer
       ambient-light-sensor
-      attribution-reporting
       autoplay
       camera
       ch-dpr
@@ -6458,6 +6457,7 @@ domain Page
       ch-width
       clipboard-read
       clipboard-write
+      conversion-measurement
       cross-origin-isolated
       direct-sockets
       display-capture
```

## Roll protocol to r882921 — _2021-05-14T09:16:15.000Z_
######  Diff: [`56788fe...96c89c5`](https://github.com/ChromeDevTools/devtools-protocol/compare/`56788fe...96c89c5`)

```diff
@@ browser_protocol.pdl:711 @@ experimental domain Audits
       Network.CorsErrorStatus corsErrorStatus
       boolean isWarning
       AffectedRequest request
-      optional SourceCodeLocation location
       optional string initiatorOrigin
       optional Network.IPAddressSpace resourceIPAddressSpace
       optional Network.ClientSecurityState clientSecurityState
@@ -4772,7 +4771,6 @@ domain Network
       HeaderDisallowedByPreflightResponse
       RedirectContainsCredentials
       InsecurePrivateNetwork
-      NoCorsRedirectModeNotFollow
 
   type CorsErrorStatus extends object
     properties
```

## Roll protocol to r882324 — _2021-05-12T22:16:51.000Z_
######  Diff: [`9062efe...56788fe`](https://github.com/ChromeDevTools/devtools-protocol/compare/`9062efe...56788fe`)

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

## Roll protocol to r882098 — _2021-05-12T16:16:24.000Z_
######  Diff: [`8ce157a...9062efe`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8ce157a...9062efe`)

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

## Roll protocol to r881485 — _2021-05-11T11:16:33.000Z_
######  Diff: [`febcae4...8ce157a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`febcae4...8ce157a`)

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

## Roll protocol to r881010 — _2021-05-10T16:16:13.000Z_
######  Diff: [`a81e89d...febcae4`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a81e89d...febcae4`)

```diff
@@ browser_protocol.pdl:6495 @@ domain Page
       boolean allowed
       optional PermissionsPolicyBlockLocator locator
 
-  # Origin Trial(https://www.chromium.org/blink/origin-trials) support.
-  # Status for an Origin Trial token.
-  experimental type OriginTrialTokenStatus extends string
-    enum
-      Success
-      NotSupported
-      Insecure
-      Expired
-      WrongOrigin
-      InvalidSignature
-      Malformed
-      WrongVersion
-      FeatureDisabled
-      TokenDisabled
-      FeatureDisabledForUser
-
-  # Status for an Origin Trial.
-  experimental type OriginTrialStatus extends string
-    enum
-      Enabled
-      ValidTokenNotProvided
-      OSNotSupported
-      TrialNotAllowed
-
-  experimental type OriginTrialUsageRestriction extends string
-    enum
-      None
-      Subset
-
-  experimental type OriginTrialToken extends object
-    properties
-      string origin
-      boolean matchSubDomains
-      string trialName
-      Network.TimeSinceEpoch expiryTime
-      boolean isThirdParty
-      OriginTrialUsageRestriction usageRestriction
-
-  experimental type OriginTrialTokenWithStatus extends object
-    properties
-      string rawTokenText
-      # `parsedToken` is present only when the token is extractable and
-      # parsable.
-      optional OriginTrialToken parsedToken
-      OriginTrialTokenStatus status
-
-  experimental type OriginTrial extends object
-    properties
-      string trialName
-      OriginTrialStatus status
-      array of OriginTrialTokenWithStatus tokensWithStatus
-
   # Information about the Frame on the page.
   type Frame extends object
     properties
@@ -6581,8 +6529,6 @@ domain Page
       experimental CrossOriginIsolatedContextType crossOriginIsolatedContextType
       # Indicated which gated APIs / features are available.
       experimental array of GatedAPIFeatures gatedAPIFeatures
-      # Frame document's origin trials with at least one token present.
-      experimental optional array of OriginTrial originTrials
 
   # Information about the Resource on the page.
   experimental type FrameResource extends object
```

## Roll protocol to r880455 — _2021-05-07T17:16:12.000Z_
######  Diff: [`2dd45d5...a81e89d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`2dd45d5...a81e89d`)

```diff
@@ browser_protocol.pdl:6443 @@ domain Page
       clipboard-write
       conversion-measurement
       cross-origin-isolated
-      direct-sockets
       display-capture
       document-domain
       encrypted-media
```

## Roll protocol to r878340 — _2021-05-03T08:16:03.000Z_
######  Diff: [`08981cb...2dd45d5`](https://github.com/ChromeDevTools/devtools-protocol/compare/`08981cb...2dd45d5`)

```diff
@@ browser_protocol.pdl:6785 @@ domain Page
       # This world name will be used as the ExecutionContextDescription::name when the corresponding
       # event is emitted.
       experimental optional string worldName
-      # Specifies whether command line API should be available to the script, defaults
-      # to false.
-      experimental optional boolean includeCommandLineAPI
     returns
       # Identifier of the added script.
       ScriptIdentifier identifier
```

## Roll protocol to r878026 — _2021-04-30T19:16:18.000Z_
######  Diff: [`c3a5cc5...08981cb`](https://github.com/ChromeDevTools/devtools-protocol/compare/`c3a5cc5...08981cb`)

```diff
@@ browser_protocol.pdl:5144 @@ domain Network
   # Request pattern for interception.
   experimental type RequestPattern extends object
     properties
-      # Wildcards (`'*'` -> zero or more, `'?'` -> exactly one) are allowed. Escape character is
-      # backslash. Omitting is equivalent to `"*"`.
+      # Wildcards ('*' -> zero or more, '?' -> exactly one) are allowed. Escape character is
+      # backslash. Omitting is equivalent to "*".
       optional string urlPattern
       # If set, only requests for matching resource types will be intercepted.
       optional ResourceType resourceType
@@ -8675,8 +8675,8 @@ domain Fetch
 
   type RequestPattern extends object
     properties
-      # Wildcards (`'*'` -> zero or more, `'?'` -> exactly one) are allowed. Escape character is
-      # backslash. Omitting is equivalent to `"*"`.
+      # Wildcards ('*' -> zero or more, '?' -> exactly one) are allowed. Escape character is
+      # backslash. Omitting is equivalent to "*".
       optional string urlPattern
       # If set, only requests for matching resource types will be intercepted.
       optional Network.ResourceType resourceType
```

## Roll protocol to r877890 — _2021-04-30T13:16:13.000Z_
######  Diff: [`987bbb1...c3a5cc5`](https://github.com/ChromeDevTools/devtools-protocol/compare/`987bbb1...c3a5cc5`)

```diff
@@ browser_protocol.pdl:6466 @@ domain Page
       publickey-credentials-get
       screen-wake-lock
       serial
-      shared-autofill
       storage-access-api
       sync-xhr
       trust-token-redemption
```

## Roll protocol to r876958 — _2021-04-28T08:16:04.000Z_
######  Diff: [`7eb19da...987bbb1`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7eb19da...987bbb1`)

```diff
@@ browser_protocol.pdl:718 @@ experimental domain Audits
   type AttributionReportingIssueType extends string
     enum
       PermissionPolicyDisabled
-      InvalidAttributionSourceEventId
       InvalidAttributionData
       AttributionSourceUntrustworthyOrigin
-      AttributionUntrustworthyOrigin
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
```

## Roll protocol to r876535 — _2021-04-27T11:16:08.000Z_
######  Diff: [`ce4cfab...7eb19da`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ce4cfab...7eb19da`)

```diff
@@ browser_protocol.pdl:719 @@ experimental domain Audits
     enum
       PermissionPolicyDisabled
       InvalidAttributionData
-      AttributionSourceUntrustworthyOrigin
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
```

## Roll protocol to r876073 — _2021-04-26T08:16:05.000Z_
######  Diff: [`8676f73...ce4cfab`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8676f73...ce4cfab`)

```diff
@@ browser_protocol.pdl:668 @@ experimental domain Audits
       CreationIssue
 
   # Details for a issue arising from an SAB being instantiated in, or
-  # transferred to a context that is not cross-origin isolated.
+  # transfered to a context that is not cross-origin isolated.
   type SharedArrayBufferIssueDetails extends object
     properties
       SourceCodeLocation sourceCodeLocation
@@ -1001,7 +1001,7 @@ domain Browser
         default
       # BrowserContext to set download behavior. When omitted, default browser context is used.
       optional BrowserContextID browserContextId
-      # The default path to save downloaded files to. This is required if behavior is set to 'allow'
+      # The default path to save downloaded files to. This is requred if behavior is set to 'allow'
       # or 'allowAndName'.
       optional string downloadPath
       # Whether to emit download events (defaults to false).
@@ -2591,10 +2591,10 @@ domain DOM
       # Id of the node that has been removed.
       NodeId nodeId
 
-  # Called when distribution is changed.
+  # Called when distrubution is changed.
   experimental event distributedNodesUpdated
     parameters
-      # Insertion point where distributed nodes were updated.
+      # Insertion point where distrubuted nodes were updated.
       NodeId insertionPointId
       # Distributed nodes for given insertion point.
       array of BackendNode distributedNodes
@@ -3279,10 +3279,10 @@ domain Emulation
       # True if emulation is supported.
       boolean result
 
-  # Clears the overridden device metrics.
+  # Clears the overriden device metrics.
   command clearDeviceMetricsOverride
 
-  # Clears the overridden Geolocation Position and Error.
+  # Clears the overriden Geolocation Position and Error.
   command clearGeolocationOverride
 
   # Requests that page scale factor is reset to initial values.
@@ -3444,7 +3444,7 @@ domain Emulation
       # If set the virtual time policy change should be deferred until any frame starts navigating.
       # Note any previous deferred policy change is superseded.
       optional boolean waitForNavigation
-      # If set, base::Time::Now will be overridden to initially return this value.
+      # If set, base::Time::Now will be overriden to initially return this value.
       optional Network.TimeSinceEpoch initialVirtualTime
     returns
       # Absolute timestamp at which virtual time was first enabled (up time in milliseconds).
@@ -3560,7 +3560,7 @@ experimental domain HeadlessExperimental
 # Input/Output operations for streams produced by DevTools.
 domain IO
 
-  # This is either obtained from another method or specified as `blob:&lt;uuid&gt;` where
+  # This is either obtained from another method or specifed as `blob:&lt;uuid&gt;` where
   # `&lt;uuid&gt` is an UUID of a Blob.
   type StreamHandle extends string
 
@@ -3585,7 +3585,7 @@ domain IO
       optional boolean base64Encoded
       # Data that were read.
       string data
-      # Set if the end-of-file condition occurred while reading.
+      # Set if the end-of-file condition occured while reading.
       boolean eof
 
   # Return UUID of Blob object specified by a remote object id.
@@ -5146,7 +5146,7 @@ domain Network
       optional string urlPattern
       # If set, only requests for matching resource types will be intercepted.
       optional ResourceType resourceType
-      # Stage at which to begin intercepting requests. Default is Request.
+      # Stage at wich to begin intercepting requests. Default is Request.
       optional InterceptionStage interceptionStage
 
   # Information about a signed exchange signature.
@@ -6818,7 +6818,7 @@ domain Page
       # Serialized page data.
       string data
 
-  # Clears the overridden device metrics.
+  # Clears the overriden device metrics.
   experimental deprecated command clearDeviceMetricsOverride
     # Use 'Emulation.clearDeviceMetricsOverride' instead
     redirect Emulation
@@ -6828,7 +6828,7 @@ domain Page
     # Use 'DeviceOrientation.clearDeviceOrientationOverride' instead
     redirect DeviceOrientation
 
-  # Clears the overridden Geolocation Position and Error.
+  # Clears the overriden Geolocation Position and Error.
   deprecated command clearGeolocationOverride
     # Use 'Emulation.clearGeolocationOverride' instead
     redirect Emulation
@@ -7167,7 +7167,7 @@ domain Page
         deny
         allow
         default
-      # The default path to save downloaded files to. This is required if behavior is set to 'allow'
+      # The default path to save downloaded files to. This is requred if behavior is set to 'allow'
       optional string downloadPath
 
   # Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position
@@ -8033,7 +8033,7 @@ experimental domain Storage
       # Security origin.
       string origin
       # The quota size (in bytes) to override the original quota with.
-      # If this is called multiple times, the overridden quota will be equal to
+      # If this is called multiple times, the overriden quota will be equal to
       # the quotaSize provided in the final call. If this is called without
       # specifying a quotaSize, the quota will be reset to the default value for
       # the specified origin. If this is called multiple times with different
@@ -8676,7 +8676,7 @@ domain Fetch
       optional string urlPattern
       # If set, only requests for matching resource types will be intercepted.
       optional Network.ResourceType resourceType
-      # Stage at which to begin intercepting requests. Default is Request.
+      # Stage at wich to begin intercepting requests. Default is Request.
       optional RequestStage requestStage
 
   # Response HTTP header entry
@@ -8906,7 +8906,7 @@ experimental domain WebAudio
     properties
       # The current context time in second in BaseAudioContext.
       number currentTime
-      # The time spent on rendering graph divided by render quantum duration,
+      # The time spent on rendering graph divided by render qunatum duration,
       # and multiplied by 100. 100 means the audio renderer reached the full
       # capacity and glitch may occur.
       number renderCapacity
@@ -9273,8 +9273,8 @@ experimental domain Media
       PlayerId playerId
       array of PlayerError errors
 
-  # Called whenever a player is created, or when a new agent joins and receives
-  # a list of active players. If an agent is restored, it will receive the full
+  # Called whenever a player is created, or when a new agent joins and recieves
+  # a list of active players. If an agent is restored, it will recieve the full
   # list of player ids and all events again.
   event playersCreated
     parameters
```

## Roll protocol to r873728 — _2021-04-19T08:16:10.000Z_
######  Diff: [`3e18e97...8676f73`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3e18e97...8676f73`)

```diff
@@ browser_protocol.pdl:718 @@ experimental domain Audits
   type AttributionReportingIssueType extends string
     enum
       PermissionPolicyDisabled
-      InvalidAttributionData
 
   # Details for issues around "Attribution Reporting API" usage.
   # Explainer: https://github.com/WICG/conversion-measurement-api
@@ -728,7 +727,6 @@ experimental domain Audits
       optional AffectedFrame frame
       optional AffectedRequest request
       optional DOM.BackendNodeId violatingNodeId
-      optional string invalidParameter
 
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
```

## Roll protocol to r873348 — _2021-04-16T17:16:32.000Z_
######  Diff: [`143b9aa...3e18e97`](https://github.com/ChromeDevTools/devtools-protocol/compare/`143b9aa...3e18e97`)

```diff
@@ browser_protocol.pdl:9094 @@ experimental domain WebAuthn
       # https://w3c.github.io/webauthn#largeBlob
       # Defaults to false.
       optional boolean hasLargeBlob
-      # If set to true, the authenticator will support the credBlob extension.
-      # https://fidoalliance.org/specs/fido-v2.1-rd-20201208/fido-client-to-authenticator-protocol-v2.1-rd-20201208.html#sctn-credBlob-extension
-      # Defaults to false.
-      optional boolean hasCredBlob
       # If set to true, tests of user presence will succeed immediately.
       # Otherwise, they will not be resolved. Defaults to true.
       optional boolean automaticPresenceSimulation
```

## Roll protocol to r873231 — _2021-04-16T08:16:19.000Z_
######  Diff: [`1a49020...143b9aa`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1a49020...143b9aa`)

```diff
@@ browser_protocol.pdl:7459 @@ domain Page
       string name
       Network.MonotonicTime timestamp
 
-  # Fired for failed bfcache history navigations if BackForwardCache feature is enabled. Do
-  # not assume any ordering with the Page.frameNavigated event. This event is fired only for
-  # main-frame history navigation where the document changes (non-same-document navigations),
-  # when bfcache navigation fails.
-  experimental event backForwardCacheNotUsed
-    parameters
-      # The loader id for the associated navgation.
-      Network.LoaderId loaderId
-      # The frame id of the associated frame.
-      FrameId frameId
-
   event loadEventFired
     parameters
       Network.MonotonicTime timestamp
```

## Roll protocol to r872298 — _2021-04-14T06:16:06.000Z_
######  Diff: [`0dacfa7...1a49020`](https://github.com/ChromeDevTools/devtools-protocol/compare/`0dacfa7...1a49020`)

```diff
@@ browser_protocol.pdl:7329 @@ domain Page
         # A new frame target will be created (see Target.attachedToTarget).
         swap
 
-  # The type of a frameNavigated event.
-  experimental type NavigationType extends string
-    enum
-      Navigation
-      BackForwardCacheRestore
-
   # Fired once navigation of the frame has completed. Frame is now associated with the new loader.
   event frameNavigated
     parameters
       # Frame object.
       Frame frame
-      experimental NavigationType type
 
   # Fired when opening document to write to.
   experimental event documentOpened
```

## Roll protocol to r871838 — _2021-04-13T08:16:03.000Z_
######  Diff: [`a45730c...0dacfa7`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a45730c...0dacfa7`)

```diff
@@ browser_protocol.pdl:715 @@ experimental domain Audits
       optional Network.IPAddressSpace resourceIPAddressSpace
       optional Network.ClientSecurityState clientSecurityState
 
-  type AttributionReportingIssueType extends string
-    enum
-      PermissionPolicyDisabled
-
-  # Details for issues around "Attribution Reporting API" usage.
-  # Explainer: https://github.com/WICG/conversion-measurement-api
-  type AttributionReportingIssueDetails extends object
-    properties
-      AttributionReportingIssueType violationType
-      optional AffectedFrame frame
-      optional AffectedRequest request
-      optional DOM.BackendNodeId violatingNodeId
-
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -742,7 +729,6 @@ experimental domain Audits
       TrustedWebActivityIssue
       LowTextContrastIssue
       CorsIssue
-      AttributionReportingIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -758,7 +744,6 @@ experimental domain Audits
       optional TrustedWebActivityIssueDetails twaQualityEnforcementDetails
       optional LowTextContrastIssueDetails lowTextContrastIssueDetails
       optional CorsIssueDetails corsIssueDetails
-      optional AttributionReportingIssueDetails attributionReportingIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r871615 — _2021-04-12T20:16:16.000Z_
######  Diff: [`910add1...a45730c`](https://github.com/ChromeDevTools/devtools-protocol/compare/`910add1...a45730c`)

```diff
@@ browser_protocol.pdl:1986 @@ domain DOM
       optional Node templateContent
       # Pseudo elements associated with this node.
       optional array of Node pseudoElements
-      # Deprecated, as the HTML Imports API has been removed (crbug.com/937746).
-      # This property used to return the imported document for the HTMLImport links.
-      # The property is always undefined now.
-      deprecated optional Node importedDocument
+      # Import document for the HTMLImport links.
+      optional Node importedDocument
       # Distributed nodes for given insertion point.
       optional array of BackendNode distributedNodes
       # Whether the node is SVG.
```

## Roll protocol to r871496 — _2021-04-12T16:16:00.000Z_
######  Diff: [`ca9d8a4...910add1`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ca9d8a4...910add1`)

```diff
@@ browser_protocol.pdl:2987 @@ experimental domain DOMSnapshot
       optional array of Rectangle scrollRects
       # The client rect of nodes. Only available when includeDOMRects is set to true
       optional array of Rectangle clientRects
-      # The list of background colors that are blended with colors of overlapping elements.
-      experimental optional array of StringIndex blendedBackgroundColors
-      # The list of computed text opacities.
-      experimental optional array of number textColorOpacities
 
   # Table of details of the post layout rendered text positions. The exact layout should not be regarded as
   # stable and may change between versions.
@@ -3047,14 +3043,6 @@ experimental domain DOMSnapshot
       optional boolean includePaintOrder
       # Whether to include DOM rectangles (offsetRects, clientRects, scrollRects) into the snapshot
       optional boolean includeDOMRects
-      # Whether to include blended background colors in the snapshot (default: false).
-      # Blended background color is achieved by blending background colors of all elements
-      # that overlap with the current element.
-      experimental optional boolean includeBlendedBackgroundColors
-      # Whether to include text color opacity in the snapshot (default: false).
-      # An element might have the opacity property set that affects the text color of the element.
-      # The final text color opacity is computed based on the opacity of all overlapping elements.
-      experimental optional boolean includeTextColorOpacities
     returns
       # The nodes in the DOM tree. The DOMNode at index 0 corresponds to the root document.
       array of DocumentSnapshot documents
```

## Roll protocol to r871249 — _2021-04-10T11:16:12.000Z_
######  Diff: [`7dd7cbb...ca9d8a4`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7dd7cbb...ca9d8a4`)

```diff
@@ browser_protocol.pdl:3450 @@ domain Emulation
   experimental type DisabledImageType extends string
     enum
       avif
-      jxl
       webp
 
   experimental command setDisabledImageTypes
```

## Roll protocol to r869921 — _2021-04-07T08:16:07.000Z_
######  Diff: [`b2ed548...7dd7cbb`](https://github.com/ChromeDevTools/devtools-protocol/compare/`b2ed548...7dd7cbb`)

```diff
@@ browser_protocol.pdl:3986 @@ domain Input
       # Ignores input events processing when set to true.
       boolean ignore
 
-  # Prevents default drag and drop behavior and instead emits `Input.dragIntercepted` events.
-  # Drag and drop behavior can be directly controlled via `Input.dispatchDragEvent`.
-  experimental command setInterceptDrags
-    parameters
-      boolean enabled
-
   # Synthesizes a pinch gesture over a time period by issuing appropriate touch events.
   experimental command synthesizePinchGesture
     parameters
@@ -4053,12 +4047,6 @@ domain Input
       # for the preferred input type).
       optional GestureSourceType gestureSourceType
 
-  # Emitted only when `Input.setInterceptDrags` is enabled. Use this data with `Input.dispatchDragEvent` to
-  # restore normal drag and drop behavior.
-  experimental event dragIntercepted
-    parameters
-      DragData data
-
 experimental domain Inspector
 
   # Disables inspector domain notifications.
```

## Roll protocol to r869754 — _2021-04-06T23:16:23.000Z_
######  Diff: [`0210b99...b2ed548`](https://github.com/ChromeDevTools/devtools-protocol/compare/`0210b99...b2ed548`)

```diff
@@ browser_protocol.pdl:987 @@ domain Browser
       # The default path to save downloaded files to. This is requred if behavior is set to 'allow'
       # or 'allowAndName'.
       optional string downloadPath
-      # Whether to emit download events (defaults to false).
-      optional boolean eventsEnabled
 
   # Cancel a download if in progress
   experimental command cancelDownload
@@ -998,33 +996,6 @@ domain Browser
       # BrowserContext to perform the action in. When omitted, default browser context is used.
       optional BrowserContextID browserContextId
 
-  # Fired when page is about to start a download.
-  experimental event downloadWillBegin
-    parameters
-      # Id of the frame that caused the download to begin.
-      Page.FrameId frameId
-      # Global unique identifier of the download.
-      string guid
-      # URL of the resource being downloaded.
-      string url
-      # Suggested file name of the resource (the actual name of the file saved on disk may differ).
-      string suggestedFilename
-
-  # Fired when download makes progress. Last call has |done| == true.
-  experimental event downloadProgress
-    parameters
-      # Global unique identifier of the download.
-      string guid
-      # Total expected bytes to download.
-      number totalBytes
-      # Total bytes received.
-      number receivedBytes
-      # Download status.
-      enum state
-        inProgress
-        completed
-        canceled
-
   # Close browser gracefully.
   command close
 
@@ -7340,8 +7311,7 @@ domain Page
       FrameId frameId
 
   # Fired when page is about to start a download.
-  # Deprecated. Use Browser.downloadWillBegin instead.
-  experimental deprecated event downloadWillBegin
+  experimental event downloadWillBegin
     parameters
       # Id of the frame that caused download to begin.
       FrameId frameId
@@ -7353,8 +7323,7 @@ domain Page
       string suggestedFilename
 
   # Fired when download makes progress. Last call has |done| == true.
-  # Deprecated. Use Browser.downloadProgress instead.
-  experimental deprecated event downloadProgress
+  experimental event downloadProgress
     parameters
       # Global unique identifier of the download.
       string guid
```

## Roll protocol to r869402 — _2021-04-06T06:16:05.000Z_
######  Diff: [`a3a5f92...0210b99`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a3a5f92...0210b99`)

```diff
@@ browser_protocol.pdl:3766 @@ domain Input
   # UTC time in seconds, counted from January 1, 1970.
   type TimeSinceEpoch extends number
 
-  experimental type DragDataItem extends object
-    properties
-      # Mime type of the dragged data.
-      string mimeType
-      # Depending of the value of `mimeType`, it contains the dragged link,
-      # text, HTML markup or any other data.
-      string data
-
-      # Title associated with a link. Only valid when `mimeType` == "text/uri-list".
-      optional string title
-
-      # Stores the base URL for the contained markup. Only valid when `mimeType`
-      # == "text/html".
-      optional string baseURL
-
-
-  experimental type DragData extends object
-    properties
-      array of DragDataItem items
-      # Bit field representing allowed drag operations. Copy = 1, Link = 2, Move = 16
-      integer dragOperationsMask
-
-  # Dispatches a drag event into the page.
-  experimental command dispatchDragEvent
-    parameters
-      # Type of the drag event.
-      enum type
-        dragEnter
-        dragOver
-        drop
-        dragCancel
-      # X coordinate of the event relative to the main frame's viewport in CSS pixels.
-      number x
-      # Y coordinate of the event relative to the main frame's viewport in CSS pixels. 0 refers to
-      # the top of the viewport and Y increases as it proceeds towards the bottom of the viewport.
-      number y
-      DragData data
-      # Bit field representing pressed modifier keys. Alt=1, Ctrl=2, Meta/Command=4, Shift=8
-      # (default: 0).
-      optional integer modifiers
-
   # Dispatches a key event to the page.
   command dispatchKeyEvent
     parameters
```

## Roll protocol to r868034 — _2021-03-31T10:16:20.000Z_
######  Diff: [`3948369...a3a5f92`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3948369...a3a5f92`)

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

## Roll protocol to r867593 — _2021-03-30T14:16:08.000Z_
######  Diff: [`154b166...3948369`](https://github.com/ChromeDevTools/devtools-protocol/compare/`154b166...3948369`)

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

## Roll protocol to r867545 — _2021-03-30T10:16:09.000Z_
######  Diff: [`f7c029d...154b166`](https://github.com/ChromeDevTools/devtools-protocol/compare/`f7c029d...154b166`)

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

## Roll protocol to r866556 — _2021-03-25T12:16:07.000Z_
######  Diff: [`70fd1b8...f7c029d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`70fd1b8...f7c029d`)

```diff
@@ browser_protocol.pdl:711 @@ experimental domain Audits
       Network.CorsErrorStatus corsErrorStatus
       boolean isWarning
       AffectedRequest request
-      optional string initiatorOrigin
       optional Network.IPAddressSpace resourceIPAddressSpace
       optional Network.ClientSecurityState clientSecurityState
```

## Roll protocol to r866105 — _2021-03-24T14:16:09.000Z_
######  Diff: [`6024018...70fd1b8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6024018...70fd1b8`)

```diff
@@ browser_protocol.pdl:5104 @@ domain Network
       # Errors occurred while handling the signed exchagne.
       optional array of SignedExchangeError errors
 
-  # List of content encodings supported by the backend.
-  experimental type ContentEncoding extends string
-    enum
-      deflate
-      gzip
-      br
-
-  # Sets a list of content encodings that will be accepted. Empty list means no encoding is accepted.
-  experimental command setAcceptedEncodings
-    parameters
-      # List of accepted content encodings.
-      array of ContentEncoding encodings
-
-  # Clears accepted encodings set by setAcceptedEncodings
-  experimental command clearAcceptedEncodingsOverride
-
   # Tells whether clearing browser cache is supported.
   deprecated command canClearBrowserCache
     returns
```

## Roll protocol to r863986 — _2021-03-17T23:16:09.000Z_
######  Diff: [`576a381...6024018`](https://github.com/ChromeDevTools/devtools-protocol/compare/`576a381...6024018`)

```diff
@@ browser_protocol.pdl:6745 @@ domain Page
   # Returns metrics relating to the layouting of the page, such as viewport bounds/scale.
   command getLayoutMetrics
     returns
-      # Deprecated metrics relating to the layout viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssLayoutViewport` instead.
+      # Deprecated metrics relating to the layout viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `normalisedLayoutViewport` instead.
       deprecated LayoutViewport layoutViewport
-      # Deprecated metrics relating to the visual viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssVisualViewport` instead.
+      # Deprecated metrics relating to the visual viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `normalisedVisualViewport` instead.
       deprecated VisualViewport visualViewport
-      # Deprecated size of scrollable area. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `cssContentSize` instead.
+      # Deprecated size of scrollable area. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `normalisedContentSize` instead.
       deprecated DOM.Rect contentSize
       # Metrics relating to the layout viewport in CSS pixels.
       LayoutViewport cssLayoutViewport
```

## Roll protocol to r862770 — _2021-03-15T11:16:04.000Z_
######  Diff: [`c5bd6c3...576a381`](https://github.com/ChromeDevTools/devtools-protocol/compare/`c5bd6c3...576a381`)

```diff
@@ browser_protocol.pdl:8380 @@ experimental domain Tracing
       light
       detailed
 
-  # Backend type to use for tracing. `chrome` uses the Chrome-integrated
-  # tracing service and is supported on all platforms. `system` is only
-  # supported on Chrome OS and uses the Perfetto system tracing service.
-  # `auto` chooses `system` when the perfettoConfig provided to Tracing.start
-  # specifies at least one non-Chrome data source; otherwise uses `chrome`.
-  type TracingBackend extends string
-    enum
-      auto
-      chrome
-      system
-
   # Stop trace events collection.
   command end
 
@@ -8444,8 +8433,6 @@ experimental domain Tracing
       # When specified, the parameters `categories`, `options`, `traceConfig`
       # are ignored.
       optional binary perfettoConfig
-      # Backend type (defaults to `auto`)
-      optional TracingBackend tracingBackend
 
   event bufferUsage
     parameters
```

## Roll protocol to r862653 — _2021-03-13T04:16:21.000Z_
######  Diff: [`3704a77...c5bd6c3`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3704a77...c5bd6c3`)

```diff
@@ browser_protocol.pdl:4605 @@ domain Network
       inspector
       subresource-filter
       content-type
+      collapsed-by-client
       coep-frame-resource-needs-coep-header
       coop-sandboxed-iframe-cannot-navigate-to-coop-page
       corp-not-same-origin
```

## Roll protocol to r861504 — _2021-03-10T10:16:14.000Z_
######  Diff: [`7622144...3704a77`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7622144...3704a77`)

```diff
@@ browser_protocol.pdl:8168 @@ domain Target
   # Creates a new page.
   command createTarget
     parameters
-      # The initial URL the page will be navigated to. An empty string indicates about:blank.
+      # The initial URL the page will be navigated to.
       string url
       # Frame width in DIP (headless chrome only).
       optional integer width
```

## Roll protocol to r861447 — _2021-03-10T06:16:12.000Z_
######  Diff: [`b434e14...7622144`](https://github.com/ChromeDevTools/devtools-protocol/compare/`b434e14...7622144`)

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

## Roll protocol to r861373 — _2021-03-10T01:16:11.000Z_
######  Diff: [`1cdf17e...b434e14`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1cdf17e...b434e14`)

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

## Roll protocol to r860858 — _2021-03-08T21:16:14.000Z_
######  Diff: [`5fd49a5...1cdf17e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5fd49a5...1cdf17e`)

```diff
@@ browser_protocol.pdl:5751 @@ domain Network
   experimental type CrossOriginEmbedderPolicyValue extends string
     enum
       None
-      CorsOrCredentialless
       RequireCorp
 
   experimental type CrossOriginEmbedderPolicyStatus extends object
```

## Roll protocol to r860658 — _2021-03-08T09:16:00.000Z_
######  Diff: [`f3a387f...4d52df1`](https://github.com/ChromeDevTools/devtools-protocol/compare/`f3a387f...4d52df1`)

```diff
@@ browser_protocol.pdl:7897 @@ experimental domain Storage
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
   # A cache's contents have been modified.
   event cacheStorageContentUpdated
     parameters
```

## Roll protocol to r860415 — _2021-03-05T23:16:15.000Z_
######  Diff: [`219a9d6...f3a387f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`219a9d6...f3a387f`)

```diff
@@ browser_protocol.pdl:6745 @@ domain Page
   # Returns metrics relating to the layouting of the page, such as viewport bounds/scale.
   command getLayoutMetrics
     returns
-      # Deprecated metrics relating to the layout viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `normalisedLayoutViewport` instead.
-      deprecated LayoutViewport layoutViewport
-      # Deprecated metrics relating to the visual viewport. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `normalisedVisualViewport` instead.
-      deprecated VisualViewport visualViewport
-      # Deprecated size of scrollable area. Can be in DP or in CSS pixels depending on the `enable-use-zoom-for-dsf` flag. Use `normalisedContentSize` instead.
-      deprecated DOM.Rect contentSize
-      # Metrics relating to the layout viewport in CSS pixels.
-      LayoutViewport cssLayoutViewport
-      # Metrics relating to the visual viewport in CSS pixels.
-      VisualViewport cssVisualViewport
-      # Size of scrollable area in CSS pixels.
-      DOM.Rect cssContentSize
+      # Metrics relating to the layout viewport.
+      LayoutViewport layoutViewport
+      # Metrics relating to the visual viewport.
+      VisualViewport visualViewport
+      # Size of scrollable area.
+      DOM.Rect contentSize
 
   # Returns navigation history for the current page.
   command getNavigationHistory
```

## Roll protocol to r859327 — _2021-03-03T12:16:01.000Z_
######  Diff: [`dee574b...219a9d6`](https://github.com/ChromeDevTools/devtools-protocol/compare/`dee574b...219a9d6`)

```diff
@@ browser_protocol.pdl:987 @@ domain Browser
       # or 'allowAndName'.
       optional string downloadPath
 
-  # Cancel a download if in progress
-  experimental command cancelDownload
-    parameters
-      # Global unique identifier of the download.
-      string guid
-      # BrowserContext to perform the action in. When omitted, default browser context is used.
-      optional BrowserContextID browserContextId
-
   # Close browser gracefully.
   command close
```

## Roll protocol to r858754 — _2021-03-01T23:16:13.000Z_
######  Diff: [`78470ce...dee574b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`78470ce...dee574b`)

```diff
@@ browser_protocol.pdl:6594 @@ domain Page
       strictOriginWhenCrossOrigin
       unsafeUrl
 
-  # Per-script compilation cache parameters for `Page.produceCompilationCache`
-  experimental type CompilationCacheParams extends object
-    properties
-      # The URL of the script to produce a compilation cache entry for.
-      string url
-      # A hint to the backend whether eager compilation is recommended.
-      # (the actual compilation mode used is upon backend discretion).
-      optional boolean eager
-
   # Deprecated, please use addScriptToEvaluateOnNewDocument instead.
   experimental deprecated command addScriptToEvaluateOnLoad
     parameters
@@ -7072,24 +7063,10 @@ domain Page
   experimental command stopScreencast
 
   # Forces compilation cache to be generated for every subresource script.
-  # See also: `Page.produceCompilationCache`.
   experimental command setProduceCompilationCache
     parameters
       boolean enabled
 
-  # Requests backend to produce compilation cache for the specified scripts.
-  # Unlike setProduceCompilationCache, this allows client to only produce cache
-  # for specific scripts. `scripts` are appeneded to the list of scripts
-  # for which the cache for would produced. Disabling compilation cache with
-  # `setProduceCompilationCache` would reset all pending cache requests.
-  # The list may also be reset during page navigation.
-  # When script with a matching URL is encountered, the cache is optionally
-  # produced upon backend discretion, based on internal heuristics.
-  # See also: `Page.compilationCacheProduced`.
-  experimental command produceCompilationCache
-    parameters
-      array of CompilationCacheParams scripts
-
   # Seeds compilation cache for given url. Compilation cache does not survive
   # cross-process navigation.
   experimental command addCompilationCache
```

## Roll protocol to r856957 — _2021-02-24T02:16:02.000Z_
######  Diff: [`fe49497...b726157`](https://github.com/ChromeDevTools/devtools-protocol/compare/`fe49497...b726157`)

```diff
@@ js_protocol.pdl:211 @@ domain Debugger
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
@@ -493,7 +508,6 @@ domain Debugger
       enum reason
         ambiguous
         assert
-        CSPViolation
         debugCommand
         DOM
         EventListener
@@ -1008,9 +1022,8 @@ domain Runtime
         boolean
         symbol
         bigint
-      # Object subtype hint. Specified for `object` type values only.
-      # NOTE: If you change anything here, make sure to also update
-      # `subtype` in `ObjectPreview` and `PropertyPreview` below.
+        wasm
+      # Object subtype hint. Specified for `object` or `wasm` type values only.
       optional enum subtype
         array
         null
@@ -1029,8 +1042,12 @@ domain Runtime
         typedarray
         arraybuffer
         dataview
-        webassemblymemory
-        wasmvalue
+        i32
+        i64
+        f32
+        f64
+        v128
+        externref
       # Object class (constructor) name. Specified for `object` type values only.
       optional string className
       # Remote object value in case of primitive values or JSON values (if it was requested).
@@ -1083,13 +1100,6 @@ domain Runtime
         iterator
         generator
         error
-        proxy
-        promise
-        typedarray
-        arraybuffer
-        dataview
-        webassemblymemory
-        wasmvalue
       # String representation of the object.
       optional string description
       # True iff some of the properties or entries of the original object did not fit.
@@ -1132,13 +1142,6 @@ domain Runtime
         iterator
         generator
         error
-        proxy
-        promise
-        typedarray
-        arraybuffer
-        dataview
-        webassemblymemory
-        wasmvalue
 
   experimental type EntryPreview extends object
     properties
@@ -1221,10 +1224,6 @@ domain Runtime
       string origin
       # Human readable name describing given context.
       string name
-      # A system-unique execution context identifier. Unlike the id, this is unique accross
-      # multiple processes, so can be reliably used to identify specific context while backend
-      # performs a cross-process navigation.
-      experimental string uniqueId
       # Embedder-specific auxiliary data.
       optional object auxData
 
@@ -1388,9 +1387,6 @@ domain Runtime
       optional boolean silent
       # Specifies in which execution context to perform evaluation. If the parameter is omitted the
       # evaluation will be performed in the context of the inspected page.
-      # This is mutually exclusive with `uniqueContextId`, which offers an
-      # alternative way to identify the execution context that is more reliable
-      # in a multi-process environment.
       optional ExecutionContextId contextId
       # Whether the result is expected to be a JSON object that should be sent by value.
       optional boolean returnByValue
@@ -1417,13 +1413,6 @@ domain Runtime
       # when called with non-callable arguments. This flag bypasses CSP for this
       # evaluation and allows unsafe-eval. Defaults to true.
       experimental optional boolean allowUnsafeEvalBlockedByCSP
-      # An alternative way to specify the execution context to evaluate in.
-      # Compared to contextId that may be reused accross processes, this is guaranteed to be
-      # system-unique, so it can be used to prevent accidental evaluation of the expression
-      # in context different than intended (e.g. as a result of navigation accross process
-      # boundaries).
-      # This is mutually exclusive with `contextId`.
-      experimental optional string uniqueContextId
     returns
       # Evaluation result.
       RemoteObject result
@@ -1553,23 +1542,15 @@ domain Runtime
   # If executionContextId is empty, adds binding with the given name on the
   # global objects of all inspected contexts, including those created later,
   # bindings survive reloads.
+  # If executionContextId is specified, adds binding only on global object of
+  # given execution context.
   # Binding function takes exactly one argument, this argument should be string,
   # in case of any other input, function throws an exception.
   # Each binding function call produces Runtime.bindingCalled notification.
   experimental command addBinding
     parameters
       string name
-      # If specified, the binding would only be exposed to the specified
-      # execution context. If omitted and `executionContextName` is not set,
-      # the binding is exposed to all execution contexts of the target.
-      # This parameter is mutually exclusive with `executionContextName`.
       optional ExecutionContextId executionContextId
-      # If specified, the binding is exposed to the executionContext with
-      # matching name, even for contexts created after the binding is added.
-      # See also `ExecutionContext.name` and `worldName` parameter to
-      # `Page.addScriptToEvaluateOnNewDocument`.
-      # This parameter is mutually exclusive with `executionContextId`.
-      experimental optional string executionContextName
 
   # This method does not remove binding function from global object but
   # unsubscribes current runtime agent from Runtime.bindingCalled notifications.
```

## Roll protocol to r856702 — _2021-02-23T16:16:10.000Z_
######  Diff: [`498a1e5...fe49497`](https://github.com/ChromeDevTools/devtools-protocol/compare/`498a1e5...fe49497`)

```diff
@@ browser_protocol.pdl:783 @@ experimental domain Audits
   # Runs the contrast check for the target page. Found issues are reported
   # using Audits.issueAdded event.
   command checkContrast
-    parameters
-      # Whether to report WCAG AAA level issues. Default is false.
-      optional boolean reportAAA
 
   event issueAdded
     parameters
```

## Roll protocol to r854822 — _2021-02-17T17:16:17.000Z_
######  Diff: [`13b10d1...498a1e5`](https://github.com/ChromeDevTools/devtools-protocol/compare/`13b10d1...498a1e5`)

```diff
@@ browser_protocol.pdl:6248 @@ domain Page
       PerformanceMeasureMemory
       PerformanceProfile
 
-  # All Permissions Policy features. This enum should match the one defined
-  # in renderer/core/feature_policy/feature_policy_features.json5.
-  experimental type PermissionsPolicyFeature extends string
-    enum
-      accelerometer
-      ambient-light-sensor
-      autoplay
-      camera
-      ch-dpr
-      ch-device-memory
-      ch-downlink
-      ch-ect
-      ch-lang
-      ch-rtt
-      ch-ua
-      ch-ua-arch
-      ch-ua-platform
-      ch-ua-model
-      ch-ua-mobile
-      ch-ua-full-version
-      ch-ua-platform-version
-      ch-viewport-width
-      ch-width
-      clipboard-read
-      clipboard-write
-      conversion-measurement
-      cross-origin-isolated
-      display-capture
-      document-domain
-      encrypted-media
-      execution-while-out-of-viewport
-      execution-while-not-rendered
-      focus-without-user-activation
-      fullscreen
-      frobulate
-      gamepad
-      geolocation
-      gyroscope
-      hid
-      idle-detection
-      interest-cohort
-      magnetometer
-      microphone
-      midi
-      otp-credentials
-      payment
-      picture-in-picture
-      publickey-credentials-get
-      screen-wake-lock
-      serial
-      storage-access-api
-      sync-xhr
-      trust-token-redemption
-      usb
-      vertical-scroll
-      web-share
-      xr-spatial-tracking
-
-  # Reason for a permissions policy feature to be disabled.
-  experimental type PermissionsPolicyBlockReason extends string
-    enum
-      # Declaration in HTTP header.
-      Header
-      # Declaration in iframe attribute.
-      IframeAttribute
-
-  experimental type PermissionsPolicyBlockLocator extends object
-    properties
-      FrameId frameId
-      PermissionsPolicyBlockReason blockReason
-
-  experimental type PermissionsPolicyFeatureState extends object
-    properties
-      PermissionsPolicyFeature feature
-      boolean allowed
-      optional PermissionsPolicyBlockLocator locator
-
   # Information about the Frame on the page.
   type Frame extends object
     properties
@@ -6906,13 +6829,6 @@ domain Page
       # Whether to bypass page CSP.
       boolean enabled
 
-  # Get Permissions Policy state on given frame.
-  experimental command getPermissionsPolicyState
-    parameters
-      FrameId frameId
-    returns
-      array of PermissionsPolicyFeatureState states
-
   # Overrides the values of device screen dimensions (window.screen.width, window.screen.height,
   # window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media
   # query results).
```

## Roll protocol to r854538 — _2021-02-17T00:16:05.000Z_
######  Diff: [`014525d...13b10d1`](https://github.com/ChromeDevTools/devtools-protocol/compare/`014525d...13b10d1`)

```diff
@@ browser_protocol.pdl:4426 @@ domain Network
       Medium
       High
 
-  # Represents the source scheme of the origin that originally set the cookie.
-  # A value of "Unset" allows protocol clients to emulate legacy cookie scope for the scheme.
-  # This is a temporary ability and it will be removed in the future.
-  experimental type CookieSourceScheme extends string
-    enum
-      Unset
-      NonSecure
-      Secure
-
   # Timing information for the request.
   type ResourceTiming extends object
     properties
@@ -4816,12 +4807,6 @@ domain Network
       experimental CookiePriority priority
       # True if cookie is SameParty.
       experimental boolean sameParty
-      # Cookie source scheme type.
-      experimental CookieSourceScheme sourceScheme
-      # Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.
-      # An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
-      # This is a temporary ability and it will be removed in the future.
-      experimental integer sourcePort
 
   # Types of reasons why a cookie may not be stored from a response.
   experimental type SetCookieBlockedReason extends string
@@ -4950,7 +4935,7 @@ domain Network
       # Cookie value.
       string value
       # The request-URI to associate with the setting of the cookie. This value can affect the
-      # default domain, path, source port, and source scheme values of the created cookie.
+      # default domain and path values of the created cookie.
       optional string url
       # Cookie domain.
       optional string domain
@@ -4966,14 +4951,6 @@ domain Network
       optional TimeSinceEpoch expires
       # Cookie Priority.
       experimental optional CookiePriority priority
-      # True if cookie is SameParty.
-      experimental optional boolean sameParty
-      # Cookie source scheme type.
-      experimental optional CookieSourceScheme sourceScheme
-      # Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.
-      # An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
-      # This is a temporary ability and it will be removed in the future.
-      experimental optional integer sourcePort
 
   # Authorization challenge for HTTP status code 401 or 407.
   experimental type AuthChallenge extends object
@@ -5304,7 +5281,7 @@ domain Network
       # Cookie value.
       string value
       # The request-URI to associate with the setting of the cookie. This value can affect the
-      # default domain, path, source port, and source scheme values of the created cookie.
+      # default domain and path values of the created cookie.
       optional string url
       # Cookie domain.
       optional string domain
@@ -5320,14 +5297,6 @@ domain Network
       optional TimeSinceEpoch expires
       # Cookie Priority type.
       experimental optional CookiePriority priority
-      # True if cookie is SameParty.
-      experimental optional boolean sameParty
-      # Cookie source scheme type.
-      experimental optional CookieSourceScheme sourceScheme
-      # Cookie source port. Valid values are {-1, [1, 65535]}, -1 indicates an unspecified port.
-      # An unspecified port value allows protocol clients to emulate legacy cookie scope for the port.
-      # This is a temporary ability and it will be removed in the future.
-      experimental optional integer sourcePort
     returns
       # Always set to true. If an error occurs, the response indicates protocol error.
       deprecated boolean success
```

## Roll protocol to r852555 — _2021-02-10T09:16:01.000Z_
######  Diff: [`5a47400...014525d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`5a47400...014525d`)

```diff
@@ browser_protocol.pdl:667 @@ experimental domain Audits
       TransferIssue
       CreationIssue
 
-  # Details for a issue arising from an SAB being instantiated in, or
-  # transfered to a context that is not cross-origin isolated.
+  # Details for a request that has been blocked with the BLOCKED_BY_RESPONSE
+  # code. Currently only used for COEP/COOP, but may be extended to include
+  # some CSP errors in the future.
   type SharedArrayBufferIssueDetails extends object
     properties
       SourceCodeLocation sourceCodeLocation
@@ -704,16 +705,6 @@ experimental domain Audits
       string fontSize
       string fontWeight
 
-  # Details for a CORS related issue, e.g. a warning or error related to
-  # CORS RFC1918 enforcement.
-  type CorsIssueDetails extends object
-    properties
-      Network.CorsErrorStatus corsErrorStatus
-      boolean isWarning
-      AffectedRequest request
-      optional Network.IPAddressSpace resourceIPAddressSpace
-      optional Network.ClientSecurityState clientSecurityState
-
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -727,7 +718,6 @@ experimental domain Audits
       SharedArrayBufferIssue
       TrustedWebActivityIssue
       LowTextContrastIssue
-      CorsIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -742,7 +732,6 @@ experimental domain Audits
       optional SharedArrayBufferIssueDetails sharedArrayBufferIssueDetails
       optional TrustedWebActivityIssueDetails twaQualityEnforcementDetails
       optional LowTextContrastIssueDetails lowTextContrastIssueDetails
-      optional CorsIssueDetails corsIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
@@ -5611,7 +5600,6 @@ domain Network
     enum
       Allow
       BlockFromInsecureToMorePrivate
-      WarnFromInsecureToMorePrivate
 
   experimental type IPAddressSpace extends string
     enum
```

## Roll protocol to r850520 — _2021-02-04T10:16:11.000Z_
######  Diff: [`6393746...5a47400`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6393746...5a47400`)

```diff
@@ browser_protocol.pdl:5829 @@ experimental domain Overlay
       # Style of the self-alignment line (align-items).
       optional LineStyle crossAlignment
 
-  # Configuration data for the highlighting of Flex item elements.
-  type FlexItemHighlightConfig extends object
-    properties
-      # Style of the box representing the item's base size
-      optional BoxStyle baseSizeBox
-      # Style of the border around the box representing the item's base size
-      optional LineStyle baseSizeBorder
-      # Style of the arrow representing if the item grew or shrank
-      optional LineStyle flexibilityArrow
-
   # Style information for drawing a line.
   type LineStyle extends object
     properties
@@ -5898,8 +5888,6 @@ experimental domain Overlay
       optional GridHighlightConfig gridHighlightConfig
       # The flex container highlight configuration (default: all transparent).
       optional FlexContainerHighlightConfig flexContainerHighlightConfig
-      # The flex item highlight configuration (default: all transparent).
-      optional FlexItemHighlightConfig flexItemHighlightConfig
       # The contrast algorithm to use for the contrast ratio (default: aa).
       optional ContrastAlgorithm contrastAlgorithm
```

## Roll protocol to r849788 — _2021-02-02T22:16:09.000Z_
######  Diff: [`8a7c1b5...6393746`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8a7c1b5...6393746`)

```diff
@@ browser_protocol.pdl:4844 @@ domain Network
       # value.
       # This is the "Schemeful Same-Site" version of the blocked reason.
       SchemefulSameSiteUnspecifiedTreatedAsLax
-      # The cookie had the "SameParty" attribute but came from a cross-party response.
-      SamePartyFromCrossPartyContext
-      # The cookie had the "SameParty" attribute but did not specify the "Secure" attribute
-      # (which is required in order to use "SameParty"); or specified the "SameSite=Strict"
-      # attribute (which is forbidden when using "SameParty").
-      SamePartyConflictsWithOtherAttributes
 
   # Types of reasons why a cookie may not be sent with a request.
   experimental type CookieBlockedReason extends string
@@ -4892,8 +4886,6 @@ domain Network
       # value.
       # This is the "Schemeful Same-Site" version of the blocked reason.
       SchemefulSameSiteUnspecifiedTreatedAsLax
-      # The cookie had the "SameParty" attribute and the request was made from a cross-party context.
-      SamePartyFromCrossPartyContext
 
   # A cookie which was not stored from a response with the corresponding reason.
   experimental type BlockedSetCookieWithReason extends object
```

## Roll protocol to r849057 — _2021-02-01T11:16:00.000Z_
######  Diff: [`78112b8...8a7c1b5`](https://github.com/ChromeDevTools/devtools-protocol/compare/`78112b8...8a7c1b5`)

```diff
@@ browser_protocol.pdl:695 @@ experimental domain Audits
       # used when violation type is kDigitalAssetLinks.
       optional string signature
 
-  type LowTextContrastIssueDetails extends object
-    properties
-      DOM.BackendNodeId violatingNodeId
-      string violatingNodeSelector
-      number contrastRatio
-      number thresholdAA
-      number thresholdAAA
-      string fontSize
-      string fontWeight
-
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -717,7 +707,6 @@ experimental domain Audits
       ContentSecurityPolicyIssue
       SharedArrayBufferIssue
       TrustedWebActivityIssue
-      LowTextContrastIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -731,7 +720,6 @@ experimental domain Audits
       optional ContentSecurityPolicyIssueDetails contentSecurityPolicyIssueDetails
       optional SharedArrayBufferIssueDetails sharedArrayBufferIssueDetails
       optional TrustedWebActivityIssueDetails twaQualityEnforcementDetails
-      optional LowTextContrastIssueDetails lowTextContrastIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
@@ -769,10 +757,6 @@ experimental domain Audits
   # `issueAdded` event.
   command enable
 
-  # Runs the contrast check for the target page. Found issues are reported
-  # using Audits.issueAdded event.
-  command checkContrast
-
   event issueAdded
     parameters
       InspectorIssue issue
```

## Roll protocol to r848227 — _2021-01-28T20:16:06.000Z_
######  Diff: [`51065d6...78112b8`](https://github.com/ChromeDevTools/devtools-protocol/compare/`51065d6...78112b8`)

```diff
@@ browser_protocol.pdl:3163 @@ domain Emulation
       string version
 
   # Used to specify User Agent Cient Hints to emulate. See https://wicg.github.io/ua-client-hints
-  # Missing optional values will be filled in by the target with what it would normally use.
   experimental type UserAgentMetadata extends object
     properties
-      optional array of UserAgentBrandVersion brands
-      optional string fullVersion
+      array of UserAgentBrandVersion brands
+      string fullVersion
       string platform
       string platformVersion
       string architecture
```

## Roll protocol to r848169 — _2021-01-28T18:16:15.000Z_
######  Diff: [`0284109...51065d6`](https://github.com/ChromeDevTools/devtools-protocol/compare/`0284109...51065d6`)

```diff
@@ browser_protocol.pdl:5618 @@ domain Network
       array of BlockedSetCookieWithReason blockedCookies
       # Raw response headers as they were received over the wire.
       Headers headers
-      # The IP address space of the resource. The address space can only be determined once the transport
-      # established the connection, so we can't send it in `requestWillBeSentExtraInfo`.
-      IPAddressSpace resourceIPAddressSpace
       # Raw response header text as it was received over the wire. The raw text may not always be
       # available, such as in the case of HTTP/2 or QUIC.
       optional string headersText
```

## Roll protocol to r847576 — _2021-01-27T11:16:08.000Z_
######  Diff: [`769185f...0284109`](https://github.com/ChromeDevTools/devtools-protocol/compare/`769185f...0284109`)

```diff
@@ browser_protocol.pdl:645 @@ experimental domain Audits
 
   type SourceCodeLocation extends object
     properties
-      optional Runtime.ScriptId scriptId
       string url
       integer lineNumber
       integer columnNumber
```

## Roll protocol to r847122 — _2021-01-26T12:16:07.000Z_
######  Diff: [`181f9b3...769185f`](https://github.com/ChromeDevTools/devtools-protocol/compare/`181f9b3...769185f`)

```diff
@@ browser_protocol.pdl:661 @@ experimental domain Audits
       optional SourceCodeLocation sourceCodeLocation
       optional DOM.BackendNodeId violatingNodeId
 
-  type SharedArrayBufferIssueType extends string
-    enum
-      TransferIssue
-      CreationIssue
-
   # Details for a request that has been blocked with the BLOCKED_BY_RESPONSE
   # code. Currently only used for COEP/COOP, but may be extended to include
   # some CSP errors in the future.
-  type SharedArrayBufferIssueDetails extends object
+  type SharedArrayBufferTransferIssueDetails extends object
     properties
       SourceCodeLocation sourceCodeLocation
       boolean isWarning
-      SharedArrayBufferIssueType type
 
   type TwaQualityEnforcementViolationType extends string
     enum
@@ -704,7 +698,7 @@ experimental domain Audits
       BlockedByResponseIssue
       HeavyAdIssue
       ContentSecurityPolicyIssue
-      SharedArrayBufferIssue
+      SharedArrayBufferTransferIssue
       TrustedWebActivityIssue
 
   # This struct holds a list of optional fields with additional information
@@ -717,7 +711,7 @@ experimental domain Audits
       optional BlockedByResponseIssueDetails blockedByResponseIssueDetails
       optional HeavyAdIssueDetails heavyAdIssueDetails
       optional ContentSecurityPolicyIssueDetails contentSecurityPolicyIssueDetails
-      optional SharedArrayBufferIssueDetails sharedArrayBufferIssueDetails
+      optional SharedArrayBufferTransferIssueDetails sharedArrayBufferTransferIssueDetails
       optional TrustedWebActivityIssueDetails twaQualityEnforcementDetails
 
   # An inspector issue reported from the back-end.
```

## Roll protocol to r846936 — _2021-01-25T23:16:27.000Z_
######  Diff: [`d88313d...181f9b3`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d88313d...181f9b3`)

```diff
@@ browser_protocol.pdl:5548 @@ domain Network
       # Request initiator.
       optional Initiator initiator
 
-  # Fired when WebTransport handshake is finished.
-  event webTransportConnectionEstablished
-    parameters
-      # WebTransport identifier.
-      RequestId transportId
-      # Timestamp.
-      MonotonicTime timestamp
-
-  # Fired when WebTransport is disposed.
   event webTransportClosed
     parameters
       # WebTransport identifier.
```

## Roll protocol to r845780 — _2021-01-21T20:16:08.000Z_
######  Diff: [`3941c7e...d88313d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3941c7e...d88313d`)

```diff
@@ browser_protocol.pdl:669 @@ experimental domain Audits
       SourceCodeLocation sourceCodeLocation
       boolean isWarning
 
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
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -699,7 +680,6 @@ experimental domain Audits
       HeavyAdIssue
       ContentSecurityPolicyIssue
       SharedArrayBufferTransferIssue
-      TrustedWebActivityIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -712,7 +692,6 @@ experimental domain Audits
       optional HeavyAdIssueDetails heavyAdIssueDetails
       optional ContentSecurityPolicyIssueDetails contentSecurityPolicyIssueDetails
       optional SharedArrayBufferTransferIssueDetails sharedArrayBufferTransferIssueDetails
-      optional TrustedWebActivityIssueDetails twaQualityEnforcementDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r845564 — _2021-01-21T09:16:18.000Z_
######  Diff: [`47a861d...3941c7e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`47a861d...3941c7e`)

```diff
@@ browser_protocol.pdl:7556 @@ experimental domain Storage
       # Storage usage (bytes).
       number usage
 
-  # Pair of issuer origin and number of available (signed, but not used) Trust
-  # Tokens from that issuer.
-  experimental type TrustTokens extends object
-    properties
-      string issuerOrigin
-      number count
-
   # Clears storage for origin.
   command clearDataForOrigin
     parameters
@@ -7647,12 +7640,6 @@ experimental domain Storage
       # Security origin.
       string origin
 
-  # Returns the number of stored Trust Tokens per issuer for the
-  # current browsing context.
-  experimental command getTrustTokens
-    returns
-      array of TrustTokens tokens
-
   # A cache's contents have been modified.
   event cacheStorageContentUpdated
     parameters
```

## Roll protocol to r845301 — _2021-01-20T20:16:06.000Z_
######  Diff: [`7f780af...47a861d`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7f780af...47a861d`)

```diff
@@ browser_protocol.pdl:6041 @@ experimental domain Overlay
       # True for showing hit-test borders
       boolean show
 
-  # Request that backend shows an overlay with web vital metrics.
-  command setShowWebVitals
-    parameters
-      boolean show
-
   # Paints viewport size upon main frame resize.
   command setShowViewportSizeOnResize
     parameters
```

## Roll protocol to r841965 — _2021-01-11T10:16:08.000Z_
######  Diff: [`92c0fc5...529289e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`92c0fc5...529289e`)

```diff
@@ browser_protocol.pdl:4749 @@ domain Network
       optional CookieSameSite sameSite
       # Cookie Priority
       experimental CookiePriority priority
-      # True if cookie is SameParty.
-      experimental boolean sameParty
 
   # Types of reasons why a cookie may not be stored from a response.
   experimental type SetCookieBlockedReason extends string
```

## Roll protocol to r841450 — _2021-01-08T12:16:13.000Z_
######  Diff: [`0f61a92...92c0fc5`](https://github.com/ChromeDevTools/devtools-protocol/compare/`0f61a92...92c0fc5`)

```diff
@@ browser_protocol.pdl:1815 @@ domain DOM
       backdrop
       selection
       target-text
-      spelling-error
-      grammar-error
       first-line-inherited
       scrollbar
       scrollbar-thumb
```

## Roll protocol to r840815 — _2021-01-06T23:16:17.000Z_
######  Diff: [`a5b6b3e...0f61a92`](https://github.com/ChromeDevTools/devtools-protocol/compare/`a5b6b3e...0f61a92`)

```diff
@@ browser_protocol.pdl:7152 @@ experimental domain PerformanceTimeline
   # See https://github.com/WICG/LargestContentfulPaint and largest_contentful_paint.idl
   type LargestContentfulPaint extends object
     properties
-      Network.TimeSinceEpoch renderTime
-      Network.TimeSinceEpoch loadTime
+      number renderTime
+      number loadTime
       # The number of pixels being painted.
       number size
       # The id attribute of the element, if available.
@@ -7162,46 +7162,25 @@ experimental domain PerformanceTimeline
       optional string url
       optional DOM.BackendNodeId nodeId
 
-  type LayoutShiftAttribution extends object
-    properties
-      DOM.Rect previousRect
-      DOM.Rect currentRect
-      optional DOM.BackendNodeId nodeId
-
-  # See https://wicg.github.io/layout-instability/#sec-layout-shift and layout_shift.idl
-  type LayoutShift extends object
-    properties
-      # Score increment produced by this event.
-      number value
-      boolean hadRecentInput
-      Network.TimeSinceEpoch lastInputTime
-      array of LayoutShiftAttribution sources
-
   type TimelineEvent extends object
     properties
       # Identifies the frame that this event is related to. Empty for non-frame targets.
       Page.FrameId frameId
-      # The event type, as specified in https://w3c.github.io/performance-timeline/#dom-performanceentry-entrytype
-      # This determines which of the optional "details" fiedls is present.
       string type
-      # Name may be empty depending on the type.
       string name
       # Time in seconds since Epoch, monotonically increasing within document lifetime.
       Network.TimeSinceEpoch time
       # Event duration, if applicable.
       optional number duration
       optional LargestContentfulPaint lcpDetails
-      optional LayoutShift layoutShiftDetails
 
   # Previously buffered events would be reported before method returns.
+  # The specified filter overrides any previous filters, passing empty
+  # filter disables recording.
+  # Note that not all types exposed to the web platform are currently supported.
   # See also: timelineEventAdded
   command enable
     parameters
-      # The types of event to report, as specified in
-      # https://w3c.github.io/performance-timeline/#dom-performanceentry-entrytype
-      # The specified filter overrides any previous filters, passing empty
-      # filter disables recording.
-      # Note that not all types exposed to the web platform are currently supported.
       array of string eventTypes
 
   # Sent when a performance timeline event is added. See reportPerformanceTimeline method.
```

## Roll protocol to r840500 — _2021-01-06T06:16:00.000Z_
######  Diff: [`e056996...a5b6b3e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e056996...a5b6b3e`)

```diff
@@ browser_protocol.pdl:7143 @@ domain Performance
       # Timestamp title.
       string title
 
-# Reporting of performance timeline events, as specified in
-# https://w3c.github.io/performance-timeline/#dom-performanceobserver.
-experimental domain PerformanceTimeline
-  depends on DOM
-  depends on Network
-
-  # See https://github.com/WICG/LargestContentfulPaint and largest_contentful_paint.idl
-  type LargestContentfulPaint extends object
-    properties
-      number renderTime
-      number loadTime
-      # The number of pixels being painted.
-      number size
-      # The id attribute of the element, if available.
-      optional string elementId
-      # The URL of the image (may be trimmed).
-      optional string url
-      optional DOM.BackendNodeId nodeId
-
-  type TimelineEvent extends object
-    properties
-      # Identifies the frame that this event is related to. Empty for non-frame targets.
-      Page.FrameId frameId
-      string type
-      string name
-      # Time in seconds since Epoch, monotonically increasing within document lifetime.
-      Network.TimeSinceEpoch time
-      # Event duration, if applicable.
-      optional number duration
-      optional LargestContentfulPaint lcpDetails
-
-  # Previously buffered events would be reported before method returns.
-  # The specified filter overrides any previous filters, passing empty
-  # filter disables recording.
-  # Note that not all types exposed to the web platform are currently supported.
-  # See also: timelineEventAdded
-  command enable
-    parameters
-      array of string eventTypes
-
-  # Sent when a performance timeline event is added. See reportPerformanceTimeline method.
-  event timelineEventAdded
-    parameters
-      TimelineEvent event
-
 # Security
 domain Security
```

## Roll protocol to r837676 — _2020-12-16T19:16:09.000Z_
######  Diff: [`17b7d75...84b9b60`](https://github.com/ChromeDevTools/devtools-protocol/compare/`17b7d75...84b9b60`)

```diff
@@ browser_protocol.pdl:661 @@ experimental domain Audits
       optional SourceCodeLocation sourceCodeLocation
       optional DOM.BackendNodeId violatingNodeId
 
-  # Details for a request that has been blocked with the BLOCKED_BY_RESPONSE
-  # code. Currently only used for COEP/COOP, but may be extended to include
-  # some CSP errors in the future.
-  type SharedArrayBufferTransferIssueDetails extends object
-    properties
-      SourceCodeLocation sourceCodeLocation
-      boolean isWarning
-
   # A unique identifier for the type of issue. Each type may use one of the
   # optional fields in InspectorIssueDetails to convey more specific
   # information about the kind of issue.
@@ -679,7 +671,6 @@ experimental domain Audits
       BlockedByResponseIssue
       HeavyAdIssue
       ContentSecurityPolicyIssue
-      SharedArrayBufferTransferIssue
 
   # This struct holds a list of optional fields with additional information
   # specific to the kind of issue. When adding a new issue code, please also
@@ -691,7 +682,6 @@ experimental domain Audits
       optional BlockedByResponseIssueDetails blockedByResponseIssueDetails
       optional HeavyAdIssueDetails heavyAdIssueDetails
       optional ContentSecurityPolicyIssueDetails contentSecurityPolicyIssueDetails
-      optional SharedArrayBufferTransferIssueDetails sharedArrayBufferTransferIssueDetails
 
   # An inspector issue reported from the back-end.
   type InspectorIssue extends object
```

## Roll protocol to r836089 — _2020-12-11T13:16:22.000Z_
######  Diff: [`d6d3da3...17b7d75`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d6d3da3...17b7d75`)

```diff
@@ browser_protocol.pdl:8078 @@ experimental domain Tracing
       # transfer mode (defaults to `none`)
       optional StreamCompression streamCompression
       optional TraceConfig traceConfig
-      # Base64-encoded serialized perfetto.protos.TraceConfig protobuf message
-      # When specified, the parameters `categories`, `options`, `traceConfig`
-      # are ignored.
-      optional binary perfettoConfig
 
   event bufferUsage
     parameters
```

## Roll protocol to r835626 — _2020-12-10T12:17:42.000Z_
######  Diff: [`7f3af2e...d6d3da3`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7f3af2e...d6d3da3`)

```diff
@@ browser_protocol.pdl:828 @@ domain Browser
       backgroundFetch
       clipboardReadWrite
       clipboardSanitizedWrite
-      displayCapture
       durableStorage
       flash
       geolocation
```

## Roll protocol to r834467 — _2020-12-08T00:16:11.000Z_
######  Diff: [`9e09a22...53c89eb`](https://github.com/ChromeDevTools/devtools-protocol/compare/`9e09a22...53c89eb`)

```diff
@@ browser_protocol.pdl:5507 @@ domain Network
       RequestId transportId
       # WebTransport request URL.
       string url
-      # Timestamp.
-      MonotonicTime timestamp
       # Request initiator.
       optional Initiator initiator
 
@@ -5516,8 +5514,6 @@ domain Network
     parameters
       # WebTransport identifier.
       RequestId transportId
-      # Timestamp.
-      MonotonicTime timestamp
 
   experimental type PrivateNetworkRequestPolicy extends string
     enum
```

## Roll protocol to r832784 — _2020-12-02T13:16:13.000Z_
######  Diff: [`1d63b26...9e09a22`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1d63b26...9e09a22`)

```diff
@@ browser_protocol.pdl:203 @@ experimental domain Accessibility
       # children, if requested.
       array of AXNode nodes
 
-  # Fetches the entire accessibility tree for the root Document
+  # Fetches the entire accessibility tree
   experimental command getFullAXTree
-    parameters
-      # The maximum depth at which descendants of the root node should be retrieved.
-      # If omitted, the full tree is returned.
-      optional integer max_depth
-    returns
-      array of AXNode nodes
-
-  # Fetches a particular accessibility node by AXNodeId.
-  # Requires `enable()` to have been called previously.
-  experimental command getChildAXNodes
-    parameters
-      AXNodeId id
     returns
       array of AXNode nodes
```

## Roll protocol to r832201 — _2020-12-01T04:16:12.000Z_
######  Diff: [`30c0c44...1d63b26`](https://github.com/ChromeDevTools/devtools-protocol/compare/`30c0c44...1d63b26`)

```diff
@@ browser_protocol.pdl:53 @@ experimental domain Accessibility
       labelfor
       labelwrapped
       legend
-      rubyannotation
       tablecaption
       title
       other
```

## Roll protocol to r831994 — _2020-11-30T21:16:16.000Z_
######  Diff: [`ebd3663...30c0c44`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ebd3663...30c0c44`)

```diff
@@ browser_protocol.pdl:5553 @@ domain Network
       # available, such as in the case of HTTP/2 or QUIC.
       optional string headersText
 
-  # Fired exactly once for each Trust Token operation. Depending on
-  # the type of the operation and whether the operation succeeded or
-  # failed, the event is fired before the corresponding request was sent
-  # or after the response was received.
-  experimental event trustTokenOperationDone
-    parameters
-      # Detailed success or error status of the operation.
-      # 'AlreadyExists' also signifies a successful operation, as the result
-      # of the operation already exists und thus, the operation was abort
-      # preemptively (e.g. a cache hit).
-      enum status
-        Ok
-        InvalidArgument
-        FailedPrecondition
-        ResourceExhausted
-        AlreadyExists
-        Unavailable
-        BadResponse
-        InternalError
-        UnknownError
-        FulfilledLocally
-      TrustTokenOperationType type
-      RequestId requestId
-      # Top level origin. The context in which the operation was attempted.
-      optional string topLevelOrigin
-      # Origin of the issuer in case of a "Issuance" or "Redemption" operation.
-      optional string issuerOrigin
-      # The number of obtained Trust Tokens on a successful "Issuance" operation.
-      optional integer issuedTokenCount
-
   experimental type CrossOriginOpenerPolicyValue extends string
     enum
       SameOrigin
```

## Roll protocol to r831461 — _2020-11-27T03:16:01.000Z_
######  Diff: [`bf6d675...ebd3663`](https://github.com/ChromeDevTools/devtools-protocol/compare/`bf6d675...ebd3663`)

```diff
@@ browser_protocol.pdl:5487 @@ domain Network
       # WebSocket request data.
       WebSocketRequest request
 
-  # Fired upon WebTransport creation.
-  event webTransportCreated
-    parameters
-      # WebTransport identifier.
-      RequestId transportId
-      # WebTransport request URL.
-      string url
-      # Request initiator.
-      optional Initiator initiator
-
-  event webTransportClosed
-    parameters
-      # WebTransport identifier.
-      RequestId transportId
-
   experimental type PrivateNetworkRequestPolicy extends string
     enum
       Allow
```

## Roll protocol to r831315 — _2020-11-26T12:16:14.000Z_
######  Diff: [`4829241...bf6d675`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4829241...bf6d675`)

```diff
@@ browser_protocol.pdl:4276 @@ domain Network
       SignedExchange
       Ping
       CSPViolationReport
-      Preflight
       Other
 
   # Unique loader identifier.
@@ -4683,7 +4682,6 @@ domain Network
         script
         preload
         SignedExchange
-        preflight
         other
       # Initiator JavaScript stack trace, set for Script only.
       optional Runtime.StackTrace stack
@@ -4695,8 +4693,6 @@ domain Network
       # Initiator column number, set for Parser type or for Script type (when script is importing
       # module) (0-based).
       optional number columnNumber
-      # Set if another request triggered this request (e.g. preflight).
-      optional RequestId requestId
 
   # Cookie object
   type Cookie extends object
```

## Roll protocol to r831300 — _2020-11-26T10:16:17.000Z_
######  Diff: [`e7d16f6...4829241`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e7d16f6...4829241`)

```diff
@@ browser_protocol.pdl:5680 @@ experimental domain Overlay
       optional BoxStyle rowGapSpace
       # Style of empty space caused by columns gaps (gap/column-gap).
       optional BoxStyle columnGapSpace
-      # Style of the self-alignment line (align-items).
-      optional LineStyle crossAlignment
 
   # Style information for drawing a line.
   type LineStyle extends object
```

## Roll protocol to r829642 — _2020-11-20T14:16:14.000Z_
######  Diff: [`e3d5a68...e7d16f6`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e3d5a68...e7d16f6`)

```diff
@@ browser_protocol.pdl:6342 @@ domain Page
       optional Viewport clip
       # Capture the screenshot from the surface, rather than the view. Defaults to true.
       experimental optional boolean fromSurface
-      # Capture the screenshot beyond the viewport. Defaults to false.
-      experimental optional boolean captureBeyondViewport
     returns
       # Base64-encoded image data.
       binary data
```

## Roll protocol to r829624 — _2020-11-20T12:16:20.000Z_
######  Diff: [`b9d4d51...e3d5a68`](https://github.com/ChromeDevTools/devtools-protocol/compare/`b9d4d51...e3d5a68`)

```diff
@@ browser_protocol.pdl:5483 @@ domain Network
       # WebSocket request data.
       WebSocketRequest request
 
-  experimental type PrivateNetworkRequestPolicy extends string
-    enum
-      Allow
-      BlockFromInsecureToMorePrivate
-
-  experimental type IPAddressSpace extends string
-    enum
-      Local
-      Private
-      Public
-      Unknown
-
-  experimental type ClientSecurityState extends object
-    properties
-      boolean initiatorIsSecureContext
-      IPAddressSpace initiatorIPAddressSpace
-      PrivateNetworkRequestPolicy privateNetworkRequestPolicy
-
   # Fired when additional information about a requestWillBeSent event is available from the
   # network stack. Not every requestWillBeSent event will have an additional
   # requestWillBeSentExtraInfo fired for it, and there is no guarantee whether requestWillBeSent
@@ -5514,8 +5496,6 @@ domain Network
       array of BlockedCookieWithReason associatedCookies
       # Raw request headers as they will be sent over the wire.
       Headers headers
-      # The client security state set for the request.
-      optional ClientSecurityState clientSecurityState
 
   # Fired when additional information about a responseReceived event is available from the network
   # stack. Not every responseReceived event will have an additional responseReceivedExtraInfo for
```

## Roll protocol to r829612 — _2020-11-20T11:16:03.000Z_
######  Diff: [`7507a70...b9d4d51`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7507a70...b9d4d51`)

```diff
@@ browser_protocol.pdl:5679 @@ experimental domain Overlay
       # The hatching color for the box (default: transparent)
       optional DOM.RGBA hatchColor
 
-  type ContrastAlgorithm extends string
-    enum
-      aa
-      aaa
-      apca
-
   # Configuration data for the highlighting of page elements.
   type HighlightConfig extends object
     properties
@@ -5720,8 +5714,6 @@ experimental domain Overlay
       optional GridHighlightConfig gridHighlightConfig
       # The flex container highlight configuration (default: all transparent).
       optional FlexContainerHighlightConfig flexContainerHighlightConfig
-      # The contrast algorithm to use for the contrast ratio (default: aa).
-      optional ContrastAlgorithm contrastAlgorithm
 
   type ColorFormat extends string
     enum
```

## Roll protocol to r829242 — _2020-11-19T16:16:09.000Z_
######  Diff: [`2f03057...7507a70`](https://github.com/ChromeDevTools/devtools-protocol/compare/`2f03057...7507a70`)

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
@@ -6821,12 +6823,6 @@ domain Page
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

## Roll protocol to r829162 — _2020-11-19T10:16:16.000Z_
######  Diff: [`84c2cfc...2f03057`](https://github.com/ChromeDevTools/devtools-protocol/compare/`84c2cfc...2f03057`)

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
```

## Roll protocol to r828856 — _2020-11-18T20:16:13.000Z_
######  Diff: [`ae1d9fd...84c2cfc`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ae1d9fd...84c2cfc`)

```diff
@@ browser_protocol.pdl:5652 @@ experimental domain Overlay
       optional LineStyle lineSeparator
       # The style of the separator between items
       optional LineStyle itemSeparator
-      # Style of content-distribution space on the main axis (justify-content).
-      optional BoxStyle mainDistributedSpace
-      # Style of content-distribution space on the cross axis (align-content).
-      optional BoxStyle crossDistributedSpace
-      # Style of empty space caused by row gaps (gap/row-gap).
-      optional BoxStyle rowGapSpace
-      # Style of empty space caused by columns gaps (gap/column-gap).
-      optional BoxStyle columnGapSpace
 
   # Style information for drawing a line.
   type LineStyle extends object
@@ -5671,14 +5663,6 @@ experimental domain Overlay
         dashed
         dotted
 
-  # Style information for drawing a box.
-  type BoxStyle extends object
-    properties
-      # The background color for the box (default: transparent)
-      optional DOM.RGBA fillColor
-      # The hatching color for the box (default: transparent)
-      optional DOM.RGBA hatchColor
-
   # Configuration data for the highlighting of page elements.
   type HighlightConfig extends object
     properties
```

## Roll protocol to r828424 — _2020-11-17T22:16:15.000Z_
######  Diff: [`4a38aba...ae1d9fd`](https://github.com/ChromeDevTools/devtools-protocol/compare/`4a38aba...ae1d9fd`)

```diff
@@ browser_protocol.pdl:6805 @@ domain Page
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

## Roll protocol to r828217 — _2020-11-17T16:16:16.000Z_
######  Diff: [`0f382c6...4a38aba`](https://github.com/ChromeDevTools/devtools-protocol/compare/`0f382c6...4a38aba`)

```diff
@@ browser_protocol.pdl:2522 @@ domain DOMDebugger
       attribute-modified
       node-removed
 
-  # CSP Violation type.
-  experimental type CSPViolationType extends string
-    enum
-      trustedtype-sink-violation
-      trustedtype-policy-violation
-
   # Object event listener.
   type EventListener extends object
     properties
@@ -2595,12 +2589,6 @@ domain DOMDebugger
       # Resource URL substring.
       string url
 
-  # Sets breakpoint on particular CSP violations.
-  experimental command setBreakOnCSPViolation
-    parameters
-      # CSP Violations to stop upon.
-      array of CSPViolationType violationTypes
-
   # Sets breakpoint on particular operation with DOM.
   command setDOMBreakpoint
     parameters
```

## Roll protocol to r828143 — _2020-11-17T11:15:46.000Z_
######  Diff: [`fc3a2fd...0f382c6`](https://github.com/ChromeDevTools/devtools-protocol/compare/`fc3a2fd...0f382c6`)

```diff
@@ browser_protocol.pdl:5701 @@ experimental domain Overlay
       # Identifier of the node to highlight.
       DOM.NodeId nodeId
 
-  type FlexNodeHighlightConfig extends object
-    properties
-      # A descriptor for the highlight appearance of flex containers.
-      FlexContainerHighlightConfig flexContainerHighlightConfig
-      # Identifier of the node to highlight.
-      DOM.NodeId nodeId
-
   # Configuration for dual screen hinge
   type HingeConfig extends object
     properties
@@ -5873,11 +5866,6 @@ experimental domain Overlay
       # An array of node identifiers and descriptors for the highlight appearance.
       array of GridNodeHighlightConfig gridNodeHighlightConfigs
 
-  command setShowFlexOverlays
-    parameters
-      # An array of node identifiers and descriptors for the highlight appearance.
-      array of FlexNodeHighlightConfig flexNodeHighlightConfigs
-
   # Requests that backend shows paint rectangles
   command setShowPaintRects
     parameters
```

## Roll protocol to r828125 — _2020-11-17T09:16:07.000Z_
######  Diff: [`6614ce6...fc3a2fd`](https://github.com/ChromeDevTools/devtools-protocol/compare/`6614ce6...fc3a2fd`)

```diff
@@ browser_protocol.pdl:6781 @@ domain Page
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

## Roll protocol to r827510 — _2020-11-14T01:16:11.000Z_
######  Diff: [`7406169...6614ce6`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7406169...6614ce6`)

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

## Roll protocol to r827467 — _2020-11-13T23:16:26.000Z_
######  Diff: [`51e7a7e...7406169`](https://github.com/ChromeDevTools/devtools-protocol/compare/`51e7a7e...7406169`)

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

## Roll protocol to r826646 — _2020-11-12T04:16:12.000Z_
######  Diff: [`433d00b...51e7a7e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`433d00b...51e7a7e`)

```diff
@@ browser_protocol.pdl:6768 @@ domain Page
     parameters
       # Id of the frame that has been detached.
       FrameId frameId
-      experimental enum reason
-        # The frame is removed from the DOM.
-        remove
-        # The frame is being swapped out in favor of an out-of-process iframe.
-        # A new frame target will be created (see Target.attachedToTarget).
-        swap
 
   # Fired once navigation of the frame has completed. Frame is now associated with the new loader.
   event frameNavigated
```

## Roll protocol to r826264 — _2020-11-11T14:16:49.000Z_
######  Diff: [`0d4d761...433d00b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`0d4d761...433d00b`)

```diff
@@ browser_protocol.pdl:5636 @@ experimental domain Overlay
     properties
       # The style of the container border
       optional LineStyle containerBorder
-      # The style of the separator between lines
-      optional LineStyle lineSeparator
-      # The style of the separator between items
-      optional LineStyle itemSeparator
 
   # Style information for drawing a line.
   type LineStyle extends object
```

## Roll protocol to r825619 — _2020-11-10T02:16:08.000Z_
######  Diff: [`c2862c9...0d4d761`](https://github.com/ChromeDevTools/devtools-protocol/compare/`c2862c9...0d4d761`)

```diff
@@ browser_protocol.pdl:4540 @@ domain Network
       network
 
   # Determines what type of Trust Token operation is executed and
-  # depending on the type, some additional parameters. The values
-  # are specified in third_party/blink/renderer/core/fetch/trust_token.idl.
+  # depending on the type, some additional parameters.
   experimental type TrustTokenParams extends object
     properties
       TrustTokenOperationType type
 
-      # Only set for "token-redemption" type and determine whether
+      # Only set for "srr-token-redemption" type and determine whether
       # to request a fresh SRR or use a still valid cached SRR.
       enum refreshPolicy
         UseCached
@@ -4560,9 +4559,9 @@ domain Network
     enum
       # Type "token-request" in the Trust Token API.
       Issuance
-      # Type "token-redemption" in the Trust Token API.
+      # Type "srr-token-redemption" in the Trust Token API.
       Redemption
-      # Type "send-redemption-record" in the Trust Token API.
+      # Type "send-srr" in the Trust Token API.
       Signing
 
   # HTTP response data.
```

## Roll protocol to r825064 — _2020-11-06T22:16:27.000Z_
######  Diff: [`e944f55...c2862c9`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e944f55...c2862c9`)

```diff
@@ browser_protocol.pdl:859 @@ domain Browser
   experimental type BrowserCommandId extends string
     enum
       openTabSearch
-      closeTabSearch
 
   # Set permission settings for given origin.
   experimental command setPermission
```

## Roll protocol to r824785 — _2020-11-06T09:16:19.000Z_
######  Diff: [`7b37fcd...e944f55`](https://github.com/ChromeDevTools/devtools-protocol/compare/`7b37fcd...e944f55`)

```diff
@@ browser_protocol.pdl:5528 @@ domain Network
 
   experimental type SecurityIsolationStatus extends object
     properties
-      optional CrossOriginOpenerPolicyStatus coop
-      optional CrossOriginEmbedderPolicyStatus coep
+      CrossOriginOpenerPolicyStatus coop
+      CrossOriginEmbedderPolicyStatus coep
 
   # Returns information about the COEP/COOP isolation status.
   experimental command getSecurityIsolationStatus
```

## Roll protocol to r824362 — _2020-11-05T10:16:30.000Z_
######  Diff: [`8c7ee2c...7b37fcd`](https://github.com/ChromeDevTools/devtools-protocol/compare/`8c7ee2c...7b37fcd`)

```diff
@@ browser_protocol.pdl:5629 @@ experimental domain Overlay
       # The grid container background color (Default: transparent).
       optional DOM.RGBA gridBackgroundColor
 
-  # Configuration data for the highlighting of Flex container elements.
-  type FlexContainerHighlightConfig extends object
-    properties
-      # The style of the container border
-      optional LineStyle containerBorder
-
-  # Style information for drawing a line.
-  type LineStyle extends object
-    properties
-      # The color of the line (default: transparent)
-      optional DOM.RGBA color
-      # The line pattern (default: solid)
-      optional enum pattern
-        dashed
-        dotted
-
   # Configuration data for the highlighting of page elements.
   type HighlightConfig extends object
     properties
@@ -5678,8 +5662,6 @@ experimental domain Overlay
       optional ColorFormat colorFormat
       # The grid layout highlight configuration (default: all transparent).
       optional GridHighlightConfig gridHighlightConfig
-      # The flex container highlight configuration (default: all transparent).
-      optional FlexContainerHighlightConfig flexContainerHighlightConfig
 
   type ColorFormat extends string
     enum
```

## Roll protocol to r823956 — _2020-11-04T12:16:00.000Z_
######  Diff: [`3f62bad...8c7ee2c`](https://github.com/ChromeDevTools/devtools-protocol/compare/`3f62bad...8c7ee2c`)

```diff
@@ browser_protocol.pdl:5941 @@ domain Page
       # The cross-origin isolation feature is disabled.
       NotIsolatedFeatureDisabled
 
-  experimental type GatedAPIFeatures extends string
-    enum
-      SharedArrayBuffers
-      SharedArrayBuffersTransferAllowed
-      PerformanceMeasureMemory
-      PerformanceProfile
-
   # Information about the Frame on the page.
   type Frame extends object
     properties
@@ -5980,8 +5973,6 @@ domain Page
       experimental SecureContextType secureContextType
       # Indicates whether this is a cross origin isolated context.
       experimental CrossOriginIsolatedContextType crossOriginIsolatedContextType
-      # Indicated which gated APIs / features are available.
-      experimental array of GatedAPIFeatures gatedAPIFeatures
 
   # Information about the Resource on the page.
   experimental type FrameResource extends object
```

## Roll protocol to r823269 — _2020-11-02T20:16:02.000Z_
######  Diff: [`fcb68d1...3f62bad`](https://github.com/ChromeDevTools/devtools-protocol/compare/`fcb68d1...3f62bad`)

```diff
@@ browser_protocol.pdl:4523 @@ domain Network
       MethodDisallowedByPreflightResponse
       HeaderDisallowedByPreflightResponse
       RedirectContainsCredentials
-      InsecurePrivateNetwork
 
   type CorsErrorStatus extends object
     properties
```

## Roll protocol to r822788 — _2020-10-30T20:16:09.000Z_
######  Diff: [`b4c97ed...fcb68d1`](https://github.com/ChromeDevTools/devtools-protocol/compare/`b4c97ed...fcb68d1`)

```diff
@@ browser_protocol.pdl:7835 @@ experimental domain Tracing
       none
       gzip
 
-  # Details exposed when memory request explicitly declared.
-  # Keep consistent with memory_dump_request_args.h and
-  # memory_instrumentation.mojom
-  type MemoryDumpLevelOfDetail extends string
-    enum
-      background
-      light
-      detailed
-
   # Stop trace events collection.
   command end
 
@@ -7864,8 +7855,6 @@ experimental domain Tracing
     parameters
       # Enables more deterministic results by forcing garbage collection
       optional boolean deterministic
-      # Specifies level of details in memory dump. Defaults to "detailed".
-      optional MemoryDumpLevelOfDetail levelOfDetail
     returns
       # GUID of the resulting global memory dump.
       string dumpGuid
```

## Roll protocol to r822651 — _2020-10-30T15:16:03.000Z_
######  Diff: [`260c66a...b4c97ed`](https://github.com/ChromeDevTools/devtools-protocol/compare/`260c66a...b4c97ed`)

```diff
@@ browser_protocol.pdl:3310 @@ domain Emulation
   # Notification sent after the virtual time budget for the current VirtualTimePolicy has run out.
   experimental event virtualTimeBudgetExpired
 
-  # Enum of image types that can be disabled.
-  experimental type DisabledImageType extends string
-    enum
-      avif
-      webp
-
-  experimental command setDisabledImageTypes
-    parameters
-      # Image types to disable.
-      array of DisabledImageType imageTypes
-
   # Allows overriding user agent with the given string.
   command setUserAgentOverride
     parameters
```

## Roll protocol to r822096 — _2020-10-29T10:16:12.000Z_
######  Diff: [`31947f3...260c66a`](https://github.com/ChromeDevTools/devtools-protocol/compare/`31947f3...260c66a`)

```diff
@@ browser_protocol.pdl:4485 @@ domain Network
       corp-not-same-origin-after-defaulted-to-same-origin-by-coep
       corp-not-same-site
 
-  # The reason why request was blocked.
-  type CorsError extends string
-    enum
-      DisallowedByMode
-      InvalidResponse
-      WildcardOriginNotAllowed
-      MissingAllowOriginHeader
-      MultipleAllowOriginValues
-      InvalidAllowOriginValue
-      AllowOriginMismatch
-      InvalidAllowCredentials
-      CorsDisabledScheme
-      PreflightInvalidStatus
-      PreflightDisallowedRedirect
-      PreflightWildcardOriginNotAllowed
-      PreflightMissingAllowOriginHeader
-      PreflightMultipleAllowOriginValues
-      PreflightInvalidAllowOriginValue
-      PreflightAllowOriginMismatch
-      PreflightInvalidAllowCredentials
-      PreflightMissingAllowExternal
-      PreflightInvalidAllowExternal
-      InvalidAllowMethodsPreflightResponse
-      InvalidAllowHeadersPreflightResponse
-      MethodDisallowedByPreflightResponse
-      HeaderDisallowedByPreflightResponse
-      RedirectContainsCredentials
-
-  type CorsErrorStatus extends object
-    properties
-      CorsError corsError
-      string failedParameter
-
   # Source of serviceworker response.
   type ServiceWorkerResponseSource extends string
     enum
@@ -5268,8 +5235,6 @@ domain Network
       optional boolean canceled
       # The reason why loading was blocked, if any.
       optional BlockedReason blockedReason
-       # The reason why loading was blocked by CORS, if any.
-      optional CorsErrorStatus corsErrorStatus
 
   # Fired when HTTP request has finished loading.
   event loadingFinished
```

## Roll protocol to r820307 — _2020-10-23T17:16:09.000Z_
######  Diff: [`d246615...31947f3`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d246615...31947f3`)

```diff
@@ browser_protocol.pdl:5166 @@ domain Network
       # Map with extra HTTP headers.
       Headers headers
 
-  # Specifies whether to attach a page script stack id in requests
-  experimental command setAttachDebugStack
+  # Specifies whether to sned a debug header to all outgoing requests.
+  experimental command setAttachDebugHeader
     parameters
-      # Whether to attach a page script stack for debugging purpose.
+      # Whether to send a debug header.
       boolean enabled
 
   # Sets the requests to intercept that match the provided patterns and optionally resource types.
```

## Roll protocol to r820101 — _2020-10-23T02:16:05.000Z_
######  Diff: [`d0179ab...d246615`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d0179ab...d246615`)

```diff
@@ browser_protocol.pdl:855 @@ domain Browser
       # For "camera" permission, may specify panTiltZoom.
       optional boolean panTiltZoom
 
-  # Browser command ids used by executeBrowserCommand.
-  experimental type BrowserCommandId extends string
-    enum
-      openTabSearch
-
   # Set permission settings for given origin.
   experimental command setPermission
     parameters
@@ -1019,11 +1014,6 @@ domain Browser
       # Png encoded image.
       optional binary image
 
-  # Invoke custom browser commands used by telemetry.
-  experimental command executeBrowserCommand
-    parameters
-      BrowserCommandId commandId
-
 # This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles)
 # have an associated `id` used in subsequent operations on the related object. Each object type has
 # a specific `id` structure, and those are not interchangeable between objects of different kinds.
```

## Roll protocol to r820081 — _2020-10-23T01:16:08.000Z_
######  Diff: [`109271e...d0179ab`](https://github.com/ChromeDevTools/devtools-protocol/compare/`109271e...d0179ab`)

```diff
@@ browser_protocol.pdl:3609 @@ domain Input
       optional number rotationAngle
       # Force (default: 1.0).
       optional number force
-      # The normalized tangential pressure, which has a range of [-1,1] (default: 0).
-      experimental optional number tangentialPressure
-      # The plane angle between the Y-Z plane and the plane containing both the stylus axis and the Y axis, in degrees of the range [-90,90], a positive tiltX is to the right (default: 0)
-      experimental optional integer tiltX
-      # The plane angle between the X-Z plane and the plane containing both the stylus axis and the X axis, in degrees of the range [-90,90], a positive tiltY is towards the user (default: 0).
-      experimental optional integer tiltY
-      # The clockwise rotation of a pen stylus around its own major axis, in degrees in the range [0,359] (default: 0).
-      experimental optional integer twist
       # Identifier used to track touch sources between events, must be unique within an event.
       optional number id
 
@@ -3716,16 +3708,6 @@ domain Input
       optional integer buttons
       # Number of times the mouse button was clicked (default: 0).
       optional integer clickCount
-      # The normalized pressure, which has a range of [0,1] (default: 0).
-      experimental optional number force
-      # The normalized tangential pressure, which has a range of [-1,1] (default: 0).
-      experimental optional number tangentialPressure
-      # The plane angle between the Y-Z plane and the plane containing both the stylus axis and the Y axis, in degrees of the range [-90,90], a positive tiltX is to the right (default: 0).
-      experimental optional integer tiltX
-      # The plane angle between the X-Z plane and the plane containing both the stylus axis and the X axis, in degrees of the range [-90,90], a positive tiltY is towards the user (default: 0).
-      experimental optional integer tiltY
-      # The clockwise rotation of a pen stylus around its own major axis, in degrees in the range [0,359] (default: 0).
-      experimental optional integer twist
       # X delta in CSS pixels for mouse wheel event (default: 0).
       optional number deltaX
       # Y delta in CSS pixels for mouse wheel event (default: 0).
```

## Roll protocol to r819498 — _2020-10-21T20:16:11.000Z_
######  Diff: [`89f0fa5...109271e`](https://github.com/ChromeDevTools/devtools-protocol/compare/`89f0fa5...109271e`)

```diff
@@ browser_protocol.pdl:8255 @@ experimental domain WebAuthn
       # Client To Authenticator Protocol 2.
       ctap2
 
-  type Ctap2Version extends string
-    enum
-      ctap2_0
-      ctap2_1
-
   type AuthenticatorTransport extends string
     enum
       # Cross-Platform authenticator attachments:
@@ -8273,8 +8268,6 @@ experimental domain WebAuthn
   type VirtualAuthenticatorOptions extends object
     properties
       AuthenticatorProtocol protocol
-      # Defaults to ctap2_0. Ignored if |protocol| == u2f.
-      optional Ctap2Version ctap2Version
       AuthenticatorTransport transport
       # Defaults to false.
       optional boolean hasResidentKey
@@ -8307,9 +8300,6 @@ experimental domain WebAuthn
       # assertion.
       # See https://w3c.github.io/webauthn/#signature-counter
       integer signCount
-      # The large blob associated with the credential.
-      # See https://w3c.github.io/webauthn/#sctn-large-blob-extension
-      optional binary largeBlob
 
   # Enable the WebAuthn domain and start intercepting credential storage and
   # retrieval with a virtual authenticator.
```

## Roll protocol to r818974 — _2020-10-20T17:16:05.000Z_
######  Diff: [`1feb204...89f0fa5`](https://github.com/ChromeDevTools/devtools-protocol/compare/`1feb204...89f0fa5`)

```diff
@@ browser_protocol.pdl:1779 @@ domain DOM
       marker
       backdrop
       selection
-      target-text
       first-line-inherited
       scrollbar
       scrollbar-thumb
```

## Roll protocol to r818844 — _2020-10-20T10:15:54.000Z_
######  Diff: [`e1b8740...1feb204`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e1b8740...1feb204`)

```diff
@@ browser_protocol.pdl:642 @@ experimental domain Audits
       optional string blockedURL
       # Specific directive that is violated, causing the CSP issue.
       string violatedDirective
-      boolean isReportOnly
       ContentSecurityPolicyViolationType contentSecurityPolicyViolationType
       optional AffectedFrame frameAncestor
       optional SourceCodeLocation sourceCodeLocation
```

## Roll protocol to r818814 — _2020-10-20T07:15:59.000Z_
######  Diff: [`d268e57...e1b8740`](https://github.com/ChromeDevTools/devtools-protocol/compare/`d268e57...e1b8740`)

```diff
@@ browser_protocol.pdl:4664 @@ domain Network
       InvalidPrefix
       # An unknown error was encountered when trying to store this cookie.
       UnknownError
-      # The cookie had the "SameSite=Strict" attribute but came from a response
-      # with the same registrable domain but a different scheme.
-      # This includes navigation requests intitiated by other origins.
-      # This is the "Schemeful Same-Site" version of the blocked reason.
-      SchemefulSameSiteStrict
-      # The cookie had the "SameSite=Lax" attribute but came from a response
-      # with the same registrable domain but a different scheme.
-      # This is the "Schemeful Same-Site" version of the blocked reason.
-      SchemefulSameSiteLax
-      # The cookie didn't specify a "SameSite" attribute and was defaulted to
-      # "SameSite=Lax" and broke the same rules specified in the SchemefulSameSiteLax
-      # value.
-      # This is the "Schemeful Same-Site" version of the blocked reason.
-      SchemefulSameSiteUnspecifiedTreatedAsLax
 
   # Types of reasons why a cookie may not be sent with a request.
   experimental type CookieBlockedReason extends string
@@ -4706,20 +4692,6 @@ domain Network
       UserPreferences
       # An unknown error was encountered when trying to send this cookie.
       UnknownError
-      # The cookie had the "SameSite=Strict" attribute but came from a response
-      # with the same registrable domain but a different scheme.
-      # This includes navigation requests intitiated by other origins.
-      # This is the "Schemeful Same-Site" version of the blocked reason.
-      SchemefulSameSiteStrict
-      # The cookie had the "SameSite=Lax" attribute but came from a response
-      # with the same registrable domain but a different scheme.
-      # This is the "Schemeful Same-Site" version of the blocked reason.
-      SchemefulSameSiteLax
-      # The cookie didn't specify a "SameSite" attribute and was defaulted to
-      # "SameSite=Lax" and broke the same rules specified in the SchemefulSameSiteLax
-      # value.
-      # This is the "Schemeful Same-Site" version of the blocked reason.
-      SchemefulSameSiteUnspecifiedTreatedAsLax
 
   # A cookie which was not stored from a response with the corresponding reason.
   experimental type BlockedSetCookieWithReason extends object
@@ -7251,25 +7223,9 @@ experimental domain Storage
       number usage
       # Storage quota (bytes).
       number quota
-      # Whether or not the origin has an active storage quota override
-      boolean overrideActive
       # Storage usage per type (bytes).
       array of UsageForType usageBreakdown
 
-  # Override quota for the specified origin
-  experimental command overrideQuotaForOrigin
-    parameters
-      # Security origin.
-      string origin
-      # The quota size (in bytes) to override the original quota with.
-      # If this is called multiple times, the overriden quota will be equal to
-      # the quotaSize provided in the final call. If this is called without
-      # specifying a quotaSize, the quota will be reset to the default value for
-      # the specified origin. If this is called multiple times with different
-      # origins, the override will be maintained for each origin until it is
-      # disabled (called without a quotaSize).
-      optional number quotaSize
-
   # Registers origin to be notified when an update occurs to its cache storage list.
   command trackCacheStorageForOrigin
     parameters
```

## Roll protocol to r816501 — _2020-10-13T10:16:04.000Z_
######  Diff: [`b72ea89...d268e57`](https://github.com/ChromeDevTools/devtools-protocol/compare/`b72ea89...d268e57`)

```diff
@@ browser_protocol.pdl:826 @@ domain Browser
       protectedMediaIdentifier
       sensors
       videoCapture
-      videoCapturePanTiltZoom
       idleDetection
       wakeLockScreen
       wakeLockSystem
@@ -851,8 +850,6 @@ domain Browser
       optional boolean userVisibleOnly
       # For "clipboard" permission, may specify allowWithoutSanitization.
       optional boolean allowWithoutSanitization
-      # For "camera" permission, may specify panTiltZoom.
-      optional boolean panTiltZoom
 
   # Set permission settings for given origin.
   experimental command setPermission
```

## Roll protocol to r815575 — _2020-10-09T12:16:03.000Z_
######  Diff: [`e736452...b72ea89`](https://github.com/ChromeDevTools/devtools-protocol/compare/`e736452...b72ea89`)

```diff
@@ browser_protocol.pdl:4374 @@ domain Network
         strict-origin-when-cross-origin
       # Whether is loaded via link preload.
       optional boolean isLinkPreload
-      # Set for requests when the TrustToken API is used. Contains the parameters
-      # passed by the developer (e.g. via "fetch") as understood by the backend.
-      experimental optional TrustTokenParams trustTokenParams
 
   # Details of a signed certificate timestamp (SCT).
   type SignedCertificateTimestamp extends object
@@ -4460,31 +4457,6 @@ domain Network
       fallback-code
       network
 
-  # Determines what type of Trust Token operation is executed and
-  # depending on the type, some additional parameters.
-  experimental type TrustTokenParams extends object
-    properties
-      TrustTokenOperationType type
-
-      # Only set for "srr-token-redemption" type and determine whether
-      # to request a fresh SRR or use a still valid cached SRR.
-      enum refreshPolicy
-        UseCached
-        Refresh
-
-      # Origins of issuers from whom to request tokens or redemption
-      # records.
-      optional array of string issuers
-
-  experimental type TrustTokenOperationType extends string
-    enum
-      # Type "token-request" in the Trust Token API.
-      Issuance
-      # Type "srr-token-redemption" in the Trust Token API.
-      Redemption
-      # Type "send-srr" in the Trust Token API.
-      Signing
-
   # HTTP response data.
   type Response extends object
     properties
```

## Roll protocol to r814141 — _2020-10-06T09:16:18.000Z_
######  Diff: [`46e9147...e736452`](https://github.com/ChromeDevTools/devtools-protocol/compare/`46e9147...e736452`)

```diff
@@ browser_protocol.pdl:4570 @@ domain Network
       # Initiator line number, set for Parser type or for Script type (when script is importing
       # module) (0-based).
       optional number lineNumber
-      # Initiator column number, set for Parser type or for Script type (when script is importing
-      # module) (0-based).
-      optional number columnNumber
 
   # Cookie object
   type Cookie extends object
```

## Roll protocol to r813281 — _2020-10-02T18:16:02.000Z_
######  Diff: [`81d36b6...e98f67b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`81d36b6...e98f67b`)

```diff
@@ browser_protocol.pdl:8193 @@ experimental domain WebAuthn
       optional boolean hasResidentKey
       # Defaults to false.
       optional boolean hasUserVerification
-      # If set to true, the authenticator will support the largeBlob extension.
-      # https://w3c.github.io/webauthn#largeBlob
-      # Defaults to false.
-      optional boolean hasLargeBlob
       # If set to true, tests of user presence will succeed immediately.
       # Otherwise, they will not be resolved. Defaults to true.
       optional boolean automaticPresenceSimulation
```

## Roll protocol to r812116 — _2020-09-30T16:16:20.000Z_
######  Diff: [`9f36776...81d36b6`](https://github.com/ChromeDevTools/devtools-protocol/compare/`9f36776...81d36b6`)

```diff
@@ browser_protocol.pdl:7397 @@ domain Target
       boolean attached
       # Opener target Id
       optional TargetID openerId
-      # Whether the target has access to the originating window.
+      # Whether the opened window has access to the originating window.
       experimental boolean canAccessOpener
-      # Frame id of originating window (is only set if target has an opener).
-      experimental optional Page.FrameId openerFrameId
       experimental optional Browser.BrowserContextID browserContextId
 
   experimental type RemoteLocation extends object
```

## Roll protocol to r810467 — _2020-09-25T04:16:27.000Z_
######  Diff: [`362b549...9f36776`](https://github.com/ChromeDevTools/devtools-protocol/compare/`362b549...9f36776`)

```diff
@@ browser_protocol.pdl:5051 @@ domain Network
       # Cookie Priority type.
       experimental optional CookiePriority priority
     returns
-      # Always set to true. If an error occurs, the response indicates protocol error.
-      deprecated boolean success
+      # True if successfully set cookie.
+      boolean success
 
   # Sets given cookies.
   command setCookies
@@ -7434,8 +7434,7 @@ domain Target
     parameters
       TargetID targetId
     returns
-      # Always set to true. If an error occurs, the response indicates protocol error.
-      deprecated boolean success
+      boolean success
 
   # Inject object to the target's main frame that provides a communication
   # channel with browser target.
```

## Roll protocol to r810188 — _2020-09-24T14:16:32.000Z_
######  Diff: [`ea0b910...362b549`](https://github.com/ChromeDevTools/devtools-protocol/compare/`ea0b910...362b549`)

```diff
@@ browser_protocol.pdl:5400 @@ domain Network
     returns
       SecurityIsolationStatus status
 
-  # An object providing the result of a network resource load.
-  experimental type LoadNetworkResourcePageResult extends object
-    properties
-      boolean success
-      # Optional values used for error reporting.
-      optional number netError
-      optional string netErrorName
-      optional number httpStatusCode
-      # If successful, one of the following two fields holds the result.
-      optional IO.StreamHandle stream
-      # Response headers.
-      optional Network.Headers headers
-
-  # An options object that may be extended later to better support CORS,
-  # CORB and streaming.
-  experimental type LoadNetworkResourceOptions extends object
-    properties
-      boolean disableCache
-      boolean includeCredentials
-
-  # Fetches the resource and returns the content.
-  experimental command loadNetworkResource
-    parameters
-      # Frame id to get the resource for.
-      Page.FrameId frameId
-      # URL of the resource to get content for.
-      string url
-      # Options for the request.
-      LoadNetworkResourceOptions options
-    returns
-      LoadNetworkResourcePageResult resource
-
 # This domain provides various functionality related to drawing atop the inspected page.
 experimental domain Overlay
   depends on DOM
```

## Roll protocol to r809251 — _2020-09-22T09:16:18.000Z_
######  Diff: [`01dd54b...ea0b910`](https://github.com/ChromeDevTools/devtools-protocol/compare/`01dd54b...ea0b910`)

```diff
@@ browser_protocol.pdl:207 @@ experimental domain Accessibility
     returns
       array of AXNode nodes
 
-  # Query a DOM node's accessibility subtree for accessible name and role.
-  # This command computes the name and role for all nodes in the subtree, including those that are
-  # ignored for accessibility, and returns those that mactch the specified name and role. If no DOM
-  # node is specified, or the DOM node does not exist, the command returns an error. If neither
-  # `accessibleName` or `role` is specified, it returns all the accessibility nodes in the subtree.
-  experimental command queryAXTree
-    parameters
-      # Identifier of the node for the root to query.
-      optional DOM.NodeId nodeId
-      # Identifier of the backend node for the root to query.
-      optional DOM.BackendNodeId backendNodeId
-      # JavaScript object id of the node wrapper for the root to query.
-      optional Runtime.RemoteObjectId objectId
-      # Find nodes with this computed name.
-      optional string accessibleName
-      # Find nodes with this computed role.
-      optional string role
-    returns
-      # A list of `Accessibility.AXNode` matching the specified attributes,
-      # including nodes that are ignored for accessibility.
-      array of AXNode nodes
-
 experimental domain Animation
   depends on Runtime
   depends on DOM
```

## Roll protocol to r808307 — _2020-09-18T11:16:16.000Z_
######  Diff: [`9e2e943...01dd54b`](https://github.com/ChromeDevTools/devtools-protocol/compare/`9e2e943...01dd54b`)

```diff
@@ browser_protocol.pdl:5349 @@ domain Network
   experimental type CrossOriginOpenerPolicyStatus extends object
     properties
       CrossOriginOpenerPolicyValue value
-      CrossOriginOpenerPolicyValue reportOnlyValue
-      optional string reportingEndpoint
-      optional string reportOnlyReportingEndpoint
 
   experimental type CrossOriginEmbedderPolicyValue extends string
     enum
@@ -5361,9 +5358,6 @@ domain Network
   experimental type CrossOriginEmbedderPolicyStatus extends object
     properties
       CrossOriginEmbedderPolicyValue value
-      CrossOriginEmbedderPolicyValue reportOnlyValue
-      optional string reportingEndpoint
-      optional string reportOnlyReportingEndpoint
 
   experimental type SecurityIsolationStatus extends object
     properties
```

## Roll protocol to r806843 — _2020-09-15T02:16:32.000Z_
######  Diff: [`2155b85...9e2e943`](https://github.com/ChromeDevTools/devtools-protocol/compare/`2155b85...9e2e943`)

```diff
@@ browser_protocol.pdl:7698 @@ experimental domain Tracing
       optional StreamCompression streamCompression
 
 # A domain for letting clients substitute browser's network layer with client code.
-domain Fetch
+experimental domain Fetch
   depends on Network
   depends on IO
   depends on Page
@@ -7709,12 +7709,12 @@ domain Fetch
   # Stages of the request to handle. Request will intercept before the request is
   # sent. Response will intercept after the response is received (but before response
   # body is received.
-  type RequestStage extends string
+  experimental type RequestStage extends string
     enum
       Request
       Response
 
-  type RequestPattern extends object
+  experimental type RequestPattern extends object
     properties
       # Wildcards ('*' -> zero or more, '?' -> exactly one) are allowed. Escape character is
       # backslash. Omitting is equivalent to "*".
@@ -7731,7 +7731,7 @@ domain Fetch
       string value
 
   # Authorization challenge for HTTP status code 401 or 407.
-  type AuthChallenge extends object
+  experimental type AuthChallenge extends object
     properties
       # Source of the authentication challenge.
       optional enum source
@@ -7745,7 +7745,7 @@ domain Fetch
       string realm
 
   # Response to an AuthChallenge.
-  type AuthChallengeResponse extends object
+  experimental type AuthChallengeResponse extends object
     properties
       # The decision on what to do in response to the authorization challenge.  Default means
       # deferring to the default behavior of the net stack, which will likely either the Cancel
```