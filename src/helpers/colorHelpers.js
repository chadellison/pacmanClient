import {round} from '../helpers/mathHelpers.js';

const hslToRgb = (h, s, l) => {
  let r, g, b;

  if (s === 0) {
      r = g = b = l;
  } else {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [round(r * 255), round(g * 255), round(b * 255)];
}

const hue2rgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1/6) return p + (q - p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
};

export const findColor = (hitpoints, maxHitpoints) => {
  const percentage = round(hitpoints / maxHitpoints * 100);
  const hue = percentage * 1.2 / 360;
  const rgb = hslToRgb(hue, 1, .5);
  return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
};
