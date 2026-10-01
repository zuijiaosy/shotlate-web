# shotlate-web

Shotlate 的官方网站：首页、使用手册、常见问题和下载页。用 TanStack Start 构建，所有页面在构建时预渲染成静态 HTML，部署到 Cloudflare 时不需要运行任何 Worker 代码。

正式地址：<https://shotlate.pages.dev> · 应用仓库：<https://github.com/zuijiaosy/shotlate>

## 本地开发

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # 预渲染到 dist/client，并生成 sitemap.xml 和 robots.txt
pnpm preview:cf     # 用 wrangler 在本地按 Cloudflare Pages 的方式托管 dist/client（http://localhost:8788）
```

## 部署到 Cloudflare

站点托管在 Cloudflare Pages 的 `shotlate` 项目上（`wrangler.jsonc` 里的 `pages_build_output_dir`），地址是 `https://shotlate.pages.dev`，在免费套餐内即可使用。

```bash
npx wrangler login      # 第一次使用时登录
pnpm run deploy         # 构建并发布到正式环境（--branch main）
```

以后要绑定自己的域名，在 Cloudflare 控制台 → Workers 和 Pages → shotlate → 自定义域 里添加，再用 `VITE_SITE_URL` 构建即可。

## 下载地址：两种方案

下载按钮的地址在 `src/site.ts` 里决定：

1. **GitHub Release（默认）**：不需要任何配置。按钮打开 `https://github.com/zuijiaosy/shotlate/releases/latest`，也就是最新发布页，DMG 附在那里。应用仓库每次推送到 `main` 都会自动发布新版本，这个地址始终指向最新的一个。
2. **Cloudflare R2**：应用仓库的发布流程在配置了 R2 之后，会把 DMG 同时上传成 `Shotlate-<版本>.dmg` 和固定名字的 `Shotlate-latest.dmg`（配置方法见应用仓库 README 的「发布」一节）。存储桶开启公开访问后，构建官网时传入：

   ```bash
   VITE_DMG_URL=https://<存储桶公开域名>/Shotlate-latest.dmg pnpm run deploy
   ```

   按钮就直接下载 R2 上的最新 DMG，下载页同时保留一个指向 GitHub 发布页的链接。在控制台自动部署时，把 `VITE_DMG_URL` 加到构建环境变量里即可。

其他可以通过环境变量覆盖的设置：`VITE_SITE_URL`（正式域名，canonical、Open Graph 和 sitemap 都用它，默认 `https://shotlate.pages.dev`）。

## 截图和动图

`public/shots/` 里的图片和视频都由 Shotlate 本身渲染：截图界面来自 `Shotlate --ui-demo`，长截图来自 `Shotlate --scroll-demo`，译文来自 `Shotlate --translate-image`。翻译这一步用 `scripts/assets/mock-translate.mjs` 代替真实的模型接口，返回 `translations.json` 里写好的中文，排版和绘制仍然走 Shotlate 的真实代码。

Shotlate 更新界面后可以重新生成：

```bash
SHOTLATE_APP=../shotlate/build/Shotlate.app pnpm assets
```

需要 Google Chrome（渲染示例页面）、ImageMagick 和 ffmpeg；长截图那一步需要终端有屏幕录制权限，没有时会跳过。

## 目录

```
src/routes/        页面：index（首页）、manual、faq、download、404
src/content/       使用手册和常见问题的文字，[⌥A] 显示为按键，`路径` 显示为代码
src/site.ts        域名、下载地址等站点设置
scripts/postbuild.mjs   生成 sitemap.xml 和 robots.txt
scripts/assets/    重新生成截图和动图的脚本与示例页面
```

## 许可证

[MIT](LICENSE)
