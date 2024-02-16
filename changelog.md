

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

## Roll protocol to r709494 — _2019-10-25T16:19:12.000Z_
######  Diff: [`cc0ccbf...cc2df42`](https://github.com/ChromeDevTools/devtools-protocol/compare/cc0ccbf...cc2df42)

```diff
@@ browser_protocol.pdl:1368 @@ experimental domain CacheStorage
       # ID of cache to get entries from.
       CacheId cacheId
       # Number of records to skip.
-      integer skipCount
+      optional integer skipCount
       # Number of records to fetch.
-      integer pageSize
+      optional integer pageSize
       # If present, only return the entries containing this substring in the path
       optional string pathFilter
     returns
@@ -6061,6 +6061,7 @@ domain Security
       insecure
       secure
       info
+      insecure-broken
 
   # Details about the security state of the page certificate.
   experimental type CertificateSecurityState extends object
```

## Roll protocol to r708320 — _2019-10-22T20:16:41.000Z_
######  Diff: [`0eb89cb...cc0ccbf`](https://github.com/ChromeDevTools/devtools-protocol/compare/0eb89cb...cc0ccbf)

```diff
@@ js_protocol.pdl:1257 @@ domain Runtime
       experimental optional TimeDelta timeout
       # Disable breakpoints during execution.
       experimental optional boolean disableBreaks
+      # Reserved flag for future REPL mode support. Setting this flag has currently no effect.
+      experimental optional boolean replMode
     returns
       # Evaluation result.
       RemoteObject result
```

## Roll protocol to r704542 — _2019-10-10T10:15:57.000Z_
######  Diff: [`6db8af2...176dc88`](https://github.com/ChromeDevTools/devtools-protocol/compare/6db8af2...176dc88)

```diff
@@ browser_protocol.pdl:844 @@ experimental domain CSS
       number startColumn
       # Size of the content (in characters).
       number length
+      # Line offset of the end of the stylesheet within the resource (zero based).
+      number endLine
+      # Column offset of the end of the stylesheet within the resource (zero based).
+      number endColumn
 
   # CSS rule representation.
   type CSSRule extends object
```

## Roll protocol to r703825 — _2019-10-08T18:16:23.000Z_
######  Diff: [`1b9bba2...6db8af2`](https://github.com/ChromeDevTools/devtools-protocol/compare/1b9bba2...6db8af2)

```diff
@@ js_protocol.pdl:169 @@ domain Debugger
       # The maximum size in bytes of collected scripts (not referenced by other heap objects)
       # the debugger can hold. Puts no limit if paramter is omitted.
       experimental optional number maxScriptsCacheSize
-      # Whether to report Wasm modules as raw binaries instead of disassembled functions.
-      experimental optional boolean supportsWasmDwarf
     returns
       # Unique identifier of the debugger.
       experimental Runtime.UniqueDebuggerId debuggerId
```

## Roll protocol to r703432 — _2019-10-07T20:16:21.000Z_
######  Diff: [`9458ee4...1b9bba2`](https://github.com/ChromeDevTools/devtools-protocol/compare/9458ee4...1b9bba2)

```diff
@@ browser_protocol.pdl:6058 @@ domain Security
       secure
       info
 
+  # Details about the security state of the page certificate.
+  experimental type CertificateSecurityState extends object
+    properties
+      # Protocol name (e.g. "TLS 1.2" or "QUIC").
+      string protocol
+      # Key Exchange used by the connection, or the empty string if not applicable.
+      string keyExchange
+      # (EC)DH group used by the connection, if applicable.
+      optional string keyExchangeGroup
+      # Cipher name.
+      string cipher
+      # TLS MAC. Note that AEAD ciphers do not have separate MACs.
+      optional string mac
+      # Page certificate.
+      array of string certificate
+      # Certificate subject name.
+      string subjectName
+      # Name of the issuing CA.
+      string issuer
+      # Certificate valid from date.
+      Network.TimeSinceEpoch validFrom
+      # Certificate valid to (expiration) date
+      Network.TimeSinceEpoch validTo
+      # True if the certificate uses a weak signature aglorithm.
+      boolean certifcateHasWeakSignature
+      # True if modern SSL
+      boolean modernSSL
+      # True if the connection is using an obsolete SSL protocol.
+      boolean obsoleteSslProtocol
+      # True if the connection is using an obsolete SSL key exchange.
+      boolean obsoleteSslKeyExchange
+      # True if the connection is using an obsolete SSL cipher.
+      boolean obsoleteSslCipher
+      # True if the connection is using an obsolete SSL signature.
+      boolean obsoleteSslSignature
+
+  # Security state information about the page.
+  experimental type VisibleSecurityState extends object
+    properties
+      # The security level of the page.
+      SecurityState securityState
+      # Security state details about the page certificate.
+      optional CertificateSecurityState certificateSecurityState
+      # Array of security state issues ids.
+      array of string securityStateIssueIds
+
   # An explanation of an factor contributing to the security state.
   type SecurityStateExplanation extends object
     properties
@@ -6141,6 +6187,12 @@ domain Security
       # The url that was requested.
       string requestURL
 
+  # The security state of the page changed.
+  experimental event visibleSecurityStateChanged
+    parameters
+      # Security state information about the page.
+      VisibleSecurityState visibleSecurityState
+
   # The security state of the page changed.
   event securityStateChanged
     parameters
```

## Roll protocol to r702485 — _2019-10-03T18:15:58.000Z_
######  Diff: [`848e8db...9458ee4`](https://github.com/ChromeDevTools/devtools-protocol/compare/848e8db...9458ee4)

```diff
@@ browser_protocol.pdl:7307 @@ experimental domain WebAuthn
     properties
       AuthenticatorProtocol protocol
       AuthenticatorTransport transport
-      boolean hasResidentKey
-      boolean hasUserVerification
+      # Defaults to false.
+      optional boolean hasResidentKey
+      # Defaults to false.
+      optional boolean hasUserVerification
       # If set to true, tests of user presence will succeed immediately.
       # Otherwise, they will not be resolved. Defaults to true.
       optional boolean automaticPresenceSimulation
+      # Sets whether User Verification succeeds or fails for an authenticator.
+      # Defaults to false.
+      optional boolean isUserVerified
 
   type Credential extends object
     properties
```

## Roll protocol to r701341 — _2019-09-30T23:15:58.000Z_
######  Diff: [`b9558e4...848e8db`](https://github.com/ChromeDevTools/devtools-protocol/compare/b9558e4...848e8db)

```diff
@@ browser_protocol.pdl:2400 @@ experimental domain DOMSnapshot
     properties
       # Document URL that `Document` or `FrameOwner` node points to.
       StringIndex documentURL
+      # Document title.
+      StringIndex title
       # Base URL that `Document` or `FrameOwner` node uses for URL completion.
       StringIndex baseURL
       # Contains the document's content language.
@@ -2422,6 +2424,10 @@ experimental domain DOMSnapshot
       optional number scrollOffsetX
       # Vertical scroll offset.
       optional number scrollOffsetY
+      # Document content width.
+      optional number contentWidth
+      # Document content height.
+      optional number contentHeight
 
   # Table containing nodes.
   type NodeTreeSnapshot extends object
```

## Roll protocol to r701085 — _2019-09-30T13:16:15.000Z_
######  Diff: [`52e455c...b9558e4`](https://github.com/ChromeDevTools/devtools-protocol/compare/52e455c...b9558e4)

```diff
@@ browser_protocol.pdl:2690 @@ domain Emulation
       # Orientation angle.
       integer angle
 
+  type MediaFeature extends object
+    properties
+      string name
+      string value
+
   # advance: If the scheduler runs out of immediate work, the virtual time base may fast forward to
   # allow the next delayed task (if any) to run; pause: The virtual time base may not advance;
   # pauseIfNetworkFetchesPending: The virtual time base may not advance if there are any pending
@@ -2786,11 +2791,13 @@ domain Emulation
         mobile
         desktop
 
-  # Emulates the given media for CSS media queries.
+  # Emulates the given media type or media feature for CSS media queries.
   command setEmulatedMedia
     parameters
       # Media type to emulate. Empty string disables the override.
-      string media
+      optional string media
+      # Media features to emulate.
+      optional array of MediaFeature features
 
   # Overrides the Geolocation Position or Error. Omitting any of the parameters emulates position
   # unavailable.
```

## Roll protocol to r700880 — _2019-09-27T22:16:00.000Z_
######  Diff: [`1bafeca...52e455c`](https://github.com/ChromeDevTools/devtools-protocol/compare/1bafeca...52e455c)

```diff
@@ js_protocol.pdl:1253 @@ domain Runtime
       # resolved.
       optional boolean awaitPromise
       # Whether to throw an exception if side effect cannot be ruled out during evaluation.
+      # This implies `disableBreaks` below.
       experimental optional boolean throwOnSideEffect
       # Terminate execution after timing out (number of milliseconds).
       experimental optional TimeDelta timeout
+      # Disable breakpoints during execution.
+      experimental optional boolean disableBreaks
     returns
       # Evaluation result.
       RemoteObject result
```

## Roll protocol to r700642 — _2019-09-27T10:15:57.000Z_
######  Diff: [`fc7a6b7...1bafeca`](https://github.com/ChromeDevTools/devtools-protocol/compare/fc7a6b7...1bafeca)

```diff
@@ browser_protocol.pdl:6803 @@ experimental domain Tracing
 
   # Request a global memory dump.
   command requestMemoryDump
+    parameters
+      # Enables more deterministic results by forcing garbage collection
+      optional boolean deterministic
     returns
       # GUID of the resulting global memory dump.
       string dumpGuid
```

## Roll protocol to r700528 — _2019-09-27T01:16:06.000Z_
######  Diff: [`6af45a3...fc7a6b7`](https://github.com/ChromeDevTools/devtools-protocol/compare/6af45a3...fc7a6b7)

```diff
@@ browser_protocol.pdl:6652 @@ domain Target
       # We plan to make this the default, deprecate non-flattened mode,
       # and eventually retire it. See crbug.com/991325.
       optional boolean flatten
+      # Auto-attach to the targets created via window.open from current target.
+      experimental optional boolean windowOpen
 
   # Controls whether to discover available targets and notify via
   # `targetCreated/targetInfoChanged/targetDestroyed` events.
```

## Roll protocol to r700421 — _2019-09-26T21:16:16.000Z_
######  Diff: [`324d30c...6af45a3`](https://github.com/ChromeDevTools/devtools-protocol/compare/324d30c...6af45a3)

```diff
@@ browser_protocol.pdl:6530 @@ domain Target
     parameters
       TargetID targetId
       # Enables "flat" access to the session via specifying sessionId attribute in the commands.
-      experimental optional boolean flatten
+      # We plan to make this the default, deprecate non-flattened mode,
+      # and eventually retire it. See crbug.com/991325.
+      optional boolean flatten
     returns
       # Id assigned to the session.
       SessionID sessionId
@@ -6626,7 +6628,9 @@ domain Target
       array of TargetInfo targetInfos
 
   # Sends protocol message over session with given id.
-  command sendMessageToTarget
+  # Consider using flat mode instead; see commands attachToTarget, setAutoAttach,
+  # and crbug.com/991325.
+  deprecated command sendMessageToTarget
     parameters
       string message
       # Identifier of the session.
@@ -6645,7 +6649,9 @@ domain Target
       # to run paused targets.
       boolean waitForDebuggerOnStart
       # Enables "flat" access to the session via specifying sessionId attribute in the commands.
-      experimental optional boolean flatten
+      # We plan to make this the default, deprecate non-flattened mode,
+      # and eventually retire it. See crbug.com/991325.
+      optional boolean flatten
 
   # Controls whether to discover available targets and notify via
   # `targetCreated/targetInfoChanged/targetDestroyed` events.
```

## Roll protocol to r700395 — _2019-09-26T20:16:11.000Z_
######  Diff: [`4b981c0...324d30c`](https://github.com/ChromeDevTools/devtools-protocol/compare/4b981c0...324d30c)

```diff
@@ browser_protocol.pdl:6370 @@ experimental domain SystemInfo
       number vendorId
       # PCI ID of the GPU device, if available; 0 otherwise.
       number deviceId
+      # Sub sys ID of the GPU, only available on Windows.
+      optional number subSysId
+      # Revision of the GPU, only available on Windows.
+      optional number revision
       # String description of the GPU vendor, if the PCI ID is not available.
       string vendorString
       # String description of the GPU device, if the PCI ID is not available.
```

## Roll protocol to r699881 — _2019-09-25T18:16:02.000Z_
######  Diff: [`d1cec58...4b981c0`](https://github.com/ChromeDevTools/devtools-protocol/compare/d1cec58...4b981c0)

```diff
@@ js_protocol.pdl:169 @@ domain Debugger
       # The maximum size in bytes of collected scripts (not referenced by other heap objects)
       # the debugger can hold. Puts no limit if paramter is omitted.
       experimental optional number maxScriptsCacheSize
+      # Whether to report Wasm modules as raw binaries instead of disassembled functions.
+      experimental optional boolean supportsWasmDwarf
     returns
       # Unique identifier of the debugger.
       experimental Runtime.UniqueDebuggerId debuggerId
@@ -227,6 +229,15 @@ domain Debugger
       # Script source.
       string scriptSource
 
+  # Returns bytecode for the WebAssembly script with given id.
+  command getWasmBytecode
+    parameters
+      # Id of the Wasm script to get source for.
+      Runtime.ScriptId scriptId
+    returns
+      # Script source.
+      binary bytecode
+
   # Returns stack trace with given `stackTraceId`.
   experimental command getStackTrace
     parameters
```

## Roll protocol to r698331 — _2019-09-20T03:16:05.000Z_
######  Diff: [`86165c9...d1cec58`](https://github.com/ChromeDevTools/devtools-protocol/compare/86165c9...d1cec58)

```diff
@@ browser_protocol.pdl:6945 @@ experimental domain Fetch
       # An HTTP response code.
       integer responseCode
       # Response headers.
-      array of HeaderEntry responseHeaders
+      optional array of HeaderEntry responseHeaders
+      # Alternative way of specifying response headers as a \0-separated
+      # series of name: value pairs. Prefer the above method unless you
+      # need to represent some non-UTF8 values that can't be transmitted
+      # over the protocol as text.
+      optional binary binaryResponseHeaders
       # A response body.
       optional binary body
       # A textual representation of responseCode.
-      # If absent, a standard phrase mathcing responseCode is used.
+      # If absent, a standard phrase matching responseCode is used.
       optional string responsePhrase
 
   # Continues the request, optionally modifying some of its parameters.
```

## Roll protocol to r696576 — _2019-09-13T23:16:04.000Z_
######  Diff: [`2103701...86165c9`](https://github.com/ChromeDevTools/devtools-protocol/compare/2103701...86165c9)

```diff
@@ browser_protocol.pdl:4195 @@ domain Network
   # A cookie which was not stored from a response with the corresponding reason.
   experimental type BlockedSetCookieWithReason extends object
     properties
-      # The reason this cookie was blocked.
-      SetCookieBlockedReason blockedReason
+      # The reason(s) this cookie was blocked.
+      array of SetCookieBlockedReason blockedReasons
       # The string representing this individual cookie as it would appear in the header.
       # This is not the entire "cookie" or "set-cookie" header which could have multiple cookies.
       string cookieLine
@@ -4208,8 +4208,8 @@ domain Network
   # A cookie with was not sent with a request with the corresponding reason.
   experimental type BlockedCookieWithReason extends object
     properties
-      # The reason the cookie was blocked.
-      CookieBlockedReason blockedReason
+      # The reason(s) the cookie was blocked.
+      array of CookieBlockedReason blockedReasons
       # The cookie object representing the cookie which was not sent.
       Cookie cookie
```

## Roll protocol to r696317 — _2019-09-13T08:16:13.000Z_
######  Diff: [`ca69194...2103701`](https://github.com/ChromeDevTools/devtools-protocol/compare/ca69194...2103701)

```diff
@@ js_protocol.pdl:237 @@ domain Debugger
   # Stops on the next JavaScript statement.
   command pause
 
-  experimental command pauseOnAsyncCall
+  experimental deprecated command pauseOnAsyncCall
     parameters
       # Debugger will pause when async call with given stack trace is started.
       Runtime.StackTraceId parentStackTraceId
@@ -435,7 +435,7 @@ domain Debugger
   # Steps into the function call.
   command stepInto
     parameters
-      # Debugger will issue additional Debugger.paused notification if any async task is scheduled
+      # Debugger will pause on the execution of the first async task which was scheduled
       # before next pause.
       experimental optional boolean breakOnAsyncCall
 
@@ -479,9 +479,8 @@ domain Debugger
       optional Runtime.StackTrace asyncStackTrace
       # Async stack trace, if any.
       experimental optional Runtime.StackTraceId asyncStackTraceId
-      # Just scheduled async call will have this stack trace as parent stack during async execution.
-      # This field is available only after `Debugger.stepInto` call with `breakOnAsynCall` flag.
-      experimental optional Runtime.StackTraceId asyncCallStackTraceId
+      # Never present, will be removed.
+      experimental deprecated optional Runtime.StackTraceId asyncCallStackTraceId
 
   # Fired when the virtual machine resumed execution.
   event resumed
```

## Roll protocol to r694415 — _2019-09-06T21:15:53.000Z_
######  Diff: [`308aa38...81a5ef8`](https://github.com/ChromeDevTools/devtools-protocol/compare/308aa38...81a5ef8)

```diff
@@ browser_protocol.pdl:1730 @@ domain DOM
 
   # Returns node id at given location. Depending on whether DOM domain is enabled, nodeId is
   # either returned or not.
-  experimental command getNodeForLocation
+  command getNodeForLocation
     parameters
       # X coordinate.
       integer x
@@ -1738,9 +1738,13 @@ domain DOM
       integer y
       # False to skip to the nearest non-UA shadow root ancestor (default: false).
       optional boolean includeUserAgentShadowDOM
+      # Whether to ignore pointer-events: none on elements and hit test them.
+      optional boolean ignorePointerEventsNone
     returns
       # Resulting node.
       BackendNodeId backendNodeId
+      # Frame this node belongs to.
+      Page.FrameId frameId
       # Id of the node at given coordinates, only when enabled and requested document.
       optional NodeId nodeId
```

## Roll protocol to r694293 — _2019-09-06T17:16:24.000Z_
######  Diff: [`a6f7aeb...308aa38`](https://github.com/ChromeDevTools/devtools-protocol/compare/a6f7aeb...308aa38)

```diff
@@ browser_protocol.pdl:2924 @@ experimental domain HeadlessExperimental
   command enable
 
   # Issued when the target starts or stops needing BeginFrames.
-  event needsBeginFramesChanged
+  # Deprecated. Issue beginFrame unconditionally instead and use result from
+  # beginFrame to detect whether the frames were suppressed.
+  deprecated event needsBeginFramesChanged
     parameters
       # True if BeginFrames are needed, false otherwise.
       boolean needsBeginFrames
```

## Roll protocol to r692805 — _2019-09-03T20:15:58.000Z_
######  Diff: [`108d389...a6f7aeb`](https://github.com/ChromeDevTools/devtools-protocol/compare/108d389...a6f7aeb)

```diff
@@ browser_protocol.pdl:2924 @@ experimental domain HeadlessExperimental
   command enable
 
   # Issued when the target starts or stops needing BeginFrames.
-  # Deprecated. Issue beginFrame unconditionally instead and use result from
-  # beginFrame to detect whether the frames were suppressed.
-  deprecated event needsBeginFramesChanged
+  event needsBeginFramesChanged
     parameters
       # True if BeginFrames are needed, false otherwise.
       boolean needsBeginFrames
```

## Roll protocol to r692736 — _2019-09-03T18:16:12.000Z_
######  Diff: [`82e6b82...108d389`](https://github.com/ChromeDevTools/devtools-protocol/compare/82e6b82...108d389)

```diff
@@ browser_protocol.pdl:2924 @@ experimental domain HeadlessExperimental
   command enable
 
   # Issued when the target starts or stops needing BeginFrames.
-  event needsBeginFramesChanged
+  # Deprecated. Issue beginFrame unconditionally instead and use result from
+  # beginFrame to detect whether the frames were suppressed.
+  deprecated event needsBeginFramesChanged
     parameters
       # True if BeginFrames are needed, false otherwise.
       boolean needsBeginFrames
```

## Roll protocol to r689523 — _2019-08-22T17:15:59.000Z_
######  Diff: [`78e5621...e1fb93b`](https://github.com/ChromeDevTools/devtools-protocol/compare/78e5621...e1fb93b)

```diff
@@ browser_protocol.pdl:7332 @@ experimental domain WebAuthn
     returns
       array of Credential credentials
 
+  # Removes a credential from the authenticator.
+  command removeCredential
+    parameters
+      AuthenticatorId authenticatorId
+      binary credentialId
+
   # Clears all the credentials from the specified device.
   command clearCredentials
     parameters
```

## Roll protocol to r687122 686719 — _2019-08-15T02:15:58.000Z_
######  Diff: [`13e7205...443c7a4`](https://github.com/ChromeDevTools/devtools-protocol/compare/13e7205...443c7a4)

```diff
@@ browser_protocol.pdl:2468 @@ experimental domain DOMSnapshot
       array of StringIndex text
       # Stacking context information.
       RareBooleanData stackingContexts
+      # Global paint order index, which is determined by the stacking order of the nodes. Nodes
+      # that are painted together will have the same index. Only provided if includePaintOrder in
+      # captureSnapshot was true.
+      optional array of integer paintOrders
       # The offset rect of nodes. Only available when includeDOMRects is set to true
       optional array of Rectangle offsetRects
       # The scroll rect of nodes. Only available when includeDOMRects is set to true
@@ -2526,6 +2530,8 @@ experimental domain DOMSnapshot
     parameters
       # Whitelist of computed styles to return.
       array of string computedStyles
+      # Whether to include layout object paint orders into the snapshot.
+      optional boolean includePaintOrder
       # Whether to include DOM rectangles (offsetRects, clientRects, scrollRects) into the snapshot
       optional boolean includeDOMRects
     returns
```

## Roll protocol to r685550 — _2019-08-09T14:15:54.000Z_
######  Diff: [`dd87c1c...13e7205`](https://github.com/ChromeDevTools/devtools-protocol/compare/dd87c1c...13e7205)

```diff
@@ browser_protocol.pdl:6198 @@ experimental domain ServiceWorker
       string tag
       boolean lastChance
 
+  command dispatchPeriodicSyncEvent
+    parameters
+      string origin
+      RegistrationID registrationId
+      string tag
+
   command enable
 
   command inspectWorker
```

## Roll protocol to r685049 — _2019-08-08T01:16:05.000Z_
######  Diff: [`8ab49c8...dd87c1c`](https://github.com/ChromeDevTools/devtools-protocol/compare/8ab49c8...dd87c1c)

```diff
@@ browser_protocol.pdl:7035 @@ experimental domain Fetch
 # https://webaudio.github.io/web-audio-api/
 experimental domain WebAudio
 
-  # Context's UUID in string
-  type ContextId extends string
+  # An unique ID for a graph object (AudioContext, AudioNode, AudioParam) in Web Audio API
+  type GraphObjectId extends string
 
   # Enum of BaseAudioContext types
   type ContextType extends string
@@ -7051,6 +7051,31 @@ experimental domain WebAudio
       running
       closed
 
+  # Enum of AudioNode types
+  type NodeType extends string
+
+  # Enum of AudioNode::ChannelCountMode from the spec
+  type ChannelCountMode extends string
+    enum
+      clamped-max
+      explicit
+      max
+
+  # Enum of AudioNode::ChannelInterpretation from the spec
+  type ChannelInterpretation extends string
+    enum
+      discrete
+      speakers
+
+  # Enum of AudioParam types
+  type ParamType extends string
+
+  # Enum of AudioParam::AutomationRate from the spec
+  type AutomationRate extends string
+    enum
+      a-rate
+      k-rate
+
   # Fields in AudioContext that change in real-time.
   type ContextRealtimeData extends object
     properties
@@ -7068,7 +7093,7 @@ experimental domain WebAudio
   # Protocol object for BaseAudioContext
   type BaseAudioContext extends object
     properties
-      ContextId contextId
+      GraphObjectId contextId
       ContextType contextType
       ContextState contextState
       optional ContextRealtimeData realtimeData
@@ -7079,6 +7104,36 @@ experimental domain WebAudio
       # Context sample rate.
       number sampleRate
 
+# Protocol object for AudioListner
+  type AudioListener extends object
+    properties
+      GraphObjectId listenerId
+      GraphObjectId contextId
+
+  # Protocol object for AudioNode
+  type AudioNode extends object
+    properties
+      GraphObjectId nodeId
+      GraphObjectId contextId
+      NodeType nodeType
+      number numberOfInputs
+      number numberOfOutputs
+      number channelCount
+      ChannelCountMode channelCountMode
+      ChannelInterpretation channelInterpretation
+
+  # Protocol object for AudioParam
+  type AudioParam extends object
+    properties
+      GraphObjectId paramId
+      GraphObjectId nodeId
+      GraphObjectId contextId
+      ParamType paramType
+      AutomationRate rate
+      number defaultValue
+      number minValue
+      number maxValue
+
   # Enables the WebAudio domain and starts sending context lifetime events.
   command enable
 
@@ -7088,7 +7143,7 @@ experimental domain WebAudio
   # Fetch the realtime data from the registered contexts.
   command getRealtimeData
     parameters
-      ContextId contextId
+      GraphObjectId contextId
     returns
       ContextRealtimeData realtimeData
 
@@ -7100,13 +7155,81 @@ experimental domain WebAudio
   # Notifies that an existing BaseAudioContext will be destroyed.
   event contextWillBeDestroyed
     parameters
-      ContextId contextId
+      GraphObjectId contextId
 
   # Notifies that existing BaseAudioContext has changed some properties (id stays the same)..
   event contextChanged
     parameters
       BaseAudioContext context
 
+# Notifies that the construction of an AudioListener has finished.
+  event audioListenerCreated
+    parameters
+      AudioListener listener
+
+  # Notifies that a new AudioListener has been created.
+  event audioListenerWillBeDestroyed
+    parameters
+      GraphObjectId contextId
+      GraphObjectId listenerId
+
+  # Notifies that a new AudioNode has been created.
+  event audioNodeCreated
+    parameters
+      AudioNode node
+
+  # Notifies that an existing AudioNode has been destroyed.
+  event audioNodeWillBeDestroyed
+    parameters
+      GraphObjectId contextId
+      GraphObjectId nodeId
+
+  # Notifies that a new AudioParam has been created.
+  event audioParamCreated
+    parameters
+      AudioParam param
+
+  # Notifies that an existing AudioParam has been destroyed.
+  event audioParamWillBeDestroyed
+    parameters
+      GraphObjectId contextId
+      GraphObjectId nodeId
+      GraphObjectId paramId
+
+  # Notifies that two AudioNodes are connected.
+  event nodesConnected
+    parameters
+      GraphObjectId contextId
+      GraphObjectId sourceId
+      GraphObjectId destinationId
+      optional number sourceOutputIndex
+      optional number destinationInputIndex
+
+  # Notifies that AudioNodes are disconnected. The destination can be null, and it means all the outgoing connections from the source are disconnected.
+  event nodesDisconnected
+    parameters
+      GraphObjectId contextId
+      GraphObjectId sourceId
+      GraphObjectId destinationId
+      optional number sourceOutputIndex
+      optional number destinationInputIndex
+
+  # Notifies that an AudioNode is connected to an AudioParam.
+  event nodeParamConnected
+    parameters
+      GraphObjectId contextId
+      GraphObjectId sourceId
+      GraphObjectId destinationId
+      optional number sourceOutputIndex
+
+  # Notifies that an AudioNode is disconnected to an AudioParam.
+  event nodeParamDisconnected
+    parameters
+      GraphObjectId contextId
+      GraphObjectId sourceId
+      GraphObjectId destinationId
+      optional number sourceOutputIndex
+
 # This domain allows configuring virtual authenticators to test the WebAuthn
 # API.
 experimental domain WebAuthn
```

## Roll protocol to r684999 — _2019-08-07T23:16:04.000Z_
######  Diff: [`3be7296...8ab49c8`](https://github.com/ChromeDevTools/devtools-protocol/compare/3be7296...8ab49c8)

```diff
@@ browser_protocol.pdl:590 @@ domain Browser
       wakeLockScreen
       wakeLockSystem
 
+  experimental type PermissionSetting extends string
+    enum
+      granted
+      denied
+      prompt
+
+  # Definition of PermissionDescriptor defined in the Permissions API:
+  # https://w3c.github.io/permissions/#dictdef-permissiondescriptor.
+  experimental type PermissionDescriptor extends object
+    properties
+      # Name of permission.
+      # See https://cs.chromium.org/chromium/src/third_party/blink/renderer/modules/permissions/permission_descriptor.idl for valid permission names.
+      string name
+      # For "midi" permission, may also specify sysex control.
+      optional boolean sysex
+      # For "push" permission, may specify userVisibleOnly.
+      # Note that userVisibleOnly = true is the only currently supported type.
+      optional boolean userVisibleOnly
+      # For "wake-lock" permission, must specify type as either "screen" or "system".
+      optional string type
+
+  # Set permission settings for given origin.
+  experimental command setPermission
+    parameters
+      # Origin the permission applies to.
+      string origin
+      # Descriptor of permission to override.
+      PermissionDescriptor permission
+      # Setting of the permission.
+      PermissionSetting setting
+      # Context to override. When omitted, default browser context is used.
+      optional Target.TargetID browserContextId
+
   # Grant specific permissions to the given origin and reject all others.
   experimental command grantPermissions
     parameters
```

## Roll protocol to r684970 — _2019-08-07T22:16:04.000Z_
######  Diff: [`0433fdf...3be7296`](https://github.com/ChromeDevTools/devtools-protocol/compare/0433fdf...3be7296)

```diff
@@ browser_protocol.pdl:7148 @@ experimental domain WebAuthn
       AuthenticatorId authenticatorId
       Credential credential
 
+  # Returns a single credential stored in the given virtual authenticator that
+  # matches the credential ID.
+  command getCredential
+    parameters
+      AuthenticatorId authenticatorId
+      binary credentialId
+    returns
+      Credential credential
+
   # Returns all the credentials stored in the given virtual authenticator.
   command getCredentials
     parameters
```

## Roll protocol to r684601 — _2019-08-07T01:16:06.000Z_
######  Diff: [`64b5368...0433fdf`](https://github.com/ChromeDevTools/devtools-protocol/compare/64b5368...0433fdf)

```diff
@@ browser_protocol.pdl:5048 @@ domain Page
   type Frame extends object
     properties
       # Frame unique identifier.
-      string id
+      FrameId id
       # Parent frame identifier.
       optional string parentId
       # Identifier of the loader associated with this frame.
```

## Roll protocol to r684555 — _2019-08-06T23:16:01.000Z_
######  Diff: [`5856a13...64b5368`](https://github.com/ChromeDevTools/devtools-protocol/compare/5856a13...64b5368)

```diff
@@ browser_protocol.pdl:7166 @@ experimental domain WebAuthn
     parameters
       AuthenticatorId authenticatorId
       boolean isUserVerified
+
+# This domain allows detailed inspection of media elements
+experimental domain Media
+
+  # Players will get an ID that is unique within the agent context.
+  type PlayerId extends string
+
+  type Timestamp extends number
+
+  # Player Property type
+  type PlayerProperty extends object
+    properties
+      string name
+      optional string value
+
+  # Break out events into different types
+  type PlayerEventType extends string
+    enum
+      playbackEvent
+      systemEvent
+      messageEvent
+
+  type PlayerEvent extends object
+    properties
+      PlayerEventType type
+      # Events are timestamped relative to the start of the player creation
+      # not relative to the start of playback.
+      Timestamp timestamp
+      string name
+      string value
+
+  # This can be called multiple times, and can be used to set / override /
+  # remove player properties. A null propValue indicates removal.
+  event playerPropertiesChanged
+    parameters
+      PlayerId playerId
+      array of PlayerProperty properties
+
+  # Send events as a list, allowing them to be batched on the browser for less
+  # congestion. If batched, events must ALWAYS be in chronological order.
+  event playerEventsAdded
+    parameters
+      PlayerId playerId
+      array of PlayerEvent events
+
+  # Called whenever a player is created, or when a new agent joins and recieves
+  # a list of active players. If an agent is restored, it will recieve the full
+  # list of player ids and all events again.
+  event playersCreated
+    parameters
+      array of PlayerId players
+
+  # Enables the Media domain
+  command enable
+
+  # Disables the Media domain.
+  command disable
```

## Roll protocol to r683290 — _2019-08-01T20:16:10.000Z_
######  Diff: [`8e07b77...5856a13`](https://github.com/ChromeDevTools/devtools-protocol/compare/8e07b77...5856a13)

```diff
@@ browser_protocol.pdl:7109 @@ experimental domain WebAuthn
   type Credential extends object
     properties
       binary credentialId
-      # SHA-256 hash of the Relying Party ID the credential is scoped to. Must
-      # be 32 bytes long.
-      # See https://w3c.github.io/webauthn/#rpidhash
-      binary rpIdHash
-      # The private key in PKCS#8 format.
+      boolean isResidentCredential
+      # Relying Party ID the credential is scoped to. Must be set when adding a
+      # credential.
+      optional string rpId
+      # The ECDSA P-256 private key in PKCS#8 format.
       binary privateKey
+      # An opaque byte sequence with a maximum size of 64 bytes mapping the
+      # credential to a specific user.
+      optional binary userHandle
       # Signature counter. This is incremented by one for each successful
       # assertion.
       # See https://w3c.github.io/webauthn/#signature-counter
```

## Roll protocol to r682524 — _2019-07-31T00:16:09.000Z_
######  Diff: [`0712e15...497b3f8`](https://github.com/ChromeDevTools/devtools-protocol/compare/0712e15...497b3f8)

```diff
@@ browser_protocol.pdl:7064 @@ experimental domain WebAudio
     parameters
       BaseAudioContext context
 
-  # Notifies that existing BaseAudioContext has been destroyed.
-  event contextDestroyed
+  # Notifies that an existing BaseAudioContext will be destroyed.
+  event contextWillBeDestroyed
     parameters
       ContextId contextId
```

## Roll protocol to r681549 — _2019-07-27T00:15:55.000Z_
######  Diff: [`ccba565...0712e15`](https://github.com/ChromeDevTools/devtools-protocol/compare/ccba565...0712e15)

```diff
@@ browser_protocol.pdl:1925 @@ domain DOM
       # JavaScript object id of the node wrapper.
       optional Runtime.RemoteObjectId objectId
 
+  # Sets if stack traces should be captured for Nodes. See `Node.getNodeStackTraces`. Default is disabled.
+  experimental command setNodeStackTracesEnabled
+    parameters
+      # Enable or disable.
+      boolean enable
+
+  # Gets stack traces associated with a Node. As of now, only provides stack trace for Node creation.
+  experimental command getNodeStackTraces
+    parameters
+      # Id of the node to get stack traces for.
+      NodeId nodeId
+    returns
+      # Creation stack trace, if available.
+      optional Runtime.StackTrace creation
+
   # Returns file information for the given
   # File wrapper.
   experimental command getFileInfo
```

## Roll protocol to r680546 678539 — _2019-07-24T19:15:59.000Z_
######  Diff: [`0334ffc...f2a777d`](https://github.com/ChromeDevTools/devtools-protocol/compare/0334ffc...f2a777d)

```diff
@@ browser_protocol.pdl:482 @@ experimental domain BackgroundService
       pushMessaging
       notifications
       paymentHandler
+      periodicBackgroundSync
 
   # Enables event updates for the service.
   command startObserving
```

## Roll protocol to r680180 — _2019-07-23T22:16:11.000Z_
######  Diff: [`06d8e60...0334ffc`](https://github.com/ChromeDevTools/devtools-protocol/compare/06d8e60...0334ffc)

```diff
@@ browser_protocol.pdl:6352 @@ experimental domain SystemInfo
       yuv422
       yuv444
 
+  # Image format of a given image.
+  type ImageType extends string
+    enum
+      jpeg
+      webp
+      unknown
+
   # Describes a supported image decoding profile with its associated minimum and
   # maximum resolutions and subsampling.
   type ImageDecodeAcceleratorCapability extends object
     properties
       # Image coded, e.g. Jpeg.
-      string imageType
+      ImageType imageType
       # Maximum supported dimensions of the image in pixels.
       Size maxDimensions
       # Minimum supported dimensions of the image in pixels.
```

## Roll protocol to r678025 — _2019-07-16T23:15:58.000Z_
######  Diff: [`15eb83b...436e5f2`](https://github.com/ChromeDevTools/devtools-protocol/compare/15eb83b...436e5f2)

```diff
@@ browser_protocol.pdl:4064 @@ domain Network
       # Cookie SameSite type.
       optional CookieSameSite sameSite
 
+  # Types of reasons why a cookie may not be stored from a response.
+  experimental type SetCookieBlockedReason extends string
+    enum
+      # The cookie had the "Secure" attribute but was not received over a secure connection.
+      SecureOnly
+      # The cookie had the "SameSite=Strict" attribute but came from a cross-origin response.
+      # This includes navigation requests intitiated by other origins.
+      SameSiteStrict
+      # The cookie had the "SameSite=Lax" attribute but came from a cross-origin response.
+      SameSiteLax
+      # The cookie had the "SameSite=Extended" attribute but came from a cross-origin response.
+      SameSiteExtended
+      # The cookie didn't specify a "SameSite" attribute and was defaulted to "SameSite=Lax" and
+      # broke the same rules specified in the SameSiteLax value.
+      SameSiteUnspecifiedTreatedAsLax
+      # The cookie had the "SameSite=None" attribute but did not specify the "Secure" attribute,
+      # which is required in order to use "SameSite=None".
+      SameSiteNoneInsecure
+      # The cookie was not stored due to user preferences.
+      UserPreferences
+      # The syntax of the Set-Cookie header of the response was invalid.
+      SyntaxError
+      # The scheme of the connection is not allowed to store cookies.
+      SchemeNotSupported
+      # The cookie was not sent over a secure connection and would have overwritten a cookie with
+      # the Secure attribute.
+      OverwriteSecure
+      # The cookie's domain attribute was invalid with regards to the current host url.
+      InvalidDomain
+      # The cookie used the "__Secure-" or "__Host-" prefix in its name and broke the additional
+      # rules applied to cookies with these prefixes as defined in
+      # https://tools.ietf.org/html/draft-west-cookie-prefixes-05
+      InvalidPrefix
+      # An unknown error was encountered when trying to store this cookie.
+      UnknownError
+
+  # Types of reasons why a cookie may not be sent with a request.
+  experimental type CookieBlockedReason extends string
+    enum
+      # The cookie had the "Secure" attribute and the connection was not secure.
+      SecureOnly
+      # The cookie's path was not within the request url's path.
+      NotOnPath
+      # The cookie's domain is not configured to match the request url's domain, even though they
+      # share a common TLD+1 (TLD+1 of foo.bar.example.com is example.com).
+      DomainMismatch
+      # The cookie had the "SameSite=Strict" attribute and the request was made on on a different
+      # site. This includes navigation requests initiated by other sites.
+      SameSiteStrict
+      # The cookie had the "SameSite=Lax" attribute and the request was made on a different site.
+      # This does not include navigation requests initiated by other sites.
+      SameSiteLax
+      # The cookie had the "SameSite=Extended" attribute and the request was made on a different
+      # site. The different site is outside of the cookie's trusted first-party set.
+      SameSiteExtended
+      # The cookie didn't specify a SameSite attribute when it was stored and was defaulted to
+      # "SameSite=Lax" and broke the same rules specified in the SameSiteLax value. The cookie had
+      # to have been set with "SameSite=None" to enable third-party usage.
+      SameSiteUnspecifiedTreatedAsLax
+      # The cookie had the "SameSite=None" attribute and the connection was not secure. Cookies
+      # without SameSite restrictions must be sent over a secure connection.
+      SameSiteNoneInsecure
+      # The cookie was not sent due to user preferences.
+      UserPreferences
+      # An unknown error was encountered when trying to send this cookie.
+      UnknownError
+
+  # A cookie which was not stored from a response with the corresponding reason.
+  experimental type BlockedSetCookieWithReason extends object
+    properties
+      # The reason this cookie was blocked.
+      SetCookieBlockedReason blockedReason
+      # The string representing this individual cookie as it would appear in the header.
+      # This is not the entire "cookie" or "set-cookie" header which could have multiple cookies.
+      string cookieLine
+      # The cookie object which represents the cookie which was not stored. It is optional because
+      # sometimes complete cookie information is not available, such as in the case of parsing
+      # errors.
+      optional Cookie cookie
+
+  # A cookie with was not sent with a request with the corresponding reason.
+  experimental type BlockedCookieWithReason extends object
+    properties
+      # The reason the cookie was blocked.
+      CookieBlockedReason blockedReason
+      # The cookie object representing the cookie which was not sent.
+      Cookie cookie
+
   # Cookie parameter object
   type CookieParam extends object
     properties
@@ -4699,6 +4787,37 @@ domain Network
       # WebSocket request data.
       WebSocketRequest request
 
+  # Fired when additional information about a requestWillBeSent event is available from the
+  # network stack. Not every requestWillBeSent event will have an additional
+  # requestWillBeSentExtraInfo fired for it, and there is no guarantee whether requestWillBeSent
+  # or requestWillBeSentExtraInfo will be fired first for the same request.
+  experimental event requestWillBeSentExtraInfo
+    parameters
+      # Request identifier. Used to match this information to an existing requestWillBeSent event.
+      RequestId requestId
+      # A list of cookies which will not be sent with this request along with corresponding reasons
+      # for blocking.
+      array of BlockedCookieWithReason blockedCookies
+      # Raw request headers as they will be sent over the wire.
+      Headers headers
+
+  # Fired when additional information about a responseReceived event is available from the network
+  # stack. Not every responseReceived event will have an additional responseReceivedExtraInfo for
+  # it, and responseReceivedExtraInfo may be fired before or after responseReceived.
+  experimental event responseReceivedExtraInfo
+    parameters
+      # Request identifier. Used to match this information to another responseReceived event.
+      RequestId requestId
+      # A list of cookies which were not stored from the response along with the corresponding
+      # reasons for blocking. The cookies here may not be valid due to syntax errors, which
+      # are represented by the invalid cookie line string instead of a proper cookie.
+      array of BlockedSetCookieWithReason blockedCookies
+      # Raw response headers as they were received over the wire.
+      Headers headers
+      # Raw response header text as it was received over the wire. The raw text may not always be
+      # available, such as in the case of HTTP/2 or QUIC.
+      optional string headersText
+
 # This domain provides various functionality related to drawing atop the inspected page.
 experimental domain Overlay
   depends on DOM
```

## Roll protocol to r676164 — _2019-07-10T23:16:22.000Z_
######  Diff: [`eabfde3...783cc86`](https://github.com/ChromeDevTools/devtools-protocol/compare/eabfde3...783cc86)

```diff
@@ browser_protocol.pdl:4754 @@ experimental domain Overlay
       DOM.NodeId nodeId
       # Whether to include distance info.
       optional boolean includeDistance
+      # Whether to include style info.
+      optional boolean includeStyle
     returns
       # Highlight data for the node.
       object highlight
```

## Roll protocol to r674615 641719 — _2019-07-03T21:16:20.000Z_
######  Diff: [`b44b935...e639d55`](https://github.com/ChromeDevTools/devtools-protocol/compare/b44b935...e639d55)

```diff
@@ browser_protocol.pdl:481 @@ experimental domain BackgroundService
       backgroundSync
       pushMessaging
       notifications
+      paymentHandler
 
   # Enables event updates for the service.
   command startObserving
```

## Roll protocol to r673641 — _2019-07-01T05:16:04.000Z_
######  Diff: [`7eda722...8282023`](https://github.com/ChromeDevTools/devtools-protocol/compare/7eda722...8282023)

```diff
@@ browser_protocol.pdl:4170 @@ domain Network
       Headers responseHeaders
       # Signed exchange response signature.
       array of SignedExchangeSignature signatures
+      # Signed exchange header integrity hash in the form of "sha256-<base64-hash-value>".
+      string headerIntegrity
 
   # Field type for a signed exchange related error.
   experimental type SignedExchangeErrorField extends string
```

## Roll protocol to r673382 — _2019-06-28T17:16:01.000Z_
######  Diff: [`55a3386...c27026e`](https://github.com/ChromeDevTools/devtools-protocol/compare/55a3386...c27026e)

```diff
@@ browser_protocol.pdl:4231 @@ domain Network
   # modifications, or blocks it, or completes it with the provided response bytes. If a network
   # fetch occurs as a result which encounters a redirect an additional Network.requestIntercepted
   # event will be sent with the same InterceptionId.
-  experimental command continueInterceptedRequest
+  # Deprecated, use Fetch.continueRequest, Fetch.fulfillRequest and Fetch.failRequest instead.
+  experimental deprecated command continueInterceptedRequest
     parameters
       InterceptionId interceptionId
       # If set this causes the request to fail with the given reason. Passing `Aborted` for requests
@@ -4449,7 +4450,8 @@ domain Network
       Headers headers
 
   # Sets the requests to intercept that match the provided patterns and optionally resource types.
-  experimental command setRequestInterception
+  # Deprecated, please use Fetch.enable instead.
+  experimental deprecated command setRequestInterception
     parameters
       # Requests matching any of these patterns will be forwarded and wait for the corresponding
       # continueInterceptedRequest call.
@@ -4523,7 +4525,8 @@ domain Network
 
   # Details of an intercepted HTTP request, which must be either allowed, blocked, modified or
   # mocked.
-  experimental event requestIntercepted
+  # Deprecated, use Fetch.requestPaused instead.
+  experimental deprecated event requestIntercepted
     parameters
       # Each request the page makes will have a unique id, however if any redirects are encountered
       # while processing that fetch, they will be reported with the same id as the original fetch.
```

## Roll protocol to r673135 — _2019-06-28T00:16:12.000Z_
######  Diff: [`fb3f546...c137a23`](https://github.com/ChromeDevTools/devtools-protocol/compare/fb3f546...c137a23)

```diff
@@ browser_protocol.pdl:5591 @@ domain Page
   # Pauses page execution. Can be resumed using generic Runtime.runIfWaitingForDebugger.
   experimental command waitForDebugger
 
+  # Intercept file chooser requests and transfer control to protocol clients.
+  # When file chooser interception is enabled, native file chooser dialog is not shown.
+  # Instead, a protocol event `Page.fileChooserOpened` is emitted.
+  # File chooser can be handled with `page.handleFileChooser` command.
+  experimental command setInterceptFileChooserDialog
+    parameters
+      boolean enabled
+
+  # Accepts or cancels an intercepted file chooser dialog.
+  experimental command handleFileChooser
+    parameters
+      enum action
+        accept
+        cancel
+        fallback
+      # Array of absolute file paths to set, only respected with `accept` action.
+      optional array of string files
+
   event domContentEventFired
     parameters
       Network.MonotonicTime timestamp
 
+  # Emitted only when `page.interceptFileChooser` is enabled.
+  event fileChooserOpened
+    parameters
+      enum mode
+        selectSingle
+        selectMultiple
+
   # Fired when frame has been attached to its parent.
   event frameAttached
     parameters
```

## Roll protocol to r670852 — _2019-06-20T11:15:55.000Z_
######  Diff: [`927ebde...fef5eb9`](https://github.com/ChromeDevTools/devtools-protocol/compare/927ebde...fef5eb9)

```diff
@@ browser_protocol.pdl:6614 @@ experimental domain Tracing
   # delivered via dataCollected events.
   event tracingComplete
     parameters
+      # Indicates whether some trace data is known to have been lost, e.g. because the trace ring
+      # buffer wrapped around.
+      boolean dataLossOccurred
       # A handle of the stream that holds resulting trace data.
       optional IO.StreamHandle stream
       # Trace data format of returned stream.
```

## Roll protocol to r670335 — _2019-06-19T01:16:11.000Z_
######  Diff: [`471ce93...927ebde`](https://github.com/ChromeDevTools/devtools-protocol/compare/471ce93...927ebde)

```diff
@@ browser_protocol.pdl:5921 @@ domain Security
       # Security state.
       SecurityState securityState
       # True if the page was loaded over cryptographic transport such as HTTPS.
-      boolean schemeIsCryptographic
+      deprecated boolean schemeIsCryptographic
       # List of explanations for the security state. If the overall security state is `insecure` or
       # `warning`, at least one corresponding explanation should be included.
       array of SecurityStateExplanation explanations
```

## Roll protocol to r670203 — _2019-06-18T21:15:55.000Z_
######  Diff: [`fd73e0c...471ce93`](https://github.com/ChromeDevTools/devtools-protocol/compare/fd73e0c...471ce93)

```diff
@@ browser_protocol.pdl:6978 @@ experimental domain WebAuthn
   command clearCredentials
     parameters
       AuthenticatorId authenticatorId
+
+  # Sets whether User Verification succeeds or fails for an authenticator.
+  # The default is true.
+  command setUserVerified
+    parameters
+      AuthenticatorId authenticatorId
+      boolean isUserVerified
```

## Roll protocol to r670021 — _2019-06-18T09:15:55.000Z_
######  Diff: [`7fc59b2...fd73e0c`](https://github.com/ChromeDevTools/devtools-protocol/compare/7fc59b2...fd73e0c)

```diff
@@ browser_protocol.pdl:585 @@ domain Browser
       sensors
       videoCapture
       idleDetection
+      wakeLockScreen
+      wakeLockSystem
 
   # Grant specific permissions to the given origin and reject all others.
   experimental command grantPermissions
```

## Roll protocol to r669732 — _2019-06-17T18:16:03.000Z_
######  Diff: [`d9cb7e4...de8b6d9`](https://github.com/ChromeDevTools/devtools-protocol/compare/d9cb7e4...de8b6d9)

```diff
@@ browser_protocol.pdl:6922 @@ experimental domain WebAuthn
       AuthenticatorTransport transport
       boolean hasResidentKey
       boolean hasUserVerification
+      # If set to true, tests of user presence will succeed immediately.
+      # Otherwise, they will not be resolved. Defaults to true.
+      optional boolean automaticPresenceSimulation
 
   type Credential extends object
     properties
```

## Roll protocol to r668850 668434 — _2019-06-13T16:16:01.000Z_
######  Diff: [`a40fe3f...b24d4a4`](https://github.com/ChromeDevTools/devtools-protocol/compare/a40fe3f...b24d4a4)

```diff
@@ browser_protocol.pdl:6158 @@ experimental domain SystemInfo
       # String description of the GPU driver version.
       string driverVersion
 
+  # Describes the width and height dimensions of an entity.
+  type Size extends object
+    properties
+      # Width in pixels.
+      integer width
+      # Height in pixels.
+      integer height
+
+  # Describes a supported video decoding profile with its associated minimum and
+  # maximum resolutions.
+  type VideoDecodeAcceleratorCapability extends object
+    properties
+      # Video codec profile that is supported, e.g. VP9 Profile 2.
+      string profile
+      # Maximum video dimensions in pixels supported for this |profile|.
+      Size maxResolution
+      # Minimum video dimensions in pixels supported for this |profile|.
+      Size minResolution
+
+  # Describes a supported video encoding profile with its associated maximum
+  # resolution and maximum framerate.
+  type VideoEncodeAcceleratorCapability extends object
+    properties
+      # Video codec profile that is supported, e.g H264 Main.
+      string profile
+      # Maximum video dimensions in pixels supported for this |profile|.
+      Size maxResolution
+      # Maximum encoding framerate in frames per second supported for this
+      # |profile|, as fraction's numerator and denominator, e.g. 24/1 fps,
+      # 24000/1001 fps, etc.
+      integer maxFramerateNumerator
+      integer maxFramerateDenominator
+
+  # YUV subsampling type of the pixels of a given image.
+  type SubsamplingFormat extends string
+    enum
+      yuv420
+      yuv422
+      yuv444
+
+  # Describes a supported image decoding profile with its associated minimum and
+  # maximum resolutions and subsampling.
+  type ImageDecodeAcceleratorCapability extends object
+    properties
+      # Image coded, e.g. Jpeg.
+      string imageType
+      # Maximum supported dimensions of the image in pixels.
+      Size maxDimensions
+      # Minimum supported dimensions of the image in pixels.
+      Size minDimensions
+      # Optional array of supported subsampling formats, e.g. 4:2:0, if known.
+      array of SubsamplingFormat subsamplings
+
   # Provides information about the GPU(s) on the system.
   type GPUInfo extends object
     properties
@@ -6169,6 +6222,12 @@ experimental domain SystemInfo
       optional object featureStatus
       # An optional array of GPU driver bug workarounds.
       array of string driverBugWorkarounds
+      # Supported accelerated video decoding capabilities.
+      array of VideoDecodeAcceleratorCapability videoDecoding
+      # Supported accelerated video encoding capabilities.
+      array of VideoEncodeAcceleratorCapability videoEncoding
+      # Supported accelerated image decoding capabilities.
+      array of ImageDecodeAcceleratorCapability imageDecoding
 
   # Represents process info.
   type ProcessInfo extends object
```

## Roll protocol to r668114 — _2019-06-11T20:15:52.000Z_
######  Diff: [`937d75e...a40fe3f`](https://github.com/ChromeDevTools/devtools-protocol/compare/937d75e...a40fe3f)

```diff
@@ browser_protocol.pdl:4892 @@ experimental domain Overlay
 domain Page
   depends on Debugger
   depends on DOM
+  depends on IO
   depends on Network
   depends on Runtime
 
@@ -5351,9 +5352,15 @@ domain Page
       # Whether or not to prefer page size as defined by css. Defaults to false,
       # in which case the content will be scaled to fit the paper size.
       optional boolean preferCSSPageSize
+      # return as stream
+      experimental optional enum transferMode
+        ReturnAsBase64
+        ReturnAsStream
     returns
-      # Base64-encoded pdf data.
+      # Base64-encoded pdf data. Empty if |returnAsStream| is specified.
       binary data
+      # A handle of the stream that holds resulting PDF data.
+      experimental optional IO.StreamHandle stream
 
   # Reloads given page optionally ignoring the cache.
   command reload
```

## Roll protocol to r667807 — _2019-06-11T00:15:38.000Z_
######  Diff: [`c42a81a...a4a807c`](https://github.com/ChromeDevTools/devtools-protocol/compare/c42a81a...a4a807c)

```diff
@@ browser_protocol.pdl:4909 @@ domain Page
       Network.LoaderId loaderId
       # Frame's name as specified in the tag.
       optional string name
-      # Frame document's URL.
+      # Frame document's URL without fragment.
       string url
+      # Frame document's URL fragment including the '#'.
+      experimental optional string urlFragment
       # Frame document's security origin.
       string securityOrigin
       # Frame document's mimeType as determined by the browser.
       string mimeType
-      # If the frame failed to load, this contains the URL that could not be loaded.
+      # If the frame failed to load, this contains the URL that could not be loaded. Note that unlike url above, this URL may contain a fragment.
       experimental optional string unreachableUrl
 
   # Information about the Resource on the page.
```

## Roll protocol to r667801 — _2019-06-10T23:16:30.000Z_
######  Diff: [`cd76fe0...c42a81a`](https://github.com/ChromeDevTools/devtools-protocol/compare/cd76fe0...c42a81a)

```diff
@@ browser_protocol.pdl:6855 @@ experimental domain WebAuthn
       boolean hasResidentKey
       boolean hasUserVerification
 
+  type Credential extends object
+    properties
+      binary credentialId
+      # SHA-256 hash of the Relying Party ID the credential is scoped to. Must
+      # be 32 bytes long.
+      # See https://w3c.github.io/webauthn/#rpidhash
+      binary rpIdHash
+      # The private key in PKCS#8 format.
+      binary privateKey
+      # Signature counter. This is incremented by one for each successful
+      # assertion.
+      # See https://w3c.github.io/webauthn/#signature-counter
+      integer signCount
+
   # Enable the WebAuthn domain and start intercepting credential storage and
   # retrieval with a virtual authenticator.
   command enable
@@ -6873,3 +6887,21 @@ experimental domain WebAuthn
   command removeVirtualAuthenticator
     parameters
       AuthenticatorId authenticatorId
+
+  # Adds the credential to the specified authenticator.
+  command addCredential
+    parameters
+      AuthenticatorId authenticatorId
+      Credential credential
+
+  # Returns all the credentials stored in the given virtual authenticator.
+  command getCredentials
+    parameters
+      AuthenticatorId authenticatorId
+    returns
+      array of Credential credentials
+
+  # Clears all the credentials from the specified device.
+  command clearCredentials
+    parameters
+      AuthenticatorId authenticatorId
```

## Roll protocol to r667155 — _2019-06-07T16:16:15.000Z_
######  Diff: [`047f15a...cd76fe0`](https://github.com/ChromeDevTools/devtools-protocol/compare/047f15a...cd76fe0)

```diff
@@ browser_protocol.pdl:4843 @@ experimental domain Overlay
       # True for showing paint rectangles
       boolean result
 
+  # Requests that backend shows layout shift regions
+  command setShowLayoutShiftRegions
+    parameters
+      # True for showing layout shift regions
+      boolean result
+
   # Requests that backend shows scroll bottleneck rects
   command setShowScrollBottleneckRects
     parameters
```

## Roll protocol to r666393 — _2019-06-05T19:15:46.000Z_
######  Diff: [`30dd754...2bb413c`](https://github.com/ChromeDevTools/devtools-protocol/compare/30dd754...2bb413c)

```diff
@@ browser_protocol.pdl:2416 @@ experimental domain DOMSnapshot
       array of StringIndex text
       # Stacking context information.
       RareBooleanData stackingContexts
+      # The offset rect of nodes. Only available when includeDOMRects is set to true
+      optional array of Rectangle offsetRects
+      # The scroll rect of nodes. Only available when includeDOMRects is set to true
+      optional array of Rectangle scrollRects
+      # The client rect of nodes. Only available when includeDOMRects is set to true
+      optional array of Rectangle clientRects
 
   # Table of details of the post layout rendered text positions. The exact layout should not be regarded as
   # stable and may change between versions.
@@ -2468,6 +2474,8 @@ experimental domain DOMSnapshot
     parameters
       # Whitelist of computed styles to return.
       array of string computedStyles
+      # Whether to include DOM rectangles (offsetRects, clientRects, scrollRects) into the snapshot
+      optional boolean includeDOMRects
     returns
       # The nodes in the DOM tree. The DOMNode at index 0 corresponds to the root document.
       array of DocumentSnapshot documents
@@ -6756,16 +6764,19 @@ experimental domain WebAudio
       running
       closed
 
-  # Fields in AudioContext that change in real-time. These are not updated
-  # on OfflineAudioContext.
+  # Fields in AudioContext that change in real-time.
   type ContextRealtimeData extends object
     properties
       # The current context time in second in BaseAudioContext.
-      optional number currentTime
+      number currentTime
       # The time spent on rendering graph divided by render qunatum duration,
       # and multiplied by 100. 100 means the audio renderer reached the full
       # capacity and glitch may occur.
-      optional number renderCapacity
+      number renderCapacity
+      # A running mean of callback interval.
+      number callbackIntervalMean
+      # A running variance of callback interval.
+      number callbackIntervalVariance
 
   # Protocol object for BaseAudioContext
   type BaseAudioContext extends object
```

## Roll protocol to r666105 — _2019-06-05T01:15:57.000Z_
######  Diff: [`abac32e...30dd754`](https://github.com/ChromeDevTools/devtools-protocol/compare/abac32e...30dd754)

```diff
@@ browser_protocol.pdl:6812 @@ experimental domain WebAudio
 # This domain allows configuring virtual authenticators to test the WebAuthn
 # API.
 experimental domain WebAuthn
+  type AuthenticatorId extends string
+
+  type AuthenticatorProtocol extends string
+    enum
+      # Universal 2nd Factor.
+      u2f
+      # Client To Authenticator Protocol 2.
+      ctap2
+
+  type AuthenticatorTransport extends string
+    enum
+      # Cross-Platform authenticator attachments:
+      usb
+      nfc
+      ble
+      cable
+      # Platform authenticator attachment:
+      internal
+
+  type VirtualAuthenticatorOptions extends object
+    properties
+      AuthenticatorProtocol protocol
+      AuthenticatorTransport transport
+      boolean hasResidentKey
+      boolean hasUserVerification
+
   # Enable the WebAuthn domain and start intercepting credential storage and
   # retrieval with a virtual authenticator.
   command enable
 
   # Disable the WebAuthn domain.
   command disable
+
+  # Creates and adds a virtual authenticator.
+  command addVirtualAuthenticator
+    parameters
+      VirtualAuthenticatorOptions options
+    returns
+      AuthenticatorId authenticatorId
+
+  # Removes the given authenticator.
+  command removeVirtualAuthenticator
+    parameters
+      AuthenticatorId authenticatorId
```

## Roll protocol to r665395 — _2019-06-01T04:15:47.000Z_
######  Diff: [`fff326b...fab8221`](https://github.com/ChromeDevTools/devtools-protocol/compare/fff326b...fab8221)

```diff
@@ browser_protocol.pdl:2362 @@ experimental domain DOMSnapshot
       LayoutTreeSnapshot layout
       # The post-layout inline text nodes.
       TextBoxSnapshot textBoxes
-      # Scroll offsets.
+      # Horizontal scroll offset.
       optional number scrollOffsetX
+      # Vertical scroll offset.
       optional number scrollOffsetY
 
   # Table containing nodes.
@@ -2402,12 +2403,12 @@ experimental domain DOMSnapshot
       # The url of the script (if any) that generates this node.
       optional RareStringData originURL
 
-  # Details of an element in the DOM tree with a LayoutObject.
+  # Table of details of an element in the DOM tree with a LayoutObject.
   type LayoutTreeSnapshot extends object
     properties
-      # The index of the related DOM node in the `domNodes` array returned by `getSnapshot`.
+      # Index of the corresponding node in the `NodeTreeSnapshot` array returned by `captureSnapshot`.
       array of integer nodeIndex
-      # Index into the `computedStyles` array returned by `captureSnapshot`.
+      # Array of indexes specifying computed style strings, filtered according to the `computedStyles` parameter passed to `captureSnapshot`.
       array of ArrayOfStrings styles
       # The absolute position bounding box.
       array of Rectangle bounds
@@ -2416,11 +2417,11 @@ experimental domain DOMSnapshot
       # Stacking context information.
       RareBooleanData stackingContexts
 
-  # Details of post layout rendered text positions. The exact layout should not be regarded as
+  # Table of details of the post layout rendered text positions. The exact layout should not be regarded as
   # stable and may change between versions.
   type TextBoxSnapshot extends object
     properties
-      # Intex of th elayout tree node that owns this box collection.
+      # Index of the layout tree node that owns this box collection.
       array of integer layoutIndex
       # The absolute position bounding box.
       array of Rectangle bounds
```

## Roll protocol to r664845 — _2019-05-30T19:15:53.000Z_
######  Diff: [`01a7aa9...1a6ebbc`](https://github.com/ChromeDevTools/devtools-protocol/compare/01a7aa9...1a6ebbc)

```diff
@@ browser_protocol.pdl:1343 @@ experimental domain CacheStorage
 # functionalities.
 experimental domain Cast
 
+  type Sink extends object
+    properties
+      string name
+      string id
+      # Text describing the current session. Present only if there is an active
+      # session on the sink.
+      optional string session
+
   # Starts observing for sinks that can be used for tab mirroring, and if set,
   # sinks compatible with |presentationUrl| as well. When sinks are found, a
   # |sinksUpdated| event is fired.
@@ -1375,7 +1383,7 @@ experimental domain Cast
   # device or a software surface that you can cast to.
   event sinksUpdated
     parameters
-      array of string sinkNames
+      array of Sink sinks
 
   # This is fired whenever the outstanding issue/error message changes.
   # |issueMessage| is empty if there is no issue.
```

## Roll protocol to r664634 — _2019-05-30T03:15:49.000Z_
######  Diff: [`b5a873e...9326d45`](https://github.com/ChromeDevTools/devtools-protocol/compare/b5a873e...9326d45)

```diff
@@ browser_protocol.pdl:1343 @@ experimental domain CacheStorage
 # functionalities.
 experimental domain Cast
 
-  type Sink extends object
-    properties
-      string name
-      string id
-      # Text describing the current session. Present only if there is an active
-      # session on the sink.
-      optional string session
-
   # Starts observing for sinks that can be used for tab mirroring, and if set,
   # sinks compatible with |presentationUrl| as well. When sinks are found, a
   # |sinksUpdated| event is fired.
@@ -1383,7 +1375,7 @@ experimental domain Cast
   # device or a software surface that you can cast to.
   event sinksUpdated
     parameters
-      array of Sink sinks
+      array of string sinkNames
 
   # This is fired whenever the outstanding issue/error message changes.
   # |issueMessage| is empty if there is no issue.
```

## Roll protocol to r664496 — _2019-05-29T22:15:58.000Z_
######  Diff: [`5a1d75b...b5a873e`](https://github.com/ChromeDevTools/devtools-protocol/compare/5a1d75b...b5a873e)

```diff
@@ browser_protocol.pdl:1343 @@ experimental domain CacheStorage
 # functionalities.
 experimental domain Cast
 
+  type Sink extends object
+    properties
+      string name
+      string id
+      # Text describing the current session. Present only if there is an active
+      # session on the sink.
+      optional string session
+
   # Starts observing for sinks that can be used for tab mirroring, and if set,
   # sinks compatible with |presentationUrl| as well. When sinks are found, a
   # |sinksUpdated| event is fired.
@@ -1375,7 +1383,7 @@ experimental domain Cast
   # device or a software surface that you can cast to.
   event sinksUpdated
     parameters
-      array of string sinkNames
+      array of Sink sinks
 
   # This is fired whenever the outstanding issue/error message changes.
   # |issueMessage| is empty if there is no issue.
@@ -6266,6 +6274,11 @@ domain Target
       # Whether BeginFrames for this target will be controlled via DevTools (headless chrome only,
       # not supported on MacOS yet, false by default).
       experimental optional boolean enableBeginFrameControl
+      # Whether to create a new Window or Tab (chrome-only, false by default).
+      optional boolean newWindow
+      # Whether to create the target in background or foreground (chrome-only,
+      # false by default).
+      optional boolean background
     returns
       # The id of the page opened.
       TargetID targetId
```

## Roll protocol to r664421 — _2019-05-29T20:15:58.000Z_
######  Diff: [`8246573...5a1d75b`](https://github.com/ChromeDevTools/devtools-protocol/compare/8246573...5a1d75b)

```diff
@@ browser_protocol.pdl:6794 @@ experimental domain WebAudio
   event contextChanged
     parameters
       BaseAudioContext context
+
+# This domain allows configuring virtual authenticators to test the WebAuthn
+# API.
+experimental domain WebAuthn
+  # Enable the WebAuthn domain and start intercepting credential storage and
+  # retrieval with a virtual authenticator.
+  command enable
+
+  # Disable the WebAuthn domain.
+  command disable
```

## Roll protocol to r663310 — _2019-05-24T23:16:12.000Z_
######  Diff: [`7deb3ca...9c1151e`](https://github.com/ChromeDevTools/devtools-protocol/compare/7deb3ca...9c1151e)

```diff
@@ browser_protocol.pdl:2770 @@ domain Emulation
       # Absolute timestamp at which virtual time was first enabled (up time in milliseconds).
       number virtualTimeTicksBase
 
+  # Overrides default host system timezone with the specified one.
+  experimental command setTimezoneOverride
+    parameters
+      # The timezone identifier. If empty, disables the override and
+      # restores default host system timezone.
+      string timezoneId
+
   # Resizes the frame/viewport of the page. Note that this does not affect the frame's container
   # (e.g. browser window). Can be used to produce screenshots of the specified size. Not supported
   # on Android.
@@ -6786,4 +6793,4 @@ experimental domain WebAudio
   # Notifies that existing BaseAudioContext has changed some properties (id stays the same)..
   event contextChanged
     parameters
-      BaseAudioContext context
\ No newline at end of file
+      BaseAudioContext context
```

## Roll protocol to r662959 — _2019-05-24T04:16:03.000Z_
######  Diff: [`58c4454...7deb3ca`](https://github.com/ChromeDevTools/devtools-protocol/compare/58c4454...7deb3ca)

```diff
@@ browser_protocol.pdl:3936 @@ domain Network
       optional boolean fromDiskCache
       # Specifies that the request was served from the ServiceWorker.
       optional boolean fromServiceWorker
+      # Specifies that the request was served from the prefetch cache.
+      optional boolean fromPrefetchCache
       # Total number of bytes received for this request so far.
       number encodedDataLength
       # Timing information for the given request.
```

## Roll protocol to r661591 — _2019-05-21T02:16:08.000Z_
######  Diff: [`d249f2d...4023d08`](https://github.com/ChromeDevTools/devtools-protocol/compare/d249f2d...4023d08)

```diff
@@ browser_protocol.pdl:6112 @@ experimental domain SystemInfo
       string vendorString
       # String description of the GPU device, if the PCI ID is not available.
       string deviceString
+      # String description of the GPU driver vendor.
+      string driverVendor
+      # String description of the GPU driver version.
+      string driverVersion
 
   # Provides information about the GPU(s) on the system.
   type GPUInfo extends object
```

## Roll protocol to r661407 — _2019-05-20T18:16:28.000Z_
######  Diff: [`95c7225...d249f2d`](https://github.com/ChromeDevTools/devtools-protocol/compare/95c7225...d249f2d)

```diff
@@ browser_protocol.pdl:479 @@ experimental domain BackgroundService
     enum
       backgroundFetch
       backgroundSync
+      pushMessaging
+      notifications
 
   # Enables event updates for the service.
   command startObserving
```

## Roll protocol to r658716 — _2019-05-10T20:15:57.000Z_
######  Diff: [`56dd9e6...13c78cc`](https://github.com/ChromeDevTools/devtools-protocol/compare/56dd9e6...13c78cc)

```diff
@@ browser_protocol.pdl:4716 @@ experimental domain Overlay
     parameters
       # Id of the node to get highlight object for.
       DOM.NodeId nodeId
+      # Whether to include distance info.
+      optional boolean includeDistance
     returns
       # Highlight data for the node.
       object highlight
```

## Roll protocol to r658093 — _2019-05-09T13:16:29.000Z_
######  Diff: [`25da6a0...56dd9e6`](https://github.com/ChromeDevTools/devtools-protocol/compare/25da6a0...56dd9e6)

```diff
@@ js_protocol.pdl:317 @@ domain Debugger
       # Location this breakpoint resolved into.
       Location actualLocation
 
+  # Sets instrumentation breakpoint.
+  command setInstrumentationBreakpoint
+    parameters
+      # Instrumentation name.
+      enum instrumentation
+        beforeScriptExecution
+        beforeScriptWithSourceMapExecution
+    returns
+      # Id of the created breakpoint for further reference.
+      BreakpointId breakpointId
+
   # Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this
   # command is issued, all existing parsed scripts will have breakpoints resolved and returned in
   # `locations` property. Further matching script parsing will result in subsequent
@@ -449,16 +460,17 @@ domain Debugger
       array of CallFrame callFrames
       # Pause reason.
       enum reason
-        XHR
+        ambiguous
+        assert
+        debugCommand
         DOM
         EventListener
         exception
-        assert
-        debugCommand
-        promiseRejection
+        instrumentation
         OOM
         other
-        ambiguous
+        promiseRejection
+        XHR
       # Object containing break-specific auxiliary properties.
       optional object data
       # Hit breakpoints IDs
```

## Roll protocol to r655971 — _2019-05-02T12:16:27.000Z_
######  Diff: [`f4514f1...2dfb37c`](https://github.com/ChromeDevTools/devtools-protocol/compare/f4514f1...2dfb37c)

```diff
@@ browser_protocol.pdl:578 @@ domain Browser
       midiSysex
       notifications
       paymentHandler
+      periodicBackgroundSync
       protectedMediaIdentifier
       sensors
       videoCapture
```

## Roll protocol to r654576 — _2019-04-26T20:16:29.000Z_
######  Diff: [`52b6990...ac6e0e0`](https://github.com/ChromeDevTools/devtools-protocol/compare/52b6990...ac6e0e0)

```diff
@@ browser_protocol.pdl:5620 @@ domain Page
       # Id of the frame that has stopped loading.
       FrameId frameId
 
+  # Fired when page is about to start a download.
+  experimental event downloadWillBegin
+    parameters
+      # Id of the frame that caused download to begin.
+      FrameId frameId
+      # URL of the resource being downloaded.
+      string url
+
   # Fired when interstitial page was hidden
   event interstitialHidden
```

## Roll protocol to r652664 — _2019-04-19T22:15:54.000Z_
######  Diff: [`3348d18...ba2ecc6`](https://github.com/ChromeDevTools/devtools-protocol/compare/3348d18...ba2ecc6)

```diff
@@ browser_protocol.pdl:3752 @@ domain Network
     enum
       Strict
       Lax
+      Extended
+      None
 
   # Timing information for the request.
   type ResourceTiming extends object
```

## Roll protocol to r652382 — _2019-04-18T23:15:52.000Z_
######  Diff: [`7e6cca5...3348d18`](https://github.com/ChromeDevTools/devtools-protocol/compare/7e6cca5...3348d18)

```diff
@@ browser_protocol.pdl:6693 @@ experimental domain Fetch
       # If this is set, client should respond with continueRequest that
       # contains AuthChallengeResponse.
       AuthChallenge authChallenge
+
+# This domain allows inspection of Web Audio API.
+# https://webaudio.github.io/web-audio-api/
+experimental domain WebAudio
+
+  # Context's UUID in string
+  type ContextId extends string
+
+  # Enum of BaseAudioContext types
+  type ContextType extends string
+    enum
+      realtime
+      offline
+
+  # Enum of AudioContextState from the spec
+  type ContextState extends string
+    enum
+      suspended
+      running
+      closed
+
+  # Fields in AudioContext that change in real-time. These are not updated
+  # on OfflineAudioContext.
+  type ContextRealtimeData extends object
+    properties
+      # The current context time in second in BaseAudioContext.
+      optional number currentTime
+      # The time spent on rendering graph divided by render qunatum duration,
+      # and multiplied by 100. 100 means the audio renderer reached the full
+      # capacity and glitch may occur.
+      optional number renderCapacity
+
+  # Protocol object for BaseAudioContext
+  type BaseAudioContext extends object
+    properties
+      ContextId contextId
+      ContextType contextType
+      ContextState contextState
+      optional ContextRealtimeData realtimeData
+      # Platform-dependent callback buffer size.
+      number callbackBufferSize
+      # Number of output channels supported by audio hardware in use.
+      number maxOutputChannelCount
+      # Context sample rate.
+      number sampleRate
+
+  # Enables the WebAudio domain and starts sending context lifetime events.
+  command enable
+
+  # Disables the WebAudio domain.
+  command disable
+
+  # Fetch the realtime data from the registered contexts.
+  command getRealtimeData
+    parameters
+      ContextId contextId
+    returns
+      ContextRealtimeData realtimeData
+
+  # Notifies that a new BaseAudioContext has been created.
+  event contextCreated
+    parameters
+      BaseAudioContext context
+
+  # Notifies that existing BaseAudioContext has been destroyed.
+  event contextDestroyed
+    parameters
+      ContextId contextId
+
+  # Notifies that existing BaseAudioContext has changed some properties (id stays the same)..
+  event contextChanged
+    parameters
+      BaseAudioContext context
\ No newline at end of file
```

## Roll protocol to r652253 — _2019-04-18T19:15:58.000Z_
######  Diff: [`b97d14d...7e6cca5`](https://github.com/ChromeDevTools/devtools-protocol/compare/b97d14d...7e6cca5)

```diff
@@ browser_protocol.pdl:5579 @@ domain Page
   # Navigation may still be cancelled after the event is issued.
   experimental event frameRequestedNavigation
     parameters
-      # Id of the frame that has scheduled a navigation.
+      # Id of the frame that is being navigated.
       FrameId frameId
       # The reason for the navigation.
       ClientNavigationReason reason
```

## Roll protocol to r651096 — _2019-04-16T01:15:55.000Z_
######  Diff: [`a5c2d16...fe5e1f5`](https://github.com/ChromeDevTools/devtools-protocol/compare/a5c2d16...fe5e1f5)

```diff
@@ browser_protocol.pdl:5795 @@ domain Security
   # Information about insecure content on the page.
   deprecated type InsecureContentStatus extends object
     properties
-      # True if the page was loaded over HTTPS and ran mixed (HTTP) content such as scripts.
+      # Always false.
       boolean ranMixedContent
-      # True if the page was loaded over HTTPS and displayed mixed (HTTP) content such as images.
+      # Always false.
       boolean displayedMixedContent
-      # True if the page was loaded over HTTPS and contained a form targeting an insecure url.
+      # Always false.
       boolean containedMixedForm
-      # True if the page was loaded over HTTPS without certificate errors, and ran content such as
-      # scripts that were loaded with certificate errors.
+      # Always false.
       boolean ranContentWithCertErrors
-      # True if the page was loaded over HTTPS without certificate errors, and displayed content
-      # such as images that were loaded with certificate errors.
+      # Always false.
       boolean displayedContentWithCertErrors
-      # Security state representing a page that ran insecure content.
+      # Always set to unknown.
       SecurityState ranInsecureContentStyle
-      # Security state representing a page that displayed insecure content.
+      # Always set to unknown.
       SecurityState displayedInsecureContentStyle
 
   # The action to take when a certificate error occurs. continue will continue processing the
```

## Roll protocol to r649764 — _2019-04-11T03:15:55.000Z_
######  Diff: [`37fb01d...20e84f7`](https://github.com/ChromeDevTools/devtools-protocol/compare/37fb01d...20e84f7)

```diff
@@ browser_protocol.pdl:5173 @@ domain Page
       # Manifest content.
       optional string data
 
+  experimental command getInstallabilityErrors
+    returns
+      array of string errors
+
   # Returns all browser cookies. Depending on the backend support, will return detailed cookie
   # information in the `cookies` field.
   experimental deprecated command getCookies
@@ -5705,7 +5709,6 @@ domain Page
       # Base64-encoded data
       binary data
 
-
 domain Performance
 
   # Run-time execution metric.
```

## Roll protocol to r648372 637670 — _2019-04-05T22:15:55.000Z_
######  Diff: [`9d1a903...401f203`](https://github.com/ChromeDevTools/devtools-protocol/compare/9d1a903...401f203)

```diff
@@ browser_protocol.pdl:4520 @@ domain Network
       # Response headers if intercepted at the response stage or if redirect occurred while
       # intercepting request or auth retry occurred.
       optional Headers responseHeaders
+      # If the intercepted request had a corresponding requestWillBeSent event fired for it, then
+      # this requestId will be the same as the requestId present in the requestWillBeSent event.
+      optional RequestId requestId
 
   # Fired if request ended up loading from cache.
   event requestServedFromCache
@@ -6669,6 +6672,9 @@ experimental domain Fetch
       optional integer responseStatusCode
       # Response headers if intercepted at the response stage.
       optional array of HeaderEntry responseHeaders
+      # If the intercepted request had a corresponding Network.requestWillBeSent event fired for it,
+      # then this networkId will be the same as the requestId present in the requestWillBeSent event.
+      optional RequestId networkId
 
   # Issued when the domain is enabled with handleAuthRequests set to true.
   # The request is paused until client responds with continueWithAuth.
```

## Roll protocol to r648288 — _2019-04-05T19:16:00.000Z_
######  Diff: [`f37cb70...9d1a903`](https://github.com/ChromeDevTools/devtools-protocol/compare/f37cb70...9d1a903)

```diff
@@ browser_protocol.pdl:6405 @@ experimental domain Tracing
       # Configuration for memory dump triggers. Used only when "memory-infra" category is enabled.
       optional MemoryDumpConfig memoryDumpConfig
 
+  # Data format of a trace. Can be either the legacy JSON format or the
+  # protocol buffer format. Note that the JSON format will be deprecated soon.
+  type StreamFormat extends string
+    enum
+      json
+      proto
+
   # Compression type to use for traces returned via streams.
   type StreamCompression extends string
     enum
@@ -6448,6 +6455,9 @@ experimental domain Tracing
       optional enum transferMode
         ReportEvents
         ReturnAsStream
+      # Trace data format to use. This only applies when using `ReturnAsStream`
+      # transfer mode (defaults to `json`).
+      optional StreamFormat streamFormat
       # Compression format to use. This only applies when using `ReturnAsStream`
       # transfer mode (defaults to `none`)
       optional StreamCompression streamCompression
@@ -6476,6 +6486,8 @@ experimental domain Tracing
     parameters
       # A handle of the stream that holds resulting trace data.
       optional IO.StreamHandle stream
+      # Trace data format of returned stream.
+      optional StreamFormat traceFormat
       # Compression format of returned stream.
       optional StreamCompression streamCompression
```

## Roll protocol to r648019 — _2019-04-05T01:16:14.000Z_
######  Diff: [`aad03c0...f37cb70`](https://github.com/ChromeDevTools/devtools-protocol/compare/aad03c0...f37cb70)

```diff
@@ browser_protocol.pdl:4415 @@ domain Network
       # Map with extra HTTP headers.
       Headers headers
 
-  # Sets the requests to intercept that match a the provided patterns and optionally resource types.
+  # Sets the requests to intercept that match the provided patterns and optionally resource types.
   experimental command setRequestInterception
     parameters
       # Requests matching any of these patterns will be forwarded and wait for the corresponding
```

## Roll protocol to r647618 — _2019-04-04T04:16:27.000Z_
######  Diff: [`802c5b3...d59e473`](https://github.com/ChromeDevTools/devtools-protocol/compare/802c5b3...d59e473)

```diff
@@ browser_protocol.pdl:4696 @@ experimental domain Overlay
       searchForNode
       searchForUAShadowDOM
       captureAreaScreenshot
+      showDistances
       none
 
   # Disables domain notifications.
```

## Roll protocol to r646981 — _2019-04-02T22:16:33.000Z_
######  Diff: [`fb73f39...802c5b3`](https://github.com/ChromeDevTools/devtools-protocol/compare/fb73f39...802c5b3)

```diff
@@ browser_protocol.pdl:6404 @@ experimental domain Tracing
       # Configuration for memory dump triggers. Used only when "memory-infra" category is enabled.
       optional MemoryDumpConfig memoryDumpConfig
 
-  # Data format of a trace. Can be either the legacy JSON format or the
-  # protocol buffer format. Note that the JSON format will be deprecated soon.
-  type StreamFormat extends string
-    enum
-      json
-      proto
-
   # Compression type to use for traces returned via streams.
   type StreamCompression extends string
     enum
@@ -6454,9 +6447,6 @@ experimental domain Tracing
       optional enum transferMode
         ReportEvents
         ReturnAsStream
-      # Trace data format to use. This only applies when using `ReturnAsStream`
-      # transfer mode (defaults to `json`).
-      optional StreamFormat streamFormat
       # Compression format to use. This only applies when using `ReturnAsStream`
       # transfer mode (defaults to `none`)
       optional StreamCompression streamCompression
@@ -6485,8 +6475,6 @@ experimental domain Tracing
     parameters
       # A handle of the stream that holds resulting trace data.
       optional IO.StreamHandle stream
-      # Trace data format of returned stream.
-      optional StreamFormat traceFormat
       # Compression format of returned stream.
       optional StreamCompression streamCompression
```

## Roll protocol to r646909 — _2019-04-02T19:15:55.000Z_
######  Diff: [`9e59fdf...fb73f39`](https://github.com/ChromeDevTools/devtools-protocol/compare/9e59fdf...fb73f39)

```diff
@@ browser_protocol.pdl:6404 @@ experimental domain Tracing
       # Configuration for memory dump triggers. Used only when "memory-infra" category is enabled.
       optional MemoryDumpConfig memoryDumpConfig
 
+  # Data format of a trace. Can be either the legacy JSON format or the
+  # protocol buffer format. Note that the JSON format will be deprecated soon.
+  type StreamFormat extends string
+    enum
+      json
+      proto
+
   # Compression type to use for traces returned via streams.
   type StreamCompression extends string
     enum
@@ -6447,6 +6454,9 @@ experimental domain Tracing
       optional enum transferMode
         ReportEvents
         ReturnAsStream
+      # Trace data format to use. This only applies when using `ReturnAsStream`
+      # transfer mode (defaults to `json`).
+      optional StreamFormat streamFormat
       # Compression format to use. This only applies when using `ReturnAsStream`
       # transfer mode (defaults to `none`)
       optional StreamCompression streamCompression
@@ -6475,6 +6485,8 @@ experimental domain Tracing
     parameters
       # A handle of the stream that holds resulting trace data.
       optional IO.StreamHandle stream
+      # Trace data format of returned stream.
+      optional StreamFormat traceFormat
       # Compression format of returned stream.
       optional StreamCompression streamCompression
```

## Roll protocol to r646409 — _2019-04-01T18:16:05.000Z_
######  Diff: [`87c65d3...9e59fdf`](https://github.com/ChromeDevTools/devtools-protocol/compare/87c65d3...9e59fdf)

```diff
@@ browser_protocol.pdl:3030 @@ experimental domain IndexedDB
       array of DataEntry objectStoreDataEntries
       # If true, there are more entries to fetch in the given range.
       boolean hasMore
-  
+
   # Gets metadata of an object store
   command getMetadata
     parameters
@@ -5786,7 +5786,7 @@ domain Security
       optional array of string recommendations
 
   # Information about insecure content on the page.
-  type InsecureContentStatus extends object
+  deprecated type InsecureContentStatus extends object
     properties
       # True if the page was loaded over HTTPS and ran mixed (HTTP) content such as scripts.
       boolean ranMixedContent
@@ -5863,7 +5863,7 @@ domain Security
       # `warning`, at least one corresponding explanation should be included.
       array of SecurityStateExplanation explanations
       # Information about insecure content on the page.
-      InsecureContentStatus insecureContentStatus
+      deprecated InsecureContentStatus insecureContentStatus
       # Overrides user-visible description of the state.
       optional string summary
```

## Roll protocol to r646048 — _2019-03-30T01:16:06.000Z_
######  Diff: [`313a238...87c65d3`](https://github.com/ChromeDevTools/devtools-protocol/compare/313a238...87c65d3)

```diff
@@ js_protocol.pdl:1416 @@ domain Runtime
       ExecutionContextId executionContextId
       # Call timestamp.
       Timestamp timestamp
-      # Stack trace captured when the call was made.
+      # Stack trace captured when the call was made. The async stack chain is automatically reported for
+      # the following call types: `assert`, `error`, `trace`, `warning`. For other types the async call
+      # chain can be retrieved using `Debugger.getStackTrace` and `stackTrace.parentId` field.
       optional StackTrace stackTrace
       # Console context descriptor for calls on non-default console context (not console.*):
       # 'anonymous#unique-logger-id' for call on unnamed context, 'name#unique-logger-id' for call
```

## Roll protocol to r644580 — _2019-03-26T23:16:03.000Z_
######  Diff: [`6ee35f9...b99eee8`](https://github.com/ChromeDevTools/devtools-protocol/compare/6ee35f9...b99eee8)

```diff
@@ browser_protocol.pdl:6478 @@ experimental domain Tracing
       # Compression format of returned stream.
       optional StreamCompression streamCompression
 
-# Testing domain is a dumping ground for the capabilities requires for browser or app testing that do not fit other
-# domains.
-experimental domain Testing
-  depends on Page
-
-  # Generates a report for testing.
-  command generateTestReport
-    parameters
-      # Message to be displayed in the report.
-      string message
-      # Specifies the endpoint group to deliver the report to.
-      optional string group
-
 # A domain for letting clients substitute browser's network layer with client code.
 experimental domain Fetch
   depends on Network
```

## Roll protocol to r644552 — _2019-03-26T22:16:08.000Z_
######  Diff: [`a019aca...6ee35f9`](https://github.com/ChromeDevTools/devtools-protocol/compare/a019aca...6ee35f9)

```diff
@@ browser_protocol.pdl:1332 @@ experimental domain CacheStorage
     returns
       # Array of object store data entries.
       array of DataEntry cacheDataEntries
-      # If true, there are more entries to fetch in the given range.
-      boolean hasMore
+      # Count of returned entries from this storage. If pathFilter is empty, it
+      # is the count of all entries from this storage.
+      number returnCount
 
 # A domain for interacting with Cast, Presentation API, and Remote Playback API
 # functionalities.
```

## Roll protocol to r644145 — _2019-03-26T02:16:08.000Z_
######  Diff: [`19f4d92...a019aca`](https://github.com/ChromeDevTools/devtools-protocol/compare/19f4d92...a019aca)

```diff
@@ browser_protocol.pdl:5054 @@ domain Page
       # Default fixed font size.
       optional integer fixed
 
+  experimental type ClientNavigationReason extends string
+    enum
+      formSubmissionGet
+      formSubmissionPost
+      httpHeaderRefresh
+      scriptInitiated
+      metaTagRefresh
+      pageBlockInterstitial
+      reload
+
   # Deprecated, please use addScriptToEvaluateOnNewDocument instead.
   experimental deprecated command addScriptToEvaluateOnLoad
     parameters
@@ -5537,7 +5547,7 @@ domain Page
       optional Runtime.StackTrace stack
 
   # Fired when frame no longer has a scheduled navigation.
-  experimental event frameClearedScheduledNavigation
+  deprecated event frameClearedScheduledNavigation
     parameters
       # Id of the frame that has cleared its scheduled navigation.
       FrameId frameId
@@ -5556,8 +5566,19 @@ domain Page
 
   experimental event frameResized
 
+  # Fired when a renderer-initiated navigation is requested.
+  # Navigation may still be cancelled after the event is issued.
+  experimental event frameRequestedNavigation
+    parameters
+      # Id of the frame that has scheduled a navigation.
+      FrameId frameId
+      # The reason for the navigation.
+      ClientNavigationReason reason
+      # The destination URL for the requested navigation.
+      string url
+
   # Fired when frame schedules a potential navigation.
-  experimental event frameScheduledNavigation
+  deprecated event frameScheduledNavigation
     parameters
       # Id of the frame that has scheduled a navigation.
       FrameId frameId
```

## Roll protocol to r642320 — _2019-03-20T02:16:03.000Z_
######  Diff: [`5016689...19f4d92`](https://github.com/ChromeDevTools/devtools-protocol/compare/5016689...19f4d92)

```diff
@@ browser_protocol.pdl:5054 @@ domain Page
       # Default fixed font size.
       optional integer fixed
 
-  experimental type ClientNavigationReason extends string
-    enum
-      formSubmissionGet
-      formSubmissionPost
-      httpHeaderRefresh
-      scriptInitiated
-      metaTagRefresh
-      pageBlockInterstitial
-      reload
-
   # Deprecated, please use addScriptToEvaluateOnNewDocument instead.
   experimental deprecated command addScriptToEvaluateOnLoad
     parameters
@@ -5547,7 +5537,7 @@ domain Page
       optional Runtime.StackTrace stack
 
   # Fired when frame no longer has a scheduled navigation.
-  deprecated event frameClearedScheduledNavigation
+  experimental event frameClearedScheduledNavigation
     parameters
       # Id of the frame that has cleared its scheduled navigation.
       FrameId frameId
@@ -5566,19 +5556,8 @@ domain Page
 
   experimental event frameResized
 
-  # Fired when a renderer-initiated navigation is requested.
-  # Navigation may still be cancelled after the event is issued.
-  experimental event frameRequestedNavigation
-    parameters
-      # Id of the frame that has scheduled a navigation.
-      FrameId frameId
-      # The reason for the navigation.
-      ClientNavigationReason reason
-      # The destination URL for the requested navigation.
-      string url
-
   # Fired when frame schedules a potential navigation.
-  deprecated event frameScheduledNavigation
+  experimental event frameScheduledNavigation
     parameters
       # Id of the frame that has scheduled a navigation.
       FrameId frameId
```

## Roll protocol to r642280 — _2019-03-20T00:16:04.000Z_
######  Diff: [`48c725a...5016689`](https://github.com/ChromeDevTools/devtools-protocol/compare/48c725a...5016689)

```diff
@@ browser_protocol.pdl:5054 @@ domain Page
       # Default fixed font size.
       optional integer fixed
 
+  experimental type ClientNavigationReason extends string
+    enum
+      formSubmissionGet
+      formSubmissionPost
+      httpHeaderRefresh
+      scriptInitiated
+      metaTagRefresh
+      pageBlockInterstitial
+      reload
+
   # Deprecated, please use addScriptToEvaluateOnNewDocument instead.
   experimental deprecated command addScriptToEvaluateOnLoad
     parameters
@@ -5537,7 +5547,7 @@ domain Page
       optional Runtime.StackTrace stack
 
   # Fired when frame no longer has a scheduled navigation.
-  experimental event frameClearedScheduledNavigation
+  deprecated event frameClearedScheduledNavigation
     parameters
       # Id of the frame that has cleared its scheduled navigation.
       FrameId frameId
@@ -5556,8 +5566,19 @@ domain Page
 
   experimental event frameResized
 
+  # Fired when a renderer-initiated navigation is requested.
+  # Navigation may still be cancelled after the event is issued.
+  experimental event frameRequestedNavigation
+    parameters
+      # Id of the frame that has scheduled a navigation.
+      FrameId frameId
+      # The reason for the navigation.
+      ClientNavigationReason reason
+      # The destination URL for the requested navigation.
+      string url
+
   # Fired when frame schedules a potential navigation.
-  experimental event frameScheduledNavigation
+  deprecated event frameScheduledNavigation
     parameters
       # Id of the frame that has scheduled a navigation.
       FrameId frameId
```

## Roll protocol to r641443 — _2019-03-16T16:16:06.000Z_
######  Diff: [`dffb10a...48c725a`](https://github.com/ChromeDevTools/devtools-protocol/compare/dffb10a...48c725a)

```diff
@@ js_protocol.pdl:165 @@ domain Debugger
   # Enables debugger for the given page. Clients should not assume that the debugging has been
   # enabled until the result for this command is received.
   command enable
+    parameters
+      # The maximum size in bytes of collected scripts (not referenced by other heap objects)
+      # the debugger can hold. Puts no limit if paramter is omitted.
+      experimental optional number maxScriptsCacheSize
     returns
       # Unique identifier of the debugger.
       experimental Runtime.UniqueDebuggerId debuggerId
```

## Roll protocol to r641075 — _2019-03-15T04:15:57.000Z_
######  Diff: [`ddaf4ff...dffb10a`](https://github.com/ChromeDevTools/devtools-protocol/compare/ddaf4ff...dffb10a)

```diff
@@ browser_protocol.pdl:3029 @@ experimental domain IndexedDB
       array of DataEntry objectStoreDataEntries
       # If true, there are more entries to fetch in the given range.
       boolean hasMore
-
-  # Gets the auto increment number of an object store. Only meaningful
-  # when objectStore.autoIncrement is true.
-  command getKeyGeneratorCurrentNumber
+  
+  # Gets metadata of an object store
+  command getMetadata
     parameters
       # Security origin.
       string securityOrigin
@@ -3041,9 +3040,12 @@ experimental domain IndexedDB
       # Object store name.
       string objectStoreName
     returns
+      # the entries count
+      number entriesCount
       # the current value of key generator, to become the next inserted
-      # key into the object store.
-      number currentNumber
+      # key into the object store. Valid if objectStore.autoIncrement
+      # is true.
+      number keyGeneratorValue
 
   # Requests database with given name in given frame.
   command requestDatabase
```

## Roll protocol to r641004 — _2019-03-15T00:15:56.000Z_
######  Diff: [`f3edfef...ddaf4ff`](https://github.com/ChromeDevTools/devtools-protocol/compare/f3edfef...ddaf4ff)

```diff
@@ browser_protocol.pdl:4821 @@ experimental domain Overlay
       # Whether to paint size or not.
       boolean show
 
-  command setSuspended
-    parameters
-      # Whether overlay should be suspended and not consume any resources until resumed.
-      boolean suspended
-
   # Fired when the node should be inspected. This happens after call to `setInspectMode` or when
   # user manually inspects an element.
   event inspectNodeRequested
```

## Roll protocol to r639476 — _2019-03-11T14:16:12.000Z_
######  Diff: [`a7b00e7...2d8a43c`](https://github.com/ChromeDevTools/devtools-protocol/compare/a7b00e7...2d8a43c)

```diff
@@ browser_protocol.pdl:496 @@ experimental domain BackgroundService
       boolean shouldRecord
       ServiceName service
 
+  # Clears all stored data for the service.
+  command clearEvents
+    parameters
+      ServiceName service
+
   # Called when the recording state for the service has been updated.
   event recordingStateChanged
     parameters
```

## Roll protocol to r639462 — _2019-03-11T13:16:12.000Z_
######  Diff: [`fbad7ab...a7b00e7`](https://github.com/ChromeDevTools/devtools-protocol/compare/fbad7ab...a7b00e7)

```diff
@@ browser_protocol.pdl:480 @@ experimental domain BackgroundService
       backgroundFetch
       backgroundSync
 
-  command enable
+  # Enables event updates for the service.
+  command startObserving
     parameters
       ServiceName service
 
-  command disable
+  # Disables event updates for the service.
+  command stopObserving
     parameters
       ServiceName service
 
@@ -500,6 +502,35 @@ experimental domain BackgroundService
       boolean isRecording
       ServiceName service
 
+  # A key-value pair for additional event information to pass along.
+  type EventMetadata extends object
+    properties
+      string key
+      string value
+
+  type BackgroundServiceEvent extends object
+    properties
+      # Timestamp of the event (in seconds).
+      Network.TimeSinceEpoch timestamp
+      # The origin this event belongs to.
+      string origin
+      # The Service Worker ID that initiated the event.
+      ServiceWorker.RegistrationID serviceWorkerRegistrationId
+      # The Background Service this event belongs to.
+      ServiceName service
+      # A description of the event.
+      string eventName
+      # An identifier that groups related events together.
+      string instanceId
+      # A list of event-specific information.
+      array of EventMetadata eventMetadata
+
+  # Called with all existing backgroundServiceEvents when enabled, and all new
+  # events afterwards if enabled and recording.
+  event backgroundServiceEventReceived
+    parameters
+      BackgroundServiceEvent backgroundServiceEvent
+
 # The Browser domain defines methods and events for browser managing.
 domain Browser
 
@@ -5813,11 +5844,12 @@ domain Security
       optional string summary
 
 experimental domain ServiceWorker
+  type RegistrationID extends string
 
   # ServiceWorker registration.
   type ServiceWorkerRegistration extends object
     properties
-      string registrationId
+      RegistrationID registrationId
       string scopeURL
       boolean isDeleted
 
@@ -5841,7 +5873,7 @@ experimental domain ServiceWorker
   type ServiceWorkerVersion extends object
     properties
       string versionId
-      string registrationId
+      RegistrationID registrationId
       string scriptURL
       ServiceWorkerVersionRunningStatus runningStatus
       ServiceWorkerVersionStatus status
@@ -5857,7 +5889,7 @@ experimental domain ServiceWorker
   type ServiceWorkerErrorMessage extends object
     properties
       string errorMessage
-      string registrationId
+      RegistrationID registrationId
       string versionId
       string sourceURL
       integer lineNumber
@@ -5866,7 +5898,7 @@ experimental domain ServiceWorker
   command deliverPushMessage
     parameters
       string origin
-      string registrationId
+      RegistrationID registrationId
       string data
 
   command disable
@@ -5874,7 +5906,7 @@ experimental domain ServiceWorker
   command dispatchSyncEvent
     parameters
       string origin
-      string registrationId
+      RegistrationID registrationId
       string tag
       boolean lastChance
```

## Roll protocol to r639329 — _2019-03-09T07:15:55.000Z_
######  Diff: [`735cc58...fbad7ab`](https://github.com/ChromeDevTools/devtools-protocol/compare/735cc58...fbad7ab)

```diff
@@ js_protocol.pdl:1021 @@ domain Runtime
       # The value associated with the property.
       optional RemoteObject value
 
+  # Object private field descriptor.
+  experimental type PrivatePropertyDescriptor extends object
+    properties
+      # Private property name.
+      string name
+      # The value associated with the private property.
+      RemoteObject value
+
   # Represents function call argument. Either remote object id `objectId`, primitive `value`,
   # unserializable primitive value or neither of (for undefined) them should be specified.
   type CallArgument extends object
@@ -1262,6 +1270,8 @@ domain Runtime
       array of PropertyDescriptor result
       # Internal object properties (only of the element itself).
       optional array of InternalPropertyDescriptor internalProperties
+      # Object private properties.
+      experimental optional array of PrivatePropertyDescriptor privateProperties
       # Exception details.
       optional ExceptionDetails exceptionDetails
```

## Roll protocol to r637291 — _2019-03-04T15:16:13.000Z_
######  Diff: [`d305be1...6f27b14`](https://github.com/ChromeDevTools/devtools-protocol/compare/d305be1...6f27b14)

```diff
@@ browser_protocol.pdl:470 @@ experimental domain Audits
       # Size after re-encoding.
       integer encodedSize
 
+# Defines events for background web platform features.
+experimental domain BackgroundService
+  # The Background Service that will be associated with the commands/events.
+  # Every Background Service operates independently, but they share the same
+  # API.
+  type ServiceName extends string
+    enum
+      backgroundFetch
+      backgroundSync
+
+  command enable
+    parameters
+      ServiceName service
+
+  command disable
+    parameters
+      ServiceName service
+
+  # Set the recording state for the service.
+  command setRecording
+    parameters
+      boolean shouldRecord
+      ServiceName service
+
+  # Called when the recording state for the service has been updated.
+  event recordingStateChanged
+    parameters
+      boolean isRecording
+      ServiceName service
+
 # The Browser domain defines methods and events for browser managing.
 domain Browser
```

## Roll protocol to r632815 — _2019-02-15T23:15:52.000Z_
######  Diff: [`3423c2d...d0cca39`](https://github.com/ChromeDevTools/devtools-protocol/compare/3423c2d...d0cca39)

```diff
@@ browser_protocol.pdl:2964 @@ experimental domain IndexedDB
       # If true, there are more entries to fetch in the given range.
       boolean hasMore
 
+  # Gets the auto increment number of an object store. Only meaningful
+  # when objectStore.autoIncrement is true.
+  command getKeyGeneratorCurrentNumber
+    parameters
+      # Security origin.
+      string securityOrigin
+      # Database name.
+      string databaseName
+      # Object store name.
+      string objectStoreName
+    returns
+      # the current value of key generator, to become the next inserted
+      # key into the object store.
+      number currentNumber
+
   # Requests database with given name in given frame.
   command requestDatabase
     parameters
```

## Roll protocol to r630203 — _2019-02-08T05:15:49.000Z_
######  Diff: [`f02e8a5...1506d25`](https://github.com/ChromeDevTools/devtools-protocol/compare/f02e8a5...1506d25)

```diff
@@ browser_protocol.pdl:538 @@ domain Browser
   # Crashes browser on the main thread.
   experimental command crash
 
+  # Crashes GPU process.
+  experimental command crashGpuProcess
+
   # Returns version information.
   command getVersion
     returns
```

## Roll protocol to r630011 — _2019-02-07T18:16:02.000Z_
######  Diff: [`2a326d4...45f4bf9`](https://github.com/ChromeDevTools/devtools-protocol/compare/2a326d4...45f4bf9)

```diff
@@ browser_protocol.pdl:1243 @@ experimental domain CacheStorage
       CacheId cacheId
       # URL spec of the request.
       string requestURL
+      # headers of the request.
+      array of Header requestHeaders
     returns
       # Response read from the cache.
       CachedResponse response
```

## Roll protocol to r628773 — _2019-02-04T17:15:59.000Z_
######  Diff: [`0af8698...e134876`](https://github.com/ChromeDevTools/devtools-protocol/compare/0af8698...e134876)

```diff
@@ browser_protocol.pdl:2705 @@ domain Emulation
       # Frame height (DIP).
       integer height
 
-  # Notification sent after the virtual time has advanced.
-  experimental event virtualTimeAdvanced
-    parameters
-      # The amount of virtual time that has elapsed in milliseconds since virtual time was first
-      # enabled.
-      number virtualTimeElapsed
-
   # Notification sent after the virtual time budget for the current VirtualTimePolicy has run out.
   experimental event virtualTimeBudgetExpired
 
-  # Notification sent after the virtual time has paused.
-  experimental event virtualTimePaused
-    parameters
-      # The amount of virtual time that has elapsed in milliseconds since virtual time was first
-      # enabled.
-      number virtualTimeElapsed
-
   # Allows overriding user agent with the given string.
   command setUserAgentOverride
     parameters
```

## Roll protocol to r626433 — _2019-01-28T03:15:50.000Z_
######  Diff: [`d4274dd...0951f55`](https://github.com/ChromeDevTools/devtools-protocol/compare/d4274dd...0951f55)

```diff
@@ browser_protocol.pdl:3522 @@ experimental domain Memory
 
   command prepareForLeakDetection
 
+  # Simulate OomIntervention by purging V8 memory.
+  command forciblyPurgeJavaScriptMemory
+
   # Enable/disable suppressing memory pressure notifications in all processes.
   command setPressureNotificationsSuppressed
     parameters
```

## Roll protocol to r626200 — _2019-01-25T21:16:05.000Z_
######  Diff: [`039679f...d4274dd`](https://github.com/ChromeDevTools/devtools-protocol/compare/039679f...d4274dd)

```diff
@@ browser_protocol.pdl:1621 @@ domain DOM
     returns
       # Resulting node.
       BackendNodeId backendNodeId
-      # Id of the node at given coordinates, only when enabled.
+      # Id of the node at given coordinates, only when enabled and requested document.
       optional NodeId nodeId
 
   # Returns node's HTML markup.
@@ -1891,7 +1891,7 @@ domain DOM
     returns
       # Resulting node.
       BackendNodeId backendNodeId
-      # Id of the node at given coordinates, only when enabled.
+      # Id of the node at given coordinates, only when enabled and requested document.
       optional NodeId nodeId
 
   # Fired when `Element`'s attribute is modified.
```

## Roll protocol to r625481 — _2019-01-24T02:15:49.000Z_
######  Diff: [`130d0d8...039679f`](https://github.com/ChromeDevTools/devtools-protocol/compare/130d0d8...039679f)

```diff
@@ browser_protocol.pdl:4053 @@ domain Network
     properties
       # Signed exchange request URL.
       string requestUrl
-      # Signed exchange request method.
-      string requestMethod
       # Signed exchange response code.
       integer responseCode
       # Signed exchange response headers.
```

## Roll protocol to r624433 — _2019-01-19T03:15:57.000Z_
######  Diff: [`fdd58cb...130d0d8`](https://github.com/ChromeDevTools/devtools-protocol/compare/fdd58cb...130d0d8)

```diff
@@ browser_protocol.pdl:4612 @@ experimental domain Overlay
       optional DOM.RGBA shapeColor
       # The shape margin fill color (default: transparent).
       optional DOM.RGBA shapeMarginColor
-      # Selectors to highlight relevant nodes.
-      optional string selectorList
       # The grid layout color (default: transparent).
       optional DOM.RGBA cssGridColor
 
@@ -4664,6 +4662,8 @@ experimental domain Overlay
       optional DOM.BackendNodeId backendNodeId
       # JavaScript object id of the node to be highlighted.
       optional Runtime.RemoteObjectId objectId
+      # Selectors to highlight relevant nodes.
+      optional string selector
 
   # Highlights given quad. Coordinates are absolute with respect to the main frame viewport.
   command highlightQuad
```

## Roll protocol to r624373 — _2019-01-19T00:15:53.000Z_
######  Diff: [`023e7bc...fdd58cb`](https://github.com/ChromeDevTools/devtools-protocol/compare/023e7bc...fdd58cb)

```diff
@@ browser_protocol.pdl:4621 @@ experimental domain Overlay
     enum
       searchForNode
       searchForUAShadowDOM
+      captureAreaScreenshot
       none
 
   # Disables domain notifications.
@@ -4770,6 +4771,9 @@ experimental domain Overlay
       # Viewport to capture, in device independent pixels (dip).
       Page.Viewport viewport
 
+  # Fired when user cancels the inspect mode.
+  event inspectModeCanceled
+
 # Actions and events related to the inspected page belong to the page domain.
 domain Page
   depends on Debugger
```

## Roll protocol to r624315 — _2019-01-18T22:19:35.000Z_
######  Diff: [`99ce0ca...974d209`](https://github.com/ChromeDevTools/devtools-protocol/compare/99ce0ca...974d209)

```diff
@@ browser_protocol.pdl:515 @@ domain Browser
       protectedMediaIdentifier
       sensors
       videoCapture
+      idleDetection
 
   # Grant specific permissions to the given origin and reject all others.
   experimental command grantPermissions
```

## Roll protocol to r624253 — _2019-01-18T20:15:51.000Z_
######  Diff: [`c5eefe1...99ce0ca`](https://github.com/ChromeDevTools/devtools-protocol/compare/c5eefe1...99ce0ca)

```diff
@@ browser_protocol.pdl:1797 @@ domain DOM
       optional DOM.BackendNodeId backendNodeId
       # Symbolic group name that can be used to release multiple objects.
       optional string objectGroup
+      # Execution context in which to resolve the node.
+      optional Runtime.ExecutionContextId executionContextId
     returns
       # JavaScript object wrapper for given node.
       Runtime.RemoteObject object
```

## Roll protocol to r624227 — _2019-01-18T19:15:48.000Z_
######  Diff: [`c5978d7...c5eefe1`](https://github.com/ChromeDevTools/devtools-protocol/compare/c5978d7...c5eefe1)

```diff
@@ browser_protocol.pdl:4697 @@ experimental domain Overlay
       # == false`.
       optional HighlightConfig highlightConfig
 
+  # Highlights owner element of all frames detected to be ads.
+  command setShowAdHighlights
+    parameters
+      # True for showing ad highlights
+      boolean show
+
   command setPausedInDebuggerMessage
     parameters
       # The message to display, also triggers resume and step over controls.
```

## Roll protocol to r623118 — _2019-01-16T05:15:54.000Z_
######  Diff: [`912ecd4...c5978d7`](https://github.com/ChromeDevTools/devtools-protocol/compare/912ecd4...c5978d7)

```diff
@@ browser_protocol.pdl:4758 @@ experimental domain Overlay
   # Fired when user asks to capture screenshot of some area on the page.
   event screenshotRequested
     parameters
-      # Viewport to capture, in CSS.
+      # Viewport to capture, in device independent pixels (dip).
       Page.Viewport viewport
 
 # Actions and events related to the inspected page belong to the page domain.
@@ -4928,17 +4928,19 @@ domain Page
       number clientHeight
       # Scale relative to the ideal viewport (size at width=device-width).
       number scale
+      # Page zoom factor (CSS to device independent pixels ratio).
+      optional number zoom
 
   # Viewport for capturing screenshot.
   type Viewport extends object
     properties
-      # X offset in CSS pixels.
+      # X offset in device independent pixels (dip).
       number x
-      # Y offset in CSS pixels
+      # Y offset in device independent pixels (dip).
       number y
-      # Rectangle width in CSS pixels
+      # Rectangle width in device independent pixels (dip).
       number width
-      # Rectangle height in CSS pixels
+      # Rectangle height in device independent pixels (dip).
       number height
       # Page scale factor.
       number scale
```

## Roll protocol to r622567 — _2019-01-14T20:15:49.000Z_
######  Diff: [`53050a0...44c8bde`](https://github.com/ChromeDevTools/devtools-protocol/compare/53050a0...44c8bde)

```diff
@@ browser_protocol.pdl:997 @@ experimental domain CSS
       # The computed font weight for this node, as a CSS computed value string (e.g. 'normal' or
       # '100').
       optional string computedFontWeight
-      # The computed font size for the document body, as a computed CSS value string (e.g. '16px').
-      optional string computedBodyFontSize
 
   # Returns the computed style for a DOM node identified by `nodeId`.
   command getComputedStyleForNode
```

## Roll protocol to r621639 — _2019-01-10T18:16:08.000Z_
######  Diff: [`d7e10c3...53050a0`](https://github.com/ChromeDevTools/devtools-protocol/compare/d7e10c3...53050a0)

```diff
@@ browser_protocol.pdl:2833 @@ experimental domain IndexedDB
     properties
       # Database name.
       string name
-      # Database version.
-      integer version
+      # Database version (type is not 'integer', as the standard
+      # requires the version number to be 'unsigned long long')
+      number version
       # Object stores in this database.
       array of ObjectStore objectStores
```

## Roll protocol to r621424 — _2019-01-10T02:15:57.000Z_
######  Diff: [`ea1122f...d7e10c3`](https://github.com/ChromeDevTools/devtools-protocol/compare/ea1122f...d7e10c3)

```diff
@@ browser_protocol.pdl:4590 @@ experimental domain Overlay
     properties
       # Whether the node info tooltip should be shown (default: false).
       optional boolean showInfo
+      # Whether the node styles in the tooltip (default: false).
+      optional boolean showStyles
       # Whether the rulers should be shown (default: false).
       optional boolean showRulers
       # Whether the extension lines from node to the rulers should be shown (default: false).
       optional boolean showExtensionLines
-      optional boolean displayAsMaterial
       # The content box highlight fill color (default: transparent).
       optional DOM.RGBA contentColor
       # The padding highlight fill color (default: transparent).
```

## Roll protocol to r621026 — _2019-01-09T03:15:50.000Z_
######  Diff: [`727df12...ea1122f`](https://github.com/ChromeDevTools/devtools-protocol/compare/727df12...ea1122f)

```diff
@@ browser_protocol.pdl:107 @@ experimental domain Accessibility
       # The sources which contributed to the computation of this property.
       optional array of AXValueSource sources
 
-  # Values of AXProperty name: 
+  # Values of AXProperty name:
   # - from 'busy' to 'roledescription': states which apply to every AX node
   # - from 'live' to 'root': attributes which apply to nodes in live regions
   # - from 'autocomplete' to 'valuetext': attributes which apply to widgets
@@ -1265,6 +1265,51 @@ experimental domain CacheStorage
       # If true, there are more entries to fetch in the given range.
       boolean hasMore
 
+# A domain for interacting with Cast, Presentation API, and Remote Playback API
+# functionalities.
+experimental domain Cast
+
+  # Starts observing for sinks that can be used for tab mirroring, and if set,
+  # sinks compatible with |presentationUrl| as well. When sinks are found, a
+  # |sinksUpdated| event is fired.
+  # Also starts observing for issue messages. When an issue is added or removed,
+  # an |issueUpdated| event is fired.
+  command enable
+    parameters
+      optional string presentationUrl
+
+  # Stops observing for sinks and issues.
+  command disable
+
+  # Sets a sink to be used when the web page requests the browser to choose a
+  # sink via Presentation API, Remote Playback API, or Cast SDK.
+  command setSinkToUse
+    parameters
+      string sinkName
+
+  # Starts mirroring the tab to the sink.
+  command startTabMirroring
+    parameters
+      string sinkName
+
+  # Stops the active Cast session on the sink.
+  command stopCasting
+    parameters
+      string sinkName
+
+  # This is fired whenever the list of available sinks changes. A sink is a
+  # device or a software surface that you can cast to.
+  event sinksUpdated
+    parameters
+      array of string sinkNames
+
+  # This is fired whenever the outstanding issue/error message changes.
+  # |issueMessage| is empty if there is no issue.
+  event issueUpdated
+    parameters
+      string issueMessage
+
+
 # This domain exposes DOM read/write operations. Each DOM Node is represented with its mirror object
 # that has an `id`. This `id` can be used to get additional information on the Node, resolve it into
 # the JavaScript object wrapper, etc. It is important that client receives DOM events only for the
@@ -5184,8 +5229,6 @@ domain Page
     parameters
       ScriptIdentifier identifier
 
-  experimental command requestAppBanner
-
   # Acknowledges that a screencast frame has been received by the frontend.
   experimental command screencastFrameAck
     parameters
```

## Roll protocol to r619731 — _2019-01-03T20:15:54.000Z_
######  Diff: [`9ef310e...727df12`](https://github.com/ChromeDevTools/devtools-protocol/compare/9ef310e...727df12)

```diff
@@ browser_protocol.pdl:2 @@ @@ -2,7 +2,7 @@
 # Use of this source code is governed by a BSD-style license that can be
 # found in the LICENSE file.
 #
-# Contribuging to Chrome DevTools Protocol: https://docs.google.com/document/d/1c-COD2kaK__5iMM5SEx-PzNA7HFmgttcYfOHHX0HaOM/edit?usp=sharing
+# Contributing to Chrome DevTools Protocol: https://docs.google.com/document/d/1c-COD2kaK__5iMM5SEx-PzNA7HFmgttcYfOHHX0HaOM/edit?usp=sharing
 
 version
   major 1
@@ -107,11 +107,12 @@ experimental domain Accessibility
       # The sources which contributed to the computation of this property.
       optional array of AXValueSource sources
 
-  # Values of AXProperty name: from 'busy' to 'roledescription' - states which apply to every AX
-  # node, from 'live' to 'root' - attributes which apply to nodes in live regions, from
-  # 'autocomplete' to 'valuetext' - attributes which apply to widgets, from 'checked' to 'selected'
-  # - states which apply to widgets, from 'activedescendant' to 'owns' - relationships between
-  # elements other than parent/child/sibling.
+  # Values of AXProperty name: 
+  # - from 'busy' to 'roledescription': states which apply to every AX node
+  # - from 'live' to 'root': attributes which apply to nodes in live regions
+  # - from 'autocomplete' to 'valuetext': attributes which apply to widgets
+  # - from 'checked' to 'selected': states which apply to widgets
+  # - from 'activedescendant' to 'owns' - relationships between elements other than parent/child/sibling.
   type AXPropertyName extends string
     enum
       busy
@@ -5856,7 +5857,7 @@ experimental domain Storage
     parameters
       # Security origin.
       string origin
-      # Comma separated origin names.
+      # Comma separated list of StorageType to clear.
       string storageTypes
 
   # Returns usage and quota in bytes.
```

## Roll protocol to r619477 — _2019-01-02T20:16:22.000Z_
######  Diff: [`a254142...9ef310e`](https://github.com/ChromeDevTools/devtools-protocol/compare/a254142...9ef310e)

```diff
@@ browser_protocol.pdl:3058 @@ domain Input
       optional number deltaX
       # Y delta in CSS pixels for mouse wheel event (default: 0).
       optional number deltaY
+      # Pointer type (default: "mouse").
+      optional enum pointerType
+        mouse
+        pen
 
   # Dispatches a touch event to the page.
   command dispatchTouchEvent
```

## Roll protocol to r616947 — _2018-12-15T04:15:49.000Z_
######  Diff: [`cae0bbe...d229bf4`](https://github.com/ChromeDevTools/devtools-protocol/compare/cae0bbe...d229bf4)

```diff
@@ browser_protocol.pdl:1791 @@ domain DOM
       # JavaScript object id of the node wrapper.
       optional Runtime.RemoteObjectId objectId
 
+  # Returns file information for the given
+  # File wrapper.
+  experimental command getFileInfo
+    parameters
+      # JavaScript object id of the node wrapper.
+      Runtime.RemoteObjectId objectId
+    returns
+      string path
+
   # Enables console to refer to the node with given id via $x (see Command Line API for more details
   # $x functions).
   experimental command setInspectedNode
```

## Roll protocol to r616936 — _2018-12-15T03:15:51.000Z_
######  Diff: [`0fb03aa...cae0bbe`](https://github.com/ChromeDevTools/devtools-protocol/compare/0fb03aa...cae0bbe)

```diff
@@ browser_protocol.pdl:5047 @@ domain Page
       # Array of navigation history entries.
       array of NavigationEntry entries
 
+  # Resets navigation history for the current page.
+  command resetNavigationHistory
+
   # Returns content of the given resource.
   experimental command getResourceContent
     parameters
```

## Roll protocol to r616803 — _2018-12-14T20:15:57.000Z_
######  Diff: [`41590b0...0fb03aa`](https://github.com/ChromeDevTools/devtools-protocol/compare/41590b0...0fb03aa)

```diff
@@ browser_protocol.pdl:3833 @@ domain Network
       # WebSocket message mask.
       boolean mask
       # WebSocket message payload data.
+      # If the opcode is 1, this is a text message and payloadData is a UTF-8 string.
+      # If the opcode isn't 1, then payloadData is a base64 encoded string representing binary data.
       string payloadData
 
   # Information about the cached resource.
```

## Roll protocol to r616542 — _2018-12-14T01:16:20.000Z_
######  Diff: [`7fa0f03...14070df`](https://github.com/ChromeDevTools/devtools-protocol/compare/7fa0f03...14070df)

```diff
@@ browser_protocol.pdl:5372 @@ domain Page
       # Specifies the endpoint group to deliver the report to.
       optional string group
 
+  # Pauses page execution. Can be resumed using generic Runtime.runIfWaitingForDebugger.
+  experimental command waitForDebugger
+
   event domContentEventFired
     parameters
       Network.MonotonicTime timestamp
```

## Roll protocol to r616451 — _2018-12-13T22:15:51.000Z_
######  Diff: [`4e2e581...7fa0f03`](https://github.com/ChromeDevTools/devtools-protocol/compare/4e2e581...7fa0f03)

```diff
@@ browser_protocol.pdl:3038 @@ domain Input
         left
         middle
         right
+        back
+        forward
+      # A number indicating which buttons are pressed on the mouse when a mouse event is triggered.
+      # Left=1, Right=2, Middle=4, Back=8, Forward=16, None=0.
+      optional integer buttons
       # Number of times the mouse button was clicked (default: 0).
       optional integer clickCount
       # X delta in CSS pixels for mouse wheel event (default: 0).
```

## Roll protocol to r613210 — _2018-12-03T20:15:55.000Z_
######  Diff: [`65909c1...2135225`](https://github.com/ChromeDevTools/devtools-protocol/compare/65909c1...2135225)

```diff
@@ browser_protocol.pdl:1239 @@ experimental domain CacheStorage
   # Fetches cache entry.
   command requestCachedResponse
     parameters
-      # Id of cache that contains the enty.
+      # Id of cache that contains the entry.
       CacheId cacheId
       # URL spec of the request.
       string requestURL
@@ -1256,6 +1256,8 @@ experimental domain CacheStorage
       integer skipCount
       # Number of records to fetch.
       integer pageSize
+      # If present, only return the entries containing this substring in the path
+      optional string pathFilter
     returns
       # Array of object store data entries.
       array of DataEntry cacheDataEntries
```

## Roll protocol to r613054 — _2018-12-03T12:15:51.000Z_
######  Diff: [`d0e8e30...65909c1`](https://github.com/ChromeDevTools/devtools-protocol/compare/d0e8e30...65909c1)

```diff
@@ js_protocol.pdl:259 @@ domain Debugger
   # Resumes JavaScript execution.
   command resume
 
-  # This method is deprecated - use Debugger.stepInto with breakOnAsyncCall and
-  # Debugger.pauseOnAsyncTask instead. Steps into next scheduled async task if any is scheduled
-  # before next pause. Returns success when async task is actually scheduled, returns error if no
-  # task were scheduled or another scheduleStepIntoAsync was called.
-  experimental command scheduleStepIntoAsync
-
   # Searches for given string in script content.
   command searchInContent
     parameters
```

## Roll protocol to r612784 608637 — _2018-11-30T21:15:53.000Z_
######  Diff: [`cffb4e1...6fd74c5`](https://github.com/ChromeDevTools/devtools-protocol/compare/cffb4e1...6fd74c5)

```diff
@@ browser_protocol.pdl:3818 @@ domain Network
       # HTTP request headers text.
       optional string requestHeadersText
 
-  # WebSocket frame data.
+  # WebSocket message data. This represents an entire WebSocket message, not just a fragmented frame as the name suggests.
   type WebSocketFrame extends object
     properties
-      # WebSocket frame opcode.
+      # WebSocket message opcode.
       number opcode
-      # WebSocke frame mask.
+      # WebSocket message mask.
       boolean mask
-      # WebSocke frame payload data.
+      # WebSocket message payload data.
       string payloadData
 
   # Information about the cached resource.
@@ -4459,17 +4459,17 @@ domain Network
       # Request initiator.
       optional Initiator initiator
 
-  # Fired when WebSocket frame error occurs.
+  # Fired when WebSocket message error occurs.
   event webSocketFrameError
     parameters
       # Request identifier.
       RequestId requestId
       # Timestamp.
       MonotonicTime timestamp
-      # WebSocket frame error message.
+      # WebSocket error message.
       string errorMessage
 
-  # Fired when WebSocket frame is received.
+  # Fired when WebSocket message is received.
   event webSocketFrameReceived
     parameters
       # Request identifier.
@@ -4479,7 +4479,7 @@ domain Network
       # WebSocket response data.
       WebSocketFrame response
 
-  # Fired when WebSocket frame is sent.
+  # Fired when WebSocket message is sent.
   event webSocketFrameSent
     parameters
       # Request identifier.
```

## Roll protocol to r610712 — _2018-11-24T22:15:45.000Z_
######  Diff: [`34cbbf0...0df7169`](https://github.com/ChromeDevTools/devtools-protocol/compare/34cbbf0...0df7169)

```diff
@@ browser_protocol.pdl:4158 @@ domain Network
       # Identifier of the network request to get content for.
       RequestId requestId
     returns
-      # Base64-encoded request body.
+      # Request body string, omitting files from multipart requests
       string postData
 
   # Returns content served for the given currently intercepted request.
```

## Roll protocol to r608591 — _2018-11-16T00:15:59.000Z_
######  Diff: [`7d7cac5...0e63cc2`](https://github.com/ChromeDevTools/devtools-protocol/compare/7d7cac5...0e63cc2)

```diff
@@ browser_protocol.pdl:635 @@ domain Browser
       # with 'left', 'top', 'width' or 'height'. Leaves unspecified fields unchanged.
       Bounds bounds
 
+  # Set dock tile details, platform-specific.
+  experimental command setDockTile
+    parameters
+      optional string badgeLabel
+      # Png encoded image.
+      optional binary image
+
 # This domain exposes CSS read/write operations. All CSS objects (stylesheets, rules, and styles)
 # have an associated `id` used in subsequent operations on the related object. Each object type has
 # a specific `id` structure, and those are not interchangeable between objects of different kinds.
```

## Roll protocol to r607825 — _2018-11-14T00:15:58.000Z_
######  Diff: [`be3e054...7d7cac5`](https://github.com/ChromeDevTools/devtools-protocol/compare/be3e054...7d7cac5)

```diff
@@ browser_protocol.pdl:617 @@ domain Browser
   # Get the browser window that contains the devtools target.
   experimental command getWindowForTarget
     parameters
-      # Devtools agent host id.
-      Target.TargetID targetId
+      # Devtools agent host id. If called as a part of the session, associated targetId is used.
+      optional Target.TargetID targetId
     returns
       # Browser window id.
       WindowID windowId
```

## Roll protocol to r607463 — _2018-11-13T03:15:59.000Z_
######  Diff: [`2a3f184...87a8e2e`](https://github.com/ChromeDevTools/devtools-protocol/compare/2a3f184...87a8e2e)

```diff
@@ browser_protocol.pdl:4651 @@ experimental domain Overlay
       # True for showing scroll bottleneck rects
       boolean show
 
+  # Requests that backend shows hit-test borders on layers
+  command setShowHitTestBorders
+    parameters
+      # True for showing hit-test borders
+      boolean show
+
   # Paints viewport size upon main frame resize.
   command setShowViewportSizeOnResize
     parameters
```

## Roll protocol to r606267 — _2018-11-08T01:15:52.000Z_
######  Diff: [`617d045...6503624`](https://github.com/ChromeDevTools/devtools-protocol/compare/617d045...6503624)

```diff
@@ browser_protocol.pdl:4928 @@ domain Page
       # Base64-encoded image data.
       binary data
 
+  # Returns a snapshot of the page as a string. For MHTML format, the serialization includes
+  # iframes, shadow DOM, external resources, and element-inline styles.
+  experimental command captureSnapshot
+    parameters
+      # Format (defaults to mhtml).
+      optional enum format
+        mhtml
+    returns
+      # Serialized page data.
+      string data
+
   # Clears the overriden device metrics.
   experimental deprecated command clearDeviceMetricsOverride
     # Use 'Emulation.clearDeviceMetricsOverride' instead
```

## Roll protocol to r604763 — _2018-11-02T00:15:48.000Z_
######  Diff: [`717008e...2beb582`](https://github.com/ChromeDevTools/devtools-protocol/compare/717008e...2beb582)

```diff
@@ browser_protocol.pdl:5901 @@ experimental domain SystemInfo
       # An optional array of GPU driver bug workarounds.
       array of string driverBugWorkarounds
 
-  # Specifies process type.
-  type ProcessType extends string
-    enum
-      browser
-      renderer
-
   # Represents process info.
   type ProcessInfo extends object
     properties
       # Specifies process type.
-      ProcessType type
+      string type
       # Specifies process id.
       integer id
       # Specifies cumulative CPU usage in seconds across all threads of the
```

## Roll protocol to r604639 — _2018-11-01T18:15:50.000Z_
######  Diff: [`fe05597...717008e`](https://github.com/ChromeDevTools/devtools-protocol/compare/fe05597...717008e)

```diff
@@ js_protocol.pdl:887 @@ domain Runtime
         proxy
         promise
         typedarray
+        arraybuffer
+        dataview
       # Object class (constructor) name. Specified for `object` type values only.
       optional string className
       # Remote object value in case of primitive values or JSON values (if it was requested).
```

## Roll protocol to r604358 — _2018-10-31T19:15:51.000Z_
######  Diff: [`9801545...fe05597`](https://github.com/ChromeDevTools/devtools-protocol/compare/9801545...fe05597)

```diff
@@ browser_protocol.pdl:6292 @@ experimental domain Testing
       string message
       # Specifies the endpoint group to deliver the report to.
       optional string group
+
+# A domain for letting clients substitute browser's network layer with client code.
+experimental domain Fetch
+  depends on Network
+  depends on IO
+  depends on Page
+
+  # Unique request identifier.
+  type RequestId extends string
+
+  # Stages of the request to handle. Request will intercept before the request is
+  # sent. Response will intercept after the response is received (but before response
+  # body is received.
+  experimental type RequestStage extends string
+    enum
+      Request
+      Response
+
+  experimental type RequestPattern extends object
+    properties
+      # Wildcards ('*' -> zero or more, '?' -> exactly one) are allowed. Escape character is
+      # backslash. Omitting is equivalent to "*".
+      optional string urlPattern
+      # If set, only requests for matching resource types will be intercepted.
+      optional Network.ResourceType resourceType
+      # Stage at wich to begin intercepting requests. Default is Request.
+      optional RequestStage requestStage
+
+  # Response HTTP header entry
+  type HeaderEntry extends object
+    properties
+      string name
+      string value
+
+  # Authorization challenge for HTTP status code 401 or 407.
+  experimental type AuthChallenge extends object
+    properties
+      # Source of the authentication challenge.
+      optional enum source
+        Server
+        Proxy
+      # Origin of the challenger.
+      string origin
+      # The authentication scheme used, such as basic or digest
+      string scheme
+      # The realm of the challenge. May be empty.
+      string realm
+
+  # Response to an AuthChallenge.
+  experimental type AuthChallengeResponse extends object
+    properties
+      # The decision on what to do in response to the authorization challenge.  Default means
+      # deferring to the default behavior of the net stack, which will likely either the Cancel
+      # authentication or display a popup dialog box.
+      enum response
+        Default
+        CancelAuth
+        ProvideCredentials
+      # The username to provide, possibly empty. Should only be set if response is
+      # ProvideCredentials.
+      optional string username
+      # The password to provide, possibly empty. Should only be set if response is
+      # ProvideCredentials.
+      optional string password
+
+  # Disables the fetch domain.
+  command disable
+
+  # Enables issuing of requestPaused events. A request will be paused until client
+  # calls one of failRequest, fulfillRequest or continueRequest/continueWithAuth.
+  command enable
+    parameters
+      # If specified, only requests matching any of these patterns will produce
+      # fetchRequested event and will be paused until clients response. If not set,
+      # all requests will be affected.
+      optional array of RequestPattern patterns
+      # If true, authRequired events will be issued and requests will be paused
+      # expecting a call to continueWithAuth.
+      optional boolean handleAuthRequests
+
+  # Causes the request to fail with specified reason.
+  command failRequest
+    parameters
+      # An id the client received in requestPaused event.
+      RequestId requestId
+      # Causes the request to fail with the given reason.
+      Network.ErrorReason errorReason
+
+  # Provides response to the request.
+  command fulfillRequest
+    parameters
+      # An id the client received in requestPaused event.
+      RequestId requestId
+      # An HTTP response code.
+      integer responseCode
+      # Response headers.
+      array of HeaderEntry responseHeaders
+      # A response body.
+      optional binary body
+      # A textual representation of responseCode.
+      # If absent, a standard phrase mathcing responseCode is used.
+      optional string responsePhrase
+
+  # Continues the request, optionally modifying some of its parameters.
+  command continueRequest
+    parameters
+      # An id the client received in requestPaused event.
+      RequestId requestId
+      # If set, the request url will be modified in a way that's not observable by page.
+      optional string url
+      # If set, the request method is overridden.
+      optional string method
+      # If set, overrides the post data in the request.
+      optional string postData
+      # If set, overrides the request headrts.
+      optional array of HeaderEntry headers
+
+  # Continues a request supplying authChallengeResponse following authRequired event.
+  command continueWithAuth
+    parameters
+      # An id the client received in authRequired event.
+      RequestId requestId
+      # Response to  with an authChallenge.
+      AuthChallengeResponse authChallengeResponse
+
+  # Causes the body of the response to be received from the server and
+  # returned as a single string. May only be issued for a request that
+  # is paused in the Response stage and is mutually exclusive with
+  # takeResponseBodyForInterceptionAsStream. Calling other methods that
+  # affect the request or disabling fetch domain before body is received
+  # results in an undefined behavior.
+  command getResponseBody
+    parameters
+      # Identifier for the intercepted request to get body for.
+      RequestId requestId
+    returns
+      # Response body.
+      string body
+      # True, if content was sent as base64.
+      boolean base64Encoded
+
+  # Returns a handle to the stream representing the response body.
+  # The request must be paused in the HeadersReceived stage.
+  # Note that after this command the request can't be continued
+  # as is -- client either needs to cancel it or to provide the
+  # response body.
+  # The stream only supports sequential read, IO.read will fail if the position
+  # is specified.
+  # This method is mutually exclusive with getResponseBody.
+  # Calling other methods that affect the request or disabling fetch
+  # domain before body is received results in an undefined behavior.
+  command takeResponseBodyAsStream
+    parameters
+      RequestId requestId
+    returns
+      IO.StreamHandle stream
+
+  # Issued when the domain is enabled and the request URL matches the
+  # specified filter. The request is paused until the client responds
+  # with one of continueRequest, failRequest or fulfillRequest.
+  # The stage of the request can be determined by presence of responseErrorReason
+  # and responseStatusCode -- the request is at the response stage if either
+  # of these fields is present and in the request stage otherwise.
+  event requestPaused
+    parameters
+      # Each request the page makes will have a unique id.
+      RequestId requestId
+      # The details of the request.
+      Network.Request request
+      # The id of the frame that initiated the request.
+      Page.FrameId frameId
+      # How the requested resource will be used.
+      Network.ResourceType resourceType
+      # Response error if intercepted at response stage.
+      optional Network.ErrorReason responseErrorReason
+      # Response code if intercepted at response stage.
+      optional integer responseStatusCode
+      # Response headers if intercepted at the response stage.
+      optional array of HeaderEntry responseHeaders
+
+  # Issued when the domain is enabled with handleAuthRequests set to true.
+  # The request is paused until client responds with continueWithAuth.
+  event authRequired
+    parameters
+      # Each request the page makes will have a unique id.
+      RequestId requestId
+      # The details of the request.
+      Network.Request request
+      # The id of the frame that initiated the request.
+      Page.FrameId frameId
+      # How the requested resource will be used.
+      Network.ResourceType resourceType
+      # Details of the Authorization Challenge encountered.
+      # If this is set, client should respond with continueRequest that
+      # contains AuthChallengeResponse.
+      AuthChallenge authChallenge
```

## Roll protocol to r604014 — _2018-10-30T21:15:48.000Z_
######  Diff: [`0170df0...9801545`](https://github.com/ChromeDevTools/devtools-protocol/compare/0170df0...9801545)

```diff
@@ browser_protocol.pdl:5901 @@ experimental domain SystemInfo
       # An optional array of GPU driver bug workarounds.
       array of string driverBugWorkarounds
 
+  # Specifies process type.
+  type ProcessType extends string
+    enum
+      browser
+      renderer
+
+  # Represents process info.
+  type ProcessInfo extends object
+    properties
+      # Specifies process type.
+      ProcessType type
+      # Specifies process id.
+      integer id
+      # Specifies cumulative CPU usage in seconds across all threads of the
+      # process since the process start.
+      number cpuTime
+
   # Returns information about the system.
   command getInfo
     returns
@@ -5916,6 +5933,12 @@ experimental domain SystemInfo
       # supported.
       string commandLine
 
+  # Returns information about all running processes.
+  command getProcessInfo
+    returns
+      # An array of process info blocks.
+      array of ProcessInfo processInfo
+
 # Supports additional targets discovery and allows to attach to them.
 domain Target
```

## Roll protocol to r603679 — _2018-10-29T23:15:48.000Z_
######  Diff: [`a05a172...0170df0`](https://github.com/ChromeDevTools/devtools-protocol/compare/a05a172...0170df0)

```diff
@@ browser_protocol.pdl:463 @@ experimental domain Audits
       optional boolean sizeOnly
     returns
       # The encoded body as a base64 string. Omitted if sizeOnly is true.
-      optional string body
+      optional binary body
       # Size before re-encoding.
       integer originalSize
       # Size after re-encoding.
@@ -1204,7 +1204,7 @@ experimental domain CacheStorage
   type CachedResponse extends object
     properties
       # Entry content, base64-encoded.
-      string body
+      binary body
 
   # Deletes a cache.
   command deleteCache
@@ -2707,7 +2707,7 @@ experimental domain HeadlessExperimental
       # display. Reported for diagnostic uses, may be removed in the future.
       boolean hasDamage
       # Base64-encoded image data of the screenshot, if one was requested and successfully taken.
-      optional string screenshotData
+      optional binary screenshotData
 
   # Disables headless events for the target.
   command disable
@@ -3214,7 +3214,7 @@ experimental domain LayerTree
       # Offset from owning layer top boundary
       number y
       # Base64-encoded snapshot data.
-      string picture
+      binary picture
 
   # Information about a compositing layer.
   type Layer extends object
@@ -4926,7 +4926,7 @@ domain Page
       experimental optional boolean fromSurface
     returns
       # Base64-encoded image data.
-      string data
+      binary data
 
   # Clears the overriden device metrics.
   experimental deprecated command clearDeviceMetricsOverride
@@ -5113,7 +5113,7 @@ domain Page
       optional boolean preferCSSPageSize
     returns
       # Base64-encoded pdf data.
-      string data
+      binary data
 
   # Reloads given page optionally ignoring the cache.
   command reload
@@ -5465,7 +5465,7 @@ domain Page
   experimental event screencastFrame
     parameters
       # Base64-encoded compressed image.
-      string data
+      binary data
       # Screencast frame metadata.
       ScreencastFrameMetadata metadata
       # Frame number.
```

## Roll protocol to r603282 — _2018-10-27T01:15:49.000Z_
######  Diff: [`1bfc9c2...a05a172`](https://github.com/ChromeDevTools/devtools-protocol/compare/1bfc9c2...a05a172)

```diff
@@ browser_protocol.pdl:4054 @@ domain Network
       optional ErrorReason errorReason
       # If set the requests completes using with the provided base64 encoded raw response, including
       # HTTP status line and headers etc... Must not be set in response to an authChallenge.
-      optional string rawResponse
+      optional binary rawResponse
       # If set the request url will be modified in a way that's not observable by page. Must not be
       # set in response to an authChallenge.
       optional string url
```

## Roll protocol to r603097 — _2018-10-26T15:16:21.000Z_
######  Diff: [`bf71ff9...1bfc9c2`](https://github.com/ChromeDevTools/devtools-protocol/compare/bf71ff9...1bfc9c2)

```diff
@@ browser_protocol.pdl:1155 @@ experimental domain CacheStorage
   # Unique identifier of the Cache object.
   type CacheId extends string
 
+  # type of HTTP response cached
+  type CachedResponseType extends string
+    enum
+      basic
+      cors
+      default
+      error
+      opaqueResponse
+      opaqueRedirect
+
   # Data entry.
   type DataEntry extends object
     properties
@@ -1170,6 +1180,8 @@ experimental domain CacheStorage
       integer responseStatus
       # HTTP response status text.
       string responseStatusText
+      # HTTP response type
+      CachedResponseType responseType
       # Response headers
       array of Header responseHeaders
```

## Roll protocol to r602583 — _2018-10-25T02:16:02.000Z_
######  Diff: [`928efbe...bf71ff9`](https://github.com/ChromeDevTools/devtools-protocol/compare/928efbe...bf71ff9)

```diff
@@ browser_protocol.pdl:5567 @@ domain Security
       MixedContentType mixedContentType
       # Page certificate.
       array of string certificate
+      # Recommendations to fix any issues.
+      optional array of string recommendations
 
   # Information about insecure content on the page.
   type InsecureContentStatus extends object
```

## Roll protocol to r602540 — _2018-10-25T00:45:28.000Z_
######  Diff: [`86cacdc...3e07e64`](https://github.com/ChromeDevTools/devtools-protocol/compare/86cacdc...3e07e64)

```diff
@@ browser_protocol.pdl:5316 @@ domain Page
     parameters
       string url
       # Base64-encoded data
-      string data
+      binary data
 
   # Clears seeded compilation cache.
   experimental command clearCompilationCache
@@ -5484,7 +5484,7 @@ domain Page
     parameters
       string url
       # Base64-encoded data
-      string data
+      binary data
 
 
 domain Performance
```

## Roll protocol to r601846 — _2018-10-23T04:15:58.000Z_
######  Diff: [`2e4077a...f25bb99`](https://github.com/ChromeDevTools/devtools-protocol/compare/2e4077a...f25bb99)

```diff
@@ js_protocol.pdl:556 @@ experimental domain HeapProfiler
       Runtime.CallFrame callFrame
       # Allocations size in bytes for the node excluding children.
       number selfSize
+      # Node id. Ids are unique across all profiles collected between startSampling and stopSampling.
+      integer id
       # Child nodes.
       array of SamplingHeapProfileNode children
 
-  # Profile.
+  # A single sample from a sampling profile.
+  type SamplingHeapProfileSample extends object
+    properties
+      # Allocation size in bytes attributed to the sample.
+      number size
+      # Id of the corresponding profile tree node.
+      integer nodeId
+      # Time-ordered sample ordinal number. It is unique across all profiles retrieved
+      # between startSampling and stopSampling.
+      number ordinal
+
+  # Sampling profile.
   type SamplingHeapProfile extends object
     properties
       SamplingHeapProfileNode head
+      array of SamplingHeapProfileSample samples
 
   # Enables console to refer to the node with given id via $x (see Command Line API for more details
   # $x functions).
```

## Roll protocol to r601839 — _2018-10-23T03:15:59.000Z_
######  Diff: [`0d63470...2e4077a`](https://github.com/ChromeDevTools/devtools-protocol/compare/0d63470...2e4077a)

```diff
@@ js_protocol.pdl:890 @@ domain Runtime
 
   experimental type CustomPreview extends object
     properties
+      # The JSON-stringified result of formatter.header(object, config) call.
+      # It contains json ML array that represents RemoteObject.
       string header
-      boolean hasBody
-      RemoteObjectId formatterObjectId
-      RemoteObjectId bindRemoteObjectFunctionId
-      optional RemoteObjectId configObjectId
+      # If formatter returns true as a result of formatter.hasBody call then bodyGetterId will
+      # contain RemoteObjectId for the function that returns result of formatter.body(object, config) call.
+      # The result value is json ML array.
+      optional RemoteObjectId bodyGetterId
 
   # Object containing abbreviated remote object value.
   experimental type ObjectPreview extends object
```

## Roll protocol to r599863 — _2018-10-16T05:16:05.000Z_
######  Diff: [`584d0c5...0d63470`](https://github.com/ChromeDevTools/devtools-protocol/compare/584d0c5...0d63470)

```diff
@@ browser_protocol.pdl:178 @@ experimental domain Accessibility
       # The backend ID for the associated DOM node, if any.
       optional DOM.BackendNodeId backendDOMNodeId
 
+  # Disables the accessibility domain.
+  command disable
+
+  # Enables the accessibility domain which causes `AXNodeId`s to remain consistent between method calls.
+  # This turns on accessibility for the page, which can impact performance until accessibility is disabled.
+  command enable
+
   # Fetches the accessibility node and partial accessibility tree for this DOM node, if it exists.
   experimental command getPartialAXTree
     parameters
```

## Roll protocol to r599771 — _2018-10-15T23:16:09.000Z_
######  Diff: [`3ad8e30...584d0c5`](https://github.com/ChromeDevTools/devtools-protocol/compare/3ad8e30...584d0c5)

```diff
@@ browser_protocol.pdl:116 @@ experimental domain Accessibility
     enum
       busy
       disabled
+      editable
+      focusable
+      focused
       hidden
       hiddenRoot
       invalid
       keyshortcuts
+      settable
       roledescription
       live
       atomic
```

## Roll protocol to r599293 — _2018-10-12T18:16:15.000Z_
######  Diff: [`5efd10a...3ad8e30`](https://github.com/ChromeDevTools/devtools-protocol/compare/5efd10a...3ad8e30)

```diff
@@ browser_protocol.pdl:490 @@ domain Browser
       accessibilityEvents
       audioCapture
       backgroundSync
+      backgroundFetch
       clipboardRead
       clipboardWrite
       durableStorage
```

## Roll protocol to r597746 — _2018-10-09T00:16:03.000Z_
######  Diff: [`32f4ced...5efd10a`](https://github.com/ChromeDevTools/devtools-protocol/compare/32f4ced...5efd10a)

```diff
@@ browser_protocol.pdl:1800 @@ domain DOM
     parameters
       Page.FrameId frameId
     returns
-      NodeId nodeId
+      # Resulting node.
+      BackendNodeId backendNodeId
+      # Id of the node at given coordinates, only when enabled.
+      optional NodeId nodeId
 
   # Fired when `Element`'s attribute is modified.
   event attributeModified
```

## Roll protocol to r596435 — _2018-10-04T00:15:54.000Z_
######  Diff: [`7ad2b35...32f4ced`](https://github.com/ChromeDevTools/devtools-protocol/compare/7ad2b35...32f4ced)

```diff
@@ browser_protocol.pdl:1530 @@ domain DOM
       # Resulting node.
       array of Node nodes
 
-  # Returns node id at given location.
+  # Returns node id at given location. Depending on whether DOM domain is enabled, nodeId is
+  # either returned or not.
   experimental command getNodeForLocation
     parameters
       # X coordinate.
@@ -1540,8 +1541,10 @@ domain DOM
       # False to skip to the nearest non-UA shadow root ancestor (default: false).
       optional boolean includeUserAgentShadowDOM
     returns
-      # Id of the node at given coordinates.
-      NodeId nodeId
+      # Resulting node.
+      BackendNodeId backendNodeId
+      # Id of the node at given coordinates, only when enabled.
+      optional NodeId nodeId
 
   # Returns node's HTML markup.
   command getOuterHTML
```

## Roll protocol to r595262 — _2018-09-29T00:16:08.000Z_
######  Diff: [`7d4e024...7ad2b35`](https://github.com/ChromeDevTools/devtools-protocol/compare/7d4e024...7ad2b35)

```diff
@@ browser_protocol.pdl:5485 @@ domain Performance
   # Enable collecting and reporting metrics.
   command enable
 
+  # Sets time domain to use for collecting and reporting duration metrics.
+  # Note that this must be called before enabling metrics collection. Calling
+  # this method while metrics collection is enabled returns an error.
+  experimental command setTimeDomain
+    parameters
+      # Time domain
+      enum timeDomain
+        # Use monotonically increasing abstract time (default).
+        timeTicks
+        # Use thread running time.
+        threadTicks
+
   # Retrieve current values of run-time metrics.
   command getMetrics
     returns
```

## Roll protocol to r594552 — _2018-09-27T01:16:07.000Z_
######  Diff: [`4b269f4...7d4e024`](https://github.com/ChromeDevTools/devtools-protocol/compare/4b269f4...7d4e024)

```diff
@@ browser_protocol.pdl:4870 @@ domain Page
   command addScriptToEvaluateOnNewDocument
     parameters
       string source
+      # If specified, creates an isolated world with the given name and evaluates given script in it.
+      # This world name will be used as the ExecutionContextDescription::name when the corresponding
+      # event is emitted.
+      experimental optional string worldName
     returns
       # Identifier of the added script.
       ScriptIdentifier identifier
```

## Roll protocol to r594206 — _2018-09-26T03:15:47.000Z_
######  Diff: [`4cc8f92...4b269f4`](https://github.com/ChromeDevTools/devtools-protocol/compare/4cc8f92...4b269f4)

```diff
@@ browser_protocol.pdl:4870 @@ domain Page
   command addScriptToEvaluateOnNewDocument
     parameters
       string source
-      # If specified, creates an isolated world with the given name and evaluates given script in it.
-      # This world name will be used as the ExecutionContextDescription::name when the corresponding
-      # event is emitted.
-      experimental optional string worldName
     returns
       # Identifier of the added script.
       ScriptIdentifier identifier
```

## Roll protocol to r594172 — _2018-09-26T01:15:50.000Z_
######  Diff: [`b797679...4cc8f92`](https://github.com/ChromeDevTools/devtools-protocol/compare/b797679...4cc8f92)

```diff
@@ browser_protocol.pdl:4870 @@ domain Page
   command addScriptToEvaluateOnNewDocument
     parameters
       string source
+      # If specified, creates an isolated world with the given name and evaluates given script in it.
+      # This world name will be used as the ExecutionContextDescription::name when the corresponding
+      # event is emitted.
+      experimental optional string worldName
     returns
       # Identifier of the added script.
       ScriptIdentifier identifier
```

## Roll protocol to r592922 — _2018-09-20T20:19:12.000Z_
######  Diff: [`171867f...b797679`](https://github.com/ChromeDevTools/devtools-protocol/compare/171867f...b797679)

```diff
@@ browser_protocol.pdl:190 @@ experimental domain Accessibility
       # children, if requested.
       array of AXNode nodes
 
+  # Fetches the entire accessibility tree
+  experimental command getFullAXTree
+    returns
+      array of AXNode nodes
+
 experimental domain Animation
   depends on Runtime
   depends on DOM
```

## Roll protocol to r590503 — _2018-09-11T22:17:02.000Z_
######  Diff: [`fd5476b...171867f`](https://github.com/ChromeDevTools/devtools-protocol/compare/fd5476b...171867f)

```diff
@@ browser_protocol.pdl:2461 @@ domain Emulation
   # Requests that page scale factor is reset to initial values.
   experimental command resetPageScaleFactor
 
+  # Enables or disables simulating a focused and active page.
+  experimental command setFocusEmulationEnabled
+    parameters
+      # Whether to enable to disable focus emulation.
+      boolean enabled
+
   # Enables CPU throttling to emulate slow CPUs.
   experimental command setCPUThrottlingRate
     parameters
```

## Roll protocol to r589586 — _2018-09-07T18:22:54.000Z_
######  Diff: [`59c4dec...fd5476b`](https://github.com/ChromeDevTools/devtools-protocol/compare/59c4dec...fd5476b)

```diff
@@ browser_protocol.pdl:1909 @@ domain DOM
 domain DOMDebugger
   depends on DOM
   depends on Debugger
+  depends on Runtime
 
   # DOM breakpoint type.
   type DOMBreakpointType extends string
@@ -3482,6 +3483,26 @@ domain Network
   depends on Runtime
   depends on Security
 
+  # Resource type as it was perceived by the rendering engine.
+  type ResourceType extends string
+    enum
+      Document
+      Stylesheet
+      Image
+      Media
+      Font
+      Script
+      TextTrack
+      XHR
+      Fetch
+      EventSource
+      WebSocket
+      Manifest
+      SignedExchange
+      Ping
+      CSPViolationReport
+      Other
+
   # Unique loader identifier.
   type LoaderId extends string
 
@@ -3765,7 +3786,7 @@ domain Network
       # Resource URL. This is the url of the original network request.
       string url
       # Type of this resource.
-      Page.ResourceType type
+      ResourceType type
       # Cached response data.
       optional Response response
       # Cached response body size.
@@ -3881,7 +3902,7 @@ domain Network
       # backslash. Omitting is equivalent to "*".
       optional string urlPattern
       # If set, only requests for matching resource types will be intercepted.
-      optional Page.ResourceType resourceType
+      optional ResourceType resourceType
       # Stage at wich to begin intercepting requests. Default is Request.
       optional InterceptionStage interceptionStage
 
@@ -4252,7 +4273,7 @@ domain Network
       # Timestamp.
       MonotonicTime timestamp
       # Resource type.
-      Page.ResourceType type
+      ResourceType type
       # User friendly error message.
       string errorText
       # True if loading was canceled.
@@ -4285,7 +4306,7 @@ domain Network
       # The id of the frame that initiated the request.
       Page.FrameId frameId
       # How the requested resource will be used.
-      Page.ResourceType resourceType
+      ResourceType resourceType
       # Whether this is a navigation request, which can abort the navigation completely.
       boolean isNavigationRequest
       # Set if the request is a navigation that will result in a download.
@@ -4332,7 +4353,7 @@ domain Network
       # Redirect response data.
       optional Response redirectResponse
       # Type of this resource.
-      optional Page.ResourceType type
+      optional ResourceType type
       # Frame identifier.
       optional Page.FrameId frameId
       # Whether the request is initiated by a user gesture. Defaults to false.
@@ -4366,7 +4387,7 @@ domain Network
       # Timestamp.
       MonotonicTime timestamp
       # Resource type.
-      Page.ResourceType type
+      ResourceType type
       # Response data.
       Response response
       # Frame identifier.
@@ -4623,26 +4644,7 @@ domain Page
   depends on Debugger
   depends on DOM
   depends on Network
-
-  # Resource type as it was perceived by the rendering engine.
-  type ResourceType extends string
-    enum
-      Document
-      Stylesheet
-      Image
-      Media
-      Font
-      Script
-      TextTrack
-      XHR
-      Fetch
-      EventSource
-      WebSocket
-      Manifest
-      SignedExchange
-      Ping
-      CSPViolationReport
-      Other
+  depends on Runtime
 
   # Unique frame identifier.
   type FrameId extends string
@@ -4673,7 +4675,7 @@ domain Page
       # Resource URL.
       string url
       # Type of this resource.
-      ResourceType type
+      Network.ResourceType type
       # Resource mimeType as determined by the browser.
       string mimeType
       # last-modified timestamp as reported by server.
```

## Roll protocol to r588752 — _2018-09-05T03:15:55.000Z_
######  Diff: [`359d29d...59c4dec`](https://github.com/ChromeDevTools/devtools-protocol/compare/359d29d...59c4dec)

```diff
@@ browser_protocol.pdl:2081 @@ experimental domain DOMSnapshot
       optional string currentSourceURL
       # The url of the script (if any) that generates this node.
       optional string originURL
+      # Scroll offsets, set when this node is a Document.
+      optional number scrollOffsetX
+      optional number scrollOffsetY
 
   # Details of post layout rendered text positions. The exact layout should not be regarded as
   # stable and may change between versions.
   type InlineTextBox extends object
     properties
-      # The absolute position bounding box.
+      # The bounding box in document coordinates. Note that scroll offset of the document is ignored.
       DOM.Rect boundingBox
       # The starting index in characters, for this post layout textbox substring. Characters that
       # would be represented as a surrogate pair in UTF-16 have length 2.
@@ -2100,7 +2103,7 @@ experimental domain DOMSnapshot
     properties
       # The index of the related DOM node in the `domNodes` array returned by `getSnapshot`.
       integer domNodeIndex
-      # The absolute position bounding box.
+      # The bounding box in document coordinates. Note that scroll offset of the document is ignored.
       DOM.Rect boundingBox
       # Contents of the LayoutText, if any.
       optional string layoutText
@@ -2175,6 +2178,9 @@ experimental domain DOMSnapshot
       LayoutTreeSnapshot layout
       # The post-layout inline text nodes.
       TextBoxSnapshot textBoxes
+      # Scroll offsets.
+      optional number scrollOffsetX
+      optional number scrollOffsetY
 
   # Table containing nodes.
   type NodeTreeSnapshot extends object
```

## Roll protocol to r588740 — _2018-09-05T02:16:30.000Z_
######  Diff: [`cb9aed5...359d29d`](https://github.com/ChromeDevTools/devtools-protocol/compare/cb9aed5...359d29d)

```diff
@@ browser_protocol.pdl:516 @@ domain Browser
   # Close browser gracefully.
   command close
 
+  # Crashes browser on the main thread.
+  experimental command crash
+
   # Returns version information.
   command getVersion
     returns
@@ -4702,6 +4705,7 @@ domain Page
     enum
       link
       typed
+      address_bar
       auto_bookmark
       auto_subframe
       manual_subframe
```

## Roll protocol to r586443 — _2018-08-27T22:15:57.000Z_
######  Diff: [`cafc591...41333c5`](https://github.com/ChromeDevTools/devtools-protocol/compare/cafc591...41333c5)

```diff
@@ browser_protocol.pdl:6185 @@ experimental domain Tracing
       optional IO.StreamHandle stream
       # Compression format of returned stream.
       optional StreamCompression streamCompression
+
+# Testing domain is a dumping ground for the capabilities requires for browser or app testing that do not fit other
+# domains.
+experimental domain Testing
+  depends on Page
+
+  # Generates a report for testing.
+  command generateTestReport
+    parameters
+      # Message to be displayed in the report.
+      string message
+      # Specifies the endpoint group to deliver the report to.
+      optional string group
```

## Roll protocol to r586417 — _2018-08-27T21:15:56.000Z_
######  Diff: [`fbe2ce1...cafc591`](https://github.com/ChromeDevTools/devtools-protocol/compare/fbe2ce1...cafc591)

```diff
@@ browser_protocol.pdl:5276 @@ domain Page
   # Clears seeded compilation cache.
   experimental command clearCompilationCache
 
+  # Generates a report for testing.
+  experimental command generateTestReport
+    parameters
+      # Message to be displayed in the report.
+      string message
+      # Specifies the endpoint group to deliver the report to.
+      optional string group
+
   event domContentEventFired
     parameters
       Network.MonotonicTime timestamp
```

## Roll protocol to r585632 — _2018-08-23T22:15:44.000Z_
######  Diff: [`d4361d7...fbe2ce1`](https://github.com/ChromeDevTools/devtools-protocol/compare/d4361d7...fbe2ce1)

```diff
@@ browser_protocol.pdl:480 @@ domain Browser
       # The window state. Default to normal.
       optional WindowState windowState
 
+  experimental type PermissionType extends string
+    enum
+      accessibilityEvents
+      audioCapture
+      backgroundSync
+      clipboardRead
+      clipboardWrite
+      durableStorage
+      flash
+      geolocation
+      midi
+      midiSysex
+      notifications
+      paymentHandler
+      protectedMediaIdentifier
+      sensors
+      videoCapture
+
+  # Grant specific permissions to the given origin and reject all others.
+  experimental command grantPermissions
+    parameters
+      string origin
+      array of PermissionType permissions
+      # BrowserContext to override permissions. When omitted, default browser context is used.
+      optional Target.BrowserContextID browserContextId
+
+  # Reset all permission management for all origins.
+  experimental command resetPermissions
+    parameters
+      # BrowserContext to reset permissions. When omitted, default browser context is used.
+      optional Target.BrowserContextID browserContextId
+
+
   # Close browser gracefully.
   command close
```

## Roll protocol to r584873 — _2018-08-21T19:15:50.000Z_
######  Diff: [`5fd6859...d4361d7`](https://github.com/ChromeDevTools/devtools-protocol/compare/5fd6859...d4361d7)

```diff
@@ browser_protocol.pdl:2076 @@ experimental domain DOMSnapshot
       # that are painted together will have the same index. Only provided if includePaintOrder in
       # getSnapshot was true.
       optional integer paintOrder
+      # Set to true to indicate the element begins a new stacking context.
+      optional boolean isStackingContext
 
   # A subset of the full ComputedStyle as defined by the request whitelist.
   type ComputedStyle extends object
@@ -2185,6 +2187,8 @@ experimental domain DOMSnapshot
       array of Rectangle bounds
       # Contents of the LayoutText, if any.
       array of StringIndex text
+      # Stacking context information.
+      RareBooleanData stackingContexts
 
   # Details of post layout rendered text positions. The exact layout should not be regarded as
   # stable and may change between versions.
```

## Roll protocol to r581326 — _2018-08-07T20:15:57.000Z_
######  Diff: [`45146f8...5fd6859`](https://github.com/ChromeDevTools/devtools-protocol/compare/45146f8...5fd6859)

```diff
@@ browser_protocol.pdl:3414 @@ experimental domain Memory
   type SamplingProfile extends object
     properties
       array of SamplingProfileNode samples
+      array of Module modules
+
+  # Executable module information
+  type Module extends object
+    properties
+      # Name of the module.
+      string name
+      # UUID of the module.
+      string uuid
+      # Base address where the module is loaded into memory. Encoded as a decimal
+      # or hexadecimal (0x prefixed) string.
+      string baseAddress
+      # Size of the module in bytes.
+      number size
 
 # Network domain allows tracking network activities of the page. It exposes information about http,
 # file, data and other requests and responses, their headers, bodies, timing, etc.
```

## Roll protocol to r579242 — _2018-07-31T00:16:01.000Z_
######  Diff: [`501e985...45146f8`](https://github.com/ChromeDevTools/devtools-protocol/compare/501e985...45146f8)

```diff
@@ browser_protocol.pdl:5932 @@ domain Target
       # Whether to pause new targets when attaching to them. Use `Runtime.runIfWaitingForDebugger`
       # to run paused targets.
       boolean waitForDebuggerOnStart
+      # Enables "flat" access to the session via specifying sessionId attribute in the commands.
+      experimental optional boolean flatten
 
   # Controls whether to discover available targets and notify via
   # `targetCreated/targetInfoChanged/targetDestroyed` events.
```

## Roll protocol to r578934 — _2018-07-28T20:15:43.000Z_
######  Diff: [`5c95923...501e985`](https://github.com/ChromeDevTools/devtools-protocol/compare/5c95923...501e985)

```diff
@@ browser_protocol.pdl:2909 @@ domain Input
       # 0).
       optional integer location
 
+  # This method emulates inserting text that doesn't come from a key press,
+  # for example an emoji keyboard or an IME.
+  experimental command insertText
+    parameters
+      # The text to insert.
+      string text
+
   # Dispatches a mouse event to the page.
   command dispatchMouseEvent
     parameters
```

## Roll protocol to r576560 — _2018-07-19T18:16:22.000Z_
######  Diff: [`05a3c0e...5c95923`](https://github.com/ChromeDevTools/devtools-protocol/compare/05a3c0e...5c95923)

```diff
@@ browser_protocol.pdl:5202 @@ domain Page
   # Stops sending each frame in the `screencastFrame`.
   experimental command stopScreencast
 
+  # Forces compilation cache to be generated for every subresource script.
+  experimental command setProduceCompilationCache
+    parameters
+      boolean enabled
+
+  # Seeds compilation cache for given url. Compilation cache does not survive
+  # cross-process navigation.
+  experimental command addCompilationCache
+    parameters
+      string url
+      # Base64-encoded data
+      string data
+
+  # Clears seeded compilation cache.
+  experimental command clearCompilationCache
+
   event domContentEventFired
     parameters
       Network.MonotonicTime timestamp
@@ -5351,6 +5367,15 @@ domain Page
       # Whether or not it was triggered by user gesture.
       boolean userGesture
 
+  # Issued for every compilation cache generated. Is only available
+  # if Page.setGenerateCompilationCache is enabled.
+  experimental event compilationCacheProduced
+    parameters
+      string url
+      # Base64-encoded data
+      string data
+
+
 domain Performance
 
   # Run-time execution metric.
```

## Roll protocol to r575147 — _2018-07-14T04:15:43.000Z_
######  Diff: [`090126c...05a3c0e`](https://github.com/ChromeDevTools/devtools-protocol/compare/090126c...05a3c0e)

```diff
@@ browser_protocol.pdl:5796 @@ domain Target
       # Id assigned to the session.
       SessionID sessionId
 
+  # Attaches to the browser target, only uses flat sessionId mode.
+  experimental command attachToBrowserTarget
+    returns
+      # Id assigned to the session.
+      SessionID sessionId
+
   # Closes the target. If the target is a page that gets closed too.
   command closeTarget
     parameters
```

## Roll protocol to r574367 — _2018-07-11T22:15:44.000Z_
######  Diff: [`26e4e07...090126c`](https://github.com/ChromeDevTools/devtools-protocol/compare/26e4e07...090126c)

```diff
@@ browser_protocol.pdl:2114 @@ experimental domain DOMSnapshot
 
   type Rectangle extends array of number
 
-  # DOM tree snapshot.
+  # Document snapshot.
   type DocumentSnapshot extends object
+    properties
+      # Document URL that `Document` or `FrameOwner` node points to.
+      StringIndex documentURL
+      # Base URL that `Document` or `FrameOwner` node uses for URL completion.
+      StringIndex baseURL
+      # Contains the document's content language.
+      StringIndex contentLanguage
+      # Contains the document's character set encoding.
+      StringIndex encodingName
+      # `DocumentType` node's publicId.
+      StringIndex publicId
+      # `DocumentType` node's systemId.
+      StringIndex systemId
+      # Frame ID for frame owner elements and also for the document node.
+      StringIndex frameId
+      # A table with dom nodes.
+      NodeTreeSnapshot nodes
+      # The nodes in the layout tree.
+      LayoutTreeSnapshot layout
+      # The post-layout inline text nodes.
+      TextBoxSnapshot textBoxes
+
+  # Table containing nodes.
+  type NodeTreeSnapshot extends object
     properties
       # Parent node index.
       optional array of integer parentIndex
@@ -2137,20 +2161,6 @@ experimental domain DOMSnapshot
       optional RareBooleanData inputChecked
       # Only set for option elements, indicates if the element has been selected
       optional RareBooleanData optionSelected
-      # Document URL that `Document` or `FrameOwner` node points to.
-      optional RareStringData documentURL
-      # Base URL that `Document` or `FrameOwner` node uses for URL completion.
-      optional RareStringData baseURL
-      # Only set for documents, contains the document's content language.
-      optional RareStringData contentLanguage
-      # Only set for documents, contains the document's character set encoding.
-      optional RareStringData documentEncoding
-      # `DocumentType` node's publicId.
-      optional RareStringData publicId
-      # `DocumentType` node's systemId.
-      optional RareStringData systemId
-      # Frame ID for frame owner elements and also for the document node.
-      optional RareStringData frameId
       # The index of the document in the list of the snapshot documents.
       optional RareIntegerData contentDocumentIndex
       # Type of a pseudo element node.
@@ -2163,10 +2173,18 @@ experimental domain DOMSnapshot
       optional RareStringData currentSourceURL
       # The url of the script (if any) that generates this node.
       optional RareStringData originURL
-      # The nodes in the layout tree.
-      LayoutTreeSnapshot layoutSnapshot
-      # The post-layout inline text nodes.
-      TextBoxSnapshot textBoxSnapshot
+
+  # Details of an element in the DOM tree with a LayoutObject.
+  type LayoutTreeSnapshot extends object
+    properties
+      # The index of the related DOM node in the `domNodes` array returned by `getSnapshot`.
+      array of integer nodeIndex
+      # Index into the `computedStyles` array returned by `captureSnapshot`.
+      array of ArrayOfStrings styles
+      # The absolute position bounding box.
+      array of Rectangle bounds
+      # Contents of the LayoutText, if any.
+      array of StringIndex text
 
   # Details of post layout rendered text positions. The exact layout should not be regarded as
   # stable and may change between versions.
@@ -2183,18 +2201,6 @@ experimental domain DOMSnapshot
       # represented as a surrogate pair in UTF-16 have length 2.
       array of integer length
 
-  # Details of an element in the DOM tree with a LayoutObject.
-  type LayoutTreeSnapshot extends object
-    properties
-      # The index of the related DOM node in the `domNodes` array returned by `getSnapshot`.
-      array of integer nodeIndex
-      # Index into the `computedStyles` array returned by `captureSnapshot`.
-      array of ArrayOfStrings styles
-      # The absolute position bounding box.
-      array of Rectangle bounds
-      # Contents of the LayoutText, if any.
-      array of StringIndex text
-
   # Disables DOM snapshot agent for the given page.
   command disable
```

## Roll protocol to r574025 — _2018-07-11T01:15:41.000Z_
######  Diff: [`1aa7b31...26e4e07`](https://github.com/ChromeDevTools/devtools-protocol/compare/1aa7b31...26e4e07)

```diff
@@ browser_protocol.pdl:2031 @@ experimental domain DOMSnapshot
       # The index of a frame owner element's content document in the `domNodes` array returned by
       # `getSnapshot`, if any.
       optional integer contentDocumentIndex
-      # Index of the imported document's node of a link element in the `domNodes` array returned by
-      # `getSnapshot`, if any.
-      optional integer importedDocumentIndex
-      # Index of the content node of a template element in the `domNodes` array returned by
-      # `getSnapshot`.
-      optional integer templateContentIndex
       # Type of a pseudo element node.
       optional DOM.PseudoType pseudoType
       # Shadow root type.
@@ -2121,7 +2115,7 @@ experimental domain DOMSnapshot
   type Rectangle extends array of number
 
   # DOM tree snapshot.
-  type DOMTreeSnapshot extends object
+  type DocumentSnapshot extends object
     properties
       # Parent node index.
       optional array of integer parentIndex
@@ -2135,9 +2129,6 @@ experimental domain DOMSnapshot
       optional array of DOM.BackendNodeId backendNodeId
       # Attributes of an `Element` node. Flatten name, value pairs.
       optional array of ArrayOfStrings attributes
-      # The index of the node's related layout tree node in the `layoutTreeNodes` array returned by
-      # `captureSnapshot`, if any.
-      optional array of integer layoutNodeIndex
       # Only set for textarea elements, contains the text value.
       optional RareStringData textValue
       # Only set for input elements, contains the input's associated text value.
@@ -2160,15 +2151,8 @@ experimental domain DOMSnapshot
       optional RareStringData systemId
       # Frame ID for frame owner elements and also for the document node.
       optional RareStringData frameId
-      # The index of a frame owner element's content document in the `domNodes` array returned by
-      # `captureSnapshot`, if any.
+      # The index of the document in the list of the snapshot documents.
       optional RareIntegerData contentDocumentIndex
-      # Index of the imported document's node of a link element in the `domNodes` array returned by
-      # `captureSnapshot`, if any.
-      optional RareIntegerData importedDocumentIndex
-      # Index of the content node of a template element in the `domNodes` array returned by
-      # `captureSnapshot`.
-      optional RareIntegerData templateContentIndex
       # Type of a pseudo element node.
       optional RareStringData pseudoType
       # Whether this DOM node responds to mouse clicks. This includes nodes that have had click
@@ -2179,6 +2163,10 @@ experimental domain DOMSnapshot
       optional RareStringData currentSourceURL
       # The url of the script (if any) that generates this node.
       optional RareStringData originURL
+      # The nodes in the layout tree.
+      LayoutTreeSnapshot layoutSnapshot
+      # The post-layout inline text nodes.
+      TextBoxSnapshot textBoxSnapshot
 
   # Details of post layout rendered text positions. The exact layout should not be regarded as
   # stable and may change between versions.
@@ -2206,14 +2194,6 @@ experimental domain DOMSnapshot
       array of Rectangle bounds
       # Contents of the LayoutText, if any.
       array of StringIndex text
-      # The post-layout inline text nodes
-      TextBoxSnapshot textBoxes
-
-  # Computed style snapshot.
-  type StylesSnapshot extends object
-    properties
-      # Whitelisted ComputedStyle property values referenced by styleIndex.
-      array of ArrayOfStrings values
 
   # Disables DOM snapshot agent for the given page.
   command disable
@@ -2253,9 +2233,7 @@ experimental domain DOMSnapshot
       array of string computedStyles
     returns
       # The nodes in the DOM tree. The DOMNode at index 0 corresponds to the root document.
-      DOMTreeSnapshot nodes
-      # The nodes in the layout tree.
-      LayoutTreeSnapshot layout
+      array of DocumentSnapshot documents
       # Shared string table that all string properties refer to with indexes.
       array of string strings
```

## Roll protocol to r572598 — _2018-07-04T16:15:41.000Z_
######  Diff: [`19fb3d2...1aa7b31`](https://github.com/ChromeDevTools/devtools-protocol/compare/19fb3d2...1aa7b31)

```diff
@@ browser_protocol.pdl:5806 @@ domain Target
   command attachToTarget
     parameters
       TargetID targetId
+      # Enables "flat" access to the session via specifying sessionId attribute in the commands.
+      experimental optional boolean flatten
     returns
       # Id assigned to the session.
       SessionID sessionId
```

## Roll protocol to r572401 — _2018-07-04T00:15:50.000Z_
######  Diff: [`be1ed43...19fb3d2`](https://github.com/ChromeDevTools/devtools-protocol/compare/be1ed43...19fb3d2)

```diff
@@ browser_protocol.pdl:5879 @@ domain Target
   # Returns information about a target.
   experimental command getTargetInfo
     parameters
-      TargetID targetId
+      optional TargetID targetId
     returns
       TargetInfo targetInfo
```

## Roll protocol to r572389 — _2018-07-03T23:15:52.000Z_
######  Diff: [`7388b4b...be1ed43`](https://github.com/ChromeDevTools/devtools-protocol/compare/7388b4b...be1ed43)

```diff
@@ browser_protocol.pdl:533 @@ domain Browser
       # substring in their name are extracted. An empty or absent query returns
       # all histograms.
       optional string query
+      # If true, retrieve delta since last call.
+      optional boolean delta
+
     returns
       # Histograms.
       array of Histogram histograms
@@ -542,6 +545,8 @@ domain Browser
     parameters
       # Requested histogram name.
       string name
+      # If true, retrieve delta since last call.
+      optional boolean delta
     returns
       # Histogram.
       Histogram histogram
```

## Roll protocol to r572315 — _2018-07-03T19:15:46.000Z_
######  Diff: [`a63ed5b...7388b4b`](https://github.com/ChromeDevTools/devtools-protocol/compare/a63ed5b...7388b4b)

```diff
@@ browser_protocol.pdl:2092 @@ experimental domain DOMSnapshot
       # Attribute/property value.
       string value
 
+  # Index of the string in the strings table.
+  type StringIndex extends integer
+
+  # Index of the string in the strings table.
+  type ArrayOfStrings extends array of StringIndex
+
+  # Data that is only present on rare nodes.
+  type RareStringData extends object
+    properties
+      array of integer index
+      array of StringIndex value
+
+  type RareBooleanData extends object
+    properties
+      array of integer index
+
+  type RareIntegerData extends object
+    properties
+      array of integer index
+      array of integer value
+
+  type Rectangle extends array of number
+
+  # DOM tree snapshot.
+  type DOMTreeSnapshot extends object
+    properties
+      # Parent node index.
+      optional array of integer parentIndex
+      # `Node`'s nodeType.
+      optional array of integer nodeType
+      # `Node`'s nodeName.
+      optional array of StringIndex nodeName
+      # `Node`'s nodeValue.
+      optional array of StringIndex nodeValue
+      # `Node`'s id, corresponds to DOM.Node.backendNodeId.
+      optional array of DOM.BackendNodeId backendNodeId
+      # Attributes of an `Element` node. Flatten name, value pairs.
+      optional array of ArrayOfStrings attributes
+      # The index of the node's related layout tree node in the `layoutTreeNodes` array returned by
+      # `captureSnapshot`, if any.
+      optional array of integer layoutNodeIndex
+      # Only set for textarea elements, contains the text value.
+      optional RareStringData textValue
+      # Only set for input elements, contains the input's associated text value.
+      optional RareStringData inputValue
+      # Only set for radio and checkbox input elements, indicates if the element has been checked
+      optional RareBooleanData inputChecked
+      # Only set for option elements, indicates if the element has been selected
+      optional RareBooleanData optionSelected
+      # Document URL that `Document` or `FrameOwner` node points to.
+      optional RareStringData documentURL
+      # Base URL that `Document` or `FrameOwner` node uses for URL completion.
+      optional RareStringData baseURL
+      # Only set for documents, contains the document's content language.
+      optional RareStringData contentLanguage
+      # Only set for documents, contains the document's character set encoding.
+      optional RareStringData documentEncoding
+      # `DocumentType` node's publicId.
+      optional RareStringData publicId
+      # `DocumentType` node's systemId.
+      optional RareStringData systemId
+      # Frame ID for frame owner elements and also for the document node.
+      optional RareStringData frameId
+      # The index of a frame owner element's content document in the `domNodes` array returned by
+      # `captureSnapshot`, if any.
+      optional RareIntegerData contentDocumentIndex
+      # Index of the imported document's node of a link element in the `domNodes` array returned by
+      # `captureSnapshot`, if any.
+      optional RareIntegerData importedDocumentIndex
+      # Index of the content node of a template element in the `domNodes` array returned by
+      # `captureSnapshot`.
+      optional RareIntegerData templateContentIndex
+      # Type of a pseudo element node.
+      optional RareStringData pseudoType
+      # Whether this DOM node responds to mouse clicks. This includes nodes that have had click
+      # event listeners attached via JavaScript as well as anchor tags that naturally navigate when
+      # clicked.
+      optional RareBooleanData isClickable
+      # The selected url for nodes with a srcset attribute.
+      optional RareStringData currentSourceURL
+      # The url of the script (if any) that generates this node.
+      optional RareStringData originURL
+
+  # Details of post layout rendered text positions. The exact layout should not be regarded as
+  # stable and may change between versions.
+  type TextBoxSnapshot extends object
+    properties
+      # Intex of th elayout tree node that owns this box collection.
+      array of integer layoutIndex
+      # The absolute position bounding box.
+      array of Rectangle bounds
+      # The starting index in characters, for this post layout textbox substring. Characters that
+      # would be represented as a surrogate pair in UTF-16 have length 2.
+      array of integer start
+      # The number of characters in this post layout textbox substring. Characters that would be
+      # represented as a surrogate pair in UTF-16 have length 2.
+      array of integer length
+
+  # Details of an element in the DOM tree with a LayoutObject.
+  type LayoutTreeSnapshot extends object
+    properties
+      # The index of the related DOM node in the `domNodes` array returned by `getSnapshot`.
+      array of integer nodeIndex
+      # Index into the `computedStyles` array returned by `captureSnapshot`.
+      array of ArrayOfStrings styles
+      # The absolute position bounding box.
+      array of Rectangle bounds
+      # Contents of the LayoutText, if any.
+      array of StringIndex text
+      # The post-layout inline text nodes
+      TextBoxSnapshot textBoxes
+
+  # Computed style snapshot.
+  type StylesSnapshot extends object
+    properties
+      # Whitelisted ComputedStyle property values referenced by styleIndex.
+      array of ArrayOfStrings values
+
   # Disables DOM snapshot agent for the given page.
   command disable
 
@@ -2102,7 +2220,7 @@ experimental domain DOMSnapshot
   # template contents, and imported documents) in a flattened array, as well as layout and
   # white-listed computed style information for the nodes. Shadow DOM in the returned DOM tree is
   # flattened.
-  command getSnapshot
+  deprecated command getSnapshot
     parameters
       # Whitelist of computed styles to return.
       array of string computedStyleWhitelist
@@ -2120,6 +2238,22 @@ experimental domain DOMSnapshot
       # Whitelisted ComputedStyle properties for each node in the layout tree.
       array of ComputedStyle computedStyles
 
+  # Returns a document snapshot, including the full DOM tree of the root node (including iframes,
+  # template contents, and imported documents) in a flattened array, as well as layout and
+  # white-listed computed style information for the nodes. Shadow DOM in the returned DOM tree is
+  # flattened.
+  command captureSnapshot
+    parameters
+      # Whitelist of computed styles to return.
+      array of string computedStyles
+    returns
+      # The nodes in the DOM tree. The DOMNode at index 0 corresponds to the root document.
+      DOMTreeSnapshot nodes
+      # The nodes in the layout tree.
+      LayoutTreeSnapshot layout
+      # Shared string table that all string properties refer to with indexes.
+      array of string strings
+
 # Query and modify DOM storage.
 experimental domain DOMStorage
```

## Roll protocol to r571238 — _2018-06-28T20:16:10.000Z_
######  Diff: [`ca7022c...a63ed5b`](https://github.com/ChromeDevTools/devtools-protocol/compare/ca7022c...a63ed5b)

```diff
@@ browser_protocol.pdl:1444 @@ domain DOM
       # Box model for the node.
       BoxModel model
 
+  # Returns quads that describe node position on the page. This method
+  # might return multiple quads for inline nodes.
+  experimental command getContentQuads
+    parameters
+      # Identifier of the node.
+      optional NodeId nodeId
+      # Identifier of the backend node.
+      optional BackendNodeId backendNodeId
+      # JavaScript object id of the node wrapper.
+      optional Runtime.RemoteObjectId objectId
+    returns
+      # Quads that describe node layout relative to viewport.
+      array of Quad quads
+
   # Returns the root DOM node (and optionally the subtree) to the caller.
   command getDocument
     parameters
```

## Roll protocol to r568657 — _2018-06-20T00:16:05.000Z_
######  Diff: [`0905e28...ca7022c`](https://github.com/ChromeDevTools/devtools-protocol/compare/0905e28...ca7022c)

```diff
@@ browser_protocol.pdl:1 @@ @@ -1,6 +1,8 @@
 # Copyright 2017 The Chromium Authors. All rights reserved.
 # Use of this source code is governed by a BSD-style license that can be
 # found in the LICENSE file.
+#
+# Contribuging to Chrome DevTools Protocol: https://docs.google.com/document/d/1c-COD2kaK__5iMM5SEx-PzNA7HFmgttcYfOHHX0HaOM/edit?usp=sharing
 
 version
   major 1
```

## Roll protocol to r568337 — _2018-06-19T04:15:42.000Z_
######  Diff: [`6e2dac6...0905e28`](https://github.com/ChromeDevTools/devtools-protocol/compare/6e2dac6...0905e28)

```diff
@@ browser_protocol.pdl:3477 @@ domain Network
       inspector
       subresource-filter
       content-type
+      collapsed-by-client
 
   # HTTP response data.
   type Response extends object
```

## Roll protocol to r567107 — _2018-06-14T03:15:40.000Z_
######  Diff: [`b8a5362...6e2dac6`](https://github.com/ChromeDevTools/devtools-protocol/compare/b8a5362...6e2dac6)

```diff
@@ browser_protocol.pdl:5661 @@ domain Target
     returns
       boolean success
 
+  # Inject object to the target's main frame that provides a communication
+  # channel with browser target.
+  #
+  # Injected object will be available as `window[bindingName]`.
+  #
+  # The object has the follwing API:
+  # - `binding.send(json)` - a method to send messages over the remote debugging protocol
+  # - `binding.onmessage = json => handleMessage(json)` - a callback that will be called for the protocol notifications and command responses.
+  experimental command exposeDevToolsProtocol
+    parameters
+      TargetID targetId
+      # Binding name, 'cdp' if not specified.
+      optional string bindingName
+
   # Creates a new empty BrowserContext. Similar to an incognito profile but you can have more than
   # one.
   experimental command createBrowserContext
```

## Roll protocol to r565882 — _2018-06-09T15:15:49.000Z_
######  Diff: [`034b051...b8a5362`](https://github.com/ChromeDevTools/devtools-protocol/compare/034b051...b8a5362)

```diff
@@ browser_protocol.pdl:4433 @@ domain Page
       WebSocket
       Manifest
       SignedExchange
+      Ping
+      CSPViolationReport
       Other
 
   # Unique frame identifier.
```

## Roll protocol to r565873 — _2018-06-09T08:15:38.000Z_
######  Diff: [`ef21b44...034b051`](https://github.com/ChromeDevTools/devtools-protocol/compare/ef21b44...034b051)

```diff
@@ browser_protocol.pdl:3381 @@ domain Network
   # HTTP request data.
   type Request extends object
     properties
-      # Request URL.
+      # Request URL (without fragment).
       string url
+      # Fragment of the requested URL starting with hash, if present.
+      optional string urlFragment
       # HTTP request method.
       string method
       # HTTP request headers.
```

## Roll protocol to r565161 — _2018-06-07T03:15:42.000Z_
######  Diff: [`e6b9650...ef21b44`](https://github.com/ChromeDevTools/devtools-protocol/compare/e6b9650...ef21b44)

```diff
@@ browser_protocol.pdl:4625 @@ domain Page
       # The pictograph font-family.
       optional string pictograph
 
+  # Default font sizes.
+  experimental type FontSizes extends object
+    properties
+      # Default standard font size.
+      optional integer standard
+      # Default fixed font size.
+      optional integer fixed
+
   # Deprecated, please use addScriptToEvaluateOnNewDocument instead.
   experimental deprecated command addScriptToEvaluateOnLoad
     parameters
@@ -4949,12 +4957,18 @@ domain Page
       # Mock gamma
       number gamma
 
-  # Set commonly used font families.
+  # Set generic font families.
   experimental command setFontFamilies
     parameters
-      # Specifies font families to set. If a font family is not set, it won't be changed.
+      # Specifies font families to set. If a font family is not specified, it won't be changed.
       FontFamilies fontFamilies
 
+  # Set default font sizes.
+  experimental command setFontSizes
+    parameters
+      # Specifies font sizes to set. If a font size is not specified, it won't be changed.
+      FontSizes fontSizes
+
   # Sets given markup as the document's HTML.
   command setDocumentContent
     parameters
```

## Roll protocol to r564968 — _2018-06-06T18:15:47.000Z_
######  Diff: [`78ab8c3...e6b9650`](https://github.com/ChromeDevTools/devtools-protocol/compare/78ab8c3...e6b9650)

```diff
@@ browser_protocol.pdl:4060 @@ domain Network
       MonotonicTime timestamp
       # Total number of bytes received for this request.
       number encodedDataLength
-      # Set when response was blocked due to being cross-site document response.
-      optional boolean blockedCrossSiteDocument
+      # Set when 1) response was blocked by Cross-Origin Read Blocking and also
+      # 2) this needs to be reported to the DevTools console.
+      optional boolean shouldReportCorbBlocking
 
   # Details of an intercepted HTTP request, which must be either allowed, blocked, modified or
   # mocked.
```

## Roll protocol to r564939 — _2018-06-06T17:16:18.000Z_
######  Diff: [`8cc61c7...78ab8c3`](https://github.com/ChromeDevTools/devtools-protocol/compare/8cc61c7...78ab8c3)

```diff
@@ browser_protocol.pdl:4606 @@ domain Page
       # Page scale factor.
       number scale
 
+  # Generic font families collection.
+  experimental type FontFamilies extends object
+    properties
+      # The standard font-family.
+      optional string standard
+      # The fixed font-family.
+      optional string fixed
+      # The serif font-family.
+      optional string serif
+      # The sansSerif font-family.
+      optional string sansSerif
+      # The cursive font-family.
+      optional string cursive
+      # The fantasy font-family.
+      optional string fantasy
+      # The pictograph font-family.
+      optional string pictograph
+
   # Deprecated, please use addScriptToEvaluateOnNewDocument instead.
   experimental deprecated command addScriptToEvaluateOnLoad
     parameters
@@ -4930,6 +4948,12 @@ domain Page
       # Mock gamma
       number gamma
 
+  # Set commonly used font families.
+  experimental command setFontFamilies
+    parameters
+      # Specifies font families to set. If a font family is not set, it won't be changed.
+      FontFamilies fontFamilies
+
   # Sets given markup as the document's HTML.
   command setDocumentContent
     parameters
```

## Roll protocol to r564874 — _2018-06-06T14:16:13.000Z_
######  Diff: [`3bb6299...8cc61c7`](https://github.com/ChromeDevTools/devtools-protocol/compare/3bb6299...8cc61c7)

```diff
@@ js_protocol.pdl:1334 @@ domain Runtime
   # Will cancel the termination when the outer-most script execution ends.
   experimental command terminateExecution
 
-  # Adds binding with the given name on the global objects of all inspected
-  # contexts, including those created later. Bindings survive reloads.
+  # If executionContextId is empty, adds binding with the given name on the
+  # global objects of all inspected contexts, including those created later,
+  # bindings survive reloads.
+  # If executionContextId is specified, adds binding only on global object of
+  # given execution context.
   # Binding function takes exactly one argument, this argument should be string,
   # in case of any other input, function throws an exception.
   # Each binding function call produces Runtime.bindingCalled notification.
   experimental command addBinding
     parameters
       string name
+      optional ExecutionContextId executionContextId
 
   # This method does not remove binding function from global object but
   # unsubscribes current runtime agent from Runtime.bindingCalled notifications.
```

## Roll protocol to r564725 — _2018-06-06T00:15:41.000Z_
######  Diff: [`2c9e648...3bb6299`](https://github.com/ChromeDevTools/devtools-protocol/compare/2c9e648...3bb6299)

```diff
@@ browser_protocol.pdl:2326 @@ domain Emulation
       # Whether scrollbars should be always hidden.
       boolean hidden
 
+  experimental command setDocumentCookieDisabled
+    parameters
+      # Whether document.coookie API should be disabled.
+      boolean disabled
+
   experimental command setEmitTouchEventsForMouse
     parameters
       # Whether touch emulation based on mouse input should be enabled.
```

## Roll protocol to r564347 — _2018-06-05T02:15:53.000Z_
######  Diff: [`e5023ab...2c9e648`](https://github.com/ChromeDevTools/devtools-protocol/compare/e5023ab...2c9e648)

```diff
@@ js_protocol.pdl:1326 @@ domain Runtime
     parameters
       boolean enabled
 
+  experimental command setMaxCallStackSizeToCapture
+    parameters
+      integer size
+
   # Terminate current or next JavaScript execution.
   # Will cancel the termination when the outer-most script execution ends.
   experimental command terminateExecution
```

## Roll protocol to r563930 554653 554626 — _2018-06-02T05:15:40.000Z_
######  Diff: [`92b6b49...170e987`](https://github.com/ChromeDevTools/devtools-protocol/compare/92b6b49...170e987)

```diff
@@ js_protocol.pdl:1330 @@ domain Runtime
   # Will cancel the termination when the outer-most script execution ends.
   experimental command terminateExecution
 
+  # Adds binding with the given name on the global objects of all inspected
+  # contexts, including those created later. Bindings survive reloads.
+  # Binding function takes exactly one argument, this argument should be string,
+  # in case of any other input, function throws an exception.
+  # Each binding function call produces Runtime.bindingCalled notification.
+  experimental command addBinding
+    parameters
+      string name
+
+  # This method does not remove binding function from global object but
+  # unsubscribes current runtime agent from Runtime.bindingCalled notifications.
+  experimental command removeBinding
+    parameters
+      string name
+
+  # Notification is issued every time when binding is called.
+  experimental event bindingCalled
+    parameters
+      string name
+      string payload
+      # Identifier of the context where the call was made.
+      ExecutionContextId executionContextId
+
   # Issued when console API was called.
   event consoleAPICalled
     parameters
```

## Roll protocol to r563694 — _2018-06-01T17:15:46.000Z_
######  Diff: [`686864e...38129ec`](https://github.com/ChromeDevTools/devtools-protocol/compare/686864e...38129ec)

```diff
@@ js_protocol.pdl:1314 @@ domain Runtime
       # Exception details.
       optional ExceptionDetails exceptionDetails
 
+  # Enables or disables async call stacks tracking.
+  command setAsyncCallStackDepth
+    redirect Debugger
+    parameters
+      # Maximum depth of async call stacks. Setting to `0` will effectively disable collecting async
+      # call stacks (default).
+      integer maxDepth
+
   experimental command setCustomObjectFormatterEnabled
     parameters
       boolean enabled
```

## Roll protocol to r563547 — _2018-06-01T06:15:35.000Z_
######  Diff: [`8490a4e...686864e`](https://github.com/ChromeDevTools/devtools-protocol/compare/8490a4e...686864e)

```diff
@@ browser_protocol.pdl:5742 @@ domain Target
     parameters
       TargetID targetId
 
+  # Issued when a target has crashed.
+  event targetCrashed
+    parameters
+      TargetID targetId
+      # Termination status type.
+      string status
+      # Termination error code.
+      integer errorCode
+
   # Issued when some information about a target has changed. This only happens between
   # `targetCreated` and `targetDestroyed`.
   event targetInfoChanged
```

## Roll protocol to r563180 — _2018-05-31T08:15:44.000Z_
######  Diff: [`a53449b...8490a4e`](https://github.com/ChromeDevTools/devtools-protocol/compare/a53449b...8490a4e)

```diff
@@ browser_protocol.pdl:3709 @@ domain Network
       # Signed exchange response signature.
       array of SignedExchangeSignature signatures
 
+  # Field type for a signed exchange related error.
+  experimental type SignedExchangeErrorField extends string
+    enum
+      signatureSig
+      signatureIntegrity
+      signatureCertUrl
+      signatureCertSha256
+      signatureValidityUrl
+      signatureTimestamps
+
+  # Information about a signed exchange response.
+  experimental type SignedExchangeError extends object
+    properties
+      # Error message.
+      string message
+      # The index of the signature which caused the error.
+      optional integer signatureIndex
+      # The field which caused the error.
+      optional SignedExchangeErrorField errorField
+
   # Information about a signed exchange response.
   experimental type SignedExchangeInfo extends object
     properties
@@ -3719,7 +3739,7 @@ domain Network
       # Security details for the signed exchange header.
       optional SecurityDetails securityDetails
       # Errors occurred while handling the signed exchagne.
-      optional array of string errors
+      optional array of SignedExchangeError errors
 
   # Tells whether clearing browser cache is supported.
   deprecated command canClearBrowserCache
```

## Roll protocol to r562716 — _2018-05-30T03:15:40.000Z_
######  Diff: [`1c585c3...a53449b`](https://github.com/ChromeDevTools/devtools-protocol/compare/1c585c3...a53449b)

```diff
@@ browser_protocol.pdl:2321 @@ domain Emulation
       # change is not observed by the page, e.g. viewport-relative elements do not change positions.
       experimental optional Page.Viewport viewport
 
+  experimental command setScrollbarsHidden
+    parameters
+      # Whether scrollbars should be always hidden.
+      boolean hidden
+
   experimental command setEmitTouchEventsForMouse
     parameters
       # Whether touch emulation based on mouse input should be enabled.
```

## Roll protocol to r562010 — _2018-05-25T21:17:24.000Z_
######  Diff: [`05729d1...1c585c3`](https://github.com/ChromeDevTools/devtools-protocol/compare/05729d1...1c585c3)

```diff
@@ browser_protocol.pdl:2348 @@ domain Emulation
       optional number accuracy
 
   # Overrides value returned by the javascript navigator object.
-  experimental command setNavigatorOverrides
+  experimental deprecated command setNavigatorOverrides
     parameters
       # The platform navigator.platform should return.
       string platform
@@ -2420,6 +2420,16 @@ domain Emulation
       # enabled.
       number virtualTimeElapsed
 
+  # Allows overriding user agent with the given string.
+  command setUserAgentOverride
+    parameters
+      # User agent to use.
+      string userAgent
+      # Browser langugage to emulate.
+      optional string acceptLanguage
+      # The platform navigator.platform should return.
+      optional string platform
+
 # This domain provides experimental commands only supported in headless mode.
 experimental domain HeadlessExperimental
   depends on Page
@@ -3960,9 +3970,14 @@ domain Network
 
   # Allows overriding user agent with the given string.
   command setUserAgentOverride
+    redirect Emulation
     parameters
       # User agent to use.
       string userAgent
+      # Browser langugage to emulate.
+      optional string acceptLanguage
+      # The platform navigator.platform should return.
+      optional string platform
 
   # Fired when data chunk was received over the network.
   event dataReceived
```

## Roll protocol to r561764 — _2018-05-25T04:16:41.000Z_
######  Diff: [`7369468...05729d1`](https://github.com/ChromeDevTools/devtools-protocol/compare/7369468...05729d1)

```diff
@@ browser_protocol.pdl:3662 @@ domain Network
     properties
       # Signed exchange signature label.
       string label
+      # The hex string of signed exchange signature.
+      string signature
       # Signed exchange signature integrity.
       string integrity
       # Signed exchange signature cert Url.
-      string certUrl
+      optional string certUrl
+      # The hex string of signed exchange signature cert sha256.
+      optional string certSha256
       # Signed exchange signature validity Url.
       string validityUrl
       # Signed exchange signature date.
       integer date
       # Signed exchange signature expires.
       integer expires
+      # The encoded certificates.
+      optional array of string certificates
 
   # Information about a signed exchange header.
   # https://wicg.github.io/webpackage/draft-yasskin-httpbis-origin-signed-exchanges-impl.html#cbor-representation
```

## Roll protocol to r560325 — _2018-05-21T19:16:45.000Z_
######  Diff: [`375788c...7369468`](https://github.com/ChromeDevTools/devtools-protocol/compare/375788c...7369468)

```diff
@@ browser_protocol.pdl:2028 @@ experimental domain DOMSnapshot
       optional array of DOMDebugger.EventListener eventListeners
       # The selected url for nodes with a srcset attribute.
       optional string currentSourceURL
+      # The url of the script (if any) that generates this node.
+      optional string originURL
 
   # Details of post layout rendered text positions. The exact layout should not be regarded as
   # stable and may change between versions.
@@ -2074,6 +2076,12 @@ experimental domain DOMSnapshot
       # Attribute/property value.
       string value
 
+  # Disables DOM snapshot agent for the given page.
+  command disable
+
+  # Enables DOM snapshot agent for the given page.
+  command enable
+
   # Returns a document snapshot, including the full DOM tree of the root node (including iframes,
   # template contents, and imported documents) in a flattened array, as well as layout and
   # white-listed computed style information for the nodes. Shadow DOM in the returned DOM tree is
```

## Roll protocol to r560288 — _2018-05-21T17:16:32.000Z_
######  Diff: [`9ba7e8e...375788c`](https://github.com/ChromeDevTools/devtools-protocol/compare/9ba7e8e...375788c)

```diff
@@ browser_protocol.pdl:3542 @@ domain Network
         parser
         script
         preload
+        SignedExchange
         other
       # Initiator JavaScript stack trace, set for Script only.
       optional Runtime.StackTrace stack
-      # Initiator URL, set for Parser type or for Script type (when script is importing module).
+      # Initiator URL, set for Parser type or for Script type (when script is importing module) or for SignedExchange type.
       optional string url
       # Initiator line number, set for Parser type or for Script type (when script is importing
       # module) (0-based).
```

## Roll protocol to r559758 — _2018-05-18T01:17:25.000Z_
######  Diff: [`f1dbfcc...9ba7e8e`](https://github.com/ChromeDevTools/devtools-protocol/compare/f1dbfcc...9ba7e8e)

```diff
@@ browser_protocol.pdl:2382 @@ domain Emulation
       # If set, base::Time::Now will be overriden to initially return this value.
       optional Network.TimeSinceEpoch initialVirtualTime
     returns
-      # Absolute timestamp at which virtual time was first enabled (milliseconds since epoch).
-      Runtime.Timestamp virtualTimeBase
       # Absolute timestamp at which virtual time was first enabled (up time in milliseconds).
       number virtualTimeTicksBase
 
@@ -2435,18 +2433,9 @@ experimental domain HeadlessExperimental
   # https://goo.gl/3zHXhB for more background.
   command beginFrame
     parameters
-      # Timestamp of this BeginFrame (milliseconds since epoch). If not set, the current time will
-      # be used unless frameTicks is specified.
-      optional Runtime.Timestamp frameTime
       # Timestamp of this BeginFrame in Renderer TimeTicks (milliseconds of uptime). If not set,
-      # the current time will be used unless frameTime is specified.
+      # the current time will be used.
       optional number frameTimeTicks
-      # Deadline of this BeginFrame (milliseconds since epoch). If not set, the deadline will be
-      # calculated from the frameTime and interval unless deadlineTicks is specified.
-      optional Runtime.Timestamp deadline
-      # Deadline of this BeginFrame in Renderer TimeTicks  (milliseconds of uptime). If not set,
-      # the deadline will be calculated from the frameTime and interval unless deadline is specified.
-      optional number deadlineTicks
       # The interval between BeginFrames that is reported to the compositor, in milliseconds.
       # Defaults to a 60 frames/second interval, i.e. about 16.666 milliseconds.
       optional number interval
```

## Roll protocol to r559378 — _2018-05-17T01:17:29.000Z_
######  Diff: [`fbaebb8...f1dbfcc`](https://github.com/ChromeDevTools/devtools-protocol/compare/fbaebb8...f1dbfcc)

```diff
@@ browser_protocol.pdl:3658 @@ domain Network
       # Stage at wich to begin intercepting requests. Default is Request.
       optional InterceptionStage interceptionStage
 
+  # Information about a signed exchange signature.
+  # https://wicg.github.io/webpackage/draft-yasskin-httpbis-origin-signed-exchanges-impl.html#rfc.section.3.1
+  experimental type SignedExchangeSignature extends object
+    properties
+      # Signed exchange signature label.
+      string label
+      # Signed exchange signature integrity.
+      string integrity
+      # Signed exchange signature cert Url.
+      string certUrl
+      # Signed exchange signature validity Url.
+      string validityUrl
+      # Signed exchange signature date.
+      integer date
+      # Signed exchange signature expires.
+      integer expires
+
+  # Information about a signed exchange header.
+  # https://wicg.github.io/webpackage/draft-yasskin-httpbis-origin-signed-exchanges-impl.html#cbor-representation
+  experimental type SignedExchangeHeader extends object
+    properties
+      # Signed exchange request URL.
+      string requestUrl
+      # Signed exchange request method.
+      string requestMethod
+      # Signed exchange response code.
+      integer responseCode
+      # Signed exchange response headers.
+      Headers responseHeaders
+      # Signed exchange response signature.
+      array of SignedExchangeSignature signatures
+
   # Information about a signed exchange response.
   experimental type SignedExchangeInfo extends object
     properties
       # The outer response of signed HTTP exchange which was received from network.
       Response outerResponse
+      # Information about the signed exchange header.
+      optional SignedExchangeHeader header
+      # Security details for the signed exchange header.
+      optional SecurityDetails securityDetails
+      # Errors occurred while handling the signed exchagne.
+      optional array of string errors
 
   # Tells whether clearing browser cache is supported.
   deprecated command canClearBrowserCache
```

## Roll protocol to r558951 — _2018-05-16T03:17:16.000Z_
######  Diff: [`089aa20...fbaebb8`](https://github.com/ChromeDevTools/devtools-protocol/compare/089aa20...fbaebb8)

```diff
@@ browser_protocol.pdl:3283 @@ domain Network
       NameNotResolved
       InternetDisconnected
       AddressUnreachable
+      BlockedByClient
+      BlockedByResponse
 
   # UTC time in seconds, counted from January 1, 1970.
   type TimeSinceEpoch extends number
```

## Roll protocol to r558587 — _2018-05-15T02:17:03.000Z_
######  Diff: [`981276a...089aa20`](https://github.com/ChromeDevTools/devtools-protocol/compare/981276a...089aa20)

```diff
@@ browser_protocol.pdl:2465 @@ experimental domain HeadlessExperimental
       # Base64-encoded image data of the screenshot, if one was requested and successfully taken.
       optional string screenshotData
 
-  # Puts the browser into deterministic mode.  Only effective for subsequently created web contents.
-  # Only supported in headless mode.  Once set there's no way of leaving deterministic mode.
-  command enterDeterministicMode
-    parameters
-      # Number of seconds since the Epoch
-      optional number initialDate
-
   # Disables headless events for the target.
   command disable
```

## Roll protocol to r558111 — _2018-05-12T04:17:36.000Z_
######  Diff: [`50de366...981276a`](https://github.com/ChromeDevTools/devtools-protocol/compare/50de366...981276a)

```diff
@@ browser_protocol.pdl:3456 @@ domain Network
   # The reason why request was blocked.
   type BlockedReason extends string
     enum
+      other
       csp
       mixed-content
       origin
       inspector
       subresource-filter
       content-type
-      other
 
   # HTTP response data.
   type Response extends object
```

## Roll protocol to r557426 — _2018-05-10T02:16:30.000Z_
######  Diff: [`2dd2129...50de366`](https://github.com/ChromeDevTools/devtools-protocol/compare/2dd2129...50de366)

```diff
@@ browser_protocol.pdl:4347 @@ domain Page
       EventSource
       WebSocket
       Manifest
+      SignedExchange
       Other
 
   # Unique frame identifier.
```

## Roll protocol to r557245 — _2018-05-09T18:16:32.000Z_
######  Diff: [`fe1ebc7...2dd2129`](https://github.com/ChromeDevTools/devtools-protocol/compare/fe1ebc7...2dd2129)

```diff
@@ browser_protocol.pdl:3663 @@ domain Network
       # Stage at wich to begin intercepting requests. Default is Request.
       optional InterceptionStage interceptionStage
 
+  # Information about a signed exchange response.
+  experimental type SignedExchangeInfo extends object
+    properties
+      # The outer response of signed HTTP exchange which was received from network.
+      Response outerResponse
+
   # Tells whether clearing browser cache is supported.
   deprecated command canClearBrowserCache
     returns
@@ -4050,6 +4056,14 @@ domain Network
       # Timestamp.
       MonotonicTime timestamp
 
+  # Fired when a signed exchange was received over the network
+  experimental event signedExchangeReceived
+    parameters
+      # Request identifier.
+      RequestId requestId
+      # Information about the signed exchange response.
+      SignedExchangeInfo info
+
   # Fired when HTTP response is available.
   event responseReceived
     parameters
```

## Roll protocol to r556981 — _2018-05-08T22:17:35.000Z_
######  Diff: [`eef9084...fe1ebc7`](https://github.com/ChromeDevTools/devtools-protocol/compare/eef9084...fe1ebc7)

```diff
@@ browser_protocol.pdl:5528 @@ domain Target
       # The id of the context created.
       BrowserContextID browserContextId
 
+  # Returns all browser contexts created with `Target.createBrowserContext` method.
+  experimental command getBrowserContexts
+    returns
+      # An array of browser context ids.
+      array of BrowserContextID browserContextIds
+
   # Creates a new page.
   command createTarget
     parameters
```

## Roll protocol to r556911 — _2018-05-08T19:17:45.000Z_
######  Diff: [`c3f4857...eef9084`](https://github.com/ChromeDevTools/devtools-protocol/compare/c3f4857...eef9084)

```diff
@@ browser_protocol.pdl:5537 @@ domain Target
       optional integer width
       # Frame height in DIP (headless chrome only).
       optional integer height
-      # The browser context to create the page in (headless chrome only).
+      # The browser context to create the page in.
       optional BrowserContextID browserContextId
       # Whether BeginFrames for this target will be controlled via DevTools (headless chrome only,
       # not supported on MacOS yet, false by default).
@@ -5554,12 +5554,11 @@ domain Target
       # Deprecated.
       deprecated optional TargetID targetId
 
-  # Deletes a BrowserContext, will fail of any open page uses it.
+  # Deletes a BrowserContext. All the belonging pages will be closed without calling their
+  # beforeunload hooks.
   experimental command disposeBrowserContext
     parameters
       BrowserContextID browserContextId
-    returns
-      boolean success
 
   # Returns information about a target.
   experimental command getTargetInfo
```

## Roll protocol to r556284 — _2018-05-05T01:16:12.000Z_
######  Diff: [`e638d2b...c3f4857`](https://github.com/ChromeDevTools/devtools-protocol/compare/e638d2b...c3f4857)

```diff
@@ browser_protocol.pdl:5537 @@ domain Target
       optional integer width
       # Frame height in DIP (headless chrome only).
       optional integer height
-      # The browser context to create the page in.
+      # The browser context to create the page in (headless chrome only).
       optional BrowserContextID browserContextId
       # Whether BeginFrames for this target will be controlled via DevTools (headless chrome only,
       # not supported on MacOS yet, false by default).
@@ -5554,11 +5554,12 @@ domain Target
       # Deprecated.
       deprecated optional TargetID targetId
 
-  # Deletes a BrowserContext. All the belonging pages will be closed without calling their
-  # beforeunload hooks.
+  # Deletes a BrowserContext, will fail of any open page uses it.
   experimental command disposeBrowserContext
     parameters
       BrowserContextID browserContextId
+    returns
+      boolean success
 
   # Returns information about a target.
   experimental command getTargetInfo
```

## Roll protocol to r555991 — _2018-05-04T05:17:28.000Z_
######  Diff: [`7fff91e...e638d2b`](https://github.com/ChromeDevTools/devtools-protocol/compare/7fff91e...e638d2b)

```diff
@@ browser_protocol.pdl:3461 @@ domain Network
       origin
       inspector
       subresource-filter
+      content-type
       other
 
   # HTTP response data.
```

## Roll protocol to r555920 — _2018-05-04T00:17:33.000Z_
######  Diff: [`71093c0...7fff91e`](https://github.com/ChromeDevTools/devtools-protocol/compare/71093c0...7fff91e)

```diff
@@ browser_protocol.pdl:124 @@ experimental domain Accessibility
       relevant
       root
       autocomplete
-      haspopup
+      hasPopup
       level
       multiselectable
       orientation
```

## Roll protocol to r555642 — _2018-05-03T01:17:15.000Z_
######  Diff: [`1bac408...71093c0`](https://github.com/ChromeDevTools/devtools-protocol/compare/1bac408...71093c0)

```diff
@@ browser_protocol.pdl:5536 @@ domain Target
       optional integer width
       # Frame height in DIP (headless chrome only).
       optional integer height
-      # The browser context to create the page in (headless chrome only).
+      # The browser context to create the page in.
       optional BrowserContextID browserContextId
       # Whether BeginFrames for this target will be controlled via DevTools (headless chrome only,
       # not supported on MacOS yet, false by default).
@@ -5553,12 +5553,11 @@ domain Target
       # Deprecated.
       deprecated optional TargetID targetId
 
-  # Deletes a BrowserContext, will fail of any open page uses it.
+  # Deletes a BrowserContext. All the belonging pages will be closed without calling their
+  # beforeunload hooks.
   experimental command disposeBrowserContext
     parameters
       BrowserContextID browserContextId
-    returns
-      boolean success
 
   # Returns information about a target.
   experimental command getTargetInfo
```

## Roll protocol to r555444 — _2018-05-02T17:16:49.000Z_
######  Diff: [`3db7418...847cc8f`](https://github.com/ChromeDevTools/devtools-protocol/compare/3db7418...847cc8f)

```diff
@@ browser_protocol.pdl:2379 @@ domain Emulation
       # If set the virtual time policy change should be deferred until any frame starts navigating.
       # Note any previous deferred policy change is superseded.
       optional boolean waitForNavigation
+      # If set, base::Time::Now will be overriden to initially return this value.
+      optional Network.TimeSinceEpoch initialVirtualTime
     returns
       # Absolute timestamp at which virtual time was first enabled (milliseconds since epoch).
       Runtime.Timestamp virtualTimeBase
```