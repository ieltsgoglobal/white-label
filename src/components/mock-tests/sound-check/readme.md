# Sound check: future error guide

`SoundTest.tsx` plays the local sample MP3. **Next** becomes available after the
audio element emits `ended`.

## Handled now

### Sample MP3 cannot load

- Reproduce: temporarily rename `sample-sound.mp3`, or set DevTools Network to
  **Offline** before clicking **Play Sound**.
- Current: shows connection/output troubleshooting.
- Browser event: audio `error`.

### MP3 cannot be decoded

- Reproduce: temporarily replace the MP3 with an invalid file using the same name.
- Current: shows the same playback troubleshooting.
- Browser event: audio `error`.

### Browser rejects `audio.play()`

- Reproduce: call the function outside a click, or use an iframe with restrictive
  autoplay policy.
- Current: shows browser/tab-muted troubleshooting.
- Browser signal: rejected `play()` promise.

### Student presses Play repeatedly

- Reproduce: click **Play Sound** several times quickly.
- Current: pauses the previous audio before creating a new audio element.

## Not solved yet

### Browser tab or device output is muted

- Reproduce: mute the browser tab, device, speakers, or headphones before playing.
- Current: the browser reports successful playback, then the student must confirm
  that they heard it before they can continue.

### Output is routed to the wrong device

- Reproduce: route system audio to another speaker/Bluetooth device.
- Current: playback can still succeed even when routed to the wrong device, but the
  student must confirm hearing it and can retry or use device-specific help.

### Audio stalls and does not finish

- Reproduce: throttle or interrupt the request in DevTools Network.
- Current: **Next** remains disabled because `ended` never fires.
- Future: add a playback timeout and Retry button.

### Student leaves while audio is playing

- Reproduce: click **Play Sound**, then move to a different phase/page.
- Current: the component pauses the sample audio on unmount.

## Current pass condition

The MP3 must finish playing, then the student must explicitly confirm they heard it
before **Next** is enabled. This validates browser playback and gives the student a
practical chance to catch muted or misrouted output before starting the test.

# Links could point to wrong documentaions
