import { useState } from 'react';
import styles from './index.less';
import Map from './Map';
import { Select, Input, Button } from 'antd';
import { provinces } from './Map/provinces';

const { Option } = Select;

export default function IndexPage() {
  const [province, setProvince] = useState('安徽');
  const [level, setLevel] = useState('1');
  const [color, setColor] = useState('#0000ff');

  return (
    <div>
      <div className="leader">
        <Select
          defaultValue={province}
          onChange={(e: string) => {
            setProvince(e);
          }}
        >
          {Object.keys(provinces).map((item) => {
            return <Option value={item}>{item}</Option>;
          })}
        </Select>
        <Select
          defaultValue={level}
          onChange={(e: string) => {
            setLevel(e);
          }}
        >
          <Option key={1} value="1">
            省
          </Option>
          <Option key={2} value="2">
            市
          </Option>
          <Option key={3} value="3">
            区
          </Option>
        </Select>
        <Input
          defaultValue={color}
          onBlur={(e) => {
            setColor(e.target.value);
          }}
        ></Input>
        <a
          target="_blank"
          href-lang="image/svg+xml"
          onClick={() => {
            let svg = document.querySelector('#map svg');
            svg?.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
            svg?.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
            console.log(svg)
          }}
        >
          <Button>下载</Button>
        </a>
      </div>
      <Map province={province} level={level} color={color}></Map>
    </div>
  );
}
