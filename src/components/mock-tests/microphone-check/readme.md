# Microphone check: future error guide

`MicrophoneTest.tsx` uses the browser's native microphone and recording APIs.
Use this guide when investigating a student report.

## Handled now

### Permission is blocked

- Reproduce: in an incognito window, reload and click **Block** on the mic prompt.
- Current: shows permission instructions, the YouTube help link, and **Try Again**.
- Browser error: `NotAllowedError`.

### No microphone is available

- Reproduce: disconnect a USB/Bluetooth headset and disable the built-in input.
- Current: asks the student to connect or enable a microphone.
- Browser error: `NotFoundError`.

### Another app owns the microphone

- Reproduce: start Zoom, Teams, OBS, or another recorder, then open the test.
- Current: asks the student to close the competing app/tab and retry.
- Browser errors: `NotReadableError` or `AbortError`.

### The recorder stops after access is granted

- Reproduce: disconnect/disable the microphone while recording.
- Current: shows “Recording stopped unexpectedly”.
- Browser event: `MediaRecorder.onerror`.

### The recorder creates no audio data

- Reproduce: mock `MediaRecorder` without non-empty `dataavailable` events.
- Current: shows “No audio was recorded”.

### Browser/device setup fails for another reason

- Reproduce: use an old webview/browser or force an unknown `getUserMedia` error.
- Current: shows generic device/browser-settings guidance.

## Not solved yet

### Mic is muted, silent, or too quiet

- Reproduce: mute the hardware microphone and make a recording.
- Why: a silent audio file still has bytes, so it is not an empty recording.
- Current fallback: the student must listen to the preview and use **Test Again**.
- Future: add an `AudioContext` input-level meter and silence threshold.

### Wrong microphone is selected

- Reproduce: connect several mics and make the wrong one the browser/OS default.
- Current: the browser default is always used.
- Future: show an input-device selector after permission is granted.

### Permission prompt stays open

- Reproduce: use a fresh browser profile and leave the permission popup unanswered.
- Current: `getUserMedia()` can wait forever without a visible explanation.
- Future: add a loading state, timeout, and help text.

### Mic disconnects before recording starts

- Reproduce: allow access, unplug the headset, then press **Start Recording**.
- Current: a browser may report a generic recording error; no dedicated message.
- Future: listen for the track `ended` event and show reconnect guidance.

### Playback cannot be heard

- Reproduce: record successfully, mute speakers, or route sound to another output.
- Current: the student must explicitly confirm that they heard the preview before
  continuing. This is the practical check for speaker/output routing and audible
  microphone capture.
- Remaining limitation: the app cannot independently verify physical output, and
  the native audio control does not currently expose a custom playback-error UI.

### Browser security/policy blocks microphone access

- Reproduce: use a non-secure HTTP domain, embedded webview, or managed browser.
- Current: `SecurityError` is shown as a permission problem.
- Future: give HTTPS and browser-policy instructions separately.

### Resource cleanup

- Reproduce: start a test, navigate away, and inspect the browser mic indicator.
- Current: active recording and stream tracks are stopped on unmount; preview URLs
  are revoked when replaced or unmounted.

## Current pass condition

Allow microphone → record → stop → play the preview → explicitly confirm it was
heard → continue. The confirmation is the student's practical validation that the
selected microphone captured usable audio and that their output device works.

# Links could point to wrong documentaions
