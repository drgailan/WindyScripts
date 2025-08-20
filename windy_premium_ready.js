/*
 * Windy Premium 解锁脚本（宽松兼容）
 * 用于 Surge
 */

let body = $response.body;
let obj;

try {
    obj = JSON.parse(body);
} catch(e) {
    console.log("JSON 解析失败", e);
    $done({body});
}

// 尝试修改用户和订阅字段
if (obj) {
    // 解锁 subscription
    if (obj.subscription) {
        obj.subscription.active = true;
        obj.subscription.plan = "premium";
        obj.subscription.expiration = "2099-12-31T23:59:59Z";
        obj.subscription.start = "2020-01-01T00:00:00Z";
        obj.subscription.features = ["premium","forecast","satellite"];
    }

    // 解锁 user 信息
    if (obj.user) {
        obj.user.isPremium = true;
        obj.user.role = "premium";
    }

    // 有些接口直接返回 profile
    if (obj.profile) {
        obj.profile.isPremium = true;
        obj.profile.role = "premium";
    }
}

// 输出调试日志（可在 Script Debug 模式查看）
console.log("Windy Premium 脚本已执行:", JSON.stringify(obj));

$done({ body: JSON.stringify(obj) });
