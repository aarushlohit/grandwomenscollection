import type { Category, Collection, Product, Review, SecurityEvent } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-occasion",
    slug: "occasionwear",
    title: "Occasionwear",
    description: "Wedding guest edits, receptions, and statement evenings.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cat-sarees",
    slug: "sarees",
    title: "Sarees",
    description: "Modern drapes with couture finishing.",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cat-workwear",
    slug: "workwear",
    title: "Workwear",
    description: "Tailored power silhouettes for the weekday wardrobe.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cat-wedding",
    slug: "wedding",
    title: "Wedding",
    description: "Bridal couture and trousseau essentials.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cat-party",
    slug: "party",
    title: "Party",
    description: "Statement pieces for nights to remember.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cat-traditional",
    slug: "traditional",
    title: "Traditional",
    description: "Heritage craftsmanship reimagined for today.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cat-casual",
    slug: "casual",
    title: "Casual",
    description: "Effortless luxury for every day.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cat-jewelry",
    slug: "jewelry",
    title: "Jewelry",
    description: "Fine and fashion jewelry to complete every look.",
    image: "https://images.unsplash.com/photo-1515562141589-67f0d727b750?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cat-handbags",
    slug: "handbags",
    title: "Handbags",
    description: "Artisan leather and statement bags.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cat-accessories",
    slug: "accessories",
    title: "Accessories",
    description: "Scarves, belts, and finishing touches.",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=80"
  }
];

export const collections: Collection[] = [
  {
    id: "col-monarch",
    slug: "monarch-edit",
    title: "The Monarch Edit",
    description: "Black-tie dressing in liquid satins, metallic pleats, and sculpted tailoring. A collection designed for the woman who commands every room.",
    season: "Pre-Festive 2026"
  },
  {
    id: "col-cosmos",
    slug: "cosmos-capsule",
    title: "Cosmos Capsule",
    description: "Minimal occasionwear informed by city lights and editorial silhouettes. Clean lines, quiet luxury, and pieces that transcend seasons.",
    season: "Resort 2026"
  },
  {
    id: "col-verdant",
    slug: "verdant-collection",
    title: "The Verdant Collection",
    description: "Nature-inspired tones and organic textures. Emerald silks, botanical prints, and hand-embroidered details that celebrate the earth.",
    season: "Spring/Summer 2026"
  },
  {
    id: "col-aurora",
    slug: "aurora-edit",
    title: "Aurora Edit",
    description: "Dawn-inspired palettes and ethereal fabrics. Soft metallics, blush tones, and pieces that capture the first light of morning.",
    season: "Autumn/Winter 2026"
  },
  {
    id: "col-heritage",
    slug: "heritage-series",
    title: "Heritage Series",
    description: "Timeless Indian craftsmanship meets contemporary design. Handloom weaves, artisan embroidery, and heirloom-quality pieces.",
    season: "Timeless"
  },
  {
    id: "col-noir",
    slug: "noir-essentials",
    title: "Noir Essentials",
    description: "The art of black dressing. Sculptural silhouettes, rich textures, and evening wear that defines modern sophistication.",
    season: "Permanent Collection"
  }
];

const reviews: Review[] = [
  {
    id: "rev-1",
    userName: "Meera",
    rating: 5,
    comment: "Fabric, finish, and packaging all felt properly premium. The Velora gown fit like it was made for me.",
    createdAt: "2026-06-16"
  },
  {
    id: "rev-2",
    userName: "Riya",
    rating: 5,
    comment: "The AI stylist paired the dress with jewelry I ended up buying too. Brilliant curation.",
    createdAt: "2026-06-22"
  },
  {
    id: "rev-3",
    userName: "Ananya",
    rating: 5,
    comment: "The Azura saree received endless compliments at my cousin's wedding. The crystal border is exquisite.",
    createdAt: "2026-05-10"
  },
  {
    id: "rev-4",
    userName: "Priya",
    rating: 4,
    comment: "Beautifully tailored coord set. The crepe fabric drapes perfectly. Minor wish: more color options.",
    createdAt: "2026-06-01"
  },
  {
    id: "rev-5",
    userName: "Kavya",
    rating: 5,
    comment: "From unboxing to wearing, every detail screams luxury. The packaging alone felt like a gift.",
    createdAt: "2026-04-18"
  },
  {
    id: "rev-6",
    userName: "Diya",
    rating: 5,
    comment: "I've never felt more confident than in the Monarch gown. Worth every rupee.",
    createdAt: "2026-03-25"
  },
  {
    id: "rev-7",
    userName: "Nisha",
    rating: 4,
    comment: "The emerald lehenga was stunning. Slight delay in delivery but the piece itself is perfection.",
    createdAt: "2026-05-30"
  },
  {
    id: "rev-8",
    userName: "Shreya",
    rating: 5,
    comment: "Third purchase from GRAND and the quality remains consistently exceptional. This is how luxury should be.",
    createdAt: "2026-07-05"
  }
];

export const products: Product[] = [
  {
    id: "prd-velora",
    slug: "velora-satin-gown",
    title: "Velora Satin Gown",
    subtitle: "Bias-cut evening dress with sculpted neckline",
    price: 8490,
    compareAtPrice: 9990,
    category: "occasionwear",
    collection: "monarch-edit",
    tags: ["evening", "party", "luxury"],
    colors: ["Black", "Rose", "Emerald"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 14,
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    images: [
      { url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80", alt: "Velora Satin Gown front" },
      { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80", alt: "Velora Satin Gown detail" }
    ],
    description: "A signature evening silhouette engineered for movement, drape, and clean editorial lines. The bias-cut construction ensures the liquid satin falls beautifully against the body.",
    specifications: ["Liquid satin finish", "Invisible side zip", "Fully lined bodice", "Dry clean only"]
  },
  {
    id: "prd-azura",
    slug: "azura-handworked-saree",
    title: "Azura Handworked Saree",
    subtitle: "Crystal edged saree with tonal blouse",
    price: 11250,
    category: "sarees",
    collection: "cosmos-capsule",
    tags: ["wedding", "saree", "festive"],
    colors: ["Navy", "Gold"],
    sizes: ["Free Size"],
    stock: 8,
    featured: true,
    rating: 4.9,
    reviewCount: 92,
    images: [
      { url: "https://images.unsplash.com/photo-1583391733981-849764b7f6f1?auto=format&fit=crop&w=1200&q=80", alt: "Azura saree drape" },
      { url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80", alt: "Azura blouse and border" }
    ],
    description: "A contemporary saree with couture finishing, designed for long wedding evenings. Hand-applied crystal borders catch the light with every movement.",
    specifications: ["Pre-finished fall", "Crystal border", "Comes with blouse fabric", "Hand wash separately"]
  },
  {
    id: "prd-ivelle",
    slug: "ivelle-tailored-coord",
    title: "Ivelle Tailored Coord",
    subtitle: "Structured blazer and fluid trouser set",
    price: 6890,
    compareAtPrice: 7890,
    category: "workwear",
    collection: "cosmos-capsule",
    tags: ["office", "tailoring", "minimal"],
    colors: ["Ivory", "Black"],
    sizes: ["S", "M", "L", "XL"],
    stock: 22,
    featured: true,
    rating: 4.7,
    reviewCount: 68,
    images: [
      { url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80", alt: "Ivelle coord set" },
      { url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80", alt: "Ivelle blazer detail" }
    ],
    description: "Minimal tailoring softened by a fluid trouser, built for leadership days and after-hours dinners. The crepe suiting holds structure while moving gracefully.",
    specifications: ["Crepe suiting", "Relaxed trouser", "Soft shoulder construction", "Dry clean recommended"]
  },
  {
    id: "prd-ember",
    slug: "ember-lehenga",
    title: "Ember Lehenga",
    subtitle: "Hand-embroidered bridal lehenga with trailing dupatta",
    price: 24900,
    category: "wedding",
    collection: "monarch-edit",
    tags: ["bridal", "wedding", "couture"],
    colors: ["Rose", "Gold"],
    sizes: ["XS", "S", "M", "L"],
    stock: 4,
    featured: true,
    rating: 5.0,
    reviewCount: 31,
    images: [
      { url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80", alt: "Ember lehenga full" },
      { url: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80", alt: "Ember embroidery detail" }
    ],
    description: "A bridal masterpiece with 200+ hours of hand embroidery. Zardozi and threadwork cascade across the skirt in organic floral motifs.",
    specifications: ["Pure silk base", "Hand zardozi embroidery", "Trailing dupatta", "Includes can-can underskirt"]
  },
  {
    id: "prd-luna",
    slug: "luna-silk-dress",
    title: "Luna Silk Dress",
    subtitle: "Wrap-front midi in washed silk",
    price: 5490,
    category: "casual",
    collection: "verdant-collection",
    tags: ["everyday", "silk", "minimal"],
    colors: ["Ivory", "Emerald", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 30,
    featured: false,
    rating: 4.6,
    reviewCount: 45,
    images: [
      { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80", alt: "Luna silk dress" },
      { url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80", alt: "Luna dress detail" }
    ],
    description: "Effortless elegance in washed mulberry silk. The wrap-front construction flatters every figure while the midi length transitions from day to evening.",
    specifications: ["Washed mulberry silk", "Self-tie wrap", "Midi length", "Gentle hand wash"]
  },
  {
    id: "prd-seraphina",
    slug: "seraphina-gown",
    title: "Seraphina Gown",
    subtitle: "Floor-length tulle gown with embroidered bodice",
    price: 12900,
    category: "party",
    collection: "aurora-edit",
    tags: ["gala", "evening", "romantic"],
    colors: ["Rose", "Ivory"],
    sizes: ["XS", "S", "M", "L"],
    stock: 6,
    featured: true,
    rating: 4.9,
    reviewCount: 38,
    images: [
      { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80", alt: "Seraphina gown" },
      { url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80", alt: "Seraphina bodice detail" }
    ],
    description: "An ethereal floor-length gown with hand-embroidered floral motifs cascading across the bodice. Multiple layers of Italian tulle create dreamlike volume.",
    specifications: ["Italian tulle", "Hand-embroidered bodice", "Concealed zip", "Dry clean only"]
  },
  {
    id: "prd-zara",
    slug: "zara-saree-gown",
    title: "Zara Saree Gown",
    subtitle: "Pre-draped saree gown with pallu detail",
    price: 7890,
    category: "traditional",
    collection: "heritage-series",
    tags: ["fusion", "saree", "modern"],
    colors: ["Black", "Gold", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    stock: 12,
    featured: false,
    rating: 4.7,
    reviewCount: 56,
    images: [
      { url: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80", alt: "Zara saree gown" },
      { url: "https://images.unsplash.com/photo-1583391733981-849764b7f6f1?auto=format&fit=crop&w=1200&q=80", alt: "Zara pallu detail" }
    ],
    description: "The perfect fusion of tradition and modernity. Pre-draped for effortless elegance with a structured pallu that holds its shape beautifully.",
    specifications: ["Georgette base", "Pre-draped construction", "Built-in shapewear", "Machine wash gentle"]
  },
  {
    id: "prd-naomi",
    slug: "naomi-blazer-dress",
    title: "Naomi Blazer Dress",
    subtitle: "Double-breasted mini with peaked lapels",
    price: 6490,
    compareAtPrice: 7490,
    category: "party",
    collection: "noir-essentials",
    tags: ["party", "tailoring", "power"],
    colors: ["Black", "Ivory"],
    sizes: ["XS", "S", "M", "L"],
    stock: 18,
    featured: false,
    rating: 4.8,
    reviewCount: 72,
    images: [
      { url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80", alt: "Naomi blazer dress" },
      { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80", alt: "Naomi lapel detail" }
    ],
    description: "Power dressing meets evening glamour. Sharp peaked lapels and a structured silhouette create a commanding presence at any event.",
    specifications: ["Structured crepe", "Double-breasted", "Peaked lapels", "Dry clean only"]
  },
  {
    id: "prd-elara",
    slug: "elara-jumpsuit",
    title: "Elara Jumpsuit",
    subtitle: "Wide-leg draped jumpsuit with belt",
    price: 5990,
    category: "workwear",
    collection: "cosmos-capsule",
    tags: ["office", "modern", "minimal"],
    colors: ["Ivory", "Navy", "Emerald"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviewCount: 41,
    images: [
      { url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80", alt: "Elara jumpsuit" },
      { url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80", alt: "Elara belt detail" }
    ],
    description: "A modern alternative to the power suit. Wide-leg draping creates an elongated silhouette while the self-belt cinches at the waist.",
    specifications: ["Fluid crepe", "Self-tie belt", "Wide leg", "Machine wash gentle"]
  },
  {
    id: "prd-aria",
    slug: "aria-choli-set",
    title: "Aria Choli Set",
    subtitle: "Contemporary choli with draped lehenga skirt",
    price: 14900,
    category: "wedding",
    collection: "verdant-collection",
    tags: ["wedding", "festive", "contemporary"],
    colors: ["Emerald", "Rose"],
    sizes: ["XS", "S", "M", "L"],
    stock: 5,
    featured: true,
    rating: 4.9,
    reviewCount: 28,
    images: [
      { url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80", alt: "Aria choli set" },
      { url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80", alt: "Aria lehenga detail" }
    ],
    description: "A contemporary take on the traditional choli-lehenga. Emerald silk with tonal threadwork creates a modern heirloom piece.",
    specifications: ["Pure silk", "Thread embroidery", "Unstructured choli", "Dry clean only"]
  },
  {
    id: "prd-vivienne",
    slug: "vivienne-coat",
    title: "Vivienne Coat",
    subtitle: "Oversized wool-blend coat with horn buttons",
    price: 9990,
    compareAtPrice: 12990,
    category: "casual",
    collection: "aurora-edit",
    tags: ["outerwear", "luxury", "winter"],
    colors: ["Ivory", "Black"],
    sizes: ["S", "M", "L", "XL"],
    stock: 10,
    featured: false,
    rating: 4.8,
    reviewCount: 34,
    images: [
      { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80", alt: "Vivienne coat" },
      { url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80", alt: "Vivienne button detail" }
    ],
    description: "An investment outerwear piece in Italian wool-blend. Oversized construction allows for layering while maintaining a refined silhouette.",
    specifications: ["Italian wool-blend", "Horn buttons", "Oversized fit", "Dry clean only"]
  },
  {
    id: "prd-sonam",
    slug: "sonam-anarkali",
    title: "Sonam Anarkali",
    subtitle: "Floor-length anarkali with mirror work",
    price: 8990,
    category: "traditional",
    collection: "heritage-series",
    tags: ["festive", "traditional", "artisan"],
    colors: ["Gold", "Rose"],
    sizes: ["S", "M", "L", "XL"],
    stock: 9,
    featured: false,
    rating: 4.7,
    reviewCount: 43,
    images: [
      { url: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80", alt: "Sonam anarkali" },
      { url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80", alt: "Sonam mirror work detail" }
    ],
    description: "A floor-length anarkali that celebrates artisan craftsmanship. Traditional mirror work and gota patti create a piece worthy of heirloom status.",
    specifications: ["Cotton silk blend", "Hand mirror work", "Gota patti border", "Gentle hand wash"]
  },
  {
    id: "prd-celeste",
    slug: "celeste-evening-dress",
    title: "Celeste Evening Dress",
    subtitle: "Column dress with cape overlay",
    price: 7490,
    category: "occasionwear",
    collection: "noir-essentials",
    tags: ["evening", "minimal", "editorial"],
    colors: ["Black", "Navy"],
    sizes: ["XS", "S", "M", "L"],
    stock: 11,
    featured: false,
    rating: 4.8,
    reviewCount: 29,
    images: [
      { url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80", alt: "Celeste evening dress" },
      { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80", alt: "Celeste cape detail" }
    ],
    description: "Minimalist drama in a column silhouette with a flowing cape overlay. The clean lines and architectural cape create a modern editorial moment.",
    specifications: ["Silk crepe", "Cape overlay", "Back zip", "Dry clean only"]
  },
  {
    id: "prd-isha",
    slug: "isha-silk-organza-saree",
    title: "Isha Silk Organza Saree",
    subtitle: "Hand-painted organza with scalloped border",
    price: 9490,
    category: "sarees",
    collection: "verdant-collection",
    tags: ["saree", "artisan", "contemporary"],
    colors: ["Rose", "Ivory"],
    sizes: ["Free Size"],
    stock: 7,
    featured: false,
    rating: 4.9,
    reviewCount: 35,
    images: [
      { url: "https://images.unsplash.com/photo-1583391733981-849764b7f6f1?auto=format&fit=crop&w=1200&q=80", alt: "Isha organza saree" },
      { url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80", alt: "Isha painted detail" }
    ],
    description: "A wearable work of art. Each saree is hand-painted by master artisans with botanical motifs that flow organically across the organza.",
    specifications: ["Pure silk organza", "Hand-painted", "Scalloped border", "Dry clean only"]
  },
  {
    id: "prd-maya",
    slug: "maya-structured-bag",
    title: "Maya Structured Tote",
    subtitle: "Hand-stitched leather tote with gold hardware",
    price: 4990,
    compareAtPrice: 5990,
    category: "handbags",
    collection: "noir-essentials",
    tags: ["bag", "leather", "everyday"],
    colors: ["Black", "Gold"],
    sizes: ["Free Size"],
    stock: 25,
    featured: false,
    rating: 4.6,
    reviewCount: 62,
    images: [
      { url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80", alt: "Maya tote bag" },
      { url: "https://images.unsplash.com/photo-1590874103328-eac38ef67685?auto=format&fit=crop&w=1200&q=80", alt: "Maya bag hardware" }
    ],
    description: "A structured tote in vegetable-tanned leather with hand-stitched detailing. The gold hardware adds a touch of luxury to everyday carrying.",
    specifications: ["Vegetable-tanned leather", "Gold-plated hardware", "Interior zip pocket", "Leather care kit included"]
  },
  {
    id: "prd-nila",
    slug: "nila-pearl-necklace",
    title: "Nila Pearl Necklace",
    subtitle: "South sea pearl strand with gold clasp",
    price: 18900,
    category: "jewelry",
    collection: "heritage-series",
    tags: ["jewelry", "pearl", "investment"],
    colors: ["Gold"],
    sizes: ["Free Size"],
    stock: 3,
    featured: false,
    rating: 5.0,
    reviewCount: 15,
    images: [
      { url: "https://images.unsplash.com/photo-1515562141589-67f0d727b750?auto=format&fit=crop&w=1200&q=80", alt: "Nila pearl necklace" },
      { url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80", alt: "Nila clasp detail" }
    ],
    description: "Investment-grade south sea pearls with a hand-set 18k gold clasp. Each pearl is individually selected for lustre and matching.",
    specifications: ["South sea pearls", "18k gold clasp", "Individually knotted", "Certificate included"]
  },
  {
    id: "prd-avani",
    slug: "avani-scarf",
    title: "Avani Silk Scarf",
    subtitle: "Printed mulberry silk scarf with hand-rolled edges",
    price: 2490,
    category: "accessories",
    collection: "verdant-collection",
    tags: ["scarf", "silk", "gift"],
    colors: ["Rose", "Navy", "Ivory"],
    sizes: ["Free Size"],
    stock: 35,
    featured: false,
    rating: 4.5,
    reviewCount: 48,
    images: [
      { url: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1200&q=80", alt: "Avani silk scarf" },
      { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80", alt: "Avani scarf pattern" }
    ],
    description: "A versatile mulberry silk scarf featuring an original botanical print. Hand-rolled edges and generous sizing make this a luxurious everyday accessory.",
    specifications: ["100% mulberry silk", "Original print", "Hand-rolled edges", "90cm x 90cm"]
  },
  {
    id: "prd-kiran",
    slug: "kiran-bridal-set",
    title: "Kiran Bridal Set",
    subtitle: "Kundan and pearl bridal jewelry set",
    price: 15900,
    category: "jewelry",
    collection: "monarch-edit",
    tags: ["bridal", "kundan", "heritage"],
    colors: ["Gold"],
    sizes: ["Free Size"],
    stock: 4,
    featured: false,
    rating: 4.9,
    reviewCount: 22,
    images: [
      { url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80", alt: "Kiran bridal set" },
      { url: "https://images.unsplash.com/photo-1515562141589-67f0d727b750?auto=format&fit=crop&w=1200&q=80", alt: "Kiran necklace detail" }
    ],
    description: "A complete bridal jewelry set in kundan and pearls. Includes necklace, earrings, maang tikka, and bangles in a keepsake box.",
    specifications: ["Kundan stones", "Freshwater pearls", "Gold-plated brass", "Keepsake box included"]
  },
  {
    id: "prd-trisha",
    slug: "trisha-wide-leg-pants",
    title: "Trisha Wide-Leg Pants",
    subtitle: "High-waisted palazzo in flowing crepe",
    price: 3990,
    category: "casual",
    collection: "cosmos-capsule",
    tags: ["bottoms", "minimal", "versatile"],
    colors: ["Ivory", "Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 28,
    featured: false,
    rating: 4.6,
    reviewCount: 55,
    images: [
      { url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80", alt: "Trisha palazzo pants" },
      { url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80", alt: "Trisha waist detail" }
    ],
    description: "High-waisted palazzo pants in flowing crepe that move like a dream. The wide-leg silhouette pairs beautifully with fitted tops and structured blazers.",
    specifications: ["Flowing crepe", "High-waisted", "Side zip", "Machine wash gentle"]
  },
  {
    id: "prd-deepa",
    slug: "deepa-lehenga-set",
    title: "Deepa Lehenga Set",
    subtitle: "Thread-embroidered lehenga with blouse and dupatta",
    price: 11900,
    compareAtPrice: 14900,
    category: "occasionwear",
    collection: "verdant-collection",
    tags: ["festive", "lehenga", "embroidered"],
    colors: ["Emerald", "Rose"],
    sizes: ["S", "M", "L", "XL"],
    stock: 8,
    featured: true,
    rating: 4.8,
    reviewCount: 39,
    images: [
      { url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80", alt: "Deepa lehenga set" },
      { url: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80", alt: "Deepa embroidery detail" }
    ],
    description: "A stunning lehenga set with all-over thread embroidery in tonal shades. The flowing dupatta and structured blouse complete the festive silhouette.",
    specifications: ["Silk blend", "Thread embroidery", "Includes blouse and dupatta", "Dry clean only"]
  },
  {
    id: "prd-gauri",
    slug: "gauri-clutch",
    title: "Gauri Box Clutch",
    subtitle: "Enamel and gold-tone box clutch",
    price: 3490,
    category: "handbags",
    collection: "monarch-edit",
    tags: ["evening", "clutch", "luxury"],
    colors: ["Gold", "Black"],
    sizes: ["Free Size"],
    stock: 15,
    featured: false,
    rating: 4.7,
    reviewCount: 28,
    images: [
      { url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80", alt: "Gauri box clutch" },
      { url: "https://images.unsplash.com/photo-1590874103328-eac38ef67685?auto=format&fit=crop&w=1200&q=80", alt: "Gauri clutch detail" }
    ],
    description: "An evening essential in enamel and gold-tone metal. The structured box shape and chain strap make this the perfect companion for cocktail events.",
    specifications: ["Enamel body", "Gold-tone hardware", "Detachable chain strap", "Satin lining"]
  },
  {
    id: "prd-meera",
    slug: "meera-earrings",
    title: "Meera Jhumka Earrings",
    subtitle: "Temple-inspired gold jhumkas with pearls",
    price: 4290,
    category: "jewelry",
    collection: "heritage-series",
    tags: ["earrings", "traditional", "temple"],
    colors: ["Gold"],
    sizes: ["Free Size"],
    stock: 20,
    featured: false,
    rating: 4.8,
    reviewCount: 46,
    images: [
      { url: "https://images.unsplash.com/photo-1515562141589-67f0d727b750?auto=format&fit=crop&w=1200&q=80", alt: "Meera jhumka earrings" },
      { url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80", alt: "Meera earring detail" }
    ],
    description: "Temple-inspired jhumkas with intricate gold work and cascading pearl drops. A statement piece that bridges heritage and contemporary style.",
    specifications: ["22k gold-plated", "Freshwater pearls", "Lever back closure", "Tarnish resistant"]
  },
  {
    id: "prd-rhea",
    slug: "rhea-blouse",
    title: "Rhea Drape Blouse",
    subtitle: "Asymmetric drape blouse in silk blend",
    price: 2990,
    compareAtPrice: 3490,
    category: "traditional",
    collection: "cosmos-capsule",
    tags: ["blouse", "saree", "contemporary"],
    colors: ["Ivory", "Gold", "Rose"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 22,
    featured: false,
    rating: 4.5,
    reviewCount: 33,
    images: [
      { url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80", alt: "Rhea drape blouse" },
      { url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80", alt: "Rhea drape detail" }
    ],
    description: "An asymmetric drape blouse that adds contemporary edge to traditional draping. The silk blend fabric holds structure while allowing fluid movement.",
    specifications: ["Silk blend", "Asymmetric hem", "Back hook closure", "Machine wash gentle"]
  }
];

export const featuredReviews = reviews;

export const instagramPosts = [
  { id: "ig-1", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80", likes: 1243 },
  { id: "ig-2", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80", likes: 987 },
  { id: "ig-3", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80", likes: 1456 },
  { id: "ig-4", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80", likes: 892 },
  { id: "ig-5", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80", likes: 1105 },
  { id: "ig-6", image: "https://images.unsplash.com/photo-1583391733981-849764b7f6f1?auto=format&fit=crop&w=600&q=80", likes: 1321 }
];

export const testimonials = [
  {
    id: "test-1",
    name: "Shreya Kapoor",
    role: "Fashion Editor, Vogue India",
    quote: "GRAND WOMEN'S COLLECTIONS understands the intersection of heritage craft and modern luxury better than most established houses.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "test-2",
    name: "Anjali Mehta",
    role: "Stylist & Creative Director",
    quote: "Every piece feels considered. The attention to fabric, construction, and the unboxing experience puts GRAND in a league of its own.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "test-3",
    name: "Riya Banerjee",
    role: "Loyal Client",
    quote: "I've built half my wardrobe from GRAND. The AI stylist recommendations are scarily accurate — it knows my taste better than I do.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  }
];

export const securityEvents: SecurityEvent[] = [
  {
    id: "sec-1",
    type: "failed-login",
    severity: "medium",
    createdAt: "2026-07-04T14:20:00.000Z",
    sourceIp: "103.21.44.12",
    details: "Repeated failed admin login attempts from unrecognized ASN."
  },
  {
    id: "sec-2",
    type: "honeypot",
    severity: "high",
    createdAt: "2026-07-04T16:44:00.000Z",
    sourceIp: "45.89.19.201",
    details: "Fake admin endpoint triggered and logged into SOC dashboard."
  }
];
