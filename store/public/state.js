export default {
  townShip: [
    { key: '1', name: '新安江街道' },
    { key: '2', name: '更楼街道' },
    { key: '3', name: '洋溪街道' },
    { key: '4', name: '杨村桥镇' },
    { key: '5', name: '下涯镇' },
    { key: '6', name: '莲花镇' },
    { key: '7', name: '乾潭镇' },
    { key: '8', name: '梅城镇' },
    { key: '9', name: '三都镇' },
    { key: '10', name: '大洋镇' },
    { key: '11', name: '寿昌镇' },
    { key: '12', name: '大慈岩镇' },
    { key: '13', name: '航头镇' },
    { key: '14', name: '大同镇' },
    { key: '15', name: '李家镇' },
    { key: '16', name: '钦堂乡' }
  ],
  industry: [
    { key: '1', name: '化工' },
    { key: '2', name: '建材水泥' },
    { key: '3', name: '混凝土' },
    { key: '4', name: '砂浆' },
    { key: '5', name: '纺织服装' },
    { key: '6', name: '电子电器' },
    { key: '7', name: '五金工具' },
    { key: '8', name: '冶金加工' },
    { key: '9', name: '橡胶塑料制品' },
    { key: '10', name: '竹木制品' },
    { key: '11', name: '机械制造' },
    { key: '12', name: '酒业' },
    { key: '13', name: '农产品' },
    { key: '14', name: '水产业' },
    { key: '15', name: '碳酸钙及制品' },
    { key: '16', name: '有机硅' },
    { key: '17', name: '其他新材料' },
    { key: '18', name: '新能源' }
  ],
  scale: [{ key: '1', name: '规上' }, { key: '2', name: '规下' }],
  searchindicator: [
    {
      key: '6',
      label: '主营业务收入（元）',
      name: 'mainBusIncome',
      tittle: '主营业务收入',
      status: 'custom'
    },
    {
      key: '1',
      label: '厂房建筑面积（㎡）',
      name: 'facBuildingArea',
      tittle: '厂房建筑面积',
      status: 'custom'
    },
    {
      key: '2',
      label: '实际用地面积（亩）',
      name: 'actualLandArea',
      tittle: '实际用地面积',
      status: 'custom'
    },
    {
      key: '3',
      label: '存量厂房面积（㎡）',
      name: 'stockWorkArea',
      tittle: '存量厂房面积',
      status: 'custom'
    },
    { key: '4', label: '入库税收（元）', name: 'tax', tittle: '入库税收', status: 'custom' },
    {
      key: '5',
      label: 'R&D经费投入（元）',
      name: 'researchFee',
      tittle: 'R&D经费投入',
      status: 'custom'
    },
    {
      key: '7',
      label: '高新技术企业',
      name: 'isHighTech',
      tittle: '高新技术企业',
      status: false
    },
    {
      key: '8',
      label: '发明专利量',
      name: 'patentNumber',
      tittle: '发明专利量',
      status: 'custom'
    },
    {
      key: '9',
      label: '核定用能（吨标煤）',
      name: 'ratifiedCoal',
      tittle: '核定用能',
      status: 'custom'
    }
  ],
  /**
     flag=1      代表一级数据
     flag=2      代表二级数据
     position=3  位置为左侧
     position=4  位置为右侧
   */
  enterpriseOverview: [
    {
      id: 1,
      title: '企    业   全   称 ：',
      value: 'name',
      flag: 1
    },
    [
      {
        id: 2,
        title: '所    属   乡   镇 ：',
        value: 'townName',
        flag: 2,
        position: 3
      },
      {
        id: 3,
        title: '所属村 （社区） ：',
        value: 'villageName',
        flag: 2,
        position: 4
      }
    ],
    {
      id: 4,
      title: '详    细   地   址 ：',
      value: 'address',
      flag: 1
    },
    [
      {
        id: 5,
        title: '所    属   行   业 ：',
        value: 'tradeName',
        flag: 2,
        position: 3
      },
      {
        id: 6,
        title: '行    业   代   码 ：',
        value: 'industryCode',
        flag: 2,
        position: 4
      }
    ],
    {
      id: 7,
      title: '主 要 核 心 产 品 ：',
      value: 'productName',
      flag: 1
    },
    [
      {
        id: 8,
        title: '规 上 （ 规下 ）:',
        value: 'scaleUp',
        flag: 2,
        position: 3
      },
      {
        id: 9,
        title: '是否"两代表一委员" ：',
        value: 'isCommittee',
        flag: 2,
        position: 4
      }
    ],
    [
      {
        id: 10,
        title: '主 要 负 责 人 ：',
        value: 'corporationName',
        flag: 2,
        position: 3
      },
      {
        id: 11,
        title: '联    系   电   话 ：',
        value: 'corporationPhone',
        flag: 2,
        position: 4
      }
    ],
    [
      {
        id: 12,
        title: '具  体  负  责  人 ：',
        value: 'leaderName',
        flag: 2,
        position: 3
      },
      {
        id: 13,
        title: '联    系   电   话 ：',
        value: 'leaderPhone',
        flag: 2,
        position: 4
      }
    ],
    [
      {
        id: 14,
        title: '企 业 职 工 人 数 ：',
        value: 'staffScale',
        flag: 2,
        position: 3
      },
      {
        id: 15,
        title: '企业职工平均工资 ：',
        value: 'averageSalary',
        flag: 2,
        position: 4
      }
    ],
    [
      {
        id: 16,
        title: '党 组 织 名 称 ：',
        value: 'partyName',
        flag: 2,
        position: 3
      },
      {
        id: 17,
        title: '党    员   人   数 ：',
        value: 'partyMemberNum',
        flag: 2,
        position: 4
      }
    ],
    [
      {
        id: 18,
        title: '每    月   电   费 ：',
        value: 'monthElecBill',
        flag: 2,
        position: 3
      },
      {
        id: 19,
        title: '每    月   水   费 ：',
        value: 'monthWaterBill',
        flag: 2,
        position: 4
      }
    ],
    {
      id: 20,
      title: '企    业   简   介：',
      value: 'companyProfile',
      flag: 1
    }
  ],
  dataTarget: [
    [
      {
        id: 1,
        title: '厂 房 建 筑 面 积（m²）：',
        value: 'facBuildingArea',
        flag: 2,
        position: 3
      },
      {
        id: 2,
        title: '核 定 用 能 (吨 标 煤) ：',
        value: 'ratifiedCoal',
        flag: 2,
        position: 4
      }
    ],
    [
      {
        id: 3,
        title: '实 际 用 地 面 积（亩） ：',
        value: 'actualLandArea',
        flag: 2,
        position: 3
      },
      {
        id: 4,
        title: '实际等价值能耗(吨  标  煤)：',
        value: 'energyConsume',
        flag: 2,
        position: 4
      }
    ],
    [
      {
        id: 5,
        title: '存 量 厂 房 面 积（m²）：',
        value: 'stockWorkArea',
        flag: 2,
        position: 3
      },
      {
        id: 6,
        title: '水耗(吨)或天然气(万立方米):',
        value: 'waterConsume',
        flag: 2,
        position: 4
      }
    ],
    [
      {
        id: 7,
        title: '入 库 税 收（元）：',
        value: 'tax',
        flag: 2,
        position: 3
      },
      {
        id: 8,
        title: '电 耗 （万  千  瓦  时） :',
        value: 'elecConsume',
        flag: 2,
        position: 4
      }
    ],
    [
      {
        id: 9,
        title: 'R＆D经 费 投 入(元)：',
        value: 'researchFee',
        flag: 2,
        position: 3
      },
      {
        id: 10,
        title: '煤    耗 （ 吨 标 煤 ） :',
        value: 'coalConsume',
        flag: 2,
        position: 4
      }
    ],
    [
      {
        id: 11,
        title: '主 营 业 务 收 入(元) ：',
        value: 'mainBusIncome',
        flag: 2,
        position: 3
      },
      {
        id: 12,
        title: '增加值能耗（吨标煤/万元）:',
        value: 'addedEnergyConsume',
        flag: 2,
        position: 4
      }
    ],
    [
      {
        id: 13,
        title: '是 否 高 新 技 术 企 业 ：',
        value: 'isHighTech',
        flag: 2,
        position: 3
      },
      {
        id: 14,
        title: '申    报 时  间 ：',
        value: 'declareStartTime',
        flag: 2,
        position: 4
      }
    ],
    [
      {
        id: 15,
        title: '发 明 专 利 量 ：',
        value: 'patentNumber',
        flag: 2,
        position: 3
      },
      {
        id: 16,
        title: '工业增加值(万元) ：',
        value: 'industrialValue',
        flag: 2,
        position: 4
      }
    ],
    [
      {
        id: 17,
        title: '能源消费值(标吨煤) ：',
        value: 'powerConsume',
        flag: 2,
        position: 3
      },
      {
        id: 18,
        title: '核定排污权(吨) ：',
        value: 'approvedDischarge',
        flag: 2,
        position: 4
      }
    ],
    [
      {
        id: 19,
        title: '单位排污权核定增加值(万元/吨) ：',
        value: 'sewageAdd',
        flag: 2,
        position: 3
      },
      {
        id: 20,
        title: '全员劳动生产率数据(万元/人) ：',
        value: 'aborProductivity',
        flag: 2,
        position: 4
      }
    ],
    {
      id: 21,
      title: '新产品产值率(%) ：',
      value: 'productRate',
      flag: 1
    },
    {
      id: 22,
      title: '研究与试验发展经费支出占主营业务收入比(%) ：',
      value: 'researchRate',
      flag: 1
    }
  ]
};
