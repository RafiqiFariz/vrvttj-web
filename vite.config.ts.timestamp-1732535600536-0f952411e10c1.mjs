// vite.config.ts
import { resolve } from "node:path";
import { defineConfig, loadEnv } from "file:///D:/2.FARIZ_RAFIQI/KULIAH/SEMESTER%207/Projek%20VR%20Bu%20Erly/vrvttj-web/node_modules/.pnpm/vite@5.4.10_@types+node@22.8.5_sass@1.80.5/node_modules/vite/dist/node/index.js";

// build/plugins.ts
import UnoCSS from "file:///D:/2.FARIZ_RAFIQI/KULIAH/SEMESTER%207/Projek%20VR%20Bu%20Erly/vrvttj-web/node_modules/.pnpm/@unocss+vite@0.62.4_rollup@4.24.3_vite@5.4.10_@types+node@22.8.5_sass@1.80.5_/node_modules/@unocss/vite/dist/index.mjs";
import vue from "file:///D:/2.FARIZ_RAFIQI/KULIAH/SEMESTER%207/Projek%20VR%20Bu%20Erly/vrvttj-web/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.10_@types+node@22.8.5_sass@1.80.5__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/2.FARIZ_RAFIQI/KULIAH/SEMESTER%207/Projek%20VR%20Bu%20Erly/vrvttj-web/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.1_vite@5.4.10_@types+node@22.8.5_sass@1.80.5__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import AutoImport from "file:///D:/2.FARIZ_RAFIQI/KULIAH/SEMESTER%207/Projek%20VR%20Bu%20Erly/vrvttj-web/node_modules/.pnpm/unplugin-auto-import@0.18.3_@nuxt+kit@3.13.2_rollup@4.24.3__@vueuse+core@11.2.0_vue@3.5.12_ty_flyriswdmj3tiet3gqstvu4u3y/node_modules/unplugin-auto-import/dist/vite.js";
import { FileSystemIconLoader } from "file:///D:/2.FARIZ_RAFIQI/KULIAH/SEMESTER%207/Projek%20VR%20Bu%20Erly/vrvttj-web/node_modules/.pnpm/unplugin-icons@0.19.3_@vue+compiler-sfc@3.5.12/node_modules/unplugin-icons/dist/loaders.js";
import IconsResolver from "file:///D:/2.FARIZ_RAFIQI/KULIAH/SEMESTER%207/Projek%20VR%20Bu%20Erly/vrvttj-web/node_modules/.pnpm/unplugin-icons@0.19.3_@vue+compiler-sfc@3.5.12/node_modules/unplugin-icons/dist/resolver.js";
import Icons from "file:///D:/2.FARIZ_RAFIQI/KULIAH/SEMESTER%207/Projek%20VR%20Bu%20Erly/vrvttj-web/node_modules/.pnpm/unplugin-icons@0.19.3_@vue+compiler-sfc@3.5.12/node_modules/unplugin-icons/dist/vite.js";
import { NaiveUiResolver } from "file:///D:/2.FARIZ_RAFIQI/KULIAH/SEMESTER%207/Projek%20VR%20Bu%20Erly/vrvttj-web/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_@nuxt+kit@3.13.2_rollup@4.24.3__rollup@4._5fc4taxahd6veo7t4gsmser7ai/node_modules/unplugin-vue-components/dist/resolvers.js";
import Components from "file:///D:/2.FARIZ_RAFIQI/KULIAH/SEMESTER%207/Projek%20VR%20Bu%20Erly/vrvttj-web/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_@nuxt+kit@3.13.2_rollup@4.24.3__rollup@4._5fc4taxahd6veo7t4gsmser7ai/node_modules/unplugin-vue-components/dist/vite.js";
import viteCompression from "file:///D:/2.FARIZ_RAFIQI/KULIAH/SEMESTER%207/Projek%20VR%20Bu%20Erly/vrvttj-web/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.4.10_@types+node@22.8.5_sass@1.80.5_/node_modules/vite-plugin-compression/dist/index.mjs";
import VueDevTools from "file:///D:/2.FARIZ_RAFIQI/KULIAH/SEMESTER%207/Projek%20VR%20Bu%20Erly/vrvttj-web/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.9_@nuxt+kit@3.13.2_rollup@4.24.3__rollup@4.24.3_vite@5.4.10_@typ_fqmzyg4hov7553ksvneayblrqy/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
function createVitePlugins(env) {
  const plugins = [
    // support vue
    vue(),
    vueJsx(),
    VueDevTools(),
    // support unocss
    UnoCSS(),
    // auto import api of lib
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "pinia",
        "@vueuse/core",
        "vue-i18n",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar",
            "useModal"
          ]
        }
      ],
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/
      ],
      dts: "src/typings/auto-imports.d.ts"
    }),
    // auto import components lib
    Components({
      dts: "src/typings/components.d.ts",
      resolvers: [
        IconsResolver({
          prefix: false,
          customCollections: [
            "svg-icons"
          ]
        }),
        NaiveUiResolver()
      ]
    }),
    // auto import iconify's icons
    Icons({
      defaultStyle: "display:inline-block",
      compiler: "vue3",
      customCollections: {
        "svg-icons": FileSystemIconLoader(
          "src/assets/svg-icons",
          (svg) => svg.replace(/^<svg /, '<svg fill="currentColor" width="1.2em" height="1.2em"')
        )
      }
    })
  ];
  if (env.VITE_BUILD_COMPRESS === "Y") {
    const { VITE_COMPRESS_TYPE = "gzip" } = env;
    plugins.push(viteCompression({
      algorithm: VITE_COMPRESS_TYPE
      // 压缩算法
    }));
  }
  return plugins;
}

// build/proxy.ts
import { mapEntries } from "file:///D:/2.FARIZ_RAFIQI/KULIAH/SEMESTER%207/Projek%20VR%20Bu%20Erly/vrvttj-web/node_modules/.pnpm/radash@12.1.0/node_modules/radash/dist/esm/index.mjs";
function generateProxyPattern(envConfig) {
  return mapEntries(envConfig, (key, value) => {
    return [
      key,
      {
        value,
        proxy: `/proxy-${key}`
      }
    ];
  });
}
function createViteProxy(envConfig) {
  const proxyMap = generateProxyPattern(envConfig);
  return mapEntries(proxyMap, (key, value) => {
    return [
      value.proxy,
      {
        target: value.value,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^${value.proxy}`), "")
      }
    ];
  });
}

// service.config.ts
var serviceConfig = {
  dev: {
    url: "http://localhost:8000"
  },
  test: {
    url: "https://mock.apifox.cn/m1/4071143-0-default"
  },
  prod: {
    url: "https://api.vrdance.my.id"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "D:\\2.FARIZ_RAFIQI\\KULIAH\\SEMESTER 7\\Projek VR Bu Erly\\vrvttj-web";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, __vite_injected_original_dirname, "");
  const envConfig = serviceConfig[mode];
  return {
    base: env.VITE_BASE_URL,
    plugins: createVitePlugins(env),
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src")
      }
    },
    server: {
      host: "0.0.0.0",
      proxy: env.VITE_HTTP_PROXY === "Y" ? createViteProxy(envConfig) : void 0
    },
    build: {
      target: "esnext",
      reportCompressedSize: false
      // 启用/禁用 gzip 压缩大小报告
    },
    optimizeDeps: {
      include: ["echarts", "md-editor-v3", "quill"]
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvcGx1Z2lucy50cyIsICJidWlsZC9wcm94eS50cyIsICJzZXJ2aWNlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXDIuRkFSSVpfUkFGSVFJXFxcXEtVTElBSFxcXFxTRU1FU1RFUiA3XFxcXFByb2playBWUiBCdSBFcmx5XFxcXHZydnR0ai13ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXDIuRkFSSVpfUkFGSVFJXFxcXEtVTElBSFxcXFxTRU1FU1RFUiA3XFxcXFByb2playBWUiBCdSBFcmx5XFxcXHZydnR0ai13ZWJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LzIuRkFSSVpfUkFGSVFJL0tVTElBSC9TRU1FU1RFUiUyMDcvUHJvamVrJTIwVlIlMjBCdSUyMEVybHkvdnJ2dHRqLXdlYi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgY3JlYXRlVml0ZVBsdWdpbnMgfSBmcm9tICcuL2J1aWxkL3BsdWdpbnMnXG5pbXBvcnQgeyBjcmVhdGVWaXRlUHJveHkgfSBmcm9tICcuL2J1aWxkL3Byb3h5J1xuaW1wb3J0IHsgc2VydmljZUNvbmZpZyB9IGZyb20gJy4vc2VydmljZS5jb25maWcnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIC8vIFx1NjgzOVx1NjM2RVx1NUY1M1x1NTI0RFx1NURFNVx1NEY1Q1x1NzZFRVx1NUY1NVx1NEUyRFx1NzY4NCBgbW9kZWAgXHU1MkEwXHU4RjdEIC5lbnYgXHU2NTg3XHU0RUY2XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgX19kaXJuYW1lLCAnJykgYXMgSW1wb3J0TWV0YUVudlxuICBjb25zdCBlbnZDb25maWcgPSBzZXJ2aWNlQ29uZmlnW21vZGUgYXMgU2VydmljZUVudlR5cGVdXG5cbiAgcmV0dXJuIHtcbiAgICBiYXNlOiBlbnYuVklURV9CQVNFX1VSTCxcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucyhlbnYpLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICAgIHByb3h5OlxuICAgICAgICBlbnYuVklURV9IVFRQX1BST1hZID09PSAnWScgPyBjcmVhdGVWaXRlUHJveHkoZW52Q29uZmlnKSA6IHVuZGVmaW5lZCxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLCAvLyBcdTU0MkZcdTc1MjgvXHU3OTgxXHU3NTI4IGd6aXAgXHU1MzhCXHU3RjI5XHU1OTI3XHU1QzBGXHU2MkE1XHU1NDRBXG4gICAgfSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFsnZWNoYXJ0cycsICdtZC1lZGl0b3ItdjMnLCAncXVpbGwnXSxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgYXBpOiAnbW9kZXJuJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcMi5GQVJJWl9SQUZJUUlcXFxcS1VMSUFIXFxcXFNFTUVTVEVSIDdcXFxcUHJvamVrIFZSIEJ1IEVybHlcXFxcdnJ2dHRqLXdlYlxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcMi5GQVJJWl9SQUZJUUlcXFxcS1VMSUFIXFxcXFNFTUVTVEVSIDdcXFxcUHJvamVrIFZSIEJ1IEVybHlcXFxcdnJ2dHRqLXdlYlxcXFxidWlsZFxcXFxwbHVnaW5zLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8yLkZBUklaX1JBRklRSS9LVUxJQUgvU0VNRVNURVIlMjA3L1Byb2playUyMFZSJTIwQnUlMjBFcmx5L3ZydnR0ai13ZWIvYnVpbGQvcGx1Z2lucy50c1wiO2ltcG9ydCBVbm9DU1MgZnJvbSAnQHVub2Nzcy92aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IHsgRmlsZVN5c3RlbUljb25Mb2FkZXIgfSBmcm9tICd1bnBsdWdpbi1pY29ucy9sb2FkZXJzJ1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWljb25zXG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcidcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nXG5cbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5cbi8qKlxuICogQGRlc2NyaXB0aW9uOiBcdThCQkVcdTdGNkV2aXRlXHU2M0QyXHU0RUY2XHU5MTREXHU3RjZFXG4gKiBAcGFyYW0geyp9IGVudiAtIFx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1OTE0RFx1N0Y2RVxuICogQHJldHVybiB7Kn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKGVudjogSW1wb3J0TWV0YUVudikge1xuICBjb25zdCBwbHVnaW5zID0gW1xuICAgIC8vIHN1cHBvcnQgdnVlXG4gICAgdnVlKCksXG4gICAgdnVlSnN4KCksXG4gICAgVnVlRGV2VG9vbHMoKSxcblxuICAgIC8vIHN1cHBvcnQgdW5vY3NzXG4gICAgVW5vQ1NTKCksXG5cbiAgICAvLyBhdXRvIGltcG9ydCBhcGkgb2YgbGliXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgICd2dWUnLFxuICAgICAgICAndnVlLXJvdXRlcicsXG4gICAgICAgICdwaW5pYScsXG4gICAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgICAndnVlLWkxOG4nLFxuICAgICAgICB7XG4gICAgICAgICAgJ25haXZlLXVpJzogW1xuICAgICAgICAgICAgJ3VzZURpYWxvZycsXG4gICAgICAgICAgICAndXNlTWVzc2FnZScsXG4gICAgICAgICAgICAndXNlTm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICd1c2VMb2FkaW5nQmFyJyxcbiAgICAgICAgICAgICd1c2VNb2RhbCcsXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBpbmNsdWRlOiBbXG4gICAgICAgIC9cXC5bdGpdc3g/JC8sXG4gICAgICAgIC9cXC52dWUkLyxcbiAgICAgICAgL1xcLnZ1ZVxcP3Z1ZS8sXG4gICAgICAgIC9cXC5tZCQvLFxuICAgICAgXSxcbiAgICAgIGR0czogJ3NyYy90eXBpbmdzL2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICB9KSxcblxuICAgIC8vIGF1dG8gaW1wb3J0IGNvbXBvbmVudHMgbGliXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkdHM6ICdzcmMvdHlwaW5ncy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgIHByZWZpeDogZmFsc2UsXG4gICAgICAgICAgY3VzdG9tQ29sbGVjdGlvbnM6IFtcbiAgICAgICAgICAgICdzdmctaWNvbnMnLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pLFxuICAgICAgICBOYWl2ZVVpUmVzb2x2ZXIoKSxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgICAvLyBhdXRvIGltcG9ydCBpY29uaWZ5J3MgaWNvbnNcbiAgICBJY29ucyh7XG4gICAgICBkZWZhdWx0U3R5bGU6ICdkaXNwbGF5OmlubGluZS1ibG9jaycsXG4gICAgICBjb21waWxlcjogJ3Z1ZTMnLFxuICAgICAgY3VzdG9tQ29sbGVjdGlvbnM6IHtcbiAgICAgICAgJ3N2Zy1pY29ucyc6IEZpbGVTeXN0ZW1JY29uTG9hZGVyKFxuICAgICAgICAgICdzcmMvYXNzZXRzL3N2Zy1pY29ucycsXG4gICAgICAgICAgc3ZnID0+IHN2Zy5yZXBsYWNlKC9ePHN2ZyAvLCAnPHN2ZyBmaWxsPVwiY3VycmVudENvbG9yXCIgd2lkdGg9XCIxLjJlbVwiIGhlaWdodD1cIjEuMmVtXCInKSxcbiAgICAgICAgKSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF1cbiAgLy8gdXNlIGNvbXByZXNzaW9uXG4gIGlmIChlbnYuVklURV9CVUlMRF9DT01QUkVTUyA9PT0gJ1knKSB7XG4gICAgY29uc3QgeyBWSVRFX0NPTVBSRVNTX1RZUEUgPSAnZ3ppcCcgfSA9IGVudlxuICAgIHBsdWdpbnMucHVzaCh2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgYWxnb3JpdGhtOiBWSVRFX0NPTVBSRVNTX1RZUEUsIC8vIFx1NTM4Qlx1N0YyOVx1N0I5N1x1NkNENVxuICAgIH0pKVxuICB9XG5cbiAgcmV0dXJuIHBsdWdpbnNcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcMi5GQVJJWl9SQUZJUUlcXFxcS1VMSUFIXFxcXFNFTUVTVEVSIDdcXFxcUHJvamVrIFZSIEJ1IEVybHlcXFxcdnJ2dHRqLXdlYlxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcMi5GQVJJWl9SQUZJUUlcXFxcS1VMSUFIXFxcXFNFTUVTVEVSIDdcXFxcUHJvamVrIFZSIEJ1IEVybHlcXFxcdnJ2dHRqLXdlYlxcXFxidWlsZFxcXFxwcm94eS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMi5GQVJJWl9SQUZJUUkvS1VMSUFIL1NFTUVTVEVSJTIwNy9Qcm9qZWslMjBWUiUyMEJ1JTIwRXJseS92cnZ0dGotd2ViL2J1aWxkL3Byb3h5LnRzXCI7aW1wb3J0IHR5cGUgeyBQcm94eU9wdGlvbnMgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgbWFwRW50cmllcyB9IGZyb20gJ3JhZGFzaCdcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUHJveHlQYXR0ZXJuKGVudkNvbmZpZzogUmVjb3JkPHN0cmluZywgc3RyaW5nPikge1xuICByZXR1cm4gbWFwRW50cmllcyhlbnZDb25maWcsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgcmV0dXJuIFtcbiAgICAgIGtleSxcbiAgICAgIHtcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIHByb3h5OiBgL3Byb3h5LSR7a2V5fWAsXG4gICAgICB9LFxuICAgIF1cbiAgfSlcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb246IFx1NzUxRlx1NjIxMHZpdGVcdTRFRTNcdTc0MDZcdTVCNTdcdTZCQjVcbiAqIEBwYXJhbSB7Kn0gZW52Q29uZmlnIC0gXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU5MTREXHU3RjZFXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaXRlUHJveHkoZW52Q29uZmlnOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSB7XG4gIGNvbnN0IHByb3h5TWFwID0gZ2VuZXJhdGVQcm94eVBhdHRlcm4oZW52Q29uZmlnKVxuICByZXR1cm4gbWFwRW50cmllcyhwcm94eU1hcCwgKGtleSwgdmFsdWUpID0+IHtcbiAgICByZXR1cm4gW1xuICAgICAgdmFsdWUucHJveHksXG4gICAgICB7XG4gICAgICAgIHRhcmdldDogdmFsdWUudmFsdWUsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogKHBhdGg6IHN0cmluZykgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ZhbHVlLnByb3h5fWApLCAnJyksXG4gICAgICB9LFxuICAgIF1cbiAgfSkgYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgUHJveHlPcHRpb25zPlxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwyLkZBUklaX1JBRklRSVxcXFxLVUxJQUhcXFxcU0VNRVNURVIgN1xcXFxQcm9qZWsgVlIgQnUgRXJseVxcXFx2cnZ0dGotd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwyLkZBUklaX1JBRklRSVxcXFxLVUxJQUhcXFxcU0VNRVNURVIgN1xcXFxQcm9qZWsgVlIgQnUgRXJseVxcXFx2cnZ0dGotd2ViXFxcXHNlcnZpY2UuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8yLkZBUklaX1JBRklRSS9LVUxJQUgvU0VNRVNURVIlMjA3L1Byb2playUyMFZSJTIwQnUlMjBFcmx5L3ZydnR0ai13ZWIvc2VydmljZS5jb25maWcudHNcIjsvKiogXHU0RTBEXHU1NDBDXHU4QkY3XHU2QzQyXHU2NzBEXHU1MkExXHU3Njg0XHU3M0FGXHU1ODgzXHU5MTREXHU3RjZFICovXG5leHBvcnQgY29uc3Qgc2VydmljZUNvbmZpZzogUmVjb3JkPFNlcnZpY2VFbnZUeXBlLCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PiA9IHtcbiAgZGV2OiB7XG4gICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDAwJyxcbiAgfSxcbiAgdGVzdDoge1xuICAgIHVybDogJ2h0dHBzOi8vbW9jay5hcGlmb3guY24vbTEvNDA3MTE0My0wLWRlZmF1bHQnLFxuICB9LFxuICBwcm9kOiB7XG4gICAgdXJsOiAnaHR0cHM6Ly9hcGkudnJkYW5jZS5teS5pZCcsXG4gIH0sXG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNZLFNBQVMsZUFBZTtBQUM5WixTQUFTLGNBQWMsZUFBZTs7O0FDRDRXLE9BQU8sWUFBWTtBQUNyYSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsNEJBQTRCO0FBRXJDLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sV0FBVztBQUNsQixTQUFTLHVCQUF1QjtBQUNoQyxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLHFCQUFxQjtBQUU1QixPQUFPLGlCQUFpQjtBQU9qQixTQUFTLGtCQUFrQixLQUFvQjtBQUNwRCxRQUFNLFVBQVU7QUFBQTtBQUFBLElBRWQsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsWUFBWTtBQUFBO0FBQUEsSUFHWixPQUFPO0FBQUE7QUFBQSxJQUdQLFdBQVc7QUFBQSxNQUNULFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxVQUNFLFlBQVk7QUFBQSxZQUNWO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEs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
