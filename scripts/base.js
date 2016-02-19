window.onload = function(){
    var lyricData = [
        '[ti:夜曲]',
        '[ar:周杰伦]',
        '[al:十一月的萧邦]',
        '[00:00.00] 夜曲',
        '[00:04.73]',
        '[00:06.01]词：方文山   曲：周杰伦',
        '[00:09.79]演唱：周杰伦',
        '[00:13.64]',
        '[00:25.09]一群嗜血的蚂蚁 被腐肉所吸引',
        '[00:28.12]我面无表情 看孤独的风景',
        '[00:31.23]失去你 爱恨开始分明',
        '[00:33.66]失去你 还有什么事好关心',
        '[00:36.69]当鸽子不再象征和平',
        '[00:38.61]我终于被提醒 广场上喂食的是秃鹰',
        '[00:42.28]我用漂亮的押韵 形容被掠夺一空的爱情',
        '[00:46.25]',
        '[00:47.26]啊 乌云开始遮蔽 夜色不干净',
        '[00:49.90]公园裡 葬礼的回音 在漫天飞行',
        '[00:52.79]送你的 白色玫瑰 在纯黑的环境凋零',
        '[00:55.97]乌鸦在树枝上诡异的很安静',
        '[00:58.12]静静听 我黑色的大衣',
        '[01:00.62]想溫暖你 日渐冰冷的回忆',
        '[01:02.76]走过的 走过的生命',
        '[01:04.07]啊 四周弥漫雾气 啊 我在空旷的墓地',
        '[01:06.87]老去后还爱你',
        '[01:08.85]',
        '[01:09.46]为你弹奏萧邦的夜曲 纪念我死去的爱情',
        '[01:14.94]跟夜风一样的声音 心碎的很好听',
        '[01:20.49]手在键盘敲很轻 我给的思念很小心',
        '[01:25.94]你埋葬的地方叫幽冥',
        '[01:30.18]',
        '[01:30.60]为你弹奏萧邦的夜曲 纪念我死去的爱情',
        '[01:37.08]而我为你隐姓埋名 在月光下弹琴',
        '[01:42.54]对你心跳的感应 还是如此温热亲近',
        '[01:48.06]怀念你那鲜红的唇印',
        '[01:54.17]',
        '[02:15.47]那些断翅的蜻蜓 散落在这森林',
        '[02:18.43]而我的眼睛 没有丝毫同情',
        '[02:21.55]失去你 泪水混浊不清',
        '[02:23.93]失去你 我连笑容都有阴影',
        '[02:27.02]风在长满青苔的屋顶 嘲笑我的伤心',
        '[02:30.32]像一口没有水的枯井',
        '[02:32.50]我用凄美的字型 描绘后悔莫及的那爱情',
        '[02:36.64]',
        '[02:37.54]为你弹奏萧邦的夜曲 纪念我死去的爱情',
        '[02:43.21]跟夜风一样的声音 心碎的很好听',
        '[02:48.75]手在键盘敲很轻 我给的思念很小心',
        '[02:54.26]你埋葬的地方叫幽冥',
        '[02:58.42]',
        '[02:58.82]为你弹奏萧邦的夜曲 纪念我死去的爱情',
        '[03:05.36]而我为你隐姓埋名 在月光下弹琴',
        '[03:10.85]对你心跳的感应 还是如此温热亲近',
        '[03:16.34]怀念你那鲜红的唇印',
        '[03:21.04]',
        '[03:21.77]一群嗜血的蚂蚁 被腐肉所吸引',
        '[03:24.66]我面无表情 看孤独的风景',
        '[03:27.67]失去你 爱恨开始分明',
        '[03:30.13]失去你 还有什么事好关心',
        '[03:33.07]当鸽子不再象征和平',
        '[03:35.11]我终于被提醒 广场上喂食的是秃鹰',
        '[03:38.74]我用漂亮的押韵 形容被掠夺一空的爱情',
        '[03:43.24]'
    ];


    var formatTime = function(time){
        var m = time.split(':')[0];
        var s = time.split(':')[1];
        return Number(m)*60+Number(s);
    };

    var lyricArray = [];
    for(var i = 0;i<lyricData.length;i++){
        var tmpTime = /\d+:\d+.\d+/.exec(lyricData[i]);
        var tmpLyric = lyricData[i].split(/[\\[]\d+:\d+.\d+]/);
        if(tmpTime!=null){
            lyricArray.push({time:formatTime(String(tmpTime)),lyric:tmpLyric[1]});
        }
    }

    for(var i=0 ; i<lyricArray.length;i++){
        var lyricBorder = document.getElementById('words');
        var lyricEl = document.createElement('li');
        lyricEl.innerHTML = lyricArray[i].lyric;
        lyricBorder.appendChild(lyricEl);
    }

    var audio = document.getElementById('audio');
    var count = 0;

    var vaildTime = function(time,index){
        console.log(index,lyricArray.length);
        if(index<lyricArray.length-1){
            if(time>=lyricArray[index].time&&time<=lyricArray[index+1].time){
                return true;
            }else{
                return false;
            }
        }else{
            if(time<=audio.duration){
                return true;
            }else{
                return false;
            }
        }

    };

    var wordEl = document.getElementById('words');
    var marTop = parseInt(wordEl.style.marginTop);
    audio.ontimeupdate = function(){
        var time = audio.currentTime;
        if(!vaildTime(time,count)) {
            wordEl.querySelectorAll('li')[count].removeAttribute('class');
            count++;
        }
        wordEl.style.marginTop = (marTop-count*48)+'px';
        wordEl.querySelectorAll('li')[count].setAttribute('class','sel');
        if(audio.ended){
            wordEl.style.marginTop = marTop + 'px';
            count=0;
        }
    }
    audio.onseeked = function(){
        var cur_time = audio.currentTime;
        for(var _i = 0;_i <= lyricArray.length - 1;_i++){
            if (cur_time>=lyricArray[_i].time&&cur_time<=lyricArray[_i + 1].time)
                count = _i;
        }
    }
};
