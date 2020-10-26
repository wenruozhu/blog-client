import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const DEFAULT_LANG = 'zh'
const LOCALE_KEY = 'localeLanguage'

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
console.log(locales)
const i18n = new VueI18n({
    locale: DEFAULT_LANG,
    messages: locales,
    silentTranslationWarn: true  //去除没有key值的警告
})
Vue.prototype.i18n = i18n;
Vue.prototype.i18nT = function (str) {
    // str  翻译的文字
    //flag  当语言包找不到的时候，是否请求后台返回翻译结果, true为不转换，直接返回，false 请求
    if (!str) return '';
    let key = str;
    str = Vue.prototype.pinyin(str);
    if (str && str != '') {
        console.log(str)
        let finishStr = Vue.prototype.i18n.t(str);
        console.log(finishStr)
        if (finishStr == str) {
            //没有翻译的暂时翻译为中文
            let zObj = Vue.prototype.i18n.messages.zh;
            let hObj = Vue.prototype.i18n.messages.hk;
            let eObj = Vue.prototype.i18n.messages.en;
            zObj.message[Vue.prototype.pinyin(key)] = key;
            hObj.message[Vue.prototype.pinyin(key)] = key;
            eObj.message[Vue.prototype.pinyin(key)] = key;

            Vue.prototype.i18n.setLocaleMessage('zh', zObj)
            Vue.prototype.i18n.setLocaleMessage('hk', hObj)
            Vue.prototype.i18n.setLocaleMessage('en', eObj)
            return key;
        } else {
            return finishStr;
        }
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

window.i18nT = Vue.prototype.i18nT;
export default i18n