import { ParsedUrlQuery } from "querystring";

export const getFilterCount = (query: ParsedUrlQuery) => {
  let count = 0;
  count += countFilterItem(query.categories);
  count += countFilterItem(query.ingredients);

  return count;
};

function countFilterItem(items: any) {
  let count = 0;
  if (items) {
    if (Array.isArray(items)) {
      count += items.length;
    } else {
      count += 1;
    }
  }
  return count;
}

//authorizationsData 
const authData: AuthorizationsData = {
  id: "5e71960d-52ab-4aa3-94a0-61300c970924",
  code: "AUTH_1678717591013",
  entity: {
    productId: "cb28c84a-da39-4c4b-a440-7637223b7067",
    code: "_1678717589934",
    validFrom: "2022-01-01",
    validThru: "2025-12-31",
    name: "zzz",
    description: "xxx",
    id: "2427b214-eba8-4b02-b131-c3434a993b43"
  },
  name: "zzz",
  description: "xxx",
  validFrom: "2022-01-01",
  validThru: "2025-12-31",
  actions: [{ actionId: "13182122-c674-40fa-bd81-76f36d106483" }],
  attributes: [
    {
      attributeId: "37762e0e-c284-42cf-b656-5b597dcbba60",
      value: "ffffff"
    }
  ]
}

const authorizationsData: AuthorizationsDataResponse = {
  data: authData
}

interface AuthorizationsDataResponse {
  data: AuthorizationsData
}

export interface AuthorizationsData {
  id: string;
  code: string;
  entity: Entity;
  name: string;
  description: string;
  validFrom: string;
  validThru: string;
  actions: Action[];
  attributes: Attribute[];
}

export interface Action {
  actionId: string;
}

export interface Attribute {
  attributeId: string;
  value: string;
}

export interface Entity {
  productId: string;
  code: string;
  validFrom: string;
  validThru: string;
  name: string;
  description: string;
  id: string;
}


export interface AttributesDataItem {
  entityId: string;
  code: string;
  name: string;
  description: string;
  id: string;
  value?: string;
}

//attributesData 
const attributesDataItem: AttributesDataItem = {
  entityId: "2427b214-eba8-4b02-b131-c3434a993b43",
  code: "ATT_1678717590561",
  name: "attribute shortName",
  description: "attribute longName",
  id: "37762e0e-c284-42cf-b656-5b597dcbba60"
}

const attributesData: AttributesData = {
  items: [attributesDataItem]
}

interface AttributesData {
  items: AttributesDataItem[]
}

attributesData.items.map((item: AttributesDataItem) => {
  item.value = authorizationsData.data.attributes.find(x => x.attributeId == item.id)?.value;
  return item;
});