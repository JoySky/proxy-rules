// ====================================================
// Clash Verge Rev 万能护航脚本 (The Holy Grail)
// 功能：垃圾节点清洗 + 完美 Emoji 美化 + Chrome 指纹防封 + 防崩溃同步
// ====================================================

function main(config) {
  // 1. 详尽的国家/地区与 Emoji 映射表 (你的完美字典)
  const flagMap = {
    // 亚洲地区
    "HK": "🇭🇰", "香港": "🇭🇰", "HKG": "🇭🇰", "HONGKONG": "🇭🇰",
    "TW": "🇹🇼", "台湾": "🇹🇼", "臺灣": "🇹🇼", "TPE": "🇹🇼", "TAIWAN": "🇹🇼",
    "SG": "🇸🇬", "新加坡": "🇸🇬", "SIN": "🇸🇬", "SINGAPORE": "🇸🇬", "狮城": "🇸🇬",
    "JP": "🇯🇵", "日本": "🇯🇵", "NRT": "🇯🇵", "HND": "🇯🇵", "JAPAN": "🇯🇵", "东京": "🇯🇵", "大阪": "🇯🇵",
    "KR": "🇰🇷", "韩国": "🇰🇷", "KOR": "🇰🇷", "KOREA": "🇰🇷", "首尔": "🇰🇷",
    "IN": "🇮🇳", "印度": "🇮🇳", "IND": "🇮🇳", "INDIA": "🇮🇳", "孟买": "🇮🇳",
    "TR": "🇹🇷", "土耳其": "🇹🇷", "TUR": "🇹🇷", "TURKEY": "🇹🇷",
    "TH": "🇹🇭", "泰国": "🇹🇭", "THA": "🇹🇭", "THAILAND": "🇹🇭", "曼谷": "🇹🇭",
    "MY": "🇲🇾", "马来西亚": "🇲🇾", "MYS": "🇲🇾", "MALAYSIA": "🇲🇾",
    "VN": "🇻🇳", "越南": "🇻🇳", "VNM": "🇻🇳", "VIETNAM": "🇻🇳",
    "PH": "🇵🇭", "菲律宾": "🇵🇭", "PHL": "🇵🇭", "PHILIPPINES": "🇵🇭",

    // 北美地区
    "US": "🇺🇸", "美国": "🇺🇸", "USA": "🇺🇸", "AMERICA": "🇺🇸", "洛杉矶": "🇺🇸", "圣何塞": "🇺🇸", "纽约": "🇺🇸", "西雅图": "🇺🇸",
    "CA": "🇨🇦", "加拿大": "🇨🇦", "CAN": "🇨🇦", "CANADA": "🇨🇦", "多伦多": "🇨🇦", "温哥华": "🇨🇦",
    "MX": "🇲🇽", "墨西哥": "🇲🇽", "MEX": "🇲🇽", "MEXICO": "🇲🇽",

    // 欧洲地区
    "UK": "🇬🇧", "英国": "🇬🇧", "GBR": "🇬🇧", "UNITED KINGDOM": "🇬🇧", "伦敦": "🇬🇧",
    "DE": "🇩🇪", "德国": "🇩🇪", "DEU": "🇩🇪", "GERMANY": "🇩🇪", "法兰克福": "🇩🇪",
    "FR": "🇫🇷", "法国": "🇫🇷", "FRA": "🇫🇷", "FRANCE": "🇫🇷", "巴黎": "🇫🇷",
    "NL": "🇳🇱", "荷兰": "🇳🇱", "NLD": "🇳🇱", "NETHERLANDS": "🇳🇱", "阿姆斯特丹": "🇳🇱",
    "RU": "🇷🇺", "俄罗斯": "🇷🇺", "RUS": "🇷🇺", "RUSSIA": "🇷🇺", "莫斯科": "🇷🇺",
    "IT": "🇮🇹", "意大利": "🇮🇹", "ITA": "🇮🇹", "ITALY": "🇮🇹", "米兰": "🇮🇹",
    "ES": "🇪🇸", "西班牙": "🇪🇸", "ESP": "🇪🇸", "SPAIN": "🇪🇸",
    "CH": "🇨🇭", "瑞士": "🇨🇭", "CHE": "🇨🇭", "SWITZERLAND": "🇨🇭",
    "SE": "🇸🇪", "瑞典": "🇸🇪", "SWE": "🇸🇪", "SWEDEN": "🇸🇪",

    // 大洋洲及其他
    "AU": "🇦🇺", "澳大利亚": "🇦🇺", "澳洲": "🇦🇺", "AUS": "🇦🇺", "AUSTRALIA": "🇦🇺", "悉尼": "🇦🇺",
    "NZ": "🇳🇿", "新西兰": "🇳🇿", "NZL": "🇳🇿", "NEW ZEALAND": "🇳🇿",
    "BR": "🇧🇷", "巴西": "🇧🇷", "BRA": "🇧🇷", "BRAZIL": "🇧🇷",
    "AR": "🇦🇷", "阿根廷": "🇦🇷", "ARG": "🇦🇷", "ARGENTINA": "🇦🇷",
    "ZA": "🇿🇦", "南非": "🇿🇦", "ZAF": "🇿🇦", "SOUTH AFRICA": "🇿🇦"
  };

  // 2. 垃圾节点黑名单 (防止废话节点污染面板)
  const garbageRegex = /到期|通知|官网|剩余|流量|QQ群|TG群|更新|重置/;
  
  const nameChanges = {};
  const validProxies = [];

  // 3. 核心循环：过滤 + 美化 + 注入指纹
  if (config.proxies) {
    config.proxies.forEach(proxy => {
      // 【动作一：垃圾拦截】遇到垃圾节点，直接丢弃，不进入下一步
      if (garbageRegex.test(proxy.name)) return;

      const oldName = proxy.name;
      let newName = oldName;

      // 【动作二：智能美化】如果没有 Emoji，则匹配字典加上 Emoji
      if (!/^[\uD83C-\uDBFF\uDC00-\uDFFF]/.test(newName)) {
        const upperName = newName.toUpperCase();
        for (const [key, emoji] of Object.entries(flagMap)) {
          if (upperName.includes(key)) {
            newName = `${emoji} ${oldName}`;
            break;
          }
        }
      }

      proxy.name = newName;
      nameChanges[oldName] = newName; 

      // 【动作三：防封锁伪装】偷偷打上 Chrome 浏览器指纹
      proxy["client-fingerprint"] = "chrome";

      // 将存活且洗净的节点放入新数组
      validProxies.push(proxy);
    });
  }

  // 覆盖原配置中的节点列表
  config.proxies = validProxies;

  // 4. 极其安全的组名同步更新逻辑 (防崩溃防误杀)
  if (config["proxy-groups"] && Object.keys(nameChanges).length > 0) {
    const validGroupNames = new Set(["DIRECT", "REJECT", "REJECT-DROP", "COMPAT", "PASS"]);
    config["proxy-groups"].forEach(g => validGroupNames.add(g.name));
    
    // 只提取成功存活下来的节点名字
    const survivingProxies = new Set(config.proxies.map(p => p.name));

    config["proxy-groups"].forEach(group => {
      if (group.proxies) {
        group.proxies = group.proxies
          .map(name => nameChanges[name] || name) 
          .filter(name => survivingProxies.has(name) || validGroupNames.has(name)); 
      }
    });
  }

  return config;
}
