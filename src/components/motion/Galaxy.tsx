"use client";

import { CSSProperties, useEffect, useRef } from "react";

export interface GalaxyProps {
  density?: number;
  glowIntensity?: number;
  flareIntensity?: number;
  starSpeed?: number;
  mouseRepulsion?: boolean;
  clickWarp?: boolean;
  starColors?: string[];
  hueShift?: number;
  saturation?: number;
  starSize?: number;
  twinkleIntensity?: number;
  speed?: number;
  rotationSpeed?: number;
  layers?: number;
  direction?: "forward" | "backward";
  repulsionStrength?: number;
  mouseInteraction?: boolean;
  intro?: boolean;
  lightMode?: boolean;
  paused?: boolean;
  dpr?: number;
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
uniform float uTime, uTravel, uIntro, uDensity, uGlow, uFlare, uSize, uTwinkle, uSat, uHue, uRot, uRepel, uLight;
uniform vec2 uParallax, uMouse;
uniform vec3 uCols[3];
uniform float uLayers;

float hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }

vec3 starLayer(vec2 uv, float seed, float scale){
  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);
  vec3 c = vec3(0.0);
  for (int y = -1; y <= 1; y++){
    for (int x = -1; x <= 1; x++){
      vec2 o = vec2(float(x), float(y));
      vec2 cell = id + o + seed;
      float n = hash21(cell);
      float present = step(0.55, n);
      vec2 jitter = (vec2(hash21(cell + 7.1), hash21(cell + 13.7)) - 0.5) * 0.8;
      vec2 pos = o + jitter - gv;
      float mag = fract(n * 37.7);
      float size = 0.25 + 0.75 * mag * mag * mag;
      // Sizes are in reference screen pixels (900px tall) so stars stay tiny at every depth.
      vec2 pp = pos * 900.0 / scale;
      float d2 = dot(pp, pp);
      float r = (0.7 + 0.9 * size) * uSize;
      float core = exp(-d2 / (r * r)) * (0.5 + 1.6 * size);
      float halo = uGlow * size * 1.2 / (d2 + 5.0) * smoothstep(14.0, 0.0, sqrt(d2));
      float big = step(0.965, fract(n * 91.3));
      float spikes = (exp(-abs(pp.x) / 0.55) * exp(-abs(pp.y) / 11.0) +
                      exp(-abs(pp.y) / 0.55) * exp(-abs(pp.x) / 11.0)) * big * size * uFlare * 0.5;
      float tw = 1.0 - uTwinkle + uTwinkle * (0.5 + 0.5 * sin(uTime * (1.5 + n * 4.0) + n * 60.0));
      float k = fract(n * 13.7);
      vec3 col = k < 0.333 ? uCols[0] : (k < 0.666 ? uCols[1] : uCols[2]);
      c += col * (core + halo + spikes) * tw * present;
    }
  }
  return c;
}

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  // Pointer parallax and repulsion.
  p -= uParallax;
  vec2 dm = p - uMouse;
  p -= normalize(dm + 1e-4) * uRepel * 0.14 * exp(-dot(dm, dm) * 9.0);

  float a = uTime * uRot * 0.1;
  p = mat2(cos(a), -sin(a), sin(a), cos(a)) * p;

  vec3 col = vec3(0.0);
  for (int i = 0; i < 5; i++){
    if (float(i) >= uLayers) break;
    float fi = float(i);
    float depth = fract(fi / uLayers + uTravel);
    float scale = mix(46.0, 8.0, depth) * (0.4 + 0.25 * uDensity);
    float fade = smoothstep(0.0, 0.15, depth) * smoothstep(1.0, 0.8, depth);
    col += starLayer(p * scale * (uRes.y / 900.0) + fi * 17.31, fi * 3.7, scale) * fade * mix(0.5, 1.2, depth);
  }

  // Hue rotate (YIQ) then saturation.
  float cs = cos(uHue), sn = sin(uHue);
  mat3 toYiq = mat3(0.299, 0.596, 0.211, 0.587, -0.274, -0.523, 0.114, -0.322, 0.312);
  mat3 fromYiq = mat3(1.0, 1.0, 1.0, 0.956, -0.272, -1.106, 0.621, -0.647, 1.703);
  vec3 yiq = toYiq * col;
  yiq.yz = mat2(cs, -sn, sn, cs) * yiq.yz;
  col = max(fromYiq * yiq, 0.0);
  float g = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(g), col, uSat);

  col *= smoothstep(0.0, 1.0, uIntro);
  col = 1.0 - exp(-col * 1.3);

  if (uLight > 0.5){
    float lum = clamp(dot(col, vec3(0.299, 0.587, 0.114)), 0.0, 1.0);
    gl_FragColor = vec4(0.0, 0.0, 0.0, lum);
  } else {
    col = clamp(col, 0.0, 1.0);
    float al = max(col.r, max(col.g, col.b));
    gl_FragColor = vec4(col, al);
  }
}
`;

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((x) => x + x)
      .join("");
  const n = parseInt(h.slice(0, 6), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export default function Galaxy({
  density = 1,
  glowIntensity = 0.3,
  flareIntensity = 1,
  starSpeed = 0.5,
  mouseRepulsion = true,
  clickWarp = false,
  starColors = ["#ffffff", "#ffd9a3", "#a8c8ff"],
  hueShift = 0,
  saturation = 1,
  starSize = 1,
  twinkleIntensity = 0.3,
  speed = 1,
  rotationSpeed = 0.05,
  layers = 3,
  direction = "forward",
  repulsionStrength = 1,
  mouseInteraction = true,
  intro = true,
  lightMode = false,
  paused = false,
  dpr = 1.5,
  className = "",
  style,
}: GalaxyProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef({
    density,
    glowIntensity,
    flareIntensity,
    starSpeed,
    mouseRepulsion,
    clickWarp,
    starColors,
    hueShift,
    saturation,
    starSize,
    twinkleIntensity,
    speed,
    rotationSpeed,
    layers,
    direction,
    repulsionStrength,
    mouseInteraction,
    intro,
    lightMode,
    paused,
    dpr,
  });
  useEffect(() => {
    propsRef.current = {
      density,
      glowIntensity,
      flareIntensity,
      starSpeed,
      mouseRepulsion,
      clickWarp,
      starColors,
      hueShift,
      saturation,
      starSize,
      twinkleIntensity,
      speed,
      rotationSpeed,
      layers,
      direction,
      repulsionStrength,
      mouseInteraction,
      intro,
      lightMode,
      paused,
      dpr,
    };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS))
        console.error(gl.getShaderInfoLog(sh));
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
    const u = (n: string) => (U[n] ??= gl.getUniformLocation(prog, n));

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const staticMode = () => propsRef.current.paused || reduceMq.matches;

    const startMs = performance.now();
    let last = startMs;
    let travel = 0;
    let warp = 0;
    let visible = true;
    let raf = 0;
    const mouse = { tx: 0, ty: 0, x: 0, y: 0, active: false };

    const resize = () => {
      const d = Math.max(
        1,
        Math.min(propsRef.current.dpr, window.devicePixelRatio || 1),
      );
      const w = Math.max(1, Math.floor(root.clientWidth * d));
      const h = Math.max(1, Math.floor(root.clientHeight * d));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      if (staticMode()) render();
    };

    const render = () => {
      const P = propsRef.current;
      const stat = staticMode();
      const now = performance.now();
      const dt = stat ? 0 : Math.min(0.05, (now - last) / 1000);
      last = now;
      const time = stat ? 12 : ((now - startMs) / 1000) * P.speed;
      const introT = !P.intro || stat ? 1 : Math.min(1, (now - startMs) / 2600);
      const e = 1 - Math.pow(1 - introT, 3);

      warp *= Math.exp(-dt * 2.2);
      const mul = 1 + warp * 8 + (1 - e) * 4;
      travel +=
        dt *
        P.speed *
        P.starSpeed *
        0.1 *
        mul *
        (P.direction === "backward" ? -1 : 1);

      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const aspect = canvas.width / canvas.height;

      const cols = [0, 1, 2].map((i) =>
        hexToRgb(
          P.starColors[i % Math.max(1, P.starColors.length)] ?? "#ffffff",
        ),
      );
      gl.uniform2f(u("uRes"), canvas.width, canvas.height);
      gl.uniform1f(u("uTime"), time);
      gl.uniform1f(u("uTravel"), travel - Math.floor(travel));
      gl.uniform1f(u("uIntro"), e);
      gl.uniform1f(u("uDensity"), P.density);
      gl.uniform1f(u("uGlow"), P.glowIntensity);
      gl.uniform1f(u("uFlare"), P.flareIntensity);
      gl.uniform1f(u("uSize"), P.starSize);
      gl.uniform1f(u("uTwinkle"), P.twinkleIntensity);
      gl.uniform1f(u("uSat"), P.saturation);
      gl.uniform1f(u("uHue"), (P.hueShift * Math.PI) / 180);
      gl.uniform1f(u("uRot"), P.rotationSpeed);
      gl.uniform1f(u("uRepel"), P.mouseRepulsion ? P.repulsionStrength : 0);
      gl.uniform1f(u("uLight"), P.lightMode ? 1 : 0);
      gl.uniform1f(
        u("uLayers"),
        Math.max(1, Math.min(5, Math.round(P.layers))),
      );
      gl.uniform2f(
        u("uParallax"),
        P.mouseInteraction ? mouse.x * 0.015 * aspect : 0,
        P.mouseInteraction ? mouse.y * 0.015 : 0,
      );
      gl.uniform2f(u("uMouse"), mouse.x * 0.5 * aspect, mouse.y * 0.5);
      gl.uniform3fv(u("uCols"), new Float32Array(cols.flat()));
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = () => {
      raf = 0;
      if (!visible || document.hidden || staticMode()) return;
      render();
      raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (staticMode()) render();
      else if (!raf && visible && !document.hidden)
        raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(root);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      last = performance.now();
      kick();
    });
    io.observe(root);
    document.addEventListener("visibilitychange", kick);
    reduceMq.addEventListener("change", kick);

    // Window-level pointer tracking so the effect works behind page content.
    const onMove = (ev: PointerEvent) => {
      const r = root.getBoundingClientRect();
      if (ev.clientY < r.top || ev.clientY > r.bottom) {
        mouse.tx = 0;
        mouse.ty = 0;
        return;
      }
      mouse.tx = ((ev.clientX - r.left) / r.width - 0.5) * 2;
      mouse.ty = -((ev.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onDown = (ev: PointerEvent) => {
      if (!propsRef.current.clickWarp) return;
      const r = root.getBoundingClientRect();
      if (ev.clientY < r.top || ev.clientY > r.bottom) return;
      if ((ev.target as HTMLElement).closest("a,button,input,textarea,select"))
        return;
      warp = 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    resize();
    kick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", kick);
      reduceMq.removeEventListener("change", kick);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none relative h-full min-h-[320px] w-full overflow-hidden ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
