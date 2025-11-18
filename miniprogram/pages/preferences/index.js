const expertList = [
  {
    id: 'fandeng',
    name: '樊登',
    title: '樊登读书创始人',
    avatar: 'https://images.unsplash.com/photo-1521579971123-1192931a1452?auto=format&fit=crop&w=400&q=80',
    expertise: ['教育启蒙', '人文社科'],
    followers: '390万',
    signature: '用故事重塑复杂知识，让人听得懂、记得住'
  },
  {
    id: 'xuezhaofeng',
    name: '薛兆丰',
    title: '经济学家',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    expertise: ['经济学', '科技创新'],
    followers: '280万',
    signature: '用经济学思维洞察世界的底层逻辑'
  },
  {
    id: 'wangyuquan',
    name: '王煜全',
    title: '科技战略顾问',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    expertise: ['科技创新', '未来趋势'],
    followers: '180万',
    signature: '拆解前沿科技，为你勾勒未来版图'
  },
  {
    id: 'liuquansheng',
    name: '刘擎',
    title: '复旦大学哲学教授',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    expertise: ['人文社科', '文学'],
    followers: '120万',
    signature: '关注思想史发展，让人文精神照进现实'
  }
];

const domainList = [
  {
    id: 'education',
    name: '教育启蒙',
    description: '成长方法·学习效率·家庭教育',
    gradient: ['#06B6D4', '#3B82F6']
  },
  {
    id: 'technology',
    name: '科技创新',
    description: '人工智能·商业前沿·未来趋势',
    gradient: ['#8B5CF6', '#6366F1']
  },
  {
    id: 'humanities',
    name: '人文社科',
    description: '历史洞察·社会观察·文化思潮',
    gradient: ['#F97316', '#F43F5E']
  },
  {
    id: 'literature',
    name: '文学艺术',
    description: '经典名著·现当代文学·诗词散文',
    gradient: ['#10B981', '#14B8A6']
  }
];

Page({
  data: {
    domains: domainList.map(domain => ({
      ...domain,
      isSelected: false
    })),
    experts: expertList.map(expert => ({
      ...expert,
      isSelected: false
    })),
    selectedDomainIds: [],
    selectedExpertIds: []
  },

  handleToggleDomain(event) {
    const domainId = event.currentTarget.dataset.id;
    const { selectedDomainIds, domains } = this.data;
    const isSelected = selectedDomainIds.includes(domainId);

    const nextSelected = isSelected
      ? selectedDomainIds.filter(id => id !== domainId)
      : [...selectedDomainIds, domainId];

    const nextDomains = domains.map(domain => {
      if (domain.id !== domainId) {
        return domain;
      }

      return {
        ...domain,
        isSelected: !isSelected
      };
    });

    this.setData({
      selectedDomainIds: nextSelected,
      domains: nextDomains
    });
  },

  handleToggleExpert(event) {
    const expertId = event.currentTarget.dataset.id;
    const { selectedExpertIds, experts } = this.data;
    const isSelected = selectedExpertIds.includes(expertId);

    const nextSelected = isSelected
      ? selectedExpertIds.filter(id => id !== expertId)
      : [...selectedExpertIds, expertId];

    const nextExperts = experts.map(expert => {
      if (expert.id !== expertId) {
        return expert;
      }

      return {
        ...expert,
        isSelected: !isSelected
      };
    });

    this.setData({
      selectedExpertIds: nextSelected,
      experts: nextExperts
    });
  },

  handleContinue() {
    const { selectedDomainIds, selectedExpertIds } = this.data;

    wx.setStorageSync('preferredDomains', selectedDomainIds);
    wx.setStorageSync('preferredExperts', selectedExpertIds);

    wx.navigateTo({
      url: '/pages/library/index'
    });
  }
});