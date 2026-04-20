// A simple rule-based engine mapping UI components to affinity scores

const COMPONENT_TAGS = {
  'hero_pricing_btn': 'pricing',
  'docs_link': 'technical',
  'case_studies_scroll': 'enterprise'
};

const UI_CONFIG_STATES = {
  default: {
    heroMode: 'standard', // Show generic copy
    showEnterpriseCTA: false,
    navStyle: 'clean'
  },
  enterprise_focused: {
    heroMode: 'enterprise', // Change copy to enterprise pitch
    showEnterpriseCTA: true,
    navStyle: 'bold'
  },
  price_sensitive: {
    heroMode: 'discount', // Show discount or direct pricing
    showEnterpriseCTA: false,
    navStyle: 'clean'
  }
};

function processEventBatch(sessionId, events, io) {
  // Initialize session if not exists
  if (!global.activeSessions[sessionId]) {
    global.activeSessions[sessionId] = {
      affinity: { pricing: 0, technical: 0, enterprise: 0 },
      currentState: 'default'
    };
  }

  const session = global.activeSessions[sessionId];
  let stateChanged = false;

  // Rough scoring logic
  events.forEach(evt => {
    // evt structure: { componentId: 'xyz', type: 'dwell', duration: 5000 }
    const tag = COMPONENT_TAGS[evt.componentId];
    if (tag) {
      // +1 score for every 1 second of dwell, or +5 for a click
      const scoreAugment = evt.type === 'click' ? 5 : Math.floor((evt.duration || 0) / 1000);
      session.affinity[tag] += scoreAugment;
    }
  });

  // Evaluate rules
  if (session.affinity.enterprise > 15 && session.currentState !== 'enterprise_focused') {
    session.currentState = 'enterprise_focused';
    stateChanged = true;
  } else if (session.affinity.pricing > 10 && session.currentState !== 'price_sensitive') {
    session.currentState = 'price_sensitive';
    stateChanged = true;
  }

  // Push update to frontend over socket if there's a change
  if (stateChanged && io) {
    console.log(`[Engine] UI State Shift for ${sessionId}: ${session.currentState}`);
    io.emit(`ui_update_${sessionId}`, { layout: UI_CONFIG_STATES[session.currentState] });
  }
}

module.exports = {
  processEventBatch
};
