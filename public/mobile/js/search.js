

$(function () {
  //1.获取浏览器的历史数据
  function getHistory() {
    var result = JSON.parse(localStorage.getItem("lt_history")) || [];
    return result;
  }

  //渲染历史列表
  function render() {
    var history = getHistory();
    $(".lt_history").html(template("tpl", { rows: history }));
  }

  render();

  //2. 清空数据的功能
  //2.1 给清空数据注册点击事件（委托）
  //2.2 删除 lt_history的数据
  //2.3 重新渲染
  $(".lt_history").on("click", ".btn_empty", function () {
    mui.confirm("你确定要清空数据吗？", "温馨提示", ["确定", "取消"], function (e) {
      if (e.index === 0) {
        localStorage.removeItem("lt_history");
        render();
      }

    })

  })


  //3. 删除数据
  //3.1 给删除的x注册点击事件（委托）
  //3.2 获取到当前x上的下标
  //3.3 获取到历史记录的数组
  //3.4 删除数组对应下标的某一项
  //3.5 数组的值已经发生改变，重新存回localStory
  //3.6 重新渲染
  $(".lt_history").on("click", ".btn_delete", function () {

    mui.confirm("你确定要删除数据吗？", "温馨提示", ["确定", "取消"], function (e) {
      if (e.index === 0) {
        var index = $(this).data("id");
        console.log(index);
        var history = getHistory();
        history.splice(index, 1);
        localStorage.setItem("lt_history", JSON.stringify(history))
        render();
      }

    })

  })

  //4. 增加功能
  //4.1 给搜索按钮注册点击事件
  //4.2 获取到输入的value
  //4.3 获取到历史记录的数组
  //4.4 把value存到数组的最前面
  //要求1：数组最多存10条记录，如果超过了，会把最早的搜索记录删掉
  //要求2：如果数组中已经有这个历史记录，把这个历史记录放到最前面
  //4.5 把数组重新存回localStory
  //4.6 重新渲染
  $(".btn_search").on("click", function () {
    var txt = $("input").val();
    $("input").val("");
    if (txt === "") {
      mui.toast('请输入搜索的内容', { duration: 'long', type: 'div' })
    }
    var history = getHistory();

    var index = history.indexOf(txt)
    if (index > -1) {
      history.splice(index, 1);
    }
    if (history.length >= 10) {
      history.pop();
    }
    history.unshift(txt);
    localStorage.setItem("lt_history", JSON.stringify(history));
    render();

    location.href="searchList.html?key="+txt;
  })


})