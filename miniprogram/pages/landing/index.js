const featuredDomains = [
  {
    key: 'education',
    name: '教育启蒙',
    description: '终身成长与学习方法',
    cover: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=900&q=80'
  },
  {
    key: 'technology',
    name: '科技创新',
    description: '理解最新科技趋势',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'
  },
  {
    key: 'humanities',
    name: '人文社科',
    description: '社会洞察与历史人文',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=900&q=80'
  },
  {
    key: 'literature',
    name: '文学经典',
    description: '文字的力量与故事',
    cover: 'https://images.unsplash.com/photo-1455885666463-9ae118980a69?auto=format&fit=crop&w=900&q=80'
  }
];

Page({
  data: {
    domains: featuredDomains
  },

  handleStart() {
    wx.navigateTo({
      url: '/pages/preferences/index'
    });
  }
});