/**
 * 
 * @param {*} data 参数对象
 * @returns key=value键值对字符串
 */
const buildParameter = (data) => {
  if(data) {
    const temp = [];
    for(let [key,value] of Object.entries(data)) {
      temp.push(`${key}=${value}`);
    }
    return temp.join('&');
  }
  return null;
  
};


// get
const get = function(url, data = null, returnType = 'json') {

  return new Promise((resolve, reject) => {
    // 转换
    const search = buildParameter(data);

    // 如果存在查询参数，附加到url后
    if(search) {
      url = url + '?' + search;
    }

    //
    let xhr = new XMLHttpRequest();
    xhr.open('GET' , url , true);
    xhr.onreadystatechange = function(){
      // readyState, 获取到服务器响应(成功或失败)
      if(this.readyState === 4 ) {
        // 200 响应成功,并且拿到正常资源
        if(this.status === 200){
          
          let res = this.responseText;
          if(returnType === 'json') {
            res = JSON.parse(res);
          }

          resolve(res);
        }
        else{
          reject(this.statusText);
        }        
      }      
    };
    xhr.send();
  });  
};

// 
const post = function(url, data) {
  return new Promise((resolve, reject) => {

    // 转换请求主体  {} => key=value&key=value
    const body = buildParameter(data);
    
    // 
    var xhr = new XMLHttpRequest()
    xhr.open('POST' , url , true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if(this.readyState === 4) {
        // 请求成功
        if(this.status === 200){
          const res = JSON.parse(this.responseText);
          return resolve(res);
        }
        reject(this.statusText);
      }
    }
    xhr.send(body);
  });
};

// 包含文件域
const upload = (url, data) => {
  return new Promise((resolve, reject) => {
    // 封装FormData
    const formData = new FormData();
    for(let [key , value] of Object.entries(data)) {
      formData.append(key, value);
    }
    // 
    var xhr = new XMLHttpRequest()
    xhr.open('POST' , url , true);
    xhr.onreadystatechange = function() {
      if(this.readyState === 4) {
        // 请求成功
        if(this.status === 200){
          const res = JSON.parse(this.responseText);
          return resolve(res);
        }
        reject(this.statusText);
      }
    }
    xhr.send(formData);
  });
};

export default {
  get, 
  post,
  upload
};