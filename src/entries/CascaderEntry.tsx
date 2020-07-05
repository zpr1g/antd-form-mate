import React from 'react';
import { Cascader } from 'antd';
import { CascaderProps, CascaderOptionType } from 'antd/lib/cascader';
import _find from 'lodash/find';

import { getEntryDisplayName } from './utils';
import FormMateItem, { NewFormMateItemPropsWithoutChildren, PlainRenderFn } from '../components/FormMate/FormMateItem';

export interface CascaderEntryProps extends NewFormMateItemPropsWithoutChildren<CascaderProps> {}

const getOption = (value: any, options: any) => {
  return _find(options, { value });
};

const plainRender: PlainRenderFn<CascaderProps> = ({ name, value, entryProps }) => {
  const { options: cascaderOptions, displayRender = (labels) => labels.join(' / ') } = entryProps;

  const labels: string[] = [];
  const selectedOptions: CascaderOptionType[] = [];

  const loopOptions = (_options: CascaderOptionType, index = 0) => {
    console.log(value?.[index], _options);
    const target = getOption(value?.[index], _options)!;

    labels.push(target.label);
    selectedOptions.push(target);

    if (index + 1 < value.length) {
      loopOptions(target.children, index + 1);
    }
  };
  loopOptions(cascaderOptions);

  return displayRender(labels, selectedOptions);
};

const CascaderEntry: React.FC<CascaderEntryProps> = (props) => {
  return (
    <FormMateItem plainRender={plainRender} {...props}>
      <Cascader {...props.entryProps} />
    </FormMateItem>
  );
};

CascaderEntry.displayName = getEntryDisplayName(CascaderEntry);

export default CascaderEntry;
