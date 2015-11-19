if not window.faviconsAdded
  window.faviconsAdded = true
  addFavicon = (options) ->
    document.head = document.head or document.getElementsByTagName("head")[0]
    link = hx.detached(options.elemType or "link")

    delete options.elemType

    for k, v of options
      link.attr(k, v)

    document.head.appendChild link.node()
    return

  version = hx.theme.favicon?.version
  base = hx.theme.favicon?.basePath
  tileCol = hx.theme.favicon?.tileCol

  favicons = [
    {
      rel: "apple-touch-icon",
      sizes: "57x57",
      href: base + "apple-touch-icon-57x57.png?v=" + version
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: base + "apple-touch-icon-60x60.png?v=" + version
    },
    {
      rel: "apple-touch-icon",
      sizes: "72x72",
      href: base + "apple-touch-icon-72x72.png?v=" + version
    },
    {
      rel: "apple-touch-icon",
      sizes: "76x76",
      href: base + "apple-touch-icon-76x76.png?v=" + version
    },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      href: base + "apple-touch-icon-114x114.png?v=" + version
    },
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      href: base + "apple-touch-icon-120x120.png?v=" + version
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      href: base + "apple-touch-icon-144x144.png?v=" + version
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      href: base + "apple-touch-icon-152x152.png?v=" + version
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: base + "apple-touch-icon-180x180.png?v=" + version
    },
    {
      rel: "apple-touch-startup-image",
      media: "(device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)",
      href: base + "apple-touch-startup-image-1182x2208.png?v=" + version
    },
    {
      rel: "apple-touch-startup-image",
      media: "(device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)",
      href: base + "apple-touch-startup-image-1242x2148.png?v=" + version
    },
    {
      rel: "apple-touch-startup-image",
      media: "(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)",
      href: base + "apple-touch-startup-image-1496x2048.png?v=" + version
    },
    {
      rel: "apple-touch-startup-image",
      media: "(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)",
      href: base + "apple-touch-startup-image-1536x2008.png?v=" + version
    },
    {
      rel: "apple-touch-startup-image",
      media: "(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)",
      href: base + "apple-touch-startup-image-320x460.png?v=" + version
    },
    {
      rel: "apple-touch-startup-image",
      media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      href: base + "apple-touch-startup-image-640x1096.png?v=" + version
    },
    {
      rel: "apple-touch-startup-image",
      media: "(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)",
      href: base + "apple-touch-startup-image-640x920.png?v=" + version
    },
    {
      rel: "apple-touch-startup-image",
      media: "(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)",
      href: base + "apple-touch-startup-image-748x1024.png?v=" + version
    },
    {
      rel: "apple-touch-startup-image",
      media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
      href: base + "apple-touch-startup-image-750x1294.png?v=" + version
    },
    {
      rel: "apple-touch-startup-image",
      media: "(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)",
      href: base + "apple-touch-startup-image-768x1004.png?v=" + version
    },
    {
      rel: "icon",
      type: "image/png"
      sizes: "32x32"
      href: base + "favicon-32x32.png?v=" + version
    },
    {
      rel: "icon",
      type: "image/png"
      sizes: "230x230"
      href: base + "favicon-230x230.png?v=" + version
    },
    {
      rel: "icon",
      type: "image/png"
      sizes: "96x96"
      href: base + "favicon-96x96.png?v=" + version
    },
    {
      rel: "icon",
      type: "image/png"
      sizes: "192x192"
      href: base + "favicon-192x192.png?v=" + version
    },
    {
      rel: "icon",
      type: "image/png"
      sizes: "228x228"
      href: base + "favicon-228x228.png?v=" + version
    },
    {
      rel: "icon",
      type: "image/png"
      sizes: "16x16"
      href: base + "favicon-16x16.png?v=" + version
    },
    {
      rel: "manifest",
      href: base + "manifest.json"
    },
    {
      rel: "yandex-tableau-widget",
      href: base + "yandex-browser-manifest.json"
    },
    {
      rel: "shortcut icon",
      type: "image/x-icon"
      href: base + "favicon.ico?v=" + version
    },
    {
      elemType: "meta",
      property: "og:image",
      content: base + "open-graph.png?v=" + version
    },
    {
      elemType: "meta",
      name: "apple-mobile-web-app-capable",
      content: "yes"
    },
    {
      elemType: "meta",
      name: "msapplication-TileColor",
      content: tileCol
    },
    {
      elemType: "meta",
      name: "msapplication-TileImage",
      content: base + "mstile-144x144.png?v=" + version
    },
    {
      elemType: "meta",
      name: "theme-color",
      content: tileCol
    }
  ]
  favicons.forEach(addFavicon)
