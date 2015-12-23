/* eslint-disable no-console, react/no-multi-comp */
import 'rc-cascader/assets/index.less';
import Cascader from 'rc-cascader';
import React, { Component } from 'react';
import { createForm } from 'rc-form';
import ReactDOM from 'react-dom';

const addressOptions = [{
  'label': '福建',
  'value': 'fj',
  'children': [{
    'label': '福州',
    'value': 'fuzhou',
    'children': [{
      'label': '马尾',
      'value': 'mawei',
    }],
  }, {
    'label': '泉州',
    'value': 'quanzhou',
  }],
}, {
  'label': '浙江',
  'value': 'zj',
  'children': [{
    'label': '杭州',
    'value': 'hangzhou',
    'children': [{
      'label': '余杭',
      'value': 'yuhang',
    }],
  }],
}, {
  'label': '北京',
  'value': 'bj',
  'children': [{
    'label': '朝阳区',
    'value': 'chaoyang',
  }, {
    'label': '海淀区',
    'value': 'haidian',
  }],
}];

class CascaderInput extends Component {
  onChange(value) {
    const props = this.props;
    if (props.onChange) {
      props.onChange(value);
    }
  }
  getLabel() {
    const props = this.props;
    let options = props.options;
    const result = [];
    (props.value || []).forEach(v => {
      const target = options.find(o => o.value === v);
      if (!target) {
        return false;
      }
      result.push(target.label);
      options = target.children || [];
    });
    return result.join(', ');
  }
  render() {
    const props = this.props;
    return (
      <Cascader {...this.props} onChange={this.onChange.bind(this)}>
        <input placeholder={props.placeholder} value={this.getLabel()} readOnly />
      </Cascader>
    );
  }
}

@createForm()
class Form extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    const props = this.props;
    const { form } = props;
    e.preventDefault();
    form.validateFields((error, values) => {
      if (!error) {
        console.log('ok', values);
      } else {
        console.error('error', error, values);
      }
    });
  }
  render() {
    const props = this.props;
    const { form } = props;
    const addressFieldProps = form.getFieldProps('address', {
      rules: [{required: true, type: 'array'}],
    });
    const addressFieldError = form.getFieldError('address');
    return (
      <div style={{margin: 20}}>
        <form onSubmit={this.onSubmit}>
          <p>
            <CascaderInput placeholder="please select address"
              options={addressOptions} {...addressFieldProps} />
            <span style={{ color: '#f50'}}>
              {addressFieldError ? addressFieldError.join(' ') : null}
            </span>
          </p>
          <p>
            <button>submit</button>
          </p>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<Form />, document.getElementById('__react-content'));
