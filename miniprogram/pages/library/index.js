const mockBooks = [
  {
    id: 'book-1',
    title: '终身成长：从新手到高手的学习方法',
    author: '卡罗尔·德韦克',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    duration: '28分钟速读',
    experts: ['樊登'],
    domain: '教育启蒙',
    summary: '成长型思维的实践指南，理解如何在学习和生活中保持持续成长。',
    hasDigest: true
  },
  {
    id: 'book-2',
    title: '原则：应对变化中的世界秩序',
    author: '瑞·达利欧',
    cover: 'https://images.unsplash.com/photo-1529651737248-dad5e287768e?auto=format&fit=crop&w=400&q=80',
    duration: '30分钟速读',
    experts: ['薛兆丰', '王煜全'],
    domain: '科技创新',
    summary: '连结宏观经济脉络与战略思维，掌握全球发展趋势的底层逻辑。',
    hasDigest: true
  },
  {
    id: 'book-3',
    title: '人类群星闪耀时',
    author: '斯蒂芬·茨威格',
    cover: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80',
    duration: '23分钟速读',
    experts: ['刘擎'],
    domain: '人文社科',
    summary: '以文学语言记述历史瞬间，体会个人命运与时代的交汇。',
    hasDigest: false
  }
];

Page({
  data: {
    query: '',
    bookList: mockBooks,
    filteredBooks: mockBooks,
    showExistingDigestNotice: false
  },

  onShow() {
    const preferredExperts = wx.getStorageSync('preferredExperts') || [];
    this.setData({
      showExistingDigestNotice: preferredExperts.length > 0
    });
  },

  handleSearchInput(event) {
    const query = event.detail.value?.trim() || '';
    this.setData({ query });
    this.filterBooks(query);
  },

  filterBooks(query) {
    if (!query) {
      this.setData({ filteredBooks: this.data.bookList });
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = this.data.bookList.filter(book => {
      const titleMatch = book.title.toLowerCase().includes(lowerQuery);
      const authorMatch = book.author.toLowerCase().includes(lowerQuery);
      const expertMatch = book.experts.some(expert => expert.toLowerCase().includes(lowerQuery));
      return titleMatch || authorMatch || expertMatch;
    });

    this.setData({ filteredBooks: filtered });
  },

  handleOpenReader(event) {
    const bookId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/reader/index?id=${bookId}`
    });
  }
});