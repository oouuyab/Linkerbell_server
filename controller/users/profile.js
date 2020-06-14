const { users } = require('../../models');
const { checkToken } = require('../../modules');
module.exports = {
  patch: (req, res) => {
    try {
      const { user_id, age, gender } = req.body;
      users
        .update(
          {
            age: age,
            gender: gender,
          },
          {
            where: {
              id: user_id,
            },
          }
        )
        .then((result) => {
          res.status(200).send('프로필 설정 완료');
        });
    } catch (err) {
      res.status(400).send('bad request');
    }
  },
};
