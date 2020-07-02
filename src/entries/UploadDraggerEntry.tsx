import React from 'react';

import CustomUploadDragger, { CustomDraggerProps } from '../components/CustomUploadDragger';
import FormMateItem, { NewFormMateItemPropsWithoutChildren } from '../components/FormMate/FormMateItem';

export interface UpdateDraggerEntryProps extends NewFormMateItemPropsWithoutChildren<CustomDraggerProps> {}

const UploadDraggerEntry: React.FC<UpdateDraggerEntryProps> = (props) => {
  return (
    <FormMateItem valuePropName='fileList' {...props}>
      <CustomUploadDragger {...props.entryProps} />
    </FormMateItem>
  );
};

UploadDraggerEntry.displayName = `FM.${UploadDraggerEntry.name}`;

export default UploadDraggerEntry;
