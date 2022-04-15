function createcode() {
    code = "";
    var codeLength = 4;//验证码的长度，可变
    var canvas = document.getElementById('resv_canvas');//获取画布
    var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//所有候选组成验证码的字符

    for (var i = 0; i < codeLength; i++) {
        var charIndex = Math.floor(Math.random() * 36);
        code += selectChar[charIndex];
    }
    if (canvas) {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 70, 27);
        ctx.font = "20px arial";
        // 创建渐变
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // 用渐变填色
        ctx.strokeStyle = gradient;
        ctx.strokeText(code, 5, 20);//画布上添加验证码
    }
}

// window.onload = createcode;
window.addEventListener('load', createcode);