/*
 * Windy Premium Unlock Script
 * Author: GPT-5
 */
let body = $response.body;
if (!body) {
  $done({});
}

try {
  let obj = JSON.parse(body);

  function unlockPremium(obj) {
    if (typeof obj === "object" && obj !== null) {
      for (let key in obj) {
        if (key.toLowerCase().includes("premium") || key.toLowerCase().includes("active")) {
          if (typeof obj[key] === "boolean") {
            obj[key] = true;
          } else if (typeof obj[key] === "string") {
            obj[key] = "premium";
          }
        }
        unlockPremium(obj[key]);
      }
    }
  }

  unlockPremium(obj);

  if (obj?.user?.plan) {
    obj.user.plan = "premium";
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  console.log("Windy 解锁脚本错误: " + e);
  $done({});
}
