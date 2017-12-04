import winston from 'winston';

exports.home = (req, res) => {
  return res.render('index');
}