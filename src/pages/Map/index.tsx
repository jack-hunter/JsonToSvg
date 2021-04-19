import React, { useEffect, useRef } from 'react';
import './index.less';
import { provinces } from './provinces';

namespace MyBMap {
  export interface Point {}
}

export interface MapJson {
  features: {
    properties: {
      level: string;
      centerX: number;
      centerY: number;
    };
    geometry: {
      coordinates: number[][][][];
    };
  }[];
}

const getCenter = (json: MapJson) => {
  let geo = json.features;
  let point: MyBMap.Point = new BMap.Point(116.404, 39.915);
  for (let i = 0; i < geo.length; i++) {
    if (geo[i].properties.level === '1') {
      point = new BMap.Point(
        geo[i].properties.centerX,
        geo[i].properties.centerY,
      );
      break;
    }
  }
  return point;
};

const renderPoint = (json: MapJson, level: string, color: string, map: any) => {
  let geo = json.features;
  let arr: MyBMap.Point[] = [];

  // 修复存在错误的点
  let preLongitude: number;
  let preLatitude: number;

  geo.forEach((item) => {
    if (item.properties.level === level) {
      item.geometry.coordinates[0][0].forEach((childItem: number[]) => {
        if (
          (preLongitude === undefined && preLatitude === undefined) ||
          (preLongitude &&
            preLatitude &&
            Math.abs(preLongitude - childItem[0]) < 0.1 &&
            Math.abs(preLatitude - childItem[1]) < 0.1)
        ) {
          arr.push(new BMap.Point(childItem[0], childItem[1]));
        } else if (preLongitude !== undefined && preLatitude !== undefined) {
          // 当断开时，则渲染，并清空
          mapRender(color, map, arr);
          arr = [];
        }
        preLongitude = childItem[0];
        preLatitude = childItem[1];
      });
      mapRender(color, map, arr);
    }
  });
  return arr;
};

const mapRender = (color: string, map: any, arr: MyBMap.Point[]) => {
  let polyline = new BMap.Polyline(arr, {
    strokeColor: color,
    strokeWeight: 2,
    strokeOpacity: 0.5,
  }); //创建折线
  map.addOverlay(polyline); //增加折线
};

const Map = ({
  level,
  province,
  color,
}: {
  level: string;
  province: string;
  color: string;
}) => {
  const mapRef = useRef(null);
  const provinceJson = provinces[province]();
  useEffect(() => {
    // 初始化
    let map = new BMap.Map('map');
    // 设置中心点
    map.centerAndZoom(getCenter(provinceJson), 7);

    // 是否伸缩
    map.enableScrollWheelZoom();

    // 渲染点
    renderPoint(provinceJson, level, color, map);
  }, [level, province, color]);

  return <div ref={mapRef} id="map"></div>;
};

export default Map;
