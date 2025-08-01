class BinauralEngine {
  constructor(context, gainNode) {
    this.context =
      context ||
      new (typeof AudioContext !== "undefined"
        ? AudioContext
        : require("web-audio-mock-api").AudioContext)();
    this.leftOsc = null;
    this.rightOsc = null;
    this.gainNode = gainNode || this.context.createGain();
    this.filter = this.context.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.value = 12000;
    this.filter.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.driftInterval = null;
    this.driftStep = 0;
    this.isochronicOsc = null;
    this.isoGain = null;
    this.waveType = "sine";
  }

  start(baseFreq, beatFreq, volume = 0.5, waveType = "sine") {
    this.stop();
    this.leftOsc = this.context.createOscillator();
    this.rightOsc = this.context.createOscillator();
    this.waveType = waveType;
    this.leftOsc.type = waveType;
    this.rightOsc.type = waveType;
    const merger = this.context.createChannelMerger(2);
    this.leftOsc.frequency.value = baseFreq;
    this.rightOsc.frequency.value = baseFreq + beatFreq;
    this.leftOsc.connect(merger, 0, 0);
    this.rightOsc.connect(merger, 0, 1);
    merger.connect(this.filter);
    this.setVolume(0);
    if (this.leftOsc.start) this.leftOsc.start();
    if (this.rightOsc.start) this.rightOsc.start();
    this.setVolume(volume);
  }

  update(baseFreq, beatFreq) {
    const now = this.context.currentTime;
    if (baseFreq !== undefined && this.leftOsc) {
      if (this.leftOsc.frequency.cancelScheduledValues) {
        this.leftOsc.frequency.cancelScheduledValues(now);
      }
      if (this.leftOsc.frequency.setTargetAtTime) {
        this.leftOsc.frequency.setTargetAtTime(baseFreq, now, 0.1);
      }
      this.leftOsc.frequency.value = baseFreq;
    }
    if (this.rightOsc) {
      const base = baseFreq !== undefined ? baseFreq : this.leftOsc.frequency.value;
      if (beatFreq !== undefined) {
        const freq = base + beatFreq;
        if (this.rightOsc.frequency.cancelScheduledValues) {
          this.rightOsc.frequency.cancelScheduledValues(now);
        }
        if (this.rightOsc.frequency.setTargetAtTime) {
          this.rightOsc.frequency.setTargetAtTime(freq, now, 0.1);
        }
        this.rightOsc.frequency.value = freq;
      }
    }
  }

  setVolume(vol) {
    const now = this.context.currentTime;
    if (this.gainNode.gain.cancelScheduledValues) {
      this.gainNode.gain.cancelScheduledValues(now);
    }
    if (this.gainNode.gain.setTargetAtTime) {
      this.gainNode.gain.setTargetAtTime(vol, now, 0.1);
    }
    this.gainNode.gain.value = vol;
  }

  setWaveType(type) {
    this.waveType = type;
    if (this.leftOsc) this.leftOsc.type = type;
    if (this.rightOsc) this.rightOsc.type = type;
  }
  startIsochronic(rate = 10, volume = 0.1) {
    this.stopIsochronic();
    this.isochronicOsc = this.context.createOscillator();
    this.isoGain = this.context.createGain();
    this.isochronicOsc.type = "square";
    this.isochronicOsc.frequency.value = rate;
    this.isochronicOsc.connect(this.isoGain);
    this.isoGain.gain.value = volume;
    this.isoGain.connect(this.gainNode);
    if (this.isochronicOsc.start) this.isochronicOsc.start();
  }

  stopIsochronic() {
    if (this.isochronicOsc) {
      if (this.isochronicOsc.stop) this.isochronicOsc.stop();
      this.isochronicOsc.disconnect();
      this.isoGain.disconnect();
      this.isochronicOsc = null;
      this.isoGain = null;
    }
  }

  startDrift(period = 60, min = 3, max = 7) {
    this.stopDrift();
    this.driftPeriod = period;
    this.driftMin = min;
    this.driftMax = max;
    this.driftStep = 0;
    this.driftInterval = setInterval(() => {
      this.driftStep = (this.driftStep + 0.1) % this.driftPeriod;
      const phase = this.driftStep / this.driftPeriod;
      const progress = phase < 0.5 ? phase * 2 : (1 - phase) * 2;
      const beat = this.driftMin + (this.driftMax - this.driftMin) * progress;
      this.update(undefined, beat);
    }, 100);
  }

  stopDrift() {
    if (this.driftInterval) {
      clearInterval(this.driftInterval);
      this.driftInterval = null;
    }
  }

  stop() {
    this.stopDrift();
    const now = this.context.currentTime;
    this.setVolume(0);
    const stopAt = now + 0.1;
    if (this.leftOsc) {
      if (this.leftOsc.frequency && this.leftOsc.frequency.cancelScheduledValues) {
        this.leftOsc.frequency.cancelScheduledValues(now);
      }
      if (this.leftOsc.stop) this.leftOsc.stop(stopAt);
      this.leftOsc.disconnect();
      this.leftOsc = null;
    }
    if (this.rightOsc) {
      if (
        this.rightOsc.frequency &&
        this.rightOsc.frequency.cancelScheduledValues
      ) {
        this.rightOsc.frequency.cancelScheduledValues(now);
      }
      if (this.rightOsc.stop) this.rightOsc.stop(stopAt);
      this.rightOsc.disconnect();
      this.rightOsc = null;
    }
    // leave filter connected for next session
  }
}

if (typeof module !== 'undefined') {
  module.exports = BinauralEngine;
}
if (typeof window !== 'undefined') {
  window.BinauralEngine = BinauralEngine;
}
