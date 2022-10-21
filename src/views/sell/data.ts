export interface selectData {
  id: string;
  ticketType_dictText: string;
  quantity?: string;
  price?: string;
}

export const sellColumns = [
  { title: '票号', dataIndex: 'ticketNumber', key: 'ticketNumber', fixed: 'left', align: 'center', width: 190 },
  { title: '票种', dataIndex: 'ticketName', key: 'ticketName', fixed: 'left', align: 'center', width: 100 },
  { title: '单价', key: 'price', dataIndex: 'price', align: 'center', width: 70 },
  { title: '手机号', key: 'phone', dataIndex: 'phone', slots: { customRender: 'phone' }, align: 'center', width: 150 },
  { title: '掌静脉', key: 'sysPalmarveinId', dataIndex: 'sysPalmarveinId', slots: { customRender: 'sysPalmarveinId' }, align: 'center', width: 230 },
  { title: '人脸信息', key: 'sysHumanfaceId', dataIndex: 'sysHumanfaceId', slots: { customRender: 'sysHumanfaceId' }, align: 'center', width: 230 },
  { title: '手环租赁', key: 'sysBraceletId', dataIndex: 'sysBraceletId', slots: { customRender: 'sysBraceletId' }, align: 'center', width: 230 },
  { title: '支付押金', key: 'deposit', dataIndex: 'deposit', slots: { customRender: 'deposit' }, align: 'center', width: 120 },
];
