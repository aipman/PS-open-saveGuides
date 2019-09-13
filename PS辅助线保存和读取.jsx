#target photoshop
var con;
con=confirm("单击'是'保存参考线，单击'否'读取参考线。"); //在页面上弹出对话框
if(con==true)saveGuides();
else openGuides();

function saveGuides(){//保存参考线
    var file = File.saveDialog(" 保存参考线txt文件","txt 文件:*.txt;All files:*.*")
    if ( file == null ) return;
    //如果已经存在，弹框确认是否覆盖重写
    if (file.exists) {
        if(!confirm(" 要覆盖" +file.fsName + "文件么？")) return;
    }
    var n = activeDocument.guides.length
    file.open("w"); // open as write
    file.writeln(n);
    for(var i = 0; i <n ;i++){
        file.writeln(activeDocument.guides[i].direction);
        file.writeln(activeDocument.guides[i].coordinate.as("px"));
        }
    file.close();
    }

function openGuides(){
    var fi = File.openDialog("打开参考线txt文件","txt 文件:*.txt;All files:*.*");
    if ( fi == null ) return;
     fi.open("r");
    var n = fi.readln();
    var FX ="";
    var WZ="";
        for(var i = 0;i<n;i++){
            FX= fi.readln();
            WZ=fi.readln();
            activeDocument.guides.add (eval(FX),UnitValue(WZ+"px"))
            }
        fi.close();
    }
