const { urls } = require('../../models');
const { classifier } = require('../../modules');
const { checkToken } = require('../../modules');
module.exports = {
  post: async (req, res) => {
    try {
      //! <------ 토큰 사용해서 user_id 가져옴 -----------
      const token_info = checkToken(req);
      const { user_id } = token_info;
      //! ----------------------------------------->
      const category = async function () {
        return classifier(req.body.url);
      };
      const result = await category();
      urls
        .findOrCreate({
          where: {
            user_id: user_id,
            url: req.body.url,
          },
          defaults: {
            category_id: result,
          },
        })
        .then(async ([url, created]) => {
          if (!created) {
            return res.status(409).send('이미 존재하는 url입니다.');
          }
          const data = await url.get({ plain: true });
          res.status(201).json(data);
        });
    } catch (err) {
      res.status(409).send('bed request');
    }
  },
};
