const { sequelize, Category, Subcategory, Product } = require("../models");

const categoriesData = [
  {
    key: "soaps",
    name: "Jabones",
    description: "Colección Mizu para higiene y bienestar diario.",
  },
  {
    key: "dental",
    name: "Higiene dental",
    description: "Soluciones completas para el cuidado bucal Mizu.",
  },
  {
    key: "bodycare",
    name: "Cuidado corporal",
    description: "Rutinas Mizu para hidratar, proteger y perfumar tu piel.",
  },
  {
    key: "skincare",
    name: "Skin care",
    description: "Tratamientos faciales Mizu para un brillo saludable.",
  },
  {
    key: "haircare",
    name: "Capilar",
    description: "Línea Mizu para nutrir y estilizar el cabello.",
  },
];

const subcategoriesData = [
  // Jabones
  { key: "soaps_liquidos", name: "Jabones líquidos", categoryKey: "soaps", description: "Texturas fluidas para una limpieza suave." },
  { key: "soaps_tocador", name: "Jabones de tocador", categoryKey: "soaps", description: "Barras perfumadas con fórmulas cremosas." },
  { key: "soaps_manos", name: "Jabones de manos", categoryKey: "soaps", description: "Limpieza diaria con fórmulas hidratantes." },
  { key: "soaps_espuma", name: "Espuma para manos", categoryKey: "soaps", description: "Aplicadores en espuma listos para usar." },
  { key: "soaps_sales", name: "Sales de baño", categoryKey: "soaps", description: "Experiencias aromáticas para inmersión." },

  // Higiene dental
  { key: "dental_cepillos", name: "Cepillos de dientes", categoryKey: "dental", description: "Cepillos conscientes con cerdas suaves." },
  { key: "dental_pasta", name: "Pasta de dientes", categoryKey: "dental", description: "Pastas funcionales para distintas necesidades." },
  { key: "dental_hilo", name: "Hilo dental", categoryKey: "dental", description: "Opciones sedosas y resistentes para espacios interdentales." },
  { key: "dental_enjuague", name: "Enjuague bucal", categoryKey: "dental", description: "Frescura prolongada con ingredientes suaves." },
  { key: "dental_interdentales", name: "Cepillos interdentales", categoryKey: "dental", description: "Precisión para zonas difíciles." },

  // Cuidado corporal
  { key: "body_crema", name: "Crema hidratante", categoryKey: "bodycare", description: "Hidratación profunda de rápida absorción." },
  { key: "body_exfoliante", name: "Exfoliante corporal", categoryKey: "bodycare", description: "Texturas que renuevan y suavizan la piel." },
  { key: "body_desodorante_barra", name: "Desodorante en barra", categoryKey: "bodycare", description: "Protección confiable con aplicación sólida." },
  { key: "body_desodorante_crema", name: "Desodorante en crema", categoryKey: "bodycare", description: "Fórmulas cremosas para piel sensible." },
  { key: "body_desodorante_aerosol", name: "Desodorante en aerosol", categoryKey: "bodycare", description: "Frescura inmediata en formato spray." },
  { key: "body_protector_solar", name: "Protector solar corporal", categoryKey: "bodycare", description: "Bloqueo UVA/UVB para todo el cuerpo." },
  { key: "body_perfume", name: "Perfumes", categoryKey: "bodycare", description: "Fragancias versátiles inspiradas en el agua." },

  // Skin care
  { key: "skin_exfoliante", name: "Exfoliante facial", categoryKey: "skincare", description: "Texturas delicadas que iluminan." },
  { key: "skin_gel", name: "Gel de limpieza", categoryKey: "skincare", description: "Limpieza equilibrada sin resecar." },
  { key: "skin_esponjas", name: "Esponjas faciales", categoryKey: "skincare", description: "Aplica y exfolia con suavidad." },
  { key: "skin_mascarillas", name: "Mascarillas", categoryKey: "skincare", description: "Tratamientos concentrados para diferentes necesidades." },
  { key: "skin_serum", name: "Serum", categoryKey: "skincare", description: "Activos potentes en texturas ligeras." },
  { key: "skin_solar", name: "Protector solar facial", categoryKey: "skincare", description: "Filtros ligeros ideales para uso diario." },

  // Capilar
  { key: "hair_shampoo", name: "Shampoo", categoryKey: "haircare", description: "Limpieza eficaz adaptada a cada tipo de cabello." },
  { key: "hair_acondicionador", name: "Acondicionador", categoryKey: "haircare", description: "Desenredo y nutrición con acabado sedoso." },
  { key: "hair_mascarilla", name: "Mascarilla capilar", categoryKey: "haircare", description: "Reparación intensiva de medios a puntas." },
  { key: "hair_termico", name: "Protector térmico", categoryKey: "haircare", description: "Escudo contra el calor de planchas y secadores." },
  { key: "hair_crema", name: "Crema de peinar", categoryKey: "haircare", description: "Definición y control sin peso." },
  { key: "hair_serum", name: "Serum capilar", categoryKey: "haircare", description: "Brillo inmediato y sellado de puntas." },
];

const productsData = [
  // Jabones líquidos
  {
    name: "Mizu Pure Flow",
    description: "Jabón líquido revitalizante con notas marinas y minerales hidratantes.",
    price: "8.90",
    stock: 80,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_liquidos",
  },
  {
    name: "Mizu Gentle Stream",
    description: "Fórmula sedosa para piel sensible con extractos botánicos calmantes.",
    price: "9.50",
    stock: 75,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_liquidos",
  },
  {
    name: "Mizu Aqua Calm",
    description: "Limpieza aromática con espuma ligera y sensación fresca prolongada.",
    price: "9.20",
    stock: 70,
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_liquidos",
  },

  // Jabones de tocador
  {
    name: "Mizu Essence Bar",
    description: "Barra cremosa con manteca de karité y aroma a brisa suave.",
    price: "3.50",
    stock: 120,
    imageUrl: "https://images.unsplash.com/photo-1581574209461-7aa6c3071dd8?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_tocador",
  },
  {
    name: "Mizu Crystal Touch",
    description: "Pastilla translúcida con infusión de agua termal japonesa.",
    price: "3.80",
    stock: 110,
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_tocador",
  },
  {
    name: "Mizu Cloud Soap",
    description: "Textura esponjosa que libera hidratación cada vez que se usa.",
    price: "3.60",
    stock: 115,
    imageUrl: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_tocador",
  },

  // Jabones de manos
  {
    name: "Mizu Daily Wash",
    description: "Limpieza diaria equilibrada con extracto de bambú y glicerina.",
    price: "6.20",
    stock: 140,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_manos",
  },
  {
    name: "Mizu Soft Drop",
    description: "Jabón de manos con textura gel y aroma floral acuático.",
    price: "6.40",
    stock: 135,
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8756b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_manos",
  },
  {
    name: "Mizu Refresh Foam",
    description: "Dispensador espumante con notas cítricas y vitamina E.",
    price: "6.80",
    stock: 130,
    imageUrl: "https://images.unsplash.com/photo-1521579971123-1192931a1452?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_manos",
  },

  // Espuma para manos
  {
    name: "Mizu AirFoam",
    description: "Espuma ultra ligera con pH neutro para pieles delicadas.",
    price: "7.10",
    stock: 90,
    imageUrl: "https://images.unsplash.com/photo-1522046785566-6cc67882d0a5?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_espuma",
  },
  {
    name: "Mizu Silk Bubbles",
    description: "Fórmula espumosa con seda marina y aroma floral suave.",
    price: "7.40",
    stock: 85,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_espuma",
  },
  {
    name: "Mizu PureSense",
    description: "Espuma antibacterial con hidratación prolongada.",
    price: "7.20",
    stock: 88,
    imageUrl: "https://images.unsplash.com/photo-1505575967455-40e256f73376?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_espuma",
  },

  // Sales de baño
  {
    name: "Mizu Mineral Soak",
    description: "Sales marinas ricas en magnesio para baños relajantes.",
    price: "12.90",
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_sales",
  },
  {
    name: "Mizu Ocean Bloom",
    description: "Aroma floral oceánico con pétalos liofilizados.",
    price: "13.40",
    stock: 58,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_sales",
  },
  {
    name: "Mizu Serenity Salt",
    description: "Sales de baño con lavanda azul para relajación nocturna.",
    price: "13.10",
    stock: 62,
    imageUrl: "https://images.unsplash.com/photo-1505575967455-40e256f73376?auto=format&fit=crop&w=800&q=80",
    categoryKey: "soaps",
    subcategoryKey: "soaps_sales",
  },

  // Higiene dental - Cepillos
  {
    name: "Mizu Bamboo Clean",
    description: "Cepillo biodegradable con cerdas de carbón activado.",
    price: "4.50",
    stock: 150,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_cepillos",
  },
  {
    name: "Mizu SoftWave",
    description: "Cerdas onduladas ultra suaves para encías sensibles.",
    price: "4.80",
    stock: 140,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_cepillos",
  },
  {
    name: "Mizu PureSmile",
    description: "Cepillo de diseño ergonómico con punta pulidora.",
    price: "5.00",
    stock: 145,
    imageUrl: "https://images.unsplash.com/photo-1585559605151-879c0e9b3a2d?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_cepillos",
  },

  // Pasta dental
  {
    name: "Mizu MintCare",
    description: "Pasta con flúor y menta fresca para protección diaria.",
    price: "3.90",
    stock: 160,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_pasta",
  },
  {
    name: "Mizu Whitening Flow",
    description: "Acción blanqueadora progresiva con polvos perlados.",
    price: "4.20",
    stock: 155,
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8756b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_pasta",
  },
  {
    name: "Mizu Sensitive Calm",
    description: "Fórmula calmante con potasio y camomila.",
    price: "4.10",
    stock: 150,
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8756b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_pasta",
  },

  // Hilo dental
  {
    name: "Mizu SilkLine",
    description: "Hilo sedoso con recubrimiento de cera vegetal.",
    price: "2.90",
    stock: 170,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_hilo",
  },
  {
    name: "Mizu Fresh Thread",
    description: "Sabor mentolado y filamentos reforzados para no romperse.",
    price: "3.10",
    stock: 165,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_hilo",
  },
  {
    name: "Mizu DeepClean",
    description: "Hilo plano que cubre más superficie interdental.",
    price: "3.20",
    stock: 168,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_hilo",
  },

  // Enjuague bucal
  {
    name: "Mizu AquaRinse",
    description: "Enjuague sin alcohol con efecto anti placa.",
    price: "5.80",
    stock: 130,
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8756b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_enjuague",
  },
  {
    name: "Mizu MintBloom",
    description: "Refrescancia intensa con extracto de menta japonesa.",
    price: "6.10",
    stock: 128,
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8756b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_enjuague",
  },
  {
    name: "Mizu Fresh Breath",
    description: "Combate halitosis con zinc y aceites esenciales.",
    price: "6.30",
    stock: 125,
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8756b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_enjuague",
  },

  // Cepillos interdentales
  {
    name: "Mizu Precision Tip",
    description: "Cepillos cónicos para espacios estrechos y ortodoncias.",
    price: "4.40",
    stock: 140,
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8756b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_interdentales",
  },
  {
    name: "Mizu MicroClean",
    description: "Mini escobillas con filamentos flexibles.",
    price: "4.60",
    stock: 138,
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8756b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_interdentales",
  },
  {
    name: "Mizu SlimWave",
    description: "Diseño ultrafino que alcanza zonas posteriores.",
    price: "4.80",
    stock: 136,
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8756b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "dental",
    subcategoryKey: "dental_interdentales",
  },

  // Cuidado corporal - Crema hidratante
  {
    name: "Mizu HydraBalance",
    description: "Crema corporal con ácido hialurónico y algas azules.",
    price: "14.90",
    stock: 70,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_crema",
  },
  {
    name: "Mizu AquaVeil",
    description: "Loción ligera con acabado aterciopelado y aloe.",
    price: "13.80",
    stock: 72,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_crema",
  },
  {
    name: "Mizu Silken Touch",
    description: "Crema nutritiva con manteca de cupuaçu y vitamina B5.",
    price: "15.20",
    stock: 68,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_crema",
  },

  // Exfoliante corporal
  {
    name: "Mizu Sea Polish",
    description: "Exfoliante con sales marinas y aceites hidratantes.",
    price: "16.50",
    stock: 55,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_exfoliante",
  },
  {
    name: "Mizu Sand Glow",
    description: "Granulado volcánico para una piel uniforme y luminosa.",
    price: "16.90",
    stock: 53,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_exfoliante",
  },
  {
    name: "Mizu Smooth Flow",
    description: "Exfoliante en gel con enzimas frutales.",
    price: "15.80",
    stock: 57,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_exfoliante",
  },

  // Desodorante en barra
  {
    name: "Mizu FreshCore",
    description: "Protección 48h con minerales activos y fragancia aqua.",
    price: "7.30",
    stock: 100,
    imageUrl: "https://images.unsplash.com/photo-1598514982271-1c4f9da3d4a3?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_desodorante_barra",
  },
  {
    name: "Mizu AquaShield",
    description: "Barra sólida hipoalergénica con extractos marinos.",
    price: "7.60",
    stock: 98,
    imageUrl: "https://images.unsplash.com/photo-1598514982271-1c4f9da3d4a3?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_desodorante_barra",
  },
  {
    name: "Mizu Pure Deo",
    description: "Desodorante sin aluminio con aroma limpio y ligero.",
    price: "7.40",
    stock: 102,
    imageUrl: "https://images.unsplash.com/photo-1598514982271-1c4f9da3d4a3?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_desodorante_barra",
  },

  // Desodorante en crema
  {
    name: "Mizu SoftGuard",
    description: "Crema desodorante nutritiva con aceites ligeros.",
    price: "8.20",
    stock: 90,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_desodorante_crema",
  },
  {
    name: "Mizu CalmSkin",
    description: "Fórmula en crema calmante con avena y manzanilla.",
    price: "8.40",
    stock: 88,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_desodorante_crema",
  },
  {
    name: "Mizu Daily Shield",
    description: "Crema de rápida absorción con complejo mineral.",
    price: "8.10",
    stock: 92,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_desodorante_crema",
  },

  // Desodorante en aerosol
  {
    name: "Mizu AirFresh",
    description: "Spray refrescante con micro cápsulas perfumadas.",
    price: "6.90",
    stock: 105,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_desodorante_aerosol",
  },
  {
    name: "Mizu Ocean Mist",
    description: "Aerosol anti transpirante con fragancia marina.",
    price: "7.10",
    stock: 103,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_desodorante_aerosol",
  },
  {
    name: "Mizu CloudScent",
    description: "Spray ultra fino con notas ligeras y secado rápido.",
    price: "7.00",
    stock: 104,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_desodorante_aerosol",
  },

  // Protector solar corporal
  {
    name: "Mizu SunVeil",
    description: "Protector solar FPS 30 resistente al agua.",
    price: "19.50",
    stock: 65,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_protector_solar",
  },
  {
    name: "Mizu Radiant Screen",
    description: "Protector FPS 50 con vitamina C y textura gel.",
    price: "21.00",
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_protector_solar",
  },
  {
    name: "Mizu DayGuard",
    description: "Protección diaria con acabado invisible y toque seco.",
    price: "20.40",
    stock: 62,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_protector_solar",
  },

  // Perfumes
  {
    name: "Mizu Eau Pure",
    description: "Fragancia fresca acuática inspirada en rocío matinal.",
    price: "35.00",
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_perfume",
  },
  {
    name: "Mizu Wave Essence",
    description: "Perfume ligero con notas de flor de agua y té blanco.",
    price: "37.50",
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_perfume",
  },
  {
    name: "Mizu Bloom Air",
    description: "Fragancia etérea con pétalos acuáticos y almizcle limpio.",
    price: "36.20",
    stock: 42,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "bodycare",
    subcategoryKey: "body_perfume",
  },

  // Skin care - Exfoliante facial
  {
    name: "Mizu GlowScrub",
    description: "Exfoliante facial con micro perlas de arroz.",
    price: "18.90",
    stock: 55,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_exfoliante",
  },
  {
    name: "Mizu Clear Drop",
    description: "Gel exfoliante con ácidos suaves y agua de iceberg.",
    price: "19.30",
    stock: 53,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_exfoliante",
  },
  {
    name: "Mizu Aqua Polish",
    description: "Exfoliante enzimático que deja la piel luminosa.",
    price: "19.80",
    stock: 52,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_exfoliante",
  },

  // Gel de limpieza
  {
    name: "Mizu Clean Flow",
    description: "Gel limpiador con ácido salicílico y agua glaciar.",
    price: "17.20",
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_gel",
  },
  {
    name: "Mizu Pure Wash",
    description: "Limpieza ultra suave con extracto de flor de loto.",
    price: "16.80",
    stock: 62,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_gel",
  },
  {
    name: "Mizu Gentle Gel",
    description: "Gel limpiador calmante con niacinamida.",
    price: "17.00",
    stock: 61,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_gel",
  },

  // Esponjas faciales
  {
    name: "Mizu SoftCloud",
    description: "Esponja konjac infusionada con minerales marinos.",
    price: "5.90",
    stock: 90,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_esponjas",
  },
  {
    name: "Mizu Aqua Puff",
    description: "Esponja multifacética para aplicar espumas y geles.",
    price: "5.70",
    stock: 92,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_esponjas",
  },
  {
    name: "Mizu Pure Sponge",
    description: "Esponja suave antibacteriana con fibras vegetales.",
    price: "5.80",
    stock: 91,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_esponjas",
  },

  // Mascarillas
  {
    name: "Mizu Calm Mask",
    description: "Mascarilla de tela calmante con centella asiática.",
    price: "6.90",
    stock: 85,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_mascarillas",
  },
  {
    name: "Mizu Hydra Sheet",
    description: "Mascarilla ultra hidratante con ácido hialurónico triple.",
    price: "7.20",
    stock: 84,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_mascarillas",
  },
  {
    name: "Mizu Mineral Care",
    description: "Mascarilla de arcilla azul que purifica y calma.",
    price: "7.40",
    stock: 82,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_mascarillas",
  },

  // Serum
  {
    name: "Mizu Deep Hydrate",
    description: "Serum intensivo con péptidos y ácido hialurónico.",
    price: "24.90",
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_serum",
  },
  {
    name: "Mizu Glow Serum",
    description: "Concentrado iluminador con vitamina C estable.",
    price: "25.50",
    stock: 48,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_serum",
  },
  {
    name: "Mizu Pure Essence",
    description: "Esencia acuosa con fermentos y niacinamida.",
    price: "23.80",
    stock: 52,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_serum",
  },

  // Protector solar facial
  {
    name: "Mizu FaceGuard",
    description: "Protector facial FPS 50 con acabado mate.",
    price: "22.40",
    stock: 58,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_solar",
  },
  {
    name: "Mizu Radiant Veil",
    description: "Filtro facial luminoso con protección contra luz azul.",
    price: "23.10",
    stock: 56,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_solar",
  },
  {
    name: "Mizu LightShield",
    description: "Protector facial ligero con extracto de nenúfar.",
    price: "22.90",
    stock: 57,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    categoryKey: "skincare",
    subcategoryKey: "skin_solar",
  },

  // Capilar - Shampoo
  {
    name: "Mizu FreshWave",
    description: "Shampoo purificante con algas verdes y menta acuática.",
    price: "11.80",
    stock: 90,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_shampoo",
  },
  {
    name: "Mizu HydraCare",
    description: "Shampoo hidratante con agua termal y ceramidas.",
    price: "12.10",
    stock: 88,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_shampoo",
  },
  {
    name: "Mizu Ocean Clean",
    description: "Limpieza profunda con minerales marinos purificantes.",
    price: "11.90",
    stock: 89,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_shampoo",
  },

  // Acondicionador
  {
    name: "Mizu Smooth Flow",
    description: "Acondicionador alisante con proteínas de seda marina.",
    price: "12.40",
    stock: 85,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_acondicionador",
  },
  {
    name: "Mizu SoftWave",
    description: "Hidratación ligera que aporta suavidad y brillo inmediato.",
    price: "12.60",
    stock: 83,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_acondicionador",
  },
  {
    name: "Mizu Deep Nourish",
    description: "Acondicionador nutritivo con aceite de camelia japonesa.",
    price: "12.90",
    stock: 82,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_acondicionador",
  },

  // Mascarilla capilar
  {
    name: "Mizu Repair Drop",
    description: "Mascarilla reparadora con queratina marina.",
    price: "15.90",
    stock: 70,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_mascarilla",
  },
  {
    name: "Mizu Shine Mask",
    description: "Tratamiento intensivo para brillo y suavidad.",
    price: "16.20",
    stock: 68,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_mascarilla",
  },
  {
    name: "Mizu Aqua Restore",
    description: "Mascarilla de hidratación profunda con algas azules.",
    price: "16.50",
    stock: 69,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_mascarilla",
  },

  // Protector térmico
  {
    name: "Mizu Heat Shield",
    description: "Spray protector hasta 230°C con aminoácidos marinos.",
    price: "13.90",
    stock: 75,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_termico",
  },
  {
    name: "Mizu Thermal Veil",
    description: "Bruma protectora ligera para styling frecuente.",
    price: "14.10",
    stock: 74,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_termico",
  },
  {
    name: "Mizu Smooth Protect",
    description: "Crema termo-protectora con polímeros selladores.",
    price: "14.30",
    stock: 73,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_termico",
  },

  // Crema de peinar
  {
    name: "Mizu Daily Flow",
    description: "Crema de peinar ligera que controla el frizz todo el día.",
    price: "11.40",
    stock: 86,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_crema",
  },
  {
    name: "Mizu Soft Control",
    description: "Define ondas y rizos sin residuo pegajoso.",
    price: "11.70",
    stock: 84,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_crema",
  },
  {
    name: "Mizu Light Cream",
    description: "Crema texturizante ultraligera para cabello fino.",
    price: "11.60",
    stock: 85,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_crema",
  },

  // Serum capilar
  {
    name: "Mizu Glow Drop",
    description: "Serum capilar con aceites ligeros que aportan brillo.",
    price: "17.40",
    stock: 72,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_serum",
  },
  {
    name: "Mizu Silky Touch",
    description: "Serum anti frizz con siliconas volátiles de acabado seco.",
    price: "17.80",
    stock: 70,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_serum",
  },
  {
    name: "Mizu Deep Repair",
    description: "Serum nutritivo nocturno con aceites reparadores.",
    price: "18.20",
    stock: 69,
    imageUrl: "https://images.unsplash.com/photo-1612812168229-9f28b7d2a5d0?auto=format&fit=crop&w=800&q=80",
    categoryKey: "haircare",
    subcategoryKey: "hair_serum",
  },
];

module.exports = async () => {
  await sequelize.transaction(async (transaction) => {
  await Product.destroy({ where: {}, transaction });
  await Subcategory.destroy({ where: {}, transaction });
  await Category.destroy({ where: {}, transaction });

    const categoryRecords = {};
    for (const category of categoriesData) {
      const record = await Category.create(
        {
          name: category.name,
          description: category.description,
        },
        { transaction }
      );
      categoryRecords[category.key] = record;
    }

    const subcategoryRecords = {};
    for (const subcategory of subcategoriesData) {
      const category = categoryRecords[subcategory.categoryKey];
      if (!category) {
        throw new Error(`Categoría no encontrada para subcategoría ${subcategory.name}`);
      }
      const record = await Subcategory.create(
        {
          name: subcategory.name,
          categoryId: category.id,
          description: subcategory.description,
        },
        { transaction }
      );
      subcategoryRecords[subcategory.key] = record;
    }

    await Product.bulkCreate(
      productsData.map((product) => {
        const category = categoryRecords[product.categoryKey];
        const subcategory = product.subcategoryKey
          ? subcategoryRecords[product.subcategoryKey]
          : null;
        if (!category) {
          throw new Error(`Categoría no encontrada para producto ${product.name}`);
        }
        return {
          name: product.name,
          description: product.description,
          price: product.price,
          categoryId: category.id,
          subcategoryId: subcategory ? subcategory.id : null,
          stock: product.stock,
          imageUrl: product.imageUrl,
          isActive: true,
        };
      }),
      { transaction }
    );
  });

  console.log("[Database] Se cargaron categorías, subcategorías y productos de ejemplo.");
};