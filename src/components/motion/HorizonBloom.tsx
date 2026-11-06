"use client";

import {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export interface HorizonBloomHandle {
  /** Raise an aurora at x (-1 left … 1 right) with a strength multiplier. */
  bloom: (x?: number, strength?: number) => void;
  /** Replay the sunrise intro. */
  replay: () => void;
}

export interface HorizonBloomProps {
  colors?: [string, string];
  backgroundColor?: string;
  horizon?: number;
  curvature?: number;
  tilt?: number;
  sunPosition?: number;
  sunrise?: number;
  spread?: number;
  atmosphere?: number;
  thickness?: number;
  rim?: number;
  flare?: number;
  airglow?: number;
  clouds?: number;
  stars?: number;
  aurora?: number;
  autoAurora?: boolean;
  speed?: number;
  drift?: number;
  parallax?: number;
  bloom?: number;
  grain?: number;
  interactive?: boolean;
  intro?: boolean;
  paused?: boolean;
  dpr?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime, uIntro;
uniform vec2 uMouse;
uniform vec3 uC0, uC1, uBg;
uniform float uHorizon, uCurv, uTilt, uSunPos, uSunrise, uSpread, uAtmos, uThick,
  uRim, uFlare, uAir, uClouds, uStars, uAurora, uSpeed, uDrift, uPar, uBloom, uGrain;
uniform vec3 uPulses[3];

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), f.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++){ s += a * noise(p); p *= 2.03; a *= 0.5; } return s; }

vec3 toOk(vec3 c){
  float l = 0.4122214708*c.r + 0.5363325363*c.g + 0.0514459929*c.b;
  float m = 0.2119034982*c.r + 0.6806995451*c.g + 0.1073969566*c.b;
  float s = 0.0883024619*c.r + 0.2817188376*c.g + 0.6299787005*c.b;
  l = pow(max(l,0.0), 1.0/3.0); m = pow(max(m,0.0), 1.0/3.0); s = pow(max(s,0.0), 1.0/3.0);
  return vec3(0.2104542553*l + 0.7936177850*m - 0.0040720468*s,
              1.9779984951*l - 2.4285922050*m + 0.4505937099*s,
              0.0259040371*l + 0.7827717662*m - 0.8086757660*s);
}
vec3 fromOk(vec3 c){
  float l = c.x + 0.3963377774*c.y + 0.2158037573*c.z;
  float m = c.x - 0.1055613458*c.y - 0.0638541728*c.z;
  float s = c.x - 0.0894841775*c.y - 1.2914855480*c.z;
  l = l*l*l; m = m*m*m; s = s*s*s;
  return max(vec3(4.0767416621*l - 3.3077115913*m + 0.2309699292*s,
                 -1.2684380046*l + 2.6097574011*m - 0.3413193965*s,
                 -0.0041960863*l - 0.7034186147*m + 1.7076147010*s), 0.0);
}
vec3 mixOk(vec3 a, vec3 b, float t){ return fromOk(mix(toOk(a), toOk(b), clamp(t, 0.0, 1.0))); }

void main(){
  float aspect = uRes.x / uRes.y;
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y);

  // Pointer parallax: slight roll + shift.
  float ang = radians(uTilt) + uMouse.x * 0.025 * uPar;
  vec2 q = p - vec2(0.0, 0.5);
  q = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * q;
  p = q + vec2(0.0, 0.5) + uMouse * vec2(0.025, 0.014) * uPar;

  float e = uIntro;
  float t = uTime;

  // Planet limb.
  float R = 2.64 / uCurv;
  float ytop = 1.0 - uHorizon;
  vec2 c = vec2(0.0, ytop - R);
  vec2 v = p - c;
  float d = length(v) - R;

  // Sun on the limb.
  float xs = clamp(uSunPos * aspect * 0.5 + sin(t * 0.3 * uSpeed) * uDrift * 0.3 + uMouse.x * 0.18 * uPar, -R * 0.95, R * 0.95);
  vec2 ps = vec2(xs, c.y + sqrt(R * R - xs * xs));
  float s = (atan(v.x, v.y) - atan(ps.x - c.x, ps.y - c.y)) * R;
  float sig = uSpread * 0.6 * (0.45 + 0.55 * e);
  float light = exp(-s * s / (2.0 * sig * sig)) * (0.25 + 0.75 * e);
  float lit = 0.09 + light;

  vec3 glow = vec3(0.0);
  float out_ = smoothstep(-0.003, 0.002, d);

  // Atmosphere.
  float h = max(d, 0.0) / (0.085 * uThick);
  vec3 atmoCol = mixOk(uC0, uC1, smoothstep(0.0, 1.8, h));
  float atm = exp(-h * 1.5) * lit + exp(-h * 0.9) * light * 0.06;
  glow += atmoCol * atm * 0.55 * uAtmos * out_;
  // Faint night-side limb inside the planet.
  glow += uC0 * exp(min(d, 0.0) * 70.0) * lit * 0.05 * (1.0 - out_);

  // Razor-thin rim.
  float rimI = exp(-max(d, 0.0) * 420.0) * smoothstep(-0.0035, 0.0, d);
  vec3 rimCol = mixOk(uC0, vec3(1.0, 0.86, 0.80), light * 0.85);
  glow += rimCol * rimI * uRim * (0.22 + 1.7 * light) * (0.3 + 0.7 * e);

  // Sun flare + horizontal streak.
  vec2 fp = p - ps;
  float fl = exp(-length(fp * vec2(1.0, 1.5)) * 48.0) * 1.3
           + exp(-abs(fp.y) * 240.0) * exp(-abs(fp.x) * 8.0) * 0.45;
  fl *= smoothstep(-0.006, 0.004, d + 0.004);
  glow += mixOk(uC0, vec3(1.0, 0.9, 0.85), 0.7) * fl * uFlare * (0.35 + uSunrise * 1.6) * e;

  // Airglow band above the atmosphere.
  float bandD = 0.17 * uThick + 0.012 * sin(p.x * 3.0 + t * 0.2 * uSpeed);
  float ag = exp(-pow((d - bandD) / 0.03, 2.0)) * (0.4 + 0.6 * noise(vec2(p.x * 4.0, t * 0.1 * uSpeed)));
  glow += uC1 * ag * (0.25 + light) * 0.11 * uAir * out_;

  // Cloud tops catching light just inside the limb.
  float cd = max(-d, 0.0);
  float band = smoothstep(0.0, 0.004, cd) * exp(-cd * 45.0) * (1.0 - out_);
  float cn = fbm(vec2(s * 14.0, cd * 90.0 + t * 0.03 * uSpeed));
  glow += mixOk(uC0, vec3(1.0), 0.3) * pow(cn, 2.2) * band * light * uClouds * 1.4;

  // Stars.
  vec2 gp = (vec2(uv.x * aspect, uv.y) + uMouse * vec2(0.01, 0.0056) * uPar) * 220.0;
  vec2 id = floor(gp);
  vec2 f = fract(gp) - 0.5;
  float hs = hash(id);
  vec2 off = (vec2(hash(id + 1.7), hash(id + 9.1)) - 0.5) * 0.6;
  float star = step(0.992, hs) * smoothstep(0.2, 0.0, length(f - off));
  star *= 0.55 + 0.45 * sin(t * uSpeed * 3.0 + hs * 60.0);
  star *= smoothstep(0.0, 0.25, d) * (1.0 - clamp(atm * 1.5, 0.0, 1.0));
  glow += vec3(0.95, 0.9, 0.9) * star * uStars * 0.8;

  // Aurora curtains.
  float aur = 0.0;
  for (int i = 0; i < 3; i++){
    vec3 pu = uPulses[i];
    if (pu.y >= 0.0){
      float age = t - pu.y;
      float env = smoothstep(0.0, 0.9, age) * exp(-age * 0.26) * pu.z;
      float w = exp(-pow((p.x - pu.x * aspect * 0.5) / 0.55, 2.0));
      aur += env * w;
    }
  }
  if (aur > 0.001){
    float warp = fbm(vec2(d * 3.0, t * 0.1 * uSpeed)) * 0.12;
    float rays = pow(noise(vec2((p.x + warp) * 38.0 + sin(t * 0.3 * uSpeed) * 2.0, t * 0.15 * uSpeed)), 1.6) * 1.7;
    float prof = smoothstep(0.0, 0.02, d) * exp(-max(d, 0.0) / (0.1 + 0.32 * min(aur, 1.2)));
    vec3 aCol = mixOk(uC0, uC1, smoothstep(0.0, 0.6, d) * 0.8 + 0.1);
    glow += aCol * rays * prof * aur * uAurora * 0.9;
  }

  // Soft bloom on highlights, then tone-map the glow only.
  glow += glow * glow * uBloom * 0.7;
  glow = 1.0 - exp(-glow * 1.25);

  vec3 col = uBg + glow;

  // Film grain on lit areas.
  float lum = dot(glow, vec3(0.3, 0.59, 0.11));
  col += (hash(gl_FragCoord.xy + fract(t) * 91.0) - 0.5) * uGrain * 0.09 * smoothstep(0.02, 0.5, lum);

  col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));
  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToLinear(hex: string): [number, number, number] {
  let h = hex.trim().replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((x) => x + x)
      .join("");
  const n = parseInt(h.slice(0, 6), 16);
  const ch = (v: number) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return [ch((n >> 16) & 255), ch((n >> 8) & 255), ch(n & 255)];
}

const HorizonBloom = forwardRef<HorizonBloomHandle, HorizonBloomProps>(
  function HorizonBloom(
    {
      colors = ["#ff1200", "#ff0028"],
      backgroundColor = "#0A0A0A",
      horizon = 0.67,
      curvature = 2.33,
      tilt = 0,
      sunPosition = 0.02,
      sunrise = 0.53,
      spread = 0.4,
      atmosphere = 1,
      thickness = 1,
      rim = 1,
      flare = 1,
      airglow = 0.5,
      clouds = 0.5,
      stars = 0.5,
      aurora = 0,
      autoAurora = false,
      speed = 0.5,
      drift = 0.5,
      parallax = 0.5,
      bloom = 0.5,
      grain = 0.25,
      interactive = true,
      intro = true,
      paused = false,
      dpr = 2,
      children,
      className = "",
      style,
    },
    ref,
  ) {
    const rootRef = useRef<HTMLDivElement>(null);
    const dprValue = useRef(dpr);
    dprValue.current = dpr;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Latest props, read by the render loop without re-creating the GL context.
    const propsRef = useRef({
      colors,
      backgroundColor,
      horizon,
      curvature,
      tilt,
      sunPosition,
      sunrise,
      spread,
      atmosphere,
      thickness,
      rim,
      flare,
      airglow,
      clouds,
      stars,
      aurora,
      speed,
      drift,
      parallax,
      bloom,
      grain,
      intro,
      paused,
      autoAurora,
      interactive,
    });
    propsRef.current = {
      colors,
      backgroundColor,
      horizon,
      curvature,
      tilt,
      sunPosition,
      sunrise,
      spread,
      atmosphere,
      thickness,
      rim,
      flare,
      airglow,
      clouds,
      stars,
      aurora,
      speed,
      drift,
      parallax,
      bloom,
      grain,
      intro,
      paused,
      autoAurora,
      interactive,
    };

    const apiRef = useRef<HorizonBloomHandle>({
      bloom: () => {},
      replay: () => {},
    });
    useImperativeHandle(ref, () => ({
      bloom: (x, s) => apiRef.current.bloom(x, s),
      replay: () => apiRef.current.replay(),
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      const root = rootRef.current;
      if (!canvas || !root) return;

      const gl = canvas.getContext("webgl", {
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      });
      if (!gl) return;

      const compile = (type: number, src: string) => {
        const sh = gl.createShader(type)!;
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
          console.error(gl.getShaderInfoLog(sh));
        }
        return sh;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(prog));
        return;
      }
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      const loc = gl.getAttribLocation(prog, "aPos");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      const U: Record<string, WebGLUniformLocation | null> = {};
      const u = (name: string) =>
        (U[name] ??= gl.getUniformLocation(prog, name));

      const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const start = performance.now();
      let introStart = start;
      const pulses: { x: number; t0: number; s: number }[] = [];
      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      let visible = true;
      let raf = 0;
      let lastAuto = 0;

      const nowSec = () => (performance.now() - start) / 1000;

      apiRef.current = {
        bloom: (x = (Math.random() - 0.5) * 1.2, s = 1) => {
          pulses.push({ x: Math.max(-1, Math.min(1, x)), t0: nowSec(), s });
          if (pulses.length > 3) pulses.shift();
          if (staticMode()) render();
        },
        replay: () => {
          introStart = performance.now();
        },
      };

      const staticMode = () => propsRef.current.paused || reduceMq.matches;

      const resize = () => {
        const maxDpr = Math.max(
          1,
          Math.min(dprRef(), window.devicePixelRatio || 1),
        );
        const w = Math.max(1, Math.floor(root.clientWidth * maxDpr));
        const h = Math.max(1, Math.floor(root.clientHeight * maxDpr));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        gl.viewport(0, 0, w, h);
        if (staticMode()) render();
      };
      const dprRef = () => dprValue.current;

      const render = () => {
        const P = propsRef.current;
        const stat = staticMode();
        const time = stat ? 8 : nowSec();
        const introT =
          !P.intro || stat
            ? 1
            : Math.min(1, (performance.now() - introStart) / 3200);
        const e = 1 - Math.pow(1 - introT, 3);

        mouse.x += (mouse.tx - mouse.x) * 0.06;
        mouse.y += (mouse.ty - mouse.y) * 0.06;

        if (P.autoAurora && !stat && time - lastAuto > 7) {
          lastAuto = time;
          pulses.push({ x: (Math.random() - 0.5) * 1.4, t0: time, s: 0.9 });
          if (pulses.length > 3) pulses.shift();
        }

        const c0 = hexToLinear(P.colors[0]);
        const c1 = hexToLinear(P.colors[1]);
        const bg = hexToLinear(
          P.backgroundColor === "transparent" ? "#000000" : P.backgroundColor,
        );

        gl.uniform2f(u("uRes"), canvas.width, canvas.height);
        gl.uniform1f(u("uTime"), time);
        gl.uniform1f(u("uIntro"), e);
        gl.uniform2f(u("uMouse"), mouse.x, mouse.y);
        gl.uniform3f(u("uC0"), c0[0], c0[1], c0[2]);
        gl.uniform3f(u("uC1"), c1[0], c1[1], c1[2]);
        gl.uniform3f(u("uBg"), bg[0], bg[1], bg[2]);
        gl.uniform1f(u("uHorizon"), P.horizon);
        gl.uniform1f(u("uCurv"), Math.max(0.2, P.curvature));
        gl.uniform1f(u("uTilt"), P.tilt);
        gl.uniform1f(u("uSunPos"), P.sunPosition);
        gl.uniform1f(u("uSunrise"), P.sunrise);
        gl.uniform1f(u("uSpread"), Math.max(0.05, P.spread));
        gl.uniform1f(u("uAtmos"), P.atmosphere);
        gl.uniform1f(u("uThick"), Math.max(0.1, P.thickness));
        gl.uniform1f(u("uRim"), P.rim);
        gl.uniform1f(u("uFlare"), P.flare);
        gl.uniform1f(u("uAir"), P.airglow);
        gl.uniform1f(u("uClouds"), P.clouds);
        gl.uniform1f(u("uStars"), P.stars);
        gl.uniform1f(u("uAurora"), P.aurora);
        gl.uniform1f(u("uSpeed"), P.speed);
        gl.uniform1f(u("uDrift"), P.drift);
        gl.uniform1f(u("uPar"), P.interactive ? P.parallax : 0);
        gl.uniform1f(u("uBloom"), P.bloom);
        gl.uniform1f(u("uGrain"), P.grain);

        const flat = new Float32Array(9);
        for (let i = 0; i < 3; i++) {
          const pu = pulses[i];
          flat[i * 3] = pu ? pu.x : 0;
          flat[i * 3 + 1] = pu ? pu.t0 : -1;
          flat[i * 3 + 2] = pu ? pu.s : 0;
        }
        gl.uniform3fv(u("uPulses"), flat);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const loop = () => {
        raf = 0;
        if (!visible || document.hidden || staticMode()) return;
        render();
        raf = requestAnimationFrame(loop);
      };
      const kick = () => {
        if (!raf && visible && !document.hidden && !staticMode())
          raf = requestAnimationFrame(loop);
        else if (staticMode()) render();
      };

      const ro = new ResizeObserver(resize);
      ro.observe(root);
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        kick();
      });
      io.observe(root);
      document.addEventListener("visibilitychange", kick);
      reduceMq.addEventListener("change", kick);

      const onMove = (ev: PointerEvent) => {
        if (!propsRef.current.interactive) return;
        const r = root.getBoundingClientRect();
        mouse.tx = ((ev.clientX - r.left) / r.width - 0.5) * 2;
        mouse.ty = -((ev.clientY - r.top) / r.height - 0.5) * 2;
      };
      const onLeave = () => {
        mouse.tx = 0;
        mouse.ty = 0;
      };
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);

      resize();
      kick();

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", kick);
        reduceMq.removeEventListener("change", kick);
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onLeave);
        gl.deleteBuffer(buf);
        gl.deleteProgram(prog);
      };
    }, []);

    return (
      <div
        ref={rootRef}
        className={`relative isolate h-full min-h-[320px] w-full overflow-hidden ${className}`}
        style={{ background: backgroundColor, ...style }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full"
        />
        {children}
      </div>
    );
  },
);

export default HorizonBloom;
