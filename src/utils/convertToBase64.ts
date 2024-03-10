import { ImageTypes } from "../features/cartography/CartographyConstants";

export async function convertToBase64(
  clipboard: Clipboard
): Promise<{ base64Data: string, width: number, height: number } | void> {
  return new Promise((resolve, reject) => {
    clipboard.read().then(async (clipboardData) => {
      if (clipboardData.length) {
        const clipboardItem = clipboardData[0];
        const mimeType = clipboardItem.types.filter(type => type.includes("image"))?.[0];
        if (ImageTypes.includes(mimeType)) {
          const data = await clipboardItem.getType(mimeType);
          const blob = new Blob([data], { type: mimeType });

          const reader = new FileReader();
          reader.onload = function () {
            const base64Data = reader.result as string;

            // Create an Image element to get dimensions
            const img = new Image();
            img.src = base64Data;

            img.onload = function () {
              // Now you can access the image dimensions
              const width = img.width;
              const height = img.height;

              resolve({ base64Data, width, height });
            };
          };

          reader.onerror = function (error) {
            reject(error);
          };

          reader.readAsDataURL(blob);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    });
  });
}