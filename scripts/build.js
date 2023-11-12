const objectMap = (obj, fn) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )

await Bun.build({
    entrypoints: ["index.tsx"],
    outdir: "./dist",
    target: "browser",
    define: {
        ...objectMap(Bun.env, v => JSON.stringify(v))
    },
});