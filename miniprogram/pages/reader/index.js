const digestCache = {
  'book-1:fandeng': {
    title: '终身成长：从新手到高手的学习方法',
    expert: '樊登',
    totalDurationMinutes: 28,
    chapters: [
      {
        title: '01 | 认知篇：成长型思维的力量',
        duration: '7分钟',
        keyPoints: [
          '固定型思维让我们在失败后自我设限，成长型思维鼓励我们把失败看成学习机会。',
          '樊登通过真实案例讲述“失败经历”如何转化为“经验武器”。',
          '提出“失败履历表”练习，鼓励读者记录成长中的挫折与收获。'
        ]
      },
      {
        title: '02 | 行动篇：刻意练习与反馈',
        duration: '9分钟',
        keyPoints: [
          '以“打磨演讲稿”的经历阐释刻意练习的三个要素：目标清晰、拆分步骤、高速反馈。',
          '倡导“微习惯”策略，将成长目标拆分至可执行的日常清单。',
          '强调反馈机制：构建小伙伴互督的小组，让成长不再孤单。'
        ]
      },
      {
        title: '03 | 坚持篇：内驱力与环境设计',
        duration: '12分钟',
        keyPoints: [
          '从育儿故事延伸，分析塑造内驱力的三要素：使命感、成就感、归属感。',
          '提出“成长仪式感”设计方法，让学习成为值得期待的日常仪式。',
          '推荐搭建知识管理系统，把阅读与输出形成闭环。'
        ]
      }
    ]
  }
};

Page({
  data: {
    bookId: '',
    expertId: '',
    digest: null,
    currentPageIndex: 0,
    isAnimating: false,
    hasExistingDigest: false
  },

  onLoad(options) {
    const { id } = options;
    const preferredExperts = wx.getStorageSync('preferredExperts') || [];
    const expertId = preferredExperts[0] || 'fandeng';

    const cacheKey = `${id}:${expertId}`;
    const cachedDigest = digestCache[cacheKey] || null;

    this.setData({
      bookId: id,
      expertId,
      digest: cachedDigest,
      hasExistingDigest: Boolean(cachedDigest)
    });
  },

  handleGenerateDigest() {
    if (this.data.digest) {
      wx.showToast({
        title: '已有速读内容，直接进入阅读',
        icon: 'none'
      });
      return;
    }

    wx.cloud.callFunction({
      name: 'upsertDigest',
      data: {
        bookId: this.data.bookId,
        expertId: this.data.expertId
      },
      success: res => {
        const digest = res.result?.digest || null;
        if (digest) {
          this.setData({ digest });
          wx.showToast({
            title: '生成完成，可开始阅读',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: '生成失败，请稍后再试',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '生成失败，请检查网络',
          icon: 'none'
        });
      }
    });
  },

  handleFlip(event) {
    const direction = event?.currentTarget?.dataset?.direction;
    if (this.data.isAnimating || !direction) {
      return;
    }

    const { currentPageIndex, digest } = this.data;
    const totalPages = digest?.chapters?.length || 0;

    if (totalPages === 0) {
      return;
    }

    let nextIndex = currentPageIndex;
    if (direction === 'next' && currentPageIndex < totalPages - 1) {
      nextIndex += 1;
    }
    if (direction === 'prev' && currentPageIndex > 0) {
      nextIndex -= 1;
    }

    if (nextIndex === currentPageIndex) {
      return;
    }

    this.setData({ isAnimating: true });

    setTimeout(() => {
      this.setData({
        currentPageIndex: nextIndex,
        isAnimating: false
      });
    }, 320);
  }
});