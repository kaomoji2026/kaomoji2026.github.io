// ====== 自動生成 sitemap.js ======

// Google Sheets CSV URL (請改成你的)
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQl0v6_nM1lyjhPNz3zjY8hELqL9Dg5z2ZU3F-9EFsPDpih9t8MVHpbA2x6wspDn3fYPyUT_oTnLiTR/pub?gid=0&single=true&output=csv";

// 讀取 CSV 並生成 sitemap.xml
fetch(sheetURL)
  .then(res => res.text())
  .then(csvText => {
    const lines = csvText.split("\n").slice(1); // 忽略標題
    const categoriesSet = new Set();

    // 收集所有分類
    lines.forEach(line => {
      const [kaomoji, category] = line.split(",");
      if (!category) return;
      categoriesSet.add(category.trim());
    });

    // 開始生成 sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

    // 首頁
    sitemap += `  <url>\n    <loc>https://kaomoji2026.github.io/</loc>\n    <priority>1.0</priority>\n    <changefreq>weekly</changefreq>\n  </url>\n\n`;

    // 每個分類頁
    categoriesSet.forEach(cat => {
      sitemap += `  <url>\n    <loc>https://kaomoji2026.github.io/?category=${encodeURIComponent(cat)}</loc>\n    <priority>0.8</priority>\n    <changefreq>weekly</changefreq>\n  </url>\n\n`;
    });

    sitemap += `</urlset>`;

    // 顯示 sitemap XML
    console.log(sitemap);

    // ====== 生成下載鏈結 ======
    const blob = new Blob([sitemap], {type: "application/xml"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "sitemap.xml";
    a.textContent = "下載最新 sitemap.xml";
    a.style.display = "block";
    a.style.textAlign = "center";
    a.style.marginTop = "20px";
    a.style.fontSize = "18px";
    a.style.color = "#007acc";
    a.style.textDecoration = "underline";
    document.body.appendChild(a);

  })
  .catch(err => {
    console.error("讀取 Google Sheets CSV 失敗：", err);
  });
