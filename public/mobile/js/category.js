

$(function () {

  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",

    success: function (info) {
      console.log(info);
      $(".lt_category_l ul").html(template("tpl", info));
  
     
      sencondRender(info.rows[0].id);
      
    }
  })

  

  function sencondRender(id){
    // console.log(id);
    
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{id:id},
      success:function(info){
        console.log(info);
        $(".lt_category_r ul").html(template("tplsecond",info));
        
      }
    })
  }

  $(".lt_category_l").on("click","li",function(){
    var id = $(this).data("id");  
    sencondRender(id);
    $(this).addClass("now").siblings().removeClass("now");
    mui('.lt_category_l .mui-scroll-wrapper').scroll().scrollTo(0,0,500);
  })










})