export interface IProperty {
  id: string;
  ward: string;
  street: string;
  detailAddress: string;
  type?: IPropertyType;
  acreage: number;
  length: number;
  width: number;
  floors: number;
  constructionYear: number;
  constructionMeter: number;
  price: number;
  metPrice: number;
  typePrice: string;
  seller?: ISeller;
  web?: IWebsite;
}

export interface IWard {
  id: string;
  name: string;
}

export interface IDistrict {
  id: string;
  name: string;
  wards: IWard[];
}

export interface IProvince {
  id: string;
  name: string;
  districts?: IDistrict[];
}

export interface ICountry {
  id: string;
  name: string;
  provinces?: IProvince[];
}

export interface IPropertyType {
  id: string;
  name: string;
}

export interface IKeywordProperty {
  id: string;
  name: string;
  property?: IPropertyType;
}

export interface ISeller {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  website?: IWebsite[];
}

export interface IWebsite {
  id: string;
  name: string;
  url: string;
  seller?: ISeller[];
}
