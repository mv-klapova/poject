/* расстояние, на которое смещается slidewrapper*/
var translateWidth = 0;
/* slideNow - будет хранить в себе номер слайда, который мы видим в определенный момент времени во viewport, slideCount - будет хранить количество этих самых слайдов*/
var slideNow = 1;
var slideCount = $('#slidewrapper').children().length;

function nextSlide() {
    /* проверяем, находимся ли мы сейчас на последнем слайде нашей ленты: берем количество всех наших слайдов при помощи '#slidewrapper'и сверяем его с номером нашего слайда */
    /* если они оказываются равными, значит что нужно начать показывать ленту заново, с 1 слайда, значит css-свойство transform у slidewrapper на translate(0, 0)*/
    if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
        $('#slidewrapper').css('transform', 'translate(0, 0)');
        slideNow = 1;
    } 
    /*переключение на следующий путем смещения slidewrapper влево на значение, равное ширине viewport, 
    смещение происходит через свойство translate, значение которого будет равным 'translate(' + translateWidth + 'px, 0)', где translateWidth – расстояние, на которое смещается slidewrapper */
    else {
        translateWidth = -$('#viewport').width() * (slideNow);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        /* видим следующий по счету слайд: slideNow++*/
        slideNow++;
    }
}
/*интервал, через который переключается слайд*/
var slideInterval = 4000;
/* через конструкцию $(document).ready(function () {}) говорим, что следующие действия необходимо выполнять после полной загрузки документа. 
вызываем функцию nextSlide с интервалом, равным slideInterval, при помощи встроенной функции setInterval. */
$(document).ready(function () {
    setInterval(nextSlide, slideInterval);
}) 
function prevSlide() {
/*делаем проверку, находимся ли мы на 1-ом слайде или нет, также проверяем, не вышел ли slideNow за границы реального диапазаона слайдов
 если какое-то из условий сработает, перместимся на последний слайд, сместив slidewrapper на нужное значение. 
 значение вычислим по формуле: (ширина одного слайда)*(кол-во слайдов – 1)
 все это со знаком минус, т.к. смещаем его влево, получается, что viewport теперь будет показывать последний слайд */ 

    if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
        translateWidth = -$('#viewport').width() * (slideCount - 1);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
         /*конце этого блока нужно сказать переменной slideNow, что сейчас в поле зрения находится последний слайд*/
        slideNow = slideCount;
    } else {
        /*Если же мы не находимся на первом слайде, то нужно сместиться на 1 назад, для этого меняем свойство transform у slidewrapper.
         Формула такая: (ширина одного слайда)*(номер текущего слайда – 2), все это берем со знаком минус.*/
        translateWidth = -$('#viewport').width() * (slideNow - 2);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        /*вычитаем из переменной slideNow единицу, тем самым указывая на то, что видим уже предыдущий слайд*/
        slideNow--;
    }
}
/*отслеживаем, был ли произведен клик на наши кнопки, и в этом случае вызываем нужные нам функции*/
$('#next-btn').click(function() {
        nextSlide();
    });

    $('#prev-btn').click(function() {
        prevSlide();
});
    