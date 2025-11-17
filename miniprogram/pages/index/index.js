const featureList = [
  {
    id: 'ai-digest',
    icon: '⚡️',
    title: 'AI 速读生成',
    description: '30分钟掌握一本书的重点内容',
    isActive: true
  },
  {
    id: 'expert-style',
    icon: '🎙️',
    title: '博主风格演绎',
    description: '选定喜欢的知识博主口吻解读',
    isActive: false
  },
  {
    id: 'smart-recommend',
    icon: '🧭',
    title: '智能推荐',
    description: '基于兴趣与博主喜好个性化推荐',
    isActive: false
  },
  {
    id: 'page-turn',
    icon: '📖',
    title: '沉浸翻页体验',
    description: '真实纸感翻页动画还原阅读温度',
    isActive: false
  }
];

Page({
  data: {
    openid: '',
    isLoadingOpenId: true,
    features: featureList
  },

  onLoad() {
    wx.cloud.callFunction({
      name: 'getOpenId',
      success: res => {
        this.setData({
          openid: res.result.openid || '',
          isLoadingOpenId: false
        });
      },
      fail: () => {
        this.setData({
          isLoadingOpenId: false
        });
      }
    });
  },

  handleToggleFeature(event) {
    const featureId = event.currentTarget.dataset.id;
    const nextFeatures = this.data.features.map(feature => {
      if (feature.id === featureId) {
        return {
          ...feature,
          isActive: !feature.isActive
        };
      }
      return feature;
    });

    this.setData({
      features: nextFeatures
    });
  },

  handleExplore() {
    wx.navigateTo({
      url: '/pages/landing/index'
    });
  }
});