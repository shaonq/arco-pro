/**
 * Image resource files used to compress the output of the production environment
 * 图片压缩
 * https://github.com/anncwb/vite-plugin-imagemin
 */
import viteImagemin from 'vite-plugin-imagemin';

export default function configImageminPlugin() {
  const imageminPlugin = viteImagemin({
    gifsicle: {
      optimizationLevel: 6,
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 6,
    },
    mozjpeg: {
      quality: 80,
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4,
    },
    svgo: {
      plugins: [
        {
          name: 'removeViewBox',
        },
        {
          name: 'removeEmptyAttrs',
          active: false,
        },
      ],
    },
  });
  return imageminPlugin;
}
