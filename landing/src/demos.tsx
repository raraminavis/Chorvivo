// DoDance product demos, rebuilt from the DoDance MVP screens with Stageshow (Benji Taylor, MIT).
// PhoneDemo — the four steps on the phone: record, parse and sort, compare, share.
// NotesPhone — the Comments screen on a phone, still.
// FlowDemo   — record on the phone, the take arrives on the laptop, then edit, comment and share there.
// Each step announces itself with a `dd:step` event so the page can light the matching step.
import { Stage, Phone, Roll, Collapse, type Act } from './kit'
import { ChevronLeft, Share, Play, Repeat, Mic, Scan, FlipHorizontal2, X, Check, Download, Eye, Pencil, ChevronRight, Send, Trash2, Archive, AlignJustify } from 'lucide-react'
import './demos.css'

const ASSETS = (window as unknown as { DD_ASSETS?: Record<string, string> }).DD_ASSETS || {}
const STUDIO = ASSETS.studio || 'assets/studio.jpg'
const HALLWAY = ASSETS.hallway || 'assets/hallway.jpg'
const step = (i: number) => dispatchEvent(new CustomEvent('dd:step', { detail: i }))

/* =============================== Phone =============================== */
type Scene = 'cam' | 'parse' | 'work' | 'takes'
type P = { scene: Scene; rec: boolean; secs: number; pct: number; landed: boolean; pull: number; card: number; inUse: boolean; sheet: boolean; pick: number; fade: boolean }
const P0: P = { scene: 'cam', rec: false, secs: 0, pct: 0, landed: false, pull: 0, card: 0, inUse: false, sheet: false, pick: -1, fade: false }

const phoneScript = async (a: Act<P>) => {
  step(0)
  await a.wait(900)
  a.mark('record')
  await a.click('rec')
  a.put({ rec: true })
  for (let i = 0; i < 4; i++) { await a.wait(650); a.put((s) => ({ secs: s.secs + 1 })) }
  await a.click('rec')
  a.put({ rec: false })
  await a.wait(250)

  step(1)
  a.mark('parse')
  a.put({ scene: 'parse', pct: 0 })
  await a.wait(350)
  for (let p = 4; p <= 100; p += 4) { await a.wait(p < 60 ? 55 : 75); a.put({ pct: p }) }
  await a.wait(350)
  a.put({ scene: 'work', landed: true })
  await a.wait(1800)

  step(2)
  a.mark('compare')
  await a.click('slotC')
  a.put({ scene: 'takes' })
  await a.wait(900)
  await a.move('card')
  const top = a.rect('card').y
  await a.drag({ at: 'card', x: 0.5, y: 0.05 }, (p, from) => a.put({ pull: Math.min(0, p.y - from.y) }), { duration: 520 })
  a.put({ card: 1, pull: 0 })
  void top
  await a.wait(700)
  await a.click('use')
  a.put({ inUse: true })
  await a.wait(1100)

  step(3)
  a.mark('share')
  await a.click('close')
  a.put({ scene: 'work' })
  await a.wait(500)
  await a.click('share')
  a.put({ sheet: true })
  await a.wait(700)
  await a.click('row-view')
  a.put({ pick: 1 })
  await a.wait(2000)

  a.put({ fade: true })
  await a.wait(450)
  await a.snap({ ...P0, fade: true })
  a.put({ fade: false })
  await a.wait(400)
}

const Btn = ({ children, t, className = '', label }: { children: React.ReactNode; t?: string; className?: string; label: string }) => (
  <span className={'dd-circ ' + className} data-target={t} role="img" aria-label={label}>{children}</span>
)

function Camera({ on, rec, secs }: { on: boolean; rec: boolean; secs: number }) {
  return (
    <div className="dd-cam" data-on={on || undefined}>
      <img className="dd-bg" src={STUDIO} alt="" />
      <span className="dd-cam__pill" data-on={rec || undefined}><i /><span className="dd-tnum">00:0<Roll>{String(secs)}</Roll></span></span>
      <button type="button" className="dd-cam__rec" data-target="rec" data-on={rec || undefined} aria-label={rec ? 'Stop' : 'Record'}><span /></button>
    </div>
  )
}

// After a take stops: the app reads it and files it into its section.
function Parsing({ on, pct }: { on: boolean; pct: number }) {
  return (
    <div className="dd-parse" data-on={on || undefined}>
      <img className="dd-bg" src={STUDIO} alt="" />
      <div className="dd-parse__body">
        <span className="dd-parse__label">Parsing…</span>
        <span className="dd-parse__pct">{pct}%</span>
        <span className="dd-parse__bar"><i style={{ width: pct + '%' }} /></span>
      </div>
    </div>
  )
}

function Work({ s }: { s: P }) {
  const dim = s.scene === 'takes' || s.sheet
  return (
    <div className="dd-work" data-on={s.scene === 'work' || s.scene === 'takes' || undefined} data-arrive={s.landed || undefined} data-dim={dim || undefined} data-blur={s.scene === 'takes' || undefined}>
      <img className="dd-bg dd-bg--top" src={HALLWAY} alt="" />
      <div className="dd-work__shade" />
      <div className="dd-top">
        <Btn label="Back"><ChevronLeft size={22} /></Btn>
        <span className="dd-top__title">Hallway</span>
        <span className="dd-top__right"><Btn t="share" label="Share"><Share size={19} /></Btn><span className="dd-pill">Edit</span></span>
      </div>
      <span className="dd-play dd-play--ghost"><Play size={26} fill="currentColor" /></span>
      <div className="dd-meta">
        <Btn label="Full screen" className="dd-circ--sm"><Scan size={17} /></Btn>
        <span className="dd-time">2:05 / 4:25</span>
        <span className="dd-meta__r"><Btn label="Mirror" className="dd-circ--sm"><FlipHorizontal2 size={17} /></Btn><span className="dd-circ dd-circ--sm dd-speed">1×</span></span>
      </div>
      <div className="dd-label"><span className="dd-tile">C</span>Chorus</div>
      <div className="dd-strip">
        <span className="dd-th dd-th--a"><img src={STUDIO} alt="" /></span>
        <span className="dd-th dd-th--b"><img src={HALLWAY} alt="" /><b>B</b><em><i />2</em></span>
        <span className="dd-th dd-th--c" data-target="slotC"><img src={HALLWAY} alt="" /><b>C</b><i className="dd-head" />
          <em><i />4</em></span>
        <span className="dd-th dd-th--d"><img src={STUDIO} alt="" /><b>D</b><em><i />1</em></span>
      </div>
      <div className="dd-ctrl">
        <Btn label="Loop" className="dd-circ--lg"><Repeat size={22} /></Btn>
        <span className="dd-play"><Play size={26} fill="currentColor" /></span>
        <Btn label="Voice memo" className="dd-circ--lg"><Mic size={22} /></Btn>
      </div>
      <div className="dd-dots"><i /><i data-on /><i /></div>
    </div>
  )
}

function Takes({ s }: { s: P }) {
  const cards = [
    { t: 'T3', d: '9/6 · 0:39', src: HALLWAY, bar: 0.55 },
    { t: 'T4', d: '0:04', src: STUDIO, bar: 0.2 }
  ]
  return (
    <div className="dd-takes" data-on={s.scene === 'takes' || undefined}>
      <div className="dd-takes__head"><span className="dd-tile dd-tile--lg">C</span><span className="dd-takes__title">Chorus</span><Btn t="close" label="Close"><X size={22} /></Btn></div>
      <div className="dd-stack" style={{ ['--pull' as string]: `${s.pull}px` }}>
        {cards.map((c, i) => {
          const pos = i - s.card // 0 = centre, -1 = above, 1 = below
          return (
            <div key={c.t} className="dd-card" data-pos={pos} data-target={pos === 0 ? 'card' : undefined}>
              <img src={c.src} alt="" />
              {pos === 0 && (s.inUse || (i === 0 && s.card === 0)) && <span className="dd-check"><Check size={18} strokeWidth={2.6} /></span>}
              <span className="dd-card__foot"><b>{c.t}</b><span>{c.d}</span></span>
              <span className="dd-card__bar"><i style={{ width: `${c.bar * 100}%` }} /></span>
            </div>
          )
        })}
      </div>
      <span className="dd-use" data-target="use" data-solid={(s.card === 1 && !s.inUse) || undefined}>{s.card === 1 && !s.inUse ? 'Use for C' : 'In use for C'}</span>
    </div>
  )
}

function Sheet({ s }: { s: P }) {
  const rows = [
    { k: 'MP4', d: 'Download', I: Download },
    { k: 'View', d: 'View only', I: Eye },
    { k: 'Edit', d: 'Full access', I: Pencil }
  ]
  return (
    <div className="dd-sheet" data-on={s.sheet || undefined}>
      <span className="dd-sheet__grab" />
      <div className="dd-sheet__head"><span>Share</span><X size={22} /></div>
      {rows.map((r, i) => (
        <div key={r.k} className="dd-row" data-target={i === 1 ? 'row-view' : undefined} data-on={s.pick === i || undefined}>
          <span className="dd-row__icon"><r.I size={22} /></span>
          <span className="dd-row__text"><b>{r.k}</b><span>{r.d}</span></span>
          <ChevronRight size={20} />
        </div>
      ))}
    </div>
  )
}

export function PhoneDemo() {
  return (
    <Stage<P> width={420} height={860} initial={P0} poster={{ ...P0, scene: 'work', landed: true }} script={phoneScript}
      cursor={{ at: { x: 360, y: 820 }, style: 'touch' }} theme="dark" accent="#D21619" className="dd-demo dd-demo--phone" unframed>
      {(s) => (
        <Phone width={380} dark className="dd-phone">
          <div className="dd-screen" data-fade={s.fade || undefined}>
            <Work s={s} />
            <Camera on={s.scene === 'cam'} rec={s.rec} secs={s.secs} />
            <Parsing on={s.scene === 'parse'} pct={s.pct} />
            <Takes s={s} />
            <Sheet s={s} />
          </div>
        </Phone>
      )}
    </Stage>
  )
}


/* =============================== Notes phone (still) =============================== */
// The Comments screen from the MVP, scaled to sit between the status bar and the home indicator.
export function NotesPhone({ src }: { src: string }) {
  return (
    <Stage width={420} height={860} theme="dark" className="dd-demo dd-demo--notes" unframed>
      {() => (
        <Phone width={380} dark className="dd-phone">
          <div className="dd-screen dd-screen--still"><img className="dd-still" src={src} alt="" /></div>
        </Phone>
      )}
    </Stage>
  )
}

/* =============================== Phone to laptop =============================== */
type F = { rec: boolean; secs: number; phoneOut: boolean; awake: boolean; arrived: boolean; sec: number; tag: number; draft: string; posted: boolean; share: boolean; pick: number; fade: boolean }
const F0: F = { rec: false, secs: 0, phoneOut: false, awake: false, arrived: false, sec: 2, tag: 0, draft: '', posted: false, share: false, pick: -1, fade: false }
const NOTE = 'Warm wash comes up on the lift'
const SECTIONS = [['A', 'Intro', '0:00–0:40'], ['B', 'Verse', '0:40–1:50'], ['C', 'Chorus', '1:50–2:50'], ['D', 'Bridge', '2:50–3:35'], ['E', 'Outro', '3:35–4:25']]
const TIMES = ['0:00', '0:40', '2:05', '2:50', '3:35']
const NOTES = [
  { t: '1:58', k: 'Note', v: true, x: '“Hit the turn on 5, not 6. Arms stay low through the chorus.”' },
  { t: '2:11', k: 'Lighting', x: 'Spotlight follows the dancer on the left from here.' },
  { t: '2:30', k: 'Lighting', x: 'Black out the background, light only the dancers.' },
  { t: '3:34', k: 'Camera', v: true, x: '“Slow push-in on the bridge, stay wide on the group.”' }
]
const TAGS = ['Note', 'Lighting', 'Camera', 'Idea', 'Question']

const flowScript = async (a: Act<F>) => {
  await a.wait(800)
  a.mark('record')
  await a.click('rec')
  a.put({ rec: true })
  for (let i = 0; i < 3; i++) { await a.wait(600); a.put((s) => ({ secs: s.secs + 1 })) }
  await a.click('rec')
  a.put({ rec: false })
  await a.wait(300)
  a.mark('handoff')
  a.put({ phoneOut: true })
  await a.wait(450)
  a.put({ awake: true })
  await a.wait(500)
  a.put({ arrived: true })
  await a.wait(1100)
  a.mark('edit')
  await a.click('sec-3')
  a.put({ sec: 3 })
  await a.wait(600)
  a.mark('comment')
  await a.click('tag-1')
  a.put({ tag: 1 })
  await a.click('draft')
  await a.type('draft', NOTE, { interval: 34 })
  await a.wait(250)
  await a.click('add')
  a.put({ posted: true, draft: '' })
  await a.wait(1000)
  a.mark('share')
  await a.click('d-share')
  a.put({ share: true })
  await a.wait(600)
  await a.click('d-view')
  a.put({ pick: 1 })
  await a.wait(2200)
  a.put({ fade: true })
  await a.wait(450)
  await a.snap({ ...F0, fade: true })
  a.put({ fade: false })
  await a.wait(500)
}

export function FlowDemo() {
  return (
    <Stage<F> width={1100} height={700} initial={F0} poster={{ ...F0, phoneOut: true, awake: true, arrived: true, sec: 3, tag: 1, posted: true }} script={flowScript}
      cursor={{ at: { x: 330, y: 660 }, style: 'real' }} theme="dark" accent="#D21619" className="dd-demo dd-demo--flow" unframed>
      {(s) => (
        <div className="dd-flow" data-fade={s.fade || undefined}>
          <div className="dd-laptop">
            <div className="dd-laptop__lid">
              <span className="dd-laptop__cam" />
              <div className="dd-laptop__screen">
                <div className="dd-laptop__scale"><DeskUI s={s} /></div>
                <div className="dd-laptop__sleep" data-off={s.awake || undefined} />
              </div>
            </div>
            <div className="dd-laptop__base"><span /></div>
          </div>
          <Phone width={210} dark className="dd-flow__phone" data-out={s.phoneOut || undefined}>
            <div className="dd-screen"><Camera on rec={s.rec} secs={s.secs} /></div>
          </Phone>
        </div>
      )}
    </Stage>
  )
}

function DeskUI({ s }: { s: F }) {
  const shareRows = [
    { k: 'MP4', d: 'Download', I: Download },
    { k: 'View', d: 'View only', I: Eye },
    { k: 'Edit', d: 'Full access', I: Pencil }
  ]
  return (
    <div className="dd-desk">
      <header className="dd-dtop">
        <span className="dd-dtop__back"><ChevronLeft size={16} />Works</span>
        <span className="dd-dtop__title">Hallway</span>
        <span className="dd-dtop__r"><span className="dd-dbtn">Edit</span><span className="dd-dbtn dd-dbtn--solid" data-target="d-share"><Send size={14} />Share</span></span>
      </header>
      <aside className="dd-side">
        {SECTIONS.map(([k, n, r], i) => (
          <div key={k} className="dd-sec" data-on={s.sec === i || undefined} data-target={'sec-' + i}>
            <span className="dd-sec__k">{k}</span><span className="dd-sec__t"><b>{n}</b><span>{r}</span></span>
            {(i === 1 || i === 2 || i === 4) && <AlignJustify size={14} className="dd-sec__i" />}
          </div>
        ))}
        <div className="dd-side__foot"><span><Trash2 size={15} />Fodder<em>3</em></span><span><Archive size={15} />Archive<em>3</em></span></div>
      </aside>
      <main className="dd-stagev">
        <img className="dd-bg" src={s.sec === 3 ? STUDIO : HALLWAY} alt="" />
        <div className="dd-stagev__shade" />
        <span className="dd-play dd-play--ghost dd-play--d"><Play size={20} fill="currentColor" /></span>
        <div className="dd-dmeta"><span className="dd-circ dd-circ--xs"><Scan size={13} /></span><span><Roll>{TIMES[s.sec]}</Roll> / 4:25</span></div>
        <div className="dd-dlabel"><span className="dd-tile dd-tile--sm">{SECTIONS[s.sec][0]}</span><Roll>{SECTIONS[s.sec][1]}</Roll></div>
        <div className="dd-dstrip">
          {SECTIONS.map(([k], i) => (
            <span key={k} className="dd-dth" data-on={s.sec === i || undefined} data-new={(i === 2 && s.arrived) || undefined} style={{ flex: [2, 3, 3.2, 2.4, 2.6][i] }}>
              <img src={i % 2 ? HALLWAY : STUDIO} alt="" /><b>{k}</b>{i === 2 && <em><i /><Roll>{s.arrived ? '4' : '3'}</Roll></em>}
            </span>
          ))}
        </div>
        <div className="dd-dctrl"><span className="dd-circ dd-circ--sm"><Repeat size={16} /></span><span className="dd-play dd-play--md"><Play size={20} fill="currentColor" /></span><span className="dd-circ dd-circ--sm"><Mic size={16} /></span></div>
      </main>
      <aside className="dd-notes">
        <div className="dd-notes__head"><span className="dd-notes__title">Notes <em><Roll>{s.posted ? '5' : '4'}</Roll></em></span><span className="dd-seg"><b>Open</b><span>Done</span></span></div>
        <div className="dd-chips">{['All', 'Voice', ...TAGS.slice(0, 4)].map((c, i) => <span key={c} className="dd-chip" data-on={i === 0 || undefined}>{c}</span>)}</div>
        <div className="dd-list">
          {NOTES.slice(0, 3).map((n) => <Note key={n.t} {...n} />)}
          <Collapse open={s.posted}><Note t="2:50" k="Lighting" x={NOTE} fresh /></Collapse>
          <Note {...NOTES[3]} />
        </div>
        <div className="dd-compose">
          <span className="dd-at">At {TIMES[s.sec]}</span>
          <div className="dd-chips">{TAGS.map((c, i) => <span key={c} className="dd-chip" data-on={s.tag === i || undefined} data-target={'tag-' + i}>{c}</span>)}</div>
          <div className="dd-field-row">
            <span className="dd-field" data-target="draft">{s.draft || <i>Type a note</i>}</span>
            <span className="dd-add" data-target="add" data-on={s.draft.length > 0 || undefined}>Add</span>
          </div>
        </div>
      </aside>
      <div className="dd-dshare" data-on={s.share || undefined}>
        <div className="dd-dshare__head">Share</div>
        {shareRows.map((r, i) => (
          <div key={r.k} className="dd-drow" data-on={s.pick === i || undefined} data-target={i === 1 ? 'd-view' : undefined}>
            <span className="dd-drow__icon"><r.I size={16} /></span><span className="dd-drow__text"><b>{r.k}</b><span>{r.d}</span></span><ChevronRight size={15} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Note({ t, k, x, v, fresh }: { t: string; k: string; x: string; v?: boolean; fresh?: boolean }) {
  return (
    <div className="dd-note" data-fresh={fresh || undefined}>
      <span className="dd-note__bar" />
      <div><div className="dd-note__meta"><span>{t}</span><b>{k}</b>{v && <Mic size={11} />}</div><p>{x}</p></div>
      <span className="dd-note__ring" />
    </div>
  )
}
