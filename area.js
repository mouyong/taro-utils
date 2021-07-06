import PCAA from "china-area-data";

export const provinceObj = PCAA["86"];
export const provinceArr = Object.entries(provinceObj);

export const getAreaData = (province, city) => {
  let tempProvice = province;
  if (!province)
    tempProvice = {
      key: provinceArr[0][0],
      value: provinceArr[0][1],
    };
  const cityArr = Object.entries(PCAA[tempProvice.key]);
  const districtArr = Object.entries(PCAA[city ? city.key : cityArr[0][0]]);
  return {
    province: provinceArr,
    city: cityArr,
    district: districtArr,
  };
};

export const getRegionData = (province, city) => {
  const regionObjData = getAreaData(province, city);
  const provinceArrData = regionObjData.province.map((item) => ({
    key: item[0],
    value: item[1],
  }));
  const cityArrData = regionObjData.city.map((item) => ({
    key: item[0],
    value: item[1],
  }));
  const districtArrData = regionObjData.district.map((item) => ({
    key: item[0],
    value: item[1],
  }));
  return [provinceArrData, cityArrData, districtArrData];
};

export const getAreaDataByString = (address) => {
  const addressArr = address.split(",");

  if (!address || addressArr.length !== 3) {
    return getRegionData().map(item => item[0]);
  }

  const province = Object.entries(provinceObj)
    .filter((item) => item[1] === addressArr[0])
    .map((item) => {
      return { key: item[0], value: item[1] };
    });

  const provinceArrData = province[0];

  const cityArr = Object.entries(PCAA[provinceArrData.key])
    .filter((item) => item[1] === addressArr[1])
    .map((item) => {
      return { key: item[0], value: item[1] };
    });

  const cityArrData = cityArr[0];

  const districtArr = Object.entries(PCAA[cityArrData.key])
    .filter((item) => item[1] === addressArr[2])
    .map((item) => {
      return { key: item[0], value: item[1] };
    });

  const districtArrData = districtArr[0];
  
  return [provinceArrData, cityArrData, districtArrData];
};

export const formatAreaDataToString = (address) => {
  return address.map(item => item.value).join(',')
}
