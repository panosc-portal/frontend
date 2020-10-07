import React from 'react'

import Dataset from './dataset'

const dataset = {
  pid: 'jfsdkl',
  title: "Dataset's title",
  instrument: {name: 'Some instrument', facility: 'Eli Beams'},
}
export default {
  title: 'Single Dataset',
  component: Dataset,
}

const Template = args => <Dataset {...args} />

export const Basic = Template.bind({})
Basic.args = {dataset: dataset}
export const DatasetInUse = Template.bind({})
DatasetInUse.args = {...Basic.args, inUse: true}
