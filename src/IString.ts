import IObject from "./IObject";

/***
 * 字符串操作对应的工具类接口定义
 */
export default class IString {

    /**
     * 表示字符串中某个位置的数字，即字符在字符串中的下标。
     * @param str 目标字符串
     * @param index 表示字符串中某个位置的数字，即字符在字符串中的下标。
     * @return 字符串中第一个字符的下标是 0。如果参数 index 不在 0 与 string.length 之间，该方法将返回一个空字符串。
     */
    static charAt(str: string, index: number): string {
        return str.charAt(index);
    }

    /**
     * 检查是否传入的字符串包含在这个字符串中
     * @param str 目标字符串
     * @param sbustr 要搜索的字符串
     * @return true:包含 false:不包含
     */
    static contains(str: string, sbustr: string): boolean {
        return this.indexOf(str, sbustr) != -1;
    }

    /***
     * 判断字符串是否以suffix结尾
     * ~~~
     * IString.endWith(null, null)      = true
     * IString.endWith(null, "def")     = false
     * IString.endWith("abcdef", null)  = false
     * IString.endWith("abcdef", "def") = true
     * IString.endWith("ABCDEF", "def") = false
     * IString.endWith("ABCDEF", "cde") = false
     * IString.endWith("ABCDEF", "")    = true
     * ~~~
     * @param source 目标字符串
     * @param suffix 要搜索的字符串
     * @return true:是  false:否
     */
    static endWith(source: string, suffix: string): boolean {
        return RegExp(suffix + "$").test(source);
    }

    /***
     * 根据给定的字符串格式化,ES6则可以忽视这个方法
     * ~~~
     * format("我是{{country}}人",{country:'中国'}) -> 我是中国人
     * ~~~
     * @param str 给定需要格式化的字符串
     * @param context 给定的对象
     * @return 格式化后的结果
     */
    static format(str: string, context: object): string {
        if (!context) {
            context = window;
        }
        let replacer = function (str, match) {
            let replacement, subs = match.split(/\.+/);
            for (let i = 0, len = subs.length; i < len; i++) {
                if (i == 0) {
                    replacement = context;
                }
                if (replacement === undefined) {
                    break;
                }
                replacement = replacement[subs[i]];
            }

            if (typeof replacement == 'undefined') {
                return 'undefined';
            } else {
                return replacement;
            }
        };
        return str.replace(/\{\{([\w.]+?)\}\}/g, replacer);
    }

    /**
     * 检索字符串位置,从前往后检索
     * @param str 目标字符串
     * @param substr 要搜索的字符串
     * @param index 搜索的起始位置
     * @return -1:substr 不在 str中,其它则表示subStr其所在的位置
     */
    static indexOf(str: string, substr: string, index: number = 0): number {
        return str.indexOf(substr, index);
    }

    /**
     * 判断给予的对象是否长度为空或由空白字符串组成
     * ~~~
     *  IString.isBlank(null)      = true
     *  IString.isBlank("")        = true
     *  IString.isBlank(" ")       = true
     *  IString.isBlank("bob")     = false
     *  IString.isBlank("  bob  ") = false
     * ~~~
     * @param str 给定的字符串
     * @return {Boolean}
     */
    static isBlank(str: string): boolean {
        return this.trim(str) === "";
    }

    /**
     * 判断给予的对象是否为空字符串或长度为0
     * ~~~
     *  IString.isEmpty(null)      = true
     *  IString.isEmpty("")        = true
     *  IString.isEmpty(" ")       = false
     *  IString.isEmpty("bob")     = false
     *  IString.isEmpty("  bob  ") = false
     * ~~~
     * @param str 给定的字符串
     * @return {Boolean}
     */
    static isEmpty(str: string): boolean {
        return str === "";
    }

    /**
     * 判断给予的字符串不是null且不是仅仅由空白字符串组成
     *  IString.isNotBlank(null)      = false
     *  IString.isNotBlank("")        = false
     *  IString.isNotBlank(" ")       = false
     *  IString.isNotBlank("bob")     = true
     *  IString.isNotBlank("  bob  ") = true
     * ~~~
     * @param str 给定的字符串
     * @return {Boolean}
     */
    static isNotBlank(str: string): boolean {
        return !this.isBlank(str);
    }

    /**
     * 判断给予的对象是否不为空字符串或长度为0
     *  ~~~
     *  IString.isNotEmpty(null)      = false
     *  IString.isNotEmpty("")        = false
     *  IString.isNotEmpty(" ")       = true
     *  IString.isNotEmpty("bob")     = true
     *  IString.isNotEmpty("  bob  ") = true
     *  ~~~
     * @param str 给定的字符串
     * @return {Boolean}
     */
    static isNotEmpty(str: string): boolean {
        return !this.isEmpty(str);
    }

    /**
     * 判断给定的字符串不是null或空字符串
     * @param str 目标字符串
     * @return {Boolean}  true:不是空字符串  false:是空字符串
     */
    static isNotNullOrEmpty(str: string): boolean {
        return !this.isNullOrEmpty(str);
    }

    /**
     * 判断给定的字符串不是null或空字符串
     * @param str 目标字符串
     * @return {Boolean} true:空字符串  false:不是空字符串
     */
    static isNullOrEmpty(str: string): boolean {
        return IObject.isUndefined(str) || str == "";
    }

    /**
     * 判断给予的对象是否是String类型
     * @param str 给定的字符串
     * @return {Boolean} true:是字符串类型  false:不是字符串类型
     */
    static isString(str: any): boolean {
        return Object.prototype.toString.call(str) === '[object String]';
    }

    /**
     * 检索字符串位置,从后往前检索
     * @param str 目标字符串
     * @param substr 要搜索的字符串
     * @param index 搜索的起始位置
     * @return {Number} -1:subStr 不在 str中,其它则表示substr最后一次在的位置
     */
    static lastIndexOf(str: string, substr: string, index: number = str.length): number {
        return str.lastIndexOf(substr, index);
    }

    /**
     * 从左边填充给定的字符串,当长度小于size的大小时
     * ~~~
     * IString.padLeft(null,*)   = null
     * IString.padLeft("", 3)     = "   "
     * IString.padLeft("bat", 3)  = "bat"
     * IString.padLeft("bat", 5)  = "  bat"
     * IString.padLeft("bat", 1)  = "bat"
     * IString.padLeft("bat", -1) = "bat"
     * IString.padLeft(null, *, *)      = null
     * IString.padLeft("", 3, "z")      = "zzz"
     * IString.padLeft("bat", 3, "yz")  = "bat"
     * IString.padLeft("bat", 5, "yz")  = "yzbat"
     * IString.padLeft("bat", 8, "yz")  = "yzyzybat"
     * IString.padLeft("bat", 1, "yz")  = "bat"
     * IString.padLeft("bat", -1, "yz") = "bat"
     * IString.padLeft("bat", 5, null)  = "  bat"
     * IString.padLeft("bat", 5, " ")    = "  bat"
     * ~~~
     * @param str 目标字符串
     * @param size 最终的字符串长度
     * @optional
     * @param padStr 给定的需要填充的字符串
     * @return 返回填充完成的字符串,如果给定字符串为null,则返回null
     */
    static padLeft(str: string, size: number, padStr: string = " "): string | null {
        if (str.length >= size) {
            return str;
        }

        let paddingString = new String(),
            len = (size - str.length) / padStr.length,
            gap = size - (len * padStr.length) - str.length;

        for (let i = 0; i < len; i++) {
            paddingString += padStr;
        }
        paddingString += this.substr(padStr, 0, gap);
        return paddingString + str;
    }


    /**
     * 从右侧填充给定的字符串,当长度小于size的大小时
     * ~~~
     * IString.padRight(null, *)   = null
     * IString.padRight("", 3)     = "   "
     * IString.padRight("bat", 3)  = "bat"
     * IString.padRight("bat", 5)  = "bat  "
     * IString.padRight("bat", 1)  = "bat"
     * IString.padRight("bat", -1) = "bat"
     * IString.padRight(null, *, *)      = null
     * IString.padRight("", 3, "z")      = "zzz"
     * IString.padRight("bat", 3, "yz")  = "bat"
     * IString.padRight("bat", 5, "yz")  = "batyz"
     * IString.padRight("bat", 8, "yz")  = "batyzyzy"
     * IString.padRight("bat", 1, "yz")  = "bat"
     * IString.padRight("bat", -1, "yz") = "bat"
     * IString.padRight("bat", 5, null)  = "bat  "
     * IString.padRight("bat", 5, "")    = "bat  "
     * ~~~
     * @param str 目标字符串
     * @param size 最终的字符串长度
     * @optional
     * @param padStr 给定的需要填充的字符串
     * @return 返回填充完成的字符串,如果给定字符串为null,则返回null
     */
    static padRight(str: string, size: number, padStr: string = ""): string | null {
        if (str.length >= size) {
            return str;
        }

        let paddingString = new String(),
            len = (size - str.length) / padStr.length,
            gap = size - (len * padStr.length) - str.length;

        for (let i = 0; i < len; i++) {
            paddingString += padStr;
        }
        paddingString += this.substr(padStr, 0, gap);
        return str + paddingString;
    }

    /**
     * 替换与正则表达式匹配的子串
     * @param str 目标字符串
     * @param rule 规定子字符串或要替换的模式的 RegExp 对象。
     * @param replacement 一个字符串值。规定了替换文本或生成替换文本的函数。
     * @return 替换完成的字符串
     */
    static replace(str: string, rule: string | RegExp, replacement: string): string {
        return str.replace(rule, replacement);
    }

    /**
     * 替换第一个与正则表达式匹配的子串
     * ~~~
     * IString.replaceFirst(null, *, *)       = null
     * IString.replaceFirst("any", null, *)   = "any"
     * IString.replaceFirst("any", *, null)   = "any"
     * IString.replaceFirst("", "", "zzz")    = "zzz"
     * IString.replaceFirst("", ".*", "zzz")  = "zzz"
     * IString.replaceFirst("", ".+", "zzz")  = ""
     * IString.replaceFirst("abc", "", "ZZ")  = "ZZabc"
     * IString.replaceFirst("<__>\n<__>", "<.*>", "z")      = "z\n<__>"
     * IString.replaceFirst("<__>\n<__>", "(?s)<.*>", "z")  = "z"
     * IString.replaceFirst("ABCabc123", "[a-z]", "_")          = "ABC_bc123"
     * IString.replaceFirst("ABCabc123abc", "[^A-Z0-9]+", "_")  = "ABC_123abc"
     * IString.replaceFirst("ABCabc123abc", "[^A-Z0-9]+", "")   = "ABC123abc"
     * IString.replaceFirst("Lorem ipsum  dolor   sit", "( +)([a-z]+)", "_$2")  = "Lorem_ipsum  dolor   sit"
     * ~~~
     * @param str 目标字符串
     * @param rule 规定子字符串或要替换的模式的 RegExp 对象。
     * @param replacement 一个字符串值。规定了替换文本或生成替换文本的函数。
     * @return 替换完成的字符串
     */
    static replaceFirst(str: string, rule: string | RegExp, replacement: string): string {
        return str.replace(rule, replacement);
    }

    /**
     * 根据给定文本,替换所有目标字符串中指定的文本
     * @param str 目标字符串
     * @param findText 查找的文本
     * @param replaceText 替换的文本
     * @return 返回替换后的文本信息
     */
    static replaceAll(str: string, findText: string, replaceText: string): string {
        return str.replace(new RegExp(findText, "g"), replaceText);
    }

    /**
     * 根据给定文本和分隔符，分割字符串
     * @param str 目标字符串
     * @param separator 分割字符串
     * @return 分割后的字符组成的数组
     */
    static split(str: string, separator: string): string[] {
        return str.split(separator);
    }

    /***
     * 判断字符串是否以prefix开头
     * ~~~
     * IString.startWith(null, null)      = true
     * IString.startWith(null, "abc")     = false
     * IString.startWith("abcdef", null)  = false
     * IString.startWith("abcdef", "abc") = true
     * IString.startWith("ABCDEF", "abc") = false
     * ~~~
     * @param source 目标字符串
     * @param prefix 要搜索的字符串
     * @return true:是  false:否
     */
    static startWith(source: string, prefix: string): boolean {
        return new RegExp("^" + prefix).test(source);
    }

    /**
     * 去掉字符串中的html标签
     * @param source 要处理的字符串.
     * @return 清除完html标签的字符串
     */
    static stripHTML(source: string): string {
        return String(source || '').replace(/<[^>]+>/g, '');
    }

    /**
     * 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
     * @param str 目标字符串
     * @param start 要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
     * @param length 子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。
     * @return 一个新的字符串，包含从 stringObject 的 start（包括 start 所指的字符） 处开始的 length 个字符。如果没有指定 length，那么返回的字符串包含从 start 到 stringObject 的结尾的字符。
     */
    static substr(str: string, start: number, length: number = str.length): string {
        if (start < 0) { //兼容IE8以下的substr的负数问题
            start = str.length + start;
        }
        return str.substr(start, length);
    }

    /**
     * 方法用于提取字符串中介于两个指定下标之间的字符。
     * @param str 目标字符串
     * @param start 一个非负的整数，规定要提取的子串的第一个字符在 stringObject 中的位置。
     * @param stop 一个非负的整数，比要提取的子串的最后一个字符在 stringObject 中的位置多 1。
     * @return 截取的结果字符串
     */
    static substring(str: string, start: number, stop: number = str.length): string {
        return str.substring(start, stop);
    }

    /**
     * 将目标字符串进行驼峰化处理,支持单词以“-_”分隔
     * ~~~
     * Dev.String.toCamelCase('i-like_cock-oh-yeah_haha_haha')  ===> iLikeCockOhYeahHahaHaha
     * ~~~
     * @param source 目标字符串
     * @return {string} 驼峰化处理后的字符串
     */
    static toCamelCase(source: string): string {
        if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
            return source;
        }
        return source.replace(/[-_][^-_]/g, function (match) {
            return match.charAt(1).toUpperCase();
        });
    }

    /**
     * 将给定的字符串转义为JSON字符串
     * @param str 目标字符串
     * @return
     */
    static toJson(str: string): string {
        return '"' + str.replace(_CharToReplace, function (a) {
            let c = _Meta[a];
            return IString.isString(c) ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"';
    }

    /**
     * 方法用于把字符串转换为小写。
     * @param str 目标字符串
     * @return 一个新的字符串，在其中 stringObject 的所有大写字符全部被转换为了小写字符。
     */
    static toLowerCase(str: string): string {
        return str.toLowerCase();
    }

    /**
     * 返回字符串
     * @param str 目标字符串
     * @return
     */
    static toString(str: string): string {
        return str.toString();
    }

    /**
     * 方法用于把字符串转换为大写。
     * @param str 目标字符串
     * @return 一个新的字符串，在其中 stringObject 的所有小写字符全部被转换为了大写字符。
     */
    static toUpperCase(str: string): string {
        return str.toUpperCase();
    }

    /**
     * 去除字符串左右两边的空格
     * @param str 给定的字符串
     * @return 清除后的结果
     */
    static trim(str: string): string {
        return str.replace(/^(\s|\u3000|\xa0|\u00A0)+/, '').replace(/(\s||\u3000|\xa0\u00A0)+$/, '');
    }

    /**
     * 去除字符串左侧的空格
     * @param str 给定的字符串
     * @return
     */
    static trimLeft(str: string): string {
        return str.replace(/^(\s|\u3000|\xa0\u00A0)+/, '');
    }

    /**
     * 去除字符串右侧的空格
     * @param str 给定的字符串
     * @return
     */
    static trimRight(str: string): string {
        return str.replace(/(\s|\u3000|\xa0\u00A0)+$/, '');
    }

    /**
     * 将给定的对象转为字符串
     * @param {Object} source 转换目标
     * @return 参数作为一个字符串返回
     */
    static valueOf(str: any): string {
        return str + '';
    }

}

//需要转义的字符  UTF8 TO Ascii
const _CharToReplace = /[\\\"\x00-\x1f\x7f-\uffff]/g;

//JSON需要转义的对象
const _Meta = {
    "\b": '\\b',
    "\t": '\\t',
    "\n": '\\n',
    "\f": '\\f',
    "\r": '\\r',
    '"': '\\"',
    "\\": '\\\\',
    '\v': '\\u000b'
};