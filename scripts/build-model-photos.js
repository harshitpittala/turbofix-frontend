/**
 * One-time generator: reads curated model->file mappings below, copies each
 * source photo through sharp (resized + webp) into public/images/models/<brand>/,
 * and writes data/modelPhotos.generated.ts consumed by BrandRepairClient.
 *
 * Run with: node scripts/build-model-photos.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC_ROOT = "C:\\mobile_photos";
const OUT_DIR = path.join(__dirname, "..", "public", "images", "models");
const DATA_OUT = path.join(__dirname, "..", "data", "modelPhotos.generated.ts");
const UNAVAILABLE_SRC = path.join(SRC_ROOT, "un-available-phone-use-photo.webp");

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\+/g, "-plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ───────────────────────── Apple ───────────────────────── */
const apple = {
  slug: "apple",
  folder: "apple",
  series: [
    {
      name: "iPhone",
      items: [
        ["apple-iphone-17-pro-max.webp", "iPhone 17 Pro Max"],
        ["apple-iphone-17-pro.webp", "iPhone 17 Pro"],
        ["apple-iphone-17.webp", "iPhone 17"],
        ["apple-iphone-17-air1 (1).webp", "iPhone 17 Air"],
        ["apple-iphone-17e_copy.webp", "iPhone 17e"],
        ["1734427828iphone 16 pro max copy.webp", "iPhone 16 Pro Max"],
        ["1734427834iphone 16 pro copy.webp", "iPhone 16 Pro"],
        ["1734427841iphone 16 plus copy.webp", "iPhone 16 Plus"],
        ["1734427870iphone 16 copy.webp", "iPhone 16"],
        ["apple-iphone-16e.webp", "iPhone 16e"],
        ["17344252211700310206iphone 15 pro max_New copy.webp", "iPhone 15 Pro Max"],
        ["17344253011700309860iphone 15 plus_New copy.webp", "iPhone 15 Plus"],
        ["iPHONE_15.png", "iPhone 15"],
        ["17344254571693655290Apple iPhone 14 Pro Max_New copy.webp", "iPhone 14 Pro Max"],
        ["17344254631693655304Apple iPhone 14 Pro_New copy.webp", "iPhone 14 Pro"],
        ["17344254951693655313Apple iPhone 14 Plus_New copy.webp", "iPhone 14 Plus"],
        ["iPhone_14_blue_1.png", "iPhone 14"],
        ["17344255791693655385Apple iPhone 13 pro max_New copy.webp", "iPhone 13 Pro Max"],
        ["17344255851693655392Apple iPhone 13 Pro_New copy.webp", "iPhone 13 Pro"],
        ["17344255921693655399Apple iPhone 13_New copy.webp", "iPhone 13"],
        ["17344255711693655375Apple iPhone 13 mini_New copy.webp", "iPhone 13 Mini"],
        ["17344256331693655439iPhone 12 pro max_New copy.webp", "iPhone 12 Pro Max"],
        ["17344256421693655834apple-iphone-12-pro_New copy.webp", "iPhone 12 Pro"],
        ["17344257771693656051apple-iphone-12_New copy.webp", "iPhone 12"],
        ["17344256601693655845apple-iphone-12-mini_New copy.webp", "iPhone 12 Mini"],
        ["17344255401693657236iphone-se-2020_New copy.webp", "iPhone SE (2020)"],
        ["17344258241693657122iphone-11-pro-max_New copy.webp", "iPhone 11 Pro Max"],
        ["17344258301693657131apple-iphone-11-pro_New copy.webp", "iPhone 11 Pro"],
        ["17344258371693657226apple-iphone-11_New copy.webp", "iPhone 11"],
        ["17344259051693657249iphone-xs-max_New copy.webp", "iPhone XS Max"],
        ["17344259171693657270iphone-xs_New copy.webp", "iPhone XS"],
        ["17344259421693657300iphone-xr_New copy.webp", "iPhone XR"],
        ["173442596116743664461645881031iphone-x_New copy.webp", "iPhone X"],
        ["173442601216743664701645881017iphone-8-plus_New copy.webp", "iPhone 8 Plus"],
        ["173442604016743664811645881010iphone-8_New copy.webp", "iPhone 8"],
        ["173442604816743664891645881006iphone-7-plus_New copy.webp", "iPhone 7 Plus"],
        ["173442605616743667991645880967iphone-7_New copy.webp", "iPhone 7"],
        ["173442617516743668351645880835iphone-se_New copy.webp", "iPhone SE (2016)"],
        ["173442609516743668211645880933iphone-6-plus_New copy.webp", "iPhone 6 Plus"],
        ["173442610716743668151645880948iphone-6s_New copy.webp", "iPhone 6s"],
        ["173442614516743668271645880846iphone-6_New copy.webp", "iPhone 6"],
      ],
    },
  ],
  other: { file: "17344257861693655715Apple iPhone other_New copy.webp", inFolder: true, name: "Other iPhone Model" },
};

/* ───────────────────────── Samsung ───────────────────────── */
const samsung = {
  slug: "samsung",
  folder: "Samsung",
  series: [
    {
      name: "Galaxy S",
      subfolder: "Series S",
      items: [
        ["Galaxy S25_Ultra.webp", "Galaxy S25 Ultra"],
        ["Galaxy_S25_Plus.webp", "Galaxy S25+"],
        ["Galaxy_S25.webp", "Galaxy S25"],
        ["Galaxy_S25_FE.webp", "Galaxy S25 FE"],
        ["Galaxy_S24_Ultra.png", "Galaxy S24 Ultra"],
        ["Galaxy_S24_Plus.png", "Galaxy S24+"],
        ["Galaxy_S24.png", "Galaxy S24"],
        ["Galaxy_S24_FE.jpg", "Galaxy S24 FE"],
        ["Galaxy_S23_Ultra.png", "Galaxy S23 Ultra"],
        ["Galaxy_S23_Plus.png", "Galaxy S23+"],
        ["Galaxy_S23.png", "Galaxy S23"],
        ["Galaxy_S23_FE.png", "Galaxy S23 FE"],
        ["Galaxy_S22_Ultra_5G.png", "Galaxy S22 Ultra"],
        ["Galaxy_S22_Plus_5G.png", "Galaxy S22+"],
        ["Galaxy_S22_5G.png", "Galaxy S22"],
        ["Galaxy_S21_Ultra_5G.png", "Galaxy S21 Ultra"],
        ["Galaxy_S21_Plus_5G.png", "Galaxy S21+"],
        ["Galaxy_S21_5G.png", "Galaxy S21"],
        ["Galaxy_S21_FE_5G.png", "Galaxy S21 FE"],
        ["Galaxy_S20_Ultra.png", "Galaxy S20 Ultra"],
        ["Galaxy_S20_Plus.png", "Galaxy S20+"],
        ["Galaxy_S20.png", "Galaxy S20"],
        ["Galaxy_S20_FE_5G.png", "Galaxy S20 FE"],
        ["Galaxy_S10_Plus.png", "Galaxy S10+"],
        ["Galaxy_S10.png", "Galaxy S10"],
        ["Galaxy_S10_E.png", "Galaxy S10e"],
        ["Galaxy_S10_Lite.png", "Galaxy S10 Lite"],
        ["Galaxy_S9_Plus.png", "Galaxy S9+"],
        ["Galaxy_S9.png", "Galaxy S9"],
        ["Galaxy_S8_Plus.png", "Galaxy S8+"],
        ["Galaxy_S8.png", "Galaxy S8"],
        ["Galaxy_S7_Edge.png", "Galaxy S7 Edge"],
      ],
    },
    {
      name: "Galaxy Z",
      subfolder: "Series Z",
      items: [
        ["Galaxy_Z_Fold_7.webp", "Galaxy Z Fold 7"],
        ["Galaxy_Z_Fold_6.webp", "Galaxy Z Fold 6"],
        ["Galaxy_Z_Fold_5.webp", "Galaxy Z Fold 5"],
        ["Galaxy_Z_Fold_4.png", "Galaxy Z Fold 4"],
        ["Galaxy_Z_Fold_3_5G.png", "Galaxy Z Fold 3"],
        ["Galaxy_Z_Fold_2.png", "Galaxy Z Fold 2"],
        ["Galaxy_Z_Flip_7.webp", "Galaxy Z Flip 7"],
        ["Galaxy_Z_Flip_6.webp", "Galaxy Z Flip 6"],
        ["Galaxy_Z_Flip_5.png", "Galaxy Z Flip 5"],
        ["Galaxy_Z_Flip_4.png", "Galaxy Z Flip 4"],
        ["Galaxy_Z_Flip_3_5G.png", "Galaxy Z Flip 3"],
      ],
    },
    {
      name: "Galaxy Note",
      subfolder: "Series Note",
      items: [
        ["Galaxy_Note_20_Ultra_5G.png", "Galaxy Note 20 Ultra"],
        ["Galaxy_Note_20_5G.png", "Galaxy Note 20"],
        ["Galaxy_Note_10_Plus.png", "Galaxy Note 10+"],
        ["Galaxy_Note_10.png", "Galaxy Note 10"],
        ["Galaxy_Note_10_Lite.png", "Galaxy Note 10 Lite"],
        ["Galaxy_Note_9.png", "Galaxy Note 9"],
        ["Galaxy_Note_8.png", "Galaxy Note 8"],
      ],
    },
    {
      name: "Galaxy A",
      subfolder: "Series A",
      items: [
        ["Galaxy_A56_5G.webp", "Galaxy A56"],
        ["Galaxy_A55_5G.webp", "Galaxy A55"],
        ["Galaxy_A54_5G.png", "Galaxy A54"],
        ["Galaxy_A53_5G.png", "Galaxy A53"],
        ["Galaxy_A52S_5G.png", "Galaxy A52s"],
        ["Galaxy_A52_5G.png", "Galaxy A52 5G"],
        ["Galaxy_A52.png", "Galaxy A52"],
        ["Galaxy_A51_5G.png", "Galaxy A51 5G"],
        ["Galaxy_A51.png", "Galaxy A51"],
        ["Galaxy_A50S.png", "Galaxy A50s"],
        ["Galaxy_A50.png", "Galaxy A50"],
        ["Galaxy_A42_5G.png", "Galaxy A42 5G"],
        ["Galaxy_A41.png", "Galaxy A41"],
        ["Galaxy_A36_5G.webp", "Galaxy A36"],
        ["Galaxy_A35_5G.png", "Galaxy A35"],
        ["Galaxy_A34_5G.png", "Galaxy A34"],
        ["Galaxy_A33_5G.png", "Galaxy A33"],
        ["Galaxy_A32_5G.png", "Galaxy A32 5G"],
        ["Galaxy_A32.png", "Galaxy A32"],
        ["Galaxy_A31.png", "Galaxy A31"],
        ["Galaxy_A30S.png", "Galaxy A30s"],
        ["Galaxy_A30.png", "Galaxy A30"],
        ["Galaxy_A23_5G.png", "Galaxy A23 5G"],
        ["Galaxy_A23.png", "Galaxy A23"],
        ["Galaxy_A22_5G.png", "Galaxy A22 5G"],
        ["Galaxy_A22.png", "Galaxy A22"],
        ["Galaxy_A21S.png", "Galaxy A21s"],
        ["Galaxy_A21.png", "Galaxy A21"],
        ["Galaxy_A20S.png", "Galaxy A20s"],
        ["Galaxy_A16_5G.webp", "Galaxy A16"],
        ["Galaxy_A15_5G.png", "Galaxy A15"],
        ["Galaxy_A14_5G.png", "Galaxy A14 5G"],
        ["Galaxy_A14.png", "Galaxy A14"],
        ["Galaxy_A13_5G.png", "Galaxy A13 5G"],
        ["Galaxy_A13.png", "Galaxy A13"],
        ["Galaxy_A12.png", "Galaxy A12"],
        ["Galaxy_A11.png", "Galaxy A11"],
        ["Galaxy_A10S.png", "Galaxy A10s"],
        ["Galaxy_A10.png", "Galaxy A10"],
        ["Galaxy_A90_5G.png", "Galaxy A90 5G"],
        ["Galaxy_A80.png", "Galaxy A80"],
        ["Galaxy_A73_5G.png", "Galaxy A73 5G"],
        ["Galaxy_A72.png", "Galaxy A72"],
        ["Galaxy_A71_5G.png", "Galaxy A71 5G"],
        ["Galaxy_A71.png", "Galaxy A71"],
        ["Galaxy_A70S.png", "Galaxy A70s"],
        ["Galaxy_A70.png", "Galaxy A70"],
        ["Galaxy_A60.png", "Galaxy A60"],
        ["Galaxy_A06.webp", "Galaxy A06"],
        ["Galaxy_A05.webp", "Galaxy A05"],
        ["Galaxy_A04.jpg", "Galaxy A04"],
        ["Galaxy_A03S.png", "Galaxy A03s"],
        ["Galaxy_A03.png", "Galaxy A03"],
        ["Galaxy_A03_Core.png", "Galaxy A03 Core"],
        ["Galaxy_A02S.png", "Galaxy A02s"],
        ["Galaxy_A02.png", "Galaxy A02"],
        ["Galaxy_A01_Core.png", "Galaxy A01 Core"],
        ["Galaxy_A01.png", "Galaxy A01"],
      ],
    },
    {
      name: "Galaxy M",
      subfolder: "Series M",
      items: [
        ["Galaxy M56_5G.webp", "Galaxy M56"],
        ["Galaxy M55_5G.webp", "Galaxy M55"],
        ["Galaxy M54_5G.png", "Galaxy M54"],
        ["Galaxy M53_5G.png", "Galaxy M53"],
        ["Galaxy M52_5G.png", "Galaxy M52"],
        ["Galaxy M51.png", "Galaxy M51"],
        ["Galaxy_M42_5G.png", "Galaxy M42 5G"],
        ["Galaxy M40.png", "Galaxy M40"],
        ["Galaxy M36_5G.png", "Galaxy M36"],
        ["Galaxy M35_5G.png", "Galaxy M35"],
        ["Galaxy M34_5G.png", "Galaxy M34"],
        ["Galaxy M33_5G.png", "Galaxy M33"],
        ["Galaxy M32_5G.png", "Galaxy M32 5G"],
        ["Galaxy M32_4G.png", "Galaxy M32"],
        ["Galaxy M31_PRIME.png", "Galaxy M31 Prime"],
        ["Galaxy M31S.png", "Galaxy M31s"],
        ["Galaxy M31.png", "Galaxy M31"],
        ["Galaxy M30.png", "Galaxy M30"],
        ["Galaxy M21.png", "Galaxy M21"],
        ["Galaxy M20.png", "Galaxy M20"],
        ["Galaxy M16.webp", "Galaxy M16"],
        ["Galaxy M15.webp", "Galaxy M15"],
        ["Galaxy M14.webp", "Galaxy M14"],
        ["Galaxy M13.png", "Galaxy M13"],
        ["Galaxy M12.png", "Galaxy M12"],
        ["Galaxy M11.png", "Galaxy M11"],
        ["Galaxy M10S.png", "Galaxy M10s"],
        ["Galaxy M10.png", "Galaxy M10"],
        ["Galaxy M06.webp", "Galaxy M06"],
        ["Galaxy M04.png", "Galaxy M04"],
        ["Galaxy M02S.png", "Galaxy M02s"],
        ["Galaxy M02.png", "Galaxy M02"],
        ["Galaxy M01_Core.png", "Galaxy M01 Core"],
        ["Galaxy M01S.png", "Galaxy M01s"],
        ["Galaxy M01.png", "Galaxy M01"],
      ],
    },
    {
      name: "Galaxy F",
      subfolder: "Series F",
      items: [
        ["Galaxy_F62.png", "Galaxy F62"],
        ["Galaxy_F54.png", "Galaxy F54"],
        ["Galaxy_F42_5G.png", "Galaxy F42 5G"],
        ["Galaxy_F41.png", "Galaxy F41"],
        ["Galaxy_F34_5G.webp", "Galaxy F34"],
        ["Galaxy_F23_5G.png", "Galaxy F23"],
        ["Galaxy_F22.png", "Galaxy F22"],
        ["Galaxy_F12.png", "Galaxy F12"],
        ["Galaxy_F04.png", "Galaxy F04"],
        ["Galaxy_F02s.png", "Galaxy F02s"],
      ],
    },
    {
      name: "Galaxy J",
      subfolder: "Series J",
      items: [
        ["Galaxy J8.png", "Galaxy J8"],
        ["Galaxy J7_Pro.png", "Galaxy J7 Pro"],
        ["Galaxy J7_Prime.png", "Galaxy J7 Prime"],
        ["Galaxy J7_Max.png", "Galaxy J7 Max"],
        ["Galaxy J7_Duo.png", "Galaxy J7 Duo"],
        ["Galaxy J7_Nxt.png", "Galaxy J7 Nxt"],
        ["Galaxy J7.png", "Galaxy J7"],
        ["Galaxy J6_Plus.png", "Galaxy J6+"],
        ["Galaxy J6.png", "Galaxy J6"],
      ],
    },
  ],
  other: { file: "Samsung_other.jpg", inFolder: true, name: "Other Samsung Model" },
};

/* ───────────────────────── Google Pixel ───────────────────────── */
const googlePixel = {
  slug: "google-pixel",
  folder: "Google Pixel",
  series: [
    {
      name: "Pixel",
      items: [
        ["google-pixel-11-pro-fold.webp", "Pixel 11 Pro Fold"],
        ["google-pixel-11-pro-xl.webp", "Pixel 11 Pro XL"],
        ["google-pixel-11-pro.webp", "Pixel 11 Pro"],
        ["google-pixel-11.webp", "Pixel 11"],
        ["google-pixel-10-pro-fold-min.jpg", "Pixel 10 Pro Fold"],
        ["google-pixel-10-pro-xl-min.jpg", "Pixel 10 Pro XL"],
        ["google-pixel-10-pro-min.jpg", "Pixel 10 Pro"],
        ["google-pixel-10--min.jpg", "Pixel 10"],
        ["google-pixel-10a_copy.webp", "Pixel 10a"],
        ["1734758142google-pixel-9-pro-fold.webp", "Pixel 9 Pro Fold"],
        ["1734758113google-pixel-9-pro-xl.webp", "Pixel 9 Pro XL"],
        ["1734758087google-pixel-9-pro.webp", "Pixel 9 Pro"],
        ["1734758063google-pixel-9.webp", "Pixel 9"],
        ["google-pixel-9a.webp", "Pixel 9a"],
        ["1734767367google-pixel-fold.webp", "Pixel Fold"],
        ["1734765327google-pixel-8-pro.webp", "Pixel 8 Pro"],
        ["1734765700google-pixel-8.webp", "Pixel 8"],
        ["1734765350google-pixel-8a.webp", "Pixel 8a"],
        ["1734765724google-pixel-7-pro.webp", "Pixel 7 Pro"],
        ["1734765810google-pixel-7.webp", "Pixel 7"],
        ["1734765801google-pixel-7a.webp", "Pixel 7a"],
        ["1734765717google-pixel-6-pro.webp", "Pixel 6 Pro"],
        ["1734765858google-pixel-6.webp", "Pixel 6"],
        ["1734765817google-pixel-6a.webp", "Pixel 6a"],
        ["1734766713google-pixel-5-5g.webp", "Pixel 5"],
        ["1734765894google-pixel-5a-5g.webp", "Pixel 5a"],
        ["1734766806google-pixel-4.webp", "Pixel 4"],
        ["1734766765google-pixel-4a-5g.webp", "Pixel 4a 5G"],
        ["1734766834google-pixel-3-xl.webp", "Pixel 3 XL"],
        ["1734766975google-pixel-3a-xl.webp", "Pixel 3a XL"],
        ["1734766981google-pixel-3a.webp", "Pixel 3a"],
        ["1734767236google-pixel-xl.webp", "Pixel XL"],
        ["1734767051google-pixel-2-xl.webp", "Pixel 2 XL"],
        ["1734767112google-pixel-2.webp", "Pixel 2"],
      ],
    },
  ],
  other: null,
};

/* ───────────────────────── OnePlus ───────────────────────── */
const oneplus = {
  slug: "oneplus",
  folder: "OnePlus",
  series: [
    {
      name: "OnePlus",
      items: [
        ["OnePlus_15.webp", "OnePlus 15"],
        ["OnePlus_15R.webp", "OnePlus 15R"],
        ["OnePlus_13S.webp", "OnePlus 13s"],
        ["OnePlus_13.webp", "OnePlus 13"],
        ["OnePlus_13R.webp", "OnePlus 13R"],
        ["OnePlus_12_5G.webp", "OnePlus 12"],
        ["OnePlus_12R_5G.webp", "OnePlus 12R"],
        ["OnePlus_Open.png", "OnePlus Open"],
        ["OnePlus_11_5G.png", "OnePlus 11"],
        ["OnePlus_11R_5G.png", "OnePlus 11R"],
        ["OnePlus_10_Pro_5G.png", "OnePlus 10 Pro"],
        ["OnePlus_10T_5G.png", "OnePlus 10T"],
        ["OnePlus_10R_5G.png", "OnePlus 10R"],
        ["OnePlus_9_Pro_5G.png", "OnePlus 9 Pro"],
        ["OnePlus_9_5G.png", "OnePlus 9"],
        ["OnePlus_9RT_5G.png", "OnePlus 9RT"],
        ["OnePlus_9R_5G.png", "OnePlus 9R"],
        ["OnePlus_8_Pro.png", "OnePlus 8 Pro"],
        ["OnePlus_8T.png", "OnePlus 8T"],
        ["OnePlus_8.png", "OnePlus 8"],
        ["OnePlus_7_Pro.png", "OnePlus 7 Pro"],
        ["OnePlus_7T_Pro.png", "OnePlus 7T Pro"],
        ["OnePlus_7T.png", "OnePlus 7T"],
        ["OnePlus_7.png", "OnePlus 7"],
        ["OnePlus_6T.png", "OnePlus 6T"],
        ["OnePlus_6.png", "OnePlus 6"],
        ["OnePlus_5T.png", "OnePlus 5T"],
        ["OnePlus_5.png", "OnePlus 5"],
        ["OnePlus_3T.png", "OnePlus 3T"],
        ["OnePlus_3.png", "OnePlus 3"],
      ],
    },
    {
      name: "OnePlus Nord",
      items: [
        ["OnePlus_Nord_5.webp", "OnePlus Nord 5"],
        ["OnePlus_Nord_CE5.webp", "OnePlus Nord CE 5"],
        ["OnePlus_Nord_4.webp", "OnePlus Nord 4"],
        ["OnePlus_Nord_CE_4.webp", "OnePlus Nord CE 4"],
        ["OnePlus_Nord_CE_4_Lite_5G.webp", "OnePlus Nord CE 4 Lite"],
        ["OnePlus_Nord_3_5G.png", "OnePlus Nord 3"],
        ["OnePlus_Nord_CE_3_5G.png", "OnePlus Nord CE 3"],
        ["OnePlus_Nord_CE_3_Lite_5G.png", "OnePlus Nord CE 3 Lite"],
        ["OnePlus_Nord_2T_5G.png", "OnePlus Nord 2T"],
        ["OnePlus_Nord_2_5G.png", "OnePlus Nord 2"],
        ["OnePlus_nord_CE_2_5G.png", "OnePlus Nord CE 2"],
        ["OnePlus_Nord_CE_2_Lite_5G.png", "OnePlus Nord CE 2 Lite"],
        ["OnePlus_Nord_CE_5G.png", "OnePlus Nord CE"],
        ["OnePlus_Nord.png", "OnePlus Nord"],
      ],
    },
  ],
  other: { file: "OnePlus_OTHER.jpg", inFolder: true, name: "Other OnePlus Model" },
};

/* ───────────────────────── Xiaomi / Redmi / POCO ───────────────────────── */
const xiaomi = {
  slug: "xiaomi",
  folder: "Xiaomi",
  series: [
    {
      name: "Redmi Note",
      items: [
        ["xiaomi_redmi_note_14_pro_plus_5g.webp", "Redmi Note 14 Pro+ 5G"],
        ["1729861848xiaomi-redmi-note-13-pro-plus.jpg", "Redmi Note 13 Pro+"],
        ["1729861784redmi-note-13-pro-5g.png", "Redmi Note 13 Pro 5G"],
        ["1729861686redmi-note-13-pro.png", "Redmi Note 13 Pro"],
        ["1729861889redmi-note-13-5g.png", "Redmi Note 13"],
        ["1729861550Redmi Note 12 Pro Plus.jpg", "Redmi Note 12 Pro+"],
        ["1729860878redmi-note-12.jpg", "Redmi Note 12"],
        ["Redmi Note 11 Pro Plus 5G.jpg", "Redmi Note 11 Pro+ 5G"],
        ["Redmi Note 11 Pro.jpg", "Redmi Note 11 Pro"],
        ["Redmi Note 11T 5G.jpg", "Redmi Note 11T 5G"],
        ["Redmi Note 11s.jpg", "Redmi Note 11S"],
        ["Redmi Note 11 4G.jpg", "Redmi Note 11"],
        ["1729860838xiaomi-redmi-note-11se.jpg", "Redmi Note 11 SE"],
        ["Redmi Note 10 Pro Max.jpg", "Redmi Note 10 Pro Max"],
        ["Redmi Note 10 Pro.jpg", "Redmi Note 10 Pro"],
        ["Redmi Note 10s.jpg", "Redmi Note 10S"],
        ["Redmi Note 10.jpg", "Redmi Note 10"],
        ["redmi-note-10-prime.webp", "Redmi Note 10 Prime"],
        ["Mi Note 9 Pro Max.jpg", "Redmi Note 9 Pro Max"],
        ["Mi Note 9 Pro.jpg", "Redmi Note 9 Pro"],
        ["Mi Note 9.jpg", "Redmi Note 9"],
        ["Redmi Note 8 Pro.png", "Redmi Note 8 Pro"],
        ["Redmi Note 8.jpg", "Redmi Note 8"],
        ["Redmi Note Prime.jpg", "Redmi Note (Prime)"],
      ],
    },
    {
      name: "Redmi",
      items: [
        ["1729861819xiaomi-redmi-13c.jpg", "Redmi 13C"],
        ["1729861931xiaomi-redmi-13-5g.jpg", "Redmi 13 5G"],
        ["1729861604Redmi 12 Pro.png", "Redmi 12 Pro"],
        ["1729861645xiaomi-redmi-12.jpg", "Redmi 12"],
        ["1705049019Redmi 12c.jpg", "Redmi 12C"],
        ["Xiaomi_Redmi_11_Prime.webp", "Redmi 11 Prime"],
        ["Redmi 10 Prime.jpg", "Redmi 10 Prime"],
        ["xiaomi-redmi-10x-5g1.webp", "Redmi 10X 5G"],
        ["xiaomi-redmi-10c.webp", "Redmi 10C"],
        ["xiaomi-redmi-10a.webp", "Redmi 10A"],
        ["Redmi 9 Power.jpg", "Redmi 9 Power"],
        ["Redmi 9.jpg", "Redmi 9"],
        ["Redmi 9i.jpg", "Redmi 9i"],
        ["Redmi 9C.jpg", "Redmi 9C"],
        ["Redmi 9A.jpg", "Redmi 9A"],
        ["Redmi 8.png", "Redmi 8"],
        ["Redmi 8A.jpg", "Redmi 8A"],
        ["Redmi Y3.png", "Redmi Y3"],
      ],
    },
    {
      name: "Redmi K",
      items: [
        ["Redmi_K80_Pro.webp", "Redmi K80 Pro"],
        ["Redmi_K80.webp", "Redmi K80"],
        ["Xiaomi_Redmi_K40.webp", "Redmi K40"],
        ["Redmi K20 Pro.png", "Redmi K20 Pro"],
        ["Redmi K20.png", "Redmi K20"],
      ],
    },
    {
      name: "POCO",
      items: [["Poco_c51.webp", "POCO C51"]],
    },
    {
      name: "Mi / Xiaomi",
      items: [
        ["1729861985xiaomi-14-ultra.jpg", "Xiaomi 14 Ultra"],
        ["1729861959xiaomi-14-civi-.jpg", "Xiaomi 14 Civi"],
        ["xiaomi-14-new.jpg", "Xiaomi 14"],
        ["Mi 11 Ultra.jpg", "Mi 11 Ultra"],
        ["Mi 11X Pro.png", "Mi 11X Pro"],
        ["Mi 11X.jpg", "Mi 11X"],
        ["mi-11i-hypercharge.jpg", "Mi 11i"],
        ["Mi 11 Lite.jpg", "Mi 11 Lite"],
        ["Mi 10T Pro.jpg", "Mi 10T Pro"],
        ["Mi 10T.jpg", "Mi 10T"],
        ["Mi 10i.jpg", "Mi 10i"],
        ["Mi 10.jpg", "Mi 10"],
        ["Xiaomi Black Shark 2.png", "Black Shark 2"],
      ],
    },
  ],
  other: { file: "MI_Other.jpg", inFolder: true, name: "Other Xiaomi Model" },
};

/* ───────────────────────── Motorola ───────────────────────── */
const motorola = {
  slug: "motorola",
  folder: "Motorola",
  series: [
    {
      name: "Motorola Edge",
      items: [
        ["Motorola_Edge_60_Pro.webp", "Edge 60 Pro"],
        ["Motorola_Edge_60_Fusion.webp", "Edge 60 Fusion"],
        ["Motorola_Edge_60_Stylus.webp", "Edge 60 Stylus"],
        ["Motorola_Edge_60s.webp", "Edge 60s"],
        ["Motorola_Edge_60.webp", "Edge 60"],
        ["1728976759motorola-edge-50-ultra.jpg", "Edge 50 Ultra"],
        ["1729257688motorola-edge50-pro.jpg", "Edge 50 Pro"],
        ["1728976603motorola-edge-50-fusion.jpg", "Edge 50 Fusion"],
        ["1729257582motorola-edge-50-neo.jpg", "Edge 50 Neo"],
        ["1729256693motorola-edge-50-5g.jpg", "Edge 50"],
        ["motorola-edge-40-pro-min.jpg", "Edge 40 Pro"],
        ["1729257721motorola-edge-40-neo.jpg", "Edge 40 Neo"],
        ["Motorola_Moto_Edge_40.webp", "Edge 40"],
        ["Motorola_Moto_Edge_30_Ultra.webp", "Edge 30 Ultra"],
        ["Motorola_Moto_Edge_30_Pro.webp", "Edge 30 Pro"],
        ["Motorola_Moto_Edge_30_Plus.webp", "Edge 30 Fusion+"],
        ["Motorola_Moto_Edge_30_Fusion.webp", "Edge 30 Fusion"],
        ["motorola-edge30-neo-min.jpg", "Edge 30 Neo"],
        ["Motorola_Moto_Edge_30.webp", "Edge 30"],
        ["Motorola_Moto_Edge_20_Pro.webp", "Edge 20 Pro"],
        ["Motorola_Moto_Edge_20_Fusion.webp", "Edge 20 Fusion"],
        ["Motorola_Moto_Edge_20_Lite.webp", "Edge 20 Lite"],
        ["Motorola_Moto_Edge_20.webp", "Edge 20"],
        ["motorola-edge-2021-min.jpg", "Edge (2021)"],
        ["Motorola_Moto_Edge_S30.webp", "Edge S30"],
        ["Motorola_Moto_Edge_Plus.webp", "Edge+"],
        ["Motorola_Moto_Edge.webp", "Edge"],
      ],
    },
    {
      name: "Motorola Razr",
      items: [
        ["motorola-razr-60-ultra-5g-min.jpg", "Razr 60 Ultra"],
        ["motorola-razr-60-min.jpg", "Razr 60"],
        ["1734601244Motorola razr  plus 2024.webp", "Razr+ (2024)"],
        ["1734601113Motorola Razr 50 Ultra.webp", "Razr 50 Ultra"],
        ["1734601251Motorola Razr 50.webp", "Razr 50"],
        ["1734601181Motorola Razr 2024.webp", "Razr (2024)"],
        ["1734601174Motorola Razr 40 Ultra.webp", "Razr 40 Ultra"],
        ["1734601144Motorola Razr 40.webp", "Razr 40"],
        ["1734601129Motorola Razr 2022.webp", "Razr (2022)"],
        ["1734601121Motorola Razr 5G.webp", "Razr 5G"],
        ["Motorola_Moto_Razr_2_5G.webp", "Razr 2 5G"],
        ["1734601077Motorola Razr 2019.webp", "Razr (2019)"],
        ["Motorola_Moto_Razr.webp", "Razr (Classic)"],
      ],
    },
    {
      name: "Moto G",
      items: [
        ["Motorola_Moto_G85.webp", "Moto G85"],
        ["1728975726motorola-moto-g84.jpg", "Moto G84"],
        ["Motorola_Moto_G82.webp", "Moto G82"],
        ["motorola-moto-g73-min.jpg", "Moto G73"],
        ["Motorola_Moto_G71_5G.webp", "Moto G71 5G"],
        ["Motorola_Moto_G71s.webp", "Moto G71s"],
        ["1729258041Motorola G64 5g.jpg", "Moto G64 5G"],
        ["Motorola_Moto_G62.webp", "Moto G62"],
        ["Motorola_Moto_G60s.webp", "Moto G60s"],
        ["1730534249motorola-moto-g54.jpg", "Moto G54"],
        ["1730534278motorola-moto-g54 -power.jpg", "Moto G54 Power"],
        ["motorola-moto-g53-min.jpg", "Moto G53"],
        ["Motorola_Moto_G52.webp", "Moto G52"],
        ["Motorola_Moto_G51_5G.webp", "Moto G51 5G"],
        ["Motorola_Moto_G50_5G.webp", "Moto G50 5G"],
        ["1729257752motorola-moto-g45-5g.jpg", "Moto G45 5G"],
        ["Motorola_Moto_G42.webp", "Moto G42"],
        ["Motorola_Moto_G41.webp", "Moto G41"],
        ["Motorola_Moto_G40_Fusion.webp", "Moto G40 Fusion"],
        ["Motorola_Motorola_G34.webp", "Moto G34"],
        ["Motorola_Moto_G32.webp", "Moto G32"],
        ["Motorola_Moto_G31.webp", "Moto G31"],
        ["Motorola_Moto_G30.webp", "Moto G30"],
        ["motorola-moto-g23-min.jpg", "Moto G23"],
        ["Motorola_Moto_G22.webp", "Moto G22"],
        ["Motorola_Moto_G_2022.webp", "Moto G (2022)"],
        ["Motorola_Moto_G200_5G.webp", "Moto G200 5G"],
        ["motorola-moto-g100-min.jpg", "Moto G100"],
        ["Motorola_Moto_G14.webp", "Moto G14"],
        ["motorola-moto-g13-min.jpg", "Moto G13"],
        ["Motorola_Moto_G9_Plus.webp", "Moto G9 Plus"],
        ["Motorola_Moto_G9_Power.webp", "Moto G9 Power"],
        ["Motorola_Moto_G9.webp", "Moto G9"],
        ["Motorola_Moto_G9_Play.webp", "Moto G9 Play"],
        ["Motorola_Moto_G8_Plus.webp", "Moto G8 Plus"],
        ["Motorola_Moto_G8_Power_Lite.webp", "Moto G8 Power Lite"],
        ["Motorola_Motorola_Moto_G8_Play.webp", "Moto G8 Play"],
        ["motorola-moto-g20-min.jpg", "Moto G20"],
        ["Motorola_Moto_G_5G_Plus.webp", "Moto G 5G Plus"],
        ["Motorola_Moto_G_5G.webp", "Moto G 5G"],
        ["Motorola_Moto_G_Stylus_5G.webp", "Moto G Stylus 5G"],
        ["Motorola_Moto_G_Power_2021.webp", "Moto G Power (2021)"],
        ["Motorola_Moto_G_Pure.webp", "Moto G Pure"],
        ["Motorola_Moto_G7_Plus.webp", "Moto G7 Plus"],
        ["Motorola_Motorola_Moto_G7_Play.webp", "Moto G7 Play"],
        ["1729258088motorola-moto-g04-4g.jpg", "Moto G04"],
        ["Motorola_Moto_G10_Power.webp", "Moto G10 Power"],
      ],
    },
    {
      name: "Moto E",
      items: [
        ["Motorola_Moto_E32s.webp", "Moto E32s"],
        ["Motorola_Moto_E32.webp", "Moto E32"],
        ["Motorola_Moto_E30.webp", "Moto E30"],
        ["Motorola_Moto_E20.webp", "Moto E20"],
      ],
    },
    {
      name: "Moto One",
      items: [
        ["motorola-one-5g-min.jpg", "One 5G"],
        ["motorola-one-hyper-min.jpg", "One Hyper"],
        ["Motorola_Moto_One_Fusion_Plus.webp", "One Fusion+"],
        ["motorola-one-fusion-min.jpg", "One Fusion"],
        ["Motorola_Moto_One_Action.webp", "One Action"],
        ["Motorola_Motorola_One_Zoom_OLED.webp", "One Zoom"],
        ["Motorola_Moto_One_Macro.webp", "One Macro"],
        ["Motorola_Moto_One_Vision.webp", "One Vision"],
        ["motorola-one-power-p30-note-min.jpg", "One Power (P30 Note)"],
        ["motorola-one-p30-play-min.jpg", "One P30 Play"],
      ],
    },
    {
      name: "Moto Z & Legacy",
      items: [
        ["motorola-moto-x30-pro-min.jpg", "Moto X30 Pro"],
        ["Motorola_Moto_X30.webp", "Moto X30"],
        ["motorola-moto-z4-min.jpg", "Moto Z4"],
        ["motorola-moto-z4-force-min.jpg", "Moto Z4 Force"],
        ["motorola-moto-z3-min.jpg", "Moto Z3"],
        ["motorola-moto-z3-play-min.jpg", "Moto Z3 Play"],
        ["Motorola_Moto_Z2_Force.webp", "Moto Z2 Force"],
        ["motorola-moto-p30.jpg", "Moto P30"],
      ],
    },
  ],
  other: null,
};

const BRANDS = [apple, samsung, googlePixel, oneplus, xiaomi, motorola];

async function convert(srcPath, outPath) {
  await sharp(srcPath)
    .resize({ width: 480, height: 480, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outPath);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // unavailable placeholder
  const unavailableOutPath = path.join(OUT_DIR, "unavailable.webp");
  await convert(UNAVAILABLE_SRC, unavailableOutPath);
  const UNAVAILABLE_WEB_PATH = "/images/models/unavailable.webp";

  const catalogOut = {};
  const missing = [];

  for (const brand of BRANDS) {
    const brandDir = path.join(OUT_DIR, brand.slug);
    fs.mkdirSync(brandDir, { recursive: true });
    const seriesOut = [];

    for (const series of brand.series) {
      const modelsOut = [];
      for (const [file, name] of series.items) {
        const srcPath = series.subfolder
          ? path.join(SRC_ROOT, brand.folder, series.subfolder, file)
          : path.join(SRC_ROOT, brand.folder, file);
        const slug = slugify(name);
        const outPath = path.join(brandDir, `${slug}.webp`);
        const webPath = `/images/models/${brand.slug}/${slug}.webp`;

        if (!fs.existsSync(srcPath)) {
          missing.push(`${brand.slug} / ${series.name} / ${name} -> MISSING SOURCE: ${srcPath}`);
          modelsOut.push({ name, image: UNAVAILABLE_WEB_PATH });
          continue;
        }
        try {
          await convert(srcPath, outPath);
          modelsOut.push({ name, image: webPath });
        } catch (err) {
          missing.push(`${brand.slug} / ${name} -> CONVERT FAILED: ${err.message}`);
          modelsOut.push({ name, image: UNAVAILABLE_WEB_PATH });
        }
      }
      seriesOut.push({ name: series.name, models: modelsOut });
    }

    if (brand.other) {
      const srcPath = path.join(SRC_ROOT, brand.folder, brand.other.file);
      const slug = "other";
      const outPath = path.join(brandDir, `${slug}.webp`);
      const webPath = `/images/models/${brand.slug}/${slug}.webp`;
      if (fs.existsSync(srcPath)) {
        await convert(srcPath, outPath);
        seriesOut.push({ name: "Other", models: [{ name: brand.other.name, image: webPath }] });
      }
    }

    catalogOut[brand.slug] = seriesOut;
  }

  const banner = `/**
 * AUTO-GENERATED by scripts/build-model-photos.js — do not hand-edit.
 * Regenerate with: node scripts/build-model-photos.js
 */
`;
  const body = `export interface ModelPhoto { name: string; image: string; }
export interface ModelSeries { name: string; models: ModelPhoto[]; }

export const modelPhotoCatalog: Record<string, ModelSeries[]> = ${JSON.stringify(catalogOut, null, 2)};
`;
  fs.writeFileSync(DATA_OUT, banner + body, "utf8");

  // Collision check: same image path claimed by two different model names within a brand
  let collisions = 0;
  for (const slug in catalogOut) {
    const seen = new Map();
    for (const series of catalogOut[slug]) {
      for (const m of series.models) {
        if (m.image === UNAVAILABLE_WEB_PATH) continue;
        if (seen.has(m.image) && seen.get(m.image) !== m.name) {
          console.log(`COLLISION in ${slug}: image ${m.image} used by both "${seen.get(m.image)}" and "${m.name}"`);
          collisions++;
        }
        seen.set(m.image, m.name);
      }
    }
  }
  console.log(collisions ? `\n${collisions} COLLISIONS FOUND` : "\nNo image-path collisions within any brand.");

  console.log(`Wrote ${DATA_OUT}`);
  console.log(`Brands processed: ${BRANDS.map((b) => b.slug).join(", ")}`);
  let total = 0;
  for (const slug in catalogOut) {
    const count = catalogOut[slug].reduce((n, s) => n + s.models.length, 0);
    total += count;
    console.log(`  ${slug}: ${count} models across ${catalogOut[slug].length} series`);
  }
  console.log(`Total models: ${total}`);
  if (missing.length) {
    console.log(`\n${missing.length} MISSING/FAILED source files (used unavailable placeholder):`);
    missing.forEach((m) => console.log("  - " + m));
  } else {
    console.log("\nNo missing source files — every mapped photo resolved.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
