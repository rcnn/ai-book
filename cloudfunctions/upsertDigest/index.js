const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const digestsCollection = db.collection('book_digests');

exports.main = async (event, context) => {
  const { bookId, expertId } = event || {};
  const wxContext = cloud.getWXContext();

  if (!bookId || !expertId) {
    return {
      success: false,
      message: '缺少必要的参数 bookId 或 expertId'
    };
  }

  try {
    const cacheKey = `${bookId}:${expertId}`;
    const existingResult = await digestsCollection
      .where({ cacheKey })
      .get();

    const existingDigest = existingResult.data?.[0] || null;

    if (existingDigest) {
      return {
        success: true,
        digest: existingDigest.digest,
        fromCache: true
      };
    }

    const generatedDigest = await generateDigestWithLLM({
      bookId,
      expertId,
      openId: wxContext.OPENID
    });

    if (!generatedDigest) {
      return {
        success: false,
        message: '生成速读内容失败'
      };
    }

    await digestsCollection.add({
      data: {
        cacheKey,
        bookId,
        expertId,
        digest: generatedDigest,
        createdAt: new Date(),
        createdBy: wxContext.OPENID || ''
      }
    });

    return {
      success: true,
      digest: generatedDigest,
      fromCache: false
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || '云函数执行失败'
    };
  }
};

async function generateDigestWithLLM({ bookId, expertId }) {
  // TODO: 调用大模型服务生成实际内容
  // 这里返回示例数据
  return {
    title: '生成中的速读内容',
    expert: expertId,
    totalDurationMinutes: 26,
    chapters: []
  };
}