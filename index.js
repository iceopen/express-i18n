var express = require('express'),
  cookieParser = require('cookie-parser'),
  i18n = require('i18n'),
  app = module.exports = express();

i18n.configure({
  locales: ['zh-CN', 'en-US'], // setup some locales - other locales default to en_US silently
  defaultLocale: 'zh-CN',
  directory: './i18n', // i18n 翻译文件目录，我的是 i18n， 可以写成其他的。
  updateFiles: false,
  indent: "\t",
  cookie: 'shtelecom-lang',
  extension: '.js' // 由于 JSON 不允许注释，所以用 js 会方便一点，也可以写成其他的，不过文件格式是 JSON
});
// you will need to use cookieParser to expose cookies to req.cookies
app.use(cookieParser());

// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);

// serving homepage
app.get('/', function(req, res) {
  var microMessenger = req.headers['accept-language'];
  var str = res.__('Hello');
  res.send(i18n.getLocale() + "<br/>" + str + "<br/>" + microMessenger);
});
app.use(function(req, res, next) {
  console.log(i18n.getLocale());
  var microMessenger = req.headers['user-agent'].indexOf("MicroMessenger");
  next();
});
// starting server
if (!module.parent) {
  app.listen(3000);
}
