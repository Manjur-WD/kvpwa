import BASE_URL from "../../../../config";

export const menuItems = [
  // {
  //   id: "m1",
  //   label: "Home",
  //   hasSubMenu: false,
  //   link: "/krishi-vikas-udyog/",
  // },
  {
    id: "m2",
    label: "Tractor",
    hasSubMenu: true,
    subMenu: [
      {
        id: "tsm-1",
        label: "Buy New Tractor",
        link: `${BASE_URL}/tractor/new`,
      },
      {
        id: "tsm-2",
        label: "Buy Used Tractor",
        link: `${BASE_URL}/tractor/old`,
      },
      {
        id: "tsm-3",
        label: "Rent Tractor",
        link: `${BASE_URL}/tractor/rent`,
      },
    ],
    image: "http://localhost:5173/krishi-vikas-udyog/src/assets/images/trac-drop.jpg"
  },
  {
    id: "m3",
    label: "Goods Vehicle",
    hasSubMenu: true,
    subMenu: [
      {
        id: "gsm-1",
        label: "Buy New Goods Vehicle",
        link: `${BASE_URL}/goods-vehicle/new`,
      },
      {
        id: "gsm-2",
        label: "Buy Used Goods Vehicle",
        link: `${BASE_URL}/goods-vehicle/old`,
      },
      {
        id: "gsm-3",
        label: "Rent Goods Vehicle",
        link: `${BASE_URL}/goods-vehicle/rent`,
      },
    ],
    image: "http://localhost:5173/krishi-vikas-udyog/src/assets/images/gv-drop.webp"
  },
  {
    id: "m4",
    label: "Agri Inputs",
    hasSubMenu: true,
    subMenu: [
      {
        id: "asm-1",
        label: "seeds",
        link: `${BASE_URL}/agri-inputs/seeds`,
      },
      {
        id: "asm-2",
        label: "pesticides",
        link: `${BASE_URL}/agri-inputs/pesticides`,
      },
      {
        id: "asm-3",
        label: "fertilizers",
        link: `${BASE_URL}/agri-inputs/fertilizer`,
      },
    ],
    image: "http://localhost:5173/krishi-vikas-udyog/src/assets/images/agri-inputs-drop.png"
  },
  {
    id: "m5",
    label: "Harvester",
    hasSubMenu: true,
    subMenu: [
      {
        id: "hsm-1",
        label: "Buy New Harvester",
        link: `${BASE_URL}/harvester/new`,
      },
      {
        id: "hsm-2",
        label: "Buy Used Harvester",
        link: `${BASE_URL}/harvester/old`,
      },
      {
        id: "hsm-3",
        label: "Rent Harvester",
        link: `${BASE_URL}/harvester/rent`,
      },
    ],
    image: "http://localhost:5173/krishi-vikas-udyog/src/assets/images/harvest-drop.webp"
  },
  {
    id: "m6",
    label: "Implements",
    hasSubMenu: true,
    subMenu: [
      {
        id: "ism-1",
        label: "Buy New Implements",
        link: `${BASE_URL}/implements/new`,
      },
      {
        id: "ism-2",
        label: "Buy Used Implements",
        link: `${BASE_URL}/implements/old`,
      },
      {
        id: "ism-3",
        label: "Rent Implements",
        link: `${BASE_URL}/implements/rent`,
      },
    ],
    image: "http://localhost:5173/krishi-vikas-udyog/src/assets/images/implement-drop.jpg"
  },
  {
    id: "m7",
    label: "Tyres",
    hasSubMenu: true,
    subMenu: [
      {
        id: "tysm-1",
        label: "Buy New Tyres",
        link: `${BASE_URL}/tyre/new`,
      },
      {
        id: "tysm-2",
        label: "Buy Used Tyres",
        link: `${BASE_URL}/tyre/old`,
      },
    ],
    image: "http://localhost:5173/krishi-vikas-udyog/src/assets/images/tyres-drop.jpg"
  },
];
