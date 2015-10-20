;(function(global){
    var myScript = document.getElementsByTagName('script')[0];
    var dataMain= myScript.getAttribute('data-main');
    var myIndex = document.createElement('script');
    var head = document.getElementsByTagName('head')[0];
    var baseUrl = getBaseUrl(dataMain);
    myIndex.src = dataMain + '.js';

    head.appendChild(myIndex);
    myIndex.addEventListener('load', function(){
        //console.log('Index添加成功');
    },false);

    //index.js加载完成之后，执行require.js文件
    function require(name, callback){
        for(var i=0; i<name.length; i++){
            createScript(baseUrl+ name[i], callback);
        }
    }
    //获取baseUrl路径
    function getBaseUrl(dataMain){
        var subPath = dataMain.split('/');
        var mainScript = subPath.pop();       //提出最后一项
        var baseUrl = subPath;
        return baseUrl+'/';

    }

    //a.js
    var callbackVal ;
    function define(dep, deps, fn){
        //得到a函数回调值      为了兼容不是amd模式的jQuery
        if(typeof deps == 'function'){
            fn = deps;
            deps = [];
        }
        callbackVal = fn();
        return callbackVal;
    };
    //index.js
    function createScript(src, callback){
        var Script = document.createElement('script');
        Script.src = src + '.js';
        head.appendChild(Script);
        Script.addEventListener('load', function(){ 
            callback(callbackVal);
        }, 
        false);
    }

    global.require = require;

    global.define = define;
    define.amd = true;
})(this);


