// lib/recolorLottie.js
export function recolorLottie(animationData, hexColor) {
  // Convert hex → [r,g,b,a] normalized (0–1)
  const hexToRgba = (hex) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;
    return [r, g, b, 1];
  };

  const target = hexToRgba(hexColor);

  const walkShapes = (shapes) => {
    shapes.forEach((shape) => {
      // Replace fills & strokes
      if (shape.ty === "fl" || shape.ty === "st") {
        shape.c.k = target;
      }
      if (shape.it) walkShapes(shape.it);
    });
  };

  animationData.layers.forEach((layer) => {
    if (layer.shapes) {
      walkShapes(layer.shapes);
    }
  });

  return animationData;
}
