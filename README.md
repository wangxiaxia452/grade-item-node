 # 安装token
 npm i --save jsonwebtoken

 # 前端处理token
 redux/本地

 ## token流程

 ### token是什么
 令牌，用户凭证

 ### token作用
 token存储的是用户登陆状态的唯一凭证

 ### token流程
 用户登录 -> 后台生成token -> 前端存储token -> 新的网络请求头携带token -> 验证token -> （有token）返回数据 -> (无token)返回错误信息 

 ### 请求API携带token
 在网络请求的封装方法中携带token,通过请求头携带