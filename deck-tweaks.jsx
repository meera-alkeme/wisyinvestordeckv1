// deck-tweaks.jsx — Tweaks panel for the Wisy Pre-A deck.
// Presentation-level controls only — headline/body copy is edited directly.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cover": "indigo",
  "motion": true
}/*EDITMODE-END*/;

function applyCover(val) { document.body.dataset.cover = val; }
function applyMotion(on) {
  document.body.dataset.motion = on ? 'on' : 'off';
  // pause/resume SVG SMIL (animateMotion pulses) alongside the CSS freeze
  document.querySelectorAll('deck-stage svg').forEach(function (svg) {
    try { on ? svg.unpauseAnimations() : svg.pauseAnimations(); } catch (e) {}
  });
}

function DeckTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyCover(t.cover); }, [t.cover]);
  React.useEffect(() => { applyMotion(t.motion); }, [t.motion]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Cover" />
      <TweakRadio
        label="Cover panel"
        value={t.cover}
        options={[{ value: "indigo", label: "Indigo" }, { value: "ink", label: "Ink" }]}
        onChange={(v) => setTweak('cover', v)}
      />
      <TweakSection label="Motion" />
      <TweakToggle
        label="Live animations"
        value={t.motion}
        onChange={(v) => setTweak('motion', v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<DeckTweaks />);
