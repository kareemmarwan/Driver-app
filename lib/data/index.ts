export interface DataProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  priceDisplay?: string;
  image: string;
  rating?: number;
  category?: string;
}

export interface DataRestaurant {
  id: number;
  name: string;
  tags: string;
  address: string;
  rating: number;
  distance: string;
  time: string;
  deliveryFee: string;
  isNearest: boolean;
  isOpen: boolean;
  image: string;
  logo: string;
  areaId: string;
}

export interface DataSize {
  label: string;
  suffix: string;
  price: number;
}

export interface DataExtra {
  id: string;
  name: string;
  price: number;
}

export interface DataExtras {
  sauces: DataExtra[];
  drinks: DataExtra[];
  complements: DataExtra[];
}

export interface DataOrder {
  id: string;
  status: string;
  statusIcon?: string;
  store: string;
  items: string;
  eta?: string;
  progress?: number;
  driver?: string | null;
  image: string;
  date?: string;
  time?: string;
  price?: string;
}

export const CATEGORIES = ["الكل", "شاورما", "مشويات", "بيتزا", "برجر", "حلويات", "مشروبات", "أكل عربي"];

export const STORE_CATEGORIES = ["الكل", "خبز طازج", "معجنات", "كيك وحلويات", "وجبات الإفطار"];

export const RESTAURANTS: DataRestaurant[] = [
  {
    id: 1,
    name: "مطعم جنين",
    tags: "شاورما • مشويات • سندويشات",
    address: "شارع النصيرات الرئيسي",
    rating: 4.8,
    distance: "0.8 كم",
    time: "15-20 دقيقة",
    deliveryFee: "3 ₪",
    isNearest: true,
    isOpen: true,
    areaId: 'nuseirat',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeKeM6PJIL8MxHyVBXFn3hl0h9TDLPD19RUWIoAthfg6V6f0QuuY-4Jek9w-dDsWMTcuRyq96QNF6htdGZXcHXGHUPuaphCh0fe5O6NGHE4fpWF2H_v4mNXSoOUQWFZHFM0L9fhHCLy7wlvpjurOjVn6rVCy7pdx0idutZ9Trs14ODG6Rk04XHnHtCo5pNtAL0DfaFONZKG6BfcfmBLQAkxSsZfM2jn6lwdzBHzvtGLx3q2CxSf6rOl5QLfofJjaxpPHHedxKSN50",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCezSXlbZ3F8NG1ADH4l74EVoKj2d3VZ9Wj6GSLa29dUBR7QDQKOrROaZVAlWBC63hk-2mpt5-F0gyB_u5vxDHtBT1nOztYtFaOnCdkJ_ECdATViXElnzkcKk4lUiqcd-Uw1wWSONR4dUGsw6cVAiXDTVTlXr6UQ2yS7VAHbF9DZt2JuJ84-jREU2wUhEsayVbg8nHXldDE7iLbK9SpDicu5dcxLpJ27ldd_mF9Mdmj-ct6c_XlkZ2M7t1CIBmSuMwQ6bSWpEL8E68",
  },
  {
    id: 2,
    name: "برجر باي",
    tags: "برجر • مقبلات • وجبات سريعة",
    address: "طريق بحر دير البلح",
    rating: 4.5,
    distance: "1.2 كم",
    time: "25-30 دقيقة",
    deliveryFee: "5 ₪",
    isNearest: false,
    isOpen: true,
    areaId: 'deir_balah',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEjiXGVgiWYiNH30d4My8TnR8k8HuD1itldnjPypTW1M5PDTgEpZQ5-VfmX00r3Q7UlK2bLyJzIK4Ecg1jzR6dKGveALeMfMLi8dBgMZCgNlWnTF3CYgZpMo5j-UWyl_bqryi8vsvfCsvDzSABrUyZbBV1i5jfYskYpObLyrNNHKAboj7or_PNvdmwKMZCvkjH-svugQnbYQ9S2VwYwssAd23jV_nQ1EBM84esyfRTt-d-mhJcAO4mpqMY5pKwtMkxk5cMCb7cIaQ",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVA4RbXXPAg5GfR9ZEFXXXMiq7oOvTli8EozBKufESKuxJatgYmLg8fPgmNaXmshPPxVQdlaA4NYnWWIAG_Y66woNpNAYG6PjIl7c4e_4BhxMCpp9vtr6XRxQzi3yuVQo4JsBS10oFgKmOnyvf7y1Wg9YZiiD-Wx6TaH4XirJY0WD5NQfgVnGNMuAhGwvyL7rJ_9-bdRy1BbjHaygXvmLwNIFyfuNNamfygOT5lFqEgSo4Um87mpm16RJLwg8tBwlw6y36wO12Nnc",
  },
  {
    id: 3,
    name: "بيتزا روما",
    tags: "إيطالي • بيتزا • باستا",
    address: "ميدان المغازي الرئيسي",
    rating: 4.9,
    distance: "0.5 كم",
    time: "10-15 دقيقة",
    deliveryFee: "2 ₪",
    isNearest: true,
    isOpen: true,
    areaId: 'maghazi',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMOv2FcGoPDF08R1EwmW5UxE2Ra7ciMz4Sb-F2IFLzSw-yzL4NBFuceDRdADyQ6-TlTGJD915bIUksyBuPc7fds6ePjTb6iX1Fg8b8onu52ZilphRb5rnwcPNO7sA4A01bhPh6Hs3aJ-RxK9oo0FmENVuAxYE2FmPD4af5b6EK3wshaO97M8s2H2uYe-tcSySYYUuNKGy9sDdmVF24Fs4RCZJmWSWxfvGh-pdjm_yTap7REjg90YM470NzzW5QMfMw7SiD0L1IV18",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ-cw48BpQi2ZGyh5xM4SZpHhMnw3vAb87Arz0hskBAWap28tBuvBmwY-u92_YgbEYM0TMoJrfuXaFflZlJC1UWFjY17gsEkiCXWD3kXch71QN4HsrfD3f3ZIohRK3y-o9o6YxQsQoXAW-2huqgbiCFzI0337Cx5MTDOmAsdG8bgR8r0VrEUbsGgWTEX_eXJSX3wGf4pLf97mrFqR5hc0QKvSFcEsc7gGTB7adru-TQLbpcDIQdLeRju4nTPP0IZJUZDic2dOPmJM",
  },
  {
    id: 4,
    name: "مطعم الشرقية",
    tags: "أكل عربي • مشاوي • مقبلات",
    address: "شارع الأقصى",
    rating: 4.7,
    distance: "2 كم",
    time: "30-35 دقيقة",
    deliveryFee: "4 ₪",
    isNearest: false,
    isOpen: true,
    areaId: 'gaza',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeKeM6PJIL8MxHyVBXFn3hl0h9TDLPD19RUWIoAthfg6V6f0QuuY-4Jek9w-dDsWMTcuRyq96QNF6htdGZXcHXGHUPuaphCh0fe5O6NGHE4fpWF2H_v4mNXSoOUQWFZHFM0L9fhHCLy7wlvpjurOjVn6rVCy7pdx0idutZ9Trs14ODG6Rk04XHnHtCo5pNtAL0DfaFONZKG6BfcfmBLQAkxSsZfM2jn6lwdzBHzvtGLx3q2CxSf6rOl5QLfofJjaxpPHHedxKSN50",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCezSXlbZ3F8NG1ADH4l74EVoKj2d3VZ9Wj6GSLa29dUBR7QDQKOrROaZVAlWBC63hk-2mpt5-F0gyB_u5vxDHtBT1nOztYtFaOnCdkJ_ECdATViXElnzkcKk4lUiqcd-Uw1wWSONR4dUGsw6cVAiXDTVTlXr6UQ2yS7VAHbF9DZt2JuJ84-jREU2wUhEsayVbg8nHXldDE7iLbK9SpDicu5dcxLpJ27ldd_mF9Mdmj-ct6c_XlkZ2M7t1CIBmSuMwQ6bSWpEL8E68",
  },
  {
    id: 5,
    name: "كافيه الحصن",
    tags: "قهوة • حلويات • مشروبات",
    address: "طريق بحر شاطئ",
    rating: 4.6,
    distance: "1.5 كم",
    time: "15-20 دقيقة",
    deliveryFee: "3 ₪",
    isNearest: false,
    isOpen: true,
    areaId: 'rimal',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMOv2FcGoPDF08R1EwmW5UxE2Ra7ciMz4Sb-F2IFLzSw-yzL4NBFuceDRdADyQ6-TlTGJD915bIUksyBuPc7fds6ePjTb6iX1Fg8b8onu52ZilphRb5rnwcPNO7sA4A01bhPh6Hs3aJ-RxK9oo0FmENVuAxYE2FmPD4af5b6EK3wshaO97M8s2H2uYe-tcSySYYUuNKGy9sDdmVF24Fs4RCZJmWSWxfvGh-pdjm_yTap7REjg90YM470NzzW5QMfMw7SiD0L1IV18",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVA4RbXXPAg5GfR9ZEFXXXMiq7oOvTli8EozBKufESKuxJatgYmLg8fPgmNaXmshPPxVQdlaA4NYnWWIAG_Y66woNpNAYG6PjIl7c4e_4BhxMCpp9vtr6XRxQzi3yuVQo4JsBS10oFgKmOnyvf7y1Wg9YZiiD-Wx6TaH4XirJY0WD5NQfgVnGNMuAhGwvyL7rJ_9-bdRy1BbjHaygXvmLwNIFyfuNNamfygOT5lFqEgSo4Um87mpm16RJLwg8tBwlw6y36wO12Nnc",
  },
  {
    id: 6,
    name: "مطعم السندس",
    tags: "دجاج • مشويات • أكل صحي",
    address: "ميدان النواصرة",
    rating: 4.8,
    distance: "0.9 كم",
    time: "20-25 دقيقة",
    deliveryFee: "2.5 ₪",
    isNearest: false,
    isOpen: true,
    areaId: 'nuseirat',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEjiXGVgiWYiNH30d4My8TnR8k8HuD1itldnjPypTW1M5PDTgEpZQ5-VfmX00r3Q7UlK2bLyJzIK4Ecg1jzR6dKGveALeMfMLi8dBgMZCgNlWnTF3CYgZpMo5j-UWyl_bqryi8vsvfCsvDzSABrUyZbBV1i5jfYskYpObLyrNNHKAboj7or_PNvdmwKMZCvkjH-svugQnbYQ9S2VwYwssAd23jV_nQ1EBM84esyfRTt-d-mhJcAO4mpqMY5pKwtMkxk5cMCb7cIaQ",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ-cw48BpQi2ZGyh5xM4SZpHhMnw3vAb87Arz0hskBAWap28tBuvBmwY-u92_YgbEYM0TMoJrfuXaFflZlJC1UWFjY17gsEkiCXWD3kXch71QN4HsrfD3f3ZIohRK3y-o9o6YxQsQoXAW-2huqgbiCFzI0337Cx5MTDOmAsdG8bgR8r0VrEUbsGgWTEX_eXJSX3wGf4pLf97mrFqR5hc0QKvSFcEsc7gGTB7adru-TQLbpcDIQdLeRju4nTPP0IZJUZDic2dOPmJM",
  },
];

export const BEST_SELLERS: DataProduct[] = [
  { id: 1, name: "رغيف خبز العجينة الحامضة (Sourdough)", price: 15.50, priceDisplay: "15.50 ₪", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfe7mEciDkjs1aMLK75UiCgJIVMT8iNYchGu2ZcP5fpLgg2PmoOu6ZiPCpS7S7Kr-t81JJbNEwlCrkAfmVmUzrZiEcwUs_wNUVfLSJz1t2JCHIOqRZcr8wRDyQ890yBCLvXURCe4ChrSKY-1KwHDcz_CE0zDEEPYz2vGFrtVIz9mK4K43Pn95AYamQ0HajNcT56ZGevE_DUWLj3-kXdMBTET8Jvv3SRPaqMEXijIICukRN1EgaNHY_Yf8pxFcJN0tHOcJyZk6v9os" },
  { id: 2, name: "كرواسون اللوز المقرمش", price: 11.00, priceDisplay: "11.00 ₪", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbO-5qv342WdqFhw7PJ2Fylg5bcTU06A7mlTaibuqEAQ0iaBxkW-0XuuuMZgkTv5_8vDDCsgHkB6fYE3XvhoGp-wEB5OnGBZYX7-YNWkWHwpt4S0sq6sp9FseyM-XGTZ6Y0JXu6yaTkUScWKkPXNUhi0phngNd235Zu5SPu9o4moV8TFEXUYx3oc9bV96qsqTVuSDPGl8n58NUA4bhHkxP_LaTJeNO9Wrs_VzfIWAUkKzSZTT4KdVjCuQkoiyuzu-iwiYeQVPvxFc" },
  { id: 3, name: "مافن التوت الأزرق (Blueberry)", price: 9.50, priceDisplay: "9.50 ₪", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFfbil7A3IhAIfda5Al2RzVNp9EzK-Wkf9MnTwp_dYrC-syCVvKGEXWzbtGD2A6B7Lup1QASEru5eNQFfsp0B_6p-jQ87V1XPro08lGPP7OCNKvnNM1pQfeOAAaEA52PXPWyQOGHaJR5nTifcNDK4J1RBjwmCG-MSeAZN1WCJp4wva-45_GKb1xNuqAay12aDuyDMT46KLOKTx5yIMINXGhQg9I9CPHag6kl-CqLOALoHOxVl5ZkhCCU1Zxgd0PaxCbGw5dBIU6F4" },
];

export const ALL_PRODUCTS: DataProduct[] = [
  { id: 4, name: "كوكيز بقطع الشوكولاتة الداكنة", price: 18.00, priceDisplay: "18.00 ₪", rating: 4.8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpkAI0iAfnxSqiIyFYE-yEUBrVdjt7Jikde2zejZHWn4Xgu96peFxx71KFETRLNGNIHfbtxKc4s9PlEmCnPZ7jm3OaGUDBAA06BNROnDagrB0-zRAx_kopWQhrqJjq7bJ6eXyxli69KfUuIDd361DEAvHb0Pdu-VgXRuI3C9-bUXMzS8hp-qzCMgZWgcZhacg2QuOjDmlbgC7oPbp0CmGcTq8btnSxOxW2UDy8pH2CbzHHPQv87v_pMVSsaUv_JXmOT5wZS-6CWb8" },
  { id: 5, name: "باجيت فرنسي طازج", price: 8.50, priceDisplay: "8.50 ₪", rating: 4.7, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBmqRwbR-yvv5gAv52wc9pq2_SEdjIGPIUVioM_piKkZiDBaFM2o3-GPHwJgkurQD07KaT0ith7ZT-M9sQw_R-94premis0iONcqmT-NmVCgfaRwOI03AHFGfcT9_hGtKQHFUVsLK-y3vpMUrhayveu5IdPYBhN8ZCiC2cd05vo-9b748gBFv5Cv9CiiC8Dzp4Y5nHzaNkGgdxJXui_4w8BoF8AlEOfHONpV7XbxFVJVGWcoX5N8MEY2v216sTnl1cV3TC5jjXzBo" },
  { id: 6, name: "تارت الليمون المنعش", price: 13.50, priceDisplay: "13.50 ₪", rating: 4.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPBDCWtbMvAE-OORAI_z9n71CazFxkHJgn8TTir5FSUAhyZYWb9D_StNGiL0bK7RbdsMEmGZASFP4GKc_EuhHo-qIRXGMHp-q5YrsP92i1nyWtt5MXXgwiwOZX9-geT8vVObPCrVhLJYsJVN3HrmiiAAYOJDAsb6zhHOd0uUcdaTjjhp9p8OLDxcwEz-tSsY1u_9om77TaRT7B936NQMcdaovGImCoXXAWs0bEEy1HAPPiYTpghM-gtPDQ6p84j7CF8ZiEKRH43II" },
  { id: 7, name: "لاتيه مثلج بحليب الشوفان", price: 14.00, priceDisplay: "14.00 ₪", rating: 4.6, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkkuJ_GCCmwZaWkPj-CjE7b8vde9IwgHB2CX6M2PptwFoCfzIHyiEkump_iWVRMkoMrCca1tLyOY3tplrNNvOYOI4PdYj3r-CyQqql6Vnlg_49WqjFJCAA_-iIeJQOj2bSV-DA3-0huX77ajNFw-79wx03u-RNMoS9p1nkVkm4HoKjx16CGKtxKvZYN4yi-DtDwDBzWwheuWgMS6bMceEr8bCaEmZ7DflkOwII9HmRmvhMJnySogzdUCZJLxdQRXIL0Qouc4I7zpg" },
];

export const PRODUCT_DETAIL: DataProduct & { description: string } = {
  id: 1,
  name: 'لفافة دجاج بالزعتر والبهارات',
  description: 'لفافة دجاج مشوي على الفحم مع مزيج من الزعتر الطازج والبهارات العربية، ملفوفة بخبز الصاج الطري. وجبة متكاملة بنكهة فلسطينية أصيلة.',
  price: 32.00,
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqY8R1dlKX28szKvlNi5j8s6p2Njr5GwhJbWXj-dNmS52v1Mu4OrGx8H7K2WNk5RQybeU3rpbiZZfWtWkfLyosFQm_2tvqZLlGMWCVhlh0yUkzbE-7DpQmu_1-GN1AikWRkm2v2DIgZmo3ExrFpaElIGUkJj5XP9d8A3ZDesxOAPIxGlxX6dFq6KN00JUKnmY5vM_NZygq4w-hujEWSsXH1EVxEtFAon8YcY2XLxVle0LNaDPU8_Q2mLwH5NWhAgNTW6lBx9Wbkaw',
  rating: 4.7,
};

export const MORE_PRODUCTS: (DataProduct & { description: string })[] = [
  {
    id: 2,
    name: 'شاورما دجاج على الفحم',
    description: 'شاورما دجاج طازج متبلة بالبهارات الشرقية، مشوية على الفحم مع الخضار والثومية.',
    price: 28.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEjiXGVgiWYiNH30d4My8TnR8k8HuD1itldnjPypTW1M5PDTgEpZQ5-VfmX00r3Q7UlK2bLyJzIK4Ecg1jzR6dKGveALeMfMLi8dBgMZCgNlWnTF3CYgZpMo5j-UWyl_bqryi8vsvfCsvDzSABrUyZbBV1i5jfYskYpObLyrNNHKAboj7or_PNvdmwKMZCvkjH-svugQnbYQ9S2VwYwssAd23jV_nQ1EBM84esyfRTt-d-mhJcAO4mpqMY5pKwtMkxk5cMCb7cIaQ',
    rating: 4.5,
  },
  {
    id: 3,
    name: 'بيتزا خضار طازجة',
    description: 'بيتزا بالخضار الطازجة، جبن موزاريلا، زيتون، فطر، و فلفل ألوان.',
    price: 35.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMOv2FcGoPDF08R1EwmW5UxE2Ra7ciMz4Sb-F2IFLzSw-yzL4NBFuceDRdADyQ6-TlTGJD915bIUksyBuPc7fds6ePjTb6iX1Fg8b8onu52ZilphRb5rnwcPNO7sA4A01bhPh6Hs3aJ-RxK9oo0FmENVuAxYE2FmPD4af5b6EK3wshaO97M8s2H2uYe-tcSySYYUuNKGy9sDdmVF24Fs4RCZJmWSWxfvGh-pdjm_yTap7REjg90YM470NzzW5QMfMw7SiD0L1IV18',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'برجر أنجوس فاخر',
    description: 'برجر لحم أنجوس الطازج، مع جبن شيدر، خس، طماطم، وبصل مقرمش.',
    price: 42.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEjiXGVgiWYiNH30d4My8TnR8k8HuD1itldnjPypTW1M5PDTgEpZQ5-VfmX00r3Q7UlK2bLyJzIK4Ecg1jzR6dKGveALeMfMLi8dBgMZCgNlWnTF3CYgZpMo5j-UWyl_bqryi8vsvfCsvDzSABrUyZbBV1i5jfYskYpObLyrNNHKAboj7or_PNvdmwKMZCvkjH-svugQnbYQ9S2VwYwssAd23jV_nQ1EBM84esyfRTt-d-mhJcAO4mpqMY5pKwtMkxk5cMCb7cIaQ',
    rating: 4.9,
  },
  {
    id: 5,
    name: 'عصير مانجو طازج',
    description: 'عصير مانجو طبيعي 100% بدون سكر مضاف، مع قطع ثلج منعشة.',
    price: 12.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkkuJ_GCCmwZaWkPj-CjE7b8vde9IwgHB2CX6M2PptwFoCfzIHyiEkump_iWVRMkoMrCca1tLyOY3tplrNNvOYOI4PdYj3r-CyQqql6Vnlg_49WqjFJCAA_-iIeJQOj2bSV-DA3-0huX77ajNFw-79wx03u-RNMoS9p1nkVkm4HoKjx16CGKtxKvZYN4yi-DtDwDBzWwheuWgMS6bMceEr8bCaEmZ7DflkOwII9HmRmvhMJnySogzdUCZJLxdQRXIL0Qouc4I7zpg',
    rating: 4.4,
  },
];

export const SIZES: DataSize[] = [
  { label: 'صغير', suffix: '', price: 0 },
  { label: 'وسط', suffix: '+ ٥ ₪', price: 5 },
  { label: 'كبير', suffix: '+ ١٠ ₪', price: 10 },
];

export const EXTRAS: DataExtras = {
  sauces: [
    { id: 's1', name: 'صلصة طحينية', price: 2.00 },
    { id: 's2', name: 'صلصة حارة', price: 1.50 },
    { id: 's3', name: 'صلصة ثومية', price: 2.00 },
  ],
  drinks: [
    { id: 'd1', name: 'عصير ليمون نعناع', price: 5.00 },
    { id: 'd2', name: 'مشروب غازي', price: 3.00 },
    { id: 'd3', name: 'ماء معدني', price: 1.50 },
  ],
  complements: [
    { id: 'c1', name: 'بطاطس مقلية', price: 6.00 },
    { id: 'c2', name: 'سلطة خضراء', price: 5.00 },
    { id: 'c3', name: 'حمص', price: 4.00 },
  ],
};

export const ACTIVE_ORDERS: DataOrder[] = [
  {
    id: "DF-7829",
    status: "في الطريق",
    statusIcon: "local_shipping",
    store: "مخبز الموقد الذهبي",
    items: "٢ وجبة شاورما + مشروبات",
    eta: "١٢ دقيقة",
    progress: 65,
    driver: "عمر",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoG-28-Ne2QmnMCXrKOz_QE6lMucu1HbLbq3tUjsfrG3OLEQH1waKYOCxOTVmQR4YWoyMVG9trh-Hxnyp1qMK27W7v8FCI-DH7E_uydDJlARVsMa55yx3dE4mPL1dc9ZGERgWkQkJFUA3iYsPKZfud63lAjvaUlITYQQbGwxYxwQ7WgE-qcCvoi_7EDmrGIlSkCO65pM46gsSeE_H_m8Qg5Z6-Fgq4tLPYnUOGP9IVmP8ya0kXZ5hfT1W--eRhfR2kSacXnClU8ow",
  },
  {
    id: "DF-7812",
    status: "قيد التحضير",
    statusIcon: "store",
    store: "بيتزا روما",
    items: "بيتزا عائلية + باستا",
    eta: "٢٥ دقيقة",
    progress: 30,
    driver: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMOv2FcGoPDF08R1EwmW5UxE2Ra7ciMz4Sb-F2IFLzSw-yzL4NBFuceDRdADyQ6-TlTGJD915bIUksyBuPc7fds6ePjTb6iX1Fg8b8onu52ZilphRb5rnwcPNO7sA4A01bhPh6Hs3aJ-RxK9oo0FmENVuAxYE2FmPD4af5b6EK3wshaO97M8s2H2uYe-tcSySYYUuNKGy9sDdmVF24Fs4RCZJmWSWxfvGh-pdjm_yTap7REjg90YM470NzzW5QMfMw7SiD0L1IV18",
  },
];

export const PAST_ORDERS: DataOrder[] = [
  { id: "DF-7798", store: "برجر باي", date: "اليوم", time: "١٠:٣٠ ص", price: "₪٤٥.٠٠", status: "مكتمل", items: "٢ برجر دبل تشيز", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEjiXGVgiWYiNH30d4My8TnR8k8HuD1itldnjPypTW1M5PDTgEpZQ5-VfmX00r3Q7UlK2bLyJzIK4Ecg1jzR6dKGveALeMfMLi8dBgMZCgNlWnTF3CYgZpMo5j-UWyl_bqryi8vsvfCsvDzSABrUyZbBV1i5jfYskYpObLyrNNHKAboj7or_PNvdmwKMZCvkjH-svugQnbYQ9S2VwYwssAd23jV_nQ1EBM84esyfRTt-d-mhJcAO4mpqMY5pKwtMkxk5cMCb7cIaQ" },
  { id: "DF-7765", store: "مطعم جنين", date: "أمس", time: "٨:١٥ م", price: "₪٣٢.٠٠", status: "مكتمل", items: "شاورما دجاج + حمص", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeKeM6PJIL8MxHyVBXFn3hl0h9TDLPD19RUWIoAthfg6V6f0QuuY-4Jek9w-dDsWMTcuRyq96QNF6htdGZXcHXGHUPuaphCh0fe5O6NGHE4fpWF2H_v4mNXSoOUQWFZHFM0L9fhHCLy7wlvpjurOjVn6rVCy7pdx0idutZ9Trs14ODG6Rk04XHnHtCo5pNtAL0DfaFONZKG6BfcfmBLQAkxSsZfM2jn6lwdzBHzvtGLx3q2CxSf6rOl5QLfofJjaxpPHHedxKSN50" },
  { id: "DF-7742", store: "بيتزا روما", date: "٢٠ يونيو", time: "٩:٠٠ م", price: "₪٥٦.٠٠", status: "مكتمل", items: "بيتزا عائلية + مشروبات", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMOv2FcGoPDF08R1EwmW5UxE2Ra7ciMz4Sb-F2IFLzSw-yzL4NBFuceDRdADyQ6-TlTGJD915bIUksyBuPc7fds6ePjTb6iX1Fg8b8onu52ZilphRb5rnwcPNO7sA4A01bhPh6Hs3aJ-RxK9oo0FmENVuAxYE2FmPD4af5b6EK3wshaO97M8s2H2uYe-tcSySYYUuNKGy9sDdmVF24Fs4RCZJmWSWxfvGh-pdjm_yTap7REjg90YM470NzzW5QMfMw7SiD0L1IV18" },
  { id: "DF-7718", store: "سوق الشام المركزي", date: "١٥ يونيو", time: "٢:٣٠ م", price: "₪٨٩.٠٠", status: "مكتمل", items: "بقالة أسبوعية", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmuzTG4P4reMUHan30yV6qhQvDSE5PAlsvJ6ujIWvn_lxAYIT22R6QfTciMLTg2Lihv864BSNalzZ8okWVOt3cc4wCR0gqL4Q5-RHoxTJpCAfiBbjS6uX1IYDx3Ux5NUvSLol5cHyJ0ZnXmA2BK_FovXE8Jpo3TkdNtK8IzX1_1FG_chXVyoqUV7N6Fiu88HIN7T4sbjUBfPWEXE88m-Uarz888pZKO8gAMwPm3wnqppK7UcJ25wT1pG3EiEeOjq508WVeNmnFdW0" },
];

export const HISTORY_ORDERS: DataOrder[] = PAST_ORDERS;

export const HISTORY_MONTHS = ["هذا الشهر", "الشهر الماضي", "يونيو ٢٠٢٦", "مايو ٢٠٢٦"];

export const HOME_SERVICES = [
  { id: "package", icon: "package_2", label: "طرد بريدي", link: "/Restaurants" },
  { id: "gift", icon: "card_giftcard", label: "هدية", link: "/Restaurants" },
  { id: "docs", icon: "description", label: "مستندات", link: "/Restaurants" },
  { id: "shopping", icon: "shopping_bag", label: "تسوق", link: "/Restaurants" },
  { id: "food", icon: "restaurant", label: "طعام", link: "/Restaurants" },
  { id: "other", icon: "more_horiz", label: "أخرى", link: "/Restaurants" },
];

export interface DataSortOption {
  id: string;
  label: string;
  icon: string;
}

export interface DataArea {
  id: string;
  name: string;
}

export const SORT_OPTIONS: DataSortOption[] = [
  { id: 'nearest', label: 'الأقرب أولاً', icon: 'near_me' },
  { id: 'rated', label: 'الأعلى تقييماً', icon: 'star' },
  { id: 'fastest', label: 'الأسرع توصيلاً', icon: 'bolt' },
];

export const AREAS: DataArea[] = [
  { id: 'gaza', name: 'مدينة غزة' },
  { id: 'rimal', name: 'الرمال' },
  { id: 'naser', name: 'النصر' },
  { id: 'jabalia', name: 'جباليا' },
  { id: 'lahia', name: 'بيت لاهيا' },
  { id: 'hanoun', name: 'بيت حانون' },
  { id: 'maghazi', name: 'المغازي' },
  { id: 'bureij', name: 'البريج' },
  { id: 'nuseirat', name: 'النصيرات' },
  { id: 'deir_balah', name: 'دير البلح' },
  { id: 'khan_younis', name: 'خانيونس' },
  { id: 'rafah', name: 'رفح' },
];

export function getProductById(id: number): (DataProduct & { description?: string }) | undefined {
  const all = [...BEST_SELLERS, ...ALL_PRODUCTS, PRODUCT_DETAIL, ...MORE_PRODUCTS];
  return all.find(p => p.id === id);
}

export function getStoreById(id: number): DataRestaurant | undefined {
  return RESTAURANTS.find(r => r.id === id);
}

export function getStoreProducts(storeId: number): DataProduct[] {
  if (storeId === 1) return [...BEST_SELLERS, ...ALL_PRODUCTS];
  return [...BEST_SELLERS, ...ALL_PRODUCTS];
}
