define(['jquery','toast','router'],function($,toast,router){
    const URL_SECTION_LIST = ' http://139.9.209.237/librarywebapi/section/list';
    const URL_BOOK_LIST = 'http://139.9.209.237/librarywebapi/book/list';
    let login = {}  /// 登录信息
    let cartInfo = [];  ///记录添加商品的信息；
    const home= function(){
       $.get('component/home.html').then(function(html){
        $('.content').html(html);
            $.get(URL_BOOK_LIST).then(function(res){
              
                if(res.Code ==100){
                    $('.homepage-content').html('');
                    res.Data.forEach(function(item,index){
                     
                        creatEl_homepage(item).appendTo('.homepage-content');
                    })
                }
            })
       }) 
    }
    const cart= function(){
        $('.content').html('');

        let flag =$.isEmptyObject(cartInfo);
        if(flag) {
            $.get('component/cart.html').then(function(html){
                $('.content').html(html);
                $('.empty-cart a').on('click',function(e){
                    // e.preventDefault();
                    $('.content').html('');
                    $('.header').text('全部商品'); 
                    $('.active').removeClass('active').addClass('a-default');
                    $('#productEl').removeClass('a-default').addClass('active');
                    $('#productEl').next().removeClass('a-default').addClass('active');
                    product();
                   
                })
               })  
               return;
        } 
        // 复用 商品组件
        $('.content').html('');
        $.get('component/product.html').then(function(html){
            $('.content').html(html);
            $('.product-page').find('h1').remove();


            //// 购物车 去重 ---- 对应数量++ 
            for(let i = 0;i<cartInfo.length-1;i++){
                for(let j = i+1; j<cartInfo.length;j++){
                    if(cartInfo[j] ==null||cartInfo[i]==null) continue;
                    if(cartInfo[i].name ==cartInfo[j].name){
                        cartInfo[i].amount++; 
                        cartInfo[j] = null;
                    }
                    
                }
            }
            let val = [];
            cartInfo.forEach(function(item,index){
                if (item !==null) val.push(item);
            })
            console.log(val);``
             val.forEach(function(item,index){
                creatEl_cart(item).appendTo('.product-page');
              
        })
        });
       
      
    }


    const product= function(){
       $.get('component/product.html').then(function(html){

        $('.content').html(html);
        $.get(URL_BOOK_LIST).then(function(res){
            $('.product-page').html('');
            res.Data.forEach(function(item,index){
               
                creatEl_productpage(item).appendTo('.product-page');
              
            })

        })

       }) 
    }
    const mycenter= function(){
       $.get('component/mycenter.html').then(function(html_s){

        $('.content').html(html_s);
        // 点击登录  -- 请求登录组件
        let temp = login.name||'尚未登录' ;
        $('.link-login-span').text(temp) ;
        // 登录
        $('#link-login').on('click',function(e){
            e.preventDefault();
            $.get('component/login.html').then(function(html){
                $('.mycenter-page').html(html);

                $('.login-form').on('submit',function(e){
                    let user = $('.login-username input').val();
                    let psd = $('.login-password input').val();
                    if(user !=='admin'||psd!=='1234') return;
                    toast.success('登录成功!');
                    //移除 登录页
                    setTimeout(function(){
                         $('.login-page').remove();
                        
                    },1000);
                
                   login ={
                       name:'管理员',
                   }
                    $('.content').html(html_s);
                    $('.link-login-span').text(`${login.name}`) ;
                  
                })
            })
        })    

        ///// 个人中心转向 购物车
        $("#link-cart").on('click',cart);
        $('#link-cart').on('click',function(e){
            $('.header').text('购物车'); 
            $('.active').removeClass('active').addClass('a-default');
            $('#cartEl').removeClass('a-default').addClass('active');
            $('#cartEl').next().removeClass('a-default').addClass('active');


        })
          


       }) 
    }





    function creatEl_homepage(item){
        let $div = $(`
        
            <div>
                <div class="home-book">
                    <img src="${item.Book.Image}">
                    <h4>${item.Book.Name}</h4>
                </div>
            </div>
        `);
        return $div;
    }

    function creatEl_productpage(item){
        let $div = $(`
        <div class=product-item>
        <img src="${item.Book.Image}">
        <div class=product-info>
            <h4>${item.Book.Name}</h4>
            <p>111</p>
            <p>${item.Book.Category.Name}</p>
            <spap>价格</span>
            <a  class='add-to-cart' data-amout =${item.Amount}>
                <i class='glyphicon glyphicon-shopping-cart'></i><span>加入购物车</span>
            </a>
        </div>
    </div>
        `);

        /// 添加购物车
       $div.on('click','.add-to-cart',function(e){
            e.preventDefault();
            let number = 1;
            let flag =$.isEmptyObject(login);
            if(flag) {
                 toast.error('请先登录');
                 return;
            }
            else{
                toast.success('添加成功！');
               
                let temp = {
                    name:item.Book.Name,
                    publisher:item.Book.Category.Name,
                    image:item.Book.Image,
                    amount:number,
                }
                cartInfo.push(temp);
               console.log(cartInfo);
            }
        })

        return $div;
    }

    function creatEl_cart(item){
        let $div = $(`
        <div class=product-item>
        <img src="${item.image}">
        <div class=product-info>
            <h4>${item.name}</h4>
            <p>数量：${item.amount}</p>
            <p>${item.publisher}</p>
            <spap>价格</span>
        </div>
    </div>
        `);

        return $div;
    }
    return {
        homeController:home,
        cartController:cart,
        mycenterConller:mycenter,
        productController:product,
    }

})