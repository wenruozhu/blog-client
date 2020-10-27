import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const DEFAULT_LANG = 'zh'

let pinyin = require("pinyin"); //文字转拼音
Vue.prototype.pinyin = ((str) => {
    return pinyin(str, {
        style: pinyin.STYLE_NORMAL
    }).join('');
})

const language = require("./language.json")
let getData = function (arr) { //转化language.json文件函数
    let zObj = {};
    let hObj = {};
    let eObj = {};
    for (let i = 0, len = arr.length; i < len; i++) {
        let key = Vue.prototype.pinyin(arr[i][0])
        zObj[key] = arr[i][0];
        hObj[key] = arr[i][1];
        eObj[key] = arr[i][2];
    }
    return {
        zh: zObj,
        hk: hObj,
        en: eObj
    }
};
let locales = getData(language.language);
// console.log(locales)
const i18n = new VueI18n({
    locale: DEFAULT_LANG,
    messages: locales,
    silentTranslationWarn: true  //去除没有key值的警告
})
Vue.prototype.i18n = i18n;
Vue.prototype.i18nT = function (str) {
    // str  翻译的文字
    if (!str) return '';
    str = Vue.prototype.pinyin(str);
    if (str && str != '') {
        console.log('拼音', str)
        let finishStr = Vue.prototype.i18n.t(str);
        return finishStr;
    }
    return '';
}
export const setupLan = (lang) => {
    if (lang === undefined) {
        if (locales[lang] === undefined) {
            lang = DEFAULT_LANG
        }
    }

    document.body.setAttribute('lang', lang)
    //把当前语言设置到vue的配置里面，方便在代码中读取
    Vue.config.lang = lang
    i18n.locale = lang
    Vue.prototype.language = `lang-${lang}`;
    localStorage.setItem('lang', lang);
}
//设置默认语言为中文
let _lang = localStorage.getItem('lang');
let ua_lang = window.navigator.language.toLocaleLowerCase();
let window_lang = 'zh';

if (ua_lang == 'zh-cn' || ua_lang == 'zh-sg') {
    window_lang = 'zh'
} else if (ua_lang == 'zh-tw' || ua_lang == 'zh-hk') {
    window_lang = 'hk'
} else {
    window_lang = 'en'
}
let z_lang = _lang || window_lang;

setupLan(z_lang)
window.i18nT = Vue.prototype.i18nT;
export default i18n