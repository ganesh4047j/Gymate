import { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Gymate Zenith V2",
    description: "Pro-level stability lifting shoe",
    price: 199.00,
    originalPrice: 249.00,
    rating: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyf_PM_PXyj7QGvo8GTkrJN795ggu43zoW9V6dQ27zoTHq1NbpUVIfTZCn-2g4Jj99GeN-56A4Dfzz8brJgLfZu2vEdXDHIFy4d_Aaip5z-kmPmOFshsQ4OSxehOFcFoulYLmTiqTARN7hAI-Fn00uROMlgSxS5OxH_cOOCix_2NNVrkKfSUHHS5JMmT5k7rA2_c2zoAINhEOVtswJdhDRJxtGCMRLfirHA1BM8JV4-E4-ZnJtKjc_1v7L_mvXuw9K4fnoqxUAoQ6W",
    badge: "Flash Sale",
    category: "footwear",
    isNew: true,
    stock: 45
  },
  {
    id: 2,
    name: "Titan-Grip Lever Belt",
    description: "10mm thick genuine leather",
    price: 129.00,
    rating: 4.5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi-ucTMEFx0wWK23A18DJoRaYhqgATsswQfCmaFoVtqTmwKgnj9M1APQqXSohhuVfHfS9tODQ3WUkZ5M-brBbSrQycEhckBuehiDw-wG9cipgeWvXi5A-emfq1HHRrzQZ1LcdKOoTEXVK0ktj54MVy0OH6tFXzkjAGqRCujUuVM4N7ofVOA5MUxk696TFPhKsGHDxnK-7AYztNlRvkpD-4yZW7oUks6HZZ98khkDWOjhRgvSUONGF13B7VFddGbyp6tI2lznGyzoC0",
    category: "gear",
    stock: 120
  },
  {
    id: 3,
    name: "Iron-Clad Wraps",
    description: "Maximum wrist support",
    price: 45.00,
    rating: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKVIE0WDOzB6-1KY76YwlR7P9wTt1EoqxGBA44gL545K3W1NZJA8SzDMWzX9XfRD_VM6gmQTNmW03Lrj1je-kVJu-906_GPNrKn2JswRkzSRozejGQXRDFW7yO3sG8HnD80g7s_Y_EMIw3IcMJjaEfnETOZjeeN-tpyDl5J_2thJeSgecBj_SidjyqlK3PTxTbaUaAt2S0cKZs2ciKgjcF-fC32X7EWWhyJLzZDmriXro_5LTEsW2cYEjhMMK8gbcTZJ-0-wkm-3QX",
    badge: "Best Value",
    category: "accessories",
    stock: 300
  },
  {
    id: 4,
    name: "Apex Horizon",
    description: "Polarized performance eyewear",
    price: 89.00,
    rating: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0Zzeod0gUkZHjz8AxU4nOo4sNTuf2jGLwoKeT0yb9sZuLBQ2I5ZE5V4FWwKW9CovV6orue2gPrAJK2N7vCsWe58smoXqid836qHEwaInExxYsnkV7nnHWzY11Jisd5uy7i_o485CT1rK3dldmJRV1W-HCrb5avjjcYN_kOTgBPot1Wj1E-6Ic1yr-HBdUiyBhpxdEgfLBbVgC4_oIC-syVp7IxM3b8qsAhPRsdJ25h7C5rQzpElqsqitR8bVBKNX1UuuHWAx4x1C5",
    category: "accessories",
    stock: 15
  },
  {
    id: 5,
    name: "MaxPro Pulse",
    description: "Percussive therapy device",
    price: 250.00,
    rating: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsfZV-JC9UmTs0B_VubxlujaA98GvBorbQrK8qK-muV5kD5O9zN2_IjB_Z-VUskeL9H3ewc1VWsoO2BS0kIBQ_z-suRUvCqOo1SsQrcWqfRaTcdufxV6JOVMHaUIoIsaI6ffDCq61sJK0BwJLbEE7EheCPr-fsE0hV8vmdAExxx65_YWoH7p9hYDQGL1TZsy7HXTB_WSgaPoUXZYTfvfeGlZPR2XssAFVn24Ijd9K5j3GOSuqG8mzEFyZSPKo8YqPA1GXThlxJYrTZ",
    badge: "Hot",
    category: "gear",
    stock: 8
  },
  // {
  //   id: 6,
  //   name: "Tactical Gym Duffle",
  //   description: "Water-resistant, 45L capacity",
  //   price: 75.00,
  //   rating: 4.8,
  //   image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
  //   category: "accessories",
  //   isNew: true,
  //   badge: "New",
  //   stock: 60
  // },
  // {
  //   id: 7,
  //   name: "Gymate Gift Card",
  //   description: "The perfect gift for any athlete",
  //   price: 50.00,
  //   rating: 5,
  //   image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=600",
  //   category: "gift-card",
  //   stock: 9999
  // },
  // {
  //   id: 8,
  //   name: "Heavy Duty Knee Sleeves",
  //   description: "7mm Neoprene compression",
  //   price: 55.00,
  //   rating: 4.9,
  //   image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600",
  //   category: "accessories",
  //   isNew: true,
  //   stock: 200
  // }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    text: "The Titan-Grip belt changed my deadlift game completely. The support is unmatched and it broke in within two sessions. Absolute quality.",
    author: "Marcus T.",
    role: "Powerlifter",
    rating: 5,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGJciPIeaOqyryLmbaaUbCPjRt01gk7h8GsKo7lJ4qUk4eN2ffq2ZccaCJgPZQI6QyJlTl2mvzHTxIdfMQGfsujoRUJU5Bl1U3jcJgBgZ2_0gJcSsYXrFpMAdz4UIc4OJj-v9jJ0pSUr6R7zqhWHs9rNkYW3_mX2ZZxS21LGWWbBWFIqv3wzVS5QbXVoKyortWispSOzGkH-t7SbMK3jCi0MPyr6oNy9Z6w30Zc3gEsIAJ0V4HK2pIdTsCv2RhiAUWkbYc5ohTbUcA"
  },
  {
    id: 2,
    text: "I've tried every lifting shoe on the market. The Zenith V2 offers stability I haven't found elsewhere. Worth every penny for serious competitors.",
    author: "Sarah J.",
    role: "CrossFit Athlete",
    rating: 5,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUioC-ApuD383osDvJ-VRGmgrB9Bc1fzuuVzHeRZXw--wBYrAfDFikJJc-kkaEx3JqnO4gr7rAgYvJKtdK6Fc5bCvurjVmeDHtqCF8X_9BnQ3bcHEY6fWcTwbgUHbbPSd_4cuFNQBW-qxAawD6ffOAp5WuiAJcUwPebS5istASGKaPhov1t9Xr23Axl0nh8J9xXBkAiXyBBYKq7pi3_6wB-l7xyDvibFbsqEX0nvceAIbngbxNQXq0NwxUFDH7q3t5Y_2oNVRNYOpi"
  },
  {
    id: 3,
    text: "Recovery is just as important as the lift. The MaxPro Pulse is powerful, quiet, and hits deep tissue perfectly. My recovery time has halved.",
    author: "David R.",
    role: "Bodybuilder",
    rating: 5,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlgh-w3yO4J3S013wTFyYnHMgyz211u6BOJ2zjwYkROTdg_KekYKPsZ4364w3Wbar_HjiALRhR4ZN1SELLunTljKWXMPfEriYafhA2MBJSOR0snALp7nzBZLPHs-07esq-i51sugkjAi0BN8wVQ3Iy5HToCpmPwgelEYbpPaI-x_81Q81og-eIUJpNx4iI4gINuReMqPMpFZJrF8_oambIDphJgxQBnaLQtfxD9N9PdYxd6mw_PX62gLaDsloF4gfrtwyaJKOJlk5i"
  },
  {
    id: 4,
    text: "The Apex Horizon glasses stay put even during the most intense outdoor HIIT sessions. Clarity is amazing.",
    author: "Elena M.",
    role: "Sprinter",
    rating: 4.5,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDNcp4fMEkK6nqgQOyQay4pM0rYUgGwHH8gSHOeXzgFYwFTWp2p6QlnPmrJyFhGqvuBk4KIdBm-A5ewaXxMii4o1Cuh5qoFd1jVciuWOtCwzLqD9rKLBSAxOd3Yfsrh-M48pVVLnXLMNw0fP4GsZHYBmLeOPEy7zs-PQdzABTUnoSeO1FwUoLSLiFdGJDN2g2oHz3vPStu3rRqllWvrlBmJsB1C_SMNnEK2GoX7qjy3afZyA5Ke8wjlMF4J7siQ-or7nbKSpyT1m9A"
  }
];
