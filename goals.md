# 🧠 Hemi-Lab Ultra - Technical Project Brief

## **Project Overview**
A browser-based consciousness exploration platform that combines binaural beat audio therapy,
Monroe Institute focus level protocols, and session tracking. Think "meditation app meets 
neurofeedback lab" with a cyberpunk aesthetic.

---

## **Tech Stack & Architecture**

### **Frontend (Single Page Application)**
```
Framework: Vanilla JS / React / SvelteKit (team preference)
Audio: Web Audio API + Tone.js library
Animations: CSS3 + GSAP/SVG for visualizations
Storage: IndexedDB for session data + localStorage for settings
Styling: Modern CSS (gradients, blur effects, dark theme)
```

### **Audio Engine Core**
```
- Binaural beat generator (stereo oscillators with frequency offset)
- Isochronic pulse layer (square wave modulation)
- Real-time frequency manipulation
- Gain/volume control with smooth transitions
- Audio context management for mobile compatibility
```

### **Optional Backend (Phase 2)**
```
Node.js + Express
Database: PostgreSQL for user sessions, MongoDB for journal text
API endpoints for sync, AI journal analysis, group sessions
WebSocket for real-time group synchronization
```

---

## **Core Features Breakdown**

### **1. Audio Generation System**
```javascript
// Primary components needed:
class BinauralEngine {
  - createStereoOscillators(leftFreq, rightFreq)
  - applyBeatFrequency(baseFreq, beatDelta) 
  - enableIsochronicLayer(pulseRate)
  - fadeIn/fadeOut controls
  - frequencyDrift mode (for altered states)
}
```

### **2. Focus Level Navigator**
```javascript
// Preset management system
const focusPresets = {
  10: { baseFreq: 100, beatFreq: 7.5, description: "Body asleep, mind awake" },
  12: { baseFreq: 110, beatFreq: 9, description: "Expanded awareness" },
  15: { baseFreq: 80, beatFreq: 1, description: "No-time zone" },
  21: { baseFreq: 90, beatFreq: 4, description: "Gateway threshold" },
  "23+": { baseFreq: 70, beatFreq: 2.5, description: "Contact states" }
}
```

### **3. REBAL Visualization Module**
```css
/* Animated energy orb with CSS/SVG */
.rebal-orb {
  - Pulsing animation synced to breath cycle
  - Gradient effects (cyan/magenta/green)
  - Rotation animation for energy field
  - Scale transforms for expansion/contraction
}
```

### **4. Session Management**
```javascript
class SessionManager {
  - startSession(focusLevel, duration, options)
  - trackSessionTime()
  - saveSessionData(journalEntry, mood, insights)
  - analyzeSessionPatterns()
  - detectContactEvents(journalText)
}
```

### **5. Data Layer**
```javascript
// Local storage schema
sessionData: {
  id: uuid,
  timestamp: ISO8601,
  focusLevel: string,
  duration: seconds,
  audioSettings: {...},
  moodBefore/After: 1-10,
  journalText: string,
  contactEvent: boolean
}
```

---

## **User Interface Requirements**

### **Visual Design Language**
- **Theme**: Cyberpunk consciousness lab
- **Colors**: Cyan (#00ff88), Blue (#0099ff), Magenta (#ff0088), Dark navy background
- **Typography**: Monospace font (Courier New) for terminal aesthetic
- **Effects**: Glassmorphism, neon glows, subtle animations

### **Layout Structure**
```
┌─────────────────────────────────────┐
│  Header: Logo + Status              │
├──────────────────┬──────────────────┤
│  Visualization   │  Control Panel   │
│  (REBAL Orb +    │  - Focus Levels  │
│   Breath Coach)  │  - Audio Sliders │
│                  │  - Start/Stop    │
│                  │  - Session Info  │
├──────────────────┴──────────────────┤
│  Journal + Statistics Section       │
└─────────────────────────────────────┘
```

### **Responsive Considerations**
- Mobile: Stack layout vertically
- Touch-friendly controls
- Audio context requires user gesture on mobile

---

## **Development Phases**

### **Phase 1 (MVP - 2-3 weeks)**
```
✅ Core audio engine (binaural + isochronic)
✅ Focus level presets with UI
✅ REBAL visualization
✅ Basic session timer + controls
✅ Local journal storage
✅ Session statistics
```

### **Phase 2 (Enhanced Features - 3-4 weeks)**
```
🔧 Session Composer (drag/drop audio layers)
🔧 Advanced breath coaching patterns
🔧 Pattern analysis algorithms
🔧 Contact mode probability system
✅ Affirmation layer (TTS integration)
🔧 Export/import session data
```

### **Phase 3 (Advanced Platform - 4-6 weeks)**
```
🌐 Backend API + user accounts
🤖 AI journal analysis (OpenAI/Claude integration)
👥 Group session synchronization
📊 Advanced analytics dashboard
🎛️ Custom frequency programming
🧬 Experimental protocols (entropy drift, etc.)
```

---

## **Technical Challenges & Solutions**

### **Audio Context Management**
```javascript
// Mobile browser audio limitations
- Requires user gesture to start AudioContext
- Handle context suspend/resume states
- Graceful degradation for unsupported features
```

### **Performance Optimization**
```javascript
// Smooth audio without glitches
- Use exponentialRampToValueAtTime for frequency changes
- Minimize garbage collection during sessions
- Efficient DOM updates for visualizations
```

### **Cross-browser Compatibility**
```javascript
// Web Audio API support
- Feature detection for AudioContext
- Fallback strategies for older browsers
- Handle different audio latency across devices
```

---

## **API Specifications (Phase 2+)**

### **Session Endpoints**
```
POST /api/sessions - Create new session
GET /api/sessions/:userId - Get user session history
PUT /api/sessions/:id - Update session with journal
GET /api/analytics/:userId - Get pattern analysis
```

### **Journal Analysis**
```
POST /api/journal/analyze - AI analysis of journal text
GET /api/journal/patterns - Detect recurring themes
POST /api/journal/contact - Flag potential contact events
```

---

## **Testing Strategy**

### **Unit Tests**
- Audio frequency accuracy
- Session timer precision
- Data persistence reliability
- Pattern detection algorithms

### **Integration Tests**
- Full session workflow
- Journal saving/loading
- Cross-device synchronization
- Audio engine stress tests

### **User Testing**
- A/B test different Focus level presets
- Usability testing on mobile devices
- Long-session stability testing
- Audio quality assessment

---

## **Deployment & Hosting**

### **Frontend**
```
- Static hosting (Vercel/Netlify)
- CDN for Tone.js library
- Progressive Web App (PWA) capabilities
- Offline functionality via service workers
```

### **Backend (Phase 2)**
```
- Node.js hosting (Railway/Render)
- PostgreSQL database
- Redis for session caching
- WebSocket server for real-time features
```

---

## **Success Metrics**

### **Technical KPIs**
- Audio latency < 50ms
- Session completion rate > 80%
- Mobile compatibility score > 95%
- Zero audio dropouts during sessions

### **User Experience KPIs**
- Average session length > 15 minutes
- Journal completion rate > 60%
- Return usage within 7 days > 40%
- Contact event detection accuracy

---

## **Getting Started Checklist**

```
□ Set up development environment
□ Install Tone.js and test basic audio generation
□ Create basic HTML structure with responsive layout
□ Implement core audio engine (binaural beats)
□ Add Focus level preset system
□ Build REBAL visualization with CSS animations
□ Implement session timer and controls
□ Create local storage data layer
□ Add journal interface and statistics
□ Test across devices and browsers
□ Deploy MVP to staging environment
```

---

**This is a unique project combining neuroscience, spiritual practice, 
and cutting-edge web technology. The team should expect to learn about
consciousness research, audio synthesis, and create something that genuinely 
helps people explore altered states of awareness.** 🧠✨
