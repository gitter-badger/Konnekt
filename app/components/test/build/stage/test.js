if(!K_Components) K_Components = {};
K_Components["test"] = (function(){
function test()
{
  this.yay = "yay";
  this.val = "";
  this.items = [
    {user_name:"jerry"},
    {user_name:"tom"},
    {user_name:"cooldude"},
    {user_name:"something something something"}
  ];
}

test.prototype.test = function(){

};

test.prototype.k_html = "<div class='test' something = 'something'>  <div>{{yay}}</div>  <input type='text' value='{{val}}' />  <div class='testers'>{{for items loop tester}}</div></div>";
test.prototype.k_css = ".test {  background:#000;  color:#FFF;}";
return test;
}());