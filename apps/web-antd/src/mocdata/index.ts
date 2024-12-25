import type {
  IProperty,
  IWard,
  IDistrict,
  IProvince,
  ICountry,
  IPropertyType,
  IKeywordProperty,
  ISeller,
  IWebsite,
} from '../type/dataType';

export const mockCountries: ICountry[] = [
  {
    id: 'vn',
    name: 'Vietnam',
    provinces: [], // Will be populated after provinces are defined
  },
  {
    id: 'us',
    name: 'United States',
    provinces: [],
  },
];

export const mockProvinces: IProvince[] = [
  {
    id: 'hcm',
    name: 'Ho Chi Minh',
    districts: [], // Will be populated after districts are defined
  },
  {
    id: 'hn',
    name: 'Ha Noi',
    districts: [],
  },
];

export const mockDistricts: IDistrict[] = [
  {
    id: 'd1',
    name: 'District 1',
    wards: [], // Will be populated after wards are defined
  },
  {
    id: 'd2',
    name: 'District 2',
    wards: [],
  },
];

export const mockWards: IWard[] = [
  {
    id: 'w1',
    name: 'Ben Nghe',
  },
  {
    id: 'w2',
    name: 'Ben Thanh',
  },
  {
    id: 'w3',
    name: 'Thao Dien',
  },
];

export const mockPropertyTypes: IPropertyType[] = [
  {
    id: 'apt',
    name: 'Apartment',
  },
  {
    id: 'house',
    name: 'House',
  },
  {
    id: 'villa',
    name: 'Villa',
  },
];

const mockSellers: ISeller[] = [
  {
    id: 's1',
    name: 'Nguyen Van A',
    phone: '0123456789',
    email: 'nguyenvana@email.com',
    address: 'Ho Chi Minh City',
  },
  {
    id: 's2',
    name: 'Tran Thi B',
    phone: '0987654321',
    email: 'tranthib@email.com',
    address: 'Ha Noi City',
  },
];

const mockWebsites: IWebsite[] = [
  {
    id: 'w1',
    name: 'BatDongSan.com.vn',
    url: 'https://batdongsan.com.vn',
  },
  {
    id: 'w2',
    name: 'Nhadat24h.net',
    url: 'https://nhadat24h.net',
  },
];
// export const mockSellerWebsites: ISeller[] = [
//   {
//     ...mockSellers[0],
//     website: mockWebsites[0]
//   },
//   {
//     ...mockSellers[1],
//     website: mockWebsites[1]
//   }
// ];

export const mockProperties: IProperty[] = [
  {
    id: 'p1',
    ward: 'Phường Bến Nghé, Quận 1, TP.HCM',
    street: 'Nguyen Hue',
    detailAddress: '123 Nguyen Hue',
    type: mockPropertyTypes[0],
    acreage: 120,
    length: 15,
    width: 8,
    floors: 4,
    constructionYear: 2020,
    constructionMeter: 100,
    price: 5000000000,
    metPrice: 41666667,
    typePrice: 'VND',
    seller: mockSellers[0],
    web: mockWebsites[0],
  },
  {
    id: 'p2',
    ward: 'Phường Bến Thành, Quận 1, TP.HCM',
    street: 'Le Loi',
    detailAddress: '456 Le Loi',
    type: mockPropertyTypes[1],
    acreage: 200,
    length: 20,
    width: 10,
    floors: 3,
    constructionYear: 2019,
    constructionMeter: 180,
    price: 8000000000,
    metPrice: 40000000,
    typePrice: 'VND',
    seller: mockSellers[1],
    web: mockWebsites[1],
  },
  {
    id: 'p3',
    ward: 'Phường Thảo Điền, Quận 2, TP.HCM',
    street: 'Thao Dien',
    detailAddress: '789 Thao Dien',
    type: mockPropertyTypes[2],
    acreage: 350,
    length: 25,
    width: 14,
    floors: 3,
    constructionYear: 2021,
    constructionMeter: 300,
    price: 12000000000,
    metPrice: 34285714,
    typePrice: 'VND',
    seller: mockSellers[0],
    web: mockWebsites[0],
  },
  {
    id: 'p4',
    ward: 'Phường Bến Nghé, Quận 1, TP.HCM',
    street: 'Dong Khoi',
    detailAddress: '101 Dong Khoi',
    type: mockPropertyTypes[0],
    acreage: 85,
    length: 10,
    width: 8.5,
    floors: 1,
    constructionYear: 2018,
    constructionMeter: 85,
    price: 3500000000,
    metPrice: 41176470,
    typePrice: 'VND',
    seller: mockSellers[1],
    web: mockWebsites[1],
  },
  {
    id: 'p5',
    ward: 'Phường Thảo Điền, Quận 2, TP.HCM',
    street: 'Quoc Huong',
    detailAddress: '234 Quoc Huong',
    type: mockPropertyTypes[1],
    acreage: 180,
    length: 18,
    width: 10,
    floors: 2,
    constructionYear: 2022,
    constructionMeter: 160,
    price: 7500000000,
    metPrice: 41666667,
    typePrice: 'VND',
    seller: mockSellers[0],
    web: mockWebsites[0],
  },
  {
    id: 'p6',
    ward: 'Phường Phạm Ngũ Lão, Quận 1, TP.HCM',
    street: 'Pham Ngu Lao',
    detailAddress: '567 Pham Ngu Lao',
    type: mockPropertyTypes[0],
    acreage: 95,
    length: 12,
    width: 8,
    floors: 1,
    constructionYear: 2017,
    constructionMeter: 95,
    price: 4200000000,
    metPrice: 44210526,
    typePrice: 'VND',
    seller: mockSellers[1],
    web: mockWebsites[1],
  },
  {
    id: 'p7',
    ward: 'Phường An Phú, Quận 2, TP.HCM',
    street: 'Xuan Thuy',
    detailAddress: '890 Xuan Thuy',
    type: mockPropertyTypes[2],
    acreage: 400,
    length: 20,
    width: 20,
    floors: 3,
    constructionYear: 2023,
    constructionMeter: 350,
    price: 15000000000,
    metPrice: 37500000,
    typePrice: 'VND',
    seller: mockSellers[0],
    web: mockWebsites[0],
  },
  {
    id: 'p8',
    ward: 'Phường Bến Nghé, Quận 1, TP.HCM',
    street: 'Ham Nghi',
    detailAddress: '321 Ham Nghi',
    type: mockPropertyTypes[0],
    acreage: 110,
    length: 11,
    width: 10,
    floors: 1,
    constructionYear: 2019,
    constructionMeter: 110,
    price: 6000000000,
    metPrice: 54545455,
    typePrice: 'VND',
    seller: mockSellers[1],
    web: mockWebsites[1],
  },
  {
    id: 'p9',
    ward: 'Phường Đa Kao, Quận 1, TP.HCM',
    street: 'Nguyen Thai Hoc',
    detailAddress: '432 Nguyen Thai Hoc',
    type: mockPropertyTypes[1],
    acreage: 150,
    length: 15,
    width: 10,
    floors: 2,
    constructionYear: 2020,
    constructionMeter: 140,
    price: 6800000000,
    metPrice: 45333333,
    typePrice: 'VND',
    seller: mockSellers[0],
    web: mockWebsites[0],
  },
  {
    id: 'p10',
    ward: 'Phường Thảo Điền, Quận 2, TP.HCM',
    street: 'Tran Nao',
    detailAddress: '678 Tran Nao',
    type: mockPropertyTypes[2],
    acreage: 300,
    length: 20,
    width: 15,
    floors: 3,
    constructionYear: 2021,
    constructionMeter: 280,
    price: 11000000000,
    metPrice: 36666667,
    typePrice: 'VND',
    seller: mockSellers[1],
    web: mockWebsites[1],
  },
];

export const mockKeywordProperties: IKeywordProperty[] = [
  {
    id: 'k1',
    name: 'Near Market',
    property: mockPropertyTypes[0],
  },
  {
    id: 'k2',
    name: 'Near School',
    property: mockPropertyTypes[1],
  },
];

// Export all mock data as a single object
export const mockData = {
  countries: mockCountries,
  provinces: mockProvinces,
  districts: mockDistricts,
  wards: mockWards,
  propertyTypes: mockPropertyTypes,
  sellers: mockSellers,
  websites: mockWebsites,
  properties: mockProperties,
  keywordProperties: mockKeywordProperties,
};

export default mockData;
