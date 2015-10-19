;(function(global){
    var myScript = document.getElementsByTagName('script')[0];
    var dataMain= myScript.getAttribute('data-main');
    var myIndex = document.createElement('script');
    var head = document.getElementsByTagName('head')[0];
    myIndex.src = dataMain + '.js';
    head.appendChild(myIndex);
    myIndex.addEventListener('load', function(){
        //console.log('Index添加成功');
    },false);

    //index.js加载完成之后，执行require.js文件
    function require(name, callback){
        for(var i=0; i<name.length; i++){
            createScript(name[i], callback);
        }
    }

    //a.js
    var callbackVal ;
    function define(dep, fn){
        //得到a函数回调值
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
})(this);


