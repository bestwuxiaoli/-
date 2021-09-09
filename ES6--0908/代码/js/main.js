import ajax from './ajax.js';

window.addEventListener('DOMContentLoaded', function() {
  let buttons = document.querySelectorAll('button');
  //
  buttons[0].onclick = async function(e) {
    // requestGet();
    try{
      const res = await ajax.get('http://139.9.209.237/librarywebapi/book/list', {keyword: 'Java'});
      console.log(res);
    }
    catch(ex) {
      alert('请求失败:'+ ex);
    }
  }

  // async function requestGet() {
  //   const res = await ajax.get('http://139.9.209.237/librarywebapi/section/list');
  //   console.log(res);
  // }

  // post
  buttons[1].onclick = async function() {
    try{
      const res = await ajax.post('http://139.9.209.237/librarywebapi/member/login', {phone: '18951100599', password: '0599'});
      console.log(res);
    }
    catch(ex) {
      console.log('请求失败:' , ex);
    }
  };

  // post(formData)
  buttons[2].onclick = async function() {
    try{
      const res = await ajax.upload('http://139.9.209.237/librarywebapi/member/login', {phone: '18951100599', password: '0599'});
      console.log(res);
    }
    catch(ex) {
      console.log('请求失败:' , ex);
    }
  };

  // get (html)
  buttons[3].onclick = async function() {
    try{
      const res = await ajax.get('view/home.html', null, 'html');
      document.querySelector('.container').innerHTML = res; // $('.container').html();
    }
    catch{
      console.log('error');
    }
  };

} ,false);


