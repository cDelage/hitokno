export function measureText(text: string) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  let height = 20;
  let width = 20;
  if (context) {
    context.font = "1.1rem Inter";
    const lines: string[] = text.split("\n");
    // Initialiser la hauteur du texte

    // Mesurer la hauteur de chaque ligne et obtenir la somme totale
    lines.forEach((line) => {
      const metrics = context.measureText(line);
      height += 20;
      const newWidth = metrics.width + 20;
      width = width < newWidth ? newWidth : width
    });
  }

  return {
    height, 
    width
  }
}
